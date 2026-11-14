import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  AppNotificationItem,
  NotificationCategory,
  NotificationDeepLinkTab,
  NotificationPreferences,
  OTANotificationBroadcast,
  StudentProfile,
  TutorBooking,
  ChampionshipRegistration,
  UserRole
} from '../types';

const CACHE_KEY_OTA_NOTIFICATIONS = 'sc_ota_notifications_v1';
const STORAGE_PREFIX_PREFS = 'sc_notif_prefs_v1_';
const STORAGE_PREFIX_INBOX = 'sc_notif_inbox_v1_';
const STORAGE_PREFIX_DISMISSED_OTA = 'sc_notif_dismissed_ota_v1_';
const STORAGE_PREFIX_READ_OTA = 'sc_notif_read_ota_v1_';
const STORAGE_PREFIX_COOLDOWN = 'sc_notif_cooldown_v1_';
const STORAGE_PREFIX_LAST_VISIT = 'sc_notif_last_visit_v1_';

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  browserPushEnabled: true,
  streakReminders: true,
  inactivityNudges: true,
  otaBroadcasts: true,
  quietHoursEnabled: true,
  quietStartHour: 21, // 9 PM
  quietEndHour: 7     // 7 AM
};

export interface DeepLinkRouteMeta {
  tab: NotificationDeepLinkTab;
  label: string;
  personaGroup: 'Student' | 'Parent' | 'Tutor' | 'School Admin' | 'Growth Partner';
  defaultActionLabel: string;
}

export const NOTIFICATION_DEEP_LINK_CATALOG: DeepLinkRouteMeta[] = [
  // Student
  { tab: 'cbt', label: 'Student · CBT Exam Drills', personaGroup: 'Student', defaultActionLabel: 'Resume Drill' },
  { tab: 'syllabus', label: 'Student · Lesson Notes & Syllabus', personaGroup: 'Student', defaultActionLabel: 'Open Lesson Note' },
  { tab: 'competitions', label: 'Student · Competitions & League', personaGroup: 'Student', defaultActionLabel: 'View Arena' },
  { tab: 'games', label: 'Student · Brain Arcade Games', personaGroup: 'Student', defaultActionLabel: 'Play Sprint' },
  { tab: 'exam-prep', label: 'Student · Study Calendar Planner', personaGroup: 'Student', defaultActionLabel: 'Open Planner' },
  { tab: 'ai-coach', label: 'Student · AI Study Coach', personaGroup: 'Student', defaultActionLabel: 'Ask Coach' },
  { tab: 'tutors', label: 'Student · Vetted Tutors', personaGroup: 'Student', defaultActionLabel: 'Find Tutor' },
  { tab: 'aspirant-cbt', label: 'Student · JAMB UTME Simulator', personaGroup: 'Student', defaultActionLabel: 'Launch UTME' },
  { tab: 'community', label: 'Student · Community Forum', personaGroup: 'Student', defaultActionLabel: 'Open Forum' },
  { tab: 'dashboard', label: 'Student · Home Dashboard', personaGroup: 'Student', defaultActionLabel: 'Go to Dashboard' },
  // Parent
  { tab: 'parent_overview', label: 'Parent · Ward Progress Overview', personaGroup: 'Parent', defaultActionLabel: 'Check Ward Progress' },
  { tab: 'parent_approvals', label: 'Parent · Tutor & Event Approvals', personaGroup: 'Parent', defaultActionLabel: 'Review Approvals' },
  { tab: 'parent_community', label: 'Parent · Guardian Lounge', personaGroup: 'Parent', defaultActionLabel: 'Open Lounge' },
  // Tutor
  { tab: 'tutor_overview', label: 'Tutor · Educator Overview', personaGroup: 'Tutor', defaultActionLabel: 'Open Portal' },
  { tab: 'tutor_sessions', label: 'Tutor · Student Sessions & Requests', personaGroup: 'Tutor', defaultActionLabel: 'View Sessions' },
  { tab: 'tutor_chat', label: 'Tutor · Student Messages', personaGroup: 'Tutor', defaultActionLabel: 'Open Messages' },
  // School Admin
  { tab: 'school_overview', label: 'School Admin · League & Metrics', personaGroup: 'School Admin', defaultActionLabel: 'Check Standings' },
  { tab: 'school_publishing', label: 'School Admin · Publish Notes & Tasks', personaGroup: 'School Admin', defaultActionLabel: 'Open Publisher' },
  { tab: 'school_students', label: 'School Admin · Enrolled Students', personaGroup: 'School Admin', defaultActionLabel: 'View Cohort' },
  // Growth Partner
  { tab: 'partner_overview', label: 'Growth Partner · Referral Overview', personaGroup: 'Growth Partner', defaultActionLabel: 'View Earnings' },
  { tab: 'partner_referrals', label: 'Growth Partner · Active Referrals', personaGroup: 'Growth Partner', defaultActionLabel: 'Track Referrals' },
  { tab: 'partner_marketing', label: 'Growth Partner · Share Promo Toolkit', personaGroup: 'Growth Partner', defaultActionLabel: 'Open Toolkit' }
];

