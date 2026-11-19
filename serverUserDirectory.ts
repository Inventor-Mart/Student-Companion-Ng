import fs from 'fs';
import crypto from 'crypto';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  type Firestore
} from 'firebase/firestore/lite';
import {
  AUTHORIZED_SUPER_ADMINS,
  findActiveBlock,
  type DeletedAccountTombstone,
  type ServerSecurityBlock
} from './serverSecurity';
import type { AuthoritativeLedgerState } from './serverLedger';
import {
  REPAIRED_TUTOR_PROFILE_VERSION,
  SUBJECT_REPAIR_VERSION,
  mergeTutorDataSafely,
  repairSpecificTutorRecord
} from './src/utils/nigerianSubjects';

const USER_DIRECTORY_PATH = '/tmp/sc-user-directory.json';
const OTP_CHALLENGES_PATH = '/tmp/sc-otp-challenges.json';

const VALID_ROLES = ['student', 'parent', 'tutor', 'admin', 'growth_partner', 'school_admin'] as const;
const VALID_CLASS_LEVELS = [
  'JSS 1',
  'JSS 2',
  'JSS 3',
  'SS 1',
  'SS 2',
  'SS 3',
  'University Aspirant'
] as const;
const VALID_STREAMS = ['Junior', 'Science', 'Non-Science'] as const;
const VALID_RANKS = [
  'Fresher',
  'Scholar',
  'Prefect',
  'Senior Boy',
  'Senior Girl',
  'Senior Prefect'
] as const;

const PURGED_SAMPLE_PATTERNS = [
  'adaobi okonkwo',
  'adaobi@student.ng',
  'emeka@student.ng',
  'chinedu okonkwo',
  'chinedu@parent.ng',
  'adebayo johnson',
  'adebayo@tutor.ng',
  'tunde@partner.ng',
  'amaka nwosu',
  'amaka@growth.ng',
  'tolu@tutor.ng',
  'usr-stu-adaobi',
  'usr-par-chinedu',
  'usr-tut-adebayo',
  'partner_tunde_001'
];

export interface ServerRegisteredUser {
  id: string;
  role: (typeof VALID_ROLES)[number];
  fullName: string;
  email: string;
  avatarUrl?: string;
  emailVerified: boolean;
  verifiedAt?: string;
  createdAt: string;
  updatedAt?: string;
  emailHash?: string;
  studentData?: Record<string, any>;
  parentData?: Record<string, any>;
  tutorData?: Record<string, any>;
  adminData?: Record<string, any>;
  growthPartnerData?: Record<string, any>;
  isSuperAdmin?: boolean;
  isDeveloper?: boolean;
  accountStatus?: 'active' | 'locked' | 'suspended' | 'deleted';
  lockedUntil?: string;
  lockReason?: string;
  suspensionReason?: string;
  suspendedAt?: string;
  deletedAt?: string;
  deletedBy?: string;
  deletionReason?: string;
  walletFrozen?: boolean;
  walletFrozenReason?: string;
  directorySource?: 'local' | 'backend' | 'firestore' | 'recovered';
  recoveredFrom?: string;
}

interface OtpChallengeRecord {
  email: string;
  purpose: 'signup' | 'login';
  codeHash: string;
  expiresAtMs: number;
  attempts: number;
  createdAtMs: number;
}

interface DirectoryStoreFile {
  users: Record<string, ServerRegisteredUser>;
  updatedAt: string;
}

interface OtpStoreFile {
  challenges: Record<string, OtpChallengeRecord>;
}

const directoryUsers: Record<string, ServerRegisteredUser> = {};
const otpChallenges: Record<string, OtpChallengeRecord> = {};

function loadDirectoryStore(): void {
  try {
    if (fs.existsSync(USER_DIRECTORY_PATH)) {
      const raw = JSON.parse(fs.readFileSync(USER_DIRECTORY_PATH, 'utf8')) as Partial<DirectoryStoreFile>;
      if (raw && raw.users && typeof raw.users === 'object') {
        let repairedAny = false;
        for (const [id, rec] of Object.entries(raw.users)) {
          if (rec && typeof rec === 'object' && rec.id) {
            const repaired = repairSpecificTutorRecord(rec);
            directoryUsers[id] = repaired.user;
            if (repaired.changed) repairedAny = true;
          }
        }
        if (repairedAny) {
          saveDirectoryStore();
        }
      }
    }
  } catch {
    // Start clean if disk file unreadable
  }
}

function saveDirectoryStore(): void {
  try {
    const payload: DirectoryStoreFile = {
      users: directoryUsers,
      updatedAt: new Date().toISOString()
    };
    fs.writeFileSync(USER_DIRECTORY_PATH, JSON.stringify(payload), 'utf8');
  } catch {
    // Non-fatal on ephemeral fs restrictions
  }
}

function loadOtpStore(): void {
  try {
    if (fs.existsSync(OTP_CHALLENGES_PATH)) {
      const raw = JSON.parse(fs.readFileSync(OTP_CHALLENGES_PATH, 'utf8')) as Partial<OtpStoreFile>;
      if (raw && raw.challenges && typeof raw.challenges === 'object') {
        const now = Date.now();
        for (const [k, v] of Object.entries(raw.challenges)) {
          if (v && Number(v.expiresAtMs) > now) {
            otpChallenges[k] = v;
          }
        }
      }
    }
  } catch {
    // Non-fatal
  }
}

