import React from 'react';
import { Eye, Info, FlaskConical, Atom, Flame, Layers } from 'lucide-react';

export type ChemicalDiagramType =
  | 'distillation-apparatus'
  | 'paper-chromatography'
  | 'bohr-atomic-model'
  | 'ionic-covalent-bonding'
  | 'bunsen-burner-flame'
  | 'periodic-table-trends'
  | 'reaction-energy-profile'
  | 'daniell-electrochemical-cell';

interface ChemicalDiagramProps {
  type: ChemicalDiagramType;
}

export const ChemicalDiagram: React.FC<ChemicalDiagramProps> = ({ type }) => {
  switch (type) {
    // ----------------------------------------------------
    // 1. LIEBIG DISTILLATION APPARATUS (FRACTIONAL / SIMPLE)
    // ----------------------------------------------------
    case 'distillation-apparatus':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <FlaskConical className="w-4 h-4 text-cyan-400" />
              <span>Liebig Simple & Fractional Distillation Apparatus</span>
            </div>
            <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60 font-medium">
              Lab Setup · Separation of Miscible Liquids
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 350" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* Stand & Clamp on Left */}
              <rect x="50" y="310" width="80" height="10" fill="#475569" rx="2" />
              <rect x="85" y="60" width="6" height="250" fill="#64748b" />
              <rect x="88" y="140" width="40" height="4" fill="#94a3b8" />

              {/* Bunsen Burner & Wire Gauze */}
              <rect x="105" y="270" width="30" height="40" fill="#334155" rx="3" />
              <polygon points="113,270 127,270 120,240" fill="#38bdf8" opacity="0.8" />
              <polygon points="116,270 124,270 120,248" fill="#facc15" />
              <line x1="95" y1="238" x2="145" y2="238" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 2" />
              <text x="50" y="260" fill="#94a3b8" className="text-[9px]">Wire Gauze</text>

              {/* Round Bottom Distilling Flask */}
              <circle cx="120" cy="195" r="35" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
              {/* Liquid mixture inside flask */}
              <path d="M 90 205 C 105 195 135 195 150 205 A 35 35 0 0 1 90 205" fill="#0284c7" opacity="0.4" />
              {/* Boiling chips */}
              <circle cx="110" cy="220" r="2.5" fill="#f8fafc" />
              <circle cx="125" cy="222" r="2.5" fill="#f8fafc" />
              <circle cx="118" cy="215" r="2" fill="#f8fafc" />
              <text x="35" y="210" fill="#38bdf8" className="text-[10px] font-bold">Distilling Flask</text>
              <text x="35" y="222" fill="#64748b" className="text-[8px]">(Boiling mixture + chips)</text>

              {/* Flask Neck & Fractionating Column */}
              <rect x="115" y="100" width="10" height="65" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              {/* Thermometer */}
              <rect x="119" y="55" width="2" height="75" fill="#f43f5e" />
              <circle cx="120" cy="125" r="3" fill="#f43f5e" />
              <text x="130" y="70" fill="#f43f5e" className="text-[9px] font-bold">Thermometer</text>
              <text x="130" y="82" fill="#94a3b8" className="text-[8px]">Measures vapor B.P.</text>

              {/* Side Arm Connecting to Condenser */}
              <path d="M 125 110 L 190 145" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* Liebig Condenser (Sloping Tube) */}
              {/* Outer Water Jacket */}
              <polygon points="190,130 430,225 425,255 185,160" fill="#0369a1" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="1.5" />

              {/* Inner Vapor Tube */}
              <line x1="190" y1="145" x2="435" y2="242" stroke="#bae6fd" strokeWidth="3" />

              {/* Water Jacket Inlets / Outlets (Counter-Current Flow) */}
              {/* Cold Water In (Bottom) */}
              <path d="M 400 245 L 400 280" stroke="#06b6d4" strokeWidth="3" fill="none" />
              <polygon points="396,252 404,252 400,242" fill="#06b6d4" />
              <text x="410" y="275" fill="#06b6d4" className="text-[10px] font-bold">Cold Water IN</text>
              <text x="410" y="287" fill="#94a3b8" className="text-[8px]">(Counter-current flow)</text>

              {/* Warm Water Out (Top) */}
              <path d="M 215 135 L 215 100" stroke="#f59e0b" strokeWidth="3" fill="none" />
              <polygon points="211,108 219,108 215,98" fill="#f59e0b" />
              <text x="225" y="105" fill="#f59e0b" className="text-[10px] font-bold">Warm Water OUT</text>
              <text x="225" y="117" fill="#94a3b8" className="text-[8px]">(To sink / drain)</text>

              {/* Condenser Label */}
              <text x="320" y="170" fill="#e0f2fe" textAnchor="middle" className="text-[11px] font-bold tracking-wide" transform="rotate(22 320 170)">
                LIEBIG CONDENSER
              </text>

              {/* Delivery Adapter */}
              <path d="M 435 242 L 465 255 L 465 285" stroke="#38bdf8" strokeWidth="2.5" fill="none" />

              {/* Receiving Conical Flask */}
              <polygon points="445,325 485,325 475,285 455,285" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              {/* Collected Pure Distillate */}
              <polygon points="448,323 482,323 478,305 452,305" fill="#22c55e" opacity="0.5" />
              <text x="495" y="305" fill="#4ade80" className="text-[10px] font-bold">Pure Distillate</text>
              <text x="495" y="317" fill="#94a3b8" className="text-[8px]">(Lower boiling component)</text>

              {/* Distillation Flow Callouts */}
              <path d="M 120 150 Q 150 110 180 135" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
              <text x="155" y="130" fill="#fb7185" className="text-[8px] font-bold">Vapor Ascends</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>WAEC Key Rule:</strong> Cold water enters through the <em>bottom</em> inlet and exits from the <em>top</em>. This counter-current flow prevents air bubbles and keeps the lower end coldest for 100% vapor condensation.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 2. ASCENDING PAPER CHROMATOGRAPHY
    // ----------------------------------------------------
    case 'paper-chromatography':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Ascending Paper Chromatography & Rf Value Principle</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 font-medium">
              Analytical Separation · Retention Factor (Rf)
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 600 340" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* Glass Tank / Boiling Tube */}
              <rect x="80" y="30" width="180" height="280" rx="8" fill="#0f172a" stroke="#64748b" strokeWidth="2.5" />
              {/* Tank Lid / Stopper */}
              <rect x="75" y="20" width="190" height="15" rx="3" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
              <text x="170" y="15" fill="#94a3b8" textAnchor="middle" className="text-[9px]">Airtight Lid (Saturates vapor)</text>

              {/* Chromatography Paper Strip */}
              <rect x="110" y="45" width="120" height="245" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.5" />

              {/* Solvent Level at Bottom */}
              <rect x="85" y="275" width="170" height="30" rx="4" fill="#0284c7" fillOpacity="0.4" stroke="#0ea5e9" strokeWidth="1" />
              <text x="35" y="290" fill="#38bdf8" className="text-[10px] font-bold">Solvent Reservoir</text>
              <text x="35" y="302" fill="#64748b" className="text-[8px]">(Water / Ethanol)</text>

              {/* Origin Line (Baseline) in Pencil */}
              <line x1="110" y1="255" x2="230" y2="255" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="25" y="255" fill="#facc15" className="text-[10px] font-bold">Baseline (Origin)</text>
              <text x="25" y="267" fill="#94a3b8" className="text-[8px]">Pencil line (Insoluble)</text>

              {/* Solvent Front Line */}
              <line x1="110" y1="75" x2="230" y2="75" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="25" y="80" fill="#38bdf8" className="text-[10px] font-bold">Solvent Front</text>
              <text x="25" y="92" fill="#94a3b8" className="text-[8px]">Distance solvent traveled</text>

              {/* Separated Component Spots on Paper */}
              {/* Component A (Fastest / Most Soluble) - Blue */}
              <circle cx="170" cy="115" r="9" fill="#0ea5e9" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="195" y="118" fill="#38bdf8" className="text-[9px] font-bold">Pigment A (High solubility)</text>

              {/* Component B (Intermediate) - Red */}
              <circle cx="170" cy="170" r="8" fill="#f43f5e" stroke="#fb7185" strokeWidth="1.5" />
              <text x="195" y="173" fill="#fb7185" className="text-[9px] font-bold">Pigment B (Medium affinity)</text>

              {/* Component C (Slowest / High Adsorption) - Yellow */}
              <circle cx="170" cy="225" r="7" fill="#eab308" stroke="#facc15" strokeWidth="1.5" />
              <text x="195" y="228" fill="#facc15" className="text-[9px] font-bold">Pigment C (High adsorption)</text>

              {/* Original Sample Spot at Base */}
              <circle cx="170" cy="255" r="4" fill="#64748b" />

              {/* Dimension Arrows on Right Side */}
              {/* Solvent Distance (D_solvent) */}
              <line x1="330" y1="255" x2="330" y2="75" stroke="#38bdf8" strokeWidth="1.5" />
              <polygon points="327,82 333,82 330,75" fill="#38bdf8" />
              <polygon points="327,248 333,248 330,255" fill="#38bdf8" />
              <text x="340" y="165" fill="#38bdf8" className="text-[10px] font-bold">d_solvent (18 cm)</text>

              {/* Solute Distance for Pigment A (D_solute) */}
              <line x1="310" y1="255" x2="310" y2="115" stroke="#4ade80" strokeWidth="1.5" />
              <polygon points="307,122 313,122 310,115" fill="#4ade80" />
              <polygon points="307,248 313,248 310,255" fill="#4ade80" />
              <text x="240" y="195" fill="#4ade80" className="text-[10px] font-bold">d_solute (14 cm)</text>

              {/* Formula & Calculation Box */}
              <rect x="360" y="190" width="220" height="110" rx="8" fill="#0b1329" stroke="#1e293b" strokeWidth="1.5" />
              <text x="470" y="212" fill="#f8fafc" textAnchor="middle" className="text-[11px] font-bold">Rf Value Calculation Formula</text>
              <text x="470" y="235" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-mono font-bold">
                Rf = d(solute) ÷ d(solvent)
              </text>
              <line x1="380" y1="248" x2="560" y2="248" stroke="#334155" strokeWidth="1" />
              <text x="470" y="268" fill="#34d399" textAnchor="middle" className="text-[10px] font-mono">
                Rf(A) = 14 cm ÷ 18 cm = 0.78
              </text>
              <text x="470" y="286" fill="#94a3b8" textAnchor="middle" className="text-[9px]">
                0 ≤ Rf ≤ 1.0 (Always dimensionless)
              </text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Crucial Lab Precaution:</strong> The baseline must be drawn with a <em>pencil</em> (graphite is insoluble, while pen ink will dissolve and travel with the solvent), and must remain <em>above</em> the solvent level so the dye does not wash into the tank.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 3. BOHR ATOMIC MODEL & ELECTRON SHELLS (Na & Cl)
    // ----------------------------------------------------
    case 'bohr-atomic-model':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Atom className="w-4 h-4 text-amber-400" />
              <span>Bohr Model: Planetary Electron Shells & Configurations</span>
            </div>
            <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60 font-medium">
              Atomic Structure · 2n² Shell Capacity
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 340" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* Left Atom: Sodium (Na, Z=11) */}
              <g transform="translate(150, 160)">
                {/* Shell K (n=1, r=35) */}
                <circle cx="0" cy="0" r="38" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Shell L (n=2, r=70) */}
                <circle cx="0" cy="0" r="72" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Shell M (n=3, r=105) */}
                <circle cx="0" cy="0" r="105" fill="none" stroke="#f59e0b" strokeWidth="2" />

                {/* Nucleus */}
                <circle cx="0" cy="0" r="22" fill="#be123c" stroke="#f43f5e" strokeWidth="2" />
                <text x="0" y="-3" fill="#ffffff" textAnchor="middle" className="text-[10px] font-bold">11p⁺</text>
                <text x="0" y="10" fill="#fecdd3" textAnchor="middle" className="text-[9px]">12n⁰</text>

                {/* K Shell Electrons (2) */}
                <circle cx="0" cy="-38" r="4" fill="#38bdf8" />
                <circle cx="0" cy="38" r="4" fill="#38bdf8" />

                {/* L Shell Electrons (8, in 4 pairs) */}
                <circle cx="-50" cy="-50" r="4" fill="#38bdf8" />
                <circle cx="-42" cy="-58" r="4" fill="#38bdf8" />
                <circle cx="50" cy="-50" r="4" fill="#38bdf8" />
                <circle cx="42" cy="-58" r="4" fill="#38bdf8" />
                <circle cx="-50" cy="50" r="4" fill="#38bdf8" />
                <circle cx="-42" cy="58" r="4" fill="#38bdf8" />
                <circle cx="50" cy="50" r="4" fill="#38bdf8" />
                <circle cx="42" cy="58" r="4" fill="#38bdf8" />

                {/* M Shell Valence Electron (1) */}
                <circle cx="0" cy="-105" r="6" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
                <text x="0" y="-116" fill="#facc15" textAnchor="middle" className="text-[9px] font-bold">1 Valence e⁻</text>

                <text x="0" y="130" fill="#f8fafc" textAnchor="middle" className="text-[12px] font-bold">Sodium (₁₁Na)</text>
                <text x="0" y="145" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-mono font-bold">Configuration: 2, 8, 1</text>
                <text x="0" y="158" fill="#94a3b8" textAnchor="middle" className="text-[8px]">Period 3 · Group 1 (Alkali Metal)</text>
              </g>

              {/* Right Atom: Chlorine (Cl, Z=17) */}
              <g transform="translate(460, 160)">
                {/* Shell K (n=1, r=38) */}
                <circle cx="0" cy="0" r="38" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Shell L (n=2, r=72) */}
                <circle cx="0" cy="0" r="72" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Shell M (n=3, r=105) */}
                <circle cx="0" cy="0" r="105" fill="none" stroke="#10b981" strokeWidth="2" />

                {/* Nucleus */}
                <circle cx="0" cy="0" r="22" fill="#047857" stroke="#10b981" strokeWidth="2" />
                <text x="0" y="-3" fill="#ffffff" textAnchor="middle" className="text-[10px] font-bold">17p⁺</text>
                <text x="0" y="10" fill="#a7f3d0" textAnchor="middle" className="text-[9px]">18n⁰</text>

                {/* K Shell Electrons (2) */}
                <circle cx="0" cy="-38" r="4" fill="#34d399" />
                <circle cx="0" cy="38" r="4" fill="#34d399" />

                {/* L Shell Electrons (8) */}
                <circle cx="-50" cy="-50" r="4" fill="#34d399" />
                <circle cx="-42" cy="-58" r="4" fill="#34d399" />
                <circle cx="50" cy="-50" r="4" fill="#34d399" />
                <circle cx="42" cy="-58" r="4" fill="#34d399" />
                <circle cx="-50" cy="50" r="4" fill="#34d399" />
                <circle cx="-42" cy="58" r="4" fill="#34d399" />
                <circle cx="50" cy="50" r="4" fill="#34d399" />
                <circle cx="42" cy="58" r="4" fill="#34d399" />

                {/* M Shell Valence Electrons (7) */}
                <circle cx="-74" cy="-74" r="4" fill="#34d399" />
                <circle cx="-70" cy="-80" r="4" fill="#34d399" />
                <circle cx="74" cy="-74" r="4" fill="#34d399" />
                <circle cx="70" cy="-80" r="4" fill="#34d399" />
                <circle cx="-74" cy="74" r="4" fill="#34d399" />
                <circle cx="-70" cy="80" r="4" fill="#34d399" />
                <circle cx="0" cy="105" r="4" fill="#34d399" />

                <text x="0" y="130" fill="#f8fafc" textAnchor="middle" className="text-[12px] font-bold">Chlorine (₁₇Cl)</text>
                <text x="0" y="145" fill="#34d399" textAnchor="middle" className="text-[10px] font-mono font-bold">Configuration: 2, 8, 7</text>
                <text x="0" y="158" fill="#94a3b8" textAnchor="middle" className="text-[8px]">Period 3 · Group 7 (Halogen)</text>
              </g>

              {/* Electron Transfer Arrow from Na to Cl */}
              <path d="M 150 55 Q 300 -10 460 55" stroke="#facc15" strokeWidth="2.5" strokeDasharray="5 3" fill="none" />
              <polygon points="460,55 450,47 452,58" fill="#facc15" />
              <text x="305" y="25" fill="#facc15" textAnchor="middle" className="text-[10px] font-bold">1e⁻ Transfer (Ionic Octet Drive)</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Shell Capacity (2n²):</strong> Shell 1 (K) holds max 2 electrons; Shell 2 (L) holds max 8; Shell 3 (M) holds up to 18 (stable octet at 8). Valence electrons determine the group number and chemical reactivity.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 4. IONIC VS. COVALENT CHEMICAL BONDING
    // ----------------------------------------------------
    case 'ionic-covalent-bonding':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Layers className="w-4 h-4 text-sky-400" />
              <span>Chemical Bonding: Electrovalent (Transfer) vs Covalent (Sharing)</span>
            </div>
            <span className="text-[10px] text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60 font-medium">
              Lewis Dot & Cross Structures
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 330" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* Divider between Ionic and Covalent */}
              <line x1="310" y1="20" x2="310" y2="300" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* LEFT: IONIC BONDING (NaCl) */}
              <text x="155" y="30" fill="#f43f5e" textAnchor="middle" className="text-[12px] font-bold">1. ELECTROVALENT (IONIC) BONDING</text>
              <text x="155" y="45" fill="#94a3b8" textAnchor="middle" className="text-[9px]">Complete Transfer of Electron (Metal → Non-Metal)</text>

              {/* Sodium Cation [Na]+ */}
              <g transform="translate(70, 140)">
                <rect x="-35" y="-35" width="70" height="70" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="0" y="8" fill="#ffffff" textAnchor="middle" className="text-[18px] font-bold font-mono">Na</text>
                <text x="40" y="-20" fill="#f43f5e" className="text-[16px] font-bold font-mono">+</text>
                <text x="0" y="55" fill="#fb7185" textAnchor="middle" className="text-[10px] font-bold">[2, 8]⁺</text>
                <text x="0" y="68" fill="#94a3b8" textAnchor="middle" className="text-[8px]">Stable Neon Core</text>
              </g>

              {/* Electrostatic Force Arrow */}
              <line x1="125" y1="140" x2="165" y2="140" stroke="#facc15" strokeWidth="3" />
              <polygon points="170,140 162,136 162,144" fill="#facc15" />
              <polygon points="120,140 128,136 128,144" fill="#facc15" />
              <text x="145" y="125" fill="#facc15" textAnchor="middle" className="text-[8px] font-bold">Electrostatic</text>
              <text x="145" y="160" fill="#facc15" textAnchor="middle" className="text-[8px] font-bold">Attraction</text>

              {/* Chloride Anion [Cl]- with dots & cross */}
              <g transform="translate(225, 140)">
                <rect x="-40" y="-40" width="80" height="80" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="0" y="8" fill="#ffffff" textAnchor="middle" className="text-[18px] font-bold font-mono">Cl</text>
                <text x="45" y="-25" fill="#38bdf8" className="text-[16px] font-bold font-mono">−</text>
                {/* 7 Cl valence dots */}
                <circle cx="-25" cy="-15" r="2.5" fill="#38bdf8" />
                <circle cx="-25" cy="15" r="2.5" fill="#38bdf8" />
                <circle cx="25" cy="-15" r="2.5" fill="#38bdf8" />
                <circle cx="25" cy="15" r="2.5" fill="#38bdf8" />
                <circle cx="-15" cy="-30" r="2.5" fill="#38bdf8" />
                <circle cx="15" cy="-30" r="2.5" fill="#38bdf8" />
                <circle cx="-15" cy="30" r="2.5" fill="#38bdf8" />
                {/* 1 transferred Na electron (Cross x) */}
                <text x="12" y="34" fill="#f43f5e" className="text-[12px] font-bold">×</text>
                <text x="0" y="60" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">[2, 8, 8]⁻</text>
                <text x="0" y="73" fill="#94a3b8" textAnchor="middle" className="text-[8px]">Stable Argon Core</text>
              </g>

              <text x="155" y="270" fill="#cbd5e1" textAnchor="middle" className="text-[10px]">High M.P. · Conducts in Molten/Aqueous states</text>

              {/* RIGHT: COVALENT BONDING (Water H2O) */}
              <text x="465" y="30" fill="#34d399" textAnchor="middle" className="text-[12px] font-bold">2. COVALENT (MOLECULAR) BONDING</text>
              <text x="465" y="45" fill="#94a3b8" textAnchor="middle" className="text-[9px]">Mutual Sharing of Electron Pairs (Non-Metals)</text>

              {/* Central Oxygen atom */}
              <g transform="translate(465, 140)">
                <circle cx="0" cy="0" r="42" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <text x="0" y="7" fill="#ffffff" textAnchor="middle" className="text-[18px] font-bold font-mono">O</text>

                {/* Lone pairs on Oxygen */}
                <circle cx="-12" cy="-32" r="3" fill="#10b981" />
                <circle cx="12" cy="-32" r="3" fill="#10b981" />
                <circle cx="-32" cy="0" r="3" fill="#10b981" />
                <circle cx="-32" cy="15" r="3" fill="#10b981" />
                <text x="-40" y="-15" fill="#94a3b8" className="text-[8px]">Lone Pairs</text>

                {/* Left Shared Bond with Hydrogen */}
                <circle cx="-30" cy="35" r="25" fill="#1e293b" fillOpacity="0.6" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="-35" y="42" fill="#38bdf8" textAnchor="middle" className="text-[14px] font-bold font-mono">H</text>
                {/* Overlap dots */}
                <circle cx="-18" cy="22" r="2.5" fill="#10b981" />
                <text x="-12" y="36" fill="#38bdf8" className="text-[11px] font-bold font-mono">×</text>

                {/* Right Shared Bond with Hydrogen */}
                <circle cx="35" cy="35" r="25" fill="#1e293b" fillOpacity="0.6" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="40" y="42" fill="#38bdf8" textAnchor="middle" className="text-[14px] font-bold font-mono">H</text>
                {/* Overlap dots */}
                <circle cx="22" cy="22" r="2.5" fill="#10b981" />
                <text x="16" y="36" fill="#38bdf8" className="text-[11px] font-bold font-mono">×</text>

                <text x="0" y="85" fill="#34d399" textAnchor="middle" className="text-[10px] font-mono font-bold">H : O : H (Water Molecule)</text>
                <text x="0" y="98" fill="#94a3b8" textAnchor="middle" className="text-[8px]">2 Single Covalent Bonds + 2 Lone Pairs</text>
              </g>

              <text x="465" y="270" fill="#cbd5e1" textAnchor="middle" className="text-[10px]">Low M.P. · Non-Electrolytes (No free mobile ions)</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
            <span>
              <strong>Fundamental Distinction:</strong> Ionic compounds form crystal lattices held by non-directional electrostatic forces (conducting electricity when molten/dissolved). Covalent substances form distinct molecules with directional shared orbital bonds.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 5. BUNSEN BURNER FLAME ANATOMY (LUMINOUS VS NON-LUMINOUS)
    // ----------------------------------------------------
    case 'bunsen-burner-flame':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>Bunsen Burner Flame Anatomy: Heating vs Safety Flames</span>
            </div>
            <span className="text-[10px] text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/60 font-medium">
              Laboratory Apparatus & Thermal Zones
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 340" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              <line x1="310" y1="20" x2="310" y2="300" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* LEFT: NON-LUMINOUS FLAME (AIR HOLE OPEN) */}
              <text x="155" y="30" fill="#38bdf8" textAnchor="middle" className="text-[12px] font-bold">1. NON-LUMINOUS (HEATING FLAME)</text>
              <text x="155" y="45" fill="#4ade80" textAnchor="middle" className="text-[9px] font-bold">Air Hole Fully OPEN · Roaring Blue · Non-Sooty</text>

              {/* Outer Pale Blue Zone */}
              <path d="M 120 220 Q 100 130 155 70 Q 210 130 190 220 Z" fill="#0284c7" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="2" />
              {/* Middle Reducing Zone */}
              <path d="M 130 220 Q 120 160 155 110 Q 190 160 180 220 Z" fill="#06b6d4" fillOpacity="0.5" stroke="#22d3ee" strokeWidth="1.5" />
              {/* Inner Dark Unburnt Gas Cone */}
              <path d="M 140 220 Q 135 185 155 150 Q 175 185 170 220 Z" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />

              {/* Burner Chimney & Base */}
              <rect x="142" y="220" width="26" height="55" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
              {/* Open Air Collar */}
              <circle cx="155" cy="245" r="5" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
              <rect x="110" y="275" width="90" height="15" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />

              {/* Zone Annotations */}
              <text x="75" y="80" fill="#38bdf8" className="text-[9px] font-bold">Hottest Tip (~1500°C)</text>
              <line x1="125" y1="80" x2="155" y2="72" stroke="#38bdf8" strokeWidth="1" />

              <text x="25" y="115" fill="#38bdf8" className="text-[9px] font-bold">Outer Oxidizing Zone</text>
              <text x="25" y="126" fill="#94a3b8" className="text-[8px]">Complete combustion</text>

              <text x="200" y="140" fill="#22d3ee" className="text-[9px] font-bold">Middle Reducing Zone</text>

              <text x="200" y="185" fill="#f43f5e" className="text-[9px] font-bold">Inner Unburnt Cone (~300°C)</text>
              <text x="200" y="196" fill="#94a3b8" className="text-[8px]">Cold gas / No combustion</text>

              <text x="155" y="305" fill="#94a3b8" textAnchor="middle" className="text-[9px]">Air hole OPEN → Used for all lab heating</text>

              {/* RIGHT: LUMINOUS FLAME (AIR HOLE CLOSED) */}
              <text x="465" y="30" fill="#facc15" textAnchor="middle" className="text-[12px] font-bold">2. LUMINOUS (SAFETY FLAME)</text>
              <text x="465" y="45" fill="#f87171" textAnchor="middle" className="text-[9px] font-bold">Air Hole CLOSED · Quiet Wavy Yellow · Sooty</text>

              {/* Outer Thin Mantle */}
              <path d="M 430 220 Q 405 130 465 60 Q 525 130 500 220 Z" fill="#ca8a04" fillOpacity="0.25" stroke="#eab308" strokeWidth="1.5" />
              {/* Luminous Bright Yellow Mantle */}
              <path d="M 435 220 Q 415 140 465 85 Q 515 140 495 220 Z" fill="#facc15" fillOpacity="0.8" stroke="#fbbf24" strokeWidth="2" />
              {/* Inner Dark Cone */}
              <path d="M 450 220 Q 445 185 465 155 Q 485 185 480 220 Z" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />

              {/* Burner Chimney & Base */}
              <rect x="452" y="220" width="26" height="55" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
              {/* Closed Air Collar (Solid) */}
              <circle cx="465" cy="245" r="5" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
              <rect x="420" y="275" width="90" height="15" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />

              {/* Luminous Annotations */}
              <text x="510" y="105" fill="#facc15" className="text-[9px] font-bold">Bright Yellow Mantle</text>
              <text x="510" y="117" fill="#94a3b8" className="text-[8px]">Incomplete combustion;</text>
              <text x="510" y="128" fill="#94a3b8" className="text-[8px]">glowing carbon (soot)</text>

              <text x="330" y="180" fill="#f87171" className="text-[9px] font-bold">Deposits Black Soot</text>
              <text x="330" y="192" fill="#94a3b8" className="text-[8px]">Not for heating glass</text>

              <text x="465" y="305" fill="#94a3b8" textAnchor="middle" className="text-[9px]">Air hole CLOSED → Safety idle flame</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-rose-400 shrink-0" />
            <span>
              <strong>WAEC Practical Fact:</strong> A match head placed directly in the inner unburnt dark cone will <em>not</em> ignite because no oxygen is present to support combustion. Always heat apparatus using the non-luminous flame tip.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 6. PERIODIC TABLE PERIODIC TRENDS
    // ----------------------------------------------------
    case 'periodic-table-trends':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Atom className="w-4 h-4 text-purple-400" />
              <span>Periodic Table: Atomic Property Vectors & Trends</span>
            </div>
            <span className="text-[10px] text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/60 font-medium">
              Periodic Law · Groups & Periods
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 340" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* Stylized Periodic Table Frame */}
              <g opacity="0.35">
                {/* s-block */}
                <rect x="70" y="70" width="60" height="150" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                <text x="100" y="150" fill="#94a3b8" textAnchor="middle" className="text-[11px] font-bold">s-block</text>
                {/* d-block */}
                <rect x="135" y="120" width="200" height="100" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                <text x="235" y="175" fill="#94a3b8" textAnchor="middle" className="text-[11px] font-bold">d-block (Transition Metals)</text>
                {/* p-block */}
                <rect x="340" y="70" width="160" height="150" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                <text x="420" y="150" fill="#94a3b8" textAnchor="middle" className="text-[11px] font-bold">p-block</text>
                {/* Helium block */}
                <rect x="475" y="45" width="25" height="25" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
                <text x="487" y="62" fill="#94a3b8" textAnchor="middle" className="text-[9px]">He</text>
              </g>

              {/* HORIZONTAL TREND ARROWS (ACROSS PERIOD: LEFT TO RIGHT) */}
              {/* Atomic Radius (Decreases →) */}
              <line x1="70" y1="40" x2="480" y2="40" stroke="#f43f5e" strokeWidth="2.5" />
              <polygon points="485,40 475,36 475,44" fill="#f43f5e" />
              <text x="280" y="32" fill="#fb7185" textAnchor="middle" className="text-[10px] font-bold">
                Atomic Radius DECREASES → (Nuclear charge increases, pulling shells closer)
              </text>

              {/* Ionization Energy & Electronegativity (Increases →) */}
              <line x1="70" y1="240" x2="480" y2="240" stroke="#38bdf8" strokeWidth="2.5" />
              <polygon points="485,240 475,236 475,244" fill="#38bdf8" />
              <text x="280" y="255" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">
                Ionization Energy & Electronegativity INCREASE → (Harder to remove e⁻)
              </text>

              {/* VERTICAL TREND ARROWS (DOWN GROUP: TOP TO BOTTOM) */}
              {/* Atomic Radius (Increases ↓) */}
              <line x1="45" y1="70" x2="45" y2="220" stroke="#10b981" strokeWidth="2.5" />
              <polygon points="45,225 41,215 49,215" fill="#10b981" />
              <text x="35" y="145" fill="#34d399" textAnchor="middle" className="text-[9px] font-bold" transform="rotate(-90 35 145)">
                Atomic Radius INCREASES ↓ (New shells added)
              </text>

              {/* Electronegativity (Decreases ↓) */}
              <line x1="520" y1="70" x2="520" y2="220" stroke="#c084fc" strokeWidth="2.5" />
              <polygon points="520,225 516,215 524,215" fill="#c084fc" />
              <text x="535" y="145" fill="#c084fc" textAnchor="middle" className="text-[9px] font-bold" transform="rotate(90 535 145)">
                Electronegativity DECREASES ↓ (Shielding increases)
              </text>

              {/* Corner Spotlights: Francium vs Fluorine */}
              <rect x="60" y="270" width="220" height="55" rx="6" fill="#0b1329" stroke="#10b981" strokeWidth="1" />
              <text x="70" y="288" fill="#34d399" className="text-[10px] font-bold">Bottom-Left (Francium / Fr):</text>
              <text x="70" y="302" fill="#cbd5e1" className="text-[9px]">• Largest atomic radius</text>
              <text x="70" y="314" fill="#cbd5e1" className="text-[9px]">• Most electropositive / metallic element</text>

              <rect x="320" y="270" width="220" height="55" rx="6" fill="#0b1329" stroke="#38bdf8" strokeWidth="1" />
              <text x="330" y="288" fill="#38bdf8" className="text-[10px] font-bold">Top-Right (Fluorine / F):</text>
              <text x="330" y="302" fill="#cbd5e1" className="text-[9px]">• Smallest radius (excl. noble gases)</text>
              <text x="330" y="314" fill="#cbd5e1" className="text-[9px]">• Highest electronegativity (4.0 Pauling)</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-purple-400 shrink-0" />
            <span>
              <strong>The Shielding Factor:</strong> Down a group, inner electron shells shield outer valence electrons from the positive nuclear charge, making valence electrons easier to remove despite greater nuclear charge.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 7. THERMOCHEMICAL REACTION ENERGY PROFILES
    // ----------------------------------------------------
    case 'reaction-energy-profile':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Reaction Energy Profiles: Exothermic vs. Endothermic Pathways</span>
            </div>
            <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60 font-medium">
              Thermochemistry · Activation Energy (E_a) & ΔH
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 310" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* EXOTHERMIC REACTION (LEFT) */}
              <g transform="translate(15, 10)">
                <text x="135" y="20" fill="#f43f5e" textAnchor="middle" className="text-[11px] font-bold">EXOTHERMIC (ΔH &lt; 0)</text>
                <text x="135" y="34" fill="#94a3b8" textAnchor="middle" className="text-[9px]">Heat Released to Surroundings</text>

                {/* Axes */}
                <line x1="40" y1="260" x2="260" y2="260" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="40" y1="260" x2="40" y2="40" stroke="#94a3b8" strokeWidth="1.5" />
                <text x="240" y="275" fill="#64748b" className="text-[9px]">Reaction Progress →</text>
                <text x="15" y="140" fill="#64748b" transform="rotate(-90 15 140)" className="text-[9px]">Potential Energy →</text>

                {/* Reactants Level */}
                <line x1="40" y1="150" x2="90" y2="150" stroke="#38bdf8" strokeWidth="3" />
                <text x="65" y="142" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">Reactants</text>

                {/* Energy Hump / Activated Complex */}
                <path d="M 90 150 C 130 50 150 50 170 150 L 220 220 L 250 220" fill="none" stroke="#f43f5e" strokeWidth="3" />
                <circle cx="140" cy="65" r="4" fill="#f43f5e" />
                <text x="140" y="55" fill="#f43f5e" textAnchor="middle" className="text-[9px] font-bold">Activated Complex</text>

                {/* Products Level */}
                <line x1="220" y1="220" x2="260" y2="220" stroke="#10b981" strokeWidth="3" />
                <text x="240" y="212" fill="#10b981" textAnchor="middle" className="text-[10px] font-bold">Products</text>

                {/* Activation Energy Arrow E_a */}
                <line x1="85" y1="150" x2="85" y2="65" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="2 2" />
                <text x="95" y="105" fill="#fbbf24" className="text-[9px] font-bold">E_a</text>

                {/* ΔH Arrow (Downwards) */}
                <line x1="215" y1="150" x2="215" y2="220" stroke="#f43f5e" strokeWidth="2" />
                <polygon points="215,225 212,217 218,217" fill="#f43f5e" />
                <text x="225" y="190" fill="#f43f5e" className="text-[10px] font-extrabold">-ΔH</text>
              </g>

              {/* DIVIDER */}
              <line x1="310" y1="20" x2="310" y2="290" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

              {/* ENDOTHERMIC REACTION (RIGHT) */}
              <g transform="translate(325, 10)">
                <text x="135" y="20" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-bold">ENDOTHERMIC (ΔH &gt; 0)</text>
                <text x="135" y="34" fill="#94a3b8" textAnchor="middle" className="text-[9px]">Heat Absorbed from Surroundings</text>

                {/* Axes */}
                <line x1="40" y1="260" x2="260" y2="260" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="40" y1="260" x2="40" y2="40" stroke="#94a3b8" strokeWidth="1.5" />
                <text x="240" y="275" fill="#64748b" className="text-[9px]">Reaction Progress →</text>

                {/* Reactants Level (Low) */}
                <line x1="40" y1="220" x2="90" y2="220" stroke="#38bdf8" strokeWidth="3" />
                <text x="65" y="212" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">Reactants</text>

                {/* Energy Hump */}
                <path d="M 90 220 C 130 50 160 50 180 130 L 220 130 L 260 130" fill="none" stroke="#38bdf8" strokeWidth="3" />
                <circle cx="145" cy="65" r="4" fill="#38bdf8" />
                <text x="145" y="55" fill="#38bdf8" textAnchor="middle" className="text-[9px] font-bold">Transition State</text>

                {/* Products Level (High) */}
                <line x1="220" y1="130" x2="260" y2="130" stroke="#a855f7" strokeWidth="3" />
                <text x="240" y="122" fill="#a855f7" textAnchor="middle" className="text-[10px] font-bold">Products</text>

                {/* ΔH Arrow (Upwards) */}
                <line x1="215" y1="220" x2="215" y2="130" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="215,125 212,133 218,133" fill="#38bdf8" />
                <text x="225" y="180" fill="#38bdf8" className="text-[10px] font-extrabold">+ΔH</text>
              </g>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Effect of Catalysts:</strong> A positive catalyst provides an alternative reaction pathway with a lower Activation Energy (E_a), speeding up both forward and reverse reaction rates equally without altering the net enthalpy change (ΔH) or the equilibrium constant (K_c).
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 8. THE DANIELL ELECTROCHEMICAL GALVANIC CELL
    // ----------------------------------------------------
    case 'daniell-electrochemical-cell':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <FlaskConical className="w-4 h-4 text-cyan-400" />
              <span>The Daniell Galvanic Cell & Salt Bridge Dynamics</span>
            </div>
            <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60 font-medium">
              Electrochemistry · E°_cell = +1.10V
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 330" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* VOLTMETER & EXTERNAL CIRCUIT */}
              <circle cx="310" cy="50" r="26" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="310" y="46" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-extrabold">V</text>
              <text x="310" y="62" fill="#10b981" textAnchor="middle" className="text-[10px] font-bold">1.10 V</text>

              {/* Wire Left from Anode */}
              <line x1="160" y1="130" x2="160" y2="50" stroke="#f59e0b" strokeWidth="2" />
              <line x1="160" y1="50" x2="284" y2="50" stroke="#f59e0b" strokeWidth="2" />
              {/* Electron Flow Arrow Left to Right */}
              <polygon points="230,47 240,50 230,53" fill="#fbbf24" />
              <text x="210" y="42" fill="#fbbf24" className="text-[9px] font-bold">e⁻ Flow →</text>

              {/* Wire Right to Cathode */}
              <line x1="336" y1="50" x2="460" y2="50" stroke="#f59e0b" strokeWidth="2" />
              <line x1="460" y1="50" x2="460" y2="130" stroke="#f59e0b" strokeWidth="2" />

              {/* ANODE BEAKER (LEFT: ZINC) */}
              <g transform="translate(80, 110)">
                {/* Beaker Glass */}
                <rect x="20" y="30" width="160" height="170" fill="#0f172a" stroke="#475569" strokeWidth="2" rx="4" />
                {/* Solution (1M ZnSO4 - Clear/Slate) */}
                <rect x="22" y="70" width="156" height="128" fill="#1e293b" opacity="0.6" />
                <text x="100" y="185" fill="#94a3b8" textAnchor="middle" className="text-[10px] font-semibold">1.0 M ZnSO₄(aq)</text>

                {/* Zinc Electrode (Anode - Negative) */}
                <rect x="65" y="10" width="30" height="140" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1.5" />
                <text x="80" y="2" fill="#f8fafc" textAnchor="middle" className="text-[10px] font-bold">Zn Anode (-)</text>
                <text x="80" y="100" fill="#0f172a" textAnchor="middle" className="text-[10px] font-extrabold" transform="rotate(-90 80 100)">OXIDATION</text>

                <text x="100" y="215" fill="#f87171" textAnchor="middle" className="text-[9px] font-bold">Zn(s) → Zn²⁺ + 2e⁻</text>
              </g>

              {/* INVERTED U-TUBE SALT BRIDGE */}
              <path d="M 220 180 L 220 100 Q 220 85 240 85 L 380 85 Q 400 85 400 100 L 400 180" fill="none" stroke="#a855f7" strokeWidth="16" strokeLinecap="round" opacity="0.8" />
              <text x="310" y="105" fill="#ffffff" textAnchor="middle" className="text-[10px] font-bold">SALT BRIDGE (KNO₃ / Agar-Agar)</text>
              <text x="250" y="135" fill="#c084fc" className="text-[8px] font-bold">NO₃⁻ →</text>
              <text x="350" y="135" fill="#c084fc" className="text-[8px] font-bold">→ K⁺</text>

              {/* CATHODE BEAKER (RIGHT: COPPER) */}
              <g transform="translate(360, 110)">
                {/* Beaker Glass */}
                <rect x="20" y="30" width="160" height="170" fill="#0f172a" stroke="#475569" strokeWidth="2" rx="4" />
                {/* Solution (1M CuSO4 - Deep Blue) */}
                <rect x="22" y="70" width="156" height="128" fill="#0369a1" opacity="0.5" />
                <text x="100" y="185" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">1.0 M CuSO₄(aq)</text>

                {/* Copper Electrode (Cathode - Positive) */}
                <rect x="85" y="10" width="30" height="140" fill="#b45309" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="100" y="2" fill="#fbbf24" textAnchor="middle" className="text-[10px] font-bold">Cu Cathode (+)</text>
                <text x="100" y="100" fill="#ffffff" textAnchor="middle" className="text-[10px] font-extrabold" transform="rotate(-90 100 100)">REDUCTION</text>

                <text x="100" y="215" fill="#4ade80" textAnchor="middle" className="text-[9px] font-bold">Cu²⁺ + 2e⁻ → Cu(s)</text>
              </g>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>Crucial Functions of the Salt Bridge:</strong> 1. Completes the internal electrical circuit by allowing ion migration; 2. Maintains electrical neutrality in both half-cells (anions migrate to the anode, cations migrate to the cathode), preventing voltage shutdown.
            </span>
          </div>
        </div>
      );

    default:
      return null;
  }
};

