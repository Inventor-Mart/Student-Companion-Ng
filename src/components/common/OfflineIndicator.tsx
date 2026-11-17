import React from 'react';
import { WifiOff, RefreshCw, CheckCircle2, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OfflineIndicator: React.FC = () => {
  const {
    isOffline,
    browserOnline,
    pendingSyncCount,
    isSyncingOfflineQueue,
    offlineSyncNotice,
    dismissOfflineSyncNotice,
    syncOfflineQueue,
    currentUser,
    currentScreen
  } = useApp();

  const [isWakingCloud, setIsWakingCloud] = React.useState<boolean>(() =>
    typeof window !== 'undefined' ? Boolean((window as any).__SC_CLOUD_WAKING__) : false
  );
  const [wakeDismissed, setWakeDismissed] = React.useState(false);
  const [wakeElapsedSec, setWakeElapsedSec] = React.useState(0);

  React.useEffect(() => {
    const handleWakeChange = (evt: Event) => {
      const waking = Boolean((evt as CustomEvent<{ waking?: boolean }>)?.detail?.waking);
      setIsWakingCloud(waking);
      if (!waking) {
        setWakeDismissed(false);
        setWakeElapsedSec(0);
      }
    };
    window.addEventListener('sc:cloud-wake-change', handleWakeChange);
    return () => window.removeEventListener('sc:cloud-wake-change', handleWakeChange);
  }, []);

  React.useEffect(() => {
    if (!isWakingCloud) {
      setWakeElapsedSec(0);
      return;
    }
    setWakeElapsedSec(2);
    const id = window.setInterval(() => {
      setWakeElapsedSec((sec) => sec + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [isWakingCloud]);

  if (currentScreen === 'splash') return null;

  const showOffline = isOffline || !browserOnline;
  const showSyncing = isSyncingOfflineQueue;
  const showWakingCloud = !showOffline && !showSyncing && isWakingCloud && !wakeDismissed;
  const showPendingWhileOnline = !showOffline && !showWakingCloud && pendingSyncCount > 0 && !isSyncingOfflineQueue;
  const showSyncedNotice = !showOffline && !showSyncing && !showWakingCloud && Boolean(offlineSyncNotice);

  if (!showOffline && !showPendingWhileOnline && !showSyncing && !showWakingCloud && !showSyncedNotice) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-[calc(100vw-24px)] pointer-events-auto"
    >
      {showOffline ? (
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#0B1526]/95 backdrop-blur-md border border-amber-500/60 shadow-xl text-xs text-amber-200">
          <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-semibold whitespace-nowrap">
            Offline Mode
          </span>
          <span className="text-slate-400 hidden sm:inline whitespace-nowrap">·</span>
          <span className="text-slate-300 hidden sm:inline whitespace-nowrap">
            Notes, CBT &amp; formulas ready
          </span>
          {pendingSyncCount > 0 && (
            <>
              <span className="text-slate-500 whitespace-nowrap">·</span>
              <span className="font-mono tabular-nums text-amber-300 font-bold whitespace-nowrap">
                {pendingSyncCount} queued
              </span>
            </>
          )}
        </div>
      ) : showSyncing ? (
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0B1526]/95 backdrop-blur-md border border-[#84E000]/50 shadow-xl text-xs text-slate-100">
          <RefreshCw className="w-3.5 h-3.5 text-[#84E000] animate-spin shrink-0" />
          <span className="font-semibold whitespace-nowrap">
            Syncing <span className="font-mono tabular-nums">{pendingSyncCount}</span> queued item{pendingSyncCount === 1 ? '' : 's'}...
          </span>
        </div>
      ) : showWakingCloud ? (
        <div className="flex items-center gap-2 pl-3.5 pr-1.5 py-1.5 rounded-xl bg-[#0B1526]/95 backdrop-blur-md border border-sky-500/60 shadow-xl text-xs text-sky-100">
          <RefreshCw className="w-4 h-4 text-sky-400 animate-spin shrink-0" />
          <span className="font-semibold whitespace-nowrap">
            Getting Student Companion ready…
          </span>
          <span className="text-slate-400 whitespace-nowrap">·</span>
          <span className="text-slate-300 whitespace-nowrap">
            15–30s
          </span>
          {wakeElapsedSec > 0 && (
            <span className="font-mono tabular-nums text-sky-300 font-semibold whitespace-nowrap">
              {wakeElapsedSec}s
            </span>
          )}
          <button
            type="button"
            onClick={() => setWakeDismissed(true)}
            className="min-h-[40px] min-w-[40px] -my-1 flex items-center justify-center text-slate-400 hover:text-white rounded-lg cursor-pointer"
            aria-label="Dismiss readiness notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : showPendingWhileOnline ? (
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#0B1526]/95 backdrop-blur-md border border-[#1E304F] shadow-xl text-xs text-slate-200">
          <span className="font-mono tabular-nums text-[#84E000] font-bold whitespace-nowrap">
            {pendingSyncCount} queued
          </span>
          <span className="text-slate-400 whitespace-nowrap truncate">
            {currentUser ? 'Ready to sync' : 'Sign in with Google to sync to cloud'}
          </span>
          {currentUser && (
            <button
              type="button"
              onClick={() => void syncOfflineQueue()}
              className="min-h-[34px] px-2.5 py-1 rounded-lg bg-[#84E000] hover:bg-[#75c900] text-slate-950 font-bold text-[11px] whitespace-nowrap cursor-pointer"
            >
              Sync Now
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0B1526]/95 backdrop-blur-md border border-emerald-600/60 shadow-xl text-xs text-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-[#84E000] shrink-0" />
          <span className="font-medium whitespace-nowrap">{offlineSyncNotice}</span>
          <button
            type="button"
            onClick={dismissOfflineSyncNotice}
            className="p-1 text-slate-400 hover:text-white cursor-pointer"
            aria-label="Dismiss sync notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
