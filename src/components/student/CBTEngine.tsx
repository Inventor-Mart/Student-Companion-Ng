import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CBT_EXAMS_DATABASE } from '../../data/cbtExamData';
import { CBTExam, CBTExamResult } from '../../types';
import {
  Timer,
  Flag,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Award,
  Play,
  ArrowLeft,
  Flame,
  Check,
  Search,
  BookOpen,
  Atom
} from 'lucide-react';

export const CBTEngine: React.FC = () => {
  const {
    activeExam,
    startExam,
    closeExam,
    saveExamResult,
    setActiveStudentTab
  } = useApp();

  // If no active exam, render exam selection catalog
  if (!activeExam) {
    return <CBTExamCatalog onSelectExam={startExam} onOpenFormulas={() => setActiveStudentTab('formulas')} />;
  }

  return <ActiveCBTRunner exam={activeExam} onExit={closeExam} onSaveResult={saveExamResult} onGoHome={() => setActiveStudentTab('dashboard')} />;
};

// Exam Catalog Component
const CBTExamCatalog: React.FC<{ onSelectExam: (exam: CBTExam) => void; onOpenFormulas: () => void }> = ({ onSelectExam, onOpenFormulas }) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const subjectFilters = [
    'ALL',
    'Biology',
    'Physics',
    'Chemistry',
    'Literature-in-English',
    'Government',
    'Further Mathematics',
    'Agricultural Science',
    'Christian Religious Studies (CRS)',
    'Economics',
    'Mathematics'
  ];

  const filteredExams = CBT_EXAMS_DATABASE.filter(e => {
    const matchesBoard = filterType === 'ALL' || e.examType === filterType;
    const matchesSubject = selectedSubject === 'ALL' || e.subject === selectedSubject;
    const matchesQuery =
      searchQuery.trim() === '' ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.questions.some(q => q.topicRef?.toLowerCase().includes(searchQuery.toLowerCase()) || q.question.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesBoard && matchesSubject && matchesQuery;
  });

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-4 touch-pan-y text-slate-100">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white tracking-tight">
            CBT Examination Simulator
          </h2>
          <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            {CBT_EXAMS_DATABASE.length} Full Drills
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Timed WAEC, JAMB UTME & NECO drills with step-by-step marking schemes and explanations
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search subjects, questions, or topics (e.g. Soyinka, Calculus, Genetics)..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      {/* Formula Bank Quick Access */}
      <div className="flex items-center justify-between bg-indigo-950/40 border border-indigo-800/50 rounded-xl p-2.5 text-xs text-indigo-300">
        <div className="flex items-center gap-2">
          <Atom className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>Practicing Science or Maths? Consult the official formula sheet.</span>
        </div>
        <button
          onClick={onOpenFormulas}
          className="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[11px] font-semibold transition-colors shrink-0 cursor-pointer"
        >
          View Formulas
        </button>
      </div>

      {/* Board Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'ALL', label: 'All Exam Boards' },
          { id: 'JAMB_UTME', label: 'JAMB UTME' },
          { id: 'WAEC', label: 'WAEC WASSCE' },
          { id: 'NECO', label: 'NECO / BECE' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              filterType === tab.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Subject Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {subjectFilters.map(sub => (
          <button
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors ${
              selectedSubject === sub
                ? 'bg-slate-800 text-emerald-400 border border-slate-700 font-semibold'
                : 'text-slate-400 hover:text-slate-200 bg-slate-950/60 border border-slate-900'
            }`}
          >
            {sub === 'ALL' ? 'All Subjects' : sub}
          </button>
        ))}
      </div>

      {/* Exam Cards */}
      <div className="space-y-3">
        {filteredExams.length === 0 ? (
          <div className="bg-slate-900/60 rounded-2xl p-6 text-center border border-slate-800/80">
            <BookOpen className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <h3 className="text-xs font-semibold text-slate-300">No examination found</h3>
            <p className="text-[11px] text-slate-500 mt-1">
              Try adjusting your search query or selecting "All Exam Boards".
            </p>
          </div>
        ) : (
          filteredExams.map(exam => (
            <div
              key={exam.id}
              className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 border border-amber-800/60 rounded px-1.5 py-0.2 uppercase">
                      {exam.examType.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-emerald-400 font-medium">
                      {exam.subject}
                    </span>
                    {exam.classLevel && (
                      <>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-[11px] text-slate-400">{exam.classLevel}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white mt-1 leading-snug">
                    {exam.title}
                  </h3>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 shrink-0">
                  <Award className="w-3.5 h-3.5" />
                  <span>+{exam.xpReward} XP</span>
                </div>
              </div>

              {/* Topics Included */}
              <div className="flex flex-wrap gap-1">
                {Array.from(new Set(exam.questions.map(q => q.topicRef).filter(Boolean))).map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/80">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 font-mono">
                    <Timer className="w-3.5 h-3.5 text-slate-400" />
                    {exam.durationMinutes} mins
                  </span>
                  <span>·</span>
                  <span>{exam.questions.length} Questions</span>
                  {exam.year && (
                    <>
                      <span>·</span>
                      <span className="font-mono text-[11px]">{exam.year}</span>
                    </>
                  )}
                </div>

                <button
                  onClick={() => onSelectExam(exam)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Start CBT</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Active CBT Runner with Timer & Palette
interface ActiveCBTRunnerProps {
  exam: CBTExam;
  onExit: () => void;
  onSaveResult: (result: CBTExamResult) => void;
  onGoHome: () => void;
}

const ActiveCBTRunner: React.FC<ActiveCBTRunnerProps> = ({ exam, onExit, onSaveResult, onGoHome }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<number[]>([]);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(exam.durationMinutes * 60);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [examResult, setExamResult] = useState<CBTExamResult | null>(null);
  const [showReviewMode, setShowReviewMode] = useState<boolean>(false);

  const answersRef = React.useRef(answers);
  answersRef.current = answers;
  const secondsRef = React.useRef(secondsRemaining);
  secondsRef.current = secondsRemaining;

  const handleSubmitExam = React.useCallback(() => {
    setIsSubmitModalOpen(false);

    // Calculate score
    let correctCount = 0;
    const currentAnswers = answersRef.current;
    exam.questions.forEach(q => {
      if (currentAnswers[q.id] === q.correctOptionIndex) {
        correctCount += 1;
      }
    });

    const percentage = Math.round((correctCount / exam.questions.length) * 100);
    const xpAwarded = Math.round((percentage / 100) * exam.xpReward) + 50; // Participation base

    const result: CBTExamResult = {
      id: `res-${Date.now()}`,
      examId: exam.id,
      examTitle: exam.title,
      subject: exam.subject,
      score: correctCount,
      totalQuestions: exam.questions.length,
      percentage,
      timeSpentSeconds: exam.durationMinutes * 60 - secondsRef.current,
      xpAwarded,
      date: new Date().toLocaleDateString(),
      answers: currentAnswers
    };

    setExamResult(result);
    onSaveResult(result);
  }, [exam, onSaveResult]);

  // Timer Effect
  useEffect(() => {
    if (examResult) return; // Stopped when submitted

    if (secondsRemaining <= 0) {
      handleSubmitExam();
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [examResult, secondsRemaining, handleSubmitExam]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const toggleFlag = (questionId: number) => {
    setFlagged(prev =>
      prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId]
    );
  };

  const currentQuestion = exam.questions[currentIdx];

  // If exam has been completed, show Results / Review
  if (examResult) {
    return (
      <div className="flex-1 w-full overflow-y-auto px-4 py-5 space-y-4 touch-pan-y text-slate-100">
        {/* Result Summary Card */}
        <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500/80 mx-auto flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-950/50">
            <span className="text-xl font-bold font-mono">{examResult.percentage}%</span>
          </div>

          <div>
            <h2 className="text-base font-bold text-white">
              {examResult.percentage >= 70 ? 'Excellent Performance! 🎉' : 'Drill Completed! 📚'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {exam.title}
            </p>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800">
            <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Score</span>
              <span className="text-xs font-bold text-white font-mono">
                {examResult.score} / {examResult.totalQuestions}
              </span>
            </div>

            <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Time Used</span>
              <span className="text-xs font-bold text-white font-mono">
                {Math.floor(examResult.timeSpentSeconds / 60)}m {examResult.timeSpentSeconds % 60}s
              </span>
            </div>

            <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">XP Earned</span>
              <span className="text-xs font-bold text-emerald-400 font-mono">
                +{examResult.xpAwarded} XP
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => setShowReviewMode(!showReviewMode)}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              {showReviewMode ? 'Hide Explanations' : 'Review Explanations'}
            </button>
            <button
              onClick={onExit}
              className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm"
            >
              Done & Exit
            </button>
          </div>
        </div>

        {/* Question-by-Question Review */}
        {showReviewMode && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Step-by-Step Question Review
            </h3>

            {exam.questions.map((q, idx) => {
              const selectedOpt = answers[q.id];
              const isCorrect = selectedOpt === q.correctOptionIndex;

              return (
                <div
                  key={q.id}
                  className={`bg-slate-900 rounded-2xl p-4 border space-y-2.5 ${
                    isCorrect ? 'border-emerald-800/60' : 'border-rose-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300">Question {idx + 1}</span>
                    <span
                      className={`flex items-center gap-1 font-semibold text-[11px] ${
                        isCorrect ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-white leading-relaxed">
                    {q.question}
                  </p>

                  {/* Options */}
                  <div className="space-y-1.5 pt-1">
                    {q.options.map((opt, oIdx) => {
                      const isOptionSelected = selectedOpt === oIdx;
                      const isOptionCorrect = oIdx === q.correctOptionIndex;

                      let stateClass = 'bg-slate-950/60 border-slate-800 text-slate-300';
                      if (isOptionCorrect) {
                        stateClass = 'bg-emerald-950/80 border-emerald-600/80 text-emerald-200 font-semibold';
                      } else if (isOptionSelected && !isCorrect) {
                        stateClass = 'bg-rose-950/80 border-rose-600/80 text-rose-200';
                      }

                      return (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${stateClass}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold font-mono">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isOptionCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Callout */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-emerald-400 flex items-center gap-1 text-[11px]">
                      <HelpCircle className="w-3.5 h-3.5" />
                      Official Marking Scheme & Explanation:
                    </span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Active Test Interface
  const answeredCount = Object.keys(answers).length;
  const isTimerCritical = secondsRemaining <= 120; // 2 minutes left

  return (
    <div className="flex-1 w-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Test Header Bar */}
      <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2.5 border-b border-slate-800 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={onExit}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
            title="Exit Exam"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xs font-bold text-white truncate max-w-[140px] sm:max-w-[200px]">
              {exam.subject}
            </h2>
            <span className="text-[10px] text-slate-400">
              Q {currentIdx + 1} of {exam.questions.length}
            </span>
          </div>
        </div>

        {/* Timer */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold font-mono tabular-nums border ${
            isTimerCritical
              ? 'bg-rose-950/80 border-rose-600 text-rose-300 animate-pulse'
              : 'bg-slate-800 border-slate-700 text-emerald-400'
          }`}
        >
          <Timer className="w-3.5 h-3.5" />
          <span>{formatTimer(secondsRemaining)}</span>
        </div>

        {/* Submit Trigger */}
        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
        >
          Submit
        </button>
      </div>

      {/* Main Question Surface */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 touch-pan-y max-w-2xl mx-auto w-full">
        {/* Question Box */}
        <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              {currentQuestion.topicRef || exam.subject}
            </span>

            <button
              onClick={() => toggleFlag(currentQuestion.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                flagged.includes(currentQuestion.id)
                  ? 'bg-amber-950/80 text-amber-300 border-amber-600/60'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              <Flag className="w-3 h-3" />
              <span>{flagged.includes(currentQuestion.id) ? 'Flagged' : 'Flag'}</span>
            </button>
          </div>

          <h3 className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Multiple Choice Options */}
        <div className="space-y-2">
          {currentQuestion.options.map((opt, oIdx) => {
            const isSelected = answers[currentQuestion.id] === oIdx;

            return (
              <button
                key={oIdx}
                onClick={() => handleSelectOption(currentQuestion.id, oIdx)}
                className={`w-full p-3.5 rounded-2xl text-left border flex items-center gap-3 transition-all ${
                  isSelected
                    ? 'bg-emerald-950/70 border-emerald-500 text-white shadow-md'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {String.fromCharCode(65 + oIdx)}
                </div>
                <span className="text-xs font-medium leading-snug">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Question Palette Grid */}
        <div className="bg-slate-900/70 rounded-2xl p-3 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Question Palette ({answeredCount}/{exam.questions.length} answered)</span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Done
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Flagged
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {exam.questions.map((q, qIdx) => {
              const isCurrent = qIdx === currentIdx;
              const isAnswered = answers[q.id] !== undefined;
              const isFlagged = flagged.includes(q.id);

              let bgClass = 'bg-slate-800 text-slate-400 border-slate-700';
              if (isFlagged) {
                bgClass = 'bg-amber-950 text-amber-300 border-amber-600';
              } else if (isAnswered) {
                bgClass = 'bg-emerald-950 text-emerald-400 border-emerald-700';
              }

              if (isCurrent) {
                bgClass += ' ring-2 ring-white font-bold';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(qIdx)}
                  className={`w-8 h-8 rounded-lg text-xs font-mono font-medium border flex items-center justify-center transition-all ${bgClass}`}
                >
                  {qIdx + 1}
                </button>
              );
            })}
          </div>
        </div>

        <div className="h-16" />
      </div>

      {/* Bottom Sticky Navigation */}
      <div className="bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-3 shrink-0 flex items-center justify-between gap-3 z-30">
        <button
          onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
          disabled={currentIdx === 0}
          className="flex-1 py-2 px-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-200 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {currentIdx < exam.questions.length - 1 ? (
          <button
            onClick={() => setCurrentIdx(prev => Math.min(exam.questions.length - 1, prev + 1))}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-md"
          >
            <span>Review & Submit</span>
          </button>
        )}
      </div>

      {/* Submit Confirmation Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-white text-center">
              Submit CBT Examination?
            </h3>

            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Total Questions:</span>
                <span className="font-mono font-bold text-white">{exam.questions.length}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Answered:</span>
                <span className="font-mono font-bold">{answeredCount}</span>
              </div>
              <div className="flex justify-between text-amber-400">
                <span>Flagged for Review:</span>
                <span className="font-mono font-bold">{flagged.length}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Unanswered:</span>
                <span className="font-mono font-bold">{exam.questions.length - answeredCount}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
              >
                Keep Answering
              </button>
              <button
                onClick={handleSubmitExam}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm"
              >
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
