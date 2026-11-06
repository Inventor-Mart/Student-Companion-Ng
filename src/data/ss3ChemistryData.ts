import { CurriculumTopic } from '../types';

export const SS3_CHEMISTRY_TOPICS: CurriculumTopic[] = [
  // ==========================================
  // WEEK 1: NUCLEAR CHEMISTRY & RADIOACTIVITY
  // ==========================================
  {
    id: 'chem-ss3-term2-week1',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Nuclear Chemistry & Radioactivity: Radiation Types, Balancing Equations & Nuclear Forces',
    subtopics: [
      'Discovery and Nature of Natural Radioactivity (Becquerel, Curie, Rutherford)',
      'Characteristics of Alpha (α), Beta (β), and Gamma (γ) Radiations',
      'Balancing Nuclear Transmutation Equations: Conservation of Mass and Atomic Number',
      'Nuclear Fission vs. Nuclear Fusion: Energy Mass Equivalence'
    ],
    readingTimeMinutes: 9,
    summary: 'Explore spontaneous nuclear transformations, distinguish ionizing radiations, master transmutation equations, and differentiate nuclear fission and fusion processes.',
    contentMarkdown: `### 1. The Nature of Radioactivity

**Radioactivity** is the spontaneous disintegration of the unstable nucleus of an atom accompanied by the emission of ionizing radiations and subatomic particles to attain a more stable nuclear configuration.

Unlike ordinary chemical reactions which involve only the sharing, loss, or gain of orbital valence electrons without altering nuclear identity, **nuclear reactions change the atomic number and mass number** of the nuclide itself.

| Characteristic | Alpha Particle ($\\alpha$ or $^{4}_{2}\\text{He}$) | Beta Particle ($\\beta^-$ or $^{0}_{-1}\\text{e}$) | Gamma Ray ($\\gamma$) |
| :--- | :--- | :--- | :--- |
| **Nature & Identity** | Helium nucleus ($2$ protons, $2$ neutrons) | High-speed relativistic electron | High-frequency electromagnetic wave |
| **Relative Charge** | $+2$ | $-1$ | $0$ (Neutral photon) |
| **Rest Mass** | $4.0026\\text{ amu}$ | $\\frac{1}{1840}\\text{ amu}$ ($0.00055\\text{ amu}$) | Zero ($0$) |
| **Velocity** | $\\approx 5\\% - 10\\%$ of speed of light ($c$) | Up to $90\\% - 99\\%$ of speed of light ($c$) | Speed of light ($3.0 \\times 10^8\\text{ m/s}$) |
| **Ionizing Power** | Extremely High (causes intense gas ionization) | Moderate | Relatively Low |
| **Penetrating Power** | Very Low (stopped by a sheet of paper or skin) | Moderate (stopped by $3-5\\text{ mm}$ aluminium foil) | Very High (requires dense lead or thick concrete) |
| **Magnetic Field Deflection** | Deflected towards the negative pole (slight curvature) | Deflected towards the positive pole (sharp curvature) | Undeflected (passes straight through) |

---

### 2. Radioactive Decay Series & Heavy Nuclei Pathways

[Diagram: chemical-nuclear-decay-series]

Heavy radionuclides (such as Uranium-238, Thorium-232, and Actinium-227) cascade through sequential alpha and beta emissions along distinct isotopic channels until reaching a stable, non-radioactive isotope of Lead ($^{206}_{82}\\text{Pb}$):

- **Alpha Decay:** The mass number decreases by $4$, and the atomic number decreases by $2$:
  $$^{238}_{92}\\text{U} \\longrightarrow ^{234}_{90}\\text{Th} + ^{4}_{2}\\text{He} + \\gamma$$
- **Beta Decay ($\\beta^-$):** A nuclear neutron converts into a proton and an electron. The mass number remains unchanged while the atomic number increases by $1$:
  $$^{234}_{90}\\text{Th} \\longrightarrow ^{234}_{91}\\text{Pa} + ^{0}_{-1}\\text{e} + \\bar{\\nu}_e$$
- **Gamma Emission:** Nuclei in excited metastable states release excess energy without altering nucleon counts:
  $$^{99m}_{43}\\text{Tc} \\longrightarrow ^{99}_{43}\\text{Tc} + \\gamma$$

---

### 3. Nuclear Fission versus Nuclear Fusion

| Parameter | Nuclear Fission | Nuclear Fusion |
| :--- | :--- | :--- |
| **Mechanism** | Splitting of a heavy unstable nucleus by thermal neutrons | Combining of light nuclei into a heavier nucleus |
| **Typical Reaction** | $^{235}_{92}\\text{U} + ^{1}_{0}\\text{n} \\rightarrow ^{141}_{56}\\text{Ba} + ^{92}_{36}\\text{Kr} + 3\\,^{1}_{0}\\text{n} + \\text{Energy}$ | $^{2}_{1}\\text{H} + ^{3}_{1}\\text{H} \\rightarrow ^{4}_{2}\\text{He} + ^{1}_{0}\\text{n} + 17.6\\text{ MeV}$ |
| **Activation Temperature** | Ambient temperature (room temperature initiated) | Extreme thermonuclear temperatures ($> 10^7\\text{ K}$) |
| **Energy Yield per Nucleon** | High ($\approx 0.85\\text{ MeV/nucleon}$) | Tremendous ($\approx 3.5\\text{ MeV/nucleon}$) |
| **Radioactive Waste** | Produces hazardous long-lived radioactive fission fragments | Generates clean non-toxic helium ($^{4}_{2}\\text{He}$) |

---

### 4. Worked WAEC Examination Drill

**Question:** A radioactive nuclide $^{238}_{92}\\text{X}$ disintegrates by emitting $3$ alpha particles and $2$ beta particles to yield a stable daughter nuclide $^{A}_{Z}\\text{Y}$. Determine the mass number $A$ and atomic number $Z$ of nuclide $\\text{Y}$.

**Solution Steps:**
1. **Set up the nuclear conservation equation:**
   $$^{238}_{92}\\text{X} \\longrightarrow ^{A}_{Z}\\text{Y} + 3\\,(^{4}_{2}\\text{He}) + 2\\,(^{0}_{-1}\\text{e})$$
2. **Apply Conservation of Mass Number:**
   $$238 = A + (3 \\times 4) + (2 \\times 0)$$
   $$238 = A + 12 \\implies A = 238 - 12 = 226$$
3. **Apply Conservation of Atomic Number (Charge):**
   $$92 = Z + (3 \\times 2) + (2 \\times -1)$$
   $$92 = Z + 6 - 2 = Z + 4 \\implies Z = 92 - 4 = 88$$
4. **Final Conclusion:**
   The daughter nuclide is $^{226}_{88}\\text{Ra}$ (Radium-226), with $A = 226$ and $Z = 88$.`,
    keyTakeaways: [
      'In all balanced nuclear equations, the sum of mass numbers (superscripts) and the sum of atomic numbers (subscripts) are strictly conserved.',
      'Alpha emission reduces atomic number by 2 and mass number by 4; beta emission increases atomic number by 1 with no change in mass number.',
      'Gamma rays are uncharged photons with the highest penetrating ability, whereas alpha particles have the greatest ionizing capacity.'
    ],
    associatedQuizId: 'waec-ss3-chem-radioactivity-quiz'
  },

  // ==========================================
  // WEEK 2: RADIOACTIVE DECAY KINETICS & HALF-LIFE
  // ==========================================
  {
    id: 'chem-ss3-term2-week2',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Radioactive Decay Kinetics & Half-Life: Rate Law, Half-Life Formula & Radiocarbon Dating',
    subtopics: [
      'First-Order Rate Law of Radioactive Disintegration and Decay Constant (λ)',
      'Mathematical Derivation of Half-Life: t(1/2) = 0.693 / λ',
      'Calculations Involving Remaining Masses, Fractions, and Elapsed Times',
      'Applications of Radioisotopes in Agriculture, Medicine, and Archaeological Dating'
    ],
    readingTimeMinutes: 9,
    summary: 'Formulate first-order decay kinetics, calculate half-life and disintegrations, and examine peaceful industrial, medical, and agricultural applications of radioisotopes.',
    contentMarkdown: `### 1. First-Order Kinetics of Nuclear Decay

Radioactive decay is a purely statistical, first-order kinetic process. The rate of decay (activity $A$) at any instantaneous moment is directly proportional to the total number of radioactive nuclei $N$ present in the sample:

$$-\\frac{dN}{dt} = \\lambda N$$

Where:
- $\\lambda$ is the **decay constant** (fraction of nuclei disintegrating per unit time, unit: $\\text{s}^{-1}$, $\\text{min}^{-1}$, or $\\text{yr}^{-1}$).
- $N$ is the number of undecayed radioactive atoms remaining.

Integrating the rate expression yields the exponential decay law:
$$N_t = N_0 \\cdot e^{-\\lambda t} \\quad \\text{or} \\quad \\ln\\left(\\frac{N_0}{N_t}\\right) = \\lambda t$$

---

### 2. Half-Life ($t_{1/2}$) and Discrete Step Formula

The **half-life** ($t_{1/2}$) of a radioactive element is defined as the time taken for exactly half of the radioactive atoms originally present in a sample to disintegrate.

Setting $N_t = \\frac{N_0}{2}$ at $t = t_{1/2}$:
$$\\ln(2) = \\lambda \\cdot t_{1/2} \\implies t_{1/2} = \\frac{\\ln 2}{\\lambda} = \\frac{0.693}{\\lambda}$$

#### Discrete Number of Half-Lives ($n$):
If a sample undergoes $n$ half-lives, where $n = \\frac{\\text{Total Time Elapsed } (T)}{\\text{Half-life } (t_{1/2})}$:
$$N_t = N_0 \\cdot \\left(\\frac{1}{2}\\right)^n = \\frac{N_0}{2^n}$$

| Half-Life Count ($n$) | Elapsed Time ($T$) | Fraction Remaining | Percentage Undecayed | Fraction Disintegrated |
| :--- | :--- | :--- | :--- | :--- |
| **0** | $0$ | $1$ | $100\\%$ | $0$ |
| **1** | $1 \\times t_{1/2}$ | $\\frac{1}{2}$ | $50\\%$ | $\\frac{1}{2}$ ($50\\%$) |
| **2** | $2 \\times t_{1/2}$ | $\\frac{1}{4}$ | $25\\%$ | $\\frac{3}{4}$ ($75\\%$) |
| **3** | $3 \\times t_{1/2}$ | $\\frac{1}{8}$ | $12.5\\%$ | $\\frac{7}{8}$ ($87.5\\%$) |
| **4** | $4 \\times t_{1/2}$ | $\\frac{1}{16}$ | $6.25\\%$ | $\\frac{15}{16}$ ($93.75\\%$) |

---

### 3. Peaceful Applications of Radioisotopes

1. **Medicine:**
   - **Cobalt-60 ($^{60}_{27}\\text{Co}$):** High-energy gamma emitter used in radiotherapy for teletherapy destruction of cancer tumors.
   - **Iodine-131 ($^{131}_{53}\\text{I}$):** Diagnostic tracer and therapeutic agent for thyroid gland disorders and goitre.
   - **Technetium-99m ($^{99m}_{43}\\text{Tc}$):** Short-lived ($6\\text{ hours}$) organ imaging tracer in cardiology and oncology.
2. **Agriculture:**
   - **Phosphorus-32 ($^{32}_{15}\\text{P}$):** Added to phosphate fertilizers to monitor plant uptake and nutrient transport kinetics in crop soils.
   - **Gamma Sterilization:** Eradicating pupae of the tsetse fly (*Glossina*) via sterile insect technique to halt trypanosomiasis transmission.
3. **Archaeology & Geology:**
   - **Carbon-14 ($^{14}_{6}\\text{C}$) Dating:** Assaying remaining $^{14}\\text{C}$ to $^{12}\\text{C}$ ratios in wood, charcoal, and biological fossils up to $60,000\\text{ years}$.
   - **Uranium-Lead ($^{238}\\text{U}/^{206}\\text{Pb}$) Dating:** Determining the geological age of igneous rock minerals.

---

### 4. Worked WAEC Examination Drill

**Question:** A sample of radioactive $^{131}_{53}\\text{I}$ has an initial mass of $64.0\\text{ g}$ and a half-life of $8.0\\text{ days}$. Calculate:
1. The decay constant $\\lambda$ in $\\text{day}^{-1}$.
2. The mass of Iodine-131 remaining after $32.0\\text{ days}$.
3. The mass of Iodine-131 that has disintegrated.

**Solution:**
1. **Decay Constant:**
   $$\\lambda = \\frac{0.693}{t_{1/2}} = \\frac{0.693}{8.0\\text{ days}} = 0.0866\\text{ day}^{-1}$$
2. **Number of Half-Lives ($n$):**
   $$n = \\frac{\\text{Total Time}}{\\text{Half-life}} = \\frac{32.0\\text{ days}}{8.0\\text{ days}} = 4\\text{ half-lives}$$
3. **Mass Remaining ($N_t$):**
   $$N_t = \\frac{N_0}{2^n} = \\frac{64.0\\text{ g}}{2^4} = \\frac{64.0}{16} = 4.0\\text{ g}$$
4. **Mass Disintegrated:**
   $$\\Delta m = N_0 - N_t = 64.0\\text{ g} - 4.0\\text{ g} = 60.0\\text{ g}$$`,
    keyTakeaways: [
      'Radioactive half-life is constant for a given nuclide and independent of temperature, pressure, concentration, or chemical combination.',
      'The half-life relationship is t(1/2) = 0.693 / λ, and the remaining mass after n half-lives equals N0 / (2^n).',
      'Radioisotopes have vital applications: Cobalt-60 in oncology, Phosphorus-32 in agronomy, and Carbon-14 in fossil dating.'
    ],
    associatedQuizId: 'waec-ss3-chem-halflife-quiz'
  },

  // ==========================================
  // WEEK 3: METALS & THEIR EXTRACTION I (IRON & ALUMINIUM)
  // ==========================================
  {
    id: 'chem-ss3-term2-week3',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Metals & Their Extraction I: Blast Furnace Metallurgy of Iron and Hall-Héroult Electrolysis of Aluminium',
    subtopics: [
      'Principles of Metallurgy: Ore Concentration, Roasting, Smelting, and Refining',
      'Extraction of Iron in the Blast Furnace: Chemical Zones, Slag Formation, and Reactions',
      'Varieties of Iron: Pig Iron, Cast Iron, Wrought Iron, and Structural Steels',
      'Purification of Bauxite (Bayer Process) and Hall-Héroult Electrolytic Reduction of Aluminium'
    ],
    readingTimeMinutes: 10,
    summary: 'Master the thermodynamics and chemical reactions of iron extraction in the blast furnace, compare steel grades, and examine the Bayer and Hall-Héroult aluminium processes.',
    contentMarkdown: `### 1. Principles of Metal Extraction

The extraction method chosen for any metal depends strictly on its position in the **electrochemical reactivity series**:

- **High Reactivity (K, Na, Ca, Mg, Al):** Extracted by **electrolytic reduction** of their molten anhydrous salts because carbon cannot reduce their stable oxides.
- **Moderate Reactivity (Zn, Fe, Pb, Sn):** Extracted by **chemical reduction** of their roasted oxides using coke (carbon) or carbon monoxide ($CO$) in furnaces.
- **Low Reactivity (Cu, Ag, Au):** Occur native or roasted in air; refined electrolytically.

---

### 2. Metallurgy of Iron in the Blast Furnace

The principal ores of iron are **Haematite** ($\\text{Fe}_2\\text{O}_3$), **Magnetite** ($\\text{Fe}_3\\text{O}_4$), and **Siderite** ($\\text{FeCO}_3$).

#### The Charge Ingredients:
1. **Iron Ore (Haematite):** Source of iron.
2. **Coke ($C$):** Fuel and precursor for the primary reducing agent.
3. **Limestone ($\\text{CaCO}_3$):** Basic flux to remove acidic siliceous impurities (sand/$\\text{SiO}_2$).

#### Chemical Reaction Zones in the Furnace:
1. **Combustion Zone (Bottom, $\\approx 1800^\\circ\\text{C} - 2000^\\circ\\text{C}$):**
   Preheated air blast oxidizes coke in an intensely exothermic reaction:
   $$C_{(s)} + O_{2(g)} \\longrightarrow CO_{2(g)} \\quad (\\Delta H = -394\\text{ kJ/mol})$$
2. **Reduction Zone (Upper Middle, $\\approx 500^\\circ\\text{C} - 800^\\circ\\text{C}$):**
   Rising $CO_2$ is reduced by hot coke to carbon monoxide:
   $$CO_{2(g)} + C_{(s)} \\longrightarrow 2CO_{(g)}$$
   Carbon monoxide then reduces iron(III) oxide stepwise:
   $$3\\text{Fe}_2\\text{O}_{3(s)} + CO_{(g)} \\longrightarrow 2\\text{Fe}_3\\text{O}_{4(s)} + CO_{2(g)}$$
   $$\\text{Fe}_3\\text{O}_{4(s)} + CO_{(g)} \\longrightarrow 3\\text{FeO}_{(s)} + CO_{2(g)}$$
   $$\\text{FeO}_{(s)} + CO_{(g)} \\longrightarrow \\text{Fe}_{(l)} + CO_{2(g)}$$
3. **Slag Formation Zone (Middle, $\\approx 1000^\\circ\\text{C}$):**
   Thermal decomposition of limestone:
   $$\\text{CaCO}_{3(s)} \\longrightarrow \\text{CaO}_{(s)} + CO_{2(g)}$$
   Calcium oxide combines with silica to form molten calcium silicate (slag):
   $$\\text{CaO}_{(s)} + \\text{SiO}_{2(s)} \\longrightarrow \\text{CaSiO}_{3(l)} \\quad (\\text{Molten Slag})$$
   Molten slag is less dense than molten iron and floats on top, preventing re-oxidation of iron by incoming air.

---

### 3. Comparison of Iron Varieties

| Variety | Carbon Content | Physical Properties | Industrial Applications |
| :--- | :--- | :--- | :--- |
| **Pig Iron** | $3.5\\% - 4.5\\%$ | Very hard, brittle, low melting point ($\\approx 1200^\\circ\\text{C}$) | Direct furnace product; refined into cast iron and steel |
| **Cast Iron** | $2.5\\% - 3.5\\%$ | Hard, brittle, non-malleable, cannot be welded or forged | Engine engine blocks, manhole covers, lamp posts, drain pipes |
| **Wrought Iron** | $< 0.15\\%$ (Purest) | Soft, ductile, highly malleable, high tensile strength | Ornamental gates, agricultural chains, crane hooks, railway couplings |
| **Mild Steel** | $0.15\\% - 0.30\\%$ | Strong, ductile, easily welded and forged | Girders, car bodywork, structural beams, roofing sheets |
| **Stainless Steel** | $Fe + 18\\% Cr + 8\\% Ni$ | Corrosion-resistant, tough, non-reactive | Surgical instruments, cutlery, chemical plant reactors |

---

### 4. Extraction of Aluminium (Hall-Héroult Process)

1. **Bayer Purification of Bauxite ($\\text{Al}_2\\text{O}_3 \\cdot 2\\text{H}_2\\text{O}$):**
   - Crushed bauxite is digested in concentrated hot $NaOH$ solution under pressure. Amphoteric $\\text{Al}_2\\text{O}_3$ dissolves to form soluble sodium tetrahydroxoaluminate(III):
     $$\\text{Al}_2\\text{O}_{3(s)} + 2NaOH_{(aq)} + 3\\text{H}_2O_{(l)} \\longrightarrow 2\\text{Na}[\\text{Al}(\\text{OH})_4]_{(aq)}$$
   - Insoluble impurities (ferric oxide / "red mud") are filtered off.
   - The filtrate is seeded with pure aluminium hydroxide crystals:
     $$\\text{Na}[\\text{Al}(\\text{OH})_4]_{(aq)} \\longrightarrow \\text{Al}(\\text{OH})_{3(s)} \\downarrow + NaOH_{(aq)}$$
   - Precipitated $\\text{Al}(\\text{OH})_3$ is calcined at $1200^\\circ\\text{C}$ to yield pure alumina:
     $$2\\text{Al}(\\text{OH})_{3(s)} \\overset{\\Delta}{\\longrightarrow} \\text{Al}_2\\text{O}_{3(s)} + 3\\text{H}_2O_{(g)}$$

2. **Electrolytic Reduction Cell:**
   - **Electrolyte:** Pure molten alumina dissolved in molten **cryolite** ($\\text{Na}_3\\text{AlF}_6$) with fluorspar ($\\text{CaF}_2$) at $950^\\circ\\text{C}$.
   - **Role of Cryolite:** Cryolite depresses the melting point of pure alumina from $2050^\\circ\\text{C}$ down to $\\approx 950^\\circ\\text{C}$ and significantly enhances electrical conductivity.
   - **Cathode (Carbon lining):**
     $$\\text{Al}^{3+} + 3e^- \\longrightarrow \\text{Al}_{(l)}$$
   - **Anode (Graphite rods):**
     $$2\\text{O}^{2-} \\longrightarrow O_{2(g)} + 4e^-$$
     *Crucial WAEC Note:* The released oxygen attacks the hot graphite anodes, burning them into carbon dioxide ($C + O_2 \\rightarrow CO_2$); hence, graphite anodes must be replaced periodically.`,
    keyTakeaways: [
      'In the blast furnace, carbon monoxide (CO) is the primary reducing agent reducing iron oxide to molten iron.',
      'Limestone serves as a basic flux to remove acidic silica as floating molten slag (CaSiO3).',
      'Cryolite (Na3AlF6) lowers the melting point of alumina from 2050°C to 950°C and increases electrolyte conductivity.',
      'Graphite anodes in aluminium extraction must be periodically replaced because they burn away reacting with liberated oxygen.'
    ],
    associatedQuizId: 'waec-ss3-chem-metals-extraction-quiz'
  },

  // ==========================================
  // WEEK 4: METALS & THEIR EXTRACTION II (COPPER & SODIUM)
  // ==========================================
  {
    id: 'chem-ss3-term2-week4',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Metals & Their Extraction II: Copper Refining and the Downs Cell Electrolysis of Sodium',
    subtopics: [
      'Extraction of Copper from Chalcopyrite: Froth Flotation, Smelting, and Bessemerization',
      'Electrolytic Refining of Blister Copper with Acidified Copper(II) Sulphate',
      'Extraction of Sodium via the Downs Cell: Electrolyte Composition and Cell Architecture',
      'Safety and Industrial Value of Sodium By-Products (Chlorine Gas and Anode Slimes)'
    ],
    readingTimeMinutes: 9,
    summary: 'Study copper metallurgy from chalcopyrite ore to 99.99% electrolytic copper refining, and explore sodium extraction in the Downs cell using molten sodium chloride.',
    contentMarkdown: `### 1. Metallurgy and Extraction of Copper

The primary commercial ore of copper is **copper pyrites** (chalcopyrite, $\\text{CuFeS}_2$):

1. **Froth Flotation:** Finely crushed ore is agitated with water and pine oil. Air bubbles selectively carry hydrophobic sulfide particles to the frothing surface, leaving behind gangue.
2. **Roasting:** Concentrated sulfide ore is roasted in a reverberatory furnace with controlled air:
   $$2\\text{CuFeS}_{2(s)} + O_{2(g)} \\longrightarrow \\text{Cu}_2\\text{S}_{(s)} + 2\\text{FeS}_{(s)} + \\text{SO}_{2(g)}$$
3. **Smelting & Bessemerization:** Sand ($\\text{SiO}_2$) is added. Silica reacts with oxidized iron to form iron silicate slag:
   $$\\text{FeO}_{(s)} + \\text{SiO}_{2(s)} \\longrightarrow \\text{FeSiO}_{3(l)} \\quad (\\text{Slag removed})$$
   Air is blown through remaining molten copper(I) sulfide:
   $$2\\text{Cu}_2\\text{S}_{(l)} + 3O_{2(g)} \\longrightarrow 2\\text{Cu}_2\\text{O}_{(l)} + 2\\text{SO}_{2(g)}$$
   $$\\text{Cu}_2\\text{S}_{(l)} + 2\\text{Cu}_2\\text{O}_{(l)} \\longrightarrow 6\\text{Cu}_{(l)} + \\text{SO}_{2(g)}$$
   As molten copper solidifies, escaping $\\text{SO}_2$ gas produces a blistered surface called **blister copper** ($98\\% - 99\\%$ purity).

---

### 2. Electrolytic Refining of Blister Copper

To achieve the $99.99\\%$ electrical conductivity required for power cables, blister copper is refined electrolytically:

- **Anode:** Thick slab of impure blister copper.
- **Cathode:** Thin sheet of pure $99.99\\%$ copper.
- **Electrolyte:** Aqueous copper(II) sulphate ($\\text{CuSO}_4$) acidified with dilute $\\text{H}_2\\text{SO}_4$.

#### Electrode Reactions:
- **At Anode (Oxidation):**
  $$\\text{Cu}_{(s, \\text{impure})} \\longrightarrow \\text{Cu}^{2+}_{(aq)} + 2e^-$$
  Active metals (iron, zinc, nickel) dissolve into solution as ions. Noble impurities (gold, silver, platinum) fall to the cell floor as valuable **anode slime/mud**.
- **At Cathode (Reduction):**
  $$\\text{Cu}^{2+}_{(aq)} + 2e^- \\longrightarrow \\text{Cu}_{(s, \\text{pure})}$$
  The cathode grows steadily in weight while the impure anode dissolves.

---

### 3. Downs Cell Electrolytic Extraction of Sodium

[Diagram: chemical-electrolytic-downs-cell]

Sodium cannot be extracted by chemical reduction or electrolysis of aqueous sodium chloride because hydrogen ions ($\\text{H}^+$) would be preferentially discharged at the cathode due to their lower standard reduction potential ($E^\\circ$).

#### The Downs Cell Operation:
- **Electrolyte:** Molten mixture of anhydrous $\\text{NaCl}$ ($40\\%$) and $\\text{CaCl}_2$ ($60\\%$) at $\\approx 600^\\circ\\text{C}$.
- **Function of Calcium Chloride ($\\text{CaCl}_2$):** Pure $\\text{NaCl}$ melts at $801^\\circ\\text{C}$, a temperature at which sodium forms an intractable metallic fog and boils vigorously ($883^\\circ\\text{C}$). Adding $\\text{CaCl}_2$ depresses the operating eutectic melting point to $\\approx 600^\\circ\\text{C}$.
- **Anode (Central Graphite Column):**
  $$2\\text{Cl}^-_{(l)} \\longrightarrow \\text{Cl}_{2(g)} + 2e^-$$
  Chlorine gas is collected through an inverted nickel-lined conical dome.
- **Cathode (Cylindrical Circular Steel Ring):**
  $$\\text{Na}^+_{(l)} + e^- \\longrightarrow \\text{Na}_{(l)}$$
  Liquid sodium is less dense than the molten salt bath (density $\\approx 0.97\\text{ g/cm}^3$ vs. $1.8\\text{ g/cm}^3$) and floats upward into an inverted steel collecting vessel under an inert dry nitrogen atmosphere.
- **Wire Gauze Diaphragm:** A concentric cylindrical steel mesh screen separates the anode and cathode chambers, preventing liberated sodium from coming into contact with chlorine gas to avoid explosive recombination.`,
    keyTakeaways: [
      'In electrolytic refining of copper, the anode is impure blister copper, the cathode is pure copper, and anode slime contains noble metals (Ag, Au).',
      'Sodium must be extracted from molten anhydrous NaCl, not aqueous brine, because H+ is discharged preferentially to Na+.',
      'In the Downs cell, CaCl2 lowers the melting point of NaCl from 801°C to 600°C.',
      'The steel wire gauze diaphragm in the Downs cell prevents explosive recombination of liquid sodium and chlorine gas.'
    ],
    associatedQuizId: 'waec-ss3-chem-downs-cell-quiz'
  },

  // ==========================================
  // WEEK 5: COORDINATION CHEMISTRY & TRANSITION METALS
  // ==========================================
  {
    id: 'chem-ss3-term2-week5',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Coordination Chemistry & Transition Metals: d-Block Orbitals, Complex Ions & Ligand Bonding',
    subtopics: [
      'Definition of First Transition Series ($_{21}\\text{Sc}$ to $_{30}\\text{Zn}$) and Electronic Configurations',
      'Distinguishing Properties: Variable Oxidation States, Paramagnetism, and Catalytic Action',
      'Origin of Color in Transition Metal Ions: Crystal Field d-d Electronic Transitions',
      'Complex Ion Formation: Central Metal Ion, Ligand Classifications, and IUPAC Nomenclature'
    ],
    readingTimeMinutes: 10,
    summary: 'Analyze the distinctive properties of d-block transition elements, explore coordinate covalent bonding in complex ions, and master IUPAC coordination nomenclature.',
    contentMarkdown: `### 1. Definition and Electronic Configuration of Transition Elements

A **transition element** is defined as a d-block element that forms at least one stable ion possessing an **incompletely filled d-subshell**.

Under this strict IUPAC definition:
- **Scandium ($_{21}\\text{Sc}$):** $[\\text{Ar}] 4s^2 3d^1$. Its only stable ion is $\\text{Sc}^{3+}$ ($[\\text{Ar}] 3d^0$), possessing no d-electrons; hence scandium salts are white and diamagnetic.
- **Zinc ($_{30}\\text{Zn}$):** $[\\text{Ar}] 4s^2 3d^{10}$. Its stable ion $\\text{Zn}^{2+}$ ($[\\text{Ar}] 3d^{10}$) possesses a completely full d-subshell; hence zinc is not considered a true transition element.
- **Chromium ($_{24}\\text{Cr}$):** $[\\text{Ar}] 4s^1 3d^5$ (Half-filled orbital stability).
- **Copper ($_{29}\\text{Cu}$):** $[\\text{Ar}] 4s^1 3d^{10}$ (Completely filled orbital stability).

---

### 2. Characteristic Properties of Transition Elements

| Characteristic | Fundamental Physical & Chemical Explanation | Practical Example |
| :--- | :--- | :--- |
| **Variable Oxidation States** | Energy difference between $4s$ and $3d$ electrons is very small; both can participate in bonding | Iron forms $\\text{Fe}^{2+}$ ($+2$) and $\\text{Fe}^{3+}$ ($+3$); Manganese exhibits states from $+2$ to $+7$ |
| **Paramagnetism** | Presence of unpaired d-electrons creates permanent net magnetic dipole moments | $\\text{Fe}^{3+}$ ($3d^5$, $5$ unpaired electrons) is strongly paramagnetic; $\\text{Zn}^{2+}$ is diamagnetic |
| **Catalytic Activity** | Variable oxidation states provide alternative reaction pathways with lower activation energies; vacant d-orbitals adsorb reactants | $\\text{V}_2\\text{O}_5$ in Contact Process; finely divided $\\text{Fe}$ in Haber Process; $\\text{Ni}$ in hydrogenation |
| **Formation of Colored Ions** | Ligand field causes splitting of degenerate $3d$ orbitals into $t_{2g}$ and $e_g$ energy levels. Absorption of visible light promotes d-d transitions | $[\\text{Cu}(\\text{H}_2\\text{O})_6]^{2+}$ absorbs red-yellow photons and appears sky blue |

---

### 3. Structure and Bonding in Complex Ions

A **complex ion** consists of a central transition metal cation surrounded by and datively bonded to electron-pair donor molecules or anions known as **ligands**.

#### Types of Ligands:
- **Monodentate:** Donates one lone pair of electrons (e.g., $:NH_3$, $H_2\\ddot{O}:$, $:\\ddot{Cl}:^-$, $:\\bar{C}\\equiv N:$).
- **Bidentate:** Donates two lone pairs from two separate atoms (e.g., 1,2-diaminoethane / en, oxalate ion $\\text{C}_2\\text{O}_4^{2-}$).
- **Polydentate / Chelating:** Donates multiple lone pairs (e.g., $\\text{EDTA}^{4-}$ / hexadentate).

#### Coordination Number and Geometry:
- **Coordination Number 2:** Linear geometry (e.g., $[\\text{Ag}(\\text{NH}_3)_2]^+$ / Tollens' reagent).
- **Coordination Number 4:** Tetrahedral (e.g., $[\\text{CoCl}_4]^{2-}$) or Square Planar (e.g., $[\\text{Ni}(\\text{CN})_4]^{2-}$).
- **Coordination Number 6:** Octahedral (e.g., $[\\text{Fe}(\\text{CN})_6]^{3-}$, $[\\text{Cu}(\\text{H}_2\\text{O})_6]^{2+}$).

---

### 4. IUPAC Nomenclature of Coordination Complexes

1. **Order of Naming:** Name ligands first in alphabetical order, followed by the central metal.
2. **Ligand Names:** Neutral ligands retain ordinary names with special exceptions: $\\text{H}_2\\text{O}$ is **aqua**, $\\text{NH}_3$ is **ammine**, $\\text{CO}$ is **carbonyl**. Anionic ligands end in **-o**: $\\text{Cl}^-$ is **chlorido**, $\\text{CN}^-$ is **cyanido**, $\\text{OH}^-$ is **hydroxo**.
3. **Prefixes:** Use di-, tri-, tetra-, penta-, hexa- for ligand quantities.
4. **Metal Name Ending:**
   - In cationic or neutral complexes, use English metal name (e.g., copper, iron, cobalt).
   - In anionic complexes, metal name ends in **-ate** with Latin roots where applicable: iron $\\rightarrow$ **ferrate**, copper $\\rightarrow$ **cuprate**, lead $\\rightarrow$ **plumbate**, silver $\\rightarrow$ **argentate**, tin $\\rightarrow$ **stannate**.
5. **Oxidation State:** Roman numeral in parentheses at the end.

| Formula | IUPAC Systematic Name | Coordination Number | Geometry |
| :--- | :--- | :--- | :--- |
| $[\\text{Cu}(\\text{NH}_3)_4]^{2+}$ | Tetraamminecopper(II) ion | 4 | Square Planar |
| $[\\text{Fe}(\\text{CN})_6]^{4-}$ | Hexacyanidoferrate(II) ion | 6 | Octahedral |
| $[\\text{Fe}(\\text{CN})_6]^{3-}$ | Hexacyanidoferrate(III) ion | 6 | Octahedral |
| $[\\text{Ag}(\\text{NH}_3)_2]\\text{Cl}$ | Diamminesilver(I) chloride | 2 | Linear |
| $\\text{K}_4[\\text{Fe}(\\text{CN})_6]$ | Potassium hexacyanidoferrate(II) | 6 | Octahedral |`,
    keyTakeaways: [
      'Transition metals are characterized by partially filled d-orbitals, variable valency, paramagnetism, and catalytic prowess.',
      'Scandium(III) and Zinc(II) ions are colorless and diamagnetic because Sc3+ has no 3d electrons (3d0) and Zn2+ has completely filled 3d orbitals (3d10).',
      'The color of transition metal complexes originates from d-d electronic transitions following crystal field splitting of degenerate d-orbitals.',
      'Ligands are Lewis bases that donate electron pairs to central metal cations via coordinate covalent bonds.'
    ],
    associatedQuizId: 'waec-ss3-chem-transition-metals-quiz'
  },

  // ==========================================
  // WEEK 6: MID-TERM WAEC STOICHIOMETRY CLINIC
  // ==========================================
  {
    id: 'chem-ss3-term2-week6',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Mid-Term Assessment & WAEC Stoichiometry Clinic: Quantitative Calculations and Problem Solving',
    subtopics: [
      'Redox Titration Stoichiometry (KMnO4 and K2Cr2O7 with Fe2+ and Ethanedioate)',
      'Gas Volume Stoichiometry at Standard Temperature and Pressure (STP)',
      'Empirical Formula, Molecular Formula, and Percentage Purity Determinations',
      'Nuclear Half-Life and Radiochemical Disintegration Calculations'
    ],
    readingTimeMinutes: 10,
    summary: 'Consolidate quantitative chemistry principles, master redox titration calculations, solve multi-step stoichiometry problems, and review exam marking rubrics.',
    contentMarkdown: `### 1. The Mole Concept and Stoichiometric Formulas

Chemical calculations in WAEC SSCE examinations depend on foundational relationships:

$$\\text{Moles } (n) = \\frac{\\text{Mass in grams } (m)}{\\text{Molar Mass in g/mol } (M)} = \\frac{\\text{Concentration } (C) \\times \\text{Volume in dm}^3 (V)}{1} = \\frac{\\text{Gas Volume at STP in dm}^3}{22.4\\text{ dm}^3}$$

$$\\text{Molar Concentration } (\\text{mol/dm}^3) = \\frac{\\text{Mass Concentration in g/dm}^3}{\\text{Molar Mass in g/mol}}$$

$$\\text{Percentage Purity} = \\frac{\\text{Mass of Pure Substance}}{\\text{Total Mass of Impure Sample}} \\times 100\\%$$

---

### 2. Worked Redox Titration Problem

**Problem:** $25.0\\text{ cm}^3$ of acidified iron(II) sulphate solution required $20.0\\text{ cm}^3$ of $0.0200\\text{ mol/dm}^3$ potassium tetraoxomanganate(VII) ($\\text{KMnO}_4$) solution for complete oxidation.

The ionic equation for the reaction is:
$$\\text{MnO}_4^- + 5\\text{Fe}^{2+} + 8\\text{H}^+ \\longrightarrow \\text{Mn}^{2+} + 5\\text{Fe}^{3+} + 4\\text{H}_2\\text{O}$$

Calculate:
1. The molar concentration of $\\text{Fe}^{2+}$ in the solution.
2. The mass concentration of anhydrous $\\text{FeSO}_4$ in $\\text{g/dm}^3$ ($Fe = 56, S = 32, O = 16$).

**Step-by-Step Solution:**
1. **Apply the Titration Ratio Formula:**
   $$\\frac{C_A \\times V_A}{C_B \\times V_B} = \\frac{n_A}{n_B}$$
   Where:
   - $C_A = 0.0200\\text{ mol/dm}^3$ (Concentration of $\\text{MnO}_4^-$)
   - $V_A = 20.0\\text{ cm}^3$
   - $V_B = 25.0\\text{ cm}^3$
   - $\\frac{n_A}{n_B} = \\frac{1}{5}$
2. **Solve for $C_B$ (Concentration of $\\text{Fe}^{2+}$):**
   $$\\frac{0.0200 \\times 20.0}{C_B \\times 25.0} = \\frac{1}{5}$$
   $$\\frac{0.400}{25.0 \\cdot C_B} = \\frac{1}{5} \\implies 25.0 \\cdot C_B = 0.400 \\times 5 = 2.00$$
   $$C_B = \\frac{2.00}{25.0} = 0.0800\\text{ mol/dm}^3$$
3. **Determine Molar Mass of $\\text{FeSO}_4$:**
   $$M(\\text{FeSO}_4) = 56 + 32 + (4 \\times 16) = 56 + 32 + 64 = 152\\text{ g/mol}$$
4. **Calculate Mass Concentration:**
   $$\\text{Mass Conc.} = \\text{Molar Conc.} \\times \\text{Molar Mass}$$
   $$\\text{Mass Conc.} = 0.0800\\text{ mol/dm}^3 \\times 152\\text{ g/mol} = 12.16\\text{ g/dm}^3$$

---

### 3. Empirical Formula from Combustion Data

**Problem:** Combustion of $0.440\\text{ g}$ of an organic compound containing carbon, hydrogen, and oxygen produced $0.880\\text{ g}$ of $\\text{CO}_2$ and $0.360\\text{ g}$ of $\\text{H}_2\\text{O}$. If the vapour density of the compound is $44$, determine its empirical and molecular formulas ($C = 12, H = 1, O = 16$).

1. **Mass of Carbon in $0.880\\text{ g } \\text{CO}_2$:**
   $$m_C = \\frac{12}{44} \\times 0.880\\text{ g} = 0.240\\text{ g}$$
2. **Mass of Hydrogen in $0.360\\text{ g } \\text{H}_2\\text{O}$:**
   $$m_H = \\frac{2}{18} \\times 0.360\\text{ g} = 0.040\\text{ g}$$
3. **Mass of Oxygen by Difference:**
   $$m_O = 0.440\\text{ g} - (0.240 + 0.040)\\text{ g} = 0.440 - 0.280 = 0.160\\text{ g}$$
4. **Mole Ratios:**
   - Carbon: $\\frac{0.240}{12} = 0.020$
   - Hydrogen: $\\frac{0.040}{1} = 0.040$
   - Oxygen: $\\frac{0.160}{16} = 0.010$
5. **Divide by Smallest ($0.010$):**
   - $C: \\frac{0.020}{0.010} = 2$
   - $H: \\frac{0.040}{0.010} = 4$
   - $O: \\frac{0.010}{0.010} = 1$
   **Empirical Formula:** $\\text{C}_2\\text{H}_4\\text{O}$ (Empirical mass $= (2 \\times 12) + 4 + 16 = 44$).
6. **Molecular Formula:**
   $$\\text{Molar Mass} = 2 \\times \\text{Vapour Density} = 2 \\times 44 = 88\\text{ g/mol}$$
   $$(\\text{C}_2\\text{H}_4\\text{O})_n = 88 \\implies 44n = 88 \\implies n = 2$$
   **Molecular Formula:** $\\text{C}_4\\text{H}_8\\text{O}_2$ (Ethyl ethanoate or butanoic acid).`,
    keyTakeaways: [
      'In redox titrations involving KMnO4, the mole ratio (1 : 5) between MnO4- and Fe2+ must be derived from the balanced ionic half-equations.',
      'Molar mass equals two times vapour density: Molar Mass = 2 × V.D.',
      'Always determine oxygen mass in combustion analysis by subtracting the masses of carbon and hydrogen from the total sample mass.'
    ],
    associatedQuizId: 'waec-ss3-chem-stoichiometry-quiz'
  },

  // ==========================================
  // WEEK 7: FATS, OILS & SAPONIFICATION
  // ==========================================
  {
    id: 'chem-ss3-term2-week7',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Organic Chemistry: Fats, Oils, Saponification & the Chemistry of Soaps vs. Detergents',
    subtopics: [
      'Structure of Lipids: Esters of Propane-1,2,3-triol (Glycerol) and Long-Chain Fatty Acids',
      'Distinction Between Saturated Fats and Unsaturated Oils (Hydrogenation & Hardening)',
      'The Saponification Reaction: Alkaline Hydrolysis with NaOH and KOH',
      'Mechanism of Cleansing Action: Micelle Formation and Behavior in Hard vs. Soft Water'
    ],
    readingTimeMinutes: 9,
    summary: 'Study lipid structures, examine alkaline hydrolysis to yield soaps and glycerol, and analyze micelle cleansing dynamics and detergent chemistry in hard water.',
    contentMarkdown: `### 1. Chemical Nature of Fats and Oils

**Fats and oils** belong to the ester family and are chemically classified as **triglycerides** (triesters of propane-1,2,3-triol, commonly known as glycerol, with high-molecular-weight monocarboxylic fatty acids).

$$\\begin{matrix}
\\text{CH}_2-\\text{O}-\\text{CO}-\\text{R}_1 \\\\
| \\phantom{\\text{O}-\\text{CO}-\\text{R}_1} \\\\
\\text{CH}-\\text{O}-\\text{CO}-\\text{R}_2 \\\\
| \\phantom{\\text{O}-\\text{CO}-\\text{R}_2} \\\\
\\text{CH}_2-\\text{O}-\\text{CO}-\\text{R}_3
\\end{matrix}$$

#### Important Fatty Acids:
- **Stearic Acid:** $\\text{C}_{17}\\text{H}_{35}\\text{COOH}$ (Saturated).
- **Palmitic Acid:** $\\text{C}_{15}\\text{H}_{31}\\text{COOH}$ (Saturated, prevalent in Nigerian palm oil).
- **Oleic Acid:** $\\text{C}_{17}\\text{H}_{33}\\text{COOH}$ (Unsaturated, contains one $C=C$ double bond).
- **Linoleic Acid:** $\\text{C}_{17}\\text{H}_{31}\\text{COOH}$ (Polyunsaturated, contains two $C=C$ double bonds).

#### Fats vs. Oils:
- **Fats:** Rich in saturated fatty acids with straight carbon chains that pack tightly together; solid at room temperature ($25^\\circ\\text{C}$), e.g., tallow, lard, butter.
- **Oils:** Rich in unsaturated fatty acids with cis-double bonds that induce kinks in hydrocarbon chains, preventing dense packing; liquid at room temperature, e.g., groundnut oil, palm kernel oil.
- **Hardening of Oils:** Catalytic hydrogenation of vegetable oils with hydrogen gas ($H_2$) at $180^\\circ\\text{C}$ over a nickel ($\\text{Ni}$) catalyst converts liquid oils into solid margarine.

---

### 2. The Saponification Reaction

**Saponification** is the alkaline hydrolysis of fats or oils by boiling them with concentrated aqueous caustic soda ($NaOH$) or caustic potash ($KOH$) to yield **soap** (sodium or potassium salts of fatty acids) and **glycerol** as a valuable by-product:

$$\\text{Triglyceride} + 3NaOH \\longrightarrow 3\\text{R}-\\text{COO}^-\\text{Na}^+ \\; (\\text{Soap}) + \\text{CH}_2\\text{OH}-\\text{CHOH}-\\text{CH}_2\\text{OH} \\; (\\text{Glycerol})$$

#### Salting Out the Soap:
After boiling, concentrated saturated brine ($\\text{NaCl}_{(aq)}$) is added to the mixture. By the **common-ion effect**, the high concentration of sodium ions ($\\text{Na}^+$) exceeds the solubility product ($K_{sp}$) of the sodium carboxylate, precipitating solid soap curds to the surface.

---

### 3. Mechanism of Cleansing Action

A soap molecule (e.g., sodium stearate, $\\text{C}_{17}\\text{H}_{35}\\text{COO}^-\\text{Na}^+$) consists of two distinct regions:
1. **Hydrophobic Non-Polar Tail ($\\text{C}_{17}\\text{H}_{35}-$):** Lipophilic hydrocarbon chain; insoluble in water but readily soluble in oily grease dirt.
2. **Hydrophilic Polar Head ($-\\text{COO}^-$):** Ionic group; readily solvated by polar water molecules via ion-dipole interactions.

#### Cleansing Process (Micelle Formation):
When soap is introduced to water containing grease:
- The hydrophobic tails bury themselves into the grease droplet.
- The hydrophilic ionic heads point outward into surrounding water.
- Agitation shears the grease into tiny microscopic droplets called **micelles**.
- Because the outer surface of every micelle carries negative charges ($-\\text{COO}^-$), electrostatic repulsion prevents them from coalescing, allowing them to remain suspended as an emulsion that is easily rinsed away.

---

### 4. Soaps versus Synthetic Detergents in Hard Water

| Parameter | Soaps (e.g., Sodium Palmitate) | Synthetic Detergents (e.g., Sodium Alkyl Benzene Sulphonate) |
| :--- | :--- | :--- |
| **Chemical Formulation** | Sodium or potassium salts of carboxylic fatty acids ($\\text{R}-\\text{COO}^-\\text{Na}^+$) | Sodium salts of alkyl sulphonates ($\\text{R}-\\text{SO}_3^-\\text{Na}^+$) or alkyl sulphates |
| **Raw Material Source** | Renewable natural fats and vegetable oils | Petrochemical hydrocarbons |
| **Performance in Hard Water** | Ineffective; forms insoluble precipitates (scum) with $\\text{Ca}^{2+}$ and $\\text{Mg}^{2+}$: $2\\text{C}_{17}\\text{H}_{35}\\text{COO}^- + \\text{Ca}^{2+} \\rightarrow (\\text{C}_{17}\\text{H}_{35}\\text{COO})_2\\text{Ca} \\downarrow$ | Highly effective; calcium and magnesium alkyl sulphonates are completely water-soluble |
| **Performance in Acidic Water** | Loses cleansing power (protonated into insoluble free fatty acids: $\\text{R}-\\text{COOH}$) | Retains cleansing efficiency in moderately acidic solutions |
| **Biodegradability** | $100\\%$ completely biodegradable | Branched-chain detergents resist biodegradation and cause river foaming; linear alkyl detergents are biodegradable |`,
    keyTakeaways: [
      'Saponification is the alkaline hydrolysis of triglycerides to produce soap and propane-1,2,3-triol (glycerol).',
      'Adding concentrated NaCl (brine) "salts out" the soap due to the common-ion effect of Na+ ions.',
      'Soaps form insoluble grey scum with Ca2+ and Mg2+ ions in hard water, whereas synthetic detergents do not form scum.'
    ],
    associatedQuizId: 'waec-ss3-chem-saponification-quiz'
  },

  // ==========================================
  // WEEK 8: GIANT MACROMOLECULES: POLYMERS & POLYMERIZATION
  // ==========================================
  {
    id: 'chem-ss3-term2-week8',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Giant Macromolecules: Addition vs. Condensation Polymerization, Natural Rubber & Plastics',
    subtopics: [
      'Concepts of Monomers, Polymers, and Degree of Polymerization',
      'Addition Polymerization: Mechanism, Polyethene, Polychloroethene (PVC), and Polystyrene',
      'Condensation Polymerization: Polyamides (Nylon-6,6) and Polyesters (Terylene/Dacron)',
      'Natural Rubber (cis-polyisoprene) and Vulcanization with Sulfur; Thermoplastics vs. Thermosetting Plastics'
    ],
    readingTimeMinutes: 10,
    summary: 'Compare addition and condensation polymerization mechanisms, investigate vulcanization of natural rubber, and evaluate thermoplastics vs thermosets.',
    contentMarkdown: `### 1. Classification of Polymerization Mechanisms

**Polymerization** is the chemical process in which many small simple molecules (**monomers**) combine covalently to form a gigantic high-molecular-weight chain molecule (**polymer** or **macromolecule**).

| Feature | Addition Polymerization | Condensation Polymerization |
| :--- | :--- | :--- |
| **Monomer Requirement** | Must contain carbon-carbon double bonds ($C=C$) | Must possess at least two reactive functional groups (bifunctional or polyfunctional) |
| **Small By-Products** | None (100% of monomer mass is incorporated into polymer) | Small molecules (such as $\\text{H}_2\\text{O}$, $\\text{HCl}$, $\\text{NH}_3$) are eliminated |
| **Empirical Formula** | Empirical formula of polymer is identical to that of monomer | Empirical formula of polymer differs from those of monomers |
| **Key Commercial Examples** | Polyethene, Polychloroethene (PVC), Polytetrafluoroethene (Teflon), Perspex | Nylon-6,6, Terylene (Dacron/PET), Bakelite, Urea-formaldehyde resins |

---

### 2. Major Addition Polymers

1. **Polyethene (Polyethylene):**
   - **Monomer:** Ethene ($\\text{CH}_2=\\text{CH}_2$).
   - **Reaction:**
     $$n\\,(\\text{CH}_2=\\text{CH}_2) \\overset{\\text{initiator}}{\\longrightarrow} -[-\\text{CH}_2-\\text{CH}_2-]_n-$$
   - **LDPE (Low Density):** Plastic bags, flexible film wraps.
   - **HDPE (High Density):** Rigid water pipes, detergent bottles, buckets.
2. **Polychloroethene (PVC / Polyvinyl Chloride):**
   - **Monomer:** Chloroethene (Vinyl chloride, $\\text{CH}_2=\\text{CH}-\\text{Cl}$).
   - **Uses:** Electrical cable insulation, sewage pipes, synthetic leather raincoats.
3. **Polytetrafluoroethene (PTFE / Teflon):**
   - **Monomer:** Tetrafluoroethene ($\\text{CF}_2=\\text{CF}_2$).
   - **Properties:** Chemically inert, heat-resistant up to $300^\\circ\\text{C}$, extremely low coefficient of friction. Used in non-stick cookware coatings.

---

### 3. Major Condensation Polymers

1. **Nylon-6,6 (A Synthetic Polyamide):**
   - **Monomers:** Hexanedioic acid (adipic acid) and Hexane-1,6-diamine.
   - **Functional Linkage:** **Amide bond / peptide linkage** ($-CO-NH-$):
     $$n\\,\\text{HOOC}-(\\text{CH}_2)_4-\\text{COOH} + n\\,\\text{H}_2\\text{N}-(\\text{CH}_2)_6-\\text{NH}_2 \\longrightarrow -[-\\text{CO}-(\\text{CH}_2)_4-\\text{CONH}-(\\text{CH}_2)_6-\\text{NH}-]_n- + 2n\\,\\text{H}_2\\text{O}$$
   - **Uses:** Parachute cords, fishing lines, toothbrush bristles, textile fabrics.
2. **Terylene / Dacron / PET (A Synthetic Polyester):**
   - **Monomers:** Benzene-1,4-dicarboxylic acid (terephthalic acid) and Ethane-1,2-diol (ethylene glycol).
   - **Functional Linkage:** **Ester linkage** ($-COO-$).
   - **Uses:** Wrinkle-resistant synthetic garments, PET plastic beverage bottles.

---

### 4. Natural Rubber and Vulcanization

**Natural rubber** is tapped as a milky latex from the bark of the rubber tree (*Hevea brasiliensis*). Chemically, it is **cis-1,4-polyisoprene**:

- **Monomer:** Isoprene (2-methylbuta-1,3-diene, $\\text{CH}_2=\\text{C}(\\text{CH}_3)-\\text{CH}=\\text{CH}_2$).
- **Limitations of Raw Natural Rubber:** Soft and sticky in hot weather, brittle in cold weather, low tensile strength, soluble in non-polar organic solvents, easily deformed permanently under mechanical stress.
- **The Vulcanization Process (Charles Goodyear, 1839):**
  Raw rubber is heated with $1\\% - 5\\%$ elemental sulfur ($S$) at $\\approx 140^\\circ\\text{C}$. Sulfur atoms open up remaining double bonds and form **disulfide covalent cross-links** ($-S-S-$) between adjacent polyisoprene hydrocarbon chains.
- **Physical Effects of Vulcanization:**
  - Dramatically increases tensile strength and mechanical toughness.
  - Imparts high elasticity (chains return to original shapes after stretching).
  - Eliminates temperature sensitivity and renders rubber insoluble in petrol and benzene.
  - Used for automobile tyres, conveyer belts, and high-pressure hydraulic hoses.

---

### 5. Thermoplastics versus Thermosetting Plastics

| Parameter | Thermoplastics | Thermosetting Plastics (Thermosets) |
| :--- | :--- | :--- |
| **Polymer Chain Architecture** | Linear or lightly branched chains held together by weak intermolecular van der Waals forces | Extensively cross-linked 3D giant network lattice joined by strong covalent bonds |
| **Response to Heat** | Softens upon heating and hardens upon cooling reversibly; can be remolded repeatedly | Decomposes and chars when heated; does not melt and cannot be reshaped |
| **Solubility** | Soluble in suitable organic solvents | Insoluble in all solvents |
| **Examples** | Polyethene, Polystyrene, Polyvinyl chloride (PVC), Nylon | Bakelite (phenol-methanal), Melamine, Urea-formaldehyde resins |`,
    keyTakeaways: [
      'Addition polymerization requires unsaturated monomers and yields no small by-products; condensation polymerization eliminates small molecules like H2O.',
      'Nylon-6,6 contains amide linkages (-CO-NH-), whereas Terylene contains ester linkages (-COO-).',
      'Vulcanization introduces sulfur cross-links between polyisoprene chains, enhancing tensile strength and thermal stability.',
      'Thermoplastics can be repeatedly remelted and reshaped, whereas thermosets have permanent covalent 3D cross-links and decompose on heating.'
    ],
    associatedQuizId: 'waec-ss3-chem-polymers-quiz'
  },

  // ==========================================
  // WEEK 9: CARBOHYDRATES & PROTEINS
  // ==========================================
  {
    id: 'chem-ss3-term2-week9',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Biochemistry: Carbohydrates, Amino Acids, Proteins & Enzyme Catalysis',
    subtopics: [
      'Classification of Carbohydrates: Monosaccharides, Disaccharides, and Polysaccharides',
      'Reducing vs. Non-Reducing Sugars: Tollens and Fehling/Benedict Diagnostic Tests',
      'Structure of α-Amino Acids: Zwitterions and Amphoteric Behavior',
      'Formation of Peptide Bonds and Protein Denaturation Factors (Heat, pH, Heavy Metals)'
    ],
    readingTimeMinutes: 9,
    summary: 'Analyze carbohydrates, conduct biochemical diagnostic tests for reducing sugars and proteins, examine amino acid zwitterions, and investigate protein denaturation.',
    contentMarkdown: `### 1. Classification of Carbohydrates

**Carbohydrates** are polyhydroxy aldehydes, polyhydroxy ketones, or substances that hydrolyze to produce them, having the general empirical formula $\\text{C}_x(\\text{H}_2\\text{O})_y$.

1. **Monosaccharides (Simple Sugars):** Cannot be hydrolyzed into smaller carbohydrate units.
   - **Aldohexoses ($\\text{C}_6\\text{H}_{12}\\text{O}_6$):** Glucose, Galactose (contain an aldehyde group, $-CHO$).
   - **Ketohexoses ($\\text{C}_6\\text{H}_{12}\\text{O}_6$):** Fructose (contains a ketone group, $>C=O$).
2. **Disaccharides ($\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}$):** Yield two monosaccharide units upon acid or enzyme hydrolysis.
   - **Sucrose (Cane Sugar):** $\\text{Glucose} + \\text{Fructose}$ (Non-reducing sugar; both anomeric carbons involved in glycosidic bond).
   - **Maltose (Malt Sugar):** $\\text{Glucose} + \\text{Glucose}$ (Reducing sugar).
   - **Lactose (Milk Sugar):** $\\text{Glucose} + \\text{Galactose}$ (Reducing sugar).
3. **Polysaccharides ($(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n$):** High-molecular-weight polymers of glucose.
   - **Starch:** Plant storage carbohydrate (Amylose + Amylopectin); yields deep blue-black color with iodine solution.
   - **Cellulose:** Structural plant cell wall polymer composed of $\\beta$-1,4-glycosidic linkages; indigestible by humans.
   - **Glycogen:** Animal storage carbohydrate stored in mammalian liver and muscles.

---

### 2. Reducing vs. Non-Reducing Sugar Tests

A **reducing sugar** possesses a free or potentially free hemiacetal aldehyde ($-CHO$) or $\\alpha$-hydroxy ketone group capable of reducing mild oxidizing reagents.

| Diagnostic Test | Procedure | Observation with Reducing Sugar (Glucose, Maltose) | Observation with Non-Reducing Sugar (Sucrose) |
| :--- | :--- | :--- | :--- |
| **Fehling’s Test** | Boil sample with equal volumes of Fehling’s A ($CuSO_4$) and Fehling’s B (alkaline sodium potassium tartrate) | Brick-red precipitate of copper(I) oxide ($\\text{Cu}_2\\text{O} \\downarrow$) formed | Solution remains clear royal blue (no change) |
| **Benedict’s Test** | Add Benedict’s reagent (copper sulphate in alkaline sodium citrate) and boil for 2 minutes | Gradual color shift: Blue $\\rightarrow$ Green $\\rightarrow$ Yellow $\\rightarrow$ Orange $\\rightarrow$ Brick-red precipitate | Solution remains clear blue |
| **Tollens’ Test (Silver Mirror)** | Warm sample gently with ammoniacal silver nitrate solution ($[\\text{Ag}(\\text{NH}_3)_2]^+$) | Shining mirror of elemental silver ($\\text{Ag}$) coats the inner test-tube wall | No silver deposit formed |

*Crucial Note on Sucrose:* Boiling sucrose with dilute hydrochloric acid ($HCl$) hydrolyzes it into equimolar amounts of glucose and fructose ("invert sugar"), which subsequently yield positive results with Fehling's reagent upon neutralization with $NaOH$.

---

### 3. Amino Acids, Zwitterions & Peptide Bonds

**Amino acids** are the building blocks of proteins. All naturally occurring amino acids found in proteins are **$\\alpha$-amino acids**, possessing an amine group ($-NH_2$) and a carboxyl group ($-COOH$) attached to the same alpha-carbon atom:

$$\\text{H}_2\\text{N}-\\text{CH}(\\text{R})-\\text{COOH}$$

#### The Zwitterion (Internal Dipolar Ion):
In aqueous neutral solution, the acidic carboxyl group donates a proton to the basic amino group, generating a dipolar **zwitterion**:

$$\\text{H}_3\\text{N}^+-\\text{CH}(\\text{R})-\\text{COO}^-$$

Because of this internal ionic structure, amino acids are **amphoteric** (act as buffers):
- In acidic medium (low pH): The $-COO^-$ accepts a proton to become a cation ($-\\text{COOH}$).
- In basic medium (high pH): The $-NH_3^+$ loses a proton to become an anion ($-\\text{NH}_2$).

#### Peptide Bond Formation:
Two amino acids undergo condensation to form a **dipeptide** joined by a covalent **peptide bond** ($-CO-NH-$):

$$\\text{H}_2\\text{N}-\\text{CH}(\\text{R}_1)-\\text{COOH} + \\text{H}_2\\text{N}-\\text{CH}(\\text{R}_2)-\\text{COOH} \\longrightarrow \\text{H}_2\\text{N}-\\text{CH}(\\text{R}_1)-\\text{CO}-\\text{NH}-\\text{CH}(\\text{R}_2)-\\text{COOH} + \\text{H}_2\\text{O}$$

---

### 4. Protein Structure & Denaturation

1. **Levels of Structure:**
   - **Primary:** Exact linear sequence of amino acids in polypeptide chains.
   - **Secondary:** Regular folding ($\\alpha$-helix and $\\beta$-pleated sheet) stabilized by hydrogen bonding.
   - **Tertiary:** 3D conformation stabilized by disulfide bridges ($-S-S-$), ionic bonds, and hydrophobic interactions.
   - **Quaternary:** Assembly of multiple polypeptide subunits (e.g., hemoglobin with $4$ subunits).
2. **Protein Denaturation:**
   The disruption of secondary, tertiary, and quaternary native conformations without cleaving primary covalent peptide bonds.
   - **Denaturing Agents:** Extreme heat ($> 60^\\circ\\text{C}$), strong mineral acids and alkalis (pH change), heavy metal cations ($\text{Ag}^+, \text{Pb}^{2+}, \text{Hg}^{2+}$), and organic solvents (ethanol).
   - **Consequence:** Insoluble coagulation and irreversible loss of biological enzymatic activity (e.g., frying egg albumen).`,
    keyTakeaways: [
      'Glucose and maltose are reducing sugars that precipitate brick-red Cu2O with Fehling\'s or Benedict\'s solution; sucrose is non-reducing unless hydrolyzed.',
      'Amino acids exist as dipolar zwitterions and exhibit amphoteric buffering properties in aqueous solutions.',
      'Proteins consist of amino acids joined by peptide bonds (-CO-NH-); denaturation disrupts tertiary structure without breaking primary peptide bonds.'
    ],
    associatedQuizId: 'waec-ss3-chem-biomolecules-quiz'
  },

  // ==========================================
  // WEEK 10: INDUSTRIAL CHEMISTRY & CHEMICAL POLLUTION
  // ==========================================
  {
    id: 'chem-ss3-term2-week10',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Industrial Chemistry & Chemical Pollution: Haber & Contact Processes, Effluents & Green Chemistry',
    subtopics: [
      'Industrial Synthesis of Ammonia (Haber Process): Le Chatelier Conditions and Economics',
      'Industrial Manufacture of Tetraoxosulphate(VI) Acid (Contact Process)',
      'Atmospheric Pollution: Acid Rain Formation, Greenhouse Effect, and Ozone Layer Depletion',
      'Industrial Effluents, Heavy Metal Toxicity, and Principles of Green Chemistry in Nigeria'
    ],
    readingTimeMinutes: 10,
    summary: 'Examine industrial synthesis of NH3 and H2SO4 using Le Chatelier principles, evaluate atmospheric and water pollution, and apply green chemistry standards in Nigeria.',
    contentMarkdown: `### 1. The Haber Process for Ammonia Synthesis

Ammonia is synthesized industrially by the direct catalytic combination of atmospheric nitrogen and hydrogen gas:

$$\\text{N}_{2(g)} + 3\\text{H}_{2(g)} \\rightleftharpoons 2\\text{NH}_{3(g)} \\quad (\\Delta H = -92\\text{ kJ/mol})$$

#### Optimization via Le Chatelier’s Principle:
- **Temperature ($400^\\circ\\text{C} - 450^\\circ\\text{C}$):** The forward reaction is exothermic. Low temperature favors high equilibrium yield, but drastically slows reaction rate. $450^\\circ\\text{C}$ represents an optimum commercial compromise.
- **Pressure ($200\\text{ atmospheres}$):** 4 volumes of reactants yield 2 volumes of product. High pressure shifts equilibrium to the right and increases particle collision frequency.
- **Catalyst:** Finely divided iron enriched with potassium oxide ($\\text{K}_2\\text{O}$) and aluminium oxide ($\\text{Al}_2\\text{O}_3$) promoters. The catalyst increases reaction rate without affecting equilibrium position.

---

### 2. The Contact Process for Tetraoxosulphate(VI) Acid

Manufacture of concentrated sulphuric acid ($\\text{H}_2\\text{SO}_4$):

1. **Combustion of Sulphur:**
   $$S_{(s)} + O_{2(g)} \\longrightarrow \\text{SO}_{2(g)}$$
2. **Catalytic Oxidation of Sulphur Dioxide to Sulphur Trioxide:**
   $$2\\text{SO}_{2(g)} + O_{2(g)} \\underset{\\text{V}_2\\text{O}_5,\\, 450^\\circ\\text{C}}{\\overset{1-2\\text{ atm}}{\\rightleftharpoons}} 2\\text{SO}_{3(g)} \\quad (\\Delta H = -197\\text{ kJ/mol})$$
   - **Catalyst:** Vanadium(V) oxide ($\\text{V}_2\\text{O}_5$).
3. **Absorption of $\\text{SO}_3$ into Concentrated $\\text{H}_2\\text{SO}_4$:**
   *Crucial WAEC Note:* $\\text{SO}_3$ gas is **never dissolved directly into water** because the reaction is violently exothermic, producing a dense mist of sulphuric acid droplets that are difficult to condense.
   Instead, $\\text{SO}_3$ is absorbed into $98\\%$ concentrated $\\text{H}_2\\text{SO}_4$ to form **oleum** (fuming sulphuric acid, $\\text{H}_2\\text{S}_2\\text{O}_7$):
   $$\\text{SO}_{3(g)} + \\text{H}_2\\text{SO}_{4(l)} \\longrightarrow \\text{H}_2\\text{S}_2\\text{O}_{7(l)} \\quad (\\text{Oleum})$$
4. **Controlled Dilution of Oleum:**
   $$\\text{H}_2\\text{S}_2\\text{O}_{7(l)} + \\text{H}_2\\text{O}_{(l)} \\longrightarrow 2\\text{H}_2\\text{SO}_{4(l)} \\quad (98\\% \\text{ pure acid})$$

---

### 3. Atmospheric Pollution & Environmental Chemistry

| Environmental Challenge | Primary Causal Agents | Chemical Mechanism & Reactions | Environmental Consequences |
| :--- | :--- | :--- | :--- |
| **Acid Rain** | $\\text{SO}_2$ and $\\text{NO}_x$ from burning fossil fuels and metal smelters | $\\text{SO}_{2} + \\text{H}_2\\text{O} \\rightarrow \\text{H}_2\\text{SO}_3$; $2\\text{H}_2\\text{SO}_3 + O_2 \\rightarrow 2\\text{H}_2\\text{SO}_4$; $4\\text{NO}_2 + 2\\text{H}_2\\text{O} + O_2 \\rightarrow 4\\text{HNO}_3$ | Leaches essential soil minerals ($Mg^{2+}, Ca^{2+}$), acidifies freshwater lakes killing fish, corrodes marble/limestone monuments |
| **Greenhouse Effect & Global Warming** | Carbon dioxide ($\\text{CO}_2$), Methane ($\\text{CH}_4$), CFCs, Water vapor | Trapping of terrestrial re-radiated infrared radiation ($IR$) within the troposphere | Rising sea levels, desertification in Northern Nigeria, extreme weather patterns |
| **Ozone Layer Depletion** | Chlorofluorocarbons (CFCs / Freons) | UV photolysis releases free chlorine radicals: $\\text{CF}_2\\text{Cl}_2 \\overset{h\\nu}{\\rightarrow} \\text{CF}_2\\text{Cl}^\\bullet + \\text{Cl}^\\bullet$; $\\text{Cl}^\\bullet + O_3 \\rightarrow \\text{ClO}^\\bullet + O_2$; $\\text{ClO}^\\bullet + O \\rightarrow \\text{Cl}^\\bullet + O_2$ | Increased ground-level UV-B radiation causing human skin melanoma, eye cataracts, and marine phytoplankton mortality |

---

### 4. Principles of Green Chemistry in Nigeria

To combat industrial effluent pollution in major manufacturing clusters (Ikeja, Trans-Amadi, Bompai):
1. **Waste Prevention:** Synthesize processes with minimal chemical waste rather than treating effluents after production.
2. **Atom Economy:** Maximize incorporation of all starting materials into the final desired product.
3. **Biodegradable Materials:** Replace single-use petro-plastics with bioplastics derived from cassava starch.
4. **Effluent Neutralization:** Compulsory neutralization of acidic and basic effluents, with precipitation of heavy metals ($\text{Pb}^{2+}, \text{Cd}^{2+}, \text{Hg}^{2+}$) prior to environmental discharge into Nigerian rivers.`,
    keyTakeaways: [
      'In the Haber process, optimum commercial conditions are 450°C, 200 atm, and a finely divided iron catalyst.',
      'In the Contact process, SO3 is absorbed in concentrated H2SO4 to yield oleum (H2S2O7), preventing dangerous acid mist formation.',
      'CFCs catalyze stratospheric ozone depletion through free radical chain reactions involving chlorine radicals (Cl•).',
      'Acid rain results from atmospheric dissolution of SO2 and NOx emissions, forming dilute H2SO4 and HNO3.'
    ],
    associatedQuizId: 'waec-ss3-chem-industrial-pollution-quiz'
  },

  // ==========================================
  // WEEK 11: QUALITATIVE INORGANIC ANALYSIS
  // ==========================================
  {
    id: 'chem-ss3-term2-week11',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Qualitative Inorganic Analysis: Systematic Cation and Anion Identification Schemes',
    subtopics: [
      'Principles of Qualitative Analysis: Solubility Rules and Reagent Functions',
      'Confirmatory Cation Schemes: Fe2+, Fe3+, Cu2+, Al3+, Zn2+, Pb2+, and NH4+ with NaOH and NH3',
      'Confirmatory Anion Schemes: CO3(2-), SO4(2-), SO3(2-), Cl-, and NO3-',
      'Distinction between Amphoteric Hydroxides: Aluminium, Zinc, and Lead'
    ],
    readingTimeMinutes: 10,
    summary: 'Master systematic qualitative testing protocols for cations and anions using aqueous sodium hydroxide, ammonia, and specific confirmatory reagents for WAEC practicals.',
    contentMarkdown: `### 1. General Principles of Cation Testing

Qualitative cation identification relies upon adding dilute sodium hydroxide ($NaOH_{(aq)}$) and aqueous ammonia ($NH_{3(aq)}$) dropwise until in excess, observing the color and solubility behavior of the resulting metallic hydroxide precipitates:

$$\\text{M}^{n+}_{(aq)} + n\\text{OH}^-_{(aq)} \\longrightarrow \\text{M}(\\text{OH})_{n(s)} \\downarrow$$

---

### 2. Comprehensive Cation Identification Matrix

| Cation | Action of Dropwise $NaOH_{(aq)}$ | Action of Excess $NaOH_{(aq)}$ | Action of Dropwise $NH_{3(aq)}$ | Action of Excess $NH_{3(aq)}$ | Confirmatory Diagnostic Test |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **$\\text{Fe}^{2+}$ (Iron II)** | Dirty green gelatinous precipitate of $\\text{Fe}(\\text{OH})_2$ | Insoluble in excess; turns reddish-brown at surface on standing due to aerial oxidation | Dirty green gelatinous precipitate of $\\text{Fe}(\\text{OH})_2$ | Insoluble in excess $NH_3$ | Add potassium hexacyanidoferrate(III) solution: yields dark Turnbull's blue precipitate |
| **$\\text{Fe}^{3+}$ (Iron III)** | Reddish-brown gelatinous precipitate of $\\text{Fe}(\\text{OH})_3$ | Insoluble in excess $NaOH$ | Reddish-brown gelatinous precipitate of $\\text{Fe}(\\text{OH})_3$ | Insoluble in excess $NH_3$ | Add potassium thiocyanate ($KSCN$): yields blood-red coloration ($[\\text{Fe}(\\text{SCN})]^{2+}$) |
| **$\\text{Cu}^{2+}$ (Copper II)** | Pale blue precipitate of $\\text{Cu}(\\text{OH})_2$ | Insoluble in excess $NaOH$ | Pale blue precipitate of $\\text{Cu}(\\text{OH})_2$ | **Dissolves in excess** to yield deep royal blue solution of $[\\text{Cu}(\\text{NH}_3)_4]^{2+}$ | Deep blue solution with excess ammonia confirms copper |
| **$\\text{Al}^{3+}$ (Aluminium)** | White gelatinous precipitate of $\\text{Al}(\\text{OH})_3$ | **Dissolves in excess** to form clear colorless sodium tetrahydroxoaluminate | White gelatinous precipitate of $\\text{Al}(\\text{OH})_3$ | **Insoluble in excess** $NH_3$ | Insoluble in excess $NH_3$ distinguishes $\\text{Al}^{3+}$ from $\\text{Zn}^{2+}$ |
| **$\\text{Zn}^{2+}$ (Zinc)** | White gelatinous precipitate of $\\text{Zn}(\\text{OH})_2$ | **Dissolves in excess** to form clear colorless sodium tetrahydroxozincate | White gelatinous precipitate of $\\text{Zn}(\\text{OH})_2$ | **Dissolves in excess** to form clear solution of $[\\text{Zn}(\\text{NH}_3)_4]^{2+}$ | Dissolves in both excess $NaOH$ and excess $NH_3$ |
| **$\\text{Pb}^{2+}$ (Lead II)** | White powdery precipitate of $\\text{Pb}(\\text{OH})_2$ | **Dissolves in excess** to form clear colorless sodium tetrahydroxoplumbate | White powdery precipitate of $\\text{Pb}(\\text{OH})_2$ | **Insoluble in excess** $NH_3$ | Add dilute $HCl$: white precipitate of $\\text{PbCl}_2$ soluble on boiling, reprecipitates on cooling; or add $KI$: bright canary-yellow $\\text{PbI}_2$ precipitate |
| **$\\text{NH}_4^+$ (Ammonium)** | No precipitate formed in cold; upon warming, pungent gas turns red litmus paper blue | No precipitate | No precipitate formed with aqueous ammonia | No precipitate | Pungent gas evolved gives dense white fumes with glass rod dipped in concentrated $HCl$ |

---

### 3. Systematic Anion Identification Schemes

| Anion | Test Reagent & Procedure | Observations | Balanced Chemical Equation |
| :--- | :--- | :--- | :--- |
| **$\\text{CO}_3^{2-}$ (Carbonate)** | Add dilute $HCl$ or $\\text{HNO}_3$ | Rapid effervescence of colorless, odorless gas that turns lime water ($\\text{Ca}(\\text{OH})_2$) milky | $\\text{CO}_3^{2-} + 2\\text{H}^+ \\rightarrow \\text{CO}_2 \\uparrow + \\text{H}_2\\text{O}$; $\\text{CO}_2 + \\text{Ca}(\\text{OH})_2 \\rightarrow \\text{CaCO}_3 \\downarrow + \\text{H}_2\\text{O}$ |
| **$\\text{SO}_4^{2-}$ (Sulphate)** | Add dilute $HCl$ or $\\text{HNO}_3$, followed by $\\text{BaCl}_2$ or $\\text{Ba}(\\text{NO}_3)_2$ solution | Dense white precipitate of $\\text{BaSO}_4$ which is **completely insoluble in excess dilute acid** | $\\text{Ba}^{2+}_{(aq)} + \\text{SO}_{4(aq)}^{2-} \\longrightarrow \\text{BaSO}_{4(s)} \\downarrow$ |
| **$\\text{SO}_3^{2-}$ (Sulphite)** | Add dilute $HCl$ and warm gently | Pungent suffocating gas ($\\text{SO}_2$) evolved that turns acidified $\\text{K}_2\\text{Cr}_2\\text{O}_7$ paper from orange to green | $\\text{SO}_3^{2-} + 2\\text{H}^+ \\rightarrow \\text{SO}_2 \\uparrow + \\text{H}_2\\text{O}$; $\\text{Cr}_2\\text{O}_7^{2-} + 3\\text{SO}_2 + 2\\text{H}^+ \\rightarrow 2\\text{Cr}^{3+} + 3\\text{SO}_4^{2-} + \\text{H}_2\\text{O}$ |
| **$\\text{Cl}^-$ (Chloride)** | Acidify with dilute $\\text{HNO}_3$, add $\\text{AgNO}_3$ solution, then add excess aqueous $NH_3$ | Curdy white precipitate of $\\text{AgCl}$ which **readily dissolves in excess aqueous ammonia** | $\\text{Ag}^+ + \\text{Cl}^- \\rightarrow \\text{AgCl} \\downarrow$; $\\text{AgCl} + 2\\text{NH}_3 \\rightarrow [\\text{Ag}(\\text{NH}_3)_2]^+ + \\text{Cl}^-$ |
| **$\\text{NO}_3^-$ (Nitrate)** | **Brown Ring Test:** Add fresh saturated $\\text{FeSO}_4$ solution, tilt tube, slowly trickle concentrated $\\text{H}_2\\text{SO}_4$ down the inner wall | A distinct brown ring forms at the junction of the two liquid layers | $\\text{Fe}^{2+} + \\text{NO}_3^- + 4\\text{H}^+ \\rightarrow 3\\text{Fe}^{3+} + \\text{NO} + 2\\text{H}_2\\text{O}$; $[\\text{Fe}(\\text{H}_2\\text{O})_6]^{2+} + \\text{NO} \\rightarrow [\\text{Fe}(\\text{H}_2\\text{O})_5(\\text{NO})]^{2+} + \\text{H}_2\\text{O}$ |`,
    keyTakeaways: [
      'Al3+, Zn2+, and Pb2+ form amphoteric hydroxides that dissolve in excess NaOH; Zn2+ also dissolves in excess NH3, whereas Al3+ and Pb2+ do not.',
      'Lead(II) is confirmed by adding KI to produce a golden-yellow PbI2 precipitate, or by PbCl2 dissolving in hot water and recrystallizing when cold.',
      'Chloride ions yield a curdy white AgCl precipitate that dissolves in excess NH3; sulphate ions yield a white BaSO4 precipitate insoluble in dilute acids.'
    ],
    associatedQuizId: 'waec-ss3-chem-qualitative-analysis-quiz'
  },

  // ==========================================
  // WEEK 12: TERM REVIEW & PRACTICAL CHEMISTRY MASTERCLASS
  // ==========================================
  {
    id: 'chem-ss3-term2-week12',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Chemistry',
    term: '2nd Term',
    weekNumber: 12,
    topicTitle: 'Term Review & WAEC Practical Chemistry Masterclass: Titrimetric Protocols & Scoring Rubrics',
    subtopics: [
      'Review of Term Curriculum: Nuclear Chemistry, Metallurgy, Polymers, and Qualitative Tests',
      'Volumetric Analysis Protocols: Pipetting, Burette Reading, and Indicator Selection',
      'Concordant Titer Values, Average Titer Calculation, and Significant Figure Rules',
      'Comprehensive WAEC Practical Marking Scheme and Laboratory Safety Regulations'
    ],
    readingTimeMinutes: 10,
    summary: 'Consolidate 2nd Term chemistry concepts, master WAEC practical volumetric titrations, table documentation, indicator behaviors, and exam scoring rubrics.',
    contentMarkdown: `### 1. Volumetric Titration Laboratory Rules

In the WAEC Practical Chemistry Paper 3 examination, accurate titrimetric technique and proper tabular documentation account for over $50\\%$ of the practical score.

#### Apparatus Handling Protocol:
1. **The Pipette ($20.0\\text{ cm}^3$ or $25.0\\text{ cm}^3$):**
   - Rinse thoroughly with distilled water, then rinse with a small portion of the base solution to be transferred.
   - Fill until the bottom of the meniscus aligns exactly with the graduation line at eye level.
   - Drain naturally into the conical flask; touch the tip to the inner glass wall. **Never blow out the remaining liquid in the pipette tip** (the pipette is calibrated to retain that capillary droplet).
2. **The Burette ($50.0\\text{ cm}^3$):**
   - Rinse with distilled water, then with the standard acid solution.
   - Ensure the burette jet tip is completely filled with liquid and contains no trapped air bubbles.
   - Record initial and final readings to two decimal places ($0.00\\text{ cm}^3$), where the second decimal digit must be either a $0$ or a $5$ (e.g., $21.40\\text{ cm}^3$ or $21.45\\text{ cm}^3$).

---

### 2. Standard WAEC Titration Table Presentation

Candidates must record titration readings in a clear, fully headed table:

| Titration Run | Rough Titration | 1st Accurate Run | 2nd Accurate Run | 3rd Accurate Run |
| :--- | :--- | :--- | :--- | :--- |
| **Final Burette Reading ($\\text{cm}^3$)** | $22.50$ | $21.85$ | $43.65$ | $21.80$ |
| **Initial Burette Reading ($\\text{cm}^3$)** | $0.00$ | $0.00$ | $21.85$ | $0.00$ |
| **Volume of Acid Used (Titer) ($\\text{cm}^3$)** | $22.50$ | $21.85$ | $21.80$ | $21.80$ |

#### Determination of Average Titer ($V_A$):
- Select **concordant titer values** that agree within $\\pm 0.20\\text{ cm}^3$ of each other.
- The rough titration reading must never be included in the average unless it is concordant with the accurate runs.
- In the table above, the concordant values are $21.85$, $21.80$, and $21.80\\text{ cm}^3$:
  $$\\text{Average Titer } (V_A) = \\frac{21.85 + 21.80 + 21.80}{3} = \\frac{65.45}{3} = 21.82\\text{ cm}^3$$

---

### 3. Acid-Base Indicator Selection Criteria

| Indicator | pH Transition Range | Color in Acid Medium | Color at Equivalence End-Point | Color in Alkaline Medium | Suitable Titration Pairing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Methyl Orange (MO)** | $3.1 - 4.4$ | Pink / Red | Orange | Yellow | Strong Acid vs. Strong Base; **Strong Acid vs. Weak Base** (e.g., $HCl$ vs. $\\text{Na}_2\\text{CO}_3$) |
| **Phenolphthalein (POP)** | $8.3 - 10.0$ | Colorless | Pale Pink | Deep Magenta / Pink | Strong Acid vs. Strong Base; **Weak Acid vs. Strong Base** (e.g., $\\text{CH}_3\\text{COOH}$ vs. $NaOH$) |

*Crucial WAEC Examiner Rule:* Never use phenolphthalein for titrations involving a strong acid and a weak base (such as $HCl$ vs. $\\text{Na}_2\\text{CO}_3$), because the weak base buffer shifts the pH endpoint outside the transition zone of phenolphthalein, leading to premature color discharge and severe titer underestimation.

---

### 4. Summary Checklist for WAEC Chemistry Examination

1. **State Symbols:** Always include physical state symbols in chemical equations: $(s)$, $(l)$, $(g)$, and $(aq)$.
2. **Units and Precision:** Express molar concentrations to $3$ or $4$ significant figures with correct units ($\\text{mol/dm}^3$ or $\\text{g/dm}^3$).
3. **Qualitative Tests:** Always state:
   - Physical observation (e.g., "White precipitate soluble in excess $NaOH$ to give a clear colorless solution").
   - Chemical inference (e.g., "$\\text{Al}^{3+}, \\text{Zn}^{2+}, \\text{or } \\text{Pb}^{2+}$ present").
4. **Safety Precautions:** Avoid direct inhalation of gases; always waft gas fumes gently toward the nose. Always dilute concentrated acid by pouring acid slowly into water down a stirring rod, never water into acid.`,
    keyTakeaways: [
      'Burette readings must always be recorded to two decimal places, with the last digit ending in 0 or 5.',
      'Only concordant titer values within ±0.20 cm³ should be averaged to determine the mean acid volume.',
      'Methyl orange is essential when titrating strong acids against weak bases (e.g., HCl vs Na2CO3); phenolphthalein is used for weak acids against strong bases.',
      'Always add acid to water slowly down a stirring rod during dilution to prevent violent thermal splattering.'
    ],
    associatedQuizId: 'waec-ss3-chem-titration-practical-quiz'
  }
];
