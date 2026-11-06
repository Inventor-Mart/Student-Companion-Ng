import { CurriculumTopic } from '../types';

export const SS1_AGRIC_TOPICS: CurriculumTopic[] = [
  // ==========================================
  // WEEK 1: SOIL FORMATION & WEATHERING
  // ==========================================
  {
    id: 'agric-ss1-term2-week1',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Soil Formation, Weathering Processes & Soil Factors',
    subtopics: [
      'Definition & Composition of Agricultural Soil',
      'Physical, Chemical & Biological Weathering Processes',
      'Five Factors of Soil Formation (CLORPT Formula)',
      'Soil Mineralogy & Humus Dynamics'
    ],
    readingTimeMinutes: 7,
    summary: 'Explore the breakdown of parent rocks into fertile agricultural soil through physical disintegration, chemical decomposition, and biological weathering.',
    contentMarkdown: `### 1. What is Agricultural Soil?

**Agricultural soil** is the loose, weathered uppermost layer of the Earth’s crust composed of mineral particles, living organisms, organic matter (humus), water, and air, providing mechanical support, moisture, and nutrients for crop growth.

#### Ideal Volumetric Composition of Productive Loam Soil:
- **Mineral Matter ($45\\%$)**: Disintegrated parent rock particles (sand, silt, clay).
- **Organic Matter / Humus ($5\\%$)**: Decomposed plant and animal tissues.
- **Soil Water ($25\\%$)**: Soil solution containing dissolved mineral ions.
- **Soil Air ($25\\%$)**: Gases ($O_2, CO_2, N_2$) filling non-capillary pore spaces.

---

### 2. The Three Processes of Weathering

**Weathering** is the progressive mechanical disintegration and chemical decomposition of rocks and minerals into smaller particles by atmospheric and biological agents:

| Weathering Mode | Operating Agents | Mechanism of Action | Practical West African Examples |
| :--- | :--- | :--- | :--- |
| **Physical (Mechanical)** | Temperature fluctuations, running water, wind, frost | Alternating diurnal heating and cooling causes rocks to expand and contract unequally, causing **exfoliation (onion-peeling)**. | Granite inselbergs in Jos, Abuja, and Idanre hills. |
| **Chemical** | Water, oxygen, carbon dioxide, organic acids | Rock minerals undergo chemical change: **Hydrolysis**, **Hydration**, **Carbonation**, **Oxidation**, and **Solution**. | Dissolution of limestone in caves ($CaCO_3 \\rightarrow Ca(HCO_3)_2$); rusting of iron-rich lateritic rocks. |
| **Biological** | Plant roots, burrowing animals, earthworms, lichens | Growing tree roots wedge into rock joints and split them; lichens secrete chelating organic acids; earthworms churn subsoil. | Tree roots splitting road pavements and rocky outcrops. |

---

### 3. Five Factors of Soil Formation (The Dokuchaev-Jenny Equation)

$$S = f(Cl, O, R, P, T)$$

| Factor | Primary Influence on Soil Genesis |
| :--- | :--- |
| **1. Climate ($Cl$)** | **Most dominant active factor**: Rainfall drives chemical leaching; temperature governs microbial decomposition rates of organic matter. |
| **2. Organisms / Biota ($O$)** | Vegetation provides litter for humus; nitrogen-fixing bacteria enrich fertility; burrowing fauna aerate the profile. |
| **3. Relief / Topography ($R$)** | Steep slopes experience heavy erosion and produce thin, stony soils; flat valley bottoms (fadamas) accumulate deep, fertile, water-retaining alluvial soils. |
| **4. Parent Material ($P$)** | Determines initial chemical and physical properties: Sandstone yields acidic, coarse sandy soil; limestone yields alkaline, calcium-rich clay soil. |
| **5. Time ($T$)** | Soil genesis is extremely slow; it takes **200 to 500 years** to generate just $2.5\\,\\text{cm}$ ($1\\,\\text{inch}$) of fertile agricultural topsoil. |

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: The process whereby rock surfaces peel off in thin layers due to rapid daytime heating and rapid nighttime cooling is called:
  - A) Carbonation
  - B) Exfoliation (*Correct — differential expansion and contraction of granite rock minerals*)
  - C) Hydrolysis
  - D) Leaching
- **Question 2**: Which factor of soil formation is considered an active factor?
  - A) Parent rock
  - B) Climate (*Correct — climate and living organisms actively supply energy and water for weathering*)
  - C) Topography
  - D) Time`,
    keyTakeaways: [
      'Ideal soil comprises 45% mineral matter, 25% water, 25% air, and 5% organic matter.',
      'Weathering occurs via physical exfoliation, chemical breakdown (hydration, carbonation, oxidation), and biological root action.',
      'Soil formation factors are summarized by CLORPT: Climate, Living Organisms, Relief, Parent material, and Time.'
    ],
    associatedQuizId: 'waec-agric-ss1-q1'
  },

  // ==========================================
  // WEEK 2: SOIL PROFILE & HORIZONS
  // ==========================================
  {
    id: 'agric-ss1-term2-week2',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Soil Profile Anatomy, Horizons & Agricultural Significance',
    subtopics: [
      'Definition of Soil Profile & Method of Observation',
      'Anatomy of Master Horizons: O, A, B, C & R',
      'Zones of Eluviation vs. Illuviation',
      'Agricultural Importance of Soil Profile Studies'
    ],
    readingTimeMinutes: 8,
    summary: 'Study the vertical cross-section of the soil from the organic surface litter down to unweathered parent bedrock and understand the role of topsoil in crop yield.',
    contentMarkdown: `### 1. What is a Soil Profile?

A **soil profile** is a vertical section through the soil, extending from the ground surface down to the underlying parent bedrock, exposing a series of distinct horizontal layers called **soil horizons**.

[Diagram: soil-profile-horizons]

---

### 2. Detailed Anatomy of Master Soil Horizons

| Master Horizon | Scientific Designation | Dominant Characteristics | Agricultural Importance |
| :--- | :--- | :--- | :--- |
| **O-Horizon** | **Organic Layer** | Consists of fresh and decomposing plant foliage, dead grasses, and leaf litter. | Decomposes into dark organic humus; protects soil surface from direct raindrop impact erosion. |
| **A-Horizon** | **Topsoil (Zone of Eluviation)** | Dark brown to black; heavily enriched with decomposed humus; maximum microbial population. | **Most vital agricultural layer**: Houses $>80\\%$ of crop feeder roots; holds highest cation exchange capacity (CEC). |
| **B-Horizon** | **Subsoil (Zone of Illuviation)** | Lighter in color (reddish/yellowish); dense clay; accumulates leached minerals ($Fe, Al$ oxides, silicate clays). | Acts as a moisture reservoir during droughts; deep-rooted tree crops (cocoa, oil palm, citrus) anchor into this layer. |
| **C-Horizon** | **Weathered Parent Material (Regolith)** | Broken rock fragments and partially weathered parent stone; contains zero organic humus. | Indicates the mineral origin of the overlying soil; impermeable hardpans here may restrict drainage. |
| **R-Horizon** | **Bedrock (Unweathered Solid Rock)** | Continuous solid rock (e.g. granite, basalt, sandstone, schist). | Non-agricultural foundation layer; depth to bedrock determines soil workability and root penetration limits. |

---

### 3. Eluviation vs. Illuviation

- **Eluviation (A-Horizon)**: The downward removal and transport of dissolved mineral nutrients and fine clay particles by percolating rainwater.
- **Illuviation (B-Horizon)**: The deposition and accumulation of leached clay, organic compounds, and iron/aluminium oxides washed down from the overlying A-horizon.

---

### 4. Why Farmers Must Study the Soil Profile
1. **Determines Crop Suitability**: Shallow topsoils over hardpans are suitable only for shallow-rooted cereals (maize, rice, sorghum); deep loam profiles support perennial cash tree crops (rubber, cocoa, oil palm).
2. **Evaluates Drainage Capacity**: Heavy mottled clay in the B-horizon indicates poor internal drainage and waterlogging risk.
3. **Assesses Soil Fertility & Fertilizer Strategy**: Knowing the thickness and humus content of the A-horizon guides correct NPK fertilizer application rates.

---

### 5. WAEC Checkpoint Practice Questions

- **Question 1**: The zone of maximum accumulation of leached silicate clay and iron oxides in a soil profile is the:
  - A) O-horizon
  - B) A-horizon
  - C) B-horizon (*Correct — Zone of Illuviation*)
  - D) C-horizon
- **Question 2**: A farmer notices that maize crops grow vigorously while cassava tubers rot in the soil. Examination of the soil profile will most likely reveal:
  - A) Deep sandy topsoil
  - B) An impermeable clay hardpan close to the surface causing waterlogging (*Correct*)
  - C) Excess organic matter in the O-horizon
  - D) High population of earthworms`,
    keyTakeaways: [
      'The soil profile consists of O (organic), A (topsoil), B (subsoil), C (parent rock), and R (bedrock).',
      'The A-horizon is the zone of eluviation (leaching) and houses most crop feeder roots and soil microbes.',
      'The B-horizon is the zone of illuviation where leached clay and minerals accumulate.'
    ],
    associatedQuizId: 'waec-agric-ss1-q2'
  },

  // ==========================================
  // WEEK 3: SOIL PROPERTIES & LIMING
  // ==========================================
  {
    id: 'agric-ss1-term2-week3',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Soil Physical & Chemical Properties, pH & Liming',
    subtopics: [
      'Soil Texture & Particle Size Fractions (Sand, Silt, Clay)',
      'Soil Structure Types (Platy, Granular, Blocky, Prismatic)',
      'Soil pH, Soil Acidity & Its Causes',
      'Liming Materials & Correcting Soil Acidity'
    ],
    readingTimeMinutes: 8,
    summary: 'Master the mechanical composition of soils, evaluate structural aggregation, measure soil pH, and calculate liming applications to correct soil acidity.',
    contentMarkdown: `### 1. Soil Texture & Particle Size Fractions

**Soil texture** refers to the relative proportions of sand, silt, and clay particle size fractions present in a soil sample:

| Particle Class | Diameter Range (mm) | Feel & Handling Characteristics | Water Holding Capacity | Aeration & Drainage |
| :--- | :--- | :--- | :--- | :--- |
| **Coarse Sand** | $2.0 - 0.2\\,\\text{mm}$ | Very gritty, non-sticky | Extremely Low | Extremely High / Rapid |
| **Fine Sand** | $0.2 - 0.02\\,\\text{mm}$ | Gritty, visible to naked eye | Low | High |
| **Silt** | $0.02 - 0.002\\,\\text{mm}$ | Smooth, silky like flour/talcum powder | Moderate | Moderate |
| **Clay** | $<0.002\\,\\text{mm}$ | Extremely sticky and plastic when wet; forms hard clods when dry | **Highest** | **Very Poor / Prone to waterlogging** |

#### The Ideal Agricultural Texture: **Loam Soil**
A balanced mixture of approximately **$40\\%$ Sand, $40\\%$ Silt, and $20\\%$ Clay**, offering optimal water retention without waterlogging, excellent root aeration, and high nutrient retention.

---

### 2. Soil Structure Types

**Soil structure** refers to the physical arrangement and aggregation of individual soil particles into larger clusters called **peds**:
- **Granular / Crumb Structure**: Small, porous, rounded peds; **the most ideal structure for crop cultivation** (found in organic-rich topsoils).
- **Platy Structure**: Thin horizontal plates overlapping like shingles; impedes downward water infiltration and root penetration.
- **Blocky Structure**: Cube-like irregular aggregates; common in clayey B-horizons.
- **Prismatic / Columnar Structure**: Vertically oriented pillars with flat or rounded caps; common in subsoils of arid and semi-arid regions.

---

### 3. Soil pH, Acidity & Liming Materials

**Soil pH** measures the negative logarithm of hydrogen ion concentration ($[H^+]$) in the soil solution:

$$\\text{pH} = -\\log_{10}[\\text{H}^+]$$
- $\\text{pH } < 6.0$: **Acidic Soil** (Common in high-rainfall southern Nigerian rainforest zones due to intense leaching of basic cations $Ca^{2+}, Mg^{2+}, K^+$).
- $\\text{pH } 6.5 - 7.5$: **Neutral Soil** (**Optimum range for most tropical arable crops**).
- $\\text{pH } > 8.0$: **Alkaline / Saline Soil** (Common in dry northern regions with high evaporation).

#### Causes of Soil Acidity:
1. Leaching of basic cations ($Ca^{2+}, Mg^{2+}, K^+, Na^+$) by heavy rainfall.
2. Continuous prolonged use of acidifying inorganic fertilizers (e.g. Ammonium sulfate $(NH_4)_2SO_4$, Urea).
3. Decomposition of organic residues releasing carbonic acid and organic acids.

#### Common Liming Materials & Neutralization Chemistry:
| Liming Compound | Chemical Name | Active Neutralizing Reaction in Acid Soil |
| :--- | :--- | :--- |
| **Agricultural Limestone** | Calcium carbonate ($CaCO_3$) | $CaCO_3 + 2\\text{H}^+ \\rightarrow Ca^{2+} + H_2O + CO_2\\uparrow$ |
| **Quicklime** | Calcium oxide ($CaO$) | $CaO + 2\\text{H}^+ \\rightarrow Ca^{2+} + H_2O$ |
| **Slaked Lime** | Calcium hydroxide ($Ca(OH)_2$) | $Ca(OH)_2 + 2\\text{H}^+ \\rightarrow Ca^{2+} + 2H_2O$ |
| **Dolomite** | Calcium magnesium carbonate ($CaCO_3\\cdot MgCO_3$) | Supplies both calcium and magnesium while neutralizing acidity |
| **Wood Ash** | Potassium and calcium carbonates | Traditional organic liming material |

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: Which of the following soil fractions exhibits the highest cation exchange and water retention capacity?
  - A) Coarse sand
  - B) Fine sand
  - C) Silt
  - D) Clay (*Correct — colloidal size with immense specific surface area and negative charges*)
- **Question 2**: Which liming material also supplies essential magnesium to crops?
  - A) Calcium oxide
  - B) Dolomite (*Correct — $CaCO_3\\cdot MgCO_3$*)
  - C) Slaked lime
  - D) Calcium sulfate (Gypsum)`,
    keyTakeaways: [
      'Soil texture is the relative proportion of sand, silt, and clay; loam (40:40:20) is ideal for crops.',
      'Crumb and granular structures provide optimum aeration and water infiltration for roots.',
      'Soil acidity is corrected by liming materials (limestone, quicklime, dolomite) which replace H+ ions with Ca²⁺ and Mg²⁺.'
    ],
    associatedQuizId: 'waec-agric-ss1-q3'
  },

  // ==========================================
  // WEEK 4: SOIL WATER & ENVIRONMENTAL FACTORS
  // ==========================================
  {
    id: 'agric-ss1-term2-week4',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Soil Water Forms, Retention & Soil Environmental Ecology',
    subtopics: [
      'Classification of Soil Water: Gravitational, Capillary & Hygroscopic',
      'Field Capacity & Permanent Wilting Point (PWP)',
      'Soil Air & Aeration in Relation to Respiration',
      'Soil Temperature & Microbial Population Dynamics'
    ],
    readingTimeMinutes: 7,
    summary: 'Distinguish available capillary water from unavailable hygroscopic water, understand field capacity, and evaluate soil aeration and temperature for crop health.',
    contentMarkdown: `### 1. Classification of Soil Water

Water in the soil occurs in three distinct physical forms based on the tension (suction force) with which it is held by soil particles:

| Soil Water Form | Force Holding Water | Movement in Soil | Plant Availability | Agricultural Significance |
| :--- | :--- | :--- | :--- | :--- |
| **Gravitational Water** | Held at $<0.33\\,\\text{bar}$ (low tension) | Drains downward under the pull of gravity through macro-pores | **Unavailable / Harmful if stagnant** | Drains away within 24–48 hours after rain; causes leaching of soluble nitrates; causes waterlogging if drainage is poor. |
| **Capillary Water** | Held by surface tension ($0.33 - 31\\,\\text{bar}$) | Moves in all directions via microscopic micropores | **Available to plant roots** | **The only form of soil water that crops can absorb**; dissolves soil minerals to form the soil solution. |
| **Hygroscopic Water** | Held extremely tightly by electrostatic forces ($>31\\,\\text{bar}$) | Immobile molecular film on soil colloids | **Completely unavailable** | Tightly bound thin film; cannot be extracted by plant roots even when crops wilt and die. |

---

### 2. Critical Moisture Benchmarks

1. **Field Capacity ($FC$)**: The amount of water retained by a soil after excess gravitational water has completely drained away (usually $24 - 48\\,\\text{hours}$ after heavy rainfall).
2. **Permanent Wilting Point ($PWP$)**: The soil moisture level at which plant roots can no longer exert enough suction force to extract water; crop plants wilt permanently and cannot recover even when placed in a humid chamber.
3. **Available Water Capacity ($AWC$)**:
   $$\\text{Available Water} = \\text{Field Capacity } (FC) - \\text{Permanent Wilting Point } (PWP)$$

---

### 3. Soil Air & Soil Temperature

#### Soil Air:
- Fills pore spaces not occupied by water.
- Contains lower oxygen ($10 - 20\\%\\,O_2$) and significantly higher carbon dioxide ($0.2 - 3.0\\%\\,CO_2$) than the atmosphere due to root respiration and microbial decomposition.
- **Poor aeration (waterlogging)** halts root respiration, stops active mineral nutrient uptake, and encourages anaerobic denitrifying bacteria.

#### Soil Temperature:
- Optimum range for tropical crop root activity and seed germination is **$25^{\\circ}\\text{C} - 35^{\\circ}\\text{C}$**.
- High soil temperatures ($>40^{\\circ}\\text{C}$) kill beneficial soil microbes and dehydrate seedling radicals.
- **Mulching** with dry grass or crop residues moderates soil temperature fluctuations and reduces surface evaporation.

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: The only form of soil water that is directly absorbed by plant root hairs for physiological processes is:
  - A) Gravitational water
  - B) Capillary water (*Correct — held in micropores at tensions roots can overcome*)
  - C) Hygroscopic water
  - D) Chemically combined water
- **Question 2**: Waterlogging in agricultural soils is detrimental to crop growth primarily because it:
  - A) Increases soil pH
  - B) Expels soil air, suffocating aerobic root respiration (*Correct*)
  - C) Increases soil temperature
  - D) Accelerates physical weathering`,
    keyTakeaways: [
      'Capillary water is the only form of soil moisture available to crop roots.',
      'Field capacity is moisture retained after gravitational drainage; available water = FC - PWP.',
      'Waterlogging displaces soil oxygen, suffocating crop roots and triggering denitrification.'
    ],
    associatedQuizId: 'waec-agric-ss1-q4'
  },

  // ==========================================
  // WEEK 5: PLANT NUTRIENTS & FERTILIZERS
  // ==========================================
  {
    id: 'agric-ss1-term2-week5',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Plant Nutrients, Deficiency Symptoms & Soil Fertility Maintenance',
    subtopics: [
      'Macro-Nutrients vs. Micro-Nutrients (Trace Elements)',
      'Deficiency Symptoms of N, P, K, Ca, Mg & Fe',
      'Organic Manures: Farmyard Manure, Compost & Green Manure',
      'Inorganic Fertilizers (NPK, Urea) & Fertilizer Calculations'
    ],
    readingTimeMinutes: 8,
    summary: 'Master essential plant nutrients, diagnose deficiency symptoms, compare organic manures with inorganic fertilizers, and calculate NPK formulations.',
    contentMarkdown: `### 1. Classification of Essential Plant Nutrients

Plants require **16 essential elements** for healthy vegetative growth, flowering, and seed development:

| Classification | Essential Elements | Source / Uptake Form |
| :--- | :--- | :--- |
| **Non-Mineral Elements** | Carbon ($C$), Hydrogen ($H$), Oxygen ($O$) | Air ($CO_2$) and Water ($H_2O$) via photosynthesis |
| **Primary Macro-Nutrients** | Nitrogen ($N$), Phosphorus ($P$), Potassium ($K$) | Soil solution in large quantities ($NO_3^-, NH_4^+, H_2PO_4^-, K^+$) |
| **Secondary Macro-Nutrients** | Calcium ($Ca$), Magnesium ($Mg$), Sulfur ($S$) | Soil minerals in moderate quantities ($Ca^{2+}, Mg^{2+}, SO_4^{2-}$) |
| **Micro-Nutrients (Trace Elements)** | Iron ($Fe$), Zinc ($Zn$), Copper ($Cu$), Manganese ($Mn$), Boron ($B$), Molybdenum ($Mo$), Chlorine ($Cl$) | Soil solution in minute trace amounts ($<100\\,\\text{ppm}$) |

---

### 2. Primary Nutrients: Functions & Classic Deficiency Symptoms

| Nutrient | Primary Physiological Function | Distinct Visual Deficiency Symptom |
| :--- | :--- | :--- |
| **Nitrogen ($N$)** | Promotes vegetative leaf and stem growth; essential component of chlorophyll and protein. | **General chlorosis (yellowing) starting on older lower leaves**; stunted spindly growth. |
| **Phosphorus ($P$)** | Promotes root elongation, early seedling vigor, flower initiation, and fruit ripening. | **Purple or reddish-bronze coloration on leaves and stems**; stunted root system; delayed maturity. |
| **Potassium ($K$)** | Regulates stomatal opening, enzyme activation, and disease resistance. | **Marginal leaf scorch (burning/browning of leaf tips and margins)**; weak lodging stems. |
| **Magnesium ($Mg$)** | Central metal atom in the chlorophyll porphyrin ring. | **Interveinal chlorosis on older leaves** (veins remain green while tissue between turns yellow). |
| **Calcium ($Ca$)** | Component of calcium pectate in cell walls and apical meristems. | Death of terminal growing buds; blossom-end rot in tomatoes. |

---

### 3. Organic Manures vs. Inorganic Fertilizers

| Comparison Metric | Organic Manures (FYM, Compost, Green Manure) | Inorganic Chemical Fertilizers (NPK, Urea) |
| :--- | :--- | :--- |
| **Nutrient Concentration** | Low and variable nutrient percentage | High, precise, and guaranteed nutrient percentage |
| **Release Rate** | Slow release through microbial mineralization | Rapid release; readily soluble in soil solution |
| **Effect on Soil Structure** | **Improves soil physical structure**, increases CEC, and boosts water retention | Does not improve physical structure; excessive use can acidify soil |
| **Microbial Stimulation** | Feeds and multiplies earthworms and beneficial microbes | High salt index may temporarily suppress local micro-organisms |

---

### 4. Fertilizer Calculations: Grade & Nutrient Mass

A fertilizer bag labeled **NPK 15-15-15** contains $15\\%\\,N$, $15\\%\\,P_2O_5$, and $15\\%\\,K_2O$ by weight.

#### Worked Problem:
Calculate the mass of pure nitrogen ($N$) contained in a $50\\,\\text{kg}$ bag of **NPK 20-10-10**:
$$\\text{Mass of } N = \\frac{20}{100} \\times 50\\,\\text{kg} = \\mathbf{10.0\\,\\text{kg of Nitrogen}}$$

---

### 5. WAEC Checkpoint Practice Questions

- **Question 1**: A tomato crop shows stunted growth with leaves exhibiting distinct purple-bronze pigmentation along the veins. The crop is suffering from a deficiency of:
  - A) Nitrogen
  - B) Phosphorus (*Correct — anthocyanin purple pigment accumulates under P starvation*)
  - C) Potassium
  - D) Zinc
- **Question 2**: How many kilograms of potassium ($K_2O$) are present in four $50\\,\\text{kg}$ bags of NPK 15-15-15 fertilizer?
  - A) $15\\,\\text{kg}$
  - B) $30\\,\\text{kg}$ (*Correct — Total weight = $200\\text{kg}$; $15\\% \\times 200 = 30\\,\\text{kg}$*)
  - C) $45\\,\\text{kg}$
  - D) $60\\,\\text{kg}$`,
    keyTakeaways: [
      'Primary macro-nutrients are N, P, and K; secondary are Ca, Mg, and S.',
      'Nitrogen deficiency causes general leaf yellowing; phosphorus causes purple leaf pigmentation; potassium causes marginal leaf scorch.',
      'Organic manure improves soil physical structure and moisture capacity, whereas inorganic fertilizers supply high-concentration immediate nutrients.'
    ],
    associatedQuizId: 'waec-agric-ss1-q5'
  },

  // ==========================================
  // WEEK 6: NUTRIENT CYCLES (NITROGEN CYCLE)
  // ==========================================
  {
    id: 'agric-ss1-term2-week6',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'The Nitrogen Cycle, Biological Fixation & Soil Dynamics',
    subtopics: [
      'Atmospheric Nitrogen & The Insoluble Challenge',
      'Biological Nitrogen Fixation by Symbiotic & Free-Living Bacteria',
      'The Two-Step Nitrification Pathway (Nitrosomonas & Nitrobacter)',
      'Denitrification & Maintaining Farm Nitrogen Balance'
    ],
    readingTimeMinutes: 8,
    summary: 'Trace nitrogen circulation between the atmosphere, soil, and biological organisms, examining symbiotic Rhizobium fixation and microbial nitrification.',
    contentMarkdown: `### 1. The Nitrogen Paradox in Agriculture

Although nitrogen gas ($N_2$) comprises **$78\\%$ of the Earth’s atmosphere**, plants cannot absorb it directly through their leaves because the two nitrogen atoms are held by an extremely strong covalent triple bond ($N\\equiv N$). Crops can only absorb nitrogen when it is "fixed" into soluble soil ions: **Nitrate ($NO_3^-$)** or **Ammonium ($NH_4^+$)**.

[Diagram: nitrogen-cycle-diagram]

---

### 2. Biological Nitrogen Fixation Mechanisms

1. **Symbiotic Nitrogen Fixation**:
   - Performed by bacteria of the genus **Rhizobium** residing inside root nodules of **leguminous crops** (cowpea, soybean, groundnut, mucuna).
   - The legume provides carbohydrates (energy) to the bacteria; the bacteria synthesize the enzyme *nitrogenase* to reduce atmospheric $N_2$ into ammonium ($NH_4^+$) for the host plant.
2. **Non-Symbiotic (Free-Living) Nitrogen Fixation**:
   - Performed by free-living soil bacteria:
     - Aerobic: **Azotobacter**
     - Anaerobic: **Clostridium**
     - Blue-green algae (Cyanobacteria): **Anabaena** and **Nostoc** in flooded rice paddies.
3. **Non-Biological (Atmospheric) Fixation**:
   - Lightning discharges supply high thermal activation energy, causing atmospheric $N_2$ and $O_2$ to combine into nitric oxide ($NO$), which oxidizes to $NO_2$, dissolves in rain as nitrous/nitric acid ($HNO_3$), and forms soil nitrates.

---

### 3. The Two-Step Nitrification Biochemical Pathway

**Nitrification** is the aerobic biological oxidation of soil ammonium ions into plant-usable nitrates by specialized autotrophic bacteria:

$$\\text{Step 1: } 2\\text{NH}_4^+ + 3\\text{O}_2 \\xrightarrow{\\mathbf{Nitrosomonas}} 2\\text{NO}_2^- + 4\\text{H}^+ + 2\\text{H}_2\\text{O} + \\text{Energy}$$
$$\\text{Step 2: } 2\\text{NO}_2^- + \\text{O}_2 \\xrightarrow{\\mathbf{Nitrobacter}} 2\\text{NO}_3^- + \\text{Energy}$$

- *Nitrosomonas* converts ammonium ($NH_4^+$) to toxic nitrite ($NO_2^-$).
- *Nitrobacter* immediately oxidizes nitrite ($NO_2^-$) to stable, soluble nitrate ($NO_3^-$), which crop roots readily assimilate into amino acids and plant protein.

---

### 4. Nitrogen Loss: Denitrification & Leaching
- **Denitrification**: Anaerobic bacteria (e.g. **Pseudomonas denitrificans**, *Thiobacillus*) in waterlogged, compacted soils reduce valuable nitrates back into nitrous oxide ($N_2O$) and inert nitrogen gas ($N_2$), causing soil nitrogen depletion.
- **Leaching**: Nitrate ions ($NO_3^-$) carry a negative charge; because soil clay and humus colloids also carry negative charges, nitrates are not electrostatically held and wash rapidly down into subsoils during heavy rains.

---

### 5. WAEC Checkpoint Practice Questions

- **Question 1**: The bacterium responsible for converting nitrite ($NO_2^-$) to nitrate ($NO_3^-$) in the nitrogen cycle is:
  - A) Azotobacter
  - B) Nitrosomonas
  - C) Nitrobacter (*Correct*)
  - D) Rhizobium
- **Question 2**: Crop rotation involving legumes maintains soil fertility primarily because:
  - A) Legumes repel insect pests
  - B) Symbiotic Rhizobium in legume root nodules fix atmospheric nitrogen into the soil (*Correct*)
  - C) Legumes consume zero soil moisture
  - D) Legumes acidify the soil`,
    keyTakeaways: [
      'Atmospheric N₂ (78%) is fixed by Rhizobium in legume root nodules and by free-living Azotobacter.',
      'Nitrification is a two-step aerobic process: Nitrosomonas produces NO₂⁻, then Nitrobacter oxidizes it to NO₃⁻.',
      'Denitrification by Pseudomonas in waterlogged soils converts nitrates back into nitrogen gas, causing nutrient loss.'
    ],
    associatedQuizId: 'waec-agric-ss1-q6'
  },

  // ==========================================
  // WEEK 7: FARM SURVEYING & PLANNING
  // ==========================================
  {
    id: 'agric-ss1-term2-week7',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Farm Surveying Equipment, Baseline Mapping & Farmstead Planning',
    subtopics: [
      'Definition & Objectives of Farm Surveying',
      'Survey Instruments: Gunter’s Chain, Ranging Poles & Arrows',
      'The Prismatic Compass, Measuring Tapes & Beacons',
      'Farmstead Planning & Building Layout Principles'
    ],
    readingTimeMinutes: 8,
    summary: 'Survey agricultural land boundaries using standard instruments, take linear measurements with Gunter’s chain, and plan functional farmstead building layouts.',
    contentMarkdown: `### 1. What is Farm Surveying?

**Farm surveying** is the scientific process of measuring, recording, and mapping the relative positions, distances, angles, contours, and boundaries of features on a piece of agricultural farmland.

#### Core Objectives of Farm Surveying:
1. Determines exact legal boundaries and farm acreage for land registration and securing farm loans.
2. Identifies topography and slopes for designing irrigation, drainage channels, and soil conservation terraces.
3. Guides logical spatial allocation of farm buildings (farmstead planning) to maximize operational efficiency.

---

### 2. Standard Farm Surveying Instruments

[Diagram: farm-surveying-instruments]

| Instrument | Physical Description | Practical Field Survey Function |
| :--- | :--- | :--- |
| **Gunter's Chain** | 100 galvanized steel links joined by rings; total length = **$66\\,\\text{feet}$ ($20.12\\,\\text{meters}$)** | Measures long linear distances along baseline; 10 square chains = $1\\,\\text{acre}$. |
| **Survey Arrows (Pins)** | Steel wire pegs ($30 - 40\\,\\text{cm}$ long) with a loop handle at top | Stuck into ground to record the number of completed chain lengths measured. |
| **Ranging Poles** | Wooden/metal poles ($2 - 3\\,\\text{m}$ high) painted in alternate $20\\,\\text{cm}$ **red and white bands** | Placed vertically at stations to mark straight alignment lines over long distances. |
| **Measuring Tape** | Steel or linen coated tape ($30\\,\\text{m}$ or $50\\,\\text{m}$ long) | Measures short distances, offsets, and diagonal checks. |
| **Prismatic Compass** | Magnetic needle mounted on pivot with sighting vane and magnifying glass prism | Measures magnetic bearings and angles of field boundary lines ($0^{\\circ} - 360^{\\circ}$). |
| **Survey Beacons** | Concrete pillars ($15 \\times 15 \\times 60\\,\\text{cm}$) buried in corners | Permanent legal boundary markers with survey registration numbers. |

---

### 3. Farmstead Planning Principles

The **farmstead** is the operational core of the farm, comprising the farmer's dwelling, livestock barns, machinery sheds, processing mills, and storage silos:
1. **Dwelling House**: Positioned on elevated ground, **upwind** of livestock pens and manure pits to avoid foul odors and fly infestations.
2. **Livestock Units**: Positioned downwind and away from water sources to prevent contamination of drinking water.
3. **Storage Silos / Granaries**: Located near the farm entrance and processing mill on dry, elevated, rodent-proof foundations.
4. **Machinery Shed**: Easily accessible from main access roads and fields.

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: Gunter's chain consists of how many individual steel links?
  - A) 50 links
  - B) 66 links
  - C) 100 links (*Correct — 100 links = 66 feet = 20.12 meters; each link is 7.92 inches*)
  - D) 120 links
- **Question 2**: In farmstead planning, the farmer's residential home should be sited:
  - A) Downwind of the poultry unit
  - B) Adjacent to the manure pit
  - C) On elevated ground upwind of livestock houses (*Correct — prevents odor, flies, and runoff contamination*)
  - D) In the center of the crop fields`,
    keyTakeaways: [
      'Farm surveying establishes legal boundaries, acreage, and elevation contours.',
      'Gunter’s chain is 66 feet long with 100 links; ranging poles mark straight survey lines with red and white bands.',
      'Farmstead planning positions dwelling homes upwind of livestock units and silos on elevated ground.'
    ],
    associatedQuizId: 'waec-agric-ss1-q7'
  },

  // ==========================================
  // WEEK 8: FARM POWER & ENERGY SOURCES
  // ==========================================
  {
    id: 'agric-ss1-term2-week8',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Farm Power Sources: Human, Animal, Mechanical & Solar Energy',
    subtopics: [
      'Human Power: Capabilities & Inherent Limitations',
      'Animal Traction: Work Bullocks & Draught Animals in the Savanna',
      'Mechanical Power: Internal Combustion Engines & Tractors',
      'Renewable Energy Sources: Solar, Wind & Biogas'
    ],
    readingTimeMinutes: 7,
    summary: 'Evaluate the energetic inputs driving farm operations in West Africa, contrasting manual labor and work animals with tractors and renewable energy.',
    contentMarkdown: `### 1. Comparative Analysis of Farm Power Sources

Farm operations require energy for tillage, planting, weeding, irrigation, harvesting, and processing:

| Source of Power | Practical Farm Applications | Distinct Advantages | Major Limitations & Constraints |
| :--- | :--- | :--- | :--- |
| **Human Power** | Planting, weeding, harvesting, precision operations | Intelligent decision-making; highly flexible; easily controlled. | **Extremely low power output** ($\\approx 0.1\\,\\text{hp}$ / $75\\,\\text{W}$); high fatigue; causes drudgery; slow. |
| **Animal Traction** | Ploughing, ridging, cart transport in Nigerian savanna | Cheaper than tractors; animal dung provides organic fertilizer; works well on smallholder farms. | Restricted by **Tsetse fly (Trypanosomiasis)** in southern rainforests; requires feeding, veterinary care, and rest. |
| **Mechanical (Tractor)** | Heavy primary tillage, harvesting, hauling, threshing | **Massive power output** ($50 - 150+\\,\\text{hp}$); fast operations; does not tire; overcomes weather delays. | **High initial purchase cost**; expensive fossil fuel; requires skilled operators and maintenance workshops. |
| **Electrical Power** | Incubators, milking machines, water pumping, cold storage | Clean, continuous, efficient; easily automated with switches. | Unstable public grid power in rural Nigeria; expensive generators required. |
| **Solar Energy** | Crop drying, solar water pumping, electric fencing | Free, abundant, renewable; zero carbon emissions. | Intermittent (absent at night and cloudy days); high initial solar inverter/battery cost. |

---

### 2. Animal Traction in the Nigerian Savanna

In the northern Sudano-Sahelian belts (Kano, Kaduna, Sokoto, Borno), **work bullocks (White Fulani / Bunaji cattle)** are widely harnessed for ridging and carting:
- **Tsetse Fly Barrier**: Animal traction is virtually non-existent in southern Nigeria because the humid rainforest harbors tsetse flies (*Glossina* spp.) transmitting fatal sleeping sickness (Trypanosomiasis) to humped Zebu cattle.

---

### 3. Renewable Biogas Energy on the Farm

**Biogas** is produced through the **anaerobic digestion** of animal manure (poultry droppings, cattle dung, pig slurry) inside an airtight biodigester:
- Composition: **$60 - 70\\%\\,\\text{Methane } (CH_4)$** and **$30 - 40\\%\\,\\text{Carbon dioxide } (CO_2)$**.
- Used on the farm for cooking, heating brooders for day-old chicks, and driving small gas engines.
- The effluent slurry remaining is rich in mineralized nitrogen and acts as an exceptional organic fertilizer.

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: Why is animal power (draught bullocks) rarely utilized in southern Nigeria?
  - A) Soil is too rocky
  - B) High prevalence of Trypanosomiasis transmitted by tsetse flies (*Correct*)
  - C) Farmers do not eat beef
  - D) Excessive solar radiation
- **Question 2**: What is the primary combustible gas present in farm biogas generated from poultry manure?
  - A) Propane
  - B) Methane (*Correct — $CH_4$ constitutes 60–70% of biogas*)
  - C) Carbon monoxide
  - D) Hydrogen sulfide`,
    keyTakeaways: [
      'Human power produces only ~0.1 hp, leading to severe drudgery and low agricultural productivity.',
      'Animal traction is confined to the savanna zone due to the tsetse fly Trypanosomiasis barrier in the south.',
      'Biogas produced by anaerobic digestion of animal dung contains 60-70% methane for farm heat and energy.'
    ],
    associatedQuizId: 'waec-agric-ss1-q8'
  },

  // ==========================================
  // WEEK 9: FARM MACHINERY & IMPLEMENTS
  // ==========================================
  {
    id: 'agric-ss1-term2-week9',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Farm Machinery, Primary & Secondary Tillage Implements',
    subtopics: [
      'Classification of Tillage Operations: Primary vs. Secondary',
      'The Tractor Disc Plough: Anatomy, Functions & Scrapers',
      'Disc Harrows, Ridgers & Cultivators',
      'Harvesting & Processing Machinery (Combine Harvester, Shellers)'
    ],
    readingTimeMinutes: 8,
    summary: 'Examine tractor-coupled tillage implements, understand the engineering anatomy of the disc plough, and differentiate primary from secondary tillage machinery.',
    contentMarkdown: `### 1. Primary vs. Secondary Tillage Implements

Tillage is the mechanical manipulation of the soil to create a favorable seedbed for crop establishment:

| Tillage Stage | Primary Goal | Operating Implements |
| :--- | :--- | :--- |
| **Primary Tillage** | Initial deep cutting, shattering, lifting, and inverting of virgin or fallow soil. | **Disc Plough**, **Mouldboard Plough**, Chisel Plough, Subsoiler |
| **Secondary Tillage** | Pulverizing clods, leveling seedbeds, weed eradication, and building ridges. | **Disc Harrow**, **Ridger**, Rotary Tiller, Spring-tine Cultivator |

---

### 2. Anatomy & Functions of the Tractor Disc Plough

The **disc plough** is the primary tillage implement most widely used across West Africa:

[Diagram: disc-plough-anatomy]

| Component | Engineering Function | Maintenance Protocol |
| :--- | :--- | :--- |
| **Beam (Main Frame)** | Heavy central steel chassis that provides ballast weight to penetrate hard dry soils. | Check for structural stress cracks; repaint to prevent rust. |
| **Coupling / 3-Point Hitch** | Connects implement securely to tractor lower links and top hydraulic link. | Lubricate hitch pins; check linchpins. |
| **Concave Steel Discs** | Circular rotating high-carbon steel plates that cut furrow slices, roll, and invert the soil. | Sharpen cutting edges; replace worn discs. |
| **Disc Scraper** | Curved steel blade mounted against the inner concave face of each disc. | Adjust blade clearance; prevents wet clay from clogging disc. |
| **Standard (Shank)** | Heavy vertical arm connecting the beam to the disc hub assembly. | Tighten all assembly bolts with torque wrench. |
| **Rear Furrow Wheel** | Angled stabilizing wheel that runs in the bottom of the open furrow. | Absorbs lateral soil side-thrust; prevents tractor side-drift. |

---

### 3. Disc Plough vs. Mouldboard Plough

| Feature | Tractor Disc Plough | Tractor Mouldboard Plough |
| :--- | :--- | :--- |
| **Cutting Element** | Rotating concave spherical discs | Fixed share, shin, and curved mouldboard |
| **Suitability for Obstacles** | **Rolls over buried roots, rocks, and hardpan** without breaking | Catches on buried stumps and rocks, bending or snapping share |
| **Soil Inversion Quality** | Moderate inversion; cuts cloddy furrows | **Complete 180° furrow inversion**; buries weeds totally |
| **Tropical Suitability** | **Extremely ideal for Nigerian savanna & virgin bush** | Suitable only for completely destumped, stone-free European soils |

---

### 4. Secondary Implements & Harvesting Machines
- **Disc Harrow**: Features smaller, lighter, closely spaced discs that pulverize large plough clods into fine tilth seedbeds.
- **Ridger**: Opposing disc or mouldboard pairs that throw pulverized soil together to form planting ridges for tuber crops (yams, cassava, sweet potatoes).
- **Combine Harvester**: Self-propelled multi-stage machine that simultaneously **reaps**, **threshes**, and **winnows/cleans** cereal crops (rice, wheat, maize) in a single pass across the field.

---

### 5. WAEC Checkpoint Practice Questions

- **Question 1**: The part of a tractor disc plough that prevents the implement from drifting sideways due to soil resistance is the:
  - A) Disc scraper
  - B) Rear furrow wheel (*Correct — absorbs lateral reaction force*)
  - C) Beam
  - D) Standard
- **Question 2**: Which implement is recommended for seedbed preparation in tropical soils containing hidden tree roots and stones?
  - A) Mouldboard plough
  - B) Disc plough (*Correct — rotating discs roll over subterranean obstacles without breakage*)
  - C) Subsoiler
  - D) Rotary hoe`,
    keyTakeaways: [
      'Primary tillage inverts raw soil (disc plough); secondary tillage pulverizes clods and forms ridges (disc harrow, ridger).',
      'The disc plough is ideal for tropical soils because rotating discs roll over underground roots and stones.',
      'The disc scraper removes sticky clay, while the rear furrow wheel stabilizes the implement against side-thrust.'
    ],
    associatedQuizId: 'waec-agric-ss1-q9'
  },

  // ==========================================
  // WEEK 10: AGRICULTURAL MECHANIZATION
  // ==========================================
  {
    id: 'agric-ss1-term2-week10',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Farm Mechanization: Advantages, Constraints & Implement Maintenance',
    subtopics: [
      'Concept & Scope of Agricultural Mechanization',
      'Economic, Agronomic & Social Advantages',
      'Major Constraints & Problems of Mechanization in Nigeria',
      'Daily, Routine & Seasonal Tractor Maintenance'
    ],
    readingTimeMinutes: 7,
    summary: 'Analyze the transition from manual labor to motorized farm machinery, evaluate Nigerian socio-economic constraints, and master maintenance routines.',
    contentMarkdown: `### 1. What is Agricultural Mechanization?

**Agricultural mechanization** is the application of modern mechanical, automated, and motorized engineering equipment to farm operations—from land clearing, tillage, planting, and crop protection to harvesting, processing, and storage—to replace human manual drudgery.

---

### 2. Advantages vs. Constraints in Nigeria

| Strategic Advantages | Constraints & Problems in Nigeria |
| :--- | :--- |
| **Increased Land Cultivation**: A tractor can plough $2 - 4\\,\\text{hectares/day}$, whereas manual hoes take 20 person-days per hectare. | **Land Tenure Fragmentation**: Communal land tenure systems divide holdings into small scattered plots unsuitable for large tractors. |
| **Timeliness of Operations**: Allows large acreage planting at the exact onset of tropical rains before moisture evaporates. | **High Initial Capital & Interest Rates**: Tractors require millions of Naira; commercial banks demand prohibitive collateral. |
| **Reduction in Human Drudgery**: Relieves physical toil, making agriculture attractive to educated Nigerian youth. | **Lack of Spare Parts & Skilled Mechanics**: Breakdown of imported machinery leads to abandonment in rural villages. |
| **Increased Food Output & National Security**: Expands food supply, dampening inflation and reducing food import bills. | **Soil Compaction & Erosion**: Heavy tractor tyres destroy fragile tropical soil crumb structures, creating hardpans. |

---

### 3. Tractor Maintenance Protocols

Machinery longevity depends on disciplined preventative servicing:

| Maintenance Tier | Scheduled Timing | Mandatory Checkpoints & Servicing Actions |
| :--- | :--- | :--- |
| **Daily (Routine) Checks** | Before starting tractor engine each morning | • Check engine oil level with dipstick.<br>• Inspect radiator coolant water level.<br>• Check fuel level and sediment bowl filter.<br>• Inspect tyre pressure and wheel lug nuts.<br>• Clean air cleaner pre-cup of dust. |
| **Periodic Servicing** | Every 50 to 100 hours of tractor field work | • Grease all zerk grease nipples with grease gun.<br>• Change engine lubricating oil and oil filter cartridge.<br>• Service fuel and hydraulic oil filters.<br>• Inspect fan belt tension and battery electrolyte. |
| **Seasonal / Storage** | At the conclusion of harvest season | • Wash implement completely and scrape off soil.<br>• Coat polished disc/mouldboard surfaces with grease to prevent rust.<br>• Store implements under roofed machinery shed off damp ground. |

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: Which of the following land tenure systems poses the greatest obstacle to farm mechanization in Nigeria?
  - A) Freehold purchase
  - B) Communal / inheritance fragmentation (*Correct — creates small, scattered, non-contiguous farm holdings*)
  - C) Leasehold system
  - D) State government allocation
- **Question 2**: Daily morning maintenance of a farm tractor before operation excludes:
  - A) Checking radiator water level
  - B) Complete engine overhaul (*Correct — performed periodically or upon engine failure, not daily*)
  - C) Checking engine oil level with dipstick
  - D) Inspecting tyre pressure`,
    keyTakeaways: [
      'Mechanization increases cultivated acreage, ensures timely operations, and eliminates human drudgery.',
      'Major Nigerian mechanization obstacles include land fragmentation, high capital costs, and scarcity of spare parts.',
      'Daily tractor checks include engine oil, radiator coolant, tyre pressure, and fuel sediment bowl.'
    ],
    associatedQuizId: 'waec-agric-ss1-q10'
  },

  // ==========================================
  // WEEK 11: IRRIGATION & DRAINAGE SYSTEMS
  // ==========================================
  {
    id: 'agric-ss1-term2-week11',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Irrigation & Drainage Systems: Methods, Engineering & Management',
    subtopics: [
      'Definition & Need for Irrigation in Nigeria (Fadama Farming)',
      'Surface (Furrow, Basin, Border) vs. Sub-Surface Irrigation',
      'Overhead Sprinkler vs. High-Efficiency Drip/Trickle Irrigation',
      'Drainage Systems: Surface Ditches vs. Underground Tile Drains'
    ],
    readingTimeMinutes: 8,
    summary: 'Master artificial water application and removal technologies, comparing furrow, sprinkler, and drip irrigation networks and drainage engineering.',
    contentMarkdown: `### 1. The Strategic Need for Irrigation in Nigeria

**Irrigation** is the artificial application of water to agricultural land to supply the moisture required for crop growth during dry seasons or drought spells.

- In Nigeria, rainfall is unimodal and brief ($3 - 5\\,\\text{months}$) in the northern Sahel/Sudan savanna, leaving $7 - 9\\,\\text{months}$ of harsh dry harmattan.
- Irrigation enables **year-round all-season farming (Fadama cultivation)** of high-value horticulture crops (tomatoes, onions, peppers, carrots) and wheat.

---

### 2. Comparative Analysis of Irrigation Systems

| Irrigation Method | Engineering Principle | Water Efficiency | Best Crop Suitability | Major Limitations |
| :--- | :--- | :--- | :--- | :--- |
| **Furrow (Surface)** | Water flows down small parallel channels between crop ridges under gravity. | $50 - 60\\%$ (High seepage loss) | Row crops (maize, cassava, sugarcane, vegetables) | Requires uniform land grading; causes waterlogging in heavy clays. |
| **Basin / Flood** | Flat bunded field flooded with continuous water sheet. | $40 - 50\\%$ (High evaporation) | Swamp paddy rice (*Oryza sativa*) | Massive water wastage; causes soil crusting and salinization. |
| **Overhead Sprinkler** | Water pumped under pressure through pipes and revolving nozzles, spraying like rain. | $70 - 80\\%$ | Large-scale pasture, cereals, golf courses | High pump fuel cost; wind distorts spray pattern; fungal leaf diseases. |
| **Drip / Trickle** | Water delivered directly at plant base through low-pressure emitters drop by drop. | **$90 - 95\\%$ (Maximum efficiency)** | Orchard fruit trees, greenhouse vegetables, arid zones | Emitter nozzles clog easily from algae/grit; high installation cost. |

---

### 3. Drip (Trickle) Irrigation Network

[Diagram: drip-irrigation-system]

#### Key Components:
1. **Control Station**: Water pump, pressure regulator, and **chemical venturi injector** allowing simultaneous watering and fertilization (**Fertigation**).
2. **Filtration Unit**: Sand and screen filters remove suspended silt, organic matter, and algae that would otherwise block the tiny emitter orifice ($0.5 - 1.5\\,\\text{mm}$).
3. **Distribution Network**: Main PVC pipe, sub-mains, and flexible black polyethylene lateral tubes laid along each crop row.
4. **Drip Emitters**: Calibrated nozzles discharging $1 - 4\\,\\text{liters/hour}$ directly at the root zone, eliminating weed growth in inter-row spaces.

---

### 4. Agricultural Drainage Systems

**Drainage** is the artificial removal of excess gravitational water from waterlogged land to restore root aeration:
- **Surface Drainage (Open Ditches)**: Excavated trenches with sloping sides that intercept and convey surface runoff away; cheap to dig but obstruct tractor movement and require frequent de-silting.
- **Sub-Surface Drainage (Tile / Perforated Pipe Drains)**: Buried perforated plastic pipes or clay tiles laid at gradient depths of $1 - 1.5\\,\\text{meters}$ beneath the field; invisible, does not obstruct machinery, but requires high initial excavation capital.

---

### 5. WAEC Checkpoint Practice Questions

- **Question 1**: Which irrigation system delivers water with the highest efficiency directly to crop roots with minimal evaporation loss?
  - A) Basin flooding
  - B) Furrow irrigation
  - C) Drip (trickle) irrigation (*Correct — 90-95% water use efficiency*)
  - D) Overhead sprinkler
- **Question 2**: The primary agronomic hazard of continuous flood irrigation in hot arid regions without adequate drainage is:
  - A) Soil acidification
  - B) Soil salinization (*Correct — rapid evaporation draws dissolved mineral salts to topsoil, creating toxic saline crusts*)
  - C) Nitrogen toxicity
  - D) Soil freezing`,
    keyTakeaways: [
      'Irrigation enables all-season Fadama farming, particularly across the dry northern Nigerian savannas.',
      'Drip irrigation achieves 90-95% efficiency by supplying calibrated water and fertilizers (fertigation) directly to crop roots.',
      'Drainage removes excess gravitational water to restore aerobic respiration in the crop root zone.'
    ],
    associatedQuizId: 'waec-agric-ss1-q11'
  },

  // ==========================================
  // WEEK 12: COMPREHENSIVE REVISION & DRILLS
  // ==========================================
  {
    id: 'agric-ss1-term2-week12',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 12,
    topicTitle: 'Comprehensive 2nd Term Agricultural Science Review & WAEC Drills',
    subtopics: [
      'Integrated Pedology, Mechanization & Surveying Concept Review',
      'Diagnostic Soil Nutrient & Fertilizer Rate Calculations',
      'Identification of Survey Tools, Machinery Parts & Rock Specimens',
      'Common WAEC Examiner Traps & Practical Examination Guidelines'
    ],
    readingTimeMinutes: 9,
    summary: 'Consolidate 12 weeks of SS 1 Agricultural Science with multi-topic practical past WAEC and NECO examination questions and detailed step-by-step solutions.',
    contentMarkdown: `### 1. Integrated 2nd Term Agricultural Science Master Review Map

This term interconnected four central pillars of agricultural production:
1. **Soil Science (Pedology)**: Weathering converts parent rocks into vertical **soil horizons** ($O, A, B, C, R$). Topsoil fertility is governed by texture, crumb structure, $pH$, and moisture status (capillary water).
2. **Soil Fertility & Biogeochemical Cycles**: Crops require primary macro-nutrients ($N, P, K$) and trace minerals. Nitrogen circulates through biological fixation (*Rhizobium*), nitrification (*Nitrosomonas* and *Nitrobacter*), and plant assimilation.
3. **Farm Surveying & Farmstead Planning**: Land boundaries and acreage are mapped using Gunter's chains and ranging poles to establish logical building layouts.
4. **Farm Mechanization & Engineering**: Implements (disc ploughs, harrows) and water systems (drip irrigation, tile drainage) multiply farm output while mitigating human drudgery.

---

### 2. High-Yield Multi-Topic WAEC Practical Drills

#### Drill 1: Fertilizer Nutrient Formulation Calculation
**Question**: An agricultural extension officer recommends applying $60\\,\\text{kg of Nitrogen}$ and $30\\,\\text{kg of Phosphate } (P_2O_5)$ per hectare to a maize field.
1. How many $50\\,\\text{kg}$ bags of **Urea ($46\\%\\,N$)** are required to supply the nitrogen?
2. How many $50\\,\\text{kg}$ bags of **Single Superphosphate ($18\\%\\,P_2O_5$)** are required?

- **Step 1: Nitrogen Calculation**:
  $$\\text{Mass of pure } N \\text{ per } 50\\text{kg bag of Urea} = 0.46 \\times 50\\,\\text{kg} = 23.0\\,\\text{kg of } N$$
  $$\\text{Bags of Urea required} = \\frac{60\\,\\text{kg}}{23.0\\,\\text{kg/bag}} = 2.61 \\approx \\mathbf{3\\text{ bags of Urea}}$$
- **Step 2: Phosphate Calculation**:
  $$\\text{Mass of } P_2O_5 \\text{ per } 50\\text{kg bag of SSP} = 0.18 \\times 50\\,\\text{kg} = 9.0\\,\\text{kg of } P_2O_5$$
  $$\\text{Bags of SSP required} = \\frac{30\\,\\text{kg}}{9.0\\,\\text{kg/bag}} = 3.33 \\approx \\mathbf{4\\text{ bags of SSP}}$$

---

#### Drill 2: Farm Surveying Distance Calculation
**Question**: A farmer's rectangular farm boundary measures $15\\,\\text{Gunter's chains}$ long by $8\\,\\text{chains}$ wide.
1. Calculate the area of the farm in **square chains**.
2. Convert the total area into **Acres** ($10\\,\\text{square chains} = 1\\,\\text{Acre}$).
3. Convert the total area into **Hectares** ($1\\,\\text{Hectare} \\approx 2.47\\,\\text{Acres}$).

- **Step 1: Square Chains**:
  $$\\text{Area} = 15 \\times 8 = \\mathbf{120\\text{ square chains}}$$
- **Step 2: Acres**:
  $$\\text{Area in Acres} = \\frac{120\\,\\text{sq. chains}}{10\\,\\text{sq. chains/Acre}} = \\mathbf{12.0\\text{ Acres}}$$
- **Step 3: Hectares**:
  $$\\text{Area in Hectares} = \\frac{12.0\\,\\text{Acres}}{2.47\\,\\text{Acres/Hectare}} = \\mathbf{4.86\\text{ Hectares}}$$

---

### 3. Top 5 Examiner Pitfalls to Avoid in WAEC Agricultural Science

| Common Student Pitfall | Correct WAEC Standard & Examination Protocol |
| :--- | :--- |
| **Confusing Soil Texture with Soil Structure** | **Texture** is the permanent relative proportion of particle sizes (sand, silt, clay); **Structure** is the reversible arrangement of particles into aggregates (crumbs, blocks). |
| **Misidentifying Nitrifying Bacteria** | *Nitrosomonas* converts ammonium to nitrite ($NO_2^-$); *Nitrobacter* converts nitrite to nitrate ($NO_3^-$). Do not reverse their sequence! |
| **Misunderstanding Gunter's Chain Units** | Gunter's chain is **66 feet long with 100 links** (each link = 7.92 inches). Ten square chains equal exactly **one acre**. |
| **Stating Mouldboard Plough is Ideal for West Africa** | Never recommend the mouldboard plough for virgin tropical bush; its fixed share breaks on tree roots. The **disc plough** is the correct answer. |
| **Listing Irrigation Disadvantages as "Too much water"** | Technical hazards must be cited: **soil salinization** (salt crust formation from evaporation), **waterlogging**, and **leaching of nutrients**. |

---

### 4. Practice Checkpoint Questions

- **Question 1**: An agricultural implement used for secondary tillage that breaks soil clods into fine tilth after primary ploughing is the:
  - A) Mouldboard plough
  - B) Disc harrow (*Correct*)
  - C) Subsoiler
  - D) Chisel plough
- **Question 2**: A soil sample has a pH of $4.5$. To raise its pH to an optimal $6.5$ for maize cultivation, the farmer should apply:
  - A) Ammonium sulfate
  - B) Agricultural limestone ($CaCO_3$) (*Correct — basic liming agent*)
  - C) Urea
  - D) Aluminum sulfate`,
    keyTakeaways: [
      'Fertilizer grade dictates active nutrient mass; NPK 15-15-15 has 15% N, 15% P₂O₅, and 15% K₂O.',
      'Gunter’s chain: 10 square chains = 1 acre = 0.405 hectares.',
      'Disc ploughs are essential for uncleared tropical bush because concave discs roll over buried roots.'
    ],
    associatedQuizId: 'waec-agric-ss1-q12'
  }
];
