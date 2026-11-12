import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Send,
  BookOpen,
  Brain,
  CheckCircle,
  HelpCircle,
  RefreshCw,
  Lightbulb,
  Copy,
  ChevronRight,
  Flame,
  Award,
  Lock,
  Radio,
  Bot
} from 'lucide-react';
import { playSound } from '../../utils/audioSynthesis';

interface AiStudyCoachProps {
  initialSubject?: string;
  initialTopic?: string;
}

interface QuickPromptItem {
  label: string;
  prompt: string;
  subject: string;
  exam: string;
  category: 'SS3' | 'JSS3' | 'JSS' | 'SS';
}

const ALL_QUICK_PROMPTS: QuickPromptItem[] = [
  // SS 3 Exclusive Drills (JAMB / WAEC)
  {
    label: 'JAMB Physics: Projectile Motion',
    prompt: 'Give me a typical JAMB UTME question on projectile motion (maximum height and time of flight) and show the 30-second speed-solving trick.',
    subject: 'Physics',
    exam: 'JAMB UTME',
    category: 'SS3'
  },
  {
    label: 'WAEC Maths: Quadratic by Formula',
    prompt: 'Explain the quadratic formula step-by-step for 2x² - 5x - 3 = 0. Show what WAEC examiners award marks for in theory paper 2.',
    subject: 'Mathematics',
    exam: 'WAEC WASSCE',
    category: 'SS3'
  },
  {
    label: 'JAMB Chemistry: Gas Laws',
    prompt: 'Solve an ideal gas law question (PV = nRT) at STP with common distractor traps that JAMB sets in options A, B, C, D.',
    subject: 'Chemistry',
    exam: 'JAMB UTME',
    category: 'SS3'
  },
  {
    label: 'WAEC English: Summary Writing',
    prompt: 'What are the 5 golden rules for scoring maximum marks in WAEC English Language summary writing? Give a practical example.',
    subject: 'English Language',
    exam: 'WAEC WASSCE',
    category: 'SS3'
  },
  // JSS 3 BECE Drills
  {
    label: 'BECE Maths: Linear Equations',
    prompt: 'Solve a typical BECE Junior WAEC linear equation problem step-by-step with clear working: 3(2x - 4) = 4x + 8.',
    subject: 'Mathematics',
    exam: 'BECE / Junior WAEC',
    category: 'JSS3'
  },
  {
    label: 'BECE English: Concord Rules',
    prompt: 'Explain the rule of grammatical concord for compound subjects with either/or and neither/nor tested in BECE examinations.',
    subject: 'English Language',
    exam: 'BECE / Junior WAEC',
    category: 'JSS3'
  },
  {
    label: 'BECE Basic Science: Energy Forms',
    prompt: 'Summarize potential versus kinetic energy transformations with real-world examples commonly asked in BECE Junior examinations.',
    subject: 'Basic Science',
    exam: 'BECE / Junior WAEC',
    category: 'JSS3'
  },
  {
    label: 'BECE Business Studies: Cash Book',
    prompt: 'Show how to enter cash and bank transactions in a two-column cash book format for BECE Business Studies exams.',
    subject: 'Business Studies',
    exam: 'BECE / Junior WAEC',
    category: 'JSS3'
  },
  // JSS Foundation
  {
    label: 'JSS Fractions & BODMAS',
    prompt: 'Explain how to solve (2/3 + 1/4) ÷ 5/6 step-by-step using BODMAS rules for junior secondary continuous assessment.',
    subject: 'Mathematics',
    exam: 'Continuous Assessment',
    category: 'JSS'
  },
  {
    label: 'JSS English Parts of Speech',
    prompt: 'Explain pronouns, adverbs, and conjunctions with clear examples suitable for junior secondary students.',
    subject: 'English Language',
    exam: 'Continuous Assessment',
    category: 'JSS'
  },
  // SS Senior Drills
  {
    label: 'SS Biology: Mitosis vs Meiosis',
    prompt: 'Compare mitosis and meiosis in a clear tabular format highlighting chromosomes count, location, and biological importance.',
    subject: 'Biology',
    exam: 'WAEC / NECO',
    category: 'SS'
  },
  {
    label: 'SS Economics: Elasticity of Demand',
    prompt: 'Calculate price elasticity of demand with practical formulas and explain elastic vs inelastic goods with Nigerian market examples.',
    subject: 'Economics',
    exam: 'WAEC / JAMB',
    category: 'SS'
  }
];

