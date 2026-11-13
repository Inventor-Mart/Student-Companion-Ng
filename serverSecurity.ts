import fs from 'fs';
import express, { Request, Response, NextFunction } from 'express';
import {
  Firestore,
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  query,
  limit as firestoreLimit
} from 'firebase/firestore/lite';

export const AUTHORIZED_SUPER_ADMINS = ['martorefe@gmail.com', 'wowrealities@gmail.com'];
const STORE_PATH = '/tmp/sc-security-store.json';

export type SecurityIncidentCategory =
  | 'fraud'
  | 'spam'
  | 'hacking'
  | 'brute_force'
  | 'unauthorized_probe'
  | 'payment_replay'
  | 'withdrawal_anomaly'
  | 'xp_anomaly'
  | 'phishing_link'
  | 'rate_limit'
  | 'tampered_payload'
  | 'abuse';

export type SecuritySeverity = 'low' | 'medium' | 'high' | 'critical';
export type SecurityIncidentStatus = 'open' | 'auto_blocked' | 'investigating' | 'resolved' | 'dismissed';
export type SecurityBlockType =
  | 'ip'
  | 'device_fingerprint'
  | 'account_lock'
  | 'account_suspend'
  | 'wallet_freeze'
  | 'account_delete';

export interface ServerSecurityIncident {
  id: string;
  category: SecurityIncidentCategory;
  severity: SecuritySeverity;
  status: SecurityIncidentStatus;
  source: 'server_guard' | 'client_guard' | 'user_report';
  title: string;
  description: string;
  actorUserId?: string;
  actorEmail?: string;
  actorRole?: string;
  ipAddress?: string;
  deviceFingerprint?: string;
  endpoint?: string;
  actionTaken?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  createdAt: string;
}

export interface ServerSecurityReport {
  id: string;
  reporterUserId: string;
  reporterEmail?: string;
  reporterName?: string;
  reporterRole?: string;
  category: 'fraud' | 'spam' | 'hacking' | 'abuse' | 'payment_anomaly';
  suspectIdentifier?: string;
  description: string;
  evidenceContext?: string;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  actionTaken?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  createdAt: string;
}

export interface ServerSecurityBlock {
  id: string;
  blockType: SecurityBlockType;
  targetValue: string;
  reason: string;
  active: boolean;
  createdBy: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface SecurityAutomationPolicy {
  autoLockOnSpam: boolean;
  spamBurstThreshold: number;
  spamLockDurationMinutes: number;
  autoLockOnBruteForce: boolean;
  bruteForceLockDurationMinutes: number;
  autoSuspendOnFraud: boolean;
  autoFreezeWalletOnFraud: boolean;
  autoEnforceOnReports: boolean;
  reportAutoLockThreshold: number;
  reportAutoSuspendThreshold: number;
  updatedAt: string;
  updatedBy: string;
}

export interface DeletedAccountTombstone {
  id: string;
  userId?: string;
  originalEmail?: string;
  scrubbedEmail: string;
  role?: string;
  reason: string;
  deletedBy: string;
  deletedAt: string;
}

export interface ProcessedRefRecord {
  reference: string;
  amountNaira: number;
  purpose: string;
  userId?: string;
  ipAddress?: string;
  processedAt: string;
}

interface SecurityStoreData {
  incidents: ServerSecurityIncident[];
  reports: ServerSecurityReport[];
  blocks: ServerSecurityBlock[];
  deletedAccounts: DeletedAccountTombstone[];
  automationPolicy: SecurityAutomationPolicy;
  processedPaystackRefs: Record<string, ProcessedRefRecord>;
}

export const DEFAULT_AUTOMATION_POLICY: SecurityAutomationPolicy = {
  autoLockOnSpam: true,
  spamBurstThreshold: 2,
  spamLockDurationMinutes: 30,
  autoLockOnBruteForce: true,
  bruteForceLockDurationMinutes: 15,
  autoSuspendOnFraud: true,
  autoFreezeWalletOnFraud: true,
  autoEnforceOnReports: true,
  reportAutoLockThreshold: 2,
  reportAutoSuspendThreshold: 3,
  updatedAt: new Date().toISOString(),
  updatedBy: 'system_default'
};

const memoryStore: SecurityStoreData = {
  incidents: [],
  reports: [],
  blocks: [],
  deletedAccounts: [],
  automationPolicy: { ...DEFAULT_AUTOMATION_POLICY },
  processedPaystackRefs: {}
};

// Sliding-window rate limit & enforcement buckets
const rateWindowMap = new Map<string, number[]>();
const rateBreachMap = new Map<string, number[]>();
const probeCountMap = new Map<string, number>();
const paymentVelocityMap = new Map<string, { ts: number; amount: number }[]>();
const withdrawalVelocityMap = new Map<string, number[]>();
const spamViolationMap = new Map<string, number[]>();
const reportVelocityMap = new Map<string, { ts: number; category: string; reportId: string }[]>();

function loadDiskStore(): void {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.incidents)) memoryStore.incidents = parsed.incidents;
      if (Array.isArray(parsed.reports)) memoryStore.reports = parsed.reports;
      if (Array.isArray(parsed.blocks)) memoryStore.blocks = parsed.blocks;
      if (Array.isArray(parsed.deletedAccounts)) memoryStore.deletedAccounts = parsed.deletedAccounts;
      if (parsed.automationPolicy && typeof parsed.automationPolicy === 'object') {
        memoryStore.automationPolicy = {
          ...DEFAULT_AUTOMATION_POLICY,
          ...parsed.automationPolicy
        };
      }
      if (parsed.processedPaystackRefs && typeof parsed.processedPaystackRefs === 'object') {
        memoryStore.processedPaystackRefs = parsed.processedPaystackRefs;
      }
    }
  } catch (err) {
    console.warn('[Security] Could not load disk store:', err);
  }
}

function saveDiskStore(): void {
  try {
    fs.writeFileSync(
      STORE_PATH,
      JSON.stringify({
        incidents: memoryStore.incidents.slice(0, 350),
        reports: memoryStore.reports.slice(0, 250),
        blocks: memoryStore.blocks.slice(0, 300),
        deletedAccounts: memoryStore.deletedAccounts.slice(0, 200),
        automationPolicy: memoryStore.automationPolicy,
        processedPaystackRefs: memoryStore.processedPaystackRefs
      }),
      'utf8'
    );
  } catch (err) {
    console.warn('[Security] Could not save disk store:', err);
  }
}

loadDiskStore();

function sanitizeFirestoreId(raw: string): string {
  return String(raw || 'id')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 120);
}

export function isAuthorizedSuperAdmin(email?: string): boolean {
  if (!email) return false;
  return AUTHORIZED_SUPER_ADMINS.includes(String(email).toLowerCase().trim());
}

export function extractClientIp(req: Request): string {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.trim()) {
    return xff.split(',')[0].trim();
  }
  if (Array.isArray(xff) && xff.length > 0) {
    return String(xff[0]).trim();
  }
  return req.ip || req.socket?.remoteAddress || 'unknown-ip';
}

export function extractDeviceFingerprint(req: Request): string {
  const fp = req.headers['x-device-fingerprint'] || req.body?.deviceFingerprint;
  return fp ? String(fp).slice(0, 140) : 'unknown-fp';
}

function isBlockExpired(block: ServerSecurityBlock): boolean {
  if (!block.expiresAt) return false;
  const exp = new Date(block.expiresAt).getTime();
  return Number.isFinite(exp) && exp <= Date.now();
}

export function findActiveBlock(params: {
  ip?: string;
  fingerprint?: string;
  userId?: string;
  email?: string;
  blockTypes?: SecurityBlockType[];
}): ServerSecurityBlock | null {
  const { ip, fingerprint, userId, email, blockTypes } = params;
  const targets = [ip, fingerprint, userId, email ? email.toLowerCase().trim() : undefined].filter(
    (v): v is string => Boolean(v && v !== 'unknown-ip' && v !== 'unknown-fp')
  );

  let expiredAny = false;
  const matchedBlocks: ServerSecurityBlock[] = [];

  for (const b of memoryStore.blocks) {
    if (!b.active) continue;
    if (isBlockExpired(b)) {
      b.active = false;
      b.updatedAt = new Date().toISOString();
      expiredAny = true;
      continue;
    }
    if (blockTypes && !blockTypes.includes(b.blockType)) continue;
    const normTarget = b.targetValue.toLowerCase().trim();
    if (targets.some(t => t.toLowerCase().trim() === normTarget)) {
      matchedBlocks.push(b);
    }
  }

  if (expiredAny) {
    saveDiskStore();
  }

  if (matchedBlocks.length === 0) return null;

  // Enforce deterministic severity precedence when multiple block types exist
  const priorityOrder: SecurityBlockType[] = [
    'account_delete',
    'account_suspend',
    'account_lock',
    'wallet_freeze',
    'ip',
    'device_fingerprint'
  ];
  matchedBlocks.sort(
    (a, b) => priorityOrder.indexOf(a.blockType) - priorityOrder.indexOf(b.blockType)
  );
  return matchedBlocks[0];
}

