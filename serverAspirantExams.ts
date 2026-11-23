import fs from 'fs';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore/lite';
import {
  STARTER_STORED_MOCK_EXAMS,
  buildWeeklyTournamentFallbackPaper,
} from './src/data/aspirantStoredMockBank';
import type {
  StoredMockExam,
  TournamentRegistrationRecord,
  WeeklyNationalTournament,
  WeeklyTournamentLeaderboardEntry,
} from './src/types';

export const ASPIRANT_EXAMS_STORE_FILE = '/tmp/sc-aspirant-exams-store.json';
export const WEEKLY_TOURNAMENT_ENTRY_FEE_NAIRA = 500;

interface AspirantExamStoreShape {
  version: number;
  mockExams: Record<string, StoredMockExam>;
  tournaments: Record<string, WeeklyNationalTournament>;
  registrations: Record<string, TournamentRegistrationRecord>; // key: `${tournamentId}__${userId}`
  updatedAt: string;
}

let memoryStore: AspirantExamStoreShape | null = null;
let firestoreHydratedOnce = false;

function nowIso(): string {
  return new Date().toISOString();
}

/**
 * Compute ISO week key (e.g. "2026-W47") and weekend schedule in WAT (UTC+1).
 * Weekly National Mock Tournament runs automatically every weekend:
 *  - Registration opens Monday 00:00 WAT
 *  - Exam window: Saturday 09:00 WAT -> Sunday 23:59 WAT
 *  - Closes Monday 00:00 WAT (next week's tournament opens automatically & prior week archives!)
 */
