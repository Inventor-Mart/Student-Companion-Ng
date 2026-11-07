import { CurriculumTopic } from '../types';

export const SS3_FURTHER_MATH_TOPICS: CurriculumTopic[] = [
  // ==========================================
  // WEEK 1: ADVANCED COORDINATE GEOMETRY: THE CIRCLE
  // ==========================================
  {
    id: 'fmath-ss3-term2-week1',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Advanced Coordinate Geometry: The Circle, Tangents, Normals & Length of Tangents',
    subtopics: [
      'Standard Equation: (x - a)² + (y - b)² = r² and General Equation: x² + y² + 2gx + 2fy + c = 0',
      'Derivation of Center (-g, -f) and Radius: r = √(g² + f² - c)',
      'Equation of Tangent and Normal to a Circle at a Given Point (x₁, y₁)',
      'Length of Tangent from an External Point P(x₁, y₁) to a Circle'
    ],
    readingTimeMinutes: 10,
    summary: 'Master standard and general equations of a circle, determine center and radius coordinates, formulate tangent and normal equations, and calculate external tangent lengths.',
    contentMarkdown: `### 1. Equations of a Circle

A **circle** is the locus of a point $P(x, y)$ that moves in a coordinate plane such that its distance from a fixed point $C(a, b)$ called the center is always constant (radius $r$):

#### 1. Standard Center-Radius Form:
$$(x - a)^2 + (y - b)^2 = r^2$$

#### 2. General Form of the Equation of a Circle:
Expanding the standard form yields:
$$x^2 + y^2 - 2ax - 2by + (a^2 + b^2 - r^2) = 0$$
Setting $-a = g$, $-b = f$, and $c = a^2 + b^2 - r^2$:
$$x^2 + y^2 + 2gx + 2fy + c = 0$$

- **Center Coordinates:** $(-g, -f)$
- **Radius Formula:**
  $$r = \\sqrt{g^2 + f^2 - c}$$

*Condition for a Real Circle:*
- If $g^2 + f^2 - c > 0$: A real circle exists with radius $r$.
- If $g^2 + f^2 - c = 0$: A point circle (single point at $(-g, -f)$).
- If $g^2 + f^2 - c < 0$: An imaginary / virtual circle.

---

### 2. Tangent & Normal to a Circle

[Diagram: further-math-coordinate-geometry]

#### Equation of Tangent at Point $(x_1, y_1)$ on the Circle:
For the general circle $x^2 + y^2 + 2gx + 2fy + c = 0$, replace $x^2 \\rightarrow x x_1$, $y^2 \\rightarrow y y_1$, $2x \\rightarrow x + x_1$, and $2y \\rightarrow y + y_1$:

$$x x_1 + y y_1 + g(x + x_1) + f(y + y_1) + c = 0$$

#### Equation of Normal at Point $(x_1, y_1)$:
The **normal** is the straight line perpendicular to the tangent at the point of contact $(x_1, y_1)$. Because every normal passes through the center $(-g, -f)$:
$$\\text{Slope of Normal } m_N = \\frac{y_1 - (-f)}{x_1 - (-g)} = \\frac{y_1 + f}{x_1 + g}$$
$$y - y_1 = \\left(\\frac{y_1 + f}{x_1 + g}\\right)(x - x_1)$$

#### Length of Tangent from External Point $P(x_1, y_1)$:
The length $L$ of the tangent drawn from an external point $P(x_1, y_1)$ to the circle is:
$$L = \\sqrt{x_1^2 + y_1^2 + 2gx_1 + 2fy_1 + c}$$

---

### 3. Worked WAEC Examination Drill

**Question:** Find the equation of the tangent and normal to the circle $x^2 + y^2 - 4x + 6y - 12 = 0$ at the point $P(5, 1)$ lying on the circumference.

**Solution:**
1. **Identify Circle Parameters:**
   $$2g = -4 \\implies g = -2$$
   $$2f = 6 \\implies f = 3$$
   $$c = -12$$
   $$\\text{Center } C = (-g, -f) = (2, -3)$$
2. **Equation of Tangent:**
   $$x x_1 + y y_1 + g(x + x_1) + f(y + y_1) + c = 0$$
   Substitute $x_1 = 5, y_1 = 1, g = -2, f = 3, c = -12$:
   $$5x + 1y - 2(x + 5) + 3(y + 1) - 12 = 0$$
   $$5x + y - 2x - 10 + 3y + 3 - 12 = 0$$
   $$3x + 4y - 19 = 0$$
3. **Equation of Normal:**
   The slope of the tangent is $m_T = -\\frac{3}{4}$, so the slope of the normal is $m_N = \\frac{4}{3}$.
   $$y - 1 = \\frac{4}{3}(x - 5)$$
   $$3(y - 1) = 4(x - 5) \\implies 3y - 3 = 4x - 20$$
   $$4x - 3y - 17 = 0$$`,
    keyTakeaways: [
      'The general circle equation is x² + y² + 2gx + 2fy + c = 0, with center (-g, -f) and radius r = √(g² + f² - c).',
      'The tangent equation at (x1, y1) is xx1 + yy1 + g(x + x1) + f(y + y1) + c = 0.',
      'The normal to any circle always passes through the center of the circle.',
      'The length of a tangent from an external point (x1, y1) equals √(x1² + y1² + 2gx1 + 2fy1 + c).'
    ],
    associatedQuizId: 'waec-ss3-fmath-circle-quiz'
  },

  // ==========================================
  // WEEK 2: CONIC SECTIONS: PARABOLA, ELLIPSE & HYPERBOLA
  // ==========================================
  {
    id: 'fmath-ss3-term2-week2',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Conic Sections: Parabola, Ellipse & Hyperbola Properties, Foci & Eccentricity',
    subtopics: [
      'General Definition of a Conic Section: Focus, Directrix, and Eccentricity (e)',
      'The Parabola (e = 1): Standard Equation y² = 4ax, Focus, Directrix, and Latus Rectum',
      'The Ellipse (e < 1): Standard Equation x²/a² + y²/b² = 1, Foci, Major/Minor Axes, and Directrices',
      'The Hyperbola (e > 1): Standard Form x²/a² - y²/b² = 1 and the Rectangular Hyperbola (xy = c²)'
    ],
    readingTimeMinutes: 10,
    summary: 'Analyze conic sections using eccentricity, derive focal properties of parabolas, ellipses, and hyperbolas, and solve geometric locus problems.',
    contentMarkdown: `### 1. General Definition of Conic Sections

A **conic section** is the locus of a point $P$ that moves such that the ratio of its distance from a fixed point (the **focus $S$**) to its perpendicular distance from a fixed straight line (the **directrix $D$**) is a constant called the **eccentricity ($e$)**:

$$\\frac{|SP|}{|PM|} = e$$

- If $e = 1$: The curve is a **Parabola**.
- If $0 < e < 1$: The curve is an **Ellipse**.
- If $e > 1$: The curve is a **Hyperbola**.

---

### 2. The Parabola ($e = 1$)

[Diagram: further-math-quadratic-roots-parabola]

Standard form with vertex at origin $(0, 0)$ opening to the right:
$$y^2 = 4ax$$

| Parabolic Feature | Mathematical Coordinate / Equation |
| :--- | :--- |
| **Vertex** | $(0, 0)$ |
| **Focus ($S$)** | $(a, 0)$ |
| **Equation of Directrix** | $x = -a \\quad (x + a = 0)$ |
| **Axis of Symmetry** | $y = 0$ ($x$-axis) |
| **Length of Latus Rectum** | $4a$ |

---

### 3. The Ellipse ($0 < e < 1$)

Standard equation centered at $(0, 0)$ with major axis along the $x$-axis ($a > b$):
$$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$$

- **Relationship between $a, b,$ and $e$:**
  $$b^2 = a^2(1 - e^2) \\implies e = \\sqrt{1 - \\frac{b^2}{a^2}}$$
- **Coordinates of Foci ($S, S'$):** $(\\pm ae, 0)$
- **Equations of Directrices:** $x = \\pm \\frac{a}{e}$
- **Major Axis Length:** $2a$ (along $x$-axis); **Minor Axis Length:** $2b$ (along $y$-axis)
- **Length of Latus Rectum:** $\\frac{2b^2}{a}$

---

### 4. The Hyperbola ($e > 1$) & Rectangular Hyperbola

Standard equation centered at $(0, 0)$:
$$\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$$

- **Eccentricity:** $b^2 = a^2(e^2 - 1) \\implies e = \\sqrt{1 + \\frac{b^2}{a^2}} > 1$
- **Foci:** $(\\pm ae, 0)$; **Directrices:** $x = \\pm \\frac{a}{e}$
- **Asymptotes:** Straight lines $y = \\pm \\frac{b}{a}x$
- **Rectangular Hyperbola ($xy = c^2$):** When asymptotes intersect at right angles ($90^\\circ$), $a = b$, and $e = \\sqrt{2}$. Parametric coordinates: $(ct, \\frac{c}{t})$.`,
    keyTakeaways: [
      'A conic section is defined by eccentricity e: parabola (e = 1), ellipse (e < 1), hyperbola (e > 1).',
      'For the parabola y² = 4ax, the focus is (a, 0), the directrix is x = -a, and latus rectum is 4a.',
      'For the ellipse x²/a² + y²/b² = 1, foci are (±ae, 0) and eccentricity is e = √(1 - b²/a²).',
      'A rectangular hyperbola has perpendicular asymptotes and eccentricity e = √2.'
    ],
    associatedQuizId: 'waec-ss3-fmath-conics-quiz'
  },

  // ==========================================
  // WEEK 3: ADVANCED CALCULUS: DIFFERENTIATION
  // ==========================================
  {
    id: 'fmath-ss3-term2-week3',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Advanced Calculus: Differentiation from First Principles, Product, Quotient & Chain Rules',
    subtopics: [
      'Differentiation from First Principles of Trigonometric Functions (sin x, cos x)',
      'Operational Rules: Product Rule (uv), Quotient Rule (u/v), and Composite Function Chain Rule',
      'Implicit Differentiation of Multi-Variable Equations: dy/dx of f(x, y) = c',
      'Derivatives of Logarithmic, Exponential, and Inverse Trigonometric Functions'
    ],
    readingTimeMinutes: 10,
    summary: 'Differentiate trigonometric functions from first principles, master product, quotient, and chain rules, and execute implicit and inverse trigonometric differentiation.',
    contentMarkdown: `### 1. Differentiation from First Principles

The derivative of $f(x)$ is defined as the limiting value:
$$f'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}$$

#### Proof: Differentiating $\\sin x$ from First Principles:
$$f(x) = \\sin x \\implies f(x + h) - f(x) = \\sin(x + h) - \\sin x$$
Using the sum-to-product trigonometric identity $\\sin A - \\sin B = 2\\cos\\left(\\frac{A+B}{2}\\right)\\sin\\left(\\frac{A-B}{2}\\right)$:
$$\\sin(x + h) - \\sin x = 2\\cos\\left(x + \\frac{h}{2}\\right)\\sin\\left(\\frac{h}{2}\\right)$$
$$\\frac{f(x + h) - f(x)}{h} = \\frac{2\\cos(x + \\frac{h}{2})\\sin(\\frac{h}{2})}{h} = \\cos\\left(x + \\frac{h}{2}\\right) \\cdot \\frac{\\sin(h/2)}{h/2}$$
Taking limits as $h \\to 0$, and using standard limit $\\lim_{\\theta \\to 0} \\frac{\\sin \\theta}{\\theta} = 1$:
$$\\frac{d}{dx}(\\sin x) = \\cos(x) \\cdot 1 = \\cos x$$

---

### 2. Operational Rules of Differentiation

[Diagram: further-math-differentiation-turning-points]

1. **Product Rule ($y = u \\cdot v$):**
   $$\\frac{dy}{dx} = u\\frac{dv}{dx} + v\\frac{du}{dx}$$
2. **Quotient Rule ($y = \\frac{u}{v}$):**
   $$\\frac{dy}{dx} = \\frac{v\\frac{du}{dx} - u\\frac{dv}{dx}}{v^2}$$
3. **Chain Rule (Function of a Function, $y = f(u)$ where $u = g(x)$):**
   $$\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$$

---

### 3. Derivatives of Special Transcendental Functions

| Function $f(x)$ | Derivative $f'(x)$ |
| :--- | :--- |
| $e^{ax}$ | $a e^{ax}$ |
| $\\ln(x)$ | $\\frac{1}{x}$ |
| $\\tan x$ | $\\sec^2 x$ |
| $\\sec x$ | $\\sec x \\tan x$ |
| $\\arcsin(x)$ | $\\frac{1}{\\sqrt{1 - x^2}}$ |
| $\\arctan(x)$ | $\\frac{1}{1 + x^2}$ |

---

### 4. Implicit Differentiation

When $x$ and $y$ cannot be separated explicitly ($f(x, y) = 0$), differentiate each term with respect to $x$, applying the chain rule to terms containing $y$ (where $\\frac{d}{dx}[y^n] = n y^{n-1} \\frac{dy}{dx}$):

**Worked Drill:** Find $\\frac{dy}{dx}$ for $x^2 + 2xy + y^3 = 5$.
1. Differentiate term by term:
   $$2x + \\left(2x \\frac{dy}{dx} + 2y\\right) + 3y^2 \\frac{dy}{dx} = 0$$
2. Group $\\frac{dy}{dx}$ terms:
   $$\\frac{dy}{dx}(2x + 3y^2) = -(2x + 2y)$$
3. Solve for $\\frac{dy}{dx}$:
   $$\\frac{dy}{dx} = -\\frac{2(x + y)}{2x + 3y^2}$$`,
    keyTakeaways: [
      'The derivative of sin x from first principles yields cos x using the limit sin(θ)/θ → 1.',
      'The product rule is d(uv)/dx = u(dv/dx) + v(du/dx); quotient rule is [v(du/dx) - u(dv/dx)] / v².',
      'The chain rule is dy/dx = (dy/du) × (du/dx).',
      'In implicit differentiation, applying d/dx to y² produces 2y(dy/dx) via the chain rule.'
    ],
    associatedQuizId: 'waec-ss3-fmath-diff-techniques-quiz'
  },

  // ==========================================
  // WEEK 4: APPLICATIONS OF DERIVATIVES
  // ==========================================
  {
    id: 'fmath-ss3-term2-week4',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Applications of Derivatives: Tangents, Stationary Points & Optimization',
    subtopics: [
      'Equations of Tangents and Normals to Any Differentiable Curve y = f(x)',
      'Rates of Change in Physical Systems (Connected Rates of Change via Chain Rule)',
      'Stationary Points: Maxima, Minima, and Points of Inflexion using Second Derivative (d²y/dx²)',
      'Mathematical Optimization Problems in Industrial Engineering and Commerce'
    ],
    readingTimeMinutes: 10,
    summary: 'Apply derivatives to calculate curve tangents and normals, classify stationary points via second derivative tests, and solve practical optimization problems.',
    contentMarkdown: `### 1. Tangents and Normals to Curves

For a curve $y = f(x)$ at the point $P(x_1, y_1)$:
- The **slope of the tangent ($m_T$)** is the value of the first derivative evaluated at $x_1$:
  $$m_T = \\left. \\frac{dy}{dx} \\right|_{x = x_1}$$
- **Equation of Tangent:**
  $$y - y_1 = m_T(x - x_1)$$
- **Slope of Normal ($m_N$):** Since the normal is perpendicular to the tangent:
  $$m_N = -\\frac{1}{m_T}$$
- **Equation of Normal:**
  $$y - y_1 = -\\frac{1}{m_T}(x - x_1)$$

---

### 2. Stationary Points & Second Derivative Test

A **stationary (turning) point** occurs on a curve wherever the first derivative equals zero:
$$\\frac{dy}{dx} = 0$$

To classify the stationary point at $x = x_0$:
- If $\\frac{d^2y}{dx^2} < 0$: The point is a **Local Maximum** (concave downwards).
- If $\\frac{d^2y}{dx^2} > 0$: The point is a **Local Minimum** (concave upwards).
- If $\\frac{d^2y}{dx^2} = 0$: Test fails; it could be a **Point of Inflexion**. Check if $\\frac{dy}{dx}$ maintains the same sign on either side of $x_0$.

---

### 3. Worked Optimization Drill

**Question:** An open rectangular metal water tank with a square base of side $x\\text{ meters}$ and vertical height $h\\text{ meters}$ is to have a fixed volume of $32\\text{ m}^3$. Find the dimensions of the tank that minimize the total surface area of sheet metal required.

**Solution:**
1. **Volume Equation:**
   $$V = x^2 h = 32 \\implies h = \\frac{32}{x^2}$$
2. **Surface Area Equation (Open Top):**
   $$A = \\text{Base} + 4 \\times \\text{Sides} = x^2 + 4xh$$
   Substitute $h = \\frac{32}{x^2}$:
   $$A(x) = x^2 + 4x\\left(\\frac{32}{x^2}\\right) = x^2 + \\frac{128}{x} = x^2 + 128x^{-1}$$
3. **Differentiate with Respect to $x$:**
   $$\\frac{dA}{dx} = 2x - 128x^{-2} = 2x - \\frac{128}{x^2}$$
4. **Set $\\frac{dA}{dx} = 0$ for Minimum Surface Area:**
   $$2x - \\frac{128}{x^2} = 0 \\implies 2x = \\frac{128}{x^2} \\implies 2x^3 = 128$$
   $$x^3 = 64 \\implies x = 4\\text{ meters}$$
5. **Calculate Height ($h$):**
   $$h = \\frac{32}{4^2} = \\frac{32}{16} = 2\\text{ meters}$$
6. **Verify Minimum using Second Derivative Test:**
   $$\\frac{d^2A}{dx^2} = 2 + \\frac{256}{x^3}$$
   At $x = 4$:
   $$\\frac{d^2A}{dx^2} = 2 + \\frac{256}{64} = 2 + 4 = 6 > 0 \\implies \\text{Confirmed Minimum!}$$
   **Final Dimensions:** Base side $x = 4\\text{ m}$, Height $h = 2\\text{ m}$.`,
    keyTakeaways: [
      'The slope of a tangent is dy/dx at the point of contact; normal slope is -1 / (dy/dx).',
      'Turning points occur where dy/dx = 0.',
      'A turning point is a maximum if d²y/dx² < 0, and a minimum if d²y/dx² > 0.',
      'In optimization problems, express the target variable in a single independent variable and differentiate to zero.'
    ],
    associatedQuizId: 'waec-ss3-fmath-derivatives-app-quiz'
  },

  // ==========================================
  // WEEK 5: ADVANCED CALCULUS: INTEGRATION
  // ==========================================
  {
    id: 'fmath-ss3-term2-week5',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Advanced Calculus: Integration by Substitution, Parts & Volumes of Revolution',
    subtopics: [
      'Standard Indefinite and Definite Integrals of Algebraic and Trigonometric Functions',
      'Integration by Algebraic Substitution (u-Substitution)',
      'Integration by Parts: Formula ∫ u dv = uv - ∫ v du (LIATE Priority Rule)',
      'Applications of Definite Integrals: Area Between Curves and Volume of Solids of Revolution'
    ],
    readingTimeMinutes: 10,
    summary: 'Master advanced integration techniques, apply substitution and integration by parts using the LIATE rule, compute enclosed areas, and evaluate volumes of revolution.',
    contentMarkdown: `### 1. Integration Techniques

Integration is the reverse process of differentiation:

1. **Integration by Substitution (Change of Variable):**
   Used when an integrand contains a function and its derivative:
   $$\\int f(g(x)) \\cdot g'(x) \\, dx = \\int f(u) \\, du \\quad (\\text{where } u = g(x))$$
2. **Integration by Parts:**
   Derived from the product rule of differentiation:
   $$\\int u \\, \\frac{dv}{dx} \\, dx = u v - \\int v \\, \\frac{du}{dx} \\, dx \\quad \\text{or} \\quad \\int u \\, dv = u v - \\int v \\, du$$

#### Choosing $u$ using the LIATE Priority Rule:
1. **L:** Logarithmic functions ($\\ln x$)
2. **I:** Inverse trigonometric functions ($\\arcsin x, \\arctan x$)
3. **A:** Algebraic polynomial functions ($x^2, x^3$)
4. **T:** Trigonometric functions ($\\sin x, \\cos x$)
5. **E:** Exponential functions ($e^x$)

---

### 2. Worked Drill: Integration by Parts

**Evaluate:** $\\int x \\cos x \\, dx$
1. **Choose $u$ and $dv$ using LIATE:**
   - $x$ is Algebraic (higher priority), so let $u = x \\implies du = dx$.
   - $\\cos x$ is Trigonometric, so let $dv = \\cos x \\, dx \\implies v = \\sin x$.
2. **Apply Formula:**
   $$\\int u \\, dv = uv - \\int v \\, du$$
   $$\\int x \\cos x \\, dx = x \\sin x - \\int \\sin x \\, dx$$
   $$= x \\sin x - (-\\cos x) + C = x \\sin x + \\cos x + C$$

---

### 3. Applications of Definite Integrals

#### 1. Area Enclosed Between Two Curves:
If $y_1 = f(x)$ lies above $y_2 = g(x)$ between $x = a$ and $x = b$:
$$\\text{Area} = \\int_{a}^{b} [f(x) - g(x)] \\, dx$$

#### 2. Volume of Solid of Revolution:
When the area bounded by the curve $y = f(x)$, the $x$-axis, and the ordinates $x = a$ and $x = b$ is rotated through $360^\\circ$ ($2\\pi\\text{ radians}$) about the $x$-axis:
$$V = \\pi \\int_{a}^{b} y^2 \\, dx$$
*(If rotated about the $y$-axis: $V = \\pi \\int_{c}^{d} x^2 \\, dy$)*.`,
    keyTakeaways: [
      'Integration by parts formula is ∫ u dv = uv - ∫ v du, guided by the LIATE selection rule.',
      'U-substitution simplifies integrals where the integrand contains a composite function and its derivative.',
      'The area between two curves is found by integrating the upper curve minus the lower curve.',
      'The volume of a solid of revolution rotated 360° about the x-axis is V = π ∫ y² dx.'
    ],
    associatedQuizId: 'waec-ss3-fmath-integration-quiz'
  },

  // ==========================================
  // WEEK 6: MID-TERM WAEC PROBLEM SOLVING CLINIC
  // ==========================================
  {
    id: 'fmath-ss3-term2-week6',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Mid-Term Assessment & WAEC Problem Solving Clinic: Calculus & Conic Geometry',
    subtopics: [
      'Multi-Step WAEC Calculus Problems: Definite Integrals and Differential Proofs',
      'Conic Section Locus Derivations: Tangents to Parabolas and Ellipses',
      'Volume of Revolution Multi-Part Problems with Intersecting Boundaries',
      'Step-by-Step Examiner Marking Rubrics for Paper 2 Section A and B Questions'
    ],
    readingTimeMinutes: 10,
    summary: 'Consolidate advanced calculus and coordinate geometry skills, solve multi-step WAEC examination questions, and analyze formal mathematical proof rubrics.',
    contentMarkdown: `### 1. Comprehensive Worked WAEC Examination Drill

**Problem:**
1. Find the coordinates of the points of intersection of the parabola $y = x^2 - 4x + 3$ and the straight line $y = 2x - 2$.
2. Calculate the exact area enclosed between the parabola and the line.
3. Calculate the volume of the solid generated when the region bounded by $y = \\sqrt{x}$, the line $x = 4$, and the $x$-axis is rotated through $360^\\circ$ about the $x$-axis.

**Solution Steps:**

#### Part 1: Intersection Coordinates:
Equate the two expressions for $y$:
$$x^2 - 4x + 3 = 2x - 2$$
$$x^2 - 6x + 5 = 0$$
$$(x - 1)(x - 5) = 0 \\implies x_1 = 1, \\; x_2 = 5$$
Find corresponding $y$-coordinates using $y = 2x - 2$:
- At $x = 1$: $y = 2(1) - 2 = 0 \\implies (1, 0)$
- At $x = 5$: $y = 2(5) - 2 = 8 \\implies (5, 8)$
**Points of Intersection:** $(1, 0)$ and $(5, 8)$.

#### Part 2: Enclosed Area:
Between $x = 1$ and $x = 5$, the straight line $y = 2x - 2$ lies above the parabola $y = x^2 - 4x + 3$:
$$\\text{Area} = \\int_{1}^{5} [(2x - 2) - (x^2 - 4x + 3)] \\, dx = \\int_{1}^{5} (-x^2 + 6x - 5) \\, dx$$
$$\\text{Area} = \\left[ -\\frac{x^3}{3} + 3x^2 - 5x \\right]_{1}^{5}$$
- At $x = 5$:
  $$-\\frac{125}{3} + 3(25) - 5(5) = -\\frac{125}{3} + 75 - 25 = -\\frac{125}{3} + 50 = \\frac{25}{3}$$
- At $x = 1$:
  $$-\\frac{1}{3} + 3(1) - 5(1) = -\\frac{1}{3} - 2 = -\\frac{7}{3}$$
$$\\text{Area} = \\frac{25}{3} - \\left(-\\frac{7}{3}\\right) = \\frac{32}{3} = 10\\frac{2}{3}\\text{ square units}$$

#### Part 3: Volume of Revolution:
$$V = \\pi \\int_{0}^{4} y^2 \\, dx$$
Since $y = \\sqrt{x} \\implies y^2 = x$:
$$V = \\pi \\int_{0}^{4} x \\, dx = \\pi \\left[ \\frac{x^2}{2} \\right]_{0}^{4} = \\pi \\left( \\frac{16}{2} - 0 \\right) = 8\\pi\\text{ cubic units}$$`,
    keyTakeaways: [
      'Intersection points of lines and curves are found by setting equations equal and solving the resulting quadratic.',
      'The area between curves integrates the difference (upper curve minus lower curve) between limits of intersection.',
      'In volumes of revolution, squaring y = √x gives x, simplifying the integration to π ∫ x dx.',
      'Show all intermediate fractional arithmetic in WAEC Paper 2 to guarantee full process marks.'
    ],
    associatedQuizId: 'waec-ss3-fmath-clinic-quiz'
  },

  // ==========================================
  // WEEK 7: 3D VECTORS & PRODUCTS
  // ==========================================
  {
    id: 'fmath-ss3-term2-week7',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Vectors in Three Dimensions (3D): Magnitude, Dot Product & Cross Product',
    subtopics: [
      'Representation of 3D Vectors: r = xi + yj + zk, Magnitude, and Direction Cosines (l, m, n)',
      'Scalar (Dot) Product: a · b = |a||b| cos θ and Orthogonality Condition (a · b = 0)',
      'Vector (Cross) Product: a × b = |a||b| sin θ n via 3×3 Determinants',
      'Geometrical Applications of Vector Products: Area of Triangles and Parallelograms in 3D'
    ],
    readingTimeMinutes: 10,
    summary: 'Master vectors in three-dimensional space, calculate magnitudes and direction cosines, evaluate dot and cross products via determinants, and compute geometric areas.',
    contentMarkdown: `### 1. Vector Representation in Three Dimensions (3D)

A vector $\\mathbf{r}$ in Cartesian three-dimensional space is defined using standard unit base vectors $\\mathbf{i}, \\mathbf{j}, \\mathbf{k}$ along the $x, y, z$ axes:

$$\\mathbf{r} = x\\mathbf{i} + y\\mathbf{j} + z\\mathbf{k} = \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix}$$

[Diagram: further-math-vectors-resolution]

- **Magnitude (Length):**
  $$|\\mathbf{r}| = \\sqrt{x^2 + y^2 + z^2}$$
- **Unit Vector ($\\mathbf{\\hat{r}}$):**
  $$\\mathbf{\\hat{r}} = \\frac{\\mathbf{r}}{|\\mathbf{r}|} = \\frac{x\\mathbf{i} + y\\mathbf{j} + z\\mathbf{k}}{\\sqrt{x^2 + y^2 + z^2}}$$
- **Direction Cosines ($l, m, n$):**
  The cosines of the angles $\\alpha, \\beta, \\gamma$ that $\\mathbf{r}$ makes with positive $x, y, z$ axes:
  $$l = \\cos \\alpha = \\frac{x}{|\\mathbf{r}|}, \\quad m = \\cos \\beta = \\frac{y}{|\\mathbf{r}|}, \\quad n = \\cos \\gamma = \\frac{z}{|\\mathbf{r}|}$$
  $$\\text{Property: } l^2 + m^2 + n^2 = 1$$

---

### 2. Scalar (Dot) Product: $\\mathbf{a} \\cdot \\mathbf{b}$

The **scalar product** of two vectors $\\mathbf{a} = a_1\\mathbf{i} + a_2\\mathbf{j} + a_3\\mathbf{k}$ and $\\mathbf{b} = b_1\\mathbf{i} + b_2\\mathbf{j} + b_3\\mathbf{k}$ is a scalar quantity:

$$\\mathbf{a} \\cdot \\mathbf{b} = |\\mathbf{a}| |\\mathbf{b}| \\cos \\theta = a_1 b_1 + a_2 b_2 + a_3 b_3$$

- **Angle Between Two Vectors ($\\theta$):**
  $$\\cos \\theta = \\frac{\\mathbf{a} \\cdot \\mathbf{b}}{|\\mathbf{a}| |\\mathbf{b}|} = \\frac{a_1 b_1 + a_2 b_2 + a_3 b_3}{\\sqrt{a_1^2 + a_2^2 + a_3^2} \\cdot \\sqrt{b_1^2 + b_2^2 + b_3^2}}$$
- **Condition for Orthogonality (Perpendicular Vectors):**
  Two non-zero vectors $\\mathbf{a}$ and $\\mathbf{b}$ are **mutually perpendicular (orthogonal)** if and only if:
  $$\\mathbf{a} \\cdot \\mathbf{b} = 0$$

---

### 3. Vector (Cross) Product: $\\mathbf{a} \\times \\mathbf{b}$

The **vector product** produces a vector perpendicular to both $\\mathbf{a}$ and $\\mathbf{b}$:
$$\\mathbf{a} \\times \\mathbf{b} = |\\mathbf{a}| |\\mathbf{b}| \\sin \\theta \\, \\mathbf{\\hat{n}}$$

Computed via a $3 \\times 3$ determinant:
$$\\mathbf{a} \\times \\mathbf{b} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix} = \\mathbf{i}(a_2 b_3 - a_3 b_2) - \\mathbf{j}(a_1 b_3 - a_3 b_1) + \\mathbf{k}(a_1 b_2 - a_2 b_1)$$

- **Condition for Parallel Vectors:** $\\mathbf{a} \\times \\mathbf{b} = \\mathbf{0}$.
- **Area of a Parallelogram with adjacent sides $\\mathbf{a}$ and $\\mathbf{b}$:**
  $$\\text{Area} = |\\mathbf{a} \\times \\mathbf{b}|$$
- **Area of a Triangle with adjacent sides $\\mathbf{a}$ and $\\mathbf{b}$:**
  $$\\text{Area} = \\frac{1}{2} |\\mathbf{a} \\times \\mathbf{b}|$$`,
    keyTakeaways: [
      'The magnitude of a 3D vector is √(x² + y² + z²), and direction cosines satisfy l² + m² + n² = 1.',
      'Two vectors are orthogonal (perpendicular) if their dot product is zero: a · b = 0.',
      'The cross product a × b is computed via a 3×3 determinant and yields a vector perpendicular to both vectors.',
      'The area of a triangle formed by vectors a and b is half the magnitude of their cross product: ½ |a × b|.'
    ],
    associatedQuizId: 'waec-ss3-fmath-vectors-quiz'
  },

  // ==========================================
  // WEEK 8: STATICS: EQUILIBRIUM OF FORCES
  // ==========================================
  {
    id: 'fmath-ss3-term2-week8',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Statics: Coplanar Forces, Lami’s Theorem & Rigid Body Equilibrium',
    subtopics: [
      'Resolution of Coplanar Forces along Orthogonal Axes (∑Fx = 0, ∑Fy = 0)',
      'Lami’s Theorem for Three Concurrent Coplanar Forces in Equilibrium',
      'Moments of Forces, Couples, and the Principle of Moments',
      'Conditions for Complete Equilibrium of Rigid Bodies and Friction on Inclined Planes'
    ],
    readingTimeMinutes: 10,
    summary: 'Resolve coplanar forces along Cartesian axes, apply Lami’s theorem to concurrent forces, formulate rigid body equilibrium equations, and analyze limiting friction on ramps.',
    contentMarkdown: `### 1. Equilibrium of Concurrent Coplanar Forces

A system of coplanar forces acting at a single point is in static equilibrium if the vector sum of all forces is zero:

$$\\sum F_x = 0 \\quad \\text{and} \\quad \\sum F_y = 0$$

- **Resultant Force ($R$):**
  $$R = \\sqrt{(\\sum F_x)^2 + (\\sum F_y)^2} = 0$$
- **Equilibrant Force:** A single force equal in magnitude but directly opposite in direction to the resultant force ($180^\\circ$ reversal).

---

### 2. Lami’s Theorem

If **three concurrent, coplanar forces** acting at a point are in static equilibrium, each force is directly proportional to the sine of the angle between the other two forces:

$$\\frac{P}{\\sin \\alpha} = \\frac{Q}{\\sin \\beta} = \\frac{R}{\\sin \\gamma}$$

Where $\\alpha$ is the angle between forces $Q$ and $R$, $\\beta$ is the angle between $P$ and $R$, and $\\gamma$ is the angle between $P$ and $Q$.

---

### 3. Equilibrium of Rigid Bodies & Moments

When forces act on an extended rigid body (not at a single point), two independent conditions must be satisfied simultaneously:
1. **Translational Equilibrium:** The algebraic sum of resolved forces in any two perpendicular directions must be zero:
   $$\\sum F_x = 0 \\quad \\text{and} \\quad \\sum F_y = 0$$
2. **Rotational Equilibrium:** The algebraic sum of the **moments of all forces** about any arbitrary point in the plane must be zero:
   $$\\sum M = 0 \\implies \\sum \\text{Clockwise Moments} = \\sum \\text{Anticlockwise Moments}$$

---

### 4. Friction on an Inclined Plane

When a body of mass $m$ rests on a rough plane inclined at an angle $\\theta$ to the horizontal:
- **Normal Reaction ($R$):** $R = m g \\cos \\theta$
- **Down-Plane Gravitational Component:** $W_{\\parallel} = m g \\sin \\theta$
- **Limiting Frictional Force ($F_r$):**
  $$F_r = \\mu R = \\mu (m g \\cos \\theta)$$
  Where $\\mu$ is the **coefficient of static friction**.
- **Angle of Friction (Angle of Repose $\\lambda$):**
  When the body is on the verge of slipping down the plane without any external force:
  $$m g \\sin \\lambda = \\mu m g \\cos \\lambda \\implies \\mu = \\tan \\lambda$$`,
    keyTakeaways: [
      'Concurrent forces in equilibrium satisfy ∑Fx = 0 and ∑Fy = 0.',
      'Lami\'s theorem applies to three concurrent forces in equilibrium: P/sin α = Q/sin β = R/sin γ.',
      'Rigid body equilibrium requires both zero resultant force (∑F = 0) and zero net moment (∑M = 0).',
      'The coefficient of static friction equals the tangent of the angle of repose: μ = tan λ.'
    ],
    associatedQuizId: 'waec-ss3-fmath-statics-quiz'
  },

  // ==========================================
  // WEEK 9: DYNAMICS: RECTILINEAR MOTION
  // ==========================================
  {
    id: 'fmath-ss3-term2-week9',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Dynamics: Rectilinear Motion with Variable Acceleration & Calculus Modeling',
    subtopics: [
      'Kinematics Definitions: Displacement (s), Velocity (v), and Acceleration (a)',
      'Differentiation in Motion: v = ds/dt and a = dv/dt = v(dv/ds)',
      'Integration in Motion: Velocity as v = ∫ a dt and Displacement as s = ∫ v dt',
      'Motion Graphs: Displacement-Time and Velocity-Time Graphs with Area and Gradient Meaning'
    ],
    readingTimeMinutes: 9,
    summary: 'Model rectilinear motion with variable acceleration using differential and integral calculus, calculate maximum displacements, and analyze motion graph gradients.',
    contentMarkdown: `### 1. Calculus of Rectilinear Motion

When a particle moves in a straight line with **variable acceleration**, standard constant-acceleration kinematic equations ($v = u + at$) fail. Calculus must be applied:

$$\\begin{matrix}
\\textbf{Displacement } s(t) & \\xrightarrow{\\text{Differentiate } \\frac{d}{dt}} & \\textbf{Velocity } v(t) & \\xrightarrow{\\text{Differentiate } \\frac{d}{dt}} & \\textbf{Acceleration } a(t) \\\\
\\textbf{Displacement } s(t) & \\xleftarrow{\\text{Integrate } \\int dt} & \\textbf{Velocity } v(t) & \\xleftarrow{\\text{Integrate } \\int dt} & \\textbf{Acceleration } a(t)
\\end{matrix}$$

- **Velocity:** $v = \\frac{ds}{dt}$
- **Acceleration:**
  $$a = \\frac{dv}{dt} = \\frac{d^2s}{dt^2} = v \\frac{dv}{ds}$$
- **Velocity from Acceleration:**
  $$v = \\int a \\, dt$$
- **Displacement from Velocity:**
  $$s = \\int v \\, dt$$

---

### 2. Physical Conditions in Kinematic Problems

| Physical Condition | Mathematical Translation |
| :--- | :--- |
| Particle is momentarily at rest | Set **$v = 0$** and solve for $t$ |
| Particle passes through initial origin | Set **$s = 0$** and solve for $t$ |
| Particle attains maximum or minimum velocity | Set **$a = \\frac{dv}{dt} = 0$** and solve for $t$ |
| Particle attains maximum displacement | Set **$v = \\frac{ds}{dt} = 0$** and solve for $t$ |

---

### 3. Worked WAEC Examination Drill

**Question:** The displacement $s$ (in meters) of a particle moving in a straight line after $t$ seconds is given by:
$$s = 2t^3 - 9t^2 + 12t + 4$$
Determine:
1. The initial position and initial velocity of the particle.
2. The times when the particle is momentarily at rest.
3. The minimum velocity of the particle.
4. The total distance traveled between $t = 0$ and $t = 3\\text{ seconds}$.

**Solution:**
1. **Initial Values ($t = 0$):**
   $$s(0) = 4\\text{ meters}$$
   $$v(t) = \\frac{ds}{dt} = 6t^2 - 18t + 12$$
   $$v(0) = 12\\text{ m/s}$$
2. **Momentarily at Rest ($v = 0$):**
   $$6t^2 - 18t + 12 = 0 \\implies t^2 - 3t + 2 = 0$$
   $$(t - 1)(t - 2) = 0 \\implies t = 1\\text{ s} \\quad \\text{and} \\quad t = 2\\text{ s}$$
3. **Minimum Velocity:**
   Occurs when acceleration $a = 0$:
   $$a(t) = \\frac{dv}{dt} = 12t - 18 = 0 \\implies 12t = 18 \\implies t = 1.5\\text{ s}$$
   Substitute $t = 1.5$ into $v(t)$:
   $$v_{\\text{min}} = 6(1.5)^2 - 18(1.5) + 12 = 6(2.25) - 27 + 12 = 13.5 - 27 + 12 = -1.5\\text{ m/s}$$
4. **Total Distance ($t = 0$ to $t = 3$):**
   The particle reverses direction at $t = 1\\text{ s}$ and $t = 2\\text{ s}$:
   - $s(0) = 4\\text{ m}$
   - $s(1) = 2(1) - 9(1) + 12(1) + 4 = 9\\text{ m}$ (Distance $= |9 - 4| = 5\\text{ m}$)
   - $s(2) = 2(8) - 9(4) + 12(2) + 4 = 16 - 36 + 24 + 4 = 8\\text{ m}$ (Distance $= |8 - 9| = 1\\text{ m}$)
   - $s(3) = 2(27) - 9(9) + 12(3) + 4 = 54 - 81 + 36 + 4 = 13\\text{ m}$ (Distance $= |13 - 8| = 5\\text{ m}$)
   $$\\text{Total Distance} = 5 + 1 + 5 = 11\\text{ meters}$$`,
    keyTakeaways: [
      'In rectilinear motion with variable acceleration, v = ds/dt and a = dv/dt = v(dv/ds).',
      'Velocity is found by integrating acceleration: v = ∫ a dt; displacement by integrating velocity: s = ∫ v dt.',
      'A particle is momentarily at rest when v = 0; velocity is at an extremum when a = 0.',
      'Total distance traveled must account for path direction reversals when the velocity changes sign.'
    ],
    associatedQuizId: 'waec-ss3-fmath-dynamics-quiz'
  },

  // ==========================================
  // WEEK 10: DYNAMICS: PROJECTILES
  // ==========================================
  {
    id: 'fmath-ss3-term2-week10',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Dynamics: Motion of Projectiles, Parabolic Trajectories & Range Optimization',
    subtopics: [
      'Resolution of Initial Velocity: Horizontal (u cos θ) and Vertical (u sin θ) Components',
      'Derivation of Kinematic Formulas: Time of Flight (T), Maximum Height (H), and Range (R)',
      'Condition for Maximum Horizontal Range (θ = 45°) and Complementary Angles of Projection',
      'The Cartesian Trajectory Equation: y = x tan θ - (gx²) / (2u² cos² θ)'
    ],
    readingTimeMinutes: 10,
    summary: 'Decompose projectile motion, derive time of flight, maximum height, and range formulas, analyze the parabolic trajectory equation, and calculate maximum range.',
    contentMarkdown: `### 1. Mechanics of Projectile Motion

A **projectile** is any object launched into the air with an initial velocity $u$ at an angle $\\theta$ to the horizontal, moving under the sole influence of gravity (neglecting air resistance):

#### Resolution of Initial Velocity ($u$):
- **Horizontal Component ($u_x$):** $u_x = u \\cos \\theta$ (Constant; zero horizontal acceleration: $a_x = 0$).
- **Vertical Component ($u_y$):** $u_y = u \\sin \\theta$ (Subject to downward gravity: $a_y = -g$).

At any time $t$ after launch:
- $v_x = u \\cos \\theta$
- $v_y = u \\sin \\theta - gt$
- Horizontal distance: $x = (u \\cos \\theta) \\cdot t$
- Vertical height: $y = (u \\sin \\theta) \\cdot t - \\frac{1}{2}gt^2$

---

### 2. Derivation of Core Projectile Formulas

| Metric | Derivation Step | Final Mathematical Formula |
| :--- | :--- | :--- |
| **Time to reach Maximum Height ($t_h$)** | At peak height, vertical velocity $v_y = 0$: $0 = u \\sin \\theta - gt_h$ | $t_h = \\frac{u \\sin \\theta}{g}$ |
| **Total Time of Flight ($T$)** | By symmetry (or setting vertical displacement $y = 0$): $T = 2 t_h$ | $T = \\frac{2 u \\sin \\theta}{g}$ |
| **Maximum Height ($H$)** | Substitute $t_h$ into vertical displacement equation: $H = u \\sin \\theta \\left(\\frac{u \\sin \\theta}{g}\\right) - \\frac{1}{2}g \\left(\\frac{u \\sin \\theta}{g}\\right)^2$ | $H = \\frac{u^2 \\sin^2 \\theta}{2g}$ |
| **Horizontal Range ($R$)** | Total horizontal distance traveled during time of flight: $R = u_x \\cdot T = (u \\cos \\theta) \\left(\\frac{2u \\sin \\theta}{g}\\right) = \\frac{u^2(2\\sin\\theta\\cos\\theta)}{g}$ | $R = \\frac{u^2 \\sin 2\\theta}{g}$ |

#### Maximum Horizontal Range ($R_{\\text{max}}$):
Since the maximum value of $\\sin 2\\theta$ is $1.0$ (when $2\\theta = 90^\\circ \\implies \\theta = 45^\\circ$):
$$R_{\\text{max}} = \\frac{u^2}{g} \\quad \\text{at an angle of } \\theta = 45^\\circ$$

*Complementary Angles Property:* Two launch angles that sum to $90^\\circ$ (e.g., $30^\\circ$ and $60^\\circ$) achieve the **exact same horizontal range** for a given initial velocity, because $\\sin(2(90^\\circ - \\theta)) = \\sin(180^\\circ - 2\\theta) = \\sin 2\\theta$.

---

### 3. Cartesian Trajectory Equation

From the horizontal position $x = (u \\cos \\theta)t \\implies t = \\frac{x}{u \\cos \\theta}$.
Substitute $t$ into vertical displacement $y$:
$$y = (u \\sin \\theta)\\left(\\frac{x}{u \\cos \\theta}\\right) - \\frac{1}{2}g \\left(\\frac{x}{u \\cos \\theta}\\right)^2$$
$$y = x \\tan \\theta - \\frac{g x^2}{2 u^2 \\cos^2 \\theta} = x \\tan \\theta - \\frac{g x^2 (1 + \\tan^2 \\theta)}{2 u^2}$$

This is the standard equation of a **downward-opening parabola**, proving that every projectile traces a parabolic path in vacuum.`,
    keyTakeaways: [
      'Horizontal velocity remains constant (ux = u cos θ); vertical velocity decreases under gravity (uy = u sin θ - gt).',
      'Time of flight is T = 2u sin θ / g; maximum height is H = u² sin² θ / (2g).',
      'Horizontal range is R = u² sin 2θ / g; maximum range occurs at a launch angle of θ = 45°.',
      'Complementary angles (e.g., 30° and 60°) produce identical horizontal ranges.'
    ],
    associatedQuizId: 'waec-ss3-fmath-projectiles-quiz'
  },

  // ==========================================
  // WEEK 11: PROBABILITY DISTRIBUTIONS
  // ==========================================
  {
    id: 'fmath-ss3-term2-week11',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Probability Distributions: Binomial, Poisson & The Standard Normal Curve',
    subtopics: [
      'Discrete Random Variables: Probability Mass Functions (PMF), Mean E(X), and Variance Var(X)',
      'The Binomial Distribution B(n, p): Formula, Conditions, Mean (μ = np), and Variance (σ² = npq)',
      'The Poisson Distribution Po(λ): Formula P(X = x) = (λˣ e⁻λ) / x! and Modeling Rare Events',
      'Continuous Distributions: The Normal Distribution N(μ, σ²), Standard Normal Z-Score, and Table Reading'
    ],
    readingTimeMinutes: 10,
    summary: 'Evaluate discrete probability distributions (Binomial and Poisson), compute expected values and variances, and master standard normal Z-score probability lookups.',
    contentMarkdown: `### 1. Discrete Probability Distributions

A **discrete random variable $X$** takes on distinct separated values with assigned probabilities satisfying:
$$\\sum P(X = x) = 1 \\quad \\text{and} \\quad 0 \\le P(X = x) \\le 1$$

- **Expected Value (Mean $\\mu$):**
  $$E(X) = \\mu = \\sum x \\cdot P(X = x)$$
- **Variance ($\\sigma^2$):**
  $$\\text{Var}(X) = \\sigma^2 = E(X^2) - [E(X)]^2 = \\sum x^2 P(X = x) - \\mu^2$$

---

### 2. The Binomial Distribution: $X \\sim B(n, p)$

Models the number of successes $r$ in $n$ independent Bernoulli trials:

#### Four Essential Conditions:
1. Fixed number of identical trials ($n$).
2. Exactly two mutually exclusive outcomes per trial (Success with probability $p$, Failure with probability $q = 1 - p$).
3. Probability of success $p$ remains constant from trial to trial.
4. All trials are strictly independent.

#### Mathematical Probability Formula:
$$P(X = r) = \\binom{n}{r} p^r q^{n-r} = \\frac{n!}{r!(n - r)!} p^r (1 - p)^{n-r}$$

- **Mean ($\\mu$):** $\\mu = n p$
- **Variance ($\\sigma^2$):** $\\sigma^2 = n p q$
- **Standard Deviation ($\\sigma$):** $\\sigma = \\sqrt{n p q}$

---

### 3. The Poisson Distribution: $X \\sim \\text{Po}(\\lambda)$

Models the number of occurrences of a **rare event** occurring randomly and independently over a fixed interval of time or space:

$$P(X = x) = \\frac{\\lambda^x e^{-\\lambda}}{x!} \\quad (x = 0, 1, 2, 3, \\dots)$$

Where:
- $\\lambda$ is the mean average rate of occurrence per interval.
- $e \\approx 2.71828$ is Euler's constant.
- *Unique Property of Poisson:* **Mean equals Variance** ($E(X) = \\text{Var}(X) = \\lambda$).

---

### 4. The Continuous Normal Distribution: $X \\sim N(\\mu, \\sigma^2)$

The **Normal Distribution** is a continuous probability distribution with a bell-shaped, symmetrical probability density function centered at mean $\\mu$:
- Symmetrical about the mean (Mean = Median = Mode).
- Total area under the normal curve is exactly **$1.0$**.
- $68.27\\%$ of values lie within $\\mu \\pm 1\\sigma$; $95.45\\%$ lie within $\\mu \\pm 2\\sigma$; $99.73\\%$ lie within $\\mu \\pm 3\\sigma$.

#### Standard Normal Variable ($Z$):
To compute probabilities using standard normal statistical tables, transform $X$ into standard units ($Z \\sim N(0, 1)$):
$$Z = \\frac{X - \\mu}{\\sigma}$$

**Drill:** If scores in a JAMB examination follow $N(200, 25^2)$ (mean $\\mu = 200$, standard deviation $\\sigma = 25$), find the probability that a randomly chosen candidate scores above $250$:
$$Z = \\frac{250 - 200}{25} = \\frac{50}{25} = 2.0$$
$$P(X > 250) = P(Z > 2.0) = 1 - \\Phi(2.0) = 1 - 0.9772 = 0.0228 \\; (2.28\\%)$$`,
    keyTakeaways: [
      'The Binomial distribution formula is P(X = r) = nCr p^r q^(n-r), with mean μ = np and variance σ² = npq.',
      'In a Poisson distribution, the mean and variance are equal: E(X) = Var(X) = λ.',
      'The standard normal variable is Z = (X - μ) / σ with mean 0 and variance 1.',
      'The total area under the probability density curve of a normal distribution is exactly 1.0.'
    ],
    associatedQuizId: 'waec-ss3-fmath-probability-quiz'
  },

  // ==========================================
  // WEEK 12: TERM REVIEW & WAEC MASTERCLASS
  // ==========================================
  {
    id: 'fmath-ss3-term2-week12',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 12,
    topicTitle: 'Term Review & WAEC Further Mathematics Masterclass: Paper 1 & 2 Strategies',
    subtopics: [
      'Comprehensive Review of 2nd Term: Conics, Advanced Calculus, 3D Vectors, Statics, and Kinematics',
      'WAEC Further Mathematics Examination Format: Paper 1 (Objective) and Paper 2 (Core & Electives)',
      'Structuring Mathematical Proofs: Deductive Logic, Vector Notation, and Setting up Diagrams',
      'Examiner Marking Scheme Rubrics: Method Marks (M), Accuracy Marks (A), and Independent Marks (B)'
    ],
    readingTimeMinutes: 10,
    summary: 'Consolidate 2nd Term further mathematics, analyze WAEC exam paper architectures, master method and accuracy mark scoring rubrics, and practice exam proofs.',
    contentMarkdown: `### 1. Structure of the WAEC Further Mathematics Examination

The WAEC Further Mathematics / Mathematics (Elective) examination consists of two papers:

1. **Paper 1: Multiple Choice Objectives (40 Questions / 1 Hour 30 Minutes / 40 Marks):**
   - High speed and precision across Pure Mathematics, Statistics, and Mechanics.
2. **Paper 2: Theory & Problem Solving (2 Hours 30 Minutes / 100 Marks):**
   - **Section A (Compulsory Core - 48 Marks):** Eight short, compulsory questions testing foundational skills across the syllabus.
   - **Section B (Advanced Elective Questions - 52 Marks):** Candidates must answer **four** comprehensive questions chosen from three parts:
     - **Part I:** Pure Mathematics
     - **Part II:** Mechanics
     - **Part III:** Probability and Statistics

---

### 2. Understanding the WAEC Examiner Marking Code

Examiners award marks using three standardized letters:

| Mark Type | Meaning | How Candidates Earn or Lose the Mark |
| :--- | :--- | :--- |
| **M Mark (Method Mark)** | Awarded for demonstrating a correct, valid mathematical method or formula. | Awarded even if a minor arithmetic slip occurs later, **provided the method is conceptually sound**. Omission of working steps forfeits M marks! |
| **A Mark (Accuracy Mark)** | Awarded for the correct numerical or algebraic answer resulting directly from a preceding M mark. | An A mark is strictly **dependent on the preceding M mark** ($M_1 A_1$). If the method is flawed, the accuracy mark is automatically zero. |
| **B Mark (Independent Mark)** | Awarded for a standalone correct statement, diagram, or formula independent of method. | Granted for writing a correct standard theorem, drawing a force polygon, or stating a correct definition. |

---

### 3. Essential Examination Problem Solving Guidelines

- **Always Sketch a Diagram:** In Mechanics and Conic Geometry questions, a clear, labeled diagram (e.g., resolving forces, drawing an inclined plane, or sketching a circle with tangent) clarifies the problem and earns B marks.
- **Vector Notation Discipline:** Always write vectors with bold notation or arrows/bars ($\\vec{a}$ or $\\underline{a}$) and unit vectors with hats ($\\mathbf{\\hat{i}}, \\mathbf{\\hat{j}}, \\mathbf{\\hat{k}}$). Writing bare scalars where vectors are required loses marks.
- **Show Integration Constants ($+ C$):** Never omit the constant of integration ($+ C$) in indefinite integrals; failure to write $+ C$ costs accuracy marks.
- **Do Not Round Off Prematurely:** Carry intermediate calculations to at least $4$ decimal places, rounding off only the final answer to $3$ significant figures or as specified by the question.`,
    keyTakeaways: [
      'WAEC Further Maths Paper 2 consists of Section A (8 compulsory questions) and Section B (4 chosen from Pure Maths, Mechanics, Statistics).',
      'Examiners award Method (M), Accuracy (A), and Independent (B) marks; accuracy marks require a valid preceding method.',
      'Always sketch labeled diagrams for Mechanics and Coordinate Geometry problems to earn independent B marks.',
      'Never omit the constant of integration (+ C) in indefinite calculus solutions.'
    ],
    associatedQuizId: 'waec-ss3-fmath-masterclass-quiz'
  }
];
