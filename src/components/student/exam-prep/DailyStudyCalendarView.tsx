import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { StudyCalendar, StudyBlock } from '../../../types';
import { CBT_EXAMS_DATABASE } from '../../../data/cbtExamData';
import { NairaText } from '../../../utils/currency';
import { TutorCreditBookingModal } from './TutorCreditBookingModal';
import {
  Calendar,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Sparkles,
  Users,
  RotateCcw,
  ChevronRight,
  Flame,
  ArrowRight,
  Lightbulb,
  Check
} from 'lucide-react';

interface DailyStudyCalendarViewProps {
  calendar: StudyCalendar;
  onRetakeDiagnostic: () => void;
}

export const DailyStudyCalendarView: React.FC<DailyStudyCalendarViewProps> = ({
  calendar,
  onRetakeDiagnostic
}) => {
  const {
    student,
    examPrepState,
    toggleStudyBlockCompleted,
    startExam,
    setActiveStudentTab
  } = useApp();

  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);
  const [activeBookingBlock, setActiveBookingBlock] = useState<StudyBlock | null>(null);

  const completedBlockIds = examPrepState.completedBlockIds || [];
  const tutorCredits = examPrepState.tutorCreditsNaira || 0;

  // Calculate total blocks & completion percentage
  const allBlocks = calendar.days.flatMap(d => d.blocks);
  const totalBlocksCount = allBlocks.length;
  const completedBlocksCount = allBlocks.filter(b => completedBlockIds.includes(b.id)).length;
  const progressPercent = totalBlocksCount > 0 ? Math.round((completedBlocksCount / totalBlocksCount) * 100) : 0;

  const currentDay = calendar.days.find(d => d.dayNumber === selectedDayNumber) || calendar.days[0];

  const handleLaunchDrill = (block: StudyBlock) => {
    // Look up exam in database or default to first exam matching subject/level
    let matchingExam = CBT_EXAMS_DATABASE.find(e => e.id === block.cbtExamId);
    if (!matchingExam) {
      matchingExam = CBT_EXAMS_DATABASE.find(e =>
        e.subject.toLowerCase().includes(block.subject.toLowerCase()) ||
        block.subject.toLowerCase().includes(e.subject.toLowerCase())
      );
    }
    if (!matchingExam) {
      matchingExam = CBT_EXAMS_DATABASE[0];
    }

    if (matchingExam) {
      startExam(matchingExam);
    } else {
      setActiveStudentTab('cbt');
    }
  };

  return (
    <div className="flex-1 min-h-0 h-full w-full flex flex-col overflow-y-auto px-4 pt-4 pb-24 space-y-4 touch-pan-y text-slate-100">
      {/* 1. Header Card: Calendar Title, Class & Progress */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Class {calendar.classLevel}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-semibold">{calendar.targetExam}</span>
            </div>
            <h1 className="text-lg font-black text-slate-100 mt-0.5 leading-snug">
              {calendar.title}
            </h1>
          </div>
          <button
            type="button"
            onClick={onRetakeDiagnostic}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-300 transition-colors cursor-pointer shrink-0"
            title="Update diagnostic survey"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Re-profile</span>
          </button>
        </div>

        {/* Progress Bar & Stats */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Roadmap Progress</span>
              <span className="text-emerald-400 font-mono font-bold">{progressPercent}% Completed</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              {completedBlocksCount} of {totalBlocksCount} study blocks mastered
            </div>
          </div>

          {/* ₦4,000 Tutor Credits Badge */}
          <div className="p-2.5 px-3 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-800/80 border border-emerald-500/30 flex items-center justify-between gap-3 shrink-0">
            <div>
              <div className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wide">Available Tutor Credits</div>
              <div className="text-base font-black text-slate-50 font-mono">
                <NairaText amount={tutorCredits} />
              </div>
            </div>
            <span className="text-[10px] text-slate-400 max-w-[100px] text-right">
              Applies to 1-on-1 sessions
            </span>
          </div>
        </div>
      </div>

      {/* 2. Horizontal Day Selector Strip */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            14-Day Revision Timeline
          </h2>
          <span className="text-[11px] text-slate-500">
            Viewing Day {selectedDayNumber} of {calendar.days.length}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          {calendar.days.map(d => {
            const isSelected = d.dayNumber === selectedDayNumber;
            const isDayFinished = d.blocks.every(b => completedBlockIds.includes(b.id));

            return (
              <button
                key={d.dayNumber}
                type="button"
                onClick={() => setSelectedDayNumber(d.dayNumber)}
                className={`py-2 px-3.5 rounded-2xl border text-center transition-all cursor-pointer shrink-0 flex flex-col items-center min-w-[70px] ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20 font-bold'
                    : isDayFinished
                    ? 'bg-slate-900 border-emerald-800/50 text-emerald-400 hover:bg-slate-800'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-slate-100'
                }`}
              >
                <div className="text-[10px] uppercase tracking-wide opacity-80">Day</div>
                <div className="text-base font-black leading-none mt-0.5">{d.dayNumber}</div>
                {isDayFinished && (
                  <CheckCircle2 className={`w-3 h-3 mt-1 ${isSelected ? 'text-slate-950' : 'text-emerald-400'}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Active Day Deck */}
      <div className="space-y-3">
        {/* Daily Focus Theme Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border border-slate-700/80 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="font-semibold text-amber-300">{currentDay.dateLabel} Focus:</span>
              <span>{currentDay.title}</span>
            </div>
            <p className="text-xs text-slate-200 font-medium mt-0.5">
              "{currentDay.focusTheme}"
            </p>
          </div>
        </div>

        {/* Study Blocks */}
        <div className="space-y-3">
          {currentDay.blocks.map((block, idx) => {
            const isCompleted = completedBlockIds.includes(block.id);

            return (
              <div
                key={block.id}
                className={`p-4 rounded-3xl border transition-all ${
                  isCompleted
                    ? 'bg-slate-900/60 border-emerald-800/40 opacity-95'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 shadow-sm'
                }`}
              >
                {/* Block Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 uppercase tracking-wider">
                      Block {idx + 1}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{block.timeSlot}</span>
                    </div>
                  </div>

                  {/* Completion Toggle */}
                  <button
                    type="button"
                    onClick={() => toggleStudyBlockCompleted(block.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Done (+50 XP)</span>
                      </>
                    ) : (
                      <span>Mark Complete</span>
                    )}
                  </button>
                </div>

                {/* Subject & Topic */}
                <div className="mt-2.5">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    {block.subject}
                  </div>
                  <h3 className="text-sm font-black text-slate-100 mt-0.5 leading-snug">
                    {block.topic}
                  </h3>
                </div>

                {/* Key Objectives */}
                {block.keyObjectives && block.keyObjectives.length > 0 && (
                  <div className="mt-3 space-y-1">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Key Objectives:</span>
                    <ul className="space-y-1">
                      {block.keyObjectives.map((obj, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                          <span className="text-emerald-500 mt-0.5 leading-none">•</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Interactive Action Strip: CBT Practice Drill + 1-on-1 Tutor Booking */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  {/* Action 1: CBT Drill Shortcut */}
                  <button
                    type="button"
                    onClick={() => handleLaunchDrill(block)}
                    className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Take Practice Drill ({block.drillQuestionCount} Qs)</span>
                  </button>

                  {/* Action 2: Book Tutor with ₦4,000 Credit */}
                  <button
                    type="button"
                    onClick={() => setActiveBookingBlock(block)}
                    className="py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Book Tutor on This Topic</span>
                    <span className="text-[10px] text-emerald-400 font-bold ml-0.5">(-₦4,000 Credit)</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Strategy Advice Box */}
      {calendar.strategyTips && calendar.strategyTips.length > 0 && (
        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>WAEC & NERDC Examiner Recommendations</span>
          </div>
          <ul className="space-y-1.5">
            {calendar.strategyTips.map((tip, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-emerald-400 font-bold">{idx + 1}.</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 5. 1-on-1 Tutor Booking Modal with Credits */}
      {activeBookingBlock && (
        <TutorCreditBookingModal
          isOpen={Boolean(activeBookingBlock)}
          onClose={() => setActiveBookingBlock(null)}
          suggestedSubject={activeBookingBlock.suggestedTutorSubject || activeBookingBlock.subject}
          suggestedTopic={activeBookingBlock.suggestedTutorTopic || activeBookingBlock.topic}
          onBookingSuccess={() => setActiveBookingBlock(null)}
        />
      )}
    </div>
  );
};
