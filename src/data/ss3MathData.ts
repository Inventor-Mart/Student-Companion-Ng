import { CurriculumTopic } from '../types';

export const SS3_MATH_TOPICS: CurriculumTopic[] = [
  // ==========================================
  // WEEK 1: SURDS & CONJUGATE OPERATIONS
  // ==========================================
  {
    id: 'math-ss3-term2-week1',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Surds: Simplification, Conjugates & Denominator Rationalization',
    subtopics: [
      'Rules of Radicals: Basic Surd Laws and Simplification into Single and Mixed Surds',
      'Addition and Subtraction of Like and Unlike Surds',
      'Multiplication and Division of Binomial Surds',
      'Conjugate Surds and the Rationalization of Denominators with Worked Proofs'
    ],
    readingTimeMinutes: 8,
    summary: 'Master operational laws of irrational radicals, manipulate mixed and pure surds, and eliminate square root denominators using algebraic conjugate multipliers.',
    contentMarkdown: `### 1. Fundamental Rules of Surds

A **surd** is an irrational number expressed with a radical sign ($\\sqrt{\\phantom{x}}$) whose exact root cannot be extracted as a clean ratio of two integers:

| Surd Law | Mathematical Expression | Illustrative Numerical Example |
| :--- | :--- | :--- |
| **Multiplication Rule** | $\\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b}$ | $\\sqrt{50} = \\sqrt{25 \\times 2} = 5\\sqrt{2}$ |
| **Division Rule** | $\\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}$ | $\\sqrt{\\frac{49}{16}} = \\frac{\\sqrt{49}}{\\sqrt{16}} = \\frac{7}{4}$ |
| **Power Rule** | $(\\sqrt{a})^2 = a$ | $(\\sqrt{7})^2 = 7$ |
| **Scalar Distributive** | $k\\sqrt{a} + m\\sqrt{a} = (k + m)\\sqrt{a}$ | $3\\sqrt{5} + 4\\sqrt{5} = 7\\sqrt{5}$ |

---

### 2. Geometric Origins & Conjugate Rationalization

[Diagram: math-surds-and-conjugates]

When an algebraic fraction has a binomial surd in the denominator, the fraction is deemed incomplete by WAEC examiners until the denominator is **rationalized** (cleared of all radical symbols).

#### The Conjugate Factor Principle:
The conjugate of $(\\sqrt{a} + \\sqrt{b})$ is $(\\sqrt{a} - \\sqrt{b})$.
Multiplying them creates a **difference of two squares**:

$$(\\sqrt{a} + \\sqrt{b})(\\sqrt{a} - \\sqrt{b}) = (\\sqrt{a})^2 - (\\sqrt{b})^2 = a - b$$

---

### 3. Worked WAEC Examination Drill

**Question:** Rationalize the denominator and simplify $\\frac{4\\sqrt{3} + 2\\sqrt{2}}{3\\sqrt{2} - 2\\sqrt{3}}$.

1. **Identify the Conjugate:** The denominator is $3\\sqrt{2} - 2\\sqrt{3}$, so its conjugate is $3\\sqrt{2} + 2\\sqrt{3}$.
2. **Multiply Numerator and Denominator:**
   $$\\frac{4\\sqrt{3} + 2\\sqrt{2}}{3\\sqrt{2} - 2\\sqrt{3}} \\times \\frac{3\\sqrt{2} + 2\\sqrt{3}}{3\\sqrt{2} + 2\\sqrt{3}}$$
3. **Expand Denominator:**
   $$(3\\sqrt{2})^2 - (2\\sqrt{3})^2 = (9 \\times 2) - (4 \\times 3) = 18 - 12 = 6$$
4. **Expand Numerator:**
   $$(4\\sqrt{3})(3\\sqrt{2}) + (4\\sqrt{3})(2\\sqrt{3}) + (2\\sqrt{2})(3\\sqrt{2}) + (2\\sqrt{2})(2\\sqrt{3})$$
   $$= 12\\sqrt{6} + 24 + 12 + 4\\sqrt{6} = 36 + 16\\sqrt{6}$$
5. **Reduce Fraction:**
   $$\\frac{36 + 16\\sqrt{6}}{6} = 6 + \\frac{8\\sqrt{6}}{3}$$`,
    keyTakeaways: [
      'Surds represent irrational roots that cannot be stated as terminating or recurring fractions.',
      'Only like surds (identical radicands) can be added or subtracted.',
      'To rationalize a binomial denominator, multiply top and bottom by its conjugate.',
      'The product of two conjugates always reduces to the difference of two squares.'
    ],
    associatedQuizId: 'math-ss3-surds-quiz'
  },

  // ==========================================
  // WEEK 2: MATRICES & DETERMINANTS
  // ==========================================
  {
    id: 'math-ss3-term2-week2',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Matrices & Determinants: Operations, Inverse & Cramer’s Rule',
    subtopics: [
      'Matrix Notation, Dimensions, and Types (Row, Column, Square, Identity, Zero Matrix)',
      'Matrix Arithmetic: Addition, Subtraction, and Matrix Multiplication Conditions',
      'Determinants of 2x2 and 3x3 Matrices using Minors and Cofactors',
      'Matrix Inversion and Solving Simultaneous Linear Equations via Cramer’s Rule'
    ],
    readingTimeMinutes: 9,
    summary: 'Analyze rectangular arrays of numbers, master row-by-column matrix multiplication, calculate 2x2 and 3x3 determinants, and solve linear systems using matrix inverses and Cramer’s Rule.',
    contentMarkdown: `### 1. Matrix Properties and Arithmetic

A **matrix** of order $m \\times n$ consists of $m$ rows and $n$ columns. Two matrices can be multiplied **if and only if** the number of columns in the first matrix equals the number of rows in the second matrix:

$$(m \\times k) \\times (k \\times n) = (m \\times n)$$

| Operation | Governing Mathematical Rule | Key Constraint |
| :--- | :--- | :--- |
| **Addition / Subtraction** | Corresponding elements are added/subtracted: $c_{ij} = a_{ij} \\pm b_{ij}$ | Matrices must have identical dimensions |
| **Scalar Multiplication** | Every entry is multiplied by scalar: $k \\cdot A = [k \\cdot a_{ij}]$ | Applies to all matrix orders |
| **Matrix Multiplication** | Dot product of rows of $A$ and columns of $B$ | Columns of $A$ = Rows of $B$ |
| **Identity Matrix ($I$)** | Square matrix with 1s along principal diagonal and 0s elsewhere | $A \\cdot I = I \\cdot A = A$ |

---

### 2. Determinant and Matrix Inversion (2x2 Matrix)

For matrix $A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$:
1. **Determinant:**
   $$\\det(A) = |A| = ad - bc$$
   - If $|A| = 0$, the matrix is **singular** and has no inverse.
   - If $|A| \\ne 0$, the matrix is **non-singular**.
2. **Inverse Matrix ($A^{-1}$):**
   $$A^{-1} = \\frac{1}{|A|} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix} = \\frac{1}{ad - bc} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$$

---

### 3. Solving Simultaneous Equations via Cramer's Rule

Consider the system:
$$a_1 x + b_1 y = c_1$$
$$a_2 x + b_2 y = c_2$$

Let $\\Delta = \\begin{vmatrix} a_1 & b_1 \\\\ a_2 & b_2 \\end{vmatrix}$, $\\Delta_x = \\begin{vmatrix} c_1 & b_1 \\\\ c_2 & b_2 \\end{vmatrix}$, and $\\Delta_y = \\begin{vmatrix} a_1 & c_1 \\\\ a_2 & c_2 \\end{vmatrix}$.
Then:
$$x = \\frac{\\Delta_x}{\\Delta}, \\quad y = \\frac{\\Delta_y}{\\Delta} \\quad (\\text{provided } \\Delta \\ne 0)$$`,
    keyTakeaways: [
      'Matrix multiplication is row-by-column and is generally not commutative: AB ≠ BA.',
      'A singular matrix has a determinant of zero and possesses no inverse.',
      'The inverse of a 2x2 matrix swaps diagonal entries and negates off-diagonal entries.',
      'Cramer’s Rule solves linear systems by substituting constant terms into determinant columns.'
    ],
    associatedQuizId: 'math-ss3-matrices-quiz'
  },

  // ==========================================
  // WEEK 3: COORDINATE GEOMETRY OF THE STRAIGHT LINE
  // ==========================================
  {
    id: 'math-ss3-term2-week3',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Coordinate Geometry of the Straight Line: Slopes, Distances & Equations',
    subtopics: [
      'Distance Between Two Points on the Cartesian Plane via the Pythagorean Metric',
      'Mid-Point and Ratio Division Coordinates of a Line Segment',
      'Gradient (Slope) $m = \\frac{y_2 - y_1}{x_2 - x_1}$ and Angle of Inclination $\\tan \\theta$',
      'Parallel ($m_1 = m_2$) and Perpendicular ($m_1 m_2 = -1$) Line Relationships'
    ],
    readingTimeMinutes: 8,
    summary: 'Apply algebraic coordinates to plane geometry, calculate linear distance and slope inclinations, construct straight line equations, and analyze orthogonal perpendicularity.',
    contentMarkdown: `### 1. Fundamental Coordinate Formulas

Given two points $A(x_1, y_1)$ and $B(x_2, y_2)$ on a two-dimensional Cartesian grid:

| Metric | Algebraic Formula | Geometric Meaning |
| :--- | :--- | :--- |
| **Distance ($d$)** | $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$ | Straight-line Euclidean distance between points |
| **Mid-Point ($M$)** | $M = \\left( \\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2} \\right)$ | Point equidistant from both endpoints |
| **Gradient ($m$)** | $m = \\frac{y_2 - y_1}{x_2 - x_1} = \\tan \\theta$ | Vertical rise divided by horizontal run |
| **Point-Slope Form** | $y - y_1 = m(x - x_1)$ | Line passing through $(x_1, y_1)$ with slope $m$ |
| **Slope-Intercept Form**| $y = mx + c$ | Line with gradient $m$ and y-intercept $c$ |

---

### 2. Parallel and Perpendicular Lines

- **Parallel Lines:** Two lines $L_1$ and $L_2$ with slopes $m_1$ and $m_2$ are parallel if and only if:
  $$m_1 = m_2$$
- **Perpendicular Lines:** Two lines are perpendicular (orthogonal) if and only if:
  $$m_1 \\times m_2 = -1 \\implies m_2 = -\\frac{1}{m_1}$$

#### Worked Example:
Find the equation of the line passing through point $P(3, -2)$ perpendicular to $2x - 4y + 5 = 0$.

1. **Find slope of given line:**
   $$-4y = -2x - 5 \\implies y = \\frac{1}{2}x + \\frac{5}{4} \\implies m_1 = \\frac{1}{2}$$
2. **Find perpendicular slope ($m_2$):**
   $$m_2 = -\\frac{1}{m_1} = -\\frac{1}{1/2} = -2$$
3. **Use Point-Slope Formula:**
   $$y - (-2) = -2(x - 3) \\implies y + 2 = -2x + 6 \\implies 2x + y - 4 = 0$$`,
    keyTakeaways: [
      'The distance formula derives directly from the Pythagorean theorem on the Cartesian plane.',
      'Gradient represents the tangent of the angle of inclination: m = tan(θ).',
      'Parallel lines share identical slopes: m1 = m2.',
      'Perpendicular lines have negative reciprocal slopes: m1 · m2 = -1.'
    ],
    associatedQuizId: 'math-ss3-coordinate-line-quiz'
  },

  // ==========================================
  // WEEK 4: DIFFERENTIATION FUNDAMENTALS (CALCULUS I)
  // ==========================================
  {
    id: 'math-ss3-term2-week4',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Differentiation Fundamentals: Limits, First Principles & Standard Rules',
    subtopics: [
      'The Concept of Limits and Instantaneous Rate of Change',
      'Differentiation from First Principles: $\\frac{dy}{dx} = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$',
      'The General Power Rule: $\\frac{d}{dx}(x^n) = nx^{n-1}$ for All Real Numbers',
      'Operational Rules: Constant Multiple, Sum, and Difference Rules'
    ],
    readingTimeMinutes: 9,
    summary: 'Uncover differential calculus from first principles, evaluate infinitesimal limits, and master general power rules for computing polynomial gradients.',
    contentMarkdown: `### 1. Limits and First Principles

Calculus investigates how quantities change dynamically. The **derivative** $\\frac{dy}{dx}$ represents the gradient of the tangent to a curve at any specific point:

$$\\frac{dy}{dx} = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}$$

#### Proof from First Principles for $f(x) = x^2$:
1. $f(x) = x^2$
2. $f(x + h) = (x + h)^2 = x^2 + 2xh + h^2$
3. $f(x + h) - f(x) = x^2 + 2xh + h^2 - x^2 = 2xh + h^2$
4. Divide by $h$:
   $$\\frac{f(x + h) - f(x)}{h} = \\frac{2xh + h^2}{h} = 2x + h$$
5. Take limit as $h \\to 0$:
   $$\\frac{dy}{dx} = \\lim_{h \\to 0} (2x + h) = 2x$$

---

### 2. Standard Rules of Differentiation

| Function $y = f(x)$ | Derivative $\\frac{dy}{dx}$ | Core Rule Name |
| :--- | :--- | :--- |
| $y = c$ (constant) | $\\frac{dy}{dx} = 0$ | Constant Rule |
| $y = x^n$ | $\\frac{dy}{dx} = nx^{n-1}$ | Power Rule |
| $y = k \\cdot f(x)$ | $\\frac{dy}{dx} = k \\cdot f'(x)$ | Constant Multiple Rule |
| $y = u(x) \\pm v(x)$ | $\\frac{dy}{dx} = \\frac{du}{dx} \\pm \\frac{dv}{dx}$ | Sum / Difference Rule |

#### Application Examples:
- If $y = 5x^4 - 3x^2 + 7x - 9$:
  $$\\frac{dy}{dx} = 5(4x^3) - 3(2x) + 7(1) - 0 = 20x^3 - 6x + 7$$
- If $y = \\frac{1}{x^3} = x^{-3}$:
  $$\\frac{dy}{dx} = -3x^{-4} = -\\frac{3}{x^4}$$
- If $y = \\sqrt{x} = x^{1/2}$:
  $$\\frac{dy}{dx} = \\frac{1}{2}x^{-1/2} = \\frac{1}{2\\sqrt{x}}$$`,
    keyTakeaways: [
      'The derivative dy/dx gives the instantaneous rate of change and tangent slope of a curve.',
      'The derivative of any constant is zero because constants do not change.',
      'The power rule states: bring down the exponent as a multiplier and subtract one from power.',
      'Polynomials are differentiated term by term.'
    ],
    associatedQuizId: 'math-ss3-differentiation-quiz'
  },

  // ==========================================
  // WEEK 5: APPLICATIONS OF DIFFERENTIATION
  // ==========================================
  {
    id: 'math-ss3-term2-week5',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Applications of Differentiation: Tangents, Normals & Turning Points',
    subtopics: [
      'Equations of Tangents and Normals to Smooth Polynomial Curves',
      'Stationary Points (Turning Points): Conditions for Maximum, Minimum, and Inflection',
      'Second Derivative Test: $\\frac{d^2 y}{dx^2} < 0$ (Maximum) vs. $\\frac{d^2 y}{dx^2} > 0$ (Minimum)',
      'Practical Optimization Problems in Geometry, Business, and Physical Sciences'
    ],
    readingTimeMinutes: 9,
    summary: 'Apply differential calculus to geometric curves, find equations of tangent and normal lines, classify local stationary turning points, and solve practical optimization problems.',
    contentMarkdown: `### 1. Tangents and Normals to Curves

[Diagram: math-coordinate-geometry-calculus]

1. **Slope of Tangent:** The slope $m_t$ of the tangent to curve $y = f(x)$ at point $(x_1, y_1)$ is:
   $$m_t = \\left. \\frac{dy}{dx} \\right|_{x = x_1}$$
2. **Equation of Tangent:**
   $$y - y_1 = m_t(x - x_1)$$
3. **Slope of Normal:** The normal is perpendicular to the tangent:
   $$m_n = -\\frac{1}{m_t}$$
4. **Equation of Normal:**
   $$y - y_1 = m_n(x - x_1)$$

---

### 2. Stationary Points and the Second Derivative Test

A stationary (turning) point occurs wherever the gradient vanishes: **$\\frac{dy}{dx} = 0$**.

| Condition | Nature of Stationary Point | Geometric Curve Profile |
| :--- | :--- | :--- |
| $\\frac{dy}{dx} = 0$ and $\\frac{d^2 y}{dx^2} < 0$ | **Local Maximum** | Peak / Crest (concave down) |
| $\\frac{dy}{dx} = 0$ and $\\frac{d^2 y}{dx^2} > 0$ | **Local Minimum** | Trough / Valley (concave up) |
| $\\frac{dy}{dx} = 0$ and $\\frac{d^2 y}{dx^2} = 0$ | **Point of Inflexion** | S-shaped inflection curve |

---

### 3. Optimization Problem Walkthrough

**Problem:** A farmer has $120\\text{ meters}$ of fencing wire to enclose a rectangular vegetable plot along a straight river bank (no fencing needed along the river). Find the dimensions that maximize the enclosed area.

1. **Variables:** Let length = $x$, width = $y$.
2. **Constraint Equation:** $x + 2y = 120 \\implies x = 120 - 2y$.
3. **Area Function:** $A = x \\cdot y = (120 - 2y)y = 120y - 2y^2$.
4. **Differentiate with respect to $y$:**
   $$\\frac{dA}{dy} = 120 - 4y$$
5. **Set $\\frac{dA}{dy} = 0$ for maximum:**
   $$120 - 4y = 0 \\implies 4y = 120 \\implies y = 30\\text{ m}$$
6. **Find $x$:**
   $$x = 120 - 2(30) = 60\\text{ m}$$
7. **Verify Maximum via Second Derivative:**
   $$\\frac{d^2 A}{dy^2} = -4 < 0 \\quad (\\text{Confirmed Maximum})$$
   $$\\text{Maximum Area} = 60 \\times 30 = 1,800\\text{ m}^2$$`,
    keyTakeaways: [
      'The gradient of the tangent line equals the first derivative evaluated at that point.',
      'The normal line is perpendicular to the tangent line: m_normal = -1 / m_tangent.',
      'Stationary points occur strictly where dy/dx = 0.',
      'If the second derivative d²y/dx² is negative, the point is a local maximum.'
    ],
    associatedQuizId: 'math-ss3-calculus-applications-quiz'
  },

  // ==========================================
  // WEEK 6: MID-TERM WAEC PROBLEM SOLVING CLINIC
  // ==========================================
  {
    id: 'math-ss3-term2-week6',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Mid-Term Assessment & WAEC SSCE Problem Solving Clinic',
    subtopics: [
      'Comprehensive Review: Surds, Matrices, Coordinate Lines, and Differential Calculus',
      'Step-by-Step Solutions to Multi-Part WAEC SSCE Theory Questions',
      'Common Algebraic Pitfalls and Examiner Marking Rubric Analysis',
      'Speed and Accuracy Drills for Paper 1 Multiple Choice Objectives'
    ],
    readingTimeMinutes: 9,
    summary: 'Consolidate algebraic and analytical calculus skills, review WAEC scoring rubrics, and work through past multi-part exam problems with full mathematical rigor.',
    contentMarkdown: `### 1. Term Synthesis & Topic Matrix

This mid-term clinic consolidates the primary algebra and calculus branches covered in weeks 1 through 5:

| Mathematical Domain | High-Yield WAEC Examination Focus | Essential Formula Anchor |
| :--- | :--- | :--- |
| **Surds** | Conjugate rationalization of compound denominators | $(a + \\sqrt{b})(a - \\sqrt{b}) = a^2 - b$ |
| **Matrices** | Determinants of 2x2 and 3x3 matrices; Cramer’s rule | $A^{-1} = \\frac{1}{|A|} \\text{adj}(A)$ |
| **Coordinate Geometry** | Parallel and perpendicular line equations | $m_1 m_2 = -1$ |
| **Calculus I** | First principles and polynomial derivatives | $\\frac{d}{dx}(x^n) = nx^{n-1}$ |
| **Calculus II** | Turning points and practical optimization | $\\frac{dy}{dx} = 0$, $\\frac{d^2 y}{dx^2} < 0$ (Max) |

---

### 2. Model WAEC Theory Problem & Walkthrough

**WAEC Past Question:**
*(a) The curve $y = 2x^3 - 9x^2 + 12x + 5$ has two turning points $P$ and $Q$.*
*Find:*
1. *The coordinates of $P$ and $Q$.*
2. *The nature of each turning point.*
3. *The equation of the tangent to the curve at $x = 0$.*

#### Step-by-Step Solution:
1. **Find $\\frac{dy}{dx}$:**
   $$\\frac{dy}{dx} = 6x^2 - 18x + 12$$
2. **Set $\\frac{dy}{dx} = 0$ for turning points:**
   $$6x^2 - 18x + 12 = 0 \\implies x^2 - 3x + 2 = 0$$
   $$(x - 1)(x - 2) = 0 \\implies x = 1 \\quad \\text{or} \\quad x = 2$$
3. **Find corresponding y-coordinates:**
   - At $x = 1$: $y = 2(1)^3 - 9(1)^2 + 12(1) + 5 = 2 - 9 + 12 + 5 = 10 \\implies P(1, 10)$
   - At $x = 2$: $y = 2(8) - 9(4) + 12(2) + 5 = 16 - 36 + 24 + 5 = 9 \\implies Q(2, 9)$
4. **Determine Nature using Second Derivative:**
   $$\\frac{d^2 y}{dx^2} = 12x - 18$$
   - At $P(1, 10)$: $\\frac{d^2 y}{dx^2} = 12(1) - 18 = -6 < 0 \\implies \\mathbf{P(1, 10) \\text{ is a Local Maximum}}$.
   - At $Q(2, 9)$: $\\frac{d^2 y}{dx^2} = 12(2) - 18 = +6 > 0 \\implies \\mathbf{Q(2, 9) \\text{ is a Local Minimum}}$.
5. **Tangent at $x = 0$:**
   - Gradient $m = \\left. \\frac{dy}{dx} \\right|_{x=0} = 6(0)^2 - 18(0) + 12 = 12$
   - Y-value at $x = 0$: $y = 5 \\implies (0, 5)$
   - Tangent equation: $y - 5 = 12(x - 0) \\implies y = 12x + 5$.`,
    keyTakeaways: [
      'Always show every intermediate algebraic factorization step in WAEC Paper 2 theory.',
      'Substitute x-values back into original curve equation y = f(x) to obtain y-coordinates.',
      'Substitute x-values into the second derivative to establish whether a point is a maximum or minimum.',
      'The y-intercept provides a direct anchor point for tangent equations.'
    ],
    associatedQuizId: 'math-ss3-midterm-clinic-quiz'
  },

  // ==========================================
  // WEEK 7: INTEGRATION FUNDAMENTALS (CALCULUS II)
  // ==========================================
  {
    id: 'math-ss3-term2-week7',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Integration Fundamentals: Anti-Differentiation & Indefinite Integrals',
    subtopics: [
      'Integration as the Reverse Process of Differentiation',
      'The Constant of Integration ($C$) and Geometric Families of Curves',
      'The General Power Rule of Integration: $\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$ ($n \\ne -1$)',
      'Finding Boundary Value Constants Given Initial Boundary Conditions'
    ],
    readingTimeMinutes: 8,
    summary: 'Explore integral calculus as reverse differentiation, apply standard anti-derivative rules to algebraic functions, and solve boundary value problems to determine the constant of integration.',
    contentMarkdown: `### 1. Concept of Anti-Differentiation

**Integration** is the inverse operation of differentiation. If differentiating $F(x)$ yields $f(x)$, then integrating $f(x)$ returns $F(x)$ plus an arbitrary constant $C$:

$$\\int f(x) dx = F(x) + C \\iff \\frac{d}{dx}[F(x) + C] = f(x)$$

The constant of integration $C$ represents an infinite family of parallel curves shifted vertically along the y-axis.

---

### 2. Standard Integration Rules

| Function $f(x)$ | Indefinite Integral $\\int f(x) dx$ | Condition |
| :--- | :--- | :--- |
| $k$ (constant) | $kx + C$ | $k$ is any real constant |
| $x^n$ | $\\frac{x^{n+1}}{n+1} + C$ | $n \\ne -1$ |
| $a \\cdot x^n$ | $\\frac{a x^{n+1}}{n+1} + C$ | $a$ is scalar coefficient |
| $f(x) \\pm g(x)$ | $\\int f(x) dx \\pm \\int g(x) dx$ | Integrals are additive |

#### Worked Drill:
Evaluate $\\int (6x^2 - 4x + 5) dx$:
$$\\int (6x^2 - 4x + 5) dx = \\frac{6x^3}{3} - \\frac{4x^2}{2} + 5x + C = 2x^3 - 2x^2 + 5x + C$$

---

### 3. Boundary Value Problem

Find the equation of the curve whose gradient is given by $\\frac{dy}{dx} = 3x^2 - 4x + 1$ and passes through point $(1, 4)$.

1. **Integrate $\\frac{dy}{dx}$:**
   $$y = \\int (3x^2 - 4x + 1) dx = x^3 - 2x^2 + x + C$$
2. **Substitute Boundary Point $(1, 4)$:**
   $$4 = (1)^3 - 2(1)^2 + (1) + C \\implies 4 = 1 - 2 + 1 + C \\implies 4 = C$$
3. **Specific Curve Equation:**
   $$y = x^3 - 2x^2 + x + 4$$`,
    keyTakeaways: [
      'Integration is the reverse process of differentiation: add one to exponent, divide by new exponent.',
      'Always append + C to indefinite integrals because constants differentiate to zero.',
      'The power rule for integration holds for all exponents except n = -1.',
      'A boundary condition (x, y) enables finding the exact value of the integration constant C.'
    ],
    associatedQuizId: 'math-ss3-integration-quiz'
  },

  // ==========================================
  // WEEK 8: DEFINITE INTEGRALS & AREA UNDER CURVES
  // ==========================================
  {
    id: 'math-ss3-term2-week8',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Definite Integrals & Area Bounded by Curves and Axes',
    subtopics: [
      'The Fundamental Theorem of Calculus: $\\int_a^b f(x) dx = [F(x)]_a^b = F(b) - F(a)$',
      'Properties of Definite Integrals (Additivity, Inversion of Limits, Zero Range)',
      'Calculating the Area Bounded by a Curve $y = f(x)$, the x-axis, and Lines $x = a$ and $x = b$',
      'Handling Regions Below the x-axis (Negative Areas and Absolute Magnitudes)'
    ],
    readingTimeMinutes: 9,
    summary: 'Apply the Fundamental Theorem of Calculus to evaluate definite integrals with numerical boundaries and calculate the exact geometrical area bounded under smooth curves.',
    contentMarkdown: `### 1. The Fundamental Theorem of Calculus

A **definite integral** has explicit lower and upper limits of integration ($a$ and $b$) and evaluates to a definite numerical value with no constant of integration $C$:

$$\\int_a^b f(x) dx = \\left[ F(x) \\right]_a^b = F(b) - F(a)$$

#### Key Properties of Definite Integrals:
1. $\\int_a^a f(x) dx = 0$
2. $\\int_a^b f(x) dx = -\\int_b^a f(x) dx$
3. $\\int_a^b f(x) dx = \\int_a^c f(x) dx + \\int_c^b f(x) dx$ (where $a < c < b$)

---

### 2. Area Bounded by Curves and the X-Axis

The geometrical area $A$ enclosed under the curve $y = f(x)$, the x-axis, and the vertical lines $x = a$ and $x = b$ is given by:

$$\\text{Area} = \\int_a^b y dx = \\int_a^b f(x) dx$$

#### Worked Example:
Calculate the area enclosed by the parabola $y = 4 - x^2$ and the x-axis.

1. **Find limits of integration (x-intercepts where $y = 0$):**
   $$4 - x^2 = 0 \\implies x^2 = 4 \\implies x = -2 \\quad \\text{and} \\quad x = 2$$
2. **Set up Definite Integral:**
   $$\\text{Area} = \\int_{-2}^2 (4 - x^2) dx$$
3. **Integrate:**
   $$\\left[ 4x - \\frac{x^3}{3} \\right]_{-2}^2$$
4. **Evaluate Upper Limit ($x = 2$):**
   $$F(2) = 4(2) - \\frac{8}{3} = 8 - 2.67 = \\frac{16}{3}$$
5. **Evaluate Lower Limit ($x = -2$):**
   $$F(-2) = 4(-2) - \\frac{-8}{3} = -8 + \\frac{8}{3} = -\\frac{16}{3}$$
6. **Subtract $F(2) - F(-2)$:**
   $$\\text{Area} = \\frac{16}{3} - \\left( -\\frac{16}{3} \\right) = \\frac{32}{3} = 10\\frac{2}{3} \\text{ square units}$$`,
    keyTakeaways: [
      'Definite integrals have specific numerical limits and yield scalar numerical values.',
      'The constant of integration C cancels out when evaluating F(b) - F(a).',
      'The area under a curve is evaluated between the x-intercepts as integration boundaries.',
      'Areas situated beneath the x-axis evaluate to negative integrals; absolute values must be taken.'
    ],
    associatedQuizId: 'math-ss3-definite-integrals-quiz'
  },

  // ==========================================
  // WEEK 9: LINEAR PROGRAMMING
  // ==========================================
  {
    id: 'math-ss3-term2-week9',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Linear Programming: Feasible Regions, Constraints & Objective Functions',
    subtopics: [
      'Translating Real-World Practical Word Problems into Mathematical Inequalities',
      'Graphing Linear Inequalities and Shading Required Feasible Regions',
      'Identifying Feasible Polygons and Extracting Corner Point Vertices',
      'Evaluating the Objective Function $Z = ax + by$ to Maximize Profit or Minimize Cost'
    ],
    readingTimeMinutes: 9,
    summary: 'Formulate operational optimization models, graph linear inequality systems, establish feasible polygon regions, and apply the Corner Point Theorem to solve linear programming problems.',
    contentMarkdown: `### 1. Formulating Linear Programming Problems

Linear programming is a mathematical technique used to allocate scarce resources optimally. It consists of:
1. **Decision Variables:** Unknown quantities to be decided (e.g., $x$ bags of fertilizer, $y$ bags of seeds).
2. **Objective Function:** The mathematical expression to be maximized (profit $Z$) or minimized (cost $C$).
   $$Z = ax + by$$
3. **Linear Constraints:** System of inequalities dictated by available resources (time, raw materials, capital, space):
   $$a_1 x + b_1 y \\le k_1, \\quad a_2 x + b_2 y \\le k_2, \\quad x \\ge 0, \\quad y \\ge 0$$

---

### 2. Feasible Region & Corner Point Theorem

[Diagram: math-linear-programming-feasible-region]

The **feasible region** is the common polygon on the Cartesian plane that satisfies all simultaneous constraints.

#### The Corner Point Theorem:
The optimal (maximum or minimum) value of the objective function always occurs at one of the **corner vertices** of the feasible region.

---

### 3. Step-by-Step Optimization Walkthrough

**Problem:** A baker produces two types of bread: Standard ($x$) and Special ($y$).
- Flour constraint: $2x + y \\le 10$
- Sugar constraint: $x + 2y \\le 8$
- Non-negativity: $x \\ge 0, y \\ge 0$
- Profit function: $Z = 300x + 400y$ (in Naira)

1. **Find Vertices of the Feasible Region:**
   - Origin: $O(0, 0)$
   - Y-intercept of $x + 2y = 8$: $A(0, 4)$
   - X-intercept of $2x + y = 10$: $C(5, 0)$
   - Intersection $B(x, y)$ of the two boundary lines:
     $$2x + y = 10 \\implies y = 10 - 2x$$
     $$x + 2(10 - 2x) = 8 \\implies x + 20 - 4x = 8 \\implies -3x = -12 \\implies x = 4$$
     $$y = 10 - 2(4) = 2 \\implies B(4, 2)$$
2. **Evaluate Profit $Z = 300x + 400y$ at All Vertices:**

| Vertex | Coordinates $(x, y)$ | Profit Evaluation $Z = 300x + 400y$ | Value in Naira |
| :--- | :--- | :--- | :--- |
| $O$ | $(0, 0)$ | $300(0) + 400(0)$ | ₦0 |
| $A$ | $(0, 4)$ | $300(0) + 400(4)$ | ₦1,600 |
| $B$ | $(4, 2)$ | $300(4) + 400(2) = 1,200 + 800$ | **₦2,000 (Maximum Profit)** |
| $C$ | $(5, 0)$ | $300(5) + 400(0)$ | ₦1,500 |

*Conclusion:* The baker should produce 4 Standard loaves and 2 Special loaves to achieve maximum profit of ₦2,000.`,
    keyTakeaways: [
      'The feasible region is the overlapping solution set of all constraint inequalities.',
      'Non-negativity constraints (x ≥ 0, y ≥ 0) restrict the feasible region to the first quadrant.',
      'The Corner Point Theorem guarantees that optimal solutions occur at boundary vertices.',
      'Testing each corner vertex in the objective function determines the maximum or minimum value.'
    ],
    associatedQuizId: 'math-ss3-linear-programming-quiz'
  },

  // ==========================================
  // WEEK 10: SEQUENCES & SERIES (AP & GP)
  // ==========================================
  {
    id: 'math-ss3-term2-week10',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Sequences and Series: Arithmetic (AP) & Geometric Progressions (GP)',
    subtopics: [
      'Arithmetic Progression (AP): Common Difference, nth Term $T_n = a + (n-1)d$, and Sum $S_n$',
      'Geometric Progression (GP): Common Ratio, nth Term $T_n = ar^{n-1}$, and Sum $S_n$',
      'Sum to Infinity of a Convergent Geometric Series: $S_\\infty = \\frac{a}{1 - r}$ ($|r| < 1$)',
      'Practical Financial Applications: Compound Interest, Depreciation, and Annuity Growth'
    ],
    readingTimeMinutes: 8,
    summary: 'Analyze linear arithmetic and exponential geometric sequences, derive general nth terms and summation formulas, and compute sums to infinity for convergent series.',
    contentMarkdown: `### 1. Comparison of AP and GP

| Sequence Type | Defining Feature | $n^{\\text{th}}$ Term Formula ($T_n$) | Sum of First $n$ Terms ($S_n$) |
| :--- | :--- | :--- | :--- |
| **Arithmetic Progression (AP)** | Consecutive terms differ by a constant **common difference** ($d = T_n - T_{n-1}$) | $T_n = a + (n - 1)d$ | $S_n = \\frac{n}{2}[2a + (n-1)d] = \\frac{n}{2}(a + l)$ |
| **Geometric Progression (GP)** | Consecutive terms have a constant **common ratio** ($r = \\frac{T_n}{T_{n-1}}$) | $T_n = a \\cdot r^{n-1}$ | $S_n = \\frac{a(1 - r^n)}{1 - r}$ ($r < 1$) or $\\frac{a(r^n - 1)}{r - 1}$ ($r > 1$) |

---

### 2. Sum to Infinity of a Convergent GP

When the common ratio of a geometric sequence lies strictly between $-1$ and $+1$ ($|r| < 1$), the terms become progressively smaller, approaching zero as $n \\to \\infty$. The series converges to a finite **sum to infinity**:

$$S_\\infty = \\lim_{n \\to \\infty} S_n = \\frac{a}{1 - r} \\quad (|r| < 1)$$

#### Worked Example:
Convert the recurring decimal $0.272727\\dots = 0.\\dot{2}\\dot{7}$ into a common fraction.

1. **Express as a Geometric Series:**
   $$0.\\dot{2}\\dot{7} = 0.27 + 0.0027 + 0.000027 + \\dots$$
2. **Identify Parameters:**
   - First term $a = 0.27 = \\frac{27}{100}$
   - Common ratio $r = \\frac{0.0027}{0.27} = \\frac{1}{100}$ (since $|r| < 1$, series converges)
3. **Apply Sum to Infinity Formula:**
   $$S_\\infty = \\frac{a}{1 - r} = \\frac{\\frac{27}{100}}{1 - \\frac{1}{100}} = \\frac{\\frac{27}{100}}{\\frac{99}{100}} = \\frac{27}{99} = \\frac{3}{11}$$`,
    keyTakeaways: [
      'In an AP, terms grow by adding a constant difference d; in a GP, terms grow by multiplying by a ratio r.',
      'The sum of an AP equals the average of the first and last terms multiplied by the number of terms.',
      'A geometric series converges to a finite sum to infinity if and only if |r| < 1.',
      'Recurring decimals can be converted to exact fractions using the sum to infinity formula.'
    ],
    associatedQuizId: 'math-ss3-sequences-series-quiz'
  },

  // ==========================================
  // WEEK 11: VECTORS IN TWO DIMENSIONS
  // ==========================================
  {
    id: 'math-ss3-term2-week11',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Vectors in Two Dimensions: Components, Magnitudes & Dot Product',
    subtopics: [
      'Scalar vs. Vector Quantities and Cartesian Vector Representation ($\\mathbf{v} = x\\mathbf{i} + y\\mathbf{j}$)',
      'Vector Magnitude $|\\mathbf{v}| = \\sqrt{x^2 + y^2}$ and Direction Angle $\\theta = \\tan^{-1}\\left(\\frac{y}{x}\\right)$',
      'Vector Operations: Column Vector Addition, Subtraction, and Unit Vectors',
      'Scalar (Dot) Product: $\\mathbf{a} \\cdot \\mathbf{b} = |\\mathbf{a}||\\mathbf{b}| \\cos \\theta = a_1 b_1 + a_2 b_2$'
    ],
    readingTimeMinutes: 8,
    summary: 'Distinguish scalars from vectors, manipulate 2D vectors in Cartesian unit form and column matrices, calculate magnitudes and directional bearings, and apply dot products to test perpendicularity.',
    contentMarkdown: `### 1. Vector Notation & Magnitude

A **vector** possesses both magnitude (size) and direction. In two dimensions, vectors are written in column form or in terms of standard orthogonal unit vectors $\\mathbf{i}$ and $\\mathbf{j}$ along the x and y axes:

$$\\mathbf{a} = \\begin{pmatrix} x \\\\ y \\end{pmatrix} = x\\mathbf{i} + y\\mathbf{j}$$

| Metric | Formula | Practical Meaning |
| :--- | :--- | :--- |
| **Magnitude ($|\\mathbf{a}|$)| $|\\mathbf{a}| = \\sqrt{x^2 + y^2}$ | Length of the vector line segment |
| **Direction Angle ($\\theta$)** | $\\theta = \\tan^{-1}\\left(\\frac{y}{x}\\right)$ | Angle measured counter-clockwise from positive x-axis |
| **Unit Vector ($\\mathbf{\\hat{a}}$)** | $\\mathbf{\\hat{a}} = \\frac{\\mathbf{a}}{|\\mathbf{a}|}$ | Vector with identical direction but length equal to 1 |

---

### 2. The Scalar (Dot) Product

The **scalar product** of two vectors $\\mathbf{a} = a_1\\mathbf{i} + a_2\\mathbf{j}$ and $\\mathbf{b} = b_1\\mathbf{i} + b_2\\mathbf{j}$ evaluates to a single scalar number:

$$\\mathbf{a} \\cdot \\mathbf{b} = |\\mathbf{a}||\\mathbf{b}| \\cos \\theta = a_1 b_1 + a_2 b_2$$

Where $\\theta$ is the angle between the two vectors:
$$\\cos \\theta = \\frac{a_1 b_1 + a_2 b_2}{|\\mathbf{a}||\\mathbf{b}|}$$

#### Critical Perpendicularity Condition:
Two non-zero vectors $\\mathbf{a}$ and $\\mathbf{b}$ are **perpendicular (orthogonal)** if and only if their dot product equals zero:
$$\\mathbf{a} \\cdot \\mathbf{b} = 0 \\iff \\cos 90^\\circ = 0$$`,
    keyTakeaways: [
      'Vectors have both magnitude and direction, unlike scalar quantities which have only magnitude.',
      'Vector magnitude is computed using the Pythagorean theorem: |v| = √(x² + y²).',
      'The dot product of two vectors evaluates to a scalar, not another vector.',
      'Two non-zero vectors are perpendicular if and only if their scalar dot product equals zero.'
    ],
    associatedQuizId: 'math-ss3-vectors-2d-quiz'
  },

  // ==========================================
  // WEEK 12: TERM REVIEW & WAEC EXAMINATION MASTERCLASS
  // ==========================================
  {
    id: 'math-ss3-term2-week12',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 12,
    topicTitle: 'Term Review & WAEC SSCE General Mathematics Masterclass',
    subtopics: [
      'Comprehensive Term 1 Synthesis: Algebra, Matrices, Coordinate Geometry, and Calculus',
      'WAEC SSCE Paper Structure: Section A (Compulsory Core) vs. Section B (Elective Deep Theory)',
      'Structuring High-Scoring Mathematical Solutions and Avoiding Premature Rounding Errors',
      'Time Management Strategies for the 50 Objective Questions and 13 Theory Problems'
    ],
    readingTimeMinutes: 10,
    summary: 'Consolidate all SS 3 First Term mathematical foundations, review WAEC Paper 1 and Paper 2 examination formats, examine common candidate blunders, and formulate high-scoring presentation habits.',
    contentMarkdown: `### 1. Complete Term Review Matrix

Throughout this first term, we have mastered advanced algebra, analytical coordinate geometry, differential and integral calculus, and optimization:

| Topic Area | Core Competencies Mastered | Standard WAEC Paper 2 Mark Allocation |
| :--- | :--- | :--- |
| **Surds & Radicals** | Conjugate rationalization, simplifying mixed surds | 4–6 marks (Section A) |
| **Matrices & Determinants**| 2x2 and 3x3 determinants, inverse matrices, Cramer’s rule | 8–12 marks (Section B) |
| **Coordinate Geometry** | Mid-points, Euclidean distances, slopes, perpendicular lines | 8–10 marks (Section B) |
| **Differential Calculus** | First principles, power rules, tangents/normals, stationary points | 10–12 marks (Section B) |
| **Integral Calculus** | Indefinite and definite integrals, area under curves | 8–12 marks (Section B) |
| **Linear Programming** | Graphing inequalities, finding feasible polygon, vertex optimization | 12 marks (Section B) |
| **Sequences & Series** | AP, GP, sum to infinity, financial mathematics | 8–12 marks (Section B) |
| **Vectors** | Magnitude, unit vectors, scalar dot product, perpendicularity | 8–10 marks (Section B) |

---

### 2. WAEC SSCE Examination Architecture

The WAEC General Mathematics examination consists of two papers written on the same day:
1. **Paper 1 (Multiple Choice Objectives - 50 Questions, $1\\frac{1}{2}$ Hours, 50 Marks):**
   - Covers the entire secondary school syllabus evenly.
   - Pacing: Exactly $1.8\\text{ minutes}$ per question.
2. **Paper 2 (Essay / Theory - $2\\frac{1}{2}$ Hours, 100 Marks):**
   - **Section A (40 Marks):** 5 compulsory elementary questions ($8\\text{ marks}$ each).
   - **Section B (60 Marks):** 8 advanced questions; candidates choose any **5 questions** ($12\\text{ marks}$ each).

---

### 3. Top Candidate Blunders to Avoid

- **Premature Decimal Rounding:** Never round intermediate answers during calculation. Retain surd or fractional forms until the final step, then round to the specified precision (typically 3 significant figures or 2 decimal places).
- **Missing Units:** Forgetting physical or currency units (e.g., $\\text{cm}^2$, $\\text{meters}$, ₦) costs method and accuracy marks.
- **Incomplete Surd Rationalization:** Leaving an un-rationalized radical denominator in final answers loses the final accuracy mark.`,
    keyTakeaways: [
      'WAEC Paper 2 Section A is compulsory; Section B requires selecting 5 out of 8 questions.',
      'Never round off intermediate calculations; keep fractions or surds until the final answer.',
      'Always state units clearly (cm, m², Naira) to preserve accuracy marks.',
      'Show clear step-by-step mathematical reasoning to earn full method marks even if a minor arithmetic slip occurs.'
    ],
    associatedQuizId: 'math-ss3-waec-masterclass-quiz'
  }
];
