import { CurriculumTopic } from '../types';

export const SS1_BIOLOGY_TOPICS: CurriculumTopic[] = [
  {
    id: 'ss1-bio-t2-w1',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Organization of Life & Plant and Animal Tissues',
    subtopics: [
      'Levels of Biological Organization: Cell, Tissue, Organ, System, and Organism',
      'Plant Tissues: Meristematic (Apical & Lateral), Epidermal, Ground, and Vascular',
      'Ground Tissues: Parenchyma, Collenchyma, and Sclerenchyma Characteristics',
      'Animal Tissues: Epithelial, Connective, Muscular, and Nervous Tissues',
      'Microscopic Identification and Physiological Roles in Organ Function',
      'WAEC SSCE Practical Specimen Identification Rules'
    ],
    readingTimeMinutes: 15,
    summary: 'Comprehensive analysis of biological organization from cellular units to complex organs, exploring plant histology (meristems, parenchyma, collenchyma, sclerenchyma, vascular bundles) and animal histology with WAEC specimen guidelines.',
    contentMarkdown: `### 1. Hierarchy of Biological Organization

Living organisms exhibit structural complexity arranged in hierarchical levels:

\`\`\`
+--------------------------------------------------------------------------+
|                  LEVELS OF STRUCTURAL ORGANIZATION                        |
|                                                                          |
|   Level 1: CELL        Basic structural & functional unit of life.        |
|                        Examples: Amoeba, Chlamydomonas, Red Blood Cell   |
|                                                                          |
|   Level 2: TISSUE      Group of similar cells performing a common task.  |
|                        Examples: Mesophyll tissue, Blood, Parenchyma     |
|                                                                          |
|   Level 3: ORGAN       Collection of different tissues working together.  |
|                        Examples: Heart, Kidney, Leaf, Flower, Stem       |
|                                                                          |
|   Level 4: SYSTEM      Group of organs cooperating to carry out life      |
|                        functions. Examples: Digestive, Circulatory       |
|                                                                          |
|   Level 5: ORGANISM    Complete individual living entity capable of      |
|                        independent survival (e.g., Human, Mango Tree)    |
+--------------------------------------------------------------------------+
\`\`\`

---

### 2. Plant Tissues: Classification & Specialization

Plant tissues are divided into two primary categories: **Meristematic Tissues** (actively dividing, undifferentiated cells) and **Permanent Tissues** (specialized, mature cells).

\`\`\`
+-----------------------+-----------------------------+-------------------------------+
| PLANT TISSUE          | STRUCTURAL CHARACTERISTICS  | PRIMARY PHYSIOLOGICAL ROLE    |
+-----------------------+-----------------------------+-------------------------------+
| **Meristematic**      | Thin walls, dense cytoplasm,| Primary growth (apical buds) &|
| (Apical & Lateral)    | prominent nuclei, no vacuole| secondary growth (cambium)    |
+-----------------------+-----------------------------+-------------------------------+
| **Parenchyma**        | Thin primary cellulose cell | Photosynthesis (chlorenchyma),|
|                       | walls, large central vacuole| food storage (yam tuber starch)|
+-----------------------+-----------------------------+-------------------------------+
| **Collenchyma**       | Unevenly thickened cellulose| Flexible mechanical support in|
|                       | corners, living protoplast  | young growing stems & petioles|
+-----------------------+-----------------------------+-------------------------------+
| **Sclerenchyma**      | Heavily lignified secondary | Rigid mechanical strength;    |
| (Fibers & Sclereids)  | walls, dead at maturity     | protective shells of nuts     |
+-----------------------+-----------------------------+-------------------------------+
| **Xylem**             | Dead hollow vessels &       | Conducts water and mineral    |
|                       | tracheids with lignin rings | salts; provides support       |
+-----------------------+-----------------------------+-------------------------------+
| **Phloem**            | Sieve tubes & companion     | Translocates manufactured     |
|                       | cells with perforated plates| sucrose from leaves to sinks  |
+-----------------------+-----------------------------+-------------------------------+
\`\`\`

---

### 3. Animal Tissues: Classification & Anatomy

Animal tissues are classified into four primary functional groups:

1. **Epithelial Tissue:**
   - Covers body surfaces, lines hollow cavities (blood vessels, lungs, gut), and forms glands.
   - Types:
     - *Simple Squamous:* Single layer of flattened tiles facilitating rapid diffusion (lung alveoli, capillary walls).
     - *Ciliated Columnar:* Columnar cells with surface hair-like cilia propelling mucus (trachea, oviduct/fallopian tube).
     - *Stratified Squamous:* Multiple layers providing resistance against friction and mechanical abrasion (human skin epidermis).

2. **Connective Tissue:**
   - Binds, supports, and protects other bodily structures.
   - Consists of living cells suspended in an extracellular matrix.
   - *Areolar & Adipose:* Packaging tissue cushioning organs and storing subcutaneous neutral fats.
   - *Cartilage & Bone:* Chondrocytes in chondrin matrix (flexible) vs osteocytes in calcium phosphate matrix (rigid skeleton).
   - *Vascular / Blood:* Liquid matrix (plasma) carrying erythrocytes, leucocytes, and platelets.

3. **Muscular Tissue:**
   - Contractile tissue responsible for mechanical movement.
   - *Skeletal (Striated / Voluntary):* Cylindrical multinucleate fibers attached to bones for conscious locomotion.
   - *Smooth (Non-striated / Involuntary):* Spindle-shaped mononucleate cells in hollow organ walls (stomach, intestines, bladder).
   - *Cardiac:* Branching striated fibers with intercalated discs found exclusively in the heart wall (myocardium).

4. **Nervous Tissue:**
   - Specialized for irritability and conductivity. Composed of **Neurons** (sensory, relay, motor) and supporting neuroglial cells.

---

### 4. WAEC Checkpoint Practice Questions

1. **Which of the following plant tissues is dead at maturity and heavily reinforced with lignin?**
   - A) Parenchyma
   - B) Collenchyma
   - C) Sclerenchyma *(Correct — Sclerenchyma fibers and stone cells lose their protoplasts and develop thick lignified secondary walls for maximum mechanical rigidity)*
   - D) Companion cells
2. **The tissue that lines the mammalian fallopian tube and propels the ovum toward the uterus is:**
   - A) Stratified squamous epithelium
   - B) Ciliated columnar epithelium *(Correct — The rhythmic beating of cilia creates a fluid current that sweeps the ovum into the uterine cavity)*
   - C) Areolar connective tissue
   - D) Smooth muscle tissue`,
    keyTakeaways: [
      "The five levels of organization are Cell -> Tissue -> Organ -> System -> Organism.",
      "Collenchyma has unevenly thickened cellulose corners; sclerenchyma has uniform lignified walls and is dead at maturity.",
      "Xylem conducts water and dissolved ions upward; phloem translocates manufactured food bidirectionally.",
      "Cardiac muscle is involuntary, striated, and characterized by intercalated discs that synchronize heartbeats."
    ],
    associatedQuizId: 'waec-biology-tissues-organs-2025'
  },
  {
    id: 'ss1-bio-t2-w2',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Supporting Systems in Animals & Plants',
    subtopics: [
      'Biological Roles of Skeletons: Shape, Support, Protection, and Locomotion',
      'Types of Skeletons: Hydrostatic, Exoskeleton, and Endoskeleton',
      'Ecdysis (Moulting) in Arthropods: Hormonal Mechanism and Growth Curves',
      'The Mammalian Skeleton: Axial (Skull, Vertebral Column, Ribs, Sternum) vs Appendicular',
      'Structure of Typical Vertebrae (Cervical, Thoracic, Lumbar, Sacral, Caudal)',
      'Plant Supporting Mechanisms: Turgor Pressure and Lignified Vascular Tissues'
    ],
    readingTimeMinutes: 16,
    summary: 'A comparative study of supporting mechanisms in living organisms: hydrostatic skeletons in earthworms, arthropod chitinous exoskeletons and ecdysis growth curves, the human axial and appendicular skeletal framework, and turgor/lignin support in botany.',
    contentMarkdown: `### 1. Types of Skeletal Systems in Living Organisms

A skeletal framework is vital for overcoming gravity, maintaining posture, defending internal visceral organs, and furnishing anchor points for muscular contraction.

\`\`\`
+-----------------------+-----------------------------+-------------------------------+
| SKELETAL TYPE         | COMPOSITION & MECHANISM     | ANIMAL REPRESENTATIVES        |
+-----------------------+-----------------------------+-------------------------------+
| **Hydrostatic**       | Incompressible coelomic     | Earthworm (*Lumbricus*),      |
|                       | fluid under pressure        | Hydra, Sea anemone            |
+-----------------------+-----------------------------+-------------------------------+
| **Exoskeleton**       | External rigid cuticle of   | Insects (Cockroach), Crabs,   |
|                       | chitin hardened with protein| Millipedes, Spiders           |
+-----------------------+-----------------------------+-------------------------------+
| **Endoskeleton**      | Internal framework of bone  | Vertebrates: Fish, Amphibians,|
|                       | (calcium phosphate) & cart. | Reptiles, Birds, Mammals      |
+-----------------------+-----------------------------+-------------------------------+
\`\`\`

---

### 2. The Arthropod Exoskeleton & Ecdysis Growth Step-Graph

Because chitin cannot expand once hardened, arthropods exhibit discontinuous, stepped growth through periodic shedding called **Ecdysis (Moulting)**:

\`\`\`
     Body Size
         ^
         |                    ----------------- (Adult Imago)
         |                   /
         |                  |  <-- Rapid growth period while new cuticle is soft
         |         ---------- (Instar 2)
         |        /
         |       |  <-- Ecdysis occurs (Controlled by ecdysone hormone)
         |  ------ (Instar 1)
         | /
         +---------------------------------------------> Time
\`\`\`

- **Advantage:** Prevents water loss (desiccation) in terrestrial insects; protects against predators.
- **Limitation:** Limits maximum body size due to weight and restricts continuous gradual growth.

---

### 3. The Mammalian Skeletal Framework

The human adult skeleton contains **206 bones** grouped into two anatomical divisions:

1. **Axial Skeleton (80 bones):**
   - **Skull:** Cranium (8 bones protecting the brain) and facial skeleton (14 bones).
   - **Vertebral Column (Spine):** 33 vertebrae arranged in five distinct anatomical zones:
     - *Cervical Vertebrae (7):* Neck region. Includes the **Atlas** (nodding) and **Axis** (rotational shaking of head). Possesses vertebrarterial canals for blood vessels.
     - *Thoracic Vertebrae (12):* Articulate with the 12 pairs of ribs via costal facets. Possess long, prominent neural spines sloping backwards.
     - *Lumbar Vertebrae (5):* Lower back. Massive centra and broad transverse processes for supporting upper body weight.
     - *Sacral Vertebrae (5 fused -> Sacrum):* Anchors the pelvic girdle.
     - *Caudal Vertebrae (4 fused -> Coccyx):* Remnant tail bones.
   - **Ribs (12 pairs):** True ribs (pairs 1–7 attached directly to sternum), False ribs (pairs 8–10 attached via costal cartilage), Floating ribs (pairs 11–12 unattached anteriorly).

2. **Appendicular Skeleton (126 bones):**
   - **Pectoral Girdle & Forelimbs:** Scapula (shoulder blade), Clavicle (collar bone), Humerus, Radius, Ulna, Carpals, Metacarpals, Phalanges.
   - **Pelvic Girdle & Hindlimbs:** Innominate bone (Ilium, Ischium, Pubis), Femur (thigh bone - longest in body), Patella, Tibia, Fibula, Tarsals, Metatarsals, Phalanges.

---

### 4. Supporting Mechanisms in Plants

Plants lack an internal bony skeleton. Support is achieved via two distinct biological strategies:

1. **Turgor Pressure in Herbaceous Plants:**
   - Water entering parenchyma and collenchyma cells by osmosis exerts hydrostatic pressure outward against the cell wall (**Turgor Pressure**).
   - Keeps non-woody plants erect. When water is deficient, cells undergo plasmolysis and the plant **wilts**.

2. **Lignified Tissues in Woody Plants:**
   - Secondary thickening with **lignin** transforms xylem vessels, tracheids, and sclerenchyma fibers into rigid timber that resists severe bending and compressive winds.

---

### 5. WAEC Checkpoint Practice Questions

1. **Which of the following vertebrae possesses vertebrarterial canals for the passage of vertebral blood vessels?**
   - A) Lumbar
   - B) Thoracic
   - C) Cervical *(Correct — All cervical vertebrae have a canalis vertebrarterialis in their transverse processes)*
   - D) Sacral
2. **The stepped, discontinuous growth curve observed in grasshoppers is a direct consequence of:**
   - A) Endoskeletal cartilage ossification
   - B) The rigid non-elastic chitinous exoskeleton necessitating ecdysis *(Correct — Physical growth occurs only immediately following shedding of the old cuticle before the new layer hardens)*
   - C) Fluctuation in body temperature
   - D) Lack of bone marrow`,
    keyTakeaways: [
      "The axial skeleton includes the skull, vertebral column, ribs, and sternum; the appendicular skeleton includes the girdles and limbs.",
      "The cervical vertebral formula in humans is C7, with Atlas (C1) lacking a centrum and Axis (C2) bearing the odontoid process.",
      "Thoracic vertebrae possess long backward-pointing neural spines and costal facets for rib articulation.",
      "Herbaceous plants depend on cellular turgor pressure; woody plants depend on lignified sclerenchyma and secondary xylem."
    ],
    associatedQuizId: 'waec-biology-skeletal-systems-2025'
  },
  {
    id: 'ss1-bio-t2-w3',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Plant Nutrition: Photosynthesis & Mineral Requirements',
    subtopics: [
      'Chemical Nature of Photosynthesis: Autotrophic Nutrition Equations',
      'Internal Anatomy of a Dicot Leaf: Mesophyll, Stomata, and Vascular Bundles',
      'The Two Biochemical Phases: Light-Dependent (Photolysis) & Dark Reactions (Calvin Cycle)',
      'Factors Governing Photosynthetic Rate: Light, Temperature, and Carbon Dioxide',
      'Essential Mineral Elements: Macronutrients vs Micronutrients',
      'Mineral Deficiency Symptoms in Nigerian Agricultural Crops'
    ],
    readingTimeMinutes: 16,
    summary: 'Detailed examination of autotrophic plant nutrition, structural leaf adaptations, photochemical photolysis of water in thylakoids, the Calvin cycle in the stroma, and the vital role of macro/micronutrients in crop physiology.',
    contentMarkdown: `### 1. The Chemical Process of Photosynthesis

Photosynthesis is the endothermic biochemical process by which green plants manufacture glucose from inorganic carbon dioxide and water using light energy absorbed by chlorophyll:

$$6\\text{CO}_2 + 6\\text{H}_2\\text{O} \\xrightarrow{\\text{Light energy, Chlorophyll}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2$$

---

### 2. Anatomical Cross-Section of a Dicot Leaf

\`\`\`
+--------------------------------------------------------------------------+
|                  MICROSCOPIC CROSS-SECTION OF A FOLIAR LEAF              |
|                                                                          |
|   [ Waxy Cuticle ]       Impermeable transparent lipid layer (stops H2O)  |
|   [ Upper Epidermis ]    Single layer of transparent cells, no chloroplast|
|   [ Palisade Mesophyll ] Columnar cells, packed with 80% of chloroplasts, |
|                          arranged vertically to maximize light absorption |
|   [ Spongy Mesophyll ]   Loosely arranged irregular cells with large air  |
|                          spaces facilitating CO2 & O2 gas diffusion       |
|   [ Vascular Bundle ]    Xylem (top: water delivery) + Phloem (bottom:    |
|                          sucrose translocation)                           |
|   [ Lower Epidermis ]    Contains stomatal pores bounded by Guard Cells   |
|   [ Guard Cells ]        Only epidermal cells containing chloroplasts;    |
|                          regulate stomatal opening and transpiration      |
+--------------------------------------------------------------------------+
\`\`\`

---

### 3. The Two Biochemical Phases of Photosynthesis

\`\`\`
+-----------------------+-----------------------------+-------------------------------+
| FEATURE               | LIGHT STAGE (Photochemical) | DARK STAGE (Calvin Cycle)     |
+-----------------------+-----------------------------+-------------------------------+
| **Site of Reaction**  | Grana / Thylakoid membranes | Stroma (fluid matrix of       |
|                       | of the chloroplast          | the chloroplast)              |
+-----------------------+-----------------------------+-------------------------------+
| **Light Requirement** | Strictly light-dependent    | Light-independent (can occur  |
|                       |                             | in light or darkness)         |
+-----------------------+-----------------------------+-------------------------------+
| **Key Process**       | **Photolysis of Water:**    | **Carbon Dioxide Fixation:**  |
|                       | $4\\text{H}_2\\text{O} \\to 4\\text{H}^+ + 4e^- + 2\\text{H}_2\\text{O} + \\text{O}_2$ | $\\text{CO}_2$ combines with RuBP to   |
|                       | Water is split into protons,| form phosphoglycerate (PGA)   |
|                       | electrons, and oxygen gas   | and ultimately glucose        |
+-----------------------+-----------------------------+-------------------------------+
| **End Products**      | ATP, NADPH, and Oxygen gas  | Glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$),      |
|                       | (released as a byproduct)   | ADP, and NADP+ (recycled)     |
+-----------------------+-----------------------------+-------------------------------+
\`\`\`

---

### 4. Mineral Nutrition in Plants

Plants absorb dissolved inorganic ions through root hair cells. These minerals are categorized based on the quantitative requirements of the plant:

1. **Macronutrients (Required in large quantities):**
   - **Nitrogen (N):** Absorbed as nitrates ($\\text{NO}_3^-$) or ammonium ($\\text{NH}_4^+$). Component of proteins, nucleic acids, and chlorophyll. *Deficiency:* General chlorosis (yellowing of older leaves) and stunted vegetative growth.
   - **Phosphorus (P):** Absorbed as phosphates ($\\text{H}_2\\text{PO}_4^-$). Essential for nucleic acids, ATP, and root development. *Deficiency:* Poor root growth and purple/reddish pigmentation on leaf margins.
   - **Potassium (K):** Absorbed as $\\text{K}^+$. Enzyme activator, osmotic regulation of guard cells. *Deficiency:* Premature death of leaf tips and margins (scorched leaf margins).
   - **Magnesium (Mg):** Absorbed as $\\text{Mg}^{2+}$. Central metallic atom of the chlorophyll porphyrin ring. *Deficiency:* Severe interveinal chlorosis.
   - **Calcium (Ca):** Absorbed as $\\text{Ca}^{2+}$. Forms calcium pectate in the middle lamella of cell walls. *Deficiency:* Death of apical meristems and growing tips.

2. **Micronutrients / Trace Elements (Required in minute quantities):**
   - **Iron (Fe):** Catalyst for chlorophyll synthesis and electron transport.
   - **Zinc (Zn), Copper (Cu), Manganese (Mn), Boron (B), Molybdenum (Mo):** Function as essential enzyme cofactors.

---

### 5. WAEC Checkpoint Practice Questions

1. **The oxygen liberated during the process of photosynthesis originates directly from:**
   - A) Atmospheric carbon dioxide
   - B) The splitting of water molecules during photolysis *(Correct — Experiments by Ruben and Kamen using radioactive Oxygen-18 proved that liberated oxygen gas comes from H2O, not CO2)*
   - C) Breakdown of glucose
   - D) Disintegration of the chlorophyll molecule
2. **A farmer in Ondo State observes that the older leaves of his cocoa seedlings are turning pale yellow while the veins remain green. This symptom is most likely due to a deficiency in:**
   - A) Nitrogen
   - B) Magnesium *(Correct — Magnesium is the central element in the chlorophyll molecule; its deficiency induces interveinal chlorosis)*
   - C) Phosphorus
   - D) Calcium`,
    keyTakeaways: [
      "Photolysis of water occurs in the grana and produces oxygen, ATP, and NADPH.",
      "The dark reaction (Calvin cycle) occurs in the stroma and reduces carbon dioxide to glucose.",
      "Palisade mesophyll cells are vertically arranged and contain the highest density of chloroplasts for light harvesting.",
      "Magnesium is the structural core of chlorophyll; nitrogen is vital for amino acids and proteins."
    ],
    associatedQuizId: 'waec-biology-photosynthesis-2025'
  },
  {
    id: 'ss1-bio-t2-w4',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Animal Nutrition: Food Substances, Diet & Enzyme Kinetics',
    subtopics: [
      'Classes of Food Substances: Carbohydrates, Proteins, Lipids, Vitamins, Minerals, and Roughage',
      'Biochemical Roles: Energy Yielding, Tissue Building, and Regulatory Nutrients',
      'Balanced Diet Formulation & Nutritional Deficiency Diseases in West Africa',
      'Laboratory Food Tests: Iodine, Benedict\'s/Fehling\'s, Biuret, Millon\'s, and Sudan III',
      'Properties of Enzymes: Substrate Specificity, Temperature Optimum, and pH Profiles',
      'The Lock-and-Key Hypothesis of Enzyme Catalysis'
    ],
    readingTimeMinutes: 16,
    summary: 'Systematic study of heterotrophic nutrition, balanced diet requirements, clinical deficiency diseases (kwashiorkor, marasmus, scurvy, rickets), official WAEC biochemical food test reagents, and the kinetics of digestive enzymes.',
    contentMarkdown: `### 1. Classes of Food Substances & Biological Functions

Animals are **heterotrophs** that must ingest organic matter synthesized by other organisms:

1. **Carbohydrates:** Monosaccharides (glucose, fructose), Disaccharides (sucrose, maltose, lactose), Polysaccharides (starch, glycogen, cellulose). Primary source of metabolic energy ($17\\text{ kJ/g}$).
2. **Proteins:** Polymers of amino acids linked by peptide bonds. Essential for somatic cell growth, tissue repair, enzyme and hormone synthesis ($17\\text{ kJ/g}$).
3. **Lipids (Fats and Oils):** Esters of glycerol and three fatty acids. Long-term energy storage ($38\\text{ kJ/g}$), thermal insulation, and solvent for fat-soluble vitamins (A, D, E, K).
4. **Vitamins:** Organic compounds required in minute quantities for metabolic regulation:
   - *Vitamin A (Retinol):* Visual purple (rhodopsin) in retina. *Deficiency:* Night blindness (nyctalopia).
   - *Vitamin B1 (Thiamine):* Carbohydrate metabolism. *Deficiency:* Beriberi.
   - *Vitamin B3 (Niacin):* Cellular respiration. *Deficiency:* Pellagra (dermatitis, diarrhea, dementia).
   - *Vitamin C (Ascorbic Acid):* Collagen synthesis in gums and capillary walls. *Deficiency:* Scurvy (bleeding gums).
   - *Vitamin D (Calciferol):* Absorption of calcium and phosphorus. *Deficiency:* Rickets in children; Osteomalacia in adults.
   - *Vitamin K (Phylloquinone):* Blood clotting (prothrombin synthesis). *Deficiency:* Hemorrhage.

---

### 2. Standard Laboratory Food Test Protocols (WAEC SSCE Practical)

\`\`\`
+------------------+-----------------------------+-----------------------------+-------------------------------+
| FOOD SUBSTANCE   | REAGENTS & PROCEDURE        | POSITIVE OBSERVATION        | INFERENCE                     |
+------------------+-----------------------------+-----------------------------+-------------------------------+
| **Starch**       | Add 2–3 drops of            | Blue-black coloration       | Starch present                |
|                  | Iodine solution to sample   |                             |                               |
+------------------+-----------------------------+-----------------------------+-------------------------------+
| **Reducing Sugar**| Add equal volume of         | Brick-red precipitate       | Reducing sugar present        |
| (e.g. Glucose)   | Benedict's/Fehling's (A+B); | (Green -> Yellow -> Red)   | (e.g., Maltose, Glucose)      |
|                  | boil in water bath          |                             |                               |
+------------------+-----------------------------+-----------------------------+-------------------------------+
| **Complex Protein**| Biuret Test: Add dilute     | Violet / Purple coloration  | Protein present               |
|                  | NaOH, then 1% CuSO4 drops   |                             |                               |
+------------------+-----------------------------+-----------------------------+-------------------------------+
| **Protein**      | Millon's Reagent;           | White precipitate turns     | Protein present               |
|                  | warm gently in water bath   | brick-red upon heating      |                               |
+------------------+-----------------------------+-----------------------------+-------------------------------+
| **Lipids (Fats)**| Emulsion Test: Dissolve in  | Turbid white emulsion       | Lipid present                 |
|                  | ethanol; add cold water     |                             |                               |
+------------------+-----------------------------+-----------------------------+-------------------------------+
| **Lipids**       | Sudan III solution          | Red staining of fat globules| Lipid present                 |
|                  |                             | or greasy translucent spot  |                               |
+------------------+-----------------------------+-----------------------------+-------------------------------+
\`\`\`

---

### 3. Enzymes: Biological Catalysts & Kinetics

Enzymes are protein catalysts that accelerate biochemical reactions without being consumed:

- **Key Properties:**
  1. *Substrate Specificity:* An enzyme acts on only one specific substrate or bond type (**Lock-and-Key Hypothesis**).
  2. *Temperature Sensitivity:* Activity peaks at an **optimum temperature** (typically $37^\\circ\\text{C}$ to $40^\\circ\\text{C}$ in mammals). Above $55^\\circ\\text{C}$–$60^\\circ\\text{C}$, the tertiary protein structure is irreversibly **denatured**.
  3. *pH Sensitivity:* Pepsin works optimally in acidic conditions (pH 1.5–2.0); salivary amylase at neutral (pH 6.8–7.0); trypsin at alkaline (pH 8.0–8.5).
  4. *Reversibility:* Most digestive and metabolic enzymes catalyze forward and reverse reactions until dynamic equilibrium is reached.

---

### 4. WAEC Checkpoint Practice Questions

1. **A student boiled an unknown food sample with Benedict's solution and observed a brick-red precipitate. The sample contains:**
   - A) Starch
   - B) Cane sugar (Sucrose)
   - C) Reducing sugar *(Correct — Monosaccharides like glucose and disaccharides like maltose reduce cupric ions ($Cu^{2+}$) to insoluble cuprous oxide ($Cu_2O$))*
   - D) Cellulose
2. **Enzymes lose their catalytic activity at temperatures exceeding $60^\\circ\\text{C}$ primarily because:**
   - A) Their active sites are saturated with substrate
   - B) Their three-dimensional protein tertiary structure is denatured *(Correct — Excessive kinetic energy disrupts hydrogen and ionic bonds, destroying the complementary shape of the active site)*
   - C) Water molecules evaporate
   - D) Activation energy increases`,
    keyTakeaways: [
      "Carbohydrates and proteins yield 17 kJ/g; lipids yield 38 kJ/g of metabolic energy.",
      "The Biuret test yields a violet/purple color for proteins; the Iodine test yields a blue-black color for starch.",
      "Enzymes are protein biocatalysts with active sites complementary to specific substrates (Lock-and-Key).",
      "High temperatures denature enzymes irreversibly by breaking tertiary hydrogen and disulphide bonds."
    ],
    associatedQuizId: 'waec-biology-animal-nutrition-2025'
  },
  {
    id: 'ss1-bio-t2-w5',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Mammalian Dentition, Alimentary Canal & Digestive Physiology',
    subtopics: [
      'Mammalian Dentition: Incisors, Canines, Premolars, and Molars',
      'Dental Formulas of Man, Carnivores (Dog), and Herbivores (Sheep/Rabbit)',
      'Internal Structure of a Tooth: Enamel, Dentine, Pulp Cavity, and Cementum',
      'The Alimentary Canal: Peristalsis, Gastric, Pancreatic, and Intestinal Digestion',
      'Anatomy of the Small Intestine: Villi, Lacteals, and Absorption Mechanisms',
      'Assimilation of Nutrients and Hepatic Portal Circulation to the Liver'
    ],
    readingTimeMinutes: 16,
    summary: 'Comprehensive anatomical and physiological study of the mammalian digestive system: comparative dental formulas, tooth histological architecture, sequential enzymatic breakdown from mouth to ileum, and villus absorption.',
    contentMarkdown: `### 1. Mammalian Dentition & Dental Formulas

Mammals exhibit **heterodont dentition** (bearing different types of specialized teeth):
- **Incisors (I):** Chisel-shaped with sharp cutting edges for biting and cutting food.
- **Canines (C):** Pointed, dagger-like teeth for seizing, puncturing, and tearing flesh (greatly enlarged in carnivores; absent in herbivores leaving a gap called the **diastema**).
- **Premolars (PM) & Molars (M):** Broad cusped grinding surfaces with multiple roots for crushing and masticating food.

\`\`\`
+-----------------------+-----------------------------+-------------------------------+
| MAMMAL                | DENTAL FORMULA (Half Jaw)   | TOTAL TEETH & SPECIALIZATION  |
+-----------------------+-----------------------------+-------------------------------+
| **Human Adult**       | $I \\frac{2}{2}, C \\frac{1}{1}, PM \\frac{2}{2}, M \\frac{3}{3}$ | $32$ teeth (Omnivorous diet)  |
+-----------------------+-----------------------------+-------------------------------+
| **Dog (Carnivore)**   | $I \\frac{3}{3}, C \\frac{1}{1}, PM \\frac{4}{4}, M \\frac{2}{3}$ | $42$ teeth (Carnassial teeth  |
|                       |                             | for bone shearing)            |
+-----------------------+-----------------------------+-------------------------------+
| **Sheep (Herbivore)** | $I \\frac{0}{3}, C \\frac{0}{1}, PM \\frac{3}{3}, M \\frac{3}{3}$ | $32$ teeth (Upper horny pad   |
|                       |                             | & diastema for cud chewing)   |
+-----------------------+-----------------------------+-------------------------------+
\`\`\`

---

### 2. Anatomical Cross-Section of a Mammalian Tooth

\`\`\`
+--------------------------------------------------------------------------+
|                  LONGITUDINAL SECTION OF A CANINE TOOTH                  |
|                                                                          |
|       [ Crown ]     ENAMEL: Hardest non-living substance in body;        |
|                     covers and protects the exposed tooth crown          |
|                     --------------------------------------------         |
|       [ Neck ]      DENTINE: Bone-like living tissue beneath enamel;     |
|                     traversed by fine microscopic cytoplasmic strands    |
|                     --------------------------------------------         |
|       [ Root ]      PULP CAVITY: Central chamber containing living       |
|                     connective tissue, blood vessels (nutrients), and    |
|                     nerve fibers (pain reception)                        |
|                     --------------------------------------------         |
|                     CEMENTUM & PERIODONTAL LIGAMENT: Anchors the tooth   |
|                     firmly into the jawbone socket                       |
+--------------------------------------------------------------------------+
\`\`\`

---

### 3. Sequential Enzymatic Digestion Along the Alimentary Canal

\`\`\`
+------------------+-------------------+--------------------+----------------------------------------+
| REGION           | JUICE / SECRETION | ENZYMES            | BIOCHEMICAL REACTION                   |
+------------------+-------------------+--------------------+----------------------------------------+
| **Mouth**        | Saliva (pH 6.8)   | Salivary Amylase   | Starch $\\to$ Maltose (disaccharide)   |
|                  | (from salivary gl)| (Ptyalin)          |                                        |
+------------------+-------------------+--------------------+----------------------------------------+
| **Stomach**      | Gastric Juice     | Pepsin (active in  | Proteins $\\to$ Peptones & Polypeptides|
|                  | (HCl, pH 1.5–2.0) | presence of HCl)   |                                        |
|                  |                   | Rennin (in infants)| Coagulates soluble caseinogen into     |
|                  |                   |                    | insoluble milk curd (casein)           |
+------------------+-------------------+--------------------+----------------------------------------+
| **Duodenum**     | Bile (from liver, | *No enzymes*       | **Emulsifies fats** (breaks big fat    |
|                  | alkaline, no enz) | (Bile salts)       | globules into tiny droplets)           |
|                  | Pancreatic Juice  | Pancreatic Amylase | Starch $\\to$ Maltose                  |
|                  | (pH 8.0)          | Trypsin            | Proteins/Peptones $\\to$ Polypeptides  |
|                  |                   | Pancreatic Lipase  | Emulsified Lipids $\\to$ Fatty acids + |
|                  |                   |                    | Glycerol                               |
+------------------+-------------------+--------------------+----------------------------------------+
| **Ileum**        | Intestinal Juice  | Erepsin (Peptidase)| Polypeptides $\\to$ Amino acids        |
| (Small Intestine)| (*Succus          | Maltase            | Maltose $\\to$ Glucose + Glucose       |
|                  |  entericus*)      | Sucrase            | Sucrose $\\to$ Glucose + Fructose      |
|                  |                   | Lactase            | Lactose $\\to$ Glucose + Galactose     |
+------------------+-------------------+--------------------+----------------------------------------+
\`\`\`

---

### 4. Absorption Architecture: The Intestinal Villus

The inner mucosal surface of the ileum is folded into millions of microscopic finger-like projections called **Villi** (singular: Villus) which increase the absorption surface area by over 600 times:

\`\`\`
                 Epithelium (One cell thick with microvilli)
                  |     |
              +---+-----+---+
              |   |     |   |
              |   |     |   |
              |   | (L) |   |  <-- Lacteal (Central lymph vessel)
              |   |     |   |      Absorbs fatty acids and glycerol
              |  /|     |\  |
              | | |     | | |  <-- Capillary Network (Surrounds lacteal)
              | | |     | | |      Absorbs glucose, amino acids, vitamins,
              +-+-+-----+-+-+      water-soluble ions into bloodstream
                    | |
           Hepatic Portal Vein -> Direct to Liver
\`\`\`

---

### 5. WAEC Checkpoint Practice Questions

1. **Which of the following digestive juices contains no digestive enzymes whatsoever, yet plays an indispensable role in lipid digestion?**
   - A) Saliva
   - B) Gastric juice
   - C) Bile *(Correct — Bile contains bile salts (sodium glycocholate and taurocholate) that emulsify fats into tiny droplets, vastly increasing the surface area for lipase action)*
   - D) Pancreatic juice
2. **The end products of lipid digestion (fatty acids and glycerol) are absorbed directly into the:**
   - A) Hepatic portal vein
   - B) Central lacteal of the villus *(Correct — Fatty acids and glycerol enter the lacteals and travel via the lymphatic system before emptying into the left subclavian vein)*
   - C) Renal vein
   - D) Pancreatic duct`,
    keyTakeaways: [
      "The adult human dental formula is I 2/2, C 1/1, PM 2/2, M 3/3 = 32 teeth.",
      "Carnassial teeth shear flesh and bone in carnivores; the diastema separates front biting teeth from grinders in herbivores.",
      "Bile has no enzymes but neutralizes acidic chyme and emulsifies fats.",
      "Glucose and amino acids are absorbed into blood capillaries and transported to the liver via the hepatic portal vein; fatty acids and glycerol enter the central lacteal."
    ],
    associatedQuizId: 'waec-biology-digestive-system-2025'
  },
  {
    id: 'ss1-bio-t2-w6',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Mid-Term Continuous Assessment & Practical Examination',
    subtopics: [
      'Section 1: Standardized Objective Testing (Weeks 1 to 5 Curriculum)',
      'Section 2: Structured Theory & Diagram Labeling Questions',
      'Diagnostic Error Analysis and Common WAEC Examination Pitfalls'
    ],
    readingTimeMinutes: 14,
    summary: 'Mid-term continuous assessment examination featuring 20 WAEC/NECO standardized questions covering biological organization, histology, skeletal frameworks, photosynthesis, food tests, dentition, and digestive physiology.',
    contentMarkdown: `### Mid-Term Examination Overview

This paper tests analytical mastery across Weeks 1 to 5:

\`\`\`
+--------------------------------------------------------------------------+
|                  MID-TERM CURRICULUM MASTERY MATRIX                      |
|                                                                          |
|   1. HISTOLOGY       : Parenchyma, collenchyma, sclerenchyma, epithelia. |
|   2. SKELETONS       : Chitinous exoskeleton, ecdysis, axial/appendicular.|
|   3. PHOTOSYNTHESIS  : Photolysis in grana, Calvin cycle in stroma.      |
|   4. BIOCHEMISTRY    : Food test reagents, enzyme kinetics & denaturation.|
|   5. DIGESTION       : Dental formulas, tooth anatomy, villus absorption. |
+--------------------------------------------------------------------------+
\`\`\`

---

### Sample Assessment Items with Technical Solutions

1. *Differentiate between the structural support of collenchyma and sclerenchyma.*
   - **Answer:** Collenchyma consists of living cells with localized, uneven cellulose thickening at the corners, providing flexible support to young growing stems. Sclerenchyma consists of dead cells with uniformly thickened, heavily lignified secondary walls, providing rigid, inelastic mechanical strength.

2. *State the biological significance of the diastema in herbivorous mammals.*
   - **Answer:** The diastema is the toothless gap between the lower incisors and the premolars (due to the absence of canines). It allows the animal to manipulate, sort, and roll grass/fodder with the tongue, and separates freshly cropped grass from food currently being chewed by premolars and molars.`,
    keyTakeaways: [
      "Always specify both the reagent and the specific color change when answering food test questions.",
      "Remember that photolysis of water produces oxygen, while carbon dioxide is reduced in the dark reaction.",
      "Ensure correct spelling of biological terms: collenchyma, sclerenchyma, ecdysis, peristalsis."
    ],
    associatedQuizId: 'ssce-biology-midterm-assessment'
  },
  {
    id: 'ss1-bio-t2-w7',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Transport Systems: Surface Area to Volume Ratio & Transport Mechanisms',
    subtopics: [
      'Need for Specialized Transport Systems: Surface Area to Volume ($SA:V$) Ratio',
      'Limits of Simple Diffusion in Multicellular vs Unicellular Organisms',
      'Physical & Physiological Transport Mechanisms: Diffusion, Osmosis, and Active Transport',
      'Cellular Osmotic Phenomena: Plasmolysis, Turgidity, Haemolysis, and Crenation',
      'Transport Media in Living Systems: Cytoplasm, Cell Sap, Haemolymph, Blood, and Lymph'
    ],
    readingTimeMinutes: 15,
    summary: 'The physical and biological principles governing internal transport: mathematical scaling of surface area to volume ratios, limits of diffusion, osmosis, active transport, and comparative transport media.',
    contentMarkdown: `### 1. The Surface Area to Volume ($SA:V$) Scaling Principle

Why do large multicellular organisms require complex circulatory and vascular transport systems, whereas an Amoeba needs none?

\`\`\`
+-----------------------+-----------------------------+-------------------------------+
| PARAMETER             | SMALL ORGANISM (Amoeba)     | LARGE ORGANISM (Mammal/Tree)  |
+-----------------------+-----------------------------+-------------------------------+
| **Linear Dimension**  | $1\\text{ unit}$             | $10\\text{ units}$            |
+-----------------------+-----------------------------+-------------------------------+
| **Surface Area (SA)** | $6 \\times 1^2 = 6\\text{ units}^2$ | $6 \\times 10^2 = 600\\text{ units}^2$|
+-----------------------+-----------------------------+-------------------------------+
| **Volume (V)**        | $1^3 = 1\\text{ unit}^3$    | $10^3 = 1,000\\text{ units}^3$|
+-----------------------+-----------------------------+-------------------------------+
| **$SA:V$ Ratio**      | $6 : 1$ (**Very Large**)    | $0.6 : 1$ (**Very Small**)    |
+-----------------------+-----------------------------+-------------------------------+
| **Diffusion Pathway** | Ultra-short ($< 0.05\\text{ mm}$)  | Extremely long ($> 1,000\\text{ mm}$) |
|                       | Diffusion across surface    | Diffusion is far too slow;    |
|                       | satisfies all gas/nutrient  | requires specialized bulk-flow|
|                       | demands completely          | circulatory pumping systems   |
+-----------------------+-----------------------------+-------------------------------+
\`\`\`

---

### 2. Biological Transport Mechanisms

1. **Diffusion:**
   - The net movement of particles from a region of higher concentration to a region of lower concentration down a concentration gradient. Passive (no ATP needed).

2. **Osmosis:**
   - The net movement of water molecules from a region of higher water potential (dilute solution) to a region of lower water potential (concentrated solution) across a **semi-permeable / selectively permeable membrane**.
   - *In Plant Cells:*
     - In hypotonic (pure) water: Absorbs water, protoplast swells against cell wall $\\implies$ **Turgid** (normal plant support).
     - In hypertonic (concentrated salt/sugar) solution: Loses water, cell membrane pulls away from cell wall $\\implies$ **Plasmolyzed**.
   - *In Animal Cells (e.g. Red Blood Cells):*
     - In hypotonic water: Lacks a rigid cell wall; absorbs water until it bursts $\\implies$ **Haemolysis**.
     - In hypertonic solution: Loses water, shrinks and shrivels $\\implies$ **Crenation**.

3. **Active Transport:**
   - Movement of ions or molecules across a cellular membrane **against** a concentration gradient (from low to high concentration).
   - Requires carrier transport proteins and metabolic energy in the form of **ATP** generated by mitochondria.
   - Example: Uptake of mineral ions by plant root hairs; reabsorption of glucose in human kidney tubules.

---

### 3. Transport Media Across the Living World

- **Cytoplasm:** Streaming movements (cyclosis) distribute materials within unicellular protozoa (*Amoeba*, *Paramecium*).
- **Cell Sap:** In plant vacuoles; distributes dissolved sugars and mineral ions between adjacent cells.
- **Latex:** Milky fluid in plants like rubber tree (*Hevea brasiliensis*); carries protective alkaloids and enzymes.
- **Haemolymph:** Circulatory fluid in insects (*Periplaneta americana*); baths tissues directly in an open circulatory system (transports nutrients and wastes, but **not oxygen**).
- **Blood & Lymph:** Closed circulatory media in vertebrates and humans transporting respiratory gases, nutrients, wastes, hormones, and antibodies.

---

### 4. WAEC Checkpoint Practice Questions

1. **When human red blood cells are placed in a hypotonic saline solution (0.2% NaCl), they will:**
   - A) Undergo plasmolysis
   - B) Swell and burst by haemolysis *(Correct — Animal cells lack a rigid cell wall to withstand turgor pressure; rapid osmotic influx ruptures the plasma membrane)*
   - C) Undergo crenation
   - D) Remain unchanged
2. **The transport of mineral ions from the soil into plant root hair cells against a concentration gradient is achieved via:**
   - A) Simple diffusion
   - B) Osmosis
   - C) Active transport *(Correct — Active transport uses cellular ATP and membrane carrier pumps to concentrate essential ions inside root tissues)*
   - D) Mass flow`,
    keyTakeaways: [
      "As organisms increase in size, their Surface Area to Volume (SA:V) ratio decreases dramatically.",
      "Diffusion is sufficient only when diffusion distance is minute; larger organisms must have bulk transport systems.",
      "Plasmolysis occurs in plant cells placed in hypertonic solutions; haemolysis occurs when animal cells burst in hypotonic solutions.",
      "Active transport requires ATP and moves solutes against their concentration gradient."
    ],
    associatedQuizId: 'waec-biology-transport-mechanisms-2025'
  },
  {
    id: 'ss1-bio-t2-w8',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'The Mammalian Circulatory System: Heart, Vessels & Cardiac Physiology',
    subtopics: [
      'Internal Anatomy of the Mammalian Heart: Chambers, Septum, and Valves',
      'Double Circulation: Pulmonary vs Systemic Circuits',
      'Structural and Functional Contrasts: Arteries, Veins, and Capillaries',
      'Composition of Mammalian Blood: Plasma, Erythrocytes, Leucocytes, and Platelets',
      'The Blood Clotting Mechanism & Cascades',
      'The ABO Blood Group System, Rhesus Factor, and Transfusion Rules'
    ],
    readingTimeMinutes: 17,
    summary: 'In-depth anatomical and physiological analysis of mammalian cardiovascular systems: 4-chambered heart anatomy, valve mechanisms, double circulation pathways, histological differences between vessels, and blood grouping genetics.',
    contentMarkdown: `### 1. Internal Anatomy of the Human Heart

The mammalian heart is a muscular pump enclosed within a double-layered protective membrane called the **Pericardium** (containing lubricating pericardial fluid):

\`\`\`
+--------------------------------------------------------------------------+
|                  DIAGRAMMATIC SECTION OF THE HUMAN HEART                 |
|                                                                          |
|                  Vena Cava             Aorta (To body tissues)           |
|                  (From body)           Pulmonary Artery (To lungs)       |
|                       \                     /                            |
|                 +------\-------------------/------+                      |
|                 |       v                 v       |                      |
|                 |  RIGHT ATRIUM      LEFT ATRIUM  |                      |
|                 |  (Deox. blood)     (Ox. blood)  |                      |
|                 |                                 |                      |
|                 |   Tricuspid         Bicuspid    |                      |
|                 |     Valve            (Mitral)   |                      |
|                 |       v                 v       |                      |
|                 |  RIGHT VENTRICLE   LEFT VENTRICLE|                     |
|                 |  (Pumps to lungs)  (Pumps to all|                      |
|                 |                    body organs) |                      |
|                 +--------\--------------/---------+                      |
|                           \   Septum   /                                 |
|                            (Thick Wall)|                                 |
|                     [ Ventricle Wall: Left is 3x Thicker! ]              |
+--------------------------------------------------------------------------+
\`\`\`

- **Why is the Left Ventricle Wall thicker than the Right?**
  - The right ventricle pumps deoxygenated blood a short distance to the nearby lungs under low pressure (**Pulmonary Circuit**).
  - The left ventricle must generate tremendous hydrostatic pressure to pump oxygenated blood through the systemic aorta to all distant extremities of the body (**Systemic Circuit**).

---

### 2. Blood Vessel Histological Matrix

\`\`\`
+------------------+-----------------------------+-----------------------------+-------------------------------+
| CHARACTERISTIC   | ARTERY                      | VEIN                        | CAPILLARY                     |
+------------------+-----------------------------+-----------------------------+-------------------------------+
| **Direction**    | Carries blood AWAY from     | Carries blood TOWARDS       | Connects arterioles to        |
|                  | the heart                   | the heart                   | venules in tissues            |
+------------------+-----------------------------+-----------------------------+-------------------------------+
| **Blood Carried**| Oxygenated (Except          | Deoxygenated (Except        | Mixed gas exchange            |
|                  | **Pulmonary Artery**)       | **Pulmonary Vein**)         | across tissue cells           |
+------------------+-----------------------------+-----------------------------+-------------------------------+
| **Wall Structure**| Thick, highly muscular,    | Thin, slightly muscular,    | Microscopic, single-cell      |
|                  | rich in elastic fibers      | few elastic fibers          | endothelial layer             |
+------------------+-----------------------------+-----------------------------+-------------------------------+
| **Lumen Size**   | Narrow (maintains high P)   | Wide (reduces resistance)   | Extremely narrow (RBCs pass   |
|                  |                             |                             | in single file)               |
+------------------+-----------------------------+-----------------------------+-------------------------------+
| **Internal P**   | Very high & pulsatile       | Low, constant pressure      | Low pressure                  |
+------------------+-----------------------------+-----------------------------+-------------------------------+
| **Valves**       | Absent (Except semilunars   | Present (Semi-lunar pocket  | Absent                        |
|                  | at aorta & pulmonary exits) | valves prevent backflow)    |                               |
+------------------+-----------------------------+-----------------------------+-------------------------------+
\`\`\`

---

### 3. Cellular Components of Blood

1. **Erythrocytes (Red Blood Cells):**
   - Biconcave disc-shaped cells without a nucleus (in mature mammals) to maximize surface area and internal volume for **Haemoglobin**.
   - Transports oxygen as **Oxyhaemoglobin** ($Hb + 4\\text{O}_2 \\rightleftharpoons Hb(\\text{O}_2)_4$). Lifespan: ~120 days.
2. **Leucocytes (White Blood Cells):**
   - Nucleated cells responsible for defense and immunity:
     - *Phagocytes (Neutrophils, Monocytes):* Engulf and digest pathogenic bacteria by phagocytosis.
     - *Lymphocytes:* Produce specialized **Antibodies** that neutralize bacterial toxins or agglutinate viruses.
3. **Thrombocytes (Platelets):**
   - Anucleated cell fragments essential for the blood clotting cascade:
     $$\\text{Platelets} + \\text{Damaged Tissue} \\to \\text{Thromboplastin}$$
     $$\\text{Prothrombin} \\xrightarrow{\\text{Thromboplastin, } \\text{Ca}^{2+}, \\text{Vit K}} \\text{Thrombin}$$
     $$\\text{Fibrinogen (Soluble)} \\xrightarrow{\\text{Thrombin}} \\text{Fibrin mesh (Insoluble clot)}$$

---

### 4. The ABO Blood Group System & Transfusion Rules

\`\`\`
+--------------+-------------------+--------------------+------------------------+----------------------+
| BLOOD GROUP  | ANTIGEN ON RBC    | ANTIBODIES IN SERUM| CAN DONATE BLOOD TO    | CAN RECEIVE FROM     |
+--------------+-------------------+--------------------+------------------------+----------------------+
| **A**        | Antigen A         | Anti-B (b)         | A, AB                  | A, O                 |
+--------------+-------------------+--------------------+------------------------+----------------------+
| **B**        | Antigen B         | Anti-A (a)         | B, AB                  | B, O                 |
+--------------+-------------------+--------------------+------------------------+----------------------+
| **AB**       | Antigens A and B  | *None*             | AB only                | A, B, AB, O          |
|              |                   |                    |                        | (**Universal Recipient**) |
+--------------+-------------------+--------------------+------------------------+----------------------+
| **O**        | *Neither A nor B* | Anti-A and Anti-B  | A, B, AB, O            | O only               |
|              |                   | (a and b)          | (**Universal Donor**)  |                      |
+--------------+-------------------+--------------------+------------------------+----------------------+
\`\`\`

- **Rhesus Factor ($Rh^+$ and $Rh^-$):**
  - If a Rhesus-negative mother carries a Rhesus-positive fetus, fetal RBCs crossing the placenta during birth sensitize the mother to produce anti-Rh antibodies.
  - In subsequent $Rh^+$ pregnancies, maternal antibodies cross the placenta and destroy fetal red blood cells, causing **Erythroblastosis Foetalis** (haemolytic disease of the newborn).

---

### 5. WAEC Checkpoint Practice Questions

1. **A person with blood group O is known as a universal donor because their red blood cells:**
   - A) Possess both A and B antigens
   - B) Possess neither A nor B antigens *(Correct — The absence of surface A and B antigens prevents agglutination when transfused into recipients with anti-A or anti-B antibodies)*
   - C) Lack white blood cells
   - D) Have no Rhesus antigens
2. **Which valve prevents the backflow of blood from the left ventricle into the left atrium during ventricular systole?**
   - A) Tricuspid valve
   - B) Bicuspid (Mitral) valve *(Correct — The bicuspid valve anchored by chordae tendineae closes during ventricular contraction, forcing blood out through the aorta)*
   - C) Pulmonary semilunar valve
   - D) Aortic semilunar valve`,
    keyTakeaways: [
      "The left ventricle has the thickest muscular wall because it pumps blood against high systemic vascular resistance.",
      "Arteries carry high-pressure blood away from the heart and have no pocket valves; veins carry low-pressure blood and contain pocket valves.",
      "Blood group O lacks antigens and is the universal donor; group AB lacks antibodies and is the universal recipient.",
      "Blood clotting requires platelets, calcium ions, vitamin K, prothrombin, and fibrinogen."
    ],
    associatedQuizId: 'waec-biology-circulatory-system-2025'
  },
  {
    id: 'ss1-bio-t2-w9',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Plant Transport: Water Uptake, Transpiration & Translocation',
    subtopics: [
      'Mechanism of Water and Mineral Absorption by Root Hairs',
      'Apoplast, Symplast, and Vacuolar Pathways to the Xylem',
      'Forces Governing the Ascent of Sap: Root Pressure, Capillarity, and Transpiration Pull',
      'Transpiration: Definition, Stomatal Regulation, and Measurement via Ganong\'s Potometer',
      'Environmental Factors Influencing Transpiration: Light, Temperature, Humidity, and Wind',
      'Translocation in the Phloem & Classic Bark Ringing / Girdling Experiments'
    ],
    readingTimeMinutes: 16,
    summary: 'Detailed botanical exploration of root hair water absorption, the cohesion-tension theory of transpiration pull, stomatal mechanics, factors affecting foliar water loss, and phloem translocation demonstrated through stem girdling.',
    contentMarkdown: `### 1. Water Uptake by Root Hair Cells

Plants absorb soil water through specialized unicellular extensions of the epidermal cells called **Root Hairs**:

\`\`\`
Soil Water (High Water Potential)
    |
    v (Osmosis across selectively permeable membrane)
Root Hair Cell Sap (Low Water Potential)
    |
    v (Osmotic gradient across cortical parenchyma)
Cortex -> Endodermis (Casparian strip) -> Pericycle -> Root Xylem Vessels
\`\`\`

- **Pathways of Water Movement:**
  1. **Apoplast Pathway:** Water travels purely through non-living cellulose cell walls and intercellular spaces (blocked at the endodermis by the suberized **Casparian strip**).
  2. **Symplast Pathway:** Water moves through living cytoplasm interconnected by microscopic cytoplasmic channels called **Plasmodesmata**.

---

### 2. Forces Driving the Upward Ascent of Sap

How does water reach the canopy of a 60-meter Iroko tree against gravity?

\`\`\`
+-----------------------+-----------------------------+-------------------------------+
| PHYSICAL FORCE        | MECHANISM OF ACTION         | EFFECTIVE HEIGHT CONTRIBUTION |
+-----------------------+-----------------------------+-------------------------------+
| **Root Pressure**     | Active pumping of ions into | Pushes water 1–2 meters up;   |
|                       | xylem creates osmotic influx| causes **Guttation** at night |
+-----------------------+-----------------------------+-------------------------------+
| **Capillarity**       | Adhesive forces between H2O | Rises only a few centimeters  |
|                       | and narrow xylem walls      | in fine xylem tubes           |
+-----------------------+-----------------------------+-------------------------------+
| **Transpiration Pull**| Evaporation of water at the | **Primary Force!** Pulls continuous|
| (Cohesion-Tension)    | leaves creates negative     | unbroken water columns to the |
|                       | tension; cohesive H-bonds   | highest treetops without breaking|
+-----------------------+-----------------------------+-------------------------------+
\`\`\`

---

### 3. Transpiration: Regulation & Measurement

**Transpiration** is the evaporation of water vapor from the aerial surfaces of plants, predominantly through foliar **Stomata** (over 90%), and to a lesser extent through **Cuticle** and **Lenticels**.

- **Measurement:** Measured quantitatively using **Ganong's Potometer** (which records the rate of water uptake by tracking an air bubble in a graduated capillary tube).
- **Environmental Factors Affecting Transpiration Rate:**
  - *Temperature:* Higher temperature increases the kinetic energy of water molecules $\\implies$ **Increases** transpiration.
  - *Light Intensity:* Triggers stomatal opening to admit $\\text{CO}_2$ for photosynthesis $\\implies$ **Increases** transpiration.
  - *Humidity:* High external water vapor in ambient air reduces the steepness of the water potential gradient $\\implies$ **Decreases** transpiration.
  - *Wind Speed:* Blows away the humid air boundary layer over leaves $\\implies$ **Increases** transpiration.

---

### 4. Translocation of Manufactured Food in Phloem

**Translocation** is the movement of soluble organic solutes (predominantly sucrose and amino acids) through the **sieve tubes** of the phloem from **sources** (mature photosynthetic leaves) to **sinks** (roots, tubers, flowers, developing fruits).

- **The Stem Girdling / Ringing Experiment:**
  - When a complete ring of outer bark, cortex, and phloem is stripped from a woody stem while leaving the central xylem intact:
    1. Water continues to travel upward to leaves (leaves remain fresh and turgid).
    2. Manufactured sucrose descending from leaves is blocked at the upper edge of the ring.
    3. The tissue immediately **above the ring swells** due to the accumulation of organic solutes; roots eventually starve and die.

---

### 5. WAEC Checkpoint Practice Questions

1. **Which environmental condition will result in the lowest rate of transpiration in a cocoa tree?**
   - A) High temperature and high wind speed
   - B) Bright sunlight and dry atmosphere
   - C) High atmospheric humidity and still air *(Correct — High relative humidity flattens the water vapor diffusion gradient, while still air allows a boundary layer of moisture to linger over stomata)*
   - D) Low humidity and strong winds
2. **In a stem ringing experiment on an orange tree, the swelling of the stem tissue immediately above the removed ring of bark is caused by the accumulation of:**
   - A) Mineral salts ascending the xylem
   - B) Water pumped by root pressure
   - C) Organic food substances translocated down the phloem *(Correct — Removing the outer phloem tissue blocks the downward translocation of sucrose and amino acids, causing localized accumulation and tissue swelling)*
   - D) Auxins stimulating cambium division`,
    keyTakeaways: [
      "Transpiration pull, powered by the cohesion and adhesion of water molecules (Dixon & Joly theory), is the main force moving sap upward.",
      "The Casparian strip in the endodermis forces water from the apoplast into the symplast pathway.",
      "High humidity decreases transpiration; high temperature, light, and wind increase it.",
      "Phloem translocates manufactured sucrose bidirectionally; ringing a stem blocks phloem and causes swelling above the girdle."
    ],
    associatedQuizId: 'waec-biology-plant-transport-2025'
  },
  {
    id: 'ss1-bio-t2-w10',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Cellular Respiration & Respiratory Systems in Animals',
    subtopics: [
      'Chemical Nature of Respiration: Cellular Energy (ATP) Generation',
      'Aerobic vs Anaerobic Respiration (Alcoholic & Lactic Acid Fermentation)',
      'Characteristics of Efficient Respiratory Surfaces',
      'Comparative Respiratory Organs: Body Surface, Tracheae, Gills, and Lungs',
      'Mechanism of Ventilation in Mammals: Intercostal Muscles and Diaphragm Action',
      'Gas Exchange Across Alveoli and Transport of Oxygen/Carbon Dioxide'
    ],
    readingTimeMinutes: 17,
    summary: 'A detailed study of cellular catabolic oxidation: aerobic breakdown vs anaerobic fermentation, evolutionary adaptations of respiratory structures (spiracles, gills, alveoli), and human pulmonary ventilation mechanisms.',
    contentMarkdown: `### 1. Cellular Respiration: Catabolic Energy Release

Cellular respiration is the biochemical oxidation of glucose inside living cells to liberate chemical energy stored as **Adenosine Triphosphate (ATP)**:

1. **Aerobic Respiration (In the presence of Oxygen):**
   $$\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\to 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + 38\\text{ ATP} \\quad (2,880\\text{ kJ})$$
   - *Stage 1 (Glycolysis):* Occurs in the **cytoplasm**. Glucose is split into two pyruvate molecules ($2\\text{ ATP}$ net). Does not require oxygen.
   - *Stage 2 (Krebs Cycle & Electron Transport Chain):* Occurs in the **mitochondria**. Pyruvate is completely broken down to $\\text{CO}_2$ and $\\text{H}_2\\text{O}$, generating an additional $36\\text{ ATP}$.

2. **Anaerobic Respiration (In the absence of Oxygen):**
   - *Alcoholic Fermentation (in Yeast / Plants):*
     $$\\text{C}_6\\text{H}_{12}\\text{O}_6 \\to 2\\text{C}_2\\text{H}_5\\text{OH (Ethanol)} + 2\\text{CO}_2 + 2\\text{ ATP}$$
   - *Lactic Acid Fermentation (in Strenuously Exercising Mammalian Muscle):*
     $$\\text{C}_6\\text{H}_{12}\\text{O}_6 \\to 2\\text{CH}_3\\text{CH(OH)COOH (Lactic Acid)} + 2\\text{ ATP}$$
     *(Lactic acid accumulation causes muscle fatigue, stiffness, and builds an **Oxygen Debt**)*.

---

### 2. Characteristics of Respiratory Surfaces

All efficient respiratory surfaces across the animal kingdom share four vital physical features:
1. **Large Surface Area:** To maximize the rate of gas diffusion (e.g. millions of alveoli in lungs, filament lamellae in fish gills).
2. **Extremely Thin Epithelium:** Minimizes diffusion distance (e.g. one-cell-thick alveolar wall).
3. **Moist Environment:** Oxygen and carbon dioxide must dissolve in water before diffusing across cell membranes.
4. **Rich Vascular Supply:** Dense capillary network rapidly transports oxygen away, maintaining a steep concentration gradient.

---

### 3. Comparative Respiratory Structures Across Animal Phyla

\`\`\`
+-----------------------+-----------------------------+-------------------------------+
| ANIMAL GROUP          | RESPIRATORY ORGAN           | ADAPTIVE MECHANISM            |
+-----------------------+-----------------------------+-------------------------------+
| **Protozoa** (Amoeba) | General body surface        | Direct diffusion across cell  |
|                       |                             | membrane (high $SA:V$ ratio)  |
+-----------------------+-----------------------------+-------------------------------+
| **Insects**           | Tracheal System             | Air enters via **Spiracles**, |
| (Grasshopper)         |                             | travels through tracheae and  |
|                       |                             | fluid-filled tracheoles directly|
|                       |                             | to tissue cells (No blood!)   |
+-----------------------+-----------------------------+-------------------------------+
| **Bony Fish**         | Gills                       | Water passes over gill        |
| (Tilapia)             | (Gill rakers, arch, lamellae)| filaments; **counter-current  |
|                       |                             | flow** ensures 80% O2 uptake  |
+-----------------------+-----------------------------+-------------------------------+
| **Toad / Frog**       | 1. Skin (Cutaneous)         | Skin is thin, vascular, moist;|
| (Amphibian)           | 2. Mouth (Buccopharyngeal)  | buccopharyngeal pump; simple  |
|                       | 3. Lungs (Pulmonary)        | sac-like lungs during activity|
+-----------------------+-----------------------------+-------------------------------+
| **Mammals**           | Lungs (Alveoli)             | Negative pressure breathing   |
| (Human)               |                             | via diaphragm & ribcage       |
+-----------------------+-----------------------------+-------------------------------+
\`\`\`

---

### 4. Ventilation Mechanics in Humans

\`\`\`
+-----------------------+-----------------------------+-------------------------------+
| PHASE                 | INHALATION (Inspiration)    | EXHALATION (Expiration)       |
+-----------------------+-----------------------------+-------------------------------+
| **Diaphragm**         | Contracts & flattens        | Relaxes & curves upward into  |
|                       | downwards                   | dome shape                    |
+-----------------------+-----------------------------+-------------------------------+
| **External Intercostals**| Contract (Pulls ribs upwards | Relax (Ribs swing downwards   |
|                       | and outwards)               | and inwards)                  |
+-----------------------+-----------------------------+-------------------------------+
| **Thoracic Volume**   | Increases markedly          | Decreases markedly            |
+-----------------------+-----------------------------+-------------------------------+
| **Intrapulmonary P**  | Drops below atmospheric P   | Rises above atmospheric P     |
+-----------------------+-----------------------------+-------------------------------+
| **Air Movement**      | Air rushes into lungs       | Air forced out of lungs       |
+-----------------------+-----------------------------+-------------------------------+
\`\`\`

---

### 5. WAEC Checkpoint Practice Questions

1. **During vigorous sprinting, the accumulation of which chemical substance in human skeletal muscles results in fatigue and oxygen debt?**
   - A) Ethanol
   - B) Lactic acid *(Correct — In the absence of sufficient oxygen, pyruvate is reduced to lactic acid, which accumulates and lowers muscle pH until broken down in the liver)*
   - C) Carbonic acid
   - D) Urea
2. **In the tracheal respiratory system of insects, oxygen is delivered directly to tissue cells via:**
   - A) Haemoglobin in the blood
   - B) Fluid-filled terminal tracheoles *(Correct — In insects, blood does not carry oxygen; the branching network of tracheoles delivers gaseous oxygen directly to individual cells)*
   - C) Malpighian tubules
   - D) Dermal gills`,
    keyTakeaways: [
      "Aerobic respiration generates 38 ATP per glucose; anaerobic fermentation generates only 2 ATP.",
      "Respiratory surfaces must be thin, moist, large in surface area, and highly vascularized.",
      "Insects deliver oxygen directly to tissues via tracheoles; blood plays no role in insect gas transport.",
      "Inhalation is active: the diaphragm contracts and flattens, intercostal muscles lift ribs, and thoracic volume increases."
    ],
    associatedQuizId: 'waec-biology-respiration-2025'
  },
  {
    id: 'ss1-bio-t2-w11',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Excretory Systems & Osmoregulation: The Mammalian Kidney',
    subtopics: [
      'Excretion vs Egestion: Distinguishing Metabolic Wastes from Digestive Residues',
      'Excretory Organs Across Animal Phyla (Contractile Vacuoles, Flame Cells, Nephridia, Malpighian Tubules)',
      'Gross Anatomy of the Mammalian Kidney: Cortex, Medulla, Pelvis, and Ureter',
      'The Nephron: Bowman\'s Capsule, Glomerulus, Proximal & Distal Convoluted Tubules, Loop of Henle',
      'The Three Stages of Urine Formation: Ultrafiltration, Selective Reabsorption, and Tubular Secretion',
      'Osmoregulation and the Hormonal Action of Antidiuretic Hormone (ADH)'
    ],
    readingTimeMinutes: 17,
    summary: 'Comprehensive anatomical and physiological study of excretion and osmoregulation: comparative phylogenetic excretory structures, detailed micro-architecture of the human nephron, ultrafiltration hemodynamics, and endocrine feedback loops.',
    contentMarkdown: `### 1. Biological Distinction: Excretion vs. Egestion

- **Excretion:** The removal of metabolic waste products, toxic substances, and substances in excess of requirements that have been formed by chemical reactions inside living cells (e.g., urea, carbon dioxide, excess salts).
- **Egestion (Defecation):** The expulsion of undigested, unabsorbed food material (feces) from the alimentary canal through the anus. This material was never part of the body's metabolic cells.

---

### 2. Comparative Excretory Organs in the Animal Kingdom

\`\`\`
+-----------------------+-----------------------------+-------------------------------+
| ANIMAL GROUP          | EXCRETORY STRUCTURE         | PRIMARY EXCRETORY PRODUCT     |
+-----------------------+-----------------------------+-------------------------------+
| **Protozoa** (Amoeba) | Contractile vacuole         | Water (Osmoregulation), CO2   |
+-----------------------+-----------------------------+-------------------------------+
| **Flatworms** (Planaria)| Flame cells (Protonephridia)| Water, ammonia, urea          |
+-----------------------+-----------------------------+-------------------------------+
| **Annelids** (Earthworm)| Nephridia                   | Urea, ammonia, excess salts   |
+-----------------------+-----------------------------+-------------------------------+
| **Insects**           | Malpighian tubules          | Insoluble Uric acid crystals  |
|                       |                             | (conserves vital water!)      |
+-----------------------+-----------------------------+-------------------------------+
| **Vertebrates** (Human)| Kidneys, Skin, Lungs, Liver| Urea, uric acid, water, salts |
+-----------------------+-----------------------------+-------------------------------+
\`\`\`

---

### 3. Detailed Anatomy of the Functional Nephron

Each human kidney contains approximately **1 to 1.2 million functional microscopic filtering units called Nephrons**:

\`\`\`
Afferent Arteriole (Wide) -> GLOMERULUS (Knot of capillaries)
                                   |
                             (Ultrafiltration under high pressure)
                                   v
                             BOWMAN'S CAPSULE
                                   |
                             PROXIMAL CONVOLUTED TUBULE
                             (100% glucose, 100% amino acids, 80% water reabsorbed)
                                   |
                             LOOP OF HENLE (Hairpin countercurrent multiplier)
                             - Descending limb: Water permeable
                             - Ascending limb: Active Na+ pump (creates salty medulla)
                                   |
                             DISTAL CONVOLUTED TUBULE
                             (Hormonal mineral regulation: Aldosterone)
                                   |
                             COLLECTING DUCT
                             (Regulated water reabsorption via ADH)
                                   v
                        Urine to Renal Pelvis -> Ureter -> Bladder
\`\`\`

---

### 4. The Three Physiological Stages of Urine Formation

1. **Ultrafiltration (Glomerular Filtration):**
   - The afferent arteriole entering the glomerulus is significantly wider than the efferent arteriole leaving it.
   - This difference in diameter creates **high hydrostatic pressure** inside the glomerular capillaries.
   - Water, glucose, amino acids, urea, and mineral salts are forced across the basement membrane into the Bowman's capsule as **Glomerular Filtrate**.
   - Large plasma proteins (albumins, globulins) and blood cells are too large to pass through and remain in the bloodstream.

2. **Selective Reabsorption:**
   - In the **Proximal Convoluted Tubule**, useful substances required by the body are actively reabsorbed back into the peritubular capillaries:
     - $100\\%$ of glucose and amino acids (active transport).
     - ~$80\\%$ of water (osmosis) and sodium ions (active transport).
   - In the **Loop of Henle**, water is conserved by establishing a hypertonic osmotic gradient in the renal medulla.

3. **Tubular Secretion & Osmoregulation:**
   - Potassium ions, hydrogen ions, creatinine, and drugs (e.g. penicillin) are actively secreted from peritubular blood into the distal tubule to regulate blood pH (7.35–7.45).
   - **Antidiuretic Hormone (ADH / Vasopressin):**
     - Secreted by the posterior pituitary gland when blood water potential is low (e.g., dehydration, excessive sweating).
     - ADH makes the collecting duct walls **more permeable to water**, increasing water reabsorption into blood $\\implies$ Produces a **small volume of concentrated, hypertonic urine**.
     - When body water is in excess, ADH secretion is inhibited $\\implies$ Large volume of dilute, hypotonic urine is excreted.

---

### 5. WAEC Checkpoint Practice Questions

1. **Which of the following substances is normally present in glomerular filtrate but entirely absent in the urine of a healthy human?**
   - A) Urea
   - B) Glucose *(Correct — In healthy individuals, 100% of filtered glucose is actively reabsorbed back into the bloodstream in the proximal convoluted tubule; presence of glucose indicates Diabetes Mellitus)*
   - C) Sodium chloride
   - D) Water
2. **Insects living in hot, arid terrestrial environments excrete nitrogenous waste primarily in the form of:**
   - A) Soluble ammonia
   - B) Urea
   - C) Insoluble uric acid crystals *(Correct — Uric acid is virtually insoluble in water and non-toxic, allowing insects to excrete nitrogen with minimal water loss)*
   - D) Nitrites`,
    keyTakeaways: [
      "Ultrafiltration occurs in the glomerulus under high hydrostatic pressure because the afferent arteriole is wider than the efferent arteriole.",
      "Selective reabsorption recovers 100% of glucose and amino acids in the proximal convoluted tubule.",
      "ADH regulates water reabsorption in the collecting ducts; lack of ADH causes Diabetes Insipidus.",
      "Insects excrete uric acid via Malpighian tubules to conserve water in terrestrial habitats."
    ],
    associatedQuizId: 'waec-biology-excretion-2025'
  },
  {
    id: 'ss1-bio-t2-w12',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 12,
    topicTitle: 'Terminal Examination & WAEC/NECO Standard Comprehensive Assessment',
    subtopics: [
      'Section 1: Comprehensive Multiple-Choice Examination (Weeks 1 to 11)',
      'Section 2: Structured Theory Questions with Step-by-Step Marking Rubrics',
      'Diagnostic Revision Guide for Senior Secondary Promotional Examinations'
    ],
    readingTimeMinutes: 18,
    summary: 'Comprehensive terminal mock examination simulating the official WAEC and NECO SSCE Biology format, evaluating mastery across all 11 weeks of the 2nd Term curriculum.',
    contentMarkdown: `### 2nd Term Terminal Examination Structure

This examination evaluates full term mastery across physiological systems:

\`\`\`
+--------------------------------------------------------------------------+
|                  TERMINAL EXAMINATION TOPIC BLUEPRINT                    |
|                                                                          |
|   Week 1: Organization of Life & Histological Tissues                    |
|   Week 2: Supporting Systems & Arthropod Moulting                        |
|   Week 3: Plant Photosynthesis & Mineral Deficiencies                    |
|   Week 4: Animal Food Substances & Enzyme Kinetics                       |
|   Week 5: Mammalian Dentition & Digestive Physiology                     |
|   Week 7: Transport Principles ($SA:V$, Osmosis, Active Transport)       |
|   Week 8: Mammalian Heart & ABO Blood Grouping                           |
|   Week 9: Plant Water Ascent & Phloem Translocation                      |
|   Week 10: Aerobic/Anaerobic Respiration & Ventilation Mechanics         |
|   Week 11: Renal Excretion, Nephron Anatomy & Osmoregulation             |
+--------------------------------------------------------------------------+
\`\`\`

---

### Section A: WAEC SSCE Standard Objective Drills

1. **Which of the following blood vessels carries oxygenated blood under the highest hydrostatic pressure?**
   - A) Pulmonary artery
   - B) Pulmonary vein
   - C) Systemic Aorta *(Correct — Originates directly from the left ventricle, bearing the highest cardiac systolic pressure to distribute blood to the entire body)*
   - D) Vena cava

2. **The Casparian strip in plant roots regulates water entry by blocking:**
   - A) The symplast pathway
   - B) The apoplast pathway *(Correct — Suberized walls of the endodermal Casparian strip force water out of cell walls into living protoplasts for selective filtering)*
   - C) Phloem translocation
   - D) Stomatal transpiration

3. **In the human nephron, the process of ultrafiltration takes place across the:**
   - A) Loop of Henle
   - B) Basement membrane between glomerulus and Bowman's capsule *(Correct — High hydrostatic pressure filters small solutes through capillary fenestrations and podocyte slits into the capsular space)*
   - C) Collecting duct
   - D) Distal convoluted tubule

4. **A food substance that produces a violet coloration when treated with sodium hydroxide followed by copper (II) sulphate contains:**
   - A) Starch
   - B) Protein *(Correct — The Biuret test forms a coordination complex between cupric ions and peptide bonds in alkaline solution)*
   - C) Lipid
   - D) Reducing sugar

5. **Which of the following animals possesses a tracheal system that delivers oxygen directly to body cells without utilizing blood as a carrier?**
   - A) Earthworm
   - B) Cockroach *(Correct — Arthropods utilize a branching network of spiracles, tracheae, and tracheoles delivering atmospheric gas directly to tissue cells)*
   - C) Toad
   - D) Tilapia fish

---

### Section B: Essay & Practical Theory Model Answers

**Question 1:**
*(a) Make a labeled diagram (8–10 cm long) of a single intestinal villus.*
*(b) State the function of each labeled part.*

**Model Marking Guide:**
- **Diagram Criteria:**
  - Clear continuous lines, no shading or double lines (1 mark).
  - Correct proportion and size (8–10 cm) (1 mark).
  - Labels: Epithelium (with microvilli), Capillary network, Central lacteal, Goblet cell, Crypt of Lieberkühn (4 marks).
- **Functions:**
  - *Microvilli / Epithelium:* Provides a single-cell-thick barrier and massive surface area for rapid absorption of nutrients (1 mark).
  - *Capillary Network:* Absorbs monosaccharides (glucose), amino acids, water, and water-soluble vitamins, carrying them directly to the liver via the hepatic portal vein (1 mark).
  - *Central Lacteal:* Absorbs fatty acids and glycerol; recombines them into chylomicrons and transports them through the lymphatic system (1 mark).
  - *Goblet Cells:* Secrete protective mucus that lubricates food passage and prevents autodigestion of the intestinal lining (1 mark).

---

**Question 2:**
*(a) Explain the Cohesion-Tension theory of the ascent of sap in tall trees.*
*(b) Describe an experiment to demonstrate that the phloem is responsible for the translocation of organic food substances in plants.*

**Model Marking Guide:**
- **(a) Cohesion-Tension Mechanism:**
  - Evaporation of water from mesophyll cell surfaces into stomatal sub-chambers creates a negative water potential gradient (tension/suction pressure) (1 mark).
  - Water molecules possess strong mutual attraction due to hydrogen bonding (**Cohesion**) (1 mark).
  - Water molecules also adhere to the hydrophilic cellulose and lignin walls of xylem vessels (**Adhesion**) (1 mark).
  - This establishes an unbroken, continuous hydrostatic column of water from the root tips to the highest leaves, pulled upward by the **Transpiration Pull** (1 mark).

- **(b) Bark Ringing / Girdling Experiment:**
  - Carefully remove a complete ring of outer bark, cortex, and phloem tissue from the stem of a potted woody plant, leaving the central xylem cylinder intact (1 mark).
  - Set up an untreated plant as a control (1 mark).
  - Provide adequate water and sunlight for 2–4 weeks (1 mark).
  - **Observation:** The stem tissue immediately above the cut ring swells noticeably, while the region below shrinks; the leaves remain green and turgid (1 mark).
  - **Conclusion:** The xylem (left intact) transported water upward to keep leaves turgid, while the downward translocation of synthesized sucrose was halted by the severed phloem, proving phloem transports organic food (1 mark).`,
    keyTakeaways: [
      "Review the distinct anatomical and functional differences between arteries, veins, and capillaries.",
      "Remember that ultrafiltration depends on the difference in diameter between the afferent and efferent arterioles.",
      "Cohesion-Tension theory explains water ascent through xylem; ringing experiments prove phloem translocates food.",
      "In WAEC diagrams, use single unbroken lines, label horizontally, and state the magnification or scale."
    ],
    associatedQuizId: 'ssce-biology-terminal-mock-2025'
  }
];
