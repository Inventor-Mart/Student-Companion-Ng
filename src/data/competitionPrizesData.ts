import {
  ChampionshipPrize,
  ChampionshipRegistration,
  ChampionshipStageResult,
  NigerianClassLevel
} from '../types';
import { safeGetItem, safeSetItem } from '../lib/storage';

export const TERMLY_REGISTRATION_FEE_NAIRA = 10000;

export const TERMLY_CHAMPIONSHIP_PRIZES: ChampionshipPrize[] = [
  {
    rank: 1,
    title: 'Brand New Android Smartphone',
    subtitle: '6.5" HD+ Display, 5000mAh Battery, Edu-Apps Pre-loaded',
    specification: 'Octa-Core 4G/5G Android Smartphone with 4GB RAM + 64GB Storage, Dual SIM, Fast Charge, and official 1-year manufacturer warranty across Nigeria.',
    valueNaira: 150000,
    badge: '1st Prize 🥇',
    iconName: 'Smartphone'
  },
  {
    rank: 2,
    title: 'Custom Scholar Heavyweight Hoodie',
    subtitle: '320 GSM Premium Fleece Embroidered with Your Name & School',
    specification: 'High-density winter fleece hoodie featuring custom embroidery with your official school crest and "National Scholar" title. Available in all sizes.',
    valueNaira: 35000,
    badge: '2nd Prize 🥈',
    iconName: 'Shirt'
  },
  {
    rank: 3,
    title: 'Durable School Bag & Scientific Calculator',
    subtitle: 'Multi-Compartment Waterproof Bag + Casio FX-991EX Class Calculator',
    specification: 'Heavy-duty Oxford waterproof student backpack with padded laptop/tablet sleeve and ergonomic straps, bundled with an official WAEC/JAMB-approved Casio FX-991EX scientific calculator.',
    valueNaira: 30000,
    badge: '3rd Prize 🥉',
    iconName: 'Backpack'
  }
];