export const DEFAULT_OTA_NOTIFICATION_BROADCASTS: OTANotificationBroadcast[] = [
  {
    id: 'ota_welcome_streak_kickoff',
    title: 'Keep Your Termly Study Streak Alive',
    body: 'Complete at least one 5-minute NERDC lesson note or CBT quiz today to protect your scholar streak and climb your school leaderboard.',
    category: 'streak_risk',
    targetRoles: ['student'],
    deepLinkTab: 'cbt',
    actionLabel: 'Start Quick Drill',
    priority: 'high',
    isActive: true,
    createdAt: '2026-11-12T08:00:00.000Z',
    createdBy: 'martorefe@gmail.com'
  },
  {
    id: 'ota_weekly_parent_checkin',
    title: 'Weekly Ward Study Check-In',
    body: 'See your child’s active streak days, recent mock scores, and any pending tutoring session approvals for this week.',
    category: 'ota_engagement',
    targetRoles: ['parent'],
    deepLinkTab: 'parent_overview',
    actionLabel: 'Check Ward Progress',
    priority: 'standard',
    isActive: true,
    createdAt: '2026-11-12T08:05:00.000Z',
    createdBy: 'martorefe@gmail.com'
  }
];

function readJson<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined') return fallback;
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

// ==========================================
// SERVICE WORKER & BROWSER PUSH BRIDGE
// ==========================================

let cachedRegistration: ServiceWorkerRegistration | null = null;

export async function registerNotificationServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }
  try {
    if (cachedRegistration) return cachedRegistration;
    const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    cachedRegistration = reg;
    return reg;
  } catch (err) {
    console.warn('Service worker registration skipped:', err);
    return null;
  }
}

export function getBrowserNotificationPermission(): NotificationPermission | 'unsupported' {
  if (typeof window === 'undefined' || typeof Notification === 'undefined') {
    return 'unsupported';
  }
  return Notification.permission;
}

export async function requestBrowserNotificationPermission(): Promise<NotificationPermission | 'unsupported'> {
  if (typeof window === 'undefined' || typeof Notification === 'undefined') {
    return 'unsupported';
  }
  try {
    await registerNotificationServiceWorker();
    const permission = await Notification.requestPermission();
    return permission;
  } catch {
    return Notification.permission;
  }
}

export function isWithinQuietHours(prefs: NotificationPreferences, now = new Date()): boolean {
  if (!prefs.quietHoursEnabled) return false;
  const hour = now.getHours();
  const start = prefs.quietStartHour;
  const end = prefs.quietEndHour;
  if (start === end) return false;
  if (start < end) {
    return hour >= start && hour < end;
  }
  // Overnight span e.g. 21:00 -> 07:00
  return hour >= start || hour < end;
}

export async function dispatchBrowserNotification(
  item: AppNotificationItem,
  prefs: NotificationPreferences,
  options?: {
    bypassQuietHours?: boolean;
    onForegroundClick?: (item: AppNotificationItem) => void;
  }
): Promise<boolean> {
  if (typeof window === 'undefined' || typeof Notification === 'undefined') {
    return false;
  }
  if (Notification.permission !== 'granted') return false;
  if (!prefs.browserPushEnabled && !options?.bypassQuietHours) return false;
  if (!options?.bypassQuietHours && isWithinQuietHours(prefs)) return false;

  const notifOptions: NotificationOptions = {
    body: item.body,
    icon: '/sc-icon.svg',
    badge: '/sc-icon.svg',
    tag: `sc-${item.id}`,
    data: {
      deepLinkTab: item.deepLinkTab,
      notificationId: item.id,
      role: item.targetRoles[0] || ''
    }
  };

  try {
    const reg = cachedRegistration || (await registerNotificationServiceWorker());
    if (reg && typeof reg.showNotification === 'function') {
      await reg.showNotification(item.title, notifOptions);
      return true;
    }
  } catch {
    // Fallback to standard foreground Notification constructor
  }

  try {
    const nativeNotif = new Notification(item.title, notifOptions);
    nativeNotif.onclick = () => {
      try {
        window.focus();
      } catch {}
      nativeNotif.close();
      options?.onForegroundClick?.(item);
    };
    return true;
  } catch {
    return false;
  }
}

