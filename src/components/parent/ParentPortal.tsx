import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Lock,
  Wallet,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Flame,
  Award,
  BookOpen,
  CreditCard,
  X,
  MessageSquare,
  LayoutDashboard,
  Trophy,
  Sparkles,
  ArrowRight,
  Key,
  RefreshCw,
  Check,
  Users,
  UserPlus,
  Trash2,
  KeyRound,
  Volume2,
  VolumeX,
  Receipt
} from 'lucide-react';
import { NairaText } from '../../utils/currency';
import { ParentCommunityForum } from './ParentCommunityForum';
import { ExamPrepUnlockModal } from '../student/exam-prep/ExamPrepUnlockModal';
import { LinkedWard } from '../../types';
import { playSound, toggleSoundMuted, getSoundMuted } from '../../utils/audioSynthesis';

type ParentTab = 'overview' | 'approvals' | 'community';
type DetailSheet = 'wallet' | 'exam-prep' | 'championship' | 'academic' | 'transactions' | null;

export const ParentPortal: React.FC = () => {
  const {
    isParentPinUnlocked,
    unlockParentPin,
    lockParentPin,
    parentWallet,
    fundParentWallet,
    tutorBookings,
    approveTutorBooking,
    rejectTutorBooking,
    student,
    allRegisteredUsers,
    examResults,
    currentUserProfile,
    championshipRegistrations,
    approveChampionshipRegistration,
    examPrepState,
    linkedWards,
    activeWardId,
    linkWardByCode,
    unlinkWard,
    setActiveWard,
    securityStatus,
    pinLockoutInfo
  } = useApp();

  const [enteredPin, setEnteredPin] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState<boolean>(false);
  const [topUpAmount, setTopUpAmount] = useState<number>(10000);
  const [paymentChannel, setPaymentChannel] = useState<'card' | 'transfer' | 'ussd'>('card');
  const [isProcessingPaystack, setIsProcessingPaystack] = useState<boolean>(false);
  const [parentTab, setParentTab] = useState<ParentTab>('overview');
  const [activeDetailSheet, setActiveDetailSheet] = useState<DetailSheet>(null);
  const [isExamPrepModalOpen, setIsExamPrepModalOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(getSoundMuted());

  // Multi-Ward Management States
  const [isLinkWardModalOpen, setIsLinkWardModalOpen] = useState(false);
  const [linkWardInput, setLinkWardInput] = useState('');
  const [isLinkingWard, setIsLinkingWard] = useState(false);
  const [linkWardFeedback, setLinkWardFeedback] = useState<{ success: boolean; message?: string; ward?: LinkedWard } | null>(null);
  const [confirmUnlinkWard, setConfirmUnlinkWard] = useState<LinkedWard | null>(null);

  const currentActiveWard = linkedWards.find(w => w.studentId === activeWardId) || linkedWards[0];
  const wardStudentProfile =
    allRegisteredUsers.find(
      u => u.role === 'student' && u.studentData && currentActiveWard && u.studentData.id === currentActiveWard.studentId
    )?.studentData || student;
  const wardVerifiedLogs = wardStudentProfile.verifiedReadingLogs || [];
  const wardVerifiedCount =
    (wardStudentProfile.completedReadNoteIds || []).length || wardVerifiedLogs.length;
  const wardVerifiedMinutes = Math.max(
    0,
    Math.round(wardVerifiedLogs.reduce((acc, log) => acc + (log.activeSeconds || 0), 0) / 60)
  );
  const parentName = currentUserProfile?.fullName || 'Registered Parent';
  const wardName =
    currentActiveWard?.studentName ||
    currentUserProfile?.parentData?.wardName ||
    (student.name && student.name !== '' ? student.name : 'Registered Ward');

  // Staggered audio pop cascade on unlock or tab arrival
  useEffect(() => {
    if (!isParentPinUnlocked || parentTab === 'community') return;
    const count = parentTab === 'overview' ? 7 : 3;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < count; i++) {
      timers.push(
        setTimeout(() => {
          playSound.tilePop(i);
        }, 70 + i * 75)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [isParentPinUnlocked, parentTab]);

  const handleToggleMute = () => {
    const nextMuted = toggleSoundMuted();
    setIsMuted(nextMuted);
    if (!nextMuted) playSound.tileTap();
  };

  const handleLinkWardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkWardInput.trim()) return;
    playSound.tileTap();
    setIsLinkingWard(true);
    setLinkWardFeedback(null);
    try {
      const res = await linkWardByCode(linkWardInput);
      setLinkWardFeedback(res);
      if (res.success) {
        playSound.correct();
        setLinkWardInput('');
      } else {
        playSound.buzz();
      }
    } catch (err: any) {
      playSound.buzz();
      setLinkWardFeedback({
        success: false,
        message: err?.message || 'Failed to link ward. Please verify the code or email.'
      });
    } finally {
      setIsLinkingWard(false);
    }
  };

  const handleConfirmUnlink = async (wardId: string) => {
    playSound.tileTap();
    await unlinkWard(wardId);
    setConfirmUnlinkWard(null);
  };

  // Paystack Live Configuration & Verification States
  const [paystackConfig, setPaystackConfig] = useState<{
    publicKey: string;
    isLive: boolean;
    isTest: boolean;
    hasSecretKey: boolean;
    mode: 'live' | 'test' | 'unconfigured';
  }>({
    publicKey: '',
    isLive: false,
    isTest: false,
    hasSecretKey: false,
    mode: 'unconfigured'
  });
  const [isKeySettingsOpen, setIsKeySettingsOpen] = useState<boolean>(false);
  const [inputPublicKey, setInputPublicKey] = useState<string>('');
  const [inputSecretKey, setInputSecretKey] = useState<string>('');
  const [keySaveMsg, setKeySaveMsg] = useState<string>('');
  const [isSavingKeys, setIsSavingKeys] = useState<boolean>(false);
  const [paystackError, setPaystackError] = useState<string | null>(null);
  const [verifiedReceipt, setVerifiedReceipt] = useState<{
    reference: string;
    amount: number;
    channel: string;
    date: string;
  } | null>(null);

  const isAdmin =
    currentUserProfile?.email === 'wowrealities@gmail.com' ||
    currentUserProfile?.email === 'martorefe@gmail.com';

  const fetchPaystackConfig = async () => {
    try {
      const res = await fetch('/api/paystack/config');
      const data = await res.json();
      setPaystackConfig(data);
      if (data.publicKey) {
        setInputPublicKey(data.publicKey);
      }
    } catch (err) {
      console.warn('Could not fetch Paystack config:', err);
    }
  };

  useEffect(() => {
    fetchPaystackConfig();
  }, []);

  const handleSavePaystackKeys = async (e: React.FormEvent) => {
    e.preventDefault();
    playSound.tileTap();
    setIsSavingKeys(true);
    setKeySaveMsg('');
    try {
      const res = await fetch('/api/paystack/save-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          publicKey: inputPublicKey,
          secretKey: inputSecretKey,
          adminEmail: currentUserProfile?.email || 'wowrealities@gmail.com'
        })
      });
      const data = await res.json();
      if (data.success) {
        playSound.correct();
        setKeySaveMsg('Paystack gateway configuration updated successfully!');
        await fetchPaystackConfig();
        setTimeout(() => {
          setIsKeySettingsOpen(false);
          setKeySaveMsg('');
        }, 1500);
      } else {
        playSound.buzz();
        setKeySaveMsg(data.error || 'Failed to update gateway keys');
      }
    } catch (err: any) {
      playSound.buzz();
      setKeySaveMsg(err?.message || 'Network error saving keys');
    } finally {
      setIsSavingKeys(false);
    }
  };

  // Animation variants for staggered Bento cascade
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.065,
        delayChildren: 0.03
      }
    }
  };

  const tileVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 24 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 22
      }
    }
  };

  // =========================================================================
  // PIN LOCK GATE (Vibrant Navy, Electric Orange & Lime Green)
  // =========================================================================
  if (!isParentPinUnlocked) {
    const handlePinUnlock = () => {
      if (pinLockoutInfo.isLocked) {
        playSound.buzz();
        const mins = Math.max(1, Math.ceil(pinLockoutInfo.remainingSeconds / 60));
        setPinError(`PIN temporarily locked after 5 wrong attempts. Retry in ${mins} minute(s).`);
        return;
      }
      const ok = unlockParentPin(enteredPin);
      if (ok) {
        playSound.levelUp();
      } else {
        playSound.buzz();
        const remainingTries = Math.max(0, 5 - (pinLockoutInfo.attemptsUsed + 1));
        setPinError(
          remainingTries === 0
            ? 'Security Lockout: 5 wrong PIN guesses detected. Wallet locked for 15 minutes.'
            : `Incorrect PIN (${remainingTries} attempt${remainingTries === 1 ? '' : 's'} remaining before 15m lock)`
        );
      }
    };

    return (
      <div className="flex-1 min-h-0 h-full w-full overflow-y-auto px-4 py-8 flex flex-col items-center justify-center touch-pan-y text-slate-100 bg-[#101C34]">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring' as const, stiffness: 280, damping: 22 }}
          className="relative overflow-hidden bg-gradient-to-br from-[#14203D] via-[#0F1B33] to-[#0A1222] border-2 border-[#84CC16]/50 rounded-3xl p-6 max-w-sm w-full space-y-5 text-center shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_24px_rgba(132,204,22,0.18)]"
        >
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#FF5B00]/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-[#84CC16]/15 rounded-full blur-2xl pointer-events-none" />

          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF5B00] to-[#E04F00] border-2 border-orange-300/40 mx-auto flex items-center justify-center text-white shadow-[0_8px_24px_rgba(255,91,0,0.45)] relative z-10"
          >
            <Lock className="w-7 h-7 stroke-[2.2]" />
          </motion.div>

          <div className="relative z-10">
            <h2 className="text-lg font-black text-white tracking-tight">Parent Security PIN</h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Protected access to Nigerian payment wallet, child analytics, and physical tutoring approvals.
            </p>
          </div>

          <div className="space-y-3.5 relative z-10">
            <input
              type="password"
              maxLength={4}
              value={enteredPin}
              onChange={e => {
                playSound.tileTap();
                setEnteredPin(e.target.value);
                setPinError('');
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') handlePinUnlock();
              }}
              placeholder="••••"
              className="w-40 mx-auto text-center tracking-[0.5em] text-2xl font-mono font-black py-2.5 bg-[#0A1222] border-2 border-slate-700 focus:border-[#84CC16] rounded-2xl text-[#84CC16] focus:outline-none shadow-inner"
            />

            {(pinError || pinLockoutInfo.isLocked) && (
              <span className="text-xs text-[#FF5B00] block font-bold">
                {pinLockoutInfo.isLocked
                  ? `Security Lockout: Too many failed PIN guesses. Retry in ${Math.max(1, Math.ceil(pinLockoutInfo.remainingSeconds / 60))} minute(s).`
                  : pinError}
              </span>
            )}

            <button
              type="button"
              disabled={pinLockoutInfo.isLocked}
              onClick={handlePinUnlock}
              className="w-full py-3 px-4 bg-[#84CC16] hover:bg-[#A3E635] disabled:opacity-50 text-slate-950 text-xs font-black rounded-2xl transition-all shadow-lg shadow-[#84CC16]/30 cursor-pointer active:scale-97"
            >
              {pinLockoutInfo.isLocked ? 'Locked for Security Review' : 'Unlock Dashboard'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Pending approvals
  const pendingTutorApprovals = tutorBookings.filter(b => b.status === 'pending_parent');
  const pendingChampApprovals = championshipRegistrations.filter(r => r.status === 'pending_parent');
  const totalPendingCount = pendingTutorApprovals.length + pendingChampApprovals.length;
  const activeChampionship = championshipRegistrations.some(r => r.status === 'paid' || r.status === 'completed');

  // Latest exam score & transaction summaries for Bento grid cards
  const latestExamResult = examResults[0];
  const latestTransaction = parentWallet.transactions[0];

  // Trigger Live Paystack Inline Checkout SDK
  const handlePaystackTopUp = async () => {
    playSound.tileTap();
    setPaystackError(null);
    if (securityStatus.walletFrozen || currentUserProfile?.walletFrozen) {
      playSound.buzz();
      setPaystackError(
        securityStatus.walletFrozenReason ||
          currentUserProfile?.walletFrozenReason ||
          'Wallet top-up is paused while this wallet is frozen for security review.'
      );
      return;
    }
    setIsProcessingPaystack(true);

    if (typeof (window as any).PaystackPop === 'undefined') {
      playSound.buzz();
      setPaystackError('Paystack checkout SDK is loading. Please verify network access to js.paystack.co and try again.');
      setIsProcessingPaystack(false);
      return;
    }

    const activeKey = paystackConfig.publicKey;
    if (!activeKey) {
      playSound.buzz();
      if (isAdmin) {
        setIsKeySettingsOpen(true);
        setPaystackError('Paystack Public Key not configured yet. Please configure your key below.');
      } else {
        setPaystackError('Paystack live payment gateway is not yet configured. Please notify the school administrator or support.');
      }
      setIsProcessingPaystack(false);
      return;
    }

    const payerEmail = currentUserProfile?.email || 'wowrealities@gmail.com';
    const txRef = `PSTK_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

    try {
      const handler = (window as any).PaystackPop.setup({
        key: activeKey,
        email: payerEmail,
        amount: Math.round(topUpAmount * 100),
        currency: 'NGN',
        ref: txRef,
        channels:
          paymentChannel === 'transfer'
            ? ['bank_transfer']
            : paymentChannel === 'ussd'
            ? ['ussd']
            : ['card', 'bank', 'ussd', 'bank_transfer'],
        metadata: {
          custom_fields: [
            { display_name: 'Parent Name', variable_name: 'parent_name', value: parentName },
            { display_name: 'Ward Name', variable_name: 'ward_name', value: wardName },
            { display_name: 'Platform', variable_name: 'platform', value: 'Student Companion NG' }
          ]
        },
        callback: function (response: { reference: string }) {
          (async () => {
            setIsProcessingPaystack(true);
            try {
              const verifyRes = await fetch('/api/paystack/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  reference: response.reference,
                  amountNaira: topUpAmount,
                  email: payerEmail,
                  parentId:
                    currentUserProfile?.id ||
                    (payerEmail ? payerEmail.replace(/[^a-zA-Z0-9_-]/g, '_') : 'parent_default'),
                  wardName,
                  purpose: 'parent_wallet_topup'
                })
              });

              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                playSound.levelUp();
                fundParentWallet(topUpAmount);
                setVerifiedReceipt({
                  reference: response.reference,
                  amount: topUpAmount,
                  channel: verifyData.channel || paymentChannel,
                  date: new Date().toLocaleTimeString()
                });
                setIsTopUpModalOpen(false);
              } else {
                playSound.buzz();
                setPaystackError(verifyData.error || 'Payment reference verification failed at backend.');
              }
            } catch (err: any) {
              playSound.buzz();
              setPaystackError(err?.message || 'Network error verifying Paystack transaction');
            } finally {
              setIsProcessingPaystack(false);
            }
          })();
        },
        onClose: function () {
          setIsProcessingPaystack(false);
        }
      });

      handler.openIframe();
    } catch (err: any) {
      playSound.buzz();
      console.error('Paystack popup error:', err);
      setPaystackError(err?.message || 'Failed to open Paystack payment window');
      setIsProcessingPaystack(false);
    }
  };

  return (
    <div className="flex-1 min-h-0 h-full w-full flex flex-col bg-[#101C34] text-slate-100 overflow-hidden relative">
      {/* =========================================================================
          MAIN SCROLLABLE VIEWPORT (Full Bottom Clearance on All Devices)
         ========================================================================= */}
      <div
        className={
          parentTab === 'community'
            ? 'flex-1 min-h-0 h-full w-full flex flex-col px-4 pt-3 pb-3 gap-3 overflow-hidden'
            : 'flex-1 min-h-0 h-full w-full overflow-y-auto px-4 pt-4 pb-24 space-y-4 touch-pan-y'
        }
      >
        {/* Frozen Wallet Security Notice */}
        {(securityStatus.walletFrozen || currentUserProfile?.walletFrozen) && (
          <div className="shrink-0 bg-rose-950/80 border border-rose-700 text-rose-100 rounded-2xl px-4 py-3 text-xs flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">Wallet Temporarily Frozen by Trust &amp; Safety</strong>
              <span className="text-rose-200">
                {securityStatus.walletFrozenReason ||
                  currentUserProfile?.walletFrozenReason ||
                  'Top-ups, escrow releases, and drill charges are paused pending Super Admin review.'}
              </span>
            </div>
          </div>
        )}

        {/* Top Guardian Hero Header */}
        <div className="shrink-0 relative overflow-hidden bg-gradient-to-br from-[#0F1A30] via-[#142343] to-[#0A1222] border-2 border-[#84CC16]/60 rounded-3xl p-4 shadow-[0_14px_32px_rgba(0,0,0,0.45),0_0_24px_rgba(132,204,22,0.18)] space-y-3">
          <div className="absolute -top-12 -left-12 w-36 h-36 bg-[#84CC16]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-[#FF5B00]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-start justify-between gap-2 relative z-10">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-black text-white tracking-tight">Parent Portal</h2>
                <span className="text-[10px] font-black text-[#84CC16] bg-[#84CC16]/15 px-2.5 py-0.5 rounded-xl border border-[#84CC16]/50">
                  Verified Guardian
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-xl border ${
                    paystackConfig.isLive
                      ? 'bg-[#84CC16]/20 text-[#84CC16] border-[#84CC16]/50'
                      : paystackConfig.isTest
                      ? 'bg-[#FF5B00]/20 text-orange-300 border-[#FF5B00]/50'
                      : 'bg-[#0D1527] text-slate-300 border-slate-700'
                  }`}
                >
                  {paystackConfig.isLive ? 'Paystack Live' : paystackConfig.isTest ? 'Paystack Test' : 'Paystack Ready'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Parent: <strong className="text-white">{parentName}</strong> · Ward:{' '}
                <strong className="text-[#84CC16]">{wardName}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    playSound.tileTap();
                    setIsKeySettingsOpen(true);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#0D1527] hover:bg-[#18264A] text-[#84CC16] text-xs font-bold border border-[#84CC16]/40 transition-all cursor-pointer active:scale-95"
                  title="Configure Paystack Keys"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Gateway Keys</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  playSound.tileTap();
                  lockParentPin();
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#0D1527] hover:bg-[#18264A] text-slate-200 text-xs font-bold border border-slate-700 transition-all cursor-pointer active:scale-95"
                title="Lock Parent Session"
              >
                <Lock className="w-3.5 h-3.5 text-[#FF5B00]" />
                <span>Lock</span>
              </button>
            </div>
          </div>

          {/* Linked Children & Wards Bar */}
          {parentTab !== 'community' && (
            <div className="pt-3 border-t border-slate-800/80 space-y-2.5 relative z-10">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-[#FF5B00]/20 border border-[#FF5B00]/40 text-[#FF5B00]">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-white tracking-tight">
                        Linked Children &amp; Wards
                      </span>
                      <span className="text-[10px] font-mono font-black text-[#FF5B00] bg-[#FF5B00]/15 px-2 py-0.2 rounded-lg border border-[#FF5B00]/30">
                        {linkedWards.length}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Select a child to inspect their CBT results, streak, and approvals.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    playSound.tileTap();
                    setLinkWardFeedback(null);
                    setLinkWardInput('');
                    setIsLinkWardModalOpen(true);
                  }}
                  className="py-1.5 px-3 rounded-xl bg-[#FF5B00] hover:bg-[#e05000] active:scale-95 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-[#FF5B00]/30 shrink-0"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ Link Child</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {linkedWards.map(w => {
                  const isActive = activeWardId
                    ? w.studentId === activeWardId
                    : w.studentId === linkedWards[0]?.studentId;
                  return (
                    <div
                      key={w.studentId}
                      onClick={() => {
                        playSound.tileTap();
                        setActiveWard(w.studentId);
                      }}
                      className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer relative group flex flex-col justify-between ${
                        isActive
                          ? 'bg-[#0C162A] border-[#84CC16] shadow-[0_0_16px_rgba(132,204,22,0.22)]'
                          : 'bg-[#0D1527]/80 border-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1.5 mb-1.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                              isActive
                                ? 'bg-[#84CC16] text-slate-950 ring-2 ring-[#84CC16]/40'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {w.studentName.slice(0, 1).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-black text-white text-xs truncate">{w.studentName}</span>
                              {isActive && (
                                <span className="text-[9px] font-black text-slate-950 bg-[#84CC16] px-1.5 py-0.2 rounded-md shrink-0">
                                  Active
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 block truncate">
                              {w.classLevel} {w.stream ? `· ${w.stream}` : ''}
                            </span>
                          </div>
                        </div>

                        {linkedWards.length > 1 && (
                          <button
                            type="button"
                            onClick={e => {
                              e.stopPropagation();
                              playSound.tileTap();
                              setConfirmUnlinkWard(w);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[#FF5B00]/20 rounded-lg text-slate-400 hover:text-[#FF5B00] transition-all cursor-pointer"
                            title="Unlink ward"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-slate-800/80 text-slate-400">
                        <span className="truncate max-w-[140px]">{w.schoolName}</span>
                        <span className="font-mono font-bold text-[9px] text-[#84CC16] bg-[#14203D] px-1.5 py-0.5 rounded border border-slate-700">
                          {w.studentLinkCode}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Verified Paystack Receipt Banner */}
        {verifiedReceipt && (
          <div className="p-3.5 rounded-2xl bg-[#142B22] border-2 border-[#84CC16]/60 flex items-center justify-between text-xs shadow-lg">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#84CC16] shrink-0" />
              <div>
                <span className="font-black text-white block">
                  Payment Verified by Paystack &amp; Credited to Wallet!
                </span>
                <span className="text-[11px] text-lime-200">
                  Reference: <span className="font-mono">{verifiedReceipt.reference}</span> · Amount:{' '}
                  <NairaText amount={verifiedReceipt.amount} /> ({verifiedReceipt.channel}) · Verified at{' '}
                  {verifiedReceipt.date}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                playSound.tileTap();
                setVerifiedReceipt(null);
              }}
              className="text-slate-300 hover:text-white p-1 rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* =====================================================================
            TAB 1: OVERVIEW BENTO GRID (Key Summaries + Tap-to-Open Details)
           ===================================================================== */}
        {parentTab === 'overview' && (
          <motion.div
            key="parent-overview-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3.5"
          >
            {/* BENTO HERO: PARENT ESCROW WALLET (NGN) */}
            <motion.div
              variants={tileVariants}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => {
                playSound.tileTap();
                setActiveDetailSheet('wallet');
              }}
              className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-r from-[#FF5B00] via-[#FF6E1A] to-[#E84D00] border-2 border-white/25 shadow-[0_14px_32px_rgba(255,91,0,0.35)] cursor-pointer select-none group"
            >
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-white/15 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-start justify-between gap-3 relative z-10">
                <div>
                  <div className="flex items-center gap-2 text-white/90 text-xs font-black uppercase tracking-wider">
                    <Wallet className="w-4 h-4" />
                    <span>Parent Escrow Wallet (NGN)</span>
                  </div>
                  <div className="text-3xl font-black font-mono tabular-nums text-white mt-1.5 drop-shadow-sm">
                    <NairaText amount={parentWallet.balanceNaira} />
                  </div>
                  <p className="text-[11px] font-medium text-white/90 mt-1">
                    Secured by Paystack · Escrow protected until tutoring sessions complete
                  </p>
                </div>

                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    playSound.tileTap();
                    setIsTopUpModalOpen(true);
                  }}
                  className="py-2.5 px-4 rounded-2xl bg-[#101C34] hover:bg-[#18294A] text-[#84CC16] border-2 border-[#84CC16]/60 text-xs font-black flex items-center gap-1.5 shadow-xl cursor-pointer active:scale-95 shrink-0"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Fund Wallet</span>
                </button>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-[11px] font-bold text-white/95 relative z-10">
                <span>Tap card for escrow breakdown &amp; funding options</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* 2-COLUMN BENTO ROW: PREPARE FOR EXAM PASS & TERMLY CHAMPIONSHIP REGISTRATIONS */}
            <div className="grid grid-cols-2 gap-3.5">
              {/* PREPARE FOR EXAM PASS */}
              <motion.div
                variants={tileVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playSound.tileTap();
                  setActiveDetailSheet('exam-prep');
                }}
                className="rounded-3xl p-4 bg-gradient-to-br from-[#12241D] to-[#0B1613] border-2 border-[#84CC16]/50 hover:border-[#84CC16] shadow-xl cursor-pointer select-none group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#84CC16]/20 border border-[#84CC16]/50 flex items-center justify-center text-[#84CC16]">
                      <Calendar className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    {examPrepState?.isUnlocked ? (
                      <span className="text-[9px] font-black text-slate-950 bg-[#84CC16] px-2 py-0.5 rounded-lg uppercase">
                        Active
                      </span>
                    ) : (
                      <span className="text-[9px] font-black text-orange-200 bg-[#FF5B00]/25 border border-[#FF5B00]/60 px-2 py-0.5 rounded-lg uppercase">
                        Locked
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-white tracking-tight leading-tight">
                    Prepare For Exam Pass
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                    {examPrepState?.isUnlocked
                      ? `₦4,000 tutor credits ready for ${wardName}`
                      : `NERDC timetable + ₦4,000 tutor voucher`}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#84CC16]/20 flex items-center justify-between text-[10px] font-black text-[#84CC16]">
                  <span>{examPrepState?.isUnlocked ? '₦4,000 Credits' : '₦15,000 Pass'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

              {/* TERMLY CHAMPIONSHIP REGISTRATIONS */}
              <motion.div
                variants={tileVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playSound.tileTap();
                  setActiveDetailSheet('championship');
                }}
                className="rounded-3xl p-4 bg-gradient-to-br from-[#261812] to-[#140E0B] border-2 border-[#FF5B00]/50 hover:border-[#FF5B00] shadow-xl cursor-pointer select-none group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#FF5B00]/20 border border-[#FF5B00]/50 flex items-center justify-center text-[#FF5B00]">
                      <Trophy className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-[9px] font-black text-orange-200 bg-[#FF5B00]/25 border border-[#FF5B00]/50 px-2 py-0.5 rounded-lg font-mono">
                      ₦10,000
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-white tracking-tight leading-tight">
                    Termly Championship Registrations
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                    {pendingChampApprovals.length > 0
                      ? `${pendingChampApprovals.length} pending authorization for ${wardName}`
                      : activeChampionship
                      ? `${wardName} registered for 3-Day Cup`
                      : `Prizes: Android Phone, Hoodie & Bag`}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#FF5B00]/25 flex items-center justify-between text-[10px] font-black text-[#FF5B00]">
                  <span>
                    {pendingChampApprovals.length > 0
                      ? 'Action Needed'
                      : activeChampionship
                      ? 'Entry Active'
                      : 'View Details'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </div>

            {/* 2-COLUMN BENTO ROW: PHYSICAL TUTORING APPROVALS & ACADEMIC PROGRESS */}
            <div className="grid grid-cols-2 gap-3.5">
              {/* PHYSICAL TUTORING APPROVALS */}
              <motion.div
                variants={tileVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playSound.tileTap();
                  setParentTab('approvals');
                }}
                className={`rounded-3xl p-4 border-2 shadow-xl cursor-pointer select-none group flex flex-col justify-between ${
                  pendingTutorApprovals.length > 0
                    ? 'bg-gradient-to-br from-[#2B1710] to-[#140E0C] border-[#FF5B00] shadow-[0_8px_24px_rgba(255,91,0,0.22)]'
                    : 'bg-[#14203D] border-[#84CC16]/40 hover:border-[#84CC16]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <div
                      className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${
                        pendingTutorApprovals.length > 0
                          ? 'bg-[#FF5B00]/20 border-[#FF5B00]/60 text-[#FF5B00]'
                          : 'bg-[#84CC16]/20 border-[#84CC16]/50 text-[#84CC16]'
                      }`}
                    >
                      <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    {pendingTutorApprovals.length > 0 ? (
                      <motion.span
                        animate={{ scale: [1, 1.06, 1] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="text-[10px] font-black bg-[#FF5B00] text-white px-2 py-0.5 rounded-lg shadow-sm"
                      >
                        {pendingTutorApprovals.length} Pending
                      </motion.span>
                    ) : (
                      <span className="text-[9px] font-black text-[#84CC16] bg-[#84CC16]/15 border border-[#84CC16]/40 px-2 py-0.5 rounded-lg">
                        All Clear
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-white tracking-tight leading-tight">
                    Physical Tutoring Approvals
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                    {pendingTutorApprovals.length > 0
                      ? 'NIN-verified home visit requests awaiting your escrow PIN'
                      : 'Child Safety Protocol · No pending home visits'}
                  </p>
                </div>

                <div
                  className={`mt-3 pt-2.5 border-t flex items-center justify-between text-[10px] font-black ${
                    pendingTutorApprovals.length > 0
                      ? 'border-[#FF5B00]/30 text-[#FF5B00]'
                      : 'border-slate-700/80 text-[#84CC16]'
                  }`}
                >
                  <span>Open Approvals</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

              {/* ACADEMIC PROGRESS */}
              <motion.div
                variants={tileVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playSound.tileTap();
                  setActiveDetailSheet('academic');
                }}
                className="rounded-3xl p-4 bg-[#14203D] border-2 border-[#84CC16]/45 hover:border-[#84CC16] shadow-xl cursor-pointer select-none group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <div className="w-10 h-10 rounded-2xl bg-[#84CC16]/20 border border-[#84CC16]/50 flex items-center justify-center text-[#84CC16]">
                      <Award className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-1 bg-[#FF5B00]/20 border border-[#FF5B00]/50 px-2 py-0.5 rounded-lg text-[10px] font-black text-[#FF5B00]"
                    >
                      <Flame className="w-3 h-3 fill-[#FF5B00]" />
                      <span className="tabular-nums">{wardStudentProfile.streakDays || student.streakDays}d</span>
                    </motion.div>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-white tracking-tight leading-tight">
                    {wardName}&apos;s Academic Progress
                  </h3>

                  <div className="grid grid-cols-2 gap-1.5 mt-2">
                    <div className="bg-[#0D1527] rounded-xl p-1.5 border border-slate-800 text-center">
                      <span className="text-xs font-black font-mono tabular-nums text-[#84CC16] block">
                        {(wardStudentProfile.xp ?? student.xp).toLocaleString()}
                      </span>
                      <span className="text-[9px] text-slate-400">Total XP</span>
                    </div>
                    <div className="bg-[#0D1527] rounded-xl p-1.5 border border-slate-800 text-center">
                      <span className="text-xs font-black font-mono tabular-nums text-white block">
                        {wardVerifiedCount}
                      </span>
                      <span className="text-[9px] text-slate-400">
                        Verified Notes
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono tabular-nums mt-1.5">
                    {wardVerifiedMinutes}m active reading · {latestExamResult ? `${latestExamResult.percentage}% CBT` : 'No CBT yet'}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-700/80 flex items-center justify-between text-[10px] font-black text-[#84CC16]">
                  <span>View Scorecards</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </div>

            {/* FULL-WIDTH BENTO TILE: RECENT WALLET TRANSACTIONS */}
            <motion.div
              variants={tileVariants}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => {
                playSound.tileTap();
                setActiveDetailSheet('transactions');
              }}
              className="rounded-3xl p-4 bg-[#14203D] border-2 border-slate-700/80 hover:border-[#FF5B00]/60 shadow-xl cursor-pointer select-none group"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-[#0D1527] border border-[#84CC16]/40 flex items-center justify-center text-[#84CC16] shrink-0">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-black text-white tracking-tight">
                        Recent Wallet Transactions
                      </h3>
                      <span className="text-[10px] font-mono font-bold text-slate-300 bg-[#0D1527] px-2 py-0.2 rounded-lg border border-slate-700">
                        {parentWallet.transactions.length} entries
                      </span>
                    </div>
                    {latestTransaction ? (
                      <p className="text-xs text-slate-300 mt-0.5 truncate">
                        Latest: <strong className="text-white">{latestTransaction.description}</strong> ·{' '}
                        <span className={latestTransaction.type === 'credit' ? 'text-[#84CC16] font-bold' : 'text-[#FF5B00] font-bold'}>
                          <NairaText
                            amount={latestTransaction.amountNaira}
                            prefix={latestTransaction.type === 'credit' ? '+' : '-'}
                          />
                        </span>
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400 mt-0.5">Tap to inspect your escrow wallet ledger</p>
                    )}
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-[#FF5B00] group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* =====================================================================
            TAB 2: APPROVALS WORKSPACE (Physical Tutoring & Championship Queue)
           ===================================================================== */}
        {parentTab === 'approvals' && (
          <motion.div
            key="parent-approvals-tab"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {/* Physical Tutoring Approvals */}
            <motion.div
              variants={tileVariants}
              className="rounded-3xl p-4 bg-[#14203D] border-2 border-[#FF5B00]/45 space-y-3 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-2xl bg-[#FF5B00]/20 border border-[#FF5B00]/50 flex items-center justify-center text-[#FF5B00]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white tracking-tight flex items-center gap-2">
                      <span>Physical Tutoring Approvals</span>
                      {pendingTutorApprovals.length > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-[#FF5B00] text-white text-[10px] font-black">
                          {pendingTutorApprovals.length}
                        </span>
                      )}
                    </h3>
                    <span className="text-[11px] text-slate-400">Child Safety Protocol</span>
                  </div>
                </div>
              </div>

              {pendingTutorApprovals.length === 0 ? (
                <div className="bg-[#0D1527] rounded-2xl p-5 text-center border border-slate-800">
                  <CheckCircle2 className="w-7 h-7 text-[#84CC16] mx-auto mb-1.5" />
                  <span className="text-xs font-black text-white block">All Tutor Requests Approved</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    No pending physical home visits awaiting your authorization.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pendingTutorApprovals.map(req => (
                    <div
                      key={req.id}
                      className="bg-[#0D1527] rounded-2xl p-4 border-2 border-[#FF5B00]/60 space-y-3 shadow-md"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={req.tutorPhoto}
                            alt={req.tutorName}
                            referrerPolicy="no-referrer"
                            className="w-11 h-11 rounded-2xl object-cover bg-slate-800 ring-2 ring-[#FF5B00]/70"
                          />
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h4 className="text-xs font-black text-white">{req.tutorName}</h4>
                              <span className="text-[#84CC16] bg-[#84CC16]/15 px-1.5 py-0.5 rounded-lg border border-[#84CC16]/40 text-[10px] font-bold flex items-center gap-0.5">
                                <ShieldCheck className="w-3 h-3" /> NIN Verified
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-300 mt-0.5">
                              {req.subject} · {req.topic}
                            </p>
                          </div>
                        </div>

                        <span className="text-xs font-black font-mono text-[#FF5B00]">
                          <NairaText amount={req.amountNaira} />
                        </span>
                      </div>

                      <div className="bg-[#14203D] p-2.5 rounded-xl border border-slate-800 text-xs text-slate-200 space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-[#84CC16]" />
                          <span>
                            Scheduled for: <strong>{req.date}</strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                          <Clock className="w-3.5 h-3.5 text-[#FF5B00]" />
                          <span>Type: Physical Home Tutoring at registered residence</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            playSound.tileTap();
                            rejectTutorBooking(req.id);
                          }}
                          className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
                        >
                          Decline
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            playSound.correct();
                            approveTutorBooking(req.id);
                          }}
                          className="flex-1 py-2 px-3 rounded-xl bg-[#84CC16] hover:bg-[#A3E635] text-slate-950 text-xs font-black transition-all shadow-md shadow-[#84CC16]/25 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Authorize &amp; Escrow</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Termly Championship Registrations */}
            <motion.div
              variants={tileVariants}
              className="rounded-3xl p-4 bg-[#14203D] border-2 border-[#84CC16]/40 space-y-3 shadow-xl"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-[#FF5B00]/20 border border-[#FF5B00]/50 flex items-center justify-center text-[#FF5B00] shrink-0">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-black text-white tracking-tight">
                        Termly Championship Registrations
                      </h3>
                      <span className="text-[10px] bg-[#FF5B00]/20 text-[#FF5B00] font-black px-2 py-0.5 rounded-lg border border-[#FF5B00]/40 font-mono">
                        <NairaText amount={10000} /> Fee
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Prizes: 1st Android Phone · 2nd Scholar Hoodie · 3rd School Bag &amp; Calculator
                    </p>
                  </div>
                </div>
              </div>

              {pendingChampApprovals.length > 0 ? (
                <div className="space-y-3">
                  {pendingChampApprovals.map(reg => (
                    <div
                      key={reg.id}
                      className="bg-[#0D1527] p-4 rounded-2xl border-2 border-[#FF5B00]/50 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-black text-white text-xs block">{reg.studentName}</span>
                          <span className="text-[11px] text-slate-400">
                            {reg.studentSchool} · {reg.classLevel} (Official Class Curriculum)
                          </span>
                        </div>
                        <span className="text-xs font-black text-[#FF5B00] font-mono">
                          <NairaText amount={reg.registrationFeeNaira} />
                        </span>
                      </div>

                      <div className="bg-[#14203D] p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
                        <span>Parent Wallet Available Balance:</span>
                        <strong className="text-[#84CC16] font-mono">
                          <NairaText amount={parentWallet.balanceNaira} />
                        </strong>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        {parentWallet.balanceNaira < reg.registrationFeeNaira ? (
                          <button
                            type="button"
                            onClick={() => {
                              playSound.tileTap();
                              setTopUpAmount(reg.registrationFeeNaira);
                              setIsTopUpModalOpen(true);
                            }}
                            className="flex-1 py-2.5 px-3 rounded-xl bg-[#FF5B00] hover:bg-[#e05000] text-white text-xs font-black transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <PlusCircle className="w-3.5 h-3.5" />
                            <span>
                              Fund <NairaText amount={reg.registrationFeeNaira} /> &amp; Authorize
                            </span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              playSound.levelUp();
                              approveChampionshipRegistration(reg.id);
                            }}
                            className="flex-1 py-2.5 px-3 rounded-xl bg-[#84CC16] hover:bg-[#A3E635] text-slate-950 text-xs font-black transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>
                              Authorize &amp; Escrow <NairaText amount={reg.registrationFeeNaira} />
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : activeChampionship ? (
                <div className="bg-[#0D1527] p-3.5 rounded-2xl border border-[#84CC16]/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#84CC16] shrink-0" />
                    <div>
                      <span className="text-white font-bold block">
                        {wardName} is Registered for the 3-Day Championship!
                      </span>
                      <span className="text-[11px] text-slate-400">
                        ₦10,000 Entry fee confirmed · Ward can compete across Day 1, Day 2, and Day 3
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#84CC16] text-slate-950 font-black px-2.5 py-0.5 rounded-full">
                    Entry Active
                  </span>
                </div>
              ) : (
                <div className="bg-[#0D1527] p-3.5 rounded-2xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                  <span>No pending competition requests from {wardName} right now.</span>
                  <span className="text-[10px] font-bold text-[#FF5B00]">Term 2 Championship</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* =====================================================================
            TAB 3: PARENTS' DISCUSSION LOUNGE
           ===================================================================== */}
        {parentTab === 'community' && (
          <div className="flex-1 min-h-0 w-full flex flex-col">
            <ParentCommunityForum />
          </div>
        )}
      </div>

      {/* =========================================================================
          MATCHING NAVY & LIME BOTTOM NAVIGATION DOCK (Overview · Approvals · Lounge)
         ========================================================================= */}
      <nav className="w-full bg-[#0D1527]/95 backdrop-blur-xl border-t border-slate-800/80 px-3 py-2 flex items-center justify-around shrink-0 z-30 select-none relative shadow-2xl">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#84CC16_1px,transparent_1px)] [background-size:16px_16px]" />

        {[
          { id: 'overview' as const, label: 'Overview', icon: LayoutDashboard, badge: 0 },
          { id: 'approvals' as const, label: 'Approvals', icon: ShieldCheck, badge: totalPendingCount },
          { id: 'community' as const, label: 'Lounge', icon: MessageSquare, badge: 0 }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = parentTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                playSound.tileTap();
                setParentTab(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 ${
                isActive ? 'text-[#84CC16] font-bold' : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="parentActiveTabIndicator"
                  className="absolute -top-2 w-8 h-1 rounded-full bg-[#84CC16] shadow-[0_0_12px_#84CC16]"
                  transition={{ type: 'spring' as const, stiffness: 400, damping: 30 }}
                />
              )}

              <div
                className={`relative p-1.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-[#84CC16] scale-110 drop-shadow-[0_0_8px_rgba(132,204,22,0.6)]'
                    : 'text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
                {tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#FF5B00] text-white text-[9px] font-black flex items-center justify-center shadow-md">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] tracking-tight mt-0.5 leading-none">{tab.label}</span>
            </button>
          );
        })}

        {/* Sound FX Mute/Unmute Toggle */}
        <button
          type="button"
          onClick={handleToggleMute}
          title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
          className="p-2 text-slate-400 hover:text-white transition-colors rounded-xl active:scale-90 cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-slate-500" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#84CC16]" />
          )}
        </button>
      </nav>

      {/* =========================================================================
          TAP-TO-OPEN DETAIL SHEETS FOR OVERVIEW BENTO TILES
         ========================================================================= */}
      <AnimatePresence>
        {activeDetailSheet && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                playSound.tileTap();
                setActiveDetailSheet(null);
              }}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: '100%', opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring' as const, damping: 28, stiffness: 320 }}
              className="relative w-full max-w-lg bg-[#101C34] border-2 border-[#84CC16]/50 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl z-10 max-h-[85vh] overflow-y-auto space-y-4"
            >
              {/* WALLET DETAIL SHEET */}
              {activeDetailSheet === 'wallet' && (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#FF5B00]/20 border border-[#FF5B00]/50 text-[#FF5B00]">
                        <Wallet className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white">Parent Escrow Wallet (NGN)</h3>
                        <span className="text-[11px] text-[#84CC16] font-mono">Secured by Paystack</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setActiveDetailSheet(null);
                      }}
                      className="p-1.5 rounded-xl bg-[#14203D] text-slate-300 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-[#14203D] rounded-2xl p-4 border border-slate-800 space-y-2">
                    <span className="text-xs text-slate-400 block">Available Balance</span>
                    <div className="text-3xl font-black font-mono tabular-nums text-[#84CC16]">
                      <NairaText amount={parentWallet.balanceNaira} />
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Funds automatically held in escrow until physical tutoring sessions or championship entries are verified and completed.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      playSound.tileTap();
                      setActiveDetailSheet(null);
                      setIsTopUpModalOpen(true);
                    }}
                    className="w-full py-3 px-4 bg-[#FF5B00] hover:bg-[#e05000] text-white text-xs font-black rounded-2xl shadow-lg shadow-[#FF5B00]/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Fund Wallet</span>
                  </button>
                </>
              )}

              {/* PREPARE FOR EXAM PASS SHEET */}
              {activeDetailSheet === 'exam-prep' && (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#84CC16]/20 border border-[#84CC16]/50 text-[#84CC16]">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white">Prepare For Exam Pass</h3>
                        <span className="text-[11px] text-slate-400">
                          {wardName} ({student.classLevel})
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setActiveDetailSheet(null);
                      }}
                      className="p-1.5 rounded-xl bg-[#14203D] text-slate-300 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Includes the personalized NERDC curriculum daily study roadmap + ₦4,000 1-on-1 tutoring voucher credits for {wardName}.
                  </p>

                  {examPrepState?.isUnlocked ? (
                    <div className="bg-[#14203D] p-4 rounded-2xl border-2 border-[#84CC16]/50 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-[#84CC16] shrink-0" />
                        <div>
                          <span className="text-white font-black block">Full Access Unlocked</span>
                          <span className="text-[11px] text-slate-300">
                            ₦4,000 tutor credits available for {wardName}&apos;s verified sessions.
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-black text-[#84CC16]">₦4,000 Credits</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setActiveDetailSheet(null);
                        setIsExamPrepModalOpen(true);
                      }}
                      className="w-full py-3 px-4 bg-[#84CC16] hover:bg-[#A3E635] text-slate-950 text-xs font-black rounded-2xl shadow-lg shadow-[#84CC16]/25 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Unlock for {wardName} (₦15,000)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </>
              )}

              {/* TERMLY CHAMPIONSHIP REGISTRATIONS SHEET */}
              {activeDetailSheet === 'championship' && (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#FF5B00]/20 border border-[#FF5B00]/50 text-[#FF5B00]">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white">Termly Championship Registrations</h3>
                        <span className="text-[11px] text-slate-400">₦10,000 Entry Fee</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setActiveDetailSheet(null);
                      }}
                      className="p-1.5 rounded-xl bg-[#14203D] text-slate-300 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300">
                    Prizes: 1st Android Phone · 2nd Scholar Hoodie · 3rd School Bag &amp; Calculator
                  </p>

                  {pendingChampApprovals.length > 0 ? (
                    pendingChampApprovals.map(reg => (
                      <div
                        key={reg.id}
                        className="bg-[#14203D] p-4 rounded-2xl border border-[#FF5B00]/50 space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-black text-white text-xs block">{reg.studentName}</span>
                            <span className="text-[11px] text-slate-400">
                              {reg.studentSchool} · {reg.classLevel}
                            </span>
                          </div>
                          <span className="text-xs font-black text-[#FF5B00] font-mono">
                            <NairaText amount={reg.registrationFeeNaira} />
                          </span>
                        </div>

                        {parentWallet.balanceNaira < reg.registrationFeeNaira ? (
                          <button
                            type="button"
                            onClick={() => {
                              playSound.tileTap();
                              setActiveDetailSheet(null);
                              setTopUpAmount(reg.registrationFeeNaira);
                              setIsTopUpModalOpen(true);
                            }}
                            className="w-full py-2.5 px-3 rounded-xl bg-[#FF5B00] hover:bg-[#e05000] text-white text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <PlusCircle className="w-4 h-4" />
                            <span>
                              Fund <NairaText amount={reg.registrationFeeNaira} /> &amp; Authorize
                            </span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              playSound.levelUp();
                              approveChampionshipRegistration(reg.id);
                            }}
                            className="w-full py-2.5 px-3 rounded-xl bg-[#84CC16] hover:bg-[#A3E635] text-slate-950 text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <ShieldCheck className="w-4 h-4" />
                            <span>
                              Authorize &amp; Escrow <NairaText amount={reg.registrationFeeNaira} />
                            </span>
                          </button>
                        )}
                      </div>
                    ))
                  ) : activeChampionship ? (
                    <div className="bg-[#14203D] p-4 rounded-2xl border border-[#84CC16]/50 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#84CC16] shrink-0" />
                        <div>
                          <span className="text-white font-black block">
                            {wardName} is Registered for the 3-Day Championship!
                          </span>
                          <span className="text-[11px] text-slate-400">
                            ₦10,000 Entry fee confirmed
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-[#84CC16] text-slate-950 font-black px-2 py-0.5 rounded-full">
                        Entry Active
                      </span>
                    </div>
                  ) : (
                    <div className="bg-[#14203D] p-4 rounded-2xl border border-slate-800 text-xs text-slate-300">
                      No pending competition requests from {wardName} right now.
                    </div>
                  )}
                </>
              )}

              {/* ACADEMIC PROGRESS SHEET */}
              {activeDetailSheet === 'academic' && (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#84CC16]/20 border border-[#84CC16]/50 text-[#84CC16]">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white">{wardName}&apos;s Academic Progress</h3>
                        <span className="text-[11px] text-slate-400">{student.classLevel} Performance</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setActiveDetailSheet(null);
                      }}
                      className="p-1.5 rounded-xl bg-[#14203D] text-slate-300 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="bg-[#14203D] p-3 rounded-2xl border border-[#FF5B00]/40 text-center">
                      <div className="flex items-center justify-center gap-1 text-[#FF5B00] text-sm font-black tabular-nums">
                        <Flame className="w-4 h-4 fill-[#FF5B00]" />
                        <span>{wardStudentProfile.streakDays || student.streakDays}d</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-1">Study Streak</span>
                    </div>

                    <div className="bg-[#14203D] p-3 rounded-2xl border border-[#84CC16]/40 text-center">
                      <div className="flex items-center justify-center gap-1 text-[#84CC16] text-sm font-black font-mono tabular-nums">
                        <Award className="w-4 h-4" />
                        <span>{(wardStudentProfile.xp ?? student.xp).toLocaleString()}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-1">Total XP</span>
                    </div>

                    <div className="bg-[#14203D] p-3 rounded-2xl border border-slate-700 text-center">
                      <div className="flex items-center justify-center gap-1 text-white text-sm font-black font-mono tabular-nums">
                        <BookOpen className="w-4 h-4 text-[#84CC16]" />
                        <span>{wardVerifiedCount}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-1 tabular-nums">
                        Verified ({wardVerifiedMinutes}m)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-white">Verified Lesson Reading Log</span>
                      <span className="text-[11px] font-mono tabular-nums text-[#84CC16]">
                        {wardVerifiedCount} completed
                      </span>
                    </div>
                    {wardVerifiedLogs.length === 0 ? (
                      <p className="text-xs text-slate-400 bg-[#14203D] p-3 rounded-2xl border border-slate-800">
                        No lesson notes verified yet. Students earn Verified Read status after reading to the bottom, staying active on screen, and passing the note checkpoint.
                      </p>
                    ) : (
                      wardVerifiedLogs.slice(0, 6).map(log => (
                        <div
                          key={`${log.noteId}-${log.completedAt}`}
                          className="bg-[#14203D] p-3 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="min-w-0">
                            <span className="font-bold text-white block truncate">{log.topicTitle}</span>
                            <span className="text-[10px] text-slate-400 block">
                              {log.subject} · {log.classLevel} · Week {log.weekNumber}
                            </span>
                          </div>
                          <div className="text-right shrink-0 font-mono tabular-nums">
                            <span className="font-black text-[#84CC16] block">
                              {log.checkpointScore}/{log.checkpointTotal} Check
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              {log.activeSeconds}s active
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-black text-white block">Recent CBT Performance:</span>
                    {examResults.length === 0 ? (
                      <p className="text-xs text-slate-400 bg-[#14203D] p-3 rounded-2xl border border-slate-800">
                        No mock exams recorded yet this week.
                      </p>
                    ) : (
                      examResults.slice(0, 5).map(res => (
                        <div
                          key={res.id}
                          className="bg-[#14203D] p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs"
                        >
                          <div>
                            <span className="font-bold text-white block">{res.subject}</span>
                            <span className="text-[10px] text-slate-400">{res.examTitle}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-mono font-black text-[#84CC16]">{res.percentage}%</span>
                            <span className="text-[10px] text-slate-400 block">
                              {res.score}/{res.totalQuestions}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}

              {/* RECENT WALLET TRANSACTIONS SHEET */}
              {activeDetailSheet === 'transactions' && (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#84CC16]/20 border border-[#84CC16]/50 text-[#84CC16]">
                        <Receipt className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white">Recent Wallet Transactions</h3>
                        <span className="text-[11px] text-slate-400">Escrow &amp; Paystack Ledger</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setActiveDetailSheet(null);
                      }}
                      className="p-1.5 rounded-xl bg-[#14203D] text-slate-300 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    {parentWallet.transactions.length === 0 ? (
                      <p className="text-xs text-slate-400 p-4 text-center">No wallet transactions yet.</p>
                    ) : (
                      parentWallet.transactions.map(tx => (
                        <div
                          key={tx.id}
                          className="bg-[#14203D] p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                tx.type === 'credit'
                                  ? 'bg-[#84CC16]/20 text-[#84CC16] border border-[#84CC16]/40'
                                  : 'bg-[#FF5B00]/20 text-[#FF5B00] border border-[#FF5B00]/40'
                              }`}
                            >
                              {tx.type === 'credit' ? (
                                <ArrowDownLeft className="w-4 h-4" />
                              ) : (
                                <ArrowUpRight className="w-4 h-4" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <span className="font-bold text-white block text-xs truncate">{tx.description}</span>
                              <span className="text-[10px] text-slate-400 block truncate">
                                {tx.timestamp} · {tx.reference}
                              </span>
                            </div>
                          </div>

                          <span
                            className={`font-black font-mono tabular-nums text-xs shrink-0 ml-2 ${
                              tx.type === 'credit' ? 'text-[#84CC16]' : 'text-[#FF5B00]'
                            }`}
                          >
                            <NairaText
                              amount={tx.amountNaira}
                              prefix={tx.type === 'credit' ? '+' : '-'}
                            />
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          PAYSTACK SECURE CHECKOUT MODAL (Navy, Orange & Lime Theme)
         ========================================================================= */}
      {isTopUpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#101C34] border-2 border-[#84CC16]/50 rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#84CC16]" />
                <h3 className="text-xs font-black text-white flex items-center gap-1.5">
                  <span>Paystack Secure Checkout</span>
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                      paystackConfig.isLive
                        ? 'text-[#84CC16] bg-[#84CC16]/15 border-[#84CC16]/40'
                        : paystackConfig.isTest
                        ? 'text-[#FF5B00] bg-[#FF5B00]/15 border-[#FF5B00]/40'
                        : 'text-slate-300 bg-slate-800 border-slate-700'
                    }`}
                  >
                    {paystackConfig.isLive ? 'LIVE' : paystackConfig.isTest ? 'TEST' : 'GATEWAY'}
                  </span>
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  playSound.tileTap();
                  setIsTopUpModalOpen(false);
                  setPaystackError(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {paystackError && (
              <div className="p-3 rounded-xl bg-[#FF5B00]/15 border border-[#FF5B00]/60 text-xs text-orange-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#FF5B00] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold block">Gateway Notice</span>
                  <p className="text-[11px] text-orange-200/90 leading-tight">{paystackError}</p>
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setIsKeySettingsOpen(true);
                      }}
                      className="mt-1 text-[11px] font-black text-[#84CC16] underline cursor-pointer"
                    >
                      Configure Gateway Keys →
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                Select Amount to Fund (NGN):
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[5000, 10000, 25000].map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      playSound.tileTap();
                      setTopUpAmount(amt);
                    }}
                    className={`py-2.5 px-2 rounded-xl border-2 text-center text-xs font-black transition-all cursor-pointer ${
                      topUpAmount === amt
                        ? 'bg-[#84CC16] border-[#A3E635] text-slate-950 shadow-md shadow-[#84CC16]/25'
                        : 'bg-[#14203D] border-slate-800 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <NairaText amount={amt} />
                  </button>
                ))}
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">
                  Payment Channel:
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'card' as const, title: 'Debit Card', sub: 'Verve/Master' },
                    { id: 'transfer' as const, title: 'Transfer', sub: 'Direct NIBSS' },
                    { id: 'ussd' as const, title: 'USSD', sub: '*737# / *919#' }
                  ].map(ch => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setPaymentChannel(ch.id);
                      }}
                      className={`p-2 rounded-xl border-2 text-left transition-all cursor-pointer ${
                        paymentChannel === ch.id
                          ? 'bg-[#18294A] border-[#84CC16] text-white'
                          : 'bg-[#14203D] border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-[11px] font-black block">{ch.title}</span>
                      <span className="text-[9px] text-slate-400 block">{ch.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#14203D] p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Security Standard</span>
                  <span className="text-[#84CC16] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    256-Bit SSL Encrypted
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Zero transaction fee on verified student educational escrow wallet
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  playSound.tileTap();
                  setIsTopUpModalOpen(false);
                  setPaystackError(null);
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handlePaystackTopUp}
                disabled={isProcessingPaystack}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#FF5B00] hover:bg-[#e05000] text-white text-xs font-black transition-colors shadow-lg shadow-[#FF5B00]/25 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isProcessingPaystack ? (
                  <span className="flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Connecting Paystack...</span>
                  </span>
                ) : (
                  <span>
                    Pay <NairaText amount={topUpAmount} /> Securely
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ADMIN PAYSTACK GATEWAY CONFIGURATION MODAL
         ========================================================================= */}
      {isKeySettingsOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#101C34] border-2 border-[#84CC16]/50 rounded-3xl p-5 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-[#84CC16]" />
                <div>
                  <h3 className="text-xs font-black text-white">Paystack Gateway Configuration</h3>
                  <p className="text-[10px] text-slate-400">Authorized Admin: {currentUserProfile?.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  playSound.tileTap();
                  setIsKeySettingsOpen(false);
                  setKeySaveMsg('');
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {keySaveMsg && (
              <div
                className={`p-2.5 rounded-xl text-xs font-bold border ${
                  keySaveMsg.includes('successfully')
                    ? 'bg-[#84CC16]/20 border-[#84CC16] text-lime-200'
                    : 'bg-[#FF5B00]/20 border-[#FF5B00] text-orange-200'
                }`}
              >
                {keySaveMsg}
              </div>
            )}

            <form onSubmit={handleSavePaystackKeys} className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-200 block mb-1">
                  Paystack Public Key (Client Inline Modal)
                </label>
                <input
                  type="text"
                  value={inputPublicKey}
                  onChange={e => setInputPublicKey(e.target.value)}
                  placeholder="pk_live_..."
                  className="w-full px-3 py-2 rounded-xl bg-[#14203D] border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-[#84CC16]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-200 block mb-1">
                  Paystack Secret Key (Server-Side Verification)
                </label>
                <input
                  type="password"
                  value={inputSecretKey}
                  onChange={e => setInputSecretKey(e.target.value)}
                  placeholder="sk_live_... or sk_test_..."
                  className="w-full px-3 py-2 rounded-xl bg-[#14203D] border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-[#84CC16]"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    playSound.tileTap();
                    setIsKeySettingsOpen(false);
                    setKeySaveMsg('');
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isSavingKeys}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#84CC16] hover:bg-[#A3E635] text-slate-950 font-black flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSavingKeys ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                  <span>Save Configuration</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          LINK CHILD OR WARD MODAL
         ========================================================================= */}
      {isLinkWardModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101C34] border-2 border-[#FF5B00]/50 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-[#FF5B00]/20 text-[#FF5B00] border border-[#FF5B00]/40">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Link Child or Ward</h3>
                  <p className="text-[11px] text-slate-400">Connect using their 6-character Student Link Code or Email</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  playSound.tileTap();
                  setIsLinkWardModalOpen(false);
                  setLinkWardFeedback(null);
                  setLinkWardInput('');
                }}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLinkWardSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Student Link Code or Registered Email
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#84CC16] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={linkWardInput}
                    onChange={e => {
                      setLinkWardInput(e.target.value);
                      if (linkWardFeedback) setLinkWardFeedback(null);
                    }}
                    placeholder="e.g. STU-8K2D or student@domain.ng"
                    className="w-full bg-[#14203D] border-2 border-slate-700 focus:border-[#84CC16] rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono font-black tracking-wider text-white placeholder-slate-500 uppercase focus:outline-none transition-colors"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Students can find their 6-character Link Code directly at the top of their Student Companion dashboard.
                </p>
              </div>

              {linkWardFeedback && (
                <div
                  className={`p-3 rounded-xl border text-xs leading-relaxed space-y-1 ${
                    linkWardFeedback.success
                      ? 'bg-[#84CC16]/15 border-[#84CC16] text-lime-200'
                      : 'bg-[#FF5B00]/15 border-[#FF5B00] text-orange-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold">
                    {linkWardFeedback.success ? (
                      <CheckCircle2 className="w-4 h-4 text-[#84CC16] shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-[#FF5B00] shrink-0" />
                    )}
                    <span>{linkWardFeedback.message}</span>
                  </div>
                  {linkWardFeedback.ward && (
                    <div className="text-[11px] text-[#84CC16] pt-1 border-t border-[#84CC16]/30">
                      <strong>{linkWardFeedback.ward.studentName}</strong> · {linkWardFeedback.ward.classLevel} (
                      {linkWardFeedback.ward.stream || 'General'}) · {linkWardFeedback.ward.schoolName}
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    playSound.tileTap();
                    setIsLinkWardModalOpen(false);
                    setLinkWardFeedback(null);
                    setLinkWardInput('');
                  }}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isLinkingWard || !linkWardInput.trim()}
                  className="py-2.5 px-5 rounded-xl bg-[#FF5B00] hover:bg-[#e05000] disabled:opacity-50 text-white font-black text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#FF5B00]/25 cursor-pointer"
                >
                  {isLinkingWard ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <UserPlus className="w-3.5 h-3.5" />}
                  <span>Verify &amp; Link Ward</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          CONFIRM UNLINK WARD MODAL
         ========================================================================= */}
      {confirmUnlinkWard && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101C34] border-2 border-[#FF5B00]/50 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FF5B00]/15 text-[#FF5B00] border border-[#FF5B00]/40 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-sm font-black text-white">Unlink {confirmUnlinkWard.studentName}?</h3>
              <p className="text-xs text-slate-300 mt-1">
                You will no longer receive weekly scorecards or CBT mock results for this child until re-linked with their code.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  playSound.tileTap();
                  setConfirmUnlinkWard(null);
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleConfirmUnlink(confirmUnlinkWard.studentId)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#FF5B00] hover:bg-[#e05000] text-white text-xs font-black transition-all cursor-pointer shadow-md shadow-[#FF5B00]/30"
              >
                Unlink Child
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exam Prep Unlock Modal for Parent */}
      <ExamPrepUnlockModal
        isOpen={isExamPrepModalOpen}
        onClose={() => setIsExamPrepModalOpen(false)}
        targetStudentName={wardName}
      />
    </div>
  );
};
