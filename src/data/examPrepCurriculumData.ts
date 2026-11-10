import { StudyCalendar, NigerianClassLevel, DiagnosticProfile, StudyDay } from '../types';

export const UNLOCK_FEE_NAIRA = 15000;
export const SINGLE_SUBJECT_EXAM_FEE_NAIRA = 1000;
export const INCLUDED_TUTOR_CREDITS_NAIRA = 4000;

export const SECONDARY_SUBJECT_CATALOG: Record<string, string[]> = {
  'Junior': [
    'Mathematics',
    'English Language',
    'Basic Science',
    'Basic Technology',
    'Social Studies',
    'Civic Education',
    'Agricultural Science',
    'Business Studies'
  ],
  'Science': [
    'General Mathematics',
    'English Language',
    'Physics',
    'Chemistry',
    'Biology',
    'Further Mathematics',
    'Agricultural Science',
    'Technical Drawing'
  ],
  'Non-Science': [
    'General Mathematics',
    'English Language',
    'Economics',
    'Government',
    'Literature in English',
    'Financial Accounting',
    'Commerce',
    'Christian Religious Studies'
  ]
};

// Generates high-yield default structured calendar matching NERDC & WAEC/JAMB/BECE specs
export function generateCuratedStudyCalendar(profile: DiagnosticProfile): StudyCalendar {
  const isJss = profile.classLevel.startsWith('JSS');
  const isSs3 = profile.classLevel === 'SS 3';
  const isJss3 = profile.classLevel === 'JSS 3';

  let examBadge = 'Continuous Assessment & Termly Promotion';
  if (isSs3) examBadge = 'WAEC (WASSCE) & JAMB UTME Master Track';
  else if (isJss3) examBadge = 'BECE Junior WAEC National Certificate';
  else if (isJss) examBadge = `${profile.classLevel} Promotion Exam Mastery`;
  else examBadge = `${profile.classLevel} Senior School Promotion Track`;

  const subjects = profile.stream === 'Junior'
    ? SECONDARY_SUBJECT_CATALOG['Junior']
    : (profile.stream === 'Science' ? SECONDARY_SUBJECT_CATALOG['Science'] : SECONDARY_SUBJECT_CATALOG['Non-Science']);

  const primaryWeak = profile.weakSubjects[0] || (isJss ? 'Mathematics' : 'General Mathematics');
  const secondaryWeak = profile.weakSubjects[1] || 'English Language';

  const days: StudyDay[] = [];

  // Define 14 comprehensive study days with morning/evening blocks
  const topicsPool = isSs3 ? [
    { sub: 'General Mathematics', topic: 'Algebraic Fractions, Simultaneous Equations & Word Problems', obj: ['Master elimination & substitution', 'Solve fractional algebraic expressions', 'Apply WAEC theory marking schemes'] },
    { sub: 'English Language', topic: 'Lexis & Structure, Concord and Oral English Stress Patterns', obj: ['Master subject-verb agreement rules', 'Differentiate syllable stress for WAEC/JAMB', 'Eliminate common grammatical pitfalls'] },
    { sub: 'Physics', topic: 'Equations of Motion, Projectiles & Equilibrium of Forces', obj: ['Apply kinematic equations with sign conventions', 'Resolve 2D coplanar vectors', 'Solve past WAEC projectile trajectories'] },
    { sub: 'Chemistry', topic: 'Stoichiometry, Mole Concept & Periodic Table Periodicity', obj: ['Calculate percentage purity and yield', 'Balance redox half-equations', 'Predict ionic radii trends across periods'] },
    { sub: 'Biology', topic: 'Cell Structure, Osmosis, Genetics & Mendelian Inheritance', obj: ['Draw and interpret monohybrid crosses', 'Understand plasmolysis and turgidity', 'Identify organelle ultrastructures'] },
    { sub: 'Economics', topic: 'Price Elasticity of Demand, Supply & Market Equilibrium', obj: ['Calculate point & arc elasticity coefficients', 'Graph price ceilings and price floors', 'Analyze shift vs movement along curve'] },
    { sub: 'Further Mathematics', topic: 'Calculus: Differentiation from First Principles & Maxima/Minima', obj: ['Differentiate polynomial functions', 'Determine turning points and points of inflexion', 'Solve rate-of-change word problems'] },
    { sub: 'Government', topic: 'Pre-Colonial Administration & Constitutional Developments in Nigeria', obj: ['Compare Hausa-Fulani, Yoruba, and Igbo systems', 'Analyze Clifford, Richards, and Macpherson constitutions', 'Highlight federal structure evolution'] }
  ] : isJss3 ? [
    { sub: 'Mathematics', topic: 'Linear Equations, Word Problems & Simultaneous Systems', obj: ['Solve single-variable linear equations', 'Translate real-life word statements into math', 'Master graphical solution methods'] },
    { sub: 'English Language', topic: 'Parts of Speech, Formal Letter Writing & Reading Comprehension', obj: ['Master noun and verb clauses', 'Structure standard BECE formal letters', 'Answer inference questions accurately'] },
    { sub: 'Basic Science', topic: 'Living and Non-Living Things, Human Digestive System & Nutrition', obj: ['Identify enzyme functions in digestion', 'Classify nutrients and deficiency symptoms', 'Analyze respiration mechanisms'] },
    { sub: 'Basic Technology', topic: 'Woodwork Tools, Isometric Projection & Electrical Circuits', obj: ['Identify cutting and measuring tools', 'Construct isometric 3D perspectives', 'Calculate Ohm law voltage and current'] },
    { sub: 'Social Studies', topic: 'National Values, Integrity, Corruption & Peaceful Co-Existence', obj: ['Examine civic duties and obligations', 'Understand consequences of examination malpractice', 'Discuss social conflict resolution'] }
  ] : isJss ? [
    { sub: 'Mathematics', topic: 'Fractions, Decimals, Percentages & Basic Number Bases', obj: ['Convert between base 10 and binary base 2', 'Simplify complex fractional expressions', 'Calculate percentage profit and loss'] },
    { sub: 'English Language', topic: 'Tenses (Present, Past, Future) and Paragraph Development', obj: ['Master irregular verb forms', 'Write unified topic sentences', 'Eliminate run-on sentence errors'] },
    { sub: 'Basic Science', topic: 'Matter, States of Matter, Physical vs Chemical Changes', obj: ['Differentiate elements, compounds, and mixtures', 'Illustrate particle theory in solids, liquids, gases', 'Identify reversible chemical reactions'] },
    { sub: 'Social Studies', topic: 'Family Institutions, Culture and Traditions in Nigeria', obj: ['Compare nuclear and extended family structures', 'Appreciate Nigerian cultural diversity', 'Examine positive cultural socialization'] }
  ] : [
    // SS 1 & SS 2 Normal Classes
    { sub: 'General Mathematics', topic: 'Indices, Logarithms & Quadratic Equations by Factorization', obj: ['Apply laws of indices and logarithms', 'Factorize quadratic expressions', 'Solve quadratic equations by completing the square'] },
    { sub: 'English Language', topic: 'Essay Structure, Descriptive Writing & Figurative Expressions', obj: ['Write cohesive multi-paragraph descriptive essays', 'Identify metaphors, similes, and personifications', 'Expand academic vocabulary'] },
    { sub: 'Physics', topic: 'Units, Dimensions, Speed, Velocity & Newton Laws of Motion', obj: ['Derive dimensional units for physical constants', 'Apply Newton three laws with friction', 'Calculate linear momentum conservation'] },
    { sub: 'Chemistry', topic: 'Atomic Structure, Chemical Bonding & Gas Laws (Boyle, Charles)', obj: ['Draw Bohr electron orbital configurations', 'Differentiate electrovalent and covalent bonds', 'Solve ideal gas equation P1V1/T1 = P2V2/T2'] },
    { sub: 'Biology', topic: 'Classification of Living Organisms & Plant Nutrition Photosynthesis', obj: ['State the five biological kingdoms', 'Explain light-dependent and dark photosynthesis phases', 'Describe leaf internal cross-section'] }
  ];

  for (let dayNum = 1; dayNum <= 14; dayNum++) {
    const isSprintDay = dayNum % 5 === 0;
    const isWeekendReview = dayNum % 7 === 0;

    let dayTitle = `Day ${dayNum}: Intensive Subject Mastery`;
    let focusTheme = `Consolidate key concepts and build exam pacing`;

    if (dayNum === 1) {
      dayTitle = `Day 1: Diagnostic Baseline & Core Review`;
      focusTheme = `Assess current speed and eliminate foundational errors in ${primaryWeak}`;
    } else if (isSprintDay) {
      dayTitle = `Day ${dayNum}: Timed Past-Question Sprint`;
      focusTheme = `Simulate actual WAEC/JAMB exam conditions with zero distractions`;
    } else if (isWeekendReview) {
      dayTitle = `Day ${dayNum}: Weak Area Consolidation & 1-on-1 Tutor Review`;
      focusTheme = `Review tricky exam traps and book specialized tutor support with your ₦4,000 credit`;
    }

    // Pick 2 focused topics for this day
    const topicA = topicsPool[(dayNum * 2 - 2) % topicsPool.length];
    const topicB = topicsPool[(dayNum * 2 - 1) % topicsPool.length];

    const block1 = {
      id: `day-${dayNum}-b1`,
      timeSlot: profile.preferredTimeOfDay === 'Morning' ? '08:00 AM - 09:30 AM' : '04:30 PM - 05:45 PM',
      subject: topicA.sub,
      topic: topicA.topic,
      keyObjectives: topicA.obj,
      cbtExamId: isSs3 ? 'jamb-maths-2024' : (isJss3 ? 'bece-maths-2024' : 'ss1-maths-term1'),
      cbtExamTitle: `${topicA.sub} Timed Drill`,
      drillQuestionCount: isSs3 ? 15 : 10,
      suggestedTutorSubject: topicA.sub,
      suggestedTutorTopic: topicA.topic.split('&')[0].trim(),
      isCompleted: false
    };

    const block2 = {
      id: `day-${dayNum}-b2`,
      timeSlot: profile.preferredTimeOfDay === 'Morning' ? '10:00 AM - 11:30 AM' : '06:15 PM - 07:30 PM',
      subject: topicB.sub,
      topic: topicB.topic,
      keyObjectives: topicB.obj,
      cbtExamId: isSs3 ? 'waec-english-2023' : (isJss3 ? 'bece-english-2024' : 'ss1-english-term1'),
      cbtExamTitle: `${topicB.sub} Speed Assessment`,
      drillQuestionCount: isSs3 ? 20 : 10,
      suggestedTutorSubject: topicB.sub,
      suggestedTutorTopic: topicB.topic.split('&')[0].trim(),
      isCompleted: false
    };

    days.push({
      dayNumber: dayNum,
      title: dayTitle,
      dateLabel: `Day ${dayNum}`,
      focusTheme,
      blocks: [block1, block2]
    });
  }

  return {
    id: `prep-plan-${profile.classLevel.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`,
    title: `${profile.classLevel} ${profile.targetExam} Success Blueprint`,
    targetExam: examBadge,
    classLevel: profile.classLevel,
    generatedAt: new Date().toISOString(),
    totalDays: days.length,
    days,
    strategyTips: [
      `Spend the first 10 minutes of every block active-recalling formulas before solving problems.`,
      `For calculations in Physics and Maths, always state the given variables and units first to secure WAEC step marks.`,
      `Use your included ₦4,000 Tutor Credits whenever you score below 60% on any practice drill.`,
      `Take past questions under strict timed conditions: 40 seconds per question for JAMB, 1.5 minutes per objective for WAEC.`
    ]
  };
}
