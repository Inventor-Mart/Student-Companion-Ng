import { CurriculumTopic } from '../types';

export const SS1_PHYSICS_TOPICS: CurriculumTopic[] = [
  // ==========================================
  // WEEK 1: HEAT ENERGY & THERMOMETRY
  // ==========================================
  {
    id: 'phys-ss1-term2-week1',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Heat Energy, Temperature & Thermometric Principles',
    subtopics: [
      'Heat Energy vs. Temperature & Thermal Equilibrium',
      'The Zeroth Law of Thermodynamics',
      'Thermometric Properties of Matter',
      'Temperature Scales & Conversion (Celsius, Kelvin, Fahrenheit)'
    ],
    readingTimeMinutes: 7,
    summary: 'Distinguish between heat energy and temperature, understand thermal equilibrium, and master thermometric properties and mathematical scale conversions.',
    contentMarkdown: `### 1. Heat Energy vs. Temperature

| Physical Attribute | Heat Energy ($Q$) | Temperature ($T$ or $\\theta$) |
| :--- | :--- | :--- |
| **Definition** | Form of energy transferred between bodies due to a temperature difference | Measure of the degree of hotness or coldness of a body (average molecular kinetic energy) |
| **SI Unit** | Joule ($\\text{J}$) | Kelvin ($\\text{K}$) |
| **Measuring Instrument** | Calorimeter | Thermometer |
| **Nature of Quantity** | Extensive property (depends on mass and size of sample) | Intensive property (independent of sample mass) |
| **Direction of Flow** | Flows spontaneously from higher temperature to lower temperature | Determines the direction of spontaneous heat transfer |

---

### 2. Thermal Equilibrium & The Zeroth Law of Thermodynamics

> *If two thermodynamic systems $A$ and $B$ are each in thermal equilibrium with a third system $C$, then they are in thermal equilibrium with each other.*

When two bodies are in **thermal equilibrium**, there is no net exchange of heat energy between them, which implies that **both bodies possess exactly the same temperature**.

---

### 3. Thermometric Properties & Practical Thermometers

A **thermometric property** is a physical property of a substance that changes continuously and linearly with changes in temperature:

| Thermometer Class | Thermometric Substance | Thermometric Property Utilized | Typical Temperature Range | Common Application |
| :--- | :--- | :--- | :--- | :--- |
| **Liquid-in-Glass (Mercury)** | Liquid Mercury | Linear expansion of liquid column length ($l$) | $-39^{\\circ}\\text{C}$ to $+357^{\\circ}\\text{C}$ | Laboratory and clinical thermometers |
| **Liquid-in-Glass (Alcohol)** | Colored Ethanol | Linear expansion of liquid column length ($l$) | $-115^{\\circ}\\text{C}$ to $+78^{\\circ}\\text{C}$ | Meteorological Arctic & cold-room measurements |
| **Constant-Volume Gas** | Hydrogen / Helium | Pressure change of fixed gas volume ($P$) | $-270^{\\circ}\\text{C}$ to $+1500^{\\circ}\\text{C}$ | Primary scientific calibration standard |
| **Resistance Thermometer** | Platinum wire | Electrical resistance ($R$) of metal wire | $-200^{\\circ}\\text{C}$ to $+1200^{\\circ}\\text{C}$ | High-precision industrial pyrometry |
| **Thermocouple** | Two dissimilar metals (e.g. Copper-Constantan) | Thermoelectric electromotive force (e.m.f. $E$) | $-250^{\\circ}\\text{C}$ to $+1600^{\\circ}\\text{C}$ | Rapidly fluctuating furnace temperatures |

---

### 4. Mathematical Calibration & Temperature Scale Conversions

Any arbitrary thermometer calibrated between Lower Fixed Point ($LFP$, Ice Point $= 0^{\\circ}\\text{C}$) and Upper Fixed Point ($UFP$, Steam Point $= 100^{\\circ}\\text{C}$) follows the linear interpolation equation:

$$\\theta(^{\\circ}\\text{C}) = \\frac{X_\\theta - X_0}{X_{100} - X_0} \\times 100$$

Where $X_\\theta$, $X_0$, and $X_{100}$ are the thermometric properties at unknown temperature $\\theta$, ice point, and steam point respectively.

#### Standard Scale Conversion Formulas:
$$T(\\text{K}) = \\theta(^{\\circ}\\text{C}) + 273.15$$
$$\\frac{\\theta(^{\\circ}\\text{C})}{100} = \\frac{F - 32}{180}$$

---

### 5. WAEC Checkpoint Practice Questions

- **Question 1**: The resistance of a platinum wire is $4.00\\,\\Omega$ at $0^{\\circ}\\text{C}$ and $7.20\\,\\Omega$ at $100^{\\circ}\\text{C}$. Calculate the temperature when its resistance is $5.60\\,\\Omega$.
  - A) $45.0^{\\circ}\\text{C}$
  - B) $50.0^{\\circ}\\text{C}$ (*Correct — $\\theta = \\frac{5.60 - 4.00}{7.20 - 4.00} \\times 100 = \\frac{1.60}{3.20} \\times 100 = 50.0^{\\circ}\\text{C}$*)
  - C) $60.0^{\\circ}\\text{C}$
  - D) $75.0^{\\circ}\\text{C}$
- **Question 2**: At what numerical temperature do the Celsius and Fahrenheit scales indicate the exact same value?
  - A) $0^{\\circ}$
  - B) $-40^{\\circ}$ (*Correct — $\\frac{x}{100} = \\frac{x - 32}{180} \\implies 1.8x = x - 32 \\implies 0.8x = -32 \\implies x = -40$*)
  - C) $+40^{\\circ}$
  - D) $-273^{\\circ}$`,
    keyTakeaways: [
      'Heat is energy in transit due to temperature difference; temperature measures average molecular kinetic energy.',
      'Thermal equilibrium occurs when two bodies in contact reach the same temperature with zero net heat transfer.',
      'Celsius and Fahrenheit coincide at exactly -40°; Kelvin = °C + 273.15.'
    ],
    associatedQuizId: 'waec-physics-ss1-q1'
  },

  // ==========================================
  // WEEK 2: THERMAL EXPANSION OF SOLIDS & LIQUIDS
  // ==========================================
  {
    id: 'phys-ss1-term2-week2',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Thermal Expansion of Solids, Bimetallic Strips & Water Anomaly',
    subtopics: [
      'Linear, Area (Superficial), and Volume (Cubical) Expansivity',
      'Real-World Engineering Consequences (Rail Gaps, Bridge Rollers)',
      'Bimetallic Strips & Electrical Thermostat Control',
      'Anomalous Expansion of Water between 0°C and 4°C'
    ],
    readingTimeMinutes: 8,
    summary: 'Analyze how temperature increases drive structural expansion, evaluate the coefficients of expansivity, and understand bimetallic applications and water density anomalies.',
    contentMarkdown: `### 1. Coefficients of Thermal Expansivity in Solids

When heated, atoms vibrate with greater amplitudes about their equilibrium positions, causing the bulk material to expand:

| Expansivity Type | Symbol & Defining Formula | SI Unit | Relationship |
| :--- | :--- | :--- | :--- |
| **Linear Expansivity** | $\\alpha = \\frac{\\Delta L}{L_1 \\Delta\\theta} = \\frac{L_2 - L_1}{L_1(\\theta_2 - \\theta_1)}$ | $\\text{K}^{-1}$ or $^{\\circ}\\text{C}^{-1}$ | Fundamental property |
| **Area (Superficial) Expansivity** | $\\beta = \\frac{\\Delta A}{A_1 \\Delta\\theta}$ | $\\text{K}^{-1}$ or $^{\\circ}\\text{C}^{-1}$ | $\\beta \\approx 2\\alpha$ |
| **Cubic (Volume) Expansivity** | $\\gamma = \\frac{\\Delta V}{V_1 \\Delta\\theta}$ | $\\text{K}^{-1}$ or $^{\\circ}\\text{C}^{-1}$ | $\\gamma \\approx 3\\alpha$ |

#### Key Linear Expansivity Values:
- **Aluminium**: $25.5 \\times 10^{-6}\\,\\text{K}^{-1}$
- **Brass**: $19.0 \\times 10^{-6}\\,\\text{K}^{-1}$
- **Iron / Steel**: $12.0 \\times 10^{-6}\\,\\text{K}^{-1}$
- **Invar (Nickel-Steel alloy)**: $0.9 \\times 10^{-6}\\,\\text{K}^{-1}$ (Virtually zero expansion; used in pendulum rods)

---

### 2. Engineering Consequences of Thermal Expansion
1. **Railway Gaps**: Expansion gaps are left between steel rail segments to prevent buckling during scorching tropical afternoons.
2. **Expansion Rollers on Steel Bridges**: One end of a long girder bridge rests on steel rollers with expansion gap comb-joints to allow unconstrained seasonal expansion and contraction.
3. **Sagging of Overhead Power Cables**: Copper cables are strung loosely in summer to prevent them from snapping under extreme tensile stress during cold harmattan mornings.

---

### 3. The Bimetallic Strip & Thermostat Regulation

A **bimetallic strip** consists of two dissimilar metal strips of identical initial lengths (typically Brass and Iron) firmly riveted together along their lengths.

[Diagram: bimetallic-strip-thermostat]

#### Operating Mechanics:
- Because $\\alpha_{\\text{brass}} (19 \\times 10^{-6}\\,\\text{K}^{-1}) > \\alpha_{\\text{iron}} (12 \\times 10^{-6}\\,\\text{K}^{-1})$, brass expands significantly more than iron for the same temperature rise.
- The strip is forced to curve into an arc with **the more expansible brass forming the outer (convex) curve**.
- In an electric iron or water heater, this curvature pulls the contact point away from a stationary contact, breaking the circuit and turning the heating element off.
- As the appliance cools down, the strip straightens, re-establishing contact and switching the heater back on.

---

### 4. Anomalous Expansion of Water ($0^{\\circ}\\text{C}$ to $4^{\\circ}\\text{C}$)

Most liquids expand continuously as temperature rises. Water behaves abnormally between $0^{\\circ}\\text{C}$ and $4^{\\circ}\\text{C}$:
- When ice melts at $0^{\\circ}\\text{C}$ and is heated to $4^{\\circ}\\text{C}$, **water contracts instead of expanding**.
- Its volume decreases, reaching an absolute **minimum volume at $4^{\\circ}\\text{C}$**.
- Consequently, water achieves its **maximum density of $1.000\\,\\text{g/cm}^3$ (or $1000\\,\\text{kg/m}^3$) at exactly $4^{\\circ}\\text{C}$**.
- Above $4^{\\circ}\\text{C}$, water expands normally like other liquids.

#### Biological Importance:
In freezing climates, cold surface water cools to $4^{\\circ}\\text{C}$, becomes denser, and sinks to the riverbed. Surface water eventually freezes at $0^{\\circ}\\text{C}$ into an insulating sheet of floating ice, while the deep riverbed remains liquid at $4^{\\circ}\\text{C}$, preserving aquatic fish and plant life throughout winter.

---

### 5. WAEC Checkpoint Practice Questions

- **Question 1**: A steel railway line has a length of $30.0\\,\\text{m}$ at $20^{\\circ}\\text{C}$. What is its expansion when heated by the sun to $55^{\\circ}\\text{C}$? ($\\alpha_{\\text{steel}} = 1.2 \\times 10^{-5}\\,\\text{K}^{-1}$)
  - A) $0.0126\\,\\text{m}$ (*Correct — $\\Delta L = L_1 \\alpha \\Delta\\theta = 30.0 \\times (1.2 \\times 10^{-5}) \\times (55 - 20) = 0.0126\\,\\text{m} = 1.26\\,\\text{cm}$*)
  - B) $0.0198\\,\\text{m}$
  - C) $0.0252\\,\\text{m}$
  - D) $0.0350\\,\\text{m}$
- **Question 2**: When a bimetallic strip made of brass and iron is cooled below room temperature:
  - A) It remains straight
  - B) It bends with brass on the inside of the curve (*Correct — brass contracts more than iron upon cooling*)
  - C) It bends with iron on the inside of the curve
  - D) It melts`,
    keyTakeaways: [
      'Linear expansivity α relates change in length to initial length and temperature change: ΔL = L₁αΔθ.',
      'Superficial expansivity β = 2α; cubic expansivity γ = 3α.',
      'Water has minimum volume and maximum density at exactly 4°C, insulating aquatic life in winter.'
    ],
    associatedQuizId: 'waec-physics-ss1-q2'
  },

  // ==========================================
  // WEEK 3: QUANTITY OF HEAT & CALORIMETRY
  // ==========================================
  {
    id: 'phys-ss1-term2-week3',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Quantity of Heat, Specific Heat Capacity & Latent Heat',
    subtopics: [
      'Heat Capacity (C) & Specific Heat Capacity (c)',
      'The Method of Mixtures & Calorimetry Calculations',
      'Latent Heat of Fusion & Latent Heat of Vaporization',
      'Evaporation vs. Boiling & The Vacuum Flask'
    ],
    readingTimeMinutes: 8,
    summary: 'Master thermal energy calculations involving temperature changes (Q = mcΔθ), phase transformations without temperature change (Q = mL), and heat conservation.',
    contentMarkdown: `### 1. Specific Heat Capacity vs. Heat Capacity

- **Heat Capacity ($C$)**: The quantity of heat required to raise the temperature of an entire body by $1\\,\\text{K}$ (or $1^{\\circ}\\text{C}$).
  $$C = \\frac{Q}{\\Delta\\theta} \\quad (\\text{Unit: } \\text{J/K} \\text{ or } \\text{J/}^{\\circ}\\text{C})$$
- **Specific Heat Capacity ($c$)**: The quantity of heat required to raise the temperature of unit mass ($1\\,\\text{kg}$) of a substance by $1\\,\\text{K}$ (or $1^{\\circ}\\text{C}$).
  $$Q = m c \\Delta\\theta \\implies c = \\frac{Q}{m \\Delta\\theta} \\quad (\\text{Unit: } \\text{J}/(\\text{kg}\\cdot\\text{K}))$$
  $$C = m c$$

#### Common Specific Heat Capacities:
- **Water**: $4,200\\,\\text{J}/(\\text{kg}\\cdot\\text{K})$ (Exceptionally high; ideal coolant for car radiators)
- **Aluminium**: $900\\,\\text{J}/(\\text{kg}\\cdot\\text{K})$
- **Iron**: $450\\,\\text{J}/(\\text{kg}\\cdot\\text{K})$
- **Copper**: $400\\,\\text{J}/(\\text{kg}\\cdot\\text{K})$
- **Lead**: $130\\,\\text{J}/(\\text{kg}\\cdot\\text{K})$

---

### 2. The Method of Mixtures (Law of Conservation of Heat)

In an insulated calorimeter where no heat escapes to the environment:

$$\\text{Heat Lost by Hot Body} = \\text{Heat Gained by Cold Water} + \\text{Heat Gained by Calorimeter}$$
$$m_h c_h (\\theta_h - \\theta_f) = m_w c_w (\\theta_f - \\theta_w) + m_{\\text{cal}} c_{\\text{cal}} (\\theta_f - \\theta_{\\text{cal}})$$

---

### 3. Latent Heat & Phase Transitions

During a change of physical state (solid to liquid or liquid to gas), **heat is absorbed or released at constant temperature**. This absorbed energy breaks intermolecular bonds without increasing molecular kinetic energy:

$$Q = m L$$

1. **Specific Latent Heat of Fusion ($L_f$)**: Heat required to change $1\\,\\text{kg}$ of solid to liquid at its melting point without temperature change.
   - For ice: $L_f = 3.36 \\times 10^5\\,\\text{J/kg}$
2. **Specific Latent Heat of Vaporization ($L_v$)**: Heat required to change $1\\,\\text{kg}$ of liquid to vapor at its boiling point without temperature change.
   - For steam: $L_v = 2.26 \\times 10^6\\,\\text{J/kg}$ (Nearly 7 times greater than $L_f$ because molecules completely separate from liquid phase)

---

### 4. Evaporation vs. Boiling

| Distinguishing Factor | Evaporation | Boiling |
| :--- | :--- | :--- |
| **Temperature** | Occurs spontaneously at **any temperature** below boiling point | Occurs only at a **fixed, definite boiling point** |
| **Location** | **Surface phenomenon** only | Occurs **throughout the entire volume of liquid** (bubbles form) |
| **Bubbling** | No bubbles formed; silent | Vigorous bubbling accompanied by agitation |
| **Thermal Effect** | Causes cooling of remaining liquid | Temperature remains strictly constant throughout |
| **Effect of Wind / Area** | Accelerated by larger surface area and wind drafts | Unaffected by wind or surface area |

---

### 5. Thermodynamics of the Vacuum (Dewar) Flask

Designed to minimize heat transfer by all three physical mechanisms:
1. **Conduction & Convection minimized by the Vacuum**: The double-walled glass vessel has the air pumped out between walls; heat cannot conduct or convect through a vacuum.
2. **Radiation minimized by Silvered Walls**: Both facing glass surfaces are coated with polished silver, reflecting radiant heat back into the flask.
3. **Evaporation & Convection minimized by Insulating Stopper**: Plastic/cork stopper prevents heat escape through convection currents and vapor loss.

---

### 6. WAEC Checkpoint Practice Questions

- **Question 1**: Calculate the quantity of heat required to convert $0.5\\,\\text{kg}$ of ice at $0^{\\circ}\\text{C}$ to water at $20^{\\circ}\\text{C}$. ($L_f = 3.36 \\times 10^5\\,\\text{J/kg}, c_w = 4200\\,\\text{J}/(\\text{kg}\\cdot\\text{K})$)
  - A) $168,000\\,\\text{J}$
  - B) $210,000\\,\\text{J}$ (*Correct — $Q_1 = mL_f = 0.5 \\times 3.36 \\times 10^5 = 168,000\\text{J}$; $Q_2 = mc\\Delta\\theta = 0.5 \\times 4200 \\times 20 = 42,000\\text{J}$; Total $Q = 168,000 + 42,000 = 210,000\\,\\text{J}$*)
  - C) $252,000\\,\\text{J}$
  - D) $42,000\\,\\text{J}$
- **Question 2**: Why does steam at $100^{\\circ}\\text{C}$ produce more severe burns than boiling water at $100^{\\circ}\\text{C}$?
  - A) Steam is lighter than water
  - B) Steam possesses extra latent heat of vaporization ($2.26 \\times 10^6\\,\\text{J/kg}$) released upon condensing on skin (*Correct*)
  - C) Water conducts heat faster than steam
  - D) Steam has a higher temperature than boiling water`,
    keyTakeaways: [
      'Q = mcΔθ handles temperature changes; Q = mL handles phase transitions at constant temperature.',
      'Steam at 100°C causes worse burns than boiling water because it releases latent heat of vaporization upon condensation.',
      'A vacuum flask prevents conduction and convection via a vacuum, and radiation via silvered inner walls.'
    ],
    associatedQuizId: 'waec-physics-ss1-q3'
  },

  // ==========================================
  // WEEK 4: THERMAL PHYSICS & GAS LAWS
  // ==========================================
  {
    id: 'phys-ss1-term2-week4',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Thermal Physics, Kinetic Molecular Model & Gas Equations',
    subtopics: [
      'Molecular Origin of Gas Pressure & Velocity Distribution',
      "Boyle's Law & Verification Apparatus",
      "Charles's Law & Pressure Law (Gay-Lussac)",
      'Absolute Zero & The General Gas Equation'
    ],
    readingTimeMinutes: 7,
    summary: 'Bridge microscopic molecular impacts to macroscopic gas pressure, understand absolute zero, and solve multi-variable gas law equations.',
    contentMarkdown: `### 1. Molecular Origin of Gas Pressure

According to Newton's Second Law of Motion, force is the rate of change of momentum:

$$F = \\frac{\\Delta p}{\\Delta t}$$

When gas molecules strike the rigid walls of a container and rebound elastically, their velocity changes from $+u$ to $-u$, creating a momentum change $\\Delta p = 2mu$. Millions of impacts per second exert a continuous outward force per unit area:

$$P = \\frac{F}{A} = \\frac{1}{3} \\rho \\overline{c^2}$$

Where $\\rho$ is the gas density and $\\overline{c^2}$ is the mean square velocity of the gas molecules.

---

### 2. Summary of Experimental Gas Laws

| Law Name | Constant Property | Mathematical Formula | Graphical Curve |
| :--- | :--- | :--- | :--- |
| **Boyle's Law** | Temperature ($T$), Mass ($m$) | $P_1 V_1 = P_2 V_2$ | Isothermal rectangular hyperbola ($P$ vs. $V$); linear line passing through origin ($P$ vs. $1/V$) |
| **Charles's Law** | Pressure ($P$), Mass ($m$) | $\\frac{V_1}{T_1} = \\frac{V_2}{T_2}$ | Isobaric straight line intercepting temperature axis at $-273.15^{\\circ}\\text{C}$ ($0\\,\\text{K}$) |
| **Pressure Law** | Volume ($V$), Mass ($m$) | $\\frac{P_1}{T_1} = \\frac{P_2}{T_2}$ | Isochoric straight line intercepting temperature axis at $-273.15^{\\circ}\\text{C}$ ($0\\,\\text{K}$) |
| **General Gas Equation** | Mass ($m$) | $\\frac{P_1 V_1}{T_1} = \\frac{P_2 V_2}{T_2}$ | Combined variable changes |

---

### 3. Absolute Zero ($0\\,\\text{K} = -273.15^{\\circ}\\text{C}$)

**Absolute Zero** is the theoretical lowest attainable temperature at which the volume and pressure of an ideal gas extrapolate to zero, and all classical molecular translational kinetic energy ceases.

$$\\text{Kelvin Scale: } T = \\theta + 273$$

---

### 4. Worked Problem: General Gas Equation
**Problem**: A cylinder contains gas at $27^{\\circ}\\text{C}$ and pressure $1.5 \\times 10^5\\,\\text{N/m}^2$, occupying $0.04\\,\\text{m}^3$. If compressed to $0.025\\,\\text{m}^3$ while its temperature rises to $87^{\\circ}\\text{C}$, find the final pressure.

1. **Extract Variables**:
   - $P_1 = 1.5 \\times 10^5\\,\\text{N/m}^2$, $V_1 = 0.04\\,\\text{m}^3$, $T_1 = 27 + 273 = 300\\,\\text{K}$
   - $P_2 = ?$, $V_2 = 0.025\\,\\text{m}^3$, $T_2 = 87 + 273 = 360\\,\\text{K}$
2. **Rearrange Formula**:
   $$P_2 = \\frac{P_1 V_1 T_2}{V_2 T_1} = \\frac{(1.5 \\times 10^5) \\times 0.04 \\times 360}{0.025 \\times 300}$$
3. **Calculate**:
   $$P_2 = \\frac{2.16 \\times 10^6}{7.5} = 2.88 \\times 10^5\\,\\text{N/m}^2$$

---

### 5. WAEC Checkpoint Practice Questions

- **Question 1**: The pressure of a fixed mass of gas at constant volume is $760\\,\\text{mmHg}$ at $0^{\\circ}\\text{C}$. What is its pressure at $100^{\\circ}\\text{C}$?
  - A) $1038\\,\\text{mmHg}$ (*Correct — $T_1 = 273\\text{K}, T_2 = 373\\text{K} \\implies P_2 = \\frac{760 \\times 373}{273} \\approx 1038.3\\,\\text{mmHg}$*)
  - B) $1520\\,\\text{mmHg}$
  - C) $860\\,\\text{mmHg}$
  - D) $760\\,\\text{mmHg}$
- **Question 2**: When a gas is heated at constant pressure, its volume expands because:
  - A) Molecules expand in individual size
  - B) Molecules move faster, collide more vigorously, and require greater space to maintain equal wall pressure (*Correct*)
  - C) Intermolecular forces increase
  - D) Density increases`,
    keyTakeaways: [
      'Gas pressure results from the rate of change of momentum as molecules collide elastically with container walls.',
      'Absolute zero (0 K = -273.15°C) is the temperature where classical molecular motion ceases.',
      'All gas law calculations require converting Celsius to Kelvin.'
    ],
    associatedQuizId: 'waec-physics-ss1-q4'
  },

  // ==========================================
  // WEEK 5: LIGHT PROPAGATION & PINHOLE CAMERA
  // ==========================================
  {
    id: 'phys-ss1-term2-week5',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Rectilinear Propagation of Light, Shadows & Pinhole Cameras',
    subtopics: [
      'Light as Wave Energy & Rectilinear Propagation',
      'Shadow Formation: Umbra vs. Penumbra',
      'Solar & Lunar Eclipses Explained',
      'Pinhole Camera Ray Tracing & Linear Magnification'
    ],
    readingTimeMinutes: 7,
    summary: 'Demonstrate that light travels in straight lines, analyze shadow and eclipse formation, and solve pinhole camera magnification problems.',
    contentMarkdown: `### 1. Rectilinear Propagation of Light

Light travels in straight lines in a uniform, homogeneous, transparent medium. This fundamental principle is called the **Rectilinear Propagation of Light** ($c \\approx 3.0 \\times 10^8\\,\\text{m/s}$ in vacuum).

#### Key Optical Definitions:
- **Ray**: The direction of the path taken by light energy, represented by a straight line with an arrowhead ($\\longrightarrow$).
- **Beam**: A collection of many light rays:
  - *Parallel Beam*: Rays travel parallel to each other (e.g., searchlight beam).
  - *Divergent Beam*: Rays spread outward from a point source (e.g., candle flame).
  - *Convergent Beam*: Rays come together to intersect at a single focus point.

---

### 2. Shadows & Eclipses

When an opaque object obstructs light rays from a source, a **shadow** is cast behind it:
- **Umbra**: The region of complete, total darkness where no light rays from the source can reach.
- **Penumbra**: The region of partial shadow surrounding the umbra where some rays reach but others are blocked (only formed by extended, large light sources).

| Eclipse Type | Relative Positions of Celestial Bodies | What Observers on Earth Witness |
| :--- | :--- | :--- |
| **Solar Eclipse (Eclipse of the Sun)** | **Sun — Moon — Earth** (Moon passes directly between Sun and Earth) | Moon casts its shadow on Earth; daytime sky darkens as Moon covers the solar disc |
| **Lunar Eclipse (Eclipse of the Moon)** | **Sun — Earth — Moon** (Earth passes directly between Sun and Moon) | Earth casts its shadow onto the full Moon; Moon turns a dim coppery-red color |

---

### 3. Pinhole Camera Optics & Linear Magnification

A pinhole camera operates strictly on rectilinear light propagation, using a tiny aperture in an opaque box to form an image on a translucent frosted glass screen.

[Diagram: pinhole-camera-eclipse]

#### Characteristics of Pinhole Camera Images:
1. **Real**: Can be received and focused on a physical screen.
2. **Inverted**: Upside down (rays from object tip travel straight down to the bottom of the screen).
3. **Magnification ($M$) Formula**:
   $$M = \\frac{\\text{Height of image } (h_i)}{\\text{Height of object } (h_o)} = \\frac{\\text{Image distance } (v)}{\\text{Object distance } (u)}$$

Where $v$ is the depth/length of the camera box and $u$ is the distance from the object to the pinhole aperture.

#### Effect of Enlarging the Pinhole Aperture:
- A large pinhole acts as multiple adjacent pinholes.
- The image becomes **brighter** because more light enters, but it becomes **blurred and unfocused** due to overlapping images.

---

### 4. WAEC Checkpoint Practice Questions

- **Question 1**: A pinhole camera of length $20\\,\\text{cm}$ is used to view a tree $15\\,\\text{m}$ high situated $30\\,\\text{m}$ away from the pinhole. Find the height of the image on the screen.
  - A) $5.0\\,\\text{cm}$
  - B) $10.0\\,\\text{cm}$ (*Correct — $M = \\frac{h_i}{h_o} = \\frac{v}{u} \\implies h_i = \\frac{15\\text{m} \\times 0.2\\text{m}}{30\\text{m}} = 0.10\\,\\text{m} = 10.0\\,\\text{cm}$*)
  - C) $15.0\\,\\text{cm}$
  - D) $20.0\\,\\text{cm}$
- **Question 2**: During a total solar eclipse, an observer standing in the Moon's penumbra experiences:
  - A) Complete darkness
  - B) A partial solar eclipse (*Correct — only part of the Sun is obscured*)
  - C) A lunar eclipse
  - D) No eclipse at all`,
    keyTakeaways: [
      'Light travels in straight lines (rectilinear propagation), giving rise to sharp shadows and eclipses.',
      'Umbra is the region of total darkness; penumbra is the region of partial shadow.',
      'Pinhole camera magnification M = v/u = hi/ho; enlarging the hole makes the image brighter but blurry.'
    ],
    associatedQuizId: 'waec-physics-ss1-q5'
  },

  // ==========================================
  // WEEK 6: REFLECTION AT PLANE SURFACES
  // ==========================================
  {
    id: 'phys-ss1-term2-week6',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Reflection of Light at Plane Surfaces & Mirrors',
    subtopics: [
      'Laws of Regular vs. Diffuse Reflection',
      'Image Characteristics in a Plane Mirror',
      'Rotation of Plane Mirrors (θ → 2θ Theorem)',
      'Multiple Reflections Between Inclined Mirrors & Periscopes'
    ],
    readingTimeMinutes: 7,
    summary: 'Master the fundamental laws of reflection, determine image properties in plane mirrors, and calculate multiple images and mirror rotation angles.',
    contentMarkdown: `### 1. Laws of Reflection

When a light ray strikes a polished surface, it bounces back into the original medium according to two universal laws:

[Diagram: plane-mirror-reflection]

1. **First Law**: The incident ray, the reflected ray, and the normal at the point of incidence all lie in the **same plane**.
2. **Second Law**: The **angle of incidence ($i$) is strictly equal to the angle of reflection ($r$)**:
   $$\\angle i = \\angle r$$

*Note: Angles $i$ and $r$ are always measured between the respective ray and the **normal line** ($90^{\\circ}$ perpendicular to the mirror surface), never with the mirror surface itself!*

---

### 2. Characteristics of Images in a Plane Mirror

Every image formed by reflection in a plane mirror exhibits five distinct properties:
1. **Virtual**: Formed by the apparent intersection of diverging reflected rays; cannot be projected onto a physical screen.
2. **Erect (Upright)**: Top remains at the top.
3. **Same Size as Object**: Linear magnification $m = 1.0$.
4. **Equal Object & Image Distances**: The image is as far behind the mirror as the object is in front of it ($u = v$).
5. **Laterally Inverted**: Left and right are reversed (e.g., your right hand appears as the left hand of your reflection).

---

### 3. Rotation of a Plane Mirror (The $\\theta \\rightarrow 2\\theta$ Rule)

> *If a plane mirror is rotated through an angle $\\theta$ about an axis in its plane, while the direction of the incident ray remains constant, the reflected ray rotates through twice that angle (**$2\\theta$**).*

$$\\text{Angle of Reflected Ray Deflection} = 2\\theta$$

This property is utilized in mirror galvanometers and sextants to amplify tiny mechanical angular deflections into large, easily readable optical scale shifts.

---

### 4. Multiple Images in Inclined Mirrors

When two plane mirrors are placed at an angle $\\theta$ to each other, an object placed between them produces multiple virtual images:

$$n = \\frac{360^{\\circ}}{\\theta} - 1$$

Where $n$ is the total number of images visible:
- At $\\theta = 90^{\\circ}$: $n = \\frac{360}{90} - 1 = 4 - 1 = \\mathbf{3\\text{ images}}$
- At $\\theta = 60^{\\circ}$: $n = \\frac{360}{60} - 1 = 6 - 1 = \\mathbf{5\\text{ images}}$
- At $\\theta = 0^{\\circ}$ (Parallel mirrors): $n = \\infty$ (**infinite images**, as seen in barber shops)

---

### 5. WAEC Checkpoint Practice Questions

- **Question 1**: An incident ray strikes a plane mirror at an angle of $35^{\\circ}$ to the mirror surface. What is the angle of reflection?
  - A) $35^{\\circ}$
  - B) $55^{\\circ}$ (*Correct — Glance angle is $35^{\\circ}$, so angle of incidence $i = 90 - 35 = 55^{\\circ}$. Since $i=r$, $r = 55^{\\circ}$*)
  - C) $70^{\\circ}$
  - D) $110^{\\circ}$
- **Question 2**: Two plane mirrors are inclined at $72^{\\circ}$ to each other. How many images of a coin placed between them will be observed?
  - A) 4 (*Correct — $n = \\frac{360}{72} - 1 = 5 - 1 = 4$*)
  - B) 5
  - C) 6
  - D) 3`,
    keyTakeaways: [
      'Angle of incidence equals angle of reflection (i = r), measured from the perpendicular normal.',
      'Plane mirror images are virtual, upright, same size, laterally inverted, and have equal object/image distance.',
      'Rotating a mirror by θ turns the reflected ray by 2θ; inclined mirrors yield n = (360/θ) - 1 images.'
    ],
    associatedQuizId: 'waec-physics-ss1-q6'
  },

  // ==========================================
  // WEEK 7: REFLECTION AT CURVED MIRRORS
  // ==========================================
  {
    id: 'phys-ss1-term2-week7',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Reflection at Spherical Curved Mirrors (Concave & Convex)',
    subtopics: [
      'Anatomy of Spherical Mirrors: Pole, Focus & Radius',
      'Four Principal Ray Tracing Rules',
      'Real vs. Virtual Image Formation Across Object Positions',
      'Mirror Equation & Linear Magnification (1/f = 1/u + 1/v)'
    ],
    readingTimeMinutes: 8,
    summary: 'Master ray tracing in concave and convex mirrors, predict image characteristics, and perform quantitative mirror formula calculations.',
    contentMarkdown: `### 1. Key Terminology of Curved Mirrors

A spherical mirror is a reflective surface formed from a cut section of a hollow sphere:
- **Concave Mirror (Converging)**: Silvered on the outside; reflective inner surface curves inward like a cave.
- **Convex Mirror (Diverging)**: Silvered on the inside; reflective surface bulges outward toward the object.

#### Key Geometrical Points:
- **Pole ($P$)**: The geometric center of the reflecting spherical surface.
- **Center of Curvature ($C$)**: The center of the sphere of which the mirror forms a part.
- **Radius of Curvature ($r$)**: Distance from the pole to the center of curvature ($r = PC$).
- **Principal Focus ($F$)**: The point on the principal axis where all rays initially parallel to the axis converge after reflection (for concave) or appear to diverge from (for convex).
- **Focal Length ($f$)**: The distance from the pole to the principal focus:
  $$f = \\frac{r}{2}$$

---

### 2. Four Universal Ray Tracing Rules for Mirrors

1. A ray **parallel to the principal axis** reflects **through the principal focus ($F$)**.
2. A ray passing **through the principal focus ($F$)** reflects **parallel to the principal axis**.
3. A ray passing **through the center of curvature ($C$)** reflects **directly back along its original path** (incident at $90^{\\circ}$ normal).
4. A ray striking the **pole ($P$)** reflects symmetrically such that the angle of incidence equals the angle of reflection ($i = r$).

[Diagram: concave-mirror-rays]

---

### 3. Summary of Concave Mirror Image Positions

| Object Position | Image Position | Nature of Image | Image Size | Practical Application |
| :--- | :--- | :--- | :--- | :--- |
| **At Infinity** | At Focus ($F$) | Real, Inverted | Point-sized (Extremely diminished) | Astronomical reflecting telescope |
| **Beyond $C$** | Between $C$ and $F$ | Real, Inverted | Diminished | Car headlight camera sensor |
| **At $C$** | At $C$ | Real, Inverted | **Same size as object** ($m = 1$) | Photocopier lens mirror |
| **Between $C$ and $F$** | Beyond $C$ | Real, Inverted | **Magnified** | Film projector / spotlight |
| **At Focus ($F$)** | At Infinity | Real, Inverted | Infinitely large | Searchlight / torch reflector |
| **Between $F$ and Pole ($P$)** | **Behind mirror** | **Virtual, Erect** | **Magnified** | Shaving / Dental mirror |

*Note on Convex Mirrors: For all object positions in front of a convex mirror, the image is **always virtual, erect, and diminished**, situated behind the mirror between $P$ and $F$. This gives convex mirrors an extremely wide field of view, making them ideal as **driving side-view mirrors**.*

---

### 4. Quantitative Mirror Formula & Sign Convention (Real-is-Positive)

$$\\frac{1}{f} = \\frac{1}{u} + \\frac{1}{v}$$
$$m = \\frac{v}{u} = \\frac{h_i}{h_o}$$

#### Real-is-Positive Sign Rules:
- $f$ is **positive ($+f$)** for concave mirrors (real focus).
- $f$ is **negative ($-f$)** for convex mirrors (virtual focus).
- $u$ is **positive ($+u$)** for real objects.
- $v$ is **positive ($+v$)** for real images (in front of mirror).
- $v$ is **negative ($-v$)** for virtual images (behind mirror).

---

### 5. WAEC Checkpoint Practice Questions

- **Question 1**: An object is placed $20\\,\\text{cm}$ in front of a concave mirror of focal length $15\\,\\text{cm}$. What is the image distance and its nature?
  - A) $60\\,\\text{cm}$, real (*Correct — $\\frac{1}{15} = \\frac{1}{20} + \\frac{1}{v} \\implies \\frac{1}{v} = \\frac{1}{15} - \\frac{1}{20} = \\frac{4 - 3}{60} = \\frac{1}{60} \\implies v = +60\\,\\text{cm}$*)
  - B) $30\\,\\text{cm}$, virtual
  - C) $60\\,\\text{cm}$, virtual
  - D) $8.57\\,\\text{cm}$, real
- **Question 2**: Why are convex mirrors used as rear-view driving mirrors in automobiles?
  - A) They form inverted images
  - B) They produce real magnified images
  - C) They always form erect, diminished images providing a wide field of view (*Correct*)
  - D) They have a very large focal length`,
    keyTakeaways: [
      'Focal length of a spherical mirror equals half its radius of curvature: f = r/2.',
      'Concave mirrors produce real inverted images, except when the object is placed inside the focus (F and P), yielding a magnified virtual image.',
      'Convex mirrors always produce erect, diminished, virtual images with a wide field of view.'
    ],
    associatedQuizId: 'waec-physics-ss1-q7'
  },

  // ==========================================
  // WEEK 8: REFRACTION & TOTAL INTERNAL REFLECTION
  // ==========================================
  {
    id: 'phys-ss1-term2-week8',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Refraction of Light at Plane Surfaces & Total Internal Reflection',
    subtopics: [
      'Cause of Refraction & Optical Density',
      "Snell's Law & Refractive Index (n = sin i / sin r)",
      'Real Depth vs. Apparent Depth (n = real/apparent)',
      'Critical Angle & Total Internal Reflection (TIR) in Fiber Optics'
    ],
    readingTimeMinutes: 8,
    summary: 'Investigate the bending of light across optical media, Snell’s Law, real and apparent depth, and the physics of Total Internal Reflection in telecommunications.',
    contentMarkdown: `### 1. The Nature and Cause of Refraction

**Refraction** is the change in the direction and speed of a light wave as it passes obliquely from one transparent medium into another of different **optical density**.

- When light travels from a **less dense to a denser medium** (e.g. Air $\\rightarrow$ Glass), its velocity decreases and the ray bends **toward the normal** ($i > r$).
- When light travels from a **denser to a less dense medium** (e.g. Glass $\\rightarrow$ Air), its velocity increases and the ray bends **away from the normal** ($i < r$).
- If incident at $90^{\\circ}$ normal ($i = 0^{\\circ}$), the ray passes through **without deviation**, though its speed still changes.

---

### 2. Snell's Law & Refractive Index ($n$)

[Diagram: refraction-total-internal-reflection]

> *The ratio of the sine of the angle of incidence to the sine of the angle of refraction is a constant for a given pair of media.*

$$n = \\frac{\\sin i}{\\sin r} = \\frac{v_1}{v_2} = \\frac{\\lambda_1}{\\lambda_2}$$

Where $v$ is light speed and $\\lambda$ is wavelength (frequency $f$ remains constant across all media).

---

### 3. Real Depth vs. Apparent Depth

Because light rays bending away from the normal diverge upon leaving water, an underwater object appears closer to the surface than it truly is:

$$n = \\frac{\\text{Real Depth}}{\\text{Apparent Depth}}$$
$$\\text{Apparent Displacement} = \\text{Real Depth} - \\text{Apparent Depth} = t\\left(1 - \\frac{1}{n}\\right)$$

---

### 4. Critical Angle & Total Internal Reflection (TIR)

As the angle of incidence in the denser medium increases, the angle of refraction in the less dense medium increases until it reaches exactly **$90^{\\circ}$** along the boundary:
- **Critical Angle ($C$)**: The angle of incidence in the denser medium for which the corresponding angle of refraction in the less dense medium is $90^{\\circ}$.
  $$\\sin C = \\frac{1}{n}$$

#### Two Essential Conditions for Total Internal Reflection:
1. Light must travel from an **optically denser medium toward an optically less dense medium**.
2. The angle of incidence ($i$) in the denser medium must be **greater than the critical angle ($C$)** ($i > C$).

#### Critical Angles for Common Media into Air:
- **Water** ($n = 1.33$): $C = \\sin^{-1}(1/1.33) \\approx 48.6^{\\circ} \\approx 49^{\\circ}$
- **Crown Glass** ($n = 1.50$): $C = \\sin^{-1}(1/1.50) \\approx 41.8^{\\circ} \\approx 42^{\\circ}$
- **Diamond** ($n = 2.42$): $C = \\sin^{-1}(1/2.42) \\approx 24.4^{\\circ}$ (Tiny critical angle causes light entering to reflect internally multiple times before escaping, producing intense brilliance).

---

### 5. Practical Applications of Total Internal Reflection
1. **Fiber Optic Telecommunications**: Flexible glass/silica cores transmit light pulses over thousands of kilometers with negligible energy loss via successive TIR.
2. **Totally Reflecting Prisms**: $45^{\\circ}-90^{\\circ}-45^{\\circ}$ prisms replace silvered mirrors in periscopes and binoculars (100% reflection with zero tarnishing).
3. **Atmospheric Mirages**: Continuous upward refraction over hot savanna asphalt bends sky rays into drivers' eyes, creating the illusion of puddles of water.

---

### 6. WAEC Checkpoint Practice Questions

- **Question 1**: A swimming pool of real depth $2.4\\,\\text{m}$ appears to be $1.8\\,\\text{m}$ deep to a boy standing at the edge. What is the refractive index of the water?
  - A) 1.25
  - B) 1.33 (*Correct — $n = \\frac{\\text{Real Depth}}{\\text{Apparent Depth}} = \\frac{2.4}{1.8} = 1.33$*)
  - C) 1.50
  - D) 0.75
- **Question 2**: If the refractive index of crown glass is $1.50$, its critical angle into air is:
  - A) $30.0^{\\circ}$
  - B) $41.8^{\\circ}$ (*Correct — $\\sin C = \\frac{1}{1.50} = 0.6667 \\implies C = \\sin^{-1}(0.6667) = 41.8^{\\circ}$*)
  - C) $48.6^{\\circ}$
  - D) $60.0^{\\circ}$`,
    keyTakeaways: [
      'Snell’s Law: n = sin i / sin r = speed in medium 1 / speed in medium 2 = real depth / apparent depth.',
      'Total Internal Reflection occurs only from dense to rare media when angle of incidence exceeds critical angle (i > C).',
      'Critical angle formula: sin C = 1/n; diamond has a small critical angle of 24.4°, explaining its brilliant sparkle.'
    ],
    associatedQuizId: 'waec-physics-ss1-q8'
  },

  // ==========================================
  // WEEK 9: PRISMS & DISPERSION OF LIGHT
  // ==========================================
  {
    id: 'phys-ss1-term2-week9',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Refraction through Triangular Prisms & Dispersion of Light',
    subtopics: [
      'Angle of Deviation & Angle of Minimum Deviation (Dm)',
      'The Prism Formula for Refractive Index',
      'Dispersion of White Light into Pure Spectrum',
      'Rainbow Formation & Color Mixing Principles'
    ],
    readingTimeMinutes: 7,
    summary: 'Trace light deviation through triangular prisms, deduce the prism formula, and analyze the dispersion of white light into its constituent rainbow colors.',
    contentMarkdown: `### 1. Refraction Geometry in a Triangular Glass Prism

When a ray of monochromatic light passes through a triangular glass prism of refracting angle $A$:
- It suffers two successive refractions: once entering the first face, and once emerging from the second face.
- The emergent ray is permanently bent toward the broad base of the prism.

#### Angle of Deviation ($D$):
The angle between the initial direction of the incident ray and the final direction of the emergent ray:
$$D = (i_1 - r_1) + (i_2 - r_2) = (i_1 + i_2) - (r_1 + r_2)$$
$$A = r_1 + r_2 \\implies D = i_1 + i_2 - A$$

---

### 2. Angle of Minimum Deviation ($D_m$) & The Prism Formula

When the angle of incidence is adjusted such that light passes **symmetrically through the prism parallel to its base**, the angle of deviation reaches an absolute minimum ($D = D_m$). At this symmetric orientation:
$$i_1 = i_2 = i \\quad \\text{and} \\quad r_1 = r_2 = r$$
$$A = 2r \\implies r = \\frac{A}{2}$$
$$D_m = 2i - A \\implies i = \\frac{A + D_m}{2}$$

Substituting into Snell's Law gives the celebrated **Prism Formula**:

$$n = \\frac{\\sin\\left(\\frac{A + D_m}{2}\\right)}{\\sin\\left(\\frac{A}{2}\\right)}$$

---

### 3. Dispersion of White Light

First demonstrated by Sir Isaac Newton in 1666:
> **Dispersion** is the separation of white light into its constituent spectral colors when passing through a prism, caused by different colors traveling at different speeds in glass.

$$\\text{Speed in glass: } v_{\\text{red}} > v_{\\text{orange}} > v_{\\text{yellow}} > v_{\\text{green}} > v_{\\text{blue}} > v_{\\text{indigo}} > v_{\\text{violet}}$$
$$\\text{Refractive index: } n_{\\text{red}} < n_{\\text{violet}}$$

| Spectral Color | Wavelength Range (nm) | Deviation Angle in Glass | Refractive Index in Glass |
| :--- | :--- | :--- | :--- |
| **Red** | $\\approx 700\\,\\text{nm}$ (Longest) | **Least deviated** | Lowest ($n \\approx 1.51$) |
| **Orange** | $\\approx 620\\,\\text{nm}$ | Moderate | Low |
| **Yellow** | $\\approx 580\\,\\text{nm}$ | Moderate | Moderate |
| **Green** | $\\approx 530\\,\\text{nm}$ | Significant | Significant |
| **Blue** | $\\approx 470\\,\\text{nm}$ | High | High |
| **Indigo** | $\\approx 430\\,\\text{nm}$ | Very High | Very High |
| **Violet** | $\\approx 400\\,\\text{nm}$ (Shortest) | **Most deviated** | Highest ($n \\approx 1.53$) |

---

### 4. Natural Dispersion: Rainbow Formation

A rainbow is produced by millions of spherical raindrops acting as microscopic optical prisms:
1. **Refraction and Dispersion** as sunlight enters the droplet.
2. **Total Internal Reflection** off the back inner wall of the droplet.
3. **Refraction and Further Dispersion** as colored light emerges from the front of the raindrop toward the observer's eye.

---

### 5. WAEC Checkpoint Practice Questions

- **Question 1**: An equilateral glass prism ($A = 60^{\\circ}$) has an angle of minimum deviation of $38^{\\circ}$. Calculate the refractive index of the glass.
  - A) 1.33
  - B) 1.51 (*Correct — $n = \\frac{\\sin((60 + 38)/2)}{\\sin(60/2)} = \\frac{\\sin(49^{\\circ})}{\\sin(30^{\\circ})} = \\frac{0.7547}{0.5000} = 1.509 \\approx 1.51$*)
  - C) 1.62
  - D) 1.73
- **Question 2**: When white light passes through a glass prism, which color is deviated the most and why?
  - A) Red, because it has the longest wavelength
  - B) Violet, because it travels slowest in glass and has the highest refractive index (*Correct*)
  - C) Yellow, because it is in the middle of the spectrum
  - D) Green, because it is reflected internally`,
    keyTakeaways: [
      'The prism formula n = sin((A + Dm)/2) / sin(A/2) accurately calculates refractive index from minimum deviation.',
      'Dispersion occurs because different wavelengths travel at different speeds in glass: red is fastest and least deviated; violet is slowest and most deviated.',
      'Rainbows form by a combination of refraction, dispersion, and total internal reflection within spherical raindrops.'
    ],
    associatedQuizId: 'waec-physics-ss1-q9'
  },

  // ==========================================
  // WEEK 10: SIMPLE MACHINES & MECHANICS
  // ==========================================
  {
    id: 'phys-ss1-term2-week10',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Simple Machines, Mechanical Advantage & Efficiency',
    subtopics: [
      'Fundamental Machine Definitions: MA, VR & Efficiency (η)',
      'The Three Classes of Levers',
      'Pulleys: Single Fixed, Single Movable & Block and Tackle',
      'Inclined Plane, Screw Jack & Wheel and Axle'
    ],
    readingTimeMinutes: 8,
    summary: 'Analyze simple machines, calculate Mechanical Advantage and Velocity Ratio, and evaluate why machine efficiency is always strictly less than 100%.',
    contentMarkdown: `### 1. Fundamental Machine Terms & Formulations

A **machine** is any device by means of which work can be applied more conveniently, allowing a small effort force ($E$) to overcome a larger load force ($L$).

1. **Mechanical Advantage ($MA$)**:
   $$MA = \\frac{\\text{Load } (L)}{\\text{Effort } (E)}$$
   $MA$ is a dimensionless force-ratio. If $MA > 1$, the machine multiplies force.
2. **Velocity Ratio ($VR$)**:
   $$VR = \\frac{\\text{Distance moved by Effort } (d_E)}{\\text{Distance moved by Load } (d_L)}$$
   $VR$ is governed strictly by the machine's geometric construction and remains constant regardless of friction.
3. **Efficiency ($\\eta$)**:
   $$\\eta = \\frac{\\text{Work Output}}{\\text{Work Input}} \\times 100\\% = \\frac{L \\times d_L}{E \\times d_E} \\times 100\\% = \\frac{MA}{VR} \\times 100\\%$$

> *In any real machine, efficiency is **always less than $100\\%$** because work must be done against friction between moving components and against the weight of the machine's own moving parts.*

---

### 2. The Three Orders of Levers (FLE Mnemonic)

To easily remember the orders of levers, remember what is positioned **in the middle**: **F - L - E (1 - 2 - 3)**:

| Class of Lever | What Lies in the Middle? | Mechanical Advantage ($MA$) | Real-World Nigerian Secondary School Examples |
| :--- | :--- | :--- | :--- |
| **First Class** | **Fulcrum ($F$)** in middle ($E - F - L$) | Can be $>1, =1,$ or $<1$ | Crowbar, claw hammer, pair of scissors, see-saw |
| **Second Class** | **Load ($L$)** in middle ($F - L - E$) | **Always $> 1$** (Force multiplier) | Wheelbarrow, nutcracker, bottle opener |
| **Third Class** | **Effort ($E$)** in middle ($F - E - L$) | **Always $< 1$** (Speed/distance multiplier) | Human forearm, sugar tongs, fishing rod, tweezers |

---

### 3. Block and Tackle Pulley System

[Diagram: block-and-tackle-pulley]

- In a block and tackle system with $n$ pulleys, **$VR = n$** (the total number of pulleys in both the fixed and movable blocks, or the number of rope segments directly supporting the load).
- For a 4-pulley system: $VR = 4$. If an effort moves $8\\,\\text{m}$, the load lifts by $2\\,\\text{m}$.
- If friction is negligible: $MA = VR = 4$, and $\\eta = 100\\%$.
- In reality, if $E = 300\\,\\text{N}$ lifts $L = 1000\\,\\text{N}$:
  $$MA = \\frac{1000}{300} = 3.33$$
  $$\\eta = \\frac{MA}{VR} \\times 100\\% = \\frac{3.33}{4} \\times 100\\% = \\mathbf{83.3\\%}$$

---

### 4. Other Standard Simple Machines

| Simple Machine | Velocity Ratio ($VR$) Formula | Variables Defined |
| :--- | :--- | :--- |
| **Inclined Plane** | $VR = \\frac{1}{\\sin\\theta} = \\frac{L}{h}$ | $L = \\text{length of ramp}$, $h = \\text{vertical height}$, $\\theta = \\text{slope angle}$ |
| **Wheel and Axle** | $VR = \\frac{R}{r}$ | $R = \\text{radius of large wheel}$, $r = \\text{radius of small axle}$ |
| **Screw Jack** | $VR = \\frac{2\\pi L}{p}$ | $L = \\text{length of turning tommy bar}$, $p = \\text{pitch (distance between threads)}$ |
| **Hydraulic Press** | $VR = \\frac{A}{a} = \\frac{D^2}{d^2}$ | $D = \\text{diameter of ram cylinder}$, $d = \\text{diameter of effort piston}$ |

---

### 5. WAEC Checkpoint Practice Questions

- **Question 1**: A block and tackle pulley system with a velocity ratio of 5 is used to raise a load of $400\\,\\text{N}$ through a height of $2\\,\\text{m}$. If the effort required is $100\\,\\text{N}$, calculate the efficiency of the machine:
  - A) $60\\%$
  - B) $75\\%$
  - C) $80\\%$ (*Correct — $MA = \\frac{400}{100} = 4$; $\\eta = \\frac{MA}{VR} \\times 100 = \\frac{4}{5} \\times 100 = 80\\%$*)
  - D) $100\\%$
- **Question 2**: A wheelbarrow is an example of which class of lever?
  - A) First class
  - B) Second class (*Correct — load rests between wheel fulcrum and operator effort handles*)
  - C) Third class
  - D) Fourth class`,
    keyTakeaways: [
      'MA = Load/Effort; VR = Effort distance/Load distance; Efficiency η = (MA/VR) × 100%.',
      'Levers follow the FLE mnemonic: Fulcrum in middle (1st), Load in middle (2nd), Effort in middle (3rd).',
      'In a block and tackle system, VR equals the number of pulleys supporting the movable block.'
    ],
    associatedQuizId: 'waec-physics-ss1-q10'
  },

  // ==========================================
  // WEEK 11: WORK, ENERGY, AND POWER
  // ==========================================
  {
    id: 'phys-ss1-term2-week11',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Work, Mechanical Energy & Power',
    subtopics: [
      'Scientific Work Done (W = Fs cos θ)',
      'Kinetic Energy (Ek = ½mv²) & Gravitational Potential Energy (Ep = mgh)',
      'Principle of Conservation of Mechanical Energy',
      'Power Definition, Units (Watts, Horsepower) & Velocity (P = Fv)'
    ],
    readingTimeMinutes: 7,
    summary: 'Formulate the mathematical definitions of work, kinetic and potential energy, prove mechanical conservation during free fall, and calculate power output.',
    contentMarkdown: `### 1. Work Done in Physics

**Work** is done whenever a force moves its point of application through a displacement in the direction of the force:

$$W = F s \\cos\\theta$$

Where:
- $F$ is the applied force in Newtons ($\\text{N}$)
- $s$ is the displacement in meters ($\\text{m}$)
- $\\theta$ is the angle between the force vector and displacement vector

#### Crucial Conceptual Cases:
1. When $\\theta = 0^{\\circ}$ (Force in direction of motion): $W = F s$ (**Maximum positive work**).
2. When $\\theta = 90^{\\circ}$ (Force perpendicular to motion, e.g. carrying a bucket horizontally or satellite in circular orbit): $W = F s \\cos(90^{\\circ}) = \\mathbf{0}$ (**Zero work done!**).
3. When $\\theta = 180^{\\circ}$ (Frictional drag): $W = -F s$ (**Negative work done**).

$$\\text{SI Unit of Work} = \\text{Joule } (\\text{J}) = 1\\,\\text{N}\\cdot\\text{m} = 1\\,\\text{kg}\\cdot\\text{m}^2/\\text{s}^2$$

---

### 2. Mechanical Energy Forms

Energy is the capacity to do work (SI unit: Joule).

1. **Gravitational Potential Energy ($E_p$)**: Energy stored in a body due to its position in a gravitational field:
   $$E_p = m g h$$
2. **Kinetic Energy ($E_k$)**: Energy possessed by a body due to its motion:
   $$E_k = \\frac{1}{2} m v^2 = \\frac{p^2}{2m}$$
   Where $p = mv$ is momentum.

---

### 3. Principle of Conservation of Mechanical Energy

> *In an isolated system subject only to conservative forces (like gravity), the total mechanical energy remains constant throughout the motion.*

$$E_{\\text{total}} = E_k + E_p = \\text{constant}$$
$$\\frac{1}{2} m v_1^2 + m g h_1 = \\frac{1}{2} m v_2^2 + m g h_2$$

#### Free-Fall Trajectory Verification:
- **At top of fall (height $h$)**: $v = 0 \\implies E_k = 0, E_p = mgh \\implies E_{\\text{total}} = mgh$.
- **At midpoint ($h/2$)**: Half potential energy has converted into kinetic energy ($E_k = \\frac{1}{2}mgh, E_p = \\frac{1}{2}mgh$).
- **Just before impact ($h = 0$)**: All potential energy is converted into kinetic energy:
  $$v = \\sqrt{2gh} \\implies E_k = \\frac{1}{2}m(2gh) = mgh, \\quad E_p = 0$$

---

### 4. Power Output

**Power** is the time rate of doing work or transferring energy:

$$P = \\frac{W}{t} = \\frac{\\Delta E}{t} = \\frac{F s}{t} = F v$$

$$\\text{SI Unit of Power} = \\text{Watt } (\\text{W}) = 1\\,\\text{J/s}$$
$$1\\,\\text{Kilowatt } (\\text{kW}) = 1,000\\,\\text{W}$$
$$1\\,\\text{Horsepower } (\\text{hp}) \\approx 746\\,\\text{W}$$

---

### 5. WAEC Checkpoint Practice Questions

- **Question 1**: A pump raises $600\\,\\text{kg}$ of water through a vertical height of $20\\,\\text{m}$ in $30\\,\\text{seconds}$. Calculate the power output of the pump. ($g = 10\\,\\text{m/s}^2$)
  - A) $2,000\\,\\text{W}$
  - B) $4,000\\,\\text{W}$ (*Correct — $W = mgh = 600 \\times 10 \\times 20 = 120,000\\,\\text{J}$; $P = \\frac{W}{t} = \\frac{120,000}{30} = 4,000\\,\\text{W} = 4\\,\\text{kW}$*)
  - C) $6,000\\,\\text{W}$
  - D) $8,000\\,\\text{W}$
- **Question 2**: If the momentum of an object is doubled, its kinetic energy increases by a factor of:
  - A) 2
  - B) 4 (*Correct — $E_k = \\frac{p^2}{2m}$; doubling $p$ quadruples $E_k$*)
  - C) 8
  - D) Remains unchanged`,
    keyTakeaways: [
      'Work W = Fs cos θ; no work is done when force and displacement are perpendicular (cos 90° = 0).',
      'Conservation of mechanical energy: Ep + Ek = constant; in free fall, v = √(2gh).',
      'Power P = W/t = Fv (SI unit: Watt = J/s; 1 hp ≈ 746 W).'
    ],
    associatedQuizId: 'waec-physics-ss1-q11'
  },

  // ==========================================
  // WEEK 12: COMPREHENSIVE REVISION & DRILLS
  // ==========================================
  {
    id: 'phys-ss1-term2-week12',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 12,
    topicTitle: 'Comprehensive 2nd Term Physics Review & WAEC Calculation Drills',
    subtopics: [
      'Integrated Concept Map: Thermal, Optical & Mechanical Systems',
      'Multi-Step Numerical Calorimetry & Thermal Expansion Drills',
      'Mirror Equation & Snell’s Law Geometric Optics Problem Sets',
      'Common WAEC Examiner Traps & Practical Examination Tips'
    ],
    readingTimeMinutes: 9,
    summary: 'Consolidate 12 weeks of SS 1 Physics with challenging multi-concept past WAEC and JAMB examination calculation drills with detailed step-by-step solutions.',
    contentMarkdown: `### 1. Unified 2nd Term Physics Master Review Map

This term covered the three core pillars of introductory Senior Secondary physics:
1. **Thermal Physics**: Microscopic molecular kinetic energy manifests as temperature. Heat transfer drives **thermal expansion** ($\\Delta L = L_1\\alpha\\Delta\\theta$), temperature rise ($Q = mc\\Delta\\theta$), and phase transformations ($Q = mL$).
2. **Geometrical Optics**: Rectilinear light rays undergo **reflection** at plane and curved mirrors ($\\frac{1}{f} = \\frac{1}{u} + \\frac{1}{v}$) and **refraction** across optical interfaces (Snell's Law $n = \\frac{\\sin i}{\\sin r}$, critical angle $\\sin C = \\frac{1}{n}$).
3. **Mechanical Systems**: Simple machines allow small efforts to lift massive loads ($MA = L/E, VR = d_E/d_L$), converting input work into mechanical energy with unavoidable frictional losses ($\\eta < 100\\%$).

---

### 2. High-Yield Multi-Topic WAEC Calculation Drills

#### Drill 1: Calorimetry Mixture Calculation
**Question**: An electric kettle rated at $2.0\\,\\text{kW}$ is used to heat $1.5\\,\\text{kg}$ of water from $25^{\\circ}\\text{C}$ to its boiling point ($100^{\\circ}\\text{C}$). Assuming $80\\%$ of the electrical energy is absorbed by the water, calculate the time taken in seconds. ($c_w = 4200\\,\\text{J}/(\\text{kg}\\cdot\\text{K})$).

- **Step 1**: Find heat energy required by the water:
  $$Q = m c \\Delta\\theta = 1.5 \\times 4200 \\times (100 - 25) = 1.5 \\times 4200 \\times 75 = 472,500\\,\\text{J}$$
- **Step 2**: Account for $80\\%$ electrical efficiency:
  $$\\text{Useful Power Output} = 0.80 \\times 2000\\,\\text{W} = 1,600\\,\\text{W}$$
- **Step 3**: Calculate time taken:
  $$t = \\frac{Q}{P_{\\text{useful}}} = \\frac{472,500\\,\\text{J}}{1,600\\,\\text{W}} \\approx \\mathbf{295.3\\,\\text{seconds}} \\quad (\\approx 4.92\\,\\text{minutes})$$

---

#### Drill 2: Curved Mirror Focal Length & Image Position
**Question**: An object is placed $12\\,\\text{cm}$ in front of a concave mirror. A real image three times the size of the object is formed. Calculate:
1. The image distance ($v$)
2. The focal length ($f$) of the mirror

- **Step 1**: Use magnification formula:
  $$m = \\frac{v}{u} = 3 \\implies v = 3 u = 3 \\times 12 = \\mathbf{36\\,\\text{cm}}$$
- **Step 2**: Apply mirror equation:
  $$\\frac{1}{f} = \\frac{1}{u} + \\frac{1}{v} = \\frac{1}{12} + \\frac{1}{36} = \\frac{3 + 1}{36} = \\frac{4}{36} = \\frac{1}{9}$$
  $$\\mathbf{f = 9\\,\\text{cm}}$$

---

#### Drill 3: Snell's Law & Speed of Light
**Question**: A ray of light traveling in air strikes a glass plate at an angle of incidence of $45^{\\circ}$. If the angle of refraction in the glass is $28^{\\circ}$, calculate:
1. The refractive index ($n$) of the glass
2. The speed of light in the glass ($c = 3.0 \\times 10^8\\,\\text{m/s}$)

- **Step 1**: Apply Snell's Law:
  $$n = \\frac{\\sin i}{\\sin r} = \\frac{\\sin(45^{\\circ})}{\\sin(28^{\\circ})} = \\frac{0.7071}{0.4695} \\approx \\mathbf{1.51}$$
- **Step 2**: Calculate speed in glass:
  $$v = \\frac{c}{n} = \\frac{3.0 \\times 10^8\\,\\text{m/s}}{1.51} \\approx \\mathbf{1.99 \\times 10^8\\,\\text{m/s}}$$

---

### 3. Top 5 Examiner Pitfalls to Avoid in WAEC Physics

| Common Student Pitfall | Correct WAEC Standard & Examination Protocol |
| :--- | :--- |
| **Measuring Angles from Mirror Surface** | Always measure angles of incidence and reflection/refraction from the **perpendicular normal line**, never from the glass surface. |
| **Omitting Arrowheads on Optical Rays** | Every single ray in optics diagrams must feature an arrowhead indicating the direction of light travel; WAEC awards 0 marks for un-arrowed rays. |
| **Neglecting SI Unit Conversions** | Always convert grams to $\\text{kg}$, $\\text{cm}$ to $\\text{m}$, minutes to $\\text{seconds}$, and $^{\\circ}\\text{C}$ to $\\text{K}$ before calculation. |
| **Confusing Linear & Cubic Expansivity** | Remember that volume expansion requires cubic expansivity $\\gamma = 3\\alpha$, while area expansion requires $\\beta = 2\\alpha$. |
| **Assuming Machine Efficiency is 100%** | Real machines always have $\\eta < 100\\%$ due to friction and the weight of pulleys; $VR$ remains constant while $MA$ drops. |

---

### 4. Practice Checkpoint Questions

- **Question 1**: A block and tackle pulley system has 6 pulleys. When an effort of $250\\,\\text{N}$ is applied, a load of $1200\\,\\text{N}$ is lifted. What is the efficiency of the machine?
  - A) $70\\%$
  - B) $80\\%$ (*Correct — $MA = 1200/250 = 4.8$; $VR = 6$; $\\eta = (4.8/6) \\times 100 = 80\\%$*)
  - C) $85\\%$
  - D) $90\\%$
- **Question 2**: What happens to the frequency of light when it passes from air into water?
  - A) It increases
  - B) It decreases
  - C) It remains constant (*Correct — frequency is determined exclusively by the light source; only speed and wavelength change*)
  - D) It doubles`,
    keyTakeaways: [
      'In ray diagrams, always measure angles from the normal line and include directional arrowheads.',
      'Refractive index n = sin i / sin r = speed in air / speed in medium = real depth / apparent depth.',
      'Frequency of a wave never changes across different media; only wavelength and speed change.'
    ],
    associatedQuizId: 'waec-physics-ss1-q12'
  }
];
