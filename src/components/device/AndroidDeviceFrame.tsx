import React from 'react';
import { useApp } from '../../context/AppContext';
import { Wifi, WifiOff, BatteryCharging, Signal } from 'lucide-react';

export const AndroidDeviceFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDeviceFrame, isOffline } = useApp();

  if (!isDeviceFrame) {
    // Full screen responsive view
    return (
      <main className="w-full min-h-[calc(100vh-65px)] bg-slate-900 text-slate-100 flex flex-col">
        <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col shadow-2xl bg-slate-950 border-x border-slate-800">
          {children}
        </div>
      </main>
    );
  }

  // Realistic Android Smartphone Container
  return (
    <main className="w-full min-h-[calc(100vh-65px)] bg-slate-950 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      {/* Outer Phone Shell */}
      <div className="relative w-full max-w-[420px] h-[860px] max-h-[92vh] bg-slate-900 rounded-[44px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_2px_rgba(51,65,85,0.7)] flex flex-col border border-slate-700/60 transition-all duration-300">
        {/* Hardware details: Side buttons styling */}
        <div className="absolute -left-[5px] top-28 w-[3px] h-12 bg-slate-600 rounded-l-sm" />
        <div className="absolute -left-[5px] top-44 w-[3px] h-12 bg-slate-600 rounded-l-sm" />
        <div className="absolute -right-[5px] top-32 w-[3px] h-16 bg-slate-600 rounded-r-sm" />

        {/* Screen Glass */}
        <div className="relative w-full h-full bg-slate-950 rounded-[36px] overflow-hidden flex flex-col border border-slate-800">
          {/* Android Status Bar */}
          <div className="h-9 w-full bg-slate-950/95 backdrop-blur-sm px-6 flex items-center justify-between text-slate-300 select-none shrink-0 z-40 border-b border-slate-900/40">
            {/* Clock */}
            <span className="text-xs font-semibold tracking-tight font-mono">11:10</span>

            {/* Android Punch Hole Camera Notch */}
            <div className="w-3.5 h-3.5 rounded-full bg-black ring-2 ring-slate-800/80 flex items-center justify-center shadow-inner">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
            </div>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5 text-slate-400">
              {isOffline ? (
                <WifiOff className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Wifi className="w-3.5 h-3.5 text-slate-300" />
              )}
              <Signal className="w-3.5 h-3.5 text-slate-300" />
              <div className="flex items-center gap-0.5 text-[11px] font-mono">
                <span>98%</span>
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
          </div>

          {/* Screen Body */}
          <div className="relative flex-1 w-full overflow-hidden flex flex-col">
            {children}
          </div>

          {/* Android Bottom Navigation / Gesture Bar */}
          <div className="h-5 w-full bg-slate-950 flex items-center justify-center shrink-0 z-40">
            <div className="w-32 h-1 bg-slate-600/70 rounded-full hover:bg-slate-400 transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </main>
  );
};
