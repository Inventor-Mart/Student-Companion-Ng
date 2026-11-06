import { CurriculumTopic } from '../types';

export const SS3_AGRIC_TOPICS: CurriculumTopic[] = [
  // ==========================================
  // WEEK 1: FARM POWER & ENERGY SOURCES
  // ==========================================
  {
    id: 'agric-ss3-term2-week1',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Farm Power & Energy Sources: Human, Animal, Mechanical, Electrical, Solar & Wind Power',
    subtopics: [
      'Classification of Farm Power Sources: Internal vs. External Energy Forms',
      'Comparative Evaluation: Human Power, Draught Animal Power (Work Bulls, Donkeys)',
      'Mechanical Power (Tractors, Engines) and Electrical Energy Utilization',
      'Renewable Energy Sources in Nigerian Agriculture: Solar Dryers, Wind Pumps, and Biogas'
    ],
    readingTimeMinutes: 9,
    summary: 'Compare agricultural power sources in Nigeria, evaluate draught animal and mechanical tractor power, and examine solar and wind energy applications.',
    contentMarkdown: `### 1. Classification of Farm Power Sources

**Farm power** refers to any source of mechanical, physical, or electrical energy applied to execute agricultural operations such as land preparation, cultivation, harvesting, processing, and transportation.

| Power Source | Primary Applications | Notable Advantages | Inherent Limitations |
| :--- | :--- | :--- | :--- |
| **Human Power** | Weeding, planting, precision harvesting, small-tool handling | Readily available; easily controlled; adaptable to irregular terrain and mixed cropping | Lowest power output ($\\approx 0.1\\text{ HP}$ per adult); easily fatigued; slow and labor-intensive; limited land area capacity |
| **Draught Animal Power** | Plowing, harrowing, cart haulage (White Fulani, Sokoto Gudali, Red Bororo cattle, donkeys) | Higher output than human labor ($\\approx 0.5 - 1.0\\text{ HP}$ per bullock pair); droppings provide manure; low initial capital cost | Susceptible to trypanosomiasis in the rainforest/guinea savanna; requires daily grazing and veterinary care; sluggish work speed |
| **Mechanical Power** | Tractor-drawn primary tillage, combine harvesting, motorized water pumping | Highest working rate and efficiency; operates continuously without biological fatigue; cultivates vast hectarage rapidly | High initial purchase price; expensive spare parts and diesel; requires skilled mechanical operators; risk of soil compaction |
| **Electrical Power** | Incubators, milking machines, grain dryers, cold storage, automated borehole pumps | Clean, quiet, efficient; easily automated with sensors and switches | Restricted to areas connected to national grid; erratic power supply in rural Nigeria; dangerous if insulation is damaged |
| **Solar Power** | Photovoltaic water pumping, solar cabinet crop dryers, electric perimeter fencing | Free, abundant sunshine across Nigeria; environmentally friendly; zero running fuel costs | High initial capital cost for photovoltaic panels and deep-cycle inverter batteries; reduced efficiency during heavy overcast rains |
| **Wind Power** | Multiblade wind pumps for livestock watering boreholes in Northern Nigeria | Renewable; zero emissions; self-operating in windy savanna regions | Dependent on steady wind velocities ($> 15\\text{ km/h}$); stationary; vulnerable to violent storm damage |

---

### 2. Draught Animal Utilization in Nigerian Savannas

In the Sudan and Sahel Savanna belts of Northern Nigeria (Kano, Katsina, Sokoto, Borno), draught bullocks are harnessed with a wooden shoulder yoke to draw the **Emcot ridger** or light mouldboard plough:
- Animals are conditioned through training between $2$ to $3$ years of age.
- A well-fed pair of work oxen can plough approximately $0.4\\text{ hectares (1 acre)}$ per day.
- **Constraints:** Heavy presence of the tsetse fly (*Glossina*) in Southern Nigeria limits animal traction to northern fly-free regions.

---

### 3. Biogas: Energy from Farm Waste

**Biogas** is a clean combustible gas mixture (predominantly $60\\% - 70\\%$ methane, $\\text{CH}_4$, and $30\\% - 40\\%$ carbon dioxide, $\\text{CO}_2$) produced by the anaerobic fermentation of livestock dung, crop residues, and poultry droppings in a sealed biogas digester:

$$\\text{Organic Biomass} \\underset{\\text{anaerobic bacteria}}{\\overset{35^\\circ\\text{C} - 37^\\circ\\text{C}}{\\longrightarrow}} \\text{CH}_4 + \\text{CO}_2 + \\text{Digested Slurry Biofertilizer}$$

- **Applications:** Cooking fuel for farm households, lighting, and running small stationary generators.
- **By-Product:** The spent effluent slurry is an odorless, pathogen-free biofertilizer rich in nitrogen, phosphorus, and potassium (NPK).`,
    keyTakeaways: [
      'Human power produces approximately 0.1 HP and is limited by biological fatigue and slow work rates.',
      'Draught animal traction is widely utilized in Northern Nigeria for tillage with Emcot ridgers, but is restricted from the south by tsetse flies.',
      'Mechanical tractor power provides the highest operational efficiency, but requires skilled maintenance and substantial capital investment.',
      'Biogas digesters convert animal waste into combustible methane gas and nutrient-rich organic fertilizer.'
    ],
    associatedQuizId: 'waec-ss3-agric-power-quiz'
  },

  // ==========================================
  // WEEK 2: FARM MACHINERY & TRACTOR IMPLEMENTS
  // ==========================================
  {
    id: 'agric-ss3-term2-week2',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Farm Machinery & Tractor Implements: Three-Point Linkage, Primary & Secondary Tillage Implements',
    subtopics: [
      'The Agricultural Tractor: Engine, Transmission, Three-Point Hydraulic Hitch & Power Take-Off (PTO)',
      'Primary Tillage Implements: Disc Plough vs. Mouldboard Plough Architecture and Functions',
      'Secondary Tillage Implements: Disc Harrow, Spike-Tooth Harrow, and Ridgers',
      'Planting, Harvesting, and Processing Machinery (Combine Harvester, Planters, Threshers)'
    ],
    readingTimeMinutes: 10,
    summary: 'Master tractor anatomy and hitch systems, distinguish disc and mouldboard ploughs, analyze secondary tillage implements, and study modern combine harvesters.',
    contentMarkdown: `### 1. The Farm Tractor Architecture

The **agricultural tractor** is a self-propelled, multi-purpose power unit designed to pull, carry, and drive an array of agricultural implements for tillage, planting, spraying, and harvesting.

[Diagram: agric-tractor-implement-coupling]

#### Key Tractor Operating Components:
1. **Three-Point Linkage Hitch:**
   - Consists of two lower draft links and one adjustable upper top link.
   - Operated by an internal hydraulic lift cylinder that raises, lowers, and controls the working depth of mounted implements.
2. **Power Take-Off (PTO) Shaft:**
   - A splined rotating drive shaft located at the rear of the tractor that transmits mechanical rotary power directly from the engine to driven implements (e.g., rotary tillers, balers, mist blowers, mower blades) at standard speeds ($540\\text{ or } 1000\\text{ RPM}$).
3. **Drawbar:**
   - A heavy horizontal steel hitching bar used to pull trailed, wheeled implements (e.g., farm trailers, heavy offset harrows).
4. **Differential Lock:**
   - A foot-pedal mechanical device that locks both rear drive wheels together to rotate at identical speeds, preventing wheel spinning when one tyre loses traction in muddy clay soils.

---

### 2. Primary Tillage Implements: Disc vs. Mouldboard Plough

**Primary tillage** is the initial major soil-inverting operation aimed at cutting, breaking up, and inverting compacted topsoil, burying surface weeds and crop stubble.

| Component / Feature | Disc Plough | Mouldboard Plough |
| :--- | :--- | :--- |
| **Soil Working Tool** | Concave circular steel discs (high-carbon steel) rotating on sealed bearings | Curved steel mouldboard attached to a sharp horizontal **share** and vertical **coulter** |
| **Soil Suitability** | Ideal for **hard, dry, stony, root-infested, or abrasive tropical soils** (e.g., typical Nigerian soils) | Ideal for **soft, stone-free, moist, cohesive soils** with uniform texture |
| **Obstacle Handling** | Discs roll over stones, stumps, and buried roots without breaking or stalling the tractor | The sharp share digs underneath; can easily bend or shear off when encountering heavy roots or rocks |
| **Weed Burial Quality** | Moderate inversion; some weed seeds remain partially exposed | Complete, perfect inversion of soil slice; thoroughly buries green manure and weeds |
| **Key Structural Parts** | Beam, concave disc, disc standard, scraper, furrow wheel | Beam, share, mouldboard, shin, landside, coulter, frog |

---

### 3. Secondary Tillage Implements: Harrows & Ridgers

**Secondary tillage** follows primary ploughing to pulverize soil clods, level seedbeds, destroy germinating weed seedlings, and construct ridges:

1. **The Disc Harrow:**
   - Consists of sets (gangs) of rotating concave discs mounted on a common axle, separated by spool spacers.
   - **Function:** Chops up large soil clods left by the plough, incorporates fertilizers into topsoil, and creates a fine tilth.
2. **The Ridger:**
   - Consists of two opposing mouldboard wings joined at a central share.
   - **Function:** Throws soil simultaneously to both left and right to construct raised ridges and furrows for tuber crops (yams, cassava, sweet potatoes) to facilitate root expansion and prevent waterlogging.

---

### 4. Advanced Harvesting Machinery: The Combine Harvester

A **combine harvester** is a large, self-propelled machine that executes five distinct grain-harvesting operations concurrently in a single pass across the field:
1. **Reaping / Cutting:** Revolving reel gathers standing cereal crops; oscillating cutter bar severs crop stalks.
2. **Feeding:** Auger and elevator canvas convey cut stalks into the threshing drum.
3. **Threshing:** Rotating rasp-bar drum beats seed grains free from straw and heads.
4. **Separating:** Vibrating straw walkers shake remaining loose grains from the straw.
5. **Winnowing & Cleaning:** Fan blower forces air through vibrating sieves, blowing away light chaff and dust while heavy clean grains drop into an elevator hopper that fills an onboard storage tank.`,
    keyTakeaways: [
      'The three-point linkage uses two lower draft links and an adjustable top link operated by hydraulics to mount and regulate implement depth.',
      'The PTO shaft delivers rotary mechanical power (at 540 or 1000 RPM) to driven machinery like balers and mowers.',
      'Disc ploughs roll over stumps and rocks, making them ideal for hard, root-infested tropical soils; mouldboard ploughs are suited to stone-free, moist soils.',
      'A combine harvester performs reaping, feeding, threshing, separating, and winnowing simultaneously in a single pass.'
    ],
    associatedQuizId: 'waec-ss3-agric-machinery-quiz'
  },

  // ==========================================
  // WEEK 3: MAINTENANCE & SERVICING OF FARM MACHINERY
  // ==========================================
  {
    id: 'agric-ss3-term2-week3',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Maintenance & Servicing of Farm Machinery: Routine Checks, Overhauls & Workshop Safety',
    subtopics: [
      'Importance of Regular Machinery Maintenance: Operational Safety, Life Extension, and Cost Reduction',
      'Daily Routine Pre-Start Checks: Engine Oil, Radiator Coolant, Battery, and Tyre Pressures',
      'Periodic Scheduled Servicing (50-Hour, 250-Hour, 1000-Hour Intervals): Filters and Greasing',
      'Long-Term Off-Season Storage Protocols and Agricultural Workshop Safety Precautions'
    ],
    readingTimeMinutes: 9,
    summary: 'Formulate daily pre-start maintenance checks for tractors, follow scheduled servicing procedures, execute off-season storage, and enforce workshop safety standards.',
    contentMarkdown: `### 1. Importance of Machinery Maintenance

Farm machinery operates under severe environmental conditions (heavy dust, abrasive soil, high tropical temperatures, and moisture). Systematic maintenance:
- Prevents sudden operational breakdowns during critical planting and harvesting seasons.
- Extends the economic working lifespan of expensive equipment.
- Maximizes fuel efficiency and preserves engine power.
- Ensures operator safety and minimizes workshop accidents.

---

### 2. Daily Routine Pre-Start Checks (The Daily Inspection)

Before starting a tractor engine each morning, the operator must carry out the following checks:

| Maintenance Check | Component Inspected | Proper Operational Procedure & Standard |
| :--- | :--- | :--- |
| **Engine Lubricating Oil** | Dipstick in engine block | Pull dipstick, wipe clean, re-insert fully, and remove. Oil level must sit comfortably between the **"MIN"** and **"MAX"** marks. Top up with recommended viscosity oil if low. |
| **Radiator Coolant Level** | Radiator header tank / cap | Check when engine is cold. Coolant (water + rust inhibitor/antifreeze) must cover the radiator cooling core tubes. Clean foreign chaff and weed seeds from radiator grille mesh. |
| **Fuel Level & Sediment Bowl** | Fuel tank & glass filter bowl | Check that fuel tank has adequate diesel for the day's work. Inspect glass sediment bowl; drain any accumulated water or sediment via the bottom thumb drain tap. |
| **Air Cleaner Unit** | Oil-bath or dry paper element air filter | In dusty conditions, empty dust cup and clean dry filter element with compressed air (or change oil in oil-bath air cleaner) to prevent abrasive dust entering cylinders. |
| **Tyre Inflation Pressure** | Front and rear pneumatic tyres | Use a pressure gauge. Front steering tyres: $\\approx 24 - 28\\text{ PSI}$; Rear drive tyres: $\\approx 12 - 16\\text{ PSI}$ (lower pressure increases traction contact area in fields). |
| **Battery & Electrical Cables** | Battery electrolyte and terminals | Inspect electrolyte level in cells (must cover lead plates by $10\\text{ mm}$); top up with distilled water only. Clean corrosion on terminals with warm water and coat with petroleum jelly. |

---

### 3. Periodic Scheduled Servicing

Farm machinery manufacturers prescribe maintenance schedules based on tractor operating hours recorded by the **tachometer / hour meter**:

- **Every 50 Operating Hours:**
  - Inject multi-purpose chassis grease into all grease nipples (steering tie-rods, front axle pivot, clutch linkages, three-point hitch joints) using a manual grease gun.
  - Check transmission and hydraulic fluid levels.
  - Check fan belt tension (belt should deflect about $10-15\\text{ mm}$ under thumb pressure).
- **Every 250 Operating Hours:**
  - Drain and replace engine crankcase oil while engine is warm.
  - Replace engine oil filter cartridge.
  - Replace primary and secondary fuel filter elements; bleed the diesel fuel injection system to eliminate trapped air bubbles.
- **Every 1000 Operating Hours:**
  - Drain and renew transmission and differential gear oils.
  - Service fuel injection nozzles and fuel injection pump.
  - Flush radiator cooling system and replace radiator hoses.

---

### 4. Off-Season Storage & Workshop Safety

When the farming season ends, machinery remains idle for months during the dry harmattan:

1. **Storage Preparation:**
   - Wash machine thoroughly to remove all mud, acidic manure residues, and crop sap.
   - Coat unpainted bare metallic surfaces (plough discs, mouldboard faces, cutter bars) with **used engine oil or anti-rust grease**.
   - Jack up the tractor and place sturdy wooden blocks beneath the axles to relieve pneumatic tyres of vehicle weight.
   - Slacken all V-belts to relieve tension.
   - Remove battery, store in a cool dry wooden shelf, and trickle-charge monthly.
2. **Workshop Safety Rules:**
   - Always wear steel-toed boots, eye goggles, and snug-fitting overalls (avoid loose ties or flowing sleeves near spinning PTO shafts).
   - Never crawl underneath a tractor supported solely by a hydraulic jack; always install certified heavy-duty jack stands.
   - Keep functional ABC dry-powder fire extinguishers and sand buckets accessible.`,
    keyTakeaways: [
      'Daily pre-start checks require inspecting engine oil with the dipstick, radiator coolant, tyre pressures, and the glass fuel sediment bowl.',
      'Clean unpainted working surfaces like plough discs and mouldboards with grease or waste oil to prevent rust during off-season storage.',
      'Jack up stored tractors on wooden blocks to prevent permanent tyre wall deformation.',
      'Never work beneath machinery supported only by hydraulic jacks; always deploy rigid mechanical safety stands.'
    ],
    associatedQuizId: 'waec-ss3-agric-maintenance-quiz'
  },

  // ==========================================
  // WEEK 4: ANIMAL HEALTH & DISEASE CONCEPTS
  // ==========================================
  {
    id: 'agric-ss3-term2-week4',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Animal Health & Disease Concepts: Predisposing Factors, Pathogens & Biosecurity Protocols',
    subtopics: [
      'Definition of Livestock Health vs. Disease and Economic Losses in Farm Enterprises',
      'Predisposing Factors: Environmental Stress, Malnutrition, Overcrowding, and Poor Ventilation',
      'Classification of Disease Pathogens: Viruses, Bacteria, Fungi, and Protozoa',
      'Transmission Routes, Farm Biosecurity, Quarantine Stations, and Prophylactic Measures'
    ],
    readingTimeMinutes: 9,
    summary: 'Define livestock disease concepts, evaluate predisposing environmental and nutritional stressors, classify pathogens, and implement farm biosecurity and quarantine protocols.',
    contentMarkdown: `### 1. Concept of Animal Health and Disease

In livestock production, **health** is the physiological state in which all biological organs, tissues, and systems function harmoniously, allowing the animal to express its genetic potential in growth, milk yield, egg production, and reproduction.

A **disease** is any structural, functional, or physiological departure from normal health, triggered by an infectious pathogen or nutritional/environmental stress, manifested through recognizable **clinical signs and symptoms**.

#### Economic Losses Triggered by Livestock Diseases:
- High mortality rates among young animals (piglets, chicks, calves).
- Reduced animal productivity (sharp decline in daily milk yield, egg drop syndrome, stunted growth).
- Loss of draft animal power and working capacity.
- Huge veterinary expenses for therapeutic drugs, antibiotics, and vaccines.
- Trade embargoes and international export bans on animal carcasses and hides.

---

### 2. Predisposing Factors (Susceptibility Triggers)

A **predisposing factor** is any internal or external condition that weakens an animal's immune system, rendering it more vulnerable to infection by pathogenic microorganisms:

1. **Environmental / Housing Factors:**
   - Overcrowding and high stocking densities.
   - Poor ventilation resulting in high concentrations of toxic ammonia gas ($NH_3$).
   - Damp, wet bedding providing ideal breeding environments for bacteria and coccidial oocysts.
   - Sudden extreme temperature fluctuations (chilling in rain or heat stress in direct tropical sun).
2. **Nutritional Factors:**
   - Malnutrition or feeding imbalanced diets deficient in essential minerals ($Ca, P$) and vitamins ($A, D$).
   - Feeding mouldy feed contaminated with dangerous fungal mycotoxins (e.g., aflatoxins).
   - Inadequate, contaminated drinking water supply.
3. **Genetic & Physiological Factors:**
   - Age: Neonates and young stock have immature immune systems.
   - Reproductive state: Pregnancy and lactation place heavy nutritional and metabolic strains on females.

---

### 3. Classification of Livestock Disease Pathogens

| Pathogen Class | Biological Nature & Properties | Resistance to Treatment | Classic Livestock Disease Examples |
| :--- | :--- | :--- | :--- |
| **Viruses** | Microscopic, obligate intracellular non-cellular entities containing either DNA or RNA | **Cannot be cured with antibiotics**; control relies strictly on preventive vaccination and quarantine | Newcastle disease, Rinderpest, Foot-and-Mouth Disease (FMD), African Swine Fever (ASF), Gumboro |
| **Bacteria** | Single-celled prokaryotic microorganisms that produce exotoxins or endotoxins | Treatable with specific **antibiotics** (penicillin, oxytetracycline) and chemotherapeutics | Anthrax, Contagious Bovine Pleuropneumonia (CBPP), Brucellosis, Tuberculosis, Fowl Cholera |
| **Fungi** | Non-photosynthetic eukaryotic multicellular organisms; reproduce via airborne spores | Resistant to antibacterial drugs; requires targeted **antifungal washes** | Ringworm (dermatophytosis), Aspergillosis (Brooder pneumonia in poultry chicks) |
| **Protozoa** | Microscopic single-celled eukaryotes; often vector-borne or waterborne | Controlled with specialized antiprotozoal drugs (diminazene, amprolium) and vector eradication | Trypanosomiasis (Nagana), Coccidiosis in poultry, Babesiosis (Redwater fever), Anaplasmosis |

---

### 4. Farm Biosecurity & Preventive Measures

**Biosecurity** is the implementation of management protocols designed to prevent the introduction and spread of infectious pathogens into a livestock farm:

1. **Footbaths & Wheel Dips:** Installing vehicle wheel dips and disinfectant footbaths (containing formalin, iodophor, or sodium hydroxide) at farm entrance gates.
2. **Quarantine Station:** Isolating newly purchased animals in a separate pen for **$30\\text{ days}$** to observe for latent disease signs before integration into the resident herd.
3. **All-In, All-Out System:** Stocking an entire poultry house simultaneously, harvesting them together, and thoroughly disinfecting and resting the building for $2\\text{ weeks}$ before introducing new batches.
4. **Routine Prophylaxis & Vaccination:** Strictly adhering to veterinary vaccination schedules (e.g., Lasota for Newcastle disease; Anthrax spore vaccine).`,
    keyTakeaways: [
      'Viral diseases cannot be cured with antibiotics; control depends on quarantine, biosecurity, and proactive vaccination.',
      'Predisposing factors like poor ventilation, damp bedding, and overcrowding suppress animal immunity.',
      'Newly acquired livestock must undergo a 30-day quarantine observation period before mixing with the farm herd.',
      'The all-in, all-out production system breaks the infectious cycle between successive animal batches.'
    ],
    associatedQuizId: 'waec-ss3-agric-disease-concepts-quiz'
  },

  // ==========================================
  // WEEK 5: SELECTED LIVESTOCK DISEASES I
  // ==========================================
  {
    id: 'agric-ss3-term2-week5',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Selected Livestock Diseases I: Anthrax, Tuberculosis, Foot-and-Mouth & Newcastle Disease',
    subtopics: [
      'Bacterial Diseases: Anthrax (Bacillus anthracis) and Bovine Tuberculosis (Mycobacterium bovis)',
      'Viral Diseases: Foot-and-Mouth Disease (Aphthovirus) and Rinderpest (Morbillivirus)',
      'Avian Pathologies: Newcastle Disease (Paramyxovirus) and African Swine Fever (Asfarviridae)',
      'Clinical Symptoms, Transmission Vectors, Post-Mortem Risks, and Prophylactic Vaccination Schedules'
    ],
    readingTimeMinutes: 10,
    summary: 'Study major bacterial and viral livestock diseases in Nigeria, identify symptoms and vectors, understand post-mortem anthrax risks, and apply vaccination schedules.',
    contentMarkdown: `### 1. Bacterial Diseases of Farm Animals

#### 1. Anthrax (Splenic Fever):
- **Causal Organism:** *Bacillus anthracis* (a gram-positive, rod-shaped, spore-forming bacterium).
- **Susceptible Hosts:** Cattle, sheep, goats, horses, and humans (zoonotic).
- **Transmission:** Ingestion of highly resilient bacterial spores present in contaminated pastures, soil, or bone meal.
- **Clinical Symptoms:**
  - Sudden, acute death without prior warning symptoms in peracute cases.
  - High fever ($41.5^\\circ\\text{C}$), shivering, and respiratory distress.
  - **Pathognomonic Sign:** Discharge of dark, tarry, non-clotting blood from all natural body orifices (nostrils, mouth, anus, vulva).
  - Rapid bloating and absence of rigor mortis after death.
- **Critical WAEC Examination Rule:** **Never open or perform a post-mortem autopsy on the carcass of an animal suspected to have died from anthrax!** Exposure to atmospheric oxygen causes vegetative bacteria to form extremely durable spores that contaminate soil for up to $50\\text{ years}$.
- **Control:** Burn carcass completely or bury at least $2\\text{ meters}$ deep in a pit covered with quicklime ($CaO$). Annual vaccination with Anthrax Spore Vaccine (ASV).

#### 2. Bovine Tuberculosis:
- **Causal Organism:** *Mycobacterium bovis* (acid-fast bacillus).
- **Susceptible Hosts:** Cattle, swine, and humans (transmitted to humans by drinking raw, unpasteurized infected milk).
- **Transmission:** Inhalation of airborne respiratory droplets or ingestion of feed contaminated with infected saliva or sputum.
- **Clinical Symptoms:** Chronic wasting (emaciation), persistent dry hacking cough, enlarged superficial lymph nodes, labored breathing.
- **Diagnosis & Control:** **Tuberculin skin test**. Positive reactors must be culled and slaughtered. Enforce compulsory milk pasteurization ($63^\\circ\\text{C}$ for $30\\text{ minutes}$ or $72^\\circ\\text{C}$ for $15\\text{ seconds}$).

---

### 2. Major Viral Diseases of Livestock

| Disease | Causal Organism | Susceptible Hosts | Characteristic Clinical Symptoms | Prevention & Control Measures |
| :--- | :--- | :--- | :--- | :--- |
| **Foot-and-Mouth Disease (FMD)** | *Aphthovirus* (Picornaviridae) | Cloven-hoofed animals (cattle, sheep, goats, pigs) | Blisters (vesicles) on tongue, dental pad, lips, and interdigital clefts of hooves; excessive ropy salivation; severe lameness; smacking of lips | Quarantine infected herds; disinfect premises with $4\\% \\text{ Na}_2\\text{CO}_3$; administer polyvalent inactivated FMD vaccines |
| **Rinderpest (Cattle Plague)** | *Morbillivirus* | Cattle, buffaloes | High fever; necrotic erosions inside mouth; foul-smelling bloody diarrhea (dysentery); extreme dehydration; rapid death | Global eradication achieved via tissue culture rinderpest vaccine (TCRV); strict international border quarantine |
| **Newcastle Disease (Ranikhet)** | *Avian Paramyxovirus-1* | Domestic poultry (chickens, turkeys, guinea fowls) | Respiratory distress, sneezing, coughing; greenish diarrhea; nervous signs: **twisted neck (torticolis)**, circling, paralysis; soft-shelled eggs; near $100\\%$ mortality | No treatment; strict vaccination schedule: Intraocular (Day 1), Komarov (Day 21), Lasota (Week 6), Roakin (Week 16) |
| **African Swine Fever (ASF)** | *Asfarvirus* | Domestic and wild pigs (warthogs) | High fever; cyanosis (bluish-purple discoloration) of skin on ears, snout, belly, and legs; bloody diarrhea; abortion; near $100\\%$ mortality | No vaccine or cure; eradicate infected herds; ban swill feeding; control soft ticks (*Ornithodoros*) |

---

### 3. Comprehensive Vaccination Schedule for Broiler Poultry in Nigeria

| Bird Age | Vaccine Administered | Target Disease | Mode of Administration |
| :--- | :--- | :--- | :--- |
| **Day 1** | Newcastle Disease Vaccine (NDV) Intraocular / Hitchner B1 | Newcastle Disease | Eye drop / nostril instillation |
| **Day 9 - 10** | Gumboro Vaccine (Infectious Bursal Disease) 1st Dose | Gumboro Disease | Oral administration in clean, chlorine-free drinking water |
| **Day 16 - 18** | Gumboro Vaccine 2nd Dose (Booster) | Gumboro Disease | Drinking water with skimmed milk powder stabilizer |
| **Day 21 - 24** | Newcastle Disease Vaccine (Lasota) | Newcastle Disease | Drinking water |
| **Week 6** | Fowl Pox Vaccine | Fowl Pox | Wing-web puncture method |`,
    keyTakeaways: [
      'Anthrax is caused by Bacillus anthracis; carcasses must never be opened, as vegetative cells form resistant spores in the presence of atmospheric oxygen.',
      'Foot-and-Mouth disease affects cloven-hoofed animals, causing blisters on hooves and oral mucosa and excessive ropy salivation.',
      'Newcastle disease produces greenish diarrhea, respiratory gasping, and torticollis (twisted neck) in domestic poultry.',
      'African Swine Fever causes cyanotic purple skin blotches and near 100% mortality in pigs, and has no commercial vaccine.'
    ],
    associatedQuizId: 'waec-ss3-agric-diseases1-quiz'
  },

  // ==========================================
  // WEEK 6: MID-TERM PRACTICAL AGRONOMY CLINIC
  // ==========================================
  {
    id: 'agric-ss3-term2-week6',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Mid-Term Assessment & Practical Agronomy Clinic: Farm Tools, Implement Identification & Diagnostics',
    subtopics: [
      'Identification of Tractor Implement Components: Disc Plough, Harrow, and Ridger Parts',
      'Veterinary Surgical and Husbandry Tools: Burdizzo, Drenching Gun, Elastrator, and Ear Notcher',
      'Diagnostic Analysis of Disease Specimen Slides and Pathology Flashcards',
      'Feed Ingredient Identification: Energy Sources, Protein Meals, and Mineral Supplements'
    ],
    readingTimeMinutes: 10,
    summary: 'Consolidate midterm agronomy practical skills, identify tractor and veterinary tools, diagnose diseased specimens, and classify feed ingredients.',
    contentMarkdown: `### 1. Tractor Implement Specimen Identification

In the WAEC Practical Agricultural Science Paper 3, students are presented with physical implements or labeled diagrams:

| Specimen Part | Implement | Structural Description | Specific Agricultural Function |
| :--- | :--- | :--- | :--- |
| **Concave Disc** | Disc Plough / Harrow | Circular dished plate of heat-treated carbon steel with sharpened outer bevel | Cuts into soil, lifts furrow slice, and rolls it sideways to invert and pulverize |
| **Scraper** | Disc Plough | Curved metal blade positioned against the inner concave disc surface | Removes sticky clay soil adhering to the disc surface to keep the cutting face clean |
| **Furrow Wheel** | Disc Plough | Angled rear wheel traveling in the bottom of the open furrow | Counteracts side thrust exerted on the discs, stabilizing tractor steering |
| **Share** | Mouldboard Plough | Pointed, chisel-like forward wedge mounted on the frog | Penetrates soil horizontally, making the initial horizontal under-cut of the furrow slice |
| **Mouldboard** | Mouldboard Plough | Broad twisted curved steel plate extending upward from the share | Receives the cut soil slice from the share, turns it completely upside down, and buries weeds |
| **Spool / Spacer** | Disc Harrow | Heavy cast-iron cylindrical spacer between adjacent discs on the gang axle | Maintains uniform horizontal spacing between discs and adds weight for soil penetration |

---

### 2. Veterinary Equipment & Husbandry Tools

| Equipment | Physical Appearance | Specific Agricultural Function | Precaution / Sanitation Protocol |
| :--- | :--- | :--- | :--- |
| **Burdizzo Castrator** | Heavy pincers with compound leverage hinges; blunt crushing jaws | Crushes the spermatic cords of male livestock (bulls, rams) through the scrotum **bloodlessly** | Check that each spermatic cord is crushed twice; never crush across the center of scrotum |
| **Elastrator & Rubber Rings** | Expanding four-prong pliers with tight rubber rings | Stretches thick rubber elastrator ring to slip over scrotum or tail for **bloodless castration or docking** | Check that both testicles are descended into scrotum before releasing the ring |
| **Drenching Gun** | Metal syringe with a long, blunt, curved nozzle | Administers measured liquid anthelmintics (dewormers) orally to livestock | Keep animal head horizontal; avoid tilting head too high to prevent choking or fluid entering lungs |
| **Ear Notcher** | Handheld pliers with V-shaped or U-shaped cutting jaws | Cuts distinctive numerical notches along ear margins for permanent animal identification | Disinfect cutting jaws in methylated spirit between successive animals |
| **Artificial Insemination (AI) Gun** | Long, slender stainless steel rod with plastic sheath | Deposits frozen semen into the uterine horn of a female in standing heat | Maintain strict sterile protocol; warm semen straw gently in $37^\\circ\\text{C}$ water bath |

---

### 3. Feed Ingredient Classification

| Specimen | Nutritional Category | Major Nutrient Provided | Role in Compound Feeds |
| :--- | :--- | :--- | :--- |
| **Yellow Maize (Corn)** | Basal / Energy Feed | High Carbohydrate / Starch ($70\\%$), Low Protein ($8-9\\%$) | Primary energy constituent of poultry and pig rations ($50-60\\%$ of diet) |
| **Soybean Meal** | Plant Protein Concentrate | High Crude Protein ($44-48\\%$), Balanced Amino Acids | Promotes rapid tissue growth and muscle development; must be heat-treated to destroy trypsin inhibitor |
| **Fish Meal** | Animal Protein Concentrate | High Crude Protein ($65-72\\%$), Lysine, Methionine, Calcium | Highest biological value; promotes rapid chick growth and plumage development |
| **Bone Meal** | Mineral Supplement | Rich Calcium ($24\\%$) and Phosphorus ($12\\%$) | Strengthens skeletal bone development and eggshell formation |
| **Oyster Shell** | Mineral Supplement | Extremely rich in Calcium Carbonate ($\\text{CaCO}_3$, $\\approx 38\\%$) | Crucial mineral supplement for laying hens to prevent thin-shelled and soft-shelled eggs |`,
    keyTakeaways: [
      'The burdizzo castrates male livestock bloodlessly by crushing spermatic cords through the scrotal skin.',
      'The disc plough scraper removes sticky soil from the inner disc face to maintain clean soil inversion.',
      'Soybean meal is a high-protein plant feed that requires heat processing to deactivate anti-nutritional trypsin inhibitors.',
      'Oyster shell supplies calcium carbonate to ensure strong eggshell formation in laying birds.'
    ],
    associatedQuizId: 'waec-ss3-agric-clinic-quiz'
  },

  // ==========================================
  // WEEK 7: SELECTED LIVESTOCK DISEASES II & PARASITOLOGY
  // ==========================================
  {
    id: 'agric-ss3-term2-week7',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Selected Livestock Diseases II & Parasitology: Trypanosomiasis, Ectoparasites & Endoparasites',
    subtopics: [
      'Protozoan Diseases: Trypanosomiasis (Nagana) and Coccidiosis in Broilers',
      'Ectoparasites: Ticks (One-Host, Two-Host, Three-Host), Lice, Mites, and Tsetse Flies',
      'Endoparasites: Tapeworm (Taenia solium, T. saginata), Liver Fluke (Fasciola hepatica), and Roundworms',
      'Life Cycles, Intermediate Hosts, Economic Damage, and Integrated Parasite Management'
    ],
    readingTimeMinutes: 10,
    summary: 'Analyze protozoan diseases, investigate tick lifecycles and vector dynamics, examine tapeworm and liver fluke lifecycles, and implement parasite control.',
    contentMarkdown: `### 1. Protozoan Pathologies of Livestock

#### 1. Trypanosomiasis (Nagana):
- **Causal Organisms:** *Trypanosoma vivax*, *Trypanosoma congolense*, *Trypanosoma brucei*.
- **Transmission Vector:** **Tsetse fly (*Glossina spp.*)**, which transmits the parasite during blood feeding.
- **Susceptible Breeds:** Zebu breeds (White Fulani, Sokoto Gudali) are highly susceptible. **Muturu**, **N'Dama**, and **Keteku** cattle exhibit natural **trypanotolerance**.
- **Clinical Symptoms:** Intermittent fluctuating fever, progressive anemia (pale mucous membranes), prominent watery discharge from eyes, extreme emaciation ("sleeping sickness" appearance), swelling of lymph nodes, abortion in pregnant cows.
- **Control:** Clearing tsetse fly bush habitats, deploying insecticide-impregnated biconical traps, administering trypanocidal drugs (diminazene aceturate, isometamidium chloride), and rearing trypanotolerant cattle breeds in endemic southern zones.

#### 2. Coccidiosis:
- **Causal Organism:** *Eimeria spp.* (e.g., *Eimeria tenella* attacking cecal pouches in chickens).
- **Transmission:** Ingestion of sporulated oocysts contaminating wet litter or drinking water.
- **Symptoms:** Bloody, watery diarrhea (cecal coccidiosis), ruffled feathers, huddling near heat sources, drooping wings, loss of appetite.
- **Control:** Maintain dry litter bedding; add coccidiostats (amprolium, sulfaquinoxaline) to drinking water.

---

### 2. Ectoparasites: Ticks and Fleas

**Ectoparasites** live on the external skin, hair, or feathers of farm animals:

| Ectoparasite | Host Attachment Life Cycle | Direct Damage Caused | Pathogens Transmitted | Control Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **Ticks (*Boophilus*, *Amblyomma*, *Rhipicephalus*)** | **One-Host Tick:** Entire lifecycle (larva $\\rightarrow$ nymph $\\rightarrow$ adult) occurs on one animal.<br>**Three-Host Tick:** Drops off after each developmental stage to molt on pasture ground. | Sucks host blood, causing severe anemia; tick bites damage hides and skins, reducing leather value; causes tick worry and restlessness | Transmits Babesiosis (Redwater), Anaplasmosis (Gall sickness), and Heartwater (*Ehrlichia ruminantium*) | Regular acaricide dipping or spraying in plunge dips; pasture spelling and rotational grazing |
| **Mange Mites (*Sarcoptes scabiei*)** | Burrows deep into the epidermal layers of the skin | Causes intense pruritus (itching); loss of hair; skin thickens and forms rough, scabby crusts | Secondary bacterial dermatitis | Subcutaneous injection of ivermectin; topical application of sulfur-based ointments |

---

### 3. Endoparasites: Tapeworms and Liver Flukes

#### 1. The Liver Fluke (*Fasciola hepatica*):
- **Definitive Host:** Cattle, sheep, goats, and humans (adult fluke resides in bile ducts).
- **Intermediate Host:** **Aquatic mud snail (*Lymnaea truncatula*)**.
- **Life Cycle:**
  1. Adult fluke lays eggs in bile duct $\\rightarrow$ passes out with livestock feces.
  2. Eggs hatch in water into ciliated **miracidia**.
  3. Miracidium penetrates the intermediate aquatic snail (*Lymnaea*).
  4. Undergoes asexual multiplication: Miracidium $\\rightarrow$ Sporocyst $\\rightarrow$ Redia $\\rightarrow$ Free-swimming **cercaria**.
  5. Cercaria leaves snail, encysts on aquatic grass as infective **metacercaria**.
  6. Grazing cattle ingest grass with metacercariae $\\rightarrow$ cysts dissolve in intestine $\\rightarrow$ young flukes bore through intestinal wall and migrate through liver tissue into bile ducts.
- **Damage:** Liver rot, bile duct fibrosis, severe anemia, "bottle jaw" (submandibular edema).
- **Control:** Drench animals with flukicides (albendazole, triclabendazole); drain swampy pastures; eliminate snails using copper sulphate (molluscicide).

#### 2. The Pork Tapeworm (*Taenia solium*):
- **Definitive Host:** Humans (adult tapeworm lives in the small intestine).
- **Intermediate Host:** Pigs (larval stage causes **measly pork** / cysticercosis).
- **Transmission:** Pigs ingest human feces containing tapeworm gravid proglottid segments $\\rightarrow$ oncosphere hexacanth embryos bore into pig muscles, forming fluid-filled **bladderworms (*Cysticercus cellulosae*)**. Humans eating raw or undercooked measly pork become infected.
- **Control:** Restrict pigs in hygienic pens (ban free-range scavenging); inspect slaughterhouse carcasses; cook pork thoroughly.`,
    keyTakeaways: [
      'Trypanosomiasis (Nagana) is transmitted by the tsetse fly (Glossina); N\'Dama and Muturu cattle display natural trypanotolerance.',
      'Ticks cause anemia, damage hides, and transmit Babesiosis and Heartwater; controlled by regular acaricide dipping.',
      'The liver fluke (Fasciola hepatica) requires the aquatic snail (Lymnaea) as its intermediate host.',
      'Pork tapeworm (Taenia solium) forms cysts (measly pork) in pigs when pigs ingest contaminated human feces.'
    ],
    associatedQuizId: 'waec-ss3-agric-parasites-quiz'
  },

  // ==========================================
  // WEEK 8: AQUACULTURE & FISH FARMING
  // ==========================================
  {
    id: 'agric-ss3-term2-week8',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Aquaculture & Fish Farming: Pond Construction, Water Management, Stocking & Preservation',
    subtopics: [
      'Aquaculture Concepts and Suitable Cultured Fish Species: African Catfish (Clarias) and Tilapia',
      'Site Selection and Engineering Steps in Earthen Fish Pond Construction',
      'Pond Preparation: Liming, Organic Fertilization, Impoundment, and Fingerling Stocking',
      'Water Quality Parameters (DO, pH, Ammonia), Feed Conversion Ratio (FCR), and Fish Preservation'
    ],
    readingTimeMinutes: 10,
    summary: 'Study aquaculture systems, select pond sites and construct earthen ponds, manage water quality parameters, and apply modern fish preservation techniques.',
    contentMarkdown: `### 1. Introduction to Aquaculture

**Aquaculture** is the controlled propagation, rearing, and harvesting of aquatic organisms (fish, crustaceans, molluscs, and aquatic plants) in specialized aquatic structures.

#### Cultured Fish Species in Nigeria:
1. **African Mud Catfish (*Clarias gariepinus* / *Heterobranchus bidorsalis*):**
   - Possesses an **accessory air-breathing arborescent organ** enabling survival in low-oxygen, turbid waters.
   - Omnivorous, fast growth rate, highly disease resistant, high market commercial value.
2. **Nile Tilapia (*Oreochromis niloticus*):**
   - Herbivorous / planktivorous, high fecundity, breeds prolifically in captivity.
   - Tendency to overpopulate ponds, leading to stunted populations unless managed with monosex (all-male) fingerling stocks.

---

### 2. Site Selection & Pond Construction

#### Criteria for Selecting an Earthen Pond Site:
- **Soil Quality:** Soil must contain at least **$20\\% - 30\\%$ clay content** to ensure low permeability and retain impounded water without excessive seepage. Coarse sandy or gravelly soils are unacceptable.
- **Topography:** Gently sloping terrain ($1\\% - 3\\%$ slope) allows gravity filling and complete drainage without expensive pumping.
- **Water Source:** Unpolluted, perennial water supply (streams, rivers, springs, artesian boreholes) available year-round.

#### Step-by-Step Construction Phases:
1. **Site Clearing & Destumping:** Clear trees, bushes, and excavate roots.
2. **Topsoil Removal & Bund Trenching:** Strip organic topsoil (which leaks water) and set aside for later dyke dressing. Dig a central **core trench** along dyke lines and backfill with compacted clay to form an impermeable puddle clay core.
3. **Dyke / Embankment Construction:** Build dykes with an inner slope ratio of $2:1$ or $3:1$.
4. **Spillway & Monk Construction:** Install a concrete **monk** or PVC standpipe at the lowest point for drainage, fitted with mesh screens to prevent fish escape. Construct an emergency **spillway** to discharge excess storm overflow safely.

---

### 3. Pond Preparation & Stocking Protocols

1. **Liming:** Apply agricultural limestone ($\\text{CaCO}_3$) or slaked lime ($\\text{Ca}(\\text{OH})_2$) at $500 - 1000\\text{ kg/ha}$ to:
   - Neutralize acidic pond soil and water ($pH < 6.5$).
   - Sterilize pond bottom, destroying fish parasite eggs and wild fish predators.
   - Precipitate suspended colloidal clay particles, clearing turbid water.
2. **Fertilization:** Apply cured poultry manure ($200-300\\text{ kg/ha}$) or NPK chemical fertilizer $7$ days after liming to stimulate phytoplankton and zooplankton ("green soup") blooms.
3. **Impounding:** Fill pond with clean water to a depth of $1.0 - 1.2\\text{ meters}$.
4. **Acclimatization & Stocking:** Float transport containers in the pond for $15-30\\text{ minutes}$ to equalize water temperatures before gently tilting fingerlings into the pond during cool early morning or late evening hours.

---

### 4. Water Quality Management & Preservation Methods

#### Key Water Quality Parameters:
- **Dissolved Oxygen (DO):** Minimum $> 5.0\\text{ mg/L}$. Low DO causes fish to gasp at the water surface.
- **pH:** Optimum range is $6.5 - 8.5$. Water with $pH < 5.0$ or $> 9.5$ induces severe stress and mortality.
- **Total Ammonia Nitrogen:** Must remain below $0.05\\text{ mg/L}$ to prevent gill damage.

#### Feed Conversion Ratio (FCR):
$$\\text{FCR} = \\frac{\\text{Total Dry Weight of Feed Fed}}{\\text{Total Live Weight Gain by Fish}}$$
A lower FCR indicates superior feed efficiency (e.g., an FCR of $1.2$ means $1.2\\text{ kg}$ of quality feed produces $1.0\\text{ kg}$ of live catfish flesh).

#### Fish Preservation Methods in Nigeria:
- **Smoking:** Most widely utilized rural technique; hot wood smoke dries moisture and deposits antimicrobial phenolic compounds.
- **Salting & Sun-Drying:** Common in the Lake Chad basin; salt withdraws water through osmosis, inhibiting bacterial growth.
- **Freezing / Cold Storage:** Preserves fresh flavor and texture for urban cold-chain distribution.`,
    keyTakeaways: [
      'African catfish (Clarias gariepinus) possesses an accessory arborescent organ allowing it to breathe atmospheric oxygen.',
      'Earthen pond sites require soil with at least 20-30% clay to prevent water leakage.',
      'Pond liming neutralizes soil acidity, eradicates parasite eggs, and clarifies cloudy water.',
      'Feed Conversion Ratio (FCR) is calculated as feed fed divided by live weight gained; lower values indicate better feed conversion.'
    ],
    associatedQuizId: 'waec-ss3-agric-aquaculture-quiz'
  },

  // ==========================================
  // WEEK 9: APICULTURE (BEE KEEPING)
  // ==========================================
  {
    id: 'agric-ss3-term2-week9',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Apiculture (Bee Keeping): Honeybee Social Castes, Modern Hives, Apiary Management & Products',
    subtopics: [
      'Concept and Importance of Apiculture: Honey, Beeswax, and Ecosystem Pollination Services',
      'The Honeybee Castes (Apis mellifera): Queen, Drone, and Worker Morphological Adaptations',
      'Modern Bee-Keeping Equipment: Langstroth Hive, Kenya Top-Bar Hive, Smoker, and Protective Gear',
      'Apiary Site Selection, Swarming Behavior, Honey Harvesting, Processing, and By-Products'
    ],
    readingTimeMinutes: 9,
    summary: 'Study apiculture principles, examine honeybee social organization and castes, operate modern top-bar hives and smokers, and harvest honey and valuable by-products.',
    contentMarkdown: `### 1. Introduction to Apiculture

**Apiculture** is the scientific rearing and management of honeybees (*Apis mellifera*) in artificial hive structures for the production of honey, beeswax, and associated hive commodities.

#### Economic and Environmental Importance:
- **Commercial Commodities:** Produces pure natural honey, beeswax, propolis, royal jelly, and bee venom.
- **Crop Pollination:** Honeybees are the primary insect pollinators of agricultural crops (mango, cashew, citrus, cowpea, sunflower), boosting fruit set and crop seed yields by $30\\% - 60\\%$.
- **Low Capital Investment:** Requires zero fertile arable land and minimal daily maintenance labor.

---

### 2. Social Caste Organization of the Honeybee

A healthy honeybee colony is a eusocial community comprising three distinct castes:

| Feature / Adaptation | The Queen Bee | The Drone Bee | The Worker Bee |
| :--- | :--- | :--- | :--- |
| **Ploidy & Sex** | Diploid ($2n$), fertile adult female | Haploid ($n$), fertile adult male | Diploid ($2n$), sterile female |
| **Number per Colony** | Exactly **one** ($1$) per active colony | Several hundreds ($300 - 1000$) | Several thousands ($20,000 - 60,000+$) |
| **Physical Appearance** | Long slender abdomen extending past wings; large thorax; smooth curved sting | Large robust body; very large compound eyes meeting at top of head; blunt abdomen; **no sting** | Smallest caste; specialized pollen basket (corbicula) on hind legs; barbed sting |
| **Developmental Diet** | Fed exclusively on protein-rich **Royal Jelly** throughout larval stage | Fed royal jelly for $3$ days, then bee bread (honey + pollen) | Fed royal jelly for $3$ days, then bee bread |
| **Colony Function** | Lays up to $1500 - 2000$ eggs per day; secretes **Queen Substance pheromone** to unify colony | Mates with virgin queen in mid-air during the nuptial flight; dies immediately after mating | Performs all hive chores: cleaning cells, nursing larvae, building wax combs, foraging nectar/pollen, guarding entrance |

---

### 3. Modern Bee-Keeping Equipment & Apiary Site Selection

1. **Hive Types:**
   - **Kenya Top-Bar Hive (KTBH):** Long trapezoidal wooden trough with removable wooden top bars. Bees build natural combs hanging down from each individual bar. Cheap, easy to construct locally.
   - **Langstroth Movable-Frame Hive:** Multi-tier wooden boxes (brood box below, honey supers above) containing standardized vertical wooden frames fitted with wax foundation sheets.
2. **Protective & Handling Gear:**
   - **Bee Smoker:** Metal combustion cylinder with hand bellows; burns wood shavings to generate cool smoke that masks alarm pheromones and engorges bees with honey, calming them during inspections.
   - **Bee Suit, Veil & Leather Gloves:** Prevents defensive stings.
   - **Hive Tool:** Steel pry bar for levering stuck frames sealed with propolis.

#### Apiary Site Selection Rules:
- Located at least **$100-200\\text{ meters}$ away from human residences, schools, and livestock barns** to eliminate sting hazards.
- Shaded by trees to prevent direct tropical midday solar overheating.
- Year-round supply of clean drinking water within $500\\text{ meters}$.
- Abundance of nectar-producing flowering flora (e.g., neem, eucalyptus, citrus, sunflower).

---

### 4. Swarming & Colony Management

**Swarming** is the natural departure of the old queen bee accompanied by roughly half the worker population to establish a new independent colony elsewhere.

- **Causes of Swarming:** Overcrowding inside the brood nest, excessive hive temperatures, poor ventilation, and queen pheromone dilution.
- **Prevention:** Adding extra honey supers to expand hive volume, providing shade, removing queen swarm cells, or dividing large colonies.

#### Harvesting Honey & By-Products:
- **Harvesting:** Harvest combs at night or late afternoon using cool smoke. Only harvest frames where **at least $80\\%$ of honey cells are sealed with wax cappings** (indicating fully ripened honey with low moisture $< 18\\%$).
- **Beeswax:** Melted wax combs purified for cosmetics, shoe polishes, pharmaceuticals, and candle manufacture.
- **Propolis ("Bee Glue"):** Resinous plant gum collected by workers; potent antibacterial properties used in natural medicines.`,
    keyTakeaways: [
      'A honeybee colony comprises one queen (egg layer), hundreds of stingless drones (mating), and thousands of sterile workers (all chores).',
      'The queen is fed exclusively on royal jelly throughout her larval development.',
      'The bee smoker calms bees by masking alarm pheromones and inducing bees to engorge on honey.',
      'Only harvest combs with over 80% sealed wax cappings to ensure honey is mature with low moisture content.'
    ],
    associatedQuizId: 'waec-ss3-agric-apiculture-quiz'
  },

  // ==========================================
  // WEEK 10: AGRICULTURAL EXTENSION & TECHNOLOGY TRANSFER
  // ==========================================
  {
    id: 'agric-ss3-term2-week10',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Agricultural Extension & Technology Transfer: Principles, Methods & the ADP System in Nigeria',
    subtopics: [
      'Definition, Philosophy, and Objectives of Agricultural Extension Education',
      'Extension Teaching Channels: Individual, Group, and Mass Media Contact Methods',
      'The Agricultural Development Programme (ADP) Model: Village Extension Workers (VEWs)',
      'The Innovation Adoption Process: Awareness, Interest, Evaluation, Trial, Adoption, and Adoption Barriers'
    ],
    readingTimeMinutes: 9,
    summary: 'Analyze agricultural extension education principles, compare individual/group/mass communication channels, evaluate the Nigerian ADP system, and model adoption stages.',
    contentMarkdown: `### 1. Concept of Agricultural Extension

**Agricultural extension** is an informal educational process through which practical scientific research findings and improved agronomic technologies are communicated to rural farming families to help them improve farming efficiency, increase farm income, and elevate rural standards of living.

#### Foundational Objectives of Agricultural Extension:
- Disseminate improved crop varieties (high-yielding hybrids), livestock breeds, and agrochemicals.
- Teach farmers modern farm management practices (spacing, fertilizer application rates, pest control).
- Provide feedback to research institutes (IITA, NCRI, NIHORT) regarding field constraints encountered by farmers.
- Empower rural farm women and youth with processing, storage, and entrepreneurial skills.

---

### 2. Extension Teaching Methods

Extension agents utilize three primary communication channels:

| Method Category | Specific Communication Channels | Practical Advantages | Key Limitations |
| :--- | :--- | :--- | :--- |
| **Individual Contact** | Farm visits, home visits, office calls, telephone consultations | Establishes high mutual trust; allows personalized solutions for specific farm problems; highly effective for complex practices | Extremely expensive per farmer; reaches very few farmers; highly time-consuming for extension agents |
| **Group Contact** | Result demonstrations, method demonstrations, field days, farmer field schools | Reaches dozens of farmers simultaneously; allows peer learning and hands-on skill practice; more cost-effective | Factional local politics may disrupt attendance; individual shy farmers may not ask questions |
| **Mass Media Contact** | Radio farm broadcasts, television documentaries, posters, mobile SMS | Reaches hundreds of thousands of farmers instantaneously; ideal for spreading awareness of sudden disease outbreaks | One-way communication with limited immediate feedback; cannot teach physical hands-on skills; high illiteracy impairs printed posters |

#### Method Demonstration vs. Result Demonstration:
- **Method Demonstration:** Shows farmers *how to perform a new skill* step-by-step (e.g., showing farmers how to calibrate a knapsack sprayer or castrate a piglet).
- **Result Demonstration:** Shows farmers *the physical proof and superiority* of a new practice over an old practice (e.g., planting two adjacent plots: one with local maize and zero fertilizer, the other with hybrid seed and NPK fertilizer, allowing farmers to observe the yield difference at harvest).

---

### 3. The Agricultural Development Programme (ADP) System in Nigeria

The **ADP** system was initiated in Nigeria in the 1970s with World Bank support to restructure agricultural extension:
- Operates through the **Training and Visit (T&V) Extension System**.
- **Village Extension Workers (VEWs):** Live directly within rural communities, serving a designated circle of farming families ($800 - 1000$ farmers).
- **Fortnightly Training:** VEWs attend bi-weekly training sessions conducted by **Subject Matter Specialists (SMS)** to learn specific seasonal crop technologies, which they subsequently teach to **Contact Farmers**.

---

### 4. The Innovation Adoption Process

Sociological research by Everett Rogers outlines five sequential stages through which a farmer progresses before adopting an innovation:

1. **Awareness:** The farmer first hears about the existence of the new technology (e.g., hearing a radio broadcast about drought-tolerant maize).
2. **Interest:** The farmer seeks additional technical information about the innovation.
3. **Evaluation:** The farmer mentally assesses whether the technology is feasible, affordable, and profitable for their specific farm situation.
4. **Trial:** The farmer tests the innovation on a small parcel of land or with a few animals to judge performance firsthand without risking their entire livelihood.
5. **Adoption:** The farmer fully integrates the technology into their standard farm operations.

#### Major Barriers to Technology Adoption in Nigeria:
- **Financial Constraints:** High cost of commercial inputs (fertilizers, tractor hiring fees, hybrid seeds).
- **Land Tenure Insecurity:** Communal or customary ownership discourages long-term investments like tree planting.
- **Illiteracy & Conservatism:** Traditional rural beliefs and resistance to modern practices.
- **Infrastructural Deficits:** Poor rural feeder roads, lack of electricity, and non-existent storage silos.`,
    keyTakeaways: [
      'Agricultural extension bridges agricultural research institutes and rural farmers.',
      'Method demonstrations teach how to execute a technique; result demonstrations prove that the new technique produces superior results.',
      'The Nigerian ADP relies on Village Extension Workers (VEWs) disseminating practices through Contact Farmers.',
      'The adoption process follows five stages: Awareness, Interest, Evaluation, Trial, and Adoption.'
    ],
    associatedQuizId: 'waec-ss3-agric-extension-quiz'
  },

  // ==========================================
  // WEEK 11: AGRICULTURAL FINANCING, COOPERATIVES & INSURANCE
  // ==========================================
  {
    id: 'agric-ss3-term2-week11',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Agricultural Financing, Cooperatives & Insurance: Credit Sources, Farmer Societies & NAIC',
    subtopics: [
      'Concept and Classification of Agricultural Credit: Short-Term, Medium-Term, and Long-Term Loans',
      'Sources of Farm Credit: Institutional vs. Non-Institutional Lenders in Nigeria',
      'Agricultural Cooperative Societies: Farmer Thrift, Credit, Producer, and Marketing Cooperatives',
      'Agricultural Insurance: The Role of the Nigerian Agricultural Insurance Corporation (NAIC) in Risk Mitigation'
    ],
    readingTimeMinutes: 9,
    summary: 'Evaluate agricultural credit classifications, contrast institutional and non-institutional lending, examine farmer cooperatives, and analyze NAIC insurance coverage.',
    contentMarkdown: `### 1. Agricultural Financing & Credit

**Agricultural finance** is the procurement and management of capital funds utilized for agricultural production, processing, storage, and marketing.

#### Types of Agricultural Credit by Repayment Duration:
1. **Short-Term Credit (Repayment within $1 - 2$ years):**
   - Used for recurring working capital operating expenses (purchasing seeds, fertilizers, veterinary drugs, tractor diesel, paying day labor).
   - Repaid immediately following seasonal crop harvest and sales.
2. **Medium-Term Credit (Repayment within $2 - 5$ years):**
   - Used to acquire light capital assets (purchasing work bulls, sprayers, constructing poultry battery cages, clearing small parcels of land).
3. **Long-Term Credit (Repayment over $5 - 20+$ years):**
   - Used for permanent capital investments (buying farm land, establishing perennial tree plantations like oil palm and cocoa, constructing dams, purchasing tractors and combine harvesters).

---

### 2. Sources of Agricultural Credit in Nigeria

| Credit Category | Lending Sources | Distinct Advantages | Critical Disadvantages |
| :--- | :--- | :--- | :--- |
| **Institutional Sources** | Commercial Banks (First Bank, Zenith), **Bank of Agriculture (BOA)**, Microfinance Banks, CBN Anchor Borrowers Programme | Large loan volumes available; lower regulated interest rates; extended repayment schedules; no personal exploitation | Requires rigid tangible collateral (land Certificate of Occupancy); slow bureaucratic loan disbursement; high illiteracy barrier for rural farmers |
| **Non-Institutional Sources** | Moneylenders, family members, local merchants, traditional thrift clubs (**Esusu / Ajo**) | Instant cash disbursement without bureaucratic delay; zero formal paperwork or collateral needed; flexible informal repayment | Exorbitant usurious interest rates (often $> 100\\%$); lenders may seize crops at below-market prices; small loan amounts |

#### The 5 Cs of Agricultural Credit Assessment:
Before granting a loan, financial institutions evaluate:
1. **Character:** Integrity, honesty, and credit history of the farmer.
2. **Capacity:** Technical and managerial capability of the farmer to generate sufficient farm profits to service debt.
3. **Capital:** Net worth and physical assets currently owned by the farm enterprise.
4. **Collateral:** Pledged security asset (land, machinery) seized in the event of loan default.
5. **Conditions:** Economic climate, rainfall patterns, market prices, and interest rates.

---

### 3. Agricultural Cooperative Societies

An **agricultural cooperative society** is an autonomous democratic association of farmers who voluntarily join together to pool financial resources, purchase bulk inputs cheaply, and market farm produce collectively:

- **Farmers’ Multi-Purpose Cooperatives:** Combines credit disbursement, bulk fertilizer procurement, tractor hiring, and joint product marketing.
- **Credit and Thrift Cooperatives:** Encourages members to save small weekly sums and provides members with low-interest emergency loans.
- **Marketing Cooperatives:** Pools small harvests together, eliminates exploiting middlemen, and negotiates bulk pricing directly with major food processors.

---

### 4. Agricultural Insurance & the Role of NAIC

Farming is subject to biological, climactic, and environmental hazards (droughts, floods, pest outbreaks, epidemics).

The Federal Government established the **Nigerian Agricultural Insurance Corporation (NAIC)** in 1987 to provide specialized agricultural risk insurance:
- **Subsidized Premiums:** The Federal and State Governments subsidize up to **$50\\%$ of agricultural insurance premiums** paid by farmers.
- **Coverage Areas:** Covers losses resulting from bushfires, floods, droughts, windstorms, and recognized livestock disease epidemics.
- **Credit Catalyst:** Commercial banks mandate NAIC insurance coverage before disbursing agricultural loans to ensure loan repayment in the event of crop failure.`,
    keyTakeaways: [
      'Short-term credit covers working seasonal inputs; long-term credit finances permanent assets like land, tractors, and tree plantations.',
      'Institutional lenders (BOA, commercial banks) offer lower interest rates but require collateral; non-institutional lenders charge exorbitant interest.',
      'Lenders evaluate credit using the 5 Cs: Character, Capacity, Capital, Collateral, and Conditions.',
      'The Nigerian Agricultural Insurance Corporation (NAIC) provides subsidized insurance coverage for crops and livestock against natural disasters.'
    ],
    associatedQuizId: 'waec-ss3-agric-finance-quiz'
  },

  // ==========================================
  // WEEK 12: TERM REVIEW & PRACTICAL AGRIC MASTERCLASS
  // ==========================================
  {
    id: 'agric-ss3-term2-week12',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Agricultural Science',
    term: '2nd Term',
    weekNumber: 12,
    topicTitle: 'Term Review & WAEC Practical Agricultural Science Masterclass: Specimen Tables & Exam Strategy',
    subtopics: [
      'Consolidation of 2nd Term Topics: Farm Power, Machinery, Diseases, Aquaculture, and Extension',
      'WAEC Specimen Identification Protocols: Weeds, Pests, Feeds, Soils, and Implement Parts',
      'Interpretation of Livestock Anatomy, Carcass Cuts, and Specimen Disease Symptoms',
      'Examiner Scoring Rubrics: Concise Botanical Nomenclature, Precision Terminology, and Essay Tactics'
    ],
    readingTimeMinutes: 10,
    summary: 'Consolidate 2nd Term agricultural science concepts, master WAEC practical specimen identification rubrics, anatomical terminology, and essay strategies.',
    contentMarkdown: `### 1. WAEC Practical Agricultural Science Examination Standards

In the WAEC Practical Agricultural Science Paper 3, candidates are confronted with specimens categorized under:
- **Specimens A - E:** Agricultural soils, fertilizers, farm tools, and tractor implement parts.
- **Specimens F - K:** Common agricultural weeds, crop pests, and diseased plant foliage.
- **Specimens L - Q:** Livestock feeds, internal organs, parasites, and veterinary tools.

---

### 2. Common WAEC Specimen Identification Reference

| Specimen Code Group | Common Specimen Examples | Biological / Technical Name | Diagnostic Features & Key Functions |
| :--- | :--- | :--- | :--- |
| **Agricultural Weeds** | Guinea Grass<br>Elephant Grass<br>Goatweed<br>Tridax | *Panicum maximum*<br>*Pennisetum purpureum*<br>*Ageratum conyzoides*<br>*Tridax procumbens* | High-protein perennial forage grass; spreads by seeds/tillers.<br>Tall robust forage grass used for silage and erosion control.<br>Broadleaf weed with lavender flower heads; hosts virus vectors.<br>Creeping weed with yellow-centered white daisy flowers. |
| **Crop Pests** | Maize Weevil<br>Yam Beetle<br>Variegated Grasshopper<br>Stem Borer | *Sitophilus zeamais*<br>*Heteroligus meles*<br>*Zonocerus variegatus*<br>*Busseola fusca* | Bores cylindrical holes in stored cereal grains.<br>Chews semi-circular feeding holes in underground yam tubers.<br>Defoliates cassava leaves, producing noxious odor.<br>Larvae tunnel through maize stems, causing "dead heart" wilt. |
| **Livestock Parasites** | Cattle Tick<br>Liver Fluke<br>Roundworm<br>Tapeworm | *Boophilus decoloratus*<br>*Fasciola hepatica*<br>*Ascaris suum*<br>*Taenia solium* | Sucks blood; vector of redwater fever (*Babesia*).<br>Leaf-shaped flatworm living in sheep and cattle bile ducts.<br>Large cylindrical unsegmented worm inhabiting pig small intestine.<br>Ribbon-like segmented flatworm with scolex; causes measly pork. |

---

### 3. Essential Terminology & Botanical Nomenclature Rules

Examiners deduct significant marks for informal, casual phrasing:
1. **Scientific Names:** Must follow binomial nomenclature rules:
   - Capitalize genus name; write species name in lowercase.
   - When handwriting on paper, **underline both words separately**: e.g., <u>Clarias</u> <u>gariepinus</u>, <u>Zea</u> <u>mays</u>.
2. **Precision in Implement Parts:**
   - Do not write *"the sharp wheel"* on a plough; write **"the concave disc"** or **"the rolling coulter"**.
   - Do not write *"the medicine gun"*; write **"the drenching gun"** or **"the automatic syringe"**.
3. **Specimen Economics:** When asked for economic importance, always specify whether it is **beneficial or detrimental**:
   - *Detrimental:* "Transmits *Babesia bigemina* causing redwater fever in cattle."
   - *Beneficial:* "Excellent palatable forage grass providing crude protein for ruminants."

---

### 4. Comprehensive Examination Writing Checklist

- **Read Questions Carefully:** Note whether the question asks for *weeds*, *pests*, *implements*, or *management practices*.
- **State Specific Quantities:** If a question asks for *two* advantages, provide only the two best points; examiners do not award extra marks for excess points.
- **Drawings & Diagrams:** In biology and agriculture questions, drawings must have clear, straight, uncrossed label lines touching the exact structure labeled, with a clear caption title and magnification indication.`,
    keyTakeaways: [
      'In WAEC practicals, scientific names must be underlined separately when written by hand (e.g., Clarias gariepinus).',
      'Use accurate technical names for implement components: concave disc, furrow wheel, scraper, and mouldboard share.',
      'State specific host damages and vector roles when discussing livestock parasites.',
      'Label lines on examination diagrams must be drawn straight with a ruler, must not cross, and must touch the designated part.'
    ],
    associatedQuizId: 'waec-ss3-agric-masterclass-quiz'
  }
];
