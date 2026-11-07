export type UserRole = 'student' | 'parent' | 'tutor' | 'admin' | 'growth_partner';

export type NigerianClassLevel =
  | 'JSS 1'
  | 'JSS 2'
  | 'JSS 3'
  | 'SS 1'
  | 'SS 2'
  | 'SS 3';

export type AcademicStream = 'Junior' | 'Science' | 'Non-Science';

export type StudentRank = 'Fresher' | 'Scholar' | 'Prefect' | 'Senior Boy' | 'Senior Girl' | 'Senior Prefect';

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

export type ExamType = 'JAMB_UTME' | 'WAEC' | 'NECO' | 'BECE' | 'TERM_MOCK';

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
  lat: number;
  lng: number;
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

export interface VerifiedAddress {
  street: string;
  lga: string;
  state: string;
  landmark: string;
  phone: string;
}

export interface TutorVerificationDetails {
  nin: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  isVerified: boolean;
}

export interface RegisteredUserProfile {
  id: string;
  role: UserRole;
  fullName: string;
  email: string;
  avatarUrl?: string;
  emailVerified: boolean;
  verifiedAt?: string;
  createdAt: string;
  studentData?: StudentProfile;
  parentData?: {
    phone: string;
    wardName: string;
    pin: string;
    address?: VerifiedAddress;
  };
  tutorData?: {
    subjectSpecialization: string;
    qualification: string;
    hourlyRate: number;
    teachingMode: 'both' | 'online' | 'physical';
    verification?: TutorVerificationDetails;
  };
  adminData?: {
    schoolName: string;
    schoolType: string;
  };
  growthPartnerData?: GrowthPartner;
  isSuperAdmin?: boolean;
  isDeveloper?: boolean;
}

export interface GrowthPartner {
  id: string;
  name: string;
  email: string;
  phone?: string;
  referralCode: string;
  commissionRatePercent: number;
  totalEarningsNaira: number;
  totalPaidOutNaira: number;
  activeReferralsCount: number;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  status: 'active' | 'suspended' | 'pending_approval';
  createdAt: string;
}

export interface Referral {
  id: string;
  partnerId: string;
  referredUserId: string;
  referredUserName?: string;
  referralCodeUsed: string;
  status: 'active' | 'churned';
  totalVolumePaidNaira: number;
  totalCommissionEarnedNaira: number;
  lastPaymentDate?: string;
  createdAt: string;
}

export interface PartnerWallet {
  partnerId: string;
  balanceNaira: number;
  lifetimeEarnedNaira: number;
  totalWithdrawnNaira: number;
  updatedAt: string;
}

export interface RevenueShareTransaction {
  id: string;
  partnerId: string;
  studentId: string;
  studentName: string;
  paymentId: string;
  subscriptionPlan: string;
  paymentAmountNaira: number;
  commissionRatePercent: number;
  commissionAmountNaira: number;
  status: 'credited' | 'reversed';
  createdAt: string;
}

export interface SubscriptionPayment {
  id: string;
  studentId: string;
  studentName: string;
  plan: string;
  amountNaira: number;
  paymentGateway: 'Paystack' | 'Flutterwave' | 'Direct Escrow';
  status: 'successful' | 'pending' | 'failed';
  partnerId?: string | null;
  partnerCommissionCredited: boolean;
  commissionAmountNaira?: number;
  createdAt: string;
}

export type ForumAudience = 'student' | 'parent';
export type ForumCategory = 'academics' | 'competitions' | 'general' | 'parenting' | 'exams';

export interface ForumChannel {
  id: string;
  title: string;
  description: string;
  audience: ForumAudience;
  category: ForumCategory;
  iconName: string;
  messageCount: number;
  lastActivityAt: string;
}

export interface ForumMessageReaction {
  thumbsUp: string[]; // array of user IDs
  lightbulb: string[];
  fire: string[];
  clap: string[];
}

export interface ForumMessage {
  id: string;
  channelId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  senderClassLevel?: NigerianClassLevel;
  senderRank?: StudentRank;
  senderSchool?: string;
  text: string;
  reactions: ForumMessageReaction;
  isReported?: boolean;
  replyToId?: string;
  replyToText?: string;
  createdAt: string;
}

export interface ForumReport {
  id: string;
  messageId: string;
  channelId: string;
  reportedUserId: string;
  reportedUserName: string;
  reporterUserId: string;
  messageText: string;
  reason: 'spam' | 'bullying' | 'inappropriate' | 'contact_sharing' | 'other';
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}

export type ChampionshipTier = 'junior' | 'senior';

export interface ChampionshipPrize {
  rank: 1 | 2 | 3;
  title: string;
  subtitle: string;
  specification: string;
  valueNaira: number;
  badge: string;
  iconName: string;
}

export interface ChampionshipRegistration {
  id: string;
  studentId: string;
  studentName: string;
  studentSchool: string;
  classLevel: NigerianClassLevel;
  tier: ChampionshipTier;
  registrationFeeNaira: number;
  status: 'pending_parent' | 'paid' | 'completed';
  requestedAt: string;
  paidAt?: string;
  score?: number;
  totalQuestions?: number;
  timeSpentSeconds?: number;
  completedAt?: string;
  rank?: number;
}