// ==========================================
// USER SCOPED PREFERENCES & INBOX STORAGE
// ==========================================

function normalizeScope(userId?: string | null): string {
  const clean = (userId || 'guest').replace(/[^a-zA-Z0-9_-]/g, '_');
  return clean || 'guest';
}

export function getStoredNotificationPreferences(userId?: string | null): NotificationPreferences {
  const scope = normalizeScope(userId);
  const raw = readJson<Partial<NotificationPreferences>>(`${STORAGE_PREFIX_PREFS}${scope}`, {});
  return {
    ...DEFAULT_NOTIFICATION_PREFERENCES,
    ...raw
  };
}

export function saveStoredNotificationPreferences(
  userId: string | null | undefined,
  prefs: NotificationPreferences
): void {
  const scope = normalizeScope(userId);
  writeJson(`${STORAGE_PREFIX_PREFS}${scope}`, prefs);
}

export function getStoredInboxNotifications(userId?: string | null): AppNotificationItem[] {
  const scope = normalizeScope(userId);
  const list = readJson<AppNotificationItem[]>(`${STORAGE_PREFIX_INBOX}${scope}`, []);
  return Array.isArray(list) ? list : [];
}

export function saveStoredInboxNotifications(
  userId: string | null | undefined,
  items: AppNotificationItem[]
): void {
  const scope = normalizeScope(userId);
  writeJson(`${STORAGE_PREFIX_INBOX}${scope}`, items.slice(0, 60));
}

export function getStoredReadOtaIds(userId?: string | null): string[] {
  const scope = normalizeScope(userId);
  const list = readJson<string[]>(`${STORAGE_PREFIX_READ_OTA}${scope}`, []);
  return Array.isArray(list) ? list : [];
}

export function saveStoredReadOtaIds(userId: string | null | undefined, ids: string[]): void {
  const scope = normalizeScope(userId);
  writeJson(`${STORAGE_PREFIX_READ_OTA}${scope}`, Array.from(new Set(ids)).slice(-200));
}

export function getStoredDismissedOtaIds(userId?: string | null): string[] {
  const scope = normalizeScope(userId);
  const list = readJson<string[]>(`${STORAGE_PREFIX_DISMISSED_OTA}${scope}`, []);
  return Array.isArray(list) ? list : [];
}

export function saveStoredDismissedOtaIds(userId: string | null | undefined, ids: string[]): void {
  const scope = normalizeScope(userId);
  writeJson(`${STORAGE_PREFIX_DISMISSED_OTA}${scope}`, Array.from(new Set(ids)).slice(-200));
}

