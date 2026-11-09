import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { UNLOCK_FEE_NAIRA, INCLUDED_TUTOR_CREDITS_NAIRA } from '../../../data/examPrepCurriculumData';
import { NairaText } from '../../../utils/currency';
import { ExamPrepUnlockModal } from './ExamPrepUnlockModal';
import { DiagnosticQuizModal } from './DiagnosticQuizModal';
import { DailyStudyCalendarView } from './DailyStudyCalendarView';
import {
  Lock,
  Unlock,
  Sparkles,
  Calendar,
  Award,
  BookOpen,
  CheckCircle2,
  Users,
  ShieldCheck,
  ArrowRight,
  Flame,
  Clock,
  Lightbulb,
  ChevronRight
} from 'lucide-react';

export const PrepareForExamHub: React.FC = () => {
  const { student, examPrepState } = useApp();

  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [isDiagnosticModalOpen, setIsDiagnosticModalOpen] = useState(false);

  const isUnlocked = examPrepState?.isUnlocked || false;
  const activeCalendar = examPrepState?.activeCalendar;

  const isJunior = student.classLevel.startsWith('JSS');
  const isJss3 = student.classLevel === 'JSS 3';
  const isSs3 = student.classLevel === 'SS 3';

  // Preview label for student class
  let targetExamLabel = 'Termly Promotion Exams';
  if (isSs3) targetExamLabel = 'WAEC (WASSCE) & JAMB UTME';
  else if (isJss3) targetExamLabel = 'BECE Junior WAEC Certificate';
  else if (isJunior) targetExamLabel = `${student.classLevel} Continuous Assessment & Promotion`;
  else targetExamLabel = `${student.classLevel} Senior School Promotion`;

  // If unlocked and calendar is active, show the daily study calendar
  if (isUnlocked && activeCalendar) {
    return (
      <>
        <DailyStudyCalendarView
          calendar={activeCalendar}
          onRetakeDiagnostic={() => setIsDiagnosticModalOpen(true)}
        />
        <DiagnosticQuizModal
          isOpen={isDiagnosticModalOpen}
          onClose={() => setIsDiagnosticModalOpen(false)}
          onCompleted={() => setIsDiagnosticModalOpen(false)}
        />
      </>
    );
  }

  // If unlocked but calendar not yet generated, prompt to take diagnostic
  if (isUnlocked && !activeCalendar) {
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center p-6 text-center text-slate-100">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-4 animate-bounce">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-50">Feature Unlocked!</h2>
        <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
          You have unlocked <strong className="text-emerald-400">Prepare For Exam</strong> with <strong className="text-emerald-400">₦4,000 in Tutor Credits</strong> ready for your account. Complete a quick 1-minute diagnostic to generate your timetable.
        </p>

        <button
          type="button"
          onClick={() => setIsDiagnosticModalOpen(true)}
          className="mt-6 py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
        >
          <span>Start Diagnostic Profiler</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <DiagnosticQuizModal
          isOpen={isDiagnosticModalOpen}
          onClose={() => setIsDiagnosticModalOpen(false)}
          onCompleted={() => setIsDiagnosticModalOpen(false)}
        />
      </div>
    );
  }

  // LOCKED STATE: High-impact conversion deck
  return (
    <div className="flex-1 w-full flex flex-col overflow-y-auto px-4 py-4 space-y-4 touch-pan-y text-slate-100">
      {/* 1. Hero Locked Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-emerald-500/30 shadow-xl relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -ml-10 -mb-10" />

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Prepare For Exam · Class {student.classLevel}</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-slate-50 mt-1 leading-tight tracking-tight">
          AI Daily Study Calendar & Tutor Booking
        </h1>

        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
          Structured day-by-day revision roadmap aligned with NERDC syllabus for normal classes (<strong className="text-slate-100">JSS 1-2, SS 1-2</strong>), and national certificate exams (<strong className="text-emerald-300">BECE for JSS 3</strong> and <strong className="text-emerald-300">WAEC & JAMB for SS 3</strong>).
        </p>

        {/* Highlighted Value Pillar */}
        <div className="mt-4 p-3.5 rounded-2xl bg-slate-800/80 border border-emerald-500/30 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Access Pass</div>
            <div className="text-xl font-black text-slate-50 font-mono mt-0.5">
              <NairaText amount={UNLOCK_FEE_NAIRA} />
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 py-1 px-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Includes ₦4,000 Tutor Credits</span>
            </span>
            <div className="text-[10px] text-slate-400 mt-1">Directly applies to 1-on-1 sessions</div>
          </div>
        </div>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={() => setIsUnlockModalOpen(true)}
          className="w-full mt-4 py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 transition-all cursor-pointer"
        >
          <Lock className="w-4 h-4" />
          <span>Unlock Feature for ₦15,000 (+ ₦4,000 Credit)</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* 2. Key Pillars of 'Prepare For Exam' */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          How It Supercharges Your Exam Performance
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Pillar 1 */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800/80 space-y-1">
            <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-1.5">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-bold text-slate-100">Structured Daily Timetable</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Eliminate revision guesswork with day-by-day blocks covering high-yield NERDC syllabus topics.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800/80 space-y-1">
            <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-1.5">
              <Award className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-bold text-slate-100">Direct CBT Practice Drills</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Every study block includes direct practice shortcuts mapped to WAEC, JAMB, or BECE past question papers.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800/80 space-y-1">
            <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-1.5">
              <Users className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-bold text-slate-100">Integrated Topic Tutor Support</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Stuck on Calculus or Organic Chemistry? 1-click booking pre-fills difficult topics with vetted Nigerian educators.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800/80 space-y-1">
            <div className="w-7 h-7 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-bold text-slate-100">₦4,000 Tutor Credit Subsidy</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Your ₦15,000 unlock instantly gives you ₦4,000 in credit, bringing the effective curriculum cost down to just ₦11,000.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Sample Schedule Preview (Locked) */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sample Timetable Preview</span>
            <h3 className="text-xs font-bold text-slate-100 mt-0.5">Day 1: Diagnostic Baseline & Speed Drill</h3>
          </div>
          <span className="text-[10px] py-0.5 px-2 rounded-md bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/20">
            Locked
          </span>
        </div>

        {/* Mock Block 1 */}
        <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="text-emerald-400 font-bold">{isJunior ? 'Mathematics' : 'General Mathematics'}</span>
            <span>04:30 PM - 05:45 PM</span>
          </div>
          <div className="text-xs font-semibold text-slate-200">
            {isJunior ? 'Fractions, Decimals & Basic Number Bases' : 'Algebraic Fractions, Simultaneous Equations & Word Problems'}
          </div>
          <div className="text-[10px] text-slate-400 flex items-center gap-1.5 pt-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Includes 15-question CBT speed test</span>
          </div>
        </div>

        {/* Mock Block 2 */}
        <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="text-emerald-400 font-bold">English Language</span>
            <span>06:15 PM - 07:30 PM</span>
          </div>
          <div className="text-xs font-semibold text-slate-200">
            Lexis & Structure, Concord and Oral English Stress Patterns
          </div>
          <div className="text-[10px] text-slate-400 flex items-center gap-1.5 pt-1">
            <Users className="w-3 h-3 text-amber-400" />
            <span>Suggested Tutor: Oral English Specialist (-₦4,000 credit)</span>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => setIsUnlockModalOpen(true)}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Unlock All 14 Days of Your {targetExamLabel} Roadmap</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Unlock Modal */}
      <ExamPrepUnlockModal
        isOpen={isUnlockModalOpen}
        onClose={() => setIsUnlockModalOpen(false)}
        onSuccess={() => {
          setIsUnlockModalOpen(false);
          setIsDiagnosticModalOpen(true);
        }}
      />

      {/* Diagnostic Modal */}
      <DiagnosticQuizModal
        isOpen={isDiagnosticModalOpen}
        onClose={() => setIsDiagnosticModalOpen(false)}
        onCompleted={() => setIsDiagnosticModalOpen(false)}
      />
    </div>
  );
};
