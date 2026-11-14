import React, { useState } from 'react';
import {
  ArrowUpCircle,
  CheckCircle2,
  Download,
  ExternalLink,
  Lock,
  PauseCircle,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Wrench,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OTAAppReleaseConfig, OTAUpgradeMode } from '../../types';
import {
  DEFAULT_PAUSED_FEATURE_MESSAGE,
  compareSemver,
  isValidSafeExternalUrl,
  normalizeSemver
} from '../../services/otaService';

export interface AppUpdateGatePreviewOverride {
  mode: OTAUpgradeMode | 'maintenance';
  release: OTAAppReleaseConfig;
  onClosePreview: () => void;
}

interface AppUpdateGateProps {
  previewOverride?: AppUpdateGatePreviewOverride | null;
}

export const AppUpdateGate: React.FC<AppUpdateGateProps> = ({ previewOverride }) => {
  const {
    otaAppRelease,
    installedAppVersion,
    isCurrentReleaseDismissed,
    applyOTAUpgrade,
    dismissOTAPrompt,
    isSuperAdmin,
    isAuthenticated,
    currentScreen,
    setCurrentScreen
  } = useApp();

  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeDoneVersion, setUpgradeDoneVersion] = useState<string | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  const activeRelease = previewOverride ? previewOverride.release : otaAppRelease;
  const effectiveInstalledVersion = previewOverride
    ? '2.1.0'
    : normalizeSemver(installedAppVersion);

  const hasNewerVersion =
    compareSemver(effectiveInstalledVersion, activeRelease.latestVersion) < 0;
  const belowMinimum =
    compareSemver(effectiveInstalledVersion, activeRelease.minimumSupportedVersion) < 0;

  const hasSafeDownloadUrl = isValidSafeExternalUrl(activeRelease.downloadUrl);

  const handleUpgradeNow = async () => {
    if (previewOverride) {
      setIsUpgrading(true);
      await new Promise((resolve) => window.setTimeout(resolve, 500));
      setIsUpgrading(false);
      setUpgradeDoneVersion(activeRelease.latestVersion);
      window.setTimeout(() => {
        setUpgradeDoneVersion(null);
        previewOverride.onClosePreview();
      }, 900);
      return;
    }

    setIsUpgrading(true);
    try {
      const upgradedTo = await applyOTAUpgrade();
      setUpgradeDoneVersion(upgradedTo);
      window.setTimeout(() => {
        setUpgradeDoneVersion(null);
      }, 2200);
    } finally {
      setIsUpgrading(false);
    }
  };

  // Never interrupt the initial 3s splash or admin sign-in flow when live
  if (!previewOverride && (currentScreen === 'splash' || currentScreen === 'signin')) {
    return null;
  }

  // Determine active prompt mode
  let resolvedState: 'none' | 'admin_notice' | 'mild' | 'recommended' | 'mandatory' | 'maintenance' =
    'none';

  if (previewOverride) {
    resolvedState = previewOverride.mode;
  } else if (isSuperAdmin) {
    // Super Admin is ALWAYS exempted from maintenance/mandatory locks
    if (
      activeRelease.maintenanceMode ||
      belowMinimum ||
      (hasNewerVersion && activeRelease.upgradeMode === 'mandatory')
    ) {
      resolvedState = 'admin_notice';
    } else if (hasNewerVersion && !isCurrentReleaseDismissed) {
      resolvedState = activeRelease.upgradeMode;
    }
  } else {
    if (activeRelease.maintenanceMode) {
      resolvedState = 'maintenance';
    } else if (belowMinimum || (hasNewerVersion && activeRelease.upgradeMode === 'mandatory')) {
      resolvedState = 'mandatory';
    } else if (hasNewerVersion && !isCurrentReleaseDismissed) {
      resolvedState = activeRelease.upgradeMode;
    }
  }

  if (resolvedState === 'none') {
    if (upgradeDoneVersion) {
      return (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[110] px-4 py-2.5 rounded-xl bg-emerald-950/95 border border-emerald-500/60 text-emerald-100 text-xs font-bold shadow-2xl flex items-center gap-2 whitespace-nowrap">
          <CheckCircle2 className="w-4 h-4 text-[#84E000] shrink-0" />
          <span className="font-mono tabular-nums">
            OTA Update Installed · v{upgradeDoneVersion}
          </span>
        </div>
      );
    }
    return null;
  }

  // 1. SUPER ADMIN NON-BLOCKING BYPASS INDICATOR
  if (resolvedState === 'admin_notice') {
    return (
      <div className="w-full bg-[#131F38] border-b border-amber-500/40 text-amber-100 px-3 sm:px-4 py-2 z-40">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <ShieldCheck className="w-4 h-4 text-[#84E000] shrink-0" />
            <span className="font-semibold truncate">
              {activeRelease.maintenanceMode
                ? 'Maintenance Lock Active for Non-Admin Users (Super Admin Unlocked)'
                : `Mandatory Upgrade Lock (v${activeRelease.latestVersion}) Active for Non-Admins`}
            </span>
          </div>
          {hasNewerVersion && (
            <button
              type="button"
              onClick={handleUpgradeNow}
              disabled={isUpgrading}
              className="px-2.5 py-1 rounded-lg bg-[#84E000] hover:bg-[#74c700] text-slate-950 font-black text-[11px] whitespace-nowrap shrink-0 cursor-pointer transition-colors"
            >
              {isUpgrading ? 'Syncing...' : `Sync Local v${activeRelease.latestVersion}`}
            </button>
          )}
        </div>
      </div>
    );
  }

  // 2. MILD NOTIFICATION BANNER (Dismissible, <=15% height)
  if (resolvedState === 'mild') {
    return (
      <div
        role="region"
        aria-label="App Update Available"
        className="w-full bg-[#0F1E38] border-b border-[#84E000]/45 text-slate-100 px-3 sm:px-4 py-2.5 z-[85] shadow-lg"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#84E000]/15 border border-[#84E000]/40 flex items-center justify-center text-[#84E000] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-white truncate">
                  {activeRelease.releaseTitle || `Update v${activeRelease.latestVersion} available`}
                </span>
                <span className="text-[11px] font-mono tabular-nums text-[#84E000] font-bold shrink-0">
                  v{activeRelease.latestVersion}
                </span>
              </div>
              {activeRelease.featureHighlights[0] && (
                <p className="text-[11px] text-slate-300 truncate">
                  {activeRelease.featureHighlights[0]}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {hasSafeDownloadUrl && (
              <a
                href={activeRelease.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 px-2.5 min-h-[34px] rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-[11px] font-bold whitespace-nowrap"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Store</span>
              </a>
            )}

            <button
              type="button"
              onClick={handleUpgradeNow}
              disabled={isUpgrading}
              className="inline-flex items-center gap-1.5 px-3 min-h-[36px] rounded-lg bg-[#84E000] hover:bg-[#74c700] text-slate-950 font-black text-xs whitespace-nowrap shrink-0 cursor-pointer transition-all active:scale-95"
            >
              {isUpgrading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Upgrade Now</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                if (previewOverride) previewOverride.onClosePreview();
                else dismissOTAPrompt();
              }}
              aria-label="Dismiss update banner"
              className="p-2 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. RECOMMENDED UPDATE MODAL (Skippable "What's New" prompt)
  if (resolvedState === 'recommended') {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ota-recommended-title"
        className="fixed inset-0 z-[95] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <div className="w-full max-w-md bg-[#0E182E] border border-[#1E335A] rounded-2xl shadow-2xl overflow-hidden text-slate-100">
          <div className="p-5 border-b border-slate-800 flex items-start justify-between gap-3 bg-gradient-to-r from-[#11203D] to-[#0E182E]">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
                <ArrowUpCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    Recommended Update
                  </span>
                  <span className="text-[11px] font-mono tabular-nums text-[#84E000] font-bold">
                    v{effectiveInstalledVersion} → v{activeRelease.latestVersion}
                  </span>
                </div>
                <h2 id="ota-recommended-title" className="text-base font-black text-white mt-0.5">
                  {activeRelease.releaseTitle}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (previewOverride) previewOverride.onClosePreview();
                else dismissOTAPrompt();
              }}
              aria-label="Close update modal"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 space-y-4">
            {activeRelease.releaseNotes && (
              <p className="text-xs text-slate-300 leading-relaxed">{activeRelease.releaseNotes}</p>
            )}

            {activeRelease.featureHighlights.length > 0 && (
              <div className="bg-[#091122] border border-slate-800 rounded-xl p-3.5 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#84E000]">
                  What&apos;s New
                </p>
                <ul className="space-y-1.5">
                  {activeRelease.featureHighlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#84E000] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleUpgradeNow}
                disabled={isUpgrading}
                className="flex-1 min-h-[44px] px-4 rounded-xl bg-[#84E000] hover:bg-[#74c700] text-slate-950 font-black text-xs flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-all active:scale-95"
              >
                {isUpgrading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Installing OTA Update...</span>
                  </>
                ) : upgradeDoneVersion ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Updated to v{upgradeDoneVersion}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Upgrade Now</span>
                  </>
                )}
              </button>

              {hasSafeDownloadUrl && (
                <a
                  href={activeRelease.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-3.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-100 text-xs font-bold flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Play Store</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => {
                  if (previewOverride) previewOverride.onClosePreview();
                  else dismissOTAPrompt();
                }}
                className="min-h-[44px] px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold whitespace-nowrap cursor-pointer"
              >
                {previewOverride ? 'Close Preview' : 'Remind Me Later'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. MANDATORY FORCE UPGRADE OR MAINTENANCE LOCK SCREEN (Non-dismissible blocking gate)
  const isMaintenance = resolvedState === 'maintenance';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ota-blocking-lock-title"
      className="fixed inset-0 z-[120] bg-[#070D18]/97 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <div className="w-full max-w-md bg-[#0E182E] border-2 border-[#FF5B00]/60 rounded-2xl shadow-2xl overflow-hidden text-slate-100 my-auto">
        <div
          className={`p-5 border-b border-slate-800 flex items-center justify-between gap-3 ${
            isMaintenance
              ? 'bg-gradient-to-r from-amber-950/70 to-[#0E182E]'
              : 'bg-gradient-to-r from-[#2B130B] to-[#0E182E]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${
                isMaintenance
                  ? 'bg-amber-500/20 border-amber-400/50 text-amber-300'
                  : 'bg-[#FF5B00]/20 border-[#FF5B00]/50 text-[#FF5B00]'
              }`}
            >
              {isMaintenance ? <Wrench className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <span
                className={`text-[11px] font-black uppercase tracking-wider block ${
                  isMaintenance ? 'text-amber-300' : 'text-[#FF5B00]'
                }`}
              >
                {isMaintenance ? 'Scheduled OTA Maintenance' : 'Mandatory Update Required'}
              </span>
              <h2 id="ota-blocking-lock-title" className="text-base sm:text-lg font-black text-white">
                {isMaintenance
                  ? 'Platform Temporarily Locked'
                  : activeRelease.releaseTitle || `Upgrade to v${activeRelease.latestVersion}`}
              </h2>
            </div>
          </div>

          {previewOverride && (
            <button
              type="button"
              onClick={previewOverride.onClosePreview}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold whitespace-nowrap cursor-pointer"
            >
              Exit Preview
            </button>
          )}
        </div>

        <div className="p-5 space-y-4">
          {!isMaintenance && (
            <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#091122] border border-slate-800 text-xs font-mono tabular-nums">
              <div>
                <span className="text-slate-400 block text-[10px] font-sans uppercase">
                  Current Version
                </span>
                <span className="text-rose-400 font-bold">v{effectiveInstalledVersion}</span>
              </div>
              <span className="text-slate-600 font-sans">→</span>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px] font-sans uppercase">
                  Required Latest
                </span>
                <span className="text-[#84E000] font-black">v{activeRelease.latestVersion}</span>
              </div>
            </div>
          )}

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {isMaintenance
              ? activeRelease.maintenanceMessage
              : activeRelease.releaseNotes ||
                'A critical update is required to keep your curriculum notes, CBT exams, and scores synced safely. Please upgrade now to continue using Student Companion.'}
          </p>

          {!isMaintenance && activeRelease.featureHighlights.length > 0 && (
            <div className="bg-[#091122] border border-slate-800 rounded-xl p-3.5 space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#84E000]">
                Included in v{activeRelease.latestVersion}
              </p>
              <ul className="space-y-1.5">
                {activeRelease.featureHighlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#84E000] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-2.5 pt-1">
            {(!isMaintenance || hasNewerVersion) && (
              <button
                type="button"
                onClick={handleUpgradeNow}
                disabled={isUpgrading}
                className="w-full min-h-[46px] px-4 rounded-xl bg-[#84E000] hover:bg-[#74c700] text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow-lg transition-all active:scale-95"
              >
                {isUpgrading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Applying OTA Update...</span>
                  </>
                ) : upgradeDoneVersion ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Updated to v{upgradeDoneVersion}!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Upgrade Now to v{activeRelease.latestVersion}</span>
                  </>
                )}
              </button>
            )}

            {isMaintenance && (
              <button
                type="button"
                onClick={() => {
                  setIsCheckingStatus(true);
                  window.setTimeout(() => setIsCheckingStatus(false), 600);
                }}
                className="w-full min-h-[44px] px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isCheckingStatus ? 'animate-spin' : ''}`} />
                <span>{isCheckingStatus ? 'Checking Live Status...' : 'Check Release Status'}</span>
              </button>
            )}

            {hasSafeDownloadUrl && (
              <a
                href={activeRelease.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] px-4 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Download Latest App Package (Store / APK)</span>
              </a>
            )}
          </div>

          {!previewOverride && !isAuthenticated && (
            <div className="pt-2 border-t border-slate-800/80 text-center">
              <button
                type="button"
                onClick={() => setCurrentScreen('signin')}
                className="text-[11px] text-slate-400 hover:text-slate-200 underline cursor-pointer"
              >
                Super Admin? Sign in to manage releases
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface PausedBadgeProps {
  className?: string;
  label?: string;
}

export const PausedBadge: React.FC<PausedBadgeProps> = ({
  className = '',
  label = 'Paused'
}) => (
  <span
    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950/90 border border-amber-400/60 text-amber-300 text-[10px] font-black uppercase tracking-wide whitespace-nowrap shrink-0 shadow-sm ${className}`}
  >
    <PauseCircle className="w-3 h-3 shrink-0" />
    <span>{label}</span>
  </span>
);

interface OTAModulePausedCardProps {
  moduleName: string;
  message?: string;
  actionLabel?: string;
  onBackToDashboard: () => void;
}

export const OTAModulePausedCard: React.FC<OTAModulePausedCardProps> = ({
  moduleName,
  message,
  actionLabel = 'Back to Home Dashboard',
  onBackToDashboard
}) => (
  <div className="flex-1 h-full flex items-center justify-center p-6 bg-[#0B1426] text-slate-100">
    <div className="max-w-sm w-full bg-[#101C34] border border-amber-500/45 rounded-2xl p-6 text-center space-y-3.5 shadow-xl">
      <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-400/45 flex items-center justify-center text-amber-300 mx-auto">
        <PauseCircle className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-[10px] font-black uppercase tracking-wider">
          Feature Temporarily Paused
        </span>
        <h3 className="text-base font-black text-white pt-1">{moduleName}</h3>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed">
        {message?.trim() || DEFAULT_PAUSED_FEATURE_MESSAGE}
      </p>
      <button
        type="button"
        onClick={onBackToDashboard}
        className="w-full min-h-[42px] px-4 rounded-xl bg-[#84E000] hover:bg-[#74c700] text-slate-950 font-black text-xs cursor-pointer transition-colors"
      >
        {actionLabel}
      </button>
    </div>
  </div>
);

export const PausedFeatureModal: React.FC = () => {
  const { pausedFeatureNotice, closePausedFeatureNotice } = useApp();

  if (!pausedFeatureNotice) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ota-paused-feature-title"
      className="fixed inset-0 z-[105] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={closePausedFeatureNotice}
    >
      <div
        className="w-full max-w-sm bg-[#101C34] border border-amber-500/50 rounded-2xl p-5 shadow-2xl text-slate-100 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/45 flex items-center justify-center text-amber-300 shrink-0">
              <PauseCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">
                Temporarily Paused
              </span>
              <h3
                id="ota-paused-feature-title"
                className="text-sm font-black text-white truncate"
              >
                {pausedFeatureNotice.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={closePausedFeatureNotice}
            aria-label="Close notice"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-[#0B1426] border border-slate-800 rounded-xl p-3.5">
          {pausedFeatureNotice.message || DEFAULT_PAUSED_FEATURE_MESSAGE}
        </p>

        <button
          type="button"
          onClick={closePausedFeatureNotice}
          className="w-full min-h-[42px] rounded-xl bg-[#84E000] hover:bg-[#74c700] text-slate-950 font-black text-xs cursor-pointer transition-colors"
        >
          Back to App
        </button>
      </div>
    </div>
  );
};
