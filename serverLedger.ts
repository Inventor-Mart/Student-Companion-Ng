import fs from 'fs';
import crypto from 'crypto';
import type { Request } from 'express';
import firebaseConfig from './firebase-applet-config.json';
import { AUTHORIZED_SUPER_ADMINS } from './serverSecurity';

const AUTHORITATIVE_LEDGER_PATH = '/tmp/sc-authoritative-ledger.json';
const AI_COACH_QUOTA_PATH = '/tmp/sc-ai-coach-quota.json';

export interface VerifiedAuthUser {
  uid: string;
  email: string;
  emailVerified: boolean;
  isSuperAdmin: boolean;
}

export interface VerifiedStudentLedgerEntry {
  studentId: string;
  isSubscribed: boolean;
  subscriptionPlan: 'free' | 'basic' | 'standard' | 'elite';
  subscriptionTier: 'free' | 'basic' | 'standard' | 'elite';
  subscribedUntil: string | null;
  termExpiresAt: string | null;
  lastSubscribedAt: string | null;
  lastPaymentReference: string | null;
  addOns: {
    aiCoachUnlocked?: boolean;
    termlyCompetitionUnlocked?: boolean;
    termlyDrillAllSubjects?: boolean;
    termlyDrillSingleSubjects?: string[];
  };
  examPrepState: {
    isUnlocked: boolean;
    unlockedSubjectExams: string[];
    unlockedAt?: string;
    paymentMethod?: 'escrow_wallet' | 'direct_paystack';
    paymentReference?: string;
    tutorCreditsNaira: number;
  };
  xp: number;
  rank: string;
  streakDays: number;
  lastStudyDate?: string;
  uniformVerified?: boolean;
  updatedAt: string;
}

export interface VerifiedWalletTx {
  id: string;
  type: 'credit' | 'debit' | 'fund';
  amountNaira: number;
  description: string;
  timestamp: string;
  status: 'successful' | 'success' | 'pending' | 'failed';
  reference?: string;
  purpose?: string;
  channel?: string;
  bookingId?: string;
  refunded?: boolean;
}

export interface VerifiedWalletLedgerEntry {
  userId: string;
  balanceNaira: number;
  totalFunded: number;
  lastFundedAt?: string;
  lastPaymentReference?: string;
  updatedAt: string;
  transactions: VerifiedWalletTx[];
}

export interface AiCoachQuotaEntry {
  count: number;
  lastPromptAtMs: number;
  planType: 'addon' | 'elite' | 'admin_bypass';
  dateWat: string;
  studentId: string;
}

export interface AuthoritativeLedgerState {
  students: Record<string, VerifiedStudentLedgerEntry>;
  wallets: Record<string, VerifiedWalletLedgerEntry>;
  termlyDrills: Record<string, any>;
  certificateDrills: Record<string, any>;
  schoolSubscriptions: Record<string, any>;
}

const DEFAULT_LEDGER_STATE: AuthoritativeLedgerState = {
  students: {},
  wallets: {},
  termlyDrills: {},
  certificateDrills: {},
  schoolSubscriptions: {},
};

const ledgerState: AuthoritativeLedgerState = {
  students: {},
  wallets: {},
  termlyDrills: {},
  certificateDrills: {},
  schoolSubscriptions: {},
};

const aiCoachQuotaStore: Record<string, AiCoachQuotaEntry> = {};

