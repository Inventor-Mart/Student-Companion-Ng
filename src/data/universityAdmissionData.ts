import { UniversityAdmissionInfo } from '../types';

export const NIGERIAN_UNIVERSITIES_DATABASE: UniversityAdmissionInfo[] = [
  {
    id: 'unilag',
    name: 'University of Lagos',
    shortName: 'UNILAG',
    type: 'Federal',
    state: 'Lagos',
    city: 'Akoka, Yaba',
    establishedYear: 1962,
    generalCutOff: 200,
    screeningMethod: 'Post-UTME CBT Exam',
    portalUrl: 'https://admissions.unilag.edu.ng',
    overview: 'Nigeria’s premier urban institution. Highly competitive with strict faculty aggregate cutoffs. Post-UTME is a 30-question CBT test in 30 minutes.',
    courses: [
      {
        name: 'Medicine and Surgery',
        faculty: 'College of Medicine',
        meritCutOff: 84.5,
        catchmentCutOff: 81.25,
        jambSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
        oLevelReqs: '5 credits in English, Maths, Biology, Chemistry, Physics in one sitting only',
        postUtmeFormat: '30 questions (Maths, English, General Paper) in 30 mins',
        competitiveness: 'Extremely High',
        tips: 'Target 300+ in JAMB and at least 26/30 in UNILAG Post-UTME. College of Medicine strictly rejects two sittings.'
      },
      {
        name: 'Law',
        faculty: 'Faculty of Law',
        meritCutOff: 81.75,
        catchmentCutOff: 78.5,
        jambSubjects: ['English Language', 'Literature in English', 'Government', 'CRS / IRS / Economics'],
        oLevelReqs: '5 credits including English Language, Mathematics, Literature in English and at least two Arts/Social Science subjects',
        postUtmeFormat: '30 questions (English, Current Affairs, Logic/Maths) in 30 mins',
        competitiveness: 'Extremely High',
        tips: 'Literature in English is compulsory in both JAMB and O\'Level. High score in English and Government gives an advantage.'
      },
      {
        name: 'Computer Science',
        faculty: 'Faculty of Science',
        meritCutOff: 79.25,
        catchmentCutOff: 75.0,
        jambSubjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry'],
        oLevelReqs: '5 credits including English Language, Mathematics, Physics, Chemistry, and Further Maths/Biology',
        postUtmeFormat: '30 questions (Maths, English, Science) in 30 mins',
        competitiveness: 'Extremely High',
        tips: 'Highest cutoff in Faculty of Science. Master Mathematics and Physics past questions.'
      },
      {
        name: 'Mechanical Engineering',
        faculty: 'Faculty of Engineering',
        meritCutOff: 80.5,
        catchmentCutOff: 76.8,
        jambSubjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry'],
        oLevelReqs: '5 credits in English, Maths, Physics, Chemistry, and Further Maths/Technical Drawing',
        postUtmeFormat: '30 questions (Maths, English, Physics/Chemistry) in 30 mins',
        competitiveness: 'High',
        tips: 'Engineering Post-UTME features quantitative reasoning. Speed is crucial.'
      },
      {
        name: 'Accounting',
        faculty: 'Management Sciences',
        meritCutOff: 78.0,
        catchmentCutOff: 73.5,
        jambSubjects: ['English Language', 'Mathematics', 'Economics', 'Financial Accounting / Commerce / Government'],
        oLevelReqs: '5 credits in English Language, Mathematics, Economics, and two other commercial subjects',
        postUtmeFormat: '30 questions (English, Maths, General Knowledge)',
        competitiveness: 'High',
        tips: 'Economics and Mathematics are strictly evaluated. Ensure strong JAMB combination.'
      },
      {
        name: 'Nursing Science',
        faculty: 'College of Medicine',
        meritCutOff: 80.25,
        catchmentCutOff: 77.0,
        jambSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
        oLevelReqs: '5 credits in English, Maths, Biology, Chemistry, Physics in one sitting only',
        postUtmeFormat: '30 questions in 30 mins',
        competitiveness: 'Extremely High',
        tips: 'One of the fastest rising cutoffs. High performance in Biology and Chemistry is mandatory.'
      }
    ]
  },
  {
    id: 'ui',
    name: 'University of Ibadan',
    shortName: 'UI',
    type: 'Federal',
    state: 'Oyo',
    city: 'Ibadan',
    establishedYear: 1948,
    generalCutOff: 200,
    screeningMethod: 'Post-UTME CBT Exam',
    portalUrl: 'https://admissions.ui.edu.ng',
    overview: 'Nigeria’s oldest degree-awarding university. Famous for academic rigor and medicine. UI requires a minimum of 50% in Post-UTME CBT for admission consideration.',
    courses: [
      {
        name: 'Medicine and Surgery',
        faculty: 'College of Medicine',
        meritCutOff: 82.5,
        catchmentCutOff: 79.0,
        jambSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
        oLevelReqs: '5 credits in English, Maths, Biology, Chemistry, Physics in one sitting',
        postUtmeFormat: '100 CBT questions (25 English, 25 Biology, 25 Chemistry, 25 Physics) in 75 mins',
        competitiveness: 'Extremely High',
        tips: 'UI tests deep conceptual understanding rather than shallow speed. Focus on WAEC & UI past questions.'
      },
      {
        name: 'Pharmacy',
        faculty: 'Faculty of Pharmacy',
        meritCutOff: 76.88,
        catchmentCutOff: 74.0,
        jambSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
        oLevelReqs: '5 credits in English, Maths, Biology, Chemistry, Physics in one sitting',
        postUtmeFormat: '100 CBT questions in 75 mins',
        competitiveness: 'High',
        tips: 'Strong organic chemistry and human physiology foundation required.'
      },
      {
        name: 'Law',
        faculty: 'Faculty of Law',
        meritCutOff: 78.5,
        catchmentCutOff: 75.25,
        jambSubjects: ['English Language', 'Literature in English', 'History / Government', 'CRS / IRS / Economics'],
        oLevelReqs: '5 credits including English, Literature in English and Mathematics',
        postUtmeFormat: '100 CBT questions (English, Literature, General Knowledge)',
        competitiveness: 'Extremely High',
        tips: 'Literature in English score carries substantial weight in UI assessment.'
      },
      {
        name: 'Electrical and Electronic Engineering',
        faculty: 'Faculty of Technology',
        meritCutOff: 77.25,
        catchmentCutOff: 73.5,
        jambSubjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry'],
        oLevelReqs: '5 credits in English, Maths, Physics, Chemistry, and any other science subject',
        postUtmeFormat: '100 CBT questions in 75 mins',
        competitiveness: 'High',
        tips: 'Physics and Mathematics past questions carry frequent repeat concepts in UI exams.'
      }
    ]
  },
  {
    id: 'oau',
    name: 'Obafemi Awolowo University',
    shortName: 'OAU',
    type: 'Federal',
    state: 'Osun',
    city: 'Ile-Ife',
    establishedYear: 1961,
    generalCutOff: 200,
    screeningMethod: 'Post-UTME CBT Exam',
    portalUrl: 'https://admissions.oauife.edu.ng',
    overview: 'Great Ife! Renowned for engineering, pharmacy, and law. OAU computes aggregate as: JAMB score / 8 (50%) + Post-UTME / 1 (40%) + O\'Level (10%).',
    courses: [
      {
        name: 'Medicine and Surgery',
        faculty: 'Health Sciences',
        meritCutOff: 83.25,
        catchmentCutOff: 79.5,
        jambSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
        oLevelReqs: '5 credits in English, Maths, Biology, Chemistry, Physics in one sitting',
        postUtmeFormat: '40 CBT questions in 60 mins (Aptitude, English, Sciences)',
        competitiveness: 'Extremely High',
        tips: 'OAU aptitude questions include numerical reasoning and logic. Practice with timer.'
      },
      {
        name: 'Nursing Science',
        faculty: 'Health Sciences',
        meritCutOff: 78.5,
        catchmentCutOff: 75.0,
        jambSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
        oLevelReqs: '5 credits in English, Maths, Biology, Chemistry, Physics',
        postUtmeFormat: '40 CBT questions in 60 mins',
        competitiveness: 'High',
        tips: 'Score 280+ in JAMB to stay ahead of the competitive catchment cutoffs.'
      },
      {
        name: 'Software Engineering / Computer Science',
        faculty: 'Faculty of Technology',
        meritCutOff: 78.0,
        catchmentCutOff: 74.5,
        jambSubjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry'],
        oLevelReqs: '5 credits including English, Maths, Physics, Chemistry',
        postUtmeFormat: '40 CBT questions in 60 mins',
        competitiveness: 'High',
        tips: 'Calculus and algebra fundamentals are heavily tested.'
      }
    ]
  },
  {
    id: 'abu',
    name: 'Ahmadu Bello University',
    shortName: 'ABU Zaria',
    type: 'Federal',
    state: 'Kaduna',
    city: 'Zaria',
    establishedYear: 1962,
    generalCutOff: 180,
    screeningMethod: 'Post-UTME CBT Exam',
    portalUrl: 'https://putme.abu.edu.ng',
    overview: 'The largest university in sub-Saharan Africa. High student population with prominent agriculture, civil engineering, and veterinary medicine faculties.',
    courses: [
      {
        name: 'Medicine and Surgery',
        faculty: 'Faculty of Medicine',
        meritCutOff: 280,
        catchmentCutOff: 260,
        jambSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
        oLevelReqs: '5 credits in English, Maths, Biology, Chemistry, Physics',
        postUtmeFormat: 'CBT screening test (JAMB combination subjects)',
        competitiveness: 'High',
        tips: 'Catchment covers all northern states with favorable thresholds for top JAMB performers.'
      },
      {
        name: 'Civil Engineering',
        faculty: 'Faculty of Engineering',
        meritCutOff: 240,
        catchmentCutOff: 220,
        jambSubjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry'],
        oLevelReqs: '5 credits in English, Maths, Physics, Chemistry',
        postUtmeFormat: 'CBT screening test',
        competitiveness: 'Moderate',
        tips: 'Solid performance in JAMB Physics and Maths secures direct admission.'
      }
    ]
  },
  {
    id: 'unn',
    name: 'University of Nigeria',
    shortName: 'UNN Nsukka',
    type: 'Federal',
    state: 'Enugu',
    city: 'Nsukka / Enugu Campus',
    establishedYear: 1960,
    generalCutOff: 180,
    screeningMethod: 'Post-UTME CBT Exam',
    portalUrl: 'https://unnportal.unn.edu.ng',
    overview: 'Restores the dignity of man. Renowned for pharmacy, law, and medical sciences at the Enugu campus (UNEC).',
    courses: [
      {
        name: 'Medicine and Surgery',
        faculty: 'College of Medicine (UNEC)',
        meritCutOff: 310,
        catchmentCutOff: 295,
        jambSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
        oLevelReqs: '5 credits in English, Maths, Biology, Chemistry, Physics in not more than one sitting',
        postUtmeFormat: 'Post-UTME CBT (60 questions in 60 mins)',
        competitiveness: 'Extremely High',
        tips: 'UNN assigns 60% to JAMB and 40% to Post-UTME score.'
      },
      {
        name: 'Pharmacy',
        faculty: 'Faculty of Pharmaceutical Sciences',
        meritCutOff: 285,
        catchmentCutOff: 270,
        jambSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
        oLevelReqs: '5 credits in English, Maths, Biology, Chemistry, Physics',
        postUtmeFormat: 'Post-UTME CBT',
        competitiveness: 'High',
        tips: 'Pharmacy is one of the top 3 competitive courses in UNN. Practice past screening questions.'
      }
    ]
  },
  {
    id: 'lasu',
    name: 'Lagos State University',
    shortName: 'LASU',
    type: 'State',
    state: 'Lagos',
    city: 'Ojo, Lagos',
    establishedYear: 1983,
    generalCutOff: 195,
    screeningMethod: 'Online Document Screening (O\'Level + JAMB)',
    portalUrl: 'https://lasu.edu.ng/admissions',
    overview: 'Top-ranked state university in Nigeria. Operates a 100% online point-system screening based on JAMB score and WAEC/NECO grades (A1 = 10 pts, B2 = 9 pts, B3 = 8 pts, C4 = 7 pts, C5 = 6 pts, C6 = 5 pts).',
    courses: [
      {
        name: 'Medicine and Surgery',
        faculty: 'LASUCOM, Ikeja',
        meritCutOff: 82.0,
        catchmentCutOff: 77.5,
        jambSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
        oLevelReqs: '5 credits in English, Maths, Biology, Chemistry, Physics in one sitting only',
        postUtmeFormat: 'No written exam. Online point ranking based on JAMB (50%) + O\'Level grades (50%)',
        competitiveness: 'Extremely High',
        tips: 'Because LASU uses pure grades, having A1s and B2s in your WAEC/NECO is critical to win admission.'
      },
      {
        name: 'Law',
        faculty: 'Faculty of Law',
        meritCutOff: 77.0,
        catchmentCutOff: 72.0,
        jambSubjects: ['English Language', 'Literature in English', 'Government', 'CRS / IRS / Economics'],
        oLevelReqs: '5 credits including English and Literature',
        postUtmeFormat: 'Online Point System',
        competitiveness: 'High',
        tips: 'Lagos indigene certificate provides significant catchment quota advantages.'
      }
    ]
  }
];

