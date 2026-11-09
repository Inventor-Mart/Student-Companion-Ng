export type StemSubject = 'math' | 'further_math' | 'physics' | 'chemistry';

export interface StemFormulaSlot {
  key: string;
  label: string;
  defaultVal: string;
  placeholder?: string;
  description?: string;
}

export interface StemFormulaTemplate {
  id: string;
  name: string;
  subject: StemSubject;
  category: string;
  description: string;
  previewLatex: string;
  templatePattern: string; // Interpolates ${key}
  slots: StemFormulaSlot[];
}

export const STEM_SUBJECT_TABS: { id: 'all' | StemSubject; label: string; icon: string }[] = [
  { id: 'all', label: 'All Operations', icon: '∑' },
  { id: 'math', label: 'General Maths', icon: '📐' },
  { id: 'further_math', label: 'Further Maths', icon: '∫' },
  { id: 'physics', label: 'Physics', icon: '⚡' },
  { id: 'chemistry', label: 'Chemistry', icon: '⚗️' }
];

export const STEM_FORMULA_TEMPLATES: StemFormulaTemplate[] = [
  // ==========================================
  // 1. GENERAL MATHEMATICS
  // ==========================================
  {
    id: 'math-fraction-simple',
    name: 'Simple Fraction',
    subject: 'math',
    category: 'Fractions & Roots',
    description: 'Proper or improper algebraic/arithmetic fraction a/b',
    previewLatex: '\\frac{a}{b}',
    templatePattern: '\\frac{${num}}{${den}}',
    slots: [
      { key: 'num', label: 'Numerator (a)', defaultVal: '3', placeholder: 'e.g. 3 or 2x+1' },
      { key: 'den', label: 'Denominator (b)', defaultVal: '4', placeholder: 'e.g. 4 or x-5' }
    ]
  },
  {
    id: 'math-fraction-mixed',
    name: 'Mixed Fraction',
    subject: 'math',
    category: 'Fractions & Roots',
    description: 'Mixed number with integer whole and fractional part',
    previewLatex: 'w\\frac{a}{b}',
    templatePattern: '${whole}\\frac{${num}}{${den}}',
    slots: [
      { key: 'whole', label: 'Whole Number (w)', defaultVal: '2', placeholder: 'e.g. 2' },
      { key: 'num', label: 'Numerator (a)', defaultVal: '1', placeholder: 'e.g. 1' },
      { key: 'den', label: 'Denominator (b)', defaultVal: '3', placeholder: 'e.g. 3' }
    ]
  },
  {
    id: 'math-power',
    name: 'Power / Exponent',
    subject: 'math',
    category: 'Fractions & Roots',
    description: 'Base raised to a power x^n',
    previewLatex: 'x^{n}',
    templatePattern: '{${base}}^{${exp}}',
    slots: [
      { key: 'base', label: 'Base (x)', defaultVal: 'x', placeholder: 'e.g. x or (2a)' },
      { key: 'exp', label: 'Exponent (n)', defaultVal: '2', placeholder: 'e.g. 2 or n-1' }
    ]
  },
  {
    id: 'math-sqrt',
    name: 'Square Root',
    subject: 'math',
    category: 'Fractions & Roots',
    description: 'Square root of a number or polynomial expression',
    previewLatex: '\\sqrt{x}',
    templatePattern: '\\sqrt{${radicand}}',
    slots: [
      { key: 'radicand', label: 'Radicand (x)', defaultVal: 'x^2 + 9', placeholder: 'e.g. 25 or b^2 - 4ac' }
    ]
  },
  {
    id: 'math-nth-root',
    name: 'n-th Root',
    subject: 'math',
    category: 'Fractions & Roots',
    description: 'Radical with custom index n',
    previewLatex: '\\sqrt[n]{x}',
    templatePattern: '\\sqrt[${index}]{${radicand}}',
    slots: [
      { key: 'index', label: 'Root Index (n)', defaultVal: '3', placeholder: 'e.g. 3 or 4' },
      { key: 'radicand', label: 'Radicand (x)', defaultVal: '64', placeholder: 'e.g. 64 or 8x^3' }
    ]
  },
  {
    id: 'math-quadratic-formula',
    name: 'Quadratic Formula',
    subject: 'math',
    category: 'Algebra & Quadratics',
    description: 'General solution formula for ax² + bx + c = 0',
    previewLatex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    templatePattern: 'x = \\frac{-(${b}) \\pm \\sqrt{(${b})^2 - 4(${a})(${c})}}{2(${a})}',
    slots: [
      { key: 'a', label: 'Coefficient a', defaultVal: '1', placeholder: 'a' },
      { key: 'b', label: 'Coefficient b', defaultVal: '-5', placeholder: 'b' },
      { key: 'c', label: 'Constant c', defaultVal: '6', placeholder: 'c' }
    ]
  },
  {
    id: 'math-linear-equation',
    name: 'Linear Gradient Form',
    subject: 'math',
    category: 'Algebra & Quadratics',
    description: 'Slope-intercept equation of a straight line',
    previewLatex: 'y = mx + c',
    templatePattern: 'y = ${m}x + ${c}',
    slots: [
      { key: 'm', label: 'Slope/Gradient (m)', defaultVal: '3', placeholder: 'e.g. 3 or 1/2' },
      { key: 'c', label: 'y-intercept (c)', defaultVal: '4', placeholder: 'e.g. 4 or -2' }
    ]
  },
  {
    id: 'math-simultaneous',
    name: 'Simultaneous Equations',
    subject: 'math',
    category: 'Algebra & Quadratics',
    description: 'Two-variable linear simultaneous equations system',
    previewLatex: '\\begin{cases} ax + by = c \\\\ dx + ey = f \\end{cases}',
    templatePattern: '\\begin{cases} ${a1}x + ${b1}y = ${c1} \\\\ ${a2}x + ${b2}y = ${c2} \\end{cases}',
    slots: [
      { key: 'a1', label: 'Eq 1: x coeff', defaultVal: '2', placeholder: '2' },
      { key: 'b1', label: 'Eq 1: y coeff', defaultVal: '3', placeholder: '3' },
      { key: 'c1', label: 'Eq 1: constant', defaultVal: '12', placeholder: '12' },
      { key: 'a2', label: 'Eq 2: x coeff', defaultVal: '4', placeholder: '4' },
      { key: 'b2', label: 'Eq 2: y coeff', defaultVal: '-1', placeholder: '-1' },
      { key: 'c2', label: 'Eq 2: constant', defaultVal: '5', placeholder: '5' }
    ]
  },
  {
    id: 'math-pythagoras',
    name: 'Pythagoras Theorem',
    subject: 'math',
    category: 'Geometry & Trig',
    description: 'Hypotenuse calculation c = √(a² + b²)',
    previewLatex: 'c = \\sqrt{a^2 + b^2}',
    templatePattern: 'c = \\sqrt{(${sideA})^2 + (${sideB})^2}',
    slots: [
      { key: 'sideA', label: 'Adjacent Side (a)', defaultVal: '3', placeholder: 'e.g. 3' },
      { key: 'sideB', label: 'Opposite Side (b)', defaultVal: '4', placeholder: 'e.g. 4' }
    ]
  },
  {
    id: 'math-sine-rule',
    name: 'Sine Rule',
    subject: 'math',
    category: 'Geometry & Trig',
    description: 'Sine rule for non-right angled triangles',
    previewLatex: '\\frac{a}{\\sin A} = \\frac{b}{\\sin B}',
    templatePattern: '\\frac{${a}}{\\sin(${angleA}^\\circ)} = \\frac{${b}}{\\sin(${angleB}^\\circ)}',
    slots: [
      { key: 'a', label: 'Side a', defaultVal: '8', placeholder: '8' },
      { key: 'angleA', label: 'Angle A (°)', defaultVal: '45', placeholder: '45' },
      { key: 'b', label: 'Side b', defaultVal: 'b', placeholder: 'b' },
      { key: 'angleB', label: 'Angle B (°)', defaultVal: '60', placeholder: '60' }
    ]
  },
  {
    id: 'math-circle-area',
    name: 'Area of Circle',
    subject: 'math',
    category: 'Geometry & Trig',
    description: 'Standard circle area formula A = πr²',
    previewLatex: 'A = \\pi r^2',
    templatePattern: 'A = \\pi (${radius})^2',
    slots: [
      { key: 'radius', label: 'Radius (r)', defaultVal: '7', placeholder: 'e.g. 7 cm' }
    ]
  },
  {
    id: 'math-simple-interest',
    name: 'Simple Interest',
    subject: 'math',
    category: 'Commercial Arithmetic',
    description: 'I = (P × R × T) / 100 for financial math',
    previewLatex: 'I = \\frac{P \\times R \\times T}{100}',
    templatePattern: 'I = \\frac{(${p}) \\times (${r}) \\times (${t})}{100}',
    slots: [
      { key: 'p', label: 'Principal (P)', defaultVal: '50000', placeholder: 'Principal ₦' },
      { key: 'r', label: 'Rate (R %)', defaultVal: '10', placeholder: 'Rate %' },
      { key: 't', label: 'Time (T yrs)', defaultVal: '2', placeholder: 'Time in years' }
    ]
  },

  // ==========================================
  // 2. FURTHER MATHEMATICS
  // ==========================================
  {
    id: 'fmath-definite-integral',
    name: 'Definite Integral',
    subject: 'further_math',
    category: 'Calculus',
    description: 'Integral evaluated between lower and upper limits',
    previewLatex: '\\int_{a}^{b} f(x)\\,dx',
    templatePattern: '\\int_{${lower}}^{${upper}} (${integrand})\\,d${var}',
    slots: [
      { key: 'lower', label: 'Lower Limit (a)', defaultVal: '0', placeholder: 'e.g. 0' },
      { key: 'upper', label: 'Upper Limit (b)', defaultVal: '2', placeholder: 'e.g. 2 or \\pi' },
      { key: 'integrand', label: 'Function f(x)', defaultVal: '3x^2 + 2x', placeholder: 'e.g. 3x^2 + 2x' },
      { key: 'var', label: 'Variable', defaultVal: 'x', placeholder: 'x' }
    ]
  },
  {
    id: 'fmath-derivative',
    name: 'Derivative Notation',
    subject: 'further_math',
    category: 'Calculus',
    description: 'Differential calculus rate of change dy/dx',
    previewLatex: '\\frac{dy}{dx} = \\frac{d}{dx}[f(x)]',
    templatePattern: '\\frac{d}{d${var}}[${func}]',
    slots: [
      { key: 'func', label: 'Function f(x)', defaultVal: 'x^3 - 4x^2 + 5', placeholder: 'e.g. sin(x)' },
      { key: 'var', label: 'Variable', defaultVal: 'x', placeholder: 'x' }
    ]
  },
  {
    id: 'fmath-matrix-2x2',
    name: '2×2 Matrix & Determinant',
    subject: 'further_math',
    category: 'Matrices & Vectors',
    description: 'Standard 2x2 transformation matrix',
    previewLatex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}',
    templatePattern: '\\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix}',
    slots: [
      { key: 'a', label: 'a (row 1, col 1)', defaultVal: '4', placeholder: '4' },
      { key: 'b', label: 'b (row 1, col 2)', defaultVal: '2', placeholder: '2' },
      { key: 'c', label: 'c (row 2, col 1)', defaultVal: '1', placeholder: '1' },
      { key: 'd', label: 'd (row 2, col 2)', defaultVal: '3', placeholder: '3' }
    ]
  },
  {
    id: 'fmath-vector-magnitude',
    name: 'Vector Magnitude',
    subject: 'further_math',
    category: 'Matrices & Vectors',
    description: 'Length of a 2D/3D coordinate vector |v|',
    previewLatex: '|\\vec{v}| = \\sqrt{x^2 + y^2}',
    templatePattern: '|\\vec{v}| = \\sqrt{(${vx})^2 + (${vy})^2}',
    slots: [
      { key: 'vx', label: 'i component (x)', defaultVal: '3', placeholder: '3' },
      { key: 'vy', label: 'j component (y)', defaultVal: '4', placeholder: '4' }
    ]
  },
  {
    id: 'fmath-ap-term',
    name: 'Arithmetic Progression (AP)',
    subject: 'further_math',
    category: 'Sequences & Series',
    description: 'n-th term of an AP: Tn = a + (n-1)d',
    previewLatex: 'T_n = a + (n - 1)d',
    templatePattern: 'T_{${n}} = ${a} + (${n} - 1)(${d})',
    slots: [
      { key: 'a', label: 'First Term (a)', defaultVal: '2', placeholder: '2' },
      { key: 'd', label: 'Common Difference (d)', defaultVal: '3', placeholder: '3' },
      { key: 'n', label: 'Term Number (n)', defaultVal: '10', placeholder: '10' }
    ]
  },
  {
    id: 'fmath-gp-sum-infinity',
    name: 'Sum to Infinity (GP)',
    subject: 'further_math',
    category: 'Sequences & Series',
    description: 'Convergent geometric series sum S∞ = a / (1 - r)',
    previewLatex: 'S_\\infty = \\frac{a}{1 - r}',
    templatePattern: 'S_\\infty = \\frac{${a}}{1 - (${r})}',
    slots: [
      { key: 'a', label: 'First Term (a)', defaultVal: '16', placeholder: '16' },
      { key: 'r', label: 'Common Ratio (r)', defaultVal: '1/2', placeholder: 'e.g. 1/2' }
    ]
  },
  {
    id: 'fmath-combination',
    name: 'Combinations (nCr)',
    subject: 'further_math',
    category: 'Probability & Combinatorics',
    description: 'Selection without order nCr = n! / (r!(n-r)!)',
    previewLatex: '^{n}C_{r} = \\frac{n!}{r!(n - r)!}',
    templatePattern: '^{${n}}C_{${r}} = \\frac{${n}!}{${r}!(${n} - ${r})!}',
    slots: [
      { key: 'n', label: 'Total Items (n)', defaultVal: '8', placeholder: '8' },
      { key: 'r', label: 'Items Chosen (r)', defaultVal: '3', placeholder: '3' }
    ]
  },
  {
    id: 'fmath-log-base',
    name: 'Logarithm with Base',
    subject: 'further_math',
    category: 'Algebra & Logs',
    description: 'Logarithm of number x to base b',
    previewLatex: '\\log_{b}(x)',
    templatePattern: '\\log_{${base}}(${val})',
    slots: [
      { key: 'base', label: 'Base (b)', defaultVal: '2', placeholder: 'e.g. 2, 10, or e' },
      { key: 'val', label: 'Value (x)', defaultVal: '32', placeholder: 'e.g. 32' }
    ]
  },

  // ==========================================
  // 3. PHYSICS
  // ==========================================
  {
    id: 'physics-kinematic-velocity',
    name: 'Velocity Equation',
    subject: 'physics',
    category: 'Mechanics & Kinematics',
    description: 'Linear uniform acceleration: v = u + at',
    previewLatex: 'v = u + at',
    templatePattern: 'v = ${u} + (${a})(${t})',
    slots: [
      { key: 'u', label: 'Initial Velocity (u m/s)', defaultVal: '0', placeholder: '0' },
      { key: 'a', label: 'Acceleration (a m/s²)', defaultVal: '9.8', placeholder: '9.8' },
      { key: 't', label: 'Time (t s)', defaultVal: '5', placeholder: '5' }
    ]
  },
  {
    id: 'physics-kinematic-displacement',
    name: 'Displacement Equation',
    subject: 'physics',
    category: 'Mechanics & Kinematics',
    description: 'Displacement with constant acceleration: s = ut + 0.5at²',
    previewLatex: 's = ut + \\frac{1}{2}at^2',
    templatePattern: 's = (${u})(${t}) + \\frac{1}{2}(${a})(${t})^2',
    slots: [
      { key: 'u', label: 'Initial Velocity (u)', defaultVal: '10', placeholder: '10' },
      { key: 't', label: 'Time (t)', defaultVal: '4', placeholder: '4' },
      { key: 'a', label: 'Acceleration (a)', defaultVal: '2', placeholder: '2' }
    ]
  },
  {
    id: 'physics-newton-second',
    name: "Newton's 2nd Law",
    subject: 'physics',
    category: 'Mechanics & Kinematics',
    description: 'Net resultant force formula: F = ma',
    previewLatex: 'F = ma',
    templatePattern: 'F = (${m}\\text{ kg}) \\times (${a}\\text{ m/s}^2)',
    slots: [
      { key: 'm', label: 'Mass (m in kg)', defaultVal: '15', placeholder: '15' },
      { key: 'a', label: 'Acceleration (a in m/s²)', defaultVal: '4', placeholder: '4' }
    ]
  },
  {
    id: 'physics-kinetic-energy',
    name: 'Kinetic Energy',
    subject: 'physics',
    category: 'Energy & Work',
    description: 'Energy of motion: Ek = 0.5mv²',
    previewLatex: 'E_k = \\frac{1}{2}mv^2',
    templatePattern: 'E_k = \\frac{1}{2}(${m})(${v})^2',
    slots: [
      { key: 'm', label: 'Mass (m in kg)', defaultVal: '2', placeholder: '2' },
      { key: 'v', label: 'Velocity (v in m/s)', defaultVal: '12', placeholder: '12' }
    ]
  },
  {
    id: 'physics-ohms-law',
    name: "Ohm's Law",
    subject: 'physics',
    category: 'Electricity & Circuits',
    description: 'Voltage, current and resistance relation: V = IR',
    previewLatex: 'V = IR',
    templatePattern: 'V = (${current}\\text{ A}) \\times (${resistance}\\,\\Omega)',
    slots: [
      { key: 'current', label: 'Current (I in Amps)', defaultVal: '2.5', placeholder: '2.5' },
      { key: 'resistance', label: 'Resistance (R in Ω)', defaultVal: '10', placeholder: '10' }
    ]
  },
  {
    id: 'physics-resistors-parallel',
    name: 'Parallel Resistors',
    subject: 'physics',
    category: 'Electricity & Circuits',
    description: 'Equivalent resistance of two parallel branches',
    previewLatex: '\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2}',
    templatePattern: '\\frac{1}{R_p} = \\frac{1}{${r1}\\,\\Omega} + \\frac{1}{${r2}\\,\\Omega}',
    slots: [
      { key: 'r1', label: 'Resistor 1 (R1 in Ω)', defaultVal: '6', placeholder: '6' },
      { key: 'r2', label: 'Resistor 2 (R2 in Ω)', defaultVal: '12', placeholder: '12' }
    ]
  },
  {
    id: 'physics-wave-equation',
    name: 'Wave Equation',
    subject: 'physics',
    category: 'Waves & Optics',
    description: 'Wave velocity formula: v = fλ',
    previewLatex: 'v = f\\lambda',
    templatePattern: 'v = (${freq}\\text{ Hz}) \\times (${lambda}\\text{ m})',
    slots: [
      { key: 'freq', label: 'Frequency (f in Hz)', defaultVal: '50', placeholder: '50' },
      { key: 'lambda', label: 'Wavelength (λ in m)', defaultVal: '6.8', placeholder: '6.8' }
    ]
  },
  {
    id: 'physics-snell-law',
    name: "Snell's Law of Refraction",
    subject: 'physics',
    category: 'Waves & Optics',
    description: 'Refractive index relation: n1 sin(θ1) = n2 sin(θ2)',
    previewLatex: 'n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2',
    templatePattern: '(${n1})\\sin(${theta1}^\\circ) = (${n2})\\sin(${theta2}^\\circ)',
    slots: [
      { key: 'n1', label: 'Medium 1 Index (n1)', defaultVal: '1.0', placeholder: '1.0' },
      { key: 'theta1', label: 'Incident Angle (°)', defaultVal: '30', placeholder: '30' },
      { key: 'n2', label: 'Medium 2 Index (n2)', defaultVal: '1.5', placeholder: '1.5' },
      { key: 'theta2', label: 'Refracted Angle (°)', defaultVal: '\\theta_2', placeholder: 'θ2' }
    ]
  },

  // ==========================================
  // 4. CHEMISTRY
  // ==========================================
  {
    id: 'chem-ideal-gas',
    name: 'Ideal Gas Law',
    subject: 'chemistry',
    category: 'Gas Laws & Thermodynamics',
    description: 'State equation of an ideal gas: PV = nRT',
    previewLatex: 'PV = nRT',
    templatePattern: '(${p}\\text{ atm})(${v}\\text{ L}) = (${n}\\text{ mol})(${r})(${t}\\text{ K})',
    slots: [
      { key: 'p', label: 'Pressure (P atm)', defaultVal: '1.5', placeholder: '1.5' },
      { key: 'v', label: 'Volume (V L)', defaultVal: '22.4', placeholder: '22.4' },
      { key: 'n', label: 'Moles (n mol)', defaultVal: '1', placeholder: '1' },
      { key: 'r', label: 'Constant (R)', defaultVal: '0.0821', placeholder: '0.0821' },
      { key: 't', label: 'Temperature (T K)', defaultVal: '298', placeholder: '298' }
    ]
  },
  {
    id: 'chem-combined-gas',
    name: 'Combined Gas Law',
    subject: 'chemistry',
    category: 'Gas Laws & Thermodynamics',
    description: 'Boyle, Charles, and Gay-Lussac combined: (P1*V1)/T1 = (P2*V2)/T2',
    previewLatex: '\\frac{P_1 V_1}{T_1} = \\frac{P_2 V_2}{T_2}',
    templatePattern: '\\frac{(${p1})(${v1})}{${t1}} = \\frac{(${p2})(${v2})}{${t2}}',
    slots: [
      { key: 'p1', label: 'Initial Pressure (P1)', defaultVal: '760', placeholder: '760' },
      { key: 'v1', label: 'Initial Volume (V1)', defaultVal: '500', placeholder: '500' },
      { key: 't1', label: 'Initial Temp (T1)', defaultVal: '273', placeholder: '273' },
      { key: 'p2', label: 'Final Pressure (P2)', defaultVal: '800', placeholder: '800' },
      { key: 'v2', label: 'Final Volume (V2)', defaultVal: 'V_2', placeholder: 'V2' },
      { key: 't2', label: 'Final Temp (T2)', defaultVal: '300', placeholder: '300' }
    ]
  },
  {
    id: 'chem-molar-conc',
    name: 'Molar Concentration',
    subject: 'chemistry',
    category: 'Stoichiometry & Solutions',
    description: 'Molarity formula: C = n / V or C = m / (M * V)',
    previewLatex: 'C = \\frac{n}{V}',
    templatePattern: 'C = \\frac{${moles}\\text{ mol}}{${volume}\\text{ dm}^3}',
    slots: [
      { key: 'moles', label: 'Moles (n)', defaultVal: '0.25', placeholder: '0.25' },
      { key: 'volume', label: 'Volume (V dm³)', defaultVal: '0.50', placeholder: '0.50' }
    ]
  },
  {
    id: 'chem-dilution',
    name: 'Volumetric Dilution',
    subject: 'chemistry',
    category: 'Stoichiometry & Solutions',
    description: 'Titration/dilution equation: C1 V1 = C2 V2',
    previewLatex: 'C_1 V_1 = C_2 V_2',
    templatePattern: '(${c1}\\text{ M})(${v1}\\text{ cm}^3) = (${c2}\\text{ M})(${v2}\\text{ cm}^3)',
    slots: [
      { key: 'c1', label: 'Conc 1 (C1 M)', defaultVal: '2.0', placeholder: '2.0' },
      { key: 'v1', label: 'Vol 1 (V1 cm³)', defaultVal: '25.0', placeholder: '25.0' },
      { key: 'c2', label: 'Conc 2 (C2 M)', defaultVal: '0.1', placeholder: '0.1' },
      { key: 'v2', label: 'Vol 2 (V2 cm³)', defaultVal: 'V_2', placeholder: 'V2' }
    ]
  },
  {
    id: 'chem-ph-calc',
    name: 'pH Calculation',
    subject: 'chemistry',
    category: 'Acids, Bases & Salts',
    description: 'Logarithmic hydrogen ion activity: pH = -log10[H+]',
    previewLatex: '\\text{pH} = -\\log_{10}[H^+]',
    templatePattern: '\\text{pH} = -\\log_{10}(${hConc}\\times 10^{-${exp}})',
    slots: [
      { key: 'hConc', label: 'H+ Coefficient', defaultVal: '1.0', placeholder: '1.0' },
      { key: 'exp', label: 'Negative Exponent', defaultVal: '4', placeholder: '4' }
    ]
  },
  {
    id: 'chem-equilibrium-kc',
    name: 'Equilibrium Constant (Kc)',
    subject: 'chemistry',
    category: 'Chemical Kinetics & Equilibrium',
    description: 'Law of mass action: Kc = [Products] / [Reactants]',
    previewLatex: 'K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}',
    templatePattern: 'K_c = \\frac{[${prod1}]^{${p1Exp}} [${prod2}]^{${p2Exp}}}{[${react1}]^{${r1Exp}} [${react2}]^{${r2Exp}}}',
    slots: [
      { key: 'prod1', label: 'Product 1', defaultVal: 'SO_3', placeholder: 'SO3' },
      { key: 'p1Exp', label: 'Prod 1 Coeff', defaultVal: '2', placeholder: '2' },
      { key: 'prod2', label: 'Product 2 (optional)', defaultVal: '1', placeholder: '1' },
      { key: 'p2Exp', label: 'Prod 2 Coeff', defaultVal: '1', placeholder: '1' },
      { key: 'react1', label: 'Reactant 1', defaultVal: 'SO_2', placeholder: 'SO2' },
      { key: 'r1Exp', label: 'React 1 Coeff', defaultVal: '2', placeholder: '2' },
      { key: 'react2', label: 'Reactant 2', defaultVal: 'O_2', placeholder: 'O2' },
      { key: 'r2Exp', label: 'React 2 Coeff', defaultVal: '1', placeholder: '1' }
    ]
  },
  {
    id: 'chem-radioactive-halflife',
    name: 'Radioactive Half-Life',
    subject: 'chemistry',
    category: 'Nuclear Chemistry',
    description: 'Decay law: N(t) = N0 * (1/2)^(t / t_half)',
    previewLatex: 'N(t) = N_0 \\left(\\frac{1}{2}\\right)^{\\frac{t}{t_{1/2}}}',
    templatePattern: 'N(${t}) = (${n0})\\left(\\frac{1}{2}\\right)^{\\frac{${t}}{${thalf}}}',
    slots: [
      { key: 'n0', label: 'Initial Quantity (N0)', defaultVal: '100\\text{ g}', placeholder: '100 g' },
      { key: 't', label: 'Elapsed Time (t)', defaultVal: '24\\text{ hrs}', placeholder: '24 hrs' },
      { key: 'thalf', label: 'Half-Life (t1/2)', defaultVal: '8\\text{ hrs}', placeholder: '8 hrs' }
    ]
  }
];

/**
 * Helper to interpolate slot values into template pattern
 */
export function interpolateFormulaTemplate(pattern: string, slotValues: Record<string, string>): string {
  if (!pattern) return '';
  return pattern.replace(/\$\{(\w+)\}/g, (_, key) => {
    return slotValues[key] !== undefined ? slotValues[key] : '';
  });
}
