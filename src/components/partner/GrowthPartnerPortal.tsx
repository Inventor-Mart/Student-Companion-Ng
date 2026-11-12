import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { NairaText, NairaSign } from '../../utils/currency';
import { motion, AnimatePresence } from 'motion/react';
import { playSound, toggleSoundMuted, getSoundMuted } from '../../utils/audioSynthesis';
import {
  LayoutDashboard,
  TrendingUp,
  Wallet,
  Users,
  Copy,
  Check,
  Share2,
  ArrowUpRight,
  ArrowRight,
  RefreshCw,
  Search,
  DollarSign,
  Building,
  CheckCircle2,
  ShieldCheck,
  Send,
  FileText,
  X,
  AlertCircle,
  Volume2,
  VolumeX
} from 'lucide-react';

interface PartnerSummaryData {
  partner: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    referralCode: string;
    commissionRatePercent: number;
    totalEarningsNaira: number;
    totalPaidOutNaira: number;
    activeReferralsCount: number;
    bankName?: string;
    accountNumber?: string;
    accountName?: string;
    status: string;
    createdAt: string;
  };
  wallet: {
    partnerId: string;
    balanceNaira: number;
    lifetimeEarnedNaira: number;
    totalWithdrawnNaira: number;
    updatedAt: string;
  };
  referralsCount: number;
  referrals: Array<{
    id: string;
    partnerId: string;
    referredUserId: string;
    referredUserName?: string;
    referralCodeUsed: string;
    status: string;
    totalVolumePaidNaira: number;
    totalCommissionEarnedNaira: number;
    lastPaymentDate?: string;
    createdAt: string;
  }>;
  transactions: Array<{
    id: string;
    partnerId: string;
    studentId: string;
    studentName: string;
    paymentId: string;
    subscriptionPlan: string;
    paymentAmountNaira: number;
    commissionRatePercent: number;
    commissionAmountNaira: number;
    status: string;
    createdAt: string;
  }>;
}

type PartnerTab = 'overview' | 'referrals' | 'transactions' | 'marketing';
type PartnerSheet = 'referral-hub' | 'trigger-info' | null;

