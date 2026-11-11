import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { NIGERIAN_UNIVERSITIES } from '../../../data/universityAdmissionData';
import { generateAspirantDailyDrill, ASPIRANT_PAST_QUESTION_YEARS } from '../../../data/aspirantMockData';
import { AspirantSubscriptionModal } from './AspirantSubscriptionModal';
import { DailyExplorerHUD } from '../DailyExplorerHUD';
import {
  Calendar,
  Clock,
  Target,
  Sparkles,
  Trophy,
  GraduationCap,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Lock,
  Flame,
  AlertCircle,
  HelpCircle,
  Settings,
  X,
  FileQuestion,
  ExternalLink
} from 'lucide-react';
import { NairaSign } from '../../../utils/currency';

export const AspirantDashboard: React.FC = () => {
  const {
    aspirantGoal,
    updateAspirantGoal,
    completedAspirantDrillIds,
    toggleAspirantDrillCompleted,
    setActiveStudentTab,
    startExam
  } = useApp();

  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);

  const activeExamDate = aspirantGoal.targetExamDate || aspirantGoal.examDates?.jamb || '2026-04-18';
  const activeSubjects = aspirantGoal.jambSubjects || aspirantGoal.subjectCombination || ['Use of English', 'Mathematics', 'Physics', 'Chemistry'];

  // Form state for editing goals
  const [formUniversity, setFormUniversity] = useState(aspirantGoal.targetUniversity);
  const [formCourse, setFormCourse] = useState(aspirantGoal.targetCourse);
  const [formTargetScore, setFormTargetScore] = useState(aspirantGoal.targetScore);
  const [formExamDate, setFormExamDate] = useState(activeExamDate);
  const [formSubject1] = useState(activeSubjects[0] || 'Use of English'); // compulsory
  const [formSubject2, setFormSubject2] = useState(activeSubjects[1] || 'Mathematics');
  const [formSubject3, setFormSubject3] = useState(activeSubjects[2] || 'Physics');
  const [formSubject4, setFormSubject4] = useState(activeSubjects[3] || 'Chemistry');

  // Real-time countdown timer to JAMB UTME
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(activeExamDate).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [activeExamDate]);

  // Daily Drills generated dynamically based on days left
  const dailyDrills = generateAspirantDailyDrill(timeLeft.days, activeSubjects);
  const completedCount = dailyDrills.filter(d => completedAspirantDrillIds.includes(d.id)).length;
  const progressPercent = Math.round((completedCount / dailyDrills.length) * 100);

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    updateAspirantGoal({
      targetUniversity: formUniversity,
      targetCourse: formCourse,
      targetScore: Number(formTargetScore) || 280,
      targetExamDate: formExamDate,
      examDates: {
        jamb: formExamDate,
        waec: aspirantGoal.examDates?.waec || '2026-05-08',
        neco: aspirantGoal.examDates?.neco || '2026-06-15'
      },
      subjectCombination: [formSubject1, formSubject2, formSubject3, formSubject4],
      jambSubjects: [formSubject1, formSubject2, formSubject3, formSubject4]
    });
    setIsGoalModalOpen(false);
  };

  const getTierBadge = () => {
    switch (aspirantGoal.tier) {
      case 'elite':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-black tracking-wide bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 flex items-center gap-1 shadow-md shadow-amber-500/20">
            <Sparkles className="w-3 h-3" />
            ASPIRANT ELITE
          </span>
        );
      case 'basic':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#1B365D] text-sky-300 border border-sky-400/30 flex items-center gap-1">
            <Award className="w-3 h-3 text-sky-400" />
            ASPIRANT BASIC
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
            FREE TIER
          </span>
        );
    }
  };

  return (
    <div className="flex-1 w-full overflow-y-auto bg-[#070D18] text-slate-100 p-4 md:p-6 space-y-6 pb-24">
      {/* Top Banner / Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0C1B33] via-[#102447] to-[#0D2A47] border border-[#234375] p-5 shadow-xl">
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-[#008751]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-12 top-0 w-32 h-32 bg-[#FF5B00]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#008751]/30 text-[#00E676] border border-[#008751]/50">
                School Leavers Hub
              </span>
              {getTierBadge()}
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              Aspirant Command Center
              <GraduationCap className="w-7 h-7 text-[#00E676]" />
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-xl">
              Targeted WAEC, NECO &amp; JAMB preparation for secondary school graduates racing towards university admission.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <button
              onClick={() => setIsGoalModalOpen(true)}
              className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 text-slate-400" />
              Edit Target Goal
            </button>
            <button
              onClick={() => setIsUpgradeModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF5B00] to-amber-500 hover:from-[#ff6b18] hover:to-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-orange-500/25 transition-all cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {aspirantGoal.tier === 'elite' ? 'Manage Plan' : 'Upgrade Plan'}
            </button>
          </div>
        </div>

        {/* Target Goal Summary Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800/80 text-xs">
          <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Target University</span>
            <span className="font-bold text-white text-xs truncate block" title={aspirantGoal.targetUniversity}>
              {aspirantGoal.targetUniversity}
            </span>
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Target Course</span>
            <span className="font-bold text-emerald-400 text-xs truncate block" title={aspirantGoal.targetCourse}>
              {aspirantGoal.targetCourse}
            </span>
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Target JAMB Score</span>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-amber-400 text-sm">{aspirantGoal.targetScore}</span>
              <span className="text-[10px] text-slate-400">/ 400</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">UTME 4-Subjects</span>
            <span className="font-medium text-slate-300 text-[11px] truncate block" title={activeSubjects.join(', ')}>
              {activeSubjects.join(' • ')}
            </span>
          </div>
        </div>
      </div>

      {/* Daily Study Diversity & XP Multiplier HUD */}
      <DailyExplorerHUD />

      {/* Backward-Counting Calendar Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#FF5B00]" />
            <h2 className="text-base font-bold text-white uppercase tracking-wider text-xs">
              Official Exam Countdown Clocks
            </h2>
          </div>
          <span className="text-[11px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
            Target Official Dates
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Main JAMB UTME Countdown Clock */}
          <div className="md:col-span-2 bg-[#0E1A2E] border-2 border-[#FF5B00]/40 rounded-2xl p-4 relative overflow-hidden shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5B00] animate-pulse" />
                <span className="text-xs font-black uppercase text-white tracking-wider">
                  JAMB UTME Examination Diet
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Official Target: {new Date(activeExamDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>

            {/* Countdown Flip Units */}
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5">
                <div className="text-2xl md:text-3xl font-black text-[#FF5B00] font-mono">
                  {timeLeft.days}
                </div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400 mt-0.5 font-bold">Days</div>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5">
                <div className="text-2xl md:text-3xl font-black text-amber-400 font-mono">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400 mt-0.5 font-bold">Hours</div>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5">
                <div className="text-2xl md:text-3xl font-black text-emerald-400 font-mono">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400 mt-0.5 font-bold">Mins</div>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5">
                <div className="text-2xl md:text-3xl font-black text-sky-400 font-mono">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400 mt-0.5 font-bold">Secs</div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-300 bg-slate-900/60 px-3 py-2 rounded-xl">
              <span className="flex items-center gap-1.5 text-xs text-slate-300">
                <Flame className="w-3.5 h-3.5 text-[#FF5B00]" />
                Muscle-memory preparation mode: 180 questions / 120 minutes.
              </span>
              <button
                onClick={() => setActiveStudentTab('aspirant-cbt')}
                className="text-[11px] font-bold text-[#FF5B00] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Launch Simulator <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* WAEC & NECO Diets */}
          <div className="space-y-2">
            <div className="bg-[#0B1526] border border-slate-800 rounded-xl p-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#00E676] tracking-wider block">
                  WAEC / WASSCE Diet
                </span>
                <span className="text-xs font-semibold text-slate-200">May / June 2026 Target</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-white font-mono">{Math.max(timeLeft.days + 32, 1)}</span>
                <span className="text-[9px] uppercase text-slate-400 block font-bold">Days Left</span>
              </div>
            </div>

            <div className="bg-[#0B1526] border border-slate-800 rounded-xl p-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider block">
                  NECO SSCE Diet
                </span>
                <span className="text-xs font-semibold text-slate-200">June / July 2026 Target</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-white font-mono">{Math.max(timeLeft.days + 75, 1)}</span>
                <span className="text-[9px] uppercase text-slate-400 block font-bold">Days Left</span>
              </div>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-2.5 text-center">
              <span className="text-[11px] text-emerald-300 font-medium">
                15+ Years Official WAEC &amp; NECO Past Questions Unlocked
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* The "Prepare for Exam" SC AI Drill Sergeant (Daily Schedule) */}
      <div className="bg-[#0A1424] border border-[#1E3354] rounded-2xl p-4 md:p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#FF5B00]/20 text-[#FF5B00] border border-[#FF5B00]/30">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  SC AI Drill Sergeant: Today's High-Yield Schedule
                </h3>
                <p className="text-xs text-slate-400">
                  Topic Mastery Cycle: Summary Note ➔ Topical CBT Quiz ➔ SC AI Explanation Review
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-400">{completedCount} of {dailyDrills.length} Completed</span>
              <div className="w-32 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-[#00E676] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {aspirantGoal.tier === 'free' && (
              <button
                onClick={() => setIsUpgradeModalOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[10px] font-bold text-amber-300 flex items-center gap-1 cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                Unlock 24/7 SC AI Drill Plan
              </button>
            )}
          </div>
        </div>

        {/* Drill Tasks List */}
        <div className="space-y-2.5">
          {dailyDrills.map((drill) => {
            const isDone = completedAspirantDrillIds.includes(drill.id);
            return (
              <div
                key={drill.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border transition-all ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-300'
                    : 'bg-[#0E1A2C] border-slate-800 hover:border-slate-700 text-slate-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleAspirantDrillCompleted(drill.id)}
                    className="mt-0.5 text-slate-500 hover:text-emerald-400 cursor-pointer transition-colors"
                    title={isDone ? 'Mark as incomplete' : 'Mark as done'}
                  >
                    <CheckCircle2 className={`w-5 h-5 ${isDone ? 'text-emerald-400 fill-emerald-950' : 'text-slate-600'}`} />
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                        {drill.subject}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {drill.estimatedMinutes} mins
                      </span>
                    </div>
                    <h4 className={`text-sm font-bold mt-1 ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                      {drill.topic}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">{drill.notesSummary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  {drill.type === 'quiz' && (
                    <button
                      onClick={() => setActiveStudentTab('aspirant-cbt')}
                      className="px-3 py-1.5 rounded-lg bg-[#FF5B00] hover:bg-[#ff6d19] text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      Take Quiz <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                  {drill.type === 'read' && (
                    <button
                      onClick={() => setActiveStudentTab('syllabus')}
                      className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      Read Note <BookOpen className="w-3 h-3" />
                    </button>
                  )}
                  {drill.type === 'drill' && (
                    <button
                      onClick={() => {
                        if (aspirantGoal.tier === 'free') {
                          setIsUpgradeModalOpen(true);
                        } else {
                          setActiveStudentTab('ai-coach');
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {aspirantGoal.tier === 'free' ? <Lock className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                      SC AI Review
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Feature Pillars Grid for School Leavers */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-[#00E676]" />
          Aspirant Exam Arsenal (6 Pillars)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {/* Pillar 1: CBT Simulator Engine */}
          <div
            onClick={() => setActiveStudentTab('aspirant-cbt')}
            className="group p-4 rounded-2xl bg-[#0D192C] hover:bg-[#12223B] border border-slate-800 hover:border-[#FF5B00]/60 transition-all cursor-pointer shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#FF5B00]/20 border border-[#FF5B00]/40 flex items-center justify-center text-[#FF5B00] mb-3 group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-[#FF5B00] transition-colors">
                Authentic JAMB CBT Simulator
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Strict 4-subject UTME engine with 180 questions, 120-minute countdown, question grid, and hotkeys (A, B, C, D, N, P, R, S).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-[#FF5B00]">
              <span>Launch Simulator</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 2: 15+ Years Past Questions Database */}
          <div
            onClick={() => setActiveStudentTab('aspirant-cbt')}
            className="group p-4 rounded-2xl bg-[#0D192C] hover:bg-[#12223B] border border-slate-800 hover:border-sky-500/60 transition-all cursor-pointer shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 mb-3 group-hover:scale-105 transition-transform">
                <FileQuestion className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base group-hover:text-sky-400 transition-colors">
                  15+ Years Past Questions
                </h3>
                {aspirantGoal.tier === 'free' && (
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
                    2 Yrs Free
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Comprehensive 2008–2024 archive for WAEC, NECO, and JAMB with verified step-by-step solutions and syllabus mapping.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-sky-400">
              <span>{aspirantGoal.tier === 'free' ? 'Practice 2023–2024 Free (Unlock All 15+ Yrs)' : 'Browse Past Papers'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 3: National Weekend Mock Tournaments */}
          <div
            onClick={() => setActiveStudentTab('mock-tournaments')}
            className="group p-4 rounded-2xl bg-[#0D192C] hover:bg-[#12223B] border border-slate-800 hover:border-amber-500/60 transition-all cursor-pointer shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-105 transition-transform">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors">
                  National Mock Tournaments
                </h3>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  <NairaSign />50k Prizes
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Compete with 20,000+ Nigerian aspirants in weekend timed UTME mocks. National leaderboard, state rankings &amp; cash/airtime rewards.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400">
              <span>View Leaderboard &amp; Register</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 4: Admission & University Guide */}
          <div
            onClick={() => setActiveStudentTab('admission-guide')}
            className="group p-4 rounded-2xl bg-[#0D192C] hover:bg-[#12223B] border border-slate-800 hover:border-emerald-500/60 transition-all cursor-pointer shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors">
                University Admission Guide
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Official cut-off marks for UNILAG, UI, OAU, ABU, UNN, LASU, JAMB subject combination checker &amp; aggregate score calculator.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>Check Cut-Offs &amp; Combos</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 5: On-Demand Tutor Booking */}
          <div
            onClick={() => setActiveStudentTab('tutors')}
            className="group p-4 rounded-2xl bg-[#0D192C] hover:bg-[#12223B] border border-slate-800 hover:border-purple-500/60 transition-all cursor-pointer shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-purple-400 transition-colors">
                On-Demand Tutor Booking
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Stuck on Organic Chemistry, Calculus, or Projectiles? Book verified Nigerian graduate tutors for a focused 1-2 hr live session.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-purple-400">
              <span>Book Expert Tutor</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 6: Aspirants Discussion & Post-UTME Forum */}
          <div
            onClick={() => setActiveStudentTab('community')}
            className="group p-4 rounded-2xl bg-[#0D192C] hover:bg-[#12223B] border border-slate-800 hover:border-pink-500/60 transition-all cursor-pointer shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400 mb-3 group-hover:scale-105 transition-transform">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-pink-400 transition-colors">
                Aspirants Forum &amp; Gist
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Connect with aspirants across all 36 states. Exchange post-UTME updates, screening guidelines, and exam hall survival tips.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-pink-400">
              <span>Join Discussion</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Educator & Admin Past Question Importer Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-[#0A1828] border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Teacher & Admin Portal</span>
              <span className="text-[10px] bg-emerald-900/80 text-emerald-300 border border-emerald-700/50 px-1.5 py-0.5 rounded font-mono">PIN: 2026</span>
            </div>
            <h3 className="font-bold text-white text-sm">Past Question Importer & Cloud Firestore Archive</h3>
            <p className="text-xs text-slate-400">
              Secondary school teachers & center admins can paste raw question papers or upload JSON to stream into the live CBT database.
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveStudentTab('educator-importer')}
          className="py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/40 whitespace-nowrap transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
        >
          <span>Open Importer Workbench</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Subscription Tier Comparison Card */}
      <div className="bg-gradient-to-r from-[#0B1527] to-[#122340] border border-[#233F6D] rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase text-[#FF5B00] tracking-wider block mb-1">
            Aspirant Monthly Subscription Plans
          </span>
          <h3 className="text-lg font-black text-white">
            {aspirantGoal.tier === 'elite'
              ? 'You are on the Aspirant Elite Plan'
              : aspirantGoal.tier === 'basic'
              ? 'You are on the Aspirant Basic Plan'
              : 'Upgrade to Aspirant Elite for Full SC AI Coaching & Mock Tournaments'}
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Choose from Free (2 yrs past questions), Basic (₦5,000/mo - 15+ yrs past questions &amp; full notes), or Elite (₦10,000/mo - 24/7 SC AI Drill Sergeant &amp; Weekend Tournaments).
          </p>
        </div>

        <button
          onClick={() => setIsUpgradeModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5B00] to-amber-500 hover:from-[#ff6c17] hover:to-amber-400 text-slate-950 font-black text-xs md:text-sm shadow-xl shadow-orange-500/20 transition-all cursor-pointer active:scale-95 shrink-0"
        >
          View Plans &amp; Pricing
        </button>
      </div>

      {/* Target Goal Edit Modal */}
      {isGoalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0D1829] border border-[#233F6D] rounded-2xl max-w-lg w-full p-5 shadow-2xl relative">
            <button
              onClick={() => setIsGoalModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-white mb-1 flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#FF5B00]" />
              Configure Aspirant Target Goal
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Set your target Nigerian university, course of choice, and UTME subject combination.
            </p>

            <form onSubmit={handleSaveGoal} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase block mb-1">
                  Target Nigerian University
                </label>
                <select
                  value={formUniversity}
                  onChange={(e) => setFormUniversity(e.target.value)}
                  className="w-full bg-[#12223B] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5B00]"
                >
                  {NIGERIAN_UNIVERSITIES.map((u: { id: string; name: string; shortName: string }) => (
                    <option key={u.id} value={u.name}>
                      {u.name} ({u.shortName})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1">
                    Target Course
                  </label>
                  <input
                    type="text"
                    value={formCourse}
                    onChange={(e) => setFormCourse(e.target.value)}
                    placeholder="e.g. Medicine & Surgery"
                    className="w-full bg-[#12223B] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5B00]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1">
                    Target JAMB Score (/400)
                  </label>
                  <input
                    type="number"
                    min="180"
                    max="400"
                    value={formTargetScore}
                    onChange={(e) => setFormTargetScore(Number(e.target.value))}
                    className="w-full bg-[#12223B] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5B00]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase block mb-1">
                  Target Exam Date
                </label>
                <input
                  type="date"
                  value={formExamDate}
                  onChange={(e) => setFormExamDate(e.target.value)}
                  className="w-full bg-[#12223B] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5B00]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase block mb-1">
                  JAMB 4-Subject Combination
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <input
                    type="text"
                    value={formSubject1}
                    disabled
                    className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-400 font-semibold"
                    title="Compulsory for all JAMB candidates"
                  />
                  <input
                    type="text"
                    value={formSubject2}
                    onChange={(e) => setFormSubject2(e.target.value)}
                    placeholder="Subject 2"
                    className="bg-[#12223B] border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                  <input
                    type="text"
                    value={formSubject3}
                    onChange={(e) => setFormSubject3(e.target.value)}
                    placeholder="Subject 3"
                    className="bg-[#12223B] border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                  <input
                    type="text"
                    value={formSubject4}
                    onChange={(e) => setFormSubject4(e.target.value)}
                    placeholder="Subject 4"
                    className="bg-[#12223B] border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsGoalModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#008751] hover:bg-[#009b5d] text-white font-bold text-xs shadow-lg shadow-emerald-900/30 cursor-pointer"
                >
                  Save Goals
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Subscription Modal */}
      <AspirantSubscriptionModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />
    </div>
  );
};
