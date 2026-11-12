export type UserRole = 'student' | 'parent' | 'tutor' | 'admin' | 'growth_partner' | 'school_admin';

export type NigerianClassLevel =
  | 'JSS 1'
  | 'JSS 2'
  | 'JSS 3'
  | 'SS 1'
  | 'SS 2'
  | 'SS 3'
  | 'University Aspirant';

export type AcademicStream = 'Junior' | 'Science' | 'Non-Science';

export type StudentRank = 'Fresher' | 'Scholar' | 'Prefect' | 'Senior Boy' | 'Senior Girl' | 'Senior Prefect';

export type StudentSubscriptionPlan = 'free' | 'basic' | 'standard' | 'elite';
export type StudentSubscriptionTier = StudentSubscriptionPlan | 'premium' | 'termly' | 'annual';

export interface StudentAddOnEntitlements {
  aiCoachUnlocked?: boolean;
  termlyCompetitionUnlocked?: boolean;
  termlyDrillAllSubjects?: boolean;
  termlyDrillSingleSubjects?: string[];
  dailyGameAttempts?: { date: string; attempts: Record<string, number> };
}

export interface DailyExplorationState {
  date: string; // YYYY-MM-DD
  featuresUsed: string[]; // e.g. ['cbt', 'games', 'syllabus', 'formulas', 'ai-coach', 'tutors', 'competitions', 'community', 'exam-prep', 'uniform']
  featureCounts: Record<string, number>;
}

export type AppFeatureId =
  | 'cbt'
  | 'aspirant-cbt'
  | 'syllabus'
  | 'formulas'
  | 'ai-coach'
  | 'tutors'
  | 'games'
  | 'competitions'
  | 'community'
  | 'exam-prep'
  | 'uniform'
  | 'general';

export interface AwardXPOptions {
  feature?: AppFeatureId;
  baseXP: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  questionCount?: number;
  scorePercentage?: number;
  paidAmountNgn?: number;
  reason?: string;
}

export interface AwardXPResult {
  totalXPAwarded: number;
  baseXP: number;
  difficultyMultiplier: number;
  volumeMultiplier: number;
  repeatFactor: number;
  explorerMultiplier: number;
  masteryBonus: number;
  paidMilestoneBonus: number;
  newDailyCount: number;
  uniqueFeaturesCount: number;
  reason: string;
}

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
  schoolCode?: string;
  isSubscribed?: boolean;
  subscriptionPlan?: StudentSubscriptionPlan;
  subscriptionTier?: StudentSubscriptionTier;
  subscribedUntil?: string;
  termExpiresAt?: string;
  addOns?: StudentAddOnEntitlements;
  studentLinkCode?: string;
  dailyExploration?: DailyExplorationState;
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
  attachmentName?: string;
  attachmentDataUrl?: string;
  isAdminOverride?: boolean;
  updatedAt?: string;
}

export type AdminLessonNoteStream = AcademicStream | 'All';

