import { CurriculumTopic } from '../types';

export const JSS3_BASIC_TECH_TOPICS: CurriculumTopic[] = [
  {
    id: 'jss3-basic-tech-t2-w1',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 1,
    topicTitle: 'Processing of Materials: Wood Conversion, Defects & Metal Extraction',
    subtopics: [
      'Timber Conversion: Plain (Through-and-Through) Sawing, Quarter Sawing, and Tangential Sawing',
      'Defects in Timber: Natural Defects (Knots, Shakes) vs. Seasoning Defects (Warping, Bowing, Cupping, Checks)',
      'Timber Seasoning: Air Seasoning vs. Kiln Seasoning and Moisture Content Calculation',
      'Timber Preservation: Chemical Preservatives (Creosote, Solignum) and Application Methods',
      'Extraction of Iron from Iron Ore: Blast Furnace Architecture, Raw Materials (Hematite, Coke, Limestone)',
      'Types of Iron & Steel: Pig Iron, Cast Iron, Wrought Iron, Plain Carbon Steels, and Alloy Steels',
      'Heat Treatment of Metals: Annealing, Normalizing, Hardening, and Tempering',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 14,
    summary: 'Comprehensive analysis of primary material processing: timber conversion methods, defect classification, seasoning thermodynamics, blast furnace smelting of iron ore, steel categorization, heat treatments, and BECE examination questions.',
    contentMarkdown: `### 1. Timber Conversion

Timber conversion is the process of sawing felled raw tree trunks (logs) into marketable commercial boards, planks, and scantlings of standard engineering dimensions.

#### Common Methods of Timber Conversion:
1. **Plain / Through-and-Through Sawing (Slash Sawing):**
   - The log is cut parallel through its entire length in successive parallel cuts.
   - *Advantages:* Simplest, fastest, and most economical method with minimal timber wastage.
   - *Disadvantages:* Boards are highly prone to warping, cupping, and twisting during drying.
2. **Quarter Sawing:**
   - The log is first sawn into four equal quarters, and each quarter is sawn radially toward the center along the medullary rays.
   - *Advantages:* Produces dimensionally stable planks with decorative grain patterns that rarely warp or split.
   - *Disadvantages:* More expensive, labor-intensive, and generates considerable off-cut waste.
3. **Tangential Sawing:**
   - Boards are sawn tangential to the annual growth rings. Planks are strong under load but shrink unevenly across their width.

\`\`\`
    PLAIN SAWING              QUARTER SAWING            TANGENTIAL SAWING
   +--------------+          +--------------+          +--------------+
   |==============|          | /| /|  |\\ |\\ |          |  ==========  |
   |==============|          |/ |/ |  | \\| \\|          |  ==========  |
   |==============|          |-----+--+-----|          |  ==========  |
   |==============|          |\\ |\\ |  | /| /|          |  ==========  |
   |==============|          | \\| \\|  |/ |/ |          |  ==========  |
   +--------------+          +--------------+          +--------------+
   Parallel slices           Cuts along rays           Tangent to rings
\`\`\`

---

### 2. Defects in Timber

A timber defect is any physical irregularity or abnormality that reduces the mechanical strength, durability, utility, or market value of wood.

#### A. Natural Defects (Occur while the tree is growing):
- **Knots:** Formed where tree branches originate from the trunk. Live knots are firmly bonded; dead knots loosen and fall out, leaving holes.
- **Shakes:** Ruptures in the wood fibers caused by severe winds or age:
  - *Heart Shake:* Cracks radiating from the pith (center) outwards.
  - *Star Shake:* Multiple cracks radiating outward in a star pattern.
  - *Ring / Cup Shake:* Separation along the concentric annual growth rings.
- **Twisted Grain:** Caused by strong prevailing winds twisting the tree during growth.

#### B. Artificial / Seasoning Defects (Caused by improper drying or conversion):
- **Bow:** Curvature along the face of a board from end to end.
- **Cup:** Transverse curvature across the width of a board.
- **Warp (Twist):** Spiral twisting where the four corners no longer lie in the same flat plane.
- **Check / End Split:** Longitudinal separation of fibers caused by rapid end-grain evaporation.

---

### 3. Timber Seasoning & Moisture Content Calculation

Freshly felled timber (*green timber*) contains $50\\% - 100\\%$ moisture by weight. **Seasoning** is the controlled reduction of moisture content down to $12\\% - 15\\%$ for indoor furniture or $15\\% - 18\\%$ for outdoor structural work.

- **Air Seasoning (Natural):** Planks are stacked horizontally under an open-sided roof with wooden stickers (spacers) separating each layer to allow natural breeze circulation. Takes 6–18 months. Cheap but slow.
- **Kiln Seasoning (Artificial):** Planks are placed in an airtight insulated chamber where steam, temperature, and ventilation are precisely regulated. Takes 3–14 days. Rapid, kills wood-boring insects, but requires expensive fuel and machinery.

#### Formula for Percentage Moisture Content:
$$\\text{Moisture Content (\\%)} = \\frac{\\text{Wet Mass (Initial)} - \\text{Dry Mass (Oven-Dried)}}{\\text{Dry Mass (Oven-Dried)}} \\times 100\\%$$

#### Worked Example:
A sample of freshly sawn Iroko timber weighed $450\\text{ g}$. After continuous drying in an electric laboratory oven at $105\^{\\circ}\\text{C}$ until constant weight was achieved, it weighed $360\\text{ g}$. Calculate its percentage moisture content.

**Solution:**
$$\\text{Moisture Content} = \\frac{450 - 360}{360} \\times 100\\% = \\frac{90}{360} \\times 100\\% = 0.25 \\times 100\\% = 25\\%$$

---

### 4. Timber Preservation

Preservatives protect seasoned timber from fungal decay (dry rot, wet rot) and wood-destroying insects (termites, powder-post beetles).
- **Tar Oils (Creosote):** Distilled from coal tar. Black/brown, pungent odor, water-resistant. Used for railway sleepers, utility poles, and bridge timbers.
- **Water-Borne Salts (Celcure, Tanalith):** Odorless, paintable; ideal for building rafters and roof trusses.
- **Organic Solvent Preservatives (Solignum):** Deeply penetrates timber; can be varnished or painted over.

---

### 5. Extraction of Iron from Iron Ore: The Blast Furnace

Iron is extracted from its primary ore, **Hematite ($\\text{Fe}_2\\text{O}_3$)** or Magnetite ($\\text{Fe}_3\\text{O}_4$), inside an industrial **Blast Furnace** standing over $30\\text{ meters}$ high.

\`\`\`
                     CHARGING HOPPER (Double Bell)
                    [ Charge: Hematite + Coke + Limestone ]
                                 ||
                                 \/
                         /----------------\
                        /                  \
                       /   UPPER ZONE (400 C - 700 C)
                      /  Fe2O3 + 3CO -> 2Fe + 3CO2
                     |                      |
                     |   MIDDLE ZONE (800 C - 1000 C)
                     |   CaCO3 -> CaO + CO2 (Limestone decomposes)
                     |   CaO + SiO2 -> CaSiO3 (Slag formation)
                     |                      |
                     |   LOWER ZONE (1500 C - 1800 C)
                     |   C + O2 -> CO2; CO2 + C -> 2CO
                      \                    /
     HOT AIR BLAST --> \  [TUYERES]       / <-- HOT AIR BLAST
     (From Stoves)      \----------------/
                           | Molten Slag  | ---> Slag Notch (Tapped for road ballast)
                           | Molten Iron  | ---> Tap Hole (Molten Pig Iron tapped)
                           +--------------+
\`\`\`

#### Functions of the Furnace Charge:
1. **Iron Ore ($\\text{Fe}_2\\text{O}_3$):** Source of metallic iron.
2. **Coke (Carbon):** Acts as fuel to generate extreme heat and produces the reducing agent carbon monoxide ($\\text{CO}$).
3. **Limestone ($\\text{CaCO}_3$):** Acts as a **flux**, decomposing to Calcium Oxide ($\\text{CaO}$) which combines with sandy silica impurities ($\\text{SiO}_2$) to form molten **Slag ($\\text{CaSiO}_3$)**. Slag floats on molten iron and is tapped off separately.

---

### 6. Types of Iron & Steels

1. **Pig Iron:** The direct product of the blast furnace. Contains $3.5\\% - 4.5\\%$ carbon. Extremely hard, brittle, and unworkable.
2. **Cast Iron:** Remelted pig iron mixed with scrap metal in a Cupola furnace. High compressive strength, excellent vibration damping (used for engine blocks, machine beds, manhole covers).
3. **Wrought Iron:** Purest commercial iron ($<0.1\\%$ carbon). Tough, ductile, malleable, highly resistant to corrosion (used for chains, gates, decorative railings).
4. **Plain Carbon Steels:**
   - *Low Carbon / Mild Steel ($0.15\\% - 0.3\\%$ C):* Ductile, weldable; used for structural beams, nails, car bodies.
   - *Medium Carbon Steel ($0.3\\% - 0.6\\%$ C):* Stronger; used for axles, connecting rods, rails.
   - *High Carbon / Tool Steel ($0.7\\% - 1.5\\%$ C):* Very hard; used for chisels, drill bits, saw blades.

---

### 7. Heat Treatment of Metals

Heat treatment is the controlled heating and cooling of solid metals to alter their mechanical and physical properties without changing their shape:
- **Annealing:** Heating steel to red heat and cooling very slowly in the furnace. Relieves internal stresses and makes metal soft and ductile.
- **Normalizing:** Heating steel and cooling in still air. Refines grain structure and restores uniformity.
- **Hardening:** Heating steel to cherry-red heat and quenching rapidly in cold water or oil. Produces maximum hardness and wear resistance, but makes metal brittle.
- **Tempering:** Reheating hardened brittle steel to a lower temperature ($220\^{\\circ}\\text{C} - 300\^{\\circ}\\text{C}$) and quenching. Reduces brittleness and restores toughness.

---

### 8. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** Why is limestone added along with iron ore and coke into the blast furnace?  
*Solution:* Limestone acts as a **flux**. It decomposes to calcium oxide, which reacts with acidic sand impurities ($\\text{SiO}_2$) to form molten calcium silicate (slag), allowing impurities to be removed.

**Question 2:** State two major advantages of kiln seasoning over natural air seasoning.  
*Solution:*
1. Kiln seasoning is completed in days rather than months or years.
2. Precise moisture content levels can be reached, and the high heat kills wood-boring insects, fungi, and larvae.`,
    keyTakeaways: [
      'Timber conversion transforms logs into planks via through-and-through, quarter, or tangential sawing.',
      'Timber seasoning reduces moisture content to prevent fungal decay, warping, and shrinkage.',
      'Iron is extracted from hematite ore in a blast furnace using coke as fuel/reducing agent and limestone as flux.',
      'Heat treatment processes (annealing, normalizing, hardening, tempering) tailor the hardness and ductility of steel.'
    ],
    associatedQuizId: 'bece-basic-tech-2025'
  },
  {
    id: 'jss3-basic-tech-t2-w2',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'Processing of Materials: Ceramics, Glass, Plastics & Rubber',
    subtopics: [
      'Ceramics & Clay Processing: Sourcing, Slaking, Kneading, Shaping Methods (Pinching, Coiling, Throwing)',
      'Firing in Kilns and Glazing for Waterproofing and Aesthetics',
      'Glass Manufacturing: Raw Materials (Silica Sand, Soda Ash, Limestone), Melting, and Annealing',
      'Types of Engineering Glass: Annealed, Toughened (Tempered), and Laminated Safety Glass',
      'Plastics: Molecular Structure, Thermoplastics vs. Thermosetting Plastics',
      'Plastics Moulding Techniques: Injection, Compression, Blow Moulding, and Extrusion',
      'Rubber Processing: Natural Latex Tapping, Coagulation, and Vulcanization with Sulfur',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 14,
    summary: 'Comprehensive analysis of non-metallic engineering materials: ceramic pottery fabrication, glass furnace synthesis, safety glass types, thermoplastic and thermosetting polymer processing, rubber vulcanization, and BECE examination questions.',
    contentMarkdown: `### 1. Ceramics and Clay Processing

Ceramics are inorganic, non-metallic materials formed from clay, shale, and minerals, shaped when plastic and hardened permanently by high-temperature firing.

#### Step-by-Step Processing Stages:
1. **Clay Sourcing & Digging:** Mined from riverbeds or quarries.
2. **Weathering & Slaking:** Raw clay is exposed to sun, rain, and water to break down hard lumps into a soft, workable slurry.
3. **Kneading / Wedging:** The clay is pressed and worked by hand or machine to remove trapped air bubbles and ensure uniform moisture consistency.
4. **Forming / Shaping Methods:**
   - *Pinching:* Shaping small hollow vessels by pressing with thumbs and fingers.
   - *Coiling:* Rolling clay into long snake-like coils and stacking them in layers (traditional Nigerian pottery, e.g., Ushafa in Abuja, Ladi Kwali pottery in Suleja).
   - *Slab Method:* Rolling clay flat into sheets using a rolling pin and joining panels with slip (liquid clay glue).
   - *Throwing (Potter’s Wheel):* Centering a lump of plastic clay on a rotating flywheel and drawing it upward into symmetrical circular shapes.
5. **Drying:** Greenware is dried slowly in the shade to prevent cracking from rapid moisture shrinkage.
6. **Bisque Firing:** Fired in a **kiln** at $800\^{\\circ}\\text{C} - 1000\^{\\circ}\\text{C}$ to permanently fuse clay particles.
7. **Glazing & Glaze Firing:** A liquid glass suspension (glaze) is applied and refired at $1100\^{\\circ}\\text{C} - 1280\^{\\circ}\\text{C}$, producing an impervious, waterproof, hygienic, and decorative finish (used for sanitary basins, wall tiles, and ceramic mugs).

---

### 2. Glass Manufacturing & Types

Glass is an amorphous, hard, brittle, transparent solid made by fusing silica sand with chemical fluxes:

#### Raw Materials:
- **Silica Sand ($\\text{SiO}_2$):** Main structural glass former ($70\\% - 74\\%$).
- **Soda Ash ($\\text{Na}_2\\text{CO}_3$):** Lowers the melting point from $1700\^{\\circ}\\text{C}$ to about $1400\^{\\circ}\\text{C}$.
- **Limestone ($\\text{CaCO}_3$):** Acts as a stabilizer to prevent the finished glass from dissolving in water.
- **Cullet:** Crushed recycled scrap glass added to accelerate melting and reduce energy costs.

#### Manufacturing Steps:
$$\\text{Batch Mixing} \\longrightarrow \\text{Melting in Furnace (1500 C)} \\longrightarrow \\text{Forming (Float Glass / Blowing)} \\longrightarrow \\text{Annealing (Slow cooling)}$$

#### Types of Glass:
1. **Annealed Glass:** Standard float glass. Brittle; breaks into large, dangerous, razor-sharp shards when impacted.
2. **Toughened / Tempered Glass:** Rapidly heated to $650\^{\\circ}\\text{C}$ and quenched with cold air blasts. Creates high compressive surface stresses. It is 4–5 times stronger than annealed glass and shatters into harmless tiny blunt pebbles upon failure (used in passenger car side windows and phone screens).
3. **Laminated Safety Glass:** Two sheets of glass bonded together with a transparent plastic polyvinyl butyral (PVB) interlayer. When cracked, glass fragments remain stuck to the interlayer without flying outward (used in automotive windscreens and bank security counters).

---

### 3. Plastics: Thermoplastics vs. Thermosetting Plastics

Plastics are synthetic organic polymers formed by linking monomer molecules into long macromolecular chains:

| Property | Thermoplastics | Thermosetting Plastics |
| :--- | :--- | :--- |
| **Molecular Structure** | Linear or branched chains held by weak secondary bonds | Heavily cross-linked 3D network with rigid covalent bonds |
| **Heat Behavior** | Soften when heated, harden when cooled; **can be remelted and reshaped repeatedly** | Decompose and char upon heating; **cannot be remelted or reshaped once cured** |
| **Recyclability** | Easily recyclable | Non-recyclable by thermal remelting |
| **Examples** | Polyethylene (polythene bags), PVC (pipes), Polystyrene, Nylon | Bakelite (electric switches), Melamine (tableware), Epoxy resin |

\`\`\`
   THERMOPLASTIC (Linear Chains)        THERMOSETTING (Cross-Linked Network)
   =============================        ----+-------+-------+----
   =============================            |       |       |
   =============================        ----+-------+-------+----
   =============================            |       |       |
   (Chains slide apart on heating)      (Permanent covalent cross-links)
\`\`\`

#### Industrial Plastics Moulding Techniques:
- **Injection Moulding:** Molten plastic is forced under high pressure through a nozzle into a cold split metal mould (used for bucket handles, bottle caps, Lego bricks).
- **Blow Moulding:** A hollow tube of molten plastic (parison) is inflated with compressed air against the walls of a hollow mould (used for water bottles, jerrycans).
- **Extrusion:** Molten plastic is continuously pushed through a shaped die orifice (used for PVC water pipes, electrical conduit trunking).
- **Compression Moulding:** Heated charge placed in an open mould cavity and closed under hydraulic press (used for Bakelite socket faceplates).

---

### 4. Rubber: Natural vs. Synthetic & Vulcanization

- **Natural Rubber:** Harvested as milky white **latex** tapped from the bark of the rubber tree (*Hevea brasiliensis*). Coagulated by adding dilute formic or ethanoic acid, then rolled into ribbed smoked sheets. Raw rubber is sticky when warm and brittle when cold.
- **Vulcanization (Discovered by Charles Goodyear in 1839):** Raw rubber is heated with $1\\% - 5\\%$ **sulfur** at $140\^{\\circ}\\text{C}$. Sulfur forms chemical cross-links between adjacent polyisoprene polymer chains.
  - *Result:* Vulcanized rubber is elastic, resilient, resistant to abrasion, non-sticky in tropical Nigerian heat, and impervious to water (used for motor vehicle tyres, conveyor belts, shoe soles).

---

### 5. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** Why is laminated glass chosen for automobile windshields instead of ordinary annealed glass?  
*Solution:* Laminated glass has a plastic PVB interlayer that holds broken fragments firmly in place during a collision, preventing jagged glass shards from flying into the driver’s face.

**Question 2:** Explain the chemical process of vulcanization in rubber technology.  
*Solution:* Heating raw rubber with sulfur to create sulfur cross-link bridges between polymer chains, improving elasticity, tensile strength, and heat resistance.`,
    keyTakeaways: [
      'Ceramics are produced from clay through wedging, shaping, drying, bisque firing, and glaze firing.',
      'Glass is manufactured by fusing silica sand, soda ash, and limestone at 1500°C; tempered and laminated glass offer safety.',
      'Thermoplastics can be remelted and reshaped repeatedly; thermosets undergo irreversible chemical cross-linking.',
      'Vulcanization cross-links natural rubber with sulfur, transforming it into strong, elastic, heat-resistant material.'
    ],
    associatedQuizId: 'bece-basic-tech-2025'
  },
  {
    id: 'jss3-basic-tech-t2-w3',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Technical Drawing: Pictorial Projections (Isometric & Oblique)',
    subtopics: [
      'Principles of Pictorial Drawing: Representing 3D Objects on 2D Drawing Surfaces',
      'Isometric Projection: Isometric Axes (30 deg - 30 deg), Isometric Lines, and Non-Isometric Lines',
      'The Box Construction Method for Stepped Blocks, Slanted Faces, and Cylinders',
      'Isometric Circles (Four-Center Approximate Ellipse Method)',
      'Oblique Projection: Cavalier (Full Scale Receding Axis) vs. Cabinet (Half Scale Receding Axis)',
      'Standard Engineering Dimensioning Rules, Title Block Specifications, and Sheet Layout',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 15,
    summary: 'Mastering pictorial projections: isometric axes geometry, box method construction, four-center ellipse for circles, cavalier vs cabinet oblique projection, engineering dimensioning rules, and BECE technical drawing practice.',
    contentMarkdown: `### 1. Pictorial Drawing Principles

Pictorial drawings display the three dimensions of an object—**Length, Width (Breadth), and Height**—simultaneously in a single comprehensive view, providing an immediate visual impression of its true shape.

---

### 2. Isometric Projection

In **Isometric Projection**, the three principal axes are inclined at equal angles of $120\^{\\circ}$ to one another. The horizontal base lines recede at **$30\^{\\circ}$ to the left and $30\^{\\circ}$ to the right**, while the vertical axis remains perpendicular ($90\^{\\circ}$).

\`\`\`
                     Vertical Axis (Height)
                            ▲
                            │
                            │
                            │
                            │
                            │
                            │
               120°         │         120°
                            │
                            │
             ◄──────────────┼──────────────►
            /               │               \
           /  30°           │           30°  \
          /                 │                 \
         /                  │                  \
        ▼                                       ▼
  Receding Axis (Length)                 Receding Axis (Width)
      (30° to horizontal)                     (30° to horizontal)
\`\`\`

#### Terminology:
- **Isometric Lines:** Any line parallel to one of the three isometric axes. Distances on these lines can be measured directly using a standard engineering scale rule ($1:1$).
- **Non-Isometric Lines:** Any line that is not parallel to the isometric axes (e.g., inclined slopes or chamfers). **Distances on non-isometric lines cannot be measured directly**; their end coordinates must be plotted on isometric lines and then joined.

#### The Box Method (Standard Drawing Algorithm):
1. Determine the maximum overall dimensions of the component: Maximum Length ($L$), Width ($W$), and Height ($H$).
2. Draw a faint isometric enclosing crate (box) matching $L \\times W \\times H$ using a $30\^{\\circ}/60\^{\\circ}$ set-square and T-square.
3. Mark out the specific cutout steps, grooves, and notches along the edges of the crate.
4. Darken the final visible outlines using a sharp $H$ or $2H$ pencil, leaving construction lines faint.

\`\`\`
        ISOMETRIC STEPPED BLOCK
                  +-------------------+
                 /                   /|
                /                   / |
               /                   /  |
              +-------------------+   |
              |                   |   +
              |                   |  /|
              |     +-------------+ / |
              |    /             /|/  |
              |   /             / +   |
              |  /             / /    |
              | +-------------+ /     |
              | |             |/      +
              +-+-------------+      /
                |             |     /
                |             |    /
                |             |   /
                +-------------+  /
                |             | /
                +-------------+/
\`\`\`

---

### 3. Isometric Circles: The Four-Center Ellipse Method

A circle viewed in isometric projection appears as an **ellipse**. It is constructed geometrically inside an isometric square (rhombus):

\`\`\`
                  A . - - - - - . B
                   /             \\
                  /       O       \\
                 /                 \\
              D ' - - - - - - - - - ' C
\`\`\`

1. Draw an isometric rhombus having sides equal to the diameter ($D$) of the circle.
2. From the obtuse angle corners ($B$ and $D$), draw lines to the midpoints of the opposite sides.
3. The intersections of these lines provide centers for the small radius arcs.
4. The obtuse corners $B$ and $D$ serve as centers for the large sweeping arcs, completing the smooth four-center approximate ellipse.

---

### 4. Oblique Projection: Cavalier vs. Cabinet

In **Oblique Projection**, the front face of the object is drawn parallel to the viewer with its true shape and true dimensions ($90\^{\\circ}$ angle between horizontal and vertical axes). The receding axis is drawn at an angle, usually **$45\^{\\circ}$**.

| Parameter | Cavalier Oblique Projection | Cabinet Oblique Projection |
| :--- | :--- | :--- |
| **Front Face** | True shape and full size | True shape and full size |
| **Receding Axis Angle** | $45\^{\\circ}$ (or $30\^{\\circ}, 60\^{\\circ}$) | $45\^{\\circ}$ |
| **Receding Axis Scale** | **Full Scale ($1:1$)** | **Half Scale ($1:2$)** |
| **Visual Appearance** | Appears unnaturally elongated / distorted in depth | Appears natural and realistic to the human eye |

---

### 5. Standard Dimensioning Rules & Sheet Layout

1. **Dimension Lines:** Thin, continuous lines ($0.25\\text{ mm}$) terminated by sharp, blackened arrowheads touching projection extension lines.
2. **Projection Lines:** Extend $2\\text{ mm}$ past the dimension line with a $1\\text{ mm}$ gap from the object outline.
3. **Placement:** Dimension figures must be placed centrally **above** horizontal dimension lines and oriented to be read from the bottom or right of the drawing sheet (Aligned System).
4. **Title Block:** Positioned at the bottom right corner of the drawing sheet containing: School Name, Student Name, Class, Title of Drawing, Scale, Date, and Examination Center Number.

---

### 6. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** At what angles are the receding base axes drawn in an isometric projection?  
*Solution:* At **$30\^{\\circ}$ to the horizontal** on both sides.

**Question 2:** Explain the difference between Cavalier oblique projection and Cabinet oblique projection.  
*Solution:* In Cavalier oblique projection, dimensions along the receding axis are drawn at **full scale ($1:1$)**, whereas in Cabinet oblique projection, receding dimensions are drawn at **half scale ($1:2$)** to eliminate visual elongation distortion.`,
    keyTakeaways: [
      'Isometric projection uses axes inclined at 120° to each other (base lines at 30° to horizontal).',
      'Non-isometric lines cannot be scaled directly; their endpoints must be plotted along isometric coordinates.',
      'Circles in isometric drawing are drawn as ellipses using the four-center approximate method.',
      'Cabinet oblique projection scales the 45° receding depth to 1:2, producing a visually realistic appearance.'
    ],
    associatedQuizId: 'bece-basic-tech-2025'
  },
  {
    id: 'jss3-basic-tech-t2-w4',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 4,
    topicTitle: 'Technical Drawing: Orthographic Projection (1st & 3rd Angle)',
    subtopics: [
      'Concepts of Orthographic Projection: Deconstructing 3D Objects into 2D Multi-View Projections',
      'Principal Planes of Projection: Vertical Plane (VP) and Horizontal Plane (HP)',
      'The Three Primary Views: Front Elevation, Plan (Top View), and End/Side Elevation',
      'First Angle Projection (British / Nigerian BECE Standard): Symbol and View Arrangement Rules',
      'Third Angle Projection (American Standard): Symbol and View Placement Geometry',
      'Projection of Simple Shaped Blocks: Hidden Detail Lines, Centerlines, and 45 deg Mitre Lines',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 15,
    summary: 'Comprehensive analysis of orthographic multi-view projection: principal planes, First vs Third angle arrangements, projection symbols, 45-degree mitre transfer lines, hidden line conventions, and BECE technical drawing problems.',
    contentMarkdown: `### 1. What is Orthographic Projection?

**Orthographic Projection** is a method of producing two or more related two-dimensional ($2\text{D}$) views of a three-dimensional ($3\text{D}$) object on mutually perpendicular planes, viewed along parallel lines of sight that are perpendicular ($90\^{\circ}$) to the plane of projection.

#### The Three Principal Views:
1. **Front Elevation:** The view seen when looking directly at the front of the object. It reveals **Length and Height**.
2. **Plan (Top View):** The view seen when looking directly down from above. It reveals **Length and Width (Breadth)**.
3. **End / Side Elevation:** The view seen looking directly at the side. It reveals **Width and Height**.

---

### 2. The Principal Planes of Projection

The space is divided into four quadrants by two intersecting planes:
- **Vertical Plane (VP):** On which the Front Elevation is projected.
- **Horizontal Plane (HP):** On which the Plan (Top View) is projected.
- When unfolding the planes onto a flat drawing sheet, the HP rotates downward about the ground line $X-Y$.

---

### 3. First Angle vs. Third Angle Projection

\`\`\`
1. FIRST ANGLE PROJECTION              2. THIRD ANGLE PROJECTION
   (Object placed in 1st Quadrant)         (Object placed in 3rd Quadrant)
   Observer -> Object -> Plane             Observer -> Plane -> Object

   +--------------------------+            +--------------------------+
   |     FRONT ELEVATION      |            |           PLAN           |
   |          (VP)            |            |           (HP)           |
   +--------------------------+            +--------------------------+
   |           PLAN           |            |     FRONT ELEVATION      |
   |          (HP)            |            |          (VP)            |
   +--------------------------+            +--------------------------+
   Rule: Plan is BELOW Front.              Rule: Plan is ABOVE Front.
   End view shown on OPPOSITE side.        End view shown on SAME side.
\`\`\`

#### International Projection Symbols:
\`\`\`
FIRST ANGLE SYMBOL:
      +-------+       /|
      |   O   |      / |
      +-------+     /  |
     (Small end)   /---|  (Frustum of Cone: Small circle on LEFT,
                  +----+   trapezoid base on RIGHT)

THIRD ANGLE SYMBOL:
         |\\       +-------+
         | \\      |   O   |
         |  \\     +-------+
         |---|     (Small circle on RIGHT)
        +----+
\`\`\`

---

### 4. Step-by-Step Multi-View Projection of a Stepped Block

Consider an L-shaped stepped bracket of Length $60\text{ mm}$, Width $40\text{ mm}$, and Height $50\text{ mm}$:

\`\`\`
       FIRST ANGLE ORTHOGRAPHIC PROJECTION
       ===================================

       FRONT ELEVATION                       END ELEVATION
       +---------+                           +---------+
       |         |                           |         |
       |         |                           |         |
       |         +-------+                   +---------+
       |                 |                   |         |
       +-----------------+                   +---------+
       |<----- 60mm ---->|                   |<--40mm->|

       ------------------------------------------------- X - Y Ground Line

       PLAN (Directly Below Front)
       +---------+-------+                   45° Mitre Line for
       |         |       |                   transferring widths
       |         |       |
       |         |       |
       +---------+-------+
       |<----- 60mm ---->|
\`\`\`

#### Procedural Rules for Precision:
1. Always project lines vertically downward from the Front Elevation to construct the Plan. Widths will align perfectly.
2. Use a **$45\^{\circ}$ Mitre Line** drawn through the intersection of the horizontal and vertical projection axes to transfer depth dimensions from the Plan directly to the End Elevation.
3. **Line Conventions:**
   - *Continuous Thick Line ($0.5\text{ mm}$):* Visible outlines and edges.
   - *Dashed Thin Line ($0.25\text{ mm}$):* Hidden edges and contours.
   - *Long-and-Short Chain Thin Line:* Center lines and axes of symmetry.

---

### 5. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** In First Angle orthographic projection, where is the Plan view positioned relative to the Front Elevation?  
*Solution:* The Plan is positioned **directly below** the Front Elevation.

**Question 2:** What is the purpose of drawing a $45\^{\circ}$ mitre line in orthographic projection?  
*Solution:* It allows dimensions of width (depth) to be accurately transferred between the Plan view and the End Elevation without manual remeasurement.`,
    keyTakeaways: [
      'Orthographic projection presents mutually perpendicular 2D views: Front Elevation, Plan, and End Elevation.',
      'In First Angle projection (BECE standard), the Plan is positioned below the Front Elevation.',
      'In Third Angle projection, the Plan is positioned above the Front Elevation.',
      'A 45° mitre line transfers depth measurements accurately between Plan and End Elevation views.'
    ],
    associatedQuizId: 'bece-basic-tech-2025'
  },
  {
    id: 'jss3-basic-tech-t2-w5',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Simple Machines & Mechanisms: Levers, Pulleys, Gears & Drives',
    subtopics: [
      'Fundamental Principles: Mechanical Advantage (MA), Velocity Ratio (VR), and Efficiency (eta)',
      'The Three Classes of Levers: First Class, Second Class, and Third Class Applications in Everyday Life',
      'Pulley Systems: Fixed Pulleys (VR=1), Movable Pulleys (VR=2), and Block & Tackle Systems (VR=n)',
      'The Inclined Plane, Screw Jack, and Wedge Mechanics',
      'Gear Systems & Belt Drives: Gear Ratios, Spur Gears, Bevel Gears, and Rack-and-Pinion Mechanisms',
      'Quantitative Numerical Calculations on Machine Performance',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 15,
    summary: 'Engineering mechanics: formulas for Mechanical Advantage, Velocity Ratio, and Efficiency; classification of levers; pulley configurations; inclined plane mechanics; gear ratios; and BECE worked numerical calculations.',
    contentMarkdown: `### 1. Fundamental Principles of Simple Machines

A machine is a tool or mechanical device that makes work easier by allowing a small input effort to overcome a much larger load resistance, or by increasing the speed or changing the direction of applied force.

#### Key Engineering Metrics:
1. **Mechanical Advantage ($MA$):** The ratio of load overcome to the effort applied. It has no units.
   $$MA = \\frac{\\text{Load } (L)}{\\text{Effort } (E)}$$
2. **Velocity Ratio ($VR$):** The ratio of the distance moved by the effort to the distance moved by the load in the same time interval:
   $$VR = \\frac{\\text{Distance moved by Effort } (d_E)}{\\text{Distance moved by Load } (d_L)}$$
3. **Efficiency ($\\eta$):** The percentage ratio of useful work output to total work input:
   $$\\eta = \\frac{\\text{Work Output}}{\\text{Work Input}} \\times 100\\% = \\frac{MA}{VR} \\times 100\\%$$

*Scientific Principle:* Because of friction in bearings and the weight of moving machine parts, **Efficiency is always less than $100\\%$** ($MA < VR$). In an ideal (frictionless) machine, Efficiency $= 100\\%$ and $MA = VR$.

---

### 2. The Three Classes of Levers

A lever consists of a rigid bar pivoted around a fixed turning point called the **Fulcrum ($F$)**, acting between the **Load ($L$)** and **Effort ($E$)**.

\`\`\`
1. FIRST CLASS LEVER (Fulcrum in Middle)
   Effort (E)                    Fulcrum (F)                  Load (L)
       ▼                             ▲                           ▲
   ────+─────────────────────────────+───────────────────────────+────
   Examples: Crowbar, Claw hammer, Scissors, Pliers, See-saw.

2. SECOND CLASS LEVER (Load in Middle)
   Fulcrum (F)                   Load (L)                    Effort (E)
       ▲                             ▼                           ▲
   ────+─────────────────────────────+───────────────────────────+────
   Examples: Wheelbarrow, Nutcracker, Paper guillotine, Bottle opener.

3. THIRD CLASS LEVER (Effort in Middle)
   Fulcrum (F)                  Effort (E)                   Load (L)
       ▲                             ▲                           ▼
   ────+─────────────────────────────+───────────────────────────+────
   Examples: Human forearm / biceps, Tweezers, Sugar tongs, Fishing rod.
\`\`\`

*Helpful Mnemonic:* **F - L - E** indicates which component is located in the **middle** for Classes 1, 2, and 3 respectively!

---

### 3. Pulley Systems

A pulley is a grooved wheel rotating on an axle supported by a block, carrying a flexible rope or cable:
- **Single Fixed Pulley:** Changes the direction of effort. $VR = 1$. $MA \\approx 1$.
- **Single Movable Pulley:** Pulley moves with the load. $VR = 2$.
- **Block and Tackle (Pulleys in Combination):** The **Velocity Ratio equals the total number of pulleys** in the combined blocks (or the number of rope segments supporting the movable load block):
$$VR = n$$

\`\`\`
   BLOCK & TACKLE SYSTEM (4 Pulleys: VR = 4)
   +=================+ (Fixed Top Block - 2 Pulleys)
   |     ( O )       |
   |       ( O )     |
   +========+========+
            | | | |
            | | | | <--- 4 Rope Segments supporting load
            | | | |
   +========+========+
   |     ( O )       |
   |       ( O )     | (Movable Bottom Block - 2 Pulleys)
   +========+========+
            |
            ▼
        LOAD (L)
\`\`\`

---

### 4. Inclined Planes and Gears

- **Inclined Plane:** A sloping surface connecting a lower level to a higher level.
  $$VR = \\frac{\\text{Length of Slant Slope } (L)}{\\text{Vertical Height } (h)} = \\frac{1}{\\sin \\theta}$$
- **Gear Drives:** Toothed wheels meshing together to transmit rotary motion and torque.
  - If Driver gear has $N_A$ teeth and Driven gear has $N_B$ teeth:
  $$\\text{Gear Ratio} = \\frac{\\text{Number of teeth on Driven Gear } (N_B)}{\\text{Number of teeth on Driver Gear } (N_A)} = \\frac{\\text{Speed of Driver } (\omega_A)}{\\text{Speed of Driven } (\omega_B)}$$
  - Two directly meshing external gears rotate in **opposite directions**. To make them rotate in the same direction, an intermediate **idler gear** is placed between them.

---

### 5. Quantitative Worked Numerical Problems

#### Problem 1:
A block and tackle pulley system consisting of 5 pulleys is used to lift a load of $1200\\text{ N}$ through a vertical distance of $4\\text{ meters}$. If an effort of $300\\text{ N}$ is applied:
1. What is the Velocity Ratio ($VR$) of the system?
2. Calculate the Mechanical Advantage ($MA$).
3. Determine the Efficiency ($\\eta$) of the machine.

**Step-by-Step Solution:**
1. For a block and tackle system, $VR = \\text{total number of pulleys} = 5$.
2. Mechanical Advantage:
   $$MA = \\frac{\\text{Load}}{\\text{Effort}} = \\frac{1200\\text{ N}}{300\\text{ N}} = 4$$
3. Efficiency:
   $$\\eta = \\frac{MA}{VR} \\times 100\\% = \\frac{4}{5} \\times 100\\% = 0.8 \\times 100\\% = 80\\%$$

---

### 6. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** Identify the class of lever to which a wheelbarrow belongs and give the reason.  
*Solution:* It is a **Second Class Lever**, because the **Load** (the basin carrying sand/cement) is situated between the **Fulcrum** (wheel axle at front) and the **Effort** (handles lifted by the worker).

**Question 2:** Why can the efficiency of a practical machine never reach $100\\%$?  
*Solution:* Because a portion of the input energy is wasted overcoming internal friction in bearings and moving components, and lifting the weight of the machine parts themselves.`,
    keyTakeaways: [
      'Mechanical Advantage is Load/Effort; Velocity Ratio is Effort Distance / Load Distance.',
      'Efficiency is (MA / VR) * 100% and is always less than 100% in practical machines due to friction.',
      'The three classes of levers follow the F-L-E rule indicating which component occupies the middle.',
      'In a block and tackle pulley system, the Velocity Ratio equals the total number of pulleys.'
    ],
    associatedQuizId: 'bece-basic-tech-2025'
  },
  {
    id: 'jss3-basic-tech-t2-w6',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 6,
    topicTitle: 'Mid-Term Continuous Assessment & Diagnostic Test',
    subtopics: [
      'Comprehensive Review of Weeks 1 to 5 Syllabus Topics',
      '15 Multi-Choice BECE Diagnostic Examination Questions with Detailed Solutions',
      'Section B: 3 Structured Practical Drawing & Calculation Questions with Marking Guide',
      'Error Analysis, Technical Drawing Notation Standards, and Score Benchmarking'
    ],
    readingTimeMinutes: 16,
    summary: 'Standardized 15-question objective diagnostic examination and 3 structured theory/calculation problems with complete marking rubric evaluating Weeks 1 to 5: timber, metallurgy, ceramics, plastics, pictorial/orthographic drawing, and mechanisms.',
    contentMarkdown: `### 1. Mid-Term Assessment Overview & Examination Instructions

This continuous assessment evaluates mastery of fundamental materials engineering, technical drawing, and mechanics covered in Weeks 1 through 5.
- **Time Allowed:** 45 minutes
- **Structure:**
  - Section A: 15 Multi-Choice Questions (15 Marks)
  - Section B: 3 Structured Drawing & Calculation Problems (15 Marks)
  - Total: 30 Marks

---

### Section A: 15 BECE Objective Questions & Step-by-Step Solutions

**1.** Which of the following timber conversion methods produces the highest grade, dimensionally stable planks with decorative grain?  
A. Plain sawing  
B. Quarter sawing  
C. Slash sawing  
D. Through-and-through sawing  
*Answer:* **B (Quarter sawing)**. Cuts along radial medullary rays prevent warping and cupping.

**2.** The defect in timber characterized by a separation of annual growth rings is known as:  
A. Heart shake  
B. Cup shake  
C. Knot  
D. Bow  
*Answer:* **B (Cup shake)**.

**3.** What is the primary role of coke inside the blast furnace during iron smelting?  
A. Acts as flux  
B. Acts as fuel and produces carbon monoxide reducing agent  
C. Removes sulfur  
D. Forms slag  
*Answer:* **B**. Coke combusts to provide heat and produces $\text{CO}$ to reduce iron ore.

**4.** Which heat treatment process is used to relieve internal stresses and soften hardened steel?  
A. Quenching  
B. Annealing  
C. Case hardening  
D. Tempering  
*Answer:* **B (Annealing)**.

**5.** Ceramics are hardened permanently through a process called:  
A. Seasoning  
B. Kiln firing  
C. Vulcanization  
D. Extrusion  
*Answer:* **B (Kiln firing)**.

**6.** Safety glass that fractures into tiny blunt dice-shaped pebbles rather than sharp shards is:  
A. Annealed glass  
B. Toughened / Tempered glass  
C. Plate glass  
D. Colored glass  
*Answer:* **B (Toughened / Tempered glass)**.

**7.** Plastics that soften repeatedly on heating and harden when cooled are categorized as:  
A. Thermosets  
B. Elastomers  
C. Thermoplastics  
D. Resins  
*Answer:* **C (Thermoplastics)**.

**8.** The substance added to raw rubber during vulcanization to create molecular cross-links is:  
A. Carbon black  
B. Sulfur  
C. Formic acid  
D. Limestone  
*Answer:* **B (Sulfur)**.

**9.** The receding axes of an isometric drawing are drawn at an angle of:  
A. $15\^{\circ}$  
B. $30\^{\circ}$  
C. $45\^{\circ}$  
D. $60\^{\circ}$  
*Answer:* **B ($30\^{\circ}$)**.

**10.** In Cavalier oblique projection, dimensions along the receding axis are drawn at:  
A. Half scale  
B. Quarter scale  
C. Full scale  
D. Double scale  
*Answer:* **C (Full scale)**.

**11.** In First Angle orthographic projection, the view positioned directly below the Front Elevation is the:  
A. End elevation  
B. Plan view  
C. Isometric view  
D. Sectional view  
*Answer:* **B (Plan view)**.

**12.** A claw hammer pulling out a nail is an example of which class of lever?  
A. First class  
B. Second class  
C. Third class  
D. Fourth class  
*Answer:* **A (First class)**. The fulcrum is situated between effort and load.

**13.** A machine has an effort distance of $12\text{ m}$ and a load distance of $3\text{ m}$. What is its Velocity Ratio?  
A. 0.25  
B. 3  
C. 4  
D. 36  
*Answer:* **C (4)**. $VR = \frac{d_E}{d_L} = \frac{12}{3} = 4$.

**14.** If a machine has an $MA$ of 3 and a $VR$ of 4, its Efficiency is:  
A. $25\%$  
B. $50\%$  
C. $75\%$  
D. $100\%$  
*Answer:* **C ($75\%$)**. $\eta = \frac{MA}{VR} \times 100\% = \frac{3}{4} \times 100\% = 75\%$.

**15.** Which moulding method is used for manufacturing seamless plastic bottles and hollow jerrycans?  
A. Compression moulding  
B. Blow moulding  
C. Calendaring  
D. Casting  
*Answer:* **B (Blow moulding)**.

---

### Section B: 3 Structured Theory & Practical Problems

#### Question 1 (Mechanics Calculation):
A crane with a pulley system of velocity ratio 6 is used to lift a container weighing $3000\text{ N}$ to a ship dock using an effort of $600\text{ N}$. Calculate:
(a) The Mechanical Advantage ($MA$). *(2 Marks)*  
(b) The Efficiency ($\\eta$) of the crane. *(2 Marks)*  
(c) The work done in lifting the container through a vertical height of $5\text{ meters}$. *(2 Marks)*

*Model Solution:*  
(a) $MA = \frac{\text{Load}}{\text{Effort}} = \frac{3000\text{ N}}{600\text{ N}} = 5$.  
(b) $\\eta = \frac{MA}{VR} \times 100\% = \frac{5}{6} \times 100\% = 83.33\%$.  
(c) $\text{Work Done} = \text{Force} \times \text{Distance} = 3000\text{ N} \times 5\text{ m} = 15,000\text{ Joules (or 15 kJ)}$.

#### Question 2 (Technical Drawing):
(a) Differentiate between First Angle and Third Angle orthographic projections with respect to the relative positions of the Front Elevation and Plan. *(3 Marks)*  
(b) Draw the official standard British/ISO symbol for First Angle Projection. *(2 Marks)*

*Model Solution:*  
(a) In First Angle projection, the Plan view is positioned **below** the Front Elevation, whereas in Third Angle projection, the Plan view is positioned **above** the Front Elevation.  
(b) The symbol features a truncated cone (frustum) with its small diameter circle on the left and the trapezoidal section with large base on the right.

#### Question 3 (Materials Engineering):
(a) A piece of wet timber weighed $600\text{ g}$. After oven drying, it weighed $480\text{ g}$. Calculate its percentage moisture content. *(2 Marks)*  
(b) State two reasons why steel is tempered after hardening. *(2 Marks)*

*Model Solution:*  
(a) $\text{Moisture Content} = \frac{600 - 480}{480} \times 100\% = \frac{120}{480} \times 100\% = 25\%$.  
(b)
1. To relieve internal quenching stresses.
2. To reduce extreme brittleness and impart toughness to cutting edges.`,
    keyTakeaways: [
      'Comprehensive mid-term evaluation tests material properties, orthographic views, and mechanics formulas.',
      'Mechanical advantage and velocity ratio allow engineers to design cranes, hoists, and machine transmissions.',
      'Mastering first angle projection standards is mandatory for Nigerian BECE technical drawing success.'
    ],
    associatedQuizId: 'bece-basic-tech-2025'
  },
  {
    id: 'jss3-basic-tech-t2-w7',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 7,
    topicTitle: 'Building Construction: Site Preparation, Setting Out, Foundations & Walls',
    subtopics: [
      'Site Preparation: Clearing, Grubbing, De-stumping, Exterminating Termites & Leveling',
      'Setting Out: The 3-4-5 Method (Pythagoras Theorem) Using Profile Boards, Line & Steel Tape',
      'Excavation of Trenches, Safety Shoring, and Timbering in Loose Soils',
      'Types of Building Foundations: Strip, Pad, Raft, and Pile Foundations for Swampy Soils in Nigeria',
      'Walls & Masonry: Concrete Hollow Blocks (Standard Dimensions 450x225x225mm and 450x150x225mm)',
      'Mortar Mix Ratios (1:4 and 1:6) and Bonding Patterns: Stretcher Bond, Header Bond & English Bond',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 15,
    summary: 'Comprehensive analysis of substructure building construction: site preparation, setting out via 3-4-5 triangulation, soil timbering, foundation types (strip, pad, raft, pile), concrete blockwork dimensions, and mortar bonding patterns.',
    contentMarkdown: `### 1. Site Preparation

Before building operations begin, the site must be prepared to ensure safety and structural stability:
1. **Clearing & Grubbing:** Cutting bushes, felling trees, removing surface topsoil containing organic matter ($150\text{ mm}$ depth).
2. **De-stumping:** Digging out tree roots completely to prevent future biological decay under foundations.
3. **Termite Extermination:** Spraying trenches and subsoil with approved chemical insecticides (anti-termite treatment) to protect future woodwork.
4. **Site Leveling:** Removing high earth mounds (cutting) and filling low depressions (filling) to create a level building terrace.

---

### 2. Setting Out: The 3-4-5 Method

**Setting out** is the process of transferring the architectural floor plan dimensions from drawing paper onto the actual physical ground using pegs, profile boards, and builder's lines.

#### Establishing Right Angles ($90\^{\circ}$) Using Pythagoras' Theorem ($3-4-5$ Method):
By the property of a right-angled triangle: $3\^2 + 4\^2 = 5\^2$ ($9 + 16 = 25$).

\`\`\`
                                  C (Profile Board)
                                  ▲
                                 /│
                                / │
                 Hypotenuse    /  │
                    5 m       /   │ 4 m (Along building line)
                             /    │
                            /  90°│
                           /──────┴
                          B  3 m   A (Corner Peg)
\`\`\`

#### Step-by-Step Algorithm:
1. Drive corner peg $A$ at the established building boundary line.
2. Measure a distance of $4\text{ meters}$ along the base line from peg $A$ and mark point $C$.
3. From corner peg $A$, pull a measuring tape along the perpendicular direction toward point $B$ to a distance of $3\text{ meters}$.
4. Adjust the direction of tape $AB$ until the diagonal distance between point $B$ and point $C$ is **exactly $5\text{ meters}$**.
5. The angle $\angle CAB$ is now mathematically guaranteed to be a true **$90\^{\circ}$ right angle**.

---

### 3. Types of Building Foundations

The **foundation** is the lowest structural part of a building (substructure) constructed below ground level to transmit the entire dead load and live load of the superstructure safely to the subsoil.

\`\`\`
1. STRIP FOUNDATION                     2. PAD FOUNDATION
   (Continuous concrete strip)             (Isolated square reinforced footing)
   +-----------------------+               +---------------+
   |   BLOCK WALL (225mm)  |               |  R.C. COLUMN  |
   |                       |               |               |
   +-----------+-----------+               +-------+-------+
         |     |                                 |   |
     +---+-----+---+                         +---+---+---+
     |  CONCRETE   |                         | CONCRETE  |
     | STRIP (675) |                         | PAD BASE  |
     +-------------+                         +-----------+

3. RAFT FOUNDATION                      4. PILE FOUNDATION
   (Solid thick reinforced slab            (Reinforced columns driven deep
    covering entire building footprint)     into load-bearing firm bedrock)
   +=======================+               +=======+=======+
   | REINFORCED SLAB BED   |               |   PILE CAP    |
   +=======================+               +-------+-------+
   | Hardcore & Blinding   |                       |   |  <-- Long Concrete
   +-----------------------+                       |   |      Pile shaft
   (For low bearing soil)                          |   |
                                                   |   |  (Swamps of Lagos,
                                                   +===+   Rivers, Bayelsa)
\`\`\`

- **Strip Foundation:** A continuous strip of concrete ($675\text{ mm}$ wide $\times 225\text{ mm}$ thick) supporting load-bearing block walls on normal firm soils.
- **Pad Foundation:** Isolated reinforced concrete bases supporting concentrated point loads from reinforced concrete columns.
- **Raft Foundation:** A continuous reinforced concrete slab extending over the entire building footprint; used where soil bearing capacity is low or variable (marshy or sandy soils).
- **Pile Foundation:** Long concrete columns driven or bored deep into the ground until they reach firm bedrock; mandatory for multi-storey buildings in swampy coastal regions like Victoria Island, Lekki, Port Harcourt, and Bayelsa State.

---

### 4. Walls and Masonry

Walls divide space into rooms, carry roof/floor loads, and provide security and weather protection.
- **Standard Sandcrete Hollow Blocks:**
  - *Load-bearing external walls:* $450\text{ mm} \times 225\text{ mm} \times 225\text{ mm}$ ($9\text{ inches}$).
  - *Non-load-bearing internal partitions:* $450\text{ mm} \times 150\text{ mm} \times 225\text{ mm}$ ($6\text{ inches}$).
- **Mortar:** A workable paste of cement, sand, and water used to bind blocks together:
  - *Mix Ratio:* $1:4$ (1 part cement to 4 parts clean plaster sand) or $1:6$.
- **Bonding Patterns:**
  - *Stretcher Bond:* Blocks laid with their long faces ($450\text{ mm}$) parallel to the wall face. Most common in Nigerian construction.
  - *Header Bond:* Blocks laid with their short ends facing outward.
  - *English Bond:* Alternate courses of stretchers and headers.

---

### 5. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** Why is a pile foundation preferred over a strip foundation for high-rise buildings in coastal Lagos?  
*Solution:* Coastal soils in Lagos consist of weak waterlogged peat and loose sand with very low bearing capacity. Pile foundations bypass these weak surface layers to transfer the enormous building weight deep into solid, load-bearing bedrock.

**Question 2:** Explain the role of the 3-4-5 method in building setting out.  
*Solution:* It utilizes Pythagoras' theorem ($3^2 + 4^2 = 5^2$) to establish a precise **$90\^{\circ}$ right angle** at building corners using only measuring tapes and strings.`,
    keyTakeaways: [
      'Site preparation involves clearing topsoil, grubbing roots, termite extermination, and terrace leveling.',
      'Setting out uses the 3-4-5 triangulation method to establish true 90° right angles at building corners.',
      'Foundations (strip, pad, raft, pile) transfer structural loads safely to the supporting subsoil.',
      'Standard Nigerian load-bearing sandcrete hollow blocks measure 450 x 225 x 225 mm bonded with 1:4 cement mortar.'
    ],
    associatedQuizId: 'bece-basic-tech-2025'
  },
  {
    id: 'jss3-basic-tech-t2-w8',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 8,
    topicTitle: 'Building Construction: Floors, Roofs, Doors & Windows',
    subtopics: [
      'Ground Floor Construction: Hardcore Fill, Blinding, Damp-Proof Membrane (DPM), Oversite Concrete & Screed',
      'Types of Roofs: Pitched, Gable, Hip, Lean-To, and Flat Roof Configurations',
      'Roof Structural Members: Wall Plate, Tie Beam, King Post, Principal Rafters, Purlins, Struts & Eaves',
      'Roof Covering Materials: Corrugated Galvanized Iron, Long-Span Aluminum, and Concrete Tiles',
      'Doors: Types (Flush, Panelled, Battened, Glazed) and Ironmongery Hardware (Hinges, Locks, Handles)',
      'Windows: Casement, Louver, Sliding, and Pivoted Windows (Ventilation and Daylighting Calculations)',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 15,
    summary: 'Comprehensive analysis of building superstructure elements: ground floor layers (hardcore, DPM, concrete bed), timber roof truss components (King Post, rafters, purlins), roof covering materials, doors, windows, and BECE examination questions.',
    contentMarkdown: `### 1. Ground Floor Construction

A solid ground floor provides a clean, dry, level, and durable load-bearing surface for building occupants.

\`\`\`
   CROSS-SECTION OF SOLID CONCRETE GROUND FLOOR
   +-------------------------------------------------------+ <-- Floor Finish (Tiles/Terrazzo)
   | 25mm Cement-Sand Screed                               |
   +-------------------------------------------------------+
   | 100mm - 150mm Oversite Concrete Bed (1:2:4)           |
   +=======================================================+ <-- Damp-Proof Membrane (DPM: Polythene)
   | 50mm Sand Blinding Layer                              |
   +-------------------------------------------------------+
   | 150mm - 300mm Well-Compacted Hardcore (Broken Stones) |
   +-------------------------------------------------------+
   | Natural Subsoil (Compacted Earth)                     |
   +-------------------------------------------------------+
\`\`\`

#### Layer Functions:
1. **Hardcore:** Broken stones, bricks, or gravel ($150-300\text{ mm}$) compacted to fill voids, prevent settlement, and break capillary water rise.
2. **Blinding:** Thin layer of sand ($50\text{ mm}$) to smooth the rough hardcore surface and prevent sharp stones from puncturing the DPM.
3. **Damp-Proof Membrane (DPM):** Heavy-duty polythene sheet ($1000\text{ gauge}$) preventing groundwater moisture from rising into the concrete floor.
4. **Oversite Concrete:** A $100-150\text{ mm}$ thick mass concrete slab ($1:2:4$ mix: cement, sand, granite).
5. **Screed:** Smooth layer of cement mortar ($1:3$) providing a flat base for finishes like ceramic tiles or terrazzo.

---

### 2. Roofs: Types and Structural Truss Members

The roof protects the interior of the building from rain, sunlight, wind, and temperature extremes.

#### Common Roof Forms:
- **Lean-to Roof:** Single sloping roof shed.
- **Gable Roof:** Two sloping surfaces meeting at a central ridge.
- **Hip Roof:** Slopes down to the eaves on all four sides.

#### The King Post Timber Roof Truss:
\`\`\`
                             RIDGE BOARD
                                 ▲
                                / \\
                  Rafter       /   \\      Principal Rafter
                              /  |  \\
                             /   |   \\
                            /    |    \\
                     Strut /     |     \\ Strut
                          /      |      \\
                         /       |       \\
                        /        |        \\
       WALL PLATE      /         |         \\      WALL PLATE
       +--------+     /          |          \\     +--------+
       |   []   |----+-----------+-----------+----|   []   |
       +--------+                 KING POST       +--------+
                     <---------- TIE BEAM ---------->
\`\`\`

#### Functions of Truss Members:
1. **Wall Plate ($100 \times 75\text{ mm}$):** Timber member fixed with strap iron along top of wall to distribute roof load evenly.
2. **Tie Beam ($150 \times 50\text{ mm}$):** Horizontal bottom member preventing the rafters from spreading outwards and tying the walls together.
3. **King Post ($100 \times 75\text{ mm}$):** Vertical central post in tension supporting the tie beam from the apex ridge.
4. **Principal Rafters ($100 \times 50\text{ mm}$):** Sloping members carrying purlins and roof coverings.
5. **Struts:** Inclined compression members bracing the king post to the rafters.
6. **Purlins ($50 \times 50\text{ mm}$ or $75 \times 50\text{ mm}$):** Horizontal longitudinal timbers spanning across rafters to which roof sheets are nailed.
7. **Eaves:** Overhanging lower edge of the roof that throws rainwater clear of wall faces.

---

### 3. Doors and Windows

#### Doors:
- **Flush Door:** Smooth flat plywood or fiberboard faces bonded over a hollow or solid timber core; standard for interior residential rooms.
- **Panelled Door:** Traditional decorative door consisting of vertical stiles, horizontal rails, and recessed wooden panels; strong and weather-resistant.
- **Battened & Ledged Door:** Vertical tongue-and-groove planks nailed to horizontal wooden ledges; used for stores and workshops.

#### Windows:
- **Louver Window:** Adjustable horizontal glass blades mounted in metal carrier clips; provides variable controlled airflow, highly popular across Nigerian homes.
- **Casement Window:** Sashes hinged at the side opening outwards; provides $100\%$ ventilation opening.
- **Sliding Window:** Glass sashes sliding horizontally on aluminum tracks; saves internal room space.

---

### 4. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** What is the critical function of a Damp-Proof Membrane (DPM) in ground floor construction?  
*Solution:* It acts as an impermeable moisture barrier preventing groundwater from rising into the concrete floor slab via capillary action.

**Question 2:** Name three primary timber members of a King Post roof truss and state the function of each.  
*Solution:*
1. **Tie Beam:** Prevents rafters from spreading outwards under roof loads.
2. **King Post:** Suspends the center of the tie beam to prevent sagging.
3. **Purlins:** Horizontal timbers supporting the roofing sheets.`,
    keyTakeaways: [
      'Ground floors are layered with compacted hardcore, blinding sand, polythene DPM, and concrete slab.',
      'The King Post roof truss consists of wall plate, tie beam, king post, rafters, purlins, and struts.',
      'Roof coverings include corrugated galvanized iron, long-span aluminum, and concrete tiles.',
      'Doors and windows provide security, natural illumination, and cross-ventilation in buildings.'
    ],
    associatedQuizId: 'bece-basic-tech-2025'
  },
  {
    id: 'jss3-basic-tech-t2-w9',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 9,
    topicTitle: 'Electricity & Electronics: Circuits, Components & Domestic Wiring',
    subtopics: [
      'Electric Circuit Fundamentals: Voltage (V), Current (I), Resistance (R), and Ohm\'s Law (V = IR)',
      'Series vs. Parallel Circuits: Equivalent Resistance Calculations and Real-World Comparisons',
      'Electrical Power and Energy Calculations: P = IV = I^2R and Costing Electricity (kWh)',
      'Electronic Components: Resistors, Capacitors, Inductors, Diodes (p-n Junction, LED), and Transistors',
      'Domestic AC Wiring in Nigeria: Live (Brown), Neutral (Blue), and Earth (Green/Yellow) Systems',
      'Wiring a 3-Pin Plug and Safety Protective Devices: Fuses, MCBs, and Earthing Rods',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 15,
    summary: 'Mastering electrical and electronic fundamentals: Ohm’s law, series/parallel circuit analysis, power/energy costing formulas, semiconductor diodes/transistors, 3-pin plug wiring, and household electrical safety in Nigeria.',
    contentMarkdown: `### 1. Fundamental Circuit Concepts & Ohm's Law

- **Electric Current ($I$):** The rate of flow of electric charges past a point in a circuit. Measured in **Amperes (A)** using an ammeter connected in **series**.
- **Voltage / Potential Difference ($V$):** The electrical pressure or work done per unit charge moving between two points. Measured in **Volts (V)** using a voltmeter connected in **parallel**.
- **Resistance ($R$):** Opposition offered by a material to the flow of electric current. Measured in **Ohms ($\\Omega$)**.

#### Ohm's Law:
> *The current flowing through a metallic conductor is directly proportional to the potential difference across its ends, provided temperature and other physical conditions remain constant.*

$$V = IR \\quad \\implies \\quad I = \\frac{V}{R} \\quad \\implies \\quad R = \\frac{V}{I}$$

---

### 2. Series vs. Parallel Circuits

\`\`\`
1. SERIES CIRCUIT                        2. PARALLEL CIRCUIT
      +----- R1 ----- R2 -----+                +--------+---------+
      |                       |                |        |         |
     [V]                     [V]              [V]      [R1]      [R2]
      |                       |                |        |         |
      +-----------------------+                +--------+---------+
   - Current is identical everywhere.       - Voltage is identical across branches.
   - Total R = R1 + R2 + R3                 - 1/Total R = 1/R1 + 1/R2
   - If one bulb blows, all turn off.       - If one bulb blows, others stay on.
\`\`\`

#### Worked Example (Resistors):
Two resistors of $6\\,\\Omega$ and $12\\,\\Omega$ are connected in:
1. Series
2. Parallel  
Across a $24\\text{ V}$ battery. Calculate the equivalent resistance and total circuit current in each case.

**Solution:**
1. **Series Connection:**
   $$R_T = R_1 + R_2 = 6 + 12 = 18\\,\\Omega$$
   $$I = \\frac{V}{R_T} = \\frac{24}{18} = 1.33\\text{ A}$$
2. **Parallel Connection:**
   $$\\frac{1}{R_T} = \\frac{1}{R_1} + \\frac{1}{R_2} = \\frac{1}{6} + \\frac{1}{12} = \\frac{2 + 1}{12} = \\frac{3}{12} = \\frac{1}{4}$$
   $$R_T = 4\\,\\Omega$$
   $$I = \\frac{V}{R_T} = \\frac{24}{4} = 6\\text{ A}$$

---

### 3. Electrical Power & Energy Billing

- **Electrical Power ($P$):** Rate at which electrical energy is consumed:
  $$P = IV = I\^2R = \\frac{V\^2}{R} \\quad \\text{(Watts, W)}$$
- **Electrical Energy ($E$):** Power multiplied by time:
  $$E = P \\times t \\quad \\text{(Kilowatt-hours, kWh)}$$

#### Cost Calculation in Nigeria:
If a student uses a $2000\\text{ W}$ electric iron for $3\\text{ hours}$ daily for 30 days, and the distribution company (DISCO) charges ₦$120$ per $\\text{kWh}$:
$$\\text{Power in kW} = \\frac{2000}{1000} = 2\\text{ kW}$$
$$\\text{Total Energy} = 2\\text{ kW} \\times (3 \\times 30\\text{ h}) = 2 \\times 90 = 180\\text{ kWh}$$
$$\\text{Total Cost} = 180\\text{ kWh} \\times ₦120 = ₦21,600$$

---

### 4. Basic Electronic Components

1. **Resistors:** Limit current flow and divide voltage (fixed carbon film or variable potentiometers).
2. **Capacitors:** Store electrical charge and smooth pulsating DC voltages.
3. **Semiconductor Diodes:** Formed by joining $p$-type and $n$-type silicon. Conducts current in **one direction only** (forward bias). Used as rectifiers (converting AC to DC).
   - **Light Emitting Diode (LED):** Emits light when forward biased. Highly energy efficient.
4. **Transistors (Bipolar Junction Transistor - BJT):** Three terminals: **Emitter (E), Base (B), Collector (C)**. Functions as an electronic switch and signal amplifier.

---

### 5. Domestic Electrical Wiring & The 3-Pin Plug

Nigerian residential homes receive $230\\text{ V}$ Single-Phase AC electricity at $50\\text{ Hz}$.

\`\`\`
               WIRING A 3-PIN PLUG (TOP VIEW)
                             EARTH PIN (Top)
                                  [ E ]
                               Green/Yellow
                                    |
                 +------------------+------------------+
                 |                                     |
   NEUTRAL PIN   |                                     |   LIVE PIN
      [ N ]      |                                     |    [ L ]
      Blue       |                                     |    Brown
                 |                                [FUSE]     |
                 +------------------+------------------+     |
                                    |                        |
                              [Cable Clamp]                  |
                                    |                        |
                               Flexible 3-Core Cable
\`\`\`

#### Modern Standard Cable Color Codes:
- **Live Wire (L):** **Brown** (Dangerous; carries high alternating voltage from power grid).
- **Neutral Wire (N):** **Blue** (Completes circuit back to substation; at near zero ground potential).
- **Earth Wire (E):** **Green with Yellow Stripes** (Safety protective wire connected to copper rod driven into soil).

#### Essential Safety Protective Devices:
- **Fuse:** A short length of thin alloy wire that melts (blows) when current exceeds safe rated limit, interrupting current. **Always connected on the Live wire.**
- **Miniature Circuit Breaker (MCB):** Electromagnetic switch that trips open automatically during overloads. Reset by flipping a toggle switch.
- **Earthing System:** Routes fault leakage currents safely into the ground, causing the fuse or breaker to trip rather than delivering a fatal shock to anyone touching a metal appliance.

---

### 6. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** Why is the fuse always placed on the Live wire rather than the Neutral wire in domestic wiring?  
*Solution:* If the fuse were on the Neutral wire and blew during a fault, the appliance would still remain connected to the high-voltage Live wire ($230\text{ V}$), posing a lethal electrocution risk to anyone touching it.

**Question 2:** State the modern color code for Live, Neutral, and Earth wires in a 3-pin plug.  
*Solution:*
- **Live:** Brown
- **Neutral:** Blue
- **Earth:** Green with Yellow stripes.`,
    keyTakeaways: [
      'Ohm’s law states V = IR; resistors add directly in series and reciprocally in parallel.',
      'Electrical energy is billed in kilowatt-hours (kWh), where 1 kWh = 1000 Watts for 1 hour.',
      'Diodes permit current flow in one direction only; transistors function as electronic switches/amplifiers.',
      'In a 3-pin plug, Brown is Live (fused), Blue is Neutral, and Green/Yellow is Earth for shock protection.'
    ],
    associatedQuizId: 'bece-basic-tech-2025'
  },
  {
    id: 'jss3-basic-tech-t2-w10',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 10,
    topicTitle: 'Fault Finding, Maintenance & Workshop Safety Practices',
    subtopics: [
      'Types of Engineering Maintenance: Corrective (Breakdown) vs. Preventive (Scheduled / Predictive)',
      'Workshop Safety Rules in Woodwork, Metalwork, and Electrical Engineering Laboratories',
      'Personal Protective Equipment (PPE): Safety Boots, Goggles, Face Shields, Ear Muffs, and Aprons',
      'Classification of Fires (Classes A, B, C, D) and Selection of Fire Extinguishers (Water, Foam, CO2, DCP)',
      'Care, Maintenance, Sharpening, and Rust Prevention for Cutting and Hand Tools',
      'First Aid Protocols for Workshop Emergencies (Cuts, Punctures, Electrical Shock, Chemical Burns)',
      'Self-Assessment: BECE-Style Checkpoint Drill'
    ],
    readingTimeMinutes: 14,
    summary: 'Comprehensive workshop management: preventive vs corrective maintenance paradigms, workshop safety regulations, PPE compliance, fire classification, extinguisher selection, tool sharpening, and emergency first-aid protocols.',
    contentMarkdown: `### 1. Types of Maintenance

Maintenance encompasses all actions aimed at retaining engineering equipment, machinery, and structures in a state where they can perform their required functions safely and efficiently.

1. **Corrective Maintenance (Breakdown Maintenance):**
   - Performed only **after** equipment fails or breaks down during operation.
   - *Disadvantages:* Unexpected machine stoppage, disruption of production schedules, secondary damage to adjacent parts, and expensive emergency repairs.
2. **Preventive Maintenance (Scheduled / Planned Maintenance):**
   - Regular, planned inspections, servicing, cleaning, adjustments, and replacement of worn parts conducted at predetermined time or running-hour intervals **before failure occurs**.
   - *Activities:* Lubrication, oil filter changes, tightening loose bolts, belt tensioning, and rust treatment.
   - *Advantages:* Extends machine lifespan, prevents catastrophic failures, and ensures worker safety.

---

### 2. General Workshop Safety Rules

A workshop contains sharp cutting tools, heavy machinery, high voltage, and flammable materials:
1. Always wear appropriate **Personal Protective Equipment (PPE)**: steel-toed boots, safety goggles, ear muffs, and heavy aprons.
2. **Never wear loose clothing, ties, wristwatches, or unconfined long hair** near rotating drill presses or lathes.
3. Keep workshop walkways and floor areas clean, dry, and completely clear of wood shavings, metal turnings, and spilled oil.
4. Always secure workpieces firmly in a bench vice or clamp before sawing, drilling, or chiseling—**never hold work in hand while cutting**.
5. Switch off and disconnect machine power supply at the wall socket before cleaning, adjusting, or changing blades.

---

### 3. Classification of Fires & Extinguisher Selection

Using the wrong fire extinguisher can cause fatal electrocution or spread chemical fires!

| Fire Class | Fuel Source | Correct Fire Extinguisher | DANGEROUS / NEVER USE |
| :--- | :--- | :--- | :--- |
| **Class A** | Ordinary combustible solids: Wood, paper, rags, textiles | **Water Extinguisher (Red label)** or Dry Powder | Never use on electrical fires |
| **Class B** | Flammable liquids: Petrol, diesel, kerosene, paints, oil | **Foam Extinguisher (Cream label)** or Dry Powder / $\\text{CO}_2$ | **NEVER use water** (water sinks below oil and violently splatters burning liquid) |
| **Class C** | Electrical fires: Switchboards, wiring, electric motors, generators | **Carbon Dioxide (CO2 - Black label)** or **Dry Chemical Powder (DCP - Blue label)** | **NEVER use water or foam** (conducts high-voltage electricity to the firefighter) |
| **Class D** | Combustible metals: Magnesium, sodium, titanium | **Special Dry Powder (Class D)** | Never use water or $\\text{CO}_2$ |

---

### 4. Care and Maintenance of Hand Tools

- **Wood Chisels and Plane Irons:** Grind cutting edge on oil stone at $25\^{\\circ} - 30\^{\\circ}$ angle to maintain razor-sharp bevel edge. Remove burr on flat back face.
- **Saws:** Clean resin off saw blades with kerosene. Lightly oil blade to prevent rust. Re-set teeth with saw set pliers when dull.
- **Vices and Clamps:** Clean threads with wire brush and lubricate lead screw with machine grease periodically.
- **Rust Prevention:** Apply thin film of light machine oil or petroleum jelly over polished steel surfaces before storing in dry tool racks.

---

### 5. Emergency First Aid for Workshop Accidents

1. **Electric Shock:**
   - **Immediately switch off main power supply.**
   - Do NOT touch the victim with bare hands while they remain in contact with the live current. Use a dry wooden broomstick or dry rubber material to separate the victim from the live wire.
   - Check breathing and begin Cardiopulmonary Resuscitation (CPR) if heartbeat or breathing has stopped.
2. **Severe Bleeding / Deep Laceration:**
   - Apply firm, direct pressure over wound using a clean sterile gauze pad.
   - Elevate the injured limb above heart level to reduce blood flow.
   - Secure pressure bandage and transport victim to medical clinic immediately.

---

### 6. Self-Assessment: BECE-Style Checkpoint Drill

**Question 1:** Why should water never be poured onto a petrol or electrical fire?  
*Solution:*
1. Petrol is less dense than water; pouring water causes burning petrol to float on top and spread uncontrollably.
2. Water is an electrical conductor; spraying water on an electrical fire will electrocute the firefighter.

**Question 2:** Distinguish between preventive maintenance and corrective maintenance.  
*Solution:* Preventive maintenance is performed routinely **before failure** to avoid breakdowns, whereas corrective maintenance is carried out **after failure** has occurred to restore a broken machine.`,
    keyTakeaways: [
      'Preventive maintenance schedules inspections and lubrication to prevent costly equipment breakdown.',
      'PPE (goggles, steel-toe boots, ear muffs) protects workers from severe workshop hazards.',
      'Class B liquid fires require foam or CO2; Class C electrical fires must never be fought with water.',
      'Electric shock victims must be disconnected using insulated wooden objects before administering first aid.'
    ],
    associatedQuizId: 'bece-basic-tech-2025'
  },
  {
    id: 'jss3-basic-tech-t2-w11-12',
    classLevel: 'JSS 3',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '2nd Term',
    weekNumber: 11,
    topicTitle: 'Termly Examination & Mock BECE Simulation',
    subtopics: [
      'Comprehensive Second Term Syllabus Synthesis (Weeks 1 to 10)',
      '20 Standard Multi-Choice BECE Examination Questions with Exhaustive Explanations',
      'Section B: 4 Extended Practical Drawing, Calculation & Engineering Essay Questions',
      'Final BECE Examination Scoring Rubrics and Performance Benchmarking'
    ],
    readingTimeMinutes: 18,
    summary: 'Comprehensive mock BECE terminal examination consisting of 20 multiple-choice questions with step-by-step rationales and 4 extended essay/calculation problems covering the complete JSS 3 2nd term Basic Technology syllabus.',
    contentMarkdown: `### 1. Mock BECE Examination Instructions

- **Time Allowed:** 1 hour 30 minutes
- **Structure:**
  - Section A: 20 Objective Multi-Choice Questions (40 Marks)
  - Section B: 4 Structured Essay & Calculation Problems (40 Marks)
  - Continuous Assessment Score: (20 Marks)
  - Total: 100 Marks

---

### Section A: 20 BECE Multi-Choice Objective Questions

**1.** The most economical timber conversion method with the least amount of wood waste is:  
A. Quarter sawing  
B. Plain sawing  
C. Tangential sawing  
D. Rift sawing  
*Rationale:* **B (Plain sawing)**. The entire log is sliced through parallel with minimal kerf waste.

**2.** A natural defect caused by wind twisting a growing tree is known as:  
A. Star shake  
B. Twisted grain  
C. Bow  
D. Cup  
*Rationale:* **B (Twisted grain)**.

**3.** The molten waste product formed in the blast furnace when limestone combines with sand is:  
A. Pig iron  
B. Slag  
C. Coke  
D. Hematite  
*Rationale:* **B (Slag - Calcium silicate)**.

**4.** The heat treatment process used to relieve internal stresses in steel by slow cooling in the furnace is:  
A. Hardening  
B. Tempering  
C. Annealing  
D. Quenching  
*Rationale:* **C (Annealing)**.

**5.** Which method of clay forming involves centering plastic clay on a rotating flywheel?  
A. Pinching  
B. Coiling  
C. Throwing  
D. Slab method  
*Rationale:* **C (Throwing on a potter\'s wheel)**.

**6.** Automotive windshields are manufactured from:  
A. Annealed glass  
B. Laminated glass  
C. Stained glass  
D. Frosted glass  
*Rationale:* **B (Laminated glass)**. Its plastic PVB interlayer retains shattered glass in place.

**7.** Bakelite used for electrical switches is classified as a:  
A. Thermoplastic  
B. Thermosetting plastic  
C. Monomer  
D. Elastomer  
*Rationale:* **B (Thermosetting plastic)**. It forms permanent covalent cross-links.

**8.** The addition of sulfur to raw rubber under heat to improve elasticity and strength is:  
A. Coagulation  
B. Vulcanization  
C. Polymerization  
D. Distillation  
*Rationale:* **B (Vulcanization)**.

**9.** The base receding axes in an isometric projection are inclined at:  
A. $30\^{\\circ}$ to the horizontal  
B. $45\^{\\circ}$ to the horizontal  
C. $60\^{\\circ}$ to the horizontal  
D. $90\^{\\circ}$ to the horizontal  
*Rationale:* **A ($30\^{\\circ}$)**.

**10.** In Cabinet oblique projection, the receding depth dimension is drawn at:  
A. Full scale  
B. Half scale  
C. Quarter scale  
D. Double scale  
*Rationale:* **B (Half scale - 1:2)**. Eliminates exaggerated visual depth.

**11.** In First Angle orthographic projection, the End Elevation viewed from the left is drawn on the:  
A. Left of the Front Elevation  
B. Right of the Front Elevation  
C. Below the Plan  
D. Above the Plan  
*Rationale:* **B (Right of the Front Elevation)**. First Angle places views on the opposite side.

**12.** A nutcracker is an example of which class of lever?  
A. First class  
B. Second class  
C. Third class  
D. Fourth class  
*Rationale:* **B (Second class)**. The nut (load) is situated between the hinge (fulcrum) and the handles (effort).

**13.** A machine raises a load of $1500\\text{ N}$ using an effort of $500\\text{ N}$. Its Mechanical Advantage is:  
A. 0.33  
B. 3  
C. 5  
D. 1000  
*Rationale:* **B (3)**. $MA = \\frac{1500}{500} = 3$.

**14.** If a machine has an $MA$ of 4 and a $VR$ of 5, its Efficiency is:  
A. $20\\%$  
B. $80\\%$  
C. $100\\%$  
D. $125\\%$  
*Rationale:* **B ($80\\%$)**. $\\eta = \\frac{4}{5} \\times 100\\% = 80\\%$.

**15.** Which foundation type is mandatory for high-rise buildings in the waterlogged coastal terrain of Lagos?  
A. Strip foundation  
B. Pad foundation  
C. Raft foundation  
D. Pile foundation  
*Rationale:* **D (Pile foundation)**. Reaches firm bedrock deep below surface peat.

**16.** The standard dimensions of an external load-bearing hollow concrete block in Nigeria are:  
A. $450 \\times 225 \\times 225\\text{ mm}$  
B. $450 \\times 150 \\times 225\\text{ mm}$  
C. $300 \\times 200 \\times 100\\text{ mm}$  
D. $500 \\times 250 \\times 250\\text{ mm}$  
*Rationale:* **A ($450 \\times 225 \\times 225\\text{ mm}$ or 9 inches)**.

**17.** The timber member in a King Post truss that ties the walls together and prevents rafters from spreading is the:  
A. Purlin  
B. Tie beam  
C. Wall plate  
D. Strut  
*Rationale:* **B (Tie beam)**.

**18.** The color of the Live wire in modern domestic electrical wiring is:  
A. Blue  
B. Brown  
C. Green with yellow stripes  
D. Black  
*Rationale:* **B (Brown)**.

**19.** Which fire extinguisher is strictly prohibited on an electrical fire?  
A. $\\text{CO}_2$ extinguisher  
B. Water extinguisher  
C. Dry chemical powder  
D. Halon extinguisher  
*Rationale:* **B (Water extinguisher)**. Water conducts electricity and will electrocute the firefighter.

**20.** Scheduled servicing, lubrication, and inspection of equipment before breakdown is termed:  
A. Corrective maintenance  
B. Breakdown maintenance  
C. Preventive maintenance  
D. Emergency repair  
*Rationale:* **C (Preventive maintenance)**.

---

### Section B: 4 Extended Essay & Calculation Questions

#### Question 1 (Materials Processing & Timber):
(a) Differentiate between plain sawing and quarter sawing with the aid of neat sketches. *(4 Marks)*  
(b) A freshly converted sample of Obeche timber weighed $800\\text{ g}$. After complete oven drying, its mass stabilized at $640\\text{ g}$. Calculate its percentage moisture content. *(3 Marks)*  
(c) State three advantages of kiln seasoning over natural air seasoning. *(3 Marks)*

*Model Solution:*  
(a) Plain sawing slices the entire log in parallel cuts; quarter sawing cuts the log into four quadrants and saws radially along the medullary rays, producing dimensionally stable boards with less warping.  
(b) $\\text{Moisture Content} = \\frac{800 - 640}{640} \\times 100\\% = \\frac{160}{640} \\times 100\\% = 0.25 \\times 100\\% = 25\\%$.  
(c)
1. Dries timber in days rather than months.
2. Can achieve specific low moisture content levels.
3. Kills wood-boring insects, larvae, and fungal spores.

#### Question 2 (Mechanics & Machine Calculations):
(a) Define:
1. Mechanical Advantage ($MA$) *(1 Mark)*
2. Velocity Ratio ($VR$) *(1 Mark)*
3. Machine Efficiency ($\\eta$) *(1 Mark)*  
(b) A block and tackle pulley system having 4 pulleys is used to lift a generator of weight $1800\\text{ N}$ through a vertical height of $3\\text{ meters}$. An effort of $600\\text{ N}$ is applied to the free end of the rope.
1. State the Velocity Ratio of the system. *(1 Mark)*
2. Calculate the Mechanical Advantage. *(2 Marks)*
3. Calculate the Efficiency of the system. *(2 Marks)*
4. Calculate the work done by the effort. *(2 Marks)*

*Model Solution:*  
(a)
1. $MA = \\text{Load} / \\text{Effort}$.
2. $VR = \\text{Effort Distance} / \\text{Load Distance}$.
3. $\\eta = (MA / VR) \\times 100\\%$.  
(b)
1. $VR = 4$ (number of pulleys).
2. $MA = 1800 / 600 = 3$.
3. $\\eta = (3 / 4) \\times 100\\% = 75\\%$.
4. $\\text{Effort Distance} = VR \\times \\text{Load Distance} = 4 \\times 3\\text{ m} = 12\\text{ m}$.  
   $\\text{Work Done by Effort} = \\text{Effort} \\times \\text{Effort Distance} = 600\\text{ N} \\times 12\\text{ m} = 7200\\text{ Joules}$.

#### Question 3 (Technical Drawing & Projections):
(a) Draw the standard symbols for:
1. First Angle Projection *(2 Marks)*
2. Third Angle Projection *(2 Marks)*  
(b) Explain why a $45\^{\\circ}$ mitre line is used in orthographic projection. *(2 Marks)*  
(c) State three differences between isometric and oblique projections. *(4 Marks)*

*Model Solution:*  
(a) Sketches must show the frustum of a cone with small circle on left (First angle) vs. small circle on right (Third angle).  
(b) A $45\^{\\circ}$ mitre line enables depth dimensions from the Plan view to be transferred directly to the End Elevation view without remeasuring.  
(c)
1. Isometric receding axes are at $30\^{\\circ}$; oblique receding axis is at $45\^{\\circ}$.
2. Isometric shows no true front face; oblique shows front face in true shape.
3. Isometric scales $1:1$ on all three axes; Cabinet oblique halves receding dimensions ($1:2$).

#### Question 4 (Building Construction & Electricity):
(a) List the sequence of layers in a solid ground floor from compacted earth to finish. *(4 Marks)*  
(b) Name four primary structural members of a King Post timber roof truss. *(2 Marks)*  
(c) In domestic electrical wiring:
1. State the modern color code for Live, Neutral, and Earth wires. *(3 Marks)*
2. Explain why a fuse is connected to the Live wire. *(1 Mark)*

*Model Solution:*  
(a) Compacted Subsoil $\\to$ Compacted Hardcore $\\to$ Sand Blinding $\\to$ Damp-Proof Membrane (DPM) $\\to$ Oversite Concrete Bed $\\to$ Cement-Sand Screed $\\to$ Floor Tiles / Terrazzo finish.  
(b) Wall plate, Tie beam, King post, Principal rafters, Struts, Purlins.  
(c)
1. Live: Brown; Neutral: Blue; Earth: Green with Yellow stripes.
2. The fuse is on the Live wire so that when it blows, high-voltage grid electricity is severed immediately from the appliance, preventing electrical shocks.`,
    keyTakeaways: [
      'Comprehensive terminal mock BECE assesses materials processing, technical drawing, mechanics, and building technology.',
      'Mechanical calculations require showing formulas, units, and clear intermediate steps.',
      'Electrical safety mandates using correct wire colors, fuses on live lines, and grounding earthing protection.'
    ],
    associatedQuizId: 'bece-basic-tech-2025'
  }
];
