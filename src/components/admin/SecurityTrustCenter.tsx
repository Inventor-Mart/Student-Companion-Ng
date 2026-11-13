import React, { useState, useEffect, useCallback } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Search,
  RefreshCw,
  Ban,
  Snowflake,
  UserX,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Globe,
  Cpu,
  Lock,
  Unlock,
  Eye,
  Clock,
  Trash2,
  Edit3,
  Sliders,
  Flag,
  X
} from 'lucide-react';
import {
  SecurityIncident,
  SecurityReport,
  SecurityBlock,
  SecuritySeverity,
  SecurityIncidentStatus,
  SecurityAutomationPolicy
} from '../../types';
import { useApp } from '../../context/AppContext';
import { getSecurityHeaders } from '../../utils/securityGuard';

interface SecurityTrustCenterProps {
  adminEmail: string;
  onBack: () => void;
  onModifyAccount?: (identifier: string) => void;
}

interface SecuritySummary {
  openThreats: number;
  criticalCount: number;
  autoBlockedCount: number;
  lockedAccountsCount: number;
  suspendedAccountsCount: number;
  deletedAccountsCount: number;
  frozenWalletsCount: number;
  pendingReportsCount: number;
}

const DEFAULT_POLICY_STATE: SecurityAutomationPolicy = {
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
  updatedAt: '',
  updatedBy: 'system_default'
};