function loadLedgerFromDisk(): void {
  try {
    if (fs.existsSync(AUTHORITATIVE_LEDGER_PATH)) {
      const raw = JSON.parse(fs.readFileSync(AUTHORITATIVE_LEDGER_PATH, 'utf8'));
      if (raw && typeof raw === 'object') {
        if (raw.students && typeof raw.students === 'object') ledgerState.students = raw.students;
        if (raw.wallets && typeof raw.wallets === 'object') ledgerState.wallets = raw.wallets;
        if (raw.termlyDrills && typeof raw.termlyDrills === 'object') ledgerState.termlyDrills = raw.termlyDrills;
        if (raw.certificateDrills && typeof raw.certificateDrills === 'object') ledgerState.certificateDrills = raw.certificateDrills;
        if (raw.schoolSubscriptions && typeof raw.schoolSubscriptions === 'object') {
          ledgerState.schoolSubscriptions = raw.schoolSubscriptions;
        }
      }
    }
  } catch (err) {
    console.warn('[Ledger] Could not load authoritative ledger:', err);
  }

  try {
    if (fs.existsSync(AI_COACH_QUOTA_PATH)) {
      const rawQuota = JSON.parse(fs.readFileSync(AI_COACH_QUOTA_PATH, 'utf8'));
      if (rawQuota && typeof rawQuota === 'object') {
        for (const [k, v] of Object.entries(rawQuota)) {
          if (v && typeof v === 'object') {
            aiCoachQuotaStore[k] = v as AiCoachQuotaEntry;
          }
        }
      }
    }
  } catch (err) {
    console.warn('[Ledger] Could not load AI coach quota store:', err);
  }
}

export function saveAuthoritativeLedger(): void {
  try {
    fs.writeFileSync(AUTHORITATIVE_LEDGER_PATH, JSON.stringify(ledgerState), 'utf8');
  } catch (err) {
    console.warn('[Ledger] Could not save authoritative ledger:', err);
  }
}

export function saveAiCoachQuotaStore(): void {
  try {
    fs.writeFileSync(AI_COACH_QUOTA_PATH, JSON.stringify(aiCoachQuotaStore), 'utf8');
  } catch (err) {
    console.warn('[Ledger] Could not save AI coach quota store:', err);
  }
}

loadLedgerFromDisk();

export function calculateLedgerRankFromXP(xp: number): string {
  if (xp >= 2500) return 'Senior Prefect';
  if (xp >= 1500) return 'Senior Boy';
  if (xp >= 800) return 'Prefect';
  if (xp >= 300) return 'Scholar';
  return 'Fresher';
}

export function getLedgerState(): AuthoritativeLedgerState {
  return ledgerState;
}

export function getAiCoachQuotaStore(): Record<string, AiCoachQuotaEntry> {
  return aiCoachQuotaStore;
}

export function clearAiCoachQuotaStore(): void {
  for (const key of Object.keys(aiCoachQuotaStore)) {
    delete aiCoachQuotaStore[key];
  }
  saveAiCoachQuotaStore();
}

export function getOrInitStudentLedger(studentId: string): VerifiedStudentLedgerEntry {
  const cleanId = String(studentId || '').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 128);
  if (!ledgerState.students[cleanId]) {
    ledgerState.students[cleanId] = {
      studentId: cleanId,
      isSubscribed: false,
      subscriptionPlan: 'free',
      subscriptionTier: 'free',
      subscribedUntil: null,
      termExpiresAt: null,
      lastSubscribedAt: null,
      lastPaymentReference: null,
      addOns: {},
      examPrepState: {
        isUnlocked: false,
        unlockedSubjectExams: [],
        tutorCreditsNaira: 0,
      },
      xp: 0,
      rank: 'Fresher',
      streakDays: 1,
      updatedAt: new Date().toISOString(),
    };
  }
  return ledgerState.students[cleanId];
}

export function getOrInitWalletLedger(userId: string): VerifiedWalletLedgerEntry {
  const cleanId = String(userId || '').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 128);
  if (!ledgerState.wallets[cleanId]) {
    ledgerState.wallets[cleanId] = {
      userId: cleanId,
      balanceNaira: 0,
      totalFunded: 0,
      updatedAt: new Date().toISOString(),
      transactions: [],
    };
  }
  return ledgerState.wallets[cleanId];
}

