import { filterMessageText, FilterResult } from './profanityFilter';
import { SecurityIncidentCategory, SecuritySeverity, SecurityStatusSnapshot } from '../types';

const FP_STORAGE_KEY = 'sc_device_fp';
const LOGIN_FAIL_STORAGE_KEY = 'sc_login_failures';
const PIN_FAIL_STORAGE_KEY = 'sc_pin_failures';

// In-memory sliding windows for client-side spam & XP anomaly detection
const messageHistoryBySender = new Map<string, { texts: { norm: string; ts: number }[]; timestamps: number[] }>();
const xpEventTimestamps: { ts: number; amount: number; feature: string }[] = [];

export function getDeviceFingerprint(): string {
  try {
    const existing = window.localStorage.getItem(FP_STORAGE_KEY);
    if (existing && existing.length >= 10) {
      return existing;
    }
    const raw = [
      navigator.userAgent || 'ua',
      navigator.language || 'en',
      `${window.screen?.width || 0}x${window.screen?.height || 0}`,
      Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
      String(navigator.hardwareConcurrency || 2)
    ].join('|');

    let hash = 5381;
    for (let i = 0; i < raw.length; i++) {
      hash = (hash * 33) ^ raw.charCodeAt(i);
    }
    const hex = (hash >>> 0).toString(16).padStart(8, '0');
    const rand = Math.random().toString(36).substring(2, 8);
    const fp = `fp_${hex}_${rand}`;
    window.localStorage.setItem(FP_STORAGE_KEY, fp);
    return fp;
  } catch {
    return 'fp_browser_fallback';
  }
}

export function getSecurityHeaders(extra?: { userId?: string; userEmail?: string }): Record<string, string> {
  const headers: Record<string, string> = {
    'X-Device-Fingerprint': getDeviceFingerprint()
  };
  if (extra?.userId) headers['X-User-Id'] = extra.userId;
  if (extra?.userEmail) headers['X-User-Email'] = extra.userEmail;
  return headers;
}

export async function reportSecurityIncidentToServer(payload: {
  category: SecurityIncidentCategory;
  severity: SecuritySeverity;
  title: string;
  description: string;
  actorUserId?: string;
  actorEmail?: string;
  actorRole?: string;
  endpoint?: string;
  autoBlock?: boolean;
}): Promise<void> {
  try {
    await fetch('/api/security/incident', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getSecurityHeaders({ userId: payload.actorUserId, userEmail: payload.actorEmail })
      },
      body: JSON.stringify({
        ...payload,
        source: 'client_guard',
        deviceFingerprint: getDeviceFingerprint()
      })
    });
  } catch {
    // Telemetry is best-effort and never crashes active user flows
  }
}

export async function submitSecurityReportToServer(payload: {
  reporterUserId: string;
  reporterEmail?: string;
  reporterName?: string;
  reporterRole?: string;
  category: 'fraud' | 'spam' | 'hacking' | 'abuse' | 'payment_anomaly';
  suspectIdentifier?: string;
  description: string;
  evidenceContext?: string;
}): Promise<{ success: boolean; reportId?: string; error?: string }> {
  try {
    const res = await fetch('/api/security/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getSecurityHeaders({ userId: payload.reporterUserId, userEmail: payload.reporterEmail })
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      return { success: false, error: data.error || 'Could not submit report.' };
    }
    return { success: true, reportId: data.reportId };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error while submitting security report.' };
  }
}

