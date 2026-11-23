import {
  collection,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { auth, db, getFirebaseAuthHeaders } from '../lib/firebase';
import { STARTER_STORED_MOCK_EXAMS } from '../data/aspirantStoredMockBank';
import type {
  StoredMockExam,
  TournamentRegistrationRecord,
  WeeklyNationalTournament,
} from '../types';

const MOCK_EXAMS_CACHE_KEY = 'sc_aspirant_stored_mock_exams_v1';
let memoryMockExams: StoredMockExam[] | null = null;
let firestoreSeedChecked = false;

const SUPER_ADMIN_EMAILS = [
  'martorefe@gmail.com',
  'wowrealities@gmail.com',
  'martinnosaomorefe@gmail.com',
];

function sortStoredMockExams(list: StoredMockExam[]): StoredMockExam[] {
  return [...list].sort((a, b) => {
    if (a.source === 'starter' && b.source !== 'starter') return -1;
    if (a.source !== 'starter' && b.source === 'starter') return 1;
    if (a.source === 'starter' && b.source === 'starter') {
      return a.orderIndex - b.orderIndex;
    }
    return String(b.createdAt || '').localeCompare(String(a.createdAt || ''));
  });
}

function readLocalMockExamsCache(): StoredMockExam[] | null {
  try {
    if (typeof window === 'undefined') return null;
    const raw = window.localStorage.getItem(MOCK_EXAMS_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length >= STARTER_STORED_MOCK_EXAMS.length) {
      return parsed;
    }
  } catch {
    // Ignore storage read errors
  }
  return null;
}

function writeLocalMockExamsCache(exams: StoredMockExam[]): void {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(MOCK_EXAMS_CACHE_KEY, JSON.stringify(exams));
  } catch {
    // Ignore storage quota errors
  }
}

function mergeExamsById(...groups: StoredMockExam[][]): StoredMockExam[] {
  const map = new Map<string, StoredMockExam>();
  // Starter 6 always form the stable base
  for (const starter of STARTER_STORED_MOCK_EXAMS) {
    map.set(starter.id, starter);
  }
  for (const group of groups) {
    for (const exam of group) {
      if (exam && exam.id && Array.isArray(exam.questions) && exam.questions.length > 0) {
        map.set(exam.id, exam);
      }
    }
  }
  return sortStoredMockExams(Array.from(map.values()));
}

/**
 * If a verified Super Admin is signed into Firebase Auth and any of the 6 starter mock
 * papers are missing in Firestore `aspirantMockExams`, persist them once so they live
 * permanently in Firestore and never regenerate on subsequent loads.
 */
async function seedMissingStartersToFirestoreIfAdmin(existingIds: Set<string>): Promise<void> {
  if (firestoreSeedChecked) return;
  firestoreSeedChecked = true;
  const currentUser = auth.currentUser;
  const email = String(currentUser?.email || '').toLowerCase().trim();
  if (!currentUser || !currentUser.emailVerified || !SUPER_ADMIN_EMAILS.includes(email)) {
    return;
  }
  for (const starter of STARTER_STORED_MOCK_EXAMS) {
    if (!existingIds.has(starter.id)) {
      try {
        await setDoc(doc(db, 'aspirantMockExams', starter.id), starter);
      } catch (err) {
        console.warn(`[AspirantMockService] Could not seed ${starter.id} to Firestore:`, err);
      }
    }
  }
}

/**
 * Loads the 6 permanent starter mock exams (2 JAMB, 2 WAEC, 2 NECO) plus any archived
 * weekly National Mock Tournament exam papers.
 * Priority: Firestore `aspirantMockExams` + Backend `/api/aspirant/mock-exams` + Local Cache.
 * Never regenerates existing exams.
 */