export function creditWalletLedger(params: {
  userId: string;
  amountNaira: number;
  description: string;
  reference: string;
  purpose: string;
  channel?: string;
  type?: 'credit' | 'fund';
}): VerifiedWalletLedgerEntry {
  const wallet = getOrInitWalletLedger(params.userId);
  const amount = Math.max(0, Math.round(Number(params.amountNaira) || 0));
  if (amount <= 0) return wallet;

  // Idempotent by reference when non-empty
  if (params.reference && wallet.transactions.some(t => t.reference === params.reference && t.type !== 'debit')) {
    return wallet;
  }

  const nowIso = new Date().toISOString();
  wallet.balanceNaira = Math.max(0, wallet.balanceNaira + amount);
  wallet.totalFunded = Math.max(0, (wallet.totalFunded || 0) + amount);
  wallet.lastFundedAt = nowIso;
  wallet.lastPaymentReference = params.reference;
  wallet.updatedAt = nowIso;
  const newTx: VerifiedWalletTx = {
    id: `TX_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    type: params.type || 'credit',
    amountNaira: amount,
    description: params.description,
    timestamp: nowIso,
    status: 'successful',
    reference: params.reference,
    purpose: params.purpose,
    channel: params.channel,
  };
  wallet.transactions = [newTx, ...wallet.transactions].slice(0, 200);

  saveAuthoritativeLedger();
  return wallet;
}

export function debitWalletLedger(params: {
  userId: string;
  amountNaira: number;
  description: string;
  reference: string;
  purpose: string;
  bookingId?: string;
}): { ok: boolean; error?: string; wallet: VerifiedWalletLedgerEntry; transaction?: VerifiedWalletTx } {
  const wallet = getOrInitWalletLedger(params.userId);
  const amount = Math.max(0, Math.round(Number(params.amountNaira) || 0));
  if (amount <= 0) {
    return { ok: false, error: 'Positive debit amount is required.', wallet };
  }

  if (wallet.balanceNaira < amount) {
    return {
      ok: false,
      error: `Insufficient Parent Escrow Wallet balance (₦${wallet.balanceNaira.toLocaleString()} available, ₦${amount.toLocaleString()} required).`,
      wallet,
    };
  }

  const nowIso = new Date().toISOString();
  const tx: VerifiedWalletTx = {
    id: `TX_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    type: 'debit',
    amountNaira: amount,
    description: params.description,
    timestamp: nowIso,
    status: 'successful',
    reference: params.reference,
    purpose: params.purpose,
    ...(params.bookingId ? { bookingId: params.bookingId } : {}),
  };

  wallet.balanceNaira = Math.max(0, wallet.balanceNaira - amount);
  wallet.updatedAt = nowIso;
  wallet.transactions = [tx, ...wallet.transactions].slice(0, 200);
  saveAuthoritativeLedger();
  return { ok: true, wallet, transaction: tx };
}

