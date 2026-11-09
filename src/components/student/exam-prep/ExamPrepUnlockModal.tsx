import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { UNLOCK_FEE_NAIRA, INCLUDED_TUTOR_CREDITS_NAIRA } from '../../../data/examPrepCurriculumData';
import { NairaText } from '../../../utils/currency';
import { playSound } from '../../../utils/audioSynthesis';
import {
  X,
  Lock,
  Sparkles,
  CheckCircle2,
  Wallet,
  CreditCard,
  Building2,
  Copy,
  Check,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface ExamPrepUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  targetStudentName?: string;
}

export const ExamPrepUnlockModal: React.FC<ExamPrepUnlockModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  targetStudentName
}) => {
  const { parentWallet, unlockExamPrep, student } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'wallet' | 'paystack' | 'bank_transfer'>('wallet');
  const [hasCopiedAccount, setHasCopiedAccount] = useState(false);
  const [transferTimer, setTransferTimer] = useState(1795); // 29m 55s countdown

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTransferTimer(prev => (prev > 0 ? prev - 1 : 1800));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const currentBalance = parentWallet.balanceNaira;
  const hasSufficientWalletBalance = currentBalance >= UNLOCK_FEE_NAIRA;
  const deficit = Math.max(0, UNLOCK_FEE_NAIRA - currentBalance);

  const wardDisplayName = targetStudentName || student.name || 'Your Ward';

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyAccountNumber = () => {
    try {
      navigator.clipboard.writeText('0238472910');
      setHasCopiedAccount(true);
      playSound.correct();
      setTimeout(() => setHasCopiedAccount(false), 2000);
    } catch {
      setHasCopiedAccount(true);
      setTimeout(() => setHasCopiedAccount(false), 2000);
    }
  };

  const handleConfirmUnlock = async () => {
    setIsProcessing(true);
    try {
      // Simulate real Nigerian gateway roundtrip
      await new Promise(r => setTimeout(r, 1100));
      const ok = unlockExamPrep(selectedMethod);
      if (ok) {
        playSound.levelUp();
        setIsProcessing(false);
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden text-slate-100 flex flex-col max-h-[92vh]">
        {/* Decorative ambient gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-slate-950 font-black shadow-md shadow-emerald-500/20">
              <Lock className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-bold text-slate-100 leading-tight">Unlock 'Prepare For Exam'</h2>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/80">
                  Full Pass
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {wardDisplayName} · Class {student.classLevel} · NERDC Curriculum
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
          {/* Price & Value Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-emerald-500/40 flex items-center justify-between shadow-inner">
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400">One-Time Lifetime Access</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-slate-50 font-mono tracking-tight">
                  <NairaText amount={UNLOCK_FEE_NAIRA} />
                </span>
                <span className="text-xs text-slate-400">/ student</span>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>+ ₦4,000 Tutor Credits</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Included free for 1-on-1 sessions</p>
            </div>
          </div>

          {/* Included Features */}
          <div className="space-y-2 text-xs">
            <h3 className="text-slate-300 font-bold text-xs tracking-wide uppercase">Included in this unlock:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
              <div className="flex items-start gap-2 p-2 rounded-xl bg-slate-950/40 border border-slate-800/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-100 font-medium">Daily AI Timetable</strong> — syllabus pacing for {student.classLevel}
                </span>
              </div>
              <div className="flex items-start gap-2 p-2 rounded-xl bg-slate-950/40 border border-slate-800/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-100 font-medium">₦4,000 Tutor Voucher</strong> — applied to vetted 1-on-1 classes
                </span>
              </div>
              <div className="flex items-start gap-2 p-2 rounded-xl bg-slate-950/40 border border-slate-800/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-100 font-medium">CBT Drill Shortcuts</strong> — instant question launch on each day
                </span>
              </div>
              <div className="flex items-start gap-2 p-2 rounded-xl bg-slate-950/40 border border-slate-800/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-100 font-medium">Weakness Profiler</strong> — target Maths, English, Sciences
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2 pt-1 border-t border-slate-800">
            <h3 className="text-slate-300 font-bold text-xs tracking-wide uppercase">Select Payment Option:</h3>

            {/* Option 1: Parent Escrow Wallet */}
            <button
              type="button"
              onClick={() => setSelectedMethod('wallet')}
              className={`w-full p-3 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${
                selectedMethod === 'wallet'
                  ? 'bg-emerald-950/50 border-emerald-500/70 ring-1 ring-emerald-500/40'
                  : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${selectedMethod === 'wallet' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'}`}>
                  <Wallet className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-100">Parent Escrow Wallet</div>
                  <div className="text-[11px] text-slate-400">
                    Available Balance: <strong className="text-slate-200 font-mono"><NairaText amount={currentBalance} /></strong>
                  </div>
                </div>
              </div>
              {hasSufficientWalletBalance ? (
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800">
                  Instant Debit
                </span>
              ) : (
                <span className="text-[10px] text-amber-400 font-bold bg-amber-950/70 px-2 py-0.5 rounded border border-amber-800">
                  Auto Top-up Deficit
                </span>
              )}
            </button>

            {/* Option 2: Direct Paystack Checkout */}
            <button
              type="button"
              onClick={() => setSelectedMethod('paystack')}
              className={`w-full p-3 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${
                selectedMethod === 'paystack'
                  ? 'bg-emerald-950/50 border-emerald-500/70 ring-1 ring-emerald-500/40'
                  : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${selectedMethod === 'paystack' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'}`}>
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-100">Paystack Checkout</div>
                  <div className="text-[11px] text-slate-400">Debit Card · Bank App · USSD (*737#, *919#)</div>
                </div>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800">
                Instant Gateway
              </span>
            </button>

            {/* Option 3: Nigerian Direct Bank Transfer */}
            <button
              type="button"
              onClick={() => setSelectedMethod('bank_transfer')}
              className={`w-full p-3 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${
                selectedMethod === 'bank_transfer'
                  ? 'bg-emerald-950/50 border-emerald-500/70 ring-1 ring-emerald-500/40'
                  : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${selectedMethod === 'bank_transfer' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'}`}>
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-100">Direct Bank Transfer</div>
                  <div className="text-[11px] text-slate-400">Virtual Wema/Providus account · instant receipt</div>
                </div>
              </div>
              <span className="text-[10px] text-cyan-400 font-bold bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-800">
                Any Bank App
              </span>
            </button>
          </div>

          {/* Conditional Method Details */}
          {selectedMethod === 'bank_transfer' && (
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-cyan-800/50 space-y-2.5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Virtual Dedicated Account:</span>
                <span className="text-amber-400 font-mono text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Expires in {formatTimer(transferTimer)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Bank</span>
                  <span className="font-bold text-slate-100">Wema Bank / Providus</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Beneficiary</span>
                  <span className="font-bold text-slate-100 truncate block">Student Companion Escrow</span>
                </div>
                <div className="col-span-2 pt-1 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Account Number</span>
                    <span className="font-mono font-black text-emerald-400 text-base tracking-widest">
                      0238472910
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAccountNumber}
                    className="py-1 px-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {hasCopiedAccount ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{hasCopiedAccount ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-slate-400">
                Transfer exactly <strong className="text-slate-100 font-mono">₦15,000</strong> to the account above. Verification is automatic.
              </p>
            </div>
          )}

          {/* Insufficient balance notice for wallet */}
          {selectedMethod === 'wallet' && !hasSufficientWalletBalance && (
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/50 text-[11px] text-amber-200 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Wallet Balance Shortfall</span>
              </div>
              <p>
                Your balance is <strong className="font-mono text-slate-100"><NairaText amount={currentBalance} /></strong>. Unlocking will automatically top up the remaining <strong className="font-mono text-amber-300"><NairaText amount={deficit} /></strong> via Paystack.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-800 shrink-0 flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmUnlock}
            disabled={isProcessing}
            className="flex-[2] py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-xs font-black text-slate-950 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-60"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Confirming Payment...</span>
              </>
            ) : selectedMethod === 'bank_transfer' ? (
              <>
                <span>I Have Sent ₦15,000</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span>Pay ₦15,000 & Unlock</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