export async function fetchStoredAspirantMockExams(forceRefresh = false): Promise<{
  exams: StoredMockExam[];
  source: 'firestore' | 'server' | 'cache' | 'bundled';
}> {
  if (!forceRefresh && memoryMockExams && memoryMockExams.length >= 6) {
    return { exams: memoryMockExams, source: 'cache' };
  }

  const cached = !forceRefresh ? readLocalMockExamsCache() : null;
  const firestoreExams: StoredMockExam[] = [];
  const serverExams: StoredMockExam[] = [];
  let source: 'firestore' | 'server' | 'cache' | 'bundled' = cached ? 'cache' : 'bundled';

  // 1. Read from Cloud Firestore (primary persistent store)
  try {
    const snap = await getDocs(collection(db, 'aspirantMockExams'));
    const existingIds = new Set<string>();
    snap.forEach((docSnap) => {
      const data = docSnap.data() as StoredMockExam;
      if (data && data.id && Array.isArray(data.questions) && data.questions.length > 0) {
        firestoreExams.push(data);
        existingIds.add(data.id);
      }
    });
    if (firestoreExams.length > 0) {
      source = 'firestore';
    }
    // Seed any missing starter papers once when Super Admin opens the app
    void seedMissingStartersToFirestoreIfAdmin(existingIds);
  } catch {
    // Fallback smoothly to backend / cache
  }

  // 2. Also fetch from backend `/api/aspirant/mock-exams` so recently archived weekly tournaments appear immediately
  try {
    const res = await fetch('/api/aspirant/mock-exams', { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (json?.success && Array.isArray(json.exams)) {
        for (const exam of json.exams) {
          if (exam && exam.id && Array.isArray(exam.questions) && exam.questions.length > 0) {
            serverExams.push(exam);
          }
        }
        if (source !== 'firestore' && serverExams.length > 0) {
          source = 'server';
        }
      }
    }
  } catch {
    // Offline fallback handled cleanly
  }

  const merged = mergeExamsById(cached || [], serverExams, firestoreExams);
  memoryMockExams = merged;
  writeLocalMockExamsCache(merged);
  return { exams: merged, source };
}

export interface CurrentWeeklyTournamentPayload {
  tournament: WeeklyNationalTournament;
  activePaper: StoredMockExam;
  registration: TournamentRegistrationRecord | null;
  archivedTournaments: WeeklyNationalTournament[];
}

export async function fetchCurrentWeeklyTournament(userId?: string): Promise<CurrentWeeklyTournamentPayload> {
  const qs = userId ? `?userId=${encodeURIComponent(userId)}` : '';
  const res = await fetch(`/api/aspirant/tournaments/current${qs}`, { cache: 'no-store' });
  const data = await res.json();
  if (!res.ok || !data?.success) {
    throw new Error(data?.error || 'Unable to load the weekly National Mock Tournament.');
  }
  return {
    tournament: data.tournament,
    activePaper: data.activePaper,
    registration: data.registration || null,
    archivedTournaments: Array.isArray(data.archivedTournaments) ? data.archivedTournaments : [],
  };
}

export async function registerForWeeklyTournament(params: {
  tournamentId: string;
  userId: string;
  userName: string;
  userEmail?: string;
  state?: string;
  paymentMethod: 'wallet' | 'paystack';
  paystackReference?: string;
}): Promise<{
  registration: TournamentRegistrationRecord;
  tournament: WeeklyNationalTournament;
  newWalletBalanceNaira?: number;
  alreadyRegistered?: boolean;
}> {
  const authHeaders = await getFirebaseAuthHeaders();
  const res = await fetch('/api/aspirant/tournaments/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
    },
    body: JSON.stringify(params),
  });
  const data = await res.json();
  if (!res.ok || !data?.success) {
    throw new Error(data?.error || 'Could not complete ₦500 tournament registration.');
  }
  return {
    registration: data.registration,
    tournament: data.tournament,
    newWalletBalanceNaira: data.newWalletBalanceNaira,
    alreadyRegistered: Boolean(data.alreadyRegistered),
  };
}

export async function submitWeeklyTournamentScore(params: {
  tournamentId: string;
  userId: string;
  userName: string;
  state?: string;
  score: number;
  maxScore: number;
  timeTakenSeconds: number;
}): Promise<{
  tournament: WeeklyNationalTournament;
  rank: number;
}> {
  const authHeaders = await getFirebaseAuthHeaders();
  const res = await fetch('/api/aspirant/tournaments/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
    },
    body: JSON.stringify(params),
  });
  const data = await res.json();
  if (!res.ok || !data?.success) {
    throw new Error(data?.error || 'Could not submit your official tournament score.');
  }
  return {
    tournament: data.tournament,
    rank: data.rank || 1,
  };
}

export async function updateWeeklyTournamentPrizesAdmin(params: {
  tournamentId?: string;
  title?: string;
  subtitle?: string;
  prizePoolLabel?: string;
  prizePoolSubtext?: string;
  prizeNote?: string;
  prizes?: Array<{ rankLabel: string; reward: string }>;
}): Promise<WeeklyNationalTournament> {
  const authHeaders = await getFirebaseAuthHeaders();
  const res = await fetch('/api/admin/tournaments/update-prizes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
    },
    body: JSON.stringify(params),
  });
  const data = await res.json();
  if (!res.ok || !data?.success) {
    throw new Error(data?.error || 'Could not update tournament prizes.');
  }

  // Also mirror to Firestore directly when signed in as verified Super Admin
  try {
    const email = String(auth.currentUser?.email || '').toLowerCase().trim();
    if (auth.currentUser?.emailVerified && SUPER_ADMIN_EMAILS.includes(email) && data.tournament?.id) {
      await setDoc(doc(db, 'nationalMockTournaments', data.tournament.id), data.tournament);
    }
  } catch {
    // Server store already persisted
  }

  return data.tournament;
}

export async function archiveWeeklyTournamentPaperAdmin(tournamentId?: string): Promise<{
  tournament: WeeklyNationalTournament;
  archivedPaper: StoredMockExam;
}> {
  const authHeaders = await getFirebaseAuthHeaders();
  const res = await fetch('/api/admin/tournaments/archive-to-bank', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
    },
    body: JSON.stringify({ tournamentId }),
  });
  const data = await res.json();
  if (!res.ok || !data?.success) {
    throw new Error(data?.error || 'Could not archive tournament paper to mock bank.');
  }

  // Mirror archived paper + tournament doc to Firestore when signed in as verified Super Admin
  try {
    const email = String(auth.currentUser?.email || '').toLowerCase().trim();
    if (auth.currentUser?.emailVerified && SUPER_ADMIN_EMAILS.includes(email)) {
      if (data.archivedPaper?.id) {
        await setDoc(doc(db, 'aspirantMockExams', data.archivedPaper.id), data.archivedPaper);
      }
      if (data.tournament?.id) {
        await setDoc(doc(db, 'nationalMockTournaments', data.tournament.id), data.tournament);
      }
    }
  } catch {
    // Server store already persisted
  }

  memoryMockExams = null;
  return {
    tournament: data.tournament,
    archivedPaper: data.archivedPaper,
  };
}
