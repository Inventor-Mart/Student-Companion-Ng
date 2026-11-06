import { CurriculumTopic } from '../types';

export const SS2_AGRIC_TOPICS: CurriculumTopic[] = [
  // --------------------------------------------------------------------------
  // WEEK 1: FARM MACHINERY & PRIMARY/SECONDARY TILLAGE IMPLEMENTS
  // --------------------------------------------------------------------------
  {
    id: 'ss2-agr-t2-w1',
    associatedQuizId: 'waec-agr-ss2-farm-machinery',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Farm Machinery: Tractors & Primary vs. Secondary Tillage Implements',
    subtopics: [
      'The Farm Tractor: Internal Combustion Engine, Power-Take-Off (PTO) Shaft, and Three-Point Linkage',
      'Primary Tillage Implements: Disc Plough vs. Mouldboard Plough Comparative Anatomy',
      'Secondary Tillage Implements: Disc Harrows, Spike-Tooth Harrows, Cultivators, and Ridgers',
      'Maintenance Routines: Daily Greasing, Hydraulic Fluid Top-up, and Rust Prevention',
      'Economic Benefits and Operational Limitations of Farm Mechanization in West Africa'
    ],
    readingTimeMinutes: 16,
    summary: 'The operational engineering of tractors, primary and secondary tillage implements, disc plough anatomy, and routine maintenance protocols.',
    contentMarkdown: `### 1. Primary Tillage Implements: Disc Plough vs. Mouldboard Plough

[Diagram: disc-plough-anatomy]

Tillage is the mechanical manipulation of the soil to produce a favorable seedbed for crop seed germination and root penetration.

| Feature | Disc Plough | Mouldboard Plough |
|---|---|---|
| **Soil Cutting Element** | Concave spherical steel discs rotating on a beam | Chisel share and curved mouldboard plate |
| **Suitability for Tropical Soils** | **Highly adapted to hard, dry, rocky, stony, and root-infested West African soils** | Best in soft, moist, stone-free, temperate soils |
| **Obstacle Handling** | **Rolls over underground roots and boulders** without breaking | Catches and bends/breaks when striking roots and heavy rocks |
| **Inversion Action** | Partially cuts, scoops, inverts, and mixes soil and weed seeds | Completely slices and inverts topsoil furrow slice upside down |
| **Draft Requirement** | Requires slightly higher tractor horsepower | Lower draft resistance in stone-free land |

---

### 2. Secondary Tillage Implements

Secondary tillage follows primary ploughing to pulverize large clods, level the seedbed, eradicate weed seedlings, and construct ridges or planting beds.

| Implement | Working Mechanism | Primary Agronomic Objective |
|---|---|---|
| **Disc Harrow** | Sets of small, closely spaced concave discs (gangs) | Pulverizes large clods into a fine, crumbly tilth |
| **Cultivator / Spring-Tine** | Vertical steel tines that shatter and loosen soil crust | Destroys weeds between rows and aerates compacted topsoil |
| **Ridger** | Opposing paired mouldboards throwing soil together | Constructs raised ridges and furrows for root/tuber crops (e.g. yam, cassava) |
| **Seed Planter / Drill** | Seed hopper, metering mechanism, furrow opener, and press wheel | Deposits seeds at uniform depth and spacing with automatic soil covering |`,
    keyTakeaways: [
      'Disc ploughs are superior for tropical soils because their revolving discs roll over roots and rocks without breaking.',
      'Primary tillage breaks and inverts virgin soil; secondary tillage pulverizes clods into fine tilth.',
      'Daily maintenance includes checking engine oil, water coolant levels, tire pressure, and greasing bearings.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 2: FARM POWER SOURCES & ELECTRIFICATION
  // --------------------------------------------------------------------------
  {
    id: 'ss2-agr-t2-w2',
    associatedQuizId: 'waec-agr-ss2-farm-power',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Farm Power Sources & Renewable Energy in Agriculture',
    subtopics: [
      'Human Power: High Versatility vs. Low Energy Output (0.1 Horsepower)',
      'Animal Traction: Work Bulls, Oxen, Donkeys, and Camels (Benefits and Trypanosomiasis Constraints)',
      'Mechanical Power: Tractor Engines and Stationary Generators',
      'Electrical Power: Grid vs. Solar Photovoltaic Systems for Irrigation and Cold Storage',
      'Wind & Biogas Power: Anaerobic Digestion of Cow Dung for Clean Cooking Energy'
    ],
    readingTimeMinutes: 15,
    summary: 'The comparative analysis of agricultural power sources: human, animal draft, mechanical, solar, and biogas energy applications across Nigerian farming systems.',
    contentMarkdown: `### 1. Comparative Analysis of Farm Power Sources

| Source of Farm Power | Output / Capacity | Merits | Demerits & Constraints in Nigeria |
|---|---|---|---|
| **Human Power** | $\\approx 0.075 - 0.10\\text{ kW}$ ($0.1\\text{ hp}$) | Intelligent decision making, handles delicate tasks (weeding, harvesting cocoa) | Easily fatigued, very slow, high labor cost during peak planting seasons |
| **Animal Draft Power** | $\\approx 0.5 - 0.8\\text{ hp}$ per pair of work bulls | Low initial capital, manure fertilizes soil, cheap maintenance | Restricted to tsetse-fly-free northern zones; prone to animal diseases |
| **Mechanical Power** | $40 - 150+\\text{ hp}$ (Tractor / Combine) | Immense speed, handles massive acreage, eliminates human drudgery | High capital cost, expensive fuel, shortage of skilled mechanics and spare parts |
| **Solar Photovoltaic** | Variable ($1 - 20+\\text{ kW}$) | Abundant tropical sunshine, zero ongoing fuel cost, silent operation | High initial battery and inverter installation cost |
| **Biogas Power** | Heat & electricity from methane ($CH_4$) | Utilizes agricultural farm wastes (cow dung, poultry droppings) sustainably | Requires technical expertise for anaerobic digester maintenance |`,
    keyTakeaways: [
      'Human labor has low power output (0.1 hp) and is the most common but limiting power source in smallholder farms.',
      'Animal traction is limited in southern Nigeria by tsetse flies transmitting animal trypanosomiasis (sleeping sickness).',
      'Solar-powered submersible pumps provide sustainable irrigation for dry-season fadama farming.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 3: FARM SURVEYING & FARMSTEAD PLANNING
  // --------------------------------------------------------------------------
  {
    id: 'ss2-agr-t2-w3',
    associatedQuizId: 'waec-agr-ss2-farm-surveying',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Farm Surveying Equipment, Baseline Mapping & Farmstead Planning',
    subtopics: [
      'Principles and Objectives of Farm Surveying: Boundary Determination and Acreage Calculation',
      'Standard Surveying Instruments: Gunter’s Chain, Measuring Tape, Ranging Poles, Arrows, and Prismatic Compass',
      'Setting Out Right Angles on the Field: The 3-4-5 Pythagorean Triangle Method',
      'Principles of Farmstead Planning: Zoning, Topography, Windward/Leeward Orientations',
      'Calculation of Farmland Acreage from Chain Survey Offset Traverses'
    ],
    readingTimeMinutes: 17,
    summary: 'The principles of farm surveying, operating standard instruments (Gunter’s chain, ranging poles, prismatic compass), setting out right angles, and farmstead layout planning.',
    contentMarkdown: `### 1. Principles of Farm Surveying

Farm surveying is the process of measuring, recording, and mapping the boundary lines, elevations, and features of a piece of farmland to determine its exact area and produce a topographical farm layout map.

---

### 2. Standard Farm Surveying Instruments

[Diagram: farm-surveying-instruments]

| Instrument | Physical Description | Practical Field Survey Function |
|---|---|---|
| **Gunter's Chain** | 100 galvanized steel links joined by rings; total length = **66 feet (20.12 meters)** | Measures long linear distances along baseline; 10 square chains = **1 acre** |
| **Survey Arrows (Pins)** | Steel wire pegs ($30 - 40\\text{ cm}$ long) with a loop handle at top | Stuck into ground to record the number of completed chain lengths measured |
| **Ranging Poles** | Wooden/metal poles ($2 - 3\\text{ m}$ high) painted in alternate $20\\text{ cm}$ red and white bands | Placed vertically at stations to mark straight alignment lines over long distances |
| **Prismatic Compass** | Magnetic compass with a prism eyepiece and degree scale | Measures magnetic bearings and boundary angles unchecked by local metal |
| **Theodolite** | Telescope mounted on a calibrated vertical and horizontal circle | Measures precise vertical and horizontal angles in contour topographic surveys |

---

### 3. Setting Out a Right Angle: The 3-4-5 Triangle Method
To establish a precise right angle ($90^\\circ$) off a baseline using a survey tape or chain:
1. Measure $3\\text{ meters}$ along the survey baseline from station point $A$ to point $B$.
2. Measure $4\\text{ meters}$ along the proposed perpendicular line from $A$ to point $C$.
3. Adjust the direction of line $AC$ until the hypotenuse distance between $B$ and $C$ equals exactly $5\\text{ meters}$ ($3^2 + 4^2 = 9 + 16 = 25 = 5^2$). Angle $\\angle BAC$ is now guaranteed to be a true $90^\\circ$ angle!

---

### 4. Farmstead Planning & Building Zoning Rules
- **Livestock Buildings (Poultry / Piggery):** Must be located on the **leeward side** (downwind) and at a reasonable distance from the farmhouse to prevent foul odors and flies from reaching residential quarters.
- **Farm Office & Living Quarters:** Situated on elevated, well-drained ground with good accessibility to the main entrance road.
- **Processing & Storage Units (Silos):** Positioned close to production fields and farm roads for easy vehicular loading.`,
    keyTakeaways: [
      'Gunter’s chain consists of 100 links measuring 66 feet (20.12 meters); 10 square chains equal 1 acre.',
      'The 3-4-5 method uses the Pythagorean theorem to set out accurate 90° right angles in the field.',
      'Locate livestock units downwind (leeward side) to prevent unpleasant odors from polluting farm living quarters.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 4: SOIL CHEMISTRY, PH & PLANT NUTRIENTS
  // --------------------------------------------------------------------------
  {
    id: 'ss2-agr-t2-w4',
    associatedQuizId: 'waec-agr-ss2-soil-chemistry',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Soil Science: Soil Chemistry, pH & Macro/Micro Plant Nutrients',
    subtopics: [
      'Soil Profile Horizons (O, A, B, C, R) and Pedological Horizons',
      'Classification of Plant Nutrients: Macro-nutrients vs. Micro-nutrients',
      'Essential Macro-nutrients: Nitrogen (N), Phosphorus (P), Potassium (K), Calcium, Magnesium, Sulfur',
      'Deficiency Symptoms in Crops: Chlorosis, Purpling of Leaves, Necrosis, and Stunting',
      'Soil Acidity (pH): Causes, Detrimental Effects, and Correction via Liming Materials'
    ],
    readingTimeMinutes: 17,
    summary: 'Soil horizon anatomy, the biochemical roles of plant macro/micro-nutrients, identifying diagnostic deficiency symptoms, and managing soil acidity through liming.',
    contentMarkdown: `### 1. Soil Profile Horizons

[Diagram: soil-profile-horizons]

The vertical cross-section of soil from the surface down to unweathered bedrock reveals distinct layers called **horizons**:
- **O-Horizon:** Organic layer of fresh and decomposing leaf litter.
- **A-Horizon (Topsoil):** Dark, crumbly layer rich in organic humus, roots, and soil microbes; holds maximum agricultural fertility.
- **B-Horizon (Subsoil):** Lighter colored layer where leached clay, iron oxides, and minerals accumulate (illuviation).
- **C-Horizon:** Weathered parent material consisting of broken rock fragments.
- **R-Horizon:** Solid, unyielding bedrock.

---

### 2. Major Plant Nutrients & Diagnostic Deficiency Symptoms

| Nutrient | Category | Physiological Role in Crop Plant | Typical Deficiency Symptoms |
|---|---|---|---|
| **Nitrogen (N)** | Primary Macro | Component of chlorophyll, amino acids, and proteins; promotes vegetative leaf growth | General **chlorosis** (yellowing) starting on older lower leaves; severely stunted spindly growth |
| **Phosphorus (P)**| Primary Macro | Component of ATP, DNA/RNA, and phospholipids; stimulates early root growth and seed formation | **Purple or reddish-bronze coloration** along leaf margins and veins; poor root branching |
| **Potassium (K)** | Primary Macro | Regulates stomatal opening/closing, enzyme activation, and disease resistance | **Marginal scorch / necrosis** (burnt edges) of older leaves; weak lodging stems |
| **Calcium (Ca)** | Secondary Macro| Component of calcium pectate in middle lamella of cell walls | Death of apical growing tips (blossom-end rot in tomatoes) |
| **Magnesium (Mg)**| Secondary Macro| Central metallic atom in chlorophyll ring structure | **Interveinal chlorosis** (leaf veins remain green while tissue between turns yellow) |
| **Iron (Fe)** | Micro-nutrient | Enzyme cofactor in chlorophyll synthesis pathway | Interveinal chlorosis on youngest upper leaves |

---

### 3. Soil Acidity & Liming Practices
- **Causes of Soil Acidity in Nigeria:** Heavy leaching of basic cations ($Ca^{2+}, Mg^{2+}, K^+$) by torrential tropical rains in the rainforest zone, use of acid-forming fertilizers (ammonium sulfate), and acidic root exudates.
- **Correction by Liming:** Adding basic materials such as **slaked lime ($Ca(OH)_2$)**, **quicklime ($CaO$)**, or **calcium carbonate ($CaCO_3$)** neutralizes excess hydrogen ions ($H^+$):
  $$CaCO_3(s) + 2H^+(aq) \\to Ca^{2+}(aq) + H_2O(l) + CO_2(g)$$`,
    keyTakeaways: [
      'Nitrogen deficiency causes general yellowing (chlorosis); phosphorus deficiency causes purple leaf margins.',
      'Magnesium is the central atom in chlorophyll; deficiency causes interveinal chlorosis.',
      'Soil acidity is corrected by liming materials like calcium carbonate, which neutralize excess H+ ions.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 5: ORGANIC MANURES & INORGANIC FERTILIZERS
  // --------------------------------------------------------------------------
  {
    id: 'ss2-agr-t2-w5',
    associatedQuizId: 'waec-agr-ss2-fertilizers-manures',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Soil Fertility: Organic Manures & Chemical Fertilizers',
    subtopics: [
      'Types of Organic Manures: Farmyard Manure (FYM), Compost, and Green Manure',
      'The Composting Process: Aerobic vs. Anaerobic Decomposition and C:N Ratio',
      'Inorganic Fertilizers: Straight Fertilizers (Urea, SSP) vs. Compound Fertilizers (NPK 15-15-15)',
      'Methods of Fertilizer Application: Broadcasting, Band Placement, Ring Method, Foliar Spray',
      'Calculations of Fertilizer Nutrients and Elemental Content'
    ],
    readingTimeMinutes: 16,
    summary: 'Soil fertility replenishment through organic manures and chemical fertilizers, compost preparation methods, application techniques, and nutrient percentage calculations.',
    contentMarkdown: `### 1. Organic Manures vs. Inorganic Chemical Fertilizers

| Feature | Organic Manure (e.g. Compost, FYM) | Inorganic Fertilizer (e.g. NPK 15-15-15, Urea) |
|---|---|---|
| **Nutrient Concentration** | Low and variable; bulk quantities required | **High and precisely calibrated** |
| **Nutrient Release Rate** | Slow and sustained (requires microbial mineralization) | **Fast-acting and immediately soluble** |
| **Effect on Soil Structure**| **Improves soil physical structure**, aeration, water retention, and microbial activity | Does not improve organic matter; can cause soil acidification if overused |
| **Leaching Losses** | Minimal leaching risk | High risk of nutrient runoff and groundwater eutrophication |

---

### 2. Methods of Fertilizer Application

| Method | Application Technique | Suitable Crops & Farming Scenarios |
|---|---|---|
| **Broadcasting** | Spreading fertilizer granules uniformly across the entire soil surface before or after ploughing | Close-spaced broadcast crops (e.g. rice, wheat, pasture grasses) |
| **Band / Row Placement** | Placing fertilizer in continuous bands $5 - 8\\text{ cm}$ beside and below crop seeds | Row crops (maize, sorghum) to prevent fertilizer-seed contact burn |
| **Ring Method** | Applying fertilizer in a circular trench $15 - 30\\text{ cm}$ around base of tree/crop canopy | Tree crops (cocoa, oil palm, citrus) and widely spaced vegetables |
| **Foliar Spray** | Dissolving soluble fertilizer in water and spraying mist directly onto leaves | Fast correction of trace micronutrient deficiencies (iron, zinc) |
| **Fertigation** | Injecting dissolved soluble fertilizers directly into irrigation water pipelines | Drip-irrigated commercial greenhouse vegetables |

---

### 3. Worked Fertilizer Nutrient Calculation
**Problem:** A farmer purchases a $50\\text{ kg}$ bag of NPK 20-10-10 fertilizer. Calculate the actual mass of elemental Nitrogen ($N$) contained in the bag.

1. In NPK 20-10-10, the percentage of Nitrogen is **$20\\%$**.
2. Actual mass of Nitrogen:
   $$\\text{Mass of } N = \\frac{20}{100} \\times 50\\text{ kg} = 10.0\\text{ kg of pure Nitrogen}$$`,
    keyTakeaways: [
      'Organic manures improve soil physical structure, water retention, and microbial biodiversity.',
      'Band placement applies fertilizer in continuous lines beside seeds to prevent germination burn.',
      'A 50kg bag of NPK 20-10-10 contains exactly 10kg of nitrogen, 5kg of phosphorus, and 5kg of potassium.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 6: MID-TERM REVIEW & AGRONOMIC CALCULATIONS
  // --------------------------------------------------------------------------
  {
    id: 'ss2-agr-t2-w6',
    associatedQuizId: 'waec-agr-ss2-agronomic-calculations',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Mid-Term Agronomic Calculations: Plant Population & Fertilizer Rates',
    subtopics: [
      'Plant Population Formula: $\\text{Population} = \\frac{\\text{Total Farmland Area}}{\\text{Plant Spacing}}$',
      'Calculating Plant Population per Hectare with Multiple Seeds per Stand',
      'Determining Fertilizer Application Rates for Specific Field Acreage',
      'Step-by-Step Marking Rubric Standards in WAEC Agricultural Calculations'
    ],
    readingTimeMinutes: 14,
    summary: 'Consolidation clinic mastering quantitative agronomic problems: plant populations per hectare, spacing dimensions, and fertilizer quantity determinations.',
    contentMarkdown: `### 1. Plant Population Calculations

The **theoretical plant population** ($P$) in a farm plot of given area is calculated as:

$$\\text{Plant Population} = \\frac{\\text{Total Farmland Area } (m^2)}{\\text{Inter-row Spacing } (m) \\times \\text{Intra-row Spacing } (m)} \\times \\text{Seeds per Stand}$$

- Note: $1\\text{ Hectare} = 10,000\\text{ m}^2$.

#### Worked WAEC Examination Problem:
A farmer planted maize on a $2.0\\text{-hectare}$ plot of land at a spacing of $75\\text{ cm} \\times 25\\text{ cm}$, planting $1\\text{ seed per stand}$. Calculate:
1. The expected total plant population on the farm.
2. If $10\\%$ of the seeds failed to germinate, calculate the surviving crop population.

**Step 1: Calculate Total Farmland Area:**
$$\\text{Area} = 2.0 \\times 10,000\\text{ m}^2 = 20,000\\text{ m}^2$$

**Step 2: Convert Spacing Dimensions from Centimeters to Meters:**
- Inter-row spacing: $75\\text{ cm} = 0.75\\text{ m}$
- Intra-row spacing: $25\\text{ cm} = 0.25\\text{ m}$
- Area occupied by one plant stand = $0.75 \\times 0.25 = 0.1875\\text{ m}^2$

**Step 3: Compute Expected Total Plant Population:**
$$\\text{Population} = \\frac{20,000}{0.1875} = 106,666.67 \\approx 106,667\\text{ plants}$$

**Step 4: Calculate Surviving Population after 10% Mortality:**
$$\\text{Surviving Population} = 106,667 \\times (1 - 0.10) = 106,667 \\times 0.90 = 96,000\\text{ plants}$$`,
    keyTakeaways: [
      'Always convert crop spacing dimensions from centimeters to meters before calculating area.',
      'One hectare equals exactly 10,000 square meters.',
      'Multiply by the number of seeds per stand if more than one seed is planted per hole.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 7: CROP HUSBANDRY (CEREALS & GRAIN LEGUMES)
  // --------------------------------------------------------------------------
  {
    id: 'ss2-agr-t2-w7',
    associatedQuizId: 'waec-agr-ss2-cereals-legumes',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Crop Husbandry: Cultivation of Cereals (Maize, Rice) & Legumes (Cowpea)',
    subtopics: [
      'Botanical Classification: Poaceae (Gramineae) vs. Fabaceae (Leguminosae)',
      'Cultivation of Maize (*Zea mays*): Soil Preparation, Spacing, Weeding, and Fertilizer Regimen',
      'Cultivation of Swamp and Upland Rice (*Oryza sativa*): Nursery, Puddling, and Parboiling',
      'Cultivation of Cowpea (*Vigna unguiculata*): Rhizobium Inoculation and Pod Borer Control',
      'Post-Harvest Processing and Storage (Cribs, Silos, and Hermetic Bags)'
    ],
    readingTimeMinutes: 16,
    summary: 'Agronomic practices for major West African cereals and grain legumes: land preparation, sowing, nutrient management, pest control, and grain storage.',
    contentMarkdown: `### 1. Cultivation Profiles: Maize vs. Cowpea

| Agronomic Parameter | Maize (*Zea mays*) | Cowpea (*Vigna unguiculata*) |
|---|---|---|
| **Botanical Family** | Poaceae (Monocotyledonous grass) | Fabaceae (Dicotyledonous legume) |
| **Soil Requirements** | Well-drained, fertile sandy-loam ($pH \\approx 5.5 - 7.0$) | Tolerates poorer sandy soils; sensitive to waterlogging |
| **Recommended Spacing** | $75\\text{ cm} \\times 25\\text{ cm}$ (1 seed) or $75\\text{ cm} \\times 50\\text{ cm}$ (2 seeds) | $75\\text{ cm} \\times 20\\text{ cm}$ or $60\\text{ cm} \\times 30\\text{ cm}$ |
| **Fertilizer Regimen** | High Nitrogen demand: NPK 15-15-15 at planting + Urea top-dressing at 4–6 weeks | Low nitrogen required (fixes atmospheric $N_2$ via *Rhizobium*); requires **Single Superphosphate (SSP)** for root nodulation |
| **Major Insect Pests** | Stem borers (*Busseola fusca*), Fall armyworm (*Spodoptera frugiperda*) | Maruca pod borer (*Maruca vitrata*), Cowpea bruchid weevil (*Callosobruchus maculatus*) |
| **Major Diseases** | Maize rust (*Puccinia polysora*), Maize streak virus | Cowpea mosaic virus, Anthracnose |

---

### 2. Rice Processing: The Parboiling Process
Parboiling is the hydrothermal treatment of harvested paddy rice before milling:
1. **Soaking:** Raw paddy is soaked in hot water ($65 - 70^\\circ\\text{C}$) to hydrate the starch granules.
2. **Steaming:** Paddy is steamed under pressure, which gelatinizes the starch and **causes water-soluble vitamins (Thiamine/B1) from the aleurone layer to migrate inward into the endosperm**.
3. **Drying:** Sun-dried slowly to $12 - 14\\%$ moisture before milling.
- **Benefits:** Hardens the grain (reducing breakage during dehulling) and significantly enhances nutritional vitamin content.`,
    keyTakeaways: [
      'Maize is a heavy nitrogen feeder, whereas cowpeas fix their own nitrogen via symbiotic root Rhizobium bacteria.',
      'Parboiling drives B-vitamins into the rice endosperm and reduces grain breakage during milling.',
      'Cowpea bruchid weevil (Callosobruchus maculatus) is the primary destructive storage pest of harvested beans.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 8: CROP HUSBANDRY (ROOTS, TUBERS & BEVERAGES)
  // --------------------------------------------------------------------------
  {
    id: 'ss2-agr-t2-w8',
    associatedQuizId: 'waec-agr-ss2-tubers-beverages',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Crop Husbandry: Roots & Tubers (Yam, Cassava) & Tree Crops (Cocoa)',
    subtopics: [
      'Cultivation of Yam (*Dioscorea spp.*): Sett Preparation, Mounding, Staking, and Milking',
      'Cultivation of Cassava (*Manihot esculenta*): Stem Cuttings, Cyanogenic Glucoside Toxicity, and Processing',
      'Cultivation of Cocoa (*Theobroma cacao*): Nursery Propagation, Shading, Pruning, and Fermentation',
      'Processing of Cocoa Beans: Pod Breaking, Sweating/Fermentation (6 days), and Sun Drying',
      'Pest and Disease Complex: Black Pod Disease (*Phytophthora*) and Capsid Bugs'
    ],
    readingTimeMinutes: 17,
    summary: 'The production technology of economic root and tuber crops and the plantation management of cash tree crops (cocoa) with emphasis on post-harvest processing.',
    contentMarkdown: `### 1. Yam Husbandry (*Dioscorea rotundata*)

- **Propagation:** Propagated vegetatively using seed yams or **yam setts** ($200 - 300\\text{ g}$ cut pieces) treated with wood ash or fungicide to prevent rot.
- **Mounding:** Grown on high mounds ($1\\text{ meter}$ high) or deep ridges to provide loose soil for unrestricted tuber expansion.
- **Staking:** Providing tall bamboo or wooden stakes ($2 - 3\\text{ m}$) for yam vines to climb. **Agronomic purpose:** Exposes leaves to maximum solar radiation for enhanced photosynthesis and keeps foliage away from fungal soil splash.
- **Milking (Double Harvesting):** Carefully harvesting the first early tuber mid-season while leaving the roots and vine intact to produce secondary seed yams.

---

### 2. Cocoa Fermentation & Curing (*Theobroma cacao*)

Cocoa is Nigeria's most lucrative non-oil export crop. Proper fermentation is essential to produce the distinctive chocolate aroma precursors:
1. **Pod Breaking:** Ripe pods are cracked open with wooden mallets (never machetes, to avoid slashing beans).
2. **Sweating / Fermentation (5–7 Days):** Wet beans are piled in heaps covered with banana leaves or placed in perforated wooden sweat boxes.
   - Microorganisms ferment the sugary mucilage pulp, generating temperatures of $45 - 50^\\circ\\text{C}$.
   - Kills the seed embryo, reduces bitterness, and develops the chocolate brown color and aroma precursors.
3. **Sun Drying:** Fermented beans are spread on raised bamboo mats in the sun until moisture drops to $7\\%$.`,
    keyTakeaways: [
      'Staking yam vines elevates leaves to maximize sunlight interception and prevents soil-borne fungal diseases.',
      'Cassava contains cyanogenic glucosides (linamarin) that must be removed by grating, fermenting, and roasting (garri).',
      'Cocoa fermentation (5–7 days under banana leaves) kills the embryo and develops the chocolate aroma precursors.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 9: WEED BIOLOGY & INTEGRATED WEED MANAGEMENT
  // --------------------------------------------------------------------------
  {
    id: 'ss2-agr-t2-w9',
    associatedQuizId: 'waec-agr-ss2-weed-control',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Crop Protection: Weed Biology, Dispersal & Integrated Control',
    subtopics: [
      'Definition of Weeds: Plants Growing Where They Are Not Desired',
      'Harmful Effects of Weeds: Competition for Light, Water, Space, and Nutrients',
      'Botanical Adaptations for Survival (Prolific Seed Production, Deep Rhizomes, Dormancy)',
      'Common Agricultural Weeds in Nigeria (*Striga hermonthica, Imperata cylindrica, Cyperus rotundus*)',
      'Integrated Weed Management: Cultural, Mechanical, Biological, and Chemical Control (Herbicides)'
    ],
    readingTimeMinutes: 16,
    summary: 'The economic impact of weeds, morphological survival mechanisms, identification of major Nigerian weed species, and integrated herbicide management.',
    contentMarkdown: `### 1. Problematic Agricultural Weeds in Nigeria

A **weed** is any plant growing out of place and interfering with agricultural production.

| Common Name | Botanical Name | Life Cycle & Morphology | Destructive Mechanism / Habitat |
|---|---|---|---|
| **Witchweed** | *Striga hermonthica* | Obligate parasitic weed | Attaches to cereal roots (maize, sorghum); siphons nutrients causing complete crop failure |
| **Spear Grass** | *Imperata cylindrica* | Perennial grass with sharp rhizomes | Fierce competitor in savanna; underground rhizomes survive bushfires and pierce crop tubers |
| **Siam Weed** | *Chromolaena odorata* | Perennial shrub | Rapid colonizer in rainforest; forms dense thickets that smother young plantation crops |
| **Nut Grass** | *Cyperus rotundus* | Perennial sedge with underground tubers | Extremely difficult to eradicate due to extensive underground chain of tubers |
| **Elephant Grass** | *Pennisetum purpureum*| Tall perennial grass | Chokes field crops; useful as livestock forage and soil mulch |

---

### 2. Classification of Herbicides

Herbicides are chemical formulations used to kill or suppress weed vegetation:
1. **By Selectivity:**
   - **Selective Herbicides:** Kills specific weeds without injuring the crop (e.g. *Atrazine* kills broadleaf weeds in maize fields; *2,4-D* kills broadleaves in grass pastures).
   - **Non-Selective (Broad-spectrum) Herbicides:** Kills all green plant tissue it contacts (e.g. *Glyphosate, Paraquat* used for pre-planting land clearing).
2. **By Time of Application:**
   - **Pre-emergence:** Applied to the soil surface before weed seedlings emerge.
   - **Post-emergence:** Applied directly to growing weed foliage after germination.`,
    keyTakeaways: [
      'Striga is a parasitic weed that attaches to cereal roots, causing severe stunting and chlorosis.',
      'Selective herbicides (like Atrazine in maize) destroy weeds without harming the crop.',
      'Non-selective herbicides like Glyphosate kill all green plant tissue upon contact.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 10: PESTS AND DISEASES OF CROPS
  // --------------------------------------------------------------------------
  {
    id: 'ss2-agr-t2-w10',
    associatedQuizId: 'waec-agr-ss2-pests-diseases',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Crop Protection: Insect Pests & Pathogenic Diseases',
    subtopics: [
      'Classification of Insect Pests by Mouthparts: Biting/Chewing, Piercing/Sucking, Boring',
      'Economic Damage Caused by Crop Pests (Direct Yield Loss and Transmission of Viral Vectors)',
      'Major Crop Diseases in Nigeria: Fungal (Smuts, Rusts, Blights), Bacterial (Wilts), Viral (Mosaic)',
      'The Disease Triangle: Susceptible Host, Virulent Pathogen, and Favorable Environment',
      'Principles of Integrated Pest Management (IPM)'
    ],
    readingTimeMinutes: 16,
    summary: 'Taxonomy of insect pests by feeding habits, pathogen classification (fungi, bacteria, viruses), disease symptoms, and integrated pest management (IPM).',
    contentMarkdown: `### 1. Classification of Insect Pests by Mouthparts

| Mouthpart Group | Feeding Mechanism & Damage Caused | Major Insect Pests | Affected Crops |
|---|---|---|---|
| **Biting & Chewing** | Strong mandibles that chew and devour leaves, stems, and flowers; reduces photosynthetic area | • Grasshoppers (*Zonocerus variegatus*)<br>• Armyworms (*Spodoptera*)<br>• Beetles | Cassava, maize, vegetables |
| **Piercing & Sucking** | Needle-like stylets that pierce plant tissues and suck cell sap; causes wilting and transmits viral diseases | • Aphids (*Aphis gossypii*)<br>• Whiteflies (*Bemisia tabaci*)<br>• Capsids / Mirids | Whiteflies transmit Cassava Mosaic Virus; Aphids transmit rosette |
| **Boring** | Larvae bore deep into stems, fruits, or grains, hollowing out internal tissue | • Stem borers (*Busseola fusca*)<br>• Weevils (*Sitophilus zeamais*)<br>• Pod borers | Maize stalks, stored grains, cowpea pods |

---

### 2. Major Nigerian Crop Diseases

| Disease Name | Causal Agent | Crop Affected | Symptoms & Diagnostic Signs | Preventive & Control Measures |
|---|---|---|---|---|
| **Cassava Mosaic Disease (CMD)** | **Virus** (transmitted by whitefly *Bemisia tabaci*) | Cassava | Mottling, severe leaf curling, distortion, and stunting | Plant CMD-resistant varieties (IITA TMS clones); rogue infected plants |
| **Black Pod Disease** | **Fungus** (*Phytophthora palmivora*) | Cocoa | Brown watery spots on pods that rapidly turn black and mummify | Regular spray of copper-based fungicides (Ridomil); frequent harvesting |
| **Groundnut Rosette** | **Virus** (transmitted by aphids) | Groundnut | Extreme stunting, bush-like clusters of tiny chlorotic leaves | Spray systemic insecticides to kill aphid vectors; early planting at close spacing |
| **Maize Smut** | **Fungus** (*Ustilago maydis*) | Maize | Huge swollen galls on ears and tassels filled with black powdery sooty spores | Crop rotation; destroy infected galls before spores disperse |`,
    keyTakeaways: [
      'Whiteflies transmit Cassava Mosaic Virus; aphids transmit Groundnut Rosette Virus.',
      'Black pod disease of cocoa is caused by the fungus Phytophthora and controlled by copper fungicides.',
      'Integrated Pest Management (IPM) combines cultural, biological, and chemical methods to minimize ecological damage.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 11: FOREST MANAGEMENT & AGROFORESTRY
  // --------------------------------------------------------------------------
  {
    id: 'ss2-agr-t2-w11',
    associatedQuizId: 'waec-agr-ss2-forestry-agroforestry',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Forest Management: Silviculture, Taungya Farming & Agroforestry',
    subtopics: [
      'Importance of Forests: Timber Products, Non-Timber Forest Products (NTFPs), and Ecological Services',
      'Valuable Nigerian Timber Species: Iroko, Mahogany, Obeche, Ebony, and Teak',
      'Forest Management Practices: Selective Exploitation, Afforestation, and Deforestation Hazards',
      'Taungya Farming System: Integrating Arable Crops with Young Tree Saplings',
      'Agroforestry: Alley Cropping, Windbreaks/Shelterbelts, and Great Green Wall Initiative'
    ],
    readingTimeMinutes: 15,
    summary: 'Silvicultural practices, economic timber species of Nigeria, taungya farming, shelterbelts, and biodiversity conservation in tropical forest ecosystems.',
    contentMarkdown: `### 1. Economic Forest Trees in Nigeria

| Tree Species | Common / Local Name | Ecological Forest Zone | Commercial Utility & Wood Characteristics |
|---|---|---|---|
| *Milicia excelsa* | **Iroko** | Lowland Rainforest | Extremely durable, termite-resistant hardwood; used for bridges, boat building, and heavy furniture |
| *Khaya grandifoliola* | **Mahogany** | Moist Rainforest | High-value reddish-brown decorative cabinet wood; musical instruments |
| *Triplochiton scleroxylon*| **Obeche** | Semi-deciduous Forest | Soft, lightweight, pale yellow wood; used for plywood, ceiling boards, and matchsticks |
| *Diospyros crassiflora* | **Ebony** | Dense Evergreen Rainforest | Heavy, jet-black, dense hardwood; sculptures and piano keys |
| *Tectona grandis* | **Teak** | Exotic Plantation Species | High tensile strength; electrical poles and commercial shipbuilding |

---

### 2. Agroforestry Systems: Taungya & Alley Cropping

- **The Taungya System:** A forestry management practice where landless local farmers are permitted to cultivate food crops (maize, cassava, beans) alongside young forest tree saplings on cleared forest land until the tree canopy closes (usually 3–4 years).
  - *Benefits to Forestry:* Farmers keep the young plantation weeded at zero labor cost to the forestry department.
  - *Benefits to Farmers:* Provides fertile arable land for subsistence food production.
- **Alley Cropping:** Planting food crops in "alleys" between rows of nitrogen-fixing trees or shrubs (e.g. *Leucaena leucocephala*, *Gliricidia sepium*). The shrubs are pruned periodically, and their leaves serve as nutrient-rich green mulch.
- **Shelterbelts / Windbreaks:** Bands of trees planted across the direction of prevailing harmattan winds in northern Nigeria (e.g. Kano, Sokoto) to reduce wind velocity, prevent topsoil erosion, and combat desert encroachment.`,
    keyTakeaways: [
      'Iroko is a premier termite-resistant hardwood; Obeche is a lightweight wood used for plywood.',
      'The Taungya system combines arable food crops with young plantation tree seedlings until canopy closure.',
      'Shelterbelts in northern Nigeria reduce wind speeds and prevent arid topsoil erosion.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 12: IRRIGATION, DRAINAGE & TERMINAL REVISION
  // --------------------------------------------------------------------------
  {
    id: 'ss2-agr-t2-w12',
    associatedQuizId: 'waec-agr-ss2-irrigation-drainage',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 12,
    topicTitle: 'Water Management: Irrigation Systems, Drainage & Specimen Identification',
    subtopics: [
      'Definition and Importance of Irrigation in Year-Round Crop Production',
      'Comparison of Irrigation Systems: Surface (Furrow, Basin), Overhead (Sprinkler), and Drip/Trickle',
      'Agricultural Drainage Systems: Surface Ditches vs. Underground Perforated Tile Drains',
      'Terminal Practical Identification: Farm Tools, Rock Types, Fertilizers, Weeds, and Crop Pests',
      'Comprehensive Review of SS 2 Second Term Agricultural Science'
    ],
    readingTimeMinutes: 16,
    summary: 'Water management technologies in agriculture: comparing irrigation and drainage systems, drip irrigation efficiencies, and terminal specimen identification drills.',
    contentMarkdown: `### 1. Comparative Analysis of Irrigation Systems

[Diagram: drip-irrigation-system]

**Irrigation** is the artificial application of water to the soil to supplement insufficient rainfall for optimal crop production.

| Irrigation System | Application Method | Water Use Efficiency | Advantages | Disadvantages |
|---|---|---|---|---|
| **Surface (Furrow / Basin)** | Water flows by gravity over the ground surface | Low ($40 - 50\\%$) | Low initial capital; requires no fuel or pumping electricity | High evaporation losses; risks soil waterlogging and salinization |
| **Overhead (Sprinkler)** | High-pressure nozzles spray simulated raindrops over the field | Moderate ($70 - 75\\%$) | Suitable for undulating topography; washes dust off leaves | High pumping energy costs; high evaporative loss on windy days |
| **Drip / Trickle** | Emitters deliver water directly to the plant root zone drop by drop | **Highest ($90 - 95\\%$)** | **Minimal water loss**; suppresses weed growth in inter-rows; eliminates leaf splash fungal diseases | High capital cost; emitters prone to clogging by algae and mineral deposits |

---

### 2. Agricultural Drainage Systems

**Drainage** is the removal of excess gravitational water from waterlogged farmland to improve soil aeration and root respiration.
- **Surface Drainage:** Digging open ditches or field furrows to convey excess surface runoff away into a central stream. Cheap to construct but interferes with tractor implements.
- **Subsurface Drainage:** Installing buried perforated corrugated plastic pipes or porous clay tiles beneath the soil. Does not obstruct farm machinery but requires high capital outlay.

---

### 3. WAEC Practical Specimen Identification Checklist
In WAEC Practical Paper 3, candidates are presented with lettered specimens ($A, B, C...$):
1. **Specimen A (Disc Plough):** Identify beam, standard, concave disc, scraper, and furrow wheel.
2. **Specimen B (NPK Fertilizer):** Granular structure, water-soluble, tested by adding water and feeling temperature change.
3. **Specimen C (Cowpea Weevil - *Callosobruchus*):** Elytra shorter than abdomen, puncturing storage beans.
4. **Specimen D (Ranging Pole):** Painted in alternate red and white $20\\text{ cm}$ bands for alignment.`,
    keyTakeaways: [
      'Drip irrigation achieves the highest water efficiency (90-95%) by delivering water directly to crop root zones.',
      'Drainage removes excess water to restore soil aeration and prevent anaerobic root asphyxiation.',
      'In practical exams, always specify whether an implement is for primary tillage (disc plough) or secondary tillage (harrow).'
    ]
  }
];
