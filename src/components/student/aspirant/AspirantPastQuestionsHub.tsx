import React, { useState, useMemo } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  ArrowLeft,
  BookOpen,
  Lock,
  Crown,
  CheckCircle2,
  XCircle,
  Sparkles,
  Calendar,
  FileText,
  ChevronRight,
  ChevronLeft,
  Award,
  Play,
  RotateCcw,
  ShieldCheck,
  Loader2,
  Eye,
  Filter,
} from 'lucide-react';
import { AspirantSubscriptionModal } from './AspirantSubscriptionModal';
import {
  streamQuestionsBySubjectAndYear,
  type CloudPastQuestion,
} from '../../../services/questionService';
import { MathText } from '../../../utils/mathFormatter';

const BOARDS: Array<{ id: 'JAMB' | 'WAEC' | 'NECO'; label: string; yearsRange: string; desc: string }> = [
  { id: 'JAMB', label: 'JAMB UTME', yearsRange: '2008 – 2024', desc: '17 years of official UTME objective past questions with worked solutions' },
  { id: 'WAEC', label: 'WAEC SSCE', yearsRange: '2008 – 2024', desc: 'Authentic West African Senior School Certificate objective past papers' },
  { id: 'NECO', label: 'NECO SSCE', yearsRange: '2008 – 2024', desc: 'National Examinations Council June/July & GCE past question archive' },
];

const ARCHIVE_YEARS = [
  2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017,
  2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008,
];

const ARCHIVE_SUBJECTS = [
  'Use of English',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Economics',
  'Government',
  'Literature in English',
  'Commerce',
  'Accounting',
];

