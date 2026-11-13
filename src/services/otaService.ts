import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  getDocs,
  getDoc
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import {
  OTABroadcastItem,
  OTAPopupAnnouncement,
  OTACompetitionConfig,
  OTAWeeklyCompetitionConfig,
  OTASchoolLeagueConfig,
  OTAAppRelease,
  OTAFeatureFlag,
  OTAFeatureKey
} from '../types';
import {
  TERMLY_CHAMPIONSHIP_PRIZES,
  TERMLY_REGISTRATION_FEE_NAIRA,
  CHAMPIONSHIP_DAYS_CONFIG
} from '../data/competitionPrizesData';

export const CURRENT_APP_VERSION = '2.4.0';

// Cache keys
const CACHE_KEY_BROADCASTS = 'sc_ota_broadcasts_v1';
const CACHE_KEY_POPUP = 'sc_ota_popup_v1';
const CACHE_KEY_COMPETITION = 'sc_ota_competition_v1';
const CACHE_KEY_WEEKLY = 'sc_ota_weekly_v1';
const CACHE_KEY_SCHOOL_LEAGUE = 'sc_ota_school_league_v1';
const CACHE_KEY_DISMISSED_POPUP = 'sc_ota_dismissed_popup_date';
const CACHE_KEY_APP_RELEASE = 'sc_ota_app_release_v1';
const CACHE_KEY_FEATURE_FLAGS = 'sc_ota_feature_flags_v1';
const CACHE_KEY_UPGRADED_VERSION = 'sc_ota_client_upgraded_version_v1';

// ==========================================
// CANONICAL DEFAULT BUNDLES (OFFLINE-SAFE)
// ==========================================

