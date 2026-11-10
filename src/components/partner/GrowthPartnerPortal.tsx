import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { NairaText, NairaSign, formatNaira } from '../../utils/currency';
import {
  TrendingUp,
  Wallet,
  Users,
  Copy,
  Check,
  Share2,
  ArrowUpRight,
  RefreshCw,
  Search,
  DollarSign,
  PlayCircle,
  Building,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Send
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

export const GrowthPartnerPortal: React.FC = () => {
  const { currentUserProfile, currentUser } = useApp();

  const partnerId = currentUser?.uid || currentUserProfile?.id || 'demo-growth-partner-01';
  const partnerName = currentUserProfile?.fullName || currentUser?.displayName || 'Chidi Okafor (Education Consultant)';
  const partnerEmail = currentUserProfile?.email || currentUser?.email || 'partner@studentcompanion.ng';

  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [data, setData] = useState<PartnerSummaryData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Copy feedback
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Tab navigation
  const [activeTab, setActiveTab] = useState<'overview' | 'referrals' | 'transactions' | 'simulator'>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Withdrawal modal state
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [withdrawLoading, setWithdrawLoading] = useState<boolean>(false);
  const [withdrawSuccessMsg, setWithdrawSuccessMsg] = useState<string | null>(null);

  // Payment simulator state
  const [simStudentId, setSimStudentId] = useState<string>('student-lagos-101');
  const [simStudentName, setSimStudentName] = useState<string>('Amina Bello (SS 3 Science)');
  const [simPlan, setSimPlan] = useState<string>('WAEC & JAMB Termly Pass');
  const [simAmount, setSimAmount] = useState<number>(15000);
  const [simLoading, setSimLoading] = useState<boolean>(false);
  const [simResult, setSimResult] = useState<any | null>(null);

  // Fetch or onboard partner
  const fetchPartnerData = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    else setRefreshing(true);
    setError(null);

    try {
      // Step 1: Ensure partner profile exists on server
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
          accountName: partnerName,
        }),
      });

      if (!onboardRes.ok) {
        const onboardErr = await onboardRes.json().catch(() => ({}));
        console.warn('Partner onboarding note:', onboardErr);
      }

      // Step 2: Fetch partner summary
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
      setError(err?.message || 'Network error fetching partner analytics');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPartnerData();
  }, [partnerId]);

  // Handle Copy Actions
  const handleCopyCode = () => {
    if (!data?.partner?.referralCode) return;
    navigator.clipboard.writeText(data.partner.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    if (!data?.partner?.referralCode) return;
    const url = `${window.location.origin}/?ref=${data.partner.referralCode}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleWhatsAppShare = () => {
    if (!data?.partner?.referralCode) return;
    const text = encodeURIComponent(
      `Hello! Accelerate your secondary school and WAEC/JAMB exam preparation on Student Companion. Register using my official Growth Partner code: *${data.partner.referralCode}* to unlock verified schemes of work, CBT mock drills, and SC AI tutoring: ${window.location.origin}/?ref=${data.partner.referralCode}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  // Process Withdrawal Request
  const handleWithdrawalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(withdrawAmount);
    if (!amount || amount <= 0) return;

    setWithdrawLoading(true);
    setWithdrawSuccessMsg(null);
    try {
      const res = await fetch('/api/partners/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partnerId,
          amountNaira: amount,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setWithdrawSuccessMsg(json.message);
        setWithdrawAmount('');
        await fetchPartnerData(true);
        setTimeout(() => {
          setShowWithdrawModal(false);
          setWithdrawSuccessMsg(null);
        }, 2500);
      } else {
        alert(json.error || 'Withdrawal failed');
      }
    } catch (err: any) {
      alert(err?.message || 'Error processing withdrawal');
    } finally {
      setWithdrawLoading(false);
    }
  };

  // Execute Payment Simulation Trigger
  const handleSimulatePayment = async () => {
    if (!simStudentId || !simAmount || simAmount <= 0) return;

    setSimLoading(true);
    setSimResult(null);

    try {
      // Step 1: Ensure student is linked to partner code
      if (data?.partner?.referralCode) {
        await fetch('/api/partners/register-referral', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            referralCode: data.partner.referralCode,
            studentId: simStudentId,
            studentName: simStudentName,
          }),
        });
      }

      // Step 2: Trigger backend payment processing endpoint
      const res = await fetch('/api/partners/process-subscription-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: simStudentId,
          studentName: simStudentName,
          plan: simPlan,
          amountNaira: simAmount,
          paymentGateway: 'Paystack',
        }),
      });

      const json = await res.json();
      setSimResult(json);

      // Refresh partner summary to reflect instant wallet balance update
      await fetchPartnerData(true);
    } catch (err: any) {
      setSimResult({
        success: false,
        error: err?.message || 'Simulation network error',
      });
    } finally {
      setSimLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center p-8 bg-[#070D18] text-slate-300">
        <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mb-3" />
        <h3 className="text-base font-semibold text-white">Loading Growth Partner Portal...</h3>
        <p className="text-xs text-slate-400 mt-1">Connecting to Firestore ledger and wallet...</p>
      </div>
    );
  }

  const partner = data?.partner;
  const wallet = data?.wallet;
  const referrals = data?.referrals || [];
  const transactions = data?.transactions || [];

  const filteredReferrals = referrals.filter(
    (r) =>
      r.referredUserName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.referredUserId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 w-full bg-[#070D18] overflow-y-auto flex flex-col text-slate-100">
      {/* Top Banner Navigation Header */}
      <div className="w-full bg-slate-900/90 border-b border-slate-800 px-4 py-3 sticky top-0 z-20 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-tight">Growth Partner Network</h2>
              <span className="text-[10px] text-emerald-400 font-mono font-medium">
                10% Lifetime RevShare
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <span>{partner?.name || 'Growth Partner'}</span>
              <span>·</span>
              <span className="font-mono text-slate-300">{partner?.referralCode}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchPartnerData(true)}
            disabled={refreshing}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Refresh Ledger"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-emerald-400' : ''}`} />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full p-4 space-y-5">
        {/* Error Alert if any */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => fetchPartnerData()}
              className="underline font-semibold text-rose-200 ml-3"
            >
              Retry
            </button>
          </div>
        )}

        {/* Primary Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Card 1: Available Digital Wallet Balance */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Available Wallet Balance</span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-white tracking-tight">
                <NairaText amount={wallet?.balanceNaira || 0} />
              </div>
              <p className="text-[11px] text-emerald-400/90 mt-0.5 flex items-center gap-1">
                <span>Withdrawable to Nigerian Bank</span>
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <span>Withdrawn:</span>
                <span className="text-slate-300 font-semibold"><NairaText amount={wallet?.totalWithdrawnNaira || 0} /></span>
              </span>
              <button
                onClick={() => setShowWithdrawModal(true)}
                disabled={(wallet?.balanceNaira || 0) <= 0}
                className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:pointer-events-none text-slate-950 transition-colors shadow-sm cursor-pointer"
              >
                Withdraw Funds
              </button>
            </div>
          </div>

          {/* Card 2: Cumulative Lifetime Revenue Share */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Lifetime Earnings (10%)</span>
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-white tracking-tight">
                <NairaText amount={wallet?.lifetimeEarnedNaira || 0} />
              </div>
              <p className="text-[11px] text-cyan-400/90 mt-0.5">
                Total commissions accrued since onboarding
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Commission Tier</span>
              <span className="font-mono text-cyan-300 font-semibold">10% Lifetime</span>
            </div>
          </div>

          {/* Card 3: Active Attributed Referrals */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Active Attributed Students</span>
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-white font-mono tracking-tight">
                {referrals.length}
              </div>
              <p className="text-[11px] text-purple-400/90 mt-0.5">
                Subscribed learners linked to your code
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Settlement Account</span>
              <span className="text-slate-300 truncate max-w-[140px]">
                {partner?.bankName || 'Access Bank'}
              </span>
            </div>
          </div>
        </div>

        {/* Share & Referral Suite */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/20 border border-slate-800 shadow-lg space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Your Official Referral Tracking Hub</span>
                <span className="text-[10px] text-emerald-400 font-mono">10% Automated Payout</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Share your unique code or link with students, parents, and secondary school WhatsApp groups.
              </p>
            </div>

            <button
              onClick={handleWhatsAppShare}
              className="px-3.5 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors self-start md:self-auto shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share on WhatsApp
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {/* Referral Code Box */}
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Partner Referral Code
                </span>
                <div className="font-mono text-base font-bold text-emerald-400 tracking-wide mt-0.5">
                  {partner?.referralCode || 'GP-PARTNER'}
                </div>
              </div>
              <button
                onClick={handleCopyCode}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedCode ? 'Copied' : 'Copy'}
              </button>
            </div>

            {/* Direct Link Box */}
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
              <div className="overflow-hidden mr-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Direct Tracking URL
                </span>
                <div className="font-mono text-xs text-slate-300 truncate mt-0.5">
                  {typeof window !== 'undefined' ? `${window.location.origin}/?ref=${partner?.referralCode}` : 'studentcompanion.ng/?ref=...'}
                </div>
              </div>
              <button
                onClick={handleCopyLink}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors shrink-0"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedLink ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 border-b border-slate-800 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Overview & Stats
          </button>
          <button
            onClick={() => setActiveTab('referrals')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'referrals'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>Referred Students</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-700/60 text-slate-200">
              {referrals.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'transactions'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>Revenue Share Ledger</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-700/60 text-slate-200">
              {transactions.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'simulator'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Test Trigger Simulator</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Model Architecture Explain Card */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                How the Lifetime Revenue Share Trigger Functions
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <div className="font-semibold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">1</span>
                    Attribution Binding
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    When a student registers using your code, a persistent record is bound in the <code className="text-emerald-400">referrals</code> collection linking your <code className="text-emerald-400">partner_id</code> to their <code className="text-emerald-400">referred_user_id</code>.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <div className="font-semibold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">2</span>
                    Payment Trigger Execution
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Whenever that student pays for a subscription, the Express backend verifies their partner link, calculates 10% of the total amount, and runs an atomic Firestore transaction.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <div className="font-semibold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">3</span>
                    Instant Wallet Credit
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    The 10% commission is immediately credited to your digital wallet with an immutable receipt written into <code className="text-emerald-400">revenueShareTransactions</code>.
                  </p>
                </div>
              </div>
            </div>

            {/* Recent 5 Transactions Preview */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Recent Commission Credits
                </h4>
                <button
                  onClick={() => setActiveTab('transactions')}
                  className="text-xs text-emerald-400 hover:underline"
                >
                  View All ({transactions.length})
                </button>
              </div>

              {transactions.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-800 rounded-lg">
                  No revenue share payments recorded yet. Run the Test Trigger Simulator tab to test a live 10% commission credit!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="pb-2 font-medium">Date</th>
                        <th className="pb-2 font-medium">Student</th>
                        <th className="pb-2 font-medium">Plan</th>
                        <th className="pb-2 font-medium text-right">Student Paid</th>
                        <th className="pb-2 font-medium text-right text-emerald-400">Your 10% Credit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      {transactions.slice(0, 5).map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-800/30">
                          <td className="py-2.5 text-slate-400 text-[11px]">
                            {new Date(tx.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-2.5 text-white font-sans font-medium">
                            {tx.studentName}
                          </td>
                          <td className="py-2.5 text-slate-300 font-sans">
                            {tx.subscriptionPlan}
                          </td>
                          <td className="py-2.5 text-right text-slate-300 tabular-nums font-sans font-medium">
                            <NairaText amount={tx.paymentAmountNaira} />
                          </td>
                          <td className="py-2.5 text-right text-emerald-400 font-bold tabular-nums font-sans">
                            <NairaText amount={tx.commissionAmountNaira} prefix="+" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: REFERRED STUDENTS */}
        {activeTab === 'referrals' && (
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-white">Referred Student Roster</h4>
                <p className="text-xs text-slate-400">
                  Every active student earning you 10% lifetime recurring commissions.
                </p>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter student name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {filteredReferrals.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-800 rounded-lg space-y-2">
                <p>No referred students match your query.</p>
                <p className="text-[11px] text-slate-500">
                  Share your referral code <code className="text-emerald-400 font-mono">{partner?.referralCode}</code> to attribute your first student.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-2 font-medium">Student Name / ID</th>
                      <th className="pb-2 font-medium">Attribution Date</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium text-right">Total Subscriptions</th>
                      <th className="pb-2 font-medium text-right text-emerald-400">Total 10% Commission</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {filteredReferrals.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-800/30">
                        <td className="py-3">
                          <div className="font-sans font-medium text-white">
                            {r.referredUserName || 'Student Scholar'}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">{r.referredUserId}</div>
                        </td>
                        <td className="py-3 text-slate-400 text-[11px]">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3">
                          <span className="text-[11px] font-sans text-emerald-400 font-medium">
                            Active
                          </span>
                        </td>
                        <td className="py-3 text-right text-slate-300 tabular-nums font-sans font-medium">
                          <NairaText amount={r.totalVolumePaidNaira || 0} />
                        </td>
                        <td className="py-3 text-right text-emerald-400 font-bold tabular-nums font-sans">
                          <NairaText amount={r.totalCommissionEarnedNaira || 0} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: REVENUE SHARE TRANSACTIONS LEDGER */}
        {activeTab === 'transactions' && (
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-white">Immutable Revenue Share Audit Ledger</h4>
              <p className="text-xs text-slate-400">
                Verified server-side payment triggers automatically crediting your digital wallet.
              </p>
            </div>

            {transactions.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-800 rounded-lg">
                No revenue share transactions found. Test the trigger in the Simulator tab!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-2 font-medium">Receipt ID</th>
                      <th className="pb-2 font-medium">Date & Time</th>
                      <th className="pb-2 font-medium">Student</th>
                      <th className="pb-2 font-medium">Subscription Plan</th>
                      <th className="pb-2 font-medium text-right">Payment Amount</th>
                      <th className="pb-2 font-medium text-right text-emerald-400">Commission (10%)</th>
                      <th className="pb-2 font-medium text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-800/30">
                        <td className="py-3 text-[11px] text-slate-400">{tx.id}</td>
                        <td className="py-3 text-[11px] text-slate-400">
                          {new Date(tx.createdAt).toLocaleString()}
                        </td>
                        <td className="py-3 text-white font-sans font-medium">{tx.studentName}</td>
                        <td className="py-3 text-slate-300 font-sans">{tx.subscriptionPlan}</td>
                        <td className="py-3 text-right text-slate-300 tabular-nums font-sans font-medium">
                          <NairaText amount={tx.paymentAmountNaira} />
                        </td>
                        <td className="py-3 text-right text-emerald-400 font-bold tabular-nums font-sans">
                          <NairaText amount={tx.commissionAmountNaira} prefix="+" />
                        </td>
                        <td className="py-3 text-center">
                          <span className="text-[10px] font-sans text-emerald-400 font-semibold">
                            Credited
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: TEST TRIGGER SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold text-white">
                  Payment & Revenue Share Trigger Simulator
                </h4>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Test the backend trigger function. Simulates a student completing a subscription payment, verifies the referral link, calculates 10% commission, and executes an atomic Firestore transaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Student ID
                  </label>
                  <input
                    type="text"
                    value={simStudentId}
                    onChange={(e) => setSimStudentId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 font-mono"
                    placeholder="student-user-id"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    value={simStudentName}
                    onChange={(e) => setSimStudentName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. Amina Bello"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Subscription Plan
                  </label>
                  <select
                    value={simPlan}
                    onChange={(e) => {
                      setSimPlan(e.target.value);
                      if (e.target.value === 'WAEC & JAMB Termly Pass') setSimAmount(15000);
                      else if (e.target.value === 'Annual Secondary Scholar Pass') setSimAmount(35000);
                      else if (e.target.value === 'Monthly Revision Pack') setSimAmount(5000);
                    }}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="WAEC & JAMB Termly Pass">WAEC & JAMB Termly Pass (₦15,000)</option>
                    <option value="Annual Secondary Scholar Pass">Annual Secondary Scholar Pass (₦35,000)</option>
                    <option value="Monthly Revision Pack">Monthly Revision Pack (₦5,000)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Payment Amount (<NairaSign /> Naira)
                  </label>
                  <input
                    type="number"
                    value={simAmount}
                    onChange={(e) => setSimAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                  <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium font-sans">
                    <span>Expected 10% Partner Credit:</span>
                    <NairaText amount={Math.round((simAmount * 10) / 100)} />
                  </p>
                </div>

                <button
                  onClick={handleSimulatePayment}
                  disabled={simLoading || !simAmount || simAmount <= 0}
                  className="w-full py-2.5 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  {simLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Executing Backend Trigger Function...
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-4 h-4" />
                      Simulate Successful Payment Trigger
                    </>
                  )}
                </button>
              </div>

              {/* Execution Console Output */}
              <div className="rounded-lg bg-slate-950 border border-slate-800 p-4 font-mono text-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400">
                    <span>Server Trigger Response</span>
                    <span className="text-emerald-400">POST /api/partners/process-subscription-payment</span>
                  </div>

                  {simResult ? (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Transaction Processed Successfully</span>
                      </div>
                      <pre className="text-[11px] text-slate-300 bg-slate-900/80 p-2.5 rounded border border-slate-800 overflow-x-auto">
                        {JSON.stringify(simResult, null, 2)}
                      </pre>
                      <div className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px]">
                        {simResult.message}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-8 text-center text-slate-600 text-xs">
                      Click the simulate button to dispatch a payment and inspect the atomic Firestore execution logs.
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-slate-500 pt-3 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                  <span>Current Partner Code: {partner?.referralCode}</span>
                  <span>Commission: 10%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* WITHDRAWAL MODAL */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Building className="w-4 h-4 text-emerald-400" />
                <span>Withdraw Commission to Bank</span>
              </div>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {withdrawSuccessMsg ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Payout Initiated!</h4>
                <p className="text-xs text-emerald-300">{withdrawSuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleWithdrawalSubmit} className="space-y-4">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1 text-xs">
                  <div className="text-slate-400">Registered Nigerian Bank Account:</div>
                  <div className="font-semibold text-white">
                    {partner?.bankName || 'Access Bank Nigeria'} · {partner?.accountNumber || '0712345678'}
                  </div>
                  <div className="text-slate-400 text-[11px]">{partner?.accountName || partner?.name}</div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Withdrawal Amount (<NairaSign />)</span>
                    <span className="text-slate-400 text-[11px] font-sans flex items-center gap-1 font-medium">
                      <span>Max:</span> <NairaText amount={wallet?.balanceNaira || 0} />
                    </span>
                  </div>
                  <input
                    type="number"
                    min="100"
                    max={wallet?.balanceNaira || 0}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="e.g. 5000"
                    required
                    className="w-full px-3 py-2 text-sm rounded-lg bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowWithdrawModal(false)}
                    className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={withdrawLoading || !withdrawAmount || Number(withdrawAmount) <= 0 || Number(withdrawAmount) > (wallet?.balanceNaira || 0)}
                    className="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 text-xs font-bold transition-colors"
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
