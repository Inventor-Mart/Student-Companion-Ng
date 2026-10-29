export interface FormulaItem {
  id: string;
  name: string;
  formula: string;
  variables: { symbol: string; meaning: string; unit?: string }[];
  description: string;
  examNotes?: string;
  exampleProblem?: {
    problem: string;
    solution: string;
  };
}

export interface FormulaCategory {
  id: string;
  title: string;
  iconName: string;
  subject: 'Mathematics' | 'Physics' | 'Chemistry';
  items: FormulaItem[];
}

export interface PeriodicElement {
  number: number;
  symbol: string;
  name: string;
  mass: number;
  category: 'alkali' | 'alkaline-earth' | 'transition' | 'post-transition' | 'metalloid' | 'nonmetal' | 'halogen' | 'noble-gas';
  period: number;
  group: number;
  electronicConfig: string;
  state: 'Solid' | 'Liquid' | 'Gas';
  valencies: number[];
  flameColor?: string;
  nigerianExamFacts: string;
}

// ==========================================
// MATHEMATICS FORMULAS
// ==========================================
export const MATH_FORMULA_CATEGORIES: FormulaCategory[] = [
  {
    id: 'math-algebra',
    title: 'Algebra, Roots & Progressions',
    iconName: 'Variable',
    subject: 'Mathematics',
    items: [
      {
        id: 'quadratic-formula',
        name: 'The Quadratic Formula',
        formula: 'x = (-b ± √(b² - 4ac)) / (2a)',
        variables: [
          { symbol: 'a', meaning: 'Coefficient of x² (a ≠ 0)' },
          { symbol: 'b', meaning: 'Coefficient of x' },
          { symbol: 'c', meaning: 'Constant term' },
          { symbol: 'b² - 4ac', meaning: 'Discriminant (Δ)' }
        ],
        description: 'Used to find the roots of any standard quadratic equation ax² + bx + c = 0.',
        examNotes: 'If Δ > 0: two distinct real roots. If Δ = 0: two equal real roots. If Δ < 0: no real roots (complex roots).',
        exampleProblem: {
          problem: 'Solve 2x² - 5x + 2 = 0 using the quadratic formula.',
          solution: 'a=2, b=-5, c=2. Δ = (-5)² - 4(2)(2) = 25 - 16 = 9. x = (5 ± √9) / 4 = (5 ± 3) / 4. Therefore, x = 2 or x = 0.5.'
        }
      },
      {
        id: 'sum-product-roots',
        name: 'Sum and Product of Roots',
        formula: 'α + β = -b/a,   αβ = c/a',
        variables: [
          { symbol: 'α, β', meaning: 'Roots of the quadratic equation ax² + bx + c = 0' }
        ],
        description: 'Equation with roots α and β is given by x² - (α + β)x + αβ = 0.',
        examNotes: 'Common WAEC trick: α² + β² = (α + β)² - 2αβ. Also (1/α + 1/β) = (α + β)/(αβ).'
      },
      {
        id: 'ap-sequence',
        name: 'Arithmetic Progression (A.P.)',
        formula: 'Tₙ = a + (n - 1)d,   Sₙ = (n/2)[2a + (n - 1)d] = (n/2)(a + l)',
        variables: [
          { symbol: 'a', meaning: 'First term of sequence' },
          { symbol: 'd', meaning: 'Common difference (T₂ - T₁)' },
          { symbol: 'n', meaning: 'Number of terms' },
          { symbol: 'l', meaning: 'Last term (l = Tₙ)' },
          { symbol: 'Sₙ', meaning: 'Sum of first n terms' }
        ],
        description: 'Linear progression where each term increases by a fixed constant difference.',
        examNotes: 'For three consecutive terms in AP: (x - d), x, (x + d). Mean of three terms = middle term.'
      },
      {
        id: 'gp-sequence',
        name: 'Geometric Progression (G.P.)',
        formula: 'Tₙ = a·rⁿ⁻¹,   Sₙ = a(1 - rⁿ)/(1 - r),   S_∞ = a / (1 - r)',
        variables: [
          { symbol: 'a', meaning: 'First term' },
          { symbol: 'r', meaning: 'Common ratio (T₂ / T₁)' },
          { symbol: 'S_∞', meaning: 'Sum to infinity (only valid if |r| < 1)' }
        ],
        description: 'Exponential sequence where each term is multiplied by a fixed constant ratio.',
        examNotes: 'Sum to infinity is tested heavily in JAMB UTME. Ensure |r| < 1 before calculating S_∞.'
      },
      {
        id: 'indices-laws',
        name: 'Laws of Indices & Exponents',
        formula: 'aᵐ · aⁿ = aᵐ⁺ⁿ,   aᵐ / aⁿ = aᵐ⁻ⁿ,   (aᵐ)ⁿ = aᵐⁿ,   a⁻ⁿ = 1/aⁿ,   a^(1/n) = ⁿ√a',
        variables: [
          { symbol: 'a', meaning: 'Base number' },
          { symbol: 'm, n', meaning: 'Exponents/Powers' }
        ],
        description: 'Core rules for simplifying products, quotients, and fractional powers of numbers.',
        examNotes: 'Remember: a⁰ = 1 for any non-zero value of a.'
      },
      {
        id: 'logarithm-laws',
        name: 'Laws of Logarithms',
        formula: 'log(xy) = log x + log y,   log(x/y) = log x - log y,   log(xⁿ) = n·log x',
        variables: [
          { symbol: 'log_b(a)', meaning: 'Power to which base b must be raised to produce a' }
        ],
        description: 'Change of base: log_b(a) = (log_c a) / (log_c b). Also log_a(a) = 1 and log_a(1) = 0.',
        examNotes: 'In WAEC without calculator, common base-10 logs are simplified using known values of log 2 and log 3.'
      }
    ]
  },
  {
    id: 'math-geometry-mensuration',
    title: 'Geometry & Mensuration (2D & 3D Shapes)',
    iconName: 'Shapes',
    subject: 'Mathematics',
    items: [
      {
        id: 'circle-sector',
        name: 'Circle, Sector & Arc Length',
        formula: 'Arc Length (L) = (θ/360)·2πr,   Area of Sector = (θ/360)·πr² = (1/2)rL',
        variables: [
          { symbol: 'r', meaning: 'Radius of circle', unit: 'cm or m' },
          { symbol: 'θ', meaning: 'Angle subtended at center', unit: 'degrees' }
        ],
        description: 'Perimeter of sector = 2r + L. Area of segment = Area of sector - Area of triangle.',
        examNotes: 'Area of triangle in segment = (1/2)r²·sin θ.'
      },
      {
        id: 'cylinder-3d',
        name: 'Cylinder (Solid & Hollow)',
        formula: 'Volume = πr²h,   Curved Surface Area = 2πrh,   Total Surface Area = 2πr(r + h)',
        variables: [
          { symbol: 'r', meaning: 'Radius of circular base', unit: 'm' },
          { symbol: 'h', meaning: 'Perpendicular height', unit: 'm' }
        ],
        description: 'For an open cylinder (like an unroofed Nigerian water tank), Total Area = πr² + 2πrh.',
        examNotes: 'Always check if the question says "open at one end" or "closed at both ends".'
      },
      {
        id: 'cone-3d',
        name: 'Right Circular Cone',
        formula: 'Volume = (1/3)πr²h,   Curved Area = πrl,   Total Area = πr(r + l)',
        variables: [
          { symbol: 'r', meaning: 'Base radius' },
          { symbol: 'h', meaning: 'Vertical height' },
          { symbol: 'l', meaning: 'Slant height (l = √(r² + h²))' }
        ],
        description: 'Formed by rotating a right-angled triangle around its vertical axis or folding a sector.',
        examNotes: 'When a paper sector is folded into a cone: Arc length of sector = Circumference of cone base (2πr).'
      },
      {
        id: 'sphere-hemisphere',
        name: 'Sphere and Hemisphere',
        formula: 'Sphere Vol = (4/3)πr³,   Sphere Area = 4πr²,   Solid Hemisphere Area = 3πr²',
        variables: [
          { symbol: 'r', meaning: 'Radius of sphere' }
        ],
        description: 'Volume of hemisphere = (2/3)πr³. Curved surface area of hemisphere = 2πr².',
        examNotes: 'For a solid hemisphere, you must add the flat circular top (πr²), giving Total Area = 3πr².'
      },
      {
        id: 'polygon-angles',
        name: 'Angles of Polygons',
        formula: 'Sum of interior angles = (n - 2)·180° = (2n - 4)·90°,   Sum of exterior = 360°',
        variables: [
          { symbol: 'n', meaning: 'Number of sides of regular polygon' }
        ],
        description: 'Each interior angle of a regular polygon = (n - 2)·180° / n. Each exterior angle = 360° / n.',
        examNotes: 'Interior angle + Exterior angle at any vertex always = 180°.'
      }
    ]
  },
  {
    id: 'math-trig-calc',
    title: 'Trigonometry & Calculus',
    iconName: 'Triangle',
    subject: 'Mathematics',
    items: [
      {
        id: 'sine-cosine-rules',
        name: 'Sine and Cosine Rules (Non-Right Triangles)',
        formula: 'Sine: a/sin A = b/sin B = c/sin C = 2R,   Cosine: a² = b² + c² - 2bc·cos A',
        variables: [
          { symbol: 'a, b, c', meaning: 'Lengths of opposite sides' },
          { symbol: 'A, B, C', meaning: 'Interior angles of triangle' }
        ],
        description: 'Use Cosine rule when two sides and the included angle (SAS) or all three sides (SSS) are known. Otherwise use Sine rule.',
        examNotes: 'cos A = (b² + c² - a²) / (2bc).'
      },
      {
        id: 'trig-identities',
        name: 'Pythagorean & Double Angle Identities',
        formula: 'sin²θ + cos²θ = 1,   1 + tan²θ = sec²θ,   sin 2θ = 2 sin θ cos θ',
        variables: [
          { symbol: 'θ', meaning: 'Angle in degrees or radians' }
        ],
        description: 'cos 2θ = cos²θ - sin²θ = 2cos²θ - 1 = 1 - 2sin²θ.',
        examNotes: 'Tested in WAEC Further Mathematics and JAMB UTME integration substitutions.'
      },
      {
        id: 'differentiation-rules',
        name: 'Differentiation Rules (Calculus)',
        formula: 'd/dx(xⁿ) = n·xⁿ⁻¹,   Product: (uv)′ = u′v + uv′,   Quotient: (u/v)′ = (u′v - uv′)/v²',
        variables: [
          { symbol: 'u, v', meaning: 'Differentiable functions of x' }
        ],
        description: 'Chain rule: dy/dx = (dy/du) · (du/dx). Stationary points occur where dy/dx = 0.',
        examNotes: 'If d²y/dx² > 0 at stationary point, it is a minimum. If d²y/dx² < 0, it is a maximum.'
      },
      {
        id: 'integration-rules',
        name: 'Standard Integrals (Calculus)',
        formula: '∫ xⁿ dx = (xⁿ⁺¹)/(n + 1) + C  (n ≠ -1),   ∫ (1/x) dx = ln|x| + C',
        variables: [
          { symbol: 'C', meaning: 'Arbitrary constant of integration' }
        ],
        description: '∫ sin x dx = -cos x + C,   ∫ cos x dx = sin x + C,   ∫ eˣ dx = eˣ + C.',
        examNotes: 'Definite integral gives the area under the curve between limits a and b: ∫ₐᵇ f(x) dx.'
      }
    ]
  },
  {
    id: 'math-stats-prob',
    title: 'Statistics & Probability',
    iconName: 'BarChart2',
    subject: 'Mathematics',
    items: [
      {
        id: 'mean-variance',
        name: 'Mean, Variance & Standard Deviation',
        formula: 'Mean (x̄) = Σfx / Σf,   Variance (σ²) = (Σfx² / Σf) - (x̄)²,   σ = √Variance',
        variables: [
          { symbol: 'f', meaning: 'Frequency of each class or value' },
          { symbol: 'x', meaning: 'Midpoint or value' }
        ],
        description: 'Standard deviation measures the dispersion of values around the arithmetic mean.',
        examNotes: 'Standard deviation is always positive and has the same unit as the original data.'
      },
      {
        id: 'perm-comb',
        name: 'Permutations & Combinations',
        formula: 'ⁿPᵣ = n! / (n - r)!,   ⁿCᵣ = n! / [r!(n - r)!]',
        variables: [
          { symbol: 'n', meaning: 'Total number of items' },
          { symbol: 'r', meaning: 'Number of items selected' }
        ],
        description: 'Permutations count order-sensitive arrangements; combinations count selection groups where order does not matter.',
        examNotes: 'Remember: 0! = 1 and ⁿCᵣ = ⁿCₙ₋ᵣ.'
      }
    ]
  }
];