export function getWatWeekSchedule(referenceDate = new Date()): {
  weekKey: string;
  weekNumber: number;
  year: number;
  editionNumber: number;
  tournamentId: string;
  examPaperId: string;
  startsAt: string;
  endsAt: string;
  status: 'upcoming' | 'live' | 'completed';
  title: string;
  subtitle: string;
} {
  // Shift to WAT (UTC+1)
  const watMs = referenceDate.getTime() + 60 * 60 * 1000;
  const watDate = new Date(watMs);

  // ISO week calculation on UTC fields of shifted date
  const temp = new Date(Date.UTC(watDate.getUTCFullYear(), watDate.getUTCMonth(), watDate.getUTCDate()));
  const dayOfWeek = temp.getUTCDay() || 7; // 1 = Mon ... 7 = Sun
  temp.setUTCDate(temp.getUTCDate() + 4 - dayOfWeek);
  const yearStart = new Date(Date.UTC(temp.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil((((temp.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  const isoYear = temp.getUTCFullYear();
  const weekPadded = String(weekNumber).padStart(2, '0');
  const weekKey = `${isoYear}-W${weekPadded}`;

  // Compute Monday 00:00 WAT of this ISO week
  const mondayWat = new Date(Date.UTC(watDate.getUTCFullYear(), watDate.getUTCMonth(), watDate.getUTCDate()));
  const currentIsoDay = mondayWat.getUTCDay() || 7;
  mondayWat.setUTCDate(mondayWat.getUTCDate() - (currentIsoDay - 1));

  // Saturday 09:00 WAT -> convert back to UTC (-1h => 08:00 UTC)
  const saturdayStartUtc = new Date(mondayWat.getTime());
  saturdayStartUtc.setUTCDate(saturdayStartUtc.getUTCDate() + 5);
  saturdayStartUtc.setUTCHours(8, 0, 0, 0);

  // Sunday 23:59:59 WAT -> convert back to UTC (22:59:59 UTC)
  const sundayEndUtc = new Date(mondayWat.getTime());
  sundayEndUtc.setUTCDate(sundayEndUtc.getUTCDate() + 6);
  sundayEndUtc.setUTCHours(22, 59, 59, 999);

  const nowMs = referenceDate.getTime();
  let status: 'upcoming' | 'live' | 'completed' = 'upcoming';
  if (nowMs >= saturdayStartUtc.getTime() && nowMs <= sundayEndUtc.getTime()) {
    status = 'live';
  } else if (nowMs > sundayEndUtc.getTime()) {
    status = 'completed';
  }

  const editionNumber = Math.max(1, (isoYear - 2026) * 52 + weekNumber);
  const tournamentId = `nmt-${isoYear}-w${weekPadded}`;
  const examPaperId = `nmt-${isoYear}-w${weekPadded}`;

  return {
    weekKey,
    weekNumber,
    year: isoYear,
    editionNumber,
    tournamentId,
    examPaperId,
    startsAt: saturdayStartUtc.toISOString(),
    endsAt: sundayEndUtc.toISOString(),
    status,
    title: `National Mock Tournament — Week ${weekNumber}, ${isoYear}`,
    subtitle: `Official Weekly Weekend UTME Ranking Championship · Edition #${editionNumber}`,
  };
}

function createDefaultWeeklyPrizes(): Array<{ rankLabel: string; reward: string }> {
  return [
    { rankLabel: '1st Place National Champion', reward: 'Prize to be announced by Admin' },
    { rankLabel: '2nd Place Runner-Up', reward: 'Prize to be announced by Admin' },
    { rankLabel: '3rd Place Medalist', reward: 'Prize to be announced by Admin' },
    { rankLabel: 'Top 10 National Finalists', reward: 'Official Merit Badge & Leaderboard Honour' },
  ];
}

function buildStarterExamMap(): Record<string, StoredMockExam> {
  const map: Record<string, StoredMockExam> = {};
  for (const exam of STARTER_STORED_MOCK_EXAMS) {
    map[exam.id] = exam;
  }
  return map;
}

function loadStoreFromDisk(): AspirantExamStoreShape {
  if (memoryStore) return memoryStore;

  let loaded: Partial<AspirantExamStoreShape> | null = null;
  try {
    if (fs.existsSync(ASPIRANT_EXAMS_STORE_FILE)) {
      const raw = fs.readFileSync(ASPIRANT_EXAMS_STORE_FILE, 'utf8');
      loaded = JSON.parse(raw);
    }
  } catch {
    loaded = null;
  }

  const starterMap = buildStarterExamMap();
  const mergedMockExams: Record<string, StoredMockExam> = { ...starterMap };

  // Preserve any existing stored exams (never regenerate or overwrite existing tournament archives)
  if (loaded?.mockExams && typeof loaded.mockExams === 'object') {
    for (const [id, exam] of Object.entries(loaded.mockExams)) {
      if (exam && exam.id && Array.isArray(exam.questions) && exam.questions.length > 0) {
        mergedMockExams[id] = exam;
      }
    }
  }

  memoryStore = {
    version: 1,
    mockExams: mergedMockExams,
    tournaments: loaded?.tournaments && typeof loaded.tournaments === 'object' ? loaded.tournaments : {},
    registrations: loaded?.registrations && typeof loaded.registrations === 'object' ? loaded.registrations : {},
    updatedAt: loaded?.updatedAt || nowIso(),
  };

  persistStoreToDisk();
  return memoryStore;
}

function persistStoreToDisk(): void {
  if (!memoryStore) return;
  memoryStore.updatedAt = nowIso();
  try {
    fs.writeFileSync(ASPIRANT_EXAMS_STORE_FILE, JSON.stringify(memoryStore, null, 2), 'utf8');
  } catch (err) {
    console.warn('[AspirantExams] Could not persist disk store:', err);
  }
}

export function resetAspirantExamMemoryCache(): void {
  memoryStore = null;
  firestoreHydratedOnce = false;
}

async function trySyncExamToFirestore(serverDb: any, exam: StoredMockExam): Promise<void> {
  if (!serverDb) return;
  try {
    const ref = doc(serverDb, 'aspirantMockExams', exam.id);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, exam);
    }
  } catch {
    // Firestore client-lite server SDK without admin credentials is expected to hit permission-denied
    // on write; Super Admin client session & disk store keep everything consistent.
  }
}

async function trySyncTournamentToFirestore(serverDb: any, tournament: WeeklyNationalTournament): Promise<void> {
  if (!serverDb) return;
  try {
    await setDoc(doc(serverDb, 'nationalMockTournaments', tournament.id), tournament);
  } catch {
    // Best-effort sync
  }
}

export async function hydrateAspirantExamsFromFirestore(serverDb: any): Promise<void> {
  const store = loadStoreFromDisk();
  if (!serverDb || firestoreHydratedOnce) return;
  firestoreHydratedOnce = true;

  try {
    const snap = await getDocs(collection(serverDb, 'aspirantMockExams'));
    let changed = false;
    snap.forEach((docSnap: any) => {
      const data = docSnap.data() as StoredMockExam;
      if (data && data.id && Array.isArray(data.questions) && data.questions.length > 0) {
        if (!store.mockExams[data.id]) {
          store.mockExams[data.id] = data;
          changed = true;
        }
      }
    });

    const tourneySnap = await getDocs(collection(serverDb, 'nationalMockTournaments'));
    tourneySnap.forEach((docSnap: any) => {
      const data = docSnap.data() as WeeklyNationalTournament;
      if (data && data.id) {
        const local = store.tournaments[data.id];
        if (!local || (data.updatedAt && (!local.updatedAt || data.updatedAt > local.updatedAt))) {
          store.tournaments[data.id] = data;
          changed = true;
        }
      }
    });

    if (changed) {
      persistStoreToDisk();
    }
  } catch {
    // Offline or restricted read; local disk store + bundled 6 starter exams remain authoritative
  }
}

/**
 * Guarantees the 6 fixed starter mock exams (2 JAMB, 2 WAEC, 2 NECO) exist
 * without ever regenerating or duplicating them on subsequent calls.
 */
export async function ensureStarterMockExamsSeeded(serverDb?: any): Promise<StoredMockExam[]> {
  const store = loadStoreFromDisk();
  await hydrateAspirantExamsFromFirestore(serverDb);

  let changed = false;
  for (const starter of STARTER_STORED_MOCK_EXAMS) {
    if (!store.mockExams[starter.id]) {
      store.mockExams[starter.id] = starter;
      changed = true;
      await trySyncExamToFirestore(serverDb, starter);
    }
  }
  if (changed) {
    persistStoreToDisk();
  }

  return listStoredMockExams();
}

export function listStoredMockExams(): StoredMockExam[] {
  const store = loadStoreFromDisk();
  return Object.values(store.mockExams).sort((a, b) => {
    // Starter exams (1..6) always first in order, followed by newest tournament archives
    if (a.source === 'starter' && b.source !== 'starter') return -1;
    if (a.source !== 'starter' && b.source === 'starter') return 1;
    if (a.source === 'starter' && b.source === 'starter') {
      return a.orderIndex - b.orderIndex;
    }
    return String(b.createdAt || '').localeCompare(String(a.createdAt || ''));
  });
}

export function getStoredMockExamById(examId: string): StoredMockExam | null {
  const store = loadStoreFromDisk();
  return store.mockExams[examId] || null;
}

/**
 * Automatically schedules/activates the current weekend's National Mock Tournament
 * (₦500 entry) and auto-archives any prior completed week's unique tournament paper
 * into `aspirantMockExams` so aspirants can practice it later.
 */
export async function getOrAdvanceWeeklyTournament(
  serverDb?: any,
  referenceDate = new Date()
): Promise<{
  activeTournament: WeeklyNationalTournament;
  activePaper: StoredMockExam;
  archivedTournaments: WeeklyNationalTournament[];
}> {
  const store = loadStoreFromDisk();
  await ensureStarterMockExamsSeeded(serverDb);

  const schedule = getWatWeekSchedule(referenceDate);
  let changed = false;

  // 1. Auto-archive any earlier week's tournaments that have passed
  for (const tourney of Object.values(store.tournaments)) {
    if (tourney.id !== schedule.tournamentId) {
      if (tourney.status !== 'completed') {
        tourney.status = 'completed';
        tourney.updatedAt = nowIso();
        changed = true;
      }
      if (!tourney.archivedToMockBank) {
        const archivePaper = buildWeeklyTournamentFallbackPaper({
          weekKey: tourney.weekKey,
          tournamentId: tourney.id,
          editionNumber: parseInt(tourney.weekKey.split('-W')[1] || '1', 10) || 1,
          title: `${tourney.title} (Archive)`,
        });
        if (!store.mockExams[tourney.examPaperId]) {
          store.mockExams[tourney.examPaperId] = {
            ...archivePaper,
            id: tourney.examPaperId,
            tournamentId: tourney.id,
            weekKey: tourney.weekKey,
            orderIndex: Object.keys(store.mockExams).length + 1,
          };
          await trySyncExamToFirestore(serverDb, store.mockExams[tourney.examPaperId]);
        }
        tourney.archivedToMockBank = true;
        tourney.updatedAt = nowIso();
        await trySyncTournamentToFirestore(serverDb, tourney);
        changed = true;
      }
    }
  }

  // 2. Ensure the current week's tournament exists
  let active = store.tournaments[schedule.tournamentId];
  if (!active) {
    active = {
      id: schedule.tournamentId,
      weekKey: schedule.weekKey,
      title: schedule.title,
      subtitle: schedule.subtitle,
      board: 'JAMB',
      entryFeeNaira: WEEKLY_TOURNAMENT_ENTRY_FEE_NAIRA,
      startsAt: schedule.startsAt,
      endsAt: schedule.endsAt,
      status: schedule.status,
      prizePoolLabel: 'Prize Pool — To Be Updated by Admin',
      prizePoolSubtext: 'Weekly championship prizes are set & updated directly by the Platform Admin.',
      prizeNote: 'Entry fee is ₦500 per Aspirant. Top national scorers on the verified leaderboard win the announced weekly rewards.',
      prizes: createDefaultWeeklyPrizes(),
      examPaperId: schedule.examPaperId,
      archivedToMockBank: false,
      participantCount: 0,
      leaderboard: [],
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    store.tournaments[active.id] = active;
    changed = true;
    await trySyncTournamentToFirestore(serverDb, active);
  } else if (active.status !== schedule.status) {
    active.status = schedule.status;
    active.startsAt = schedule.startsAt;
    active.endsAt = schedule.endsAt;
    active.updatedAt = nowIso();
    changed = true;
  }

  // Build or fetch the unique exam paper for this active tournament
  // Note: Active tournament paper is served to registered entrants immediately,
  // and only added to `store.mockExams` bank once archived (at week end or by Super Admin).
  const activePaper: StoredMockExam =
    store.mockExams[active.examPaperId] ||
    buildWeeklyTournamentFallbackPaper({
      weekKey: active.weekKey,
      tournamentId: active.id,
      editionNumber: schedule.editionNumber,
      title: active.title,
    });

  if (changed) {
    persistStoreToDisk();
  }

  const archivedTournaments = Object.values(store.tournaments)
    .filter((t) => t.id !== active.id)
    .sort((a, b) => String(b.weekKey).localeCompare(String(a.weekKey)));

  return {
    activeTournament: active,
    activePaper,
    archivedTournaments,
  };
}

export function getTournamentRegistration(
  tournamentId: string,
  userId: string
): TournamentRegistrationRecord | null {
  const store = loadStoreFromDisk();
  const key = `${tournamentId}__${userId}`;
  return store.registrations[key] || null;
}

export async function recordTournamentRegistration(params: {
  serverDb?: any;
  tournamentId: string;
  userId: string;
  userName: string;
  userEmail?: string;
  state?: string;
  paymentMethod: 'wallet' | 'paystack';
  paymentReference: string;
  amountPaidNaira: number;
}): Promise<{
  registration: TournamentRegistrationRecord;
  tournament: WeeklyNationalTournament;
  alreadyRegistered: boolean;
}> {
  const store = loadStoreFromDisk();
  const { activeTournament } = await getOrAdvanceWeeklyTournament(params.serverDb);
  const tournament = store.tournaments[params.tournamentId] || activeTournament;
  const key = `${tournament.id}__${params.userId}`;

  const existing = store.registrations[key];
  if (existing) {
    return { registration: existing, tournament, alreadyRegistered: true };
  }

  const reg: TournamentRegistrationRecord = {
    id: `treg_${tournament.id}_${params.userId}`,
    tournamentId: tournament.id,
    weekKey: tournament.weekKey,
    userId: params.userId,
    userName: params.userName,
    userEmail: params.userEmail,
    state: params.state || 'Lagos',
    amountPaidNaira: params.amountPaidNaira,
    paymentMethod: params.paymentMethod,
    paymentReference: params.paymentReference,
    registeredAt: nowIso(),
  };

  store.registrations[key] = reg;
  tournament.participantCount = Object.values(store.registrations).filter(
    (r) => r.tournamentId === tournament.id
  ).length;
  tournament.updatedAt = nowIso();
  persistStoreToDisk();

  if (params.serverDb) {
    try {
      await setDoc(doc(params.serverDb, 'tournamentRegistrations', reg.id), reg);
    } catch {
      // Best-effort sync
    }
    await trySyncTournamentToFirestore(params.serverDb, tournament);
  }

  return { registration: reg, tournament, alreadyRegistered: false };
}

export async function submitTournamentScore(params: {
  serverDb?: any;
  tournamentId: string;
  userId: string;
  userName: string;
  state?: string;
  score: number;
  maxScore: number;
  timeTakenSeconds: number;
}): Promise<{
  tournament: WeeklyNationalTournament;
  entry: WeeklyTournamentLeaderboardEntry;
  rank: number;
}> {
  const store = loadStoreFromDisk();
  const { activeTournament } = await getOrAdvanceWeeklyTournament(params.serverDb);
  const tournament = store.tournaments[params.tournamentId] || activeTournament;
  const key = `${tournament.id}__${params.userId}`;
  const reg = store.registrations[key];

  const cleanScore = Math.max(0, Math.min(params.maxScore || 400, Math.round(params.score)));
  const cleanMax = Math.max(1, Math.round(params.maxScore || 400));
  const cleanTime = Math.max(1, Math.round(params.timeTakenSeconds || 60));

  const newEntry: WeeklyTournamentLeaderboardEntry = {
    userId: params.userId,
    name: params.userName || reg?.userName || 'Aspirant',
    state: params.state || reg?.state || 'Nigeria',
    score: cleanScore,
    maxScore: cleanMax,
    timeTakenSeconds: cleanTime,
    submittedAt: nowIso(),
  };

  const existingList = Array.isArray(tournament.leaderboard) ? tournament.leaderboard : [];
  const filtered = existingList.filter((e) => e.userId !== params.userId);
  filtered.push(newEntry);
  filtered.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.timeTakenSeconds - b.timeTakenSeconds;
  });

  tournament.leaderboard = filtered.slice(0, 100);
  tournament.updatedAt = nowIso();

  if (reg) {
    reg.hasSubmitted = true;
    reg.submittedScore = cleanScore;
    reg.timeTakenSeconds = cleanTime;
    reg.submittedAt = newEntry.submittedAt;
  }

  persistStoreToDisk();
  await trySyncTournamentToFirestore(params.serverDb, tournament);

  const rank = tournament.leaderboard.findIndex((e) => e.userId === params.userId) + 1;
  return { tournament, entry: newEntry, rank: rank > 0 ? rank : 1 };
}

export async function updateTournamentPrizesByAdmin(params: {
  serverDb?: any;
  tournamentId?: string;
  adminEmail: string;
  title?: string;
  subtitle?: string;
  prizePoolLabel?: string;
  prizePoolSubtext?: string;
  prizeNote?: string;
  prizes?: Array<{ rankLabel: string; reward: string }>;
}): Promise<WeeklyNationalTournament> {
  const store = loadStoreFromDisk();
  const { activeTournament } = await getOrAdvanceWeeklyTournament(params.serverDb);
  const tournament = (params.tournamentId && store.tournaments[params.tournamentId]) || activeTournament;

  if (typeof params.title === 'string' && params.title.trim()) {
    tournament.title = params.title.trim().slice(0, 140);
  }
  if (typeof params.subtitle === 'string' && params.subtitle.trim()) {
    tournament.subtitle = params.subtitle.trim().slice(0, 200);
  }
  if (typeof params.prizePoolLabel === 'string' && params.prizePoolLabel.trim()) {
    tournament.prizePoolLabel = params.prizePoolLabel.trim().slice(0, 140);
  }
  if (typeof params.prizePoolSubtext === 'string') {
    tournament.prizePoolSubtext = params.prizePoolSubtext.trim().slice(0, 260);
  }
  if (typeof params.prizeNote === 'string') {
    tournament.prizeNote = params.prizeNote.trim().slice(0, 320);
  }
  if (Array.isArray(params.prizes) && params.prizes.length > 0) {
    tournament.prizes = params.prizes
      .slice(0, 10)
      .map((p) => ({
        rankLabel: String(p.rankLabel || '').trim().slice(0, 80),
        reward: String(p.reward || '').trim().slice(0, 140),
      }))
      .filter((p) => p.rankLabel && p.reward);
  }

  tournament.prizeUpdatedBy = params.adminEmail;
  tournament.updatedAt = nowIso();
  persistStoreToDisk();
  await trySyncTournamentToFirestore(params.serverDb, tournament);

  return tournament;
}

/**
 * Archives a tournament's unique exam paper permanently into `aspirantMockExams`
 * under its unique tournament ID (e.g., `nmt-2026-w47`) so it joins the 6 starter mocks.
 */
export async function archiveTournamentPaperToMockBank(params: {
  serverDb?: any;
  tournamentId?: string;
}): Promise<{ tournament: WeeklyNationalTournament; archivedPaper: StoredMockExam }> {
  const store = loadStoreFromDisk();
  const { activeTournament, activePaper } = await getOrAdvanceWeeklyTournament(params.serverDb);
  const tournament = (params.tournamentId && store.tournaments[params.tournamentId]) || activeTournament;

  let archivedPaper = store.mockExams[tournament.examPaperId];
  if (!archivedPaper) {
    const editionNum = parseInt(tournament.weekKey.split('-W')[1] || '1', 10) || 1;
    const basePaper =
      tournament.id === activeTournament.id
        ? activePaper
        : buildWeeklyTournamentFallbackPaper({
            weekKey: tournament.weekKey,
            tournamentId: tournament.id,
            editionNumber: editionNum,
            title: `${tournament.title} (Archive)`,
          });

    archivedPaper = {
      ...basePaper,
      id: tournament.examPaperId,
      title: `${tournament.title} — Official Paper`,
      source: 'tournament',
      isFreeStarter: false,
      tournamentId: tournament.id,
      weekKey: tournament.weekKey,
      orderIndex: Object.keys(store.mockExams).length + 1,
      createdAt: nowIso(),
    };
    store.mockExams[archivedPaper.id] = archivedPaper;
    await trySyncExamToFirestore(params.serverDb, archivedPaper);
  }

  tournament.archivedToMockBank = true;
  tournament.updatedAt = nowIso();
  persistStoreToDisk();
  await trySyncTournamentToFirestore(params.serverDb, tournament);

  return { tournament, archivedPaper };
}
