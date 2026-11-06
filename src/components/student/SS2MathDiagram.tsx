import React from 'react';
import { Compass, HelpCircle, Info, TrendingUp, CircleDot, Activity } from 'lucide-react';

export type SS2MathDiagramType =
  | 'math-circle-theorems'
  | 'math-trig-bearing-diagram'
  | 'math-cumulative-frequency-ogive'
  | 'math-inequalities-plane';

interface SS2MathDiagramProps {
  type: SS2MathDiagramType;
}

export const SS2MathDiagram: React.FC<SS2MathDiagramProps> = ({ type }) => {
  switch (type) {
    // ----------------------------------------------------
    // 1. CIRCLE THEOREMS: CENTER ANGLE & CYCLIC QUADRILATERAL
    // ----------------------------------------------------
    case 'math-circle-theorems':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <CircleDot className="w-4 h-4 text-emerald-400" />
              <span>Circle Geometry: Angle at Center & Cyclic Quadrilateral Theorems</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 font-medium">
              WAEC Core Geometry · Theorems 1 & 4
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 310" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* THEOREM 1: ANGLE AT CENTER IS 2x ANGLE AT CIRCUMFERENCE */}
              <g transform="translate(10, 10)">
                <text x="140" y="20" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-bold">Theorem 1: Angle Subtended at Center</text>
                {/* Main Circle */}
                <circle cx="140" cy="150" r="105" fill="#0f172a" stroke="#334155" strokeWidth="2" />

                {/* Subtended Arc AB */}
                <path d="M 65 220 A 105 105 0 0 0 215 220" fill="none" stroke="#10b981" strokeWidth="4" />
                <text x="140" y="275" fill="#10b981" textAnchor="middle" className="text-[10px] font-bold">Subtended Minor Arc AB</text>

                {/* Center Point O */}
                <circle cx="140" cy="150" r="4" fill="#38bdf8" />
                <text x="140" y="142" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-bold">O (Center)</text>

                {/* Radii OA and OB */}
                <line x1="140" y1="150" x2="65" y2="220" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="140" y1="150" x2="215" y2="220" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />

                {/* Circumference Vertex P */}
                <circle cx="140" cy="45" r="4" fill="#f59e0b" />
                <text x="140" y="38" fill="#f59e0b" textAnchor="middle" className="text-[11px] font-bold">P</text>

                {/* Chords PA and PB */}
                <line x1="140" y1="45" x2="65" y2="220" stroke="#f59e0b" strokeWidth="2" />
                <line x1="140" y1="45" x2="215" y2="220" stroke="#f59e0b" strokeWidth="2" />

                {/* Angles: Center 2θ and Circumference θ */}
                {/* Angle at circumference */}
                <path d="M 125 78 A 40 40 0 0 0 155 78" fill="none" stroke="#fbbf24" strokeWidth="2" />
                <text x="140" y="72" fill="#fbbf24" textAnchor="middle" className="text-[11px] font-extrabold">θ</text>

                {/* Angle at center */}
                <path d="M 115 174 A 35 35 0 0 0 165 174" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                <text x="140" y="180" fill="#38bdf8" textAnchor="middle" className="text-[12px] font-extrabold">2θ</text>

                {/* Vertices A & B */}
                <circle cx="65" cy="220" r="4" fill="#10b981" />
                <text x="50" y="225" fill="#10b981" className="text-[11px] font-bold">A</text>
                <circle cx="215" cy="220" r="4" fill="#10b981" />
                <text x="225" y="225" fill="#10b981" className="text-[11px] font-bold">B</text>

                <text x="140" y="295" fill="#94a3b8" textAnchor="middle" className="text-[9px]">∠AOB = 2 × ∠APB</text>
              </g>

              {/* DIVIDER */}
              <line x1="310" y1="20" x2="310" y2="290" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* THEOREM 4: CYCLIC QUADRILATERAL */}
              <g transform="translate(330, 10)">
                <text x="140" y="20" fill="#ec4899" textAnchor="middle" className="text-[11px] font-bold">Theorem 4: Cyclic Quadrilateral</text>
                {/* Circle */}
                <circle cx="140" cy="150" r="105" fill="#0f172a" stroke="#334155" strokeWidth="2" />

                {/* 4 Cyclic Vertices A, B, C, D */}
                {/* A (top-left) */}
                <circle cx="85" cy="75" r="4" fill="#a855f7" />
                <text x="70" y="70" fill="#a855f7" className="text-[11px] font-bold">A</text>

                {/* B (top-right) */}
                <circle cx="205" cy="85" r="4" fill="#38bdf8" />
                <text x="218" y="80" fill="#38bdf8" className="text-[11px] font-bold">B</text>

                {/* C (bottom-right) */}
                <circle cx="215" cy="210" r="4" fill="#a855f7" />
                <text x="225" y="220" fill="#a855f7" className="text-[11px] font-bold">C</text>

                {/* D (bottom-left) */}
                <circle cx="65" cy="195" r="4" fill="#38bdf8" />
                <text x="48" y="205" fill="#38bdf8" className="text-[11px] font-bold">D</text>

                {/* Chords of Cyclic Quad */}
                <polygon points="85,75 205,85 215,210 65,195" fill="#1e1b4b" fillOpacity="0.4" stroke="#818cf8" strokeWidth="2" />

                {/* Produced Exterior Line from D through C to E */}
                <line x1="65" y1="195" x2="275" y2="216" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="275" cy="216" r="3" fill="#f43f5e" />
                <text x="280" y="220" fill="#f43f5e" className="text-[10px] font-bold">E</text>

                {/* Interior angle A and opposite interior angle C */}
                <text x="98" y="98" fill="#c084fc" className="text-[10px] font-extrabold">α</text>
                <text x="190" y="195" fill="#c084fc" className="text-[10px] font-extrabold">180°-α</text>

                {/* Exterior Angle BCE = α */}
                <path d="M 235 212 A 20 20 0 0 0 213 185" fill="none" stroke="#f43f5e" strokeWidth="2" />
                <text x="238" y="190" fill="#f43f5e" className="text-[10px] font-extrabold">α (Ext.)</text>

                <text x="140" y="275" fill="#a855f7" textAnchor="middle" className="text-[10px] font-semibold">Opposite Angles Sum = 180°</text>
                <text x="140" y="295" fill="#f43f5e" textAnchor="middle" className="text-[9px]">Ext. Angle BCE = Interior Opp. ∠A (α)</text>
              </g>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Crucial WAEC Geometric Rule:</strong> When proving circle theorems, always identify whether the arc is minor or major. For reflex angles at the center, the subtended circumference angle is in the major segment (2θ and θ).
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 2. THREE-FIGURE BEARINGS & TRIANGULATION
    // ----------------------------------------------------
    case 'math-trig-bearing-diagram':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Compass className="w-4 h-4 text-sky-400" />
              <span>3-Figure Compass Bearings & Triangular Navigation</span>
            </div>
            <span className="text-[10px] text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60 font-medium">
              Trigonometry & Surveying
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 600 300" className="w-full max-w-2xl mx-auto min-w-[460px] text-xs font-sans">
              {/* Station A */}
              <g transform="translate(100, 180)">
                {/* North Line A */}
                <line x1="0" y1="30" x2="0" y2="-120" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                <polygon points="0,-125 -5,-115 5,-115" fill="#ef4444" />
                <text x="-15" y="-120" fill="#ef4444" className="text-[11px] font-bold">N</text>

                {/* East Reference */}
                <line x1="0" y1="0" x2="80" y2="0" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />

                {/* Station A marker */}
                <circle cx="0" cy="0" r="5" fill="#38bdf8" />
                <text x="-20" y="15" fill="#38bdf8" className="text-[11px] font-bold">Station A</text>

                {/* Bearing Angle Arc: 060° clockwise from North */}
                <path d="M 0 -50 A 50 50 0 0 1 43 -25" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                <text x="25" y="-45" fill="#f59e0b" className="text-[11px] font-bold">060°</text>
              </g>

              {/* Station B (Bearing 060° from A, Distance 240km) */}
              <g transform="translate(320, 60)">
                {/* North Line B */}
                <line x1="0" y1="120" x2="0" y2="-40" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                <polygon points="0,-45 -5,-35 5,-35" fill="#ef4444" />
                <text x="-15" y="-40" fill="#ef4444" className="text-[11px] font-bold">N</text>

                {/* Station B marker */}
                <circle cx="0" cy="0" r="5" fill="#10b981" />
                <text x="15" y="5" fill="#10b981" className="text-[11px] font-bold">Station B</text>

                {/* Back Bearing from B to A (060° + 180° = 240°) */}
                <path d="M 0 -25 A 25 25 0 1 1 -18 15" fill="none" stroke="#c084fc" strokeWidth="2" />
                <text x="-65" y="-10" fill="#c084fc" className="text-[10px] font-bold">Back: 240°</text>
              </g>

              {/* Vector A -> B */}
              <line x1="100" y1="180" x2="320" y2="60" stroke="#38bdf8" strokeWidth="3" />
              <text x="195" y="110" fill="#38bdf8" className="text-[10px] font-bold" transform="rotate(-28 195 110)">d = 240 km (Course 060°)</text>

              {/* Station C (South-East from B: Bearing 140°, Distance 180km) */}
              <g transform="translate(460, 190)">
                {/* North Line C */}
                <line x1="0" y1="40" x2="0" y2="-60" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
                <polygon points="0,-65 -4,-57 4,-57" fill="#ef4444" />
                <text x="-12" y="-60" fill="#ef4444" className="text-[10px] font-bold">N</text>

                {/* Station C marker */}
                <circle cx="0" cy="0" r="5" fill="#f59e0b" />
                <text x="10" y="15" fill="#f59e0b" className="text-[11px] font-bold">Station C</text>
              </g>

              {/* Vector B -> C */}
              <line x1="320" y1="60" x2="460" y2="190" stroke="#10b981" strokeWidth="2.5" />
              <text x="405" y="115" fill="#10b981" className="text-[10px] font-bold" transform="rotate(43 405 115)">d = 180 km</text>

              {/* Vector A -> C (Resultant Baseline) */}
              <line x1="100" y1="180" x2="460" y2="190" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 4" />
              <text x="260" y="215" fill="#f59e0b" textAnchor="middle" className="text-[10px] font-bold">Resultant Distance AC (Cosine Rule: b² = a² + c² - 2ac cos B)</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
            <span>
              <strong>Golden Bearing Formula:</strong> If Forward Bearing &lt; 180°, then Back Bearing = Forward Bearing + 180°. If Forward Bearing ≥ 180°, then Back Bearing = Forward Bearing - 180°. Always measure clockwise from the North axis!
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 3. CUMULATIVE FREQUENCY CURVE (OGIVE) & QUARTILES
    // ----------------------------------------------------
    case 'math-cumulative-frequency-ogive':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Cumulative Frequency Curve (Ogive) & Quartile Determination</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 font-medium">
              Statistics · Grouped Data (N = 100)
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 600 320" className="w-full max-w-2xl mx-auto min-w-[460px] text-xs font-sans">
              {/* Coordinate Grid */}
              <defs>
                <pattern id="mathGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect x="70" y="20" width="480" height="240" fill="url(#mathGrid)" rx="6" />

              {/* Axes */}
              <line x1="70" y1="260" x2="560" y2="260" stroke="#94a3b8" strokeWidth="2" />
              <line x1="70" y1="260" x2="70" y2="15" stroke="#94a3b8" strokeWidth="2" />

              {/* Axis Titles */}
              <text x="310" y="295" fill="#cbd5e1" textAnchor="middle" className="text-[11px] font-semibold">Upper Class Boundaries (Exam Marks: 10 - 90)</text>
              <text x="20" y="140" fill="#cbd5e1" textAnchor="middle" transform="rotate(-90 20 140)" className="text-[11px] font-semibold">Cumulative Frequency (cf)</text>

              {/* Y-Ticks (0 to 100) */}
              {[
                { val: '100 (N)', y: 20 },
                { val: '75 (Q₃)', y: 80, isQ: true, col: '#f59e0b' },
                { val: '50 (Median)', y: 140, isQ: true, col: '#38bdf8' },
                { val: '25 (Q₁)', y: 200, isQ: true, col: '#a855f7' },
                { val: '0', y: 260 }
              ].map((t, idx) => (
                <g key={idx}>
                  <line x1="65" y1={t.y} x2="70" y2={t.y} stroke="#94a3b8" strokeWidth="1.5" />
                  <text x="60" y={t.y + 4} fill={t.col || '#94a3b8'} textAnchor="end" className={`text-[10px] ${t.isQ ? 'font-bold' : ''}`}>{t.val}</text>
                </g>
              ))}

              {/* S-Curve (Smooth Ogive) Path */}
              <path
                d="M 70 260 C 130 258 170 245 220 220 C 270 190 310 140 370 85 C 430 40 480 25 550 20"
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
              />

              {/* Q3 (Upper Quartile = 75) Dotted Projections */}
              <line x1="70" y1="80" x2="378" y2="80" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="378" y1="80" x2="378" y2="260" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="378" cy="80" r="4" fill="#f59e0b" />
              <circle cx="378" cy="260" r="3" fill="#f59e0b" />
              <text x="378" y="275" fill="#f59e0b" textAnchor="middle" className="text-[10px] font-bold">Q₃ = 62.5</text>

              {/* Median (Q2 = 50) Dotted Projections */}
              <line x1="70" y1="140" x2="310" y2="140" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="310" y1="140" x2="310" y2="260" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
              <circle cx="310" cy="140" r="5" fill="#38bdf8" />
              <circle cx="310" cy="260" r="3" fill="#38bdf8" />
              <text x="310" y="275" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-extrabold">Median = 51.0</text>

              {/* Q1 (Lower Quartile = 25) Dotted Projections */}
              <line x1="70" y1="200" x2="245" y2="200" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="245" y1="200" x2="245" y2="260" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="245" cy="200" r="4" fill="#a855f7" />
              <circle cx="245" cy="260" r="3" fill="#a855f7" />
              <text x="245" y="275" fill="#a855f7" textAnchor="middle" className="text-[10px] font-bold">Q₁ = 39.5</text>

              {/* Interquartile Range Label */}
              <rect x="230" y="100" width="180" height="26" fill="#0f172a" stroke="#475569" strokeWidth="1" rx="4" />
              <text x="320" y="117" fill="#f8fafc" textAnchor="middle" className="text-[10px] font-semibold">IQR = Q₃ - Q₁ = 62.5 - 39.5 = 23.0</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>WAEC Theory Tip:</strong> An Ogive is always plotted using the <em>Upper Class Boundaries</em> (horizontal) against <em>Cumulative Frequency</em> (vertical). Never plot frequencies on the x-axis or use mid-points for cumulative curves!
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 4. LINEAR & QUADRATIC INEQUALITIES IN 2 VARIABLES
    // ----------------------------------------------------
    case 'math-inequalities-plane':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>Cartesian Shading of Linear Inequalities: 2x + 3y ≤ 12</span>
            </div>
            <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60 font-medium">
              Algebra & Region of Feasibility
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 560 280" className="w-full max-w-xl mx-auto min-w-[420px] text-xs font-sans">
              {/* Cartesian Axes */}
              <line x1="80" y1="230" x2="520" y2="230" stroke="#94a3b8" strokeWidth="2" />
              <line x1="120" y1="260" x2="120" y2="20" stroke="#94a3b8" strokeWidth="2" />

              <text x="530" y="235" fill="#94a3b8" className="text-[11px] font-bold">x</text>
              <text x="120" y="15" fill="#94a3b8" textAnchor="middle" className="text-[11px] font-bold">y</text>
              <text x="110" y="245" fill="#64748b" className="text-[10px]">O (0,0)</text>

              {/* Intercept Marks */}
              {/* x-intercept (6, 0) */}
              <circle cx="360" cy="230" r="4" fill="#38bdf8" />
              <text x="360" y="250" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">(6, 0)</text>

              {/* y-intercept (0, 4) */}
              <circle cx="120" cy="90" r="4" fill="#38bdf8" />
              <text x="80" y="95" fill="#38bdf8" textAnchor="end" className="text-[10px] font-bold">(0, 4)</text>

              {/* Shaded Feasibility Region below 2x + 3y <= 12 */}
              <polygon points="120,230 120,90 360,230" fill="#0284c7" fillOpacity="0.25" />
              <text x="190" y="195" fill="#38bdf8" className="text-[11px] font-bold">Required Region (R)</text>
              <text x="190" y="210" fill="#7dd3fc" className="text-[9px]">2x + 3y ≤ 12 (Origin Test Satisfied)</text>

              {/* Boundary Line 2x + 3y = 12 (Solid because ≤) */}
              <line x1="60" y1="55" x2="420" y2="265" stroke="#38bdf8" strokeWidth="3" />
              <text x="300" y="145" fill="#38bdf8" className="text-[10px] font-bold" transform="rotate(30 300 145)">Line: 2x + 3y = 12</text>

              {/* Test Point (0,0) */}
              <circle cx="120" cy="230" r="5" fill="#10b981" />
              <text x="135" y="225" fill="#10b981" className="text-[9px] font-bold">Test (0,0): 2(0)+3(0) = 0 ≤ 12 ✓</text>

              {/* Unwanted Region cross-hatch indicator */}
              <line x1="280" y1="60" x2="350" y2="100" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2 2" />
              <text x="360" y="85" fill="#f43f5e" className="text-[10px] font-bold">Unwanted / Non-feasible Region</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Origin Test Method:</strong> Substitute $(0,0)$ into $2x + 3y \le 12 \implies 0 \le 12$ (True). Since the statement is true, the half-plane containing $(0,0)$ represents the solution set!
            </span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
