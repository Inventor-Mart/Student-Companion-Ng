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
  Video
} from 'lucide-react';

import { ParentAddressVerificationModal } from '../auth/VerificationModals';
import { TutorMapLocator } from '../tutors/TutorMapLocator';
import { TutorProfileView } from './TutorProfileView';
import { NairaText, NairaSign } from '../../utils/currency';

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

      // Put the registered tutor first if not already present
      const withoutDup = VETTED_NIGERIAN_TUTORS.filter(t => t.id !== registeredTutorEntry.id);
      return [registeredTutorEntry, ...withoutDup];
    }
    return VETTED_NIGERIAN_TUTORS;
  }, [currentUserProfile]);

  const filteredTutors = allTutors.filter(t => {
    const matchesSubject = selectedSubject === 'All' || t.subjects.includes(selectedSubject);
    const matchesSearch =
      searchQuery.trim() === '' ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSubject && matchesSearch;
  });

  const handleConfirmBooking = () => {
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

  return (
    <div className="flex-1 w-full flex flex-col min-h-0 relative overflow-hidden">
      {selectedTutorForProfile ? (
        <TutorProfileView
          tutor={selectedTutorForProfile}
          onBack={() => setSelectedTutorForProfile(null)}
          onBookSession={(tutor, selectedSlot) => {
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
        <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-4 touch-pan-y text-slate-100">
          <div className="flex items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white tracking-tight">
              Vetted Tutoring Marketplace
            </h2>
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              NIN Verified
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Find verified educators with Google Maps discovery & distance calculation
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5 shrink-0">
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'map'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>Map</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List</span>
          </button>
        </div>
      </div>

      {/* Quick Interactive Whiteboard Classroom Launch Callout */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/70 border border-emerald-500/50 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <Video className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">Interactive Whiteboard & Audio Classroom</span>
              <span className="text-[9px] font-bold text-emerald-300 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-700 uppercase">
                Live Board
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Instant 1-on-1 digital canvas with WAEC/JAMB formula stampers, low-data audio & chat.
            </p>
          </div>
        </div>
        <button
          onClick={() => launchVirtualClassroom(`classroom-${Date.now()}`, 'student')}
          className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Video className="w-3.5 h-3.5" />
          <span>Launch Board</span>
        </button>
      </div>

      {/* Render Google Map or List */}
      {viewMode === 'map' ? (
        <TutorMapLocator
          tutors={filteredTutors}
          onSelectTutorForBooking={(tutor) => {
            setSelectedTutorForBooking(tutor);
            setBookingConfirmed(false);
          }}
          onOpenChat={(tutorId) => {
            setActiveTutorChatId(tutorId);
            setCurrentRole('tutor');
          }}
          onViewProfile={(tutor) => {
            setSelectedTutorForProfile(tutor);
          }}
        />
      ) : (
        <>
          {/* Search & Subject Filters */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by tutor name, subject, or location..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {subjects.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSubject(s)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedSubject === s
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Tutors List */}
          <div className="space-y-3">
        {filteredTutors.map(tutor => (
          <div
            key={tutor.id}
            className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
          >
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => setSelectedTutorForProfile(tutor)}
                className="cursor-pointer shrink-0 group focus:outline-none"
                title="View Full Profile"
              >
                <img
                  src={tutor.avatarUrl}
                  alt={tutor.name}
                  className="w-12 h-12 rounded-2xl bg-slate-800 object-cover ring-1 ring-slate-700 group-hover:ring-emerald-500/60 transition-all"
                />
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedTutorForProfile(tutor)}
                    className="text-left group cursor-pointer focus:outline-none"
                  >
                    <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                      {tutor.name}
                    </h3>
                  </button>
                  {tutor.isNinVerified && (
                    <span
                      className="text-emerald-400 bg-emerald-950/80 p-0.5 rounded-full border border-emerald-800"
                      title="NIN Verified Identity"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 truncate mt-0.5">{tutor.tagline}</p>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <span className="flex items-center gap-1 text-amber-400 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {tutor.rating}
                  </span>
                  <span>({tutor.reviewCount} reviews)</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {tutor.location}, {tutor.state}
                  </span>
                </div>
              </div>
            </div>

            {/* Subject Badges */}
            <div className="flex flex-wrap gap-1">
              {tutor.subjects.map((sub, sIdx) => (
                <span
                  key={sIdx}
                  className="text-[10px] font-semibold text-slate-300 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800"
                >
                  {sub}
                </span>
              ))}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
              {tutor.bio}
            </p>

            {/* Card Footer with Price & Actions */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Rate</span>
                <span className="text-xs font-bold text-white">
                  <NairaText amount={tutor.hourlyRateNaira} /> / hr
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTutorForProfile(tutor)}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                >
                  View Profile
                </button>

                <button
                  onClick={() => {
                    setActiveTutorChatId(tutor.id);
                    setCurrentRole('tutor');
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                  title="In-App Masked Chat"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    setSelectedTutorForBooking(tutor);
                    setBookingConfirmed(false);
                  }}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
                >
                  Book Session
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )}
        </div>
      )}

      {/* Booking Modal */}
      {selectedTutorForBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-xs font-bold text-white">Book Tutoring Session</h3>
              <button
                onClick={() => setSelectedTutorForBooking(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto space-y-4 touch-pan-y text-xs text-slate-200">
              {bookingConfirmed ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500 mx-auto flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {bookingType === 'physical'
                      ? 'Request Sent to Parent Dashboard!'
                      : 'Online Session Scheduled!'}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                    {bookingType === 'physical'
                      ? 'Because this is a physical home session, your parent must authorize the booking & escrow payment via their Parent PIN.'
                      : 'Your interactive digital classroom with live whiteboard, audio, and chat is ready.'}
                  </p>

                  <div className="pt-2 flex flex-col gap-2">
                    {bookingType === 'online' && confirmedBookingId && (
                      <button
                        onClick={() => {
                          setSelectedTutorForBooking(null);
                          launchVirtualClassroom(confirmedBookingId, 'student');
                        }}
                        className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Video className="w-4 h-4" />
                        <span>Launch Virtual Classroom Now</span>
                      </button>
                    )}
                    {bookingType === 'physical' && (
                      <button
                        onClick={() => {
                          setSelectedTutorForBooking(null);
                          setCurrentRole('parent');
                        }}
                        className="py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold transition-colors shadow-sm cursor-pointer"
                      >
                        Switch to Parent Portal to Authorize
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedTutorForBooking(null)}
                      className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
                    >
                      Back to Tutors
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Tutor Info Pill */}
                  <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    <img
                      src={selectedTutorForBooking.avatarUrl}
                      alt={selectedTutorForBooking.name}
                      className="w-10 h-10 rounded-xl object-cover bg-slate-800"
                    />
                    <div>
                      <h4 className="font-bold text-white text-xs">{selectedTutorForBooking.name}</h4>
                      <p className="text-[11px] text-slate-400">{selectedTutorForBooking.education}</p>
                      <span className="text-[11px] text-emerald-400 font-semibold">
                        <NairaText amount={selectedTutorForBooking.hourlyRateNaira} /> / hr
                      </span>
                    </div>
                  </div>

                  {/* Mode Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Session Format:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setBookingType('physical')}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          bookingType === 'physical'
                            ? 'bg-emerald-950/70 border-emerald-500 text-white'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="font-bold block text-xs">Home Tutoring</span>
                        <span className="text-[10px] text-slate-400">Physical verified visit</span>
                      </button>

                      <button
                        onClick={() => setBookingType('online')}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          bookingType === 'online'
                            ? 'bg-emerald-950/70 border-emerald-500 text-white'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="font-bold block text-xs">Online Live</span>
                        <span className="text-[10px] text-slate-400">In-app interactive video</span>
                      </button>
                    </div>
                  </div>

                  {/* Safety Alert for Physical */}
                  {bookingType === 'physical' && (
                    <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-3 space-y-2 text-xs text-amber-200">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>
                          <strong>Safety Guarantee:</strong> Physical visits require Parent PIN approval & verified home address for teacher safety.
                        </span>
                      </div>
                      {verifiedAddress ? (
                        <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-between text-[11px] text-emerald-300">
                          <div>
                            <span className="font-bold block">✓ Verified Home Address:</span>
                            <span>{verifiedAddress.street}, {verifiedAddress.lga} ({verifiedAddress.landmark})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsAddressModalOpen(true)}
                            className="text-[10px] text-emerald-400 underline font-semibold ml-2 cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsAddressModalOpen(true)}
                          className="w-full py-1.5 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Enter Home Address for Lesson</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* Date & Time */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Select Date & Time:
                    </label>
                    <select
                      value={selectedDate}
                      onChange={e => setSelectedDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option>Saturday, Nov 1st (10:00 AM - 12:00 PM)</option>
                      <option>Sunday, Nov 2nd (02:00 PM - 04:00 PM)</option>
                      <option>Tuesday, Nov 4th (04:30 PM - 06:30 PM)</option>
                    </select>
                  </div>

                  {/* Topic Focus */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Topic or Goal:
                    </label>
                    <input
                      type="text"
                      value={topicFocus}
                      onChange={e => setTopicFocus(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Cost Summary */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Estimated Total (2 hrs):</span>
                    <span className="font-bold text-emerald-400 text-sm">
                      <NairaText amount={selectedTutorForBooking.hourlyRateNaira * 2} />
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedTutorForBooking(null)}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmBooking}
                      className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors shadow-sm"
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