export class SecurityService {
  private db: Firestore;
  private hydratedFromFirestore = false;
  private firestoreSecurityRulesAvailable = true;

  constructor(db: Firestore) {
    this.db = db;
    void this.hydrateFromFirestore();
  }

  private markIfPermissionError(err: unknown) {
    const msg = String((err as any)?.code || (err as any)?.message || err || '').toLowerCase();
    if (msg.includes('permission') || msg.includes('insufficient')) {
      this.firestoreSecurityRulesAvailable = false;
    }
  }

  getAutomationPolicy(): SecurityAutomationPolicy {
    return memoryStore.automationPolicy;
  }

  async hydrateFromFirestore(): Promise<void> {
    if (this.hydratedFromFirestore || !this.firestoreSecurityRulesAvailable) return;
    this.hydratedFromFirestore = true;
    try {
      // Probe security_incidents first to avoid parallel failed queries when rules aren't deployed yet
      const incSnap = await getDocs(query(collection(this.db, 'security_incidents'), firestoreLimit(150)));
      const [repSnap, blkSnap, polSnap] = await Promise.all([
        getDocs(query(collection(this.db, 'security_reports'), firestoreLimit(100))),
        getDocs(query(collection(this.db, 'security_blocks'), firestoreLimit(150))),
        getDoc(doc(this.db, 'security_policies', 'default')).catch(() => null)
      ]);

      const mergeById = <T extends { id: string }>(existing: T[], incoming: T[]): T[] => {
        const map = new Map<string, T>();
        for (const item of incoming) map.set(item.id, item);
        for (const item of existing) if (!map.has(item.id)) map.set(item.id, item);
        return Array.from(map.values());
      };

      const fsInc = incSnap.docs.map(d => d.data() as ServerSecurityIncident);
      const fsRep = repSnap.docs.map(d => d.data() as ServerSecurityReport);
      const fsBlk = blkSnap.docs.map(d => d.data() as ServerSecurityBlock);

      memoryStore.incidents = mergeById(memoryStore.incidents, fsInc).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      memoryStore.reports = mergeById(memoryStore.reports, fsRep).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      memoryStore.blocks = mergeById(memoryStore.blocks, fsBlk).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      if (polSnap && polSnap.exists()) {
        memoryStore.automationPolicy = {
          ...DEFAULT_AUTOMATION_POLICY,
          ...(polSnap.data() as Partial<SecurityAutomationPolicy>)
        };
      }

      saveDiskStore();
    } catch (err) {
      // Non-fatal if Firestore security rules aren't deployed yet; disk/memory store continues working
      this.markIfPermissionError(err);
    }
  }

  async updateAutomationPolicy(
    partial: Partial<SecurityAutomationPolicy>,
    adminEmail: string
  ): Promise<SecurityAutomationPolicy> {
    const clamp = (val: unknown, fallback: number, min: number, max: number): number => {
      const n = Number(val);
      if (!Number.isFinite(n)) return fallback;
      return Math.min(max, Math.max(min, Math.round(n)));
    };

    const current = memoryStore.automationPolicy;
    const updated: SecurityAutomationPolicy = {
      autoLockOnSpam:
        partial.autoLockOnSpam !== undefined ? Boolean(partial.autoLockOnSpam) : current.autoLockOnSpam,
      spamBurstThreshold: clamp(partial.spamBurstThreshold, current.spamBurstThreshold, 1, 10),
      spamLockDurationMinutes: clamp(partial.spamLockDurationMinutes, current.spamLockDurationMinutes, 5, 10080),
      autoLockOnBruteForce:
        partial.autoLockOnBruteForce !== undefined
          ? Boolean(partial.autoLockOnBruteForce)
          : current.autoLockOnBruteForce,
      bruteForceLockDurationMinutes: clamp(
        partial.bruteForceLockDurationMinutes,
        current.bruteForceLockDurationMinutes,
        5,
        1440
      ),
      autoSuspendOnFraud:
        partial.autoSuspendOnFraud !== undefined ? Boolean(partial.autoSuspendOnFraud) : current.autoSuspendOnFraud,
      autoFreezeWalletOnFraud:
        partial.autoFreezeWalletOnFraud !== undefined
          ? Boolean(partial.autoFreezeWalletOnFraud)
          : current.autoFreezeWalletOnFraud,
      autoEnforceOnReports:
        partial.autoEnforceOnReports !== undefined ? Boolean(partial.autoEnforceOnReports) : current.autoEnforceOnReports,
      reportAutoLockThreshold: clamp(partial.reportAutoLockThreshold, current.reportAutoLockThreshold, 2, 10),
      reportAutoSuspendThreshold: clamp(
        partial.reportAutoSuspendThreshold,
        current.reportAutoSuspendThreshold,
        2,
        15
      ),
      updatedAt: new Date().toISOString(),
      updatedBy: adminEmail
    };

    memoryStore.automationPolicy = updated;
    saveDiskStore();

    if (this.firestoreSecurityRulesAvailable) {
      try {
        await setDoc(doc(this.db, 'security_policies', 'default'), updated, { merge: true });
      } catch (err) {
        this.markIfPermissionError(err);
      }
    }

    return updated;
  }

