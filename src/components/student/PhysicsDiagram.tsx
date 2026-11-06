import React from 'react';
import { Eye, Info, Sun, Thermometer, Compass, Sliders } from 'lucide-react';

export type PhysicsDiagramType =
  | 'bimetallic-strip-thermostat'
  | 'pinhole-camera-eclipse'
  | 'plane-mirror-reflection'
  | 'concave-mirror-rays'
  | 'refraction-total-internal-reflection'
  | 'block-and-tackle-pulley'
  | 'transverse-wave-properties'
  | 'convex-lens-ray-diagram'
  | 'physics-ac-rlc-resonance'
  | 'physics-photoelectric-work-function';

interface PhysicsDiagramProps {
  type: PhysicsDiagramType;
}

export const PhysicsDiagram: React.FC<PhysicsDiagramProps> = ({ type }) => {
  switch (type) {
    // ----------------------------------------------------
    // 1. BIMETALLIC STRIP THERMOSTAT (THERMAL EXPANSION)
    // ----------------------------------------------------
    case 'bimetallic-strip-thermostat':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Thermometer className="w-4 h-4 text-amber-400" />
              <span>Bimetallic Strip & Thermostat Circuit Control</span>
            </div>
            <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60 font-medium">
              Thermal Expansion · Linear Expansivity (α_brass &gt; α_iron)
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 340" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              <line x1="310" y1="20" x2="310" y2="300" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* LEFT: COLD / RESTING STATE (STRAIGHT) */}
              <text x="155" y="30" fill="#38bdf8" textAnchor="middle" className="text-[12px] font-bold">1. AT ROOM TEMPERATURE (COLD)</text>
              <text x="155" y="45" fill="#4ade80" textAnchor="middle" className="text-[9px] font-bold">Contact Closed · Electric Heater ON</text>

              {/* Rigid Support Wall */}
              <rect x="35" y="80" width="18" height="150" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
              {[95, 125, 155, 185, 215].map(y => (
                <line key={y} x1="35" y1={y} x2="25" y2={y + 10} stroke="#94a3b8" strokeWidth="1.5" />
              ))}

              {/* Top Strip: Brass (Gold) */}
              <rect x="53" y="110" width="180" height="16" fill="#ca8a04" stroke="#facc15" strokeWidth="1.5" />
              <text x="140" y="122" fill="#ffffff" textAnchor="middle" className="text-[10px] font-bold">BRASS (Higher α = 19 × 10⁻⁶ K⁻¹)</text>

              {/* Bottom Strip: Iron / Invar (Silver) */}
              <rect x="53" y="126" width="180" height="16" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
              <text x="140" y="138" fill="#e2e8f0" textAnchor="middle" className="text-[10px] font-bold">IRON (Lower α = 12 × 10⁻⁶ K⁻¹)</text>

              {/* Contact Point at Free Tip */}
              <circle cx="233" cy="126" r="6" fill="#facc15" stroke="#eab308" strokeWidth="2" />
              <line x1="239" y1="126" x2="275" y2="126" stroke="#facc15" strokeWidth="3" />
              <rect x="275" y="116" width="12" height="20" rx="3" fill="#10b981" />
              <text x="255" y="110" fill="#4ade80" textAnchor="middle" className="text-[9px] font-bold">Contact MADE</text>

              {/* Electrical circuit diagram lines */}
              <path d="M 45 126 L 45 220 L 281 220 L 281 136" stroke="#facc15" strokeWidth="2" fill="none" strokeDasharray="5 3" />
              <circle cx="160" cy="220" r="14" fill="#1e293b" stroke="#facc15" strokeWidth="1.5" />
              <text x="160" y="224" fill="#facc15" textAnchor="middle" className="text-[9px] font-bold font-mono">LOAD</text>

              <text x="155" y="275" fill="#cbd5e1" textAnchor="middle" className="text-[10px]">Both metals equal length at room temperature</text>

              {/* RIGHT: HEATED STATE (CURVED DOWNWARD) */}
              <text x="465" y="30" fill="#f43f5e" textAnchor="middle" className="text-[12px] font-bold">2. WHEN HEATED (EXPANDS & BENDS)</text>
              <text x="465" y="45" fill="#f87171" textAnchor="middle" className="text-[9px] font-bold">Contact Broken · Circuit OFF (Thermostat)</text>

              {/* Rigid Support Wall */}
              <rect x="345" y="80" width="18" height="150" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
              {[95, 125, 155, 185, 215].map(y => (
                <line key={y} x1="345" y1={y} x2="335" y2={y + 10} stroke="#94a3b8" strokeWidth="1.5" />
              ))}

              {/* Curved Brass (Outer arc - expands more) */}
              <path d="M 363 110 Q 460 110 525 170 L 515 182 Q 455 126 363 126 Z" fill="#ca8a04" stroke="#facc15" strokeWidth="1.5" />
              <text x="440" y="115" fill="#facc15" className="text-[10px] font-bold">Brass expands MORE</text>

              {/* Curved Iron (Inner arc - expands less) */}
              <path d="M 363 126 Q 455 126 515 182 L 505 194 Q 450 142 363 142 Z" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
              <text x="420" y="165" fill="#94a3b8" className="text-[9px] font-bold">Iron on inside curve</text>

              {/* Separated Contact Tip (Gap) */}
              <circle cx="510" cy="188" r="6" fill="#f87171" stroke="#dc2626" strokeWidth="2" />
              <line x1="565" y1="126" x2="585" y2="126" stroke="#64748b" strokeWidth="3" />
              <rect x="585" y="116" width="12" height="20" rx="3" fill="#64748b" />
              <text x="548" y="145" fill="#f87171" textAnchor="middle" className="text-[9px] font-bold">GAP (Circuit Broken)</text>
              <line x1="516" y1="188" x2="560" y2="130" stroke="#f87171" strokeWidth="1" strokeDasharray="3 2" />

              {/* Heat indicator flames */}
              <path d="M 430 200 Q 435 180 440 200 Z" fill="#f97316" />
              <path d="M 445 205 Q 450 185 455 205 Z" fill="#facc15" />
              <text x="465" y="235" fill="#f59e0b" textAnchor="middle" className="text-[10px] font-bold">Heat Applied (Δθ &gt; 0)</text>

              <text x="465" y="275" fill="#cbd5e1" textAnchor="middle" className="text-[10px]">Strips bend with the higher expansivity metal on the outside arc</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>WAEC Core Law:</strong> When heated, a bimetallic strip always bends so that the metal with the <em>higher linear expansivity</em> forms the outer (convex) curve. When cooled below room temperature, it bends in the opposite direction.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 2. PINHOLE CAMERA GEOMETRY & ECLIPSES
    // ----------------------------------------------------
    case 'pinhole-camera-eclipse':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Sun className="w-4 h-4 text-yellow-400" />
              <span>Rectilinear Propagation: Pinhole Camera Optics</span>
            </div>
            <span className="text-[10px] text-yellow-400 bg-yellow-950/60 px-2 py-0.5 rounded border border-yellow-800/60 font-medium">
              Geometrical Optics · Linear Magnification (m = v/u)
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 340" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* Ground reference line */}
              <line x1="30" y1="260" x2="590" y2="260" stroke="#334155" strokeWidth="1.5" />

              {/* Luminous Object (Candle Flame) on Left */}
              <g transform="translate(80, 260)">
                {/* Candle body */}
                <rect x="-8" y="-120" width="16" height="120" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" rx="2" />
                {/* Candle wick */}
                <line x1="0" y1="-120" x2="0" y2="-130" stroke="#475569" strokeWidth="2" />
                {/* Flame (Top of object: A) */}
                <path d="M -8 -130 Q 0 -170 0 -170 Q 0 -170 8 -130 Z" fill="#facc15" stroke="#f59e0b" strokeWidth="1.5" />
                <circle cx="0" cy="-140" r="4" fill="#f97316" />
                <text x="0" y="-178" fill="#facc15" textAnchor="middle" className="text-[11px] font-bold">A (Object Tip)</text>
                <text x="0" y="16" fill="#94a3b8" textAnchor="middle" className="text-[11px] font-bold">B (Base)</text>
                <text x="-25" y="-60" fill="#facc15" textAnchor="middle" className="text-[10px] font-bold" transform="rotate(-90 -25 -60)">Height h_o</text>
              </g>

              {/* Pinhole Camera Box (Darkened Chamber) */}
              <rect x="270" y="80" width="240" height="180" fill="#0b1329" stroke="#475569" strokeWidth="2" rx="4" />
              {/* Front Plate with Small Pinhole */}
              <line x1="270" y1="80" x2="270" y2="165" stroke="#94a3b8" strokeWidth="4" />
              <line x1="270" y1="175" x2="270" y2="260" stroke="#94a3b8" strokeWidth="4" />
              <circle cx="270" cy="170" r="3" fill="#f8fafc" />
              <text x="270" y="68" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">Pinhole (Aperture)</text>

              {/* Translucent Frosted Glass Screen (Back of Camera) */}
              <rect x="500" y="85" width="6" height="170" fill="#38bdf8" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="1" />
              <text x="515" y="75" fill="#38bdf8" className="text-[10px] font-bold">Screen</text>

              {/* RAY 1: Top of flame through pinhole to screen (Straight line) */}
              <line x1="80" y1="90" x2="500" y2="225" stroke="#facc15" strokeWidth="2" />
              <polygon points="275,172 265,168 268,175" fill="#facc15" />
              <circle cx="500" cy="225" r="4" fill="#facc15" />
              <text x="515" y="230" fill="#facc15" className="text-[10px] font-bold">A' (Inverted Tip)</text>

              {/* RAY 2: Base of candle through pinhole to screen */}
              <line x1="80" y1="260" x2="500" y2="105" stroke="#38bdf8" strokeWidth="2" />
              <polygon points="275,168 265,172 268,165" fill="#38bdf8" />
              <circle cx="500" cy="105" r="4" fill="#38bdf8" />
              <text x="515" y="110" fill="#38bdf8" className="text-[10px] font-bold">B' (Base Image)</text>

              {/* Inverted Candle Image on Screen */}
              <g transform="translate(500, 105)">
                <rect x="-3" y="0" width="6" height="85" fill="#94a3b8" />
                <path d="M -6 85 Q 0 120 0 120 Q 0 120 6 85 Z" fill="#facc15" stroke="#f59e0b" strokeWidth="1" />
                <text x="35" y="65" fill="#facc15" className="text-[10px] font-bold">Height h_i</text>
              </g>

              {/* Dimension: Object Distance (u) */}
              <line x1="80" y1="290" x2="270" y2="290" stroke="#cbd5e1" strokeWidth="1.5" />
              <polygon points="85,287 85,293 80,290" fill="#cbd5e1" />
              <polygon points="265,287 265,293 270,290" fill="#cbd5e1" />
              <text x="175" y="305" fill="#cbd5e1" textAnchor="middle" className="text-[10px] font-bold">Object Distance u (cm)</text>

              {/* Dimension: Image Distance (v = camera length) */}
              <line x1="270" y1="290" x2="500" y2="290" stroke="#38bdf8" strokeWidth="1.5" />
              <polygon points="275,287 275,293 270,290" fill="#38bdf8" />
              <polygon points="495,287 495,293 500,290" fill="#38bdf8" />
              <text x="385" y="305" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">Image Distance v (cm)</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-yellow-400 shrink-0" />
            <span>
              <strong>Pinhole Camera Properties:</strong> Produces a <em>real, inverted</em> image based on the rectilinear propagation of light. Magnification M = v / u = hᵢ / hₒ. Widening the pinhole makes the image <em>brighter but blurred</em> because overlapping images are produced.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 3. REFLECTION AT PLANE SURFACES & MIRROR ROTATION
    // ----------------------------------------------------
    case 'plane-mirror-reflection':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Laws of Reflection & Mirror Rotation (θ → 2θ)</span>
            </div>
            <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60 font-medium">
              Plane Mirrors · Normal Line (i = r)
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 340" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* Plane Mirror Base */}
              <rect x="100" y="240" width="420" height="8" fill="#64748b" rx="2" />
              {/* Silvered backing hatching */}
              {[120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480, 510].map(x => (
                <line key={x} x1={x} y1="248" x2={x - 12} y2="260" stroke="#475569" strokeWidth="1.5" />
              ))}
              <text x="310" y="275" fill="#94a3b8" textAnchor="middle" className="text-[10px] font-bold">SILVERED PLANE MIRROR SURFACE</text>

              {/* Point of Incidence O */}
              <circle cx="310" cy="240" r="4" fill="#facc15" />
              <text x="310" y="232" fill="#facc15" textAnchor="middle" className="text-[9px] font-bold">Point of Incidence (O)</text>

              {/* Normal Line (Perpendicular 90°) */}
              <line x1="310" y1="240" x2="310" y2="40" stroke="#10b981" strokeWidth="2" strokeDasharray="5 3" />
              <text x="315" y="45" fill="#34d399" className="text-[11px] font-bold">NORMAL (N)</text>
              {/* 90° symbol */}
              <path d="M 310 220 L 330 220 L 330 240" stroke="#10b981" strokeWidth="1.5" fill="none" />

              {/* INCIDENT RAY (Yellow) */}
              <line x1="130" y1="60" x2="310" y2="240" stroke="#facc15" strokeWidth="3" />
              {/* Arrow on incident ray */}
              <polygon points="215,145 228,148 223,158" fill="#facc15" />
              <text x="140" y="55" fill="#facc15" className="text-[11px] font-bold">Incident Ray</text>

              {/* REFLECTED RAY (Cyan) */}
              <line x1="310" y1="240" x2="490" y2="60" stroke="#38bdf8" strokeWidth="3" />
              {/* Arrow on reflected ray */}
              <polygon points="405,145 400,158 412,154" fill="#38bdf8" />
              <text x="460" y="55" fill="#38bdf8" className="text-[11px] font-bold">Reflected Ray</text>

              {/* Angle of Incidence i */}
              <path d="M 270 200 Q 290 190 310 190" stroke="#facc15" strokeWidth="2" fill="none" />
              <text x="280" y="180" fill="#facc15" className="text-[12px] font-bold">∠ i</text>

              {/* Angle of Reflection r */}
              <path d="M 310 190 Q 330 190 350 200" stroke="#38bdf8" strokeWidth="2" fill="none" />
              <text x="330" y="180" fill="#38bdf8" className="text-[12px] font-bold">∠ r</text>

              {/* Rule Card Box */}
              <rect x="370" y="90" width="230" height="90" rx="8" fill="#0b1329" stroke="#1e293b" strokeWidth="1.5" />
              <text x="485" y="112" fill="#f8fafc" textAnchor="middle" className="text-[10px] font-bold">Key Laws of Reflection</text>
              <line x1="390" y1="120" x2="580" y2="120" stroke="#334155" strokeWidth="1" />
              <text x="485" y="136" fill="#34d399" textAnchor="middle" className="text-[11px] font-mono font-bold">
                Angle i = Angle r
              </text>
              <text x="485" y="152" fill="#38bdf8" textAnchor="middle" className="text-[9px]">
                Incident ray, normal & reflected ray
              </text>
              <text x="485" y="165" fill="#38bdf8" textAnchor="middle" className="text-[9px]">
                all lie in the same plane.
              </text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>Mirror Rotation Theorem:</strong> If a plane mirror is rotated through an angle $\\theta$ while the incident ray direction remains fixed, the reflected ray rotates through an angle of <strong>$2\\theta$</strong>.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 4. REFLECTION AT CONCAVE CURVED MIRROR
    // ----------------------------------------------------
    case 'concave-mirror-rays':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Eye className="w-4 h-4 text-rose-400" />
              <span>Spherical Concave Mirror: Ray Tracing & Real Image Formation</span>
            </div>
            <span className="text-[10px] text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/60 font-medium">
              Curved Mirrors · Object Beyond C
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 340" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* Principal Axis (Horizontal centerline) */}
              <line x1="30" y1="170" x2="570" y2="170" stroke="#64748b" strokeWidth="1.5" />
              <text x="40" y="160" fill="#94a3b8" className="text-[10px] font-bold">Principal Axis</text>

              {/* Concave Mirror Arc */}
              <path d="M 520 40 Q 480 170 520 300" fill="none" stroke="#38bdf8" strokeWidth="4" />
              {/* Back silvering hatches */}
              {[60, 90, 120, 150, 180, 210, 240, 270].map(y => (
                <line key={y} x1="510" y1={y} x2="525" y2={y - 8} stroke="#475569" strokeWidth="1.5" />
              ))}

              {/* Pole P */}
              <circle cx="493" cy="170" r="4" fill="#38bdf8" />
              <text x="495" y="190" fill="#38bdf8" className="text-[11px] font-bold">P (Pole)</text>

              {/* Focus F (f = r/2) */}
              <circle cx="370" cy="170" r="4" fill="#facc15" />
              <text x="370" y="190" fill="#facc15" textAnchor="middle" className="text-[11px] font-bold">F (Focus)</text>

              {/* Center of Curvature C (r = 2f) */}
              <circle cx="250" cy="170" r="4" fill="#10b981" />
              <text x="250" y="190" fill="#10b981" textAnchor="middle" className="text-[11px] font-bold">C (Center)</text>

              {/* Object AB (Beyond C) - Upright Arrow */}
              <line x1="130" y1="170" x2="130" y2="70" stroke="#facc15" strokeWidth="3" />
              <polygon points="125,75 135,75 130,65" fill="#facc15" />
              <text x="130" y="55" fill="#facc15" textAnchor="middle" className="text-[11px] font-bold">Object (A)</text>
              <text x="130" y="190" fill="#facc15" textAnchor="middle" className="text-[10px] font-bold">B</text>

              {/* RAY 1: Parallel to principal axis, reflects through focus F */}
              <line x1="130" y1="70" x2="497" y2="70" stroke="#facc15" strokeWidth="2" />
              <polygon points="320,67 320,73 328,70" fill="#facc15" />
              <line x1="497" y1="70" x2="290" y2="240" stroke="#38bdf8" strokeWidth="2" />
              <polygon points="390,158 395,153 388,150" fill="#38bdf8" />

              {/* RAY 2: Passes through center of curvature C, reflects back along own path */}
              <line x1="130" y1="70" x2="505" y2="220" stroke="#10b981" strokeWidth="2" />
              <polygon points="205,100 200,105 207,108" fill="#10b981" />

              {/* Intersection creates Image A'B' between C and F */}
              {/* Intersection point is at approx x=325, y=210 */}
              <line x1="325" y1="170" x2="325" y2="210" stroke="#f43f5e" strokeWidth="3" />
              <polygon points="320,205 330,205 325,215" fill="#f43f5e" />
              <text x="325" y="235" fill="#fb7185" textAnchor="middle" className="text-[10px] font-bold">Image (A'B')</text>

              {/* Focal length dimension f */}
              <line x1="370" y1="300" x2="493" y2="300" stroke="#facc15" strokeWidth="1.5" />
              <polygon points="375,297 375,303 370,300" fill="#facc15" />
              <polygon points="488,297 488,303 493,300" fill="#facc15" />
              <text x="430" y="315" fill="#facc15" textAnchor="middle" className="text-[9px] font-bold">Focal Length f = r/2</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-rose-400 shrink-0" />
            <span>
              <strong>Object Beyond C Image Characteristics:</strong> When an object is placed beyond the center of curvature ($C$), the concave mirror forms a <strong>real, inverted, and diminished</strong> image situated between $C$ and $F$.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 5. REFRACTION & TOTAL INTERNAL REFLECTION
    // ----------------------------------------------------
    case 'refraction-total-internal-reflection':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Refraction, Critical Angle & Total Internal Reflection (TIR)</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 font-medium">
              Snell's Law · Dense to Rare Medium (sin C = 1/n)
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 340" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* Boundary between Media */}
              <line x1="30" y1="160" x2="590" y2="160" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="50" y="145" fill="#94a3b8" className="text-[10px] font-bold">LESS DENSE MEDIUM: AIR (n₁ = 1.0)</text>
              <text x="50" y="180" fill="#38bdf8" className="text-[10px] font-bold">DENSE MEDIUM: GLASS / WATER (n₂ &gt; 1.0)</text>
              <rect x="30" y="160" width="560" height="150" fill="#0284c7" fillOpacity="0.15" />

              {/* CASE 1: Standard Refraction (i < C) */}
              <g transform="translate(120, 160)">
                <line x1="0" y1="-120" x2="0" y2="120" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="-50" y1="110" x2="0" y2="0" stroke="#facc15" strokeWidth="2.5" />
                <line x1="0" y1="0" x2="80" y2="-100" stroke="#38bdf8" strokeWidth="2.5" />
                <text x="0" y="-130" fill="#cbd5e1" textAnchor="middle" className="text-[9px] font-bold">Case 1: i &lt; C</text>
                <text x="0" y="135" fill="#94a3b8" textAnchor="middle" className="text-[8px]">Refracts away from normal</text>
              </g>

              {/* CASE 2: Critical Angle (i = C, r = 90°) */}
              <g transform="translate(310, 160)">
                <line x1="0" y1="-120" x2="0" y2="120" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="-75" y1="100" x2="0" y2="0" stroke="#facc15" strokeWidth="2.5" />
                {/* Refracted ray runs along boundary */}
                <line x1="0" y1="0" x2="110" y2="0" stroke="#f43f5e" strokeWidth="3.5" />
                <polygon points="105,-4 115,0 105,4" fill="#f43f5e" />
                <text x="0" y="-130" fill="#facc15" textAnchor="middle" className="text-[9px] font-bold">Case 2: i = Critical Angle (C)</text>
                <text x="0" y="135" fill="#facc15" textAnchor="middle" className="text-[8px]">r = 90° along interface</text>
              </g>

              {/* CASE 3: Total Internal Reflection (i > C) */}
              <g transform="translate(500, 160)">
                <line x1="0" y1="-120" x2="0" y2="120" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="-80" y1="90" x2="0" y2="0" stroke="#facc15" strokeWidth="2.5" />
                {/* Totally reflected internally into same medium */}
                <line x1="0" y1="0" x2="80" y2="90" stroke="#34d399" strokeWidth="3" />
                <polygon points="65,70 78,85 62,80" fill="#34d399" />
                <text x="0" y="-130" fill="#34d399" textAnchor="middle" className="text-[9px] font-bold">Case 3: i &gt; C (TIR)</text>
                <text x="0" y="135" fill="#34d399" textAnchor="middle" className="text-[8px]">100% reflected back into glass</text>
              </g>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Two Essential Conditions for Total Internal Reflection:</strong> 1) Light must travel from a <em>denser medium</em> toward a <em>less dense medium</em>. 2) The angle of incidence ($i$) must be <em>greater than the critical angle ($C$)</em> for that pair of media (sin C = 1 / n).
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 6. BLOCK AND TACKLE PULLEY SYSTEM (VR = 4)
    // ----------------------------------------------------
    case 'block-and-tackle-pulley':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Sliders className="w-4 h-4 text-sky-400" />
              <span>Simple Machines: Block and Tackle Pulley System (VR = 4)</span>
            </div>
            <span className="text-[10px] text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60 font-medium">
              Mechanical Advantage & Efficiency (MA = L/E, VR = n)
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 350" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              {/* Overhead Rigid Beam */}
              <rect x="180" y="20" width="160" height="12" fill="#475569" rx="2" />
              <line x1="260" y1="32" x2="260" y2="50" stroke="#94a3b8" strokeWidth="4" />

              {/* TOP FIXED BLOCK (Contains 2 Sheaves) */}
              <rect x="235" y="50" width="50" height="70" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" rx="4" />
              <circle cx="260" cy="70" r="18" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="260" cy="100" r="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <text x="310" y="80" fill="#38bdf8" className="text-[10px] font-bold">Top Block</text>
              <text x="310" y="92" fill="#94a3b8" className="text-[8px]">(2 Fixed Sheaves)</text>

              {/* BOTTOM MOVABLE BLOCK (Contains 2 Sheaves) */}
              <rect x="235" y="190" width="50" height="70" fill="#1e293b" stroke="#10b981" strokeWidth="2" rx="4" />
              <circle cx="260" cy="210" r="18" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
              <circle cx="260" cy="240" r="14" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
              <text x="310" y="220" fill="#10b981" className="text-[10px] font-bold">Bottom Block</text>
              <text x="310" y="232" fill="#94a3b8" className="text-[8px]">(2 Movable Sheaves)</text>

              {/* CONTINUOUS ROPE (Tension T on each supporting strand) */}
              {/* Strand 1 (Fixed to bottom block, goes up to top sheave) */}
              <line x1="245" y1="120" x2="245" y2="190" stroke="#facc15" strokeWidth="2.5" />
              <text x="230" y="155" fill="#facc15" className="text-[9px] font-bold">T₁</text>

              {/* Strand 2 */}
              <line x1="255" y1="120" x2="255" y2="190" stroke="#facc15" strokeWidth="2.5" />
              <text x="250" y="155" fill="#facc15" className="text-[9px] font-bold">T₂</text>

              {/* Strand 3 */}
              <line x1="265" y1="120" x2="265" y2="190" stroke="#facc15" strokeWidth="2.5" />
              <text x="260" y="155" fill="#facc15" className="text-[9px] font-bold">T₃</text>

              {/* Strand 4 */}
              <line x1="275" y1="120" x2="275" y2="190" stroke="#facc15" strokeWidth="2.5" />
              <text x="280" y="155" fill="#facc15" className="text-[9px] font-bold">T₄</text>

              {/* Effort Strand (Pulling down) */}
              <line x1="285" y1="70" x2="360" y2="230" stroke="#f43f5e" strokeWidth="2.5" />
              <polygon points="360,230 352,222 364,222" fill="#f43f5e" />
              <circle cx="360" cy="235" r="4" fill="#f43f5e" />
              <text x="375" y="235" fill="#f43f5e" className="text-[11px] font-bold">Effort (E)</text>
              <text x="375" y="247" fill="#94a3b8" className="text-[8px]">(Pulled downwards)</text>

              {/* LOAD (Suspended below movable block) */}
              <line x1="260" y1="260" x2="260" y2="280" stroke="#94a3b8" strokeWidth="3" />
              <rect x="230" y="280" width="60" height="40" rx="4" fill="#334155" stroke="#facc15" strokeWidth="2" />
              <text x="260" y="305" fill="#facc15" textAnchor="middle" className="text-[12px] font-bold">LOAD (L)</text>

              {/* Mathematical Formulation Box on Right */}
              <rect x="420" y="55" width="180" height="150" rx="8" fill="#0b1329" stroke="#1e293b" strokeWidth="1.5" />
              <text x="510" y="78" fill="#f8fafc" textAnchor="middle" className="text-[11px] font-bold">Machine Formulas</text>
              <line x1="435" y1="88" x2="585" y2="88" stroke="#334155" strokeWidth="1" />
              <text x="440" y="110" fill="#38bdf8" className="text-[10px] font-bold">VR = Total Sheaves = 4</text>
              <text x="440" y="130" fill="#34d399" className="text-[10px] font-bold">MA = Load ÷ Effort</text>
              <text x="440" y="150" fill="#facc15" className="text-[10px] font-bold">Efficiency (η):</text>
              <text x="440" y="168" fill="#facc15" className="text-[10px] font-mono">η = (MA ÷ VR) × 100%</text>
              <text x="440" y="190" fill="#94a3b8" className="text-[8px]">In practice, η &lt; 100% due to</text>
              <text x="440" y="200" fill="#94a3b8" className="text-[8px]">friction and pulley weight</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
            <span>
              <strong>WAEC Machine Rule:</strong> In an ideal frictionless block and tackle pulley system, the velocity ratio ($VR$) equals the total number of pulleys in both blocks ($VR = 4$). The efficiency is always less than $100\\%$ because work must be done against friction and to lift the lower movable block.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 7. TRANSVERSE WAVE PROFILE & PARAMETERS
    // ----------------------------------------------------
    case 'transverse-wave-properties':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Transverse Wave Anatomy: Wavelength (λ), Amplitude (A), Crest & Trough</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 font-medium">
              Wave Mechanics · v = fλ
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 600 280" className="w-full max-w-xl mx-auto min-w-[440px] text-xs font-sans">
              {/* Equilibrium Line */}
              <line x1="40" y1="140" x2="560" y2="140" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="565" y="144" fill="#64748b" className="text-[9px]">Equilibrium Axis</text>

              {/* Y Axis (Displacement) */}
              <line x1="60" y1="20" x2="60" y2="260" stroke="#94a3b8" strokeWidth="1.5" />
              <text x="55" y="15" fill="#cbd5e1" textAnchor="end" className="text-[9px] font-bold">+Displacement (y)</text>
              <text x="55" y="265" fill="#cbd5e1" textAnchor="end" className="text-[9px] font-bold">-Displacement</text>

              {/* Sine Wave Curve (2 full cycles) */}
              <path
                d="M 60 140 Q 120 40 180 140 T 300 140 T 420 140 T 540 140"
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
              />

              {/* Crest Points */}
              <circle cx="120" cy="90" r="4" fill="#38bdf8" />
              <text x="120" y="75" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">Crest 1</text>
              <circle cx="360" cy="90" r="4" fill="#38bdf8" />
              <text x="360" y="75" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">Crest 2</text>

              {/* Trough Points */}
              <circle cx="240" cy="190" r="4" fill="#f43f5e" />
              <text x="240" y="210" fill="#f43f5e" textAnchor="middle" className="text-[10px] font-bold">Trough 1</text>
              <circle cx="480" cy="190" r="4" fill="#f43f5e" />
              <text x="480" y="210" fill="#f43f5e" textAnchor="middle" className="text-[10px] font-bold">Trough 2</text>

              {/* Wavelength Arrow between successive crests */}
              <line x1="120" y1="45" x2="360" y2="45" stroke="#fbbf24" strokeWidth="2" />
              <polygon points="120,45 128,42 128,48" fill="#fbbf24" />
              <polygon points="360,45 352,42 352,48" fill="#fbbf24" />
              <text x="240" y="38" fill="#fbbf24" textAnchor="middle" className="text-[10px] font-extrabold">Wavelength (λ = distance between successive crests)</text>

              {/* Amplitude (A) Indicator */}
              <line x1="120" y1="140" x2="120" y2="90" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" />
              <text x="130" y="120" fill="#38bdf8" className="text-[9px] font-bold">Amplitude (A)</text>

              {/* Propagation direction arrow */}
              <line x1="380" y1="245" x2="520" y2="245" stroke="#94a3b8" strokeWidth="2" />
              <polygon points="525,245 515,240 515,250" fill="#94a3b8" />
              <text x="450" y="260" fill="#94a3b8" textAnchor="middle" className="text-[9px]">Wave Propagation Direction →</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Golden Wave Equation:</strong> The velocity of any wave is given by v = fλ, where v is wave speed (m/s), f is frequency (Hz), and λ is wavelength (meters). In a transverse wave, particles oscillate perpendicular to the direction of wave travel.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 8. CONVEX (CONVERGING) LENS RAY DIAGRAM
    // ----------------------------------------------------
    case 'convex-lens-ray-diagram':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Eye className="w-4 h-4 text-sky-400" />
              <span>Convex Lens Ray Tracing: Real, Inverted & Diminished Image (Object Beyond 2F)</span>
            </div>
            <span className="text-[10px] text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60 font-medium">
              Geometrical Optics · 1/f = 1/u + 1/v
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 600 270" className="w-full max-w-xl mx-auto min-w-[440px] text-xs font-sans">
              {/* Principal Axis */}
              <line x1="20" y1="135" x2="580" y2="135" stroke="#64748b" strokeWidth="1.5" />
              <text x="575" y="150" fill="#64748b" className="text-[9px]">Principal Axis</text>

              {/* Convex Lens Body */}
              <path d="M 300 25 C 320 70 320 200 300 245 C 280 200 280 70 300 25 Z" fill="#0284c7" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="2" />
              <line x1="300" y1="20" x2="300" y2="250" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
              <text x="300" y="15" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">Convex Lens</text>

              {/* Optical Center O */}
              <circle cx="300" cy="135" r="3" fill="#ffffff" />
              <text x="295" y="150" fill="#ffffff" className="text-[9px] font-bold">O</text>

              {/* Focal Points and 2F Points */}
              {/* Left F and 2F */}
              <circle cx="210" cy="135" r="3" fill="#cbd5e1" />
              <text x="210" y="150" fill="#cbd5e1" textAnchor="middle" className="text-[9px] font-bold">F₁</text>
              <circle cx="120" cy="135" r="3" fill="#cbd5e1" />
              <text x="120" y="150" fill="#cbd5e1" textAnchor="middle" className="text-[9px] font-bold">2F₁</text>

              {/* Right F and 2F */}
              <circle cx="390" cy="135" r="3" fill="#cbd5e1" />
              <text x="390" y="150" fill="#cbd5e1" textAnchor="middle" className="text-[9px] font-bold">F₂</text>
              <circle cx="480" cy="135" r="3" fill="#cbd5e1" />
              <text x="480" y="150" fill="#cbd5e1" textAnchor="middle" className="text-[9px] font-bold">2F₂</text>

              {/* Object AB (Beyond 2F1: at x = 70, height = 70) */}
              <line x1="70" y1="135" x2="70" y2="65" stroke="#f59e0b" strokeWidth="3" />
              <polygon points="70,60 66,70 74,70" fill="#f59e0b" />
              <text x="65" y="55" fill="#f59e0b" className="text-[10px] font-bold">Object (u &gt; 2f)</text>

              {/* Ray 1: Parallel to axis, refracts through F2 */}
              <line x1="70" y1="65" x2="300" y2="65" stroke="#f43f5e" strokeWidth="2" />
              <line x1="300" y1="65" x2="520" y2="200" stroke="#f43f5e" strokeWidth="2" />

              {/* Ray 2: Passes undeviated through optical center O */}
              <line x1="70" y1="65" x2="520" y2="195" stroke="#38bdf8" strokeWidth="2" />

              {/* Image A'B' (Formed between F2 and 2F2: at x = 430, height = -35) */}
              <line x1="432" y1="135" x2="432" y2="170" stroke="#10b981" strokeWidth="3" />
              <polygon points="432,175 428,165 436,165" fill="#10b981" />
              <text x="440" y="190" fill="#10b981" className="text-[10px] font-bold">Real, Inverted Image</text>
              <text x="440" y="202" fill="#a7f3d0" className="text-[8px]">Diminished (Between F and 2F)</text>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
            <span>
              <strong>Lens Formula & Sign Convention (Real-is-Positive):</strong> 1/f = 1/u + 1/v, where f is positive for convex lenses and negative for concave lenses. When u &gt; 2f, the image formed is real, inverted, diminished, and situated between f and 2f on the opposite side.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 9. ALTERNATING CURRENT (AC) RLC CIRCUIT & RESONANCE
    // ----------------------------------------------------
    case 'physics-ac-rlc-resonance':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Alternating Current: Series RLC Impedance &amp; Electrical Resonance</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 font-medium">
              WAEC Electrodynamics · Weeks 1 &amp; 2
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 310" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              <rect x="10" y="10" width="600" height="290" fill="#0b1120" stroke="#1e293b" rx="10" />

              {/* Left Panel: Circuit & Impedance Phasor Triangle */}
              <g transform="translate(25, 25)">
                <rect x="0" y="0" width="270" height="255" fill="#1e293b" stroke="#334155" rx="8" />
                <text x="135" y="20" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-bold">Impedance Phasor Triangle</text>

                {/* Phasor Right Triangle */}
                <g transform="translate(40, 50)">
                  {/* Base: Resistance R */}
                  <line x1="20" y1="120" x2="160" y2="120" stroke="#38bdf8" strokeWidth="3" />
                  <text x="90" y="138" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-bold">Resistance (R)</text>

                  {/* Vertical: Net Reactance (XL - XC) */}
                  <line x1="160" y1="120" x2="160" y2="30" stroke="#f43f5e" strokeWidth="3" />
                  <text x="170" y="75" fill="#f43f5e" className="text-[10px] font-bold">X_L - X_C</text>

                  {/* Hypotenuse: Total Impedance Z */}
                  <line x1="20" y1="120" x2="160" y2="30" stroke="#10b981" strokeWidth="3.5" />
                  <text x="75" y="65" fill="#10b981" className="text-[11px] font-bold">Impedance (Z)</text>

                  {/* Phase Angle phi */}
                  <path d="M 50 120 A 30 30 0 0 0 45 105" fill="none" stroke="#f59e0b" strokeWidth="2" />
                  <text x="56" y="112" fill="#f59e0b" className="text-[10px] font-bold">φ</text>

                  {/* Right Angle Symbol */}
                  <polyline points="150,120 150,110 160,110" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                </g>

                {/* Impedance Formula Badge */}
                <g transform="translate(15, 190)">
                  <rect x="0" y="0" width="240" height="50" fill="#0f172a" stroke="#10b981" strokeWidth="1.2" rx="6" />
                  <text x="120" y="18" fill="#10b981" textAnchor="middle" className="text-[10px] font-bold">Z = √[R² + (X_L - X_C)²]</text>
                  <text x="120" y="36" fill="#fef08a" textAnchor="middle" className="text-[9px]">X_L = 2πfL (Inductive) · X_C = 1/(2πfC) (Capacitive)</text>
                </g>
              </g>

              {/* Right Panel: Sharp Electrical Resonance Curve */}
              <g transform="translate(325, 25)">
                <rect x="0" y="0" width="270" height="255" fill="#1e293b" stroke="#334155" rx="8" />
                <text x="135" y="20" fill="#fbbf24" textAnchor="middle" className="text-[11px] font-bold">Electrical Resonance Peak</text>

                {/* Axes */}
                <line x1="40" y1="200" x2="250" y2="200" stroke="#64748b" strokeWidth="1.5" />
                <line x1="40" y1="200" x2="40" y2="40" stroke="#64748b" strokeWidth="1.5" />
                <text x="145" y="218" fill="#94a3b8" textAnchor="middle" className="text-[9px]">Frequency (f in Hz)</text>
                <text x="15" y="120" fill="#94a3b8" textAnchor="middle" transform="rotate(-90 15 120)" className="text-[9px]">Current I_rms (Amperes)</text>

                {/* Bell-shaped Resonance Curve */}
                <path
                  d="M 50 190 Q 110 185, 130 130 Q 145 50, 150 48 Q 155 50, 170 130 Q 190 185, 250 190"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                />

                {/* Peak Point: Resonance Frequency f0 */}
                <circle cx="150" cy="48" r="4.5" fill="#f59e0b" />
                <line x1="150" y1="48" x2="150" y2="200" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="150" y="38" fill="#f59e0b" textAnchor="middle" className="text-[10px] font-bold">I_max = V / R</text>
                <text x="150" y="232" fill="#f59e0b" textAnchor="middle" className="text-[10px] font-bold">f₀ (Resonant Frequency)</text>

                {/* Resonance Conditions Callout */}
                <g transform="translate(15, 75)">
                  <rect x="0" y="0" width="120" height="70" fill="#0f172a" stroke="#334155" rx="6" />
                  <text x="60" y="16" fill="#38bdf8" textAnchor="middle" className="text-[9px] font-bold uppercase">At Resonance:</text>
                  <text x="60" y="30" fill="#e2e8f0" textAnchor="middle" className="text-[8px]">1. X_L = X_C</text>
                  <text x="60" y="44" fill="#a7f3d0" textAnchor="middle" className="text-[8px] font-bold">2. Z_min = R</text>
                  <text x="60" y="58" fill="#fef08a" textAnchor="middle" className="text-[8px] font-bold">3. Current I is MAX</text>
                </g>

                {/* Formula */}
                <rect x="30" y="155" width="95" height="35" fill="#1e293b" rx="4" />
                <text x="77" y="170" fill="#cbd5e1" textAnchor="middle" className="text-[8px]">Resonant Eq:</text>
                <text x="77" y="184" fill="#38bdf8" textAnchor="middle" className="text-[9px] font-bold">f₀ = 1 / (2π√LC)</text>
              </g>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Radio Tuning Principle:</strong> When tuning a radio receiver, adjusting the variable capacitor aligns the circuit&apos;s natural resonant frequency (f₀ = 1 / [2π√(LC)]) with the carrier frequency of the broadcast station, maximizing received signal current.
            </span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 10. PHOTOELECTRIC EFFECT & WORK FUNCTION
    // ----------------------------------------------------
    case 'physics-photoelectric-work-function':
      return (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Quantum Physics: The Photoelectric Effect &amp; Einstein&apos;s Equation</span>
            </div>
            <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60 font-medium">
              WAEC Quantum Physics · Weeks 4 &amp; 5
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 620 300" className="w-full max-w-2xl mx-auto min-w-[480px] text-xs font-sans">
              <rect x="10" y="10" width="600" height="280" fill="#0b1120" stroke="#1e293b" rx="10" />

              {/* Quartz Evacuated Glass Envelope */}
              <ellipse cx="280" cy="110" rx="190" ry="75" fill="#0f172a" stroke="#475569" strokeWidth="2" strokeDasharray="8 2" />
              <text x="280" y="48" fill="#94a3b8" textAnchor="middle" className="text-[10px] font-bold uppercase tracking-wider">Evacuated Quartz Glass Tube</text>

              {/* Photosensitive Metal Cathode (-) */}
              <rect x="140" y="65" width="16" height="90" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" rx="3" />
              <text x="125" y="115" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold" transform="rotate(-90 125 115)">Photosensitive Emitter (Cathode)</text>

              {/* Anode Collector (+) */}
              <rect x="400" y="65" width="16" height="90" fill="#10b981" stroke="#34d399" strokeWidth="2" rx="3" />
              <text x="425" y="115" fill="#34d399" textAnchor="middle" className="text-[10px] font-bold" transform="rotate(-90 425 115)">Collector (Anode)</text>

              {/* Incident Light Photons (hf) */}
              <g stroke="#f59e0b" strokeWidth="2" fill="none">
                <path d="M 60 70 Q 80 60, 100 70 T 140 70" />
                <path d="M 60 95 Q 80 85, 100 95 T 140 95" />
                <path d="M 60 120 Q 80 110, 100 120 T 140 120" />
              </g>
              <polygon points="140,70 132,66 132,74" fill="#f59e0b" />
              <polygon points="140,95 132,91 132,99" fill="#f59e0b" />
              <polygon points="140,120 132,116 132,124" fill="#f59e0b" />
              <text x="80" y="55" fill="#f59e0b" className="text-[11px] font-bold">Incident Photons (E = hf)</text>

              {/* Emitted Photoelectrons (e-) fleeing toward collector */}
              <g transform="translate(165, 80)">
                <circle cx="20" cy="10" r="5" fill="#f43f5e" />
                <text x="20" y="13" fill="#ffffff" textAnchor="middle" className="text-[8px] font-bold">-</text>
                <line x1="26" y1="10" x2="65" y2="10" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />
                <polygon points="70,10 63,7 63,13" fill="#f43f5e" />

                <circle cx="45" cy="35" r="5" fill="#f43f5e" />
                <text x="45" y="38" fill="#ffffff" textAnchor="middle" className="text-[8px] font-bold">-</text>
                <line x1="51" y1="35" x2="90" y2="35" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />
                <polygon points="95,35 88,32 88,38" fill="#f43f5e" />

                <circle cx="80" cy="18" r="5" fill="#f43f5e" />
                <text x="80" y="21" fill="#ffffff" textAnchor="middle" className="text-[8px] font-bold">-</text>
                <line x1="86" y1="18" x2="135" y2="18" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />
                <polygon points="140,18 133,15 133,21" fill="#f43f5e" />
              </g>
              <text x="280" y="125" fill="#fca5a5" textAnchor="middle" className="text-[10px] font-bold">
                Photoelectrons: Ek = ½mv²_max
              </text>

              {/* External Circuit with Microammeter and Variable Voltage */}
              <line x1="148" y1="155" x2="148" y2="230" stroke="#64748b" strokeWidth="2" />
              <line x1="148" y1="230" x2="230" y2="230" stroke="#64748b" strokeWidth="2" />

              {/* Microammeter */}
              <circle cx="250" cy="230" r="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="250" y="234" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">μA</text>

              <line x1="266" y1="230" x2="330" y2="230" stroke="#64748b" strokeWidth="2" />

              {/* Variable Voltage Source / Stopping Potential */}
              <line x1="330" y1="220" x2="330" y2="240" stroke="#f59e0b" strokeWidth="2" />
              <line x1="338" y1="212" x2="338" y2="248" stroke="#f59e0b" strokeWidth="3" />
              <text x="334" y="262" fill="#f59e0b" textAnchor="middle" className="text-[9px]">Stopping Potential (Vs)</text>

              <line x1="338" y1="230" x2="408" y2="230" stroke="#64748b" strokeWidth="2" />
              <line x1="408" y1="230" x2="408" y2="155" stroke="#64748b" strokeWidth="2" />

              {/* Einstein's Photoelectric Equation Box */}
              <g transform="translate(450, 40)">
                <rect x="0" y="0" width="145" height="110" fill="#1e293b" stroke="#334155" rx="6" />
                <text x="72" y="18" fill="#fbbf24" textAnchor="middle" className="text-[9px] font-bold uppercase">Einstein&apos;s Law:</text>
                <text x="72" y="36" fill="#10b981" textAnchor="middle" className="text-[10px] font-bold">E = W₀ + Ek</text>
                <text x="72" y="52" fill="#f8fafc" textAnchor="middle" className="text-[9px]">hf = hf₀ + ½mv²</text>
                <line x1="10" y1="60" x2="135" y2="60" stroke="#475569" strokeWidth="1" />
                <text x="12" y="74" fill="#cbd5e1" className="text-[8px]">W₀: Work Function</text>
                <text x="12" y="86" fill="#cbd5e1" className="text-[8px]">f₀: Threshold Freq</text>
                <text x="12" y="98" fill="#38bdf8" className="text-[8px] font-bold">Ek_max = e · Vs</text>
              </g>
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Quantum Law of Photoelectricity:</strong> Photoelectrons are emitted <em>instantaneously</em> only when the incident radiation frequency exceeds the threshold frequency ($f &gt; f_0$). Light intensity dictates the <em>number</em> of photoelectrons emitted per second, but does NOT affect their maximum kinetic energy.
            </span>
          </div>
        </div>
      );

    default:
      return null;
  }
};

