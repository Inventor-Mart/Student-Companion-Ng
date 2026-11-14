import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  getDocs,
  getDoc,
  getDocFromServer
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import {
  OTABroadcastItem,
  OTAPopupAnnouncement,
  OTACompetitionConfig,
  OTAWeeklyCompetitionConfig,
  OTASchoolLeagueConfig,
  OTAAppReleaseConfig,
  OTAFeatureFlags,
  OTAFeatureKey,
  OTAUpgradeMode
} from '../types';
import {
  TERMLY_CHAMPIONSHIP_PRIZES,
  TERMLY_REGISTRATION_FEE_NAIRA,
  CHAMPIONSHIP_DAYS_CONFIG
} from '../data/competitionPrizesData';

const RAW_BUNDLED_VERSION =
  typeof __APP_VERSION__ !== 'undefined' ? String(__APP_VERSION__) : '2.4.0';

export const CURRENT_APP_VERSION = /^\d+\.\d+\.\d+$/.test(RAW_BUNDLED_VERSION.replace(/^v/i, ''))
  ? RAW_BUNDLED_VERSION.replace(/^v/i, '')
  : '2.4.0';

// Cache keys
const CACHE_KEY_BROADCASTS = 'sc_ota_broadcasts_v1';
const CACHE_KEY_POPUP = 'sc_ota_popup_v1';
const CACHE_KEY_COMPETITION = 'sc_ota_competition_v1';
const CACHE_KEY_WEEKLY = 'sc_ota_weekly_v1';
const CACHE_KEY_SCHOOL_LEAGUE = 'sc_ota_school_league_v1';
const CACHE_KEY_DISMISSED_POPUP = 'sc_ota_dismissed_popup_date';
const CACHE_KEY_APP_RELEASE = 'sc_ota_app_release_v1';
const STORAGE_KEY_INSTALLED_VERSION = 'sc_installed_app_version';
const STORAGE_KEY_DISMISSED_RELEASE = 'sc_ota_dismissed_release_v1';
const STORAGE_KEY_DISMISSED_RECOMMENDED_AT = 'sc_ota_dismissed_recommended_at_v1';
const STORAGE_KEY_ADMIN_TOKEN = 'sc_ota_admin_token_v1';

export const BASE_APP_VERSION = CURRENT_APP_VERSION;

export const DEFAULT_PAUSED_FEATURE_MESSAGE =
  'This module is temporarily paused over-the-air while improvements are rolled out. Other study tools remain available.';

export interface OTAFeatureMetadata {
  key: OTAFeatureKey;
  title: string;
  description: string;
  category: 'study' | 'enrichment' | 'portals';
}

