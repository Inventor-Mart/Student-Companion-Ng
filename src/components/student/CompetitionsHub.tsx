import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CBT_EXAMS_DATABASE } from '../../data/cbtExamData';
import { STUDENT_LEADERBOARD_DATA, SCHOOL_LEADERBOARD_DATA } from '../../data/leaderboardData';
import {
  TERMLY_CHAMPIONSHIP_PRIZES,
  TERMLY_REGISTRATION_FEE_NAIRA,
  JUNIOR_CHAMPIONSHIP_QUESTIONS,
  SENIOR_CHAMPIONSHIP_QUESTIONS,
  ChampionshipExamQuestion
} from '../../data/competitionPrizesData';
import { ChampionshipTier } from '../../types';
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
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { NairaText, NairaSign } from '../../utils/currency';

export const CompetitionsHub: React.FC = () => {
  const {
    student,
    currentUserProfile,
    startExam,
    addStudentXP,
    championshipRegistrations,
    currentStudentChampionship,
    requestChampionshipEntry,
    submitChampionshipExamResult,
    setCurrentRole
  } = useApp();

  const [activeTab, setActiveTab] = useState<'weekly' | 'termly' | 'spotlight' | 'prizes'>('termly');
  const [hasEnteredThisWeek, setHasEnteredThisWeek] = useState<boolean>(false);

  // Student default tier
  const studentTier: ChampionshipTier = student.classLevel.startsWith('JSS') ? 'junior' : 'senior';
  const [selectedLeaderboardTier, setSelectedLeaderboardTier] = useState<ChampionshipTier>(studentTier);

  // Championship Exam Modal state
  const [isExamModalOpen, setIsExamModalOpen] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [examSecondsLeft, setExamSecondsLeft] = useState<number>(600); // 10 minutes
  const [isExamSubmitted, setIsExamSubmitted] = useState<boolean>(false);
  const [examScoreResult, setExamScoreResult] = useState<{ score: number; total: number; timeSpent: number } | null>(null);

  const studentName = student.name || currentUserProfile?.fullName || 'Registered Student';
  const studentSchool = student.school || 'Secondary School';

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

  // Questions for current exam
  const championshipQuestions: ChampionshipExamQuestion[] =
    studentTier === 'junior' ? JUNIOR_CHAMPIONSHIP_QUESTIONS : SENIOR_CHAMPIONSHIP_QUESTIONS;

  // Timer countdown effect for championship exam
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isExamModalOpen && !isExamSubmitted && examSecondsLeft > 0) {
      timer = setInterval(() => {
        setExamSecondsLeft(prev => {
          if (prev <= 1) {
            handleAutoSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isExamModalOpen, isExamSubmitted, examSecondsLeft]);

  const handleStartChampionshipExam = () => {
    setIsExamModalOpen(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setExamSecondsLeft(600);
    setIsExamSubmitted(false);
    setExamScoreResult(null);
  };

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (isExamSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleAutoSubmitExam = () => {
    handleFinalizeChampionshipExam();
  };

  const handleFinalizeChampionshipExam = () => {
    if (isExamSubmitted) return;
    setIsExamSubmitted(true);

    const timeSpent = Math.max(10, 600 - examSecondsLeft);
    let correctCount = 0;
    championshipQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        correctCount += 1;
      }
    });

    const scorePercentage = Math.round((correctCount / championshipQuestions.length) * 100);

    setExamScoreResult({
      score: scorePercentage,
      total: championshipQuestions.length,
      timeSpent
    });

    // Submit into context and storage
    submitChampionshipExamResult(scorePercentage, championshipQuestions.length, timeSpent);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  // Filter leaderboard for selected tier
  const tierLeaderboard = championshipRegistrations
    .filter(r => r.tier === selectedLeaderboardTier && r.status === 'completed' && r.score !== undefined)
    .sort((a, b) => {
      if ((b.score || 0) !== (a.score || 0)) {
        return (b.score || 0) - (a.score || 0);
      }
      return (a.timeSpentSeconds || 9999) - (b.timeSpentSeconds || 9999);
    });

  const formatSeconds = (sec?: number) => {
    if (!sec) return '00:00';
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-4 touch-pan-y text-slate-100">
      {/* Header */}
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
                Official Termly Championships & Weekly Speed Challenges
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800 animate-pulse flex items-center gap-1">
            📱 1st Prize: Android Phone
          </span>
        </div>
      </div>

      {/* 4 Clear Tabs */}
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 bg-slate-900 p-1 rounded-2xl border border-slate-800 text-xs">
        {[
          { id: 'termly', label: 'Termly Championship 🏆', icon: School },
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
      {/* TAB 1: TERMLY CHAMPIONSHIPS & PHYSICAL PRIZES (PRIMARY FOCUS)  */}
      {/* ============================================================== */}
      {activeTab === 'termly' && (
        <div className="space-y-4">
          {/* Grand Termly Banner */}
          <div className="relative overflow-hidden bg-gradient-to-br from-amber-950 via-slate-900 to-indigo-950 border-2 border-amber-500/70 rounded-3xl p-4 sm:p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-950/90 px-2.5 py-1 rounded-full border border-amber-600/70 flex items-center gap-1.5 shadow-sm">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Term 2 All-Nigeria Championship</span>
              </span>
              <span className="text-[10px] font-mono text-amber-200 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>Registration Open</span>
              </span>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                National Student Termly Academic Grand Slam
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Compete against Nigeria’s finest scholars in a high-stakes 10-question timed championship exam. Win physical hardware, academic equipment, and prestigious national trophies!
              </p>
            </div>

            {/* 3 Physical Tangible Prizes Showcase */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {/* 1st Prize: Android Phone */}
              <div className="bg-gradient-to-b from-amber-500/20 to-slate-950/80 border border-amber-500/60 rounded-2xl p-3.5 relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-950 px-2 py-0.5 rounded-full border border-amber-700">
                      1st Prize 🥇
                    </span>
                    <Smartphone className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="text-sm font-black text-white mt-1">Brand New Android Smartphone</h4>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    6.5" HD+ Octa-core Android phone, 5000mAh battery, 4GB RAM + 64GB storage, pre-loaded with Nigerian offline syllabus apps.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-amber-500/20 flex items-center justify-between text-[10px] font-mono text-amber-400">
                  <span>Valued at</span>
                  <span className="font-bold"><NairaText amount={150000} /></span>
                </div>
              </div>

              {/* 2nd Prize: Custom Hoodie */}
              <div className="bg-gradient-to-b from-slate-800/40 to-slate-950/80 border border-slate-700/60 rounded-2xl p-3.5 relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-200 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-600">
                      2nd Prize 🥈
                    </span>
                    <Shirt className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h4 className="text-sm font-black text-white mt-1">Custom Scholar Heavy Hoodie</h4>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    320 GSM premium winter fleece heavyweight hoodie with custom embroidered scholar name, student initials & school crest.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-700/40 flex items-center justify-between text-[10px] font-mono text-slate-300">
                  <span>Valued at</span>
                  <span className="font-bold"><NairaText amount={35000} /></span>
                </div>
              </div>

              {/* 3rd Prize: School Bag & Scientific Calculator */}
              <div className="bg-gradient-to-b from-amber-900/30 to-slate-950/80 border border-amber-800/60 rounded-2xl p-3.5 relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950 px-2 py-0.5 rounded-full border border-amber-800">
                      3rd Prize 🥉
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Backpack className="w-4 h-4" />
                      <Calculator className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-sm font-black text-white mt-1">School Bag & Calculator</h4>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    Heavy-duty Oxford waterproof student backpack plus official Casio FX-991EX approved scientific calculator.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-amber-800/30 flex items-center justify-between text-[10px] font-mono text-amber-300">
                  <span>Valued at</span>
                  <span className="font-bold"><NairaText amount={30000} /></span>
                </div>
              </div>
            </div>

            {/* Registration Fee & Action Status Card */}
            <div className="bg-slate-950/90 rounded-2xl p-4 border border-amber-600/40 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    Championship Entry Fee & Access Model
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-xl font-black text-white">
                      <NairaText amount={TERMLY_REGISTRATION_FEE_NAIRA} />
                    </span>
                    <span className="text-xs text-slate-400">
                      (One-Time Termly Registration · Parent Escrow Approved)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-slate-300 bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-800">
                    Your Tier: <strong className="text-amber-400">{studentTier === 'junior' ? 'Junior (JSS 1-3)' : 'Senior (SS 1-3)'}</strong>
                  </span>
                </div>
              </div>

              {/* Status conditional rendering */}
              {!currentStudentChampionship ? (
                <div className="space-y-2 pt-1">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    To ensure parental consent and child protection, the <NairaText amount={10000} /> entry fee is authorized directly by your parent/guardian from their secure escrow wallet.
                  </p>
                  <button
                    onClick={requestChampionshipEntry}
                    className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Trophy className="w-4 h-4 fill-white" />
                    <span>Register for Termly Championship (<NairaText amount={10000} />)</span>
                  </button>
                </div>
              ) : currentStudentChampionship.status === 'pending_parent' ? (
                <div className="bg-amber-950/50 border border-amber-600/70 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Awaiting Parent Escrow Approval</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Your entry request has been transmitted! Your parent or guardian needs to log into their <strong>Parent Portal</strong> and authorize the <NairaText amount={10000} /> escrow payment.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => setCurrentRole('parent')}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Switch to Parent Portal to Approve
                    </button>
                    <span className="text-[10px] text-slate-400">
                      (Or remind your parent via phone/SMS)
                    </span>
                  </div>
                </div>
              ) : currentStudentChampionship.status === 'paid' ? (
                <div className="bg-emerald-950/50 border border-emerald-600/70 rounded-xl p-3.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Registration Approved & Escrowed! Exam Unlocked</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">10 Questions · 10 Mins</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Your <NairaText amount={10000} /> entry was successfully authorized. You have 1 attempt to take the timed championship exam for your division ({studentTier.toUpperCase()} TIER).
                  </p>
                  <button
                    onClick={handleStartChampionshipExam}
                    className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Start Championship Exam Now ({studentTier === 'junior' ? 'Junior' : 'Senior'} Tier)</span>
                  </button>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/60 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                      <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Championship Exam Completed!</span>
                    </div>
                    <span className="text-xs font-black font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      Score: {currentStudentChampionship.score}% ({formatSeconds(currentStudentChampionship.timeSpentSeconds)})
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Great performance! Your score has been officially entered into the national leaderboard below. Top 3 students will be contacted for physical prize delivery (Android Phone, Hoodie, Backpack).
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Division Tier Switcher & Live Leaderboard */}
          <div className="bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Medal className="w-4 h-4 text-amber-400" />
                  <span>National Termly Standings & Prize Positions</span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  Separated into Junior and Senior divisions so competitors race against their academic peers.
                </p>
              </div>

              {/* Junior vs Senior Switcher */}
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs self-start">
                <button
                  onClick={() => setSelectedLeaderboardTier('junior')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedLeaderboardTier === 'junior'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Junior Tier (JSS 1–3)
                </button>
                <button
                  onClick={() => setSelectedLeaderboardTier('senior')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedLeaderboardTier === 'senior'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Senior Tier (SS 1–3)
                </button>
              </div>
            </div>

            {/* Standings Table */}
            <div className="space-y-2">
              {tierLeaderboard.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No completed submissions for this tier yet. Be the first to claim 1st place!
                </div>
              ) : (
                tierLeaderboard.map((item, idx) => {
                  const rank = idx + 1;
                  const isCurrentStudent = item.studentName.toLowerCase().includes(studentName.toLowerCase().split(' ')[0]);

                  const prizeLabel =
                    rank === 1
                      ? '🥇 1st: Android Phone'
                      : rank === 2
                      ? '🥈 2nd: Scholar Hoodie'
                      : rank === 3
                      ? '🥉 3rd: School Bag + Calc'
                      : null;

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
                            {item.studentSchool} · {item.classLevel}
                          </p>
                        </div>
                      </div>

                      <div className="text-right font-mono shrink-0 ml-2">
                        <span className="font-bold text-emerald-400 text-sm block">
                          {item.score}%
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {formatSeconds(item.timeSpentSeconds)}
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
      {/* TAB 2: WEEKLY COMPETITIONS                                     */}
      {/* ============================================================== */}
      {activeTab === 'weekly' && (
        <div className="space-y-4">
          {/* Active Weekly Challenge Hero Card */}
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

            {/* Prize Purse Callout */}
            <div className="bg-slate-950/80 rounded-2xl p-3 border border-amber-800/40 space-y-1.5">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5" />
                <span className="flex items-center gap-1">
                  Weekly Prize Pool: <NairaText amount={50000} /> Airtime + Swag
                </span>
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                  <span className="text-amber-400 font-bold block text-xs">🥇 1st Place</span>
                  <span className="text-[11px] text-white">
                    <NairaText amount={30000} /> + Hoodie
                  </span>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                  <span className="text-slate-300 font-bold block text-xs">🥈 2nd Place</span>
                  <span className="text-[11px] text-white">
                    <NairaText amount={15000} /> Airtime
                  </span>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                  <span className="text-amber-600 font-bold block text-xs">🥉 3rd Place</span>
                  <span className="text-[11px] text-white">
                    <NairaText amount={5000} /> Airtime
                  </span>
                </div>
              </div>
            </div>

            {/* Participation Status */}
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

          {/* Quick Weekly Leaderboard Preview */}
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Medal className="w-4 h-4 text-amber-400" />
                <span>Live Week 8 Leaderboard</span>
              </div>
              <button
                onClick={() => setActiveTab('spotlight')}
                className="text-[11px] text-amber-400 hover:underline"
              >
                View Full Hall of Fame
              </button>
            </div>

            <div className="space-y-2">
              {STUDENT_LEADERBOARD_DATA.slice(0, 3).map(std => (
                <div
                  key={std.rank}
                  className="p-3 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                        std.rank === 1
                          ? 'bg-amber-500 text-slate-950'
                          : std.rank === 2
                          ? 'bg-slate-300 text-slate-950'
                          : 'bg-amber-700 text-white'
                      }`}
                    >
                      {std.rank}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white">{std.name}</span>
                        {std.rank === 1 && (
                          <span className="text-[9px] font-bold text-amber-400 bg-amber-950 px-1 rounded border border-amber-800">
                            Leader
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {std.school} · {std.classLevel}
                      </span>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <span className="font-bold text-emerald-400 block">{std.xp.toLocaleString()} XP</span>
                    <span className="text-[10px] text-amber-400">{std.streak}d streak 🔥</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: STUDENT OF THE WEEK SPOTLIGHT                           */}
      {/* ============================================================== */}
      {activeTab === 'spotlight' && (
        <div className="space-y-4">
          {/* Spotlight Hero Card */}
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
                  <span>·</span>
                  <span className="text-emerald-400 font-semibold">Active Contender</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-slate-950/70 p-3 rounded-2xl border border-amber-900/40 leading-relaxed">
              Earn XP across your curriculum topics and timed CBT exams this week to climb the national standings and win the <NairaText amount={50000} /> weekly Student of the Week reward!
            </p>
          </div>

          {/* Full National Leaderboard Table */}
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">All-Nigeria Top 5 Contenders</span>
              <span className="text-[10px] text-slate-400 font-mono">Refreshed Hourly</span>
            </div>

            <div className="space-y-2">
              {STUDENT_LEADERBOARD_DATA.map(std => {
                const isMe = std.name.includes(student.name.split(' ')[0]);
                return (
                  <div
                    key={std.rank}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                      std.rank === 1
                        ? 'bg-amber-950/30 border-amber-700/60 shadow-sm'
                        : isMe
                        ? 'bg-emerald-950/30 border-emerald-700/60'
                        : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                          std.rank === 1
                            ? 'bg-amber-500 text-slate-950'
                            : std.rank === 2
                            ? 'bg-slate-300 text-slate-950'
                            : std.rank === 3
                            ? 'bg-amber-700 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {std.rank}
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-white">{std.name}</span>
                          {std.rank === 1 && (
                            <span className="text-[9px] font-bold text-amber-400 bg-amber-950 px-1 rounded border border-amber-800">
                              Top Scholar 👑
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {std.school} · {std.classLevel}
                        </span>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <span className="font-bold text-emerald-400 block">{std.xp.toLocaleString()} XP</span>
                      <span className="text-[10px] text-amber-400">{std.streak}d streak 🔥</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: PRIZE VAULT (PHYSICAL & MONETARY BREAKDOWN)             */}
      {/* ============================================================== */}
      {activeTab === 'prizes' && (
        <div className="space-y-4">
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Gift className="w-4 h-4 text-amber-400" />
                <span>Termly Physical Championship Hardware & Rewards</span>
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Prizes won in the Termly Championship are physically dispatched to your school or home address via courier with official tracking.
              </p>
            </div>

            {/* Detailed Cards for 3 Tangible Prizes */}
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
                  <span>Fair Play & Uniform Identity Verification</span>
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
      {/* TIMED CHAMPIONSHIP EXAM MODAL                                  */}
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
                    <span>Termly Championship Exam</span>
                    <span className="text-[10px] text-amber-400 bg-amber-950 px-1.5 py-0.5 rounded border border-amber-800">
                      {studentTier.toUpperCase()} TIER
                    </span>
                  </h3>
                  <span className="text-[10px] text-slate-400">
                    Question {currentQuestionIndex + 1} of {championshipQuestions.length}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-1 font-mono text-xs px-2.5 py-1 rounded-xl border ${
                  examSecondsLeft < 120
                    ? 'bg-rose-950/80 text-rose-300 border-rose-600 animate-pulse'
                    : 'bg-slate-950 text-amber-400 border-slate-800'
                }`}>
                  <Timer className="w-3.5 h-3.5" />
                  <span className="font-bold">{formatSeconds(examSecondsLeft)}</span>
                </div>

                {!isExamSubmitted && (
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to exit? Your exam attempt will be cancelled.')) {
                        setIsExamModalOpen(false);
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
              {!isExamSubmitted ? (
                <div className="space-y-4">
                  {/* Current Question */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-amber-400 font-semibold">
                      <span>Subject: {championshipQuestions[currentQuestionIndex].subject}</span>
                      <span className="text-slate-400">10 Marks</span>
                    </div>
                    <p className="text-sm font-medium text-white leading-relaxed">
                      {championshipQuestions[currentQuestionIndex].question}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-2">
                    {championshipQuestions[currentQuestionIndex].options.map((opt, optIdx) => {
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

                  {/* Question Quick Jump Dots */}
                  <div className="flex flex-wrap gap-1.5 pt-2 justify-center">
                    {championshipQuestions.map((_, dotIdx) => {
                      const isAnswered = selectedAnswers[dotIdx] !== undefined;
                      const isCurrent = dotIdx === currentQuestionIndex;
                      return (
                        <button
                          key={dotIdx}
                          onClick={() => setCurrentQuestionIndex(dotIdx)}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-amber-500 text-slate-950 ring-2 ring-white'
                              : isAnswered
                              ? 'bg-emerald-600/60 text-white border border-emerald-500'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {dotIdx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Completed Summary View */
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-lg">
                    <Trophy className="w-8 h-8" />
                  </div>

                  <div>
                    <h4 className="text-lg font-black text-white">Championship Exam Finished!</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Your answers have been scored and submitted to the national leaderboard.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 max-w-sm mx-auto space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Final Score:</span>
                      <span className="font-mono font-black text-emerald-400 text-base">
                        {examScoreResult?.score}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Time Taken:</span>
                      <span className="font-mono font-bold text-white">
                        {formatSeconds(examScoreResult?.timeSpent)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Championship Tier:</span>
                      <span className="font-bold text-amber-400 uppercase">
                        {studentTier} Tier
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-amber-300">
                    If your score ranks in the Top 3 upon term close, our team will contact your parent/guardian for your Android smartphone or custom merchandise!
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

                  {currentQuestionIndex < championshipQuestions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => Math.min(championshipQuestions.length - 1, prev + 1))}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleFinalizeChampionshipExam}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950/60 cursor-pointer transition-colors"
                    >
                      Submit Exam
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={() => setIsExamModalOpen(false)}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
                >
                  Return to Standings & Prize Vault
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
