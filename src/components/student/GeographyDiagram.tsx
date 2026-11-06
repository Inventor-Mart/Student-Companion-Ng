import React, { useState } from 'react';

export type GeographyDiagramType =
  | 'geography-earth-internal-layers'
  | 'geography-rock-cycle'
  | 'geography-volcanic-features-cross-section'
  | 'geography-river-profile-features'
  | 'geography-atmospheric-pressure-wind-belts';

interface GeographyDiagramProps {
  type: GeographyDiagramType;
  caption?: string;
}

export const GeographyDiagram: React.FC<GeographyDiagramProps> = ({ type, caption }) => {
  const [selectedLayer, setSelectedLayer] = useState<'all' | 'crust' | 'mantle' | 'core'>('all');

  // 1. Earth's Internal Layers
  if (type === 'geography-earth-internal-layers') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-emerald-400">
              Internal Structure of the Earth: Crust, Mantle &amp; Core
            </h4>
            <p className="text-xs text-slate-400">
              Concentric geospheres, composition (Sial, Sima, Nife), and seismic discontinuities
            </p>
          </div>
          <div className="flex gap-1.5">
            {[
              { id: 'all', label: 'All Layers' },
              { id: 'crust', label: 'Crust (Lithosphere)' },
              { id: 'mantle', label: 'Mantle (Mesosphere)' },
              { id: 'core', label: 'Core (Barysphere)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedLayer(tab.id as 'all' | 'crust' | 'mantle' | 'core')}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  selectedLayer === tab.id
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
            {/* Concentric Spheres Section (Center at 160, 160) */}
            {/* Outer Crust (Radius 135) */}
            <circle cx="160" cy="160" r="135" fill="#3b82f6" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="2.5" />

            {/* Mantle (Radius 120) */}
            <circle cx="160" cy="160" r="120" fill="#f59e0b" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="2" />

            {/* Outer Liquid Core (Radius 70) */}
            <circle cx="160" cy="160" r="70" fill="#ef4444" fillOpacity="0.35" stroke="#ef4444" strokeWidth="2" />

            {/* Inner Solid Core (Radius 32) */}
            <circle cx="160" cy="160" r="32" fill="#fbbf24" stroke="#fef08a" strokeWidth="2" />

            {/* Cutaway Wedge: Angle slice to show interior */}
            <path
              d="M 160 160 L 295 160 A 135 135 0 0 1 255 255 Z"
              fill="#0f172a"
              fillOpacity="0.9"
              stroke="#64748b"
              strokeWidth="1.5"
            />

            {/* Callout Lines & Labels */}
            {/* Crust: SIAL & SIMA */}
            <line x1="285" y1="135" x2="330" y2="70" stroke="#38bdf8" strokeWidth="1.5" />
            <g transform="translate(335, 55)" opacity={selectedLayer === 'mantle' || selectedLayer === 'core' ? 0.35 : 1}>
              <rect width="180" height="42" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
              <text x="10" y="16" fill="#38bdf8" fontSize="10" fontWeight="bold">1. CRUST (Lithosphere):</text>
              <text x="10" y="28" fill="#cbd5e1" fontSize="8">• Sial: Silica + Aluminium (Continents, 2.7 g/cm³)</text>
              <text x="10" y="38" fill="#cbd5e1" fontSize="8">• Sima: Silica + Magnesium (Ocean floor, 3.0 g/cm³)</text>
            </g>

            {/* Discontinuity: Moho */}
            <text x="210" y="152" fill="#fbbf24" fontSize="7" fontWeight="bold">Moho Line</text>

            {/* Mantle: Asthenosphere & Mesosphere */}
            <line x1="240" y1="180" x2="330" y2="130" stroke="#f59e0b" strokeWidth="1.5" />
            <g transform="translate(335, 115)" opacity={selectedLayer === 'crust' || selectedLayer === 'core' ? 0.35 : 1}>
              <rect width="180" height="42" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
              <text x="10" y="16" fill="#fbbf24" fontSize="10" fontWeight="bold">2. MANTLE (Mesosphere):</text>
              <text x="10" y="28" fill="#cbd5e1" fontSize="8">• Depth: ~2,900 km thick; Dense Peridotite rock</text>
              <text x="10" y="38" fill="#cbd5e1" fontSize="8">• Asthenosphere: Semi-molten plastic convection</text>
            </g>

            {/* Discontinuity: Gutenberg */}
            <text x="165" y="210" fill="#f87171" fontSize="7" fontWeight="bold">Gutenberg Line</text>

            {/* Core: Outer Liquid & Inner Solid NIFE */}
            <line x1="180" y1="180" x2="330" y2="200" stroke="#ef4444" strokeWidth="1.5" />
            <g transform="translate(335, 180)" opacity={selectedLayer === 'crust' || selectedLayer === 'mantle' ? 0.35 : 1}>
              <rect width="180" height="52" rx="4" fill="#1e293b" stroke="#ef4444" strokeWidth="1" />
              <text x="10" y="15" fill="#f87171" fontSize="10" fontWeight="bold">3. CORE (Barysphere / NIFE):</text>
              <text x="10" y="27" fill="#cbd5e1" fontSize="8">• Composition: Nickel (Ni) + Iron (Fe)</text>
              <text x="10" y="37" fill="#cbd5e1" fontSize="8">• Outer Core: Molten liquid (Magnetic field source)</text>
              <text x="10" y="47" fill="#cbd5e1" fontSize="8">• Inner Core: Solid iron-nickel sphere (5,000°C)</text>
            </g>

            {/* Bottom Summary Table Banner */}
            <g transform="translate(30, 265)">
              <rect width="480" height="38" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
              <text x="15" y="16" fill="#a7f3d0" fontSize="9" fontWeight="bold">MOHOROVIČIĆ &amp; GUTENBERG DISCONTINUITIES:</text>
              <text x="15" y="28" fill="#cbd5e1" fontSize="8">• Moho Discontinuity separates Crust from Mantle | Gutenberg Discontinuity separates Mantle from Core.</text>
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

  // 2. The Rock Cycle
  if (type === 'geography-rock-cycle') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-amber-400">
              The Geological Rock Cycle: Continuous Crustal Transformation
            </h4>
            <p className="text-xs text-slate-400">
              Transitions between Igneous, Sedimentary, and Metamorphic rocks via heat, pressure, and weathering
            </p>
          </div>
          <span className="rounded bg-amber-950/80 px-2.5 py-1 text-xs font-semibold text-amber-300 border border-amber-800">
            Endless Crustal Recycling
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 310" className="w-full max-w-xl select-none">
            <defs>
              <marker id="rockArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
              </marker>
            </defs>

            {/* Magma / Lava (Bottom Center) */}
            <g transform="translate(195, 230)">
              <rect width="150" height="50" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" />
              <text x="75" y="22" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">MAGMA &amp; LAVA</text>
              <text x="75" y="38" fill="#fecaca" fontSize="8" textAnchor="middle">Molten Silicate Mantle Slag</text>
            </g>

            {/* Igneous Rocks (Top Left) */}
            <g transform="translate(40, 30)">
              <rect width="150" height="65" rx="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="75" y="22" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">IGNEOUS ROCKS</text>
              <text x="75" y="36" fill="#cbd5e1" fontSize="8" textAnchor="middle">Crystalline; No Fossils</text>
              <text x="75" y="48" fill="#94a3b8" fontSize="8" textAnchor="middle">Granite, Basalt, Pumice</text>
              <rect x="25" y="52" width="100" height="10" rx="2" fill="#1e3a8a" />
              <text x="75" y="59" fill="#bfdbfe" fontSize="7" fontWeight="bold" textAnchor="middle">PRIMARY ROCKS</text>
            </g>

            {/* Sedimentary Rocks (Top Right) */}
            <g transform="translate(350, 30)">
              <rect width="150" height="65" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <text x="75" y="22" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">SEDIMENTARY ROCKS</text>
              <text x="75" y="36" fill="#cbd5e1" fontSize="8" textAnchor="middle">Stratified Strata; Contains Fossils</text>
              <text x="75" y="48" fill="#94a3b8" fontSize="8" textAnchor="middle">Sandstone, Limestone, Coal</text>
              <rect x="25" y="52" width="100" height="10" rx="2" fill="#065f46" />
              <text x="75" y="59" fill="#a7f3d0" fontSize="7" fontWeight="bold" textAnchor="middle">SECONDARY ROCKS</text>
            </g>

            {/* Metamorphic Rocks (Middle Center) */}
            <g transform="translate(195, 130)">
              <rect width="150" height="60" rx="6" fill="#1e293b" stroke="#ec4899" strokeWidth="2" />
              <text x="75" y="22" fill="#f472b6" fontSize="11" fontWeight="bold" textAnchor="middle">METAMORPHIC ROCKS</text>
              <text x="75" y="36" fill="#cbd5e1" fontSize="8" textAnchor="middle">Foliated / Recrystallized</text>
              <text x="75" y="48" fill="#94a3b8" fontSize="8" textAnchor="middle">Marble, Slate, Gneiss, Quartzite</text>
            </g>

            {/* Transition Path 1: Magma -> Igneous (Cooling & Solidification) */}
            <path d="M 195 245 Q 90 220 90 95" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#rockArrow)" />
            <text x="60" y="170" fill="#f87171" fontSize="8" fontWeight="bold" transform="rotate(-70, 60, 170)">Cooling &amp; Crystallization</text>

            {/* Transition Path 2: Igneous -> Sedimentary (Weathering, Erosion, Lithification) */}
            <line x1="190" y1="50" x2="345" y2="50" stroke="#10b981" strokeWidth="2" markerEnd="url(#rockArrow)" />
            <text x="270" y="42" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">Weathering, Deposition &amp; Lithification</text>

            {/* Transition Path 3: Sedimentary -> Metamorphic (Intense Heat & Pressure) */}
            <line x1="400" y1="95" x2="330" y2="135" stroke="#ec4899" strokeWidth="2" markerEnd="url(#rockArrow)" />
            <text x="400" y="125" fill="#f472b6" fontSize="8" fontWeight="bold">Heat &amp; Pressure</text>

            {/* Transition Path 4: Metamorphic -> Magma (Melting) */}
            <line x1="270" y1="190" x2="270" y2="225" stroke="#ef4444" strokeWidth="2" markerEnd="url(#rockArrow)" />
            <text x="278" y="212" fill="#fca5a5" fontSize="8" fontWeight="bold">Melting</text>

            {/* Igneous to Metamorphic direct line */}
            <line x1="150" y1="95" x2="200" y2="135" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#rockArrow)" />
            <text x="145" y="125" fill="#f472b6" fontSize="8">Heat &amp; Pressure</text>
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

  // 3. Volcanic Features Cross-Section
  if (type === 'geography-volcanic-features-cross-section') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-rose-400">
              Vulcanicity: Intrusive &amp; Extrusive Landform Architecture
            </h4>
            <p className="text-xs text-slate-400">
              Cross-section showing Batholiths, Sills, Dykes, Laccoliths, and Composite Volcanoes
            </p>
          </div>
          <span className="rounded bg-rose-950/80 px-2.5 py-1 text-xs font-semibold text-rose-300 border border-rose-800">
            Plutonic vs. Volcanic Structures
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 310" className="w-full max-w-xl select-none">
            {/* Ground surface and Volcano cone */}
            {/* Strata layers */}
            <rect x="30" y="150" width="480" height="25" fill="#334155" opacity="0.4" />
            <rect x="30" y="175" width="480" height="35" fill="#1e293b" opacity="0.6" />
            <rect x="30" y="210" width="480" height="60" fill="#0f172a" opacity="0.8" />

            {/* Volcano Mountain (Extrusive cone) */}
            <polygon points="270,40 160,150 380,150" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Crater at top */}
            <polygon points="260,40 270,55 280,40" fill="#0f172a" />
            <text x="270" y="32" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">Crater / Vent</text>

            {/* Magma Chamber (Batholith at bottom center) */}
            <path
              d="M 180 270 Q 270 230 360 270 Q 380 300 270 300 Q 160 300 180 270 Z"
              fill="#ef4444"
              stroke="#b91c1c"
              strokeWidth="2"
            />
            <text x="270" y="285" fill="#fef2f2" fontSize="11" fontWeight="bold" textAnchor="middle">BATHOLITH (Magma Chamber)</text>

            {/* Main Central Vent */}
            <line x1="270" y1="240" x2="270" y2="45" stroke="#ef4444" strokeWidth="8" />

            {/* Horizontal SILL (Concordant intrusion along bedding planes) */}
            <rect x="100" y="160" width="120" height="10" rx="2" fill="#ef4444" />
            <text x="150" y="155" fill="#fbbf24" fontSize="9" fontWeight="bold">SILL (Horizontal)</text>

            {/* Vertical DYKE (Discordant intrusion cutting across strata) */}
            <line x1="370" y1="250" x2="350" y2="155" stroke="#ef4444" strokeWidth="8" />
            <text x="375" y="195" fill="#fbbf24" fontSize="9" fontWeight="bold">DYKE (Vertical)</text>

            {/* Dome-shaped LACCOLITH */}
            <path d="M 330 185 Q 390 155 450 185 Z" fill="#ef4444" />
            <text x="390" y="178" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">LACCOLITH (Mushroom Dome)</text>

            {/* Labels and distinction card */}
            <g transform="translate(30, 275)">
              <rect width="480" height="30" rx="5" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="12" y="19" fill="#38bdf8" fontSize="9" fontWeight="bold">CONCORDANT VS. DISCORDANT:</text>
              <text x="175" y="19" fill="#cbd5e1" fontSize="8">• Sill: Parallel to rock bedding planes | Dyke: Cuts vertically across rock strata.</text>
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

  // 4. River Long Profile & Characteristic Features
  if (type === 'geography-river-profile-features') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-sky-400">
              The Long Profile of a River: Upper, Middle &amp; Lower Stages
            </h4>
            <p className="text-xs text-slate-400">
              Erosion, transportation, and depositional landforms from mountain source to ocean mouth
            </p>
          </div>
          <span className="rounded bg-sky-950/80 px-2.5 py-1 text-xs font-semibold text-sky-300 border border-sky-800">
            Base Level of Erosion
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 540 300" className="w-full max-w-xl select-none">
            {/* Mountain to Ocean Profile Curve */}
            <path
              d="M 40 40 Q 140 180 280 220 Q 400 240 500 250 L 500 280 L 40 280 Z"
              fill="#1e293b"
              stroke="#64748b"
              strokeWidth="1.5"
            />

            {/* River Flow Water Line */}
            <path
              d="M 40 40 Q 140 180 280 220 Q 400 240 500 250"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="4"
            />

            {/* Stage 1: Upper Course (Youthful Stage) */}
            <g transform="translate(45, 60)">
              <rect width="130" height="60" rx="4" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
              <text x="10" y="16" fill="#60a5fa" fontSize="9" fontWeight="bold">1. UPPER (Youthful):</text>
              <text x="10" y="28" fill="#cbd5e1" fontSize="8">• Dominant: Vertical erosion</text>
              <text x="10" y="38" fill="#cbd5e1" fontSize="8">• V-shaped valleys, Gorges</text>
              <text x="10" y="48" fill="#cbd5e1" fontSize="8">• Waterfalls, Interlocking spurs</text>
            </g>

            {/* Stage 2: Middle Course (Mature Stage) */}
            <g transform="translate(195, 120)">
              <rect width="135" height="60" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
              <text x="10" y="16" fill="#34d399" fontSize="9" fontWeight="bold">2. MIDDLE (Mature):</text>
              <text x="10" y="28" fill="#cbd5e1" fontSize="8">• Dominant: Lateral erosion</text>
              <text x="10" y="38" fill="#cbd5e1" fontSize="8">• River transportation (Traction)</text>
              <text x="10" y="48" fill="#cbd5e1" fontSize="8">• U-shaped valleys, Meanders</text>
            </g>

            {/* Stage 3: Lower Course (Old Age Stage) */}
            <g transform="translate(355, 165)">
              <rect width="140" height="60" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
              <text x="10" y="16" fill="#fbbf24" fontSize="9" fontWeight="bold">3. LOWER (Old Age):</text>
              <text x="10" y="28" fill="#cbd5e1" fontSize="8">• Dominant: Deposition</text>
              <text x="10" y="38" fill="#cbd5e1" fontSize="8">• Ox-bow lakes, Flood plains</text>
              <text x="10" y="48" fill="#cbd5e1" fontSize="8">• Natural levees, Arcuate Deltas</text>
            </g>

            {/* Ocean Mouth */}
            <text x="475" y="240" fill="#38bdf8" fontSize="11" fontWeight="bold">SEA / DELTA</text>

            {/* Bottom Summary Banner */}
            <g transform="translate(30, 245)">
              <rect width="480" height="45" rx="5" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="12" y="18" fill="#38bdf8" fontSize="10" fontWeight="bold">DRAINAGE BASIN SUMMARY:</text>
              <text x="12" y="32" fill="#cbd5e1" fontSize="8">Upper Stage erodes vertically; Middle Stage widens valleys through meanders; Lower Stage deposits alluvium to form fertile agricultural flood plains and deltas (e.g. Niger Delta).</text>
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

  // 5. Planetary Winds & Global Atmospheric Pressure Belts
  if (type === 'geography-atmospheric-pressure-wind-belts') {
    return (
      <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-emerald-400">
              Planetary Wind Systems &amp; Global Atmospheric Pressure Belts
            </h4>
            <p className="text-xs text-slate-400">
              Tri-cellular circulation, Coriolis deflection, and the Inter-Tropical Discontinuity (ITD) in West Africa
            </p>
          </div>
          <span className="rounded bg-emerald-950/80 px-2.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-800">
            Climatology · ITD &amp; Trade Winds
          </span>
        </div>

        <div className="relative mt-4 flex justify-center overflow-x-auto py-2">
          <svg viewBox="0 0 620 280" className="w-full max-w-2xl select-none text-xs font-sans">
            {/* Global Hemispheric Cross-Section */}
            {/* 1. North Polar High (90°N) */}
            <g transform="translate(40, 20)">
              <rect width="540" height="28" rx="4" fill="#0369a1" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="1" />
              <text x="70" y="18" fill="#38bdf8" className="text-[10px] font-bold">90°N POLAR HIGH (Cold Dense Air)</text>
              <text x="350" y="18" fill="#cbd5e1" className="text-[9px]">Polar Easterlies (Deflected right by Coriolis)</text>
            </g>

            {/* 2. Sub-Polar Low (60°N) */}
            <g transform="translate(40, 52)">
              <rect width="540" height="28" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
              <text x="70" y="18" fill="#e2e8f0" className="text-[10px] font-bold">60°N SUB-POLAR LOW (Rising Air)</text>
              <text x="350" y="18" fill="#facc15" className="text-[9px]">South-Westerlies (Warm oceanic winds)</text>
            </g>

            {/* 3. Sub-Tropical High (30°N) - Horse Latitudes */}
            <g transform="translate(40, 84)">
              <rect width="540" height="34" rx="4" fill="#ca8a04" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1" />
              <text x="70" y="21" fill="#fbbf24" className="text-[10px] font-bold">30°N SUB-TROPICAL HIGH (Horse Latitudes)</text>
              <text x="350" y="21" fill="#fca5a5" className="text-[9px]">North-East Trade Winds (Dry Harmattan to Nigeria)</text>
            </g>

            {/* 4. EQUATORIAL LOW / ITCZ / DOLDRUMS (0°) - Highlighted */}
            <g transform="translate(30, 122)">
              <rect width="560" height="42" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
              <text x="80" y="22" fill="#34d399" className="text-[11px] font-bold">0° EQUATORIAL LOW (Doldrums / ITCZ / ITD)</text>
              <text x="80" y="34" fill="#a7f3d0" className="text-[8.5px]">Intense solar insolation; low pressure trough where NE and SW trade winds converge.</text>
              <rect x="440" y="8" width="105" height="26" rx="4" fill="#022c22" stroke="#34d399" strokeWidth="1" />
              <text x="492" y="25" fill="#34d399" textAnchor="middle" className="text-[9px] font-bold">HEAVY CONVECTION</text>
            </g>

            {/* 5. Sub-Tropical High (30°S) */}
            <g transform="translate(40, 168)">
              <rect width="540" height="34" rx="4" fill="#ca8a04" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1" />
              <text x="70" y="21" fill="#fbbf24" className="text-[10px] font-bold">30°S SUB-TROPICAL HIGH</text>
              <text x="350" y="21" fill="#38bdf8" className="text-[9px]">South-East Trade Winds (Crosses equator as SW Monsoon)</text>
            </g>

            {/* 6. Sub-Polar Low (60°S) */}
            <g transform="translate(40, 206)">
              <rect width="540" height="28" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
              <text x="70" y="18" fill="#e2e8f0" className="text-[10px] font-bold">60°S SUB-POLAR LOW</text>
              <text x="350" y="18" fill="#cbd5e1" className="text-[9px]">North-Westerlies (Roaring Forties)</text>
            </g>

            {/* Bottom Nigerian Climate Link */}
            <g transform="translate(40, 242)">
              <rect width="540" height="30" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
              <text x="270" y="19" fill="#38bdf8" textAnchor="middle" className="text-[9px] font-medium">
                West African Climate: When the ITD shifts North (July), SW Monsoon brings rains; when ITD shifts South (Jan), NE Trades bring dusty Harmattan.
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

  return null;
};
