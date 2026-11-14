import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Tutor, BookingType } from '../../types';
import {
  Search,
  ShieldCheck,
  Star,
  MapPin,
  MessageSquare,
  X,
  CheckCircle2,
  AlertTriangle,
  Map as MapIcon,
  List,
  Video,
  Radio,
  CreditCard,
  Wallet,
  Lock,
  Users
} from 'lucide-react';

import { ParentAddressVerificationModal } from '../auth/VerificationModals';
import { TutorMapLocator } from '../tutors/TutorMapLocator';
import { PersonaAvatar } from '../common/PersonaAvatar';
import { TutorProfileView } from './TutorProfileView';
import { NairaText } from '../../utils/currency';
import { playSound } from '../../utils/audioSynthesis';
import { motion } from 'motion/react';

interface ScheduledSlotOption {
  id: string;
  label: string;
  dateLabel: string;
  timeSlot: string;
  computeWindow: () => { startIso: string; endIso: string };
}

const BOOKING_SLOT_OPTIONS: ScheduledSlotOption[] = [
  {
    id: 'live-5m',
    label: 'Starting in 5 minutes (Live Window Open)',
    dateLabel: 'Today',
    timeSlot: 'Starts in 5 mins (2 Hours)',
    computeWindow: () => {
      const start = new Date(Date.now() + 5 * 60 * 1000);
      const end = new Date(start.getTime() + 120 * 60 * 1000);
      return { startIso: start.toISOString(), endIso: end.toISOString() };
    }
  },
  {
    id: 'today-1h',
    label: 'Today (+1 Hour, 2 Hours Intensive)',
    dateLabel: 'Today',
    timeSlot: 'In 1 Hour (2 Hours Intensive)',
    computeWindow: () => {
      const start = new Date(Date.now() + 60 * 60 * 1000);
      const end = new Date(start.getTime() + 120 * 60 * 1000);
      return { startIso: start.toISOString(), endIso: end.toISOString() };
    }
  },
  {
    id: 'tomorrow-10am',
    label: 'Tomorrow (10:00 AM - 12:00 PM)',
    dateLabel: 'Tomorrow',
    timeSlot: '10:00 AM - 12:00 PM',
    computeWindow: () => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      d.setHours(10, 0, 0, 0);
      const end = new Date(d.getTime() + 120 * 60 * 1000);
      return { startIso: d.toISOString(), endIso: end.toISOString() };
    }
  },
  {
    id: 'tomorrow-4pm',
    label: 'Tomorrow (04:00 PM - 06:00 PM)',
    dateLabel: 'Tomorrow',
    timeSlot: '04:00 PM - 06:00 PM',
    computeWindow: () => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      d.setHours(16, 0, 0, 0);
      const end = new Date(d.getTime() + 120 * 60 * 1000);
      return { startIso: d.toISOString(), endIso: end.toISOString() };
    }
  }
];