export const OTA_FEATURE_CATALOG: OTAFeatureMetadata[] = [
  // Study & Assessments
  {
    key: 'lessonNotes',
    title: 'Lesson Notes & NERDC Syllabus',
    description: 'Scheme of Work explorer, weekly notes & verified reading timers',
    category: 'study'
  },
  {
    key: 'termlyDrill',
    title: 'Termly Assessment Drills',
    description: '40-question NERDC termly mocks & BECE/WAEC/NECO/JAMB drill generator',
    category: 'study'
  },
  {
    key: 'cbtExams',
    title: 'CBT Exam Practice & Quizzes',
    description: 'Interactive quizzes, past exam simulator & CBT catalog',
    category: 'study'
  },
  {
    key: 'examPrep',
    title: 'Prepare For Exam Planner',
    description: 'AI daily study timetable, diagnostic profiler & tutor credits',
    category: 'study'
  },
  {
    key: 'scienceFormulas',
    title: 'STEM Formulas Sheet',
    description: 'Physics, Math & Chemistry equations reference bank',
    category: 'study'
  },
  {
    key: 'uniformVerification',
    title: 'Uniform AI Verification',
    description: 'Student uniform camera scanner & Verified Scholar badge',
    category: 'study'
  },
  // Enrichment, AI & Tutoring
  {
    key: 'aiCoach',
    title: 'AI Study Coach',
    description: '24/7 AI tutor chat & topic diagnostics',
    category: 'enrichment'
  },
  {
    key: 'gamesHub',
    title: 'Games & Brain Arcade',
    description: '12 subject speed & puzzle mini-games',
    category: 'enrichment'
  },
  {
    key: 'tutorMarketplace',
    title: 'Tutor Marketplace & Booking',
    description: 'Discover vetted tutors, chat & schedule tutoring sessions',
    category: 'enrichment'
  },
  {
    key: 'virtualClassroom',
    title: 'Live Virtual Classroom',
    description: 'Interactive digital tutoring whiteboard & live audio',
    category: 'enrichment'
  },
  {
    key: 'competitions',
    title: 'Competitions & School League',
    description: 'Termly championship, weekly challenge & inter-school standings',
    category: 'enrichment'
  },
  {
    key: 'aspirantHub',
    title: 'JAMB & Aspirant CBT Hub',
    description: 'UTME simulator, admission cut-off guide & mock tournaments',
    category: 'enrichment'
  },
  {
    key: 'communityForum',
    title: 'Student Community Forum',
    description: 'Peer discussion channels & moderated study Q&A',
    category: 'enrichment'
  },
  // Role Portals
  {
    key: 'parentPortal',
    title: 'Parent Guardian Portal',
    description: 'Ward progress overview, PIN wallet, approvals & parent lounge',
    category: 'portals'
  },
  {
    key: 'tutorPortal',
    title: 'Educator / Tutor Portal',
    description: 'Session schedules, payout earnings, credentials & chat',
    category: 'portals'
  },
  {
    key: 'schoolAdminPortal',
    title: 'School Administrator Portal',
    description: 'Institutional publishing studio, school materials & accreditation',
    category: 'portals'
  },
  {
    key: 'growthPartnerPortal',
    title: 'Growth Partner Portal',
    description: 'Referral network analytics, partner wallet & marketing toolkit',
    category: 'portals'
  }
];

export const DEFAULT_OTA_FEATURE_FLAGS: OTAFeatureFlags = {
  lessonNotes: true,
  termlyDrill: true,
  cbtExams: true,
  examPrep: true,
  scienceFormulas: true,
  uniformVerification: true,
  aiCoach: true,
  gamesHub: true,
  tutorMarketplace: true,
  virtualClassroom: true,
  competitions: true,
  aspirantHub: true,
  communityForum: true,
  parentPortal: true,
  tutorPortal: true,
  schoolAdminPortal: true,
  growthPartnerPortal: true
};

export const DEFAULT_OTA_APP_RELEASE: OTAAppReleaseConfig = {
  id: 'active_release',
  latestVersion: CURRENT_APP_VERSION,
  minimumSupportedVersion: '2.2.0',
  upgradeMode: 'mild',
  releaseTitle: `Student Companion v${CURRENT_APP_VERSION} · Live Study Engine`,
  releaseNotes: 'Includes active reading timers, cross-session lesson progress persistence, optimized live whiteboard, and instant cloud OTA sync.',
  featureHighlights: [
    'Verified active reading study timers (20–35 min)',
    'Cross-session reading progress & offline resilience',
    'Smooth sign-in chime & instant Lottie transitions'
  ],
  downloadUrl: '',
  featureFlags: DEFAULT_OTA_FEATURE_FLAGS,
  defaultPausedMessage: DEFAULT_PAUSED_FEATURE_MESSAGE,
  pausedFeatureNotes: {},
  maintenanceMode: false,
  maintenanceMessage: 'Scheduled OTA platform maintenance is underway to improve speed and reliability. We will be back shortly.',
  publishedAt: new Date().toISOString(),
  publishedBy: 'martorefe@gmail.com'
};

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

    if (!snapshot.empty) {
      writeLocalJson(CACHE_KEY_BROADCASTS, remoteItems);
      callback(remoteItems);
      return;
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
      } else {
        // Remote popup documents exist and all are paused/inactive: hide popup live
        writeLocalJson(CACHE_KEY_POPUP, null);
        callback(null);
      }
      return;
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
// OTA APP RELEASES, SEMVER & UPGRADE GATE
// ==========================================