export async function fetchAccountSecurityStatus(params: {
  userId?: string;
  email?: string;
}): Promise<SecurityStatusSnapshot | null> {
  try {
    const qs = new URLSearchParams();
    if (params.userId) qs.set('userId', params.userId);
    if (params.email) qs.set('email', params.email);
    const res = await fetch(`/api/security/status?${qs.toString()}`, {
      headers: getSecurityHeaders({ userId: params.userId, userEmail: params.email })
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      accountStatus: data.accountStatus || 'active',
      lockedUntil: data.lockedUntil,
      lockReason: data.lockReason,
      suspensionReason: data.suspensionReason,
      deletedAt: data.deletedAt,
      deletionReason: data.deletionReason,
      walletFrozen: Boolean(data.walletFrozen),
      walletFrozenReason: data.walletFrozenReason,
      isBlocked: Boolean(data.isBlocked),
      blockType: data.blockType,
      blockReason: data.blockReason
    };
  } catch {
    return null;
  }
}

// ==========================================
// MESSAGE SPAM, PHISHING & FLOOD GUARD
// ==========================================

export interface MessageSecurityResult {
  isClean: boolean;
  sanitizedText: string;
  flagReason?:
    | FilterResult['flagReason']
    | 'spam_burst'
    | 'duplicate_spam'
    | 'phishing_link';
  warningMessage?: string;
  shouldReportIncident?: boolean;
  incidentCategory?: SecurityIncidentCategory;
  severity?: SecuritySeverity;
}

const PHISHING_OR_EXTERNAL_LINK_REGEX =
  /(https?:\/\/[^\s]+|www\.[^\s]+|\b(?:bit\.ly|tinyurl\.com|t\.me|wa\.me|rb\.gy|shorturl\.at)\/[^\s]*|\b[a-z0-9-]+\.(?:xyz|top|tk|ml|ga|cf|gq|ru|click|loan)\b)/i;

const EXCESSIVE_REPETITION_REGEX = /(.)\1{9,}|\b(\w{2,})\s+\2\s+\2\s+\2\b/i;

export function analyzeMessageSecurity(
  rawText: string,
  senderKey: string,
  contextMeta?: { userId?: string; userEmail?: string; userRole?: string; location?: string }
): MessageSecurityResult {
  const baseCheck = filterMessageText(rawText);
  if (!baseCheck.isClean) {
    if (baseCheck.flagReason === 'phone_harvesting' || baseCheck.flagReason === 'profanity') {
      void reportSecurityIncidentToServer({
        category: baseCheck.flagReason === 'phone_harvesting' ? 'abuse' : 'spam',
        severity: baseCheck.flagReason === 'phone_harvesting' ? 'high' : 'medium',
        title:
          baseCheck.flagReason === 'phone_harvesting'
            ? 'Blocked phone number harvesting attempt'
            : 'Blocked profanity / betting solicitation',
        description: `Blocked message in ${contextMeta?.location || 'chat/forum'}: "${rawText.slice(0, 120)}"`,
        actorUserId: contextMeta?.userId,
        actorEmail: contextMeta?.userEmail,
        actorRole: contextMeta?.userRole,
        endpoint: contextMeta?.location || 'forum_or_chat'
      });
    }
    return {
      ...baseCheck,
      shouldReportIncident: baseCheck.flagReason === 'phone_harvesting' || baseCheck.flagReason === 'profanity'
    };
  }

  const trimmed = baseCheck.sanitizedText;

  // 1. Phishing / external scam link check
  if (PHISHING_OR_EXTERNAL_LINK_REGEX.test(trimmed)) {
    void reportSecurityIncidentToServer({
      category: 'phishing_link',
      severity: 'high',
      title: 'External URL / Phishing Link Blocked',
      description: `Blocked suspicious URL in ${contextMeta?.location || 'chat/forum'}: "${trimmed.slice(0, 160)}"`,
      actorUserId: contextMeta?.userId,
      actorEmail: contextMeta?.userEmail,
      actorRole: contextMeta?.userRole,
      endpoint: contextMeta?.location || 'forum_or_chat',
      autoBlock: true
    });
    return {
      isClean: false,
      sanitizedText: trimmed,
      flagReason: 'phishing_link',
      warningMessage:
        'External links, WhatsApp/Telegram invites, and shortened URLs are blocked to protect students from phishing scams.',
      shouldReportIncident: true,
      incidentCategory: 'phishing_link',
      severity: 'high'
    };
  }

  // 2. Character/word flood check
  if (EXCESSIVE_REPETITION_REGEX.test(trimmed)) {
    return {
      isClean: false,
      sanitizedText: trimmed,
      flagReason: 'duplicate_spam',
      warningMessage: 'Excessive repeated characters or words detected. Please write a clear message.'
    };
  }

  // 3. Sliding-window burst & duplicate copy-paste spam check
  const now = Date.now();
  const key = senderKey || 'anon';
  const entry = messageHistoryBySender.get(key) || { texts: [], timestamps: [] };
  entry.timestamps = entry.timestamps.filter(ts => now - ts < 15000); // 15s window
  entry.texts = entry.texts.filter(item => now - item.ts < 60000); // 60s duplicate window

  if (entry.timestamps.length >= 4) {
    void reportSecurityIncidentToServer({
      category: 'spam',
      severity: 'high',
      title: 'Message Flood / Rapid Spam Burst',
      description: `User ${key} exceeded 4 messages in 15 seconds in ${contextMeta?.location || 'chat/forum'}.`,
      actorUserId: contextMeta?.userId,
      actorEmail: contextMeta?.userEmail,
      actorRole: contextMeta?.userRole,
      endpoint: contextMeta?.location || 'forum_or_chat',
      autoBlock: true
    });
    return {
      isClean: false,
      sanitizedText: trimmed,
      flagReason: 'spam_burst',
      warningMessage: 'You are sending messages too quickly. Please wait a few seconds before posting again.',
      shouldReportIncident: true,
      incidentCategory: 'spam',
      severity: 'high'
    };
  }

  const normalized = trimmed.toLowerCase().replace(/\s+/g, ' ');
  if (normalized.length >= 8 && entry.texts.some(t => t.norm === normalized)) {
    return {
      isClean: false,
      sanitizedText: trimmed,
      flagReason: 'duplicate_spam',
      warningMessage: 'Duplicate message detected. Avoid repeating the same message within 60 seconds.'
    };
  }

  entry.timestamps.push(now);
  entry.texts.push({ norm: normalized, ts: now });
  messageHistoryBySender.set(key, entry);

  return {
    isClean: true,
    sanitizedText: trimmed
  };
}

// ==========================================
// BRUTE-FORCE LOCKOUT (LOGIN & PARENT PIN)
// ==========================================

interface FailureTrackerRecord {
  failures: number[];
  lockedUntil: number;
}

function readFailureStore(storageKey: string): Record<string, FailureTrackerRecord> {
  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeFailureStore(storageKey: string, store: Record<string, FailureTrackerRecord>): void {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(store));
  } catch {}
}

