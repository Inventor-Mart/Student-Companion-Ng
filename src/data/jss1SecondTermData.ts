import { CurriculumTopic } from '../types';
import { JSS1_ENGLISH_TOPICS } from './jss1EnglishData';

export const JSS1_SECOND_TERM_TOPICS: CurriculumTopic[] = [
  // ==========================================
  // 1. MATHEMATICS (JSS 1 — 2nd Term, Weeks 1-10)
  // ==========================================
  {
    id: 'math-jss1-t2-w1-simple-equations',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Simple Linear Equations in One Variable',
    subtopics: ['Meaning of Algebraic Equations', 'Balancing Method', 'Solving Equations of Form ax + b = c', 'Word Problems'],
    readingTimeMinutes: 6,
    summary: 'Master the concept of solving simple linear algebraic equations using the balance method and inverse operations.',
    contentMarkdown: `### 1. Concept of Linear Equations

An equation is an algebraic statement showing that two mathematical expressions are equal, separated by an equal sign ($=$).

In a linear equation in one variable, the highest power of the unknown letter is $1$.

### 2. The Balance Principle

Think of an equation as a two-pan weighing balance. Whatever mathematical operation you perform on the Left-Hand Side (LHS), you must also perform on the Right-Hand Side (RHS) to maintain equality:
- If you add a number to one side, add the same number to the other.
- If you subtract, subtract from both sides.
- If you multiply or divide, apply it to the entire opposite side.

### 3. Worked Examples

**Example 1:** Solve for $x$ in: $x + 7 = 19$
- Subtract $7$ from both sides:
$$x + 7 - 7 = 19 - 7$$
$$x = 12$$

**Example 2:** Solve for $y$ in: $3y - 5 = 16$
- Add $5$ to both sides:
$$3y = 16 + 5$$
$$3y = 21$$
- Divide both sides by $3$:
$$y = 21 \\div 3 = 7$$

### 4. Real-Life Nigerian Application

If Chinedu bought $4$ exercise books at ₦$x$ each and paid ₦$1,200$ after receiving a ₦$200$ discount, the equation is:
$$4x - 200 = 1000 \\implies 4x = 1200 \\implies x = 300$$
Each book costs ₦$300$.`,
    keyTakeaways: [
      'An equation maintains balance when identical operations are performed on both sides.',
      'Use inverse operations: addition cancels subtraction; multiplication cancels division.',
      'Always substitute your final answer back into the original equation to check correctness.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'math-jss1-t2-w2-angles-measurement',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Geometry: Angles and Measurement',
    subtopics: ['Definition of Angles', 'Types of Angles', 'Measuring with a Protractor', 'Angles on a Straight Line'],
    readingTimeMinutes: 6,
    summary: 'Identify acute, right, obtuse, reflex, and complete rotation angles and calculate unknown angles on straight lines.',
    contentMarkdown: `### 1. Definition and Naming of Angles

An angle is formed when two straight lines or rays meet at a common point called the **vertex**. Angles are measured in degrees ($^\\circ$).

### 2. Classification of Angles

- **Acute Angle:** Greater than $0^\\circ$ but less than $90^\\circ$.
- **Right Angle:** Exactly $90^\\circ$ (indicated by a square corner symbol).
- **Obtuse Angle:** Greater than $90^\\circ$ but less than $180^\\circ$.
- **Straight Angle:** Exactly $180^\\circ$ (a flat straight line).
- **Reflex Angle:** Greater than $180^\\circ$ but less than $360^\\circ$.
- **Full Rotation (Perigon):** Exactly $360^\\circ$ around a point.

### 3. Key Angle Theorems

1. **Angles on a Straight Line:** The sum of adjacent angles on a straight line is always $180^\\circ$.
$$a + b = 180^\\circ$$

2. **Angles at a Point:** The sum of angles surrounding a single point is $360^\\circ$.

### 4. Worked Example

Find the value of $m$ if angles on a straight line are $65^\\circ$ and $m$:
$$m + 65^\\circ = 180^\\circ$$
$$m = 180^\\circ - 65^\\circ = 115^\\circ$$
Since $115^\\circ$ is between $90^\\circ$ and $180^\\circ$, $m$ is an obtuse angle.`,
    keyTakeaways: [
      'Acute < 90°, Right = 90°, Obtuse is between 90° and 180°, Reflex is between 180° and 360°.',
      'The sum of adjacent angles on a straight line is strictly 180°.',
      'The sum of all angles meeting at a point is 360°.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'math-jss1-t2-w3-geometric-constructions',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Basic Geometric Constructions',
    subtopics: ['Instruments of Construction', 'Perpendicular Bisector of a Line', 'Constructing 90° Angle', 'Constructing 60° Angle'],
    readingTimeMinutes: 6,
    summary: 'Learn precision technical drawing and mathematical construction of perpendicular bisectors and standard angles using ruler and compass.',
    contentMarkdown: `### 1. Essential Mathematical Instruments

Precision construction requires:
- **Ruler / Straight Edge:** For drawing straight line segments.
- **Pair of Compasses:** For drawing arcs and circles with fixed radii.
- **Sharp Pencil:** For hairline accuracy.

*Note: In formal examinations, protractors must never be used to draw constructed angles; only compass and straightedge are allowed.*

### 2. Constructing a Perpendicular Bisector

A perpendicular bisector divides a line segment into two equal halves at right angles ($90^\\circ$):
1. Draw line segment $AB$.
2. Place the compass point at $A$, open to more than half the length of $AB$, and draw arcs above and below the line.
3. With the same radius, place compass at $B$ and cut the previous arcs at points $P$ and $Q$.
4. Draw a straight line connecting $P$ and $Q$. $PQ$ bisects $AB$ at $90^\\circ$.

### 3. Constructing a 60° Angle

1. Draw straight line $OX$.
2. With center $O$ and any convenient radius, draw an arc cutting $OX$ at $A$.
3. With center $A$ and the same radius, draw an arc cutting the first arc at $B$.
4. Join $OB$. The angle $\\angle BOX = 60^\\circ$.

### 4. Constructing a 30° Angle by Bisection

Bisecting the $60^\\circ$ angle by striking arcs from $A$ and $B$ produces a clean $30^\\circ$ angle.`,
    keyTakeaways: [
      'A perpendicular bisector cuts a line into two equal segments at exactly 90 degrees.',
      'The radius of the compass must remain unchanged when constructing 60-degree angles.',
      'Bisecting 60 degrees yields 30 degrees; bisecting 90 degrees yields 45 degrees.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'math-jss1-t2-w4-statistics-data-collection',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Statistics: Purpose of Data Collection & Frequency Tables',
    subtopics: ['Meaning of Statistics', 'Primary vs Secondary Data', 'Tally System', 'Constructing Frequency Tables'],
    readingTimeMinutes: 5,
    summary: 'Understand the foundations of statistical inquiry, raw data collection, tally counting, and organized frequency distribution tables.',
    contentMarkdown: `### 1. What is Statistics?

Statistics is the branch of mathematics that deals with the collection, organization, presentation, analysis, and interpretation of numerical data.

### 2. Types of Data

- **Primary Data:** Information collected firsthand by the researcher (e.g. counting the number of students present in JSS 1A).
- **Secondary Data:** Information obtained from existing records, books, or government publications (e.g. National Population Commission census figures).

### 3. The Tally Method

When counting raw scores, tallies are recorded in bundles of five:
- Single strokes for 1 to 4: $|, ||, |||, ||||$
- The fifth stroke crosses the previous four diagonally: $||||\\hspace{-0.7em}/$ (representing $5$).

### 4. Constructing a Frequency Table

Suppose the marks of 15 students in a quick mental math test out of 5 were:
$$3, 4, 2, 5, 3, 1, 4, 3, 2, 3, 5, 4, 3, 2, 4$$

| Score | Tally Marks | Frequency ($f$) |
|---|---|---|
| 1 | $|$ | 1 |
| 2 | $|||$ | 3 |
| 3 | $||||\\hspace{-0.7em}/$ | 5 |
| 4 | $||||$ | 4 |
| 5 | $||$ | 2 |
| **Total** | | **15** |

The score with the highest frequency is **3** (appeared 5 times).`,
    keyTakeaways: [
      'Statistics enables informed decision making in education, health, and national planning.',
      'Tallies are bundled in groups of five for rapid and error-free counting.',
      'The sum of frequencies must always equal the total number of items collected.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'math-jss1-t2-w5-midterm-assessment',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Mid-Term Diagnostic Assessment & Review',
    subtopics: ['Equations Revision', 'Angle Theorems Check', 'Construction Practical Review', 'Formative Diagnostic Test'],
    readingTimeMinutes: 6,
    summary: 'Comprehensive mid-term evaluation consolidating linear equations, angle classifications, constructions, and frequency distributions.',
    contentMarkdown: `### 1. Mid-Term Review Summary

This diagnostic module reviews the four core pillars taught in the first half of Term 2:
1. **Equations:** $ax + b = c$ solving strategies.
2. **Angles:** Supplementary ($180^\\circ$) and complementary ($90^\\circ$) relationships.
3. **Constructions:** Accuracy of arcs and bisectors.
4. **Statistics:** Tally tabulation.

### 2. Self-Assessment Practice Problems

1. **Problem 1:** Solve for $p$:
$$5p - 8 = 32 \\implies 5p = 40 \\implies p = 8$$

2. **Problem 2:** Two angles on a straight line are in the ratio $1 : 2$. What is the smaller angle?
$$\\text{Total ratio parts} = 1 + 2 = 3$$
$$\\text{Smaller angle} = \\frac{1}{3} \\times 180^\\circ = 60^\\circ$$
$$\\text{Larger angle} = \\frac{2}{3} \\times 180^\\circ = 120^\\circ$$

3. **Problem 3:** State the complement of $38^\\circ$:
$$\\text{Complement} = 90^\\circ - 38^\\circ = 52^\\circ$$`,
    keyTakeaways: [
      'Complementary angles add up to 90 degrees; supplementary angles add up to 180 degrees.',
      'Check algebraic equation solutions by direct substitution.',
      'Regular mid-term practice builds speed and confidence for terminal examinations.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'math-jss1-t2-w6-graphical-data',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Graphical Representation: Pictograms and Bar Charts',
    subtopics: ['Features of Pictograms', 'Reading Bar Charts', 'Drawing Vertical & Horizontal Bar Charts', 'Scales and Axes'],
    readingTimeMinutes: 6,
    summary: 'Master pictorial and bar chart data representations with uniform spacing, axis labeling, and proportional bar heights.',
    contentMarkdown: `### 1. Pictograms (Picture Graphs)

A pictogram uses pictorial symbols or icons to represent data. Every pictogram must include a **Key** explaining the numerical value of one symbol.

*Example Key:* 🏫 = 10 Schools. If a local government has 35 schools, it is represented by 3 full school icons and 1 half icon.

### 2. Bar Charts

A bar chart represents categorical data using rectangular bars whose lengths or heights are proportional to the frequencies they represent.

#### Essential Rules for Bar Charts:
1. **Uniform Bar Width:** All bars must have the exact same width.
2. **Equal Spacing:** The spaces between adjacent bars must be identical.
3. **Axes Labels:** The horizontal axis (x-axis) shows categories; the vertical axis (y-axis) shows frequencies.
4. **Appropriate Scale:** The vertical scale must start from zero and increase in equal intervals ($2, 4, 6...$ or $5, 10, 15...$).

### 3. Worked Example

Students in JSS 1 voted for their favorite science subject:
- Biology: 25 students
- Physics: 15 students
- Chemistry: 20 students
- Agric Science: 30 students

*Total sample:* $25 + 15 + 20 + 30 = 90$ students.
The tallest bar corresponds to **Agric Science** ($30$), while the shortest is **Physics** ($15$).`,
    keyTakeaways: [
      'A pictogram must always feature a clear key indicating the value of each symbol.',
      'Bars in a bar chart must never touch unless representing continuous histogram data.',
      'Always start the frequency axis from zero to prevent misleading visual impressions.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'math-jss1-t2-w7-plane-shapes-perimeter',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Plane Shapes: Perimeter of Polygons',
    subtopics: ['Definition of Perimeter', 'Perimeter of Rectangle', 'Perimeter of Square & Triangle', 'Composite Shapes'],
    readingTimeMinutes: 6,
    summary: 'Calculate the total boundary distance around regular and composite 2D geometric shapes using standard formulas.',
    contentMarkdown: `### 1. What is Perimeter?

The perimeter of any plane shape is the total distance around its external boundary or edges. It is measured in linear units ($mm, cm, m, km$).

### 2. Perimeter Formulas

1. **Rectangle:**
A rectangle has two equal lengths ($L$) and two equal breadths ($B$):
$$\\text{Perimeter} = L + B + L + B = 2(L + B)$$

2. **Square:**
A square has four equal sides ($s$):
$$\\text{Perimeter} = s + s + s + s = 4s$$

3. **Triangle:**
A triangle with side lengths $a, b, c$:
$$\\text{Perimeter} = a + b + c$$

### 3. Worked Examples

**Example 1:** Find the perimeter of a classroom floor measuring $8\\text{ m}$ long and $6\\text{ m}$ wide:
$$\\text{Perimeter} = 2(8 + 6) = 2(14) = 28\\text{ meters}$$

**Example 2:** An equilateral triangular playground has one side measuring $15\\text{ m}$. Calculate its perimeter:
$$\\text{Perimeter} = 3 \\times 15 = 45\\text{ meters}$$

**Example 3:** If the perimeter of a square football goalpost marker is $36\\text{ cm}$, find the length of one side:
$$4s = 36 \\implies s = 36 \\div 4 = 9\\text{ cm}$$`,
    keyTakeaways: [
      'Perimeter is strictly a one-dimensional linear measure of outside boundary length.',
      'Rectangle perimeter: 2(Length + Breadth); Square perimeter: 4 × side length.',
      'For composite irregular polygons, sum every individual outer boundary edge.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'math-jss1-t2-w8-area-plane-shapes',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Area of Regular Plane Shapes',
    subtopics: ['Concept of Area', 'Square Units', 'Area of Rectangles & Squares', 'Area of Parallelograms & Triangles'],
    readingTimeMinutes: 6,
    summary: 'Master area calculation of 2D surfaces in square units, focusing on squares, rectangles, triangles, and parallelograms.',
    contentMarkdown: `### 1. Concept of Area

Area measures the amount of flat surface enclosed inside a 2D boundary. It is measured in square units ($cm^2, m^2, km^2$).

### 2. Standard Area Formulas

1. **Rectangle:**
$$\\text{Area} = \\text{Length} \\times \\text{Breadth} = L \\times B$$

2. **Square:**
$$\\text{Area} = \\text{side} \\times \\text{side} = s^2$$

3. **Triangle:**
$$\\text{Area} = \\frac{1}{2} \\times \\text{base} \\times \\text{perpendicular height} = \\frac{1}{2}bh$$

4. **Parallelogram:**
$$\\text{Area} = \\text{base} \\times \\text{perpendicular height} = b \\times h$$

### 3. Worked Examples

**Example 1:** Calculate the area of a farm plot $25\\text{ m}$ long and $12\\text{ m}$ wide:
$$\\text{Area} = 25 \\times 12 = 300\\text{ m}^2$$

**Example 2:** A triangular banner has a base of $14\\text{ cm}$ and a height of $8\\text{ cm}$:
$$\\text{Area} = \\frac{1}{2} \\times 14 \\times 8 = 7 \\times 8 = 56\\text{ cm}^2$$

### 4. Difference Between Area and Perimeter

| Feature | Perimeter | Area |
|---|---|---|
| Definition | Outer boundary distance | Flat surface enclosed |
| Units | Linear ($cm, m$) | Square ($cm^2, m^2$) |
| Application | Fencing a farmland | Tiling or planting crops |`,
    keyTakeaways: [
      'Area is measured in square units (cm², m²), never linear units.',
      'Triangle area is half the product of its base and perpendicular height.',
      'Always verify that both dimensions are in the same unit before multiplying.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'math-jss1-t2-w9-bece-revision',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Term 2 Comprehensive Revision & Problem Solving',
    subtopics: ['Equations & Word Problems', 'Angle Relationships', 'Perimeter & Area Word Scenarios', 'Statistics Synthesis'],
    readingTimeMinutes: 7,
    summary: 'Synthesize all Term 2 mathematical principles through multi-step worked examination scenarios and speed solving techniques.',
    contentMarkdown: `### 1. Revision Overview

Term 2 covers four interconnected mathematical domains:
1. **Algebra:** Linear equations in one variable.
2. **Geometry:** Angle types, measuring, and basic constructions.
3. **Statistics:** Tally tables, pictograms, and bar charts.
4. **Mensuration:** Perimeter and area of plane figures.

### 2. Multi-Concept Problem Solving

**Question 1:** The perimeter of a rectangular poultry house is $40\\text{ m}$. If the length is $12\\text{ m}$, find its breadth and its area:
- Step 1 (Find Breadth):
$$2(L + B) = 40$$
$$12 + B = 20 \\implies B = 8\\text{ m}$$
- Step 2 (Find Area):
$$\\text{Area} = L \\times B = 12 \\times 8 = 96\\text{ m}^2$$

**Question 2:** Solve for $k$:
$$\\frac{2k + 6}{4} = 5$$
$$2k + 6 = 20 \\implies 2k = 14 \\implies k = 7$$`,
    keyTakeaways: [
      'Multi-step word problems require identifying knowns, setting up equations, and solving systematically.',
      'Double-check all unit conversions before completing area calculations.',
      'Confidence in algebra is the foundation for all senior secondary sciences.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'math-jss1-t2-w10-terminal-exam-review',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Terminal Examination & Assessment Review',
    subtopics: ['Exam Readiness Checklist', 'Common Examiner Distractor Traps', 'Time Management in CBT', 'Grading Scheme Review'],
    readingTimeMinutes: 5,
    summary: 'Final preparation guidelines, examination rubrics, common error avoidance, and time allocation strategies for JSS 1 2nd Term finals.',
    contentMarkdown: `### 1. Examination Guidelines & Time Strategy

In standard Nigerian secondary school terminal examinations:
- Spend no more than $45$ seconds on straightforward arithmetic multiple-choice questions.
- Reserve $2$ minutes for word problems requiring algebraic setup.
- Always sketch geometric plane shapes to visualize dimensions before applying formulas.

### 2. Top Examiner Pitfalls to Avoid:
1. **Unit Mistakes:** Forgetting to write $cm^2$ or $m^2$ for area.
2. **Sign Errors:** Forgetting that transferring $+b$ across the equal sign becomes $-b$.
3. **Protractor Inversion:** Reading the wrong scale on double-sided protractors.

### 3. Final Summary Matrix

Review the complete Term 2 syllabus before taking your CBT Practice Drill in the Exam Center.`,
    keyTakeaways: [
      'Allocate time wisely: answer easy questions first to build momentum.',
      'Check all units carefully on mensuration questions.',
      'Review your working step-by-step before final submission.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },

  // ==========================================
  // 2. ENGLISH LANGUAGE (JSS 1 — 2nd Term, Weeks 1-12) - COMPREHENSIVE SCHEME & NOTES
  // ==========================================
  ...JSS1_ENGLISH_TOPICS,
  // ==========================================
  // 3. BASIC SCIENCE (JSS 1 — 2nd Term, Weeks 1-10)
  // ==========================================
  {
    id: 'sci-jss1-t2-w1-living-environment',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'The Living Environment: Ecosystem and Habitat',
    subtopics: ['Concept of Habitat', 'Terrestrial vs Aquatic Habitats', 'Biotic and Abiotic Factors', 'Ecological Balance'],
    readingTimeMinutes: 6,
    summary: 'Explore terrestrial and aquatic environments in Nigeria, understanding relationships between living organisms and physical factors.',
    contentMarkdown: `### 1. Concept of Habitat

A **habitat** is the natural home or environment of a plant, animal, or other organism where it finds food, shelter, water, and favorable conditions to reproduce.

### 2. Major Types of Habitats

1. **Terrestrial Habitats (Land):**
   - **Forests:** Dense canopy trees, monkeys, leopards (e.g. Southern Nigerian Rainforest).
   - **Savannas / Grasslands:** Tall grasses, scattered acacia trees, antelopes, zebras (e.g. Northern Guinea and Sudan Savanna).
   - **Deserts / Arid Zones:** Sparse vegetation, camels, lizards (e.g. Sahel region).

2. **Aquatic Habitats (Water):**
   - **Freshwater:** Rivers, lakes, streams with low salinity (e.g. River Niger, River Benue).
   - **Marine:** Oceans and seas with high salinity (e.g. Atlantic Ocean).
   - **Estuarine:** Brackish water where rivers meet the sea (e.g. Niger Delta mangroves).

### 3. Components of an Ecosystem

- **Biotic Factors:** Living components (Producers [green plants], Consumers [herbivores/carnivores], Decomposers [fungi, bacteria]).
- **Abiotic Factors:** Non-living physical elements (Temperature, sunlight, rainfall, soil pH, wind).`,
    keyTakeaways: [
      'A habitat is the specific natural environment where an organism thrives.',
      'Terrestrial habitats exist on land; aquatic habitats exist in water bodies.',
      'Ecosystem balance depends on harmonious interaction between biotic and abiotic factors.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'sci-jss1-t2-w2-circulatory-system',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Human Body Systems: The Circulatory System',
    subtopics: ['Components of Circulatory System', 'Structure of the Heart', 'Blood Vessels (Arteries, Veins, Capillaries)', 'Functions of Blood'],
    readingTimeMinutes: 6,
    summary: 'Discover the cardiovascular system, examining blood circulation, heart chambers, blood vessels, and transport of oxygen and nutrients.',
    contentMarkdown: `### 1. Components of the Circulatory System

The human circulatory system transports oxygen, nutrients, hormones, and metabolic wastes throughout the body. It consists of:
1. **The Heart:** The muscular pump.
2. **Blood Vessels:** The distribution network.
3. **Blood:** The fluid transport medium.

### 2. Structure and Action of the Human Heart

The heart is a four-chambered muscular organ:
- **Right Atrium & Right Ventricle:** Receive deoxygenated blood from the body and pump it to the lungs for oxygenation.
- **Left Atrium & Left Ventricle:** Receive oxygen-rich blood from the lungs and pump it out to the rest of the body through the **aorta**.

### 3. Blood Vessels Compared

| Feature | Arteries | Veins | Capillaries |
|---|---|---|---|
| Direction | Away from heart | Toward heart | Connects arteries & veins |
| Blood Carried | Oxygenated (except pulmonary) | Deoxygenated (except pulmonary) | Mixed (diffuses into cells) |
| Wall Structure | Thick, elastic | Thinner, has valves | Microscopic single-cell layer |
| Pressure | High pressure | Low pressure | Very low pressure |

### 4. Components of Blood
- **Red Blood Cells (Erythrocytes):** Contain hemoglobin to carry oxygen.
- **White Blood Cells (Leukocytes):** Fight infections and pathogens.
- **Platelets (Thrombocytes):** Clot blood at wound sites.
- **Plasma:** Liquid vehicle carrying dissolved glucose, amino acids, and urea.`,
    keyTakeaways: [
      'The heart has four chambers: two atria (top) and two ventricles (bottom).',
      'Arteries carry blood away from the heart under high pressure; veins carry blood back to the heart.',
      'Red blood cells use hemoglobin to transport oxygen to every living cell.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'sci-jss1-t2-w3-nutrition-balanced-diet',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Nutrition and Balanced Diet: Classes of Food',
    subtopics: ['The Six Classes of Nutrients', 'Definition of a Balanced Diet', 'Nutritional Deficiency Diseases', 'Nigerian Dietary Sources'],
    readingTimeMinutes: 6,
    summary: 'Understand the six food classes, calorie energy balance, balanced meal composition, and deficiency prevention.',
    contentMarkdown: `### 1. The Six Classes of Nutrients

1. **Carbohydrates:** Primary energy source ($4\\text{ kcal/g}$). Sources: Yam, cassava (garri), rice, maize.
2. **Proteins:** Essential for growth, tissue repair, and enzyme synthesis ($4\\text{ kcal/g}$). Sources: Beans, fish, eggs, meat, cowpeas.
3. **Fats and Oils (Lipids):** Concentrated energy reserve, heat insulation, organ protection ($9\\text{ kcal/g}$). Sources: Palm oil, groundnuts, butter.
4. **Vitamins:** Organic compounds required in small amounts for metabolic regulation. Sources: Fresh fruits (oranges, pawpaw) and green leafy vegetables (ugwu, spinach).
5. **Minerals:** Inorganic elements for bones, teeth, and biochemical processes. (Calcium, Iron, Iodine, Zinc).
6. **Water:** Universal solvent and temperature regulator; constitutes over $60\\%$ of human body mass.

### 2. What is a Balanced Diet?

A **balanced diet** contains all six classes of food in the correct proportions required by an individual according to age, gender, activity level, and health state.

### 3. Deficiency Diseases in Nigeria

- **Kwashiorkor:** Severe protein deficiency in children (distended abdomen, thinning reddish hair, swollen legs).
- **Marasmus:** General calorie and protein starvation (severe wasting of muscle and fat).
- **Scurvy:** Vitamin C deficiency (bleeding gums, delayed wound healing).
- **Rickets:** Vitamin D and Calcium deficiency (bowed legs in young children).
- **Goitre:** Iodine deficiency (enlargement of the thyroid gland in the neck).`,
    keyTakeaways: [
      'A balanced diet contains all 6 classes of food in proper proportions.',
      'Proteins build and repair tissue; carbohydrates and fats provide energy.',
      'Kwashiorkor results from protein deficiency; rickets from Vitamin D/Calcium deficiency.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'sci-jss1-t2-w4-health-and-diseases',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Health and Diseases: Communicable vs Non-Communicable',
    subtopics: ['Definition of Disease', 'Pathogens & Disease Vectors', 'Communicable Diseases', 'Non-Communicable Diseases & Prevention'],
    readingTimeMinutes: 6,
    summary: 'Distinguish between infectious communicable diseases and non-communicable lifestyle illnesses, understanding vectors and preventive hygiene.',
    contentMarkdown: `### 1. Definition of Disease

A disease is any impairment of normal physiological functioning in an organism caused by pathogens, environmental toxins, or genetic disorders.

### 2. Communicable (Infectious) Diseases

These diseases can spread from one person to another through air, water, direct contact, or vectors:
- **Vector-Borne:**
  - *Malaria:* Caused by the parasite *Plasmodium*, transmitted by the female *Anopheles* mosquito.
  - *Yellow Fever:* Caused by a virus, transmitted by *Aedes* mosquitoes.
  - *Sleeping Sickness (Trypanosomiasis):* Transmitted by the Tsetse fly.
- **Airborne:** Tuberculosis, Influenza, Common Cold.
- **Waterborne:** Cholera, Typhoid fever, Dysentery.

### 3. Non-Communicable Diseases

These cannot be spread from person to person. They arise from genetic inheritance, lifestyle, malnutrition, or organ degeneration:
- *Sickle Cell Anemia* (inherited genetic condition).
- *Hypertension / High Blood Pressure* (cardiovascular illness).
- *Diabetes Mellitus* (impaired insulin regulation).
- *Asthma* (chronic respiratory inflammation).

### 4. Preventive Measures
- Sleep under insecticide-treated mosquito nets (ITNs).
- Drink treated or boiled water.
- Observe regular handwashing with soap.`,
    keyTakeaways: [
      'Communicable diseases spread between hosts via vectors, droplets, or contaminated water.',
      'Female Anopheles mosquitoes transmit the malaria parasite Plasmodium.',
      'Non-communicable diseases like hypertension and diabetes cannot be transmitted through contact.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'sci-jss1-t2-w5-midterm-science',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Mid-Term Review & Science Practical Investigation',
    subtopics: ['Heart Circulation Recap', 'Food Test Demonstration', 'Ecology Analysis', 'Mid-Term Diagnostic Test'],
    readingTimeMinutes: 5,
    summary: 'Review laboratory testing for starch, proteins, and fats, consolidating mid-term biological and ecological principles.',
    contentMarkdown: `### 1. Practical Food Tests in the Laboratory

1. **Test for Starch:**
   - Add a few drops of **Iodine Solution** to a slice of yam or bread.
   - *Observation:* Color changes from brown to **blue-black**, confirming starch.

2. **Test for Reducing Sugars:**
   - Add **Benedict’s solution** to glucose solution and warm in a water bath.
   - *Observation:* Color transitions from blue $\\to$ green $\\to$ yellow $\\to$ **brick-red precipitate**.

3. **Test for Protein (Biuret Test):**
   - Add $2\\text{ ml}$ of sodium hydroxide ($NaOH$) and a few drops of $1\\%$ copper sulfate ($CuSO_4$) to egg white solution.
   - *Observation:* A **violet / purple** color confirms protein.

### 2. Diagnostic Review Questions

1. Which chamber of the heart pumps oxygenated blood to the body?
   - **Answer:** The Left Ventricle (via the aorta).
2. What vector transmits river blindness (onchocerciasis)?
   - **Answer:** The Blackfly (*Simulium*).`,
    keyTakeaways: [
      'Iodine turns blue-black in the presence of starch.',
      'Biuret reagent turns violet/purple in the presence of proteins.',
      'The left ventricle has the thickest muscular wall to pump blood throughout the body.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'sci-jss1-t2-w6-drug-abuse',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Drug Abuse and Substance Use in Society',
    subtopics: ['Definition of Drug & Drug Abuse', 'Commonly Abused Substances', 'Health and Social Consequences', 'Role of NDLEA & NAFDAC'],
    readingTimeMinutes: 6,
    summary: 'Examine chemical substance use, mechanisms of drug addiction, adolescent health risks, and regulatory laws in Nigeria.',
    contentMarkdown: `### 1. Definition of Terms

- **Drug:** Any chemical substance that alters the biochemical, physiological, or psychological functioning of the body when consumed.
- **Drug Abuse:** The excessive, non-medical, or illegal self-administration of any drug in a manner that harms physical, mental, or social health.
- **Drug Addiction:** A chronic physical and psychological dependency on a substance where the individual experiences severe withdrawal symptoms upon stopping.

### 2. Commonly Abused Substances

1. **Stimulants:** Increase heart rate and brain activity (e.g. Cocaine, Methamphetamine, excessive Caffeine).
2. **Depressants / Sedatives:** Slow down central nervous system reactions (e.g. Alcohol, Barbiturates).
3. **Opioids & Narcotics:** Painkillers causing heavy dependency (e.g. Codeine cough syrups, Tramadol, Heroin).
4. **Hallucinogens:** Distort sensory perceptions and reality (e.g. Cannabis / Marijuana).

### 3. Consequences of Drug Abuse

- **Health:** Liver cirrhosis (alcohol), lung cancer (smoking), mental illness, kidney failure.
- **Academic:** School dropout, cognitive decline, memory impairment.
- **Social:** Criminality, family breakdown, youth violence.

### 4. Regulatory Agencies in Nigeria
- **NAFDAC:** National Agency for Food and Drug Administration and Control (regulates drug safety and registered chemicals).
- **NDLEA:** National Drug Law Enforcement Agency (combats illicit drug trafficking and cultivation).`,
    keyTakeaways: [
      'Drug abuse is the intake of chemicals without valid medical prescription.',
      'Stimulants accelerate nervous system activity; depressants slow it down.',
      'NAFDAC guarantees product safety; NDLEA prosecutes illegal drug trafficking.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'sci-jss1-t2-w7-kinetic-theory-matter',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Physics of Matter: Kinetic Theory and States',
    subtopics: ['Postulates of Kinetic Theory', 'Solids, Liquids, and Gases', 'Change of State', 'Brownian Motion & Diffusion'],
    readingTimeMinutes: 6,
    summary: 'Discover particulate nature of matter, molecular kinetic energy, Brownian motion, and phase changes between states.',
    contentMarkdown: `### 1. The Particulate Nature of Matter

Matter is defined as anything that has mass and occupies space. The **Kinetic Theory of Matter** states:
1. All matter is composed of tiny particles (atoms, molecules, or ions).
2. These particles are in constant, continuous, random motion.
3. The higher the temperature, the faster the particles move (increased kinetic energy).

### 2. The Three States of Matter

| Property | Solid | Liquid | Gas |
|---|---|---|---|
| Particle Arrangement | Closely packed in fixed lattice | Loosely packed, can slide past | Far apart, completely random |
| Intermolecular Force | Very strong | Moderate | Extremely weak / negligible |
| Shape & Volume | Definite shape & definite volume | Indefinite shape, definite volume | Indefinite shape & indefinite volume |
| Compressibility | Incompressible | Practically incompressible | Highly compressible |

### 3. Changes of State

- **Melting:** Solid $\\to$ Liquid (absorbing heat).
- **Freezing:** Liquid $\\to$ Solid (releasing heat).
- **Evaporation / Boiling:** Liquid $\\to$ Gas.
- **Condensation:** Gas $\\to$ Liquid.
- **Sublimation:** Direct conversion from Solid $\\to$ Gas without passing through liquid (e.g. Camphor, dry ice, Iodine crystals).`,
    keyTakeaways: [
      'Matter is made of tiny particles in constant, random motion.',
      'Gases have maximum molecular freedom and compressibility; solids have fixed shapes.',
      'Sublimation is the direct transition of a solid to a gas without melting into liquid.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'sci-jss1-t2-w8-environmental-pollution',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Environmental Pollution: Air, Water, and Land',
    subtopics: ['Definition of Pollutants', 'Air Pollution (Soot, CO, Gas Flaring)', 'Water Pollution & Oil Spills', 'Waste Management Strategies'],
    readingTimeMinutes: 6,
    summary: 'Analyze environmental degradation, industrial pollutants, gas flaring in the Niger Delta, and sustainable waste recycling.',
    contentMarkdown: `### 1. What is Pollution?

Pollution is the release of toxic, harmful, or undesirable substances (pollutants) into the natural environment in quantities that damage human health, living organisms, and ecosystems.

### 2. Major Categories of Pollution

1. **Air Pollution:**
   - *Pollutants:* Carbon monoxide ($CO$), sulfur dioxide ($SO_2$), particulate soot, generator exhaust fumes, gas flaring emissions.
   - *Effects:* Respiratory diseases (asthma, bronchitis), acid rain, global warming, greenhouse effect.

2. **Water Pollution:**
   - *Pollutants:* Untreated industrial effluents, crude oil spills (Niger Delta), agricultural pesticide runoff, untreated domestic sewage.
   - *Effects:* Destruction of aquatic life, eutrophication, spread of cholera and typhoid.

3. **Land / Soil Pollution:**
   - *Pollutants:* Non-biodegradable plastics, nylon bags, heavy metals from discarded electronic waste, open refuse dumping.
   - *Effects:* Loss of agricultural soil fertility, blockage of urban drainage gutters leading to flash floods.

### 3. Waste Management: The 3Rs Principle
- **Reduce:** Minimize unnecessary single-use items.
- **Reuse:** Use containers multiple times before discarding.
- **Recycle:** Process plastic bottles, glass, and scrap metals into new products.`,
    keyTakeaways: [
      'Pollution introduces harmful foreign substances into air, water, and land.',
      'Gas flaring and vehicular emissions cause acid rain and respiratory illnesses.',
      'The 3Rs of sustainable environmental management are Reduce, Reuse, and Recycle.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'sci-jss1-t2-w9-earth-in-space',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'The Earth in Space: Solar System & Planetary Motion',
    subtopics: ['The Solar System Components', 'Rotation of the Earth', 'Revolution of the Earth', 'Eclipse of the Sun and Moon'],
    readingTimeMinutes: 6,
    summary: 'Study planetary orbits around the Sun, the mechanism of Day/Night rotation, annual revolution seasons, and lunar/solar eclipses.',
    contentMarkdown: `### 1. The Solar System

The solar system consists of the **Sun** (a central glowing star) and eight major planets orbiting it in elliptical paths:
1. Mercury (closest to Sun)
2. Venus (hottest planet)
3. Earth (supports life)
4. Mars (the red planet)
5. Jupiter (largest planet)
6. Saturn (has prominent rings)
7. Uranus (ice giant)
8. Neptune (farthest planet)

*Mnemonic:* **M**y **V**ery **E**ducated **M**other **J**ust **S**erved **U**s **N**oodles.

### 2. Motions of the Earth

1. **Rotation:**
   - The Earth spins on its imaginary tilted axis ($23.5^\\circ$) from **West to East**.
   - One complete rotation takes **24 hours** ($1$ day).
   - *Effect:* Causes **Day and Night**.

2. **Revolution:**
   - The Earth orbits around the Sun along its elliptical path.
   - One complete revolution takes **$365\\frac{1}{4}$ days** ($1$ year).
   - *Effect:* Causes the **Seasons** (Wet/Rainy and Dry seasons in Nigeria; Spring, Summer, Autumn, Winter in temperate zones).

### 3. Eclipses
- **Solar Eclipse (Eclipse of the Sun):** The Moon passes directly between the Sun and Earth, casting its shadow on Earth.
- **Lunar Eclipse (Eclipse of the Moon):** The Earth passes directly between the Sun and Moon, casting its shadow over the Moon.`,
    keyTakeaways: [
      'The solar system comprises the Sun and eight planets.',
      'Earth rotation (24 hours) causes Day and Night; Earth revolution (365¼ days) causes Seasons.',
      'A solar eclipse occurs when the Moon blocks sunlight from reaching the Earth.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'sci-jss1-t2-w10-revision-science',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Term 2 Basic Science Examination Revision',
    subtopics: ['Comprehensive Term Review', 'Diagram Labeling (Heart & Solar System)', 'Formulae & Scientific Terms', 'Exam Success Strategies'],
    readingTimeMinutes: 5,
    summary: 'Terminal revision consolidating ecosystems, cardiovascular biology, food tests, matter physics, pollution, and space science.',
    contentMarkdown: `### 1. Core Term 2 Science Topics Reviewed

- **Ecosystem:** Biotic vs abiotic components, food chains, terrestrial/aquatic habitats.
- **Human Biology:** Four chambers of the heart, blood components, double circulation.
- **Nutrition:** Six food classes, food tests (Iodine for starch, Biuret for protein), deficiency diseases.
- **Health:** Communicable (malaria vector Anopheles) vs non-communicable illnesses.
- **Substance Abuse:** Stimulants, depressants, narcotics, role of NAFDAC and NDLEA.
- **Physics of Matter:** Kinetic theory, states of matter, sublimation.
- **Space Science:** Order of 8 planets, rotation (day/night) vs revolution (seasons).

### 2. Tips for Acing JSS 1 Science Exams
1. Memorize scientific spellings: *Hemoglobin, Capillary, Photosynthesis, Sublimation*.
2. Always write units when calculating quantities ($kcal, ^\\circ C, g$).
3. Use pencil and ruler when drawing cross-sections or diagrams.`,
    keyTakeaways: [
      'Master the definitions of key scientific terms and their spelling.',
      'Link biology and physics principles to everyday Nigerian environmental realities.',
      'Complete all practice questions in the CBT Drills tab before sitting for terminal exams.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },

  // ==========================================
  // 4. BASIC TECHNOLOGY (JSS 1 — 2nd Term, Weeks 1-10)
  // ==========================================
  {
    id: 'tech-jss1-t2-w1-workshop-safety',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Workshop Safety Rules & First Aid Equipment',
    subtopics: ['Causes of Workshop Accidents', 'Safety Guidelines', 'Personal Protective Equipment (PPE)', 'First Aid Administration'],
    readingTimeMinutes: 5,
    summary: 'Master accident prevention protocols in woodworking and metal workshops, personal protective equipment, and emergency first aid.',
    contentMarkdown: `### 1. Causes of Workshop Accidents

Accidents in school engineering workshops usually stem from:
1. **Unsafe Human Acts:** Carelessness, operating machines without authorization, wearing loose clothing, running in the workshop, horseplay.
2. **Unsafe Conditions:** Wet oily floors, poor lighting, blunt cutting tools, absence of machine guards, damaged electrical cables.

### 2. Personal Protective Equipment (PPE)

- **Safety Goggles:** Protect the eyes from flying metal swarf, wood shavings, and chemical splashes.
- **Safety Boots (Steel-Toed):** Protect feet from falling heavy tools or sharp sheet metals.
- **Ear Muffs / Ear Plugs:** Protect hearing from noisy industrial machinery.
- **Leather Apron / Overalls:** Shield body from sparks and moving gears.
- **Face Mask:** Prevent inhalation of sawdust and toxic fumes.

### 3. First Aid Box Components
A standard school workshop first aid kit contains:
- Antiseptic liquid (Dettol/Savlon), Methylated Spirit, Hydrogen Peroxide.
- Sterile gauze bandages, cotton wool, adhesive plasters.
- Scissors, safety pins, and burn ointment.`,
    keyTakeaways: [
      'Workshop safety depends on eliminating both unsafe acts and unsafe physical conditions.',
      'Always wear mandatory PPE before operating machines or cutting materials.',
      'Report all minor cuts and injuries immediately for first aid treatment.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'tech-jss1-t2-w2-wood-materials',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Properties of Materials: Wood Technology',
    subtopics: ['Classification of Wood', 'Hardwoods vs Softwoods in Nigeria', 'Structure of a Tree Trunk', 'Defects and Seasoning of Timber'],
    readingTimeMinutes: 6,
    summary: 'Study timber classification, deciduous hardwoods vs coniferous softwoods, tree trunk anatomy, and lumber conversion in West Africa.',
    contentMarkdown: `### 1. Classification of Timber

Timber is broadly categorized into two botanical classes:
1. **Hardwoods (Angiosperms):**
   - Broad-leaved, flowering deciduous trees that reproduce via enclosed seeds.
   - Dense, heavy, dark-colored, and resistant to wear.
   - Prominent Nigerian hardwoods: *Mahogany, Iroko, Obeche, Teak, Afara, Ebony*.
   - Uses: Furniture, roofing trusses, boat building, doors and window frames.

2. **Softwoods (Gymnosperms):**
   - Needle-like leaves, evergreen, non-flowering trees that reproduce via naked seeds in cones (conifers).
   - Less dense, lighter in color, easier to work with hand tools.
   - Examples: *Pine, Cedar, Fir, Spruce*.
   - Uses: Paper pulp, matches, light packaging crates, plywood cores.

### 2. Cross-Sectional Anatomy of a Tree Trunk

From outside to center:
1. **Outer Bark:** Protective outer skin shielding the tree from insects, weather, and fire.
2. **Inner Bark (Phloem):** Conducts manufactured sugars from leaves downward.
3. **Cambium Layer:** Thin microscopic ring where new active cell growth occurs.
4. **Sapwood (Alburnum):** Living wood carrying water and sap upward; prone to insect attack.
5. **Heartwood (Duramen):** Dark, mature, dead central wood providing mechanical support; ideal for durable construction.
6. **Pith (Medulla):** Central core of the young stem.`,
    keyTakeaways: [
      'Hardwoods (Iroko, Mahogany) come from broad-leaved trees; softwoods (Pine) from conifers.',
      'Heartwood is the strongest, most insect-resistant timber for building and furniture.',
      'Seasoning removes excess moisture from wood to prevent warping and cracking.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'tech-jss1-t2-w3-metal-materials',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Properties of Materials: Metal Technology',
    subtopics: ['Ferrous vs Non-Ferrous Metals', 'Properties of Iron & Steel', 'Common Non-Ferrous Metals', 'Alloys and Their Uses'],
    readingTimeMinutes: 6,
    summary: 'Understand magnetic ferrous metals, corrosion-resistant non-ferrous metals, and engineered alloys like brass and bronze.',
    contentMarkdown: `### 1. Classification of Metals

1. **Ferrous Metals:**
   - Contain **iron** ($Fe$) as their principal base constituent.
   - Strongly **magnetic** and prone to rusting when exposed to moisture and oxygen.
   - Examples: *Cast iron, Wrought iron, Mild steel, High carbon steel*.
   - Uses: Car bodies, building reinforcement rods (rebar), machine beds, cutting tools.

2. **Non-Ferrous Metals:**
   - Contain **no iron**.
   - Non-magnetic, highly resistant to corrosion, excellent thermal and electrical conductors.
   - Examples:
     - **Aluminum:** Lightweight, used for airplane bodies, overhead power lines, kitchen utensils.
     - **Copper:** Reddish-brown, supreme electrical conductor for household wiring.
     - **Lead:** Very heavy, soft, used for automobile battery plates and radiation shielding.
     - **Zinc:** Used to coat steel roofing sheets (galvanizing).

### 2. What is an Alloy?

An **alloy** is a metallic mixture composed of two or more elements (at least one being a metal) to achieve superior mechanical properties:
- **Brass:** Copper ($65\\%$) + Zinc ($35\\%$) $\\to$ musical instruments, decorative door handles.
- **Bronze:** Copper ($90\\%$) + Tin ($10\\%$) $\\to$ statues, ship propellers, medals.
- **Stainless Steel:** Iron + Carbon + Chromium + Nickel $\\to$ surgical instruments, cutlery.`,
    keyTakeaways: [
      'Ferrous metals contain iron and are magnetic; non-ferrous metals do not rust.',
      'Copper is the foremost electrical conductor; aluminum is valued for its lightweight strength.',
      'Alloys combine metals to achieve superior strength, hardness, and corrosion resistance.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'tech-jss1-t2-w4-ceramics-plastics-rubber',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Synthetic Materials: Ceramics, Plastics & Rubber',
    subtopics: ['Properties of Ceramics', 'Thermoplastics vs Thermosetting Plastics', 'Natural vs Synthetic Rubber', 'Everyday Applications'],
    readingTimeMinutes: 6,
    summary: 'Investigate non-metallic synthetic engineering materials, clay ceramics, polymer plastic families, and vulcanized rubber.',
    contentMarkdown: `### 1. Ceramics

Ceramics are inorganic, non-metallic materials produced by firing clay and earthy minerals at extremely high temperatures in kilns.
- **Properties:** High melting points, extreme hardness, chemical inertness, outstanding electrical insulators, but brittle under impact shock.
- **Examples & Uses:** Floor tiles, spark plug insulators, sanitary washbasins, traditional clay cooking pots, brick walls.

### 2. Plastics (Polymers)

Plastics are synthetic organic polymers derived from petroleum hydrocarbons:
1. **Thermoplastics:**
   - Soften when heated and can be remelted and remolded repeatedly without chemical degradation.
   - Examples: *Polythene (shopping bags), PVC (water pipes), Polystyrene (takeaway packs)*.
2. **Thermosetting Plastics:**
   - Once heated and molded, they undergo permanent chemical cross-linking and decompose/char rather than melt when reheated.
   - Examples: *Bakelite (electric plug switches), Melamine (dinner plates), Urea-formaldehyde*.

### 3. Rubber
- **Natural Rubber:** Tapped as latex liquid from the bark of the rubber tree (*Hevea brasiliensis*).
- **Synthetic Rubber:** Produced from crude oil byproducts (Neoprene, Buna-N).
- **Vulcanization:** Heating rubber with sulfur to increase elasticity, tensile strength, and heat resistance for automobile tires.`,
    keyTakeaways: [
      'Ceramics resist heat and electricity but fracture easily under sudden shock.',
      'Thermoplastics can be remolded repeatedly; thermosets harden permanently after one heating.',
      'Vulcanization blends sulfur with raw rubber to make automotive tires durable.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'tech-jss1-t2-w5-midterm-tech',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Mid-Term Practical Assessment: Tool Identification',
    subtopics: ['Measuring Tools Checklist', 'Bench Work Safety Audit', 'Material Classification Test', 'Diagnostic Quiz'],
    readingTimeMinutes: 5,
    summary: 'Mid-term practical review covering safety compliance, wood/metal properties, and hand tool identification.',
    contentMarkdown: `### 1. Mid-Term Engineering Review

This assessment checks mastery of:
- Safety codes and PPE selection.
- Identifying Nigerian hardwoods (Mahogany, Iroko) vs softwoods.
- Ferrous vs non-ferrous metals and alloys (brass, bronze).
- Thermoplastics vs thermosetting plastics.

### 2. Practical Tool Checklist:
- **Steel Rule:** Measure lengths accurately in millimeters ($mm$).
- **Try Square:** Verify $90^\\circ$ squareness and perpendicular edges.
- **Scriber:** Scratch clear cutting lines on metal sheets.
- **Center Punch:** Indent metals before drilling to prevent drill bit skidding.`,
    keyTakeaways: [
      'Always specify engineering measurements in millimeters (mm).',
      'The Try Square tests true 90-degree right angles.',
      'Never use hand tools for unintended purposes (e.g. using a screwdriver as a chisel).'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'tech-jss1-t2-w6-drawing-instruments',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Technical Drawing: Drawing Board Practice & Instruments',
    subtopics: ['Drawing Board & T-Square', 'Set Squares (30°/60° and 45°)', 'Border Lines and Title Blocks', 'Pencil Grades (2H vs 2B)'],
    readingTimeMinutes: 6,
    summary: 'Master standard engineering drafting instruments, paper mounting, border margins, title block lettering, and technical line conventions.',
    contentMarkdown: `### 1. Core Technical Drawing Equipment

1. **Drawing Board:** Smooth, flat wooden board upon which drawing paper is secured using masking tape.
2. **T-Square:** Consists of a **stock** (which slides along the board's left working edge) and a **blade**. Used exclusively for drawing **horizontal parallel lines** and as a base for set-squares.
3. **Set-Squares:**
   - $30^\\circ / 60^\\circ$ Set-square.
   - $45^\\circ / 45^\\circ$ Set-square.
   Combined with the T-square, they construct vertical lines and angles of $15^\\circ, 30^\\circ, 45^\\circ, 60^\\circ, 75^\\circ, 90^\\circ, 105^\\circ, 120^\\circ$.

### 2. Technical Pencil Grades

- **Hard Pencils (H, 2H, 3H):** Produce light, crisp lines; used for construction lines, projection lines, and center lines.
- **Medium Pencils (HB):** Used for general lettering, dimensions, and outline finishing.
- **Soft Pencils (B, 2B, 3B):** Produce dark, thick lines; used for artistic shading, never for technical engineering drawings.

### 3. Layout of a Drawing Sheet
- **Border Line:** Drawn $10\\text{ mm}$ inward from all four outer paper edges.
- **Title Block:** Positioned at the bottom right corner showing: Student Name, Class, School, Date, Scale, and Drawing Title.`,
    keyTakeaways: [
      'The T-square is used exclusively for horizontal parallel lines.',
      'Use 2H hard pencils for construction lines; HB for finished outlines and lettering.',
      'Every technical drawing sheet requires a 10 mm border line and standard title block.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'tech-jss1-t2-w7-freehand-sketching',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Freehand Sketching: Techniques and Proportions',
    subtopics: ['Principles of Freehand Sketching', 'Pencil Grip and Arm Movement', 'Sketching Straight Lines and Circles', 'Isometric vs Oblique Sketching'],
    readingTimeMinutes: 6,
    summary: 'Develop preliminary visual communication skills through freehand sketching of workshop tools, perspective guidelines, and proportions.',
    contentMarkdown: `### 1. Importance of Freehand Sketching

Freehand sketching is the rapid, unassisted drawing of technical ideas, tools, or machine components without using rulers, compasses, or drafting instruments. It is how engineers brainstorm initial designs.

### 2. Technique for Good Freehand Lines

- **Grip:** Hold the pencil roughly $30\\text{ mm}$ back from the sharpened tip with a relaxed grip.
- **Motion:** Draw straight lines with a continuous sweep from left to right using whole-arm motion from the elbow and shoulder, not just wrist pivoting.
- **Circles:** Sketch a square box first or cross-hairs with equal radii ticks, then connect arcs through the quadrant points.

### 3. 3D Pictorial Sketching Methods

1. **Isometric Sketching:**
   - The object is tilted so three faces are visible.
   - Both receding axes are inclined at $30^\\circ$ to the horizontal.
2. **Oblique Sketching:**
   - The front face is drawn true shape and flat.
   - The receding side axis is drawn at $45^\\circ$ to the horizontal.`,
    keyTakeaways: [
      'Freehand sketching translates mental design ideas into visual paper models rapidly.',
      'Keep your eyes on the destination point when drawing straight freehand lines.',
      'Isometric drawings tilt receding axes at 30 degrees; oblique drawings slant at 45 degrees.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'tech-jss1-t2-w8-basic-electricity',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Basic Electricity: Sources and Simple Circuits',
    subtopics: ['Nature of Electricity', 'Sources of Electric Current', 'Conductors vs Insulators', 'Series and Parallel Circuits'],
    readingTimeMinutes: 6,
    summary: 'Discover electric charge flow, battery chemical cells, household conductors, switch controls, and series/parallel load wiring.',
    contentMarkdown: `### 1. What is Electricity?

Electricity is a form of energy resulting from the flow of electric charges (**electrons**) through a conducting path.

### 2. Sources of Electric Current

1. **Chemical Sources:** Dry cells (flashlight batteries), wet cells (automobile lead-acid batteries).
2. **Mechanical / Electromagnetic Generators:** Alternators and dynamos driven by hydro dams (Kainji, Shiroro), gas turbines, or diesel engines.
3. **Solar (Photovoltaic) Cells:** Convert sunlight photons directly into direct current ($DC$) electricity.

### 3. Conductors and Insulators

- **Conductors:** Materials that permit electric current to pass through freely due to abundant free electrons (Copper, Aluminum, Silver, Iron, Saltwater).
- **Insulators:** Materials with high resistance that block electric current flow (PVC plastic coating on cables, Rubber, Glass, Dry Wood, Porcelain).

### 4. Circuit Configurations

1. **Series Circuit:**
   - Components connected end-to-end along a single path.
   - If one lamp burns out, the entire circuit is broken and all lamps turn off.
2. **Parallel Circuit:**
   - Components connected across separate branching paths.
   - If one lamp burns out, other branches continue operating unaffected.
   - *Standard for all Nigerian household wiring.*`,
    keyTakeaways: [
      'Electric current is the continuous flow of electrons through a closed conductive path.',
      'Copper is the principal domestic wiring conductor; PVC plastic serves as insulator.',
      'Household appliances are wired in parallel so each can operate independently.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'tech-jss1-t2-w9-tool-maintenance',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Maintenance of Workshop Hand Tools & Storage',
    subtopics: ['Importance of Maintenance', 'Types of Maintenance (Preventive vs Corrective)', 'Cleaning and Rust Prevention', 'Proper Storage (Tool Rack, Shadow Boards)'],
    readingTimeMinutes: 5,
    summary: 'Learn workshop tool longevity, preventing corrosion on steel blades, sharpening chisels, and organized storage systems.',
    contentMarkdown: `### 1. Why Tool Maintenance Matters

Proper maintenance:
- Extends the working lifespan of tools.
- Prevents accidents caused by blunt or slipping blades.
- Preserves dimensional accuracy in finished projects.
- Saves school and workshop operational costs.

### 2. Types of Maintenance

- **Preventive Maintenance:** Routine scheduled actions performed before tools fail (cleaning sawdust, applying oil to prevent rust, tightening loose screws).
- **Corrective Maintenance:** Repairing or replacing parts after damage or failure has occurred (resharpening a chipped plane blade, replacing a broken hammer handle).

### 3. Rust Prevention on Cutting Tools

Iron and steel oxidize when exposed to atmospheric oxygen and humidity:
$$\\text{Iron} + \\text{Oxygen} + \\text{Water} \\implies \\text{Hydrated Iron Oxide (Rust)}$$
- Always wipe steel rules, saw blades, and chisels with a light film of machine oil or petroleum jelly after use.
- Never store tools on damp concrete floors.

### 4. Organized Workshop Storage
- **Shadow Boards:** Wallboards with tool outlines painted so missing tools are spotted instantly.
- **Tool Boxes & Racks:** Compartments preventing cutting edges from colliding and becoming blunt.`,
    keyTakeaways: [
      'Preventive maintenance stops tool breakdown before it happens.',
      'Applying a light oil film on steel blades stops rust and moisture oxidation.',
      'Shadow boards and racks keep workshop tools organized and safe.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'tech-jss1-t2-w10-revision-exam-tech',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Term 2 Basic Technology Examination Revision',
    subtopics: ['Materials Review (Wood, Metal, Plastics)', 'Drawing Instruments Mastery', 'Simple Circuits Recap', 'Workshop Practical Tips'],
    readingTimeMinutes: 5,
    summary: 'Consolidation of JSS 1 2nd Term technical curriculum covering material classification, drawing conventions, electricity, and safety.',
    contentMarkdown: `### 1. Comprehensive Technical Review

- **Safety & PPE:** Eye goggles, steel-toe boots, ear muffs, and first aid box rules.
- **Wood:** Hardwoods (Mahogany, Iroko) vs Softwoods (Pine); tree cross-section (cambium, sapwood, heartwood).
- **Metals:** Ferrous (iron-based, magnetic) vs Non-Ferrous (copper, aluminum); Alloys (brass = copper + zinc; bronze = copper + tin).
- **Polymers & Ceramics:** Thermoplastics (remeltable) vs Thermosets; heat-resistant ceramics.
- **Drawing:** T-square for horizontal lines; 2H pencils for light construction; $10\\text{ mm}$ border line.
- **Electricity:** Electron flow, chemical vs mechanical power, parallel vs series circuits.

### 2. Examination Technique for Basic Technology
- Read all multiple-choice questions carefully to distinguish between similar instruments (e.g. Try Square vs Set Square).
- When sketching freehand figures, maintain clean, single-stroke lines.`,
    keyTakeaways: [
      'Know the differences between hardwoods/softwoods and ferrous/non-ferrous metals.',
      'Use proper technical terms when identifying drafting instruments.',
      'Practice past question drills in the CBT Simulator to prepare for examinations.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },

  // ==========================================
  // 5. AGRICULTURAL SCIENCE (JSS 1 — 2nd Term, Weeks 1-10)
  // ==========================================
  {
    id: 'agr-jss1-t2-w1-livestock-importance',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Introduction to Farm Animals & Importance to Nigeria',
    subtopics: ['Definition of Farm Animals', 'Economic Value of Livestock', 'Food & Industrial Products', 'Employment in Livestock Agriculture'],
    readingTimeMinutes: 6,
    summary: 'Examine the livestock industry in Nigeria, reviewing animal protein food sources, industrial leather products, and draught labor.',
    contentMarkdown: `### 1. What are Farm Animals?

Farm animals (livestock) are domesticated animals reared by humans for food, labor, financial income, clothing, and agricultural byproducts.

### 2. Economic Importance of Farm Animals in Nigeria

1. **High-Quality Protein Food:**
   - **Meat:** Beef (cattle), mutton (sheep), chevon (goat), pork (pig), chicken/turkey (poultry).
   - **Milk & Dairy:** Raw milk, cheese (*wara* in Northern/Western Nigeria), butter, yogurt.
   - **Eggs:** Rich in complete protein, choline, and fat-soluble vitamins.

2. **Industrial Raw Materials:**
   - **Hides and Skins:** Tanned into leather for shoes, bags, belts, and upholstery (e.g. Kano and Sokoto tanneries).
   - **Feathers:** Pillows, bedding, and organic fertilizer.
   - **Bones & Horns:** Crushed into bone meal for animal feed calcium supplements, buttons, and handles.

3. **Draught & Work Power:**
   - Bullocks and donkeys used in the Northern savanna states for plowing farmlands and transporting heavy harvests.

4. **Organic Farmyard Manure:**
   - Animal dung and urine enrich depleted agricultural soils with nitrogen, phosphorus, and potassium ($NPK$).`,
    keyTakeaways: [
      'Livestock supply vital dietary animal protein (meat, milk, eggs).',
      'Hides and skins support the Nigerian leather export and manufacturing economy.',
      'Farm animal droppings provide organic manure to restore depleted soil fertility.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'agr-jss1-t2-w2-classification-farm-animals',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Classification of Farm Animals: Habitat and Stomach Types',
    subtopics: ['Classification by Habitat', 'Classification by Stomach Anatomy', 'Ruminants vs Non-Ruminants', 'Classification by Uses'],
    readingTimeMinutes: 6,
    summary: 'Classify Nigerian farm animals by habitat, usage, and gastrointestinal anatomy (ruminants vs monogastrics).',
    contentMarkdown: `### 1. Classification by Habitat

- **Terrestrial Animals:** Live and feed on land (Cattle, Goats, Sheep, Pigs, Chickens).
- **Aquatic Animals:** Live and reproduce in water (Fishes, Shrimps, Crabs, Oysters).

### 2. Classification by Stomach Structure (Anatomy)

This is the most critical biological classification in animal science:

1. **Ruminants (Polygastric Animals):**
   - Herbivorous animals with a complex **four-chambered stomach**:
     1. **Rumen (Paunch):** Largest chamber, houses fermenting microbes.
     2. **Reticulum (Honeycomb):** Traps foreign hardware and forms food cud.
     3. **Omasum (Manyplies):** Absorbs water and fatty acids.
     4. **Abomasum:** The **true stomach** where enzymatic digestion takes place.
   - They chew the cud (regurgitate previously swallowed grass for remastication).
   - *Examples:* Cattle, Sheep, Goats.

2. **Non-Ruminants (Monogastric Animals):**
   - Animals with a **single, simple stomach** similar to humans.
   - Cannot digest tough cellulose or high-fiber roughages efficiently without concentrate feeds.
   - *Examples:* Pigs, Chickens, Turkeys, Ducks, Rabbits.`,
    keyTakeaways: [
      'Ruminants possess a four-chambered stomach (Rumen, Reticulum, Omasum, Abomasum).',
      'The abomasum is the true stomach where acid and enzyme digestion occurs.',
      'Non-ruminants (pigs, poultry) have a single simple stomach.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'agr-jss1-t2-w3-ruminant-management',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Ruminant Husbandry: Cattle, Sheep, and Goats',
    subtopics: ['Breeds of Nigerian Cattle', 'Breeds of Sheep and Goats', 'Housing and Grazing Systems', 'Milk and Meat Production'],
    readingTimeMinutes: 6,
    summary: 'Study indigenous Nigerian cattle breeds (White Fulani, Sokoto Gudali, Muturu), West African dwarf goats, and pastoral management.',
    contentMarkdown: `### 1. Breeds of Nigerian Cattle

1. **White Fulani (Bunaji):**
   - Most numerous cattle breed in Nigeria.
   - White coat with black points on ears and muzzle; long lyre-shaped horns.
   - Reared for both milk and beef (dual-purpose).
2. **Sokoto Gudali:**
   - Short-horned, heavy beef breed; docile temperament.
3. **Muturu:**
   - Short-stature humpless breed native to the forest zones of Southern Nigeria; highly resistant to trypanosomiasis (sleeping sickness).
4. **N'Dama:**
   - Compact humpless beef breed, also trypanotolerant.

### 2. Breeds of Sheep and Goats
- **Goats:**
  - *Red Sokoto (Maradi):* Renowned globally for producing world-class Morocco leather from its skin.
  - *West African Dwarf (WAD):* Short, hardy, prolific goat of the humid Southern forest belt.
- **Sheep:**
  - *Yankasa, Uda, Balami, West African Dwarf Sheep*.

### 3. Grazing and Management Systems
- **Nomadic Pastoralism:** Pastoralists move cattle across grazing corridors in search of green pasture and water.
- **Ranching / Intensive System:** Confined modern pasture paddocks with supplemental feed and clean watering troughs.`,
    keyTakeaways: [
      'White Fulani is the foremost dual-purpose dairy and beef breed in Nigeria.',
      'Muturu and N\'Dama cattle are naturally tolerant to tsetse-fly transmitted trypanosomiasis.',
      'Red Sokoto goat skin yields premium international grade leather.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'agr-jss1-t2-w4-monogastric-animals',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Monogastric Farm Animals: Poultry and Swine',
    subtopics: ['Poultry Terminology', 'Broilers vs Layers', 'Swine / Pig Production', 'Housing and Hygiene'],
    readingTimeMinutes: 6,
    summary: 'Explore commercial poultry and pig husbandry, egg-laying cycles, broiler feed conversion, and biosecurity sanitation.',
    contentMarkdown: `### 1. Poultry Farming

Poultry refers to domesticated birds kept for meat, eggs, and feathers (Chickens, Turkeys, Ducks, Geese, Guinea fowls, Quails).

#### Commercial Chicken Types:
1. **Broilers:** Reared specifically for table meat; fast-growing birds that reach market weight ($1.8 - 2.5\\text{ kg}$) within $6 - 8\\text{ weeks}$.
2. **Layers:** Reared for commercial table egg production; begin laying at $18 - 20\\text{ weeks}$ and produce eggs for up to $72\\text{ weeks}$.
3. **Cockerels:** Male birds grown for flavorful, lean meat at a slower growth rate.

### 2. Poultry Housing Systems
- **Deep Litter System:** Birds roam freely on concrete floors covered with dry wood shavings ($5 - 10\\text{ cm}$ thick) to absorb droppings.
- **Battery Cage System:** Hens are kept in tiered wire cages with automatic egg-collection troughs and nipple drinkers.

### 3. Swine (Pig) Management
- **Key Terms:** Boar (adult male), Sow (adult female), Piglet (young pig), Farrowing (giving birth in pigs).
- Pigs are exceptionally prolific (farrowing $8 - 14$ piglets per litter twice a year).
- Require a cool wallow or concrete spray system because pigs lack functional sweat glands.`,
    keyTakeaways: [
      'Broilers are meat-producing chickens; layers are egg-producing chickens.',
      'Deep litter housing uses dry wood shavings to absorb bird droppings and maintain hygiene.',
      'Pigs are prolific monogastrics that require cool wallows due to an absence of sweat glands.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'agr-jss1-t2-w5-midterm-agric',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Mid-Term Review & School Farm Inspection',
    subtopics: ['Livestock Classification Check', 'Breed Identification Test', 'Deep Litter Inspection', 'Mid-Term Practical Quiz'],
    readingTimeMinutes: 5,
    summary: 'Mid-term agricultural assessment reviewing livestock classification, digestion anatomy, and school farm management.',
    contentMarkdown: `### 1. Mid-Term Review Summary

Check your understanding:
1. Differentiate between polygastric ruminants (cattle, goats) and monogastrics (swine, poultry).
2. Identify the four stomach compartments of a cow.
3. Name two trypanosome-tolerant cattle breeds found in Southern Nigeria (*Muturu*, *N'Dama*).

### 2. Practical Inspection Criteria for School Farms
- **Poultry Litter:** Must be dry and friable; damp litter causes toxic ammonia buildup and coccidiosis.
- **Clean Water:** Drinkers must be scrubbed and refilled daily with cool, clean water.
- **Biosecurity Footbath:** Saturated with disinfectant at pen entrances to kill pathogens.`,
    keyTakeaways: [
      'Damp poultry litter causes ammonia gas release and promotes coccidiosis disease.',
      'Ruminants chew the cud; monogastrics require easily digestible grain feeds.',
      'Biosecurity footbaths protect livestock from visiting pathogen vectors.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'agr-jss1-t2-w6-animal-nutrition-feeds',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Farm Animal Nutrition: Feeds and Feeding',
    subtopics: ['Classification of Animal Feeds', 'Concentrates vs Roughages', 'Silage and Hay Preparation', 'Feed Formulation Basics'],
    readingTimeMinutes: 6,
    summary: 'Analyze livestock feed classes, energy grains, protein oilcakes, pasture roughages, and balanced livestock ration formulation.',
    contentMarkdown: `### 1. Classes of Animal Feeds

1. **Roughages:**
   - Feeds high in fiber ($>18\\%$) and low in digestible energy. Ideal for ruminants:
   - **Pasture / Forage:** Fresh grasses (Elephant grass, Guinea grass) and legumes (Centrosema, Stylosanthes).
   - **Hay:** Grasses cut and sun-dried to $15\\%$ moisture for dry-season feeding.
   - **Silage:** High-moisture forage fermented anaerobically in airtight silos.

2. **Concentrates:**
   - Feeds low in fiber ($<18\\%$) and high in digestible energy or protein. Essential for monogastrics:
   - **Energy Concentrates:** Maize, sorghum, wheat offal, rice bran, cassava peel meal.
   - **Protein Concentrates:** Soya bean meal, Groundnut cake (GNC), fish meal, palm kernel cake (PKC).

3. **Supplements & Additives:**
   - Oyster shell (calcium for eggshells), bone meal, mineral-vitamin premix, salt licks.

### 2. Types of Rations
- **Maintenance Ration:** Feed supplied to keep an animal alive and healthy at constant body weight.
- **Production Ration:** Extra feed supplied above maintenance for growth, egg laying, milk yield, or work.`,
    keyTakeaways: [
      'Roughages are high-fiber feeds for ruminants; concentrates are high-energy feeds for monogastrics.',
      'Hay is dried pasture grass; silage is anaerobically fermented green forage.',
      'Production rations supply the surplus energy needed for eggs, milk, meat, or plowing.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'agr-jss1-t2-w7-animal-health-pests',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Livestock Health: Pests and Parasites of Farm Animals',
    subtopics: ['Endoparasites vs Ectoparasites', 'Ticks, Lice, and Mites', 'Tapeworms and Roundworms', 'The Tsetse Fly and Trypanosomiasis'],
    readingTimeMinutes: 6,
    summary: 'Investigate livestock external and internal parasites, tick-borne fevers, tsetse fly transmission, and veterinary control.',
    contentMarkdown: `### 1. What is an Animal Parasite?

A parasite is an organism that lives on or inside a host farm animal, obtaining nourishment at the expense of the host without contributing to its survival.

### 2. External Parasites (Ectoparasites)
Live on the skin, fur, feathers, or ears of animals:
- **Ticks:** Blood-sucking arachnids that transmit tick-borne fever, heartwater, and babesiosis to cattle.
- **Lice:** Cause intense skin irritation, feather loss in poultry, and anemia.
- **Mites:** Cause **scabies / mange**, leading to thick scaly crusts and hair loss.
- *Control:* Dipping or spraying cattle with **acaricides**, dust poultry with insecticide powder.

### 3. Internal Parasites (Endoparasites)
Live inside internal organs (intestines, liver, lungs):
- **Roundworms (*Ascaris*):** Inhabit the small intestine, absorbing nutrients and causing potbelly and emaciation in young pigs.
- **Tapeworms (*Taenia*):** Flat, segmented worms that attach to the intestinal wall; larval cysts embed in pig or beef muscle (*measly meat*).
- **Liver Fluke (*Fasciola*):** Snail-transmitted parasite that damages the bile ducts of sheep and cattle (causes liver rot).
- *Control:* Regular routine **deworming** using anthelmintic drugs (e.g. albendazole).`,
    keyTakeaways: [
      'Ectoparasites live outside on skin/feathers (ticks, lice); endoparasites live inside organs (worms).',
      'Ticks suck blood and transmit diseases; controlled using acaricide dips.',
      'Routine deworming prevents internal parasitic damage to farm animal intestines.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'agr-jss1-t2-w8-animal-diseases-control',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Common Farm Animal Diseases & Prevention',
    subtopics: ['Viral Diseases (Rinderpest, Newcastle)', 'Bacterial Diseases (Anthrax, Mastitis)', 'Protozoan Diseases (Coccidiosis)', 'Vaccination and Quarantine'],
    readingTimeMinutes: 6,
    summary: 'Identify major viral, bacterial, and fungal livestock diseases in West Africa, symptom diagnosis, and vaccination schedules.',
    contentMarkdown: `### 1. Categories of Livestock Diseases

1. **Viral Diseases (Incurable by antibiotics):**
   - **Newcastle Disease (Poultry):** Highly contagious; causes twisted neck (torticolis), greenish diarrhea, respiratory distress, and massive mortality.
   - **Foot-and-Mouth Disease (Cattle/Sheep):** Blisters and ulcers on the mouth, tongue, and hooves; severe salivation and lameness.
   - **Gumboro (Infectious Bursal Disease):** Destroys poultry immune defense.

2. **Bacterial Diseases (Treated with antibiotics):**
   - **Anthrax:** Caused by *Bacillus anthracis*; sudden death with dark, non-clotting blood oozing from all natural body openings. *Zoonotic disease* (infects humans).
   - **Mastitis:** Bacterial inflammation of the udder in dairy cows; milk becomes bloodstained and lumpy.
   - **Brucellosis (Contagious Abortion):** Causes late-term abortion in pregnant cows.

3. **Protozoan Diseases:**
   - **Coccidiosis (Poultry):** Bloody diarrhea, ruffled feathers, huddling near heat sources; caused by *Eimeria*.

### 2. Disease Prevention Protocols
- **Quarantine:** Isolating newly purchased animals for $2 - 4\\text{ weeks}$ to observe for disease symptoms before introducing them to the main herd.
- **Vaccination:** Inoculating animals with dead or weakened antigens to stimulate antibodies against viral diseases.`,
    keyTakeaways: [
      'Viral diseases like Newcastle and Foot-and-Mouth must be prevented through routine vaccination.',
      'Anthrax is a fatal zoonotic bacterial disease causing non-clotting dark blood discharge.',
      'Quarantine protects established herds from foreign diseases brought by newly purchased livestock.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'agr-jss1-t2-w9-management-practices',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Animal Husbandry Routine Management Operations',
    subtopics: ['Identification (Branding, Tagging, Tattooing)', 'Castration and Dehorning', 'Debeaking and Culling in Poultry', 'Sanitation and Record Keeping'],
    readingTimeMinutes: 6,
    summary: 'Master day-to-day husbandry operations: animal identification, surgical/elastrator castration, poultry debeaking, and farm records.',
    contentMarkdown: `### 1. Routine Animal Identification

Identification enables accurate record keeping, ownership proof, and pedigree selection:
- **Ear Tagging:** Fastening numbered plastic or aluminum clips to ears (common in sheep and goats).
- **Branding:** Marking skin with a hot iron, cryogenic freeze iron, or chemical brand (common in cattle).
- **Tattooing:** Stamping permanent ink numbers into the inner ear flap.

### 2. Surgical & Management Operations

1. **Castration:**
   - Removal or disabling of the testicles of male animals not selected for breeding.
   - *Benefits:* Prevents indiscriminate mating, makes animals docile, improves meat tenderness and marbling.
   - *Tools:* Burdizzo castrator (bloodless), elastrator rubber rings, scalpel surgical knife.

2. **Dehorning / Disbudding:**
   - Removal of the horn buds of calves to prevent them from goring each other or injuring farm handlers.

3. **Debeaking (Beak Trimming):**
   - Trimming the sharp tip of poultry beaks using an electric cauterizing debeaker to prevent **cannibalism** and egg pecking.

4. **Culling:**
   - Identifying and removing unproductive, diseased, or old animals from the flock.`,
    keyTakeaways: [
      'Castration prevents indiscriminate breeding and enhances meat tenderness.',
      'Debeaking in poultry stops cannibalistic feather pecking and egg breakage.',
      'Culling removes unproductive birds to save feed costs and maintain flock health.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'agr-jss1-t2-w10-revision-agric',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Term 2 Agricultural Science Examination Revision',
    subtopics: ['Comprehensive Livestock Review', 'Digestive Anatomy Recap', 'Ration & Disease Checklist', 'Terminal Examination Strategy'],
    readingTimeMinutes: 5,
    summary: 'Terminal revision covering Nigerian livestock breeds, ruminant digestion, feeds, parasites, diseases, and routine farm practices.',
    contentMarkdown: `### 1. Comprehensive Term 2 Livestock Review

- **Economic Importance:** Food protein, hides/skins, draft power, organic manure.
- **Classification:** Ruminants (cattle, sheep, goats) with 4-chambered stomachs vs Monogastrics (swine, poultry).
- **Nigerian Breeds:** White Fulani cattle, Red Sokoto goat, Muturu trypano-tolerant cattle.
- **Poultry:** Broilers (meat) vs Layers (eggs); Deep litter vs Battery cage.
- **Feeds:** Roughages (pasture, hay, silage) vs Concentrates (maize, soyameal).
- **Parasites:** Ectoparasites (ticks, lice) controlled by acaricides; Endoparasites (roundworms, tapeworms) controlled by dewormers.
- **Operations:** Castration, dehorning, debeaking, culling, quarantine.

### 2. Examination Excellence Tips
- Distinguish between **ruminant** and **non-ruminant** digestive tracts in essay questions.
- Remember that Newcastle disease affects birds (viral) and has no antibiotic cure.`,
    keyTakeaways: [
      'Know all four stomach chambers of ruminants and their exact functions.',
      'Be able to state three differences between broilers and commercial layers.',
      'Review your notes and test yourself on the CBT Drills tab before final examinations.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },

  // ==========================================
  // 6. COMPUTER STUDIES (JSS 1 — 2nd Term, Weeks 1-10)
  // ==========================================
  {
    id: 'comp-jss1-t2-w1-computer-evolution',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Evolution of Computers: Early Devices to Modern Era',
    subtopics: ['Early Counting Devices (Abacus, Napier Bones)', 'Mechanical Calculating Era (Pascaline, Babbage Engine)', 'Electro-Mechanical Machines', 'Electronic Generations (1st to 5th)'],
    readingTimeMinutes: 6,
    summary: 'Trace the history of computing from the ancient Abacus and Charles Babbage to five generations of electronic microprocessors.',
    contentMarkdown: `### 1. Early Mechanical Counting Devices

Before modern electronics, humans invented mechanical counting aids:
1. **The Abacus (3000 BC):** Frame with sliding beads on wires used for addition and subtraction.
2. **Napier’s Bones (1617):** Invented by John Napier using carved ivory rods for multiplication and division.
3. **Pascaline (1642):** Blaise Pascal’s geared wheel adding machine.
4. **Leibniz Stepped Reckoner (1671):** First machine that could multiply, divide, and calculate square roots.
5. **Charles Babbage’s Analytical Engine (1837):** Designed with an input, memory store, processor mill, and output. **Charles Babbage is recognized as the Father of Computing**.
6. **Ada Lovelace:** World’s first computer programmer.

### 2. The Five Generations of Electronic Computers

| Generation | Primary Electronic Component | Key Characteristics |
|---|---|---|
| **1st (1940-1956)** | **Vacuum Tubes** | Enormous size, high heat generation, machine language (e.g. ENIAC, UNIVAC). |
| **2nd (1956-1963)** | **Transistors** | Smaller, faster, more reliable; assembly languages and early FORTRAN. |
| **3rd (1964-1971)** | **Integrated Circuits (ICs)** | Multiple transistors etched on single silicon chips; keyboards and monitors introduced. |
| **4th (1971-Present)**| **Microprocessors (VLSI / ULSI)** | Thousands of circuits on one CPU chip; birth of Personal Computers (PCs), laptops, and smartphones. |
| **5th (Present & Future)**| **Artificial Intelligence (AI)** | Parallel processing, voice recognition, neural networks, quantum computing. |`,
    keyTakeaways: [
      'Charles Babbage is the Father of Computing; Ada Lovelace was the first programmer.',
      '1st Gen used Vacuum Tubes; 2nd used Transistors; 3rd used Integrated Circuits; 4th uses Microprocessors.',
      '5th Generation focuses on Artificial Intelligence, natural language, and robotics.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'comp-jss1-t2-w2-computer-classification',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Classification of Computers by Size, Type & Purpose',
    subtopics: ['Classification by Type (Analog, Digital, Hybrid)', 'Classification by Size (Super, Mainframe, Mini, Micro)', 'Classification by Purpose (General vs Special)', 'Everyday Examples'],
    readingTimeMinutes: 6,
    summary: 'Classify computing hardware by signal type (digital vs analog), computational scale (super to micro), and dedicated operational purpose.',
    contentMarkdown: `### 1. Classification by Type (Nature of Data Processed)

1. **Digital Computers:**
   - Process discrete, numerical data represented in binary digits ($0$ and $1$).
   - High precision and versatile.
   - *Examples:* Laptops, desktop PCs, smartphones, digital wristwatches.

2. **Analog Computers:**
   - Measure continuous physical quantities (temperature, pressure, speed, electrical voltage).
   - *Examples:* Traditional vehicle speedometer, mercury thermometer, wall barometer.

3. **Hybrid Computers:**
   - Combine the high speed of analog measurement with the logical precision of digital processing.
   - *Examples:* Intensive Care Unit (ICU) patient heart monitors, modern petrol dispensing pumps.

### 2. Classification by Physical Size and Power

- **Supercomputers:** Fastest, most expensive computers capable of trillions of calculations per second (used for weather forecasting, space exploration, nuclear modeling).
- **Mainframe Computers:** Large, powerful multi-user systems supporting thousands of simultaneous transactions (used by commercial banks like CBN, airline booking systems).
- **Minicomputers (Mid-Range):** Medium-scale multi-user systems for universities and factories.
- **Microcomputers (Personal Computers - PCs):** Powered by single-chip microprocessors (Desktops, Laptops, Tablets, Smartphones).

### 3. Classification by Purpose
- **General Purpose:** Can perform diverse tasks depending on installed software (e.g. typing, gaming, web browsing).
- **Special Purpose:** Engineered to perform only one specific task (e.g. washing machine controllers, microwave ovens, ATM controllers).`,
    keyTakeaways: [
      'Digital computers process discrete binary 0s and 1s; analog computers measure continuous physical quantities.',
      'Supercomputers are the fastest machines on earth; microcomputers are standard personal computers.',
      'Hybrid computers combine digital accuracy with analog physical measurement.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'comp-jss1-t2-w3-hardware-architecture',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Computer Hardware Architecture: Input, CPU & Output',
    subtopics: ['Definition of Hardware', 'Input Units', 'The Central Processing Unit (ALU + CU)', 'Primary Storage (RAM vs ROM)'],
    readingTimeMinutes: 6,
    summary: 'Dissect the Von Neumann computer architecture, examining input peripherals, CPU components, and primary memory functions.',
    contentMarkdown: `### 1. What is Computer Hardware?

Hardware comprises all the physical, tangible electronic and electro-mechanical parts of a computer system that you can see and touch.

### 2. The Functional Components (Von Neumann Model)

A computer operates via the **Input $\\to$ Processing $\\to$ Output (IPO)** cycle:

$$\\text{Input Unit} \\implies \\text{Central Processing Unit (CPU)} \\implies \\text{Output Unit}$$

1. **Input Unit:** Enters raw data and program instructions into the computer (Keyboard, Mouse, Optical Scanner, Microphone, Webcam).
2. **Central Processing Unit (CPU - "The Brain"):**
   - **Arithmetic and Logic Unit (ALU):** Performs mathematical calculations ($+, -, \\times, \\div$) and logical comparisons ($<, >, =, \\text{AND}, \\text{OR}$).
   - **Control Unit (CU):** Directs and coordinates the timing and execution of all computer operations.
   - **Registers:** Ultra-fast temporary internal storage locations inside the processor.
3. **Primary Memory:**
   - **RAM (Random Access Memory):** Volatile working memory; contents are lost immediately when electrical power is switched off.
   - **ROM (Read Only Memory):** Non-volatile permanent firmware holding startup instructions (BIOS bootloader); cannot be erased by powering off.`,
    keyTakeaways: [
      'Hardware represents the physical, touchable components of a computer.',
      'The CPU consists of the Arithmetic and Logic Unit (ALU) and Control Unit (CU).',
      'RAM is temporary volatile memory; ROM is permanent non-volatile firmware.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'comp-jss1-t2-w4-output-devices',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Computer Output Devices: Monitors and Printers',
    subtopics: ['Soft Copy vs Hard Copy', 'Monitors (CRT, LCD, LED, OLED)', 'Printers (Impact vs Non-Impact)', 'Plotters and Audio Speakers'],
    readingTimeMinutes: 6,
    summary: 'Distinguish between soft copy displays and hard copy paper outputs, reviewing monitor technologies, impact dot-matrix, and laser printing.',
    contentMarkdown: `### 1. Soft Copy vs Hard Copy Output

- **Soft Copy Output:** Electronic, temporary output displayed on a screen or heard through speakers (disappears when the power is turned off).
- **Hard Copy Output:** Permanent physical output printed on paper or tangible media (can be touched and stored indefinitely).

### 2. Visual Display Units (Monitors)

- **Cathode Ray Tube (CRT):** Older, bulky monitors using electron guns; consumed high electricity.
- **Liquid Crystal Display (LCD):** Flat-panel monitors using liquid crystals with cold fluorescent backlights.
- **Light Emitting Diode (LED / OLED):** Ultra-thin, energy-efficient displays with vivid contrast, deep blacks, and wide viewing angles.

### 3. Printers: Impact vs Non-Impact

1. **Impact Printers:**
   - Print by physically striking a mechanical hammer or pins against an inked ribbon onto paper.
   - Noisy and slow, but can print multi-part carbon copies.
   - *Example:* **Dot Matrix Printer** (used in banks and utility billing).

2. **Non-Impact Printers:**
   - Produce characters without striking the paper (using laser beams, toner powder, or liquid ink droplets).
   - Silent, very fast, and produces high-resolution text and color graphics.
   - *Examples:* **Laser Printers** (use dry toner and electrostatics) and **Inkjet Printers** (spray microscopic ink droplets).`,
    keyTakeaways: [
      'Monitors produce temporary soft copy; printers generate permanent physical hard copy.',
      'Impact printers physically strike an ink ribbon; non-impact printers use laser toner or ink sprays.',
      'Laser printers are the fastest and most cost-effective printers for commercial document volume.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'comp-jss1-t2-w5-midterm-comp',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Mid-Term Practical Assessment: Hardware Matching',
    subtopics: ['Generations Identification', 'Input vs Output Sorting', 'RAM vs ROM Comparison', 'Keyboard Layout Check'],
    readingTimeMinutes: 5,
    summary: 'Mid-term practical review testing computer generations, peripheral categorization, memory volatility, and keyboard proficiency.',
    contentMarkdown: `### 1. Mid-Term Knowledge Checklist

Confirm your grasp of Term 2 concepts:
1. Which generation introduced the microprocessor? $\\to$ **4th Generation**.
2. What component of the CPU handles comparison operations like $x > 5$? $\\to$ **The Arithmetic and Logic Unit (ALU)**.
3. State whether the following are Input, Output, or Storage:
   - Barcode Reader: **Input**
   - Laser Printer: **Output**
   - Hard Disk: **Storage**
   - Projector: **Output**
   - Touchscreen: **Both Input and Output (Hybrid)**.

### 2. Diagnostic Challenge
Why is RAM referred to as "volatile"?
*Because all data stored in RAM is immediately wiped out when the computer loses electrical power.*`,
    keyTakeaways: [
      'Touchscreens function as both input and output devices simultaneously.',
      'Microprocessors characterize 4th generation computers.',
      'Always save work to secondary storage (SSD/HDD) to protect against RAM volatility.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'comp-jss1-t2-w6-computer-software',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Computer Software: System vs Application Software',
    subtopics: ['Definition of Software', 'System Software (OS, Device Drivers)', 'Utility Programs (Antivirus, Disk Defrag)', 'Application Software (Word Processors, Games)'],
    readingTimeMinutes: 6,
    summary: 'Explore intangible computer software programs, distinguishing between foundational operating systems and end-user productivity applications.',
    contentMarkdown: `### 1. What is Software?

Software is the set of non-physical instructions, data, or electronic programs that tell computer hardware exactly what tasks to perform and how to perform them.

Without software, computer hardware is like an empty car without fuel or a driver.

### 2. Major Software Categories

1. **System Software:**
   - Controls, coordinates, and manages the underlying computer hardware components and provides a platform for applications to run:
   - **Operating Systems (OS):** The master control program (e.g. Windows 11, macOS, Linux, Android, iOS).
   - **Device Drivers:** Specialized software enabling the OS to communicate with specific hardware peripherals (e.g. printer driver).
   - **Utility Software:** Maintenance programs that keep the system secure and optimized (e.g. Antivirus software, disk cleanup, file compression like WinRAR).

2. **Application Software:**
   - Programs designed to enable users to accomplish specific creative, administrative, or entertaining tasks:
   - **Word Processors:** Creating and editing documents (Microsoft Word, Google Docs).
   - **Spreadsheets:** Financial accounting, calculations, charts (Microsoft Excel, Google Sheets).
   - **Presentation Software:** Slide presentations (Microsoft PowerPoint).
   - **Web Browsers:** Accessing the internet (Google Chrome, Mozilla Firefox).
   - **Games and Media Players:** VLC Player, educational quiz games.`,
    keyTakeaways: [
      'Hardware cannot function without software instructions.',
      'System software manages hardware; application software performs user tasks.',
      'Antivirus, disk cleaners, and backup tools are essential system utilities.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'comp-jss1-t2-w7-operating-systems',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Operating Systems: Functions and User Interfaces',
    subtopics: ['Core Functions of an OS', 'Command Line Interface (CLI)', 'Graphical User Interface (GUI)', 'Popular Operating Systems'],
    readingTimeMinutes: 6,
    summary: 'Master operating system functions (memory, processor, and file management) and user interfaces from MS-DOS to modern touch GUIs.',
    contentMarkdown: `### 1. Key Functions of the Operating System

The Operating System (OS) is the most critical software on any computer:
1. **Processor Management:** Allocates CPU execution time among competing programs (multitasking).
2. **Memory Management:** Allocates RAM space to running applications and frees memory when closed.
3. **File Management:** Organizes folders, directories, and files on storage drives.
4. **Device Management:** Handles peripheral input and output communication via drivers.
5. **Security & User Access:** Password authentication, file permissions, and firewalls.

### 2. Types of User Interfaces

1. **Command Line Interface (CLI):**
   - The user interacts with the computer by typing text commands into a terminal prompt.
   - Requires memorizing command syntax; no icons or mouse clicks.
   - *Examples:* MS-DOS, Linux Bash Terminal.

2. **Graphical User Interface (GUI):**
   - Visual interface using **WIMP** features:
     - **W**indows: Separate rectangular viewing areas.
     - **I**cons: Small visual pictures representing files and applications.
     - **M**enus: Lists of selectable options.
     - **P**ointer: On-screen cursor controlled by a mouse or touch gesture.
   - Intuitive and user-friendly.
   - *Examples:* Microsoft Windows, macOS, Android, Apple iOS.`,
    keyTakeaways: [
      'The OS manages processor time, system memory, file storage, and peripheral devices.',
      'CLI requires typed text commands; GUI uses visual windows, icons, menus, and pointers (WIMP).',
      'Windows and Android are the most widely used consumer GUI operating systems in Nigeria.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'comp-jss1-t2-w8-keyboard-ergonomics',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Keyboard Ergonomics, Navigation & Shortcut Commands',
    subtopics: ['Keyboard Sections (Alphanumeric, Numeric, Function)', 'Special Function Keys (Ctrl, Alt, Shift, Esc)', 'Common Keyboard Shortcuts', 'Ergonomic Typing Posture'],
    readingTimeMinutes: 5,
    summary: 'Learn computer keyboard anatomy, essential shortcut keys, touch-typing hand placement, and healthy ergonomic sitting posture.',
    contentMarkdown: `### 1. Five Main Sections of the Standard Keyboard

A standard QWERTY keyboard has 101 to 105 keys divided into:
1. **Alphanumeric Keys:** Letters ($A-Z$), numbers ($0-9$), and punctuation marks.
2. **Function Keys ($F1-F12$):** Located along the top row; execute special software functions ($F1$ is universally the Help key; $F5$ refreshes web pages).
3. **Numeric Keypad:** Calculator-style block on the right for fast numerical data entry.
4. **Cursor Control / Navigation Keys:** Arrow keys ($←, →, ↑, ↓$), Home, End, Page Up, Page Down.
5. **Special / Modifier Keys:** Enter, Spacebar, Backspace, Delete, Caps Lock, Shift, Ctrl, Alt, Esc.

### 2. High-Yield Productivity Shortcuts

- **Ctrl + C:** Copy selected item.
- **Ctrl + V:** Paste copied item.
- **Ctrl + X:** Cut selected item.
- **Ctrl + Z:** Undo previous action.
- **Ctrl + S:** Save the current document.
- **Ctrl + P:** Print the document.
- **Alt + F4:** Close the active application window.

### 3. Typing Ergonomics & Posture
- Keep your back straight against the chair support.
- Position your eyes level with the top third of the monitor ($50 - 70\\text{ cm}$ away).
- Rest your feet flat on the floor or on a footrest.
- Keep wrists straight and level with the keyboard to prevent Repetitive Strain Injury (RSI).`,
    keyTakeaways: [
      'F1 is the universal Help key; F5 refreshes documents and browser pages.',
      'Ctrl + C copies, Ctrl + V pastes, Ctrl + Z undoes, and Ctrl + S saves.',
      'Proper typing ergonomics protects against eye strain and wrist injuries (RSI).'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'comp-jss1-t2-w9-lab-ethics-safety',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Computer Laboratory Care, Ethics & Safety Rules',
    subtopics: ['Laboratory Rules and Regulations', 'Protection from Dust and Moisture', 'Uninterruptible Power Supply (UPS) & Surges', 'Computer Ethics & Cyber Hygiene'],
    readingTimeMinutes: 5,
    summary: 'Guidelines for computer laboratory management, environmental protection, voltage surge suppression, and ethical digital citizenship.',
    contentMarkdown: `### 1. Computer Laboratory Rules

To safeguard expensive school computing equipment:
1. **No Food or Drinks:** Liquid spills cause short circuits; crumbs attract ants and cockroaches that chew motherboards.
2. **Dust Protection:** Always cover computers with dust covers after shutting down; vacuum clean regularly.
3. **Proper Shutdown:** Always click *Start $\\to$ Shut Down*; never turn off a computer directly by pulling the power plug, as this corrupts storage files.
4. **Ventilation:** Maintain clean airflow or air conditioning to prevent microprocessors from overheating.

### 2. Power Protection Hardware

Nigerian public power grids experience frequent outages and voltage spikes:
- **Surge Protector:** Diverts excess voltage surges safely to ground, protecting circuits from lightning and generator spikes.
- **Uninterruptible Power Supply (UPS):** Contains an internal rechargeable battery that supplies immediate backup power during a blackout, giving users time to save files and safely shut down.
- **Automatic Voltage Regulator (AVR / Stabilizer):** Smooths fluctuating low or high voltages into a steady $220 - 240\\text{ V}$ supply.

### 3. Computer Ethics
- Respect user privacy; do not read or delete files belonging to other students.
- Do not download unauthorized software or malicious files (viruses/malware).
- Avoid cyberbullying and plagiarism; always cite digital sources.`,
    keyTakeaways: [
      'Never bring food or liquids into a computer laboratory.',
      'A UPS provides battery backup during blackouts, allowing safe shutdown.',
      'Always shut down computers through operating system commands to protect file integrity.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  },
  {
    id: 'comp-jss1-t2-w10-revision-comp',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Term 2 Computer Studies Examination Revision',
    subtopics: ['Generations & Hardware Synthesis', 'Software Classifications Review', 'Operating System Concepts', 'Exam Strategy & Speed Practice'],
    readingTimeMinutes: 5,
    summary: 'Comprehensive terminal review consolidating computer evolution, classification, CPU architecture, system software, and laboratory safety.',
    contentMarkdown: `### 1. Comprehensive Term 2 Computer Studies Review

- **History:** Charles Babbage (Father of Computing), Ada Lovelace. Five generations (Vacuum tubes $\\to$ Transistors $\\to$ ICs $\\to$ Microprocessors $\\to$ AI).
- **Classification:** By Type (Digital, Analog, Hybrid); by Size (Super, Mainframe, Mini, Micro); by Purpose (General, Special).
- **Architecture:** IPO cycle; CPU consists of ALU (math/logic) and CU (coordination); RAM (volatile) vs ROM (permanent BIOS).
- **Peripherals:** Monitors (CRT, LCD, LED soft copy); Printers (Impact dot-matrix vs Non-impact laser hard copy).
- **Software:** System software (OS, Drivers, Utilities) vs Application software (Word processors, Spreadsheets).
- **Interfaces:** CLI (command text) vs GUI (WIMP: Windows, Icons, Menus, Pointer).
- **Safety & Lab:** Proper shutdown, Surge protectors, UPS backup, ergonomics.

### 2. Examination Technique for CBT Computer Drills
- Read the question stem carefully: note words like **NOT**, **EXCEPT**, or **INCORRECT**.
- Remember that RAM loses its memory on power failure, but ROM does not!`,
    keyTakeaways: [
      'The CPU coordinates all activities via the Control Unit and computes via the ALU.',
      'System software provides the foundation for application software to run.',
      'Take the practice quiz in the CBT Simulator to achieve distinction scores.'
    ],
    associatedQuizId: 'jss1-math-basic-science-2025'
  }
];
