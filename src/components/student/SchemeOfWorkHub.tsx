import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NIGERIAN_CURRICULUM_TOPICS, OFFICIAL_SUBJECTS_BY_CLASS } from '../../data/curriculumData';
import { NigerianClassLevel, CurriculumTopic, AcademicStream } from '../../types';
import {
  Search,
  BookOpen,
  ArrowRight,
  Download,
  Check,
  Clock,
  WifiOff,
  Layers,
  GraduationCap,
  Sparkles,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  FolderOpen,
  Atom
} from 'lucide-react';

// Subject syllabus metadata with authentic Nigerian NERDC curriculum topics
const SUBJECT_CURRICULUM_METADATA: Record<string, { topic: string; subtopics: string[]; summary: string; takeaways: string[] }> = {
  'Home Economics': {
    topic: 'Food & Nutrition: Nigerian Meal Planning & Food Preservation',
    subtopics: ['Food Groups & Nutrient Sources (Yam, Cassava, Beans, Palm Oil)', 'Kitchen Hygiene & Food Poisoning Prevention', 'Principles of Sewing & Garment Construction', 'Family Budgeting & Consumer Rights'],
    summary: 'Essential practical skills for family living, meal planning with indigenous foods, sanitation, and home management.',
    takeaways: ['A balanced Nigerian meal pairs staples with indigenous proteins and vegetables.', 'Proper refrigeration and sun drying preserve perishable food items.']
  },
  'History': {
    topic: 'Early Centers of Nigerian Civilization: Nok, Igbo-Ukwu, Ife & Benin',
    subtopics: ['Nok Terracotta Sculptures & Iron Smelting Culture', 'Igbo-Ukwu Bronze Casting & Lost-Wax Technique', 'Kingdom of Benin & The Oba’s Royal Court', 'Trans-Saharan Trade Routes & Pre-Colonial Empires'],
    summary: 'Chronological exploration of Nigerian archaeological marvels, sovereign kingdoms, and regional trade prior to colonial contact.',
    takeaways: ['Nok terracotta culture in central Nigeria dates back to 500 BC.', 'Igbo-Ukwu demonstrated master-level lost-wax metallurgy by the 9th century AD.']
  },
  'Social Studies (SOS)': {
    topic: 'Social Issues in Nigeria: Culture, Road Safety & Anti-Corruption',
    subtopics: ['Components of Nigerian Culture (Material & Non-Material)', 'Family as the Primary Agent of Socialization', 'Road Safety Rules & The Role of FRSC', 'Preventing Drug Abuse & Cultism in Schools'],
    summary: 'Understanding societal values, civic responsibilities, traffic safety, and communal coexistence across Nigeria.',
    takeaways: ['Culture shapes human identity, beliefs, language, and moral conduct.', 'Adherence to traffic laws and civic integrity protects public safety.']
  },
  'Cultural and Creative Arts (CCA)': {
    topic: 'Visual & Performing Arts: Nigerian Crafts, Motifs & Drama',
    subtopics: ['Traditional Fabric Arts (Adire, Aso-Oke & Akwete Weaving)', 'Principles of Design (Balance, Rhythm, Proportion, Contrast)', 'Nigerian Folk Music & Traditional Musical Instruments (Dundun, Ogene)', 'Elements of Drama (Script, Actor, Audience, Stage)'],
    summary: 'Hands-on exploration of Nigerian indigenous art forms, textile decoration, music traditions, and theatre.',
    takeaways: ['Adire uses resist-dyeing methods with cassava paste or raffia.', 'The talking drum (Gangan/Dundun) communicates tonal messages in traditional ceremonies.']
  },
  'Physical and Health Education (PHE)': {
    topic: 'Athletics, Personal Hygiene & First Aid Management',
    subtopics: ['Track Events (Sprints, Relays, Hurdles) vs Field Events', 'Personal Hygiene & Posture Correction in Adolescence', 'First Aid Treatment for Bleeding, Sprains & Fractures', 'Prevention of Communicable & Non-Communicable Diseases'],
    summary: 'Physical fitness routines, athletic rules, safety protocols, and biological fundamentals of adolescent hygiene.',
    takeaways: ['Baton exchange in relay races requires flawless non-visual coordination in the changeover box.', 'Prompt RICE treatment (Rest, Ice, Compression, Elevation) limits soft-tissue injuries.']
  },
  'Literature-in-English': {
    topic: 'Literary Genres & African Prose: Themes and Dramatic Devices',
    subtopics: ['Prose, Poetry, and Drama: Distinctions & Elements', 'Figures of Speech: Metaphor, Simile, Irony, Hyperbole, Personification', 'Characterization & Theme Analysis in African Novels', 'Poetic Forms: Sonnets, Odes, Elegies, and Ballads'],
    summary: 'Critical study of literary works, poetic meters, metaphorical devices, and celebrated African and non-African texts.',
    takeaways: ['Drama is meant to be performed on stage through dialogue and action.', 'Symbolism allows authors to convey deeper political and social critique.']
  },
  'Civic Education': {
    topic: 'Citizenship, Fundamental Rights & Electoral Integrity',
    subtopics: ['Acquisition of Nigerian Citizenship (Birth, Registration, Naturalization)', 'Fundamental Human Rights in Chapter IV of 1999 Constitution', 'Democratic Institutions & INEC Voting Procedures', 'Combating Human Trafficking (NAPTIP) & Cultism'],
    summary: 'The legal framework of Nigerian democracy, civil liberties, citizen obligations, and national integrity agencies.',
    takeaways: ['Fundamental human rights are universal but subject to state emergency laws.', 'Free and fair elections safeguard national peace and democratic consolidation.']
  },
  'Christian Religious Studies (CRS)': {
    topic: 'The Sovereignty of God, Creation & The Beatitudes',
    subtopics: ['God the Creator of the Universe (Genesis Account)', 'The Call of Abraham and The Covenant of Faith', 'The Ministry of Jesus Christ & Parables of the Kingdom', 'The Beatitudes: Living the Sermon on the Mount'],
    summary: 'Spiritual, moral, and historical foundations of the Christian faith, prophetic leadership, and gospel teachings.',
    takeaways: ['Abraham obeyed God’s calling by faith, leaving his homeland.', 'The Beatitudes outline spiritual virtues of humility, mercy, and peacemaking.']
  },
  'Computer Studies': {
    topic: 'Computer Hardware, System Software & Safe Internet Usage',
    subtopics: ['Input, Processing, Storage & Output Architecture', 'Operating Systems (Windows, Linux, Android) & File Systems', 'Networking Basics: LAN, WAN, and The World Wide Web', 'Cyber Hygiene, Password Security & Malware Prevention'],
    summary: 'Comprehensive foundation in computing devices, memory hierarchies, software classifications, and online safety.',
    takeaways: ['RAM is volatile primary memory; SSDs and hard disks offer permanent non-volatile storage.', 'Strong passphrases and two-factor authentication prevent unauthorized account access.']
  },
  'Business Studies': {
    topic: 'Bookkeeping Fundamentals: The Ledger & Principles of Double Entry',
    subtopics: ['The Double-Entry Rule (Debit the Receiver, Credit the Giver)', 'Cash Books (Single, Two-Column, and Three-Column)', 'Office Equipment & Business Communication Etiquette', 'Consumer Protection & Rights in the Nigerian Marketplace'],
    summary: 'Financial record-keeping, ledger posting, cash management, and modern commercial office procedures.',
    takeaways: ['Every debit entry must have a corresponding credit entry.', 'The trial balance checks the arithmetical accuracy of ledger accounts.']
  },
  'Basic Technology': {
    topic: 'Technical Drawing, Hand Tools & Engineering Materials',
    subtopics: ['Drawing Instruments (T-Square, Set-Squares, Compass, Scale Rule)', 'Woodworking Hand Tools (Saws, Planes, Chisels) & Safety Rules', 'Metalwork Bench Tools and Measuring Calipers', 'Properties of Plastics, Ceramics, Rubber, and Composites'],
    summary: 'Foundations of technical draughtsmanship, workshop tool maintenance, and engineering material science.',
    takeaways: ['Lines of symmetry and projection lines follow standard engineering conventions.', 'Regular oiling and proper storage preserve cutting edges on workshop hand tools.']
  },
  'Basic Science': {
    topic: 'Energy Transformations, Ecology & Human Body Systems',
    subtopics: ['Forms of Energy (Kinetic, Potential, Thermal, Electrical)', 'Energy Conversion in Hydroelectric and Solar Systems in Nigeria', 'Ecosystems, Food Chains & Biotic/Abiotic Interactions', 'The Human Digestive System: Organs, Enzymes & Absorption'],
    summary: 'Exploration of physical and biological phenomena, energy conservation, ecological balances, and human physiology.',
    takeaways: ['Energy cannot be created or destroyed; it only changes form (Law of Conservation of Energy).', 'Enzymes like amylase, pepsin, and lipase break down macronutrients into absorbable units.']
  },
  'Agricultural Science': {
    topic: 'Soil Fertility, Crop Husbandry & Animal Production',
    subtopics: ['Soil Formation, Texture & Fertility Management (NPK Fertilizers)', 'Agronomy of Major Nigerian Cash Crops (Cocoa, Oil Palm, Cassava)', 'Farm Animal Anatomy & Monogastric vs Ruminant Digestion', 'Agricultural Marketing Systems & Export Standards'],
    summary: 'Scientific crop farming, soil conservation, livestock husbandry, and modern agribusiness management across West Africa.',
    takeaways: ['Legumes fix atmospheric nitrogen into the soil through root nodule bacteria (Rhizobium).', 'Ruminants (cattle, sheep, goats) possess a 4-chambered stomach to digest cellulose.']
  },
  'English Language': {
    topic: 'Advanced Lexis & Structure: Concord, Idioms & Essay Writing',
    subtopics: ['Subject-Verb Agreement (Rules of Concord & Exceptions)', 'Oral English: Vowel Contrasts (/iː/ vs /ɪ/, /æ/ vs /ɑː/) and Word Stress', 'Expository & Argumentative Essay Composition Frameworks', 'Reading Comprehension Strategies & Summary Writing Skills'],
    summary: 'Comprehensive grammatical precision, phonetics, essay organization, and summary techniques for WAEC/NECO/JAMB.',
    takeaways: ['Singular subjects take singular verbs; plural subjects take plural verbs.', 'Summary writing requires extracting central propositions while eliminating ornamental examples.']
  },
  'Mathematics': {
    topic: 'Quadratic Equations, Plane Geometry & Circle Theorems',
    subtopics: ['Solving Quadratics by Factorization, Formula & Completing the Square', 'Circle Theorems (Angle subtended at center, Cyclic quadrilaterals)', 'Trigonometric Ratios (SOH CAH TOA) & Angles of Elevation/Depression', 'Statistics: Mean, Median, Mode & Cumulative Frequency Curves (Ogive)'],
    summary: 'Algebraic problem solving, rigorous geometric proofs, spatial trigonometry, and data analytics.',
    takeaways: ['The quadratic formula $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ solves any quadratic equation.', 'Opposite angles of a cyclic quadrilateral always sum to $180^\\circ$.']
  },
  'Further Mathematics': {
    topic: 'Differential Calculus: Derivatives, Tangents & Optimization',
    subtopics: ['Differentiation from First Principles: $\\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$', 'Product, Quotient, and Chain Rules', 'Equations of Tangents and Normals to Curves', 'Optimization: Maxima, Minima & Points of Inflexion'],
    summary: 'Rigorous mathematical analysis, calculus derivations, rate of change calculations, and practical curve sketching.',
    takeaways: ['The first derivative represents the instantaneous gradient of the tangent line.', 'Stationary points occur where $\\frac{dy}{dx} = 0$; the sign of $\\frac{d^2y}{dx^2}$ confirms maxima or minima.']
  },
  'Physics': {
    topic: 'Newton’s Laws of Motion, Work, Energy & Projectile Motion',
    subtopics: ['Newton’s Three Laws of Motion & Momentum Conservation', 'Calculations of Work Done, Gravitational Potential & Kinetic Energy', 'Equations of Uniformly Accelerated Motion & Velocity-Time Graphs', 'Projectile Motion: Maximum Height, Time of Flight & Range'],
    summary: 'Fundamental physical mechanics, vector kinematics, forces, and dynamic motion formulas tested in WAEC and JAMB.',
    takeaways: ['Force equals rate of change of momentum ($F = ma$).', 'Maximum horizontal range for a projectile occurs at a $45^\\circ$ launch angle.']
  },
  'Chemistry': {
    topic: 'Atomic Structure, Chemical Bonding & The Mole Concept',
    subtopics: ['Electronic Configuration (s, p, d, f orbitals & Hund’s Rule)', 'Periodic Trends: Ionization Energy, Electronegativity, Atomic Radius', 'Ionic, Covalent, and Metallic Bonding Characteristics', 'Stoichiometry & Calculations from Balanced Chemical Equations'],
    summary: 'Quantum atomic models, periodic table trends, intermolecular bonds, and quantitative chemical stoichiometry.',
    takeaways: ['Valence electrons govern chemical reactivity and bond formation.', 'One mole of any gas occupies $22.4 \\text{ dm}^3$ at standard temperature and pressure (s.t.p).']
  },
  'Biology': {
    topic: 'Cell Biology, Photosynthesis & Human Circulatory System',
    subtopics: ['Organelles of Plant vs Animal Cells (Mitochondria, Chloroplasts)', 'Light and Dark Reactions of Photosynthesis', 'Components of Blood (RBC, WBC, Platelets, Plasma)', 'The Double Circulatory System and Cardiac Cycle'],
    summary: 'Detailed biological systems, cellular energetics, physiological transport mechanisms, and genetic inheritance.',
    takeaways: ['Chloroplasts capture solar photons to synthesize glucose during the light-dependent stage.', 'The left ventricle possesses the thickest muscular wall to pump oxygenated blood systemically.']
  },
  'Data Processing': {
    topic: 'Database Management Systems, Relational Tables & SQL Basics',
    subtopics: ['Relational Database Concepts (Tables, Records, Fields, Primary Keys)', 'Creating Tables & Form Design in Microsoft Access / SQLite', 'Structured Query Language (SQL: SELECT, INSERT, UPDATE, DELETE)', 'Data Security, Cloud Backups & Computer Ethics'],
    summary: 'Modern IT data architectures, relational query construction, spreadsheet analytics, and information protection.',
    takeaways: ['A primary key uniquely identifies each record in a database table.', 'SQL is the global industry standard language for managing relational data.']
  },
  'Geography': {
    topic: 'Map Reading, Nigerian Physical Topography & Climate Zones',
    subtopics: ['Contour Lines, Gradient, Intervisibility & Relief Features', 'Drainage Basins of Nigeria (River Niger, Benue & Lake Chad)', 'Climatic Belts: Tropical Rainforest, Guinea, Sudan & Sahel Savanna', 'Mineral Resources & Industrial Belts across Nigerian States'],
    summary: 'Topographical map analysis, contour interpretation, geomorphology, and economic geography of Nigeria.',
    takeaways: ['Closely spaced contour lines indicate steep slopes; wide spacing denotes gentle gradients.', 'Rainfall in Nigeria decreases progressively from the southern coast to the arid northern borders.']
  },
  'Economics': {
    topic: 'Price Mechanism, Market Structures & Nigerian Monetary Policy',
    subtopics: ['Law of Demand and Supply & Equilibrium Price Determination', 'Elasticity of Demand (Price, Income, Cross Elasticity)', 'Market Structures: Perfect Competition vs Monopolistic Competition & Monopoly', 'National Income Accounting (GDP, GNP) & Inflation Control in Nigeria'],
    summary: 'Microeconomic market dynamics, pricing power, macroeconomic indicators, and central banking monetary instruments.',
    takeaways: ['In the long run, perfect competition yields zero economic profit ($P = MC = \\text{minimum ATC}$).', 'The Central Bank of Nigeria uses the Monetary Policy Rate (MPR) to regulate inflation and money supply.']
  },
  'Government': {
    topic: 'Constitutional History of Nigeria, Federalism & Public Administration',
    subtopics: ['Colonial Constitutions (Clifford 1922, Richards 1946, Macpherson 1951, Lyttelton 1954)', 'Independence 1960 and Republican 1963 Constitutions', 'Structure and Separation of Powers (Executive, Legislature, Judiciary)', 'Federalism in Nigeria: Resource Control, Revenue Allocation & Local Governments'],
    summary: 'Evolution of Nigerian governance, constitutional development, political parties, and public corporation administration.',
    takeaways: ['The Clifford Constitution (1922) introduced the elective principle for the first time in Nigeria.', 'Separation of powers and checks and balances safeguard civil society against executive autocracy.']
  },
  'Commerce': {
    topic: 'Commercial Activities, Banking Systems & International Trade',
    subtopics: ['Home Trade (Wholesale vs Retail Channels & Documents)', 'Functions of Commercial Banks, Credit Creation & Electronic Banking (NIBSS, Remita)', 'Warehousing, Transportation & Marine/Fire Insurance Principles', 'Foreign Trade: Export Procedures, Tariffs, Balance of Trade & Payments'],
    summary: 'Commercial transaction lifecycles, Nigerian banking architecture, cargo logistics, and international commerce.',
    takeaways: ['Commercial banks create money through fractional-reserve credit multiplication.', 'A balance of payments surplus occurs when total export earnings exceed total import expenditures.']
  }
};

