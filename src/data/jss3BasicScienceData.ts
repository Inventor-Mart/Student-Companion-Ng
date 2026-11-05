import { CurriculumTopic } from '../types';

export const JSS3_BASIC_SCIENCE_TOPICS: CurriculumTopic[] = [
  {
    id: 'jss3-basic-science-t2-w1',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Atomic Structure, Subatomic Particles & Electron Configuration',
    subtopics: [
      'Historical Evolution of Atomic Models (Dalton to Bohr-Rutherford)',
      'Subatomic Particles: Protons, Neutrons, Electrons (Charge, Relative Mass & Location)',
      'Atomic Number (Z), Mass Number (A), and Isotopes (Carbon-12/14, Chlorine-35/37)',
      'Bohr-Rutherford Electron Shells (K=2, L=8, M=8, N=2) for the First 20 Elements',
      'Valence Electrons, Octet Stability, and Chemical Bonding Foundations',
      'Laboratory Practical: Flame Test Identification of Metal Cations',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 14,
    summary: 'Comprehensive analysis of atomic architecture, subatomic particle properties, atomic and mass numbers, isotope calculations, Bohr electronic shell distributions for elements 1 to 20, flame test identification, and BECE examination drills.',
    contentMarkdown: `### 1. Historical Background of the Atomic Theory

The word *atom* originates from the Greek word *atomos*, meaning indivisible. Over centuries of experimental inquiry, scientists developed models explaining matter's fundamental building blocks:

1. **John Dalton's Atomic Theory (1803):** Stated that all matter is composed of tiny, indivisible, indestructible spheres called atoms. While revolutionary, later discoveries revealed that atoms are composed of subatomic particles and that atoms of the same element can have different masses (isotopes).
2. **J.J. Thomson's Plum Pudding Model (1897):** Discovered the electron via cathode ray experiments, visualizing the atom as a positively charged sphere embedded with negatively charged electrons.
3. **Ernest Rutherford's Nuclear Model (1911):** The alpha-particle scattering experiment demonstrated that atoms have a tiny, dense, positively charged **nucleus** containing almost all the atom's mass, surrounded by mostly empty space where electrons orbit.
4. **Niels Bohr's Planetary Model (1913):** Proposed that electrons orbit the nucleus in fixed, quantized energy levels called **electron shells** or orbits.

---

### 2. Subatomic Particles & Their Fundamental Properties

An atom consists of three primary subatomic particles:

| Subatomic Particle | Symbol | Relative Charge | Relative Mass (a.m.u.) | Actual Location in Atom | Discovered By |
| :--- | :---: | :---: | :---: | :--- | :--- |
| **Proton** | $p^+$ | $+1$ (Positive) | $1$ | Inside the central nucleus | Ernest Rutherford (1919) |
| **Neutron** | $n^0$ | $0$ (Neutral) | $1$ | Inside the central nucleus | James Chadwick (1932) |
| **Electron** | $e^-$ | $-1$ (Negative) | $\\frac{1}{1840} \\approx 0$ | Orbiting in outer electron shells | J.J. Thomson (1897) |

*Key Takeaway:* In an electrically neutral atom, the number of positively charged protons **always equals** the number of negatively charged electrons:
$$\\text{Number of Protons } (p) = \\text{Number of Electrons } (e)$$

---

### 3. Atomic Number (Z), Mass Number (A), and Isotopes

An atom is symbolically represented using nuclide notation:
$$\^{A}\_{Z}\\text{X}$$
- **$X$:** Chemical symbol of the element (e.g., $\\text{C}$ for Carbon, $\\text{Na}$ for Sodium).
- **$Z$ (Atomic Number):** The number of protons in the nucleus of an atom. In a neutral atom, it also equals the number of electrons. It determines the element's chemical identity and position on the Periodic Table.
- **$A$ (Mass Number / Nucleon Number):** The total number of protons and neutrons in the nucleus.
$$\\text{Mass Number } (A) = \\text{Protons } (p) + \\text{Neutrons } (n)$$
$$\\text{Number of Neutrons } (n) = A - Z$$

#### Isotopes
**Isotopes** are atoms of the same element having the **same atomic number ($Z$)** (same number of protons and electrons) but **different mass numbers ($A$)** due to a different number of neutrons.
- **Isotopes of Carbon:**
  - $\^{12}\_{6}\\text{C}$: $6$ protons, $6$ electrons, $6$ neutrons ($12 - 6 = 6$). Stable carbon.
  - $\^{14}\_{6}\\text{C}$: $6$ protons, $6$ electrons, $8$ neutrons ($14 - 6 = 8$). Radioactive isotope used in carbon dating.
- **Isotopes of Chlorine:**
  - $\^{35}\_{17}\\text{Cl}$ ($75\\%$ natural abundance) and $\^{37}\_{17}\\text{Cl}$ ($25\\%$ natural abundance).
  $$\\text{Relative Atomic Mass (R.A.M.)} = \\frac{(35 \\times 75) + (37 \\times 25)}{100} = \\frac{2625 + 925}{100} = 35.5$$

---

### 4. Bohr-Rutherford Electron Shells & Configurations (Elements 1–20)

Electrons occupy concentric spherical energy levels designated by letters $K, L, M, N$ or principal quantum numbers $n = 1, 2, 3, 4$.
The maximum number of electrons any shell can hold is governed by the formula $2n\^2$:
- **$K$-shell ($n = 1$):** Maximum $2(1)\^2 = 2$ electrons
- **$L$-shell ($n = 2$):** Maximum $2(2)\^2 = 8$ electrons
- **$M$-shell ($n = 3$):** Holds up to $8$ electrons for the first 20 elements (octet rule before $4s$ fills)
- **$N$-shell ($n = 4$):** Receives the remaining electrons (e.g., Potassium $2,8,8,1$; Calcium $2,8,8,2$)

#### ASCII Diagram: Bohr Model for Sodium ($^{23}_{11}\\text{Na}$)
\`\`\`
                     [ e- ]
                 . - ' " ' - .
             . '   [ e- ] [ e- ]   ' .
          . '   . - ' " " " ' - .   ' .
        .     .     [ e- ] [ e- ]     .     .
       /    /     . - ' " ' - .     \\    \\
      |    |    |   +---------+  |    |    |
     [e-] [e-]  |   | Nucleus |  |   [e-] [e-]
      |    |    |   | 11 p+   |  |    |    |
      |    |    |   | 12 n0   |  |    |    |
      |    |    |   +---------+  |    |    |
     [e-] [e-]  |                |   [e-]  |
      |    |    \\   [ e- ] [ e- ]  /    |    |
       \\    \\     ' - . _ . - '     /    /
        .     .       [ e- ]       .     .
          . '   . - ' " " " ' - .   ' .
             . '      [ e- ]       ' .
                 . - ' " ' - .
                     [ e- ]  <-- Valence Electron (1 in M-shell)
\`\`\`

#### Electron Configurations of the First 20 Elements:
1. **Hydrogen ($\^{1}\_{1}\\text{H}$):** $1$ (Valence: 1)
2. **Helium ($\^{4}\_{2}\\text{He}$):** $2$ (Duplet stable, Noble gas)
3. **Lithium ($\^{7}\_{3}\\text{Li}$):** $2, 1$
4. **Beryllium ($\^{9}\_{4}\\text{Be}$):** $2, 2$
5. **Boron ($\^{11}\_{5}\\text{B}$):** $2, 3$
6. **Carbon ($\^{12}\_{6}\\text{C}$):** $2, 4$
7. **Nitrogen ($\^{14}\_{7}\\text{N}$):** $2, 5$
8. **Oxygen ($\^{16}\_{8}\\text{O}$):** $2, 6$
9. **Fluorine ($\^{19}\_{9}\\text{F}$):** $2, 7$
10. **Neon ($\^{20}\_{10}\\text{Ne}$):** $2, 8$ (Octet stable, Noble gas)
11. **Sodium ($\^{23}\_{11}\\text{Na}$):** $2, 8, 1$
12. **Magnesium ($\^{24}\_{12}\\text{Mg}$):** $2, 8, 2$
13. **Aluminium ($\^{27}\_{13}\\text{Al}$):** $2, 8, 3$
14. **Silicon ($\^{28}\_{14}\\text{Si}$):** $2, 8, 4$
15. **Phosphorus ($\^{31}\_{15}\\text{P}$):** $2, 8, 5$
16. **Sulfur ($\^{32}\_{16}\\text{S}$):** $2, 8, 6$
17. **Chlorine ($\^{35.5}\_{17}\\text{Cl}$):** $2, 8, 7$
18. **Argon ($\^{40}\_{18}\\text{Ar}$):** $2, 8, 8$ (Octet stable, Noble gas)
19. **Potassium ($\^{39}\_{19}\\text{K}$):** $2, 8, 8, 1$
20. **Calcium ($\^{40}\_{20}\\text{Ca}$):** $2, 8, 8, 2$

---

### 5. Laboratory Practical: Flame Test Identification of Metal Cations

#### Objective:
To identify metal cations present in unknown chemical salts by observing the characteristic flame coloration produced when heated in a non-luminous Bunsen burner flame.

#### Apparatus and Reagents:
- Platinum or Nichrome wire loop
- Concentrated Hydrochloric Acid ($\\text{HCl}$) in a watch glass
- Bunsen burner
- Samples of metal salts: Sodium Chloride ($\\text{NaCl}$), Potassium Chloride ($\\text{KCl}$), Calcium Chloride ($\\text{CaCl}_2$), Copper(II) Sulfate ($\\text{CuSO}_4$)
- Safety goggles and heat-resistant laboratory apron

#### Step-by-Step Procedure:
1. Put on eye protection and tie back loose hair or clothing.
2. Dip the clean nichrome wire loop into concentrated $\\text{HCl}$ and hold it in the hot, blue (non-luminous) zone of the Bunsen flame until no residual color is imparted to the flame.
3. Dip the cleaned wire loop back into the concentrated $\\text{HCl}$ to moisten it, then touch it to a crystal of the test salt so that a small speck adheres.
4. Introduce the wire loop directly into the outer edge of the non-luminous Bunsen flame.
5. Observe and record the distinct persistent color of the flame.

#### Observation Table:
| Metal Cation | Test Salt Sample | Characteristic Flame Color | Scientific Explanation |
| :--- | :--- | :--- | :--- |
| **Sodium ($\\text{Na}\^+$)** | $\\text{NaCl}$ | **Persistent Golden Yellow** | Thermal excitation of $3s$ valence electron emitting $589\\text{ nm}$ photons upon relaxation. |
| **Potassium ($\\text{K}\^+$)** | $\\text{KCl}$ | **Lilac / Light Purple** | High-energy violet-red transition emissions. |
| **Calcium ($\\text{Ca}\^{2+}$)** | $\\text{CaCl}_2$ | **Brick Red / Orange-Red** | Electronic relaxation across characteristic calcium orbital shells. |
| **Copper ($\\text{Cu}\^{2+}$)** | $\\text{CuSO}_4$ | **Bluish-Green** | Greenish emission spectrum characteristic of copper ions. |

#### Safety Precautions:
- Concentrated $\\text{HCl}$ is highly corrosive; handle with extreme caution and never inhale fumes.
- Use the non-luminous (blue) flame with the air-hole fully open, as a luminous yellow flame masks test colors with soot.
- Always clean the wire loop between tests to prevent cross-contamination.

---

### 6. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** An atom of an element $X$ has an atomic number of 13 and a mass number of 27. Determine the number of neutrons and its electron configuration.  
*Solution:*  
$$\\text{Neutrons } (n) = A - Z = 27 - 13 = 14$$  
Since the atom is neutral, it has 13 electrons:  
$$\\text{Configuration} = 2, 8, 3$$  
Element $X$ is Aluminium ($\\text{Al}$).

**Question 2:** Why do elements in the same group of the Periodic Table possess similar chemical properties?  
*Solution:* They possess the **same number of valence electrons** in their outermost shell, which dictates their chemical bonding and reactivity.

**Question 3:** What is the charge, mass, and location of a neutron?  
*Solution:* Charge: $0$ (neutral); Mass: $1\\text{ a.m.u.}$; Location: Inside the central nucleus.`,
    keyTakeaways: [
      'An electrically neutral atom always possesses equal numbers of positively charged protons and negatively charged electrons.',
      'Mass number (A) is the sum of protons and neutrons in the nucleus; isotopes have the same atomic number but different mass numbers.',
      'The Bohr electron shell capacities for elements 1-20 follow the sequence: K=2, L=8, M=8, N=2.',
      'Flame tests identify metal cations through distinct spectral emissions (e.g. Sodium produces persistent golden yellow).'
    ],
    associatedQuizId: 'bece-basic-science-2025'
  },
  {
    id: 'jss3-basic-science-t2-w2',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Kinetic Theory of Matter, States & Changes of State',
    subtopics: [
      'Postulates of the Kinetic Molecular Theory of Matter',
      'Comparative Particle Arrangement, Motion, and Intermolecular Forces in Solids, Liquids, and Gases',
      'Phase Transitions: Melting, Freezing, Boiling, Evaporation, Condensation, Sublimation, and Deposition',
      'Distinction between Boiling and Evaporation',
      'Heating and Cooling Curves: Latent Heat of Fusion and Vaporization',
      'Laboratory Experiment: Demonstration of Diffusion in Liquids and Gases',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 13,
    summary: 'In-depth exploration of the kinetic molecular theory, particle arrangements across three states of matter, phase change thermodynamics, heating curves, Graham diffusion experiment protocols, and Nigerian BECE problem-solving.',
    contentMarkdown: `### 1. The Kinetic Molecular Theory of Matter

The Kinetic Theory of Matter states that:
1. All matter is made up of extremely tiny particles called **atoms, molecules, or ions**.
2. These particles are in **continuous, random, ceaseless motion**.
3. There are empty spaces between the particles known as **intermolecular spaces**.
4. The particles exert **forces of attraction** on one another (cohesive and adhesive forces).
5. The average kinetic energy of the particles is **directly proportional to the absolute temperature** of the substance ($E_k \\propto T$). As temperature increases, particle speed increases.

---

### 2. Comparison of the Three States of Matter

\`\`\`
   SOLID                   LIQUID                    GAS
+----------------+      +----------------+      +----------------+
|  O  O  O  O  O |      |    O    O      |      |      O         |
|  O  O  O  O  O |      |  O   O     O   |      |          O     |
|  O  O  O  O  O |      |    O    O   O  |      |   O            |
|  O  O  O  O  O |      |  O    O        |      |             O  |
+----------------+      +----------------+      +----------------+
Tightly packed          Loosely packed          Far apart
Fixed lattice           Flows, takes container  Random rapid motion
Vibrate in place        Slips over each other   High kinetic energy
\`\`\`

| Property | Solid State | Liquid State | Gaseous State |
| :--- | :--- | :--- | :--- |
| **Particle Arrangement** | Closely and orderly packed in a rigid fixed lattice | Less orderly, particles close but can slide over one another | Widely spaced, random, and completely disordered |
| **Intermolecular Forces** | Extremely strong cohesive forces | Moderate cohesive forces | Negligible / virtually absent forces |
| **Particle Movement** | Vibrate about fixed equilibrium positions | Slide and roll past one another randomly | Move rapidly at high speeds in straight lines colliding elastically |
| **Shape & Volume** | Definite shape and fixed volume | No definite shape (takes container shape), fixed volume | No definite shape and no fixed volume (expands to fill container) |
| **Compressibility** | Incompressible | Practically incompressible | Highly compressible |

---

### 3. Changes of State (Phase Transformations)

Changes of state are **physical changes** caused by the addition or removal of heat energy:

\`\`\`
                       SUBLIMATION (Heat Added)
             +----------------------------------------->+
             |                                          |
        +----+----+           MELTING              +----+----+
        |  SOLID  | ---------------------------->  | LIQUID  |
        +----+----+ <---------------------------- +----+----+
             ^                FREEZING                  |
             |                                          |
             | DEPOSITION (Heat Removed)                | BOILING /
             |                                          | EVAPORATION
             |                CONDENSATION              v
             +------------------------------------ +----+----+
             | <---------------------------------- |   GAS   |
             +-----------------------------------> +---------+
\`\`\`

- **Melting (Liquefaction):** Transition from solid to liquid at a fixed temperature (melting point) by absorbing heat.
- **Freezing (Solidification):** Transition from liquid to solid by releasing heat at freezing point.
- **Vaporization (Boiling & Evaporation):** Liquid changing to gas.
  - **Evaporation:** Occurs at any temperature below boiling point, only at the liquid surface, silent, causes cooling (e.g., sweating in hot Lagos weather).
  - **Boiling:** Occurs at a specific constant temperature (boiling point: $100\^{\\circ}\\text{C}$ for pure water at $1\\text{ atm}$), occurs throughout the entire bulk of the liquid, rapid bubbling.
- **Condensation (Liquefaction):** Gas cooling to liquid.
- **Sublimation:** Direct change from **solid to gas** without passing through the liquid state (e.g., Camphor/Mothballs, Iodine crystals, Dry ice $\\text{CO}_2$, Ammonium chloride $\\text{NH}_4\\text{Cl}$).
- **Deposition:** Direct change from **gas to solid** without passing through the liquid state (e.g., frost formation).

---

### 4. Heating Curve & Latent Heat

When a pure solid is heated continuously at a uniform rate, its temperature changes as shown below:

\`\`\`
Temperature (deg C)
   ^
   |                                   / GAS (Steam)
   |                                  /
100|                       +---------+ Boiling Point (Latent Heat of Vaporization)
   |                      / LIQUID
   |                     / (Water)
  0|          +---------+ Melting Point (Latent Heat of Fusion)
   |         / SOLID (Ice)
   |        /
-10+-------+-------------------------------------------> Time (minutes)
\`\`\`

*Key Scientific Principle:* During melting ($0\^{\\circ}\\text{C}$) and boiling ($100\^{\\circ}\\text{C}$), the temperature remains **constant** despite continuous heating. The heat supplied is **Latent Heat**, used entirely to break intermolecular bonds rather than increase kinetic energy.

---

### 5. Laboratory Practical: Diffusion in Liquids and Gases

#### Experiment A: Diffusion in Liquids
- **Materials:** $500\\text{ mL}$ Beaker, cold water, hot water, potassium permanganate ($\\text{KMnO}_4$) crystals, glass tube.
- **Procedure:** Drop a small crystal of $\\text{KMnO}_4$ into the bottom of a beaker of cold water and another into hot water using a glass tube without stirring.
- **Observation:** The purple color spreads slowly throughout the cold water, but spreads **rapidly and vigorously** in the hot water until a uniform purple solution is formed.
- **Scientific Deduction:** Liquid particles are in continuous motion. Higher temperature increases particle kinetic energy, dramatically increasing the rate of diffusion.

#### Experiment B: Diffusion in Gases (Graham's Law Demonstration)
\`\`\`
   Cotton wool soaked                     White dense ring of                   Cotton wool soaked
   in conc. NH3 (ammonia)                 Ammonium Chloride (NH4Cl)             in conc. HCl
   +---------------+                      |                                     +---------------+
   |   (NH3 gas)   | >>>>>>>>>>>>>>>>>>>> | <<<<<<<<<<                          |   (HCl gas)   |
   +---------------+                      |                                     +---------------+
   |<----------- Distance d1 ------------>|<----------- Distance d2 ----------->|
   |<--------------------------- Long Glass Tube ------------------------------>|
\`\`\`
- **Procedure:** Insert cotton wool soaked in concentrated Ammonia ($\\text{NH}_3$, molar mass $17\\text{ g/mol}$) at one end of a $1\\text{ meter}$ open glass tube, and cotton wool soaked in concentrated Hydrochloric acid ($\\text{HCl}$, molar mass $36.5\\text{ g/mol}$) at the other end. Seal both ends with rubber bungs.
- **Observation:** A dense white ring of solid Ammonium Chloride ($\\text{NH}_4\\text{Cl}$) forms **closer to the $\\text{HCl}$ end**.
- **Explanation:** Ammonia gas has a lower molecular mass ($17\\text{ g/mol}$) than Hydrogen Chloride gas ($36.5\\text{ g/mol}$). Lighter gas particles travel faster and diffuse more quickly than heavier particles.

---

### 6. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** Camphor placed in a school uniform box shrinks and disappears after several weeks without leaving a liquid stain. What physical process has occurred?  
*Solution:* **Sublimation**—the direct transition of solid camphor into gaseous vapor.

**Question 2:** State three clear distinctions between boiling and evaporation.  
*Solution:*
1. Boiling occurs at a fixed temperature (boiling point); evaporation occurs at any temperature.
2. Boiling occurs throughout the entire volume of liquid; evaporation is strictly a surface phenomenon.
3. Boiling is accompanied by visible bubbling; evaporation occurs quietly without bubbling.`,
    keyTakeaways: [
      'The kinetic theory establishes that matter particles are in continuous random motion with temperature proportional to kinetic energy.',
      'Sublimation is the direct transition from solid to gas without liquid intermediate (e.g. camphor, iodine, dry ice).',
      'Boiling occurs at a fixed temperature throughout the entire liquid bulk, whereas evaporation occurs quietly at the surface at any temperature.',
      'Lighter gases diffuse faster than heavier gases as demonstrated by the ammonium chloride ring forming closer to the concentrated HCl end.'
    ],
    associatedQuizId: 'bece-basic-science-2025'
  },
  {
    id: 'jss3-basic-science-t2-w3',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Energy Transformations, Conservation & Power Generation in Nigeria',
    subtopics: [
      'The Universal Law of Conservation of Energy',
      'Fundamental Forms of Energy: Kinetic, Potential, Chemical, Electrical, Thermal, Light, Sound & Nuclear',
      'Mathematical Calculations: Kinetic Energy (Ek = 0.5mv^2) and Potential Energy (Ep = mgh)',
      'Energy Conversion Chains in Everyday Devices (Torches, Generators, Vehicles, Microphones)',
      'Hydroelectric Power Generation in Nigeria (Kainji, Jebba, and Shiroro Dams)',
      'Renewable vs. Non-Renewable Energy Resources in Nigeria',
      'Environmental Impact of Fossil Fuels and Sustainable Energy Solutions',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 14,
    summary: 'Mastering the Law of Conservation of Energy, mechanical energy equations, energy transfer chains, hydroelectric dam architecture in Nigeria, renewable vs non-renewable power sources, and BECE quantitative calculations.',
    contentMarkdown: `### 1. The Law of Conservation of Energy

The **Law of Conservation of Energy** states that:
> *Energy can neither be created nor destroyed, but it can be transformed (converted) from one form into another.*

The total energy in any isolated system remains constant:
$$E_{\\text{total}} = \\text{Constant}$$

---

### 2. Forms of Mechanical Energy & Quantitative Calculations

Mechanical energy consists of two main states:

#### A. Gravitational Potential Energy ($E_p$)
Energy possessed by an object by virtue of its position or height above the ground:
$$E_p = mgh$$
Where:
- $m = \\text{mass of the object in kilograms (kg)}$
- $g = \\text{acceleration due to gravity } (9.8\\text{ m/s}^2 \\text{ or } 10\\text{ m/s}^2 \\text{ on Earth})$
- $h = \\text{height above reference level in meters (m)}$
- Unit: **Joules (J)**

#### B. Kinetic Energy ($E_k$)
Energy possessed by an object by virtue of its motion:
$$E_k = \\frac{1}{2}mv^2$$
Where:
- $m = \\text{mass in kg}$
- $v = \\text{velocity or speed in meters per second (m/s)}$

#### Worked Example 1 (Potential & Kinetic Energy):
A bag of cement of mass $50\\text{ kg}$ is hoisted to the top floor of a 3-storey building in Abuja at a height of $12\\text{ meters}$. ($g = 10\\text{ m/s}^2$).
1. Calculate its potential energy at that height.
2. If it accidentally falls, calculate its kinetic energy just before striking the ground.
3. Determine its velocity just before hitting the ground.

**Solution:**
1. Potential Energy:
   $$E_p = mgh = 50\\text{ kg} \\times 10\\text{ m/s}^2 \\times 12\\text{ m} = 6000\\text{ Joules (or 6 kJ)}$$
2. Kinetic Energy just before ground impact:
   By Conservation of Energy, all potential energy is converted to kinetic energy (ignoring air resistance):
   $$E_k = E_p = 6000\\text{ Joules}$$
3. Velocity just before impact:
   $$E_k = \\frac{1}{2}mv^2 \\implies 6000 = \\frac{1}{2}(50)v^2$$
   $$6000 = 25v^2 \\implies v^2 = \\frac{6000}{25} = 240$$
   $$v = \\sqrt{240} \\approx 15.49\\text{ m/s}$$

---

### 3. Energy Conversion Chains in Everyday Devices

Energy frequently undergoes multistep transformations:

1. **Electric Torchlight / Flashlight:**
   $$\\text{Chemical Energy (Battery)} \\longrightarrow \\text{Electrical Energy (Circuit)} \\longrightarrow \\text{Light Energy} + \\text{Heat Energy}$$
2. **Fuel-Powered Generator ("I-pass-my-neighbor" / Diesel Generator):**
   $$\\text{Chemical Energy (Petrol/Diesel)} \\longrightarrow \\text{Thermal/Mechanical Energy (Pistons)} \\longrightarrow \\text{Electrical Energy}$$
3. **Public Address System (Microphone & Loudspeaker):**
   $$\\text{Sound Energy} \\xrightarrow{\\text{Microphone}} \\text{Electrical Energy} \\xrightarrow{\\text{Amplifier}} \\text{Electrical Energy} \\xrightarrow{\\text{Speaker}} \\text{Sound Energy}$$
4. **Photosynthesis in Nigerian Crops (Cassava / Maize):**
   $$\\text{Radiant/Light Energy (Sun)} \\longrightarrow \\text{Chemical Potential Energy (Starch/Glucose)}$$

---

### 4. Hydroelectric Power (HEP) Generation in Nigeria

Nigeria generates a major portion of its grid electricity from Hydroelectric Power Stations situated along the River Niger and River Kaduna:
- **Kainji Dam (Niger State):** Commissioned in 1968, generating capacity $\\approx 760\\text{ MW}$.
- **Jebba Dam (Niger/Kwara State):** Commissioned in 1984, downstream from Kainji, generating capacity $\\approx 578\\text{ MW}$.
- **Shiroro Dam (Niger State):** Situated on the Kaduna River, capacity $\\approx 600\\text{ MW}$.

#### How Hydroelectric Power Works:
\`\`\`
  +------------------+
  |  WATER RESERVOIR | (High Gravitational Potential Energy: Ep = mgh)
  |      (DAM)       |
  +--------+---------+
           |
           | [Penstock Pipe]
           v (Water rushes down: Potential -> Kinetic Energy)
     +-----+-----+
     |  TURBINE  | (Kinetic Energy spins turbine blades: Mechanical Energy)
     +-----+-----+
           |
           v (Shaft drives rotor inside magnetic stator)
    +------+------+
    |  GENERATOR  | (Electromagnetic Induction: Mechanical -> Electrical Energy)
    +------+------+
           |
           v
  +--------+--------+
  |   TRANSFORMER   | (Steps up voltage for long-distance transmission)
  +--------+--------+
           |
           v
   NATIONAL TRANSMISSION GRID (To homes and industries across Nigeria)
\`\`\`

---

### 5. Renewable vs. Non-Renewable Energy Resources

| Parameter | Renewable Energy Sources | Non-Renewable Energy Sources |
| :--- | :--- | :--- |
| **Definition** | Energy from natural sources that replenish faster than they are consumed. | Finite natural resources that deplete with use and cannot be replaced within a human lifespan. |
| **Examples in Nigeria** | Solar energy (abundant in Northern Nigeria), Wind energy (Katsina wind farm), Hydroelectric (Kainji, Jebba), Biomass. | Crude oil (Petroleum), Natural gas (Bonny NLNG), Coal (Enugu coal belt). |
| **Environmental Impact** | Clean, produces zero or minimal greenhouse gas emissions. | High greenhouse gas emissions ($\\text{CO}_2$), sulfur dioxide causing acid rain, gas flaring, oil spillage. |
| **Sustainability** | Inexhaustible and environmentally sustainable. | Exhaustible; will eventually run out. |

---

### 6. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** A motorcycle of mass $150\\text{ kg}$ is traveling along the Lagos-Ibadan expressway at a speed of $20\\text{ m/s}$. Calculate its kinetic energy.  
*Solution:*  
$$E_k = \\frac{1}{2}mv^2 = \\frac{1}{2} \\times 150 \\times (20)^2 = 75 \\times 400 = 30,000\\text{ Joules (or 30 kJ)}$$

**Question 2:** Trace the complete energy transformation sequence that occurs in an electric iron plugged into a wall socket.  
*Solution:* $\\text{Electrical Energy} \\longrightarrow \\text{Thermal / Heat Energy}$.

**Question 3:** State two advantages of solar energy over diesel-powered generators for secondary schools in Nigeria.  
*Solution:*
1. Solar energy produces no air pollution or toxic exhaust fumes ($\\text{CO}$, $\\text{CO}_2$).
2. Solar energy operates silently without noise pollution and has zero recurring fuel purchase costs.`,
    keyTakeaways: [
      'The Law of Conservation of Energy dictates that energy cannot be created or destroyed, only transformed between states.',
      'Mechanical potential energy is calculated via Ep = mgh, while kinetic motion energy is calculated via Ek = 0.5 * m * v^2.',
      'Hydroelectric dams like Kainji, Jebba, and Shiroro convert water gravitational potential energy into grid electrical energy.',
      'Renewable energy sources like solar and wind produce zero greenhouse emissions compared to fossil fuels like crude oil and coal.'
    ],
    associatedQuizId: 'bece-basic-science-2025'
  },
  {
    id: 'jss3-basic-science-t2-w4',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Light Energy: Rectilinear Propagation, Reflection & Refraction',
    subtopics: [
      'Nature of Light and Rectilinear Propagation (Rays, Beams, Shadows & Eclipses)',
      'Solar Eclipse (Eclipse of the Sun) vs. Lunar Eclipse (Eclipse of the Moon)',
      'Laws of Reflection of Light (Plane Mirrors, Angle of Incidence = Angle of Reflection)',
      'Characteristics of Images Formed by a Plane Mirror (Virtual, Upright, Laterally Inverted)',
      "Refraction of Light: Optical Density, Bending Rules, Snell's Law Concept & Refractive Index",
      'Total Internal Reflection, Critical Angle, and Modern Fiber Optic Cables',
      'Dispersion of White Light Through a Glass Prism (The ROYGBIV Spectrum)',
      'Laboratory Experiment: Verification of the Law of Reflection Using Optical Pins',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 15,
    summary: 'Comprehensive analysis of optics: rectilinear propagation, shadow physics, solar/lunar eclipses, laws of reflection, image geometry in plane mirrors, refraction, critical angles, prism dispersion, pin verification lab, and BECE calculations.',
    contentMarkdown: `### 1. Rectilinear Propagation of Light

Light is a form of electromagnetic radiation that travels in **straight lines** through a homogeneous transparent medium at a speed of approximately $3 \\times 10\^8\\text{ m/s}$ in a vacuum or air. This property is known as the **rectilinear propagation of light**.

- **Light Ray:** The narrow path along which light travels, represented by a straight line with an arrow showing direction.
- **Light Beam:** A collection of light rays. Beams can be:
  - *Parallel:* Rays never meet (e.g., searchlight beam).
  - *Convergent:* Rays meet at a single focal point.
  - *Divergent:* Rays spread out from a single point source (e.g., candle flame).

#### Shadows and Eclipses
Because light travels in straight lines and cannot bend around opaque obstacles, **shadows** are formed behind opaque objects.
- **Umbra:** The central region of complete darkness where all light is blocked.
- **Penumbra:** The outer region of partial shadow where light is only partially blocked.

---

### 2. Eclipses: Solar vs. Lunar Eclipses

#### A. Solar Eclipse (Eclipse of the Sun)
Occurs during the day at **New Moon** when the **Moon passes directly between the Sun and the Earth**, casting its shadow onto the Earth:

\`\`\`
    SUN                       MOON                  EARTH
   +---+                     +----+                +------+
  /     \\                   /      \\              /  Umbra \\
 |       |                 |  Moon  |            |  (Total) |
  \\     /                   \\      /              \\ Penumbra/
   +---+                     +----+                +------+
     (Source of Light)      (Obstacle in center)   (Shadow falls here)
\`\`\`

#### B. Lunar Eclipse (Eclipse of the Moon)
Occurs at night at **Full Moon** when the **Earth passes directly between the Sun and the Moon**, casting Earth's shadow over the Moon:

\`\`\`
    SUN                      EARTH                  MOON
   +---+                    +------+               +----+
  /     \\                  /        \\             /      \\
 |       |                |  Earth   |           |  Moon  | (Enters Earth's Umbra)
  \\     /                  \\        /             \\      /
   +---+                    +------+               +----+
\`\`\`

---

### 3. Reflection of Light & Plane Mirrors

When light strikes a polished or silvered surface (such as a plane mirror), it bounces back into the same medium.

\`\`\`
          Incident Ray                  Normal                  Reflected Ray
                 \\                        |                        /
                  \\                       |                       /
                   \\     Angle of         |     Angle of         /
                    \\   Incidence (i)     |   Reflection (r)    /
                     \\                    |                    /
                      \\                   |                   /
                       \\                  |                  /
      ------------------+-----------------+-----------------+----------------- (Plane Mirror)
                                    Point of
                                    Incidence
\`\`\`

#### The Two Laws of Reflection:
1. **First Law:** The incident ray, the reflected ray, and the normal at the point of incidence all lie in the **same plane**.
2. **Second Law:** The **angle of incidence ($i$) is equal to the angle of reflection ($r$)**:
$$\\angle i = \\angle r$$

#### Characteristics of an Image Formed by a Plane Mirror:
1. **Virtual:** It cannot be captured on a screen because light rays do not actually intersect behind the mirror.
2. **Upright (Erect):** The image is oriented the same way up as the object.
3. **Same Size:** Image height equals object height (Magnification $M = 1$).
4. **Same Distance:** The distance of the image behind the mirror equals the distance of the object in front of the mirror ($u = v$).
5. **Laterally Inverted:** Left and right are reversed (e.g., raising your right hand appears as the image raising its left hand; that is why "AMBULANCE" is printed reversed on emergency vehicles).

---

### 4. Refraction of Light & Snell's Law

**Refraction** is the bending of light rays as they pass obliquely from one optical medium into another of different optical density, caused by the **change in the speed of light**.

\`\`\`
                     Incident Ray (Air - Less dense)
                            \\
                             \\     Angle of Incidence (i)
                   -----------+----------- Normal
                     AIR      |
                   ===========|================================ Surface Boundary
                    GLASS     |
                              |   Angle of Refraction (r)
                               \\
                                \\ Refracted Ray (Bends TOWARDS Normal)
\`\`\`

#### Bending Rules:
1. When light travels from a **less dense medium to a denser medium** (e.g., Air to Glass/Water), it slows down and **bends TOWARDS the normal** ($\\angle i > \\angle r$).
2. When light travels from a **denser medium to a less dense medium** (e.g., Glass/Water to Air), it speeds up and **bends AWAY FROM the normal** ($\\angle r > \\angle i$).

#### Snell's Law & Refractive Index:
The ratio of the sine of the angle of incidence to the sine of the angle of refraction is a constant known as the **Refractive Index ($n$)**:
$$n = \\frac{\\sin i}{\\sin r} = \\frac{\\text{Speed of light in vacuum/air } (c)}{\\text{Speed of light in medium } (v)}$$
For water, $n \\approx 1.33$; for crown glass, $n \\approx 1.50$; for diamond, $n \\approx 2.42$.

#### Total Internal Reflection:
When light travels from an optically denser medium toward a less dense medium at an angle of incidence greater than the **Critical Angle ($c$)**, the light does not refract into the second medium at all. Instead, **$100\\%$ of the light is reflected back** into the denser medium.
- **Application:** High-speed fiber optic broadband internet cables (transmitting data across submarine cables to Lagos at the speed of light) and medical endoscopes.

---

### 5. Dispersion of White Light Through a Triangular Prism

White light from the Sun is a composite mixture of seven spectral colors. When passed through a glass prism, each color travels at a different speed and refracts by a different amount:

\`\`\`
                             /\\
                            /  \\
     White Light           /    \\  ----------------- RED (Least bent, longest wavelength)
  ======================> /      \\ ----------------- ORANGE
                         /        \\ ----------------- YELLOW
                        /          \\ ----------------- GREEN
                       /            \\ ----------------- BLUE
                      /              \\ ----------------- INDIGO
                     /________________\\ ----------------- VIOLET (Most bent, shortest wavelength)
                        Glass Prism
\`\`\`
- **Mnemonic:** **ROYGBIV** (Red, Orange, Yellow, Green, Blue, Indigo, Violet).
- **Natural Occurrence:** The **Rainbow**, where airborne raindrops act as miniature prisms undergoing refraction, dispersion, and internal reflection.

---

### 6. Laboratory Practical: Verification of the Law of Reflection

#### Objective:
To verify that the angle of incidence equals the angle of reflection ($i = r$) using optical pins and a plane mirror.

#### Apparatus:
Drawing board, sheet of white paper, thumb tacks, plane mirror with wooden support block, optical pins (4), protractor, ruler, pencil.

#### Procedure:
1. Fasten the white paper to the drawing board using thumb tacks.
2. Draw a straight line $MM'$ across the center of the paper representing the mirror line.
3. Draw a perpendicular line $ON$ at the center of $MM'$ to serve as the **Normal**.
4. Draw an incident line making an angle $i = 30\^{\\circ}$ with the normal using a protractor.
5. Place two optical pins $P_1$ and $P_2$ vertically on this line, separated by at least $5\\text{ cm}$.
6. Place the plane mirror upright along the line $MM'$.
7. Look into the mirror from the opposite side and position two search pins $P_3$ and $P_4$ such that they appear to be in a straight line with the virtual images of $P_1$ and $P_2$.
8. Remove the pins and mirror. Circle the pinholes. Draw a line through $P_3$ and $P_4$ to meet the mirror at $O$.
9. Measure the angle of reflection $r$ with a protractor. Repeat for $i = 45\^{\\circ}$ and $i = 60\^{\\circ}$.

#### Results:
Within experimental limits, $\\angle i = \\angle r$ for every trial ($30\^{\\circ} = 30\^{\\circ}, 45\^{\\circ} = 45\^{\\circ}, 60\^{\\circ} = 60\^{\\circ}$).

---

### 7. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** A ray of light strikes a plane mirror such that the glancing angle between the incident ray and the mirror surface is $35\^{\\circ}$. Calculate the angle of reflection.  
*Solution:*  
$$\\text{Angle of incidence } (i) = 90\^{\\circ} - 35\^{\\circ} = 55\^{\\circ}$$  
By the Second Law of Reflection:  
$$\\text{Angle of reflection } (r) = \\angle i = 55\^{\\circ}$$

**Question 2:** Explain why an image seen in a plane mirror cannot be formed on a cinema screen.  
*Solution:* Because the image is **virtual**—it is formed behind the mirror where reflected rays appear to diverge from, but do not actually cross.`,
    keyTakeaways: [
      'Light exhibits rectilinear propagation in straight lines, creating shadows, solar eclipses (New Moon), and lunar eclipses (Full Moon).',
      'The two laws of reflection establish that incident ray, reflected ray, and normal lie in one plane, and angle i equals angle r.',
      'Images in plane mirrors are virtual, upright, laterally inverted, and the same size and distance behind the mirror.',
      'Total internal reflection occurs when light in a denser medium strikes an interface at an angle greater than the critical angle, enabling modern fiber optics.'
    ],
    associatedQuizId: 'bece-basic-science-2025'
  },
  {
    id: 'jss3-basic-science-t2-w5',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Human Nervous System, Reflex Actions & Sense Organs (Eye & Ear)',
    subtopics: [
      'Organization of the Nervous System: Central (CNS) vs. Peripheral (PNS)',
      'Structure of a Multipolar Motor Neuron (Dendrites, Cell Body, Axon, Myelin Sheath, Synapse)',
      'Voluntary Actions vs. Involuntary Reflex Actions',
      'The Reflex Arc Pathway (Stimulus -> Receptor -> Sensory Neuron -> Interneuron -> Motor Neuron -> Effector -> Response)',
      'Anatomy of the Human Eye: Structure, Image Formation, and Accommodation',
      'Eye Defects and Optical Corrections: Myopia (Concave Lens) and Hypermetropia (Convex Lens)',
      'Anatomy of the Human Ear: Outer, Middle, and Inner Ear Mechanisms for Hearing and Balance',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 15,
    summary: 'Detailed study of the human nervous system, motor neuron structure, reflex arc neural circuitry, anatomy and optical mechanics of the human eye and ear, corrective lenses for vision defects, and BECE examination questions.',
    contentMarkdown: `### 1. Organization of the Human Nervous System

The human nervous system coordinates bodily functions, responds to external stimuli, and maintains homeostasis. It is divided into two primary subsystems:

1. **Central Nervous System (CNS):**
   - **Brain:** The master control center located within the cranium (cerebrum for conscious thought and memory, cerebellum for balance and muscular coordination, medulla oblongata for involuntary vital functions like heartbeat and breathing).
   - **Spinal Cord:** Protected by the vertebral column; relays impulses between the brain and peripheral body parts and coordinates rapid involuntary reflex actions.
2. **Peripheral Nervous System (PNS):**
   - Consists of $12$ pairs of **cranial nerves** (emerging from the brain) and $31$ pairs of **spinal nerves** (emerging from the spinal cord).
   - Subdivided into the *Somatic Nervous System* (voluntary skeletal muscles) and *Autonomic Nervous System* (sympathetic and parasympathetic involuntary controls).

---

### 2. Structure and Types of Neurons (Nerve Cells)

The **neuron** is the basic structural and functional unit of the nervous system.

#### Structure of a Multipolar Motor Neuron:
\`\`\`
       Dendrites
       \\  |  /
      --+---+--
     /  Cell   \\
    |   Body    | ===== Nucleus
     \\ (Soma)  /
      --+---+--
        |
        | Axon hillock
        |
       === [ Myelin Sheath ] (Insulating fatty layer produced by Schwann cells)
        |  <-- Node of Ranvier (Gap speeding up impulse conduction)
       === [ Myelin Sheath ]
        |
       === [ Myelin Sheath ]
        |
       / \\
      O   O  Axon Terminals (Synaptic knobs releasing neurotransmitters)
\`\`\`

- **Dendrites:** Branch-like projections that receive electrical nerve impulses from sense organs or adjacent neurons and transmit them toward the cell body.
- **Cell Body (Soma):** Contains the nucleus and metabolic organelles.
- **Axon:** Long cylindrical fiber that conducts electrical action potentials away from the cell body toward effectors or neighboring neurons.
- **Myelin Sheath:** Fatty protective insulation that dramatically accelerates nerve impulse conduction.
- **Synapse:** Microscopic junction between two neurons where neurotransmitters (e.g., acetylcholine) chemically bridge the gap.

#### Three Types of Neurons:
1. **Sensory (Afferent) Neuron:** Transmits impulses from sensory receptors (eyes, skin, ears) to the CNS.
2. **Relay Neuron (Interneuron / Connector):** Located entirely within the brain and spinal cord; connects sensory and motor neurons.
3. **Motor (Efferent) Neuron:** Transmits impulses from the CNS to effector organs (muscles or glands) to produce an action.

---

### 3. Voluntary Actions vs. Reflex Actions & The Reflex Arc

- **Voluntary Action:** Conscious action initiated and controlled by the cerebrum of the brain (e.g., writing notes, speaking English, walking to school).
- **Reflex Action:** Fast, automatic, involuntary, and stereotyped response to an external stimulus without conscious thought, designed to protect the body from imminent harm (e.g., withdrawing hand from a hot cooking pot, blinking when dust flies into the eye, the knee-jerk reflex).

#### The Reflex Arc Pathway:
The path taken by nerve impulses in a reflex action:
$$\\text{Stimulus} \\longrightarrow \\text{Receptor} \\longrightarrow \\text{Sensory Neuron} \\longrightarrow \\text{Spinal Cord (Interneuron)} \\longrightarrow \\text{Motor Neuron} \\longrightarrow \\text{Effector (Muscle)} \\longrightarrow \\text{Response}$$

\`\`\`
  [ HOT POT ] ---> (1. Stimulus: High Heat)
         |
         v
  [ SKIN PAIN RECEPTOR ] ---> Generates nerve impulse
         |
         v
  [ SENSORY NEURON ] ---> Carries impulse through dorsal root to spinal cord
         |
         v
  [ SPINAL CORD (Interneuron / Relay) ] ---> Synapses instantly in gray matter
         |
         v
  [ MOTOR NEURON ] ---> Carries motor impulse through ventral root to arm
         |
         v
  [ BICEPS MUSCLE (Effector) ] ---> Contracts rapidly
         |
         v
  (Hand pulled away instantly - Response within 0.05 seconds!)
\`\`\`

---

### 4. Sense Organs: The Human Eye

The eye is the photoreceptor organ responsible for vision.

#### Optical Structures:
- **Cornea:** Transparent anterior curve that provides about $70\\%$ of the eye's total refractive focusing power.
- **Iris:** Colored muscular diaphragm controlling the size of the pupil.
- **Pupil:** Central aperture that expands in dim light and constricts in bright sunlight to regulate light entry.
- **Crystalline Lens:** Flexible biconvex protein lens that fine-tunes focal length through **accommodation** (controlled by ciliary muscles and suspensory ligaments).
- **Retina:** Light-sensitive inner lining containing photoreceptor cells:
  - *Rods:* Sensitive to dim light and black-and-white vision.
  - *Cones:* Sensitive to high light intensity and responsible for color vision.
- **Optic Nerve:** Transmits inverted visual impulses to the visual cortex of the brain for interpretation.

#### Common Eye Defects and Corrective Lenses:

\`\`\`
1. SHORT-SIGHTEDNESS (MYOPIA)
   Eyeball too long / lens too curved. Rays focus IN FRONT of retina.
   Light ---> [ Lens ] ---*-----> (Retina)
                          ^ Focused here (Blurry image on retina)
   CORRECTION: Diverging (Biconcave) Lens
   Light ---> ) Concave ( ---> [ Lens ] --------> (Retina - Sharp Focus)

2. LONG-SIGHTEDNESS (HYPERMETROPIA)
   Eyeball too short / lens too flat. Rays focus BEHIND retina.
   Light ---> [ Lens ] ---------> (Retina) ---> *
                                                ^ Focused behind
   CORRECTION: Converging (Biconvex) Lens
   Light ---> ( Convex ) ---> [ Lens ] --------> (Retina - Sharp Focus)
\`\`\`

---

### 5. Sense Organs: The Human Ear

The ear is responsible for two distinct sensory functions: **Hearing** and **Balance (Equilibrium)**.

- **Outer Ear:** Pinna (cartilaginous flap that collects sound waves) and External Auditory Meatus (ear canal directing waves to eardrum).
- **Middle Ear:**
  - *Tympanic Membrane (Eardrum):* Thin membrane vibrating in response to sound waves.
  - *Ear Ossicles:* Three tiny bones—**Malleus (Hammer), Incus (Anvil), and Stapes (Stirrup)**—that amplify vibrational force by about $20$ times.
  - *Eustachian Tube:* Connects middle ear to pharynx to equalize air pressure on both sides of the eardrum.
- **Inner Ear:**
  - *Cochlea:* Snail-shaped fluid-filled chamber containing the Organ of Corti with sensory hair cells converting mechanical vibrations into nerve impulses.
  - *Auditory Nerve:* Carries auditory impulses to the brain.
  - *Semicircular Canals:* Three fluid-filled loops positioned at right angles to one another, sensing head movement and maintaining bodily balance and posture.

---

### 6. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** Trace the path of an auditory sound wave from the atmosphere until it is perceived as sound in the human brain.  
*Solution:*  
$$\\text{Sound wave} \\to \\text{Pinna} \\to \\text{Auditory Canal} \\to \\text{Tympanic Membrane} \\to \\text{Ossicles (Hammer, Anvil, Stirrup)} \\to \\text{Oval Window} \\to \\text{Cochlea Fluid} \\to \\text{Organ of Corti} \\to \\text{Auditory Nerve} \\to \\text{Brain}$$

**Question 2:** A student sitting at the back of a JSS 3 classroom cannot read what is written on the chalkboard clearly, but can read her notebook without difficulty. Name her eye defect and state the type of lens needed to correct it.  
*Solution:* The defect is **Myopia (Short-sightedness)**. It is corrected using spectacles fitted with **concave (diverging) lenses**.`,
    keyTakeaways: [
      'The nervous system consists of the Central Nervous System (brain, spinal cord) and Peripheral Nervous System (cranial, spinal nerves).',
      'Neurons conduct electrical action potentials through dendrites, soma, axon, and synaptic neurotransmitter junctions.',
      'The reflex arc provides rapid involuntary protection: Stimulus -> Receptor -> Sensory Neuron -> Spinal Interneuron -> Motor Neuron -> Effector -> Response.',
      'Myopia is corrected using concave (diverging) lenses, while hypermetropia is corrected using convex (converging) lenses.'
    ],
    associatedQuizId: 'bece-basic-science-2025'
  },
  {
    id: 'jss3-basic-science-t2-w6',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Mid-Term Continuous Assessment & Diagnostic Test',
    subtopics: [
      'Comprehensive Review of Weeks 1 to 5 Syllabus Topics',
      '15 Multi-Choice BECE Diagnostic Examination Questions with Detailed Solutions',
      'Section B: 3 Structured Theory & Practical Questions with Marking Guide',
      'Error Analysis, Misconception Rectification & Score Benchmarking'
    ],
    readingTimeMinutes: 16,
    summary: 'Standardized 15-question objective diagnostic examination and 3 structured theory problems with complete marking rubric evaluating Weeks 1 to 5: atomic structure, kinetic theory, energy transformations, optics, and neurobiology.',
    contentMarkdown: `### 1. Mid-Term Assessment Overview & Examination Instructions

This continuous assessment evaluates mastery of the fundamental physical, chemical, and biological science concepts covered in Weeks 1 through 5.
- **Time Allowed:** 45 minutes
- **Structure:**
  - Section A: 15 Multi-Choice Questions (15 Marks)
  - Section B: 3 Structured Theory & Practical Questions (15 Marks)
  - Total: 30 Marks

---

### Section A: 15 BECE Objective Questions & Step-by-Step Solutions

**1.** What is the maximum number of electrons that can occupy the $L$-shell of an atom?  
A. 2  
B. 8  
C. 18  
D. 32  
*Answer:* **B (8)**. Using the formula $2n\^2$ for $n = 2$, maximum capacity is $2(2)\^2 = 8$.

**2.** The atomic number of an element with mass number 39 and 20 neutrons is:  
A. 19  
B. 20  
C. 39  
D. 59  
*Answer:* **A (19)**. $Z = A - n = 39 - 20 = 19$. The element is Potassium ($\\text{K}$).

**3.** Which of the following elements burns with a persistent golden yellow flame during a flame test?  
A. Potassium  
B. Calcium  
C. Sodium  
D. Copper  
*Answer:* **C (Sodium)**. Sodium salts produce a characteristic yellow flame.

**4.** The process whereby solid iodine changes directly into purple vapor on heating is termed:  
A. Evaporation  
B. Condensation  
C. Sublimation  
D. Liquefaction  
*Answer:* **C (Sublimation)**.

**5.** In which state of matter do particles possess the highest kinetic energy and negligible cohesive forces?  
A. Solid  
B. Liquid  
C. Gas  
D. Ice  
*Answer:* **C (Gas)**. Gas particles move at high velocities with virtually no intermolecular bonds.

**6.** A stone of mass $2\\text{ kg}$ is dropped from a cliff $20\\text{ m}$ high. Calculate its gravitational potential energy before release ($g = 10\\text{ m/s}^2$).  
A. $40\\text{ J}$  
B. $200\\text{ J}$  
C. $400\\text{ J}$  
D. $800\\text{ J}$  
*Answer:* **C ($400\\text{ J}$)**. $E_p = mgh = 2 \\times 10 \\times 20 = 400\\text{ J}$.

**7.** Energy generated at the Kainji Dam in Nigeria is derived directly from:  
A. Burning coal  
B. Flowing water  
C. Nuclear fission  
D. Crude oil  
*Answer:* **B (Flowing water)**. Kainji is a hydroelectric power station.

**8.** The image formed by a plane mirror is always:  
A. Real, inverted, and magnified  
B. Virtual, erect, and laterally inverted  
C. Real, erect, and diminished  
D. Virtual, inverted, and diminished  
*Answer:* **B (Virtual, erect, and laterally inverted)**.

**9.** If the angle between an incident ray and the normal is $40\^{\\circ}$, the angle of reflection is:  
A. $40\^{\\circ}$  
B. $50\^{\\circ}$  
C. $80\^{\\circ}$  
D. $90\^{\\circ}$  
*Answer:* **A ($40\^{\\circ}$)**. By the second law of reflection, $\\angle r = \\angle i = 40\^{\\circ}$.

**10.** Light bends when traveling from air into water because of a change in its:  
A. Frequency  
B. Speed  
C. Color  
D. Mass  
*Answer:* **B (Speed)**. Light slows down in an optically denser medium.

**11.** Which color of white light is refracted (bent) the most when passing through a triangular glass prism?  
A. Red  
B. Yellow  
C. Green  
D. Violet  
*Answer:* **D (Violet)**. Violet light has the shortest wavelength and slows down the most.

**12.** The microscopic junction across which nerve impulses pass from one neuron to another is called:  
A. Dendrite  
B. Axon  
C. Synapse  
D. Myelin  
*Answer:* **C (Synapse)**.

**13.** An involuntary, automatic, and rapid response to a painful stimulus is known as a:  
A. Voluntary action  
B. Reflex action  
C. Conscious movement  
D. Behavioral response  
*Answer:* **B (Reflex action)**.

**14.** Short-sightedness (myopia) is corrected by using spectacles fitted with:  
A. Cylindrical lenses  
B. Biconvex lenses  
C. Biconcave lenses  
D. Plane glass  
*Answer:* **C (Biconcave lenses)**. A diverging concave lens spreads light rays so they focus on the retina.

**15.** The part of the human ear responsible for maintaining balance and equilibrium is the:  
A. Cochlea  
B. Semicircular canals  
C. Tympanic membrane  
D. Eustachian tube  
*Answer:* **B (Semicircular canals)**.

---

### Section B: 3 Structured Theory & Practical Questions

#### Question 1 (Atomic Structure):
(a) Define the term **Isotope**. *(1 Mark)*  
(b) An element $Y$ has an atomic number of 12 and mass number of 24.
- State the number of protons, neutrons, and electrons. *(3 Marks)*
- Write its electron configuration and draw its Bohr-Rutherford electron shell diagram. *(2 Marks)*

*Model Solution:*  
(a) Isotopes are atoms of the same element having the same atomic number (number of protons) but different mass numbers due to a different number of neutrons in their nuclei.  
(b)
- Protons = $12$, Electrons = $12$, Neutrons = $24 - 12 = 12$.
- Electron configuration = $2, 8, 2$.
- The Bohr diagram features a central nucleus with $12p\^+$ and $12n^0$, surrounded by three concentric rings containing 2, 8, and 2 electrons respectively.

#### Question 2 (Optics & Ray Tracing):
(a) State the two Laws of Refraction of light. *(2 Marks)*  
(b) What is meant by **Critical Angle**? *(1 Mark)*  
(c) State two applications of total internal reflection in modern technology. *(2 Marks)*

*Model Solution:*  
(a)
1. The incident ray, the refracted ray, and the normal at the point of incidence all lie in the same plane.
2. The ratio of the sine of the angle of incidence to the sine of the angle of refraction is a constant for a given pair of media ($n = \\frac{\\sin i}{\\sin r}$).  
(b) The critical angle is the angle of incidence in the optically denser medium for which the angle of refraction in the less dense medium is $90\^{\\circ}$.  
(c)
1. Fiber optic telecommunication cables for high-speed internet.
2. Medical endoscopes for internal exploratory examinations.

#### Question 3 (Neurobiology & Reflex Arc):
Trace the pathway of a nerve impulse when someone accidentally steps barefoot on a sharp needle. *(4 Marks)*

*Model Solution:*  
$$\\text{Sharp Needle (Stimulus)} \\longrightarrow \\text{Pain Receptors in Sole of Foot}$$  
$$\\longrightarrow \\text{Sensory Neuron (Dorsal Root)} \\longrightarrow \\text{Spinal Cord Interneuron}$$  
$$\\longrightarrow \\text{Motor Neuron (Ventral Root)} \\longrightarrow \\text{Leg Muscles (Effector)}$$  
$$\\longrightarrow \\text{Rapid Muscle Contraction & Foot Lifted (Response)}$$`,
    keyTakeaways: [
      'Continuous diagnostic testing reinforces core BECE problem-solving in atomic physics, thermodynamics, optics, and physiology.',
      'Differentiating mass number from atomic number is fundamental to understanding isotopes and chemical reactivity.',
      'Calculating mechanical energy conversions requires systematic application of conservation principles and SI units.'
    ],
    associatedQuizId: 'bece-basic-science-2025'
  },
  {
    id: 'jss3-basic-science-t2-w7',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Reproduction in Plants and Animals (Flower Anatomy & Human Systems)',
    subtopics: [
      'Asexual vs. Sexual Reproduction in Living Organisms',
      'Morphology and Floral Anatomy of a Typical Dicotyledonous Flower (Hibiscus rosa-sinensis)',
      'Pollination Mechanisms: Self vs. Cross-Pollination; Insect vs. Wind Pollination Adaptations',
      'Fertilization, Seed Formation, and Fruit Development in Angiosperms',
      'Human Male and Female Reproductive Anatomy and Physiological Functions',
      'The Menstrual Cycle, Ovulation, Fertilization in the Oviduct, and Gestation',
      'Laboratory Practical: Floral Dissection and Examination of a Hibiscus Flower',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 15,
    summary: 'Comprehensive examination of plant and animal reproduction: floral anatomy of Hibiscus, pollination vectors, angiosperm fertilization, human reproductive organs, gametogenesis, the menstrual cycle, embryonic development, and floral dissection laboratory protocols.',
    contentMarkdown: `### 1. Modes of Reproduction

Reproduction is the biological process by which living organisms produce new individuals of their own kind, ensuring species continuity.

- **Asexual Reproduction:** Involves only one parent without the fusion of gametes. Offspring are genetically identical clones (e.g., binary fission in Amoeba, budding in yeast, vegetative propagation in cassava via stem cuttings).
- **Sexual Reproduction:** Involves two parents producing male and female haploid gametes that fuse during fertilization to form a diploid zygote, generating genetic variation.

---

### 2. Anatomy of a Flowering Plant (Hibiscus rosa-sinensis)

Flowering plants (angiosperms) utilize the flower as their specialized sexual reproductive organ.

\`\`\`
                         Stigma (Sticky surface to catch pollen)
                          \\   /
                           | |   <-- Style (Slender neck)
         Anther (Pollen)  /   \\
           [==]          |     |
             \\           |     |
          Filament       |     |
               \\________/       \\
               | Petal (Corolla) |
               |                 |
               |     [Ovary]     |  <-- Ovary (Contains Ovules)
               |     (Ovules)    |
               +--------+--------+
                     |  |  <-- Sepal (Calyx)
                     |  |
                     +--+  <-- Receptacle & Pedicel (Stalk)
\`\`\`

#### The Four Floral Whorls:
1. **Calyx (Sepals):** Outermost whorl, usually green. Protects the floral bud before opening.
2. **Corolla (Petals):** Second whorl, brightly colored and scented to attract insect pollinators.
3. **Androecium (Male Reproductive Unit - Stamen):**
   - **Anther:** Two-lobed structure producing yellow **pollen grains** (male gametes).
   - **Filament:** Slender stalk supporting the anther.
4. **Gynoecium / Pistil / Carpel (Female Reproductive Unit):**
   - **Stigma:** Sticky terminal surface that receives pollen grains.
   - **Style:** Long slender tube connecting stigma to the ovary.
   - **Ovary:** Swollen basal chamber containing **ovules** (female egg cells). After fertilization, the **ovary matures into the fruit**, while the **ovules become seeds**.

---

### 3. Pollination & Adaptations

**Pollination** is the transfer of pollen grains from a mature anther to a receptive stigma.
- **Self-Pollination:** Transfer of pollen from anther to stigma of the same flower or another flower on the same plant.
- **Cross-Pollination:** Transfer of pollen from an anther of one plant to the stigma of a flower on a different plant of the same species. Cross-pollination introduces desirable genetic variation and vigor.

| Adaptation Feature | Insect-Pollinated Flowers (e.g., *Hibiscus*, Pride of Barbados) | Wind-Pollinated Flowers (e.g., Maize, Guinea corn, Grasses) |
| :--- | :--- | :--- |
| **Petals** | Large, brightly colored, showy | Small, dull, green or absent |
| **Scent & Nectar** | Sweetly scented with sugary nectar glands | No scent, no nectar |
| **Pollen Grains** | Heavy, sticky, spiky to adhere to insect hairs | Light, smooth, powdery, produced in vast quantities |
| **Anthers** | Firmly attached inside flower | Loosely attached on long versatile filaments swinging in the breeze |
| **Stigma** | Sticky, compact, enclosed inside flower | Large, feathery, hanging outside flower to catch airborne pollen |

---

### 4. Human Reproductive Systems

#### A. Male Reproductive System:
- **Testes (Testicles):** Located outside the abdominal cavity within the **scrotum** (which maintains a temperature $2-3\^{\\circ}\\text{C}$ below body core temperature optimal for spermatogenesis). Produces **sperm cells** and the male sex hormone **testosterone**.
- **Epididymis:** Coiled tube where sperm mature and are stored.
- **Vas Deferens (Sperm Duct):** Muscular tube conducting sperm to the urethra.
- **Seminal Vesicles & Prostate Gland:** Secrete alkaline seminal fluids containing fructose and nutrients to nourish and activate sperm, creating semen.
- **Urethra & Penis:** Transmits semen and urine out of the body (never simultaneously).

#### B. Female Reproductive System:
- **Ovaries:** Two almond-shaped organs producing **ova (eggs)** and hormones (estrogen and progesterone).
- **Fallopian Tube (Oviduct):** Ciliated muscular duct connecting ovary to uterus. **Fertilization occurs in the upper third of the Fallopian tube.**
- **Uterus (Womb):** Pear-shaped muscular organ where the fertilized embryo implants and develops during the 9-month gestation period.
- **Cervix:** Muscular neck of the uterus.
- **Vagina (Birth Canal):** Muscular canal receiving the penis during intercourse and through which the baby is delivered during birth.

---

### 5. The Menstrual Cycle and Human Development

The menstrual cycle lasts approximately **28 days**:
- **Days 1–5 (Menstruation):** The uterine lining (endometrium) breaks down and is discharged through the vagina accompanied by blood due to low progesterone levels.
- **Days 6–13 (Follicular Phase):** Estrogen levels rise, causing the endometrium to thicken and repair.
- **Day 14 (Ovulation):** A mature ovum is released from the Graafian follicle into the Fallopian tube under the influence of Luteinizing Hormone (LH).
- **Days 15–28 (Luteal Phase):** The ruptured follicle becomes the *corpus luteum*, secreting progesterone to keep the endometrium thick and vascularized for possible embryo implantation. If fertilization does not occur, progesterone drops and the cycle repeats.

---

### 6. Laboratory Practical: Dissection of a Hibiscus Flower

#### Materials:
Fresh *Hibiscus rosa-sinensis* flower, scalpel or razor blade, hand lens, forceps, white tile, dissecting needle.

#### Step-by-Step Procedure:
1. Examine the intact flower. Identify the green epicalyx, calyx (sepals), and brightly colored petals.
2. Carefully strip away the sepals and petals with forceps, laying them on the white tile.
3. Observe the staminal tube surrounding the style with numerous golden anthers.
4. Using a sharp razor blade, slice the ovary longitudinally from top to bottom.
5. Use the hand lens to observe the internal chambers (locules) and white rounded ovules attached to the central placenta.

---

### 7. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** What biological structures do the ovary and ovule of a flowering plant become after successful fertilization?  
*Solution:* The **ovary becomes the fruit**, and the **ovules become seeds**.

**Question 2:** State the precise anatomical location in the human female body where fertilization takes place.  
*Solution:* In the **Fallopian tube (Oviduct)**.`,
    keyTakeaways: [
      'Flowering plants produce seeds and fruits through the gynoecium (pistil) and androecium (stamen) after pollination and fertilization.',
      'Insect-pollinated flowers have showy scented petals and sticky pollen, while wind-pollinated flowers have feathery hanging stigmas and powdery pollen.',
      'In human reproduction, fertilization occurs in the Fallopian tube (oviduct), with subsequent implantation and 9-month gestation in the uterus.',
      'The 28-day human menstrual cycle is regulated by estrogen and progesterone, with ovulation occurring on approximately Day 14.'
    ],
    associatedQuizId: 'bece-basic-science-2025'
  },
  {
    id: 'jss3-basic-science-t2-w8',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Space Science, Solar System & Nigerian Satellite Technology',
    subtopics: [
      'Components of the Solar System: The Sun and the 8 Planets in Order of Distance',
      'Terrestrial (Rocky) Planets vs. Jovian (Gas Giant) Planets',
      "Earth's Movements: Rotation (Day & Night) vs. Revolution (Seasons & Year Length)",
      'Gravitational Field, Escape Velocity, and Weightlessness in Orbit',
      'Artificial Satellites: Classification (Communication, Weather, Earth Observation, Navigation)',
      "Nigeria's Space Program (NASRDA) & Satellite Achievements (NigeriaSat-1, NigeriaSat-2, NigComSat-1R)",
      'Socio-Economic Benefits of Space Technology to Agriculture, Disaster Control & Security in Nigeria',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 14,
    summary: 'Exploration of astronomy and astrophysics: the eight solar planets, planetary classifications, orbital dynamics of rotation and revolution, satellite orbital mechanics, NASRDA history, and Nigerian space applications.',
    contentMarkdown: `### 1. The Solar System

The **Solar System** consists of the **Sun** (a medium-sized yellow dwarf star containing over $99.8\\%$ of the system's total mass) and all celestial objects bound to it by gravitational attraction: **eight planets**, their natural satellites (moons), dwarf planets (e.g., Pluto), asteroids, comets, and meteoroids.

#### The 8 Planets in Order of Increasing Distance from the Sun:
1. **Mercury:** Closest planet, smallest, no atmosphere, extreme temperature fluctuations.
2. **Venus:** "Morning/Evening star", hottest planet due to runaway greenhouse effect ($>460\^{\\circ}\\text{C}$) from thick $\\text{CO}_2$ atmosphere.
3. **Earth:** Our home planet, the only known celestial body supporting life, abundant liquid water ($71\\%$) and oxygen atmosphere.
4. **Mars:** The "Red Planet", colored by iron oxide (rust) dust, home to Olympus Mons (tallest volcano in the solar system).
5. **Jupiter:** Largest planet, gas giant, iconic Great Red Spot (massive cyclonic storm).
6. **Saturn:** Second largest, famous for its magnificent system of rings made of ice and rock particles.
7. **Uranus:** Ice giant, pale blue due to atmospheric methane, rotates on its side with extreme axial tilt ($98\^{\\circ}$).
8. **Neptune:** Furthest planet, deep blue, coldest gas giant with supersonic winds.

*Helpful Mnemonic:* **M**y **V**ery **E**ducated **M**other **J**ust **S**erved **U**s **N**oodles.

---

### 2. Terrestrial vs. Jovian Planets

| Parameter | Terrestrial (Inner) Planets | Jovian / Gas Giant (Outer) Planets |
| :--- | :--- | :--- |
| **Members** | Mercury, Venus, Earth, Mars | Jupiter, Saturn, Uranus, Neptune |
| **Composition** | Solid, rocky crust with metallic iron-nickel cores | Gaseous (Hydrogen, Helium) with liquid and icy mantles |
| **Size & Mass** | Relatively small diameters and lower masses | Enormous diameters and high masses |
| **Density** | High density ($>3.9\\text{ g/cm}^3$) | Low density ($0.7 - 1.6\\text{ g/cm}^3$) |
| **Rings & Moons** | No rings; few or no moons (Earth: 1, Mars: 2) | Extensive ring systems; numerous moons (Saturn: >140, Jupiter: >90) |

---

### 3. Earth's Movements: Rotation vs. Revolution

\`\`\`
1. ROTATION (24 Hours)                2. REVOLUTION (365.25 Days)
      Axis Tilt (23.5 deg)                        AUTUMN
           \\                                         |
          / \\                                        v
         |   | ---> Spins eastward            +-------------+
          \\ /                                 |             |
           \\                            SUMMER|    (SUN)    |WINTER
Causes: Day & Night, Sunrise in East,         |             |
Coriolis effect.                              +-------------+
                                                     ^
                                                     |
                                                   SPRING
\`\`\`

- **Rotation:** Earth spins on its tilted axis ($23.5\^{\\circ}$) from West to East once every **24 hours**. This causes the alternation of **day and night** and the apparent motion of the Sun across the sky.
- **Revolution:** Earth travels along an elliptical orbit around the Sun once every **$365\\frac{1}{4}$ days (1 year)**. The combination of Earth's axial tilt and revolution produces the **four seasons** (Spring, Summer, Autumn, Winter) or the dry and rainy seasons in Nigeria.

---

### 4. Artificial Satellites and Orbital Mechanics

An **artificial satellite** is a human-made object launched into orbit around the Earth or another celestial body by rockets.
- **Low Earth Orbit (LEO):** Altitudes between $160-2000\\text{ km}$ (used for Earth observation and remote sensing).
- **Geostationary Orbit (GEO):** Altitude $\\approx 35,786\\text{ km}$ above the equator. The satellite orbits at the exact rotational speed of the Earth ($24\\text{ hours}$), remaining permanently fixed over the same geographical coordinate. Crucial for communications and weather monitoring.

\`\`\`
             GEOSTATIONARY SATELLITE (Altitude: 35,786 km)
                         [ == NIGCOMSAT-1R == ]
                               /       \\
             Uplink Signal    /         \\   Downlink Signal
            (e.g., from Abuja)           \\ (Broadcast across West Africa)
                            /             \\
                           v               v
                     +-----------+   +-----------+
                     | Ground Stn|   | TV / Phone|
                     +-----------+   +-----------+
\`\`\`

---

### 5. Nigeria's Space Program (NASRDA)

The **National Space Research and Development Agency (NASRDA)** was established in 1999 with headquarters in Abuja.

#### Major Nigerian Satellites Launched:
1. **NigeriaSat-1 (Launched 2003):** Nigeria's first satellite; a low-Earth orbit disaster monitoring satellite. Provided critical satellite imagery during Hurricane Katrina and tsunami relief efforts.
2. **NigComSat-1 (2007) & NigComSat-1R (2011):** High-power geostationary communications satellites providing broadband connectivity, GSM backhaul, and digital television broadcast services across Nigeria and West Africa.
3. **NigeriaSat-2 & NigeriaSat-X (2011):** Advanced Earth observation satellites built to provide high-resolution imagery ($2.5\\text{ m}$ panchromatic) for mapping, agriculture, and security.

#### Socio-Economic Benefits to Nigeria:
- **Agriculture & Crop Yield Forecasting:** Monitoring soil moisture and vegetation health across the savannah and rainforest belts.
- **Flood Disaster Monitoring:** Tracking seasonal floods along the River Niger and River Benue to evacuate vulnerable communities.
- **National Security & Border Surveillance:** High-resolution mapping aiding security operations against banditry and insurgency in remote areas.

---

### 6. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** Name the hottest planet in the Solar System and explain why it is hotter than Mercury despite being farther from the Sun.  
*Solution:* **Venus**. It is covered by a dense, thick atmosphere of carbon dioxide ($96\\%$) that traps solar heat via an extreme runaway greenhouse effect.

**Question 2:** Distinguish between Earth's rotation and revolution in terms of time duration and physical consequence.  
*Solution:*
- Rotation takes **24 hours** and causes **day and night**.
- Revolution takes **$365\\frac{1}{4}$ days** and causes the **cycle of seasons**.`,
    keyTakeaways: [
      'The Solar System consists of the Sun and 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.',
      'Earth rotation takes 24 hours causing day and night, while Earth revolution takes 365.25 days producing seasons.',
      'Geostationary satellites like NigComSat-1R orbit at 35,786 km matching Earth rotation for seamless communications across West Africa.',
      'NigeriaSat-2 and earth observation satellites provide vital agricultural yield mapping, disaster relief tracking, and border security.'
    ],
    associatedQuizId: 'bece-basic-science-2025'
  },
  {
    id: 'jss3-basic-science-t2-w9',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Environmental Pollution, Degradation & Waste Management',
    subtopics: [
      'Definition of Environmental Pollution and Classification of Pollutants',
      'Air Pollution: Sources (Exhaust, Industrial Effluents, Bush Burning), Acid Rain & Greenhouse Effect',
      'Water Pollution: Industrial Discharges, Sewage, Agricultural Runoff, Eutrophication & Niger Delta Oil Spills',
      'Soil and Land Pollution: Non-Biodegradable Plastics, Heavy Metals & Open Dumping',
      'Noise Pollution: Sources and Health Impacts (Auditory Damage, Hypertension)',
      'Modern Waste Management Hierarchy: The 3Rs (Reduce, Reuse, Recycle) & Sanitary Landfills',
      'Remediation of Degraded Environments in Nigeria (The Ogoni Cleanup Initiative)',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 14,
    summary: 'Comprehensive examination of pollution: air, water, soil, and noise contamination; acid rain chemistry, greenhouse gases, Niger Delta crude oil remediation, solid waste management hierarchies, and environmental sanitation laws in Nigeria.',
    contentMarkdown: `### 1. Environmental Pollution & Pollutants

**Environmental pollution** is the release of toxic, harmful, or undesirable substances or energy into the natural environment in concentrations that cause harm to living organisms, ecosystems, or human health.
A **pollutant** is any substance or agent causing pollution (e.g., carbon monoxide, non-biodegradable polythene bags, heavy metal ions, excess noise).

---

### 2. Air Pollution, Acid Rain & Global Warming

#### Sources and Major Air Pollutants:
- **Carbon Monoxide (CO):** Colorless, odorless gas formed from incomplete combustion of fossil fuels (generators, car exhausts). It binds irreversibly with blood hemoglobin to form **carboxyhemoglobin**, starving the brain and organs of oxygen and causing fatal asphyxiation.
- **Sulfur Dioxide ($\\text{SO}_2$) and Nitrogen Oxides ($\\text{NO}_x$):** Released from coal combustion and oil refining. They dissolve in atmospheric cloud droplets to form **Acid Rain**:
$$\\text{SO}_2 + \\text{H}_2\\text{O} \\longrightarrow \\text{H}_2\\text{SO}_3 \\quad \\xrightarrow{\\text{Oxidation}} \\quad \\text{H}_2\\text{SO}_4 \\text{ (Sulfuric Acid)}$$
*Consequences of Acid Rain:* Leaches essential minerals from Nigerian soils, corrodes metal roofing sheets, and kills freshwater fish in rivers.
- **Chlorofluorocarbons (CFCs):** Emitted from older aerosol cans and refrigerants; break down the stratospheric **ozone layer ($O_3$)**, allowing dangerous UV rays to reach Earth and cause skin cancers.
- **Greenhouse Gases ($\\text{CO}_2, \\text{CH}_4$):** Trap infrared heat radiation in the atmosphere, leading to **Global Warming** and severe climatic changes.

---

### 3. Water Pollution & Aquatic Degradation

\`\`\`
   AGRICULTURAL RUNOFF              DOMESTIC SEWAGE              INDUSTRIAL / OIL SPILL
 (Fertilizers & Pesticides)      (Organic Waste & Detergents)   (Crude Oil / Heavy Metals)
             \\                               |                               /
              \\                              |                              /
               v                             v                             v
           +-------------------------------------------------------------------+
           |                     RIVER / STREAM ECOSYSTEM                      |
           +-------------------------------------------------------------------+
                                             |
                                             v
                           EUTROPHICATION & ALGAL BLOOM
                 (Excess Nitrates & Phosphates cause thick algal layer)
                                             |
                                             v
                        ALGAE DIE & BACTERIAL DECOMPOSITION
               (Bacteria consume dissolved oxygen: High Biochemical Oxygen Demand)
                                             |
                                             v
                         MASSIVE FISH KILLS & HYPOXIC DEAD ZONES
\`\`\`

#### Crude Oil Spills in the Niger Delta:
Nigeria's oil-producing regions (Delta, Rivers, Bayelsa, Akwa Ibom) face severe water pollution caused by pipeline sabotage, equipment corrosion, and oil bunkering.
- *Ecological Impact:* Crude oil forms an impermeable blanket on water surfaces, preventing atmospheric oxygen diffusion, coating mangrove roots, destroying fishing livelihoods, and poisoning drinking water wells.
- *Remediation Strategy (Ogoni Cleanup):* **Bioremediation** using indigenous oil-eating bacteria (*Pseudomonas* species) and chemical surfactants to digest hydrocarbons into harmless water and carbon dioxide.

---

### 4. Soil Pollution & Solid Waste Management

#### Classification of Solid Wastes:
1. **Biodegradable Waste:** Organic matter that can be naturally decomposed by bacteria and fungi into harmless humus (e.g., yam peels, paper, vegetable refuse, animal dung).
2. **Non-Biodegradable Waste:** Synthetic materials that resist natural biological decomposition, persisting in the environment for centuries (e.g., single-use polythene bags, plastic bottles, glass, metal cans, electronic waste).

#### The 3Rs Waste Management Hierarchy:
\`\`\`
       +------------------------------------+
       |          1. REDUCE (Top)           |  <-- Most Environmentally Preferable
       | (Minimize consumption and waste)   |
       +------------------------------------+
       |          2. REUSE                  |
       | (Use items multiple times)         |
       +------------------------------------+
       |          3. RECYCLE                |
       | (Reprocess plastic, metal, glass)  |
       +------------------------------------+
       |      4. COMPOSTING & RECOVERY      |
       | (Convert organic matter to manure) |
       +------------------------------------+
       |    5. SANITARY LANDFILL (Bottom)   |  <-- Least Preferable
       +------------------------------------+
\`\`\`

---

### 5. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** Explain why running a petrol generator inside an enclosed, unventilated room overnight in Nigeria frequently results in death.  
*Solution:* The generator consumes room oxygen and emits **carbon monoxide ($\\text{CO}$)** due to incomplete combustion. Carbon monoxide binds strongly to blood hemoglobin, forming **carboxyhemoglobin**, preventing oxygen transport to the brain and leading to silent, painless suffocation and death.

**Question 2:** Describe the sequence of events leading to fish deaths during the process of eutrophication in a freshwater stream.  
*Solution:*
1. Runoff containing agricultural fertilizers (nitrates and phosphates) enters the water.
2. Rapid proliferation of algae occurs (**algal bloom**), blocking sunlight.
3. As algae die, decomposing bacteria multiply and consume dissolved oxygen.
4. Water becomes **hypoxic (oxygen-depleted)**, causing aquatic organisms and fish to suffocate and die.`,
    keyTakeaways: [
      'Carbon monoxide binds irreversibly to hemoglobin forming carboxyhemoglobin, causing silent fatal asphyxiation.',
      'Acid rain forms when sulfur dioxide and nitrogen oxides dissolve in rain droplets, acidifying soils and aquatic habitats.',
      'Eutrophication occurs when excess fertilizer runoff triggers algal blooms that deplete dissolved oxygen, causing widespread fish death.',
      'The 3Rs hierarchy (Reduce, Reuse, Recycle) provides the primary sustainable framework for managing solid non-biodegradable waste.'
    ],
    associatedQuizId: 'bece-basic-science-2025'
  },
  {
    id: 'jss3-basic-science-t2-w10',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Terminal Revision, Laboratory Safety Clinic & Apparatus Identification',
    subtopics: [
      'Comprehensive Term 2 Synthesis: Physics, Chemistry & Biology Cross-Disciplinary Review',
      'Laboratory Apparatus Identification, Calibration & Operational Precautions',
      'Globally Harmonized System (GHS) Hazard Warning Symbols & Interpretation',
      'Emergency First Aid Protocols for Laboratory Accidents (Acid Spills, Thermal Burns, Inhalation)',
      'Mastery Checkpoint: BECE Practical Drawing & Calculation Clinic'
    ],
    readingTimeMinutes: 14,
    summary: 'Comprehensive terminal synthesis linking physical, chemical, and biological sciences; laboratory apparatus nomenclature; chemical hazard pictograms; laboratory first-aid procedures; and BECE practical drawing conventions.',
    contentMarkdown: `### 1. Terminal Curriculum Synthesis

During Second Term, we have studied the physical, chemical, and biological laws governing our natural environment:
- **Chemical Architecture (Weeks 1–2):** All physical substances consist of atoms composed of protons, neutrons, and electrons. Particle kinetic energy dictates states of matter and phase changes.
- **Physical Dynamics (Weeks 3–4):** Energy cannot be created or destroyed, only transformed. Light travels rectilinearly, reflecting and refracting to create images.
- **Biological Systems (Weeks 5, 7):** Multicellular organisms maintain coordination via nervous and reflex pathways and perpetuate their species through sexual reproduction.
- **Earth & Environment (Weeks 8–9):** Our planetary position in the solar system dictates climate, while modern industrial pollution threatens ecological sustainability, requiring scientific waste management.

---

### 2. Standard Laboratory Apparatus Identification

\`\`\`
   BEAKER              CONICAL FLASK         MEASURING CYLINDER        BUNSEN BURNER
  |        |              /      \\                |   |                (Barrel)
  |        |             /        \\               |---|                 ||
  |________|            /__________\\              |   |                 ||  (Air Hole)
                                                  |---|                ====
  General mixing       Titration swirl           Precise liquid       Non-luminous
  & heating            without splashing         volume measurement   heating source
\`\`\`

1. **Beaker:** Cylindrical glass container with a pouring lip; used for holding, mixing, and roughly estimating liquids.
2. **Conical Flask (Erlenmeyer Flask):** Flat base and tapered neck; ideal for swirling liquids during chemical titrations without spilling.
3. **Measuring Cylinder:** Narrow cylindrical vessel with graduated markings; used for measuring liquid volumes accurately.
4. **Burette & Pipette:** High-precision volumetric instruments used in quantitative acid-base titrations.
5. **Retort Stand & Clamp:** Heavy iron base and vertical rod supporting apparatus during filtration and heating experiments.
6. **Bunsen Burner:** Gas burner providing hot, adjustable non-luminous blue flame for chemical heating.

---

### 3. Hazard Warning Symbols & Meanings

\`\`\`
     [ TOXIC / POISON ]             [ CORROSIVE ]             [ FLAMMABLE ]
         _______                       ______                    /\\
        /       \\                     |  ||  |                  /  \\
       |  (o o)  |                    |  ||  |                 / /\\ \\
        \\   ^   /                      \\====/                 / /  \\ \\
         | === |                     Acid burning              Flame icon:
        Skull & Bones               skin & metal             Catches fire easily
\`\`\`

| Symbol | Hazard Classification | Meaning & Laboratory Safety Rules |
| :--- | :--- | :--- |
| **Skull and Crossbones** | **Toxic / Poisonous** | Ingestion, inhalation, or skin absorption can cause death or organ damage. Work in a fume cupboard. |
| **Corrosive Substance** | **Corrosive** | Attacks and destroys living tissue and corrodes metals. Wear protective nitrile gloves and goggles. |
| **Open Flame Icon** | **Highly Flammable** | Readily ignites at room temperature. Keep away from Bunsen flames and sparks. |
| **Exploding Bomb** | **Explosive** | Unstable substance liable to detonate under heat or shock. |
| **Flame over Circle** | **Oxidizing Agent** | Releases oxygen and intensifies combustion in other materials. |

---

### 4. First Aid Protocols for Laboratory Accidents

1. **Acid Spill on Skin or Clothing:** Immediately flush the affected area with large quantities of running cold water for at least $15\\text{ minutes}$. For acid spills, neutralize with dilute Sodium Bicarbonate (baking soda); for alkali spills, neutralize with dilute acetic acid (vinegar).
2. **Chemical Splash in Eyes:** Immediately use the eye-wash fountain or flush open eyes with clean running water continuously for $15\\text{ minutes}$, rolling the eyeballs. Seek medical attention immediately.
3. **Minor Thermal Burn:** Hold burned area under cold running tap water for $10-15\\text{ minutes}$ to stop thermal tissue damage. Do not apply butter or petroleum jelly.
4. **Chemical Inhalation:** Remove victim immediately to fresh air in an open space, loosen tight clothing around the neck, and seek medical assistance.

---

### 5. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** Why should water **never** be poured directly into concentrated sulfuric acid when preparing dilute solutions in the school laboratory?  
*Solution:* The dilution of concentrated $\\text{H}_2\\text{SO}_4$ is **extremely exothermic**. Pouring water into concentrated acid causes localized boiling, producing violent acid splattering onto hands and face. The safe rule is to **always add acid slowly down the side of a beaker of water with constant stirring** ("*Do as you oughter, add acid to water*").

**Question 2:** State the function of the air-hole on a Bunsen burner.  
*Solution:* Adjusting the air-hole controls oxygen intake. When open, complete combustion produces a **hot, non-luminous blue flame**; when closed, incomplete combustion produces a **cooler, luminous yellow flame that deposits soot**.`,
    keyTakeaways: [
      'Laboratory safety requires knowing apparatus functions, never pouring water into concentrated acid, and wearing PPE.',
      'GHS chemical hazard symbols denote specific dangers including toxicity, corrosiveness, flammability, and oxidation.',
      'First aid for laboratory chemical burns mandates immediate continuous flushing with cold water for 15 minutes.'
    ],
    associatedQuizId: 'bece-basic-science-2025'
  },
  {
    id: 'jss3-basic-science-t2-w11-12',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Termly Examination & Mock BECE Simulation',
    subtopics: [
      'Complete Second Term Syllabus Evaluation (Weeks 1 to 10)',
      '20 Comprehensive Multi-Choice BECE Examination Questions with Full Rationale',
      'Section B: 4 Extended Essay & Calculation Problems with Marking Rubrics',
      'Final BECE Examination Readiness and Score Interpretation'
    ],
    readingTimeMinutes: 18,
    summary: 'Comprehensive mock BECE terminal examination consisting of 20 multiple-choice questions with full pedagogical rationale and 4 extended essay problems covering the entire JSS 3 2nd term Basic Science curriculum.',
    contentMarkdown: `### 1. Mock BECE Examination Instructions

- **Time Allowed:** 1 hour 30 minutes
- **Structure:**
  - Section A: 20 Objective Multi-Choice Questions (40 Marks)
  - Section B: 4 Structured Essay & Calculation Questions (40 Marks)
  - Continuous Assessment Score: (20 Marks)
  - Total: 100 Marks

---

### Section A: 20 BECE Multi-Choice Objective Questions

**1.** An electrically neutral atom contains 11 protons and 12 neutrons. How many electrons does it have?  
A. 1  
B. 11  
C. 12  
D. 23  
*Rationale:* **B (11)**. In an electrically neutral atom, the number of electrons equals the number of protons ($e = p = 11$).

**2.** The electronic configuration of an element with atomic number 17 is:  
A. $2, 7, 8$  
B. $2, 8, 7$  
C. $2, 8, 8$  
D. $7, 8, 2$  
*Rationale:* **B ($2, 8, 7$)**. The $K$-shell holds 2, $L$-shell holds 8, leaving 7 valence electrons in the $M$-shell (Chlorine).

**3.** Which of the following pairs of particles are found within the atomic nucleus?  
A. Electrons and protons  
B. Protons and neutrons  
C. Electrons and neutrons  
D. Protons and photons  
*Rationale:* **B (Protons and neutrons)**.

**4.** The direct conversion of solid camphor or mothballs into gas on exposure to air is called:  
A. Evaporation  
B. Sublimation  
C. Condensation  
D. Liquefaction  
*Rationale:* **B (Sublimation)**.

**5.** A car of mass $800\\text{ kg}$ is traveling at a speed of $10\\text{ m/s}$. Its kinetic energy is:  
A. $4,000\\text{ J}$  
B. $8,000\\text{ J}$  
C. $40,000\\text{ J}$  
D. $80,000\\text{ J}$  
*Rationale:* **C ($40,000\\text{ J}$)**. $E_k = \\frac{1}{2}mv^2 = \\frac{1}{2} \\times 800 \\times 10^2 = 400 \\times 100 = 40,000\\text{ J}$.

**6.** Which of the following is an example of a renewable energy resource in Nigeria?  
A. Coal in Enugu  
B. Crude oil in Delta State  
C. Solar radiation in Kano  
D. Natural gas in Bonny  
*Rationale:* **C (Solar radiation in Kano)**. Solar energy replenishes naturally.

**7.** A ray of light hits a plane mirror at an angle of incidence of $25\^{\\circ}$. What is the total angle between the incident ray and reflected ray?  
A. $25\^{\\circ}$  
B. $50\^{\\circ}$  
C. $65\^{\\circ}$  
D. $90\^{\\circ}$  
*Rationale:* **B ($50\^{\\circ}$)**. Angle between rays $= i + r = 25\^{\\circ} + 25\^{\\circ} = 50\^{\\circ}$.

**8.** What causes the refraction of light when it passes from air into water?  
A. Change in the color of light  
B. Change in the speed of light  
C. Loss of light energy  
D. Reflection from water molecules  
*Rationale:* **B (Change in the speed of light)**. Light slows down in water.

**9.** The separation of white sunlight into its constituent rainbow colors by a triangular glass prism is called:  
A. Reflection  
B. Interference  
C. Dispersion  
D. Polarization  
*Rationale:* **C (Dispersion)**.

**10.** Which part of a neuron transmits electrical impulses away from the cell body toward an effector?  
A. Dendrite  
B. Axon  
C. Nucleus  
D. Myelin node  
*Rationale:* **B (Axon)**.

**11.** The correct sequence of the reflex arc pathway is:  
A. Receptor $\\to$ Sensory neuron $\\to$ Interneuron $\\to$ Motor neuron $\\to$ Effector  
B. Effector $\\to$ Motor neuron $\\to$ Interneuron $\\to$ Sensory neuron $\\to$ Receptor  
C. Receptor $\\to$ Motor neuron $\\to$ Interneuron $\\to$ Sensory neuron $\\to$ Effector  
D. Sensory neuron $\\to$ Receptor $\\to$ Effector $\\to$ Motor neuron  
*Rationale:* **A**.

**12.** Short-sightedness is an optical defect where light rays from a distant object are brought to a focus:  
A. Behind the retina  
B. In front of the retina  
C. On the blind spot  
D. On the cornea  
*Rationale:* **B (In front of the retina)**. Corrected using a concave lens.

**13.** The female reproductive part of a flower consisting of stigma, style, and ovary is collectively known as the:  
A. Stamen  
B. Calyx  
C. Pistil or Gynoecium  
D. Corolla  
*Rationale:* **C (Pistil or Gynoecium)**.

**14.** In human females, fertilization of the ovum by a sperm cell normally takes place in the:  
A. Uterus  
B. Ovary  
C. Fallopian tube (Oviduct)  
D. Cervix  
*Rationale:* **C (Fallopian tube)**.

**15.** The planet closest to the Sun in the solar system is:  
A. Venus  
B. Mars  
C. Mercury  
D. Earth  
*Rationale:* **C (Mercury)**.

**16.** What celestial phenomenon occurs when the Moon passes directly between the Sun and the Earth?  
A. Lunar eclipse  
B. Solar eclipse  
C. Solstice  
D. Aurora  
*Rationale:* **B (Solar eclipse)**.

**17.** NigComSat-1R is an example of a:  
A. Low-Earth orbit spy satellite  
B. Geostationary communications satellite  
C. Space station module  
D. Deep space planetary probe  
*Rationale:* **B (Geostationary communications satellite)**.

**18.** The toxic gas produced by incomplete combustion in electric generators that binds irreversibly to blood hemoglobin is:  
A. Carbon dioxide  
B. Sulfur dioxide  
C. Carbon monoxide  
D. Nitrogen oxide  
*Rationale:* **C (Carbon monoxide - CO)**.

**19.** Non-biodegradable domestic waste includes:  
A. Cassava peels  
B. Rotten oranges  
C. Polythene nylon bags  
D. Dry leaves  
*Rationale:* **C (Polythene nylon bags)**.

**20.** When diluting concentrated acid in the laboratory, the safe rule is:  
A. Pour water rapidly into acid  
B. Pour acid slowly into water with constant stirring  
C. Mix equal volumes in a closed container  
D. Heat both liquids before mixing  
*Rationale:* **B**.

---

### Section B: 4 Extended Essay & Calculation Questions

#### Question 1 (Atomic Physics & Chemistry):
(a) Define the terms:
1. Mass number *(1 Mark)*
2. Isotopes *(1 Mark)*  
(b) An atom of element $Q$ has 16 protons and 16 neutrons.
1. State its atomic number and mass number. *(2 Marks)*
2. Write its electron configuration and state the number of valence electrons. *(2 Marks)*
3. Identify element $Q$. *(1 Mark)*  
(c) State two practical uses of radioactive isotopes in medicine or agriculture. *(3 Marks)*

*Model Answer:*  
(a)
1. Mass number is the total number of protons and neutrons in the nucleus of an atom ($A = p + n$).
2. Isotopes are atoms of the same element having the same atomic number but different mass numbers due to a difference in neutron count.  
(b)
1. Atomic number ($Z$) = $16$; Mass number ($A$) = $16 + 16 = 32$.
2. Configuration = $2, 8, 6$. Number of valence electrons = $6$.
3. Element $Q$ is **Sulfur ($\\text{S}$)**.  
(c)
1. Medical: Cobalt-60 radiation used in cancer therapy to kill malignant tumor cells.
2. Agricultural: Radioactive phosphorus-32 tracers used to study plant uptake of fertilizer from soil.

#### Question 2 (Energy Calculations & Dam Engineering):
(a) State the Law of Conservation of Energy. *(2 Marks)*  
(b) A crate of science apparatus weighing $20\\text{ kg}$ is lifted vertically through a height of $5\\text{ meters}$ onto a laboratory table in $4\\text{ seconds}$. ($g = 10\\text{ m/s}^2$). Calculate:
1. The gravitational potential energy gained by the crate. *(3 Marks)*
2. The work done in lifting the crate. *(2 Marks)*
3. The power developed. *(3 Marks)*

*Model Answer:*  
(a) Energy can neither be created nor destroyed, but can only be transformed from one form to another.  
(b)
1. $E_p = mgh = 20\\text{ kg} \\times 10\\text{ m/s}^2 \\times 5\\text{ m} = 1000\\text{ Joules (J)}$.
2. $\\text{Work Done} = \\text{Force} \\times \\text{Distance} = (mg) \\times h = 200\\text{ N} \\times 5\\text{ m} = 1000\\text{ Joules}$.
3. $\\text{Power} = \\frac{\\text{Work Done}}{\\text{Time}} = \\frac{1000\\text{ J}}{4\\text{ s}} = 250\\text{ Watts (W)}$.

#### Question 3 (Optics & Ray Tracing):
(a) State the two Laws of Reflection of light. *(2 Marks)*  
(b) Draw a clearly labeled ray diagram showing the reflection of a light ray from a plane mirror, indicating the incident ray, reflected ray, normal, angle of incidence ($i$), and angle of reflection ($r$). *(4 Marks)*  
(c) List four distinct characteristics of the image formed by a plane mirror. *(4 Marks)*

*Model Answer:*  
(a)
1. The incident ray, the reflected ray, and the normal at the point of incidence all lie in the same plane.
2. The angle of incidence equals the angle of reflection ($i = r$).  
(b) Diagram must show: flat mirror line, normal dashed at $90\^{\\circ}$, incident ray with downward arrow, reflected ray with upward arrow, labeled angles $i$ and $r$ with $\\angle i = \\angle r$.  
(c)
1. Virtual (cannot be formed on a screen).
2. Upright / Erect.
3. Laterally inverted (left and right reversed).
4. Same size as the object with image distance behind mirror equal to object distance in front.

#### Question 4 (Human Physiology & Reproduction):
(a) Draw a labeled block diagram showing the pathway of a reflex arc from stimulus to response. *(4 Marks)*  
(b) Distinguish between voluntary actions and reflex actions, providing two examples of each. *(4 Marks)*  
(c) Name the organ in the female reproductive tract where:
1. Ova are produced. *(1 Mark)*
2. Fertilization takes place. *(1 Mark)*

*Model Answer:*  
(a) $\\text{Stimulus} \\to \\text{Receptor (Sense Organ)} \\to \\text{Sensory Neuron} \\to \\text{Spinal Cord Interneuron} \\to \\text{Motor Neuron} \\to \\text{Effector (Muscle)} \\to \\text{Response}$.  
(b)
- Voluntary actions: Consciously initiated and controlled by the cerebrum (e.g., reading a textbook, kicking a football).
- Reflex actions: Involuntary, automatic, and rapid responses mediated through the spinal cord without prior conscious thought (e.g., withdrawal of hand from hot surface, blinking in response to sudden bright light).  
(c)
1. Ova production: **Ovary**.
2. Fertilization: **Fallopian tube (Oviduct)**.`,
    keyTakeaways: [
      'Mastering BECE Basic Science requires integrating physics, chemistry, biology, earth science, and environmental stewardship.',
      'Rigorous practice with objective questions and structured theory essays builds speed, precision, and confidence.',
      'All calculations must show formulas, step-by-step substitutions, and correct scientific SI units.'
    ],
    associatedQuizId: 'bece-basic-science-2025'
  }
];