export function normalizeSemver(version?: string | null): string {
  if (!version) return CURRENT_APP_VERSION;
  const cleaned = version.trim().replace(/^v/i, '');
  return /^\d+\.\d+\.\d+$/.test(cleaned) ? cleaned : CURRENT_APP_VERSION;
}

export function isValidSemver(version?: string | null): boolean {
  if (!version) return false;
  return /^v?\d+\.\d+\.\d+$/.test(version.trim());
}

/**
 * Returns -1 if vA < vB, 0 if equal, 1 if vA > vB
 */
export function compareSemver(vA: string, vB: string): number {
  const partsA = normalizeSemver(vA).split('.').map(Number);
  const partsB = normalizeSemver(vB).split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    const a = partsA[i] || 0;
    const b = partsB[i] || 0;
    if (a < b) return -1;
    if (a > b) return 1;
  }
  return 0;
}

export function bumpSemver(version: string, part: 'major' | 'minor' | 'patch'): string {
  const [maj, min, pat] = normalizeSemver(version).split('.').map(Number);
  if (part === 'major') return `${maj + 1}.0.0`;
  if (part === 'minor') return `${maj}.${min + 1}.0`;
  return `${maj}.${min}.${pat + 1}`;
}

export function getInstalledAppVersion(): string {
  try {
    if (typeof window === 'undefined') return CURRENT_APP_VERSION;
    const stored = localStorage.getItem(STORAGE_KEY_INSTALLED_VERSION);
    if (stored && isValidSemver(stored)) {
      const normalized = normalizeSemver(stored);
      // If user loaded a newer bundled code build than previously persisted, promote to current bundle version
      if (compareSemver(normalized, CURRENT_APP_VERSION) < 0) {
        localStorage.setItem(STORAGE_KEY_INSTALLED_VERSION, CURRENT_APP_VERSION);
        return CURRENT_APP_VERSION;
      }
      return normalized;
    }
  } catch {}
  return CURRENT_APP_VERSION;
}

export function setInstalledAppVersion(version: string): string {
  const normalized = normalizeSemver(version);
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_INSTALLED_VERSION, normalized);
    }
  } catch {}
  return normalized;
}

export function setServerOTAAdminToken(token: string | null): void {
  try {
    if (typeof window === 'undefined') return;
    if (token && token.trim()) {
      sessionStorage.setItem(STORAGE_KEY_ADMIN_TOKEN, token.trim());
    } else {
      sessionStorage.removeItem(STORAGE_KEY_ADMIN_TOKEN);
    }
  } catch {}
}

export async function getSuperAdminAuthHeader(): Promise<Record<string, string>> {
  try {
    if (auth.currentUser) {
      const idToken = await auth.currentUser.getIdToken();
      if (idToken) {
        return { Authorization: `Bearer ${idToken}` };
      }
    }
  } catch {}
  try {
    if (typeof window !== 'undefined') {
      const sessionToken = sessionStorage.getItem(STORAGE_KEY_ADMIN_TOKEN);
      if (sessionToken) {
        return { Authorization: `Bearer ${sessionToken}` };
      }
    }
  } catch {}
  return {};
}

export function isReleaseDismissed(version: string, mode: OTAUpgradeMode): boolean {
  if (mode === 'mandatory') return false;
  const normalized = normalizeSemver(version);
  try {
    if (typeof window === 'undefined') return false;
    if (mode === 'mild') {
      return localStorage.getItem(STORAGE_KEY_DISMISSED_RELEASE) === normalized;
    }
    if (mode === 'recommended') {
      const dismissedVer = localStorage.getItem(STORAGE_KEY_DISMISSED_RELEASE);
      const dismissedDate = localStorage.getItem(STORAGE_KEY_DISMISSED_RECOMMENDED_AT);
      const today = new Date().toISOString().slice(0, 10);
      return dismissedVer === normalized && dismissedDate === today;
    }
  } catch {}
  return false;
}

