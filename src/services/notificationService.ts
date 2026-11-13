import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  deleteDoc
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import {
  PersonaNotificationItem,
  ReminderPreferences,
  UserRole,
  StudentProfile,
  TutorBooking
} from '../types';

const CACHE_KEY_NOTIFICATIONS = 'sc_persona_notifications_v1';
const CACHE_KEY_READ_IDS = 'sc_read_notification_ids_v1';
const CACHE_KEY_REMINDER_PREFS = 'sc_reminder_preferences_v1';
const CACHE_KEY_LAST_AUTO_PUSH = 'sc_last_auto_push_map_v1';

export const DEFAULT_REMINDER_PREFERENCES = (
  userId: string,
  role: UserRole,
  email?: string
): ReminderPreferences => ({
  userId,
  role,
  email,
  browserPushEnabled: false,
  emailDigestEnabled: true,
  dailyReminderTime: '17:00',
  streakAlerts: true,
  inactivityNudgeHours: 24,
  updatedAt: new Date().toISOString()
});

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
// SERVICE WORKER & BROWSER PUSH HELPERS
// ==========================================

let swRegistrationPromise: Promise<ServiceWorkerRegistration | null> | null = null;

export function registerNotificationServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return Promise.resolve(null);
  }
  if (!swRegistrationPromise) {
    swRegistrationPromise = navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .catch(() => null);
  }
  return swRegistrationPromise;
}

export function getBrowserNotificationPermission(): NotificationPermission | 'unsupported' {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission;
}

export async function requestBrowserPushPermission(): Promise<NotificationPermission | 'unsupported'> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  try {
    await registerNotificationServiceWorker();
    const permission = await Notification.requestPermission();
    return permission;
  } catch {
    return Notification.permission || 'default';
  }
}

export async function triggerBrowserNotification(params: {
  title: string;
  body: string;
  tag?: string;
  actionTarget?: string;
}): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) return false;
  if (Notification.permission !== 'granted') return false;

  try {
    const reg = await registerNotificationServiceWorker();
    if (reg && 'showNotification' in reg) {
      await reg.showNotification(params.title, {
        body: params.body,
        tag: params.tag || `sc_${Date.now()}`,
        badge: '/favicon.ico',
        icon: '/favicon.ico',
        data: {
          url: window.location.origin,
          actionTarget: params.actionTarget || null
        }
      });
      return true;
    }

    const notif = new Notification(params.title, {
      body: params.body,
      tag: params.tag || `sc_${Date.now()}`
    });
    notif.onclick = () => {
      window.focus();
      notif.close();
    };
    return true;
  } catch {
    return false;
  }
}

// ==========================================
// SMART PERSONA ENGAGEMENT REMINDERS
// ==========================================

