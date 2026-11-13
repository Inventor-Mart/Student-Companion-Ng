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
} from 'firebase/firestore';

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
export type SecurityBlockType = 'ip' | 'device_fingerprint' | 'account_suspend' | 'wallet_freeze';

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
  resolvedBy?: string;
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
  processedPaystackRefs: Record<string, ProcessedRefRecord>;
}

const memoryStore: SecurityStoreData = {
  incidents: [],
  reports: [],
  blocks: [],
  processedPaystackRefs: {}
};

// Sliding-window rate limit buckets keyed by `${bucket}:${ip}:${fp}`
const rateWindowMap = new Map<string, number[]>();
const rateBreachMap = new Map<string, number[]>();
const probeCountMap = new Map<string, number>();
const paymentVelocityMap = new Map<string, { ts: number; amount: number }[]>();
const withdrawalVelocityMap = new Map<string, number[]>();

function loadDiskStore(): void {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.incidents)) memoryStore.incidents = parsed.incidents;
      if (Array.isArray(parsed.reports)) memoryStore.reports = parsed.reports;
      if (Array.isArray(parsed.blocks)) memoryStore.blocks = parsed.blocks;
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
        incidents: memoryStore.incidents.slice(0, 300),
        reports: memoryStore.reports.slice(0, 200),
        blocks: memoryStore.blocks.slice(0, 200),
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

  for (const b of memoryStore.blocks) {
    if (!b.active) continue;
    if (isBlockExpired(b)) {
      b.active = false;
      continue;
    }
    if (blockTypes && !blockTypes.includes(b.blockType)) continue;
    const normTarget = b.targetValue.toLowerCase().trim();
    if (targets.some(t => t.toLowerCase().trim() === normTarget)) {
      return b;
    }
  }
  return null;
}

export class SecurityService {
  private db: Firestore;
  private hydratedFromFirestore = false;

  constructor(db: Firestore) {
    this.db = db;
    void this.hydrateFromFirestore();
  }

