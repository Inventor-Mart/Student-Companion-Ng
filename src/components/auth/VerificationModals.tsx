import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  ShieldCheck,
  Building,
  CreditCard,
  X,
  CheckCircle2,
  Lock,
  AlertCircle
} from 'lucide-react';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ParentAddressVerificationModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { verifiedAddress, saveVerifiedAddress } = useApp();

  const [street, setStreet] = useState(verifiedAddress?.street || '');
  const [lga, setLga] = useState(verifiedAddress?.lga || 'Ikeja');
  const [state, setState] = useState(verifiedAddress?.state || 'Lagos');
  const [landmark, setLandmark] = useState(verifiedAddress?.landmark || '');
  const [phone, setPhone] = useState(verifiedAddress?.phone || '+234 802 345 6789');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveVerifiedAddress({
      street,
      lga,
      state,
      landmark,
      phone
    });
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0D1829] border border-[#1E304F] rounded-3xl p-6 text-white shadow-2xl relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FF5B00]/20 border border-[#FF5B00]/40 flex items-center justify-center text-[#FF5B00]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Physical Lesson Address</h3>
              <p className="text-[11px] text-slate-400">Required for home tutor safety & guidance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#14233C] hover:bg-[#1D3254] flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="text-[11px] font-semibold text-slate-300 block mb-1">
              Street / House Address
            </label>
            <input
              type="text"
              required
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="e.g. 14 Admiralty Way, Lekki Phase 1"
              className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#FF5B00] rounded-xl py-2 px-3 text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                LGA / District
              </label>
              <input
                type="text"
                required
                value={lga}
                onChange={(e) => setLga(e.target.value)}
                placeholder="e.g. Eti-Osa"
                className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#FF5B00] rounded-xl py-2 px-3 text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                State
              </label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="e.g. Lagos"
                className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#FF5B00] rounded-xl py-2 px-3 text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-300 block mb-1">
              Closest Landmark (Crucial for Tutor)
            </label>
            <input
              type="text"
              required
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder="e.g. Opposite Domino's Pizza, Beside Total Station"
              className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#FF5B00] rounded-xl py-2 px-3 text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-300 block mb-1">
              Parent Contact Phone (Day of Session)
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+234 802 345 6789"
              className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#FF5B00] rounded-xl py-2 px-3 text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 rounded-full bg-[#14233C] hover:bg-[#1C3052] text-slate-300 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-2/3 py-2.5 rounded-full bg-[#FF5B00] hover:bg-[#e05000] active:scale-[0.98] text-white font-bold shadow-lg shadow-[#FF5B00]/30 transition-all cursor-pointer"
            >
              Confirm Address & Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface TutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const TutorSecurityVerificationModal: React.FC<TutorModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { tutorVerification, saveTutorVerification } = useApp();

  const [nin, setNin] = useState(tutorVerification?.nin || '');
  const [bankName, setBankName] = useState(tutorVerification?.bankName || 'GTBank');
  const [accountNumber, setAccountNumber] = useState(tutorVerification?.accountNumber || '');
  const [accountName, setAccountName] = useState(tutorVerification?.accountName || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveTutorVerification({
      nin,
      bankName,
      accountNumber,
      accountName: accountName || 'Adewale Adeyemi',
      isVerified: true
    });
    onSuccess();
  };

  const NIGERIAN_BANKS = [
    'Access Bank',
    'First Bank of Nigeria',
    'Guaranty Trust Bank (GTBank)',
    'United Bank for Africa (UBA)',
    'Zenith Bank',
    'Stanbic IBTC Bank',
    'Fidelity Bank',
    'Kuda Microfinance Bank',
    'OPay Digital Services',
    'Palmpay Limited'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0D1829] border border-[#1E304F] rounded-3xl p-6 text-white shadow-2xl relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#84E000]/20 border border-[#84E000]/40 flex items-center justify-center text-[#84E000]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Tutor Trust & Payout Setup</h3>
              <p className="text-[11px] text-slate-400">NIN Identity & Bank Settlement (NUBAN)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#14233C] hover:bg-[#1D3254] flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* NIN Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-slate-300">
                11-Digit National Identification Number (NIN)
              </label>
              <span className="text-[10px] text-emerald-400 font-mono">NIMC Secure</span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                maxLength={11}
                value={nin}
                onChange={(e) => setNin(e.target.value.replace(/\D/g, ''))}
                placeholder="e.g. 12345678901"
                className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#84E000] rounded-xl py-2 pl-9 pr-3 text-white font-mono tracking-wider placeholder-slate-500 focus:outline-none"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Required by Nigerian security guidelines for all home & verified online educators.
            </p>
          </div>

          {/* Bank Selection */}
          <div>
            <label className="text-[11px] font-semibold text-slate-300 block mb-1">
              Settlement Bank
            </label>
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#84E000] rounded-xl py-2 px-3 text-white focus:outline-none"
            >
              {NIGERIAN_BANKS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Account Number (NUBAN)
              </label>
              <input
                type="text"
                required
                maxLength={10}
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="10 Digits"
                className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#84E000] rounded-xl py-2 px-3 text-white font-mono placeholder-slate-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Account Name
              </label>
              <input
                type="text"
                required
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="As on Bank Record"
                className="w-full bg-[#081220] border border-[#1E304F] focus:border-[#84E000] rounded-xl py-2 px-3 text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/50 flex items-center gap-2 text-emerald-300 text-[11px]">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Instant weekly earnings payout to this verified Nigerian bank account.</span>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 rounded-full bg-[#14233C] hover:bg-[#1C3052] text-slate-300 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-2/3 py-2.5 rounded-full bg-[#84E000] hover:bg-[#75c900] active:scale-[0.98] text-[#0A1322] font-black tracking-wide shadow-lg shadow-[#84E000]/25 transition-all cursor-pointer"
            >
              Verify & Enable Payouts
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