// Helper: Official JAMB Brochure Subject Combination Checker
export function checkJambSubjectCombination(
  courseName: string,
  selectedSubjects: string[]
): {
  isValid: boolean;
  required: string[];
  missing: string[];
  advice: string;
} {
  const normCourse = courseName.toLowerCase();
  const selectedNorm = selectedSubjects.map(s => s.toLowerCase());

  let required: string[] = ['English Language'];

  if (normCourse.includes('medicine') || normCourse.includes('surgery') || normCourse.includes('nursing') || normCourse.includes('pharmacy') || normCourse.includes('anatomy') || normCourse.includes('physiology')) {
    required = ['English Language', 'Biology', 'Chemistry', 'Physics'];
  } else if (normCourse.includes('law')) {
    required = ['English Language', 'Literature in English', 'Government / History', 'Any Art or Social Science'];
  } else if (normCourse.includes('engineering') || normCourse.includes('computer science') || normCourse.includes('physics') || normCourse.includes('mathematics')) {
    required = ['English Language', 'Mathematics', 'Physics', 'Chemistry'];
  } else if (normCourse.includes('accounting') || normCourse.includes('economics') || normCourse.includes('business') || normCourse.includes('finance')) {
    required = ['English Language', 'Mathematics', 'Economics', 'Commerce / Accounting / Government'];
  } else if (normCourse.includes('mass communication') || normCourse.includes('linguistics') || normCourse.includes('english')) {
    required = ['English Language', 'Literature in English', 'Government / History', 'CRS / IRS'];
  }

  // Find missing
  const missing: string[] = [];
  required.forEach(req => {
    if (req.includes('/')) {
      const options = req.split('/').map(o => o.trim().toLowerCase());
      const hasOption = options.some(opt => selectedNorm.some(s => s.includes(opt)));
      if (!hasOption) missing.push(req);
    } else {
      const hasExact = selectedNorm.some(s => s.includes(req.toLowerCase()));
      if (!hasExact) missing.push(req);
    }
  });

  const isValid = missing.length === 0;
  let advice = 'Your subject combination strictly conforms with the official JAMB brochure!';
  if (!isValid) {
    advice = `Warning: Missing prerequisite subject(s): ${missing.join(', ')}. Choosing the wrong combination leads to automatic admission disqualification regardless of score!`;
  }

  return { isValid, required, missing, advice };
}