export function generateSmartPersonaReminders(context: {
  role: UserRole;
  student: StudentProfile;
  tutorBookings: TutorBooking[];
  isUpdateAvailable: boolean;
  latestVersion: string;
  unreadNotesCount?: number;
}): PersonaNotificationItem[] {
  const now = new Date().toISOString();
  const list: PersonaNotificationItem[] = [];

  if (context.isUpdateAvailable) {
    list.push({
      id: `smart_ota_${context.latestVersion}`,
      targetRole: 'all',
      title: `App Update Available · v${context.latestVersion}`,
      message: 'A newer version of Student Companion is ready with fresh features and improvements. Tap Upgrade when ready.',
      category: 'ota_update',
      actionLabel: 'Upgrade Now',
      actionTarget: 'ota_upgrade',
      createdAt: now,
      createdBy: 'system'
    });
  }

  if (context.role === 'student') {
    const todayStr = now.slice(0, 10);
    const lastStudy = context.student.lastStudyDate || '';
    const studiedToday = lastStudy.startsWith(todayStr);

    if (!studiedToday) {
      list.push({
        id: `smart_streak_${todayStr}`,
        targetRole: 'student',
        title: `Protect Your ${context.student.streakDays || 1}-Day Study Streak`,
        message: 'Complete one 10-question CBT drill or read a Lesson Note today to keep your flame burning and earn +50 XP.',
        category: 'streak_alert',
        actionLabel: 'Start Quick Drill',
        actionTarget: 'cbt',
        createdAt: now,
        createdBy: 'system'
      });
    }

    if ((context.unreadNotesCount ?? 0) > 0 || (context.student.completedReadNoteIds?.length || 0) < 3) {
      list.push({
        id: 'smart_lesson_note',
        targetRole: 'student',
        title: 'Continue This Week’s Lesson Notes',
        message: `Jump back into your ${context.student.classLevel} NERDC syllabus notes and complete your verified reading checkpoint.`,
        category: 'study_reminder',
        actionLabel: 'Open Notes',
        actionTarget: 'syllabus',
        createdAt: now,
        createdBy: 'system'
      });
    }

    list.push({
      id: 'smart_ai_coach',
      targetRole: 'student',
      title: 'Stuck on Any Topic? Ask Your AI Study Coach',
      message: 'Practice weak topics with step-by-step explanations tailored for JSS, SS, WAEC, and JAMB.',
      category: 'study_reminder',
      actionLabel: 'Open AI Coach',
      actionTarget: 'ai-coach',
      createdAt: now,
      createdBy: 'system'
    });
  } else if (context.role === 'parent') {
    const pendingApprovals = context.tutorBookings.filter((b) => b.status === 'pending_parent').length;
    if (pendingApprovals > 0) {
      list.push({
        id: 'smart_parent_escrow',
        targetRole: 'parent',
        title: `${pendingApprovals} Tutor Booking${pendingApprovals > 1 ? 's' : ''} Awaiting Approval`,
        message: 'Review and approve pending tutoring sessions in your Parent Portal so your child’s schedule stays confirmed.',
        category: 'parent_alert',
        actionLabel: 'Review Bookings',
        actionTarget: 'dashboard',
        createdAt: now,
        createdBy: 'system'
      });
    }
    list.push({
      id: 'smart_parent_digest',
      targetRole: 'parent',
      title: 'Weekly Ward Progress Check-In',
      message: 'Inspect verified reading logs, CBT accuracy, and study streak consistency from your Parent Portal.',
      category: 'parent_alert',
      actionLabel: 'View Progress',
      actionTarget: 'dashboard',
      createdAt: now,
      createdBy: 'system'
    });
  } else if (context.role === 'tutor') {
    const activeSessions = context.tutorBookings.filter((b) => b.status === 'confirmed').length;
    list.push({
      id: 'smart_tutor_sessions',
      targetRole: 'tutor',
      title: activeSessions > 0 ? `${activeSessions} Confirmed Session${activeSessions > 1 ? 's' : ''} Ready` : 'Keep Your Tutor Availability Updated',
      message: activeSessions > 0
        ? 'Prepare your whiteboard materials and check upcoming student bookings in your Tutor Portal.'
        : 'Students discover verified tutors daily—update your bio, schedule slots, and subject tags.',
      category: 'tutor_activity',
      actionLabel: 'Open Tutor Hub',
      actionTarget: 'dashboard',
      createdAt: now,
      createdBy: 'system'
    });
  } else if (context.role === 'growth_partner') {
    list.push({
      id: 'smart_partner_referral',
      targetRole: 'growth_partner',
      title: 'Share Your Referral Code for 10% Lifetime Revenue',
      message: 'University Aspirants get 2GB data or ₦500 cashback on their first registration with your partner code.',
      category: 'partner_earnings',
      actionLabel: 'Copy Referral Link',
      actionTarget: 'dashboard',
      createdAt: now,
      createdBy: 'system'
    });
  } else if (context.role === 'school_admin' || context.role === 'admin') {
    list.push({
      id: 'smart_school_cohort',
      targetRole: context.role,
      title: 'Monitor Cohort Engagement & Active Terms',
      message: 'Check student uniform verifications, uploaded materials, and weekly inter-school standings.',
      category: 'school_notice',
      actionLabel: 'Review Cohort',
      actionTarget: 'dashboard',
      createdAt: now,
      createdBy: 'system'
    });
  }

  return list;
}

// ==========================================
// FIRESTORE + SERVER + LOCAL PERSISTENCE
// ==========================================

export function subscribeToPersonaNotifications(
  callback: (items: PersonaNotificationItem[]) => void
): () => void {
  const cached = readLocalJson<PersonaNotificationItem[]>(CACHE_KEY_NOTIFICATIONS, []);
  callback(cached);

  let active = true;
  let unsubSnapshot: (() => void) | null = null;

  const mergeAndEmit = (incoming: PersonaNotificationItem[]) => {
    if (!active) return;
    const sorted = [...incoming].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    writeLocalJson(CACHE_KEY_NOTIFICATIONS, sorted);
    callback(sorted);
  };

  // Fetch from Express backend mirror first (works immediately even if Firestore rules lag)
  fetch('/api/ota/state')
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      if (data && Array.isArray(data.notifications) && data.notifications.length > 0) {
        mergeAndEmit(data.notifications);
      }
    })
    .catch(() => {});

  const colRef = collection(db, 'personaNotifications');

  const attach = () => {
    if (unsubSnapshot) return;
    try {
      unsubSnapshot = onSnapshot(
        colRef,
        (snap) => {
          const items: PersonaNotificationItem[] = [];
          snap.forEach((d) => {
            const val = d.data() as Partial<PersonaNotificationItem>;
            if (val && val.title && val.message) {
              items.push({
                id: d.id,
                targetRole: (val.targetRole as UserRole | 'all') || 'all',
                targetUserId: val.targetUserId,
                title: val.title,
                message: val.message,
                category: val.category || 'campaign',
                actionLabel: val.actionLabel,
                actionTarget: val.actionTarget,
                sendBrowserPush: val.sendBrowserPush,
                sendEmailDigest: val.sendEmailDigest,
                createdAt: val.createdAt || new Date().toISOString(),
                createdBy: val.createdBy || 'superadmin'
              });
            }
          });
          if (items.length > 0) {
            mergeAndEmit(items);
          }
        },
        () => {
          // Fallback silently to cached + server state
        }
      );
    } catch {}
  };

  if (auth.currentUser) {
    attach();
  }
  const unsubAuth = onAuthStateChanged(auth, (u) => {
    if (!active) return;
    if (u) {
      attach();
    } else if (unsubSnapshot) {
      try {
        unsubSnapshot();
      } catch {}
      unsubSnapshot = null;
    }
  });

  // Also try one-shot getDocs
  getDocs(colRef)
    .then((snap) => {
      const items: PersonaNotificationItem[] = [];
      snap.forEach((d) => {
        const val = d.data() as Partial<PersonaNotificationItem>;
        if (val && val.title && val.message) {
          items.push({
            id: d.id,
            targetRole: (val.targetRole as UserRole | 'all') || 'all',
            targetUserId: val.targetUserId,
            title: val.title,
            message: val.message,
            category: val.category || 'campaign',
            actionLabel: val.actionLabel,
            actionTarget: val.actionTarget,
            sendBrowserPush: val.sendBrowserPush,
            sendEmailDigest: val.sendEmailDigest,
            createdAt: val.createdAt || new Date().toISOString(),
            createdBy: val.createdBy || 'superadmin'
          });
        }
      });
      if (items.length > 0) mergeAndEmit(items);
    })
    .catch(() => {});

  return () => {
    active = false;
    try {
      unsubAuth();
    } catch {}
    if (unsubSnapshot) {
      try {
        unsubSnapshot();
      } catch {}
    }
  };
}

