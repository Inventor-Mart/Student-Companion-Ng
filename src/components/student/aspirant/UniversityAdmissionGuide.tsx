import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  NIGERIAN_UNIVERSITIES_DATABASE,
  checkJambSubjectCombination,
  calculateAggregate
} from '../../../data/universityAdmissionData';
import {
  Search,
  Building2,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Calculator,
  Compass,
  Sparkles,
  Info
} from 'lucide-react';

export const UniversityAdmissionGuide: React.FC = () => {
  const { aspirantGoal, updateAspirantGoal, setActiveStudentTab } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('ALL');

  // Interactive Subject Combinator State
  const [testCourse, setTestCourse] = useState(aspirantGoal.targetCourse || 'Medicine and Surgery');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(aspirantGoal.subjectCombination || [
    'English Language',
    'Biology',
    'Chemistry',
    'Physics'
  ]);

  // Aggregate Calculator State
  const [calcJambScore, setCalcJambScore] = useState<number>(295);
  const [calcPostUtmeScore, setCalcPostUtmeScore] = useState<number>(24);
  const [calcMethod, setCalcMethod] = useState<'unilag_style' | 'oau_style' | 'standard_50_50'>('unilag_style');

  const availableSubjectsList = [
    'English Language',
    'Mathematics',
    'Biology',
    'Chemistry',
    'Physics',
    'Literature in English',
    'Government',
    'Economics',
    'Commerce',
    'Financial Accounting',
    'CRS',
    'IRS',
    'Geography',
    'Agricultural Science'
  ];

  const combinationAnalysis = checkJambSubjectCombination(testCourse, selectedSubjects);

  const faculties = [
    'ALL',
    'College of Medicine',
    'Faculty of Law',
    'Faculty of Engineering',
    'Faculty of Science',
    'Management Sciences'
  ];

  const filteredUniversities = NIGERIAN_UNIVERSITIES_DATABASE.filter(uni => {
    const matchesSearch =
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.courses.some(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFaculty =
      selectedFaculty === 'ALL' ||
      uni.courses.some(c => c.faculty.toLowerCase().includes(selectedFaculty.toLowerCase()));

    return matchesSearch && matchesFaculty;
  });

  const toggleSubject = (subject: string) => {
    if (subject === 'English Language') return; // Compulsory in JAMB
    if (selectedSubjects.includes(subject)) {
      if (selectedSubjects.length > 2) {
        setSelectedSubjects(prev => prev.filter(s => s !== subject));
      }
    } else {
      if (selectedSubjects.length < 4) {
        setSelectedSubjects(prev => [...prev, subject]);
      } else {
        setSelectedSubjects(prev => [...prev.slice(0, 3), subject]);
      }
    }
  };

  const computedAggregate = calculateAggregate(calcJambScore, calcPostUtmeScore, 30, calcMethod);

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-5 touch-pan-y text-slate-100">
      {/* 1. Header Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-950 border border-indigo-500/30 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
          <Compass className="w-4 h-4" />
          <span>Admission & University Guide</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-slate-50 mt-1 leading-tight tracking-tight">
          Nigerian Universities, Cut-Off Marks & Subject Combinations
        </h1>

        <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-xl">
          Verified departmental cut-off marks, official JAMB brochure prerequisites, and Post-UTME screening formulas for federal and state universities across Nigeria.
        </p>

        {/* Current Target Pill */}
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-950/80 border border-indigo-700/60 text-xs">
          <GraduationCap className="w-4 h-4 text-indigo-400" />
          <span>Your Target: <strong className="text-white">{aspirantGoal.targetCourse}</strong> at <strong className="text-indigo-300">{aspirantGoal.targetUniversity}</strong></span>
        </div>
      </div>

      {/* 2. Interactive JAMB Subject Combinator Tool */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">Official JAMB Brochure Subject Checker</h2>
              <p className="text-[11px] text-slate-400">Verify your 4 UTME subjects to avoid automatic disqualification</p>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            combinationAnalysis.isValid
              ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
              : 'bg-rose-950 text-rose-400 border-rose-800'
          }`}>
            {combinationAnalysis.isValid ? 'Valid Combination' : 'Invalid Combination'}
          </span>
        </div>

        {/* Select Desired Course */}
        <div>
          <label className="text-xs text-slate-400 font-semibold block mb-1">Target University Course:</label>
          <select
            value={testCourse}
            onChange={e => setTestCourse(e.target.value)}
            className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
          >
            <option value="Medicine and Surgery">Medicine and Surgery (Human Health)</option>
            <option value="Law">Law (Civil Law / Common Law)</option>
            <option value="Computer Science">Computer Science / Software Engineering</option>
            <option value="Nursing Science">Nursing Science</option>
            <option value="Mechanical Engineering">Mechanical / Electrical Engineering</option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="Accounting">Accounting / Finance</option>
            <option value="Economics">Economics</option>
            <option value="Mass Communication">Mass Communication / Media</option>
          </select>
        </div>

        {/* Select 4 Subjects */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Select Exactly 4 JAMB Subjects:</span>
            <span className="font-mono font-bold text-amber-400">{selectedSubjects.length} of 4 Selected</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {availableSubjectsList.map(subj => {
              const isSelected = selectedSubjects.includes(subj);
              const isCompulsory = subj === 'English Language';

              return (
                <button
                  key={subj}
                  type="button"
                  onClick={() => toggleSubject(subj)}
                  disabled={isCompulsory}
                  className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  } ${isCompulsory ? 'opacity-90 cursor-default' : ''}`}
                >
                  {isCompulsory ? `${subj} (Compulsory)` : subj}
                </button>
              );
            })}
          </div>
        </div>

        {/* Combinator Output Alert */}
        <div className={`p-3 rounded-2xl border text-xs leading-relaxed flex items-start gap-2.5 ${
          combinationAnalysis.isValid
            ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
            : 'bg-rose-950/50 border-rose-800/60 text-rose-200'
        }`}>
          {combinationAnalysis.isValid ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <p className="font-semibold">{combinationAnalysis.advice}</p>
            <p className="text-[11px] opacity-80">
              Official JAMB Brochure requirement for {testCourse}: <strong>{combinationAnalysis.required.join(' + ')}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* 3. Aggregate Cut-off Calculator Widget */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100">Post-UTME Aggregate Score Estimator</h2>
            <p className="text-[11px] text-slate-400">Calculate composite admission points (UNILAG, OAU, UI standards)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Your JAMB Score (out of 400):</label>
            <input
              type="number"
              min={100}
              max={400}
              value={calcJambScore}
              onChange={e => setCalcJambScore(parseInt(e.target.value) || 0)}
              className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono font-bold text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Post-UTME Score (e.g. out of 30):</label>
            <input
              type="number"
              min={0}
              max={30}
              value={calcPostUtmeScore}
              onChange={e => setCalcPostUtmeScore(parseInt(e.target.value) || 0)}
              className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono font-bold text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Formula Model:</label>
            <select
              value={calcMethod}
              onChange={e => setCalcMethod(e.target.value as any)}
              className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="unilag_style">UNILAG Formula (JAMB 50% + PUTME 30% + O'Level 20%)</option>
              <option value="oau_style">OAU Formula (JAMB 50% + PUTME 40% + O'Level 10%)</option>
              <option value="standard_50_50">UI Standard 50/50 Model</option>
            </select>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-800/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">Estimated Aggregate Points</span>
            <div className="text-2xl font-black text-white font-mono">{computedAggregate} / 100</div>
          </div>
          <span className="text-xs text-slate-300 max-w-xs text-right">
            Competitive for top tier admissions when aggregate exceeds 75–82 points.
          </span>
        </div>
      </div>

      {/* 4. Searchable Universities Directory */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <h2 className="text-sm font-bold text-slate-100">Accredited Nigerian Universities</h2>
            <p className="text-[11px] text-slate-400">Departmental cut-off marks and Post-UTME screening methods</p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search UNILAG, UI, Medicine, Law..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full py-1.5 pl-9 pr-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Faculty Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {faculties.map(fac => (
            <button
              key={fac}
              type="button"
              onClick={() => setSelectedFaculty(fac)}
              className={`py-1 px-3 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedFaculty === fac
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {fac === 'ALL' ? 'All Faculties' : fac}
            </button>
          ))}
        </div>

        {/* Universities List */}
        <div className="space-y-4">
          {filteredUniversities.map(uni => (
            <div key={uni.id} className="p-4 sm:p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-black text-sm">
                    {uni.shortName}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">{uni.name}</h3>
                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        {uni.type} · {uni.state}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{uni.overview}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">General Cut-Off</span>
                    <span className="text-sm font-black text-emerald-400 font-mono">{uni.generalCutOff}</span>
                  </div>
                </div>
              </div>

              {/* Course Cutoffs Table */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Departmental Cut-Off Points & UTME Combinations:
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {uni.courses.map((course, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2 text-xs"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-slate-100">{course.name}</h4>
                          <span className="text-[10px] text-indigo-400">{course.faculty}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-amber-400 text-sm block">
                            {course.meritCutOff}
                          </span>
                          <span className="text-[9px] text-slate-400 block">Merit Cutoff</span>
                        </div>
                      </div>

                      <div className="space-y-1 text-[11px] text-slate-300">
                        <div>
                          <strong className="text-slate-400">JAMB:</strong> {course.jambSubjects.join(' + ')}
                        </div>
                        <div>
                          <strong className="text-slate-400">Post-UTME:</strong> {course.postUtmeFormat}
                        </div>
                        <p className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-800/60">
                          Tip: {course.tips}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* External Portal Link */}
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">
                  Screening Method: <strong className="text-slate-200">{uni.screeningMethod}</strong>
                </span>
                <a
                  href={uni.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  <span>Official Admission Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
