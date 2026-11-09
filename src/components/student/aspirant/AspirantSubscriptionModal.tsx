import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { AspirantTier } from '../../../types';
import { NairaText } from '../../../utils/currency';
import {
  X,
  Sparkles,
  Check,
  CheckCircle2,
  Lock,
  Wallet,
  CreditCard,
  Building2,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';

interface AspirantSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTier?: AspirantTier;
}

export const AspirantSubscriptionModal: React.FC<AspirantSubscriptionModalProps> = ({
  isOpen,
  onClose,
  defaultTier = 'elite'
}) => {
  const { aspirantGoal, subscribeAspirantTier, parentWallet } = useApp();
  const [selectedTier, setSelectedTier] = useState<AspirantTier>(defaultTier);
  const [selectedMethod, setSelectedMethod] = useState<'wallet' | 'paystack' | 'bank_transfer'>('wallet');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const currentTier = aspirantGoal.tier || 'free';
  const tierCost = selectedTier === 'elite' ? 10000 : selectedTier === 'basic' ? 5000 : 0;
  const currentBalance = parentWallet.balanceNaira;
  const hasSufficientWalletBalance = currentBalance >= tierCost;

  const handleSubscribe = async () => {
    setIsProcessing(true);
    try {
      await new Promise(r => setTimeout(r, 900));
      const ok = subscribeAspirantTier(selectedTier, selectedMethod);
      if (ok) {
        setIsProcessing(false);
        onClose();
      }
    } catch {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden text-slate-100 flex flex-col max-h-[92vh]">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20">
              <Zap className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-100 leading-tight">Aspirant Hub Membership Tiers</h2>
                <span className="text-[10px] font-semibold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                  Monthly Pass
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                School Leavers WAEC, NECO & JAMB UTME Accelerated Preparation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto py-3.5 space-y-4 pr-1">
          {/* 3 Tier Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 1. Free Tier */}
            <div
              onClick={() => setSelectedTier('free')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                selectedTier === 'free'
                  ? 'bg-slate-800/90 border-slate-600 ring-1 ring-slate-500 shadow-md'
                  : 'bg-slate-950/50 border-slate-800/80 hover:bg-slate-800/40'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">The Hook</span>
                <h3 className="text-sm font-bold text-slate-200 mt-0.5">Free Access</h3>
                <div className="text-lg font-black text-slate-100 font-mono mt-1">₦0</div>
                <div className="text-[10px] text-slate-400 mb-3">Permanent free tier</div>

                <ul className="space-y-1.5 text-[11px] text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>2 recent exam years past questions</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Formulas database unlocked</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>View mock leaderboards</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-slate-500 line-through">
                    <X className="w-3.5 h-3.5 shrink-0" />
                    <span>AI Study Coach 24/7</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-slate-500 line-through">
                    <X className="w-3.5 h-3.5 shrink-0" />
                    <span>Prepare for Exam Plan</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-slate-500 line-through">
                    <X className="w-3.5 h-3.5 shrink-0" />
                    <span>Weekend Mock Tournaments</span>
                  </li>
                </ul>
              </div>

              {currentTier === 'free' && (
                <div className="mt-3 text-[10px] font-bold text-center text-slate-400 bg-slate-900 py-1 rounded-lg">
                  Current Tier
                </div>
              )}
            </div>

            {/* 2. Aspirant Basic */}
            <div
              onClick={() => setSelectedTier('basic')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                selectedTier === 'basic'
                  ? 'bg-emerald-950/50 border-emerald-500 ring-1 ring-emerald-500/50 shadow-md shadow-emerald-500/10'
                  : 'bg-slate-950/50 border-slate-800/80 hover:bg-slate-800/40'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">Popular Foundation</span>
                <h3 className="text-sm font-bold text-slate-100 mt-0.5">Aspirant Basic</h3>
                <div className="text-lg font-black text-emerald-400 font-mono mt-1">
                  ₦5,000 <span className="text-xs text-slate-400 font-normal">/ month</span>
                </div>
                <div className="text-[10px] text-slate-400 mb-3">Topic mastery & past questions</div>

                <ul className="space-y-1.5 text-[11px] text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span><strong>15+ years</strong> past questions (2008–2024)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Full topic-by-topic lesson notes</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Unlimited topical CBT engine</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Admission & University Guide</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-slate-500 line-through">
                    <X className="w-3.5 h-3.5 shrink-0" />
                    <span>AI Drill Sergeant Plan</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-slate-500 line-through">
                    <X className="w-3.5 h-3.5 shrink-0" />
                    <span>National Mock Tournaments</span>
                  </li>
                </ul>
              </div>

              {currentTier === 'basic' && (
                <div className="mt-3 text-[10px] font-bold text-center text-emerald-400 bg-emerald-950 py-1 rounded-lg">
                  Current Tier
                </div>
              )}
            </div>

            {/* 3. Aspirant Elite */}
            <div
              onClick={() => setSelectedTier('elite')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                selectedTier === 'elite'
                  ? 'bg-amber-950/50 border-amber-500 ring-2 ring-amber-500/60 shadow-xl shadow-amber-500/15'
                  : 'bg-slate-950/50 border-slate-800/80 hover:bg-slate-800/40'
              }`}
            >
              <div className="absolute -top-2.5 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                Recommended
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">Ultimate Admission Pass</span>
                <h3 className="text-sm font-bold text-slate-100 mt-0.5">Aspirant Elite</h3>
                <div className="text-lg font-black text-amber-400 font-mono mt-1">
                  ₦10,000 <span className="text-xs text-slate-400 font-normal">/ month</span>
                </div>
                <div className="text-[10px] text-slate-400 mb-3">Full AI drill sergeant & mock prizes</div>

                <ul className="space-y-1.5 text-[11px] text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span><strong>Everything</strong> in Aspirant Basic</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span><strong>24/7 AI Study Coach</strong></span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span><strong>Prepare for Exam Plan</strong> (Drill Sergeant based on days left)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span><strong>National Weekend Mocks</strong> (Compete for ₦50k cash/airtime)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>On-demand tutor booking (out-of-pocket)</span>
                  </li>
                </ul>
              </div>

              {currentTier === 'elite' && (
                <div className="mt-3 text-[10px] font-bold text-center text-amber-400 bg-amber-950 py-1 rounded-lg">
                  Current Tier
                </div>
              )}
            </div>
          </div>

          {/* Payment Selection for Paid Tiers */}
          {selectedTier !== 'free' && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Choose Payment Method for {selectedTier === 'elite' ? '₦10,000' : '₦5,000'}:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('wallet')}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    selectedMethod === 'wallet'
                      ? 'bg-amber-950/40 border-amber-500/70 text-slate-100 ring-1 ring-amber-500/30'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold">
                    <Wallet className="w-3.5 h-3.5 text-amber-400" />
                    <span>Parent Escrow Wallet</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Balance: <strong className="text-slate-200 font-mono"><NairaText amount={currentBalance} /></strong>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('paystack')}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    selectedMethod === 'paystack'
                      ? 'bg-amber-950/40 border-amber-500/70 text-slate-100 ring-1 ring-amber-500/30'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Paystack Gateway</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Debit Card · Bank App · USSD</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('bank_transfer')}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    selectedMethod === 'bank_transfer'
                      ? 'bg-amber-950/40 border-amber-500/70 text-slate-100 ring-1 ring-amber-500/30'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold">
                    <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Direct Bank Transfer</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Virtual Wema Account</div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 shrink-0 flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSubscribe}
            disabled={isProcessing}
            className="flex-[2] py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-60"
          >
            {isProcessing ? (
              <span>Activating Membership...</span>
            ) : selectedTier === 'free' ? (
              <span>Stay on Free Tier</span>
            ) : (
              <>
                <span>Activate {selectedTier.toUpperCase()} (<NairaText amount={tierCost} />/mo)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