export const SecurityTrustCenter: React.FC<SecurityTrustCenterProps> = ({
  adminEmail,
  onBack,
  onModifyAccount
}) => {
  const { updateUserRecord, softDeleteUserRecord, allRegisteredUsers } = useApp();

  const [incidents, setIncidents] = useState<SecurityIncident[]>([]);
  const [reports, setReports] = useState<SecurityReport[]>([]);
  const [blocks, setBlocks] = useState<SecurityBlock[]>([]);
  const [policy, setPolicy] = useState<SecurityAutomationPolicy>(DEFAULT_POLICY_STATE);
  const [summary, setSummary] = useState<SecuritySummary>({
    openThreats: 0,
    criticalCount: 0,
    autoBlockedCount: 0,
    lockedAccountsCount: 0,
    suspendedAccountsCount: 0,
    deletedAccountsCount: 0,
    frozenWalletsCount: 0,
    pendingReportsCount: 0
  });

  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'threats' | 'reports' | 'blocks' | 'automation'>('threats');
  const [severityFilter, setSeverityFilter] = useState<'all' | SecuritySeverity>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | SecurityIncidentStatus>('all');
  const [reportFilter, setReportFilter] = useState<'all' | 'pending' | 'investigating' | 'resolved' | 'dismissed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Quick manual enforcement form
  const [manualActionType, setManualActionType] = useState<
    'lock_account' | 'suspend_account' | 'freeze_wallet' | 'block_ip' | 'block_device' | 'delete_account'
  >('lock_account');
  const [manualDurationMinutes, setManualDurationMinutes] = useState<number>(60);
  const [manualTarget, setManualTarget] = useState('');
  const [manualReason, setManualReason] = useState('');
  const [isActing, setIsActing] = useState(false);

  // In-app soft-delete confirmation modal
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<{
    targetValue: string;
    reason: string;
    incidentId?: string;
    reportId?: string;
  } | null>(null);

  const loadOverview = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/security/overview?adminEmail=${encodeURIComponent(adminEmail)}`,
        {
          headers: getSecurityHeaders({ userEmail: adminEmail })
        }
      );
      const data = await res.json();
      if (data.success) {
        setIncidents(data.incidents || []);
        setReports(data.reports || []);
        setBlocks(data.blocks || []);
        if (data.automationPolicy) setPolicy(data.automationPolicy);
        if (data.summary) setSummary(data.summary);
      } else {
        setFeedback({ type: 'error', text: data.error || 'Failed to load Security & Trust telemetry.' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', text: err?.message || 'Network error fetching security telemetry.' });
    } finally {
      setIsLoading(false);
    }
  }, [adminEmail]);

  useEffect(() => {
    void loadOverview();
  }, [loadOverview]);

  const resolveMatchedUser = (identifier?: string) => {
    if (!identifier) return undefined;
    const norm = identifier.toLowerCase().trim();
    return allRegisteredUsers.find(
      u => u.id.toLowerCase() === norm || u.email.toLowerCase() === norm
    );
  };

  const executeSecurityAction = async (payload: {
    action: string;
    targetValue?: string;
    reason?: string;
    incidentId?: string;
    reportId?: string;
    blockId?: string;
    durationMinutes?: number;
    policy?: Partial<SecurityAutomationPolicy>;
  }) => {
    setIsActing(true);
    setFeedback(null);
    try {
      const matchedUser = resolveMatchedUser(payload.targetValue);

      if (payload.action === 'delete_account' && payload.targetValue) {
        if (matchedUser) {
          const delRes = await softDeleteUserRecord(
            matchedUser.id,
            payload.reason || 'Soft-deleted via Security & Trust Command Center',
            adminEmail
          );
          if (!delRes.success) {
            setFeedback({ type: 'error', text: delRes.error || 'Could not delete account.' });
            return;
          }
          if (payload.incidentId) {
            await fetch('/api/security/action', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', ...getSecurityHeaders({ userEmail: adminEmail }) },
              body: JSON.stringify({ adminEmail, action: 'resolve_incident', incidentId: payload.incidentId })
            });
          }
          if (payload.reportId) {
            await fetch('/api/security/action', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', ...getSecurityHeaders({ userEmail: adminEmail }) },
              body: JSON.stringify({ adminEmail, action: 'resolve_report', reportId: payload.reportId })
            });
          }
          setFeedback({
            type: 'success',
            text: `Account ${matchedUser.email} soft-deleted and PII scrubbed. Audit logs preserved.`
          });
          await loadOverview();
          return;
        }
      }

      const res = await fetch('/api/security/action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getSecurityHeaders({ userEmail: adminEmail })
        },
        body: JSON.stringify({
          adminEmail,
          targetUserId: matchedUser?.id,
          targetEmail: matchedUser?.email,
          targetRole: matchedUser?.role,
          ...payload
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setFeedback({ type: 'error', text: data.error || 'Action failed.' });
      } else {
        if (matchedUser) {
          if (payload.action === 'lock_account') {
            await updateUserRecord(matchedUser.id, {
              accountStatus: 'locked',
              lockedUntil: data.lockedUntil,
              lockReason: payload.reason || 'Timed lock by Super Admin'
            });
          } else if (payload.action === 'unlock_account') {
            await updateUserRecord(matchedUser.id, {
              accountStatus: 'active',
              lockedUntil: undefined,
              lockReason: undefined
            });
          } else if (payload.action === 'suspend_account') {
            await updateUserRecord(matchedUser.id, {
              accountStatus: 'suspended',
              suspensionReason: payload.reason || 'Suspended by Super Admin',
              suspendedAt: new Date().toISOString()
            });
          } else if (payload.action === 'unsuspend_account') {
            await updateUserRecord(matchedUser.id, {
              accountStatus: 'active',
              suspensionReason: undefined
            });
          } else if (payload.action === 'freeze_wallet') {
            await updateUserRecord(matchedUser.id, {
              walletFrozen: true,
              walletFrozenReason: payload.reason || 'Frozen by Super Admin'
            });
          } else if (payload.action === 'unfreeze_wallet') {
            await updateUserRecord(matchedUser.id, {
              walletFrozen: false,
              walletFrozenReason: undefined
            });
          }
        }

        if (data.automationPolicy) {
          setPolicy(data.automationPolicy);
        }

        setFeedback({
          type: 'success',
          text: data.message || 'Enforcement action executed and logged.'
        });
        await loadOverview();
      }
    } catch (err: any) {
      setFeedback({ type: 'error', text: err?.message || 'Network error applying action.' });
    } finally {
      setIsActing(false);
    }
  };

  const handleManualEnforce = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTarget.trim()) return;

    if (manualActionType === 'delete_account') {
      setDeleteConfirmModal({
        targetValue: manualTarget.trim(),
        reason:
          manualReason.trim() || 'Account permanently closed and PII scrubbed by Super Admin'
      });
      return;
    }

    await executeSecurityAction({
      action: manualActionType,
      targetValue: manualTarget.trim(),
      durationMinutes: manualActionType === 'lock_account' ? manualDurationMinutes : undefined,
      reason:
        manualReason.trim() ||
        `Manual Super Admin action (${manualActionType.replace('_', ' ')})`
    });
    setManualTarget('');
    setManualReason('');
  };

  const filteredIncidents = incidents.filter(inc => {
    if (severityFilter !== 'all' && inc.severity !== severityFilter) return false;
    if (statusFilter !== 'all' && inc.status !== statusFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      inc.title.toLowerCase().includes(q) ||
      inc.description.toLowerCase().includes(q) ||
      (inc.actorEmail || '').toLowerCase().includes(q) ||
      (inc.actorUserId || '').toLowerCase().includes(q) ||
      (inc.ipAddress || '').toLowerCase().includes(q) ||
      (inc.deviceFingerprint || '').toLowerCase().includes(q) ||
      inc.category.toLowerCase().includes(q)
    );
  });

  const filteredReports = reports.filter(rep => {
    if (reportFilter !== 'all' && rep.status !== reportFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      rep.description.toLowerCase().includes(q) ||
      (rep.suspectIdentifier || '').toLowerCase().includes(q) ||
      (rep.reporterName || '').toLowerCase().includes(q) ||
      (rep.reporterEmail || '').toLowerCase().includes(q) ||
      rep.category.toLowerCase().includes(q)
    );
  });

  const activeBlocks = blocks.filter(b => b.active);

  const renderSeverityLabel = (severity: SecuritySeverity) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 text-rose-400 font-bold text-[11px]">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>Critical</span>
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 text-amber-400 font-bold text-[11px]">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span>High</span>
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 text-sky-400 font-semibold text-[11px]">
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span>Medium</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-slate-400 font-semibold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>Low</span>
          </span>
        );
    }
  };

  const renderStatusLabel = (status: SecurityIncidentStatus) => {
    switch (status) {
      case 'auto_blocked':
        return <span className="text-rose-400 font-bold text-[11px]">Auto-Enforced</span>;
      case 'investigating':
        return <span className="text-amber-300 font-bold text-[11px]">Investigating</span>;
      case 'resolved':
        return <span className="text-emerald-400 font-bold text-[11px]">Resolved</span>;
      case 'dismissed':
        return <span className="text-slate-500 font-medium text-[11px]">Dismissed</span>;
      default:
        return <span className="text-[#FF5B00] font-bold text-[11px]">Open</span>;
    }
  };

  const renderReportStatusLabel = (status: SecurityReport['status']) => {
    switch (status) {
      case 'investigating':
        return (
          <span className="inline-flex items-center gap-1 text-amber-300 font-bold text-[11px]">
            <Eye className="w-3 h-3 shrink-0" />
            <span>Investigating</span>
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
            <CheckCircle2 className="w-3 h-3 shrink-0" />
            <span>Resolved</span>
          </span>
        );
      case 'dismissed':
        return (
          <span className="inline-flex items-center gap-1 text-slate-400 font-medium text-[11px]">
            <XCircle className="w-3 h-3 shrink-0" />
            <span>Dismissed</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[#FF5B00] font-bold text-[11px]">
            <Flag className="w-3 h-3 shrink-0" />
            <span>Pending Triage</span>
          </span>
        );
    }
  };

  const renderTargetQuickControls = (
    target: string,
    opts?: { incidentId?: string; reportId?: string; contextTitle?: string }
  ) => (
    <>
      {onModifyAccount && (
        <button
          type="button"
          onClick={() => onModifyAccount(target)}
          className="px-2.5 min-h-[34px] rounded-lg bg-slate-950 hover:bg-indigo-950/60 border border-slate-700 hover:border-indigo-500/70 text-indigo-300 text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
        >
          <Edit3 className="w-3 h-3" />
          <span>Modify Account</span>
        </button>
      )}

      <button
        type="button"
        disabled={isActing}
        onClick={() =>
          executeSecurityAction({
            action: 'lock_account',
            targetValue: target,
            durationMinutes: 1440,
            incidentId: opts?.incidentId,
            reportId: opts?.reportId,
            reason: `24h timed lock issued (${opts?.contextTitle || 'Security triage'})`
          })
        }
        className="px-2.5 min-h-[34px] rounded-lg bg-slate-950 hover:bg-amber-950/60 border border-slate-700 hover:border-amber-600/60 text-amber-300 text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
      >
        <Clock className="w-3 h-3" />
        <span>Lock 24h</span>
      </button>

      <button
        type="button"
        disabled={isActing}
        onClick={() =>
          executeSecurityAction({
            action: 'suspend_account',
            targetValue: target,
            incidentId: opts?.incidentId,
            reportId: opts?.reportId,
            reason: `Account suspended indefinitely (${opts?.contextTitle || 'Security triage'})`
          })
        }
        className="px-2.5 min-h-[34px] rounded-lg bg-slate-950 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-600/60 text-rose-300 text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
      >
        <UserX className="w-3 h-3" />
        <span>Suspend</span>
      </button>

      <button
        type="button"
        disabled={isActing}
        onClick={() =>
          executeSecurityAction({
            action: 'freeze_wallet',
            targetValue: target,
            incidentId: opts?.incidentId,
            reportId: opts?.reportId,
            reason: `Wallet frozen (${opts?.contextTitle || 'Security triage'})`
          })
        }
        className="px-2.5 min-h-[34px] rounded-lg bg-slate-950 hover:bg-sky-950/60 border border-slate-700 hover:border-sky-600/60 text-sky-300 text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
      >
        <Snowflake className="w-3 h-3" />
        <span>Freeze Wallet</span>
      </button>

      <button
        type="button"
        disabled={isActing}
        onClick={() =>
          setDeleteConfirmModal({
            targetValue: target,
            incidentId: opts?.incidentId,
            reportId: opts?.reportId,
            reason: `Soft-deleted & scrubbed due to ${opts?.contextTitle || 'confirmed fraud/abuse report'}`
          })
        }
        className="px-2.5 min-h-[34px] rounded-lg bg-rose-950/50 hover:bg-rose-900 border border-rose-800/80 text-rose-200 text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
      >
        <Trash2 className="w-3 h-3" />
        <span>Soft-Delete</span>
      </button>
    </>
  );

  return (
    <div className="flex-1 w-full flex flex-col overflow-y-auto px-3 sm:px-6 py-4 space-y-4 touch-pan-y text-slate-100 pb-16">
      {/* Top Bar */}
      <div className="bg-[#0B1526] px-4 py-3 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
          <div>
            <h1 className="font-bold text-white text-sm tracking-tight">
              Security &amp; Trust Command Center
            </h1>
            <p className="text-[11px] text-slate-400">
              Fraud, spam, Paystack replay, automated enforcement &amp; account lifecycle governance · {adminEmail}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadOverview}
            disabled={isLoading}
            className="px-3 min-h-[38px] rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh Feed</span>
          </button>
          <button
            type="button"
            onClick={onBack}
            className="px-3 min-h-[38px] rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold cursor-pointer whitespace-nowrap shrink-0"
          >
            &larr; Directory
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={`px-4 py-3 rounded-xl border text-xs flex items-center justify-between gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200'
              : 'bg-rose-950/60 border-rose-700 text-rose-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-[#84E000] shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-slate-400 hover:text-white text-[11px] cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 4-Column KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Open &amp; Active Threats</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-white mt-1.5 font-mono tabular-nums">
            {summary.openThreats}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono tabular-nums">
            {summary.criticalCount} critical · {summary.pendingReportsCount} pending reports
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Blocked IPs &amp; Devices</span>
            <Ban className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white mt-1.5 font-mono tabular-nums">
            {summary.autoBlockedCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Auto &amp; manual edge shields
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Locked &amp; Suspended</span>
            <UserX className="w-4 h-4 text-[#FF5B00]" />
          </div>
          <div className="text-2xl font-black text-white mt-1.5 font-mono tabular-nums">
            {summary.lockedAccountsCount + summary.suspendedAccountsCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono tabular-nums">
            {summary.lockedAccountsCount} timed · {summary.suspendedAccountsCount} suspended · {summary.deletedAccountsCount} deleted
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Frozen Wallets</span>
            <Snowflake className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white mt-1.5 font-mono tabular-nums">
            {summary.frozenWalletsCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Paystack &amp; escrow held
          </div>
        </div>
      </div>

      {/* Direct Manual Enforcement Strip */}
      <form
        onSubmit={handleManualEnforce}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col lg:flex-row items-stretch lg:items-end gap-3 text-xs"
      >
        <div className="w-full lg:w-52">
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
            Manual Action
          </label>
          <select
            value={manualActionType}
            onChange={e => setManualActionType(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#84E000]"
          >
            <option value="lock_account">Lock Account (Timed)</option>
            <option value="suspend_account">Suspend Account (Indefinite)</option>
            <option value="freeze_wallet">Freeze Wallet / Payouts</option>
            <option value="block_ip">Block IP Address</option>
            <option value="block_device">Block Device Fingerprint</option>
            <option value="delete_account">Soft-Delete &amp; Scrub Account</option>
          </select>
        </div>

        {manualActionType === 'lock_account' && (
          <div className="w-full lg:w-36">
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Lock Duration
            </label>
            <select
              value={manualDurationMinutes}
              onChange={e => setManualDurationMinutes(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#84E000]"
            >
              <option value={15}>15 mins</option>
              <option value={30}>30 mins</option>
              <option value={60}>1 hour</option>
              <option value={1440}>24 hours</option>
              <option value={10080}>7 days</option>
            </select>
          </div>
        )}

        <div className="flex-1">
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
            Target Email, User ID, IP, or Fingerprint
          </label>
          <input
            type="text"
            value={manualTarget}
            onChange={e => setManualTarget(e.target.value)}
            placeholder="e.g. usr-123, student@email.com, or 102.89.33.14"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-[#84E000]"
          />
        </div>

        <div className="flex-1">
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
            Enforcement Reason
          </label>
          <input
            type="text"
            value={manualReason}
            onChange={e => setManualReason(e.target.value)}
            placeholder="Reason logged for audit trail"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-[#84E000]"
          />
        </div>

        <button
          type="submit"
          disabled={isActing || !manualTarget.trim()}
          className="px-4 min-h-[38px] rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold cursor-pointer whitespace-nowrap shrink-0 transition-colors"
        >
          {manualActionType === 'delete_account'
            ? 'Review Soft-Delete'
            : manualActionType === 'lock_account'
            ? 'Apply Timed Lock'
            : 'Apply Enforcement'}
        </button>
      </form>

      {/* Main Panel: Tabs & Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('threats')}
              className={`px-3.5 min-h-[38px] rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                activeTab === 'threats'
                  ? 'bg-[#84E000] text-slate-950'
                  : 'bg-slate-950 text-slate-300 border border-slate-800 hover:text-white'
              }`}
            >
              Incidents &amp; Threats ({incidents.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('reports')}
              className={`px-3.5 min-h-[38px] rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                activeTab === 'reports'
                  ? 'bg-[#84E000] text-slate-950'
                  : 'bg-slate-950 text-slate-300 border border-slate-800 hover:text-white'
              }`}
            >
              User Reports Queue ({summary.pendingReportsCount} Pending / {reports.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('blocks')}
              className={`px-3.5 min-h-[38px] rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                activeTab === 'blocks'
                  ? 'bg-[#84E000] text-slate-950'
                  : 'bg-slate-950 text-slate-300 border border-slate-800 hover:text-white'
              }`}
            >
              Active Blocks &amp; Tombstones ({activeBlocks.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('automation')}
              className={`px-3.5 min-h-[38px] rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap shrink-0 transition-colors inline-flex items-center gap-1.5 ${
                activeTab === 'automation'
                  ? 'bg-[#84E000] text-slate-950'
                  : 'bg-slate-950 text-slate-300 border border-slate-800 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Automated Rules</span>
            </button>
          </div>

          {(activeTab === 'threats' || activeTab === 'reports') && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="relative w-full sm:w-52">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search email, IP, category..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#84E000]"
                />
              </div>

              {activeTab === 'threats' ? (
                <>
                  <select
                    value={severityFilter}
                    onChange={e => setSeverityFilter(e.target.value as any)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="all">All Severities</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value as any)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="open">Open</option>
                    <option value="auto_blocked">Auto-Enforced</option>
                    <option value="investigating">Investigating</option>
                    <option value="resolved">Resolved</option>
                    <option value="dismissed">Dismissed</option>
                  </select>
                </>
              ) : (
                <select
                  value={reportFilter}
                  onChange={e => setReportFilter(e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="all">All Reports</option>
                  <option value="pending">Pending</option>
                  <option value="investigating">Investigating</option>
                  <option value="resolved">Resolved</option>
                  <option value="dismissed">Dismissed</option>
                </select>
              )}
            </div>
          )}
        </div>

        {/* TAB 1: INCIDENTS & THREATS */}
        {activeTab === 'threats' && (
          filteredIncidents.length === 0 ? (
            <div className="py-12 px-4 text-center space-y-2">
              <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="text-sm font-semibold text-white">No Matching Security Incidents</p>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Automated server and client guards are actively monitoring auth brute-force, Paystack replays, chat spam, XP spikes, and unauthorized admin probes.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {filteredIncidents.map(inc => {
                const actorTarget = inc.actorUserId || inc.actorEmail;
                return (
                  <div
                    key={inc.id}
                    className="p-4 hover:bg-slate-950/60 transition-colors space-y-2.5"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          {renderSeverityLabel(inc.severity)}
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span className="font-mono text-[11px] text-slate-300 uppercase">
                            {inc.category.replace('_', ' ')}
                          </span>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span className="text-[11px] text-slate-400">
                            {inc.source === 'server_guard'
                              ? 'Server Guard'
                              : inc.source === 'client_guard'
                              ? 'Client Guard'
                              : 'User Report'}
                          </span>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          {renderStatusLabel(inc.status)}
                        </div>
                        <h3 className="text-sm font-bold text-white">{inc.title}</h3>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono tabular-nums shrink-0">
                        {new Date(inc.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{inc.description}</p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400 font-mono">
                      {actorTarget && (
                        <span>
                          Actor: <strong className="text-slate-200">{inc.actorEmail || inc.actorUserId}</strong>
                        </span>
                      )}
                      {inc.ipAddress && (
                        <span className="inline-flex items-center gap-1">
                          <Globe className="w-3 h-3 text-slate-500" />
                          IP: <strong className="text-slate-200">{inc.ipAddress}</strong>
                        </span>
                      )}
                      {inc.deviceFingerprint && inc.deviceFingerprint !== 'unknown-fp' && (
                        <span className="inline-flex items-center gap-1">
                          <Cpu className="w-3 h-3 text-slate-500" />
                          FP: <strong className="text-slate-200">{inc.deviceFingerprint}</strong>
                        </span>
                      )}
                      {inc.endpoint && <span>Endpoint: {inc.endpoint}</span>}
                      {inc.actionTaken && (
                        <span className="text-emerald-400">Action: {inc.actionTaken}</span>
                      )}
                    </div>

                    {/* Action Controls */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {actorTarget && renderTargetQuickControls(actorTarget, { incidentId: inc.id, contextTitle: inc.title })}

                      {inc.ipAddress && inc.ipAddress !== 'unknown-ip' && (
                        <button
                          type="button"
                          disabled={isActing}
                          onClick={() =>
                            executeSecurityAction({
                              action: 'block_ip',
                              targetValue: inc.ipAddress,
                              incidentId: inc.id,
                              reason: `IP blocked from incident: ${inc.title}`
                            })
                          }
                          className="px-2.5 min-h-[34px] rounded-lg bg-slate-950 hover:bg-amber-950/60 border border-slate-700 hover:border-amber-600/60 text-amber-300 text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                        >
                          <Ban className="w-3 h-3" />
                          <span>Block IP</span>
                        </button>
                      )}

                      {inc.deviceFingerprint && inc.deviceFingerprint !== 'unknown-fp' && (
                        <button
                          type="button"
                          disabled={isActing}
                          onClick={() =>
                            executeSecurityAction({
                              action: 'block_device',
                              targetValue: inc.deviceFingerprint,
                              incidentId: inc.id,
                              reason: `Device fingerprint blocked from incident: ${inc.title}`
                            })
                          }
                          className="px-2.5 min-h-[34px] rounded-lg bg-slate-950 hover:bg-amber-950/60 border border-slate-700 hover:border-amber-600/60 text-amber-300 text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                        >
                          <Lock className="w-3 h-3" />
                          <span>Block Device</span>
                        </button>
                      )}

                      {inc.status !== 'resolved' && inc.status !== 'dismissed' && (
                        <>
                          <button
                            type="button"
                            disabled={isActing}
                            onClick={() =>
                              executeSecurityAction({
                                action: 'resolve_incident',
                                incidentId: inc.id
                              })
                            }
                            className="px-2.5 min-h-[34px] rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 ml-auto"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Resolve</span>
                          </button>

                          <button
                            type="button"
                            disabled={isActing}
                            onClick={() =>
                              executeSecurityAction({
                                action: 'dismiss_incident',
                                incidentId: inc.id
                              })
                            }
                            className="px-2.5 min-h-[34px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold cursor-pointer whitespace-nowrap shrink-0"
                          >
                            Dismiss
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}

        {/* TAB 2: ACTIONABLE USER REPORTS QUEUE */}
        {activeTab === 'reports' && (
          filteredReports.length === 0 ? (
            <div className="py-12 px-4 text-center space-y-2">
              <Flag className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="text-sm font-semibold text-white">No User Security Reports Found</p>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Reports filed by Students, Parents, Tutors, Growth Partners, and School Admins appear here with one-click Modify, Lock, Suspend, Wallet Freeze, and Soft-Delete controls.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {filteredReports.map(rep => {
                const suspect = rep.suspectIdentifier;
                return (
                  <div key={rep.id} className="p-4 hover:bg-slate-950/60 transition-colors space-y-2.5">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          {renderReportStatusLabel(rep.status)}
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span className="font-mono text-[11px] text-amber-300 uppercase font-bold">
                            {rep.category.replace('_', ' ')}
                          </span>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span className="text-[11px] text-slate-400">
                            Reporter: <strong className="text-slate-200">{rep.reporterName || rep.reporterUserId}</strong> ({rep.reporterRole || 'user'})
                          </span>
                        </div>
                        {suspect ? (
                          <h3 className="text-sm font-bold text-rose-300 font-mono">
                            Suspect Account: {suspect}
                          </h3>
                        ) : (
                          <h3 className="text-sm font-bold text-white">
                            Platform Safety Report ({rep.category.replace('_', ' ')})
                          </h3>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono tabular-nums shrink-0">
                        {new Date(rep.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed bg-slate-950 border border-slate-800 rounded-xl p-3">
                      {rep.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400 font-mono">
                      <span>Report ID: {rep.id}</span>
                      {rep.evidenceContext && <span>Context: {rep.evidenceContext}</span>}
                      {rep.actionTaken && (
                        <span className="text-emerald-400 font-semibold">Action: {rep.actionTaken}</span>
                      )}
                      {rep.resolvedBy && <span>Handled by: {rep.resolvedBy}</span>}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {suspect && renderTargetQuickControls(suspect, { reportId: rep.id, contextTitle: `User Report (${rep.category})` })}

                      {rep.status !== 'resolved' && rep.status !== 'dismissed' && (
                        <div className="flex items-center gap-2 ml-auto">
                          {rep.status === 'pending' && (
                            <button
                              type="button"
                              disabled={isActing}
                              onClick={() =>
                                executeSecurityAction({
                                  action: 'investigate_report',
                                  reportId: rep.id
                                })
                              }
                              className="px-2.5 min-h-[34px] rounded-lg bg-amber-950/70 hover:bg-amber-900 border border-amber-700/70 text-amber-200 text-[11px] font-semibold cursor-pointer whitespace-nowrap shrink-0"
                            >
                              Investigate
                            </button>
                          )}
                          <button
                            type="button"
                            disabled={isActing}
                            onClick={() =>
                              executeSecurityAction({
                                action: 'resolve_report',
                                reportId: rep.id
                              })
                            }
                            className="px-2.5 min-h-[34px] rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Mark Resolved</span>
                          </button>
                          <button
                            type="button"
                            disabled={isActing}
                            onClick={() =>
                              executeSecurityAction({
                                action: 'dismiss_report',
                                reportId: rep.id
                              })
                            }
                            className="px-2.5 min-h-[34px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold cursor-pointer whitespace-nowrap shrink-0"
                          >
                            Dismiss
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}

        {/* TAB 3: ACTIVE BLOCKS & TOMBSTONES */}
        {activeTab === 'blocks' && (
          activeBlocks.length === 0 ? (
            <div className="py-12 px-4 text-center space-y-2">
              <Unlock className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="text-sm font-semibold text-white">No Active Blocks, Locks, or Frozen Wallets</p>
              <p className="text-xs text-slate-400">
                All accounts, IP addresses, device fingerprints, and parent wallets are currently unrestricted.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {activeBlocks.map(blk => {
                const isDeletedBlock = blk.blockType === 'account_delete';
                const isLockBlock = blk.blockType === 'account_lock';
                return (
                  <div
                    key={blk.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span
                          className={`font-bold uppercase font-mono ${
                            isLockBlock
                              ? 'text-amber-400'
                              : isDeletedBlock
                              ? 'text-slate-300'
                              : 'text-rose-400'
                          }`}
                        >
                          {blk.blockType.replace('_', ' ')}
                        </span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="font-mono font-bold text-white">{blk.targetValue}</span>
                        {blk.expiresAt && (
                          <>
                            <span aria-hidden="true" className="text-slate-600">·</span>
                            <span className="text-[11px] text-amber-300 font-mono tabular-nums">
                              Expires {new Date(blk.expiresAt).toLocaleString()}
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text-xs text-slate-300">{blk.reason}</p>
                      <p className="text-[11px] text-slate-500 font-mono">
                        Issued by {blk.createdBy} · {new Date(blk.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {isDeletedBlock ? (
                      <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-[11px] font-mono shrink-0">
                        Soft-Deleted Tombstone (Audit Kept)
                      </span>
                    ) : (
                      <button
                        type="button"
                        disabled={isActing}
                        onClick={() => {
                          const liftAction =
                            blk.blockType === 'account_lock'
                              ? 'unlock_account'
                              : blk.blockType === 'account_suspend'
                              ? 'unsuspend_account'
                              : blk.blockType === 'wallet_freeze'
                              ? 'unfreeze_wallet'
                              : 'unblock_target';
                          void executeSecurityAction({
                            action: liftAction,
                            blockId: blk.id,
                            targetValue: blk.targetValue
                          });
                        }}
                        className="px-3.5 min-h-[38px] rounded-xl bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <Unlock className="w-3.5 h-3.5" />
                        <span>
                          {blk.blockType === 'account_lock'
                            ? 'Unlock Account'
                            : blk.blockType === 'account_suspend'
                            ? 'Reactivate Account'
                            : blk.blockType === 'wallet_freeze'
                            ? 'Unfreeze Wallet'
                            : 'Lift Block'}
                        </span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )
        )}

        {/* TAB 4: AUTOMATED ENFORCEMENT RULES */}
        {activeTab === 'automation' && (
          <div className="p-4 sm:p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-sm font-bold text-white">Automated Enforcement Rules</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Configure automatic timed locks on spam/brute-force and automatic account suspension + wallet freezes on fraud, hacking, or multi-report thresholds.
                </p>
              </div>
              {policy.updatedAt && (
                <span className="text-[11px] font-mono text-slate-400 tabular-nums shrink-0">
                  Last saved {new Date(policy.updatedAt).toLocaleString()}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Rule 1: Spam & Phishing Auto-Lock */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-white text-xs">Auto-Lock on Spam &amp; Phishing</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Timed lock triggered when repeated spam bursts or phishing links are detected.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPolicy(p => ({ ...p, autoLockOnSpam: !p.autoLockOnSpam }))}
                    className={`px-3 py-1.5 rounded-lg font-bold text-[11px] cursor-pointer shrink-0 ${
                      policy.autoLockOnSpam
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {policy.autoLockOnSpam ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Violation Threshold</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={policy.spamBurstThreshold}
                      onChange={e => setPolicy(p => ({ ...p, spamBurstThreshold: Number(e.target.value) }))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono tabular-nums focus:outline-none focus:border-[#84E000]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Lock Duration (mins)</label>
                    <input
                      type="number"
                      min={5}
                      max={10080}
                      value={policy.spamLockDurationMinutes}
                      onChange={e => setPolicy(p => ({ ...p, spamLockDurationMinutes: Number(e.target.value) }))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono tabular-nums focus:outline-none focus:border-[#84E000]"
                    />
                  </div>
                </div>
              </div>

              {/* Rule 2: Brute-Force Auto-Lock */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-white text-xs">Auto-Lock on Brute-Force Auth / PIN</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Applies timed cooldown and wallet hold after 5 failed PIN or sign-in attempts.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPolicy(p => ({ ...p, autoLockOnBruteForce: !p.autoLockOnBruteForce }))}
                    className={`px-3 py-1.5 rounded-lg font-bold text-[11px] cursor-pointer shrink-0 ${
                      policy.autoLockOnBruteForce
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {policy.autoLockOnBruteForce ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Cooldown Lock Duration (mins)</label>
                  <input
                    type="number"
                    min={5}
                    max={1440}
                    value={policy.bruteForceLockDurationMinutes}
                    onChange={e =>
                      setPolicy(p => ({ ...p, bruteForceLockDurationMinutes: Number(e.target.value) }))
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono tabular-nums focus:outline-none focus:border-[#84E000]"
                  />
                </div>
              </div>

              {/* Rule 3: Fraud & Hacking Auto-Suspend + Wallet Freeze */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-white text-xs">Fraud, Replay &amp; Hacking Containment</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Triggered automatically on Paystack replay, tampered payloads, withdrawal velocity spikes, or admin probes.
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-200 font-semibold">Indefinite Auto-Suspend on Fraud</span>
                  <button
                    type="button"
                    onClick={() => setPolicy(p => ({ ...p, autoSuspendOnFraud: !p.autoSuspendOnFraud }))}
                    className={`px-3 py-1 rounded-lg font-bold text-[11px] cursor-pointer ${
                      policy.autoSuspendOnFraud ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {policy.autoSuspendOnFraud ? 'Active' : 'Off'}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-200 font-semibold">Auto-Freeze Wallet on Fraud</span>
                  <button
                    type="button"
                    onClick={() => setPolicy(p => ({ ...p, autoFreezeWalletOnFraud: !p.autoFreezeWalletOnFraud }))}
                    className={`px-3 py-1 rounded-lg font-bold text-[11px] cursor-pointer ${
                      policy.autoFreezeWalletOnFraud ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {policy.autoFreezeWalletOnFraud ? 'Active' : 'Off'}
                  </button>
                </div>
              </div>

              {/* Rule 4: Multi-Report Velocity Auto-Enforcement */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-white text-xs">Multi-Report Auto-Enforcement (24h)</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Auto-locks spam suspects and auto-suspends + freezes wallets when fraud/hacking reports accumulate.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPolicy(p => ({ ...p, autoEnforceOnReports: !p.autoEnforceOnReports }))}
                    className={`px-3 py-1.5 rounded-lg font-bold text-[11px] cursor-pointer shrink-0 ${
                      policy.autoEnforceOnReports
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {policy.autoEnforceOnReports ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Reports &rarr; Auto-Lock</label>
                    <input
                      type="number"
                      min={2}
                      max={10}
                      value={policy.reportAutoLockThreshold}
                      onChange={e =>
                        setPolicy(p => ({ ...p, reportAutoLockThreshold: Number(e.target.value) }))
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono tabular-nums focus:outline-none focus:border-[#84E000]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Reports &rarr; Auto-Suspend</label>
                    <input
                      type="number"
                      min={2}
                      max={15}
                      value={policy.reportAutoSuspendThreshold}
                      onChange={e =>
                        setPolicy(p => ({ ...p, reportAutoSuspendThreshold: Number(e.target.value) }))
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono tabular-nums focus:outline-none focus:border-[#84E000]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                disabled={isActing}
                onClick={() =>
                  executeSecurityAction({
                    action: 'update_automation_policy',
                    policy
                  })
                }
                className="px-5 min-h-[40px] rounded-xl bg-[#84E000] hover:bg-[#75c900] disabled:opacity-50 text-slate-950 font-black text-xs cursor-pointer transition-colors"
              >
                {isActing ? 'Saving...' : 'Save Automation Rules'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* In-App Soft-Delete & PII Scrub Confirmation Modal */}
      {deleteConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#0B1526] border border-rose-800/80 w-full max-w-md rounded-2xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-950/80 border border-rose-700/70 flex items-center justify-center text-rose-400 shrink-0">
                  <Trash2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Confirm Soft-Delete &amp; PII Scrub</h3>
                  <p className="text-[11px] text-slate-400 font-mono">{deleteConfirmModal.targetValue}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDeleteConfirmModal(null)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              This action permanently closes <strong className="text-white">{deleteConfirmModal.targetValue}</strong>, scrubs profile PII to{' '}
              <span className="font-mono text-rose-300">Deleted Account</span>, blocks future sign-ins, and retains security &amp; fraud audit logs.
            </p>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Audit Reason (Preserved in Security Log)
              </label>
              <textarea
                rows={3}
                value={deleteConfirmModal.reason}
                onChange={e =>
                  setDeleteConfirmModal(prev => (prev ? { ...prev, reason: e.target.value } : null))
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setDeleteConfirmModal(null)}
                className="px-4 min-h-[38px] rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isActing || !deleteConfirmModal.reason.trim()}
                onClick={async () => {
                  const modalData = deleteConfirmModal;
                  setDeleteConfirmModal(null);
                  await executeSecurityAction({
                    action: 'delete_account',
                    targetValue: modalData.targetValue,
                    reason: modalData.reason,
                    incidentId: modalData.incidentId,
                    reportId: modalData.reportId
                  });
                }}
                className="px-4 min-h-[38px] rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Soft-Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
