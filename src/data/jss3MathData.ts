import { CurriculumTopic } from '../types';

export const JSS3_MATH_TOPICS: CurriculumTopic[] = [
  // ==========================================
  // WEEK 1
  // ==========================================
  {
    id: 'jss3-math-t2-w1',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Simultaneous Linear Equations: Elimination & Substitution Methods',
    subtopics: [
      'Concept of Simultaneous Linear Equations in Two Unknowns',
      'The Elimination Method: Balancing Coefficients & Add/Subtract Rules',
      'The Substitution Method: Expressing One Unknown in Terms of Another',
      'Real-Life Word Problems (Commerce, Transportation & Trading in Nigeria)',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 14,
    summary: 'Mastering dual-unknown simultaneous linear equations: algebraic elimination by coefficient matching, variable substitution paradigms, commercial word problem translation, and step-by-step worked solutions.',
    contentMarkdown: `### 1. What are Simultaneous Linear Equations?

A linear equation in two variables has the general form:
$$ax + by = c$$
where $a, b,$ and $c$ are constant real numbers, and $x$ and $y$ are unknown variables. A single linear equation with two unknowns has an infinite number of coordinate solutions.

However, when **two linear equations** involving the same pair of variables are considered together, they form a **system of simultaneous linear equations**:
$$\\begin{cases} a_1 x + b_1 y = c_1 \\\\ a_2 x + b_2 y = c_2 \\end{cases}$$
The solution is the unique pair of values $(x, y)$ that simultaneously satisfies **both** equations.

---

### 2. Method 1: The Elimination Method

The objective of the elimination method is to eliminate one of the unknown variables by making its numerical coefficients equal in magnitude, then adding or subtracting the two equations.

#### Standard Procedural Algorithm:
1. Arrange both equations in the standard form: $ax + by = c$.
2. Inspect the coefficients of $x$ or $y$. If they are not equal, multiply one or both equations by suitable non-zero constants so that the coefficients of one variable become equal.
3. **Elimination Rule:**
   - If the signs of the targeted coefficients are the **SAME**, **SUBTRACT** one equation from the other.
   - If the signs of the targeted coefficients are **DIFFERENT (OPPOSITE)**, **ADD** the two equations.
4. Solve the resulting single-variable linear equation.
5. Substitute this value back into either original equation to calculate the second unknown variable.
6. Check your solution by verifying that both values satisfy the other equation.

#### Worked Example 1 (Elimination):
Solve simultaneously for $x$ and $y$:
$$2x + 3y = 13 \\quad \\text{--- (Equation 1)}$$
$$5x - 2y = 4 \\quad \\text{--- (Equation 2)}$$

**Step 1: Balance Coefficients of $y$**  
Multiply Equation 1 by $2$ and Equation 2 by $3$:
$$2 \\times (2x + 3y = 13) \\implies 4x + 6y = 26 \\quad \\text{--- (Equation 3)}$$
$$3 \\times (5x - 2y = 4) \\implies 15x - 6y = 12 \\quad \\text{--- (Equation 4)}$$

**Step 2: Eliminate $y$ (Signs are opposite: $+6y$ and $-6y$, so ADD):**
$$(4x + 15x) + (6y - 6y) = 26 + 12$$
$$19x = 38$$
$$x = \\frac{38}{19} = 2$$

**Step 3: Substitute $x = 2$ into Equation 1:**
$$2(2) + 3y = 13$$
$$4 + 3y = 13$$
$$3y = 13 - 4$$
$$3y = 9 \\implies y = 3$$

**Final Solution:**
$$\\mathbf{x = 2, \\quad y = 3} \\quad \\text{or as an ordered pair: } (2, 3)$$

---

### 3. Method 2: The Substitution Method

In the substitution method, we isolate one variable from one equation and substitute its algebraic expression into the other equation.

#### Worked Example 2 (Substitution):
Solve simultaneously:
$$x + 2y = 8 \\quad \\text{--- (Equation 1)}$$
$$3x - 4y = 4 \\quad \\text{--- (Equation 2)}$$

**Step 1: Make $x$ the subject in Equation 1:**
$$x = 8 - 2y \\quad \\text{--- (Equation 3)}$$

**Step 2: Substitute $(8 - 2y)$ in place of $x$ in Equation 2:**
$$3(8 - 2y) - 4y = 4$$
$$24 - 6y - 4y = 4$$
$$24 - 10y = 4$$
$$-10y = 4 - 24$$
$$-10y = -20$$
$$y = \\frac{-20}{-10} = 2$$

**Step 3: Substitute $y = 2$ into Equation 3:**
$$x = 8 - 2(2) = 8 - 4 = 4$$

**Final Solution:**
$$\\mathbf{x = 4, \\quad y = 2}$$

---

### 4. Real-Life Commercial Word Problems

#### Nigerian Market Scenario:
> *At the bustling Bodija Market in Ibadan, Mrs. Adeleke bought 3 tubers of yam and 4 cups of melon seeds (egusi) for ₦2,900. On the same day at the same stall, Mrs. Bello bought 5 tubers of yam and 2 cups of melon seeds for ₦3,900. What is the individual cost of one tuber of yam and one cup of melon seeds?*

**Mathematical Formulation:**
- Let the cost of one tuber of yam $= y$
- Let the cost of one cup of melon seeds $= m$

$$\\begin{cases} 3y + 4m = 2900 \\quad \\text{--- (1)} \\\\ 5y + 2m = 3900 \\quad \\text{--- (2)} \\end{cases}$$

**Step 1: Eliminate $m$ by multiplying Equation 2 by $2$:**
$$2 \\times (5y + 2m = 3900) \\implies 10y + 4m = 7800 \\quad \\text{--- (3)}$$

**Step 2: Subtract Equation 1 from Equation 3:**
$$(10y - 3y) + (4m - 4m) = 7800 - 2900$$
$$7y = 4900$$
$$y = \\frac{4900}{7} = 700$$
One tuber of yam costs **₦700**.

**Step 3: Substitute $y = 700$ into Equation 2:**
$$5(700) + 2m = 3900$$
$$3500 + 2m = 3900$$
$$2m = 3900 - 3500$$
$$2m = 400 \\implies m = 200$$
One cup of melon seeds costs **₦200**.

---

### 5. BECE Checkpoint Practice Questions

1. If $x + y = 10$ and $x - y = 4$, what is the value of $xy$?
   - A. 14
   - B. 21
   - C. 24
   - D. 40
   *(Answer: **B**. Adding equations gives $2x = 14 \\implies x = 7$. Then $y = 3$. Therefore, $xy = 7 \\times 3 = 21$.)*

2. Solve for $x$ and $y$: $3x + y = 7$ and $2x - y = 3$.
   - A. $x = 2, y = 1$
   - B. $x = 1, y = 4$
   - C. $x = 3, y = -2$
   - D. $x = 2, y = 3$
   *(Answer: **A**. Adding the two equations eliminates $y$: $5x = 10 \\implies x = 2$. Substituting gives $3(2) + y = 7 \\implies y = 1$.)*

3. If $2a + 3b = 12$ and $b = 2$, find $a$:
   - A. 2
   - B. 3
   - C. 4
   - D. 6
   *(Answer: **B**. $2a + 3(2) = 12 \\implies 2a + 6 = 12 \\implies 2a = 6 \\implies a = 3$.)*

4. The sum of two numbers is 25 and their difference is 7. Find the larger number:
   - A. 14
   - B. 16
   - C. 18
   - D. 20
   *(Answer: **B**. Let numbers be $x$ and $y$: $x + y = 25$ and $x - y = 7$. Adding gives $2x = 32 \\implies x = 16$.)*`,
    keyTakeaways: [
      'Simultaneous equations identify the unique pair of values that satisfy two linear equations at the same time.',
      'In elimination, add equations when coefficients have opposite signs; subtract when signs are identical.',
      'In substitution, express one variable in terms of the other and plug it into the remaining equation.',
      'Always test your calculated solution in both original equations to ensure zero arithmetic error.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },

  // ==========================================
  // WEEK 2
  // ==========================================
  {
    id: 'jss3-math-t2-w2',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Graphical Solution of Simultaneous Linear Equations',
    subtopics: [
      'Constructing Tables of Values for Linear Functions (y = mx + c)',
      'Cartesian Plane Axes & Choice of Scales',
      'Plotting Coordinate Points & Drawing Continuous Straight Lines',
      'The Point of Intersection as the Simultaneous Solution',
      'Special Cases: Parallel Lines (No Solution) & Coincident Lines (Infinite Solutions)'
    ],
    readingTimeMinutes: 14,
    summary: 'Visualizing simultaneous equations on Cartesian coordinate grids: generating tables of values, precision plotting, determining intersection points, and analyzing geometric system behaviors.',
    contentMarkdown: `### 1. The Graphical Principle

Every linear equation of the form $ax + by = c$ represents a **straight line** when plotted on the two-dimensional Cartesian coordinate plane.

When two linear equations are plotted on the same grid:
- The coordinates of the **point of intersection** $(x_0, y_0)$ represent the **exact simultaneous solution** satisfying both equations.

\`\`\`
       y-axis
         ▲
       5 │         Line 1: x + y = 5
       4 │              \
       3 │               \    Intersection Point: (3, 2)
       2 │────────────────●───────────────► Line 2: y = 2
       1 │                 \
      ───┼───┬───┬───┬───┬───┬───► x-axis
       0 │   1   2   3   4   5
\`\`\`

---

### 2. Step-by-Step Graphical Method

#### Step 1: Re-arrange into Explicit Form ($y = mx + c$)
Make $y$ the subject of each equation to facilitate straightforward calculation.

#### Step 2: Construct Tables of Values
Choose at least three integer values of $x$ (e.g., $x = 0, 2, 4$) to compute corresponding $y$ values. Generating three points guarantees a check: if all three points do not lie on a single straight line, an arithmetic mistake occurred!

#### Worked Example:
Solve graphically:
$$\\text{Line 1:} \\quad x + y = 4 \\implies y = 4 - x$$
$$\\text{Line 2:} \\quad 2x - y = 2 \\implies y = 2x - 2$$

#### Table of Values:
**For Line 1: $y = 4 - x$**
| $x$ | $0$ | $2$ | $4$ |
| :---: | :---: | :---: | :---: |
| $y$ | $4$ | $2$ | $0$ |
| **Point** | $(0, 4)$ | $(2, 2)$ | $(4, 0)$ |

**For Line 2: $y = 2x - 2$**
| $x$ | $0$ | $2$ | $3$ |
| :---: | :---: | :---: | :---: |
| $y$ | $-2$ | $2$ | $4$ |
| **Point** | $(0, -2)$ | $(2, 2)$ | $(3, 4)$ |

---

### 3. Plotting & Reading the Intersection Point

1. Draw perpendicular horizontal ($x$-axis) and vertical ($y$-axis) lines intersecting at the origin $(0, 0)$.
2. Label scales clearly (e.g., $2\\text{ cm} = 1\\text{ unit}$).
3. Plot points for Line 1 and draw a thin, straight line through them using a long ruler. Label it $x + y = 4$.
4. Plot points for Line 2 and draw the second straight line. Label it $2x - y = 2$.
5. Inspect the grid: Both lines intersect at the point:
   $$\\mathbf{(x, y) = (2, 2)}$$
   Therefore, the simultaneous solution is:
   $$\\mathbf{x = 2, \\quad y = 2}$$

---

### 4. Classification of Linear Systems

| System Type | Geometric Appearance | Number of Solutions |
| :--- | :--- | :--- |
| **Consistent & Independent** | Two lines intersect at exactly **one single point**. | **One unique solution** $(x, y)$. |
| **Inconsistent (Parallel)** | Lines have identical slopes ($m_1 = m_2$) and **never intersect**. | **No solution** ($0$). |
| **Dependent (Coincident)** | Both equations represent the **exact same line**. | **Infinitely many solutions**. |

---

### 5. BECE Checkpoint Practice Questions

1. What does the point of intersection of two straight lines on a graph represent?
   - A. The $y$-intercept of the first line
   - B. The simultaneous solution of both linear equations
   - C. The origin $(0, 0)$
   - D. The slope of the second line
   *(Answer: **B**. The intersection point satisfies both linear equations simultaneously.)*

2. If two linear equations have graphs that are parallel lines, the system has:
   - A. Exactly one solution
   - B. Two distinct solutions
   - C. No solution
   - D. Infinitely many solutions
   *(Answer: **C**. Parallel lines never meet, hence there is no solution.)*

3. Which coordinate point lies on the line $y = 3x - 1$?
   - A. $(1, 3)$
   - B. $(2, 5)$
   - C. $(0, 1)$
   - D. $(3, 7)$
   *(Answer: **B**. For $x = 2$: $y = 3(2) - 1 = 6 - 1 = 5$, giving $(2, 5)$.)*

4. The line $x = 4$ is:
   - A. A horizontal line parallel to the $x$-axis
   - B. A vertical line parallel to the $y$-axis
   - C. A line passing through the origin
   - D. Slanted at $45^\circ$
   *(Answer: **B**. $x = 4$ is a vertical line perpendicular to the $x$-axis at $x = 4$.)*`,
    keyTakeaways: [
      'The point where two straight lines intersect on a graph gives the simultaneous solution.',
      'Always calculate at least 3 coordinate points per line to verify collinearity and catch arithmetic slips.',
      'Parallel lines share the same slope and have no simultaneous solution.',
      'Label axes, origin, scales, and line equations clearly to maximize presentation marks in BECE theory papers.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },

  // ==========================================
  // WEEK 3
  // ==========================================
  {
    id: 'jss3-math-t2-w3',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Linear Inequalities in One Variable & Number Line Graphs',
    subtopics: [
      'Meaning of Inequality Symbols (<, ≤, >, ≥)',
      'The Golden Inversion Rule: Multiplying or Dividing by Negative Numbers',
      'Solving Multi-Step Linear Inequalities with Brackets & Fractions',
      'Graphical Representation on the 1-Dimensional Real Number Line',
      'Combining Inequalities (Double Inequalities: a ≤ x < b)'
    ],
    readingTimeMinutes: 14,
    summary: 'Mastering linear inequality algebra: operational properties, negative division reversal mechanics, solution set notation, real number line graphing with open/closed circles, and compound inequalities.',
    contentMarkdown: `### 1. Inequality Symbols & Meaning

An **inequality** is a mathematical statement showing that two expressions are not equal, using one of four comparison symbols:

| Symbol | Mathematical Meaning | Strict / Non-Strict | Circle on Number Line |
| :---: | :--- | :--- | :---: |
| **$<$** | Strictly less than | Strict | **Open circle** ( $\\circ$ ) |
| **$>$** | Strictly greater than | Strict | **Open circle** ( $\\circ$ ) |
| **$\\le$** | Less than or equal to | Non-strict | **Solid dot** ( $\\bullet$ ) |
| **$\\ge$** | Greater than or equal to | Non-strict | **Solid dot** ( $\\bullet$ ) |

---

### 2. The Golden Rule of Inequalities

> **CRITICAL LAW**: Whenever you **MULTIPLY** or **DIVIDE** both sides of an inequality by a **NEGATIVE NUMBER**, you **MUST REVERSE (INVERT)** the direction of the inequality sign!

#### Proof by Demonstration:
We know that:
$$2 < 5$$
Multiply both sides by $-1$:
$$-2 \\quad \\text{vs} \\quad -5$$
On the real number line, $-2$ is to the right of $-5$, so $-2$ is **greater** than $-5$:
$$-2 > -5$$
Notice that the $<$ flipped to $>$!

---

### 3. Worked Examples

#### Example 1: Basic Solving with Inversion
Solve: $-3x + 4 \\le 19$

**Solution:**
Subtract $4$ from both sides:
$$-3x \\le 19 - 4$$
$$-3x \\le 15$$
Divide both sides by $-3$ (**REVERSE THE SIGN**):
$$x \\ge \\frac{15}{-3}$$
$$\\mathbf{x \\ge -5}$$

---

#### Example 2: Multi-Step Inequality with Brackets
Solve: $3(2x - 1) > 4x + 7$

**Solution:**
Expand brackets:
$$6x - 3 > 4x + 7$$
Collect terms in $x$ on the left-hand side:
$$6x - 4x > 7 + 3$$
$$2x > 10$$
Divide by $+2$ (positive divisor, so sign stays the same):
$$\\mathbf{x > 5}$$

---

### 4. Graphing Inequalities on the Real Number Line

\`\`\`
Case 1: x > 3 (Strict — Open circle at 3, arrow pointing RIGHT)
         ○────────────────►
───┼───┬───┬───┬───┬───┬───┬───
  -1   0   1   2   3   4   5

Case 2: x ≤ -1 (Non-strict — Solid dot at -1, arrow pointing LEFT)
◄────────●
───┼───┬───┬───┬───┬───┬───┬───
  -3  -2  -1   0   1   2   3

Case 3: Combined inequality: -2 ≤ x < 3 (From -2 inclusive to 3 exclusive)
         ●─────────────○
───┼───┬───┬───┬───┬───┬───┬───
  -3  -2  -1   0   1   2   3
\`\`\`

---

### 5. BECE Checkpoint Practice Questions

1. If $-4x < 12$, what is the solution for $x$?
   - A. $x < -3$
   - B. $x > -3$
   - C. $x > 3$
   - D. $x < 3$
   *(Answer: **B**. Dividing by negative 4 reverses the inequality: $x > -3$.)*

2. Solve the inequality: $2x - 5 \\ge 7$
   - A. $x \\ge 1$
   - B. $x \\ge 6$
   - C. $x \\le 6$
   - D. $x \\ge 12$
   *(Answer: **B**. $2x \\ge 12 \\implies x \\ge 6$.)*

3. Which integers satisfy the double inequality $-2 < x \\le 2$?
   - A. $\\{-2, -1, 0, 1, 2\\}$
   - B. $\\{-1, 0, 1, 2\\}$
   - C. $\\{-1, 0, 1\\}$
   - D. $\\{0, 1, 2\\}$
   *(Answer: **B**. Since $x > -2$ strictly, $-2$ is excluded; since $x \\le 2$, $2$ is included.)*

4. On a number line graph, an **open unshaded circle** indicates that the boundary value is:
   - A. Included in the solution set
   - B. Excluded from the solution set
   - C. Equal to zero
   - D. An imaginary number
   *(Answer: **B**. Open circles represent strict inequalities $<$ and $>$ where boundary points are excluded.)*`,
    keyTakeaways: [
      'Multiplying or dividing by a negative number reverses the inequality direction.',
      'Strict inequalities (<, >) use open circles; non-strict (≤, ≥) use solid dots on number lines.',
      'Combined inequalities represent intervals bounded between two endpoints on the real number line.',
      'Check boundary values by testing numbers inside and outside the solution set.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },

  // ==========================================
  // WEEK 4
  // ==========================================
  {
    id: 'jss3-math-t2-w4',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Trigonometry: Angles of Elevation, Depression & 3-Figure Compass Bearings',
    subtopics: [
      'Trigonometric Ratios in Right-Angled Triangles (SOH-CAH-TOA)',
      'Angle of Elevation (Looking Upwards from the Horizontal)',
      'Angle of Depression (Looking Downwards from the Horizontal)',
      'Proof of Equality: Angle of Elevation = Angle of Depression',
      '3-Figure Compass Bearings (000° to 360° Measured Clockwise from True North)'
    ],
    readingTimeMinutes: 14,
    summary: 'Mastering right-angled triangle trigonometry and navigation: SOH-CAH-TOA trigonometric ratios, elevation and depression angles, height-and-distance geometric proofs, and 3-figure compass bearing navigation.',
    contentMarkdown: `### 1. The Right-Angled Triangle Trigonometric Ratios (SOH-CAH-TOA)

In any right-angled triangle, with respect to an acute reference angle $\\theta$:
- **Hypotenuse (Hyp):** The longest side opposite the $90^\\circ$ right angle.
- **Opposite (Opp):** The side directly across from the reference angle $\\theta$.
- **Adjacent (Adj):** The side forming the angle $\\theta$ alongside the hypotenuse.

\`\`\`
                  A
                  ▲
                  │\
                  │ \
                  │  \  Hypotenuse
   Opposite (h)   │   \
                  │    \
                  │  θ  \
                B └──────► C
                   Adjacent (d)
\`\`\`

$$\\sin \\theta = \\frac{\\text{Opposite}}{\\text{Hypotenuse}} \\quad (\\text{SOH})$$
$$\\cos \\theta = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}} \\quad (\\text{CAH})$$
$$\\tan \\theta = \\frac{\\text{Opposite}}{\\text{Adjacent}} \\quad (\\text{TOA})$$

---

### 2. Angles of Elevation and Depression

\`\`\`
Observer at Top (Cliff/Tower)
        Horizontal Line of Sight ────────────────┐
        \                                        │
         \ Angle of Depression (θ)               │
          \                                      │ Height (h)
           \                                     │
            \ Angle of Elevation (θ)             │
             └───────────────────────────────────┘
               Ground Observer      Distance (d)
\`\`\`

- **Angle of Elevation:** The angle measured **upwards** between the horizontal line of sight and the observer's line of sight to an elevated object.
- **Angle of Depression:** The angle measured **downwards** between the horizontal line of sight and the observer's line of sight to an object below.
- **Geometric Equality:** Because the two horizontal lines of sight are parallel, the angle of elevation and the angle of depression are **alternate interior angles**:
  $$\\mathbf{\\text{Angle of Elevation} = \\text{Angle of Depression}}$$

#### Worked Example:
> *A student stands at a horizontal distance of $40\\text{ meters}$ away from the base of a telecommunications transmission mast in Abuja. The angle of elevation of the top of the mast from ground level is $30^\\circ$. Calculate the height of the mast. (Take $\\tan 30^\\circ = 0.5774$).*

**Solution:**
From right-angled triangle trigonometry:
$$\\tan \\theta = \\frac{\\text{Opposite}}{\\text{Adjacent}} = \\frac{\\text{Height } (h)}{40}$$
$$h = 40 \\times \\tan 30^\\circ$$
$$h = 40 \\times 0.5774 = 23.096\\text{ meters} \\approx \\mathbf{23.1\\text{ m}}$$

---

### 3. Three-Figure Compass Bearings

A **bearing** specifies the direction of one point relative to another. In navigation and surveying, the **3-Figure Bearing System** is standard:
1. Measured always from **True North** ($000^\\circ$).
2. Measured strictly in a **clockwise direction**.
3. Always written using **three digits** (e.g., $045^\\circ$, $090^\\circ$, $270^\\circ$).

\`\`\`
                     North (000° / 360°)
                             ▲
                             │   Bearing 060°
                West (270°)  │  /
                ◄────────────┼────────────► East (090°)
                             │
                             ▼
                     South (180°)
\`\`\`

#### Converting Directional Bearings to 3-Figure Bearings:
- **North-East (NE):** $045^\\circ$
- **East (E):** $090^\\circ$
- **South-East (SE):** $135^\\circ$
- **South (S):** $180^\\circ$
- **South-West (SW):** $225^\\circ$
- **West (W):** $270^\\circ$
- **North-West (NW):** $315^\\circ$

---

### 4. BECE Checkpoint Practice Questions

1. A ladder leaning against a vertical wall makes an angle of $60^\\circ$ with the horizontal ground. If the foot of the ladder is $5\\text{ m}$ from the wall, find the length of the ladder:
   - A. $2.5\\text{ m}$
   - B. $5\\text{ m}$
   - C. $8.66\\text{ m}$
   - D. $10\\text{ m}$
   *(Answer: **D**. $\\cos 60^\\circ = \\frac{\\text{Adj}}{\\text{Hyp}} \\implies 0.5 = \\frac{5}{L} \\implies L = \\frac{5}{0.5} = 10\\text{ m}$.)*

2. If the angle of depression of a boat from the top of a cliff is $35^\\circ$, what is the angle of elevation of the top of the cliff from the boat?
   - A. $35^\\circ$
   - B. $55^\\circ$
   - C. $90^\\circ$
   - D. $145^\\circ$
   *(Answer: **A**. Angle of elevation equals angle of depression by alternate angles.)*

3. What is the 3-figure bearing of **South-West**?
   - A. $045^\\circ$
   - B. $135^\\circ$
   - C. $225^\\circ$
   - D. $270^\\circ$
   *(Answer: **C**. SW is $180^\\circ + 45^\\circ = 225^\\circ$.)*

4. Which trigonometric ratio is defined as $\\frac{\\text{Opposite}}{\\text{Adjacent}}$?
   - A. Sine
   - B. Cosine
   - C. Tangent
   - D. Secant
   *(Answer: **C**. Tangent = Opposite / Adjacent.)*`,
    keyTakeaways: [
      'SOH-CAH-TOA defines sine, cosine, and tangent in right-angled triangles.',
      'Angle of elevation equals angle of depression because they are alternate angles between parallel horizontal planes.',
      'Three-figure bearings are measured clockwise from True North and written with 3 digits.',
      'Always draw a clear, labeled geometric sketch before substituting into trigonometric formulas.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },

  // ==========================================
  // WEEK 5
  // ==========================================
  {
    id: 'jss3-math-t2-w5',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Statistics I: Frequency Distribution & Measures of Central Tendency',
    subtopics: [
      'Ungrouped & Grouped Frequency Distribution Tables (Tallies & Class Intervals)',
      'Calculating the Arithmetic Mean (x̄ = Σfx / Σf)',
      'Determining the Median of Ungrouped & Tabular Distributions',
      'Identifying the Mode and Modal Class',
      'Real-Life Nigerian Applications (Census, School Scores & Market Survey)'
    ],
    readingTimeMinutes: 14,
    summary: 'Mastering foundational statistics: constructing organized frequency tables, calculating the arithmetic mean, locating median positions, determining modes, and analyzing real-world numerical datasets.',
    contentMarkdown: `### 1. Data Collection & Frequency Distribution

Statistics is the mathematical branch dealing with the collection, organization, presentation, analysis, and interpretation of numerical data.

- **Frequency ($f$):** The number of times a particular score or data value occurs in an experiment or observation.
- **Tally System:** Grouping tally marks in bundles of five ($||||$ with a diagonal strike through) to count raw scores without error.

---

### 2. The Measures of Central Tendency

#### A. The Arithmetic Mean ($\\bar{x}$)
The mean is the average value obtained by dividing the sum of all values by the total number of items:
$$\\bar{x} = \\frac{\\sum x}{n} \\quad \\text{(for raw list)}$$
$$\\bar{x} = \\frac{\\sum fx}{\\sum f} \\quad \\text{(for frequency tables)}$$
where $\\sum fx$ is the sum of the products of each value and its frequency, and $\\sum f$ is the total frequency.

#### B. The Median
The median is the **middle value** when data scores are arranged in ascending or descending order of magnitude:
- If $n$ is **odd**, Median $= \\text{value at position } \\frac{n + 1}{2}$.
- If $n$ is **even**, Median $= \\text{average of values at positions } \\frac{n}{2} \\text{ and } \\left(\\frac{n}{2} + 1\\right)$.

#### C. The Mode
The mode is the score that occurs **most frequently** (has the highest frequency).
- A dataset can have one mode (unimodal), two modes (bimodal), or no mode if all frequencies are identical.

---

### 3. Comprehensive Worked Example (Tabular Data)

The scores of 20 students in a JSS 3 BECE Mathematics test out of 10 marks are recorded below:
$$7, 5, 8, 7, 6, 9, 7, 5, 8, 6, 7, 10, 6, 7, 8, 5, 7, 9, 6, 8$$

#### Frequency Distribution Table:
| Score ($x$) | Tally | Frequency ($f$) | Product ($fx$) |
| :---: | :---: | :---: | :---: |
| **5** | $|||$ | 3 | $5 \\times 3 = 15$ |
| **6** | $||||$ | 4 | $6 \\times 4 = 24$ |
| **7** | $\\cancel{||||}\\ |$ | 6 | $7 \\times 6 = 42$ |
| **8** | $||||$ | 4 | $8 \\times 4 = 32$ |
| **9** | $||$ | 2 | $9 \\times 2 = 18$ |
| **10** | $|$ | 1 | $10 \\times 1 = 10$ |
| **Total** | | $\\mathbf{\\sum f = 20}$ | $\\mathbf{\\sum fx = 141}$ |

#### Calculations:
1. **The Mean ($\\bar{x}$):**
   $$\\bar{x} = \\frac{\\sum fx}{\\sum f} = \\frac{141}{20} = \\mathbf{7.05}$$

2. **The Mode:**
   Inspect the frequency column. The highest frequency is $6$, corresponding to the score **$7$**.
   $$\\mathbf{\\text{Mode} = 7}$$

3. **The Median:**
   Total items $n = 20$ (even).
   Middle positions: $\\frac{20}{2} = 10\\text{th}$ and $11\\text{th}$ items.
   Cumulative count:
   - Scores 5: items 1–3
   - Scores 6: items 4–7
   - Scores 7: items 8–13
   Both the 10th and 11th items fall within score $7$.
   $$\\text{Median} = \\frac{7 + 7}{2} = \\mathbf{7}$$

---

### 4. BECE Checkpoint Practice Questions

1. Find the mean of the numbers: $12, 15, 18, 20, 25$:
   - A. 16
   - B. 18
   - C. 20
   - D. 22
   *(Answer: **B**. Sum $= 12+15+18+20+25 = 90$. Mean $= 90 / 5 = 18$.)*

2. What is the median of the dataset: $3, 8, 2, 9, 5, 7, 4$?
   - A. 4
   - B. 5
   - C. 7
   - D. 8
   *(Answer: **B**. Arranged in ascending order: $2, 3, 4, \\mathbf{5}, 7, 8, 9$. Middle score is 5.)*

3. What is the mode of: $4, 6, 8, 4, 9, 4, 6, 7$?
   - A. 4
   - B. 6
   - C. 7
   - D. 8
   *(Answer: **A**. 4 appears three times, which is more frequent than any other score.)*

4. If the mean of $6, 8, 10, x,$ and $14$ is $10$, what is the value of $x$?
   - A. 10
   - B. 11
   - C. 12
   - D. 13
   *(Answer: **C**. Sum $= 6 + 8 + 10 + x + 14 = 38 + x$. Mean $= \\frac{38 + x}{5} = 10 \\implies 38 + x = 50 \\implies x = 12$.)*`,
    keyTakeaways: [
      'Mean represents the arithmetic average calculated as Σfx / Σf.',
      'Median is the exact middle score after ordering data values sequentially.',
      'Mode is the value with the highest occurring frequency in a dataset.',
      'Tabulating raw data with tally marks prevents omission of numbers during examination calculations.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },

  // ==========================================
  // WEEK 6 (MID-TERM ASSESSMENT)
  // ==========================================
  {
    id: 'jss3-math-t2-w6',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Mid-Term Continuous Assessment & Diagnostic Test',
    subtopics: [
      'Mid-Term Diagnostic Review: Simultaneous Equations (Algebraic & Graphical)',
      'Diagnostic Review: Linear Inequalities & Number Line Graphs',
      'Diagnostic Review: SOH-CAH-TOA, Elevation, Depression & 3-Figure Bearings',
      'Diagnostic Review: Statistics & Central Tendency (Mean, Median, Mode)',
      'Mid-Term Continuous Assessment CBT Drill (15 Comprehensive Questions)'
    ],
    readingTimeMinutes: 12,
    summary: 'Mid-term milestone assessment synthesizing Weeks 1–5: algebraic systems, graphical coordinate intersections, inequality reversals, trigonometry, statistics, and a 15-question comprehensive simulated BECE test.',
    contentMarkdown: `### Mid-Term Academic Review & Performance Checkpoint

Welcome to the Mid-Term Continuous Assessment week for JSS 3 Second Term Mathematics. This checkpoint evaluates your computational speed, accuracy, and theoretical mastery of Weeks 1 to 5.

---

### 1. Mid-Term Formula & Theorem Reference Sheet
- **Simultaneous Equations:**
  - Elimination: Add when signs differ; subtract when signs match.
  - Graphical: Intersection point $(x, y)$ equals the simultaneous solution.
- **Inequalities:**
  - Multiplying or dividing by a negative number reverses the inequality symbol ($< \\leftrightarrow >$, $\\le \\leftrightarrow \\ge$).
  - Strict: $\\circ$ open circle; Non-strict: $\\bullet$ solid dot.
- **Trigonometry & Bearings:**
  - $\\sin \\theta = \\frac{\\text{Opp}}{\\text{Hyp}}$, $\\cos \\theta = \\frac{\\text{Adj}}{\\text{Hyp}}$, $\\tan \\theta = \\frac{\\text{Opp}}{\\text{Adj}}$.
  - $\\text{Angle of Elevation} = \\text{Angle of Depression}$ (alternate angles).
  - Bearings: Measured clockwise from True North ($000^\\circ$ to $360^\\circ$).
- **Statistics:**
  - Mean $\\bar{x} = \\frac{\\sum fx}{\\sum f}$.
  - Median $= \\frac{n+1}{2}\\text{th}$ value (odd) or mean of $\\frac{n}{2}\\text{th}$ and $(\\frac{n}{2}+1)\\text{th}$ (even).

---

### 2. Mid-Term Continuous Assessment Test (15 Questions)

1. Solve simultaneously: $2x + y = 7$ and $x - y = 2$. Find $x$:
   - A. 1
   - B. 2
   - C. 3
   - D. 4
   *(Answer: **C**. Adding both equations gives $3x = 9 \\implies x = 3$.)*

2. If $x = 3$ in $2x + y = 7$, what is $y$?
   - A. 1
   - B. 2
   - C. 3
   - D. 5
   *(Answer: **A**. $2(3) + y = 7 \\implies 6 + y = 7 \\implies y = 1$.)*

3. Solve the inequality: $5 - 2x > 1$
   - A. $x > 2$
   - B. $x < 2$
   - C. $x < -2$
   - D. $x > -2$
   *(Answer: **B**. $-2x > 1 - 5 \\implies -2x > -4 \\implies x < 2$ (reversing sign).)*

4. A right-angled triangle has adjacent side $8\\text{ cm}$ and hypotenuse $10\\text{ cm}$. Find the opposite side:
   - A. $4\\text{ cm}$
   - B. $6\\text{ cm}$
   - C. $7\\text{ cm}$
   - D. $9\\text{ cm}$
   *(Answer: **B**. By Pythagoras: $\\text{Opp} = \\sqrt{10^2 - 8^2} = \\sqrt{100 - 64} = \\sqrt{36} = 6\\text{ cm}$.)*

5. What is the value of $\\tan 45^\\circ$?
   - A. $0$
   - B. $0.5$
   - C. $1$
   - D. $\\sqrt{3}$
   *(Answer: **C**. $\\tan 45^\\circ = 1$.)*

6. The 3-figure bearing of a village located directly East of a city is:
   - A. $000^\\circ$
   - B. $090^\\circ$
   - C. $180^\\circ$
   - D. $270^\\circ$
   *(Answer: **B**. East corresponds to $090^\\circ$.)*

7. If a point has bearing $120^\\circ$, in which quadrant does it lie?
   - A. North-East
   - B. South-East
   - C. South-West
   - D. North-West
   *(Answer: **B**. $120^\\circ$ lies between $090^\\circ$ (East) and $180^\\circ$ (South).)*

8. Find the mean of the numbers: $4, 7, 9, 12$:
   - A. 7
   - B. 8
   - C. 9
   - D. 10
   *(Answer: **B**. Sum $= 4 + 7 + 9 + 12 = 32$. Mean $= 32 / 4 = 8$.)*

9. What is the median of $11, 4, 9, 7, 13, 2$:
   - A. 7
   - B. 8
   - C. 9
   - D. 10
   *(Answer: **B**. Ordered: $2, 4, \\mathbf{7, 9}, 11, 13$. Median $= (7 + 9)/2 = 8$.)*

10. What is the mode of: $3, 5, 3, 7, 8, 3, 5, 9$?
    - A. 3
    - B. 5
    - C. 7
    - D. 8
    *(Answer: **A**. 3 appears most frequently.)*

11. On a graph, the point of intersection of $x = 3$ and $y = -2$ is:
    - A. $(-2, 3)$
    - B. $(3, -2)$
    - C. $(0, 0)$
    - D. $(1, 5)$
    *(Answer: **B**. Coordinates are $(x, y) = (3, -2)$.)*

12. If $3x + 2y = 12$ and $y = 0$, what is the $x$-intercept?
    - A. 2
    - B. 3
    - C. 4
    - D. 6
    *(Answer: **C**. $3x = 12 \\implies x = 4$.)*

13. An airplane takes off at an angle of elevation of $20^\\circ$. What is the angle of depression of the airport from the plane?
    - A. $20^\\circ$
    - B. $70^\\circ$
    - C. $90^\\circ$
    - D. $160^\\circ$
    *(Answer: **A**. Equal alternate angles.)*

14. How many integers satisfy $1 \\le x < 5$?
    - A. 3
    - B. 4
    - C. 5
    - D. 6
    *(Answer: **B**. The integers are $1, 2, 3, 4$ (4 numbers).)*

15. If the total frequency $\\sum f = 50$ and $\\sum fx = 350$, the mean is:
    - A. 5
    - B. 6
    - C. 7
    - D. 8
    *(Answer: **C**. Mean $= 350 / 50 = 7$.)*`,
    keyTakeaways: [
      'Mid-term assessment validates computational fluency across algebraic, geometric, and statistical systems.',
      'Pythagorean theorem and basic trigonometric ratios form the bedrock of BECE geometry problems.',
      'Mastery of coordinate notation $(x, y)$ prevents transposing axes on graphical examinations.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },

  // ==========================================
  // WEEK 7
  // ==========================================
  {
    id: 'jss3-math-t2-w7',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Statistics II: Histograms, Frequency Polygons & Pie Charts',
    subtopics: [
      'Histograms: Continuous Class Boundaries vs. Discrete Bar Charts',
      'Frequency Polygons: Midpoints & Line Distribution Construction',
      'Pie Charts: Calculating Sector Angles (θ = f / Σf × 360°)',
      'Interpreting Charts in Examination Contexts',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 14,
    summary: 'Mastering graphical data displays: drawing histograms with continuous class boundaries, plotting frequency polygons, calculating exact pie chart sector angles, and solving examination interpretation questions.',
    contentMarkdown: `### 1. Histograms vs. Bar Charts

Although histograms and bar charts look similar, they have fundamental mathematical differences:

| Feature | Bar Chart | Histogram |
| :--- | :--- | :--- |
| **Data Type** | Discrete or qualitative data (*e.g., favorite subjects, colors*). | Continuous grouped numerical data (*e.g., weights, heights, test marks*). |
| **Gaps Between Bars** | Has **equal gaps** between adjacent bars to emphasize distinct categories. | **NO gaps** between bars; bars touch to show continuity across class boundaries. |
| **Horizontal Axis** | Labeled with category names. | Labeled with continuous **class boundaries**. |
| **Area Representation**| Height represents frequency. | **Area of the bar** is proportional to frequency ($Area = \\text{width} \\times \\text{height}$). |

\`\`\`
          Histogram Layout (Bars touch!)
     Freq ▲
       8  │     ┌─────┐
       6  │  ┌──┤     ├──┐
       4  │  │  │     │  │
       2  │  │  │     │  ├──┐
      ────┼──┴──┴─────┴──┴──┴──► Class Boundaries
          0 10  20    30 40 50
\`\`\`

---

### 2. Frequency Polygons

A **frequency polygon** is a line graph drawn by plotting the frequency of each class against its **class midpoint (class mark)**, then joining consecutive points with straight lines.

- **Class Midpoint Formula:**
  $$\\text{Midpoint } (x) = \\frac{\\text{Lower limit} + \\text{Upper limit}}{2}$$
- **Anchor Lines:** The polygon is tied down to the horizontal axis at the beginning and end by extending lines to the midpoints of hypothetical classes with zero frequency.

---

### 3. Pie Charts (Sector Angle Calculations)

A **pie chart** is a circular statistical graphic divided into slices (sectors) to illustrate numerical proportions.

#### The Sector Angle Formula:
Because the sum of angles at a point in a full circle is $360^\\circ$:
$$\\mathbf{\\text{Sector Angle } (\\theta) = \\frac{\\text{Frequency of Category } (f)}{\\text{Total Frequency } (\\sum f)} \\times 360^\\circ}$$

#### Comprehensive Worked Example:
> *A survey of 60 secondary students at Federal Government College, Kano, regarding their preferred sports yielded the following data. Represent this information in a pie chart table.*

| Sport | Frequency ($f$) | Sector Angle Calculation | Sector Angle ($\\theta$) |
| :--- | :---: | :--- | :---: |
| **Football** | 25 | $\\frac{25}{60} \\times 360^\\circ$ | **$150^\\circ$** |
| **Basketball**| 15 | $\\frac{15}{60} \\times 360^\\circ$ | **$90^\\circ$** |
| **Athletics** | 12 | $\\frac{12}{60} \\times 360^\\circ$ | **$72^\\circ$** |
| **Volleyball**| 8 | $\\frac{8}{60} \\times 360^\\circ$ | **$48^\\circ$** |
| **Total** | $\\mathbf{\\sum f = 60}$ | | $\\mathbf{360^\\circ}$ |

> **Check Step:** Always sum all calculated sector angles:
> $$150^\\circ + 90^\\circ + 72^\\circ + 48^\\circ = 360^\\circ$$
> If the sum does not equal $360^\\circ$, a rounding or multiplication error occurred!

---

### 4. BECE Checkpoint Practice Questions

1. In a pie chart, what is the sector angle representing 15 students out of a total class of 60 students?
   - A. $45^\\circ$
   - B. $60^\\circ$
   - C. $90^\\circ$
   - D. $120^\\circ$
   *(Answer: **C**. $\\frac{15}{60} \\times 360^\\circ = \\frac{1}{4} \\times 360^\\circ = 90^\\circ$.)*

2. What is the class midpoint of the interval $20 - 29$?
   - A. 24
   - B. 24.5
   - C. 25
   - D. 25.5
   *(Answer: **B**. Midpoint $= \\frac{20 + 29}{2} = \\frac{49}{2} = 24.5$.)*

3. In a histogram, why do the rectangular vertical bars touch each other without gaps?
   - A. To save space on the graph paper
   - B. Because the data represented is continuous across class boundaries
   - C. Because the frequencies are all equal
   - D. It is an optional artistic preference
   *(Answer: **B**. Bars touch because continuous data has no gaps between class boundaries.)*

4. If a sector of $120^\\circ$ on a pie chart represents 40 students, what is the total number of students in the school?
   - A. 80
   - B. 100
   - C. 120
   - D. 160
   *(Answer: **C**. If $120^\\circ$ is $\\frac{120}{360} = \\frac{1}{3}$ of the circle, then Total $= 40 \\times 3 = 120$ students.)*`,
    keyTakeaways: [
      'Histograms represent continuous data with contiguous bars; bar charts show discrete categories with gaps.',
      'Frequency polygons connect class midpoints with straight line segments.',
      'Pie chart sector angles are calculated as (f / Σf) × 360° and must always sum to exactly 360°.',
      'Protractor accuracy within ±1° is required when drawing pie charts in BECE examinations.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },

  // ==========================================
  // WEEK 8
  // ==========================================
  {
    id: 'jss3-math-t2-w8',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Mensuration: Surface Area & Volume of 3D Solids',
    subtopics: [
      'Properties of 3D Solids: Cylinders, Cones, Spheres & Prisms',
      'Surface Area Derivations (Curved Surface Area & Total Surface Area)',
      'Volume Calculations of Cylinders (V = πr²h) and Cones (V = ⅓πr²h)',
      'Volume and Surface Area of Spheres (V = ⁴⁄₃πr³, A = 4πr²)',
      'Practical Frustums & Capacities of Water Storage Reservoirs'
    ],
    readingTimeMinutes: 14,
    summary: 'Mastering three-dimensional solid geometry: surface area and volume formulas for cylinders, cones, spheres, hemispheres, and practical frustum water tanks with step-by-step calculations.',
    contentMarkdown: `### 1. Mensuration Formulas for 3D Solids

\`\`\`
    Cylinder                  Cone                    Sphere
     ┌─────┐                    ▲                       ┌───┐
     │     │ h                 / \ l                   │  ●  │ r
     └─────┘                  /___\                   └───┘
        r                       r
\`\`\`

| Solid Geometric Shape | Curved Surface Area (CSA) | Total Surface Area (TSA) | Volume ($V$) |
| :--- | :--- | :--- | :--- |
| **Cylinder (closed)** | $2\\pi r h$ | $2\\pi r(r + h)$ | $\\pi r^2 h$ |
| **Cylinder (open top)** | $2\\pi r h$ | $\\pi r^2 + 2\\pi r h$ | $\\pi r^2 h$ |
| **Cone (closed)** | $\\pi r l$ (where $l = \\sqrt{r^2 + h^2}$) | $\\pi r(r + l)$ | $\\frac{1}{3}\\pi r^2 h$ |
| **Sphere** | $4\\pi r^2$ | $4\\pi r^2$ | $\\frac{4}{3}\\pi r^3$ |
| **Hemisphere (solid)** | $2\\pi r^2$ | $3\\pi r^2$ | $\\frac{2}{3}\\pi r^3$ |

---

### 2. Comprehensive Worked Examples

#### Example 1: Right Circular Cylinder
> *A cylindrical water storage tank in Kaduna has a base radius of $7\\text{ meters}$ and a height of $10\\text{ meters}$. Calculate: (a) The volume of water it holds; (b) The total surface area of the closed tank. (Take $\\pi = \\frac{22}{7}$).*

**Solution:**
**(a) Volume:**
$$V = \\pi r^2 h$$
$$V = \\frac{22}{7} \\times 7^2 \\times 10 = \\frac{22}{7} \\times 49 \\times 10 = 22 \\times 7 \\times 10 = \\mathbf{1,540\\text{ m}^3}$$
*(Note: $1\\text{ m}^3 = 1,000\\text{ litres}$, so the tank holds $1,540,000\\text{ litres}$ of water!).*

**(b) Total Surface Area:**
$$\\text{TSA} = 2\\pi r(r + h)$$
$$\\text{TSA} = 2 \\times \\frac{22}{7} \\times 7 \\times (7 + 10) = 44 \\times 17 = \\mathbf{748\\text{ m}^2}$$

---

#### Example 2: Circular Cone
> *A cone has a base radius of $6\\text{ cm}$ and a perpendicular vertical height of $8\\text{ cm}$. Find: (a) Its slant height ($l$); (b) Its volume. (Take $\\pi = 3.142$).*

**Solution:**
**(a) Slant Height ($l$):**
By Pythagoras' Theorem:
$$l = \\sqrt{r^2 + h^2} = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = \\mathbf{10\\text{ cm}}$$

**(b) Volume:**
$$V = \\frac{1}{3}\\pi r^2 h$$
$$V = \\frac{1}{3} \\times 3.142 \\times 6^2 \\times 8 = \\frac{1}{3} \\times 3.142 \\times 36 \\times 8 = 3.142 \\times 12 \\times 8 = \\mathbf{301.63\\text{ cm}^3}$$

---

### 3. Frustum of a Cone (Bucket Shape)
A **frustum** is formed when the top pointed tip of a cone is sliced off by a plane parallel to its base.
- Standard Nigerian household buckets and water basins are inverted frustums!

---

### 4. BECE Checkpoint Practice Questions

1. Find the volume of a cylinder with radius $7\\text{ cm}$ and height $5\\text{ cm}$ (Take $\\pi = 22/7$):
   - A. $350\\text{ cm}^3$
   - B. $770\\text{ cm}^3$
   - C. $1,540\\text{ cm}^3$
   - D. $2,200\\text{ cm}^3$
   *(Answer: **B**. $V = \\frac{22}{7} \\times 49 \\times 5 = 22 \\times 7 \\times 5 = 770\\text{ cm}^3$.)*

2. A sphere has a radius of $3\\text{ cm}$. In terms of $\\pi$, its volume is:
   - A. $9\\pi\\text{ cm}^3$
   - B. $18\\pi\\text{ cm}^3$
   - C. $36\\pi\\text{ cm}^3$
   - D. $108\\pi\\text{ cm}^3$
   *(Answer: **C**. $V = \\frac{4}{3}\\pi (3)^3 = \\frac{4}{3}\\pi(27) = 4 \\times 9\\pi = 36\\pi\\text{ cm}^3$.)*

3. What is the slant height of a cone whose base radius is $5\\text{ cm}$ and vertical height is $12\\text{ cm}$?
   - A. $13\\text{ cm}$
   - B. $15\\text{ cm}$
   - C. $17\\text{ cm}$
   - D. $20\\text{ cm}$
   *(Answer: **A**. $l = \\sqrt{5^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13\\text{ cm}$.)*

4. The curved surface area of a cylinder is given by the formula:
   - A. $\\pi r^2$
   - B. $2\\pi r h$
   - C. $\\pi r l$
   - D. $4\\pi r^2$
   *(Answer: **B**. $\\text{CSA} = 2\\pi r h$.)*`,
    keyTakeaways: [
      'Volume of a cylinder is πr²h; volume of a cone is one-third of a cylinder with identical base and height.',
      'In cones, slant height l satisfies Pythagoras: l² = r² + h².',
      'Surface area calculations must distinguish between open and closed solids.',
      'Always include correct cubic units (cm³, m³) for volume and square units (cm², m²) for surface area.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },

  // ==========================================
  // WEEK 9
  // ==========================================
  {
    id: 'jss3-math-t2-w9',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Probability: Simple & Compound Events',
    subtopics: [
      'Meaning of Probability & The Probability Scale (0 ≤ P(E) ≤ 1)',
      'Sample Spaces & Theoretical Probability Formula P(E) = n(E) / n(S)',
      'Complementary Events: P(not E) = 1 - P(E)',
      'Mutually Exclusive Events & The Addition Rule: P(A ∪ B) = P(A) + P(B)',
      'Independent Events & The Multiplication Rule: P(A ∩ B) = P(A) × P(B)'
    ],
    readingTimeMinutes: 14,
    summary: 'Mastering probability mathematics: defining sample spaces, calculating single event probabilities, complementary events, mutually exclusive addition rules, and independent event multiplication theorems.',
    contentMarkdown: `### 1. What is Probability?

Probability is the mathematical measure of the likelihood or chance that an event will occur.

#### The Probability Scale:
$$0 \\le P(E) \\le 1$$
- **$P(E) = 0$:** An **impossible event** that can never occur (*e.g., rolling a 7 on a standard 6-sided die*).
- **$P(E) = 1$:** A **certain event** that is guaranteed to occur (*e.g., tomorrow following today*).
- The closer $P(E)$ is to $1$, the more likely the event is to occur.

#### The Fundamental Probability Formula:
$$P(E) = \\frac{n(E)}{n(S)} = \\frac{\\text{Number of favorable outcomes}}{\\text{Total number of possible outcomes in sample space}}$$
where $n(E)$ is the number of favorable outcomes and $n(S)$ is the total size of the sample space.

---

### 2. Complementary Events
If the probability that an event occurs is $P(E)$, then the probability that the event **does NOT occur** ($P(E')$) is:
$$P(E') = 1 - P(E)$$
*Example:* If the probability that it rains in Lagos today is $0.35$, the probability that it does NOT rain is:
$$1 - 0.35 = 0.65$$

---

### 3. Mutually Exclusive Events (The Addition Rule)

Two events $A$ and $B$ are **mutually exclusive** if they cannot both occur at the same time (they have no common outcomes).
$$\\mathbf{P(A \\text{ or } B) = P(A \\cup B) = P(A) + P(B)}$$

#### Worked Example:
> *A standard fair six-sided die is rolled once. Find the probability of getting a 2 OR an odd number.*

**Solution:**
- Sample space: $S = \\{1, 2, 3, 4, 5, 6\\} \\implies n(S) = 6$
- Event $A$ (getting a 2): $\\{2\\} \\implies P(A) = \\frac{1}{6}$
- Event $B$ (getting an odd number): $\\{1, 3, 5\\} \\implies P(B) = \\frac{3}{6}$
- Since a number cannot be both $2$ and odd, events are mutually exclusive:
  $$P(A \\cup B) = \\frac{1}{6} + \\frac{3}{6} = \\frac{4}{6} = \\mathbf{\\frac{2}{3}}$$

---

### 4. Independent Events (The Multiplication Rule)

Two events $A$ and $B$ are **independent** if the occurrence of one event has no effect whatsoever on the probability of the other event.
$$\\mathbf{P(A \\text{ and } B) = P(A \\cap B) = P(A) \\times P(B)}$$

#### Worked Example:
> *A fair coin is tossed and a fair six-sided die is rolled. Find the probability of obtaining a Head on the coin AND a 6 on the die.*

**Solution:**
- $P(\\text{Head}) = \\frac{1}{2}$
- $P(6) = \\frac{1}{6}$
- Since the coin and die are completely independent:
  $$P(\\text{Head and } 6) = \\frac{1}{2} \\times \\frac{1}{6} = \\mathbf{\\frac{1}{12}}$$

---

### 5. BECE Checkpoint Practice Questions

1. A bag contains 4 red balls, 5 blue balls, and 3 green balls. If one ball is picked at random, what is the probability that it is **blue**?
   - A. $\\frac{1}{4}$
   - B. $\\frac{5}{12}$
   - C. $\\frac{1}{2}$
   - D. $\\frac{7}{12}$
   *(Answer: **B**. Total balls $= 4 + 5 + 3 = 12$. $P(\\text{Blue}) = \\frac{5}{12}$.)*

2. If a card is drawn at random from the bag in question 1, what is the probability that it is **NOT red**?
   - A. $\\frac{1}{3}$
   - B. $\\frac{2}{3}$
   - C. $\\frac{5}{12}$
   - D. $\\frac{3}{4}$
   *(Answer: **B**. $P(\\text{Red}) = \\frac{4}{12} = \\frac{1}{3}$. $P(\\text{Not Red}) = 1 - \\frac{1}{3} = \\frac{2}{3}$.)*

3. What is the probability of rolling a number greater than 4 on a fair six-sided die?
   - A. $\\frac{1}{6}$
   - B. $\\frac{1}{3}$
   - C. $\\frac{1}{2}$
   - D. $\\frac{2}{3}$
   *(Answer: **B**. Numbers greater than 4 are $\\{5, 6\\}$ (2 outcomes). $P = \\frac{2}{6} = \\frac{1}{3}$.)*

4. If two coins are tossed simultaneously, what is the probability of obtaining **two Heads**?
   - A. $\\frac{1}{4}$
   - B. $\\frac{1}{2}$
   - C. $\\frac{3}{4}$
   - D. $1$
   *(Answer: **A**. Sample space: $\\{HH, HT, TH, TT\\}$. Only $HH$ has two heads, so $P = \\frac{1}{4}$.)*`,
    keyTakeaways: [
      'Probability ranges strictly between 0 (impossible) and 1 (certain).',
      'The probability of an event not occurring equals 1 - P(E).',
      'Use the addition rule (P(A) + P(B)) for mutually exclusive OR events.',
      'Use the multiplication rule (P(A) × P(B)) for independent AND events.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },

  // ==========================================
  // WEEK 10 (TERMINAL REVISION)
  // ==========================================
  {
    id: 'jss3-math-t2-w10',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Terminal Revision of 2nd Term Work & Formula Error Clinic',
    subtopics: [
      'Master Formula Reference Sheet: Algebra, Trigonometry, Mensuration & Probability',
      'Common Algebraic Traps & Sign Inversion Errors to Avoid in BECE',
      'Pythagoras & Trigonometric Substitution Error Clinic',
      'Statistics Calculation Cross-Verification Techniques',
      'Self-Assessment: BECE Terminal Diagnostic Drill'
    ],
    readingTimeMinutes: 14,
    summary: 'Comprehensive terminal revision clinic synthesizing second-term mathematics: formula master sheets, common exam pitfalls, algebraic error clinics, and multi-step diagnostic revision test.',
    contentMarkdown: `### 1. Master Formula Reference Sheet

#### A. Algebra & Inequalities
- **Simultaneous Equations:** $ax + by = c$. Elimination by balancing coefficients; substitution by isolation.
- **Inequality Sign Inversion:** Multiply or divide by negative $\\implies$ flip sign ($< \\leftrightarrow >$, $\\le \\leftrightarrow \\ge$).

#### B. Trigonometry & Bearings
- **SOH-CAH-TOA:**
  $$\\sin \\theta = \\frac{\\text{Opp}}{\\text{Hyp}}, \\quad \\cos \\theta = \\frac{\\text{Adj}}{\\text{Hyp}}, \\quad \\tan \\theta = \\frac{\\text{Opp}}{\\text{Adj}}$$
- **Pythagoras' Theorem:** $\\text{Hyp}^2 = \\text{Opp}^2 + \\text{Adj}^2 \\implies c^2 = a^2 + b^2$.
- **Bearings:** 3-figure clockwise angle from True North ($000^\\circ$ to $360^\\circ$).

#### C. Mensuration of 3D Solids
- **Cylinder:** $V = \\pi r^2 h$; $\\text{CSA} = 2\\pi r h$; $\\text{TSA} = 2\\pi r(r + h)$.
- **Cone:** $V = \\frac{1}{3}\\pi r^2 h$; $\\text{CSA} = \\pi r l$ where $l = \\sqrt{r^2 + h^2}$; $\\text{TSA} = \\pi r(r + l)$.
- **Sphere:** $V = \\frac{4}{3}\\pi r^3$; $\\text{Surface Area} = 4\\pi r^2$.

#### D. Statistics & Probability
- **Mean:** $\\bar{x} = \\frac{\\sum fx}{\\sum f}$.
- **Pie Chart Sector:** $\\theta = \\frac{f}{\\sum f} \\times 360^\\circ$.
- **Probability:** $P(E) = \\frac{n(E)}{n(S)}$; $P(\\text{not } E) = 1 - P(E)$.
- **Mutually Exclusive:** $P(A \\cup B) = P(A) + P(B)$.
- **Independent:** $P(A \\cap B) = P(A) \\times P(B)$.

---

### 2. Common Examination Traps & How to Avoid Them

1. **The Negative Exponent Trap:**
   - Error: $2^{-3} = -6$ or $-8$.
   - **Correct:** $2^{-3} = \\frac{1}{2^3} = \\frac{1}{8}$.
2. **The Quadratic Expansion Trap:**
   - Error: $(x + y)^2 = x^2 + y^2$.
   - **Correct:** $(x + y)^2 = x^2 + 2xy + y^2$.
3. **Inequality Negative Division Trap:**
   - Error: $-2x \\le 8 \\implies x \\le -4$.
   - **Correct:** $-2x \\le 8 \\implies x \\ge -4$ (sign must flip!).
4. **Diameter vs. Radius Confusion in Mensuration:**
   - Always check if the question provides the **radius** or the **diameter**! If given diameter $d = 14\\text{ cm}$, radius $r = 7\\text{ cm}$.

---

### 3. BECE Terminal Diagnostic Drill

1. If $3x - 2y = 8$ and $x + 2y = 8$, find the value of $x$:
   - A. 2
   - B. 3
   - C. 4
   - D. 5
   *(Answer: **C**. Adding equations eliminates $y$: $4x = 16 \\implies x = 4$.)*

2. Solve the inequality $4 - x \\ge 7$:
   - A. $x \\ge 3$
   - B. $x \\le -3$
   - C. $x \\ge -3$
   - D. $x \\le 3$
   *(Answer: **B**. $-x \\ge 3 \\implies x \\le -3$.)*

3. In a right-angled triangle, if $\\sin \\theta = 0.6$, what is $\\cos \\theta$?
   - A. 0.4
   - B. 0.75
   - C. 0.8
   - D. 1.0
   *(Answer: **C**. If $\\sin \\theta = \\frac{6}{10} = \\frac{3}{5}$, the triangle is a 3-4-5 right triangle. $\\cos \\theta = \\frac{4}{5} = 0.8$.)*

4. Calculate the volume of a cone with radius $3\\text{ cm}$ and height $7\\text{ cm}$ (Take $\\pi = 22/7$):
   - A. $44\\text{ cm}^3$
   - B. $66\\text{ cm}^3$
   - C. $132\\text{ cm}^3$
   - D. $198\\text{ cm}^3$
   *(Answer: **B**. $V = \\frac{1}{3} \\times \\frac{22}{7} \\times 9 \\times 7 = \\frac{1}{3} \\times 22 \\times 9 = 22 \\times 3 = 66\\text{ cm}^3$.)*

5. Two fair dice are rolled. How many total outcomes are in the sample space?
   - A. 12
   - B. 24
   - C. 36
   - D. 64
   *(Answer: **C**. $6 \\times 6 = 36$ total outcomes.)*`,
    keyTakeaways: [
      'Mastery of core formulas across all four mathematical branches guarantees success in terminal exams.',
      'Check whether the problem provides radius or diameter before substituting into 3D mensuration equations.',
      'Inequality sign reversal when dividing by negatives is the single most tested algebraic pitfall in BECE.',
      'Verification of answers by back-substitution prevents careless arithmetic point loss.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },

  // ==========================================
  // WEEKS 11 & 12 (TERMLY EXAMINATION)
  // ==========================================
  {
    id: 'jss3-math-t2-w11',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Termly Examination: Mock BECE Exam Simulation & Strategy Guide',
    subtopics: [
      'BECE Exam Mastery Strategy: Objective (Paper 1) & Theory (Paper 2) Time Budgeting',
      'Algebraic Problem-Solving & Step-by-Step Mark Allocation Rubrics',
      'Geometric Construction & Graph Paper Accuracy Guidelines',
      'Full Termly Examination: 20-Question Comprehensive BECE Simulation'
    ],
    readingTimeMinutes: 15,
    summary: 'Terminal examination capstone module: BECE examination timing and mark optimization strategies, presentation standards, and a full 20-question comprehensive mock exam covering all second-term mathematics topics.',
    contentMarkdown: `### 1. BECE Mathematics Examination Strategy & Mark Allocation

Success in the Basic Education Certificate Examination (BECE) Mathematics requires a balance of speed and computational rigor.

#### Paper Breakdown:
1. **Paper 1: Objective Questions (60 Multiple-Choice Questions — 60 Minutes)**
   - You have **exactly 1 minute per question**.
   - Work with rough sheets quickly; eliminate impossible options first.
   - Do not spend more than 90 seconds on any single difficult question. Circle it and return to it if time permits.
2. **Paper 2: Theory & Problem Solving (60 Minutes — 40 Marks)**
   - Answer the required number of questions neatly.
   - **Show all working clearly!** In WAEC/BECE marking schemes, **Method marks (M)** and **Accuracy marks (A)** are awarded separately. Even if your final arithmetic answer has a minor slip, showing the correct formula and substitution awards full Method marks!
   - State units clearly ($\text{cm}, \text{m}^2, \text{litres}, \text{₦}$).

---

### 2. Full Termly Mock BECE Examination (20 Curated Questions)

#### Part 1: Algebra & Simultaneous Equations
1. Solve for $x$ and $y$: $x + y = 14$ and $x - y = 6$:
   - A. $x = 10, y = 4$
   - B. $x = 8, y = 6$
   - C. $x = 11, y = 3$
   - D. $x = 12, y = 2$
   *(Answer: **A**. Adding gives $2x = 20 \\implies x = 10$. Then $y = 4$.)*

2. If $3x - 2 = 13$, what is $5x - 7$?
   - A. 15
   - B. 18
   - C. 20
   - D. 23
   *(Answer: **B**. $3x = 15 \\implies x = 5$. Then $5(5) - 7 = 25 - 7 = 18$.)*

3. Expand and simplify: $(x + 3)(x - 5)$:
   - A. $x^2 - 2x - 15$
   - B. $x^2 + 2x - 15$
   - C. $x^2 - 8x - 15$
   - D. $x^2 - 15$
   *(Answer: **A**. $x^2 - 5x + 3x - 15 = x^2 - 2x - 15$.)*

4. Factorize completely: $4x^2 - 9y^2$:
   - A. $(2x - 3y)^2$
   - B. $(2x + 3y)(2x - 3y)$
   - C. $(4x + 9y)(x - y)$
   - D. $4(x - y)(x + y)$
   *(Answer: **B**. Difference of two squares: $(2x)^2 - (3y)^2 = (2x + 3y)(2x - 3y)$.)*

#### Part 2: Linear Inequalities
5. Solve: $3 - 4x \\ge 11$:
   - A. $x \\ge -2$
   - B. $x \\le -2$
   - C. $x \\ge 2$
   - D. $x \\le 2$
   *(Answer: **B**. $-4x \\ge 8 \\implies x \\le -2$ (sign reverses).)*

6. Which integer is NOT in the solution set of $x > -3$?
   - A. -2
   - B. -1
   - C. 0
   - D. -4
   *(Answer: **D**. -4 is less than -3, hence not in the solution set.)*

#### Part 3: Trigonometry & Bearings
7. If $\\cos \\theta = 0.8$, find $\\tan \\theta$:
   - A. 0.6
   - B. 0.75
   - C. 1.25
   - D. 1.33
   *(Answer: **B**. In a 3-4-5 right triangle where $\\text{Adj}=4, \\text{Hyp}=5$, the $\\text{Opp}=3$. $\\tan \\theta = \\frac{3}{4} = 0.75$.)*

8. The angle of elevation of the sun is $45^\\circ$. A flagpole casts a shadow of $12\\text{ m}$. Find the height of the pole:
   - A. $6\\text{ m}$
   - B. $12\\text{ m}$
   - C. $17\\text{ m}$
   - D. $24\\text{ m}$
   *(Answer: **B**. $\\tan 45^\\circ = 1 = \\frac{h}{12} \\implies h = 12\\text{ m}$.)*

9. What is the 3-figure bearing of **North-West**?
   - A. $045^\\circ$
   - B. $135^\\circ$
   - C. $225^\\circ$
   - D. $315^\\circ$
   *(Answer: **D**. $270^\\circ + 45^\\circ = 315^\\circ$.)*

10. A ship sails from port on a bearing of $180^\\circ$. In which cardinal direction is it traveling?
    - A. North
    - B. East
    - C. South
    - D. West
    *(Answer: **C**. $180^\\circ$ is South.)*

#### Part 4: Mensuration of 3D Solids
11. Calculate the curved surface area of a cone of radius $7\\text{ cm}$ and slant height $15\\text{ cm}$ (Take $\\pi = 22/7$):
    - A. $165\\text{ cm}^2$
    - B. $330\\text{ cm}^2$
    - C. $660\\text{ cm}^2$
    - D. $990\\text{ cm}^2$
    *(Answer: **B**. $\\text{CSA} = \\pi r l = \\frac{22}{7} \\times 7 \\times 15 = 22 \\times 15 = 330\\text{ cm}^2$.)*

12. The volume of a cylinder is $616\\text{ cm}^3$. If its height is $4\\text{ cm}$, find its base radius (Take $\\pi = 22/7$):
    - A. $3.5\\text{ cm}$
    - B. $7\\text{ cm}$
    - C. $14\\text{ cm}$
    - D. $21\\text{ cm}$
    *(Answer: **B**. $616 = \\frac{22}{7} \\times r^2 \\times 4 \\implies r^2 = \\frac{616 \\times 7}{88} = 49 \\implies r = 7\\text{ cm}$.)*

13. How many liters of water can a cylindrical container hold if its volume is $2.5\\text{ m}^3$?
    - A. $250\\text{ L}$
    - B. $2,500\\text{ L}$
    - C. $25,000\\text{ L}$
    - D. $250,000\\text{ L}$
    *(Answer: **B**. $1\\text{ m}^3 = 1,000\\text{ litres}$, so $2.5 \\times 1,000 = 2,500\\text{ litres}$.)*

14. Find the total surface area of a sphere of radius $7\\text{ cm}$ (Take $\\pi = 22/7$):
    - A. $154\\text{ cm}^2$
    - B. $308\\text{ cm}^2$
    - C. $616\\text{ cm}^2$
    - D. $1,232\\text{ cm}^2$
    *(Answer: **C**. $\\text{Area} = 4\\pi r^2 = 4 \\times \\frac{22}{7} \\times 49 = 4 \\times 22 \\times 7 = 616\\text{ cm}^2$.)*

#### Part 5: Statistics & Probability
15. If the mean of $5, 7, 8, x,$ and $12$ is $8$, what is $x$?
    - A. 6
    - B. 8
    - C. 9
    - D. 10
    *(Answer: **B**. Sum $= 32 + x = 5 \\times 8 = 40 \\implies x = 8$.)*

16. What is the mode of: $2, 5, 3, 2, 8, 2, 5, 9$?
    - A. 2
    - B. 3
    - C. 5
    - D. 8
    *(Answer: **A**. 2 appears three times.)*

17. In a pie chart, a frequency of 20 out of 80 total corresponds to an angle of:
    - A. $45^\\circ$
    - B. $60^\\circ$
    - C. $90^\\circ$
    - D. $120^\\circ$
    *(Answer: **C**. $\\frac{20}{80} \\times 360^\\circ = \\frac{1}{4} \\times 360^\\circ = 90^\\circ$.)*

18. A fair coin is tossed twice. What is the probability of getting at least one Head?
    - A. $\\frac{1}{4}$
    - B. $\\frac{1}{2}$
    - C. $\\frac{3}{4}$
    - D. $1$
    *(Answer: **C**. Sample space: $\\{HH, HT, TH, TT\\}$. Three outcomes contain at least one head, so $P = \\frac{3}{4}$.)*

19. If the probability that a football team wins a match is $0.7$, what is the probability that they do NOT win?
    - A. 0.2
    - B. 0.3
    - C. 0.4
    - D. 0.7
    *(Answer: **B**. $1 - 0.7 = 0.3$.)*

20. A box contains 3 red pens and 7 black pens. If one pen is chosen at random, the probability that it is black is:
    - A. 0.3
    - B. 0.5
    - C. 0.7
    - D. 0.9
    *(Answer: **C**. $P(\\text{Black}) = \\frac{7}{3 + 7} = \\frac{7}{10} = 0.7$.)*`,
    keyTakeaways: [
      'Showing complete algebraic working secures method marks even if a minor arithmetic slip occurs.',
      'Always double-check units and convert between dimensions accurately (e.g., m³ to litres).',
      'Time management of 1 minute per objective question guarantees sufficient time for theory problems.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  }
];
