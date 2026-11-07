import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { NIGERIAN_CURRICULUM_TOPICS } from '../../data/curriculumData';
import { CBT_EXAMS_DATABASE } from '../../data/cbtExamData';
import { compressImage } from '../../lib/storage';
import { NigerianClassLevel } from '../../types';
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
  GraduationCap
} from 'lucide-react';
import { NairaText, NairaSign } from '../../utils/currency';

export const StudentDashboard: React.FC = () => {
  const {
    student,
    currentUserProfile,
    setActiveStudentTab,
    openNoteReader,
    startExam,
    setIsUniformModalOpen,
    updateStudentAvatar,
    updateStudentClass
  } = useApp();

  const avatarFileInputRef = useRef<HTMLInputElement>(null);

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
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-bold text-white tracking-tight leading-tight">
                  {displayName}
                </h2>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 rounded px-1.5 py-0.2">
                  {student.rank}
                </span>
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

        {/* Quick Class Switcher (JSS 1 to SS 3) */}
        <div className="mt-3.5 pt-3 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#84E000]" />
              <span>Select Active Class</span>
            </span>
            <span className="text-[10px] text-[#84E000] font-semibold">Tap to switch class</span>
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

      {/* Uniform Verification Banner (If Not Verified) */}
      {!student.uniformVerified ? (
        <div className="bg-gradient-to-r from-indigo-950/80 to-slate-900 border border-indigo-700/50 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-900/60 border border-indigo-600/40 flex items-center justify-center text-indigo-300 shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">AI Uniform Verification</span>
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
    </div>
  );
};