// ==========================================
// PHYSICS FORMULAS
// ==========================================
export const PHYSICS_FORMULA_CATEGORIES: FormulaCategory[] = [
  {
    id: 'physics-mechanics',
    title: 'Mechanics, Dynamics & Gravitation',
    iconName: 'Zap',
    subject: 'Physics',
    items: [
      {
        id: 'equations-of-motion',
        name: 'Equations of Uniformly Accelerated Motion',
        formula: 'v = u + at,   s = ut + (1/2)at²,   v² = u² + 2as,   s = [(u + v)/2]·t',
        variables: [
          { symbol: 'u', meaning: 'Initial velocity', unit: 'm/s' },
          { symbol: 'v', meaning: 'Final velocity', unit: 'm/s' },
          { symbol: 'a', meaning: 'Acceleration', unit: 'm/s²' },
          { symbol: 't', meaning: 'Time elapsed', unit: 's' },
          { symbol: 's', meaning: 'Displacement', unit: 'm' }
        ],
        description: 'Applies strictly when acceleration is uniform/constant in a straight line.',
        examNotes: 'For vertical motion under gravity, replace a with g (take g = 9.8 m/s² or 10 m/s² as specified in question).',
        exampleProblem: {
          problem: 'A car starts from rest and accelerates uniformly at 3 m/s² for 6 seconds. Calculate distance covered.',
          solution: 'u = 0, a = 3 m/s², t = 6s. s = ut + (1/2)at² = 0 + (0.5)(3)(36) = 54 meters.'
        }
      },
      {
        id: 'newton-momentum',
        name: "Newton's 2nd Law, Momentum & Impulse",
        formula: 'F = ma = (mv - mu)/t,   p = mv,   Impulse = F·Δt = Δp',
        variables: [
          { symbol: 'F', meaning: 'Resultant external force', unit: 'N (kg·m/s²)' },
          { symbol: 'm', meaning: 'Mass of body', unit: 'kg' },
          { symbol: 'p', meaning: 'Linear momentum', unit: 'kg·m/s' },
          { symbol: 'Impulse', meaning: 'Change in linear momentum', unit: 'N·s' }
        ],
        description: 'Conservation of momentum: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂ (total momentum before collision equals total momentum after).',
        examNotes: 'In elastic collisions both momentum and kinetic energy are conserved. In inelastic collisions, kinetic energy is lost.'
      },
      {
        id: 'projectile-motion',
        name: 'Projectile Motion (Launch Angle θ)',
        formula: 'T = (2u sin θ)/g,   H_max = (u² sin²θ)/(2g),   R = (u² sin 2θ)/g',
        variables: [
          { symbol: 'u', meaning: 'Initial launch speed', unit: 'm/s' },
          { symbol: 'θ', meaning: 'Angle of projection to horizontal', unit: 'degrees' },
          { symbol: 'T', meaning: 'Total time of flight', unit: 's' },
          { symbol: 'H_max', meaning: 'Maximum vertical height', unit: 'm' },
          { symbol: 'R', meaning: 'Horizontal range', unit: 'm' }
        ],
        description: 'Superposition of constant horizontal velocity (u cos θ) and uniform vertical acceleration due to gravity.',
        examNotes: 'Maximum range R_max = u²/g occurs when θ = 45°. Complementary angles (e.g. 30° and 60°) produce equal ranges.'
      },
      {
        id: 'work-energy-power',
        name: 'Work Done, Kinetic & Potential Energy',
        formula: 'W = F·s·cos θ,   K.E. = (1/2)mv²,   P.E. = mgh,   Power = W/t = F·v',
        variables: [
          { symbol: 'W', meaning: 'Work done', unit: 'Joules (J)' },
          { symbol: 'K.E.', meaning: 'Kinetic energy', unit: 'J' },
          { symbol: 'P.E.', meaning: 'Gravitational potential energy', unit: 'J' },
          { symbol: 'Power', meaning: 'Rate of doing work', unit: 'Watts (W = J/s)' }
        ],
        description: 'Work-Energy Theorem: Net work done on an object equals change in its kinetic energy (W = ΔK.E.).',
        examNotes: 'Work is zero if displacement is perpendicular to force (e.g. carrying a load horizontally on your head).'
      },
      {
        id: 'simple-machines',
        name: 'Simple Machines & Efficiency',
        formula: 'M.A. = Load / Effort,   V.R. = Dist_Effort / Dist_Load,   Efficiency (η) = (M.A. / V.R.) × 100%',
        variables: [
          { symbol: 'M.A.', meaning: 'Mechanical Advantage (ratio of forces, no unit)' },
          { symbol: 'V.R.', meaning: 'Velocity Ratio (geometric property, no unit)' },
          { symbol: 'η', meaning: 'Efficiency percentage' }
        ],
        description: 'V.R. for pulley system = number of pulleys or rope segments supporting the load. For inclined plane, V.R. = 1/sin θ.',
        examNotes: 'Efficiency is never 100% in real machines due to friction and the weight of moving machine parts.'
      }
    ]
  },
  {
    id: 'physics-heat-thermo',
    title: 'Thermal Physics & Gas Laws',
    iconName: 'Flame',
    subject: 'Physics',
    items: [
      {
        id: 'specific-heat-latent',
        name: 'Specific Heat Capacity & Latent Heat',
        formula: 'Q = mcΔθ,   Q = mL,   Heat Capacity (C) = Q/Δθ = mc',
        variables: [
          { symbol: 'Q', meaning: 'Quantity of heat absorbed or released', unit: 'Joules (J)' },
          { symbol: 'm', meaning: 'Mass of substance', unit: 'kg' },
          { symbol: 'c', meaning: 'Specific heat capacity', unit: 'J/(kg·K)' },
          { symbol: 'Δθ', meaning: 'Temperature change', unit: 'K or °C' },
          { symbol: 'L', meaning: 'Specific latent heat of fusion or vaporization', unit: 'J/kg' }
        ],
        description: 'During phase change (melting or boiling), temperature remains constant while latent heat is absorbed.',
        examNotes: 'Method of mixtures: Heat lost by hot body = Heat gained by cold body + Heat gained by calorimeter.'
      },
      {
        id: 'gas-laws',
        name: 'Ideal Gas Laws (Boyle, Charles & Ideal Gas)',
        formula: 'Boyle: P₁V₁ = P₂V₂,   Charles: V₁/T₁ = V₂/T₂,   Combined: (P₁V₁)/T₁ = (P₂V₂)/T₂',
        variables: [
          { symbol: 'P', meaning: 'Absolute pressure', unit: 'N/m² or Pa' },
          { symbol: 'V', meaning: 'Volume of gas', unit: 'm³ or dm³' },
          { symbol: 'T', meaning: 'Absolute temperature in Kelvin (T = θ°C + 273)', unit: 'K' }
        ],
        description: 'Ideal gas equation: PV = nRT where R = 8.314 J/(mol·K) and n = number of moles.',
        examNotes: 'CRITICAL: Never substitute temperature in Celsius! Always add 273 to convert to Kelvin first.'
      }
    ]
  },
  {
    id: 'physics-waves-optics',
    title: 'Waves, Light & Optics',
    iconName: 'Radio',
    subject: 'Physics',
    items: [
      {
        id: 'wave-motion',
        name: 'Wave Speed & Frequency',
        formula: 'v = fλ = λ / T',
        variables: [
          { symbol: 'v', meaning: 'Wave velocity', unit: 'm/s' },
          { symbol: 'f', meaning: 'Frequency', unit: 'Hertz (Hz)' },
          { symbol: 'λ', meaning: 'Wavelength', unit: 'meters (m)' },
          { symbol: 'T', meaning: 'Period (T = 1/f)', unit: 'seconds (s)' }
        ],
        description: 'Speed of sound in air is ~340 m/s; speed of light in vacuum is c = 3.0 × 10⁸ m/s.',
        examNotes: 'When a wave passes from one medium to another (refraction), frequency f remains constant while v and λ change.'
      },
      {
        id: 'snell-refraction',
        name: "Snell's Law of Refraction & Critical Angle",
        formula: 'n = sin i / sin r = Real Depth / Apparent Depth = c / v,   sin C = 1 / n',
        variables: [
          { symbol: 'n', meaning: 'Refractive index of medium' },
          { symbol: 'i', meaning: 'Angle of incidence in rarer medium' },
          { symbol: 'r', meaning: 'Angle of refraction in denser medium' },
          { symbol: 'C', meaning: 'Critical angle for total internal reflection' }
        ],
        description: 'Total internal reflection occurs only when light travels from denser to rarer medium and angle of incidence i > C.',
        examNotes: 'Tested frequently with mirages, optical fibers, and glass prism minimum deviation.'
      },
      {
        id: 'lens-mirror-formula',
        name: 'Mirror & Lens Formula',
        formula: '(1/f) = (1/u) + (1/v),   Magnification (M) = v / u = Height_img / Height_obj',
        variables: [
          { symbol: 'f', meaning: 'Focal length (+ for convex lens/concave mirror, - for concave lens/convex mirror)', unit: 'cm or m' },
          { symbol: 'u', meaning: 'Object distance (always positive for real objects)', unit: 'cm' },
          { symbol: 'v', meaning: 'Image distance (+ for real image, - for virtual image)', unit: 'cm' }
        ],
        description: 'Power of a lens P = 1/f (in meters), measured in Dioptres (D).',
        examNotes: 'Real is Positive convention: Focal length of convex lens is positive, concave lens is negative.'
      }
    ]
  },
  {
    id: 'physics-electricity',
    title: 'Electricity & Magnetism',
    iconName: 'Cpu',
    subject: 'Physics',
    items: [
      {
        id: 'ohm-resistance',
        name: "Ohm's Law & Resistance Combinations",
        formula: 'V = IR,   Series: R_T = R₁ + R₂,   Parallel: 1/R_T = (1/R₁) + (1/R₂)',
        variables: [
          { symbol: 'V', meaning: 'Potential difference', unit: 'Volts (V)' },
          { symbol: 'I', meaning: 'Current', unit: 'Amperes (A)' },
          { symbol: 'R', meaning: 'Resistance', unit: 'Ohms (Ω)' }
        ],
        description: 'Resistivity formula: R = ρL / A (where ρ = resistivity in Ω·m, L = length, A = cross-sectional area).',
        examNotes: 'For two resistors in parallel: R_T = (R₁ · R₂) / (R₁ + R₂).'
      },
      {
        id: 'electric-power',
        name: 'Electrical Energy & Power',
        formula: 'E = VIt = I²Rt = (V²/R)t,   P = IV = I²R = V²/R',
        variables: [
          { symbol: 'E', meaning: 'Electrical energy', unit: 'Joules (J) or kWh' },
          { symbol: 'P', meaning: 'Electric power', unit: 'Watts (W)' }
        ],
        description: 'Cost of electrical energy in Nigeria = Power (in kW) × Time (in hours) × Tariff per kWh.',
        examNotes: '1 kilowatt-hour (kWh) = 1,000 W × 3,600 s = 3.6 × 10⁶ Joules (J).'
      },
      {
        id: 'transformer-formula',
        name: 'Ideal Transformer Equation',
        formula: 'V_s / V_p = N_s / N_p = I_p / I_s',
        variables: [
          { symbol: 'V_p, V_s', meaning: 'Primary and Secondary voltage', unit: 'V' },
          { symbol: 'N_p, N_s', meaning: 'Number of turns on primary and secondary coils' },
          { symbol: 'I_p, I_s', meaning: 'Primary and Secondary current', unit: 'A' }
        ],
        description: 'Step-up transformer: N_s > N_p (voltage increases, current decreases). Step-down: N_s < N_p.',
        examNotes: 'Efficiency = (Output Power / Input Power) × 100% = (V_s I_s / V_p I_p) × 100%.'
      }
    ]
  }
];

