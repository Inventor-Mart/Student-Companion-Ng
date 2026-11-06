import { CurriculumTopic } from '../types';

export const SS3_BIOLOGY_TOPICS: CurriculumTopic[] = [
  // ==========================================
  // WEEK 1: THE NERVOUS SYSTEM (CNS & PNS)
  // ==========================================
  {
    id: 'bio-ss3-term2-week1',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'The Human Nervous System: Central, Peripheral & Synaptic Transmission',
    subtopics: [
      'Organization of the Nervous System: Central Nervous System (CNS) vs. Peripheral Nervous System (PNS)',
      'Gross Anatomy of the Human Brain: Cerebrum, Cerebellum, Medulla Oblongata, and Thalamus/Hypothalamus',
      'Structural and Functional Classification of Neurons: Sensory (Afferent), Motor (Efferent), and Relay (Interneurons)',
      'Synaptic Transmission: Neurotransmitters (Acetylcholine), Synaptic Cleft, and Action Potential Propagation'
    ],
    readingTimeMinutes: 9,
    summary: 'Analyze the cellular and gross anatomical organization of the human nervous system, contrast brain regions, explore neuron histology, and track electrochemical nerve impulse propagation across synapses.',
    contentMarkdown: `### 1. Structural Divisions of the Nervous System

The mammalian nervous system coordinates rapid responses to internal and external stimuli through two coordinated divisions:

| Division | Primary Organs | Functional Specialization |
| :--- | :--- | :--- |
| **Central Nervous System (CNS)** | **Brain** & **Spinal Cord** | Acts as supreme control center: integrates sensory inputs, processes data, stores memories, and issues motor commands |
| **Peripheral Nervous System (PNS)** | **12 Cranial Nerves** & **31 pairs of Spinal Nerves** | Conduits carrying impulses between peripheral sensory receptors, the CNS, and effector muscles/glands |
| **Autonomic Nervous System (ANS)** | Sympathetic & Parasympathetic nerves | Involuntary homeostatic regulation of visceral organs (heart rate, peristalsis, pupil dilation) |

---

### 2. Major Brain Regions and Their Functions

1. **Cerebrum (Forebrain):**
   - Largest brain component; divided into left and right hemispheres connected by the **corpus callosum**.
   - Seat of conscious thought, intelligence, memory, voluntary locomotion, speech, and sensory perception.
2. **Cerebellum (Hindbrain):**
   - Located below the posterior cerebrum; highly folded surface.
   - Coordinates voluntary muscular movements, posture, and motor balance.
3. **Medulla Oblongata (Brainstem):**
   - Connects the brain to the spinal cord.
   - Controls autonomic vital involuntary reflexes: heart rate, respiratory rate, blood pressure, swallowing, and vomiting.
4. **Hypothalamus:**
   - Controls homeostatic thermoregulation, osmoregulation (water balance), hunger, thirst, sleep, and masterminds the endocrine pituitary gland.

---

### 3. Classification of Neurons & Synaptic Transmission

A **neuron** is the fundamental structural and functional unit of the nervous system:
- **Sensory (Afferent) Neuron:** Long dendron, short axon; cell body located in the dorsal root ganglion outside the spinal cord. Transmits impulses from sensory receptors to the CNS.
- **Relay (Interneuron) Neuron:** Short dendrites and axon; located entirely within the grey matter of the spinal cord/brain.
- **Motor (Efferent) Neuron:** Short dendrites around cell body in CNS grey matter, long axon extending to effector muscles or glands.
- **Synaptic Cleft:** The microscopic microscopic gap between adjacent neurons. Arrival of an electrical action potential triggers the release of chemical **neurotransmitters** (e.g., **acetylcholine**), which diffuse across the cleft to bind receptor sites on the postsynaptic membrane.`,
    keyTakeaways: [
      'The CNS comprises the brain and spinal cord, while the PNS consists of cranial and spinal nerves.',
      'The cerebrum controls voluntary thought and memory; the cerebellum coordinates muscular balance.',
      'The medulla oblongata regulates vital involuntary autonomic processes like heartbeat and breathing.',
      'Nerve impulses cross microscopic synaptic clefts chemically using neurotransmitters like acetylcholine.'
    ],
    associatedQuizId: 'bio-ss3-nervous-system-quiz'
  },

  // ==========================================
  // WEEK 2: REFLEX ACTIONS & THE REFLEX ARC
  // ==========================================
  {
    id: 'bio-ss3-term2-week2',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Reflex Actions & The Reflex Arc: Spinal Pathways & Conditioned Reflexes',
    subtopics: [
      'Voluntary vs. Involuntary Actions: Distinguishing Conscious Decisions from Automatic Reflexes',
      'The Reflex Arc Pathway: Receptor, Sensory Neuron, Dorsal Root, Relay, Ventral Root, and Effector',
      'Simple Inborn Reflexes: The Knee-Jerk Reflex, Pupil Light Reflex, and Immediate Heat Withdrawal',
      'Conditioned Reflexes: Ivan Pavlov’s Classical Conditioning Experiments and Behavioral Modification'
    ],
    readingTimeMinutes: 8,
    summary: 'Investigate autonomic defensive reflexes, trace the anatomical trajectory of the spinal reflex arc, contrast inborn reflexes with Pavlovian conditioned reflexes, and assess biological survival value.',
    contentMarkdown: `### 1. Involuntary Reflexes vs. Voluntary Actions

A **reflex action** is an immediate, automatic, involuntary, and stereotypic motor response to a specific sensory stimulus without conscious intervention by the brain:

| Feature | Simple Reflex Action | Voluntary Action |
| :--- | :--- | :--- |
| **Conscious Will** | Completely involuntary; operates without conscious thought | Initiated consciously by deliberate choice of the cerebrum |
| **Processing Center** | Spinal cord or brainstem (lower autonomic centers) | Cerebral cortex of the brain |
| **Response Speed** | Extremely rapid / instantaneous (defensive survival value) | Slower, involves conscious evaluation, memory, and hesitation |
| **Examples** | Jerking hand from a hot iron, blinking when dust flies into eye | Solving a mathematics equation, writing an essay, playing football |

---

### 2. Anatomical Trajectory of the Spinal Reflex Arc

[Diagram: bio-reflex-arc-neural-pathway]

The anatomical pathway traversed by nerve impulses during a reflex action is known as the **reflex arc**:

$$\\text{Stimulus} \\longrightarrow \\text{Receptor} \\longrightarrow \\text{Sensory Neuron} \\longrightarrow \\text{Relay Neuron (Synapse)} \\longrightarrow \\text{Motor Neuron} \\longrightarrow \\text{Effector} \\longrightarrow \\text{Response}$$

1. **Receptor (Skin):** Pain receptors detect a sharp stimulus and generate an action potential.
2. **Sensory Neuron (Afferent):** Transmits impulse toward the spinal cord via the **dorsal root ganglion**.
3. **Relay Neuron (Interneuron):** Located within the central grey matter of the spinal cord; acts as a routing switchboard.
4. **Motor Neuron (Efferent):** Carries the motor impulse out through the **ventral root** of the spinal cord to the muscle.
5. **Effector (Muscle):** The biceps muscle contracts, withdrawing the limb from danger before the brain even registers the sensation of pain.

---

### 3. Conditioned Reflexes (Ivan Pavlov's Experiments)

A **conditioned reflex** is an acquired, learned response developed through repetitive association of an unnatural (conditioned) stimulus with a natural (unconditioned) stimulus:
- **Unconditioned Stimulus (Food):** Elicits natural unconditioned salivation.
- **Conditioned Stimulus (Bell):** Initially elicits no salivation.
- **Conditioning Process:** Ringing the bell immediately before presenting food repeatedly.
- **Conditioned Response:** Ringing the bell alone eventually triggers intense salivation in the absence of food.`,
    keyTakeaways: [
      'Reflex actions are instantaneous and involuntary, protecting organisms from physical trauma.',
      'The reflex arc passes through the dorsal root (sensory) and ventral root (motor) of the spinal cord.',
      'The grey matter contains cell bodies and synapses; the white matter consists of myelinated axons.',
      'Ivan Pavlov demonstrated that conditioned reflexes are learned through repetitive stimulus association.'
    ],
    associatedQuizId: 'bio-ss3-reflex-arc-quiz'
  },

  // ==========================================
  // WEEK 3: SENSE ORGANS: THE EYE (ANATOMY & OPTICS)
  // ==========================================
  {
    id: 'bio-ss3-term2-week3',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Sense Organs: Gross Anatomy of the Eye, Image Formation & Vision Defects',
    subtopics: [
      'Anatomy of the Human Eye: Sclera, Cornea, Choroid, Ciliary Body, Iris, Pupil, Lens, and Retina',
      'The Optical Mechanism of Image Formation and Photoreception (Rods vs. Cones in the Fovea)',
      'The Mechanism of Visual Accommodation for Near and Distant Viewing',
      'Vision Defects and Optical Corrections: Myopia, Hypermetropia, Astigmatism, and Presbyopia'
    ],
    readingTimeMinutes: 9,
    summary: 'Deconstruct the optical architecture of the mammalian eyeball, analyze photoreceptor distribution, investigate ciliary accommodation, and evaluate corrective lenses for vision defects.',
    contentMarkdown: `### 1. Structural Layers of the Mammalian Eye

[Diagram: bio-human-eye-optics]

The human eyeball consists of three concentric structural coats and clear refractive optical media:

| Eye Layer | Key Structural Components | Optical & Physiological Functions |
| :--- | :--- | :--- |
| **Outer Fibrous Layer** | **Sclera** & **Cornea** | Sclera is tough, opaque white coat protecting the eyeball; Cornea is transparent anterior window that provides 70% of total light refraction |
| **Middle Vascular Layer** | **Choroid**, **Ciliary Body**, **Iris** | Choroid is pigmented black to prevent internal light reflection and nourishes retina; Ciliary body adjusts lens curvature; Iris regulates pupil diameter |
| **Inner Nervous Layer** | **Retina**, **Fovea (Yellow Spot)**, **Optic Disc (Blind Spot)** | Retina contains photoreceptors: **Rods** (scotopic monochrome night vision) and **Cones** (photopic color vision concentrated at the Fovea Centralis) |

---

### 2. The Mechanism of Accommodation

**Accommodation** is the reflex adjustment of the optical power of the crystalline lens to maintain sharp retinal focus as viewing distance changes:

- **Viewing a Distant Object ($> 6\\text{ meters}$):**
  - Ciliary muscles **relax** $\\implies$ Suspensory ligaments become **taut (tight)** $\\implies$ Lens is pulled into a **thin, flattened** shape with long focal length.
- **Viewing a Near Object ($< 6\\text{ meters}$):**
  - Ciliary muscles **contract** $\\implies$ Suspensory ligaments become **slack (loose)** $\\implies$ Lens bulges into a **thick, convex** shape with short focal length.

---

### 3. Vision Defects & Corrective Optical Lenses

1. **Short-Sightedness (Myopia):**
   - *Cause:* Eyeball is too long from front to back, or lens is too convex; light rays converge **in front of the retina**. Distant objects appear blurred.
   - *Correction:* Wear spectacles with a **concave (diverging) lens** to push the focal point back onto the retina.
2. **Long-Sightedness (Hypermetropia):**
   - *Cause:* Eyeball is too short, or lens is too flat; light rays converge **behind the retina**. Near objects appear blurred.
   - *Correction:* Wear spectacles with a **convex (converging) lens** to bring the focal point forward onto the retina.
3. **Astigmatism:** Uneven curvature of the cornea or lens causing distorted vision; corrected using **cylindrical lenses**.
4. **Presbyopia:** Age-related loss of lens elasticity; corrected using **bifocal lenses**.`,
    keyTakeaways: [
      'The cornea provides the majority of light refraction, while the crystalline lens fine-tunes focus.',
      'Rods detect dim light and movement; cones detect bright light and color vision at the fovea.',
      'To view near objects, ciliary muscles contract, suspensory ligaments slacken, and the lens thickens.',
      'Myopia (short-sightedness) is corrected with a concave lens; hypermetropia is corrected with a convex lens.'
    ],
    associatedQuizId: 'bio-ss3-eye-anatomy-quiz'
  },

  // ==========================================
  // WEEK 4: SENSE ORGANS: THE EAR & MAMMALIAN SKIN
  // ==========================================
  {
    id: 'bio-ss3-term2-week4',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Sense Organs: Anatomy of the Ear (Hearing & Balance) & Skin Receptors',
    subtopics: [
      'The Three Structural Divisions of the Ear: Outer, Middle, and Inner Ear',
      'The Mechanism of Hearing: Tympanic Membrane, Ossicles, Cochlea, and the Organ of Corti',
      'The Mechanism of Equilibrium and Balance: Semicircular Canals, Ampullae, and Otolith Organs',
      'Mammalian Skin as a Multifunctional Sense Organ: Pain, Touch, Pressure, and Thermoreception'
    ],
    readingTimeMinutes: 8,
    summary: 'Study the dual sensory functions of the mammalian ear (auditory reception and dynamic balance), follow sound wave transduction through the cochlea, and map tactile skin sensory receptors.',
    contentMarkdown: `### 1. Dual Physiology of the Mammalian Ear

The ear is a specialized organ serving two independent sensory modalities: **hearing (phonoreception)** and **equilibrium (stato-reception)**:

| Structural Division | Anatomical Components | Physiological Function |
| :--- | :--- | :--- |
| **Outer Ear** | **Pinna**, **External Auditory Canal**, **Tympanic Membrane (Eardrum)** | Pinna collects and funnels sound waves; eardrum vibrates synchronously with sound frequencies |
| **Middle Ear** | **Ear Ossicles (Malleus/Hammer, Incus/Anvil, Stapes/Stirrup)** & **Eustachian Tube** | Ossicles amplify sound vibrations $20\\times$ and transmit them to the oval window; Eustachian tube equalizes air pressure across the eardrum |
| **Inner Ear (Labyrinth)**| **Cochlea** (Hearing) and **Semicircular Canals** (Balance) | Cochlea houses the fluid-filled **Organ of Corti** containing mechanoreceptive hair cells; Semicircular canals detect head rotational acceleration |

---

### 2. Path of Sound Waves in Hearing

$$\\text{Sound Waves} \\to \\text{Pinna} \\to \\text{Eardrum Vibrations} \\to \\text{Ossicles Amplification} \\to \\text{Oval Window} \\to \\text{Perilymph & Endolymph Waves} \\to \\text{Organ of Corti Hairs} \\to \\text{Auditory Nerve} \\to \\text{Brain (Temporal Lobe)}$$

---

### 3. The Skin as a Sensory and Homeostatic Organ

The mammalian skin contains distinct specialized sensory nerve endings scattered across the dermis:
- **Meissner's Corpuscles:** Sensitive to light touch; highly concentrated on fingertips, lips, and palms.
- **Pacinian Corpuscles:** Located deep in the dermis; respond to heavy mechanical pressure and vibrations.
- **Free Nerve Endings:** Non-encapsulated dendrites detecting pain, extreme heat, and severe cold.
- **Thermoreceptors (Krause's bulbs & Ruffini endings):** Specialized for cold and heat detection, aiding homeostatic body temperature regulation.`,
    keyTakeaways: [
      'The ear serves dual sensory functions: hearing in the cochlea and balance in the semicircular canals.',
      'The three ear ossicles (Malleus, Incus, Stapes) amplify acoustic vibrations 20-fold.',
      'The Eustachian tube equalizes air pressure between the middle ear cavity and the pharynx.',
      'The skin contains specialized receptors for light touch (Meissner), deep pressure (Pacinian), and pain.'
    ],
    associatedQuizId: 'bio-ss3-ear-skin-quiz'
  },

  // ==========================================
  // WEEK 5: THE ENDOCRINE SYSTEM & HORMONES
  // ==========================================
  {
    id: 'bio-ss3-term2-week5',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'The Endocrine System: Hormonal Coordination, Target Organs & Feedback Loops',
    subtopics: [
      'Characteristics of Hormones: Ductless Secretions, Bloodstream Transport, and Specific Target Receptors',
      'Comparison between Nervous Coordination and Hormonal (Endocrine) Coordination',
      'The Master Gland (Pituitary) and Major Endocrine Organs: Thyroid, Adrenals, Pancreas, and Gonads',
      'Endocrine Disorders: Hypo-secretion and Hyper-secretion Syndromes (Gigantism, Dwarfism, Goiter, Diabetes)'
    ],
    readingTimeMinutes: 8,
    summary: 'Investigate chemical coordination via ductless glands, contrast hormonal with nervous responses, map major endocrine hormones to target organs, and assess clinical deficiency and hyper-secretion disorders.',
    contentMarkdown: `### 1. Comparison: Nervous vs. Endocrine Coordination

| Parameter | Nervous Coordination | Endocrine (Hormonal) Coordination |
| :--- | :--- | :--- |
| **Transmission Nature** | Electrochemical impulses along nerve axons | Chemical messengers (**hormones**) secreted into bloodstream |
| **Speed of Action** | Extremely fast / instantaneous (milliseconds) | Relatively slow (minutes, hours, or days) |
| **Pathway** | Directed along specific neural wiring | Circulates universally in blood, but only binds specific **target cells** |
| **Duration of Effect** | Short-lived and localized (e.g., muscle twitch) | Long-lasting and widespread (e.g., metabolic growth, puberty) |

---

### 2. Major Endocrine Glands, Hormones & Target Organs

1. **Pituitary Gland ("Master Gland"):**
   - Situated at the base of the brain; controlled by the hypothalamus.
   - *Growth Hormone (GH / Somatotropin):* Promotes bone and tissue elongation.
   - *Thyroid-Stimulating Hormone (TSH):* Triggers thyroid hormone synthesis.
   - *Antidiuretic Hormone (ADH / Vasopressin):* Regulates water reabsorption in kidney collecting ducts.
2. **Thyroid Gland:**
   - Located in the neck around the trachea; secretes **Thyroxine** (contains iodine).
   - Regulates Basal Metabolic Rate (BMR) and cellular respiration.
3. **Adrenal Glands:**
   - Located atop each kidney.
   - *Adrenal Medulla:* Secretes **Adrenaline** (the "fight or flight" emergency hormone) causing tachycardia, pupil dilation, and glycogen breakdown into glucose.
4. **Pancreas (Islets of Langerhans):**
   - *Beta Cells:* Secrete **Insulin** (converts excess blood glucose into storage glycogen).
   - *Alpha Cells:* Secrete **Glucagon** (converts stored glycogen back into glucose during fasting).

---

### 3. Endocrine Disorders

- **Growth Hormone:** Childhood hypo-secretion causes **Pituitary Dwarfism**; childhood hyper-secretion causes **Gigantism**; adult hyper-secretion causes **Acromegaly**.
- **Thyroxine:** Iodine deficiency causes **Endemic Goiter**; childhood deficiency causes mental and physical stunting (**Cretinism**); hyper-secretion causes **Graves' Disease (Exophthalmic Goiter)**.
- **Insulin Deficiency:** Causes **Diabetes Mellitus** (persistent hyperglycemia, glycosuria, and excessive thirst).`,
    keyTakeaways: [
      'Hormones are chemical messengers secreted directly into the blood by ductless glands.',
      'The pituitary gland is the master gland regulating other endocrine glands via tropic hormones.',
      'Insulin lowers blood sugar by forming glycogen; glucagon raises blood sugar by breaking down glycogen.',
      'Adrenaline coordinates rapid "fight or flight" physiological adaptations to acute danger.'
    ],
    associatedQuizId: 'bio-ss3-endocrine-system-quiz'
  },

  // ==========================================
  // WEEK 6: MID-TERM PRACTICAL BIOLOGICAL DRAWINGS
  // ==========================================
  {
    id: 'bio-ss3-term2-week6',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Practical Biology: Biological Drawing Conventions & Magnification Calculations',
    subtopics: [
      'WAEC Biological Drawing Regulations: Sharp Lines, Zero Shading, Title, and Label Lines',
      'The Mathematical Calculation of Linear Magnification: $M = \\frac{\\text{Length of Drawing}}{\\text{Actual Length of Specimen}}$',
      'Anatomical Sectioning: Transverse Sections (TS), Longitudinal Sections (LS), and Sagittal Cuts',
      'Step-by-Step Practical Drawing of the Mammalian Eye, Kidney, and Flower Anatomy'
    ],
    readingTimeMinutes: 8,
    summary: 'Master standard WAEC biological drawing criteria, calculate linear magnification with exact units, avoid shading penalties, and structure horizontal label lines to secure maximum practical marks.',
    contentMarkdown: `### 1. Mandatory WAEC Biological Drawing Rules

In WAEC Biology Practical examinations, candidates routinely lose 50% of available drawing marks due to non-compliance with international technical standards:

| Drawing Criterion | Examiner’s Strict Requirement | Common Student Penalty |
| :--- | :--- | :--- |
| **Clarity of Lines** | Continuous, sharp, smooth pencil lines made with a sharpened 2H or HB pencil | Broken, fuzzy, woolly, or double lines receive an automatic penalty |
| **No Shading Policy** | **Strictly ZERO shading**, artistic stippling, or coloring | Any shading results in immediate deduction of aesthetic marks |
| **Labeling Lines** | Must be drawn with a **ruler**, parallel, completely horizontal, non-overlapping | Crooked lines, criss-crossing lines, or arrowheads forfeit label marks |
| **Label Text** | Written horizontally in lowercase or block letters, without punctuation | Vertical or diagonal text loses lettering clarity marks |
| **Drawing Title** | Must state the exact specimen, anatomical view, and section type at the top or bottom | Missing title forfeits 1 whole mark |
| **Magnification ($M$)** | Must state linear magnification at the bottom right corner (e.g., $\\times 1.5$ or $\\times 2$) | Missing or mathematically inaccurate magnification forfeits 1 mark |

---

### 2. Calculating Linear Magnification ($M$)

$$\\text{Magnification } (M) = \\frac{\\text{Measured Length of Drawing (in mm)}}{\\text{Actual Measured Length of Specimen (in mm)}} = \\frac{\\text{Image Size } (I)}{\\text{Actual Size } (A)}$$

#### Rules for Magnification Formatting:
1. Always measure both drawing and specimen in **identical metric units** (preferably millimeters, mm).
2. Write the magnification preceded by the multiplication symbol $\\times$ (e.g., $\\times 1.5$, $\\times 2$, $\\times 0.5$).
3. **Never include units** in the final magnification figure because magnification is a dimensionless ratio.

#### Worked Practical Example:
A dissected mammalian kidney measures $40\\text{ mm}$ in actual length. The student draws the kidney with a length of $80\\text{ mm}$.
$$\\text{Magnification} = \\frac{80\\text{ mm}}{40\\text{ mm}} = \\times 2.0$$`,
    keyTakeaways: [
      'Biological drawings must use continuous, clear single lines without artistic shading.',
      'All guideline label lines must be ruled horizontally and must never cross one another.',
      'Magnification equals drawing size divided by actual specimen size: M = I / A.',
      'Magnification is written with a multiplication cross (e.g., ×2.5) and carries no units.'
    ],
    associatedQuizId: 'bio-ss3-drawing-conventions-quiz'
  },

  // ==========================================
  // WEEK 7: GENETICS: MENDELIAN MONOHYBRID CROSSES
  // ==========================================
  {
    id: 'bio-ss3-term2-week7',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Genetics I: Mendelian Inheritance, Monohybrid Crosses & Gene Segregation',
    subtopics: [
      'Fundamental Genetic Terminology: Gene, Allele, Locus, Genotype, Phenotype, Homozygous, Heterozygous',
      'Gregor Mendel’s Pea Plant Experiments (*Pisum sativum*) and Selection Criteria',
      'Mendel’s First Law: The Law of Segregation of Alleles during Meiotic Gametogenesis',
      'Monohybrid Cross Construction using the Punnett Square to Predict $3:1$ F₂ Phenotypic Ratios'
    ],
    readingTimeMinutes: 9,
    summary: 'Unpack foundational Mendelian genetics, master terminology from alleles to phenotypes, analyze the Law of Segregation, and calculate phenotypic and genotypic frequencies using Punnett squares.',
    contentMarkdown: `### 1. Essential Genetic Terminology

Genetics is the biological study of heredity and the variation of inherited characteristics:

| Genetic Concept | Scientific Definition | Concrete Example |
| :--- | :--- | :--- |
| **Gene** | Basic unit of heredity; segment of DNA on a chromosome encoding a specific protein | Gene for stem height in pea plants |
| **Allele** | Alternative morphological form of a specific gene residing at the same locus | Tall allele ($T$) vs. Dwarf allele ($t$) |
| **Genotype** | Complete genetic makeup or allele combination of an individual organism | $TT$ (Homozygous dominant), $Tt$ (Heterozygous), $tt$ (Homozygous recessive) |
| **Phenotype** | Physical, observable morphological expression of the genotype | Tall stem vs. Dwarf stem |
| **Dominant Allele** | Allele that fully expresses its phenotype even in the presence of an alternative allele | $T$ masks the presence of $t$ in $Tt$ |
| **Recessive Allele** | Allele whose phenotypic expression is suppressed unless present in homozygous state | Dwarfism only expresses in $tt$ |

---

### 2. Mendel's First Law: The Law of Segregation

> *"The characteristics of an organism are controlled by pairs of alleles which separate (segregate) from each other during meiosis, so that each gamete receives only one allele from the pair."*

---

### 3. Monohybrid Cross Walkthrough (Tall × Dwarf)

Let Tall ($T$) be dominant over Dwarf ($t$):
- **Parents ($P_1$):** Pure-breeding Tall ($TT$) $\\times$ Pure-breeding Dwarf ($tt$)
- **Gametes:** $T, T$ and $t, t$
- **$F_1$ Generation:** All offspring have genotype $Tt$ (100% Phenotypically **Tall**).

#### Selfing the $F_1$ Generation ($Tt \\times Tt$):

| Gametes | $T$ | $t$ |
| :---: | :---: | :---: |
| **$T$** | **$TT$** (Tall) | **$Tt$** (Tall) |
| **$t$** | **$Tt$** (Tall) | **$tt$** (Dwarf) |

- **Genotypic Ratio of $F_2$:** $1\\,TT : 2\\,Tt : 1\\,tt$ ($1:2:1$)
- **Phenotypic Ratio of $F_2$:** $3\\text{ Tall} : 1\\text{ Dwarf}$ ($3:1$)`,
    keyTakeaways: [
      'An organism’s genotype is its genetic allele code; its phenotype is its observable physical trait.',
      'The Law of Segregation states that paired alleles separate so each gamete carries only one allele.',
      'A monohybrid cross between two heterozygotes (Tt × Tt) produces a 3:1 phenotypic ratio.',
      'The corresponding genotypic ratio is 1 homozygous dominant : 2 heterozygous : 1 homozygous recessive.'
    ],
    associatedQuizId: 'bio-ss3-monohybrid-genetics-quiz'
  },

  // ==========================================
  // WEEK 8: DIHYBRID CROSSES & NON-MENDELIAN GENETICS
  // ==========================================
  {
    id: 'bio-ss3-term2-week8',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Genetics II: Dihybrid Crosses, Incomplete Dominance & Blood Groups',
    subtopics: [
      'Mendel’s Second Law: The Law of Independent Assortment and Dihybrid Cross Construction',
      'The Classic $9:3:3:1$ F₂ Dihybrid Phenotypic Ratio via the 16-Cell Punnett Square',
      'Deviations from Mendelian Dominance: Incomplete Dominance (Mirabilis jalapa) and Co-Dominance',
      'Multiple Alleles and the ABO Blood Group System ($I^A$, $I^B$, $I^O$) and Rhesus Factor (+/-)'
    ],
    readingTimeMinutes: 9,
    summary: 'Analyze two-factor dihybrid crosses, evaluate Mendel’s Law of Independent Assortment generating the 9:3:3:1 ratio, and investigate non-Mendelian co-dominance and human ABO blood groups.',
    contentMarkdown: `### 1. Mendel's Second Law: Independent Assortment

[Diagram: bio-genetics-punnett-square]

> *"During gamete formation, the alleles for two or more independent pairs of contrasting traits segregate and assort into gametes completely independently of each other."*

In a dihybrid cross involving Seed Shape (**Round $R$ vs. Wrinkled $r$**) and Seed Color (**Yellow $Y$ vs. Green $y$**):
- Crossing pure parents $RRYY \\times rryy$ yields $100\\%$ heterozygous Round Yellow ($RrYy$) in the $F_1$ generation.
- Selfing $F_1$ ($RrYy \\times RrYy$) creates 4 gametes from each parent: $RY, Ry, rY, ry$.
- The 16-cell Punnett square produces the classic **$9:3:3:1$ F₂ Phenotypic Ratio**:
  - $9/16$ **Round Yellow** ($R\\_Y\\_$)
  - $3/16$ **Round Green** ($R\\_yy$)
  - $3/16$ **Wrinkled Yellow** ($rrY\\_$)
  - $1/16$ **Wrinkled Green** ($rryy$)

---

### 2. Incomplete Dominance vs. Co-Dominance

| Inheritance Pattern | Genetic Mechanism | Classic Example & Phenotypic Outcome |
| :--- | :--- | :--- |
| **Incomplete Dominance** | Neither allele is completely dominant; heterozygotes exhibit an **intermediate blended phenotype** | Four O’Clock plant (*Mirabilis jalapa*): Red flower ($RR$) $\\times$ White flower ($WW$) $\\implies$ 100% **Pink flowers** ($RW$). $F_2$ ratio is $1\\text{ Red} : 2\\text{ Pink} : 1\\text{ White}$ |
| **Co-Dominance** | Both alleles express fully and independently in the heterozygote without blending | Human **AB Blood Group**: Allele $I^A$ and $I^B$ both express, producing both antigen A and antigen B simultaneously on red blood cells |

---

### 3. Multiple Alleles: The ABO Blood Group System

The ABO blood group is controlled by a single gene locus with three alternative alleles: $I^A$, $I^B$, and $I^O$:
- $I^A$ and $I^B$ are **co-dominant** to each other.
- $I^O$ is **recessive** to both $I^A$ and $I^B$.

| Blood Group (Phenotype) | Possible Genotypes | Antigens on RBC | Antibodies in Plasma | Can Donate Blood To |
| :--- | :--- | :--- | :--- | :--- |
| **Group A** | $I^A I^A$ or $I^A I^O$ | Antigen A | Anti-B | Groups A, AB |
| **Group B** | $I^B I^B$ or $I^B I^O$ | Antigen B | Anti-A | Groups B, AB |
| **Group AB** | $I^A I^B$ | Antigens A and B | None | Group AB only (Universal Recipient) |
| **Group O** | $I^O I^O$ | Neither antigen | Anti-A and Anti-B | All Groups (Universal Donor) |`,
    keyTakeaways: [
      'The Law of Independent Assortment governs dihybrid crosses, yielding a 9:3:3:1 F2 ratio.',
      'Incomplete dominance produces blended intermediate phenotypes (e.g., pink flowers from red and white).',
      'In co-dominance, both alleles express simultaneously, as seen in AB blood group.',
      'Blood group O is the universal donor; blood group AB is the universal recipient.'
    ],
    associatedQuizId: 'bio-ss3-dihybrid-crosses-quiz'
  },

  // ==========================================
  // WEEK 9: HEREDITY & HUMAN VARIATION
  // ==========================================
  {
    id: 'bio-ss3-term2-week9',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Heredity & Human Variation: Morphological, Physiological & Sex Linkage',
    subtopics: [
      'Types of Biological Variation: Morphological (Physical Form) vs. Physiological (Function)',
      'Continuous Variation (Normal Distribution Curves) vs. Discontinuous Variation (Discrete Categories)',
      'Chromosomal Mechanism of Human Sex Determination ($XX$ Female vs. $XY$ Male)',
      'Sex-Linked Inheritance: Hemophilia and Red-Green Color Blindness Carried on the X-Chromosome'
    ],
    readingTimeMinutes: 8,
    summary: 'Distinguish continuous from discontinuous human variation, examine the 50:50 chromosomal sex determination mechanism, and analyze sex-linked traits like hemophilia and color blindness.',
    contentMarkdown: `### 1. Continuous vs. Discontinuous Variation

Variation refers to morphological and physiological differences exhibited by individuals of the same species:

| Characteristic | Continuous Variation | Discontinuous Variation |
| :--- | :--- | :--- |
| **Phenotypic Classes** | Complete spectrum of gradual intermediates with no sharp boundaries | Distinct, discrete categories with no intermediate forms |
| **Environmental Impact**| Substantially influenced by nutrition, climate, and lifestyle | Purely genetically determined; completely unaffected by environment |
| **Genetic Basis** | Polygenic (controlled by multiple additive genes) | Controlled by one or two major gene loci |
| **Graphical Curve** | Bell-shaped **normal distribution curve** (Gaussian) | Discontinuous separate bar chart / histograms |
| **Human Examples** | Height, skin pigmentation, body weight, intelligence | ABO blood groups, tongue rolling, fingerprint patterns, sickle cell |

---

### 2. Chromosomal Sex Determination in Humans

Every human somatic cell contains 23 pairs of chromosomes: **22 pairs of autosomes** and **1 pair of sex chromosomes (gonosomes)**:
- **Human Female:** Homogametic sex chromosomes ($44 + XX$). All ova carry an $X$ chromosome.
- **Human Male:** Heterogametic sex chromosomes ($44 + XY$). 50% of spermatozoa carry $X$; 50% carry $Y$.
- **Sex Determination at Fertilization:**
  - $X\\text{-sperm} + X\\text{-ovum} \\implies XX$ (**Female**, 50% probability).
  - $Y\\text{-sperm} + X\\text{-ovum} \\implies XY$ (**Male**, 50% probability).
  - *Biological Fact:* The father’s sperm determines the biological sex of the child, completely independent of the mother.

---

### 3. Sex-Linked Inheritance (X-Linked Traits)

Sex-linked genes are located on the differential region of the sex chromosomes (usually the **X-chromosome**) without corresponding alleles on the smaller Y-chromosome:
- **Red-Green Color Blindness:** Recessive allele $X^c$. Normal allele $X^C$.
  - Normal Male: $X^C Y$
  - Color-Blind Male: $X^c Y$ (Males express the condition with only ONE defective allele because the Y-chromosome carries no counteracting allele).
  - Normal Female: $X^C X^C$
  - Carrier Female: $X^C X^c$ (Phenotypically normal vision, but transmits trait).
  - Color-Blind Female: $X^c X^c$ (Extremely rare; requires both parents to contribute defective alleles).
- **Hemophilia ("Bleeder’s Disease"):** Recessive X-linked disorder impairing blood clotting factor VIII synthesis.`,
    keyTakeaways: [
      'Continuous variation shows a bell-shaped curve; discontinuous variation falls into distinct categories.',
      'The father’s sperm determines the baby’s sex (50% X-bearing, 50% Y-bearing).',
      'Males suffer disproportionately from X-linked recessive traits because they possess only one X chromosome.',
      'Females carrying one defective X-linked allele are carriers who can pass the trait to their sons.'
    ],
    associatedQuizId: 'bio-ss3-human-variation-quiz'
  },

  // ==========================================
  // WEEK 10: THEORIES OF ORGANIC EVOLUTION
  // ==========================================
  {
    id: 'bio-ss3-term2-week10',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Organic Evolution: Lamarckism, Darwinian Natural Selection & Evolutionary Proofs',
    subtopics: [
      'Definition of Organic Evolution: Cumulative Genetic Changes in Populations over Epochs',
      'Jean-Baptiste Lamarck’s Hypothesis: Use and Disuse, and Inheritance of Acquired Characteristics',
      'Charles Darwin’s Theory of Natural Selection: Overproduction, Competition, and Survival of the Fittest',
      'Evidence for Evolution: Paleontology (Fossils), Comparative Anatomy (Homology vs. Analogy), and Embryology'
    ],
    readingTimeMinutes: 9,
    summary: 'Compare historical theories of organic evolution, analyze Lamarckian use and disuse versus Darwinian natural selection, and evaluate paleontological and anatomical evidence for common descent.',
    contentMarkdown: `### 1. Lamarckism vs. Darwinism

Organic evolution is the gradual, directional cumulative change in the genetic composition and phenotypic traits of biological populations over successive generations:

| Evolutionary Theory | Proponent & Core Postulate | Fundamental Scientific Mechanism | Flaw / Modern Scientific Assessment |
| :--- | :--- | :--- | :--- |
| **Lamarckism (1809)** | **Jean-Baptiste Lamarck**: The Theory of Use and Disuse | Frequent use of an organ strengthens it; disuse leads to atrophy. Organisms develop adaptations in response to environmental need and **pass acquired somatic changes directly to offspring** | **Disproven**: Somatic modifications do not alter gametic DNA. Cutting tails off mice for 20 generations never produces tailless offspring |
| **Darwinism (1859)** | **Charles Darwin**: Natural Selection ("Survival of the Fittest") | Overproduction of offspring $\\implies$ Struggle for existence $\\implies$ Pre-existing random inherited variations $\\implies$ Favorable variations survive and reproduce $\\implies$ Adaptation to environment | **Validated**: Forms the core foundation of modern evolutionary biology when integrated with Mendelian genetics (Neo-Darwinian Synthesis) |

---

### 2. Lines of Evidence for Evolution

1. **Paleontology (Fossil Record):**
   - Sedimentary rock strata preserve chronological sequences of extinct organisms transitioning from simple ancestral to complex modern forms (e.g., transition from primitive reptiles to birds exhibited by *Archaeopteryx*).
2. **Comparative Anatomy:**
   - **Homologous Structures:** Organs sharing identical anatomical skeletal architecture and embryonic origin, adapted for different functions (e.g., the **pentadactyl limb** in human arm, bat wing, whale flipper, and horse foreleg). Proves **divergent evolution** from a common ancestor.
   - **Analogous Structures:** Organs with completely different anatomical origins performing similar functions (e.g., wings of a butterfly vs. wings of a bird). Proves **convergent evolution** driven by identical environmental challenges.
3. **Vestigial Organs:**
   - Rudimentary anatomical structures that had functional utility in ancestral species but are non-functional in modern organisms (e.g., human appendix, coccyx/tailbone, pelvic girdles in pythons and whales).`,
    keyTakeaways: [
      'Lamarck argued that acquired traits are inherited; modern genetics disproved this mechanism.',
      'Darwin’s theory of natural selection establishes that individuals with favorable traits are more likely to survive.',
      'Homologous organs (e.g., pentadactyl limbs) share common ancestry but perform diverse functions.',
      'Vestigial structures like the human appendix provide anatomical evidence of evolutionary ancestry.'
    ],
    associatedQuizId: 'bio-ss3-evolution-quiz'
  },

  // ==========================================
  // WEEK 11: ECOLOGY: CONSERVATION OF NATURAL RESOURCES
  // ==========================================
  {
    id: 'bio-ss3-term2-week11',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Ecology: Conservation of Natural Resources, Wildlife & Forest Management',
    subtopics: [
      'Definition and Need for Environmental Conservation: Renewable vs. Non-Renewable Resources',
      'Conservation of Water, Soil, Forest Timber, and Wildlife Biodiversity in West Africa',
      'Methods of Wildlife and Forest Preservation: Afforestation, Quota Hunting, and Protected Habitats',
      'National Parks and Game Reserves in Nigeria (Yankari, Kainji Lake, Gashaka-Gumti) and Global Treaties'
    ],
    readingTimeMinutes: 8,
    summary: 'Evaluate biological conservation principles, contrast renewable and exhaustible natural resources, analyze environmental degradation threats in Nigeria, and review game reserve management.',
    contentMarkdown: `### 1. Classification of Natural Resources

**Conservation** is the planned management and sustainable utilization of natural resources to prevent their exploitation, destruction, or extinction, ensuring ecological integrity for future generations:

| Resource Class | Characteristics & Dynamics | Concrete Resource Examples |
| :--- | :--- | :--- |
| **Renewable Resources** | Resources capable of natural regeneration, replenishment, and recycling if managed sustainably | Fresh water, timber forests, agricultural topsoil, wildlife fauna, solar and wind energy |
| **Non-Renewable Resources** | Fixed, exhaustible finite resources that cannot be regenerated once depleted | Crude petroleum, coal, natural gas, metallic minerals (iron ore, columbite, gold) |

---

### 2. Major Threats & Conservation Measures in Nigeria

1. **Deforestation & Soil Degradation:**
   - *Threats:* Commercial logging of economic hardwoods (Iroko, Mahogany), bush burning, and slash-and-burn farming strip 350,000 hectares annually.
   - *Conservation:* Strict enforcement of **Afforestation** (planting trees where none existed) and **Reforestation** (replanting harvested trees); establishing forest shelterbelts to halt desert encroachment.
2. **Wildlife Poaching & Loss of Biodiversity:**
   - *Threats:* Bushmeat commercial hunting, habitat fragmentation, and poaching endangered species (elephants, cross river gorillas, pangolins).
   - *Conservation:* Enacting anti-poaching legislation, issuing seasonal hunting licenses, and establishing protected biological sanctuaries.

---

### 3. Major Nigerian National Parks & Sanctuaries

- **Yankari Game Reserve (Bauchi State):** Nigeria's premier wildlife destination; protects African bush elephants, lions, roan antelopes, and natural Wikki Warm Springs.
- **Kainji Lake National Park (Niger/Kwara States):** Encompasses the Borgu and Zugurma game sectors; protects savanna woodland ecosystems, hippopotamuses, and baboons.
- **Gashaka-Gumti National Park (Taraba/Adamawa States):** Nigeria's largest national park; contains montane forests, chimpanzees, and Chappal Waddi highlands.
- **Cross River National Park (Cross River State):** Preserves pristine lowland rainforests, the endangered Cross River gorilla, and drill monkeys.`,
    keyTakeaways: [
      'Conservation involves the sustainable preservation and management of natural resources.',
      'Renewable resources regenerate naturally; non-renewable resources are finite and exhaustible.',
      'Afforestation and reforestation protect topsoil from erosion and halt desertification.',
      'Yankari and Kainji Lake are leading Nigerian national parks protecting endangered fauna.'
    ],
    associatedQuizId: 'bio-ss3-conservation-quiz'
  },

  // ==========================================
  // WEEK 12: TERM REVIEW & WAEC PRACTICAL MASTERCLASS
  // ==========================================
  {
    id: 'bio-ss3-term2-week12',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 12,
    topicTitle: 'Term Review & WAEC SSCE Practical Biology Examination Masterclass',
    subtopics: [
      'Comprehensive Term 1 Review: Neuro-Endocrine Systems, Genetics, Variation, and Conservation',
      'WAEC Biology Practical Paper Architecture: Specimen Classification and Identification Keys',
      'Food Biochemical Tests: Reagents, Operational Procedures, and Color Change Interpretations',
      'Scoring Strategies for Theory Paper 2: Essay Structuring and Direct Examination Marking Rubrics'
    ],
    readingTimeMinutes: 10,
    summary: 'Consolidate SS 3 First Term biological concepts, master WAEC practical specimen identification, review biochemical food test color transformations, and implement exam scoring strategies.',
    contentMarkdown: `### 1. Biochemical Food Tests Reference Matrix

In WAEC Biology Practical Paper 3, biochemical food tests are tested annually. Candidates must state the exact test reagent, procedure, and distinct color change observation:

| Food Substance | Chemical Test Reagent | Operational Procedure | Initial Color | Positive Color Observation & Inference |
| :--- | :--- | :--- | :--- | :--- |
| **Reducing Sugar** (e.g., Glucose) | **Benedict's Solution** or **Fehling's Solutions A & B** | Add equal volume of reagent to food extract; **heat gently to boiling** in a water bath | Blue | Green $\\to$ Yellow $\\to$ **Brick-red precipitate** formed (Reducing sugar present) |
| **Complex Starch** | **Iodine Solution** | Add 2–3 drops of dilute iodine solution to cold food extract on a white tile | Brown / Yellowish-brown | **Blue-black coloration** formed (Starch present) |
| **Proteins** (Biuret Test) | **10% NaOH + 1% CuSO₄** (Biuret Reagent) | Add equal volume of NaOH solution, then add 2–3 drops of dilute CuSO₄ without shaking | Pale blue | **Violet / Purple coloration** formed (Protein present) |
| **Proteins** (Million's Test) | **Millon's Reagent** | Add 3–5 drops of Millon’s reagent to extract, warm gently | Clear / Yellow | **White precipitate turning brick-red on heating** |
| **Lipids / Fats** (Emulsion Test) | **Absolute Ethanol + Cold Water** | Shake food in absolute ethanol; decant clear liquid into a test tube of cold water | Clear colorless | **White cloudy emulsion** formed (Fats/oil present) |
| **Lipids / Fats** (Grease Spot) | **Filter Paper** | Rub food onto clean unglazed filter paper; hold up to light | Opaque paper | **Translucent greasy spot** that does not dry up |

---

### 2. High-Yield Practical Specimen Diagnostic Checklist

1. **Flower Structure (Hibiscus / Pride of Barbados):**
   - Identify calyx (sepals), corolla (petals), androecium (stamens), and gynoecium (pistil/carpel).
   - Recognize adaptations for insect pollination (bright petals, nectar, sticky stigma).
2. **Mammalian Bones (Vertebral Column):**
   - *Cervical (Atlas & Axis):* Atlas lacks centrum; Axis possesses an **odontoid process** for neck rotation.
   - *Thoracic Vertebra:* Long, backward-pointing neural spine, articulating facets for ribs.
   - *Lumbar Vertebra:* Massive, thick centrum for weight support, prominent transverse processes.
3. **Internal Organs (Kidney & Eye Sections):**
   - Transverse kidney section: Outer cortex, inner medulla, renal pyramids, renal pelvis, ureter.

---

### 3. WAEC Biology Scoring Rubric Insights

- **Spelling of Biological Terms:** Misspelling biological terms (e.g., writing *"chloroplast"* as *"chloroplas"* or *"phloem"* as *"floem"*) forfeits all marks.
- **Tabulation:** When asked to contrast two specimens or processes (e.g., Mitosis vs. Meiosis, or Rods vs. Cones), **always construct a ruled comparison table** with corresponding horizontal pairs. Non-corresponding points receive zero marks.`,
    keyTakeaways: [
      'Food tests require precise reagents: Benedict’s for reducing sugar (needs heat), Biuret for protein.',
      'Always present comparison questions in a ruled, corresponding table format.',
      'Atlas vertebra has no centrum; Axis vertebra possesses the odontoid peg for head pivoting.',
      'Scientific names must be underlined separately (Genus capitalized, species lowercase) if handwritten.'
    ],
    associatedQuizId: 'bio-ss3-waec-masterclass-quiz'
  }
];