function saveOtpStore(): void {
  try {
    const now = Date.now();
    for (const key of Object.keys(otpChallenges)) {
      if (!otpChallenges[key] || otpChallenges[key].expiresAtMs <= now) {
        delete otpChallenges[key];
      }
    }
    fs.writeFileSync(OTP_CHALLENGES_PATH, JSON.stringify({ challenges: otpChallenges }), 'utf8');
  } catch {
    // Non-fatal
  }
}

loadDirectoryStore();
loadOtpStore();

export function sanitizeDirectoryDocId(raw: unknown, fallbackPrefix = 'usr'): string {
  const cleaned = String(raw || '')
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 120);
  return cleaned || `${fallbackPrefix}_${Date.now()}`;
}

export function hashEmailSha256(email: unknown): string | undefined {
  const clean = String(email || '').trim().toLowerCase();
  if (!clean || !clean.includes('@') || clean.endsWith('.studentcompanion.ng')) return undefined;
  return crypto.createHash('sha256').update(clean).digest('hex');
}

export function isPlaceholderEmail(email: unknown): boolean {
  const clean = String(email || '').trim().toLowerCase();
  return (
    !clean ||
    !clean.includes('@') ||
    clean.endsWith('@recovered.studentcompanion.ng') ||
    clean.endsWith('@scrubbed.local')
  );
}

export function isSampleUserRecord(id: string, record: any): boolean {
  const email = String(record?.email || '').toLowerCase().trim();
  if (AUTHORIZED_SUPER_ADMINS.includes(email) || email === 'martinnosaomorefe@gmail.com') {
    return false;
  }
  const combined = `${id} ${email} ${String(record?.fullName || record?.name || record?.studentName || '')}`.toLowerCase();
  return PURGED_SAMPLE_PATTERNS.some((p) => combined.includes(p));
}

function normalizeRole(raw: unknown): (typeof VALID_ROLES)[number] {
  const r = String(raw || '').trim();
  return (VALID_ROLES as readonly string[]).includes(r) ? (r as (typeof VALID_ROLES)[number]) : 'student';
}

function normalizeClassLevel(raw: unknown): (typeof VALID_CLASS_LEVELS)[number] {
  const c = String(raw || '').trim();
  return (VALID_CLASS_LEVELS as readonly string[]).includes(c)
    ? (c as (typeof VALID_CLASS_LEVELS)[number])
    : 'JSS 1';
}

function normalizeStream(raw: unknown, classLevel: string): (typeof VALID_STREAMS)[number] {
  const s = String(raw || '').trim();
  if ((VALID_STREAMS as readonly string[]).includes(s)) return s as (typeof VALID_STREAMS)[number];
  return classLevel.startsWith('JSS') ? 'Junior' : 'Science';
}

function normalizeRank(raw: unknown): (typeof VALID_RANKS)[number] {
  const r = String(raw || '').trim();
  return (VALID_RANKS as readonly string[]).includes(r) ? (r as (typeof VALID_RANKS)[number]) : 'Fresher';
}

function stripUndefinedDeep<T>(val: T): T {
  if (Array.isArray(val)) {
    return val.map((item) => stripUndefinedDeep(item)) as unknown as T;
  }
  if (val && typeof val === 'object') {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(val as Record<string, any>)) {
      if (v !== undefined) {
        out[k] = stripUndefinedDeep(v);
      }
    }
    return out as T;
  }
  return val;
}

export function toFirestoreUserAccountPayload(user: ServerRegisteredUser): Record<string, any> {
  const payload: Record<string, any> = {
    id: sanitizeDirectoryDocId(user.id),
    role: normalizeRole(user.role),
    fullName: String(user.fullName || 'Student Companion User').trim().slice(0, 120) || 'User',
    email: String(user.email || '').trim().toLowerCase().slice(0, 150),
    emailVerified: Boolean(user.emailVerified),
    createdAt: String(user.createdAt || new Date().toISOString()).slice(0, 50)
  };
  if (user.avatarUrl && user.avatarUrl.length <= 500) payload.avatarUrl = user.avatarUrl;
  if (user.verifiedAt) payload.verifiedAt = String(user.verifiedAt).slice(0, 50);
  if (user.studentData && typeof user.studentData === 'object') {
    payload.studentData = stripUndefinedDeep(user.studentData);
  }
  if (user.parentData && typeof user.parentData === 'object') {
    payload.parentData = stripUndefinedDeep(user.parentData);
  }
  if (user.tutorData && typeof user.tutorData === 'object') {
    payload.tutorData = stripUndefinedDeep(user.tutorData);
  }
  if (user.adminData && typeof user.adminData === 'object') {
    payload.adminData = stripUndefinedDeep(user.adminData);
  }
  if (user.growthPartnerData && typeof user.growthPartnerData === 'object') {
    payload.growthPartnerData = stripUndefinedDeep(user.growthPartnerData);
  }
  if (typeof user.isSuperAdmin === 'boolean') payload.isSuperAdmin = user.isSuperAdmin;
  if (typeof user.isDeveloper === 'boolean') payload.isDeveloper = user.isDeveloper;
  if (user.accountStatus) payload.accountStatus = user.accountStatus;
  if (user.lockedUntil) payload.lockedUntil = String(user.lockedUntil).slice(0, 50);
  if (user.lockReason) payload.lockReason = String(user.lockReason).slice(0, 300);
  if (user.suspensionReason) payload.suspensionReason = String(user.suspensionReason).slice(0, 300);
  if (user.suspendedAt) payload.suspendedAt = String(user.suspendedAt).slice(0, 50);
  if (user.deletedAt) payload.deletedAt = String(user.deletedAt).slice(0, 50);
  if (user.deletedBy) payload.deletedBy = String(user.deletedBy).slice(0, 150);
  if (user.deletionReason) payload.deletionReason = String(user.deletionReason).slice(0, 300);
  if (typeof user.walletFrozen === 'boolean') payload.walletFrozen = user.walletFrozen;
  if (user.walletFrozenReason) payload.walletFrozenReason = String(user.walletFrozenReason).slice(0, 300);
  return payload;
}

