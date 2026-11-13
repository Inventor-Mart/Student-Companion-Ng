import React, { useState } from 'react';
import { Tutor, TimetableSlot } from '../../types';
import { useApp } from '../../context/AppContext';
import { NairaText, NairaSign } from '../../utils/currency';
import { PersonaAvatar } from '../common/PersonaAvatar';
import {
  ArrowLeft,
  ShieldCheck,
  Star,
  MapPin,
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  Clock,
  Video,
  MessageSquare,
  Share2,
  CheckCircle2,
  Check,
  Sparkles,
  Users,
  Compass
} from 'lucide-react';

interface TutorProfileViewProps {
  tutor: Tutor;
  onBack: () => void;
  onBookSession: (tutor: Tutor, selectedSlot?: TimetableSlot) => void;
}

export const TutorProfileView: React.FC<TutorProfileViewProps> = ({
  tutor,
  onBack,
  onBookSession
}) => {
  const { setActiveTutorChatId, setCurrentRole } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'timetable' | 'curriculum' | 'reviews'>('overview');
  const [selectedDayFilter, setSelectedDayFilter] = useState<string>('All');
  const [selectedSlot, setSelectedSlot] = useState<TimetableSlot | null>(
    tutor.timetable?.find(s => s.isAvailable) || null
  );
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Group timetable slots
  const allDays = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timetableSlots = tutor.timetable || [];
  const filteredSlots = selectedDayFilter === 'All'
    ? timetableSlots
    : timetableSlots.filter(s => s.day.toLowerCase() === selectedDayFilter.toLowerCase());

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleOpenChat = () => {
    setActiveTutorChatId(tutor.id);
    setCurrentRole('tutor');
  };

  return (
    <div className="flex-1 w-full overflow-y-auto bg-slate-950 text-slate-100 pb-28">
      {/* Top Sticky Navigation */}
      <div className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
            title="Back to Tutors List"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-sm font-bold text-white leading-tight truncate max-w-[200px] sm:max-w-md">
              {tutor.name}
            </h1>
            <p className="text-[11px] text-slate-400">Vetted Nigerian Educator Profile</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
            title="Share Profile"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] text-emerald-400 font-semibold hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span className="text-[10px] hidden sm:inline">Share</span>
              </>
            )}
          </button>

          <button
            onClick={handleOpenChat}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800 hover:border-emerald-600/40 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            title="Message Tutor"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="text-[10px] hidden sm:inline">In-App Chat</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-5 space-y-6">
        {/* Hero Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="relative shrink-0">
              <PersonaAvatar
                name={tutor.name}
                src={tutor.avatarUrl}
                alt={tutor.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl ring-2 ring-emerald-500/40 shadow-lg"
                textClassName="text-xl sm:text-2xl"
              />
              {tutor.isNinVerified && (
                <div
                  className="absolute -bottom-1.5 -right-1.5 bg-emerald-950 text-emerald-400 p-1 rounded-full border border-emerald-500 shadow-sm"
                  title="National Identity Verified (NIN)"
                >
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {tutor.name}
                </h2>
                {tutor.isNinVerified && (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-700/60 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>NIN Verified Identity</span>
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-snug">
                {tutor.tagline}
              </p>

              {/* Unboxed Metadata Line (Zero-Pill Compliance) */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1 font-semibold text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {tutor.rating}
                </span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{tutor.reviewCount} student reviews</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {tutor.location}, {tutor.state}
                </span>
                {tutor.experienceYears && (
                  <>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>{tutor.experienceYears} Years Teaching</span>
                  </>
                )}
              </div>

              {/* Delivery Stats Line */}
              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                <div>
                  <span className="text-slate-400">Total Lessons: </span>
                  <strong className="text-white font-mono">{tutor.totalLessonsDelivered || '200+'}</strong>
                </div>
                <span aria-hidden="true" className="text-slate-700">|</span>
                <div>
                  <span className="text-slate-400">Completion Rate: </span>
                  <strong className="text-emerald-400 font-mono">{tutor.completionRate || 99}%</strong>
                </div>
                <span aria-hidden="true" className="text-slate-700">|</span>
                <div>
                  <span className="text-slate-400">Classroom Rate: </span>
                  <strong className="text-white font-bold">
                    <NairaText amount={tutor.hourlyRateNaira} /> / hr
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Subjects Handled */}
          <div className="pt-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Core Teaching Subjects:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {tutor.subjects.map((sub, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold text-slate-200 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* Bio Paragraph */}
          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            {tutor.bio}
          </p>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-2xl border border-slate-800 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 min-w-[100px] py-2 px-3 text-xs font-semibold rounded-xl transition-all cursor-pointer text-center ${
              activeTab === 'overview'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Credentials & Honors
          </button>
          <button
            onClick={() => setActiveTab('timetable')}
            className={`flex-1 min-w-[120px] py-2 px-3 text-xs font-semibold rounded-xl transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'timetable'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Virtual Timetable</span>
          </button>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`flex-1 min-w-[110px] py-2 px-3 text-xs font-semibold rounded-xl transition-all cursor-pointer text-center ${
              activeTab === 'curriculum'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Exam Tracks
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 min-w-[90px] py-2 px-3 text-xs font-semibold rounded-xl transition-all cursor-pointer text-center ${
              activeTab === 'reviews'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Student Reviews
          </button>
        </div>

        {/* Tab 1: Credentials & Academic Honors */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* University Degrees & Honors */}
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Nigerian University Degree Honors & Alma Mater
                </h3>
              </div>

              <div className="space-y-2.5">
                {(tutor.degrees && tutor.degrees.length > 0) ? (
                  tutor.degrees.map((deg, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 flex items-start gap-3"
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                        <Award className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white leading-snug">{deg}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Verified Official University Transcript & Academic Standing
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90">
                    <p className="text-xs text-white font-medium">{tutor.education}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Professional Certifications & Government Identity */}
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Verified Identity & Professional Certifications
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {tutor.certifications ? (
                  tutor.certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-slate-200 block">{cert}</span>
                        <span className="text-[10px] text-emerald-400">Authenticated via Secure Escrow Vault</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200">National Identification Number (NIN) Verified</span>
                  </div>
                )}
              </div>
            </div>

            {/* Virtual Classroom Teaching Format Callout */}
            <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/50 border border-emerald-500/40 rounded-2xl p-4 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Video className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white">In-App Digital Whiteboard Ready</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every 1-on-1 online session with {tutor.name} takes place directly inside our low-bandwidth interactive whiteboard environment with masked live audio, math formula stampers, and real-time step-by-step problem breakdown. No Zoom or external links needed.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Weekly Timetable Grid */}
        {activeTab === 'timetable' && (
          <div className="space-y-4">
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>Weekly Virtual Classroom Schedule</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Select an open slot to schedule your in-app 1-on-1 whiteboard lesson
                  </p>
                </div>

                {/* Day Filter Segmented Controls */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
                  {allDays.map(d => (
                    <button
                      key={d}
                      onClick={() => setSelectedDayFilter(d)}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                        selectedDayFilter === d
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timetable Slots Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                {filteredSlots.map(slot => {
                  const isSelected = selectedSlot?.id === slot.id;
                  return (
                    <button
                      key={slot.id}
                      disabled={!slot.isAvailable}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between min-h-[92px] ${
                        !slot.isAvailable
                          ? 'bg-slate-950/40 border-slate-800/60 opacity-50 cursor-not-allowed'
                          : isSelected
                          ? 'bg-emerald-950/80 border-emerald-500 shadow-md ring-2 ring-emerald-500/50 cursor-pointer'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold text-white">{slot.day}</span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            slot.isAvailable
                              ? isSelected
                                ? 'bg-emerald-500 text-white'
                                : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-slate-900 text-slate-400'
                          }`}
                        >
                          {slot.period}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium mt-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{slot.time}</span>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between mt-2">
                        <span className="text-[10px] text-slate-400">
                          {slot.isAvailable ? (isSelected ? '✓ Selected' : 'Tap to Select') : 'Booked'}
                        </span>
                        {slot.isAvailable && (
                          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                            <Video className="w-3 h-3" />
                            <span>Virtual Live</span>
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {filteredSlots.length === 0 && (
                <div className="text-center py-6 text-slate-400 text-xs">
                  No slots currently listed for {selectedDayFilter}. Please select another day.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Exam Specializations & Curriculum */}
        {activeTab === 'curriculum' && (
          <div className="space-y-4">
            {/* Exam Specializations */}
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Target Examination Tracks & Drills
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(tutor.examSpecializations && tutor.examSpecializations.length > 0) ? (
                  tutor.examSpecializations.map((spec, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-200 font-medium leading-snug">{spec}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-xs text-slate-300">WAEC & JAMB UTME Comprehensive Preparation</span>
                  </div>
                )}
              </div>
            </div>

            {/* Curriculum Highlights */}
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  High-Yield Curriculum Modules Covered
                </h3>
              </div>

              <div className="space-y-2">
                {(tutor.curriculumHighlights && tutor.curriculumHighlights.length > 0) ? (
                  tutor.curriculumHighlights.map((mod, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/90 flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-200 font-medium">{mod}</span>
                      <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                        Whiteboard Interactive
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-xs text-slate-300">Full Nigerian Secondary Curriculum Topics</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Student Reviews & Testimonials */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Verified Nigerian Student Testimonials
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{tutor.rating} / 5.0</span>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                {(tutor.testimonials && tutor.testimonials.length > 0) ? (
                  tutor.testimonials.map(t => (
                    <div
                      key={t.id}
                      className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{t.studentName}</span>
                            <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800 font-semibold">
                              {t.gradeOutcome}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400">{t.school}</p>
                        </div>
                        <span className="text-[10px] text-slate-400">{t.date}</span>
                      </div>
                      <p className="text-xs text-slate-300 italic leading-relaxed">
                        "{t.comment}"
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-slate-400 text-xs">
                    No individual reviews to display yet. Total rating: {tutor.rating} ({tutor.reviewCount} completed sessions).
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Booking Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-3 sm:p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Classroom Fee:</span>
              <span className="text-sm sm:text-base font-bold text-white">
                <NairaText amount={tutor.hourlyRateNaira} /> / hr
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-xs">
              {selectedSlot ? (
                <span className="text-emerald-400 font-semibold">
                  Selected: {selectedSlot.day} ({selectedSlot.time})
                </span>
              ) : (
                <span>2-Hour Virtual Whiteboard Session</span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onBookSession(tutor, selectedSlot || undefined)}
              className="py-2.5 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Video className="w-4 h-4" />
              <span>Book Virtual Classroom</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
