import React, { useState } from 'react';

export type EconomicsDiagramType =
  | 'economics-demand-supply-equilibrium'
  | 'economics-production-possibility-curve'
  | 'economics-cost-curves-anatomy'
  | 'economics-utility-diminishing-marginal';

interface EconomicsDiagramProps {
  type: EconomicsDiagramType;
  caption?: string;
}

export const EconomicsDiagram: React.FC<EconomicsDiagramProps> = ({ type, caption }) => {
  const [activeTab, setActiveTab] = useState<string>('equilibrium');

  // 1. Demand, Supply & Market Equilibrium
  if (type === 'economics-demand-supply-equilibrium') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-emerald-400">
              Market Price Determination: Demand, Supply & Equilibrium
            </h4>
            <p className="text-xs text-slate-400">
              Intersection of Market Demand (Qd) and Market Supply (Qs) at Price Pe and Quantity Qe
            </p>
          </div>
          <div className="flex gap-1.5">
            {[
              { id: 'equilibrium', label: 'Equilibrium (Pe, Qe)' },
              { id: 'surplus', label: 'Surplus (P > Pe)' },
              { id: 'shortage', label: 'Shortage (P < Pe)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  activeTab === tab.id
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
          <svg viewBox="0 0 540 330" className="w-full max-w-xl select-none">
            <defs>
              <marker id="econArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Grid */}
            <g stroke="#334155" strokeWidth="0.5" strokeDasharray="3,3">
              {[80, 160, 240, 320, 400, 480].map(x => (
                <line key={x} x1={x} y1="30" x2={x} y2="270" />
              ))}
              {[70, 120, 170, 220].map(y => (
                <line key={y} x1="50" y1={y} x2="490" y2={y} />
              ))}
            </g>

            {/* Axes */}
            {/* Horizontal Axis: Quantity (Q) */}
            <line x1="70" y1="270" x2="500" y2="270" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#econArrow)" />
            <text x="495" y="262" fill="#cbd5e1" fontSize="12" fontWeight="600">Quantity (Q)</text>
            <text x="65" y="285" fill="#94a3b8" fontSize="11">0</text>

            {/* Vertical Axis: Price (P in ₦) */}
            <line x1="70" y1="270" x2="70" y2="30" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#econArrow)" />
            <text x="25" y="40" fill="#cbd5e1" fontSize="12" fontWeight="600">Price (₦)</text>

            {/* Demand Curve (Downward sloping from (110, 60) to (430, 250)) */}
            <line x1="100" y1="60" x2="440" y2="250" stroke="#ef4444" strokeWidth="3" />
            <text x="445" y="255" fill="#f87171" fontSize="13" fontWeight="bold">D (Demand)</text>
            <text x="95" y="52" fill="#f87171" fontSize="11">Law of Demand: P ↑ ⇒ Qd ↓</text>

            {/* Supply Curve (Upward sloping from (100, 250) to (440, 60)) */}
            <line x1="100" y1="250" x2="440" y2="60" stroke="#3b82f6" strokeWidth="3" />
            <text x="445" y="65" fill="#60a5fa" fontSize="13" fontWeight="bold">S (Supply)</text>
            <text x="80" y="262" fill="#60a5fa" fontSize="10">Law of Supply: P ↑ ⇒ Qs ↑</text>

            {/* Equilibrium Point E at (270, 155) */}
            <line x1="70" y1="155" x2="270" y2="155" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4,4" />
            <line x1="270" y1="155" x2="270" y2="270" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4,4" />

            <circle cx="270" cy="155" r="6" fill="#10b981" stroke="#0f172a" strokeWidth="2" />
            <text x="280" y="150" fill="#34d399" fontSize="12" fontWeight="bold">E (Qd = Qs)</text>
            <text x="35" y="160" fill="#34d399" fontSize="12" fontWeight="bold">Pe</text>
            <text x="262" y="286" fill="#34d399" fontSize="12" fontWeight="bold">Qe</text>

            {/* Surplus Visualization (P > Pe, e.g. at P = 100) */}
            {activeTab === 'surplus' && (
              <g>
                <line x1="70" y1="105" x2="400" y2="105" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" />
                <circle cx="178" cy="105" r="4" fill="#ef4444" />
                <circle cx="360" cy="105" r="4" fill="#3b82f6" />
                <line x1="178" y1="105" x2="360" y2="105" stroke="#f59e0b" strokeWidth="3" />
                <rect x="220" y="85" width="105" height="18" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
                <text x="227" y="98" fill="#fbbf24" fontSize="10" fontWeight="bold">SURPLUS (Qs &gt; Qd)</text>
                <text x="32" y="110" fill="#fbbf24" fontSize="11" fontWeight="bold">P_high</text>
              </g>
            )}

            {/* Shortage Visualization (P < Pe, e.g. at P = 205) */}
            {activeTab === 'shortage' && (
              <g>
                <line x1="70" y1="205" x2="400" y2="205" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="3,3" />
                <circle cx="180" cy="205" r="4" fill="#3b82f6" />
                <circle cx="360" cy="205" r="4" fill="#ef4444" />
                <line x1="180" y1="205" x2="360" y2="205" stroke="#ec4899" strokeWidth="3" />
                <rect x="215" y="212" width="115" height="18" rx="4" fill="#1e293b" stroke="#ec4899" strokeWidth="1" />
                <text x="222" y="225" fill="#f472b6" fontSize="10" fontWeight="bold">SHORTAGE (Qd &gt; Qs)</text>
                <text x="35" y="210" fill="#f472b6" fontSize="11" fontWeight="bold">P_low</text>
              </g>
            )}

            {/* Side Formula Box */}
            <g transform="translate(14, 290)">
              <rect width="510" height="34" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="12" y="22" fill="#94a3b8" fontSize="11" fontWeight="bold">MARKET EQUILIBRIUM:</text>
              <text x="160" y="22" fill="#34d399" fontSize="11">Qd(P) = Qs(P)</text>
              <text x="270" y="22" fill="#f1f5f9" fontSize="11">Price Elasticity: Ed = (%ΔQd) / (%ΔP)</text>
              <text x="460" y="22" fill="#a7f3d0" fontSize="11">WAEC Core</text>
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

  // 2. Production Possibility Curve (PPC / PPF)
  if (type === 'economics-production-possibility-curve') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-amber-400">
              Production Possibility Curve (PPC) & Opportunity Cost
            </h4>
            <p className="text-xs text-slate-400">
              Scarcity, choice, and trade-off between Capital Goods and Consumer Goods with fixed resources
            </p>
          </div>
          <span className="rounded bg-amber-950/80 px-2.5 py-1 text-xs font-semibold text-amber-300 border border-amber-800">
            Concave to Origin (Law of Increasing Costs)
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 320" className="w-full max-w-xl select-none">
            <defs>
              <marker id="ppcArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" />
              </marker>
              <linearGradient id="ppcFill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Axes */}
            <line x1="80" y1="260" x2="500" y2="260" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ppcArrow)" />
            <text x="400" y="280" fill="#cbd5e1" fontSize="12" fontWeight="600">Consumer Goods (Food/Clothing)</text>
            <text x="75" y="278" fill="#94a3b8" fontSize="11">0</text>

            <line x1="80" y1="260" x2="80" y2="30" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ppcArrow)" />
            <text x="25" y="25" fill="#cbd5e1" fontSize="12" fontWeight="600">Capital Goods (Machinery)</text>

            {/* Shaded Feasible Production Region */}
            <path
              d="M 80 50 Q 220 70 340 160 Q 400 210 440 260 L 80 260 Z"
              fill="url(#ppcFill)"
            />

            {/* PPC Curve: Concave to origin */}
            <path
              d="M 80 50 Q 220 70 340 160 Q 400 210 440 260"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3.5"
            />

            {/* Points on Curve (Efficient Production) */}
            {/* Point A */}
            <circle cx="160" cy="75" r="5" fill="#10b981" stroke="#0f172a" strokeWidth="2" />
            <text x="170" y="73" fill="#34d399" fontSize="11" fontWeight="bold">Point A (More Capital Goods)</text>

            {/* Point B */}
            <circle cx="340" cy="160" r="5" fill="#10b981" stroke="#0f172a" strokeWidth="2" />
            <text x="350" y="155" fill="#34d399" fontSize="11" fontWeight="bold">Point B (Balanced Mix)</text>

            {/* Movement from A to B showing Opportunity Cost */}
            <path d="M 175 85 Q 260 115 325 150" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#ppcArrow)" />
            <text x="230" y="125" fill="#38bdf8" fontSize="10" fontWeight="bold">Opportunity Cost: Forgo Capital to gain Consumer</text>

            {/* Point U (Inside - Inefficient / Underutilized) */}
            <circle cx="210" cy="190" r="5" fill="#f87171" stroke="#0f172a" strokeWidth="2" />
            <text x="220" y="195" fill="#f87171" fontSize="11" fontWeight="bold">Point U: Inefficient (Unemployment/Waste)</text>

            {/* Point X (Outside - Unattainable) */}
            <circle cx="410" cy="100" r="5" fill="#a855f7" stroke="#0f172a" strokeWidth="2" />
            <text x="360" y="90" fill="#c084fc" fontSize="11" fontWeight="bold">Point X: Unattainable (Current Tech/Resources)</text>

            {/* Legend & Concept Card */}
            <g transform="translate(90, 285)">
              <rect width="420" height="30" rx="5" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="12" y="19" fill="#fbbf24" fontSize="10" fontWeight="bold">CONCAVITY CAUSE:</text>
              <text x="130" y="19" fill="#cbd5e1" fontSize="10">Resources are not perfectly adaptable to all industries (Increasing Marginal Cost).</text>
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

  // 3. Cost Curves Anatomy: MC, ATC, AVC, AFC
  if (type === 'economics-cost-curves-anatomy') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-sky-400">
              Short-Run Theory of Cost: MC, ATC, AVC & AFC Curves
            </h4>
            <p className="text-xs text-slate-400">
              U-shaped cost behavior governed by the Law of Diminishing Returns; MC cuts ATC & AVC at their minimums
            </p>
          </div>
          <span className="rounded bg-sky-950/80 px-2.5 py-1 text-xs font-semibold text-sky-300 border border-sky-800">
            MC cuts ATC & AVC at Minima
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 320" className="w-full max-w-xl select-none">
            <defs>
              <marker id="costArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Axes */}
            <line x1="60" y1="260" x2="500" y2="260" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#costArrow)" />
            <text x="430" y="280" fill="#cbd5e1" fontSize="12" fontWeight="600">Output / Quantity (Q)</text>
            <text x="55" y="275" fill="#94a3b8" fontSize="11">0</text>

            <line x1="60" y1="260" x2="60" y2="30" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#costArrow)" />
            <text x="15" y="25" fill="#cbd5e1" fontSize="12" fontWeight="600">Cost (₦)</text>

            {/* AFC: Asymptotic hyperbola approaching both axes */}
            <path
              d="M 90 70 Q 140 200 450 245"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <text x="455" y="250" fill="#cbd5e1" fontSize="11" fontWeight="bold">AFC = TFC/Q</text>

            {/* AVC: U-shaped, minimum around (240, 180) */}
            <path
              d="M 100 210 Q 240 180 440 140"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
            />
            <text x="445" y="145" fill="#fbbf24" fontSize="12" fontWeight="bold">AVC</text>

            {/* ATC (AC): U-shaped, above AVC, minimum around (290, 130) */}
            <path
              d="M 100 160 Q 290 130 450 75"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3"
            />
            <text x="455" y="80" fill="#38bdf8" fontSize="13" fontWeight="bold">ATC (AC)</text>

            {/* MC: Hook shaped (Nike swoosh), intersects AVC at (240, 180) and ATC at (290, 130) */}
            <path
              d="M 90 230 Q 160 250 240 180 Q 290 130 400 45"
              fill="none"
              stroke="#10b981"
              strokeWidth="3.5"
            />
            <text x="405" y="45" fill="#34d399" fontSize="13" fontWeight="bold">MC (Marginal Cost)</text>

            {/* Intersection dots */}
            {/* Min AVC */}
            <circle cx="240" cy="180" r="5" fill="#f59e0b" stroke="#0f172a" strokeWidth="2" />
            <text x="160" y="175" fill="#fbbf24" fontSize="10" fontWeight="bold">Min. AVC (Shutdown)</text>

            {/* Min ATC */}
            <circle cx="290" cy="130" r="5.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
            <text x="210" y="115" fill="#38bdf8" fontSize="10" fontWeight="bold">Min. ATC (Break-even)</text>

            {/* Formulas Card */}
            <g transform="translate(60, 285)">
              <rect width="450" height="30" rx="5" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="15" y="19" fill="#94a3b8" fontSize="10" fontWeight="bold">COST IDENTITIES:</text>
              <text x="120" y="19" fill="#f1f5f9" fontSize="10">TC = TFC + TVC</text>
              <text x="230" y="19" fill="#38bdf8" fontSize="10">ATC = AFC + AVC</text>
              <text x="350" y="19" fill="#34d399" fontSize="10">MC = ΔTC / ΔQ</text>
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

  // 4. Utility: Law of Diminishing Marginal Utility
  if (type === 'economics-utility-diminishing-marginal') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-purple-400">
              Consumer Theory: Total Utility (TU) & Marginal Utility (MU)
            </h4>
            <p className="text-xs text-slate-400">
              Law of Diminishing Marginal Utility: As consumption increases, MU falls; TU peaks when MU = 0
            </p>
          </div>
          <span className="rounded bg-purple-950/80 px-2.5 py-1 text-xs font-semibold text-purple-300 border border-purple-800">
            Point of Satiety (MU = 0)
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 320" className="w-full max-w-xl select-none">
            <defs>
              <marker id="utilArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Zero Utility Line (horizontal axis at y = 230) */}
            <line x1="60" y1="230" x2="500" y2="230" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#utilArrow)" />
            <text x="430" y="248" fill="#cbd5e1" fontSize="12" fontWeight="600">Quantity Consumed (Q)</text>
            <text x="55" y="245" fill="#94a3b8" fontSize="11">0</text>

            <line x1="60" y1="280" x2="60" y2="25" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#utilArrow)" />
            <text x="15" y="25" fill="#cbd5e1" fontSize="12" fontWeight="600">Utility (Utils)</text>

            {/* Total Utility (TU) Curve: Inverted parabola peaking at Q = 310, y = 60 */}
            <path
              d="M 60 230 Q 180 80 310 60 Q 400 70 460 120"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3.5"
            />
            <text x="465" y="125" fill="#38bdf8" fontSize="13" fontWeight="bold">TU (Total Utility)</text>

            {/* Marginal Utility (MU) Curve: Downward sloping, cuts axis at Q = 310, becomes negative */}
            <line x1="80" y1="70" x2="440" y2="280" stroke="#ec4899" strokeWidth="3" />
            <text x="445" y="285" fill="#f472b6" fontSize="13" fontWeight="bold">MU (Marginal Utility)</text>

            {/* Point of Saturation / Satiety (Q = 310) */}
            <line x1="310" y1="60" x2="310" y2="230" stroke="#f59e0b" strokeWidth="1.75" strokeDasharray="4,4" />
            <circle cx="310" cy="60" r="5.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
            <text x="250" y="48" fill="#fcd34d" fontSize="11" fontWeight="bold">Max TU (Peak Utility)</text>

            <circle cx="310" cy="230" r="5.5" fill="#ec4899" stroke="#0f172a" strokeWidth="2" />
            <text x="318" y="222" fill="#f472b6" fontSize="11" fontWeight="bold">MU = 0 (Point of Satiety)</text>

            {/* Disutility zone: Q > 310 where MU < 0 */}
            <rect x="310" y="230" width="130" height="40" fill="#ef4444" fillOpacity="0.12" />
            <text x="330" y="260" fill="#f87171" fontSize="10" fontWeight="bold">Disutility Zone (MU &lt; 0)</text>

            {/* Summary Identity Box */}
            <g transform="translate(60, 285)">
              <rect width="450" height="30" rx="5" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="12" y="19" fill="#94a3b8" fontSize="10" fontWeight="bold">WAEC RULE:</text>
              <text x="95" y="19" fill="#38bdf8" fontSize="10">TU is at Maximum when MU = 0.</text>
              <text x="285" y="19" fill="#f472b6" fontSize="10">Consumer Equilibrium: MUx/Px = MUy/Py</text>
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
