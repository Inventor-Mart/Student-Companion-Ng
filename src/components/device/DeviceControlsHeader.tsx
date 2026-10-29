import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Smartphone,
  Maximize2,
  Wifi,
  WifiOff,
  RotateCcw,
  GraduationCap,
  Users,
  ShieldCheck,
  Building2
} from 'lucide-react';

export const DeviceControlsHeader: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
    isDeviceFrame,
    setIsDeviceFrame,
    isOffline,
    setIsOffline,
    resetDemoData
  } = useApp();

  const roles: { id: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'student',
      label: 'Student',
      icon: <GraduationCap className="w-4 h-4" />,
      desc: 'CBT Drills, Notes & Games'
    },
    {
      id: 'parent',
      label: 'Parent',
      icon: <ShieldCheck className="w-4 h-4" />,
      desc: 'PIN Wallet & Approvals'
    },
    {
      id: 'tutor',
      label: 'Tutor',
      icon: <Users className="w-4 h-4" />,
      desc: 'Sessions & Earnings'
    },
    {
      id: 'admin',
      label: 'School Admin',
      icon: <Building2 className="w-4 h-4" />,
      desc: 'Inter-School Standings'
    }
  ];

  return (
    <header className="w-full bg-slate-900 border-b border-slate-800 text-slate-100 px-4 py-3 shrink-0 select-none z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-900/30">
            <span className="text-lg font-black tracking-tight">SC</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-white whitespace-nowrap">
                Student Companion
              </h1>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 rounded px-1.5 py-0.5 whitespace-nowrap">
                🇳🇬 Nigeria
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              WAEC · NECO · JAMB UTME · JSS1 to SS3
            </p>
          </div>
        </div>

        {/* Role Switcher Toolbar */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 shadow-inner overflow-x-auto max-w-full">
          {roles.map(r => {
            const isActive = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setCurrentRole(r.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
                title={r.desc}
              >
                {r.icon}
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>

        {/* Viewport & Environment Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Offline Mode Simulator */}
          <button
            onClick={() => setIsOffline(prev => !prev)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isOffline
                ? 'bg-amber-950/80 text-amber-300 border-amber-700/60'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Toggle offline simulator to test cached lesson reading and offline CBT drills"
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-400" /> : <Wifi className="w-3.5 h-3.5 text-emerald-400" />}
            <span className="hidden sm:inline">{isOffline ? 'Offline Mode' : 'Online'}</span>
          </button>

          {/* Device Frame Toggle */}
          <button
            onClick={() => setIsDeviceFrame(prev => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            title={isDeviceFrame ? 'Switch to Full-Screen Web View' : 'Switch to Android Smartphone Frame'}
          >
            {isDeviceFrame ? <Maximize2 className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5 text-emerald-400" />}
            <span className="hidden sm:inline">{isDeviceFrame ? 'Full Screen' : 'Android Frame'}</span>
          </button>

          {/* Reset Demo State */}
          <button
            onClick={resetDemoData}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-colors"
            title="Reset demo data to default initial state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
