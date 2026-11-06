import React from 'react';
import { Volume2, GitBranch, Info, BookOpen } from 'lucide-react';

export type SS3EnglishDiagramType =
  | 'english-phonemic-vowel-matrix'
  | 'english-advanced-sentence-synthesis';

interface SS3EnglishDiagramProps {
  type: SS3EnglishDiagramType;
}

export const SS3EnglishDiagram: React.FC<SS3EnglishDiagramProps> = ({ type }) => {
  switch (type) {
    // ----------------------------------------------------
    // 1. PHONEMIC VOWEL MATRIX (CARDINAL VOWEL QUADRILATERAL)
    // ----------------------------------------------------
    case 'english-phonemic-vowel-matrix':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>Phonemic Vowel Matrix: The 12 Monophthongs &amp; 8 Diphthongs</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 font-medium">
              WAEC Oral English · Week 1
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 310" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* Left Panel: The Vowel Trapezium / Quadrilateral */}
              <g transform="translate(15, 15)">
                <rect x="0" y="0" width="310" height="270" fill="#0b1120" stroke="#1e293b" rx="10" />
                <text x="155" y="22" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-bold">Cardinal Vowel Quadrilateral (Monophthongs)</text>

                {/* Trapezoid Coordinates: Front High, Back High, Back Low, Front Low */}
                <polygon points="45,55 270,55 240,210 110,210" fill="#0f172a" stroke="#334155" strokeWidth="2" />

                {/* Mid Horizontal Division lines */}
                <line x1="65" y1="105" x2="260" y2="105" stroke="#1e293b" strokeWidth="1.2" strokeDasharray="3 3" />
                <line x1="88" y1="155" x2="250" y2="155" stroke="#1e293b" strokeWidth="1.2" strokeDasharray="3 3" />

                {/* Vertical Central Lines */}
                <line x1="157" y1="55" x2="175" y2="210" stroke="#1e293b" strokeWidth="1.2" strokeDasharray="3 3" />

                {/* Level Labels on the Left */}
                <text x="12" y="60" fill="#94a3b8" className="text-[9px] font-bold">CLOSE</text>
                <text x="12" y="110" fill="#64748b" className="text-[9px]">HALF-C</text>
                <text x="12" y="160" fill="#64748b" className="text-[9px]">HALF-O</text>
                <text x="12" y="214" fill="#94a3b8" className="text-[9px] font-bold">OPEN</text>

                {/* Column Labels on Top */}
                <text x="50" y="44" fill="#94a3b8" className="text-[9px] font-bold">FRONT</text>
                <text x="155" y="44" fill="#94a3b8" textAnchor="middle" className="text-[9px] font-bold">CENTRAL</text>
                <text x="260" y="44" fill="#94a3b8" textAnchor="end" className="text-[9px] font-bold">BACK</text>

                {/* Phonemic Vowel Plots */}
                {/* /i:/ (see, beat) */}
                <circle cx="50" cy="55" r="4.5" fill="#10b981" />
                <text x="60" y="58" fill="#10b981" className="text-[11px] font-bold">/i:/ (seat)</text>

                {/* /ɪ/ (sit, bit) */}
                <circle cx="85" cy="80" r="4" fill="#38bdf8" />
                <text x="95" y="83" fill="#38bdf8" className="text-[10px] font-semibold">/ɪ/ (sit)</text>

                {/* /e/ (bed, met) */}
                <circle cx="70" cy="115" r="4" fill="#38bdf8" />
                <text x="80" y="118" fill="#38bdf8" className="text-[10px] font-semibold">/e/ (bed)</text>

                {/* /æ/ (cat, bad) */}
                <circle cx="95" cy="170" r="4" fill="#38bdf8" />
                <text x="105" y="173" fill="#38bdf8" className="text-[10px] font-semibold">/æ/ (cat)</text>

                {/* /ə/ Schwa (about, teacher) */}
                <circle cx="157" cy="130" r="4" fill="#f59e0b" />
                <text x="167" y="133" fill="#f59e0b" className="text-[11px] font-bold">/ə/ (sofa)</text>

                {/* /ɜ:/ (bird, girl) */}
                <circle cx="150" cy="100" r="4.5" fill="#10b981" />
                <text x="110" y="103" fill="#10b981" className="text-[10px] font-bold">/ɜ:/ (bird)</text>

                {/* /ʌ/ (cup, bus) */}
                <circle cx="175" cy="175" r="4" fill="#38bdf8" />
                <text x="185" y="178" fill="#38bdf8" className="text-[10px] font-semibold">/ʌ/ (cup)</text>

                {/* /u:/ (boot, food) */}
                <circle cx="265" cy="55" r="4.5" fill="#10b981" />
                <text x="215" y="58" fill="#10b981" className="text-[11px] font-bold">/u:/ (food)</text>

                {/* /ʊ/ (book, put) */}
                <circle cx="235" cy="80" r="4" fill="#38bdf8" />
                <text x="190" y="83" fill="#38bdf8" className="text-[10px] font-semibold">/ʊ/ (book)</text>

                {/* /ɔ:/ (port, saw) */}
                <circle cx="255" cy="140" r="4.5" fill="#10b981" />
                <text x="205" y="143" fill="#10b981" className="text-[11px] font-bold">/ɔ:/ (door)</text>

                {/* /ɒ/ (pot, dog) */}
                <circle cx="245" cy="180" r="4" fill="#38bdf8" />
                <text x="195" y="183" fill="#38bdf8" className="text-[10px] font-semibold">/ɒ/ (pot)</text>

                {/* /ɑ:/ (calm, father) */}
                <circle cx="215" cy="210" r="4.5" fill="#10b981" />
                <text x="155" y="225" fill="#10b981" className="text-[11px] font-bold">/ɑ:/ (father)</text>

                {/* Legend indicator */}
                <text x="155" y="255" fill="#94a3b8" textAnchor="middle" className="text-[9px]">
                  ● Green = Long Vowel (:) · ● Blue = Short Vowel · ● Amber = Neutral Schwa
                </text>
              </g>

              {/* Right Panel: The 8 Diphthongs Gliding Map */}
              <g transform="translate(340, 15)">
                <rect x="0" y="0" width="265" height="270" fill="#0b1120" stroke="#1e293b" rx="10" />
                <text x="132" y="22" fill="#f59e0b" textAnchor="middle" className="text-[11px] font-bold">The 8 Diphthongs (Vocalic Glides)</text>

                {/* Category A: Closing Diphthongs ending in /ɪ/ */}
                <g transform="translate(15, 40)">
                  <rect x="0" y="0" width="235" height="60" fill="#1e293b" rx="6" />
                  <text x="10" y="16" fill="#38bdf8" className="text-[10px] font-bold uppercase tracking-wider">1. Closing Glides to /ɪ/:</text>
                  <text x="10" y="34" fill="#f8fafc" className="text-[11px]">/eɪ/ (play, wait) · /aɪ/ (time, fly)</text>
                  <text x="10" y="50" fill="#f8fafc" className="text-[11px]">/ɔɪ/ (boy, coin)</text>
                </g>

                {/* Category B: Closing Diphthongs ending in /ʊ/ */}
                <g transform="translate(15, 110)">
                  <rect x="0" y="0" width="235" height="60" fill="#1e293b" rx="6" />
                  <text x="10" y="16" fill="#10b981" className="text-[10px] font-bold uppercase tracking-wider">2. Closing Glides to /ʊ/:</text>
                  <text x="10" y="34" fill="#f8fafc" className="text-[11px]">/əʊ/ (go, home, road)</text>
                  <text x="10" y="50" fill="#f8fafc" className="text-[11px]">/aʊ/ (now, house, out)</text>
                </g>

                {/* Category C: Centering Diphthongs ending in /ə/ */}
                <g transform="translate(15, 180)">
                  <rect x="0" y="0" width="235" height="75" fill="#1e293b" rx="6" />
                  <text x="10" y="16" fill="#fbbf24" className="text-[10px] font-bold uppercase tracking-wider">3. Centering Glides to /ə/:</text>
                  <text x="10" y="34" fill="#f8fafc" className="text-[11px]">/ɪə/ (here, clear, ear)</text>
                  <text x="10" y="50" fill="#f8fafc" className="text-[11px]">/eə/ (hair, there, care)</text>
                  <text x="10" y="66" fill="#f8fafc" className="text-[11px]">/ʊə/ (tour, pure, cure)</text>
                </g>
              </g>
            </svg>
          </div>

          <div className="flex items-start gap-2 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Oral English Rule:</strong> A monophthong has a single unchanged auditory vowel quality, whereas a diphthong glides smoothly from one vowel position to another within the same syllable.
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 2. ADVANCED SENTENCE SYNTHESIS & CLAUSE HIERARCHY
    // ----------------------------------------------------
    case 'english-advanced-sentence-synthesis':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <GitBranch className="w-4 h-4 text-sky-400" />
              <span>Advanced Sentence Synthesis: Complex &amp; Compound-Complex Structures</span>
            </div>
            <span className="text-[10px] text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60 font-medium">
              WAEC Syntax &amp; Concord · Week 2
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 300" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              <rect x="10" y="10" width="600" height="280" fill="#0b1120" stroke="#1e293b" rx="10" />

              {/* Hierarchy Tree Root: Compound-Complex Sentence */}
              <g transform="translate(160, 25)">
                <rect x="0" y="0" width="300" height="42" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" rx="8" />
                <text x="150" y="18" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold uppercase tracking-wider">Compound-Complex Sentence</text>
                <text x="150" y="34" fill="#f8fafc" textAnchor="middle" className="text-[11px] font-semibold">≥ 2 Main Clauses + ≥ 1 Subordinate Clause</text>
              </g>

              {/* Connecting Lines */}
              <line x1="230" y1="67" x2="130" y2="105" stroke="#475569" strokeWidth="2" />
              <line x1="310" y1="67" x2="310" y2="105" stroke="#475569" strokeWidth="2" />
              <line x1="390" y1="67" x2="490" y2="105" stroke="#475569" strokeWidth="2" />

              {/* Child 1: Main Clause 1 (Independent) */}
              <g transform="translate(30, 105)">
                <rect x="0" y="0" width="200" height="60" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" rx="8" />
                <text x="100" y="18" fill="#10b981" textAnchor="middle" className="text-[10px] font-bold uppercase">Main Clause 1 (Independent)</text>
                <text x="100" y="34" fill="#f8fafc" textAnchor="middle" className="text-[11px]">Subject + Finite Verb</text>
                <text x="100" y="48" fill="#94a3b8" textAnchor="middle" className="text-[10px] italic">&quot;Amina passed her exams&quot;</text>
              </g>

              {/* Child 2: Coordinator (FANBOYS) */}
              <g transform="translate(245, 110)">
                <rect x="0" y="0" width="130" height="50" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" rx="8" />
                <text x="65" y="18" fill="#f59e0b" textAnchor="middle" className="text-[9px] font-bold uppercase">Coordinating Link</text>
                <text x="65" y="36" fill="#fef08a" textAnchor="middle" className="text-[12px] font-bold">and / but / yet</text>
              </g>

              {/* Child 3: Main Clause 2 (Independent) */}
              <g transform="translate(390, 105)">
                <rect x="0" y="0" width="200" height="60" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" rx="8" />
                <text x="100" y="18" fill="#10b981" textAnchor="middle" className="text-[10px] font-bold uppercase">Main Clause 2 (Independent)</text>
                <text x="100" y="34" fill="#f8fafc" textAnchor="middle" className="text-[11px]">Subject + Finite Verb</text>
                <text x="100" y="48" fill="#94a3b8" textAnchor="middle" className="text-[10px] italic">&quot;her parents were elated&quot;</text>
              </g>

              {/* Line down to Subordinate Clause */}
              <line x1="130" y1="165" x2="230" y2="200" stroke="#475569" strokeWidth="2" strokeDasharray="3 3" />

              {/* Subordinate Dependent Clause */}
              <g transform="translate(130, 200)">
                <rect x="0" y="0" width="360" height="75" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" rx="8" />
                <text x="180" y="18" fill="#c084fc" textAnchor="middle" className="text-[10px] font-bold uppercase tracking-wider">Subordinate Clause (Dependent on Main Clause)</text>
                <text x="180" y="36" fill="#f8fafc" textAnchor="middle" className="text-[11px]">Subordinator + Subject + Verb: &quot;because she studied diligently&quot;</text>
                <text x="180" y="54" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-semibold">Grammatical Function: Adverbial Clause of Reason modifying &apos;passed&apos;</text>
              </g>
            </svg>
          </div>

          <div className="flex items-start gap-2 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300">
            <BookOpen className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">WAEC Grammar Requirement:</strong> In continuous essay writing, candidates who combine short simple sentences into sophisticated complex and compound-complex sentences score in the highest bracket for mechanical accuracy and expression.
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
