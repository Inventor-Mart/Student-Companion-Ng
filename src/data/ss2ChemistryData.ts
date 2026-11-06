import { CurriculumTopic } from '../types';

export const SS2_CHEMISTRY_TOPICS: CurriculumTopic[] = [
  // --------------------------------------------------------------------------
  // WEEK 1: RATES OF CHEMICAL REACTIONS & COLLISION THEORY
  // --------------------------------------------------------------------------
  {
    id: 'ss2-chem-t2-w1',
    associatedQuizId: 'waec-chem-ss2-reaction-rates',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Rates of Chemical Reactions & Collision Theory',
    subtopics: [
      'Definition of Reaction Rate: Change in Concentration per Unit Time ($\\text{mol dm}^{-3} \\text{ s}^{-1}$)',
      'Collision Theory: Effective Collisions, Collision Geometry, and Activation Energy ($E_a$)',
      'Factors Influencing Rates: Concentration/Pressure, Surface Area, Temperature, and Catalysts',
      'Rate Curves: Plotting Mass Loss or Volume of Gas Evolved against Time',
      'WAEC Practical Graph Calculations: Initial Rate vs. Average Rate'
    ],
    readingTimeMinutes: 16,
    summary: 'The kinetics of chemical reactions based on collision theory, factors altering reaction velocity, and interpreting rate curves from experimental gas evolution.',
    contentMarkdown: `### 1. Fundamental Principles of Chemical Kinetics

The **rate of a chemical reaction** measures the change in concentration of reactants or products per unit of time:

$$\\text{Rate} = -\\frac{\\Delta[\\text{Reactant}]}{\\Delta t} = +\\frac{\\Delta[\\text{Product}]}{\\Delta t} \\quad (\\text{Units: } \\text{mol dm}^{-3} \\text{ s}^{-1})$$

According to the **Collision Theory**, a chemical reaction can only occur if reactant particles collide. However, not all collisions result in chemical change. An **effective collision** requires two simultaneous criteria:
1. **Activation Energy ($E_a$):** Colliding particles must possess kinetic energy equal to or greater than the minimum activation energy threshold needed to break existing chemical bonds.
2. **Steric Factor (Proper Orientation):** Particles must collide with the correct spatial alignment to permit new bond formation.

---

### 2. Environmental Factors Influencing Reaction Rates

| Factor | Microscopic Mechanism | Practical Laboratory Example |
|---|---|---|
| **Concentration / Pressure** | Increases the frequency of particle collisions per unit volume per second | $2.0\\text{ M } HCl$ reacts much faster with marble chips than $0.5\\text{ M } HCl$ |
| **Surface Area (Particle Size)** | Exposes more reactive sites for collisions per unit time | Powdered calcium carbonate ($CaCO_3$) effervesces rapidly, whereas large marble chips react slowly |
| **Temperature** | Increases the average kinetic energy of molecules; a vastly greater fraction of collisions exceed $E_a$ | Milk curdles and spoils rapidly in Nigerian ambient heat compared to refrigerated storage |
| **Catalyst** | Provides an alternative reaction pathway with a lower activation energy ($E_a$) | Manganese(IV) oxide ($MnO_2$) accelerates decomposition of hydrogen peroxide ($H_2O_2$) |

---

### 3. Worked WAEC Calculation: Gas Evolution Rate
In an experiment reacting excess hydrochloric acid with zinc granules, $48\\text{ cm}^3$ of hydrogen gas was collected in $40\\text{ seconds}$. Calculate the average rate of reaction in $\\text{cm}^3\\text{ s}^{-1}$ and $\\text{mol s}^{-1}$ at standard temperature and pressure (molar volume at s.t.p. = $22.4\\text{ dm}^3\\text{ mol}^{-1} = 22,400\\text{ cm}^3\\text{ mol}^{-1}$).

1. **Rate in $\\text{cm}^3\\text{ s}^{-1}$:**
   $$\\text{Rate} = \\frac{48\\text{ cm}^3}{40\\text{ s}} = 1.20\\text{ cm}^3\\text{ s}^{-1}$$
2. **Convert volume to moles of $H_2$ gas:**
   $$n = \\frac{48}{22,400} = 2.143 \\times 10^{-3}\\text{ mol}$$
3. **Rate in $\\text{mol s}^{-1}$:**
   $$\\text{Rate} = \\frac{2.143 \\times 10^{-3}\\text{ mol}}{40\\text{ s}} = 5.36 \\times 10^{-5}\\text{ mol s}^{-1}$$`,
    keyTakeaways: [
      'For a collision to be effective, particles must have energy >= activation energy and proper spatial orientation.',
      'A catalyst increases the reaction rate by lowering activation energy without being chemically consumed.',
      'Rate of reaction is measured by decrease in reactant concentration or increase in product volume per second.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 2: CHEMICAL EQUILIBRIUM & LE CHATELIER'S PRINCIPLE
  // --------------------------------------------------------------------------
  {
    id: 'ss2-chem-t2-w2',
    associatedQuizId: 'waec-chem-ss2-chemical-equilibrium',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Reversible Reactions, Chemical Equilibrium & Le Chatelier’s Principle',
    subtopics: [
      'Dynamic Equilibrium vs Static Equilibrium (Equality of Forward and Reverse Rates)',
      'The Equilibrium Law and Equilibrium Constant Expression ($K_c$)',
      'Le Chatelier’s Principle: Effects of Concentration, Pressure, and Temperature',
      'Industrial Synthesis: The Haber Process for Ammonia ($N_2 + 3H_2 \\rightleftharpoons 2NH_3$)',
      'Industrial Synthesis: The Contact Process for Sulfuric Acid ($2SO_2 + O_2 \\rightleftharpoons 2SO_3$)'
    ],
    readingTimeMinutes: 16,
    summary: 'Dynamic equilibrium states, constructing equilibrium constant expressions (Kc), predicting shifts via Le Chatelier’s principle, and industrial chemical optimization.',
    contentMarkdown: `### 1. The Nature of Dynamic Equilibrium

A **reversible reaction** in a closed system reaches **dynamic equilibrium** when:
1. The rate of the forward reaction equals the rate of the reverse reaction ($r_f = r_r$).
2. The macroscopic concentrations of reactants and products remain constant over time.

For a generalized reversible reaction:

$$aA + bB \\rightleftharpoons cC + dD$$

The **Equilibrium Constant ($K_c$)** is given by:

$$K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}$$

- If $K_c \\gg 1$: Equilibrium lies heavily to the right (products dominate).
- If $K_c \\ll 1$: Equilibrium lies heavily to the left (reactants dominate).

---

### 2. Le Chatelier's Principle

> **Le Chatelier’s Principle:** When a system in dynamic equilibrium is subjected to an external change in concentration, pressure, or temperature, the system readjusts itself in such a way as to counteract and nullify the effect of the applied disturbance.

| External Stress | Direction of Equilibrium Shift | Effect on Equilibrium Constant ($K_c$) |
|---|---|---|
| **Increase Reactant Concentration** | Shifts **Forward (Right)** to consume excess reactant | **No Change** |
| **Increase Product Concentration** | Shifts **Reverse (Left)** to consume excess product | **No Change** |
| **Increase Total Pressure** | Shifts toward the side with **fewer moles of gas** | **No Change** |
| **Decrease Total Pressure** | Shifts toward the side with **more moles of gas** | **No Change** |
| **Increase Temperature** | Shifts in the **Endothermic ($+\\Delta H$)** direction to absorb heat | **Changes $K_c$** |
| **Decrease Temperature** | Shifts in the **Exothermic ($-\\Delta H$)** direction to release heat | **Changes $K_c$** |
| **Addition of Catalyst** | **No shift**; accelerates forward and reverse rates equally | **No Change** |

---

### 3. Industrial Optimization: The Haber Process
$$N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g) \\quad \\Delta H = -92.4\\text{ kJ mol}^{-1}$$
- **Pressure:** High pressure ($200\\text{ atmospheres}$) favors the forward reaction because $4\\text{ moles of gas} \\to 2\\text{ moles of gas}$.
- **Temperature Compromise:** Low temperature favors the exothermic forward reaction, but makes the rate unacceptably slow. Hence, an optimum compromise temperature of $450^\\circ\\text{C}$ is employed.
- **Catalyst:** Finely divided iron ($Fe$) with potassium hydroxide promoter is used to speed up attainment of equilibrium.`,
    keyTakeaways: [
      'Dynamic equilibrium occurs when forward and reverse reaction rates are equal in a closed container.',
      'Only temperature changes alter the numerical value of Kc; pressure and concentration shifts do not.',
      'Pressure changes only influence gas-phase equilibria where there is an unequal number of gaseous moles.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 3: THERMOCHEMISTRY & ENERGY PROFILES
  // --------------------------------------------------------------------------
  {
    id: 'ss2-chem-t2-w3',
    associatedQuizId: 'waec-chem-ss2-thermochemistry',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Thermochemistry: Enthalpy Changes & Reaction Energy Profiles',
    subtopics: [
      'Exothermic vs Endothermic Reactions: Heat of Reaction and Sign Conventions',
      'Standard Enthalpy Changes (Formation $\\Delta H_f^\\circ$, Combustion $\\Delta H_c^\\circ$, Neutralization $\\Delta H_{neut}^\\circ$)',
      'Constructing and Interpreting Reaction Energy Profile Diagrams',
      'Hess’s Law of Constant Heat Summation and Thermochemical Cycles',
      'Bond Energy Calculations: $\\Delta H = \\sum(\\text{Bonds Broken}) - \\sum(\\text{Bonds Formed})$'
    ],
    readingTimeMinutes: 16,
    summary: 'Thermochemical concepts: distinguishing exothermic and endothermic processes, reaction energy profiles, applying Hess’s Law, and bond enthalpy calculations.',
    contentMarkdown: `### 1. Thermochemical Concepts

[Diagram: reaction-energy-profile]

Every chemical substance contains chemical potential energy called **enthalpy ($H$)**. During chemical reactions, existing bonds break (an endothermic process requiring energy) and new bonds form (an exothermic process releasing energy).

| Reaction Type | Enthalpy Sign ($\\Delta H$) | Temperature of Surroundings | Total Enthalpy Comparison | Laboratory Example |
|---|---|---|---|---|
| **Exothermic** | **Negative ($\\Delta H < 0$)** | **Increases** (Container feels hot) | $H_{\\text{products}} < H_{\\text{reactants}}$ | Neutralization of strong acid with strong alkali ($HCl + NaOH$) |
| **Endothermic** | **Positive ($\\Delta H > 0$)** | **Decreases** (Container feels cold) | $H_{\\text{products}} > H_{\\text{reactants}}$ | Dissolution of ammonium chloride ($NH_4Cl$) in water |

---

### 2. Hess's Law of Constant Heat Summation

> **Hess’s Law:** The total enthalpy change for a chemical reaction is independent of the pathway taken, depending only on the initial states of reactants and final states of products.

$$\\Delta H_{\\text{reaction}}^\\circ = \\sum \\Delta H_f^\\circ(\\text{Products}) - \\sum \\Delta H_f^\\circ(\\text{Reactants})$$

#### Worked Example:
Calculate the standard enthalpy of combustion of methane ($\\Delta H_c$) given the standard enthalpies of formation:
- $\\Delta H_f^\\circ[CH_4(g)] = -74.8\\text{ kJ mol}^{-1}$
- $\\Delta H_f^\\circ[CO_2(g)] = -393.5\\text{ kJ mol}^{-1}$
- $\\Delta H_f^\\circ[H_2O(l)] = -285.8\\text{ kJ mol}^{-1}$

**Reaction Equation:**
$$CH_4(g) + 2O_2(g) \\to CO_2(g) + 2H_2O(l)$$

$$\\Delta H_c = [\\Delta H_f(CO_2) + 2\\Delta H_f(H_2O)] - [\\Delta H_f(CH_4) + 2\\Delta H_f(O_2)]$$
$$\\Delta H_c = [(-393.5) + 2(-285.8)] - [(-74.8) + 0]$$
$$\\Delta H_c = [-393.5 - 571.6] + 74.8 = -965.1 + 74.8 = -890.3\\text{ kJ mol}^{-1}$$`,
    keyTakeaways: [
      'Exothermic reactions release heat and have negative Delta H; endothermic reactions absorb heat and have positive Delta H.',
      'Bond breaking is always endothermic (+ energy); bond formation is always exothermic (- energy).',
      'Hess’s law enables determination of enthalpy changes that cannot be measured directly in a calorimeter.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 4: ACIDS, BASES, AND SALTS
  // --------------------------------------------------------------------------
  {
    id: 'ss2-chem-t2-w4',
    associatedQuizId: 'waec-chem-ss2-acids-bases-salts',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Acids, Bases & Salts: Theories, pH Scale & Hydrolysis',
    subtopics: [
      'Theories of Acids and Bases: Arrhenius, Brønsted-Lowry, and Lewis Formulations',
      'Strength vs. Concentration: Strong vs. Weak Acids and Bases',
      'The pH and pOH Scale: Mathematical Calculations ($pH = -\\log[H^+]$)',
      'Classification of Salts: Normal, Acid, Basic, Double, and Complex Salts',
      'Salt Hydrolysis: Explaining Acidic/Basic Behavior of Dissolved Salts'
    ],
    readingTimeMinutes: 16,
    summary: 'The theoretical frameworks of acids and bases, pH/pOH logarithmic calculations, taxonomy of salts, and the mechanics of salt hydrolysis.',
    contentMarkdown: `### 1. Comparative Theories of Acids and Bases

| Theory | Definition of Acid | Definition of Base | Limitation of Theory |
|---|---|---|---|
| **Arrhenius Theory** | Substance that produces hydrogen ions ($H^+$ or $H_3O^+$) in aqueous solution | Substance that produces hydroxide ions ($OH^-$) in aqueous solution | Limited strictly to aqueous solutions; cannot explain basicity of ammonia gas ($NH_3$) |
| **Brønsted-Lowry Theory** | **Proton ($H^+$) Donor** | **Proton ($H^+$) Acceptor** | Explains gas-phase and non-aqueous acid-base interactions |
| **Lewis Theory** | **Electron Pair Acceptor** | **Electron Pair Donor** | Broadest definition; encompasses coordinate bonding without proton transfer |

---

### 2. The pH and pOH Scale

The $pH$ of an aqueous solution is the negative logarithm to base 10 of the hydrogen ion concentration:

$$pH = -\\log_{10}[H^+] \\qquad pOH = -\\log_{10}[OH^-] \\qquad pH + pOH = 14 \\quad (\\text{at } 25^\\circ\\text{C})$$

#### Worked Problem:
Calculate the $pH$ of a $0.005\\text{ M}$ solution of sulfuric acid ($H_2SO_4$), assuming complete ionization.

1. **Write Dissociation Equation:**
   $$H_2SO_4(aq) \\to 2H^+(aq) + SO_4^{2-}(aq)$$
2. **Calculate $[H^+]$:**
   $$[H^+] = 2 \\times 0.005\\text{ M} = 0.010\\text{ M} = 1.0 \\times 10^{-2}\\text{ mol dm}^{-3}$$
3. **Compute $pH$:**
   $$pH = -\\log_{10}(1.0 \\times 10^{-2}) = -(-2) = 2.0$$

---

### 3. Classification of Salts

| Salt Type | Chemical Definition | Examples |
|---|---|---|
| **Normal Salt** | Formed by complete replacement of all replaceable hydrogen ions in an acid by a metal | $NaCl, Na_2SO_4, KNO_3$ |
| **Acid Salt** | Formed by partial replacement of replaceable hydrogen ions in a polybasic acid | $NaHCO_3, NaHSO_4, KH_2PO_4$ |
| **Basic Salt** | Contains replaceable hydroxide or oxide ions due to incomplete neutralization | $Zn(OH)Cl, Mg(OH)NO_3$ |
| **Double Salt** | Crystallizes with two distinct simple salts in equimolar proportions | Potash Alum: $KAl(SO_4)_2 \\cdot 12H_2O$ |
| **Complex Salt** | Contains a complex cation or anion with coordinate covalent bonds | Potassium hexacyanoferrate(II): $K_4[Fe(CN)_6]$ |`,
    keyTakeaways: [
      'Bronsted-Lowry acid is a proton donor; a conjugate base is formed when an acid loses a proton.',
      'pH = -log[H+]; sulfuric acid is dibasic and yields twice its molarity in H+ ions.',
      'Acid salts contain replaceable hydrogen ions; basic salts contain residual hydroxide ions.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 5: VOLUMETRIC ANALYSIS (ACID-BASE TITRATION)
  // --------------------------------------------------------------------------
  {
    id: 'ss2-chem-t2-w5',
    associatedQuizId: 'waec-chem-ss2-volumetric-analysis',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Volumetric Analysis: Acid-Base Titration & Stoichiometric Calculations',
    subtopics: [
      'Standard Solutions and Primary Standards (Anhydrous $Na_2CO_3$, Oxalic Acid)',
      'Titration Apparatus: Burette, Pipette, Conical Flask, and Indicator Selection',
      'The Concordant Titer Rule in WAEC Practical Chemistry (Within $\\pm 0.20\\text{ cm}^3$)',
      'The Universal Titration Formula: $\\frac{C_A V_A}{C_B V_B} = \\frac{n_A}{n_B}$',
      'Calculations of Molarity, Mass Concentration ($\\text{g dm}^{-3}$), and Percentage Purity'
    ],
    readingTimeMinutes: 17,
    summary: 'The principles of quantitative volumetric titration, indicator mechanics, recording concordant values, and multi-step stoichiometric molarity calculations.',
    contentMarkdown: `### 1. Standard Solutions & Titration Indicators

A **standard solution** is a solution of accurately known concentration. A **primary standard** must be obtainable in pure form, stable in air, non-hygroscopic, and possess a high molar mass to minimize weighing errors (e.g. anhydrous sodium trioxocarbonate(IV), $Na_2CO_3$).

| Titration Combination | Suitable Indicator | Color in Acid | Color at Endpoint | Color in Base |
|---|---|---|---|---|
| **Strong Acid vs. Strong Base** | Methyl Orange or Phenolphthalein | Pink (MO) / Colorless (Ph) | Orange / Pale Pink | Yellow (MO) / Magenta (Ph) |
| **Strong Acid vs. Weak Base** | **Methyl Orange** | Pink | **Orange** | Yellow |
| **Weak Acid vs. Strong Base** | **Phenolphthalein** | Colorless | **Pale Pink** | Magenta |
| **Weak Acid vs. Weak Base** | **None** (No sharp pH change at endpoint) | — | — | — |

---

### 2. The Universal Titration Formula

$$\\frac{C_A \\times V_A}{C_B \\times V_B} = \\frac{n_A}{n_B}$$

Where:
- $C_A, C_B$ = Concentration of acid and base in $\\text{mol dm}^{-3}$.
- $V_A, V_B$ = Volume of acid (titer) and base (pipette) in $\\text{cm}^3$.
- $n_A, n_B$ = Stoichiometric mole coefficients from balanced chemical equation.

#### Worked WAEC Examination Problem:
A solution containing $5.30\\text{ g dm}^{-3}$ of pure anhydrous $Na_2CO_3$ was used to titrate a solution of $HCl$. If $25.0\\text{ cm}^3$ of the base required an average titer of $24.50\\text{ cm}^3$ of acid:
1. Calculate the concentration of the base in $\\text{mol dm}^{-3}$.
2. Calculate the concentration of the acid in $\\text{mol dm}^{-3}$ and $\\text{g dm}^{-3}$.

**Step 1: Molar Mass of $Na_2CO_3$:**
$$M(Na_2CO_3) = (23 \\times 2) + 12 + (16 \\times 3) = 46 + 12 + 48 = 106\\text{ g mol}^{-1}$$
$$C_B = \\frac{\\text{Mass concentration}}{\\text{Molar mass}} = \\frac{5.30}{106} = 0.050\\text{ mol dm}^{-3}$$

**Step 2: Balanced Chemical Equation:**
$$2HCl(aq) + Na_2CO_3(aq) \\to 2NaCl(aq) + H_2O(l) + CO_2(g)$$
- Therefore, $n_A = 2$ and $n_B = 1$.

**Step 3: Calculate Acid Concentration ($C_A$):**
$$\\frac{C_A \\times 24.50}{0.050 \\times 25.0} = \\frac{2}{1}$$
$$C_A = \\frac{2 \\times 0.050 \\times 25.0}{24.50} = \\frac{2.50}{24.50} = 0.102\\text{ mol dm}^{-3}$$

**Step 4: Mass Concentration of Acid ($HCl$):**
$$M(HCl) = 1 + 35.5 = 36.5\\text{ g mol}^{-1}$$
$$\\text{Mass Concentration} = 0.102 \\times 36.5 = 3.72\\text{ g dm}^{-3}$$`,
    keyTakeaways: [
      'In WAEC practicals, concordant titers must agree within 0.20 cm3 of each other.',
      'Universal formula: (C_A * V_A) / (C_B * V_B) = n_A / n_B.',
      'Methyl orange is selected for strong acid-weak base titrations; phenolphthalein for weak acid-strong base.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 6: MID-TERM REVIEW & REDOX IDENTIFICATION
  // --------------------------------------------------------------------------
  {
    id: 'ss2-chem-t2-w6',
    associatedQuizId: 'waec-chem-ss2-redox-midterm',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Redox Reactions: Oxidation Numbers & Electron Transfer',
    subtopics: [
      'Four Historical Definitions of Oxidation and Reduction',
      'Rules for Assigning Oxidation Numbers to Atoms in Compounds and Polyatomic Ions',
      'Identifying Oxidizing and Reducing Agents in Complex Equations',
      'Balancing Half-Reactions in Acidic and Alkaline Media',
      'Standard Test Reagents for Oxidizing and Reducing Agents ($KMnO_4, K_2Cr_2O_7, SO_2$)'
    ],
    readingTimeMinutes: 15,
    summary: 'Rules for assigning oxidation numbers, electron transfer mechanisms, identifying redox reagents, and balancing redox equations.',
    contentMarkdown: `### 1. Evolution of Redox Definitions

| Concept | Oxygen Concept | Hydrogen Concept | Electron Transfer Concept | Oxidation Number Concept |
|---|---|---|---|---|
| **Oxidation** | Addition of Oxygen | Removal of Hydrogen | **Loss of Electrons (OIL)** | **Increase in Oxidation State** |
| **Reduction** | Removal of Oxygen | Addition of Hydrogen | **Gain of Electrons (RIG)** | **Decrease in Oxidation State** |
| **Oxidizing Agent** | Provides oxygen | Removes hydrogen | **Accepts electrons** (is reduced) | **Decreases its own oxidation state** |
| **Reducing Agent** | Removes oxygen | Provides hydrogen | **Donates electrons** (is oxidized) | **Increases its own oxidation state** |

---

### 2. Rules for Assigning Oxidation Numbers

1. The oxidation number of any uncombined element in its standard state is **zero** ($O_2, Fe, S_8, H_2 = 0$).
2. The oxidation number of a monoatomic ion equals its charge ($Fe^{3+} = +3, Cl^- = -1$).
3. Hydrogen is usually **$+1$** (except in metal hydrides like $NaH$ where it is **$-1$**).
4. Oxygen is usually **$-2$** (except in peroxides like $H_2O_2$ where it is **$-1$**, and in $OF_2$ where it is **$+2$**).
5. The algebraic sum of oxidation numbers in a neutral molecule is **zero**; in a polyatomic ion, it equals the **ionic charge**.

#### Worked Example: Find the oxidation state of Manganese in $KMnO_4$:
$$(+1) + Mn + 4(-2) = 0 \\implies 1 + Mn - 8 = 0 \\implies Mn = +7$$`,
    keyTakeaways: [
      'OIL RIG: Oxidation Is Loss of electrons; Reduction Is Gain of electrons.',
      'An oxidizing agent gets reduced; a reducing agent gets oxidized.',
      'Sum of oxidation numbers in a neutral compound equals zero.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 7: ELECTROCHEMISTRY I (GALVANIC & ELECTROLYTIC CELLS)
  // --------------------------------------------------------------------------
  {
    id: 'ss2-chem-t2-w7',
    associatedQuizId: 'waec-chem-ss2-galvanic-cells',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Electrochemistry I: Standard Electrode Potentials & The Daniell Cell',
    subtopics: [
      'The Electrochemical Series of Metals and Non-Metals',
      'The Standard Hydrogen Electrode (SHE: $E^\\circ = 0.00\\text{ V}$)',
      'Galvanic (Voltaic) Cells vs. Electrolytic Cells',
      'Anatomy of the Daniell Cell and Functions of the Salt Bridge',
      'Calculating Standard Cell Electromotive Force: $E_{\\text{cell}}^\\circ = E_{\\text{cathode}}^\\circ - E_{\\text{anode}}^\\circ$'
    ],
    readingTimeMinutes: 16,
    summary: 'The electrochemical series, measuring standard electrode potentials against SHE, galvanic cell thermodynamics, and the Daniell cell.',
    contentMarkdown: `### 1. Galvanic Cells vs. Electrolytic Cells

[Diagram: daniell-electrochemical-cell]

| Feature | Galvanic (Voltaic) Cell (e.g. Daniell Cell) | Electrolytic Cell (e.g. Down's Cell) |
|---|---|---|
| **Energy Conversion** | Converts **chemical energy into electrical energy** | Converts **electrical energy into chemical change** |
| **Spontaneity** | Spontaneous reaction ($\\Delta G < 0, E_{\\text{cell}}^\\circ > 0$) | Non-spontaneous reaction driven by external power supply |
| **Anode Polarity** | **Negative (-)** (Site of oxidation / electron release) | **Positive (+)** (Connected to positive battery terminal) |
| **Cathode Polarity** | **Positive (+)** (Site of reduction / electron uptake) | **Negative (-)** (Connected to negative battery terminal) |
| **Salt Bridge** | **Required** to maintain internal ionic neutrality | Not required (electrodes share single electrolyte bath) |

---

### 2. Standard Cell Potential Calculations

$$E_{\\text{cell}}^\\circ = E_{\\text{cathode}}^\\circ - E_{\\text{anode}}^\\circ = E_{\\text{reduction}}^\\circ - E_{\\text{oxidation}}^\\circ$$

#### Worked Example:
Given the standard reduction potentials:
- $Zn^{2+}(aq) + 2e^- \\rightleftharpoons Zn(s) \\quad E^\\circ = -0.76\\text{ V}$
- $Cu^{2+}(aq) + 2e^- \\rightleftharpoons Cu(s) \\quad E^\\circ = +0.34\\text{ V}$

1. **Identify Anode and Cathode:**
   - Copper has the higher reduction potential ($+0.34\\text{ V}$ vs $-0.76\\text{ V}$), so $Cu^{2+}$ is reduced at the **Cathode**.
   - Zinc is oxidized at the **Anode**.
2. **Calculate $E_{\\text{cell}}^\\circ$:**
   $$E_{\\text{cell}}^\\circ = (+0.34) - (-0.76) = +0.34 + 0.76 = +1.10\\text{ V}$$
3. **Standard Cell Notation:**
   $$Zn(s) \\mid Zn^{2+}(aq, 1\\text{ M}) \\parallel Cu^{2+}(aq, 1\\text{ M}) \\mid Cu(s)$$`,
    keyTakeaways: [
      'In all electrochemical cells, Oxidation occurs at the Anode (An Ox) and Reduction occurs at the Cathode (Red Cat).',
      'Electrons flow in the external circuit from anode (-) to cathode (+) in galvanic cells.',
      'A positive E_cell indicates a thermodynamically spontaneous reaction.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 8: ELECTROCHEMISTRY II (FARADAY'S LAWS OF ELECTROLYSIS)
  // --------------------------------------------------------------------------
  {
    id: 'ss2-chem-t2-w8',
    associatedQuizId: 'waec-chem-ss2-electrolysis-faraday',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Electrochemistry II: Faraday’s Laws of Electrolysis & Industrial Applications',
    subtopics: [
      'Electrolysis Principles: Electrolytes, Electrodes, and Preferential Discharge Rules',
      'Faraday’s First Law of Electrolysis: $m = Z Q = Z I t$',
      'Faraday’s Second Law of Electrolysis and the Faraday Constant ($1\\text{ F} = 96,500\\text{ C mol}^{-1}$)',
      'Calculations Involving Mass and Gas Volumes Deposited at Electrodes',
      'Industrial Applications: Extraction of Aluminium (Hall-Héroult) and Electroplating'
    ],
    readingTimeMinutes: 17,
    summary: 'Faraday’s quantitative laws of electrolysis, calculating masses and gas volumes liberated at electrodes, and industrial extraction of aluminium.',
    contentMarkdown: `### 1. Faraday's Laws of Electrolysis

1. **Faraday's First Law:** The mass ($m$) of an element discharged or deposited at an electrode during electrolysis is directly proportional to the quantity of electricity ($Q$) passed through the electrolyte:
   $$m \\propto Q \\implies m = ZIt \\quad (Q = It)$$
   Where $Z$ is the electrochemical equivalent of the substance ($\text{g C}^{-1}$).

2. **Faraday's Second Law:** When the same quantity of electricity is passed through different electrolytes, the masses of substances deposited are directly proportional to their chemical equivalent weights ($\\frac{\\text{Molar Mass}}{\\text{Valency}}$).
   - One Faraday ($1\\text{ F} = 96,500\\text{ Coulombs}$) corresponds to the electrical charge carried by one mole of electrons ($6.02 \\times 10^{23}\\text{ electrons}$).

---

### 2. Step-by-Step WAEC Electrolysis Calculation

**Problem:** A current of $2.50\\text{ Amperes}$ was passed through a solution of copper(II) sulfate ($CuSO_4$) for $1\\text{ hour } 20\\text{ minutes}$. Calculate the mass of copper deposited at the cathode. (Relative atomic mass of $Cu = 64$; $1\\text{ F} = 96,500\\text{ C}$).

1. **Calculate Quantity of Electricity ($Q$):**
   $$t = (1 \\times 3600) + (20 \\times 60) = 3600 + 1200 = 4,800\\text{ seconds}$$
   $$Q = I \\times t = 2.50 \\times 4,800 = 12,000\\text{ Coulombs}$$

2. **Write Cathode Half-Reaction:**
   $$Cu^{2+}(aq) + 2e^- \\to Cu(s)$$
   - Discharging $1\\text{ mole of } Cu$ ($64\\text{ g}$) requires $2\\text{ moles of electrons} = 2\\text{ F} = 2 \\times 96,500 = 193,000\\text{ Coulombs}$.

3. **Calculate Mass Deposited:**
   $$193,000\\text{ C} \\to 64\\text{ g of } Cu$$
   $$12,000\\text{ C} \\to \\frac{64 \\times 12,000}{193,000} = \\frac{768,000}{193,000} \\approx 3.98\\text{ grams}$$`,
    keyTakeaways: [
      'One Faraday (96,500 C) deposits 1 mole of a univalent ion, 0.5 mole of a divalent ion, and 0.33 mole of a trivalent ion.',
      'Time must always be converted to seconds in Q = I * t.',
      'Electroplating requires the object to be coated to be placed at the cathode.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 9: HYDROCARBONS (ALKANES, ALKENES, ALKYNES)
  // --------------------------------------------------------------------------
  {
    id: 'ss2-chem-t2-w9',
    associatedQuizId: 'waec-chem-ss2-hydrocarbons',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Organic Chemistry: Hydrocarbons (Alkanes, Alkenes & Alkynes)',
    subtopics: [
      'Uniqueness of Carbon: Catenation, Tetravalency, and Hybridization ($sp^3, sp^2, sp$)',
      'Homologous Series: General Formulas, Gradation in Physical Properties, and Functional Groups',
      'IUPAC Nomenclature for Branched Alkanes, Alkenes, and Alkynes',
      'Structural Isomerism: Chain and Positional Isomers',
      'Chemical Reactions: Substitution in Alkanes vs. Electrophilic Addition in Alkenes'
    ],
    readingTimeMinutes: 17,
    summary: 'The structural foundations of aliphatic hydrocarbons: IUPAC nomenclature, homologous series trends, structural isomerism, and substitution vs addition reactions.',
    contentMarkdown: `### 1. The Three Primary Aliphatic Homologous Series

Hydrocarbons are organic compounds composed exclusively of carbon and hydrogen atoms.

| Series | General Formula | Carbon-Carbon Bonding | Hybridization | Characteristic Chemical Reaction | Combustion Flame Appearance |
|---|---|---|---|---|---|
| **Alkanes (Paraffins)** | $C_n H_{2n+2}$ | Single covalent ($\sigma$) | $sp^3$ ($109.5^\\circ$) | **Substitution reactions** (e.g. halogenation in UV light) | Clean blue flame (complete combustion) |
| **Alkenes (Olefins)** | $C_n H_{2n}$ | Double bond ($1\\sigma + 1\\pi$) | $sp^2$ ($120^\\circ$) | **Electrophilic addition** (decolorizes bromine water) | Slightly luminous / smoky flame |
| **Alkynes (Acetylenes)**| $C_n H_{2n-2}$ | Triple bond ($1\\sigma + 2\\pi$) | $sp$ ($180^\\circ$) | **Electrophilic addition** (acidic hydrogen in terminal alkynes) | Highly luminous and intensely smoky flame |

---

### 2. Distinguishing Alkanes from Alkenes & Alkynes in the Laboratory

To differentiate between a saturated alkane (e.g. hexane) and an unsaturated alkene (e.g. hex-1-ene):

| Test Reagent | Observation with Alkane (Hexane) | Observation with Alkene (Hex-1-ene) | Chemical Principle |
|---|---|---|---|
| **Bromine Water ($Br_2/H_2O$) in darkness** | Reddish-brown color **persists** | Reddish-brown color **immediately decolorizes** | Addition across $C=C$ double bond forming 1,2-dibromohexane |
| **Acidified Potassium Permanganate ($KMnO_4/H^+$)** | Purple color **persists** | Purple solution **decolorizes** rapidly | Baeyer’s test: oxidation of alkene to a diol |

---

### 3. Structural Isomerism
**Isomers** are compounds sharing the identical molecular formula but possessing different structural arrangements.
- For butane ($C_4H_{10}$), two structural isomers exist:
  1. **n-Butane:** $CH_3-CH_2-CH_2-CH_3$
  2. **2-Methylpropane (Isobutane):** $CH_3-CH(CH_3)-CH_3$`,
    keyTakeaways: [
      'Carbon achieves molecular diversity through catenation and tetravalency.',
      'Alkenes rapidly decolorize bromine water and acidified KMnO4; alkanes do not in the dark.',
      'Structural isomers have the same molecular formula but different structural formulas.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 10: ALKANOLS & ALKANOIC ACIDS
  // --------------------------------------------------------------------------
  {
    id: 'ss2-chem-t2-w10',
    associatedQuizId: 'waec-chem-ss2-alkanols-esters',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Oxygen Derivatives: Alkanols, Alkanoic Acids & Esterification',
    subtopics: [
      'Classification of Alkanols: Primary ($1^\\circ$), Secondary ($2^\\circ$), and Tertiary ($3^\\circ$)',
      'Industrial Production of Ethanol: Fermentation of Carbohydrates (Cassava/Molasses)',
      'Oxidation of Alkanols: From Primary Alcohols to Aldehydes and Carboxylic Acids',
      'Esterification: Reaction between Carboxylic Acids and Alcohols (Sweet Fruity Odors)',
      'Saponification: Alkaline Hydrolysis of Fats and Oils to Produce Soap and Glycerol'
    ],
    readingTimeMinutes: 16,
    summary: 'The chemistry of alcohols, industrial ethanol fermentation, controlled oxidation pathways, esterification synthesis, and saponification for soap manufacture.',
    contentMarkdown: `### 1. Classification & Oxidation of Alkanols

Alkanols contain the hydroxyl functional group ($-OH$).

| Class | Structural Definition | Example | Oxidation Outcome (with Acidified $K_2Cr_2O_7$) |
|---|---|---|---|
| **Primary ($1^\\circ$)** | $-OH$ group attached to a carbon bonded to $\\le 1$ other carbon | Ethanol ($CH_3CH_2OH$) | Oxidized first to an **Alkanal (Aldehyde)**, then to an **Alkanoic Acid** |
| **Secondary ($2^\\circ$)**| $-OH$ group attached to a carbon bonded to 2 other carbons | Propan-2-ol ($CH_3CH(OH)CH_3$) | Oxidized to an **Alkanone (Ketone)** |
| **Tertiary ($3^\\circ$)** | $-OH$ group attached to a carbon bonded to 3 other carbons | 2-Methylpropan-2-ol ($(CH_3)_3COH$)| **Resistant to oxidation** under normal conditions |

---

### 2. Esterification vs. Saponification

#### 1. Esterification:
The reversible condensation reaction between an alkanoic acid and an alkanol catalyzed by concentrated sulfuric acid ($H_2SO_4$):

$$\\text{Alkanoic Acid} + \\text{Alkanol} \\xrightleftharpoons[\\Delta]{\\text{Conc. } H_2SO_4} \\text{Ester} + \\text{Water}$$
$$CH_3COOH + C_2H_5OH \\rightleftharpoons CH_3COOC_2H_5 + H_2O$$
- **Product:** Ethyl ethanoate, characterized by a distinct sweet, pleasant, fruity fragrance used in artificial flavorings and perfumes.

#### 2. Saponification (Soap Making):
The alkaline hydrolysis of natural fats/oils (glyceryl esters of fatty acids like palm oil) with concentrated alkali ($NaOH$ or $KOH$):

$$\\text{Fat / Oil (Triglyceride)} + 3NaOH \\to \\text{Soap (Sodium Salt of Fatty Acid)} + \\text{Glycerol (Propan-1,2,3-triol)}$$
- Common salt ($NaCl$) is added to **salt out** (precipitate) the solid soap from solution.`,
    keyTakeaways: [
      'Primary alcohols oxidize to aldehydes then carboxylic acids; secondary alcohols oxidize to ketones; tertiary alcohols resist oxidation.',
      'Esterification produces sweet-smelling esters using concentrated H2SO4 as catalyst and dehydrating agent.',
      'Saponification hydrolyzes triglycerides using alkali (NaOH for hard bar soaps, KOH for soft liquid soaps).'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 11: PETROLEUM & REFINING FRACTIONS
  // --------------------------------------------------------------------------
  {
    id: 'ss2-chem-t2-w11',
    associatedQuizId: 'waec-chem-ss2-petroleum-cracking',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Petroleum Chemistry: Fractional Distillation, Cracking & Octane Rating',
    subtopics: [
      'Origin and Composition of Nigerian Bonny Light Crude Oil',
      'Fractional Distillation of Petroleum: Boiling Point Gradients and Key Fractions',
      'Thermal Cracking vs. Catalytic Cracking of Heavy Petroleum Fractions',
      'Octane Number of Petrol: 2,2,4-Trimethylpentane (100) vs. Heptane (0)',
      'Anti-Knock Agents and Petrochemical Feedstocks'
    ],
    readingTimeMinutes: 15,
    summary: 'Crude oil refining via fractional distillation, chemical cracking methods for gasoline yield enhancement, and the chemistry of fuel octane ratings.',
    contentMarkdown: `### 1. Petroleum Fractional Distillation Fractions

[Diagram: distillation-apparatus]

Crude oil is a complex mixture of hundreds of hydrocarbons separated by continuous **fractional distillation** based on boiling point differences.

| Fraction | Carbon Chain Length | Boiling Point Range | Primary Uses in Society |
|---|---|---|---|
| **Refinery Gas** | $C_1 - C_4$ | $< 20^\\circ\\text{C}$ | Domestic cooking gas (LPG), bottled butane |
| **Petrol (Gasoline)** | $C_5 - C_{10}$ | $40 - 180^\\circ\\text{C}$ | Motor fuel for internal combustion automobile engines |
| **Kerosene (Paraffin)** | $C_{11} - C_{15}$ | $180 - 250^\\circ\\text{C}$ | Aviation jet fuel (Jet A-1), domestic lighting and stoves |
| **Diesel Oil (Gas Oil)** | $C_{16} - C_{20}$ | $250 - 350^\\circ\\text{C}$ | Heavy transport engines (trucks, buses, generators) |
| **Lubricating Oils & Wax**| $C_{21} - C_{30}$ | $350 - 450^\\circ\\text{C}$ | Engine motor oil, vaseline, candle wax |
| **Bitumen (Asphalt)** | $> C_{30}$ | Non-volatile residue | Road surfacing, roofing waterproofing |

---

### 2. Cracking & Reforming of Hydrocarbons

- **Cracking:** The thermal or catalytic breakdown of heavy, long-chain hydrocarbons with low commercial demand into smaller, high-demand fractions (petrol) and unsaturated alkenes for plastics:
  $$C_{16}H_{34} \\xrightarrow[500^\\circ\\text{C}]{\\text{Zeolite}} C_8H_{18} (\\text{Octane}) + 4C_2H_4 (\\text{Ethene})$$
- **Octane Number:** A numerical scale ($0 - 100$) measuring the anti-knocking resistance of motor petrol.
  - **Iso-octane (2,2,4-trimethylpentane)** burns smoothly without engine knocking: **Octane rating = 100**.
  - **n-Heptane** causes violent pre-ignition knocking: **Octane rating = 0**.`,
    keyTakeaways: [
      'Fractional distillation separates crude oil components based on differences in boiling points.',
      'Cracking converts long-chain heavy petroleum fractions into shorter, high-demand gasoline hydrocarbons.',
      'Octane rating measures resistance to engine knocking; highly branched alkanes possess high octane numbers.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 12: QUALITATIVE ANALYSIS & TERMINAL REVISION
  // --------------------------------------------------------------------------
  {
    id: 'ss2-chem-t2-w12',
    associatedQuizId: 'waec-chem-ss2-qualitative-analysis',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 12,
    topicTitle: 'Qualitative Inorganic Analysis: Cation and Anion Identification',
    subtopics: [
      'Systematic Confirmation of Cations ($Fe^{2+}, Fe^{3+}, Cu^{2+}, Pb^{2+}, Al^{3+}, Zn^{2+}, Ca^{2+}, NH_4^+$)',
      'Reactions with Aqueous Sodium Hydroxide ($NaOH$) and Aqueous Ammonia ($NH_3$)',
      'Systematic Confirmation of Anions ($CO_3^{2-}, SO_4^{2-}, SO_3^{2-}, Cl^-, NO_3^-$)',
      'Confirmatory Gas Tests: $H_2, O_2, CO_2, NH_3, SO_2, Cl_2, NO_2$',
      'Flame Test Colors of Alkali and Alkaline Earth Metals'
    ],
    readingTimeMinutes: 17,
    summary: 'Systematic qualitative chemical analysis: distinguishing common metal cations with bench reagents, confirmatory anion tests, and identifying evolved laboratory gases.',
    contentMarkdown: `### 1. Systematic Identification of Cations with $NaOH$ and $NH_3$

| Cation | Action with Drops of $NaOH(aq)$ | Action with Excess $NaOH(aq)$ | Action with Drops of $NH_3(aq)$ | Action with Excess $NH_3(aq)$ |
|---|---|---|---|---|
| **$Cu^{2+}$** | Light blue gelatinous precipitate | Insoluble | Light blue precipitate | **Dissolves to form deep royal blue solution** |
| **$Fe^{2+}$** | **Dirty green precipitate** | Insoluble | Dirty green precipitate | Insoluble (turns brown at surface on air exposure) |
| **$Fe^{3+}$** | **Reddish-brown precipitate** | Insoluble | Reddish-brown precipitate | Insoluble |
| **$Al^{3+}$** | White gelatinous precipitate | **Dissolves to form colorless solution** | White gelatinous precipitate | **Insoluble in excess $NH_3$** |
| **$Zn^{2+}$** | White gelatinous precipitate | **Dissolves to form colorless solution** | White gelatinous precipitate | **Dissolves to form colorless solution** |
| **$Pb^{2+}$** | White precipitate | **Dissolves in excess $NaOH$** | White precipitate | **Insoluble in excess $NH_3$** (Confirmed with $KI$: bright yellow $PbI_2$) |
| **$Ca^{2+}$** | White precipitate | Insoluble (or slightly soluble) | **No precipitate formed** | No precipitate |
| **$NH_4^+$** | No precipitate; on warming evolves $NH_3$ gas | — | — | — |

---

### 2. Systematic Confirmatory Tests for Anions

| Anion | Test Procedure | Observation | Confirmatory Chemical Reaction |
|---|---|---|---|
| **$CO_3^{2-}$ (Carbonate)** | Add dilute $HCl$ or $HNO_3$ | Vigorous effervescence of colorless, odorless gas which **turns lime water milky** | $CO_3^{2-} + 2H^+ \\to H_2O + CO_2 \\uparrow$ |
| **$SO_4^{2-}$ (Sulfate)** | Add dilute $HCl$, then aqueous $BaCl_2$ | **Dense white precipitate** insoluble in excess dilute acid | $Ba^{2+} + SO_4^{2-} \\to BaSO_4(s)$ |
| **$Cl^-$ (Chloride)** | Add dilute $HNO_3$, then aqueous $AgNO_3$ | **White curdy precipitate** which **dissolves readily in aqueous ammonia** | $Ag^+ + Cl^- \\to AgCl(s)$ |
| **$NO_3^-$ (Nitrate)** | Brown ring test: add fresh $FeSO_4$, then conc. $H_2SO_4$ slowly down tube wall | A distinct **brown ring** forms at junction of two liquid layers | Nitrosyl complex $[Fe(H_2O)_5(NO)]^{2+}$ forms |`,
    keyTakeaways: [
      'Al3+, Zn2+, and Pb2+ are amphoteric and dissolve in excess NaOH; but only Zn2+ dissolves in excess NH3.',
      'Sulfate is confirmed by a dense white precipitate with BaCl2 that resists acid dissolution.',
      'Chloride yields a white AgCl precipitate with AgNO3 that dissolves in aqueous ammonia.'
    ]
  }
];