function mergeTwoUsers(
  existing: ServerRegisteredUser,
  incoming: ServerRegisteredUser,
  options?: { allowPrivilegedOverwrite?: boolean }
): ServerRegisteredUser {
  const allowPriv = Boolean(options?.allowPrivilegedOverwrite);
  const existingEmailClean = String(existing.email || '').trim().toLowerCase();
  const incomingEmailClean = String(incoming.email || '').trim().toLowerCase();

  const resolvedEmail =
    !isPlaceholderEmail(incomingEmailClean)
      ? incomingEmailClean
      : !isPlaceholderEmail(existingEmailClean)
        ? existingEmailClean
        : incomingEmailClean || existingEmailClean;

  const existingIsRecoveredPlaceholder =
    existing.directorySource === 'recovered' || isPlaceholderEmail(existingEmailClean);
  const incomingIsRecoveredPlaceholder =
    incoming.directorySource === 'recovered' || isPlaceholderEmail(incomingEmailClean);

  const resolvedName =
    (!incomingIsRecoveredPlaceholder && incoming.fullName && incoming.fullName !== 'Student Scholar')
      ? incoming.fullName
      : existing.fullName || incoming.fullName || 'Student Companion User';

  const resolvedRole =
    (!incomingIsRecoveredPlaceholder && incoming.role)
      ? incoming.role
      : existing.role || incoming.role || 'student';

  const merged: ServerRegisteredUser = {
    ...existing,
    ...incoming,
    id: existing.id || incoming.id,
    role: resolvedRole,
    fullName: resolvedName,
    email: resolvedEmail,
    emailHash:
      incoming.emailHash ||
      existing.emailHash ||
      hashEmailSha256(resolvedEmail),
    emailVerified: Boolean(existing.emailVerified || incoming.emailVerified),
    createdAt:
      existing.createdAt && incoming.createdAt
        ? existing.createdAt < incoming.createdAt
          ? existing.createdAt
          : incoming.createdAt
        : existing.createdAt || incoming.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    studentData:
      existing.studentData || incoming.studentData
        ? {
            ...(existing.studentData || {}),
            ...(incoming.studentData || {}),
            xp:
              allowPriv && incoming.studentData?.xp !== undefined
                ? Math.max(0, Number(incoming.studentData.xp))
                : Math.max(Number(existing.studentData?.xp || 0), Number(incoming.studentData?.xp || 0)),
            streakDays:
              allowPriv && incoming.studentData?.streakDays !== undefined
                ? Math.max(0, Number(incoming.studentData.streakDays))
                : Math.max(
                    Number(existing.studentData?.streakDays || 0),
                    Number(incoming.studentData?.streakDays || 0)
                  ),
            isSubscribed: Boolean(
              existing.studentData?.isSubscribed || incoming.studentData?.isSubscribed
            ),
            studentLinkCode:
              incoming.studentData?.studentLinkCode || existing.studentData?.studentLinkCode,
            schoolCode:
              incoming.studentData?.schoolCode || existing.studentData?.schoolCode
          }
        : undefined,
    parentData:
      existing.parentData || incoming.parentData
        ? { ...(existing.parentData || {}), ...(incoming.parentData || {}) }
        : undefined,
    tutorData: mergeTutorDataSafely(existing.tutorData, incoming.tutorData),
    adminData:
      existing.adminData || incoming.adminData
        ? { ...(existing.adminData || {}), ...(incoming.adminData || {}) }
        : undefined,
    growthPartnerData:
      existing.growthPartnerData || incoming.growthPartnerData
        ? { ...(existing.growthPartnerData || {}), ...(incoming.growthPartnerData || {}) }
        : undefined,
    directorySource:
      !existingIsRecoveredPlaceholder
        ? existing.directorySource || incoming.directorySource
        : incoming.directorySource || existing.directorySource,
    recoveredFrom: incoming.recoveredFrom || existing.recoveredFrom
  };

  if (!allowPriv) {
    // Non-privileged client syncs must never clear admin enforcement or self-promote Super Admin
    merged.isSuperAdmin = existing.isSuperAdmin;
    merged.isDeveloper = existing.isDeveloper;
    if (existing.accountStatus && existing.accountStatus !== 'active') {
      merged.accountStatus = existing.accountStatus;
      merged.lockedUntil = existing.lockedUntil;
      merged.lockReason = existing.lockReason;
      merged.suspensionReason = existing.suspensionReason;
      merged.suspendedAt = existing.suspendedAt;
      merged.deletedAt = existing.deletedAt;
      merged.deletedBy = existing.deletedBy;
      merged.deletionReason = existing.deletionReason;
    }
    if (existing.walletFrozen) {
      merged.walletFrozen = existing.walletFrozen;
      merged.walletFrozenReason = existing.walletFrozenReason;
    }
  }

  return stripUndefinedDeep(repairSpecificTutorRecord(merged).user);
}

