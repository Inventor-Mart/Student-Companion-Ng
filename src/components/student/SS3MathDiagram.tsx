import React from 'react';
import { Compass, Info, TrendingUp, Grid, Target } from 'lucide-react';

export type SS3MathDiagramType =
  | 'math-surds-and-conjugates'
  | 'math-coordinate-geometry-calculus'
  | 'math-linear-programming-feasible-region';

interface SS3MathDiagramProps {
  type: SS3MathDiagramType;
}

export const SS3MathDiagram: React.FC<SS3MathDiagramProps> = ({ type }) => {
  switch (type) {
    // ----------------------------------------------------
    // 1. SURDS & CONJUGATE RATIONALIZATION
    // ----------------------------------------------------
    case 'math-surds-and-conjugates':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Surds &amp; Conjugate Denominator Rationalization</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 font-medium">
              WAEC Core Algebra · Week 1
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 300" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* Left Panel: Geometric Spiral of Theodorus / Right Triangles */}
              <g transform="translate(15, 15)">
                <rect x="0" y="0" width="280" height="260" fill="#0b1120" stroke="#1e293b" rx="10" />
                <text x="140" y="24" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-bold">Geometric Origin of Surds</text>

                {/* Triangle 1: Base 1, Height 1 -> Hypotenuse √2 */}
                <polygon points="40,220 140,220 140,120" fill="#0284c7" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="2" />
                {/* Right angle marker */}
                <polyline points="130,220 130,210 140,210" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                <text x="90" y="235" fill="#94a3b8" textAnchor="middle" className="text-[10px] font-bold">1 unit</text>
                <text x="150" y="170" fill="#94a3b8" textAnchor="start" className="text-[10px] font-bold">1 unit</text>
                <text x="80" y="160" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-bold">Hypotenuse = √2</text>

                {/* Triangle 2: Base √2, Height 1 -> Hypotenuse √3 */}
                <polygon points="40,220 140,120 190,70" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeWidth="2" />
                <text x="110" y="90" fill="#10b981" textAnchor="middle" className="text-[11px] font-bold">Hypotenuse = √3</text>

                {/* Properties Badge */}
                <rect x="20" y="200" width="240" height="48" fill="#1e293b" rx="6" />
                <text x="30" y="218" fill="#f8fafc" className="text-[10px] font-semibold">Surd Property: √(ab) = √a × √b</text>
                <text x="30" y="236" fill="#f59e0b" className="text-[10px] font-semibold">Irrational Root: Cannot be written as a/b</text>
              </g>

              {/* Right Panel: Rationalization Workflow */}
              <g transform="translate(315, 15)">
                <rect x="0" y="0" width="290" height="260" fill="#0b1120" stroke="#1e293b" rx="10" />
                <text x="145" y="24" fill="#10b981" textAnchor="middle" className="text-[11px] font-bold">Conjugate Rationalization</text>

                {/* Step 1: Initial Fraction */}
                <g transform="translate(20, 45)">
                  <rect x="0" y="0" width="250" height="44" fill="#1e293b" rx="6" />
                  <text x="15" y="18" fill="#94a3b8" className="text-[9px] font-bold uppercase tracking-wider">Given Expression:</text>
                  <text x="15" y="34" fill="#f8fafc" className="text-[12px] font-bold">N / (√a + √b)</text>
                </g>

                {/* Multiplication symbol */}
                <text x="145" y="106" fill="#f59e0b" textAnchor="middle" className="text-[13px] font-bold">× Multiply Top &amp; Bottom by Conjugate</text>

                {/* Step 2: Conjugate Pair */}
                <g transform="translate(20, 115)">
                  <rect x="0" y="0" width="250" height="44" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.2" rx="6" />
                  <text x="15" y="18" fill="#f59e0b" className="text-[9px] font-bold uppercase tracking-wider">Conjugate Factor:</text>
                  <text x="15" y="34" fill="#fef08a" className="text-[12px] font-bold">(√a - √b) / (√a - √b)</text>
                </g>

                {/* Step 3: Difference of Two Squares */}
                <g transform="translate(20, 175)">
                  <rect x="0" y="0" width="250" height="65" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" rx="6" />
                  <text x="15" y="18" fill="#10b981" className="text-[9px] font-bold uppercase tracking-wider">Eliminates Radical from Denominator:</text>
                  <text x="15" y="36" fill="#f8fafc" className="text-[11px] font-bold">(√a + √b)(√a - √b) = (√a)² - (√b)²</text>
                  <text x="15" y="52" fill="#38bdf8" className="text-[12px] font-bold">Denominator = a - b (Rational Number)</text>
                </g>
              </g>
            </svg>
          </div>

          <div className="flex items-start gap-2 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">WAEC Exam Principle:</strong> An algebraic fraction is incomplete if a radical surd remains in the denominator. Always multiply by the conjugate pair to transform the denominator using the difference of two squares.
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 2. COORDINATE GEOMETRY & CALCULUS (TANGENTS & INTEGRALS)
    // ----------------------------------------------------
    case 'math-coordinate-geometry-calculus':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <TrendingUp className="w-4 h-4 text-sky-400" />
              <span>Calculus: Tangent Slope (dy/dx) &amp; Definite Integral Area</span>
            </div>
            <span className="text-[10px] text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60 font-medium">
              WAEC SS3 Calculus · Weeks 4, 5 &amp; 8
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 300" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              <rect x="10" y="10" width="600" height="280" fill="#0b1120" stroke="#1e293b" rx="10" />

              {/* Cartesian Axes */}
              <line x1="50" y1="250" x2="570" y2="250" stroke="#475569" strokeWidth="2" />
              <line x1="50" y1="250" x2="50" y2="25" stroke="#475569" strokeWidth="2" />
              <text x="580" y="254" fill="#94a3b8" className="text-[11px] font-bold">x</text>
              <text x="50" y="18" fill="#94a3b8" textAnchor="middle" className="text-[11px] font-bold">y</text>
              <text x="40" y="265" fill="#64748b" textAnchor="end" className="text-[10px]">O(0,0)</text>

              {/* Shaded Area Under Curve from x = a to x = b */}
              <path
                d="M 120 250 L 120 185 Q 220 70, 360 120 L 360 250 Z"
                fill="#0284c7"
                fillOpacity="0.22"
                stroke="#0284c7"
                strokeWidth="1"
                strokeDasharray="4 2"
              />
              <text x="230" y="210" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-bold">
                Area = ∫ [from a to b] f(x) dx
              </text>

              {/* Boundary markers a and b */}
              <line x1="120" y1="250" x2="120" y2="185" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="120" cy="250" r="3" fill="#38bdf8" />
              <text x="120" y="266" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">x = a</text>

              <line x1="360" y1="250" x2="360" y2="120" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="360" cy="250" r="3" fill="#38bdf8" />
              <text x="360" y="266" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">x = b</text>

              {/* Smooth Curve y = f(x) */}
              <path
                d="M 60 220 Q 140 140, 220 70 T 380 130 T 520 80"
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
              />
              <text x="440" y="65" fill="#10b981" className="text-[11px] font-bold">Curve: y = f(x)</text>

              {/* Tangent Point P(x1, y1) at Local Maximum */}
              <circle cx="220" cy="70" r="5" fill="#f59e0b" />
              <text x="220" y="55" fill="#f59e0b" textAnchor="middle" className="text-[11px] font-bold">Maximum Turning Point (dy/dx = 0)</text>

              {/* Horizontal Tangent at Max */}
              <line x1="150" y1="70" x2="290" y2="70" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />

              {/* Point on curve for Tangent Line */}
              <circle cx="340" cy="115" r="4" fill="#a855f7" />
              <text x="350" y="105" fill="#a855f7" className="text-[10px] font-bold">Point P(x₁, y₁)</text>

              {/* Tangent line at P */}
              <line x1="280" y1="80" x2="430" y2="165" stroke="#ec4899" strokeWidth="2" />
              <text x="435" y="170" fill="#ec4899" className="text-[10px] font-bold">Tangent: Slope m = f&apos;(x₁)</text>

              {/* Normal line perpendicular to Tangent */}
              <line x1="340" y1="115" x2="385" y2="35" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="390" y="40" fill="#93c5fd" className="text-[10px] font-bold">Normal: m₂ = -1/m₁</text>

              {/* Calculus Key formulas summary box */}
              <g transform="translate(390, 195)">
                <rect x="0" y="0" width="200" height="75" fill="#1e293b" stroke="#334155" rx="6" />
                <text x="12" y="18" fill="#f59e0b" className="text-[9px] font-bold uppercase tracking-wider">Calculus Fundamentals:</text>
                <text x="12" y="34" fill="#f8fafc" className="text-[10px]">1. Derivative: d/dx(xⁿ) = n·xⁿ⁻¹</text>
                <text x="12" y="50" fill="#f8fafc" className="text-[10px]">2. Tangent Eq: y - y₁ = m(x - x₁)</text>
                <text x="12" y="66" fill="#38bdf8" className="text-[10px] font-bold">3. Normal Eq: m₁ · m₂ = -1</text>
              </g>
            </svg>
          </div>

          <div className="flex items-start gap-2 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300">
            <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Calculus Duality:</strong> Differentiation calculates instantaneous rates of change and gradient slopes of curves ($dy/dx$), while integration sums continuous infinitesimals to compute the net area bounded between curves and axes.
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 3. LINEAR PROGRAMMING: FEASIBLE REGIONS & VERTICES
    // ----------------------------------------------------
    case 'math-linear-programming-feasible-region':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Grid className="w-4 h-4 text-amber-400" />
              <span>Linear Programming: Inequalities, Feasible Region &amp; Corner Vertices</span>
            </div>
            <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60 font-medium">
              WAEC Optimization · Week 9
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 300" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              <rect x="10" y="10" width="600" height="280" fill="#0b1120" stroke="#1e293b" rx="10" />

              {/* Grid pattern */}
              <defs>
                <pattern id="lpGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect x="60" y="30" width="520" height="220" fill="url(#lpGrid)" />

              {/* Cartesian Axes */}
              <line x1="60" y1="250" x2="570" y2="250" stroke="#94a3b8" strokeWidth="2.5" />
              <line x1="60" y1="250" x2="60" y2="20" stroke="#94a3b8" strokeWidth="2.5" />
              <text x="575" y="254" fill="#f8fafc" className="text-[11px] font-bold">x (x ≥ 0)</text>
              <text x="60" y="16" fill="#f8fafc" textAnchor="middle" className="text-[11px] font-bold">y (y ≥ 0)</text>

              {/* Constraint Line 1: 2x + y ≤ 10 */}
              <line x1="60" y1="70" x2="360" y2="250" stroke="#f43f5e" strokeWidth="2.5" />
              <text x="280" y="120" fill="#f43f5e" className="text-[10px] font-bold">2x + y = 10</text>

              {/* Constraint Line 2: x + 2y ≤ 8 */}
              <line x1="60" y1="130" x2="460" y2="250" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="420" y="210" fill="#38bdf8" className="text-[10px] font-bold">x + 2y = 8</text>

              {/* Feasible Region Polygon (O-A-B-C) */}
              <polygon
                points="60,250 60,130 260,170 360,250"
                fill="#10b981"
                fillOpacity="0.3"
                stroke="#10b981"
                strokeWidth="2.5"
              />
              <text x="180" y="215" fill="#f8fafc" textAnchor="middle" className="text-[12px] font-bold">
                FEASIBLE REGION
              </text>
              <text x="180" y="232" fill="#a7f3d0" textAnchor="middle" className="text-[10px] font-semibold">
                (Satisfies All Constraints)
              </text>

              {/* Vertices */}
              {/* O(0,0) */}
              <circle cx="60" cy="250" r="4.5" fill="#f59e0b" />
              <text x="48" y="265" fill="#f59e0b" textAnchor="end" className="text-[10px] font-bold">O(0, 0)</text>

              {/* A(0, 4) */}
              <circle cx="60" cy="130" r="4.5" fill="#f59e0b" />
              <text x="50" y="132" fill="#f59e0b" textAnchor="end" className="text-[10px] font-bold">A(0, 4)</text>

              {/* B(4, 2) Intersection */}
              <circle cx="260" cy="170" r="5.5" fill="#fbbf24" stroke="#ffffff" strokeWidth="1.5" />
              <text x="270" y="165" fill="#fbbf24" className="text-[11px] font-bold">B(4, 2) [Optimal Vertex]</text>

              {/* C(5, 0) */}
              <circle cx="360" cy="250" r="4.5" fill="#f59e0b" />
              <text x="360" y="268" fill="#f59e0b" textAnchor="middle" className="text-[10px] font-bold">C(5, 0)</text>

              {/* Objective Function Optimization Table */}
              <g transform="translate(390, 40)">
                <rect x="0" y="0" width="200" height="130" fill="#1e293b" stroke="#334155" rx="8" />
                <text x="12" y="20" fill="#f59e0b" className="text-[10px] font-bold uppercase tracking-wider">Vertex Evaluation Table:</text>
                <text x="12" y="36" fill="#94a3b8" className="text-[9px]">Objective: Maximize Z = 3x + 4y</text>
                <line x1="10" y1="42" x2="190" y2="42" stroke="#475569" strokeWidth="1" />
                <text x="12" y="58" fill="#e2e8f0" className="text-[10px]">At O(0,0) → Z = 3(0) + 4(0) = 0</text>
                <text x="12" y="76" fill="#e2e8f0" className="text-[10px]">At A(0,4) → Z = 3(0) + 4(4) = 16</text>
                <text x="12" y="94" fill="#a7f3d0" className="text-[10px] font-bold">At B(4,2) → Z = 3(4) + 4(2) = 20 ★</text>
                <text x="12" y="112" fill="#e2e8f0" className="text-[10px]">At C(5,0) → Z = 3(5) + 4(0) = 15</text>
              </g>
            </svg>
          </div>

          <div className="flex items-start gap-2 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300">
            <Target className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Corner Point Theorem:</strong> The maximum or minimum value of an objective function $Z = px + qy$ over a convex polygon always occurs at one of the corner vertices of the feasible region.
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
