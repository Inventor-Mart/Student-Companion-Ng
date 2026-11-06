import { CurriculumTopic } from '../types';

export const SS2_MATH_TOPICS: CurriculumTopic[] = [
  // --------------------------------------------------------------------------
  // WEEK 1: LOGARITHMS & EXPONENTIAL EQUATIONS
  // --------------------------------------------------------------------------
  {
    id: 'ss2-math-t2-w1',
    associatedQuizId: 'waec-math-ss2-logarithms',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Logarithms & Exponential Equations',
    subtopics: [
      'Fundamental Laws of Logarithms (Product, Quotient, Power, and Base Change)',
      'Solving Exponential Equations by Reduction to Linear or Quadratic Forms',
      'Logarithmic Equations with Varying Bases',
      'Real-world Applications in Compound Interest and Population Growth Rates',
      'WAEC/NECO Examination Drills with Step-by-Step Marking Guides'
    ],
    readingTimeMinutes: 15,
    summary: 'Mastering the fundamental laws of logarithms, base-change techniques, exponential equations reducible to quadratics, and logarithmic equation problem solving.',
    contentMarkdown: `### 1. Fundamental Laws of Logarithms

A logarithm is the inverse operation to exponentiation. By definition:

$$\\log_b(N) = x \\iff b^x = N \\quad (b > 0, b \\neq 1, N > 0)$$

Where $b$ is the base, $N$ is the argument, and $x$ is the exponent.

| Law | Algebraic Statement | Description & Practical Constraint |
|---|---|---|
| **Product Law** | $\\log_b(xy) = \\log_b(x) + \\log_b(y)$ | The log of a product is the sum of the logs |
| **Quotient Law** | $\\log_b(x/y) = \\log_b(x) - \\log_b(y)$ | The log of a quotient is the difference of the logs |
| **Power Law** | $\\log_b(x^k) = k \\log_b(x)$ | Powers become scalar multipliers |
| **Identity Law** | $\\log_b(b) = 1$ and $\\log_b(1) = 0$ | Any base to power 1 equals itself; base to 0 equals 1 |
| **Change of Base** | $\\log_b(x) = \\frac{\\log_a(x)}{\\log_a(b)}$ | Enables conversion to common base 10 or natural base $e$ |

> [!NOTE]
> **Crucial WAEC Invariant:** You cannot take the logarithm of zero or any negative number within the set of real numbers ($\\mathbb{R}$). Always check extraneous roots when solving logarithmic equations!

---

### 2. Solving Exponential Equations Reducible to Quadratics

When an exponential equation features terms where the power of one term is double that of another, substitute a dummy variable ($y$) to reduce the equation to quadratic form.

#### Worked Problem 1 (WAEC Standard):
**Solve for $x$ in:** $2^{2x+1} - 9(2^x) + 4 = 0$

1. **Decompose the Exponent using Index Laws:**
   $$2^{2x} \\cdot 2^1 - 9(2^x) + 4 = 0$$
   $$2(2^x)^2 - 9(2^x) + 4 = 0$$

2. **Substitute $y = 2^x$ (where $y > 0$):**
   $$2y^2 - 9y + 4 = 0$$

3. **Factorize the Quadratic Equation:**
   - Product $ac = 2 \\times 4 = 8$; Sum $b = -9$.
   - Factors: $-8$ and $-1$.
   $$(2y - 1)(y - 4) = 0$$
   $$y = \\frac{1}{2} \\quad \\text{or} \\quad y = 4$$

4. **Back-Substitute to Solve for $x$:**
   - Case 1: $2^x = \\frac{1}{2} = 2^{-1} \\implies x = -1$
   - Case 2: $2^x = 4 = 2^2 \\implies x = 2$
   - **Solution Set:** $\\{ -1, 2 \\}$

---

### 3. Logarithmic Equations Involving Base Changes

#### Worked Problem 2:
**Solve:** $\\log_2(x) + \\log_4(x) = 6$

1. **Convert $\\log_4(x)$ to base 2 using Change of Base Law:**
   $$\\log_4(x) = \\frac{\\log_2(x)}{\\log_2(4)} = \\frac{\\log_2(x)}{2} = \\frac{1}{2}\\log_2(x)$$

2. **Substitute back into original equation:**
   $$\\log_2(x) + \\frac{1}{2}\\log_2(x) = 6$$
   $$\\frac{3}{2}\\log_2(x) = 6$$

3. **Multiply both sides by $\\frac{2}{3}$:**
   $$\\log_2(x) = 6 \\times \\frac{2}{3} = 4$$
   $$x = 2^4 = 16$$

---

### 4. WAEC Checkpoint Assessment

1. Solve for $x$ if $\\log_{10}(x^2 - 3x + 12) = 1$.
   - *Rationale:* Convert to index form: $x^2 - 3x + 12 = 10^1 = 10$. Thus $x^2 - 3x + 2 = 0 \\implies (x - 1)(x - 2) = 0$. Solutions are $x = 1$ or $x = 2$.
2. Solve $3^{2x} - 4(3^{x+1}) + 27 = 0$.
   - *Rationale:* Rewrite as $(3^x)^2 - 12(3^x) + 27 = 0$. Letting $y = 3^x$, $y^2 - 12y + 27 = 0 \\implies (y - 3)(y - 9) = 0$. If $3^x = 3 \\implies x = 1$; if $3^x = 9 \\implies x = 2$.`,
    keyTakeaways: [
      'Change of base formula: log_b(x) = log_a(x) / log_a(b).',
      'When an exponential equation has a term with 2x and another with x, substitute y = a^x to form a quadratic.',
      'Always test roots in original logarithmic equations to eliminate negative arguments.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 2: LINEAR & QUADRATIC INEQUALITIES
  // --------------------------------------------------------------------------
  {
    id: 'ss2-math-t2-w2',
    associatedQuizId: 'waec-math-ss2-inequalities',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Linear & Quadratic Inequalities in One and Two Variables',
    subtopics: [
      'Rules of Inequality (Multiplication and Division by Negative Quantities)',
      'Quadratic Inequalities: Number Line Testing and Parabola Roots Method',
      'Simultaneous Linear Inequalities in One Variable',
      'Linear Inequalities in Two Variables & Cartesian Region Shading',
      'Origin Test and Feasibility Region Determination'
    ],
    readingTimeMinutes: 16,
    summary: 'Techniques for solving linear and quadratic inequalities in one variable and graphical determination of feasibility regions in two variables using Cartesian shading.',
    contentMarkdown: `### 1. Fundamental Principles of Inequalities

When solving inequalities, the direction of the inequality sign is preserved under addition and subtraction, but **reverses whenever both sides are multiplied or divided by a negative quantity**.

[Diagram: math-inequalities-plane]

| Operation on Inequality | Example | Effect on Inequality Sign |
|---|---|---|
| **Add/Subtract positive or negative** | $x - 4 < 7 \\implies x < 11$ | **Unchanged** |
| **Multiply/Divide by positive number** | $2x \\ge 10 \\implies x \\ge 5$ | **Unchanged** |
| **Multiply/Divide by negative number** | $-3x \\le 12 \\implies x \\ge -4$ | **Reverses ($\le$ becomes $\ge$)** |
| **Reciprocal (if terms have same sign)** | $x > 4 \\implies \\frac{1}{x} < \\frac{1}{4}$ | **Reverses** |

---

### 2. Solving Quadratic Inequalities in One Variable

A quadratic inequality takes the form $ax^2 + bx + c > 0$ or $ax^2 + bx + c \\le 0$.

#### Method 1: The Parabola / Critical Points Method
1. Set the inequality to zero: $ax^2 + bx + c = 0$ and find critical roots $x_1$ and $x_2$ (where $x_1 < x_2$).
2. For an upward-opening parabola ($a > 0$):
   - $ax^2 + bx + c < 0$ is satisfied **between the roots**: $x_1 < x < x_2$.
   - $ax^2 + bx + c > 0$ is satisfied **outside the roots**: $x < x_1 \\text{ or } x > x_2$.

#### Worked Example:
**Solve:** $x^2 - 5x - 6 \\ge 0$

1. Find critical values: $(x - 6)(x + 1) = 0 \\implies x = -1 \\text{ and } x = 6$.
2. Test intervals on the real number line:
   - For $x < -1$ (e.g. $x = -2$): $(-2-6)(-2+1) = (-8)(-1) = +8 > 0$ (Satisfied)
   - For $-1 < x < 6$ (e.g. $x = 0$): $(0-6)(0+1) = -6 < 0$ (Not satisfied)
   - For $x > 6$ (e.g. $x = 7$): $(7-6)(7+1) = (1)(8) = +8 > 0$ (Satisfied)
3. **Solution Set:** $x \\le -1 \\quad \\text{or} \\quad x \\ge 6$.

---

### 3. Graphical Shading of Inequalities in Two Variables

To graph a linear inequality in two variables such as $2x + 3y \\le 12$:
1. **Draw the Boundary Line:** Graph $2x + 3y = 12$.
   - When $x = 0$, $3y = 12 \\implies y = 4$ (y-intercept: $(0,4)$).
   - When $y = 0$, $2x = 12 \\implies x = 6$ (x-intercept: $(6,0)$).
   - Use a **solid line** for $\\le$ or $\\ge$, and a **broken/dashed line** for $<$ or $>$.
2. **Execute the Origin Test:**
   - Test point $(0,0)$: $2(0) + 3(0) = 0 \\le 12$ (True).
   - Since $(0,0)$ satisfies the inequality, the entire half-plane containing the origin represents the required solution region.`,
    keyTakeaways: [
      'Multiplication or division by a negative number inverts the inequality sign.',
      'For ax^2 + bx + c < 0 with a > 0, the solution lies between the roots (x1 < x < x2).',
      'Solid lines represent inclusive inequalities (<=, >=); broken lines represent strict inequalities (<, >).'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 3: CHORD PROPERTIES OF CIRCLES
  // --------------------------------------------------------------------------
  {
    id: 'ss2-math-t2-w3',
    associatedQuizId: 'waec-math-ss2-chords',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Chord Properties & Perpendicular Bisectors of Circles',
    subtopics: [
      'Definition of Chords, Secants, and Segments',
      'Theorem: A Straight Line Drawn from Center to Bisect a Chord is at Right Angles to the Chord',
      'Equal Chords are Equidistant from the Center',
      'Pythagoras Theorem Applications in Circles: $r^2 = d^2 + \\left(\\frac{L}{2}\\right)^2$',
      'Calculations Involving Intersecting Chords (Internal and External)'
    ],
    readingTimeMinutes: 14,
    summary: 'The geometric relationships governing circle chords, perpendicular bisectors from the center, radius-distance calculations using Pythagoras theorem, and intersecting chords theorem.',
    contentMarkdown: `### 1. Geometric Foundations of Circle Chords

A **chord** is a straight line segment joining any two points on the circumference of a circle. The longest chord of any circle passes through the center and is termed the **diameter**.

| Chord Theorem | Mathematical Statement | Deductive Consequence |
|---|---|---|
| **Perpendicular Bisector** | If line $OM \\perp AB$, then $AM = MB$ | Center line perpendicular to chord bisects it |
| **Equal Chords Equidistance** | If chord $AB = CD$, then $OM = ON$ | Equal chords are equal distances from center |
| **Intersecting Chords (Internal)** | $AP \\cdot PB = CP \\cdot PD$ | Rectangles of chord segments at intersection are equal |
| **Intersecting Secants (External)** | $PA \\cdot PB = PC \\cdot PD$ | Whole secant $\\times$ external part is constant |

---

### 2. Chord-Radius Right-Angled Triangle Model

In any circle of radius $r$ with a chord of length $L$ situated at perpendicular distance $d$ from center $O$:

$$r^2 = d^2 + \\left(\\frac{L}{2}\\right)^2$$

#### Worked Problem (WAEC Practical Geometry):
**A chord of length $16\\text{ cm}$ is at a distance of $6\\text{ cm}$ from the center of a circle. Calculate the radius of the circle and the length of another chord whose distance from the center is $8\\text{ cm}$.**

1. **Calculate the Radius ($r$):**
   - Half of the chord length: $\\frac{L_1}{2} = \\frac{16}{2} = 8\\text{ cm}$.
   - Distance from center: $d_1 = 6\\text{ cm}$.
   - Using Pythagoras theorem:
     $$r^2 = 6^2 + 8^2 = 36 + 64 = 100$$
     $$r = \\sqrt{100} = 10\\text{ cm}$$

2. **Calculate the Length of the Second Chord ($L_2$):**
   - For the new chord, distance from center $d_2 = 8\\text{ cm}$ and $r = 10\\text{ cm}$.
   - Let half of the new chord be $x$:
     $$10^2 = 8^2 + x^2$$
     $$100 = 64 + x^2 \\implies x^2 = 36 \\implies x = 6\\text{ cm}$$
   - Whole chord length: $L_2 = 2 \\times 6 = 12\\text{ cm}$.`,
    keyTakeaways: [
      'A perpendicular drawn from the circle center to any chord always bisects the chord.',
      'Pythagoras relationship: r^2 = d^2 + (chord / 2)^2.',
      'Intersecting chords rule: AP * PB = CP * PD.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 4: CIRCLE THEOREMS I (ANGLES IN CIRCLES)
  // --------------------------------------------------------------------------
  {
    id: 'ss2-math-t2-w4',
    associatedQuizId: 'waec-math-ss2-circle-theorems-1',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Circle Theorems I: Angles Subtended at Center and Circumference',
    subtopics: [
      'Theorem 1: Angle Subtended at the Center is Twice the Angle at the Circumference',
      'Theorem 2: Angles in the Same Segment of a Circle are Equal',
      'Theorem 3: Angle Subtended by a Diameter in a Semicircle is a Right Angle ($90^\\circ$)',
      'Formal Geometric Proofs Required by WAEC/NECO',
      'Deductive Calculations with Multi-Angle Circle Configurations'
    ],
    readingTimeMinutes: 16,
    summary: 'Mastering the primary circle angle theorems: angle at center is double the circumference angle, angles in the same segment are equal, and the angle in a semicircle is 90 degrees.',
    contentMarkdown: `### 1. Primary Circle Angle Theorems

[Diagram: math-circle-theorems]

| Theorem Name | Geometric Statement | WAEC Proof Abbreviation |
|---|---|---|
| **Angle at Center** | The angle subtended by an arc at the center is twice that subtended at the circumference: $\\angle AOB = 2 \\angle APB$ | *Angle at center = 2 × angle at circumference* |
| **Angles in Same Segment** | Angles subtended by the same arc in the same segment of a circle are equal: $\\angle APB = \\angle AQB$ | *Angles in same segment are equal* |
| **Angle in a Semicircle** | The angle in a semicircle is a right angle: if $AB$ is diameter, $\\angle APB = 90^\\circ$ | *Angle in semicircle = 90°* |

---

### 2. Formal Proof: Angle Subtended at Center

**Theorem Statement:** The angle subtended by an arc at the center of a circle is twice the angle subtended by it at any point on the remaining circumference.

- **Given:** Circle with center $O$, arc $AB$ subtending $\\angle AOB$ at the center and $\\angle APB$ at the circumference.
- **To Prove:** $\\angle AOB = 2 \\angle APB$.
- **Construction:** Join $PO$ and produce it to point $Q$.
- **Proof:**
  1. In $\\triangle AOP$, $OA = OP$ (radii of the same circle).
  2. Therefore, $\\triangle AOP$ is isosceles, meaning $\\angle OAP = \\angle OPA$.
  3. By the exterior angle theorem of triangles:
     $$\\angle AOQ = \\angle OAP + \\angle OPA = 2\\angle OPA$$
  4. Similarly, in $\\triangle BOP$, $OB = OP$ (radii), so $\\triangle BOP$ is isosceles:
     $$\\angle BOQ = \\angle OBP + \\angle OPB = 2\\angle OPB$$
  5. Adding the two equations:
     $$\\angle AOQ + \\angle BOQ = 2(\\angle OPA + \\angle OPB)$$
     $$\\angle AOB = 2\\angle APB \\quad \\text{[Q.E.D.]}$$

---

### 3. Worked WAEC Application
In a circle with center $O$, points $A, B, C$ lie on the circumference. If $\\angle AOC = 130^\\circ$, find $\\angle ABC$ where $B$ is on the major arc.
- Since arc $AC$ subtends $130^\\circ$ at center $O$, the angle at circumference $\\angle ABC = \\frac{1}{2} \\times 130^\\circ = 65^\\circ$.`,
    keyTakeaways: [
      'Angle at center is always exactly double the angle at the circumference on the same arc.',
      'Any triangle inscribed in a semicircle with the diameter as hypotenuse has a 90° right angle.',
      'All angles subtended by the same chord in the same segment are congruent.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 5: CIRCLE THEOREMS II (CYCLIC QUADRILATERALS & TANGENTS)
  // --------------------------------------------------------------------------
  {
    id: 'ss2-math-t2-w5',
    associatedQuizId: 'waec-math-ss2-circle-theorems-2',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Circle Theorems II: Cyclic Quadrilaterals & Alternate Segment Theorem',
    subtopics: [
      'Properties of Cyclic Quadrilaterals (Opposite Angles Sum to $180^\\circ$)',
      'Exterior Angle of a Cyclic Quadrilateral Equals the Interior Opposite Angle',
      'Tangents to a Circle: Radius is Perpendicular to Tangent at Point of Contact',
      'Tangents from an External Point are Equal in Length',
      'The Alternate Segment Theorem and Multi-Step Geometric Deductions'
    ],
    readingTimeMinutes: 16,
    summary: 'Cyclic quadrilateral theorems, tangent-radius orthogonality, equal tangents from an external point, and the alternate segment theorem.',
    contentMarkdown: `### 1. Theorems of Cyclic Quadrilaterals

A **cyclic quadrilateral** is a four-sided polygon whose four vertices all lie on the circumference of a single circle.

| Theorem | Formal Statement | Mathematical Notation |
|---|---|---|
| **Opposite Angles Sum** | The opposite angles of a cyclic quadrilateral are supplementary | $\\angle A + \\angle C = 180^\\circ$ and $\\angle B + \\angle D = 180^\\circ$ |
| **Exterior Angle Rule** | The exterior angle of a cyclic quadrilateral equals the interior opposite angle | $\\angle BCE = \\angle BAD$ |
| **Tangent-Radius Orthogonality** | The tangent to a circle is perpendicular to the radius at the point of contact | $OT \\perp PT \\implies \\angle OTP = 90^\\circ$ |
| **Alternate Segment Theorem** | The angle between a tangent and a chord equals the angle in the alternate segment | $\\angle TAB = \\angle ACB$ |

---

### 2. Tangents from an External Point

When two tangents are drawn to a circle from a common external point $T$ touching at $A$ and $B$:
1. The lengths of the two tangents are equal: $TA = TB$.
2. The line joining external point $T$ to center $O$ bisects the angle between the tangents ($\\angle ATB$) and the angle between the radii ($\\angle AOB$).
3. Quadrilateral $TAOB$ is a cyclic quadrilateral with $\\angle TAO + \\angle TBO = 90^\\circ + 90^\\circ = 180^\\circ$.

---

### 3. Worked WAEC Multi-Theorem Problem:
In a circle, $ABCD$ is a cyclic quadrilateral. Side $AB$ is produced to $E$. If $\\angle ADC = 78^\\circ$ and $\\angle BAC = 42^\\circ$, calculate:
1. $\\angle CBE$ (Exterior angle)
2. $\\angle ACB$

**Step-by-Step Solution:**
1. By the **Exterior Angle Theorem of Cyclic Quadrilaterals**:
   $$\\angle CBE = \\angle ADC = 78^\\circ$$
2. Since opposite angles of a cyclic quadrilateral sum to $180^\\circ$:
   $$\\angle ABC = 180^\\circ - \\angle ADC = 180^\\circ - 78^\\circ = 102^\\circ$$
3. In $\\triangle ABC$, the angles of a triangle sum to $180^\\circ$:
   $$\\angle ACB = 180^\\circ - (\\angle BAC + \\angle ABC) = 180^\\circ - (42^\\circ + 102^\\circ) = 180^\\circ - 144^\\circ = 36^\\circ$$`,
    keyTakeaways: [
      'Opposite angles of a cyclic quadrilateral always sum to 180 degrees.',
      'The exterior angle of a cyclic quadrilateral equals the interior opposite angle.',
      'Angle between tangent and chord equals the angle subtended by that chord in the alternate segment.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 6: MID-TERM ASSESSMENT & PROBLEM CLINIC
  // --------------------------------------------------------------------------
  {
    id: 'ss2-math-t2-w6',
    associatedQuizId: 'waec-math-ss2-midterm-clinic',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Mid-Term Problem Clinic: Algebra & Circle Geometry Syntheses',
    subtopics: [
      'Comprehensive Review of Logarithmic and Exponential Equations',
      'Synthesized Cartesian Inequality Proofs',
      'Step-by-Step WAEC Geometric Proof Writing Standards',
      'Error Analysis: Avoiding Frequent Arithmetic & Algebraic Pitfalls'
    ],
    readingTimeMinutes: 12,
    summary: 'Mid-term consolidation clinic bridging exponential algebra and circle geometry theorems with WAEC marking rubric guidelines.',
    contentMarkdown: `### 1. Common WAEC Geometric Error Traps

In WAEC mathematics theory marking, answers that omit geometric reasons lose over 50% of available method marks ($M_1, A_1$).

| Geometric Statement Written | Required Reason / Justification |
|---|---|
| $x + y = 180^\\circ$ | *(Opposite angles of cyclic quad sum to 180°)* |
| $\\angle APB = 90^\\circ$ | *(Angle in a semicircle is a right angle)* |
| $\\angle AOB = 2\\angle APB$ | *(Angle at center is twice angle at circumference)* |
| $OT \\perp TP$ | *(Radius is perpendicular to tangent at point of contact)* |
| $\\angle TAB = \\angle ACB$ | *(Angle in alternate segment theorem)* |

---

### 2. Consolidated Challenge Problem
Given that $\\log_2(a) + \\log_4(b) = 5$ and $\\log_4(a) + \\log_2(b) = 7$, find the numerical value of $ab$.

1. Convert all logs to base 2:
   - Eq. 1: $\\log_2(a) + \\frac{1}{2}\\log_2(b) = 5 \\implies 2\\log_2(a) + \\log_2(b) = 10$
   - Eq. 2: $\\frac{1}{2}\\log_2(a) + \\log_2(b) = 7 \\implies \\log_2(a) + 2\\log_2(b) = 14$
2. Add both equations:
   $$3\\log_2(a) + 3\\log_2(b) = 24$$
   $$\\log_2(a) + \\log_2(b) = 8$$
3. By the Product Law of Logarithms:
   $$\\log_2(ab) = 8 \\implies ab = 2^8 = 256$$`,
    keyTakeaways: [
      'Every geometric step in WAEC must have a bracketed reason to earn method marks.',
      'Logarithm systems with mixed bases should be reduced immediately to a single common base.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 7: TRIGONOMETRIC RATIOS & GRAPHS
  // --------------------------------------------------------------------------
  {
    id: 'ss2-math-t2-w7',
    associatedQuizId: 'waec-math-ss2-trig-graphs',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Trigonometric Ratios & Periodic Graphs ($0^\\circ$ to $360^\\circ$)',
    subtopics: [
      'Signs of Trigonometric Ratios in the 4 Quadrants (CAST Rule)',
      'Ratios of General Angles and Negative Angles: $\\sin(-x) = -\\sin(x)$, $\\cos(-x) = \\cos(x)$',
      'Graphs of Sine, Cosine, and Tangent Functions from $0^\\circ$ to $360^\\circ$',
      'Amplitude, Periodicity, and Phase Shifts',
      'Graphical Solution of Trigonometric Equations: $\\sin(x) = k$'
    ],
    readingTimeMinutes: 15,
    summary: 'The ASTC/CAST quadrant system, special angles (30°, 45°, 60°), and periodic waveforms of sine and cosine functions from 0° to 360°.',
    contentMarkdown: `### 1. Quadrant Signs of Trigonometric Ratios (The CAST Rule)

In the Cartesian coordinate plane, an angle $\\theta$ is generated by rotating a ray counter-clockwise from the positive $x$-axis.

| Quadrant | Angle Range | Positive Trigonometric Ratios | Memory Aid |
|---|---|---|---|
| **Quadrant I** | $0^\\circ < \\theta < 90^\\circ$ | **All** ($\\sin, \\cos, \\tan$) are positive | **A**ll |
| **Quadrant II** | $90^\\circ < \\theta < 180^\\circ$ | **Sine** only is positive | **S**cience |
| **Quadrant III** | $180^\\circ < \\theta < 270^\\circ$ | **Tangent** only is positive | **T**eachers |
| **Quadrant IV** | $270^\\circ < \\theta < 360^\\circ$ | **Cosine** only is positive | **C**are |

---

### 2. Characteristics of Trigonometric Curves

For functions of the general form $y = A \\sin(Bx)$ or $y = A \\cos(Bx)$:
- **Amplitude ($|A|$):** The maximum vertical displacement from the equilibrium axis.
- **Period ($T$):** The length of the interval over which the wave completes one full cycle:
  $$T = \\frac{360^\\circ}{B}$$

| Function | Amplitude | Period | Maximum Value & Position | Minimum Value & Position |
|---|---|---|---|---|
| $y = \\sin(x)$ | $1$ | $360^\\circ$ | $+1$ at $90^\\circ$ | $-1$ at $270^\\circ$ |
| $y = \\cos(x)$ | $1$ | $360^\\circ$ | $+1$ at $0^\\circ, 360^\\circ$ | $-1$ at $180^\\circ$ |
| $y = \\tan(x)$ | Undefined | $180^\\circ$ | Asymptotes at $90^\\circ, 270^\\circ$ | Asymptotes at $90^\\circ, 270^\\circ$ |

---

### 3. Worked Trigonometric Equation
**Solve $\\sin(\\theta) = -0.5$ for $0^\\circ \\le \\theta \\le 360^\\circ$.**
1. **Find Reference Acute Angle ($\\alpha$):**
   $$\\sin(\\alpha) = 0.5 \\implies \\alpha = 30^\\circ$$
2. **Determine Active Quadrants:**
   - Sine is negative in **Quadrant III** and **Quadrant IV**.
3. **Compute Angles:**
   - In Quad III: $\\theta = 180^\\circ + 30^\\circ = 210^\\circ$
   - In Quad IV: $\\theta = 360^\\circ - 30^\\circ = 330^\\circ$
   - **Solution:** $\\theta = \\{ 210^\\circ, 330^\\circ \\}$`,
    keyTakeaways: [
      'ASTC rule identifies which ratios are positive in each quadrant.',
      'Period of y = sin(Bx) is 360° / B; period of tan(Bx) is 180° / B.',
      'Always find reference angle alpha first, then map into valid quadrants.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 8: SINE & COSINE RULES AND 3-FIGURE BEARINGS
  // --------------------------------------------------------------------------
  {
    id: 'ss2-math-t2-w8',
    associatedQuizId: 'waec-math-ss2-bearings',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Sine and Cosine Rules & 3-Figure Bearings',
    subtopics: [
      'The Sine Rule: $\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}$',
      'The Cosine Rule: $a^2 = b^2 + c^2 - 2bc \\cos A$',
      'Area of a Scalene Triangle: $\\text{Area} = \\frac{1}{2}ab \\sin C$',
      'Three-Figure Compass Bearings and Back Bearings',
      'Solving Practical Surveying and Navigational Triangulations'
    ],
    readingTimeMinutes: 17,
    summary: 'Mastering the Sine Rule and Cosine Rule for solving non-right triangles, coupled with 3-figure compass bearings for navigational surveying.',
    contentMarkdown: `### 1. Decision Matrix: Sine Rule vs. Cosine Rule

[Diagram: math-trig-bearing-diagram]

| Given Information in Triangle | Applicable Trigonometric Rule | Formula to Use |
|---|---|---|
| **Two angles and any one side (AAS / ASA)** | **Sine Rule** | $\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}$ |
| **Two sides and non-included angle (SSA)** | **Sine Rule** (Check ambiguous case) | $\\frac{\\sin B}{b} = \\frac{\\sin A}{a}$ |
| **Two sides and included angle (SAS)** | **Cosine Rule** | $a^2 = b^2 + c^2 - 2bc \\cos A$ |
| **All three sides known (SSS)** | **Cosine Rule** (Re-arranged) | $\\cos A = \\frac{b^2 + c^2 - a^2}{2bc}$ |

---

### 2. Principles of Three-Figure Bearings

A three-figure bearing is a direction specified by a 3-digit angle ($000^\\circ$ to $360^\\circ$) measured **clockwise from the True North** axis.
- **Rule of Back Bearing:**
  - If Forward Bearing $\\theta < 180^\\circ$: $\\text{Back Bearing} = \\theta + 180^\\circ$
  - If Forward Bearing $\\theta \\ge 180^\\circ$: $\\text{Back Bearing} = \\theta - 180^\\circ$

---

### 3. Comprehensive WAEC Navigation Example
A ship sails from Port $A$ on a bearing of $060^\\circ$ for $120\\text{ km}$ to reach Port $B$. From Port $B$, it sails on a bearing of $150^\\circ$ for $160\\text{ km}$ to reach Port $C$. Calculate:
1. The distance between Port $A$ and Port $C$.
2. The bearing of Port $C$ from Port $A$.

**Step 1: Calculate Interior Angle at $B$ ($\\angle ABC$):**
- Back bearing from $B$ to $A = 060^\\circ + 180^\\circ = 240^\\circ$.
- Bearing from $B$ to $C = 150^\\circ$.
- Interior angle at $B = 240^\\circ - 150^\\circ = 90^\\circ$.

**Step 2: Calculate Distance $AC$:**
- Since $\\angle ABC = 90^\\circ$, we can use Pythagoras Theorem (or Cosine Rule with $\\cos 90^\\circ = 0$):
  $$AC^2 = 120^2 + 160^2 = 14400 + 25600 = 40000$$
  $$AC = \\sqrt{40000} = 200\\text{ km}$$

**Step 3: Calculate Bearing of $C$ from $A$:**
- Let $\\angle BAC = \\theta$.
  $$\\tan(\\theta) = \\frac{\\text{Opposite}}{\\text{Adjacent}} = \\frac{160}{120} = \\frac{4}{3} \\approx 1.3333$$
  $$\\theta = \\tan^{-1}(1.3333) \\approx 53.13^\\circ$$
- Bearing of $C$ from $A = 060^\\circ + 53.13^\\circ = 113.13^\\circ \\approx 113^\\circ$.`,
    keyTakeaways: [
      'Use Sine Rule for AAS/ASA cases; use Cosine Rule for SAS and SSS cases.',
      'Three-figure bearings are always 3 digits measured clockwise from North.',
      'Back bearing differs from forward bearing by exactly 180 degrees.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 9: PROBABILITY
  // --------------------------------------------------------------------------
  {
    id: 'ss2-math-t2-w9',
    associatedQuizId: 'waec-math-ss2-probability',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Probability: Independent, Mutually Exclusive & Conditional Events',
    subtopics: [
      'Theoretical vs Experimental Probability: $P(E) = \\frac{n(E)}{n(S)}$',
      'The Addition Rule for Mutually Exclusive and Non-Mutually Exclusive Events',
      'The Multiplication Rule for Independent Events: $P(A \\cap B) = P(A) \\times P(B)$',
      'Dependent Events & Sampling With/Without Replacement',
      'Probability Tree Diagrams for Sequential Real-World Decisions'
    ],
    readingTimeMinutes: 15,
    summary: 'Probability principles including mutually exclusive addition rules, independent multiplication rules, dependent sampling without replacement, and tree diagrams.',
    contentMarkdown: `### 1. Fundamental Probability Axioms

The probability of any event $E$ satisfies $0 \\le P(E) \\le 1$.
- $P(E) = 0 \\implies$ Impossible event.
- $P(E) = 1 \\implies$ Certain event.
- $P(E') = 1 - P(E) \\implies$ Complementary event (probability of $E$ not occurring).

| Event Type | Defining Characteristic | Mathematical Formula |
|---|---|---|
| **Mutually Exclusive** | Cannot occur simultaneously ($A \\cap B = \\emptyset$) | $P(A \\cup B) = P(A) + P(B)$ |
| **Non-Mutually Exclusive** | Can overlap simultaneously | $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$ |
| **Independent Events** | Occurrence of $A$ does not affect probability of $B$ | $P(A \\cap B) = P(A) \\times P(B)$ |
| **Dependent Events** | Outcome of first event alters sample space of second | $P(A \\cap B) = P(A) \\times P(B \\mid A)$ |

---

### 2. Worked Problem: Sampling Without Replacement

**A bag contains 5 red balls and 4 blue balls (total = 9). Two balls are drawn at random one after the other without replacement. Calculate the probability of selecting:**
1. Both red balls.
2. Balls of different colors.

**Solution:**
1. **Probability of Both Red ($RR$):**
   $$P(R_1) = \\frac{5}{9}$$
   $$P(R_2 \\mid R_1) = \\frac{4}{8} = \\frac{1}{2}$$
   $$P(RR) = \\frac{5}{9} \\times \\frac{1}{2} = \\frac{5}{18}$$

2. **Probability of Different Colors ($RB$ or $BR$):**
   - Case $RB$: $\\frac{5}{9} \\times \\frac{4}{8} = \\frac{20}{72} = \\frac{5}{18}$
   - Case $BR$: $\\frac{4}{9} \\times \\frac{5}{8} = \\frac{20}{72} = \\frac{5}{18}$
   - Total $P(\\text{different}) = \\frac{5}{18} + \\frac{5}{18} = \\frac{10}{18} = \\frac{5}{9}$`,
    keyTakeaways: [
      'For mutually exclusive events, add probabilities: P(A or B) = P(A) + P(B).',
      'For independent events, multiply probabilities: P(A and B) = P(A) * P(B).',
      'Sampling without replacement decreases both the favorable outcome and total sample space by 1.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 10: STATISTICS I (GROUPED DATA MEASURES OF LOCATION)
  // --------------------------------------------------------------------------
  {
    id: 'ss2-math-t2-w10',
    associatedQuizId: 'waec-math-ss2-statistics-mean',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Statistics I: Grouped Frequency Distributions, Mean, Median & Mode',
    subtopics: [
      'Constructing Grouped Frequency Tables (Class Intervals, Limits, Boundaries, and Midpoints)',
      'Calculating the Mean of Grouped Data (Direct Method: $\\bar{x} = \\frac{\\sum fx}{\\sum f}$)',
      'Assumed Mean Method: $\\bar{x} = A + \\frac{\\sum fd}{\\sum f}$',
      'Formula for the Mode of Grouped Data: $L + \\left(\\frac{\\Delta_1}{\\Delta_1 + \\Delta_2}\\right)c$',
      'Formula for the Median of Grouped Data: $L + \\left(\\frac{\\frac{N}{2} - F}{f_m}\\right)c$'
    ],
    readingTimeMinutes: 16,
    summary: 'Techniques for analyzing grouped continuous data: calculating mean by direct and assumed mean methods, and applying modal and median algebraic interpolation formulas.',
    contentMarkdown: `### 1. Grouped Data Structural Definitions

When data spans a wide numeric range, individual values are partitioned into uniform class intervals.

| Term | Definition | Example for Class $20 - 29$ |
|---|---|---|
| **Class Limits** | Stated lower and upper boundary integers | Lower limit = $20$, Upper limit = $29$ |
| **Class Boundaries** | True mathematical continuous boundaries | Lower = $19.5$, Upper = $29.5$ |
| **Class Midpoint ($x$)** | Arithmetic center: $\\frac{\\text{Lower} + \\text{Upper}}{2}$ | $x = \\frac{20 + 29}{2} = 24.5$ |
| **Class Width ($c$)** | Upper boundary minus lower boundary | $c = 29.5 - 19.5 = 10$ |

---

### 2. Formulas for Grouped Data Analysis

#### 1. Mean (Direct and Assumed Mean Methods):
$$\\text{Direct:} \\quad \\bar{x} = \\frac{\\sum f x}{\\sum f} \\qquad \\text{Assumed Mean:} \\quad \\bar{x} = A + \\frac{\\sum f d}{\\sum f} \\quad (d = x - A)$$

#### 2. Mode of Grouped Data:
$$\\text{Mode} = L + \\left(\\frac{\\Delta_1}{\\Delta_1 + \\Delta_2}\\right) c$$
Where:
- $L$ = Lower class boundary of the modal class.
- $\\Delta_1 = f_m - f_{m-1}$ (difference between modal frequency and pre-modal frequency).
- $\\Delta_2 = f_m - f_{m+1}$ (difference between modal frequency and post-modal frequency).
- $c$ = Class width of modal class.

#### 3. Median of Grouped Data:
$$\\text{Median} = L + \\left(\\frac{\\frac{N}{2} - F}{f_m}\\right) c$$
Where:
- $N = \\sum f$ (total frequency).
- $L$ = Lower class boundary of the median class.
- $F$ = Cumulative frequency of the class immediately preceding the median class.
- $f_m$ = Frequency of the median class.
- $c$ = Class width.`,
    keyTakeaways: [
      'Class boundaries represent true continuous endpoints (subtract 0.5 from lower, add 0.5 to upper for integer data).',
      'Assumed mean formula simplifies calculation by reducing large multi-digit numbers to small deviations d.',
      'Modal formula uses frequency differences Delta 1 and Delta 2.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 11: STATISTICS II (OGIVE & MEASURES OF DISPERSION)
  // --------------------------------------------------------------------------
  {
    id: 'ss2-math-t2-w11',
    associatedQuizId: 'waec-math-ss2-statistics-ogive',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Statistics II: Cumulative Frequency (Ogive), Quartiles & Standard Deviation',
    subtopics: [
      'Plotting Cumulative Frequency Curves (Ogives) using Upper Class Boundaries',
      'Graphical Estimation of Median ($Q_2$), Lower Quartile ($Q_1$), and Upper Quartile ($Q_3$)',
      'Interquartile Range ($IQR = Q_3 - Q_1$) and Semi-Interquartile Range',
      'Percentiles and Pass Mark Cut-off Determinations',
      'Variance ($\\sigma^2$) and Standard Deviation ($\\sigma$) of Grouped Data'
    ],
    readingTimeMinutes: 16,
    summary: 'Plotting and reading cumulative frequency curves (Ogives), graphical estimation of quartiles and percentiles, and calculating variance and standard deviation.',
    contentMarkdown: `### 1. Cumulative Frequency Curve (The Ogive)

[Diagram: math-cumulative-frequency-ogive]

An **Ogive** is a continuous cumulative curve plotted on Cartesian coordinates:
- **Horizontal Axis (X):** Upper Class Boundaries.
- **Vertical Axis (Y):** Cumulative Frequency ($cf$).

| Quartile / Measure | Position on Cumulative Frequency Axis | Interpretation |
|---|---|---|
| **Lower Quartile ($Q_1$)** | $\\frac{1}{4} N = 0.25 N$ | 25% of candidates score at or below this value |
| **Median ($Q_2$)** | $\\frac{1}{2} N = 0.50 N$ | 50% midpoint of the entire cohort |
| **Upper Quartile ($Q_3$)** | $\\frac{3}{4} N = 0.75 N$ | 75% of candidates score at or below this value |
| **Interquartile Range ($IQR$)** | $Q_3 - Q_1$ | Measures spread of the middle 50% of data |
| **80th Percentile ($P_{80}$)** | $\\frac{80}{100} N = 0.80 N$ | Top 20% distinction cut-off line |

---

### 2. Grouped Variance & Standard Deviation

Variance and standard deviation measure the dispersion of data around the arithmetic mean.

$$\\text{Variance } (\\sigma^2) = \\frac{\\sum f(x - \\bar{x})^2}{\\sum f} = \\frac{\\sum fx^2}{\\sum f} - \\left(\\frac{\\sum fx}{\\sum f}\\right)^2$$

$$\\text{Standard Deviation } (\\sigma) = \\sqrt{\\text{Variance}} = \\sqrt{\\frac{\\sum fx^2}{\\sum f} - (\\bar{x})^2}$$

#### Computation Table Layout:
| Class Interval | Frequency ($f$) | Midpoint ($x$) | $fx$ | $x^2$ | $f x^2$ |
|---|---|---|---|---|---|
| $10 - 19$ | $4$ | $14.5$ | $58$ | $210.25$ | $841.0$ |
| $20 - 29$ | $8$ | $24.5$ | $196$ | $600.25$ | $4,802.0$ |
| $30 - 39$ | $12$ | $34.5$ | $414$ | $1,190.25$ | $14,283.0$ |`,
    keyTakeaways: [
      'The Ogive is always plotted with Upper Class Boundaries on the x-axis against Cumulative Frequency on the y-axis.',
      'Interquartile Range = Q3 - Q1; Semi-Interquartile Range = (Q3 - Q1) / 2.',
      'Standard deviation is the positive square root of variance.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 12: REVISION & WAEC MASTERY EXAMINATION
  // --------------------------------------------------------------------------
  {
    id: 'ss2-math-t2-w12',
    associatedQuizId: 'waec-math-ss2-exam-mastery',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 12,
    topicTitle: 'Comprehensive Revision & WAEC/NECO Examination Drills',
    subtopics: [
      'Mastery Integration: Algebra, Geometry, Trigonometry, and Statistics',
      'Full-Length WAEC Model Questions with Step-by-Step Marking Schemes',
      'Time Management & Examination Strategy for 2-Paper Format'
    ],
    readingTimeMinutes: 14,
    summary: 'Terminal revision integrating circle theorems, 3-figure bearings, quadratic inequalities, logarithms, and grouped statistics with past WAEC exam questions.',
    contentMarkdown: `### 1. Examination Structure: WAEC General Mathematics

WAEC General Mathematics comprises two papers:
- **Paper 1 (Objective):** 50 multiple choice questions in $1 \\text{ hr } 30 \\text{ mins}$ (50 marks).
- **Paper 2 (Essay/Theory):** $2 \\text{ hrs } 30 \\text{ mins}$ (100 marks).
  - *Section A (Compulsory):* 5 short questions testing foundational skills (40 marks).
  - *Section B:* Answer 5 long questions out of 8 questions offered (60 marks).

---

### 2. High-Yield Examination Synthesis Problem
**Problem:** In a survey of 100 students at King's College, Lagos, the cumulative frequency distribution of mathematics marks was plotted. The 25th percentile was $38\\text{ marks}$ and the 75th percentile was $64\\text{ marks}$. A student who scored $\\ge 70$ marks was awarded an A. If 15 students scored an A:
1. Find the Interquartile Range ($IQR$).
2. What percentage of students scored between $38$ and $64$ marks?
3. Calculate the probability that a student chosen at random scored below $70$ marks.

**Step-by-Step Solution:**
1. $IQR = Q_3 - Q_1 = 64 - 38 = 26\\text{ marks}$.
2. Between $Q_1$ (25%) and $Q_3$ (75%) lies exactly $75\\% - 25\\% = 50\\%$ of the students.
3. Students scoring $\\ge 70$ is $15$. Therefore, students scoring $< 70$ is $100 - 15 = 85$.
   $$P(\\text{Score} < 70) = \\frac{85}{100} = 0.85 \\quad \\left(\\text{or } \\frac{17}{20}\\right)$$`,
    keyTakeaways: [
      'Section A of WAEC Paper 2 is 100% compulsory; ensure mastery of core arithmetic and circle theorem basics.',
      'Always quote theorem names or reasons in brackets during geometric proofs to secure method marks.'
    ]
  }
];
