import { CurriculumTopic } from '../types';

export const SS2_FURTHER_MATH_TOPICS: CurriculumTopic[] = [
  // ==========================================
  // WEEK 1: MATRICES & DETERMINANTS I (2x2)
  // ==========================================
  {
    id: 'fmath-ss2-term2-week1',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Matrices & Determinants I: 2x2 Algebra, Determinants & Matrix Inverses',
    subtopics: [
      'Matrix Definitions, Order/Dimension (m x n), and Special Matrices (Identity, Null, Diagonal)',
      'Matrix Operations: Scalar Multiplication, Addition, and Matrix Product Compatibility',
      'Determinant of a 2x2 Matrix: det(A) = ad - bc and Singularity Conditions',
      'Adjoint Matrix and Multiplicative Inverse: A⁻¹ = (1 / det A) * adj(A)'
    ],
    readingTimeMinutes: 9,
    summary: 'Master 2x2 matrix algebra, verify matrix product compatibility, compute determinants, test for matrix singularity, and derive the multiplicative inverse to solve simultaneous systems.',
    contentMarkdown: `### 1. Matrix Concepts & Notations

A **Matrix** is a rectangular array of real numbers, parameters, or expressions arranged in horizontal **rows** ($m$) and vertical **columns** ($n$). The dimension or order of the matrix is denoted as $m \\times n$.

- **Identity Matrix ($I$):** A square matrix with ones along the principal diagonal and zeros elsewhere:
  $$I_2 = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$$
- **Zero / Null Matrix ($O$):** All entries are zero.
- **Transpose ($A^T$):** Formed by interchanging the rows and columns of matrix $A$.

### 2. Matrix Multiplication Rules

Two matrices $A$ and $B$ can be multiplied if and only if the **number of columns in $A$ equals the number of rows in $B$**:

$$(m \\times k) \\times (k \\times n) = (m \\times n)$$

For $2 \\times 2$ matrices:
$$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\begin{pmatrix} e & f \\\\ g & h \\end{pmatrix} = \\begin{pmatrix} ae + bg & af + bh \\\\ ce + dg & cf + dh \\end{pmatrix}$$

*(Crucial Note: Matrix multiplication is **non-commutative**; in general, $AB \\neq BA$).*

### 3. Determinant of a 2x2 Matrix

Given matrix $A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$, its determinant $\\det(A)$ or $|A|$ is:

$$\\det(A) = |A| = ad - bc$$

- **Singular Matrix:** If $\\det(A) = 0$, the matrix has **no inverse** ($A^{-1}$ does not exist).
- **Non-Singular Matrix:** If $\\det(A) \\neq 0$, the matrix is invertible.

### 4. Inverse of a 2x2 Matrix

The multiplicative inverse $A^{-1}$ satisfies $A \\cdot A^{-1} = A^{-1} \\cdot A = I$:

$$A^{-1} = \\frac{1}{\\det(A)} \\operatorname{adj}(A) = \\frac{1}{ad - bc} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$$

**Worked Example:** Find the inverse of $M = \\begin{pmatrix} 3 & 4 \\\\ 1 & 2 \\end{pmatrix}$.
$$\\det(M) = (3)(2) - (4)(1) = 6 - 4 = 2 \\neq 0$$
$$\\operatorname{adj}(M) = \\begin{pmatrix} 2 & -4 \\\\ -1 & 3 \\end{pmatrix}$$
$$M^{-1} = \\frac{1}{2} \\begin{pmatrix} 2 & -4 \\\\ -1 & 3 \\end{pmatrix} = \\begin{pmatrix} 1 & -2 \\\\ -0.5 & 1.5 \\end{pmatrix}$$`,
    keyTakeaways: [
      'Matrix multiplication is associative but strictly non-commutative (AB != BA).',
      'The determinant of a 2x2 matrix is ad - bc.',
      'A singular matrix has a determinant of zero and possesses no inverse.',
      'To invert a 2x2 matrix, swap diagonal elements, negate off-diagonal elements, and divide by the determinant.'
    ],
    associatedQuizId: 'fmath-ss2-matrix-2x2-quiz'
  },

  // ==========================================
  // WEEK 2: MATRICES & DETERMINANTS II (3x3 & CRAMER'S RULE)
  // ==========================================
  {
    id: 'fmath-ss2-term2-week2',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Matrices & Determinants II: 3x3 Expansion, Minors, Cofactors & Cramer’s Rule',
    subtopics: [
      'Minors and Signed Cofactors of a 3x3 Matrix ($C_{ij} = (-1)^{i+j} M_{ij}$)',
      'Expansion of 3x3 Determinants along Any Row or Column',
      'Properties of Determinants (Row Swaps, Scalar Multiplication, Identical Rows)',
      'Cramer’s Rule for Solving Systems of Three Linear Simultaneous Equations'
    ],
    readingTimeMinutes: 9,
    summary: 'Evaluate 3x3 determinants using cofactor expansion, verify determinant invariance properties, and apply Cramer’s Rule to solve 3-variable simultaneous equations.',
    contentMarkdown: `### 1. Minors and Cofactors of a 3x3 Matrix

Given a $3 \\times 3$ matrix $A$:
$$A = \\begin{pmatrix} a_{11} & a_{12} & a_{13} \\\\ a_{21} & a_{22} & a_{23} \\\\ a_{31} & a_{32} & a_{33} \\end{pmatrix}$$

- **Minor ($M_{ij}$):** The determinant of the $2 \\times 2$ submatrix remaining after deleting row $i$ and column $j$.
- **Cofactor ($C_{ij}$):** The minor multiplied by its alternating chessboard sign:
  $$C_{ij} = (-1)^{i+j} M_{ij}$$

The cofactor sign pattern is:
$$\\begin{pmatrix} + & - & + \\\\ - & + & - \\\\ + & - & + \\end{pmatrix}$$

### 2. Evaluating a 3x3 Determinant

Expanding along the first row:
$$\\det(A) = a_{11} \\begin{vmatrix} a_{22} & a_{23} \\\\ a_{32} & a_{33} \\end{vmatrix} - a_{12} \\begin{vmatrix} a_{21} & a_{23} \\\\ a_{31} & a_{33} \\end{vmatrix} + a_{13} \\begin{vmatrix} a_{21} & a_{22} \\\\ a_{31} & a_{32} \\end{vmatrix}$$

### 3. Key Properties of Determinants

1. If any row or column of a matrix consists entirely of zeros, $\\det(A) = 0$.
2. If two rows or columns are identical or proportional, $\\det(A) = 0$.
3. Interchanging any two rows or columns reverses the sign of the determinant: $\\det(A') = -\\det(A)$.
4. $\\det(A^T) = \\det(A)$ and $\\det(AB) = \\det(A) \\cdot \\det(B)$.

### 4. Cramer’s Rule for 3-Variable Systems

For the linear system:
$$\\begin{cases} a_1 x + b_1 y + c_1 z = d_1 \\\\ a_2 x + b_2 y + c_2 z = d_2 \\\\ a_3 x + b_3 y + c_3 z = d_3 \\end{cases}$$

Let $\\Delta$ be the determinant of the coefficient matrix:
$$\\Delta = \\begin{vmatrix} a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\\\ a_3 & b_3 & c_3 \\end{vmatrix}, \\quad \\Delta_x = \\begin{vmatrix} d_1 & b_1 & c_1 \\\\ d_2 & b_2 & c_2 \\\\ d_3 & b_3 & c_3 \\end{vmatrix}, \\quad \\Delta_y = \\begin{vmatrix} a_1 & d_1 & c_1 \\\\ a_2 & d_2 & c_2 \\\\ a_3 & d_3 & c_3 \\end{vmatrix}, \\quad \\Delta_z = \\begin{vmatrix} a_1 & b_1 & d_1 \\\\ a_2 & b_2 & d_2 \\\\ a_3 & b_3 & d_3 \\end{vmatrix}$$

Provided $\\Delta \\neq 0$, the unique solutions are:
$$x = \\frac{\\Delta_x}{\\Delta}, \\quad y = \\frac{\\Delta_y}{\\Delta}, \\quad z = \\frac{\\Delta_z}{\\Delta}$$`,
    keyTakeaways: [
      'Cofactor Cij equals (-1)^(i+j) times the minor Mij.',
      'A 3x3 determinant can be expanded along any row or column yielding identical results.',
      'If two rows are identical or proportional, the determinant is automatically zero.',
      'Cramer’s rule provides an exact determinant quotient solution for simultaneous linear equations.'
    ],
    associatedQuizId: 'fmath-ss2-matrix-3x3-cramer-quiz'
  },

  // ==========================================
  // WEEK 3: DIFFERENTIATION I: FIRST PRINCIPLES & RULES
  // ==========================================
  {
    id: 'fmath-ss2-term2-week3',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Differentiation I: First Principles, Power Rule, Product & Quotient Rules',
    subtopics: [
      'Concept of Functional Limits and Definition of the Derivative from First Principles',
      'Derivation of the Power Rule: d/dx(xⁿ) = n xⁿ⁻¹',
      'The Product Rule for Differentiating Products: d/dx(uv) = u(dv/dx) + v(du/dx)',
      'The Quotient Rule for Fractional Functions: d/dx(u/v) = (v du/dx - u dv/dx) / v²'
    ],
    readingTimeMinutes: 9,
    summary: 'Derive derivatives from first principles using limit definitions, apply standard power rules, and differentiate complex composite products and quotients.',
    contentMarkdown: `### 1. The Derivative from First Principles

In calculus, the **derivative** of a function $y = f(x)$ measures the instantaneous rate of change of $y$ with respect to $x$, representing the gradient of the tangent line to the curve:

$$\\frac{dy}{dx} = f'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h} = \\lim_{\\Delta x \\to 0} \\frac{\\Delta y}{\\Delta x}$$

**Proof for $f(x) = x^2$:**
$$f(x + h) = (x + h)^2 = x^2 + 2xh + h^2$$
$$\\frac{f(x + h) - f(x)}{h} = \\frac{x^2 + 2xh + h^2 - x^2}{h} = \\frac{2xh + h^2}{h} = 2x + h$$
$$\\lim_{h \\to 0} (2x + h) = 2x \\implies \\frac{d}{dx}[x^2] = 2x$$

### 2. Standard Rules of Differentiation

| Function $f(x)$ | Derivative $f'(x) = \\frac{dy}{dx}$ | Rule Name |
| :--- | :--- | :--- |
| $c$ (constant) | $0$ | Constant Rule |
| $x^n$ | $n x^{n-1}$ | Power Rule |
| $c \\cdot f(x)$ | $c \\cdot f'(x)$ | Constant Multiple |
| $u(x) \\pm v(x)$ | $\\frac{du}{dx} \\pm \\frac{dv}{dx}$ | Sum / Difference Rule |
| $\\sin(x)$ | $\\cos(x)$ | Standard Trig Derivative |
| $\\cos(x)$ | $-\\sin(x)$ | Standard Trig Derivative |
| $e^x$ | $e^x$ | Exponential Derivative |
| $\\ln(x)$ | $\\frac{1}{x}$ | Logarithmic Derivative |

### 3. The Product Rule

When two differentiable functions $u(x)$ and $v(x)$ are multiplied:

$$\\frac{d}{dx}[u \\cdot v] = u \\frac{dv}{dx} + v \\frac{du}{dx}$$

- **Example:** Differentiate $y = x^3 \\sin(x)$.
  Let $u = x^3 \\implies u' = 3x^2$; let $v = \\sin(x) \\implies v' = \\cos(x)$.
  $$\\frac{dy}{dx} = x^3 \\cos(x) + 3x^2 \\sin(x)$$

### 4. The Quotient Rule

When function $u(x)$ is divided by $v(x)$ (with $v(x) \\neq 0$):

$$\\frac{d}{dx}\\left[\\frac{u}{v}\\right] = \\frac{v \\frac{du}{dx} - u \\frac{dv}{dx}}{v^2}$$

- **Example:** Differentiate $y = \\frac{2x + 1}{x^2 + 3}$.
  $$u = 2x + 1 \\implies u' = 2, \\quad v = x^2 + 3 \\implies v' = 2x$$
  $$\\frac{dy}{dx} = \\frac{(x^2 + 3)(2) - (2x + 1)(2x)}{(x^2 + 3)^2} = \\frac{2x^2 + 6 - 4x^2 - 2x}{(x^2 + 3)^2} = \\frac{-2x^2 - 2x + 6}{(x^2 + 3)^2}$$`,
    keyTakeaways: [
      'The derivative from first principles is the limit of (f(x+h) - f(x))/h as h approaches 0.',
      'Power rule: d/dx[x^n] = n * x^(n-1).',
      'Product rule: d/dx(uv) = u(dv/dx) + v(du/dx).',
      'Quotient rule: d/dx(u/v) = (v du/dx - u dv/dx) / v^2.'
    ],
    associatedQuizId: 'fmath-ss2-diff-rules-quiz'
  },

  // ==========================================
  // WEEK 4: DIFFERENTIATION II: CHAIN RULE & IMPLICIT
  // ==========================================
  {
    id: 'fmath-ss2-term2-week4',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Differentiation II: Composite Functions, Chain Rule & Implicit Differentiation',
    subtopics: [
      'Differentiating Functions of a Function (Composite Functions)',
      'The Chain Rule: dy/dx = (dy/du) * (du/dx)',
      'Implicit Differentiation for Equations Linking x and y (e.g. Circles x² + y² = r²)',
      'Second and Higher-Order Derivatives: d²y/dx² and Notation'
    ],
    readingTimeMinutes: 9,
    summary: 'Apply the Chain Rule to composite trigonometric and algebraic powers, perform implicit differentiation on multi-variable curve equations, and compute second derivatives.',
    contentMarkdown: `### 1. The Chain Rule (Function of a Function)

When $y$ is a function of an intermediate variable $u$, and $u$ is a function of $x$ (i.e. $y = f(g(x))$):

$$\\frac{dy}{dx} = \\frac{dy}{du} \\times \\frac{du}{dx}$$

- **Worked Example:** Differentiate $y = (3x^2 - 5x + 7)^4$.
  Let $u = 3x^2 - 5x + 7 \\implies y = u^4$.
  $$\\frac{dy}{du} = 4u^3, \\quad \\frac{du}{dx} = 6x - 5$$
  $$\\frac{dy}{dx} = 4(3x^2 - 5x + 7)^3 \\cdot (6x - 5) = 4(6x - 5)(3x^2 - 5x + 7)^3$$

### 2. Differentiating Trigonometric Functions with Chain Rule

If $y = \\sin(ax + b)$, then $\\frac{dy}{dx} = a \\cos(ax + b)$.
If $y = \\cos(u)$, then $\\frac{dy}{dx} = -\\sin(u) \\frac{du}{dx}$.
If $y = \\tan(u)$, then $\\frac{dy}{dx} = \\sec^2(u) \\frac{du}{dx}$.

- **Example:** Differentiate $y = \\cos(4x^3)$.
  $$\\frac{dy}{dx} = -\\sin(4x^3) \\cdot \\frac{d}{dx}[4x^3] = -12x^2 \\sin(4x^3)$$

### 3. Implicit Differentiation

When an equation cannot be easily isolated as $y = f(x)$ (e.g. $x^2 + y^2 = 25$ or $x^3 + y^3 - 3axy = 0$), we differentiate every term with respect to $x$, applying the chain rule whenever differentiating a $y$-term:

$$\\frac{d}{dx}[y^n] = n y^{n-1} \\frac{dy}{dx}$$

**Worked Example:** Find $\\frac{dy}{dx}$ for the circle $x^2 + y^2 = 25$.
$$\\frac{d}{dx}[x^2] + \\frac{d}{dx}[y^2] = \\frac{d}{dx}[25]$$
$$2x + 2y \\frac{dy}{dx} = 0$$
$$2y \\frac{dy}{dx} = -2x \\implies \\frac{dy}{dx} = -\\frac{x}{y}$$

### 4. Higher Order Derivatives

The second derivative is obtained by differentiating $\\frac{dy}{dx}$ with respect to $x$:

$$\\frac{d^2 y}{dx^2} = \\frac{d}{dx}\\left(\\frac{dy}{dx}\\right) = f''(x)$$`,
    keyTakeaways: [
      'The Chain Rule states: dy/dx = (dy/du) * (du/dx).',
      'In implicit differentiation, differentiating y^n yields n * y^(n-1) * (dy/dx).',
      'The derivative of sin(u) is cos(u) * (du/dx); cos(u) is -sin(u) * (du/dx).',
      'The second derivative d^2y/dx^2 measures curvature and concavity.'
    ],
    associatedQuizId: 'fmath-ss2-chain-implicit-quiz'
  },

  // ==========================================
  // WEEK 5: APPLICATIONS OF DIFFERENTIATION
  // ==========================================
  {
    id: 'fmath-ss2-term2-week5',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Applications of Differentiation: Tangents, Normals & Rates of Change',
    subtopics: [
      'Geometric Gradient of Curves: m = dy/dx at Point (x₁, y₁)',
      'Equations of Tangent Lines: y - y₁ = m(x - x₁)',
      'Equations of Normal Lines (Perpendicular Gradient m_n = -1/m)',
      'Connected Rates of Change, Velocity, and Acceleration Models'
    ],
    readingTimeMinutes: 9,
    summary: 'Calculate gradients of curves, construct equations of tangents and normal lines, analyze rates of change, and evaluate rectilinear kinematics (displacement, velocity, acceleration).',
    contentMarkdown: `### 1. Gradients of Tangents and Normals

For any differentiable curve $y = f(x)$:
- The gradient of the **tangent** at the point $P(x_1, y_1)$ is:
  $$m_t = \\left. \\frac{dy}{dx} \\right|_{(x_1, y_1)}$$
- The **normal** is the straight line perpendicular to the tangent at the point of contact. Since $m_t \\cdot m_n = -1$:
  $$m_n = -\\frac{1}{m_t} = -\\frac{1}{\\left. \\frac{dy}{dx} \\right|_{(x_1, y_1)}}$$

### 2. Line Equations

Using the point-slope form:
- **Equation of Tangent:** $y - y_1 = m_t(x - x_1)$
- **Equation of Normal:** $y - y_1 = -\\frac{1}{m_t}(x - x_1)$

**Worked Example:** Find the equations of the tangent and normal to the parabola $y = x^2 - 4x + 3$ at the point where $x = 3$.
1. Find $y_1$: $y(3) = 3^2 - 4(3) + 3 = 9 - 12 + 3 = 0$. Point is $(3, 0)$.
2. Differentiate: $\\frac{dy}{dx} = 2x - 4$.
3. Evaluate gradient at $x = 3$: $m_t = 2(3) - 4 = 2$.
4. **Tangent Line:** $y - 0 = 2(x - 3) \\implies y = 2x - 6$.
5. Gradient of Normal: $m_n = -\\frac{1}{2}$.
6. **Normal Line:** $y - 0 = -\\frac{1}{2}(x - 3) \\implies 2y = -x + 3 \\implies x + 2y - 3 = 0$.

### 3. Rectilinear Kinematics (Motion in a Line)

Let displacement be $s(t)$ as a function of time $t$:
- **Velocity ($v$):** Instantaneous rate of change of displacement:
  $$v = \\frac{ds}{dt}$$
- **Acceleration ($a$):** Instantaneous rate of change of velocity:
  $$a = \\frac{dv}{dt} = \\frac{d^2 s}{dt^2}$$
- **Instantaneous Rest:** Particle is momentarily at rest when $v = \\frac{ds}{dt} = 0$.`,
    keyTakeaways: [
      'The gradient of the tangent to y = f(x) at (x1, y1) is dy/dx.',
      'The normal is perpendicular to the tangent, with gradient mn = -1/mt.',
      'Velocity is the first derivative of displacement (v = ds/dt).',
      'Acceleration is the second derivative of displacement (a = d^2s/dt^2).'
    ],
    associatedQuizId: 'fmath-ss2-tangents-normals-quiz'
  },

  // ==========================================
  // WEEK 6: MID-TERM CALCULUS CLINIC: TURNING POINTS
  // ==========================================
  {
    id: 'fmath-ss2-term2-week6',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Mid-Term Calculus Clinic: Stationary Points, Maxima, Minima & Curve Sketching',
    subtopics: [
      'Definition of Stationary (Turning) Points where dy/dx = 0',
      'First Derivative Test (Sign Change of dy/dx)',
      'Second Derivative Test: Local Maximum (d²y/dx² < 0) vs. Local Minimum (d²y/dx² > 0)',
      'Points of Inflexion and Optimization Word Problems in Science and Engineering'
    ],
    readingTimeMinutes: 9,
    summary: 'Locate stationary turning points, classify local maxima and minima using the second derivative test, analyze points of inflexion, and solve real-world optimization problems.',
    contentMarkdown: `### 1. Nature of Stationary Points

[Diagram: further-math-differentiation-turning-points]

A **stationary (turning) point** on a smooth curve $y = f(x)$ occurs where the tangent line is horizontal:

$$\\frac{dy}{dx} = 0$$

### 2. The Second Derivative Test

To determine the nature of a stationary point at $x = x_0$ where $f'(x_0) = 0$:

| Second Derivative Value | Geometric Nature of Stationary Point | Concavity of Curve |
| :--- | :--- | :--- |
| **$\\frac{d^2 y}{dx^2} < 0$** | **Local Maximum** (Peak) | Concave Downward ($\\cap$) |
| **$\\frac{d^2 y}{dx^2} > 0$** | **Local Minimum** (Valley) | Concave Upward ($\\cup$) |
| **$\\frac{d^2 y}{dx^2} = 0$** | Test is **inconclusive** (Use First Derivative sign test; may be a Point of Inflexion). | Tangent crosses the curve. |

### 3. Comprehensive Worked WAEC Problem

**Problem:** Find and classify the turning points of the curve $y = 2x^3 - 9x^2 + 12x + 5$.
1. **Differentiate:** $\\frac{dy}{dx} = 6x^2 - 18x + 12$.
2. **Set $\\frac{dy}{dx} = 0$:**
   $$6(x^2 - 3x + 2) = 0 \\implies (x - 1)(x - 2) = 0$$
   Stationary points occur at $x = 1$ and $x = 2$.
3. **Find corresponding $y$-values:**
   - At $x = 1$: $y = 2(1)^3 - 9(1)^2 + 12(1) + 5 = 2 - 9 + 12 + 5 = 10$. Point is $(1, 10)$.
   - At $x = 2$: $y = 2(8) - 9(4) + 12(2) + 5 = 16 - 36 + 24 + 5 = 9$. Point is $(2, 9)$.
4. **Second Derivative Test:** $\\frac{d^2 y}{dx^2} = 12x - 18$.
   - At $x = 1$: $\\frac{d^2 y}{dx^2} = 12(1) - 18 = -6 < 0 \\implies \\mathbf{(1, 10) \\text{ is a Local Maximum}}$.
   - At $x = 2$: $\\frac{d^2 y}{dx^2} = 12(2) - 18 = +6 > 0 \\implies \\mathbf{(2, 9) \\text{ is a Local Minimum}}$.`,
    keyTakeaways: [
      'Stationary points occur strictly where dy/dx = 0.',
      'If d^2y/dx^2 < 0, the point is a local maximum (concave down).',
      'If d^2y/dx^2 > 0, the point is a local minimum (concave up).',
      'Optimization problems set the first derivative to zero and verify with the second derivative.'
    ],
    associatedQuizId: 'fmath-ss2-turning-points-quiz'
  },

  // ==========================================
  // WEEK 7: INTEGRATION I: INDEFINITE INTEGRALS
  // ==========================================
  {
    id: 'fmath-ss2-term2-week7',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Integration I: Indefinite Integrals, Anti-Derivatives & Standard Forms',
    subtopics: [
      'Concept of Integration as the Inverse Process of Differentiation (Anti-Derivative)',
      'The Arbitrary Constant of Integration (C) and Boundary Conditions',
      'Standard Power Rule for Integration: ∫ xⁿ dx = (xⁿ⁺¹)/(n + 1) + C (n ≠ -1)',
      'Integration of Trigonometric and Linear Composite Functions'
    ],
    readingTimeMinutes: 8,
    summary: 'Master indefinite integration as anti-differentiation, determine arbitrary constants of integration using boundary values, and integrate polynomial and trigonometric expressions.',
    contentMarkdown: `### 1. Integration as the Reverse of Differentiation

If $\\frac{d}{dx}[F(x)] = f(x)$, then the **indefinite integral** of $f(x)$ with respect to $x$ is:

$$\\int f(x) \\, dx = F(x) + C$$

Where:
- $\\int$ is the integral sign.
- $f(x)$ is the integrand.
- $C$ is the **constant of integration** (because the derivative of any constant is zero).

### 2. Standard Integration Formulas

| Integrand $f(x)$ | Indefinite Integral $\\int f(x) \\, dx$ | Restrictions |
| :--- | :--- | :--- |
| $k$ (constant) | $k x + C$ | - |
| $x^n$ | $\\frac{x^{n+1}}{n+1} + C$ | $n \\neq -1$ |
| $\\frac{1}{x}$ | $\\ln|x| + C$ | $x \\neq 0$ |
| $\\cos(x)$ | $\\sin(x) + C$ | - |
| $\\sin(x)$ | $-\\cos(x) + C$ | - |
| $\\sec^2(x)$ | $\\tan(x) + C$ | - |
| $e^x$ | $e^x + C$ | - |

### 3. Integrating Linear Composites: $(ax + b)^n$

$$\\int (ax + b)^n \\, dx = \\frac{(ax + b)^{n+1}}{a(n + 1)} + C \\quad (n \\neq -1)$$
$$\\int \\cos(ax + b) \\, dx = \\frac{1}{a} \\sin(ax + b) + C$$

- **Worked Example:** Evaluate $\\int (4x^3 - 6x + 5) \\, dx$.
  $$\\int 4x^3 \\, dx - \\int 6x \\, dx + \\int 5 \\, dx = 4\\left(\\frac{x^4}{4}\\right) - 6\\left(\\frac{x^2}{2}\\right) + 5x + C = x^4 - 3x^2 + 5x + C$$

### 4. Evaluating the Constant of Integration $C$

If a curve passes through a known boundary point $(x_0, y_0)$, $C$ can be uniquely determined:
- Given $\\frac{dy}{dx} = 3x^2 - 4x$, and curve passes through $(1, 5)$:
  $$y = \\int (3x^2 - 4x) \\, dx = x^3 - 2x^2 + C$$
  Plug in $(1, 5)$: $5 = (1)^3 - 2(1)^2 + C \\implies 5 = -1 + C \\implies C = 6$.
  $$\\text{Exact Curve Equation:} \\quad y = x^3 - 2x^2 + 6$$`,
    keyTakeaways: [
      'Integration is the reverse operation of differentiation.',
      'The power rule for integration adds 1 to the exponent and divides by the new exponent: x^(n+1)/(n+1).',
      'The integral of cos(x) is sin(x) + C; the integral of sin(x) is -cos(x) + C.',
      'Boundary conditions allow determination of the arbitrary constant C.'
    ],
    associatedQuizId: 'fmath-ss2-indefinite-integral-quiz'
  },

  // ==========================================
  // WEEK 8: INTEGRATION II: DEFINITE INTEGRALS & AREAS
  // ==========================================
  {
    id: 'fmath-ss2-term2-week8',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Integration II: Definite Integrals, Area Under Curves & Volumes of Revolution',
    subtopics: [
      'The Fundamental Theorem of Calculus: Evaluating ∫ₐᵇ f(x) dx = F(b) - F(a)',
      'Properties of Definite Integrals (Linearity, Additivity, Swapping Limits)',
      'Calculating the Area Enclosed Between a Curve and the x-axis',
      'Area Enclosed Between Two Curves and Volume of Revolution About the x-axis'
    ],
    readingTimeMinutes: 9,
    summary: 'Evaluate definite integrals using the Fundamental Theorem of Calculus, calculate plane geometric areas between curves and axes, and compute volumes of solids of revolution.',
    contentMarkdown: `### 1. The Fundamental Theorem of Calculus

If $f(x)$ is continuous on $[a, b]$ and $F'(x) = f(x)$:

$$\\int_{a}^{b} f(x) \\, dx = [F(x)]_{a}^{b} = F(b) - F(a)$$

*(Note: In definite integrals, the arbitrary constant $C$ cancels out: $(F(b) + C) - (F(a) + C) = F(b) - F(a)$).*

**Worked Example:** Evaluate $\\int_{1}^{3} (3x^2 - 2x + 1) \\, dx$.
$$F(x) = \\left[ x^3 - x^2 + x \\right]_{1}^{3}$$
$$F(3) = (3)^3 - (3)^2 + 3 = 27 - 9 + 3 = 21$$
$$F(1) = (1)^3 - (1)^2 + 1 = 1 - 1 + 1 = 1$$
$$\\int_{1}^{3} (3x^2 - 2x + 1) \\, dx = 21 - 1 = \\mathbf{20}$$

### 2. Area Under a Curve

The area $A$ enclosed between the curve $y = f(x)$, the $x$-axis, and the vertical lines $x = a$ and $x = b$ is:

$$A = \\int_{a}^{b} y \\, dx = \\int_{a}^{b} f(x) \\, dx$$

- **Area Below the $x$-axis:** If the curve lies beneath the $x$-axis ($y < 0$), the integral evaluates to a negative number. Because geometric area is positive, take the absolute value:
  $$A = \\left| \\int_{a}^{b} f(x) \\, dx \\right|$$

### 3. Area Between Two Curves

If $y_1 = f(x)$ lies above $y_2 = g(x)$ between $x = a$ and $x = b$:

$$A = \\int_{a}^{b} [f(x) - g(x)] \\, dx = \\int_{a}^{b} (y_{\\text{upper}} - y_{\\text{lower}}) \\, dx$$

### 4. Volume of Revolution About the $x$-axis

When the region bounded by $y = f(x)$, $x = a$, and $x = b$ is rotated through $360^\\circ$ ($2\\pi$ radians) about the $x$-axis, the volume $V$ of the solid generated is:

$$V = \\pi \\int_{a}^{b} y^2 \\, dx$$`,
    keyTakeaways: [
      'The Fundamental Theorem of Calculus evaluates definite integrals as F(b) - F(a).',
      'The area under a curve between x = a and x = b is given by the definite integral of y dx.',
      'Areas below the x-axis yield negative definite integrals and require absolute value signs.',
      'The volume of revolution rotated 360 degrees about the x-axis is V = pi * integral of y^2 dx.'
    ],
    associatedQuizId: 'fmath-ss2-definite-integral-area-quiz'
  },

  // ==========================================
  // WEEK 9: VECTORS IN TWO & THREE DIMENSIONS
  // ==========================================
  {
    id: 'fmath-ss2-term2-week9',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Vectors in 2D & 3D: Component Resolution, Modulus, Direction Cosines & Dot Product',
    subtopics: [
      'Representation of Vectors in 2D and 3D Cartesian Coordinates ($i, j, k$)',
      'Modulus (Magnitude) and Direction Cosines (cos α, cos β, cos γ)',
      'Scalar (Dot) Product: a · b = |a||b| cos θ = a₁b₁ + a₂b₂ + a₃b₃',
      'Orthogonality Condition (a · b = 0) and Angle Between Two Vectors'
    ],
    readingTimeMinutes: 9,
    summary: 'Master vectors in 2D and 3D space, calculate magnitudes and unit vectors, compute scalar (dot) products, and determine angles and orthogonality between vectors.',
    contentMarkdown: `### 1. Vector Notation & Magnitude

[Diagram: further-math-vectors-resolution]

In three-dimensional Cartesian space, a vector $\\mathbf{r}$ is expressed in terms of orthogonal unit vectors $\\mathbf{i}, \\mathbf{j}, \\mathbf{k}$ along the $x, y, z$ axes:

$$\\mathbf{r} = x\\mathbf{i} + y\\mathbf{j} + z\\mathbf{k} = \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix}$$

- **Magnitude (Modulus $|\\mathbf{r}|$):**
  $$|\\mathbf{r}| = \\sqrt{x^2 + y^2 + z^2}$$
- **Unit Vector ($\\hat{\\mathbf{r}}$):** A vector of unit length in the direction of $\\mathbf{r}$:
  $$\\hat{\\mathbf{r}} = \\frac{\\mathbf{r}}{|\\mathbf{r}|} = \\frac{x\\mathbf{i} + y\\mathbf{j} + z\\mathbf{k}}{\\sqrt{x^2 + y^2 + z^2}}$$

### 2. Direction Cosines

The angles $\\alpha, \\beta, \\gamma$ that vector $\\mathbf{r}$ makes with the positive $x, y, z$ axes satisfy:

$$\\cos \\alpha = \\frac{x}{|\\mathbf{r}|}, \\quad \\cos \\beta = \\frac{y}{|\\mathbf{r}|}, \\quad \\cos \\gamma = \\frac{z}{|\\mathbf{r}|}$$
$$\\cos^2 \\alpha + \\cos^2 \\beta + \\cos^2 \\gamma = 1$$

### 3. The Scalar (Dot) Product

The dot product of two vectors $\\mathbf{a} = a_1\\mathbf{i} + a_2\\mathbf{j} + a_3\\mathbf{k}$ and $\\mathbf{b} = b_1\\mathbf{i} + b_2\\mathbf{j} + b_3\\mathbf{k}$ is a **scalar**:

$$\\mathbf{a} \\cdot \\mathbf{b} = |\\mathbf{a}||\\mathbf{b}| \\cos \\theta = a_1 b_1 + a_2 b_2 + a_3 b_3$$

Where $\\theta$ is the angle between the two vectors:
$$\\cos \\theta = \\frac{\\mathbf{a} \\cdot \\mathbf{b}}{|\\mathbf{a}||\\mathbf{b}|} = \\frac{a_1 b_1 + a_2 b_2 + a_3 b_3}{\\sqrt{a_1^2 + a_2^2 + a_3^2} \\sqrt{b_1^2 + b_2^2 + b_3^2}}$$

### 4. Perpendicular & Parallel Conditions

- **Orthogonal (Perpendicular) Vectors:** Two non-zero vectors $\\mathbf{a}$ and $\\mathbf{b}$ are perpendicular if and only if:
  $$\\mathbf{a} \\cdot \\mathbf{b} = 0$$
- **Parallel Vectors:** $\\mathbf{a} = k \\mathbf{b}$ (components are proportional).`,
    keyTakeaways: [
      'The magnitude of vector r = xi + yj + zk is sqrt(x^2 + y^2 + z^2).',
      'The sum of the squares of the direction cosines equals 1: cos^2 a + cos^2 b + cos^2 c = 1.',
      'The dot product is a * b = |a||b| cos theta = a1b1 + a2b2 + a3b3.',
      'Two non-zero vectors are perpendicular if and only if their scalar dot product is zero.'
    ],
    associatedQuizId: 'fmath-ss2-vectors-3d-quiz'
  },

  // ==========================================
  // WEEK 10: STATICS: EQUILIBRIUM OF COPLANAR FORCES
  // ==========================================
  {
    id: 'fmath-ss2-term2-week10',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Statics: Resolution of Coplanar Forces, Lami’s Theorem & Moments in Equilibrium',
    subtopics: [
      'Resolution of Concurrent Coplanar Forces into Orthogonal Components',
      'Conditions of Equilibrium for Concurrent Forces: ΣFx = 0 and ΣFy = 0',
      'Triangle of Forces and Lami’s Theorem for Three Concurrent Forces in Equilibrium',
      'Principle of Moments: ΣM = 0 (Clockwise Moments = Anticlockwise Moments)'
    ],
    readingTimeMinutes: 9,
    summary: 'Analyze coplanar force systems, apply component resolution and Lami’s Theorem to 3-force equilibrium problems, and calculate support reactions using the Principle of Moments.',
    contentMarkdown: `### 1. Resolution of Coplanar Forces

When several forces act at a common point, each force $F_i$ inclined at angle $\\theta_i$ to the horizontal is resolved into orthogonal Cartesian components:

$$F_x = F \\cos \\theta, \\quad F_y = F \\sin \\theta$$

- **Resultant Force ($R$):**
  $$R_x = \\sum F_x, \\quad R_y = \\sum F_y$$
  $$|R| = \\sqrt{R_x^2 + R_y^2}, \\quad \\tan \\alpha = \\left| \\frac{R_y}{R_x} \\right|$$

### 2. Conditions for Equilibrium of a Rigid Body

For a body to be in complete mechanical equilibrium:
1. **Translational Equilibrium:** The vector sum of all external forces must be zero:
   $$\\sum F_x = 0 \\quad \\text{and} \\quad \\sum F_y = 0$$
2. **Rotational Equilibrium:** The algebraic sum of the moments of all forces about any point must be zero:
   $$\\sum M = 0 \\implies \\text{Sum of Clockwise Moments} = \\text{Sum of Anticlockwise Moments}$$

### 3. Lami’s Theorem

> **Lami's Theorem:** If three coplanar concurrent forces acting at a point are in static equilibrium, each force is directly proportional to the sine of the angle between the other two forces:

$$\\frac{P}{\\sin \\alpha} = \\frac{Q}{\\sin \\beta} = \\frac{R}{\\sin \\gamma}$$

Where:
- $\\alpha$ is the angle between forces $Q$ and $R$.
- $\\beta$ is the angle between forces $P$ and $R$.
- $\\gamma$ is the angle between forces $P$ and $Q$.

### 4. Worked WAEC Statics Problem

**Problem:** A mass of $12\\text{ kg}$ is suspended by two light strings making angles of $30^\\circ$ and $60^\\circ$ with a horizontal ceiling. Find the tension in each string (taking $g = 10\\text{ m/s}^2$).
- Weight $W = mg = 12 \\times 10 = 120\\text{ N}$ acting vertically downwards.
- By Lami's Theorem or resolving horizontally and vertically:
  $$\\sum F_x = T_1 \\cos 30^\\circ - T_2 \\cos 60^\\circ = 0 \\implies T_1 \\frac{\\sqrt{3}}{2} = T_2 \\frac{1}{2} \\implies T_2 = T_1 \\sqrt{3}$$
  $$\\sum F_y = T_1 \\sin 30^\\circ + T_2 \\sin 60^\\circ - 120 = 0$$
  $$T_1(0.5) + (T_1 \\sqrt{3})\\left(\\frac{\\sqrt{3}}{2}\\right) = 120 \\implies 0.5 T_1 + 1.5 T_1 = 120 \\implies 2 T_1 = 120$$
  $$T_1 = \\mathbf{60\\text{ N}}, \\quad T_2 = 60\\sqrt{3} \\approx \\mathbf{103.92\\text{ N}}$$`,
    keyTakeaways: [
      'Translational equilibrium requires both sum of Fx = 0 and sum of Fy = 0.',
      'Rotational equilibrium requires total clockwise moments to equal anticlockwise moments.',
      'Lami\'s Theorem states: P / sin a = Q / sin b = R / sin c for 3 forces in equilibrium.',
      'Forces are resolved using Fx = F cos theta and Fy = F sin theta.'
    ],
    associatedQuizId: 'fmath-ss2-statics-lamis-quiz'
  },

  // ==========================================
  // WEEK 11: DYNAMICS: PROJECTILES & UNIFORM ACCELERATION
  // ==========================================
  {
    id: 'fmath-ss2-term2-week11',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Dynamics: Rectilinear Acceleration, Newton’s Laws & Projectile Motion',
    subtopics: [
      'Newton’s Laws of Motion and Impulse-Momentum Equation (I = F Δt = Δp)',
      'Motion of Connected Particles Over Smooth Pulleys (Atwood Machine)',
      'Projectile Kinematics: Initial Velocity Components (u cos α, u sin α)',
      'Formulas for Time of Flight (T), Maximum Height (H), Horizontal Range (R), and Trajectory Equation'
    ],
    readingTimeMinutes: 9,
    summary: 'Analyze dynamics, apply Newton’s second law to connected masses over pulleys, and derive projectile trajectory, time of flight, maximum height, and horizontal range formulas.',
    contentMarkdown: `### 1. Newton’s Second Law & Connected Particles

Newton's Second Law states that resultant force equals the rate of change of momentum:

$$F = ma = m \\frac{dv}{dt}$$

- **Atwood Machine (Two masses $m_1 > m_2$ connected over a light pulley):**
  For $m_1$ accelerating downwards: $m_1 g - T = m_1 a$
  For $m_2$ accelerating upwards: $T - m_2 g = m_2 a$
  Adding equations: $(m_1 - m_2)g = (m_1 + m_2)a$
  $$a = \\frac{(m_1 - m_2)g}{m_1 + m_2}, \\quad T = \\frac{2m_1 m_2 g}{m_1 + m_2}$$

### 2. Projectile Motion Equations

A projectile launched with initial speed $u$ at angle $\\alpha$ to the horizontal experiences:
- Constant horizontal velocity: $u_x = u \\cos \\alpha$ ($a_x = 0$).
- Vertical motion under gravity: $u_y = u \\sin \\alpha$ ($a_y = -g$).

| Projectile Parameter | Mathematical Derivation Formula | Condition / Note |
| :--- | :--- | :--- |
| **Time to Maximum Height ($t$)** | $t = \\frac{u \\sin \\alpha}{g}$ | Vertical velocity $v_y = 0$ at peak. |
| **Total Time of Flight ($T$)** | $T = \\frac{2u \\sin \\alpha}{g}$ | Total time until returning to launch plane ($y = 0$). |
| **Maximum Height ($H$)** | $H = \\frac{u^2 \\sin^2 \\alpha}{2g}$ | Peak vertical displacement. |
| **Horizontal Range ($R$)** | $R = \\frac{u^2 \\sin(2\\alpha)}{g}$ | Maximum range occurs at launch angle $\\alpha = 45^\\circ$. |

### 3. The Parabolic Equation of Trajectory

Eliminating time $t$ from horizontal displacement $x = (u \\cos \\alpha)t$ and vertical displacement $y = (u \\sin \\alpha)t - \\frac{1}{2}gt^2$:

$$t = \\frac{x}{u \\cos \\alpha}$$
$$y = (u \\sin \\alpha)\\left(\\frac{x}{u \\cos \\alpha}\\right) - \\frac{1}{2}g\\left(\\frac{x}{u \\cos \\alpha}\\right)^2$$

$$y = x \\tan \\alpha - \\frac{g x^2}{2u^2 \\cos^2 \\alpha} = x \\tan \\alpha - \\frac{g x^2 (1 + \\tan^2 \\alpha)}{2u^2}$$

This proves that the path of any projectile in a uniform gravitational field neglecting air resistance is a **parabola**.`,
    keyTakeaways: [
      'In projectile motion, horizontal velocity (u cos a) is constant while vertical velocity is subject to gravity.',
      'Total time of flight is T = (2u sin a) / g.',
      'Maximum horizontal range R_max = u^2 / g occurs at an angle of 45 degrees.',
      'The trajectory equation is y = x tan a - (g x^2) / (2u^2 cos^2 a).'
    ],
    associatedQuizId: 'fmath-ss2-dynamics-projectiles-quiz'
  },

  // ==========================================
  // WEEK 12: EXAMINATION MASTERCLASS & PROBLEM CLINIC
  // ==========================================
  {
    id: 'fmath-ss2-term2-week12',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 12,
    topicTitle: 'Term Review, WAEC Further Mathematics Masterclass & Past Question Clinic',
    subtopics: [
      'Comprehensive Review of Matrices, Calculus, Vectors, and Mechanics',
      'Step-by-Step Breakdown of Multi-Step WAEC Further Mathematics Theory Questions',
      'Common Traps in Calculus and Vector Notation: Avoiding Computational Slip-ups',
      'Exam Hall Strategies: Time Management for Paper 1 (Objectives) and Paper 2 (Theory)'
    ],
    readingTimeMinutes: 9,
    summary: 'Consolidate Second Term Further Mathematics skills, review past WAEC question types across Pure Math, Statistics, and Mechanics, and refine mathematical presentation.',
    contentMarkdown: `### 1. Second Term Curriculum Architecture

This term mastered four core analytical pillars of advanced mathematics:
1. **Pure Linear Algebra (Weeks 1–2):** $2 \\times 2$ and $3 \\times 3$ matrices, determinants, adjoints, inverses, and Cramer's Rule.
2. **Differential Calculus (Weeks 3–6):** First principles, Product rule, Quotient rule, Chain rule, Implicit differentiation, Tangents/Normals, and Optimization turning points.
3. **Integral Calculus (Weeks 7–8):** Anti-derivatives, boundary condition integration constants ($C$), Definite integrals, and Areas under curves.
4. **Vectors & Mechanics (Weeks 9–11):** 3D vectors ($i, j, k$), Dot products, Coplanar statics (Lami's Theorem), and Projectile kinematics.

### 2. High-Yield WAEC Examination Problem Breakdown

**Problem:** A curve has the equation $y = x^3 - 3x^2 - 9x + 2$.
1. Find the coordinates of the turning points.
2. Determine their nature using the second derivative test.
3. Calculate the area enclosed by the curve, the $x$-axis, and the lines $x = 0$ to $x = 2$.

**Solution Walkthrough:**
- $\\frac{dy}{dx} = 3x^2 - 6x - 9 = 3(x^2 - 2x - 3) = 3(x - 3)(x + 1)$.
- Stationary points at $x = 3$ and $x = -1$.
  - At $x = -1$: $y = (-1)^3 - 3(-1)^2 - 9(-1) + 2 = -1 - 3 + 9 + 2 = 7 \\implies \\mathbf{(-1, 7)}$.
  - At $x = 3$: $y = (3)^3 - 3(3)^2 - 9(3) + 2 = 27 - 27 - 27 + 2 = -25 \\implies \\mathbf{(3, -25)}$.
- Second derivative: $\\frac{d^2 y}{dx^2} = 6x - 6$.
  - At $x = -1$: $\\frac{d^2 y}{dx^2} = -6 - 6 = -12 < 0 \\implies \\mathbf{(-1, 7) \\text{ is a Maximum}}$.
  - At $x = 3$: $\\frac{d^2 y}{dx^2} = 18 - 6 = +12 > 0 \\implies \\mathbf{(3, -25) \\text{ is a Minimum}}$.
- Area: $\\int_{0}^{2} (x^3 - 3x^2 - 9x + 2) \\, dx = \\left[ \\frac{x^4}{4} - x^3 - \\frac{9x^2}{2} + 2x \\right]_{0}^{2}$
  $$= \\left( \\frac{16}{4} - 8 - \\frac{9(4)}{2} + 4 \\right) - (0) = 4 - 8 - 18 + 4 = -18$$
  Since the curve is below the $x$-axis in this interval, the geometric area is:
  $$\\text{Area} = |-18| = \\mathbf{18\\text{ square units}}$$

### 3. Exam Success Principles

- Always write out the formula before substituting values.
- In vector questions, always underline vector symbols (e.g. $\\underline{u}$) or include arrows to indicate vector character.
- Verify that angles are in the correct mode (radians vs. degrees) when computing trigonometric derivatives.`,
    keyTakeaways: [
      'Further Mathematics demands clear derivation steps and explicit formula citations.',
      'Stationary points require testing both first and second derivatives.',
      'Definite integrals yielding negative values require taking the absolute magnitude for area.',
      'Vectors must always be denoted with proper directional notation.'
    ],
    associatedQuizId: 'fmath-ss2-final-exam-quiz'
  }
];
