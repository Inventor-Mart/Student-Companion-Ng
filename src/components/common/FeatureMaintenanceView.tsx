import React from 'react';
import { useApp } from '../../context/AppContext';
import { OTAFeatureKey } from '../../types';
import { resolveFeatureNotice } from '../../services/otaService';
import { PauseCircle, Clock, ArrowLeft, ShieldAlert } from 'lucide-react';

interface FeatureMaintenanceViewProps {
  featureKey: OTAFeatureKey;
  onReturnHome?: () => void;
}

export const FeatureMaintenanceView: React.FC<FeatureMaintenanceViewProps> = ({
  featureKey,
  onReturnHome
}) => {
  const { otaFeatureFlags, setActiveStudentTab, currentRole } = useApp();
  const flag = otaFeatureFlags[featureKey];
  const notice = resolveFeatureNotice(flag);

  return (
    <div className="flex-1 w-full flex items-center justify-center p-4 sm:p-6 bg-[#070D18] text-slate-100">
      <div className="w-full max-w-md bg-[#0B1526] border border-amber-500/50 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto">
          <PauseCircle className="w-7 h-7" />
        </div>

        <div className="space-y-1.5">
          <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-[11px] font-bold uppercase tracking-wider text-amber-300">
            {notice.badge}
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white">
            {notice.headline}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
            {notice.message}
          </p>
        </div>

        {notice.eta && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono tabular-nums">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>ETA: {notice.eta}</span>
          </div>
        )}

        {(onReturnHome || currentRole === 'student') && (
          <button
            type="button"
            onClick={() => {
              if (onReturnHome) {
                onReturnHome();
              } else {
                setActiveStudentTab('dashboard');
              }
            }}
            className="w-full min-h-[44px] rounded-xl bg-[#FF5B00] hover:bg-[#E04F00] text-white text-xs font-black flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home Dashboard</span>
          </button>
        )}
      </div>
    </div>
  );
};

interface FeatureMaintenanceGateProps {
  featureKey: OTAFeatureKey;
  children: React.ReactNode;
  onReturnHome?: () => void;
}

export const FeatureMaintenanceGate: React.FC<FeatureMaintenanceGateProps> = ({
  featureKey,
  children,
  onReturnHome
}) => {
  const { isFeatureBlockedForCurrentUser, isFeaturePaused, isSuperAdmin, otaFeatureFlags } = useApp();

  if (isFeatureBlockedForCurrentUser(featureKey)) {
    return <FeatureMaintenanceView featureKey={featureKey} onReturnHome={onReturnHome} />;
  }

  const pausedByAdmin = isSuperAdmin && isFeaturePaused(featureKey);
  const label = otaFeatureFlags[featureKey]?.label || featureKey;

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col overflow-hidden">
      {pausedByAdmin && (
        <div className="w-full bg-amber-950/75 border-b border-amber-700/60 px-3 py-1.5 flex items-center gap-2 text-[11px] text-amber-200 shrink-0">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate font-medium">
            Super Admin Bypass: <strong>{label}</strong> is currently paused for standard users.
          </span>
        </div>
      )}
      {children}
    </div>
  );
};