export function dismissReleasePrompt(version: string, mode: OTAUpgradeMode): void {
  if (mode === 'mandatory') return;
  const normalized = normalizeSemver(version);
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_DISMISSED_RELEASE, normalized);
      if (mode === 'recommended') {
        localStorage.setItem(
          STORAGE_KEY_DISMISSED_RECOMMENDED_AT,
          new Date().toISOString().slice(0, 10)
        );
      }
    }
  } catch {}
}

export function clearReleaseDismissal(): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY_DISMISSED_RELEASE);
      localStorage.removeItem(STORAGE_KEY_DISMISSED_RECOMMENDED_AT);
    }
  } catch {}
}

function sanitizeReleaseConfig(raw: Partial<OTAAppReleaseConfig> | null | undefined): OTAAppReleaseConfig {
  const rawFlags = (raw?.featureFlags || {}) as Partial<OTAFeatureFlags>;
  const sanitizedFlags: OTAFeatureFlags = { ...DEFAULT_OTA_FEATURE_FLAGS };
  for (const meta of OTA_FEATURE_CATALOG) {
    const val = rawFlags[meta.key];
    sanitizedFlags[meta.key] = typeof val === 'boolean' ? val : true;
  }

  const rawNotes = (raw?.pausedFeatureNotes || {}) as Partial<Record<OTAFeatureKey, unknown>>;
  const sanitizedNotes: Partial<Record<OTAFeatureKey, string>> = {};
  for (const meta of OTA_FEATURE_CATALOG) {
    const val = rawNotes[meta.key];
    if (typeof val === 'string' && val.trim().length > 0) {
      sanitizedNotes[meta.key] = val.trim().slice(0, 240);
    }
  }

  const highlights = Array.isArray(raw?.featureHighlights)
    ? raw!.featureHighlights
        .map((h) => String(h || '').trim())
        .filter(Boolean)
        .slice(0, 10)
    : DEFAULT_OTA_APP_RELEASE.featureHighlights;

  const cleanDownload = typeof raw?.downloadUrl === 'string' ? raw.downloadUrl.trim().slice(0, 500) : '';
  const cleanDefaultPaused =
    typeof raw?.defaultPausedMessage === 'string' && raw.defaultPausedMessage.trim().length > 0
      ? raw.defaultPausedMessage.trim().slice(0, 300)
      : DEFAULT_PAUSED_FEATURE_MESSAGE;

  return {
    id: 'active_release',
    latestVersion: normalizeSemver(raw?.latestVersion || BASE_APP_VERSION),
    minimumSupportedVersion: normalizeSemver(raw?.minimumSupportedVersion || DEFAULT_OTA_APP_RELEASE.minimumSupportedVersion),
    upgradeMode:
      raw?.upgradeMode === 'mild' || raw?.upgradeMode === 'recommended' || raw?.upgradeMode === 'mandatory'
        ? raw.upgradeMode
        : 'mild',
    releaseTitle: (raw?.releaseTitle || DEFAULT_OTA_APP_RELEASE.releaseTitle).trim().slice(0, 160),
    releaseNotes: (raw?.releaseNotes || '').trim().slice(0, 2000),
    featureHighlights: highlights,
    ...(cleanDownload ? { downloadUrl: cleanDownload } : {}),
    featureFlags: sanitizedFlags,
    defaultPausedMessage: cleanDefaultPaused,
    pausedFeatureNotes: sanitizedNotes,
    maintenanceMode: Boolean(raw?.maintenanceMode),
    maintenanceMessage: (raw?.maintenanceMessage || DEFAULT_OTA_APP_RELEASE.maintenanceMessage).trim().slice(0, 500),
    publishedAt: raw?.publishedAt || new Date().toISOString(),
    publishedBy: (raw?.publishedBy || 'martorefe@gmail.com').trim().slice(0, 150)
  };
}