export const DEFAULT_OTA_BROADCASTS: OTABroadcastItem[] = [
  {
    id: 'broadcast_champ_01',
    text: '🏆 Term 1 National Secondary School Championship: 1st Prize Brand New Android Smartphone + ₦150k scholarship package! Registration fee ₦10,000.',
    category: 'championship',
    isActive: true,
    priority: 10,
    actionTab: 'competitions',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'broadcast_waec_02',
    text: '⚡ New WAEC & JAMB UTME Past Questions added for Mathematics, English & Sciences with step-by-step Chief Examiner explanations.',
    category: 'academic',
    isActive: true,
    priority: 8,
    actionTab: 'aspirant-cbt',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'broadcast_schools_03',
    text: '🌟 Inter-School Quiz Standings: Kings College & Queen\'s College leading Week 4 leaderboard! Compete daily to earn school glory.',
    category: 'spotlight',
    isActive: true,
    priority: 7,
    actionTab: 'competitions',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'broadcast_streak_04',
    text: '💡 Study Streak Bonus: Maintain a 5-day consecutive study drill to claim +500 XP and qualify for the Prefect Honor Roll badge.',
    category: 'general',
    isActive: true,
    priority: 5,
    actionTab: 'dashboard',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const DEFAULT_OTA_POPUP: OTAPopupAnnouncement = {
  id: 'popup_term1_championship_2024',
  title: 'Term 1 National Championship Arena',
  subtitle: 'Win an Android Smartphone, Custom Hoodie & Oxford Bag Bundle',
  badge: 'National Tournament 🏆',
  imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1200&q=80',
  body: 'The Termly Championship is now officially open for JSS 1 through SS 3 students across all Nigerian states. Test your knowledge across the 3-day multi-stage syllabus tournament (English, Math, General Paper) and rank among Nigeria\'s top scholars.',
  ctaText: 'Enter Championship Arena · ₦10,000',
  ctaTargetTab: 'competitions',
  isActive: true,
  updatedAt: new Date().toISOString()
};

export const DEFAULT_OTA_COMPETITION_CONFIG: OTACompetitionConfig = {
  id: 'termly_championship',
  registrationFeeNaira: TERMLY_REGISTRATION_FEE_NAIRA,
  termTitle: 'Term 1 National Secondary School Championship',
  academicSession: '2024/2025 Academic Session',
  registrationDeadline: 'November 30, 2024',
  tournamentStartDate: 'December 5, 2024',
  tournamentEndDate: 'December 7, 2024',
  prizes: TERMLY_CHAMPIONSHIP_PRIZES,
  daysConfig: CHAMPIONSHIP_DAYS_CONFIG,
  updatedAt: new Date().toISOString(),
  updatedBy: 'wowrealities@gmail.com'
};

export const DEFAULT_OTA_WEEKLY_CONFIG: OTAWeeklyCompetitionConfig = {
  id: 'weekly_challenge',
  title: 'All-Nigeria Secondary School Speed Championship',
  weekLabel: 'Week 8 National Challenge',
  countdownLabel: 'Closes in 2d 14h 20m',
  description: '10-question timed speed drill covering General Mathematics, English Concord & Natural Sciences. Top 3 students win airtime credited immediately to registered parent line!',
  totalPrizePoolNaira: 50000,
  firstPrize: { title: '1st Place 🥇', valueNaira: 30000, extra: '+ Custom Scholar Hoodie' },
  secondPrize: { title: '2nd Place 🥈', valueNaira: 15000, extra: 'Direct Airtime / Data' },
  thirdPrize: { title: '3rd Place 🥉', valueNaira: 5000, extra: 'Direct Airtime / Data' },
  featuredExamId: 'cbt_math_speed_01',
  featuredExamTitle: 'General Mathematics Speed Drill',
  rules: [
    'Strict 10-minute maximum countdown per attempt',
    'Unlimited practice retakes, highest score ranked on leaderboard',
    'Parent wallet / registered line credited within 24 hours of round close'
  ],
  updatedAt: new Date().toISOString(),
  updatedBy: 'wowrealities@gmail.com'
};

export const DEFAULT_OTA_SCHOOL_LEAGUE_CONFIG: OTASchoolLeagueConfig = {
  id: 'school_league',
  seasonTitle: 'Term 2 National Inter-School Championship',
  roundLabel: 'Term 2 Week 8',
  grandAwardDescription: 'Secondary schools across Nigeria battle for the prestigious Termly Gold Cup and STEM Lab Grants (₦500,000 package) based on aggregate student XP.',
  schools: [
    { id: 'sch_01', name: "King's College, Lagos Island", state: 'Lagos', points: 184500, rank: 1, studentCount: 340, badge: 'Defending Champion 🏆' },
    { id: 'sch_02', name: "Queen's College, Yaba", state: 'Lagos', points: 179200, rank: 2, studentCount: 325, badge: 'Gold Contender 🥈' },
    { id: 'sch_03', name: 'Loyola Jesuit College, Gidan Mangoro', state: 'Abuja (FCT)', points: 168400, rank: 3, studentCount: 280, badge: 'Bronze Contender 🥉' },
    { id: 'sch_04', name: 'Corona Secondary School, Agbara', state: 'Ogun / Lagos', points: 154100, rank: 4, studentCount: 260 },
    { id: 'sch_05', name: 'Federal Government Academy, Suleja', state: 'Niger / FCT', points: 142800, rank: 5, studentCount: 245 },
    { id: 'sch_06', name: 'Government College, Ibadan', state: 'Oyo', points: 133200, rank: 6, studentCount: 290 }
  ],
  updatedAt: new Date().toISOString(),
  updatedBy: 'wowrealities@gmail.com'
};

// ==========================================
// LOCAL STORAGE HELPERS
// ==========================================

function readLocalJson<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined') return fallback;
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeLocalJson<T>(key: string, data: T): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
}

// ==========================================
// REAL-TIME FIRESTORE SUBSCRIPTIONS (AUTH-GATED)
// ==========================================

function createAuthGatedSubscription(
  fetchOnce: () => Promise<void>,
  attachSnapshot: () => () => void
): () => void {
  let active = true;
  let unsubFirestore: (() => void) | null = null;

  // Immediate one-shot read for fast hydration without opening idle Listen streams pre-auth
  if (typeof navigator === 'undefined' || navigator.onLine) {
    fetchOnce().catch(() => {});
  }

  const detach = () => {
    if (unsubFirestore) {
      try {
        unsubFirestore();
      } catch {}
      unsubFirestore = null;
    }
  };

  const unsubAuth = onAuthStateChanged(auth, (user) => {
    if (!active) return;
    if (user) {
      if (!unsubFirestore) {
        try {
          unsubFirestore = attachSnapshot();
        } catch {}
      }
    } else {
      detach();
    }
  });

  if (auth.currentUser && !unsubFirestore) {
    try {
      unsubFirestore = attachSnapshot();
    } catch {}
  }

  return () => {
    active = false;
    try {
      unsubAuth();
    } catch {}
    detach();
  };
}

/**
 * Subscribe to live OTA Broadcast ticker items
 */
export function subscribeToOTABroadcasts(
  callback: (items: OTABroadcastItem[]) => void
): () => void {
  const cached = readLocalJson<OTABroadcastItem[]>(CACHE_KEY_BROADCASTS, DEFAULT_OTA_BROADCASTS);
  callback(cached);

  const handleBroadcastSnap = (snapshot: { empty: boolean; forEach: (fn: (d: { id: string; data: () => unknown }) => void) => void }) => {
    if (!snapshot.empty) {
      const remoteItems: OTABroadcastItem[] = [];
      snapshot.forEach((d) => {
        const data = d.data() as Partial<OTABroadcastItem>;
        if (data.text) {
          remoteItems.push({
            id: d.id,
            text: data.text || '',
            category: data.category || 'general',
            isActive: data.isActive !== undefined ? data.isActive : true,
            priority: data.priority || 0,
            actionTab: data.actionTab,
            createdAt: data.createdAt || new Date().toISOString(),
            updatedAt: data.updatedAt || new Date().toISOString()
          });
        }
      });

      remoteItems.sort((a, b) => (b.priority || 0) - (a.priority || 0));

      if (remoteItems.length > 0) {
        writeLocalJson(CACHE_KEY_BROADCASTS, remoteItems);
        callback(remoteItems);
        return;
      }
    }
    callback(cached);
  };

  const colRef = collection(db, 'otaBroadcasts');
  return createAuthGatedSubscription(
    async () => {
      const snap = await getDocs(colRef);
      handleBroadcastSnap(snap);
    },
    () =>
      onSnapshot(
        colRef,
        (snapshot) => handleBroadcastSnap(snapshot),
        (error) => {
          console.warn('OTA broadcasts listener offline, using cached/defaults:', error);
          callback(cached);
        }
      )
  );
}

/**
 * Subscribe to live OTA Pop-up Announcement
 */
export function subscribeToOTAPopup(
  callback: (popup: OTAPopupAnnouncement | null) => void
): () => void {
  const cached = readLocalJson<OTAPopupAnnouncement | null>(CACHE_KEY_POPUP, DEFAULT_OTA_POPUP);
  callback(cached);

  const handlePopupSnap = (snapshot: { empty: boolean; forEach: (fn: (d: { id: string; data: () => unknown }) => void) => void }) => {
    if (!snapshot.empty) {
      const activeList: OTAPopupAnnouncement[] = [];
      snapshot.forEach((d) => {
        const data = d.data() as OTAPopupAnnouncement;
        if (data && data.isActive !== false) {
          activeList.push({
            ...data,
            id: d.id
          });
        }
      });

      if (activeList.length > 0) {
        const newest = activeList[0];
        writeLocalJson(CACHE_KEY_POPUP, newest);
        callback(newest);
        return;
      }
    }
    callback(cached);
  };

  const colRef = collection(db, 'otaAnnouncements');
  return createAuthGatedSubscription(
    async () => {
      const snap = await getDocs(colRef);
      handlePopupSnap(snap);
    },
    () =>
      onSnapshot(
        colRef,
        (snapshot) => handlePopupSnap(snapshot),
        (error) => {
          console.warn('OTA popup listener offline, using cached:', error);
          callback(cached);
        }
      )
  );
}

/**
 * Subscribe to live OTA Competition Arena Configuration
 */
export function subscribeToOTACompetition(
  callback: (config: OTACompetitionConfig) => void
): () => void {
  const cached = readLocalJson<OTACompetitionConfig>(CACHE_KEY_COMPETITION, DEFAULT_OTA_COMPETITION_CONFIG);
  callback(cached);

  const docRef = doc(db, 'otaCompetitions', 'termly_championship');
  const handleSnap = (snap: { exists: () => boolean; data: () => unknown }) => {
    if (snap.exists()) {
      const remoteConfig = snap.data() as OTACompetitionConfig;
      writeLocalJson(CACHE_KEY_COMPETITION, remoteConfig);
      callback(remoteConfig);
    } else {
      callback(cached);
    }
  };

  return createAuthGatedSubscription(
    async () => {
      const snap = await getDoc(docRef);
      handleSnap(snap);
    },
    () =>
      onSnapshot(
        docRef,
        (snap) => handleSnap(snap),
        (error) => {
          console.warn('OTA competition listener offline, using cached:', error);
          callback(cached);
        }
      )
  );
}

// ==========================================
// ADMIN MUTATION SERVICES (SUPER ADMIN ONLY)
// ==========================================

export async function saveOTABroadcastItem(item: OTABroadcastItem): Promise<void> {
  const docRef = doc(db, 'otaBroadcasts', item.id);
  const payload: OTABroadcastItem = {
    ...item,
    updatedAt: new Date().toISOString()
  };
  await setDoc(docRef, payload, { merge: true });

  // Update local cache immediately
  const current = readLocalJson<OTABroadcastItem[]>(CACHE_KEY_BROADCASTS, DEFAULT_OTA_BROADCASTS);
  const updated = current.filter(b => b.id !== item.id).concat(payload);
  updated.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  writeLocalJson(CACHE_KEY_BROADCASTS, updated);
}

export async function deleteOTABroadcastItem(id: string): Promise<void> {
  const docRef = doc(db, 'otaBroadcasts', id);
  await deleteDoc(docRef);

  const current = readLocalJson<OTABroadcastItem[]>(CACHE_KEY_BROADCASTS, DEFAULT_OTA_BROADCASTS);
  const updated = current.filter(b => b.id !== id);
  writeLocalJson(CACHE_KEY_BROADCASTS, updated);
}

export async function saveOTAPopupAnnouncement(announcement: OTAPopupAnnouncement): Promise<void> {
  const docRef = doc(db, 'otaAnnouncements', announcement.id);
  const payload: OTAPopupAnnouncement = {
    ...announcement,
    updatedAt: new Date().toISOString()
  };
  await setDoc(docRef, payload, { merge: true });
  writeLocalJson(CACHE_KEY_POPUP, payload);
}

export async function saveOTACompetitionConfig(config: OTACompetitionConfig): Promise<void> {
  const docRef = doc(db, 'otaCompetitions', 'termly_championship');
  const payload: OTACompetitionConfig = {
    ...config,
    updatedAt: new Date().toISOString()
  };
  await setDoc(docRef, payload, { merge: true });
  writeLocalJson(CACHE_KEY_COMPETITION, payload);
}

/**
 * Subscribe to live OTA Weekly Competition Challenge
 */
export function subscribeToOTAWeeklyCompetition(
  callback: (config: OTAWeeklyCompetitionConfig) => void
): () => void {
  const cached = readLocalJson<OTAWeeklyCompetitionConfig>(CACHE_KEY_WEEKLY, DEFAULT_OTA_WEEKLY_CONFIG);
  callback(cached);

  const docRef = doc(db, 'otaCompetitions', 'weekly_challenge');
  const handleSnap = (snap: { exists: () => boolean; data: () => unknown }) => {
    if (snap.exists()) {
      const remoteConfig = snap.data() as OTAWeeklyCompetitionConfig;
      writeLocalJson(CACHE_KEY_WEEKLY, remoteConfig);
      callback(remoteConfig);
    } else {
      callback(cached);
    }
  };

  return createAuthGatedSubscription(
    async () => {
      const snap = await getDoc(docRef);
      handleSnap(snap);
    },
    () =>
      onSnapshot(
        docRef,
        (snap) => handleSnap(snap),
        (error) => {
          console.warn('OTA weekly challenge listener offline, using cached:', error);
          callback(cached);
        }
      )
  );
}

export async function saveOTAWeeklyCompetition(config: OTAWeeklyCompetitionConfig): Promise<void> {
  const docRef = doc(db, 'otaCompetitions', 'weekly_challenge');
  const payload: OTAWeeklyCompetitionConfig = {
    ...config,
    updatedAt: new Date().toISOString()
  };
  await setDoc(docRef, payload, { merge: true });
  writeLocalJson(CACHE_KEY_WEEKLY, payload);
}

/**
 * Subscribe to live OTA Inter-School League Configuration
 */
export function subscribeToOTASchoolLeague(
  callback: (config: OTASchoolLeagueConfig) => void
): () => void {
  const cached = readLocalJson<OTASchoolLeagueConfig>(CACHE_KEY_SCHOOL_LEAGUE, DEFAULT_OTA_SCHOOL_LEAGUE_CONFIG);
  callback(cached);

  const docRef = doc(db, 'otaCompetitions', 'school_league');
  const handleSnap = (snap: { exists: () => boolean; data: () => unknown }) => {
    if (snap.exists()) {
      const remoteConfig = snap.data() as OTASchoolLeagueConfig;
      writeLocalJson(CACHE_KEY_SCHOOL_LEAGUE, remoteConfig);
      callback(remoteConfig);
    } else {
      callback(cached);
    }
  };

  return createAuthGatedSubscription(
    async () => {
      const snap = await getDoc(docRef);
      handleSnap(snap);
    },
    () =>
      onSnapshot(
        docRef,
        (snap) => handleSnap(snap),
        (error) => {
          console.warn('OTA school league listener offline, using cached:', error);
          callback(cached);
        }
      )
  );
}

export async function saveOTASchoolLeague(config: OTASchoolLeagueConfig): Promise<void> {
  const docRef = doc(db, 'otaCompetitions', 'school_league');
  const payload: OTASchoolLeagueConfig = {
    ...config,
    updatedAt: new Date().toISOString()
  };
  await setDoc(docRef, payload, { merge: true });
  writeLocalJson(CACHE_KEY_SCHOOL_LEAGUE, payload);
}

// ==========================================
// USER DISMISSAL TRACKING
// ==========================================

export function isPopupDismissedToday(popupId: string): boolean {
  try {
    if (typeof window === 'undefined') return false;
    const raw = localStorage.getItem(`${CACHE_KEY_DISMISSED_POPUP}_${popupId}`);
    if (!raw) return false;
    const today = new Date().toISOString().slice(0, 10);
    return raw === today;
  } catch {
    return false;
  }
}

export function markPopupDismissedToday(popupId: string): void {
  try {
    if (typeof window === 'undefined') return;
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem(`${CACHE_KEY_DISMISSED_POPUP}_${popupId}`, today);
  } catch {}
}

// ==========================================
// OTA APP RELEASES & VERSION ENFORCEMENT
// ==========================================

export function compareSemver(a: string, b: string): number {
  const parse = (v: string) =>
    String(v || '0.0.0')
      .replace(/^v/i, '')
      .split('.')
      .map((n) => parseInt(n.replace(/[^0-9]/g, ''), 10) || 0);
  const pa = parse(a);
  const pb = parse(b);
  const len = Math.max(pa.length, pb.length, 3);
  for (let i = 0; i < len; i++) {
    const da = pa[i] || 0;
    const db = pb[i] || 0;
    if (da > db) return 1;
    if (da < db) return -1;
  }
  return 0;
}

export function getEffectiveClientVersion(): string {
  try {
    if (typeof window === 'undefined') return CURRENT_APP_VERSION;
    const stored = localStorage.getItem(CACHE_KEY_UPGRADED_VERSION);
    if (stored && compareSemver(stored, CURRENT_APP_VERSION) >= 0) {
      return stored;
    }
  } catch {}
  return CURRENT_APP_VERSION;
}

export const DEFAULT_OTA_APP_RELEASE: OTAAppRelease = {
  id: 'current_release',
  latestVersion: CURRENT_APP_VERSION,
  minimumSupportedVersion: '2.0.0',
  releaseTitle: 'Student Companion Bento & Live Reminders Update',
  changelog:
    'Vibrant Bento hubs across all portals, 3-gate verified lesson reading, live engagement reminders, and enhanced security.',
  featureHighlights: [
    'Vibrant Bento-grid learning hubs & tactile audio chimes',
    'Smart streak reminders, browser push & email digests',
    '3-gate verified NERDC lesson note reading & progress sync'
  ],
  upgradeMode: 'mild_notice',
  upgradeUrl: '',
  isActive: false,
  publishedAt: new Date().toISOString(),
  publishedBy: 'wowrealities@gmail.com'
};

export function subscribeToOTAAppRelease(
  callback: (release: OTAAppRelease) => void
): () => void {
  const cached = readLocalJson<OTAAppRelease>(CACHE_KEY_APP_RELEASE, DEFAULT_OTA_APP_RELEASE);
  callback(cached);

  // Also check Express mirror immediately
  fetch('/api/ota/state')
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      if (data && data.appRelease && data.appRelease.latestVersion) {
        const merged: OTAAppRelease = { ...DEFAULT_OTA_APP_RELEASE, ...data.appRelease };
        writeLocalJson(CACHE_KEY_APP_RELEASE, merged);
        callback(merged);
      }
    })
    .catch(() => {});

  const docRef = doc(db, 'otaAppReleases', 'current_release');
  const handleSnap = (snap: { exists: () => boolean; data: () => unknown }) => {
    if (snap.exists()) {
      const remote = { ...DEFAULT_OTA_APP_RELEASE, ...(snap.data() as Partial<OTAAppRelease>) };
      writeLocalJson(CACHE_KEY_APP_RELEASE, remote);
      callback(remote);
    }
  };

  return createAuthGatedSubscription(
    async () => {
      const snap = await getDoc(docRef);
      handleSnap(snap);
    },
    () =>
      onSnapshot(
        docRef,
        (snap) => handleSnap(snap),
        () => {
          callback(readLocalJson<OTAAppRelease>(CACHE_KEY_APP_RELEASE, DEFAULT_OTA_APP_RELEASE));
        }
      )
  );
}

