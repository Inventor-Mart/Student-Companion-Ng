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
  OTASchoolLeagueConfig
} from '../types';
import {
  TERMLY_CHAMPIONSHIP_PRIZES,
  TERMLY_REGISTRATION_FEE_NAIRA,
  CHAMPIONSHIP_DAYS_CONFIG
} from '../data/competitionPrizesData';

// Cache keys
const CACHE_KEY_BROADCASTS = 'sc_ota_broadcasts_v1';
const CACHE_KEY_POPUP = 'sc_ota_popup_v1';
const CACHE_KEY_COMPETITION = 'sc_ota_competition_v1';
const CACHE_KEY_WEEKLY = 'sc_ota_weekly_v1';
const CACHE_KEY_SCHOOL_LEAGUE = 'sc_ota_school_league_v1';
const CACHE_KEY_DISMISSED_POPUP = 'sc_ota_dismissed_popup_date';

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
