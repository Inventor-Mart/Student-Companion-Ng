import { ChampionshipPrize, ChampionshipRegistration, ChampionshipTier } from '../types';
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
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export const JUNIOR_CHAMPIONSHIP_QUESTIONS: ChampionshipExamQuestion[] = [
  {
    id: 'jq-1',
    subject: 'Mathematics',
    question: 'Solve for x: 3x - 7 = 2x + 8',
    options: ['x = 1', 'x = 15', 'x = 12', 'x = -1'],
    correctOptionIndex: 1,
    explanation: 'Subtract 2x from both sides: x - 7 = 8. Add 7 to both sides: x = 15.'
  },
  {
    id: 'jq-2',
    subject: 'Mathematics',
    question: 'Calculate the simple interest on ₦40,000 invested for 3 years at 5% per annum.',
    options: ['₦6,000', '₦4,500', '₦7,200', '₦5,000'],
    correctOptionIndex: 0,
    explanation: 'Simple Interest I = (P * R * T) / 100 = (40,000 * 5 * 3) / 100 = ₦6,000.'
  },
  {
    id: 'jq-3',
    subject: 'Basic Science',
    question: 'Which of the following blood vessels carries oxygenated blood from the lungs to the heart?',
    options: ['Pulmonary artery', 'Pulmonary vein', 'Vena cava', 'Aorta'],
    correctOptionIndex: 1,
    explanation: 'The pulmonary vein carries oxygen-rich blood from the lungs into the left atrium of the heart.'
  },
  {
    id: 'jq-4',
    subject: 'English Language',
    question: 'Identify the figure of speech in: "The sun danced across the Lagos lagoon."',
    options: ['Metaphor', 'Simile', 'Personification', 'Hyperbole'],
    correctOptionIndex: 2,
    explanation: 'Giving human characteristics (dancing) to non-human objects (the sun) is personification.'
  },
  {
    id: 'jq-5',
    subject: 'Basic Technology',
    question: 'Which of the following is a first-class lever?',
    options: ['Wheelbarrow', 'Pair of scissors', 'Nutcracker', 'Fishing rod'],
    correctOptionIndex: 1,
    explanation: 'In a first-class lever, the fulcrum is situated between the effort and the load, as in a pair of scissors or a crowbar.'
  },
  {
    id: 'jq-6',
    subject: 'Mathematics',
    question: 'Find the perimeter of a rectangle whose length is 14 cm and breadth is 9 cm.',
    options: ['46 cm', '23 cm', '126 cm²', '52 cm'],
    correctOptionIndex: 0,
    explanation: 'Perimeter = 2 * (length + breadth) = 2 * (14 + 9) = 2 * 23 = 46 cm.'
  },
  {
    id: 'jq-7',
    subject: 'Basic Science',
    question: 'What is the chemical symbol for Potassium?',
    options: ['P', 'Po', 'K', 'Pt'],
    correctOptionIndex: 2,
    explanation: 'Potassium has the chemical symbol K, derived from its Neo-Latin name Kalium.'
  },
  {
    id: 'jq-8',
    subject: 'English Language',
    question: 'Choose the correct preposition: "The principal congratulated the students _____ their excellent BECE results."',
    options: ['for', 'on', 'with', 'at'],
    correctOptionIndex: 1,
    explanation: 'The correct English idiom is "congratulate someone ON something".'
  },
  {
    id: 'jq-9',
    subject: 'Mathematics',
    question: 'What is the value of √144 + √81 - √25?',
    options: ['16', '18', '21', '15'],
    correctOptionIndex: 0,
    explanation: '√144 = 12, √81 = 9, √25 = 5. Therefore: 12 + 9 - 5 = 16.'
  },
  {
    id: 'jq-10',
    subject: 'General Reasoning',
    question: 'Nigeria gained independence on October 1st of which year?',
    options: ['1957', '1960', '1963', '1979'],
    correctOptionIndex: 1,
    explanation: 'Nigeria gained sovereignty from British rule on October 1st, 1960.'
  }
];