  async hydrateFromFirestore(): Promise<void> {
    if (this.hydratedFromFirestore) return;
    this.hydratedFromFirestore = true;
    try {
      const [incSnap, repSnap, blkSnap] = await Promise.all([
        getDocs(query(collection(this.db, 'security_incidents'), firestoreLimit(150))),
        getDocs(query(collection(this.db, 'security_reports'), firestoreLimit(100))),
        getDocs(query(collection(this.db, 'security_blocks'), firestoreLimit(100)))
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
      saveDiskStore();
    } catch {
      // Non-fatal if Firestore security rules aren't deployed yet; disk/memory store continues working
    }
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
    if (memoryStore.incidents.length > 300) memoryStore.incidents.length = 300;
    saveDiskStore();

    try {
      await setDoc(doc(this.db, 'security_incidents', id), incident);
    } catch {
      // Persist resiliently even if Firestore rejects unauthenticated server SDK write
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
    const normTarget = String(params.targetValue).trim();
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

    try {
      await setDoc(doc(this.db, 'security_blocks', id), block);
    } catch {}

    // Mirror account suspension / wallet freeze onto users doc when possible
    if (params.blockType === 'account_suspend' || params.blockType === 'wallet_freeze') {
      try {
        const userUpdates =
          params.blockType === 'account_suspend'
            ? { accountStatus: 'suspended', suspensionReason: block.reason, suspendedAt: nowIso }
            : { walletFrozen: true, walletFrozenReason: block.reason };
        await setDoc(doc(this.db, 'users', sanitizeFirestoreId(normTarget)), userUpdates, { merge: true });
      } catch {}
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
        params.blockType &&
        normTarget &&
        b.blockType === params.blockType &&
        b.targetValue.toLowerCase().trim() === normTarget &&
        b.active
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
    try {
      await setDoc(doc(this.db, 'security_blocks', matched.id), matched, { merge: true });
    } catch {}

    if (matched.blockType === 'account_suspend' || matched.blockType === 'wallet_freeze') {
      try {
        const userUpdates =
          matched.blockType === 'account_suspend'
            ? { accountStatus: 'active', suspensionReason: '' }
            : { walletFrozen: false, walletFrozenReason: '' };
        await setDoc(doc(this.db, 'users', sanitizeFirestoreId(matched.targetValue)), userUpdates, { merge: true });
      } catch {}
    }

    return matched;
  }

  async logUnauthorizedProbe(req: Request, endpoint: string, attemptedEmail?: string): Promise<void> {
    const ip = extractClientIp(req);
    const fp = extractDeviceFingerprint(req);
    const probeKey = `${ip}:${fp}`;
    const count = (probeCountMap.get(probeKey) || 0) + 1;
    probeCountMap.set(probeKey, count);

    const autoBlocked = count >= 3;
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
      actionTaken: autoBlocked ? 'IP & Fingerprint Auto-Blocked (60m)' : '403 Rejected & Logged'
    });

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
    }
  }

  async isPaystackRefProcessed(reference: string): Promise<boolean> {
    const safeId = sanitizeFirestoreId(reference);
    if (memoryStore.processedPaystackRefs[safeId]) {
      return true;
    }
    try {
      const snap = await getDoc(doc(this.db, 'processed_paystack_refs', safeId));
      if (snap.exists()) {
        memoryStore.processedPaystackRefs[safeId] = snap.data() as ProcessedRefRecord;
        saveDiskStore();
        return true;
      }
    } catch {}
    return false;
  }

  async markPaystackRefProcessed(record: ProcessedRefRecord): Promise<void> {
    const safeId = sanitizeFirestoreId(record.reference);
    memoryStore.processedPaystackRefs[safeId] = record;
    saveDiskStore();
    try {
      await setDoc(doc(this.db, 'processed_paystack_refs', safeId), record);
    } catch {}
  }

  async checkPaymentVelocity(req: Request, userId: string, email: string | undefined, amountNaira: number): Promise<void> {
    const key = userId || email || extractClientIp(req);
    const now = Date.now();
    const list = (paymentVelocityMap.get(key) || []).filter(item => now - item.ts < 5 * 60 * 1000);
    list.push({ ts: now, amount: amountNaira });
    paymentVelocityMap.set(key, list);

    if (list.length >= 5) {
      await this.recordIncident({
        category: 'fraud',
        severity: 'high',
        status: 'open',
        source: 'server_guard',
        title: 'High-Frequency Payment Burst Detected',
        description: `${list.length} payment verifications within 5 minutes for ${email || userId} (latest ₦${amountNaira.toLocaleString()}).`,
        actorUserId: userId,
        actorEmail: email,
        ipAddress: extractClientIp(req),
        deviceFingerprint: extractDeviceFingerprint(req),
        endpoint: '/api/paystack/verify-payment',
        actionTaken: 'Flagged for Super Admin Review'
      });
    }
  }

  async checkWithdrawalVelocity(req: Request, partnerId: string, amountNaira: number): Promise<boolean> {
    const now = Date.now();
    const list = (withdrawalVelocityMap.get(partnerId) || []).filter(ts => now - ts < 10 * 60 * 1000);
    list.push(now);
    withdrawalVelocityMap.set(partnerId, list);

    if (list.length >= 4) {
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
        actionTaken: 'Payout Throttled & Flagged'
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

      // Never lock out verified Super Admins from the Security Center
      const reqAdminEmail = String(req.query?.adminEmail || req.body?.adminEmail || headerEmail || '').toLowerCase().trim();
      if (isAuthorizedSuperAdmin(reqAdminEmail) && path.startsWith('/security/')) {
        return next();
      }

      // 1. Check active IP / Device / Account Suspension blocks
      const activeBlock = findActiveBlock({
        ip,
        fingerprint: fp,
        userId: headerUserId,
        email: headerEmail,
        blockTypes: ['ip', 'device_fingerprint', 'account_suspend']
      });

      if (activeBlock) {
        return res.status(403).json({
          success: false,
          blocked: true,
          blockType: activeBlock.blockType,
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
          actionTaken: autoBlocked ? 'Auto-Blocked IP & Device (30m)' : '429 Rate Throttled'
        });

        if (autoBlocked) {
          void this.createOrActivateBlock({
            blockType: 'ip',
            targetValue: ip,
            reason: `Repeated API rate-limit abuse on ${path}`,
            createdBy: 'auto_shield',
            durationMinutes: 30
          });
        }

        return res.status(429).json({
          success: false,
          error: 'Too many requests detected from your connection. Please wait 60 seconds and try again.'
        });
      }

      return next();
    };
  }

  registerRoutes(app: express.Express): void {
    // A. User Security Report Submission (Available to ALL Personas)
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

        const report: ServerSecurityReport = {
          id,
          reporterUserId: String(reporterUserId || 'anonymous').slice(0, 120),
          reporterEmail: reporterEmail ? String(reporterEmail).slice(0, 145) : undefined,
          reporterName: reporterName ? String(reporterName).slice(0, 115) : 'Platform User',
          reporterRole: reporterRole ? String(reporterRole).slice(0, 45) : 'student',
          category: cleanCategory,
          suspectIdentifier: suspectIdentifier ? String(suspectIdentifier).slice(0, 195) : undefined,
          description: String(description).trim().slice(0, 1950),
          evidenceContext: evidenceContext ? String(evidenceContext).slice(0, 490) : undefined,
          status: 'pending',
          createdAt: new Date().toISOString()
        };

        memoryStore.reports.unshift(report);
        if (memoryStore.reports.length > 200) memoryStore.reports.length = 200;
        saveDiskStore();

        try {
          await setDoc(doc(this.db, 'security_reports', id), report);
        } catch {}

        // Mirror into Security Incident Queue so Super Admin sees user reports in real time
        const mappedCategory: SecurityIncidentCategory =
          cleanCategory === 'payment_anomaly' ? 'fraud' : (cleanCategory as SecurityIncidentCategory);
        await this.recordIncident({
          category: mappedCategory,
          severity: cleanCategory === 'hacking' || cleanCategory === 'fraud' ? 'high' : 'medium',
          status: 'open',
          source: 'user_report',
          title: `User Report: ${cleanCategory.replace('_', ' ').toUpperCase()}${suspectIdentifier ? ` (${suspectIdentifier})` : ''}`,
          description: `${report.description}${suspectIdentifier ? ` [Suspect: ${suspectIdentifier}]` : ''}`,
          actorUserId: suspectIdentifier || report.reporterUserId,
          actorEmail: suspectIdentifier?.includes('@') ? suspectIdentifier : report.reporterEmail,
          actorRole: report.reporterRole,
          ipAddress: ip,
          deviceFingerprint: fp,
          endpoint: evidenceContext || 'account_menu_report',
          actionTaken: 'Awaiting Super Admin Triage'
        });

        return res.json({
          success: true,
          reportId: id,
          message: 'Your security report has been encrypted and dispatched to the Super Admin Security & Trust team.'
        });
      } catch (err: any) {
        return res.status(500).json({ success: false, error: err?.message || 'Failed to save report' });
      }
    });

    // B. Automated Client Guard Incident Telemetry
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
        const shouldAutoBlock = Boolean(autoBlock) && !isAuthorizedSuperAdmin(actorEmail);

        const incident = await this.recordIncident({
          category: category || 'abuse',
          severity: severity || 'medium',
          status: shouldAutoBlock ? 'auto_blocked' : 'open',
          source: 'client_guard',
          title: String(title),
          description: String(description),
          actorUserId: actorUserId ? String(actorUserId) : undefined,
          actorEmail: actorEmail ? String(actorEmail) : undefined,
          actorRole: actorRole ? String(actorRole) : undefined,
          ipAddress: ip,
          deviceFingerprint: fp,
          endpoint: endpoint ? String(endpoint) : undefined,
          actionTaken: shouldAutoBlock ? 'Auto-Lock Applied (15m)' : 'Logged by Client Guard'
        });

        if (shouldAutoBlock && actorUserId && category === 'brute_force') {
          await this.createOrActivateBlock({
            blockType: 'wallet_freeze',
            targetValue: String(actorUserId),
            reason: 'Automatic 15-minute temporary lock after 5 failed Parent PIN attempts',
            createdBy: 'auto_shield',
            durationMinutes: 15
          });
        }

        return res.json({ success: true, incidentId: incident.id });
      } catch (err: any) {
        return res.status(500).json({ success: false, error: err?.message || 'Failed to record incident' });
      }
    });

    // C. Self Security Status Check (Checks active suspension, wallet freeze, or IP/device block)
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

      const suspendBlock = findActiveBlock({
        userId,
        email,
        blockTypes: ['account_suspend']
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

      return res.json({
        accountStatus: suspendBlock ? 'suspended' : 'active',
        suspensionReason: suspendBlock?.reason,
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
        summary: {
          openThreats,
          criticalCount: memoryStore.incidents.filter(
            i => i.severity === 'critical' && i.status !== 'resolved' && i.status !== 'dismissed'
          ).length,
          autoBlockedCount: activeBlocks.filter(b => b.blockType === 'ip' || b.blockType === 'device_fingerprint').length,
          suspendedAccountsCount: activeBlocks.filter(b => b.blockType === 'account_suspend').length,
          frozenWalletsCount: activeBlocks.filter(b => b.blockType === 'wallet_freeze').length,
          pendingReportsCount: memoryStore.reports.filter(r => r.status === 'pending').length
        }
      });
    });

    // E. Super Admin Security Enforcement Actions
    app.post('/api/security/action', async (req, res) => {
      const { adminEmail, action, targetValue, reason, incidentId, reportId, blockId, durationMinutes } = req.body || {};

      if (!isAuthorizedSuperAdmin(adminEmail)) {
        await this.logUnauthorizedProbe(req, '/api/security/action', adminEmail);
        return res.status(403).json({
          success: false,
          error: 'Unauthorized: Super Admin privileges required to execute enforcement actions.'
        });
      }

      const nowIso = new Date().toISOString();
      const actor = String(adminEmail).toLowerCase().trim();

      try {
        if (action === 'suspend_account' && targetValue) {
          const blk = await this.createOrActivateBlock({
            blockType: 'account_suspend',
            targetValue: String(targetValue),
            reason: reason || 'Account suspended by Super Admin for policy/security violation',
            createdBy: actor
          });
          if (incidentId) {
            await this.updateIncidentStatus(incidentId, 'resolved', actor, 'Account Suspended');
          }
          return res.json({ success: true, block: blk, message: `Account ${targetValue} suspended.` });
        }

        if (action === 'unsuspend_account' && targetValue) {
          const blk = await this.deactivateBlock({
            blockId,
            blockType: 'account_suspend',
            targetValue: String(targetValue),
            adminEmail: actor
          });
          return res.json({ success: true, block: blk, message: `Account ${targetValue} reactivated.` });
        }

        if (action === 'freeze_wallet' && targetValue) {
          const blk = await this.createOrActivateBlock({
            blockType: 'wallet_freeze',
            targetValue: String(targetValue),
            reason: reason || 'Wallet frozen pending fraud/payment investigation',
            createdBy: actor
          });
          if (incidentId) {
            await this.updateIncidentStatus(incidentId, 'investigating', actor, 'Wallet Frozen');
          }
          return res.json({ success: true, block: blk, message: `Wallet for ${targetValue} frozen.` });
        }

        if (action === 'unfreeze_wallet' && targetValue) {
          const blk = await this.deactivateBlock({
            blockId,
            blockType: 'wallet_freeze',
            targetValue: String(targetValue),
            adminEmail: actor
          });
          return res.json({ success: true, block: blk, message: `Wallet for ${targetValue} unfrozen.` });
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
          const blk = await this.deactivateBlock({
            blockId,
            targetValue: targetValue ? String(targetValue) : undefined,
            adminEmail: actor
          });
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
            action === 'resolve_incident' ? 'Resolved by Super Admin' : action === 'dismiss_incident' ? 'Dismissed' : 'Under Investigation'
          );
          return res.json({ success: true, incident: inc, message: `Incident updated to ${statusMap[action]}.` });
        }

        if ((action === 'resolve_report' || action === 'dismiss_report') && reportId) {
          const newStatus = action === 'resolve_report' ? 'resolved' : 'dismissed';
          const rep = memoryStore.reports.find(r => r.id === reportId);
          if (rep) {
            rep.status = newStatus;
            rep.resolvedBy = actor;
            saveDiskStore();
            try {
              await setDoc(doc(this.db, 'security_reports', rep.id), rep, { merge: true });
            } catch {}
          }
          return res.json({ success: true, report: rep, updatedAt: nowIso });
        }

        return res.status(400).json({ success: false, error: 'Unsupported action or missing targetValue/incidentId.' });
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
    try {
      await setDoc(doc(this.db, 'security_incidents', inc.id), inc, { merge: true });
    } catch {}
    return inc;
  }
}
