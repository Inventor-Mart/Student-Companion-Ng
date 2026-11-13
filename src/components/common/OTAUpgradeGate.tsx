import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowUpCircle,
  CheckCircle2,
  Download,
  ExternalLink,
  RefreshCw,
  ShieldAlert,
  Sparkles,
  X
} from 'lucide-react';

export const OTAUpgradeGate: React.FC = () => {
  const {
    appVersion,
    otaAppRelease,
    isUpdateAvailable,
    isForceUpgradeRequired,
    isMildUpdateDismissed,
    dismissMildUpdate,
    triggerOTAUpgrade,
    isSuperAdmin
  } = useApp();

  const [isUpgrading, setIsUpgrading] = useState(false);
  const [showChangelogModal, setShowChangelogModal] = useState(false);

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    await triggerOTAUpgrade();
  };

  // 1. MANDATORY BLOCKING UPGRADE GATE (Users cannot continue until they upgrade)
  if (isForceUpgradeRequired) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#060C18]/98 backdrop-blur-md flex items-center justify-center p-4 text-slate-100">
        <div className="w-full max-w-md bg-[#0B1526] border border-[#FF5B00]/60 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FF5B00]/15 border border-[#FF5B00]/50 flex items-center justify-center text-[#FF5B00] shrink-0">
              <ArrowUpCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#FF5B00] uppercase tracking-wider">
                Required App Update
              </div>
              <h1 className="text-lg sm:text-xl font-black text-white tracking-tight">
                {otaAppRelease.releaseTitle || `Upgrade to v${otaAppRelease.latestVersion}`}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-slate-300 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5">
            <span>Installed: v{appVersion}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#84E000] font-bold">Required: v{otaAppRelease.latestVersion}</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {otaAppRelease.changelog ||
              'A critical Student Companion update is required before continuing. Upgrade to the latest version to unlock all learning hubs.'}
          </p>

          {otaAppRelease.featureHighlights && otaAppRelease.featureHighlights.length > 0 && (
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 space-y-2">
              <div className="text-[11px] font-bold text-[#84E000] uppercase tracking-wider">
                What is new in v{otaAppRelease.latestVersion}
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {otaAppRelease.featureHighlights.slice(0, 5).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#84E000] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-2.5 pt-1">
            <button
              type="button"
              onClick={() => void handleUpgrade()}
              disabled={isUpgrading}
              className="w-full min-h-[46px] rounded-xl bg-[#FF5B00] hover:bg-[#E04F00] text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-colors"
            >
              {isUpgrading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>
                {isUpgrading
                  ? 'Updating to Latest Version...'
                  : `Upgrade & Reload to v${otaAppRelease.latestVersion}`}
              </span>
            </button>

            {otaAppRelease.upgradeUrl && otaAppRelease.upgradeUrl.trim() && (
              <a
                href={otaAppRelease.upgradeUrl.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[42px] rounded-xl bg-[#14233C] hover:bg-[#1D3254] border border-[#223B63] text-[#84E000] font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Download Latest App Package / Store Update</span>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. SUPER ADMIN LIVE GATE INDICATOR (Admin is never locked out, sees quick status)
  if (isSuperAdmin && otaAppRelease.isActive && otaAppRelease.upgradeMode === 'force_blocking') {
    return (
      <div className="w-full bg-amber-950/70 border-b border-amber-700/60 px-3 py-1.5 flex items-center justify-between gap-2 text-[11px] text-amber-200 shrink-0 z-20">
        <div className="flex items-center gap-1.5 min-w-0">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate font-medium">
            Mandatory Upgrade Gate active for users (target v{otaAppRelease.latestVersion} · installed v{appVersion}). Super Admin bypass active.
          </span>
        </div>
      </div>
    );
  }

  // 3. MILD IN-APP UPGRADE NOTIFICATION BANNER (Dismissible)
  if (isUpdateAvailable && !isMildUpdateDismissed) {
    return (
      <>
        <div className="w-full bg-[#101E36] border-b border-[#84E000]/40 px-3.5 py-2 flex items-center justify-between gap-2.5 text-xs shrink-0 z-20">
          <div className="flex items-center gap-2 min-w-0">
            <Sparkles className="w-4 h-4 text-[#84E000] shrink-0" />
            <div className="min-w-0">
              <span className="font-bold text-white">
                Update Available · v{otaAppRelease.latestVersion}
              </span>
              <span className="hidden sm:inline text-slate-300 ml-1.5">
                — {otaAppRelease.releaseTitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowChangelogModal(true)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-[11px] font-semibold cursor-pointer whitespace-nowrap"
            >
              Details
            </button>
            <button
              type="button"
              onClick={() => void handleUpgrade()}
              disabled={isUpgrading}
              className="px-3 py-1 rounded-lg bg-[#84E000] hover:bg-[#75C800] text-slate-950 text-[11px] font-black cursor-pointer flex items-center gap-1 whitespace-nowrap"
            >
              {isUpgrading ? (
                <RefreshCw className="w-3 h-3 animate-spin" />
              ) : (
                <Download className="w-3 h-3" />
              )}
              <span>{isUpgrading ? 'Updating...' : 'Upgrade'}</span>
            </button>
            <button
              type="button"
              onClick={dismissMildUpdate}
              className="p-1 text-slate-400 hover:text-white cursor-pointer"
              aria-label="Remind me later"
              title="Later"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {showChangelogModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#0B1526] border border-[#1E3356] rounded-2xl p-5 space-y-4 shadow-2xl text-slate-100">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-mono text-[#84E000]">
                    v{appVersion} &rarr; v{otaAppRelease.latestVersion}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    {otaAppRelease.releaseTitle}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowChangelogModal(false)}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{otaAppRelease.changelog}</p>

              {otaAppRelease.featureHighlights?.length > 0 && (
                <ul className="space-y-1.5 text-xs text-slate-200 bg-slate-950 border border-slate-800 rounded-xl p-3">
                  {otaAppRelease.featureHighlights.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#84E000] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => void handleUpgrade()}
                  className="flex-1 min-h-[42px] rounded-xl bg-[#FF5B00] hover:bg-[#E04F00] text-white text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Upgrade & Reload Now</span>
                </button>
                {otaAppRelease.upgradeUrl && otaAppRelease.upgradeUrl.trim() && (
                  <a
                    href={otaAppRelease.upgradeUrl.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-h-[42px] rounded-xl bg-[#14233C] border border-[#223B63] text-[#84E000] text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Store / APK</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
