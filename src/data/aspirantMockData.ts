import { NationalMockTournament, CBTExam } from '../types';

export const NATIONAL_WEEKEND_MOCKS_DATABASE: NationalMockTournament[] = [
  {
    id: 'mock-utme-national-01',
    title: 'National UTME Super Mock — Series 04',
    seriesName: 'The All-Nigeria Aspirants League',
    examType: 'JAMB_UTME',
    scheduledDate: 'This Saturday',
    scheduledTime: '10:00 AM WAT',
    durationMinutes: 120,
    totalQuestions: 180,
    prizePoolNaira: 50000,
    prizes: [
      { rankRange: '1st Place', reward: '₦10,000 Cash + 20GB Data + Scholar Plaque' },
      { rankRange: '2nd Place', reward: '₦7,500 Cash + 15GB Data' },
      { rankRange: '3rd Place', reward: '₦5,000 Cash + 10GB Data' },
      { rankRange: '4th - 10th', reward: '₦2,500 Airtime Voucher' },
      { rankRange: '11th - 50th', reward: '500 XP + Aspirant Elite Badge' }
    ],
    participantsCount: 3418,
    status: 'upcoming',
    subjects: ['Use of English', 'Mathematics / Biology', 'Physics / Literature', 'Chemistry / Economics'],
    leaderboard: [
      {
        rank: 1,
        studentId: 'asp-01',
        studentName: 'Chukwuemeka Eze',
        state: 'Enugu',
        targetUniversity: 'UNN Nsukka',
        targetCourse: 'Medicine & Surgery',
        score: 348,
        subjectScores: { English: 84, Biology: 90, Chemistry: 88, Physics: 86 },
        timeSpentMinutes: 89,
        badge: 'Top National Scorer'
      },
      {
        rank: 2,
        studentId: 'asp-02',
        studentName: 'Amina Bello',
        state: 'Kaduna',
        targetUniversity: 'ABU Zaria',
        targetCourse: 'Pharmacy',
        score: 336,
        subjectScores: { English: 82, Biology: 88, Chemistry: 86, Physics: 80 },
        timeSpentMinutes: 94,
        badge: 'Northern Division 1st'
      },
      {
        rank: 3,
        studentId: 'asp-03',
        studentName: 'Damilola Adeleke',
        state: 'Lagos',
        targetUniversity: 'UNILAG',
        targetCourse: 'Computer Science',
        score: 329,
        subjectScores: { English: 80, Maths: 88, Physics: 85, Chemistry: 76 },
        timeSpentMinutes: 101,
        badge: 'Speed Demon'
      },
      {
        rank: 4,
        studentId: 'asp-04',
        studentName: 'Tochukwu Obi',
        state: 'Anambra',
        targetUniversity: 'UI Ibadan',
        targetCourse: 'Law',
        score: 322,
        subjectScores: { English: 86, Literature: 84, Government: 80, CRS: 72 },
        timeSpentMinutes: 105
      },
      {
        rank: 5,
        studentId: 'asp-05',
        studentName: 'Blessing Okon',
        state: 'Akwa Ibom',
        targetUniversity: 'UNIBEN',
        targetCourse: 'Nursing Science',
        score: 318,
        subjectScores: { English: 78, Biology: 84, Chemistry: 80, Physics: 76 },
        timeSpentMinutes: 110
      },
      {
        rank: 6,
        studentId: 'asp-06',
        studentName: 'Ibrahim Danjuma',
        state: 'Kano',
        targetUniversity: 'ABU Zaria',
        targetCourse: 'Mechanical Engineering',
        score: 312,
        subjectScores: { English: 74, Maths: 84, Physics: 82, Chemistry: 72 },
        timeSpentMinutes: 112
      },
      {
        rank: 7,
        studentId: 'asp-07',
        studentName: 'Folake Balogun',
        state: 'Osun',
        targetUniversity: 'OAU Ife',
        targetCourse: 'Accounting',
        score: 308,
        subjectScores: { English: 80, Maths: 78, Economics: 80, Government: 70 },
        timeSpentMinutes: 114
      },
      {
        rank: 8,
        studentId: 'asp-08',
        studentName: 'Ngozi Kalu',
        state: 'Abia',
        targetUniversity: 'UNN',
        targetCourse: 'Medical Radiography',
        score: 304,
        subjectScores: { English: 76, Biology: 80, Chemistry: 76, Physics: 72 },
        timeSpentMinutes: 115
      }
    ]
  },
  {
    id: 'mock-waec-national-02',
    title: 'WAEC WASSCE All-Subjects Mock Sprint',
    seriesName: 'May/June Prep Marathon',
    examType: 'WAEC',
    scheduledDate: 'Next Sunday',
    scheduledTime: '02:00 PM WAT',
    durationMinutes: 90,
    totalQuestions: 100,
    prizePoolNaira: 35000,
    prizes: [
      { rankRange: '1st - 3rd', reward: '₦5,000 Cash + WAEC Formula Guide' },
      { rankRange: '4th - 10th', reward: '₦2,000 Airtime' }
    ],
    participantsCount: 2190,
    status: 'upcoming',
    subjects: ['General Mathematics', 'English Language', 'Biology / Economics'],
    leaderboard: []
  }
];

export const ASPIRANT_PAST_QUESTION_YEARS = [
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2012',
  '2011',
  '2010',
  '2009',
  '2008'
];

export interface AspirantDailyDrillItem {
  id: string;
  type: 'read' | 'quiz' | 'drill';
  subject: string;
  topic: string;
  estimatedMinutes: number;
  isCompleted: boolean;
  notesSummary: string;
  cbtQuestionCount: number;
}

// Generate dynamic drill sergeant daily plan based on days remaining
export function generateAspirantDailyDrill(
  daysRemaining: number,
  selectedSubjects: string[]
): AspirantDailyDrillItem[] {
  const primarySubject = selectedSubjects[1] || 'Mathematics';
  const secondarySubject = selectedSubjects[2] || 'Physics';

  return [
    {
      id: 'drill-01',
      type: 'read',
      subject: 'Use of English',
      topic: 'Concord, Lexis & Sentence Structure (High-Yield UTME Rule)',
      estimatedMinutes: 25,
      isCompleted: false,
      notesSummary: 'Subject-verb agreement rules involving neither/nor, collective nouns, as well as, together with, and inverted sentences.',
      cbtQuestionCount: 15
    },
    {
      id: 'drill-02',
      type: 'quiz',
      subject: primarySubject,
      topic: 'Calculus & Quadratic Curve Word Problems',
      estimatedMinutes: 30,
      isCompleted: false,
      notesSummary: 'High-frequency exam questions spanning 2012 to 2024 JAMB papers.',
      cbtQuestionCount: 20
    },
    {
      id: 'drill-03',
      type: 'drill',
      subject: secondarySubject,
      topic: 'Dimensional Analysis & Energy Transformations',
      estimatedMinutes: 35,
      isCompleted: false,
      notesSummary: 'Deriving units, conservation of mechanical energy, and friction work theorems.',
      cbtQuestionCount: 25
    }
  ];
}
