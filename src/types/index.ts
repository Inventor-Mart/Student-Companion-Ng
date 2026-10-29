export type UserRole = 'student' | 'parent' | 'tutor' | 'admin';

export type NigerianClassLevel =
  | 'JSS 1'
  | 'JSS 2'
  | 'JSS 3'
  | 'SS 1'
  | 'SS 2'
  | 'SS 3';

export type AcademicStream = 'Junior' | 'Science' | 'Non-Science';

export type StudentRank = 'Fresher' | 'Scholar' | 'Prefect' | 'Senior Boy' | 'Senior Girl';

export interface StudentProfile {
  id: string;
  name: string;
  school: string;
  classLevel: NigerianClassLevel;
  stream: AcademicStream;
  xp: number;
  rank: StudentRank;
  streakDays: number;
  lastStudyDate: string;
  uniformVerified: boolean;
  uniformPhotoUrl: string | null;
  downloadedSubjectIds: string[];
  completedQuizIds: string[];
}

export interface CurriculumTopic {
  id: string;
  classLevel: NigerianClassLevel;
  stream: AcademicStream;
  subject: string;
  term: '1st Term' | '2nd Term' | '3rd Term';
  weekNumber: number;
  topicTitle: string;
  subtopics: string[];
  readingTimeMinutes: number;
  summary: string;
  contentMarkdown: string;
  keyTakeaways: string[];
  associatedQuizId: string;
  isDownloaded?: boolean;
}

export type ExamType = 'JAMB_UTME' | 'WAEC' | 'NECO' | 'TERM_MOCK';

export interface CBTQuestion {
  id: number;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  topicRef?: string;
}

export interface CBTExam {
  id: string;
  examType: ExamType;
  title: string;
  subject: string;
  classLevel?: NigerianClassLevel;
  durationMinutes: number;
  year?: number;
  xpReward: number;
  questions: CBTQuestion[];
}

export interface CBTExamResult {
  id: string;
  examId: string;
  examTitle: string;
  subject: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpentSeconds: number;
  xpAwarded: number;
  date: string;
  answers: Record<number, number>;
}

export interface Tutor {
  id: string;
  name: string;
  tagline: string;
  subjects: string[];
  rating: number;
  reviewCount: number;
  hourlyRateNaira: number;
  location: string;
  state: string;
  isNinVerified: boolean;
  education: string;
  avatarUrl: string;
  bio: string;
  availableDays: string[];
}

export type BookingType = 'online' | 'physical';
export type BookingStatus = 'pending_parent' | 'confirmed' | 'completed' | 'cancelled';

export interface TutorBooking {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorPhoto: string;
  studentId: string;
  studentName: string;
  subject: string;
  topic: string;
  bookingType: BookingType;
  date: string;
  timeSlot: string;
  status: BookingStatus;
  amountNaira: number;
  isParentApproved: boolean;
  parentApprovalDate?: string;
  createdAt: string;
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amountNaira: number;
  description: string;
  timestamp: string;
  status: 'successful' | 'pending';
  reference: string;
}

export interface ParentWallet {
  balanceNaira: number;
  pin: string;
  transactions: WalletTransaction[];
}

export interface SchoolLeaderboardEntry {
  rank: number;
  schoolName: string;
  state: string;
  totalPoints: number;
  studentCount: number;
  averageAccuracy: number;
}

export interface StudentLeaderboardEntry {
  rank: number;
  name: string;
  school: string;
  classLevel: string;
  xp: number;
  streak: number;
  isCurrentUser?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'student' | 'tutor';
  text: string;
  timestamp: string;
}
