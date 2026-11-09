import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../../../context/AppContext';
import { CBT_EXAMS_DATABASE } from '../../../data/cbtExamData';
import { ASPIRANT_PAST_QUESTION_YEARS } from '../../../data/aspirantMockData';
import { CBTExam, CBTExamResult, CBTQuestion } from '../../../types';
import { playSound, triggerHaptic } from '../../../utils/audioSynthesis';
import { AspirantSubscriptionModal } from './AspirantSubscriptionModal';
import {
  Timer,
  CheckCircle2,
  XCircle,
  Flag,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Award,
  Zap,
  Lock,
  Layers,
  HelpCircle,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AspirantCBTSimulator: React.FC = () => {
  const { aspirantGoal, saveExamResult, addStudentXP, setActiveStudentTab } = useApp();

  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [selectedExamType, setSelectedExamType] = useState<'JAMB_UTME' | 'WAEC' | 'NECO'>('JAMB_UTME');
  const [activeSubjectTab, setActiveSubjectTab] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());

  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(7200); // 2 hours for full JAMB UTME
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState<boolean>(false);

  const subjects = aspirantGoal.subjectCombination || [
    'Use of English',
    'Biology',
    'Chemistry',
    'Physics'
  ];

  const currentTier = aspirantGoal.tier || 'free';
  const isYearLocked = currentTier === 'free' && parseInt(selectedYear) < 2023;

  // Retrieve or synthesize questions for the 4 subjects from CBT_EXAMS_DATABASE
  const subjectExams = subjects.map(subj => {
    const match = CBT_EXAMS_DATABASE.find(e =>
      e.subject.toLowerCase().includes(subj.toLowerCase()) ||
      subj.toLowerCase().includes(e.subject.toLowerCase())
    ) || CBT_EXAMS_DATABASE[0];
    return {
      subject: subj,
      questions: match.questions
    };
  });

  const activeSubject = subjectExams[activeSubjectTab] || subjectExams[0];
  const activeQuestions = activeSubject.questions;
  const currentQuestion = activeQuestions[currentQuestionIndex] || activeQuestions[0];
  const currentKey = `${activeSubjectTab}-${currentQuestionIndex}`;

  // Timer countdown
  useEffect(() => {
    if (!isTestActive || isSubmitted) return;

    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
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

  // Keyboard shortcuts mimicking real JAMB CBT muscle memory
  useEffect(() => {
    if (!isTestActive || isSubmitted) return;

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
  }, [isTestActive, isSubmitted, currentKey, currentQuestionIndex, activeSubjectTab]);

  const handleStartTest = () => {
    if (isYearLocked) {
      setIsSubscriptionModalOpen(true);
      return;
    }
    setUserAnswers({});
    setFlaggedQuestions(new Set());
    setActiveSubjectTab(0);
    setCurrentQuestionIndex(0);
    setSecondsRemaining(selectedExamType === 'JAMB_UTME' ? 7200 : 5400);
    setIsTestActive(true);
    setIsSubmitted(false);
  };

  const handleSelectOption = (idx: number) => {
    triggerHaptic('tick');
    playSound.snakeMove();
    setUserAnswers(prev => ({
      ...prev,
      [currentKey]: idx
    }));
  };

  const handleToggleFlag = () => {
    triggerHaptic('light');
    setFlaggedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(currentKey)) next.delete(currentKey);
      else next.add(currentKey);
      return next;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (activeSubjectTab < subjectExams.length - 1) {
      setActiveSubjectTab(prev => prev + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (activeSubjectTab > 0) {
      setActiveSubjectTab(prev => prev - 1);
      setCurrentQuestionIndex(subjectExams[activeSubjectTab - 1].questions.length - 1);
    }
  };

  const handleSubmitTest = () => {
    setIsTestActive(false);
    setIsSubmitted(true);
    playSound.levelUp();

    let totalScore = 0;
    let totalQuestions = 0;

    subjectExams.forEach((sub, sIdx) => {
      sub.questions.forEach((q, qIdx) => {
        totalQuestions++;
        const answer = userAnswers[`${sIdx}-${qIdx}`];
        if (answer === q.correctOptionIndex) {
          totalScore++;
        }
      });
    });

    const scaledJambScore = Math.round((totalScore / Math.max(1, totalQuestions)) * 400);

    const result: CBTExamResult = {
      id: `res-asp-${Date.now()}`,
      examId: `jamb-${selectedYear}`,
      examTitle: `${selectedYear} ${selectedExamType} Simulator`,
      subject: 'Combined 4-Subjects',
      score: scaledJambScore,
      totalQuestions: 400,
      percentage: Math.round((totalScore / Math.max(1, totalQuestions)) * 100),
      timeSpentSeconds: (selectedExamType === 'JAMB_UTME' ? 7200 : 5400) - secondsRemaining,
      xpAwarded: Math.min(250, scaledJambScore),
      date: new Date().toISOString(),
      answers: {}
    };

    saveExamResult(result);
    addStudentXP(result.xpAwarded, `Completed ${selectedYear} ${selectedExamType} Simulator`);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
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

  // If Test is Not Active and Not Submitted: Show Setup & Past Question Catalog
  if (!isTestActive && !isSubmitted) {
    return (
      <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-5 touch-pan-y text-slate-100">
        {/* Top Header Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950/60 to-slate-950 border border-emerald-500/30 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Timer className="w-4 h-4" />
            <span>JAMB CBT Simulator Engine · 15+ Years Past Questions</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-50 mt-1 leading-tight tracking-tight">
            Authentic 4-Subject Computer-Based Test Simulator
          </h1>

          <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-xl">
            Replicates the official JAMB UTME testing environment, countdown clock, subject tabs, question matrix grid, and keyboard hotkeys to develop speed and muscle memory.
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300">
              Selected 4-Subject Combination: <strong className="text-emerald-400">{subjects.join(', ')}</strong>
            </span>
          </div>
        </div>

        {/* Board & Year Selector */}
        <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-100">Choose Exam Board & Past Question Year</h2>
              <p className="text-[11px] text-slate-400">Database spans 2008 to present for WAEC, NECO & JAMB</p>
            </div>

            {/* Exam Board Switcher */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {(['JAMB_UTME', 'WAEC', 'NECO'] as const).map(board => (
                <button
                  key={board}
                  type="button"
                  onClick={() => setSelectedExamType(board)}
                  className={`py-1 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedExamType === board
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {board === 'JAMB_UTME' ? 'JAMB UTME' : board}
                </button>
              ))}
            </div>
          </div>

          {/* Past Question Years Grid (15+ Years) */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Select Paper Year:</span>
              {currentTier === 'free' && (
                <span className="text-[10px] text-amber-400 font-medium">
                  Free Tier: 2023–2024 unlocked (Upgrade to unlock 2008–2022)
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2">
              {ASPIRANT_PAST_QUESTION_YEARS.map(yr => {
                const isSelected = selectedYear === yr;
                const isLocked = currentTier === 'free' && parseInt(yr) < 2023;

                return (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => {
                      if (isLocked) {
                        setIsSubscriptionModalOpen(true);
                      } else {
                        setSelectedYear(yr);
                      }
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-bold font-mono transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer relative ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 shadow-md ring-2 ring-emerald-400'
                        : isLocked
                        ? 'bg-slate-950/60 text-slate-500 border border-slate-800/80 hover:border-amber-500/50'
                        : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{yr}</span>
                    {isLocked && <Lock className="w-2.5 h-2.5 text-amber-500" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Launch Exam CTA */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800">
            <div className="text-xs text-slate-400">
              <span>Standard Time: <strong>{selectedExamType === 'JAMB_UTME' ? '2h 00m' : '1h 30m'}</strong></span> ·{' '}
              <span>Subjects: <strong>4 Combination</strong></span> ·{' '}
              <span>Speed Target: <strong>300+ Score</strong></span>
            </div>

            <button
              type="button"
              onClick={handleStartTest}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer"
            >
              <span>Launch {selectedYear} {selectedExamType} Simulator</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <AspirantSubscriptionModal
          isOpen={isSubscriptionModalOpen}
          onClose={() => setIsSubscriptionModalOpen(false)}
          defaultTier="basic"
        />
      </div>
    );
  }

  // Active Test Screen
  if (isTestActive && !isSubmitted) {
    return (
      <div className="flex-1 w-full flex flex-col bg-[#070D18] text-slate-100 overflow-hidden select-none">
        {/* Top JAMB Header HUD */}
        <div className="bg-slate-900 border-b border-slate-800 px-3 py-2 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-emerald-400 font-mono tracking-tight">
              {selectedYear} {selectedExamType}
            </span>
            <span className="text-[10px] text-slate-400 hidden sm:inline">
              Candidate: <strong>{aspirantGoal.targetCourse}</strong>
            </span>
          </div>

          {/* Countdown Clock */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border font-mono font-black text-sm ${
            secondsRemaining < 600
              ? 'bg-rose-950 text-rose-300 border-rose-800 animate-pulse'
              : 'bg-slate-950 text-amber-400 border-slate-800'
          }`}>
            <Timer className="w-4 h-4" />
            <span>{formatTimer(secondsRemaining)}</span>
          </div>

          <button
            type="button"
            onClick={handleSubmitTest}
            className="py-1 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs transition-colors cursor-pointer"
          >
            Submit Test
          </button>
        </div>

        {/* 4 Subjects Navigation Tabs */}
        <div className="bg-slate-950 border-b border-slate-800/80 px-2 py-1.5 flex items-center gap-1.5 overflow-x-auto shrink-0">
          {subjectExams.map((sub, idx) => {
            const isActive = activeSubjectTab === idx;
            const answeredInSubject = sub.questions.filter((_, qIdx) => userAnswers[`${idx}-${qIdx}`] !== undefined).length;

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
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {answeredInSubject}/{sub.questions.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Question Area & Side Matrix Grid */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Main Question Panel */}
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
                    ? 'bg-purple-950 text-purple-300 border-purple-800'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{flaggedQuestions.has(currentKey) ? 'Flagged for Review' : 'Flag Question'}</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed">
              {currentQuestion.question}
            </div>

            {/* Options List */}
            <div className="space-y-2 pt-2">
              {currentQuestion.options.map((opt, oIdx) => {
                const isSelected = userAnswers[currentKey] === oIdx;
                const letter = ['A', 'B', 'C', 'D'][oIdx];

                return (
                  <button
                    key={oIdx}
                    type="button"
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full p-3 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-950/60 border-emerald-500 text-white ring-1 ring-emerald-500/40 shadow-sm'
                        : 'bg-slate-900/60 border-slate-800 text-slate-200 hover:bg-slate-850'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {letter}
                    </span>
                    <span className="flex-1 leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Question Matrix Grid */}
          <div className="w-full md:w-64 bg-slate-950 border-t md:border-t-0 md:border-l border-slate-800 p-3 flex flex-col justify-between shrink-0 max-h-56 md:max-h-none overflow-y-auto">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Questions Grid ({activeSubject.subject})
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

            {/* Grid Legend */}
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

        {/* Bottom Muscle Memory Controls */}
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
              className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <span>Next (N)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
            <span>Hotkeys: <kbd className="px-1 bg-slate-800 rounded font-mono text-[10px]">A, B, C, D</kbd> to answer</span> ·{' '}
            <span><kbd className="px-1 bg-slate-800 rounded font-mono text-[10px]">R</kbd> Flag</span>
          </div>

          <button
            type="button"
            onClick={handleSubmitTest}
            className="py-2 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 text-slate-950 font-black text-xs cursor-pointer shadow-md"
          >
            Submit All 4 Subjects
          </button>
        </div>
      </div>
    );
  }

  // Submitted Scorecard View
  return (
    <div className="flex-1 w-full overflow-y-auto px-4 py-6 space-y-5 touch-pan-y text-slate-100 flex flex-col items-center">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
          <Award className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-xl font-black text-white">{selectedYear} {selectedExamType} Simulator Completed</h2>
          <p className="text-xs text-slate-400 mt-1">
            Target Course: <strong className="text-slate-200">{aspirantGoal.targetCourse}</strong> ({aspirantGoal.targetUniversity})
          </p>
        </div>

        {/* 400-Point JAMB Metric */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Estimated UTME Aggregate</span>
          <div className="text-3xl font-black text-emerald-400 font-mono">
            {Math.round((Object.keys(userAnswers).length / 160) * 400)} <span className="text-xs text-slate-400 font-normal">/ 400</span>
          </div>
          <p className="text-[11px] text-slate-300">
            Target cut-off: <strong>{aspirantGoal.targetScore || 310}</strong> points
          </p>
        </div>

        {/* Subject Breakdown */}
        <div className="space-y-1.5 text-xs text-left">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Performance by Subject:</span>
          {subjectExams.map((sub, sIdx) => {
            const answered = sub.questions.filter((_, qIdx) => userAnswers[`${sIdx}-${qIdx}`] !== undefined).length;
            return (
              <div key={sub.subject} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <span className="font-semibold text-slate-200">{sub.subject}</span>
                <span className="font-mono text-emerald-400 font-bold">{answered} / {sub.questions.length} Answered</span>
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
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-colors cursor-pointer"
          >
            Practice Another Paper
          </button>
          <button
            type="button"
            onClick={() => setActiveStudentTab('dashboard')}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-md"
          >
            Return to Aspirant Hub
          </button>
        </div>
      </div>
    </div>
  );
};
