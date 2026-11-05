import { CurriculumTopic } from '../types';

export const JSS2_SECOND_TERM_TOPICS: CurriculumTopic[] = [
  // ==========================================
  // MATHEMATICS (WEEKS 1 - 10)
  // ==========================================
  {
    id: 'jss2-math-t2-w1',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Algebraic Expressions: Expansion of Single & Double Brackets',
    subtopics: ['Distributive Law of Multiplication', 'Expanding Single Brackets: a(b + c)', 'Expanding Binomial Products: (a + b)(c + d)', 'Combining Like Terms after Expansion'],
    readingTimeMinutes: 8,
    summary: 'Mastering the algebraic distributive law, expanding binomial products, and simplifying like terms with Nigerian BECE exam examples.',
    contentMarkdown: `### 1. The Distributive Law
In algebra, multiplying a term outside a bracket by each term inside the bracket is known as the **Distributive Law**:
- Single bracket expansion: $a(b + c) = ab + ac$
- Expansion with negative signs: $-2x(3x - 5) = -6x^2 + 10x$

---

### 2. Expanding Double Brackets (Binomial Products)
To expand $(a + b)(c + d)$, multiply every term in the first bracket by every term in the second bracket (FOIL method: First, Outside, Inside, Last):
$$(x + 3)(x + 5) = x(x + 5) + 3(x + 5)$$
$$= x^2 + 5x + 3x + 15$$
$$= x^2 + 8x + 15$$

| Expression | Step 1: Distribution | Step 2: Combine Like Terms | Final Result |
|---|---|---|---|
| $(x + 4)(x + 2)$ | $x(x + 2) + 4(x + 2) = x^2 + 2x + 4x + 8$ | $2x + 4x = 6x$ | $x^2 + 6x + 8$ |
| $(2y - 1)(y + 3)$ | $2y(y + 3) - 1(y + 3) = 2y^2 + 6y - y - 3$ | $6y - y = 5y$ | $2y^2 + 5y - 3$ |
| $(m - 5)(m - 2)$ | $m(m - 2) - 5(m - 2) = m^2 - 2m - 5m + 10$ | $-2m - 5m = -7m$ | $m^2 - 7m + 10$ |`,
    keyTakeaways: [
      'The distributive law requires multiplying the outside factor by every term inside brackets.',
      'Always pay close attention to signs: negative times negative equals positive.',
      'Simplify by collecting like terms after expansion.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-math-t2-w2',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Factorization of Simple Algebraic Expressions',
    subtopics: ['Concept of Factorization as Reverse of Expansion', 'Finding the Highest Common Factor (HCF)', 'Factorization by Taking Out Common Factors', 'Factorization by Grouping in Pairs'],
    readingTimeMinutes: 8,
    summary: 'Expressing algebraic expressions as products of their factors using common terms and grouping methods.',
    contentMarkdown: `### 1. What is Factorization?
Factorization is the reverse process of expansion. It involves writing an algebraic sum as a product of its factors.

#### Method 1: Taking Out the Highest Common Factor (HCF)
- Example 1: Factorize $6x + 9$
  - The HCF of $6x$ and $9$ is $3$.
  - Divide each term by $3$: $6x/3 = 2x$, $9/3 = 3$.
  - Result: $3(2x + 3)$.
- Example 2: Factorize $4a^2b - 6ab^2$
  - The HCF is $2ab$.
  - Divide each term: $4a^2b / 2ab = 2a$; $-6ab^2 / 2ab = -3b$.
  - Result: $2ab(2a - 3b)$.

---

### 2. Factorization by Grouping in Pairs
When an expression has four terms with no single common factor for all four, group them in pairs:
- Factorize $ax + ay + bx + by$:
  1. Group: $(ax + ay) + (bx + by)$
  2. Take common factor from each pair: $a(x + y) + b(x + y)$
  3. Extract the common bracket $(x + y)$: $(x + y)(a + b)$`,
    keyTakeaways: [
      'Factorization is the reverse of expansion; it writes an expression as a product of factors.',
      'Always find and factor out the Highest Common Factor first.',
      'Four-term expressions are factored by grouping into pairs.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-math-t2-w3',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Simple Linear Equations with Fractions',
    subtopics: ['Meaning of Linear Equations', 'Finding the LCM of Denominators', 'Clearing Fractions by Multiplying by LCM', 'Solving for the Unknown Variable and Checking'],
    readingTimeMinutes: 8,
    summary: 'Systematic techniques for clearing fractions in algebraic equations and solving linear equations accurately.',
    contentMarkdown: `### 1. Clearing Fractions in Equations
When an equation contains algebraic fractions, the most efficient method is to multiply every term on both sides by the **Lowest Common Multiple (LCM)** of the denominators to eliminate the fractions.

#### Worked Example:
Solve the equation:
$$\\frac{2x - 1}{3} = \\frac{x + 4}{2}$$

- **Step 1:** Find the LCM of denominators $3$ and $2$. $\\text{LCM} = 6$.
- **Step 2:** Multiply both sides by $6$:
$$6 \\times \\left(\\frac{2x - 1}{3}\\right) = 6 \\times \\left(\\frac{x + 4}{2}\\right)$$
$$2(2x - 1) = 3(x + 4)$$
- **Step 3:** Expand brackets:
$$4x - 2 = 3x + 12$$
- **Step 4:** Collect like terms (subtract $3x$ from both sides, add $2$ to both sides):
$$4x - 3x = 12 + 2$$
$$x = 14$$

---

### 2. Verification / Check
Substitute $x = 14$ into the original equation:
- Left-Hand Side: $\\frac{2(14) - 1}{3} = \\frac{28 - 1}{3} = \\frac{27}{3} = 9$
- Right-Hand Side: $\\frac{14 + 4}{2} = \\frac{18}{2} = 9$
- Since $\\text{LHS} = \\text{RHS}$, our answer $x = 14$ is verified!`,
    keyTakeaways: [
      'Always eliminate fractions first by multiplying both sides by the LCM of all denominators.',
      'Collect variable terms on one side and constants on the other.',
      'Always substitute your solution back into the original equation to verify.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-math-t2-w4',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Linear Inequalities in One Variable',
    subtopics: ['Inequality Symbols (<, >, ≤, ≥)', 'Rules of Inequalities (Reversing Sign on Negative Division)', 'Solving One-Step and Two-Step Inequalities', 'Graphing Solutions on a Number Line'],
    readingTimeMinutes: 7,
    summary: 'Solving inequalities, understanding sign reversals under negative multiplication/division, and number line graphs.',
    contentMarkdown: `### 1. Inequality Symbols & Meaning
- $<$ : Less than (open circle on number line)
- $>$ : Greater than (open circle on number line)
- $\\le$ : Less than or equal to (solid filled circle on number line)
- $\\ge$ : Greater than or equal to (solid filled circle on number line)

---

### 2. The Golden Rule of Inequalities
> **CRITICAL RULE:** Whenever you multiply or divide both sides of an inequality by a **negative number**, you MUST **reverse** the inequality sign!

#### Example 1:
Solve $3x + 4 < 19$
$$3x < 19 - 4$$
$$3x < 15$$
$$x < 5$$

#### Example 2 (Sign Reversal):
Solve $-4x \\ge 12$
Divide both sides by $-4$ and flip $\\ge$ to $\\le$:
$$x \\le -3$$`,
    keyTakeaways: [
      'Strict inequalities (<, >) use open circles; inclusive (≤, ≥) use solid filled circles.',
      'Multiplying or dividing by a negative number flips the inequality symbol.',
      'The solution represents a range of values satisfying the condition.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-math-t2-w5',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Graphs of Linear Equations in Two Variables',
    subtopics: ['The Cartesian Coordinate Plane (x-axis and y-axis)', 'Generating a Table of Values for y = mx + c', 'Plotting Coordinate Points (x, y)', 'Drawing Straight-Line Graphs and Finding Intercepts'],
    readingTimeMinutes: 8,
    summary: 'Cartesian coordinate system, constructing tables of values, plotting points, and graphing straight lines.',
    contentMarkdown: `### 1. The Cartesian Coordinate System
The plane is formed by two perpendicular intersecting lines:
- **x-axis:** The horizontal axis (abscissa).
- **y-axis:** The vertical axis (ordinate).
- **Origin $(0,0)$:** The central intersection point.

---

### 2. Table of Values for $y = 2x - 1$
Given the domain $x \\in \\{-2, -1, 0, 1, 2, 3\\}$:

| $x$ | $-2$ | $-1$ | $0$ | $1$ | $2$ | $3$ |
|---|---|---|---|---|---|---|
| $2x$ | $-4$ | $-2$ | $0$ | $2$ | $4$ | $6$ |
| $-1$ | $-1$ | $-1$ | $-1$ | $-1$ | $-1$ | $-1$ |
| **$y = 2x - 1$** | **$-5$** | **$-3$** | **$-1$** | **$1$** | **$3$** | **$5$** |
| **Point $(x, y)$** | $(-2, -5)$ | $(-1, -3)$ | $(0, -1)$ | $(1, 1)$ | $(2, 3)$ | $(3, 5)$ |

Plotting these coordinates and connecting them with a ruler yields a straight line with y-intercept at $(0, -1)$ and gradient $m = 2$.`,
    keyTakeaways: [
      'A linear equation in two variables always graphs as a straight line.',
      'Generate at least 3 to 4 points in a table of values to ensure plotting accuracy.',
      'The y-intercept occurs where the line crosses the y-axis ($x = 0$).'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-math-t2-w6',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Plane Geometry: Angles on Parallel Lines & Polygons',
    subtopics: ['Vertically Opposite Angles', 'Angles on Parallel Lines: Alternate, Corresponding & Allied', 'Sum of Angles in a Triangle (180°)', 'Sum of Interior Angles of Polygons: (n - 2) × 180°'],
    readingTimeMinutes: 8,
    summary: 'Geometric theorems governing parallel lines cut by a transversal, angle calculations, and polygon interior angle formulas.',
    contentMarkdown: `### 1. Angles Formed by Parallel Lines & Transversal
When two parallel lines are crossed by a straight transversal line:
- **Vertically Opposite Angles:** Are equal ($a = b$).
- **Alternate Angles ("Z" Shape):** Are equal ($c = d$).
- **Corresponding Angles ("F" Shape):** Are equal ($e = f$).
- **Interior Allied Angles ("C" Shape):** Sum to $180^\\circ$ ($x + y = 180^\\circ$).

---

### 2. Polygon Angle Formulas
For any polygon with $n$ sides:
- **Sum of interior angles** $= (n - 2) \\times 180^\\circ$
- **Sum of exterior angles** $= 360^\\circ$ (for any convex polygon)
- **Each interior angle of a regular polygon** $= \\frac{(n - 2) \\times 180^\\circ}{n}$

| Polygon | Number of Sides ($n$) | Sum of Interior Angles |
|---|---|---|
| Triangle | $3$ | $(3 - 2) \\times 180^\\circ = 180^\\circ$ |
| Quadrilateral | $4$ | $(4 - 2) \\times 180^\\circ = 360^\\circ$ |
| Pentagon | $5$ | $(5 - 2) \\times 180^\\circ = 540^\\circ$ |
| Hexagon | $6$ | $(6 - 2) \\times 180^\\circ = 720^\\circ$ |`,
    keyTakeaways: [
      'Alternate angles form a "Z" and are equal; corresponding angles form an "F" and are equal.',
      'The interior angle sum of any n-sided polygon is given by (n - 2) × 180°.',
      'The sum of exterior angles of any polygon is always 360°.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-math-t2-w7',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Angles of Elevation & Depression',
    subtopics: ['Definition of Horizontal Line of Sight', 'Angle of Elevation (Looking Up)', 'Angle of Depression (Looking Down)', 'Equality of Elevation and Depression Angles (Alternate Angles)'],
    readingTimeMinutes: 7,
    summary: 'Practical trigonometric concepts measuring heights and distances using angles of elevation and depression.',
    contentMarkdown: `### 1. Angle of Elevation
The angle of elevation is the angle between the horizontal line of sight and the observer’s line of sight **upwards** to an object above eye level.
- Example: Looking up from the school field to the top of the flagpole.

---

### 2. Angle of Depression
The angle of depression is the angle between the horizontal line of sight and the observer’s line of sight **downwards** to an object below eye level.
- Example: Looking down from the balcony of a two-storey building to a car parked on the street.

---

### 3. The Fundamental Theorem:
Because the observer’s horizontal line and the ground level are parallel, the **angle of depression** from point A to point B is always **equal to the angle of elevation** from point B to point A (Alternate Angles!).`,
    keyTakeaways: [
      'Angle of elevation is measured looking upwards from the horizontal line of sight.',
      'Angle of depression is measured looking downwards from the horizontal line of sight.',
      'Angle of elevation equals angle of depression because they form alternate angles.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-math-t2-w8',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Bearings & Cardinal Distances',
    subtopics: ['The 4 and 8 Cardinal Compass Points', 'Compass Bearings (e.g. N45°E, S30°W)', 'Three-Figure Bearings (000° to 360° measured clockwise from North)', 'Converting Compass to Three-Figure Bearings'],
    readingTimeMinutes: 8,
    summary: 'Navigational bearings, cardinal points, three-figure notation measured clockwise from True North.',
    contentMarkdown: `### 1. The Cardinal Compass Points
The 4 primary points are **North (N)**, **South (S)**, **East (E)**, and **West (W)**.
Between them lie **NE ($045^\\circ$)**, **SE ($135^\\circ$)**, **SW ($225^\\circ$)**, and **NW ($315^\\circ$)**.

---

### 2. Three-Figure Bearings
A three-figure bearing is an angle measured:
1. Always from **North**.
2. Always in a **clockwise** direction.
3. Always written using **three digits** (e.g. $045^\\circ$, $090^\\circ$, $270^\\circ$).

| Direction / Compass Bearing | Three-Figure Bearing | Description |
|---|---|---|
| Due East | $090^\\circ$ | Quarter turn clockwise from North |
| Due South | $180^\\circ$ | Half turn clockwise from North |
| Due West | $270^\\circ$ | Three-quarter turn clockwise from North |
| $\\text{N } 35^\\circ \\text{ E}$ | $035^\\circ$ | $35^\\circ$ East of North |
| $\\text{S } 40^\\circ \\text{ E}$ | $180^\\circ - 40^\\circ = 140^\\circ$ | In the SE quadrant |
| $\\text{S } 60^\\circ \\text{ W}$ | $180^\\circ + 60^\\circ = 240^\\circ$ | In the SW quadrant |`,
    keyTakeaways: [
      'Three-figure bearings are measured clockwise from True North and written with 3 digits.',
      'North is 000°, East is 090°, South is 180°, and West is 270°.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-math-t2-w9',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Geometrical Construction: Angles & Triangles',
    subtopics: ['Instruments of Geometrical Construction (Ruler, Compass, Protractor)', 'Bisecting a Given Line Segment (Perpendicular Bisector)', 'Bisecting an Angle', 'Constructing Special Angles (60°, 90°, 45°, 30°) without Protractor'],
    readingTimeMinutes: 8,
    summary: 'Ruler and compass geometric constructions, perpendicular bisectors, and accurate angle constructions.',
    contentMarkdown: `### 1. Tools for Accurate Construction
- **Ruler:** Used strictly for drawing straight lines (not measuring when pure construction is specified).
- **Compass:** Used for drawing arcs and circles of precise radii.
- **Pencil:** Must be sharpened to a fine point for crisp intersecting arc points.

---

### 2. Constructing Special Angles without a Protractor:
- **Angle $60^\\circ$:** Draw a line segment. With the compass at one end, draw an arc crossing the line. Keeping the same radius, place the compass at the crossing point and strike an arc intersecting the first arc. Draw a line from the vertex through the intersection.
- **Angle $90^\\circ$:** Construct a perpendicular bisector on a straight line.
- **Angle $45^\\circ$:** Bisect a $90^\\circ$ angle.
- **Angle $30^\\circ$:** Bisect a $60^\\circ$ angle.`,
    keyTakeaways: [
      'Geometrical construction relies on a sharp pencil, straight ruler, and compass.',
      'Bisecting an angle divides it into two exactly equal halves.',
      'Construct 30° by bisecting 60°; construct 45° by bisecting 90°.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-math-t2-w10',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Statistics & Probability: Experimental vs Theoretical',
    subtopics: ['Concept of Chance and Probability', 'Probability Scale (0 = Impossible, 1 = Certain)', 'Formula: P(Event) = (Favorable Outcomes) / (Total Outcomes)', 'Coin Tosses, Dice Rolls & Real-Life Probability in Nigeria'],
    readingTimeMinutes: 8,
    summary: 'Foundational probability theory, sample spaces, favorable outcomes, and predicting chance events.',
    contentMarkdown: `### 1. The Probability Scale
Probability measures the likelihood of an event occurring:
$$0 \\le P(E) \\le 1$$
- $P(E) = 0$ : The event is **impossible** (e.g. rolling an $8$ on a standard $6$-sided die).
- $P(E) = 1$ : The event is **certain** (e.g. obtaining a number less than $7$ on a die).
- $P(E) = 0.5$ : Even chance (e.g. getting a Head when tossing a fair coin).

---

### 2. Fundamental Probability Formula:
$$P(\\text{Event}) = \\frac{\\text{Number of Favorable Outcomes}}{\\text{Total Number of Possible Outcomes}}$$

#### Example:
A fair six-sided die is rolled. Find the probability of obtaining an even number:
- Total possible outcomes: $\\{1, 2, 3, 4, 5, 6\\} \\to n(S) = 6$
- Favorable even outcomes: $\\{2, 4, 6\\} \\to n(E) = 3$
- $P(\\text{Even}) = \\frac{3}{6} = \\frac{1}{2}$`,
    keyTakeaways: [
      'Probability ranges strictly between 0 (impossible) and 1 (certain).',
      'The sum of the probability of an event happening and not happening is always 1: P(E) + P(not E) = 1.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },

  // ==========================================
  // ENGLISH LANGUAGE (WEEKS 1 - 10)
  // ==========================================
  {
    id: 'jss2-eng-t2-w1',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'English Language',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Grammar: Complex Noun Phrases & Nominalization',
    subtopics: ['Structure of the Noun Phrase (Pre-modifiers, Head Word, Post-modifiers)', 'Nominalization: Turning Verbs and Adjectives into Nouns', 'Functions of Noun Phrases (Subject, Object, Complement)', 'Grammar in Context'],
    readingTimeMinutes: 7,
    summary: 'Mastering sophisticated noun phrases with determiners, adjective pre-modifiers, relative clauses, and suffix-based nominalization.',
    contentMarkdown: `### 1. Structure of a Noun Phrase (NP)
A noun phrase is a group of words that functions as a single noun in a sentence. It consists of a **Head Word (Noun)** and optional modifiers:
- **Pre-modifiers:** Determiners, numerals, and adjectives (*"The three brilliant students"*).
- **Post-modifiers:** Prepositional phrases or relative clauses (*"...from Lagos who won the national award"*).

Full NP: *"The three brilliant students from Lagos who won the national award"*

---

### 2. Nominalization
Nominalization is the grammatical process of converting verbs or adjectives into nouns by adding suffixes:
- *Govern* $\\to$ **Government** (suffix: *-ment*)
- *Inform* $\\to$ **Information** (suffix: *-ation*)
- *Kind* $\\to$ **Kindness** (suffix: *-ness*)
- *Decide* $\\to$ **Decision** (suffix: *-sion*)`,
    keyTakeaways: [
      'A noun phrase functions as subject, object, or complement in a sentence.',
      'Nominalization converts verbs and adjectives into formal nouns using suffixes.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-eng-t2-w2',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'English Language',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Verbs: Transitive vs Intransitive & Active vs Passive Voice',
    subtopics: ['Transitive Verbs (Requiring a Direct Object)', 'Intransitive Verbs (No Object Needed)', 'Active Voice: Subject Performs the Action', 'Passive Voice: Subject Receives the Action'],
    readingTimeMinutes: 8,
    summary: 'Distinguishing transitive verbs from intransitive verbs and transforming sentences between active and passive voice.',
    contentMarkdown: `### 1. Transitive vs Intransitive Verbs
- **Transitive Verb:** Requires a direct object to complete its meaning.
  - *Example:* *"The boy kicked the football."* (*"kicked"* is transitive; *"football"* is the object).
- **Intransitive Verb:** Makes complete sense on its own without an object.
  - *Example:* *"The baby cried softly."* (*"cried"* is intransitive; *"softly"* is an adverb, not an object).

---

### 2. Active vs Passive Voice
- **Active Voice:** The grammatical subject performs the action.
  - *Active:* *"Chidi wrote the brilliant essay."*
- **Passive Voice:** The subject receives the action; used when the action or result is more important than the doer.
  - *Passive:* *"The brilliant essay was written by Chidi."*

| Active Voice | Passive Voice Transformation |
|---|---|
| The principal addressed the students. | The students were addressed by the principal. |
| Farmers harvest yams in August. | Yams are harvested in August by farmers. |
| The chef will prepare jollof rice. | Jollof rice will be prepared by the chef. |`,
    keyTakeaways: [
      'Transitive verbs take a direct object; intransitive verbs do not.',
      'In active voice, the subject acts; in passive voice, the subject is acted upon.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-eng-t2-w3',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'English Language',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Tenses: Present Perfect & Past Perfect Tenses',
    subtopics: ['Structure of Present Perfect (has/have + past participle)', 'Uses: Completed Actions with Present Relevance', 'Structure of Past Perfect (had + past participle)', 'Sequence of Tenses in Complex Sentences'],
    readingTimeMinutes: 7,
    summary: 'Mastering aspectual perfection in English verbs, distinguishing present perfect from simple past, and past perfect timelines.',
    contentMarkdown: `### 1. Present Perfect Tense
- **Formula:** $\\text{Subject} + \\text{have / has} + \\text{Past Participle (V3)}$
- **Use:** Describes an action completed at an unspecified past time whose result connects directly to the present.
  - *"She **has finished** her homework (and is now ready to play)."*
  - *"They **have lived** in Abuja for five years (and still live there)."*

---

### 2. Past Perfect Tense
- **Formula:** $\\text{Subject} + \\text{had} + \\text{Past Participle (V3)}$
- **Use:** Indicates an action that was completed before another past action occurred.
  - *"The bus **had left** before we arrived at the terminal."*
  - First action (earlier past): *bus had left*.
  - Second action (past): *we arrived*.`,
    keyTakeaways: [
      'Present perfect uses has/have + past participle for past actions with present impact.',
      'Past perfect uses had + past participle to show which of two past events happened first.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-eng-t2-w4',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'English Language',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Adverbials: Time, Place, Frequency, Manner & Reason',
    subtopics: ['Meaning and Types of Adverbs', 'Adverbs vs Adverbial Phrases and Clauses', 'Adverbials of Manner (How)', 'Adverbials of Frequency and Time (When & How Often)'],
    readingTimeMinutes: 7,
    summary: 'Modifying verbs, adjectives, and whole clauses with adverbs and adverbial phrases of time, location, and reason.',
    contentMarkdown: `### 1. Types of Adverbials
Adverbials add essential details answering *how, when, where, how often, or why* an action occurred.

| Type | Question Answered | Example Sentence |
|---|---|---|
| **Manner** | How? | She explained the solution **patiently and clearly**. |
| **Time** | When? | The assembly will commence **at 7:45 AM tomorrow**. |
| **Place** | Where? | The students gathered **under the mango tree**. |
| **Frequency** | How often? | He **regularly** revises his mathematics formulas. |
| **Reason** | Why? | She studied diligently **so that she could pass the BECE**. |`,
    keyTakeaways: [
      'Adverbials modify verbs, adjectives, or entire clauses.',
      'They supply circumstantial details of manner, time, place, degree, and purpose.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-eng-t2-w5',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'English Language',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Formal Letter Writing: Application for Permission',
    subtopics: ['Features of a Formal Letter', 'The Two Addresses Layout (Writer’s and Recipient’s)', 'Salutation, Title/Subject Line & Formal Tone', 'Complimentary Close and Signature'],
    readingTimeMinutes: 8,
    summary: 'Mastering the standardized format and formal register of administrative letters to school principals and public officials.',
    contentMarkdown: `### 1. The Layout of a Formal Letter
A formal (business/official) letter must be professional, concise, and adhere strictly to conventional formatting:
1. **Writer’s Address & Date:** Top right-hand corner.
2. **Recipient’s Designation & Address:** Left-hand margin below the writer’s address level.
3. **Salutation:** *"Dear Sir,"* or *"Dear Madam,"*.
4. **Heading / Title:** Centered or left-aligned in bold capital letters (e.g. **APPLICATION FOR LEAVE OF ABSENCE**).
5. **Body Paragraphs:** Formal register; no slangs, no abbreviations, no contractions (use *"do not"* instead of *"don't"*).
6. **Complimentary Close:** *"Yours faithfully,"* followed by signature and full printed name.`,
    keyTakeaways: [
      'Formal letters require two addresses: writer on top right, recipient on left.',
      'Never use informal contractions (don’t, won’t) in a formal letter.',
      'End formal letters with "Yours faithfully," followed by signature and printed name.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-eng-t2-w6',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'English Language',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Expository Essay: Causes & Effects of Flooding in Nigeria',
    subtopics: ['Meaning of Expository Writing (Explaining Factual Realities)', 'Structuring an Essay (Introduction, Body Paragraphs, Conclusion)', 'Paragraph Transitions and Cohesion', 'Developing Logical Supporting Points'],
    readingTimeMinutes: 8,
    summary: 'Writing objective, well-researched expository essays analyzing environmental issues affecting Nigerian states.',
    contentMarkdown: `### 1. What is an Expository Essay?
An expository essay explains, clarifies, illustrates, or elucidates a specific topic logically using facts, statistics, and verifiable examples without emotional bias.

---

### 2. Essay Outline: Flooding in Nigeria
- **Introduction:** Definition of flooding; prevalence during the rainy season along the Niger and Benue river basins.
- **Body Paragraph 1 (Causes):** Indiscriminate dumping of refuse in street drainage gutters blocking stormwater flow.
- **Body Paragraph 2 (Causes):** Building residential houses on natural drainage floodplains without town planning approval.
- **Body Paragraph 3 (Effects):** Destruction of agricultural farmland, displacement of rural families, outbreak of waterborne cholera.
- **Conclusion:** Summary recommendations: strict environmental sanitation enforcement, desilting canals, and building dams.`,
    keyTakeaways: [
      'Expository essays explain facts objectively with clear evidence.',
      'Each body paragraph must begin with a strong topic sentence followed by supporting details.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-eng-t2-w7',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'English Language',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Reading Comprehension: Inferences & Critical Evaluation',
    subtopics: ['Direct Information vs Implied Meaning', 'Context Clues for Unfamiliar Words', 'Identifying Author’s Tone and Purpose', 'Summarizing Paragraph Arguments'],
    readingTimeMinutes: 7,
    summary: 'Developing critical analytical reading strategies, decoding implied meaning, and identifying tone in examination passages.',
    contentMarkdown: `### 1. Making Inferences
An inference is a logical deduction made from textual clues and evidence rather than explicit direct statements (*"reading between the lines"*).
- *Text clue:* *"Amina looked at the cloudy gray sky, pulled out her umbrella from her schoolbag, and hurried towards the bus stop."*
- *Inference:* It was about to rain, and Amina wanted to avoid getting drenched.

---

### 2. Vocabulary in Context:
Never panic when encountering an unfamiliar word in an exam passage. Examine:
- The surrounding sentences.
- Synonym clues and antonym contrast markers (*"unlike", "however"*).
- Grammatical function (is it a verb, noun, or descriptive adjective?).`,
    keyTakeaways: [
      'Inference means deducing unstated truths using evidence from the passage.',
      'Context clues in surrounding sentences reveal the meaning of unfamiliar words.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-eng-t2-w8',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'English Language',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Oral English: Contrast of Vowel Sounds (/ʌ/ vs /æ/)',
    subtopics: ['Vocal Anatomy: Tongue Height and Lip Shape', 'The Short Front Vowel /æ/ (as in cat, bat, man)', 'The Central Short Vowel /ʌ/ (as in cup, but, bus)', 'Minimal Pairs Practice and Pronunciation Drills'],
    readingTimeMinutes: 7,
    summary: 'Phonetic discrimination and pronunciation mastery of contrasting English short vowels tested in BECE.',
    contentMarkdown: `### 1. Minimal Pair Contrasts (/æ/ vs /ʌ/)
Accurate oral English requires distinguishing between the low front vowel **/æ/** and the central short vowel **/ʌ/**.

| /æ/ (Front Open Vowel) | /ʌ/ (Central Short Vowel) | Contrast in Sentence |
|---|---|---|
| **Cat** | **Cut** | The *cat* had a small *cut* on its paw. |
| **Hat** | **Hut** | The farmer left his *hat* inside the *hut*. |
| **Match** | **Much** | How *much* does this box of *match* cost? |
| **Cap** | **Cup** | Place the bottle *cap* next to the tea *cup*. |
| **Batter** | **Butter** | Add fresh *butter* to the cake *batter*. |`,
    keyTakeaways: [
      '/æ/ is pronounced with wider jaw opening and spread lips (bag, cat).',
      '/ʌ/ is produced with a relaxed central tongue position (bug, cut).'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-eng-t2-w9',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'English Language',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Oral English: Consonant Clusters (Initial & Final Clusters)',
    subtopics: ['What is a Consonant Cluster?', 'Two-Consonant Initial Clusters (/pl-/, /br-/, /st-/)', 'Three-Consonant Initial Clusters (/str-/, /spl-/, /skr-/)', 'Final Consonant Clusters (/-sts/, /-lpt/, /-mps/)'],
    readingTimeMinutes: 7,
    summary: 'Mastering smooth articulation of adjacent consonant sequences without inserting epenthetic vowels.',
    contentMarkdown: `### 1. Understanding Consonant Clusters
A consonant cluster occurs when two, three, or four consonant sounds occur consecutively in a word without an intervening vowel sound.
- **Initial Clusters:**
  - 2 consonants: *bread* (/br/), *cloud* (/kl/), *train* (/tr/).
  - 3 consonants: *splash* (/spl/), *spring* (/spr/), *street* (/str/).

---

### 2. Avoiding Vowel Insertion (Epenthesis):
In many Nigerian language backgrounds, speakers tend to insert an intrusive vowel sound between consonants (e.g. pronouncing *"school"* as *"is-kulu"*).
- Practice pronouncing clusters smoothly:
  - *texts* (/teksts/), *desks* (/desks/), *grasped* (/grɑːspt/).`,
    keyTakeaways: [
      'Consonant clusters consist of consecutive consonants without intervening vowel sounds.',
      'Avoid inserting extra vowel sounds into consonant clusters.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-eng-t2-w10',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'English Language',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Literature-in-English: Character Motivation in African Prose',
    subtopics: ['Internal vs External Character Motivation', 'Round vs Flat Characters', 'Protagonist vs Antagonist Conflict', 'Relating Novel Themes to Modern Nigerian Society'],
    readingTimeMinutes: 7,
    summary: 'Analyzing why literary characters act, evaluating moral decisions, and linking fictional conflicts to contemporary society.',
    contentMarkdown: `### 1. Understanding Character Motivation
Character motivation refers to the psychological desires, fears, ambitions, or moral convictions that drive a character to behave the way they do in a novel.
- **Internal Motivation:** Ambition, guilt, jealousy, love, honor.
- **External Motivation:** Poverty, parental pressure, societal laws, warfare.

---

### 2. Character Classifications:
- **Round (Dynamic) Character:** Complex, realistic character with multidimensional traits who evolves and changes through experience.
- **Flat (Static) Character:** Simple, predictable character representing a single dominant trait who remains unchanged throughout the story.`,
    keyTakeaways: [
      'Character motivation explains the internal and external forces driving a character’s choices.',
      'Round characters evolve with experience; flat characters remain static.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },

  // ==========================================
  // BASIC SCIENCE (WEEKS 1 - 10)
  // ==========================================
  {
    id: 'jss2-sci-t2-w1',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Work, Energy & Power: Definitions, Formulas & Units',
    subtopics: ['Scientific Definition of Work', 'Work Formula: W = F × d (Joules)', 'Energy: Capacity to Do Work', 'Power Formula: P = W / t (Watts) & Calculations'],
    readingTimeMinutes: 8,
    summary: 'Foundational physical mechanics: mathematical calculations of mechanical work done, energy expenditure, and electrical power.',
    contentMarkdown: `### 1. Work in Science
In physics, **Work** is done only when an applied force causes an object to move through a distance in the direction of the force:
$$\\text{Work Done} = \\text{Force} \\times \\text{Distance moved}$$
$$W = F \\times d$$
- **Unit of Work:** Joules ($\\text{J}$), where $1\\text{ J} = 1\\text{ N} \\times 1\\text{ m}$.

---

### 2. Energy & Power
- **Energy:** The capacity or ability to do work. Also measured in **Joules (J)**.
- **Power:** The rate at which work is done or the rate at which energy is converted:
$$\\text{Power} = \\frac{\\text{Work Done}}{\\text{Time Taken}} = \\frac{W}{t}$$
- **Unit of Power:** Watt ($\\text{W}$), where $1\\text{ W} = 1\\text{ J/s}$.

#### Worked Calculation:
A boy applies a force of $50\\text{ N}$ to push a wheelbarrow through a distance of $20\\text{ m}$ in $10\\text{ seconds}$. Calculate the work done and his power output:
- $\\text{Work} = 50\\text{ N} \\times 20\\text{ m} = 1,000\\text{ Joules}$
- $\\text{Power} = \\frac{1,000\\text{ J}}{10\\text{ s}} = 100\\text{ Watts}$`,
    keyTakeaways: [
      'Work is done only when force causes displacement in the direction of the force.',
      'Work and Energy are measured in Joules (J); Power is measured in Watts (W).'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-sci-t2-w2',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Energy Transformations & The Law of Conservation',
    subtopics: ['Forms of Energy (Kinetic, Potential, Chemical, Solar)', 'The Law of Conservation of Energy', 'Energy Transformations in Daily Life', 'Renewable vs Non-Renewable Energy in Nigeria'],
    readingTimeMinutes: 8,
    summary: 'The universal principle of energy conservation, kinetic vs potential energy transformations, and Nigerian energy infrastructure.',
    contentMarkdown: `### 1. Law of Conservation of Energy
> The Law of Conservation of Energy states that **energy can neither be created nor destroyed, but can only be transformed from one form to another.** Total energy in an isolated system remains constant.

---

### 2. Common Energy Conversions in Daily Life:
- **Hydroelectric Dam (Kainji / Shiroro):** Gravitational Potential Energy of stored dam water $\\to$ Kinetic Energy of flowing water $\\to$ Mechanical Energy of rotating turbines $\\to$ Electrical Energy.
- **Electric Iron:** Electrical Energy $\\to$ Thermal (Heat) Energy.
- **Solar Panels:** Light (Solar) Energy $\\to$ Electrical Energy.
- **Car Engine:** Chemical Energy stored in fuel $\\to$ Thermal Energy $\\to$ Kinetic Energy of motion.`,
    keyTakeaways: [
      'Energy cannot be created or destroyed; it only changes form.',
      'Kainji dam converts potential energy of elevated water into electrical power.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-sci-t2-w3',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Kinetic Theory of Matter: States, Diffusion & Brownian Motion',
    subtopics: ['Postulates of the Kinetic Theory of Matter', 'Arrangement of Particles in Solids, Liquids & Gases', 'Diffusion: Movement of Particles from High to Low Concentration', 'Brownian Motion: Random Zig-Zag Particle Motion'],
    readingTimeMinutes: 8,
    summary: 'Microscopic particle models explaining the macroscopic behavior of matter, thermal expansion, diffusion, and Brownian motion.',
    contentMarkdown: `### 1. States of Matter according to Kinetic Theory
Matter is made of tiny particles (atoms, molecules, ions) that are in continuous random motion.

| State of Matter | Particle Arrangement | Intermolecular Forces | Movement of Particles |
|---|---|---|---|
| **Solid** | Tightly packed in fixed geometric lattices | Very strong | Vibrate about fixed positions |
| **Liquid** | Closely packed but can slide past each other | Moderate | Slide and flow past one another |
| **Gas** | Very far apart with vast empty spaces | Extremely weak (negligible) | Move rapidly and randomly at high speeds |

---

### 2. Evidences for Particle Motion:
- **Diffusion:** Spontaneous spreading of perfume aroma across a room or potassium permanganate crystals dissolving in water.
- **Brownian Motion:** Random, zig-zag motion of suspended smoke particles under a microscope caused by collisions with invisible air molecules.`,
    keyTakeaways: [
      'All matter consists of particles in continuous random motion.',
      'Diffusion and Brownian motion provide direct experimental proof that particles move constantly.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-sci-t2-w4',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Thermal Energy & Heat Transfer: Conduction, Convection & Radiation',
    subtopics: ['Difference between Heat and Temperature', 'Conduction: Transfer through Solids without Particle Movement', 'Convection: Transfer through Fluids via Density Currents', 'Radiation: Transfer via Electromagnetic Waves through Vacuum'],
    readingTimeMinutes: 8,
    summary: 'Thermodynamics of thermal energy propagation, practical applications (vacuum flasks, sea breezes), and insulating materials.',
    contentMarkdown: `### 1. Heat vs Temperature
- **Heat:** A form of thermal energy that flows from a body of higher temperature to one of lower temperature (measured in Joules).
- **Temperature:** The degree of hotness or coldness of a substance (measured in degrees Celsius or Kelvin).

---

### 2. The Three Modes of Heat Transfer:
1. **Conduction:** Heat transfer through solids by direct atomic vibrations without bodily displacement of material (e.g. metal spoon heating up in hot tea). Metals are good conductors; wood and plastics are insulators.
2. **Convection:** Heat transfer through fluids (liquids and gases) via actual bodily movement of warm, less dense fluid rising and cool, dense fluid sinking (e.g. boiling water, sea breezes).
3. **Radiation:** Heat transfer through empty space (vacuum) via electromagnetic infrared waves without requiring any material medium (e.g. warmth from the sun reaching Earth).`,
    keyTakeaways: [
      'Conduction occurs in solids; convection in fluids; radiation through a vacuum.',
      'The vacuum flask (thermos) minimizes all three heat transfer mechanisms.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-sci-t2-w5',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Crude Oil & Petrochemicals: Fractional Distillation',
    subtopics: ['Origin and Formation of Crude Oil (Petroleum)', 'Exploration and Drilling in the Niger Delta', 'Fractional Distillation in Oil Refineries', 'Petrochemical Products (Plastics, Synthetic Fibres, Fertilizers)'],
    readingTimeMinutes: 8,
    summary: 'The backbone of the Nigerian economy: petroleum formation, industrial refining by boiling points, and petrochemical derivatives.',
    contentMarkdown: `### 1. Formation & Refining of Petroleum
Crude oil was formed millions of years ago from the remains of microscopic marine plants and animals buried under extreme heat and pressure beneath sedimentary rock layers.
- In oil refineries (Port Harcourt, Warri, Kaduna, Dangote Refinery), crude oil is separated into fractions by **Fractional Distillation** based on differences in **boiling points**.

| Fraction | Boiling Point Range | Major Uses |
|---|---|---|
| **Refinery Gas** | Below $40^\\circ\\text{C}$ | Cooking gas (LPG: butane and propane) |
| **Petrol (PMS)** | $40^\\circ - 180^\\circ\\text{C}$ | Motor car engine fuel |
| **Kerosene (DPK)** | $180^\\circ - 250^\\circ\\text{C}$ | Domestic cooking stoves and aviation jet fuel |
| **Diesel (AGO)** | $250^\\circ - 350^\\circ\\text{C}$ | Heavy trucks, generators, and locomotives |
| **Bitumen (Asphalt)**| Residue ($>400^\\circ\\text{C}$) | Road surfacing and roof waterproofing |`,
    keyTakeaways: [
      'Fractional distillation separates crude oil components based on boiling points.',
      'Petrochemicals supply plastics, detergents, synthetic textiles, and fertilizers.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-sci-t2-w6',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Chemical Elements & The First 20 Elements of the Periodic Table',
    subtopics: ['Definition of an Element, Compound & Mixture', 'Chemical Symbols (Latin vs English Derivations)', 'Atomic Structure: Protons, Neutrons & Electrons', 'Listing the First 20 Elements in Order of Atomic Number'],
    readingTimeMinutes: 8,
    summary: 'Atomic physics, chemical symbols, electron arrangements, and memorizing the first 20 elements of the periodic table.',
    contentMarkdown: `### 1. What is a Chemical Element?
An element is a pure chemical substance that cannot be broken down into simpler substances by ordinary chemical methods.
- Atoms consist of a central **nucleus** containing positively charged **protons** and neutral **neutrons**, surrounded by negatively charged **electrons** orbiting in shells.

---

### 2. The First 20 Elements (in order of Atomic Number $Z$):
1. **H** - Hydrogen ($Z=1$)
2. **He** - Helium ($Z=2$)
3. **Li** - Lithium ($Z=3$)
4. **Be** - Beryllium ($Z=4$)
5. **B** - Boron ($Z=5$)
6. **C** - Carbon ($Z=6$)
7. **N** - Nitrogen ($Z=7$)
8. **O** - Oxygen ($Z=8$)
9. **F** - Fluorine ($Z=9$)
10. **Ne** - Neon ($Z=10$)
11. **Na** - Sodium (*Natrium*, $Z=11$)
12. **Mg** - Magnesium ($Z=12$)
13. **Al** - Aluminium ($Z=13$)
14. **Si** - Silicon ($Z=14$)
15. **P** - Phosphorus ($Z=15$)
16. **S** - Sulphur ($Z=16$)
17. **Cl** - Chlorine ($Z=17$)
18. **Ar** - Argon ($Z=18$)
19. **K** - Potassium (*Kalium*, $Z=19$)
20. **Ca** - Calcium ($Z=20$)`,
    keyTakeaways: [
      'Atomic number (Z) equals the number of protons in an atom’s nucleus.',
      'Some symbols derive from Latin names: Na for Natrium (Sodium), K for Kalium (Potassium).'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-sci-t2-w7',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'The Human Respiratory System: Breathing & Gas Exchange',
    subtopics: ['Organs of Respiration (Nose, Trachea, Bronchi, Alveoli, Lungs)', 'Mechanics of Inhalation vs Exhalation', 'Gas Exchange in the Alveoli via Diffusion', 'Aerobic vs Anaerobic Respiration Formula'],
    readingTimeMinutes: 8,
    summary: 'Physiology of pulmonary respiration, diaphragmatic breathing mechanics, and alveolar gas diffusion.',
    contentMarkdown: `### 1. Pathway of Air in the Respiratory Tract:
$$\\text{Nostrils} \\to \\text{Pharynx} \\to \\text{Larynx} \\to \\text{Trachea} \\to \\text{Bronchi} \\to \\text{Bronchioles} \\to \\text{Alveoli}$$

---

### 2. Mechanics of Inhalation vs Exhalation:
- **Inhalation (Breathing In):**
  - External intercostal muscles contract; ribcage moves **upward and outward**.
  - The muscular **diaphragm contracts and flattens**.
  - Thoracic volume increases; pressure drops inside lungs, drawing air in.
- **Exhalation (Breathing Out):**
  - Intercostal muscles relax; ribcage moves **downward and inward**.
  - Diaphragm relaxes, returning to its upward dome shape.
  - Thoracic volume decreases; pressure rises, pushing air out.

---

### 3. Cellular Respiration Equation:
$$\\text{Glucose} + \\text{Oxygen} \\to \\text{Carbon Dioxide} + \\text{Water} + \\text{Energy (ATP)}$$
$$\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\to 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + 38\\text{ ATP}$$`,
    keyTakeaways: [
      'Alveoli are microscopic air sacs where oxygen diffuses into blood and carbon dioxide leaves.',
      'During inhalation, the diaphragm contracts and flattens, expanding thoracic volume.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-sci-t2-w8',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'The Human Circulatory System: Heart Anatomy & Blood Vessels',
    subtopics: ['Components of the Circulatory System', 'Structure of the Heart (4 Chambers, Valves)', 'Arteries, Veins & Capillaries Comparison', 'Double Circulation (Pulmonary vs Systemic)'],
    readingTimeMinutes: 8,
    summary: 'Cardiovascular anatomy, blood flow circuits through the 4-chambered heart, and blood vessel hemodynamics.',
    contentMarkdown: `### 1. The Human Heart
The heart is a muscular conical pumping organ divided into **4 chambers**:
- **Right Atrium & Right Ventricle:** Receive and pump deoxygenated blood to the lungs (pulmonary circuit).
- **Left Atrium & Left Ventricle:** Receive oxygenated blood from lungs and pump it out to the whole body through the aorta (systemic circuit).
- The **left ventricle** has the thickest muscular wall because it pumps blood against high resistance throughout the entire body.

---

### 2. Comparison of Blood Vessels:

| Feature | Arteries | Veins | Capillaries |
|---|---|---|---|
| **Direction of Flow** | Away from heart | Toward heart | Connects arteries to veins |
| **Oxygen Content** | Oxygenated (except Pulmonary Artery) | Deoxygenated (except Pulmonary Vein) | Mixed exchange point |
| **Wall Thickness** | Thick, muscular, elastic | Thin, less muscular | Single-cell layer thick |
| **Internal Valves** | Absent (high pressure) | Present (prevents backflow) | Absent |`,
    keyTakeaways: [
      'The human heart has 4 chambers; the left ventricle has the thickest muscular wall.',
      'Arteries carry blood away from the heart; veins return blood to the heart with valves.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-sci-t2-w9',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Reproductive Health: Male & Female Anatomy and Conception',
    subtopics: ['Male Reproductive Organs (Testes, Vas Deferens, Penis)', 'Female Reproductive Organs (Ovaries, Fallopian Tubes, Uterus)', 'Gametes: Sperm Cells vs Ova', 'Fertilization and Pregnancy Development'],
    readingTimeMinutes: 8,
    summary: 'Biological fundamentals of human reproduction, gamete production, fertilization in the fallopian tube, and fetal development.',
    contentMarkdown: `### 1. Reproductive Organs & Gametes
- **Male System:** Testes produce male sex cells (**sperm**) and the hormone testosterone. Sperm travels through the vas deferens and urethra.
- **Female System:** Ovaries produce female eggs (**ova**) and hormones (estrogen, progesterone). The uterus (womb) nurtures the developing baby.

---

### 2. Fertilization & Implantation
- **Fertilization:** The fusion of the nucleus of a male sperm with the nucleus of a female ovum to form a single diploid cell called a **zygote**.
- Fertilization occurs inside the **Fallopian tube (Oviduct)**.
- The zygote divides repeatedly to form an embryo, which implants into the vascular wall of the **Uterus** for 9 months of gestation.`,
    keyTakeaways: [
      'Fertilization is the fusion of sperm and ovum, occurring inside the fallopian tube.',
      'The fetus develops and receives nourishment through the placenta in the uterus.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-sci-t2-w10',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Environmental Hazards: Deforestation & Desertification',
    subtopics: ['Meaning and Causes of Deforestation in Nigeria', 'Soil Erosion and Gully Formation (e.g. Anambra/Enugu)', 'Desert Encroachment in Northern Nigeria (Great Green Wall)', 'Bush Burning and Environmental Conservation Laws'],
    readingTimeMinutes: 7,
    summary: 'Ecological degradation in Nigeria, combatting northern desertification and southern gully erosion.',
    contentMarkdown: `### 1. Deforestation & Soil Erosion
Deforestation is the indiscriminate cutting down of forest trees without replanting:
- **Causes:** Logging for timber, clearing land for urban housing, gathering firewood for cooking.
- **Consequences:** Removal of tree roots exposes topsoil to torrential rainfall, creating devastating gully erosion (widely seen in Agulu-Nanka, Anambra State).

---

### 2. Desertification in Northern Nigeria
The southward encroachment of the Sahara Desert across northern frontline states (Sokoto, Katsina, Borno, Yobe, Jigawa).
- **Mitigation:** The African Union’s **Great Green Wall Project**—planting a shelterbelt of drought-resistant trees across northern Nigeria to halt desertification.`,
    keyTakeaways: [
      'Deforestation triggers catastrophic soil erosion and biodiversity loss.',
      'The Great Green Wall initiative plants protective tree belts to halt northern desert encroachment.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },

  // ==========================================
  // BASIC TECHNOLOGY (WEEKS 1 - 10)
  // ==========================================
  {
    id: 'jss2-btech-t2-w1',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'First Aid in the Workshop: Electric Shock, Burns & Severe Cuts',
    subtopics: ['First Aid Priorities in Technical Workshops', 'Emergency Treatment of Electric Shock (Switch Off Mains)', 'First Aid for Thermal Burns and Chemical Scalds', 'Controlling Arterial Bleeding and Sterile Bandaging'],
    readingTimeMinutes: 7,
    summary: 'Workshop emergency procedures, immediate management of electrical injuries, severe bleeding, and thermal burns.',
    contentMarkdown: `### 1. Electric Shock Protocol
When an operator contacts a live electric wire in the workshop:
1. **Never touch the victim directly with bare hands!**
2. Immediately switch off the main electrical circuit breaker.
3. If the switch cannot be reached, use a dry, non-conductive wooden stick or rubber hose to pry the victim away from the wire.
4. Check breathing and administer artificial respiration if unconscious.

---

### 2. Managing Burns & Severe Bleeding:
- **Burns & Scalds:** Hold the burned area under cold, gently running water for at least 10 minutes. Do not apply oil, butter, or puncture blisters.
- **Severe Cuts:** Apply direct pressure with a clean, sterile dressing. Elevate the bleeding limb above heart level to reduce blood loss.`,
    keyTakeaways: [
      'Never touch an electric shock victim with bare hands; disconnect power or use dry wood.',
      'Cool thermal burns immediately under running cold water; apply direct pressure to stop bleeding.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-btech-t2-w2',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Rescue Operations & Emergency Relief Agencies',
    subtopics: ['Meaning of Rescue Operations', 'Situations Requiring Rescue (Building Collapse, Fire, Drowning)', 'Roles of FRSC, NEMA, Fire Service, and Red Cross', 'Emergency Contact Codes in Nigeria'],
    readingTimeMinutes: 7,
    summary: 'Coordinated rescue protocols, disaster management, and the operational roles of Nigerian emergency response agencies.',
    contentMarkdown: `### 1. What is a Rescue Operation?
A rescue operation is an organized emergency intervention conducted to extract people from hazardous situations, structural collapses, fires, or natural disasters to save human lives.

#### Key Emergency Agencies in Nigeria:
- **NEMA (National Emergency Management Agency):** Coordinates disaster relief, supplies aid to flood and displaced victims.
- **Federal & State Fire Services:** Quenches industrial and residential fires; rescues trapped occupants.
- **FRSC (Federal Road Safety Corps):** Rescues victims of highway motor accidents and clears road blockades.
- **Nigerian Red Cross Society:** Provides impartial first aid, ambulances, and humanitarian care.`,
    keyTakeaways: [
      'Rescue operations save victims trapped in fires, building collapses, and road crashes.',
      'NEMA leads national disaster management, assisted by the Fire Service and FRSC.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-btech-t2-w3',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Materials & Processing: Ferrous & Non-Ferrous Metals',
    subtopics: ['Classification of Metals', 'Ferrous Metals (Cast Iron, Wrought Iron, Mild Steel)', 'Non-Ferrous Metals (Aluminium, Copper, Zinc, Lead)', 'Alloys (Brass, Bronze, Duralumin)'],
    readingTimeMinutes: 8,
    summary: 'Metallurgy of engineering materials, magnetic iron derivatives, non-ferrous conductivity, and alloy compositions.',
    contentMarkdown: `### 1. Ferrous vs Non-Ferrous Metals
- **Ferrous Metals:** Contain iron as their principal constituent. They are magnetic and prone to rust when exposed to moisture and oxygen.
  - *Cast Iron:* Brittle, high compressive strength (engine cylinder blocks, machine bases).
  - *Mild Steel:* Malleable, ductile, easily welded (roof trusses, car bodies, reinforcement rods).
- **Non-Ferrous Metals:** Contain no iron. They are non-magnetic and do not rust.
  - *Aluminium:* Lightweight, corrosion resistant (aircraft frames, cooking pots, window frames).
  - *Copper:* Excellent electrical and thermal conductor (electrical wiring).

---

### 2. Important Engineering Alloys:
- **Brass:** Copper ($65\\%$) + Zinc ($35\\%$) $\\to$ musical instruments, decorative door handles.
- **Bronze:** Copper ($90\\%$) + Tin ($10\\%$) $\\to$ bearings, statues, medals.`,
    keyTakeaways: [
      'Ferrous metals contain iron and are magnetic; non-ferrous metals contain no iron and resist rust.',
      'Brass is an alloy of Copper and Zinc; Bronze is an alloy of Copper and Tin.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-btech-t2-w4',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Woodworking Machines: Types & Operational Safety',
    subtopics: ['Circular Saw Bench (Ripping and Cross-cutting)', 'Band Saw (Cutting Curves and Irregular Profiles)', 'Surface Planer and Thicknesser', 'Wood Lathe (Turning Cylindrical Shapes)'],
    readingTimeMinutes: 8,
    summary: 'Heavy timber processing machinery, precision power tool operation, and woodworking workshop safety.',
    contentMarkdown: `### 1. Common Woodworking Machines:
- **Circular Saw:** Features a circular spinning toothed blade for ripping timber along the grain and cross-cutting across the grain.
- **Band Saw:** Uses an endless flexible steel band blade over two rotating pulleys for cutting intricate curved contours and thick boards.
- **Surface Planer (Jointer):** Levels and planes true flat reference faces on rough sawn timber.
- **Thicknesser:** Machines timber to a precise, uniform required thickness throughout its length.
- **Wood Lathe:** Rotates wood between centers while stationary gouges turn it into symmetrical cylindrical forms (table legs, bowls).

---

### 2. Machine Safety Guidelines:
- Always use push-sticks when feeding wood near spinning blades.
- Wear safety goggles and ear defenders.
- Never wear loose clothing, neckties, or jewelry that could snag in spinning spindles.`,
    keyTakeaways: [
      'Circular saws rip straight lumber; band saws cut intricate curves and contours.',
      'Always feed timber using push-sticks and wear safety goggles around woodworking machines.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-btech-t2-w5',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Metalwork Machines: Drilling Machine, Lathe & Grinder',
    subtopics: ['The Pillar / Bench Drilling Machine (Parts & Speeds)', 'The Center Lathe (Facing, Turning, Parting)', 'Pedestal Grinding Machine & Tool Sharpening', 'Cutting Fluids and Lubrication'],
    readingTimeMinutes: 8,
    summary: 'Precision metal removal machinery, chuck clamping mechanisms, lathe turning operations, and tool sharpening.',
    contentMarkdown: `### 1. The Center Lathe (The King of Machine Tools)
The center lathe holds a metal workpiece securely in a **chuck** and rotates it against a stationary single-point cutting tool:
- **Facing:** Producing a flat end perpendicular to the axis.
- **Parallel (Cylindrical) Turning:** Reducing the diameter along the length.
- **Parting Off:** Cutting off a finished component using a narrow tool.

---

### 2. Pillar Drilling Machine & Pedestal Grinder:
- **Drill Chuck:** Holds twist drill bits tightly to bore accurate cylindrical holes through metal plates.
- **Pedestal Grinder:** Uses abrasive silicon carbide grinding wheels to dress, sharpen, and restore keen cutting edges on chisels and drill bits.`,
    keyTakeaways: [
      'The center lathe rotates the workpiece against a stationary cutting tool.',
      'Cutting fluids cool tools and flush away metal chips during machining.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-btech-t2-w6',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Technical Drawing: Geometrical Construction of Tangents',
    subtopics: ['Principles of Tangency (Line Touching a Curve at One Point)', 'Drawing a Tangent to a Circle at a Given Point on Circumference', 'Drawing a Tangent from an External Point to a Circle', 'Constructing Internal and External Common Tangents'],
    readingTimeMinutes: 8,
    summary: 'Engineering draughtsmanship: geometric rules of tangency, normal lines, and belt drive profile layouts.',
    contentMarkdown: `### 1. What is a Tangent?
A tangent is a straight line that touches the circumference of a circle at exactly **one point** without cutting across the circle.
- **Fundamental Rule:** The tangent is always **perpendicular ($90^\\circ$)** to the radius drawn to the point of contact.

---

### 2. Drawing Tangent at a Point $P$ on Circumference:
1. Draw circle with center $O$ and locate point $P$ on the circumference.
2. Draw a line from center $O$ through $P$ and extend it slightly outside the circle.
3. Construct a perpendicular line to line $OP$ passing directly through point $P$.
4. The perpendicular line is the required tangent!`,
    keyTakeaways: [
      'A tangent touches a circle at exactly one point and is perpendicular to the radius at that point.',
      'Common tangents form the geometric profile for industrial belt drives.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-btech-t2-w7',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Isometric & Oblique Projections: 3D Drawing',
    subtopics: ['Pictorial vs Orthographic Projections', 'Isometric Axes (30° to the Horizontal Baseline)', 'Oblique Projection (45° Receding Axis)', 'Cavalier vs Cabinet Oblique Scales'],
    readingTimeMinutes: 8,
    summary: 'Three-dimensional pictorial draughtsmanship, isometric box construction, and oblique projections.',
    contentMarkdown: `### 1. Isometric Projection
A 3D drawing technique where all horizontal lines are drawn at an angle of **$30^\\circ$** to the horizontal baseline using a $30^\\circ/60^\\circ$ set-square:
- Vertical lines remain vertical.
- All dimensions along the isometric axes are drawn to full scale ($1:1$).

---

### 2. Oblique Projection
The front face of the object is drawn flat and parallel to the viewer ($0^\\circ$), while the depth/receding axis is projected backward at an angle of **$45^\\circ$**.
- **Cavalier Oblique:** Receding axis is drawn at **full scale** (can look distorted).
- **Cabinet Oblique:** Receding axis is drawn at **half scale ($1:2$)** to create a more realistic natural appearance.`,
    keyTakeaways: [
      'Isometric drawing uses two axes tilted at 30° to the horizontal baseline.',
      'Cabinet oblique projection halves the depth axis to avoid visual distortion.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-btech-t2-w8',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Mechanical Drives: Belt & Chain Drives',
    subtopics: ['Power Transmission Systems', 'Belt Drives (Flat Belts, V-Belts, Pulleys)', 'Chain and Sprocket Drives (Bicycles, Motorcycles)', 'Velocity Ratio and Slip Comparison'],
    readingTimeMinutes: 8,
    summary: 'Mechanics of rotational power transmission between shafts using pulleys, belts, and chain sprockets.',
    contentMarkdown: `### 1. Belt Drives
Transmit rotational power between two shafts using flexible belts mounted on pulleys.
- **Open Belt Drive:** Both pulleys rotate in the **same direction**.
- **Crossed Belt Drive:** Pulleys rotate in **opposite directions**.
- **V-Belts:** Wedge-shaped belts fitting into grooved pulleys to minimize slip (e.g. car alternator belts).

---

### 2. Chain Drives (Sprocket & Chain)
Transmit positive power without slipping (e.g. bicycle drive, motorcycle engine):
- Uses toothed wheels called **sprockets** connected by an articulated roller chain.
- Requires regular oiling to prevent friction wear.`,
    keyTakeaways: [
      'Belt drives transmit power flexibly over distances; V-belts reduce slippage.',
      'Chain and sprocket drives provide positive non-slip transmission.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-btech-t2-w9',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Friction & Lubrication in Engineering Systems',
    subtopics: ['Definition and Types of Friction (Static vs Kinetic)', 'Advantages and Disadvantages of Friction in Machines', 'Methods of Reducing Friction (Lubrication, Ball Bearings)', 'Types of Lubricants (Oils, Greases, Solid Graphite)'],
    readingTimeMinutes: 7,
    summary: 'Tribology fundamentals: reducing parasitic mechanical friction, preventing machine wear, and industrial lubricants.',
    contentMarkdown: `### 1. Friction in Machinery
Friction is the opposing resistive force that arises when two surfaces slide or attempt to slide across one another:
- **Disadvantages:** Produces unwanted heat, wears out moving engine parts, wastes fuel and energy.
- **Advantages:** Enables walking without slipping, vehicle braking, driving nails into wood.

---

### 2. Lubrication
Applying a thin slippery film of lubricant between rubbing metal surfaces to substitute fluid friction for solid friction:
- **Liquid Lubricants:** Engine oil, gear oils.
- **Semi-Solid Lubricants:** Greases (used in wheel bearings).
- **Solid Lubricants:** Graphite powder (used where oils would attract dirt or melt under high heat).`,
    keyTakeaways: [
      'Friction opposes relative motion between contacting surfaces.',
      'Lubrication and ball bearings minimize friction wear and machine overheating.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-btech-t2-w10',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Building Construction: Foundations & Wall Construction',
    subtopics: ['Parts of a Building (Substructure vs Superstructure)', 'Types of Foundations (Strip, Pad, Raft, Pile)', 'Bonding in Brick/Block Walls (Stretcher Bond vs Header Bond)', 'Mortar Preparation (Cement, Sand, Water)'],
    readingTimeMinutes: 8,
    summary: 'Civil construction principles, foundation soil load-bearing dynamics, masonry mortar mixing, and bonding techniques.',
    contentMarkdown: `### 1. Substructure vs Superstructure
- **Substructure:** The lower portion of a building constructed below ground level (foundations, basement).
- **Superstructure:** The visible portion of a building constructed above ground level (walls, columns, beams, roof).

---

### 2. Types of Foundations:
- **Strip Foundation:** A continuous strip of concrete beneath load-bearing masonry walls (most common for Nigerian bungalows).
- **Pad Foundation:** Isolated square concrete blocks supporting single structural columns.
- **Raft Foundation:** A large reinforced concrete slab covering the entire building footprint on swampy or weak soils (common in Lekki/Victoria Island, Lagos).

---

### 3. Wall Bonding:
- **Stretcher Bond:** Blocks laid lengthwise with overlapping joints to distribute vertical loads evenly without continuous vertical cracks.`,
    keyTakeaways: [
      'Substructure is below ground; superstructure is above ground.',
      'Strip foundations support bungalows; raft foundations are used for swampy soils.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },

  // ==========================================
  // AGRICULTURAL SCIENCE (WEEKS 1 - 10)
  // ==========================================
  {
    id: 'jss2-agric-t2-w1',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Farm Structures & Buildings: Layout & Storage',
    subtopics: ['Definition and Types of Farm Structures', 'Farm Buildings (Farmhouse, Processing Sheds, Livestock Pens)', 'Crop Storage Structures (Rhumbus, Silos, Cribs)', 'Maintenance of Farm Buildings'],
    readingTimeMinutes: 8,
    summary: 'Agricultural civil engineering: optimal farm layouts, grain silos, traditional rhumbus, and maintaining farm structures.',
    contentMarkdown: `### 1. Farm Structures vs Farm Buildings
- **Farm Structures:** Constructions erected on a farm to facilitate agricultural production without residential habitation (fences, irrigation canals, dip tanks, silos).
- **Farm Buildings:** Roofed structures designed for human shelter, processing crops, or housing livestock (poultry houses, tractor garages, storage barns).

---

### 2. Crop Storage Facilities in Nigeria:
- **Traditional Rhumbu:** Mud and thatch grain store widely used in Northern Nigeria to store dry cereals (sorghum, millet).
- **Maize Crib:** Slatted wooden walls allowing natural cross-ventilation to dry and store maize cobs on the cob.
- **Modern Silos:** Tall, airtight galvanized steel cylindrical towers equipped with electric temperature and humidity controls for bulk grain storage.`,
    keyTakeaways: [
      'Farm structures facilitate agricultural production; farm buildings house livestock and operations.',
      'Airtight modern silos protect bulk grain harvest against weevil pests and mold.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-agric-t2-w2',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Farm Machinery & Implements: Primary & Secondary Tillage',
    subtopics: ['The Farm Tractor as Prime Mover', 'Primary Tillage Implements (Disc Plough, Mouldboard Plough)', 'Secondary Tillage Implements (Disc Harrow, Ridger)', 'Harvesting Machinery (Combine Harvester)'],
    readingTimeMinutes: 8,
    summary: 'Mechanized agriculture in Nigeria, tractor mechanics, soil inversion ploughing, and secondary seedbed preparation.',
    contentMarkdown: `### 1. The Tractor
A powerful prime mover equipped with a Power Take-Off (PTO) shaft and three-point hydraulic linkage to pull, lift, and power farm implements.

---

### 2. Tillage Implements:
- **Primary Tillage (Ploughing):** Deep cutting, inverting, and shattering of hard soil.
  - *Disc Plough:* Uses concave rotating steel discs to cut through rocky, root-infested tropical soils without jamming.
  - *Mouldboard Plough:* Inverts soil completely in stone-free temperate soils.
- **Secondary Tillage:** Pulverizing clods into fine seedbeds.
  - *Disc Harrow:* Breaks large soil clods left by ploughs into loose fine tilth.
  - *Ridger:* Gathers loose soil into parallel ridges for planting tubers (yam, cassava).`,
    keyTakeaways: [
      'Disc ploughs perform primary tillage in hard, stumpy tropical soils.',
      'Harrows pulverize large clods; ridgers mound soil for planting tubers.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-agric-t2-w3',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Maintenance of Farm Machinery & Preventive Servicing',
    subtopics: ['Importance of Machine Maintenance', 'Daily and Routine Maintenance Operations', 'Periodic Servicing (Oil Changes, Filter Replacements)', 'End-of-Season Machine Storage'],
    readingTimeMinutes: 7,
    summary: 'Preventive maintenance schedules, rust prevention, hydraulic oil servicing, and prolonging machinery lifespan.',
    contentMarkdown: `### 1. Why Maintain Machinery?
- Prevents sudden breakdowns during critical planting and harvesting seasons.
- Extends the operational lifespan of expensive capital equipment.
- Ensures operator safety and minimizes fuel wastage.

---

### 2. Routine Servicing Steps:
- Check engine oil level, radiator coolant water, and tyre pressure before starting the engine every morning.
- Clean dirt and mud off plough discs and grease grease-nipples using a grease gun.
- At the end of the farming season, wash metal implements thoroughly, coat unpainted metal surfaces with used motor oil to prevent rust, and store under a covered shed.`,
    keyTakeaways: [
      'Check engine oil and radiator water daily before starting tractors.',
      'Coating tillage discs with oil prevents rust corrosion during off-season storage.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-agric-t2-w4',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Crop Propagation: Sexual vs Asexual Reproduction',
    subtopics: ['Meaning of Crop Propagation', 'Sexual Propagation (Seeds): Advantages & Disadvantages', 'Asexual (Vegetative) Propagation: Meaning', 'Viability and Seed Germination Tests'],
    readingTimeMinutes: 8,
    summary: 'Botanical methods of multiplying crop plants, comparing genetic variation of seeds with clonal vegetative reproduction.',
    contentMarkdown: `### 1. Sexual Propagation (By Seed)
Propagating plants using true botanical seeds produced from flower fertilization (e.g. maize, beans, rice, tomato, cocoa).
- **Advantages:** Easy to transport and store in bulk; creates new genetic varieties through cross-pollination.
- **Disadvantages:** Seeds take longer to mature and bear fruit; offspring may not be true to the superior qualities of parent plants.

---

### 2. Asexual (Vegetative) Propagation
Multiplying plants using vegetative plant organs (stems, roots, leaves, tubers) without sexual fertilization (e.g. cassava stem cuttings, yam setts, banana suckers).
- **Advantages:** Offspring are genetically identical clones of the parent; mature and bear fruit much earlier.
- **Disadvantages:** Vegetative planting materials are bulky to transport and can transmit viral diseases from parents.`,
    keyTakeaways: [
      'Sexual propagation uses seeds; asexual propagation uses vegetative plant parts.',
      'Vegetative clones mature faster and preserve exact parental traits.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-agric-t2-w5',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Methods of Vegetative Propagation: Cuttings, Grafting & Budding',
    subtopics: ['Stem Cuttings (Cassava, Sugar Cane)', 'Layering (Simple, Air Layering / Marcotting)', 'Grafting (Joining Scion to Rootstock)', 'Budding (T-Budding in Citrus Orchards)'],
    readingTimeMinutes: 8,
    summary: 'Horticultural techniques: taking stem cuttings, air layering, whip grafting, and T-budding in Nigerian fruit orchards.',
    contentMarkdown: `### 1. Common Vegetative Methods:
- **Stem Cuttings:** Planting severed stem sections with healthy nodes directly into moist soil (e.g. cassava, sweet potato vines).
- **Layering:** Inducing root formation on a living stem branch while it is still attached to the parent plant before detaching it.

---

### 2. Grafting & Budding:
- **Grafting:** Joining the shoot of a superior cultivar (**Scion**) onto the rooted base of a hardy native plant (**Rootstock**) so their vascular cambium layers fuse into one plant.
- **Budding (T-Budding):** Inserting a single mature vegetative bud from a high-yielding sweet orange tree into a T-shaped slit made in the bark of a disease-resistant rough lemon rootstock.`,
    keyTakeaways: [
      'Cassava is propagated by stem cuttings; bananas and plantains by suckers.',
      'Grafting and budding join a superior scion to a hardy rootstock.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-agric-t2-w6',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Animal Feeds & Feeding: Classes of Livestock Rations',
    subtopics: ['Nutritional Needs of Farm Animals', 'Concentrates (Energy-Rich & Protein-Rich)', 'Roughages (Hay, Silage, Green Pasture)', 'Feed Additives (Vitamins, Mineral Premix, Antibiotics)'],
    readingTimeMinutes: 8,
    summary: 'Livestock nutrition science, formulating balanced feed rations, roughage forage preservation, and nutrient absorption.',
    contentMarkdown: `### 1. Classes of Animal Feeds:
1. **Roughages:** Bulky feeds high in crude fiber ($>18\\%$) and low in digestible nutrients. Essential for ruminant rumen digestion (cattle, goats).
   - *Hay:* Dry preserved grasses or legumes cut before flowering.
   - *Silage:* Fresh green forage fermented anaerobically in silos.
2. **Concentrates:** Dense feeds low in fiber ($<18\\%$) and high in digestible energy or proteins.
   - *Basal (Energy) Feeds:* Maize, sorghum, wheat offal, cassava peels.
   - *Protein Supplements:* Soyabean meal, groundnut cake (GNC), fish meal.
3. **Supplements / Additives:** Bone meal, oyster shell (calcium), vitamin premix, and salt licks.`,
    keyTakeaways: [
      'Roughages are high-fiber grasses for ruminants; concentrates are nutrient-dense feeds.',
      'Oyster shells and bone meal supply calcium for strong eggshells and bones.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-agric-t2-w7',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Animal Nutrition: Maintenance vs Production Rations',
    subtopics: ['Definition of a Balanced Ration', 'Maintenance Ration (Sustaining Bodily Functions)', 'Production Ration (Growth, Eggs, Milk, Meat, Draught)', 'Symptoms of Malnutrition in Farm Animals'],
    readingTimeMinutes: 7,
    summary: 'Formulating daily feeding rations according to animal physiological stages and diagnosing nutritional deficiencies.',
    contentMarkdown: `### 1. Maintenance vs Production Rations
A **ration** is the total quantity of feed provided to an animal within a 24-hour period.
- **Maintenance Ration:** The minimum feed required simply to keep an animal alive and healthy at constant body weight without producing milk, meat, or work.
- **Production Ration:** Extra feed supplied above maintenance requirements to enable the animal to produce milk (dairy cattle), lay eggs (layers), grow meat (broilers), or pull ploughs (draught bullocks).

---

### 2. Malnutrition Symptoms in Livestock:
- Stunted skeletal growth, slow weight gain.
- Soft, cracked eggshells in poultry (calcium deficiency).
- Dull coats, loss of appetite, and reduced disease resistance.`,
    keyTakeaways: [
      'Maintenance ration sustains life; production ration fuels growth, milk, and eggs.',
      'Adequate calcium prevents thin, cracked eggshells in laying hens.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-agric-t2-w8',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Animal Health Management: Signs of Good & Ill Health',
    subtopics: ['Economic Importance of Livestock Health', 'Physical Signs of a Healthy Farm Animal', 'Warning Signs of Sickness in Livestock', 'Biosecurity Protocols on Modern Farms'],
    readingTimeMinutes: 7,
    summary: 'Veterinary health diagnostics, observing animal herds, early disease detection, and farm biosecurity barriers.',
    contentMarkdown: `### 1. Healthy vs Sick Animals

| Clinical Parameter | Healthy Animal | Sick Animal |
|---|---|---|
| **Appetite & Grazing** | Alert, eats eagerly, chews cud | Loss of appetite (anorexia), refuses feed |
| **Eyes & Nose** | Bright, clear, moist muzzle | Watery discharge, sunken eyes, dry muzzle |
| **Coat / Feathers** | Glossy, sleek, smooth | Rough, erect hair, ruffled feathers |
| **Dung & Urine** | Normal consistency, regular | Watery diarrhoea or severe constipation |
| **Temperament** | Active, moves with the herd | Isolated in corners, lethargic, drooping head |`,
    keyTakeaways: [
      'Healthy livestock are active, alert, have sleek coats and normal body temperatures.',
      'Immediate isolation of sick animals prevents contagious epidemic outbreaks.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-agric-t2-w9',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Parasites of Farm Animals: Ectoparasites vs Endoparasites',
    subtopics: ['Definition of a Parasite', 'Ectoparasites (Ticks, Lice, Mites, Tsetse Flies)', 'Endoparasites (Tapeworms, Roundworms, Liver Flukes)', 'Control Methods: Dipping, Spraying & Deworming'],
    readingTimeMinutes: 8,
    summary: 'Veterinary parasitology, life cycles of livestock internal and external parasites, and chemical eradication baths.',
    contentMarkdown: `### 1. Ectoparasites (External Parasites)
Live on the outside surface of the host's body:
- **Ticks & Lice:** Suck blood, cause severe anaemia, transmit heartwater and redwater diseases.
- **Tsetse Fly (*Glossina*):** Transmits **Trypanosomiasis (Nagana)** in cattle.
- *Control:* Dipping or spraying cattle in chemical acaricide wash solutions.

---

### 2. Endoparasites (Internal Parasites)
Live inside the organs and digestive tract of the animal:
- **Tapeworm (*Taenia solium* / *Taenia saginata*):** Infests intestines via cysticercus larvae in infected pork or beef.
- **Liver Fluke (*Fasciola hepatica*):** Damages bile ducts of cattle and sheep (uses water snails as intermediate hosts).
- *Control:* Regular dosing with oral **dewormers** (anthelmintics).`,
    keyTakeaways: [
      'Ectoparasites live outside the body (ticks, lice); endoparasites live inside (tapeworms, flukes).',
      'Ticks are controlled by dipping; worms are eradicated by oral deworming.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-agric-t2-w10',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Diseases of Farm Animals: Viral, Bacterial & Protozoan',
    subtopics: ['Classification of Livestock Diseases', 'Viral Diseases (Newcastle, Foot & Mouth, Rinderpest)', 'Bacterial Diseases (Anthrax, Brucellosis, Tuberculosis)', 'Protozoan Diseases (Coccidiosis, Trypanosomiasis)'],
    readingTimeMinutes: 8,
    summary: 'Epidemiology of major livestock diseases in Nigeria, pathogen symptoms, vaccine regimens, and quarantine laws.',
    contentMarkdown: `### 1. Major Livestock Diseases in Nigeria:

| Disease | Pathogen | Susceptible Animals | Key Symptoms | Prevention |
|---|---|---|---|---|
| **Newcastle Disease** | Virus | Poultry (Chickens) | Twisted neck, paralysis, greenish diarrhea, high mortality | Vaccination (Lasota, Komorov) |
| **Foot and Mouth** | Virus | Cattle, Sheep, Goats | Blisters on hooves and tongue, excessive salivation, lameness | Quarantine and vaccination |
| **Anthrax** | Bacterium (*Bacillus anthracis*) | Cattle, Sheep, Humans (Zoonotic) | Sudden death, dark non-clotting blood from orifices | Spore vaccine; bury carcasses deeply |
| **Coccidiosis** | Protozoan (*Eimeria*) | Poultry chicks | Bloody droppings, ruffled feathers, huddling | Coccidiostats in drinking water |`,
    keyTakeaways: [
      'Newcastle disease causes nervous twisting and high poultry mortality; prevented by vaccination.',
      'Anthrax is a deadly zoonotic disease characterized by non-clotting blood discharge.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },

  // ==========================================
  // COMPUTER STUDIES (WEEKS 1 - 10)
  // ==========================================
  {
    id: 'jss2-comp-t2-w1',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Computer Programming Languages: Machine to High-Level',
    subtopics: ['What is a Programming Language?', 'Low-Level Languages: Machine Language (Binary 0 and 1)', 'Low-Level Languages: Assembly Language (Mnemonics)', 'High-Level Languages (Python, Java, C++, BASIC)', 'Language Translators: Compilers vs Interpreters'],
    readingTimeMinutes: 8,
    summary: 'Evolution of programming paradigms, machine code, assembly mnemonics, high-level languages, and translation engines.',
    contentMarkdown: `### 1. Levels of Programming Languages
A programming language is a formalized artificial language comprising a set of instructions used to control a computer.

1. **Machine Language (1st Generation):**
   - Written purely in binary digits (**0s and 1s**).
   - Only language understood directly by the CPU without translation.
   - Machine-dependent and extremely tedious for humans to write.
2. **Assembly Language (2nd Generation):**
   - Uses symbolic abbreviations called **mnemonics** (e.g. *ADD, SUB, MOV, JMP*).
   - Translated into machine code by an **Assembler**.
3. **High-Level Languages (3rd+ Generation):**
   - Uses human-readable English-like syntax and mathematical expressions (e.g. Python, Java, C++, JavaScript).
   - Portable across different hardware platforms.

---

### 2. Language Translators:
- **Compiler:** Translates the entire high-level program into machine code in one single pass before execution.
- **Interpreter:** Translates and executes high-level source code line-by-line.`,
    keyTakeaways: [
      'Machine language (binary 0 and 1) is the only code understood directly by the CPU.',
      'Compilers translate entire programs at once; interpreters translate line-by-line.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-comp-t2-w2',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Algorithms & Flowcharts: Computational Thinking',
    subtopics: ['Definition and Properties of an Algorithm', 'What is a Flowchart?', 'Standard Flowchart Symbols (Terminal, Process, Input/Output, Decision)', 'Writing Algorithms and Drawing Flowcharts'],
    readingTimeMinutes: 8,
    summary: 'Designing unambiguous step-by-step problem-solving algorithms and graphical logic flowcharts.',
    contentMarkdown: `### 1. What is an Algorithm?
An algorithm is a finite, ordered sequence of unambiguous instructions designed to solve a specific problem.
- **Properties:** Must have clear inputs, well-defined outputs, finite steps, and terminate eventually.

#### Example Algorithm (Summing Two Numbers):
1. Step 1: Start
2. Step 2: Input number $A$ and number $B$
3. Step 3: Compute $\\text{Sum} = A + B$
4. Step 4: Display $\\text{Sum}$
5. Step 5: Stop

---

### 2. Standard Flowchart Symbols:
- **Oval (Terminal):** Represents the Start or Stop of the program.
- **Parallelogram:** Represents Input or Output operations.
- **Rectangle (Process):** Represents calculations or data processing (e.g. $C = A + B$).
- **Diamond (Decision):** Represents conditional branches asking a Yes/No question.
- **Arrows (Flowlines):** Indicate the direction of execution.`,
    keyTakeaways: [
      'An algorithm is a step-by-step procedure for solving a computational problem.',
      'Flowcharts use ovals for start/stop, parallelograms for I/O, rectangles for processing, and diamonds for decisions.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-comp-t2-w3',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'The Internet: Architecture, Browsers & Search Engines',
    subtopics: ['Definition and Brief History of the Internet (ARPANET)', 'Internet Terminology (WWW, HTTP/HTTPS, URL, IP Address)', 'Web Browsers (Chrome, Edge, Safari, Firefox)', 'Effective Online Search Strategies'],
    readingTimeMinutes: 8,
    summary: 'Global internet networking, URL anatomy, secure web communication, and mastering internet research.',
    contentMarkdown: `### 1. What is the Internet?
The Internet (International Network) is a global network of interconnected computer networks communicating through standardized **TCP/IP protocols**.

#### Core Internet Terminologies:
- **WWW (World Wide Web):** A vast system of hyperlinked multimedia documents accessible over the internet.
- **URL (Uniform Resource Locator):** The unique web address of a web page (e.g. \`https://www.google.com\`).
- **HTTP / HTTPS:** Hypertext Transfer Protocol (the "S" denotes SSL encryption for security).
- **Web Browser:** Application software used to view websites (Google Chrome, Mozilla Firefox).
- **Search Engine:** An online tool used to discover information using search keywords (Google, Bing).`,
    keyTakeaways: [
      'The Internet is a global system of interconnected computer networks.',
      'Web browsers display websites; search engines index web information.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-comp-t2-w4',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Electronic Mail (Email): Composition & Netiquette',
    subtopics: ['Concept of Electronic Mail vs Traditional Post', 'Anatomy of an Email Address (username@domain.com)', 'Email Header Fields (To, Cc, Bcc, Subject)', 'Attaching Files and Professional Email Netiquette'],
    readingTimeMinutes: 7,
    summary: 'Electronic messaging protocols, Carbon Copy vs Blind Carbon Copy fields, attachments, and digital manners.',
    contentMarkdown: `### 1. Email Header Fields
- **To:** The primary email address of the intended recipient.
- **Cc (Carbon Copy):** Secondary recipients who receive a copy for informational awareness; all recipients can see each other's addresses.
- **Bcc (Blind Carbon Copy):** Secret copy recipients; their email addresses remain completely hidden from all other recipients.
- **Subject:** A concise summary of the email’s purpose.

---

### 2. Email Netiquette (Online Etiquette):
- Never type in ALL CAPS (it represents shouting).
- Always include a courteous greeting and sign-off.
- Scan file attachments with antivirus software before opening or sending.
- Never reply to suspicious phishing emails demanding bank BVN or passwords.`,
    keyTakeaways: [
      'Bcc conceals recipient email addresses from other recipients for privacy.',
      'Typing emails in all capital letters is considered shouting in digital netiquette.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-comp-t2-w5',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Word Processing: Document Creation & Formatting in MS Word',
    subtopics: ['What is a Word Processor?', 'Microsoft Word Interface (Ribbon, Quick Access Toolbar, Status Bar)', 'Text Formatting (Font Family, Size, Bold, Italics, Color)', 'Paragraph Alignment, Line Spacing & Bulleted Lists'],
    readingTimeMinutes: 7,
    summary: 'Document typing fundamentals in Microsoft Word, typographic styling, paragraph alignment, and page margins.',
    contentMarkdown: `### 1. What is Word Processing?
Word processing is the software application of creating, editing, formatting, storing, and printing textual documents using a computer.
- Popular programs: Microsoft Word, Google Docs, LibreOffice Writer.

---

### 2. Core Formatting Features in MS Word:
- **Font Styling:** Changing font typeface (e.g. Times New Roman, Calibri), increasing font size, applying **Bold** (\`Ctrl + B\`), *Italics* (\`Ctrl + I\`), and Underline (\`Ctrl + U\`).
- **Paragraph Alignment:**
  - *Align Left (\`Ctrl + L\`):* Standard for English text.
  - *Center (\`Ctrl + E\`):* Used for headings and titles.
  - *Align Right (\`Ctrl + R\`):* Used for dates and writer addresses.
  - *Justify (\`Ctrl + J\`):* Flushes text smoothly against both left and right margins (used in textbooks and newspapers).`,
    keyTakeaways: [
      'Word processing involves creating, formatting, and printing digital documents.',
      'Justified text aligns flush against both left and right margins.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-comp-t2-w6',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Spreadsheets: Introduction to Microsoft Excel',
    subtopics: ['Meaning and Uses of Spreadsheet Software', 'Worksheet Components (Rows, Columns, Cells, Cell Addresses)', 'Entering Data (Labels, Values, Formulas)', 'Basic Arithmetic Formulas & The AutoSum Function'],
    readingTimeMinutes: 8,
    summary: 'Financial and computational tables, cell addressing, constructing mathematical formulas, and the AutoSum function.',
    contentMarkdown: `### 1. What is a Spreadsheet?
A spreadsheet is an interactive application program for organization, calculation, analysis, and storage of data in tabular rows and columns.
- Examples: Microsoft Excel, Google Sheets.

#### Key Worksheet Concepts:
- **Columns:** Vertical sections designated by letters ($A, B, C, \\dots$).
- **Rows:** Horizontal sections designated by numbers ($1, 2, 3, \\dots$).
- **Cell:** The intersection of a row and a column. Designated by its unique **Cell Address** (e.g. **$B4$** is Column $B$, Row $4$).
- **Active Cell:** The currently selected cell highlighted with a dark border.

---

### 2. Entering Formulas in Excel:
> **RULE:** Every formula in Excel MUST start with an **equal sign ($=$)**!
- Addition: \`=A1 + B1\`
- Average: \`=AVERAGE(C1:C10)\`
- AutoSum: \`=SUM(A1:A5)\``,
    keyTakeaways: [
      'A cell is the intersection of a row and column named by letter and number (e.g. C5).',
      'Every formula in Excel must begin with an equal sign (=).'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-comp-t2-w7',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Graphic Packages: Drawing & Photo Editing Basics',
    subtopics: ['What is a Graphic Package?', 'Vector Graphics vs Bitmap (Raster) Images', 'CorelDraw / Paint Toolbox (Pencil, Pick, Shape, Fill)', 'Designing Simple School Posters and Logos'],
    readingTimeMinutes: 7,
    summary: 'Digital design software, pixel resolutions, vector scalability, and computer-assisted illustration.',
    contentMarkdown: `### 1. Vector vs Raster Graphics
- **Vector Graphics (e.g. CorelDraw, Adobe Illustrator):** Based on mathematical equations of lines, curves, and nodes. They can be scaled infinitely to any size without losing crisp quality or becoming blurry.
- **Raster / Bitmap Graphics (e.g. MS Paint, Adobe Photoshop):** Composed of grids of colored pixels. When enlarged significantly, they become pixelated and blurry.

---

### 2. Common Tools in Graphic Programs:
- **Pick Tool:** Selects, moves, and transforms objects.
- **Shape Tool:** Edits curved lines and nodes.
- **Fill Tool:** Applies solid colors, gradients, or patterns to enclosed shapes.`,
    keyTakeaways: [
      'Vector graphics scale to any size without pixelation; raster images are pixel grids.',
      'Graphic software allows artists to design digital logos, posters, and illustrations.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-comp-t2-w8',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Computer Ethics & Cyber Safety: Combating Cybercrime',
    subtopics: ['Definition of Computer Ethics', 'Software Piracy and Intellectual Property Theft', 'Cybercrimes: Phishing, Identity Theft & Advance Fee Fraud (419)', 'Cybersecurity Laws in Nigeria (Cybercrime Act 2015)'],
    readingTimeMinutes: 8,
    summary: 'Ethical digital citizenship, intellectual property rights, detecting phishing schemes, and Nigerian cybercrime legislation.',
    contentMarkdown: `### 1. What is Computer Ethics?
Computer ethics is a set of moral principles and professional standards that regulate the lawful, fair, and responsible use of computers and digital networks.

#### Ten Commandments of Computer Ethics (CEI):
1. Thou shalt not use a computer to harm other people.
2. Thou shalt not interfere with other people's computer work.
3. Thou shalt not snoop around in other people's computer files.
4. Thou shalt not use a computer to steal.
5. Thou shalt not use a computer to bear false witness.
6. Thou shalt not copy or use proprietary software without paying.

---

### 2. The Cybercrime Act 2015
Under Nigerian law, cybercrime activities (phishing, hacking bank servers, identity theft) attract severe penal consequences, including up to 10 years in prison.`,
    keyTakeaways: [
      'Software piracy is the illegal copying and distribution of copyrighted software.',
      'The Nigerian Cybercrime Act 2015 prescribes strict jail terms for cyber fraudsters.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-comp-t2-w9',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Computer Safety Measures: Ergonomics, Malware & Backups',
    subtopics: ['Ergonomics: Proper Posture at the Computer Desk', 'Repetitive Strain Injury (RSI) & Eye Strain Prevention', 'Computer Malware (Viruses, Worms, Trojans, Ransomware)', 'Antivirus Software and 3-2-1 Data Backup Strategy'],
    readingTimeMinutes: 7,
    summary: 'Occupational workplace ergonomics, protecting computers against malware infections, and automated secure backups.',
    contentMarkdown: `### 1. Computer Ergonomics
Ergonomics is the science of designing equipment and workplaces to fit the user's bodily comfort, safety, and productivity.
- **Correct Seating Posture:** Feet flat on the floor, back supported straight, knees at a $90^\\circ$ angle.
- **Monitor Placement:** Screen should be at eye level, roughly an arm’s length away ($50-70\\text{ cm}$).
- **The 20-20-20 Rule:** Every 20 minutes, look at an object 20 feet away for at least 20 seconds to prevent digital eye strain.

---

### 2. Protecting Data from Malware:
- **Install Antivirus Software:** Norton, Kaspersky, Windows Defender.
- **The 3-2-1 Backup Rule:** Keep **3** copies of your data on **2** different storage media, with **1** copy kept offsite in secure cloud storage.`,
    keyTakeaways: [
      'Ergonomic seating prevents chronic back pain and repetitive strain injury (RSI).',
      'The 3-2-1 backup rule ensures critical files survive hardware failure and ransomware.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  },
  {
    id: 'jss2-comp-t2-w10',
    classLevel: 'JSS 2',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'ICT in Modern Society: E-Commerce, Mobile Banking & Telemedicine',
    subtopics: ['Impact of Information Technology on Nigerian Society', 'Electronic Commerce (E-Commerce: Jumia, Konga)', 'Electronic Banking (USSD, Mobile Apps, POS, NIBSS)', 'Telemedicine and Remote Learning Platforms'],
    readingTimeMinutes: 7,
    summary: 'How ICT drives the modern Nigerian economy: online retail marketplaces, digital fintech banking, and virtual healthcare.',
    contentMarkdown: `### 1. ICT Transformation in Nigeria
Information and Communication Technology (ICT) has revolutionized commerce, finance, governance, and healthcare across Nigeria:
- **Electronic Commerce (E-Commerce):** Buying and selling goods and services online over the internet (e.g. Jumia, Konga, Amazon). Provides 24/7 shopping convenience and doorstep delivery.
- **Mobile Banking & Digital Fintech:** Fast, paperless financial transfers through USSD codes (\`*737#\`, \`*901#\`), Point of Sale (POS) terminals, and NIBSS instant payment networks.
- **Telemedicine:** Healthcare specialists diagnosing and consulting patients in remote rural clinics via video links and digital diagnostics.`,
    keyTakeaways: [
      'E-commerce facilitates round-the-clock online trade with door-to-door delivery.',
      'Digital banking and NIBSS enable instant cashless transactions across Nigeria.'
    ],
    associatedQuizId: 'jss2-algebra-integrated-science-2025'
  }
];