export const TutorDiscovery: React.FC = () => {
  const {
    registeredTutors,
    createTutorBooking,
    setActiveTutorChatId,
    setCurrentRole,
    student,
    verifiedAddress,
    launchVirtualClassroom,
    getStudentClassroomEligibility,
    getBookingJoinStatus,
    parentWallet,
    currentUserProfile
  } = useApp();

  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedTutorForBooking, setSelectedTutorForBooking] = useState<Tutor | null>(null);
  const [selectedTutorForProfile, setSelectedTutorForProfile] = useState<Tutor | null>(null);

  // Booking Form State
  const [bookingType, setBookingType] = useState<BookingType>('online');
  const [selectedSlotId, setSelectedSlotId] = useState<string>(BOOKING_SLOT_OPTIONS[0].id);
  const [topicFocus, setTopicFocus] = useState<string>('WAEC & JAMB Problem Solving Drill');
  const [bookingPaymentMethod, setBookingPaymentMethod] = useState<'paystack' | 'wallet'>('paystack');
  const [parentPinInput, setParentPinInput] = useState<string>('');
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [isProcessingBooking, setIsProcessingBooking] = useState<boolean>(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>('');
  const [boardClockMs, setBoardClockMs] = useState<number>(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setBoardClockMs(Date.now()), 15000);
    return () => clearInterval(timer);
  }, []);

  const classroomEligibility = getStudentClassroomEligibility(boardClockMs);

  const subjects = ['All', 'Mathematics', 'Physics', 'Biology', 'Chemistry', 'Economics', 'English Language', 'Further Mathematics'];

  // Strictly real registered tutors from AppContext (zero hardcoded/sample tutors)
  const allTutors: Tutor[] = React.useMemo(() => {
    const list = [...registeredTutors];
    if (
      currentUserProfile?.role === 'tutor' &&
      currentUserProfile.tutorData &&
      !list.some(t => t.id === currentUserProfile.id)
    ) {
      const td = currentUserProfile.tutorData;
      list.unshift({
        id: currentUserProfile.id,
        name: currentUserProfile.fullName,
        tagline: td.tagline || `${td.subjectSpecialization} Specialist`,
        subjects: td.proficientSubjects && td.proficientSubjects.length > 0 ? td.proficientSubjects : [td.subjectSpecialization],
        rating: 5.0,
        reviewCount: 0,
        hourlyRateNaira: td.hourlyRate || 3500,
        location: `${td.city || 'Lagos'}, ${td.state || 'Nigeria'}`,
        state: td.state || 'Lagos',
        isNinVerified: Boolean(td.nin || td.verification?.isVerified),
        education: td.qualification || `${td.highestEducation || 'B.Sc.'} (${td.institution || 'Registered Educator'})`,
        avatarUrl: currentUserProfile.avatarUrl || '',
        bio: td.bio || 'Registered educator available for 1-on-1 tutoring.',
        availableDays: ['Mondays', 'Wednesdays', 'Saturdays'],
        lat: 6.6018,
        lng: 3.3515,
        experienceYears: td.experienceYearsRange === '5+ years' ? 6 : td.experienceYearsRange === '3-5 years' ? 4 : 2,
        degrees: td.degrees || [`${td.highestEducation || 'B.Sc.'} in ${td.courseOfStudy || 'Education'}`],
        certifications: td.certifications || ['Registered Educator'],
        examSpecializations: td.examSpecializations || ['WAEC Prep', 'JAMB Prep'],
        curriculumHighlights: td.curriculumHighlights || ['Interactive Whiteboard Drills'],
        totalLessonsDelivered: 0,
        completionRate: 100,
        timetable: td.timetable || []
      });
    }
    return list;
  }, [registeredTutors, currentUserProfile]);

  const filteredTutors = allTutors.filter(tutor => {
    const matchesSearch =
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSubject = selectedSubject === 'All' || tutor.subjects.includes(selectedSubject);

    return matchesSearch && matchesSubject;
  });

  const handleConfirmBooking = async () => {
    playSound.tileTap();
    setBookingError(null);
    if (!selectedTutorForBooking) return;

    if (bookingType === 'physical' && !verifiedAddress) {
      setIsAddressModalOpen(true);
      return;
    }

    const slotMeta = BOOKING_SLOT_OPTIONS.find(s => s.id === selectedSlotId) || BOOKING_SLOT_OPTIONS[0];
    const windowIso = slotMeta.computeWindow();
    const totalAmount = selectedTutorForBooking.hourlyRateNaira * 2;
    const expectedParentPin = parentWallet.pin || currentUserProfile?.parentData?.pin || '';

    if (bookingPaymentMethod === 'wallet') {
      if (expectedParentPin && parentPinInput.trim() !== expectedParentPin) {
        playSound.buzz();
        setBookingError('Enter the valid 4-digit Parent PIN to authorize Parent Escrow Wallet payment.');
        return;
      }
      if (parentWallet.balanceNaira < totalAmount) {
        playSound.buzz();
        setBookingError(
          `Insufficient Parent Escrow Wallet balance (₦${parentWallet.balanceNaira.toLocaleString()} available, ₦${totalAmount.toLocaleString()} required). Switch to Paystack Live.`
        );
        return;
      }

      const newBooking = createTutorBooking({
        tutorId: selectedTutorForBooking.id,
        tutorName: selectedTutorForBooking.name,
        tutorPhoto: selectedTutorForBooking.avatarUrl,
        studentId: student.id || currentUserProfile?.id || 'student',
        studentName: student.name || currentUserProfile?.fullName || 'Student',
        subject: selectedTutorForBooking.subjects[0] || 'Mathematics',
        topic: topicFocus,
        bookingType,
        date: slotMeta.dateLabel,
        timeSlot: slotMeta.timeSlot,
        scheduledStartIso: windowIso.startIso,
        scheduledEndIso: windowIso.endIso,
        amountNaira: totalAmount,
        paymentGateway: 'parent_escrow_wallet',
        parentPin: parentPinInput.trim() || undefined
      });

      if (!newBooking) {
        playSound.buzz();
        setBookingError('Booking authorization failed. Verify wallet balance and Parent PIN.');
        return;
      }
      setConfirmedBookingId(newBooking.id);
      setBookingConfirmed(true);
      return;
    }

    // Strict Live Paystack Checkout
    setIsProcessingBooking(true);
    if (typeof (window as any).PaystackPop === 'undefined') {
      playSound.buzz();
      setBookingError('Paystack Live SDK is still loading. Check your internet connection and retry.');
      setIsProcessingBooking(false);
      return;
    }

    let activeKey = '';
    let liveConfigured = false;
    try {
      const cfgRes = await fetch('/api/paystack/config');
      if (cfgRes.ok) {
        const cfg = await cfgRes.json();
        activeKey = typeof cfg.publicKey === 'string' ? cfg.publicKey.trim() : '';
        liveConfigured = Boolean(cfg.liveConfigured && cfg.isLive);
      }
    } catch {
      // handled below
    }

    if (!activeKey || !activeKey.startsWith('pk_live_') || !liveConfigured) {
      playSound.buzz();
      setBookingError(
        'Live Paystack checkout is required (pk_live_ & sk_live_ keys not configured on server). No test payments allowed.'
      );
      setIsProcessingBooking(false);
      return;
    }

    const payerEmail = currentUserProfile?.email || '';
    if (!payerEmail || !payerEmail.includes('@')) {
      playSound.buzz();
      setBookingError('A valid signed-in user email is required for Live Paystack verification.');
      setIsProcessingBooking(false);
      return;
    }

    const txRef = `PSTK_TUTOR_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    try {
      const handler = (window as any).PaystackPop.setup({
        key: activeKey,
        email: payerEmail,
        amount: Math.round(totalAmount * 100),
        currency: 'NGN',
        ref: txRef,
        channels: ['card', 'bank', 'ussd', 'bank_transfer'],
        metadata: {
          custom_fields: [
            { display_name: 'Student Name', variable_name: 'student_name', value: student.name || currentUserProfile?.fullName || 'Student' },
            { display_name: 'Tutor Name', variable_name: 'tutor_name', value: selectedTutorForBooking.name },
            { display_name: 'Purpose', variable_name: 'purpose', value: 'tutor_booking_payment' }
          ]
        },
        callback: function (response: { reference: string }) {
          (async () => {
            try {
              const verifyRes = await fetch('/api/paystack/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  reference: response.reference,
                  amountNaira: totalAmount,
                  email: payerEmail,
                  studentId: student.id || currentUserProfile?.id,
                  studentName: student.name || currentUserProfile?.fullName,
                  tutorId: selectedTutorForBooking.id,
                  tutorName: selectedTutorForBooking.name,
                  purpose: 'tutor_booking_payment'
                })
              });
              const verifyData = await verifyRes.json();
              if (!verifyRes.ok || !verifyData.success) {
                playSound.buzz();
                setBookingError(verifyData.error || 'Live Paystack verification failed on server.');
                setIsProcessingBooking(false);
                return;
              }

              const newBooking = createTutorBooking({
                tutorId: selectedTutorForBooking.id,
                tutorName: selectedTutorForBooking.name,
                tutorPhoto: selectedTutorForBooking.avatarUrl,
                studentId: student.id || currentUserProfile?.id || 'student',
                studentName: student.name || currentUserProfile?.fullName || 'Student',
                subject: selectedTutorForBooking.subjects[0] || 'Mathematics',
                topic: topicFocus,
                bookingType,
                date: slotMeta.dateLabel,
                timeSlot: slotMeta.timeSlot,
                scheduledStartIso: windowIso.startIso,
                scheduledEndIso: windowIso.endIso,
                amountNaira: totalAmount,
                paymentGateway: 'paystack_live',
                paymentReference: response.reference,
                parentPin: parentPinInput.trim() || undefined
              });

              if (!newBooking) {
                playSound.buzz();
                setBookingError('Could not register verified booking.');
              } else {
                playSound.levelUp();
                setConfirmedBookingId(newBooking.id);
                setBookingConfirmed(true);
              }
            } catch (err: any) {
              playSound.buzz();
              setBookingError(err?.message || 'Network error verifying Paystack transaction.');
            } finally {
              setIsProcessingBooking(false);
            }
          })();
        },
        onClose: function () {
          setIsProcessingBooking(false);
        }
      });
      handler.openIframe();
    } catch (err: any) {
      playSound.buzz();
      setBookingError(err?.message || 'Unable to launch Paystack Live checkout.');
      setIsProcessingBooking(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.03
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col min-h-0 relative overflow-hidden bg-[#101C34]">
      {selectedTutorForProfile ? (
        <TutorProfileView
          tutor={selectedTutorForProfile}
          onBack={() => {
            playSound.tileTap();
            setSelectedTutorForProfile(null);
          }}
          onBookSession={(tutor, selectedSlot) => {
            playSound.tileTap();
            setSelectedTutorForBooking(tutor);
            setBookingType('online');
            setSelectedSlotId(BOOKING_SLOT_OPTIONS[0].id);
            setBookingError(null);
            if (selectedSlot) {
              setTopicFocus(`${tutor.subjects[0]} 1-on-1 Virtual Whiteboard Intensive (${selectedSlot.day} ${selectedSlot.time})`);
            }
            setBookingConfirmed(false);
          }}
        />
      ) : (
        <div className="flex-1 min-h-0 h-full w-full overflow-y-auto px-4 pt-4 pb-24 space-y-4 touch-pan-y text-slate-100 bg-[#101C34]">
          {/* =========================================================================
              TUTOR MARKETPLACE HEADER & VIEW SWITCHER
             ========================================================================= */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-white tracking-tight">
                  Vetted Tutoring Marketplace
                </h2>
                <span className="text-[10px] font-bold text-[#84CC16] bg-[#84CC16]/10 px-2 py-0.5 rounded-full border border-[#84CC16]/40 uppercase tracking-wide">
                  NIN Verified
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Certified Nigerian educators for 1-on-1 online whiteboard & home lessons
              </p>
            </div>

            {/* Map / List View Switcher */}
            <div className="flex items-center bg-[#14203D] border border-slate-800 rounded-2xl p-1 shrink-0 shadow-inner">
              <button
                onClick={() => {
                  playSound.tileTap();
                  setViewMode('map');
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'map'
                    ? 'bg-[#84CC16] text-slate-950 shadow-md shadow-[#84CC16]/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Map</span>
              </button>
              <button
                onClick={() => {
                  playSound.tileTap();
                  setViewMode('list');
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[#84CC16] text-slate-950 shadow-md shadow-[#84CC16]/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              INTERACTIVE WHITEBOARD HERO CALLOUT (Time-Gated & Dual-Approved)
             ========================================================================= */}
          <div className="bg-gradient-to-r from-[#FF5B00] via-[#E04800] to-[#1E1238] border-2 border-white/20 rounded-3xl p-4 flex items-center justify-between gap-3 shadow-[0_8px_25px_rgba(255,91,0,0.3)] select-none">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white text-[#FF5B00] flex items-center justify-center shrink-0 shadow-lg">
                {classroomEligibility.eligible ? (
                  <Video className="w-5 h-5 fill-[#FF5B00]" />
                ) : (
                  <Lock className="w-5 h-5" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-black text-white tracking-tight">Interactive Whiteboard & Audio Classroom</span>
                  <span
                    className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase shadow-xs ${
                      classroomEligibility.eligible
                        ? 'text-slate-950 bg-[#84CC16]'
                        : 'text-white bg-black/40 border border-white/30'
                    }`}
                  >
                    {classroomEligibility.eligible
                      ? 'Live Window Open'
                      : classroomEligibility.status === 'too_early'
                      ? `Opens in ${Math.max(1, Math.ceil(classroomEligibility.msUntilOpen / 60000))}m`
                      : classroomEligibility.status === 'pending_parent'
                      ? 'Awaiting Parent PIN'
                      : classroomEligibility.status === 'pending_tutor'
                      ? 'Awaiting Tutor Acceptance'
                      : 'Confirmed Booking Required'}
                  </span>
                </div>
                <p className="text-xs text-white/90 mt-0.5">
                  {classroomEligibility.eligible
                    ? `Live class active with ${classroomEligibility.activeBooking?.tutorName}.`
                    : classroomEligibility.reason}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                playSound.tileTap();
                if (classroomEligibility.eligible && classroomEligibility.activeBooking) {
                  launchVirtualClassroom(classroomEligibility.activeBooking.id, 'student');
                }
              }}
              disabled={!classroomEligibility.eligible}
              className="px-4 py-2 bg-white hover:bg-slate-100 disabled:bg-white/25 disabled:text-white/75 disabled:cursor-not-allowed text-[#FF5B00] font-black text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95"
            >
              {classroomEligibility.eligible ? (
                <>
                  <Radio className="w-3.5 h-3.5 animate-pulse text-[#FF5B00]" />
                  <span>Join Live Board</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Locked</span>
                </>
              )}
            </button>
          </div>

          {/* =========================================================================
              SEARCH BAR & SUBJECT FILTER TABS
             ========================================================================= */}
          <div className="space-y-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-[#84CC16] absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by tutor name, subject, or location..."
                className="w-full bg-[#14203D] border border-slate-700/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#84CC16] transition-colors shadow-inner"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {subjects.map(s => {
                const isActive = selectedSubject === s;
                return (
                  <button
                    key={s}
                    onClick={() => {
                      playSound.tileTap();
                      setSelectedSubject(s);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
                      isActive
                        ? 'bg-[#84CC16] text-slate-950 shadow-md shadow-[#84CC16]/20 border border-white'
                        : 'bg-[#14203D] text-slate-300 hover:text-white border border-slate-800'
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              TUTORS 2-COLUMN RESPONSIVE GRID (Matching User Request & Reference Image)
             ========================================================================= */}
          {viewMode === 'map' ? (
            <TutorMapLocator
              tutors={filteredTutors}
              onSelectTutorForBooking={(tutor: Tutor) => {
                playSound.tileTap();
                setSelectedTutorForBooking(tutor);
                setBookingConfirmed(false);
              }}
              onOpenChat={(tutorId: string) => {
                playSound.tileTap();
                setActiveTutorChatId(tutorId);
                setCurrentRole('tutor');
              }}
              onViewProfile={(tutor: Tutor) => {
                playSound.tileTap();
                setSelectedTutorForProfile(tutor);
              }}
            />
          ) : filteredTutors.length === 0 ? (
            <div className="bg-[#14203D] border-2 border-slate-800 rounded-3xl p-8 text-center space-y-2.5">
              <div className="w-12 h-12 rounded-2xl bg-[#0D1527] border border-slate-700 mx-auto flex items-center justify-center text-slate-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-white">No Registered Tutors Available Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                All sample tutors have been purged. Only real educators who sign up as a Tutor appear in this live marketplace.
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-3.5"
            >
              {filteredTutors.map(tutor => (
                <motion.div
                  key={tutor.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.015 }}
                  className="bg-gradient-to-br from-[#14203D] to-[#0E172B] rounded-3xl p-4 border-2 border-slate-800 hover:border-[#84CC16]/50 shadow-xl space-y-3 flex flex-col justify-between select-none transition-all group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          playSound.tileTap();
                          setSelectedTutorForProfile(tutor);
                        }}
                        className="cursor-pointer shrink-0 group focus:outline-none relative"
                      >
                        <PersonaAvatar
                          name={tutor.name}
                          src={tutor.avatarUrl}
                          alt={tutor.name}
                          className="w-13 h-13 rounded-2xl ring-2 ring-[#84CC16]/50 group-hover:ring-[#84CC16] transition-all shadow-md"
                          textClassName="text-sm"
                        />
                        {tutor.isNinVerified && (
                          <div
                            className="absolute -bottom-1 -right-1 bg-[#84CC16] text-slate-950 p-0.5 rounded-full shadow"
                            title="NIN Verified Identity"
                          >
                            <ShieldCheck className="w-3 h-3 stroke-[2.5]" />
                          </div>
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              playSound.tileTap();
                              setSelectedTutorForProfile(tutor);
                            }}
                            className="text-left group cursor-pointer focus:outline-none"
                          >
                            <h3 className="text-sm font-black text-white group-hover:text-[#84CC16] transition-colors truncate">
                              {tutor.name}
                            </h3>
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-300 truncate mt-0.5 font-medium">{tutor.tagline}</p>

                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                          <span className="flex items-center gap-1 text-amber-400 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            {tutor.rating}
                          </span>
                          <span>({tutor.reviewCount})</span>
                          <span>·</span>
                          <span className="flex items-center gap-1 truncate">
                            <MapPin className="w-3 h-3 text-[#FF5B00]" />
                            {tutor.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Subject Badges */}
                    <div className="flex flex-wrap gap-1">
                      {tutor.subjects.map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-bold text-slate-200 bg-[#101C34] px-2 py-0.5 rounded-md border border-slate-700/80"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {tutor.bio}
                    </p>
                  </div>

                  {/* Card Footer with Price & Actions */}
                  <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Rate</span>
                      <span className="text-xs font-extrabold text-[#84CC16] font-mono">
                        <NairaText amount={tutor.hourlyRateNaira} /> / hr
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          playSound.tileTap();
                          setSelectedTutorForProfile(tutor);
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-[#101C34] hover:bg-[#1B2B50] text-slate-200 text-xs font-bold border border-slate-700 transition-colors cursor-pointer active:scale-95"
                      >
                        Profile
                      </button>

                      <button
                        onClick={() => {
                          playSound.tileTap();
                          setActiveTutorChatId(tutor.id);
                          setCurrentRole('tutor');
                        }}
                        className="p-2 rounded-xl bg-[#101C34] hover:bg-[#1B2B50] text-slate-300 border border-slate-700 transition-colors cursor-pointer active:scale-95"
                        title="In-App Chat"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#84CC16]" />
                      </button>

                      <button
                        onClick={() => {
                          playSound.tileTap();
                          setSelectedTutorForBooking(tutor);
                          setBookingConfirmed(false);
                        }}
                        className="px-3.5 py-1.5 bg-gradient-to-r from-[#FF5B00] to-[#FF7A18] hover:from-[#E04800] hover:to-[#FF5B00] text-white text-xs font-black rounded-xl transition-all shadow-md shadow-[#FF5B00]/20 cursor-pointer active:scale-95"
                      >
                        Book Lesson
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      )}

      {/* =========================================================================
          BOOKING MODAL (Deep Navy, Electric Orange & Lime Green Theme)
         ========================================================================= */}
      {selectedTutorForBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#101C34] border-2 border-[#84CC16]/40 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="px-5 py-3.5 bg-[#0D1527] border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-black text-white">Book Tutoring Lesson</h3>
              <button
                onClick={() => {
                  playSound.tileTap();
                  setSelectedTutorForBooking(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 overflow-y-auto space-y-4 touch-pan-y text-xs text-slate-200">
              {bookingConfirmed ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#84CC16]/20 border-2 border-[#84CC16] mx-auto flex items-center justify-center text-[#84CC16] shadow-lg shadow-[#84CC16]/30">
                    <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <h4 className="text-base font-black text-white">
                    Booking Submitted &amp; Paid!
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                    Your booking requires <strong>both Parent PIN authorization</strong> and{' '}
                    <strong>{selectedTutorForBooking.name}&apos;s approval</strong> before the live class can unlock (10 minutes before start time).
                  </p>

                  <div className="p-3 rounded-2xl bg-[#14203D] border border-slate-700/80 text-[11px] text-left space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Booking Ref:</span>
                      <span className="font-mono font-bold text-white">{confirmedBookingId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Parent PIN Approval:</span>
                      <span className="font-bold text-[#84CC16]">
                        {parentPinInput.trim() && (!parentWallet.pin || parentPinInput.trim() === parentWallet.pin)
                          ? 'Authorized ✓'
                          : 'Pending in Parent Portal'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tutor Acceptance:</span>
                      <span className="font-bold text-amber-300">Pending Tutor Approval</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setSelectedTutorForBooking(null);
                        setCurrentRole('parent');
                      }}
                      className="py-2.5 px-4 rounded-xl bg-[#84CC16] text-slate-950 font-black transition-all shadow-md cursor-pointer active:scale-95"
                    >
                      Open Parent Portal to Authorize PIN
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setSelectedTutorForBooking(null);
                      }}
                      className="py-2 px-4 rounded-xl bg-[#14203D] hover:bg-slate-800 text-slate-300 font-bold cursor-pointer"
                    >
                      Back to Tutors
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Tutor Info Pill */}
                  <div className="flex items-center gap-3 bg-[#14203D] p-3.5 rounded-2xl border border-slate-700/80">
                    <PersonaAvatar
                      name={selectedTutorForBooking.name}
                      src={selectedTutorForBooking.avatarUrl}
                      alt={selectedTutorForBooking.name}
                      className="w-11 h-11 rounded-xl ring-2 ring-[#84CC16]"
                      textClassName="text-xs"
                    />
                    <div>
                      <h4 className="font-black text-white text-xs">{selectedTutorForBooking.name}</h4>
                      <p className="text-[11px] text-slate-300 font-medium">{selectedTutorForBooking.education}</p>
                      <span className="text-[11px] text-[#84CC16] font-extrabold font-mono">
                        <NairaText amount={selectedTutorForBooking.hourlyRateNaira} /> / hr
                      </span>
                    </div>
                  </div>

                  {/* Mode Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                      Session Format:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          playSound.tileTap();
                          setBookingType('physical');
                        }}
                        className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                          bookingType === 'physical'
                            ? 'bg-[#18264A] border-[#84CC16] text-white shadow-md'
                            : 'bg-[#14203D] border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="font-black block text-xs">Home Tutoring</span>
                        <span className="text-[10px] text-slate-300">Verified home visit</span>
                      </button>

                      <button
                        onClick={() => {
                          playSound.tileTap();
                          setBookingType('online');
                        }}
                        className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                          bookingType === 'online'
                            ? 'bg-[#18264A] border-[#FF5B00] text-white shadow-md'
                            : 'bg-[#14203D] border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="font-black block text-xs">Online Live</span>
                        <span className="text-[10px] text-slate-300">Live whiteboard classroom</span>
                      </button>
                    </div>
                  </div>

                  {/* Safety Alert for Physical */}
                  {bookingType === 'physical' && (
                    <div className="bg-amber-950/40 border border-amber-800/60 rounded-2xl p-3.5 space-y-2 text-xs text-amber-200">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>
                          <strong>Safety Guarantee:</strong> Physical visits require Parent PIN approval & verified home address for teacher safety.
                        </span>
                      </div>
                      {verifiedAddress ? (
                        <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-between text-[11px] text-emerald-300">
                          <div>
                            <span className="font-bold block">✓ Verified Home Address:</span>
                            <span>{verifiedAddress.street}, {verifiedAddress.lga}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              playSound.tileTap();
                              setIsAddressModalOpen(true);
                            }}
                            className="text-[10px] text-emerald-400 underline font-bold ml-2 cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            playSound.tileTap();
                            setIsAddressModalOpen(true);
                          }}
                          className="w-full py-2 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Enter Home Address for Lesson</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* Date & Time */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                      Select Scheduled Time Slot:
                    </label>
                    <select
                      value={selectedSlotId}
                      onChange={e => setSelectedSlotId(e.target.value)}
                      className="w-full bg-[#14203D] border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#84CC16]"
                    >
                      {BOOKING_SLOT_OPTIONS.map(slot => (
                        <option key={slot.id} value={slot.id}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Topic Focus */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                      Topic or Goal:
                    </label>
                    <input
                      type="text"
                      value={topicFocus}
                      onChange={e => setTopicFocus(e.target.value)}
                      className="w-full bg-[#14203D] border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#84CC16]"
                    />
                  </div>

                  {/* Live Payment Gateway Selector */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                      Live Payment Method:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setBookingPaymentMethod('paystack');
                          setBookingError(null);
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          bookingPaymentMethod === 'paystack'
                            ? 'bg-[#18264A] border-[#84CC16] text-white'
                            : 'bg-[#14203D] border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold text-xs">
                          <CreditCard className="w-3.5 h-3.5 text-[#84CC16]" />
                          <span>Paystack Live</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block mt-0.5">Card · Transfer · USSD</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setBookingPaymentMethod('wallet');
                          setBookingError(null);
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          bookingPaymentMethod === 'wallet'
                            ? 'bg-[#18264A] border-[#84CC16] text-white'
                            : 'bg-[#14203D] border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold text-xs">
                          <Wallet className="w-3.5 h-3.5 text-[#FF5B00]" />
                          <span>Escrow Wallet</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                          Bal: <NairaText amount={parentWallet.balanceNaira} />
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Parent PIN field */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                      Parent 4-Digit Approval PIN {bookingPaymentMethod === 'paystack' ? '(Optional now, or approve later in Parent Portal)' : '(Required for Escrow)'}:
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={parentPinInput}
                      onChange={e => {
                        setParentPinInput(e.target.value);
                        setBookingError(null);
                      }}
                      placeholder="••••"
                      className="w-full bg-[#14203D] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono tracking-widest focus:outline-none focus:border-[#84CC16]"
                    />
                  </div>

                  {bookingError && (
                    <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-700 text-rose-200 text-[11px] font-medium">
                      {bookingError}
                    </div>
                  )}

                  {/* Cost Summary */}
                  <div className="bg-[#0D1527] p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Escrow Total (2 hrs):</span>
                    <span className="font-extrabold text-[#84CC16] text-sm font-mono">
                      <NairaText amount={selectedTutorForBooking.hourlyRateNaira * 2} />
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      disabled={isProcessingBooking}
                      onClick={() => {
                        playSound.tileTap();
                        setSelectedTutorForBooking(null);
                        setBookingError(null);
                      }}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#14203D] hover:bg-slate-800 text-slate-300 font-bold transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={isProcessingBooking}
                      onClick={handleConfirmBooking}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#FF5B00] to-[#FF7A18] hover:from-[#E04800] hover:to-[#FF5B00] text-white font-black transition-all shadow-md cursor-pointer active:scale-95 disabled:opacity-60"
                    >
                      {isProcessingBooking ? 'Processing Live Payment...' : 'Pay & Submit Booking'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Progressive Address Verification Modal */}
      <ParentAddressVerificationModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSuccess={() => {
          setIsAddressModalOpen(false);
          handleConfirmBooking();
        }}
      />
    </div>
  );
};