// ==========================================
// CHEMISTRY FORMULAS & CONSTANTS
// ==========================================
export const CHEMISTRY_FORMULA_CATEGORIES: FormulaCategory[] = [
  {
    id: 'chem-mole',
    title: 'Mole Concept, Stoichiometry & Gas Volumes',
    iconName: 'FlaskConical',
    subject: 'Chemistry',
    items: [
      {
        id: 'mole-calculations',
        name: 'Fundamental Mole Formula',
        formula: 'n = m / M = N / N_A = V / 22.4 dm³ (at s.t.p.)',
        variables: [
          { symbol: 'n', meaning: 'Number of moles', unit: 'mol' },
          { symbol: 'm', meaning: 'Mass in grams', unit: 'g' },
          { symbol: 'M', meaning: 'Molar mass of substance', unit: 'g/mol' },
          { symbol: 'N', meaning: 'Number of particles (atoms, molecules, ions)' },
          { symbol: 'N_A', meaning: "Avogadro's constant (6.022 × 10²³ mol⁻¹)" },
          { symbol: 'V', meaning: 'Gas volume at standard temperature and pressure (s.t.p.)', unit: 'dm³' }
        ],
        description: 'Standard temperature = 273 K (0°C); Standard pressure = 1 atm (760 mmHg = 1.013 × 10⁵ N/m²).',
        examNotes: '1 dm³ = 1,000 cm³. At s.t.p., 1 mole of ANY ideal gas occupies 22.4 dm³ (22,400 cm³).',
        exampleProblem: {
          problem: 'Find the mass of 0.25 moles of Calcium Carbonate (CaCO₃). [Ca=40, C=12, O=16]',
          solution: 'M(CaCO₃) = 40 + 12 + 3(16) = 100 g/mol. m = n × M = 0.25 × 100 = 25.0 grams.'
        }
      },
      {
        id: 'solutions-titration',
        name: 'Molarity, Concentration & Titration',
        formula: 'C = n / V = (m / M) / V,   (C_a · V_a) / (C_b · V_b) = n_a / n_b',
        variables: [
          { symbol: 'C', meaning: 'Molar concentration', unit: 'mol/dm³ (Molar, M)' },
          { symbol: 'V', meaning: 'Volume of solution in dm³ (V_cm³ / 1000)' },
          { symbol: 'C_a, C_b', meaning: 'Concentration of acid and base', unit: 'mol/dm³' },
          { symbol: 'V_a, V_b', meaning: 'Titre volume of acid and pipette volume of base', unit: 'cm³' },
          { symbol: 'n_a, n_b', meaning: 'Mole ratio coefficients from balanced equation' }
        ],
        description: 'Core formula used in all WAEC Practical Chemistry Volumetric Analysis calculations.',
        examNotes: 'Concentration in g/dm³ = Molar concentration (mol/dm³) × Molar mass (g/mol).'
      },
      {
        id: 'graham-diffusion',
        name: "Graham's Law of Gaseous Diffusion",
        formula: 'R₁ / R₂ = √(M₂ / M₁) = √(ρ₂ / ρ₁) = t₂ / t₁',
        variables: [
          { symbol: 'R₁, R₂', meaning: 'Rates of diffusion of gas 1 and gas 2', unit: 'cm³/s' },
          { symbol: 'M₁, M₂', meaning: 'Molar masses of gas 1 and gas 2', unit: 'g/mol' },
          { symbol: 'ρ₁, ρ₂', meaning: 'Densities of the gases' },
          { symbol: 't₁, t₂', meaning: 'Time taken for equal volumes to diffuse', unit: 's' }
        ],
        description: 'Light gases diffuse faster than dense gases at the same temperature and pressure.',
        examNotes: 'Common WAEC example: NH₃ (17 g/mol) diffuses faster than HCl (36.5 g/mol); dense white NH₄Cl fumes form closer to the HCl end.'
      }
    ]
  },
  {
    id: 'chem-electro',
    title: 'Electrochemistry & Faraday’s Laws',
    iconName: 'BatteryCharging',
    subject: 'Chemistry',
    items: [
      {
        id: 'faraday-electrolysis',
        name: "Faraday's Laws of Electrolysis",
        formula: 'm = Z·I·t = (M · I · t) / (n · F)',
        variables: [
          { symbol: 'm', meaning: 'Mass of substance liberated or deposited', unit: 'g' },
          { symbol: 'I', meaning: 'Steady electric current', unit: 'Amperes (A)' },
          { symbol: 't', meaning: 'Time duration of electrolysis', unit: 'seconds (s)' },
          { symbol: 'M', meaning: 'Relative atomic mass of element' },
          { symbol: 'n', meaning: 'Charge number on ion (number of electrons exchanged)' },
          { symbol: 'F', meaning: "Faraday's Constant = 96,500 Coulombs/mole of electrons" }
        ],
        description: '1 Faraday (96,500 C) deposits 1 mole of Ag⁺, 0.5 mole of Cu²⁺, or 0.33 mole of Al³⁺.',
        examNotes: 'Q = I × t. Always convert time to seconds before calculating.'
      },
      {
        id: 'ph-calculations',
        name: 'pH, pOH & Ionic Product of Water',
        formula: 'pH = -log₁₀[H⁺],   pOH = -log₁₀[OH⁻],   pH + pOH = 14 (at 25°C)',
        variables: [
          { symbol: '[H⁺]', meaning: 'Hydrogen ion concentration', unit: 'mol/dm³' },
          { symbol: '[OH⁻]', meaning: 'Hydroxide ion concentration', unit: 'mol/dm³' }
        ],
        description: 'Pure water at 25°C has [H⁺] = 10⁻⁷ mol/dm³, so pH = 7 (Neutral). Acidic: pH < 7. Alkaline: pH > 7.',
        examNotes: 'For strong diprotic acid (like H₂SO₄ of concentration C): [H⁺] = 2 × C.'
      }
    ]
  },
  {
    id: 'chem-organic',
    title: 'Organic Chemistry Homologous Series',
    iconName: 'Dna',
    subject: 'Chemistry',
    items: [
      {
        id: 'hydrocarbons-general',
        name: 'Hydrocarbon Families (Alkanes, Alkenes, Alkynes)',
        formula: 'Alkanes: CₙH₂ₙ₊₂,   Alkenes: CₙH₂ₙ,   Alkynes: CₙH₂ₙ₋₂',
        variables: [
          { symbol: 'n', meaning: 'Number of carbon atoms (n = 1, 2, 3...)' }
        ],
        description: 'Alkanes are saturated (single bonds, substitution reactions); alkenes (C=C) and alkynes (C≡C) are unsaturated (addition reactions).',
        examNotes: 'Alkenes and alkynes decolorize bromine water (Br₂ in CCl₄) and acidified KMnO₄.'
      },
      {
        id: 'oxygen-organics',
        name: 'Alkanols, Alkanoic Acids & Esters',
        formula: 'Alkanols: CₙH₂ₙ₊₁OH,   Alkanoic Acids: CₙH₂ₙ₊₁COOH,   Esters: R-COO-R′',
        variables: [
          { symbol: 'R, R′', meaning: 'Alkyl groups (e.g. -CH₃, -C₂H₅)' }
        ],
        description: 'Esterification reaction: Alkanoic Acid + Alkanol ⇌ Ester + Water (catalyzed by concentrated H₂SO₄).',
        examNotes: 'Esters give fruity sweet smells used in perfumes, sweets, and Nigerian beverages.'
      }
    ]
  }
];

