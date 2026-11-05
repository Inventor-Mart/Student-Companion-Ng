import { CurriculumTopic, NigerianClassLevel, AcademicStream } from '../types';
import { JSS1_SECOND_TERM_TOPICS } from './jss1SecondTermData';
import { JSS1_REMAINING_SUBJECTS_TOPICS } from './jss1RemainingSubjectsData';
import { JSS2_SECOND_TERM_TOPICS } from './jss2SecondTermData';
import { JSS2_REMAINING_SUBJECTS_TOPICS } from './jss2RemainingSubjectsData';
import { JSS3_ENGLISH_TOPICS } from './jss3EnglishData';

export const OFFICIAL_SUBJECTS_BY_CLASS = {
  'JSS 1': [
    'Mathematics',
    'English Language',
    'Agricultural Science',
    'Basic Science',
    'Basic Technology',
    'Business Studies',
    'Computer Studies',
    'Christian Religious Studies (CRS)',
    'Civic Education',
    'Literature-in-English',
    'Physical and Health Education (PHE)',
    'Cultural and Creative Arts (CCA)',
    'Social Studies (SOS)',
    'History',
    'Home Economics'
  ],
  'JSS 2': [
    'Mathematics',
    'English Language',
    'Agricultural Science',
    'Basic Science',
    'Basic Technology',
    'Business Studies',
    'Computer Studies',
    'Christian Religious Studies (CRS)',
    'Civic Education',
    'Literature-in-English',
    'Physical and Health Education (PHE)',
    'Cultural and Creative Arts (CCA)',
    'Social Studies (SOS)',
    'History',
    'Home Economics'
  ],
  'JSS 3': [
    'Mathematics',
    'English Language',
    'Agricultural Science',
    'Basic Science',
    'Basic Technology',
    'Business Studies',
    'Computer Studies',
    'Christian Religious Studies (CRS)',
    'Civic Education',
    'Literature-in-English',
    'Physical and Health Education (PHE)',
    'Cultural and Creative Arts (CCA)',
    'Social Studies (SOS)',
    'History',
    'Home Economics'
  ],
  'SS 1': {
    Science: [
      'Mathematics',
      'English Language',
      'Agricultural Science',
      'Biology',
      'Physics',
      'Data Processing',
      'Christian Religious Studies (CRS)',
      'Civic Education',
      'Further Mathematics',
      'Geography',
      'Chemistry'
    ],
    'Non-Science': [
      'Mathematics',
      'English Language',
      'Commerce',
      'Data Processing',
      'Christian Religious Studies (CRS)',
      'Civic Education',
      'Literature-in-English',
      'Government',
      'Economics'
    ]
  },
  'SS 2': {
    Science: [
      'Mathematics',
      'English Language',
      'Agricultural Science',
      'Biology',
      'Physics',
      'Data Processing',
      'Christian Religious Studies (CRS)',
      'Civic Education',
      'Further Mathematics',
      'Geography',
      'Chemistry'
    ],
    'Non-Science': [
      'Mathematics',
      'English Language',
      'Commerce',
      'Data Processing',
      'Christian Religious Studies (CRS)',
      'Civic Education',
      'Literature-in-English',
      'Government',
      'Economics'
    ]
  },
  'SS 3': {
    Science: [
      'Mathematics',
      'English Language',
      'Agricultural Science',
      'Biology',
      'Physics',
      'Data Processing',
      'Christian Religious Studies (CRS)',
      'Civic Education',
      'Further Mathematics',
      'Geography',
      'Chemistry'
    ],
    'Non-Science': [
      'Mathematics',
      'English Language',
      'Commerce',
      'Data Processing',
      'Christian Religious Studies (CRS)',
      'Civic Education',
      'Literature-in-English',
      'Government',
      'Economics'
    ]
  }
};

