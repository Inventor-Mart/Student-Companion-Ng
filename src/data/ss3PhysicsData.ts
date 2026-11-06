import { CurriculumTopic } from '../types';

export const SS3_PHYSICS_TOPICS: CurriculumTopic[] = [
  // ==========================================
  // WEEK 1: ALTERNATING CURRENT (AC) CIRCUITS I
  // ==========================================
  {
    id: 'phy-ss3-term2-week1',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Alternating Current (AC) Circuits I: Sinusoidal Waves, Peak vs. R.M.S. Values & Single Components',
    subtopics: [
      'Generation of Alternating EMF: Rotating Coil in Uniform Magnetic Field',
      'Sinusoidal Wave Parameters: Peak (V0, I0), Instantaneous (v, i), and Frequency (f)',
      'Mathematical Derivation of Root-Mean-Square (r.m.s.) Values: Vrms = V0 / √2 and Irms = I0 / √2',
      'AC Behavior in Pure Resistive, Pure Inductive, and Pure Capacitive Circuits'
    ],
    readingTimeMinutes: 9,
    summary: 'Analyze alternating voltage generation, calculate peak and root-mean-square quantities, and evaluate phase relationships in pure resistive, inductive, and capacitive AC circuits.',
    contentMarkdown: `### 1. Generation of Alternating Current

An **alternating current (AC)** is an electric current whose magnitude and direction reverse cyclically at regular time intervals. It is generated when a rectangular conducting coil of $N$ turns and area $A$ rotates with uniform angular velocity $\\omega$ in a uniform magnetic field $B$:

$$\\varepsilon(t) = V_0 \\sin(\\omega t) = V_0 \\sin(2\\pi f t)$$

Where:
- $V_0 = NAB\\omega$ is the **peak (maximum) voltage**.
- $\\omega = 2\\pi f = \\frac{2\\pi}{T}$ is the **angular frequency** in $\\text{rad/s}$.
- $f$ is the frequency in $\\text{Hertz}$ (in Nigeria, the national grid frequency is standardized at $50\\text{ Hz}$).

---

### 2. Peak versus Root-Mean-Square (r.m.s.) Values

Because the instantaneous value of a sinusoidal wave averages to zero over a complete cycle, AC heating power cannot be evaluated using simple arithmetic means.

The **root-mean-square (r.m.s.) value** of an alternating current is defined as the value of steady direct current (DC) that would dissipate heat at the exact same rate in a given resistor:

$$P_{\\text{average}} = I_{\\text{rms}}^2 R = \\frac{1}{2} I_0^2 R \\implies I_{\\text{rms}} = \\frac{I_0}{\\sqrt{2}} \\approx 0.707\\, I_0$$

$$V_{\\text{rms}} = \\frac{V_0}{\\sqrt{2}} \\approx 0.707\\, V_0$$

*Important WAEC Measurement Rule:* Standard AC measuring instruments (such as moving-iron ammeters, hot-wire ammeters, and digital multimeters) **always calibrate and display r.m.s. values**, never peak values!

---

### 3. Single Component AC Circuits & Phase Relations

| Component | Circuit Schematic | Voltage-Current Relationship | Opposition / Reactance | Phase Relationship | Phasor Representation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Pure Resistor ($R$)** | AC source connected across resistor $R$ | $v = V_0 \\sin(\\omega t)$<br>$i = I_0 \\sin(\\omega t)$ | Resistance: $R$ (in $\\Omega$, independent of frequency) | Voltage and current are **in phase** ($\\phi = 0^\\circ$) | Phasors for $V_R$ and $I$ point in the exact same direction |
| **Pure Inductor ($L$)** | AC source across pure inductance coil $L$ | $v = V_0 \\sin(\\omega t)$<br>$i = I_0 \\sin(\\omega t - \\frac{\\pi}{2})$ | **Inductive Reactance:**<br>$X_L = 2\\pi f L = \\omega L$ (in $\\Omega$) | Voltage **leads** current by $90^\\circ$ ($\\frac{\\pi}{2}\\text{ rad}$) | Phasor $V_L$ points $90^\\circ$ vertically upwards ahead of $I$ |
| **Pure Capacitor ($C$)** | AC source across capacitor $C$ | $v = V_0 \\sin(\\omega t)$<br>$i = I_0 \\sin(\\omega t + \\frac{\\pi}{2})$ | **Capacitive Reactance:**<br>$X_C = \\frac{1}{2\\pi f C} = \\frac{1}{\\omega C}$ (in $\\Omega$) | Current **leads** voltage by $90^\\circ$ (voltage lags current by $90^\\circ$) | Phasor $V_C$ points $90^\\circ$ vertically downwards behind $I$ |

---

### 4. Worked WAEC Examination Drill

**Question:** An alternating supply connected to a domestic electrical mains in Abuja is labeled as $240\\text{ V}$, $50\\text{ Hz}$.
1. Determine the peak voltage ($V_0$) of the mains supply.
2. If an electric kettle of resistance $48\\,\\Omega$ is connected to this supply, calculate the r.m.s. current, peak current, and average electrical power dissipated.

**Solution:**
1. **Peak Voltage ($V_0$):**
   $$V_{\\text{rms}} = 240\\text{ V}$$
   $$V_0 = V_{\\text{rms}} \\times \\sqrt{2} = 240 \\times 1.414 = 339.4\\text{ V} \\approx 340\\text{ V}$$
2. **Currents & Power:**
   - **R.M.S. Current:**
     $$I_{\\text{rms}} = \\frac{V_{\\text{rms}}}{R} = \\frac{240\\text{ V}}{48\\,\\Omega} = 5.0\\text{ A}$$
   - **Peak Current:**
     $$I_0 = I_{\\text{rms}} \\times \\sqrt{2} = 5.0 \\times 1.414 = 7.07\\text{ A}$$
   - **Average Power Dissipated:**
     $$P_{\\text{average}} = V_{\\text{rms}} \\times I_{\\text{rms}} = 240\\text{ V} \\times 5.0\\text{ A} = 1200\\text{ W} = 1.2\\text{ kW}$$`,
    keyTakeaways: [
      'AC meters measure root-mean-square (r.m.s.) values, not peak values.',
      'Peak voltage is related to r.m.s. voltage by V0 = Vrms × √2.',
      'In a pure inductor, voltage leads current by 90°; in a pure capacitor, current leads voltage by 90°; in a resistor, voltage and current are in phase.',
      'Inductive reactance increases linearly with frequency (XL = 2πfL), while capacitive reactance is inversely proportional to frequency (XC = 1 / (2πfC)).'
    ],
    associatedQuizId: 'waec-ss3-phy-ac-circuits1-quiz'
  },

  // ==========================================
  // WEEK 2: RLC SERIES CIRCUITS & RESONANCE
  // ==========================================
  {
    id: 'phy-ss3-term2-week2',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Alternating Current (AC) Circuits II: Series RLC Circuits, Impedance & Electrical Resonance',
    subtopics: [
      'Series Combination of Resistor, Inductor, and Capacitor (RLC Circuit)',
      'Phasor Diagram Construction and Total Impedance Formula: Z = √[R² + (XL - XC)²]',
      'Phase Angle (ϕ) and Power Factor (cos ϕ) Calculations',
      'Electrical Resonance Condition: Derivation of Resonant Frequency f0 = 1 / [2π√(LC)] and Tuning Applications'
    ],
    readingTimeMinutes: 10,
    summary: 'Construct RLC phasor diagrams, compute net impedance, calculate phase angles and power factors, and derive electrical resonant frequency for radio tuning systems.',
    contentMarkdown: `### 1. The Series RLC Circuit Architecture

In a series RLC circuit, a resistor $R$, an inductor $L$, and a capacitor $C$ are connected in series across an alternating voltage source $v = V_0 \\sin(\\omega t)$.

Because the components are in series, the **same instantaneous current $i(t)$ flows through all three components**:
$$i(t) = I_0 \\sin(\\omega t)$$

The voltages across the individual components are:
- $V_R = I \\cdot R$ (in phase with $I$)
- $V_L = I \\cdot X_L$ (leads $I$ by $90^\\circ$)
- $V_C = I \\cdot X_C$ (lags $I$ by $90^\\circ$)

---

### 2. Phasor Diagram and Total Impedance ($Z$)

[Diagram: physics-ac-rlc-resonance]

Because $V_L$ and $V_C$ act along the same vertical axis in opposite directions, the net reactive voltage is $(V_L - V_C)$.

Applying the Pythagorean theorem to the voltage phasor triangle:
$$V^2 = V_R^2 + (V_L - V_C)^2$$
$$(I Z)^2 = (I R)^2 + [I (X_L - X_C)]^2$$

Dividing through by $I^2$ gives the **total impedance ($Z$)**:
$$Z = \\sqrt{R^2 + (X_L - X_C)^2} = \\sqrt{R^2 + \\left(2\\pi f L - \\frac{1}{2\\pi f C}\\right)^2}$$

Where **impedance ($Z$)** is the total opposition offered by an AC circuit to current flow, measured in **Ohms ($\\Omega$)**.

#### Phase Angle ($\\phi$):
The phase angle $\\phi$ between supply voltage and current is:
$$\\tan \\phi = \\frac{X_L - X_C}{R} \\quad \\text{or} \\quad \\cos \\phi = \\frac{R}{Z}$$

- If $X_L > X_C$: The circuit is **predominantly inductive**; voltage leads current ($\\phi > 0$).
- If $X_C > X_L$: The circuit is **predominantly capacitive**; current leads voltage ($\\phi < 0$).
- If $X_L = X_C$: The circuit is **purely resistive**; voltage and current are in phase ($\\phi = 0$).

#### Power Factor ($\\cos \\phi$):
The true power dissipated in an AC circuit is given by:
$$P = V_{\\text{rms}} \\cdot I_{\\text{rms}} \\cdot \\cos \\phi$$
Where $\\cos \\phi = \\frac{R}{Z}$ is the **power factor**. In purely reactive circuits ($R = 0$), $\\cos \\phi = 0$, meaning **zero net power is consumed** (wattless current).

---

### 3. Electrical Resonance in Series Circuits

**Electrical resonance** occurs when the inductive reactance equals the capacitive reactance:
$$X_L = X_C$$

#### Resonance Characteristics:
1. **Net Reactance is Zero:** $X_L - X_C = 0$.
2. **Impedance is at its Absolute Minimum:**
   $$Z_{\\text{min}} = \\sqrt{R^2 + 0} = R$$
3. **Current Amplitude is at its Maximum:**
   $$I_{\\text{max}} = \\frac{V}{R}$$
4. **Power Factor is Unity ($1.0$):** $\\cos \\phi = \\frac{R}{R} = 1$ (Voltage and current are in phase).

#### Derivation of Resonant Frequency ($f_0$):
$$2\\pi f_0 L = \\frac{1}{2\\pi f_0 C}$$
$$f_0^2 = \\frac{1}{4\\pi^2 L C} \\implies f_0 = \\frac{1}{2\\pi \\sqrt{LC}}$$

#### Practical Applications:
- **Radio and Television Tuning:** Variable capacitors in receiver tuner circuits adjust $C$ until the natural resonant frequency $f_0$ matches the carrier wave frequency of the chosen broadcasting station, magnifying its signal while rejecting other frequencies.

---

### 4. Worked WAEC Examination Drill

**Question:** A circuit consists of a $30\\,\\Omega$ resistor, an inductor of inductance $0.4\\text{ H}$, and a capacitor of capacitance $20\\,\\mu\\text{F}$ connected in series to an AC supply of $200\\text{ V}$, $50\\text{ Hz}$. Calculate:
1. The inductive reactance $X_L$ and capacitive reactance $X_C$.
2. The total impedance $Z$ of the circuit.
3. The r.m.s. current flowing in the circuit.
4. The resonant frequency $f_0$ of the circuit.

**Solution:**
1. **Reactances:**
   $$X_L = 2\\pi f L = 2 \\times 3.1416 \\times 50 \\times 0.4 = 125.7\\,\\Omega$$
   $$X_C = \\frac{1}{2\\pi f C} = \\frac{1}{2 \\times 3.1416 \\times 50 \\times (20 \\times 10^{-6})} = \\frac{1}{0.006283} = 159.2\\,\\Omega$$
2. **Total Impedance ($Z$):**
   $$X_L - X_C = 125.7 - 159.2 = -33.5\\,\\Omega$$
   $$Z = \\sqrt{R^2 + (X_L - X_C)^2} = \\sqrt{30^2 + (-33.5)^2} = \\sqrt{900 + 1122.25} = \\sqrt{2022.25} = 44.97\\,\\Omega \\approx 45.0\\,\\Omega$$
3. **Current ($I_{\\text{rms}}$):**
   $$I = \\frac{V}{Z} = \\frac{200\\text{ V}}{45.0\\,\\Omega} = 4.44\\text{ A}$$
4. **Resonant Frequency ($f_0$):**
   $$f_0 = \\frac{1}{2\\pi \\sqrt{LC}} = \\frac{1}{2 \\times 3.1416 \\times \\sqrt{0.4 \\times 20 \\times 10^{-6}}} = \\frac{1}{6.2832 \\times \\sqrt{8 \\times 10^{-6}}}$$
   $$\\sqrt{8 \\times 10^{-6}} = 2.828 \\times 10^{-3}$$
   $$f_0 = \\frac{1}{6.2832 \\times 2.828 \\times 10^{-3}} = \\frac{1}{0.01777} = 56.3\\text{ Hz}$$`,
    keyTakeaways: [
      'In a series RLC circuit, impedance is given by Z = √[R² + (XL - XC)²].',
      'At electrical resonance, XL = XC, impedance Z is minimized to R, and circuit current reaches its maximum value.',
      'The series resonant frequency is f0 = 1 / (2π√LC).',
      'The power factor is cos ϕ = R / Z; at resonance, the power factor is 1.0 (purely resistive behavior).'
    ],
    associatedQuizId: 'waec-ss3-phy-rlc-resonance-quiz'
  },

  // ==========================================
  // WEEK 3: ELECTROMAGNETIC INDUCTION & TRANSFORMERS
  // ==========================================
  {
    id: 'phy-ss3-term2-week3',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Electromagnetic Induction & Transformers: Faraday’s Laws, Mutual Induction & the National Grid',
    subtopics: [
      'Faraday’s Law of Electromagnetic Induction and Lenz’s Law of Conservation of Energy',
      'Self-Inductance, Mutual Inductance, and Magnetic Flux Linkage (Φ = B · A · cos θ)',
      'Transformer Architecture: Step-Up vs. Step-Down, Turns Ratio, and Efficiency Formula',
      'Energy Losses in Transformers (Eddy Currents, Hysteresis, I²R Copper, Flux Leakage) and High-Voltage Grid Transmission'
    ],
    readingTimeMinutes: 10,
    summary: 'Evaluate electromagnetic induction laws, derive the transformer equation, analyze core energy losses and laminations, and model high-voltage electric grid transmission.',
    contentMarkdown: `### 1. Fundamental Laws of Electromagnetic Induction

**Electromagnetic induction** is the phenomenon whereby an electromotive force (EMF) is induced across a conductor whenever there is a change in the magnetic flux linking that conductor.

#### Magnetic Flux ($\\Phi$):
$$\\Phi = B \\cdot A \\cdot \\cos \\theta$$
Measured in **Webers ($\\text{Wb}$)** or $\\text{Tesla} \\cdot \\text{m}^2$.

#### The Two Foundational Laws:
1. **Faraday’s Law:** The magnitude of the induced EMF is directly proportional to the time rate of change of magnetic flux linkage:
   $$\\varepsilon = -N \\frac{d\\Phi}{dt}$$
2. **Lenz’s Law:** The direction of the induced EMF and resulting current is always such as to oppose the change in magnetic flux that produces it.
   - *Conservation of Energy:* Lenz's law is a direct consequence of the conservation of energy. Mechanical work must be expended against the opposing magnetic force to generate electrical energy.

---

### 2. The Transformer: Theory & Mathematical Equations

A **transformer** is a static electrical machine that transfers electrical energy from one alternating current circuit to another at the same frequency, by mutual electromagnetic induction, accompanied by a change in voltage and current.

It consists of two isolated coils wound on a common high-permeability soft-iron core:
- **Primary Coil ($N_p$ turns):** Connected to input AC supply.
- **Secondary Coil ($N_s$ turns):** Delivers output AC to load.

#### Ideal Transformer Equation (100% Efficiency):
$$\\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}$$

- **Step-Up Transformer:** $N_s > N_p \\implies V_s > V_p$ and $I_s < I_p$ (increases voltage, reduces current).
- **Step-Down Transformer:** $N_s < N_p \\implies V_s < V_p$ and $I_s > I_p$ (decreases voltage, increases current).

#### Transformer Efficiency ($\\eta$):
In real transformers, power output is always less than power input due to internal losses:
$$\\eta = \\frac{\\text{Power Output}}{\\text{Power Input}} \\times 100\\% = \\frac{V_s I_s}{V_p I_p} \\times 100\\%$$

---

### 3. Energy Losses in Practical Transformers & Mitigations

| Nature of Energy Loss | Underlying Physical Cause | Engineering Solution & Prevention Method |
| :--- | :--- | :--- |
| **Eddy Current Loss** | Changing magnetic flux induces circular circulating currents inside solid iron core, dissipating heat ($I^2 R$) | Core is constructed from **thin laminated sheets of soft iron** insulated from one another by varnish, restricting circulating eddy loops |
| **Hysteresis Loss** | Energy dissipated as heat during repeated magnetization and demagnetization of core domains each cycle | Use **soft iron or silicon steel** with low magnetic retentivity and narrow hysteresis loop area |
| **Copper ($I^2 R$) Resistance Loss** | Electrical resistance of copper wire windings dissipates Joule heat | Windings are made from **thick, high-conductivity copper wire** with low electrical resistance |
| **Flux Leakage Loss** | Not all magnetic flux generated in primary links through secondary winding | Wind secondary coil directly over the primary coil on a closed soft-iron magnetic core frame |

---

### 4. High-Voltage Power Transmission in Nigeria (The National Grid)

Electricity generated at power stations (Kainji Dam, Egbin Thermal Plant) is transmitted across hundreds of kilometers to cities at very high voltages ($132\\text{ kV}$ or $330\\text{ kV}$).

#### Why High Voltage is Essential:
Power transmitted is $P = V \\cdot I$. For a constant power demand:
$$I = \\frac{P}{V}$$
The power loss in transmission cables of resistance $R$ is:
$$P_{\\text{loss}} = I^2 R = \\left(\\frac{P}{V}\\right)^2 R = \\frac{P^2 R}{V^2}$$

- **Stepping up voltage by a factor of $10$ reduces transmission current by $10$, which reduces power loss in cables by a factor of $10^2 = 100$!**
- Stepping down voltage at local substations ($33\\text{ kV} \\rightarrow 11\\text{ kV} \\rightarrow 415\\text{ V} / 230\\text{ V}$) ensures domestic safety for consumer appliances.`,
    keyTakeaways: [
      'Faraday’s law governs the magnitude of induced EMF; Lenz’s law establishes its direction as an opposition to flux change (conservation of energy).',
      'The transformer ratio is Vs / Vp = Ns / Np = Ip / Is for an ideal transformer.',
      'Transformer cores are laminated to break up and minimize eddy currents, reducing Joule heating losses.',
      'High-voltage electric power transmission minimizes I²R line dissipation because power loss is inversely proportional to V².'
    ],
    associatedQuizId: 'waec-ss3-phy-induction-transformers-quiz'
  },

  // ==========================================
  // WEEK 4: QUANTUM PHYSICS: WAVE-PARTICLE DUALITY
  // ==========================================
  {
    id: 'phy-ss3-term2-week4',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Quantum Physics: Blackbody Radiation, Planck’s Hypothesis & Wave-Particle Duality',
    subtopics: [
      'Thermal Radiation and the Blackbody Spectrum: Failure of Classical Physics (Ultraviolet Catastrophe)',
      'Max Planck’s Quantum Hypothesis: Discrete Energy Packets (E = hf)',
      'Wave-Particle Duality: Light as Both Electromagnetic Waves and Photons',
      'Louis de Broglie Hypothesis and Matter Waves: λ = h / p and Davisson-Germer Electron Diffraction'
    ],
    readingTimeMinutes: 9,
    summary: 'Trace quantum physics from blackbody radiation and Planck’s constant to wave-particle duality and de Broglie matter waves confirmed by electron diffraction.',
    contentMarkdown: `### 1. Blackbody Radiation and the Quantum Revolution

A **blackbody** is an idealized physical body that absorbs all incident electromagnetic radiation regardless of frequency or angle of incidence, and is an ideal emitter of thermal radiation.

#### The Ultraviolet Catastrophe:
Classical electromagnetic wave theory (Rayleigh-Jeans law) predicted that the energy radiated by a blackbody should approach infinity as wavelength approaches zero in the ultraviolet region. Experimental curves, however, showed energy dropping sharply toward zero at high frequencies.

#### Max Planck’s Quantum Hypothesis (1900):
Planck resolved this dilemma by postulating that matter emits and absorbs radiant energy not continuously, but in **discrete indivisible packets or bundles of energy called quanta** (singular: **quantum**, or **photon** for light):

$$E = h f = \\frac{h c}{\\lambda}$$

Where:
- $h$ is **Planck’s constant** ($6.626 \\times 10^{-34}\\text{ J}\\cdot\\text{s}$).
- $f$ is the frequency of the radiation in $\\text{Hz}$.
- $c$ is the speed of light in vacuum ($3.0 \\times 10^8\\text{ m/s}$).
- $\\lambda$ is the wavelength in meters.

---

### 2. Wave-Particle Duality of Light

Light behaves as a **wave** during propagation and interaction with macroscopic obstacles, but behaves as a stream of **particles (photons)** when exchanging energy with matter:

| Physical Phenomenon | Best Explained by Wave Nature | Best Explained by Particle (Photon) Nature |
| :--- | :--- | :--- |
| **Interference & Diffraction** | Yes (Young's double slit; coherent wavefront superposition) | Cannot be explained classically |
| **Polarization** | Yes (transverse electromagnetic wave oscillation) | Cannot be explained |
| **Photoelectric Effect** | Completely fails classical wave theory | Yes (instantaneous one-to-one photon-electron collision) |
| **Compton Scattering** | Completely fails classical wave theory | Yes (elastic collision between X-ray photon and electron) |

---

### 3. De Broglie Matter Waves

In 1924, French physicist **Louis de Broglie** reasoned that if light waves exhibit particle properties, material particles in motion (electrons, protons, neutrons) must also exhibit wave properties.

#### Derivation of de Broglie Wavelength ($\\lambda$):
From Einstein's mass-energy equivalence $E = mc^2$ and Planck's photon energy $E = hf = \\frac{hc}{\\lambda}$:
$$m c^2 = \\frac{h c}{\\lambda} \\implies m c = \\frac{h}{\\lambda} = p$$
Where $p$ is momentum. Extending this to any material particle of mass $m$ moving with velocity $v$:
$$\\lambda = \\frac{h}{p} = \\frac{h}{m v}$$

#### Experimental Confirmation (Davisson and Germer, 1927):
Davisson and Germer directed a collimated beam of accelerated electrons onto a nickel crystal target. The electrons scattered and produced a clear **circular diffraction ring pattern**, confirming that moving electrons undergo wave diffraction with a wavelength matching de Broglie's prediction $\\lambda = \\frac{h}{mv}$.

---

### 4. Worked WAEC Examination Drill

**Question:** An electron of mass $9.11 \\times 10^{-31}\\text{ kg}$ is accelerated from rest through a potential difference of $100\\text{ V}$.
Calculate:
1. The kinetic energy acquired by the electron in Joules.
2. The final velocity of the electron.
3. The de Broglie wavelength associated with the electron ($h = 6.63 \\times 10^{-34}\\text{ J}\\cdot\\text{s}$, $e = 1.60 \\times 10^{-19}\\text{ C}$).

**Solution:**
1. **Kinetic Energy ($K$):**
   $$K = q \\cdot V = (1.60 \\times 10^{-19}\\text{ C}) \\times 100\\text{ V} = 1.60 \\times 10^{-17}\\text{ J}$$
2. **Velocity ($v$):**
   $$K = \\frac{1}{2} m v^2 \\implies v = \\sqrt{\\frac{2 K}{m}} = \\sqrt{\\frac{2 \\times 1.60 \\times 10^{-17}\\text{ J}}{9.11 \\times 10^{-31}\\text{ kg}}}$$
   $$v = \\sqrt{3.513 \\times 10^{13}} = 5.93 \\times 10^6\\text{ m/s}$$
3. **De Broglie Wavelength ($\\lambda$):**
   $$\\lambda = \\frac{h}{m v} = \\frac{6.63 \\times 10^{-34}\\text{ J}\\cdot\\text{s}}{(9.11 \\times 10^{-31}\\text{ kg}) \\times (5.93 \\times 10^6\\text{ m/s})} = \\frac{6.63 \\times 10^{-34}}{5.402 \\times 10^{-24}} = 1.23 \\times 10^{-10}\\text{ m} = 0.123\\text{ nm}$$
   *Notice:* $0.123\\text{ nm}$ is comparable to atomic spacing in crystalline lattices, which explains why electron diffraction occurs in crystals.`,
    keyTakeaways: [
      'Planck demonstrated that radiant energy is emitted in discrete packets called quanta, where E = hf.',
      'Light exhibits wave-particle duality: wave properties in diffraction and interference; particle properties in photoelectric and Compton effects.',
      'De Broglie proved that moving particles have an associated matter wavelength given by λ = h / (mv).',
      'Davisson-Germer electron diffraction proved the wave nature of electrons experimentally.'
    ],
    associatedQuizId: 'waec-ss3-phy-wave-particle-quiz'
  },

  // ==========================================
  // WEEK 5: THE PHOTOELECTRIC EFFECT
  // ==========================================
  {
    id: 'phy-ss3-term2-week5',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'The Photoelectric Effect: Einstein’s Photoelectric Equation, Work Function & Photocells',
    subtopics: [
      'Phenomenon of Photoelectric Emission and Experimental Observations (Hertz, Hallwachs)',
      'Failure of Classical Wave Theory to Explain Instantaneous Emission and Frequency Thresholds',
      'Einstein’s Photoelectric Equation: hf = W0 + Kmax and Stopping Potential (eVs = Kmax)',
      'Threshold Frequency (f0), Work Function (W0), and Technological Applications of Photocells'
    ],
    readingTimeMinutes: 10,
    summary: 'Master the physics of photoelectric emission, formulate Einstein’s energy equation, calculate stopping potential and work function, and explore photocell sensors.',
    contentMarkdown: `### 1. Phenomenon of Photoelectric Emission

**Photoelectric emission** is the ejection of electrons (called **photoelectrons**) from the clean surface of a metal when electromagnetic radiation of sufficiently high frequency is incident upon it.

[Diagram: physics-photoelectric-work-function]

#### Key Experimental Laws of Photoelectric Emission:
1. **Existence of Threshold Frequency ($f_0$):** For every metal surface, there exists a definite minimum frequency ($f_0$) below which no electrons are emitted, regardless of light intensity or illumination duration.
2. **Instantaneous Emission:** Photoelectrons are liberated without any measurable time delay ($< 10^{-9}\\text{ s}$) upon illumination.
3. **Dependence of Kinetic Energy on Frequency:** The maximum kinetic energy ($K_{\\text{max}}$) of emitted photoelectrons depends strictly on the **frequency** of incident radiation, and is completely independent of the intensity of the light beam.
4. **Dependence of Photocurrent on Intensity:** The rate of emission of photoelectrons (photocurrent) is directly proportional to the **intensity** of the incident radiation, provided frequency exceeds $f_0$.

---

### 2. Failure of Classical Wave Theory

| Observation | Classical Electromagnetic Wave Prediction | Quantum Reality (Photon Model) |
| :--- | :--- | :--- |
| **Threshold Frequency** | Light wave energy spreads evenly; intense light of *any* frequency should eventually deliver enough energy to eject electrons | Energy is concentrated in localized photons; if $h f < W_0$, a single photon cannot deliver enough energy to liberate an electron |
| **Emission Time Lag** | Classical waves require minutes to hours for an electron to absorb enough energy | Photoelectric emission is instantaneous ($< 10^{-9}\\text{ s}$) due to one-to-one photon-electron collisions |
| **Kinetic Energy Dependence** | Higher light intensity increases electric field amplitude, which should eject faster electrons | Higher intensity only increases photon flux (more electrons ejected), but each individual electron receives energy from a single photon ($E = hf$) |

---

### 3. Einstein’s Photoelectric Equation (1905)

Albert Einstein applied Planck’s quantum hypothesis to formulate the energy balance of photoelectric emission:

$$h f = W_0 + K_{\\text{max}}$$
$$h f = h f_0 + \\frac{1}{2} m v_{\\text{max}}^2$$

Where:
- $h f$ is the total energy of the incident photon.
- $W_0 = h f_0 = \\frac{h c}{\\lambda_0}$ is the **work function** of the metal (the minimum energy required to free an electron from the metal surface, measured in $\\text{Joules}$ or electron-volts $\\text{eV}$, where $1\\text{ eV} = 1.602 \\times 10^{-19}\\text{ J}$).
- $f_0$ is the **threshold frequency** (cutoff frequency).
- $\\lambda_0$ is the **threshold wavelength** (maximum wavelength capable of causing emission).
- $K_{\\text{max}} = \\frac{1}{2} m v_{\\text{max}}^2$ is the maximum kinetic energy of ejected photoelectrons.

#### Stopping Potential ($V_s$):
The **stopping potential** ($V_s$) is the minimum negative anode potential required to halt the fastest emitted photoelectrons, reducing photocurrent to zero:
$$e V_s = K_{\\text{max}} = \\frac{1}{2} m v_{\\text{max}}^2$$
$$e V_s = h f - W_0 \\implies V_s = \\left(\\frac{h}{e}\\right) f - \\frac{W_0}{e}$$
*Crucial Graph Note:* A plot of stopping potential $V_s$ against frequency $f$ produces a straight line with:
- Slope $= \\frac{h}{e}$ (universal constant for all metals).
- Intercept on frequency axis $= f_0$ (threshold frequency).
- Intercept on voltage axis $= -\\frac{W_0}{e}$.

---

### 4. Worked WAEC Examination Drill

**Question:** Light of wavelength $400\\text{ nm}$ illuminates a metal surface whose work function is $2.20\\text{ eV}$.
Given: $h = 6.63 \\times 10^{-34}\\text{ J}\\cdot\\text{s}$, $c = 3.0 \\times 10^8\\text{ m/s}$, $e = 1.60 \\times 10^{-19}\\text{ C}$, calculate:
1. The energy of an incident photon in electron-volts ($\text{eV}$).
2. The maximum kinetic energy ($K_{\\text{max}}$) of the emitted photoelectrons.
3. The stopping potential ($V_s$) of the cell.

**Solution:**
1. **Photon Energy ($E$):**
   $$E = \\frac{h c}{\\lambda} = \\frac{(6.63 \\times 10^{-34}) \\times (3.0 \\times 10^8)}{400 \\times 10^{-9}} = \\frac{1.989 \\times 10^{-25}}{4.0 \\times 10^{-7}} = 4.9725 \\times 10^{-19}\\text{ J}$$
   $$E\\,(\\text{in eV}) = \\frac{4.9725 \\times 10^{-19}\\text{ J}}{1.60 \\times 10^{-19}\\text{ J/eV}} = 3.11\\text{ eV}$$
2. **Maximum Kinetic Energy ($K_{\\text{max}}$):**
   $$K_{\\text{max}} = E - W_0 = 3.11\\text{ eV} - 2.20\\text{ eV} = 0.91\\text{ eV}$$
   $$K_{\\text{max}}\\,(\\text{in Joules}) = 0.91 \\times 1.60 \\times 10^{-19} = 1.456 \\times 10^{-19}\\text{ J}$$
3. **Stopping Potential ($V_s$):**
   $$e V_s = K_{\\text{max}} = 0.91\\text{ eV} \\implies V_s = 0.91\\text{ V}$$`,
    keyTakeaways: [
      'Einstein’s photoelectric equation is hf = W0 + Kmax, where W0 is the metal\'s work function.',
      'Emission occurs only if radiation frequency exceeds the threshold frequency (f ≥ f0); below f0, no emission occurs regardless of intensity.',
      'Stopping potential satisfies eVs = Kmax, meaning Vs directly measures the maximum kinetic energy of photoelectrons.',
      'A graph of stopping potential against frequency has a slope of h/e and an x-intercept at the threshold frequency f0.'
    ],
    associatedQuizId: 'waec-ss3-phy-photoelectric-quiz'
  },

  // ==========================================
  // WEEK 6: MID-TERM WAEC PROBLEM SOLVING CLINIC
  // ==========================================
  {
    id: 'phy-ss3-term2-week6',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Mid-Term Assessment & Physics Problem Solving Clinic: AC Networks & Quantum Calculations',
    subtopics: [
      'Multi-Stage Series AC Circuit Resonance and Impedance Computations',
      'Transformer Power Delivery and Line Transmission Efficiency Evaluations',
      'Quantum Calculations: Photon Momentum, Work Function, and Stopping Potentials',
      'Error Minimization, Coordinate Plotting, and Graph Interpretation Skills'
    ],
    readingTimeMinutes: 10,
    summary: 'Consolidate AC network equations, solve multi-step transformer and photoelectric problems, and practice examination graph analysis techniques.',
    contentMarkdown: `### 1. Systematic Review of Core Mathematical Formulas

#### Alternating Current Series Circuits:
$$Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad X_L = 2\\pi f L, \\quad X_C = \\frac{1}{2\\pi f C}$$
$$\\cos \\phi = \\frac{R}{Z}, \\quad f_0 = \\frac{1}{2\\pi \\sqrt{LC}}, \\quad P_{\\text{true}} = V_{\\text{rms}} I_{\\text{rms}} \\cos \\phi$$

#### Electromagnetic Induction and Transformers:
$$\\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s} \\quad (\\text{Ideal}), \\quad \\eta = \\frac{V_s I_s}{V_p I_p} \\times 100\\%$$

#### Quantum Mechanics and Photoelectricity:
$$E = h f = \\frac{h c}{\\lambda}, \\quad p = \\frac{h}{\\lambda}, \\quad \\lambda = \\frac{h}{m v}$$
$$h f = W_0 + e V_s = h f_0 + \\frac{1}{2} m v_{\\text{max}}^2$$

---

### 2. Multi-Step Comprehensive Worked Problems

**Problem 1 (AC Network):** An alternating voltage $v = 141.4 \\sin(100\\pi t)$ is applied across an RLC circuit with $R = 40\\,\\Omega$, $L = 0.318\\text{ H}$, and $C = 63.7\\,\\mu\\text{F}$. Determine:
1. The frequency $f$ and r.m.s. voltage $V_{\\text{rms}}$ of the source.
2. The circuit impedance $Z$.
3. The average power dissipated in the circuit.

**Solution:**
1. **Source Parameters:**
   $$\\omega = 100\\pi \\implies 2\\pi f = 100\\pi \\implies f = 50\\text{ Hz}$$
   $$V_0 = 141.4\\text{ V} \\implies V_{\\text{rms}} = \\frac{141.4}{\\sqrt{2}} = \\frac{141.4}{1.414} = 100\\text{ V}$$
2. **Reactances & Impedance:**
   $$X_L = 2\\pi f L = 2 \\times \\pi \\times 50 \\times 0.318 = 100\\pi \\times 0.318 = 100\\,\\Omega$$
   $$X_C = \\frac{1}{2\\pi f C} = \\frac{1}{100\\pi \\times 63.7 \\times 10^{-6}} = \\frac{1}{0.020} = 50\\,\\Omega$$
   $$Z = \\sqrt{R^2 + (X_L - X_C)^2} = \\sqrt{40^2 + (100 - 50)^2} = \\sqrt{1600 + 2500} = \\sqrt{4100} = 64.03\\,\\Omega$$
3. **Current & Power:**
   $$I_{\\text{rms}} = \\frac{V_{\\text{rms}}}{Z} = \\frac{100\\text{ V}}{64.03\\,\\Omega} = 1.562\\text{ A}$$
   $$\\cos \\phi = \\frac{R}{Z} = \\frac{40}{64.03} = 0.6247$$
   $$P = V_{\\text{rms}} \\cdot I_{\\text{rms}} \\cdot \\cos \\phi = 100 \\times 1.562 \\times 0.6247 = 97.6\\text{ W}$$

---

**Problem 2 (Transformer Line Transmission):** A generating station outputs $1.2\\text{ MW}$ of power. It is stepped up to $132\\text{ kV}$ by an $85\\%$ efficient transformer before transmission through cables of total resistance $10\\,\\Omega$.
Calculate the power loss in the transmission lines, and compare it with the power loss if transmitted directly at $11\\text{ kV}$.

**Solution:**
1. **Transmission at $132\\text{ kV}$:**
   $$I = \\frac{P}{V} = \\frac{1.2 \\times 10^6\\text{ W}}{132 \\times 10^3\\text{ V}} = 9.09\\text{ A}$$
   $$P_{\\text{loss}} = I^2 R = (9.09)^2 \\times 10 = 82.64 \\times 10 = 826.4\\text{ W} \\approx 0.83\\text{ kW}$$
2. **Transmission at $11\\text{ kV}$:**
   $$I = \\frac{P}{V} = \\frac{1.2 \\times 10^6\\text{ W}}{11 \\times 10^3\\text{ V}} = 109.1\\text{ A}$$
   $$P_{\\text{loss}} = (109.1)^2 \\times 10 = 11902.8 \\times 10 = 119,028\\text{ W} \\approx 119\\text{ kW}$$
3. **Conclusion:** Stepping up to $132\\text{ kV}$ reduces transmission power loss from $119\\text{ kW}$ down to less than $1\\text{ kW}$, an improvement factor of over $140\\times$!`,
    keyTakeaways: [
      'In sinusoidal analysis, always extract angular frequency ω to calculate f = ω / (2π).',
      'The power dissipated in an AC circuit depends entirely on the resistive component: P = I_rms² × R.',
      'High-voltage transmission drastically cuts line power loss by reducing current (Ploss ∝ 1 / V²).'
    ],
    associatedQuizId: 'waec-ss3-phy-midterm-clinic-quiz'
  },

  // ==========================================
  // WEEK 7: ATOMIC MODELS & ENERGY LEVELS
  // ==========================================
  {
    id: 'phy-ss3-term2-week7',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Atomic Models & Energy Levels: Rutherford, Bohr Postulates & Line Spectra',
    subtopics: [
      'Evolution of Atomic Structure: Thomson, Rutherford Alpha Scattering & Planetary Model Limitations',
      'Niels Bohr Postulates: Quantized Angular Momentum (L = nh / 2π) and Non-Radiating Orbits',
      'Hydrogen Energy Levels Formula: En = -13.6 eV / n² and Orbital Transitions',
      'Line Emission and Absorption Spectra: Lyman, Balmer, Paschen Spectral Series and Ionization Energy'
    ],
    readingTimeMinutes: 10,
    summary: 'Study atomic models from Thomson to Bohr, derive quantized hydrogen orbital energy states, and analyze line emission spectra series (Lyman, Balmer, Paschen).',
    contentMarkdown: `### 1. Historical Evolution of Atomic Models

1. **J.J. Thomson "Plum Pudding" Model (1897):** Atom viewed as a sphere of positive electrical fluid embedded with negatively charged electrons.
2. **Rutherford’s Alpha Scattering Experiment (1911):**
   - Alpha particles ($^{4}_{2}\\text{He}$) directed at an ultra-thin gold foil.
   - **Observations:** Over $99\\%$ passed straight through; a few were deflected through moderate angles; roughly $1$ in $8000$ bounced backward ($> 90^\\circ$).
   - **Deductions:** The atom is mostly empty space; positive charge and nearly all mass are concentrated in a tiny central core called the **nucleus**.
   - **Classical Flaw:** According to Maxwellian electrodynamics, orbiting electrons should continuously radiate electromagnetic waves, lose kinetic energy, and spiral into the nucleus within $10^{-8}\\text{ s}$.

---

### 2. Bohr’s Postulates for the Hydrogen Atom (1913)

Niels Bohr resolved the classical stability dilemma with three postulates:
1. **Stationary Non-Radiating Orbits:** Electrons revolve around the nucleus only in certain stable, non-radiating circular orbits called **stationary states**.
2. **Quantized Angular Momentum:** An electron can only occupy orbits where its orbital angular momentum $L$ is an integral multiple of $\\frac{h}{2\\pi}$:
   $$L = m v r = n \\frac{h}{2\\pi} \\quad (n = 1, 2, 3, \\dots)$$
3. **Photon Emission during Transitions:** Radiation is emitted or absorbed only when an electron jumps from one stationary orbit of energy $E_2$ to another of energy $E_1$:
   $$\\Delta E = E_2 - E_1 = h f = \\frac{h c}{\\lambda}$$

---

### 3. Quantized Energy Levels of Hydrogen

The energy of an electron in the $n$-th orbit of hydrogen is:
$$E_n = -\\frac{13.6\\text{ eV}}{n^2}$$

- **Ground State ($n = 1$):**
  $$E_1 = -\\frac{13.6}{1^2} = -13.6\\text{ eV}$$
  The negative sign indicates that the electron is bound to the nucleus.
- **First Excited State ($n = 2$):**
  $$E_2 = -\\frac{13.6}{2^2} = -3.4\\text{ eV}$$
- **Second Excited State ($n = 3$):**
  $$E_3 = -\\frac{13.6}{3^2} = -1.51\\text{ eV}$$
- **Ionization Limit ($n = \\infty$):**
  $$E_\\infty = 0\\text{ eV}$$
  **Ionization Energy:** The minimum energy required to completely remove an electron from the ground state of an isolated atom to infinity ($+13.6\\text{ eV}$ for hydrogen).

---

### 4. Spectral Series of Hydrogen

| Spectral Series | Lower State ($n_1$) | Upper States ($n_2$) | Spectral Region | Characteristic Feature |
| :--- | :--- | :--- | :--- | :--- |
| **Lyman Series** | $n_1 = 1$ | $n_2 = 2, 3, 4, \\dots$ | **Ultraviolet (UV)** | Highest energy transitions; invisible to human eye |
| **Balmer Series** | $n_1 = 2$ | $n_2 = 3, 4, 5, \\dots$ | **Visible Light** | Only series producing visible color emission lines |
| **Paschen Series** | $n_1 = 3$ | $n_2 = 4, 5, 6, \\dots$ | **Infrared (IR)** | Lower energy transitions |
| **Brackett Series**| $n_1 = 4$ | $n_2 = 5, 6, 7, \\dots$ | **Far Infrared** | Thermal infrared lines |
| **Pfund Series**   | $n_1 = 5$ | $n_2 = 6, 7, 8, \\dots$ | **Far Infrared** | Low-frequency transitions |

#### The Rydberg Formula:
$$\\frac{1}{\\lambda} = R_H \\left( \\frac{1}{n_1^2} - \\frac{1}{n_2^2} \\right)$$
Where $R_H = 1.097 \\times 10^7\\text{ m}^{-1}$ is the **Rydberg constant**.`,
    keyTakeaways: [
      'Bohr postulated that orbital angular momentum is quantized: L = mvr = nh / (2π).',
      'The hydrogen energy levels are given by En = -13.6 eV / n²; ground state energy is -13.6 eV.',
      'The Balmer series corresponds to transitions ending at n = 2 and falls in the visible light spectrum.',
      'Ionization energy is the energy required to remove an electron from the ground state to infinity (13.6 eV for hydrogen).'
    ],
    associatedQuizId: 'waec-ss3-phy-atomic-models-quiz'
  },

  // ==========================================
  // WEEK 8: X-RAYS: PRODUCTION, PROPERTIES & USES
  // ==========================================
  {
    id: 'phy-ss3-term2-week8',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'X-Rays: Coolidge Tube Production, Continuous vs. Characteristic Spectra & Bragg Diffraction',
    subtopics: [
      'Production of X-Rays in the Modern Coolidge Tube: Thermionic Emission and High-Voltage Acceleration',
      'Energy Conversion: Minimum Wavelength Formula (λmin = hc / eV) and Tube Efficiency',
      'Distinction Between Continuous (Bremsstrahlung) and Characteristic X-Ray Spectra',
      'Bragg’s Law of Crystal Diffraction (2d sin θ = nλ), Medical and Industrial Radiography'
    ],
    readingTimeMinutes: 9,
    summary: 'Analyze X-ray generation in Coolidge tubes, calculate minimum cutoff wavelength, distinguish Bremsstrahlung from characteristic spectra, and apply Bragg’s law.',
    contentMarkdown: `### 1. Production of X-Rays (The Coolidge Tube)

**X-rays** are short-wavelength, high-frequency electromagnetic radiations produced when high-speed cathode electrons are abruptly decelerated upon striking a heavy metallic target:

1. **Thermionic Emission:** A tungsten filament cathode is heated by a low-voltage auxiliary current, releasing electrons.
2. **High-Voltage Acceleration:** A high potential difference ($10\\text{ kV} - 100\\text{ kV}$) applied between cathode and target accelerates electrons to high kinetic energies.
3. **Collision with Heavy Target:** Fast electrons strike a target anode (tungsten or molybdenum embedded in a heavy copper cooling block):
   - Over **$99\\%$ of electron kinetic energy is converted into heat**.
   - Less than **$1\\%$ is converted into penetrating X-rays**.
   - Cooling fins or circulating oil jackets dissipate the intense heat to prevent anode melting.

---

### 2. Minimum Wavelength ($\\lambda_{\\text{min}}$) & Duane-Hunt Law

When an electron gives up all its kinetic energy in a single collision to produce a single photon, the emitted photon has maximum energy and **minimum wavelength ($\\lambda_{\\text{min}}$)**:

$$e V = h f_{\\text{max}} = \\frac{h c}{\\lambda_{\\text{min}}} \\implies \\lambda_{\\text{min}} = \\frac{h c}{e V}$$

- **Soft X-Rays:** Produced at lower accelerating voltages ($10-30\\text{ kV}$); longer wavelengths, lower penetrating power; used in dermatological and soft-tissue radiography.
- **Hard X-Rays:** Produced at high voltages ($50-100+\\text{ kV}$); shorter wavelengths, high penetrating power; used in bone imaging and industrial weld testing.

---

### 3. Continuous vs. Characteristic X-Ray Spectra

1. **Continuous Spectrum (Bremsstrahlung / "Braking Radiation"):**
   - Produced when accelerating electrons pass near positive target atomic nuclei and are deflected and decelerated.
   - Emits a continuous distribution of wavelengths starting sharply at $\\lambda_{\\text{min}}$.
2. **Characteristic Spectrum:**
   - Produced when an energetic incident electron knocks out an inner-shell electron ($K$ or $L$ shell) of a target atom.
   - An outer-shell electron drops into the vacancy, emitting an X-ray photon with energy equal to the difference between the two atomic energy levels:
     $$h f = E_{\\text{outer}} - E_{\\text{inner}}$$
   - Produces sharp intensity spikes ($K_\\alpha, K_\\beta$) characteristic of the specific target element.

---

### 4. Bragg’s Law of X-Ray Crystal Diffraction

Because X-ray wavelengths ($0.01 - 10\\text{ nm}$) are of the same order of magnitude as atomic lattice spacings in crystals, crystals act as three-dimensional diffraction gratings:

$$2 d \\sin \\theta = n \\lambda$$

Where:
- $d$ is the interplanar lattice spacing between atomic planes.
- $\\theta$ is the glancing angle of incidence.
- $n$ is the order of diffraction ($n = 1, 2, 3, \\dots$).
- $\\lambda$ is the X-ray wavelength.

---

### 5. Radiation Hazards and Safety Precautions
- High-energy X-rays cause ionization of water molecules inside biological cells, creating free radicals that damage DNA, cause cellular mutations, and trigger malignant cancers.
- **Safety Measures:** Radiographers stand behind thick **lead glass screens**, wear **lead aprons**, and use personal film badges to monitor cumulative exposure.`,
    keyTakeaways: [
      'X-rays are generated when high-speed electrons strike a heavy metal target, with over 99% of kinetic energy turning into heat.',
      'The minimum cutoff wavelength is given by λmin = hc / (eV).',
      'The continuous spectrum arises from electron deceleration (Bremsstrahlung), while sharp characteristic peaks originate from inner-shell electron transitions.',
      'Bragg\'s law for crystal diffraction is 2d sin θ = nλ.'
    ],
    associatedQuizId: 'waec-ss3-phy-xrays-quiz'
  },

  // ==========================================
  // WEEK 9: NUCLEAR PHYSICS & MASS DEFECT
  // ==========================================
  {
    id: 'phy-ss3-term2-week9',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Nuclear Physics: Mass Defect, Nuclear Binding Energy & Chain Reactions',
    subtopics: [
      'Constituents of the Atomic Nucleus: Nucleons, Isotopes, and the Strong Nuclear Force',
      'Concept of Mass Defect (Δm): Total Constituent Masses vs. Rest Mass of Nucleus',
      'Einstein’s Mass-Energy Equivalence: E = Δm · c² and Binding Energy per Nucleon Curve',
      'Controlled Nuclear Fission in Reactors (Fuel, Moderators, Control Rods) and Star Fusion Cycles'
    ],
    readingTimeMinutes: 10,
    summary: 'Calculate nuclear mass defect and binding energy, evaluate stability on the binding energy curve, and analyze components of controlled nuclear reactors.',
    contentMarkdown: `### 1. Nuclear Binding Energy & Mass Defect

Precise mass spectrometer measurements reveal that **the rest mass of any stable nucleus is always less than the sum of the individual rest masses of its constituent protons and neutrons**.

This difference in mass is called the **mass defect ($\\Delta m$)**:
$$\\Delta m = \\left[ Z \\cdot m_p + (A - Z) \\cdot m_n \\right] - M_{\\text{nucleus}}$$

Where:
- $Z$ is the atomic number (number of protons).
- $A - Z$ is the number of neutrons.
- $m_p$ is proton mass ($1.007276\\text{ u}$).
- $m_n$ is neutron mass ($1.008665\\text{ u}$).
- $M_{\\text{nucleus}}$ is the experimentally determined mass of the bound nucleus.

#### Nuclear Binding Energy ($E_b$):
According to Einstein's mass-energy equivalence, the "missing" mass is released as binding energy when nucleons coalesce:
$$E_b = \\Delta m \\cdot c^2$$

Using unified atomic mass units ($1\\text{ u} = 1.6605 \\times 10^{-27}\\text{ kg} = 931.5\\text{ MeV}$):
$$E_b\\,(\\text{in MeV}) = \\Delta m\\,(\\text{in u}) \\times 931.5\\text{ MeV}$$

---

### 2. Binding Energy per Nucleon Curve and Nuclear Stability

$$\\text{Binding Energy per Nucleon} = \\frac{E_b}{A}$$

The binding energy per nucleon is the true criterion of nuclear stability:
- **Peak Stability:** The curve reaches a broad maximum at **Iron-56 ($^{56}_{26}\\text{Fe}$)** with approximately **$8.8\\text{ MeV per nucleon}$**. Iron-56 is the most thermodynamically stable nucleus in nature.
- **Nuclear Fission Pathway:** Heavy nuclei with $A > 200$ (e.g., $^{235}\\text{U}$) have lower binding energy per nucleon ($\\approx 7.6\\text{ MeV}$). Splitting them into medium-sized fragments yields daughter nuclei with higher binding energies per nucleon, releasing vast amounts of energy.
- **Nuclear Fusion Pathway:** Very light nuclei (e.g., $^{2}\\text{H}$, $^{3}\\text{H}$) have low binding energies per nucleon ($\\approx 1-3\\text{ MeV}$). Fusing them into heavier helium ($^{4}\\text{He}$, $\\approx 7.1\\text{ MeV}$) yields massive energy output per nucleon.

---

### 3. Architecture of a Controlled Nuclear Fission Reactor

| Component | Material Used | Specific Function in Reactor |
| :--- | :--- | :--- |
| **Nuclear Fuel** | Enriched Uranium-235 ($^{235}\\text{U}$) or Plutonium-239 | Undergoes induced nuclear fission upon absorbing thermal neutrons |
| **Moderator** | Heavy water ($\\text{D}_2\\text{O}$) or pure graphite | Slows down fast fission neutrons ($2\\text{ MeV} \\rightarrow 0.025\\text{ eV}$) via elastic collisions to sustain the chain reaction |
| **Control Rods** | Cadmium or Boron steel rods | High neutron-capture cross-section; inserted or withdrawn to regulate neutron flux and control reaction rate |
| **Coolant** | Pressurized liquid water, carbon dioxide gas, or liquid sodium | Absorbs intense fission heat from reactor core and transfers it to steam generators |
| **Radiation Shielding** | Thick lead lining encased in $2-3\\text{ meters}$ of high-density concrete | Absorbs escaping gamma rays and neutrons to protect operating personnel |`,
    keyTakeaways: [
      'Mass defect Δm is the difference between individual constituent nucleon masses and the bound nucleus mass.',
      'Nuclear binding energy is given by Eb = Δm × c² (or Δm in u × 931.5 MeV).',
      'Iron-56 has the highest binding energy per nucleon (~8.8 MeV) and is the most stable element in the universe.',
      'In a nuclear reactor, the moderator slows down fast neutrons, while control rods (cadmium/boron) absorb neutrons to prevent runaway reactions.'
    ],
    associatedQuizId: 'waec-ss3-phy-binding-energy-quiz'
  },

  // ==========================================
  // WEEK 10: SEMICONDUCTOR ELECTRONICS I
  // ==========================================
  {
    id: 'phy-ss3-term2-week10',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Semiconductor Electronics I: Band Theory, Doping, p-n Junction Diodes & Rectification',
    subtopics: [
      'Energy Band Theory in Solids: Valence Band, Conduction Band, and Forbidden Energy Gap (Eg)',
      'Intrinsic vs. Extrinsic Semiconductors: n-Type (Pentavalent) and p-Type (Trivalent) Doping',
      'The p-n Junction Diode: Depletion Layer Formation, Barrier Potential, Forward and Reverse Bias',
      'AC Rectification Circuits: Half-Wave, Full-Wave Bridge Rectification, and Smoothing Capacitors'
    ],
    readingTimeMinutes: 10,
    summary: 'Explore energy band theory, contrast n-type and p-type doping, study p-n junction diode dynamics, and evaluate half-wave and full-wave rectification circuits.',
    contentMarkdown: `### 1. Energy Band Theory of Solids

Electrons in isolated atoms occupy discrete energy levels. In crystalline solids, close proximity causes atomic orbitals to split into continuous bands:

- **Valence Band (VB):** The highest occupied energy band filled with valence electrons.
- **Conduction Band (CB):** The next higher unfilled band where electrons move freely to conduct electricity.
- **Forbidden Energy Gap ($E_g$):** The forbidden energy interval between valence and conduction bands.

| Material Class | Forbidden Gap ($E_g$) | Electrical Conductivity Characteristics | Typical Examples |
| :--- | :--- | :--- | :--- |
| **Conductors (Metals)** | $E_g = 0$ (VB overlaps CB) | High conductivity; abundance of free electrons; resistance increases with temperature | Copper, Aluminium, Silver |
| **Semiconductors** | Small gap ($E_g \\approx 0.7 - 1.1\\text{ eV}$) | Moderate conductivity at room temperature; **conductivity increases with temperature** | Silicon ($1.1\\text{ eV}$), Germanium ($0.7\\text{ eV}$) |
| **Insulators** | Very wide gap ($E_g > 5.0\\text{ eV}$) | Negligible conductivity; thermal energy cannot excite electrons across the broad gap | Diamond, Glass, Mica, Rubber |

---

### 2. Extrinsic Semiconductor Doping

An **intrinsic semiconductor** is a pure crystal (Silicon or Germanium). Its electrical conductivity at room temperature is relatively poor.

**Doping** is the deliberate addition of minute quantities of specific impurity atoms ($\\approx 1\\text{ atom in } 10^6$) to a pure semiconductor to substantially enhance its electrical conductivity:

1. **n-Type Semiconductor:**
   - **Dopant:** Pentavalent atoms with $5$ valence electrons (Phosphorus, Arsenic, Antimony).
   - Four valence electrons form covalent bonds with adjacent silicon atoms; the fifth electron is loosely bound and enters the conduction band as a **free conduction electron**.
   - **Majority Charge Carriers:** Free electrons ($e^-$).
   - **Minority Charge Carriers:** Positive holes ($h^+$).
2. **p-Type Semiconductor:**
   - **Dopant:** Trivalent atoms with $3$ valence electrons (Boron, Aluminium, Gallium, Indium).
   - Three valence electrons form covalent bonds with silicon; the missing fourth electron creates a vacant electron site called a **positive hole ($h^+$)**.
   - **Majority Charge Carriers:** Positive holes ($h^+$).
   - **Minority Charge Carriers:** Free electrons ($e^-$).

*Important WAEC Concept:* Even though doped semiconductors possess majority charge carriers, **both n-type and p-type crystals remain electrically neutral overall**, because the total number of protons in atomic nuclei balances the total number of electrons.

---

### 3. The p-n Junction Diode

When p-type and n-type semiconductor regions are formed within a single continuous crystal:
1. Free electrons from the n-side diffuse across the boundary into the p-side, recombining with holes.
2. This creates an unneutralized layer of positive donor ions on the n-side and negative acceptor ions on the p-side.
3. This charge-free region is called the **depletion layer**, and the resulting internal electric field establishes a **barrier potential** ($0.7\\text{ V}$ for Silicon, $0.3\\text{ V}$ for Germanium).

#### Biasing Conditions:
- **Forward Bias:** Connect positive battery terminal to p-side, negative to n-side. The external potential opposes and overcomes the internal barrier potential, narrowing the depletion layer and allowing large forward current to flow freely.
- **Reverse Bias:** Connect positive terminal to n-side, negative to p-side. The external potential widens the depletion layer, permitting only an extremely minute leakage current of minority carriers.

---

### 4. Alternating Current Rectification Circuits

**Rectification** is the conversion of bidirectional alternating current (AC) into unidirectional direct current (DC):

1. **Half-Wave Rectification:**
   - Employs a single diode in series with an AC supply.
   - Conducts current only during positive half-cycles; blocks negative half-cycles.
   - Efficiency is low (theoretical maximum $\\approx 40.6\\%$), producing pulsing, interrupted DC.
2. **Full-Wave Bridge Rectification:**
   - Employs four diodes arranged in a closed bridge network ($D_1, D_2, D_3, D_4$).
   - During positive half-cycles, $D_1$ and $D_3$ conduct; during negative half-cycles, $D_2$ and $D_4$ conduct. Current flows through the load resistor in the **exact same direction in both half-cycles**.
   - Efficiency is high (theoretical maximum $\\approx 81.2\\%$).
3. **Filter Circuit (Smoothing Capacitor):**
   - A large electrolytic capacitor connected in parallel across the load resistor charges up to peak voltage during conduction and discharges slowly into the load between peaks, smoothing output ripples into a steady DC voltage.`,
    keyTakeaways: [
      'In semiconductors, electrical resistance decreases and conductivity increases as temperature rises.',
      'n-type semiconductors use pentavalent dopants (free electrons majority); p-type use trivalent dopants (holes majority). Both crystals remain electrically neutral.',
      'A p-n junction conducts readily under forward bias (anode positive) and blocks current under reverse bias.',
      'A full-wave bridge rectifier utilizes four diodes to convert both halves of an AC cycle into pulsating DC, which is smoothed by a parallel capacitor.'
    ],
    associatedQuizId: 'waec-ss3-phy-semiconductors1-quiz'
  },

  // ==========================================
  // WEEK 11: SEMICONDUCTOR ELECTRONICS II
  // ==========================================
  {
    id: 'phy-ss3-term2-week11',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Semiconductor Electronics II: Bipolar Transistors, Switching Circuits & Digital Logic Gates',
    subtopics: [
      'Bipolar Junction Transistors (BJT): NPN and PNP Architecture, Emitter, Base, and Collector',
      'Transistor Currents and Current Amplification Factor: Ie = Ib + Ic and β = Ic / Ib',
      'Transistor as a Current Switch and Voltage Amplifier in Common Emitter Configuration',
      'Digital Logic Gates: Truth Tables, Boolean Algebra, and Circuit Symbols for AND, OR, NOT, NAND, NOR'
    ],
    readingTimeMinutes: 10,
    summary: 'Study bipolar junction transistors, analyze current amplification in common emitter circuits, and evaluate digital logic gates, boolean algebra, and truth tables.',
    contentMarkdown: `### 1. Bipolar Junction Transistors (BJT)

A **transistor** is a three-terminal semiconductor device formed by sandwiching a thin layer of one type of semiconductor between two thicker layers of the opposite type:

1. **NPN Transistor:** A thin p-type base sandwiched between two n-type regions (most common in practical circuits due to higher electron mobility).
2. **PNP Transistor:** A thin n-type base sandwiched between two p-type regions.

#### The Three Terminals:
- **Emitter ($E$):** Heavily doped to inject a large concentration of majority charge carriers into the base.
- **Base ($B$):** Extremely thin and lightly doped to minimize carrier recombination ($< 5\\%$).
- **Collector ($C$):** Moderately doped and physically large to collect carriers and dissipate heat.

#### Normal Biasing Mode (Active Region):
- **Emitter-Base Junction:** Always **forward biased** (low resistance).
- **Collector-Base Junction:** Always **reverse biased** (high resistance).

#### Fundamental Current Relations:
$$I_e = I_b + I_c$$
Where:
- $I_e$ is emitter current ($100\\%$).
- $I_b$ is base current (small, $\\approx 1\\% - 5\\%$).
- $I_c$ is collector current (large, $\\approx 95\\% - 99\\%$).

**Current Gain (Amplification Factor $\\beta$):**
$$\\beta = \\frac{I_c}{I_b} \\quad (\\text{Typical values range from } 50 \\text{ to } 300)$$

---

### 2. Transistor as a Switch and Amplifier

1. **Transistor as a Switch:**
   - **Cut-Off State (Switch OFF):** With no input base voltage ($V_b < 0.7\\text{ V}$), $I_b = 0$, so $I_c = 0$. The collector-emitter path acts as an open circuit; the load receives no current.
   - **Saturation State (Switch ON):** Applying sufficient base current drives the transistor into saturation ($V_{ce} \\approx 0.2\\text{ V}$); full collector current flows through the load.
2. **Transistor as an Amplifier:**
   In a **Common-Emitter (CE)** circuit, a small alternating signal voltage applied to the base causes large variations in collector current, producing an amplified output voltage across the collector load resistor $R_L$ with a **$180^\\circ$ phase inversion**.

---

### 3. Digital Logic Gates and Boolean Algebra

**Logic gates** are digital electronic circuits that operate on one or more binary inputs ($0$ or $1$) to produce a single binary output governed by logical rules:

| Logic Gate | Circuit Symbol Function | Boolean Expression | Input A | Input B | Output Y |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **NOT Gate (Inverter)** | Single input; inverts binary state | $Y = \\bar{A}$ | 0<br>1 | —<br>— | 1<br>0 |
| **AND Gate** | Output is HIGH ($1$) only when **both** inputs are HIGH | $Y = A \\cdot B$ | 0<br>0<br>1<br>1 | 0<br>1<br>0<br>1 | 0<br>0<br>0<br>1 |
| **OR Gate** | Output is HIGH ($1$) if **either** or both inputs are HIGH | $Y = A + B$ | 0<br>0<br>1<br>1 | 0<br>1<br>0<br>1 | 0<br>1<br>1<br>1 |
| **NAND Gate (Universal)** | Inverted AND gate; output is LOW only when both inputs are HIGH | $Y = \\overline{A \\cdot B}$ | 0<br>0<br>1<br>1 | 0<br>1<br>0<br>1 | 1<br>1<br>1<br>0 |
| **NOR Gate (Universal)** | Inverted OR gate; output is HIGH only when both inputs are LOW | $Y = \\overline{A + B}$ | 0<br>0<br>1<br>1 | 0<br>1<br>0<br>1 | 1<br>0<br>0<br>0 |

#### Universal Gates:
NAND and NOR gates are termed **universal gates** because combinations of either gate alone can synthesize all basic Boolean functions (NOT, AND, OR).`,
    keyTakeaways: [
      'In a bipolar junction transistor, emitter current equals base current plus collector current: Ie = Ib + Ic.',
      'The current amplification factor is β = Ic / Ib.',
      'In an active common-emitter amplifier, the output voltage is 180° out of phase with the input signal.',
      'NAND and NOR gates are universal gates capable of replicating any digital logic operation.'
    ],
    associatedQuizId: 'waec-ss3-phy-transistors-logic-quiz'
  },

  // ==========================================
  // WEEK 12: TERM REVIEW & PRACTICAL PHYSICS MASTERCLASS
  // ==========================================
  {
    id: 'phy-ss3-term2-week12',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Physics',
    term: '2nd Term',
    weekNumber: 12,
    topicTitle: 'Term Review & WAEC Practical Physics Masterclass: Experimental Techniques & Scoring Strategies',
    subtopics: [
      'Comprehensive Term Review: AC Circuits, Induction, Quantum Models, and Semiconductor Devices',
      'WAEC Practical Mechanics, Optics, and Electricity Experimental Protocols',
      'Data Table Construction, Error Margins, and Proper Decimal Precision Rules',
      'Graph Plotting Standards: Scale Selection, Line of Best Fit, Slope Calculation (S), and Precaution Statements'
    ],
    readingTimeMinutes: 10,
    summary: 'Consolidate 2nd Term physics principles, master WAEC practical laboratory protocols, graphing standards, slope calculations, and examination scoring rubrics.',
    contentMarkdown: `### 1. WAEC Practical Physics Paper Examination Standards

In the WAEC Practical Physics examination (Alternative A or B), students are assessed on three core practical categories:
1. **Mechanics:** Simple harmonic motion (pendulum, spiral spring), moments, and friction.
2. **Light / Optics:** Triangular glass prism refraction, rectangular glass block displacement, concave mirrors, and convex lenses.
3. **Current Electricity:** Potentiometer wire calibration, Metre bridge resistance determination, internal resistance and EMF of cells.

---

### 2. Tabulation and Significant Figure Discipline

Examiners deduct marks for improper data presentation. Every table of experimental readings must conform to the following standards:

1. **Table Column Headers:** Each column must have both the physical quantity name (or symbol) and the correct metric unit (e.g., $L / \\text{cm}$, $t / \\text{s}$, $T = t / 20 / \\text{s}$, $T^2 / \\text{s}^2$, $V / \\text{V}$, $I / \\text{A}$).
2. **Consistent Decimal Places:** All raw values measured with the same instrument must share the same precision:
   - Metre rule: Record to $1$ decimal place (e.g., $25.0\\text{ cm}$).
   - Stopwatch: Record to at least $1$ or $2$ decimal places (e.g., $18.42\\text{ s}$).
   - Ammeters / Voltmeters: Match instrument scale divisions (e.g., $0.25\\text{ A}$).
3. **Repeated Timing:** In timing experiments (e.g., $20$ oscillations), always record two independent timing trials ($t_1, t_2$), calculate the mean time $t_{\\text{mean}} = \\frac{t_1 + t_2}{2}$, and compute the period $T = \\frac{t_{\\text{mean}}}{20}$.

---

### 3. Graph Plotting Standards in WAEC Physics

| Criterion | Mandatory Requirement | Common Mistakes to Avoid |
| :--- | :--- | :--- |
| **Graph Title** | Must state dependent variable vs. independent variable: *"Graph of $T^2 / \\text{s}^2$ against $L / \\text{cm}$"* | Incomplete title or omitting units |
| **Scale Selection** | Must occupy **more than $50\\%$ of the grid** in both axes; must use clean multiples: $1, 2, 5, 10$ units per $2\\text{ cm}$ major square | Never use awkward scales like $3, 7, 9$ units per square |
| **Plotting Points** | Mark data points with a sharp fine dot enclosed in a small circle ($\\odot$) or a fine cross ($\\times$) | Large blurry blobs or uncircled pencil smudges |
| **Line of Best Fit** | A single continuous straight line with an even balance of points on either side | "Dot-to-dot" zig-zag lines, or forcing the line through origin when an intercept exists |
| **Slope Determination ($S$)** | Construct a **large right-angled triangle** whose hypotenuse covers at least $50\\%$ of the plotted line: $S = \\frac{y_2 - y_1}{x_2 - x_1}$ | Using recorded table data points directly instead of reading coordinates on the line |

---

### 4. Standard Precaution Statements in WAEC Examinations

Candidates are consistently required to state two precautions taken to ensure accurate results. Common acceptable statements include:

- **Mechanics Experiments:**
  - *"Ensured oscillations were strictly in a vertical plane without conical swinging."*
  - *"Turned off ceiling fans and closed windows to minimize air resistance during oscillations."*
  - *"Avoided parallax error when reading the metre rule by keeping the line of sight perpendicular to the scale."*
- **Optics Experiments:**
  - *"Ensured pins were placed vertically upright and separated by a distance of at least $5\\text{ cm}$ for sharp alignment."*
  - *"Avoided parallax error by aligning the feet of optical pins rather than their heads."*
  - *"Performed the experiment in a dimly lit environment to ensure distinct, sharp optical images."*
- **Electricity Experiments:**
  - *"Ensured all wire connections were scraped clean with sandpaper and tightened firmly to prevent contact resistance."*
  - *"Removed the key between readings to prevent cell polarization and wire heating which changes resistance."*
  - *"Checked and adjusted for zero error on the ammeter and voltmeter before starting measurements."*`,
    keyTakeaways: [
      'In WAEC practical tables, every column header must include both the quantity symbol and its metric unit.',
      'The graph triangle for slope calculation must be large, covering at least 50% of the drawn line of best fit.',
      'Coordinates for slope calculations must be read directly from points on the drawn line, not from raw table data.',
      'Always document two clear precautions (e.g., minimizing parallax error, tightening wire terminals, avoiding draft air currents).'
    ],
    associatedQuizId: 'waec-ss3-phy-practical-masterclass-quiz'
  }
];
