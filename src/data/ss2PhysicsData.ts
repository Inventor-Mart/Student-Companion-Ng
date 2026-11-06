import { CurriculumTopic } from '../types';

export const SS2_PHYSICS_TOPICS: CurriculumTopic[] = [
  // --------------------------------------------------------------------------
  // WEEK 1: THERMAL EXPANSION IN SOLIDS & LIQUIDS
  // --------------------------------------------------------------------------
  {
    id: 'ss2-phy-t2-w1',
    associatedQuizId: 'waec-phy-ss2-thermal-expansion',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Heat Energy: Thermal Expansion in Solids & Liquids',
    subtopics: [
      'Molecular Explanation of Thermal Expansion (Asymmetrical Potential Energy Wells)',
      'Linear Expansivity ($\\alpha$), Area Expansivity ($\\beta = 2\\alpha$), and Volume Expansivity ($\\gamma = 3\\alpha$)',
      'Mathematical Derivations and Expansion Calculations ($L_2 = L_1[1 + \\alpha \\Delta \\theta]$)',
      'Applications: Bimetallic Strips, Thermostats, Riveting, and Railway Expansion Gaps',
      'Anomalous Expansion of Water between $0^\\circ\\text{C}$ and $4^\\circ\\text{C}$'
    ],
    readingTimeMinutes: 16,
    summary: 'The molecular basis of thermal expansion, expansivity coefficients, bimetallic thermostat mechanisms, and the biological significance of water’s anomalous behavior.',
    contentMarkdown: `### 1. The Physics of Thermal Expansion

[Diagram: bimetallic-strip-thermostat]

When a solid body is heated, its constituent atoms or molecules gain kinetic energy and vibrate with greater amplitude. Because the interatomic potential energy curve is asymmetric, the mean equilibrium separation between atoms increases, causing macroscopic dimensional expansion.

| Expansivity Type | Symbol & Defining Ratio | Mathematical Formula | Relationship for Isotropic Solids | SI Unit |
|---|---|---|---|---|
| **Linear Expansivity** | $\\alpha = \\frac{\\Delta L}{L_1 \\Delta \\theta}$ | $L_2 = L_1 (1 + \\alpha \\Delta \\theta)$ | Fundamental base | $\\text{K}^{-1} \\text{ or } ^\\circ\\text{C}^{-1}$ |
| **Area (Superficial)** | $\\beta = \\frac{\\Delta A}{A_1 \\Delta \\theta}$ | $A_2 = A_1 (1 + \\beta \\Delta \\theta)$ | $\\beta \\approx 2\\alpha$ | $\\text{K}^{-1} \\text{ or } ^\\circ\\text{C}^{-1}$ |
| **Volume (Cubic)** | $\\gamma = \\frac{\\Delta V}{V_1 \\Delta \\theta}$ | $V_2 = V_1 (1 + \\gamma \\Delta \\theta)$ | $\\gamma \\approx 3\\alpha$ | $\\text{K}^{-1} \\text{ or } ^\\circ\\text{C}^{-1}$ |

---

### 2. Bimetallic Strips & Practical Engineering Applications

A **bimetallic strip** consists of two dissimilar metal strips of equal initial length (e.g. brass and iron) securely riveted along their lengths:
- **On Heating:** Brass has a higher linear expansivity ($\\alpha_{\\text{brass}} \\approx 19 \\times 10^{-6}\\text{ K}^{-1}$) than iron ($\\alpha_{\\text{iron}} \\approx 12 \\times 10^{-6}\\text{ K}^{-1}$). Consequently, brass expands more and forces the strip to **bend into an arc with brass on the outer convex curve**.
- **On Cooling:** Brass contracts more than iron, forcing the strip to bend with brass on the inner concave curve.
- **Thermostat Application:** In electric irons and fire alarms, this bending breaks or completes an electric circuit at a predetermined temperature.

---

### 3. Worked WAEC Expansion Calculation
**Problem:** A steel railway line has a length of $30.0\\text{ m}$ at a morning temperature of $15^\\circ\\text{C}$. Calculate its length at a midday temperature of $45^\\circ\\text{C}$ in Maiduguri, Nigeria. (Linear expansivity of steel $\\alpha = 1.1 \\times 10^{-5}\\text{ K}^{-1}$).

1. **Calculate Temperature Change ($\\Delta \\theta$):**
   $$\\Delta \\theta = 45 - 15 = 30^\\circ\\text{C} = 30\\text{ K}$$
2. **Calculate Increase in Length ($\\Delta L$):**
   $$\\Delta L = L_1 \\times \\alpha \\times \\Delta \\theta = 30.0 \\times (1.1 \\times 10^{-5}) \\times 30$$
   $$\\Delta L = 9.9 \\times 10^{-3}\\text{ m} = 0.0099\\text{ m} = 9.9\\text{ mm}$$
3. **Calculate Final Length ($L_2$):**
   $$L_2 = L_1 + \\Delta L = 30.0 + 0.0099 = 30.0099\\text{ m}$$`,
    keyTakeaways: [
      'For isotropic solid materials: beta = 2 * alpha and gamma = 3 * alpha.',
      'A bimetallic strip bends with the metal of higher expansivity on the outer convex side upon heating.',
      'Water reaches maximum density at 4 degrees C, preserving aquatic life beneath frozen lake surfaces.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 2: HEAT TRANSFER (CONDUCTION, CONVECTION, RADIATION)
  // --------------------------------------------------------------------------
  {
    id: 'ss2-phy-t2-w2',
    associatedQuizId: 'waec-phy-ss2-heat-transfer',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Heat Transfer: Conduction, Convection & Thermal Radiation',
    subtopics: [
      'Mechanisms of Conduction: Atomic Lattice Vibrations and Free Electron Diffusion',
      'Thermal Conductivity Formula: $\\frac{Q}{t} = \\frac{kA(\\theta_2 - \\theta_1)}{d}$',
      'Convection Currents: Density Differentials, Sea Breezes, and Land Breezes in Coastal Nigeria',
      'Thermal Radiation: Electromagnetic Waves, Prevost’s Theory of Exchanges, and Stefan-Boltzmann Law',
      'The Vacuum Thermos Flask: Engineering Design Minimizing All Three Modes of Heat Loss'
    ],
    readingTimeMinutes: 16,
    summary: 'The physical mechanisms of heat transfer, mathematical thermal conductivity, coastal wind circulation patterns, and thermos flask engineering.',
    contentMarkdown: `### 1. The Three Fundamental Modes of Heat Transfer

| Mode of Heat Transfer | Physical Mechanism | Medium Requirement | Relative Speed of Propagation |
|---|---|---|---|
| **Conduction** | Transfer of thermal vibrational energy from particle to particle without bulk movement of material; accelerated by mobile free conduction electrons in metals | Requires a solid or liquid medium | Relatively slow |
| **Convection** | Transfer of thermal energy through the macroscopic circulatory movement of fluids (liquids and gases) driven by buoyant density differences | Requires a fluid medium | Moderate |
| **Radiation** | Transfer of heat by means of **electromagnetic infrared waves** emitted by all matter above absolute zero ($0\\text{ K}$) | **Zero medium required** (propagates across total vacuum) | Speed of light ($3.0 \\times 10^8\\text{ m s}^{-1}$) |

---

### 2. Mathematical Law of Thermal Conduction

The rate of heat transfer through a uniform slab of material is given by:

$$\\frac{Q}{t} = \\frac{k A (\\theta_2 - \\theta_1)}{d}$$

Where:
- $Q/t$ = Rate of heat flow (Watts or $\\text{J s}^{-1}$).
- $k$ = Coefficient of thermal conductivity of the material ($\\text{W m}^{-1} \\text{ K}^{-1}$).
- $A$ = Cross-sectional surface area ($m^2$).
- $\\theta_2 - \\theta_1$ = Temperature difference across the faces ($K$).
- $d$ = Thickness of the conducting slab ($m$).

---

### 3. Engineering of the Vacuum Thermos Flask
A vacuum flask is designed to keep liquids hot or cold by systematically neutralizing all three heat loss mechanisms:
1. **Double-Walled Glass with Vacuum:** Prevents heat loss by **conduction** and **convection** because a vacuum contains no molecules.
2. **Silvered Inner Walls:** Highly polished silver mirror surfaces reflect infrared heat rays back into the contents, minimizing heat loss by **radiation**.
3. **Insulating Cork / Plastic Stopper:** Prevents heat loss by **convection currents** and evaporation to the ambient air.`,
    keyTakeaways: [
      'Metals are superior heat conductors due to mobile free valence electrons.',
      'Radiation is the only heat transfer mechanism that operates through empty space/vacuum.',
      'A vacuum flask stops conduction and convection with a vacuum and stops radiation with silvered walls.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 3: QUANTITY OF HEAT & HEAT CAPACITY
  // --------------------------------------------------------------------------
  {
    id: 'ss2-phy-t2-w3',
    associatedQuizId: 'waec-phy-ss2-heat-capacity',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Calorimetry: Specific Heat Capacity & Heat Calculations',
    subtopics: [
      'Heat Capacity ($C = mc$) vs. Specific Heat Capacity ($c = \\frac{Q}{m\\Delta\\theta}$)',
      'The Method of Mixtures: Heat Lost by Hot Body Equals Heat Gained by Cold Body',
      'Electrical Method of Determining Specific Heat Capacity ($IVt = mc\\Delta\\theta$)',
      'Calorimeter Precautions: Lagging, Stirring, and Temperature Readings',
      'WAEC Multi-Body Calorimetry Problems with Copper Calorimeters'
    ],
    readingTimeMinutes: 16,
    summary: 'Calorimetric principles: defining specific heat capacity, applying the conservation of thermal energy in mixtures, and electrical calorimetry calculations.',
    contentMarkdown: `### 1. Fundamental Calorimetric Quantities

- **Heat Capacity ($C$):** The quantity of heat required to raise the temperature of an entire body by one Kelvin ($C = \\frac{Q}{\\Delta\\theta}$, unit: $\\text{J K}^{-1}$).
- **Specific Heat Capacity ($c$):** The quantity of heat required to raise the temperature of unit mass ($1\\text{ kg}$) of a substance by one Kelvin:
  $$Q = m c \\Delta \\theta \\implies c = \\frac{Q}{m \\Delta \\theta} \\quad (\\text{Unit: } \\text{J kg}^{-1} \\text{ K}^{-1})$$

| Substance | Specific Heat Capacity ($c$ in $\\text{J kg}^{-1} \\text{ K}^{-1}$) | Practical Significance |
|---|---|---|
| **Water** | **$4,200$** | Exceptionally high; functions as industrial car engine coolant and stabilizes maritime coastal climates |
| **Aluminium**| $900$ | Moderate; heats up faster than water |
| **Iron / Steel**| $450$ | Low; requires little heat to achieve elevated temperatures |
| **Copper** | $400$ | Low; standard material for calorimeter vessels |
| **Lead** | $130$ | Very low; rises rapidly in temperature with minimal heat input |

---

### 2. Method of Mixtures Calculation

$$\\text{Heat Lost by Hot Metal} = \\text{Heat Gained by Water} + \\text{Heat Gained by Calorimeter}$$
$$m_m c_m (\\theta_m - \\theta_f) = m_w c_w (\\theta_f - \\theta_w) + m_c c_c (\\theta_f - \\theta_w)$$

#### Worked WAEC Problem:
A piece of iron of mass $0.20\\text{ kg}$ is heated to $100^\\circ\\text{C}$ and quickly transferred into a copper calorimeter of mass $0.15\\text{ kg}$ containing $0.25\\text{ kg}$ of water at $20^\\circ\\text{C}$. Find the final steady equilibrium temperature ($\\theta$). ($c_{\\text{water}} = 4200\\text{ J kg}^{-1}\\text{ K}^{-1}$, $c_{\\text{iron}} = 450\\text{ J kg}^{-1}\\text{ K}^{-1}$, $c_{\\text{copper}} = 400\\text{ J kg}^{-1}\\text{ K}^{-1}$).

1. **Express Heat Balance Equation:**
   $$0.20 \\times 450 \\times (100 - \\theta) = [0.25 \\times 4200 + 0.15 \\times 400] \\times (\\theta - 20)$$
   $$90(100 - \\theta) = [1050 + 60](\\theta - 20)$$
   $$9000 - 90\\theta = 1110(\\theta - 20)$$
   $$9000 - 90\\theta = 1110\\theta - 22200$$
   $$1200\\theta = 31200 \\implies \\theta = \\frac{31200}{1200} = 26.0^\\circ\\text{C}$$`,
    keyTakeaways: [
      'Specific heat capacity is the energy needed to raise 1 kg of a substance by 1 Kelvin.',
      'Water has an exceptionally high heat capacity (4200 J/kg/K), making it an ideal coolant.',
      'In electrical calorimetry: electrical energy input (IVt) equals thermal energy absorbed (mc*DeltaT).'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 4: LATENT HEAT & CHANGES OF STATE
  // --------------------------------------------------------------------------
  {
    id: 'ss2-phy-t2-w4',
    associatedQuizId: 'waec-phy-ss2-latent-heat',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Latent Heat, Evaporation & Changes of State',
    subtopics: [
      'Molecular Concept of Latent Heat: Breaking Intermolecular Bonds without Kinetic Temperature Rise',
      'Specific Latent Heat of Fusion ($l_f = 3.36 \\times 10^5\\text{ J kg}^{-1}$ for ice)',
      'Specific Latent Heat of Vaporization ($l_v = 2.26 \\times 10^6\\text{ J kg}^{-1}$ for steam)',
      'Cooling Curves: Identification of Phase Transitions and Supercooling',
      'Evaporation vs. Boiling (Surface Phenomenon vs. Bulk Bubble Formation)'
    ],
    readingTimeMinutes: 16,
    summary: 'The thermodynamics of phase changes: latent heat of fusion and vaporization, cooling curve plateaus, and evaporation vs boiling.',
    contentMarkdown: `### 1. The Physics of Latent Heat

**Latent heat** is the thermal energy absorbed or released by a substance during a change of physical state that occurs at **constant temperature**. Because the added energy increases the potential energy of molecules (overcoming intermolecular attractive forces) rather than their vibrational kinetic energy, the thermometer registers **zero temperature change**.

$$Q = m l \\implies l = \\frac{Q}{m} \\quad (\\text{Unit: } \\text{J kg}^{-1})$$

| Latent Heat Constant | Numerical Value for Water | Physical Meaning |
|---|---|---|
| **Specific Latent Heat of Fusion ($l_f$)** | **$3.36 \\times 10^5\\text{ J kg}^{-1}$** ($336\\text{ kJ kg}^{-1}$) | Energy needed to convert $1\\text{ kg}$ of ice at $0^\\circ\\text{C}$ to water at $0^\\circ\\text{C}$ |
| **Specific Latent Heat of Vaporization ($l_v$)** | **$2.26 \\times 10^6\\text{ J kg}^{-1}$** ($2260\\text{ kJ kg}^{-1}$) | Energy needed to convert $1\\text{ kg}$ of water at $100^\\circ\\text{C}$ to steam at $100^\\circ\\text{C}$ |

> [!NOTE]
> **Why is $l_v \\gg l_f$?** In melting, intermolecular hydrogen bonds are merely loosened as solid ice breaks into liquid water. In vaporization, hydrogen bonds must be completely broken and molecules separated against atmospheric pressure, requiring vastly greater energy.

---

### 2. Evaporation vs. Boiling

| Characteristic | Evaporation | Boiling |
|---|---|---|
| **Temperature** | Occurs at **any temperature** below boiling point | Occurs at one **fixed temperature** (Boiling point) |
| **Location** | Strictly a **surface phenomenon** | Occurs throughout the **entire bulk of liquid** with bubbles |
| **Bubble Formation** | **Zero bubbles** observed | Vigorous formation of steam vapor bubbles |
| **Thermal Effect** | Causes **cooling** of remaining liquid | Temperature remains strictly constant during boiling |
| **Dependence on Wind & Area** | Strongly accelerated by wind and large surface area | Independent of wind speed and surface area |`,
    keyTakeaways: [
      'Latent heat breaks intermolecular bonds without altering temperature.',
      'Steam at 100°C causes more severe burns than water at 100°C because of its enormous latent heat of vaporization.',
      'Boiling occurs when saturated vapor pressure equals atmospheric pressure.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 5: THE GAS LAWS & ABSOLUTE ZERO
  // --------------------------------------------------------------------------
  {
    id: 'ss2-phy-t2-w5',
    associatedQuizId: 'waec-phy-ss2-gas-laws',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'The Gas Laws: Boyle’s, Charles’s, Pressure Law & The Ideal Gas Equation',
    subtopics: [
      'Variables of State for a Gas: Pressure ($P$), Volume ($V$), and Absolute Temperature ($T$)',
      'Boyle’s Law: $P_1 V_1 = P_2 V_2$ at Constant Temperature (Isothermal)',
      'Charles’s Law: $\\frac{V_1}{T_1} = \\frac{V_2}{T_2}$ at Constant Pressure (Isobaric)',
      'The Pressure Law: $\\frac{P_1}{T_1} = \\frac{P_2}{T_2}$ at Constant Volume (Isochoric)',
      'The Kelvin Temperature Scale & Absolute Zero ($-273.15^\\circ\\text{C} = 0\\text{ K}$)',
      'The General Gas Equation: $\\frac{P_1 V_1}{T_1} = \\frac{P_2 V_2}{T_2}$ and $PV = nRT$'
    ],
    readingTimeMinutes: 17,
    summary: 'The empirical gas laws, thermodynamic absolute zero on the Kelvin scale, kinetic molecular theory justifications, and ideal gas equations.',
    contentMarkdown: `### 1. Summary of the Empirical Gas Laws

All gas law equations require temperature to be expressed on the **Absolute Kelvin Scale**:

$$T(\\text{K}) = \\theta(^\\circ\\text{C}) + 273$$

| Gas Law | Constant Parameter | Mathematical Relationship | Proportionality Statement | Graph Shape |
|---|---|---|---|---|
| **Boyle's Law** | **Temperature ($T$)** | $P_1 V_1 = P_2 V_2$ | $P \\propto \\frac{1}{V}$ | Rectangular hyperbola ($P$ vs $V$) |
| **Charles's Law** | **Pressure ($P$)** | $\\frac{V_1}{T_1} = \\frac{V_2}{T_2}$ | $V \\propto T$ | Straight line passing through $0\\text{ K}$ |
| **Pressure Law (Gay-Lussac)** | **Volume ($V$)** | $\\frac{P_1}{T_1} = \\frac{P_2}{T_2}$ | $P \\propto T$ | Straight line passing through $0\\text{ K}$ |
| **General Gas Law** | **Amount of gas ($n$)** | $\\frac{P_1 V_1}{T_1} = \\frac{P_2 V_2}{T_2}$ | Combined gas law | Three-dimensional state surface |

---

### 2. Kinetic Molecular Theory Explanation of Gas Pressure

The pressure exerted by a gas inside a container arises from the **incessant, random bombardment of gas molecules against the internal container walls**:
1. When volume is halved at constant temperature (Boyle's Law), the number of molecules per unit volume doubles, doubling collision frequency with walls, thereby **doubling pressure**.
2. When temperature is increased at constant volume (Pressure Law), molecules gain kinetic energy and move faster ($E_k \\propto T$). They collide more frequently and with greater momentum change per impact, thereby **increasing pressure**.

---

### 3. Worked WAEC Calculation: Combined Gas Law
**Problem:** A cylinder contains $0.050\\text{ m}^3$ of oxygen gas at a pressure of $2.0 \\times 10^5\\text{ Pa}$ and a temperature of $27^\\circ\\text{C}$. What will be its volume if the pressure increases to $5.0 \\times 10^5\\text{ Pa}$ and temperature rises to $87^\\circ\\text{C}$?

1. **Convert Temperatures to Kelvin:**
   - $T_1 = 27 + 273 = 300\\text{ K}$
   - $T_2 = 87 + 273 = 360\\text{ K}$
2. **Apply General Gas Equation:**
   $$\\frac{P_1 V_1}{T_1} = \\frac{P_2 V_2}{T_2} \\implies V_2 = \\frac{P_1 V_1 T_2}{P_2 T_1}$$
   $$V_2 = \\frac{(2.0 \\times 10^5) \\times 0.050 \\times 360}{(5.0 \\times 10^5) \\times 300} = \\frac{3600000}{150000000} = 0.024\\text{ m}^3$$`,
    keyTakeaways: [
      'Always convert temperature to Kelvin (K = °C + 273) in gas calculations.',
      'Boyle’s law applies at constant temperature; Charles’s law applies at constant pressure.',
      'Absolute zero (0 K or -273°C) is the temperature at which molecular translational motion ceases.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 6: MID-TERM REVIEW & THERMAL CALCULATIONS
  // --------------------------------------------------------------------------
  {
    id: 'ss2-phy-t2-w6',
    associatedQuizId: 'waec-phy-ss2-thermal-midterm',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Mid-Term Problem Clinic: Thermal Physics Synthesis & Marking Schemes',
    subtopics: [
      'Integrated Multi-Stage Calorimetry Problems (Ice at $-10^\\circ\\text{C}$ to Steam at $100^\\circ\\text{C}$)',
      'Avoiding Unit Conversion Errors in Expansivity, Pressure, and Heat Capacities',
      'WAEC Marking Guide Rules for Steps, Units, and Graphical Intercepts'
    ],
    readingTimeMinutes: 14,
    summary: 'Consolidation clinic addressing complex multi-stage phase transitions, gas law variations, and step-by-step marking rubrics.',
    contentMarkdown: `### 1. Multi-Stage Phase Transition Calculation

To calculate the total heat ($Q_{\\text{total}}$) required to convert $0.50\\text{ kg}$ of ice at $-10^\\circ\\text{C}$ to steam at $100^\\circ\\text{C}$:
1. **Stage 1 (Warm ice to $0^\\circ\\text{C}$):** $Q_1 = m c_{\\text{ice}} \\Delta \\theta_1 = 0.50 \\times 2100 \\times 10 = 10,500\\text{ J}$
2. **Stage 2 (Melt ice at $0^\\circ\\text{C}$):** $Q_2 = m l_f = 0.50 \\times 336,000 = 168,000\\text{ J}$
3. **Stage 3 (Heat water to $100^\\circ\\text{C}$):** $Q_3 = m c_{\\text{water}} \\Delta \\theta_3 = 0.50 \\times 4200 \\times 100 = 210,000\\text{ J}$
4. **Stage 4 (Vaporize water at $100^\\circ\\text{C}$):** $Q_4 = m l_v = 0.50 \\times 2,260,000 = 1,130,000\\text{ J}$
5. **Total Heat Required:**
   $$Q_{\\text{total}} = 10,500 + 168,000 + 210,000 + 1,130,000 = 1,518,500\\text{ J} \\approx 1.52\\text{ MJ}$$`,
    keyTakeaways: [
      'Multi-stage calorimetry requires separate terms for sensible heat (mc*DeltaT) and latent heat (ml).',
      'Never omit SI units in final answers; WAEC penalizes missing or incorrect units.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 7: GENERAL WAVE PROPERTIES & PROPAGATION
  // --------------------------------------------------------------------------
  {
    id: 'ss2-phy-t2-w7',
    associatedQuizId: 'waec-phy-ss2-wave-properties',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Waves: Classification, Mathematical Parameters & Wavefronts',
    subtopics: [
      'Mechanical Waves (Require Elastic Medium) vs. Electromagnetic Waves (Vacuum Capable)',
      'Transverse Waves (Perpendicular Oscillations) vs. Longitudinal Waves (Parallel Oscillations)',
      'Wave Parameters: Amplitude ($A$), Wavelength ($\\lambda$), Period ($T$), and Frequency ($f$)',
      'The Universal Wave Equation: $v = f \\lambda = \\frac{\\lambda}{T}$',
      'Fundamental Wave Phenomena: Reflection, Refraction, Diffraction, and Interference'
    ],
    readingTimeMinutes: 16,
    summary: 'The wave nature of energy transmission: classifying transverse and longitudinal waves, mathematical wave relations, and universal wave phenomena.',
    contentMarkdown: `### 1. Classification of Waves

[Diagram: transverse-wave-properties]

A **wave** is a disturbance that travels through a medium or vacuum, transferring energy and momentum from one location to another without causing permanent net displacement of the medium itself.

| Classification Criterion | Category 1 | Category 2 |
|---|---|---|
| **Medium Requirement** | **Mechanical Waves:** Require material medium (Sound, Water waves, Seismic waves) | **Electromagnetic Waves:** Travel through vacuum at $3 \\times 10^8\\text{ m/s}$ (Light, X-rays, Radio) |
| **Direction of Particle Oscillation**| **Transverse Waves:** Particles oscillate **perpendicular ($90^\\circ$)** to direction of wave energy propagation | **Longitudinal Waves:** Particles oscillate **parallel** to direction of wave propagation (Compressions & Rarefactions) |

---

### 2. The Universal Wave Equation

$$v = f \\lambda = \\frac{\\lambda}{T}$$

- **Wave Speed ($v$):** Distance traversed by a wavefront per unit time ($\\text{m s}^{-1}$).
- **Frequency ($f$):** Number of complete wave cycles passing a point per second (Hertz, $\\text{Hz}$).
- **Wavelength ($\\lambda$):** Spatial distance between two consecutive in-phase points (e.g. crest to crest).
- **Period ($T$):** Time taken to complete one full cycle ($T = \\frac{1}{f}$).

---

### 3. Four Universal Wave Behaviors
1. **Reflection:** Bouncing back of a wave when it encounters an interface. Angle of incidence equals angle of reflection ($i = r$).
2. **Refraction:** Change in wave speed and direction as it crosses from one medium into another of different optical/acoustic density. Frequency ($f$) remains constant!
3. **Diffraction:** The bending or spreading of waves around obstacles or through narrow apertures whose size is comparable to the wavelength ($\\lambda \\approx d$).
4. **Interference:** Superposition of two coherent wave trains producing regions of reinforcement (constructive) and cancellation (destructive).`,
    keyTakeaways: [
      'Transverse waves oscillate perpendicular to travel; longitudinal waves oscillate parallel to travel.',
      'Universal wave equation: v = f * lambda; frequency remains constant during refraction.',
      'Diffraction is most pronounced when the aperture width is comparable to the wavelength.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 8: SOUND WAVES & ACOUSTICS
  // --------------------------------------------------------------------------
  {
    id: 'ss2-phy-t2-w8',
    associatedQuizId: 'waec-phy-ss2-sound-acoustics',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Sound Waves: Propagation, Echoes, Resonance & Stationary Waves',
    subtopics: [
      'Production and Longitudinal Nature of Sound (Compressions and Rarefactions)',
      'Speed of Sound in Solids ($5000\\text{ m/s}$), Liquids ($1500\\text{ m/s}$), and Air ($330\\text{ m/s}$)',
      'Echoes and Echo Ranging: $v = \\frac{2d}{t}$ for Sonar and Geophysical Prospecting',
      'Characteristics of Musical Notes: Pitch (Frequency), Loudness (Amplitude), and Quality/Timbre (Overtones)',
      'Stationary (Standing) Waves in Open and Closed Acoustic Resonance Pipes'
    ],
    readingTimeMinutes: 16,
    summary: 'Acoustics: propagation of longitudinal sound waves, echo ranging calculations, musical characteristics, and resonant frequencies in pipes.',
    contentMarkdown: `### 1. Velocity of Sound in Media

Sound is a mechanical longitudinal wave requiring an elastic material medium.
- In Air ($20^\\circ\\text{C}$): $v \\approx 330 - 340\\text{ m s}^{-1}$. Speed increases with temperature ($v \\propto \\sqrt{T}$) and humidity.
- In Water: $v \\approx 1,500\\text{ m s}^{-1}$.
- In Steel / Solid rock: $v \\approx 5,000\\text{ m s}^{-1}$ (due to enormous elasticity modulus).

---

### 2. Echo Ranging Formula

An **echo** is the reflection of sound waves from a solid barrier. Because the sound pulse travels to the reflecting surface and back:

$$v = \\frac{2d}{t} \\implies d = \\frac{v \\times t}{2}$$

#### Worked Problem:
A marine vessel sends a high-frequency SONAR signal vertically downward into the ocean. The echo from the seabed is detected $1.40\\text{ seconds}$ later. If the speed of sound in seawater is $1,500\\text{ m s}^{-1}$, calculate the depth of the ocean bed.

$$d = \\frac{1500 \\times 1.40}{2} = \\frac{2100}{2} = 1,050\\text{ meters}$$

---

### 3. Resonance in Closed vs. Open Pipes

| Feature | Closed Pipe (One End Closed) | Open Pipe (Both Ends Open) |
|---|---|---|
| **Boundary Conditions** | Node ($N$) at closed end, Antinode ($A$) at open end | Antinodes ($A$) at both open ends |
| **Fundamental Frequency ($f_0$)** | $f_0 = \\frac{v}{4L}$ ($\\lambda_0 = 4L$) | $f_0 = \\frac{v}{2L}$ ($\\lambda_0 = 2L$) |
| **Harmonics Present** | **Only ODD harmonics** exist ($f_0, 3f_0, 5f_0$) | **ALL harmonics** exist ($f_0, 2f_0, 3f_0, 4f_0$) |
| **Musical Richness** | Harsher, hollow acoustic tone | Richer musical quality due to complete harmonic spectrum |`,
    keyTakeaways: [
      'Sound cannot travel through a vacuum because it requires material particles to transmit compressions.',
      'Echo formula d = (v * t) / 2 accounts for the two-way travel of sound.',
      'Open pipes produce all harmonics; closed pipes produce only odd harmonics.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 9: LIGHT WAVES (CURVED MIRRORS)
  // --------------------------------------------------------------------------
  {
    id: 'ss2-phy-t2-w9',
    associatedQuizId: 'waec-phy-ss2-curved-mirrors',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Geometrical Optics: Reflection at Spherical Curved Mirrors',
    subtopics: [
      'Concave (Converging) vs. Convex (Diverging) Spherical Mirrors',
      'Optical Parameters: Pole ($P$), Center of Curvature ($C$), Radius ($r$), and Principal Focus ($f = r/2$)',
      'The Three Standard Ray Tracing Rules for Curved Mirrors',
      'The Mirror Formula: $\\frac{1}{f} = \\frac{1}{u} + \\frac{1}{v}$ (Real-is-Positive Sign Convention)',
      'Linear Magnification ($m = \\frac{v}{u} = \\frac{h_i}{h_o}$) and Real vs. Virtual Images'
    ],
    readingTimeMinutes: 16,
    summary: 'The geometry of spherical concave and convex mirrors, ray tracing algorithms, real-is-positive sign conventions, and image position calculations.',
    contentMarkdown: `### 1. Geometric Optics of Spherical Mirrors

[Diagram: concave-mirror-rays]

Spherical mirrors are polished curved reflecting surfaces forming part of a sphere.
- **Focal Length Relationship:** For mirrors of small aperture, the focal length is exactly half the radius of curvature:
  $$f = \\frac{r}{2}$$

| Mirror Type | Focal Length Sign ($f$) | Surface Curvature | Nature of Image Formed | Primary Practical Uses |
|---|---|---|---|---|
| **Concave Mirror** | **Positive ($+f$)** | Curves inward like a cave | Real & inverted (for $u > f$); Virtual & magnified (for $u < f$) | Shaving mirror, dentist inspection mirror, car headlamp reflector |
| **Convex Mirror** | **Negative ($-f$)** | Bulges outward toward observer | **Always virtual, erect, and diminished** for all object positions | Driving side rearview mirror (provides wide field of view) |

---

### 2. The Real-Is-Positive Sign Convention
1. Distances to **real** objects and real images are **positive** ($+u, +v$).
2. Distances to **virtual** images and virtual foci are **negative** ($-v, -f$).
3. The focal length of a **concave mirror is positive** ($+f$).
4. The focal length of a **convex mirror is negative** ($-f$).

#### Worked Problem:
An object of height $5.0\\text{ cm}$ is placed $30.0\\text{ cm}$ in front of a concave mirror of focal length $20.0\\text{ cm}$. Find:
1. The position of the image.
2. The magnification and image height.

**Solution:**
$$\\frac{1}{f} = \\frac{1}{u} + \\frac{1}{v} \\implies \\frac{1}{20} = \\frac{1}{30} + \\frac{1}{v}$$
$$\\frac{1}{v} = \\frac{1}{20} - \\frac{1}{30} = \\frac{3 - 2}{60} = \\frac{1}{60} \\implies v = +60.0\\text{ cm}$$
- Since $v > 0$, the image is **real, inverted, and located $60.0\\text{ cm}$ in front of the mirror**.
$$m = \\frac{v}{u} = \\frac{60}{30} = 2.0 \\implies h_i = m \\times h_o = 2.0 \\times 5.0 = 10.0\\text{ cm}$$`,
    keyTakeaways: [
      'Focal length of a spherical mirror equals radius of curvature divided by 2 (f = r/2).',
      'Convex mirrors always produce virtual, erect, and diminished images with wide fields of view.',
      'Under Real-is-Positive convention: concave mirror f is positive, convex mirror f is negative.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 10: REFRACTION & TOTAL INTERNAL REFLECTION
  // --------------------------------------------------------------------------
  {
    id: 'ss2-phy-t2-w10',
    associatedQuizId: 'waec-phy-ss2-refraction-tir',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Geometrical Optics: Refraction, Snell’s Law & Total Internal Reflection',
    subtopics: [
      'Laws of Refraction and Snell’s Law: $n = \\frac{\\sin i}{\\sin r} = \\frac{v_1}{v_2}$',
      'Refractive Index in Terms of Real and Apparent Depth: $n = \\frac{\\text{Real Depth}}{\\text{Apparent Depth}}$',
      'Critical Angle ($C$) and Total Internal Reflection ($n = \\frac{1}{\\sin C}$)',
      'Conditions Necessary for Total Internal Reflection to Occur',
      'Applications: Optical Fiber Telecommunications, Mirage, and 45°-90°-45° Prisms'
    ],
    readingTimeMinutes: 16,
    summary: 'The physics of light refraction, Snell’s law, real and apparent depth illusions, critical angle derivations, and fiber optic waveguides.',
    contentMarkdown: `### 1. Snell's Law and Refractive Index

[Diagram: refraction-total-internal-reflection]

When light passes obliquely from one transparent medium into another, its speed changes, causing the ray to bend:
- **From Less Dense to Denser (Air $\\to$ Glass):** Ray bends **toward the normal** ($i > r$).
- **From Denser to Less Dense (Glass $\\to$ Air):** Ray bends **away from the normal** ($i < r$).

$$\\text{Snell's Law: } n = \\frac{\\sin i}{\\sin r} = \\frac{\\text{Speed of light in vacuum } (c)}{\\text{Speed of light in medium } (v)} = \\frac{\\text{Real Depth}}{\\text{Apparent Depth}}$$

---

### 2. Critical Angle & Total Internal Reflection (TIR)

The **critical angle ($C$)** is the angle of incidence in the optically denser medium for which the angle of refraction in the less dense medium is exactly $90^\\circ$.

$$n = \\frac{1}{\\sin C} \\iff \\sin C = \\frac{1}{n}$$

**Two Non-Negotiable Conditions for Total Internal Reflection:**
1. Light must travel from an **optically denser medium toward an optically less dense medium** (e.g. glass to air, or water to air).
2. The angle of incidence in the denser medium must be **strictly greater than the critical angle** ($i > C$).

---

### 3. Worked WAEC Calculation: Critical Angle
**Problem:** A swimming pool appears to be $1.50\\text{ m}$ deep when viewed from vertically above. If the refractive index of water is $1.33$ ($\\frac{4}{3}$), calculate:
1. The real depth of the swimming pool.
2. The critical angle for water.

1. **Calculate Real Depth:**
   $$n = \\frac{\\text{Real Depth}}{\\text{Apparent Depth}} \\implies \\text{Real Depth} = n \\times \\text{Apparent Depth} = 1.333 \\times 1.50 = 2.00\\text{ meters}$$
2. **Calculate Critical Angle ($C$):**
   $$\\sin C = \\frac{1}{n} = \\frac{1}{1.333} = 0.750 \\implies C = \\sin^{-1}(0.750) \\approx 48.6^\\circ$$`,
    keyTakeaways: [
      'Snell’s law: n = sin(i) / sin(r) = Real Depth / Apparent Depth.',
      'Total internal reflection requires light traveling from denser to rarer medium with i > C.',
      'Fiber optic telecommunications rely on multiple total internal reflections along high-purity glass cores.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 11: THIN LENSES & OPTICAL INSTRUMENTS
  // --------------------------------------------------------------------------
  {
    id: 'ss2-phy-t2-w11',
    associatedQuizId: 'waec-phy-ss2-thin-lenses',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Thin Lenses, Optical Instruments & The Human Eye',
    subtopics: [
      'Convex (Converging) vs. Concave (Diverging) Lenses',
      'Principal Axis, Optical Center, and Principal Foci of Thin Lenses',
      'The Lens Formula: $\\frac{1}{f} = \\frac{1}{u} + \\frac{1}{v}$ and Power of a Lens ($P = \\frac{1}{f}$)',
      'The Compound Microscope and Astronomical Telescope Ray Diagrams',
      'The Human Eye: Accommodation, Myopia (Short Sight), and Hypermetropia (Long Sight)'
    ],
    readingTimeMinutes: 17,
    summary: 'Thin lens optics, ray tracing for convex and concave lenses, optical microscope and telescope mechanics, and biological eye defects with corrective lenses.',
    contentMarkdown: `### 1. Convex vs. Concave Lenses

[Diagram: convex-lens-ray-diagram]

| Lens Type | Center Thickness | Action on Parallel Light Rays | Focal Length Sign ($f$) | Power ($P = 1/f$ in Dioptres) |
|---|---|---|---|---|
| **Convex (Converging)** | Thicker at center than edges | Converges rays to a real focus | **Positive ($+f$)** | **Positive (+)** |
| **Concave (Diverging)** | Thinner at center than edges | Diverges rays from a virtual focus | **Negative ($-f$)** | **Negative (-)** |

---

### 2. Defects of Vision in the Human Eye and Corrections

| Vision Defect | Anatomical Cause | Point of Image Focus | Visual Symptom | Corrective Lens Prescribed |
|---|---|---|---|---|
| **Myopia (Short-Sightedness)** | Eyeball is too long from front to back, or eye lens is too curved | Image of distant object forms **in front of the retina** | Can see near objects clearly; distant objects are blurred | **Concave (Diverging) Lens** |
| **Hypermetropia (Long-Sightedness)** | Eyeball is too short, or eye lens is too flat | Image of near object forms **behind the retina** | Can see distant objects clearly; near text is blurred | **Convex (Converging) Lens** |
| **Presbyopia** | Loss of ciliary muscle elasticity due to old age | Near point recedes beyond normal ($> 25\\text{ cm}$) | Inability to accommodate near text in elderly | **Bifocal Lenses** |
| **Astigmatism** | Cornea or lens has non-spherical irregular curvature | Unequal focal lengths in different meridians | Distorted vertical and horizontal lines | **Cylindrical Lenses** |`,
    keyTakeaways: [
      'Lens formula: 1/f = 1/u + 1/v; power in dioptres P = 1 / f (in meters).',
      'Myopia (short-sight) is corrected by concave lenses; Hypermetropia (long-sight) is corrected by convex lenses.',
      'A compound microscope uses an objective lens and an eyepiece to produce an enlarged virtual image.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 12: PRACTICAL GRAPHING & TERMINAL REVISION
  // --------------------------------------------------------------------------
  {
    id: 'ss2-phy-t2-w12',
    associatedQuizId: 'waec-phy-ss2-practical-revision',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 12,
    topicTitle: 'Terminal Physics Practical Skills: Error Analysis & Graphing',
    subtopics: [
      'Experimental Error Classification: Systematic Errors vs. Random Errors',
      'WAEC Practical Graph Standards: Scales, Plotting Points, and Line of Best Fit',
      'Determination of Slopes ($S = \\frac{\\Delta y}{\\Delta x}$) with Large Intercept Triangles',
      'Significant Figures and Parallax Error Prevention with Optical Pins',
      'Master Review of Term 2 Mechanics, Waves, Heat, and Optics'
    ],
    readingTimeMinutes: 15,
    summary: 'The rigorous scientific standards required in WAEC Physics Practical Paper 3: graphing rules, slope calculation triangles, and parallax error prevention.',
    contentMarkdown: `### 1. WAEC Physics Practical Graphing Rules

In WAEC Physics Paper 3, graph plotting accounts for $12$ out of $25$ marks per experiment:
1. **Choice of Scales:**
   - Scales must be **simple and standard multiples** ($1, 2, 5, 10, 20$). Never use odd scales like $3, 7,$ or $9$.
   - The plotted points must occupy **at least 50% of the entire grid area** in both horizontal and vertical directions.
2. **Plotting Points:**
   - Mark points with a small sharp dot surrounded by a small circle ($\\odot$) or a small crisp cross ($\\times$).
   - A deduction of $0.5\\text{ mark}$ is made for every misplotted point exceeding $\\frac{1}{2}$ small square.
3. **Line of Best Fit:**
   - Draw a single, sharp straight line that balances points evenly on either side. Never "join the dots" with a jagged polyline!
4. **Slope Determination ($S$):**
   - Draw a large slope triangle whose hypotenuse covers at least $\\frac{2}{3}$ of the drawn line.
   $$S = \\frac{y_2 - y_1}{x_2 - x_1}$$
   - Read coordinates directly from the line of best fit, **never from original tabulated data points** unless they lie squarely on the line.`,
    keyTakeaways: [
      'Graph points must span at least 50% of the grid, using standard scales of 1, 2, or 5.',
      'Slope triangle must be large (at least two-thirds of the line length) with values read from the line.',
      'Parallax errors are eliminated by viewing scale markings perpendicularly with the line of sight.'
    ]
  }
];
