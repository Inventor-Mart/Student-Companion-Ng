import { SchoolLeaderboardEntry, StudentLeaderboardEntry } from '../types';

export const SCHOOL_LEADERBOARD_DATA: SchoolLeaderboardEntry[] = [
  {
    rank: 1,
    schoolName: "King's College, Lagos Island",
    state: 'Lagos',
    totalPoints: 184500,
    studentCount: 340,
    averageAccuracy: 88.4
  },
  {
    rank: 2,
    schoolName: "Queen's College, Yaba",
    state: 'Lagos',
    totalPoints: 179200,
    studentCount: 325,
    averageAccuracy: 87.1
  },
  {
    rank: 3,
    schoolName: 'Loyola Jesuit College, Gidan Mangoro',
    state: 'Abuja (FCT)',
    totalPoints: 168400,
    studentCount: 280,
    averageAccuracy: 91.2
  },
  {
    rank: 4,
    schoolName: 'Corona Secondary School, Agbara',
    state: 'Ogun / Lagos',
    totalPoints: 154100,
    studentCount: 260,
    averageAccuracy: 86.5
  },
  {
    rank: 5,
    schoolName: 'Federal Government Academy, Suleja',
    state: 'Niger / FCT',
    totalPoints: 142800,
    studentCount: 245,
    averageAccuracy: 85.9
  },
  {
    rank: 6,
    schoolName: 'Government College, Ibadan',
    state: 'Oyo',
    totalPoints: 133200,
    studentCount: 290,
    averageAccuracy: 83.2
  }
];

export const STUDENT_LEADERBOARD_DATA: StudentLeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Chioma Okafor',
    school: "Queen's College Yaba",
    classLevel: 'SS 2 (Science)',
    xp: 13920,
    streak: 22
  },
  {
    rank: 2,
    name: 'Fatima Usman',
    school: 'FGGC Bwari Abuja',
    classLevel: 'SS 3 (Commercial)',
    xp: 12400,
    streak: 19
  },
  {
    rank: 3,
    name: 'Oluwatobi Alabi',
    school: 'Corona Secondary School',
    classLevel: 'SS 1 (Science)',
    xp: 11150,
    streak: 15
  },
  {
    rank: 4,
    name: 'Emeka Nnamani',
    school: 'Dennis Memorial Grammar School',
    classLevel: 'SS 2 (Science)',
    xp: 9800,
    streak: 12
  }
];
