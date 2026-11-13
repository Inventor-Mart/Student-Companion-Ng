import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  ShieldAlert,
  Users,
  GraduationCap,
  ShieldCheck,
  Building2,
  Sliders,
  LogOut,
  Sparkles,
  ArrowRight,
  Database,
  Lock,
  Unlock
} from 'lucide-react';

interface DeveloperQuickBarProps {
  onOpenDirectory?: () => void;
}

export const DeveloperQuickBar: React.FC<DeveloperQuickBarProps> = ({ onOpenDirectory }) => {
  const {
    isSuperAdmin,
    adminTermLockOverride,
    setAdminTermLockOverride,
    currentRole,
    switchRole,
    impersonatedUser,
    stopImpersonation,
    isFirebaseConnected
  } = useApp();

  if (!isSuperAdmin) return null;

  const roleOptions: { id: UserRole | 'super_admin'; label: string; icon: any; color: string }[] = [
    { id: 'super_admin', label: 'Super Admin', icon: Sparkles, color: 'text-amber-400 bg-amber-950/80 border-amber-600/60' },
    { id: 'student', label: 'Student', icon: GraduationCap, color: 'text-[#84E000] bg-emerald-950/80 border-emerald-600/60' },
    { id: 'parent', label: 'Parent', icon: ShieldCheck, color: 'text-[#FF5B00] bg-orange-950/80 border-orange-600/60' },
    { id: 'tutor', label: 'Tutor', icon: Users, color: 'text-sky-400 bg-sky-950/80 border-sky-600/60' },
    { id: 'school_admin', label: 'School Admin', icon: Building2, color: 'text-purple-400 bg-purple-950/80 border-purple-600/60' }
  ];

  return (
    <div className="w-full z-40 bg-[#060B14] border-b border-[#1E293B] shadow-md select-none">
      {/* Impersonation Banner (if active) */}
      {impersonatedUser && (
        <div className="w-full bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 text-slate-950 px-3 py-1.5 text-xs font-bold flex items-center justify-between shadow-inner">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-slate-950 shrink-0 animate-pulse" />
            <span>
              Impersonation Active: Viewing platform as{' '}
              <span className="underline">{impersonatedUser.fullName}</span> ({impersonatedUser.role.toUpperCase()})
            </span>
          </div>
          <button
            onClick={stopImpersonation}
            className="bg-slate-950 text-amber-300 hover:text-white px-2.5 py-0.5 rounded-lg text-[11px] font-extrabold flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
          >
            <span>Exit Impersonation</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Developer Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Left: Developer Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-950/90 border border-emerald-500/50 text-[#84E000] font-bold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#84E000] animate-ping" />
            <span>DEV MODE</span>
          </div>
          <span className="text-slate-300 font-semibold hidden sm:inline">martorefe@gmail.com</span>
          <span className="text-[10px] text-slate-500 font-mono hidden md:inline">| Super Admin Access</span>
        </div>

        {/* Center: Live Role Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
          <span className="text-[10px] text-slate-400 font-semibold mr-1 hidden sm:inline">Switch Role:</span>
          {roleOptions.map(opt => {
            const Icon = opt.icon;
            const isSelected =
              opt.id === 'super_admin'
                ? currentRole === 'admin' && !impersonatedUser
                : currentRole === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => {
                  if (impersonatedUser) stopImpersonation();
                  switchRole(opt.id === 'super_admin' ? 'admin' : (opt.id as UserRole));
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? `${opt.color} ring-1 ring-white/20 font-bold shadow-sm`
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
                title={`Switch view to ${opt.label}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Term Lock Preview Toggle (Student View) + User Directory Trigger */}
        <div className="flex items-center gap-2">
          {(currentRole === 'student' || impersonatedUser?.role === 'student') && (
            <button
              type="button"
              onClick={() => setAdminTermLockOverride(!adminTermLockOverride)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-semibold text-[11px] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                adminTermLockOverride
                  ? 'bg-emerald-950/90 hover:bg-emerald-900 text-emerald-300 border-emerald-600/60'
                  : 'bg-amber-950/80 hover:bg-amber-900/90 text-amber-300 border-amber-600/50'
              }`}
              title={
                adminTermLockOverride
                  ? 'Currently previewing unlocked terms. Click to enforce Student term locks & countdown.'
                  : 'Enforcing Student NERDC term locks & countdown. Click to unlock all terms for preview.'
              }
            >
              {adminTermLockOverride ? (
                <Unlock className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <Lock className="w-3.5 h-3.5 shrink-0" />
              )}
              <span>{adminTermLockOverride ? 'Term Lock: Preview Open' : 'Term Lock: Student View'}</span>
            </button>
          )}

          {onOpenDirectory && (
            <button
              onClick={onOpenDirectory}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 hover:text-white border border-indigo-700/60 font-semibold text-[11px] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Users className="w-3.5 h-3.5" />
              <span>User Directory</span>
            </button>
          )}

          <div
            className="flex items-center gap-1 text-[10px] font-semibold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800"
            title={isFirebaseConnected ? 'Connected to Firestore' : 'Local / Offline Sync'}
          >
            <Database className={`w-3 h-3 ${isFirebaseConnected ? 'text-emerald-400' : 'text-amber-400'}`} />
            <span className="hidden lg:inline">{isFirebaseConnected ? 'Live DB' : 'Local DB'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