export function resolvePausedFeatureMessage(
  release: OTAAppReleaseConfig,
  featureKey: OTAFeatureKey
): string {
  const custom = release.pausedFeatureNotes?.[featureKey]?.trim();
  if (custom) return custom;
  const fallback = release.defaultPausedMessage?.trim();
  return fallback || DEFAULT_PAUSED_FEATURE_MESSAGE;
}

const releaseListeners = new Set<(config: OTAAppReleaseConfig) => void>();

function notifyReleaseListeners(config: OTAAppReleaseConfig): void {
  writeLocalJson(CACHE_KEY_APP_RELEASE, config);
  releaseListeners.forEach((cb) => cb(config));
}

export interface LiveOTASaveResult {
  release: OTAAppReleaseConfig;
  syncedFirestore: boolean;
  syncedServer: boolean;
}

export interface GitHubApkReleaseInfo {
  apkReady: boolean;
  apkUrl: string | null;
  versionName: string | null;
}

export async function fetchLatestGitHubApkRelease(): Promise<GitHubApkReleaseInfo> {
  try {
    const res = await fetch('/api/android/apk-status', { cache: 'no-store' });
    if (!res.ok) {
      return { apkReady: false, apkUrl: null, versionName: null };
    }
    const data = await res.json();
    return {
      apkReady: Boolean(data?.apkReady && data?.apkUrl),
      apkUrl: typeof data?.apkUrl === 'string' ? data.apkUrl : null,
      versionName: typeof data?.versionName === 'string' ? data.versionName : null,
    };
  } catch {
    return { apkReady: false, apkUrl: null, versionName: null };
  }
}

/**
 * Queries live Firestore (bypassing IndexedDB cache) and Express /api/ota/state
 * concurrently to obtain the latest authoritative OTA release configuration.
 */
export async function fetchLiveOTAAppRelease(): Promise<OTAAppReleaseConfig | null> {
  const docRef = doc(db, 'otaAppReleases', 'active_release');

  const [firestoreRes, serverRes] = await Promise.allSettled([
    getDocFromServer(docRef),
    fetch('/api/ota/state', { cache: 'no-store' }).then((r) => (r.ok ? r.json() : null)),
  ]);

  let fsRelease: OTAAppReleaseConfig | null = null;
  if (firestoreRes.status === 'fulfilled' && firestoreRes.value.exists()) {
    fsRelease = sanitizeReleaseConfig(
      firestoreRes.value.data() as Partial<OTAAppReleaseConfig>
    );
  }

  let srvRelease: OTAAppReleaseConfig | null = null;
  if (
    serverRes.status === 'fulfilled' &&
    serverRes.value?.appRelease?.latestVersion &&
    serverRes.value?.appRelease?.featureFlags
  ) {
    srvRelease = sanitizeReleaseConfig(
      serverRes.value.appRelease as Partial<OTAAppReleaseConfig>
    );
  }

  let chosen: OTAAppReleaseConfig | null = null;
  if (fsRelease && srvRelease) {
    const fsTime = new Date(fsRelease.publishedAt).getTime() || 0;
    const srvTime = new Date(srvRelease.publishedAt).getTime() || 0;
    chosen = srvTime > fsTime ? srvRelease : fsRelease;
  } else {
    chosen = fsRelease || srvRelease;
  }

  if (chosen) {
    notifyReleaseListeners(chosen);
  }

  return chosen;
}

export function subscribeToOTAAppRelease(
  callback: (config: OTAAppReleaseConfig) => void
): () => void {
  const cached = sanitizeReleaseConfig(
    readLocalJson<OTAAppReleaseConfig>(CACHE_KEY_APP_RELEASE, DEFAULT_OTA_APP_RELEASE)
  );
  callback(cached);
  releaseListeners.add(callback);

  // Perform immediate live server/Firestore check
  fetchLiveOTAAppRelease().catch(() => {});

  let unsubFirestore = () => {};
  try {
    const docRef = doc(db, 'otaAppReleases', 'active_release');
    unsubFirestore = onSnapshot(
      docRef,
      (snap) => {
        if (snap.exists()) {
          const sanitized = sanitizeReleaseConfig(snap.data() as Partial<OTAAppReleaseConfig>);
          notifyReleaseListeners(sanitized);
        }
      },
      (error) => {
        console.warn('OTA app release listener offline, using cached:', error);
      }
    );
  } catch (err) {
    console.warn('Failed to subscribe to OTA app release:', err);
  }

  return () => {
    releaseListeners.delete(callback);
    unsubFirestore();
  };
}