  async recordIncident(input: Omit<ServerSecurityIncident, 'id' | 'createdAt'>): Promise<ServerSecurityIncident> {
    const id = `INC_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const incident: ServerSecurityIncident = {
      id,
      ...input,
      title: String(input.title || 'Security Event').slice(0, 195),
      description: String(input.description || '').slice(0, 1950),
      createdAt: new Date().toISOString()
    };

    memoryStore.incidents.unshift(incident);
    if (memoryStore.incidents.length > 350) memoryStore.incidents.length = 350;
    saveDiskStore();

    if (this.firestoreSecurityRulesAvailable) {
      try {
        await setDoc(doc(this.db, 'security_incidents', id), incident);
      } catch (err) {
        this.markIfPermissionError(err);
      }
    }

    return incident;
  }

  async createOrActivateBlock(params: {
    blockType: SecurityBlockType;
    targetValue: string;
    reason: string;
    createdBy: string;
    durationMinutes?: number;
  }): Promise<ServerSecurityBlock> {
    const rawTarget = String(params.targetValue).trim();
    const normTarget = rawTarget.includes('@') ? rawTarget.toLowerCase() : rawTarget;
    const id = sanitizeFirestoreId(`BLK_${params.blockType}_${normTarget}`);
    const nowIso = new Date().toISOString();
    const expiresAt = params.durationMinutes
      ? new Date(Date.now() + params.durationMinutes * 60 * 1000).toISOString()
      : undefined;

    const block: ServerSecurityBlock = {
      id,
      blockType: params.blockType,
      targetValue: normTarget,
      reason: String(params.reason).slice(0, 480),
      active: true,
      createdBy: params.createdBy,
      ...(expiresAt ? { expiresAt } : {}),
      createdAt: nowIso,
      updatedAt: nowIso
    };

    const existingIdx = memoryStore.blocks.findIndex(b => b.id === id);
    if (existingIdx >= 0) {
      memoryStore.blocks[existingIdx] = block;
    } else {
      memoryStore.blocks.unshift(block);
    }
    saveDiskStore();

    if (this.firestoreSecurityRulesAvailable) {
      try {
        await setDoc(doc(this.db, 'security_blocks', id), block);
      } catch (err) {
        this.markIfPermissionError(err);
      }
    }

    // Mirror account status / wallet freeze onto users doc when possible
    if (
      this.firestoreSecurityRulesAvailable &&
      (params.blockType === 'account_suspend' ||
        params.blockType === 'account_lock' ||
        params.blockType === 'wallet_freeze')
    ) {
      try {
        let userUpdates: Record<string, any> = {};
        if (params.blockType === 'account_suspend') {
          userUpdates = { accountStatus: 'suspended', suspensionReason: block.reason, suspendedAt: nowIso };
        } else if (params.blockType === 'account_lock') {
          userUpdates = {
            accountStatus: 'locked',
            lockReason: block.reason,
            lockedUntil: expiresAt || null
          };
        } else {
          userUpdates = { walletFrozen: true, walletFrozenReason: block.reason };
        }
        await setDoc(doc(this.db, 'users', sanitizeFirestoreId(normTarget)), userUpdates, { merge: true });
      } catch (err) {
        this.markIfPermissionError(err);
      }
    }

    return block;
  }

  async deactivateBlock(params: {
    blockId?: string;
    blockType?: SecurityBlockType;
    targetValue?: string;
    adminEmail: string;
  }): Promise<ServerSecurityBlock | null> {
    const nowIso = new Date().toISOString();
    const normTarget = params.targetValue ? params.targetValue.toLowerCase().trim() : '';

    let matched: ServerSecurityBlock | undefined;
    for (const b of memoryStore.blocks) {
      if (params.blockId && b.id === params.blockId) {
        matched = b;
        break;
      }
      if (
        normTarget &&
        b.targetValue.toLowerCase().trim() === normTarget &&
        b.active &&
        (params.blockType ? b.blockType === params.blockType : b.blockType !== 'account_delete')
      ) {
        matched = b;
        break;
      }
    }

    if (!matched && params.blockType && params.targetValue) {
      matched = {
        id: sanitizeFirestoreId(`BLK_${params.blockType}_${params.targetValue}`),
        blockType: params.blockType,
        targetValue: params.targetValue,
        reason: `Cleared by ${params.adminEmail}`,
        active: false,
        createdBy: params.adminEmail,
        createdAt: nowIso,
        updatedAt: nowIso
      };
      memoryStore.blocks.unshift(matched);
    } else if (matched) {
      matched.active = false;
      matched.updatedAt = nowIso;
    }

    if (!matched) return null;

    saveDiskStore();
    if (this.firestoreSecurityRulesAvailable) {
      try {
        await setDoc(doc(this.db, 'security_blocks', matched.id), matched, { merge: true });
      } catch (err) {
        this.markIfPermissionError(err);
      }
    }

    if (
      this.firestoreSecurityRulesAvailable &&
      (matched.blockType === 'account_suspend' ||
        matched.blockType === 'account_lock' ||
        matched.blockType === 'wallet_freeze')
    ) {
      try {
        const userUpdates =
          matched.blockType === 'account_suspend'
            ? { accountStatus: 'active', suspensionReason: '' }
            : matched.blockType === 'account_lock'
            ? { accountStatus: 'active', lockReason: '', lockedUntil: '' }
            : { walletFrozen: false, walletFrozenReason: '' };
        await setDoc(doc(this.db, 'users', sanitizeFirestoreId(matched.targetValue)), userUpdates, { merge: true });
      } catch (err) {
        this.markIfPermissionError(err);
      }
    }

    return matched;
  }

  /**
   * Timed Auto-Lock for spam bursts, phishing links, or brute-force attempts
   */
  async enforceAutomatedSpamLock(params: {
    userId?: string;
    email?: string;
    ip?: string;
    fp?: string;
    reason: string;
    durationMinutes?: number;
    immediate?: boolean;
  }): Promise<{ enforced: boolean; lockedUntil?: string; actionTaken: string }> {
    const policy = memoryStore.automationPolicy;
    if (isAuthorizedSuperAdmin(params.email)) {
      return { enforced: false, actionTaken: 'Exempt (Super Admin)' };
    }

    const targets = Array.from(
      new Set(
        [params.userId, params.email?.toLowerCase().trim()].filter(
          (v): v is string => Boolean(v && v !== 'anonymous')
        )
      )
    );
    const trackingKey = targets[0] || params.ip || 'anon';
    const now = Date.now();
    const list = (spamViolationMap.get(trackingKey) || []).filter(ts => now - ts < 10 * 60 * 1000);
    list.push(now);
    spamViolationMap.set(trackingKey, list);

    if (!policy.autoLockOnSpam) {
      return { enforced: false, actionTaken: 'Logged (Auto-Lock on Spam Disabled)' };
    }

    const thresholdMet = Boolean(params.immediate) || list.length >= policy.spamBurstThreshold;
    if (!thresholdMet) {
      return {
        enforced: false,
        actionTaken: `Warning #${list.length}/${policy.spamBurstThreshold} Logged`
      };
    }

    const duration = params.durationMinutes || policy.spamLockDurationMinutes;
    let lockedUntil: string | undefined;

    for (const target of targets) {
      const blk = await this.createOrActivateBlock({
        blockType: 'account_lock',
        targetValue: target,
        reason: params.reason,
        createdBy: 'auto_shield',
        durationMinutes: duration
      });
      lockedUntil = blk.expiresAt;
    }

    if (targets.length === 0 && params.ip && params.ip !== 'unknown-ip') {
      const blk = await this.createOrActivateBlock({
        blockType: 'ip',
        targetValue: params.ip,
        reason: params.reason,
        createdBy: 'auto_shield',
        durationMinutes: duration
      });
      lockedUntil = blk.expiresAt;
    }

    return {
      enforced: true,
      lockedUntil,
      actionTaken: `Auto-Locked Account (${duration}m)`
    };
  }

  /**
   * Indefinite Auto-Suspend + Wallet Freeze for fraud, Paystack replay, withdrawal anomaly, or hacking
   */
  async enforceAutomatedFraudContainment(params: {
    userId?: string;
    email?: string;
    ip?: string;
    fp?: string;
    reason: string;
    blockNetworkMinutes?: number;
  }): Promise<{ suspended: boolean; walletFrozen: boolean; actionTaken: string }> {
    const policy = memoryStore.automationPolicy;
    if (isAuthorizedSuperAdmin(params.email)) {
      return { suspended: false, walletFrozen: false, actionTaken: 'Exempt (Super Admin)' };
    }

    const targets = Array.from(
      new Set(
        [params.userId, params.email?.toLowerCase().trim()].filter(
          (v): v is string => Boolean(v && v !== 'anonymous')
        )
      )
    );

    const actions: string[] = [];

    if (policy.autoSuspendOnFraud && targets.length > 0) {
      for (const target of targets) {
        await this.createOrActivateBlock({
          blockType: 'account_suspend',
          targetValue: target,
          reason: params.reason,
          createdBy: 'auto_shield'
        });
      }
      actions.push('Auto-Suspended Account');
    }

    if (policy.autoFreezeWalletOnFraud && targets.length > 0) {
      for (const target of targets) {
        await this.createOrActivateBlock({
          blockType: 'wallet_freeze',
          targetValue: target,
          reason: params.reason,
          createdBy: 'auto_shield'
        });
      }
      actions.push('Wallet Frozen');
    }

    if (params.blockNetworkMinutes && params.ip && params.ip !== 'unknown-ip') {
      await this.createOrActivateBlock({
        blockType: 'ip',
        targetValue: params.ip,
        reason: params.reason,
        createdBy: 'auto_shield',
        durationMinutes: params.blockNetworkMinutes
      });
      if (params.fp && params.fp !== 'unknown-fp') {
        await this.createOrActivateBlock({
          blockType: 'device_fingerprint',
          targetValue: params.fp,
          reason: params.reason,
          createdBy: 'auto_shield',
          durationMinutes: params.blockNetworkMinutes
        });
      }
      actions.push(`IP/Device Blocked (${params.blockNetworkMinutes}m)`);
    }

    return {
      suspended: actions.includes('Auto-Suspended Account'),
      walletFrozen: actions.includes('Wallet Frozen'),
      actionTaken: actions.length > 0 ? actions.join(' + ') : 'Flagged for Super Admin Review'
    };
  }

  /**
   * Soft-delete and scrub PII while preserving audit logs & enforcing login/access tombstone
   */
  async softDeleteAccount(params: {
    targetValue: string;
    userId?: string;
    email?: string;
    role?: string;
    reason: string;
    adminEmail: string;
  }): Promise<{ tombstone: DeletedAccountTombstone; blocks: ServerSecurityBlock[] }> {
    const cleanTarget = String(params.targetValue).trim();
    const candidates = Array.from(
      new Set(
        [cleanTarget, params.userId, params.email?.toLowerCase().trim()].filter(
          (v): v is string => Boolean(v && v.length > 0)
        )
      )
    );

    if (candidates.some(c => isAuthorizedSuperAdmin(c))) {
      throw new Error('Verified Super Admin accounts cannot be deleted.');
    }

    const nowIso = new Date().toISOString();
    const scrubbedId = sanitizeFirestoreId(params.userId || cleanTarget || `del_${Date.now()}`);
    const scrubbedEmail = `deleted_${scrubbedId.slice(0, 16)}@scrubbed.local`;
    const reasonText = String(params.reason || 'Account permanently closed by Super Admin for policy/security violation').slice(0, 480);

    // Deactivate any prior temporary locks/suspends so active enforcement cleanly reflects account_delete
    for (const target of candidates) {
      await this.deactivateBlock({ blockType: 'account_lock', targetValue: target, adminEmail: params.adminEmail });
      await this.deactivateBlock({ blockType: 'account_suspend', targetValue: target, adminEmail: params.adminEmail });
    }

    const createdBlocks: ServerSecurityBlock[] = [];
    for (const target of candidates) {
      const blk = await this.createOrActivateBlock({
        blockType: 'account_delete',
        targetValue: target,
        reason: reasonText,
        createdBy: params.adminEmail
      });
      createdBlocks.push(blk);
    }

    const tombstone: DeletedAccountTombstone = {
      id: `DEL_${Date.now()}_${scrubbedId.slice(0, 16)}`,
      userId: params.userId || (!cleanTarget.includes('@') ? cleanTarget : undefined),
      originalEmail: params.email || (cleanTarget.includes('@') ? cleanTarget.toLowerCase() : undefined),
      scrubbedEmail,
      role: params.role,
      reason: reasonText,
      deletedBy: params.adminEmail,
      deletedAt: nowIso
    };

    memoryStore.deletedAccounts = [
      tombstone,
      ...memoryStore.deletedAccounts.filter(
        d => d.userId !== tombstone.userId && d.originalEmail !== tombstone.originalEmail
      )
    ].slice(0, 200);
    saveDiskStore();

    if (this.firestoreSecurityRulesAvailable && tombstone.userId) {
      try {
        await setDoc(
          doc(this.db, 'users', sanitizeFirestoreId(tombstone.userId)),
          {
            fullName: 'Deleted Account',
            email: scrubbedEmail,
            accountStatus: 'deleted',
            deletedAt: nowIso,
            deletedBy: params.adminEmail,
            deletionReason: reasonText,
            walletFrozen: true,
            walletFrozenReason: 'Account permanently closed',
            studentData: null,
            parentData: null,
            tutorData: null,
            adminData: null,
            growthPartnerData: null
          },
          { merge: true }
        );
      } catch (err) {
        this.markIfPermissionError(err);
      }
    }

    await this.recordIncident({
      category: 'abuse',
      severity: 'high',
      status: 'resolved',
      source: 'server_guard',
      title: `Account Soft-Deleted & PII Scrubbed (${params.userId || cleanTarget})`,
      description: `Super Admin ${params.adminEmail} soft-deleted account "${cleanTarget}" (${reasonText}). Profile scrubbed to "Deleted Account" while security audit logs were retained.`,
      actorUserId: tombstone.userId,
      actorEmail: tombstone.originalEmail,
      actorRole: params.role,
      endpoint: '/api/security/action',
      actionTaken: 'Account Soft-Deleted & Scrubbed',
      resolvedBy: params.adminEmail,
      resolvedAt: nowIso
    });

    return { tombstone, blocks: createdBlocks };
  }

  async logUnauthorizedProbe(req: Request, endpoint: string, attemptedEmail?: string): Promise<void> {
    const ip = extractClientIp(req);
    const fp = extractDeviceFingerprint(req);
    const probeKey = `${ip}:${fp}`;
    const count = (probeCountMap.get(probeKey) || 0) + 1;
    probeCountMap.set(probeKey, count);

    const autoBlocked = count >= 3;
    let actionTaken = autoBlocked ? 'IP & Fingerprint Auto-Blocked (60m)' : '403 Rejected & Logged';

    if (autoBlocked) {
      await this.createOrActivateBlock({
        blockType: 'ip',
        targetValue: ip,
        reason: `Automatic 60m block after ${count} unauthorized admin probes`,
        createdBy: 'auto_shield',
        durationMinutes: 60
      });
      if (fp !== 'unknown-fp') {
        await this.createOrActivateBlock({
          blockType: 'device_fingerprint',
          targetValue: fp,
          reason: `Automatic 60m block after ${count} unauthorized admin probes`,
          createdBy: 'auto_shield',
          durationMinutes: 60
        });
      }
      if (attemptedEmail && !isAuthorizedSuperAdmin(attemptedEmail)) {
        const res = await this.enforceAutomatedFraudContainment({
          email: attemptedEmail,
          reason: `Unauthorized Super Admin probe attempts on ${endpoint}`
        });
        actionTaken = `${actionTaken} · ${res.actionTaken}`;
      }
    }

    await this.recordIncident({
      category: 'unauthorized_probe',
      severity: autoBlocked ? 'critical' : 'high',
      status: autoBlocked ? 'auto_blocked' : 'open',
      source: 'server_guard',
      title: `Unauthorized Super Admin Probe on ${endpoint}`,
      description: `Non-admin caller (${attemptedEmail || 'anonymous'}) probed restricted endpoint ${endpoint} (probe #${count}).`,
      actorEmail: attemptedEmail || undefined,
      ipAddress: ip,
      deviceFingerprint: fp,
      endpoint,
      actionTaken
    });
  }

  async isPaystackRefProcessed(reference: string): Promise<boolean> {
    const safeId = sanitizeFirestoreId(reference);
    if (memoryStore.processedPaystackRefs[safeId]) {
      return true;
    }
    if (this.firestoreSecurityRulesAvailable) {
      try {
        const snap = await getDoc(doc(this.db, 'processed_paystack_refs', safeId));
        if (snap.exists()) {
          memoryStore.processedPaystackRefs[safeId] = snap.data() as ProcessedRefRecord;
          saveDiskStore();
          return true;
        }
      } catch (err) {
        this.markIfPermissionError(err);
      }
    }
    return false;
  }

  async markPaystackRefProcessed(record: ProcessedRefRecord): Promise<void> {
    const safeId = sanitizeFirestoreId(record.reference);
    memoryStore.processedPaystackRefs[safeId] = record;
    saveDiskStore();
    if (this.firestoreSecurityRulesAvailable) {
      try {
        await setDoc(doc(this.db, 'processed_paystack_refs', safeId), record);
      } catch (err) {
        this.markIfPermissionError(err);
      }
    }
  }

  async checkPaymentVelocity(req: Request, userId: string, email: string | undefined, amountNaira: number): Promise<void> {
    const key = userId || email || extractClientIp(req);
    const now = Date.now();
    const list = (paymentVelocityMap.get(key) || []).filter(item => now - item.ts < 5 * 60 * 1000);
    list.push({ ts: now, amount: amountNaira });
    paymentVelocityMap.set(key, list);

    if (list.length >= 5) {
      const containment = await this.enforceAutomatedFraudContainment({
        userId: userId || undefined,
        email,
        ip: extractClientIp(req),
        fp: extractDeviceFingerprint(req),
        reason: `High-frequency payment burst (${list.length} verifications in 5m)`
      });
      await this.recordIncident({
        category: 'fraud',
        severity: 'critical',
        status: containment.suspended || containment.walletFrozen ? 'auto_blocked' : 'open',
        source: 'server_guard',
        title: 'High-Frequency Payment Burst Detected',
        description: `${list.length} payment verifications within 5 minutes for ${email || userId} (latest ₦${amountNaira.toLocaleString()}).`,
        actorUserId: userId || undefined,
        actorEmail: email,
        ipAddress: extractClientIp(req),
        deviceFingerprint: extractDeviceFingerprint(req),
        endpoint: '/api/paystack/verify-payment',
        actionTaken: containment.actionTaken
      });
    }
  }

  async checkWithdrawalVelocity(req: Request, partnerId: string, amountNaira: number): Promise<boolean> {
    const now = Date.now();
    const list = (withdrawalVelocityMap.get(partnerId) || []).filter(ts => now - ts < 10 * 60 * 1000);
    list.push(now);
    withdrawalVelocityMap.set(partnerId, list);

    if (list.length >= 4) {
      const containment = await this.enforceAutomatedFraudContainment({
        userId: partnerId,
        ip: extractClientIp(req),
        fp: extractDeviceFingerprint(req),
        reason: `Suspicious withdrawal velocity (${list.length} requests in 10 minutes)`
      });

      await this.recordIncident({
        category: 'withdrawal_anomaly',
        severity: 'critical',
        status: 'auto_blocked',
        source: 'server_guard',
        title: 'Suspicious Partner Withdrawal Velocity Blocked',
        description: `Partner ${partnerId} attempted ${list.length} withdrawals within 10 minutes (latest ₦${amountNaira.toLocaleString()}).`,
        actorUserId: partnerId,
        ipAddress: extractClientIp(req),
        deviceFingerprint: extractDeviceFingerprint(req),
        endpoint: '/api/partners/withdraw',
        actionTaken: `Payout Throttled · ${containment.actionTaken}`
      });
      return false;
    }
    return true;
  }

  middleware() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const path = req.path;

      // Never block health checks or security status self-check
      if (path === '/health' || path === '/security/status') {
        return next();
      }

      const ip = extractClientIp(req);
      const fp = extractDeviceFingerprint(req);
      const headerUserId = req.headers['x-user-id'] ? String(req.headers['x-user-id']) : undefined;
      const headerEmail = req.headers['x-user-email'] ? String(req.headers['x-user-email']) : undefined;

      // Never lock out verified Super Admins
      const reqAdminEmail = String(req.query?.adminEmail || req.body?.adminEmail || headerEmail || '')
        .toLowerCase()
        .trim();
      if (isAuthorizedSuperAdmin(reqAdminEmail) && (path.startsWith('/security/') || path.startsWith('/git/'))) {
        return next();
      }

      // 1. Check active Account Delete / Suspend / Timed Lock / IP / Device blocks
      const activeBlock = findActiveBlock({
        ip,
        fingerprint: fp,
        userId: headerUserId,
        email: headerEmail,
        blockTypes: ['account_delete', 'account_suspend', 'account_lock', 'ip', 'device_fingerprint']
      });

      if (activeBlock) {
        return res.status(403).json({
          success: false,
          blocked: true,
          blockType: activeBlock.blockType,
          accountStatus:
            activeBlock.blockType === 'account_delete'
              ? 'deleted'
              : activeBlock.blockType === 'account_suspend'
              ? 'suspended'
              : activeBlock.blockType === 'account_lock'
              ? 'locked'
              : undefined,
          lockedUntil: activeBlock.expiresAt,
          error: `Access blocked by Student Companion Security Shield: ${activeBlock.reason}`
        });
      }

      // 2. Sliding-window IP + Device Fingerprint rate limiting
      let bucket = 'general';
      let maxReq = 60;
      const windowMs = 60 * 1000;

      if (path.startsWith('/paystack/verify-payment') || path.startsWith('/partners/withdraw')) {
        bucket = 'finance';
        maxReq = 12;
      } else if (path.startsWith('/gemini/') || path.startsWith('/send-verification-code')) {
        bucket = 'compute';
        maxReq = 30;
      } else if (path.startsWith('/security/report') || path.startsWith('/security/incident')) {
        bucket = 'report';
        maxReq = 25;
      }

      const rateKey = `${bucket}:${ip}:${fp}`;
      const now = Date.now();
      const timestamps = (rateWindowMap.get(rateKey) || []).filter(ts => now - ts < windowMs);
      timestamps.push(now);
      rateWindowMap.set(rateKey, timestamps);

      if (timestamps.length > maxReq) {
        const breachKey = `${ip}:${fp}`;
        const breaches = (rateBreachMap.get(breachKey) || []).filter(ts => now - ts < 5 * 60 * 1000);
        breaches.push(now);
        rateBreachMap.set(breachKey, breaches);

        const autoBlocked = breaches.length >= 3;
        let actionTaken = autoBlocked ? 'Auto-Blocked IP & Device (30m)' : '429 Rate Throttled';

        if (autoBlocked) {
          void this.createOrActivateBlock({
            blockType: 'ip',
            targetValue: ip,
            reason: `Repeated API rate-limit abuse on ${path}`,
            createdBy: 'auto_shield',
            durationMinutes: 30
          });
          if (headerUserId || headerEmail) {
            void this.enforceAutomatedSpamLock({
              userId: headerUserId,
              email: headerEmail,
              ip,
              fp,
              reason: `Automated timed lock for repeated API rate-limit breaches (${path})`,
              immediate: true
            });
            actionTaken = 'Auto-Blocked IP + Timed Account Lock';
          }
        }

        void this.recordIncident({
          category: 'rate_limit',
          severity: autoBlocked ? 'critical' : 'high',
          status: autoBlocked ? 'auto_blocked' : 'open',
          source: 'server_guard',
          title: `API Velocity Limit Exceeded (${bucket})`,
          description: `Caller (${ip} · ${fp}) sent ${timestamps.length} requests in 60s to ${path} (limit ${maxReq}/min).`,
          actorUserId: headerUserId,
          actorEmail: headerEmail,
          ipAddress: ip,
          deviceFingerprint: fp,
          endpoint: `/api${path}`,
          actionTaken
        });

        return res.status(429).json({
          success: false,
          error: 'Too many requests detected from your connection. Please wait 60 seconds and try again.'
        });
      }

      return next();
    };
  }

  registerRoutes(app: express.Express): void {
    // A. User Security Report Submission (Available to ALL Personas, with Automated Multi-Report Enforcement)
    app.post('/api/security/report', async (req, res) => {
      try {
        const {
          reporterUserId,
          reporterEmail,
          reporterName,
          reporterRole,
          category,
          suspectIdentifier,
          description,
          evidenceContext
        } = req.body || {};

        if (!description || String(description).trim().length < 5) {
          return res.status(400).json({
            success: false,
            error: 'Please provide at least 5 characters describing the fraud, spam, or security issue.'
          });
        }

        const validCategories = ['fraud', 'spam', 'hacking', 'abuse', 'payment_anomaly'];
        const cleanCategory = validCategories.includes(category) ? category : 'fraud';
        const id = `REP_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const ip = extractClientIp(req);
        const fp = extractDeviceFingerprint(req);
        const cleanSuspect = suspectIdentifier ? String(suspectIdentifier).trim().slice(0, 195) : undefined;

        const report: ServerSecurityReport = {
          id,
          reporterUserId: String(reporterUserId || 'anonymous').slice(0, 120),
          reporterEmail: reporterEmail ? String(reporterEmail).slice(0, 145) : undefined,
          reporterName: reporterName ? String(reporterName).slice(0, 115) : 'Platform User',
          reporterRole: reporterRole ? String(reporterRole).slice(0, 45) : 'student',
          category: cleanCategory,
          suspectIdentifier: cleanSuspect,
          description: String(description).trim().slice(0, 1950),
          evidenceContext: evidenceContext ? String(evidenceContext).slice(0, 490) : undefined,
          status: 'pending',
          createdAt: new Date().toISOString()
        };

        // Automated Multi-Report Velocity Evaluation
        const policy = memoryStore.automationPolicy;
        let autoActionTaken: string | undefined;
        let incidentStatus: SecurityIncidentStatus = 'open';
        let incidentSeverity: SecuritySeverity =
          cleanCategory === 'hacking' || cleanCategory === 'fraud' ? 'high' : 'medium';

        if (cleanSuspect && policy.autoEnforceOnReports && !isAuthorizedSuperAdmin(cleanSuspect)) {
          const normSuspect = cleanSuspect.toLowerCase();
          const now = Date.now();
          const history = (reportVelocityMap.get(normSuspect) || []).filter(
            item => now - item.ts < 24 * 60 * 60 * 1000
          );
          history.push({ ts: now, category: cleanCategory, reportId: id });
          reportVelocityMap.set(normSuspect, history);

          const isFraudOrHacking =
            cleanCategory === 'fraud' || cleanCategory === 'hacking' || cleanCategory === 'payment_anomaly';
          const fraudCount = history.filter(
            h => h.category === 'fraud' || h.category === 'hacking' || h.category === 'payment_anomaly'
          ).length;

          if (
            history.length >= policy.reportAutoSuspendThreshold ||
            (isFraudOrHacking && fraudCount >= Math.max(2, policy.reportAutoLockThreshold))
          ) {
            const containment = await this.enforceAutomatedFraudContainment({
              userId: !cleanSuspect.includes('@') ? cleanSuspect : undefined,
              email: cleanSuspect.includes('@') ? cleanSuspect : undefined,
              reason: `Automated escalation after ${history.length} user security reports (${cleanCategory})`
            });
            autoActionTaken = containment.actionTaken;
            report.actionTaken = containment.actionTaken;
            incidentStatus = 'auto_blocked';
            incidentSeverity = 'critical';
          } else if (history.length >= policy.reportAutoLockThreshold) {
            const lockRes = await this.enforceAutomatedSpamLock({
              userId: !cleanSuspect.includes('@') ? cleanSuspect : undefined,
              email: cleanSuspect.includes('@') ? cleanSuspect : undefined,
              reason: `Automated timed lock after ${history.length} user reports (${cleanCategory})`,
              immediate: true
            });
            autoActionTaken = lockRes.actionTaken;
            report.actionTaken = lockRes.actionTaken;
            incidentStatus = 'auto_blocked';
            incidentSeverity = 'high';
          }
        }

        memoryStore.reports.unshift(report);
        if (memoryStore.reports.length > 250) memoryStore.reports.length = 250;
        saveDiskStore();

        if (this.firestoreSecurityRulesAvailable) {
          try {
            await setDoc(doc(this.db, 'security_reports', id), report);
          } catch (err) {
            this.markIfPermissionError(err);
          }
        }

        // Mirror into Security Incident Queue so Super Admin sees user reports in real time
        const mappedCategory: SecurityIncidentCategory =
          cleanCategory === 'payment_anomaly' ? 'fraud' : (cleanCategory as SecurityIncidentCategory);
        await this.recordIncident({
          category: mappedCategory,
          severity: incidentSeverity,
          status: incidentStatus,
          source: 'user_report',
          title: `User Report: ${cleanCategory.replace('_', ' ').toUpperCase()}${cleanSuspect ? ` (${cleanSuspect})` : ''}`,
          description: `${report.description}${cleanSuspect ? ` [Suspect: ${cleanSuspect}]` : ''}`,
          actorUserId: cleanSuspect && !cleanSuspect.includes('@') ? cleanSuspect : report.reporterUserId,
          actorEmail: cleanSuspect?.includes('@') ? cleanSuspect : report.reporterEmail,
          actorRole: report.reporterRole,
          ipAddress: ip,
          deviceFingerprint: fp,
          endpoint: evidenceContext || 'account_menu_report',
          actionTaken: autoActionTaken || 'Awaiting Super Admin Triage'
        });

        return res.json({
          success: true,
          reportId: id,
          autoEnforced: Boolean(autoActionTaken),
          actionTaken: autoActionTaken,
          message: autoActionTaken
            ? `Report logged and automated containment executed (${autoActionTaken}).`
            : 'Your security report has been encrypted and dispatched to the Super Admin Security & Trust team.'
        });
      } catch (err: any) {
        return res.status(500).json({ success: false, error: err?.message || 'Failed to save report' });
      }
    });

    // B. Automated Client Guard Incident Telemetry & Policy Enforcement
    app.post('/api/security/incident', async (req, res) => {
      try {
        const {
          category,
          severity,
          title,
          description,
          actorUserId,
          actorEmail,
          actorRole,
          endpoint,
          autoBlock
        } = req.body || {};

        if (!title || !description) {
          return res.status(400).json({ success: false, error: 'title and description required' });
        }

        const ip = extractClientIp(req);
        const fp = extractDeviceFingerprint(req);
        const policy = memoryStore.automationPolicy;
        const cleanCategory = String(category || 'abuse') as SecurityIncidentCategory;
        const isSuperAdminActor = isAuthorizedSuperAdmin(actorEmail);
        const shouldAutoBlock = Boolean(autoBlock) && !isSuperAdminActor;

        let status: SecurityIncidentStatus = shouldAutoBlock ? 'auto_blocked' : 'open';
        let actionTaken = 'Logged by Client Guard';

        if (!isSuperAdminActor) {
          if (cleanCategory === 'spam' || cleanCategory === 'phishing_link') {
            const spamRes = await this.enforceAutomatedSpamLock({
              userId: actorUserId ? String(actorUserId) : undefined,
              email: actorEmail ? String(actorEmail) : undefined,
              ip,
              fp,
              reason: `Automated timed lock triggered by ${cleanCategory.replace('_', ' ')} detection`,
              immediate: Boolean(autoBlock)
            });
            actionTaken = spamRes.actionTaken;
            if (spamRes.enforced) status = 'auto_blocked';
          } else if (cleanCategory === 'brute_force' && shouldAutoBlock && policy.autoLockOnBruteForce) {
            const lockRes = await this.enforceAutomatedSpamLock({
              userId: actorUserId ? String(actorUserId) : undefined,
              email: actorEmail ? String(actorEmail) : undefined,
              ip,
              fp,
              durationMinutes: policy.bruteForceLockDurationMinutes,
              reason: `Automatic ${policy.bruteForceLockDurationMinutes}m lock after brute-force attempts`,
              immediate: true
            });
            if (actorUserId && String(endpoint || '').includes('pin')) {
              await this.createOrActivateBlock({
                blockType: 'wallet_freeze',
                targetValue: String(actorUserId),
                reason: `Automatic ${policy.bruteForceLockDurationMinutes}m wallet hold after 5 failed Parent PIN attempts`,
                createdBy: 'auto_shield',
                durationMinutes: policy.bruteForceLockDurationMinutes
              });
              actionTaken = `${lockRes.actionTaken} + Wallet Hold (${policy.bruteForceLockDurationMinutes}m)`;
            } else {
              actionTaken = lockRes.actionTaken;
            }
            status = 'auto_blocked';
          } else if (
            (cleanCategory === 'fraud' ||
              cleanCategory === 'hacking' ||
              cleanCategory === 'tampered_payload' ||
              cleanCategory === 'payment_replay' ||
              cleanCategory === 'withdrawal_anomaly') &&
            shouldAutoBlock
          ) {
            const fraudRes = await this.enforceAutomatedFraudContainment({
              userId: actorUserId ? String(actorUserId) : undefined,
              email: actorEmail ? String(actorEmail) : undefined,
              ip,
              fp,
              reason: `Automated fraud/hacking containment (${cleanCategory})`
            });
            actionTaken = fraudRes.actionTaken;
            if (fraudRes.suspended || fraudRes.walletFrozen) status = 'auto_blocked';
          } else if (cleanCategory === 'xp_anomaly') {
            actionTaken = 'XP Velocity Clamped & Flagged';
          }
        } else {
          actionTaken = 'Logged (Super Admin Exempt)';
        }

        const incident = await this.recordIncident({
          category: cleanCategory,
          severity: (severity || 'medium') as SecuritySeverity,
          status,
          source: 'client_guard',
          title: String(title),
          description: String(description),
          actorUserId: actorUserId ? String(actorUserId) : undefined,
          actorEmail: actorEmail ? String(actorEmail) : undefined,
          actorRole: actorRole ? String(actorRole) : undefined,
          ipAddress: ip,
          deviceFingerprint: fp,
          endpoint: endpoint ? String(endpoint) : undefined,
          actionTaken
        });

        return res.json({ success: true, incidentId: incident.id, status, actionTaken });
      } catch (err: any) {
        return res.status(500).json({ success: false, error: err?.message || 'Failed to record incident' });
      }
    });

    // C. Self Security Status Check (Checks deletion, suspension, timed lock, wallet freeze, IP/device block)
    app.get('/api/security/status', (req, res) => {
      const userId = req.query.userId ? String(req.query.userId) : undefined;
      const email = req.query.email ? String(req.query.email) : undefined;
      const ip = extractClientIp(req);
      const fp = extractDeviceFingerprint(req);

      if (isAuthorizedSuperAdmin(email)) {
        return res.json({
          accountStatus: 'active',
          walletFrozen: false,
          isBlocked: false
        });
      }

      const deleteBlock = findActiveBlock({
        userId,
        email,
        blockTypes: ['account_delete']
      });
      const suspendBlock = findActiveBlock({
        userId,
        email,
        blockTypes: ['account_suspend']
      });
      const lockBlock = findActiveBlock({
        userId,
        email,
        blockTypes: ['account_lock']
      });
      const freezeBlock = findActiveBlock({
        userId,
        email,
        blockTypes: ['wallet_freeze']
      });
      const netBlock = findActiveBlock({
        ip,
        fingerprint: fp,
        blockTypes: ['ip', 'device_fingerprint']
      });

      const accountStatus = deleteBlock
        ? 'deleted'
        : suspendBlock
        ? 'suspended'
        : lockBlock
        ? 'locked'
        : 'active';

      return res.json({
        accountStatus,
        lockedUntil: lockBlock?.expiresAt,
        lockReason: lockBlock?.reason,
        suspensionReason: suspendBlock?.reason,
        deletedAt: deleteBlock?.createdAt,
        deletionReason: deleteBlock?.reason,
        walletFrozen: Boolean(freezeBlock),
        walletFrozenReason: freezeBlock?.reason,
        isBlocked: Boolean(netBlock),
        blockType: netBlock?.blockType,
        blockReason: netBlock?.reason
      });
    });

    // D. Super Admin Security & Trust Center Overview
    app.get('/api/security/overview', async (req, res) => {
      const adminEmail = String(req.query.adminEmail || '').toLowerCase().trim();
      if (!isAuthorizedSuperAdmin(adminEmail)) {
        await this.logUnauthorizedProbe(req, '/api/security/overview', adminEmail);
        return res.status(403).json({
          success: false,
          error: 'Unauthorized: Super Admin privileges required to access Security & Trust Center.'
        });
      }

      await this.hydrateFromFirestore();

      const activeBlocks = memoryStore.blocks.filter(b => b.active && !isBlockExpired(b));
      const openThreats = memoryStore.incidents.filter(
        i => i.status === 'open' || i.status === 'investigating' || i.status === 'auto_blocked'
      ).length;

      return res.json({
        success: true,
        incidents: memoryStore.incidents,
        reports: memoryStore.reports,
        blocks: memoryStore.blocks,
        deletedAccounts: memoryStore.deletedAccounts,
        automationPolicy: memoryStore.automationPolicy,
        summary: {
          openThreats,
          criticalCount: memoryStore.incidents.filter(
            i => i.severity === 'critical' && i.status !== 'resolved' && i.status !== 'dismissed'
          ).length,
          autoBlockedCount: activeBlocks.filter(b => b.blockType === 'ip' || b.blockType === 'device_fingerprint').length,
          lockedAccountsCount: activeBlocks.filter(b => b.blockType === 'account_lock').length,
          suspendedAccountsCount: activeBlocks.filter(b => b.blockType === 'account_suspend').length,
          deletedAccountsCount: memoryStore.deletedAccounts.length,
          frozenWalletsCount: activeBlocks.filter(b => b.blockType === 'wallet_freeze').length,
          pendingReportsCount: memoryStore.reports.filter(r => r.status === 'pending' || r.status === 'investigating').length
        }
      });
    });

    // E. Super Admin Security Enforcement & Policy Actions
    app.post('/api/security/action', async (req, res) => {
      const {
        adminEmail,
        action,
        targetValue,
        targetUserId,
        targetEmail,
        targetRole,
        reason,
        incidentId,
        reportId,
        blockId,
        durationMinutes,
        policy
      } = req.body || {};

      if (!isAuthorizedSuperAdmin(adminEmail)) {
        await this.logUnauthorizedProbe(req, '/api/security/action', adminEmail);
        return res.status(403).json({
          success: false,
          error: 'Unauthorized: Super Admin privileges required to execute enforcement actions.'
        });
      }

      const nowIso = new Date().toISOString();
      const actor = String(adminEmail).toLowerCase().trim();

      const resolveTargets = (): string[] => {
        return Array.from(
          new Set(
            [targetValue, targetUserId, targetEmail].filter((v): v is string => Boolean(v && String(v).trim()))
          )
        );
      };

      const expandLinkedTargets = (baseTargets: string[], specificBlockId?: string): string[] => {
        const expanded = new Set<string>(baseTargets.map(t => String(t).trim()).filter(Boolean));
        if (specificBlockId) {
          const blk = memoryStore.blocks.find(b => b.id === specificBlockId);
          if (blk?.targetValue) expanded.add(blk.targetValue.trim());
        }
        const seedLower = new Set(Array.from(expanded).map(v => v.toLowerCase()));
        for (const inc of memoryStore.incidents) {
          const uid = inc.actorUserId?.trim();
          const eml = inc.actorEmail?.trim().toLowerCase();
          if ((uid && seedLower.has(uid.toLowerCase())) || (eml && seedLower.has(eml))) {
            if (uid) expanded.add(uid);
            if (eml) expanded.add(eml);
          }
        }
        return Array.from(expanded);
      };

      const checkSuperAdminTarget = (vals: string[]): boolean => vals.some(v => isAuthorizedSuperAdmin(v));

      try {
        if (action === 'update_automation_policy' && policy && typeof policy === 'object') {
          const updatedPolicy = await this.updateAutomationPolicy(policy, actor);
          return res.json({
            success: true,
            automationPolicy: updatedPolicy,
            message: 'Automated Security Enforcement Rules updated.'
          });
        }

        if (action === 'lock_account' && resolveTargets().length > 0) {
          const targets = expandLinkedTargets(resolveTargets());
          if (checkSuperAdminTarget(targets)) {
            return res.status(400).json({ success: false, error: 'Cannot lock a verified Super Admin account.' });
          }
          const mins = Math.max(5, Number(durationMinutes) || 60);
          let primaryBlock: ServerSecurityBlock | null = null;
          for (const t of targets) {
            const blk = await this.createOrActivateBlock({
              blockType: 'account_lock',
              targetValue: String(t),
              reason: reason || `Timed account lock (${mins}m) issued by Super Admin`,
              createdBy: actor,
              durationMinutes: mins
            });
            if (!primaryBlock) primaryBlock = blk;
          }
          if (incidentId) {
            await this.updateIncidentStatus(incidentId, 'resolved', actor, `Account Locked (${mins}m)`);
          }
          if (reportId) {
            await this.updateReportStatus(reportId, 'resolved', actor, `Account Locked (${mins}m)`);
          }
          return res.json({
            success: true,
            block: primaryBlock,
            lockedUntil: primaryBlock?.expiresAt,
            message: `Account ${targets[0]} locked for ${mins} minutes.`
          });
        }

        if (action === 'unlock_account' && (resolveTargets().length > 0 || blockId)) {
          const targets = expandLinkedTargets(resolveTargets(), blockId);
          let blk: ServerSecurityBlock | null = null;
          if (blockId) {
            blk = await this.deactivateBlock({ blockId, blockType: 'account_lock', adminEmail: actor });
          }
          for (const t of targets) {
            const lifted = await this.deactivateBlock({
              blockType: 'account_lock',
              targetValue: String(t),
              adminEmail: actor
            });
            if (!blk) blk = lifted;
          }
          return res.json({ success: true, block: blk, message: `Timed lock lifted for ${targets[0] || blockId}.` });
        }

        if (action === 'suspend_account' && resolveTargets().length > 0) {
          const targets = expandLinkedTargets(resolveTargets());
          if (checkSuperAdminTarget(targets)) {
            return res.status(400).json({ success: false, error: 'Cannot suspend a verified Super Admin account.' });
          }
          let primaryBlock: ServerSecurityBlock | null = null;
          for (const t of targets) {
            const blk = await this.createOrActivateBlock({
              blockType: 'account_suspend',
              targetValue: String(t),
              reason: reason || 'Account suspended indefinitely by Super Admin pending review',
              createdBy: actor
            });
            if (!primaryBlock) primaryBlock = blk;
          }
          if (incidentId) {
            await this.updateIncidentStatus(incidentId, 'resolved', actor, 'Account Suspended');
          }
          if (reportId) {
            await this.updateReportStatus(reportId, 'resolved', actor, 'Account Suspended');
          }
          return res.json({ success: true, block: primaryBlock, message: `Account ${targets[0]} suspended indefinitely.` });
        }

        if (action === 'unsuspend_account' && (resolveTargets().length > 0 || blockId)) {
          const targets = expandLinkedTargets(resolveTargets(), blockId);
          let blk: ServerSecurityBlock | null = null;
          if (blockId) {
            blk = await this.deactivateBlock({ blockId, blockType: 'account_suspend', adminEmail: actor });
          }
          for (const t of targets) {
            const lifted = await this.deactivateBlock({
              blockType: 'account_suspend',
              targetValue: String(t),
              adminEmail: actor
            });
            if (!blk) blk = lifted;
          }
          return res.json({ success: true, block: blk, message: `Account ${targets[0] || blockId} reactivated.` });
        }

        if (action === 'delete_account' && resolveTargets().length > 0) {
          const targets = resolveTargets();
          const result = await this.softDeleteAccount({
            targetValue: String(targets[0]),
            userId: targetUserId ? String(targetUserId) : (!String(targets[0]).includes('@') ? String(targets[0]) : undefined),
            email: targetEmail ? String(targetEmail) : (String(targets[0]).includes('@') ? String(targets[0]) : undefined),
            role: targetRole ? String(targetRole) : undefined,
            reason: reason || 'Account soft-deleted and PII scrubbed by Super Admin',
            adminEmail: actor
          });
          if (incidentId) {
            await this.updateIncidentStatus(incidentId, 'resolved', actor, 'Account Soft-Deleted & Scrubbed');
          }
          if (reportId) {
            await this.updateReportStatus(reportId, 'resolved', actor, 'Account Soft-Deleted & Scrubbed');
          }
          return res.json({
            success: true,
            tombstone: result.tombstone,
            blocks: result.blocks,
            message: `Account ${targets[0]} soft-deleted and PII scrubbed. Audit logs preserved.`
          });
        }

        if (action === 'freeze_wallet' && resolveTargets().length > 0) {
          const targets = expandLinkedTargets(resolveTargets());
          if (checkSuperAdminTarget(targets)) {
            return res.status(400).json({ success: false, error: 'Cannot freeze a verified Super Admin wallet.' });
          }
          let primaryBlock: ServerSecurityBlock | null = null;
          for (const t of targets) {
            const blk = await this.createOrActivateBlock({
              blockType: 'wallet_freeze',
              targetValue: String(t),
              reason: reason || 'Wallet frozen pending fraud/payment investigation',
              createdBy: actor
            });
            if (!primaryBlock) primaryBlock = blk;
          }
          if (incidentId) {
            await this.updateIncidentStatus(incidentId, 'investigating', actor, 'Wallet Frozen');
          }
          if (reportId) {
            await this.updateReportStatus(reportId, 'investigating', actor, 'Wallet Frozen');
          }
          return res.json({ success: true, block: primaryBlock, message: `Wallet for ${targets[0]} frozen.` });
        }

        if (action === 'unfreeze_wallet' && (resolveTargets().length > 0 || blockId)) {
          const targets = expandLinkedTargets(resolveTargets(), blockId);
          let blk: ServerSecurityBlock | null = null;
          if (blockId) {
            blk = await this.deactivateBlock({ blockId, blockType: 'wallet_freeze', adminEmail: actor });
          }
          for (const t of targets) {
            const lifted = await this.deactivateBlock({
              blockType: 'wallet_freeze',
              targetValue: String(t),
              adminEmail: actor
            });
            if (!blk) blk = lifted;
          }
          return res.json({ success: true, block: blk, message: `Wallet for ${targets[0] || blockId} unfrozen.` });
        }

        if ((action === 'block_ip' || action === 'block_device') && targetValue) {
          const blockType: SecurityBlockType = action === 'block_ip' ? 'ip' : 'device_fingerprint';
          const blk = await this.createOrActivateBlock({
            blockType,
            targetValue: String(targetValue),
            reason: reason || `Blocked manually by Super Admin (${actor})`,
            createdBy: actor,
            durationMinutes: durationMinutes ? Number(durationMinutes) : undefined
          });
          if (incidentId) {
            await this.updateIncidentStatus(
              incidentId,
              'auto_blocked',
              actor,
              `${blockType === 'ip' ? 'IP' : 'Device'} Blocked`
            );
          }
          return res.json({ success: true, block: blk, message: `${blockType} ${targetValue} blocked.` });
        }

        if (action === 'unblock_target') {
          const existingBlk = blockId ? memoryStore.blocks.find(b => b.id === blockId) : undefined;
          if (existingBlk?.blockType === 'account_delete') {
            return res.status(400).json({
              success: false,
              error: 'Soft-deleted account tombstones cannot be reversed.'
            });
          }
          const blk = await this.deactivateBlock({
            blockId,
            targetValue: targetValue ? String(targetValue) : undefined,
            adminEmail: actor
          });
          if (existingBlk && (existingBlk.blockType === 'account_lock' || existingBlk.blockType === 'account_suspend' || existingBlk.blockType === 'wallet_freeze')) {
            const linked = expandLinkedTargets([existingBlk.targetValue]);
            for (const t of linked) {
              await this.deactivateBlock({ blockType: existingBlk.blockType, targetValue: t, adminEmail: actor });
            }
          }
          return res.json({ success: true, block: blk, message: 'Security block lifted.' });
        }

        if (
          (action === 'investigate_incident' || action === 'resolve_incident' || action === 'dismiss_incident') &&
          incidentId
        ) {
          const statusMap: Record<string, SecurityIncidentStatus> = {
            investigate_incident: 'investigating',
            resolve_incident: 'resolved',
            dismiss_incident: 'dismissed'
          };
          const inc = await this.updateIncidentStatus(
            String(incidentId),
            statusMap[action],
            actor,
            action === 'resolve_incident'
              ? 'Resolved by Super Admin'
              : action === 'dismiss_incident'
              ? 'Dismissed'
              : 'Under Investigation'
          );
          return res.json({ success: true, incident: inc, message: `Incident updated to ${statusMap[action]}.` });
        }

        if (
          (action === 'investigate_report' || action === 'resolve_report' || action === 'dismiss_report') &&
          reportId
        ) {
          const statusMap: Record<string, ServerSecurityReport['status']> = {
            investigate_report: 'investigating',
            resolve_report: 'resolved',
            dismiss_report: 'dismissed'
          };
          const rep = await this.updateReportStatus(
            String(reportId),
            statusMap[action],
            actor,
            action === 'resolve_report'
              ? 'Resolved by Super Admin'
              : action === 'dismiss_report'
              ? 'Dismissed'
              : 'Under Investigation'
          );
          return res.json({
            success: true,
            report: rep,
            updatedAt: nowIso,
            message: `Report updated to ${statusMap[action]}.`
          });
        }

        return res.status(400).json({ success: false, error: 'Unsupported action or missing required parameters.' });
      } catch (err: any) {
        return res.status(500).json({ success: false, error: err?.message || 'Failed to apply security action' });
      }
    });
  }

  private async updateIncidentStatus(
    incidentId: string,
    status: SecurityIncidentStatus,
    resolvedBy: string,
    actionTaken?: string
  ): Promise<ServerSecurityIncident | null> {
    const inc = memoryStore.incidents.find(i => i.id === incidentId);
    if (!inc) return null;
    inc.status = status;
    inc.resolvedBy = resolvedBy;
    inc.resolvedAt = new Date().toISOString();
    if (actionTaken) inc.actionTaken = actionTaken;
    saveDiskStore();
    if (this.firestoreSecurityRulesAvailable) {
      try {
        await setDoc(doc(this.db, 'security_incidents', inc.id), inc, { merge: true });
      } catch (err) {
        this.markIfPermissionError(err);
      }
    }
    return inc;
  }

  private async updateReportStatus(
    reportId: string,
    status: ServerSecurityReport['status'],
    resolvedBy: string,
    actionTaken?: string
  ): Promise<ServerSecurityReport | null> {
    const rep = memoryStore.reports.find(r => r.id === reportId);
    if (!rep) return null;
    rep.status = status;
    rep.resolvedBy = resolvedBy;
    rep.resolvedAt = new Date().toISOString();
    if (actionTaken) rep.actionTaken = actionTaken;
    saveDiskStore();
    if (this.firestoreSecurityRulesAvailable) {
      try {
        await setDoc(doc(this.db, 'security_reports', rep.id), rep, { merge: true });
      } catch (err) {
        this.markIfPermissionError(err);
      }
    }
    return rep;
  }
}
