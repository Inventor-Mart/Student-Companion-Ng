import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { DiagnosticProfile, NigerianClassLevel, AcademicStream } from '../../../types';
import { SECONDARY_SUBJECT_CATALOG } from '../../../data/examPrepCurriculumData';
import {
  Sparkles,
  BookOpen,
  Target,
  Clock,
  Check,
  ChevronRight,
  ChevronLeft,
  X,
  AlertCircle
} from 'lucide-react';

interface DiagnosticQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleted: () => void;
}

export const DiagnosticQuizModal: React.FC<DiagnosticQuizModalProps> = ({
  isOpen,
  onClose,
  onCompleted
}) => {
  const { student, generateExamPrepCalendar } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [classLevel, setClassLevel] = useState<NigerianClassLevel>(student.classLevel || 'SS 3');
  const [stream, setStream] = useState<AcademicStream>(student.stream || (student.classLevel.startsWith('JSS') ? 'Junior' : 'Science'));

  const isJunior = classLevel.startsWith('JSS');
  const isJss3 = classLevel === 'JSS 3';
  const isSs3 = classLevel === 'SS 3';

  const defaultTargetExam = isSs3 ? 'WAEC' : (isJss3 ? 'BECE' : 'TERM_MOCK');
  const [targetExam, setTargetExam] = useState<'BECE' | 'WAEC' | 'JAMB_UTME' | 'TERM_MOCK'>(defaultTargetExam);

  const availableSubjects = stream === 'Junior'
    ? SECONDARY_SUBJECT_CATALOG['Junior']
    : (stream === 'Science' ? SECONDARY_SUBJECT_CATALOG['Science'] : SECONDARY_SUBJECT_CATALOG['Non-Science']);

  const [weakSubjects, setWeakSubjects] = useState<string[]>([]);
  const [strongSubjects, setStrongSubjects] = useState<string[]>([]);
  const [dailyHours, setDailyHours] = useState<number>(2.5);
  const [timeOfDay, setTimeOfDay] = useState<'Morning' | 'Afternoon' | 'Evening'>('Evening');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  if (!isOpen) return null;

  const toggleWeakSubject = (sub: string) => {
    setWeakSubjects(prev => {
      if (prev.includes(sub)) return prev.filter(s => s !== sub);
      if (prev.length >= 3) return [...prev.slice(1), sub];
      return [...prev, sub];
    });
    // Remove from strong if selected
    setStrongSubjects(prev => prev.filter(s => s !== sub));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    const profile: DiagnosticProfile = {
      classLevel,
      stream: isJunior ? 'Junior' : stream,
      targetExam,
      weakSubjects: weakSubjects.length > 0 ? weakSubjects : [isJunior ? 'Mathematics' : 'General Mathematics'],
      strongSubjects: strongSubjects.length > 0 ? strongSubjects : ['English Language'],
      dailyStudyHours: dailyHours,
      preferredTimeOfDay: timeOfDay
    };

    try {
      await generateExamPrepCalendar(profile);
      setIsGenerating(false);
      onCompleted();
    } catch (err) {
      console.error('Failed to generate study calendar:', err);
      setIsGenerating(false);
      onCompleted();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl relative overflow-hidden text-slate-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">AI Diagnostic Profiler</h2>
              <p className="text-[10px] text-slate-400">Step {step} of 3 · Personalizing your curriculum roadmap</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full my-3 overflow-hidden shrink-0">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="overflow-y-auto flex-1 py-1 pr-1 space-y-4">
          {/* STEP 1: Class, Stream & Target Exam */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  1. Current Class Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3'] as NigerianClassLevel[]).map(lvl => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => {
                        setClassLevel(lvl);
                        if (lvl.startsWith('JSS')) setStream('Junior');
                        if (lvl === 'JSS 3') setTargetExam('BECE');
                        else if (lvl === 'SS 3') setTargetExam('WAEC');
                        else setTargetExam('TERM_MOCK');
                      }}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        classLevel === lvl
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/40'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {!isJunior && (
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    2. Academic Stream
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setStream('Science')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        stream === 'Science'
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/40'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="text-xs font-bold">Science Stream</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Maths, Physics, Chem, Bio, Further Maths</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStream('Non-Science')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        stream === 'Non-Science'
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/40'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="text-xs font-bold">Arts & Commercial</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Economics, Govt, Literature, Accounting</div>
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  {isJunior ? '2. Primary Target Exam' : '3. Primary Target Exam'}
                </label>
                <div className="space-y-1.5">
                  {isSs3 ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setTargetExam('WAEC')}
                        className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                          targetExam === 'WAEC'
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold">WAEC (WASSCE) Theory & Objectives</div>
                          <div className="text-[10px] text-slate-400">Step-by-step marking schemes & essay drills</div>
                        </div>
                        {targetExam === 'WAEC' && <Check className="w-4 h-4 text-emerald-400" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => setTargetExam('JAMB_UTME')}
                        className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                          targetExam === 'JAMB_UTME'
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold">JAMB UTME CBT Speed Master</div>
                          <div className="text-[10px] text-slate-400">40-second speed-solving past question drills</div>
                        </div>
                        {targetExam === 'JAMB_UTME' && <Check className="w-4 h-4 text-emerald-400" />}
                      </button>
                    </>
                  ) : isJss3 ? (
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-emerald-500/40 text-xs">
                      <div className="font-bold text-emerald-400">BECE Junior WAEC National Certificate</div>
                      <div className="text-[11px] text-slate-300 mt-0.5">
                        Focused preparation for entrance into Senior Secondary (SS 1).
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-emerald-500/40 text-xs">
                      <div className="font-bold text-emerald-400">Continuous Assessment & Promotion Exam</div>
                      <div className="text-[11px] text-slate-300 mt-0.5">
                        Termly syllabus pacing to rank at the top of your class.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Weak Area Identification */}
          {step === 2 && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-200">
                  Select up to <strong className="font-bold text-amber-300">3 priority subjects</strong> where you need extra study drills and tutor booking recommendations.
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Select Priority Weak Subjects:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableSubjects.map(sub => {
                    const isSelected = weakSubjects.includes(sub);
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => toggleWeakSubject(sub)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-500 text-amber-200 ring-1 ring-amber-500/30'
                            : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className="text-xs font-medium truncate">{sub}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {weakSubjects.length > 0 && (
                <div className="text-[11px] text-slate-400">
                  Selected for intensive pacing: <span className="text-slate-200 font-medium">{weakSubjects.join(', ')}</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Study Habits & Availability */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Daily Study Time Allocation
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { hrs: 1.5, label: '1.5 Hours', desc: 'Light pace' },
                    { hrs: 2.5, label: '2.5 Hours', desc: 'Recommended' },
                    { hrs: 4.0, label: '4.0 Hours', desc: 'Intensive sprint' }
                  ].map(item => (
                    <button
                      key={item.hrs}
                      type="button"
                      onClick={() => setDailyHours(item.hrs)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        dailyHours === item.hrs
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/40'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Preferred Time of Day
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Morning', 'Afternoon', 'Evening'] as const).map(time => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setTimeOfDay(time)}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        timeOfDay === time
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/80 text-xs space-y-1">
                <div className="text-slate-300 font-semibold">Summary of Your Plan:</div>
                <div className="text-slate-400 text-[11px] leading-relaxed">
                  • <strong className="text-slate-200">{classLevel}</strong> ({stream} Stream)<br />
                  • Focus: <strong className="text-slate-200">{weakSubjects.length > 0 ? weakSubjects.join(', ') : 'All Core Subjects'}</strong><br />
                  • Pace: <strong className="text-slate-200">{dailyHours} hours daily</strong> during the {timeOfDay.toLowerCase()}<br />
                  • Included: <strong className="text-emerald-400">₦4,000 Tutor Credits</strong> for 1-on-1 difficult concept review
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="pt-3 border-t border-slate-800/80 shrink-0 flex items-center justify-between gap-2">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((step - 1) as any)}
              disabled={isGenerating}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((step + 1) as any)}
              className="py-2.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-slate-950 flex items-center gap-1.5 transition-colors cursor-pointer ml-auto"
            >
              <span>Continue</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-xs font-bold text-slate-950 flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-60 ml-auto"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing NERDC Plan...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Study Calendar</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
