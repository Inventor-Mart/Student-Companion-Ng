import { CurriculumTopic } from '../types';

export const SS1_FURTHER_MATH_TOPICS: CurriculumTopic[] = [
  // ==========================================
  // WEEK 1: INDICES, LOGARITHMS & EXPONENTIAL EQUATIONS
  // ==========================================
  {
    id: 'fm-ss1-term2-week1',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Indices, Logarithms & Advanced Exponential Equations',
    subtopics: [
      'Fundamental Laws of Indices and Fractional Powers',
      'Logarithm Laws and the Change of Base Rule',
      'Solving Indicial Equations by Quadratic Substitution',
      'Logarithmic Equations with Differing Bases'
    ],
    readingTimeMinutes: 8,
    summary: 'Master operational laws of indices and logarithms, solve higher-order exponential equations using substitution, and apply change-of-base theorems in rigorous mathematical proofs.',
    contentMarkdown: `### 1. Fundamental Laws of Indices and Logarithms

In Further Mathematics, algebraic manipulation of powers and logarithms requires flawless mastery of core identity theorems.

| Operational Law | Exponential Formulation | Logarithmic Formulation ($b > 0, b \\neq 1$) |
| :--- | :--- | :--- |
| **Product Rule** | $a^m \\times a^n = a^{m+n}$ | $\\log_b(xy) = \\log_b(x) + \\log_b(y)$ |
| **Quotient Rule** | $a^m \\div a^n = a^{m-n}$ | $\\log_b(x / y) = \\log_b(x) - \\log_b(y)$ |
| **Power Rule** | $(a^m)^n = a^{mn}$ | $\\log_b(x^k) = k \\log_b(x)$ |
| **Zero & Inverse** | $a^0 = 1,\\quad a^{-n} = 1 / a^n$ | $\\log_b(1) = 0,\\quad \\log_b(b) = 1$ |
| **Fractional Index** | $a^{m/n} = \\sqrt[n]{a^m} = (\\sqrt[n]{a})^m$ | $\\log_b(\\sqrt[n]{x}) = \\frac{1}{n} \\log_b(x)$ |
| **Change of Base** | N/A | $\\log_b(a) = \\frac{\\log_c(a)}{\\log_c(b)} = \\frac{1}{\\log_a(b)}$ |

---

### 2. Solving Exponential Equations via Quadratic Substitution

When an exponential term appears as both a base power and its square, substitute a dummy variable (such as $y = a^x$) to reduce the equation to a standard quadratic:

$$\\text{Solve: } 2^{2x+1} - 9(2^x) + 4 = 0$$

- **Step 1: Decompose exponents**:
  $$2^{2x} \\cdot 2^1 - 9(2^x) + 4 = 0 \\implies 2(2^x)^2 - 9(2^x) + 4 = 0$$
- **Step 2: Let $y = 2^x$**:
  $$2y^2 - 9y + 4 = 0$$
- **Step 3: Factorize quadratic**:
  $$(2y - 1)(y - 4) = 0 \\implies y = \\frac{1}{2} \\quad \\text{or} \\quad y = 4$$
- **Step 4: Back-substitute $y = 2^x$**:
  - If $2^x = \\frac{1}{2} = 2^{-1} \\implies x = -1$
  - If $2^x = 4 = 2^2 \\implies x = 2$
  - **Solution Set**: $x \\in \\{-1, 2\\}$.

---

### 3. Logarithmic Equations with Distinct Bases

To solve $\\log_2(x) + 4\\log_x(2) = 5$:
1. Apply the reciprocal change of base rule: $\\log_x(2) = \\frac{1}{\\log_2(x)}$.
2. Let $u = \\log_2(x)$:
   $$u + \\frac{4}{u} = 5 \\implies u^2 - 5u + 4 = 0$$
3. Factoring yields $(u - 1)(u - 4) = 0 \\implies u = 1$ or $u = 4$.
4. Back-substitute:
   - $\\log_2(x) = 1 \\implies x = 2^1 = 2$
   - $\\log_2(x) = 4 \\implies x = 2^4 = 16$.

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: Solve for $x$ in the equation $3^{2x} - 10(3^x) + 9 = 0$.
  - A) $x = 1$ or $x = 9$
  - B) $x = 0$ or $x = 2$ (*Correct — letting $y = 3^x$ gives $y=1$ or $y=9$, so $3^x=1 \\implies x=0$ and $3^x=9 \\implies x=2$*)
  - C) $x = -1$ or $x = 2$
  - D) $x = 3$ or $x = 6$
- **Question 2**: If $\\log_{10}(2) = 0.3010$ and $\\log_{10}(3) = 0.4771$, what is the exact value of $\\log_{10}(15)$?
  - A) $0.7781$
  - B) $1.1761$ (*Correct — $\\log_{10}(15) = \\log_{10}(30/2) = \\log_{10}(3) + 1 - \\log_{10}(2) = 0.4771 + 1 - 0.3010 = 1.1761$*)
  - C) $0.1761$
  - D) $1.4771$`,
    keyTakeaways: [
      'Indicial equations of the form $a^{2x} + k a^x + c = 0$ reduce to quadratics under $y = a^x$.',
      'The change-of-base rule states $\\log_b(a) = \\frac{\\log_c(a)}{\\log_c(b)}$ and $\\log_b(a) = \\frac{1}{\\log_a(b)}$.',
      'Always test for extraneous non-positive arguments in logarithmic equations since $\\log_b(x)$ requires $x > 0$.'
    ],
    associatedQuizId: 'waec-further-math-indices-2025'
  },

  // ==========================================
  // WEEK 2: SURDS & RADICAL OPERATIONS
  // ==========================================
  {
    id: 'fm-ss1-term2-week2',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Surds: Rationalization & Conjugate Binomial Operations',
    subtopics: [
      'Definition of Surds and Basic vs. Compound Radicals',
      'Rules of Surds: Multiplication and Division',
      'Conjugate Binomial Surds and Rationalization of Denominators',
      'Equating Rational and Irrational Parts to Find Square Roots of Surds'
    ],
    readingTimeMinutes: 8,
    summary: 'Simplify compound radical expressions, eliminate irrational denominators using conjugate surds, and solve square root equations of the form sqrt(a + sqrt(b)).',
    contentMarkdown: `### 1. Surd Fundamentals & Classification

A **surd** is an irrational number expressed in root form whose exact value cannot be represented as a terminating or repeating decimal (e.g. $\\sqrt{2}, \\sqrt{3}, \\sqrt{5}, \\sqrt[3]{7}$).

| Surd Category | Algebraic Definition | Concrete Mathematical Example |
| :--- | :--- | :--- |
| **Monomial Surd** | A single radical term with rational coefficient. | $3\\sqrt{5},\\quad -2\\sqrt{7}$ |
| **Binomial Surd** | The algebraic sum or difference of two terms where at least one is a surd. | $4 + \\sqrt{3},\\quad 2\\sqrt{5} - 3\\sqrt{2}$ |
| **Similar Surds** | Surds that simplify to the exact same irrational radicand. | $\\sqrt{18} = 3\\sqrt{2}$ and $\\sqrt{50} = 5\\sqrt{2}$ |
| **Conjugate Surd** | A binomial surd formed by reversing the sign between the two terms. | Conjugate of $(a + \\sqrt{b})$ is $(a - \\sqrt{b})$ |

---

### 2. Rationalization of Binomial Denominators

To rationalize a fraction with a binomial denominator, multiply numerator and denominator by the denominator's **conjugate**, exploiting the difference of two squares identity:

$$(a + \\sqrt{b})(a - \\sqrt{b}) = a^2 - (\\sqrt{b})^2 = a^2 - b$$

$$\\text{Simplify: } \\frac{3\\sqrt{2} - 1}{2\\sqrt{2} + 3}$$

1. Multiply by conjugate of denominator $(2\\sqrt{2} - 3)$:
   $$\\frac{(3\\sqrt{2} - 1)(2\\sqrt{2} - 3)}{(2\\sqrt{2} + 3)(2\\sqrt{2} - 3)}$$
2. Expand denominator:
   $$(2\\sqrt{2})^2 - (3)^2 = 8 - 9 = -1$$
3. Expand numerator:
   $$(3\\sqrt{2})(2\\sqrt{2}) - 9\\sqrt{2} - 2\\sqrt{2} + 3 = 12 - 11\\sqrt{2} + 3 = 15 - 11\\sqrt{2}$$
4. Final simplified form:
   $$\\frac{15 - 11\\sqrt{2}}{-1} = 11\\sqrt{2} - 15$$

---

### 3. Finding the Square Root of a Surd

To find $\\sqrt{7 + 4\\sqrt{3}}$, assume:
$$\\sqrt{7 + 4\\sqrt{3}} = \\sqrt{x} + \\sqrt{y}$$
Square both sides:
$$7 + 4\\sqrt{3} = x + y + 2\\sqrt{xy}$$
Equating rational and irrational components:
- Rational: $x + y = 7$
- Irrational: $2\\sqrt{xy} = 4\\sqrt{3} \\implies \\sqrt{xy} = 2\\sqrt{3} \\implies xy = 12$

Solving $x + y = 7$ and $xy = 12$ gives factors $4$ and $3$:
$$\\sqrt{7 + 4\\sqrt{3}} = \\sqrt{4} + \\sqrt{3} = 2 + \\sqrt{3}$$

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: Express $\\frac{\\sqrt{5} + \\sqrt{3}}{\\sqrt{5} - \\sqrt{3}}$ in the form $a + \\sqrt{b}$.
  - A) $4 + \\sqrt{15}$ (*Correct — multiplying by $(\\sqrt{5}+\\sqrt{3})/(\\sqrt{5}+\\sqrt{3})$ gives $(8 + 2\\sqrt{15})/2 = 4 + \\sqrt{15}$*)
  - B) $8 + 2\\sqrt{15}$
  - C) $4 + 2\\sqrt{15}$
  - D) $2 + \\sqrt{15}$
- **Question 2**: What is the positive square root of $14 - 6\\sqrt{5}$?
  - A) $3 - \\sqrt{5}$ (*Correct — $(3 - \\sqrt{5})^2 = 9 - 6\\sqrt{5} + 5 = 14 - 6\\sqrt{5}$*)
  - B) $3 + \\sqrt{5}$
  - C) $\\sqrt{5} - 3$
  - D) $2 - \\sqrt{5}$`,
    keyTakeaways: [
      'The product of a binomial surd and its conjugate $(a+\\sqrt{b})(a-\\sqrt{b}) = a^2 - b$ is always strictly rational.',
      'To evaluate $\\sqrt{A + \\sqrt{B}}$, set it equal to $\\sqrt{x} + \\sqrt{y}$ and equate rational ($x+y=A$) and irrational parts.',
      'Never leave a radical in the denominator of a final WAEC examination answer.'
    ],
    associatedQuizId: 'waec-further-math-surds-2025'
  },

  // ==========================================
  // WEEK 3: POLYNOMIALS I: ALGEBRA & LONG DIVISION
  // ==========================================
  {
    id: 'fm-ss1-term2-week3',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Polynomials I: Degree, Operations & Long Division Algorithm',
    subtopics: [
      'Definition, Degree, and Leading Coefficients of Polynomials',
      'Polynomial Arithmetic: Addition, Subtraction, and Expansion',
      'The Division Algorithm for Polynomials: P(x) = D(x)Q(x) + R(x)',
      'Synthetic Division as a Rapid Computational Method'
    ],
    readingTimeMinutes: 7,
    summary: 'Define polynomial functions, execute formal algebraic operations, and implement long division and synthetic division to determine quotients and remainders.',
    contentMarkdown: `### 1. Structure of Polynomial Functions

A real polynomial $P(x)$ of degree $n$ is defined as:
$$P(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0, \\quad a_n \\neq 0$$
- $n$: **Degree** of the polynomial (highest exponent of $x$).
- $a_n$: **Leading coefficient**.
- $a_0$: **Constant term**.

| Degree $n$ | Polynomial Type | Standard General Form | Example |
| :--- | :--- | :--- | :--- |
| **1** | Linear | $P(x) = ax + b$ | $3x - 7$ |
| **2** | Quadratic | $P(x) = ax^2 + bx + c$ | $2x^2 + 5x - 3$ |
| **3** | Cubic | $P(x) = ax^3 + bx^2 + cx + d$ | $x^3 - 4x^2 + x + 6$ |
| **4** | Quartic | $P(x) = ax^4 + bx^3 + cx^2 + dx + e$ | $2x^4 - 3x^2 + 1$ |

---

### 2. The Division Algorithm

For any polynomial dividend $P(x)$ and non-zero divisor $D(x)$, there exist unique polynomials $Q(x)$ (quotient) and $R(x)$ (remainder) such that:
$$P(x) = D(x) \\cdot Q(x) + R(x)$$
where $\\text{deg}(R) < \\text{deg}(D)$ or $R(x) = 0$. If $D(x)$ is linear $(x - c)$, then the remainder $R$ is a constant number.

$$\\text{Divide } P(x) = 2x^3 - 5x^2 + 4x - 6 \\quad \\text{by } D(x) = x - 2$$

- **Step 1**: Divide leading terms: $\\frac{2x^3}{x} = 2x^2$. Multiply: $2x^2(x - 2) = 2x^3 - 4x^2$.
- **Step 2**: Subtract: $(2x^3 - 5x^2) - (2x^3 - 4x^2) = -x^2$. Bring down $+4x$.
- **Step 3**: Divide: $\\frac{-x^2}{x} = -x$. Multiply: $-x(x - 2) = -x^2 + 2x$.
- **Step 4**: Subtract: $(-x^2 + 4x) - (-x^2 + 2x) = 2x$. Bring down $-6$.
- **Step 5**: Divide: $\\frac{2x}{x} = +2$. Multiply: $2(x - 2) = 2x - 4$.
- **Step 6**: Subtract: $(2x - 6) - (2x - 4) = -2$.

**Result**: Quotient $Q(x) = 2x^2 - x + 2$, Remainder $R = -2$.

---

### 3. WAEC Checkpoint Practice Questions

- **Question 1**: When $2x^3 - 3x^2 + ax - 4$ is divided by $(x - 1)$, the quotient is $2x^2 - x + 3$ and remainder is $-1$. What is the value of $a$?
  - A) $a = 2$
  - B) $a = 4$ (*Correct — by polynomial identity $P(x) = (x - 1)(2x^2 - x + 3) - 1 = 2x^3 - 3x^2 + 4x - 4$, equating coefficients yields $a = 4$*)
  - C) $a = -2$
  - D) $a = 5$
- **Question 2**: What is the degree of the remainder when a degree 4 polynomial is divided by a quadratic polynomial ($x^2 - 3x + 2$)?
  - A) At most degree 1 (linear or constant) (*Correct — remainder degree is strictly less than divisor degree*)
  - B) Degree 2
  - C) Degree 3
  - D) Exactly degree 0`,
    keyTakeaways: [
      'The division identity $P(x) = D(x)Q(x) + R(x)$ holds universally for all real polynomials.',
      'The degree of the remainder $R(x)$ must be strictly less than the degree of the divisor $D(x)$.',
      'Synthetic division is an efficient alternative when dividing by monic linear divisors of the form $(x - c)$.'
    ],
    associatedQuizId: 'waec-further-math-polynomials-2025'
  },

  // ==========================================
  // WEEK 4: POLYNOMIALS II: REMAINDER & FACTOR THEOREMS
  // ==========================================
  {
    id: 'fm-ss1-term2-week4',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Polynomials II: Remainder & Factor Theorems and Cubic Factorization',
    subtopics: [
      'The Remainder Theorem: R = P(c) and R = P(-b/a)',
      'The Factor Theorem: (x - c) is a Factor iff P(c) = 0',
      'Complete Factorization of Cubic Polynomials',
      'Solving Cubic Equations P(x) = 0'
    ],
    readingTimeMinutes: 8,
    summary: 'Apply the remainder theorem to find residues without division, utilize the factor theorem to test roots, and completely factorize cubic equations into linear factors.',
    contentMarkdown: `### 1. The Remainder & Factor Theorems

The Remainder Theorem provides an instantaneous algebraic pathway to evaluate division remainders without performing lengthy polynomial long division.

| Theorem | Formal Statement | Algebraic Implication |
| :--- | :--- | :--- |
| **Remainder Theorem** | When polynomial $P(x)$ is divided by linear divisor $(ax - b)$, the remainder is $R = P(b/a)$. | If divisor is $(x - c)$, then $R = P(c)$. If divisor is $(x + c)$, then $R = P(-c)$. |
| **Factor Theorem** | A linear expression $(x - c)$ is a factor of $P(x)$ if and only if $P(c) = 0$. | $P(c) = 0 \\iff (x - c)$ divides $P(x)$ with zero remainder; $c$ is a root of $P(x) = 0$. |

---

### 2. Worked Problem: Solving for Unknown Coefficients

$$\\text{Given: } P(x) = 2x^3 + px^2 + qx - 6$$
When divided by $(x - 1)$, the remainder is $0$ (i.e. $(x - 1)$ is a factor). When divided by $(x + 2)$, the remainder is $-18$. Find $p$ and $q$.

1. **Use Factor Condition**: $P(1) = 0$
   $$2(1)^3 + p(1)^2 + q(1) - 6 = 0 \\implies p + q - 4 = 0 \\implies p + q = 4 \\quad \\text{--- (Eq. 1)}$$
2. **Use Remainder Condition**: $P(-2) = -18$
   $$2(-2)^3 + p(-2)^2 + q(-2) - 6 = -18$$
   $$-16 + 4p - 2q - 6 = -18 \\implies 4p - 2q - 22 = -18 \\implies 4p - 2q = 4 \\implies 2p - q = 2 \\quad \\text{--- (Eq. 2)}$$
3. **Solve Simultaneously**:
   Add (Eq. 1) and (Eq. 2):
   $$(p + q) + (2p - q) = 4 + 2 \\implies 3p = 6 \\implies p = 2$$
   Substitute $p = 2$ into (Eq. 1):
   $$2 + q = 4 \\implies q = 2$$

---

### 3. Complete Factorization of Cubic Polynomials

To completely factorize $P(x) = x^3 - 6x^2 + 11x - 6$:
1. Test integer factors of constant term $-6$: factors are $\\pm 1, \\pm 2, \\pm 3, \\pm 6$.
2. Test $x = 1$: $P(1) = 1 - 6 + 11 - 6 = 0$. Therefore, $(x - 1)$ is a factor!
3. Divide $P(x)$ by $(x - 1)$ using long division:
   $$\\frac{x^3 - 6x^2 + 11x - 6}{x - 1} = x^2 - 5x + 6$$
4. Factorize the quadratic quotient:
   $$x^2 - 5x + 6 = (x - 2)(x - 3)$$
5. **Complete Factorization**:
   $$P(x) = (x - 1)(x - 2)(x - 3)$$

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: What is the remainder when $f(x) = 3x^3 - 2x^2 + 5x - 7$ is divided by $(x + 2)$?
  - A) $-33$
  - B) $-49$ (*Correct — $f(-2) = 3(-8) - 2(4) + 5(-2) - 7 = -24 - 8 - 10 - 7 = -49$*)
  - C) $-21$
  - D) $15$
- **Question 2**: If $(2x - 1)$ is a factor of $2x^3 - 5x^2 + kx - 1$, find the value of $k$.
  - A) $k = 4$ (*Correct — $f(1/2) = 2(1/8) - 5(1/4) + k(1/2) - 1 = 0 \\implies 1/4 - 5/4 + k/2 - 1 = 0 \\implies -2 + k/2 = 0 \\implies k = 4$*)
  - B) $k = -4$
  - C) $k = 2$
  - D) $k = 8$`,
    keyTakeaways: [
      'The Remainder Theorem computes $R = P(c)$ directly without polynomial division.',
      'A linear binomial $(x - c)$ is a factor if and only if $P(c) = 0$.',
      'To factorize a cubic, find the first linear factor by trial, then divide to produce a quadratic factor.'
    ],
    associatedQuizId: 'waec-further-math-factor-thm-2025'
  },

  // ==========================================
  // WEEK 5: THEORY OF QUADRATIC ROOTS
  // ==========================================
  {
    id: 'fm-ss1-term2-week5',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Theory of Quadratic Equations & Symmetric Functions of Roots',
    subtopics: [
      'Sum and Product of Roots: alpha + beta = -b/a and alpha * beta = c/a',
      'Evaluation of Symmetric Functions: alpha^2 + beta^2, alpha^3 + beta^3, 1/alpha + 1/beta',
      'Constructing New Quadratic Equations with Modified Roots',
      'Nature of Roots & The Discriminant Delta = b^2 - 4ac'
    ],
    readingTimeMinutes: 9,
    summary: 'Master the Vieta relationships for quadratic roots, evaluate symmetric functions of alpha and beta, and construct new quadratic equations from transformed roots.',
    contentMarkdown: `### 1. Vieta Relations for Quadratic Equations

For any quadratic equation $ax^2 + bx + c = 0$ ($a \\neq 0$) with roots $\\alpha$ and $\\beta$:

$$\\alpha + \\beta = -\\frac{b}{a}, \\qquad \\alpha\\beta = \\frac{c}{a}$$

The quadratic equation can always be reconstructed from its roots as:
$$x^2 - (\\text{Sum of Roots})x + (\\text{Product of Roots}) = 0$$

[Diagram: further-math-quadratic-roots-parabola]

---

### 2. Master Table of Symmetric Functions of Roots

Any symmetric expression in $\\alpha$ and $\\beta$ can be rewritten solely in terms of the fundamental sum $S = (\\alpha + \\beta)$ and product $P = (\\alpha\\beta)$:

| Symmetric Expression | Expansion in Terms of Sum ($S$) and Product ($P$) | Derivation Identity |
| :--- | :--- | :--- |
| **Sum of Reciprocals** | $\\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{\\alpha + \\beta}{\\alpha\\beta} = \\frac{S}{P}$ | Common denominator $\\alpha\\beta$ |
| **Sum of Squares** | $\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = S^2 - 2P$ | From $(\\alpha + \\beta)^2 = \\alpha^2 + 2\\alpha\\beta + \\beta^2$ |
| **Difference of Roots** | $(\\alpha - \\beta)^2 = (\\alpha + \\beta)^2 - 4\\alpha\\beta = S^2 - 4P$ | $(\\alpha - \\beta) = \\pm\\sqrt{S^2 - 4P}$ |
| **Sum of Cubes** | $\\alpha^3 + \\beta^3 = (\\alpha + \\beta)(\\alpha^2 - \\alpha\\beta + \\beta^2) = S(S^2 - 3P)$ | Factoring sum of cubes |
| **Reciprocal Squares** | $\\frac{1}{\\alpha^2} + \\frac{1}{\\beta^2} = \\frac{\\alpha^2 + \\beta^2}{(\\alpha\\beta)^2} = \\frac{S^2 - 2P}{P^2}$ | Common denominator $(\\alpha\\beta)^2$ |

---

### 3. Constructing New Quadratic Equations

$$\\text{If } \\alpha \\text{ and } \\beta \\text{ are roots of } 2x^2 - 5x + 1 = 0, \\text{ form an equation with roots } \\frac{1}{\\alpha^2} \\text{ and } \\frac{1}{\\beta^2}.$$

- **Step 1: Compute base sum and product**:
  $$\\alpha + \\beta = -\\frac{-5}{2} = \\frac{5}{2}, \\qquad \\alpha\\beta = \\frac{1}{2}$$
- **Step 2: New sum of roots**:
  $$S_{\\text{new}} = \\frac{1}{\\alpha^2} + \\frac{1}{\\beta^2} = \\frac{(\\alpha+\\beta)^2 - 2\\alpha\\beta}{(\\alpha\\beta)^2} = \\frac{(5/2)^2 - 2(1/2)}{(1/2)^2} = \\frac{25/4 - 1}{1/4} = \\frac{21/4}{1/4} = 21$$
- **Step 3: New product of roots**:
  $$P_{\\text{new}} = \\frac{1}{\\alpha^2} \\cdot \\frac{1}{\\beta^2} = \\frac{1}{(\\alpha\\beta)^2} = \\frac{1}{(1/2)^2} = 4$$
- **Step 4: Form the quadratic equation**:
  $$x^2 - S_{\\text{new}} x + P_{\\text{new}} = 0 \\implies x^2 - 21x + 4 = 0$$

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: The roots of $3x^2 - 7x + 2 = 0$ are $\\alpha$ and $\\beta$. What is the numerical value of $\\alpha^2 + \\beta^2$?
  - A) $49/9$
  - B) $37/9$ (*Correct — $(\\alpha+\\beta)^2 - 2\\alpha\\beta = (7/3)^2 - 2(2/3) = 49/9 - 12/9 = 37/9$*)
  - C) $25/9$
  - D) $61/9$
- **Question 2**: For what values of $k$ does the equation $x^2 + (k - 2)x + 9 = 0$ have equal real roots?
  - A) $k = 4$ or $k = -4$
  - B) $k = 8$ or $k = -4$ (*Correct — $\\Delta = (k - 2)^2 - 4(1)(9) = 0 \\implies (k - 2)^2 = 36 \\implies k - 2 = \\pm 6 \\implies k = 8$ or $k = -4$*)
  - C) $k = 6$ or $k = -6$
  - D) $k = 10$ or $k = -2$`,
    keyTakeaways: [
      'Vieta identities give $\\alpha + \\beta = -b/a$ and $\\alpha\\beta = c/a$.',
      'The identity $\\alpha^2 + \\beta^2 = (\\alpha+\\beta)^2 - 2\\alpha\\beta$ is fundamental in forming transformed equations.',
      'Equal roots occur when discriminant $\\Delta = b^2 - 4ac = 0$; distinct real roots require $\\Delta > 0$.'
    ],
    associatedQuizId: 'waec-further-math-quadratic-roots-2025'
  },

  // ==========================================
  // WEEK 6: LOGICAL REASONING: TRUTH TABLES & ARGUMENTS
  // ==========================================
  {
    id: 'fm-ss1-term2-week6',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Mathematical Logic: Connectives, Truth Tables & Valid Arguments',
    subtopics: [
      'Propositions and Logical Connectives: Conjunction, Disjunction, Negation',
      'The Conditional (P => Q) and Biconditional (P <=> Q)',
      'Converse, Inverse, and Contrapositive Equivalence',
      'Tautologies, Contradictions, and Rule of Inference'
    ],
    readingTimeMinutes: 8,
    summary: 'Analyze formal propositions, construct rigorous truth tables for compound statements, and demonstrate logical equivalence between a conditional and its contrapositive.',
    contentMarkdown: `### 1. Fundamental Logical Connectives

A **proposition** is a declarative statement that is either strictly True (T) or strictly False (F), but not both.

| Connective Name | Logical Symbol | Plain Language Meaning | Truth Condition |
| :--- | :--- | :--- | :--- |
| **Negation** | $\\sim P$ or $\\neg P$ | "NOT $P$" | Opposite truth value to $P$. |
| **Conjunction** | $P \\land Q$ | "$P$ AND $Q$" | True **only** when both $P$ and $Q$ are True. |
| **Disjunction** | $P \\lor Q$ | "$P$ OR $Q$" | False **only** when both $P$ and $Q$ are False. |
| **Conditional** | $P \\implies Q$ | "If $P$, then $Q$" | False **only** when hypothesis $P$ is True and conclusion $Q$ is False. |
| **Biconditional** | $P \\iff Q$ | "$P$ if and only if $Q$" | True when $P$ and $Q$ have the **same** truth value. |

[Diagram: further-math-logic-truth-venn]

---

### 2. Comprehensive Master Truth Table

| $P$ | $Q$ | $\\sim P$ | $\\sim Q$ | $P \\land Q$ | $P \\lor Q$ | $P \\implies Q$ | $Q \\implies P$ (Converse) | $\\sim Q \\implies \\sim P$ (Contrapositive) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **T** | **T** | F | F | **T** | **T** | **T** | **T** | **T** |
| **T** | **F** | F | T | **F** | **T** | **F** | **T** | **F** |
| **F** | **T** | T | F | **F** | **T** | **T** | **F** | **T** |
| **F** | **F** | T | T | **F** | **F** | **T** | **T** | **T** |

**Crucial WAEC Observation**:
Notice that columns $P \\implies Q$ and $\\sim Q \\implies \\sim P$ are completely identical:
$$(P \\implies Q) \\equiv (\\sim Q \\implies \\sim P)$$
Therefore, a conditional statement is **logically equivalent only to its Contrapositive**!

---

### 3. Tautology vs. Contradiction

- **Tautology**: A compound proposition that is always **True** under all possible truth valuations (e.g. $P \\lor \\sim P$).
- **Contradiction**: A compound proposition that is always **False** under all possible valuations (e.g. $P \\land \\sim P$).

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: What is the contrapositive of the statement: "If a triangle is equilateral, then it is equiangular"?
  - A) If a triangle is not equilateral, then it is not equiangular
  - B) If a triangle is not equiangular, then it is not equilateral (*Correct — contrapositive of $P \\implies Q$ is $\\sim Q \\implies \\sim P$*)
  - C) If a triangle is equiangular, then it is equilateral
  - D) A triangle is equilateral if and only if it is equiangular
- **Question 2**: Under what single condition is the conditional implication $P \\implies Q$ evaluated as False?
  - A) When $P$ is True and $Q$ is False (*Correct — a true premise cannot logically imply a false conclusion*)
  - B) When both $P$ and $Q$ are False
  - C) When $P$ is False and $Q$ is True
  - D) When both $P$ and $Q$ are True`,
    keyTakeaways: [
      'The conditional $P \\implies Q$ is false only when the antecedent $P$ is true and consequent $Q$ is false.',
      'A statement is logically equivalent strictly to its contrapositive: $(P \\implies Q) \\equiv (\\sim Q \\implies \\sim P)$.',
      'A tautology yields truth values of True across every row of its truth table column.'
    ],
    associatedQuizId: 'waec-further-math-logic-2025'
  },

  // ==========================================
  // WEEK 7: MID-TERM REVIEW & ADVANCED DIAGNOSTICS
  // ==========================================
  {
    id: 'fm-ss1-term2-week7',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Mid-Term Progress Review & Advanced Problem-Solving Diagnostic',
    subtopics: [
      'Comprehensive Review of Weeks 1 to 6 Core Concepts',
      'Multi-Step Exam Problems Combining Surds and Quadratic Theory',
      'Common Algebraic Pitfalls in WAEC Further Mathematics',
      'Diagnostic Speed and Precision Problem Drill'
    ],
    readingTimeMinutes: 7,
    summary: 'Consolidate core competencies across indices, surds, polynomial factorization, quadratic root theory, and symbolic logic through multi-step WAEC examination questions.',
    contentMarkdown: `### 1. Mid-Term Theoretical Summary

Weeks 1 through 6 established the core algebraic and logical foundations of Further Mathematics:

| Curriculum Domain | Master Formula / Theorem | Core Examination Trap to Avoid |
| :--- | :--- | :--- |
| **Indices & Logarithms** | $\\log_b(a) = \\frac{\\log_c(a)}{\\log_c(b)}$ | Never equate $\\log(x+y)$ to $\\log(x) + \\log(y)$. |
| **Surds & Radicals** | $(a+\\sqrt{b})(a-\\sqrt{b}) = a^2 - b$ | Ensure negative denominators are distributed cleanly: $(a-b)/(-1) = b-a$. |
| **Remainder & Factor Theorems** | $R = P(c), \\quad P(c)=0 \\iff (x-c) \\text{ is factor}$ | For $(2x-3)$, evaluate $P(+3/2)$, not $P(-3/2)$. |
| **Theory of Quadratic Roots** | $\\alpha^2 + \\beta^2 = (\\alpha+\\beta)^2 - 2\\alpha\\beta$ | Remember the minus sign in sum: $\\alpha+\\beta = -b/a$. |
| **Symbolic Logic** | $(P \\implies Q) \\equiv (\\sim Q \\implies \\sim P)$ | The converse $(Q \\implies P)$ is NOT logically equivalent to $P \\implies Q$. |

---

### 2. Multi-Step Diagnostic Worked Problem

$$\\text{If } \\alpha \\text{ and } \\beta \\text{ are roots of } x^2 - 4x + 2 = 0, \\text{ find the exact value of } \\frac{\\alpha}{\\beta} + \\frac{\\beta}{\\alpha}.$$

- **Step 1**: Find sum and product:
  $$\\alpha + \\beta = 4, \\qquad \\alpha\\beta = 2$$
- **Step 2**: Express in terms of known quantities:
  $$\\frac{\\alpha}{\\beta} + \\frac{\\beta}{\\alpha} = \\frac{\\alpha^2 + \\beta^2}{\\alpha\\beta} = \\frac{(\\alpha+\\beta)^2 - 2\\alpha\\beta}{\\alpha\\beta}$$
- **Step 3**: Substitute values:
  $$\\frac{4^2 - 2(2)}{2} = \\frac{16 - 4}{2} = \\frac{12}{2} = 6$$

---

### 3. WAEC Checkpoint Practice Questions

- **Question 1**: If $x - 2$ is a factor of $x^3 - kx^2 + 2x - 8$, what is the numerical value of $k$?
  - A) $k = 1$ (*Correct — $P(2) = 2^3 - k(2^2) + 2(2) - 8 = 0 \\implies 8 - 4k + 4 - 8 = 0 \\implies 4 - 4k = 0 \\implies k = 1$*)
  - B) $k = 2$
  - C) $k = -1$
  - D) $k = 4$
- **Question 2**: Which of the following expressions is a tautology?
  - A) $P \\implies (P \\lor Q)$ (*Correct — if $P$ is true, $P \\lor Q$ is always true; if $P$ is false, false implies anything is true*)
  - B) $P \\land \\sim P$
  - C) $P \\implies (P \\land Q)$
  - D) $P \\lor Q$`,
    keyTakeaways: [
      'Rigorous algebraic discipline prevents sign errors in polynomials and quadratic roots.',
      'Always simplify fractions completely to avoid losing presentation marks in WAEC exams.',
      'Understanding logical contrapositives provides a powerful method for direct and indirect proofs.'
    ],
    associatedQuizId: 'waec-further-math-midterm-2025'
  },

  // ==========================================
  // WEEK 8: COORDINATE GEOMETRY I: STRAIGHT LINES
  // ==========================================
  {
    id: 'fm-ss1-term2-week8',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Coordinate Geometry I: Distance, Midpoints & Gradient of Lines',
    subtopics: [
      'Distance Between Two Points in the Cartesian Plane',
      'Coordinates of Midpoint and Ratio Division (Internal Division)',
      'Gradient / Slope of a Straight Line (m = tan theta = delta y / delta x)',
      'Standard Equations of Straight Lines: Point-Slope and Intercept Forms'
    ],
    readingTimeMinutes: 8,
    summary: 'Derive Cartesian formulas for Euclidean distance, calculate section coordinates dividing segments, determine slopes, and construct straight-line equations.',
    contentMarkdown: `### 1. Cartesian Foundations of the Straight Line

Coordinate geometry links Euclidean geometry with algebra on the 2D Cartesian plane $\\mathbb{R}^2$.

| Analytic Geometric Property | Mathematical Formula | Key Operational Rule |
| :--- | :--- | :--- |
| **Distance ($d$)** | $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$ | Derived from Pythagoras Theorem; always non-negative ($d \\ge 0$). |
| **Midpoint Coordinates ($M$)** | $M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)$ | Arithmetic mean of $x$ and $y$ coordinates. |
| **Internal Division Ratio ($m:n$)** | $P = \\left(\\frac{m x_2 + n x_1}{m + n}, \\frac{m y_2 + n y_1}{m + n}\\right)$ | Section formula dividing segment $AB$ internally in ratio $m:n$. |
| **Gradient / Slope ($m$)** | $m = \\frac{\\Delta y}{\\Delta x} = \\frac{y_2 - y_1}{x_2 - x_1} = \\tan\\theta$ | $\\theta$ is inclination angle with positive $x$-axis. |

[Diagram: further-math-coordinate-geometry]

---

### 2. Forms of the Equation of a Straight Line

1. **Slope-Intercept Form**:
   $$y = mx + c$$
   where $m$ is the gradient and $c$ is the $y$-intercept $(0, c)$.
2. **Point-Slope Form**:
   $$y - y_1 = m(x - x_1)$$
   Used when gradient $m$ and a passing point $(x_1, y_1)$ are known.
3. **General Linear Form**:
   $$ax + by + c = 0$$
   Here, gradient $m = -\\frac{a}{b}$ and $y$-intercept $= -\\frac{c}{b}$ ($b \\neq 0$).

---

### 3. Worked Example: Line Passing Through Two Points

Find the equation of the line passing through $A(-2, 5)$ and $B(4, -1)$:
- **Step 1: Compute gradient $m$**:
  $$m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{-1 - 5}{4 - (-2)} = \\frac{-6}{6} = -1$$
- **Step 2: Use point-slope form with $A(-2, 5)$**:
  $$y - 5 = -1(x - (-2)) \\implies y - 5 = -x - 2 \\implies x + y - 3 = 0$$

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: What is the distance between points $P(-3, 2)$ and $Q(5, -4)$?
  - A) $10$ units (*Correct — $d = \\sqrt{(5 - (-3))^2 + (-4 - 2)^2} = \\sqrt{8^2 + (-6)^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10$*)
  - B) $12$ units
  - C) $8$ units
  - D) $14$ units
- **Question 2**: Find the coordinates of the point that divides the segment joining $A(1, 2)$ and $B(6, 7)$ internally in the ratio $2:3$.
  - A) $(3, 4)$ (*Correct — $x = (2\\cdot 6 + 3\\cdot 1)/5 = 15/5 = 3$; $y = (2\\cdot 7 + 3\\cdot 2)/5 = 20/5 = 4$*)
  - B) $(4, 5)$
  - C) $(2.5, 3.5)$
  - D) $(3.5, 4.5)$`,
    keyTakeaways: [
      'The gradient of a line is defined as $m = \\frac{y_2 - y_1}{x_2 - x_1} = \\tan\\theta$.',
      'The distance formula $d = \\sqrt{\\Delta x^2 + \\Delta y^2}$ is an analytic statement of Pythagoras Theorem.',
      'The section formula partitions a directed line segment internally in ratio $m:n$.'
    ],
    associatedQuizId: 'waec-further-math-coord-geom-2025'
  },

  // ==========================================
  // WEEK 9: COORDINATE GEOMETRY II: PARALLEL & PERPENDICULAR LINES
  // ==========================================
  {
    id: 'fm-ss1-term2-week9',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Coordinate Geometry II: Parallel, Perpendicular Lines & Distance from a Point',
    subtopics: [
      'Conditions for Parallel Lines: m1 = m2',
      'Conditions for Perpendicular (Orthogonal) Lines: m1 * m2 = -1',
      'Acute Angle Between Two Intersecting Lines: tan theta = |(m1 - m2) / (1 + m1*m2)|',
      'Perpendicular Distance from Point (x1, y1) to Line ax + by + c = 0'
    ],
    readingTimeMinutes: 8,
    summary: 'Apply algebraic conditions for parallel and orthogonal lines, calculate the angle between intersecting lines, and determine perpendicular distance to a line.',
    contentMarkdown: `### 1. Parallel and Perpendicular Line Conditions

Let lines $L_1$ and $L_2$ have gradients $m_1$ and $m_2$ respectively:

| Geometric Relationship | Analytical Condition | Explanation & Exceptions |
| :--- | :--- | :--- |
| **Parallel Lines ($L_1 \\parallel L_2$)** | $m_1 = m_2$ | Equal inclination with the $x$-axis; lines never intersect. |
| **Perpendicular Lines ($L_1 \\perp L_2$)** | $m_1 \\cdot m_2 = -1 \\implies m_2 = -\\frac{1}{m_1}$ | The gradients are **negative reciprocals** of each other (neither line is vertical). |
| **Angle Between Lines ($\\theta$)** | $\\tan\\theta = \\left|\\frac{m_1 - m_2}{1 + m_1 m_2}\\right|$ | Computes the acute angle $\\theta$ between intersecting lines. |

---

### 2. Perpendicular Distance from a Point to a Line

The shortest (perpendicular) distance $d$ from point $P(x_1, y_1)$ to the straight line $ax + by + c = 0$ is:

$$d = \\frac{|a x_1 + b y_1 + c|}{\\sqrt{a^2 + b^2}}$$

$$\\text{Calculate the perpendicular distance from point } P(3, -2) \\text{ to line } 3x - 4y + 8 = 0$$

- Identify parameters: $x_1 = 3,\\quad y_1 = -2,\\quad a = 3,\\quad b = -4,\\quad c = 8$.
- Calculate numerator:
  $$|3(3) - 4(-2) + 8| = |9 + 8 + 8| = |25| = 25$$
- Calculate denominator:
  $$\\sqrt{a^2 + b^2} = \\sqrt{3^2 + (-4)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$$
- Compute distance:
  $$d = \\frac{25}{5} = 5 \\text{ units}$$

---

### 3. Equation of the Perpendicular Bisector

To find the perpendicular bisector of segment $A(1, 3)$ and $B(5, 7)$:
1. **Find midpoint $M$**:
   $$M = \\left(\\frac{1+5}{2}, \\frac{3+7}{2}\\right) = (3, 5)$$
2. **Find gradient of $AB$ ($m_{AB}$)**:
   $$m_{AB} = \\frac{7 - 3}{5 - 1} = \\frac{4}{4} = 1$$
3. **Find perpendicular gradient $m_\\perp$**:
   $$m_\\perp = -\\frac{1}{m_{AB}} = -\\frac{1}{1} = -1$$
4. **Form equation through $M(3, 5)$**:
   $$y - 5 = -1(x - 3) \\implies y - 5 = -x + 3 \\implies x + y - 8 = 0$$

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: What is the gradient of a line perpendicular to $2x - 3y + 5 = 0$?
  - A) $2/3$
  - B) $-3/2$ (*Correct — original line has gradient $m_1 = 2/3$, perpendicular gradient is $m_2 = -1/m_1 = -3/2$*)
  - C) $3/2$
  - D) $-2/3$
- **Question 2**: Find the acute angle between the lines $y = 2x + 1$ and $y = 3x - 4$ to the nearest tenth of a degree.
  - A) $8.1^\\circ$ (*Correct — $\\tan\\theta = |(3 - 2)/(1 + 3\\cdot 2)| = 1/7 \\implies \\theta = \\tan^{-1}(1/7) \\approx 8.13^\\circ$*)
  - B) $15.4^\\circ$
  - C) $45.0^\\circ$
  - D) $26.6^\\circ$`,
    keyTakeaways: [
      'Two non-vertical lines are perpendicular if and only if the product of their gradients is $-1$ ($m_1 m_2 = -1$).',
      'The perpendicular distance formula $d = \\frac{|ax_1 + by_1 + c|}{\\sqrt{a^2 + b^2}}$ uses the absolute value to ensure distance is positive.',
      'The perpendicular bisector passes through the midpoint and has gradient equal to $-1/m_{AB}$.'
    ],
    associatedQuizId: 'waec-further-math-perp-lines-2025'
  },

  // ==========================================
  // WEEK 10: TRIGONOMETRY I: THE GENERAL ANGLE & ASTC RULE
  // ==========================================
  {
    id: 'fm-ss1-term2-week10',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Trigonometry I: General Angles, The ASTC Rule & Exact Surds',
    subtopics: [
      'Radian Measure and Conversion: 180 degrees = pi radians',
      'The Unit Circle and Trigonometric Ratios of General Angles',
      'The ASTC Quadrant Rule ("All Students Take Chemistry")',
      'Exact Trigonometric Ratios for Special Angles: 30, 45, and 60 degrees'
    ],
    readingTimeMinutes: 9,
    summary: 'Master circular radian measure, analyze the unit circle across all 4 quadrants, apply the ASTC rule for signs, and determine exact surd ratios for 30, 45, and 60 degrees.',
    contentMarkdown: `### 1. Radian Measure & General Angles

In advanced mathematics, angles are measured in **radians**:
$$\\pi \\text{ radians} = 180^\\circ \\implies 1 \\text{ rad} = \\frac{180^\\circ}{\\pi} \\approx 57.3^\\circ$$

| Angle in Degrees | Angle in Radians | Exact $\\sin\\theta$ | Exact $\\cos\\theta$ | Exact $\\tan\\theta$ |
| :---: | :---: | :---: | :---: | :---: |
| **$0^\\circ$** | $0$ | $0$ | $1$ | $0$ |
| **$30^\\circ$** | $\\pi / 6$ | $1/2$ | $\\sqrt{3}/2$ | $1/\\sqrt{3} = \\sqrt{3}/3$ |
| **$45^\\circ$** | $\\pi / 4$ | $1/\\sqrt{2} = \\sqrt{2}/2$ | $1/\\sqrt{2} = \\sqrt{2}/2$ | $1$ |
| **$60^\\circ$** | $\\pi / 3$ | $\\sqrt{3}/2$ | $1/2$ | $\\sqrt{3}$ |
| **$90^\\circ$** | $\\pi / 2$ | $1$ | $0$ | Undefined |

[Diagram: further-math-unit-circle-astc]

---

### 2. The ASTC Quadrant Rule

The sign of any trigonometric ratio depends on the quadrant in which the terminal arm of angle $\\theta$ lies:

- **Quadrant I ($0^\\circ < \\theta < 90^\\circ$)**: **A** - **ALL** ratios ($\\sin, \\cos, \\tan$) are positive.
- **Quadrant II ($90^\\circ < \\theta < 180^\\circ$)**: **S** - Only **SINE** is positive ($\\cos, \\tan$ are negative).
  - Reference angle: $\\alpha = 180^\\circ - \\theta$.
- **Quadrant III ($180^\\circ < \\theta < 270^\\circ$)**: **T** - Only **TANGENT** is positive ($\\sin, \\cos$ are negative).
  - Reference angle: $\\alpha = \\theta - 180^\\circ$.
- **Quadrant IV ($270^\\circ < \\theta < 360^\\circ$)**: **C** - Only **COSINE** is positive ($\\sin, \\tan$ are negative).
  - Reference angle: $\\alpha = 360^\\circ - \\theta$.

---

### 3. Worked Example: Exact Value of $\\sin(210^\\circ)$ and $\\cos(300^\\circ)$

1. **Evaluate $\\sin(210^\\circ)$**:
   - $210^\\circ$ lies in **Quadrant III** (where only $\\tan$ is positive, so $\\sin$ is **negative**).
   - Reference angle $\\alpha = 210^\\circ - 180^\\circ = 30^\\circ$.
   - $\\sin(210^\\circ) = -\\sin(30^\\circ) = -\\frac{1}{2}$.
2. **Evaluate $\\cos(300^\\circ)$**:
   - $300^\\circ$ lies in **Quadrant IV** (where $\\cos$ is **positive**).
   - Reference angle $\\alpha = 360^\\circ - 300^\\circ = 60^\\circ$.
   - $\\cos(300^\\circ) = +\\cos(60^\\circ) = +\\frac{1}{2}$.

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: Given that $\\sin\\theta = -3/5$ and $\\theta$ lies in Quadrant III, what is the exact value of $\\cos\\theta$?
  - A) $4/5$
  - B) $-4/5$ (*Correct — in Quadrant III cosine is negative; with $x^2 + (-3)^2 = 5^2 \\implies x = -4$, so $\\cos\\theta = -4/5$*)
  - C) $3/4$
  - D) $-3/4$
- **Question 2**: What is the exact value of $\\tan(135^\\circ)$?
  - A) $1$
  - B) $-1$ (*Correct — $135^\\circ$ is in Quadrant II where $\\tan$ is negative; reference angle is $180^\\circ - 135^\\circ = 45^\\circ$, so $\\tan(135^\\circ) = -\\tan(45^\\circ) = -1$*)
  - C) $-\\sqrt{3}$
  - D) $-1/\\sqrt{3}$`,
    keyTakeaways: [
      'The ASTC rule determines whether a trigonometric ratio is positive or negative in each of the 4 quadrants.',
      'The acute reference angle $\\alpha$ relates general angles back to Quadrant I.',
      'Special angles $30^\\circ, 45^\\circ, 60^\\circ$ should always be expressed in exact surd form.'
    ],
    associatedQuizId: 'waec-further-math-trig-quadrants-2025'
  },

  // ==========================================
  // WEEK 11: TRIGONOMETRY II: IDENTITIES & EQUATIONS
  // ==========================================
  {
    id: 'fm-ss1-term2-week11',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Trigonometry II: Fundamental Pythagorean Identities & Equations',
    subtopics: [
      'Reciprocal Trigonometric Functions: secant, cosecant, cotangent',
      'The Three Pythagorean Identities: sin^2 + cos^2 = 1, 1 + tan^2 = sec^2, 1 + cot^2 = cosec^2',
      'Proving Trigonometric Identities',
      'Solving Trigonometric Equations in the Domain 0 <= theta <= 360'
    ],
    readingTimeMinutes: 8,
    summary: 'Define reciprocal trigonometric functions, apply fundamental Pythagorean identities to prove relationships, and solve quadratic trigonometric equations within bounded intervals.',
    contentMarkdown: `### 1. Reciprocal Functions & Pythagorean Identities

In addition to $\\sin\\theta, \\cos\\theta, \\tan\\theta$, Further Mathematics defines three **reciprocal functions**:

$$\\sec\\theta = \\frac{1}{\\cos\\theta}, \\qquad \\csc\\theta = \\frac{1}{\\sin\\theta}, \\qquad \\cot\\theta = \\frac{1}{\\tan\\theta} = \\frac{\\cos\\theta}{\\sin\\theta}$$

| Fundamental Identity | Algebraic Derivation | Alternate Forms |
| :--- | :--- | :--- |
| **$\\sin^2\\theta + \\cos^2\\theta = 1$** | From unit circle equation $x^2 + y^2 = 1$. | $\\sin^2\\theta = 1 - \\cos^2\\theta,\\quad \\cos^2\\theta = 1 - \\sin^2\\theta$ |
| **$1 + \\tan^2\\theta = \\sec^2\\theta$** | Divide $\\sin^2\\theta + \\cos^2\\theta = 1$ by $\\cos^2\\theta$. | $\\sec^2\\theta - \\tan^2\\theta = 1$ |
| **$1 + \\cot^2\\theta = \\csc^2\\theta$** | Divide $\\sin^2\\theta + \\cos^2\\theta = 1$ by $\\sin^2\\theta$. | $\\csc^2\\theta - \\cot^2\\theta = 1$ |

---

### 2. Proving Trigonometric Identities

$$\\text{Prove that: } \\frac{\\cos\\theta}{1 - \\sin\\theta} = \\sec\\theta + \\tan\\theta$$

- **Start with Left-Hand Side (LHS)**:
  $$\\text{LHS} = \\frac{\\cos\\theta}{1 - \\sin\\theta}$$
- **Multiply numerator and denominator by conjugate $(1 + \\sin\\theta)$**:
  $$\\text{LHS} = \\frac{\\cos\\theta(1 + \\sin\\theta)}{(1 - \\sin\\theta)(1 + \\sin\\theta)} = \\frac{\\cos\\theta(1 + \\sin\\theta)}{1 - \\sin^2\\theta}$$
- **Apply identity $1 - \\sin^2\\theta = \\cos^2\\theta$**:
  $$\\text{LHS} = \\frac{\\cos\\theta(1 + \\sin\\theta)}{\\cos^2\\theta} = \\frac{1 + \\sin\\theta}{\\cos\\theta} = \\frac{1}{\\cos\\theta} + \\frac{\\sin\\theta}{\\cos\\theta}$$
- **Substitute reciprocal and ratio identities**:
  $$\\text{LHS} = \\sec\\theta + \\tan\\theta = \\text{RHS} \\quad \\text{(Q.E.D.)}$$

---

### 3. Solving Quadratic Trigonometric Equations

$$\\text{Solve for } \\theta \\in [0^\\circ, 360^\\circ]: \\quad 2\\cos^2\\theta + 3\\sin\\theta - 3 = 0$$

1. Express entirely in terms of $\\sin\\theta$ using $\\cos^2\\theta = 1 - \\sin^2\\theta$:
   $$2(1 - \\sin^2\\theta) + 3\\sin\\theta - 3 = 0$$
   $$2 - 2\\sin^2\\theta + 3\\sin\\theta - 3 = 0 \\implies -2\\sin^2\\theta + 3\\sin\\theta - 1 = 0 \\implies 2\\sin^2\\theta - 3\\sin\\theta + 1 = 0$$
2. Factorize quadratic in $\\sin\\theta$:
   $$(2\\sin\\theta - 1)(\\sin\\theta - 1) = 0 \\implies \\sin\\theta = \\frac{1}{2} \\quad \\text{or} \\quad \\sin\\theta = 1$$
3. Find solutions in $[0^\\circ, 360^\\circ]$:
   - For $\\sin\\theta = \\frac{1}{2}$: Positive in Quadrants I and II:
     $$\\theta = 30^\\circ \\quad \\text{and} \\quad \\theta = 180^\\circ - 30^\\circ = 150^\\circ$$
   - For $\\sin\\theta = 1$:
     $$\\theta = 90^\\circ$$
4. **Complete Solution Set**: $\\theta \\in \\{30^\\circ, 90^\\circ, 150^\\circ\\}$.

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: Simplify the expression $(\\sec\\theta - \\tan\\theta)(\\sec\\theta + \\tan\\theta)$.
  - A) $1$ (*Correct — difference of two squares yields $\\sec^2\\theta - \\tan^2\\theta = 1$*)
  - B) $0$
  - C) $2\\sec\\theta$
  - D) $\\cos^2\\theta$
- **Question 2**: Find all solutions to $2\\sin\\theta - 1 = 0$ for $0^\\circ \\le \\theta \\le 360^\\circ$.
  - A) $30^\\circ$ and $150^\\circ$ (*Correct — $\\sin\\theta = 1/2$ is positive in Q1 ($30^\\circ$) and Q2 ($180^\\circ - 30^\\circ = 150^\\circ$)*)
  - B) $30^\\circ$ and $210^\\circ$
  - C) $60^\\circ$ and $120^\\circ$
  - D) $30^\\circ$ and $330^\\circ$`,
    keyTakeaways: [
      'The identity $\\sin^2\\theta + \\cos^2\\theta = 1$ is the foundation for transforming mixed trigonometric equations.',
      'When solving equations, always verify that the solutions lie strictly within the given interval (such as $0^\\circ \\le \\theta \\le 360^\\circ$).',
      'The secant, cosecant, and cotangent are reciprocal functions, not inverse functions.'
    ],
    associatedQuizId: 'waec-further-math-identities-2025'
  },

  // ==========================================
  // WEEK 12: INTEGRATED 2ND TERM FURTHER MATHEMATICS REVIEW
  // ==========================================
  {
    id: 'fm-ss1-term2-week12',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 12,
    topicTitle: 'Integrated 2nd Term Further Mathematics Review & WAEC Mastery',
    subtopics: [
      'Master Synoptic Formula Map: Algebra, Coordinate Geometry & Trigonometry',
      'High-Yield WAEC Section B Multi-Topic Proofs and Solutions',
      'Avoiding Common Examiner Traps in Radical Equations and Trigonometry',
      'Terminal Examination Strategy and Step-by-Step Marking Rubric'
    ],
    readingTimeMinutes: 9,
    summary: 'Synthesize 2nd term competencies across all 11 topics, resolve complex multi-domain exam scenarios, and master the official WAEC Further Mathematics marking scheme.',
    contentMarkdown: `### 1. Integrated 2nd Term Further Mathematics Review Map

| Domain | Key Topic Area | Master Formulas & Core Relations |
| :--- | :--- | :--- |
| **Algebra** | Indices & Logarithms | $\\log_b(a) = \\frac{\\log_c(a)}{\\log_c(b)}, \\quad a^{2x} + k a^x + c = 0$ |
| **Surds** | Conjugate Operations | $(a+\\sqrt{b})(a-\\sqrt{b}) = a^2 - b, \\quad \\sqrt{x+\\sqrt{y}} = \\sqrt{a}+\\sqrt{b}$ |
| **Polynomials** | Remainder & Factor | $P(x) = D(x)Q(x) + R, \\quad R = P(c), \\quad P(c)=0 \\iff (x-c) \\text{ is factor}$ |
| **Roots of Quadratics** | Vieta Relations | $\\alpha+\\beta = -b/a, \\quad \\alpha\\beta = c/a, \\quad \\alpha^2+\\beta^2 = S^2 - 2P$ |
| **Symbolic Logic** | Connectives & Proofs | $(P \\implies Q) \\equiv (\\sim Q \\implies \\sim P), \\quad \\text{Tautology vs Contradiction}$ |
| **Coordinate Geometry** | Distance & Lines | $d = \\sqrt{\\Delta x^2 + \\Delta y^2}, \\quad m = \\frac{\\Delta y}{\\Delta x}, \\quad m_1 m_2 = -1, \\quad d_\\perp = \\frac{|ax_1+by_1+c|}{\\sqrt{a^2+b^2}}$ |
| **Trigonometry** | ASTC & Identities | $\\sin^2\\theta + \\cos^2\\theta = 1, \\quad 1+\\tan^2\\theta = \\sec^2\\theta, \\quad \\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$ |

---

### 2. High-Yield WAEC Examination Scenario

**Problem**:
A straight line $L_1$ passes through points $A(2, 3)$ and $B(6, 11)$.
1. Find the equation of line $L_1$.
2. Find the equation of the line $L_2$ perpendicular to $L_1$ passing through the midpoint of $AB$.
3. If $L_2$ intersects the $x$-axis at point $C$, determine the area of $\\triangle ABC$.

**Solution**:
1. **Equation of $L_1$**:
   - $m_1 = \\frac{11 - 3}{6 - 2} = \\frac{8}{4} = 2$.
   - $y - 3 = 2(x - 2) \\implies y - 3 = 2x - 4 \\implies 2x - y - 1 = 0$.
2. **Equation of perpendicular bisector $L_2$**:
   - Midpoint $M = \\left(\\frac{2+6}{2}, \\frac{3+11}{2}\\right) = (4, 7)$.
   - Perpendicular gradient $m_2 = -\\frac{1}{m_1} = -\\frac{1}{2}$.
   - $y - 7 = -\\frac{1}{2}(x - 4) \\implies 2(y - 7) = -(x - 4) \\implies 2y - 14 = -x + 4 \\implies x + 2y - 18 = 0$.
3. **Point $C$ and Area of $\\triangle ABC$**:
   - $L_2$ meets $x$-axis when $y = 0$: $x + 2(0) - 18 = 0 \\implies x = 18 \\implies C(18, 0)$.
   - Length of base $AB = \\sqrt{(6-2)^2 + (11-3)^2} = \\sqrt{4^2 + 8^2} = \\sqrt{16 + 64} = \\sqrt{80} = 4\\sqrt{5}$.
   - Perpendicular height $h = \\text{distance from } M(4, 7) \\text{ to } C(18, 0)$:
     $$h = \\sqrt{(18-4)^2 + (0-7)^2} = \\sqrt{14^2 + (-7)^2} = \\sqrt{196 + 49} = \\sqrt{245} = 7\\sqrt{5}$$
   - Area $= \\frac{1}{2} \\times \\text{base} \\times \\text{height} = \\frac{1}{2} \\times (4\\sqrt{5}) \\times (7\\sqrt{5}) = \\frac{1}{2} \\times 28 \\times 5 = 70 \\text{ sq. units}$.

---

### 3. WAEC Checkpoint Practice Questions

- **Question 1**: If $\\tan\\theta = 4/3$ and $\\theta$ is reflex ($180^\\circ < \\theta < 270^\\circ$), what is the value of $\\sin\\theta + \\cos\\theta$?
  - A) $-7/5$ (*Correct — in Q3, both $\\sin$ and $\\cos$ are negative: $\\sin\\theta = -4/5$, $\\cos\\theta = -3/5$, sum is $-7/5$*)
  - B) $7/5$
  - C) $-1/5$
  - D) $1/5$
- **Question 2**: What is the perpendicular distance from origin $(0, 0)$ to the line $5x - 12y + 26 = 0$?
  - A) $2$ units (*Correct — $d = |5(0) - 12(0) + 26| / \\sqrt{5^2 + (-12)^2} = 26 / \\sqrt{169} = 26 / 13 = 2$*)
  - B) $3$ units
  - C) $13$ units
  - D) $26$ units`,
    keyTakeaways: [
      'Further Mathematics demands synthesis: coordinate geometry, trigonometry, and polynomial algebra frequently unite in Section B exam questions.',
      'Always state units and give exact surd values unless a decimal approximation is explicitly requested.',
      'Step-by-step presentation following WAEC marking schemes maximizes method marks even if a minor arithmetic error occurs.'
    ],
    associatedQuizId: 'waec-further-math-terminal-2025'
  }
];