export const SENIOR_CHAMPIONSHIP_QUESTIONS: ChampionshipExamQuestion[] = [
  {
    id: 'sq-1',
    subject: 'Mathematics',
    question: 'If log₁₀ 2 = 0.3010 and log₁₀ 3 = 0.4771, calculate the value of log₁₀ 18.',
    options: ['1.2552', '1.0791', '0.7781', '1.3010'],
    correctOptionIndex: 0,
    explanation: '18 = 2 * 3² = 2 * 9. log₁₀ 18 = log₁₀ 2 + 2*log₁₀ 3 = 0.3010 + 2(0.4771) = 0.3010 + 0.9542 = 1.2552.'
  },
  {
    id: 'sq-2',
    subject: 'Physics',
    question: 'A car accelerates uniformly from rest at 2.5 m/s² for 8 seconds. What total distance does it cover?',
    options: ['40 m', '80 m', '100 m', '160 m'],
    correctOptionIndex: 1,
    explanation: 'Distance s = ut + ½at². Since u = 0: s = ½ * 2.5 * 8² = ½ * 2.5 * 64 = 80 m.'
  },
  {
    id: 'sq-3',
    subject: 'Chemistry',
    question: 'What is the oxidation number of sulfur in H₂SO₄?',
    options: ['+4', '+2', '+6', '-2'],
    correctOptionIndex: 2,
    explanation: '2(+1) + S + 4(-2) = 0 => 2 + S - 8 = 0 => S - 6 = 0 => S = +6.'
  },
  {
    id: 'sq-4',
    subject: 'Biology',
    question: 'Which organelle is responsible for cellular respiration and ATP energy synthesis?',
    options: ['Ribosome', 'Mitochondria', 'Golgi apparatus', 'Lysosome'],
    correctOptionIndex: 1,
    explanation: 'Mitochondria are the powerhouses of the eukaryotic cell where ATP is generated via oxidative phosphorylation.'
  },
  {
    id: 'sq-5',
    subject: 'English Language',
    question: 'Select the option nearest in meaning to the underlined word: "The teacher gave an EPHEMERAL speech."',
    options: ['Lengthy', 'Short-lived', 'Boring', 'Inspiring'],
    correctOptionIndex: 1,
    explanation: 'Ephemeral means lasting for a very short time; fleeting or short-lived.'
  },
  {
    id: 'sq-6',
    subject: 'Economics',
    question: 'When the price of a commodity rises from ₦100 to ₦120 and quantity demanded falls from 50 to 45 units, what is the elasticity of demand?',
    options: ['0.5 (Inelastic)', '1.5 (Elastic)', '1.0 (Unitary)', '2.0 (Elastic)'],
    correctOptionIndex: 0,
    explanation: '% Change in Qty = (5/50)*100 = 10%. % Change in Price = (20/100)*100 = 20%. Ed = 10% / 20% = 0.5 (Price Inelastic).'
  },
  {
    id: 'sq-7',
    subject: 'Mathematics',
    question: 'Evaluate ∫ (3x² + 4x - 5) dx from x = 0 to x = 2.',
    options: ['10', '6', '8', '12'],
    correctOptionIndex: 1,
    explanation: 'Antiderivative is x³ + 2x² - 5x. At x = 2: (8 + 8 - 10) = 6. At x = 0: 0. Result = 6 - 0 = 6.'
  },
  {
    id: 'sq-8',
    subject: 'Physics',
    question: 'A transformer has 500 primary turns and 100 secondary turns. If the input AC voltage is 240V, what is the output voltage?',
    options: ['1200V', '48V', '24V', '60V'],
    correctOptionIndex: 1,
    explanation: 'Vs / Vp = Ns / Np => Vs / 240 = 100 / 500 = 0.2 => Vs = 240 * 0.2 = 48V (Step-down transformer).'
  },
  {
    id: 'sq-9',
    subject: 'Chemistry',
    question: 'Which of the following compounds exhibits hydrogen bonding in its liquid state?',
    options: ['CH₄', 'H₂S', 'C₂H₅OH', 'HCl'],
    correctOptionIndex: 2,
    explanation: 'Ethanol (C₂H₅OH) contains an -OH hydroxyl group where hydrogen is covalently bonded to oxygen, forming strong intermolecular hydrogen bonds.'
  },
  {
    id: 'sq-10',
    subject: 'General Reasoning',
    question: 'What is the capital city of Nigeria, and in which geopolitical zone is it located?',
    options: ['Lagos (South-West)', 'Abuja (North-Central)', 'Kaduna (North-West)', 'Port Harcourt (South-South)'],
    correctOptionIndex: 1,
    explanation: 'Abuja is Nigeria\'s Federal Capital Territory (FCT), situated in the North-Central geopolitical zone.'
  }
];