function normalizeRawUser(
  raw: any,
  options?: { allowPrivilegedFields?: boolean; defaultSource?: ServerRegisteredUser['directorySource'] }
): ServerRegisteredUser {
  const id = sanitizeDirectoryDocId(raw?.id);
  const rawEmail = String(raw?.email || '').trim().toLowerCase().slice(0, 150);
  const role = normalizeRole(raw?.role);
  const isOfficialSuperAdmin = AUTHORIZED_SUPER_ADMINS.includes(rawEmail);
  const safeRole =
    !options?.allowPrivilegedFields && role === 'admin' && !raw?.adminData && !isOfficialSuperAdmin
      ? 'student'
      : role;

  const base: ServerRegisteredUser = {
    id,
    role: safeRole,
    fullName: String(raw?.fullName || raw?.name || 'Student Companion User').trim().slice(0, 120) || 'User',
    email: rawEmail,
    avatarUrl:
      typeof raw?.avatarUrl === 'string' && raw.avatarUrl.length <= 500
        ? raw.avatarUrl
        : undefined,
    emailVerified: Boolean(raw?.emailVerified ?? true),
    verifiedAt: typeof raw?.verifiedAt === 'string' ? raw.verifiedAt.slice(0, 50) : undefined,
    createdAt:
      typeof raw?.createdAt === 'string' && raw.createdAt
        ? raw.createdAt.slice(0, 50)
        : new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    emailHash: typeof raw?.emailHash === 'string' ? raw.emailHash : hashEmailSha256(rawEmail),
    studentData: raw?.studentData && typeof raw.studentData === 'object' ? raw.studentData : undefined,
    parentData: raw?.parentData && typeof raw.parentData === 'object' ? raw.parentData : undefined,
    tutorData: raw?.tutorData && typeof raw.tutorData === 'object' ? raw.tutorData : undefined,
    adminData: raw?.adminData && typeof raw.adminData === 'object' ? raw.adminData : undefined,
    growthPartnerData:
      raw?.growthPartnerData && typeof raw.growthPartnerData === 'object'
        ? raw.growthPartnerData
        : undefined,
    directorySource: raw?.directorySource || options?.defaultSource || 'backend',
    recoveredFrom: typeof raw?.recoveredFrom === 'string' ? raw.recoveredFrom : undefined
  };

  if (options?.allowPrivilegedFields || isOfficialSuperAdmin) {
    if (typeof raw?.isSuperAdmin === 'boolean') base.isSuperAdmin = raw.isSuperAdmin;
    if (typeof raw?.isDeveloper === 'boolean') base.isDeveloper = raw.isDeveloper;
    if (raw?.accountStatus) base.accountStatus = raw.accountStatus;
    if (raw?.lockedUntil) base.lockedUntil = raw.lockedUntil;
    if (raw?.lockReason) base.lockReason = raw.lockReason;
    if (raw?.suspensionReason) base.suspensionReason = raw.suspensionReason;
    if (raw?.suspendedAt) base.suspendedAt = raw.suspendedAt;
    if (raw?.deletedAt) base.deletedAt = raw.deletedAt;
    if (raw?.deletedBy) base.deletedBy = raw.deletedBy;
    if (raw?.deletionReason) base.deletionReason = raw.deletionReason;
    if (typeof raw?.walletFrozen === 'boolean') base.walletFrozen = raw.walletFrozen;
    if (raw?.walletFrozenReason) base.walletFrozenReason = raw.walletFrozenReason;
  }

  return stripUndefinedDeep(repairSpecificTutorRecord(base).user);
}

export function upsertServerUser(
  raw: any,
  options?: { allowPrivilegedFields?: boolean; defaultSource?: ServerRegisteredUser['directorySource'] }
): ServerRegisteredUser | null {
  if (!raw || typeof raw !== 'object') return null;
  const incoming = normalizeRawUser(raw, options);
  if (isSampleUserRecord(incoming.id, incoming)) return null;

  const cleanEmail = incoming.email;
  const cleanHash = incoming.emailHash;

  let existingKey: string | null = null;
  if (directoryUsers[incoming.id]) {
    existingKey = incoming.id;
  } else if (!isPlaceholderEmail(cleanEmail)) {
    for (const [key, rec] of Object.entries(directoryUsers)) {
      if (rec.email && rec.email.toLowerCase() === cleanEmail) {
        existingKey = key;
        break;
      }
      if (cleanHash && rec.emailHash && rec.emailHash === cleanHash) {
        existingKey = key;
        break;
      }
    }
  }

  if (existingKey && directoryUsers[existingKey]) {
    const merged = mergeTwoUsers(directoryUsers[existingKey], incoming, {
      allowPrivilegedOverwrite: options?.allowPrivilegedFields
    });
    directoryUsers[existingKey] = merged;
    saveDirectoryStore();
    return merged;
  }

  directoryUsers[incoming.id] = incoming;
  saveDirectoryStore();
  return incoming;
}

