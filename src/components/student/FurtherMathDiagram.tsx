import React, { useState } from 'react';

export type FurtherMathDiagramType =
  | 'further-math-quadratic-roots-parabola'
  | 'further-math-coordinate-geometry'
  | 'further-math-unit-circle-astc'
  | 'further-math-logic-truth-venn'
  | 'further-math-differentiation-turning-points'
  | 'further-math-vectors-resolution';

interface FurtherMathDiagramProps {
  type: FurtherMathDiagramType;
  caption?: string;
}

export const FurtherMathDiagram: React.FC<FurtherMathDiagramProps> = ({ type, caption }) => {
  const [activeParam, setActiveParam] = useState<string>('roots');

  // 1. Quadratic Roots & Parabola
  if (type === 'further-math-quadratic-roots-parabola') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-emerald-400">
              Interactive Parabola & Theory of Quadratic Roots
            </h4>
            <p className="text-xs text-slate-400">
              f(x) = ax² + bx + c with roots α and β, axis of symmetry, and vertex
            </p>
          </div>
          <div className="flex gap-1.5">
            {[
              { id: 'roots', label: 'Roots (α, β)' },
              { id: 'vertex', label: 'Vertex & Axis' },
              { id: 'discriminant', label: 'Discriminant (Δ)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveParam(tab.id)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  activeParam === tab.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 320" className="w-full max-w-xl select-none">
            <defs>
              <linearGradient id="parabolaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Grid Lines */}
            <g stroke="#334155" strokeWidth="0.5" strokeDasharray="3,3">
              {[60, 120, 180, 240, 300, 360, 420, 480].map(x => (
                <line key={x} x1={x} y1="20" x2={x} y2="280" />
              ))}
              {[40, 80, 120, 160, 200, 240].map(y => (
                <line key={y} x1="30" y1={y} x2="510" y2={y} />
              ))}
            </g>

            {/* Axes */}
            {/* X-Axis */}
            <line x1="30" y1="180" x2="510" y2="180" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <text x="500" y="172" fill="#cbd5e1" fontSize="12" fontWeight="600">x</text>
            {/* Y-Axis */}
            <line x1="120" y1="280" x2="120" y2="25" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <text x="126" y="35" fill="#cbd5e1" fontSize="12" fontWeight="600">y</text>

            {/* Shaded area under parabola */}
            <path
              d="M 170 180 Q 280 320 390 180 Z"
              fill="url(#parabolaGrad)"
            />

            {/* Parabola curve: a > 0, vertex at (280, 245), roots at x=170 (α=1) and x=390 (β=3) */}
            <path
              d="M 120 70 Q 280 360 440 70"
              fill="none"
              stroke="#10b981"
              strokeWidth="3.5"
            />

            {/* Axis of Symmetry: x = -b / (2a) = 280 */}
            <line
              x1="280"
              y1="45"
              x2="280"
              y2="270"
              stroke="#f59e0b"
              strokeWidth="1.75"
              strokeDasharray="5,4"
            />
            <text x="286" y="58" fill="#f59e0b" fontSize="11" fontWeight="600">
              x = -b / (2a)
            </text>

            {/* Root Alpha: x = 170 */}
            <circle cx="170" cy="180" r="5.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
            <text x="156" y="202" fill="#38bdf8" fontSize="13" fontWeight="bold">α</text>
            <text x="144" y="217" fill="#94a3b8" fontSize="10">(α, 0)</text>

            {/* Root Beta: x = 390 */}
            <circle cx="390" cy="180" r="5.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
            <text x="394" y="202" fill="#38bdf8" fontSize="13" fontWeight="bold">β</text>
            <text x="382" y="217" fill="#94a3b8" fontSize="10">(β, 0)</text>

            {/* Vertex V(h, k): x=280, y=245 */}
            <circle cx="280" cy="245" r="5" fill="#ec4899" stroke="#0f172a" strokeWidth="2" />
            <text x="290" y="252" fill="#f472b6" fontSize="11" fontWeight="bold">
              Vertex V( -b/2a, -Δ/4a )
            </text>

            {/* Dynamic Annotation Callout Box */}
            <g transform="translate(320, 25)">
              <rect width="200" height="85" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1" />
              {activeParam === 'roots' && (
                <>
                  <text x="12" y="22" fill="#38bdf8" fontSize="11" fontWeight="bold">Sum & Product of Roots:</text>
                  <text x="12" y="40" fill="#f1f5f9" fontSize="11">α + β = -b / a</text>
                  <text x="12" y="58" fill="#f1f5f9" fontSize="11">α · β = c / a</text>
                  <text x="12" y="74" fill="#a7f3d0" fontSize="10">x² - (Sum)x + (Product) = 0</text>
                </>
              )}
              {activeParam === 'vertex' && (
                <>
                  <text x="12" y="22" fill="#f59e0b" fontSize="11" fontWeight="bold">Turning Point (Vertex):</text>
                  <text x="12" y="40" fill="#f1f5f9" fontSize="11">h = -b / (2a) (Min. point)</text>
                  <text x="12" y="58" fill="#f1f5f9" fontSize="11">k = (4ac - b²) / (4a)</text>
                  <text x="12" y="74" fill="#f472b6" fontSize="10">Min value when a &gt; 0</text>
                </>
              )}
              {activeParam === 'discriminant' && (
                <>
                  <text x="12" y="22" fill="#ec4899" fontSize="11" fontWeight="bold">Discriminant: Δ = b² - 4ac</text>
                  <text x="12" y="40" fill="#34d399" fontSize="11">Δ &gt; 0: Two real distinct roots</text>
                  <text x="12" y="58" fill="#fbbf24" fontSize="11">Δ = 0: Two equal real roots</text>
                  <text x="12" y="74" fill="#f87171" fontSize="10">Δ &lt; 0: Complex / no real roots</text>
                </>
              )}
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

  // 2. Coordinate Geometry: Distance, Slope & Perpendicular Lines
  if (type === 'further-math-coordinate-geometry') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-sky-400">
              Coordinate Geometry: Slope, Distance & Perpendicularity
            </h4>
            <p className="text-xs text-slate-400">
              Cartesian analysis of line segments, midpoints, and orthogonal relations (m₁ · m₂ = -1)
            </p>
          </div>
          <span className="rounded bg-sky-950/80 px-2.5 py-1 text-xs font-semibold text-sky-300 border border-sky-800">
            Vector & Analytic Geometry
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 320" className="w-full max-w-xl select-none">
            <defs>
              <marker id="geomArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Grid */}
            <g stroke="#334155" strokeWidth="0.5" strokeDasharray="3,3">
              {[60, 120, 180, 240, 300, 360, 420, 480].map(x => (
                <line key={x} x1={x} y1="20" x2={x} y2="300" />
              ))}
              {[50, 100, 150, 200, 250].map(y => (
                <line key={y} x1="20" y1={y} x2="520" y2={y} />
              ))}
            </g>

            {/* Axes */}
            <line x1="30" y1="250" x2="510" y2="250" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#geomArrow)" />
            <text x="500" y="242" fill="#cbd5e1" fontSize="12" fontWeight="600">x</text>
            <line x1="80" y1="290" x2="80" y2="25" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#geomArrow)" />
            <text x="86" y="35" fill="#cbd5e1" fontSize="12" fontWeight="600">y</text>

            {/* Right Triangle Construction for Distance & Slope */}
            {/* A(140, 200) to B(380, 80) */}
            <line x1="140" y1="200" x2="380" y2="200" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" />
            <line x1="380" y1="200" x2="380" y2="80" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" />
            {/* Right angle marker at (380, 200) */}
            <path d="M 365 200 L 365 185 L 380 185" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            
            {/* Run and Rise labels */}
            <text x="240" y="218" fill="#f59e0b" fontSize="11" fontWeight="bold">Run: Δx = x₂ - x₁</text>
            <text x="390" y="145" fill="#f59e0b" fontSize="11" fontWeight="bold">Rise: Δy = y₂ - y₁</text>

            {/* Line L1: A(140, 200) to B(380, 80) */}
            <line x1="90" y1="225" x2="430" y2="55" stroke="#38bdf8" strokeWidth="3" />
            <text x="435" y="60" fill="#38bdf8" fontSize="12" fontWeight="bold">Line L₁ (Slope m₁)</text>

            {/* Point A */}
            <circle cx="140" cy="200" r="5" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
            <text x="100" y="196" fill="#38bdf8" fontSize="11" fontWeight="bold">A (x₁, y₁)</text>

            {/* Point B */}
            <circle cx="380" cy="80" r="5" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
            <text x="392" y="80" fill="#38bdf8" fontSize="11" fontWeight="bold">B (x₂, y₂)</text>

            {/* Midpoint M */}
            <circle cx="260" cy="140" r="5" fill="#ec4899" stroke="#0f172a" strokeWidth="2" />
            <text x="270" y="135" fill="#f472b6" fontSize="11" fontWeight="bold">
              Midpoint M ( (x₁+x₂)/2, (y₁+y₂)/2 )
            </text>

            {/* Perpendicular Line L2 through M: orthogonal, slope m2 = -1/m1 */}
            {/* Normal to slope -0.5 is slope +2 */}
            <line x1="210" y1="240" x2="310" y2="40" stroke="#34d399" strokeWidth="2.5" strokeDasharray="5,3" />
            <text x="315" y="45" fill="#34d399" fontSize="11" fontWeight="bold">L₂ ⊥ L₁ (m₂ = -1/m₁)</text>

            {/* Orthogonal symbol at M */}
            <path d="M 252 124 L 268 116 L 276 132" fill="none" stroke="#34d399" strokeWidth="1.5" />

            {/* Formula Summary Panel */}
            <g transform="translate(20, 265)">
              <rect width="500" height="45" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="15" y="20" fill="#94a3b8" fontSize="10" fontWeight="bold">FORMULAS:</text>
              <text x="80" y="20" fill="#f1f5f9" fontSize="10">d = √[(x₂-x₁)² + (y₂-y₁)²]</text>
              <text x="240" y="20" fill="#38bdf8" fontSize="10">m = (y₂ - y₁) / (x₂ - x₁)</text>
              <text x="380" y="20" fill="#34d399" fontSize="10">m₁ · m₂ = -1 (Perpendicular)</text>
              <text x="80" y="36" fill="#f59e0b" fontSize="10">Point-Slope: y - y₁ = m(x - x₁)</text>
              <text x="260" y="36" fill="#a7f3d0" fontSize="10">Distance to ax+by+c=0: |ax₁+by₁+c| / √(a²+b²)</text>
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

  // 3. Trigonometry: Unit Circle & ASTC Rule
  if (type === 'further-math-unit-circle-astc') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-amber-400">
              Trigonometry: The Unit Circle & The ASTC Quadrant Rule
            </h4>
            <p className="text-xs text-slate-400">
              Signs of trigonometric ratios across 4 quadrants & exact surd projections (r = 1)
            </p>
          </div>
          <span className="rounded bg-amber-950/80 px-2.5 py-1 text-xs font-semibold text-amber-300 border border-amber-800">
            ASTC: "All Students Take Chemistry"
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 330" className="w-full max-w-xl select-none">
            <defs>
              <marker id="trigArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Center (270, 165), radius R = 110 */}
            {/* Quadrant backgrounds */}
            {/* Q1: Top Right */}
            <rect x="270" y="55" width="120" height="110" fill="#3b82f6" fillOpacity="0.08" />
            {/* Q2: Top Left */}
            <rect x="150" y="55" width="120" height="110" fill="#10b981" fillOpacity="0.08" />
            {/* Q3: Bottom Left */}
            <rect x="150" y="165" width="120" height="110" fill="#f59e0b" fillOpacity="0.08" />
            {/* Q4: Bottom Right */}
            <rect x="270" y="165" width="120" height="110" fill="#ec4899" fillOpacity="0.08" />

            {/* Axes */}
            <line x1="50" y1="165" x2="490" y2="165" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#trigArrow)" />
            <text x="495" y="169" fill="#cbd5e1" fontSize="12" fontWeight="600">x (cos θ)</text>
            <text x="40" y="169" fill="#94a3b8" fontSize="11">180° (π)</text>

            <line x1="270" y1="295" x2="270" y2="35" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#trigArrow)" />
            <text x="276" y="42" fill="#cbd5e1" fontSize="12" fontWeight="600">y (sin θ)</text>
            <text x="276" y="25" fill="#94a3b8" fontSize="11">90° (π/2)</text>
            <text x="276" y="310" fill="#94a3b8" fontSize="11">270° (3π/2)</text>
            <text x="420" y="180" fill="#94a3b8" fontSize="11">0° / 360°</text>

            {/* Unit Circle (R = 110) */}
            <circle cx="270" cy="165" r="110" fill="none" stroke="#38bdf8" strokeWidth="2.5" />

            {/* Quadrant Markers: ASTC */}
            {/* Q1: A (All positive) */}
            <text x="325" y="115" fill="#60a5fa" fontSize="24" fontWeight="bold">A</text>
            <text x="310" y="132" fill="#93c5fd" fontSize="10" fontWeight="600">ALL Positive</text>
            <text x="310" y="145" fill="#bfdbfe" fontSize="9">sin, cos, tan &gt; 0</text>

            {/* Q2: S (Sin positive) */}
            <text x="195" y="115" fill="#34d399" fontSize="24" fontWeight="bold">S</text>
            <text x="180" y="132" fill="#6ee7b7" fontSize="10" fontWeight="600">SIN Positive</text>
            <text x="180" y="145" fill="#a7f3d0" fontSize="9">cos, tan &lt; 0</text>

            {/* Q3: T (Tan positive) */}
            <text x="195" y="215" fill="#fbbf24" fontSize="24" fontWeight="bold">T</text>
            <text x="180" y="232" fill="#fde68a" fontSize="10" fontWeight="600">TAN Positive</text>
            <text x="180" y="245" fill="#fef3c7" fontSize="9">sin, cos &lt; 0</text>

            {/* Q4: C (Cos positive) */}
            <text x="325" y="215" fill="#f472b6" fontSize="24" fontWeight="bold">C</text>
            <text x="310" y="232" fill="#fbcfe8" fontSize="10" fontWeight="600">COS Positive</text>
            <text x="310" y="245" fill="#fce7f3" fontSize="9">sin, tan &lt; 0</text>

            {/* Reference Triangle for Angle θ in Q1 (θ = 45°) */}
            {/* x = 270 + 110 * cos(45°) = 270 + 77.8 = 348 */}
            {/* y = 165 - 110 * sin(45°) = 165 - 77.8 = 87 */}
            <line x1="270" y1="165" x2="348" y2="87" stroke="#f59e0b" strokeWidth="2.5" />
            <line x1="348" y1="87" x2="348" y2="165" stroke="#ef4444" strokeWidth="1.75" strokeDasharray="3,3" />
            <line x1="270" y1="165" x2="348" y2="165" stroke="#10b981" strokeWidth="1.75" />

            <circle cx="348" cy="87" r="4.5" fill="#f59e0b" />
            <text x="355" y="82" fill="#f59e0b" fontSize="11" fontWeight="bold">P(cos θ, sin θ)</text>
            <text x="290" y="158" fill="#f59e0b" fontSize="10" fontWeight="bold">θ</text>
            <text x="310" y="115" fill="#f59e0b" fontSize="9">r = 1</text>

            {/* Special Surd Values Reference Card */}
            <g transform="translate(15, 20)">
              <rect width="125" height="75" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1" />
              <text x="8" y="16" fill="#fbbf24" fontSize="10" fontWeight="bold">Special Angles:</text>
              <text x="8" y="32" fill="#cbd5e1" fontSize="9">sin 30° = 1/2, cos 30° = √3/2</text>
              <text x="8" y="47" fill="#cbd5e1" fontSize="9">sin 45° = cos 45° = 1/√2</text>
              <text x="8" y="62" fill="#cbd5e1" fontSize="9">tan 45° = 1, tan 60° = √3</text>
            </g>

            {/* Fundamental Identity Card */}
            <g transform="translate(400, 20)">
              <rect width="130" height="75" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1" />
              <text x="8" y="16" fill="#34d399" fontSize="10" fontWeight="bold">Key Identities:</text>
              <text x="8" y="32" fill="#f1f5f9" fontSize="9">cos² θ + sin² θ = 1</text>
              <text x="8" y="47" fill="#f1f5f9" fontSize="9">1 + tan² θ = sec² θ</text>
              <text x="8" y="62" fill="#f1f5f9" fontSize="9">1 + cot² θ = cosec² θ</text>
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

  // 4. Logical Reasoning: Truth Mapping & Venn Sets
  if (type === 'further-math-logic-truth-venn') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-purple-400">
              Mathematical Logic: Connectives, Implication & Truth Tables
            </h4>
            <p className="text-xs text-slate-400">
              Conditional (P ⇒ Q), Converse (Q ⇒ P), Inverse (~P ⇒ ~Q), and Contrapositive (~Q ⇒ ~P)
            </p>
          </div>
          <span className="rounded bg-purple-950/80 px-2.5 py-1 text-xs font-semibold text-purple-300 border border-purple-800">
            Propositional Calculus
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 280" className="w-full max-w-xl select-none">
            <defs>
              <marker id="logicArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#a855f7" />
              </marker>
            </defs>

            {/* 4 Corners of Equivalence Diagram */}
            {/* Top-Left: Conditional P => Q */}
            <g transform="translate(30, 30)">
              <rect width="180" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="14" y="24" fill="#60a5fa" fontSize="12" fontWeight="bold">Conditional Statement</text>
              <text x="14" y="44" fill="#f8fafc" fontSize="14" fontWeight="600">P ⇒ Q</text>
              <text x="75" y="44" fill="#94a3b8" fontSize="10">("If P, then Q")</text>
            </g>

            {/* Top-Right: Converse Q => P */}
            <g transform="translate(330, 30)">
              <rect width="180" height="60" rx="8" fill="#1e293b" stroke="#eab308" strokeWidth="1.5" />
              <text x="14" y="24" fill="#fde047" fontSize="12" fontWeight="bold">Converse Statement</text>
              <text x="14" y="44" fill="#f8fafc" fontSize="14" fontWeight="600">Q ⇒ P</text>
              <text x="75" y="44" fill="#94a3b8" fontSize="10">("If Q, then P")</text>
            </g>

            {/* Bottom-Left: Inverse ~P => ~Q */}
            <g transform="translate(30, 170)">
              <rect width="180" height="60" rx="8" fill="#1e293b" stroke="#eab308" strokeWidth="1.5" />
              <text x="14" y="24" fill="#fde047" fontSize="12" fontWeight="bold">Inverse Statement</text>
              <text x="14" y="44" fill="#f8fafc" fontSize="14" fontWeight="600">~P ⇒ ~Q</text>
              <text x="95" y="44" fill="#94a3b8" fontSize="10">("If not P, then not Q")</text>
            </g>

            {/* Bottom-Right: Contrapositive ~Q => ~P */}
            <g transform="translate(330, 170)">
              <rect width="180" height="60" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <text x="14" y="24" fill="#34d399" fontSize="12" fontWeight="bold">Contrapositive Statement</text>
              <text x="14" y="44" fill="#f8fafc" fontSize="14" fontWeight="600">~Q ⇒ ~P</text>
              <text x="100" y="44" fill="#94a3b8" fontSize="10">("If not Q, then not P")</text>
            </g>

            {/* Connecting Relationships */}
            {/* Horizontal Top: Converse arrow */}
            <line x1="215" y1="60" x2="325" y2="60" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="245" y="52" fill="#94a3b8" fontSize="10">Converse</text>

            {/* Horizontal Bottom: Converse of inverse */}
            <line x1="215" y1="200" x2="325" y2="200" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="245" y="192" fill="#94a3b8" fontSize="10">Converse</text>

            {/* Vertical Left: Negate (Inverse) */}
            <line x1="120" y1="95" x2="120" y2="165" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="75" y="135" fill="#94a3b8" fontSize="10">Inverse</text>

            {/* Vertical Right: Negate (Inverse) */}
            <line x1="420" y1="95" x2="420" y2="165" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="425" y="135" fill="#94a3b8" fontSize="10">Inverse</text>

            {/* DIAGONAL EQUIVALENCE: (P => Q) ≡ (~Q => ~P) */}
            <line x1="210" y1="90" x2="330" y2="170" stroke="#10b981" strokeWidth="2" strokeDasharray="5,3" />
            <circle cx="270" cy="130" r="14" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
            <text x="264" y="134" fill="#a7f3d0" fontSize="12" fontWeight="bold">≡</text>

            {/* DIAGONAL EQUIVALENCE: (Q => P) ≡ (~P => ~Q) */}
            <line x1="330" y1="90" x2="210" y2="170" stroke="#eab308" strokeWidth="1.5" strokeDasharray="5,3" />

            {/* Critical WAEC Rule Banner */}
            <g transform="translate(40, 245)">
              <rect width="460" height="26" rx="5" fill="#0f172a" stroke="#334155" strokeWidth="1" />
              <text x="15" y="17" fill="#34d399" fontSize="10" fontWeight="bold">
                WAEC LOGIC PRINCIPLE:
              </text>
              <text x="155" y="17" fill="#cbd5e1" fontSize="10">
                A conditional statement (P ⇒ Q) is LOGICALLY EQUIVALENT ONLY to its Contrapositive (~Q ⇒ ~P).
              </text>
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

  // 5. Calculus: Differentiation Turning Points (Max, Min, Inflexion)
  if (type === 'further-math-differentiation-turning-points') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-emerald-400">
              Calculus: Stationary Points, Tangents &amp; Second Derivative Tests
            </h4>
            <p className="text-xs text-slate-400">
              Local Maximum (d²y/dx² &lt; 0), Local Minimum (d²y/dx² &gt; 0), and Point of Inflexion
            </p>
          </div>
          <span className="rounded bg-emerald-950/80 px-2.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-800 font-mono">
            dy/dx = 0 at stationary points
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 580 300" className="w-full max-w-xl select-none text-xs font-sans">
            {/* Coordinate Axes */}
            <line x1="40" y1="250" x2="540" y2="250" stroke="#64748b" strokeWidth="1.5" />
            <line x1="50" y1="260" x2="50" y2="25" stroke="#64748b" strokeWidth="1.5" />
            <text x="535" y="265" fill="#94a3b8" className="text-[10px] font-bold">x</text>
            <text x="35" y="30" fill="#94a3b8" className="text-[10px] font-bold">y</text>

            {/* Cubic Curve y = f(x) */}
            <path
              d="M 60 230 C 130 50, 200 40, 270 145 C 340 240, 420 230, 500 50"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
            />
            <text x="505" y="55" fill="#38bdf8" className="text-[11px] font-mono font-bold">y = f(x)</text>

            {/* Point 1: Local Maximum (x ≈ 165, y ≈ 62) */}
            {/* Horizontal Tangent line */}
            <line x1="110" y1="62" x2="220" y2="62" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
            <circle cx="165" cy="62" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
            {/* Callout box for Max */}
            <rect x="90" y="20" width="150" height="34" rx="4" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1" />
            <text x="165" y="34" fill="#fbbf24" textAnchor="middle" className="text-[9px] font-bold">LOCAL MAXIMUM</text>
            <text x="165" y="47" fill="#cbd5e1" textAnchor="middle" className="text-[8.5px] font-mono">dy/dx = 0, d²y/dx² &lt; 0</text>

            {/* Point 2: Point of Inflexion (x ≈ 270, y ≈ 145) */}
            <circle cx="270" cy="145" r="4.5" fill="#a855f7" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="230" y1="120" x2="310" y2="170" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="285" y="140" fill="#c084fc" className="text-[9px] font-bold">Inflexion Point (d²y/dx² = 0)</text>

            {/* Point 3: Local Minimum (x ≈ 375, y ≈ 215) */}
            {/* Horizontal Tangent line */}
            <line x1="320" y1="215" x2="430" y2="215" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />
            <circle cx="375" cy="215" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
            {/* Callout box for Min */}
            <rect x="300" y="235" width="150" height="34" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
            <text x="375" y="249" fill="#34d399" textAnchor="middle" className="text-[9px] font-bold">LOCAL MINIMUM</text>
            <text x="375" y="262" fill="#cbd5e1" textAnchor="middle" className="text-[8.5px] font-mono">dy/dx = 0, d²y/dx² &gt; 0</text>

            {/* Slope Sign Indicators */}
            <text x="95" y="160" fill="#4ade80" className="text-[9px] font-bold">dy/dx &gt; 0 (Rising)</text>
            <text x="215" y="115" fill="#f87171" className="text-[9px] font-bold">dy/dx &lt; 0 (Falling)</text>
            <text x="440" y="160" fill="#4ade80" className="text-[9px] font-bold">dy/dx &gt; 0 (Rising)</text>
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

  // 6. Vectors: Resolution and Resultant in 2D & 3D
  if (type === 'further-math-vectors-resolution') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-emerald-400">
              Vectors: Component Resolution, Dot Product &amp; Resultants
            </h4>
            <p className="text-xs text-slate-400">
              Resolution into Orthogonal Components: R = Rx i + Ry j and Dot Product a · b = |a||b| cos θ
            </p>
          </div>
          <span className="rounded bg-indigo-950/80 px-2.5 py-1 text-xs font-semibold text-indigo-300 border border-indigo-800 font-mono">
            R² = Rx² + Ry²
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 580 280" className="w-full max-w-xl select-none text-xs font-sans">
            {/* Coordinate Grid Axes */}
            <line x1="50" y1="230" x2="520" y2="230" stroke="#64748b" strokeWidth="1.5" />
            <line x1="60" y1="240" x2="60" y2="30" stroke="#64748b" strokeWidth="1.5" />
            <text x="515" y="245" fill="#94a3b8" className="text-[10px] font-bold">X (Unit vector i)</text>
            <text x="40" y="35" fill="#94a3b8" className="text-[10px] font-bold">Y (j)</text>

            {/* Vector Triangle: Origin at (60, 230) */}
            {/* Horizontal Component Rx (60, 230) -> (360, 230) */}
            <line x1="60" y1="230" x2="360" y2="230" stroke="#3b82f6" strokeWidth="3" />
            <polygon points="360,230 348,225 348,235" fill="#3b82f6" />
            <text x="210" y="250" fill="#60a5fa" textAnchor="middle" className="text-[10.5px] font-mono font-bold">
              Rx = |R| cos θ  (Horizontal)
            </text>

            {/* Vertical Component Ry (360, 230) -> (360, 70) */}
            <line x1="360" y1="230" x2="360" y2="70" stroke="#10b981" strokeWidth="3" strokeDasharray="5 3" />
            <polygon points="360,70 355,82 365,82" fill="#10b981" />
            <text x="375" y="150" fill="#34d399" className="text-[10.5px] font-mono font-bold">
              Ry = |R| sin θ
            </text>

            {/* Resultant Vector R (60, 230) -> (360, 70) */}
            <line x1="60" y1="230" x2="360" y2="70" stroke="#f59e0b" strokeWidth="3.5" />
            <polygon points="360,70 347,79 354,87" fill="#f59e0b" />
            <text x="180" y="135" fill="#fbbf24" className="text-[12px] font-bold">
              R = (Rx i + Ry j)
            </text>

            {/* Angle Arc at origin */}
            <path d="M 120 230 A 60 60 0 0 0 110 203" fill="none" stroke="#facc15" strokeWidth="2" />
            <text x="130" y="218" fill="#facc15" className="text-[11px] font-bold">θ</text>

            {/* Right Angle symbol at (360, 230) */}
            <rect x="345" y="215" width="15" height="15" fill="none" stroke="#94a3b8" strokeWidth="1" />

            {/* Right side summary formulas */}
            <g transform="translate(420, 50)">
              <rect width="145" height="150" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1" />
              <text x="72" y="22" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">VECTOR RULES:</text>
              <text x="12" y="48" fill="#cbd5e1" className="text-[8.5px] font-mono">|R| = √(Rx² + Ry²)</text>
              <text x="12" y="74" fill="#cbd5e1" className="text-[8.5px] font-mono">tan θ = Ry / Rx</text>
              <text x="12" y="102" fill="#fbbf24" className="text-[8.5px] font-bold">Dot Product:</text>
              <text x="12" y="118" fill="#cbd5e1" className="text-[8.5px] font-mono">a · b = ax bx + ay by</text>
              <text x="12" y="136" fill="#a7f3d0" className="text-[8px]">If a · b = 0, a ⊥ b</text>
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
