import { CurriculumTopic } from '../types';

export const SS2_BIOLOGY_TOPICS: CurriculumTopic[] = [
  // --------------------------------------------------------------------------
  // WEEK 1: DIGESTIVE SYSTEM & ENZYME ACTION
  // --------------------------------------------------------------------------
  {
    id: 'ss2-bio-t2-w1',
    associatedQuizId: 'waec-bio-ss2-digestion',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'The Alimentary Canal, Digestion & Enzyme Action in Humans',
    subtopics: [
      'Anatomy of the Human Alimentary Canal and Associated Glands',
      'Mechanical Digestion (Mastication, Peristalsis) vs Chemical Digestion',
      'Enzymatic Hydrolysis across Mouth, Stomach, and Duodenum',
      'Adaptations of the Ileum and Structure of a Single Intestinal Villus',
      'Absorption and Assimilation: Hepatic Portal Circulation and Lymphatic Pathways'
    ],
    readingTimeMinutes: 16,
    summary: 'Comprehensive analysis of the human digestive tract, sequential enzymatic hydrolysis from mouth to ileum, villus absorption dynamics, and hepatic assimilation.',
    contentMarkdown: `### 1. Sequential Enzymatic Digestion in Humans

Digestion is the catabolic breakdown of complex, insoluble food macromolecules into simple, soluble, diffusible molecules capable of absorption through biological membranes into the bloodstream.

| Region of Alimentary Canal | Secretion & Source Gland | Enzymes Present | Substrate Acted Upon | End-Products Formed | Optimal pH |
|---|---|---|---|---|---|
| **Mouth Cavity** | Saliva (Salivary Glands) | **Salivary Amylase (Ptyalin)** | Starch (cooked) | Maltose (disaccharide) | Neutral / Weakly alkaline ($pH \\approx 6.8 - 7.2$) |
| **Stomach** | Gastric Juice (Gastric Glands) | • **Pepsin**<br>• **Rennin** (in infants) | • Proteins<br>• Soluble caseinogen | • Peptones & Polypeptides<br>• Insoluble curdled casein | Strongly acidic ($pH \\approx 1.5 - 2.0$ via $HCl$) |
| **Duodenum** | Bile (Liver) & Pancreatic Juice (Pancreas) | • Bile salts (No enzyme)<br>• **Pancreatic Amylase**<br>• **Trypsin**<br>• **Pancreatic Lipase** | • Large lipid droplets<br>• Remaining starch<br>• Peptones / Proteins<br>• Emulsified lipids | • Emulsified lipid droplets<br>• Maltose<br>• Polypeptides / Peptides<br>• Fatty acids + Glycerol | Alkaline ($pH \\approx 8.0 - 8.5$ via $NaHCO_3$) |
| **Ileum (Small Intestine)** | Succus Entericus (Intestinal Glands) | • **Maltase**<br>• **Sucrase**<br>• **Lactase**<br>• **Erepsin (Peptidase)** | • Maltose<br>• Sucrose<br>• Lactose<br>• Peptides | • Glucose + Glucose<br>• Glucose + Fructose<br>• Glucose + Galactose<br>• Individual Amino Acids | Alkaline ($pH \\approx 7.8 - 8.0$) |

---

### 2. Architecture of Absorption: The Intestinal Villus

[Diagram: villus-structure]

The small intestine (ileum) is structurally specialized for absorption through several evolutionary adaptations:
1. **Extensive Surface Area:** Great length ($6 - 7\\text{ meters}$ in adult humans) supplemented by circular folds of Kerkring, millions of finger-like villi, and microscopic microvilli brush borders.
2. **One-Cell-Thick Epithelium:** Minimizes diffusion distance for rapid transcellular nutrient transport.
3. **Dense Capillary Network:** Rapidly absorbs water-soluble monomers (**glucose**, **amino acids**, **vitamin C & B**, and **mineral ions**) and channels them directly into the **Hepatic Portal Vein** towards the liver.
4. **Central Lacteal:** A specialized lymphatic vessel in the core of each villus that absorbs lipid derivatives (**fatty acids** and **glycerol**) packaged as chylomicrons, bypassing the liver directly into the thoracic lymphatic duct.`,
    keyTakeaways: [
      'Bile contains no enzymes but emulsifies fats and neutralizes acidic gastric chyme.',
      'Water-soluble nutrients enter blood capillaries and flow to the liver via the Hepatic Portal Vein.',
      'Fatty acids and glycerol enter the central lacteal and travel through the lymphatic system.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 2: TRANSPORT SYSTEM IN ANIMALS (BLOOD & CIRCULATION)
  // --------------------------------------------------------------------------
  {
    id: 'ss2-bio-t2-w2',
    associatedQuizId: 'waec-bio-ss2-circulation',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Mammalian Circulatory System: Blood Composition & Heart Anatomy',
    subtopics: [
      'Composition of Blood: Plasma (55%) and Formed Cellular Elements (45%)',
      'Erythrocytes, Leucocytes (Phagocytes & Lymphocytes), and Thrombocytes',
      'The ABO Blood Group System, Agglutination, and Rhesus Incompatibility',
      'External and Internal Anatomy of the Four-Chambered Human Heart',
      'The Double Circulatory System (Pulmonary vs. Systemic Circuits)',
      'The Cardiac Cycle: Atrial Systole, Ventricular Systole, and Complete Diastole'
    ],
    readingTimeMinutes: 17,
    summary: 'The cellular components of mammalian blood, ABO and Rhesus compatibility matrices, double circulation dynamics, and the four-chambered mammalian heart.',
    contentMarkdown: `### 1. Cellular Elements of Mammalian Blood

Mammalian blood is a specialized fluid connective tissue consisting of cellular elements suspended in an aqueous proteinaceous matrix termed **plasma**.

| Cellular Element | Structural Morphology | Site of Genesis & Lifespan | Primary Physiological Function |
|---|---|---|---|
| **Erythrocytes (RBCs)** | Biconcave disc, non-nucleated in mature state, flexible ($7.5\\,\\mu\\text{m}$) | Red bone marrow; $\\approx 120\\text{ days}$ | Transports oxygen ($O_2$) as **oxyhemoglobin** and carbon dioxide ($CO_2$) as carbaminohemoglobin |
| **Leucocytes (WBCs)** | Nucleated, irregular amoeboid shape; divided into granulocytes & agranulocytes | Bone marrow & lymph nodes; hours to days | Immune defense: **phagocytosis** (neutrophils/monocytes) and **antibody production** (lymphocytes) |
| **Thrombocytes (Platelets)** | Tiny, non-nucleated cytoplasmic fragments of megakaryocytes | Red bone marrow; $8 - 10\\text{ days}$ | Initiates blood clotting cascade via thrombokinase enzyme release |

---

### 2. ABO Blood Grouping & The Rhesus Factor

[Diagram: heart-anatomy]

Agglutination occurs when recipient antibodies bind to donor antigens causing fatal clumping.

| Blood Group | Antigens on Erythrocyte Surface | Antibodies in Plasma | Can Safely Donate Blood To | Can Safely Receive Blood From |
|---|---|---|---|---|
| **A** | Antigen A | Anti-B | Group A, Group AB | Group A, Group O |
| **B** | Antigen B | Anti-A | Group B, Group AB | Group B, Group O |
| **AB** | Antigen A and Antigen B | **Neither** | Group AB only | **Universal Recipient (All Groups)** |
| **O** | **Neither** Antigen | Both Anti-A and Anti-B | **Universal Donor (All Groups)** | Group O only |

> [!NOTE]
> **Rhesus Incompatibility (Erythroblastosis Fetalis):** When an Rh-negative mother carries an Rh-positive fetus, fetal Rh antigens leaking during childbirth sensitize the mother to produce anti-Rh antibodies. In subsequent Rh-positive pregnancies, maternal anti-Rh antibodies cross the placenta and destroy fetal red blood cells, causing severe hemolytic anemia.

---

### 3. Double Circulation and Heart Mechanics

Mammals possess a **closed, double circulatory system**:
1. **Pulmonary Circulation:** Deoxygenated blood is pumped from the **Right Ventricle** via the **Pulmonary Artery** to the lungs for oxygenation and returns via the **Pulmonary Veins** to the **Left Atrium**.
2. **Systemic Circulation:** Oxygenated blood is pumped from the **Left Ventricle** via the **Aorta** under high pressure to all systemic organs and returns via the **Vena Cava** to the **Right Atrium**.
- **Wall Thickness Rationale:** The left ventricle has muscular walls approximately three times thicker than the right ventricle because it must overcome systemic peripheral resistance to propel blood throughout the entire body.`,
    keyTakeaways: [
      'Mature mammalian red blood cells lack nuclei to maximize hemoglobin storage capacity.',
      'Blood Group O is the universal donor; Blood Group AB is the universal recipient.',
      'Left ventricle has the thickest muscular wall to generate high systemic perfusion pressures.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 3: TRANSPORT SYSTEM IN PLANTS
  // --------------------------------------------------------------------------
  {
    id: 'ss2-bio-t2-w3',
    associatedQuizId: 'waec-bio-ss2-plant-transport',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Vascular Transport in Plants: Xylem, Phloem & Transpiration',
    subtopics: [
      'Comparative Anatomy of Xylem Vessels and Tracheids vs. Phloem Sieve Tubes',
      'The Mechanism of Water and Mineral Uptake: Osmosis, Root Pressure, and Capillarity',
      'The Cohesion-Tension Theory and Transpiration Pull in Tall Trees',
      'Factors Affecting Transpiration Rate (Temperature, Humidity, Wind, Light Intensity)',
      'Translocation of Organic Solutes (Sucrose) via the Pressure-Flow Hypothesis'
    ],
    readingTimeMinutes: 16,
    summary: 'The vascular architecture of higher plants: water ascent via transpiration pull in xylem vessels and pressure-flow translocation of sucrose in phloem sieve elements.',
    contentMarkdown: `### 1. Vascular Tissues: Xylem vs. Phloem

Higher vascular plants (tracheophytes) utilize two distinct continuous conduits for long-distance transport.

| Characteristic | Xylem Tissue | Phloem Tissue |
|---|---|---|
| **Living / Dead State** | **Dead** at functional maturity (lignified walls) | **Living** cells (sieve tube elements + companion cells) |
| **Conducting Elements** | Xylem vessels and tracheids | Sieve tube elements with perforated sieve plates |
| **Material Transported** | Water and dissolved inorganic mineral salts | Manufactured organic nutrients (sucrose, amino acids) |
| **Direction of Flow** | **Unidirectional** (strictly upward: Roots $\\to$ Leaves) | **Bidirectional** (Sources $\\to$ Sinks: Leaves to roots/fruits) |
| **Structural Support** | Imparts immense tensile strength via **lignin rings** | Provides negligible mechanical support |

---

### 2. The Forces Driving the Ascent of Sap (Water)

How does water reach the canopy of tall Nigerian trees (such as the Iroko or Silk Cotton tree reaching $50\\text{ meters}$)?
1. **Transpiration Pull (Primary Driver):** Evaporation of water vapor through leaf stomata creates negative hydrostatic tension in the mesophyll intercellular spaces, drawing water out of xylem conduits.
2. **Cohesion and Adhesion:** Water molecules exhibit powerful mutual cohesion due to hydrogen bonding, forming an unbroken water column, while adhesion to xylem cell walls prevents meniscus collapse.
3. **Root Pressure:** Active transport of mineral ions into root stele lowers water potential, generating positive hydrostatic pressure (observed as guttation in early morning).`,
    keyTakeaways: [
      'Xylem transports water and minerals unidirectionally; phloem translocates sucrose bidirectionally.',
      'Cohesion-tension theory explains water ascent in tall trees driven by stomatal transpiration pull.',
      'Transpiration rate increases with temperature, wind, and light, but decreases with high relative humidity.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 4: RESPIRATORY SYSTEMS IN PLANTS & ANIMALS
  // --------------------------------------------------------------------------
  {
    id: 'ss2-bio-t2-w4',
    associatedQuizId: 'waec-bio-ss2-respiration',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Respiratory Systems, Gaseous Exchange & Alveolar Dynamics',
    subtopics: [
      'Cellular Respiration (Aerobic vs. Anaerobic) vs. External Gaseous Exchange',
      'Comparative Survey of Respiratory Surfaces across Organism Groups',
      'Essential Structural Characteristics of Efficient Respiratory Surfaces',
      'Mechanics of Breathing in Humans: Inhalation vs. Exhalation',
      'Alveolar Micro-Architecture and Capillary Gas Diffusion Gradients'
    ],
    readingTimeMinutes: 16,
    summary: 'Comparative respiratory mechanisms across phyla, universal characteristics of exchange surfaces, and alveolar-capillary diffusion gradients.',
    contentMarkdown: `### 1. Comparative Respiratory Organs across Living Organisms

Every aerobic organism requires a specialized boundary surface across which oxygen ($O_2$) diffuses inward and carbon dioxide ($CO_2$) diffuses outward.

| Organism / Phylum | Respiratory Surface | Mechanism of Gaseous Exchange |
|---|---|---|
| **Amoeba / Paramecium** | Cell Surface Membrane | Simple diffusion across body surface ($SA/V$ ratio is high) |
| **Earthworm (Annelida)** | Moist Cuticular Skin | Cutaneous respiration; capillaries lie beneath moist epidermis |
| **Insects (Arthropoda)** | **Tracheal System** | Air enters spiracles, flows through tracheae and fluid-filled tracheoles |
| **Bony Fish (Osteichthyes)** | **Gill Filament Lamellae** | Countercurrent flow between water stream and gill capillary blood |
| **Amphibians (Frog)** | Skin, Buccal Cavity, Lungs | Cutaneous (in water), buccopharyngeal, and pulmonary (on land) |
| **Mammals (Human)** | **Alveolar Epithelium** | Negative-pressure ventilation expanding pleural cavity |

---

### 2. Universal Adaptations of Respiratory Surfaces

[Diagram: bio-respiratory-alveoli]

According to **Fick's Law of Diffusion**, the rate of gas diffusion ($R$) across a surface is directly proportional to surface area and concentration gradient, and inversely proportional to diffusion distance:

$$R \\propto \\frac{\\text{Surface Area} \\times \\Delta P}{\\text{Diffusion Thickness}}$$

1. **Enormous Surface Area:** Provided by $300 - 500\\text{ million}$ microscopic alveoli in human lungs ($\approx 70\\,\\text{m}^2$).
2. **Extremely Thin Barrier:** Both alveolar wall and capillary endothelium consist of single-layer squamous cells ($\approx 0.5\\,\\mu\\text{m}$ total thickness).
3. **Moist Surface:** Lined with surfactant fluid; gases must dissolve in liquid before diffusing across membranes.
4. **Rich Vascular Supply:** Dense capillary network rapidly removes oxygenated blood, maintaining a steep concentration gradient.

---

### 3. Mechanics of Breathing in Humans

| Feature | Inhalation (Inspiration) | Exhalation (Expiration) |
|---|---|---|
| **External Intercostal Muscles** | **Contract** (pulls ribs upward and outward) | **Relax** (ribs move downward and inward) |
| **Diaphragm** | **Contracts and flattens** downward | **Relaxes and arches** upward into dome shape |
| **Thoracic Cavity Volume** | **Increases** substantially | **Decreases** to resting volume |
| **Intrapulmonary Pressure** | **Decreases below atmospheric pressure** | **Increases above atmospheric pressure** |
| **Air Movement** | Air rushes **inward** into lungs | Air is forced **outward** into atmosphere |`,
    keyTakeaways: [
      'Inhalation is an active process driven by contraction of diaphragm and external intercostals.',
      'Alveolar exchange efficiency relies on vast surface area, single-cell thinness, and surfactant moisture.',
      'Bony fish utilize a countercurrent exchange system to maximize oxygen extraction from water.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 5: EXCRETORY SYSTEMS & OSMOREGULATION
  // --------------------------------------------------------------------------
  {
    id: 'ss2-bio-t2-w5',
    associatedQuizId: 'waec-bio-ss2-excretion',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Excretion, Osmoregulation & The Mammalian Nephron',
    subtopics: [
      'Definition of Excretion: Elimination of Metabolic Toxic Wastes',
      'Major Nitrogenous Waste Products: Ammonia, Urea, and Uric Acid',
      'Survey of Excretory Organs across Phyla (Contractile Vacuole, Flame Cells, Nephridia)',
      'Gross Anatomy of the Human Kidney (Cortex, Medulla, Pelvis, Ureter)',
      'The Nephron: Ultrafiltration, Selective Reabsorption, and Tubular Secretion',
      'Osmoregulation and the Hormonal Action of Antidiuretic Hormone (ADH)'
    ],
    readingTimeMinutes: 17,
    summary: 'Excretory organs across phyla, nitrogenous waste trade-offs, mammalian renal anatomy, nephron filtration dynamics, and ADH osmoregulatory feedback.',
    contentMarkdown: `### 1. Comparative Nitrogenous Waste Forms

Metabolism of proteins and nucleic acids generates toxic amino groups ($-NH_2$) that organisms must convert and excrete.

| Nitrogenous Waste | Toxicity Level | Water Required to Excrete | Typical Organisms | Evolutionary Advantage |
|---|---|---|---|---|
| **Ammonia ($NH_3$)** | Extremely High | Very Large ($\approx 500\\text{ mL / g}$) | Freshwater protozoa, bony fish | Requires zero energy to synthesize; diffuses into vast water body |
| **Urea** | Moderate | Moderate ($\approx 50\\text{ mL / g}$) | Mammals, adult amphibians | Synthesized in liver (Ornithine cycle); can be stored safely in bladder |
| **Uric Acid** | Extremely Low | Almost Zero (Insoluble paste) | Birds, reptiles, terrestrial insects | Conserves maximum water; non-toxic inside shelled amniotic eggs |

---

### 2. The Nephron: Three-Stage Urine Formation

[Diagram: nephron-structure]

The **nephron** is the microscopic functional filtration unit of the kidney ($\approx 1\\text{ million}$ per human kidney).

1. **Stage 1: Ultrafiltration (Renal Corpuscle):**
   - Blood enters the **glomerulus** via the wide **afferent arteriole** and exits through the narrower **efferent arteriole**.
   - The resulting high hydrostatic pressure forces water, glucose, amino acids, urea, and ions through the fenestrated capillary walls and podocyte slits into **Bowman's capsule**, forming the **glomerular filtrate**.
   - Blood cells and large plasma proteins (albumin, fibrinogen) are too large to pass and remain in the bloodstream.

2. **Stage 2: Selective Reabsorption (Convoluted Tubules & Loop of Henle):**
   - **Proximal Convoluted Tubule (PCT):** **100% of glucose** and amino acids, alongside $\approx 75\\%$ of water and sodium ions ($Na^+$), are actively reabsorbed back into peritubular capillaries.
   - **Loop of Henle:** Creates a hypertonic medullary osmotic gradient. Descending limb is permeable to water; ascending limb actively pumps $Na^+$ and $Cl^-$ outwards.
   - **Distal Convoluted Tubule (DCT):** Adjusts $pH$ and mineral electrolyte balance under aldosterone control.

3. **Stage 3: Osmoregulation & Tubular Secretion (Collecting Duct):**
   - When body hydration is low (e.g., during strenuous football in Lagos sun), the hypothalamus detects high blood osmolarity and stimulates the pituitary gland to secrete **Antidiuretic Hormone (ADH)**.
   - **ADH increases the water permeability** of the collecting duct walls, causing water to be reabsorbed into blood capillaries, producing **concentrated, hypertonic urine**.`,
    keyTakeaways: [
      'Glomerular ultrafiltration is driven by the diameter differential between afferent and efferent arterioles.',
      '100% of filtered glucose is actively reabsorbed in the proximal convoluted tubule (PCT).',
      'ADH increases collecting duct water permeability, preventing dehydration and concentrating urine.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 6: MID-TERM REVIEW & PRACTICAL BIOLOGICAL DRAWINGS
  // --------------------------------------------------------------------------
  {
    id: 'ss2-bio-t2-w6',
    associatedQuizId: 'waec-bio-ss2-biological-drawings',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Mid-Term Review & Strict WAEC Biological Drawing Conventions',
    subtopics: [
      'The Five Golden Rules of WAEC Biological Drawings',
      'Calculating Linear Magnification: $M = \\frac{\\text{Length of Drawing}}{\\text{Actual Specimen Length}}$',
      'Guidelines for Clear Unbroken Lines (Zero Shading, Zero Feathering)',
      'Labeling Guidelines: Horizontal Ruled Guidelines with Zero Arrowheads',
      'Common Practical Deductions and Marking Rubrics'
    ],
    readingTimeMinutes: 13,
    summary: 'Consolidation of organ systems and the strict scientific conventions governing biological drawings in WAEC Practical Paper 3.',
    contentMarkdown: `### 1. WAEC Biological Drawing Marking Criteria

In WAEC Biology Practical Paper 3, drawings carry between $10$ to $15$ marks per specimen. Examiners enforce strict biological drafting conventions:

| Drawing Criterion | Common Student Error (Marks Deducted) | Standard WAEC Compliance Rule |
|---|---|---|
| **Clarity of Outline** | Woolly, shaded, or double/broken pencil lines | **Single, sharp, clean, continuous line** using an HB pencil |
| **Shading / Painting** | Shading surfaces with pencil to show depth | **Strictly NO shading, stippling, or coloring** allowed |
| **Labeling Lines** | Slanted, crooked lines crossing each other | **Horizontal, parallel ruled guide lines** drawn with a ruler |
| **Label Line Termination** | Using arrows at ends of guide lines | **No arrowheads**; line must touch the specific target structure |
| **Title of Drawing** | Missing or placed vaguely at side | **Clear title** at top or bottom stating specimen name, view, and sex |
| **Magnification** | Omitted, written with units ($10\\text{ cm}$), or inverted | Stated clearly at bottom right: $\\times 1.5$ or $\\times 2$ (No units) |

---

### 2. Magnification Formula
$$\\text{Magnification} = \\frac{\\text{Length of drawing}}{\\text{Actual length of specimen}}$$
- Both measurements must be taken along the same anatomical axis (e.g. anterior-posterior length) in identical units (millimeters).
- Magnification must always be preceded by a multiplication sign: e.g., $\\times 2.5$.`,
    keyTakeaways: [
      'Never shade, paint, or double-sketch lines in a biological drawing.',
      'Guide lines must be horizontally ruled with a ruler and must never cross or have arrowheads.',
      'Magnification must be expressed with a multiplication sign (x) and no units.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 7: SKELETAL SYSTEM & LOCOMOTION
  // --------------------------------------------------------------------------
  {
    id: 'ss2-bio-t2-w7',
    associatedQuizId: 'waec-bio-ss2-skeletal-system',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Skeletal Support, Joint Biomechanics & Antagonistic Muscles',
    subtopics: [
      'Biological Functions of the Skeleton: Support, Protection, Locomotion, Hemopoiesis',
      'Axial Skeleton (Skull, Vertebral Column, Ribs, Sternum) vs. Appendicular Skeleton',
      'Histology of Bone (Osteocytes, Haversian Systems) vs. Cartilage (Chondrocytes)',
      'Classification of Movable Synovial Joints (Ball-and-Socket, Hinge, Pivot, Gliding)',
      'Locomotion Biomechanics: Antagonistic Muscle Action (Biceps and Triceps Brachii)'
    ],
    readingTimeMinutes: 16,
    summary: 'The mammalian skeletal framework, axial and appendicular divisions, synovial joint biomechanics, and antagonistic muscle pairs.',
    contentMarkdown: `### 1. Architectural Divisions of the Human Skeleton

The adult human skeleton comprises $206$ distinct bones categorized into two major anatomical divisions:

| Skeletal Division | Constituent Bones | Total Count | Primary Biological Function |
|---|---|---|---|
| **Axial Skeleton** | • Skull (Cranium + Facial bones)<br>• Vertebral column (33 vertebrae)<br>• Thoracic cage (12 pairs of ribs + Sternum) | $80$ bones | Protects central nervous system and vital thoracic organs (brain, spinal cord, heart, lungs) |
| **Appendicular Skeleton** | • Pectoral girdle (Clavicles + Scapulae)<br>• Upper limbs (Humerus, Radius, Ulna, Carpals, Phalanges)<br>• Pelvic girdle (Fused ilium, ischium, pubis)<br>• Lower limbs (Femur, Tibia, Fibula, Tarsals) | $126$ bones | Provides articulation levers for locomotion, manipulation of objects, and bipedal support |

---

### 2. Classification of Synovial Joints

A **synovial joint** is a freely movable joint enclosed within a fibrous capsule lined with a synovial membrane secreting lubricating **synovial fluid**.

| Joint Type | Degree of Freedom / Movement Permitted | Anatomical Examples |
|---|---|---|
| **Ball-and-Socket** | Multiaxial ($360^\\circ$ rotation, flexion, extension, abduction, adduction) | • Shoulder joint (Humerus in glenoid cavity)<br>• Hip joint (Femur in acetabulum) |
| **Hinge Joint** | Uniaxial (Movement in one single plane: flexion and extension) | • Elbow joint (Humerus with radius and ulna)<br>• Knee joint (Femur with tibia) |
| **Pivot Joint** | Rotational movement around a central axis | • Atlas-Axis joint (Neck rotation)<br>• Proximal radioulnar joint |
| **Gliding Joint** | Flat bone surfaces slide over each other | • Carpal bones of the wrist<br>• Tarsal bones of the ankle |

---

### 3. Antagonistic Muscle Mechanics in Human Arm Flexion

Muscles can only **contract (pull)**; they cannot actively push. Therefore, skeletal movement requires coordinated pairs of **antagonistic muscles**.

- **Arm Flexion (Bending the Arm):**
  - **Biceps brachii** (the flexor) contracts and shortens.
  - **Triceps brachii** (the extensor) relaxes and elongates.
  - The forearm (radius and ulna) is pulled upward toward the shoulder.
- **Arm Extension (Straightening the Arm):**
  - **Triceps brachii** contracts and shortens.
  - **Biceps brachii** relaxes and elongates.
  - The forearm is pulled back down into a straight anatomical position.`,
    keyTakeaways: [
      'The axial skeleton protects central organs; the appendicular skeleton facilitates locomotion.',
      'Ball-and-socket joints permit universal rotation; hinge joints permit movement in one plane.',
      'Biceps and triceps act as antagonistic pairs: biceps flexes the forearm while triceps extends it.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 8: PLANT REPRODUCTION & FLORAL BIOLOGY
  // --------------------------------------------------------------------------
  {
    id: 'ss2-bio-t2-w8',
    associatedQuizId: 'waec-bio-ss2-plant-reproduction',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Plant Reproduction: Floral Anatomy, Pollination & Double Fertilization',
    subtopics: [
      'Morphology of a Typical Angiosperm Flower (Calyx, Corolla, Androecium, Gynoecium)',
      'Essential Reproductive Whorls vs. Non-Essential Perianth Whorls',
      'Adaptations for Wind Pollination (Anemophily) vs. Insect Pollination (Entomophily)',
      'Pollen Grain Germination, Pollen Tube Growth, and Double Fertilization',
      'Post-Fertilization Developmental Changes in Floral Parts (Fruit vs. Seed)'
    ],
    readingTimeMinutes: 16,
    summary: 'The reproductive biology of angiosperm flowers, contrasting wind and insect pollination syndromes, and the mechanics of double fertilization.',
    contentMarkdown: `### 1. Whorls of an Angiosperm Flower

A flower is a modified reproductive shoot consisting of four concentric whorls borne on a swollen stem tip called the **receptacle**.

| Floral Whorl | Individual Units | Sex / Status | Primary Biological Function |
|---|---|---|---|
| **Calyx** | Sepals (typically green) | Non-essential | Encloses and protects delicate inner floral parts in the bud stage |
| **Corolla** | Petals (often brightly colored) | Non-essential | Attracts insect/bird pollinators; provides a landing platform |
| **Androecium** | Stamens (Anther + Filament) | **Male essential** | Anthers produce haploid microspores (**pollen grains**) |
| **Gynoecium (Pistil)** | Carpels (Stigma + Style + Ovary) | **Female essential** | Stigma captures pollen; ovary houses ovules containing egg cells |

---

### 2. Pollination Syndromes: Wind vs. Insect Pollination

| Feature | Insect-Pollinated Flower (e.g. *Hibiscus*, *Pride of Barbados*) | Wind-Pollinated Flower (e.g. Maize, Guinea Grass) |
|---|---|---|
| **Petal Appearance** | Large, brightly colored petals with nectar guides | Inconspicuous, small, green or brownish petals (or absent) |
| **Scent & Nectar** | Fragrant sweet scent; glandular nectaries present | Odorless; complete absence of nectar |
| **Pollen Properties** | Heavy, sticky, rough-walled, spiky grains | Light, smooth, dry, powdery grains produced in vast millions |
| **Stamens** | Enclosed within corolla tube; rigid filaments | Long, pendulous filaments hanging freely outside flower |
| **Stigma** | Sticky, compact, situated inside corolla | **Feathery and branched**, hanging outside to trap airborne pollen |

---

### 3. Angiosperm Double Fertilization
1. **Pollen Germination:** When a compatible pollen grain lands on the moist stigma, it absorbs sugary fluid and germinates into a **pollen tube**.
2. **Pollen Tube Growth:** The pollen tube grows down through the style into the ovary micropyle, carrying two haploid male gamete nuclei.
3. **Double Fertilization Event:**
   - **First Male Nucleus ($n$)** fuses with the **Egg Nucleus ($n$)** $\\implies$ Forms the diploid **Zygote ($2n$)**, which develops into the embryo plant.
   - **Second Male Nucleus ($n$)** fuses with the **Diploid Secondary Nucleus ($2n$)** $\\implies$ Forms the triploid **Endosperm ($3n$)**, which serves as nutrient food reserve.`,
    keyTakeaways: [
      'Wind-pollinated flowers have feathery stigmas and light powdery pollen; insect-pollinated flowers are colorful and scented.',
      'Angiosperms undergo double fertilization: producing a diploid zygote (2n) and a triploid endosperm (3n).',
      'Post-fertilization: the ovary develops into the fruit while ovules become seeds.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 9: HUMAN REPRODUCTIVE SYSTEMS
  // --------------------------------------------------------------------------
  {
    id: 'ss2-bio-t2-w9',
    associatedQuizId: 'waec-bio-ss2-human-reproduction',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Mammalian Reproduction: Human Reproductive Anatomy & Endocrinology',
    subtopics: [
      'Anatomy of the Male Reproductive System (Testes, Epididymis, Vas Deferens, Prostate)',
      'Anatomy of the Female Reproductive System (Ovaries, Fallopian Tubes, Uterus, Vagina)',
      'Spermatogenesis vs. Oogenesis (Gametogenesis Timeframes and Chromosome Reductions)',
      'The 28-Day Menstrual Cycle and Hormonal Feedback Loops (FSH, LH, Estrogen, Progesterone)',
      'Fertilization in the Fallopian Tube, Blastocyst Implantation, and Placental Functions'
    ],
    readingTimeMinutes: 17,
    summary: 'Human reproductive anatomy, comparative gametogenesis, the 28-day ovarian-uterine endocrine cycle, and placental exchange biology.',
    contentMarkdown: `### 1. Endocrine Regulation of the 28-Day Menstrual Cycle

The human female menstrual cycle integrates rhythmic feedback interactions between the anterior pituitary gland and the ovaries.

| Phase of Cycle | Active Hormone | Endocrine Source Gland | Primary Physiological Action on Target Tissue |
|---|---|---|---|
| **Follicular Phase (Days 1–13)** | **FSH (Follicle Stimulating Hormone)** | Anterior Pituitary | Stimulates primary ovarian follicles to mature into Graafian follicles |
| **Follicular Phase (Days 6–13)** | **Estrogen** | Ovarian Granulosa Cells | Rebuilds and thickens the vascular endometrium; inhibits FSH |
| **Ovulatory Surge (Day 14)** | **LH (Luteinizing Hormone)** | Anterior Pituitary | Sharp peak triggers ovulation: rupture of Graafian follicle and ovum release |
| **Luteal Phase (Days 15–28)** | **Progesterone** | **Corpus Luteum** | Maintains thick, glandular, glycogen-rich endometrium for blastocyst implantation |
| **Menstrual Phase (Days 1–5)** | Fall in Progesterone & Estrogen | Degenerating Corpus Luteum | Endometrial lining breaks down and is shed along with unfertilized ovum as menses |

---

### 2. Biological Functions of the Placenta

The **placenta** is an ephemeral organ formed from both maternal uterine tissue and fetal chorionic villi.
1. **Nutrition:** Facilitates passive and active transport of glucose, amino acids, fatty acids, and vitamins from maternal blood into fetal umbilical vein.
2. **Respiration:** Transfers oxygen from maternal hemoglobin to fetal hemoglobin and removes fetal carbon dioxide.
3. **Excretion:** Eliminates fetal urea and metabolic wastes into maternal bloodstream for excretion by maternal kidneys.
4. **Endocrine Function:** Secretes **human chorionic gonadotropin (hCG)** to sustain the corpus luteum, followed by massive amounts of progesterone and estrogen to maintain pregnancy.
5. **Passive Immunity:** Transports maternal Immunoglobulin G ($IgG$) antibodies across the placental barrier, conferring temporary immunity to the newborn against pathogens.`,
    keyTakeaways: [
      'LH surge on Day 14 triggers ovulation; progesterone from the corpus luteum maintains the endometrium.',
      'Fertilization occurs in the ampulla of the fallopian tube (oviduct).',
      'The placenta allows nutrient and gas exchange without allowing maternal and fetal blood to mix directly.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 10: ECOLOGY (ECOSYSTEM DYNAMICS & ENERGY FLOW)
  // --------------------------------------------------------------------------
  {
    id: 'ss2-bio-t2-w10',
    associatedQuizId: 'waec-bio-ss2-ecology-energy',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Ecology: Trophic Levels, Food Webs & Thermodynamic Energy Dissipation',
    subtopics: [
      'Ecosystem Components: Abiotic Environmental Factors vs. Biotic Communities',
      'Autotrophs, Heterotrophs (Herbivores, Carnivores, Omnivores), and Decomposers',
      'Food Chains vs. Complex Multi-Branching Food Webs',
      'Lindeman’s 10% Thermodynamic Efficiency Law across Trophic Levels',
      'Ecological Pyramids: Pyramids of Numbers, Biomass, and Energy'
    ],
    readingTimeMinutes: 16,
    summary: 'Ecosystem trophic architecture, food webs, ecological pyramids, and the thermodynamic dissipation of energy according to Lindeman’s law.',
    contentMarkdown: `### 1. Trophic Structure & Food Chains

A **trophic level** represents the specific feeding position an organism occupies in a sequence of energy transfers within an ecosystem.
- **Primary Producers (Trophic Level 1):** Photosynthetic green plants, algae, and cyanobacteria that convert solar radiance into chemical bond energy.
- **Primary Consumers (Trophic Level 2):** Herbivores feeding directly on autotrophic biomass.
- **Secondary Consumers (Trophic Level 3):** Carnivores that prey upon primary consumers.
- **Tertiary Consumers (Trophic Level 4):** Apex predators at the terminus of the chain.

---

### 2. Lindeman's 10% Law & The Pyramid of Energy

[Diagram: bio-ecological-pyramids]

According to **Lindeman’s efficiency law** (1942), only approximately **$10\\%$ of the chemical energy** stored in the organic biomass of one trophic level is successfully incorporated into the biomass of the next higher trophic level. The remaining **$90\\%$ is dissipated** and lost to the environment through:
1. **Metabolic Cellular Respiration:** Heat energy dissipated during metabolic maintenance.
2. **Incomplete Digestion / Egestion:** Undigested bones, cellulose, and hair expelled as feces.
3. **Movement & Excretion:** Kinetic energy and nitrogenous excretory loss.

| Type of Pyramid | Measurement Units | Can It Be Inverted? | Example of Inversion |
|---|---|---|---|
| **Pyramid of Numbers** | Number of individuals per unit area | **Yes** | Single large mango tree supporting thousands of parasitic insects |
| **Pyramid of Biomass** | Dry weight ($g/m^2$ or $kg/ha$) | **Yes** (in aquatic systems) | Small biomass of phytoplankton supporting larger biomass of long-lived zooplankton |
| **Pyramid of Energy** | Energy flow per unit area per year ($kJ/m^2/yr$) | **NEVER** | Energy is irreversibly degraded as heat (Second Law of Thermodynamics) |`,
    keyTakeaways: [
      'Only approximately 10% of energy is transferred from one trophic level to the next.',
      'Pyramids of energy can NEVER be inverted because energy is lost as heat at every step.',
      'Food chains rarely exceed 4 or 5 trophic levels due to progressive thermodynamic energy depletion.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 11: ECOLOGICAL SUCCESSION & POPULATION DYNAMICS
  // --------------------------------------------------------------------------
  {
    id: 'ss2-bio-t2-w11',
    associatedQuizId: 'waec-bio-ss2-succession',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Ecological Succession, Population Ecology & Sampling Techniques',
    subtopics: [
      'Definition of Ecological Succession (Primary vs. Secondary Succession)',
      'Succession Stages: Pioneer Community, Seral Stages, and Stable Climax Community',
      'Characteristics of Climax Communities in Nigeria (Rainforest vs. Guinea Savanna)',
      'Population Density, Natality, Mortality, Immigration, and Emigration',
      'Field Sampling Methods: The Quadrat Method and Transect Lines'
    ],
    readingTimeMinutes: 15,
    summary: 'The orderly temporal replacement of communities during primary and secondary succession, climax forest stabilization, and ecological population sampling techniques.',
    contentMarkdown: `### 1. Primary vs. Secondary Ecological Succession

**Ecological succession** is the orderly, predictable process of community change over time, where one assemblage of plant and animal species modifies the physical environment, paving the way for replacement by more complex species.

| Feature | Primary Succession (Priosere) | Secondary Succession (Sub-sere) |
|---|---|---|
| **Starting Substrate** | Starts on completely bare, sterile, non-vegetated surfaces with **zero pre-existing soil** | Starts on areas where an established community was destroyed, but **fertile soil remains intact** |
| **Pioneer Species** | Crustose lichens, mosses, microscopic algae | Annual grasses, weeds, resilient herbaceous shrubs |
| **Timeframe to Climax** | Extremely slow (Hundreds to thousands of years) | Relatively rapid (Tens to hundreds of years) |
| **Nigerian Examples** | Bare volcanic basalt, exposed granite inselberg in Jos, sand dunes in Sahel | Abandoned farmland in Oyo, deforested forest reserve in Edo |

---

### 2. Population Sampling: The Quadrat Method

To estimate the population size and density of immobile species (such as *Tridax procumbens* or *Chromolaena odorata*) in a school field:

$$\\text{Population Density} = \\frac{\\text{Total number of individuals counted in all quadrats}}{\\text{Total area of all sample quadrats combined } (m^2)}$$

$$\\text{Estimated Total Population} = \\text{Population Density} \\times \\text{Total Area of Field } (m^2)$$

- **Requirement for Accuracy:** Throw the quadrat at random coordinates to eliminate experimental bias and repeat throws multiple times ($n \\ge 10$) to minimize sampling error.`,
    keyTakeaways: [
      'Primary succession begins on bare rock with no soil; secondary succession begins on disturbed soil.',
      'Lichens are pioneer organisms on bare rock because their organic acids weather minerals into initial soil.',
      'Quadrat sampling estimates plant population density through randomized sampling.'
    ]
  },

  // --------------------------------------------------------------------------
  // WEEK 12: NUTRIENT CYCLES & ENVIRONMENTAL CONSERVATION
  // --------------------------------------------------------------------------
  {
    id: 'ss2-bio-t2-w12',
    associatedQuizId: 'waec-bio-ss2-nutrient-cycles',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 12,
    topicTitle: 'Biogeochemical Cycles & Environmental Conservation in Nigeria',
    subtopics: [
      'The Carbon Cycle: Photosynthesis, Respiration, Combustion, and Fossilization',
      'The Nitrogen Cycle: Nitrogen Fixation, Nitrification, Assimilation, and Denitrification',
      'The Hydrological (Water) Cycle: Evapotranspiration, Condensation, and Precipitation',
      'Environmental Pollution and Climate Change: Greenhouse Effect and Global Warming',
      'Biodiversity Conservation, Afforestation, and Game Reserves in Nigeria (Yankari, Kainji)'
    ],
    readingTimeMinutes: 16,
    summary: 'The biogeochemical recycling of carbon, nitrogen, and water, human environmental impacts, and nature conservation initiatives across Nigerian reserves.',
    contentMarkdown: `### 1. The Nitrogen Cycle: Key Bacterial Agents

Atmospheric nitrogen gas ($N_2$) comprises $\\approx 78\\%$ of air but cannot be directly metabolized by plants or animals. It must be converted into soluble nitrates ($NO_3^-$) through biological and industrial cycles.

| Process in Nitrogen Cycle | Biological / Chemical Agent | Chemical Transformation |
|---|---|---|
| **Symbiotic Nitrogen Fixation** | *Rhizobium* bacteria in root nodules of legumes (cowpea, groundnut) | Atmospheric $N_2 \\to$ Organic nitrogen / Amino acids |
| **Free-Living Nitrogen Fixation** | *Azotobacter* (aerobic) and *Clostridium* (anaerobic) in soil | Atmospheric $N_2 \\to$ Ammonium compounds in soil |
| **Nitrification (Step 1)** | *Nitrosomonas* bacteria | Ammonium ($NH_4^+$) $\\to$ Nitrites ($NO_2^-$) |
| **Nitrification (Step 2)** | *Nitrobacter* bacteria | Nitrites ($NO_2^-$) $\\to$ **Nitrates ($NO_3^-$)** (Plant absorbable) |
| **Denitrification** | *Pseudomonas denitrificans* in waterlogged, anaerobic soils | Nitrates ($NO_3^-$) $\\to$ Atmospheric $N_2$ (Nutrient loss) |

---

### 2. Environmental Conservation in Nigeria

**Conservation** is the planned, sustainable management and preservation of natural resources to prevent their exploitation, destruction, or irreversible extinction.

- **Major Nigerian Game Reserves & National Parks:**
  1. **Yankari National Park (Bauchi State):** Famous for warm springs (Wikki Springs) and conservation of African savanna elephants and lions.
  2. **Kainji Lake National Park (Niger/Kwara States):** Protects aquatic wetlands and savanna mammalian biodiversity.
  3. **Cross River National Park (Cross River State):** Preserves Nigeria's most pristine tropical lowland rainforest, safeguarding the endangered Cross River gorilla.
- **Afforestation:** Planting trees in degraded areas (e.g. the Great Green Wall project in northern Nigeria to combat Sahara desertification).`,
    keyTakeaways: [
      'Nitrosomonas converts ammonia to nitrites; Nitrobacter converts nitrites to absorbable nitrates.',
      'Denitrifying bacteria convert soil nitrates back into atmospheric nitrogen under waterlogged conditions.',
      'Yankari and Kainji Lake are key Nigerian national parks dedicated to biodiversity conservation.'
    ]
  }
];
