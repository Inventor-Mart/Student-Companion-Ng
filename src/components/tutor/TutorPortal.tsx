import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Calendar,
  Wallet,
  ShieldCheck,
  MessageSquare,
  Send,
  Building,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowRight,
  AlertCircle,
  Video,
  UserCog,
  GraduationCap,
  Award,
  Save,
  Plus,
  Trash2,
  Check,
  X,
  Volume2,
  VolumeX
} from 'lucide-react';

import { TutorSecurityVerificationModal } from '../auth/VerificationModals';
import { NairaText, NairaSign, formatNaira } from '../../utils/currency';
import { TimetableSlot } from '../../types';
import { playSound, toggleSoundMuted, getSoundMuted } from '../../utils/audioSynthesis';
import { PersonaAvatar } from '../common/PersonaAvatar';

type TutorTab = 'overview' | 'sessions' | 'profile' | 'chat';
type TutorSheet = 'earnings' | 'profile-core' | 'profile-credentials' | 'profile-exams' | 'timetable' | null;

export const TutorPortal: React.FC = () => {
  const {
    tutorBookings,
    activeTutorChatId,
    setActiveTutorChatId,
    chatMessages,
    sendChatMessage,
    currentUserProfile,
    tutorVerification,
    launchVirtualClassroom,
    tutorRespondToBooking,
    getBookingJoinStatus,
    updateTutorProfile,
    pendingPortalTab,
    clearPendingPortalTab
  } = useApp();

  const [sessionClockMs, setSessionClockMs] = useState<number>(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setSessionClockMs(Date.now()), 15000);
    return () => clearInterval(timer);
  }, []);

  const tutorName = currentUserProfile?.fullName || 'Registered Educator';
  const tutorData = currentUserProfile?.tutorData;
  const tutorSpecialization = tutorData?.subjectSpecialization || 'Secondary School Educator';
  const tutorQualification = tutorData?.qualification || 'Verified Educator';
  const tutorHourlyRate = tutorData?.hourlyRate || 3500;
  const tutorId = currentUserProfile?.id || 'tutor-current-user';
  const isVerified = Boolean(tutorVerification?.isVerified || tutorData?.verification?.isVerified);

  const [chatInput, setChatInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TutorTab>('overview');

  useEffect(() => {
    if (!pendingPortalTab) return;
    if (pendingPortalTab.tab === 'tutor_overview') setActiveTab('overview');
    else if (pendingPortalTab.tab === 'tutor_sessions') setActiveTab('sessions');
    else if (pendingPortalTab.tab === 'tutor_profile') setActiveTab('profile');
    else if (pendingPortalTab.tab === 'tutor_chat') setActiveTab('chat');
    if (pendingPortalTab.tab.startsWith('tutor_')) {
      clearPendingPortalTab();
    }
  }, [pendingPortalTab, clearPendingPortalTab]);
  const [activeSheet, setActiveSheet] = useState<TutorSheet>(null);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [payoutStatusMessage, setPayoutStatusMessage] = useState<string>('');
  const [profileSaveSuccess, setProfileSaveSuccess] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(getSoundMuted());

  // Editable Profile States (Preserving All Original Fields)
  const [editTagline, setEditTagline] = useState<string>(
    tutorData?.tagline || `${tutorSpecialization} (10+ Yrs Prep Specialist)`
  );
  const [editBio, setEditBio] = useState<string>(
    tutorData?.bio ||
      'Former Olympiad coach preparing secondary school candidates for Distinction grades in WAEC and 300+ in JAMB UTME. Patient, step-by-step problem solver specializing in interactive digital whiteboard drills.'
  );
  const [editHourlyRate, setEditHourlyRate] = useState<number>(tutorHourlyRate);
  const [editTeachingMode, setEditTeachingMode] = useState<'both' | 'online' | 'physical'>(
    tutorData?.teachingMode || 'both'
  );
  const [editDegrees, setEditDegrees] = useState<string[]>(
    tutorData?.degrees && tutorData.degrees.length > 0
      ? tutorData.degrees
      : [
          'B.Eng Mechanical Engineering, University of Lagos (First Class Honours, GPA 4.88/5.00)',
          'National Mathematics Olympiad Gold Mentor (Lagos State Chapter)'
        ]
  );
  const [editCertifications, setEditCertifications] = useState<string[]>(
    tutorData?.certifications && tutorData.certifications.length > 0
      ? tutorData.certifications
      : [
          'Registered Engineer (COREN Reg. No. R.52841)',
          'TRCN Certified Secondary Educator (Teachers Registration Council of Nigeria)',
          'Verified National ID: NIMC NIN Verified'
        ]
  );
  const [editExamSpecs, setEditExamSpecs] = useState<string[]>(
    tutorData?.examSpecializations && tutorData.examSpecializations.length > 0
      ? tutorData.examSpecializations
      : [
          'WAEC / WASSCE General Mathematics (Target: A1 Distinction)',
          'JAMB UTME Mathematics & Physics Speed Drills (Target: 85+ / 100)',
          'Further Mathematics: Calculus, Vectors & Mechanics',
          'Cowbellpedia Secondary School Mathematics TV Quiz Prep'
        ]
  );
  const [editHighlights, setEditHighlights] = useState<string[]>(
    tutorData?.curriculumHighlights && tutorData.curriculumHighlights.length > 0
      ? tutorData.curriculumHighlights
      : [
          'Differentiation & Integration from First Principles',
          'Trigonometric Identities & 3D Bearing Calculations',
          'Newtonian Mechanics & Projectile Motion Trajectories',
          'Simultaneous & Quadratic Equation Graphic Visualizations'
        ]
  );
  const [editTimetable, setEditTimetable] = useState<TimetableSlot[]>(
    tutorData?.timetable && tutorData.timetable.length > 0
      ? tutorData.timetable
      : [
          { id: 'slot-1', day: 'Monday', time: '10:00 AM - 12:00 PM', period: 'Morning', isAvailable: true },
          { id: 'slot-2', day: 'Monday', time: '04:00 PM - 06:00 PM', period: 'Afternoon', isAvailable: true },
          { id: 'slot-3', day: 'Wednesday', time: '04:00 PM - 06:00 PM', period: 'Afternoon', isAvailable: true },
          { id: 'slot-4', day: 'Wednesday', time: '06:30 PM - 08:30 PM', period: 'Evening', isAvailable: false },
          { id: 'slot-5', day: 'Friday', time: '04:00 PM - 06:00 PM', period: 'Afternoon', isAvailable: true },
          { id: 'slot-6', day: 'Saturday', time: '09:00 AM - 11:00 AM', period: 'Morning', isAvailable: true },
          { id: 'slot-7', day: 'Saturday', time: '02:00 PM - 04:00 PM', period: 'Afternoon', isAvailable: true }
        ]
  );

  // Staggered audio pop cascade on Bento views
  useEffect(() => {
    if (activeTab === 'chat') return;
    const count = activeTab === 'overview' ? 6 : activeTab === 'profile' ? 4 : 3;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < count; i++) {
      timers.push(
        setTimeout(() => {
          playSound.tilePop(i);
        }, 70 + i * 75)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [activeTab]);

  const handleToggleMute = () => {
    const nextMuted = toggleSoundMuted();
    setIsMuted(nextMuted);
    if (!nextMuted) playSound.tileTap();
  };

  const commitProfileUpdate = (closeSheetAfter = false) => {
    updateTutorProfile({
      tagline: editTagline,
      bio: editBio,
      hourlyRate: editHourlyRate,
      teachingMode: editTeachingMode,
      degrees: editDegrees,
      certifications: editCertifications,
      examSpecializations: editExamSpecs,
      curriculumHighlights: editHighlights,
      timetable: editTimetable
    });
    playSound.correct();
    setProfileSaveSuccess(true);
    if (closeSheetAfter) {
      setActiveSheet(null);
    }
    setTimeout(() => setProfileSaveSuccess(false), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    commitProfileUpdate(true);
  };

  const toggleSlotAvailability = (slotId: string) => {
    playSound.tileTap();
    setEditTimetable(prev =>
      prev.map(slot => (slot.id === slotId ? { ...slot, isAvailable: !slot.isAvailable } : slot))
    );
  };

  // Filter bookings strictly for this registered tutor
  const myBookings = tutorBookings.filter(b => b.tutorId === tutorId);
  const confirmedCount = myBookings.filter(b => b.status === 'confirmed').length;
  const pendingCount = myBookings.filter(b => b.status === 'pending_parent' || b.status === 'pending_tutor').length;
  const availableSlotsCount = editTimetable.filter(s => s.isAvailable).length;

  const currentChatId = activeTutorChatId || tutorId;
  const currentMessages = chatMessages[currentChatId] || [];
  const latestMessage = currentMessages[currentMessages.length - 1];

  // Calculate real earnings from real bookings
  const availablePayout = myBookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + b.amountNaira, 0);

  const heldInEscrow = myBookings
    .filter(b => b.status === 'confirmed' || b.status === 'pending_parent' || b.status === 'pending_tutor')
    .reduce((sum, b) => sum + b.amountNaira, 0);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    playSound.correct();
    sendChatMessage(currentChatId, chatInput.trim(), 'tutor');
    setChatInput('');
  };

  const handleRequestPayout = () => {
    if (!tutorVerification) {
      playSound.tileTap();
      setIsVerificationModalOpen(true);
      return;
    }
    if (availablePayout <= 0) {
      playSound.buzz();
      setPayoutStatusMessage('No completed sessions available for payout yet.');
      setTimeout(() => setPayoutStatusMessage(''), 3000);
      return;
    }
    playSound.levelUp();
    setPayoutStatusMessage(
      `Payout of ${formatNaira(availablePayout)} initiated to ${tutorVerification.bankName} (${tutorVerification.accountNumber}). Processing within 15 minutes.`
    );
    setTimeout(() => setPayoutStatusMessage(''), 5000);
  };

  // Animation variants for staggered Bento cascade
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.065,
        delayChildren: 0.03
      }
    }
  };

  const tileVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 24 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 22
      }
    }
  };

  const teachingModeLabel =
    editTeachingMode === 'both'
      ? 'Online & In-Person'
      : editTeachingMode === 'online'
      ? 'Online Only'
      : 'In-Person Only';

  return (
    <div className="flex-1 min-h-0 h-full w-full flex flex-col bg-[#101C34] text-slate-100 overflow-hidden relative">
      {/* =========================================================================
          MAIN ADAPTIVE VIEWPORT (Scrollable pb-24 on Grids · Locked Flex on Chat)
         ========================================================================= */}
      <div
        className={
          activeTab === 'chat'
            ? 'flex-1 min-h-0 h-full w-full flex flex-col px-4 pt-3 pb-3 gap-3 overflow-hidden'
            : 'flex-1 min-h-0 h-full w-full overflow-y-auto px-4 pt-4 pb-24 space-y-4 touch-pan-y'
        }
      >
        {/* Top Educator Hero Banner */}
        <div className="shrink-0 relative overflow-hidden bg-gradient-to-br from-[#0F1A30] via-[#142343] to-[#0A1222] border-2 border-[#84CC16]/60 rounded-3xl p-4 shadow-[0_14px_32px_rgba(0,0,0,0.45),0_0_24px_rgba(132,204,22,0.18)]">
          <div className="absolute -top-12 -left-12 w-36 h-36 bg-[#84CC16]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-[#FF5B00]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-start justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3 min-w-0">
              <PersonaAvatar
                name={tutorName}
                src={currentUserProfile?.avatarUrl}
                alt={tutorName}
                fallbackInitials="ED"
                className="w-12 h-12 rounded-2xl ring-2 ring-[#84CC16] shadow-lg"
                textClassName="text-sm"
              />

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h2 className="text-sm sm:text-base font-black text-white leading-tight truncate">
                    {tutorName}
                  </h2>
                  {isVerified ? (
                    <span
                      className="text-[10px] font-black text-[#84CC16] bg-[#84CC16]/15 px-2 py-0.5 rounded-xl border border-[#84CC16]/50 flex items-center gap-1 shrink-0"
                      title="NIN Verified Educator"
                    >
                      <ShieldCheck className="w-3 h-3" />
                      <span>NIN Verified</span>
                    </span>
                  ) : (
                    <motion.button
                      type="button"
                      animate={{ scale: [1, 1.04, 1] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                      onClick={() => {
                        playSound.tileTap();
                        setIsVerificationModalOpen(true);
                      }}
                      className="text-[10px] font-black text-white bg-[#FF5B00] hover:bg-[#e05000] px-2.5 py-0.5 rounded-xl shadow-sm cursor-pointer shrink-0"
                    >
                      Verify NIN
                    </motion.button>
                  )}
                </div>
                <p className="text-xs text-slate-200 font-semibold mt-0.5 truncate">
                  {tutorSpecialization}
                </p>
                <span className="text-[10px] text-slate-400 block mt-0.5 truncate">
                  {tutorQualification} · Registered Educator
                </span>
              </div>
            </div>

            <div className="text-right shrink-0 bg-[#0D1527]/90 border border-[#84CC16]/40 rounded-2xl px-3 py-1.5">
              <span className="text-[10px] text-slate-400 block">Hourly Rate</span>
              <span className="text-sm font-black font-mono tabular-nums text-[#84CC16]">
                <NairaText amount={editHourlyRate} />
              </span>
            </div>
          </div>
        </div>

        {/* Saved Feedback & Payout Status Toast Banners */}
        <AnimatePresence>
          {profileSaveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="shrink-0 p-3 rounded-2xl bg-[#142B22] border-2 border-[#84CC16]/60 flex items-center justify-between text-xs shadow-lg"
            >
              <div className="flex items-center gap-2 text-[#84CC16] font-black">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Marketplace Profile Saved &amp; Published!</span>
              </div>
            </motion.div>
          )}
          {payoutStatusMessage && !activeSheet && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="shrink-0 p-3 rounded-2xl bg-[#14203D] border-2 border-[#FF5B00]/60 flex items-center justify-between gap-2 text-xs shadow-lg"
            >
              <div className="flex items-center gap-2 text-orange-200 font-bold">
                <AlertCircle className="w-4 h-4 text-[#FF5B00] shrink-0" />
                <span>{payoutStatusMessage}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  playSound.tileTap();
                  setPayoutStatusMessage('');
                }}
                className="text-slate-400 hover:text-white p-1 cursor-pointer shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =====================================================================
            TAB 1: OVERVIEW BENTO GRID
           ===================================================================== */}
        {activeTab === 'overview' && (
          <motion.div
            key="tutor-overview-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3.5"
          >
            {/* FULL-WIDTH HERO BENTO TILE: EARNINGS & PAYOUT */}
            <motion.div
              variants={tileVariants}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => {
                playSound.tileTap();
                setActiveSheet('earnings');
              }}
              className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-r from-[#FF5B00] via-[#FF6E1A] to-[#E84D00] border-2 border-white/25 shadow-[0_14px_32px_rgba(255,91,0,0.35)] cursor-pointer select-none group"
            >
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-white/15 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-start justify-between gap-3 relative z-10">
                <div>
                  <div className="flex items-center gap-2 text-white/95 text-xs font-black uppercase tracking-wider">
                    <Wallet className="w-4 h-4" />
                    <span>Earnings &amp; Payout</span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-4 flex-wrap">
                    <div>
                      <span className="text-[10px] text-white/85 block font-semibold">
                        Available for Payout
                      </span>
                      <div className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-white drop-shadow-sm">
                        <NairaText amount={availablePayout} />
                      </div>
                    </div>
                    <div className="bg-[#101C34]/40 border border-white/20 rounded-2xl px-3 py-1.5">
                      <span className="text-[10px] text-white/85 block font-semibold">
                        Held in Escrow
                      </span>
                      <div className="text-sm font-black font-mono tabular-nums text-[#84CC16]">
                        <NairaText amount={heldInEscrow} />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    handleRequestPayout();
                  }}
                  className="py-2.5 px-4 rounded-2xl bg-[#101C34] hover:bg-[#18294A] text-[#84CC16] border-2 border-[#84CC16]/60 text-xs font-black flex items-center gap-1.5 shadow-xl cursor-pointer active:scale-95 shrink-0"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Request Payout</span>
                </button>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-[11px] font-bold text-white/95 relative z-10">
                <span>Tap to inspect escrow &amp; Nigerian Payout Bank Account</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* 2-COLUMN BENTO ROW: STUDENT BOOKING REQUESTS & WEEKLY TIMETABLE */}
            <div className="grid grid-cols-2 gap-3.5">
              {/* MY SESSIONS / STUDENT BOOKING REQUESTS */}
              <motion.div
                variants={tileVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playSound.tileTap();
                  setActiveTab('sessions');
                }}
                className={`rounded-3xl p-4 border-2 shadow-xl cursor-pointer select-none group flex flex-col justify-between ${
                  confirmedCount > 0 || pendingCount > 0
                    ? 'bg-gradient-to-br from-[#12241D] to-[#0B1613] border-[#84CC16]/60'
                    : 'bg-[#14203D] border-slate-700/80 hover:border-[#84CC16]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#84CC16]/20 border border-[#84CC16]/50 flex items-center justify-center text-[#84CC16]">
                      <Calendar className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-[10px] font-mono font-black text-[#84CC16] bg-[#84CC16]/15 border border-[#84CC16]/40 px-2 py-0.5 rounded-lg">
                      {myBookings.length} Active
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-white tracking-tight leading-tight">
                    Student Booking Requests
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                    {myBookings.length === 0
                      ? 'No session requests yet. Bookings appear here.'
                      : `${confirmedCount} confirmed · ${pendingCount} awaiting approval`}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-700/80 flex items-center justify-between text-[10px] font-black text-[#84CC16]">
                  <span>My Sessions</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

              {/* WEEKLY TIMETABLE AVAILABILITY */}
              <motion.div
                variants={tileVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playSound.tileTap();
                  setActiveSheet('timetable');
                }}
                className="rounded-3xl p-4 bg-[#14203D] border-2 border-[#FF5B00]/45 hover:border-[#FF5B00] shadow-xl cursor-pointer select-none group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#FF5B00]/20 border border-[#FF5B00]/50 flex items-center justify-center text-[#FF5B00]">
                      <Clock className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-[10px] font-mono font-black text-[#84CC16] bg-[#0D1527] border border-[#84CC16]/40 px-2 py-0.5 rounded-lg">
                      {availableSlotsCount}/{editTimetable.length} Open
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-white tracking-tight leading-tight">
                    Weekly Timetable Availability
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                    Tap to toggle your morning, afternoon &amp; evening teaching slots
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#FF5B00]/25 flex items-center justify-between text-[10px] font-black text-[#FF5B00]">
                  <span>Toggle Slots</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </div>

            {/* 2-COLUMN BENTO ROW: PUBLIC MARKETPLACE PROFILE & NIGERIAN PAYOUT BANK ACCOUNT */}
            <div className="grid grid-cols-2 gap-3.5">
              {/* PUBLIC MARKETPLACE PROFILE */}
              <motion.div
                variants={tileVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playSound.tileTap();
                  setActiveSheet('profile-core');
                }}
                className="rounded-3xl p-4 bg-[#14203D] border-2 border-[#84CC16]/45 hover:border-[#84CC16] shadow-xl cursor-pointer select-none group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#84CC16]/20 border border-[#84CC16]/50 flex items-center justify-center text-[#84CC16]">
                      <UserCog className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-[9px] font-bold text-white bg-[#0D1527] border border-slate-700 px-2 py-0.5 rounded-lg truncate max-w-[95px]">
                      {teachingModeLabel}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-white tracking-tight leading-tight">
                    Public Marketplace Profile
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">{editTagline}</p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-700/80 flex items-center justify-between text-[10px] font-black text-[#84CC16]">
                  <span>Edit Bio &amp; Rate</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

              {/* NIGERIAN PAYOUT BANK ACCOUNT */}
              <motion.div
                variants={tileVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playSound.tileTap();
                  setIsVerificationModalOpen(true);
                }}
                className={`rounded-3xl p-4 border-2 shadow-xl cursor-pointer select-none group flex flex-col justify-between ${
                  tutorVerification
                    ? 'bg-[#14203D] border-[#84CC16]/45 hover:border-[#84CC16]'
                    : 'bg-gradient-to-br from-[#261812] to-[#140E0B] border-[#FF5B00]/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <div
                      className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${
                        tutorVerification
                          ? 'bg-[#84CC16]/20 border-[#84CC16]/50 text-[#84CC16]'
                          : 'bg-[#FF5B00]/20 border-[#FF5B00]/50 text-[#FF5B00]'
                      }`}
                    >
                      <Building className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    {tutorVerification ? (
                      <span className="text-[9px] font-black text-slate-950 bg-[#84CC16] px-2 py-0.5 rounded-lg">
                        NIMC Verified
                      </span>
                    ) : (
                      <span className="text-[9px] font-black text-white bg-[#FF5B00] px-2 py-0.5 rounded-lg">
                        Action Needed
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-white tracking-tight leading-tight">
                    Nigerian Payout Bank Account
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                    {tutorVerification
                      ? `${tutorVerification.bankName} · ${tutorVerification.accountNumber}`
                      : 'Verify NIN & Bank Details for automated payouts'}
                  </p>
                </div>

                <div
                  className={`mt-3 pt-2.5 border-t flex items-center justify-between text-[10px] font-black ${
                    tutorVerification ? 'border-slate-700/80 text-[#84CC16]' : 'border-[#FF5B00]/30 text-[#FF5B00]'
                  }`}
                >
                  <span>{tutorVerification ? 'Edit Details' : 'Verify Details'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </div>

            {/* FULL-WIDTH BENTO TILE: MASKED CHAT PREVIEW */}
            <motion.div
              variants={tileVariants}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => {
                playSound.tileTap();
                setActiveTab('chat');
              }}
              className="rounded-3xl p-4 bg-[#14203D] border-2 border-slate-700/80 hover:border-[#84CC16]/60 shadow-xl cursor-pointer select-none group"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-[#0D1527] border border-[#84CC16]/50 flex items-center justify-center text-[#84CC16] shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-black text-white tracking-tight">Masked Chat</h3>
                      <span className="text-[10px] font-bold text-[#84CC16] bg-[#0D1527] px-2 py-0.2 rounded-lg border border-[#84CC16]/40">
                        Masked Channel (Privacy Protected)
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5 truncate">
                      {latestMessage
                        ? `Latest: "${latestMessage.text}"`
                        : 'Direct Student Communication · Tap to open privacy-protected chat'}
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-[#FF5B00] group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* =====================================================================
            TAB 2: MY SESSIONS (STUDENT BOOKING REQUESTS)
           ===================================================================== */}
        {activeTab === 'sessions' && (
          <motion.div
            key="tutor-sessions-tab"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3.5"
          >
            <motion.div
              variants={tileVariants}
              className="flex items-center justify-between bg-[#14203D] rounded-2xl px-4 py-3 border border-slate-800"
            >
              <div>
                <h3 className="text-sm font-black text-white tracking-tight">
                  Student Booking Requests
                </h3>
                <span className="text-[11px] text-slate-400">My Sessions &amp; Virtual Classrooms</span>
              </div>
              <span className="text-xs font-mono font-black text-[#84CC16] bg-[#0D1527] px-2.5 py-1 rounded-xl border border-[#84CC16]/40">
                {myBookings.length} Active
              </span>
            </motion.div>

            {myBookings.length === 0 ? (
              <motion.div
                variants={tileVariants}
                className="bg-[#14203D] rounded-3xl p-8 text-center border-2 border-slate-800 space-y-2.5 shadow-xl"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#0D1527] border border-[#FF5B00]/40 flex items-center justify-center text-[#FF5B00] mx-auto">
                  <Calendar className="w-7 h-7" />
                </div>
                <span className="text-sm text-white font-black block">No session requests yet</span>
                <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                  When students or parents in your area book online or physical home tutoring sessions with you, they will appear here.
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {myBookings.map(b => {
                  const needsTutorDecision = !b.isTutorApproved && b.status !== 'cancelled' && b.status !== 'completed';
                  const joinCheck = getBookingJoinStatus(b, sessionClockMs);

                  return (
                    <motion.div
                      key={b.id}
                      variants={tileVariants}
                      className={`rounded-3xl p-4 border-2 space-y-3 shadow-xl ${
                        b.status === 'confirmed'
                          ? 'bg-[#14203D] border-[#84CC16]/60'
                          : b.status === 'pending_tutor' || b.status === 'pending_parent'
                          ? 'bg-gradient-to-br from-[#261812] to-[#140E0B] border-[#FF5B00]/60'
                          : 'bg-[#14203D] border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-black text-white">{b.studentName}</span>
                            <span
                              className={`text-[10px] font-black px-2 py-0.5 rounded-lg border ${
                                b.status === 'confirmed'
                                  ? 'bg-[#84CC16]/20 text-[#84CC16] border-[#84CC16]/50'
                                  : b.status === 'pending_tutor' || b.status === 'pending_parent'
                                  ? 'bg-[#FF5B00]/20 text-orange-200 border-[#FF5B00]/50'
                                  : 'bg-[#0D1527] text-slate-300 border-slate-700'
                              }`}
                            >
                              {b.status === 'confirmed'
                                ? 'Confirmed (Dual Approved)'
                                : b.status === 'pending_tutor'
                                ? 'Action Needed: Tutor Accept'
                                : b.status === 'pending_parent'
                                ? 'Awaiting Parent PIN'
                                : b.status === 'cancelled'
                                ? 'Cancelled / Refunded'
                                : 'Completed'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1">
                            {b.subject} · {b.topic}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[10px]">
                            <span className={b.isParentApproved ? 'text-[#84CC16] font-bold' : 'text-amber-300'}>
                              Parent PIN: {b.isParentApproved ? '✓' : 'Pending'}
                            </span>
                            <span className="text-slate-600">·</span>
                            <span className={b.isTutorApproved ? 'text-[#84CC16] font-bold' : 'text-amber-300'}>
                              Tutor: {b.isTutorApproved ? '✓ Accepted' : 'Pending'}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-sm font-black font-mono text-[#84CC16]">
                            <NairaText amount={b.amountNaira} />
                          </span>
                          <span className="text-[10px] text-[#FF5B00] font-black block uppercase">
                            {b.bookingType}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300 pt-2.5 border-t border-slate-800">
                        <span className="flex items-center gap-1.5 text-[11px]">
                          <Clock className="w-3.5 h-3.5 text-[#84CC16]" />
                          <span>
                            {b.date} ({b.timeSlot})
                          </span>
                        </span>

                        <div className="flex items-center flex-wrap gap-2">
                          {needsTutorDecision && (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  playSound.tileTap();
                                  tutorRespondToBooking(b.id, 'decline', 'Declined by Tutor');
                                }}
                                className="px-3 py-1.5 rounded-xl bg-rose-950/70 hover:bg-rose-900 text-rose-200 border border-rose-700 font-black text-[11px] cursor-pointer active:scale-95"
                              >
                                Decline &amp; Refund
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  playSound.levelUp();
                                  tutorRespondToBooking(b.id, 'accept');
                                }}
                                className="px-3 py-1.5 rounded-xl bg-[#84CC16] hover:bg-[#A3E635] text-slate-950 font-black text-[11px] cursor-pointer active:scale-95 shadow-md"
                              >
                                Accept Session
                              </button>
                            </>
                          )}

                          {b.status === 'confirmed' && b.bookingType === 'online' && (
                            <button
                              type="button"
                              disabled={!joinCheck.allowed}
                              onClick={() => {
                                if (!joinCheck.allowed) return;
                                playSound.levelUp();
                                launchVirtualClassroom(b.id, 'tutor');
                              }}
                              title={joinCheck.reason}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF5B00] hover:bg-[#e05000] disabled:bg-slate-800 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-black text-[11px] transition-all cursor-pointer shadow-md shadow-[#FF5B00]/25 active:scale-95"
                            >
                              <Video className="w-3.5 h-3.5" />
                              <span>
                                {joinCheck.allowed
                                  ? 'Launch Virtual Classroom'
                                  : joinCheck.status === 'too_early'
                                  ? `Opens in ${Math.max(1, Math.ceil(joinCheck.msUntilOpen / 60000))}m`
                                  : 'Window Ended'}
                              </span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              playSound.tileTap();
                              setActiveTutorChatId(b.studentId);
                              setActiveTab('chat');
                            }}
                            className="px-3 py-1.5 rounded-xl bg-[#0D1527] hover:bg-[#18294A] text-[#84CC16] border border-[#84CC16]/40 font-black text-[11px] cursor-pointer active:scale-95"
                          >
                            Open Masked Chat
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* =====================================================================
            TAB 3: MARKETPLACE PROFILE (Bento Summary Cards + Tap-to-Open Editors)
           ===================================================================== */}
        {activeTab === 'profile' && (
          <motion.div
            key="tutor-profile-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3.5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* BENTO CARD 1: PUBLIC MARKETPLACE PROFILE */}
              <motion.div
                variants={tileVariants}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => {
                  playSound.tileTap();
                  setActiveSheet('profile-core');
                }}
                className="rounded-3xl p-4 bg-[#14203D] border-2 border-[#84CC16]/50 hover:border-[#84CC16] shadow-xl cursor-pointer select-none group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-[#84CC16]/20 border border-[#84CC16]/50 flex items-center justify-center text-[#84CC16]">
                      <UserCog className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-black text-[#84CC16] bg-[#0D1527] px-2.5 py-0.5 rounded-lg border border-[#84CC16]/40">
                      <NairaText amount={editHourlyRate} />/hr
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-white">Public Marketplace Profile</h3>
                  <p className="text-[11px] text-slate-300 line-clamp-2">{editTagline}</p>
                  <span className="inline-block text-[10px] font-bold text-[#FF5B00] bg-[#FF5B00]/15 px-2 py-0.5 rounded-lg border border-[#FF5B00]/30">
                    {teachingModeLabel}
                  </span>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-700/80 flex items-center justify-between text-[11px] font-black text-[#84CC16]">
                  <span>Edit Tagline, Bio &amp; Rate</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

              {/* BENTO CARD 2: DEGREES, ACADEMIC HONORS & CERTIFICATIONS */}
              <motion.div
                variants={tileVariants}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => {
                  playSound.tileTap();
                  setActiveSheet('profile-credentials');
                }}
                className="rounded-3xl p-4 bg-[#14203D] border-2 border-[#FF5B00]/45 hover:border-[#FF5B00] shadow-xl cursor-pointer select-none group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-[#FF5B00]/20 border border-[#FF5B00]/50 flex items-center justify-center text-[#FF5B00]">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-black text-orange-200 bg-[#0D1527] px-2.5 py-0.5 rounded-lg border border-[#FF5B00]/40">
                      {editDegrees.length + editCertifications.length} Listed
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-white">
                    Degrees, Academic Honors &amp; Certifications
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    {editDegrees[0] || 'Add university degrees, TRCN, and NIMC credentials'}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-700/80 flex items-center justify-between text-[11px] font-black text-[#FF5B00]">
                  <span>Edit Degrees &amp; Licenses</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

              {/* BENTO CARD 3: EXAM SPECIALIZATIONS & CORE CURRICULUM HIGHLIGHTS */}
              <motion.div
                variants={tileVariants}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => {
                  playSound.tileTap();
                  setActiveSheet('profile-exams');
                }}
                className="rounded-3xl p-4 bg-[#14203D] border-2 border-[#FF5B00]/45 hover:border-[#FF5B00] shadow-xl cursor-pointer select-none group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-[#FF5B00]/20 border border-[#FF5B00]/50 flex items-center justify-center text-[#FF5B00]">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-black text-orange-200 bg-[#0D1527] px-2.5 py-0.5 rounded-lg border border-[#FF5B00]/40">
                      {editExamSpecs.length} Exams · {editHighlights.length} Topics
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-white">
                    Exam Specializations &amp; Core Curriculum Highlights
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    {editExamSpecs[0] || 'WAEC, JAMB UTME, Further Maths & Olympiad drills'}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-700/80 flex items-center justify-between text-[11px] font-black text-[#FF5B00]">
                  <span>Edit Specializations</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

              {/* BENTO CARD 4: WEEKLY TIMETABLE AVAILABILITY */}
              <motion.div
                variants={tileVariants}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => {
                  playSound.tileTap();
                  setActiveSheet('timetable');
                }}
                className="rounded-3xl p-4 bg-[#14203D] border-2 border-[#84CC16]/50 hover:border-[#84CC16] shadow-xl cursor-pointer select-none group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-[#84CC16]/20 border border-[#84CC16]/50 flex items-center justify-center text-[#84CC16]">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-black text-[#84CC16] bg-[#0D1527] px-2.5 py-0.5 rounded-lg border border-[#84CC16]/40">
                      {availableSlotsCount} Available
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-white">Weekly Timetable Availability</h3>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    {editTimetable
                      .filter(s => s.isAvailable)
                      .slice(0, 2)
                      .map(s => `${s.day} (${s.period})`)
                      .join(' · ') || 'No active slots selected'}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-700/80 flex items-center justify-between text-[11px] font-black text-[#84CC16]">
                  <span>Click slot to toggle availability</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </div>

            {/* Primary Save & Publish Action */}
            <motion.button
              variants={tileVariants}
              type="button"
              onClick={() => commitProfileUpdate(false)}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#84CC16] hover:bg-[#A3E635] active:scale-[0.98] text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-[#84CC16]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save &amp; Publish Marketplace Profile</span>
            </motion.button>
          </motion.div>
        )}

        {/* =====================================================================
            TAB 4: MASKED CHAT (Single-Scroll Viewport Fitted)
           ===================================================================== */}
        {activeTab === 'chat' && (
          <div className="flex-1 min-h-0 bg-[#14203D] rounded-3xl border-2 border-[#84CC16]/40 flex flex-col overflow-hidden shadow-2xl">
            {/* Chat Header */}
            <div className="px-4 py-3 bg-[#0D1527] border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#FF5B00]/20 border border-[#FF5B00]/50 flex items-center justify-center text-[#FF5B00] shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">Direct Student Communication</h4>
                  <span className="text-[10px] text-[#84CC16] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Masked Channel (Privacy Protected)
                  </span>
                </div>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 touch-pan-y bg-[#101C34]/60">
              {currentMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
                  <MessageSquare className="w-9 h-9 text-[#84CC16] opacity-75" />
                  <span className="text-xs text-white font-black">No messages yet</span>
                  <p className="text-[11px] text-slate-300 max-w-xs">
                    When a student or parent with an active booking messages you, their conversation will appear here.
                  </p>
                </div>
              ) : (
                currentMessages.map(msg => {
                  const isTutor = msg.sender === 'tutor';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isTutor ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs shadow-md ${
                          isTutor
                            ? 'bg-[#FF5B00] text-white rounded-br-sm font-medium'
                            : 'bg-[#14203D] text-slate-100 rounded-bl-sm border border-[#84CC16]/40'
                        }`}
                      >
                        <p className="leading-relaxed">{msg.text}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 font-mono">{msg.timestamp}</span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Pinned Input Bar */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-[#0D1527] border-t border-slate-800 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Send masked message to student..."
                className="flex-1 bg-[#14203D] border-2 border-slate-700 focus:border-[#84CC16] rounded-2xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="p-3 rounded-2xl bg-[#84CC16] hover:bg-[#A3E635] disabled:opacity-40 text-slate-950 font-black transition-all cursor-pointer active:scale-95 shrink-0"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* =========================================================================
          MATCHING NAVY & LIME BOTTOM NAVIGATION DOCK (Overview · Sessions · Profile · Chat)
         ========================================================================= */}
      <nav className="w-full bg-[#0D1527]/95 backdrop-blur-xl border-t border-slate-800/80 px-2 py-2 flex items-center justify-around shrink-0 z-30 select-none relative shadow-2xl">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#84CC16_1px,transparent_1px)] [background-size:16px_16px]" />

        {[
          { id: 'overview' as const, label: 'Overview', icon: LayoutDashboard, badge: 0 },
          { id: 'sessions' as const, label: 'Sessions', icon: Calendar, badge: myBookings.length },
          { id: 'profile' as const, label: 'Profile', icon: UserCog, badge: 0 },
          { id: 'chat' as const, label: 'Chat', icon: MessageSquare, badge: 0 }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                playSound.tileTap();
                setActiveTab(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 ${
                isActive ? 'text-[#84CC16] font-bold' : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="tutorActiveTabIndicator"
                  className="absolute -top-2 w-8 h-1 rounded-full bg-[#84CC16] shadow-[0_0_12px_#84CC16]"
                  transition={{ type: 'spring' as const, stiffness: 400, damping: 30 }}
                />
              )}

              <div
                className={`relative p-1.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-[#84CC16] scale-110 drop-shadow-[0_0_8px_rgba(132,204,22,0.6)]'
                    : 'text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
                {tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#FF5B00] text-white text-[9px] font-black flex items-center justify-center shadow-md">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] tracking-tight mt-0.5 leading-none">{tab.label}</span>
            </button>
          );
        })}

        {/* Sound FX Mute/Unmute Toggle */}
        <button
          type="button"
          onClick={handleToggleMute}
          title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
          className="p-2 text-slate-400 hover:text-white transition-colors rounded-xl active:scale-90 cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-slate-500" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#84CC16]" />
          )}
        </button>
      </nav>

      {/* =========================================================================
          TAP-TO-OPEN DETAIL SHEETS & MARKETPLACE EDITORS
         ========================================================================= */}
      <AnimatePresence>
        {activeSheet && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                playSound.tileTap();
                setActiveSheet(null);
              }}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: '100%', opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring' as const, damping: 28, stiffness: 320 }}
              className="relative w-full max-w-lg bg-[#101C34] border-2 border-[#84CC16]/50 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl z-10 max-h-[86vh] overflow-y-auto space-y-4"
            >
              {/* SHEET 1: EARNINGS & PAYOUT + NIGERIAN PAYOUT BANK ACCOUNT */}
              {activeSheet === 'earnings' && (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#FF5B00]/20 border border-[#FF5B00]/50 text-[#FF5B00]">
                        <Wallet className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white">Earnings &amp; Payout</h3>
                        <span className="text-[11px] text-slate-400">Escrow &amp; Nigerian Bank Settlement</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setActiveSheet(null);
                      }}
                      className="p-1.5 rounded-xl bg-[#14203D] text-slate-300 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#14203D] rounded-2xl p-4 border border-[#84CC16]/40 space-y-1">
                      <span className="text-[11px] text-slate-300 block">Available for Payout</span>
                      <div className="text-xl font-black font-mono tabular-nums text-[#84CC16]">
                        <NairaText amount={availablePayout} />
                      </div>
                      <span className="text-[10px] text-slate-400 block">
                        {availablePayout > 0 ? 'Ready to withdraw' : 'Completed sessions payout'}
                      </span>
                    </div>

                    <div className="bg-[#14203D] rounded-2xl p-4 border border-[#FF5B00]/40 space-y-1">
                      <span className="text-[11px] text-slate-300 block">Held in Escrow</span>
                      <div className="text-xl font-black font-mono tabular-nums text-[#FF5B00]">
                        <NairaText amount={heldInEscrow} />
                      </div>
                      <span className="text-[10px] text-slate-400 block">
                        {confirmedCount} active session(s)
                      </span>
                    </div>
                  </div>

                  {/* Nigerian Payout Bank Account */}
                  <div className="bg-[#14203D] rounded-2xl p-4 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-white flex items-center gap-2">
                        <Building className="w-4 h-4 text-[#84CC16]" />
                        <span>Nigerian Payout Bank Account</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          playSound.tileTap();
                          setActiveSheet(null);
                          setIsVerificationModalOpen(true);
                        }}
                        className="text-[11px] text-[#84CC16] hover:underline font-bold cursor-pointer"
                      >
                        {tutorVerification ? 'Edit Details' : 'Verify Details'}
                      </button>
                    </div>

                    {tutorVerification ? (
                      <div className="bg-[#0D1527] p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span>NIN Identity:</span>
                          <span className="font-mono text-[#84CC16] font-bold flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {tutorVerification.nin.slice(0, 3)}****{tutorVerification.nin.slice(-2)} (NIMC Verified)
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Bank:</span>
                          <span className="font-bold text-white">{tutorVerification.bankName}</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Account Number:</span>
                          <span className="font-mono text-white">{tutorVerification.accountNumber}</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Account Name:</span>
                          <span className="text-[#84CC16] font-bold">{tutorVerification.accountName}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-[#0D1527] p-4 rounded-xl border border-[#FF5B00]/40 text-center space-y-2">
                        <AlertCircle className="w-6 h-6 text-[#FF5B00] mx-auto" />
                        <p className="text-xs text-white font-bold">
                          No verified Nigerian payout bank account connected yet.
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Add your National Identification Number (NIN) and commercial bank account to receive automated session payouts.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            playSound.tileTap();
                            setActiveSheet(null);
                            setIsVerificationModalOpen(true);
                          }}
                          className="px-3.5 py-2 rounded-xl bg-[#FF5B00] hover:bg-[#e05000] text-white text-xs font-black transition-colors cursor-pointer"
                        >
                          Verify NIN &amp; Bank Details
                        </button>
                      </div>
                    )}

                    {payoutStatusMessage && (
                      <div className="p-2.5 rounded-xl bg-[#0D1527] border border-[#84CC16]/50 text-[#84CC16] text-xs font-semibold">
                        {payoutStatusMessage}
                      </div>
                    )}

                    {availablePayout > 0 && (
                      <button
                        type="button"
                        onClick={handleRequestPayout}
                        className="w-full py-2.5 px-4 bg-[#84CC16] hover:bg-[#A3E635] text-slate-950 text-xs font-black rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                        <span>
                          Request Payout (<NairaText amount={availablePayout} />)
                        </span>
                      </button>
                    )}
                  </div>
                </>
              )}

              {/* SHEET 2: PUBLIC MARKETPLACE PROFILE CORE EDITOR */}
              {activeSheet === 'profile-core' && (
                <form onSubmit={handleSaveProfile} className="space-y-3.5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#84CC16]/20 border border-[#84CC16]/50 text-[#84CC16]">
                        <UserCog className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white">Public Marketplace Profile</h3>
                        <span className="text-[11px] text-slate-400">
                          Customize how students and parents discover you
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setActiveSheet(null);
                      }}
                      className="p-1.5 rounded-xl bg-[#14203D] text-slate-300 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-200 block mb-1">
                      Profile Tagline (Displays under your name)
                    </label>
                    <input
                      type="text"
                      value={editTagline}
                      onChange={e => setEditTagline(e.target.value)}
                      placeholder="e.g. WAEC & JAMB Mathematics/Physics Specialist (10+ Yrs)"
                      className="w-full bg-[#14203D] border-2 border-slate-700 focus:border-[#84CC16] rounded-xl py-2 px-3 text-xs text-white placeholder-slate-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-200 block mb-1">
                      Hourly Rate (<NairaSign />)
                    </label>
                    <input
                      type="number"
                      value={editHourlyRate}
                      onChange={e => setEditHourlyRate(Number(e.target.value))}
                      className="w-full bg-[#14203D] border-2 border-slate-700 focus:border-[#84CC16] rounded-xl py-2 px-3 text-xs text-white font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-200 block mb-1">
                      Detailed Biography &amp; Methodology
                    </label>
                    <textarea
                      rows={3}
                      value={editBio}
                      onChange={e => setEditBio(e.target.value)}
                      placeholder="Share your pedagogy, past results, university background, and coaching style..."
                      className="w-full bg-[#14203D] border-2 border-slate-700 focus:border-[#84CC16] rounded-xl py-2 px-3 text-xs text-white placeholder-slate-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-200 block mb-1.5">
                      Lesson Mode Offered
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'both', label: 'Online & In-Person' },
                        { id: 'online', label: 'Online Only' },
                        { id: 'physical', label: 'In-Person Only' }
                      ].map(m => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            playSound.tileTap();
                            setEditTeachingMode(m.id as any);
                          }}
                          className={`py-2 px-2 rounded-xl text-[11px] font-black transition-all cursor-pointer border-2 ${
                            editTeachingMode === m.id
                              ? 'bg-[#84CC16] border-[#A3E635] text-slate-950'
                              : 'bg-[#14203D] border-slate-700 text-slate-300 hover:text-white'
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-[#FF5B00] hover:bg-[#e05000] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-[#FF5B00]/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save &amp; Publish Marketplace Profile</span>
                  </button>
                </form>
              )}

              {/* SHEET 3: DEGREES, ACADEMIC HONORS & CERTIFICATIONS */}
              {activeSheet === 'profile-credentials' && (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#FF5B00]/20 border border-[#FF5B00]/50 text-[#FF5B00]">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white">
                          Degrees, Academic Honors &amp; Certifications
                        </h3>
                        <span className="text-[11px] text-slate-400">Verified Educator Credentials</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setActiveSheet(null);
                      }}
                      className="p-1.5 rounded-xl bg-[#14203D] text-slate-300 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white block">Degrees &amp; Diplomas</label>
                    {editDegrees.map((deg, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={deg}
                          onChange={e => {
                            const updated = [...editDegrees];
                            updated[idx] = e.target.value;
                            setEditDegrees(updated);
                          }}
                          className="flex-1 bg-[#14203D] border border-slate-700 focus:border-[#84CC16] rounded-xl py-2 px-3 text-xs text-white focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            playSound.tileTap();
                            setEditDegrees(editDegrees.filter((_, i) => i !== idx));
                          }}
                          className="p-2 text-slate-400 hover:text-[#FF5B00] cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setEditDegrees([...editDegrees, 'B.Sc. Education (University of Lagos)']);
                      }}
                      className="text-xs text-[#84CC16] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Another Degree</span>
                    </button>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-800">
                    <label className="text-xs font-bold text-white block">
                      Professional Licenses &amp; Certifications
                    </label>
                    {editCertifications.map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={cert}
                          onChange={e => {
                            const updated = [...editCertifications];
                            updated[idx] = e.target.value;
                            setEditCertifications(updated);
                          }}
                          className="flex-1 bg-[#14203D] border border-slate-700 focus:border-[#84CC16] rounded-xl py-2 px-3 text-xs text-white focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            playSound.tileTap();
                            setEditCertifications(editCertifications.filter((_, i) => i !== idx));
                          }}
                          className="p-2 text-slate-400 hover:text-[#FF5B00] cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setEditCertifications([...editCertifications, 'TRCN Certified Secondary Educator']);
                      }}
                      className="text-xs text-[#84CC16] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Certification</span>
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-[#84CC16] hover:bg-[#A3E635] text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-[#84CC16]/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save &amp; Publish Marketplace Profile</span>
                  </button>
                </form>
              )}

              {/* SHEET 4: EXAM SPECIALIZATIONS & CORE CURRICULUM HIGHLIGHTS */}
              {activeSheet === 'profile-exams' && (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#FF5B00]/20 border border-[#FF5B00]/50 text-[#FF5B00]">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white">
                          Exam Specializations &amp; Core Curriculum Highlights
                        </h3>
                        <span className="text-[11px] text-slate-400">Targeted Mastery &amp; Topics</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setActiveSheet(null);
                      }}
                      className="p-1.5 rounded-xl bg-[#14203D] text-slate-300 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white block">Exam Specializations</label>
                    {editExamSpecs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={spec}
                          onChange={e => {
                            const updated = [...editExamSpecs];
                            updated[idx] = e.target.value;
                            setEditExamSpecs(updated);
                          }}
                          className="flex-1 bg-[#14203D] border border-slate-700 focus:border-[#FF5B00] rounded-xl py-2 px-3 text-xs text-white focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            playSound.tileTap();
                            setEditExamSpecs(editExamSpecs.filter((_, i) => i !== idx));
                          }}
                          className="p-2 text-slate-400 hover:text-[#FF5B00] cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setEditExamSpecs([...editExamSpecs, 'WAEC Mathematics Prep (Target: A1)']);
                      }}
                      className="text-xs text-[#FF5B00] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Exam Specialization</span>
                    </button>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-800">
                    <label className="text-xs font-bold text-white block">Curriculum Highlights</label>
                    {editHighlights.map((hi, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={hi}
                          onChange={e => {
                            const updated = [...editHighlights];
                            updated[idx] = e.target.value;
                            setEditHighlights(updated);
                          }}
                          className="flex-1 bg-[#14203D] border border-slate-700 focus:border-[#FF5B00] rounded-xl py-2 px-3 text-xs text-white focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            playSound.tileTap();
                            setEditHighlights(editHighlights.filter((_, i) => i !== idx));
                          }}
                          className="p-2 text-slate-400 hover:text-[#FF5B00] cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setEditHighlights([...editHighlights, 'Trigonometric Identities & 3D Bearing']);
                      }}
                      className="text-xs text-[#FF5B00] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Curriculum Highlight</span>
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-[#FF5B00] hover:bg-[#e05000] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-[#FF5B00]/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save &amp; Publish Marketplace Profile</span>
                  </button>
                </form>
              )}

              {/* SHEET 5: WEEKLY TIMETABLE AVAILABILITY */}
              {activeSheet === 'timetable' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#84CC16]/20 border border-[#84CC16]/50 text-[#84CC16]">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white">Weekly Timetable Availability</h3>
                        <span className="text-[11px] text-slate-400">Click slot to toggle availability</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        playSound.tileTap();
                        setActiveSheet(null);
                      }}
                      className="p-1.5 rounded-xl bg-[#14203D] text-slate-300 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {editTimetable.map(slot => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => toggleSlotAvailability(slot.id)}
                        className={`p-3 rounded-2xl border-2 flex items-center justify-between text-xs transition-all cursor-pointer active:scale-97 ${
                          slot.isAvailable
                            ? 'bg-[#12241D] border-[#84CC16] text-lime-200'
                            : 'bg-[#14203D] border-slate-800 text-slate-400 opacity-75'
                        }`}
                      >
                        <div className="text-left">
                          <span className="font-black text-white block">{slot.day}</span>
                          <span className="text-[10px]">
                            {slot.time} ({slot.period})
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${
                            slot.isAvailable
                              ? 'bg-[#84CC16] text-slate-950'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {slot.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => commitProfileUpdate(true)}
                    className="w-full py-3 rounded-2xl bg-[#84CC16] hover:bg-[#A3E635] text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-[#84CC16]/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save &amp; Publish Marketplace Profile</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Progressive Tutor Security & Payout Verification Modal */}
      <TutorSecurityVerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        onSuccess={() => setIsVerificationModalOpen(false)}
      />
    </div>
  );
};
