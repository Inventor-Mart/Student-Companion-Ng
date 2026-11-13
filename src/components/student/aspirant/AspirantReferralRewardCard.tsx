import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { normalizeNigerianPhone } from '../../../utils/referralPromoPolicy';
import {
  Gift,
  Wallet,
  Wifi,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Clock
} from 'lucide-react';

interface AspirantReferralRewardCardProps {
  onSuccess?: () => void;
  compact?: boolean;
}

const NETWORK_OPTIONS: Array<'MTN' | 'Airtel' | 'Glo' | '9mobile'> = [
  'MTN',
  'Airtel',
  'Glo',
  '9mobile'
];

export const AspirantReferralRewardCard: React.FC<AspirantReferralRewardCardProps> = ({
  onSuccess,
  compact = false
}) => {
  const {
    aspirantRewardStatus,
    aspirantRewardRecord,
    claimAspirantReferralReward,
    appliedReferralCode,
    student
  } = useApp();

  const [selectedChoice, setSelectedChoice] = useState<'cash_500' | 'data_2gb'>('data_2gb');
  const [network, setNetwork] = useState<'MTN' | 'Airtel' | 'Glo' | '9mobile'>('MTN');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const activeRef = (student.referredByCode || appliedReferralCode || '').trim().toUpperCase();

  if (aspirantRewardStatus === 'claimed_cash_500' || aspirantRewardStatus === 'claimed_data_2gb') {
    const isCash = aspirantRewardStatus === 'claimed_cash_500';
    return (
      <div className="bg-slate-900/95 border border-emerald-700/60 rounded-2xl p-4 space-y-2 text-xs">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-bold text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {isCash
                ? '₦500 Referral Cashback Credited'
                : '2GB Mobile Data Reward Claimed'}
            </span>
          </div>
          <span className="font-mono text-[11px] font-semibold text-emerald-400">
            {aspirantRewardRecord?.status === 'fulfilled'
              ? 'FULFILLED'
              : isCash
              ? 'CREDITED'
              : 'QUEUED'}
          </span>
        </div>

        <p className="text-slate-300 leading-relaxed">
          {isCash ? (
            <>
              <strong className="text-white">₦500</strong> was credited instantly to your Escrow Wallet via referral code{' '}
              <span className="font-mono font-bold text-emerald-300">{activeRef || aspirantRewardRecord?.referralCodeUsed}</span>.
            </>
          ) : (
            <>
              <strong className="text-white">2GB {aspirantRewardRecord?.network || network} Data Bundle</strong> queued for{' '}
              <span className="font-mono font-bold text-white tabular-nums">
                {aspirantRewardRecord?.phoneNumber || phoneNumber}
              </span>
              {aspirantRewardRecord?.status === 'fulfilled'
                ? ' — Dispatched to your line.'
                : ' — Pending dispatch by operations.'}
            </>
          )}
        </p>

        {onSuccess && (
          <button
            type="button"
            onClick={onSuccess}
            className="mt-1 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer transition-colors"
          >
            Continue to Aspirant Hub
          </button>
        )}
      </div>
    );
  }

  if (aspirantRewardStatus !== 'eligible') {
    return null;
  }

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (selectedChoice === 'data_2gb') {
      const normalizedPhone = normalizeNigerianPhone(phoneNumber);
      if (!normalizedPhone) {
        setError('Enter a valid 11-digit Nigerian phone number (e.g. 08031234567).');
        return;
      }
    }

    setIsSubmitting(true);
    const res = await claimAspirantReferralReward({
      rewardType: selectedChoice,
      network: selectedChoice === 'data_2gb' ? network : undefined,
      phoneNumber: selectedChoice === 'data_2gb' ? phoneNumber.trim() : undefined
    });
    setIsSubmitting(false);

    if (!res.success) {
      setError(res.error || 'Could not process reward claim.');
      return;
    }

    setSuccessMsg(
      selectedChoice === 'cash_500'
        ? '₦500 credited to your Escrow Wallet immediately.'
        : `2GB ${network} data bundle request submitted for ${normalizeNigerianPhone(phoneNumber)}.`
    );
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form
      onSubmit={handleClaim}
      className={`bg-slate-900/95 border border-emerald-600/50 rounded-2xl ${compact ? 'p-3.5' : 'p-4 sm:p-5'} space-y-3.5 text-slate-100`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-700/70 flex items-center justify-center text-emerald-400 shrink-0">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-tight">
              Claim Your First-Registration Referral Bonus
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Referral code <span className="font-mono font-bold text-emerald-300">{activeRef}</span> active · Choose 1 reward below
            </p>
          </div>
        </div>
      </div>

      {/* Choice Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => {
            setSelectedChoice('data_2gb');
            setError(null);
          }}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            selectedChoice === 'data_2gb'
              ? 'bg-emerald-950/60 border-emerald-500 ring-1 ring-emerald-500/40'
              : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-xs text-white">
            <Wifi className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>2GB Mobile Data Bundle</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            MTN, Airtel, Glo, or 9mobile delivered to your Nigerian line.
          </p>
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedChoice('cash_500');
            setError(null);
          }}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            selectedChoice === 'cash_500'
              ? 'bg-amber-950/50 border-amber-500 ring-1 ring-amber-500/40'
              : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-xs text-white">
            <Wallet className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Instant ₦500 Wallet Cash</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Credited immediately to your Escrow Wallet balance.
          </p>
        </button>
      </div>

      {selectedChoice === 'data_2gb' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <div>
            <label className="text-[11px] font-semibold text-slate-300 block mb-1">
              Mobile Network
            </label>
            <select
              value={network}
              onChange={(e) => setNetwork(e.target.value as 'MTN' | 'Airtel' | 'Glo' | '9mobile')}
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              {NETWORK_OPTIONS.map((net) => (
                <option key={net} value={net}>
                  {net}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-300 block mb-1">
              Nigerian Phone Number (11 digits)
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="08031234567"
              maxLength={14}
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs font-mono tabular-nums text-white placeholder-slate-500 focus:outline-none"
            />
          </div>
        </div>
      )}

      {error && (
        <div className="p-2.5 rounded-xl bg-rose-950/70 border border-rose-800 text-xs text-rose-200 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-700 text-xs text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 pt-1">
        <span className="text-[11px] text-slate-400 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>One-time first registration reward</span>
        </span>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
        >
          <span>
            {isSubmitting
              ? 'Claiming...'
              : selectedChoice === 'cash_500'
              ? 'Credit ₦500 Now'
              : 'Request 2GB Data'}
          </span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </form>
  );
};