export async function publishPersonaNotification(
  item: PersonaNotificationItem
): Promise<void> {
  const payload: PersonaNotificationItem = {
    ...item,
    createdAt: item.createdAt || new Date().toISOString()
  };

  // Update local cache immediately
  const current = readLocalJson<PersonaNotificationItem[]>(CACHE_KEY_NOTIFICATIONS, []);
  const next = [payload, ...current.filter((n) => n.id !== payload.id)].slice(0, 60);
  writeLocalJson(CACHE_KEY_NOTIFICATIONS, next);

  // Mirror to Express backend so all sessions see it immediately
  await fetch('/api/ota/notifications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).catch(() => {});

  // Persist to Cloud Firestore
  try {
    await setDoc(doc(db, 'personaNotifications', payload.id), payload, { merge: true });
  } catch (err) {
    console.warn('Firestore notification write warning (mirrored via API):', err);
  }
}

export async function deletePersonaNotification(id: string): Promise<void> {
  const current = readLocalJson<PersonaNotificationItem[]>(CACHE_KEY_NOTIFICATIONS, []);
  writeLocalJson(
    CACHE_KEY_NOTIFICATIONS,
    current.filter((n) => n.id !== id)
  );

  await fetch(`/api/ota/notifications/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  }).catch(() => {});

  try {
    await deleteDoc(doc(db, 'personaNotifications', id));
  } catch {}
}

export function getReadNotificationIds(): string[] {
  return readLocalJson<string[]>(CACHE_KEY_READ_IDS, []);
}

export function saveReadNotificationIds(ids: string[]): void {
  writeLocalJson(CACHE_KEY_READ_IDS, ids.slice(-200));
}

export function loadLocalReminderPreferences(
  userId: string,
  role: UserRole,
  email?: string
): ReminderPreferences {
  const all = readLocalJson<Record<string, ReminderPreferences>>(CACHE_KEY_REMINDER_PREFS, {});
  return all[userId] || DEFAULT_REMINDER_PREFERENCES(userId, role, email);
}

export async function saveReminderPreferences(prefs: ReminderPreferences): Promise<void> {
  const updated: ReminderPreferences = {
    ...prefs,
    updatedAt: new Date().toISOString()
  };
  const all = readLocalJson<Record<string, ReminderPreferences>>(CACHE_KEY_REMINDER_PREFS, {});
  all[updated.userId] = updated;
  writeLocalJson(CACHE_KEY_REMINDER_PREFS, all);

  try {
    if (auth.currentUser && updated.userId) {
      await setDoc(doc(db, 'reminderPreferences', updated.userId), updated, { merge: true });
    }
  } catch {}
}

export async function fetchRemoteReminderPreferences(
  userId: string
): Promise<ReminderPreferences | null> {
  try {
    if (!auth.currentUser || !userId) return null;
    const snap = await getDoc(doc(db, 'reminderPreferences', userId));
    if (snap.exists()) {
      return snap.data() as ReminderPreferences;
    }
  } catch {}
  return null;
}

export function shouldAutoFirePushForNotification(notificationId: string): boolean {
  const map = readLocalJson<Record<string, string>>(CACHE_KEY_LAST_AUTO_PUSH, {});
  if (map[notificationId]) return false;
  map[notificationId] = new Date().toISOString();
  writeLocalJson(CACHE_KEY_LAST_AUTO_PUSH, map);
  return true;
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