export async function saveOTAAppRelease(release: OTAAppRelease): Promise<void> {
  const payload: OTAAppRelease = {
    ...release,
    id: 'current_release',
    publishedAt: new Date().toISOString()
  };
  writeLocalJson(CACHE_KEY_APP_RELEASE, payload);

  await fetch('/api/ota/release', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).catch(() => {});

  try {
    await setDoc(doc(db, 'otaAppReleases', 'current_release'), payload, { merge: true });
  } catch (err) {
    console.warn('Firestore OTA release write warning (mirrored via API):', err);
  }
}

export async function executeOTAUpgrade(targetVersion: string): Promise<void> {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CACHE_KEY_UPGRADED_VERSION, targetVersion);
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        for (const reg of regs) {
          if (reg.waiting) {
            reg.waiting.postMessage({ type: 'SKIP_WAITING' });
          }
          reg.active?.postMessage({ type: 'CLEAR_CACHES' });
          await reg.update().catch(() => {});
        }
      }
      window.location.reload();
    }
  } catch {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }
}

// ==========================================
// PER-FEATURE PAUSE / MAINTENANCE CONTROLS
// ==========================================

const nowIso = new Date().toISOString();

export const DEFAULT_OTA_FEATURE_FLAGS: Record<OTAFeatureKey, OTAFeatureFlag> = {
  lesson_notes: {
    featureKey: 'lesson_notes',
    label: 'Lesson Notes & NERDC Syllabus',
    description: 'Scheme of Work, weekly notes, and verified reading tracker',
    category: 'Student Hub',
    isPaused: false,
    pauseReason: 'Curriculum content maintenance is underway.',
    estimatedResume: '',
    updatedAt: nowIso,
    updatedBy: 'system'
  },
  cbt_quizzes: {
    featureKey: 'cbt_quizzes',
    label: 'Interactive Quizzes & CBT Engine',
    description: 'Termly drills, mock assessments, and WAEC/NECO/BECE CBT runs',
    category: 'Student Hub',
    isPaused: false,
    pauseReason: 'Question bank maintenance is in progress.',
    estimatedResume: '',
    updatedAt: nowIso,
    updatedBy: 'system'
  },
  ai_study_coach: {
    featureKey: 'ai_study_coach',
    label: 'AI Study Coach',
    description: '24/7 AI tutoring explanations and guided problem solving',
    category: 'Student Hub',
    isPaused: false,
    pauseReason: 'AI tutor model maintenance is in progress.',
    estimatedResume: '',
    updatedAt: nowIso,
    updatedBy: 'system'
  },
  competitions: {
    featureKey: 'competitions',
    label: 'Competitions & School League',
    description: 'Termly Championship Arena, Weekly Challenges & School Leaderboard',
    category: 'Student Hub',
    isPaused: false,
    pauseReason: 'Competition leaderboard recalculation and maintenance.',
    estimatedResume: '',
    updatedAt: nowIso,
    updatedBy: 'system'
  },
  tutor_marketplace: {
    featureKey: 'tutor_marketplace',
    label: 'Tutor Marketplace & Discovery',
    description: 'Browse verified tutors and book 1-on-1 tutoring sessions',
    category: 'Student Hub',
    isPaused: false,
    pauseReason: 'Tutor matching service is under scheduled maintenance.',
    estimatedResume: '',
    updatedAt: nowIso,
    updatedBy: 'system'
  },
  games_hub: {
    featureKey: 'games_hub',
    label: 'Games Hub (Arcade)',
    description: 'Educational STEM, Speed Concord, History & Logic mini-games',
    category: 'Student Hub',
    isPaused: false,
    pauseReason: 'Arcade games are undergoing scheduled updates.',
    estimatedResume: '',
    updatedAt: nowIso,
    updatedBy: 'system'
  },
  science_formulas: {
    featureKey: 'science_formulas',
    label: 'Science & Math Formulas Sheet',
    description: 'Interactive Physics, Chemistry, and Maths reference formulas',
    category: 'Student Hub',
    isPaused: false,
    pauseReason: 'Formula reference library maintenance is underway.',
    estimatedResume: '',
    updatedAt: nowIso,
    updatedBy: 'system'
  },
  community_forum: {
    featureKey: 'community_forum',
    label: 'Student Community Forum',
    description: 'Moderated peer study channels and Q&A discussions',
    category: 'Student Hub',
    isPaused: false,
    pauseReason: 'Community forum moderation and maintenance in progress.',
    estimatedResume: '',
    updatedAt: nowIso,
    updatedBy: 'system'
  },
  exam_prep: {
    featureKey: 'exam_prep',
    label: 'Prepare For Exam Hub',
    description: 'Personalized 30-day AI study calendar and exam readiness planner',
    category: 'Student Hub',
    isPaused: false,
    pauseReason: 'Exam Prep planner maintenance is underway.',
    estimatedResume: '',
    updatedAt: nowIso,
    updatedBy: 'system'
  },
  aspirant_hub: {
    featureKey: 'aspirant_hub',
    label: 'University Aspirant Hub (UTME)',
    description: 'JAMB UTME simulator, Admission Guide & National Mock Tournaments',
    category: 'Student Hub',
    isPaused: false,
    pauseReason: 'University Aspirant portal is under maintenance.',
    estimatedResume: '',
    updatedAt: nowIso,
    updatedBy: 'system'
  },
  uniform_verification: {
    featureKey: 'uniform_verification',
    label: 'AI Uniform Verification',
    description: 'Camera-based school uniform verification scanner',
    category: 'Student Hub',
    isPaused: false,
    pauseReason: 'Uniform verification scanner is under maintenance.',
    estimatedResume: '',
    updatedAt: nowIso,
    updatedBy: 'system'
  },
  parent_portal: {
    featureKey: 'parent_portal',
    label: 'Parent Portal & Ward Monitoring',
    description: 'Ward academic tracking, escrow approvals & parent wallet',
    category: 'Persona Portal',
    isPaused: false,
    pauseReason: 'Parent Portal is undergoing scheduled maintenance.',
    estimatedResume: '',
    updatedAt: nowIso,
    updatedBy: 'system'
  },
  tutor_portal: {
    featureKey: 'tutor_portal',
    label: 'Tutor Portal & Bookings',
    description: 'Tutor schedule, student session queue & earnings management',
    category: 'Persona Portal',
    isPaused: false,
    pauseReason: 'Tutor Portal is undergoing scheduled maintenance.',
    estimatedResume: '',
    updatedAt: nowIso,
    updatedBy: 'system'
  },
  growth_partner_portal: {
    featureKey: 'growth_partner_portal',
    label: 'Growth Partner Portal',
    description: 'Referral tracking, commission ledger & withdrawal center',
    category: 'Persona Portal',
    isPaused: false,
    pauseReason: 'Growth Partner Portal is under scheduled maintenance.',
    estimatedResume: '',
    updatedAt: nowIso,
    updatedBy: 'system'
  },
  school_admin_portal: {
    featureKey: 'school_admin_portal',
    label: 'School Admin Portal',
    description: 'School accreditation, bulk student roster & material uploads',
    category: 'Persona Portal',
    isPaused: false,
    pauseReason: 'School Admin Portal is under scheduled maintenance.',
    estimatedResume: '',
    updatedAt: nowIso,
    updatedBy: 'system'
  },
  virtual_classroom: {
    featureKey: 'virtual_classroom',
    label: 'Virtual Live Classroom',
    description: 'Live audio/video tutoring whiteboard sessions',
    category: 'Core Service',
    isPaused: false,
    pauseReason: 'Virtual Classroom servers are undergoing scheduled maintenance.',
    estimatedResume: '',
    updatedAt: nowIso,
    updatedBy: 'system'
  },
  wallet_payments: {
    featureKey: 'wallet_payments',
    label: 'Subscriptions & Paystack Checkout',
    description: 'Plan upgrades, wallet top-ups, and escrow checkout flows',
    category: 'Core Service',
    isPaused: false,
    pauseReason: 'Payment gateway maintenance is in progress. No charges will be processed.',
    estimatedResume: '',
    updatedAt: nowIso,
    updatedBy: 'system'
  }
};