export const AiStudyCoach: React.FC<AiStudyCoachProps> = ({
  initialSubject,
  initialTopic
}) => {
  const { student, addStudentXP, checkStudentFeatureAccess, openStudentSubscriptionModal } = useApp();

  const isSS3 = student.classLevel === 'SS 3';
  const isJSS3 = student.classLevel === 'JSS 3';
  const isJunior = student.classLevel.startsWith('JSS');

  const defaultExam = isSS3 ? 'WAEC WASSCE' : isJSS3 ? 'BECE / Junior WAEC' : 'Continuous Assessment';

  const [subject, setSubject] = useState(initialSubject || 'Mathematics');
  const [examType, setExamType] = useState(defaultExam);
  const [classLevel, setClassLevel] = useState(student.classLevel);

  const [userPrompt, setUserPrompt] = useState(
    initialTopic ? `Explain ${initialTopic} step-by-step according to the NERDC curriculum with practice questions and exam tips.` : ''
  );
  const [loading, setLoading] = useState(false);
  const [responseMarkdown, setResponseMarkdown] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [conversationHistory, setConversationHistory] = useState<Array<{ role: 'user' | 'model'; text: string }>>([]);

  const subjectsList = [
    'Mathematics',
    'English Language',
    'Physics',
    'Chemistry',
    'Biology',
    'Economics',
    'Government',
    'Literature in English',
    'Civic Education',
    'Agricultural Science',
    'Commerce',
    'Further Mathematics',
    'Basic Science',
    'Basic Technology',
    'Business Studies'
  ];

  const handleSendPrompt = async (customPrompt?: string) => {
    playSound.tileTap();
    const promptToSend = customPrompt || userPrompt;
    if (!promptToSend.trim() || loading) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/ai/study-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSend,
          subject,
          examType,
          classLevel,
          studentName: student.name || 'Scholar',
          history: conversationHistory
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${res.status}`);
      }

      const data = await res.json();
      const reply = data.text || data.response || 'No response generated.';

      setResponseMarkdown(reply);
      setConversationHistory((prev) => [
        ...prev,
        { role: 'user', text: promptToSend },
        { role: 'model', text: reply }
      ]);

      if (!customPrompt) {
        setUserPrompt('');
      }

      addStudentXP({
        feature: 'ai-coach',
        baseXP: 45,
        difficulty: 'medium',
        reason: `SC AI Study Guidance (${subject})`
      });
    } catch (err: any) {
      console.error('Study Coach Error:', err);
      setErrorMessage(
        err.message || 'Unable to reach the study coach. Please check your network connection.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    playSound.tileTap();
    if (!responseMarkdown) return;
    navigator.clipboard.writeText(responseMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-4 touch-pan-y text-slate-100 bg-[#101C34] min-h-screen">
      {/* =========================================================================
          COACH HERO: Vibrant Deep Navy, Electric Orange & Lime Green Theme
         ========================================================================= */}
      <div className="bg-gradient-to-r from-[#18264A] via-[#12241C] to-[#18264A] border-2 border-[#84CC16]/40 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#84CC16] to-[#65A30D] text-slate-950 flex items-center justify-center shadow-lg shadow-[#84CC16]/30">
              <Bot className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-white tracking-tight">
                  SC AI Study Coach
                </h2>
                <span className="text-[10px] bg-[#84CC16] text-slate-950 font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  24/7 Live
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 font-medium">
                WAEC, JAMB UTME, NECO & NERDC Syllabus Step-by-Step Problem Solver
              </p>
            </div>
          </div>
        </div>

        {/* Exam & Subject Controls in Bold Grid */}
        <div className="mt-4 pt-3 border-t border-slate-700/80 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs relative z-10">
          <div>
            <label className="text-[10px] text-slate-300 font-bold block mb-1 uppercase tracking-wider">
              Subject
            </label>
            <select
              value={subject}
              onChange={(e) => {
                playSound.tileTap();
                setSubject(e.target.value);
              }}
              className="w-full bg-[#101C34] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#84CC16]"
            >
              {subjectsList.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] text-slate-300 font-bold block mb-1 uppercase tracking-wider">
              Target Exam
            </label>
            <select
              value={examType}
              onChange={(e) => {
                playSound.tileTap();
                setExamType(e.target.value);
              }}
              className="w-full bg-[#101C34] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#84CC16]"
            >
              {isSS3 ? (
                <>
                  <option value="WAEC WASSCE">WAEC WASSCE (Step-by-step marks)</option>
                  <option value="JAMB UTME">JAMB UTME (40-sec shortcuts & traps)</option>
                  <option value="NECO SSCE">NECO SSCE (Theory & practicals)</option>
                </>
              ) : isJSS3 ? (
                <>
                  <option value="BECE / Junior WAEC">BECE / Junior WAEC (JSS3)</option>
                  <option value="Continuous Assessment">Junior Continuous Assessment</option>
                </>
              ) : isJunior ? (
                <>
                  <option value="Continuous Assessment">Termly Continuous Assessment</option>
                  <option value="Junior Mock">Junior Foundation Mock</option>
                </>
              ) : (
                <>
                  <option value="Continuous Assessment">Termly Continuous Assessment</option>
                  <option value="Senior Mock">Senior Promotional Mock</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label className="text-[10px] text-slate-300 font-bold block mb-1 uppercase tracking-wider">
              Class Level
            </label>
            <select
              value={classLevel}
              onChange={(e) => {
                playSound.tileTap();
                setClassLevel(e.target.value as any);
              }}
              className="w-full bg-[#101C34] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#84CC16]"
            >
              <option value="SS 3">SS 3 (Final Year Candidate)</option>
              <option value="SS 2">SS 2 (Senior Secondary)</option>
              <option value="SS 1">SS 1 (Freshman Senior)</option>
              <option value="JSS 3">JSS 3 (BECE Junior Secondary)</option>
              <option value="JSS 2">JSS 2 (Junior Secondary)</option>
              <option value="JSS 1">JSS 1 (Freshman Junior)</option>
            </select>
          </div>
        </div>
      </div>

      {/* =========================================================================
          HIGH-YIELD QUICK PROMPTS IN BOLD 2-COLUMN GRID
         ========================================================================= */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-300 font-bold">
          <Sparkles className="w-4 h-4 text-[#84CC16]" />
          <span>
            {isSS3
              ? 'WAEC & JAMB High-Yield Past Question Drills:'
              : isJSS3
              ? 'BECE Junior WAEC Exam Drills:'
              : 'Curriculum Continuous Assessment Drills:'}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {(ALL_QUICK_PROMPTS.filter(qp => {
            if (isSS3) return qp.category === 'SS3' || qp.category === 'SS';
            if (isJSS3) return qp.category === 'JSS3' || qp.category === 'JSS';
            if (isJunior) return qp.category === 'JSS';
            return qp.category === 'SS';
          })).map((qp, idx) => (
            <button
              key={idx}
              onClick={() => {
                playSound.tileTap();
                setSubject(qp.subject);
                setExamType(qp.exam);
                setUserPrompt(qp.prompt);
                handleSendPrompt(qp.prompt);
              }}
              className="text-left p-3 rounded-2xl bg-[#14203D] border-2 border-slate-800 hover:border-[#84CC16]/60 hover:bg-[#1A2A50] transition-all cursor-pointer group shadow-sm active:scale-98"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-white group-hover:text-[#84CC16] transition-colors">
                  {qp.label}
                </span>
                <span className="text-[9px] bg-[#101C34] text-[#FF5B00] px-2 py-0.5 rounded-full font-mono font-bold border border-[#FF5B00]/30">
                  {qp.exam}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1.5 line-clamp-1">{qp.prompt}</p>
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          PROMPT INPUT BOX (Navy with Electric Orange / Lime Triggers)
         ========================================================================= */}
      <div className="bg-[#14203D] border-2 border-slate-800 focus-within:border-[#84CC16] rounded-3xl p-4 space-y-3 shadow-xl transition-colors">
        <textarea
          rows={3}
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder={`Type a past question or formula to solve (e.g., "Solve 3x + 2y = 12 and x - y = 1", or "Explain the law of diminishing returns with Nigerian market examples")...`}
          className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none resize-none leading-relaxed"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              handleSendPrompt();
            }
          }}
        />

        <div className="flex items-center justify-between pt-2 border-t border-slate-700/80">
          <span className="text-[10px] text-slate-400 font-medium">Press Ctrl+Enter or tap Ask</span>

          <button
            onClick={() => handleSendPrompt()}
            disabled={loading || !userPrompt.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#FF5B00] to-[#FF7A18] hover:from-[#E04800] hover:to-[#FF5B00] disabled:opacity-50 text-white text-xs font-black transition-all cursor-pointer shadow-md shadow-[#FF5B00]/30 active:scale-95"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Analyzing Question...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-white" />
                <span>Ask SC AI Coach</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="bg-red-950/80 border-2 border-red-800 rounded-2xl p-3 text-xs text-red-200">
          <strong>Error: </strong> {errorMessage}
        </div>
      )}

      {/* AI Explanation Result Display in Deep Navy Card */}
      {responseMarkdown && (
        <div className="bg-[#14203D] border-2 border-[#84CC16]/60 rounded-3xl p-5 space-y-3.5 shadow-2xl">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#84CC16] animate-pulse shadow-[0_0_8px_#84CC16]" />
              <span className="text-xs font-black text-white">
                Step-by-Step Solution & Working
              </span>
              <span className="text-[10px] bg-[#101C34] text-[#84CC16] px-2 py-0.5 rounded-full font-mono font-bold border border-[#84CC16]/40">
                {subject} · {examType}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#101C34] hover:bg-slate-800 text-slate-200 text-xs font-bold transition-colors cursor-pointer border border-slate-700"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-[#84CC16]" />
                  <span className="text-[#84CC16]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Formatted Markdown Content */}
          <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans space-y-2">
            {responseMarkdown}
          </div>

          <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5 text-[#84CC16] font-bold">
              <Lightbulb className="w-4 h-4" />
              <span>Tip: Practice solving this without looking at the steps!</span>
            </div>
            <button
              onClick={() => {
                playSound.tileTap();
                setUserPrompt(`Give me another similar practice question on ${subject} like the one above to test myself.`);
              }}
              className="text-[#FF5B00] hover:text-orange-400 font-extrabold underline cursor-pointer"
            >
              Try Similar Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