export function checkLockoutStatus(
  storageKey: string,
  identifier: string
): { isLocked: boolean; remainingSeconds: number; attemptsUsed: number } {
  const key = (identifier || 'default').toLowerCase().trim();
  const store = readFailureStore(storageKey);
  const rec = store[key];
  if (!rec) return { isLocked: false, remainingSeconds: 0, attemptsUsed: 0 };

  const now = Date.now();
  if (rec.lockedUntil && rec.lockedUntil > now) {
    return {
      isLocked: true,
      remainingSeconds: Math.ceil((rec.lockedUntil - now) / 1000),
      attemptsUsed: rec.failures.length
    };
  }

  const recent = (rec.failures || []).filter(ts => now - ts < 5 * 60 * 1000);
  return { isLocked: false, remainingSeconds: 0, attemptsUsed: recent.length };
}

export function recordFailureAttempt(
  storageKey: string,
  identifier: string,
  meta: { kind: 'login' | 'pin'; userId?: string; userEmail?: string }
): { isLocked: boolean; remainingSeconds: number; attemptsUsed: number } {
  const key = (identifier || 'default').toLowerCase().trim();
  const store = readFailureStore(storageKey);
  const now = Date.now();
  const prev = store[key] || { failures: [], lockedUntil: 0 };
  const recent = prev.failures.filter(ts => now - ts < 5 * 60 * 1000);
  recent.push(now);

  let lockedUntil = prev.lockedUntil || 0;
  const threshold = 5;
  if (recent.length >= threshold) {
    lockedUntil = now + 15 * 60 * 1000; // 15-minute cooldown lock
    void reportSecurityIncidentToServer({
      category: 'brute_force',
      severity: meta.kind === 'pin' ? 'critical' : 'high',
      title: meta.kind === 'pin' ? 'Parent Wallet PIN Brute-Force Lockout' : 'Repeated Login Brute-Force Lockout',
      description: `5 failed ${meta.kind === 'pin' ? 'Parent 4-digit PIN' : 'sign-in'} attempts within 5 minutes for identifier "${identifier}". Auto-locked for 15 minutes.`,
      actorUserId: meta.userId,
      actorEmail: meta.userEmail || (identifier.includes('@') ? identifier : undefined),
      endpoint: meta.kind === 'pin' ? 'parent_pin_gate' : 'signin_form',
      autoBlock: meta.kind === 'pin'
    });
  }

  store[key] = { failures: recent, lockedUntil };
  writeFailureStore(storageKey, store);

  return {
    isLocked: lockedUntil > now,
    remainingSeconds: lockedUntil > now ? Math.ceil((lockedUntil - now) / 1000) : 0,
    attemptsUsed: recent.length
  };
}

