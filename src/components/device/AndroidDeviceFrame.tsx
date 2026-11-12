import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Wifi, WifiOff, BatteryCharging, Signal, SlidersHorizontal } from 'lucide-react';
import { InAppControlsDrawer } from './InAppControlsDrawer';
import { HeaderClassSwitcher } from '../student/HeaderClassSwitcher';

export const AndroidDeviceFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDeviceFrame, isOffline, currentRole, isSuperAdmin } = useApp();
  const [isControlsOpen, setIsControlsOpen] = useState(false);

  const roleLabelMap: Record<string, string> = {
    student: 'Student',
    growth_partner: 'Growth Partner',
    parent: 'Parent',
    tutor: 'Tutor',
    school_admin: 'School Admin',
    admin: isSuperAdmin ? 'Super Admin' : 'Admin'
  };
  const roleLabel = roleLabelMap[currentRole] || 'App';

  if (!isDeviceFrame) {
    // 100% Full-Screen Responsive View - Fills the entire preview pane
    return (
      <main className="w-full h-screen h-dvh bg-[#070D18] text-slate-100 flex flex-col relative overflow-hidden">
        {/* Full-Screen In-App Mobile Top Bar */}
        <header className="h-12 sm:h-13 w-full bg-[#0B1526]/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between border-b border-[#1A2C49] shrink-0 z-30 select-none">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#14233C] flex items-center justify-center text-[#84E000] font-black text-xs sm:text-sm">
              SC
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-bold text-white tracking-tight">Student Companion</span>
              <span className="text-[10px] font-bold text-[#84E000] bg-[#84E000]/15 border border-[#84E000]/30 px-2 py-0.5 rounded-full uppercase">
                {roleLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {currentRole === 'student' && <HeaderClassSwitcher />}
            {isOffline && (currentRole === 'student' || isSuperAdmin) && (
              <span className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2.5 py-1 rounded-full font-medium whitespace-nowrap shrink-0">
                <WifiOff className="w-3.5 h-3.5" />
                Offline
              </span>
            )}
            <button
              onClick={() => setIsControlsOpen(true)}
              className="flex items-center gap-1.5 px-3 min-h-[40px] rounded-lg bg-[#14233C] hover:bg-[#1D3254] active:scale-95 text-slate-200 hover:text-white border border-[#223B63] transition-all cursor-pointer text-xs font-semibold whitespace-nowrap shrink-0"
              title="Open Account Menu"
              aria-label="Open Account Menu"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#84E000]" />
              <span>Menu</span>
            </button>
          </div>
        </header>

        {/* Content Viewport filling 100% available width and height */}
        <div className="w-full flex-1 min-h-0 flex flex-col bg-slate-950 relative overflow-hidden">
          {children}
          <InAppControlsDrawer isOpen={isControlsOpen} onClose={() => setIsControlsOpen(false)} />
        </div>
      </main>
    );
  }

  // Realistic Android Smartphone Container (Tall Modern Flagship 20:9 Ratio)
  return (
    <main className="w-full min-h-screen bg-[#070D18] flex flex-col items-center justify-center p-2 sm:py-5 sm:px-4 overflow-y-auto">
      {/* Outer Phone Shell - Modern Tall Flagship (20:9 ratio) */}
      <div className="relative w-full max-w-[414px] sm:max-w-[422px] h-[930px] sm:h-[950px] max-h-[97vh] bg-slate-900 rounded-[50px] p-2.5 sm:p-3 shadow-[0_25px_65px_-15px_rgba(0,0,0,0.85),0_0_0_2px_rgba(51,65,85,0.75)] flex flex-col border border-slate-700/60 transition-all duration-300 shrink-0">
        {/* Hardware details: Sleek flagship aluminum side buttons */}
        <div className="absolute -left-[5px] top-32 w-[3px] h-14 bg-slate-600 rounded-l-sm" />
        <div className="absolute -left-[5px] top-50 w-[3px] h-14 bg-slate-600 rounded-l-sm" />
        <div className="absolute -right-[5px] top-36 w-[3px] h-20 bg-slate-600 rounded-r-sm" />

        {/* Screen Glass - Expanded Vertical Display with Flagship Curvature */}
        <div className="relative w-full h-full bg-slate-950 rounded-[40px] overflow-hidden flex flex-col border border-slate-800/90 shadow-inner">
          
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
              {isOffline && (currentRole === 'student' || isSuperAdmin) ? (
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

          {/* In-App Mobile Top App Bar */}
          <div className="h-11 w-full bg-[#0B1526] px-4 flex items-center justify-between border-b border-[#1A2C49] shrink-0 z-30 select-none">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#14233C] flex items-center justify-center text-[#84E000] font-black text-[11px]">
                SC
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white tracking-tight">Student Companion</span>
                <span className="text-[9px] font-bold text-[#84E000] bg-[#84E000]/15 border border-[#84E000]/30 px-1.5 py-0.2 rounded uppercase">
                  {roleLabel}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {currentRole === 'student' && <HeaderClassSwitcher />}
              {/* In-App Menu Drawer Trigger */}
              <button
                onClick={() => setIsControlsOpen(true)}
                className="flex items-center gap-1 px-2.5 min-h-[36px] rounded-lg bg-[#14233C] hover:bg-[#1D3254] active:scale-95 text-slate-200 hover:text-white border border-[#223B63] transition-all cursor-pointer text-[11px] font-semibold whitespace-nowrap shrink-0"
                title="Open Account Menu"
                aria-label="Open Account Menu"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#84E000]" />
                <span>Menu</span>
              </button>
            </div>
          </div>

          {/* Screen Body */}
          <div className="relative flex-1 min-h-0 w-full overflow-hidden flex flex-col">
            {children}
            {/* Native In-App Drawer Modal */}
            <InAppControlsDrawer isOpen={isControlsOpen} onClose={() => setIsControlsOpen(false)} />
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