export const INITIAL_CHAMPIONSHIP_LEADERBOARD: ChampionshipRegistration[] = [
  // Senior Tier
  {
    id: 'reg-demo-1',
    studentId: 'std-seed-1',
    studentName: 'Chiamaka Nnamdi',
    studentSchool: 'Federal Government Girls College, Owerri',
    classLevel: 'SS 2',
    tier: 'senior',
    registrationFeeNaira: 10000,
    status: 'completed',
    requestedAt: '2 days ago',
    paidAt: '2 days ago',
    score: 96,
    totalQuestions: 10,
    timeSpentSeconds: 412,
    completedAt: 'Yesterday',
    rank: 1
  },
  {
    id: 'reg-demo-2',
    studentId: 'std-seed-4',
    studentName: 'Emeka Eze',
    studentSchool: 'Dennis Memorial Grammar School, Onitsha',
    classLevel: 'SS 3',
    tier: 'senior',
    registrationFeeNaira: 10000,
    status: 'completed',
    requestedAt: '3 days ago',
    paidAt: '3 days ago',
    score: 92,
    totalQuestions: 10,
    timeSpentSeconds: 435,
    completedAt: 'Yesterday',
    rank: 2
  },
  {
    id: 'reg-demo-3',
    studentId: 'std-seed-2',
    studentName: 'Tunde Adeleke',
    studentSchool: 'King’s College, Lagos',
    classLevel: 'SS 2',
    tier: 'senior',
    registrationFeeNaira: 10000,
    status: 'completed',
    requestedAt: '4 days ago',
    paidAt: '4 days ago',
    score: 88,
    totalQuestions: 10,
    timeSpentSeconds: 480,
    completedAt: '2 days ago',
    rank: 3
  },
  {
    id: 'reg-demo-4',
    studentId: 'std-seed-3',
    studentName: 'Fatima Bello',
    studentSchool: 'Barewa College, Zaria',
    classLevel: 'SS 1',
    tier: 'senior',
    registrationFeeNaira: 10000,
    status: 'paid',
    requestedAt: '1 day ago',
    paidAt: '1 day ago'
  },

  // Junior Tier
  {
    id: 'reg-demo-j1',
    studentId: 'std-seed-j1',
    studentName: 'Zainab Danjuma',
    studentSchool: 'Queen’s College, Yaba',
    classLevel: 'JSS 3',
    tier: 'junior',
    registrationFeeNaira: 10000,
    status: 'completed',
    requestedAt: '3 days ago',
    paidAt: '3 days ago',
    score: 95,
    totalQuestions: 10,
    timeSpentSeconds: 380,
    completedAt: 'Yesterday',
    rank: 1
  },
  {
    id: 'reg-demo-j2',
    studentId: 'std-seed-j2',
    studentName: 'David Okafor',
    studentSchool: 'Loyola Jesuit College, Abuja',
    classLevel: 'JSS 3',
    tier: 'junior',
    registrationFeeNaira: 10000,
    status: 'completed',
    requestedAt: '3 days ago',
    paidAt: '3 days ago',
    score: 91,
    totalQuestions: 10,
    timeSpentSeconds: 410,
    completedAt: 'Yesterday',
    rank: 2
  },
  {
    id: 'reg-demo-j3',
    studentId: 'std-seed-j3',
    studentName: 'Amina Sani',
    studentSchool: 'Federal Science & Technical College, Yaba',
    classLevel: 'JSS 2',
    tier: 'junior',
    registrationFeeNaira: 10000,
    status: 'completed',
    requestedAt: '2 days ago',
    paidAt: '2 days ago',
    score: 87,
    totalQuestions: 10,
    timeSpentSeconds: 460,
    completedAt: 'Yesterday',
    rank: 3
  }
];

export function getStoredChampionshipRegistrations(): ChampionshipRegistration[] {
  const saved = safeGetItem('sc_championship_registrations');
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
  safeSetItem('sc_championship_registrations', JSON.stringify(registrations));
}