function mergeFlagsWithDefaults(
  partialList: Partial<OTAFeatureFlag>[]
): Record<OTAFeatureKey, OTAFeatureFlag> {
  const merged = { ...DEFAULT_OTA_FEATURE_FLAGS };
  for (const item of partialList) {
    if (item && item.featureKey && merged[item.featureKey]) {
      merged[item.featureKey] = {
        ...merged[item.featureKey],
        ...item
      };
    }
  }
  return merged;
}

export function subscribeToOTAFeatureFlags(
  callback: (flags: Record<OTAFeatureKey, OTAFeatureFlag>) => void
): () => void {
  const cached = mergeFlagsWithDefaults(
    Object.values(readLocalJson<Record<string, OTAFeatureFlag>>(CACHE_KEY_FEATURE_FLAGS, {}))
  );
  callback(cached);

  fetch('/api/ota/state')
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      if (data && data.featureFlags && typeof data.featureFlags === 'object') {
        const merged = mergeFlagsWithDefaults(Object.values(data.featureFlags));
        writeLocalJson(CACHE_KEY_FEATURE_FLAGS, merged);
        callback(merged);
      }
    })
    .catch(() => {});

  const colRef = collection(db, 'otaFeatureFlags');
  const handleSnap = (snap: { empty: boolean; forEach: (fn: (d: { id: string; data: () => unknown }) => void) => void }) => {
    if (!snap.empty) {
      const list: Partial<OTAFeatureFlag>[] = [];
      snap.forEach((d) => {
        const val = d.data() as Partial<OTAFeatureFlag>;
        list.push({ ...val, featureKey: (val.featureKey || d.id) as OTAFeatureKey });
      });
      const merged = mergeFlagsWithDefaults(list);
      writeLocalJson(CACHE_KEY_FEATURE_FLAGS, merged);
      callback(merged);
    }
  };

  return createAuthGatedSubscription(
    async () => {
      const snap = await getDocs(colRef);
      handleSnap(snap);
    },
    () =>
      onSnapshot(
        colRef,
        (snap) => handleSnap(snap),
        () => {
          const fallback = mergeFlagsWithDefaults(
            Object.values(readLocalJson<Record<string, OTAFeatureFlag>>(CACHE_KEY_FEATURE_FLAGS, {}))
          );
          callback(fallback);
        }
      )
  );
}