export function refundEscrowInWalletLedger(params: {
  userId: string;
  bookingId: string;
  reason?: string;
}): { ok: boolean; error?: string; refundedAmount: number; wallet: VerifiedWalletLedgerEntry } {
  const wallet = getOrInitWalletLedger(params.userId);
  const cleanBookingId = String(params.bookingId || '').trim();
  if (!cleanBookingId) {
    return { ok: false, error: 'bookingId is required for escrow refund.', refundedAmount: 0, wallet };
  }

  const escrowRef = `ESCROW_${cleanBookingId}`;
  const refundRef = `REFUND_${cleanBookingId}`;
  if (wallet.transactions.some(t => t.reference === refundRef)) {
    return { ok: true, refundedAmount: 0, wallet };
  }

  const escrowTx = wallet.transactions.find(
    t => t.type === 'debit' && (t.bookingId === cleanBookingId || t.reference === escrowRef) && !t.refunded
  );
  if (!escrowTx) {
    return { ok: false, error: 'No active unrefunded escrow hold found for this booking.', refundedAmount: 0, wallet };
  }

  escrowTx.refunded = true;
  const nowIso = new Date().toISOString();
  wallet.balanceNaira += escrowTx.amountNaira;
  wallet.updatedAt = nowIso;
  const refundTx: VerifiedWalletTx = {
    id: `TX_REF_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    type: 'credit',
    amountNaira: escrowTx.amountNaira,
    description: `Escrow Refund: ${params.reason || cleanBookingId}`,
    timestamp: nowIso,
    status: 'successful',
    reference: refundRef,
    purpose: 'tutor_escrow_refund',
    bookingId: cleanBookingId,
  };
  wallet.transactions = [refundTx, ...wallet.transactions].slice(0, 200);

  saveAuthoritativeLedger();
  return { ok: true, refundedAmount: escrowTx.amountNaira, wallet };
}

export function resetUnverifiedSimulatedSubscriptionsInLedger(verifiedPaystackRefs: Set<string>): number {
  let resetCount = 0;
  for (const [id, entry] of Object.entries(ledgerState.students)) {
    const hasUnlock =
      entry.isSubscribed ||
      entry.subscriptionPlan !== 'free' ||
      entry.subscriptionTier !== 'free' ||
      entry.addOns?.aiCoachUnlocked ||
      entry.addOns?.termlyCompetitionUnlocked ||
      entry.addOns?.termlyDrillAllSubjects ||
      (entry.addOns?.termlyDrillSingleSubjects?.length || 0) > 0 ||
      entry.examPrepState?.isUnlocked ||
      (entry.examPrepState?.unlockedSubjectExams?.length || 0) > 0;

    if (!hasUnlock) continue;

    const ref = String(entry.lastPaymentReference || entry.examPrepState?.paymentReference || '').trim();
    const isVerifiedPaystackOrWallet =
      (ref && verifiedPaystackRefs.has(ref)) || ref.startsWith('WALLET_VERIFIED_');

    if (isVerifiedPaystackOrWallet) continue;

    ledgerState.students[id] = {
      ...entry,
      isSubscribed: false,
      subscriptionPlan: 'free',
      subscriptionTier: 'free',
      subscribedUntil: null,
      termExpiresAt: null,
      lastSubscribedAt: null,
      lastPaymentReference: null,
      addOns: {},
      examPrepState: {
        isUnlocked: false,
        unlockedSubjectExams: [],
        tutorCreditsNaira: 0,
      },
      updatedAt: new Date().toISOString(),
    };
    resetCount++;
  }
  if (resetCount > 0) saveAuthoritativeLedger();
  return resetCount;
}

// --- Firebase ID Token + Super Admin HMAC Session Verification (Zero Service-Account-Key) ---
const tokenLookupCache = new Map<string, { user: VerifiedAuthUser; expiresAt: number }>();

export async function verifyFirebaseBearerToken(
  req: Request,
  verifyAdminHmacToken?: (token: string) => { ok: boolean; email?: string }
): Promise<VerifiedAuthUser | null> {
  const authHeader = String(req.headers.authorization || '').trim();
  if (!authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7).trim();
  if (!token) return null;

  if (token.startsWith('scadmin.') && verifyAdminHmacToken) {
    const res = verifyAdminHmacToken(token);
    if (res.ok && res.email) {
      return {
        uid: 'usr-dev-martorefe',
        email: res.email,
        emailVerified: true,
        isSuperAdmin: true,
      };
    }
    return null;
  }

  const hashKey = crypto.createHash('sha256').update(token).digest('hex');
  const cached = tokenLookupCache.get(hashKey);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.user;
  }

  try {
    const verifyRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(firebaseConfig.apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: token }),
        signal: AbortSignal.timeout(5000),
      }
    );
    if (!verifyRes.ok) return null;
    const data: any = await verifyRes.json();
    const u = Array.isArray(data?.users) ? data.users[0] : null;
    if (!u || !u.localId) return null;

    const cleanEmail = String(u.email || '').toLowerCase().trim();
    const verifiedUser: VerifiedAuthUser = {
      uid: String(u.localId),
      email: cleanEmail,
      emailVerified: Boolean(u.emailVerified),
      isSuperAdmin: Boolean(u.emailVerified) && AUTHORIZED_SUPER_ADMINS.includes(cleanEmail),
    };

    if (tokenLookupCache.size > 500) {
      const oldestKey = tokenLookupCache.keys().next().value;
      if (oldestKey) tokenLookupCache.delete(oldestKey);
    }
    tokenLookupCache.set(hashKey, { user: verifiedUser, expiresAt: Date.now() + 5 * 60 * 1000 });
    return verifiedUser;
  } catch {
    return null;
  }
}
