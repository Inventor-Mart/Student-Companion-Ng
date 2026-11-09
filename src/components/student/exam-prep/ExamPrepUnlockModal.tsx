import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { UNLOCK_FEE_NAIRA, INCLUDED_TUTOR_CREDITS_NAIRA } from '../../../data/examPrepCurriculumData';
import { NairaText } from '../../../utils/currency';
import {
  X,
  Lock,
  Sparkles,
  CheckCircle2,
  Wallet,
  CreditCard,
  GraduationCap,
  Users,
  Award,
  ArrowRight
} from 'lucide-react';

interface ExamPrepUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ExamPrepUnlockModal: React.FC<ExamPrepUnlockModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { parentWallet, unlockExamPrep, student } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'wallet' | 'paystack'>('wallet');

  if (!isOpen) return null;

  const currentBalance = parentWallet.balanceNaira;
  const hasSufficientWalletBalance = currentBalance >= UNLOCK_FEE_NAIRA;
  const deficit = Math.max(0, UNLOCK_FEE_NAIRA - currentBalance);

  const handleConfirmUnlock = async () => {
    setIsProcessing(true);
    try {
      // Simulate real bank/gateway roundtrip
      await new Promise(r => setTimeout(r, 900));
      const ok = unlockExamPrep(selectedMethod);
      if (ok) {
        setIsProcessing(false);
        onSuccess();
      }
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl relative overflow-hidden text-slate-100 flex flex-col max-h-[92vh]">
        {/* Decorative ambient gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 leading-tight">Unlock 'Prepare For Exam'</h2>
              <p className="text-[11px] text-slate-400">Class {student.classLevel} · NERDC & WAEC/JAMB/BECE</p>
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
        <div className="overflow-y-auto py-4 space-y-4 pr-1">
          {/* Price & Value Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-emerald-500/30 flex items-center justify-between shadow-inner">
            <div>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-emerald-400">One-Time Lifetime Access</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-slate-50 font-mono tracking-tight">
                  <NairaText amount={UNLOCK_FEE_NAIRA} />
                </span>
                <span className="text-xs text-slate-400">/ student</span>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold">
                <Sparkles className="w-3 h-3" />
                <span>+ ₦4,000 Tutor Credits</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Included free</p>
            </div>
          </div>

          {/* Included Features */}
          <div className="space-y-2 text-xs">
            <h3 className="text-slate-300 font-semibold text-xs tracking-wide uppercase">What's Included:</h3>
            <div className="space-y-1.5">
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-100 font-medium">AI Daily Study Timetable</strong> — Structured NERDC syllabus pacing for {student.classLevel}
                </span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-100 font-medium">₦4,000 in Tutor Credits</strong> — Redeemable on vetted 1-on-1 tutoring sessions
                </span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-100 font-medium">CBT Practice Shortcuts</strong> — Direct question drill launches for every study block
                </span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-100 font-medium">Diagnostic Personalization</strong> — Targets weak areas (Maths, Sciences, English)
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2 pt-1 border-t border-slate-800/80">
            <h3 className="text-slate-300 font-semibold text-xs tracking-wide uppercase">Choose Payment Source:</h3>

            {/* Option A: Parent Wallet */}
            <button
              type="button"
              onClick={() => setSelectedMethod('wallet')}
              className={`w-full p-3 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${
                selectedMethod === 'wallet'
                  ? 'bg-emerald-950/40 border-emerald-500/60 ring-1 ring-emerald-500/30'
                  : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${selectedMethod === 'wallet' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'}`}>
                  <Wallet className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-100">Parent Escrow Wallet</div>
                  <div className="text-[11px] text-slate-400">
                    Available Balance: <strong className="text-slate-200 font-mono"><NairaText amount={currentBalance} /></strong>
                  </div>
                </div>
              </div>
              {hasSufficientWalletBalance ? (
                <span className="text-[10px] text-emerald-400 font-semibold">Sufficient Funds</span>
              ) : (
                <span className="text-[10px] text-amber-400 font-semibold">Auto Top-Up Deficit</span>
              )}
            </button>

            {/* Option B: Direct Paystack Checkout */}
            <button
              type="button"
              onClick={() => setSelectedMethod('paystack')}
              className={`w-full p-3 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${
                selectedMethod === 'paystack'
                  ? 'bg-emerald-950/40 border-emerald-500/60 ring-1 ring-emerald-500/30'
                  : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${selectedMethod === 'paystack' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'}`}>
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-100">Instant Paystack Checkout</div>
                  <div className="text-[11px] text-slate-400">Debit Card · Bank Transfer · USSD</div>
                </div>
              </div>
              <span className="text-[10px] text-slate-400">Instant Activation</span>
            </button>
          </div>

          {/* Insufficient balance notice */}
          {selectedMethod === 'wallet' && !hasSufficientWalletBalance && (
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/50 text-[11px] text-amber-200">
              Your Parent Wallet balance is <strong className="font-mono"><NairaText amount={currentBalance} /></strong>. Unlocking will automatically top up the remaining <strong className="font-mono"><NairaText amount={deficit} /></strong> via Paystack.
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-800/80 shrink-0 flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmUnlock}
            disabled={isProcessing}
            className="flex-[2] py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-xs font-bold text-slate-950 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-60"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Processing Unlock...</span>
              </>
            ) : (
              <>
                <span>Unlock for ₦15,000</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
