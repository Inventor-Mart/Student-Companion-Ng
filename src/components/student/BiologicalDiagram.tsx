import React from 'react';
import { Eye, Info } from 'lucide-react';

export type DiagramType =
  | 'ecdysis-graph'
  | 'leaf-anatomy'
  | 'tooth-structure'
  | 'heart-anatomy'
  | 'villus-structure'
  | 'nephron-structure'
  | 'bio-respiratory-alveoli'
  | 'bio-ecological-pyramids'
  | 'bio-reflex-arc-neural-pathway'
  | 'bio-genetics-punnett-square'
  | 'bio-human-eye-optics';

interface BiologicalDiagramProps {
  type: DiagramType;
  caption?: string;
}

export const BiologicalDiagram: React.FC<BiologicalDiagramProps> = ({ type, caption }) => {
  switch (type) {
    // ----------------------------------------------------
    // 1. ARTHROPOD ECDYSIS STEP-GRAPH
    // ----------------------------------------------------
    case 'ecdysis-graph':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Arthropod Discontinuous Growth Curve (Ecdysis / Moulting)</span>
            </div>
            <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60 font-medium">
              Stepped Growth Curve
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 540 280" className="w-full max-w-xl mx-auto min-w-[340px] text-xs font-sans">
              {/* Grid Background */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.8" />
                </pattern>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <rect x="50" y="20" width="460" height="200" fill="url(#grid)" rx="8" />

              {/* Axes */}
              <line x1="50" y1="220" x2="515" y2="220" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="50" y1="220" x2="50" y2="15" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Axis Labels */}
              <text x="260" y="255" fill="#94a3b8" textAnchor="middle" className="text-[11px] font-semibold">Time (Days / Weeks)</text>
              <text x="18" y="120" fill="#94a3b8" textAnchor="middle" transform="rotate(-90 18 120)" className="text-[11px] font-semibold">Body Size / Mass (mm)</text>

              {/* Stepped Growth Line */}
              {/* Instar 1 Horizontal */}
              <line x1="50" y1="190" x2="140" y2="190" stroke="#10b981" strokeWidth="3" />
              {/* Moulting 1 Vertical Jump */}
              <line x1="140" y1="190" x2="160" y2="140" stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="3 3" />
              {/* Instar 2 Horizontal */}
              <line x1="160" y1="140" x2="270" y2="140" stroke="#10b981" strokeWidth="3" />
              {/* Moulting 2 Vertical Jump */}
              <line x1="270" y1="140" x2="295" y2="80" stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="3 3" />
              {/* Instar 3 / Adult Horizontal */}
              <line x1="295" y1="80" x2="480" y2="80" stroke="#10b981" strokeWidth="3" />

              {/* Annotations & Callouts */}
              {/* Instar 1 Label */}
              <circle cx="95" cy="190" r="4" fill="#10b981" />
              <text x="95" y="210" fill="#cbd5e1" textAnchor="middle" className="text-[10px] font-medium">1st Instar (Rigid Cuticle)</text>

              {/* Ecdysis 1 Marker */}
              <circle cx="150" cy="165" r="4" fill="#f59e0b" />
              <text x="150" y="125" fill="#f59e0b" textAnchor="middle" className="text-[10px] font-bold">1st Moulting (Ecdysis)</text>

              {/* Instar 2 Label */}
              <circle cx="215" cy="140" r="4" fill="#10b981" />
              <text x="215" y="160" fill="#cbd5e1" textAnchor="middle" className="text-[10px] font-medium">2nd Instar (Shedding)</text>

              {/* Ecdysis 2 Marker */}
              <circle cx="282" cy="110" r="4" fill="#f59e0b" />
              <text x="282" y="70" fill="#f59e0b" textAnchor="middle" className="text-[10px] font-bold">2nd Moulting</text>

              {/* Adult Imago Label */}
              <circle cx="390" cy="80" r="4" fill="#10b981" />
              <text x="390" y="100" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-bold">Adult Imago (Final Size)</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Growth occurs in spurts: the horizontal lines represent periods where the hardened chitinous exoskeleton prevents expansion; vertical jumps occur immediately after ecdysis while the new cuticle is still soft.</span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 2. DICOT LEAF INTERNAL CROSS-SECTION
    // ----------------------------------------------------
    case 'leaf-anatomy':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Transverse Cross-Section of a Dicot Leaf</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 font-medium">
              Anatomical Structure
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 540 320" className="w-full max-w-xl mx-auto min-w-[340px] text-xs font-sans">
              {/* Upper Cuticle */}
              <rect x="40" y="20" width="460" height="8" fill="#38bdf8" opacity="0.8" rx="2" />
              <text x="510" y="27" fill="#38bdf8" className="text-[10px] font-semibold">Waxy Cuticle</text>

              {/* Upper Epidermis */}
              <g>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                  <rect key={i} x={40 + i * 46} y="32" width="44" height="24" fill="#065f46" stroke="#047857" strokeWidth="1.5" rx="4" />
                ))}
                <text x="510" y="48" fill="#10b981" className="text-[10px] font-semibold">Upper Epidermis</text>
              </g>

              {/* Palisade Mesophyll (Dense chloroplasts) */}
              <g>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(i => (
                  <g key={i}>
                    <rect x={42 + i * 28.5} y="62" width="25" height="75" fill="#047857" stroke="#059669" strokeWidth="1.2" rx="4" />
                    {/* Chloroplast dots */}
                    <circle cx={48 + i * 28.5} cy="75" r="2" fill="#34d399" />
                    <circle cx={58 + i * 28.5} cy="88" r="2" fill="#34d399" />
                    <circle cx={50 + i * 28.5} cy="105" r="2" fill="#34d399" />
                    <circle cx={60 + i * 28.5} cy="122" r="2" fill="#34d399" />
                  </g>
                ))}
                <text x="510" y="105" fill="#34d399" className="text-[10px] font-semibold">Palisade Mesophyll (Photosynthesis)</text>
              </g>

              {/* Spongy Mesophyll & Air Spaces */}
              <g>
                {[
                  { cx: 70, cy: 160, r: 16 }, { cx: 120, cy: 155, r: 18 }, { cx: 170, cy: 170, r: 15 },
                  { cx: 370, cy: 165, r: 16 }, { cx: 420, cy: 160, r: 19 }, { cx: 470, cy: 170, r: 15 },
                  { cx: 90, cy: 205, r: 17 }, { cx: 145, cy: 215, r: 15 }, { cx: 400, cy: 210, r: 18 }, { cx: 450, cy: 215, r: 16 }
                ].map((c, i) => (
                  <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="#064e3b" stroke="#047857" strokeWidth="1.2" />
                ))}
                {/* Air space label */}
                <text x="140" y="185" fill="#94a3b8" className="text-[10px] italic">Intercellular Air Spaces</text>
                <text x="510" y="185" fill="#6ee7b7" className="text-[10px] font-semibold">Spongy Mesophyll</text>
              </g>

              {/* Vascular Bundle (Vein: Xylem top, Phloem bottom) */}
              <g>
                {/* Bundle Sheath */}
                <ellipse cx="270" cy="180" rx="60" ry="45" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                {/* Xylem (Top - Blue) */}
                <circle cx="255" cy="165" r="12" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                <circle cx="285" cy="165" r="12" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                <circle cx="270" cy="150" r="10" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="270" y="167" fill="#ffffff" textAnchor="middle" className="text-[9px] font-bold">Xylem</text>

                {/* Phloem (Bottom - Amber) */}
                <circle cx="255" cy="195" r="9" fill="#d97706" stroke="#fbbf24" strokeWidth="1.2" />
                <circle cx="285" cy="195" r="9" fill="#d97706" stroke="#fbbf24" strokeWidth="1.2" />
                <text x="270" y="198" fill="#ffffff" textAnchor="middle" className="text-[9px] font-bold">Phloem</text>

                <text x="270" y="125" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">Vascular Bundle (Vein)</text>
              </g>

              {/* Lower Epidermis with Stomatal Pore & Guard Cells */}
              <g>
                {[0, 1, 2, 4, 5, 7, 8, 9].map(i => (
                  <rect key={i} x={40 + i * 46} y="250" width="44" height="24" fill="#065f46" stroke="#047857" strokeWidth="1.5" rx="4" />
                ))}
                {/* Guard Cells forming Stoma at index 3 and 6 */}
                {/* Stoma 1 */}
                <ellipse cx="178" cy="262" rx="8" ry="12" fill="#10b981" stroke="#34d399" strokeWidth="1.5" />
                <ellipse cx="198" cy="262" rx="8" ry="12" fill="#10b981" stroke="#34d399" strokeWidth="1.5" />
                {/* Stoma 2 */}
                <ellipse cx="316" cy="262" rx="8" ry="12" fill="#10b981" stroke="#34d399" strokeWidth="1.5" />
                <ellipse cx="336" cy="262" rx="8" ry="12" fill="#10b981" stroke="#34d399" strokeWidth="1.5" />

                <text x="510" y="265" fill="#10b981" className="text-[10px] font-semibold">Lower Epidermis</text>
                <text x="188" y="295" fill="#f59e0b" textAnchor="middle" className="text-[10px] font-bold">Stomatal Pore & Guard Cells</text>
              </g>

              {/* Lower Cuticle */}
              <rect x="40" y="276" width="460" height="5" fill="#38bdf8" opacity="0.6" rx="2" />
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Palisade cells receive vertical sunlight and contain ~80% of chloroplasts. The spongy mesophyll features large air spaces allowing atmospheric CO2 to diffuse rapidly into cells.</span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 3. CANINE TOOTH LONGITUDINAL SECTION
    // ----------------------------------------------------
    case 'tooth-structure':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Longitudinal Section (L.S.) of a Mammalian Canine Tooth</span>
            </div>
            <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60 font-medium">
              Tooth Anatomy
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 520 340" className="w-full max-w-xl mx-auto min-w-[340px] text-xs font-sans">
              {/* Background regions: Crown, Neck, Root */}
              <rect x="30" y="20" width="80" height="80" fill="#1e293b" opacity="0.4" rx="4" />
              <text x="70" y="65" fill="#94a3b8" textAnchor="middle" className="text-[11px] font-bold">CROWN</text>

              <rect x="30" y="105" width="80" height="45" fill="#1e293b" opacity="0.4" rx="4" />
              <text x="70" y="132" fill="#94a3b8" textAnchor="middle" className="text-[11px] font-bold">NECK</text>

              <rect x="30" y="155" width="80" height="150" fill="#1e293b" opacity="0.4" rx="4" />
              <text x="70" y="235" fill="#94a3b8" textAnchor="middle" className="text-[11px] font-bold">ROOT</text>

              {/* Gum (Gingiva) */}
              <path d="M 110 110 Q 150 140 180 125 L 180 170 L 110 170 Z" fill="#e11d48" opacity="0.7" />
              <path d="M 390 110 Q 350 140 320 125 L 320 170 L 390 170 Z" fill="#e11d48" opacity="0.7" />
              <text x="400" y="135" fill="#f43f5e" className="text-[10px] font-bold">Gum (Gingiva)</text>

              {/* Tooth Outer Layer: Enamel (Crown only) */}
              <path d="M 250 25 C 200 40 180 75 180 115 L 320 115 C 320 75 300 40 250 25 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
              <text x="330" y="65" fill="#ffffff" className="text-[10px] font-bold">Enamel (Hardest non-living)</text>

              {/* Dentine Layer (Crown down into root) */}
              <path d="M 250 45 C 215 55 195 85 195 125 L 205 270 Q 250 290 295 270 L 305 125 C 305 85 285 55 250 45 Z" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="330" y="95" fill="#fde047" className="text-[10px] font-bold">Dentine (Living bone-like)</text>

              {/* Pulp Cavity (Central core with nerves & blood vessels) */}
              <path d="M 250 75 C 235 85 225 110 225 140 L 235 275 L 265 275 L 275 140 C 275 110 265 85 250 75 Z" fill="#be123c" stroke="#e11d48" strokeWidth="1.5" />

              {/* Blood Vessels & Nerve Fiber in Pulp */}
              {/* Artery (Red) */}
              <path d="M 245 285 L 245 120" stroke="#f43f5e" strokeWidth="2" />
              {/* Vein (Blue) */}
              <path d="M 252 285 L 252 120" stroke="#38bdf8" strokeWidth="2" />
              {/* Nerve (Yellow) */}
              <path d="M 259 285 L 259 120" stroke="#facc15" strokeWidth="2" strokeDasharray="2 2" />

              <text x="330" y="175" fill="#fb7185" className="text-[10px] font-bold">Pulp Cavity</text>
              <text x="330" y="190" fill="#94a3b8" className="text-[9px]">- Blood Capillaries (Nutrition)</text>
              <text x="330" y="202" fill="#94a3b8" className="text-[9px]">- Nerve Fibers (Sensitivity)</text>

              {/* Cementum & Periodontal Ligament (Anchors root to bone) */}
              <path d="M 195 125 L 205 270 Q 250 290 295 270 L 305 125" fill="none" stroke="#ca8a04" strokeWidth="3" />
              <text x="330" y="245" fill="#eab308" className="text-[10px] font-bold">Cementum</text>
              <text x="330" y="260" fill="#94a3b8" className="text-[10px]">Periodontal Ligament (Shock absorber)</text>

              {/* Apical Foramen (Root Opening) */}
              <text x="250" y="315" fill="#cbd5e1" textAnchor="middle" className="text-[10px] font-semibold">Apical Foramen (Nerve & Blood Vessel Entry)</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Enamel lacks living cells and cannot repair itself; dentine contains cytoplasmic strands nourished by the central pulp cavity.</span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 4. MAMMALIAN HEART 4-CHAMBER ANATOMY & CIRCULATION
    // ----------------------------------------------------
    case 'heart-anatomy':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Internal 4-Chambered Anatomy of the Mammalian Heart</span>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="flex items-center gap-1 text-sky-400">
                <span className="w-2 h-2 rounded-full bg-sky-500" /> Deoxygenated
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Oxygenated
              </span>
            </div>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 540 330" className="w-full max-w-xl mx-auto min-w-[340px] text-xs font-sans">
              {/* Outer Muscular Heart Wall (Myocardium) */}
              <path d="M 270 310 C 120 280 80 180 80 120 C 80 70 140 60 210 75 C 240 80 260 100 270 105 C 280 100 300 80 330 75 C 400 60 460 70 460 120 C 460 180 420 280 270 310 Z" fill="#4c0519" stroke="#e11d48" strokeWidth="3" />

              {/* Central Interventricular Septum */}
              <rect x="255" y="90" width="30" height="210" fill="#881337" stroke="#e11d48" strokeWidth="1.5" rx="4" />
              <text x="270" y="235" fill="#fecdd3" textAnchor="middle" className="text-[10px] font-bold" transform="rotate(-90 270 235)">Interventricular Septum</text>

              {/* RIGHT SIDE (Anatomical Right = Left side of diagram - BLUE DEOXYGENATED) */}
              {/* Right Atrium */}
              <rect x="105" y="95" width="135" height="75" fill="#0369a1" opacity="0.8" rx="8" />
              <text x="172" y="125" fill="#ffffff" textAnchor="middle" className="text-[11px] font-bold">RIGHT ATRIUM</text>
              <text x="172" y="140" fill="#bae6fd" textAnchor="middle" className="text-[9px]">(Receives from Vena Cava)</text>

              {/* Tricuspid Valve */}
              <line x1="125" y1="172" x2="220" y2="172" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4 3" />
              <text x="90" y="180" fill="#fbbf24" className="text-[9px] font-bold">Tricuspid Valve</text>

              {/* Right Ventricle */}
              <rect x="105" y="180" width="135" height="95" fill="#0284c7" opacity="0.8" rx="8" />
              <text x="172" y="220" fill="#ffffff" textAnchor="middle" className="text-[11px] font-bold">RIGHT VENTRICLE</text>
              <text x="172" y="235" fill="#bae6fd" textAnchor="middle" className="text-[9px]">(Pumps to Pulmonary Artery)</text>

              {/* LEFT SIDE (Anatomical Left = Right side of diagram - RED OXYGENATED) */}
              {/* Left Atrium */}
              <rect x="300" y="95" width="145" height="75" fill="#be123c" opacity="0.8" rx="8" />
              <text x="372" y="125" fill="#ffffff" textAnchor="middle" className="text-[11px] font-bold">LEFT ATRIUM</text>
              <text x="372" y="140" fill="#fecdd3" textAnchor="middle" className="text-[9px]">(Receives from Pulmonary Vein)</text>

              {/* Bicuspid / Mitral Valve */}
              <line x1="320" y1="172" x2="425" y2="172" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4 3" />
              <text x="430" y="180" fill="#fbbf24" className="text-[9px] font-bold">Bicuspid Valve</text>

              {/* Left Ventricle (Notice much thicker muscular wall!) */}
              <rect x="300" y="180" width="145" height="95" fill="#e11d48" opacity="0.8" rx="8" />
              <text x="372" y="220" fill="#ffffff" textAnchor="middle" className="text-[11px] font-bold">LEFT VENTRICLE</text>
              <text x="372" y="235" fill="#fecdd3" textAnchor="middle" className="text-[9px]">(Pumps to Systemic Aorta)</text>
              <text x="372" y="250" fill="#fde047" textAnchor="middle" className="text-[9px] font-semibold">[ Wall is 3x Thicker! ]</text>

              {/* Top Blood Vessels */}
              {/* Vena Cava (Deoxygenated - Blue) */}
              <rect x="120" y="25" width="40" height="65" fill="#0284c7" rx="6" />
              <text x="140" y="20" fill="#38bdf8" textAnchor="middle" className="text-[9px] font-bold">Vena Cava</text>

              {/* Pulmonary Artery (To lungs - Blue) */}
              <rect x="180" y="25" width="45" height="65" fill="#0369a1" rx="6" />
              <text x="202" y="20" fill="#38bdf8" textAnchor="middle" className="text-[9px] font-bold">Pulmonary Art.</text>

              {/* Aorta (To body - Red) */}
              <rect x="315" y="15" width="55" height="75" fill="#e11d48" rx="8" />
              <text x="342" y="12" fill="#fb7185" textAnchor="middle" className="text-[10px] font-bold">Systemic Aorta</text>

              {/* Pulmonary Veins (From lungs - Red) */}
              <rect x="390" y="25" width="40" height="65" fill="#be123c" rx="6" />
              <text x="410" y="20" fill="#fb7185" textAnchor="middle" className="text-[9px] font-bold">Pulm. Vein</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>The left ventricle has the thickest muscular wall because it must generate enough force to push blood throughout the systemic circulation, whereas the right ventricle only pumps a short distance to the lungs.</span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 5. INTESTINAL VILLUS ABSORPTION STRUCTURE
    // ----------------------------------------------------
    case 'villus-structure':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Structure of a Single Intestinal Villus</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 font-medium">
              Absorption Unit
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 520 320" className="w-full max-w-xl mx-auto min-w-[340px] text-xs font-sans">
              {/* Outer Villus Body (Finger shape) */}
              <path d="M 160 300 L 160 120 C 160 50 360 50 360 120 L 360 300 Z" fill="#0f172a" stroke="#475569" strokeWidth="2" />

              {/* Epithelium Layer (One cell thick with microvilli) */}
              <path d="M 150 300 L 150 120 C 150 35 370 35 370 120 L 370 300" fill="none" stroke="#10b981" strokeWidth="6" strokeDasharray="8 3" />
              <text x="385" y="75" fill="#34d399" className="text-[10px] font-bold">Epithelium (One cell thick)</text>
              <text x="385" y="90" fill="#94a3b8" className="text-[9px]">- Covered with Microvilli</text>

              {/* Central Lacteal (Lymph Vessel - Yellow) */}
              <rect x="240" y="110" width="40" height="190" fill="#ca8a04" stroke="#facc15" strokeWidth="2" rx="16" />
              <text x="260" y="170" fill="#ffffff" textAnchor="middle" className="text-[11px] font-bold" transform="rotate(-90 260 170)">CENTRAL LACTEAL</text>
              <text x="260" y="80" fill="#facc15" textAnchor="middle" className="text-[10px] font-bold">Lacteal Tip</text>

              {/* Capillary Network (Surrounding lacteal) */}
              {/* Arteriole (Red) */}
              <path d="M 185 300 L 185 130 C 185 90 230 90 230 130 L 230 300" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
              {/* Venule (Blue) */}
              <path d="M 335 300 L 335 130 C 335 90 290 90 290 130 L 290 300" fill="none" stroke="#38bdf8" strokeWidth="2.5" />

              {/* Capillary Cross-links */}
              {[150, 180, 210, 240, 270].map(y => (
                <line key={y} x1="185" y1={y} x2="335" y2={y} stroke="#c084fc" strokeWidth="1.5" opacity="0.6" />
              ))}

              {/* Annotations */}
              <text x="35" y="180" fill="#fb7185" className="text-[10px] font-bold">Blood Capillaries:</text>
              <text x="35" y="195" fill="#94a3b8" className="text-[9px]">Absorbs Glucose &</text>
              <text x="35" y="208" fill="#94a3b8" className="text-[9px]">Amino Acids into Blood</text>

              <text x="385" y="210" fill="#facc15" className="text-[10px] font-bold">Central Lacteal:</text>
              <text x="385" y="225" fill="#94a3b8" className="text-[9px]">Absorbs Fatty Acids &</text>
              <text x="385" y="238" fill="#94a3b8" className="text-[9px]">Glycerol into Lymph</text>

              {/* Hepatic Portal Vein Pathway */}
              <text x="260" y="315" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">→ Direct to Hepatic Portal Vein (To Liver)</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Water-soluble nutrients (glucose, amino acids, mineral salts) pass into blood capillaries; lipid derivatives (fatty acids, glycerol) enter the central lacteal.</span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 6. HUMAN KIDNEY NEPHRON STRUCTURE
    // ----------------------------------------------------
    case 'nephron-structure':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Micro-Architecture of the Human Nephron</span>
            </div>
            <span className="text-[10px] text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60 font-medium">
              Renal Functional Unit
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 540 330" className="w-full max-w-xl mx-auto min-w-[340px] text-xs font-sans">
              {/* Cortex / Medulla Boundary Line */}
              <line x1="20" y1="140" x2="520" y2="140" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" />
              <text x="30" y="130" fill="#94a3b8" className="text-[10px] font-bold">RENAL CORTEX</text>
              <text x="30" y="160" fill="#94a3b8" className="text-[10px] font-bold">RENAL MEDULLA</text>

              {/* Bowman's Capsule & Glomerulus */}
              {/* Afferent Arteriole (Wide) */}
              <line x1="50" y1="70" x2="95" y2="70" stroke="#f43f5e" strokeWidth="5" />
              <text x="50" y="55" fill="#f43f5e" className="text-[9px] font-bold">Afferent Art. (Wide)</text>

              {/* Glomerulus Knot */}
              <circle cx="110" cy="70" r="16" fill="#be123c" stroke="#f43f5e" strokeWidth="2" />
              <text x="110" y="74" fill="#ffffff" textAnchor="middle" className="text-[9px] font-bold">Glom.</text>

              {/* Efferent Arteriole (Narrow) */}
              <line x1="125" y1="70" x2="165" y2="70" stroke="#f43f5e" strokeWidth="2.5" />
              <text x="170" y="55" fill="#fb7185" className="text-[9px] font-bold">Efferent Art. (Narrow)</text>

              {/* Bowman's Capsule Cup */}
              <path d="M 90 45 C 70 70 70 85 90 100 L 135 100 C 150 85 150 70 135 45" fill="none" stroke="#f59e0b" strokeWidth="3" />
              <text x="110" y="115" fill="#f59e0b" textAnchor="middle" className="text-[9px] font-bold">Bowman's Capsule</text>

              {/* Proximal Convoluted Tubule (PCT) */}
              <path d="M 135 100 Q 170 120 190 90 T 230 110" fill="none" stroke="#eab308" strokeWidth="3.5" />
              <text x="210" y="80" fill="#fde047" textAnchor="middle" className="text-[10px] font-bold">PCT (100% Glucose Reabsorbed)</text>

              {/* Loop of Henle (Hairpin in Medulla) */}
              {/* Descending Limb (Water Permeable) */}
              <line x1="230" y1="110" x2="230" y2="280" stroke="#38bdf8" strokeWidth="3.5" />
              <text x="180" y="210" fill="#38bdf8" className="text-[9px] font-bold">Descending</text>
              <text x="180" y="222" fill="#94a3b8" className="text-[8px]">(H2O Out)</text>

              {/* Hairpin Turn */}
              <path d="M 230 280 Q 255 305 280 280" fill="none" stroke="#0ea5e9" strokeWidth="3.5" />

              {/* Ascending Limb (NaCl Active Pump) */}
              <line x1="280" y1="280" x2="280" y2="110" stroke="#10b981" strokeWidth="3.5" />
              <text x="290" y="210" fill="#34d399" className="text-[9px] font-bold">Ascending</text>
              <text x="290" y="222" fill="#94a3b8" className="text-[8px]">(Na+ Cl- Pump)</text>

              <text x="255" y="315" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">Loop of Henle (Hypertonic Medulla)</text>

              {/* Distal Convoluted Tubule (DCT) */}
              <path d="M 280 110 Q 320 85 360 110" fill="none" stroke="#a855f7" strokeWidth="3.5" />
              <text x="330" y="80" fill="#c084fc" textAnchor="middle" className="text-[10px] font-bold">DCT (Mineral & pH balance)</text>

              {/* Collecting Duct */}
              <rect x="420" y="40" width="30" height="270" fill="#1e293b" stroke="#64748b" strokeWidth="2" rx="4" />
              {/* Connect DCT to Collecting Duct */}
              <line x1="360" y1="110" x2="420" y2="110" stroke="#a855f7" strokeWidth="3.5" />

              <text x="435" y="160" fill="#f8fafc" textAnchor="middle" className="text-[10px] font-bold" transform="rotate(-90 435 160)">COLLECTING DUCT</text>
              <text x="460" y="90" fill="#38bdf8" className="text-[9px] font-semibold">ADH Action:</text>
              <text x="460" y="102" fill="#94a3b8" className="text-[8px]">H2O Reabsorption</text>

              <text x="435" y="325" fill="#facc15" textAnchor="middle" className="text-[10px] font-bold">→ Urine to Ureter</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Ultrafiltration occurs in the glomerulus under pressure; 100% of glucose is actively recovered in the proximal convoluted tubule; ADH controls water permeability in the collecting duct.</span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 7. RESPIRATORY ALVEOLAR SAC & GAS EXCHANGE
    // ----------------------------------------------------
    case 'bio-respiratory-alveoli':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Micro-Architecture of Alveolus & Pulmonary Capillary Gas Exchange</span>
            </div>
            <span className="text-[10px] text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60 font-medium">
              Respiratory Biology · Diffusion Gradients
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 580 300" className="w-full max-w-xl mx-auto min-w-[420px] text-xs font-sans">
              {/* Alveolar Cavity (Air space) */}
              <circle cx="210" cy="150" r="115" fill="#0f172a" stroke="#334155" strokeWidth="2" />
              <text x="210" y="100" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-bold">ALVEOLAR AIR SPACE</text>
              <text x="210" y="118" fill="#94a3b8" textAnchor="middle" className="text-[9px]">High pO₂ (104 mmHg) · Low pCO₂ (40 mmHg)</text>

              {/* Single cell thick alveolar epithelium */}
              <circle cx="210" cy="150" r="115" fill="none" stroke="#10b981" strokeWidth="5" strokeDasharray="6 2" />
              <text x="75" y="145" fill="#34d399" className="text-[9px] font-bold">Squamous</text>
              <text x="75" y="157" fill="#34d399" className="text-[9px] font-bold">Epithelium</text>
              <text x="75" y="169" fill="#94a3b8" className="text-[8px]">(1 cell thick)</text>

              {/* Surfactant fluid film lining inner alveolus */}
              <circle cx="210" cy="150" r="109" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.7" />

              {/* Surrounding Pulmonary Capillary */}
              <path d="M 330 20 C 360 80 360 220 330 280" fill="none" stroke="#64748b" strokeWidth="42" strokeLinecap="round" opacity="0.3" />
              {/* Deoxygenated Blood entering from Pulmonary Artery (Blue) */}
              <path d="M 330 20 C 350 70 350 110 345 130" fill="none" stroke="#0284c7" strokeWidth="26" />
              <text x="375" y="45" fill="#38bdf8" className="text-[10px] font-bold">From Pulmonary Artery</text>
              <text x="375" y="58" fill="#94a3b8" className="text-[9px]">Deoxygenated Blood (Low pO₂)</text>

              {/* Oxygenated Blood leaving to Pulmonary Vein (Red) */}
              <path d="M 345 170 C 350 190 350 230 330 280" fill="none" stroke="#be123c" strokeWidth="26" />
              <text x="375" y="255" fill="#fb7185" className="text-[10px] font-bold">To Pulmonary Vein</text>
              <text x="375" y="268" fill="#94a3b8" className="text-[9px]">Oxygenated Blood (High pO₂)</text>

              {/* Red Blood Cells (Erythrocytes) in capillary */}
              <circle cx="340" cy="50" r="7" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1" />
              <circle cx="350" cy="100" r="7" fill="#4338ca" stroke="#818cf8" strokeWidth="1" />
              <circle cx="350" cy="150" r="7" fill="#881337" stroke="#fb7185" strokeWidth="1" />
              <circle cx="350" cy="200" r="7" fill="#be123c" stroke="#f43f5e" strokeWidth="1" />
              <circle cx="340" cy="250" r="7" fill="#e11d48" stroke="#fda4af" strokeWidth="1" />

              {/* Diffusion Arrows: O2 into blood, CO2 into alveolus */}
              {/* O2 Arrow (Green/Red) */}
              <g transform="translate(250, 135)">
                <line x1="0" y1="0" x2="80" y2="0" stroke="#f43f5e" strokeWidth="3" />
                <polygon points="85,0 75,-4 75,4" fill="#f43f5e" />
                <text x="40" y="-8" fill="#f43f5e" textAnchor="middle" className="text-[10px] font-extrabold">O₂ Diffusion</text>
              </g>

              {/* CO2 Arrow (Blue) */}
              <g transform="translate(330, 165)">
                <line x1="0" y1="0" x2="-80" y2="0" stroke="#38bdf8" strokeWidth="3" />
                <polygon points="-85,0 -75,-4 -75,4" fill="#38bdf8" />
                <text x="-40" y="16" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-extrabold">CO₂ Diffusion</text>
              </g>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Four Structural Adaptations for Rapid Diffusion (Fick's Law):</strong> 1. Enormous surface area (millions of alveoli); 2. Extremely thin diffusion barrier (1-cell thick epithelium + 1-cell thick capillary wall); 3. Moist surfactant inner lining; 4. Dense capillary network maintaining steep concentration gradients.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 8. ECOLOGICAL ENERGY PYRAMID & 10% EFFICIENCY
    // ----------------------------------------------------
    case 'bio-ecological-pyramids':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Eye className="w-4 h-4 text-amber-400" />
              <span>Trophic Energy Pyramid & Lindeman's 10% Thermodynamic Efficiency</span>
            </div>
            <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60 font-medium">
              Ecology · Energy Dissipation
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 600 280" className="w-full max-w-xl mx-auto min-w-[440px] text-xs font-sans">
              {/* TIER 4: TERTIARY CONSUMERS (Apex: Eagle / Lion) */}
              <g transform="translate(230, 25)">
                <polygon points="70,0 0,50 140,50" fill="#dc2626" fillOpacity="0.8" stroke="#ef4444" strokeWidth="1.5" />
                <text x="70" y="38" fill="#ffffff" textAnchor="middle" className="text-[10px] font-bold">Tertiary Consumers</text>
                <text x="70" y="48" fill="#fecaca" textAnchor="middle" className="text-[8px]">10 kJ Energy (Apex Predators)</text>
              </g>

              {/* TIER 3: SECONDARY CONSUMERS (Carnivores: Snakes / Lizards) */}
              <g transform="translate(180, 75)">
                <polygon points="50,0 190,0 240,55 0,55" fill="#f59e0b" fillOpacity="0.8" stroke="#fbbf24" strokeWidth="1.5" />
                <text x="120" y="32" fill="#ffffff" textAnchor="middle" className="text-[11px] font-bold">Secondary Consumers (Carnivores)</text>
                <text x="120" y="46" fill="#fef3c7" textAnchor="middle" className="text-[9px]">100 kJ Energy Available</text>
              </g>

              {/* TIER 2: PRIMARY CONSUMERS (Herbivores: Grasshoppers / Cattle) */}
              <g transform="translate(130, 130)">
                <polygon points="50,0 290,0 340,55 0,55" fill="#0284c7" fillOpacity="0.8" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="170" y="32" fill="#ffffff" textAnchor="middle" className="text-[11px] font-bold">Primary Consumers (Herbivores)</text>
                <text x="170" y="46" fill="#e0f2fe" textAnchor="middle" className="text-[9px]">1,000 kJ Energy Available</text>
              </g>

              {/* TIER 1: PRIMARY PRODUCERS (Autotrophs: Green Grasses / Phytoplankton) */}
              <g transform="translate(70, 185)">
                <polygon points="60,0 400,0 460,60 0,60" fill="#059669" fillOpacity="0.8" stroke="#34d399" strokeWidth="1.5" />
                <text x="230" y="32" fill="#ffffff" textAnchor="middle" className="text-[12px] font-extrabold">Primary Producers (Photosynthetic Plants)</text>
                <text x="230" y="48" fill="#a7f3d0" textAnchor="middle" className="text-[10px]">10,000 kJ Energy (Traps ~1% of Solar Insolation)</text>
              </g>

              {/* 90% Heat Energy Dissipation Arrows (Right side) */}
              <g transform="translate(535, 30)">
                <path d="M 0 190 C 20 170 30 130 10 90 C -10 60 20 20 10 0" fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 2" />
                <text x="-40" y="110" fill="#f43f5e" className="text-[9px] font-bold">90% Energy Lost</text>
                <text x="-40" y="122" fill="#cbd5e1" className="text-[8px]">as Metabolic Heat &</text>
                <text x="-40" y="133" fill="#cbd5e1" className="text-[8px]">Respiration at each tier</text>
              </g>

              {/* 10% Transfer Badge */}
              <g transform="translate(10, 80)">
                <rect x="0" y="0" width="105" height="50" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" rx="6" />
                <text x="52" y="18" fill="#38bdf8" textAnchor="middle" className="text-[9px] font-bold">LINDEMAN'S LAW</text>
                <text x="52" y="32" fill="#10b981" textAnchor="middle" className="text-[12px] font-extrabold">~10%</text>
                <text x="52" y="44" fill="#94a3b8" textAnchor="middle" className="text-[8px]">Trophic Efficiency</text>
              </g>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Ecological Law:</strong> Unlike pyramids of numbers or biomass which can sometimes be inverted (e.g., millions of parasites feeding on one single tree), the <em>Pyramid of Energy can NEVER be inverted</em> because energy is dissipated irreversibly as heat according to the Second Law of Thermodynamics.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 9. THE REFLEX ARC NEURAL PATHWAY
    // ----------------------------------------------------
    case 'bio-reflex-arc-neural-pathway':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>The Reflex Arc: Spinal Reflex Neural Transmission Pathway</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 font-medium">
              WAEC Nervous System · Week 2
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 310" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              <rect x="10" y="10" width="600" height="290" fill="#0b1120" stroke="#1e293b" rx="10" />

              {/* Central Spinal Cord Cross-Section */}
              <g transform="translate(240, 25)">
                {/* White Matter Outline */}
                <ellipse cx="140" cy="130" rx="130" ry="90" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                <text x="140" y="25" fill="#94a3b8" textAnchor="middle" className="text-[10px] font-bold uppercase tracking-wider">Spinal Cord (White Matter)</text>

                {/* Butterfly Grey Matter */}
                <path
                  d="M 140 120 C 120 70, 70 80, 80 120 C 70 160, 110 180, 140 140 C 170 180, 210 160, 200 120 C 210 80, 160 70, 140 120 Z"
                  fill="#334155"
                  stroke="#64748b"
                  strokeWidth="1.5"
                />
                <text x="140" y="132" fill="#cbd5e1" textAnchor="middle" className="text-[9px] font-bold">Grey Matter</text>
                <circle cx="140" cy="130" r="3.5" fill="#0f172a" />
                <text x="140" y="148" fill="#64748b" textAnchor="middle" className="text-[8px]">Central Canal</text>

                {/* Relay Neuron / Interneuron inside Grey Matter */}
                <path d="M 105 110 Q 140 100, 175 145" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                <circle cx="105" cy="110" r="3" fill="#f59e0b" />
                <circle cx="175" cy="145" r="3" fill="#f59e0b" />
                <text x="140" y="95" fill="#fbbf24" textAnchor="middle" className="text-[9px] font-bold">Relay Neuron (Interneuron)</text>
              </g>

              {/* 1. Sensory Receptor in Skin */}
              <g transform="translate(30, 45)">
                <rect x="0" y="0" width="130" height="60" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" rx="8" />
                <text x="65" y="18" fill="#f43f5e" textAnchor="middle" className="text-[10px] font-bold uppercase">1. Pain Stimulus</text>
                <text x="65" y="34" fill="#f8fafc" textAnchor="middle" className="text-[11px] font-semibold">Skin Receptor</text>
                <text x="65" y="48" fill="#94a3b8" textAnchor="middle" className="text-[9px]">(Sharp pin / hot object)</text>
              </g>

              {/* 2. Sensory Neuron Pathway (Afferent) through Dorsal Root */}
              <path d="M 160 75 Q 230 75, 345 135" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
              {/* Dorsal Root Ganglion */}
              <circle cx="265" cy="88" r="8" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="265" y="75" fill="#38bdf8" textAnchor="middle" className="text-[9px] font-bold">Dorsal Ganglion</text>
              <text x="210" y="105" fill="#38bdf8" className="text-[10px] font-bold">2. Sensory Neuron</text>

              {/* 3. Motor Neuron Pathway (Efferent) through Ventral Root */}
              <path d="M 415 170 Q 300 240, 160 230" fill="none" stroke="#10b981" strokeWidth="2.5" />
              <text x="260" y="240" fill="#10b981" className="text-[10px] font-bold">3. Motor Neuron</text>

              {/* 4. Effector Organ (Biceps Muscle) */}
              <g transform="translate(30, 195)">
                <rect x="0" y="0" width="130" height="65" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" rx="8" />
                <text x="65" y="18" fill="#10b981" textAnchor="middle" className="text-[10px] font-bold uppercase">4. Effector</text>
                <text x="65" y="34" fill="#f8fafc" textAnchor="middle" className="text-[11px] font-semibold">Biceps Muscle</text>
                <text x="65" y="48" fill="#a7f3d0" textAnchor="middle" className="text-[9px] font-bold">Contracts (Withdraws)</text>
              </g>

              {/* Sequence Flow Banner */}
              <g transform="translate(30, 275)">
                <text x="280" y="12" fill="#94a3b8" textAnchor="middle" className="text-[10px]">
                  Flow: Stimulus → Receptor → Sensory Neuron (Dorsal Root) → Synapse/Relay → Motor Neuron (Ventral Root) → Effector
                </text>
              </g>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Biological Significance:</strong> A spinal reflex is automatic, involuntary, and instantaneous because nerve impulses bypass conscious brain processing, protecting tissues from physical injury.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 10. MENDELIAN GENETICS DIHYBRID PUNNETT SQUARE
    // ----------------------------------------------------
    case 'bio-genetics-punnett-square':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Eye className="w-4 h-4 text-amber-400" />
              <span>Mendelian Dihybrid Cross: 9:3:3:1 Phenotypic Ratio Punnett Square</span>
            </div>
            <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60 font-medium">
              WAEC Genetics · Weeks 7 &amp; 8
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 310" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              <rect x="10" y="10" width="600" height="290" fill="#0b1120" stroke="#1e293b" rx="10" />

              {/* Punnett Square Table: 4x4 Grid (Parent: RrYy × RrYy) */}
              <g transform="translate(60, 40)">
                <text x="140" y="-12" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-bold">Female Gametes: RY, Ry, rY, ry</text>

                {/* Column Headers (Female Gametes) */}
                <rect x="40" y="0" width="55" height="25" fill="#1e293b" stroke="#334155" />
                <text x="67" y="16" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-bold">RY</text>
                <rect x="95" y="0" width="55" height="25" fill="#1e293b" stroke="#334155" />
                <text x="122" y="16" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-bold">Ry</text>
                <rect x="150" y="0" width="55" height="25" fill="#1e293b" stroke="#334155" />
                <text x="177" y="16" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-bold">rY</text>
                <rect x="205" y="0" width="55" height="25" fill="#1e293b" stroke="#334155" />
                <text x="232" y="16" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-bold">ry</text>

                {/* Row 1 (RY) */}
                <rect x="0" y="25" width="40" height="45" fill="#1e293b" stroke="#334155" />
                <text x="20" y="52" fill="#f59e0b" textAnchor="middle" className="text-[11px] font-bold">RY</text>

                <rect x="40" y="25" width="55" height="45" fill="#065f46" stroke="#334155" />
                <text x="67" y="52" fill="#ecfdf5" textAnchor="middle" className="text-[10px] font-bold">RRYY</text>

                <rect x="95" y="25" width="55" height="45" fill="#065f46" stroke="#334155" />
                <text x="122" y="52" fill="#ecfdf5" textAnchor="middle" className="text-[10px] font-bold">RRYy</text>

                <rect x="150" y="25" width="55" height="45" fill="#065f46" stroke="#334155" />
                <text x="177" y="52" fill="#ecfdf5" textAnchor="middle" className="text-[10px] font-bold">RrYY</text>

                <rect x="205" y="25" width="55" height="45" fill="#065f46" stroke="#334155" />
                <text x="232" y="52" fill="#ecfdf5" textAnchor="middle" className="text-[10px] font-bold">RrYy</text>

                {/* Row 2 (Ry) */}
                <rect x="0" y="70" width="40" height="45" fill="#1e293b" stroke="#334155" />
                <text x="20" y="97" fill="#f59e0b" textAnchor="middle" className="text-[11px] font-bold">Ry</text>

                <rect x="40" y="70" width="55" height="45" fill="#065f46" stroke="#334155" />
                <text x="67" y="97" fill="#ecfdf5" textAnchor="middle" className="text-[10px] font-bold">RRYy</text>

                <rect x="95" y="70" width="55" height="45" fill="#075985" stroke="#334155" />
                <text x="122" y="97" fill="#f0f9ff" textAnchor="middle" className="text-[10px] font-bold">RRyy</text>

                <rect x="150" y="70" width="55" height="45" fill="#065f46" stroke="#334155" />
                <text x="177" y="97" fill="#ecfdf5" textAnchor="middle" className="text-[10px] font-bold">RrYy</text>

                <rect x="205" y="70" width="55" height="45" fill="#075985" stroke="#334155" />
                <text x="232" y="97" fill="#f0f9ff" textAnchor="middle" className="text-[10px] font-bold">Rryy</text>

                {/* Row 3 (rY) */}
                <rect x="0" y="115" width="40" height="45" fill="#1e293b" stroke="#334155" />
                <text x="20" y="142" fill="#f59e0b" textAnchor="middle" className="text-[11px] font-bold">rY</text>

                <rect x="40" y="115" width="55" height="45" fill="#065f46" stroke="#334155" />
                <text x="67" y="142" fill="#ecfdf5" textAnchor="middle" className="text-[10px] font-bold">RrYY</text>

                <rect x="95" y="115" width="55" height="45" fill="#065f46" stroke="#334155" />
                <text x="122" y="142" fill="#ecfdf5" textAnchor="middle" className="text-[10px] font-bold">RrYy</text>

                <rect x="150" y="115" width="55" height="45" fill="#854d0e" stroke="#334155" />
                <text x="177" y="142" fill="#fefce8" textAnchor="middle" className="text-[10px] font-bold">rrYY</text>

                <rect x="205" y="115" width="55" height="45" fill="#854d0e" stroke="#334155" />
                <text x="232" y="142" fill="#fefce8" textAnchor="middle" className="text-[10px] font-bold">rrYy</text>

                {/* Row 4 (ry) */}
                <rect x="0" y="160" width="40" height="45" fill="#1e293b" stroke="#334155" />
                <text x="20" y="187" fill="#f59e0b" textAnchor="middle" className="text-[11px] font-bold">ry</text>

                <rect x="40" y="160" width="55" height="45" fill="#065f46" stroke="#334155" />
                <text x="67" y="187" fill="#ecfdf5" textAnchor="middle" className="text-[10px] font-bold">RrYy</text>

                <rect x="95" y="160" width="55" height="45" fill="#075985" stroke="#334155" />
                <text x="122" y="187" fill="#f0f9ff" textAnchor="middle" className="text-[10px] font-bold">Rryy</text>

                <rect x="150" y="160" width="55" height="45" fill="#854d0e" stroke="#334155" />
                <text x="177" y="187" fill="#fefce8" textAnchor="middle" className="text-[10px] font-bold">rrYy</text>

                <rect x="205" y="160" width="55" height="45" fill="#9f1239" stroke="#334155" />
                <text x="232" y="187" fill="#fff1f2" textAnchor="middle" className="text-[10px] font-bold">rryy</text>
              </g>

              {/* Right Panel: Phenotypic Ratio Summary */}
              <g transform="translate(365, 30)">
                <rect x="0" y="0" width="230" height="240" fill="#1e293b" stroke="#334155" rx="8" />
                <text x="115" y="22" fill="#f59e0b" textAnchor="middle" className="text-[11px] font-bold uppercase tracking-wider">Mendelian F₂ Phenotypic Ratio</text>

                {/* Class 1: Round Yellow (9/16) */}
                <g transform="translate(15, 38)">
                  <rect x="0" y="0" width="16" height="16" fill="#065f46" rx="3" />
                  <text x="26" y="12" fill="#ecfdf5" className="text-[10px] font-bold">Round Yellow (R_Y_): 9/16</text>
                  <text x="26" y="26" fill="#94a3b8" className="text-[9px]">Dominant for both traits</text>
                </g>

                {/* Class 2: Round Green (3/16) */}
                <g transform="translate(15, 82)">
                  <rect x="0" y="0" width="16" height="16" fill="#075985" rx="3" />
                  <text x="26" y="12" fill="#f0f9ff" className="text-[10px] font-bold">Round Green (R_yy): 3/16</text>
                  <text x="26" y="26" fill="#94a3b8" className="text-[9px]">Recombinant phenotype 1</text>
                </g>

                {/* Class 3: Wrinkled Yellow (3/16) */}
                <g transform="translate(15, 126)">
                  <rect x="0" y="0" width="16" height="16" fill="#854d0e" rx="3" />
                  <text x="26" y="12" fill="#fefce8" className="text-[10px] font-bold">Wrinkled Yellow (rrY_): 3/16</text>
                  <text x="26" y="26" fill="#94a3b8" className="text-[9px]">Recombinant phenotype 2</text>
                </g>

                {/* Class 4: Wrinkled Green (1/16) */}
                <g transform="translate(15, 170)">
                  <rect x="0" y="0" width="16" height="16" fill="#9f1239" rx="3" />
                  <text x="26" y="12" fill="#fff1f2" className="text-[10px] font-bold">Wrinkled Green (rryy): 1/16</text>
                  <text x="26" y="26" fill="#94a3b8" className="text-[9px]">Double recessive parent type</text>
                </g>

                {/* Total Ratio Badge */}
                <rect x="15" y="200" width="200" height="26" fill="#0f172a" rx="4" />
                <text x="115" y="217" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-extrabold tracking-wider">RATIO = 9 : 3 : 3 : 1</text>
              </g>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Mendel&apos;s Second Law:</strong> The Law of Independent Assortment states that alleles of two or more different genes sort into gametes independently of one another, generating the classic 9:3:3:1 ratio.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 11. MAMMALIAN EYE OPTICS & VISION DEFECTS
    // ----------------------------------------------------
    case 'bio-human-eye-optics':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Eye className="w-4 h-4 text-sky-400" />
              <span>Sense Organs: Mammalian Eye Optics, Myopia &amp; Corrective Lenses</span>
            </div>
            <span className="text-[10px] text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60 font-medium">
              WAEC Sense Organs · Week 3
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 300" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              <rect x="10" y="10" width="600" height="280" fill="#0b1120" stroke="#1e293b" rx="10" />

              {/* Panel 1: Normal Eye (Emmetropia) */}
              <g transform="translate(25, 25)">
                <rect x="0" y="0" width="270" height="120" fill="#1e293b" stroke="#334155" rx="8" />
                <text x="135" y="18" fill="#10b981" textAnchor="middle" className="text-[10px] font-bold uppercase">1. Normal Vision (Sharp Focus on Retina)</text>

                {/* Eyeball profile */}
                <ellipse cx="140" cy="65" rx="60" ry="40" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
                {/* Cornea bulge */}
                <path d="M 80 50 Q 70 65, 80 80" fill="none" stroke="#38bdf8" strokeWidth="2" />
                {/* Biconvex Lens */}
                <ellipse cx="95" cy="65" rx="4" ry="16" fill="#38bdf8" />
                {/* Retina layer at back */}
                <path d="M 180 40 Q 205 65, 180 90" fill="none" stroke="#f59e0b" strokeWidth="3" />

                {/* Light rays focusing exactly on Retina */}
                <line x1="20" y1="55" x2="95" y2="55" stroke="#fef08a" strokeWidth="1.2" />
                <line x1="20" y1="75" x2="95" y2="75" stroke="#fef08a" strokeWidth="1.2" />
                <line x1="95" y1="55" x2="198" y2="65" stroke="#fef08a" strokeWidth="1.2" />
                <line x1="95" y1="75" x2="198" y2="65" stroke="#fef08a" strokeWidth="1.2" />
                <circle cx="198" cy="65" r="3.5" fill="#10b981" />
                <text x="135" y="112" fill="#94a3b8" textAnchor="middle" className="text-[9px]">Focal Point falls directly on Yellow Spot (Fovea)</text>
              </g>

              {/* Panel 2: Short-Sightedness (Myopia) */}
              <g transform="translate(325, 25)">
                <rect x="0" y="0" width="270" height="120" fill="#1e293b" stroke="#334155" rx="8" />
                <text x="135" y="18" fill="#f43f5e" textAnchor="middle" className="text-[10px] font-bold uppercase">2. Myopia (Focus in Front of Retina)</text>

                {/* Elongated eyeball */}
                <ellipse cx="145" cy="65" rx="68" ry="40" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
                <path d="M 80 50 Q 70 65, 80 80" fill="none" stroke="#38bdf8" strokeWidth="2" />
                <ellipse cx="95" cy="65" rx="4" ry="16" fill="#38bdf8" />
                <path d="M 190 40 Q 215 65, 190 90" fill="none" stroke="#f59e0b" strokeWidth="3" />

                {/* Premature focus before retina */}
                <line x1="20" y1="55" x2="95" y2="55" stroke="#fef08a" strokeWidth="1.2" />
                <line x1="20" y1="75" x2="95" y2="75" stroke="#fef08a" strokeWidth="1.2" />
                <line x1="95" y1="55" x2="170" y2="65" stroke="#fef08a" strokeWidth="1.2" />
                <line x1="95" y1="75" x2="170" y2="65" stroke="#fef08a" strokeWidth="1.2" />
                <circle cx="170" cy="65" r="3.5" fill="#f43f5e" />
                <text x="135" y="112" fill="#fca5a5" textAnchor="middle" className="text-[9px]">Eyeball too long / lens too curved → Blurred distant vision</text>
              </g>

              {/* Panel 3: Corrected Myopia with Concave (Diverging) Lens */}
              <g transform="translate(170, 160)">
                <rect x="0" y="0" width="300" height="120" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" rx="8" />
                <text x="150" y="18" fill="#a7f3d0" textAnchor="middle" className="text-[10px] font-bold uppercase">3. Corrected Myopia: Concave Lens</text>

                {/* Eyeball profile */}
                <ellipse cx="170" cy="65" rx="68" ry="40" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
                {/* Concave spectacles lens */}
                <path d="M 40 45 C 45 65, 45 65, 40 85 L 48 85 C 43 65, 43 65, 48 45 Z" fill="#38bdf8" />
                <text x="44" y="38" fill="#38bdf8" textAnchor="middle" className="text-[8px] font-bold">Concave</text>

                <ellipse cx="120" cy="65" rx="4" ry="16" fill="#38bdf8" />
                <path d="M 215 40 Q 240 65, 215 90" fill="none" stroke="#f59e0b" strokeWidth="3" />

                {/* Diverged and refocused rays */}
                <line x1="10" y1="58" x2="40" y2="58" stroke="#fef08a" strokeWidth="1.2" />
                <line x1="10" y1="72" x2="40" y2="72" stroke="#fef08a" strokeWidth="1.2" />
                <line x1="48" y1="56" x2="120" y2="52" stroke="#fef08a" strokeWidth="1.2" />
                <line x1="48" y1="74" x2="120" y2="78" stroke="#fef08a" strokeWidth="1.2" />
                <line x1="120" y1="52" x2="235" y2="65" stroke="#fef08a" strokeWidth="1.2" />
                <line x1="120" y1="78" x2="235" y2="65" stroke="#fef08a" strokeWidth="1.2" />
                <circle cx="235" cy="65" r="3.5" fill="#10b981" />
                <text x="150" y="112" fill="#a7f3d0" textAnchor="middle" className="text-[9px]">Diverging lens extends focal length back to Retina surface</text>
              </g>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
            <span>
              <strong>Optical Physics of Vision:</strong> Myopia (short-sightedness) is corrected with a <em>concave (diverging) lens</em>, while Hypermetropia (long-sightedness) is corrected with a <em>convex (converging) lens</em>.
            </span>
          </div>
        </div>
      );

    default:
      return null;
  }
};