// ==========================================
// PERIODIC TABLE OF ELEMENTS DATABASE
// (First 36 elements + High-yield exam metals)
// ==========================================
export const PERIODIC_ELEMENTS_DATABASE: PeriodicElement[] = [
  {
    number: 1,
    symbol: 'H',
    name: 'Hydrogen',
    mass: 1.008,
    category: 'nonmetal',
    period: 1,
    group: 1,
    electronicConfig: '1s¹',
    state: 'Gas',
    valencies: [1, -1],
    nigerianExamFacts: 'Lightest and most abundant element in universe. Tested in WAEC as reducing agent in metallurgy.'
  },
  {
    number: 2,
    symbol: 'He',
    name: 'Helium',
    mass: 4.003,
    category: 'noble-gas',
    period: 1,
    group: 8,
    electronicConfig: '1s²',
    state: 'Gas',
    valencies: [0],
    nigerianExamFacts: 'Duplet stable electronic configuration. Non-flammable gas used in weather balloons and deep-sea diving heliox.'
  },
  {
    number: 3,
    symbol: 'Li',
    name: 'Lithium',
    mass: 6.94,
    category: 'alkali',
    period: 2,
    group: 1,
    electronicConfig: '[He] 2s¹',
    state: 'Solid',
    valencies: [1],
    flameColor: 'Crimson Red',
    nigerianExamFacts: 'Lightest metal. Reacts vigorously with cold water to release H₂ gas. Stored under paraffin oil.'
  },
  {
    number: 4,
    symbol: 'Be',
    name: 'Beryllium',
    mass: 9.012,
    category: 'alkaline-earth',
    period: 2,
    group: 2,
    electronicConfig: '[He] 2s²',
    state: 'Solid',
    valencies: [2],
    nigerianExamFacts: 'Amphoteric oxide (BeO) which dissolves in both acids and strong bases. Shows diagonal relationship with Aluminium.'
  },
  {
    number: 5,
    symbol: 'B',
    name: 'Boron',
    mass: 10.81,
    category: 'metalloid',
    period: 2,
    group: 3,
    electronicConfig: '[He] 2s² 2p¹',
    state: 'Solid',
    valencies: [3],
    nigerianExamFacts: 'Metalloid used in heat-resistant borosilicate laboratory glassware (Pyrex).'
  },
  {
    number: 6,
    symbol: 'C',
    name: 'Carbon',
    mass: 12.011,
    category: 'nonmetal',
    period: 2,
    group: 4,
    electronicConfig: '[He] 2s² 2p²',
    state: 'Solid',
    valencies: [4, 2],
    nigerianExamFacts: 'Exhibits catenation and allotropy: Diamond (tetrahedral non-conductor) and Graphite (layered conductor of electricity).'
  },
  {
    number: 7,
    symbol: 'N',
    name: 'Nitrogen',
    mass: 14.007,
    category: 'nonmetal',
    period: 2,
    group: 5,
    electronicConfig: '[He] 2s² 2p³',
    state: 'Gas',
    valencies: [3, 5],
    nigerianExamFacts: 'Comprises 78% of air. Triple covalent bond (N≡N) makes it chemically unreactive at room temperature. Industrial Haber process.'
  },
  {
    number: 8,
    symbol: 'O',
    name: 'Oxygen',
    mass: 15.999,
    category: 'nonmetal',
    period: 2,
    group: 6,
    electronicConfig: '[He] 2s² 2p⁴',
    state: 'Gas',
    valencies: [2],
    nigerianExamFacts: '21% of atmosphere. Supports combustion, relights a glowing wooden splint. Laboratory preparation uses H₂O₂ and MnO₂ catalyst.'
  },
  {
    number: 9,
    symbol: 'F',
    name: 'Fluorine',
    mass: 18.998,
    category: 'halogen',
    period: 2,
    group: 7,
    electronicConfig: '[He] 2s² 2p⁵',
    state: 'Gas',
    valencies: [-1],
    nigerianExamFacts: 'Most electronegative element on the periodic table. Pale yellow, dangerously toxic and reactive gas.'
  },
  {
    number: 10,
    symbol: 'Ne',
    name: 'Neon',
    mass: 20.180,
    category: 'noble-gas',
    period: 2,
    group: 8,
    electronicConfig: '[He] 2s² 2p⁶',
    state: 'Gas',
    valencies: [0],
    nigerianExamFacts: 'Inert noble gas with stable octet. Emits distinctive reddish-orange glow in high-voltage advertising neon signs.'
  },
  {
    number: 11,
    symbol: 'Na',
    name: 'Sodium (Natrium)',
    mass: 22.990,
    category: 'alkali',
    period: 3,
    group: 1,
    electronicConfig: '[Ne] 3s¹',
    state: 'Solid',
    valencies: [1],
    flameColor: 'Golden Yellow',
    nigerianExamFacts: 'Soft alkali metal easily cut with knife. Reacts violently with water; stored under kerosene. Down’s Cell extraction from molten NaCl.'
  },
  {
    number: 12,
    symbol: 'Mg',
    name: 'Magnesium',
    mass: 24.305,
    category: 'alkaline-earth',
    period: 3,
    group: 2,
    electronicConfig: '[Ne] 3s²',
    state: 'Solid',
    valencies: [2],
    flameColor: 'Dazzling Brilliant White',
    nigerianExamFacts: 'Central metallic atom in the chlorophyll molecule. Burns with blinding white light to yield basic magnesium oxide (MgO).'
  },
  {
    number: 13,
    symbol: 'Al',
    name: 'Aluminium',
    mass: 26.982,
    category: 'post-transition',
    period: 3,
    group: 3,
    electronicConfig: '[Ne] 3s² 3p¹',
    state: 'Solid',
    valencies: [3],
    nigerianExamFacts: 'Extracted from Bauxite ore (Al₂O₃·2H₂O) via Hall-Héroult electrolytic process using molten cryolite (Na₃AlF₆) solvent.'
  },
  {
    number: 14,
    symbol: 'Si',
    name: 'Silicon',
    mass: 28.085,
    category: 'metalloid',
    period: 3,
    group: 4,
    electronicConfig: '[Ne] 3s² 3p²',
    state: 'Solid',
    valencies: [4],
    nigerianExamFacts: 'Second most abundant element in Earth’s crust (found in quartz sand). Crucial semiconductor for Nigerian solar panels.'
  },
  {
    number: 15,
    symbol: 'P',
    name: 'Phosphorus',
    mass: 30.974,
    category: 'nonmetal',
    period: 3,
    group: 5,
    electronicConfig: '[Ne] 3s² 3p³',
    state: 'Solid',
    valencies: [3, 5],
    nigerianExamFacts: 'Allotropes: White phosphorus (spontaneously flammable, stored under water) and Red phosphorus (matches).'
  },
  {
    number: 16,
    symbol: 'S',
    name: 'Sulfur',
    mass: 32.065,
    category: 'nonmetal',
    period: 3,
    group: 6,
    electronicConfig: '[Ne] 3s² 3p⁴',
    state: 'Solid',
    valencies: [2, 4, 6],
    flameColor: 'Blue Flame',
    nigerianExamFacts: 'Extracted via Frasch process. Allotropes: Rhombic and Monoclinic sulfur. Used in vulcanization of rubber and H₂SO₄ manufacture.'
  },
  {
    number: 17,
    symbol: 'Cl',
    name: 'Chlorine',
    mass: 35.453,
    category: 'halogen',
    period: 3,
    group: 7,
    electronicConfig: '[Ne] 3s² 3p⁵',
    state: 'Gas',
    valencies: [-1, 1, 3, 5, 7],
    nigerianExamFacts: 'Greenish-yellow choking gas. Turns damp blue litmus red and then rapidly bleaches it white. Water purification agent.'
  },
  {
    number: 18,
    symbol: 'Ar',
    name: 'Argon',
    mass: 39.948,
    category: 'noble-gas',
    period: 3,
    group: 8,
    electronicConfig: '[Ne] 3s² 3p⁶',
    state: 'Gas',
    valencies: [0],
    nigerianExamFacts: 'Most abundant noble gas in atmosphere (~0.93%). Used in incandescent light bulbs to shield tungsten filament.'
  },
  {
    number: 19,
    symbol: 'K',
    name: 'Potassium (Kalium)',
    mass: 39.098,
    category: 'alkali',
    period: 4,
    group: 1,
    electronicConfig: '[Ar] 4s¹',
    state: 'Solid',
    valencies: [1],
    flameColor: 'Lilac / Purple',
    nigerianExamFacts: 'Reacts explosively with cold water. Key macronutrient in Nigerian agricultural NPK fertilizers.'
  },
  {
    number: 20,
    symbol: 'Ca',
    name: 'Calcium',
    mass: 40.078,
    category: 'alkaline-earth',
    period: 4,
    group: 2,
    electronicConfig: '[Ar] 4s²',
    state: 'Solid',
    valencies: [2],
    flameColor: 'Brick Red',
    nigerianExamFacts: 'Found in Nigerian limestone deposits (Ewekoro, Ogun State; Obajana, Kogi State) used for cement manufacturing.'
  },
  {
    number: 21,
    symbol: 'Sc',
    name: 'Scandium',
    mass: 44.956,
    category: 'transition',
    period: 4,
    group: 3,
    electronicConfig: '[Ar] 3d¹ 4s²',
    state: 'Solid',
    valencies: [3],
    nigerianExamFacts: 'First 3d transition metal; forms colorless Sc³⁺ salts because its 3d subshell is completely empty.'
  },
  {
    number: 22,
    symbol: 'Ti',
    name: 'Titanium',
    mass: 47.867,
    category: 'transition',
    period: 4,
    group: 4,
    electronicConfig: '[Ar] 3d² 4s²',
    state: 'Solid',
    valencies: [4, 3],
    nigerianExamFacts: 'High strength-to-density ratio, corrosion-resistant metal used in aircraft hulls and medical implants.'
  },
  {
    number: 23,
    symbol: 'V',
    name: 'Vanadium',
    mass: 50.942,
    category: 'transition',
    period: 4,
    group: 5,
    electronicConfig: '[Ar] 3d³ 4s²',
    state: 'Solid',
    valencies: [5, 4, 3, 2],
    nigerianExamFacts: 'Vanadium(V) oxide (V₂O₅) serves as heterogeneous catalyst in Contact Process for manufacturing sulfuric acid.'
  },
  {
    number: 24,
    symbol: 'Cr',
    name: 'Chromium',
    mass: 51.996,
    category: 'transition',
    period: 4,
    group: 6,
    electronicConfig: '[Ar] 3d⁵ 4s¹',
    state: 'Solid',
    valencies: [3, 6],
    nigerianExamFacts: 'Anomalous electronic configuration (half-filled 3d⁵ 4s¹ for stability). K₂Cr₂O₇ is an orange oxidizing agent that turns green on reduction.'
  },
  {
    number: 25,
    symbol: 'Mn',
    name: 'Manganese',
    mass: 54.938,
    category: 'transition',
    period: 4,
    group: 7,
    electronicConfig: '[Ar] 3d⁵ 4s²',
    state: 'Solid',
    valencies: [2, 4, 7],
    nigerianExamFacts: 'KMnO₄ is intense purple; turns colorless in acidic titration with Fe²⁺ or C₂O₄²⁻. MnO₂ is black catalyst in O₂ preparation.'
  },
  {
    number: 26,
    symbol: 'Fe',
    name: 'Iron (Ferrum)',
    mass: 55.845,
    category: 'transition',
    period: 4,
    group: 8,
    electronicConfig: '[Ar] 3d⁶ 4s²',
    state: 'Solid',
    valencies: [2, 3],
    nigerianExamFacts: 'Extracted from hematite (Fe₂O₃) in Blast Furnaces (Ajaokuta Steel). Fe²⁺ is pale green; Fe³⁺ is reddish-brown/yellow.'
  },
  {
    number: 27,
    symbol: 'Co',
    name: 'Cobalt',
    mass: 58.933,
    category: 'transition',
    period: 4,
    group: 8,
    electronicConfig: '[Ar] 3d⁷ 4s²',
    state: 'Solid',
    valencies: [2, 3],
    nigerianExamFacts: 'Anhydrous Cobalt(II) chloride paper turns from blue to pink in presence of moisture/water.'
  },
  {
    number: 28,
    symbol: 'Ni',
    name: 'Nickel',
    mass: 58.693,
    category: 'transition',
    period: 4,
    group: 8,
    electronicConfig: '[Ar] 3d⁸ 4s²',
    state: 'Solid',
    valencies: [2],
    nigerianExamFacts: 'Finely divided nickel catalyst is used in catalytic hydrogenation of vegetable oils to produce margarine.'
  },
  {
    number: 29,
    symbol: 'Cu',
    name: 'Copper (Cuprum)',
    mass: 63.546,
    category: 'transition',
    period: 4,
    group: 1,
    electronicConfig: '[Ar] 3d¹⁰ 4s¹',
    state: 'Solid',
    valencies: [1, 2],
    flameColor: 'Green-Blue',
    nigerianExamFacts: 'Anomalous configuration (completely filled 3d¹⁰ 4s¹). High electrical conductivity. Hydrated CuSO₄·5H₂O crystals are deep blue.'
  },
  {
    number: 30,
    symbol: 'Zn',
    name: 'Zinc',
    mass: 65.38,
    category: 'transition',
    period: 4,
    group: 2,
    electronicConfig: '[Ar] 3d¹⁰ 4s²',
    state: 'Solid',
    valencies: [2],
    nigerianExamFacts: 'Pseudo-transition metal (forms colorless Zn²⁺ salts). Used to galvanize corrugated iron roofing sheets against tropical rust.'
  },
  {
    number: 35,
    symbol: 'Br',
    name: 'Bromine',
    mass: 79.904,
    category: 'halogen',
    period: 4,
    group: 7,
    electronicConfig: '[Ar] 3d¹⁰ 4s² 4p⁵',
    state: 'Liquid',
    valencies: [-1, 1, 5],
    nigerianExamFacts: 'The only non-metallic element that is a reddish-brown liquid at room temperature. Used to test organic unsaturation.'
  },
  {
    number: 47,
    symbol: 'Ag',
    name: 'Silver (Argentum)',
    mass: 107.87,
    category: 'transition',
    period: 5,
    group: 1,
    electronicConfig: '[Kr] 4d¹⁰ 5s¹',
    state: 'Solid',
    valencies: [1],
    nigerianExamFacts: 'AgCl is a white precipitate insoluble in HNO₃ but soluble in dilute aqueous ammonia (NH₃). Highest electrical conductivity.'
  },
  {
    number: 50,
    symbol: 'Sn',
    name: 'Tin (Stannum)',
    mass: 118.71,
    category: 'post-transition',
    period: 5,
    group: 4,
    electronicConfig: '[Kr] 4d¹⁰ 5s² 5p²',
    state: 'Solid',
    valencies: [2, 4],
    nigerianExamFacts: 'Historically mined in Jos Plateau, Nigeria. Used to tin-plate steel food cans and alloy with copper to make bronze.'
  },
  {
    number: 53,
    symbol: 'I',
    name: 'Iodine',
    mass: 126.90,
    category: 'halogen',
    period: 5,
    group: 7,
    electronicConfig: '[Kr] 4d¹⁰ 5s² 5p⁵',
    state: 'Solid',
    valencies: [-1, 1, 5, 7],
    flameColor: 'Violet Vapor',
    nigerianExamFacts: 'Shiny dark purple-black solid that sublimes directly into violet gas on gentle heating. Turns starch solution deep blue-black.'
  },
  {
    number: 79,
    symbol: 'Au',
    name: 'Gold (Aurum)',
    mass: 196.97,
    category: 'transition',
    period: 6,
    group: 1,
    electronicConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹',
    state: 'Solid',
    valencies: [1, 3],
    nigerianExamFacts: 'Most malleable and ductile noble metal. Does not tarnish in air; dissolves only in aqua regia (3 parts HCl : 1 part HNO₃).'
  },
  {
    number: 80,
    symbol: 'Hg',
    name: 'Mercury (Hydrargyrum)',
    mass: 200.59,
    category: 'transition',
    period: 6,
    group: 2,
    electronicConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s²',
    state: 'Liquid',
    valencies: [1, 2],
    nigerianExamFacts: 'Only metallic element liquid at standard room temperature. High density (13.6 g/cm³), used in laboratory barometers and manometers.'
  },
  {
    number: 82,
    symbol: 'Pb',
    name: 'Lead (Plumbum)',
    mass: 207.2,
    category: 'post-transition',
    period: 6,
    group: 4,
    electronicConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²',
    state: 'Solid',
    valencies: [2, 4],
    nigerianExamFacts: 'PbI₂ is a bright golden-yellow precipitate ("golden rain" test). Used in lead-acid rechargeable inverter and car batteries.'
  }
];