export const GrowthPartnerPortal: React.FC = () => {
  const { currentUserProfile, currentUser } = useApp();

  const partnerId = currentUser?.uid || currentUserProfile?.id || 'demo-growth-partner-01';
  const partnerName = currentUserProfile?.fullName || currentUser?.displayName || 'Chidi Okafor (Education Consultant)';
  const partnerEmail = currentUserProfile?.email || currentUser?.email || 'partner@studentcompanion.ng';

  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [data, setData] = useState<PartnerSummaryData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Copy feedback & sound state
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(getSoundMuted());

  // Tab & sheet navigation
  const [activeTab, setActiveTab] = useState<PartnerTab>('overview');
  const [activeSheet, setActiveSheet] = useState<PartnerSheet>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Withdrawal modal state
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [withdrawLoading, setWithdrawLoading] = useState<boolean>(false);
  const [withdrawSuccessMsg, setWithdrawSuccessMsg] = useState<string | null>(null);
  const [withdrawErrorMsg, setWithdrawErrorMsg] = useState<string | null>(null);

  // Fetch or onboard partner
  const fetchPartnerData = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    else setRefreshing(true);
    setError(null);

    try {
      const onboardRes = await fetch('/api/partners/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partnerId,
          name: partnerName,
          email: partnerEmail,
          phone: '+234 803 123 4567',
          bankName: 'Access Bank Nigeria',
          accountNumber: '0712345678',
          accountName: partnerName
        })
      });

      if (!onboardRes.ok) {
        const onboardErr = await onboardRes.json().catch(() => ({}));
        console.warn('Partner onboarding note:', onboardErr);
      }

      const res = await fetch(`/api/partners/${encodeURIComponent(partnerId)}/summary`);
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Failed to load partner summary (${res.status})`);
      }
      const json = await res.json();
      if (json.success) {
        setData(json);
      } else {
        throw new Error(json.error || 'Failed to retrieve partner summary');
      }
    } catch (err: any) {
      console.error('Growth Partner Portal Fetch Error:', err);
      playSound.buzz();
      setError(err?.message || 'Network error fetching partner analytics');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPartnerData();
  }, [partnerId]);

  // Staggered audio pop cascade on Bento views
  useEffect(() => {
    if (loading) return;
    const count = activeTab === 'overview' ? 6 : 3;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < count; i++) {
      timers.push(
        setTimeout(() => {
          playSound.tilePop(i);
        }, 70 + i * 75)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [activeTab, loading]);

  const handleToggleMute = () => {
    const nextMuted = toggleSoundMuted();
    setIsMuted(nextMuted);
    if (!nextMuted) playSound.tileTap();
  };

  // Handle Copy Actions
  const handleCopyCode = () => {
    if (!data?.partner?.referralCode) return;
    navigator.clipboard.writeText(data.partner.referralCode);
    playSound.correct();
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    if (!data?.partner?.referralCode) return;
    const url = `${window.location.origin}/?ref=${data.partner.referralCode}`;
    navigator.clipboard.writeText(url);
    playSound.correct();
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleWhatsAppShare = () => {
    if (!data?.partner?.referralCode) return;
    playSound.tileTap();
    const text = encodeURIComponent(
      `Hello! Accelerate your secondary school and WAEC/JAMB exam preparation on Student Companion. Register using my official Growth Partner code: *${data.partner.referralCode}* to unlock verified schemes of work, CBT mock drills, and SC AI tutoring: ${window.location.origin}/?ref=${data.partner.referralCode}`
    );
    const link = document.createElement('a');
    link.href = `https://wa.me/?text=${text}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  // Process Withdrawal Request (inline feedback instead of window.alert)
  const handleWithdrawalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(withdrawAmount);
    if (!amount || amount <= 0) {
      playSound.buzz();
      setWithdrawErrorMsg('Please enter a valid positive withdrawal amount.');
      return;
    }

    setWithdrawLoading(true);
    setWithdrawSuccessMsg(null);
    setWithdrawErrorMsg(null);

    try {
      const res = await fetch('/api/partners/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partnerId,
          amountNaira: amount
        })
      });
      const json = await res.json();
      if (json.success) {
        playSound.levelUp();
        setWithdrawSuccessMsg(json.message);
        setWithdrawAmount('');
        await fetchPartnerData(true);
        setTimeout(() => {
          setShowWithdrawModal(false);
          setWithdrawSuccessMsg(null);
        }, 2500);
      } else {
        playSound.buzz();
        setWithdrawErrorMsg(json.error || 'Withdrawal failed');
      }
    } catch (err: any) {
      playSound.buzz();
      setWithdrawErrorMsg(err?.message || 'Error processing withdrawal');
    } finally {
      setWithdrawLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 min-h-0 h-full w-full flex flex-col items-center justify-center p-8 bg-[#101C34] text-slate-200">
        <RefreshCw className="w-8 h-8 text-[#84CC16] animate-spin mb-3" />
        <h3 className="text-base font-black text-white">Loading Growth Partner Portal...</h3>
        <p className="text-xs text-slate-300 mt-1">Connecting to Firestore ledger and wallet...</p>
      </div>
    );
  }

  const partner = data?.partner;
  const wallet = data?.wallet;
  const referrals = data?.referrals || [];
  const transactions = data?.transactions || [];

  const filteredReferrals = referrals.filter(
    r =>
      r.referredUserName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.referredUserId.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <div className="flex-1 min-h-0 h-full w-full flex flex-col bg-[#101C34] text-slate-100 overflow-hidden relative">
      {/* =========================================================================
          MAIN SCROLLABLE VIEWPORT (Full Bottom Clearance on All Devices)
         ========================================================================= */}
      <div className="flex-1 min-h-0 h-full w-full overflow-y-auto px-4 pt-4 pb-24 space-y-4 touch-pan-y">
        {/* Top Growth Partner Hero Header */}
        <div className="shrink-0 relative overflow-hidden bg-gradient-to-br from-[#0F1A30] via-[#142343] to-[#0A1222] border-2 border-[#84CC16]/60 rounded-3xl p-4 shadow-[0_14px_32px_rgba(0,0,0,0.45),0_0_24px_rgba(132,204,22,0.18)]">
          <div className="absolute -top-12 -left-12 w-36 h-36 bg-[#84CC16]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-[#FF5B00]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-start justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF5B00] to-[#E04F00] flex items-center justify-center text-white ring-2 ring-[#84CC16] shadow-lg shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-sm sm:text-base font-black text-white tracking-tight truncate">
                    Growth Partner Network
                  </h2>
                  <span className="text-[10px] font-black text-[#84CC16] bg-[#84CC16]/15 px-2 py-0.5 rounded-xl border border-[#84CC16]/50 font-mono shrink-0">
                    10% Lifetime RevShare
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1.5 flex-wrap">
                  <span className="font-semibold text-white truncate">{partner?.name || partnerName}</span>
                  <span>·</span>
                  <span className="font-mono font-bold text-[#84CC16]">
                    {partner?.referralCode || 'GP-PARTNER'}
                  </span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                playSound.tileTap();
                fetchPartnerData(true);
              }}
              disabled={refreshing}
              className="p-2.5 rounded-2xl bg-[#0D1527] hover:bg-[#18294A] border border-slate-700 text-[#84CC16] transition-all cursor-pointer active:scale-95 shrink-0"
              title="Refresh Ledger"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Error Alert if any */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-[#261812] border-2 border-[#FF5B00]/60 text-orange-200 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#FF5B00] shrink-0" />
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                playSound.tileTap();
                fetchPartnerData();
              }}
              className="px-3 py-1 rounded-xl bg-[#FF5B00] text-white font-black text-[11px] cursor-pointer shrink-0"
            >
              Retry
            </button>
          </div>
        )}

        {/* =====================================================================
            TAB 1: OVERVIEW BENTO GRID
           ===================================================================== */}
        {activeTab === 'overview' && (
          <motion.div
            key="partner-overview-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3.5"
          >
            {/* FULL-WIDTH HERO BENTO TILE: AVAILABLE WALLET BALANCE */}
            <motion.div
              variants={tileVariants}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => {
                playSound.tileTap();
                setWithdrawErrorMsg(null);
                setShowWithdrawModal(true);
              }}
              className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-r from-[#FF5B00] via-[#FF6E1A] to-[#E84D00] border-2 border-white/25 shadow-[0_14px_32px_rgba(255,91,0,0.35)] cursor-pointer select-none group"
            >
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-white/15 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-start justify-between gap-3 relative z-10">
                <div>
                  <div className="flex items-center gap-2 text-white/95 text-xs font-black uppercase tracking-wider">
                    <Wallet className="w-4 h-4" />
                    <span>Available Wallet Balance</span>
                  </div>
                  <div className="text-3xl font-black font-mono tabular-nums text-white mt-1.5 drop-shadow-sm">
                    <NairaText amount={wallet?.balanceNaira || 0} />
                  </div>
                  <p className="text-[11px] font-medium text-white/90 mt-1">
                    Withdrawable to Nigerian Bank · Withdrawn:{' '}
                    <strong className="font-mono">
                      <NairaText amount={wallet?.totalWithdrawnNaira || 0} />
                    </strong>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    playSound.tileTap();
                    setWithdrawErrorMsg(null);
                    setShowWithdrawModal(true);
                  }}
                  disabled={(wallet?.balanceNaira || 0) <= 0}
                  className="py-2.5 px-4 rounded-2xl bg-[#101C34] hover:bg-[#18294A] disabled:opacity-50 text-[#84CC16] border-2 border-[#84CC16]/60 text-xs font-black flex items-center gap-1.5 shadow-xl cursor-pointer active:scale-95 shrink-0"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Withdraw Funds</span>
                </button>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-[11px] font-bold text-white/95 relative z-10">
                <span>Tap to withdraw commissions to Nigerian bank</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* 2-COLUMN BENTO ROW: LIFETIME EARNINGS & ACTIVE ATTRIBUTED STUDENTS */}
            <div className="grid grid-cols-2 gap-3.5">
              {/* LIFETIME EARNINGS (10%) */}
              <motion.div
                variants={tileVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playSound.tileTap();
                  setActiveTab('transactions');
                }}
                className="rounded-3xl p-4 bg-[#14203D] border-2 border-[#84CC16]/50 hover:border-[#84CC16] shadow-xl cursor-pointer select-none group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#84CC16]/20 border border-[#84CC16]/50 flex items-center justify-center text-[#84CC16]">
                      <DollarSign className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-[9px] font-mono font-black text-slate-950 bg-[#84CC16] px-2 py-0.5 rounded-lg">
                      10% Lifetime
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-black text-slate-200 tracking-tight">
                    Lifetime Earnings (10%)
                  </h3>
                  <div className="text-xl font-black font-mono tabular-nums text-[#84CC16] mt-1">
                    <NairaText amount={wallet?.lifetimeEarnedNaira || 0} />
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-700/80 flex items-center justify-between text-[10px] font-black text-[#84CC16]">
                  <span>Revenue Share Ledger</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

              {/* ACTIVE ATTRIBUTED STUDENTS */}
              <motion.div
                variants={tileVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playSound.tileTap();
                  setActiveTab('referrals');
                }}
                className="rounded-3xl p-4 bg-[#14203D] border-2 border-[#FF5B00]/50 hover:border-[#FF5B00] shadow-xl cursor-pointer select-none group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#FF5B00]/20 border border-[#FF5B00]/50 flex items-center justify-center text-[#FF5B00]">
                      <Users className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-[9px] font-mono font-bold text-slate-300 bg-[#0D1527] border border-slate-700 px-2 py-0.5 rounded-lg truncate max-w-[95px]">
                      {partner?.bankName || 'Access Bank'}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-black text-slate-200 tracking-tight">
                    Active Attributed Students
                  </h3>
                  <div className="text-xl font-black font-mono tabular-nums text-white mt-1">
                    {referrals.length} Scholars
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#FF5B00]/25 flex items-center justify-between text-[10px] font-black text-[#FF5B00]">
                  <span>Referred Students</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </div>

            {/* 2-COLUMN BENTO ROW: REFERRAL TRACKING HUB & TRIGGER MECHANISM */}
            <div className="grid grid-cols-2 gap-3.5">
              {/* YOUR OFFICIAL REFERRAL TRACKING HUB */}
              <motion.div
                variants={tileVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playSound.tileTap();
                  setActiveSheet('referral-hub');
                }}
                className="rounded-3xl p-4 bg-gradient-to-br from-[#12241D] to-[#0B1613] border-2 border-[#84CC16]/50 hover:border-[#84CC16] shadow-xl cursor-pointer select-none group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#84CC16]/20 border border-[#84CC16]/50 flex items-center justify-center text-[#84CC16]">
                      <Share2 className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        handleCopyCode();
                      }}
                      className="text-[10px] font-black bg-[#0D1527] hover:bg-[#18294A] text-[#84CC16] border border-[#84CC16]/40 px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <h3 className="text-sm font-black text-white tracking-tight leading-tight">
                    Your Official Referral Tracking Hub
                  </h3>
                  <div className="font-mono text-sm font-black text-[#84CC16] mt-1 tracking-wider">
                    {partner?.referralCode || 'GP-PARTNER'}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#84CC16]/20 flex items-center justify-between text-[10px] font-black text-[#84CC16]">
                  <span>Share Link &amp; WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

              {/* HOW THE LIFETIME REVENUE SHARE TRIGGER FUNCTIONS */}
              <motion.div
                variants={tileVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playSound.tileTap();
                  setActiveSheet('trigger-info');
                }}
                className="rounded-3xl p-4 bg-[#14203D] border-2 border-slate-700/80 hover:border-[#FF5B00]/70 shadow-xl cursor-pointer select-none group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#FF5B00]/20 border border-[#FF5B00]/50 flex items-center justify-center text-[#FF5B00]">
                      <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-[9px] font-black text-[#FF5B00] bg-[#FF5B00]/15 border border-[#FF5B00]/40 px-2 py-0.5 rounded-lg">
                      3-Step Engine
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-white tracking-tight leading-tight">
                    How the Lifetime Revenue Share Trigger Functions
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                    Attribution Binding · Payment Trigger Execution · Instant Wallet Credit
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-700/80 flex items-center justify-between text-[10px] font-black text-[#FF5B00]">
                  <span>Inspect Trigger</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </div>

            {/* FULL-WIDTH BENTO TILE: RECENT COMMISSION CREDITS */}
            <motion.div
              variants={tileVariants}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => {
                playSound.tileTap();
                setActiveTab('transactions');
              }}
              className="rounded-3xl p-4 bg-[#14203D] border-2 border-slate-700/80 hover:border-[#84CC16]/60 shadow-xl cursor-pointer select-none group"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-[#0D1527] border border-[#84CC16]/40 flex items-center justify-center text-[#84CC16] shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-black text-white tracking-tight">
                        Recent Commission Credits
                      </h3>
                      <span className="text-[10px] font-mono font-bold text-[#84CC16] bg-[#0D1527] px-2 py-0.2 rounded-lg border border-[#84CC16]/40">
                        {transactions.length} entries
                      </span>
                    </div>
                    {transactions[0] ? (
                      <p className="text-xs text-slate-300 mt-0.5 truncate">
                        Latest: <strong className="text-white">{transactions[0].studentName}</strong> ·{' '}
                        <span className="text-[#84CC16] font-bold">
                          +<NairaText amount={transactions[0].commissionAmountNaira} />
                        </span>{' '}
                        ({transactions[0].subscriptionPlan})
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400 mt-0.5">
                        Share your partner code in Marketing &amp; Share Hub to earn 10% instant commissions
                      </p>
                    )}
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-[#FF5B00] group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* =====================================================================
            TAB 2: REFERRED STUDENT ROSTER
           ===================================================================== */}
        {activeTab === 'referrals' && (
          <motion.div
            key="partner-referrals-tab"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3.5"
          >
            <motion.div
              variants={tileVariants}
              className="rounded-3xl p-4 bg-[#14203D] border-2 border-slate-800 space-y-3 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <h4 className="text-sm font-black text-white">Referred Student Roster</h4>
                  <p className="text-[11px] text-slate-300">
                    Every active student earning you 10% lifetime recurring commissions.
                  </p>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filter student name..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full sm:w-56 pl-9 pr-3 py-2 text-xs rounded-xl bg-[#0D1527] border-2 border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-[#84CC16]"
                  />
                </div>
              </div>

              {filteredReferrals.length === 0 ? (
                <div className="p-7 text-center text-xs text-slate-300 bg-[#0D1527] border border-slate-800 rounded-2xl space-y-2">
                  <Users className="w-8 h-8 text-[#FF5B00] mx-auto opacity-80" />
                  <p className="font-bold text-white">No referred students match your query.</p>
                  <p className="text-[11px] text-slate-400">
                    Share your referral code{' '}
                    <code className="text-[#84CC16] font-mono font-bold">{partner?.referralCode}</code> to attribute your first student.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {filteredReferrals.map(r => (
                    <div
                      key={r.id}
                      className="p-3.5 rounded-2xl bg-[#0D1527] border border-slate-800 hover:border-[#84CC16]/50 flex items-center justify-between gap-3 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-white text-xs truncate">
                            {r.referredUserName || 'Student Scholar'}
                          </span>
                          <span className="text-[9px] font-black text-slate-950 bg-[#84CC16] px-1.5 py-0.2 rounded">
                            Active
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono block truncate mt-0.5">
                          {r.referredUserId} · {new Date(r.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-black font-mono tabular-nums text-[#84CC16] block">
                          +<NairaText amount={r.totalCommissionEarnedNaira || 0} />
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono tabular-nums block">
                          Vol: <NairaText amount={r.totalVolumePaidNaira || 0} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* =====================================================================
            TAB 3: IMMUTABLE REVENUE SHARE AUDIT LEDGER
           ===================================================================== */}
        {activeTab === 'transactions' && (
          <motion.div
            key="partner-ledger-tab"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3.5"
          >
            <motion.div
              variants={tileVariants}
              className="rounded-3xl p-4 bg-[#14203D] border-2 border-slate-800 space-y-3 shadow-xl"
            >
              <div>
                <h4 className="text-sm font-black text-white">Immutable Revenue Share Audit Ledger</h4>
                <p className="text-[11px] text-slate-300">
                  Verified server-side payment triggers automatically crediting your digital wallet.
                </p>
              </div>

              {transactions.length === 0 ? (
                <div className="p-7 text-center text-xs text-slate-300 bg-[#0D1527] border border-slate-800 rounded-2xl">
                  No revenue share transactions found yet. Share your referral link with schools and parents to track live enrollments and commissions here!
                </div>
              ) : (
                <div className="space-y-2.5">
                  {transactions.map(tx => (
                    <div
                      key={tx.id}
                      className="p-3.5 rounded-2xl bg-[#0D1527] border border-slate-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-black text-white">{tx.studentName}</span>
                          <span className="text-[9px] font-black text-[#84CC16] bg-[#84CC16]/15 border border-[#84CC16]/40 px-2 py-0.2 rounded-md">
                            Credited
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-300 block mt-0.5">
                          {tx.subscriptionPlan} · Paid:{' '}
                          <span className="font-mono text-white">
                            <NairaText amount={tx.paymentAmountNaira} />
                          </span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5 truncate">
                          {tx.id} · {new Date(tx.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-sm font-black font-mono tabular-nums text-[#84CC16] block">
                          <NairaText amount={tx.commissionAmountNaira} prefix="+" />
                        </span>
                        <span className="text-[10px] text-[#FF5B00] font-mono font-bold block">
                          10% Credit
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* =====================================================================
            TAB 4: LIVE MARKETING & ENROLLMENT TOOLKIT
           ===================================================================== */}
        {activeTab === 'marketing' && (
          <motion.div
            key="partner-marketing-tab"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3.5"
          >
            <motion.div
              variants={tileVariants}
              className="rounded-3xl p-4 bg-[#14203D] border-2 border-[#84CC16]/45 space-y-4 shadow-xl"
            >
              <div className="border-b border-slate-800 pb-3 flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-[#84CC16]" />
                    <h4 className="text-sm font-black text-white">
                      Live Marketing &amp; Enrollment Toolkit
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Share your unique referral link with secondary schools, parents, tutors, and student communities across Nigeria.
                  </p>
                </div>

                <span className="text-[10px] font-mono font-black text-[#84CC16] bg-[#0D1527] px-2.5 py-1 rounded-xl border border-[#84CC16]/40 shrink-0">
                  10% Lifetime RevShare
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* Direct Referral Link Card */}
                <div className="space-y-3 bg-[#0D1527] p-4 rounded-2xl border border-slate-800">
                  <span className="text-xs font-black text-white block">Your Live Referral Link</span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Students and parents who click your link automatically have your 6-character partner code pre-applied at registration.
                  </p>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={`https://studentcompanion.ng/signup?ref=${partner?.referralCode || 'GROW82'}`}
                      className="flex-1 px-3 py-2 text-xs rounded-xl bg-[#14203D] border border-slate-700 text-white font-mono focus:outline-none select-all"
                    />
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="py-2 px-3 rounded-xl bg-[#84CC16] hover:bg-[#A3E635] text-slate-950 font-black text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                    <span>Assigned Partner Code:</span>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="font-mono font-black text-[#84CC16] tracking-wider hover:underline cursor-pointer"
                    >
                      {partner?.referralCode || 'GROW82'}
                    </button>
                  </div>
                </div>

                {/* One-Tap WhatsApp Promo Card */}
                <div className="space-y-3 bg-[#0D1527] p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-black text-white flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5 text-[#FF5B00]" />
                      <span>WhatsApp Community &amp; Parent Blast</span>
                    </span>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                      Instantly broadcast this approved promotional copy to your PTA groups, schools, and tutoring hubs.
                    </p>
                    <div className="mt-2.5 p-2.5 rounded-xl bg-[#14203D] border border-slate-700/80 text-[11px] text-slate-200 leading-relaxed">
                      &quot;Master WAEC, JAMB &amp; Junior BECE exams with Nigeria&apos;s #1 Student Companion! Register with my official partner code *{partner?.referralCode || 'GROW82'}* for instant access: https://studentcompanion.ng/signup?ref={partner?.referralCode || 'GROW82'}&quot;
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleWhatsAppShare}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FF5B00] hover:bg-[#e05000] text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#FF5B00]/25 transition-all cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share on WhatsApp PTA / School Groups</span>
                  </button>
                </div>
              </div>

              {/* Settlement Account Banner */}
              <div className="p-3.5 rounded-2xl bg-[#0D1527] border border-slate-800 flex items-center justify-between text-xs text-slate-200 gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#84CC16] shrink-0" />
                  <span>
                    Settlement Account: <strong>{partner?.bankName || 'Access Bank Nigeria'}</strong> (
                    {partner?.accountNumber
                      ? `${partner.accountNumber.slice(0, 3)}••••${partner.accountNumber.slice(-3)}`
                      : '071••••678'}
                    ) · {partner?.accountName || partnerName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playSound.tileTap();
                    setWithdrawErrorMsg(null);
                    setShowWithdrawModal(true);
                  }}
                  className="text-[#84CC16] hover:underline font-black text-xs cursor-pointer shrink-0"
                >
                  Withdraw Funds →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* =========================================================================
          MATCHING NAVY & LIME BOTTOM NAVIGATION DOCK
         ========================================================================= */}
      <nav className="w-full bg-[#0D1527]/95 backdrop-blur-xl border-t border-slate-800/80 px-2 py-2 flex items-center justify-around shrink-0 z-30 select-none relative shadow-2xl">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#84CC16_1px,transparent_1px)] [background-size:16px_16px]" />

        {[
          { id: 'overview' as const, label: 'Overview', icon: LayoutDashboard, badge: 0 },
          { id: 'referrals' as const, label: 'Referrals', icon: Users, badge: referrals.length },
          { id: 'transactions' as const, label: 'Ledger', icon: FileText, badge: transactions.length },
          { id: 'marketing' as const, label: 'Marketing', icon: Share2, badge: 0 }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                playSound.tileTap();
                setActiveTab(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 ${
                isActive ? 'text-[#84CC16] font-bold' : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="partnerActiveTabIndicator"
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
          TAP-TO-OPEN DETAIL SHEETS
         ========================================================================= */}
      <AnimatePresence>
        {activeSheet && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                playSound.tileTap();
                setActiveSheet(null);
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
              {/* SHEET 1: YOUR OFFICIAL REFERRAL TRACKING HUB */}
              {activeSheet === 'referral-hub' && (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#84CC16]/20 border border-[#84CC16]/50 text-[#84CC16]">
                        <Share2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white">Your Official Referral Tracking Hub</h3>
                        <span className="text-[11px] text-[#84CC16] font-mono">10% Automated Payout</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setActiveSheet(null);
                      }}
                      className="p-1.5 rounded-xl bg-[#14203D] text-slate-300 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-[#14203D] p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Partner Referral Code
                      </span>
                      <div className="font-mono text-lg font-black text-[#84CC16] mt-0.5">
                        {partner?.referralCode || 'GP-PARTNER'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="px-3 py-1.5 rounded-xl bg-[#0D1527] hover:bg-[#18294A] text-xs font-black text-white border border-[#84CC16]/40 flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-[#84CC16]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                    </button>
                  </div>

                  <div className="bg-[#14203D] p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Direct Tracking URL
                      </span>
                      <div className="font-mono text-xs text-slate-200 truncate mt-0.5">
                        {typeof window !== 'undefined'
                          ? `${window.location.origin}/?ref=${partner?.referralCode}`
                          : 'studentcompanion.ng/?ref=...'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="px-3 py-1.5 rounded-xl bg-[#0D1527] hover:bg-[#18294A] text-xs font-black text-white border border-slate-700 flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-[#84CC16]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleWhatsAppShare}
                    className="w-full py-3 px-4 rounded-2xl bg-[#FF5B00] hover:bg-[#e05000] text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#FF5B00]/30 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share on WhatsApp</span>
                  </button>
                </>
              )}

              {/* SHEET 2: HOW THE LIFETIME REVENUE SHARE TRIGGER FUNCTIONS */}
              {activeSheet === 'trigger-info' && (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#FF5B00]/20 border border-[#FF5B00]/50 text-[#FF5B00]">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white">
                          How the Lifetime Revenue Share Trigger Functions
                        </h3>
                        <span className="text-[11px] text-slate-400">Server-Verified 10% Commission</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setActiveSheet(null);
                      }}
                      className="p-1.5 rounded-xl bg-[#14203D] text-slate-300 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 rounded-2xl bg-[#14203D] border border-slate-800 space-y-1">
                      <div className="font-black text-white flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#84CC16] text-slate-950 flex items-center justify-center text-[10px] font-black">
                          1
                        </span>
                        <span>Attribution Binding</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        When a student registers using your code, a persistent record binds your{' '}
                        <code className="text-[#84CC16]">partner_id</code> to their{' '}
                        <code className="text-[#84CC16]">referred_user_id</code>.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#14203D] border border-slate-800 space-y-1">
                      <div className="font-black text-white flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#FF5B00] text-white flex items-center justify-center text-[10px] font-black">
                          2
                        </span>
                        <span>Payment Trigger Execution</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        Whenever that student pays for a subscription, the backend verifies their partner link, calculates 10% of the total amount, and runs an atomic Firestore transaction.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#14203D] border border-slate-800 space-y-1">
                      <div className="font-black text-white flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#84CC16] text-slate-950 flex items-center justify-center text-[10px] font-black">
                          3
                        </span>
                        <span>Instant Wallet Credit</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        The 10% commission is immediately credited to your digital wallet with an immutable receipt written into the ledger.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          WITHDRAW COMMISSION TO BANK MODAL
         ========================================================================= */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101C34] border-2 border-[#84CC16]/50 rounded-3xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-white font-black text-sm">
                <Building className="w-4 h-4 text-[#84CC16]" />
                <span>Withdraw Commission to Bank</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  playSound.tileTap();
                  setShowWithdrawModal(false);
                }}
                className="text-slate-300 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {withdrawSuccessMsg ? (
              <div className="p-4 rounded-2xl bg-[#14203D] border-2 border-[#84CC16]/50 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#84CC16] mx-auto" />
                <h4 className="text-sm font-black text-white">Payout Initiated!</h4>
                <p className="text-xs text-lime-200">{withdrawSuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleWithdrawalSubmit} className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-[#14203D] border border-slate-800 space-y-1 text-xs">
                  <div className="text-slate-400">Registered Nigerian Bank Account:</div>
                  <div className="font-black text-white">
                    {partner?.bankName || 'Access Bank Nigeria'} · {partner?.accountNumber || '0712345678'}
                  </div>
                  <div className="text-slate-300 text-[11px]">{partner?.accountName || partner?.name}</div>
                </div>

                {withdrawErrorMsg && (
                  <div className="p-3 rounded-xl bg-[#FF5B00]/15 border border-[#FF5B00]/60 text-xs text-orange-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#FF5B00] shrink-0" />
                    <span>{withdrawErrorMsg}</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-200 font-bold">Withdrawal Amount (<NairaSign />)</span>
                    <span className="text-[#84CC16] text-[11px] font-mono font-bold flex items-center gap-1">
                      <span>Max:</span> <NairaText amount={wallet?.balanceNaira || 0} />
                    </span>
                  </div>
                  <input
                    type="number"
                    min="100"
                    max={wallet?.balanceNaira || 0}
                    value={withdrawAmount}
                    onChange={e => setWithdrawAmount(e.target.value)}
                    placeholder="e.g. 5000"
                    required
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#0D1527] border-2 border-slate-700 text-white font-mono focus:outline-none focus:border-[#84CC16]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      playSound.tileTap();
                      setShowWithdrawModal(false);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      withdrawLoading ||
                      !withdrawAmount ||
                      Number(withdrawAmount) <= 0 ||
                      Number(withdrawAmount) > (wallet?.balanceNaira || 0)
                    }
                    className="flex-1 py-2.5 rounded-xl bg-[#84CC16] hover:bg-[#A3E635] disabled:opacity-50 text-slate-950 text-xs font-black transition-colors cursor-pointer"
                  >
                    {withdrawLoading ? 'Processing...' : 'Confirm Withdrawal'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
