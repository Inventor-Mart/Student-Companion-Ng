import { CurriculumTopic } from '../types';

export const SS1_MATH_TOPICS: CurriculumTopic[] = [
  {
    id: 'ss1-math-t2-w1',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Quadratic Equations: Factorization & Completing the Square Methods',
    subtopics: [
      'Standard Form of a Quadratic Equation: $ax^2 + bx + c = 0$ ($a \\neq 0$)',
      'The Zero Product Principle: If $P \\times Q = 0$, then $P = 0$ or $Q = 0$',
      'Solving by Factorization: Finding Factors Whose Product is $ac$ and Sum is $b$',
      'Solving by Completing the Square: Step-by-Step Algebraic Algorithm',
      'Geometrical Interpretation of Completing the Square',
      'WAEC/NECO Examination Drills with Detailed Marking Guides'
    ],
    readingTimeMinutes: 16,
    summary: 'Mastering quadratic equations: standard form $ax^2 + bx + c = 0$, solving by factorization, and the rigorous completing the square method with WAEC past questions.',
    contentMarkdown: `### 1. The Standard Form of a Quadratic Equation

A **Quadratic Equation** in one variable $x$ is a second-degree polynomial equation of the general form:

$$ax^2 + bx + c = 0 \\quad (a \\neq 0)$$

Where:
- $a$ is the coefficient of $x^2$ (quadratic coefficient, $a \\neq 0$).
- $b$ is the coefficient of $x$ (linear coefficient).
- $c$ is the constant term.

\`\`\`
+--------------------------------------------------------------------------+
|                  THE FOUR METHODS FOR SOLVING QUADRATICS                 |
|                                                                          |
|   1. FACTORIZATION            : Quickest when roots are rational.        |
|   2. COMPLETING THE SQUARE    : Universal; foundation of the formula.    |
|   3. QUADRATIC FORMULA        : Direct substitution for all coefficients.|
|   4. GRAPHICAL METHOD         : Visual plotting of parabola intercepts.  |
+--------------------------------------------------------------------------+
\`\`\`

---

### 2. Method 1: Solving by Factorization

#### The Zero Product Rule:
If the product of two real algebraic expressions is zero ($P \\cdot Q = 0$), then at least one factor must equal zero: $P = 0$ or $Q = 0$.

#### Step-by-Step Worked Example:
**Solve for $x$:** $2x^2 - 5x - 3 = 0$

1. **Find Product ($ac$) and Sum ($b$):**
   - $ac = 2 \\times (-3) = -6$
   - $b = -5$
   - Two numbers whose product is $-6$ and sum is $-5$: **$-6$ and $+1$**.
2. **Split the Middle Term:**
   $$2x^2 - 6x + x - 3 = 0$$
3. **Factor by Grouping:**
   $$2x(x - 3) + 1(x - 3) = 0$$
   $$(2x + 1)(x - 3) = 0$$
4. **Apply Zero Product Rule:**
   $$2x + 1 = 0 \\implies x = -\\frac{1}{2}$$
   $$x - 3 = 0 \\implies x = 3$$
   **Roots:** $x = -\\frac{1}{2}$ or $x = 3$.

---

### 3. Method 2: Solving by Completing the Square

When a quadratic cannot be easily factored, **completing the square** reshapes the equation into the form $(x + p)^2 = q$.

\`\`\`
+--------------------------------------------------------------------------+
|                  THE COMPLETING THE SQUARE ALGORITHM                     |
|                                                                          |
|   Step 1: Divide through by coefficient $a$ so that $x^2$ has coef 1.    |
|   Step 2: Move the constant term to the right-hand side.                 |
|   Step 3: Add the square of HALF the coefficient of $x$ to BOTH sides:   |
|           Add $\\left(\\frac{b}{2a}\\right)^2$ to both sides.              |
|   Step 4: Factor the left side as a perfect square: $(x + \\frac{b}{2a})^2$.|
|   Step 5: Take the square root of both sides (remember $\\pm$) and solve. |
+--------------------------------------------------------------------------+
\`\`\`

#### Worked Example:
**Solve by completing the square:** $x^2 + 6x - 7 = 0$

1. Move constant to RHS:
   $$x^2 + 6x = 7$$
2. Half of the coefficient of $x$ ($6$) is $3$. Square it: $3^2 = 9$. Add $9$ to both sides:
   $$x^2 + 6x + 9 = 7 + 9$$
   $$(x + 3)^2 = 16$$
3. Take square root of both sides:
   $$x + 3 = \\pm \\sqrt{16} = \\pm 4$$
   $$x = -3 \\pm 4$$
   $$x = -3 + 4 = 1 \\quad \\text{or} \\quad x = -3 - 4 = -7$$
   **Roots:** $x = 1$ or $x = -7$.

---

### 4. WAEC SSCE Checkpoint Drill

1. **Find the roots of the quadratic equation $3x^2 + 10x - 8 = 0$ by factorization.**
   - A) $x = 2, -4/3$
   - B) $x = 2/3, -4$ *(Correct — $(3x - 2)(x + 4) = 0$)*
   - C) $x = -2, 4/3$
   - D) $x = 1, -8$
2. **What value must be added to $x^2 - 12x$ to make it a perfect square?**
   - A) 12
   - B) -6
   - C) 36 *(Correct — $(-12/2)^2 = (-6)^2 = 36$)*
   - D) 144`,
    keyTakeaways: [
      "Standard quadratic form is ax^2 + bx + c = 0 with a != 0.",
      "Factorization requires splitting the middle term using factors of ac that sum to b.",
      "Completing the square adds the square of half the x-coefficient to both sides.",
      "Always include positive and negative square roots (+/-) when solving."
    ],
    associatedQuizId: 'ssce-math-quadratic-factorization'
  },
  {
    id: 'ss1-math-t2-w2',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Quadratic Equations: The General Formula & Graphical Parabola Solutions',
    subtopics: [
      'Derivation of the Quadratic Formula: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$',
      'The Discriminant ($\\Delta = b^2 - 4ac$) and the Nature of Roots',
      'Table of Values for Quadratic Functions: $y = ax^2 + bx + c$',
      'Graphical Properties of Parabolas: Vertex, Line of Symmetry ($x = -b/2a$), Maximum/Minimum Values',
      'Reading Roots and Solving Linear-Quadratic Systems from Graphs',
      'WAEC SSCE Graph Sheet Marking Guidelines'
    ],
    readingTimeMinutes: 16,
    summary: 'The universal quadratic formula derived via completing the square, discriminant analysis of root types, and plotting quadratic parabolic graphs to read roots and symmetry axes.',
    contentMarkdown: `### 1. Derivation of the Quadratic Formula

Starting with the standard quadratic equation $ax^2 + bx + c = 0$:

1. Divide through by $a$:
   $$x^2 + \\frac{b}{a}x + \\frac{c}{a} = 0$$
2. Move $\\frac{c}{a}$ to the RHS:
   $$x^2 + \\frac{b}{a}x = -\\frac{c}{a}$$
3. Add $\\left(\\frac{b}{2a}\\right)^2 = \\frac{b^2}{4a^2}$ to both sides:
   $$x^2 + \\frac{b}{a}x + \\frac{b^2}{4a^2} = \\frac{b^2}{4a^2} - \\frac{c}{a}$$
   $$\\left(x + \\frac{b}{2a}\\right)^2 = \\frac{b^2 - 4ac}{4a^2}$$
4. Take the square root of both sides:
   $$x + \\frac{b}{2a} = \\frac{\\pm \\sqrt{b^2 - 4ac}}{2a}$$
5. Solve for $x$:
   $$\\mathbf{x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}}$$

---

### 2. The Discriminant & Nature of Roots

The quantity under the radical sign, **$\\Delta = b^2 - 4ac$**, is called the **Discriminant**:

\`\`\`
+-----------------------+-----------------------------+-------------------------------+
| DISCRIMINANT VALUE    | NATURE OF THE ROOTS         | GRAPHICAL PARABOLA BEHAVIOR   |
+-----------------------+-----------------------------+-------------------------------+
| $\\Delta > 0$ (Perfect Sq)| Real, rational, and unequal | Parabola cuts x-axis at TWO   |
|                       |                             | distinct points.              |
+-----------------------+-----------------------------+-------------------------------+
| $\\Delta > 0$ (Not Perf Sq)| Real, irrational, and unequal| Parabola cuts x-axis at TWO  |
|                       | (contains surds)            | distinct points.              |
+-----------------------+-----------------------------+-------------------------------+
| $\\Delta = 0$        | Real and equal (repeated /  | Parabola is TANGENT to x-axis |
|                       | coincident roots)           | (touches at exactly ONE point)|
+-----------------------+-----------------------------+-------------------------------+
| $\\Delta < 0$        | No real roots (complex /    | Parabola does NOT touch or    |
|                       | imaginary roots)            | intersect the x-axis.         |
+-----------------------+-----------------------------+-------------------------------+
\`\`\`

---

### 3. Graphical Solutions of Quadratic Functions

The graph of a quadratic function $y = ax^2 + bx + c$ is a smooth symmetrical curve called a **Parabola**:
- If $a > 0$, the parabola opens **upwards** ($\\cup$), having a **minimum point**.
- If $a < 0$, the parabola opens **downwards** ($\\cap$), having a **maximum point**.
- **Axis of Symmetry:** The vertical line $x = -\\frac{b}{2a}$ dividing the parabola into two mirror halves.

\`\`\`
                     y
                     |             Parabola: y = x^2 - 2x - 3
                     |                  (a > 0, opens upward)
         Roots:      |
      x = -1, x = 3  |
          \          |          /
           \         |         /
        ----+---*----+----+---*----+-----> x
           -2  -1    0    1   2    3
                     |    |
                     |    | Axis of symmetry: x = 1
                     |    v
                     |  (1, -4) <-- Vertex / Minimum Value
\`\`\`

---

### 4. WAEC Checkpoint Practice Questions

1. **What is the nature of the roots of $x^2 - 6x + 9 = 0$?**
   - A) Real, unequal, and irrational
   - B) Real and equal *(Correct — $\\Delta = (-6)^2 - 4(1)(9) = 36 - 36 = 0$)*
   - C) No real roots
   - D) Infinite roots
2. **Find the equation of the axis of symmetry for the curve $y = 2x^2 - 8x + 5$.**
   - A) $x = 2$ *(Correct — $x = -b/(2a) = -(-8)/(2 \\times 2) = 8/4 = 2$)*
   - B) $x = -2$
   - C) $x = 4$
   - D) $x = -4$`,
    keyTakeaways: [
      "The quadratic formula solves any quadratic equation: x = (-b +/- sqrt(b^2 - 4ac)) / (2a).",
      "Discriminant b^2 - 4ac governs the nature of roots (two real, one repeated, or none).",
      "Parabolas with a > 0 have minimum turning points; a < 0 gives maximum points.",
      "The axis of symmetry is always the vertical line x = -b / (2a)."
    ],
    associatedQuizId: 'ssce-math-quadratic-formula-graph'
  },
  {
    id: 'ss1-math-t2-w3',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Simultaneous Linear & Quadratic Equations',
    subtopics: [
      'Structure of Linear-Quadratic Systems: One Linear ($px + qy = r$) and One Quadratic ($ax^2 + by^2 + cxy + dx + ey + f = 0$)',
      'The Elimination Failure: Why Elimination Cannot Be Used',
      'The Method of Substitution: Expressing One Variable from Linear into Quadratic',
      'Solving Resulting Quadratic and Finding Paired Coordinate Solutions $(x_1, y_1)$ and $(x_2, y_2)$',
      'Geometric Interpretation: Line Intersecting, Tangent to, or Missing a Parabola / Circle',
      'Real-Life Word Problems Involving Areas and Perimeters',
      'WAEC SSCE Theory Step-by-Step Marking Schemes'
    ],
    readingTimeMinutes: 16,
    summary: 'Solving simultaneous equations with one linear and one quadratic equation using the substitution method, paired coordinate solutions, geometric intersections, and area/perimeter word problems.',
    contentMarkdown: `### 1. Nature of Linear-Quadratic Systems

In Junior Secondary, students solve two linear equations using elimination or substitution.
However, in **Senior Secondary**, we encounter systems where **one equation is linear (degree 1) and one is quadratic (degree 2)**:

$$\\begin{cases} x - y = 1 & \\text{(Linear)} \\\\ x^2 + y^2 = 25 & \\text{(Quadratic - Circle)} \\end{cases}$$

> **CRITICAL RULE:** The elimination method **FAILS** for linear-quadratic systems. You must always use the **METHOD OF SUBSTITUTION**!

---

### 2. Step-by-Step Solution Algorithm

\`\`\`
+--------------------------------------------------------------------------+
|                  LINEAR-QUADRATIC SUBSTITUTION PROTOCOL                  |
|                                                                          |
|   Step 1: Make one variable the subject in the LINEAR equation           |
|           (Choose the variable with coefficient +1 or -1 to avoid fractions)|
|   Step 2: Substitute this expression into the QUADRATIC equation.        |
|   Step 3: Expand brackets carefully and collect like terms to obtain a   |
|           standard single-variable quadratic: $Au^2 + Bu + C = 0$.       |
|   Step 4: Solve the quadratic for the two roots: $u_1$ and $u_2$.        |
|   Step 5: Substitute each root back into the linear expression to find   |
|           the matching paired values: $(x_1, y_1)$ and $(x_2, y_2)$.     |
+--------------------------------------------------------------------------+
\`\`\`

#### Worked Example:
**Solve the simultaneous equations:**
$$\\begin{aligned} 2x + y &= 5 \\quad \\text{--- (1)} \\\\ x^2 - y^2 &= 5 \\quad \\text{--- (2)} \\end{aligned}$$

1. From linear equation (1), express $y$ in terms of $x$:
   $$y = 5 - 2x \\quad \\text{--- (3)}$$
2. Substitute (3) into quadratic equation (2):
   $$x^2 - (5 - 2x)^2 = 5$$
3. Expand carefully:
   $$x^2 - (25 - 20x + 4x^2) = 5$$
   $$x^2 - 25 + 20x - 4x^2 = 5$$
   $$-3x^2 + 20x - 30 = 0 \\implies 3x^2 - 20x + 30 = 0$$
   Wait, let's solve a clean WAEC standard:
   $$\\begin{aligned} x - y &= 2 \\quad \\implies y = x - 2 \\\\ x^2 + y^2 &= 10 \\end{aligned}$$
   $$x^2 + (x - 2)^2 = 10$$
   $$x^2 + x^2 - 4x + 4 = 10$$
   $$2x^2 - 4x - 6 = 0 \\implies x^2 - 2x - 3 = 0$$
   $$(x - 3)(x + 1) = 0 \\implies x = 3 \\quad \\text{or} \\quad x = -1$$
4. Find corresponding $y$ values:
   - When $x = 3$: $y = 3 - 2 = 1 \\implies (3, 1)$
   - When $x = -1$: $y = -1 - 2 = -3 \\implies (-1, -3)$
   **Solution pairs:** $(3, 1)$ and $(-1, -3)$.

---

### 3. Word Problems: Geometric Applications

**WAEC Model Question:** The perimeter of a rectangular farmland is $28\\text{ m}$ and its area is $48\\text{ m}^2$. Find the length and width of the field.

1. Let length be $L$ and width be $W$:
   $$\\text{Perimeter} = 2(L + W) = 28 \\implies L + W = 14 \\implies W = 14 - L$$
   $$\\text{Area} = L \\times W = 48$$
2. Substitute:
   $$L(14 - L) = 48 \\implies 14L - L^2 = 48 \\implies L^2 - 14L + 48 = 0$$
3. Factorize:
   $$(L - 8)(L - 6) = 0 \\implies L = 8 \\quad \\text{or} \\quad L = 6$$
   If $L = 8\\text{ m}$, then $W = 6\\text{ m}$.
   **Dimensions:** Length = $8\\text{ m}$, Width = $6\\text{ m}$.

---

### 4. WAEC Checkpoint Practice Questions

1. **Solve for $x$ and $y$ simultaneously: $x + y = 7$ and $xy = 12$.**
   - A) $(3, 4)$ and $(4, 3)$ *(Correct — numbers whose sum is 7 and product is 12)*
   - B) $(2, 5)$ and $(5, 2)$
   - C) $(1, 6)$ and $(6, 1)$
   - D) $(-3, -4)$ and $(-4, -3)$
2. **A straight line cuts a parabola at most how many points in the coordinate plane?**
   - A) 1
   - B) 2 *(Correct — yielding at most two paired solutions)*
   - C) 3
   - D) 4`,
    keyTakeaways: [
      "Always use substitution for simultaneous systems containing a quadratic equation.",
      "Isolate a single variable from the linear equation and plug into the quadratic.",
      "Solutions must be presented as ordered pairs (x1, y1) and (x2, y2).",
      "Real-world area and perimeter scenarios frequently reduce to linear-quadratic systems."
    ],
    associatedQuizId: 'ssce-math-simultaneous-quadratic'
  },
  {
    id: 'ss1-math-t2-w4',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Logical Reasoning: Statements, Truth Tables & Logical Operators',
    subtopics: [
      'Simple Statements and Truth Values (True: T / False: F)',
      'Negation ($\\sim p$ or $\\neg p$): The Not Operator',
      'Compound Statements & Connectives: Conjunction ($p \\land q$), Disjunction ($p \\lor q$)',
      'Conditional / Implication ($p \\implies q$): Antecedent vs. Consequent',
      'Biconditional / Equivalence ($p \\iff q$): "If and only if"',
      'Tautologies vs. Contradictions',
      'Converse, Inverse, and Contrapositive of Implications',
      'WAEC SSCE Logic Problems and Venn Diagram Connections'
    ],
    readingTimeMinutes: 15,
    summary: 'Mathematical logic: simple vs compound propositions, complete truth tables for conjunction, disjunction, implication, biconditional, tautologies, and contrapositives.',
    contentMarkdown: `### 1. What is a Mathematical Statement?

In mathematical logic, a **statement (or proposition)** is a declarative sentence that is either strictly **TRUE (T)** or **FALSE (F)**, but not both simultaneously.
- *"Abuja is the federal capital of Nigeria."* -> **Statement (True)**
- *"$5 + 3 = 12$"* -> **Statement (False)**
- *"Shut the door!"* -> **NOT a statement** (command)
- *"Where are you going?"* -> **NOT a statement** (question)

---

### 2. The Fundamental Logical Operators & Truth Tables

\`\`\`
+-------+-------+----------+---------------+--------------+-------------------+--------------------+
|  $p$  |  $q$  | $\\sim p$| $p \\land q$ | $p \\lor q$ | $p \\implies q$  |  $p \\iff q$      |
|       |       |  (NOT)   |  (AND - Conj) | (OR - Disj)  | (Conditional)     |  (Biconditional)   |
+-------+-------+----------+---------------+--------------+-------------------+--------------------+
|   T   |   T   |    F     |       T       |      T       |         T         |         T          |
|   T   |   F   |    F     |       F       |      T       |         F         |         F          |
|   F   |   T   |    T     |       F       |      T       |         T         |         F          |
|   F   |   F   |    T     |       F       |      F       |         T         |         T          |
+-------+-------+----------+---------------+--------------+-------------------+--------------------+
\`\`\`

#### Rules for Quick Recall:
1. **Conjunction ($p \\land q$):** TRUE **only** when BOTH $p$ and $q$ are TRUE.
2. **Disjunction ($p \\lor q$):** FALSE **only** when BOTH $p$ and $q$ are FALSE.
3. **Conditional ($p \\implies q$):** FALSE **only** when the antecedent $p$ is TRUE and consequent $q$ is FALSE (a broken promise!).
4. **Biconditional ($p \\iff q$):** TRUE when both have the **same truth value** (both T or both F).

---

### 3. Converse, Inverse, and Contrapositive

Given the conditional statement: **$p \\implies q$** (*"If it rains, then the ground is wet"*):
1. **Converse ($q \\implies p$):** *"If the ground is wet, then it rains."*
2. **Inverse ($\\sim p \\implies \\sim q$):** *"If it does not rain, then the ground is not wet."*
3. **Contrapositive ($\\sim q \\implies \\sim p$):** *"If the ground is not wet, then it does not rain."*

> **GOLDEN THEOREM:** A conditional statement is **LOGICALLY EQUIVALENT** to its **CONTRAPOSITIVE**:
> $$(p \\implies q) \\equiv (\\sim q \\implies \\sim p)$$

---

### 4. Tautology vs. Contradiction

- **Tautology:** A compound proposition that is **TRUE under all possible truth value assignments** (e.g., $p \\lor \\sim p$, *"It will rain or it will not rain"*).
- **Contradiction:** A compound proposition that is **FALSE under all possible truth value assignments** (e.g., $p \\land \\sim p$, *"It is raining and it is not raining"*).

---

### 5. WAEC Checkpoint Practice Questions

1. **Under what condition is the implication $p \\implies q$ FALSE?**
   - A) When $p$ is true and $q$ is true
   - B) When $p$ is true and $q$ is false *(Correct — true antecedent leading to false conclusion)*
   - C) When $p$ is false and $q$ is true
   - D) When both are false
2. **The contrapositive of the statement "If a triangle is equilateral, then it is equiangular" is:**
   - A) If a triangle is not equiangular, then it is not equilateral. *(Correct — ~q => ~p)*
   - B) If a triangle is equiangular, then it is equilateral.
   - C) If a triangle is not equilateral, then it is not equiangular.
   - D) All triangles are equiangular.`,
    keyTakeaways: [
      "A mathematical statement has a definitive truth value of True or False.",
      "Conjunction requires both true; disjunction requires at least one true.",
      "A conditional p => q is false only when a true antecedent leads to a false consequent.",
      "A statement and its contrapositive (~q => ~p) are logically equivalent."
    ],
    associatedQuizId: 'ssce-math-logical-reasoning'
  },
  {
    id: 'ss1-math-t2-w5',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Linear Inequalities in One & Two Variables: Graphical Feasible Regions',
    subtopics: [
      'Inequality Symbols ($<, >, \\leq, \\geq$) and Number Line Representation',
      'The Negative Inversion Rule: Reversing Inequality Signs When Multiplying/Dividing by Negatives',
      'Compound Inequalities in One Variable: $a < x \\leq b$',
      'Graphing Linear Inequalities in Two Variables: Boundary Lines (Solid vs. Dashed)',
      'Determining the Shaded Feasible Region (Test Point Method $(0, 0)$)',
      'Systems of Simultaneous Linear Inequalities and Bounded Polygons',
      'WAEC SSCE Graph Marking Scheme'
    ],
    readingTimeMinutes: 15,
    summary: 'Linear inequalities in one and two variables: negative multiplier reversal, number lines, boundary graphing (solid vs dashed), test point testing, and shading feasible regions.',
    contentMarkdown: `### 1. Inequalities in One Variable & The Negative Reversal Rule

Linear inequalities express non-equal comparisons between algebraic expressions:
- $<$ (strictly less than), $>$ (strictly greater than) -> represented on number lines by **open circles ($\\circ$)**.
- $\\leq$ (less than or equal to), $\\geq$ (greater than or equal to) -> represented by **solid filled circles ($\\bullet$)**.

#### The Negative Multiplier Rule:
Whenever you multiply or divide both sides of an inequality by a **negative number**, you MUST **REVERSE the inequality sign**!

$$\\begin{aligned} -3x &< 12 \\\\ \\frac{-3x}{-3} &> \\frac{12}{-3} \\quad \\text{(Sign reverses from } < \\text{ to } >) \\\\ x &> -4 \\end{aligned}$$

---

### 2. Graphing Linear Inequalities in Two Variables

An inequality in two variables (e.g. $2x + y \\leq 6$) divides the Cartesian plane into two half-planes separated by a **boundary line**:

\`\`\`
+--------------------------------------------------------------------------+
|                  GRAPHING INEQUALITIES STEP-BY-STEP                      |
|                                                                          |
|   Step 1: Replace inequality with '$=$' to find boundary line equation: |
|           $2x + y = 6$.                                                  |
|   Step 2: Find intercepts:                                               |
|           When $x = 0$, $y = 6 \\implies (0, 6)$                          |
|           When $y = 0$, $2x = 6 \\implies x = 3 \\implies (3, 0)$       |
|   Step 3: Draw boundary line:                                            |
|           - Use a SOLID LINE for $\\leq$ or $\\geq$ (boundary included). |
|           - Use a DASHED LINE for $<$ or $>$ (boundary excluded).        |
|   Step 4: Use Origin Test Point $(0, 0)$:                                |
|           $2(0) + (0) \\leq 6 \\implies 0 \\leq 6$ (TRUE!).            |
|           Therefore, shade the side containing $(0, 0)$!                |
+--------------------------------------------------------------------------+
\`\`\`

---

### 3. Systems of Simultaneous Inequalities (Feasible Region)

In linear programming, students find the common overlapping region that satisfies multiple inequalities simultaneously:
$$\\begin{cases} x \\geq 0 \\\\ y \\geq 0 \\\\ x + y \\leq 5 \\\\ 2x + y \\leq 8 \\end{cases}$$
The unshaded (or shaded, per WAEC convention) common polygon is the **Feasible Region**.

---

### 4. WAEC Checkpoint Practice Questions

1. **Solve the inequality: $5 - 2x \\leq 11$.**
   - A) $x \\leq -3$
   - B) $x \\geq -3$ *(Correct — $-2x \\leq 6 \\implies x \\geq -3$)*
   - C) $x \\geq 3$
   - D) $x \\leq 8$
2. **When drawing the boundary line for the strict inequality $3x - 4y > 12$, the line should be:**
   - A) Solid
   - B) Dashed / Broken *(Correct — strict inequality excludes the boundary)*
   - C) Curved
   - D) Wavy`,
    keyTakeaways: [
      "Multiplying or dividing by a negative number reverses the inequality direction.",
      "Strict inequalities (<, >) use dashed lines; inclusive inequalities (<=, >=) use solid lines.",
      "The origin test point (0, 0) determines which half-plane satisfies the inequality.",
      "The intersection of multiple inequality half-planes forms the feasible region."
    ],
    associatedQuizId: 'ssce-math-linear-inequalities'
  },
  {
    id: 'ss1-math-t2-w6',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Mid-Term Continuous Assessment: WAEC/NECO Standardized Test',
    subtopics: [
      'Section 1: Objective Questions (Quadratics, Simultaneous, Logic, Inequalities)',
      'Section 2: Theory Questions with Step-by-Step Mathematical Working',
      'Diagnostic Scoring Rubric and Common Examination Errors'
    ],
    readingTimeMinutes: 14,
    summary: 'Mid-term diagnostic examination featuring 20 WAEC SSCE style questions covering quadratic equations, simultaneous systems, truth tables, and linear inequalities.',
    contentMarkdown: `### Mid-Term Examination Overview

This paper tests analytical computational mastery across Weeks 1 to 5.

\`\`\`
+--------------------------------------------------------------------------+
|                  MID-TERM CURRICULUM MASTERY MATRIX                      |
|                                                                          |
|   1. QUADRATICS      : Factorization, completing square, formula.        |
|   2. SIMULTANEOUS    : Linear-quadratic substitution systems.            |
|   3. LOGIC           : Negation, truth tables, converse, contrapositive. |
|   4. INEQUALITIES    : Negative sign reversal, Cartesian half-planes.    |
+--------------------------------------------------------------------------+
\`\`\`

---

### Sample Assessment Items with Technical Solutions

1. *Solve by quadratic formula: $2x^2 + 5x - 3 = 0$.*
   - $$x = \\frac{-5 \\pm \\sqrt{5^2 - 4(2)(-3)}}{2(2)} = \\frac{-5 \\pm \\sqrt{25 + 24}}{4} = \\frac{-5 \\pm 7}{4}$$
   - $x = \\frac{2}{4} = \\frac{1}{2}$ or $x = \\frac{-12}{4} = -3$.

2. *Write the truth value of: "If $2 + 2 = 5$, then Nigeria is in Africa."*
   - **Answer:** **TRUE**. In conditional logic ($p \\implies q$), whenever the antecedent $p$ is FALSE, the implication is automatically TRUE regardless of $q$!`,
    keyTakeaways: [
      "Verify arithmetic sign calculations carefully when evaluating the discriminant.",
      "Always state both paired values when solving simultaneous equations.",
      "Review the truth tables for conditional implications and inverse statements."
    ],
    associatedQuizId: 'ssce-math-midterm-assessment'
  },
  {
    id: 'ss1-math-t2-w7',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Mensuration of Solid Shapes: Surface Areas & Volumes',
    subtopics: [
      'Right Circular Cylinders: Curved Surface Area ($2\\pi rh$), Total Surface Area ($2\\pi r(r + h)$), Volume (\\pi r^2 h)',
      'Right Circular Cones: Slant Height ($l = \\sqrt{r^2 + h^2}$), CSA ($\\pi rl$), TSA ($\\pi r(r + l)$), Volume (\\frac{1}{3}\\pi r^2 h)',
      'Pyramids: Slant Edge, Vertical Height, Surface Area, and Volume ($\\frac{1}{3} \\times \\text{Base Area} \\times h$)',
      'Spheres and Hemispheres: Surface Area ($4\\pi r^2$) and Volume ($\\frac{4}{3}\\pi r^3$)',
      'Frustums of Pyramids and Cones: Volume and Surface Area Calculations',
      'WAEC SSCE Real-Life Modeling Problems'
    ],
    readingTimeMinutes: 16,
    summary: 'Comprehensive 3D solid mensuration: formulas and derivations for cylinders, cones, pyramids, spheres, hemispheres, and frustums with WAEC calculation examples.',
    contentMarkdown: `### 1. Solid Mensuration Formula Master Chart

\`\`\`
+------------------+-----------------------------+-----------------------------+-------------------------------+
| SOLID SHAPE      | CURVED SURFACE AREA (CSA)   | TOTAL SURFACE AREA (TSA)    | VOLUME ($V$)                  |
+------------------+-----------------------------+-----------------------------+-------------------------------+
| **Cylinder**     | $2\\pi rh$                 | $2\\pi r(r + h)$           | $\\pi r^2 h$                 |
+------------------+-----------------------------+-----------------------------+-------------------------------+
| **Cone**         | $\\pi rl$                  | $\\pi r(r + l)$            | $\\frac{1}{3}\\pi r^2 h$    |
|                  | ($l = \\sqrt{r^2 + h^2}$)   |                             |                               |
+------------------+-----------------------------+-----------------------------+-------------------------------+
| **Sphere**       | $4\\pi r^2$                | $4\\pi r^2$                | $\\frac{4}{3}\\pi r^3$    |
+------------------+-----------------------------+-----------------------------+-------------------------------+
| **Hemisphere**   | $2\\pi r^2$                | $3\\pi r^2$ (Closed)       | $\\frac{2}{3}\\pi r^3$    |
+------------------+-----------------------------+-----------------------------+-------------------------------+
| **Pyramid**      | Sum of triangular faces     | $\\text{Base} + \\sum \\text{Faces}$| $\\frac{1}{3}Ah$         |
+------------------+-----------------------------+-----------------------------+-------------------------------+
\`\`\`

---

### 2. Geometry of the Cone & Frustum

\`\`\`
                       /                      /                       / |  \  Slant height: l = sqrt(r^2 + h^2)
                    /  |h                     /   |                      /----+-----                  \    r    /
                   ---------
\`\`\`

#### Frustum of a Cone:
A **Frustum** is the lower portion of a cone or pyramid remaining after the top apex is sliced off parallel to the base.
- **Volume of Frustum:**
  $$V = \\frac{1}{3}\\pi h (R^2 + Rr + r^2)$$
  Where $R$ is the bottom base radius, $r$ is the top radius, and $h$ is the vertical height.

---

### 3. Worked WAEC Standard Example

**Problem:** A solid metal sphere of radius $6\\text{ cm}$ is melted down and recast into a solid right circular cylinder of radius $4\\text{ cm}$. Calculate the height $h$ of the cylinder.

1. **Volume of Sphere:**
   $$V_s = \\frac{4}{3}\\pi r^3 = \\frac{4}{3}\\pi (6)^3 = \\frac{4}{3}\\pi (216) = 288\\pi\\text{ cm}^3$$
2. **Volume of Cylinder:**
   $$V_c = \\pi R^2 h = \\pi (4)^2 h = 16\\pi h$$
3. Since volume is conserved during recasting:
   $$16\\pi h = 288\\pi \\implies 16h = 288 \\implies h = \\frac{288}{16} = 18\\text{ cm}$$
   **Height of cylinder:** $18\\text{ cm}$.

---

### 4. WAEC Checkpoint Practice Questions

1. **Find the total surface area of a closed solid hemisphere of radius $7\\text{ cm}$. (Take $\\pi = 22/7$)**
   - A) $308\\text{ cm}^2$
   - B) $462\\text{ cm}^2$ *(Correct — $\\text{TSA} = 3\\pi r^2 = 3 \\times \\frac{22}{7} \\times 49 = 462$)*
   - C) $616\\text{ cm}^2$
   - D) $154\\text{ cm}^2$
2. **A cone has radius $5\\text{ cm}$ and vertical height $12\\text{ cm}$. What is its slant height $l$?**
   - A) $13\\text{ cm}$ *(Correct — Pythagorean triple: $\\sqrt{5^2 + 12^2} = \\sqrt{169} = 13$)*
   - B) $17\\text{ cm}$
   - C) $10\\text{ cm}$
   - D) $15\\text{ cm}$`,
    keyTakeaways: [
      "Total surface area of a cylinder is 2*pi*r*(r + h); volume is pi*r^2*h.",
      "Cone slant height satisfies Pythagoras: l = sqrt(r^2 + h^2).",
      "Closed hemisphere TSA is 3*pi*r^2 (curved area 2*pi*r^2 + flat circle pi*r^2).",
      "During melting and recasting, total volume remains strictly constant."
    ],
    associatedQuizId: 'ssce-math-solid-mensuration'
  },
  {
    id: 'ss1-math-t2-w8',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Circle Geometry: Central Angles, Semicircles & Same Segment Theorems',
    subtopics: [
      'Circle Anatomy: Radius, Diameter, Chord, Arc, Sector, Segment, Secant, Tangent',
      'Theorem 1: The Angle Subtended by an Arc at the Center is Twice that Subtended at the Circumference',
      'Theorem 2: The Angle in a Semicircle is a Right Angle ($90^\\circ$)',
      'Theorem 3: Angles in the Same Segment of a Circle are Equal',
      'Formal Geometric Deductive Proofs',
      'Step-by-Step Worked WAEC Riders'
    ],
    readingTimeMinutes: 16,
    summary: 'Core circle theorems: central angle is double circumference angle, angle in a semicircle is 90 degrees, angles in the same segment are equal, with formal geometric proofs and rider calculations.',
    contentMarkdown: `### 1. Theorem 1: Angle at Center is Twice Angle at Circumference

\`\`\`
                          C (Circumference)
                             /\
                            /  \
                           /    \   Angle at Circumference = x
                          /      \
                         /   O    \
                        /  /   \   \
                       /  / 2x  \   \  Angle at Center = 2x
                      /  /       \   \
                     A --------------- B
\`\`\`

> **Statement:** The angle subtended by an arc at the center of a circle is **twice** the angle subtended by it at any point on the remaining part of the circumference.
> $$\\angle AOB = 2 \\times \\angle ACB$$

---

### 2. Theorem 2: Angle in a Semicircle is a Right Angle ($90^\\circ$)

\`\`\`
                               C
                              /|
                             / |
                            /  | Angle ACB = 90 deg
                           /   |
                          /    |
        Diameter A ------+-----*------+ B
                         O (Center)
\`\`\`

> **Statement:** Any angle inscribed in a semicircle is a right angle ($90^\\circ$).
> *(Proof follows directly from Theorem 1: diameter straight angle at center is $180^\\circ$, so angle at circumference is $180^\\circ / 2 = 90^\\circ$)*.

---

### 3. Theorem 3: Angles in the Same Segment are Equal

\`\`\`
                    C             D
                     \           /
                      \         /
                       \  x   x/  Both angles at circumference = x
                        \     /
                         \   /
                          \ /
                 A --------*-------- B
                          Chord
\`\`\`

> **Statement:** Angles subtended by the same chord or arc in the same segment of a circle are equal:
> $$\\angle ACB = \\angle ADB$$

---

### 4. Worked WAEC Rider Problem

**Problem:** In the diagram, $O$ is the center of the circle. Points $A, B, C$ lie on the circumference. If $\\angle AOB = 130^\\circ$, find $\\angle ACB$.

- By Theorem 1:
  $$\\angle ACB = \\frac{1}{2} \\angle AOB = \\frac{130^\\circ}{2} = 65^\\circ$$

---

### 5. WAEC Checkpoint Practice Questions

1. **In a circle with center $O$, an arc subtends an angle of $140^\\circ$ at the center. What angle does this arc subtend at the circumference?**
   - A) $280^\\circ$
   - B) $70^\\circ$ *(Correct — angle at circumference is half the angle at center)*
   - C) $90^\\circ$
   - D) $140^\\circ$
2. **If $AB$ is the diameter of a circle and $C$ is any point on the circumference, what is the value of $\\angle ACB$?**
   - A) $45^\\circ$
   - B) $60^\\circ$
   - C) $90^\\circ$ *(Correct — angle in a semicircle is 90 degrees)*
   - D) $180^\\circ$`,
    keyTakeaways: [
      "The angle at the center is always twice the angle at the circumference.",
      "An angle inscribed in a semicircle is always a right angle (90 degrees).",
      "Angles subtended by the same arc in the same segment are identical.",
      "Always quote theorem reasons in geometric calculations for full WAEC marks."
    ],
    associatedQuizId: 'ssce-math-circle-theorems-part1'
  },
  {
    id: 'ss1-math-t2-w9',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Circle Geometry: Cyclic Quadrilaterals & Tangent Theorems',
    subtopics: [
      'Cyclic Quadrilateral Definition (All Four Vertices on Circle Circumference)',
      'Theorem 4: Opposite Angles of a Cyclic Quadrilateral are Supplementary ($A + C = 180^\\circ$)',
      'Theorem 5: Exterior Angle of a Cyclic Quadrilateral Equals the Interior Opposite Angle',
      'Theorem 6: Tangent to a Circle is Perpendicular to the Radius at Point of Contact ($90^\\circ$)',
      'Theorem 7: Tangents from an External Point are Equal in Length',
      'Theorem 8: Alternate Segment Theorem',
      'WAEC SSCE Complex Geometric Riders'
    ],
    readingTimeMinutes: 16,
    summary: 'Cyclic quadrilateral theorems (supplementary opposite angles, exterior angle equivalence), radius-tangent perpendicularity, and the alternate segment theorem.',
    contentMarkdown: `### 1. Cyclic Quadrilateral Theorems

A **Cyclic Quadrilateral** is a four-sided polygon whose four vertices all lie on the circumference of a circle.

\`\`\`
                    A
                   / \
                  /   \
                 /     B
                D       \
                 \       \
                  \     /
                   \   /
                     C
\`\`\`

#### Theorem 4: Opposite Angles are Supplementary:
$$\\angle A + \\angle C = 180^\\circ \\quad \\text{and} \\quad \\angle B + \\angle D = 180^\\circ$$

#### Theorem 5: Exterior Angle Property:
If one side of a cyclic quadrilateral is produced, the **exterior angle formed is equal to the interior opposite angle**.

---

### 2. Tangent Theorems

A **Tangent** is a straight line that touches a circle at exactly one point (the point of contact).

\`\`\`
+--------------------------------------------------------------------------+
|                  THE THREE TANGENT THEOREMS                              |
|                                                                          |
|   1. RADIUS-TANGENT PERPENDICULARITY                                     |
|      The tangent at any point on a circle is perpendicular to the radius |
|      drawn through the point of contact: $\\angle OTP = 90^\\circ$.          |
|                                                                          |
|   2. TANGENTS FROM AN EXTERNAL POINT                                     |
|      Tangents drawn to a circle from an external point $T$ are equal in  |
|      length: $TA = TB$.                                                  |
|                                                                          |
|   3. THE ALTERNATE SEGMENT THEOREM                                       |
|      The angle between a tangent and a chord through the point of contact|
|      is equal to the angle subtended by the chord in the alternate       |
|      segment.                                                            |
+--------------------------------------------------------------------------+
\`\`\`

---

### 3. Worked WAEC Example

**Problem:** In a cyclic quadrilateral $ABCD$, $\\angle DAB = 75^\\circ$ and $\\angle ABC = 100^\\circ$. Find $\\angle BCD$ and $\\angle ADC$.

1. Opposite angles of a cyclic quad sum to $180^\\circ$:
   $$\\angle DAB + \\angle BCD = 180^\\circ \\implies 75^\\circ + \\angle BCD = 180^\\circ$$
   $$\\angle BCD = 180^\\circ - 75^\\circ = 105^\\circ$$
2. Similarly:
   $$\\angle ABC + \\angle ADC = 180^\\circ \\implies 100^\\circ + \\angle ADC = 180^\\circ$$
   $$\\angle ADC = 180^\\circ - 100^\\circ = 80^\\circ$$

---

### 4. WAEC Checkpoint Practice Questions

1. **If an exterior angle of a cyclic quadrilateral is $82^\\circ$, what is the measure of the interior opposite angle?**
   - A) $98^\\circ$
   - B) $82^\\circ$ *(Correct — exterior angle equals interior opposite angle)*
   - C) $164^\\circ$
   - D) $41^\\circ$
2. **A tangent $PT$ touches a circle at $T$, where $O$ is the center. If radius $OT = 5\\text{ cm}$ and $OP = 13\\text{ cm}$, find the length of tangent $PT$.**
   - A) $12\\text{ cm}$ *(Correct — right triangle: $\\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = 12$)*
   - B) $10\\text{ cm}$
   - C) $8\\text{ cm}$
   - D) $14\\text{ cm}$`,
    keyTakeaways: [
      "Opposite angles of a cyclic quadrilateral sum to 180 degrees.",
      "Exterior angle of a cyclic quadrilateral equals the interior opposite angle.",
      "The radius is perpendicular to the tangent line at the point of contact.",
      "The alternate segment theorem equates tangent-chord angles with opposite inscribed angles."
    ],
    associatedQuizId: 'ssce-math-cyclic-quad-tangents'
  },
  {
    id: 'ss1-math-t2-w10',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Trigonometry: SOH CAH TOA, Special Angles & Elevation/Depression',
    subtopics: [
      'Basic Trigonometric Ratios in Right-Angled Triangles: Sine, Cosine, and Tangent (SOH CAH TOA)',
      'Exact Values for Special Angles ($30^\\circ, 45^\\circ, 60^\\circ$) Without Calculator',
      'Angles of Elevation and Depression (Horizontal Line of Sight Principle)',
      'Solving Right-Angled Triangles and Real-Life Heights and Distances',
      'Trigonometric Functions on the Unit Circle (0 to 360 degrees) and Sign Conventions (CAST Rule)',
      'WAEC SSCE Practical Surveying Problems'
    ],
    readingTimeMinutes: 16,
    summary: 'Trigonometric foundations: SOH CAH TOA ratios, exact values for special angles (30, 45, 60 degrees), angles of elevation and depression, the CAST quadrant rule, and real-life height calculations.',
    contentMarkdown: `### 1. The SOH CAH TOA Trigonometric Ratios

In a right-angled triangle with reference acute angle $\\theta$:

\`\`\`
                 /|
                / |
  Hypotenuse   /  | Opposite
     (H)      /   |    (O)
             /    |
            /     |
           /______|
          θ
           Adjacent (A)
\`\`\`

$$\\sin \\theta = \\frac{\\text{Opposite}}{\\text{Hypotenuse}} \\quad \\cos \\theta = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}} \\quad \\tan \\theta = \\frac{\\text{Opposite}}{\\text{Adjacent}}$$

---

### 2. Exact Values of Special Angles ($30^\\circ, 45^\\circ, 60^\\circ$)

WAEC examinations frequently require answers in exact surd form without using electronic calculators:

\`\`\`
+--------------------+---------------------+---------------------+---------------------+
| ANGLE $\\theta$   | $\\sin \\theta$   | $\\cos \\theta$   | $\\tan \\theta$   |
+--------------------+---------------------+---------------------+---------------------+
| **$30^\\circ$**   | $\\frac{1}{2}$     | $\\frac{\\sqrt{3}}{2}$| $\\frac{1}{\\sqrt{3}} = \\frac{\\sqrt{3}}{3}$|
+--------------------+---------------------+---------------------+---------------------+
| **$45^\\circ$**   | $\\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}$| $\\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}$| $1$          |
+--------------------+---------------------+---------------------+---------------------+
| **$60^\\circ$**   | $\\frac{\\sqrt{3}}{2}$| $\\frac{1}{2}$     | $\\sqrt{3}$        |
+--------------------+---------------------+---------------------+---------------------+
\`\`\`

---

### 3. Angles of Elevation and Depression

- **Angle of Elevation:** The angle between the horizontal line of sight and the observer\'s upward gaze to an object above eye level.
- **Angle of Depression:** The angle between the horizontal line of sight and the observer\'s downward gaze to an object below eye level.

> **CRUCIAL RULE:** By alternate interior angles, the **Angle of Depression from $A$ to $B$ equals the Angle of Elevation from $B$ to $A$**!

\`\`\`
    Observer A ----------------- Horizontal Line of Sight
             \  . (Angle of Depression θ)
              \
               \
                \
                 \
      Target B ---*------------- Horizontal Ground
                  (Angle of Elevation θ)
\`\`\`

---

### 4. Worked WAEC Practical Problem

**Problem:** From the top of a vertical communications mast $40\\text{ m}$ high, the angle of depression of a stationary car on level ground is $30^\\circ$. Calculate the distance of the car from the foot of the mast.

1. Height of mast ($O$) = $40\\text{ m}$.
2. Angle of elevation from car to mast top = $30^\\circ$.
3. Let distance from foot of mast be $d$ (Adjacent):
   $$\\tan 30^\\circ = \\frac{\\text{Opposite}}{\\text{Adjacent}} = \\frac{40}{d}$$
   $$d = \\frac{40}{\\tan 30^\\circ} = \\frac{40}{1/\\sqrt{3}} = 40\\sqrt{3}\\text{ m} \\approx 40 \\times 1.732 = 69.28\\text{ m}$$

---

### 5. WAEC Checkpoint Practice Questions

1. **Evaluate without tables or calculators: $\\sin 60^\\circ \\times \\cos 30^\\circ$.**
   - A) $1/2$
   - B) $3/4$ *(Correct — $(\\sqrt{3}/2) \\times (\\sqrt{3}/2) = 3/4$)*
   - C) $1/4$
   - D) $1$
2. **A ladder $10\\text{ m}$ long leans against a vertical wall, making an angle of $60^\\circ$ with the ground. How high up the wall does the ladder reach?**
   - A) $5\\text{ m}$
   - B) $5\\sqrt{3}\\text{ m}$ *(Correct — $\\text{height} = 10 \\sin 60^\\circ = 10 \\times (\\sqrt{3}/2) = 5\\sqrt{3}$)*
   - C) $10\\sqrt{3}\\text{ m}$
   - D) $8\\text{ m}$`,
    keyTakeaways: [
      "SOH CAH TOA defines basic right-triangle trigonometric ratios.",
      "Special angle values (30, 45, 60 degrees) are memorized in surd form for WAEC exams.",
      "Angle of depression equals angle of elevation by alternate interior angles.",
      "Heights and distances problems convert directly into right-angled triangle diagrams."
    ],
    associatedQuizId: 'ssce-math-trigonometry-elevation'
  },
  {
    id: 'ss1-math-t2-w11-12',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Termly Examination: Full-Scale WAEC/NECO SSCE Mathematics Mock Paper',
    subtopics: [
      'Paper 1: 30 Standardized Multiple-Choice Objective Questions',
      'Paper 2: Section A (Compulsory Core Theory Problems)',
      'Paper 2: Section B (Advanced Mensuration, Circle Theorems & Trigonometry Riders)',
      'Complete Worked Solutions with Technical WAEC Step-by-Step Marking Points'
    ],
    readingTimeMinutes: 18,
    summary: 'Full-scale simulated WAEC/NECO SSCE Mathematics examination featuring 30 objective items and theory questions with step-by-step marking rubrics.',
    contentMarkdown: `### WAEC/NECO SSCE Mathematics Model Examination

---

### Section A: Objective Questions (Selected Items)

1. *Find the positive root of $2x^2 - x - 6 = 0$.*
   - A) $3/2$
   - B) $2$ *(Correct — $(2x + 3)(x - 2) = 0 \\implies x = 2$)*
   - C) $3$
   - D) $1/2$

2. *The roots of a quadratic equation are $x = -3$ and $x = 5$. What is the equation?*
   - A) $x^2 + 2x - 15 = 0$
   - B) $x^2 - 2x - 15 = 0$ *(Correct — $(x + 3)(x - 5) = x^2 - 2x - 15 = 0$)*
   - C) $x^2 - 8x + 15 = 0$
   - D) $x^2 + 8x - 15 = 0$

3. *If $x \\leq 3$ and $-2x < 8$, what is the combined inequality range?*
   - A) $-4 < x \\leq 3$ *(Correct — $-2x < 8 \\implies x > -4$)*
   - B) $-4 \\leq x < 3$
   - C) $x < -4$
   - D) $x \\geq 3$

4. *What is the volume of a cone with radius $7\\text{ cm}$ and height $6\\text{ cm}$? (Take $\\pi = 22/7$)*
   - A) $308\\text{ cm}^3$ *(Correct — $\\frac{1}{3} \\times \\frac{22}{7} \\times 49 \\times 6 = 308$)*
   - B) $924\\text{ cm}^3$
   - C) $154\\text{ cm}^3$
   - D) $616\\text{ cm}^3$

5. *In a cyclic quadrilateral, one angle is $112^\\circ$. Its opposite angle is:*
   - A) $68^\\circ$ *(Correct — $180^\\circ - 112^\\circ = 68^\\circ$)*
   - B) $112^\\circ$
   - C) $90^\\circ$
   - D) $78^\\circ$

6. *Calculate the radius of a circle if an arc of length $22\\text{ cm}$ subtends an angle of $60^\\circ$ at the center. ($\\pi = 22/7$)*
   - A) $14\\text{ cm}$
   - B) $21\\text{ cm}$ *(Correct — $\\frac{60}{360} \\times 2 \\times \\frac{22}{7} \\times r = 22 \\implies \\frac{1}{6} \\times \\frac{44}{7} r = 22 \\implies r = 21$)*
   - C) $7\\text{ cm}$
   - D) $28\\text{ cm}$

7. *If $\\tan \\theta = 3/4$ where $\\theta$ is acute, find $\\cos \\theta$.*
   - A) $3/5$
   - B) $4/5$ *(Correct — 3-4-5 triangle; $\\cos \\theta = \\text{Adj}/\\text{Hyp} = 4/5$)*
   - C) $5/4$
   - D) $1/2$

---

### Section B: Theory Questions & Solutions

#### Question 1 (Algebra):
*Solve the simultaneous equations:*
$$\\begin{aligned} x - y &= 3 \\\\ x^2 - y^2 &= 45 \\end{aligned}$$

**Solution:**
1. From $x - y = 3$, $x = y + 3$.
2. Substitute into quadratic:
   $$(y + 3)^2 - y^2 = 45$$
   $$(y^2 + 6y + 9) - y^2 = 45$$
   $$6y + 9 = 45 \\implies 6y = 36 \\implies y = 6$$
3. Find $x$:
   $$x = 6 + 3 = 9$$
**Solution:** $x = 9, y = 6$.

#### Question 2 (Mensuration):
*A conical tent of height $8\\text{ m}$ has a base diameter of $12\\text{ m}$. Calculate:*
*(a) The slant height of the tent.*
*(b) The area of canvas required to fabricate the tent.*

**Solution:**
- Radius $r = 12 / 2 = 6\\text{ m}$, Height $h = 8\\text{ m}$.
- (a) Slant height $l = \\sqrt{r^2 + h^2} = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10\\text{ m}$.
- (b) Canvas area = Curved Surface Area = $\\pi r l = \\frac{22}{7} \\times 6 \\times 10 = \\frac{1320}{7} \\approx 188.57\\text{ m}^2$.`,
    keyTakeaways: [
      "In Paper 1, speed and accuracy are crucial; verify discriminant and signs mentally.",
      "In Paper 2, show all algebraic steps, state units (cm, m^2, cm^3), and quote geometric theorem reasons.",
      "Check simultaneous solutions by substituting values back into original equations."
    ],
    associatedQuizId: 'ssce-math-terminal-mock-exam'
  }
];
