import React from 'react';
import { GitFork, Volume2, FileText, Info } from 'lucide-react';

export type SS2EnglishDiagramType =
  | 'english-sentence-clause-tree'
  | 'english-intonation-tunes'
  | 'english-formal-letter-layout';

interface SS2EnglishDiagramProps {
  type: SS2EnglishDiagramType;
}

export const SS2EnglishDiagram: React.FC<SS2EnglishDiagramProps> = ({ type }) => {
  switch (type) {
    // ----------------------------------------------------
    // 1. COMPLEX SENTENCE CLAUSE HIERARCHY TREE
    // ----------------------------------------------------
    case 'english-sentence-clause-tree':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <GitFork className="w-4 h-4 text-emerald-400" />
              <span>Complex Sentence Syntax Tree & Grammatical Functions</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 font-medium">
              WAEC Syntax · Lexis & Structure
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 280" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* Root Node: Full Complex Sentence */}
              <g transform="translate(160, 20)">
                <rect x="0" y="0" width="300" height="38" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" rx="8" />
                <text x="150" y="16" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-semibold">ROOT COMPLEX SENTENCE</text>
                <text x="150" y="30" fill="#ffffff" textAnchor="middle" className="text-[11px] font-bold">"The principal announced that all classes will hold CBT drills."</text>
              </g>

              {/* Branch Lines from Root */}
              <line x1="260" y1="58" x2="140" y2="105" stroke="#94a3b8" strokeWidth="2" />
              <line x1="360" y1="58" x2="480" y2="105" stroke="#94a3b8" strokeWidth="2" />

              {/* Left Branch: Independent / Main Clause */}
              <g transform="translate(30, 105)">
                <rect x="0" y="0" width="220" height="55" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" rx="8" />
                <text x="110" y="18" fill="#34d399" textAnchor="middle" className="text-[10px] font-bold">INDEPENDENT MAIN CLAUSE</text>
                <text x="110" y="35" fill="#ffffff" textAnchor="middle" className="text-[12px] font-bold">"The principal announced"</text>
                <text x="110" y="48" fill="#a7f3d0" textAnchor="middle" className="text-[9px]">Subject (Noun Phrase) + Transitive Verb</text>
              </g>

              {/* Right Branch: Subordinate Noun Clause */}
              <g transform="translate(370, 105)">
                <rect x="0" y="0" width="220" height="55" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" rx="8" />
                <text x="110" y="18" fill="#fbbf24" textAnchor="middle" className="text-[10px] font-bold">DEPENDENT NOUN CLAUSE</text>
                <text x="110" y="35" fill="#ffffff" textAnchor="middle" className="text-[12px] font-bold">"that all classes will hold CBT drills"</text>
                <text x="110" y="48" fill="#fde68a" textAnchor="middle" className="text-[9px]">Introduced by subordinating conjunction "that"</text>
              </g>

              {/* Connector to Grammatical Role Card below */}
              <line x1="480" y1="160" x2="480" y2="195" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />

              {/* WAEC Grammatical Function Node */}
              <g transform="translate(320, 195)">
                <rect x="0" y="0" width="280" height="60" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" rx="8" />
                <text x="140" y="18" fill="#c084fc" textAnchor="middle" className="text-[10px] font-bold">WAEC OFFICIAL PARSING ANALYSIS</text>
                <text x="140" y="35" fill="#f8fafc" textAnchor="middle" className="text-[11px] font-semibold">
                  Grammatical Name: <span className="font-bold text-amber-300">Noun Clause</span>
                </text>
                <text x="140" y="50" fill="#cbd5e1" textAnchor="middle" className="text-[10px]">
                  Grammatical Function: <span className="font-bold text-emerald-300">Object of the verb "announced"</span>
                </text>
              </g>

              {/* Left Side Tip */}
              <g transform="translate(30, 195)">
                <rect x="0" y="0" width="250" height="60" fill="#0f172a" stroke="#334155" strokeWidth="1" rx="8" />
                <text x="125" y="20" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">REPLACEMENT TEST</text>
                <text x="125" y="38" fill="#94a3b8" textAnchor="middle" className="text-[10px]">Replace clause with noun "something":</text>
                <text x="125" y="52" fill="#ffffff" textAnchor="middle" className="text-[10px] font-semibold italic">"The principal announced [something]." ✓</text>
              </g>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Crucial WAEC Exam Rule:</strong> In Section 2 of English Language Paper 2, answering the Grammatical Function requires stating BOTH the syntactic category (e.g., *Adjectival Clause*) and the specific word modified (e.g., *qualifying the noun "teacher"*).
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 2. INTONATION PATTERNS: FALLING VS. RISING TUNES
    // ----------------------------------------------------
    case 'english-intonation-tunes':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Volume2 className="w-4 h-4 text-sky-400" />
              <span>Phonetics: Falling Tune (Tune 1) vs. Rising Tune (Tune 2)</span>
            </div>
            <span className="text-[10px] text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60 font-medium">
              Speech Work · Oral English
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 600 270" className="w-full max-w-2xl mx-auto min-w-[460px] text-xs font-sans">
              {/* TUNE 1: FALLING TUNE */}
              <g transform="translate(20, 20)">
                <rect x="0" y="0" width="260" height="200" fill="#0f172a" stroke="#334155" strokeWidth="1.5" rx="8" />
                <text x="130" y="24" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-bold">FALLING TUNE (Tune 1 ↘)</text>
                <text x="130" y="40" fill="#94a3b8" textAnchor="middle" className="text-[9px]">Statements, Wh-Questions, Commands</text>

                {/* Pitch Contour Graphic */}
                <line x1="20" y1="80" x2="240" y2="80" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="20" y1="120" x2="240" y2="120" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 30 85 C 90 85 150 90 200 135" fill="none" stroke="#38bdf8" strokeWidth="3" />
                <polygon points="205,140 195,130 207,125" fill="#38bdf8" />

                {/* Example sentence with falling glide on nucleus */}
                <text x="130" y="160" fill="#ffffff" textAnchor="middle" className="text-[11px] font-bold">"Where is your text \book?"</text>
                <text x="130" y="175" fill="#10b981" textAnchor="middle" className="text-[10px]">"She passed her ex\ams."</text>
                <text x="130" y="190" fill="#cbd5e1" textAnchor="middle" className="text-[9px] italic">Pitch drops decisively on last tonic syllable.</text>
              </g>

              {/* TUNE 2: RISING TUNE */}
              <g transform="translate(320, 20)">
                <rect x="0" y="0" width="260" height="200" fill="#0f172a" stroke="#334155" strokeWidth="1.5" rx="8" />
                <text x="130" y="24" fill="#f59e0b" textAnchor="middle" className="text-[11px] font-bold">RISING TUNE (Tune 2 ↗)</text>
                <text x="130" y="40" fill="#94a3b8" textAnchor="middle" className="text-[9px]">Polar Yes/No Questions, Incomplete Lists</text>

                {/* Pitch Contour Graphic */}
                <line x1="20" y1="80" x2="240" y2="80" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="20" y1="120" x2="240" y2="120" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 30 125 C 90 120 150 110 205 75" fill="none" stroke="#f59e0b" strokeWidth="3" />
                <polygon points="212,70 208,82 198,75" fill="#f59e0b" />

                {/* Example sentence with rising glide */}
                <text x="130" y="160" fill="#ffffff" textAnchor="middle" className="text-[11px] font-bold">"Are you ready to /start?"</text>
                <text x="130" y="175" fill="#f59e0b" textAnchor="middle" className="text-[10px]">"Books, /pens, and /rulers..."</text>
                <text x="130" y="190" fill="#cbd5e1" textAnchor="middle" className="text-[9px] italic">Pitch sweeps upward indicating expectation.</text>
              </g>

              <text x="300" y="250" fill="#94a3b8" textAnchor="middle" className="text-[10px]">
                Note: In list intonation, all preliminary items take a <strong>Rising Tune (↗)</strong>, while the final concluding item takes a <strong>Falling Tune (↘)</strong>.
              </text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
            <span>
              <strong>Oral Exam Distinction:</strong> Questions beginning with auxiliary verbs (*Is, Can, Would, Do*) expect Yes/No and take the Rising Tune. Questions beginning with interrogative pronouns (*Who, Where, Why, When, How*) take the Falling Tune.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 3. FORMAL LETTER TWO-ADDRESS BLUEPRINT
    // ----------------------------------------------------
    case 'english-formal-letter-layout':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Continuous Writing: Two-Address Formal Letter Layout</span>
            </div>
            <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60 font-medium">
              WAEC Composition Blueprint (50 Marks)
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 600 320" className="w-full max-w-2xl mx-auto min-w-[460px] text-xs font-sans">
              {/* Letter Sheet Boundary */}
              <rect x="50" y="10" width="500" height="295" fill="#0f172a" stroke="#334155" strokeWidth="2" rx="8" />

              {/* Sender's Address (Top Right) */}
              <g transform="translate(320, 25)">
                <rect x="0" y="0" width="210" height="58" fill="#1e293b" stroke="#10b981" strokeWidth="1" rx="4" />
                <text x="10" y="15" fill="#34d399" className="text-[9px] font-bold">1. SENDER'S ADDRESS & DATE (Top Right)</text>
                <text x="10" y="28" fill="#ffffff" className="text-[9px]">Government Science College,</text>
                <text x="10" y="40" fill="#ffffff" className="text-[9px]">P.M.B. 1042, Ikeja, Lagos.</text>
                <text x="10" y="52" fill="#fbbf24" className="text-[9px] font-bold">6th November, 2026.</text>
              </g>

              {/* Recipient Designation & Address (Left) */}
              <g transform="translate(70, 75)">
                <rect x="0" y="0" width="220" height="54" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" rx="4" />
                <text x="10" y="14" fill="#38bdf8" className="text-[9px] font-bold">2. RECIPIENT'S ADDRESS (Left Margin)</text>
                <text x="10" y="26" fill="#ffffff" className="text-[9px]">The Honourable Commissioner,</text>
                <text x="10" y="38" fill="#ffffff" className="text-[9px]">Ministry of Basic Education,</text>
                <text x="10" y="49" fill="#ffffff" className="text-[9px]">Alausa Secretariat, Ikeja.</text>
              </g>

              {/* Salutation */}
              <text x="70" y="145" fill="#ffffff" className="text-[10px] font-bold">Dear Sir, <span className="text-slate-400 text-[9px] font-normal font-sans">(Never use first names or "Dear Sir/Ma")</span></text>

              {/* Letter Heading / Title (Centered, Bold, Capitalized & Underlined) */}
              <g transform="translate(100, 155)">
                <rect x="0" y="0" width="400" height="24" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" rx="4" />
                <text x="200" y="16" fill="#f8fafc" textAnchor="middle" className="text-[10px] font-extrabold uppercase underline">
                  APPEAL FOR THE UPGRADE OF SCIENCE LABORATORIES
                </text>
              </g>

              {/* Body Representation (3-tiered paragraph block) */}
              <g transform="translate(70, 188)">
                <line x1="0" y1="5" x2="450" y2="5" stroke="#475569" strokeWidth="3" />
                <line x1="0" y1="15" x2="420" y2="15" stroke="#475569" strokeWidth="3" />
                <line x1="0" y1="25" x2="380" y2="25" stroke="#475569" strokeWidth="3" />
                <text x="225" y="42" fill="#94a3b8" textAnchor="middle" className="text-[9px]">Structured Body: Introduction (Purpose) → Detailed Grievances/Points → Constructive Recommendations</text>
              </g>

              {/* Complimentary Close & Signature (Left or Right - Modern Left block) */}
              <g transform="translate(70, 240)">
                <text x="0" y="12" fill="#ffffff" className="text-[10px] font-bold">Yours faithfully,</text>
                {/* Signature representation */}
                <path d="M 0 25 Q 15 15 30 25 T 60 20" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="0" y="40" fill="#ffffff" className="text-[10px] font-bold">Emeka K. Adeyemi</text>
                <text x="0" y="52" fill="#a7f3d0" className="text-[9px] italic">Senior Science Prefect</text>
              </g>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Marking Scheme Guide:</strong> In WAEC formal letters, 10 marks are allocated to Format (both addresses, date, salutation, heading, complimentary close, signature and full name). Zero contractions (e.g. use *cannot*, never *can't*) are permitted in the body.
            </span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