export async function saveOTAFeatureFlag(flag: OTAFeatureFlag): Promise<void> {
  const payload: OTAFeatureFlag = {
    ...flag,
    updatedAt: new Date().toISOString()
  };

  const current = mergeFlagsWithDefaults(
    Object.values(readLocalJson<Record<string, OTAFeatureFlag>>(CACHE_KEY_FEATURE_FLAGS, {}))
  );
  current[payload.featureKey] = payload;
  writeLocalJson(CACHE_KEY_FEATURE_FLAGS, current);

  await fetch('/api/ota/features', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ flag: payload })
  }).catch(() => {});

  try {
    await setDoc(doc(db, 'otaFeatureFlags', payload.featureKey), payload, { merge: true });
  } catch (err) {
    console.warn('Firestore feature flag write warning (mirrored via API):', err);
  }
}

export async function saveAllOTAFeatureFlags(
  flagsMap: Record<OTAFeatureKey, OTAFeatureFlag>
): Promise<void> {
  writeLocalJson(CACHE_KEY_FEATURE_FLAGS, flagsMap);

  await fetch('/api/ota/features', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ flagsMap })
  }).catch(() => {});

  const entries = Object.values(flagsMap);
  for (const f of entries) {
    try {
      await setDoc(doc(db, 'otaFeatureFlags', f.featureKey), f, { merge: true });
    } catch {
      break;
    }
  }
}