export const SchemeOfWorkHub: React.FC = () => {
  const {
    openNoteReader,
    student,
    toggleDownloadNote,
    isOffline,
    setActiveStudentTab
  } = useApp();

  const [viewMode, setViewMode] = useState<'class' | 'matrix'>('class');
  const [selectedClass, setSelectedClass] = useState<NigerianClassLevel>(student.classLevel);
  const [selectedStream, setSelectedStream] = useState<'Science' | 'Non-Science' | 'All'>('Science');
  const [selectedTerm, setSelectedTerm] = useState<'All' | '1st Term' | '2nd Term' | '3rd Term'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedMatrixClass, setExpandedMatrixClass] = useState<NigerianClassLevel | 'ALL'>('ALL');

  const classLevels: NigerianClassLevel[] = ['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3'];

  // Handle class level change and adjust stream
  const handleSelectClass = (lvl: NigerianClassLevel) => {
    setSelectedClass(lvl);
    if (lvl.startsWith('JSS')) {
      setSelectedStream('All');
    } else if (selectedStream === 'All') {
      setSelectedStream('Science');
    }
  };

  // Determine official subjects list for current selection in class view
  const getOfficialSubjects = (): { subject: string; stream: AcademicStream }[] => {
    if (selectedClass === 'JSS 1' || selectedClass === 'JSS 2' || selectedClass === 'JSS 3') {
      return OFFICIAL_SUBJECTS_BY_CLASS[selectedClass].map(s => ({ subject: s, stream: 'Junior' as AcademicStream }));
    } else {
      const seniorConfig = OFFICIAL_SUBJECTS_BY_CLASS[selectedClass];
      if (selectedStream === 'Science') {
        return seniorConfig.Science.map(s => ({ subject: s, stream: 'Science' as AcademicStream }));
      } else if (selectedStream === 'Non-Science') {
        return seniorConfig['Non-Science'].map(s => ({ subject: s, stream: 'Non-Science' as AcademicStream }));
      } else {
        // All Senior Subjects (deduplicated or categorized)
        const combined: { subject: string; stream: AcademicStream }[] = [];
        seniorConfig.Science.forEach(s => combined.push({ subject: s, stream: 'Science' }));
        seniorConfig['Non-Science'].forEach(s => {
          if (!combined.some(item => item.subject === s)) {
            combined.push({ subject: s, stream: 'Non-Science' });
          }
        });
        return combined;
      }
    }
  };

  const officialSubjectsWithStream = getOfficialSubjects();

  // Helper to get or synthesize a high-yield topic for any official subject
  const getTopicForSubject = (subjectName: string, streamOverride?: AcademicStream): CurriculumTopic => {
    const stream = streamOverride || (selectedClass.startsWith('JSS') ? 'Junior' : (selectedStream === 'Non-Science' ? 'Non-Science' : 'Science'));

    const existing = NIGERIAN_CURRICULUM_TOPICS.find(
      t => t.classLevel === selectedClass && t.subject.toLowerCase() === subjectName.toLowerCase()
    );

    if (existing) return existing;

    const metadata = SUBJECT_CURRICULUM_METADATA[subjectName] || {
      topic: `${subjectName}: NERDC Scheme of Work & Examination Guide`,
      subtopics: [
        'Fundamental Principles and Core Terminologies',
        'Official NERDC & WAEC Syllabus Coverage',
        'Practical Nigerian Case Studies & Calculations',
        'Examination Model Questions & Marking Keys'
      ],
      summary: `Standard Nigerian curriculum notes for ${subjectName} in ${selectedClass}, covering theoretical foundations and exam guidelines.`,
      takeaways: [
        `Strict adherence to official NERDC & WAEC/BECE syllabus for ${subjectName}.`,
        'Weekly scheme of work guarantees thorough examination mastery.'
      ]
    };

    return {
      id: `${subjectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${selectedClass.toLowerCase().replace(' ', '')}-curriculum`,
      classLevel: selectedClass,
      stream: stream,
      subject: subjectName,
      term: selectedTerm === 'All' ? '2nd Term' : selectedTerm,
      weekNumber: 3,
      topicTitle: metadata.topic,
      subtopics: metadata.subtopics,
      readingTimeMinutes: 7,
      summary: metadata.summary,
      contentMarkdown: `### 1. Subject Overview: ${subjectName} (${selectedClass})

This digital module is aligned with the Nigerian Educational Research and Development Council (NERDC) and West African Examinations Council (WAEC/BECE) standards for **${selectedClass}**.

#### Core Syllabus Objectives:
- Master foundational terminologies, principles, and concepts of **${subjectName}**.
- Understand real-world Nigerian socio-economic, scientific, and cultural applications.
- Prepare effectively for continuous assessment tests (CAT), terminal examinations, and national CBT exams.

---

### 2. Comprehensive Term Scheme of Work
| Week | Focus Topic | Core Learning Outcome |
|---|---|---|
| **Week 1** | Course Orientation & Foundational Review | Review of prerequisite concepts from previous term |
| **Week 2** | Theoretical Principles & Definitions | Mastery of fundamental laws and classifications |
| **Week 3** | Quantitative & Practical Applications | Problem solving, experiments, and case studies |
| **Week 4** | Nigerian Industry & Environmental Context | Real-world local relevance and policy frameworks |
| **Week 5** | Mid-Term Assessment & Progress Review | Formative diagnostic testing and feedback |
| **Week 6** | Advanced Structural Principles | In-depth topic exploration and derivations |
| **Week 7** | Practical Laboratory / Studio Session | Hands-on application and documentation |
| **Week 8** | Analytical Examination Drills | WAEC, NECO & JAMB past question analysis |
| **Week 9** | Comprehensive Revision & Summaries | Synthesis of key theorems and memory mnemonics |
| **Week 10** | Terminal Examination & Scoring | Summative CBT assessment |

---

### 3. High-Yield Study Guidance
1. Always memorize key definitions and maintain clear, labeled diagrams or formulas where applicable.
2. Link theoretical concepts to everyday Nigerian examples (agriculture, commerce, public governance, technological infrastructure).
3. Test yourself regularly using the CBT Examination simulator to build speed and accuracy under timed conditions.`,
      keyTakeaways: metadata.takeaways,
      associatedQuizId: 'jamb-utme-biology-2025'
    };
  };

  // Filter subjects based on search query
  const filteredSubjects = officialSubjectsWithStream.filter(item => {
    if (searchQuery.trim() === '') return true;
    return item.subject.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-4 touch-pan-y text-slate-100">
      {/* Title & Stats */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Scheme of Work & Syllabus
              </h2>
              <p className="text-[11px] text-slate-400">
                Official NERDC & WAEC curriculum for JSS1 to SS3
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            105 Subject Tracks
          </span>
        </div>

        {isOffline && (
          <div className="mt-2.5 bg-amber-950/60 border border-amber-800/60 rounded-xl p-2.5 flex items-center gap-2 text-xs text-amber-300">
            <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Offline Mode Active: Showing notes saved to local cache.</span>
          </div>
        )}

        {/* Quick Link to Formula Bank & Periodic Table */}
        <button
          onClick={() => setActiveStudentTab('formulas')}
          className="mt-2.5 w-full bg-gradient-to-r from-indigo-950/80 via-slate-900 to-indigo-950/50 border border-indigo-700/60 hover:border-indigo-500/80 rounded-2xl p-2.5 flex items-center justify-between text-left transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-900/60 border border-indigo-600/40 flex items-center justify-center text-indigo-300 shrink-0">
              <Atom className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                <span>Science Formulas & Periodic Table</span>
                <span className="text-[9px] font-semibold text-indigo-400 bg-indigo-950 px-1.5 py-0.2 rounded border border-indigo-800">
                  WAEC & JAMB
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                All Maths, Physics, Chemistry formulas & Interactive Periodic Table
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
        </button>
      </div>

      {/* Main View Mode Selector: By Class vs Full Curriculum Matrix */}
      <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
        <button
          onClick={() => setViewMode('class')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
            viewMode === 'class'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Class Explorer ({selectedClass})</span>
        </button>

        <button
          onClick={() => setViewMode('matrix')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
            viewMode === 'matrix'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FolderOpen className="w-3.5 h-3.5" />
          <span>All Classes Directory (JSS1 - SS3)</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* MODE 1: ALL CLASSES FULL CURRICULUM DIRECTORY (MATRIX)        */}
      {/* ============================================================== */}
      {viewMode === 'matrix' && (
        <div className="space-y-4">
          <div className="bg-slate-900/90 rounded-2xl p-3.5 border border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>All Nigerian Secondary Subjects (Master Syllabus)</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                15 JSS · 11 Science · 9 Arts
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Every official subject from Junior Secondary 1 to Senior Secondary 3 as approved by the Nigerian Educational Research and Development Council (NERDC). Tap any subject below to explore its notes.
            </p>
          </div>

          {/* JSS 1, 2, 3 Breakdown */}
          {(['JSS 1', 'JSS 2', 'JSS 3'] as const).map(jss => (
            <div key={jss} className="bg-slate-900/90 rounded-2xl p-3.5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    {jss}
                  </span>
                  <span className="text-xs font-semibold text-slate-200">
                    Junior Secondary School {jss.slice(-1)}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400">
                  All 15 Subjects
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {OFFICIAL_SUBJECTS_BY_CLASS[jss].map((subName, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedClass(jss);
                      setSelectedStream('All');
                      openNoteReader(getTopicForSubject(subName, 'Junior'));
                    }}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800 text-left transition-colors group cursor-pointer"
                  >
                    <span className="text-xs text-slate-200 group-hover:text-emerald-300 truncate">
                      {idx + 1}. {subName}
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 shrink-0 ml-1 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* SS 1, 2, 3 Breakdown */}
          {(['SS 1', 'SS 2', 'SS 3'] as const).map(sss => {
            const conf = OFFICIAL_SUBJECTS_BY_CLASS[sss];
            return (
              <div key={sss} className="bg-slate-900/90 rounded-2xl p-3.5 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                      {sss}
                    </span>
                    <span className="text-xs font-semibold text-slate-200">
                      Senior Secondary School {sss.slice(-1)} (WAEC & JAMB)
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-indigo-400">
                    20 Total Subjects
                  </span>
                </div>

                {/* Science Stream */}
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 mb-2">
                    <Layers className="w-3 h-3" />
                    <span>Science Stream ({conf.Science.length} Subjects)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {conf.Science.map((subName, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedClass(sss);
                          setSelectedStream('Science');
                          openNoteReader(getTopicForSubject(subName, 'Science'));
                        }}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-emerald-900/30 text-left transition-colors group cursor-pointer"
                      >
                        <span className="text-xs text-slate-200 group-hover:text-emerald-300 truncate">
                          {idx + 1}. {subName}
                        </span>
                        <ArrowRight className="w-3 h-3 text-emerald-600 group-hover:text-emerald-400 shrink-0 ml-1" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Non-Science Stream */}
                <div className="pt-2 border-t border-slate-800/60">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-400 mb-2">
                    <GraduationCap className="w-3 h-3" />
                    <span>Non-Science / Commercial & Arts Stream ({conf['Non-Science'].length} Subjects)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {conf['Non-Science'].map((subName, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedClass(sss);
                          setSelectedStream('Non-Science');
                          openNoteReader(getTopicForSubject(subName, 'Non-Science'));
                        }}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-indigo-900/30 text-left transition-colors group cursor-pointer"
                      >
                        <span className="text-xs text-slate-200 group-hover:text-indigo-300 truncate">
                          {idx + 1}. {subName}
                        </span>
                        <ArrowRight className="w-3 h-3 text-indigo-600 group-hover:text-indigo-400 shrink-0 ml-1" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================== */}
      {/* MODE 2: CLASS EXPLORER VIEW (WITH COMPREHENSIVE CARDS)        */}
      {/* ============================================================== */}
      {viewMode === 'class' && (
        <div className="space-y-4">
          {/* Class Level Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {classLevels.map(lvl => (
              <button
                key={lvl}
                onClick={() => handleSelectClass(lvl)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedClass === lvl
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Stream Selector for Senior Secondary */}
          {selectedClass.startsWith('SS') && (
            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setSelectedStream('Science')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  selectedStream === 'Science'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Science Stream (11)</span>
              </button>

              <button
                onClick={() => setSelectedStream('Non-Science')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  selectedStream === 'Non-Science'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Non-Science / Arts (9)</span>
              </button>

              <button
                onClick={() => setSelectedStream('All')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  selectedStream === 'All'
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>All (20)</span>
              </button>
            </div>
          )}

          {/* Junior Secondary Indicator */}
          {selectedClass.startsWith('JSS') && (
            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold text-emerald-400">All 15 Compulsory Junior Secondary Subjects</span>
              <span className="text-[10px] text-slate-500 font-mono">BECE National Standard</span>
            </div>
          )}

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={`Search ${filteredSubjects.length} ${selectedClass} subjects or topics...`}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Term Selector */}
          <div className="flex items-center gap-1.5">
            {(['All', '1st Term', '2nd Term', '3rd Term'] as const).map(term => (
              <button
                key={term}
                onClick={() => setSelectedTerm(term)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                  selectedTerm === term
                    ? 'bg-slate-800 text-white border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {term}
              </button>
            ))}
          </div>

          {/* Official Subjects Grid */}
          <div className="space-y-3">
            {filteredSubjects.length === 0 ? (
              <div className="bg-slate-900/60 rounded-2xl p-6 text-center border border-slate-800/80">
                <BookOpen className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <h3 className="text-xs font-semibold text-slate-300">No subject found matching "{searchQuery}"</h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  Check spelling or clear search to view all {officialSubjectsWithStream.length} {selectedClass} subjects.
                </p>
              </div>
            ) : (
              filteredSubjects.map(item => {
                const topic = getTopicForSubject(item.subject, item.stream);
                const isDownloaded = student.downloadedSubjectIds.includes(topic.id);

                return (
                  <div
                    key={`${item.subject}-${item.stream}`}
                    className="bg-slate-900/90 rounded-2xl p-3.5 border border-slate-800 hover:border-slate-700 transition-all space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                            {item.subject}
                          </span>
                          <span className="text-[10px] text-slate-400">·</span>
                          <span className="text-[11px] text-slate-400 font-medium">
                            {selectedClass} ({item.stream})
                          </span>
                          <span className="text-[10px] text-slate-400">·</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {topic.term}
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-white mt-1 leading-snug">
                          {topic.topicTitle}
                        </h3>
                      </div>

                      {/* Offline Download Toggle */}
                      <button
                        onClick={() => toggleDownloadNote(topic.id)}
                        className={`p-1.5 rounded-lg text-xs transition-colors shrink-0 cursor-pointer ${
                          isDownloaded
                            ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                            : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                        }`}
                        title={isDownloaded ? 'Downloaded for offline viewing' : 'Download for offline use'}
                      >
                        {isDownloaded ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Subtopics Outline */}
                    <div className="space-y-1">
                      <div className="text-[11px] text-slate-400 font-medium">Curriculum Subtopics:</div>
                      <ul className="text-xs text-slate-300 space-y-0.5 pl-3 list-disc marker:text-emerald-500">
                        {topic.subtopics.slice(0, 3).map((sub, idx) => (
                          <li key={idx} className="line-clamp-1">{sub}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{topic.readingTimeMinutes} mins read</span>
                        {isDownloaded && (
                          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800">
                            Cached
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => openNoteReader(topic)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm cursor-pointer"
                      >
                        <span>Read Notes</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
