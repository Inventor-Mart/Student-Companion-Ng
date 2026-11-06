import { CurriculumTopic } from '../types';

export const SS2_ECONOMICS_TOPICS: CurriculumTopic[] = [
  // ==========================================
  // WEEK 1: ELASTICITY OF DEMAND
  // ==========================================
  {
    id: 'econ-ss2-term2-week1',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Economics',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Price Determination & Price Elasticity of Demand (PED)',
    subtopics: [
      'Concept of Elasticity of Demand and Mathematical Formulation',
      'Types of Elasticity: Price Elasticity, Income Elasticity, and Cross Elasticity',
      'The Five Degrees of Price Elasticity: Inelastic, Elastic, Unitary, Perfectly Inelastic, Perfectly Elastic',
      'Determinants of Elasticity and Practical Implications for Business Revenue and Tax Policy'
    ],
    readingTimeMinutes: 9,
    summary: 'Master the concept and mathematical calculation of Price Elasticity of Demand, analyze the 5 degrees of elasticity along with their curve profiles, and evaluate their impact on total business revenue.',
    contentMarkdown: `### 1. What is Elasticity of Demand?

In microeconomics, **Elasticity of Demand** measures the degree of responsiveness of the quantity demanded of a commodity to a change in one of the variables that determine demand (price of the commodity, consumer income, or price of related commodities).

The **Price Elasticity of Demand ($E_d$)** formula is expressed as:

$$E_d = \\frac{\\text{Percentage Change in Quantity Demanded}}{\\text{Percentage Change in Price}} = \\frac{\\%\\Delta Q_d}{\\%\\Delta P}$$

$$\\text{Expanded Formula:} \\quad E_d = \\frac{Q_2 - Q_1}{Q_1} \\div \\frac{P_2 - P_1}{P_1} = \\frac{\\Delta Q}{\\Delta P} \\times \\frac{P_1}{Q_1}$$

*(Note: Because of the downward slope of the demand curve, $E_d$ is mathematically negative; economists ignore the negative sign and evaluate the absolute numerical coefficient).*

### 2. The Five Degrees of Price Elasticity of Demand

[Diagram: economics-elasticity-spectrum]

| Degree of Elasticity | Coefficient Value | Visual Curve Slope | Real-World Nigerian Commodity Example | Impact of Price Hike on Total Revenue (TR) |
| :--- | :--- | :--- | :--- | :--- |
| **Perfectly Inelastic** | $E_d = 0$ | Vertical straight line | Life-saving insulin, Prescription medicines | Total Revenue rises proportionally with price. |
| **Fairly Inelastic** | $0 < E_d < 1$ | Steep downward slope | Essential staple foods (Garri, Yam, Petrol / PMS) | Total Revenue **rises** when price is increased. |
| **Unitary Elastic** | $E_d = 1$ | Rectangular hyperbola | Commodities with balanced substitutes | Total Revenue remains **unchanged**. |
| **Fairly Elastic** | $1 < E_d < \\infty$ | Gentle, shallow slope | Luxury goods, Designer apparel, Soft drinks | Total Revenue **falls** when price is increased. |
| **Perfectly Elastic** | $E_d = \\infty$ | Horizontal straight line | Agricultural produce in a perfectly competitive market | Any price rise reduces quantity demanded to zero! |

### 3. Worked WAEC Calculation Example

**Problem:** When the price of a bag of rice rose from ₦40,000 to ₦50,000 in Mile 12 Market, the quantity demanded dropped from 200 bags to 180 bags per week. Calculate the price elasticity of demand and interpret your result.

$$\\Delta P = 50,000 - 40,000 = 10,000$$
$$\\Delta Q = 180 - 200 = -20$$
$$P_1 = 40,000, \\quad Q_1 = 200$$

$$E_d = \\left| \\frac{-20}{10,000} \\times \\frac{40,000}{200} \\right| = \\left| -0.002 \\times 200 \\right| = |-0.4| = 0.4$$

- **Interpretation:** Since $E_d = 0.4 < 1$, the demand for rice is **price inelastic**. A 25% increase in price led to only a 10% decrease in quantity demanded.

### 4. Determinants of Price Elasticity of Demand

1. **Availability of Close Substitutes:** Commodities with numerous alternatives (e.g. tea vs. coffee) have elastic demand; goods without substitutes (table salt) are inelastic.
2. **Degree of Necessity:** Essential survival items (water, staple food) are highly inelastic; luxury status goods are elastic.
3. **Proportion of Income Spent:** Goods that absorb a negligible fraction of income (matches, salt) have inelastic demand.
4. **Time Period:** In the long run, demand becomes more elastic as consumers discover alternative consumption habits.`,
    keyTakeaways: [
      'Price Elasticity of Demand measures how quantity demanded responds to price fluctuations.',
      'When Ed < 1 (inelastic), increasing price increases total producer revenue.',
      'When Ed > 1 (elastic), reducing price increases total producer revenue.',
      'Essential staples with few substitutes exhibit steep, inelastic demand curves.'
    ],
    associatedQuizId: 'econ-ss2-ped-quiz'
  },

  // ==========================================
  // WEEK 2: ELASTICITY OF SUPPLY
  // ==========================================
  {
    id: 'econ-ss2-term2-week2',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Economics',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Price Elasticity of Supply (PES) & Market Supply Responsiveness',
    subtopics: [
      'Definition of Price Elasticity of Supply and Coefficient Calculation',
      'The Five Degrees of Elasticity of Supply and Graphic Representations',
      'Determinants of Supply Elasticity: Time Factor, Storage Capacity, and Factor Mobility',
      'Applications of Supply Elasticity in Nigerian Agriculture and Manufacturing'
    ],
    readingTimeMinutes: 8,
    summary: 'Evaluate Price Elasticity of Supply, calculate supply coefficients from schedules, analyze supply responsiveness curves, and examine agricultural market shocks in Nigeria.',
    contentMarkdown: `### 1. Concept of Elasticity of Supply

**Price Elasticity of Supply ($E_s$)** measures the percentage change in the quantity supplied of a good or service divided by the percentage change in its selling price:

$$E_s = \\frac{\\%\\Delta Q_s}{\\%\\Delta P} = \\frac{\\Delta Q_s}{\\Delta P} \\times \\frac{P_1}{Q_s1}$$

Because producers are motivated by higher prices to supply more (Law of Supply), the price elasticity of supply is positive ($E_s > 0$).

### 2. The Five Degrees of Elasticity of Supply

| Degree | Value | Graphic Origin / Slope | Agricultural vs Industrial Context |
| :--- | :--- | :--- | :--- |
| **Perfectly Inelastic** | $E_s = 0$ | Vertical straight line | Perishable harvest on market day without cold storage (must sell at any price). |
| **Inelastic Supply** | $0 < E_s < 1$ | Upward sloping curve intersecting the positive horizontal quantity axis | Cocoa and Oil Palm farming (takes years for tree seedlings to mature). |
| **Unitary Elastic Supply**| $E_s = 1$ | Straight line passing through the graphic origin $(0,0)$ | Balanced production cycles where $\%\\Delta Q_s = \\%\\Delta P$. |
| **Elastic Supply** | $1 < E_s < \\infty$| Upward sloping curve intersecting the positive vertical price axis | Fast-moving consumer goods (FMCG) like packaged biscuits or detergents. |
| **Perfectly Elastic** | $E_s = \\infty$ | Horizontal straight line | Unconstrained manufacturing operating with vast excess idle factory capacity. |

### 3. Key Determinants of Supply Elasticity

1. **Time Factor (The Most Critical Determinant):**
   - **Momentary Run (Market Period):** Supply is fixed and perfectly inelastic ($E_s = 0$).
   - **Short Run:** Firms can vary variable inputs (labour shifts); supply is relatively inelastic.
   - **Long Run:** Firms can construct new factories and expand land; supply becomes highly elastic ($E_s > 1$).
2. **Perishability & Storage Facilities:** Perishable crops (tomatoes, fresh fish) have inelastic supply unless preserved by modern cold chains.
3. **Mobility of Factors of Production:** If labour and capital shift effortlessly between lines of business, supply elasticity is high.
4. **Availability of Excess Plant Capacity:** Factories running at 40% capacity can scale output immediately upon a price jump.`,
    keyTakeaways: [
      'Price Elasticity of Supply measures producer responsiveness to price changes.',
      'Agricultural commodities have highly inelastic supply in the short run due to biological gestation periods.',
      'Any linear supply curve originating from the graph origin (0,0) has unitary elasticity (Es = 1).',
      'Supply becomes increasingly elastic as time allows producers to adjust capital and capacity.'
    ],
    associatedQuizId: 'econ-ss2-pes-quiz'
  },

  // ==========================================
  // WEEK 3: THEORY OF CONSUMER BEHAVIOUR
  // ==========================================
  {
    id: 'econ-ss2-term2-week3',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Economics',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Theory of Consumer Behaviour & Utility Maximization',
    subtopics: [
      'The Concept of Utility: Total Utility (TU) and Marginal Utility (MU)',
      'The Law of Diminishing Marginal Utility and the Point of Satiety',
      'The Equi-Marginal Principle and Consumer Equilibrium Conditions',
      'Ordinal Utility Approach: Indifference Curves, Budget Lines, and Consumer Tangency'
    ],
    readingTimeMinutes: 9,
    summary: 'Master consumer utility concepts, analyze the Law of Diminishing Marginal Utility, calculate equilibrium under the equi-marginal principle, and examine indifference curves.',
    contentMarkdown: `### 1. Concepts of Utility

**Utility** is the subjective degree of satisfaction or pleasure derived by an economic agent from the consumption of a good or service at a particular point in time.

- **Total Utility (TU):** The overall aggregate satisfaction derived from consuming a specific number of units of a good:
  $$TU = \\sum MU$$
- **Marginal Utility (MU):** The additional satisfaction gained from consuming one extra unit of a commodity:
  $$MU = \\frac{\\Delta TU}{\\Delta Q} = TU_n - TU_{n-1}$$

### 2. The Law of Diminishing Marginal Utility

> **The Law:** As a consumer consumes successive units of a given commodity within a specific time period, the marginal utility derived from each additional unit progressively declines.

| Units Consumed ($Q$) | Total Utility ($TU$ in utils) | Marginal Utility ($MU$ in utils) | Consumer State |
| :---: | :---: | :---: | :--- |
| 0 | 0 | - | Starting state |
| 1 | 14 | 14 | High initial satisfaction |
| 2 | 24 | 10 | Positive diminishing MU |
| 3 | 30 | 6 | Diminishing MU |
| 4 | 33 | 3 | Diminishing MU |
| **5** | **33** | **0** | **Point of Satiety / Maximum TU** |
| 6 | 30 | -3 | Disutility (Dissatisfaction sets in) |

### 3. Critical WAEC Rule: Relationship Between TU and MU

1. When $MU$ is positive and decreasing, $TU$ is increasing at a decreasing rate.
2. When $MU = 0$, $TU$ reaches its absolute **maximum** (Point of Satiety).
3. When $MU$ becomes negative, $TU$ begins to decline (Disutility zone).

### 4. Consumer Equilibrium Conditions

Under the cardinal approach, a rational consumer with a fixed income maximizes satisfaction across two commodities ($X$ and $Y$) when:

$$\\frac{MU_x}{P_x} = \\frac{MU_y}{P_y} = MU_m \\quad \\text{and} \\quad P_x \\cdot Q_x + P_y \\cdot Q_y = \\text{Total Income}$$

Where:
- $MU_x, MU_y$ = Marginal utility of commodities $X$ and $Y$.
- $P_x, P_y$ = Unit prices of commodities $X$ and $Y$.
- $MU_m$ = Marginal utility of money.`,
    keyTakeaways: [
      'Total Utility is maximized at the exact point where Marginal Utility equals zero.',
      'The Law of Diminishing Marginal Utility explains why demand curves slope downward.',
      'Consumer equilibrium is achieved when MU per Naira spent is equal across all consumed goods.',
      'Negative marginal utility represents disutility or dissatisfaction.'
    ],
    associatedQuizId: 'econ-ss2-utility-quiz'
  },

  // ==========================================
  // WEEK 4: THEORY OF COST
  // ==========================================
  {
    id: 'econ-ss2-term2-week4',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Economics',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Theory of Cost: Short-Run Cost Schedules & Curves',
    subtopics: [
      'Basic Cost Concepts: Explicit vs. Implicit Costs, Private vs. Social Costs',
      'Short-Run Costs: Total Fixed Cost (TFC), Total Variable Cost (TVC), and Total Cost (TC)',
      'Per-Unit Costs: Average Fixed Cost (AFC), Average Variable Cost (AVC), Average Total Cost (ATC)',
      'Marginal Cost (MC): Mathematical Derivation and the Geometric Relationship Between MC and ATC'
    ],
    readingTimeMinutes: 9,
    summary: 'Analyze short-run cost structures, compute TFC, TVC, TC, AFC, AVC, ATC, and MC across schedules, and evaluate the U-shaped geometry of average cost curves.',
    contentMarkdown: `### 1. Cost Classifications in Economics

- **Explicit Costs:** Direct out-of-pocket cash payments made for factors of production (e.g. factory wages, raw material bills, diesel purchases).
- **Implicit Costs:** The opportunity cost of owner-supplied resources for which no direct monetary payment is made (e.g. interest forgone on self-invested capital, salary the entrepreneur could have earned elsewhere).
- **Economic Cost:** $\\text{Economic Cost} = \\text{Explicit Costs} + \\text{Implicit Costs}$.

### 2. Short-Run Total Cost Relationships

In the short run, at least one factor of production (e.g. factory building, heavy machinery) is fixed in supply:

$$TC = TFC + TVC$$

- **Total Fixed Cost (TFC):** Costs that remain constant regardless of the volume of output produced (e.g. warehouse rent, factory insurance). TFC is represented by a horizontal line.
- **Total Variable Cost (TVC):** Costs that vary directly with output volume (e.g. raw materials, factory electricity, piece-rate labour). Starts at zero when output is zero.

### 3. Per-Unit Cost Schedules & Equations

$$\\text{Average Fixed Cost (AFC)} = \\frac{TFC}{Q}$$
$$\\text{Average Variable Cost (AVC)} = \\frac{TVC}{Q}$$
$$\\text{Average Total Cost (ATC)} = \\frac{TC}{Q} = AFC + AVC$$
$$\\text{Marginal Cost (MC)} = \\frac{\\Delta TC}{\\Delta Q} = \\frac{\\Delta TVC}{\\Delta Q}$$

| Output ($Q$) | TFC (₦) | TVC (₦) | TC (₦) | AFC (₦) | AVC (₦) | ATC (₦) | MC (₦) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 0 | 100 | 0 | 100 | - | - | - | - |
| 1 | 100 | 40 | 140 | 100 | 40 | 140 | 40 |
| 2 | 100 | 70 | 170 | 50 | 35 | 85 | 30 |
| 3 | 100 | 90 | 190 | 33.3 | 30 | 63.3 | 20 |
| 4 | 100 | 120 | 220 | 25 | 30 | 55 | 30 |
| 5 | 100 | 170 | 270 | 20 | 34 | 54 | 50 |
| 6 | 100 | 240 | 340 | 16.7 | 40 | 56.7 | 70 |

### 4. Geometric Relationships in Cost Curves

1. **AFC Curve:** Continually declines as output expands (rectangular hyperbola), approaching the horizontal axis but never touching it.
2. **ATC and AVC Curves:** Both are **U-shaped** due to the **Law of Diminishing Returns** (increasing returns initially lower per-unit costs, followed by decreasing returns that drive costs upward).
3. **The Critical Intersection Rule:** The **Marginal Cost (MC) curve** cuts both the **AVC curve** and the **ATC curve** from below at their **minimum points**.`,
    keyTakeaways: [
      'Total Cost equals Total Fixed Cost plus Total Variable Cost (TC = TFC + TVC).',
      'Average Fixed Cost continually falls as output increases, spreading fixed overheads.',
      'The MC curve intersects both AVC and ATC at their lowest, minimum points.',
      'The U-shape of short-run average cost curves is caused by the Law of Diminishing Returns.'
    ],
    associatedQuizId: 'econ-ss2-cost-theory-quiz'
  },

  // ==========================================
  // WEEK 5: THEORY OF REVENUE & MARKET STRUCTURES
  // ==========================================
  {
    id: 'econ-ss2-term2-week5',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Economics',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Theory of Revenue & Market Structures: Perfect Competition vs. Monopoly',
    subtopics: [
      'Revenue Concepts: Total Revenue (TR), Average Revenue (AR), and Marginal Revenue (MR)',
      'Characteristics of Perfect Competition (Price Taker, Homogeneous Goods, Free Entry)',
      'Characteristics of Pure Monopoly (Single Seller, Unique Good, High Barriers to Entry)',
      'Short-Run and Long-Run Profit Maximization Condition ($MC = MR$)'
    ],
    readingTimeMinutes: 9,
    summary: 'Compare Perfect Competition and Pure Monopoly, calculate TR, AR, and MR, establish profit-maximization conditions (MC = MR), and examine supernormal profit equilibrium.',
    contentMarkdown: `### 1. The Core Revenue Formulas

In economic production, revenue represents the gross monetary receipts earned from selling output:

$$\\text{Total Revenue (TR)} = P \\times Q$$
$$\\text{Average Revenue (AR)} = \\frac{TR}{Q} = \\frac{P \\times Q}{Q} = P \\quad (\\text{AR is ALWAYS equal to Unit Selling Price})$$
$$\\text{Marginal Revenue (MR)} = \\frac{\\Delta TR}{\\Delta Q}$$

### 2. Market Structures Compared

[Diagram: economics-market-structures-matrix]

| Diagnostic Feature | Perfect Competition | Pure Monopoly |
| :--- | :--- | :--- |
| **Number of Sellers** | Extremely large number of small buyers and sellers. | Single, dominant producer/firm controls 100% of industry supply. |
| **Nature of Product** | Completely **homogeneous** (identical goods e.g. white maize). | **Unique** product with zero close substitutes. |
| **Price Control** | **Price Taker**; price is set by aggregate market demand and supply. | **Price Maker**; sets price or quantity (cannot dictate both simultaneously). |
| **Demand Curve Face by Firm** | Perfectly elastic ($E_d = \\infty$); horizontal line where $P = AR = MR$. | Downward-sloping demand curve ($AR$); $MR$ lies below $AR$. |
| **Barriers to Entry** | Free entry and free exit of firms in the long run. | Complete barriers to entry (patents, legal franchise, high capital setup). |
| **Long-Run Profit** | Earns **Normal Profit** only ($P = MC = \\text{minimum ATC}$). | Can sustain **Supernormal (Economic) Profit** in the long run. |

### 3. The Universal Profit Maximization Rule

Any firm in any market structure maximizes profit or minimizes loss where two conditions are satisfied:

1. **Necessary Condition:** $\\mathbf{MC = MR}$ (Marginal Cost equals Marginal Revenue).
2. **Sufficient Condition:** The $MC$ curve must intersect the $MR$ curve **from below** (i.e. $MC$ must be rising at the equilibrium point).

- **Supernormal Profit:** When at equilibrium output, $AR > ATC$.
- **Normal Profit (Break-even):** When $AR = ATC$.
- **Economic Loss:** When $AR < ATC$. (If $AR < AVC$, the firm must shut down in the short run).`,
    keyTakeaways: [
      'Average Revenue (AR) is always mathematically identical to unit price (AR = P).',
      'In perfect competition, price equals marginal revenue (P = AR = MR).',
      'In monopoly, MR lies below AR because lowering price to sell more units applies to all previous units.',
      'All firms maximize profit where MC = MR and MC is rising.'
    ],
    associatedQuizId: 'econ-ss2-market-structures-quiz'
  },

  // ==========================================
  // WEEK 6: MID-TERM CLINIC & WORKED MICROECONOMIC PROBLEMS
  // ==========================================
  {
    id: 'econ-ss2-term2-week6',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Economics',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Mid-Term Microeconomics Clinic: Worked Calculations & Curve Interpretations',
    subtopics: [
      'Comprehensive Review of Price Elasticity, Consumer Utility, and Cost Schedules',
      'Step-by-Step Resolution of WAEC Table Calculations (Completing Blank Cost Schedules)',
      'Profit Maximization Calculations: Locating Optimum Output and Computing Total Profit',
      'Graph Interpretation Clinic: Identifying Break-Even, Shutdown, and Supernormal Profit Areas'
    ],
    readingTimeMinutes: 9,
    summary: 'Solve practical WAEC calculation problems, fill missing cells in complex cost-revenue schedules, locate equilibrium output where MC = MR, and master graphic interpretations.',
    contentMarkdown: `### 1. Practical WAEC Cost-Table Problem

**Question:** An SS 2 economics student was given the following cost schedule with missing values. Complete the schedule and identify the profit-maximizing output if unit price $P = \\#50$.

| Output ($Q$) | TFC (₦) | TVC (₦) | TC (₦) | ATC (₦) | MC (₦) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 0 | 120 | 0 | **[a]** | - | - |
| 1 | **[b]** | 40 | 160 | **[c]** | 40 |
| 2 | 120 | 70 | **[d]** | 95 | **[e]** |
| 3 | 120 | **[f]** | 225 | 75 | 35 |
| 4 | 120 | 160 | 280 | **[g]** | **[h]** |
| 5 | 120 | 230 | 350 | 70 | 70 |

### 2. Step-by-Step Mathematical Solutions

- **[a] TC at $Q = 0$:** $TC = TFC + TVC = 120 + 0 = \\mathbf{120}$.
- **[b] TFC at $Q = 1$:** Fixed cost remains constant at all output levels: $TFC = \\mathbf{120}$.
- **[c] ATC at $Q = 1$:** $ATC = TC / Q = 160 / 1 = \\mathbf{160}$.
- **[d] TC at $Q = 2$:** $TC = TFC + TVC = 120 + 70 = \\mathbf{190}$.
- **[e] MC at $Q = 2$:** $MC = TC_2 - TC_1 = 190 - 160 = \\mathbf{30}$.
- **[f] TVC at $Q = 3$:** $TVC = TC - TFC = 225 - 120 = \\mathbf{105}$.
- **[g] ATC at $Q = 4$:** $ATC = TC / Q = 280 / 4 = \\mathbf{70}$.
- **[h] MC at $Q = 4$:** $MC = TC_4 - TC_3 = 280 - 225 = \\mathbf{55}$.

### 3. Finding Profit-Maximizing Output

Under perfect competition, price $P = MR = ₦50$.
- The firm maximizes profit where $MC = MR = ₦50$.
- Looking at the schedule, at **Output $Q = 4$**, $MC$ increases to around ₦55; between 3 and 4, or specifically when $MC = MR$.
- Total Profit at $Q = 4$:
  $$TR = P \\times Q = 50 \\times 4 = ₦200$$
  $$TC = ₦280$$
  $$\\text{Profit} = TR - TC = 200 - 280 = -₦80 \\quad (\\text{Firm makes a short-run loss})$$
- Check Shutdown Condition:
  $$AVC \\text{ at } Q = 4 = \\frac{TVC}{Q} = \\frac{160}{4} = ₦40$$
  Since $P (₦50) > AVC (₦40)$, the firm should **continue operating** in the short run to offset part of its fixed costs!`,
    keyTakeaways: [
      'TFC is always identical across every row in the cost table, including at zero output.',
      'Marginal Cost equals the difference in successive Total Costs (TCn - TCn-1).',
      'A firm continues producing in the short run even at a loss as long as Price exceeds AVC.',
      'If Price falls below minimum AVC, the firm must shut down immediately.'
    ],
    associatedQuizId: 'econ-ss2-midterm-clinic-quiz'
  },

  // ==========================================
  // WEEK 7: IMPERFECT COMPETITION (MONOPOLISTIC & OLIGOPOLY)
  // ==========================================
  {
    id: 'econ-ss2-term2-week7',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Economics',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Imperfect Competition: Monopolistic Competition, Oligopoly & Price Discrimination',
    subtopics: [
      'Characteristics of Monopolistic Competition (Product Differentiation, Brand Loyalty)',
      'Oligopoly Market Structure, Mutual Interdependence, and Collusion/Cartels (OPEC)',
      'The Kinked Demand Curve Theory and Price Rigidity in Oligopolies',
      'Price Discrimination: Degrees, Necessary Conditions, and Real-World Examples'
    ],
    readingTimeMinutes: 8,
    summary: 'Evaluate monopolistic competition and oligopolies, analyze non-price competition and the kinked demand curve, and master the conditions for price discrimination.',
    contentMarkdown: `### 1. Monopolistic Competition

**Monopolistic Competition** is a market structure characterized by a large number of relatively small sellers competing with **differentiated products** that are close substitutes (e.g. toothpaste brands: Closeup, Colgate, Oral-B; toilet soaps).

- **Product Differentiation:** Achieved through branding, packaging, trade names, physical design, and advertising.
- **Downward Sloping Demand:** Because products are differentiated, each firm exercises mild pricing discretion.
- **Long-Run Equilibrium:** Due to free entry and exit, excess profits are competed away until firms earn only **normal profit** ($P = ATC$).

### 2. Oligopoly Market Structure

An **Oligopoly** is a market dominated by a **few large sellers** (e.g. Nigerian Telecommunications: MTN, Airtel, Glo; Cement industry: Dangote, BUA, Lafarge).

| Feature of Oligopoly | Operational Significance |
| :--- | :--- |
| **Mutual Interdependence** | Any pricing or marketing decision by one firm provokes direct retaliation from rival firms. |
| **High Entry Barriers** | Massive capital setup requirements, economies of scale, and patent rights restrict new entrants. |
| **Price Rigidity** | Prices remain sticky; firms fear initiating price wars that deplete industry profitability. |
| **Non-Price Competition** | Firms compete through nationwide advertising, loyalty rewards, customer service, and promos. |
| **Collusion & Cartels** | Explicit agreements among firms to fix output quotas and elevate market prices (e.g. OPEC in crude oil). |

### 3. The Kinked Demand Curve Theory

Paul Sweezy's **Kinked Demand Curve** model explains why oligopoly prices stay rigid:
- **Price Increase:** If Firm A raises its tariff, rivals will **not follow**, causing Firm A to lose substantial market share (highly elastic demand segment above the kink).
- **Price Cut:** If Firm A cuts its tariff to steal customers, rivals **match the cut immediately** to defend market share (inelastic demand segment below the kink).
- *Result:* The demand curve is kinked at the prevailing price $P_0$, creating a vertical discontinuity in the $MR$ curve.

### 4. Price Discrimination

**Price Discrimination** occurs when a producer sells identical units of the same commodity to different buyers at different prices for reasons unrelated to differences in cost.

- **Conditions Necessary for Price Discrimination:**
  1. The seller must possess **monopoly power** (price maker).
  2. The market must be effectively **segmented** into distinct sub-markets without risk of arbitrage (seepage).
  3. Price elasticity of demand must **differ** between the sub-markets (higher price charged to inelastic demand groups).`,
    keyTakeaways: [
      'Monopolistic competition features differentiated products and non-price advertising.',
      'Oligopolies are characterized by mutual interdependence and rigid prices explained by the kinked demand curve.',
      'A cartel (like OPEC) is a formal collusive agreement to control supply and stabilize prices.',
      'Price discrimination requires monopoly power, segmented sub-markets, and differing demand elasticities.'
    ],
    associatedQuizId: 'econ-ss2-imperfect-comp-quiz'
  },

  // ==========================================
  // WEEK 8: MONEY & FINANCIAL INSTITUTIONS
  // ==========================================
  {
    id: 'econ-ss2-term2-week8',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Economics',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Money, Commercial Banking & Central Bank of Nigeria (CBN) Monetary Tools',
    subtopics: [
      'Evolution, Characteristics, and Economic Functions of Money',
      'The Credit Creation Process of Commercial Banks and the Deposit Multiplier',
      'The Central Bank of Nigeria (CBN) as the Apex Regulatory Institution',
      'Traditional Monetary Policy Instruments: Open Market Operations (OMO), Cash Reserve Ratio (CRR), and MPR'
    ],
    readingTimeMinutes: 9,
    summary: 'Analyze money systems, understand commercial bank credit expansion via deposit multipliers, and evaluate the Central Bank of Nigeria monetary policy instruments.',
    contentMarkdown: `### 1. Evolution and Functions of Money

Before money, the **Barter System** (direct exchange of goods for goods) suffered from the crippling limitation of the **Double Coincidence of Wants** (Trader A having what Trader B desires and vice versa).

**Money** is defined as anything generally acceptable as a medium of exchange and settlement of debts.

| Four Core Functions of Money | Economic Explanation |
| :--- | :--- |
| **1. Medium of Exchange** | Facilitates trade transactions without barter friction. |
| **2. Measure of Value (Unit of Account)** | Provides a common standard denominator to price all goods and services. |
| **3. Store of Value** | Allows purchasing power to be preserved and deferred to the future. |
| **4. Standard of Deferred Payment** | Enables credit transactions, long-term loans, and debt contracts. |

### 2. Commercial Banks & Credit Creation

Commercial banks create money by taking customer deposits and lending out the surplus above their statutory reserve requirement:

$$\\text{Deposit / Credit Multiplier} = \\frac{1}{\\text{Cash Reserve Ratio (CRR)}} = \\frac{1}{r}$$

$$\\text{Total Money Created} = \\text{Initial Deposit} \\times \\frac{1}{r}$$

- **Practical Example:** If Chief Okonkwo deposits ₦1,000,000 in Zenith Bank and the CBN sets $CRR = 10\\%$ ($0.1$):
  $$\\text{Credit Multiplier} = \\frac{1}{0.1} = 10$$
  $$\\text{Total Potential Money Supply Generated} = ₦1,000,000 \\times 10 = ₦10,000,000$$

### 3. The Central Bank of Nigeria (CBN) & Monetary Policy

The CBN serves as Nigeria's apex regulatory monetary authority, banker to commercial banks, lender of last resort, and sole issuer of the legal tender (Naira and Kobo).

To control inflation and stimulate economic growth, the CBN uses **Monetary Policy Tools**:

| Monetary Tool | Mechanism to Fight Inflation (Contractionary Policy) |
| :--- | :--- |
| **Open Market Operations (OMO)** | The CBN **sells treasury bills and government securities** to commercial banks to mop up excess cash liquidity. |
| **Cash Reserve Ratio (CRR)** | The CBN **raises the CRR percentage**, forcing commercial banks to immobilize more deposits at the central bank, cutting lending. |
| **Monetary Policy Rate (MPR)** | The CBN **raises the benchmark MPR interest rate**, increasing commercial borrowing rates and discouraging loans. |
| **Moral Suasion** | Informal directives, appeals, and guidance issued by the CBN Governor to bank CEOs. |`,
    keyTakeaways: [
      'Money resolves the barter problem of double coincidence of wants.',
      'Commercial banks expand the money supply through the fractional reserve credit creation process.',
      'The credit multiplier is the reciprocal of the Cash Reserve Ratio (1 / CRR).',
      'The CBN fights inflation by raising the MPR, increasing the CRR, and selling treasury bills via OMO.'
    ],
    associatedQuizId: 'econ-ss2-money-banking-quiz'
  },

  // ==========================================
  // WEEK 9: INFLATION & DEFLATION
  // ==========================================
  {
    id: 'econ-ss2-term2-week9',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Economics',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Inflation, Deflation & Macroeconomic Price Instability in Nigeria',
    subtopics: [
      'Definition and Measurement of Inflation (Consumer Price Index - CPI)',
      'Types of Inflation: Demand-Pull, Cost-Push, and Hyperinflation',
      'Structural Drivers of Inflation in the Nigerian Economy',
      'Socio-Economic Consequences and Policy Prescriptions: Fiscal vs. Monetary Interventions'
    ],
    readingTimeMinutes: 8,
    summary: 'Analyze inflation and deflation dynamics, distinguish demand-pull from cost-push inflation, examine structural causes in Nigeria, and evaluate fiscal and monetary remedies.',
    contentMarkdown: `### 1. What is Inflation?

**Inflation** is defined as a persistent and appreciable rise in the general price level of goods and services in an economy over a sustained period of time, leading to a corresponding erosion in the purchasing power of money.

$$\\text{Rate of Inflation} = \\frac{\\text{CPI}_{\\text{current year}} - \\text{CPI}_{\\text{base year}}}{\\text{CPI}_{\\text{base year}}} \\times 100$$

### 2. Major Causes & Classifications of Inflation

| Classification | Underlying Mechanism | Primary Economic Catalysts |
| :--- | :--- | :--- |
| **Demand-Pull Inflation** | "Too much money chasing too few goods." Aggregate demand ($AD$) outpaces aggregate supply ($AS$) at full employment. | Rapid credit expansion, excessive deficit budget spending, sudden injection of oil revenues. |
| **Cost-Push Inflation** | Aggregate supply ($AS$) shifts left due to rising unit costs of production, forcing firms to hike prices. | Soaring fuel/PMS pump prices, currency devaluation inflating imported raw material costs, electricity tariff hikes. |
| **Hyperinflation** | Extreme, uncontrollable price escalation exceeding $50\\%$ per month; currency collapses. | War, complete economic breakdown, printing unbacked fiat money. |

### 3. Structural Drivers of Inflation in Nigeria

1. **Foreign Exchange Deprecation (Naira Devaluation):** Nigeria is heavily import-dependent for machinery, chemicals, and refined petroleum. A weaker Naira directly increases domestic retail prices (imported inflation).
2. **Transportation & Logistics Bottlenecks:** Poor rural road networks and diesel prices inflate food haulage costs from the Northern agrarian belt to Southern consumer centers.
3. **Security Challenges in Agricultural Belts:** Farmer-herder clashes and rural banditry disrupt agricultural harvests, restricting food supply.
4. **Removal of Fuel & Electricity Subsidies:** Shifts production costs immediately across the national economy.

### 4. Winners and Losers During Inflation

- **Losers:** Fixed income earners (salaried civil servants, pensioners), creditors/lenders (repaid in depreciated Naira), savers holding cash deposits.
- **Winners:** Debtors/borrowers (repay real debt with cheaper money), equity shareholders, real estate owners and commodity speculators.`,
    keyTakeaways: [
      'Inflation represents a continuous rise in the general price level that erodes money purchasing power.',
      'Demand-pull inflation arises from excessive aggregate spending; cost-push stems from rising production inputs.',
      'In Nigeria, exchange rate pass-through and logistics bottlenecks are potent structural drivers of inflation.',
      'Debtors gain during inflation while fixed-income pensioners and creditors lose real purchasing power.'
    ],
    associatedQuizId: 'econ-ss2-inflation-quiz'
  },

  // ==========================================
  // WEEK 10: PUBLIC FINANCE & FISCAL POLICY
  // ==========================================
  {
    id: 'econ-ss2-term2-week10',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Economics',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Public Finance, Government Budgets & Fiscal Policy in Nigeria',
    subtopics: [
      'Nature and Objectives of Public Finance and Government Intervention',
      'Sources of Government Revenue in Nigeria (Oil vs. Non-Oil Revenue)',
      'Government Expenditure: Recurrent vs. Capital Expenditure',
      'The National Budget: Balanced, Surplus, and Deficit Budgets and Debt Financing'
    ],
    readingTimeMinutes: 8,
    summary: 'Analyze public finance architecture, distinguish recurrent from capital expenditures, examine oil and non-oil revenue sources, and assess Nigerian budget deficit financing.',
    contentMarkdown: `### 1. Scope of Public Finance

**Public Finance** is the field of economics that deals with the revenue generation, expenditure allocation, debt management, and fiscal administration of the public sector (Federal, State, and Local Governments).

### 2. Sources of Government Revenue in Nigeria

Nigerian public revenue is structurally categorized into two major channels:

1. **Oil Revenue:** Petroleum Profit Tax (PPT), royalties on crude oil and natural gas, sale of crude oil equity by NNPC Limited, pipeline transit fees.
2. **Non-Oil Revenue:** Company Income Tax (CIT), Value Added Tax (VAT), Personal Income Tax (PIT), Customs and Excise duties on imports, mining royalties, stamp duties, and federal agency operating surpluses.

### 3. Public Expenditure: Recurrent vs. Capital

| Category | Definition | Concrete Nigerian Examples |
| :--- | :--- | :--- |
| **Recurrent Expenditure** | Ongoing, recurring operational expenses of government required to run day-to-day administrative functions. Does not create permanent physical assets. | Civil service salaries and pensions, overhead costs, travel allowances, debt servicing interest payments. |
| **Capital Expenditure** | Public investments directed toward durable, long-term developmental projects that create productive national infrastructure. | Construction of roads and bridges (Second Niger Bridge), railway lines, solar energy grids, university laboratories. |

### 4. Types of Government Budgets

A **Budget** is a comprehensive financial statement detailing estimated government revenues and planned expenditures for a fiscal year:

- **Balanced Budget:** Planned Government Expenditure = Expected Government Revenue.
- **Surplus Budget:** Expected Revenue > Planned Expenditure (Contractionary fiscal effect; curbs inflation).
- **Deficit Budget:** Planned Expenditure > Expected Revenue (Expansionary fiscal policy; stimulates output but increases national debt through borrowing via Treasury Bills and Eurobonds).`,
    keyTakeaways: [
      'Public finance analyzes how government generates revenue and allocates expenditures.',
      'Recurrent expenditure funds day-to-day running costs (salaries); capital expenditure builds infrastructure.',
      'Nigeria relies on both oil revenue (PPT, royalties) and non-oil revenue (CIT, VAT, customs).',
      'A deficit budget occurs when government expenditures exceed revenues, financed by domestic and foreign debt.'
    ],
    associatedQuizId: 'econ-ss2-public-finance-quiz'
  },

  // ==========================================
  // WEEK 11: TAXATION & CANONS OF TAXATION
  // ==========================================
  {
    id: 'econ-ss2-term2-week11',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Economics',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Taxation: Systems, Tax Incidence & Adam Smith’s Canons of Taxation',
    subtopics: [
      'Definition and Economic Purposes of Taxation (Revenue, Redistribution, Protection)',
      'Classification of Taxes: Direct Taxes vs. Indirect Taxes (Specific vs. Ad Valorem)',
      'Tax Systems According to Income Proportionality: Progressive, Proportional, Regressive',
      'Adam Smith’s Four Canons of Taxation and the Concept of Tax Incidence'
    ],
    readingTimeMinutes: 8,
    summary: 'Classify direct and indirect tax systems, compare progressive and regressive structures, analyze Adam Smith’s canons of taxation, and evaluate tax incidence based on demand elasticity.',
    contentMarkdown: `### 1. What is Taxation?

A **Tax** is a compulsory financial levy imposed by the government on the income, profits, transactions, or property of individuals and corporate entities without direct reciprocal benefit to the taxpayer.

### 2. Direct Taxes vs. Indirect Taxes

| Basis of Comparison | Direct Taxes | Indirect Taxes |
| :--- | :--- | :--- |
| **Legal Definition** | Levied directly on the income, wealth, or profits of individuals and firms. | Levied on expenditure, production, and sale of goods and services. |
| **Incidence (Burden)** | Cannot be shifted to another person; paid directly by the assessed taxpayer. | The statutory burden can be partially or fully shifted forward to the final consumer in higher prices. |
| **Examples in Nigeria** | Personal Income Tax (PAYE), Company Income Tax (CIT), Capital Gains Tax (CGT). | Value Added Tax (VAT at 7.5%), Customs Import Duty, Excise Duty on tobacco/spirits. |

### 3. Tax Systems Based on Income Proportionality

1. **Progressive Tax:** Tax rate increases as taxpayer income rises (e.g. Nigerian PAYE system). Wealthier citizens pay a higher percentage of income, reducing income inequality.
2. **Proportional Tax (Flat Tax):** The exact same tax percentage is levied across all income levels regardless of wealth.
3. **Regressive Tax:** The effective tax burden takes a higher percentage of income from low-income earners than from high-income earners (e.g. indirect taxes on essential commodities).

### 4. Adam Smith’s Canons of Taxation

In *The Wealth of Nations* (1776), Adam Smith outlined four fundamental principles for an optimal tax system:

1. **Canon of Equity / Fairness:** Citizens should contribute to government support in proportion to their respective financial ability and income.
2. **Canon of Certainty:** The tax amount, due date, and manner of payment must be clear, transparent, and non-arbitrary.
3. **Canon of Convenience:** The tax should be levied at the time and in the manner most convenient for the contributor to pay (e.g. PAYE deducted directly at monthly payday).
4. **Canon of Economy:** The cost of collecting the tax must be minimal relative to the revenue yielded to the treasury.`,
    keyTakeaways: [
      'Direct taxes fall on income and cannot be shifted; indirect taxes fall on goods and can be shifted.',
      'Progressive taxation charges higher tax rates as income climbs, reducing inequality.',
      'Indirect taxes on basic necessities are inherently regressive, burdening the poor disproportionately.',
      'Adam Smith’s four canons are Equity, Certainty, Convenience, and Economy.'
    ],
    associatedQuizId: 'econ-ss2-taxation-quiz'
  },

  // ==========================================
  // WEEK 12: EXAMINATION MASTERCLASS & CALCULATION CLINIC
  // ==========================================
  {
    id: 'econ-ss2-term2-week12',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Economics',
    term: '2nd Term',
    weekNumber: 12,
    topicTitle: 'Term Review, WAEC Examination Masterclass & Quantitative Calculation Clinic',
    subtopics: [
      'Comprehensive Term Review of Second Term Economics Curriculum',
      'Step-by-Step Resolution of WAEC Past Calculation Questions (Elasticity, Utility, National Multiplier)',
      'Constructing and Interpreting Cost-Revenue Graphs Under Exam Pressure',
      'Mastering WAEC Paper 1 (Objectives) and Paper 2 (Data Response and Essay Strategy)'
    ],
    readingTimeMinutes: 9,
    summary: 'Consolidate Second Term Microeconomics and Public Finance competencies, master quantitative data response questions, review past WAEC exam patterns, and practice optimal essay layout.',
    contentMarkdown: `### 1. Second Term Curriculum Blueprint

- **Microeconomic Analysis (Weeks 1–7):** Price Elasticity of Demand and Supply, Consumer Utility Theory, Short-Run Cost Schedules, Market Structure Profit Maximization ($MC = MR$), and Imperfect Competition.
- **Macroeconomics & Public Finance (Weeks 8–11):** Commercial Banking Credit Creation, Central Bank Monetary Policy, Inflation Dynamics, Public Budgets, and Taxation Systems.

### 2. High-Frequency WAEC Data Response Calculation

**Scenario:** The Central Bank of Nigeria sets a Cash Reserve Ratio ($CRR$) of $12.5\\%$. An initial cash deposit of ₦2,000,000 is placed in a commercial bank.
1. Calculate the banking sector credit creation multiplier.
2. Determine the maximum total money supply generated.

$$\\text{Multiplier} = \\frac{1}{CRR} = \\frac{1}{0.125} = \\mathbf{8}$$
$$\\text{Total Money Created} = \\text{Initial Deposit} \\times \\text{Multiplier} = 2,000,000 \\times 8 = \\mathbf{₦16,000,000}$$

### 3. Model Essay Blueprint: Direct vs. Indirect Taxes

**Question:** Explain four reasons why developing countries like Nigeria rely more heavily on indirect taxes than on direct taxes.
- *Model Essay Points:*
  1. **Large Informal Sector:** A massive segment of the Nigerian population works in unregistered agricultural and market retail jobs, evading formal PAYE direct tax assessment.
  2. **Ease and Economy of Collection:** Indirect taxes like VAT and customs duties are collected at ports and wholesale points, requiring fewer administrative tax inspectors.
  3. **High Revenue Yield on Inelastic Necessities:** Broad-based consumption taxes generate continuous revenue as citizens purchase food, beverages, and fuel regardless of economic cycles.
  4. **Less Tax Resistance and Evasion:** Because indirect taxes are incorporated into retail shelf prices, consumers pay them involuntarily without filing paperwork.

### 4. Final WAEC Exam Success Checklist

- Always include the relevant formula before plugging numbers into elasticity and cost equations.
- In graphical questions, clearly label axes ($P$, $Q$), curve intersections ($MC = MR$), and equilibrium coordinates ($P_e, Q_e$).
- State units clearly (e.g. ₦, utils, bags, percentages).`,
    keyTakeaways: [
      'Credit multiplier equals 1 divided by CRR; total money equals deposit times multiplier.',
      'Developing nations rely on indirect taxes because of large informal economies and collection convenience.',
      'Always state explicit economic formulas before computing elasticity or cost calculations.',
      'Ensure all axes, intersection points, and equilibrium prices/quantities are labeled on diagram sketches.'
    ],
    associatedQuizId: 'econ-ss2-final-exam-quiz'
  }
];