export async function saveOTAAppRelease(config: OTAAppReleaseConfig): Promise<LiveOTASaveResult> {
  const payload = sanitizeReleaseConfig({
    ...config,
    id: 'active_release',
    publishedAt: new Date().toISOString()
  });

  const authHeaders = await getSuperAdminAuthHeader();
  if (!authHeaders.Authorization && !auth.currentUser) {
    throw new Error(
      'Super Admin verification required. Please sign in with your verified Google or Super Admin account before publishing live OTA updates.'
    );
  }

  let syncedServer = false;
  let serverError: string | null = null;
  try {
    const res = await fetch('/api/ota/release', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data?.success) {
      serverError = data?.error || `Server returned HTTP ${res.status}`;
    } else {
      syncedServer = true;
    }
  } catch (err: any) {
    serverError = err?.message || 'Unable to reach OTA Server API';
  }

  let syncedFirestore = false;
  let firestoreError: string | null = null;
  if (auth.currentUser) {
    const docRef = doc(db, 'otaAppReleases', 'active_release');
    try {
      await setDoc(docRef, payload);
      syncedFirestore = true;
    } catch (err: any) {
      try {
        handleFirestoreError(err, OperationType.WRITE, 'otaAppReleases/active_release');
      } catch (structuredErr: any) {
        firestoreError = structuredErr?.message || err?.message || 'Firestore permission denied';
      }
    }
  } else {
    firestoreError = 'Google Firebase Auth session not active';
  }

  if (!syncedServer && !syncedFirestore) {
    throw new Error(firestoreError || serverError || 'Live OTA publish failed on both Firestore and Server API.');
  }

  notifyReleaseListeners(payload);
  return {
    release: payload,
    syncedFirestore,
    syncedServer,
  };
}

async function clearServiceWorkerAndRuntimeCaches(): Promise<void> {
  if (typeof window === 'undefined') return;

  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(
        registrations.map(async (reg) => {
          try {
            await reg.update();
          } catch {}
          if (reg.waiting) {
            reg.waiting.postMessage({ type: 'SKIP_WAITING' });
          }
          if (reg.installing) {
            reg.installing.postMessage({ type: 'SKIP_WAITING' });
          }
          const worker = reg.active || reg.waiting || navigator.serviceWorker.controller;
          if (worker) {
            await new Promise<void>((resolve) => {
              const timeout = window.setTimeout(resolve, 1200);
              const channel = new MessageChannel();
              channel.port1.onmessage = () => {
                window.clearTimeout(timeout);
                resolve();
              };
              try {
                worker.postMessage({ type: 'CLEAR_CACHES' }, [channel.port2]);
              } catch {
                window.clearTimeout(timeout);
                resolve();
              }
            });
          }
        })
      );
    } catch {}
  }

  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
    } catch {}
  }
}

export async function applyInAppOTAUpgrade(release: OTAAppReleaseConfig): Promise<string> {
  const freshRelease = (await fetchLiveOTAAppRelease().catch(() => null)) || sanitizeReleaseConfig(release);
  await clearServiceWorkerAndRuntimeCaches();
  const updatedVer = setInstalledAppVersion(freshRelease.latestVersion);
  clearReleaseDismissal();
  notifyReleaseListeners(freshRelease);

  if (typeof window !== 'undefined') {
    window.location.reload();
  }
  return updatedVer;
}

export function isValidSafeExternalUrl(url?: string | null): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

