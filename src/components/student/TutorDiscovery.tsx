import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VETTED_NIGERIAN_TUTORS } from '../../data/tutorsData';
import { Tutor, BookingType } from '../../types';
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
  AlertTriangle
} from 'lucide-react';

export const TutorDiscovery: React.FC = () => {
  const {
    createTutorBooking,
    setActiveTutorChatId,
    setCurrentRole,
    student
  } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedTutorForBooking, setSelectedTutorForBooking] = useState<Tutor | null>(null);

  // Booking Form State
  const [bookingType, setBookingType] = useState<BookingType>('physical');
  const [selectedDate, setSelectedDate] = useState<string>('Upcoming Saturday (10:00 AM - 12:00 PM)');
  const [topicFocus, setTopicFocus] = useState<string>('WAEC & JAMB Problem Solving Drill');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  const subjects = ['All', 'Mathematics', 'Physics', 'Biology', 'Chemistry', 'Economics', 'English Language'];

  const filteredTutors = VETTED_NIGERIAN_TUTORS.filter(t => {
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

    createTutorBooking({
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

    setBookingConfirmed(true);
  };

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-4 touch-pan-y text-slate-100">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white tracking-tight">
            Vetted Tutoring Marketplace
          </h2>
          <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            NIN Verified
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Find verified educators for online video sessions or physical home tutoring
        </p>
      </div>

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
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors ${
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
              <img
                src={tutor.avatarUrl}
                alt={tutor.name}
                className="w-12 h-12 rounded-2xl bg-slate-800 object-cover ring-1 ring-slate-700 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white truncate">{tutor.name}</h3>
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
                <span className="text-xs font-bold text-white font-mono">
                  ₦{tutor.hourlyRateNaira.toLocaleString()} / hr
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveTutorChatId(tutor.id);
                    setCurrentRole('tutor');
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                  title="In-App Masked Chat"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    setSelectedTutorForBooking(tutor);
                    setBookingConfirmed(false);
                  }}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                >
                  Book Session
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
                      : 'Your online session link will be accessible on your dashboard 15 minutes before start.'}
                  </p>

                  <div className="pt-2 flex flex-col gap-2">
                    {bookingType === 'physical' && (
                      <button
                        onClick={() => {
                          setSelectedTutorForBooking(null);
                          setCurrentRole('parent');
                        }}
                        className="py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold transition-colors shadow-sm"
                      >
                        Switch to Parent Portal to Authorize
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedTutorForBooking(null)}
                      className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
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
                      <span className="text-[11px] font-mono text-emerald-400">
                        ₦{selectedTutorForBooking.hourlyRateNaira.toLocaleString()} / hr
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
                    <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-3 flex items-start gap-2 text-xs text-amber-200">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Safety Guarantee:</strong> Physical visits require Parent PIN approval & payment escrow before confirmation. Phone numbers remain masked for privacy.
                      </span>
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
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      ₦{(selectedTutorForBooking.hourlyRateNaira * 2).toLocaleString()}
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
    </div>
  );
};
