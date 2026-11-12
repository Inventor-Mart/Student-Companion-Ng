import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VETTED_NIGERIAN_TUTORS } from '../../data/tutorsData';
import { Tutor, BookingType, TimetableSlot } from '../../types';
import {
  Search,
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  MessageSquare,
  Clock,
  ArrowRight,
  X,
  CheckCircle2,
  AlertTriangle,
  Map as MapIcon,
  List,
  Video,
  Radio,
  Sparkles
} from 'lucide-react';

import { ParentAddressVerificationModal } from '../auth/VerificationModals';
import { TutorMapLocator } from '../tutors/TutorMapLocator';
import { TutorProfileView } from './TutorProfileView';
import { NairaText, NairaSign } from '../../utils/currency';
import { playSound } from '../../utils/audioSynthesis';
import { motion } from 'motion/react';

export const TutorDiscovery: React.FC = () => {
  const {
    createTutorBooking,
    setActiveTutorChatId,
    setCurrentRole,
    student,
    verifiedAddress,
    launchVirtualClassroom,
    currentUserProfile
  } = useApp();

  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedTutorForBooking, setSelectedTutorForBooking] = useState<Tutor | null>(null);
  const [selectedTutorForProfile, setSelectedTutorForProfile] = useState<Tutor | null>(null);

  // Booking Form State
  const [bookingType, setBookingType] = useState<BookingType>('physical');
  const [selectedDate, setSelectedDate] = useState<string>('Upcoming Saturday (10:00 AM - 12:00 PM)');
  const [topicFocus, setTopicFocus] = useState<string>('WAEC & JAMB Problem Solving Drill');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>('');

  const subjects = ['All', 'Mathematics', 'Physics', 'Biology', 'Chemistry', 'Economics', 'English Language', 'Further Mathematics'];

  // Combine default verified tutors with registered user profile if role is tutor
  const allTutors: Tutor[] = React.useMemo(() => {
    if (currentUserProfile?.role === 'tutor' && currentUserProfile.tutorData) {
      const td = currentUserProfile.tutorData;
      const registeredTutorEntry: Tutor = {
        id: currentUserProfile.id,
        name: currentUserProfile.fullName,
        tagline: td.tagline || `${td.subjectSpecialization} Specialist`,
        subjects: td.proficientSubjects && td.proficientSubjects.length > 0 ? td.proficientSubjects : [td.subjectSpecialization],
        rating: 5.0,
        reviewCount: 1,
        hourlyRateNaira: td.hourlyRate || 3500,
        location: `${td.city || 'Ikeja'}, ${td.state || 'Lagos'}`,
        state: td.state || 'Lagos',
        isNinVerified: Boolean(td.nin || td.verification?.isVerified),
        education: td.qualification || `${td.highestEducation || 'B.Sc.'} (${td.institution || 'Unilag'})`,
        avatarUrl: currentUserProfile.avatarUrl || 'https://api.dicebear.com/7.x/micah/svg?seed=Educator&backgroundColor=b6e3f4',
        bio: td.bio || 'Verified Nigerian educator dedicated to secondary school excellence.',
        availableDays: ['Mondays', 'Wednesdays', 'Saturdays'],
        lat: 6.6018,
        lng: 3.3515,
        experienceYears: td.experienceYearsRange === '5+ years' ? 6 : td.experienceYearsRange === '3-5 years' ? 4 : 2,
        degrees: td.degrees || [`${td.highestEducation || 'B.Sc.'} in ${td.courseOfStudy || 'Education'}`],
        certifications: td.certifications || ['TRCN Certified Secondary Educator'],
        examSpecializations: td.examSpecializations || ['WAEC Prep', 'JAMB Prep'],
        curriculumHighlights: td.curriculumHighlights || ['Interactive Whiteboard Drills'],
        totalLessonsDelivered: 12,
        completionRate: 100,
        timetable: td.timetable || []
      };
      const withoutDup = VETTED_NIGERIAN_TUTORS.filter(t => t.id !== registeredTutorEntry.id);
      return [registeredTutorEntry, ...withoutDup];
    }
    return VETTED_NIGERIAN_TUTORS;
  }, [currentUserProfile]);

  const filteredTutors = allTutors.filter(tutor => {
    const matchesSearch =
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSubject = selectedSubject === 'All' || tutor.subjects.includes(selectedSubject);

    return matchesSearch && matchesSubject;
  });

  const handleConfirmBooking = () => {
    playSound.tileTap();
    if (!selectedTutorForBooking) return;

    if (bookingType === 'physical' && !verifiedAddress) {
      setIsAddressModalOpen(true);
      return;
    }

    const newBooking = createTutorBooking({
      tutorId: selectedTutorForBooking.id,
      tutorName: selectedTutorForBooking.name,
      tutorPhoto: selectedTutorForBooking.avatarUrl,
      studentId: student.id,
      studentName: student.name,
      subject: selectedTutorForBooking.subjects[0],
      topic: topicFocus,
      bookingType,
      date: selectedDate,
      timeSlot: '2 Hours Intensive',
      amountNaira: selectedTutorForBooking.hourlyRateNaira * 2
    });

    if (newBooking?.id) {
      setConfirmedBookingId(newBooking.id);
    }
    setBookingConfirmed(true);
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
            if (selectedSlot) {
              setSelectedDate(`${selectedSlot.day} (${selectedSlot.time})`);
              setTopicFocus(`${tutor.subjects[0]} 1-on-1 Virtual Whiteboard Intensive`);
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
              INTERACTIVE WHITEBOARD HERO CALLOUT (Electric Orange & Lime Gradient)
             ========================================================================= */}
          <div className="bg-gradient-to-r from-[#FF5B00] via-[#E04800] to-[#1E1238] border-2 border-white/20 rounded-3xl p-4 flex items-center justify-between gap-3 shadow-[0_8px_25px_rgba(255,91,0,0.3)] select-none">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white text-[#FF5B00] flex items-center justify-center shrink-0 shadow-lg">
                <Video className="w-5 h-5 fill-[#FF5B00]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-white tracking-tight">Interactive Whiteboard & Audio Classroom</span>
                  <span className="text-[9px] font-extrabold text-slate-950 bg-[#84CC16] px-2 py-0.5 rounded-full uppercase shadow-xs">
                    Live Board
                  </span>
                </div>
                <p className="text-xs text-white/90 mt-0.5">
                  Instant 1-on-1 digital canvas with WAEC/JAMB formula stampers & audio.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                playSound.tileTap();
                launchVirtualClassroom(`classroom-${Date.now()}`, 'student');
              }}
              className="px-4 py-2 bg-white hover:bg-slate-100 text-[#FF5B00] font-black text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse text-[#FF5B00]" />
              <span>Launch Board</span>
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
                        <img
                          src={tutor.avatarUrl}
                          alt={tutor.name}
                          className="w-13 h-13 rounded-2xl bg-[#101C34] object-cover ring-2 ring-[#84CC16]/50 group-hover:ring-[#84CC16] transition-all shadow-md"
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
                    {bookingType === 'physical'
                      ? 'Request Sent to Parent Portal!'
                      : 'Live Online Classroom Scheduled!'}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                    {bookingType === 'physical'
                      ? 'Because this is a home session, your parent must authorize the booking & escrow payment via their Parent PIN.'
                      : 'Your interactive digital classroom with live whiteboard, audio, and chat is ready.'}
                  </p>

                  <div className="pt-2 flex flex-col gap-2">
                    {bookingType === 'online' && confirmedBookingId && (
                      <button
                        onClick={() => {
                          playSound.tileTap();
                          setSelectedTutorForBooking(null);
                          launchVirtualClassroom(confirmedBookingId, 'student');
                        }}
                        className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FF5B00] to-[#FF7A18] text-white font-black transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                      >
                        <Video className="w-4 h-4" />
                        <span>Launch Virtual Classroom Now</span>
                      </button>
                    )}
                    {bookingType === 'physical' && (
                      <button
                        onClick={() => {
                          playSound.tileTap();
                          setSelectedTutorForBooking(null);
                          setCurrentRole('parent');
                        }}
                        className="py-2.5 px-4 rounded-xl bg-[#84CC16] text-slate-950 font-black transition-all shadow-md cursor-pointer active:scale-95"
                      >
                        Switch to Parent Portal to Authorize
                      </button>
                    )}
                    <button
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
                    <img
                      src={selectedTutorForBooking.avatarUrl}
                      alt={selectedTutorForBooking.name}
                      className="w-11 h-11 rounded-xl object-cover bg-slate-800 ring-2 ring-[#84CC16]"
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
                      Select Date & Time:
                    </label>
                    <select
                      value={selectedDate}
                      onChange={e => setSelectedDate(e.target.value)}
                      className="w-full bg-[#14203D] border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#84CC16]"
                    >
                      <option>Saturday, Nov 1st (10:00 AM - 12:00 PM)</option>
                      <option>Sunday, Nov 2nd (02:00 PM - 04:00 PM)</option>
                      <option>Tuesday, Nov 4th (04:30 PM - 06:30 PM)</option>
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

                  {/* Cost Summary */}
                  <div className="bg-[#0D1527] p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Estimated Total (2 hrs):</span>
                    <span className="font-extrabold text-[#84CC16] text-sm font-mono">
                      <NairaText amount={selectedTutorForBooking.hourlyRateNaira * 2} />
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => {
                        playSound.tileTap();
                        setSelectedTutorForBooking(null);
                      }}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#14203D] hover:bg-slate-800 text-slate-300 font-bold transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmBooking}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#FF5B00] to-[#FF7A18] hover:from-[#E04800] hover:to-[#FF5B00] text-white font-black transition-all shadow-md cursor-pointer active:scale-95"
                    >
                      Submit Booking
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
