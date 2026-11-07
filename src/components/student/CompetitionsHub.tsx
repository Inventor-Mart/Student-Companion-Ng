import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CBT_EXAMS_DATABASE } from '../../data/cbtExamData';
import { STUDENT_LEADERBOARD_DATA, SCHOOL_LEADERBOARD_DATA } from '../../data/leaderboardData';
import {
  TERMLY_CHAMPIONSHIP_PRIZES,
  TERMLY_REGISTRATION_FEE_NAIRA,
  CHAMPIONSHIP_DAYS_CONFIG,
  getClassChampionshipQuestions,
  ChampionshipExamQuestion
} from '../../data/competitionPrizesData';
import { NigerianClassLevel } from '../../types';
import {
  Trophy,
  Flame,
  Award,
  Calendar,
  Timer,
  Gift,
  ShieldCheck,
  Medal,
  Play,
  ArrowRight,
  School,
  Users,
  Sparkles,
  CheckCircle2,
  Crown,
  Smartphone,
  Shirt,
  Backpack,
  Calculator,
  AlertCircle,
  Clock,
  X,
  Lock,
  BookOpen,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { NairaText } from '../../utils/currency';

export const CompetitionsHub: React.FC = () => {
  const {
    student,
    currentUserProfile,
    startExam,
    addStudentXP,
    championshipRegistrations,
    currentStudentChampionship,
    requestChampionshipEntry,
    submitChampionshipStageResult,
    setCurrentRole
  } = useApp();

  const [activeTab, setActiveTab] = useState<'termly' | 'schools' | 'weekly' | 'spotlight' | 'prizes'>('termly');
  const [hasEnteredThisWeek, setHasEnteredThisWeek] = useState<boolean>(false);

  // Leaderboard filter: 'national' or specific class level
  const [leaderboardView, setLeaderboardView] = useState<'national' | NigerianClassLevel>('national');

  // Multi-stage exam state
  const [isExamModalOpen, setIsExamModalOpen] = useState<boolean>(false);
  const [activeExamDay, setActiveExamDay] = useState<1 | 2 | 3>(1);
  const [activeQuestions, setActiveQuestions] = useState<ChampionshipExamQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [examSecondsLeft, setExamSecondsLeft] = useState<number>(1800);
  const [isExamSubmitted, setIsExamSubmitted] = useState<boolean>(false);
  const [stageScoreResult, setStageScoreResult] = useState<{
    day: 1 | 2 | 3;
    score: number;
    total: number;
    percentage: number;
    timeSpent: number;
  } | null>(null);

  const studentName = student.name || currentUserProfile?.fullName || 'Registered Student';
  const studentSchool = student.school || 'Secondary School';
  const studentClass = student.classLevel;

  const getInitials = (name?: string | null): string => {
    if (!name || !name.trim()) return 'S';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'S';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Find a high stakes exam for the weekly challenge
  const weeklyChallengeExam = CBT_EXAMS_DATABASE[0];

  const handleEnterWeeklyChallenge = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
    startExam(weeklyChallengeExam);
  };

  const handleQuickClaimBonus = () => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.7 }
    });
    setHasEnteredThisWeek(true);
    addStudentXP(250);
  };

  // Countdown timer for active stage exam
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isExamModalOpen && !isExamSubmitted && examSecondsLeft > 0) {
      timer = setInterval(() => {
        setExamSecondsLeft(prev => {
          if (prev <= 1) {
            handleFinalizeStageExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isExamModalOpen, isExamSubmitted, examSecondsLeft]);

  // Launch a specific stage exam
  const handleLaunchStageExam = (day: 1 | 2 | 3) => {
    const config = CHAMPIONSHIP_DAYS_CONFIG[day];
    const qList = getClassChampionshipQuestions(studentClass, day);

    setActiveExamDay(day);
    setActiveQuestions(qList);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setExamSecondsLeft(config.durationSeconds);
    setIsExamSubmitted(false);
    setStageScoreResult(null);
    setIsExamModalOpen(true);
  };

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (isExamSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleFinalizeStageExam = () => {
    if (isExamSubmitted || activeQuestions.length === 0) return;
    setIsExamSubmitted(true);

    const config = CHAMPIONSHIP_DAYS_CONFIG[activeExamDay];
    const timeSpent = Math.max(10, config.durationSeconds - examSecondsLeft);
    let correctCount = 0;

    activeQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        correctCount += 1;
      }
    });

    const percentage = Math.round((correctCount / activeQuestions.length) * 100);

    setStageScoreResult({
      day: activeExamDay,
      score: correctCount,
      total: activeQuestions.length,
      percentage,
      timeSpent
    });

    // Save into context state and persistence
    submitChampionshipStageResult(activeExamDay, correctCount, activeQuestions.length, timeSpent);
  };

  const formatSeconds = (sec?: number) => {
    if (!sec) return '00:00';
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Determine user registration and stage completion
  const regStatus = currentStudentChampionship?.status;
  const currentStage = currentStudentChampionship?.currentStage || 1;
  const stageResults = currentStudentChampionship?.stageResults || {};

  const isDay1Done = !!stageResults[1];
  const isDay2Done = !!stageResults[2];
  const isDay3Done = !!stageResults[3];

  const totalStagesCompleted = (isDay1Done ? 1 : 0) + (isDay2Done ? 1 : 0) + (isDay3Done ? 1 : 0);

  // Filter leaderboard based on view
  const filteredLeaderboard = championshipRegistrations
    .filter(r => {
      if (leaderboardView === 'national') return true;
      return r.classLevel === leaderboardView;
    })
    .sort((a, b) => {
      const scoreA = a.cumulativePercentage ?? a.score ?? 0;
      const scoreB = b.cumulativePercentage ?? b.score ?? 0;
      if (scoreB !== scoreA) return scoreB - scoreA;
      const timeA = a.cumulativeTimeSpentSeconds ?? a.timeSpentSeconds ?? 99999;
      const timeB = b.cumulativeTimeSpentSeconds ?? b.timeSpentSeconds ?? 99999;
      return timeA - timeB;
    });

  const ALL_CLASSES: NigerianClassLevel[] = ['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3'];

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-4 touch-pan-y text-slate-100">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                <span>Student Competitions Arena</span>
              </h2>
              <p className="text-[11px] text-slate-400">
                3-Day Academic Termly Championship & Weekly Speed Challenges
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800 animate-pulse flex items-center gap-1">
            📱 1st Prize: Android Smartphone
          </span>
        </div>
      </div>

      {/* 5 Clean Navigation Tabs */}
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-5 bg-slate-900 p-1 rounded-2xl border border-slate-800 text-xs">
        {[
          { id: 'termly', label: '3-Day Championship 🏆', icon: Trophy },
          { id: 'schools', label: 'Inter-School League 🏫', icon: School },
          { id: 'weekly', label: 'Weekly Competition', icon: Timer },
          { id: 'spotlight', label: 'Student of the Week', icon: Crown },
          { id: 'prizes', label: 'Prize Vault 🎁', icon: Gift }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-2 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* TAB 1: 3-DAY TERMLY CHAMPIONSHIP                               */}
      {/* ============================================================== */}
      {activeTab === 'termly' && (
        <div className="space-y-4">
          {/* Tournament Overview Card */}
          <div className="bg-gradient-to-br from-amber-950/80 via-slate-900 to-indigo-950/70 border-2 border-amber-500/70 rounded-3xl p-4 sm:p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-950/90 px-2.5 py-1 rounded-full border border-amber-600/70 flex items-center gap-1.5 self-start">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>3-Day National Academic Championship</span>
              </span>

              <div className="flex items-center gap-2 text-xs text-slate-300">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Tailored to: <strong className="text-white">{studentClass} Scheme of Work</strong></span>
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                All-Nigeria 3-Stage Termly Examination Tournament
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                140 total questions administered across three sequential stages. Each contestant sits for papers specifically compiled from their exact class scheme of work and lesson notes.
              </p>
            </div>

            {/* 3 Tangible Physical Prizes Showcase */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* 1st Prize */}
              <div className="bg-gradient-to-b from-amber-500/20 to-slate-950/90 border border-amber-500/60 rounded-2xl p-3.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-950 px-2 py-0.5 rounded-full border border-amber-700">
                      1st Prize 🥇
                    </span>
                    <Smartphone className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="text-sm font-black text-white mt-2">Brand New Android Phone</h4>
                  <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                    6.5" HD+ Octa-core Android smartphone, 5000mAh battery, 4GB RAM + 64GB storage, preloaded with syllabus apps.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-amber-500/20 flex items-center justify-between text-[10px] font-mono text-amber-400">
                  <span>Prize Value</span>
                  <span className="font-bold"><NairaText amount={150000} /></span>
                </div>
              </div>

              {/* 2nd Prize */}
              <div className="bg-gradient-to-b from-slate-800/40 to-slate-950/90 border border-slate-700/60 rounded-2xl p-3.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-200 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-600">
                      2nd Prize 🥈
                    </span>
                    <Shirt className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h4 className="text-sm font-black text-white mt-2">Custom Scholar Hoodie</h4>
                  <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                    320 GSM premium heavyweight fleece custom embroidered with your official school crest and scholar title.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-700/40 flex items-center justify-between text-[10px] font-mono text-slate-300">
                  <span>Prize Value</span>
                  <span className="font-bold"><NairaText amount={35000} /></span>
                </div>
              </div>

              {/* 3rd Prize */}
              <div className="bg-gradient-to-b from-amber-900/30 to-slate-950/90 border border-amber-800/60 rounded-2xl p-3.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950 px-2 py-0.5 rounded-full border border-amber-800">
                      3rd Prize 🥉
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Backpack className="w-4 h-4" />
                      <Calculator className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-sm font-black text-white mt-2">School Bag & Calculator</h4>
                  <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                    Durable Oxford waterproof student backpack plus official Casio FX-991EX approved scientific calculator.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-amber-800/30 flex items-center justify-between text-[10px] font-mono text-amber-300">
                  <span>Prize Value</span>
                  <span className="font-bold"><NairaText amount={30000} /></span>
                </div>
              </div>
            </div>

            {/* Registration Banner & Escrow Fee */}
            <div className="bg-slate-950/90 rounded-2xl p-4 border border-amber-600/40 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    Tournament Registration & Escrow Protocol
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-xl font-black text-white">
                      <NairaText amount={TERMLY_REGISTRATION_FEE_NAIRA} />
                    </span>
                    <span className="text-xs text-slate-400">
                      (One-Time Entry for All 3 Days · Parent Escrow Wallet)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-emerald-400 font-semibold bg-emerald-950 px-2.5 py-1 rounded-xl border border-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{studentClass} Syllabus Track</span>
                  </span>
                </div>
              </div>

              {!regStatus ? (
                <div className="space-y-2 pt-1">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Parents authorize the <NairaText amount={10000} /> registration fee securely from their escrow wallet. Once approved, all 3 competition papers are unlocked in progressive order.
                  </p>
                  <button
                    onClick={requestChampionshipEntry}
                    className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Trophy className="w-4 h-4 fill-white" />
                    <span>Request Parent Approval for 3-Day Championship (<NairaText amount={10000} />)</span>
                  </button>
                </div>
              ) : regStatus === 'pending_parent' ? (
                <div className="bg-amber-950/50 border border-amber-600/70 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Awaiting Parent Escrow Approval</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Your request was recorded! Your guardian needs to log into the <strong>Parent Portal</strong> and authorize the <NairaText amount={10000} /> escrow payment.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => setCurrentRole('parent')}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Switch to Parent Portal to Authorize
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-950/40 border border-emerald-600/60 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Registration Active & Escrowed ({totalStagesCompleted}/3 Papers Completed)</span>
                  </div>
                  {currentStudentChampionship?.cumulativeScore !== undefined && (
                    <span className="text-xs font-mono font-bold text-amber-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      Score: {currentStudentChampionship.cumulativeScore}/140 ({currentStudentChampionship.cumulativePercentage}%)
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* 3-Day Sequential Progression Cards */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>3-Day Competition Schedule ({studentClass} Scheme of Work)</span>
                </span>
                <span className="text-[11px] text-slate-400 font-mono">Sequential Unlock</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* DAY 1: ENGLISH LANGUAGE */}
                <div className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isDay1Done
                    ? 'bg-emerald-950/30 border-emerald-600/70'
                    : regStatus === 'paid' || regStatus === 'completed'
                    ? 'bg-slate-950 border-amber-500/80 shadow-md ring-1 ring-amber-500/40'
                    : 'bg-slate-950/60 border-slate-800 opacity-70'
                }`}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                        Day 1
                      </span>
                      <span className="text-[10px] font-mono text-slate-300 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>30 Mins</span>
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white">English Language</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                        60 questions · Lexis & Structure, Concord, Comprehension & Vocabulary.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    {isDay1Done ? (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Completed
                        </span>
                        <span className="font-mono font-bold text-white">
                          {stageResults[1]?.score}/60 ({stageResults[1]?.scorePercentage}%)
                        </span>
                      </div>
                    ) : regStatus === 'paid' || regStatus === 'completed' ? (
                      <button
                        onClick={() => handleLaunchStageExam(1)}
                        className="w-full py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Write Day 1 Paper</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Register to Unlock</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* DAY 2: MATHEMATICS */}
                <div className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isDay2Done
                    ? 'bg-emerald-950/30 border-emerald-600/70'
                    : isDay1Done
                    ? 'bg-slate-950 border-amber-500/80 shadow-md ring-1 ring-amber-500/40'
                    : 'bg-slate-950/60 border-slate-800 opacity-60'
                }`}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                        Day 2
                      </span>
                      <span className="text-[10px] font-mono text-slate-300 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>27 Mins</span>
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white">Mathematics</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                        40 questions · Arithmetic, Algebra, Geometry & Applied Word Problems.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    {isDay2Done ? (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Completed
                        </span>
                        <span className="font-mono font-bold text-white">
                          {stageResults[2]?.score}/40 ({stageResults[2]?.scorePercentage}%)
                        </span>
                      </div>
                    ) : isDay1Done ? (
                      <button
                        onClick={() => handleLaunchStageExam(2)}
                        className="w-full py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Write Day 2 Paper</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Unlocks after Day 1</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* DAY 3: GENERAL PAPER */}
                <div className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isDay3Done
                    ? 'bg-emerald-950/30 border-emerald-600/70'
                    : isDay2Done
                    ? 'bg-slate-950 border-amber-500/80 shadow-md ring-1 ring-amber-500/40'
                    : 'bg-slate-950/60 border-slate-800 opacity-60'
                }`}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                        Day 3
                      </span>
                      <span className="text-[10px] font-mono text-slate-300 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>27 Mins</span>
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white">General Paper</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                        40 questions · Sciences, Civic Education, Economics & General Knowledge.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    {isDay3Done ? (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Completed
                        </span>
                        <span className="font-mono font-bold text-white">
                          {stageResults[3]?.score}/40 ({stageResults[3]?.scorePercentage}%)
                        </span>
                      </div>
                    ) : isDay2Done ? (
                      <button
                        onClick={() => handleLaunchStageExam(3)}
                        className="w-full py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Write Day 3 Paper</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Unlocks after Day 2</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dual Leaderboard: National Champions Podium & Class Division Tabs */}
          <div className="bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Medal className="w-4 h-4 text-amber-400" />
                  <span>Championship Standings & Prize Positions</span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  Switch between National Champions Podium and exact class-by-class standings.
                </p>
              </div>

              {/* View Switcher Controls */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <button
                  onClick={() => setLeaderboardView('national')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    leaderboardView === 'national'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  🏆 National Podium
                </button>

                {ALL_CLASSES.map(cls => (
                  <button
                    key={cls}
                    onClick={() => setLeaderboardView(cls)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      leaderboardView === cls
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>

            {/* Standings List */}
            <div className="space-y-2">
              {filteredLeaderboard.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs bg-slate-950/40 rounded-2xl border border-slate-800">
                  No registered submissions for {leaderboardView === 'national' ? 'the National Pool' : leaderboardView} yet. Be the first to claim 1st place!
                </div>
              ) : (
                filteredLeaderboard.map((item, idx) => {
                  const rank = idx + 1;
                  const isCurrentStudent = item.studentName.toLowerCase().includes(studentName.toLowerCase().split(' ')[0]);

                  const prizeLabel =
                    leaderboardView === 'national'
                      ? rank === 1
                        ? '🥇 1st: Android Phone'
                        : rank === 2
                        ? '🥈 2nd: Scholar Hoodie'
                        : rank === 3
                        ? '🥉 3rd: School Bag + Calc'
                        : null
                      : rank === 1
                      ? '🥇 Class Leader'
                      : null;

                  const cumulativeScore = item.cumulativeScore ?? Math.round(((item.score || 0) / 100) * 140);
                  const cumulativePct = item.cumulativePercentage ?? item.score ?? 0;
                  const timeSpent = item.cumulativeTimeSpentSeconds ?? item.timeSpentSeconds;

                  return (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs transition-all ${
                        rank === 1
                          ? 'bg-amber-950/40 border-amber-500/70 shadow-sm'
                          : rank === 2
                          ? 'bg-slate-800/40 border-slate-600/70'
                          : rank === 3
                          ? 'bg-amber-900/30 border-amber-800/60'
                          : isCurrentStudent
                          ? 'bg-emerald-950/40 border-emerald-500/70'
                          : 'bg-slate-950 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black font-mono shrink-0 ${
                            rank === 1
                              ? 'bg-amber-400 text-slate-950 shadow-md'
                              : rank === 2
                              ? 'bg-slate-200 text-slate-950'
                              : rank === 3
                              ? 'bg-amber-700 text-white'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {rank}
                        </span>

                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-white text-xs">{item.studentName}</span>
                            {isCurrentStudent && (
                              <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950 px-1.5 rounded border border-emerald-800">
                                You
                              </span>
                            )}
                            {prizeLabel && (
                              <span className="text-[9px] font-black text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-700">
                                {prizeLabel}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {item.studentSchool} · <strong className="text-slate-300">{item.classLevel}</strong>
                          </p>
                        </div>
                      </div>

                      <div className="text-right font-mono shrink-0 ml-2">
                        <span className="font-bold text-emerald-400 text-sm block">
                          {cumulativeScore}/140 ({cumulativePct}%)
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {formatSeconds(timeSpent)}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: TERMLY INTER-SCHOOL LEAGUE (RANKED BY STUDENT XP)       */}
      {/* ============================================================== */}
      {activeTab === 'schools' && (
        <div className="space-y-4">
          <div className="bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <School className="w-5 h-5 text-indigo-400" />
                  <span>Term 2 National Inter-School Championship</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Secondary schools across Nigeria battle for the prestigious Termly Gold Cup and STEM Lab Grants based on the aggregate XP points and quiz accuracies of their registered students.
                </p>
              </div>
              <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950 px-2.5 py-1 rounded-full border border-indigo-800 shrink-0 self-start">
                Term 2 Week 8
              </span>
            </div>

            {/* Student's School Performance Highlight */}
            <div className="bg-gradient-to-r from-indigo-950/60 via-slate-950 to-indigo-950/40 border border-indigo-500/60 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">
                  Your Institution's Standing
                </span>
                <h4 className="text-sm font-black text-white mt-0.5">{studentSchool}</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Your daily syllabus drills, CBT tests, and championship exams boost your school's score!
                </p>
              </div>

              <div className="flex items-center gap-3 text-right">
                <div className="bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">School Rank</span>
                  <span className="text-sm font-black text-amber-400 font-mono">Rank #1</span>
                </div>
                <div className="bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Aggregate Points</span>
                  <span className="text-sm font-black text-emerald-400 font-mono">42,850 pts</span>
                </div>
              </div>
            </div>

            {/* National School League Standings Table */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-white px-1">
                <span>All-Nigeria School League Table</span>
                <span className="text-[10px] text-slate-400 font-mono">Ranked by Total Student XP</span>
              </div>

              <div className="space-y-2">
                {SCHOOL_LEADERBOARD_DATA.map(sch => {
                  const isUserSchool =
                    sch.schoolName.toLowerCase().includes(studentSchool.toLowerCase()) ||
                    (studentSchool === 'Secondary School' && sch.rank === 1);

                  return (
                    <div
                      key={sch.rank}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs transition-all ${
                        sch.rank === 1
                          ? 'bg-amber-950/40 border-amber-500/70 shadow-sm'
                          : isUserSchool
                          ? 'bg-indigo-950/40 border-indigo-500/70 shadow-sm'
                          : 'bg-slate-950 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black font-mono shrink-0 ${
                            sch.rank === 1
                              ? 'bg-amber-500 text-slate-950 shadow-md'
                              : sch.rank === 2
                              ? 'bg-slate-300 text-slate-950'
                              : sch.rank === 3
                              ? 'bg-amber-700 text-white'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {sch.rank}
                        </span>

                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-white text-xs">{sch.schoolName}</span>
                            {isUserSchool && (
                              <span className="text-[9px] font-bold text-indigo-300 bg-indigo-950 px-1.5 rounded border border-indigo-700">
                                Your School
                              </span>
                            )}
                            {sch.rank === 1 && (
                              <span className="text-[9px] font-bold text-amber-400 bg-amber-950 px-1.5 rounded border border-amber-800">
                                🏆 Gold Cup Leader
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {sch.state} State · {sch.studentCount} Contributing Scholars · {sch.averageAccuracy}% Avg Accuracy
                          </p>
                        </div>
                      </div>

                      <div className="text-right font-mono shrink-0 ml-2">
                        <span className="font-bold text-emerald-400 text-sm block">
                          {sch.totalPoints.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400">Total Points</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Intra-Class Tournament Standings Card */}
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Termly Intra-Class Competition ({studentClass})</span>
              </h4>
              <span className="text-[10px] text-emerald-400 font-semibold">{studentSchool}</span>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between items-center text-slate-300">
                <span>Class Average CBT Accuracy:</span>
                <span className="font-mono font-bold text-white">84.2%</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>State Cohort Standing:</span>
                <span className="font-mono font-bold text-amber-400">#2 across Lagos State Secondary Schools</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Inter-Class Grand Reward:</span>
                <span className="text-emerald-400 font-semibold">Gold Cup Trophy & ₦500,000 School STEM Lab Grant</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: WEEKLY COMPETITIONS                                     */}
      {/* ============================================================== */}
      {activeTab === 'weekly' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-amber-950/80 via-slate-900 to-slate-900 border border-amber-600/60 rounded-3xl p-4 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                Week 8 National Challenge
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-300 font-mono">
                <Timer className="w-3.5 h-3.5" />
                <span>Closes in 2d 14h 20m</span>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                All-Nigeria Secondary School Speed Championship
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                10-question timed speed drill covering General Mathematics, English Concord & Natural Sciences. Top 3 students win airtime credited immediately to registered parent line!
              </p>
            </div>

            <div className="bg-slate-950/80 rounded-2xl p-3 border border-amber-800/40 space-y-1.5">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5" />
                <span>Weekly Prize Pool: <NairaText amount={50000} /> Airtime + Swag</span>
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                  <span className="text-amber-400 font-bold block text-xs">🥇 1st Place</span>
                  <span className="text-[11px] text-white"><NairaText amount={30000} /> + Hoodie</span>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                  <span className="text-slate-300 font-bold block text-xs">🥈 2nd Place</span>
                  <span className="text-[11px] text-white"><NairaText amount={15000} /> Airtime</span>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                  <span className="text-amber-600 font-bold block text-xs">🥉 3rd Place</span>
                  <span className="text-[11px] text-white"><NairaText amount={5000} /> Airtime</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/90 rounded-2xl p-3 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Your Weekly Drill Status:</span>
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>14th Place · 1,240 Participants</span>
                </span>
              </div>

              {!hasEnteredThisWeek ? (
                <button
                  onClick={handleQuickClaimBonus}
                  className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                >
                  Check In (+250 XP)
                </button>
              ) : (
                <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Checked In!</span>
                </span>
              )}
            </div>

            <button
              onClick={handleEnterWeeklyChallenge}
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white text-xs font-bold rounded-2xl transition-all shadow-lg shadow-amber-950/60 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Take Week 8 Competition Quiz Now (+700 XP)</span>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: STUDENT OF THE WEEK SPOTLIGHT                           */}
      {/* ============================================================== */}
      {activeTab === 'spotlight' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-amber-950/70 via-slate-900 to-slate-900 border border-amber-500/70 rounded-3xl p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800 flex items-center gap-1">
                <Crown className="w-3 h-3 text-amber-400" />
                <span>Student of the Week Competition</span>
              </span>
              <span className="text-[10px] text-amber-300 font-mono">Week 8 Contender</span>
            </div>

            <div className="flex items-center gap-3.5">
              {student.uniformPhotoUrl ? (
                <img
                  src={student.uniformPhotoUrl}
                  alt={studentName}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-500 shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-600 via-amber-700 to-emerald-900 flex items-center justify-center text-white font-black text-base ring-2 ring-amber-500 shadow-inner shrink-0">
                  {getInitials(studentName)}
                </div>
              )}
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{studentName}</span>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800">
                    {student.rank}
                  </span>
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  {studentSchool} · {student.classLevel} ({student.stream})
                </p>
                <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mt-1">
                  <span>{student.xp.toLocaleString()} XP</span>
                  <span>·</span>
                  <span>{student.streakDays}-Day Streak 🔥</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-slate-950/70 p-3 rounded-2xl border border-amber-900/40 leading-relaxed">
              Earn XP across your curriculum topics and timed CBT exams this week to climb the national standings and win the <NairaText amount={50000} /> weekly Student of the Week reward!
            </p>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: PRIZE VAULT                                             */}
      {/* ============================================================== */}
      {activeTab === 'prizes' && (
        <div className="space-y-4">
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Gift className="w-4 h-4 text-amber-400" />
                <span>Termly Championship Physical Hardware & Rewards</span>
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Prizes won in the 3-Day Termly Championship are physically dispatched to your school or home address with registered courier tracking.
              </p>
            </div>

            <div className="space-y-3">
              {TERMLY_CHAMPIONSHIP_PRIZES.map(prize => (
                <div
                  key={prize.rank}
                  className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      {prize.rank === 1 && <Smartphone className="w-4 h-4" />}
                      {prize.rank === 2 && <Shirt className="w-4 h-4" />}
                      {prize.rank === 3 && <Backpack className="w-4 h-4" />}
                      <span>{prize.badge} — {prize.title}</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-white">
                      <NairaText amount={prize.valueNaira} />
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 font-semibold">{prize.subtitle}</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{prize.specification}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Fair Play & Uniform Verification</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  To ensure 100% fair play, physical prizes (Android Smartphone, Hoodie, Backpack) require a verified school uniform selfie match before dispatch.
                </p>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-400">
                  <Award className="w-4 h-4" />
                  <span>Doorstep Courier Delivery Across All 36 States</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Winners receive their merchandise within 5 business days of the termly leaderboard finalization. Parents receive shipping tracking codes directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TIMED STAGE EXAM MODAL (DAY 1, 2, OR 3)                        */}
      {/* ============================================================== */}
      {isExamModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="w-full max-w-2xl bg-slate-900 border-2 border-amber-500 rounded-3xl p-5 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{CHAMPIONSHIP_DAYS_CONFIG[activeExamDay].title}</span>
                    <span className="text-[10px] text-amber-400 bg-amber-950 px-1.5 py-0.5 rounded border border-amber-800">
                      {studentClass}
                    </span>
                  </h3>
                  <span className="text-[10px] text-slate-400">
                    Question {currentQuestionIndex + 1} of {activeQuestions.length}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-1 font-mono text-xs px-2.5 py-1 rounded-xl border ${
                  examSecondsLeft < 180
                    ? 'bg-rose-950/80 text-rose-300 border-rose-600 animate-pulse'
                    : 'bg-slate-950 text-amber-400 border-slate-800'
                }`}>
                  <Timer className="w-3.5 h-3.5" />
                  <span className="font-bold">{formatSeconds(examSecondsLeft)}</span>
                </div>

                {!isExamSubmitted && (
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to exit? Your exam attempt for today will be submitted with your current progress.')) {
                        handleFinalizeStageExam();
                      }
                    }}
                    className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {!isExamSubmitted && activeQuestions.length > 0 ? (
                <div className="space-y-4">
                  {/* Current Question */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-amber-400 font-semibold">
                      <span>Subject: {activeQuestions[currentQuestionIndex].subject}</span>
                      <span className="text-slate-400">Class: {studentClass} Scheme</span>
                    </div>
                    <p className="text-sm font-medium text-white leading-relaxed">
                      {activeQuestions[currentQuestionIndex].question}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-2">
                    {activeQuestions[currentQuestionIndex].options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(currentQuestionIndex, optIdx)}
                          className={`w-full p-3.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-amber-600/30 border-amber-500 text-white shadow-sm'
                              : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Quick Jump Palette */}
                  <div className="pt-2">
                    <span className="text-[10px] text-slate-400 block mb-1.5">
                      Question Palette ({Object.keys(selectedAnswers).length}/{activeQuestions.length} answered)
                    </span>
                    <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-1 bg-slate-950 rounded-xl border border-slate-800">
                      {activeQuestions.map((_, dotIdx) => {
                        const isAnswered = selectedAnswers[dotIdx] !== undefined;
                        const isCurrent = dotIdx === currentQuestionIndex;
                        return (
                          <button
                            key={dotIdx}
                            onClick={() => setCurrentQuestionIndex(dotIdx)}
                            className={`w-6 h-6 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-amber-500 text-slate-950 ring-2 ring-white'
                                : isAnswered
                                ? 'bg-emerald-600/70 text-white'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {dotIdx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                /* Completed Stage Screen */
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-lg">
                    <Trophy className="w-8 h-8" />
                  </div>

                  <div>
                    <h4 className="text-lg font-black text-white">
                      Day {stageScoreResult?.day} Examination Completed!
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      {stageScoreResult?.day === 3
                        ? 'Congratulations! You have completed all 3 days of the Championship.'
                        : `Great job! Day ${stageScoreResult?.day} results are recorded. Day ${(stageScoreResult?.day || 1) + 1} is now unlocked.`}
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 max-w-sm mx-auto space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Day {stageScoreResult?.day} Score:</span>
                      <span className="font-mono font-black text-emerald-400 text-base">
                        {stageScoreResult?.score} / {stageScoreResult?.total} ({stageScoreResult?.percentage}%)
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Time Taken:</span>
                      <span className="font-mono font-bold text-white">
                        {formatSeconds(stageScoreResult?.timeSpent)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Curriculum Scheme:</span>
                      <span className="font-bold text-amber-400">
                        {studentClass} Official Scheme
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-amber-300">
                    Your cumulative score is updated on both the National Podium and your {studentClass} Class Standings!
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
              {!isExamSubmitted ? (
                <>
                  <button
                    onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Previous
                  </button>

                  {currentQuestionIndex < activeQuestions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => Math.min(activeQuestions.length - 1, prev + 1))}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleFinalizeStageExam}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950/60 cursor-pointer transition-colors"
                    >
                      Submit Day {activeExamDay} Paper
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={() => setIsExamModalOpen(false)}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
                >
                  Return to Tournament Standings
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