export function applyAdminUpdateToServerUser(
  userId: string,
  updates: Partial<ServerRegisteredUser>,
  fallbackProfile?: Partial<ServerRegisteredUser>
): ServerRegisteredUser | null {
  const cleanId = sanitizeDirectoryDocId(userId);
  const existing =
    directoryUsers[cleanId] ||
    (fallbackProfile ? normalizeRawUser({ id: cleanId, ...fallbackProfile }, { allowPrivilegedFields: true }) : null);

  if (!existing) return null;

  const existingProfileTs = Math.max(
    Date.parse(String(existing.tutorData?.manualProfileOverrideAt || '')) || 0,
    Date.parse(String(existing.tutorData?.manualSubjectOverrideAt || '')) || 0
  );
  const incomingProfileTs =
    Date.parse(String((updates.tutorData as any)?.manualProfileOverrideAt || '')) || 0;
  const authoritativeOverrideIso = new Date(
    Math.max(existingProfileTs + 1, incomingProfileTs, Date.now())
  ).toISOString();

  const incomingTutorData =
    updates.tutorData && typeof updates.tutorData === 'object'
      ? {
          ...(existing.tutorData || {}),
          ...updates.tutorData,
          manualProfileOverrideAt: authoritativeOverrideIso,
          profileRepairVersion: REPAIRED_TUTOR_PROFILE_VERSION,
          ...(updates.tutorData.proficientSubjects !== undefined || updates.tutorData.subjectSpecialization !== undefined
            ? {
                manualSubjectOverrideAt: authoritativeOverrideIso,
                subjectRepairVersion: SUBJECT_REPAIR_VERSION
              }
            : {})
        }
      : updates.tutorData;

  const incomingEmailHash =
    typeof updates.email === 'string' && updates.email.trim()
      ? hashEmailSha256(updates.email)
      : existing.emailHash;

  const incoming = normalizeRawUser(
    {
      ...existing,
      ...updates,
      emailHash: incomingEmailHash,
      ...(incomingTutorData !== undefined ? { tutorData: incomingTutorData } : {}),
      id: existing.id
    },
    { allowPrivilegedFields: true, defaultSource: existing.directorySource || 'backend' }
  );
  const merged = mergeTwoUsers(existing, incoming, { allowPrivilegedOverwrite: true });
  directoryUsers[existing.id] = merged;
  saveDirectoryStore();
  return merged;
}

function hashOtpCode(email: string, code: string): string {
  return crypto
    .createHash('sha256')
    .update(`${email.toLowerCase().trim()}::${code.trim()}`)
    .digest('hex');
}

export function recordEmailOtpChallenge(
  email: string,
  code: string,
  purpose: 'signup' | 'login'
): void {
  const cleanEmail = String(email || '').trim().toLowerCase();
  const cleanCode = String(code || '').trim();
  if (!cleanEmail || !cleanCode) return;

  const key = `${purpose}:${cleanEmail}`;
  const now = Date.now();
  otpChallenges[key] = {
    email: cleanEmail,
    purpose,
    codeHash: hashOtpCode(cleanEmail, cleanCode),
    expiresAtMs: now + 10 * 60 * 1000,
    attempts: 0,
    createdAtMs: now
  };
  saveOtpStore();
}

export function verifyEmailOtpChallenge(
  email: string,
  code: string,
  purpose: 'signup' | 'login'
): { valid: boolean; error?: string } {
  const cleanEmail = String(email || '').trim().toLowerCase();
  const cleanCode = String(code || '').trim();
  const key = `${purpose}:${cleanEmail}`;
  const rec = otpChallenges[key];
  if (!rec) {
    return {
      valid: false,
      error: 'No active verification code was found for this email. Please request a fresh 6-digit code.'
    };
  }
  if (Date.now() > rec.expiresAtMs) {
    delete otpChallenges[key];
    saveOtpStore();
    return {
      valid: false,
      error: 'This 6-digit verification code has expired. Please request a new code.'
    };
  }
  if (rec.attempts >= 5) {
    delete otpChallenges[key];
    saveOtpStore();
    return {
      valid: false,
      error: 'Too many incorrect verification code attempts. Please request a fresh code.'
    };
  }

  const expectedBuf = Buffer.from(rec.codeHash, 'utf8');
  const providedBuf = Buffer.from(hashOtpCode(cleanEmail, cleanCode), 'utf8');
  const isMatch =
    expectedBuf.length === providedBuf.length && crypto.timingSafeEqual(expectedBuf, providedBuf);

  if (!isMatch) {
    rec.attempts += 1;
    saveOtpStore();
    const remaining = Math.max(0, 5 - rec.attempts);
    return {
      valid: false,
      error:
        remaining > 0
          ? `Invalid 6-digit verification code (${remaining} attempt(s) remaining).`
          : 'Too many invalid attempts. Please request a new 6-digit code.'
    };
  }

  delete otpChallenges[key];
  saveOtpStore();
  return { valid: true };
}

