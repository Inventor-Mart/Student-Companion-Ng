import React, { useState } from 'react';

export type LiteratureDiagramType =
  | 'literature-dramatic-structure-freytag-pyramid'
  | 'literature-genres-and-subgenres-tree'
  | 'literature-poetic-meter-and-sonnet-anatomy'
  | 'literature-figures-of-speech-wheel';

interface LiteratureDiagramProps {
  type: LiteratureDiagramType;
  caption?: string;
}

export const LiteratureDiagram: React.FC<LiteratureDiagramProps> = ({ type, caption }) => {
  const [selectedPyramidStage, setSelectedPyramidStage] = useState<'all' | 'climax' | 'resolution'>('all');

  // 1. Freytag's Dramatic Pyramid
  if (type === 'literature-dramatic-structure-freytag-pyramid') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-rose-400">
              Freytag&apos;s Dramatic Pyramid: Structural Architecture of Plays &amp; Novels
            </h4>
            <p className="text-xs text-slate-400">
              Gustav Freytag&apos;s classical five-act narrative arc from Exposition to Cathartic Resolution
            </p>
          </div>
          <div className="flex gap-1.5">
            {[
              { id: 'all', label: 'Full Arc' },
              { id: 'climax', label: 'Climax / Peripeteia' },
              { id: 'resolution', label: 'Denouement / Catharsis' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedPyramidStage(tab.id as 'all' | 'climax' | 'resolution')}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  selectedPyramidStage === tab.id
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 310" className="w-full max-w-xl select-none">
            {/* Pyramid Triangular Ascent & Descent Path */}
            <path
              d="M 40 240 L 150 200 L 270 60 L 390 200 L 500 240"
              fill="none"
              stroke="#e11d48"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Shaded Area Under Curve */}
            <path
              d="M 40 240 L 150 200 L 270 60 L 390 200 L 500 240 L 500 270 L 40 270 Z"
              fill="#be123c"
              fillOpacity="0.12"
            />

            {/* Stage 1: Exposition (Bottom Left) */}
            <circle cx="40" cy="240" r="7" fill="#fb7185" stroke="#fff" strokeWidth="2" />
            <g transform="translate(15, 175)" opacity={selectedPyramidStage === 'climax' || selectedPyramidStage === 'resolution' ? 0.35 : 1}>
              <rect width="115" height="50" rx="5" fill="#1e293b" stroke="#f43f5e" strokeWidth="1" />
              <text x="10" y="16" fill="#fb7185" fontSize="9" fontWeight="bold">1. EXPOSITION:</text>
              <text x="10" y="28" fill="#cbd5e1" fontSize="8">• Setting established</text>
              <text x="10" y="38" fill="#cbd5e1" fontSize="8">• Characters introduced</text>
            </g>

            {/* Inciting Incident */}
            <circle cx="150" cy="200" r="6" fill="#fbbf24" stroke="#fff" strokeWidth="1.5" />
            <text x="150" y="222" fill="#fbbf24" fontSize="8" fontWeight="bold" textAnchor="middle">Inciting Incident</text>

            {/* Stage 2: Rising Action */}
            <g transform="translate(125, 115)" opacity={selectedPyramidStage === 'climax' || selectedPyramidStage === 'resolution' ? 0.35 : 1}>
              <rect width="120" height="44" rx="5" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
              <text x="8" y="15" fill="#fbbf24" fontSize="9" fontWeight="bold">2. RISING ACTION:</text>
              <text x="8" y="27" fill="#cbd5e1" fontSize="8">• Complications arise</text>
              <text x="8" y="37" fill="#cbd5e1" fontSize="8">• Conflict intensifies</text>
            </g>

            {/* Stage 3: Climax (Apex) */}
            <circle cx="270" cy="60" r="9" fill="#ef4444" stroke="#fef08a" strokeWidth="2.5" />
            <g transform="translate(200, 10)" opacity={selectedPyramidStage === 'resolution' ? 0.35 : 1}>
              <rect width="140" height="42" rx="5" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
              <text x="70" y="16" fill="#fef2f2" fontSize="10" fontWeight="bold" textAnchor="middle">3. CLIMAX (Crisis)</text>
              <text x="70" y="28" fill="#fca5a5" fontSize="8" textAnchor="middle">Turning Point / Peripeteia</text>
              <text x="70" y="38" fill="#fecaca" fontSize="7" textAnchor="middle">Highest emotional tension</text>
            </g>

            {/* Stage 4: Falling Action */}
            <circle cx="390" cy="200" r="6" fill="#38bdf8" stroke="#fff" strokeWidth="1.5" />
            <g transform="translate(305, 115)" opacity={selectedPyramidStage === 'climax' ? 0.35 : 1}>
              <rect width="120" height="44" rx="5" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
              <text x="8" y="15" fill="#38bdf8" fontSize="9" fontWeight="bold">4. FALLING ACTION:</text>
              <text x="8" y="27" fill="#cbd5e1" fontSize="8">• Consequences unfold</text>
              <text x="8" y="37" fill="#cbd5e1" fontSize="8">• Anagnorisis (discovery)</text>
            </g>

            {/* Stage 5: Denouement / Resolution */}
            <circle cx="500" cy="240" r="7" fill="#10b981" stroke="#fff" strokeWidth="2" />
            <g transform="translate(415, 175)" opacity={selectedPyramidStage === 'climax' ? 0.35 : 1}>
              <rect width="115" height="50" rx="5" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
              <text x="8" y="16" fill="#34d399" fontSize="9" fontWeight="bold">5. DENOUEMENT:</text>
              <text x="8" y="28" fill="#cbd5e1" fontSize="8">• Catastrophe in tragedy</text>
              <text x="8" y="38" fill="#cbd5e1" fontSize="8">• Catharsis (purging)</text>
            </g>

            {/* Bottom Summary Banner */}
            <g transform="translate(25, 255)">
              <rect width="490" height="40" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
              <text x="12" y="16" fill="#fda4af" fontSize="9" fontWeight="bold">DRAMATIC VOCABULARY NOTE (ARISTOTLE &amp; FREYTAG):</text>
              <text x="12" y="30" fill="#cbd5e1" fontSize="8">• Hamartia (tragic flaw) leads to Peripeteia (sudden reversal of fortune), producing Catharsis (purgation of pity and fear).</text>
            </g>
          </svg>
        </div>

        {caption && (
          <p className="mt-2 text-center text-xs font-medium text-slate-400">
            {caption}
          </p>
        )}
      </div>
    );
  }

  // 2. The Three Genres of Literature
  if (type === 'literature-genres-and-subgenres-tree') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-amber-400">
              Taxonomy of Literature: The Three Core Genres and Their Subtypes
            </h4>
            <p className="text-xs text-slate-400">
              Systematic classification of creative writing into Prose, Drama, and Poetry
            </p>
          </div>
          <span className="rounded bg-amber-950/80 px-2.5 py-1 text-xs font-semibold text-amber-300 border border-amber-800">
            Genres &amp; Conventions
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 310" className="w-full max-w-xl select-none">
            {/* Master Node: LITERATURE */}
            <g transform="translate(195, 15)">
              <rect width="150" height="38" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="2" />
              <text x="75" y="24" fill="#fef3c7" fontSize="12" fontWeight="bold" textAnchor="middle">LITERATURE</text>
            </g>

            {/* Branch Lines from Master to 3 Branches */}
            <line x1="270" y1="53" x2="270" y2="70" stroke="#f59e0b" strokeWidth="2" />
            <line x1="90" y1="70" x2="450" y2="70" stroke="#f59e0b" strokeWidth="2" />
            <line x1="90" y1="70" x2="90" y2="90" stroke="#f59e0b" strokeWidth="2" />
            <line x1="270" y1="70" x2="270" y2="90" stroke="#f59e0b" strokeWidth="2" />
            <line x1="450" y1="70" x2="450" y2="90" stroke="#f59e0b" strokeWidth="2" />

            {/* Branch 1: PROSE (Left) */}
            <g transform="translate(20, 90)">
              <rect width="140" height="42" rx="5" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="70" y="20" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">1. PROSE</text>
              <text x="70" y="34" fill="#cbd5e1" fontSize="8" textAnchor="middle">Written in paragraphs &amp; chapters</text>
            </g>
            <g transform="translate(20, 142)">
              <rect width="140" height="110" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
              <text x="10" y="18" fill="#93c5fd" fontSize="9" fontWeight="bold">Prose Forms:</text>
              <text x="10" y="32" fill="#cbd5e1" fontSize="8">• Novel (extended fiction)</text>
              <text x="10" y="46" fill="#cbd5e1" fontSize="8">• Novella (medium length)</text>
              <text x="10" y="60" fill="#cbd5e1" fontSize="8">• Short Story (compact plot)</text>
              <text x="10" y="74" fill="#cbd5e1" fontSize="8">• Biography (by another)</text>
              <text x="10" y="88" fill="#cbd5e1" fontSize="8">• Autobiography (by self)</text>
              <text x="10" y="102" fill="#94a3b8" fontSize="7">Style: Continuous narrative</text>
            </g>

            {/* Branch 2: DRAMA (Center) */}
            <g transform="translate(200, 90)">
              <rect width="140" height="42" rx="5" fill="#1e293b" stroke="#ec4899" strokeWidth="2" />
              <text x="70" y="20" fill="#f472b6" fontSize="11" fontWeight="bold" textAnchor="middle">2. DRAMA</text>
              <text x="70" y="34" fill="#cbd5e1" fontSize="8" textAnchor="middle">Dialogue performed on stage</text>
            </g>
            <g transform="translate(200, 142)">
              <rect width="140" height="110" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
              <text x="10" y="18" fill="#f472b6" fontSize="9" fontWeight="bold">Drama Types:</text>
              <text x="10" y="32" fill="#cbd5e1" fontSize="8">• Tragedy (disastrous end)</text>
              <text x="10" y="46" fill="#cbd5e1" fontSize="8">• Comedy (humor, happy end)</text>
              <text x="10" y="60" fill="#cbd5e1" fontSize="8">• Tragicomedy (mixed tone)</text>
              <text x="10" y="74" fill="#cbd5e1" fontSize="8">• Melodrama (exaggeration)</text>
              <text x="10" y="88" fill="#cbd5e1" fontSize="8">• Farce (slapstick absurdity)</text>
              <text x="10" y="102" fill="#94a3b8" fontSize="7">Divided into Acts &amp; Scenes</text>
            </g>

            {/* Branch 3: POETRY (Right) */}
            <g transform="translate(380, 90)">
              <rect width="140" height="42" rx="5" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <text x="70" y="20" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">3. POETRY</text>
              <text x="70" y="34" fill="#cbd5e1" fontSize="8" textAnchor="middle">Rhythmic verse in stanzas</text>
            </g>
            <g transform="translate(380, 142)">
              <rect width="140" height="110" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
              <text x="10" y="18" fill="#6ee7b7" fontSize="9" fontWeight="bold">Poetry Forms:</text>
              <text x="10" y="32" fill="#cbd5e1" fontSize="8">• Lyric (intense personal song)</text>
              <text x="10" y="46" fill="#cbd5e1" fontSize="8">• Epic (long heroic saga)</text>
              <text x="10" y="60" fill="#cbd5e1" fontSize="8">• Ode (tribute / celebration)</text>
              <text x="10" y="74" fill="#cbd5e1" fontSize="8">• Elegy / Dirge (funeral poem)</text>
              <text x="10" y="88" fill="#cbd5e1" fontSize="8">• Sonnet (14-line structure)</text>
              <text x="10" y="102" fill="#94a3b8" fontSize="7">Measured in lines &amp; stanzas</text>
            </g>

            {/* Bottom Key Distinctions Banner */}
            <g transform="translate(20, 262)">
              <rect width="500" height="38" rx="5" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="12" y="16" fill="#fde68a" fontSize="9" fontWeight="bold">FUNDAMENTAL STRUCTURAL UNITS:</text>
              <text x="12" y="28" fill="#cbd5e1" fontSize="8">• Prose = Words → Sentences → Paragraphs → Chapters | Drama = Dialogue + Action in Acts &amp; Scenes | Poetry = Metre in Lines &amp; Stanzas.</text>
            </g>
          </svg>
        </div>

        {caption && (
          <p className="mt-2 text-center text-xs font-medium text-slate-400">
            {caption}
          </p>
        )}
      </div>
    );
  }

  // 3. Poetic Sonnet Anatomy: Shakespearean vs. Petrarchan
  if (type === 'literature-poetic-meter-and-sonnet-anatomy') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-sky-400">
              Anatomy of a Sonnet: Shakespearean (English) vs. Petrarchan (Italian)
            </h4>
            <p className="text-xs text-slate-400">
              A 14-line poem written in iambic pentameter, comparing rhyme schemes and the Volta (thematic turn)
            </p>
          </div>
          <span className="rounded bg-sky-950/80 px-2.5 py-1 text-xs font-semibold text-sky-300 border border-sky-800">
            14 Lines in Iambic Pentameter
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 310" className="w-full max-w-xl select-none">
            {/* Left Card: Shakespearean Sonnet */}
            <g transform="translate(30, 20)">
              <rect width="230" height="235" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="115" y="22" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">SHAKESPEAREAN (English)</text>
              <text x="115" y="36" fill="#cbd5e1" fontSize="8" textAnchor="middle">3 Quatrains + 1 Rhyming Couplet</text>

              {/* Quatrain 1 */}
              <rect x="15" y="48" width="200" height="34" rx="3" fill="#1e293b" />
              <text x="25" y="62" fill="#7dd3fc" fontSize="8" fontWeight="bold">Quatrain 1 (Lines 1-4):</text>
              <text x="25" y="74" fill="#94a3b8" fontSize="8">Rhyme: A-B-A-B | Sets theme / problem</text>

              {/* Quatrain 2 */}
              <rect x="15" y="88" width="200" height="34" rx="3" fill="#1e293b" />
              <text x="25" y="102" fill="#7dd3fc" fontSize="8" fontWeight="bold">Quatrain 2 (Lines 5-8):</text>
              <text x="25" y="114" fill="#94a3b8" fontSize="8">Rhyme: C-D-C-D | Develops imagery</text>

              {/* Quatrain 3 */}
              <rect x="15" y="128" width="200" height="34" rx="3" fill="#1e293b" />
              <text x="25" y="142" fill="#7dd3fc" fontSize="8" fontWeight="bold">Quatrain 3 (Lines 9-12):</text>
              <text x="25" y="154" fill="#94a3b8" fontSize="8">Rhyme: E-F-E-F | Deepens reflection</text>

              {/* Volta arrow before couplet */}
              <text x="115" y="174" fill="#fbbf24" fontSize="8" fontWeight="bold" textAnchor="middle">⚡ Volta (Turn) at Line 13</text>

              {/* Couplet */}
              <rect x="15" y="180" width="200" height="38" rx="3" fill="#0369a1" />
              <text x="25" y="195" fill="#f0f9ff" fontSize="9" fontWeight="bold">Rhyming Couplet (Lines 13-14):</text>
              <text x="25" y="208" fill="#e0f2fe" fontSize="8">Rhyme: G-G | Epigrammatic resolution</text>
            </g>

            {/* Right Card: Petrarchan Sonnet */}
            <g transform="translate(280, 20)">
              <rect width="230" height="235" rx="6" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
              <text x="115" y="22" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle">PETRARCHAN (Italian)</text>
              <text x="115" y="36" fill="#cbd5e1" fontSize="8" textAnchor="middle">1 Octave + 1 Sestet</text>

              {/* Octave */}
              <rect x="15" y="48" width="200" height="68" rx="3" fill="#1e293b" />
              <text x="25" y="66" fill="#d8b4fe" fontSize="9" fontWeight="bold">Octave (Lines 1-8):</text>
              <text x="25" y="80" fill="#cbd5e1" fontSize="8">Rhyme Scheme: A-B-B-A  A-B-B-A</text>
              <text x="25" y="94" fill="#94a3b8" fontSize="8">• Presents the dilemma, question,</text>
              <text x="25" y="106" fill="#94a3b8" fontSize="8">  or emotional tension</text>

              {/* The Volta (Turn) between Octave and Sestet */}
              <rect x="25" y="122" width="180" height="18" rx="2" fill="#6b21a8" />
              <text x="115" y="134" fill="#fef08a" fontSize="8" fontWeight="bold" textAnchor="middle">⚡ VOLTA (Thematic Turn at Line 9)</text>

              {/* Sestet */}
              <rect x="15" y="146" width="200" height="72" rx="3" fill="#1e293b" />
              <text x="25" y="162" fill="#d8b4fe" fontSize="9" fontWeight="bold">Sestet (Lines 9-14):</text>
              <text x="25" y="176" fill="#cbd5e1" fontSize="8">Rhyme Scheme: C-D-E-C-D-E or C-D-C-D-C-D</text>
              <text x="25" y="190" fill="#94a3b8" fontSize="8">• Solves the dilemma or provides</text>
              <text x="25" y="202" fill="#94a3b8" fontSize="8">  philosophical release</text>
            </g>

            {/* Bottom Iambic Pentameter Explainer */}
            <g transform="translate(30, 265)">
              <rect width="480" height="38" rx="5" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="12" y="16" fill="#38bdf8" fontSize="9" fontWeight="bold">IAMBIC PENTAMETER DEFINITION:</text>
              <text x="12" y="28" fill="#cbd5e1" fontSize="8">5 metrical feet per line (10 syllables total); each foot is an iamb (unstressed followed by stressed: da-DUM da-DUM da-DUM da-DUM da-DUM).</text>
            </g>
          </svg>
        </div>

        {caption && (
          <p className="mt-2 text-center text-xs font-medium text-slate-400">
            {caption}
          </p>
        )}
      </div>
    );
  }

  // 4. Spectrum of Figures of Speech
  if (type === 'literature-figures-of-speech-wheel') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-emerald-400">
              Taxonomy of Literary Devices and Figures of Speech
            </h4>
            <p className="text-xs text-slate-400">
              Comparison, Association, Contrast/Contradiction, and Sound Devices
            </p>
          </div>
          <span className="rounded bg-emerald-950/80 px-2.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-800">
            Poetic &amp; Rhetorical Tools
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 300" className="w-full max-w-xl select-none">
            {/* Quadrant 1: Comparison (Top Left) */}
            <g transform="translate(30, 20)">
              <rect width="230" height="115" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
              <text x="15" y="20" fill="#34d399" fontSize="10" fontWeight="bold">1. COMPARISON</text>
              <text x="15" y="36" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#6ee7b7">Simile</tspan>: Explicit comparison using &apos;like&apos; or &apos;as&apos;</text>
              <text x="25" y="48" fill="#94a3b8" fontSize="7">&quot;Her smile was as bright as the morning sun.&quot;</text>
              <text x="15" y="64" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#6ee7b7">Metaphor</tspan>: Direct implied identification</text>
              <text x="25" y="76" fill="#94a3b8" fontSize="7">&quot;The general was a roaring lion in battle.&quot;</text>
              <text x="15" y="92" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#6ee7b7">Personification</tspan>: Human traits given to objects</text>
              <text x="25" y="104" fill="#94a3b8" fontSize="7">&quot;The cruel wind whistled through the night.&quot;</text>
            </g>

            {/* Quadrant 2: Sound Devices (Top Right) */}
            <g transform="translate(280, 20)">
              <rect width="230" height="115" rx="6" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="15" y="20" fill="#60a5fa" fontSize="10" fontWeight="bold">2. SOUND &amp; EUPHONY</text>
              <text x="15" y="36" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#93c5fd">Alliteration</tspan>: Repetition of initial consonant sounds</text>
              <text x="25" y="48" fill="#94a3b8" fontSize="7">&quot;Peter Piper picked a peck of pickled peppers.&quot;</text>
              <text x="15" y="64" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#93c5fd">Assonance</tspan>: Repetition of vowel sounds</text>
              <text x="25" y="76" fill="#94a3b8" fontSize="7">&quot;Hear the mellow wedding bells.&quot;</text>
              <text x="15" y="92" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#93c5fd">Onomatopoeia</tspan>: Words imitating actual sounds</text>
              <text x="25" y="104" fill="#94a3b8" fontSize="7">&quot;The bees buzz; guns boom; doors creak.&quot;</text>
            </g>

            {/* Quadrant 3: Contrast & Contradiction (Bottom Left) */}
            <g transform="translate(30, 150)">
              <rect width="230" height="135" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="15" y="20" fill="#fbbf24" fontSize="10" fontWeight="bold">3. CONTRAST &amp; IRONY</text>
              <text x="15" y="36" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#fde68a">Oxymoron</tspan>: Two contradictory terms juxtaposed</text>
              <text x="25" y="48" fill="#94a3b8" fontSize="7">&quot;Deafening silence; bitter sweet; living death.&quot;</text>
              <text x="15" y="64" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#fde68a">Paradox</tspan>: Seemingly absurd statement holding truth</text>
              <text x="25" y="76" fill="#94a3b8" fontSize="7">&quot;The child is the father of the man.&quot;</text>
              <text x="15" y="92" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#fde68a">Irony</tspan>: Contrast between expectation and reality</text>
              <text x="25" y="104" fill="#94a3b8" fontSize="7">&quot;Water, water everywhere, nor any drop to drink.&quot;</text>
              <text x="15" y="118" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#fde68a">Antithesis</tspan>: Balanced opposition of ideas</text>
            </g>

            {/* Quadrant 4: Association & Emphasis (Bottom Right) */}
            <g transform="translate(280, 150)">
              <rect width="230" height="135" rx="6" fill="#0f172a" stroke="#ec4899" strokeWidth="1.5" />
              <text x="15" y="20" fill="#f472b6" fontSize="10" fontWeight="bold">4. EMPHASIS &amp; SUBSTITUTION</text>
              <text x="15" y="36" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#fbcfe8">Hyperbole</tspan>: Deliberate extravagant exaggeration</text>
              <text x="25" y="48" fill="#94a3b8" fontSize="7">&quot;I have loved thee forty thousand brothers could not.&quot;</text>
              <text x="15" y="64" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#fbcfe8">Euphemism</tspan>: Soft expression for harsh reality</text>
              <text x="25" y="76" fill="#94a3b8" fontSize="7">&quot;He passed away peacefully (instead of he died).&quot;</text>
              <text x="15" y="92" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#fbcfe8">Metonymy</tspan>: Substitution of an associated symbol</text>
              <text x="25" y="104" fill="#94a3b8" fontSize="7">&quot;The pen is mightier than the sword (writing vs military).&quot;</text>
              <text x="15" y="118" fill="#cbd5e1" fontSize="8">• <tspan fontWeight="bold" fill="#fbcfe8">Synecdoche</tspan>: Part represents whole</text>
              <text x="25" y="128" fill="#94a3b8" fontSize="7">&quot;All hands on deck; give us this day our daily bread.&quot;</text>
            </g>
          </svg>
        </div>

        {caption && (
          <p className="mt-2 text-center text-xs font-medium text-slate-400">
            {caption}
          </p>
        )}
      </div>
    );
  }

  return null;
};