export interface AdminLessonNote {
  id: string;
  classLevel: Exclude<NigerianClassLevel, 'University Aspirant'>;
  stream: AdminLessonNoteStream;
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
  uploadMode: 'markdown' | 'structured';
  attachmentName?: string;
  attachmentDataUrl?: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
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

export interface TimetableSlot {
  id: string;
  day: string;
  time: string;
  period: 'Morning' | 'Afternoon' | 'Evening';
  isAvailable: boolean;
}

export interface TutorTestimonial {
  id: string;
  studentName: string;
  school: string;
  gradeOutcome: string;
  comment: string;
  date: string;
  rating: number;
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
  // Enhanced profile credentials and availability
  experienceYears?: number;
  degrees?: string[];
  certifications?: string[];
  examSpecializations?: string[];
  curriculumHighlights?: string[];
  totalLessonsDelivered?: number;
  completionRate?: number;
  timetable?: TimetableSlot[];
  testimonials?: TutorTestimonial[];
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
  timestamp?: string;
  date?: string;
  status?: 'successful' | 'pending';
  reference?: string;
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

export interface TutorGuarantor {
  name: string;
  phone: string;
  relationship: string;
}

export interface TutorDigitalReadiness {
  hasDevice: boolean;
  hasInternet: boolean;
  comfortableWithTools: boolean;
}

export interface RegisteredTutorData {
  subjectSpecialization: string;
  qualification: string;
  hourlyRate: number;
  teachingMode: 'both' | 'online' | 'physical';
  verification?: TutorVerificationDetails;
  phone?: string;
  gender?: 'Male' | 'Female' | 'Prefer not to say';
  highestEducation?: 'NCE' | 'B.Sc.' | 'B.Ed.' | 'M.Sc.' | 'Ph.D.' | 'Other';
  institution?: string;
  courseOfStudy?: string;
  experienceYearsRange?: '0-1 years' | '1-3 years' | '3-5 years' | '5+ years';
  targetClasses?: string[];
  proficientSubjects?: string[];
  bio?: string;
  tagline?: string;
  city?: string;
  state?: string;
  nin?: string;
  idDocumentUrl?: string;
  cvResumeUrl?: string;
  guarantors?: TutorGuarantor[];
  digitalReadiness?: TutorDigitalReadiness;
  degrees?: string[];
  certifications?: string[];
  examSpecializations?: string[];
  curriculumHighlights?: string[];
  timetable?: TimetableSlot[];
  onboardingStage?: 1 | 2 | 3;
}

export type ParentRelationship = 'Father' | 'Mother' | 'Guardian' | 'Sibling' | 'Relative' | 'Other';
export type ParentAcademicGoal =
  | 'WAEC / WASSCE Excellence'
  | 'JAMB UTME 300+ Target'
  | 'Junior BECE Certification'
  | 'Termly Promotion Top 3'
  | '1-on-1 Personalized Tutoring'
  | 'STEM & Math Confidence';
export type ParentNotificationChannel = 'WhatsApp' | 'SMS' | 'Email' | 'In-App Only';

export interface LinkedWard {
  studentId: string;
  studentName: string;
  classLevel: NigerianClassLevel;
  stream?: AcademicStream | string;
  schoolName: string;
  studentLinkCode: string;
  linkedAt: string;
  avatarUrl?: string;
  isPrimary?: boolean;
}

export interface RegisteredParentData {
  phone: string;
  pin: string;
  relationship?: ParentRelationship;
  stateOfResidence?: string;
  cityOrLga?: string;
  academicGoals?: ParentAcademicGoal[];
  notificationPreference?: ParentNotificationChannel;
  allowAutomatedReports?: boolean;
  linkedWards?: LinkedWard[];
  activeWardId?: string;
  address?: VerifiedAddress;
  wardName?: string; // Backward compatibility
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
  parentData?: RegisteredParentData;
  tutorData?: RegisteredTutorData;
  adminData?: {
    schoolName: string;
    schoolType: string;
    schoolCode?: string;
    designation?: string;
    phone?: string;
    state?: string;
    lga?: string;
    documentUrl?: string;
    verificationStatus?: 'pending_verification' | 'verified';
    verifiedAt?: string;
    directSubscription?: {
      plan: 'monthly' | 'termly';
      amountNaira: number;
      paidAt: string;
      expiresAt: string;
      paystackReference: string;
      status: 'active' | 'expired';
    };
    accreditationQualified?: boolean;
    qualificationReason?: 'paid_students_threshold' | 'direct_subscription' | 'manual_override';
  };
  growthPartnerData?: GrowthPartner;
  isSuperAdmin?: boolean;
  isDeveloper?: boolean;
}

export interface SchoolMaterial {
  id: string;
  schoolCode: string;
  schoolName: string;
  type: 'lesson_note' | 'assignment' | 'project' | 'past_question';
  title: string;
  subject: string;
  classLevel: NigerianClassLevel | 'All Classes';
  term?: 'First Term' | 'Second Term' | 'Third Term';
  week?: string;
  content: string;
  attachmentUrl?: string;
  attachmentName?: string;
  dueDate?: string;
  maxScore?: number;
  examBoard?: 'WAEC' | 'JAMB' | 'NECO' | 'BECE';
  createdAt: string;
  authorName: string;
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

export interface ChampionshipStageResult {
  day: 1 | 2 | 3;
  subject: 'English Language' | 'Mathematics' | 'General Paper';
  totalQuestions: number;
  timeAllottedSeconds: number;
  score: number; // raw correct count
  scorePercentage: number;
  timeSpentSeconds: number;
  completedAt: string;
}

export interface ChampionshipRegistration {
  id: string;
  studentId: string;
  studentName: string;
  studentSchool: string;
  classLevel: NigerianClassLevel;
  tier?: ChampionshipTier;
  registrationFeeNaira: number;
  status: 'pending_parent' | 'paid' | 'completed';
  currentStage?: 1 | 2 | 3 | 'finished';
  stageResults?: Partial<Record<1 | 2 | 3, ChampionshipStageResult>>;
  cumulativeScore?: number; // total correct out of 140
  cumulativePercentage?: number;
  cumulativeTimeSpentSeconds?: number;
  requestedAt: string;
  paidAt?: string;
  score?: number;
  totalQuestions?: number;
  timeSpentSeconds?: number;
  completedAt?: string;
  rank?: number;
}

// ==========================================
// VIRTUAL CLASSROOM & COLLABORATIVE WHITEBOARD
// ==========================================

export type WhiteboardTool =
  | 'pen'
  | 'highlighter'
  | 'eraser'
  | 'line'
  | 'rect'
  | 'circle'
  | 'triangle'
  | 'stamp'
  | 'text';

export type WhiteboardGridMode =
  | 'graph'
  | 'green-chalk'
  | 'whiteboard'
  | 'dot-grid'
  | 'blueprint'
  | 'ruled'
  | 'blank';

export interface WhiteboardStroke {
  id: string;
  tool: WhiteboardTool;
  color: string;
  width: number;
  points: { x: number; y: number }[];
  stampSymbol?: string;
  text?: string;
  fontSize?: number;
}

export interface BoardStickerNote {
  id: string;
  type: 'text' | 'stamp';
  x: number;
  y: number;
  text: string;
  color: string;
  fontSize: number;
  authorRole: 'student' | 'tutor';
  stampSymbol?: string;
}

export interface ClassroomChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'student' | 'tutor';
  text: string;
  timestamp: string;
  isFormula?: boolean;
}

export interface VirtualClassroomSession {
  bookingId: string;
  tutorId: string;
  tutorName: string;
  tutorPhoto: string;
  studentId: string;
  studentName: string;
  subject: string;
  topic: string;
  amountNaira: number;
  durationMinutes: number;
  remainingSeconds: number;
  status: 'active' | 'completed' | 'cancelled';
  isTutorMicActive: boolean;
  isStudentMicActive: boolean;
  activeRole: 'student' | 'tutor';
}

// ==========================================
// PREPARE FOR EXAM (AI DAILY STUDY CALENDAR)
// ==========================================

export interface DiagnosticProfile {
  classLevel: NigerianClassLevel;
  stream: AcademicStream;
  targetExam: 'BECE' | 'WAEC' | 'JAMB_UTME' | 'TERM_MOCK';
  examDate?: string;
  weakSubjects: string[];
  strongSubjects: string[];
  dailyStudyHours: number; // e.g. 1.5, 2.5, 4
  preferredTimeOfDay: 'Morning' | 'Afternoon' | 'Evening';
}

export interface StudyBlock {
  id: string;
  timeSlot: string; // e.g. "04:30 PM - 05:45 PM"
  subject: string;
  topic: string;
  keyObjectives: string[];
  cbtExamId?: string; // links to existing mock exams
  cbtExamTitle?: string;
  drillQuestionCount: number;
  suggestedTutorSubject: string;
  suggestedTutorTopic: string;
  isCompleted?: boolean;
}

export interface StudyDay {
  dayNumber: number; // 1 to 30
  title: string;
  dateLabel: string;
  focusTheme: string;
  blocks: StudyBlock[];
}

export interface StudyCalendar {
  id: string;
  title: string;
  targetExam: string;
  classLevel: NigerianClassLevel;
  generatedAt: string;
  totalDays: number;
  days: StudyDay[];
  strategyTips: string[];
}

export interface ExamPrepState {
  isUnlocked: boolean;
  unlockedAt?: string;
  tutorCreditsNaira: number; // Starts at 4,000 upon unlock
  tutorCreditsRemainingNaira?: number;
  paymentMethod?: 'escrow_wallet' | 'direct_paystack';
  diagnosticProfile?: DiagnosticProfile;
  activeCalendar?: StudyCalendar | null;
  completedBlockIds: string[];
  unlockedSubjectExams?: string[]; // Array of subject names unlocked via the ₦1,000 single-subject pass
}

// ==========================================
// UNIVERSITY ASPIRANT HUB & ADMISSION TYPES
// ==========================================

export type AspirantTier = 'free' | 'basic' | 'elite';

export interface AspirantGoal {
  targetExams: ('JAMB_UTME' | 'WAEC' | 'NECO')[];
  examDates: {
    jamb: string;
    waec: string;
    neco: string;
  };
  targetUniversity: string;
  targetCourse: string;
  targetScore: number;
  subjectCombination: [string, string, string, string];
  tier: AspirantTier;
  subscribedUntil?: string;
  targetExamDate?: string;
  jambSubjects?: string[];
}

export interface NationalMockParticipant {
  rank: number;
  studentId: string;
  studentName: string;
  state: string;
  targetUniversity: string;
  targetCourse: string;
  score: number;
  subjectScores: Record<string, number>;
  timeSpentMinutes: number;
  badge?: string;
}

export interface NationalMockTournament {
  id: string;
  title: string;
  seriesName: string;
  examType: 'JAMB_UTME' | 'WAEC' | 'NECO';
  scheduledDate: string;
  scheduledTime: string;
  durationMinutes: number;
  totalQuestions: number;
  prizePoolNaira: number;
  prizes: { rankRange: string; reward: string }[];
  participantsCount: number;
  status: 'upcoming' | 'live' | 'completed';
  subjects: string[];
  leaderboard: NationalMockParticipant[];
}

export interface UniversityCourseEntry {
  name: string;
  faculty: string;
  meritCutOff: number;
  catchmentCutOff?: number;
  jambSubjects: string[];
  oLevelReqs: string;
  postUtmeFormat: string;
  competitiveness: 'Extremely High' | 'High' | 'Moderate';
  tips: string;
}

export interface UniversityAdmissionInfo {
  id: string;
  name: string;
  shortName: string;
  type: 'Federal' | 'State' | 'Private';
  state: string;
  city: string;
  establishedYear: number;
  generalCutOff: number;
  screeningMethod: 'Post-UTME CBT Exam' | 'Online Document Screening (O\'Level + JAMB)';
  portalUrl: string;
  overview: string;
  courses: UniversityCourseEntry[];
}

// ==========================================
// OVER-THE-AIR (OTA) BROADCASTS & COMPETITION
// ==========================================

export type OTABroadcastCategory = 'championship' | 'academic' | 'urgent' | 'spotlight' | 'general';

export interface OTABroadcastItem {
  id: string;
  text: string;
  category: OTABroadcastCategory;
  isActive: boolean;
  priority: number; // Higher number displays first
  actionTab?: string; // Optional tab to open when clicked (e.g. 'competitions', 'cbt')
  createdAt: string;
  updatedAt: string;
}

export interface OTAPopupAnnouncement {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  badge?: string;
  body: string;
  ctaText: string;
  ctaTargetTab: string; // e.g. 'competitions'
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  updatedAt: string;
}

export interface OTACompetitionConfig {
  id: 'termly_championship';
  registrationFeeNaira: number;
  termTitle: string; // e.g. "Term 1 National Secondary School Championship"
  academicSession: string; // e.g. "2024/2025 Academic Session"
  registrationDeadline: string; // e.g. "November 30, 2024"
  tournamentStartDate: string; // e.g. "December 5, 2024"
  tournamentEndDate: string; // e.g. "December 7, 2024"
  prizes: ChampionshipPrize[];
  daysConfig: Record<1 | 2 | 3, {
    day: 1 | 2 | 3;
    title: string;
    subject: 'English Language' | 'Mathematics' | 'General Paper';
    totalQuestions: number;
    durationMinutes: number;
    durationSeconds: number;
    description: string;
  }>;
  updatedAt: string;
  updatedBy: string;
}

export interface OTAWeeklyCompetitionConfig {
  id: 'weekly_challenge';
  title: string;
  weekLabel: string;
  countdownLabel: string;
  description: string;
  totalPrizePoolNaira: number;
  firstPrize: { title: string; valueNaira: number; extra?: string };
  secondPrize: { title: string; valueNaira: number; extra?: string };
  thirdPrize: { title: string; valueNaira: number; extra?: string };
  featuredExamId: string;
  featuredExamTitle?: string;
  rules: string[];
  updatedAt: string;
  updatedBy: string;
}

export interface OTASchoolLeagueSchool {
  id: string;
  name: string;
  state: string;
  points: number;
  rank: number;
  studentCount: number;
  badge?: string;
}

export interface OTASchoolLeagueConfig {
  id: 'school_league';
  seasonTitle: string;
  roundLabel: string;
  grandAwardDescription: string;
  schools: OTASchoolLeagueSchool[];
  updatedAt: string;
  updatedBy: string;
}




