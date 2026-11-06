import React from 'react';
import { Layers, Sprout, Tractor, Compass, Droplet, Info } from 'lucide-react';

export type AgricDiagramType =
  | 'soil-profile-horizons'
  | 'nitrogen-cycle-diagram'
  | 'disc-plough-anatomy'
  | 'farm-surveying-instruments'
  | 'drip-irrigation-system';

interface AgricDiagramProps {
  type: AgricDiagramType;
}

export const AgricDiagram: React.FC<AgricDiagramProps> = ({ type }) => {
  switch (type) {
    // ----------------------------------------------------
    // 1. SOIL PROFILE & HORIZON ANATOMY
    // ----------------------------------------------------
    case 'soil-profile-horizons':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>Soil Profile: Vertical Cross-Section of Soil Horizons</span>
            </div>
            <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60 font-medium">
              Soil Science · Pedology & Horizons
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 350" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* Profile Column */}
              <g transform="translate(60, 20)">
                {/* Surface Vegetation */}
                <rect x="0" y="0" width="220" height="15" fill="#15803d" rx="2" />
                <path d="M 20 0 Q 30 -15 40 0 M 60 0 Q 75 -20 90 0 M 120 0 Q 130 -15 140 0 M 170 0 Q 185 -18 200 0" stroke="#4ade80" strokeWidth="2.5" fill="none" />

                {/* O-Horizon (Organic / Leaf Litter) */}
                <rect x="0" y="15" width="220" height="30" fill="#292524" stroke="#44403c" strokeWidth="1" />
                {/* Decomposing leaves texture */}
                <circle cx="40" cy="30" r="3" fill="#a16207" />
                <circle cx="90" cy="25" r="4" fill="#78350f" />
                <circle cx="150" cy="32" r="3" fill="#a16207" />

                {/* A-Horizon (Topsoil - Rich in Humus & Roots) */}
                <rect x="0" y="45" width="220" height="65" fill="#451a03" stroke="#78350f" strokeWidth="1" />
                {/* Plant Roots extending down */}
                <path d="M 30 15 Q 40 50 25 80" stroke="#fde047" strokeWidth="2" fill="none" />
                <path d="M 75 15 Q 70 60 90 95" stroke="#fde047" strokeWidth="2.5" fill="none" />
                <path d="M 130 15 Q 120 50 145 90" stroke="#fde047" strokeWidth="2" fill="none" />
                <path d="M 185 15 Q 195 60 170 100" stroke="#fde047" strokeWidth="2" fill="none" />

                {/* B-Horizon (Subsoil - Zone of Illuviation / Clay & Minerals) */}
                <rect x="0" y="110" width="220" height="85" fill="#7c2d12" stroke="#9a3412" strokeWidth="1" />
                {/* Mineral accumulation spots */}
                <circle cx="45" cy="140" r="6" fill="#c2410c" />
                <circle cx="110" cy="160" r="8" fill="#ea580c" />
                <circle cx="170" cy="135" r="5" fill="#c2410c" />
                <circle cx="80" cy="175" r="7" fill="#9a3412" />

                {/* C-Horizon (Weathered Parent Material / Regolith) */}
                <rect x="0" y="195" width="220" height="70" fill="#57534e" stroke="#78716c" strokeWidth="1" />
                {/* Broken rock chunks */}
                <polygon points="30,215 50,205 60,225 40,235" fill="#a8a29e" />
                <polygon points="90,230 120,215 130,240 100,250" fill="#78716c" />
                <polygon points="160,220 185,210 195,235 170,245" fill="#a8a29e" />

                {/* R-Horizon (Bedrock / Solid Rock) */}
                <rect x="0" y="265" width="220" height="55" fill="#292524" stroke="#1c1917" strokeWidth="1" />
                {/* Solid rock fissure lines */}
                <line x1="10" y1="285" x2="80" y2="295" stroke="#44403c" strokeWidth="2" />
                <line x1="90" y1="280" x2="160" y2="275" stroke="#44403c" strokeWidth="2" />
                <line x1="150" y1="300" x2="210" y2="295" stroke="#44403c" strokeWidth="2" />
              </g>

              {/* Labels & Annotations on Right */}
              {/* O Horizon Label */}
              <line x1="290" y1="45" x2="330" y2="45" stroke="#facc15" strokeWidth="1.5" />
              <text x="340" y="42" fill="#facc15" className="text-[11px] font-bold">O-HORIZON (Organic Layer)</text>
              <text x="340" y="55" fill="#94a3b8" className="text-[9px]">Fresh leaf litter & decomposing dark humus.</text>

              {/* A Horizon Label */}
              <line x1="290" y1="95" x2="330" y2="95" stroke="#4ade80" strokeWidth="1.5" />
              <text x="340" y="92" fill="#4ade80" className="text-[11px] font-bold">A-HORIZON (Topsoil - Zone of Eluviation)</text>
              <text x="340" y="105" fill="#cbd5e1" className="text-[9px]">Dark brown, maximum root activity & microbial life.</text>
              <text x="340" y="117" fill="#4ade80" className="text-[9px] font-semibold">Highest agricultural fertility & nutrient capacity.</text>

              {/* B Horizon Label */}
              <line x1="290" y1="170" x2="330" y2="170" stroke="#f97316" strokeWidth="1.5" />
              <text x="340" y="167" fill="#f97316" className="text-[11px] font-bold">B-HORIZON (Subsoil - Zone of Illuviation)</text>
              <text x="340" y="180" fill="#94a3b8" className="text-[9px]">Lighter color (reddish/yellow clay & iron oxides).</text>
              <text x="340" y="192" fill="#94a3b8" className="text-[9px]">Leached minerals accumulate; poor aeration.</text>

              {/* C Horizon Label */}
              <line x1="290" y1="245" x2="330" y2="245" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="340" y="242" fill="#38bdf8" className="text-[11px] font-bold">C-HORIZON (Weathered Parent Material)</text>
              <text x="340" y="255" fill="#94a3b8" className="text-[9px]">Partially broken rock fragments; zero organic matter.</text>

              {/* R Horizon Label */}
              <line x1="290" y1="305" x2="330" y2="305" stroke="#cbd5e1" strokeWidth="1.5" />
              <text x="340" y="302" fill="#cbd5e1" className="text-[11px] font-bold">R-HORIZON (Bedrock / Unweathered Stone)</text>
              <text x="340" y="315" fill="#94a3b8" className="text-[9px]">Solid unyielding parent rock beneath all layers.</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>WAEC Practical Fact:</strong> The <em>A-Horizon (topsoil)</em> contains over 80% of crop roots, soil micro-organisms, and humic matter. Soil erosion is catastrophic because it selectively strips away this thin A-horizon layer.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 2. THE NITROGEN CYCLE
    // ----------------------------------------------------
    case 'nitrogen-cycle-diagram':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Sprout className="w-4 h-4 text-emerald-400" />
              <span>The Biological Nitrogen Cycle & Soil Fertility</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 font-medium">
              Nutrient Cycles · Rhizobium & Nitrification
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 340" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* Atmospheric Nitrogen Pool at Top */}
              <rect x="200" y="15" width="220" height="36" rx="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="310" y="38" fill="#38bdf8" textAnchor="middle" className="text-[12px] font-bold">
                ATMOSPHERIC NITROGEN (N₂ ≈ 78%)
              </text>

              {/* Plant & Animal Biological Node */}
              <rect x="40" y="100" width="160" height="55" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <text x="120" y="122" fill="#34d399" textAnchor="middle" className="text-[11px] font-bold">Plant & Animal Proteins</text>
              <text x="120" y="140" fill="#a7f3d0" textAnchor="middle" className="text-[9px]">Legumes, Grasses & Livestock</text>

              {/* Nitrogen Fixation (Rhizobium & Lightning) */}
              <path d="M 230 51 L 120 100" stroke="#facc15" strokeWidth="2.5" fill="none" />
              <polygon points="120,100 126,92 131,97" fill="#facc15" />
              <text x="135" y="70" fill="#facc15" className="text-[9px] font-bold">Biological N-Fixation</text>
              <text x="135" y="82" fill="#94a3b8" className="text-[8px]">(Rhizobium in root nodules)</text>

              {/* Death & Excretion */}
              <path d="M 120 155 L 120 220" stroke="#f43f5e" strokeWidth="2" fill="none" />
              <polygon points="120,220 115,212 125,212" fill="#f43f5e" />
              <text x="130" y="185" fill="#fb7185" className="text-[9px] font-bold">Death & Excretion</text>
              <text x="130" y="197" fill="#94a3b8" className="text-[8px]">(Decomposers / Fungi)</text>

              {/* Ammonium Node (NH4+) */}
              <rect x="40" y="220" width="160" height="50" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="120" y="242" fill="#fbbf24" textAnchor="middle" className="text-[11px] font-bold">Ammonium Ions (NH₄⁺)</text>
              <text x="120" y="258" fill="#94a3b8" textAnchor="middle" className="text-[9px]">Ammonification</text>

              {/* Nitrification Step 1: Nitrosomonas to Nitrite (NO2-) */}
              <path d="M 200 245 L 280 245" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
              <polygon points="280,245 272,240 272,250" fill="#38bdf8" />
              <text x="240" y="235" fill="#38bdf8" textAnchor="middle" className="text-[9px] font-bold">Nitrosomonas</text>

              {/* Nitrite Node (NO2-) */}
              <rect x="280" y="220" width="110" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="335" y="242" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-bold">Nitrites (NO₂⁻)</text>
              <text x="335" y="258" fill="#94a3b8" textAnchor="middle" className="text-[8px]">Toxic intermediate</text>

              {/* Nitrification Step 2: Nitrobacter to Nitrate (NO3-) */}
              <path d="M 390 245 L 460 245" stroke="#10b981" strokeWidth="2.5" fill="none" />
              <polygon points="460,245 452,240 452,250" fill="#10b981" />
              <text x="425" y="235" fill="#34d399" textAnchor="middle" className="text-[9px] font-bold">Nitrobacter</text>

              {/* Nitrate Node (NO3- - Absorbed by crops) */}
              <rect x="460" y="220" width="130" height="50" rx="8" fill="#047857" stroke="#10b981" strokeWidth="2" />
              <text x="525" y="242" fill="#ffffff" textAnchor="middle" className="text-[11px] font-bold">Nitrates (NO₃⁻)</text>
              <text x="525" y="258" fill="#a7f3d0" textAnchor="middle" className="text-[8px]">Readily absorbed by plant roots</text>

              {/* Plant Assimilation Arrow: Nitrates back to Plants */}
              <path d="M 525 220 Q 525 125 200 125" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" fill="none" />
              <polygon points="200,125 208,120 208,130" fill="#10b981" />
              <text x="350" y="115" fill="#34d399" textAnchor="middle" className="text-[9px] font-bold">Plant Root Assimilation</text>

              {/* Denitrification Arrow: Nitrates back to Atmosphere (N2) */}
              <path d="M 540 220 Q 560 50 420 35" stroke="#f43f5e" strokeWidth="2" fill="none" />
              <polygon points="420,35 428,30 428,40" fill="#f43f5e" />
              <text x="520" y="80" fill="#fb7185" className="text-[9px] font-bold">Denitrification</text>
              <text x="520" y="92" fill="#94a3b8" className="text-[8px]">(Pseudomonas in waterlogged soils)</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Crucial Bacterial Roles:</strong> <em>Nitrosomonas</em> converts toxic ammonium into nitrite ($NO_2^-$); <em>Nitrobacter</em> oxidizes nitrite into usable plant nitrate ($NO_3^-$); <em>Pseudomonas</em> denitrifies nitrates in waterlogged soils, releasing nitrogen gas back to the air.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 3. TRACTOR DISC PLOUGH ANATOMY
    // ----------------------------------------------------
    case 'disc-plough-anatomy':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Tractor className="w-4 h-4 text-cyan-400" />
              <span>Primary Tillage: Tractor Disc Plough Anatomy & Parts</span>
            </div>
            <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60 font-medium">
              Farm Mechanization · Primary Inversion Tillage
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 340" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* Main Structural Frame Beam */}
              <line x1="80" y1="90" x2="520" y2="130" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" />
              <text x="300" y="85" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-bold">MAIN BEAM (Heavy Steel Chassis)</text>

              {/* 3-Point Linkage Hitch (Connection to Tractor) */}
              <polygon points="80,90 40,140 100,140" fill="#334155" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="60" cy="110" r="4" fill="#facc15" />
              <text x="35" y="160" fill="#facc15" className="text-[10px] font-bold">3-Point Hitch</text>
              <text x="35" y="172" fill="#94a3b8" className="text-[8px]">(Couples to tractor hydraulics)</text>

              {/* Vertical Standards (Shanks) connecting Beam to Discs */}
              <line x1="200" y1="102" x2="190" y2="190" stroke="#64748b" strokeWidth="8" />
              <line x1="330" y1="114" x2="320" y2="202" stroke="#64748b" strokeWidth="8" />
              <line x1="450" y1="125" x2="440" y2="215" stroke="#64748b" strokeWidth="8" />

              {/* Disc 1 (Front Disc) */}
              <ellipse cx="185" cy="225" rx="22" ry="48" fill="#1e293b" stroke="#cbd5e1" strokeWidth="3" transform="rotate(-15 185 225)" />
              {/* Disc Scraper 1 */}
              <path d="M 165 190 Q 185 200 175 220" stroke="#facc15" strokeWidth="3" fill="none" />

              {/* Disc 2 (Middle Disc) */}
              <ellipse cx="315" cy="237" rx="22" ry="48" fill="#1e293b" stroke="#cbd5e1" strokeWidth="3" transform="rotate(-15 315 237)" />
              {/* Disc Scraper 2 */}
              <path d="M 295 202 Q 315 212 305 232" stroke="#facc15" strokeWidth="3" fill="none" />

              {/* Disc 3 (Rear Disc) */}
              <ellipse cx="435" cy="250" rx="22" ry="48" fill="#1e293b" stroke="#cbd5e1" strokeWidth="3" transform="rotate(-15 435 250)" />
              {/* Disc Scraper 3 */}
              <path d="M 415 215 Q 435 225 425 245" stroke="#facc15" strokeWidth="3" fill="none" />

              {/* Rear Furrow Wheel (Prevents side-drift) */}
              <circle cx="530" cy="255" r="28" fill="#0f172a" stroke="#f97316" strokeWidth="3" />
              <circle cx="530" cy="255" r="6" fill="#f97316" />
              <line x1="510" y1="130" x2="530" y2="255" stroke="#64748b" strokeWidth="6" />
              <text x="540" y="215" fill="#f97316" className="text-[10px] font-bold">Rear Furrow Wheel</text>
              <text x="540" y="227" fill="#94a3b8" className="text-[8px]">Resists lateral soil thrust</text>

              {/* Soil Line & Furrow Inversion Action */}
              <line x1="20" y1="280" x2="600" y2="280" stroke="#78350f" strokeWidth="2" strokeDasharray="6 3" />
              <text x="30" y="300" fill="#a16207" className="text-[10px] font-bold">Soil Furrow Slice</text>

              {/* Labeled Callouts */}
              <text x="210" y="295" fill="#cbd5e1" textAnchor="middle" className="text-[9px] font-bold">Concave Steel Discs (Cut, lift & invert)</text>
              <text x="325" y="170" fill="#facc15" textAnchor="middle" className="text-[9px] font-bold">Disc Scraper (Removes sticky wet soil)</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>Disc Plough vs Mouldboard Plough:</strong> The <em>disc plough</em> rolls over hidden roots, rocks, and hardpan obstacles without breaking, making it ideal for tropical Nigerian savanna soils. The <em>disc scraper</em> keeps the concave face free from clinging mud.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 4. FARM SURVEYING INSTRUMENTS
    // ----------------------------------------------------
    case 'farm-surveying-instruments':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Compass className="w-4 h-4 text-purple-400" />
              <span>Standard Farm Surveying & Mapping Instruments</span>
            </div>
            <span className="text-[10px] text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/60 font-medium">
              Land Measurement · Gunter's Chain & Ranging Poles
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 330" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* Divider lines between instruments */}
              <line x1="160" y1="20" x2="160" y2="300" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="380" y1="20" x2="380" y2="300" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

              {/* INSTRUMENT 1: RANGING POLE */}
              <text x="80" y="30" fill="#f43f5e" textAnchor="middle" className="text-[11px] font-bold">1. RANGING POLE</text>
              <g transform="translate(80, 50)">
                {/* 2-meter wooden/steel pole with red and white 20cm bands */}
                <rect x="-5" y="0" width="10" height="40" fill="#f43f5e" />
                <rect x="-5" y="40" width="10" height="40" fill="#ffffff" />
                <rect x="-5" y="80" width="10" height="40" fill="#f43f5e" />
                <rect x="-5" y="120" width="10" height="40" fill="#ffffff" />
                <rect x="-5" y="160" width="10" height="40" fill="#f43f5e" />
                {/* Metal shoe pointed base */}
                <polygon points="-5,200 5,200 0,225" fill="#475569" />
              </g>
              <text x="80" y="290" fill="#cbd5e1" textAnchor="middle" className="text-[9px]">Length: 2m (or 3m)</text>
              <text x="80" y="302" fill="#94a3b8" textAnchor="middle" className="text-[8px]">Marks stations & alignments</text>

              {/* INSTRUMENT 2: GUNTER'S SURVEY CHAIN & ARROWS */}
              <text x="270" y="30" fill="#facc15" textAnchor="middle" className="text-[11px] font-bold">2. GUNTER'S CHAIN (66 FT)</text>
              <g transform="translate(200, 70)">
                {/* Brass handle */}
                <path d="M 0 10 C -15 10 -15 30 0 30 Z" fill="none" stroke="#facc15" strokeWidth="3" />
                <line x1="0" y1="20" x2="25" y2="20" stroke="#facc15" strokeWidth="2.5" />
                {/* Interlinked steel rings & links */}
                <circle cx="30" cy="20" r="4" fill="none" stroke="#94a3b8" strokeWidth="2" />
                <line x1="34" y1="20" x2="65" y2="20" stroke="#facc15" strokeWidth="2" />
                <circle cx="70" cy="20" r="4" fill="none" stroke="#94a3b8" strokeWidth="2" />
                <line x1="74" y1="20" x2="105" y2="20" stroke="#facc15" strokeWidth="2" />
                <circle cx="110" cy="20" r="4" fill="none" stroke="#94a3b8" strokeWidth="2" />
                <line x1="114" y1="20" x2="140" y2="20" stroke="#facc15" strokeWidth="2" />
                {/* Brass tally tag at 10 links */}
                <polygon points="70,24 65,38 75,38" fill="#facc15" />
              </g>

              {/* Survey Arrows / Pins */}
              <g transform="translate(250, 140)">
                <circle cx="0" cy="0" r="8" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
                <line x1="0" y1="8" x2="0" y2="65" stroke="#f43f5e" strokeWidth="2.5" />
                <text x="15" y="35" fill="#f43f5e" className="text-[9px] font-bold">Survey Arrow / Pin</text>
                <text x="15" y="47" fill="#94a3b8" className="text-[8px]">Marks chain completions</text>
              </g>

              <text x="270" y="275" fill="#facc15" textAnchor="middle" className="text-[9px] font-bold">100 Links = 66 Feet = 20.12 Meters</text>
              <text x="270" y="290" fill="#cbd5e1" textAnchor="middle" className="text-[9px]">1 Link = 7.92 inches (0.66 ft)</text>
              <text x="270" y="302" fill="#94a3b8" textAnchor="middle" className="text-[8px]">10 Square Chains = 1 Acre</text>

              {/* INSTRUMENT 3: PRISMATIC COMPASS */}
              <text x="500" y="30" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-bold">3. PRISMATIC COMPASS</text>
              <g transform="translate(500, 120)">
                <circle cx="0" cy="0" r="45" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <circle cx="0" cy="0" r="38" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
                {/* Compass Needle (N-S) */}
                <polygon points="0,-32 6,0 -6,0" fill="#f43f5e" />
                <polygon points="0,32 6,0 -6,0" fill="#94a3b8" />
                <text x="0" y="-36" fill="#f43f5e" textAnchor="middle" className="text-[10px] font-bold">N</text>
                <text x="0" y="44" fill="#94a3b8" textAnchor="middle" className="text-[10px] font-bold">S</text>
                <text x="40" y="3" fill="#cbd5e1" className="text-[9px] font-bold">E</text>
                <text x="-48" y="3" fill="#cbd5e1" className="text-[9px] font-bold">W</text>
                {/* Sighting Vane and Prism Eye-piece */}
                <rect x="-4" y="-60" width="8" height="15" fill="#94a3b8" />
                <rect x="-5" y="45" width="10" height="12" fill="#94a3b8" />
              </g>
              <text x="500" y="275" fill="#38bdf8" textAnchor="middle" className="text-[9px] font-bold">Measures Magnetic Bearings (0° - 360°)</text>
              <text x="500" y="290" fill="#cbd5e1" textAnchor="middle" className="text-[9px]">Finds direction of boundaries</text>
              <text x="500" y="302" fill="#94a3b8" textAnchor="middle" className="text-[8px]">Unchecked by local metal deposits</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-purple-400 shrink-0" />
            <span>
              <strong>Crucial Surveying Fact:</strong> Gunter’s chain consists of exactly 100 links made of galvanized steel. Ten complete arrows returned to the surveyor marks 10 chains of linear distance.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 5. DRIP IRRIGATION SYSTEM
    // ----------------------------------------------------
    case 'drip-irrigation-system':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Droplet className="w-4 h-4 text-cyan-400" />
              <span>Drip (Trickle) Irrigation Network & Emitter Architecture</span>
            </div>
            <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60 font-medium">
              Agricultural Engineering · 90-95% Water Efficiency
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 340" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* Overhead Water Tank & Pump Unit */}
              <rect x="40" y="40" width="70" height="80" rx="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
              <text x="75" y="75" fill="#ffffff" textAnchor="middle" className="text-[10px] font-bold">WATER TANK</text>
              <text x="75" y="90" fill="#e0f2fe" textAnchor="middle" className="text-[8px]">& Fertilizer Venturi</text>

              {/* Sand Filter Unit */}
              <circle cx="75" cy="165" r="18" fill="#1e293b" stroke="#facc15" strokeWidth="1.5" />
              <text x="75" y="168" fill="#facc15" textAnchor="middle" className="text-[8px] font-bold">FILTER</text>
              <line x1="75" y1="120" x2="75" y2="147" stroke="#38bdf8" strokeWidth="4" />
              <line x1="75" y1="183" x2="75" y2="210" stroke="#38bdf8" strokeWidth="4" />

              {/* Main Distribution Pipe */}
              <line x1="75" y1="210" x2="560" y2="210" stroke="#0ea5e9" strokeWidth="6" strokeLinecap="round" />
              <text x="320" y="200" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">MAIN PVC DISTRIBUTION PIPE</text>

              {/* Lateral Sub-Pipes with Drip Emitters along Crop Rows */}
              {/* Lateral 1 */}
              <line x1="180" y1="210" x2="180" y2="90" stroke="#0284c7" strokeWidth="3" />
              {/* Lateral 2 */}
              <line x1="330" y1="210" x2="330" y2="90" stroke="#0284c7" strokeWidth="3" />
              {/* Lateral 3 */}
              <line x1="480" y1="210" x2="480" y2="90" stroke="#0284c7" strokeWidth="3" />

              {/* Crop Rows & Emitters on Lateral 1 */}
              {[110, 160].map(y => (
                <g key={y} transform={`translate(180, ${y})`}>
                  {/* Drip Emitter Nozzle */}
                  <circle cx="0" cy="0" r="4" fill="#facc15" />
                  {/* Water Droplet */}
                  <circle cx="10" cy="0" r="3" fill="#38bdf8" />
                  {/* Crop Plant */}
                  <path d="M 25 15 Q 25 -10 35 -15 M 25 15 Q 15 -10 15 -15" stroke="#4ade80" strokeWidth="2" fill="none" />
                  <ellipse cx="25" cy="18" rx="8" ry="3" fill="#78350f" />
                </g>
              ))}

              {/* Crop Rows & Emitters on Lateral 2 */}
              {[110, 160].map(y => (
                <g key={y} transform={`translate(330, ${y})`}>
                  <circle cx="0" cy="0" r="4" fill="#facc15" />
                  <circle cx="10" cy="0" r="3" fill="#38bdf8" />
                  <path d="M 25 15 Q 25 -10 35 -15 M 25 15 Q 15 -10 15 -15" stroke="#4ade80" strokeWidth="2" fill="none" />
                  <ellipse cx="25" cy="18" rx="8" ry="3" fill="#78350f" />
                </g>
              ))}

              {/* Crop Rows & Emitters on Lateral 3 */}
              {[110, 160].map(y => (
                <g key={y} transform={`translate(480, ${y})`}>
                  <circle cx="0" cy="0" r="4" fill="#facc15" />
                  <circle cx="10" cy="0" r="3" fill="#38bdf8" />
                  <path d="M 25 15 Q 25 -10 35 -15 M 25 15 Q 15 -10 15 -15" stroke="#4ade80" strokeWidth="2" fill="none" />
                  <ellipse cx="25" cy="18" rx="8" ry="3" fill="#78350f" />
                </g>
              ))}

              {/* Key Features Callout Box at Bottom */}
              <rect x="130" y="240" width="440" height="75" rx="8" fill="#0b1329" stroke="#1e293b" strokeWidth="1.5" />
              <text x="350" y="260" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">Key Agricultural Advantages of Drip Irrigation</text>
              <text x="150" y="280" fill="#cbd5e1" className="text-[9px]">• 90–95% water efficiency; virtually eliminates evaporation and weed growth between rows.</text>
              <text x="150" y="295" fill="#cbd5e1" className="text-[9px]">• Allows <strong>Fertigation</strong>: Liquid fertilizer is precisely dosed through the venturi injector directly to roots.</text>
              <text x="150" y="308" fill="#cbd5e1" className="text-[9px]">• Ideal for arid northern Nigerian horticulture (onions, tomatoes, peppers).</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>Water Conservation Benchmark:</strong> While surface flooding wastes over 50% of water through seepage and evaporation, drip irrigation applies calibrated water droplets strictly at the crop root zone, making it the most water-conservative system for commercial farms.
            </span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
