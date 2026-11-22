import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole, NigerianClassLevel } from '../../types';
import {
  X,
  Wifi,
  WifiOff,
  Smartphone,
  Maximize2,
  GraduationCap,
  Users,
  ShieldCheck,
  Building2,
  LogOut,
  ChevronRight,
  BookOpen,
  Home,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  ShieldAlert,
  RefreshCw,
  HardDriveDownload,
  Scale,
  Trash2,
  Lock,
  AlertTriangle
} from 'lucide-react';
import { ReportSecurityModal } from '../security/ReportSecurityModal';
import { LegalAgreementModal } from '../common/LegalAgreementModal';
import { PWAInstallButton } from '../common/PWAInstallButton';
import { EditablePersonaAvatar } from '../common/EditablePersonaAvatar';
import {
  getOfflineCacheSummary,
  warmOfflineAppCache,
  OfflineCacheSummary
} from '../../services/offlineSyncService';
import { forceClearAppCacheAndReload } from '../../utils/pwaCacheRefresh';

interface InAppControlsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InAppControlsDrawer: React.FC<InAppControlsDrawerProps> = ({
  isOpen,
  onClose
}) => {
  const {
    currentRole,
    isOffline,
    setIsOffline,
    isDeviceFrame,
    setIsDeviceFrame,
    signOutApp,
    currentUserProfile,
    student,
    currentUser,
    loginWithGoogle,
    logoutUser,
    authLoading,
    setCurrentScreen,
    isSuperAdmin,
    impersonatedUser,
    stopImpersonation,
    switchRole,
    updateStudentClass,
    browserOnline,
    pendingSyncCount,
    isSyncingOfflineQueue,
    lastOfflineSyncedAt,
    syncOfflineQueue,
    updateUserAvatar,
    deleteAccount
  } = useApp();

  const [isReportModalOpen, setIsReportModalOpen] = React.useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = React.useState(false);
  const [deleteAccountError, setDeleteAccountError] = React.useState<string | null>(null);
  const [cacheSummary, setCacheSummary] = React.useState<OfflineCacheSummary | null>(null);
  const [isWarmingCache, setIsWarmingCache] = React.useState(false);
  const [isForceRefreshing, setIsForceRefreshing] = React.useState(false);
  const [avatarStatus, setAvatarStatus] = React.useState<{ type: 'success' | 'error'; text: string } | null>(null);

  React.useEffect(() => {
    if (!isOpen) return;
    getOfflineCacheSummary()
      .then(setCacheSummary)
      .catch(() => {});
  }, [isOpen]);

  const handleWarmOfflineCache = async () => {
    if (isWarmingCache) return;
    setIsWarmingCache(true);
    try {
      const next = await warmOfflineAppCache();
      setCacheSummary(next);
    } finally {
      setIsWarmingCache(false);
    }
  };

  const handleForceRefreshCache = async () => {
    if (isForceRefreshing) return;
    setIsForceRefreshing(true);
    await forceClearAppCacheAndReload();
  };

  const handleConfirmDeleteAccount = async () => {
    if (isDeletingAccount) return;
    setIsDeletingAccount(true);
    setDeleteAccountError(null);
    try {
      const res = await deleteAccount();
      if (!res.success) {
        setDeleteAccountError(res.error || 'Could not delete your account right now. Please try again.');
        return;
      }
      setIsDeleteModalOpen(false);
      onClose();
    } catch (err: any) {
      setDeleteAccountError(err?.message || 'Could not delete your account right now.');
    } finally {
      setIsDeletingAccount(false);
    }
  };

  if (!isOpen && !isReportModalOpen && !isLegalModalOpen && !isDeleteModalOpen) return null;

  const showOfflineToggle = currentRole === 'student' || isSuperAdmin;
  const showDeviceFrameToggle = isSuperAdmin;
  const showDeviceSection = true;
  const showSyllabusLink =
    isSuperAdmin ||
    currentRole === 'student' ||
    currentRole === 'parent' ||
    currentRole === 'school_admin';

  const roles: { id: UserRole; label: string; icon: React.ReactNode; desc: string; badge: string }[] = [
    {
      id: 'student',
      label: 'Student',
      icon: <GraduationCap className="w-4 h-4 text-[#84E000]" />,
      desc: 'CBT Drills, Lesson Notes & Games',
      badge: 'Active Learner'
    },
    {
      id: 'growth_partner',
      label: 'Growth Partner',
      icon: <TrendingUp className="w-4 h-4 text-emerald-400" />,
      desc: '10% Lifetime RevShare & Referrals',
      badge: 'Partner'
    },
    {
      id: 'parent',
      label: 'Parent',
      icon: <ShieldCheck className="w-4 h-4 text-[#FF5B00]" />,
      desc: 'PIN Wallet & Tutor Approvals',
      badge: 'Guardian'
    },
    {
      id: 'tutor',
      label: 'Tutor',
      icon: <Users className="w-4 h-4 text-sky-400" />,
      desc: 'Live Sessions & Earnings',
      badge: 'Verified Educator'
    },
    {
      id: 'school_admin',
      label: 'School Admin',
      icon: <Building2 className="w-4 h-4 text-purple-400" />,
      desc: 'Inter-School Standings & Metrics',
      badge: 'Institution'
    },
    {
      id: 'admin',
      label: 'Super Admin',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      desc: 'Platform Management & Directory',
      badge: 'Full Access'
    }
  ];

  const roleLabelFormatted =
    (currentUserProfile?.role || currentRole).replace('_', ' ');

  return (
    <>
    {isOpen && (
    <div className="absolute inset-0 z-50 flex overflow-hidden">
      {/* Dimmed Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity"
      />

      {/* Slide-in Drawer (Anchored inside the App Viewport) */}
      <div className="relative ml-auto w-full max-w-[320px] h-full bg-[#0D1829] border-l border-[#1E304F] text-slate-100 flex flex-col shadow-2xl z-10 animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E304F] bg-[#0A1322]">
          <h3 className="text-sm font-bold text-white tracking-tight">Account Menu</h3>
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-xl bg-[#162746] hover:bg-[#1E355D] active:scale-95 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
            aria-label="Close Account Menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Drawer Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 text-xs">
          
          {/* Active Account Card */}
          <div className="p-3.5 rounded-2xl bg-[#091222] border border-[#1E304F] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider text-slate-400">
                Active Account
              </span>
              <span className="text-[11px] font-bold text-[#84E000]">
                Active
              </span>
            </div>
            <div className="flex items-center gap-3">
              <EditablePersonaAvatar
                name={
                  currentUserProfile?.fullName ||
                  (student?.name && student.name !== '' ? student.name : 'Registered Member')
                }
                src={
                  currentUserProfile?.avatarUrl !== undefined
                    ? currentUserProfile.avatarUrl
                    : currentRole === 'student'
                    ? student?.uniformPhotoUrl
                    : undefined
                }
                alt={currentUserProfile?.fullName || 'Account avatar'}
                className="w-12 h-12 rounded-2xl ring-2 ring-[#84E000]/70"
                textClassName="text-sm"
                title="Tap to change your profile picture"
                onAvatarUpdated={async (dataUrl) => {
                  setAvatarStatus(null);
                  await updateUserAvatar(dataUrl);
                  setAvatarStatus({
                    type: 'success',
                    text: dataUrl ? 'Profile photo updated.' : 'Profile photo removed.'
                  });
                  setTimeout(() => setAvatarStatus(null), 3500);
                }}
                onError={(msg) => setAvatarStatus({ type: 'error', text: msg })}
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-white text-sm truncate">
                  {currentUserProfile?.fullName || (student?.name && student.name !== '' ? student.name : 'Registered Member')}
                </h4>
                <p className="text-[11px] text-slate-400 capitalize truncate">
                  {roleLabelFormatted} · {currentRole === 'student' ? student?.classLevel || 'Student' : 'Portal Access'}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-slate-400">Tap photo to change</span>
                  {Boolean(
                    currentUserProfile?.avatarUrl ||
                      (currentRole === 'student' && student?.uniformPhotoUrl)
                  ) && (
                    <button
                      type="button"
                      onClick={async () => {
                        setAvatarStatus(null);
                        await updateUserAvatar('');
                        setAvatarStatus({ type: 'success', text: 'Profile photo removed.' });
                        setTimeout(() => setAvatarStatus(null), 3500);
                      }}
                      className="text-[10px] font-semibold text-rose-400 hover:text-rose-300 inline-flex items-center gap-0.5 cursor-pointer"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
            {avatarStatus && (
              <p
                className={`text-[11px] font-semibold ${
                  avatarStatus.type === 'success' ? 'text-[#84E000]' : 'text-rose-400'
                }`}
              >
                {avatarStatus.text}
              </p>
            )}
          </div>

          {/* Section 1: Active Portal & Security Gate */}
          <div>
            <span className="text-[10px] font-bold tracking-wider text-slate-400 block mb-2 px-1">
              Active Portal & Security Gate
            </span>
            <div className="p-3.5 rounded-2xl bg-[#101C31] border border-[#1C2F4D] space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#15253F] border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  {currentRole === 'student' && <GraduationCap className="w-4 h-4" />}
                  {currentRole === 'growth_partner' && <TrendingUp className="w-4 h-4 text-emerald-400" />}
                  {currentRole === 'parent' && <ShieldCheck className="w-4 h-4 text-[#FF5B00]" />}
                  {currentRole === 'tutor' && <Users className="w-4 h-4 text-sky-400" />}
                  {currentRole === 'school_admin' && <Building2 className="w-4 h-4 text-purple-400" />}
                  {currentRole === 'admin' && <Sparkles className="w-4 h-4 text-amber-400" />}
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-white text-xs block truncate">
                    {currentRole === 'student'
                      ? 'Student Learning Portal'
                      : currentRole === 'growth_partner'
                      ? 'Growth Partner Portal'
                      : currentRole === 'parent'
                      ? 'Parent Escrow & Wallet'
                      : currentRole === 'tutor'
                      ? 'Verified Tutor Hub'
                      : currentRole === 'school_admin'
                      ? 'School Admin Portal'
                      : 'Super Admin Console'}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                    <span>Authenticated Access</span>
                  </span>
                </div>
              </div>

              {isSuperAdmin ? (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-emerald-400 font-bold">Super Admin Mode Active</span>
                    <span className="text-slate-400 font-mono">martorefe@gmail.com</span>
                  </div>
                  <p className="text-[10px] text-slate-300">
                    Switch to any stakeholder portal instantly below:
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    {roles.map(r => (
                      <button
                        key={r.id}
                        onClick={() => {
                          if (impersonatedUser) stopImpersonation();
                          switchRole(r.id);
                          onClose();
                        }}
                        className={`flex items-center gap-1.5 px-2.5 min-h-[44px] rounded-xl text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                          currentRole === r.id
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold'
                            : 'bg-[#15253F] hover:bg-[#1D3254] border-slate-800 text-slate-200'
                        }`}
                      >
                        {r.icon}
                        <span className="truncate">{r.label}</span>
                      </button>
                    ))}
                  </div>
                  {impersonatedUser && (
                    <button
                      onClick={() => {
                        stopImpersonation();
                        onClose();
                      }}
                      className="w-full mt-2 min-h-[44px] px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Exit Impersonation (Back to Admin)</span>
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
                  To access another portal (Student, Parent, Tutor, Growth Partner, or School Admin), sign out below and sign in with an account registered for that role.
                </p>
              )}
            </div>
          </div>

          {/* Student Class Level (Locked for Students; Preview Switcher for Super Admin only) */}
          {currentRole === 'student' && (
            <div>
              <span className="text-[10px] font-bold tracking-wider text-slate-400 block mb-2 px-1">
                {isSuperAdmin ? 'Student Class Preview (Super Admin)' : 'Enrolled Class Level'}
              </span>
              <div className="p-3.5 rounded-2xl bg-[#101C31] border border-[#1C2F4D]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold">
                    Enrolled Class: <strong className="text-[#84E000]">{student.classLevel}</strong>
                  </span>
                  {isSuperAdmin ? (
                    <span className="text-[11px] text-amber-300 font-semibold">Admin Override</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-300">
                      <Lock className="w-3 h-3 text-[#84E000]" />
                      <span>Locked</span>
                    </span>
                  )}
                </div>

                {isSuperAdmin ? (
                  <div className="grid grid-cols-3 gap-1.5 mt-2.5">
                    {(['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3', 'University Aspirant'] as NigerianClassLevel[]).map(lvl => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => updateStudentClass(lvl, lvl.startsWith('JSS') ? 'Junior' : (student.stream === 'Junior' ? 'Science' : (student.stream || 'Science')))}
                        className={`min-h-[40px] px-2 rounded-xl text-[11px] font-bold transition-all text-center cursor-pointer whitespace-nowrap ${
                          lvl === 'University Aspirant' ? 'col-span-3' : ''
                        } ${
                          student.classLevel === lvl
                            ? 'bg-[#84E000] text-slate-950 font-black shadow-sm ring-1 ring-white'
                            : 'bg-[#15253F] hover:bg-[#1D3254] text-slate-200 border border-[#223B63]'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-2">
                    Your class is locked to the class selected during sign-up so your curriculum, drills, and exam prep stay tailored to your level.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Section 2: Install, Offline Cache & Network Settings */}
          {showDeviceSection && (
            <div>
              <span className="text-[10px] font-bold tracking-wider text-slate-400 block mb-2 px-1">
                App Install, Offline &amp; Sync
              </span>
              <div className="space-y-2">
                <PWAInstallButton variant="drawer" />

                {/* Offline Cache & Queued Progress Sync Card */}
                <div className="p-3 rounded-xl border border-[#1C2F4D] bg-[#101C31] space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="font-semibold text-white block">
                        Offline Study Cache
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono tabular-nums block">
                        {cacheSummary?.serviceWorkerActive ? 'SW Ready' : 'Initializing SW'} · {cacheSummary?.totalEntries ?? 0} assets cached
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => void handleWarmOfflineCache()}
                      disabled={isWarmingCache || !browserOnline}
                      className="min-h-[38px] px-2.5 py-1.5 rounded-lg bg-[#15253F] hover:bg-[#1D3254] disabled:opacity-50 border border-[#223B63] text-[#84E000] text-[11px] font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <HardDriveDownload className={`w-3.5 h-3.5 ${isWarmingCache ? 'animate-pulse' : ''}`} />
                      <span>{isWarmingCache ? 'Caching...' : 'Cache Offline'}</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[11px] font-medium text-slate-300 block">
                        Progress Sync Queue:{' '}
                        <strong className="font-mono tabular-nums text-white">
                          {pendingSyncCount} pending
                        </strong>
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {lastOfflineSyncedAt
                          ? `Last synced ${new Date(lastOfflineSyncedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                          : 'Offline progress saves locally and syncs automatically'}
                      </span>
                    </div>
                    {pendingSyncCount > 0 && currentUser && !isOffline && (
                      <button
                        type="button"
                        onClick={() => void syncOfflineQueue()}
                        disabled={isSyncingOfflineQueue}
                        className="min-h-[36px] px-2.5 py-1 rounded-lg bg-[#84E000] hover:bg-[#75c900] text-slate-950 font-bold text-[11px] flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <RefreshCw className={`w-3 h-3 ${isSyncingOfflineQueue ? 'animate-spin' : ''}`} />
                        <span>Sync Now</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Offline Mode Toggle (Student & Super Admin only) */}
                {showOfflineToggle && (
                  <button
                    onClick={() => setIsOffline((prev) => !prev)}
                    className={`w-full flex items-center justify-between p-3 min-h-[48px] rounded-xl border transition-all cursor-pointer ${
                      isOffline
                        ? 'bg-amber-950/40 border-amber-600/50 text-amber-200'
                        : 'bg-[#101C31] border-[#1C2F4D] text-slate-200 hover:bg-[#162846]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isOffline ? 'bg-amber-900/40 text-amber-400' : 'bg-[#0C1525] text-emerald-400'}`}>
                        {isOffline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
                      </div>
                      <div className="text-left">
                        <span className="font-semibold block">
                          {!browserOnline
                            ? 'Browser Offline Detected'
                            : isOffline
                            ? 'Offline Mode (Active)'
                            : 'Online Mode'}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {isOffline ? 'Cached offline curriculum & CBT access' : 'Connected to high-speed cloud network'}
                        </span>
                      </div>
                    </div>
                    <div className={`w-9 h-5 rounded-full p-0.5 transition-colors shrink-0 ${isOffline ? 'bg-amber-500' : 'bg-slate-700'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isOffline ? 'translate-x-4' : 'translate-x-0'}`} />
                    </div>
                  </button>
                )}

                {/* Viewport Frame Toggle (Super Admin developer/preview only) */}
                {showDeviceFrameToggle && (
                  <button
                    onClick={() => setIsDeviceFrame((prev) => !prev)}
                    className="w-full flex items-center justify-between p-3 min-h-[48px] rounded-xl border border-[#1C2F4D] bg-[#101C31] hover:bg-[#162846] text-slate-200 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#0C1525] flex items-center justify-center text-slate-300 shrink-0">
                        {isDeviceFrame ? <Maximize2 className="w-4 h-4" /> : <Smartphone className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <div className="text-left">
                        <span className="font-semibold block">
                          {isDeviceFrame ? 'Full-Screen View' : 'Android Frame View'}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Toggle responsive desktop framing
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Section 3: Cloud Sync & Account */}
          <div>
            <span className="text-[10px] font-bold tracking-wider text-slate-400 block mb-2 px-1">
              Account & Cloud Sync
            </span>
            <div className="p-3 rounded-xl border border-[#1C2F4D] bg-[#101C31]">
              {currentUser ? (
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="w-8 h-8 rounded-full bg-emerald-600/30 border border-emerald-500/50 flex items-center justify-center text-emerald-300 font-bold text-xs shrink-0">
                      {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                    </div>
                    <div className="truncate">
                      <span className="font-bold text-white block truncate text-[11px]">
                        {currentUser.displayName || 'Google User'}
                      </span>
                      <span className="text-[10px] text-slate-400 truncate block">
                        {currentUser.email}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={logoutUser}
                    className="px-2.5 min-h-[36px] rounded-lg bg-[#15253F] hover:bg-[#1D3254] border border-[#233C68] text-[11px] font-semibold text-slate-300 hover:text-white transition-colors shrink-0 cursor-pointer whitespace-nowrap"
                    title="Disconnect Google Sync"
                  >
                    Unlink
                  </button>
                </div>
              ) : (
                <button
                  onClick={loginWithGoogle}
                  disabled={authLoading}
                  className="w-full min-h-[44px] px-3 rounded-lg bg-[#162746] hover:bg-[#1E355D] border border-[#233C68] flex items-center justify-center gap-2 text-white font-medium transition-all cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>{authLoading ? 'Signing in...' : 'Sign in with Google'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Section 4: Navigation & Single Log Out */}
          <div>
            <span className="text-[10px] font-bold tracking-wider text-slate-400 block mb-2 px-1">
              Navigation
            </span>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setCurrentScreen('landing');
                  onClose();
                }}
                className="w-full flex items-center gap-2.5 px-3 min-h-[44px] rounded-xl bg-[#101C31] hover:bg-[#162846] border border-[#1C2F4D] text-slate-200 transition-all cursor-pointer"
              >
                <Home className="w-4 h-4 text-[#84E000] shrink-0" />
                <span className="font-semibold">Return to Landing Page</span>
              </button>

              {showSyllabusLink && (
                <button
                  onClick={() => {
                    setCurrentScreen('know_more');
                    onClose();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 min-h-[44px] rounded-xl bg-[#101C31] hover:bg-[#162846] border border-[#1C2F4D] text-slate-200 transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="font-semibold">Open "Know More" Syllabus</span>
                </button>
              )}

              <button
                onClick={() => {
                  setIsLegalModalOpen(true);
                  onClose();
                }}
                className="w-full flex items-center gap-2.5 px-3 min-h-[44px] rounded-xl bg-[#101C31] hover:bg-[#162846] border border-[#1C2F4D] text-slate-200 transition-all cursor-pointer"
              >
                <Scale className="w-4 h-4 text-[#84E000] shrink-0" />
                <span className="font-semibold">User Agreement &amp; Legal Terms</span>
              </button>

              <button
                type="button"
                onClick={() => void handleForceRefreshCache()}
                disabled={isForceRefreshing}
                className="w-full flex items-center gap-2.5 px-3 min-h-[44px] rounded-xl bg-[#101C31] hover:bg-[#162846] disabled:opacity-60 border border-slate-700/80 text-slate-100 transition-all cursor-pointer"
                title="Purges stale PWA cache and reloads the latest deployed release without signing you out"
              >
                <RefreshCw className={`w-4 h-4 text-sky-400 shrink-0 ${isForceRefreshing ? 'animate-spin' : ''}`} />
                <span className="font-semibold">
                  {isForceRefreshing ? 'Clearing cache & reloading...' : 'Force Refresh & Clear App Cache'}
                </span>
              </button>

              <button
                onClick={() => {
                  setIsReportModalOpen(true);
                  onClose();
                }}
                className="w-full flex items-center gap-2.5 px-3 min-h-[44px] rounded-xl bg-amber-950/25 hover:bg-amber-950/45 border border-amber-700/50 text-amber-200 transition-all cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold">Report Fraud, Spam or Security Issue</span>
              </button>

              <button
                onClick={() => {
                  signOutApp();
                  onClose();
                }}
                className="w-full flex items-center gap-2.5 px-3 min-h-[44px] rounded-xl bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/50 text-rose-300 transition-all cursor-pointer mt-2"
              >
                <LogOut className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="font-semibold">Log Out / Switch Account</span>
              </button>

              {!isSuperAdmin && currentUserProfile && (
                <button
                  type="button"
                  onClick={() => {
                    setDeleteAccountError(null);
                    setIsDeleteModalOpen(true);
                    onClose();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 min-h-[44px] rounded-xl bg-[#101C31] hover:bg-rose-950/40 border border-rose-500/35 text-rose-300 transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="font-semibold">Delete My Account</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="px-4 py-3 border-t border-[#1E304F] bg-[#0A1322] flex items-center justify-between text-[11px] text-slate-400">
          <span>Student Companion</span>
          <span className="text-[#84E000] font-semibold">Nigeria</span>
        </div>
      </div>
    </div>
    )}
    {isReportModalOpen && (
      <ReportSecurityModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        defaultContext={`Account Menu (${currentRole})`}
      />
    )}
    {isLegalModalOpen && (
      <LegalAgreementModal
        isOpen={isLegalModalOpen}
        mode="view"
        role={(currentUserProfile?.role || currentRole) as UserRole}
        userName={currentUserProfile?.fullName}
        acceptedAt={currentUserProfile?.legalConsent?.acceptedAt}
        onClose={() => setIsLegalModalOpen(false)}
      />
    )}
    {isDeleteModalOpen && (
      <div className="fixed inset-0 z-[260] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
        <div
          className="w-full max-w-md rounded-2xl bg-[#0D1729] border border-rose-500/40 shadow-2xl p-5 space-y-4 text-slate-100"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-account-title"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 id="delete-account-title" className="text-base font-black text-white">
                Delete Your Account?
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                This will permanently remove your <strong className="text-white">{currentUserProfile?.role}</strong> profile and sign you out of Student Companion.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#101C31] border border-[#1C2F4D] text-xs text-slate-300 space-y-1.5">
            <p>
              Account email:{' '}
              <strong className="text-white break-all">
                {currentUserProfile?.email || currentUser?.email || 'Current account'}
              </strong>
            </p>
            <p className="text-slate-400 leading-relaxed">
              Once deleted, this email address will be released immediately so you can register a brand-new account in any role.
            </p>
          </div>

          {deleteAccountError && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200">
              {deleteAccountError}
            </div>
          )}

          <div className="flex items-center justify-end gap-2.5 pt-1">
            <button
              type="button"
              disabled={isDeletingAccount}
              onClick={() => {
                setDeleteAccountError(null);
                setIsDeleteModalOpen(false);
              }}
              className="px-4 min-h-[42px] rounded-xl bg-[#15253F] hover:bg-[#1D3254] border border-[#223B63] text-xs font-bold text-slate-200 cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isDeletingAccount}
              onClick={() => void handleConfirmDeleteAccount()}
              className="px-4 min-h-[42px] rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-black text-white cursor-pointer disabled:opacity-60 inline-flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isDeletingAccount ? 'Deleting Account...' : 'Yes, Delete My Account'}</span>
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};
