import { Tutor } from '../types';

export const VETTED_NIGERIAN_TUTORS: Tutor[] = [
  {
    id: 'tutor-adewale-math',
    name: 'Engr. Adewale Bakare',
    tagline: 'WAEC & JAMB Mathematics/Physics Specialist (10+ Yrs)',
    subjects: ['Mathematics', 'Further Mathematics', 'Physics'],
    rating: 4.95,
    reviewCount: 84,
    hourlyRateNaira: 4500,
    location: 'Ikeja / Maryland',
    state: 'Lagos',
    isNinVerified: true,
    education: 'B.Eng Mechanical Engineering (Unilag, First Class Hons)',
    avatarUrl: '',
    bio: 'Former Olympiad coach with over a decade experience preparing secondary school candidates for Distinction grades in WAEC and 300+ in JAMB UTME. Patient, step-by-step problem solver specializing in interactive digital whiteboard drills.',
    availableDays: ['Mondays', 'Wednesdays', 'Saturdays'],
    lat: 6.5965,
    lng: 3.3421,
    experienceYears: 11,
    degrees: [
      'B.Eng Mechanical Engineering, University of Lagos (First Class Honours, GPA 4.88/5.00)',
      'National Mathematics Olympiad Gold Mentor (Lagos State Chapter)'
    ],
    certifications: [
      'Registered Engineer (COREN Reg. No. R.52841)',
      'TRCN Certified Secondary Educator (Teachers Registration Council of Nigeria)',
      'Verified National ID: NIN Verified 8412-XXXX-9901'
    ],
    examSpecializations: [
      'WAEC/WASSCE General Mathematics (Target: A1 Distinction)',
      'JAMB UTME Mathematics & Physics Speed Drills (Target: 85+ / 100)',
      'Further Mathematics: Calculus, Vectors & Mechanics',
      'Cowbellpedia Secondary School Mathematics TV Quiz Prep'
    ],
    curriculumHighlights: [
      'Differentiation & Integration from First Principles',
      'Trigonometric Identities & 3D Bearing Calculations',
      'Newtonian Mechanics & Projectile Motion Trajectories',
      'Simultaneous & Quadratic Equation Graphic Visualizations'
    ],
    totalLessonsDelivered: 284,
    completionRate: 99.4,
    timetable: [
      { id: 'adw-1', day: 'Monday', time: '10:00 AM - 12:00 PM', period: 'Morning', isAvailable: true },
      { id: 'adw-2', day: 'Monday', time: '04:00 PM - 06:00 PM', period: 'Afternoon', isAvailable: true },
      { id: 'adw-3', day: 'Wednesday', time: '04:00 PM - 06:00 PM', period: 'Afternoon', isAvailable: true },
      { id: 'adw-4', day: 'Wednesday', time: '06:30 PM - 08:30 PM', period: 'Evening', isAvailable: false },
      { id: 'adw-5', day: 'Saturday', time: '09:00 AM - 11:00 AM', period: 'Morning', isAvailable: true },
      { id: 'adw-6', day: 'Saturday', time: '02:00 PM - 04:00 PM', period: 'Afternoon', isAvailable: true },
      { id: 'adw-7', day: 'Sunday', time: '03:00 PM - 05:00 PM', period: 'Afternoon', isAvailable: false }
    ],
    testimonials: [
      {
        id: 'rev-1',
        studentName: 'Chukwudi N.',
        school: "King's College, Lagos",
        gradeOutcome: 'WAEC: A1 in Mathematics & Further Maths',
        comment: 'Engr. Adewale used the whiteboard to break down circle geometry and calculus proofs in a way my school teacher never did. Jumped from C4 to A1!',
        date: '3 weeks ago',
        rating: 5
      },
      {
        id: 'rev-2',
        studentName: 'Zainab A.',
        school: "Queens College, Yaba",
        gradeOutcome: 'JAMB UTME: 318 Aggregate Score',
        comment: 'His timed shortcuts for JAMB physics kinematics and circuits saved me over 15 minutes in the examination hall. Highly recommended for serious candidates.',
        date: '1 month ago',
        rating: 5
      }
    ]
  },
  {
    id: 'tutor-amara-biology',
    name: 'Dr. Amarachi Okonkwo',
    tagline: 'Medical Doctor & High-Yield Biology/Chemistry Tutor',
    subjects: ['Biology', 'Chemistry', 'Basic Science'],
    rating: 4.98,
    reviewCount: 62,
    hourlyRateNaira: 5000,
    location: 'Garki & Wuse II',
    state: 'Abuja (FCT)',
    isNinVerified: true,
    education: 'MBBS (University of Nigeria, Nsukka)',
    avatarUrl: '',
    bio: 'Passionate medical doctor dedicated to simplifying complex biological systems, genetics, metabolic pathways, and organic chemistry mechanisms for SS1-SS3 candidates and university pre-med aspirants.',
    availableDays: ['Tuesdays', 'Thursdays', 'Sundays'],
    lat: 9.0765,
    lng: 7.4893,
    experienceYears: 7,
    degrees: [
      'Bachelor of Medicine, Bachelor of Surgery (MBBS), University of Nigeria Nsukka (College of Medicine)',
      'Distinction in Human Physiology & Medical Biochemistry'
    ],
    certifications: [
      'Medical & Dental Council of Nigeria (MDCN Reg. Practitioner)',
      'WAEC Senior Secondary STEM Mentor Certification',
      'Verified National ID: NIN Verified 1920-XXXX-4421'
    ],
    examSpecializations: [
      'JAMB UTME Medicine & Surgery Track (Target: 320+ aggregate)',
      'WAEC/WASSCE Biology Theory & Practical Diagrams',
      'Chemistry: Organic Reaction Mechanisms & Stoichiometry',
      'Post-UTME Screening Drills for Top Federal Universities'
    ],
    curriculumHighlights: [
      'Genetics: Monohybrid & Dihybrid Crosses (Mendelian Laws)',
      'Human Circulatory & Respiratory Systems Interactive Flow',
      'Organic Chemistry: Alkanes to Esters & Polymerization',
      'Electrolysis & Chemical Equilibrium Calculations'
    ],
    totalLessonsDelivered: 198,
    completionRate: 100,
    timetable: [
      { id: 'amr-1', day: 'Tuesday', time: '04:00 PM - 06:00 PM', period: 'Afternoon', isAvailable: true },
      { id: 'amr-2', day: 'Tuesday', time: '06:30 PM - 08:30 PM', period: 'Evening', isAvailable: true },
      { id: 'amr-3', day: 'Thursday', time: '04:00 PM - 06:00 PM', period: 'Afternoon', isAvailable: true },
      { id: 'amr-4', day: 'Saturday', time: '11:00 AM - 01:00 PM', period: 'Morning', isAvailable: false },
      { id: 'amr-5', day: 'Sunday', time: '02:00 PM - 04:00 PM', period: 'Afternoon', isAvailable: true }
    ],
    testimonials: [
      {
        id: 'rev-3',
        studentName: 'Somtochukwu O.',
        school: 'Loyola Jesuit College, Abuja',
        gradeOutcome: 'JAMB: 332 (UNILAG Medicine Admit)',
        comment: 'Dr. Amarachi made organic chemistry mechanisms click instantly on the digital board. Her notes are better than any textbook in Nigeria.',
        date: '2 weeks ago',
        rating: 5
      }
    ]
  },
  {
    id: 'tutor-folake-arts',
    name: 'Mrs. Folashade Adeleke',
    tagline: 'WAEC Examiner & Literature/English Language Coach',
    subjects: ['English Language', 'Literature-in-English', 'Civic Education'],
    rating: 4.92,
    reviewCount: 110,
    hourlyRateNaira: 4000,
    location: 'Bodija / UI Campus',
    state: 'Ibadan, Oyo State',
    isNinVerified: true,
    education: 'M.A. English Studies (University of Ibadan)',
    avatarUrl: '',
    bio: 'Certified WAEC and NECO Paper 3 (Test of Orals) examiner. Specializes in essay writing composition, grammatical concord, and African/Non-African prose and poetry analysis.',
    availableDays: ['Mondays', 'Tuesdays', 'Fridays'],
    lat: 7.4244,
    lng: 3.9056,
    experienceYears: 14,
    degrees: [
      'Master of Arts (M.A.) English Studies, University of Ibadan',
      'B.A. (Ed) English Language, Obafemi Awolowo University (OAU Ile-Ife, Second Class Upper)'
    ],
    certifications: [
      'Official Accredited WAEC Chief Examiner (English Paper 1 & 3)',
      'TRCN Certified Master Educator',
      'Verified National ID: NIN Verified 7719-XXXX-3382'
    ],
    examSpecializations: [
      'WAEC WASSCE English Language Composition & Summary Mastery',
      'Test of Orals: Vowel Sounds, Consonants, Rhymes & Stress Patterns',
      'WAEC Prescribed African & Non-African Literature Texts Analysis',
      'JAMB Use of English Lexis and Structure Accuracy Drills'
    ],
    curriculumHighlights: [
      'Formal & Informal Letter Writing Marking Schemes',
      'Grammatical Concord, Clauses & Structural Transformations',
      'Poetry Explanations: Metaphors, Alliteration & Thematic Analysis',
      'Reading Comprehension & Precision Summary Techniques'
    ],
    totalLessonsDelivered: 412,
    completionRate: 98.9,
    timetable: [
      { id: 'flk-1', day: 'Monday', time: '04:30 PM - 06:30 PM', period: 'Afternoon', isAvailable: true },
      { id: 'flk-2', day: 'Tuesday', time: '04:30 PM - 06:30 PM', period: 'Afternoon', isAvailable: true },
      { id: 'flk-3', day: 'Friday', time: '03:00 PM - 05:00 PM', period: 'Afternoon', isAvailable: true },
      { id: 'flk-4', day: 'Saturday', time: '10:00 AM - 12:00 PM', period: 'Morning', isAvailable: true }
    ],
    testimonials: [
      {
        id: 'rev-4',
        studentName: 'Toluwalase B.',
        school: 'International School Ibadan (ISI)',
        gradeOutcome: 'WAEC: A1 in English & Literature',
        comment: 'Mrs. Adeleke taught me the exact rubric WAEC examiners look for in the essay and summary section. My score jumped dramatically.',
        date: '1 month ago',
        rating: 5
      }
    ]
  },
  {
    id: 'tutor-chidi-commercial',
    name: 'Chidiebere Eze, ACA',
    tagline: 'Chartered Accountant & Economics/Commerce Instructor',
    subjects: ['Economics', 'Commerce', 'Financial Accounting'],
    rating: 4.89,
    reviewCount: 47,
    hourlyRateNaira: 4800,
    location: 'GRA Phase 2',
    state: 'Port Harcourt, Rivers',
    isNinVerified: true,
    education: 'B.Sc Economics (Covenant University), Associate ICAN',
    avatarUrl: '',
    bio: 'Bridging classroom theory with real-world financial literacy. Helping senior secondary commercial students conquer quantitative economics, national income accounting, and double-entry book-keeping.',
    availableDays: ['Wednesdays', 'Saturdays', 'Sundays'],
    lat: 4.8156,
    lng: 7.0099,
    experienceYears: 8,
    degrees: [
      'B.Sc Economics, Covenant University (First Class Honours)',
      'Associate Chartered Accountant (ACA), Institute of Chartered Accountants of Nigeria'
    ],
    certifications: [
      'Associate Member, ICAN Nigeria',
      'TRCN Certified Economics Instructor',
      'Verified National ID: NIN Verified 6201-XXXX-1149'
    ],
    examSpecializations: [
      'WAEC/NECO Financial Accounting: Balance Sheets & Ledger Balancing',
      'JAMB Economics Quantitative Problems (Elasticity, Utility, Cost Curves)',
      'Commerce: Banking Systems, Stock Exchange & Foreign Trade',
      'Business Mathematics & Commercial Secondary Drills'
    ],
    curriculumHighlights: [
      'National Income Determination & GDP/GNP Multipliers',
      'Double Entry System, Cash Books & Bank Reconciliation',
      'Price Elasticity of Demand & Market Equilibrium Graphs',
      'Partnership Accounts & Goodwill Treatment'
    ],
    totalLessonsDelivered: 165,
    completionRate: 99.1,
    timetable: [
      { id: 'chd-1', day: 'Wednesday', time: '05:00 PM - 07:00 PM', period: 'Evening', isAvailable: true },
      { id: 'chd-2', day: 'Saturday', time: '01:00 PM - 03:00 PM', period: 'Afternoon', isAvailable: true },
      { id: 'chd-3', day: 'Saturday', time: '04:00 PM - 06:00 PM', period: 'Afternoon', isAvailable: true },
      { id: 'chd-4', day: 'Sunday', time: '03:00 PM - 05:00 PM', period: 'Afternoon', isAvailable: false }
    ],
    testimonials: [
      {
        id: 'rev-5',
        studentName: 'Ifeanyi U.',
        school: 'Federal Government College, Port Harcourt',
        gradeOutcome: 'WAEC: A1 in Financial Accounting & Economics',
        comment: 'Accountancy used to be a nightmare until Mr. Chidiebere showed me how the debit-credit ledger equations link together. Everything balances now!',
        date: '2 months ago',
        rating: 5
      }
    ]
  },
  {
    id: 'tutor-amina-kano',
    name: 'Malama Amina Danjuma',
    tagline: 'STEM & Mathematics Mentor (Bayero University)',
    subjects: ['Mathematics', 'Further Mathematics', 'Basic Science'],
    rating: 4.94,
    reviewCount: 53,
    hourlyRateNaira: 3800,
    location: 'Nassarawa GRA',
    state: 'Kano State',
    isNinVerified: true,
    education: 'B.Sc Ed Mathematics (BUK), M.Ed (ABU Zaria)',
    avatarUrl: '',
    bio: 'Dedicated mathematics coach with strong background in bilingual and contextualized STEM instruction. Helping secondary students conquer algebra, geometry, and National Olympiads.',
    availableDays: ['Mondays', 'Thursdays', 'Saturdays'],
    lat: 12.0022,
    lng: 8.5920,
    experienceYears: 9,
    degrees: [
      'B.Sc (Ed) Mathematics, Bayero University Kano (First Class)',
      'Master of Education (M.Ed) Curriculum & Instruction, Ahmadu Bello University Zaria'
    ],
    certifications: [
      'TRCN Certified Specialist Teacher',
      'Northern STEM Women Educators Network Lead',
      'Verified National ID: NIN Verified 3381-XXXX-0912'
    ],
    examSpecializations: [
      'Junior Secondary BECE Basic Science & Mathematics',
      'Senior WAEC General Mathematics: Algebra & Mensuration',
      'JAMB UTME Mathematics Rapid Time-Attack Drills',
      'Olympiad Mathematics for Secondary School Girls'
    ],
    curriculumHighlights: [
      'Quadratic Graphs, Parabola Roots & Vertex Calculations',
      'Circle Theorems: Tangents, Chords & Cyclic Quadrilaterals',
      'Trigonometric Ratios & Angles of Elevation / Depression',
      'Probability, Permutations & Combinations'
    ],
    totalLessonsDelivered: 230,
    completionRate: 100,
    timetable: [
      { id: 'amn-1', day: 'Monday', time: '04:00 PM - 06:00 PM', period: 'Afternoon', isAvailable: true },
      { id: 'amn-2', day: 'Thursday', time: '04:00 PM - 06:00 PM', period: 'Afternoon', isAvailable: true },
      { id: 'amn-3', day: 'Saturday', time: '10:00 AM - 12:00 PM', period: 'Morning', isAvailable: true },
      { id: 'amn-4', day: 'Saturday', time: '02:00 PM - 04:00 PM', period: 'Afternoon', isAvailable: false }
    ],
    testimonials: [
      {
        id: 'rev-6',
        studentName: 'Fatima M.',
        school: 'Federal Government Girls College, Bakori',
        gradeOutcome: 'WAEC: A1 in Mathematics',
        comment: 'Malama Amina is extremely patient. She never rushes and uses the online whiteboard to draw every theorem until you master it completely.',
        date: '3 weeks ago',
        rating: 5
      }
    ]
  },
  {
    id: 'tutor-nnamdi-enugu',
    name: 'Nnamdi Obi, M.Sc',
    tagline: 'Physics & Engineering Mechanics Tutor (UNN Alum)',
    subjects: ['Physics', 'Chemistry', 'Technical Drawing'],
    rating: 4.96,
    reviewCount: 71,
    hourlyRateNaira: 4200,
    location: 'Independence Layout',
    state: 'Enugu State',
    isNinVerified: true,
    education: 'M.Sc Applied Physics (University of Nigeria Nsukka)',
    avatarUrl: '',
    bio: 'Specialist in electricity, electromagnetism, and atomic physics. Known for interactive laboratory-grade simulations, circuit problem solving, and high-velocity JAMB CBT problem shortcuts.',
    availableDays: ['Tuesdays', 'Wednesdays', 'Saturdays'],
    lat: 6.4413,
    lng: 7.5029,
    experienceYears: 10,
    degrees: [
      'Master of Science (M.Sc) Applied Physics, University of Nigeria Nsukka (Distinction)',
      'B.Sc Pure & Industrial Physics, UNN (Second Class Upper)'
    ],
    certifications: [
      'Nigerian Institute of Physics (NIP Member)',
      'TRCN Certified Physics Master',
      'Verified National ID: NIN Verified 5521-XXXX-6710'
    ],
    examSpecializations: [
      'WAEC/NECO Physics Alternative to Practical Drills',
      'JAMB UTME Physics: 90+ Score Formula Drills',
      'Technical Drawing: Geometric Constructions & Isometric Projections',
      'Engineering Science Foundations for Pre-Degree Aspirants'
    ],
    curriculumHighlights: [
      'Electric Circuits: Kirchhoff Laws & Resistance Networks',
      'Wave Motion: Resonance, Optics, Refraction & Lenses',
      'Atomic Physics: Photoelectric Effect & Radioactive Half-Life',
      'Thermodynamics: Heat Capacity & Gas Laws Calculations'
    ],
    totalLessonsDelivered: 275,
    completionRate: 99.6,
    timetable: [
      { id: 'nmd-1', day: 'Tuesday', time: '04:30 PM - 06:30 PM', period: 'Afternoon', isAvailable: true },
      { id: 'nmd-2', day: 'Wednesday', time: '04:30 PM - 06:30 PM', period: 'Afternoon', isAvailable: true },
      { id: 'nmd-3', day: 'Saturday', time: '09:00 AM - 11:00 AM', period: 'Morning', isAvailable: true },
      { id: 'nmd-4', day: 'Saturday', time: '03:00 PM - 05:00 PM', period: 'Afternoon', isAvailable: true }
    ],
    testimonials: [
      {
        id: 'rev-7',
        studentName: 'Obinna E.',
        school: 'College of the Immaculate Conception (CIC), Enugu',
        gradeOutcome: 'JAMB: 92/100 in Physics',
        comment: 'Mr. Nnamdi drew the ray optics and circuit diagrams live on screen. His shortcuts for electric fields solved problems in 30 seconds.',
        date: '2 weeks ago',
        rating: 5
      }
    ]
  }
];
