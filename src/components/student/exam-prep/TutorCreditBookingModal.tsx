import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { Tutor, BookingType } from '../../../types';
import { NairaText } from '../../../utils/currency';
import { PersonaAvatar } from '../../common/PersonaAvatar';
import {
  X,
  Sparkles,
  Users,
  CheckCircle2,
  Video,
  MapPin,
  Star,
  ShieldCheck,
  ArrowRight,
  CreditCard,
  Wallet
} from 'lucide-react';

interface TutorCreditBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  suggestedSubject: string;
  suggestedTopic: string;
  onBookingSuccess?: () => void;
}

const CREDIT_SLOT_OPTIONS = [
  { id: 'live-5m', label: 'Starting in 5 mins (Live)', offsetMs: 5 * 60 * 1000 },
  { id: 'tomorrow-4pm', label: 'Tomorrow, 04:00 PM', dayOffset: 1, hour: 16 },
  { id: 'tomorrow-6pm', label: 'Tomorrow, 06:00 PM', dayOffset: 1, hour: 18 },
  { id: 'weekend-10am', label: 'In 2 Days, 10:00 AM', dayOffset: 2, hour: 10 }
];

export const TutorCreditBookingModal: React.FC<TutorCreditBookingModalProps> = ({
  isOpen,
  onClose,
  suggestedSubject,
  suggestedTopic,
  onBookingSuccess
}) => {
  const {
    registeredTutors,
    student,
    examPrepState,
    useTutorCredit,
    createTutorBooking,
    parentWallet,
    currentUserProfile
  } = useApp();

  const matchingTutors = registeredTutors.filter(t =>
    t.subjects.some(s => s.toLowerCase().includes(suggestedSubject.toLowerCase()) || suggestedSubject.toLowerCase().includes(s.toLowerCase()))
  );
  const displayTutors = matchingTutors.length > 0 ? matchingTutors : registeredTutors;

  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(displayTutors[0] || null);
  const [sessionTopic, setSessionTopic] = useState<string>(suggestedTopic);
  const [bookingType, setBookingType] = useState<BookingType>('online');
  const [selectedSlotId, setSelectedSlotId] = useState<string>(CREDIT_SLOT_OPTIONS[0].id);
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'wallet'>('paystack');
  const [parentPinInput, setParentPinInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedTutor && displayTutors.length > 0) {
      setSelectedTutor(displayTutors[0]);
    }
  }, [displayTutors, selectedTutor]);

  if (!isOpen) return null;

  const availableCredit = examPrepState.tutorCreditsNaira || 0;
  const tutorRate = selectedTutor?.hourlyRateNaira || 0;
  const creditToApply = selectedTutor ? Math.min(tutorRate, availableCredit) : 0;
  const netPayable = Math.max(0, tutorRate - creditToApply);

  const computeSlotWindow = () => {
    const slot = CREDIT_SLOT_OPTIONS.find(s => s.id === selectedSlotId) || CREDIT_SLOT_OPTIONS[0];
    if ('offsetMs' in slot && typeof slot.offsetMs === 'number') {
      const start = new Date(Date.now() + slot.offsetMs);
      const end = new Date(start.getTime() + 60 * 60 * 1000);
      return {
        date: 'Today',
        timeSlot: 'Starts in 5 mins',
        startIso: start.toISOString(),
        endIso: end.toISOString()
      };
    }
    const d = new Date();
    d.setDate(d.getDate() + (slot.dayOffset || 1));
    d.setHours(slot.hour || 16, 0, 0, 0);
    const end = new Date(d.getTime() + 60 * 60 * 1000);
    return {
      date: slot.label.split(',')[0],
      timeSlot: slot.label.split(',')[1]?.trim() || '04:00 PM',
      startIso: d.toISOString(),
      endIso: end.toISOString()
    };
  };

  const finalizeBookingRecord = (
    gateway: 'paystack_live' | 'parent_escrow_wallet' | 'tutor_credit',
    paymentRef?: string
  ) => {
    if (!selectedTutor) return;
    const window = computeSlotWindow();
    const newBooking = createTutorBooking({
      tutorId: selectedTutor.id,
      tutorName: selectedTutor.name,
      tutorPhoto: selectedTutor.avatarUrl,
      studentId: student.id || currentUserProfile?.id || 'student',
      studentName: student.name || currentUserProfile?.fullName || 'Registered Student',
      subject: suggestedSubject,
      topic: sessionTopic,
      bookingType,
      date: window.date,
      timeSlot: window.timeSlot,
      scheduledStartIso: window.startIso,
      scheduledEndIso: window.endIso,
      amountNaira: netPayable,
      paymentGateway: gateway,
      paymentReference: paymentRef,
      parentPin: parentPinInput.trim() || undefined
    });

    if (!newBooking) {
      setErrorMsg('Authorization failed. Check Parent PIN or wallet balance.');
      setIsSubmitting(false);
      return;
    }

    if (creditToApply > 0) {
      useTutorCredit(creditToApply);
    }

    setIsSubmitting(false);
    setConfirmedBookingId(newBooking.id);
    if (onBookingSuccess) onBookingSuccess();
  };

  const handleConfirmBooking = async () => {
    if (!selectedTutor) return;
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      if (netPayable === 0) {
        finalizeBookingRecord('tutor_credit', `CREDIT_${Date.now()}`);
        return;
      }

      if (paymentMethod === 'wallet') {
        const expectedPin = parentWallet.pin || currentUserProfile?.parentData?.pin || '';
        if (expectedPin && parentPinInput.trim() !== expectedPin) {
          setErrorMsg('Enter a valid 4-digit Parent PIN to debit the Parent Escrow Wallet.');
          setIsSubmitting(false);
          return;
        }
        if (parentWallet.balanceNaira < netPayable) {
          setErrorMsg(
            `Insufficient Escrow Wallet balance (₦${parentWallet.balanceNaira.toLocaleString()} available, ₦${netPayable.toLocaleString()} required). Switch to Paystack Live.`
          );
          setIsSubmitting(false);
          return;
        }
        finalizeBookingRecord('parent_escrow_wallet');
        return;
      }

      // Live Paystack Checkout for remaining netPayable
      if (typeof (window as any).PaystackPop === 'undefined') {
        setErrorMsg('Paystack Live SDK is loading. Verify network connection and try again.');
        setIsSubmitting(false);
        return;
      }

      let activeKey = '';
      let liveConfigured = false;
      const cfgRes = await fetch('/api/paystack/config');
      if (cfgRes.ok) {
        const cfg = await cfgRes.json();
        activeKey = typeof cfg.publicKey === 'string' ? cfg.publicKey.trim() : '';
        liveConfigured = Boolean(cfg.liveConfigured && cfg.isLive);
      }

      if (!activeKey || !activeKey.startsWith('pk_live_') || !liveConfigured) {
        setErrorMsg('Live Paystack keys (pk_live_ & sk_live_) are required before booking.');
        setIsSubmitting(false);
        return;
      }

      const payerEmail = currentUserProfile?.email || '';
      if (!payerEmail || !payerEmail.includes('@')) {
        setErrorMsg('A valid signed-in user email is required for Live Paystack checkout.');
        setIsSubmitting(false);
        return;
      }

      const txRef = `PSTK_TCR_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
      const handler = (window as any).PaystackPop.setup({
        key: activeKey,
        email: payerEmail,
        amount: Math.round(netPayable * 100),
        currency: 'NGN',
        ref: txRef,
        callback: function (response: { reference: string }) {
          (async () => {
            try {
              const verifyRes = await fetch('/api/paystack/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  reference: response.reference,
                  amountNaira: netPayable,
                  email: payerEmail,
                  studentId: student.id || currentUserProfile?.id,
                  studentName: student.name || currentUserProfile?.fullName,
                  tutorId: selectedTutor.id,
                  tutorName: selectedTutor.name,
                  purpose: 'tutor_booking_payment'
                })
              });
              const verifyData = await verifyRes.json();
              if (!verifyRes.ok || !verifyData.success) {
                setErrorMsg(verifyData.error || 'Paystack Live verification failed.');
                setIsSubmitting(false);
                return;
              }
              finalizeBookingRecord('paystack_live', response.reference);
            } catch (err: any) {
              setErrorMsg(err?.message || 'Error verifying Paystack payment.');
              setIsSubmitting(false);
            }
          })();
        },
        onClose: function () {
          setIsSubmitting(false);
        }
      });
      handler.openIframe();
    } catch (err: any) {
      setErrorMsg(err?.message || 'Unable to process tutor booking.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl relative overflow-hidden text-slate-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">1-on-1 Topic Tutor Booking</h2>
              <p className="text-[10px] text-slate-400">Apply your Tutor Credits toward a registered tutor</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {confirmedBookingId && selectedTutor ? (
          <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Session Request Submitted!</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Your session on <strong className="text-slate-200">{sessionTopic}</strong> with {selectedTutor.name} awaits Parent PIN &amp; Tutor approval. Classroom opens 10 mins before start.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-xs text-left max-w-xs mx-auto space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Tutor:</span>
                <span className="text-slate-200 font-medium">{selectedTutor.name}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Credits Applied:</span>
                <span className="text-emerald-400 font-semibold font-mono">-<NairaText amount={creditToApply} /></span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Approval Status:</span>
                <span className="text-amber-300 font-semibold">Pending Parent &amp; Tutor</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-slate-950 transition-colors cursor-pointer"
              >
                Done &amp; Return to Calendar
              </button>
            </div>
          </div>
        ) : displayTutors.length === 0 ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white">No Registered Tutors Available</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              All sample tutors have been removed. Registered educators who sign up on the platform will appear here automatically.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : selectedTutor && (
          <div className="overflow-y-auto flex-1 py-3 pr-1 space-y-3.5">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-emerald-400 font-semibold tracking-wide uppercase">Your Tutor Credits</span>
                <div className="text-lg font-black text-slate-50 font-mono">
                  <NairaText amount={availableCredit} />
                </div>
              </div>
              <div className="text-right text-[11px] text-emerald-300">
                {availableCredit > 0 ? '✓ Auto-subsidized at checkout' : '0 credit remaining'}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Target Subject & Topic
              </label>
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
                <span className="text-emerald-400 font-bold block">{suggestedSubject}</span>
                <input
                  type="text"
                  value={sessionTopic}
                  onChange={e => setSessionTopic(e.target.value)}
                  className="bg-transparent text-slate-200 text-xs w-full focus:outline-none mt-0.5"
                  placeholder="Enter specific topic"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Select Registered Specialist:
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {displayTutors.slice(0, 5).map(t => {
                  const isSelected = selectedTutor.id === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTutor(t)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-950/40 border-emerald-500/60 ring-1 ring-emerald-500/30'
                          : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <PersonaAvatar
                          name={t.name}
                          src={t.avatarUrl}
                          alt={t.name}
                          className="w-9 h-9 rounded-xl"
                          textClassName="text-xs"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                            <span>{t.name}</span>
                            {t.isNinVerified && <ShieldCheck className="w-3 h-3 text-emerald-400" />}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate max-w-[210px]">{t.tagline}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-mono font-bold text-slate-200">
                          <NairaText amount={t.hourlyRateNaira} />
                        </div>
                        <div className="flex items-center gap-0.5 text-[10px] text-amber-400 justify-end">
                          <Star className="w-2.5 h-2.5 fill-amber-400" />
                          <span>{t.rating}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Mode</label>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setBookingType('online')}
                    className={`flex-1 py-1.5 px-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                      bookingType === 'online'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    <Video className="w-3 h-3" />
                    <span>Virtual</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingType('physical')}
                    className={`flex-1 py-1.5 px-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                      bookingType === 'physical'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    <MapPin className="w-3 h-3" />
                    <span>In-Person</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Time Slot</label>
                <select
                  value={selectedSlotId}
                  onChange={e => setSelectedSlotId(e.target.value)}
                  className="w-full py-1.5 px-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200 focus:outline-none cursor-pointer"
                >
                  {CREDIT_SLOT_OPTIONS.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {netPayable > 0 && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paystack')}
                  className={`p-2 rounded-xl border text-left text-xs cursor-pointer ${
                    paymentMethod === 'paystack'
                      ? 'bg-emerald-950/50 border-emerald-500 text-white'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-1 font-bold">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Paystack Live</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-2 rounded-xl border text-left text-xs cursor-pointer ${
                    paymentMethod === 'wallet'
                      ? 'bg-emerald-950/50 border-emerald-500 text-white'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-1 font-bold">
                    <Wallet className="w-3.5 h-3.5 text-amber-400" />
                    <span>Wallet (<NairaText amount={parentWallet.balanceNaira} />)</span>
                  </div>
                </button>
              </div>
            )}

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Parent 4-Digit Approval PIN {paymentMethod === 'wallet' && netPayable > 0 ? '(Required for Wallet)' : '(Optional now)'}
              </label>
              <input
                type="password"
                maxLength={4}
                value={parentPinInput}
                onChange={e => setParentPinInput(e.target.value)}
                placeholder="••••"
                className="w-full py-1.5 px-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white font-mono tracking-widest focus:outline-none"
              />
            </div>

            {errorMsg && (
              <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-700 text-rose-200 text-xs">
                {errorMsg}
              </div>
            )}

            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Tutor Hourly Rate:</span>
                <span className="text-slate-200 font-mono"><NairaText amount={tutorRate} /></span>
              </div>
              <div className="flex justify-between text-emerald-400 font-medium">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Exam Prep Tutor Credit:</span>
                </span>
                <span className="font-mono">-<NairaText amount={creditToApply} /></span>
              </div>
              <div className="pt-1.5 border-t border-slate-700 flex justify-between font-bold text-slate-100">
                <span>Net You Pay Now:</span>
                <span className="text-emerald-400 font-mono text-sm">
                  {netPayable === 0 ? '₦0 (Fully Covered!)' : <NairaText amount={netPayable} />}
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmBooking}
                disabled={isSubmitting}
                className="flex-[2] py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-xs font-bold text-slate-950 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Booking</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

