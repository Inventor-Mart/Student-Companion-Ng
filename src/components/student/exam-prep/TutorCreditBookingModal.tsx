import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { VETTED_NIGERIAN_TUTORS } from '../../../data/tutorsData';
import { Tutor, BookingType } from '../../../types';
import { NairaText } from '../../../utils/currency';
import { PersonaAvatar } from '../../common/PersonaAvatar';
import {
  X,
  Sparkles,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  Video,
  MapPin,
  Star,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface TutorCreditBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  suggestedSubject: string;
  suggestedTopic: string;
  onBookingSuccess?: () => void;
}

export const TutorCreditBookingModal: React.FC<TutorCreditBookingModalProps> = ({
  isOpen,
  onClose,
  suggestedSubject,
  suggestedTopic,
  onBookingSuccess
}) => {
  const {
    student,
    examPrepState,
    useTutorCredit,
    createTutorBooking,
    launchVirtualClassroom
  } = useApp();

  // Find relevant tutors matching subject
  const matchingTutors = VETTED_NIGERIAN_TUTORS.filter(t =>
    t.subjects.some(s => s.toLowerCase().includes(suggestedSubject.toLowerCase()) || suggestedSubject.toLowerCase().includes(s.toLowerCase()))
  );
  const displayTutors = matchingTutors.length > 0 ? matchingTutors : VETTED_NIGERIAN_TUTORS;

  const [selectedTutor, setSelectedTutor] = useState<Tutor>(displayTutors[0] || VETTED_NIGERIAN_TUTORS[0]);
  const [sessionTopic, setSessionTopic] = useState<string>(suggestedTopic);
  const [bookingType, setBookingType] = useState<BookingType>('online');
  const [sessionDate, setSessionDate] = useState<string>('Tomorrow, 04:00 PM');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const availableCredit = examPrepState.tutorCreditsNaira || 0;
  const tutorRate = selectedTutor.hourlyRateNaira;
  const creditToApply = Math.min(tutorRate, availableCredit);
  const netPayable = Math.max(0, tutorRate - creditToApply);

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 600));

      // 1. Deduct credit
      if (creditToApply > 0) {
        useTutorCredit(creditToApply);
      }

      // 2. Create booking
      const newBooking = createTutorBooking({
        tutorId: selectedTutor.id,
        tutorName: selectedTutor.name,
        tutorPhoto: selectedTutor.avatarUrl,
        studentId: student.id,
        studentName: student.name || 'Registered Student',
        subject: suggestedSubject,
        topic: sessionTopic,
        bookingType,
        date: sessionDate.split(',')[0].trim(),
        timeSlot: sessionDate.split(',')[1]?.trim() || '04:00 PM - 05:00 PM',
        amountNaira: tutorRate
      });

      setIsSubmitting(false);
      setConfirmedBookingId(newBooking.id);
      if (onBookingSuccess) onBookingSuccess();
    } catch (err) {
      console.error(err);
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
              <p className="text-[10px] text-slate-400">Apply your ₦4,000 Tutor Credits</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {confirmedBookingId ? (
          /* Confirmation Success State */
          <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Session Booked Successfully!</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Your session on <strong className="text-slate-200">{sessionTopic}</strong> with {selectedTutor.name} is reserved.
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
                <span>Remaining Tutor Credits:</span>
                <span className="text-slate-200 font-mono"><NairaText amount={Math.max(0, availableCredit - creditToApply)} /></span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
              >
                Back to Calendar
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  launchVirtualClassroom(confirmedBookingId, 'student');
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-slate-950 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Open Classroom</span>
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div className="overflow-y-auto flex-1 py-3 pr-1 space-y-3.5">
            {/* Credit Balance Announcement */}
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

            {/* Target Topic (Pre-filled from study block) */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Target Subject & Topic
              </label>
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs flex items-center justify-between">
                <div>
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
            </div>

            {/* Tutor Selection */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Select Vetted Specialist:
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {displayTutors.slice(0, 3).map(t => {
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

            {/* Session Mode & Schedule */}
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
                  value={sessionDate}
                  onChange={e => setSessionDate(e.target.value)}
                  className="w-full py-1.5 px-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value="Tomorrow, 04:00 PM">Tomorrow, 04:00 PM</option>
                  <option value="Tomorrow, 06:00 PM">Tomorrow, 06:00 PM</option>
                  <option value="Saturday, 10:00 AM">Saturday, 10:00 AM</option>
                  <option value="Saturday, 02:00 PM">Saturday, 02:00 PM</option>
                </select>
              </div>
            </div>

            {/* Fee Breakdown with Credit Subsidy */}
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

            {/* Action */}
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
                    <span>Reserving Session...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Booking</span>
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