export const NIGERIAN_CURRICULUM_TOPICS: CurriculumTopic[] = [
  ...JSS1_SECOND_TERM_TOPICS,
  ...JSS1_REMAINING_SUBJECTS_TOPICS,
  ...JSS2_SECOND_TERM_TOPICS,
  ...JSS2_REMAINING_SUBJECTS_TOPICS,
  ...JSS3_ENGLISH_TOPICS,
  // ==========================================
  // JSS 1 SUBJECTS (15 SUBJECTS)
  // ==========================================
  {
    id: 'math-jss1-number-bases',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Mathematics',
    term: '1st Term',
    weekNumber: 3,
    topicTitle: 'Number Bases & Place Value (Base 10 & Binary)',
    subtopics: ['Conversion between Base 10 and Base 2', 'Addition of Binary Numbers', 'Place Value of Large Numbers'],
    readingTimeMinutes: 6,
    summary: 'Master the decimal system and binary representation used by computer systems with Nigerian BECE past examples.',
    contentMarkdown: `### 1. The Decimal (Denary) System

The counting system we use daily is Base 10 (Denary). The digits used are 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.

### 2. The Binary System (Base 2)

Binary uses only two digits: 0 and 1. To convert $25_{10}$ to binary, divide repeatedly by 2 and write down remainders from bottom to top:

$$25 \\div 2 = 12 \\text{ R } 1$$
$$12 \\div 2 = 6 \\text{ R } 0$$
$$6 \\div 2 = 3 \\text{ R } 0$$
$$3 \\div 2 = 1 \\text{ R } 1$$
$$1 \\div 2 = 0 \\text{ R } 1$$

Therefore: $25_{10} = 11001_2$.`,
    keyTakeaways: ['Base 10 uses digits 0-9; Base 2 uses 0 and 1.', 'Remainders are recorded from the bottom upwards.'],
    associatedQuizId: 'bece-math-junior-2024'
  },
  {
    id: 'eng-jss1-nouns-grammar',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'English Language',
    term: '1st Term',
    weekNumber: 2,
    topicTitle: 'Parts of Speech: Nouns and Their Classifications',
    subtopics: ['Proper and Common Nouns', 'Collective Nouns', 'Abstract vs Concrete Nouns', 'Countable and Uncountable'],
    readingTimeMinutes: 5,
    summary: 'Essential English grammar foundational for junior secondary writing and oral comprehension.',
    contentMarkdown: `### 1. Types of Nouns\n- **Proper Nouns:** Specific names of persons, places, days (e.g. *Lagos, Chidi, Monday*). Always capitalized.\n- **Common Nouns:** General names (e.g. *boy, school, river*).\n- **Collective Nouns:** Groups taken as a unit (e.g. *a pride of lions, a flock of birds, a congregation of worshippers*).\n- **Abstract Nouns:** Concepts that cannot be physically touched (e.g. *honesty, freedom, bravery*).`,
    keyTakeaways: ['Proper nouns always begin with a capital letter.', 'Uncountable nouns (water, sand, advice) do not take plural "s".'],
    associatedQuizId: 'eng-jss1-quiz'
  },
  {
    id: 'agric-jss1-classification',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Agricultural Science',
    term: '1st Term',
    weekNumber: 4,
    topicTitle: 'Classification of Crops by Life Cycle and Uses',
    subtopics: ['Annual, Biennial, and Perennial Crops', 'Food Crops vs Cash Crops in Nigeria', 'Cereal and Legume Agronomy'],
    readingTimeMinutes: 5,
    summary: 'Distinguish between annual crops (maize, yam) and tree crops (cocoa, oil palm) cultivated across Nigeria.',
    contentMarkdown: `### 1. Classification by Life Span\n- **Annual Crops:** Complete life cycle within one year (e.g. Maize, Rice, Cowpea).\n- **Biennial Crops:** Complete life cycle in two growing seasons (e.g. Cassava, Carrot).\n- **Perennial Crops:** Live for more than two years (e.g. Oil Palm, Cocoa, Rubber, Cashew).`,
    keyTakeaways: ['Annuals complete their life in one season.', 'Oil palm and cocoa are leading Nigerian perennial cash crops.'],
    associatedQuizId: 'waec-agric-science-2025'
  },
  {
    id: 'bsc-jss1-living-things',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Basic Science',
    term: '1st Term',
    weekNumber: 2,
    topicTitle: 'Characteristics of Living Things (MR NIGER D)',
    subtopics: ['The 8 Life Processes Explained', 'Differences Between Plants and Animals', 'Cellular Organization'],
    readingTimeMinutes: 5,
    summary: 'Discover the mnemonic MR NIGER D used by Nigerian students to master movement, respiration, nutrition, and reproduction.',
    contentMarkdown: `### The Universal Life Processes: MR NIGER D\n1. **Movement:** Locomotion in animals; tropism in plants.\n2. **Respiration:** Releasing energy from glucose ($ATP$).\n3. **Nutrition:** Autotrophic in green plants; heterotrophic in animals.\n4. **Irritability:** Response to environmental stimuli.\n5. **Growth:** Irreversible increase in size and mass.\n6. **Excretion:** Removal of metabolic wastes.\n7. **Reproduction:** Continuity of species.\n8. **Death:** Natural conclusion of biological functions.`,
    keyTakeaways: ['MR NIGER D covers all 8 universal life characteristics.', 'Plants are autotrophic; animals are heterotrophic.'],
    associatedQuizId: 'jamb-utme-biology-2025'
  },
  {
    id: 'btech-jss1-woodwork-tools',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Basic Technology',
    term: '1st Term',
    weekNumber: 3,
    topicTitle: 'Hand Tools: Measuring, Marking Out & Cutting Tools',
    subtopics: ['Steel Rule, Try Square and Calipers', 'Saws (Rip Saw, Crosscut Saw, Tenon Saw)', 'Workshop Safety Rules'],
    readingTimeMinutes: 6,
    summary: 'Core technical education on bench tools, maintenance, and workshop safety precautions in Nigerian secondary schools.',
    contentMarkdown: `### 1. Measuring and Marking-Out Tools\n- **Steel Rule:** Measuring linear lengths accurately in millimeters.\n- **Try Square:** Testing the squareness of edges (90° angles) and marking parallel lines.\n- **Scriber & Punch:** Marking lines on metals before cutting.\n\n### 2. Cutting Tools\n- **Crosscut Saw:** Cutting across wood grain.\n- **Rip Saw:** Cutting along the direction of the wood grain.\n- **Tenon Saw:** Fine cutting for joints and cabinet making.`,
    keyTakeaways: ['Try square tests for perpendicular 90° edges.', 'Always wear protective goggles in the technical workshop.'],
    associatedQuizId: 'btech-jss1-quiz'
  },
  {
    id: 'bus-jss1-introduction',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Business Studies',
    term: '1st Term',
    weekNumber: 1,
    topicTitle: 'Introduction to Business Studies & Commerce',
    subtopics: ['Components of Business Studies', 'Importance of Business to the Nigerian Economy', 'Career Opportunities'],
    readingTimeMinutes: 5,
    summary: 'Foundational introduction to Office Practice, Commerce, Bookkeeping, Typewriting, and Marketing.',
    contentMarkdown: `### 1. Five Branches of Business Studies\n1. **Commerce:** Distribution and exchange of goods and services.\n2. **Bookkeeping / Accounting:** Systematic recording of financial transactions.\n3. **Office Practice:** Clerical procedures and office administration.\n4. **Typewriting / Keyboarding:** Document production and speed typing.\n5. **Marketing:** Identifying consumer needs and delivering goods profitably.`,
    keyTakeaways: ['Business Studies prepares students for commercial careers.', 'Commerce bridges the gap between producers and consumers.'],
    associatedQuizId: 'jamb-economics-commercial-2025'
  },
  {
    id: 'comp-jss1-hardware',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Computer Studies',
    term: '1st Term',
    weekNumber: 3,
    topicTitle: 'Computer Hardware: Input, Processing & Output Units',
    subtopics: ['Central Processing Unit (ALU and Control Unit)', 'Input Devices (Keyboard, Mouse, Scanner)', 'Output Devices (Monitor, Printer)'],
    readingTimeMinutes: 6,
    summary: 'The physical components of modern digital computer systems and the Von Neumann architecture.',
    contentMarkdown: `### 1. The Central Processing Unit (CPU)\nThe "brain" of the computer consists of:\n- **Arithmetic and Logic Unit (ALU):** Performs calculations (+, -, *, /) and logical comparisons.\n- **Control Unit (CU):** Directs the flow of data and instructions throughout the computer.\n\n### 2. Storage & Memory\n- **RAM (Random Access Memory):** Volatile primary memory; loses content when powered off.\n- **ROM (Read Only Memory):** Non-volatile firmware; contains startup boot instructions (BIOS).`,
    keyTakeaways: ['RAM is volatile; ROM is non-volatile.', 'ALU handles mathematical operations; CU directs instructions.'],
    associatedQuizId: 'comp-jss1-quiz'
  },
  {
    id: 'crs-jss1-creation',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Christian Religious Studies (CRS)',
    term: '1st Term',
    weekNumber: 1,
    topicTitle: 'The Creation of the Universe and Man (Genesis 1 & 2)',
    subtopics: ['The Six Days of Creation', 'Man as God’s Image Bearer', 'The Garden of Eden and Human Responsibility'],
    readingTimeMinutes: 5,
    summary: 'Biblical account of cosmic origins, divine sovereignty, and environmental stewardship.',
    contentMarkdown: `### 1. The Order of Creation\n- **Day 1:** Light and separation of Day and Night.\n- **Day 2:** The firmament (sky and waters).\n- **Day 3:** Dry land, seas, and vegetation.\n- **Day 4:** The Sun, Moon, and Stars.\n- **Day 5:** Sea creatures and birds.\n- **Day 6:** Land animals and Human beings.\n- **Day 7:** God rested and blessed the Sabbath day.`,
    keyTakeaways: ['Man was created in God’s image and given dominion over creation.', 'God rested on the seventh day.'],
    associatedQuizId: 'jamb-crs-biblical-studies-2025'
  },
  {
    id: 'civic-jss1-values',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Civic Education',
    term: '1st Term',
    weekNumber: 2,
    topicTitle: 'National Values: Honesty, Integrity & Discipline',
    subtopics: ['Meaning of Civic Values', 'Manifestation of Honesty in Nigerian Society', 'Consequences of Dishonesty'],
    readingTimeMinutes: 5,
    summary: 'Moral citizenship, social cohesion, and the role of integrity in national development.',
    contentMarkdown: `### 1. Concept of Values\nValues are the beliefs, principles, and standards that guide the behavior and moral choices of individuals within a society.\n\n### 2. Key Civic Values:\n- **Honesty:** Truthfulness in school tests, business dealings, and public duties.\n- **Integrity:** Adherence to moral principles even when unobserved.\n- **Cooperation:** Working collectively for the peace and development of Nigeria.`,
    keyTakeaways: ['National values foster peace and anti-corruption.', 'Integrity requires doing the right thing at all times.'],
    associatedQuizId: 'civic-jss1-quiz'
  },
  {
    id: 'lit-jss1-genres',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Literature-in-English',
    term: '1st Term',
    weekNumber: 2,
    topicTitle: 'Introduction to Literature: Prose, Drama & Poetry',
    subtopics: ['Characteristics of Prose (Fiction & Non-Fiction)', 'Dramatic Elements (Dialogue, Stage Directions)', 'Poetic Stanzas, Rhymes & Imagery'],
    readingTimeMinutes: 5,
    summary: 'Foundational study of the three literary genres and basic figures of speech (Simile, Metaphor, Personification).',
    contentMarkdown: `### 1. The Three Major Genres of Literature\n1. **Prose:** Continuous written text structured in paragraphs and chapters (Novels, Novellas, Short Stories).\n2. **Drama:** Written in dialogue and acts/scenes, meant to be performed on stage by actors.\n3. **Poetry:** Written in verse and stanzas with rhythmic musical quality and intense imagery.`,
    keyTakeaways: ['Drama is meant for performance; Prose is structured in paragraphs.', 'Poetry expresses elevated emotion in verse.'],
    associatedQuizId: 'waec-literature-african-prose-2025'
  },
  {
    id: 'phe-jss1-physical-fitness',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Physical and Health Education (PHE)',
    term: '1st Term',
    weekNumber: 3,
    topicTitle: 'Physical Fitness & Body Conditioning Components',
    subtopics: ['Health-Related Fitness (Endurance, Strength, Flexibility)', 'Skill-Related Fitness (Agility, Speed, Balance)', 'Warm-up and Cool-down Routines'],
    readingTimeMinutes: 5,
    summary: 'Cardiovascular health, muscular stamina, and athletic training principles for secondary school students.',
    contentMarkdown: `### 1. Health-Related Fitness Components\n- **Cardiovascular Endurance:** Capacity of heart and lungs to supply oxygen during sustained exercise (e.g. 1500m run).\n- **Muscular Strength:** Maximum force generated in a single contraction (e.g. push-ups).\n- **Flexibility:** Range of motion around joints, preventing muscle tears.`,
    keyTakeaways: ['Warm-up prevents muscle strain before sports.', 'Aerobic exercise strengthens heart and lung stamina.'],
    associatedQuizId: 'phe-jss1-quiz'
  },
  {
    id: 'cca-jss1-art-elements',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Cultural and Creative Arts (CCA)',
    term: '1st Term',
    weekNumber: 2,
    topicTitle: 'Elements and Principles of Visual Arts & Design',
    subtopics: ['Elements: Line, Shape, Color, Texture, Value', 'Color Wheel (Primary, Secondary, Tertiary)', 'Traditional Nigerian Art (Nok, Ife, Benin Bronzes)'],
    readingTimeMinutes: 6,
    summary: 'Artistic appreciation, color theory, and historical Nigerian sculpture traditions.',
    contentMarkdown: `### 1. Color Theory\n- **Primary Colors:** Red, Yellow, Blue (cannot be created by mixing other colors).\n- **Secondary Colors:** Orange (Red+Yellow), Green (Blue+Yellow), Purple (Red+Blue).\n\n### 2. Nigerian Heritage Art Traditions\n- **Nok Terracotta (Kaduna/Plateau):** Oldest known sculpture culture in Sub-Saharan Africa (500 BC).\n- **Benin Bronzes (Edo):** World-renowned royal court casting using the lost-wax technique (*cire perdue*).`,
    keyTakeaways: ['Primary colors are Red, Yellow, Blue.', 'Nok terracotta is the oldest known Nigerian sculpture tradition.'],
    associatedQuizId: 'cca-jss1-quiz'
  },
  {
    id: 'sos-jss1-social-environment',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Social Studies (SOS)',
    term: '1st Term',
    weekNumber: 2,
    topicTitle: 'Family and Social Environment in Nigeria',
    subtopics: ['Nuclear vs Extended Family Systems', 'Functions of the Family as a Primary Socializing Agent', 'Social Problems: Cultism, Drug Abuse & Solutions'],
    readingTimeMinutes: 5,
    summary: 'The structure of Nigerian kinship, family values, and community development.',
    contentMarkdown: `### 1. Family Structures\n- **Nuclear Family:** Father, mother, and biological/adopted children.\n- **Extended Family:** Includes grandparents, uncles, aunts, cousins, and in-laws; central to Nigerian social solidarity and mutual support.\n\n### 2. Primary Socialization\nThe family transmits cultural language, etiquette, moral standards, and respect for elders from infancy.`,
    keyTakeaways: ['Extended family provides deep mutual support in Nigerian communities.', 'Family is the foundational unit of society.'],
    associatedQuizId: 'sos-jss1-quiz'
  },
  {
    id: 'his-jss1-early-civilizations',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'History',
    term: '1st Term',
    weekNumber: 3,
    topicTitle: 'Pre-Colonial Nigeria: Kanem-Borno, Oyo & Benin Kingdoms',
    subtopics: ['The Trans-Saharan Trade Routes', 'The Alaafin and Bashorun in the Oyo Empire', 'The Oba and Guilds in Ancient Benin'],
    readingTimeMinutes: 6,
    summary: 'Explore the rich political, military, and commercial architecture of pre-colonial Nigerian civilizations.',
    contentMarkdown: `### 1. The Kanem-Borno Empire\nFlourished around Lake Chad for over a millennium under the Sayfawa dynasty. Major center for Islamic scholarship and the Trans-Saharan trade in horses, salt, and leather.\n\n### 2. The Benin Kingdom\nGoverned by the *Oba* with a sophisticated guild system of brass casters, ivory carvers, and weavers. The ancient defensive moats (*Iya*) were among the largest earthworks in human history.`,
    keyTakeaways: ['Kanem-Borno had one of the longest ruling dynasties in Africa.', 'Benin moats represented remarkable pre-colonial engineering.'],
    associatedQuizId: 'jamb-government-nigeria-2025'
  },
  {
    id: 'homecon-jss1-nutrition',
    classLevel: 'JSS 1',
    stream: 'Junior',
    subject: 'Home Economics',
    term: '1st Term',
    weekNumber: 2,
    topicTitle: 'Food Nutrients, Balanced Diet & Meal Planning',
    subtopics: ['Carbohydrates, Proteins, Fats, Vitamins, Minerals, Water', 'Nutritional Deficiency Diseases (Kwashiorkor, Scurvy, Rickets)', 'Kitchen Hygiene and Safe Food Storage'],
    readingTimeMinutes: 5,
    summary: 'Nutritional science, household management, and healthy meal planning using local Nigerian staple foods.',
    contentMarkdown: `### 1. Essential Food Classes & Nigerian Sources\n- **Carbohydrates:** Energy providers (Yam, Cassava/Garri, Rice, Plantain).\n- **Proteins:** Growth and cell repair (Beans/Cowpea, Fish, Eggs, Meat).\n- **Vitamins & Minerals:** Disease protection (Vegetables like Ugwu, Oranges, Palm oil).\n\n### 2. Deficiency Diseases\n- **Kwashiorkor:** Severe protein deficiency in infants (protruding belly, swollen limbs).\n- **Scurvy:** Vitamin C deficiency (bleeding gums).\n- **Rickets:** Vitamin D and Calcium deficiency (bowed legs).`,
    keyTakeaways: ['Kwashiorkor is caused by severe protein deficiency.', 'A balanced diet contains all food classes in correct proportions.'],
    associatedQuizId: 'homecon-jss1-quiz'
  },



  // ==========================================
  // SENIOR SECONDARY SCIENCE (SS 1 - SS 3)
  // ==========================================
  {
    id: 'bio-ss2-genetics',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Biology',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Mendelian Genetics & Heredity',
    subtopics: ['Monohybrid & Dihybrid Crosses', 'Sickle Cell Trait (AA, AS, SS)', 'ABO Blood Groups'],
    readingTimeMinutes: 8,
    summary: 'A deep dive into Gregor Mendel’s laws of inheritance, Punnett squares, and clinical genetics relevant to West Africa.',
    contentMarkdown: `### 1. Mendel's Law of Segregation\nAlleles segregate so that each gamete carries only one allele for each gene.\n\n### 2. Sickle Cell Trait Cross (**AS** $\\times$ **AS**)\n- $1\\text{ AA} : 2\\text{ AS} : 1\\text{ SS}$ (25% Normal, 50% Carrier, 25% Sickle Cell Disease).\n- Critical for marital genetic counseling in Nigeria.`,
    keyTakeaways: ['Crossing two AS carriers yields a 25% chance of an SS child.', 'ABO blood groups illustrate co-dominance and multiple alleles.'],
    associatedQuizId: 'jamb-utme-biology-2025'
  },
  {
    id: 'phy-ss2-projectiles',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Physics',
    term: '1st Term',
    weekNumber: 4,
    topicTitle: 'Projectile Motion & Trajectory Calculations',
    subtopics: ['Time of Flight', 'Maximum Height', 'Horizontal Range Derivations'],
    readingTimeMinutes: 7,
    summary: 'Parabolic trajectories under gravity with WAEC past calculations.',
    contentMarkdown: `### Trajectory Formulas\n- Time of Flight: $T = \\frac{2u \\sin \\theta}{g}$\n- Maximum Height: $H = \\frac{u^2 \\sin^2 \\theta}{2g}$\n- Range: $R = \\frac{u^2 \\sin 2\\theta}{g}$\n- Maximum range occurs at launch angle $\\theta = 45^\\circ$.`,
    keyTakeaways: ['Horizontal velocity component remains constant throughout flight.', 'Maximum horizontal range is achieved at 45°.'],
    associatedQuizId: 'waec-physics-mechanics-2024'
  },
  {
    id: 'chem-ss3-hydrocarbons',
    classLevel: 'SS 3',
    stream: 'Science',
    subject: 'Chemistry',
    term: '1st Term',
    weekNumber: 2,
    topicTitle: 'Organic Chemistry: Hydrocarbons & Petroleum Refining',
    subtopics: ['Alkanes, Alkenes, Alkynes', 'Fractional Distillation of Nigerian Crude', 'Octane Number'],
    readingTimeMinutes: 9,
    summary: 'Saturated and unsaturated hydrocarbons, IUPAC nomenclature, and refining Bonny Light crude oil.',
    contentMarkdown: `### 1. Homologous Series\n- Alkanes ($C_n H_{2n+2}$), Alkenes ($C_n H_{2n}$), Alkynes ($C_n H_{2n-2}$).\n\n### 2. Fractional Distillation Fractions\nPetroleum Gas ($C_1-C_4$), Petrol ($C_5-C_{10}$), Kerosene ($C_{11}-C_{15}$), Diesel ($C_{16}-C_{20}$), Bitumen ($>C_{35}$).`,
    keyTakeaways: ['Alkanes undergo substitution; alkenes undergo addition.', 'Fractional distillation separates hydrocarbons by boiling point.'],
    associatedQuizId: 'waec-chemistry-physical-organic-2025'
  },
  {
    id: 'fmath-ss2-calculus',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Further Mathematics',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Differentiation from First Principles & Chain Rule',
    subtopics: ['Limit Definitions of Derivatives', 'Power Rule and Chain Rule', 'Tangents and Normals to Curves'],
    readingTimeMinutes: 8,
    summary: 'Rigorous calculus foundations for engineering and scientific modeling in WAEC and university entrance.',
    contentMarkdown: `### 1. First Principles Formula\n$$f'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}$$\n\n### 2. The Chain Rule\nIf $y = f(u)$ and $u = g(x)$, then:\n$$\\frac{dy}{dx} = \\frac{dy}{du} \\times \\frac{du}{dx}$$`,
    keyTakeaways: ['Power rule: $\\frac{d}{dx}[x^n] = n x^{n-1}$.', 'Chain rule handles composite functions.'],
    associatedQuizId: 'waec-further-maths-calculus-2025'
  },
  {
    id: 'geog-ss2-weathering',
    classLevel: 'SS 2',
    stream: 'Science',
    subject: 'Geography',
    term: '1st Term',
    weekNumber: 4,
    topicTitle: 'Geomorphology: Weathering & Mass Movement',
    subtopics: ['Physical, Chemical and Biological Weathering', 'Exfoliation in Nigerian Inselbergs', 'Landslides and Soil Creep'],
    readingTimeMinutes: 6,
    summary: 'The physical breakdown and chemical decomposition of rocks in tropical and savanna climates.',
    contentMarkdown: `### 1. Physical Weathering in Nigeria\n- **Exfoliation / Onion Peeling:** Daily intense heating by sun followed by rapid cooling causes outer rock layers to peel off (common on granite inselbergs in Jos and Abuja).\n\n### 2. Chemical Weathering\n- **Carbonation:** Rainwater dissolves atmospheric $CO_2$ forming weak carbonic acid, dissolving limestone in caves.`,
    keyTakeaways: ['Exfoliation occurs due to rapid diurnal temperature changes.', 'Chemical weathering dominates in humid tropical rainforests.'],
    associatedQuizId: 'geog-ss2-quiz'
  },
  {
    id: 'dp-ss1-spreadsheets',
    classLevel: 'SS 1',
    stream: 'Science',
    subject: 'Data Processing',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Spreadsheet Applications: Formulas, Functions & Charts',
    subtopics: ['Cell Referencing (Relative vs Absolute)', 'Mathematical Functions (SUM, AVERAGE, IF)', 'Data Visualization'],
    readingTimeMinutes: 6,
    summary: 'Practical computing skills for data management, spreadsheet modeling, and office automation.',
    contentMarkdown: "### 1. Formulas vs Functions in Spreadsheets\n- A **Formula** is a custom user expression: `=A1 + B1`.\n- A **Function** is a built-in preprogrammed formula: `=SUM(A1:A10)`, `=AVERAGE(B1:B20)`.\n\n### 2. Relative vs Absolute Referencing\n- Relative: `A1` adjusts when copied.\n- Absolute: `$A$1` freezes row and column.",
    keyTakeaways: ['All spreadsheet formulas must begin with an equal sign (=).', 'Absolute references use dollar signs ($A$1).'],
    associatedQuizId: 'dp-ss1-quiz'
  },

  // ==========================================
  // SENIOR SECONDARY NON-SCIENCE / COMMERCIAL & ARTS
  // ==========================================
  {
    id: 'econ-ss2-market-structures',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Economics',
    term: '2nd Term',
    weekNumber: 5,
    topicTitle: 'Market Structures: Perfect Competition vs. Monopoly',
    subtopics: ['Price Taker vs Price Maker', 'Short-run and Long-run Equilibrium', 'Price Discrimination Conditions'],
    readingTimeMinutes: 8,
    summary: 'Pricing power, barriers to entry, consumer surplus, and market efficiencies with Nigerian economic examples.',
    contentMarkdown: `### 1. Perfect Competition\nIn perfect competition, individual firms are price takers ($P = AR = MR$). In the long run, entry and exit compete away supernormal profits until $P = MC = \\text{minimum ATC}$.\n\n### 2. Monopoly in Nigeria\nA single firm controls market supply (e.g. regional electricity distribution DISCOs, rail transportation). Monopolies produce where $MC = MR$ to maximize profit.`,
    keyTakeaways: ['Perfect competition leads to zero economic profit in the long run.', 'Price discrimination requires separated markets with different demand elasticities.'],
    associatedQuizId: 'jamb-economics-commercial-2025'
  },
  {
    id: 'gov-ss1-constitution',
    classLevel: 'SS 1',
    stream: 'Non-Science',
    subject: 'Government',
    term: '1st Term',
    weekNumber: 6,
    topicTitle: 'Constitutional Development in Nigeria: Colonial to 1999',
    subtopics: ['Clifford 1922 (Elective Principle)', 'Richards 1946 (Regionalism)', '1999 Presidential Constitution'],
    readingTimeMinutes: 7,
    summary: 'Evolution of Nigerian fundamental laws from colonial councils to the modern 4th Republic.',
    contentMarkdown: `### 1. Clifford Constitution (1922)\nIntroduced the Elective Principle (4 elected Africans: 3 Lagos, 1 Calabar). Birthed Nigeria’s first political party: NNDP.\n\n### 2. The 1999 Constitution\nEstablishes a Federal Republic with Executive President, bicameral National Assembly (Senate & House of Reps), and independent Judiciary.`,
    keyTakeaways: ['Clifford Constitution (1922) birthed early political parties.', '1999 Constitution establishes the Fourth Republic presidential system.'],
    associatedQuizId: 'jamb-government-nigeria-2025'
  },
  {
    id: 'comm-ss2-banking-finance',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Commerce',
    term: '2nd Term',
    weekNumber: 3,
    topicTitle: 'Commercial Banking & Central Bank of Nigeria (CBN)',
    subtopics: ['Functions of Commercial Banks (Credit Creation)', 'Monetary Policy Tools of the CBN (MPR, CRR)', 'Electronic Payment Systems (NIBSS, Remita)'],
    readingTimeMinutes: 7,
    summary: 'The architecture of Nigerian financial institutions, currency issuance, and international trade financing.',
    contentMarkdown: `### 1. Commercial Banks vs Central Bank of Nigeria (CBN)\n- **CBN:** Government bank, sole issuer of legal tender (Naira), regulator of banking sector, lender of last resort.\n- **Commercial Banks (e.g. GTBank, Zenith, Access):** Accept deposits, grant loans, facilitate domestic and foreign payments, create credit.\n\n### 2. Monetary Policy Tools\n- **Monetary Policy Rate (MPR):** Benchmark interest rate.\n- **Cash Reserve Ratio (CRR):** Percentage of customer deposits banks must keep at CBN.`,
    keyTakeaways: ['CBN is the lender of last resort and issues the Naira.', 'Commercial banks generate money through the credit multiplier process.'],
    associatedQuizId: 'jamb-economics-commercial-2025'
  },
  {
    id: 'lit-ss2-african-drama',
    classLevel: 'SS 2',
    stream: 'Non-Science',
    subject: 'Literature-in-English',
    term: '2nd Term',
    weekNumber: 2,
    topicTitle: 'African Drama: The Lion and the Jewel by Wole Soyinka',
    subtopics: ['Conflict between Tradition and Modernity', 'Character Analysis: Baroka, Lakunle, Sidi', 'Use of Song, Dance and Mime'],
    readingTimeMinutes: 8,
    summary: 'Critical study of Soyinka’s celebrated comedic satire set in the Yoruba village of Ilujinle.',
    contentMarkdown: `### 1. Major Themes in "The Lion and the Jewel"\n- **Tradition vs. Modernity:** Lakunle embodies superficial Westernization, while Baroka champions resilient, cunning African tradition.\n- **Bride Price:** Lakunle refuses to pay the bride price, calling it barbaric, whereas Sidi refuses to marry him without it because it honors her virginity.\n- **The Lion’s Triumph:** Baroka feigns impotence through Sadiku, lowering Sidi’s guard and ultimately winning her hand.`,
    keyTakeaways: ['Baroka triumphs through traditional cunning.', 'Sidi rejects Lakunle because he refuses to pay her bride price.'],
    associatedQuizId: 'waec-literature-african-prose-2025'
  }
];