// Helper: Calculate composite aggregate score
export function calculateAggregate(
  jambScore: number,
  postUtmeScore: number = 0,
  postUtmeMax: number = 100,
  method: 'standard_50_50' | 'oau_style' | 'unilag_style' = 'unilag_style'
): number {
  if (method === 'unilag_style') {
    // UNILAG: JAMB / 8 (50 pts) + Post-UTME (30 pts) + O'Level A1=4, B2=3.6, etc (20 pts)
    const jambComponent = (jambScore / 400) * 50;
    const postUtmeComponent = (postUtmeScore / Math.max(1, postUtmeMax)) * 30;
    const oLevelComponent = 18; // Standard 5-credit benchmark
    return parseFloat((jambComponent + postUtmeComponent + oLevelComponent).toFixed(2));
  } else if (method === 'oau_style') {
    // OAU: JAMB / 8 (50 pts) + Post-UTME / 1 (40 pts) + O'Level (10 pts)
    const jambComponent = (jambScore / 400) * 50;
    const postUtmeComponent = (postUtmeScore / Math.max(1, postUtmeMax)) * 40;
    const oLevelComponent = 8;
    return parseFloat((jambComponent + postUtmeComponent + oLevelComponent).toFixed(2));
  } else {
    // Standard 50/50
    const jamb50 = (jambScore / 400) * 50;
    const putme50 = (postUtmeScore / Math.max(1, postUtmeMax)) * 50;
    return parseFloat((jamb50 + putme50).toFixed(2));
  }
}

export const NIGERIAN_UNIVERSITIES = NIGERIAN_UNIVERSITIES_DATABASE;
