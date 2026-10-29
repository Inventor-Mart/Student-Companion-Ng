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
    avatarUrl: 'https://api.dicebear.com/7.x/micah/svg?seed=Adewale&backgroundColor=b6e3f4',
    bio: 'Former Olympiad coach with over a decade experience preparing secondary school candidates for Distinction grades in WAEC and 300+ in JAMB UTME. Patient, step-by-step problem solver.',
    availableDays: ['Mondays', 'Wednesdays', 'Saturdays']
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
    avatarUrl: 'https://api.dicebear.com/7.x/micah/svg?seed=Amarachi&backgroundColor=ffd5dc',
    bio: 'Passionate about simplifying complex metabolic cycles, genetics, and organic chemistry. Dedicated to mentoring university pre-med aspirants and SS1-SS3 students.',
    availableDays: ['Tuesdays', 'Thursdays', 'Sundays']
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
    avatarUrl: 'https://api.dicebear.com/7.x/micah/svg?seed=Folashade&backgroundColor=d1d4f9',
    bio: 'Certified WAEC and NECO Paper 3 (Test of Orals) examiner. Specializes in essay writing composition, grammatical concord, and African/Non-African prose and poetry analysis.',
    availableDays: ['Mondays', 'Tuesdays', 'Fridays']
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
    avatarUrl: 'https://api.dicebear.com/7.x/micah/svg?seed=Chidiebere&backgroundColor=ffdfbf',
    bio: 'Bridging classroom theory with real-world financial literacy. Helping senior secondary commercial students conquer quantitative economics, national income accounting, and market models.',
    availableDays: ['Wednesdays', 'Saturdays', 'Sundays']
  }
];
