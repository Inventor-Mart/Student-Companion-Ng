import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { StudentSubscriptionPlan } from '../../types';
import { getStudentTierPricing, isReferralPromoActive } from '../../utils/referralPromoPolicy';
import {
  X,
  Check,
  Sparkles,
  CreditCard,
  Wallet,
  Shield,
  Zap,
  Award,
  BookOpen,
  Gamepad2,
  Trophy,
  Bot,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Layers,
  Gift,
  Tag
} from 'lucide-react';

interface StudentSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetPlan?: StudentSubscriptionPlan | null;
}

export const StudentSubscriptionModal: React.FC<StudentSubscriptionModalProps> = ({
  isOpen,
  onClose,
  targetPlan = null
}) => {
  const {
    student,
    parentWallet,
    currentUserProfile,
    subscribeStudentTier,
    unlockStudentAddOn,
    appliedReferralCode,
    appliedReferralPartner,
    applyReferralCode
  } = useApp();

  const currentPlan = student.subscriptionPlan || (student.isSubscribed ? 'basic' : 'free');
  const [selectedPlan, setSelectedPlan] = useState<StudentSubscriptionPlan>(targetPlan || 'standard');
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'wallet'>('paystack');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successReceipt, setSuccessReceipt] = useState<{
    plan: string;
    amount: number;
    reference: string;
    tutorBonus?: number;
  } | null>(null);

  // Add-ons sub-tab
  const [activeTab, setActiveTab] = useState<'tiers' | 'addons'>('tiers');
  const [selectedSingleSubject, setSelectedSingleSubject] = useState<string>('Mathematics');

  // Referral code input state
  const existingRefCode = (student.referredByCode || appliedReferralCode || '').trim().toUpperCase();
  const [referralInput, setReferralInput] = useState<string>(existingRefCode);
  const [isCheckingRef, setIsCheckingRef] = useState<boolean>(false);
  const [refFeedback, setRefFeedback] = useState<{ valid: boolean; text: string } | null>(() =>
    existingRefCode
      ? {
          valid: true,
          text: appliedReferralPartner
            ? `Referral ${existingRefCode} (${appliedReferralPartner.partnerName}) applied — 20% off active through Jan 3, 2027.`
            : `Referral ${existingRefCode} applied — 20% off active through Jan 3, 2027.`
        }
      : null
  );

  useEffect(() => {
    if (existingRefCode && !referralInput) {
      setReferralInput(existingRefCode);
    }
  }, [existingRefCode]);

  if (!isOpen) return null;

  const activeReferral = (student.referredByCode || appliedReferralCode || '').trim().toUpperCase();
  const hasReferralDiscount = Boolean(activeReferral);
  const promoWindowOpen = isReferralPromoActive();
  const isSecondaryGeneral = student.classLevel !== 'University Aspirant';

  const getQuote = (plan: StudentSubscriptionPlan) =>
    getStudentTierPricing(plan, hasReferralDiscount, student.classLevel);

  const planPrices: Record<StudentSubscriptionPlan, number> = {
    free: 0,
    basic: getQuote('basic').finalPriceNaira,
    standard: getQuote('standard').finalPriceNaira,
    elite: getQuote('elite').finalPriceNaira
  };

  const handleApplyReferral = async () => {
    const clean = referralInput.trim().toUpperCase();
    if (!clean) {
      setRefFeedback({ valid: false, text: 'Enter a referral code to apply the 20% promo.' });
      return;
    }
    setIsCheckingRef(true);
    const res = await applyReferralCode(clean);
    setIsCheckingRef(false);
    if (res.valid) {
      setReferralInput(res.referralCode || clean);
      setRefFeedback({
        valid: true,
        text: isSecondaryGeneral && promoWindowOpen
          ? `Verified (${res.partnerName}). 20% discount applied to JSS 1–SS 3 plans through Jan 3, 2027.`
          : `Verified (${res.partnerName}). Referral attributed to your account.`
      });
    } else {
      setRefFeedback({ valid: false, text: res.error || 'Invalid or inactive referral code.' });
    }
  };

  const handleSubscribe = async () => {
    setErrorMessage(null);
    setIsProcessing(true);

    const price = planPrices[selectedPlan];
    if (price === 0) {
      setIsProcessing(false);
      onClose();
      return;
    }

    if (paymentMethod === 'wallet') {
      if (parentWallet.balanceNaira < price) {
        setErrorMessage(
          `Insufficient Parent Escrow Wallet balance (₦${parentWallet.balanceNaira.toLocaleString()} available, ₦${price.toLocaleString()} required). Please choose Paystack or fund your wallet.`
        );
        setIsProcessing(false);
        return;
      }

      const res = await subscribeStudentTier(selectedPlan, 'wallet', undefined, activeReferral || undefined);
      setIsProcessing(false);
      if (res.success) {
        setSuccessReceipt({
          plan: selectedPlan.toUpperCase(),
          amount: res.finalAmountNaira ?? price,
          reference: `WALLET_${Date.now()}`,
          tutorBonus: selectedPlan === 'elite' ? 16000 : undefined
        });
      } else {
        setErrorMessage(res.error || 'Failed to complete wallet deduction.');
      }
      return;
    }

    // Paystack Inline SDK Flow
    if (typeof (window as any).PaystackPop === 'undefined') {
      setErrorMessage('Paystack checkout SDK is loading. Please check network connectivity and try again.');
      setIsProcessing(false);
      return;
    }

    let activeKey = '';
    let liveConfigured = false;
    try {
      const configRes = await fetch('/api/paystack/config');
      if (configRes.ok) {
        const configData = await configRes.json();
        activeKey = typeof configData.publicKey === 'string' ? configData.publicKey.trim() : '';
        liveConfigured = Boolean(configData.liveConfigured && configData.isLive);
      }
    } catch {
      // handled below
    }

    if (!activeKey || !activeKey.startsWith('pk_live_') || !liveConfigured) {
      setErrorMessage('Live Paystack keys (pk_live_ & sk_live_) must be configured by Admin before live checkout. Test keys are blocked.');
      setIsProcessing(false);
      return;
    }

    const payerEmail = currentUserProfile?.email || '';
    if (!payerEmail || !payerEmail.includes('@')) {
      setErrorMessage('A valid signed-in user email is required for Live Paystack checkout.');
      setIsProcessing(false);
      return;
    }
    const txRef = `SUB_${selectedPlan.toUpperCase()}_${Date.now()}_${Math.floor(Math.random() * 100000)}`;

    try {
      const handler = (window as any).PaystackPop.setup({
        key: activeKey,
        email: payerEmail,
        amount: Math.round(price * 100), // in kobo
        currency: 'NGN',
        ref: txRef,
        channels: ['card', 'bank', 'ussd', 'bank_transfer'],
        metadata: {
          custom_fields: [
            { display_name: 'Student Name', variable_name: 'student_name', value: student.name || 'Student' },
            { display_name: 'Subscription Plan', variable_name: 'plan', value: selectedPlan },
            { display_name: 'School', variable_name: 'school', value: student.school || 'Secondary School' },
            { display_name: 'Purpose', variable_name: 'purpose', value: 'student_tier_subscription' }
          ]
        },
        callback: function(response: { reference: string }) {
          (async () => {
            setIsProcessing(true);
            try {
              const verifyRes = await fetch('/api/paystack/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  reference: response.reference,
                  amountNaira: price,
                  email: payerEmail,
                  studentId: student.id || currentUserProfile?.id,
                  studentName: student.name,
                  parentId: currentUserProfile?.id,
                  plan: selectedPlan,
                  classLevel: student.classLevel,
                  referralCode: activeReferral || undefined,
                  purpose: 'student_tier_subscription'
                })
              });

              const verifyData = await verifyRes.json();
              if (verifyRes.ok && verifyData.success) {
                await subscribeStudentTier(selectedPlan, 'paystack', response.reference, activeReferral || undefined, true);
                setSuccessReceipt({
                  plan: selectedPlan.toUpperCase(),
                  amount: price,
                  reference: response.reference,
                  tutorBonus: selectedPlan === 'elite' ? 16000 : undefined
                });
              } else {
                setErrorMessage(verifyData.error || 'Payment verification failed at server.');
              }
            } catch (err: any) {
              setErrorMessage(err?.message || 'Network error verifying Paystack transaction');
            } finally {
              setIsProcessing(false);
            }
          })();
        },
        onClose: function() {
          setIsProcessing(false);
        }
      });

      handler.openIframe();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to open Paystack checkout window.');
      setIsProcessing(false);
    }
  };

  const handleAddOnUnlock = async (
    addon: 'ai_coach' | 'termly_competition' | 'termly_drill_all' | 'termly_drill_single',
    subjectArg?: string
  ) => {
    setErrorMessage(null);
    setIsProcessing(true);
    const targetSubject = addon === 'termly_drill_single' ? (subjectArg || selectedSingleSubject) : undefined;
    const prices: Record<string, number> = {
      ai_coach: 10000,
      termly_competition: 10000,
      termly_drill_all: 5000,
      termly_drill_single: 1000
    };
    const price = prices[addon];

    // Only use Escrow Wallet when expressly selected
    if (paymentMethod === 'wallet') {
      if (parentWallet.balanceNaira < price) {
        setErrorMessage(
          `Insufficient Parent Escrow Wallet balance (₦${parentWallet.balanceNaira.toLocaleString()} available, ₦${price.toLocaleString()} required). Please switch to Paystack Live.`
        );
        setIsProcessing(false);
        return;
      }
      const res = await unlockStudentAddOn(addon, targetSubject, 'wallet');
      setIsProcessing(false);
      if (res.success) {
        setSuccessReceipt({
          plan: addon === 'termly_drill_single' ? `DRILL (${targetSubject})` : addon.replace(/_/g, ' ').toUpperCase(),
          amount: price,
          reference: `WALLET_${Date.now()}`
        });
      } else {
        setErrorMessage(res.error || 'Failed to unlock add-on.');
      }
      return;
    }

    // Paystack Live Flow
    if (typeof (window as any).PaystackPop === 'undefined') {
      setErrorMessage('Paystack checkout SDK is loading. Please check network connectivity and try again.');
      setIsProcessing(false);
      return;
    }

    let activeKey = '';
    let liveConfigured = false;
    try {
      const configRes = await fetch('/api/paystack/config');
      if (configRes.ok) {
        const configData = await configRes.json();
        activeKey = typeof configData.publicKey === 'string' ? configData.publicKey.trim() : '';
        liveConfigured = Boolean(configData.liveConfigured && configData.isLive);
      }
    } catch {
      // handled below
    }

    if (!activeKey || !activeKey.startsWith('pk_live_') || !liveConfigured) {
      setErrorMessage('Live Paystack keys (pk_live_ & sk_live_) are required. Test mode is disabled.');
      setIsProcessing(false);
      return;
    }

    const payerEmail = currentUserProfile?.email || '';
    if (!payerEmail || !payerEmail.includes('@')) {
      setErrorMessage('A valid signed-in user email is required for Live Paystack checkout.');
      setIsProcessing(false);
      return;
    }
    const txRef = `ADDON_${addon.toUpperCase()}_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    const purposeMap: Record<string, string> = {
      ai_coach: 'ai_coach_unlock',
      termly_competition: 'termly_competition_unlock',
      termly_drill_all: 'termly_drill_unlock',
      termly_drill_single: 'termly_drill_unlock'
    };

    try {
      const handler = (window as any).PaystackPop.setup({
        key: activeKey,
        email: payerEmail,
        amount: Math.round(price * 100),
        currency: 'NGN',
        ref: txRef,
        channels: ['card', 'bank', 'ussd', 'bank_transfer'],
        metadata: {
          custom_fields: [
            { display_name: 'Student Name', variable_name: 'student_name', value: student.name || 'Student' },
            { display_name: 'Addon', variable_name: 'addon', value: addon },
            { display_name: 'Subject', variable_name: 'subject', value: targetSubject || 'All Subjects' },
            { display_name: 'Purpose', variable_name: 'purpose', value: purposeMap[addon] }
          ]
        },
        callback: function(response: { reference: string }) {
          (async () => {
            setIsProcessing(true);
            try {
              const verifyRes = await fetch('/api/paystack/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  reference: response.reference,
                  amountNaira: price,
                  email: payerEmail,
                  studentId: student.id || currentUserProfile?.id,
                  studentName: student.name,
                  parentId: currentUserProfile?.id,
                  subject: targetSubject,
                  purpose: purposeMap[addon]
                })
              });

              const verifyData = await verifyRes.json();
              if (verifyRes.ok && verifyData.success) {
                await unlockStudentAddOn(addon, targetSubject, 'paystack', response.reference);
                setSuccessReceipt({
                  plan: addon === 'termly_drill_single' ? `DRILL (${targetSubject})` : addon.replace(/_/g, ' ').toUpperCase(),
                  amount: price,
                  reference: response.reference
                });
              } else {
                setErrorMessage(verifyData.error || 'Server could not verify Paystack payment.');
              }
            } catch (err: any) {
              setErrorMessage(err?.message || 'Network error verifying Paystack transaction.');
            } finally {
              setIsProcessing(false);
            }
          })();
        },
        onClose: function() {
          setIsProcessing(false);
        }
      });
      handler.openIframe();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to open Paystack checkout window.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#0A1220] border border-slate-700 w-full max-w-4xl rounded-3xl p-5 sm:p-6 space-y-5 shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-mono text-[10px] font-bold uppercase tracking-wider">
                Nigerian Secondary School Curriculum
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                Termly Pass (Valid Until Term End)
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Unlock Academic Excellence Pass</span>
            </h2>
            <p className="text-xs text-slate-400">
              Current Plan: <strong className="text-white capitalize">{currentPlan} Tier</strong>
              {student.termExpiresAt && (
                <span> · Valid through: <strong className="text-purple-300">{new Date(student.termExpiresAt).toLocaleDateString()}</strong></span>
              )}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switch between Tiers and Modular Add-ons */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 w-fit">
          <button
            onClick={() => setActiveTab('tiers')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'tiers'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Termly Subscription Plans</span>
          </button>
          <button
            onClick={() => setActiveTab('addons')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'addons'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Modular Add-Ons</span>
          </button>
        </div>

        {/* Success Receipt Banner */}
        {successReceipt && (
          <div className="bg-emerald-950/90 border border-emerald-600 rounded-2xl p-4 text-xs text-emerald-200 space-y-2 shadow-lg">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Subscription Activated Successfully!</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
              <div>
                <span className="text-slate-400 block text-[9px] uppercase">Plan</span>
                <span className="font-bold text-white">{successReceipt.plan}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase">Amount Settled</span>
                <span className="font-bold text-emerald-400">₦{successReceipt.amount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase">Reference</span>
                <span className="text-slate-300 truncate block">{successReceipt.reference}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase">Status</span>
                <span className="text-emerald-300 font-bold">ACTIVE ✓</span>
              </div>
            </div>
            {successReceipt.tutorBonus && (
              <div className="p-2 bg-emerald-900/60 rounded-xl border border-emerald-700/60 text-[11px] text-emerald-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <span>
                  <strong>₦{successReceipt.tutorBonus.toLocaleString()} Pre-paid Tutor Credits</strong> credited to your Parent Escrow Wallet for 1-on-1 verified tutoring bookings!
                </span>
              </div>
            )}
            <button
              onClick={() => {
                setSuccessReceipt(null);
                onClose();
              }}
              className="mt-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
            >
              Continue to Dashboard
            </button>
          </div>
        )}

        {/* TAB 1: 4-TIER SUBSCRIPTION COMPARISON */}
        {activeTab === 'tiers' && !successReceipt && (
          <>
            {/* Referral Promo Code Bar */}
            {isSecondaryGeneral && promoWindowOpen && (
              <div className="bg-slate-950/90 border border-emerald-700/50 rounded-2xl p-3.5 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Tag className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="font-bold text-white">Have a Referral Code?</span>
                      <span className="text-slate-400"> · </span>
                      <span className="text-emerald-300 font-semibold">20% off JSS 1–SS 3 plans until Jan 3, 2027</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      maxLength={16}
                      value={referralInput}
                      onChange={(e) => {
                        setReferralInput(e.target.value.toUpperCase());
                        setRefFeedback(null);
                      }}
                      placeholder="Enter code (e.g. GROW84)"
                      className="bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl px-3 py-1.5 text-xs font-mono font-bold text-white placeholder-slate-500 uppercase focus:outline-none w-44"
                    />
                    <button
                      type="button"
                      onClick={handleApplyReferral}
                      disabled={isCheckingRef}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold cursor-pointer transition-colors shrink-0"
                    >
                      {isCheckingRef ? 'Applying...' : 'Apply'}
                    </button>
                  </div>
                </div>
                {refFeedback && (
                  <p className={`text-[11px] ${refFeedback.valid ? 'text-emerald-300' : 'text-rose-400'}`}>
                    {refFeedback.text}
                  </p>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* 1. Free Tier */}
              <div
                onClick={() => setSelectedPlan('free')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPlan === 'free'
                    ? 'bg-slate-900/90 border-slate-400 shadow-md ring-1 ring-slate-400'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">Free Tier</span>
                    {currentPlan === 'free' && (
                      <span className="text-[9px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                        Current
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-2xl font-black text-white font-mono">₦0</span>
                    <span className="text-[10px] text-slate-500 block">Permanent Free Access</span>
                  </div>

                  <ul className="text-[11px] text-slate-400 space-y-1.5 pt-2 border-t border-slate-800/80">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>Weeks 1 &amp; 2 Notes Only</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>All Formulas Cheat Sheets</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>2 Games (1 attempt/day)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>View Leaderboard (FOMO)</span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-600 line-through">
                      <span>Interactive Topic Quizzes</span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-600 line-through">
                      <span>AI Uniform Verification</span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-600 line-through">
                      <span>Termly Drills &amp; Contests</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/60 text-center">
                  <span className="text-[10px] text-slate-500 font-semibold">The Discovery Hook</span>
                </div>
              </div>

              {/* 2. Basic Tier */}
              <div
                onClick={() => setSelectedPlan('basic')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPlan === 'basic'
                    ? 'bg-blue-950/60 border-blue-500 shadow-md ring-1 ring-blue-500'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-300">Basic Tier</span>
                    <span className="text-[9px] font-bold text-blue-300 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                      Mass Market
                    </span>
                  </div>
                  <div>
                    {getQuote('basic').promoApplied ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-emerald-300 font-mono tabular-nums">
                          ₦{planPrices.basic.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-500 line-through font-mono tabular-nums">₦8,000</span>
                      </div>
                    ) : (
                      <span className="text-2xl font-black text-white font-mono tabular-nums">₦8,000</span>
                    )}
                    <span className="text-[10px] text-slate-400 block">
                      {getQuote('basic').promoApplied ? 'per term (20% referral discount)' : 'per academic term'}
                    </span>
                  </div>

                  <ul className="text-[11px] text-slate-300 space-y-1.5 pt-2 border-t border-slate-800/80">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span><strong>100% NERDC Notes</strong> (Weeks 1–12)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>5 Questions / Quiz</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>4 Arcade Games Unlimited</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>Rank on Student of Week</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>Community Chat Unlocked</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>AI Verification Unlocked</span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-600 line-through">
                      <span>Termly Drills (Add-on)</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/60 text-center">
                  <span className="text-[10px] text-blue-400 font-semibold">Core Curriculum Coverage</span>
                </div>
              </div>

              {/* 3. Standard Tier */}
              <div
                onClick={() => setSelectedPlan('standard')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative shadow-lg ${
                  selectedPlan === 'standard'
                    ? 'bg-purple-950/80 border-purple-500 ring-2 ring-purple-500'
                    : 'bg-purple-950/30 border-purple-800/60 hover:border-purple-600'
                }`}
              >
                <span className="absolute -top-2.5 right-3 text-[9px] font-black uppercase tracking-wider text-amber-300 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-600 shadow">
                  Most Popular
                </span>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-200">Standard Tier</span>
                    <span className="text-[9px] font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      Full Practice
                    </span>
                  </div>
                  <div>
                    {getQuote('standard').promoApplied ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-emerald-300 font-mono tabular-nums">
                          ₦{planPrices.standard.toLocaleString()}
                        </span>
                        <span className="text-xs text-purple-300/60 line-through font-mono tabular-nums">₦15,000</span>
                      </div>
                    ) : (
                      <span className="text-2xl font-black text-white font-mono tabular-nums">₦15,000</span>
                    )}
                    <span className="text-[10px] text-purple-300 block">
                      {getQuote('standard').promoApplied ? 'per term (20% referral discount)' : 'per academic term'}
                    </span>
                  </div>

                  <ul className="text-[11px] text-purple-100 space-y-1.5 pt-2 border-t border-purple-800/80">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>100% All Lesson Notes</strong></span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>100% 10-Question Quizzes</strong></span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>All Study Games Unlimited</strong></span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Termly CBT Drills Unlocked</strong></span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Weekly Competitions</strong></span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Prepare for Exam Plan Included</strong></span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Chat &amp; AI Verification</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-3 mt-3 border-t border-purple-800/60 text-center">
                  <span className="text-[10px] text-amber-300 font-bold">Recommended for All Students</span>
                </div>
              </div>

              {/* 4. Elite / Scholar Tier */}
              <div
                onClick={() => setSelectedPlan('elite')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative shadow-xl ${
                  selectedPlan === 'elite'
                    ? 'bg-amber-950/70 border-amber-500 ring-2 ring-amber-500'
                    : 'bg-amber-950/25 border-amber-800/60 hover:border-amber-600'
                }`}
              >
                <span className="absolute -top-2.5 right-3 text-[9px] font-black uppercase tracking-wider text-amber-300 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-500 shadow">
                  Elite Scholar
                </span>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-200">Elite Tier</span>
                    <span className="text-[9px] font-bold text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                      All-Inclusive
                    </span>
                  </div>
                  <div>
                    {getQuote('elite').promoApplied ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-emerald-300 font-mono tabular-nums">
                          ₦{planPrices.elite.toLocaleString()}
                        </span>
                        <span className="text-xs text-amber-300/60 line-through font-mono tabular-nums">₦60,000</span>
                      </div>
                    ) : (
                      <span className="text-2xl font-black text-white font-mono tabular-nums">₦60,000</span>
                    )}
                    <span className="text-[10px] text-amber-400 block">
                      {getQuote('elite').promoApplied ? 'per term (20% referral discount)' : 'per academic term'}
                    </span>
                  </div>

                  <ul className="text-[11px] text-amber-100 space-y-1.5 pt-2 border-t border-amber-800/80">
                    <li className="flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Everything in Standard Tier</strong></span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>SC AI Coach (24/7 Personal AI)</strong></span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>National Mock Tournaments</strong></span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Prepare for Exam Plan</strong></span>
                    </li>
                    <li className="flex items-start gap-1.5 p-1.5 bg-amber-900/50 rounded-lg border border-amber-600/50">
                      <Gift className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-emerald-300 font-bold">₦16,000 Tutor Credits Included in Wallet</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-3 mt-3 border-t border-amber-800/60 text-center">
                  <span className="text-[10px] text-amber-300 font-bold">1-on-1 Tutoring + Full AI</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selector & Trigger */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>Selected Plan: <strong className="text-purple-300 uppercase">{selectedPlan}</strong> — ₦{planPrices[selectedPlan].toLocaleString()} / term</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Payment covers access for the full academic term.
                  </p>
                </div>

                {/* Payment Option Switcher */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paystack')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                      paymentMethod === 'paystack'
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Paystack (Card/Transfer/USSD)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wallet')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                      paymentMethod === 'wallet'
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Wallet className="w-3.5 h-3.5" />
                    <span>Parent Escrow Wallet (₦{parentWallet.balanceNaira.toLocaleString()})</span>
                  </button>
                </div>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="p-3 bg-rose-950/80 border border-rose-800 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400">
                  Instant activation upon live settlement.
                </span>

                <button
                  type="button"
                  onClick={handleSubscribe}
                  disabled={isProcessing}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs transition-all cursor-pointer shadow-lg flex items-center gap-2 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>
                    {isProcessing
                      ? 'Processing...'
                      : selectedPlan === 'free'
                      ? 'Stay on Free Tier'
                      : `Subscribe ${selectedPlan.toUpperCase()} (₦${planPrices[selectedPlan].toLocaleString()})`}
                  </span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: MODULAR ADD-ONS */}
        {activeTab === 'addons' && !successReceipt && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-white block">Modular Feature Unlocks</span>
              <p className="text-[11px] text-slate-400">
                Unlock specific advanced learning modules on lower tiers without upgrading your whole term plan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Add-on 1: SC AI Coach */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                      <Bot className="w-4 h-4 text-purple-400" />
                      <span>SC AI Coach</span>
                    </span>
                    <span className="text-xs font-black font-mono text-white">₦10,000</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    24/7 personal STEM &amp; Humanities AI tutor to explain tricky steps, past questions, and formula proofs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddOnUnlock('ai_coach')}
                  disabled={isProcessing || Boolean(student.addOns?.aiCoachUnlocked)}
                  className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 text-white text-xs font-bold cursor-pointer transition-colors"
                >
                  {student.addOns?.aiCoachUnlocked ? 'Unlocked ✓' : 'Unlock AI Coach (₦10,000)'}
                </button>
              </div>

              {/* Add-on 2: Termly National Competition Pass */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <span>National Mock Contest</span>
                    </span>
                    <span className="text-xs font-black font-mono text-white">₦10,000</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Compete in the national end-of-term CBT tournament for cash prizes, ranking badges, and school glory.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddOnUnlock('termly_competition')}
                  disabled={isProcessing || Boolean(student.addOns?.termlyCompetitionUnlocked)}
                  className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 text-white text-xs font-bold cursor-pointer transition-colors"
                >
                  {student.addOns?.termlyCompetitionUnlocked ? 'Unlocked ✓' : 'Unlock Tournament (₦10,000)'}
                </button>
              </div>

              {/* Add-on 3: Termly CBT Drills (All Subjects) */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-emerald-400" />
                      <span>Term Drills (All Subjects)</span>
                    </span>
                    <span className="text-xs font-black font-mono text-white">₦5,000</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Full term past exam question papers with instant score analytics across all subjects.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddOnUnlock('termly_drill_all')}
                  disabled={isProcessing || Boolean(student.addOns?.termlyDrillAllSubjects)}
                  className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white text-xs font-bold cursor-pointer transition-colors"
                >
                  {student.addOns?.termlyDrillAllSubjects ? 'Unlocked ✓' : 'Unlock All Subjects (₦5,000)'}
                </button>
              </div>

              {/* Add-on 4: Termly CBT Drill (Single Subject) */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-teal-400" />
                      <span>Single Subject Drill</span>
                    </span>
                    <span className="text-xs font-black font-mono text-white">₦1,000</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Unlock CBT drills and past questions for one specific subject of your choice.
                  </p>
                  <div className="pt-1">
                    <select
                      value={selectedSingleSubject}
                      onChange={(e) => setSelectedSingleSubject(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500"
                    >
                      {['Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Government', 'Literature in English', 'Civic Education', 'Agricultural Science'].map((sub) => (
                        <option key={sub} value={sub}>
                          {sub} {student.addOns?.termlyDrillSingleSubjects?.includes(sub) ? '(Unlocked ✓)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddOnUnlock('termly_drill_single', selectedSingleSubject)}
                  disabled={isProcessing || Boolean(student.addOns?.termlyDrillAllSubjects || student.addOns?.termlyDrillSingleSubjects?.includes(selectedSingleSubject))}
                  className="w-full py-2 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:bg-slate-800 text-white text-xs font-bold cursor-pointer transition-colors"
                >
                  {student.addOns?.termlyDrillAllSubjects || student.addOns?.termlyDrillSingleSubjects?.includes(selectedSingleSubject)
                    ? `${selectedSingleSubject} Unlocked ✓`
                    : `Unlock ${selectedSingleSubject} (₦1,000)`}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
