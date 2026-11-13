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
  Eye
} from 'lucide-react';
import {
  SecurityIncident,
  SecurityReport,
  SecurityBlock,
  SecuritySeverity,
  SecurityIncidentStatus
} from '../../types';
import { useApp } from '../../context/AppContext';
import { getSecurityHeaders } from '../../utils/securityGuard';

interface SecurityTrustCenterProps {
  adminEmail: string;
  onBack: () => void;
}

interface SecuritySummary {
  openThreats: number;
  criticalCount: number;
  autoBlockedCount: number;
  suspendedAccountsCount: number;
  frozenWalletsCount: number;
  pendingReportsCount: number;
}

export const SecurityTrustCenter: React.FC<SecurityTrustCenterProps> = ({
  adminEmail,
  onBack
}) => {
  const { updateUserRecord, allRegisteredUsers } = useApp();

  const [incidents, setIncidents] = useState<SecurityIncident[]>([]);
  const [reports, setReports] = useState<SecurityReport[]>([]);
  const [blocks, setBlocks] = useState<SecurityBlock[]>([]);
  const [summary, setSummary] = useState<SecuritySummary>({
    openThreats: 0,
    criticalCount: 0,
    autoBlockedCount: 0,
    suspendedAccountsCount: 0,
    frozenWalletsCount: 0,
    pendingReportsCount: 0
  });

  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'threats' | 'blocks'>('threats');
  const [severityFilter, setSeverityFilter] = useState<'all' | SecuritySeverity>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | SecurityIncidentStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Quick manual enforcement form
  const [manualActionType, setManualActionType] = useState<
    'suspend_account' | 'freeze_wallet' | 'block_ip' | 'block_device'
  >('block_ip');
  const [manualTarget, setManualTarget] = useState('');
  const [manualReason, setManualReason] = useState('');
  const [isActing, setIsActing] = useState(false);

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

  const executeSecurityAction = async (payload: {
    action: string;
    targetValue?: string;
    reason?: string;
    incidentId?: string;
    reportId?: string;
    blockId?: string;
  }) => {
    setIsActing(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/security/action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getSecurityHeaders({ userEmail: adminEmail })
        },
        body: JSON.stringify({
          adminEmail,
          ...payload
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setFeedback({ type: 'error', text: data.error || 'Action failed.' });
      } else {
        // Mirror account suspension / wallet freeze into local directory state if target matches a user
        if (payload.targetValue) {
          const matchedUser = allRegisteredUsers.find(
            u =>
              u.id === payload.targetValue ||
              u.email.toLowerCase() === payload.targetValue!.toLowerCase()
          );
          if (matchedUser) {
            if (payload.action === 'suspend_account') {
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
    await executeSecurityAction({
      action: manualActionType,
      targetValue: manualTarget.trim(),
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
        return <span className="text-rose-400 font-bold text-[11px]">Auto-Blocked</span>;
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
              Fraud, spam, Paystack replay, PIN brute-force &amp; hacking enforcement · {adminEmail}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadOverview}
            disabled={isLoading}
            className="px-3 min-h-[38px] rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh Feed</span>
          </button>
          <button
            type="button"
            onClick={onBack}
            className="px-3 min-h-[38px] rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold cursor-pointer whitespace-nowrap"
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
            {summary.criticalCount} critical · {summary.pendingReportsCount} user reports
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
            <span>Suspended Accounts</span>
            <UserX className="w-4 h-4 text-[#FF5B00]" />
          </div>
          <div className="text-2xl font-black text-white mt-1.5 font-mono tabular-nums">
            {summary.suspendedAccountsCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Full portal lockout active
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
        className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-end gap-3 text-xs"
      >
        <div className="w-full md:w-48">
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
            Manual Action
          </label>
          <select
            value={manualActionType}
            onChange={e => setManualActionType(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#84E000]"
          >
            <option value="block_ip">Block IP Address</option>
            <option value="block_device">Block Device Fingerprint</option>
            <option value="suspend_account">Suspend User Account</option>
            <option value="freeze_wallet">Freeze Wallet / Payouts</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
            Target Email, User ID, IP, or Fingerprint
          </label>
          <input
            type="text"
            value={manualTarget}
            onChange={e => setManualTarget(e.target.value)}
            placeholder="e.g. 102.89.33.14, usr-123, or user@email.com"
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
          className="px-4 min-h-[38px] rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold cursor-pointer whitespace-nowrap transition-colors"
        >
          Apply Block
        </button>
      </form>

      {/* Main Panel: Tabs & Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('threats')}
              className={`px-3.5 min-h-[38px] rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap transition-colors ${
                activeTab === 'threats'
                  ? 'bg-[#84E000] text-slate-950'
                  : 'bg-slate-950 text-slate-300 border border-slate-800 hover:text-white'
              }`}
            >
              Incidents &amp; Reports ({incidents.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('blocks')}
              className={`px-3.5 min-h-[38px] rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap transition-colors ${
                activeTab === 'blocks'
                  ? 'bg-[#84E000] text-slate-950'
                  : 'bg-slate-950 text-slate-300 border border-slate-800 hover:text-white'
              }`}
            >
              Active Blocks &amp; Freezes ({activeBlocks.length})
            </button>
          </div>

          {activeTab === 'threats' && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="relative w-full sm:w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search email, IP, category..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#84E000]"
                />
              </div>

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
                <option value="auto_blocked">Auto-Blocked</option>
                <option value="investigating">Investigating</option>
                <option value="resolved">Resolved</option>
                <option value="dismissed">Dismissed</option>
              </select>
            </div>
          )}
        </div>

        {activeTab === 'threats' ? (
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
                      {actorTarget && (
                        <>
                          <button
                            type="button"
                            disabled={isActing}
                            onClick={() =>
                              executeSecurityAction({
                                action: 'freeze_wallet',
                                targetValue: actorTarget,
                                incidentId: inc.id,
                                reason: `Wallet frozen from incident: ${inc.title}`
                              })
                            }
                            className="px-2.5 min-h-[34px] rounded-lg bg-slate-950 hover:bg-sky-950/60 border border-slate-700 hover:border-sky-600/60 text-sky-300 text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                          >
                            <Snowflake className="w-3 h-3" />
                            <span>Freeze Wallet</span>
                          </button>

                          <button
                            type="button"
                            disabled={isActing}
                            onClick={() =>
                              executeSecurityAction({
                                action: 'suspend_account',
                                targetValue: actorTarget,
                                incidentId: inc.id,
                                reason: `Account suspended from incident: ${inc.title}`
                              })
                            }
                            className="px-2.5 min-h-[34px] rounded-lg bg-slate-950 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-600/60 text-rose-300 text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                          >
                            <UserX className="w-3 h-3" />
                            <span>Suspend Account</span>
                          </button>
                        </>
                      )}

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
                          className="px-2.5 min-h-[34px] rounded-lg bg-slate-950 hover:bg-amber-950/60 border border-slate-700 hover:border-amber-600/60 text-amber-300 text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
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
                          className="px-2.5 min-h-[34px] rounded-lg bg-slate-950 hover:bg-amber-950/60 border border-slate-700 hover:border-amber-600/60 text-amber-300 text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
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
                            className="px-2.5 min-h-[34px] rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap ml-auto"
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
                            className="px-2.5 min-h-[34px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold cursor-pointer whitespace-nowrap"
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
        ) : activeBlocks.length === 0 ? (
          <div className="py-12 px-4 text-center space-y-2">
            <Unlock className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="text-sm font-semibold text-white">No Active Blocks or Frozen Wallets</p>
            <p className="text-xs text-slate-400">
              All accounts, IP addresses, device fingerprints, and parent wallets are currently unrestricted.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800">
            {activeBlocks.map(blk => (
              <div
                key={blk.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-rose-400 uppercase font-mono">
                      {blk.blockType.replace('_', ' ')}
                    </span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="font-mono font-bold text-white">{blk.targetValue}</span>
                    {blk.expiresAt && (
                      <>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-[11px] text-amber-300 font-mono tabular-nums">
                          Expires {new Date(blk.expiresAt).toLocaleTimeString()}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-slate-300">{blk.reason}</p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    Issued by {blk.createdBy} · {new Date(blk.createdAt).toLocaleString()}
                  </p>
                </div>

                <button
                  type="button"
                  disabled={isActing}
                  onClick={() => {
                    const liftAction =
                      blk.blockType === 'account_suspend'
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
                    {blk.blockType === 'account_suspend'
                      ? 'Reactivate Account'
                      : blk.blockType === 'wallet_freeze'
                      ? 'Unfreeze Wallet'
                      : 'Lift Block'}
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Reports Summary Strip */}
      {reports.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2.5">
          <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Direct User Security Reports ({reports.length})
          </h2>
          <div className="divide-y divide-slate-800">
            {reports.slice(0, 10).map(rep => (
              <div key={rep.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="font-bold text-white">{rep.reporterName || rep.reporterUserId}</span>
                    <span aria-hidden="true">·</span>
                    <span className="uppercase font-mono text-amber-300">{rep.category}</span>
                    {rep.suspectIdentifier && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-rose-300 font-mono">Target: {rep.suspectIdentifier}</span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-300 truncate mt-0.5">{rep.description}</p>
                </div>
                <span className="text-[11px] font-mono text-slate-400 shrink-0 uppercase">
                  {rep.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