export function resetFailureAttempts(storageKey: string, identifier: string): void {
  const key = (identifier || 'default').toLowerCase().trim();
  const store = readFailureStore(storageKey);
  if (store[key]) {
    delete store[key];
    writeFailureStore(storageKey, store);
  }
}

export function checkLoginBruteForce(identifier: string) {
  return checkLockoutStatus(LOGIN_FAIL_STORAGE_KEY, identifier);
}
export function recordLoginFailure(identifier: string) {
  return recordFailureAttempt(LOGIN_FAIL_STORAGE_KEY, identifier, { kind: 'login' });
}
export function resetLoginFailures(identifier: string) {
  resetFailureAttempts(LOGIN_FAIL_STORAGE_KEY, identifier);
}

export function checkPinBruteForce(userId: string) {
  return checkLockoutStatus(PIN_FAIL_STORAGE_KEY, userId);
}
export function recordPinFailure(userId: string, userEmail?: string) {
  return recordFailureAttempt(PIN_FAIL_STORAGE_KEY, userId, { kind: 'pin', userId, userEmail });
}
export function resetPinFailures(userId: string) {
  resetFailureAttempts(PIN_FAIL_STORAGE_KEY, userId);
}

// ==========================================
// XP FARMING VELOCITY ANOMALY DETECTOR
// ==========================================

export function checkXPAnomaly(
  xpAwarded: number,
  feature: string,
  meta?: { userId?: string; userEmail?: string }
): { isAnomalous: boolean; clampedXP: number } {
  const now = Date.now();
  // Keep events from the last 60s
  while (xpEventTimestamps.length > 0 && now - xpEventTimestamps[0].ts > 60000) {
    xpEventTimestamps.shift();
  }
  xpEventTimestamps.push({ ts: now, amount: xpAwarded, feature });

  const last20sCount = xpEventTimestamps.filter(e => now - e.ts <= 20000).length;
  const last60sSum = xpEventTimestamps.reduce((sum, e) => sum + e.amount, 0);

  if (last20sCount > 8 || last60sSum > 3000) {
    void reportSecurityIncidentToServer({
      category: 'xp_anomaly',
      severity: 'high',
      title: 'Abnormal XP Farming Velocity Detected',
      description: `Student triggered ${last20sCount} XP events in 20s (${last60sSum} XP/min) via "${feature}". Excess XP clamped.`,
      actorUserId: meta?.userId,
      actorEmail: meta?.userEmail,
      actorRole: 'student',
      endpoint: `xp_economy:${feature}`
    });
    return {
      isAnomalous: true,
      clampedXP: Math.min(xpAwarded, 25)
    };
  }

  return { isAnomalous: false, clampedXP: xpAwarded };
}