export function getLastVisitTimestamp(userId?: string | null): number | null {
  const scope = normalizeScope(userId);
  try {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(`${STORAGE_PREFIX_LAST_VISIT}${scope}`);
    if (!raw) return null;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function touchLastVisitTimestamp(userId?: string | null, timestamp = Date.now()): void {
  const scope = normalizeScope(userId);
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(`${STORAGE_PREFIX_LAST_VISIT}${scope}`, String(timestamp));
  } catch {}
}

// ==========================================
// FIRESTORE OTA NOTIFICATIONS COLLECTION
// ==========================================

const otaNotifListeners = new Set<(items: OTANotificationBroadcast[]) => void>();

function sanitizeBroadcast(id: string, raw: Partial<OTANotificationBroadcast>): OTANotificationBroadcast | null {
  if (!raw || !raw.title || !raw.body) return null;
  const roles = Array.isArray(raw.targetRoles) && raw.targetRoles.length > 0
    ? raw.targetRoles
    : (['all'] as (UserRole | 'all')[]);

  return {
    id,
    title: String(raw.title).trim().slice(0, 90),
    body: String(raw.body).trim().slice(0, 280),
    category:
      raw.category === 'streak_risk' || raw.category === 'inactivity_nudge' || raw.category === 'ota_engagement'
        ? raw.category
        : 'ota_engagement',
    targetRoles: roles,
    deepLinkTab: (raw.deepLinkTab || 'dashboard') as NotificationDeepLinkTab,
    actionLabel: String(raw.actionLabel || 'Open App').trim().slice(0, 40),
    priority: raw.priority === 'high' ? 'high' : 'standard',
    isActive: raw.isActive !== false,
    createdAt: raw.createdAt || new Date().toISOString(),
    createdBy: String(raw.createdBy || 'martorefe@gmail.com').slice(0, 150)
  };
}

export function subscribeToOTANotificationBroadcasts(
  callback: (items: OTANotificationBroadcast[]) => void
): () => void {
  const cached = readJson<OTANotificationBroadcast[]>(
    CACHE_KEY_OTA_NOTIFICATIONS,
    DEFAULT_OTA_NOTIFICATION_BROADCASTS
  );
  callback(cached);
  otaNotifListeners.add(callback);

  let unsubFirestore = () => {};
  try {
    const colRef = collection(db, 'otaNotifications');
    unsubFirestore = onSnapshot(
      colRef,
      (snap) => {
        if (!snap.empty) {
          const remoteItems: OTANotificationBroadcast[] = [];
          snap.forEach((d) => {
            const clean = sanitizeBroadcast(d.id, d.data() as Partial<OTANotificationBroadcast>);
            if (clean) remoteItems.push(clean);
          });
          remoteItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          if (remoteItems.length > 0) {
            writeJson(CACHE_KEY_OTA_NOTIFICATIONS, remoteItems);
            otaNotifListeners.forEach((cb) => cb(remoteItems));
            return;
          }
        }
        // Fallback cleanly to local cache/defaults when empty
        otaNotifListeners.forEach((cb) => cb(cached));
      },
      (err) => {
        console.warn('OTA notifications listener offline, using cached:', err);
      }
    );
  } catch (err) {
    console.warn('Failed to subscribe to OTA notifications:', err);
  }

  return () => {
    otaNotifListeners.delete(callback);
    unsubFirestore();
  };
}

export async function saveOTANotificationBroadcast(
  broadcast: OTANotificationBroadcast
): Promise<OTANotificationBroadcast> {
  const clean = sanitizeBroadcast(broadcast.id, broadcast) || broadcast;
  const docRef = doc(db, 'otaNotifications', clean.id);
  await setDoc(docRef, clean, { merge: true });

  const current = readJson<OTANotificationBroadcast[]>(
    CACHE_KEY_OTA_NOTIFICATIONS,
    DEFAULT_OTA_NOTIFICATION_BROADCASTS
  );
  const updated = [clean, ...current.filter((item) => item.id !== clean.id)].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  writeJson(CACHE_KEY_OTA_NOTIFICATIONS, updated);
  otaNotifListeners.forEach((cb) => cb(updated));
  return clean;
}

export async function deleteOTANotificationBroadcast(id: string): Promise<void> {
  const docRef = doc(db, 'otaNotifications', id);
  await deleteDoc(docRef);

  const current = readJson<OTANotificationBroadcast[]>(
    CACHE_KEY_OTA_NOTIFICATIONS,
    DEFAULT_OTA_NOTIFICATION_BROADCASTS
  );
  const updated = current.filter((item) => item.id !== id);
  writeJson(CACHE_KEY_OTA_NOTIFICATIONS, updated);
  otaNotifListeners.forEach((cb) => cb(updated));
}

// ==========================================
// AUTOMATED STREAK & INACTIVITY NUDGE ENGINE
// ==========================================

type CooldownMap = Record<string, string>; // key -> YYYY-MM-DD or ISO timestamp

function getCooldownMap(userId?: string | null): CooldownMap {
  const scope = normalizeScope(userId);
  return readJson<CooldownMap>(`${STORAGE_PREFIX_COOLDOWN}${scope}`, {});
}

function saveCooldownMap(userId: string | null | undefined, map: CooldownMap): void {
  const scope = normalizeScope(userId);
  writeJson(`${STORAGE_PREFIX_COOLDOWN}${scope}`, map);
}

function isOnDailyCooldown(map: CooldownMap, key: string, todayISO: string): boolean {
  const val = map[key];
  if (!val) return false;
  return val.slice(0, 10) === todayISO;
}

function isWithinHoursCooldown(map: CooldownMap, key: string, hours: number, nowMs: number): boolean {
  const val = map[key];
  if (!val) return false;
  const prevMs = new Date(val).getTime();
  if (!Number.isFinite(prevMs)) return false;
  return nowMs - prevMs < hours * 60 * 60 * 1000;
}

export interface AutomatedNudgeEvaluationInput {
  userId?: string | null;
  role: UserRole;
  student: StudentProfile;
  tutorBookings: TutorBooking[];
  championshipRegistrations: ChampionshipRegistration[];
  prefs: NotificationPreferences;
  existingInboxIds: Set<string>;
}

/**
 * Evaluates automated Study Streak & Inactivity Draw-Back reminders per persona.
 * Respects 24-hour anti-fatigue cooldowns and user category preferences.
 */
export function evaluateAutomatedReengagementNudges(
  input: AutomatedNudgeEvaluationInput
): AppNotificationItem[] {
  const { userId, role, student, tutorBookings, championshipRegistrations, prefs, existingInboxIds } = input;
  const now = new Date();
  const nowMs = now.getTime();
  const todayISO = now.toISOString().slice(0, 10);
  const cooldowns = getCooldownMap(userId);
  const lastVisitMs = getLastVisitTimestamp(userId);
  const hoursIdle = lastVisitMs ? (nowMs - lastVisitMs) / (1000 * 60 * 60) : 0;

  const generated: AppNotificationItem[] = [];
  let updatedCooldowns = false;

  if (role === 'student') {
    const lastStudyDay = (student.lastStudyDate || '').slice(0, 10);
    const hasStudiedToday = lastStudyDay === todayISO;
    const streakDays = student.streakDays || 0;

    // 1. Study Streak At-Risk / Kickstart Nudge (max 1 per day)
    if (prefs.streakReminders) {
      const streakKey = `student_streak_${todayISO}`;
      if (!isOnDailyCooldown(cooldowns, 'student_streak_last', todayISO) && !existingInboxIds.has(streakKey)) {
        if (!hasStudiedToday && streakDays > 0) {
          generated.push({
            id: streakKey,
            source: 'automated_streak',
            category: 'streak_risk',
            targetRoles: ['student'],
            title: `Protect your ${streakDays}-day study streak`,
            body: `Complete one 5-minute CBT drill or Lesson Note today so your ${streakDays}-day ${student.classLevel} streak doesn't reset.`,
            deepLinkTab: 'cbt',
            actionLabel: 'Resume Streak Drill',
            createdAt: now.toISOString(),
            read: false,
            priority: 'high'
          });
          cooldowns['student_streak_last'] = todayISO;
          updatedCooldowns = true;
        } else if (!hasStudiedToday && streakDays === 0) {
          generated.push({
            id: streakKey,
            source: 'automated_streak',
            category: 'streak_risk',
            targetRoles: ['student'],
            title: `Start today's ${student.classLevel} study streak`,
            body: 'Open your weekly NERDC Lesson Notes or take a quick 10-question sprint to earn bonus Streak XP.',
            deepLinkTab: 'syllabus',
            actionLabel: 'Open Lesson Notes',
            createdAt: now.toISOString(),
            read: false,
            priority: 'standard'
          });
          cooldowns['student_streak_last'] = todayISO;
          updatedCooldowns = true;
        }
      }
    }

    // 2. Student Inactivity Draw-Back Nudge (>= 18h idle, max once per 24h)
    if (prefs.inactivityNudges && hoursIdle >= 18) {
      const nudgeKey = `student_idle_${todayISO}`;
      if (!isWithinHoursCooldown(cooldowns, 'student_idle_last', 24, nowMs) && !existingInboxIds.has(nudgeKey)) {
        generated.push({
          id: nudgeKey,
          source: 'automated_inactivity',
          category: 'inactivity_nudge',
          targetRoles: ['student'],
          title: 'We saved your spot in class',
          body: `Your classmates are earning XP on this week's ${student.classLevel} drills. Jump back in for 10 minutes today.`,
          deepLinkTab: 'syllabus',
          actionLabel: 'Continue Learning',
          createdAt: now.toISOString(),
          read: false,
          priority: 'standard'
        });
        cooldowns['student_idle_last'] = now.toISOString();
        updatedCooldowns = true;
      }
    }
  } else if (role === 'parent') {
    const pendingTutorCount = tutorBookings.filter((b) => !b.isParentApproved && b.status === 'pending_parent').length;
    const pendingChampCount = championshipRegistrations.filter((c) => c.status === 'pending_parent').length;
    const totalPending = pendingTutorCount + pendingChampCount;

    if (prefs.streakReminders && totalPending > 0) {
      const parentApprovalKey = `parent_pending_${todayISO}`;
      if (!isOnDailyCooldown(cooldowns, 'parent_pending_last', todayISO) && !existingInboxIds.has(parentApprovalKey)) {
        generated.push({
          id: parentApprovalKey,
          source: 'automated_streak',
          category: 'streak_risk',
          targetRoles: ['parent'],
          title: `${totalPending} pending guardian approval${totalPending > 1 ? 's' : ''}`,
          body: 'Your ward requested a tutoring or competition approval. Review and confirm from your Parent Portal.',
          deepLinkTab: 'parent_approvals',
          actionLabel: 'Review Approvals',
          createdAt: now.toISOString(),
          read: false,
          priority: 'high'
        });
        cooldowns['parent_pending_last'] = todayISO;
        updatedCooldowns = true;
      }
    }

    if (prefs.inactivityNudges && hoursIdle >= 20) {
      const parentIdleKey = `parent_idle_${todayISO}`;
      if (!isWithinHoursCooldown(cooldowns, 'parent_idle_last', 24, nowMs) && !existingInboxIds.has(parentIdleKey)) {
        generated.push({
          id: parentIdleKey,
          source: 'automated_inactivity',
          category: 'inactivity_nudge',
          targetRoles: ['parent'],
          title: 'Check your ward’s weekly study streak',
          body: 'See recent CBT accuracy, verified reading logs, and keep your child motivated this week.',
          deepLinkTab: 'parent_overview',
          actionLabel: 'View Ward Progress',
          createdAt: now.toISOString(),
          read: false,
          priority: 'standard'
        });
        cooldowns['parent_idle_last'] = now.toISOString();
        updatedCooldowns = true;
      }
    }
  } else if (role === 'tutor') {
    const activeConfirmed = tutorBookings.filter((b) => b.status === 'confirmed').length;
    if (prefs.inactivityNudges && (hoursIdle >= 20 || activeConfirmed > 0)) {
      const tutorNudgeKey = `tutor_nudge_${todayISO}`;
      if (!isWithinHoursCooldown(cooldowns, 'tutor_idle_last', 24, nowMs) && !existingInboxIds.has(tutorNudgeKey)) {
        generated.push({
          id: tutorNudgeKey,
          source: 'automated_inactivity',
          category: 'inactivity_nudge',
          targetRoles: ['tutor'],
          title:
            activeConfirmed > 0
              ? `${activeConfirmed} upcoming tutoring session${activeConfirmed > 1 ? 's' : ''} ready`
              : 'Keep your Educator timetable visible to students',
          body:
            activeConfirmed > 0
              ? 'Review confirmed student topics and open your live classroom board before session start.'
              : 'Update weekly availability slots so students preparing for WAEC and JAMB can book you faster.',
          deepLinkTab: 'tutor_sessions',
          actionLabel: 'View Sessions',
          createdAt: now.toISOString(),
          read: false,
          priority: activeConfirmed > 0 ? 'high' : 'standard'
        });
        cooldowns['tutor_idle_last'] = now.toISOString();
        updatedCooldowns = true;
      }
    }
  } else if (role === 'school_admin') {
    if (prefs.inactivityNudges && hoursIdle >= 24) {
      const schoolKey = `school_idle_${todayISO}`;
      if (!isWithinHoursCooldown(cooldowns, 'school_idle_last', 24, nowMs) && !existingInboxIds.has(schoolKey)) {
        generated.push({
          id: schoolKey,
          source: 'automated_inactivity',
          category: 'inactivity_nudge',
          targetRoles: ['school_admin'],
          title: 'Weekly Inter-School League Check-In',
          body: 'Publish fresh weekly lesson notes or check your school cohort’s active study streak standing.',
          deepLinkTab: 'school_overview',
          actionLabel: 'Check Standings',
          createdAt: now.toISOString(),
          read: false,
          priority: 'standard'
        });
        cooldowns['school_idle_last'] = now.toISOString();
        updatedCooldowns = true;
      }
    }
  } else if (role === 'growth_partner') {
    if (prefs.inactivityNudges && hoursIdle >= 24) {
      const partnerKey = `partner_idle_${todayISO}`;
      if (!isWithinHoursCooldown(cooldowns, 'partner_idle_last', 24, nowMs) && !existingInboxIds.has(partnerKey)) {
        generated.push({
          id: partnerKey,
          source: 'automated_inactivity',
          category: 'inactivity_nudge',
          targetRoles: ['growth_partner'],
          title: 'Referral Momentum Reminder',
          body: 'Share your partner referral link with new WAEC & JAMB students to earn 10% lifetime commissions.',
          deepLinkTab: 'partner_marketing',
          actionLabel: 'Open Referral Kit',
          createdAt: now.toISOString(),
          read: false,
          priority: 'standard'
        });
        cooldowns['partner_idle_last'] = now.toISOString();
        updatedCooldowns = true;
      }
    }
  }

  if (updatedCooldowns) {
    saveCooldownMap(userId, cooldowns);
  }
  touchLastVisitTimestamp(userId, nowMs);

  return generated;
}

export function buildSamplePersonaNudge(role: UserRole, student: StudentProfile): AppNotificationItem {
  const nowIso = new Date().toISOString();
  const id = `sample_${role}_${Date.now()}`;

  switch (role) {
    case 'parent':
      return {
        id,
        source: 'automated_streak',
        category: 'streak_risk',
        targetRoles: ['parent'],
        title: 'Ward Study Streak Reminder',
        body: 'Check in on your child’s weekly NERDC revision streak and pending tutor approvals.',
        deepLinkTab: 'parent_overview',
        actionLabel: 'Check Ward Progress',
        createdAt: nowIso,
        read: false,
        priority: 'high'
      };
    case 'tutor':
      return {
        id,
        source: 'automated_inactivity',
        category: 'inactivity_nudge',
        targetRoles: ['tutor'],
        title: 'Student Session Draw-Back Alert',
        body: 'New students are looking for WAEC/JAMB coaching this week. Review your tutoring requests.',
        deepLinkTab: 'tutor_sessions',
        actionLabel: 'View Sessions',
        createdAt: nowIso,
        read: false,
        priority: 'high'
      };
    case 'school_admin':
      return {
        id,
        source: 'automated_inactivity',
        category: 'inactivity_nudge',
        targetRoles: ['school_admin'],
        title: 'Cohort League Standings Check-In',
        body: 'Review your school’s weekly active learners and publish fresh termly practice materials.',
        deepLinkTab: 'school_overview',
        actionLabel: 'Open School Portal',
        createdAt: nowIso,
        read: false,
        priority: 'standard'
      };
    case 'growth_partner':
      return {
        id,
        source: 'automated_inactivity',
        category: 'inactivity_nudge',
        targetRoles: ['growth_partner'],
        title: 'Partner Commission Draw-Back Nudge',
        body: 'Exam season registrations are peaking — share your referral link to grow your 10% revshare.',
        deepLinkTab: 'partner_overview',
        actionLabel: 'View Referrals',
        createdAt: nowIso,
        read: false,
        priority: 'standard'
      };
    case 'student':
    default:
      return {
        id,
        source: 'automated_streak',
        category: 'streak_risk',
        targetRoles: ['student'],
        title: `Protect your ${Math.max(1, student.streakDays || 1)}-day study streak`,
        body: `Don't lose momentum in ${student.classLevel}! Take one quick 5-minute CBT quiz now to lock today's Streak XP.`,
        deepLinkTab: 'cbt',
        actionLabel: 'Resume Streak Drill',
        createdAt: nowIso,
        read: false,
        priority: 'high'
      };
  }
}

export function formatRelativeNotificationTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  if (!Number.isFinite(diffMs) || diffMs < 60_000) return 'Just now';
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export async function dispatchEmailDigest(params: {
  recipients: { email: string; name?: string; role?: string }[];
  subject: string;
  title: string;
  message: string;
  actionLabel?: string;
  adminEmail?: string;
}): Promise<{ success: boolean; sentCount?: number; provider?: string; error?: string }> {
  try {
    const res = await fetch('/api/notifications/send-digest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || 'Email digest dispatch failed.' };
    }
    return data;
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error dispatching email digest.' };
  }
}