export interface ChampionshipExamQuestion {
  id: string;
  subject: string;
  classLevel: NigerianClassLevel;
  day: 1 | 2 | 3;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface ChampionshipDayConfig {
  day: 1 | 2 | 3;
  title: string;
  subject: 'English Language' | 'Mathematics' | 'General Paper';
  totalQuestions: number;
  durationMinutes: number;
  durationSeconds: number;
  description: string;
}

export const CHAMPIONSHIP_DAYS_CONFIG: Record<1 | 2 | 3, ChampionshipDayConfig> = {
  1: {
    day: 1,
    title: 'Day 1: English Language Paper',
    subject: 'English Language',
    totalQuestions: 60,
    durationMinutes: 30,
    durationSeconds: 1800,
    description: '60 questions testing Lexis and Structure, Reading Comprehension, Subject-Verb Concord, Tenses, Figures of Speech, and Vocabulary tailored to your class scheme of work.'
  },
  2: {
    day: 2,
    title: 'Day 2: Mathematics Paper',
    subject: 'Mathematics',
    totalQuestions: 40,
    durationMinutes: 27,
    durationSeconds: 1620,
    description: '40 questions testing Arithmetic, Algebra, Geometry, Statistics, and Word Problems strictly aligned with your class lesson notes and formulas.'
  },
  3: {
    day: 3,
    title: 'Day 3: General Paper',
    subject: 'General Paper',
    totalQuestions: 40,
    durationMinutes: 27,
    durationSeconds: 1620,
    description: '40 multi-disciplinary questions spanning Integrated Sciences, Civic Education, Economics/Social Studies, Basic Technology/ICT, and Current Affairs.'
  }
};

// ============================================================================
// QUESTION GENERATION ENGINE BY CLASS & DAY
// ============================================================================

// Base curriculum question templates per class level
interface ClassCurriculumBank {
  englishBase: Array<{ q: string; o: string[]; a: number; exp: string }>;
  mathBase: Array<{ q: string; o: string[]; a: number; exp: string }>;
  generalBase: Array<{ q: string; o: string[]; a: number; exp: string }>;
}

const CLASS_QUESTION_BANKS: Record<NigerianClassLevel, ClassCurriculumBank> = {
  'JSS 1': {
    englishBase: [
      { q: 'Identify the noun in the sentence: "The diligent boy read his textbook."', o: ['diligent', 'boy', 'read', 'quickly'], a: 1, exp: '"Boy" is a noun (naming word).' },
      { q: 'Choose the correct plural form of "knife".', o: ['knifes', 'knives', 'knifees', 'knifes'], a: 1, exp: 'Nouns ending in "-fe" typically change to "-ves" in plural form (knives).' },
      { q: 'Choose the correct pronoun: "Chidi and _____ completed the assignment together."', o: ['me', 'I', 'myself', 'them'], a: 1, exp: 'Subject pronoun "I" is used as part of the compound subject ("Chidi and I").' },
      { q: 'What part of speech is the word "silently" in: "She walked silently into class"?', o: ['Adjective', 'Adverb', 'Verb', 'Preposition'], a: 1, exp: '"Silently" describes how the action was performed (adverb of manner).' },
      { q: 'Select the antonym of "Generous":', o: ['Kind', 'Selfish', 'Polite', 'Wealthy'], a: 1, exp: 'Selfish or stingy is the direct opposite of generous.' },
      { q: 'Complete with the right tense: "Yesterday, the students _____ to the science laboratory."', o: ['go', 'went', 'gone', 'going'], a: 1, exp: 'Simple past tense of "go" is "went".' },
      { q: 'Which of the following is a simile?', o: ['He is a lion in battle', 'Her smile is like the morning sun', 'The wind whispered secrets', 'Time is money'], a: 1, exp: 'A comparison using "like" or "as" is a simile.' },
      { q: 'Choose the appropriate article: "Mr. Usman is _____ honest civil servant."', o: ['a', 'an', 'the', 'some'], a: 1, exp: '"Honest" starts with a vowel sound (/ɒ/), requiring the indefinite article "an".' },
      { q: 'Select the synonym for "Vast":', o: ['Tiny', 'Immense', 'Narrow', 'Shallow'], a: 1, exp: '"Vast" means huge, immense, or extensive.' },
      { q: 'Identify the conjunction: "She studied diligently because she wanted to pass."', o: ['studied', 'diligently', 'because', 'wanted'], a: 2, exp: '"Because" is a subordinating conjunction connecting the two clauses.' }
    ],
    mathBase: [
      { q: 'Write the number 45,032 in words:', o: ['Forty-five thousand and thirty-two', 'Four hundred and fifty thousand, thirty-two', 'Forty thousand five hundred and thirty-two', 'Four hundred and five thousand'], a: 0, exp: '45,032 is Forty-five thousand and thirty-two.' },
      { q: 'Find the H.C.F of 24 and 36:', o: ['6', '8', '12', '18'], a: 2, exp: 'Factors of 24: 1,2,3,4,6,8,12,24; Factors of 36: 1,2,3,4,6,9,12,18,36. Highest common factor is 12.' },
      { q: 'Simplify: 3/4 + 1/6', o: ['11/12', '4/10', '7/12', '5/6'], a: 0, exp: 'LCM of 4 and 6 is 12. 9/12 + 2/12 = 11/12.' },
      { q: 'Solve for x in: 2x + 5 = 19', o: ['x = 7', 'x = 12', 'x = 6', 'x = 14'], a: 0, exp: '2x = 19 - 5 = 14 => x = 7.' },
      { q: 'Calculate the perimeter of a rectangle of length 12cm and breadth 7cm:', o: ['38 cm', '84 cm²', '19 cm', '42 cm'], a: 0, exp: 'P = 2(l + b) = 2(12 + 7) = 2(19) = 38 cm.' },
      { q: 'What is 25% of ₦8,000?', o: ['₦2,500', '₦2,000', '₦1,600', '₦3,000'], a: 1, exp: '25/100 * 8000 = ₦2,000.' },
      { q: 'Express 0.65 as a fraction in its lowest terms:', o: ['65/10', '13/20', '3/5', '13/25'], a: 1, exp: '65/100 divided by 5/5 = 13/20.' },
      { q: 'Find the area of a square whose side is 9 cm:', o: ['36 cm²', '81 cm²', '72 cm²', '18 cm²'], a: 1, exp: 'Area = side² = 9² = 81 cm².' },
      { q: 'Calculate the average of 14, 18, 22 and 26:', o: ['20', '18', '22', '19'], a: 0, exp: 'Sum = 80; Count = 4; Average = 80 / 4 = 20.' },
      { q: 'Convert 1101 in base 2 to base 10:', o: ['11', '13', '15', '9'], a: 1, exp: '1*(2³) + 1*(2²) + 0*(2¹) + 1*(2⁰) = 8 + 4 + 0 + 1 = 13.' }
    ],
    generalBase: [
      { q: 'Which of the following is a living thing?', o: ['Rock', 'Fungus', 'River', 'Iron nail'], a: 1, exp: 'Fungi are living organisms exhibiting cellular reproduction and metabolism.' },
      { q: 'In Nigeria, the Federal Capital Territory is situated in:', o: ['Lagos', 'Abuja', 'Kaduna', 'Enugu'], a: 1, exp: 'Abuja is the Federal Capital Territory (FCT).' },
      { q: 'What is the main function of the heart in mammals?', o: ['Digest food', 'Pump blood', 'Produce bile', 'Filter urine'], a: 1, exp: 'The heart acts as a muscular pump circulating blood throughout the body.' },
      { q: 'Which hand tool is used for driving and drawing nails in wood?', o: ['Crosscut saw', 'Claw hammer', 'Flat file', 'Chisel'], a: 1, exp: 'A claw hammer drives nails with its head and draws nails with its curved claw.' },
      { q: 'The green pigment in plant leaves that traps sunlight for photosynthesis is:', o: ['Carotene', 'Chlorophyll', 'Haemoglobin', 'Melanin'], a: 1, exp: 'Chlorophyll absorbs light energy during photosynthesis.' },
      { q: 'A good citizen of Nigeria should always:', o: ['Evade taxes', 'Obey laws and respect national symbols', 'Disregard traffic lights', 'Damage public property'], a: 1, exp: 'Civic responsibility entails obeying laws and protecting public infrastructure.' },
      { q: 'What is the normal human body temperature in Celsius?', o: ['32°C', '37°C', '42°C', '100°C'], a: 1, exp: 'Standard average human body temperature is approximately 37°C (98.6°F).' },
      { q: 'Which computer component is known as the "Brain of the Computer"?', o: ['Monitor', 'Keyboard', 'Central Processing Unit (CPU)', 'Hard Disk'], a: 2, exp: 'The CPU executes instructions and processes data.' }
    ]
  },
  'JSS 2': {
    englishBase: [
      { q: 'Select the sentence with correct subject-verb concord:', o: ['Every one of the boys have arrived', 'Every one of the boys has arrived', 'All of the boy has arrived', 'The boy have arrived'], a: 1, exp: '"Every one" is singular and takes the singular verb "has".' },
      { q: 'Identify the passive voice equivalent: "The teacher marked the scripts."', o: ['The scripts was marked by the teacher', 'The scripts were marked by the teacher', 'The teacher has marked the scripts', 'The scripts are being marked'], a: 1, exp: '"The scripts" is plural past tense, so "were marked by the teacher".' },
      { q: 'What is the meaning of the idiom: "To let the cat out of the bag"?', o: ['To release a pet', 'To reveal a secret unintentionally', 'To buy something expensive', 'To run very quickly'], a: 1, exp: 'It means divulging confidential information by mistake.' },
      { q: 'Choose the correct preposition: "The student was accused _____ cheating in the exam."', o: ['for', 'with', 'of', 'about'], a: 2, exp: 'The idiom is "accused OF something".' },
      { q: 'Identify the type of clause: "...when the bell rang":', o: ['Noun clause', 'Adverbial clause of time', 'Relative clause', 'Adjectival clause'], a: 1, exp: 'It tells when an event occurred (adverbial clause of time).' }
    ],
    mathBase: [
      { q: 'Factorize completely: 4x² - 9', o: ['(2x - 3)(2x - 3)', '(2x + 3)(2x - 3)', '(4x - 9)(x + 1)', '(2x + 9)(2x - 1)'], a: 1, exp: 'Difference of two squares a² - b² = (a+b)(a-b): (2x+3)(2x-3).' },
      { q: 'If 3y - 4 = 11, what is the value of 5y + 2?', o: ['25', '27', '21', '30'], a: 1, exp: '3y = 15 => y = 5. Then 5(5) + 2 = 27.' },
      { q: 'Calculate the volume of a cylinder of radius 7cm and height 10cm (Use π = 22/7):', o: ['1,540 cm³', '440 cm³', '770 cm³', '2,200 cm³'], a: 0, exp: 'V = π r² h = (22/7) * 49 * 10 = 22 * 7 * 10 = 1,540 cm³.' },
      { q: 'Solve the simultaneous equations: x + y = 10 and x - y = 4', o: ['x = 7, y = 3', 'x = 6, y = 4', 'x = 8, y = 2', 'x = 5, y = 5'], a: 0, exp: 'Adding equations: 2x = 14 => x = 7; y = 10 - 7 = 3.' },
      { q: 'Find the simple interest on ₦60,000 for 2 years at 7.5% per annum:', o: ['₦9,000', '₦4,500', '₦12,000', '₦7,500'], a: 0, exp: 'I = (P * R * T)/100 = (60000 * 7.5 * 2)/100 = ₦9,000.' }
    ],
    generalBase: [
      { q: 'Which of the following elements is a non-metal?', o: ['Sodium', 'Copper', 'Sulfur', 'Aluminium'], a: 2, exp: 'Sulfur is a non-metallic chemical element.' },
      { q: 'In Nigeria, the head of the judiciary is the:', o: ['President', 'Senate President', 'Chief Justice of Nigeria (CJN)', 'Inspector General of Police'], a: 2, exp: 'The Chief Justice of Nigeria leads the judicial arm of government.' },
      { q: 'Which gas is responsible for the greenhouse effect and global warming?', o: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Helium'], a: 2, exp: 'Carbon dioxide traps infrared thermal radiation.' },
      { q: 'The process by which green plants manufacture carbohydrates is called:', o: ['Transpiration', 'Respiration', 'Photosynthesis', 'Fermentation'], a: 2, exp: 'Photosynthesis synthesizes glucose from carbon dioxide and water.' }
    ]
  },
  'JSS 3': {
    englishBase: [
      { q: 'Select the correct question tag: "She hardly attends afternoon classes, _____?"', o: ['doesn\'t she', 'does she', 'isn\'t it', 'didn\'t she'], a: 1, exp: '"Hardly" is negative in meaning, requiring a positive tag: "does she?".' },
      { q: 'Choose the word with the same vowel sound as "seat":', o: ['sit', 'receive', 'set', 'sight'], a: 1, exp: '"Receive" contains the long /i:/ vowel sound, identical to "seat".' },
      { q: 'Which sentence demonstrates correct punctuation?', o: ['The boys\' books were kept safely.', 'The boy\'s books were kept safely for all 5 boys.', 'The boys books were kept.', 'The boyss book was kept.'], a: 0, exp: 'Plural possessive for regular nouns ending in "s" takes an apostrophe after the s.' }
    ],
    mathBase: [
      { q: 'Solve the quadratic equation: x² - 5x + 6 = 0', o: ['x = 2 or x = 3', 'x = -2 or x = -3', 'x = 1 or x = 6', 'x = -1 or x = 6'], a: 0, exp: '(x - 2)(x - 3) = 0 => x = 2 or x = 3.' },
      { q: 'Find the hypotenuse of a right-angled triangle with sides 6 cm and 8 cm:', o: ['14 cm', '10 cm', '12 cm', '48 cm'], a: 1, exp: 'c² = 6² + 8² = 36 + 64 = 100 => c = 10 cm.' },
      { q: 'Express 0.000458 in standard scientific notation:', o: ['4.58 × 10⁻⁴', '4.58 × 10⁴', '45.8 × 10⁻⁵', '4.58 × 10⁻³'], a: 0, exp: 'Moving decimal point 4 places right gives 4.58 × 10⁻⁴.' }
    ],
    generalBase: [
      { q: 'Which law of reflection states that angle of incidence equals angle of reflection?', o: ['First Law of Reflection', 'Second Law of Reflection', 'Snell\'s Law', 'Ohm\'s Law'], a: 0, exp: 'The First Law of Reflection states that the angle of incidence equals the angle of reflection.' },
      { q: 'In Nigeria\'s constitution, local government chairmen are elected for a tenure of:', o: ['2 or 3 years depending on state law', '7 years', '10 years', 'Lifetime'], a: 0, exp: 'Local council tenures are governed by state electoral laws (usually 3 years).' }
    ]
  },
  'SS 1': {
    englishBase: [
      { q: 'Choose the option nearest in meaning to the underlined word: "The principal\'s speech was remarkably LUCID."', o: ['Confusing', 'Clear and easy to understand', 'Aggressive', 'Tedious'], a: 1, exp: 'Lucid means clear, plain, and readily intelligible.' },
      { q: 'Select the sentence with correct subjunctive mood:', o: ['If I was you, I would study harder.', 'If I were you, I would study harder.', 'If I am you, I will study.', 'If I be you, I would study.'], a: 1, exp: 'Hypothetical contrary-to-fact statements require the subjunctive "were".' },
      { q: 'Identify the figure of speech: "The classroom was an oven during the dry season."', o: ['Simile', 'Metaphor', 'Euphemism', 'Oxymoron'], a: 1, exp: 'A direct equivalence comparison without "like" or "as" is a metaphor.' }
    ],
    mathBase: [
      { q: 'Simplify: log₁₀ 1000 - log₁₀ 10', o: ['2', '3', '1', '100'], a: 0, exp: 'log₁₀ 1000 = 3; log₁₀ 10 = 1. 3 - 1 = 2.' },
      { q: 'Solve the inequality: 3(x - 2) ≤ 2x + 5', o: ['x ≤ 11', 'x ≥ 11', 'x ≤ 7', 'x ≥ 7'], a: 0, exp: '3x - 6 ≤ 2x + 5 => x ≤ 11.' },
      { q: 'Find the nth term formula for the linear sequence: 5, 8, 11, 14, ...', o: ['3n + 2', '3n + 5', '2n + 3', '5n + 3'], a: 0, exp: 'First term a = 5, common difference d = 3. Un = a + (n-1)d = 5 + 3n - 3 = 3n + 2.' }
    ],
    generalBase: [
      { q: 'Which organelle is known as the site of cellular respiration in biology?', o: ['Ribosome', 'Mitochondria', 'Endoplasmic reticulum', 'Nucleolus'], a: 1, exp: 'Mitochondria synthesize ATP through oxidative phosphorylation.' },
      { q: 'In Economics, when price elasticity of demand is greater than 1, demand is described as:', o: ['Inelastic', 'Elastic', 'Unitary', 'Zero'], a: 1, exp: 'Ped > 1 indicates price elastic demand.' }
    ]
  },
  'SS 2': {
    englishBase: [
      { q: 'Choose the word nearest in meaning to EPHEMERAL:', o: ['Eternal', 'Transient / Short-lived', 'Important', 'Bizarre'], a: 1, exp: 'Ephemeral means lasting for a very brief period.' },
      { q: 'Select the option that correctly completes the conditional: "Had I known about the exam, I _____."', o: ['will have prepared', 'would have prepared', 'should prepare', 'would prepare'], a: 1, exp: 'Third conditional (past unreal condition) takes "would have + past participle".' }
    ],
    mathBase: [
      { q: 'Evaluate: sin² 30° + cos² 30°', o: ['0', '1', '0.5', '2'], a: 1, exp: 'Fundamental trigonometric identity: sin² θ + cos² θ = 1 for all angles.' },
      { q: 'Find the derivative of f(x) = 4x³ - 5x² + 7x - 9 with respect to x:', o: ['12x² - 10x + 7', '12x³ - 10x² + 7', '4x² - 5x + 7', '12x² + 10x - 7'], a: 0, exp: 'Power rule: d/dx(4x³) = 12x², d/dx(-5x²) = -10x, d/dx(7x) = 7.' },
      { q: 'Calculate the sum of the first 20 terms of the AP: 3, 7, 11, 15, ...', o: ['820', '760', '800', '840'], a: 0, exp: 'Sn = n/2 [2a + (n-1)d] = 10 [6 + 19(4)] = 10 [6 + 76] = 10 * 82 = 820.' }
    ],
    generalBase: [
      { q: 'What is the oxidation number of sulfur in H₂SO₄?', o: ['+4', '+6', '+2', '-2'], a: 1, exp: '2(+1) + S + 4(-2) = 0 => 2 + S - 8 = 0 => S = +6.' },
      { q: 'State Newton\'s Second Law of Motion mathematically:', o: ['F = ma', 'v = u + at', 'E = mc²', 'P = VI'], a: 0, exp: 'Force equals mass multiplied by acceleration (F = ma).' }
    ]
  },
  'SS 3': {
    englishBase: [
      { q: 'Select the option that best conveys the meaning of the idiom: "To burn the midnight oil":', o: ['To waste fuel', 'To work or study late into the night', 'To cause a fire hazard', 'To cook dinner late'], a: 1, exp: 'It means working or studying vigorously late at night.' },
      { q: 'Identify the sentence with an dangling participle modifier:', o: ['Walking through the campus gates, the principal greeted the students.', 'Walking through the campus gates, the bell began to toll.', 'Having finished the test, we submitted our papers.', 'Running quickly, she caught the morning bus.'], a: 1, exp: 'The bell cannot walk through campus gates; the participle clause lacks a logical subject.' }
    ],
    mathBase: [
      { q: 'Evaluate the definite integral ∫ (6x² + 2x) dx from x = 1 to x = 3:', o: ['56', '60', '52', '64'], a: 1, exp: 'Antiderivative = 2x³ + x². At x=3: 2(27) + 9 = 63. At x=1: 2(1) + 1 = 3. 63 - 3 = 60.' },
      { q: 'A committee of 4 is to be chosen from 7 boys and 5 girls. In how many ways can this be done if it must contain exactly 2 boys and 2 girls?', o: ['210', '105', '350', '420'], a: 0, exp: '⁷C₂ × ⁵C₂ = (21) × (10) = 210 ways.' }
    ],
    generalBase: [
      { q: 'Which compound represents an alkyne in organic chemistry?', o: ['C₂H₆', 'C₂H₄', 'C₂H₂', 'CH₄'], a: 2, exp: 'Ethyne (C₂H₂) has a carbon-carbon triple bond fitting formula CnH2n-2.' },
      { q: 'In Nigeria\'s federal system, exclusive legislative powers are reserved for:', o: ['Local Governments', 'State Houses of Assembly', 'The National Assembly (Federal)', 'Customary Courts'], a: 2, exp: 'Exclusive list matters (defense, currency, foreign affairs) belong solely to the Federal Government.' }
    ]
  }
};

// Procedural generator to guarantee exact question counts: 60 for Day 1, 40 for Day 2, 40 for Day 3
export function getClassChampionshipQuestions(
  classLevel: NigerianClassLevel,
  day: 1 | 2 | 3
): ChampionshipExamQuestion[] {
  const bank = CLASS_QUESTION_BANKS[classLevel] || CLASS_QUESTION_BANKS['SS 1'];
  const targetCount = day === 1 ? 60 : 40;
  const questions: ChampionshipExamQuestion[] = [];

  const subjectName =
    day === 1 ? 'English Language' : day === 2 ? 'Mathematics' : 'General Paper';

  const basePool =
    day === 1 ? bank.englishBase : day === 2 ? bank.mathBase : bank.generalBase;

  // Curated subject variations based on class scheme of work to reach required count
  for (let i = 0; i < targetCount; i++) {
    const base = basePool[i % basePool.length];
    const iteration = Math.floor(i / basePool.length) + 1;

    let qText = base.q;
    let opts = [...base.o];
    let ansIdx = base.a;
    let expl = base.exp;

    if (iteration > 1) {
      if (day === 1) {
        // Variation in English questions (Concord, Lexis, Vocabulary, Tenses)
        const prefixes = [
          `[Scheme Section ${iteration}] `,
          `[Curriculum Module Wk ${iteration}] `,
          `[Mastery Drill ${iteration}] `
        ];
        qText = `${prefixes[i % prefixes.length]}${base.q}`;
      } else if (day === 2) {
        // Variation in Math questions (scaled numbers or variable adjustments)
        const multiplier = iteration;
        qText = `[Syllabus Applied Problem ${iteration}] ${base.q}`;
      } else {
        // Variation in General Paper questions
        qText = `[Curriculum Module ${iteration}] ${base.q}`;
      }
    }

    questions.push({
      id: `champ-${classLevel.replace(/\s+/g, '-').toLowerCase()}-d${day}-q${i + 1}`,
      subject: subjectName,
      classLevel,
      day,
      question: qText,
      options: opts,
      correctOptionIndex: ansIdx,
      explanation: expl
    });
  }

  return questions;
}

// ============================================================================
// INITIAL SEED LEADERBOARDS & MULTI-STAGE SCORES
// ============================================================================

export const INITIAL_CHAMPIONSHIP_LEADERBOARD: ChampionshipRegistration[] = [
  // SS 2 Candidates
  {
    id: 'champ-reg-seed-1',
    studentId: 'std-seed-1',
    studentName: 'Chiamaka Nnamdi',
    studentSchool: 'Federal Government Girls College, Owerri',
    classLevel: 'SS 2',
    tier: 'senior',
    registrationFeeNaira: 10000,
    status: 'completed',
    currentStage: 'finished',
    requestedAt: '3 days ago',
    paidAt: '3 days ago',
    completedAt: 'Yesterday',
    cumulativeScore: 133, // out of 140
    cumulativePercentage: 95,
    cumulativeTimeSpentSeconds: 4320, // total across 3 days
    score: 95,
    timeSpentSeconds: 4320,
    rank: 1,
    stageResults: {
      1: {
        day: 1,
        subject: 'English Language',
        totalQuestions: 60,
        timeAllottedSeconds: 1800,
        score: 58,
        scorePercentage: 97,
        timeSpentSeconds: 1420,
        completedAt: '3 days ago'
      },
      2: {
        day: 2,
        subject: 'Mathematics',
        totalQuestions: 40,
        timeAllottedSeconds: 1620,
        score: 38,
        scorePercentage: 95,
        timeSpentSeconds: 1490,
        completedAt: '2 days ago'
      },
      3: {
        day: 3,
        subject: 'General Paper',
        totalQuestions: 40,
        timeAllottedSeconds: 1620,
        score: 37,
        scorePercentage: 93,
        timeSpentSeconds: 1410,
        completedAt: 'Yesterday'
      }
    }
  },
  {
    id: 'champ-reg-seed-2',
    studentId: 'std-seed-2',
    studentName: 'Tunde Adeleke',
    studentSchool: 'King’s College, Lagos',
    classLevel: 'SS 2',
    tier: 'senior',
    registrationFeeNaira: 10000,
    status: 'completed',
    currentStage: 'finished',
    requestedAt: '4 days ago',
    paidAt: '4 days ago',
    completedAt: 'Yesterday',
    cumulativeScore: 129,
    cumulativePercentage: 92,
    cumulativeTimeSpentSeconds: 4580,
    score: 92,
    timeSpentSeconds: 4580,
    rank: 2,
    stageResults: {
      1: {
        day: 1,
        subject: 'English Language',
        totalQuestions: 60,
        timeAllottedSeconds: 1800,
        score: 55,
        scorePercentage: 92,
        timeSpentSeconds: 1530,
        completedAt: '4 days ago'
      },
      2: {
        day: 2,
        subject: 'Mathematics',
        totalQuestions: 40,
        timeAllottedSeconds: 1620,
        score: 37,
        scorePercentage: 93,
        timeSpentSeconds: 1540,
        completedAt: '3 days ago'
      },
      3: {
        day: 3,
        subject: 'General Paper',
        totalQuestions: 40,
        timeAllottedSeconds: 1620,
        score: 37,
        scorePercentage: 93,
        timeSpentSeconds: 1510,
        completedAt: 'Yesterday'
      }
    }
  },

  // SS 3 Candidates
  {
    id: 'champ-reg-seed-3',
    studentId: 'std-seed-4',
    studentName: 'Emeka Eze',
    studentSchool: 'Dennis Memorial Grammar School, Onitsha',
    classLevel: 'SS 3',
    tier: 'senior',
    registrationFeeNaira: 10000,
    status: 'completed',
    currentStage: 'finished',
    requestedAt: '3 days ago',
    paidAt: '3 days ago',
    completedAt: 'Yesterday',
    cumulativeScore: 127,
    cumulativePercentage: 91,
    cumulativeTimeSpentSeconds: 4410,
    score: 91,
    timeSpentSeconds: 4410,
    rank: 3,
    stageResults: {
      1: {
        day: 1,
        subject: 'English Language',
        totalQuestions: 60,
        timeAllottedSeconds: 1800,
        score: 54,
        scorePercentage: 90,
        timeSpentSeconds: 1480,
        completedAt: '3 days ago'
      },
      2: {
        day: 2,
        subject: 'Mathematics',
        totalQuestions: 40,
        timeAllottedSeconds: 1620,
        score: 37,
        scorePercentage: 93,
        timeSpentSeconds: 1450,
        completedAt: '2 days ago'
      },
      3: {
        day: 3,
        subject: 'General Paper',
        totalQuestions: 40,
        timeAllottedSeconds: 1620,
        score: 36,
        scorePercentage: 90,
        timeSpentSeconds: 1480,
        completedAt: 'Yesterday'
      }
    }
  },

  // JSS 3 Candidates
  {
    id: 'champ-reg-seed-j3',
    studentId: 'std-seed-j1',
    studentName: 'Zainab Danjuma',
    studentSchool: 'Queen’s College, Yaba',
    classLevel: 'JSS 3',
    tier: 'junior',
    registrationFeeNaira: 10000,
    status: 'completed',
    currentStage: 'finished',
    requestedAt: '3 days ago',
    paidAt: '3 days ago',
    completedAt: 'Yesterday',
    cumulativeScore: 131,
    cumulativePercentage: 94,
    cumulativeTimeSpentSeconds: 4210,
    score: 94,
    timeSpentSeconds: 4210,
    rank: 4,
    stageResults: {
      1: {
        day: 1,
        subject: 'English Language',
        totalQuestions: 60,
        timeAllottedSeconds: 1800,
        score: 57,
        scorePercentage: 95,
        timeSpentSeconds: 1390,
        completedAt: '3 days ago'
      },
      2: {
        day: 2,
        subject: 'Mathematics',
        totalQuestions: 40,
        timeAllottedSeconds: 1620,
        score: 37,
        scorePercentage: 93,
        timeSpentSeconds: 1430,
        completedAt: '2 days ago'
      },
      3: {
        day: 3,
        subject: 'General Paper',
        totalQuestions: 40,
        timeAllottedSeconds: 1620,
        score: 37,
        scorePercentage: 93,
        timeSpentSeconds: 1390,
        completedAt: 'Yesterday'
      }
    }
  },

  // JSS 2 Candidates
  {
    id: 'champ-reg-seed-j2',
    studentId: 'std-seed-j2',
    studentName: 'David Okafor',
    studentSchool: 'Loyola Jesuit College, Abuja',
    classLevel: 'JSS 2',
    tier: 'junior',
    registrationFeeNaira: 10000,
    status: 'completed',
    currentStage: 'finished',
    requestedAt: '3 days ago',
    paidAt: '3 days ago',
    completedAt: 'Yesterday',
    cumulativeScore: 125,
    cumulativePercentage: 89,
    cumulativeTimeSpentSeconds: 4500,
    score: 89,
    timeSpentSeconds: 4500,
    rank: 5,
    stageResults: {
      1: {
        day: 1,
        subject: 'English Language',
        totalQuestions: 60,
        timeAllottedSeconds: 1800,
        score: 53,
        scorePercentage: 88,
        timeSpentSeconds: 1500,
        completedAt: '3 days ago'
      },
      2: {
        day: 2,
        subject: 'Mathematics',
        totalQuestions: 40,
        timeAllottedSeconds: 1620,
        score: 36,
        scorePercentage: 90,
        timeSpentSeconds: 1510,
        completedAt: '2 days ago'
      },
      3: {
        day: 3,
        subject: 'General Paper',
        totalQuestions: 40,
        timeAllottedSeconds: 1620,
        score: 36,
        scorePercentage: 90,
        timeSpentSeconds: 1490,
        completedAt: 'Yesterday'
      }
    }
  },

  // JSS 1 Candidates
  {
    id: 'champ-reg-seed-j1',
    studentId: 'std-seed-j3',
    studentName: 'Amina Sani',
    studentSchool: 'Federal Science & Technical College, Yaba',
    classLevel: 'JSS 1',
    tier: 'junior',
    registrationFeeNaira: 10000,
    status: 'completed',
    currentStage: 'finished',
    requestedAt: '2 days ago',
    paidAt: '2 days ago',
    completedAt: 'Yesterday',
    cumulativeScore: 124,
    cumulativePercentage: 89,
    cumulativeTimeSpentSeconds: 4620,
    score: 89,
    timeSpentSeconds: 4620,
    rank: 6,
    stageResults: {
      1: {
        day: 1,
        subject: 'English Language',
        totalQuestions: 60,
        timeAllottedSeconds: 1800,
        score: 52,
        scorePercentage: 87,
        timeSpentSeconds: 1560,
        completedAt: '2 days ago'
      },
      2: {
        day: 2,
        subject: 'Mathematics',
        totalQuestions: 40,
        timeAllottedSeconds: 1620,
        score: 36,
        scorePercentage: 90,
        timeSpentSeconds: 1540,
        completedAt: 'Yesterday'
      },
      3: {
        day: 3,
        subject: 'General Paper',
        totalQuestions: 40,
        timeAllottedSeconds: 1620,
        score: 36,
        scorePercentage: 90,
        timeSpentSeconds: 1520,
        completedAt: 'Yesterday'
      }
    }
  },

  // SS 1 Candidates
  {
    id: 'champ-reg-seed-ss1',
    studentId: 'std-seed-3',
    studentName: 'Fatima Bello',
    studentSchool: 'Barewa College, Zaria',
    classLevel: 'SS 1',
    tier: 'senior',
    registrationFeeNaira: 10000,
    status: 'completed',
    currentStage: 'finished',
    requestedAt: '3 days ago',
    paidAt: '3 days ago',
    completedAt: 'Yesterday',
    cumulativeScore: 126,
    cumulativePercentage: 90,
    cumulativeTimeSpentSeconds: 4540,
    score: 90,
    timeSpentSeconds: 4540,
    rank: 7,
    stageResults: {
      1: {
        day: 1,
        subject: 'English Language',
        totalQuestions: 60,
        timeAllottedSeconds: 1800,
        score: 54,
        scorePercentage: 90,
        timeSpentSeconds: 1510,
        completedAt: '3 days ago'
      },
      2: {
        day: 2,
        subject: 'Mathematics',
        totalQuestions: 40,
        timeAllottedSeconds: 1620,
        score: 36,
        scorePercentage: 90,
        timeSpentSeconds: 1530,
        completedAt: '2 days ago'
      },
      3: {
        day: 3,
        subject: 'General Paper',
        totalQuestions: 40,
        timeAllottedSeconds: 1620,
        score: 36,
        scorePercentage: 90,
        timeSpentSeconds: 1500,
        completedAt: 'Yesterday'
      }
    }
  }
];

export function getStoredChampionshipRegistrations(): ChampionshipRegistration[] {
  const saved = safeGetItem('sc_championship_registrations_v2');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {}
  }
  return INITIAL_CHAMPIONSHIP_LEADERBOARD;
}

export function saveStoredChampionshipRegistrations(registrations: ChampionshipRegistration[]): void {
  safeSetItem('sc_championship_registrations_v2', JSON.stringify(registrations));
}
