import React from 'react';
import { Eye, Info } from 'lucide-react';

export type DiagramType =
  | 'ecdysis-graph'
  | 'leaf-anatomy'
  | 'tooth-structure'
  | 'heart-anatomy'
  | 'villus-structure'
  | 'nephron-structure';

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

    default:
      return null;
  }
};
