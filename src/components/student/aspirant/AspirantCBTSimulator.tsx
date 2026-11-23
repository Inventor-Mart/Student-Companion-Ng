import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  fetchStoredAspirantMockExams,
  fetchCurrentWeeklyTournament,
  submitWeeklyTournamentScore,
} from '../../../services/aspirantMockService';
import { CBTExamResult, StoredMockExam, StoredMockQuestion } from '../../../types';
import { playSound, triggerHaptic } from '../../../utils/audioSynthesis';
import { AspirantSubscriptionModal } from './AspirantSubscriptionModal';
import { useActiveExamBackGuard, useBackHandler } from '../../../lib/backNavigation';
import { MathText } from '../../../utils/mathFormatter';
import {
  Timer,
  Flag,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  Award,
  Lock,
  BookOpen,
  Trophy,
  Calculator,
  X,
  CheckCircle2,
  ShieldCheck,
  Loader2,
  Database,
  Play,
  Layers,
} from 'lucide-react';
import confetti from 'canvas-confetti';

type BoardFilter = 'ALL' | 'JAMB' | 'WAEC' | 'NECO' | 'TOURNAMENT';

interface SubjectGroup {
  subject: string;
  questions: StoredMockQuestion[];
}

export const AspirantCBTSimulator: React.FC = () => {
  const {
    student,
    currentUser,
    aspirantGoal,
    isSuperAdmin,
    saveExamResult,
    addStudentXP,
    setActiveStudentTab,
    pendingTournamentExam,
    setPendingTournamentExam,
  } = useApp();

  const [storedExams, setStoredExams] = useState<StoredMockExam[]>([]);
  const [bankSource, setBankSource] = useState<'firestore' | 'server' | 'cache' | 'bundled'>('bundled');
  const [isLoadingBank, setIsLoadingBank] = useState<boolean>(true);
  const [boardFilter, setBoardFilter] = useState<BoardFilter>('ALL');

  // Active exam session state
  const [activePaper, setActivePaper] = useState<StoredMockExam | null>(null);
  const [activeTournamentMeta, setActiveTournamentMeta] = useState<{
    tournamentId: string;
    weekKey: string;
    title: string;
  } | null>(null);
  const [activeSubjectTab, setActiveSubjectTab] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());

  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isReviewMode, setIsReviewMode] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(7200);
  const [initialDurationSeconds, setInitialDurationSeconds] = useState<number>(7200);

  const [lastExamResult, setLastExamResult] = useState<{
    scaledScore: number;
    rawScore: number;
    totalQuestions: number;
    percentage: number;
    tournamentRank?: number | null;
    tournamentSubmitError?: string | null;
  } | null>(null);

  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState<boolean>(false);
  const [lockedFeatureTitle, setLockedFeatureTitle] = useState<string>('Unlock All Complete Mock Exams');
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [calcDisplay, setCalcDisplay] = useState<string>('0');
  const [tournamentBooting, setTournamentBooting] = useState<boolean>(false);
  const [tournamentBootError, setTournamentBootError] = useState<string | null>(null);

  const submittedOnceRef = useRef<boolean>(false);

  const currentTier = aspirantGoal.tier || 'free';
  const isPaidAspirant = isSuperAdmin || currentTier === 'basic' || currentTier === 'elite';

  useBackHandler(
    isSubscriptionModalOpen,
    () => setIsSubscriptionModalOpen(false),
    'aspirant-cbt-upgrade-modal'
  );
  useBackHandler(
    showCalculator,
    () => setShowCalculator(false),
    'aspirant-cbt-calculator'
  );
  useBackHandler(
    isSubmitted,
    () => {
      setIsSubmitted(false);
      setIsTestActive(false);
      setIsReviewMode(false);
      setActivePaper(null);
      setActiveTournamentMeta(null);
    },
    'aspirant-cbt-results'
  );
  useActiveExamBackGuard(
    isTestActive && !isSubmitted,
    activePaper?.title || 'Authentic Mock CBT Simulator',
    () => {
      setIsTestActive(false);
      setIsSubmitted(false);
      setIsReviewMode(false);
      setActivePaper(null);
      setActiveTournamentMeta(null);
      setPendingTournamentExam(null);
    }
  );

  // Load permanent stored 6 starter mocks + archived weekly tournament papers (never regenerates)
  useEffect(() => {
    let cancelled = false;
    setIsLoadingBank(true);
    fetchStoredAspirantMockExams()
      .then((res) => {
        if (cancelled) return;
        setStoredExams(res.exams);
        setBankSource(res.source);
      })
      .catch(() => {
        // Fallback handled inside service
      })
      .finally(() => {
        if (!cancelled) setIsLoadingBank(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Helper to deduplicate questions by stem inside any paper so zero questions ever repeat
  const groupPaperBySubject = (paper: StoredMockExam | null): SubjectGroup[] => {
    if (!paper || !Array.isArray(paper.questions)) return [];
    const seenStems = new Set<string>();
    const map = new Map<string, StoredMockQuestion[]>();
    for (const q of paper.questions) {
      const stemKey = String(q.question || '').trim().toLowerCase();
      if (!stemKey || seenStems.has(stemKey)) continue;
      seenStems.add(stemKey);
      const subj = q.subject || 'General';
      if (!map.has(subj)) map.set(subj, []);
      map.get(subj)!.push(q);
    }
    return Array.from(map.entries()).map(([subject, questions]) => ({ subject, questions }));
  };

  const subjectGroups = useMemo(() => groupPaperBySubject(activePaper), [activePaper]);
  const activeSubject = subjectGroups[activeSubjectTab] || subjectGroups[0];
  const activeQuestions = activeSubject?.questions || [];
  const currentQuestion = activeQuestions[currentQuestionIndex] || activeQuestions[0];
  const currentKey = `${activeSubjectTab}-${currentQuestionIndex}`;

  const launchPaper = (
    paper: StoredMockExam,
    tournamentMeta: { tournamentId: string; weekKey: string; title: string } | null = null
  ) => {
    submittedOnceRef.current = false;
    const durationSecs = Math.max(300, (paper.durationMinutes || 90) * 60);
    setActivePaper(paper);
    setActiveTournamentMeta(tournamentMeta);
    setUserAnswers({});
    setFlaggedQuestions(new Set());
    setActiveSubjectTab(0);
    setCurrentQuestionIndex(0);
    setInitialDurationSeconds(durationSecs);
    setSecondsRemaining(durationSecs);
    setLastExamResult(null);
    setIsReviewMode(false);
    setIsSubmitted(false);
    setIsTestActive(true);
  };

  // Auto-launch official Weekly National Mock Tournament paper when navigated from Tournaments page
  useEffect(() => {
    if (!pendingTournamentExam) return;
    let cancelled = false;
    setTournamentBooting(true);
    setTournamentBootError(null);

    fetchCurrentWeeklyTournament(student.id)
      .then((payload) => {
        if (cancelled) return;
        const canSit = Boolean(payload.registration) || isSuperAdmin;
        if (!canSit) {
          setTournamentBootError(
            'You must complete the ₦500 weekly registration before starting the official tournament exam.'
          );
          setPendingTournamentExam(null);
          return;
        }
        launchPaper(payload.activePaper, {
          tournamentId: payload.tournament.id,
          weekKey: payload.tournament.weekKey,
          title: payload.tournament.title,
        });
        setPendingTournamentExam(null);
      })
      .catch((err: any) => {
        if (!cancelled) {
          setTournamentBootError(err?.message || 'Unable to load this week’s tournament exam paper.');
          setPendingTournamentExam(null);
        }
      })
      .finally(() => {
        if (!cancelled) setTournamentBooting(false);
      });

    return () => {
      cancelled = true;
    };
  }, [pendingTournamentExam, student.id, isSuperAdmin]);

  // Timer countdown
  useEffect(() => {
    if (!isTestActive || isSubmitted) return;
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          void handleSubmitTest();
          return 0;
        }
        if (prev <= 300 && prev % 60 === 0) {
          playSound.timerBeep(prev / 60);
        } else if (prev <= 10) {
          playSound.timerTick();
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isTestActive, isSubmitted]);

  // Authentic JAMB CBT keyboard hotkeys
  useEffect(() => {
    if (!isTestActive || isSubmitted || !currentQuestion) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;
      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        const optionIndex = key === 'A' ? 0 : key === 'B' ? 1 : key === 'C' ? 2 : 3;
        if (optionIndex < (currentQuestion.options?.length || 4)) {
          handleSelectOption(optionIndex);
        }
      } else if (key === 'N' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextQuestion();
      } else if (key === 'P' || e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevQuestion();
      } else if (key === 'R' || key === 'F') {
        e.preventDefault();
        handleToggleFlag();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTestActive, isSubmitted, currentKey, currentQuestionIndex, activeSubjectTab, currentQuestion]);

  const handleOpenMockPaper = (exam: StoredMockExam) => {
    const unlocked = isPaidAspirant || exam.isFreeStarter;
    if (!unlocked) {
      setLockedFeatureTitle(
        exam.source === 'tournament'
          ? `Unlock Archived Tournament Paper (${exam.weekKey || exam.title})`
          : `Unlock ${exam.title}`
      );
      setIsSubscriptionModalOpen(true);
      return;
    }
    launchPaper(exam, null);
  };

  const handleSelectOption = (idx: number) => {
    triggerHaptic('tick');
    playSound.snakeMove();
    setUserAnswers((prev) => ({
      ...prev,
      [currentKey]: idx,
    }));
  };

  const handleToggleFlag = () => {
    triggerHaptic('light');
    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(currentKey)) next.delete(currentKey);
      else next.add(currentKey);
      return next;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (activeSubjectTab < subjectGroups.length - 1) {
      setActiveSubjectTab((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (activeSubjectTab > 0) {
      setActiveSubjectTab((prev) => prev - 1);
      setCurrentQuestionIndex(subjectGroups[activeSubjectTab - 1].questions.length - 1);
    }
  };

  const handleSubmitTest = async () => {
    if (submittedOnceRef.current || !activePaper) return;
    submittedOnceRef.current = true;
    setIsTestActive(false);
    setIsSubmitted(true);
    setIsReviewMode(false);
    playSound.levelUp();

    let totalCorrect = 0;
    let totalQuestions = 0;

    subjectGroups.forEach((group, sIdx) => {
      group.questions.forEach((q, qIdx) => {
        totalQuestions++;
        if (userAnswers[`${sIdx}-${qIdx}`] === q.correctAnswer) {
          totalCorrect++;
        }
      });
    });

    const percentage = Math.round((totalCorrect / Math.max(1, totalQuestions)) * 100);
    const scaledJambScore = Math.round((totalCorrect / Math.max(1, totalQuestions)) * 400);
    const timeSpentSeconds = Math.max(15, initialDurationSeconds - secondsRemaining);

    let tournamentRank: number | null = null;
    let tournamentSubmitError: string | null = null;

    if (activeTournamentMeta) {
      try {
        const res = await submitWeeklyTournamentScore({
          tournamentId: activeTournamentMeta.tournamentId,
          userId: student.id,
          userName: student.name || 'Aspirant',
          state: 'Nigeria',
          score: scaledJambScore,
          maxScore: 400,
          timeTakenSeconds: timeSpentSeconds,
        });
        tournamentRank = res.rank;
      } catch (err: any) {
        tournamentSubmitError = err?.message || 'Score saved locally; could not post to leaderboard.';
      }
    }

    setLastExamResult({
      scaledScore: scaledJambScore,
      rawScore: totalCorrect,
      totalQuestions,
      percentage,
      tournamentRank,
      tournamentSubmitError,
    });

    const result: CBTExamResult = {
      id: `res-mock-${Date.now()}`,
      examId: activePaper.id,
      examTitle: activeTournamentMeta ? `${activeTournamentMeta.title} (Official)` : activePaper.title,
      subject: `${activePaper.board} Complete Mock`,
      score: scaledJambScore,
      totalQuestions: 400,
      percentage,
      timeSpentSeconds,
      xpAwarded: Math.min(250, Math.max(40, Math.round(scaledJambScore * 0.6))),
      date: new Date().toISOString(),
      answers: {},
    };

    saveExamResult(result);
    addStudentXP({
      feature: 'aspirant-cbt',
      baseXP: activeTournamentMeta ? 220 : 150,
      difficulty: 'hard',
      questionCount: totalQuestions,
      scorePercentage: percentage,
      reason: `Completed ${activePaper.title}`,
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore confetti error
    }
  };

  const formatTimer = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleCalcInput = (val: string) => {
    if (val === 'C') {
      setCalcDisplay('0');
      return;
    }
    if (val === '⌫') {
      setCalcDisplay((prev) => (prev.length <= 1 ? '0' : prev.slice(0, -1)));
      return;
    }
    if (val === '=') {
      try {
        const sanitized = calcDisplay.replace(/[^0-9+\-*/.()]/g, '');
        if (!sanitized) return;
        // Safe arithmetic evaluation using Function after strict numeric/operator whitelist
        const computed = Function(`"use strict"; return (${sanitized})`)();
        if (typeof computed === 'number' && Number.isFinite(computed)) {
          setCalcDisplay(String(Number(computed.toFixed(6))));
        } else {
          setCalcDisplay('Error');
        }
      } catch {
        setCalcDisplay('Error');
      }
      return;
    }
    setCalcDisplay((prev) => (prev === '0' || prev === 'Error' ? val : `${prev}${val}`));
  };

  const starterExams = useMemo(
    () => storedExams.filter((e) => e.source === 'starter').sort((a, b) => a.orderIndex - b.orderIndex),
    [storedExams]
  );
  const tournamentArchiveExams = useMemo(
    () => storedExams.filter((e) => e.source === 'tournament'),
    [storedExams]
  );

  const filteredExams = useMemo(() => {
    if (boardFilter === 'ALL') return storedExams;
    if (boardFilter === 'TOURNAMENT') return tournamentArchiveExams;
    return storedExams.filter((e) => e.source === 'starter' && e.board === boardFilter);
  }, [storedExams, tournamentArchiveExams, boardFilter]);

  const totalAnsweredCount = Object.keys(userAnswers).length;
  const totalExamQuestions = subjectGroups.reduce((acc, g) => acc + g.questions.length, 0);

  // =========================================================================
  // 1. CATALOG VIEW: 6 Permanent Stored Complete Mocks + Tournament Archives
  // =========================================================================
  if (!isTestActive && !isSubmitted) {
    return (
      <div className="flex-1 min-h-0 h-full w-full overflow-y-auto px-4 pt-4 pb-24 space-y-5 touch-pan-y text-slate-100">
        {/* Top Hero Header */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950/60 to-slate-950 border border-emerald-500/30 shadow-xl relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Timer className="w-4 h-4" />
              <span>Authentic CBT Mock Simulator · Zero Repeated Questions</span>
            </div>

            <button
              type="button"
              onClick={() => setActiveStudentTab('aspirant-past-questions')}
              className="py-1.5 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>15+ Years Past Questions Archive</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-50 mt-2 leading-tight tracking-tight">
            Permanent Complete Mock Papers (JAMB, WAEC &amp; NECO)
          </h1>

          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed max-w-2xl">
            Every mock exam below is stored permanently in the cloud with strictly unique, non-repeating questions and step-by-step Chief Examiner explanations. Subsequent weekly National Mock Tournament papers automatically join this bank under their unique weekly ID.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px]">
            <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                <strong className="text-white">{starterExams.length}</strong> Permanent Starter Mocks +{' '}
                <strong className="text-amber-400">{tournamentArchiveExams.length}</strong> Archived Weekly Tournaments
              </span>
            </span>

            <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300">
              {isPaidAspirant ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> All Mocks Unlocked ({isSuperAdmin ? 'Super Admin' : `Aspirant ${currentTier.toUpperCase()}`})
                </span>
              ) : (
                <span className="text-amber-300 font-bold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> Free Tier: First 2 Complete Mocks Unlocked (Upgrade for #3–#6 &amp; Tournament Archives)
                </span>
              )}
            </span>

            {bankSource === 'firestore' && (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/70 border border-emerald-700/50 text-emerald-300 font-semibold">
                Synced with Firebase
              </span>
            )}
          </div>
        </div>

        {/* Tournament Boot Status */}
        {tournamentBooting && (
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-center gap-3 text-xs text-amber-200">
            <Loader2 className="w-4 h-4 animate-spin text-amber-400 shrink-0" />
            <span>Loading official Weekly National Mock Tournament paper...</span>
          </div>
        )}
        {tournamentBootError && (
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 flex items-center justify-between gap-3 text-xs text-rose-200">
            <span>{tournamentBootError}</span>
            <button
              type="button"
              onClick={() => setActiveStudentTab('mock-tournaments')}
              className="py-1.5 px-3 rounded-lg bg-amber-500 text-slate-950 font-black cursor-pointer shrink-0"
            >
              Go to Tournament
            </button>
          </div>
        )}

        {/* Board Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {(
              [
                { id: 'ALL', label: `All Papers (${storedExams.length})` },
                { id: 'JAMB', label: 'JAMB UTME (2)' },
                { id: 'WAEC', label: 'WAEC WASSCE (2)' },
                { id: 'NECO', label: 'NECO SSCE (2)' },
                { id: 'TOURNAMENT', label: `Weekly Tournaments (${tournamentArchiveExams.length})` },
              ] as Array<{ id: BoardFilter; label: string }>
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setBoardFilter(tab.id)}
                className={`py-1.5 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  boardFilter === tab.id
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setActiveStudentTab('mock-tournaments')}
            className="py-1.5 px-3.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Enter This Week’s ₦500 National Mock</span>
          </button>
        </div>

        {/* Stored Mock Exams Grid */}
        {isLoadingBank ? (
          <div className="p-10 rounded-3xl bg-slate-900/70 border border-slate-800 flex flex-col items-center justify-center gap-3 text-slate-400 text-xs">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
            <span>Loading permanent mock exam library...</span>
          </div>
        ) : filteredExams.length === 0 ? (
          <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-center space-y-2">
            <Trophy className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="text-sm font-bold text-white">No Archived Weekly Tournament Papers Yet</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Each week’s National Mock Tournament paper is automatically archived here with its unique weekly ID when the weekend tournament concludes.
            </p>
            <button
              type="button"
              onClick={() => setActiveStudentTab('mock-tournaments')}
              className="mt-2 py-2 px-4 rounded-xl bg-amber-500 text-slate-950 font-black text-xs cursor-pointer"
            >
              View Active Weekly Tournament
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredExams.map((exam) => {
              const isUnlocked = isPaidAspirant || exam.isFreeStarter;
              const isTournament = exam.source === 'tournament';

              const boardAccent =
                isTournament
                  ? 'border-amber-500/40 bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-950'
                  : exam.board === 'JAMB'
                  ? 'border-emerald-500/35 bg-slate-900/90'
                  : exam.board === 'WAEC'
                  ? 'border-sky-500/35 bg-slate-900/90'
                  : 'border-purple-500/35 bg-slate-900/90';

              const badgeColor =
                isTournament
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : exam.board === 'JAMB'
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                  : exam.board === 'WAEC'
                  ? 'bg-sky-500/15 text-sky-300 border-sky-500/40'
                  : 'bg-purple-500/15 text-purple-300 border-purple-500/40';

              return (
                <div
                  key={exam.id}
                  className={`p-5 rounded-3xl border shadow-lg flex flex-col justify-between gap-4 transition-all ${boardAccent}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider border ${badgeColor}`}>
                          {isTournament ? `TOURNAMENT · ${exam.weekKey || exam.id.toUpperCase()}` : `${exam.board} PAPER #${exam.paperNumber}`}
                        </span>
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono text-slate-400 bg-slate-950 border border-slate-800">
                          ID: {exam.id}
                        </span>
                      </div>

                      {exam.isFreeStarter ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0">
                          FREE ACCESS
                        </span>
                      ) : isUnlocked ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-sky-500/20 text-sky-300 border border-sky-500/40 shrink-0">
                          UNLOCKED
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 shrink-0">
                          <Lock className="w-3 h-3" /> PAID PLAN
                        </span>
                      )}
                    </div>

                    <div>
                      <h2 className="text-base font-black text-white leading-snug">{exam.title}</h2>
                      {exam.subtitle && (
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{exam.subtitle}</p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {exam.subjects.map((subj) => (
                        <span
                          key={subj}
                          className="px-2 py-0.5 rounded-md bg-slate-950/90 border border-slate-800 text-[10px] font-semibold text-slate-300"
                        >
                          {subj}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/90 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-emerald-400" />
                        {exam.totalQuestions} Unique Qs
                      </span>
                      <span className="flex items-center gap-1">
                        <Timer className="w-3.5 h-3.5 text-amber-400" />
                        {exam.durationMinutes} mins
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenMockPaper(exam)}
                      className={`py-2.5 px-4 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
                        isUnlocked
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                          : 'bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300'
                      }`}
                    >
                      {isUnlocked ? (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Start Mock CBT</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Unlock Paper</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <AspirantSubscriptionModal
          isOpen={isSubscriptionModalOpen}
          onClose={() => setIsSubscriptionModalOpen(false)}
          defaultTier="basic"
          featureTitle={lockedFeatureTitle}
        />
      </div>
    );
  }

  // =========================================================================
  // 2. ACTIVE CBT EXAM SCREEN
  // =========================================================================
  if (isTestActive && !isSubmitted && activePaper && currentQuestion) {
    return (
      <div className="flex-1 w-full flex flex-col bg-[#070D18] text-slate-100 overflow-hidden select-none relative">
        {/* Top CBT HUD */}
        <div className="bg-slate-900 border-b border-slate-800 px-3 py-2 flex items-center justify-between gap-2 shrink-0">
          <div className="min-w-0 flex items-center gap-2">
            {activeTournamentMeta ? (
              <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-black uppercase shrink-0">
                OFFICIAL TOURNAMENT · {activeTournamentMeta.weekKey}
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[10px] font-black uppercase shrink-0">
                {activePaper.board} MOCK
              </span>
            )}
            <span className="text-xs font-bold text-slate-200 truncate hidden sm:inline">
              {activePaper.title}
            </span>
          </div>

          {/* Countdown Clock */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border font-mono font-black text-sm shrink-0 ${
              secondsRemaining < 600
                ? 'bg-rose-950 text-rose-300 border-rose-800 animate-pulse'
                : 'bg-slate-950 text-amber-400 border-slate-800'
            }`}
          >
            <Timer className="w-4 h-4" />
            <span>{formatTimer(secondsRemaining)}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowCalculator((prev) => !prev)}
              className={`p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                showCalculator
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
              }`}
              title="JAMB CBT Calculator"
            >
              <Calculator className="w-4 h-4" />
              <span className="hidden md:inline">Calc</span>
            </button>

            <button
              type="button"
              onClick={() => void handleSubmitTest()}
              className="py-1.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-colors cursor-pointer"
            >
              Submit ({totalAnsweredCount}/{totalExamQuestions})
            </button>
          </div>
        </div>

        {/* Subject Navigation Tabs */}
        <div className="bg-slate-950 border-b border-slate-800/80 px-2 py-1.5 flex items-center gap-1.5 overflow-x-auto shrink-0">
          {subjectGroups.map((sub, idx) => {
            const isActive = activeSubjectTab === idx;
            const answeredInSub = sub.questions.filter(
              (_, qIdx) => userAnswers[`${idx}-${qIdx}`] !== undefined
            ).length;

            return (
              <button
                key={sub.subject}
                type="button"
                onClick={() => {
                  setActiveSubjectTab(idx);
                  setCurrentQuestionIndex(0);
                }}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>{sub.subject}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-slate-950/25 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {answeredInSub}/{sub.questions.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Exam Canvas + Question Matrix Grid */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Question {currentQuestionIndex + 1} of {activeQuestions.length} ({activeSubject.subject})
              </span>

              <button
                type="button"
                onClick={handleToggleFlag}
                className={`flex items-center gap-1 text-xs font-semibold py-1 px-2.5 rounded-lg border transition-all cursor-pointer ${
                  flaggedQuestions.has(currentKey)
                    ? 'bg-purple-950 text-purple-300 border-purple-700'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{flaggedQuestions.has(currentKey) ? 'Flagged' : 'Flag (R)'}</span>
              </button>
            </div>

            {currentQuestion.topic && (
              <div className="inline-block px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-semibold border border-slate-700">
                Topic: {currentQuestion.topic}
              </div>
            )}

            {currentQuestion.passage && (
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                <span className="font-bold text-amber-400 not-italic block mb-1">
                  Comprehension Passage:
                </span>
                {currentQuestion.passage}
              </div>
            )}

            <div className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed">
              <MathText text={currentQuestion.question} />
            </div>

            <div className="space-y-2.5 pt-2">
              {currentQuestion.options.map((opt, oIdx) => {
                const isSelected = userAnswers[currentKey] === oIdx;
                const letter = ['A', 'B', 'C', 'D'][oIdx];
                return (
                  <button
                    key={oIdx}
                    type="button"
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-950/60 border-emerald-500 text-white ring-1 ring-emerald-500/40 shadow-sm'
                        : 'bg-slate-900/70 border-slate-800 text-slate-200 hover:bg-slate-800/80'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="flex-1 leading-snug">
                      <MathText text={opt} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Question Matrix Grid */}
          <div className="w-full md:w-64 bg-slate-950 border-t md:border-t-0 md:border-l border-slate-800 p-3 flex flex-col justify-between shrink-0 max-h-52 md:max-h-none overflow-y-auto">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Question Palette ({activeSubject.subject})
              </span>
              <div className="grid grid-cols-8 md:grid-cols-5 gap-1.5">
                {activeQuestions.map((_, qIdx) => {
                  const key = `${activeSubjectTab}-${qIdx}`;
                  const isCurrent = currentQuestionIndex === qIdx;
                  const isAnswered = userAnswers[key] !== undefined;
                  const isFlagged = flaggedQuestions.has(key);

                  return (
                    <button
                      key={qIdx}
                      type="button"
                      onClick={() => setCurrentQuestionIndex(qIdx)}
                      className={`h-7 rounded-lg text-[11px] font-bold font-mono transition-all flex items-center justify-center cursor-pointer ${
                        isCurrent
                          ? 'ring-2 ring-amber-400 bg-amber-500 text-slate-950 font-black'
                          : isAnswered
                          ? 'bg-emerald-600 text-white'
                          : isFlagged
                          ? 'bg-purple-900 text-purple-200 border border-purple-700'
                          : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {qIdx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-400 grid grid-cols-2 gap-1.5 mt-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-emerald-600 block" /> Answered
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-slate-900 border border-slate-800 block" /> Unanswered
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-amber-500 block" /> Current
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-purple-900 block" /> Flagged
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="bg-slate-900/95 border-t border-slate-800 px-4 py-2.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevQuestion}
              className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous (P)</span>
            </button>
            <button
              type="button"
              onClick={handleNextQuestion}
              className="py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <span>Next (N)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
            <span>
              Hotkeys: <kbd className="px-1 bg-slate-800 rounded font-mono text-[10px]">A-D</kbd> Answer
            </span>{' '}
            ·{' '}
            <span>
              <kbd className="px-1 bg-slate-800 rounded font-mono text-[10px]">R</kbd> Flag
            </span>
          </div>

          <button
            type="button"
            onClick={() => void handleSubmitTest()}
            className="py-2 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 text-slate-950 font-black text-xs cursor-pointer shadow-md"
          >
            Finish &amp; Score
          </button>
        </div>

        {/* Built-in JAMB On-Screen Calculator */}
        {showCalculator && (
          <div className="fixed bottom-16 right-4 z-50 w-64 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-3 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" /> CBT Calculator
              </span>
              <button
                type="button"
                onClick={() => setShowCalculator(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-right font-mono text-lg font-black text-emerald-300 truncate">
              {calcDisplay}
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {['C', '(', ')', '⌫', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map(
                (btn) => (
                  <button
                    key={btn}
                    type="button"
                    onClick={() => handleCalcInput(btn)}
                    className={`py-2 rounded-lg text-xs font-black font-mono cursor-pointer transition-colors ${
                      btn === '='
                        ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                        : ['/', '*', '-', '+'].includes(btn)
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
                        : btn === 'C'
                        ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
                        : 'bg-slate-800 text-white hover:bg-slate-700'
                    }`}
                  >
                    {btn}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // 3. CHIEF EXAMINER SOLUTION REVIEW MODE
  // =========================================================================
  if (isReviewMode && isSubmitted && activePaper) {
    const reviewSubject = subjectGroups[activeSubjectTab] || subjectGroups[0];
    const reviewQuestions = reviewSubject?.questions || [];
    const reviewQ = reviewQuestions[currentQuestionIndex] || reviewQuestions[0];
    const reviewKey = `${activeSubjectTab}-${currentQuestionIndex}`;
    const studentChoice = userAnswers[reviewKey];
    const isCorrect = reviewQ ? studentChoice === reviewQ.correctAnswer : false;

    return (
      <div className="flex-1 w-full flex flex-col bg-[#070D18] text-slate-100 overflow-hidden select-none">
        <div className="bg-slate-900 border-b border-slate-800 px-3 py-2 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={() => setIsReviewMode(false)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-black text-purple-300 truncate">
              {activePaper.title} · Solution Review
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs shrink-0">
            <span
              className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                studentChoice === undefined
                  ? 'bg-slate-800 text-slate-400 border border-slate-700'
                  : isCorrect
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : 'bg-rose-950 text-rose-400 border border-rose-800'
              }`}
            >
              {studentChoice === undefined ? 'Unanswered' : isCorrect ? 'Correct' : 'Incorrect'}
            </span>
            <button
              type="button"
              onClick={() => setIsReviewMode(false)}
              className="py-1 px-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer"
            >
              Scorecard
            </button>
          </div>
        </div>

        <div className="bg-slate-950 border-b border-slate-800/80 px-2 py-1.5 flex items-center gap-1.5 overflow-x-auto shrink-0">
          {subjectGroups.map((sub, idx) => (
            <button
              key={sub.subject}
              type="button"
              onClick={() => {
                setActiveSubjectTab(idx);
                setCurrentQuestionIndex(0);
              }}
              className={`py-1 px-3 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer ${
                activeSubjectTab === idx
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {sub.subject}
            </button>
          ))}
        </div>

        {reviewQ && (
          <div className="flex-1 w-full overflow-y-auto p-4 sm:p-6 space-y-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold">
                Question {currentQuestionIndex + 1} of {reviewQuestions.length} ({reviewSubject.subject})
              </span>
              {reviewQ.topic && (
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-amber-400 font-semibold">
                  {reviewQ.topic}
                </span>
              )}
            </div>

            {reviewQ.passage && (
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed italic">
                <strong className="text-amber-400 not-italic block mb-1">Passage:</strong>
                {reviewQ.passage}
              </div>
            )}

            <div className="text-sm sm:text-base font-semibold text-white leading-relaxed">
              <MathText text={reviewQ.question} />
            </div>

            <div className="space-y-2 pt-2">
              {reviewQ.options.map((opt, oIdx) => {
                const isSelected = studentChoice === oIdx;
                const isRight = reviewQ.correctAnswer === oIdx;
                const letter = ['A', 'B', 'C', 'D'][oIdx];

                let borderStyle = 'border-slate-800 bg-slate-900/60 text-slate-300';
                if (isRight) {
                  borderStyle = 'border-emerald-500 bg-emerald-950/60 text-white ring-1 ring-emerald-500';
                } else if (isSelected && !isCorrect) {
                  borderStyle = 'border-rose-500 bg-rose-950/60 text-rose-200 ring-1 ring-rose-500';
                }

                return (
                  <div
                    key={oIdx}
                    className={`w-full p-3 rounded-2xl border text-left text-xs sm:text-sm flex items-center gap-3 ${borderStyle}`}
                  >
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isRight
                          ? 'bg-emerald-500 text-slate-950'
                          : isSelected
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="flex-1 leading-snug">
                      <MathText text={opt} />
                    </span>
                    {isRight && (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-800 shrink-0">
                        Correct
                      </span>
                    )}
                    {isSelected && !isRight && (
                      <span className="text-[10px] font-bold text-rose-400 bg-rose-950/90 px-2 py-0.5 rounded border border-rose-800 shrink-0">
                        Your Choice
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {reviewQ.explanation && (
              <div className="p-4 rounded-2xl bg-[#0D1E38] border border-sky-500/30 text-xs sm:text-sm text-sky-100 space-y-1.5 shadow-md">
                <span className="font-bold text-sky-300 text-xs uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  Chief Examiner’s Step-by-Step Explanation
                </span>
                <p className="leading-relaxed text-slate-200 whitespace-pre-line">
                  <MathText text={reviewQ.explanation} />
                </p>
              </div>
            )}

            <div className="pt-4 flex items-center justify-between border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  if (currentQuestionIndex > 0) setCurrentQuestionIndex((p) => p - 1);
                  else if (activeSubjectTab > 0) {
                    setActiveSubjectTab((p) => p - 1);
                    setCurrentQuestionIndex(subjectGroups[activeSubjectTab - 1].questions.length - 1);
                  }
                }}
                disabled={currentQuestionIndex === 0 && activeSubjectTab === 0}
                className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs font-bold text-slate-200 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <span className="text-xs text-slate-400 font-mono">
                Q{currentQuestionIndex + 1} / {reviewQuestions.length}
              </span>

              <button
                type="button"
                onClick={() => {
                  if (currentQuestionIndex < reviewQuestions.length - 1) setCurrentQuestionIndex((p) => p + 1);
                  else if (activeSubjectTab < subjectGroups.length - 1) {
                    setActiveSubjectTab((p) => p + 1);
                    setCurrentQuestionIndex(0);
                  }
                }}
                disabled={
                  currentQuestionIndex === reviewQuestions.length - 1 &&
                  activeSubjectTab === subjectGroups.length - 1
                }
                className="py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-30 text-xs font-bold text-white flex items-center gap-1 cursor-pointer"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // 4. SUBMITTED SCORECARD VIEW
  // =========================================================================
  return (
    <div className="flex-1 min-h-0 h-full w-full overflow-y-auto px-4 pt-6 pb-24 space-y-5 touch-pan-y text-slate-100 flex flex-col items-center">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
          {activeTournamentMeta ? <Trophy className="w-8 h-8 text-amber-400" /> : <Award className="w-8 h-8" />}
        </div>

        <div>
          <h2 className="text-xl font-black text-white">
            {activeTournamentMeta ? `${activeTournamentMeta.title} Completed` : `${activePaper?.title || 'Mock Exam'} Completed`}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Target: <strong className="text-slate-200">{aspirantGoal.targetCourse}</strong> ({aspirantGoal.targetUniversity})
          </p>
        </div>

        {activeTournamentMeta && (
          <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-xs space-y-1">
            {lastExamResult?.tournamentRank ? (
              <div className="flex items-center justify-center gap-2 font-black text-amber-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Official Leaderboard Rank: #{lastExamResult.tournamentRank}</span>
              </div>
            ) : (
              <p className="text-amber-200">
                {lastExamResult?.tournamentSubmitError || 'Official tournament result recorded.'}
              </p>
            )}
          </div>
        )}

        <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Scaled UTME Score Equivalent
          </span>
          <div className="text-3xl font-black text-emerald-400 font-mono">
            {lastExamResult?.scaledScore ?? 0}{' '}
            <span className="text-xs text-slate-400 font-normal">/ 400</span>
          </div>
          <p className="text-[11px] text-slate-300">
            Raw Score: <strong>{lastExamResult?.rawScore ?? 0}</strong> of{' '}
            <strong>{lastExamResult?.totalQuestions ?? 60}</strong> Unique Questions ({lastExamResult?.percentage ?? 0}%)
          </p>
          <p className="text-[10px] text-slate-400">
            Target cut-off: <strong className="text-amber-400">{aspirantGoal.targetScore || 310}</strong> / 400
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsReviewMode(true);
            setActiveSubjectTab(0);
            setCurrentQuestionIndex(0);
          }}
          className="w-full py-3 px-4 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-purple-400" />
          <span>Review Answers &amp; Chief Examiner Explanations</span>
        </button>

        <div className="space-y-1.5 text-xs text-left">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">
            Performance by Subject:
          </span>
          {subjectGroups.map((sub, sIdx) => {
            let correctInSub = 0;
            sub.questions.forEach((q, qIdx) => {
              if (userAnswers[`${sIdx}-${qIdx}`] === q.correctAnswer) {
                correctInSub++;
              }
            });
            return (
              <div
                key={sub.subject}
                className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between"
              >
                <span className="font-semibold text-slate-200">{sub.subject}</span>
                <span className="font-mono text-emerald-400 font-bold">
                  {correctInSub} / {sub.questions.length} Correct
                </span>
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIsTestActive(false);
              setIsSubmitted(false);
              setIsReviewMode(false);
              setActivePaper(null);
              if (activeTournamentMeta) {
                setActiveTournamentMeta(null);
                setActiveStudentTab('mock-tournaments');
              }
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors cursor-pointer"
          >
            {activeTournamentMeta ? 'View Live Leaderboard' : 'Back to Mock Bank'}
          </button>
          <button
            type="button"
            onClick={() => {
              setActivePaper(null);
              setActiveTournamentMeta(null);
              setActiveStudentTab('dashboard');
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-md"
          >
            Aspirant Hub
          </button>
        </div>
      </div>
    </div>
  );
};
