import { CurriculumTopic } from '../types';

export const SS1_CHEMISTRY_TOPICS: CurriculumTopic[] = [
  // ==========================================
  // WEEK 1: CHEMICAL REACTIONS & EQUATIONS
  // ==========================================
  {
    id: 'chem-ss1-term2-week1',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Chemical Reactions, Chemical Equations & Balancing',
    subtopics: [
      'Physical vs. Chemical Changes',
      'Law of Conservation of Mass',
      'Types of Chemical Reactions',
      'Step-by-Step Equation Balancing & State Symbols'
    ],
    readingTimeMinutes: 7,
    summary: 'Master the distinction between physical and chemical transformations, classify reactions, and balance chemical equations with state symbols per WAEC standards.',
    contentMarkdown: `### 1. Physical vs. Chemical Changes

Every change in matter is classified based on whether new chemical species are formed and whether energy changes are reversible:

| Property | Physical Change | Chemical Change |
| :--- | :--- | :--- |
| **New Substance** | No new substance formed | Brand new substance(s) with distinct properties |
| **Reversibility** | Easily reversible by physical means | Irreversible or reversible only by chemical reactions |
| **Mass Change** | No change in total composition mass | Apparent change in sample mass (gas lost/gained) |
| **Energy Change** | Small heat change (latent heat of state) | Substantial heat change (exothermic or endothermic) |
| **Examples** | Melting ice, dissolving sugar in water, magnetizing iron | Rusting of iron, burning magnesium, curdling of milk |

---

### 2. The Law of Conservation of Mass

Formulated by Antoine Lavoisier (1789), the **Law of Conservation of Mass** states:
> *Matter can neither be created nor destroyed in the course of a chemical reaction, but can only be transformed from one form to another.*

Therefore, the total mass of reactants must strictly equal the total mass of products, which requires that **the number of atoms of each element on the left side (reactants) must equal the number of atoms on the right side (products)**.

$$\\sum \\text{Mass of Reactants} = \\sum \\text{Mass of Products}$$

---

### 3. Four Core Classes of Chemical Reactions

| Reaction Class | General Formula | Practical Laboratory Example |
| :--- | :--- | :--- |
| **Combination (Synthesis)** | $A + B \\rightarrow AB$ | $2\\text{Mg}_{(s)} + \\text{O}_{2(g)} \\rightarrow 2\\text{MgO}_{(s)}$ (Burning Mg ribbon) |
| **Decomposition** | $AB \\rightarrow A + B$ | $2\\text{KClO}_{3(s)} \\xrightarrow{\\text{MnO}_2, \\Delta} 2\\text{KCl}_{(s)} + 3\\text{O}_{2(g)}$ |
| **Single Displacement** | $A + BC \\rightarrow AC + B$ | $\\text{Zn}_{(s)} + 2\\text{HCl}_{(aq)} \\rightarrow \\text{ZnCl}_{2(aq)} + \\text{H}_{2(g)}$ |
| **Double Decomposition (Metathesis)** | $AB + CD \\rightarrow AD + CB$ | $\\text{AgNO}_{3(aq)} + \\text{NaCl}_{(aq)} \\rightarrow \\text{AgCl}_{(s)}\\downarrow + \\text{NaNO}_{3(aq)}$ |

---

### 4. Balancing Chemical Equations: Step-by-Step Protocol

Always include the four mandatory **state symbols**:
- $(s)$: Solid
- $(l)$: Pure liquid (e.g., pure $\\text{H}_2\\text{O}$)
- $(g)$: Gas
- $(aq)$: Aqueous solution (dissolved in water)

#### Worked Example: Complete Combustion of Propane ($\\text{C}_3\\text{H}_8$)
1. **Unbalanced Skeletal Equation**:
   $$\\text{C}_3\\text{H}_{8(g)} + \\text{O}_{2(g)} \\rightarrow \\text{CO}_{2(g)} + \\text{H}_2\\text{O}_{(g)}$$
2. **Balance Carbon atoms**: Reactants have 3 carbons; place coefficient **3** in front of $\\text{CO}_2$:
   $$\\text{C}_3\\text{H}_{8(g)} + \\text{O}_{2(g)} \\rightarrow 3\\text{CO}_{2(g)} + \\text{H}_2\\text{O}_{(g)}$$
3. **Balance Hydrogen atoms**: Reactants have 8 hydrogens; place coefficient **4** in front of $\\text{H}_2\\text{O}$:
   $$\\text{C}_3\\text{H}_{8(g)} + \\text{O}_{2(g)} \\rightarrow 3\\text{CO}_{2(g)} + 4\\text{H}_2\\text{O}_{(g)}$$
4. **Balance Oxygen atoms**: Products have $(3 \\times 2) + (4 \\times 1) = 10$ oxygen atoms. Divide by 2: coefficient **5** for $\\text{O}_2$:
   $$1\\text{C}_3\\text{H}_{8(g)} + 5\\text{O}_{2(g)} \\rightarrow 3\\text{CO}_{2(g)} + 4\\text{H}_2\\text{O}_{(g)}$$
5. **Verify Atom Count**: $\\text{C: } 3 = 3$, $\\text{H: } 8 = 8$, $\\text{O: } 10 = 10$. Fully balanced!

---

### 5. WAEC Checkpoint Practice Questions

- **Question 1**: What are the stoichiometric coefficients $w, x, y, z$ for the balanced reaction: $w\\text{Fe}_{(s)} + x\\text{H}_2\\text{O}_{(g)} \\rightarrow y\\text{Fe}_3\\text{O}_{4(s)} + z\\text{H}_{2(g)}$?
  - A) 1, 4, 1, 4
  - B) 3, 4, 1, 4 (*Correct — $3\\text{Fe} + 4\\text{H}_2\\text{O} \\rightarrow \\text{Fe}_3\\text{O}_4 + 4\\text{H}_2$*)
  - C) 3, 2, 1, 2
  - D) 2, 3, 1, 3
- **Question 2**: Which of the following is a physical change?
  - A) Dissolving sodium chloride in distilled water (*Correct — evaporating the water recovers pure solid NaCl unaltered*)
  - B) Fermentation of palm wine into ethanol
  - C) Rusting of an iron nail in moist air
  - D) Addition of dilute hydrochloric acid to marble chips`,
    keyTakeaways: [
      'Physical changes form no new chemical species and are easily reversed; chemical changes produce new bonds and substances.',
      'Law of Conservation of Mass dictates that atoms are neither created nor destroyed during chemical reactions.',
      'Never change molecular subscripts when balancing; adjust only stoichiometric coefficients.'
    ],
    associatedQuizId: 'waec-chemistry-ss1-q1'
  },

  // ==========================================
  // WEEK 2: KINETIC THEORY & GAS LAWS
  // ==========================================
  {
    id: 'chem-ss1-term2-week2',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Kinetic Theory of Matter & Quantitative Gas Laws',
    subtopics: [
      'Postulates of the Kinetic Molecular Theory',
      "Boyle's Law, Charles's Law & Gay-Lussac's Law",
      'General & Ideal Gas Equations (PV = nRT)',
      "Dalton's Law of Partial Pressures & Vapor Correction"
    ],
    readingTimeMinutes: 8,
    summary: 'Explore molecular motion across matter states and calculate pressure, temperature, and volume changes using fundamental gas laws.',
    contentMarkdown: `### 1. Postulates of Kinetic Molecular Theory of Gases

1. **Point Masses**: Gas molecules are tiny particles separated by vast distances; the actual volume of the molecules is negligible compared to the total gas container volume.
2. **Continuous Random Motion**: Gas particles move rapidly in straight lines in all directions, colliding with each other and container walls.
3. **Elastic Collisions**: Collisions are perfectly elastic; no kinetic energy is lost upon impact.
4. **No Intermolecular Forces**: Under ideal conditions, gas particles exert zero attractive or repulsive forces upon one another.
5. **Absolute Temperature Proportionality**: Average kinetic energy of gas molecules is directly proportional to absolute temperature in Kelvin ($E_k \\propto T$).

$$T(\\text{K}) = \\theta(^{\\circ}\\text{C}) + 273.15$$

---

### 2. Summary of the Fundamental Gas Laws

| Gas Law | Constant Variables | Mathematical Equation | Graphical Relationship |
| :--- | :--- | :--- | :--- |
| **Boyle's Law** | Temperature ($T$), moles ($n$) | $P_1 V_1 = P_2 V_2$ | Hyperbola of $P$ vs. $V$; straight line of $P$ vs. $1/V$ |
| **Charles's Law** | Pressure ($P$), moles ($n$) | $\\frac{V_1}{T_1} = \\frac{V_2}{T_2}$ | Straight line passing through absolute zero ($-273^{\\circ}\\text{C}$) |
| **Gay-Lussac's Law** | Volume ($V$), moles ($n$) | $\\frac{P_1}{T_1} = \\frac{P_2}{T_2}$ | Linear increase of pressure with temperature |
| **General Gas Law** | Moles ($n$) | $\\frac{P_1 V_1}{T_1} = \\frac{P_2 V_2}{T_2}$ | Combined variable behavior |
| **Ideal Gas Equation** | Gas constant ($R$) | $P V = n R T$ | $R = 0.0821\\,\\text{dm}^3\\cdot\\text{atm}/(\\text{mol}\\cdot\\text{K})$ or $8.314\\,\\text{J}/(\\text{mol}\\cdot\\text{K})$ |

---

### 3. Dalton's Law of Partial Pressures

> *In a mixture of non-reacting gases, the total pressure exerted is the sum of the partial pressures that each individual gas would exert if it alone occupied the entire volume.*

$$P_{\\text{total}} = P_A + P_B + P_C + \\dots$$

#### Aqueous Tension Correction (Gas Collected Over Water)
When a gas like $\\text{H}_2$ or $\\text{O}_2$ is collected over water in the lab, it becomes saturated with water vapor. To obtain the pressure of the pure dry gas:

$$P_{\\text{dry gas}} = P_{\\text{total (barometric)}} - P_{\\text{water vapor (aqueous tension)}}$$

---

### 4. Worked Problem: General Gas Equation Calculation
**Problem**: A sample of nitrogen gas occupies $450\\,\\text{cm}^3$ at $27^{\\circ}\\text{C}$ and $740\\,\\text{mmHg}$. Calculate its volume at Standard Temperature and Pressure (s.t.p.: $0^{\\circ}\\text{C} = 273\\,\\text{K}$, $760\\,\\text{mmHg}$).

1. **Extract Data**:
   - $P_1 = 740\\,\\text{mmHg}$, $V_1 = 450\\,\\text{cm}^3$, $T_1 = 27 + 273 = 300\\,\\text{K}$
   - $P_2 = 760\\,\\text{mmHg}$, $V_2 = ?$, $T_2 = 0 + 273 = 273\\,\\text{K}$
2. **Apply General Gas Equation**:
   $$V_2 = \\frac{P_1 V_1 T_2}{P_2 T_1} = \\frac{740 \\times 450 \\times 273}{760 \\times 300}$$
3. **Calculate**:
   $$V_2 = \\frac{90,909,000}{228,000} \\approx 398.72\\,\\text{cm}^3$$

---

### 5. WAEC Checkpoint Practice Questions

- **Question 1**: At constant pressure, the volume of a given mass of gas is doubled. If the initial temperature was $127^{\\circ}\\text{C}$, what is the final temperature in $^{\\circ}\\text{C}$?
  - A) $254^{\\circ}\\text{C}$
  - B) $527^{\\circ}\\text{C}$ (*Correct — $T_1 = 400\\text{K}$; $V_2 = 2V_1 \\implies T_2 = 800\\text{K} = 800 - 273 = 527^{\\circ}\\text{C}$*)
  - C) $600^{\\circ}\\text{C}$
  - D) $800^{\\circ}\\text{C}$
- **Question 2**: Oxygen gas collected over water at $25^{\\circ}\\text{C}$ has a total pressure of $755\\,\\text{mmHg}$. If saturated water vapor pressure is $24\\,\\text{mmHg}$, find the pressure of dry oxygen:
  - A) $779\\,\\text{mmHg}$
  - B) $731\\,\\text{mmHg}$ (*Correct — $P_{\\text{dry}} = 755 - 24 = 731\\,\\text{mmHg}$*)
  - C) $755\\,\\text{mmHg}$
  - D) $377.5\\,\\text{mmHg}$`,
    keyTakeaways: [
      'All temperatures in gas law calculations must strictly be converted to Kelvin (K = °C + 273).',
      'At s.t.p., standard temperature is 273 K (0°C) and standard pressure is 760 mmHg (1 atm / 101,325 Pa).',
      'Gas collected over water requires subtracting aqueous tension to obtain dry gas pressure.'
    ],
    associatedQuizId: 'waec-chemistry-ss1-q2'
  },

  // ==========================================
  // WEEK 3: SEPARATION TECHNIQUES FOR MIXTURES
  // ==========================================
  {
    id: 'chem-ss1-term2-week3',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Separation Techniques for Mixtures & Chromatography',
    subtopics: [
      'Separation of Insoluble & Soluble Solids',
      'Fractional Distillation vs Simple Distillation',
      'Separating Funnel for Immiscible Liquids',
      'Paper Chromatography & Retention Factor (Rf) Calculations'
    ],
    readingTimeMinutes: 8,
    summary: 'Master laboratory techniques for purifying matter based on physical properties including boiling points, solubility, and phase partition.',
    contentMarkdown: `### 1. Classification of Separation Techniques

Every separation method exploits a specific difference in **physical properties** between components:

| Mixture Type | Physical Property Difference | Technique Employed | Nigerian / Practical Example |
| :--- | :--- | :--- | :--- |
| **Solid + Insoluble Liquid** | Particle size vs pore size | Filtration / Decantation | Purifying muddy water with filter paper |
| **Solid + Soluble Liquid** | Boiling point / Volatility | Evaporation to Dryness / Crystallization | Recovering table salt ($NaCl$) from sea water |
| **Two Miscible Liquids** | Close boiling points ($<25^{\\circ}\\text{C}$) | Fractional Distillation | Refining Nigerian crude oil / separating ethanol & water |
| **Two Immiscible Liquids** | Densities (do not mix) | Separating Funnel | Separating kerosene and water / palm oil & brine |
| **Sublimable + Non-sublimable** | Sublimation capability | Sublimation | Separating ammonium chloride ($NH_4Cl$) from $NaCl$ |
| **Soluble Pigments / Dyes** | Differential adsorption & solubility | Paper Chromatography | Analyzing food colorants, black ink, leaf chlorophyll |

---

### 2. Liebig Distillation Apparatus

In distillation, a liquid is converted into vapor by heating, and the vapor is condensed back into liquid by cooling in a **Liebig condenser**.

[Diagram: distillation-apparatus]

#### Critical WAEC Practical Laboratory Setup Rules:
1. **Boiling Chips (Porous Pot)**: Added to the distilling flask to promote smooth boiling and prevent violent bumping.
2. **Thermometer Bulb Position**: Must be positioned exactly opposite the side-arm opening leading to the condenser, ensuring it measures the true temperature of the exiting vapor.
3. **Counter-Current Cooling Water**: Cold water enters the condenser jacket through the **lower inlet** and leaves through the **upper outlet**. This prevents air locks and ensures the condensing tube is coolest at the exit tip.

---

### 3. Ascending Paper Chromatography

Chromatography separates mixtures based on the relative partition between a stationary phase (chromatography paper) and a mobile phase (solvent).

[Diagram: paper-chromatography]

#### Calculating Retention Factor ($R_f$):
$$R_f = \\frac{\\text{Distance traveled by solute spot } (d_{\\text{solute}})}{\\text{Distance traveled by solvent front } (d_{\\text{solvent}})}$$

- The value of $R_f$ is always between **$0$ and $1.0$** and has **no units**.
- Substances with greater solubility in the mobile phase travel further ($R_f \\approx 1.0$).
- Substances with higher affinity for the cellulose fibers move slowly ($R_f \\approx 0.1 - 0.3$).

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: A mixture of sodium chloride and ammonium chloride can best be separated by:
  - A) Simple distillation
  - B) Sublimation (*Correct — $NH_4Cl$ sublimes into vapor upon heating, leaving solid $NaCl$ behind*)
  - C) Using a separating funnel
  - D) Paper chromatography
- **Question 2**: In paper chromatography, the pencil line on which the sample is spotted must be positioned:
  - A) At the exact bottom of the solvent reservoir
  - B) Above the solvent level (*Correct — prevents sample from dissolving directly into the solvent pool*)
  - C) Submerged 2 cm into the solvent
  - D) Along the top edge of the paper`,
    keyTakeaways: [
      'Fractional distillation uses a fractionating column packed with glass beads to separate miscible liquids with close boiling points.',
      'In a Liebig condenser, cooling water must enter at the bottom and exit at the top.',
      'Rf values are dimensionless ratios ranging between 0 and 1.0; a pencil line is used for the origin because graphite is insoluble.'
    ],
    associatedQuizId: 'waec-chemistry-ss1-q3'
  },

  // ==========================================
  // WEEK 4: ATOMIC STRUCTURE & CONFIGURATION
  // ==========================================
  {
    id: 'chem-ss1-term2-week4',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Atomic Structure, Quantum Orbitals & Electronic Configuration',
    subtopics: [
      'Subatomic Particles: Protons, Neutrons & Electrons',
      'Atomic Number (Z), Mass Number (A) & Isotopy',
      'Bohr Model & The 2n² Shell Capacity Rule',
      'Aufbau Principle, Hund’s Rule & Pauli Exclusion Principle'
    ],
    readingTimeMinutes: 8,
    summary: 'Delve into the internal anatomy of atoms, electron energy levels, and write standard s, p, d, f electron configurations for elements 1 to 20.',
    contentMarkdown: `### 1. Fundamental Subatomic Particles

All neutral atoms consist of a dense positive nucleus surrounded by negative electrons:

| Particle | Relative Mass (amu) | Relative Charge | Location in Atom | Discovered By |
| :--- | :--- | :--- | :--- | :--- |
| **Proton ($p^+$)** | $1.0073 \\approx 1$ | $+1$ | Inside the nucleus | Ernest Rutherford (1919) |
| **Neutron ($n^0$)** | $1.0087 \\approx 1$ | $0$ (Neutral) | Inside the nucleus | James Chadwick (1932) |
| **Electron ($e^-$)** | $\\frac{1}{1840} \\approx 0.00055$ | $-1$ | Energy shells around nucleus | J.J. Thomson (1897) |

$$\\text{Mass Number } (A) = \\text{Protons } (Z) + \\text{Neutrons } (n)$$
$$\\text{Neutrons } (n) = A - Z$$

---

### 2. Isotopes and Relative Atomic Mass ($A_r$)

**Isotopy** is the phenomenon where atoms of the same chemical element have the same atomic number ($Z$) but different mass numbers ($A$) due to different numbers of neutrons.

#### Worked Example: Chlorine Isotopes
Chlorine exists naturally as $75\\%$ $^{35}_{17}\\text{Cl}$ and $25\\%$ $^{37}_{17}\\text{Cl}$. Calculate its Relative Atomic Mass ($A_r$):
$$A_r = \\frac{(35 \\times 75) + (37 \\times 25)}{100} = \\frac{2625 + 925}{100} = \\frac{3550}{100} = 35.5$$

---

### 3. Bohr Model of the Atom

Electrons orbit the central nucleus in concentric, quantized energy levels designated by principal quantum number $n = 1, 2, 3, 4$ (or shells $K, L, M, N$).

[Diagram: bohr-atomic-model]

#### Maximum Electron Shell Capacity:
$$\\text{Max Electrons} = 2n^2$$
- $K\\text{-shell } (n = 1): 2(1)^2 = 2\\text{ electrons}$
- $L\\text{-shell } (n = 2): 2(2)^2 = 8\\text{ electrons}$
- $M\\text{-shell } (n = 3): 2(3)^2 = 18\\text{ electrons}$
- $N\\text{-shell } (n = 4): 2(4)^2 = 32\\text{ electrons}$

---

### 4. Electronic Configurations of the First 20 Elements

| Element | Symbol | Atomic Number ($Z$) | Shell Notation | s, p, d, f Orbital Notation |
| :--- | :--- | :--- | :--- | :--- |
| **Hydrogen** | $\\text{H}$ | 1 | 1 | $1s^1$ |
| **Helium** | $\\text{He}$ | 2 | 2 | $1s^2$ |
| **Lithium** | $\\text{Li}$ | 3 | 2, 1 | $1s^2\\,2s^1$ |
| **Carbon** | $\\text{C}$ | 6 | 2, 4 | $1s^2\\,2s^2\\,2p^2$ |
| **Nitrogen** | $\\text{N}$ | 7 | 2, 5 | $1s^2\\,2s^2\\,2p^3$ |
| **Oxygen** | $\\text{O}$ | 8 | 2, 6 | $1s^2\\,2s^2\\,2p^4$ |
| **Sodium** | $\\text{Na}$ | 11 | 2, 8, 1 | $1s^2\\,2s^2\\,2p^6\\,3s^1$ |
| **Aluminium** | $\\text{Al}$ | 13 | 2, 8, 3 | $1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^1$ |
| **Chlorine** | $\\text{Cl}$ | 17 | 2, 8, 7 | $1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^5$ |
| **Potassium** | $\\text{K}$ | 19 | 2, 8, 8, 1 | $1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^6\\,4s^1$ |
| **Calcium** | $\\text{Ca}$ | 20 | 2, 8, 8, 2 | $1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^6\\,4s^2$ |

*Note on Aufbau Order: The $4s$ subshell is filled before the $3d$ subshell because $4s$ possesses a lower energy level ($n+l = 4+0=4$) than $3d$ ($n+l = 3+2=5$).*

---

### 5. WAEC Checkpoint Practice Questions

- **Question 1**: An isotope $^{56}_{26}\\text{Fe}^{3+}$ contains how many protons, neutrons, and electrons?
  - A) 26 protons, 30 neutrons, 26 electrons
  - B) 26 protons, 30 neutrons, 23 electrons (*Correct — $p=26, n=56-26=30, e=26-3=23$*)
  - C) 23 protons, 30 neutrons, 26 electrons
  - D) 26 protons, 56 neutrons, 23 electrons
- **Question 2**: Which rule states that electrons fill degenerate orbitals singly with parallel spins before pairing occurs?
  - A) Pauli's Exclusion Principle
  - B) Hund's Rule of Maximum Multiplicity (*Correct*)
  - C) Aufbau Principle
  - D) Heisenberg's Uncertainty Principle`,
    keyTakeaways: [
      'Protons and neutrons reside in the nucleus; electrons orbit in quantized energy shells.',
      'Valence electrons in the outermost shell determine the group number and chemical valency.',
      'The 4s orbital fills before 3d because it possesses lower energy.'
    ],
    associatedQuizId: 'waec-chemistry-ss1-q4'
  },

  // ==========================================
  // WEEK 5: THE PERIODIC TABLE & TRENDS
  // ==========================================
  {
    id: 'chem-ss1-term2-week5',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'The Periodic Table & Periodic Property Trends',
    subtopics: [
      'Modern Periodic Law & Table Architecture',
      'Groups (1 to 8/0) & Periods (1 to 7)',
      'Periodic Trends: Atomic Radius & Ionic Radius',
      'Ionization Energy, Electronegativity & Electron Affinity'
    ],
    readingTimeMinutes: 8,
    summary: 'Discover the architectural logic of the modern periodic table and predict physical and chemical property trends across periods and down groups.',
    contentMarkdown: `### 1. Modern Periodic Law

Formulated after Henry Moseley's 1913 X-ray spectroscopy experiments:
> *The physical and chemical properties of elements are periodic functions of their **atomic numbers** ($Z$).*

The modern table is organized into:
- **7 Horizontal Periods**: Corresponds to the number of occupied electron shells ($n$).
- **8 Main Groups (Columns)**: Corresponds to the number of valence electrons in the outermost shell.
- **4 Orbital Blocks**: $s\\text{-block}$ (Groups 1–2), $p\\text{-block}$ (Groups 3–8), $d\\text{-block}$ (Transition Metals), $f\\text{-block}$ (Lanthanides & Actinides).

---

### 2. Systematic Periodic Trends Across Periods & Groups

[Diagram: periodic-table-trends]

| Periodic Property | Across a Period (Left $\\rightarrow$ Right) | Reason (Period) | Down a Group (Top $\\rightarrow$ Bottom) | Reason (Group) |
| :--- | :--- | :--- | :--- | :--- |
| **Atomic Radius** | **Decreases** | Nuclear charge ($Z$) increases while electrons enter the same shell, pulling electrons closer | **Increases** | An entire new electron shell is added, moving outer electrons further away |
| **Ionization Energy** | **Increases** | Higher effective nuclear charge and smaller radius bind outer electrons tightly | **Decreases** | Increased atomic size and inner-shell electron shielding make valence electrons easier to lose |
| **Electronegativity** | **Increases** | Stronger attraction of smaller atom for bonded electron pairs (Fluorine is highest: 4.0) | **Decreases** | Bonded pair is further from nucleus and shielded by intervening shells |
| **Electron Affinity** | **Generally Increases** | Smaller atomic radius attracts incoming electrons more exothermically | **Decreases** | Larger atom has weaker pull on an extra electron |
| **Metallic Character** | **Decreases** | Elements transition from easily losing electrons (metals) to gaining electrons (non-metals) | **Increases** | Ionization energy drops, making electron loss easier |

---

### 3. Comparison of Ions: Cations vs Anions

- **Cations ($M^{n+}$)** are always **smaller** than their parent neutral atoms because loss of electrons increases effective nuclear pull and often removes the entire outermost shell:
  $$\\text{Radius of } \\text{Na}^+ (0.095\\,\\text{nm}) < \\text{Radius of } \\text{Na } (0.157\\,\\text{nm})$$
- **Anions ($X^{n-}$)** are always **larger** than their parent neutral atoms because electron-electron repulsion in the valence shell increases, expanding the electron cloud:
  $$\\text{Radius of } \\text{Cl}^- (0.181\\,\\text{nm}) > \\text{Radius of } \\text{Cl } (0.099\\,\\text{nm})$$

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: Which of the following elements has the highest first ionization energy?
  - A) Sodium (Na)
  - B) Magnesium (Mg)
  - C) Chlorine (Cl)
  - D) Helium (He) (*Correct — helium has a duplet core, zero shielding, and extreme nuclear pull*)
- **Question 2**: Across Period 3 from Sodium to Chlorine, atomic radius decreases because:
  - A) Additional shells are added
  - B) Nuclear charge increases while screening remains constant (*Correct*)
  - C) Number of neutrons decreases
  - D) Atmospheric pressure increases`,
    keyTakeaways: [
      'Atomic radius decreases across a period (increasing nuclear pull) and increases down a group (extra shells).',
      'Ionization energy and electronegativity peak at the top right of the table (Fluorine / Noble gases).',
      'Cations are smaller than their parent atoms; anions are larger than their parent atoms.'
    ],
    associatedQuizId: 'waec-chemistry-ss1-q5'
  },

  // ==========================================
  // WEEK 6: CHEMICAL BONDING (IONIC & COVALENT)
  // ==========================================
  {
    id: 'chem-ss1-term2-week6',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Chemical Bonding: Electrovalent (Ionic) & Covalent Bonds',
    subtopics: [
      'The Octet & Duplet Rules of Chemical Stability',
      'Electrovalent Bonding via Electron Transfer',
      'Covalent Bonding via Shared Electron Pairs (Single, Double, Triple)',
      'Coordinate (Dative) Covalent Bonding & Compound Properties'
    ],
    readingTimeMinutes: 8,
    summary: 'Master the fundamental forces holding compounds together, comparing electron transfer and orbital sharing with Lewis dot-and-cross structures.',
    contentMarkdown: `### 1. The Driving Force of Chemical Bonding

Atoms react to attain the stable noble gas electronic configuration with either:
- **Duplet of electrons** in the first shell ($1s^2$, like Helium)
- **Octet of electrons** in the outermost valence shell ($ns^2\\,np^6$, like Neon or Argon)

---

### 2. Ionic vs Covalent Bonding Architecture

[Diagram: ionic-covalent-bonding]

1. **Electrovalent (Ionic) Bonding**:
   - Occurs between a **metal** (low electronegativity) and a **non-metal** (high electronegativity).
   - Involves **complete transfer** of one or more valence electrons from metal to non-metal, forming positive cations and negative anions.
   - Held together in a 3D giant crystal lattice by strong, non-directional **electrostatic forces of attraction**.

2. **Covalent Bonding**:
   - Occurs between two **non-metal atoms** with similar electronegativities.
   - Involves **mutual sharing** of electron pairs so each atom achieves an octet.
   - Types:
     - Single bond: 1 shared pair (e.g., $\\text{H}-\\text{H}$, $\\text{Cl}-\\text{Cl}$, $\\text{H}-\\text{O}-\\text{H}$)
     - Double bond: 2 shared pairs (e.g., $\\text{O}=\\text{O}$, $\\text{O}=\\text{C}=\\text{O}$)
     - Triple bond: 3 shared pairs (e.g., $\\text{N}\\equiv\\text{N}$)

---

### 3. Coordinate (Dative) Covalent Bonding

A **dative bond** is a special type of covalent bond where **both electrons in the shared pair are contributed by only one of the participating atoms** (the donor atom containing a lone pair).

#### Classic WAEC Examples:
1. **Ammonium Ion ($\\text{NH}_4^+$)**:
   $$\\text{NH}_{3} + \\text{H}^+ \\rightarrow [\\text{NH}_4]^+$$
   The lone pair on nitrogen is donated into the vacant $1s$ orbital of the proton ($\\text{H}^+$).
2. **Hydroxonium Ion ($\\text{H}_3\\text{O}^+$)**:
   $$\\text{H}_2\\text{O} + \\text{H}^+ \\rightarrow [\\text{H}_3\\text{O}]^+$$

---

### 4. Comparison Matrix: Ionic vs Covalent Compounds

| Characteristic Property | Electrovalent (Ionic) Compounds | Covalent (Molecular) Compounds |
| :--- | :--- | :--- |
| **Particles Present** | Discrete positive and negative ions ($Na^+, Cl^-$) | Neutral discrete molecules ($H_2O, CH_4$) |
| **Physical State at Room Temp** | Crystalline hard solids with high density | Gases, volatile liquids, or low-melting solids |
| **Melting & Boiling Points** | **Very High** (massive energy needed to break giant lattice) | **Low to Moderate** (weak intermolecular forces) |
| **Volatility** | Non-volatile, odorless | Frequently volatile with characteristic odors |
| **Solubility in Water** | Highly soluble in polar solvents (water) | Generally insoluble in water, soluble in organic solvents |
| **Electrical Conductivity** | Conducts when **molten or dissolved in water** (free mobile ions); insulator as solid | **Non-conductors** in all states (no free ions or mobile electrons) |

---

### 5. WAEC Checkpoint Practice Questions

- **Question 1**: Which of the following compounds contains both ionic and covalent bonds?
  - A) Sodium chloride ($\\text{NaCl}$)
  - B) Methane ($\\text{CH}_4$)
  - C) Ammonium chloride ($\\text{NH}_4\\text{Cl}$) (*Correct — ionic between $\\text{NH}_4^+$ and $\\text{Cl}^-$; covalent & dative inside $\\text{NH}_4^+$*)
  - D) Tetrachloromethane ($\\text{CCl}_4$)
- **Question 2**: Solid sodium chloride does not conduct electricity because:
  - A) It is a non-polar compound
  - B) Its ions are rigidly locked in fixed positions in the crystal lattice (*Correct*)
  - C) It contains covalent bonds
  - D) Electrons move too rapidly`,
    keyTakeaways: [
      'Ionic bonds involve complete electron transfer; covalent bonds involve shared electron pairs.',
      'Coordinate (dative) bonds form when one atom donates both electrons in the shared bonding pair.',
      'Ionic compounds conduct electricity only when molten or aqueous because ions become mobile.'
    ],
    associatedQuizId: 'waec-chemistry-ss1-q6'
  },

  // ==========================================
  // WEEK 7: METALLIC BONDING & INTERMOLECULAR FORCES
  // ==========================================
  {
    id: 'chem-ss1-term2-week7',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Metallic Bonding & Intermolecular Secondary Forces',
    subtopics: [
      'The "Electron Sea" Model of Metallic Bonding',
      'Malleability, Ductility & Thermal/Electrical Conductivity',
      'Van der Waals Forces & Dipole-Dipole Attractions',
      'Hydrogen Bonding & Anomalous Properties of Water'
    ],
    readingTimeMinutes: 7,
    summary: 'Analyze the delocalized electron model in metals and explain secondary intermolecular attractions that govern boiling points and water anomalies.',
    contentMarkdown: `### 1. Metallic Bonding: The Electron Sea Model

A metal lattice consists of a regular array of **positive metal cations** immersed in a **delocalized "sea" of mobile valence electrons**.

$$\\text{Metallic Bond} = \\text{Electrostatic attraction between positive cations and mobile delocalized electrons}$$

#### Physical Properties Explained by Metallic Bonding:
1. **Electrical Conductivity**: Under an applied potential difference, the mobile delocalized electrons flow freely through the lattice toward the positive terminal.
2. **Thermal Conductivity**: Vigorous vibrations of metal ions and rapid kinetic transfer by free electrons transmit heat quickly.
3. **Malleability (hammered into sheets) & Ductility (drawn into wires)**: Layers of metal cations can slide over each other without breaking the bond, as the flexible electron cloud immediately cushions the sliding layers.
4. **Metallic Luster**: Delocalized electrons absorb and immediately re-radiate incident light photons.

---

### 2. Intermolecular Secondary Forces

While ionic, covalent, and metallic bonds are strong **intramolecular forces** ($200 - 800\\,\\text{kJ/mol}$), weak attractions exist between independent molecules:

| Force Class | Nature of Attraction | Relative Strength | Example Compounds |
| :--- | :--- | :--- | :--- |
| **London Dispersion Forces** | Temporary induced dipoles caused by momentary uneven electron distributions | Weakest ($0.5 - 5\\,\\text{kJ/mol}$) | Noble gases ($He, Ne$), non-polar diatomic gases ($O_2, N_2, CH_4$) |
| **Dipole-Dipole Interactions** | Electrostatic pull between permanent positive and negative molecular poles | Moderate ($5 - 20\\,\\text{kJ/mol}$) | Polar molecules like $HCl, H_2S, SO_2$ |
| **Hydrogen Bonding** | Strong dipole attraction between $H$ bonded to $F, O,$ or $N$ and a lone pair on adjacent electronegative atom | Strongest secondary force ($10 - 40\\,\\text{kJ/mol}$) | Water ($H_2O$), Hydrogen fluoride ($HF$), Ammonia ($NH_3$), DNA base pairs |

---

### 3. The Anomalous Properties of Water Due to Hydrogen Bonding

Water exhibits unique physical anomalies compared to other Group 6 hydrides ($H_2S, H_2Se, H_2Te$):
1. **Unusually High Boiling Point ($100^{\\circ}\\text{C}$)**: Despite its low molar mass ($18\\,\\text{g/mol}$), liquid water forms an extensive 3D network of hydrogen bonds requiring massive thermal energy to vaporize.
2. **High Specific Heat Capacity ($4.184\\,\\text{J}/(\\text{g}\\cdot^{\\circ}\\text{C})$)**: Enables the oceans and human blood to resist rapid temperature fluctuations.
3. **Maximum Density at $4^{\\circ}\\text{C}$**: As water freezes below $4^{\\circ}\\text{C}$, hydrogen bonds lock into an open hexagonal crystalline lattice (ice). Ice is therefore less dense than liquid water, floating on surface rivers and insulating aquatic organisms below during freezing winters.

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: Why does water ($H_2O$, molar mass 18) boil at $100^{\\circ}\\text{C}$ while hydrogen sulfide ($H_2S$, molar mass 34) is a gas at room temperature?
  - A) Water has higher molecular mass
  - B) Intermolecular hydrogen bonding exists between water molecules (*Correct*)
  - C) Covalent bonds in $H_2S$ are stronger than in water
  - D) Water contains mobile ions
- **Question 2**: The property of metals that allows them to be drawn into thin wires without fracturing is termed:
  - A) Malleability
  - B) Ductility (*Correct*)
  - C) Sonorousness
  - D) Viscosity`,
    keyTakeaways: [
      'Metals consist of positive ions in a delocalized electron cloud, explaining conductivity and ductility.',
      'Hydrogen bonding occurs only when hydrogen is covalently bonded to highly electronegative atoms (F, O, N).',
      'Hydrogen bonding causes water to expand upon freezing, reaching its maximum density at 4°C.'
    ],
    associatedQuizId: 'waec-chemistry-ss1-q7'
  },

  // ==========================================
  // WEEK 8: ACIDS, BASES, AND SALTS
  // ==========================================
  {
    id: 'chem-ss1-term2-week8',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Acids, Bases, Indicators & Preparation of Salts',
    subtopics: [
      'Arrhenius vs. Brønsted-Lowry Theories',
      'Strong vs. Weak Acids/Bases & The pH Scale',
      'Color Changes of Standard Acid-Base Indicators',
      'Methods of Preparing Soluble and Insoluble Salts'
    ],
    readingTimeMinutes: 8,
    summary: 'Master proton transfer theories, pH logarithmic calculations, indicator transitions, and laboratory protocols for synthesizing salts.',
    contentMarkdown: `### 1. Acid-Base Theories

1. **Arrhenius Theory**:
   - **Acid**: A substance that produces hydrogen ions ($H^+$ or $H_3O^+$) as the only positive ions in aqueous solution:
     $$\\text{HCl}_{(aq)} \\rightarrow \\text{H}^+_{(aq)} + \\text{Cl}^-_{(aq)}$$
   - **Base**: A substance that produces hydroxide ions ($OH^-$) as the only negative ions in aqueous solution:
     $$\\text{NaOH}_{(aq)} \\rightarrow \\text{Na}^+_{(aq)} + \\text{OH}^-_{(aq)}$$

2. **Brønsted-Lowry Theory**:
   - **Acid**: A **proton ($H^+$) donor**.
   - **Base**: A **proton ($H^+$) acceptor**.

---

### 2. The pH Scale & Logarithmic Acidity

$$\\text{pH} = -\\log_{10}[\\text{H}^+]$$
$$\\text{pOH} = -\\log_{10}[\\text{OH}^-]$$
$$\\text{pH} + \\text{pOH} = 14 \\quad (\\text{at } 25^{\\circ}\\text{C})$$

- $\\text{pH} < 7$: Acidic solution ($[H^+] > 10^{-7}\\,\\text{mol/dm}^3$)
- $\\text{pH} = 7$: Neutral distilled water ($[H^+] = [OH^-] = 10^{-7}\\,\\text{mol/dm}^3$)
- $\\text{pH} > 7$: Alkaline solution ($[H^+] < 10^{-7}\\,\\text{mol/dm}^3$)

---

### 3. Acid-Base Indicators & Color Transitions

| Indicator | Color in Acidic Medium | Color at Neutral Point | Color in Alkaline Medium | Suitable Titration Type |
| :--- | :--- | :--- | :--- | :--- |
| **Litmus Paper** | **Red** | Purple | **Blue** | General testing |
| **Methyl Orange** | **Pink / Red** | Orange ($pH \\approx 3.7$) | **Yellow** | Strong Acid vs. Weak Base (e.g., $HCl$ vs $Na_2CO_3$) |
| **Phenolphthalein** | **Colorless** | Faint Pink ($pH \\approx 8.3$) | **Magenta / Deep Pink** | Weak Acid vs. Strong Base (e.g., $CH_3COOH$ vs $NaOH$) |

---

### 4. Preparation of Salts

A salt is an ionic compound formed when the replaceable hydrogen ions of an acid are completely or partially replaced by a metal or ammonium ion.

| Salt Category | General Preparation Method | Chemical Reaction Equation |
| :--- | :--- | :--- |
| **Soluble Salt** | Acid + Reactive Metal | $\\text{Zn}_{(s)} + \\text{H}_2\\text{SO}_{4(aq)} \\rightarrow \\text{ZnSO}_{4(aq)} + \\text{H}_{2(g)}$ |
| **Soluble Salt** | Acid + Insoluble Base | $\\text{CuO}_{(s)} + \\text{H}_2\\text{SO}_{4(aq)} \\rightarrow \\text{CuSO}_{4(aq)} + \\text{H}_2\\text{O}_{(l)}$ |
| **Soluble Salt** | Acid + Insoluble Carbonate | $\\text{CaCO}_{3(s)} + 2\\text{HCl}_{(aq)} \\rightarrow \\text{CaCl}_{2(aq)} + \\text{H}_2\\text{O}_{(l)} + \\text{CO}_{2(g)}$ |
| **Soluble Salt** | Acid + Soluble Alkali (Titration) | $\\text{HCl}_{(aq)} + \\text{NaOH}_{(aq)} \\rightarrow \\text{NaCl}_{(aq)} + \\text{H}_2\\text{O}_{(l)}$ |
| **Insoluble Salt** | Double Decomposition (Precipitation) | $\\text{BaCl}_{2(aq)} + \\text{Na}_2\\text{SO}_{4(aq)} \\rightarrow \\text{BaSO}_{4(s)}\\downarrow + 2\\text{NaCl}_{(aq)}$ |

---

### 5. Water of Crystallization & Behavior in Air
- **Efflorescence**: Crystalline salt loses water of crystallization to atmosphere upon exposure (e.g., washing soda $\\text{Na}_2\\text{CO}_3\\cdot 10\\text{H}_2\\text{O} \\rightarrow \\text{Na}_2\\text{CO}_3\\cdot \\text{H}_2\\text{O}$).
- **Deliquescence**: Salt absorbs moisture from air and dissolves to form a concentrated solution (e.g., anhydrous $\\text{CaCl}_2$, $\\text{FeCl}_3$, solid $\\text{NaOH}$).
- **Hygroscopy**: Substance absorbs moisture from air without forming a solution; used as a drying agent (e.g., concentrated $\\text{H}_2\\text{SO}_4$, quicklime $\\text{CaO}$).

---

### 6. WAEC Checkpoint Practice Questions

- **Question 1**: What is the pH of a $0.001\\,\\text{mol/dm}^3$ aqueous solution of hydrochloric acid ($HCl$)?
  - A) 1
  - B) 3 (*Correct — $[H^+] = 10^{-3}$, so $\\text{pH} = -\\log_{10}(10^{-3}) = 3$*)
  - C) 7
  - D) 11
- **Question 2**: Which drying agent is suitable for drying ammonia gas ($NH_3$)?
  - A) Concentrated $\\text{H}_2\\text{SO}_4$ (Reacts to form $(NH_4)_2SO_4$)
  - B) Quicklime ($\\text{CaO}$) (*Correct — basic oxide, does not react with basic ammonia*)
  - C) Anhydrous calcium chloride (Forms complex $CaCl_2\\cdot 8NH_3$)
  - D) Phosphorus(V) oxide (Reacts)`,
    keyTakeaways: [
      'Acids donate protons (H+); bases accept protons. pH = -log[H+].',
      'Methyl orange is yellow in base and red in acid; phenolphthalein is pink in base and colorless in acid.',
      'Insoluble salts (e.g. BaSO4, AgCl, PbSO4) are prepared by ionic precipitation (double decomposition).'
    ],
    associatedQuizId: 'waec-chemistry-ss1-q8'
  },

  // ==========================================
  // WEEK 9: CARBON & ITS ALLOTROPES
  // ==========================================
  {
    id: 'chem-ss1-term2-week9',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Carbon & Its Allotropes: Diamond, Graphite & Coal',
    subtopics: [
      'Allotropy in Carbon: Definition & Taxonomy',
      'Diamond: Giant Tetrahedral sp³ Architecture',
      'Graphite: Planar Hexagonal sp² Layers & Electrical Conductivity',
      'Coal Types & Industrial Destructive Distillation'
    ],
    readingTimeMinutes: 7,
    summary: 'Analyze the allotropes of carbon, comparing why diamond is an extreme electrical insulator while graphite conducts electricity efficiently.',
    contentMarkdown: `### 1. The Phenomenon of Allotropy

**Allotropy** is the ability of an element to exist in two or more different physical forms in the same physical state, having different physical properties but identical chemical reactions.

Carbon allotropes are categorized into:
- **Crystalline Allotropes**: Diamond, Graphite, Fullerenes (Buckyballs $C_{60}$).
- **Amorphous (Non-crystalline) Allotropes**: Coal, Charcoal, Lampblack, Carbon black, Coke.

---

### 2. Comprehensive Comparison: Diamond vs. Graphite

| Property | Diamond | Graphite |
| :--- | :--- | :--- |
| **Hybridization** | $sp^3$ hybridization | $sp^2$ hybridization |
| **Structural Geometry** | Rigid 3D **tetrahedral network** of carbon atoms | **Planar hexagonal rings** arranged in flat parallel layers |
| **Bond Lengths & Forces** | All $C-C$ bonds are strong single covalent ($0.154\\,\\text{nm}$) | Strong in-plane covalent ($0.142\\,\\text{nm}$); weak **Van der Waals forces** between layers ($0.335\\,\\text{nm}$) |
| **Hardness** | **Hardest natural substance known** (Mohs hardness 10) | **Soft and slippery** (layers easily slide over each other) |
| **Density** | $3.51\\,\\text{g/cm}^3$ | $2.25\\,\\text{g/cm}^3$ |
| **Electrical Conductivity** | **Non-conductor (Insulator)** — all 4 valence electrons localized in bonds | **Good electrical conductor** — each carbon has 1 free delocalized electron ($\\pi$-electron cloud) |
| **Optical Properties** | High refractive index ($2.42$), gives brilliant sparkle | Opaque, black-grey metallic sheen |
| **Industrial Uses** | Glass cutting, rock drill bits, abrasive grinding, jewelry | Dry lubricant for heavy machinery, pencil leads, electrodes in electrolysis |

---

### 3. Destructive Distillation of Coal

When bituminous coal is heated strongly in the **absence of air**, it decomposes into four valuable industrial fractions:

1. **Coal Gas ($50\\%\\,H_2, 30\\%\\,CH_4, 10\\%\\,CO$)**: Used as industrial domestic fuel.
2. **Ammoniacal Liquor**: Dissolved in sulfuric acid to manufacture **ammonium sulfate** fertilizer:
   $$2\\text{NH}_{3(aq)} + \\text{H}_2\\text{SO}_{4(aq)} \\rightarrow (\\text{NH}_4)_2\\text{SO}_{4(s)}$$
3. **Coal Tar**: Viscous black liquid fractional distilled into benzene, toluene, naphthalene, and pitch (for road surfacing).
4. **Coke ($90 - 95\\%\\,\\text{Carbon}$)**: Solid residue used as a reducing agent in blast furnaces to extract iron.

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: Graphite is used as an industrial lubricant in high-temperature machinery because:
  - A) It is an allotrope of carbon
  - B) Its hexagonal layers are held by weak Van der Waals forces that slide easily (*Correct*)
  - C) It conducts electricity
  - D) It reacts with oxygen
- **Question 2**: Which carbon allotrope has each carbon atom bonded tetrahedrally to four other carbon atoms?
  - A) Graphite
  - B) Diamond (*Correct — giant 3D covalent tetrahedral $sp^3$ array*)
  - C) Graphene
  - D) Amorphous coal`,
    keyTakeaways: [
      'Diamond has an sp3 tetrahedral lattice; every electron is localized, making it the hardest natural insulator.',
      'Graphite has an sp2 planar hexagonal lattice with delocalized pi electrons, making it a soft conductor and lubricant.',
      'Destructive distillation of coal yields coke, coal tar, ammoniacal liquor, and coal gas.'
    ],
    associatedQuizId: 'waec-chemistry-ss1-q9'
  },

  // ==========================================
  // WEEK 10: STOICHIOMETRY & THE MOLE CONCEPT
  // ==========================================
  {
    id: 'chem-ss1-term2-week10',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Chemical Stoichiometry, Molar Volumes & Empirical Formulas',
    subtopics: [
      'The Mole & Avogadro’s Constant (6.022 × 10²³)',
      'Molar Volume of Gases at S.T.P. (22.4 dm³)',
      'Percentage Composition by Mass',
      'Step-by-Step Empirical & Molecular Formula Calculations'
    ],
    readingTimeMinutes: 9,
    summary: 'Master quantitative chemical calculations connecting mass, particles, gas volume at standard temperature and pressure, and empirical formulas.',
    contentMarkdown: `### 1. The Mole & Avogadro's Number

A **mole** is the amount of substance containing the same number of elementary entities (atoms, molecules, or ions) as there are atoms in exactly $12.000\\,\\text{g}$ of carbon-12.

$$\\text{Avogadro's Constant } (N_A) = 6.022 \\times 10^{23}\\,\\text{particles/mol}$$

#### Essential Stoichiometric Formulas:
| Target Quantity | Formula | Units |
| :--- | :--- | :--- |
| **Number of Moles ($n$)** | $n = \\frac{\\text{Mass in grams } (m)}{\\text{Molar Mass } (M)}$ | $\\text{mol}$ |
| **Number of Particles ($N$)** | $N = n \\times N_A = n \\times (6.022 \\times 10^{23})$ | Atoms, molecules, ions |
| **Volume of Gas at s.t.p. ($V$)** | $V = n \\times 22.4\\,\\text{dm}^3$ (or $n \\times 22,400\\,\\text{cm}^3$) | $\\text{dm}^3$ or $\\text{cm}^3$ |
| **Molar Concentration ($C$)** | $C = \\frac{n}{V\\,(\\text{dm}^3)} = \\frac{m}{M \\times V}$ | $\\text{mol/dm}^3$ (Molarity) |

---

### 2. Empirical Formula vs. Molecular Formula

- **Empirical Formula**: The simplest whole-number ratio of atoms of each element in a compound.
- **Molecular Formula**: The true, actual number of atoms of each element in one molecule of the compound.

$$\\text{Molecular Formula} = (\\text{Empirical Formula})_n$$
$$n = \\frac{\\text{Relative Molar Mass}}{\\text{Empirical Formula Mass}}$$

---

### 3. Step-by-Step Worked Problem: Empirical & Molecular Formula

**Problem**: A hydrocarbon contains $85.7\\%$ Carbon and $14.3\\%$ Hydrogen by mass. If its relative molecular mass ($M_r$) is $56$, find its empirical and molecular formulas ($C = 12, H = 1$).

#### Step 1: Divide percentage mass by atomic mass to find mole ratio:
$$\\text{Moles of C} = \\frac{85.7}{12} = 7.14\\,\\text{mol}$$
$$\\text{Moles of H} = \\frac{14.3}{1} = 14.3\\,\\text{mol}$$

#### Step 2: Divide by the smallest mole value ($7.14$):
$$\\text{Ratio of C} = \\frac{7.14}{7.14} = 1$$
$$\\text{Ratio of H} = \\frac{14.3}{7.14} = 2.00 \\approx 2$$

$$\\mathbf{\\text{Empirical Formula}} = \\mathbf{\\text{CH}_2}$$

#### Step 3: Determine molecular formula:
$$\\text{Mass of Empirical Unit } (\\text{CH}_2) = 12 + 2(1) = 14$$
$$n = \\frac{M_r}{\\text{Empirical Mass}} = \\frac{56}{14} = 4$$
$$\\mathbf{\\text{Molecular Formula}} = (\\text{CH}_2)_4 = \\mathbf{\\text{C}_4\\text{H}_8} \\quad (\\text{Butene})$$

---

### 4. Worked Stoichiometric Reaction Problem

**Problem**: Calculate the volume of carbon dioxide gas measured at s.t.p. produced by the thermal decomposition of $10.0\\,\\text{g}$ of pure calcium carbonate ($\\text{CaCO}_3$). ($Ca=40, C=12, O=16$).

1. **Balanced Chemical Equation**:
   $$\\text{CaCO}_{3(s)} \\xrightarrow{\\Delta} \\text{CaO}_{(s)} + \\text{CO}_{2(g)}$$
2. **Molar Mass of $\\text{CaCO}_3$**:
   $$M = 40 + 12 + 3(16) = 100\\,\\text{g/mol}$$
3. **Calculate Moles of Reactant**:
   $$n = \\frac{10.0\\,\\text{g}}{100\\,\\text{g/mol}} = 0.10\\,\\text{mol of } \\text{CaCO}_3$$
4. **Use Mole Ratio**:
   $1\\,\\text{mol } \\text{CaCO}_3 \\rightarrow 1\\,\\text{mol } \\text{CO}_2 \\implies 0.10\\,\\text{mol } \\text{CO}_2$ produced.
5. **Convert to Volume at s.t.p.**:
   $$V = 0.10 \\times 22.4\\,\\text{dm}^3 = 2.24\\,\\text{dm}^3 \\quad (\\text{or } 2,240\\,\\text{cm}^3)$$

---

### 5. WAEC Checkpoint Practice Questions

- **Question 1**: How many molecules are present in $4.4\\,\\text{g}$ of carbon dioxide gas ($\\text{CO}_2$)? ($C=12, O=16, N_A=6.022 \\times 10^{23}$)
  - A) $6.022 \\times 10^{23}$
  - B) $6.022 \\times 10^{22}$ (*Correct — $M=44\\text{g/mol}$; $n = 4.4/44 = 0.1\\text{mol}$; $N = 0.1 \\times 6.022 \\times 10^{23} = 6.022 \\times 10^{22}$*)
  - C) $3.011 \\times 10^{23}$
  - D) $1.204 \\times 10^{24}$
- **Question 2**: One mole of any gas at standard temperature and pressure (s.t.p.) occupies a volume of:
  - A) $11.2\\,\\text{dm}^3$
  - B) $22.4\\,\\text{dm}^3$ (*Correct*)
  - C) $24.0\\,\\text{dm}^3$ (Room temperature $25^{\\circ}\\text{C}$)
  - D) $224\\,\\text{dm}^3$`,
    keyTakeaways: [
      '1 mole = 6.022 × 10²³ particles = molar mass in grams.',
      '1 mole of any gas at s.t.p. occupies exactly 22.4 dm³ (22,400 cm³).',
      'The empirical formula gives the simplest ratio; the molecular formula is a whole-number multiple of the empirical formula.'
    ],
    associatedQuizId: 'waec-chemistry-ss1-q10'
  },

  // ==========================================
  // WEEK 11: LABORATORY APPARATUS & SAFETY
  // ==========================================
  {
    id: 'chem-ss1-term2-week11',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Standard Laboratory Apparatus, Bunsen Flame & Safety Rules',
    subtopics: [
      'Functions of Standard Volumetric Glassware',
      'Bunsen Burner Anatomy & Luminous vs. Non-Luminous Flames',
      'Thermal Zones & Combustion Chemistry',
      'Hazard Warning Symbols & Safe Laboratory Practices'
    ],
    readingTimeMinutes: 7,
    summary: 'Survey indispensable chemistry glassware, master the combustion chemistry of the Bunsen burner, and adhere to WAEC practical safety protocols.',
    contentMarkdown: `### 1. Essential Laboratory Glassware & Their Functions

| Laboratory Apparatus | Primary Scientific Function | WAEC Practical Precision / Rule |
| :--- | :--- | :--- |
| **Burette ($50\\,\\text{cm}^3$)** | Delivers variable, highly precise liquid volumes during titrations | Read bottom of meniscus at eye level (accurate to $\\pm 0.05\\,\\text{cm}^3$) |
| **Pipette ($20\\,\\text{cm}^3$ or $25\\,\\text{cm}^3$)** | Delivers fixed, exact liquid volumes into titration flask | Never blow last drop out; calibrated for retention at jet tip |
| **Volumetric Flask** | Prepares standard solutions of known accurate concentration | Calibrated to single etched graduation mark on narrow neck at $20^{\\circ}\\text{C}$ |
| **Conical Flask** | Reaction vessel for titrations | Sloping sides allow vigorous swirling without splashing contents |
| **Gas Jar & Cover Plate** | Collects gases by downward displacement of air or over water | Ground-glass rim lubricated with petroleum jelly for airtight seal |
| **Desiccator** | Keeps hygroscopic substances moisture-free while cooling | Contains drying agent like silica gel or anhydrous calcium chloride |

---

### 2. Bunsen Burner Flame Anatomy

Invented by Robert Bunsen in 1855, the burner operates by mixing coal gas / methane with air admitted through an adjustable collar.

[Diagram: bunsen-burner-flame]

#### Detailed Comparison of Flame Types:
| Feature | Non-Luminous Flame (Heating Flame) | Luminous Flame (Safety Flame) |
| :--- | :--- | :--- |
| **Air-Hole State** | **Fully Open** | **Completely Closed** |
| **Gas Combustion** | **Complete** ($CH_4 + 2O_2 \\rightarrow CO_2 + 2H_2O$) | **Incomplete** ($CH_4 + O_2 \\rightarrow C + CO + 2H_2O$) |
| **Color & Appearance** | Pale blue / purple; roaring sound; steady | Bright yellow; quiet; wavy and flicker-prone |
| **Temperature** | **Extremely Hot** (tip reaches $\\approx 1500^{\\circ}\\text{C}$) | **Much Cooler** (reaches $\\approx 500 - 700^{\\circ}\\text{C}$) |
| **Soot Formation** | **Zero soot** (does not blacken apparatus) | **Heavy black soot** (unburnt incandescent carbon particles) |
| **Use in Lab** | Used for all boiling, heating, and evaporating | Left idling as a visible safety indicator to prevent burns |

---

### 3. Hazard Symbols & Laboratory Safety Protocols

1. **Flammable**: Keep away from open flames and sparks (e.g., ethanol, diethyl ether, petroleum).
2. **Corrosive**: Burns skin and dissolves clothing (e.g., concentrated $H_2SO_4$, glacial ethanoic acid, $NaOH$ pellets).
3. **Toxic / Poisonous**: Inhalation or ingestion is fatal (e.g., potassium cyanide $KCN$, mercury salts).
4. **Oxidizing**: Releases oxygen, intensifying nearby fires (e.g., $KClO_3, KMnO_4, H_2O_2$).

#### Cardinal Golden Rules of Chemistry Practical:
- **Always add acid to water slowly with stirring**, NEVER add water to concentrated acid (the violent heat of hydration causes boiling acid to splash explosively).
- Never taste or smell any chemical directly; gently **waft vapors** toward your nose with a cupped hand.
- Point test tube openings away from yourself and lab partners when heating.

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: Which zone of the non-luminous Bunsen burner flame is the hottest?
  - A) The inner dark unburnt cone
  - B) The tip of the outer pale blue cone (*Correct — complete oxidation zone reaching up to $1500^{\\circ}\\text{C}$*)
  - C) The middle reducing cone
  - D) The base of the chimney
- **Question 2**: When preparing a dilute solution of sulfuric acid from concentrated acid, the correct procedure is:
  - A) Pour concentrated acid quickly into water
  - B) Add water slowly to concentrated acid with ice
  - C) Pour concentrated acid slowly into water down the side of the container with continuous stirring (*Correct*)
  - D) Mix both rapidly in a volumetric flask`,
    keyTakeaways: [
      'The non-luminous flame (air-hole open) is roaring blue, non-sooty, and hottest; used for all lab heating.',
      'The luminous flame (air-hole closed) is yellow, wavy, and produces heavy soot due to incomplete combustion.',
      'Always add concentrated acid to water slowly with continuous stirring, never the reverse.'
    ],
    associatedQuizId: 'waec-chemistry-ss1-q11'
  },

  // ==========================================
  // WEEK 12: COMPREHENSIVE REVISION & EXAM DRILLS
  // ==========================================
  {
    id: 'chem-ss1-term2-week12',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 12,
    topicTitle: 'Comprehensive 2nd Term Chemistry Review & WAEC Drills',
    subtopics: [
      'Unified Concept Map: Reactions, Structure & Bonding',
      'Master Stoichiometry & Gas Law Problem Sets',
      'Diagnostic Past WAEC & JAMB Question Drills',
      'Examiner Pitfalls & Practical Strategy'
    ],
    readingTimeMinutes: 9,
    summary: 'Consolidate 12 weeks of SS 1 Chemistry concepts with challenging multi-topic past WAEC and JAMB examination questions and detailed step-by-step solutions.',
    contentMarkdown: `### 1. Unified 2nd Term Chemistry Master Concept Map

During this term, we have bridged atomic structure to macro-chemical behavior:
1. **Subatomic Particles & Orbitals** determine valence configurations.
2. **Valence Configurations** dictate position on the **Periodic Table** and trends in atomic radius, electronegativity, and ionization energy.
3. **Electronegativity Differences** govern whether elements bond via **Ionic transfer**, **Covalent sharing**, or **Metallic pooling**.
4. **Bond Types & Intermolecular Forces** determine melting points, volatility, solubility, and electrolytic conductivity.
5. **The Mole Concept** provides the quantitative mathematical bridge between micro-scale atoms and macro-scale laboratory grams and gas liters.

---

### 2. High-Yield Multi-Topic WAEC Exam Drills

#### Drill 1: Stoichiometric Gas Production
**Question**: $5.4\\,\\text{g}$ of aluminium metal reacts completely with excess dilute hydrochloric acid:
$$2\\text{Al}_{(s)} + 6\\text{HCl}_{(aq)} \\rightarrow 2\\text{AlCl}_{3(aq)} + 3\\text{H}_{2(g)}$$
Calculate the volume of hydrogen gas liberated at s.t.p. ($Al = 27$, Molar volume at s.t.p. = $22.4\\,\\text{dm}^3$).

- **Step 1**: Find moles of aluminium reacted:
  $$n(\\text{Al}) = \\frac{5.4\\,\\text{g}}{27\\,\\text{g/mol}} = 0.20\\,\\text{mol}$$
- **Step 2**: Apply mole ratio from balanced equation:
  $$2\\,\\text{moles Al} \\rightarrow 3\\,\\text{moles } \\text{H}_2$$
  $$n(\\text{H}_2) = 0.20 \\times \\frac{3}{2} = 0.30\\,\\text{mol}$$
- **Step 3**: Convert moles to volume at s.t.p.:
  $$V(\\text{H}_2) = 0.30 \\times 22.4\\,\\text{dm}^3 = \\mathbf{6.72\\,\\text{dm}^3} \\quad (\\text{or } 6,720\\,\\text{cm}^3)$$

---

#### Drill 2: Gas Law Variable Shift
**Question**: A fixed mass of gas at $27^{\\circ}\\text{C}$ and $1.0\\,\\text{atm}$ pressure occupies $600\\,\\text{cm}^3$. If the pressure is increased to $2.5\\,\\text{atm}$ and the volume expands to $800\\,\\text{cm}^3$, find the new temperature in $^{\\circ}\\text{C}$.

- **Step 1**: Convert temperatures and list data:
  $$T_1 = 27 + 273 = 300\\,\\text{K}, \\quad P_1 = 1.0\\,\\text{atm}, \\quad V_1 = 600\\,\\text{cm}^3$$
  $$P_2 = 2.5\\,\\text{atm}, \\quad V_2 = 800\\,\\text{cm}^3, \\quad T_2 = ?$$
- **Step 2**: Rearrange General Gas Equation:
  $$T_2 = \\frac{P_2 V_2 T_1}{P_1 V_1} = \\frac{2.5 \\times 800 \\times 300}{1.0 \\times 600} = \\frac{600,000}{600} = 1,000\\,\\text{K}$$
- **Step 3**: Convert back to Celsius:
  $$\\theta = 1,000 - 273 = \\mathbf{727^{\\circ}\\text{C}}$$

---

#### Drill 3: Periodic Trends & Electronic Configuration
**Question**: An element $X$ has an atomic number of 15.
1. Write its $s, p, d, f$ electronic configuration:
   $$1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^3$$
2. Identify its Period and Group:
   - **Period 3** (highest principal quantum number is $n=3$).
   - **Group 5 / 15** ($2 + 3 = 5$ valence electrons in shell 3).
3. State the formula of its chloride and predict its bonding type:
   - Forms phosphorus trichloride ($X\\text{Cl}_3$) or phosphorus pentachloride ($X\\text{Cl}_5$).
   - **Covalent bonding** (non-metal + non-metal with shared electron pairs).

---

### 3. Top 5 Examiner Pitfalls to Avoid in WAEC Chemistry

| Common Student Pitfall | Correct WAEC Standard & Examination Protocol |
| :--- | :--- |
| **Omitting State Symbols** | Always include $(s), (l), (g), (aq)$ in all chemical equations; WAEC deducts 1 mark per missing symbol. |
| **Using Celsius in Gas Laws** | Never use $^{\\circ}\\text{C}$ in gas equations; always convert immediately to Kelvin ($K = ^{\\circ}\\text{C} + 273$). |
| **Confusing Allotropes & Isotopes** | **Allotropes** are different structural forms of the *same element in the same state* (Diamond/Graphite). **Isotopes** are atoms with the *same atomic number but different mass numbers* ($^{35}Cl$ vs $^{37}Cl$). |
| **Drawing Pen Lines on Chromatography** | Always specify a **pencil line** for the origin; ink dissolves and travels with the solvent, ruining the analysis. |
| **Adding Water to Acid** | Always specify adding **acid to water slowly down the glass rod**, never the reverse, to prevent violent boiling splatter. |

---

### 4. Practice Checkpoint Questions

- **Question 1**: Which of the following species has the same electronic configuration as an Argon atom ($Z=18$)?
  - A) $\\text{Na}^+$ ($10e^-$)
  - B) $\\text{Ca}^{2+}$ (*Correct — $20 - 2 = 18e^-$*)
  - C) $\\text{O}^{2-}$ ($10e^-$)
  - D) $\\text{Al}^{3+}$ ($10e^-$)
- **Question 2**: The mass of oxygen required to completely burn $16\\,\\text{g}$ of methane gas ($\\text{CH}_4$) according to the equation $\\text{CH}_4 + 2\\text{O}_2 \\rightarrow \\text{CO}_2 + 2\\text{H}_2\\text{O}$ is:
  - A) $32\\,\\text{g}$
  - B) $64\\,\\text{g}$ (*Correct — $1\\text{mol CH}_4 (16\\text{g})$ needs $2\\text{mol O}_2 = 2 \\times 32 = 64\\text{g}$*)
  - C) $16\\,\\text{g}$
  - D) $44\\,\\text{g}$`,
    keyTakeaways: [
      'Stoichiometry converts grams to moles, applies equation ratios, and converts moles to required products.',
      'Argon has 18 electrons; Ca²⁺, K⁺, Cl⁻, and S²⁻ are isoelectronic with Argon.',
      'Always include state symbols and convert temperatures to Kelvin in WAEC examinations.'
    ],
    associatedQuizId: 'waec-chemistry-ss1-q12'
  }
];