// Physical and Chemical Constants for Nigerian examinations
export const SCIENTIFIC_CONSTANTS = [
  { name: 'Acceleration due to Gravity (g)', symbol: 'g', value: '9.81 m/s² (take 10 m/s² when stated)', unit: 'm/s²' },
  { name: 'Speed of Light in Vacuum (c)', symbol: 'c', value: '3.0 × 10⁸ m/s', unit: 'm/s' },
  { name: "Avogadro's Number", symbol: 'N_A', value: '6.022 × 10²³ mol⁻¹', unit: 'mol⁻¹' },
  { name: "Faraday's Constant", symbol: 'F', value: '96,500 C/mol', unit: 'C/mol' },
  { name: 'Molar Volume of Gas at s.t.p.', symbol: 'V_m', value: '22.4 dm³ (22,400 cm³)', unit: 'dm³/mol' },
  { name: 'Universal Gas Constant (R)', symbol: 'R', value: '8.314 J/(mol·K)', unit: 'J/(mol·K)' },
  { name: "Planck's Constant (h)", symbol: 'h', value: '6.626 × 10⁻³⁴ J·s', unit: 'J·s' },
  { name: 'Elementary Charge (e)', symbol: 'e', value: '1.602 × 10⁻¹⁹ C', unit: 'C' },
  { name: 'Permittivity of Free Space (ε₀)', symbol: 'ε₀', value: '8.854 × 10⁻¹² F/m', unit: 'F/m' },
  { name: 'Gravitational Constant (G)', symbol: 'G', value: '6.674 × 10⁻¹¹ N·m²/kg²', unit: 'N·m²/kg²' },
  { name: 'Standard Atmospheric Pressure', symbol: '1 atm', value: '760 mmHg = 101,325 Pa', unit: 'Pa' }
];