export async function harvestAllDirectoryUsers(params: {
  linkingMemoryStore: {
    studentLinks: Record<string, any>;
    schools: Record<string, any>;
    enrollments: Record<string, any>;
  };
  referralMemoryStore: {
    partners: Record<string, any>;
    bindings: Record<string, any>;
  };
  ledgerState: AuthoritativeLedgerState;
  serverDb: Firestore;
  securityBlocks?: ServerSecurityBlock[];
  deletedAccounts?: DeletedAccountTombstone[];
}): Promise<{
  users: ServerRegisteredUser[];
  stats: {
    total: number;
    directoryCount: number;
    firestoreCount: number;
    recoveredCount: number;
  };
}> {
  const mergedByKey = new Map<string, ServerRegisteredUser>();
  const emailToKey = new Map<string, string>();
  const hashToKey = new Map<string, string>();
  let directoryCount = 0;
  let firestoreCount = 0;
  let recoveredCount = 0;

  const insertOrMerge = (
    candidate: ServerRegisteredUser,
    sourceBucket: 'directory' | 'firestore' | 'recovered'
  ) => {
    if (!candidate.id || isSampleUserRecord(candidate.id, candidate)) return;

    const cleanEmail = String(candidate.email || '').trim().toLowerCase();
    const cleanHash = candidate.emailHash || hashEmailSha256(cleanEmail);

    let targetKey: string | undefined;
    if (mergedByKey.has(candidate.id)) {
      targetKey = candidate.id;
    } else if (!isPlaceholderEmail(cleanEmail) && emailToKey.has(cleanEmail)) {
      targetKey = emailToKey.get(cleanEmail);
    } else if (cleanHash && hashToKey.has(cleanHash)) {
      targetKey = hashToKey.get(cleanHash);
    }

    if (targetKey && mergedByKey.has(targetKey)) {
      const merged = mergeTwoUsers(mergedByKey.get(targetKey)!, candidate, {
        allowPrivilegedOverwrite: true
      });
      mergedByKey.set(targetKey, merged);
      if (!isPlaceholderEmail(merged.email)) emailToKey.set(merged.email, targetKey);
      if (merged.emailHash) hashToKey.set(merged.emailHash, targetKey);
      return;
    }

    const finalRec = stripUndefinedDeep({
      ...candidate,
      emailHash: cleanHash
    });
    mergedByKey.set(finalRec.id, finalRec);
    if (!isPlaceholderEmail(finalRec.email)) emailToKey.set(finalRec.email, finalRec.id);
    if (finalRec.emailHash) hashToKey.set(finalRec.emailHash, finalRec.id);

    if (sourceBucket === 'directory') directoryCount += 1;
    else if (sourceBucket === 'firestore') firestoreCount += 1;
    else recoveredCount += 1;
  };

  // 1. Primary shared directory records
  for (const user of Object.values(directoryUsers)) {
    insertOrMerge(
      { ...user, directorySource: user.directorySource || 'backend' },
      'directory'
    );
  }

  // 2. Best-effort Firestore reads (succeeds whenever rules permit or service credentials exist)
  const safeReadCollection = async (colName: string) => {
    try {
      const snap = await getDocs(collection(params.serverDb, colName));
      return snap.docs.map((d) => ({ id: d.id, data: d.data() }));
    } catch {
      return [];
    }
  };

  const [fsUsers, fsStudents, fsPartners, fsLinks, fsSchools, fsEnrollments] = await Promise.all([
    safeReadCollection('users'),
    safeReadCollection('students'),
    safeReadCollection('growthPartners'),
    safeReadCollection('studentLinkRegistry'),
    safeReadCollection('schoolRegistry'),
    safeReadCollection('schoolEnrollments')
  ]);

  for (const d of fsUsers) {
    const normalized = normalizeRawUser(
      { id: d.id, ...d.data },
      { allowPrivilegedFields: true, defaultSource: 'firestore' }
    );
    insertOrMerge(normalized, 'firestore');
  }

  for (const d of fsStudents) {
    const s = d.data || {};
    const classLevel = normalizeClassLevel(s.classLevel);
    insertOrMerge(
      normalizeRawUser(
        {
          id: s.id || d.id,
          role: 'student',
          fullName: s.name || 'Registered Student',
          email: `stu-${sanitizeDirectoryDocId(d.id).toLowerCase()}@recovered.studentcompanion.ng`,
          emailVerified: true,
          createdAt: s.lastSubscribedAt || s.referralAttributedAt || new Date().toISOString(),
          studentData: {
            ...s,
            id: s.id || d.id,
            name: s.name || 'Registered Student',
            school: s.school || 'Secondary School',
            classLevel,
            stream: normalizeStream(s.stream, classLevel),
            xp: Math.max(0, Number(s.xp || 0)),
            rank: normalizeRank(s.rank),
            streakDays: Math.max(1, Number(s.streakDays || 1))
          },
          directorySource: 'recovered',
          recoveredFrom: 'Firestore students'
        },
        { defaultSource: 'recovered' }
      ),
      'recovered'
    );
  }

  // 3. Recover from Growth Partners (local store + Firestore)
  const allPartnerRecords = [
    ...Object.values(params.referralMemoryStore.partners || {}),
    ...fsPartners.map((d) => ({ id: d.id, ...d.data }))
  ];
  for (const p of allPartnerRecords) {
    if (!p?.id && !p?.email) continue;
    const id = sanitizeDirectoryDocId(p.id || `usr_growth_partner_${Date.now()}`);
    insertOrMerge(
      normalizeRawUser(
        {
          id,
          role: 'growth_partner',
          fullName: p.name || 'Growth Partner',
          email: String(p.email || `partner-${id.toLowerCase()}@recovered.studentcompanion.ng`).toLowerCase(),
          emailVerified: true,
          createdAt: p.createdAt || new Date().toISOString(),
          growthPartnerData: {
            id,
            name: p.name || 'Growth Partner',
            email: p.email || '',
            phone: p.phone || '',
            referralCode: p.referralCode || '',
            commissionRatePercent: Number(p.commissionRatePercent ?? 10),
            totalEarningsNaira: Number(p.totalEarningsNaira || 0),
            totalPaidOutNaira: Number(p.totalPaidOutNaira || 0),
            activeReferralsCount: Number(p.activeReferralsCount || 0),
            bankName: p.bankName || '',
            accountNumber: p.accountNumber || '',
            accountName: p.accountName || p.name || '',
            status: p.status || 'active',
            createdAt: p.createdAt || new Date().toISOString()
          },
          directorySource: 'recovered',
          recoveredFrom: 'Growth Partner Registry'
        },
        { defaultSource: 'recovered' }
      ),
      'recovered'
    );
  }

  // 4. Recover from Student Link Code Registry
  const allLinkRecords = [
    ...Object.values(params.linkingMemoryStore.studentLinks || {}),
    ...fsLinks.map((d) => d.data)
  ];
  for (const link of allLinkRecords) {
    if (!link?.studentId) continue;
    const studentId = sanitizeDirectoryDocId(link.studentId, 'stu');
    const classLevel = normalizeClassLevel(link.classLevel);
    insertOrMerge(
      normalizeRawUser(
        {
          id: studentId,
          role: 'student',
          fullName: link.studentName || 'Student Scholar',
          email: `link-${String(link.code || studentId).toLowerCase()}@recovered.studentcompanion.ng`,
          emailHash: link.emailHash,
          emailVerified: true,
          createdAt: link.createdAt || new Date().toISOString(),
          studentData: {
            id: studentId,
            name: link.studentName || 'Student Scholar',
            school: link.schoolName || 'Secondary School',
            schoolCode: link.schoolCode,
            classLevel,
            stream: normalizeStream(link.stream, classLevel),
            xp: 0,
            rank: 'Fresher',
            streakDays: 1,
            lastStudyDate: String(link.updatedAt || link.createdAt || new Date().toISOString()).split('T')[0],
            uniformVerified: false,
            uniformPhotoUrl: null,
            downloadedSubjectIds: [],
            completedQuizIds: [],
            completedReadNoteIds: [],
            verifiedReadingLogs: [],
            studentLinkCode: link.code
          },
          directorySource: 'recovered',
          recoveredFrom: `Student Link Registry (${link.code})`
        },
        { defaultSource: 'recovered' }
      ),
      'recovered'
    );
  }

  // 5. Enrich/recover from School Enrollments
  const allEnrollments = [
    ...Object.values(params.linkingMemoryStore.enrollments || {}),
    ...fsEnrollments.map((d) => d.data)
  ];
  for (const enr of allEnrollments) {
    if (!enr?.studentId) continue;
    const studentId = sanitizeDirectoryDocId(enr.studentId, 'stu');
    const classLevel = normalizeClassLevel(enr.classLevel);
    insertOrMerge(
      normalizeRawUser(
        {
          id: studentId,
          role: 'student',
          fullName: enr.studentName || 'Student Scholar',
          email: `enr-${studentId.toLowerCase()}@recovered.studentcompanion.ng`,
          emailVerified: true,
          createdAt: enr.joinedAt || new Date().toISOString(),
          studentData: {
            id: studentId,
            name: enr.studentName || 'Student Scholar',
            school: 'Accredited School Student',
            schoolCode: enr.schoolCode,
            classLevel,
            stream: normalizeStream(enr.stream, classLevel),
            xp: Math.max(0, Number(enr.xp || 0)),
            rank: normalizeRank(enr.rank),
            streakDays: Math.max(1, Number(enr.streakDays || 1)),
            isSubscribed: Boolean(enr.isSubscribed),
            subscriptionTier: enr.subscriptionTier || 'free',
            subscriptionPlan: enr.subscriptionTier || 'free',
            subscribedUntil: enr.subscribedUntil || undefined,
            uniformVerified: Boolean(enr.uniformVerified),
            uniformPhotoUrl: null,
            downloadedSubjectIds: [],
            completedQuizIds: [],
            completedReadNoteIds: [],
            verifiedReadingLogs: []
          },
          directorySource: 'recovered',
          recoveredFrom: `School Enrollment (${enr.schoolCode})`
        },
        { defaultSource: 'recovered' }
      ),
      'recovered'
    );
  }

  // 6. Recover School Admins from School Registry
  const allSchools = [
    ...Object.values(params.linkingMemoryStore.schools || {}),
    ...fsSchools.map((d) => d.data)
  ];
  for (const sch of allSchools) {
    if (!sch?.adminId) continue;
    const adminId = sanitizeDirectoryDocId(sch.adminId, 'adm');
    insertOrMerge(
      normalizeRawUser(
        {
          id: adminId,
          role: 'admin',
          fullName: `School Admin · ${sch.schoolName || sch.schoolCode}`,
          email: `school-${String(sch.schoolCode || adminId).toLowerCase()}@recovered.studentcompanion.ng`,
          emailVerified: true,
          createdAt: sch.createdAt || new Date().toISOString(),
          adminData: {
            schoolName: sch.schoolName || 'Secondary School',
            schoolType: sch.schoolType || 'College',
            schoolCode: sch.schoolCode || '',
            state: sch.state || '',
            lga: sch.lga || '',
            verificationStatus: sch.verificationStatus || 'pending_verification'
          },
          directorySource: 'recovered',
          recoveredFrom: `School Registry (${sch.schoolCode})`
        },
        { allowPrivilegedFields: true, defaultSource: 'recovered' }
      ),
      'recovered'
    );
  }

  // 7. Recover from Authoritative Ledgers (paid/active students & parents)
  for (const [stuId, ledger] of Object.entries(params.ledgerState?.students || {})) {
    insertOrMerge(
      normalizeRawUser(
        {
          id: stuId,
          role: 'student',
          fullName: `Student Account (${stuId.slice(-6)})`,
          email: `ledger-${stuId.toLowerCase()}@recovered.studentcompanion.ng`,
          emailVerified: true,
          createdAt: ledger.lastSubscribedAt || ledger.updatedAt || new Date().toISOString(),
          studentData: {
            id: stuId,
            name: `Student Account (${stuId.slice(-6)})`,
            school: 'Secondary School',
            classLevel: 'JSS 1',
            stream: 'Science',
            xp: Number(ledger.xp || 0),
            rank: normalizeRank(ledger.rank),
            streakDays: Math.max(1, Number(ledger.streakDays || 1)),
            isSubscribed: Boolean(ledger.isSubscribed),
            subscriptionPlan: ledger.subscriptionPlan || 'free',
            subscriptionTier: ledger.subscriptionTier || 'free',
            subscribedUntil: ledger.subscribedUntil || undefined,
            termExpiresAt: ledger.termExpiresAt || undefined,
            addOns: ledger.addOns
          },
          directorySource: 'recovered',
          recoveredFrom: 'Authoritative Student Ledger'
        },
        { defaultSource: 'recovered' }
      ),
      'recovered'
    );
  }

  for (const [walletUserId, wallet] of Object.entries(params.ledgerState?.wallets || {})) {
    if (!walletUserId || mergedByKey.has(walletUserId)) continue;
    insertOrMerge(
      normalizeRawUser(
        {
          id: walletUserId,
          role: 'parent',
          fullName: `Parent Wallet (${walletUserId.slice(-6)})`,
          email: `wallet-${walletUserId.toLowerCase()}@recovered.studentcompanion.ng`,
          emailVerified: true,
          createdAt: wallet.updatedAt || new Date().toISOString(),
          parentData: {
            phone: '',
            wardName: 'Linked Student Ward',
            pin: ''
          },
          directorySource: 'recovered',
          recoveredFrom: 'Parent Wallet Ledger'
        },
        { defaultSource: 'recovered' }
      ),
      'recovered'
    );
  }

  // 8. Overlay active security enforcement & deleted tombstones
  const deletedList = params.deletedAccounts || [];
  const results = Array.from(mergedByKey.values()).map((user) => {
    const tombstone = deletedList.find(
      (t) =>
        t.userId === user.id ||
        (!isPlaceholderEmail(user.email) && t.originalEmail === user.email)
    );
    if (tombstone) {
      return {
        ...user,
        fullName: 'Deleted Account',
        email: tombstone.scrubbedEmail || `deleted_${user.id.slice(0, 14)}@scrubbed.local`,
        accountStatus: 'deleted' as const,
        deletedAt: tombstone.deletedAt,
        deletedBy: tombstone.deletedBy,
        deletionReason: tombstone.reason,
        walletFrozen: true,
        walletFrozenReason: 'Account permanently closed'
      };
    }

    const block = findActiveBlock({
      userId: user.id,
      email: isPlaceholderEmail(user.email) ? undefined : user.email,
      blockTypes: ['account_delete', 'account_suspend', 'account_lock', 'wallet_freeze']
    });
    if (block) {
      if (block.blockType === 'account_suspend') {
        return {
          ...user,
          accountStatus: 'suspended' as const,
          suspensionReason: block.reason,
          suspendedAt: block.createdAt
        };
      }
      if (block.blockType === 'account_lock') {
        return {
          ...user,
          accountStatus: 'locked' as const,
          lockedUntil: block.expiresAt,
          lockReason: block.reason
        };
      }
      if (block.blockType === 'wallet_freeze') {
        return {
          ...user,
          walletFrozen: true,
          walletFrozenReason: block.reason
        };
      }
    }

    return user;
  });

  results.sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));

  return {
    users: results,
    stats: {
      total: results.length,
      directoryCount,
      firestoreCount,
      recoveredCount
    }
  };
}