export const AspirantPastQuestionsHub: React.FC = () => {
  const {
    setActiveStudentTab,
    aspirantGoal,
    isSuperAdmin,
    saveExamResult,
    student,
  } = useApp();

  const isPaidAspirant =
    isSuperAdmin || aspirantGoal.tier === 'basic' || aspirantGoal.tier === 'elite';

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<'JAMB' | 'WAEC' | 'NECO'>('JAMB');
  const [selectedSubject, setSelectedSubject] = useState<string>('Use of English');
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [practiceMode, setPracticeMode] = useState<'study' | 'drill'>('study');

  // Active session state
  const [isLoadingPaper, setIsLoadingPaper] = useState(false);
  const [paperQuestions, setPaperQuestions] = useState<CloudPastQuestion[]>([]);
  const [paperSource, setPaperSource] = useState<'firestore' | 'cache' | 'bundled'>('bundled');
  const [activeSession, setActiveSession] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealedMap, setRevealedMap] = useState<Record<number, boolean>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [sessionStartMs, setSessionStartMs] = useState<number>(Date.now());

  const handleOpenPastPaper = async () => {
    if (!isPaidAspirant) {
      setShowUpgradeModal(true);
      return;
    }

    setIsLoadingPaper(true);
    try {
      const result = await streamQuestionsBySubjectAndYear(
        selectedBoard,
        selectedSubject,
        selectedYear
      );
      // Deduplicate by stem so past question sessions never repeat a question
      const seen = new Set<string>();
      const uniqueQuestions: CloudPastQuestion[] = [];
      for (const q of result.questions) {
        const key = String(q.question || '').trim().toLowerCase();
        if (key && !seen.has(key)) {
          seen.add(key);
          uniqueQuestions.push(q);
        }
      }
      setPaperQuestions(uniqueQuestions);
      setPaperSource(result.source);
      setCurrentIdx(0);
      setAnswers({});
      setRevealedMap({});
      setShowSummary(false);
      setSessionStartMs(Date.now());
      setActiveSession(true);
    } finally {
      setIsLoadingPaper(false);
    }
  };

  const scoreStats = useMemo(() => {
    let correct = 0;
    let answered = 0;
    paperQuestions.forEach((q, idx) => {
      if (answers[idx] !== undefined) {
        answered += 1;
        if (answers[idx] === q.correctAnswer) correct += 1;
      }
    });
    const total = paperQuestions.length || 1;
    const percentage = Math.round((correct / total) * 100);
    return { correct, answered, total: paperQuestions.length, percentage };
  }, [paperQuestions, answers]);

  const handleFinishSession = () => {
    setShowSummary(true);
    const elapsedSec = Math.max(10, Math.round((Date.now() - sessionStartMs) / 1000));
    const xpAwarded = Math.min(200, Math.max(20, scoreStats.correct * 10));
    saveExamResult({
      id: `pq_${selectedBoard}_${selectedSubject.replace(/\s+/g, '_')}_${selectedYear}_${Date.now()}`,
      examId: `pq_${selectedBoard}_${selectedYear}`,
      examTitle: `${selectedBoard} ${selectedYear} ${selectedSubject} Past Questions`,
      subject: selectedSubject,
      score: scoreStats.correct,
      totalQuestions: paperQuestions.length,
      percentage: scoreStats.percentage,
      timeSpentSeconds: elapsedSec,
      xpAwarded,
      date: new Date().toISOString(),
      answers: {},
    });
  };

  // ---------------------------------------------------------------------------
  // LOCKED VIEW FOR FREE ASPIRANTS (100% Locked Until Paid)
  // ---------------------------------------------------------------------------
  if (!isPaidAspirant) {
    return (
      <div className="h-full overflow-y-auto bg-[#080F1E] text-white pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 pb-10 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setActiveStudentTab('dashboard')}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-xl cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Aspirant Hub
            </button>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[11px] font-black uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" /> Paid Archive
            </span>
          </div>

          {/* Primary Paywall Hero */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121E38] via-[#0E182E] to-[#091022] border border-amber-500/35 p-6 sm:p-8 shadow-2xl">
            <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-300 text-[11px] font-black uppercase tracking-wider mb-4">
                <Crown className="w-3.5 h-3.5" />
                15+ Years Past Questions Archive (2008 – 2024)
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                Unlock Verified JAMB, WAEC &amp; NECO Past Questions
              </h1>
              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                The 15+ Years Past Questions Archive is reserved for paid Aspirants. Subscribe to{' '}
                <strong className="text-white">Aspirant Basic (₦5,000/month)</strong> or{' '}
                <strong className="text-[#84CC16]">Aspirant Elite (₦10,000/month)</strong> to get full
                year-by-year access from 2008 to 2024 with Chief Examiner step-by-step explanations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-3.5">
                  <div className="text-xs font-black text-amber-300">2008 – 2024</div>
                  <div className="text-[11px] text-slate-400 mt-1">17 consecutive exam years across JAMB, WAEC &amp; NECO</div>
                </div>
                <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-3.5">
                  <div className="text-xs font-black text-[#84CC16]">Chief Examiner Notes</div>
                  <div className="text-[11px] text-slate-400 mt-1">Detailed step-by-step worked answers for every question</div>
                </div>
                <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-3.5">
                  <div className="text-xs font-black text-cyan-300">Study &amp; Drill Modes</div>
                  <div className="text-[11px] text-slate-400 mt-1">Instant reveal study mode or timed exam revision</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-7">
                <button
                  onClick={() => setShowUpgradeModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#84CC16] hover:bg-[#95E022] text-slate-950 font-black text-sm shadow-lg shadow-[#84CC16]/20 cursor-pointer transition-all active:scale-98"
                >
                  <Crown className="w-4 h-4" />
                  Unlock Past Questions (From ₦5,000/mo)
                </button>
                <button
                  onClick={() => setActiveStudentTab('aspirant-cbt')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs cursor-pointer transition-colors"
                >
                  Try Your 2 Free CBT Mock Exams Instead
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Locked Archive Preview Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-400">
                Archive Catalog Preview (Locked)
              </h2>
              <span className="text-[11px] text-amber-400 font-bold">
                Requires Aspirant Basic or Elite
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {BOARDS.map((board) => (
                <button
                  key={board.id}
                  onClick={() => setShowUpgradeModal(true)}
                  className="text-left rounded-2xl bg-[#0F192E] border border-slate-800/90 hover:border-amber-500/50 p-5 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-black text-white">
                      {board.label}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                      <Lock className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-xs font-bold text-amber-300">{board.yearsRange}</div>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{board.desc}</p>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-slate-300">
                    <span>10 Core Subjects</span>
                    <span className="text-[#84CC16] group-hover:underline">Unlock →</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <AspirantSubscriptionModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          defaultTier="basic"
          featureTitle="15+ Years Past Questions Archive (2008 – 2024)"
        />
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // ACTIVE PAST QUESTION PRACTICE / STUDY SESSION (PAID ASPIRANTS)
  // ---------------------------------------------------------------------------
  if (activeSession) {
    const currentQ = paperQuestions[currentIdx];

    if (showSummary) {
      return (
        <div className="h-full overflow-y-auto bg-[#080F1E] text-white pb-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
            <div className="rounded-3xl bg-[#0F192E] border border-slate-800 p-6 sm:p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#84CC16]/15 border border-[#84CC16]/40 text-[#84CC16] flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                {selectedBoard} {selectedYear} · {selectedSubject}
              </span>
              <h2 className="text-2xl font-black text-white mt-1">Past Question Revision Complete</h2>
              <div className="text-4xl font-black text-[#84CC16] mt-4">
                {scoreStats.correct} / {scoreStats.total}{' '}
                <span className="text-lg text-slate-400">({scoreStats.percentage}%)</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Review every Chief Examiner solution below to lock in the syllabus concepts.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowSummary(false);
                    setCurrentIdx(0);
                    setAnswers({});
                    setRevealedMap({});
                    setSessionStartMs(Date.now());
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" /> Retry This Year
                </button>
                <button
                  onClick={() => {
                    setActiveSession(false);
                    setShowSummary(false);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#84CC16] hover:bg-[#95E022] text-slate-950 text-xs font-black cursor-pointer"
                >
                  Choose Another Year / Subject
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                Full Answer Key &amp; Chief Examiner Explanations
              </h3>
              {paperQuestions.map((q, idx) => {
                const picked = answers[idx];
                const isCorrect = picked === q.correctAnswer;
                return (
                  <div
                    key={q.id || idx}
                    className={`rounded-2xl p-5 border ${
                      isCorrect
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : 'bg-[#0F192E] border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-sm font-bold text-white leading-relaxed">
                        <span className="text-slate-400 mr-2">Q{idx + 1}.</span>
                        <MathText text={q.question} />
                      </div>
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </div>
                    <div className="mt-3 text-xs space-y-1">
                      <div className="text-emerald-300 font-bold">
                        Correct Answer: ({String.fromCharCode(65 + q.correctAnswer)}){' '}
                        <MathText text={q.options[q.correctAnswer] || ''} />
                      </div>
                      {picked !== undefined && picked !== q.correctAnswer && (
                        <div className="text-rose-300">
                          Your Choice: ({String.fromCharCode(65 + picked)}){' '}
                          <MathText text={q.options[picked] || ''} />
                        </div>
                      )}
                      <div className="mt-2 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300 leading-relaxed">
                        <span className="text-amber-300 font-bold">Chief Examiner Note: </span>
                        <MathText text={q.explanation} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    const picked = answers[currentIdx];
    const isRevealed = practiceMode === 'study' && (picked !== undefined || revealedMap[currentIdx]);

    return (
      <div className="h-full overflow-y-auto bg-[#080F1E] text-white pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-5 pb-10 space-y-5">
          {/* Session Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0F192E] border border-slate-800 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveSession(false)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="text-xs font-black text-white">
                  {selectedBoard} {selectedYear} · {selectedSubject}
                </div>
                <div className="text-[11px] text-slate-400">
                  Question {currentIdx + 1} of {paperQuestions.length} ·{' '}
                  {practiceMode === 'study' ? 'Study Mode (Instant Solutions)' : 'Exam Drill Mode'}
                </div>
              </div>
            </div>

            <button
              onClick={handleFinishSession}
              className="px-4 py-2 rounded-xl bg-[#84CC16] hover:bg-[#95E022] text-slate-950 text-xs font-black cursor-pointer"
            >
              Finish &amp; Review ({scoreStats.answered}/{paperQuestions.length})
            </button>
          </div>

          {currentQ ? (
            <div className="rounded-3xl bg-[#0F192E] border border-slate-800 p-6 space-y-5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
                  Topic: {currentQ.topic || selectedSubject}
                </span>
                <span className="text-slate-500 font-semibold uppercase">
                  Source: {paperSource === 'firestore' ? 'Cloud Archive' : 'Verified Archive'}
                </span>
              </div>

              {currentQ.passage && (
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <div className="text-[10px] font-black uppercase tracking-wider text-cyan-400 mb-1.5">
                    Comprehension Passage
                  </div>
                  {currentQ.passage}
                </div>
              )}

              <div className="text-base sm:text-lg font-bold text-white leading-relaxed">
                <MathText text={currentQ.question} />
              </div>

              <div className="space-y-2.5">
                {currentQ.options.map((opt, oIdx) => {
                  const isSelected = picked === oIdx;
                  const isCorrectOption = oIdx === currentQ.correctAnswer;
                  let cardClass = 'bg-slate-950/60 border-slate-800 hover:border-slate-600 text-slate-200';
                  if (isRevealed) {
                    if (isCorrectOption) {
                      cardClass = 'bg-emerald-950/40 border-emerald-500 text-emerald-200';
                    } else if (isSelected && !isCorrectOption) {
                      cardClass = 'bg-rose-950/40 border-rose-500 text-rose-200';
                    }
                  } else if (isSelected) {
                    cardClass = 'bg-[#84CC16]/15 border-[#84CC16] text-white';
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => setAnswers((prev) => ({ ...prev, [currentIdx]: oIdx }))}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${cardClass}`}
                    >
                      <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-black shrink-0">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="text-sm leading-relaxed flex-1">
                        <MathText text={opt} />
                      </span>
                    </button>
                  );
                })}
              </div>

              {practiceMode === 'study' && !isRevealed && (
                <button
                  onClick={() => setRevealedMap((prev) => ({ ...prev, [currentIdx]: true }))}
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 hover:text-amber-200 cursor-pointer"
                >
                  <Eye className="w-4 h-4" /> Show Chief Examiner Solution
                </button>
              )}

              {isRevealed && (
                <div className="p-4 rounded-2xl bg-slate-950/90 border border-amber-500/35 space-y-1.5">
                  <div className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    Chief Examiner Explanation (Answer: {String.fromCharCode(65 + currentQ.correctAnswer)})
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    <MathText text={currentQ.explanation} />
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <button
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                {currentIdx < paperQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx((i) => Math.min(paperQuestions.length - 1, i + 1))}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#84CC16] hover:bg-[#95E022] text-slate-950 text-xs font-black cursor-pointer"
                  >
                    Next Question <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinishSession}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black cursor-pointer"
                  >
                    Complete Revision <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-[#0F192E] border border-slate-800 p-8 text-center">
              <p className="text-sm text-slate-300">No questions found for this selection.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // UNLOCKED ARCHIVE BROWSER (ASPIRANT BASIC / ELITE / SUPER ADMIN)
  // ---------------------------------------------------------------------------
  return (
    <div className="h-full overflow-y-auto bg-[#080F1E] text-white pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 pb-10 space-y-6">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setActiveStudentTab('dashboard')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Aspirant Hub
          </button>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[11px] font-black uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" /> Full Archive Unlocked
          </span>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-[#12203B] to-[#0B1426] border border-slate-800 p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                15+ Years Past Questions Archive (2008 – 2024)
              </span>
              <h1 className="text-2xl font-black text-white mt-1">
                Year-by-Year Official Past Papers
              </h1>
              <p className="text-xs text-slate-400 mt-1.5 max-w-xl leading-relaxed">
                Practice authentic past questions strictly separated from the CBT Mock Simulator.
                Pick your examination board, subject, and year below.
              </p>
            </div>
            <button
              onClick={() => setActiveStudentTab('aspirant-cbt')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 cursor-pointer"
            >
              Switch to CBT Mock Simulator →
            </button>
          </div>
        </div>

        {/* Step 1: Select Board */}
        <div className="space-y-2.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#84CC16]" /> 1. Examination Board
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {BOARDS.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBoard(b.id)}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedBoard === b.id
                    ? 'bg-[#84CC16]/15 border-[#84CC16] text-white'
                    : 'bg-[#0F192E] border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black">{b.label}</span>
                  <span className="text-[10px] font-bold text-amber-300">{b.yearsRange}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{b.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Select Subject */}
        <div className="space-y-2.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> 2. Subject
          </label>
          <div className="flex flex-wrap gap-2">
            {ARCHIVE_SUBJECTS.map((subj) => (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  selectedSubject === subj
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                    : 'bg-[#0F192E] border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Select Year */}
        <div className="space-y-2.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" /> 3. Past Paper Year (17 Years Available)
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2">
            {ARCHIVE_YEARS.map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`py-2.5 rounded-xl border text-xs font-black transition-all cursor-pointer ${
                  selectedYear === yr
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/20'
                    : 'bg-[#0F192E] border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>

        {/* Step 4: Mode & Launch */}
        <div className="rounded-3xl bg-[#0F192E] border border-slate-800 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs font-black text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#84CC16]" />
              Ready: {selectedBoard} {selectedYear} — {selectedSubject}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPracticeMode('study')}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border cursor-pointer ${
                  practiceMode === 'study'
                    ? 'bg-[#84CC16]/20 border-[#84CC16] text-[#84CC16]'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                Study Mode (Instant Explanations)
              </button>
              <button
                onClick={() => setPracticeMode('drill')}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border cursor-pointer ${
                  practiceMode === 'drill'
                    ? 'bg-[#84CC16]/20 border-[#84CC16] text-[#84CC16]'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                Exam Drill Mode (Grade at End)
              </button>
            </div>
          </div>

          <button
            onClick={handleOpenPastPaper}
            disabled={isLoadingPaper}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#84CC16] hover:bg-[#95E022] text-slate-950 font-black text-sm shadow-lg shadow-[#84CC16]/20 cursor-pointer disabled:opacity-60"
          >
            {isLoadingPaper ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Loading Paper...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" /> Open {selectedYear} Paper
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
