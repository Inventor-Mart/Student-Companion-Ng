import React from 'react';
import { useApp } from '../../context/AppContext';
import { NIGERIAN_CURRICULUM_TOPICS } from '../../data/curriculumData';
import { CBT_EXAMS_DATABASE } from '../../data/cbtExamData';
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
  Atom
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    student,
    setActiveStudentTab,
    openNoteReader,
    startExam,
    setIsUniformModalOpen
  } = useApp();

  // Pick jump back in note
  const jumpBackNote = NIGERIAN_CURRICULUM_TOPICS[0];
  const quickExam = CBT_EXAMS_DATABASE[0];

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
            {/* Avatar with Uniform Badge */}
            <div className="relative">
              <img
                src={student.uniformPhotoUrl || "https://api.dicebear.com/7.x/micah/svg?seed=Tunde&backgroundColor=1e293b"}
                alt="Student Avatar"
                className="w-13 h-13 rounded-2xl object-cover bg-slate-800 ring-2 ring-emerald-500/40"
              />
              {student.uniformVerified && (
                <div
                  className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 rounded-full p-0.5 shadow-md"
                  title="Uniform Verified"
                >
                  <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-bold text-white tracking-tight leading-tight">
                  {student.name}
                </h2>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 rounded px-1.5 py-0.2">
                  {student.rank}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {student.school} · {student.classLevel} ({student.stream})
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

        {/* XP Progress Bar */}
        <div className="mt-3.5 pt-3 border-t border-slate-800/80">
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
                Compete weekly for ₦50,000 airtime & termly for inter-school trophies!
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
            <p className="text-[10px] text-slate-300">
              Week 8 Speed Quiz · ₦50k Airtime Pool
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
          onClick={() => startExam(quickExam)}
          className="bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-700/60 rounded-2xl p-3.5 text-left flex flex-col justify-between transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-950/80 border border-amber-700/40 flex items-center justify-center text-amber-400 mb-2">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
              JAMB / WAEC Drill
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Timed CBT simulation with explanations
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
          <img
            src="https://api.dicebear.com/7.x/micah/svg?seed=Praise&backgroundColor=ffd5dc"
            alt="Praise Adebayo"
            className="w-11 h-11 rounded-xl object-cover bg-slate-800 ring-1 ring-amber-500/50"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-white truncate">
                Praise Adebayo
              </h4>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800">
                Senior Boy
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">
              King's College Lagos · SS 3 Science
            </p>
            <div className="flex items-center gap-2 text-[10px] text-amber-300 font-mono mt-0.5">
              <span>14,850 XP</span>
              <span>·</span>
              <span>28 Day Streak 🔥</span>
              <span>·</span>
              <span className="text-emerald-400 font-semibold">₦50k Prize Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