export async function findServerUserByEmailOrId(params: {
  identifier: string;
  linkingMemoryStore: {
    studentLinks: Record<string, any>;
    schools: Record<string, any>;
    enrollments: Record<string, any>;
  };
  referralMemoryStore: {
    partners: Record<string, any>;
    bindings: Record<string, any>;
  };
  ledgerState: AuthoritativeLedgerState;
  serverDb: Firestore;
}): Promise<ServerRegisteredUser | null> {
  const clean = String(params.identifier || '').trim().toLowerCase();
  if (!clean) return null;
  const emailHash = hashEmailSha256(clean);

  const harvested = await harvestAllDirectoryUsers({
    linkingMemoryStore: params.linkingMemoryStore,
    referralMemoryStore: params.referralMemoryStore,
    ledgerState: params.ledgerState,
    serverDb: params.serverDb
  });

  const matched = harvested.users.find((u) => {
    if (u.id.toLowerCase() === clean) return true;
    if (!isPlaceholderEmail(u.email) && u.email.toLowerCase() === clean) return true;
    if (emailHash && u.emailHash && u.emailHash === emailHash) return true;
    if (!clean.includes('@') && u.fullName.toLowerCase() === clean) return true;
    return false;
  });

  if (!matched) return null;

  // If user matched via hashed link-code email and supplied their real email, upgrade the directory entry cleanly
  if (clean.includes('@') && isPlaceholderEmail(matched.email)) {
    const upgraded = upsertServerUser(
      {
        ...matched,
        email: clean,
        emailHash,
        emailVerified: true,
        directorySource: matched.directorySource === 'recovered' ? 'backend' : matched.directorySource
      },
      { defaultSource: 'backend' }
    );
    return upgraded || { ...matched, email: clean, emailHash };
  }

  return matched;
}

export function purgeSampleUsersFromDirectory(): number {
  let removed = 0;
  for (const [id, rec] of Object.entries(directoryUsers)) {
    if (isSampleUserRecord(id, rec)) {
      delete directoryUsers[id];
      removed += 1;
    }
  }
  if (removed > 0) saveDirectoryStore();
  return removed;
}
