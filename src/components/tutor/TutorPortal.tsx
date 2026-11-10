import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Calendar,
  Wallet,
  ShieldCheck,
  MessageSquare,
  Send,
  Building,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowUpRight,
  AlertCircle,
  Video,
  UserCog,
  GraduationCap,
  Award,
  BookOpen,
  Save,
  Plus,
  Trash2,
  Check
} from 'lucide-react';

import { TutorSecurityVerificationModal } from '../auth/VerificationModals';
import { NairaText, NairaSign, formatNaira } from '../../utils/currency';
import { DeviceImageUploader } from '../admin/DeviceImageUploader';
import { TimetableSlot } from '../../types';

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
    updateTutorProfile
  } = useApp();

  const tutorName = currentUserProfile?.fullName || 'Registered Educator';
  const tutorData = currentUserProfile?.tutorData;
  const tutorSpecialization = tutorData?.subjectSpecialization || 'Secondary School Educator';
  const tutorQualification = tutorData?.qualification || 'Verified Educator';
  const tutorHourlyRate = tutorData?.hourlyRate || 3500;
  const tutorId = currentUserProfile?.id || 'tutor-current-user';
  const isVerified = Boolean(tutorVerification?.isVerified || tutorData?.verification?.isVerified);

  const [chatInput, setChatInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'sessions' | 'profile' | 'earnings' | 'chat'>('sessions');
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [payoutStatusMessage, setPayoutStatusMessage] = useState<string>('');
  const [profileSaveSuccess, setProfileSaveSuccess] = useState<boolean>(false);

  // Editable Profile States (Matching Sample Vetted Tutors)
  const [editTagline, setEditTagline] = useState<string>(
    tutorData?.tagline || `${tutorSpecialization} (10+ Yrs Prep Specialist)`
  );
  const [editBio, setEditBio] = useState<string>(
    tutorData?.bio || 'Former Olympiad coach preparing secondary school candidates for Distinction grades in WAEC and 300+ in JAMB UTME. Patient, step-by-step problem solver specializing in interactive digital whiteboard drills.'
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

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
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
    setProfileSaveSuccess(true);
    setTimeout(() => setProfileSaveSuccess(false), 3000);
  };

  const toggleSlotAvailability = (slotId: string) => {
    setEditTimetable(prev =>
      prev.map(slot => (slot.id === slotId ? { ...slot, isAvailable: !slot.isAvailable } : slot))
    );
  };

  // Filter bookings strictly for this registered tutor
  const myBookings = tutorBookings.filter(b => b.tutorId === tutorId);
  const currentChatId = activeTutorChatId || tutorId;
  const currentMessages = chatMessages[currentChatId] || [];

  // Calculate real earnings from real bookings
  const availablePayout = myBookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + b.amountNaira, 0);

  const heldInEscrow = myBookings
    .filter(b => b.status === 'confirmed' || b.status === 'pending_parent')
    .reduce((sum, b) => sum + b.amountNaira, 0);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    sendChatMessage(currentChatId, chatInput.trim(), 'tutor');
    setChatInput('');
  };

  const handleRequestPayout = () => {
    if (!tutorVerification) {
      setIsVerificationModalOpen(true);
      return;
    }
    if (availablePayout <= 0) {
      setPayoutStatusMessage('No completed sessions available for payout yet.');
      setTimeout(() => setPayoutStatusMessage(''), 3000);
      return;
    }
    setPayoutStatusMessage(
      `Payout of ${formatNaira(availablePayout)} initiated to ${tutorVerification.bankName} (${tutorVerification.accountNumber}). Processing within 15 minutes.`
    );
    setTimeout(() => setPayoutStatusMessage(''), 5000);
  };

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-4 touch-pan-y text-slate-100">
      {/* Tutor Profile Header */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {currentUserProfile?.avatarUrl ? (
              <img
                src={currentUserProfile.avatarUrl}
                alt={tutorName}
                className="w-12 h-12 rounded-2xl object-cover bg-slate-800 ring-2 ring-emerald-500/50"
              />
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 flex items-center justify-center text-white font-black text-sm ring-2 ring-emerald-500/50 shadow-inner">
                {tutorName
                  .trim()
                  .split(/\s+/)
                  .map(n => n[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join('')
                  .toUpperCase() || 'ED'}
              </div>
            )}
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-white leading-tight">{tutorName}</h2>
                {isVerified ? (
                  <span className="text-emerald-400 bg-emerald-950 p-0.5 rounded border border-emerald-800" title="NIN Verified Educator">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                ) : (
                  <button
                    onClick={() => setIsVerificationModalOpen(true)}
                    className="text-[10px] text-amber-400 bg-amber-950/70 px-1.5 py-0.2 rounded border border-amber-800 font-semibold cursor-pointer"
                  >
                    Verify NIN
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{tutorSpecialization}</p>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {tutorQualification} · Registered Educator
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">Hourly Rate</span>
            <span className="text-xs font-bold text-emerald-400">
              <NairaText amount={tutorHourlyRate} />
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          {[
            { id: 'sessions', label: 'My Sessions', icon: Calendar },
            { id: 'profile', label: 'Marketplace Profile', icon: UserCog },
            { id: 'earnings', label: 'Earnings & Payout', icon: Wallet },
            { id: 'chat', label: 'Masked Chat', icon: MessageSquare }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Sessions */}
      {activeTab === 'sessions' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Student Booking Requests
            </h3>
            <span className="text-[11px] text-slate-500">{myBookings.length} Active</span>
          </div>

          {myBookings.length === 0 ? (
            <div className="bg-slate-900/60 rounded-2xl p-8 text-center border border-slate-800 space-y-2">
              <Calendar className="w-9 h-9 text-slate-600 mx-auto" />
              <span className="text-xs text-slate-300 font-semibold block">No session requests yet</span>
              <p className="text-[11px] text-slate-500 max-w-xs mx-auto leading-relaxed">
                When students or parents in your area book online or physical home tutoring sessions with you, they will appear here.
              </p>
            </div>
          ) : (
            myBookings.map(b => (
              <div
                key={b.id}
                className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{b.studentName}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.2 rounded border ${
                          b.status === 'confirmed'
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                            : b.status === 'pending_parent'
                            ? 'bg-amber-950 text-amber-400 border-amber-800'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {b.status === 'confirmed'
                          ? 'Confirmed & Escrow Funded'
                          : b.status === 'pending_parent'
                          ? 'Awaiting Parent PIN Approval'
                          : 'Completed'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{b.subject} · {b.topic}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400">
                      <NairaText amount={b.amountNaira} />
                    </span>
                    <span className="text-[10px] text-slate-500 block uppercase">{b.bookingType}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {b.date} ({b.timeSlot})
                  </span>
                  <div className="flex items-center gap-2">
                    {b.status === 'confirmed' && b.bookingType === 'online' && (
                      <button
                        onClick={() => launchVirtualClassroom(b.id, 'tutor')}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-colors cursor-pointer shadow-sm"
                      >
                        <Video className="w-3 h-3" />
                        <span>Launch Virtual Classroom</span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setActiveTutorChatId(b.studentId);
                        setActiveTab('chat');
                      }}
                      className="text-emerald-400 hover:underline font-semibold"
                    >
                      Open Masked Chat
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Marketplace Profile & Sample Fields Editor */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <UserCog className="w-4 h-4 text-sky-400" />
                  <span>Public Marketplace Profile</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Customize the attributes that students and parents see on your public profile.
                </p>
              </div>

              {profileSaveSuccess && (
                <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1 animate-in fade-in">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Saved!</span>
                </span>
              )}
            </div>

            {/* Tagline & Hourly Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Profile Tagline (Displays under your name)
                </label>
                <input
                  type="text"
                  value={editTagline}
                  onChange={e => setEditTagline(e.target.value)}
                  placeholder="e.g. WAEC & JAMB Mathematics/Physics Specialist (10+ Yrs)"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-sky-400 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Hourly Rate (<NairaSign />)
                </label>
                <input
                  type="number"
                  value={editHourlyRate}
                  onChange={e => setEditHourlyRate(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-sky-400 rounded-xl py-2 px-3 text-xs text-white font-mono focus:outline-none"
                />
              </div>
            </div>

            {/* Bio / Introduction */}
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Detailed Biography & Methodology
              </label>
              <textarea
                rows={3}
                value={editBio}
                onChange={e => setEditBio(e.target.value)}
                placeholder="Share your pedagogy, past results, university background, and coaching style..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-sky-400 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            {/* Teaching Mode */}
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Lesson Mode Offered
              </label>
              <div className="flex gap-2">
                {[
                  { id: 'both', label: 'Online & In-Person' },
                  { id: 'online', label: 'Online Only' },
                  { id: 'physical', label: 'In-Person Only' }
                ].map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setEditTeachingMode(m.id as any)}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      editTeachingMode === m.id
                        ? 'bg-sky-500 text-slate-950 font-bold'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Degrees & Certifications Section (Matching Sample Vetted Tutors) */}
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3.5">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>Degrees, Academic Honors & Certifications</span>
            </h4>

            {/* Degrees List */}
            <div className="space-y-2">
              <label className="text-[11px] text-slate-400 block">Degrees & Diplomas</label>
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
                    className="flex-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl py-1.5 px-3 text-xs text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setEditDegrees(editDegrees.filter((_, i) => i !== idx))}
                    className="p-1.5 text-slate-500 hover:text-red-400 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setEditDegrees([...editDegrees, 'B.Sc. Education (University of Lagos)'])}
                className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add Another Degree</span>
              </button>
            </div>

            {/* Certifications List */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-[11px] text-slate-400 block">Professional Licenses & Certifications</label>
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
                    className="flex-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl py-1.5 px-3 text-xs text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setEditCertifications(editCertifications.filter((_, i) => i !== idx))}
                    className="p-1.5 text-slate-500 hover:text-red-400 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setEditCertifications([...editCertifications, 'TRCN Certified Secondary Educator'])}
                className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add Certification</span>
              </button>
            </div>
          </div>

          {/* Exam Specializations & Curriculum Highlights */}
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3.5">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Exam Specializations & Core Curriculum Highlights</span>
            </h4>

            {/* Exam Specializations */}
            <div className="space-y-2">
              <label className="text-[11px] text-slate-400 block">Exam Specializations</label>
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
                    className="flex-1 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl py-1.5 px-3 text-xs text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setEditExamSpecs(editExamSpecs.filter((_, i) => i !== idx))}
                    className="p-1.5 text-slate-500 hover:text-red-400 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setEditExamSpecs([...editExamSpecs, 'WAEC Mathematics Prep (Target: A1)'])}
                className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add Exam Specialization</span>
              </button>
            </div>

            {/* Curriculum Highlights */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-[11px] text-slate-400 block">Curriculum Highlights</label>
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
                    className="flex-1 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl py-1.5 px-3 text-xs text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setEditHighlights(editHighlights.filter((_, i) => i !== idx))}
                    className="p-1.5 text-slate-500 hover:text-red-400 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setEditHighlights([...editHighlights, 'Trigonometric Identities & 3D Bearing'])}
                className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add Curriculum Highlight</span>
              </button>
            </div>
          </div>

          {/* Interactive Weekly Timetable Slots */}
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400" />
                <span>Weekly Timetable Availability</span>
              </h4>
              <span className="text-[10px] text-slate-400">Click slot to toggle availability</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {editTimetable.map(slot => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => toggleSlotAvailability(slot.id)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all cursor-pointer ${
                    slot.isAvailable
                      ? 'bg-emerald-950/40 border-emerald-500/70 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-500 opacity-60'
                  }`}
                >
                  <div className="text-left">
                    <span className="font-bold text-white block">{slot.day}</span>
                    <span className="text-[10px]">{slot.time} ({slot.period})</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    slot.isAvailable
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {slot.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Save Profile Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-sky-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save & Publish Marketplace Profile</span>
          </button>
        </form>
      )}

      {/* Tab 3: Earnings & Payout */}
      {activeTab === 'earnings' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 block">Available for Payout</span>
              <div className="text-xl font-bold text-emerald-400">
                <NairaText amount={availablePayout} />
              </div>
              <span className="text-[10px] text-slate-500 block">
                {availablePayout > 0 ? 'Ready to withdraw' : 'Completed sessions payout'}
              </span>
            </div>

            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 block">Held in Escrow</span>
              <div className="text-xl font-bold text-amber-400">
                <NairaText amount={heldInEscrow} />
              </div>
              <span className="text-[10px] text-slate-500 block">
                {myBookings.filter(b => b.status === 'confirmed').length} active session(s)
              </span>
            </div>
          </div>

          {/* Nigerian Payout Bank Account */}
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-400" />
                <span>Nigerian Payout Bank Account</span>
              </h4>
              <button
                type="button"
                onClick={() => setIsVerificationModalOpen(true)}
                className="text-[10px] text-emerald-400 hover:underline font-semibold cursor-pointer"
              >
                {tutorVerification ? 'Edit Details' : 'Verify Details'}
              </button>
            </div>

            {tutorVerification ? (
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>NIN Identity:</span>
                  <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1">
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
                  <span className="text-emerald-400 font-semibold">{tutorVerification.accountName}</span>
                </div>
              </div>
            ) : (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-2">
                <AlertCircle className="w-6 h-6 text-amber-400 mx-auto" />
                <p className="text-xs text-slate-300 font-medium">
                  No verified Nigerian payout bank account connected yet.
                </p>
                <p className="text-[11px] text-slate-500">
                  Add your National Identification Number (NIN) and commercial bank account to receive automated session payouts.
                </p>
                <button
                  type="button"
                  onClick={() => setIsVerificationModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Verify NIN & Bank Details
                </button>
              </div>
            )}

            {payoutStatusMessage && (
              <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs">
                {payoutStatusMessage}
              </div>
            )}

            {availablePayout > 0 && (
              <button
                onClick={handleRequestPayout}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>
                  Request Payout (<NairaText amount={availablePayout} />)
                </span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Masked Chat */}
      {activeTab === 'chat' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 flex flex-col h-[480px] overflow-hidden">
          {/* Chat Header */}
          <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 font-bold text-xs">
                💬
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Direct Student Communication</h4>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Masked Channel (Privacy Protected)
                </span>
              </div>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 touch-pan-y">
            {currentMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
                <MessageSquare className="w-8 h-8 text-slate-600" />
                <span className="text-xs text-slate-300 font-semibold">No messages yet</span>
                <p className="text-[11px] text-slate-500 max-w-xs">
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
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs ${
                        isTutor
                          ? 'bg-emerald-600 text-white rounded-br-none'
                          : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                      }`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 font-mono">{msg.timestamp}</span>
                  </div>
                );
              })
            )}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSendMessage} className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder="Send masked message to student..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Progressive Tutor Security & Payout Verification Modal */}
      <TutorSecurityVerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        onSuccess={() => setIsVerificationModalOpen(false)}
      />
    </div>
  );
};
