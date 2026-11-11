import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NIGERIAN_CURRICULUM_TOPICS } from '../../data/curriculumData';
import { CBT_EXAMS_DATABASE } from '../../data/cbtExamData';
import { compressImage } from '../../lib/storage';
import { NigerianClassLevel } from '../../types';
import { ExamPrepUnlockModal } from './exam-prep/ExamPrepUnlockModal';
import {
  Flame,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Camera,
  Play,
  Gamepad2,
  Users,
  CheckCircle2,
  Trophy,
  Atom,
  GraduationCap,
  MessageSquare,
  Video,
  Calendar,
  Lock,
  Sparkles,
  KeyRound,
  FileText,
  X,
  Copy,
  Check
} from 'lucide-react';
import { NairaText, NairaSign } from '../../utils/currency';
import { AspirantDashboard } from './aspirant/AspirantDashboard';
import { SchoolMaterial } from '../../types';

export const StudentDashboard: React.FC = () => {
  const {
    student,
    currentUserProfile,
    setActiveStudentTab,
    openNoteReader,
    startExam,
    setIsUniformModalOpen,
    updateStudentAvatar,
    updateStudentClass,
    tutorBookings,
    launchVirtualClassroom,
    examPrepState,
    schoolMaterials,
    linkStudentToSchool
  } = useApp();

  const [isLinkSchoolModalOpen, setIsLinkSchoolModalOpen] = useState(false);
  const [inputSchoolCode, setInputSchoolCode] = useState('');
  const [linkFeedback, setLinkFeedback] = useState<string | null>(null);
  const [selectedSchoolMaterial, setSelectedSchoolMaterial] = useState<SchoolMaterial | null>(null);

  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const [isExamPrepModalOpen, setIsExamPrepModalOpen] = useState(false);
  const [isCopiedLinkCode, setIsCopiedLinkCode] = useState(false);
  const [isParentLinkInfoOpen, setIsParentLinkInfoOpen] = useState(false);

  const studentLinkCode = student.studentLinkCode || 'STU-8K2D';
  const handleCopyLinkCode = () => {
    try {
      navigator.clipboard.writeText(studentLinkCode);
      setIsCopiedLinkCode(true);
      setTimeout(() => setIsCopiedLinkCode(false), 2500);
    } catch {
      setIsCopiedLinkCode(true);
      setTimeout(() => setIsCopiedLinkCode(false), 2500);
    }
  };

  const displayName = student.name || currentUserProfile?.fullName || 'Registered Student';
  const displaySchool = student.school || 'Secondary School';

  const getInitials = (name?: string | null): string => {
    if (!name || !name.trim()) return 'S';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'S';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImage(file, 256, 0.7);
        if (compressed) {
          updateStudentAvatar(compressed);
        }
      } catch (err) {
        console.warn('Avatar compression error:', err);
      }
    }
  };

  // Pick jump back in note
  const jumpBackNote = NIGERIAN_CURRICULUM_TOPICS[0];

  // School Curriculum Materials published by verified administrator
  const relevantMaterials = schoolMaterials.filter(
    m => (student.schoolCode ? m.schoolCode.toUpperCase() === student.schoolCode.toUpperCase() : m.schoolName.toLowerCase().includes(displaySchool.toLowerCase())) &&
         (m.classLevel === student.classLevel || m.classLevel === 'All Classes')
  );

  // Determine class-specific drill details & matching mock exam
  const getDrillConfig = (classLevel: string) => {
    if (classLevel === 'SS 3') {
      const exam = CBT_EXAMS_DATABASE.find(e => e.classLevel === 'SS 3') || CBT_EXAMS_DATABASE[0];
      return {
        title: 'JAMB / WAEC Drill',
        subtitle: 'Timed WASSCE & UTME national mock practice',
        exam
      };
    }
    if (classLevel === 'JSS 3') {
      const exam = CBT_EXAMS_DATABASE.find(e => e.classLevel === 'JSS 3') || CBT_EXAMS_DATABASE[0];
      return {
        title: 'BECE Junior Drill',
        subtitle: 'Timed Junior Secondary Certificate mock',
        exam
      };
    }
    if (classLevel === 'JSS 1' || classLevel === 'JSS 2') {
      const exam =
        CBT_EXAMS_DATABASE.find(e => e.classLevel === classLevel) ||
        CBT_EXAMS_DATABASE.find(e => e.classLevel === 'JSS 1') ||
        CBT_EXAMS_DATABASE[0];
      return {
        title: 'Junior Termly Drill',
        subtitle: `${classLevel} continuous assessment practice`,
        exam
      };
    }
    // SS 1 or SS 2
    const exam =
      CBT_EXAMS_DATABASE.find(e => e.classLevel === classLevel) ||
      CBT_EXAMS_DATABASE.find(e => e.classLevel === 'SS 1') ||
      CBT_EXAMS_DATABASE[0];
    return {
      title: 'Senior Assessment Drill',
      subtitle: `${classLevel} continuous assessment & mock`,
      exam
    };
  };

  const drillConfig = getDrillConfig(student.classLevel);

  // Calculate XP percentage to next rank
  // Ranks: Fresher (0-2500), Scholar (2500-7500), Prefect (7500-15000), Senior Boy (15000+)
  const getRankProgress = (xp: number) => {
    if (xp >= 15000) return { target: 20000, nextRank: 'Senior Prefect', percent: 100 };
    if (xp >= 7500) return { target: 15000, nextRank: 'Senior Boy', percent: Math.round(((xp - 7500) / 7500) * 100) };
    if (xp >= 2500) return { target: 7500, nextRank: 'Prefect', percent: Math.round(((xp - 2500) / 5000) * 100) };
    return { target: 2500, nextRank: 'Scholar', percent: Math.round((xp / 2500) * 100) };
  };

  const rankProgress = getRankProgress(student.xp);

  // Active or upcoming confirmed online tutoring session
  const activeOnlineBooking = tutorBookings.find(
    b => b.status === 'confirmed' && b.bookingType === 'online'
  );

  // Dedicated Aspirant Hub for School Leavers (WAEC, NECO & JAMB)
  if (student.classLevel === 'University Aspirant') {
    return <AspirantDashboard />;
  }

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-4 touch-pan-y text-slate-100">
      {/* Student Profile & Rank Header */}
      <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Interactive Avatar with Upload Trigger and Initials Fallback */}
            <div className="relative">
              <button
                type="button"
                onClick={() => avatarFileInputRef.current?.click()}
                className="relative group w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-emerald-500/40 hover:ring-emerald-400 transition-all cursor-pointer focus:outline-none focus:ring-emerald-400 flex items-center justify-center bg-slate-800"
                title="Click on avatar to choose a picture"
              >
                {student.uniformPhotoUrl ? (
                  <img
                    src={student.uniformPhotoUrl}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 flex items-center justify-center text-white font-black text-sm tracking-wider shadow-inner">
                    {getInitials(displayName)}
                  </div>
                )}

                {/* Hover overlay with camera icon */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity">
                  <Camera className="w-4 h-4 text-emerald-300" />
                  <span className="text-[8px] font-bold mt-0.5">Change</span>
                </div>
              </button>

              {/* Corner Camera Badge indicator */}
              <button
                type="button"
                onClick={() => avatarFileInputRef.current?.click()}
                className="absolute -top-1 -left-1 bg-slate-900 text-emerald-400 hover:text-emerald-300 rounded-full p-1 border border-slate-700 hover:border-emerald-500 transition-colors shadow-sm cursor-pointer"
                title="Choose a picture"
              >
                <Camera className="w-2.5 h-2.5 stroke-[2.5]" />
              </button>

              {student.uniformVerified && (
                <div
                  className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 rounded-full p-0.5 shadow-md"
                  title="Uniform Verified"
                >
                  <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              )}

              {/* Hidden file input for avatar picker */}
              <input
                ref={avatarFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarFileChange}
                className="hidden"
              />
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-base font-bold text-white tracking-tight leading-tight">
                  {displayName}
                </h2>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 rounded px-1.5 py-0.2">
                  {student.rank}
                </span>
                {student.schoolCode ? (
                  <span className="text-[10px] font-mono font-bold text-purple-300 bg-purple-950/90 border border-purple-700/70 rounded px-1.5 py-0.5">
                    {student.schoolCode}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsLinkSchoolModalOpen(true)}
                    className="text-[10px] font-semibold text-purple-400 hover:text-purple-300 underline cursor-pointer"
                  >
                    + Link School Code
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {displaySchool} · {student.classLevel} ({student.stream})
              </p>
            </div>
          </div>

          {/* Daily Streak Flame */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 bg-amber-950/70 border border-amber-700/50 rounded-xl px-2.5 py-1 text-amber-300 shadow-inner">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold font-mono tabular-nums">{student.streakDays}d</span>
            </div>
            <span className="text-[10px] text-amber-400/80 font-medium mt-1">Study Streak</span>
          </div>
        </div>

        {/* Quick Class Switcher (JSS 1 to SS 3 + University Aspirant) */}
        <div className="mt-3.5 pt-3 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#84E000]" />
              <span>Select Active Class</span>
            </span>
            <button
              type="button"
              onClick={() => updateStudentClass('University Aspirant', 'Science')}
              className="text-[10px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer bg-amber-500/10 hover:bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30 transition-colors"
            >
              ★ Switch to Aspirant Hub
            </button>
          </div>
          <div className="grid grid-cols-6 gap-1 p-1 bg-slate-950/80 border border-slate-800/90 rounded-xl">
            {(['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3'] as NigerianClassLevel[]).map((lvl) => {
              const isActive = student.classLevel === lvl;
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => updateStudentClass(lvl, lvl.startsWith('JSS') ? 'Junior' : (student.stream === 'Junior' ? 'Science' : (student.stream || 'Science')))}
                  className={`py-1.5 px-1 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                    isActive
                      ? 'bg-[#84E000] text-slate-950 shadow-md shadow-[#84E000]/30 ring-1 ring-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                  }`}
                  title={`Switch to ${lvl}`}
                >
                  {lvl}
                </button>
              );
            })}
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <strong className="text-white font-mono tabular-nums">{student.xp.toLocaleString()} XP</strong>
            </span>
            <span className="text-[11px] text-slate-400">
              Next Rank: <strong className="text-emerald-400 font-semibold">{rankProgress.nextRank}</strong> ({rankProgress.percent}%)
            </span>
          </div>

          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(5, rankProgress.percent))}%` }}
            />
          </div>
        </div>

        {/* Parent Link Code Voucher Card */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-2.5 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <KeyRound className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                  Parent Link Code
                </span>
                <button
                  type="button"
                  onClick={() => setIsParentLinkInfoOpen(true)}
                  className="text-[9px] text-emerald-400 hover:underline cursor-pointer"
                >
                  How to link?
                </button>
              </div>
              <p className="text-[10px] text-slate-400 leading-none mt-0.5">
                Give this 6-character code to your parent to link their guardian portal.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-mono font-black text-xs tracking-wider text-[#84E000] bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 shadow-inner select-all">
              {studentLinkCode}
            </span>
            <button
              type="button"
              onClick={handleCopyLinkCode}
              className="py-1 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-sm"
              title="Copy link code"
            >
              {isCopiedLinkCode ? (
                <>
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 'Prepare For Exam' SC AI Daily Study Calendar & Tutor Booking Card */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/50 rounded-2xl p-4 shadow-lg space-y-3 relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
              <Calendar className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white tracking-tight">Prepare For Exam</span>
                {examPrepState?.isUnlocked ? (
                  <span className="text-[9px] font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700 uppercase tracking-wide flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Active · ₦4,000 Tutor Credits</span>
                  </span>
                ) : (
                  <span className="text-[9px] font-bold text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-700 uppercase tracking-wide flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" />
                    <span>Locked · Unlock for ₦15,000</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-0.5 font-medium">
                {examPrepState?.isUnlocked
                  ? (examPrepState.activeCalendar
                      ? `Day-by-day timetable active for ${student.classLevel} with CBT drills & tutor booking links.`
                      : 'Take the quick diagnostic survey to synthesize your daily timetable.')
                  : `Structured SC AI daily study calendar for ${student.classLevel} with CBT drill shortcuts & ₦4,000 in included tutor credits.`}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                <span>{student.classLevel} Syllabus</span>
                <span>·</span>
                <span>Daily Practice Drills</span>
                <span>·</span>
                <span>1-on-1 Topic Tutor Support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
          {examPrepState?.isUnlocked ? (
            <button
              type="button"
              onClick={() => setActiveStudentTab('exam-prep')}
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Open Daily Study Calendar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsExamPrepModalOpen(true)}
                className="flex-1 py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs font-black rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Lock className="w-3.5 h-3.5 text-slate-950" />
                <span>Pay & Unlock (₦15,000)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setActiveStudentTab('exam-prep')}
                className="py-2.5 px-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Preview Syllabus</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* 1-on-1 Online Classroom & Whiteboard Banner */}
      <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900 to-teal-950/70 border border-emerald-500/50 rounded-2xl p-4 shadow-lg space-y-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
              <Video className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white tracking-tight">Interactive Whiteboard Classroom</span>
                <span className="text-[9px] font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700 uppercase tracking-wide">
                  Live Board Ready
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 font-medium">
                {activeOnlineBooking
                  ? `${activeOnlineBooking.subject} with ${activeOnlineBooking.tutorName} (Focus: ${activeOnlineBooking.topic})`
                  : 'Live 1-on-1 digital teaching canvas with WAEC/JAMB formula stampers, low-data audio & chat.'}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                <span>Freehand Pen & Geometry</span>
                <span>·</span>
                <span>Cartesian Grid</span>
                <span>·</span>
                <span>Save Lesson Notes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => launchVirtualClassroom(activeOnlineBooking?.id || 'demo-classroom', 'student')}
            className="flex-1 py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Video className="w-4 h-4" />
            <span>{activeOnlineBooking ? 'Enter Booked Classroom' : 'Launch Interactive Whiteboard Now'}</span>
          </button>
          <button
            onClick={() => setActiveStudentTab('tutors')}
            className="py-2.5 px-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Tutor Profiles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Nigerian Student Competitions (Weekly Challenge & Termly League) */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-amber-950/40 border border-amber-600/50 rounded-2xl p-3.5 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">Student Competitions & Tournaments</span>
                <span className="text-[9px] font-bold text-amber-300 bg-amber-950 px-1.5 py-0.2 rounded border border-amber-700 uppercase animate-pulse">
                  Live
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Compete weekly for <NairaText amount={50000} /> airtime & termly for inter-school trophies!
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            onClick={() => setActiveStudentTab('competitions')}
            className="bg-amber-950/60 hover:bg-amber-900/60 border border-amber-700/50 rounded-xl p-2.5 text-left transition-colors group cursor-pointer"
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-amber-300 mb-0.5">
              <span>⚡ Weekly Challenge</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-[10px] text-slate-300 flex items-center gap-1">
              <span>Week 8 Speed Quiz ·</span>
              <span className="inline-flex items-center">
                <NairaSign />50k Airtime Pool
              </span>
            </p>
          </button>

          <button
            onClick={() => setActiveStudentTab('competitions')}
            className="bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-700/50 rounded-xl p-2.5 text-left transition-colors group cursor-pointer"
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-indigo-300 mb-0.5">
              <span>🏆 Termly League</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-[10px] text-slate-300">
              Inter-School Standings & Cup
            </p>
          </button>
        </div>
      </div>

      {/* Student Academic & Competition Chat Forum Banner */}
      <div className="bg-gradient-to-r from-teal-950/80 via-slate-900 to-emerald-950/40 border border-teal-600/50 rounded-2xl p-3.5 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300 shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">Student Academic & Contest Forum</span>
                <span className="text-[9px] font-bold text-teal-300 bg-teal-950 px-1.5 py-0.2 rounded border border-teal-700 uppercase">
                  Community
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Chat with secondary school scholars across Nigeria on formulas, tough topics & contests!
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveStudentTab('community')}
            className="flex items-center gap-1 px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm shrink-0 cursor-pointer"
          >
            <span>Open Chat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Academics
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-amber-400 font-medium">
            <Trophy className="w-3 h-3" />
            Contests
          </span>
          <span>•</span>
          <span className="text-slate-300">
            JSS 1 - SS 3 Active Scholars
          </span>
        </div>
      </div>

      {/* Uniform Verification Banner (If Not Verified) */}
      {!student.uniformVerified ? (
        <div className="bg-gradient-to-r from-indigo-950/80 to-slate-900 border border-indigo-700/50 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-900/60 border border-indigo-600/40 flex items-center justify-center text-indigo-300 shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">SC AI Uniform Verification</span>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 border border-amber-800/60 rounded px-1.5 py-0.2">
                  +500 XP
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Upload or snap your school uniform to verify identity & unlock badge.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsUniformModalOpen(true)}
            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shrink-0 transition-colors shadow-sm"
          >
            Verify Now
          </button>
        </div>
      ) : (
        <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-2xl p-3 flex items-center justify-between text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>King's College uniform verified! Badge active on your public profile.</span>
          </div>
          <button
            onClick={() => setIsUniformModalOpen(true)}
            className="text-[11px] text-emerald-400 underline hover:text-emerald-300 shrink-0"
          >
            View
          </button>
        </div>
      )}

      {/* Official School Materials & Assignments (From Verified Administrator) */}
      {relevantMaterials.length > 0 && (
        <div className="bg-slate-900/90 rounded-2xl p-4 border border-purple-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                {displaySchool} Curriculum Materials
              </span>
            </div>
            <span className="text-[10px] text-purple-400 font-mono font-bold bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800">
              {student.schoolCode || 'SCHL88'}
            </span>
          </div>

          <div className="space-y-2">
            {relevantMaterials.slice(0, 3).map(mat => (
              <div
                key={mat.id}
                onClick={() => setSelectedSchoolMaterial(mat)}
                className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-purple-500/60 transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border uppercase ${
                      mat.type === 'assignment' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                      mat.type === 'project' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                      mat.type === 'past_question' ? 'bg-sky-950 text-sky-300 border-sky-800' :
                      'bg-purple-950 text-purple-300 border-purple-800'
                    }`}>
                      {mat.type.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                      {mat.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    {mat.subject} · {mat.classLevel} {mat.dueDate ? `· Due: ${mat.dueDate}` : ''}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-purple-400 font-semibold shrink-0 group-hover:translate-x-0.5 transition-transform">
                  <span>View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Jump Back In Card */}
      <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Jump Back In
          </span>
          <span className="text-[11px] text-emerald-400 font-medium">
            {jumpBackNote.subject} · Week {jumpBackNote.weekNumber}
          </span>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white leading-snug">
            {jumpBackNote.topicTitle}
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2">
            {jumpBackNote.summary}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{jumpBackNote.readingTimeMinutes} min read</span>
            <span>·</span>
            <span>4 Key Takeaways</span>
          </div>

          <button
            onClick={() => openNoteReader(jumpBackNote)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
          >
            <span>Resume</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* High-Yield Action Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* CBT Simulator Quick Start */}
        <button
          onClick={() => startExam(drillConfig.exam)}
          className="bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-700/60 rounded-2xl p-3.5 text-left flex flex-col justify-between transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-950/80 border border-amber-700/40 flex items-center justify-center text-amber-400 mb-2">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
              {drillConfig.title}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {drillConfig.subtitle}
            </p>
          </div>
          <div className="mt-2 text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            <Play className="w-3 h-3 fill-emerald-400" />
            <span>Start Practice</span>
          </div>
        </button>

        {/* Scheme of Work Hub */}
        <button
          onClick={() => setActiveStudentTab('syllabus')}
          className="bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-indigo-700/60 rounded-2xl p-3.5 text-left flex flex-col justify-between transition-all group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-950/80 border border-indigo-700/40 flex items-center justify-center text-indigo-400 mb-2">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
              Scheme of Work
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              JSS1-SS3 Nigerian curriculum notes
            </p>
          </div>
          <div className="mt-2 text-[10px] text-indigo-400 font-semibold flex items-center gap-1">
            <span>Explore Syllabus</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </button>

        {/* Science Formulas & Periodic Table */}
        <button
          onClick={() => setActiveStudentTab('formulas')}
          className="bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-700/60 rounded-2xl p-3.5 text-left flex flex-col justify-between transition-all group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-700/40 flex items-center justify-center text-cyan-400 mb-2">
            <Atom className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
              Formulas & Periodic Table
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Maths, Physics, Chemistry & Elements
            </p>
          </div>
          <div className="mt-2 text-[10px] text-cyan-400 font-semibold flex items-center gap-1">
            <span>Open Formula Bank</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </button>

        {/* Find Vetted Tutors */}
        <button
          onClick={() => setActiveStudentTab('tutors')}
          className="bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-700/60 rounded-2xl p-3.5 text-left flex flex-col justify-between transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-700/40 flex items-center justify-center text-emerald-400 mb-2">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
              Vetted Tutors
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              NIN-verified physical & online lessons
            </p>
          </div>
          <div className="mt-2 text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            <span>Find Tutors</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </button>

        {/* Gaming Hub */}
        <button
          onClick={() => setActiveStudentTab('games')}
          className="bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-purple-700/60 rounded-2xl p-3.5 text-left flex flex-col justify-between transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-purple-950/80 border border-purple-700/40 flex items-center justify-center text-purple-400 mb-2">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
              Math Sprint
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Speed arithmetic challenges for XP
            </p>
          </div>
          <div className="mt-2 text-[10px] text-purple-400 font-semibold flex items-center gap-1">
            <span>Play Game</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </button>
      </div>

      {/* Student of the Week Spotlight Banner & Competitions Trigger */}
      <div
        onClick={() => setActiveStudentTab('competitions')}
        className="bg-gradient-to-br from-amber-950/70 via-slate-900 to-slate-900 border border-amber-800/60 hover:border-amber-500/80 rounded-2xl p-3.5 shadow-sm cursor-pointer transition-all group"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
            <Trophy className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Student of the Week & Weekly Challenge</span>
          </div>
          <span className="text-[10px] text-amber-300 font-semibold flex items-center gap-1">
            <span>View Standings</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>

        <div className="flex items-center gap-3">
          {student.uniformPhotoUrl ? (
            <img
              src={student.uniformPhotoUrl}
              alt={displayName}
              className="w-11 h-11 rounded-xl object-cover ring-1 ring-amber-500/50 shadow-inner shrink-0"
            />
          ) : (
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-emerald-900 flex items-center justify-center text-white font-black text-xs ring-1 ring-amber-500/50 shadow-inner shrink-0">
              {getInitials(displayName)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-white truncate">
                {displayName}
              </h4>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800">
                {student.rank}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">
              {displaySchool} · {student.classLevel} ({student.stream})
            </p>
            <div className="flex items-center gap-2 text-[10px] text-amber-300 font-mono mt-0.5">
              <span>{student.xp.toLocaleString()} XP</span>
              <span>·</span>
              <span>{student.streakDays} Day Streak 🔥</span>
              <span>·</span>
              <span className="text-emerald-400 font-semibold inline-flex items-center">
                <NairaSign />50k Prize Contender
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pay & Unlock Modal */}
      <ExamPrepUnlockModal
        isOpen={isExamPrepModalOpen}
        onClose={() => setIsExamPrepModalOpen(false)}
        onSuccess={() => setActiveStudentTab('exam-prep')}
      />

      {/* Link School Code Modal */}
      {isLinkSchoolModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white">Link Your School Code</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsLinkSchoolModalOpen(false);
                  setLinkFeedback(null);
                }}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Enter the unique 6-character School Code (e.g. <span className="font-mono text-purple-300 font-bold">SCHL88</span>) provided by your school administrator or teacher.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!inputSchoolCode.trim()) return;
                const ok = linkStudentToSchool(inputSchoolCode);
                if (ok) {
                  setLinkFeedback(`Linked successfully to school code ${inputSchoolCode.trim().toUpperCase()}!`);
                  setTimeout(() => {
                    setIsLinkSchoolModalOpen(false);
                    setLinkFeedback(null);
                  }, 1500);
                }
              }}
              className="space-y-3"
            >
              <div>
                <input
                  type="text"
                  required
                  maxLength={8}
                  value={inputSchoolCode}
                  onChange={(e) => setInputSchoolCode(e.target.value.toUpperCase())}
                  placeholder="e.g. SCHL88"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-purple-500 rounded-xl py-2.5 px-3 text-sm font-mono font-black text-center tracking-widest text-white uppercase focus:outline-none transition-colors"
                />
              </div>

              {linkFeedback && (
                <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs text-center font-medium">
                  {linkFeedback}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow"
              >
                Verify &amp; Link School
              </button>
            </form>
          </div>
        </div>
      )}

      {/* School Material Reader Modal */}
      {selectedSchoolMaterial && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-5 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block">
                  {selectedSchoolMaterial.subject} · {selectedSchoolMaterial.classLevel}
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  {selectedSchoolMaterial.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSchoolMaterial(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
                <span>By: {selectedSchoolMaterial.authorName}</span>
                {selectedSchoolMaterial.dueDate && (
                  <>
                    <span>·</span>
                    <span className="text-amber-400 font-semibold">Due: {selectedSchoolMaterial.dueDate}</span>
                  </>
                )}
                {selectedSchoolMaterial.maxScore && (
                  <>
                    <span>·</span>
                    <span className="text-emerald-400 font-mono font-semibold">{selectedSchoolMaterial.maxScore} Marks</span>
                  </>
                )}
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed font-sans">
                {selectedSchoolMaterial.content}
              </div>

              {selectedSchoolMaterial.attachmentName && (
                <div className="p-3 bg-purple-950/40 border border-purple-800/60 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-semibold text-white">{selectedSchoolMaterial.attachmentName}</span>
                  </div>
                  <span className="text-[10px] text-purple-300 font-medium">Worksheet Attached</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setSelectedSchoolMaterial(null)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Parent Link Info Explanation Modal */}
      {isParentLinkInfoOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Your Student Link Code</h3>
                  <span className="text-xs text-emerald-400 font-mono font-bold tracking-wider">{studentLinkCode}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsParentLinkInfoOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
              <p>
                Your <strong>6-character Student Link Code</strong> allows your parent, guardian, or sponsor to link their account with yours.
              </p>
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  What your parent can do when linked:
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                  <li>View your weekly study streaks and completed curriculum topics</li>
                  <li>Review your CBT mock exam scores (WAEC, JAMB, BECE)</li>
                  <li>Fund your prep wallet and sponsor certified home or online tutors</li>
                  <li>Receive automated WhatsApp or SMS progress summaries</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleCopyLinkCode}
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-950"
              >
                {isCopiedLinkCode ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
                <span>{isCopiedLinkCode ? 'Link Code Copied!' : 'Copy Link Code'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsParentLinkInfoOpen(false)}
                className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
