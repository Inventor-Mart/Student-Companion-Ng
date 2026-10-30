import React, { useState } from 'react';
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
  Award
} from 'lucide-react';

interface AiStudyCoachProps {
  initialSubject?: string;
  initialTopic?: string;
}

const QUICK_PROMPTS = [
  {
    label: 'JAMB Physics: Projectile Motion',
    prompt: 'Give me a typical JAMB UTME question on projectile motion (maximum height and time of flight) and show the 30-second speed-solving trick.',
    subject: 'Physics',
    exam: 'JAMB UTME'
  },
  {
    label: 'WAEC Maths: Quadratic by Formula',
    prompt: 'Explain the quadratic formula step-by-step for 2x² - 5x - 3 = 0. Show what WAEC examiners award marks for in theory paper 2.',
    subject: 'Mathematics',
    exam: 'WAEC WASSCE'
  },
  {
    label: 'JAMB Chemistry: Gas Laws',
    prompt: 'Solve an ideal gas law question (PV = nRT) at STP with common distractor traps that JAMB sets in options A, B, C, D.',
    subject: 'Chemistry',
    exam: 'JAMB UTME'
  },
  {
    label: 'WAEC English: Summary Writing',
    prompt: 'What are the 5 golden rules for scoring maximum marks in WAEC English Language summary writing? Give a practical example.',
    subject: 'English Language',
    exam: 'WAEC WASSCE'
  },
  {
    label: 'SS2 Biology: Photosynthesis Cycles',
    prompt: 'Explain the light and dark reactions of photosynthesis in simple terms. Relate it to crops grown in Nigeria like cassava and maize.',
    subject: 'Biology',
    exam: 'WAEC WASSCE'
  }
];

export const AiStudyCoach: React.FC<AiStudyCoachProps> = ({
  initialSubject = 'Mathematics',
  initialTopic
}) => {
  const [subject, setSubject] = useState<string>(initialSubject);
  const [examType, setExamType] = useState<string>('WAEC WASSCE');
  const [classLevel, setClassLevel] = useState<string>('Senior Secondary (SS 2)');
  const [userPrompt, setUserPrompt] = useState<string>(
    initialTopic ? `Please explain the NERDC curriculum topic "${initialTopic}" in ${initialSubject} with worked examples and exam tips.` : ''
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [responseMarkdown, setResponseMarkdown] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'model'; text: string }>>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const subjectsList = [
    'Mathematics',
    'English Language',
    'Physics',
    'Chemistry',
    'Biology',
    'Economics',
    'Government',
    'Literature-in-English',
    'Further Mathematics'
  ];

  const handleSendPrompt = async (customPrompt?: string) => {
    const promptToSend = customPrompt || userPrompt;
    if (!promptToSend.trim() || loading) return;

    setLoading(true);
    setErrorMessage('');
    setCopied(false);

    try {
      const res = await fetch('/api/gemini/study-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSend,
          subject,
          examType,
          level: classLevel,
          history: chatHistory.slice(-6)
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get answer from AI Study Coach');
      }

      const reply = data.text || 'No response generated.';
      setResponseMarkdown(reply);

      setChatHistory((prev) => [
        ...prev,
        { role: 'user', text: promptToSend },
        { role: 'model', text: reply }
      ]);

      if (!customPrompt) {
        setUserPrompt('');
      }
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
    if (!responseMarkdown) return;
    navigator.clipboard.writeText(responseMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-4 touch-pan-y text-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-800/60 rounded-3xl p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-bold text-white tracking-tight">
                  Gemini AI Study Coach
                </h2>
                <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                  Live
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                WAEC, JAMB UTME, NECO & NERDC Syllabus Step-by-Step Solver
              </p>
            </div>
          </div>
        </div>

        {/* Exam & Subject Controls */}
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div>
            <label className="text-[10px] text-slate-400 font-semibold block mb-0.5">
              Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              {subjectsList.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 font-semibold block mb-0.5">
              Target Exam
            </label>
            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="WAEC WASSCE">WAEC WASSCE (Step-by-step marks)</option>
              <option value="JAMB UTME">JAMB UTME (40-sec shortcuts & traps)</option>
              <option value="NECO SSCE">NECO SSCE (Theory & practicals)</option>
              <option value="BECE / Junior WAEC">BECE / Junior WAEC (JSS3)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 font-semibold block mb-0.5">
              Class Level
            </label>
            <select
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="SS 3 (Final Year)">SS 3 (Final Year Candidate)</option>
              <option value="SS 2 (Senior)">SS 2 (Senior Secondary)</option>
              <option value="SS 1 (Freshman)">SS 1 (Freshman Senior)</option>
              <option value="JSS 3 (BECE)">JSS 3 (BECE Junior Secondary)</option>
            </select>
          </div>
        </div>
      </div>

      {/* High-Yield Quick Prompts */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-semibold text-slate-300">High-Yield Past Question Drills:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {QUICK_PROMPTS.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSubject(qp.subject);
                setExamType(qp.exam);
                setUserPrompt(qp.prompt);
                handleSendPrompt(qp.prompt);
              }}
              className="text-left p-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {qp.label}
                </span>
                <span className="text-[9px] bg-slate-950 px-1.5 py-0.5 rounded text-slate-400 font-mono">
                  {qp.exam}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{qp.prompt}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Prompt Input Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2 shadow-sm focus-within:border-emerald-500 transition-colors">
        <textarea
          rows={3}
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder={`Type a past question or formula to solve (e.g., "Solve 3x + 2y = 12 and x - y = 1", or "Explain the law of diminishing returns with Nigerian market examples")...`}
          className="w-full bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none resize-none leading-relaxed"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              handleSendPrompt();
            }
          }}
        />

        <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
          <span className="text-[10px] text-slate-500">Press Ctrl+Enter or click Solve</span>

          <button
            onClick={() => handleSendPrompt()}
            disabled={loading || !userPrompt.trim()}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Analyzing Question...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI Coach</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="bg-red-950/60 border border-red-800/80 rounded-2xl p-3 text-xs text-red-200">
          <strong>Error: </strong> {errorMessage}
        </div>
      )}

      {/* AI Explanation Result Display */}
      {responseMarkdown && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white">
                Step-by-Step Solution & Working
              </span>
              <span className="text-[10px] bg-slate-950 text-slate-400 px-2 py-0.5 rounded font-mono">
                {subject} · {examType}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Formatted Markdown Content */}
          <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans space-y-2">
            {responseMarkdown}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1 text-emerald-400 font-semibold">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Tip: Practice solving this without looking at the steps!</span>
            </div>
            <button
              onClick={() => {
                setUserPrompt(`Give me another similar practice question on ${subject} like the one above to test myself.`);
              }}
              className="text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer"
            >
              Try Similar Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
