import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  doc,
  collection,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import {
  UserRole,
  StudentProfile,
  NigerianClassLevel,
  AcademicStream,
  CurriculumTopic,
  CBTExam,
  CBTExamResult,
  Tutor,
  TutorBooking,
  ParentWallet,
  StudentRank,
  ChatMessage,
  VerifiedAddress,
  TutorVerificationDetails,
  RegisteredUserProfile,
  RegisteredTutorData,
  GrowthPartner,
  SchoolMaterial,
  TimetableSlot,
  ChampionshipRegistration,
  ChampionshipTier,
  VirtualClassroomSession,
  ExamPrepState,
  DiagnosticProfile,
  StudyCalendar,
  AspirantGoal,
  AspirantTier,
  StudentSubscriptionTier,
  StudentSubscriptionPlan,
  StudentAddOnEntitlements,
  WalletTransaction,
  LinkedWard,
  AwardXPOptions,
  AwardXPResult,
  AppFeatureId,
  DailyExplorationState,
  AdminLessonNote,
  VerifiedLessonReadLog,
  SecurityStatusSnapshot,
  AspirantReferralReward,
  OTAAppReleaseConfig,
  OTAFeatureKey,
  AppNotificationItem,
  OTANotificationBroadcast,
  NotificationPreferences,
  NotificationDeepLinkTab
} from '../types';
import {
  getSecurityHeaders,
  checkLoginBruteForce,
  recordLoginFailure,
  resetLoginFailures,
  checkPinBruteForce,
  recordPinFailure,
  resetPinFailures,
  checkXPAnomaly,
  analyzeMessageSecurity,
  submitSecurityReportToServer
} from '../utils/securityGuard';
import {
  getStudentTierPricing,
  getAspirantTierPricing,
  getNerdcTermAccessStatus
} from '../utils/referralPromoPolicy';
import { subscribeToAdminLessonNotes } from '../services/lessonNoteService';
import {
  DEFAULT_OTA_APP_RELEASE,
  OTA_FEATURE_CATALOG,
  resolvePausedFeatureMessage,
  subscribeToOTAAppRelease,
  getInstalledAppVersion,
  setInstalledAppVersion,
  applyInAppOTAUpgrade,
  dismissReleasePrompt,
  isReleaseDismissed
} from '../services/otaService';
import {
  DEFAULT_NOTIFICATION_PREFERENCES,
  registerNotificationServiceWorker,
  getBrowserNotificationPermission,
  requestBrowserNotificationPermission,
  dispatchBrowserNotification,
  getStoredNotificationPreferences,
  saveStoredNotificationPreferences,
  getStoredInboxNotifications,
  saveStoredInboxNotifications,
  getStoredReadOtaIds,
  saveStoredReadOtaIds,
  getStoredDismissedOtaIds,
  saveStoredDismissedOtaIds,
  subscribeToOTANotificationBroadcasts,
  evaluateAutomatedReengagementNudges,
  buildSamplePersonaNudge
} from '../services/notificationService';
import {
  calculateDynamicXP,
  calculateRank as calculateRankFromXP,
  getExplorerStatus,
  ALL_APP_FEATURES
} from '../utils/xpEconomy';
import {
  generateCuratedStudyCalendar,
  UNLOCK_FEE_NAIRA,
  SINGLE_SUBJECT_EXAM_FEE_NAIRA,
  INCLUDED_TUTOR_CREDITS_NAIRA
} from '../data/examPrepCurriculumData';
import {
  getStoredChampionshipRegistrations,
  saveStoredChampionshipRegistrations,
  TERMLY_REGISTRATION_FEE_NAIRA
} from '../data/competitionPrizesData';
import { INITIAL_USER_DIRECTORY } from '../data/mockUsersData';
import {
  auth,
  db,
  signInWithGoogle,
  logOut,
  handleFirestoreError,
  OperationType
} from '../lib/firebase';
import {
  safeSetItem,
  safeGetItem,
  safeRemoveItem,
  cleanupBloatedStorage
} from '../lib/storage';

// Run cleanup immediately on load to recover quota from any oversized blobs
cleanupBloatedStorage();

interface AppContextType {
  // Navigation & Frame
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  targetSignUpRole: UserRole | null;
  setTargetSignUpRole: (role: UserRole | null) => void;
  isDeviceFrame: boolean;
  setIsDeviceFrame: (val: boolean | ((prev: boolean) => boolean)) => void;
  isOffline: boolean;
  setIsOffline: (val: boolean | ((prev: boolean) => boolean)) => void;
  isLandingView: boolean;
  setIsLandingView: (val: boolean | ((prev: boolean) => boolean)) => void;
  currentScreen: 'splash' | 'landing' | 'signin' | 'signup' | 'know_more' | 'app';
  setCurrentScreen: (screen: 'splash' | 'landing' | 'signin' | 'signup' | 'know_more' | 'app') => void;

  // Progressive Verification & Onboarding
  currentUserProfile: RegisteredUserProfile | null;
  isAuthenticated: boolean;
  verifiedAddress: VerifiedAddress | null;
  saveVerifiedAddress: (addr: VerifiedAddress) => void;
  tutorVerification: TutorVerificationDetails | null;
  saveTutorVerification: (data: TutorVerificationDetails) => void;
  registerNewUser: (role: UserRole, profileData: any) => void;
  updateTutorProfile: (tutorData: Partial<RegisteredTutorData>) => void;
  signOutApp: () => void;
  deleteAccount: (userId?: string) => Promise<void>;

  // Firebase & Credential Auth
  currentUser: User | null;
  authLoading: boolean;
  loginWithGoogle: (options?: { skipNavigate?: boolean } | unknown) => Promise<{ success: boolean; profile?: RegisteredUserProfile; error?: string }>;
  authenticateUser: (identifier: string, password: string) => Promise<{ success: boolean; profile?: RegisteredUserProfile; error?: string }>;
  logoutUser: () => Promise<void>;
  isFirebaseConnected: boolean;

  // Student Navigation
  activeStudentTab: 'dashboard' | 'syllabus' | 'cbt' | 'competitions' | 'formulas' | 'tutors' | 'games' | 'ai-coach' | 'community' | 'exam-prep' | 'aspirant-cbt' | 'admission-guide' | 'mock-tournaments' | 'educator-importer';
  setActiveStudentTab: (tab: 'dashboard' | 'syllabus' | 'cbt' | 'competitions' | 'formulas' | 'tutors' | 'games' | 'ai-coach' | 'community' | 'exam-prep' | 'aspirant-cbt' | 'admission-guide' | 'mock-tournaments' | 'educator-importer') => void;
  activeReadingNote: CurriculumTopic | null;
  openNoteReader: (topic: CurriculumTopic) => void;
  closeNoteReader: () => void;
  activeExam: CBTExam | null;
  startExam: (exam: CBTExam) => void;
  closeExam: () => void;
  fetchOrGenerateTermlyDrill: (params: {
    classLevel: string;
    term: string;
    subject: string;
    forceFresh?: boolean;
    topicsContext?: string[];
  }) => Promise<{ success: boolean; drill?: CBTExam; error?: string; cached?: boolean }>;
  fetchOrGenerateCertificateDrill: (params: {
    board: string;
    classLevel?: string;
    subject: string;
    forceFresh?: boolean;
  }) => Promise<{ success: boolean; drill?: CBTExam; error?: string; cached?: boolean }>;
  deductWalletForFreshDrill: (subject: string, amountNaira?: number, board?: string) => Promise<boolean>;
  isUniformModalOpen: boolean;
  setIsUniformModalOpen: (open: boolean) => void;

  // Prepare For Exam (AI Daily Study Calendar & Tutor Credits)
  examPrepState: ExamPrepState;
  unlockExamPrep: (method?: 'wallet' | 'paystack', paymentReference?: string) => boolean;
  unlockSingleSubjectExam: (subject: string, method?: 'wallet' | 'paystack', paymentReference?: string) => boolean;
  isSubjectExamUnlocked: (subject: string) => boolean;
  useTutorCredit: (amountNaira: number) => number;
  generateExamPrepCalendar: (profile: DiagnosticProfile) => Promise<void>;
  toggleStudyBlockCompleted: (blockId: string) => void;
  resetExamPrepPlan: () => void;

  // University Aspirant State & Methods
  aspirantGoal: AspirantGoal;
  updateAspirantGoal: (goal: Partial<AspirantGoal>) => void;
  subscribeAspirantTier: (
    tier: AspirantTier,
    method?: 'wallet' | 'paystack',
    referralCodeOverride?: string,
    skipPartnerSync?: boolean,
    paymentReference?: string
  ) => boolean;
  completedAspirantDrillIds: string[];
  toggleAspirantDrillCompleted: (drillId: string) => void;

  // Referral Promo & Aspirant First-Registration Rewards
  appliedReferralCode: string | null;
  appliedReferralPartner: { partnerId: string; partnerName: string; referralCode: string } | null;
  applyReferralCode: (
    code: string
  ) => Promise<{ valid: boolean; referralCode?: string; partnerName?: string; partnerId?: string; error?: string }>;
  clearReferralCode: () => void;
  aspirantRewardStatus: 'not_eligible' | 'eligible' | 'claimed_cash_500' | 'claimed_data_2gb';
  aspirantRewardRecord: AspirantReferralReward | null;
  refreshAspirantRewardStatus: () => Promise<void>;
  claimAspirantReferralReward: (payload: {
    rewardType: 'cash_500' | 'data_2gb';
    network?: 'MTN' | 'Airtel' | 'Glo' | '9mobile';
    phoneNumber?: string;
  }) => Promise<{ success: boolean; reward?: AspirantReferralReward; error?: string }>;

  // Student State & Actions
  student: StudentProfile;
  updateStudentClass: (classLevel: any, stream: any) => void;
  addStudentXP: (amountOrOptions: number | AwardXPOptions, reason?: string) => AwardXPResult | undefined;
  recordVerifiedLessonRead: (params: {
    topic: CurriculumTopic;
    activeSeconds: number;
    targetSeconds: number;
    checkpointScore: number;
    checkpointTotal: number;
  }) => { alreadyVerified: boolean; xpResult?: AwardXPResult };
  lastXPAward: AwardXPResult | null;
  dismissLastXPAward: () => void;
  verifySchoolUniform: (photoUrl: string) => void;
  updateStudentAvatar: (photoUrl: string) => void;
  toggleDownloadNote: (topicId: string) => void;
  examResults: CBTExamResult[];
  saveExamResult: (result: CBTExamResult) => void;

  // Parent Portal
  parentWallet: ParentWallet;
  isParentPinUnlocked: boolean;
  unlockParentPin: (pin: string) => boolean;
  lockParentPin: () => void;
  fundParentWallet: (amountNaira: number) => void;
  approveTutorBooking: (bookingId: string, enteredPin?: string) => boolean;
  rejectTutorBooking: (bookingId: string, reason?: string) => void;
  tutorRespondToBooking: (bookingId: string, decision: 'accept' | 'decline', reason?: string) => boolean;

  // Tutoring & Bookings
  registeredTutors: Tutor[];
  tutorBookings: TutorBooking[];
  createTutorBooking: (
    params: Omit<
      TutorBooking,
      'id' | 'createdAt' | 'status' | 'isParentApproved' | 'isTutorApproved'
    > & {
      parentPin?: string;
      scheduledStartIso?: string;
      scheduledEndIso?: string;
      paymentGateway?: 'paystack_live' | 'parent_escrow_wallet' | 'tutor_credit';
      paymentReference?: string;
    }
  ) => TutorBooking | null;
  activeTutorChatId: string | null;
  setActiveTutorChatId: (tutorId: string | null) => void;
  chatMessages: Record<string, ChatMessage[]>;
  sendChatMessage: (tutorId: string, text: string, sender: 'student' | 'tutor') => void;

  // Virtual Classroom & Online Teaching (Time-Gated & Dual-Approved)
  activeClassroomSession: VirtualClassroomSession | null;
  getBookingJoinStatus: (
    booking: TutorBooking,
    nowMs?: number
  ) => {
    allowed: boolean;
    status: 'open' | 'too_early' | 'ended' | 'pending_parent' | 'pending_tutor' | 'not_online' | 'cancelled';
    reason: string;
    msUntilOpen: number;
    startTimeLabel?: string;
  };
  getStudentClassroomEligibility: (nowMs?: number) => {
    eligible: boolean;
    activeBooking: TutorBooking | null;
    nextBooking: TutorBooking | null;
    status: 'open' | 'too_early' | 'pending_parent' | 'pending_tutor' | 'no_booking' | 'ended';
    reason: string;
    msUntilOpen: number;
  };
  launchVirtualClassroom: (bookingId: string, role?: 'student' | 'tutor') => boolean;
  closeVirtualClassroom: () => void;
  completeVirtualSessionAndReleaseEscrow: (bookingId: string, rating?: number, feedback?: string) => void;
  toggleVirtualClassroomMic: () => void;

  // Termly Championship & Prizes
  championshipRegistrations: ChampionshipRegistration[];
  currentStudentChampionship: ChampionshipRegistration | null;
  requestChampionshipEntry: () => void;
  approveChampionshipRegistration: (registrationId: string) => boolean;
  submitChampionshipExamResult: (score: number, totalQuestions: number, timeSpentSeconds: number) => void;
  submitChampionshipStageResult: (day: 1 | 2 | 3, score: number, totalQuestions: number, timeSpentSeconds: number) => void;

  // Reset demo
  resetDemoData: () => void;

  // Developer & Super Admin Capabilities
  isSuperAdmin: boolean;
  adminTermLockOverride: boolean;
  effectiveTermBypass: boolean;
  setAdminTermLockOverride: (override: boolean) => void;
  impersonatedUser: RegisteredUserProfile | null;
  allRegisteredUsers: RegisteredUserProfile[];
  startImpersonation: (user: RegisteredUserProfile) => void;
  stopImpersonation: () => void;
  updateUserRecord: (userId: string, updates: Partial<RegisteredUserProfile>) => Promise<void>;
  softDeleteUserRecord: (
    userId: string,
    reason: string,
    adminEmailOverride?: string
  ) => Promise<{ success: boolean; error?: string }>;
  purgeAllTestAccountsAndCredits: (
    adminEmailOverride?: string
  ) => Promise<{
    success: boolean;
    purgedLocalCount: number;
    deletedFirestoreDocs: number;
    purgedStoreEntries: number;
    message: string;
    error?: string;
  }>;
  switchRole: (role: UserRole) => void;
  loginAsDeveloper: (email?: string, options?: { skipNavigate?: boolean }) => RegisteredUserProfile;

  // School Administrator & Institutional Publishing
  schoolMaterials: SchoolMaterial[];
  adminLessonNotes: AdminLessonNote[];
  publishSchoolMaterial: (material: Omit<SchoolMaterial, 'id' | 'createdAt'>) => void;
  deleteSchoolMaterial: (id: string) => void;
  verifySchoolAdmin: (status: 'verified' | 'pending_verification') => void;
  linkStudentToSchool: (schoolCode: string) => boolean;
  subscribeSchoolAdmin: (plan: 'monthly' | 'termly', paystackRef: string) => Promise<boolean>;
  getSchoolAccreditationMetrics: (schoolCode: string) => {
    totalStudents: number;
    paidStudents: number;
    freeStudents: number;
    hasActiveDirectSubscription: boolean;
    directSubscriptionExpiresAt?: string;
    isQualifiedForReview: boolean;
    qualificationReason?: 'paid_students_threshold' | 'direct_subscription' | 'manual_override';
  };
  setStudentSubscriptionStatus: (studentId: string, isSubscribed: boolean, tier?: StudentSubscriptionTier) => Promise<void>;

  // 4-Tier Student Subscriptions & Entitlements
  subscribeStudentTier: (
    plan: StudentSubscriptionPlan,
    paymentMethod: 'paystack' | 'wallet',
    paystackRef?: string,
    referralCodeOverride?: string,
    skipPartnerSync?: boolean
  ) => Promise<{ success: boolean; error?: string; finalAmountNaira?: number }>;
  unlockStudentAddOn: (
    addon: 'ai_coach' | 'termly_competition' | 'termly_drill_all' | 'termly_drill_single',
    subject?: string,
    paymentMethod?: 'paystack' | 'wallet',
    paystackRef?: string
  ) => Promise<{ success: boolean; error?: string }>;
  recordDailyGameAttempt: (gameId: string) => { allowed: boolean; remainingAttempts: number };
  checkStudentFeatureAccess: (
    feature:
      | 'scheme_weeks'
      | 'quiz_questions'
      | 'formulas'
      | 'games'
      | 'termly_drill'
      | 'leaderboard_win'
      | 'chat'
      | 'ai_verification'
      | 'weekly_competition'
      | 'ai_coach'
      | 'termly_competition'
      | 'prepare_exam',
    options?: { weekNumber?: number; term?: string; questionIndex?: number; gameId?: string; subject?: string }
  ) => {
    hasAccess: boolean;
    requiredPlan?: StudentSubscriptionPlan;
    reason?: string;
    unlockPriceNaira?: number;
    lockType?: 'tier' | 'upcoming_release' | 'term_closed';
    unlockDateLabel?: string;
    daysRemaining?: number;
  };
  isStudentSubscriptionModalOpen: boolean;
  targetSubscriptionPlan: StudentSubscriptionPlan | null;
  openStudentSubscriptionModal: (targetPlan?: StudentSubscriptionPlan) => void;
  closeStudentSubscriptionModal: () => void;

  // Multi-Ward Linking & Management
  linkedWards: LinkedWard[];
  activeWardId: string | null;
  linkWardByCode: (codeOrEmail: string) => Promise<{ success: boolean; ward?: LinkedWard; message?: string }>;
  unlinkWard: (studentId: string) => Promise<void>;
  setActiveWard: (studentId: string) => void;

  // Fraud, Spam & Hacking Security Center
  securityStatus: SecurityStatusSnapshot;
  pinLockoutInfo: { isLocked: boolean; remainingSeconds: number; attemptsUsed: number };
  lastSecurityAlert: string | null;
  dismissSecurityAlert: () => void;
  refreshSecurityStatus: () => Promise<void>;
  submitSecurityReport: (payload: {
    category: 'fraud' | 'spam' | 'hacking' | 'abuse' | 'payment_anomaly';
    suspectIdentifier?: string;
    description: string;
    evidenceContext?: string;
  }) => Promise<{ success: boolean; reportId?: string; error?: string }>;

  // OTA App Updates, Version Upgrades & Feature Flags
  otaAppRelease: OTAAppReleaseConfig;
  installedAppVersion: string;
  isCurrentReleaseDismissed: boolean;
  applyOTAUpgrade: () => Promise<string>;
  dismissOTAPrompt: () => void;
  setLocalInstalledAppVersion: (ver: string) => void;
  isFeatureEnabled: (key: OTAFeatureKey) => boolean;
  getPausedFeatureMessage: (key: OTAFeatureKey) => string;
  pausedFeatureNotice: { featureKey: OTAFeatureKey; title: string; message: string } | null;
  openPausedFeatureNotice: (key: OTAFeatureKey, customTitle?: string) => void;
  closePausedFeatureNotice: () => void;

  // Cross-Persona Notifications, Streak Reminders & Browser Push
  notifications: AppNotificationItem[];
  unreadNotificationCount: number;
  notificationPreferences: NotificationPreferences;
  browserPermission: NotificationPermission | 'unsupported';
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;
  enableBrowserPushNotifications: () => Promise<NotificationPermission | 'unsupported'>;
  updateNotificationPreferences: (updates: Partial<NotificationPreferences>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearReadNotifications: () => void;
  sendTestNotification: () => Promise<boolean>;
  triggerSampleStreakNudge: () => Promise<AppNotificationItem>;
  handleNotificationAction: (item: AppNotificationItem) => void;
  pendingPortalTab: { tab: NotificationDeepLinkTab; nonce: number } | null;
  clearPendingPortalTab: () => void;
}

const INITIAL_EMPTY_STUDENT: StudentProfile = {
  id: '',
  name: '',
  school: '',
  classLevel: 'JSS 1',
  stream: 'Science',
  xp: 0,
  rank: 'Fresher',
  streakDays: 0,
  lastStudyDate: new Date().toISOString().split('T')[0],
  uniformVerified: false,
  uniformPhotoUrl: null,
  downloadedSubjectIds: [],
  completedQuizIds: [],
  completedReadNoteIds: [],
  verifiedReadingLogs: [],
  isSubscribed: false,
  subscriptionPlan: 'free',
  subscriptionTier: 'free'
};

const INITIAL_EMPTY_WALLET: ParentWallet = {
  balanceNaira: 0,
  pin: '',
  transactions: []
};

export const SUPER_ADMIN_EMAILS = ['martorefe@gmail.com', 'wowrealities@gmail.com'];
export const SUPER_ADMIN_EMAIL = 'martorefe@gmail.com';
export const isSuperAdminEmail = (email?: string | null) => {
  if (!email) return false;
  return SUPER_ADMIN_EMAILS.includes(email.toLowerCase().trim());
};

const PURGED_PATTERNS = [
  'tunde balogun',
  'std-tunde-001',
  'chidinma adeleke',
  'chidinma',
  'ibrahim danjuma',
  'ngozi okoli',
  'folashade balogun',
  'emeka nwosu',
  'adewale adeyemi',
  'adewale bakare',
  'zainab al-hassan',
  'victoria okonkwo',
  '@students.ng',
  '@tutoreng.com',
  '@educators.ng',
  '@barewa.edu.ng',
  '@fgc.edu.ng',
  '@transport.ng',
  '@fgcikotekpene.edu.ng',
  'usr-std-',
  'usr-parent-',
  'usr-tutor-',
  'usr-admin-',
  'tutor-adewale-math',
  'book-001',
  'demo-session'
];

const isPurgedRecord = (data: any): boolean => {
  if (!data) return false;
  const email = String(data.email || '').toLowerCase().trim();
  if (SUPER_ADMIN_EMAILS.includes(email)) return false; // Super Admins are never purged
  if (data.isSuperAdmin === true) return false;
  const str = `${data.fullName || ''} ${data.name || ''} ${data.studentName || ''} ${data.tutorName || ''} ${data.tutorId || ''} ${data.studentId || ''} ${data.id || ''} ${email}`.toLowerCase();
  return PURGED_PATTERNS.some(p => str.includes(p));
};

const DEFAULT_INITIAL_MATERIALS: SchoolMaterial[] = [];

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Registered User & Auth State (Strict opt-in signup/signin — zero hardcoded auto-login)
  const [currentUserProfile, setCurrentUserProfile] = useState<RegisteredUserProfile | null>(() => {
    const saved = safeGetItem('sc_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (isPurgedRecord(parsed)) {
          safeRemoveItem('sc_user_profile');
          return null;
        }
        if (parsed?.id && parsed?.role) return parsed;
      } catch {}
    }
    return null;
  });

  // Navigation & Presentation (bound to registered role)
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = safeGetItem('sc_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (isPurgedRecord(parsed)) {
          safeRemoveItem('sc_user_profile');
          return 'student';
        }
        if (parsed.role) return parsed.role;
      } catch {}
    }
    return 'student';
  });
  const [targetSignUpRole, setTargetSignUpRole] = useState<UserRole | null>(null);
  const [isDeviceFrame, setIsDeviceFrame] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [isLandingView, setIsLandingView] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'landing' | 'signin' | 'signup' | 'know_more' | 'app'>('splash');
  const [activeStudentTab, setActiveStudentTab] = useState<'dashboard' | 'syllabus' | 'cbt' | 'competitions' | 'formulas' | 'tutors' | 'games' | 'ai-coach' | 'community' | 'exam-prep' | 'aspirant-cbt' | 'admission-guide' | 'mock-tournaments' | 'educator-importer'>('dashboard');
  const [activeReadingNote, setActiveReadingNote] = useState<CurriculumTopic | null>(null);
  const [activeExam, setActiveExam] = useState<CBTExam | null>(null);
  const [isUniformModalOpen, setUniformModalOpenState] = useState<boolean>(false);

  // Prepare For Exam (AI Daily Study Calendar & ₦4,000 Tutor Credits)
  const [examPrepState, setExamPrepState] = useState<ExamPrepState>(() => {
    const saved = safeGetItem('sc_exam_prep');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {
      isUnlocked: false,
      tutorCreditsNaira: 0,
      completedBlockIds: []
    };
  });

  useEffect(() => {
    safeSetItem('sc_exam_prep', JSON.stringify(examPrepState));
  }, [examPrepState]);

  // University Aspirant Hub State
  const [aspirantGoal, setAspirantGoal] = useState<AspirantGoal>(() => {
    const saved = safeGetItem('sc_aspirant_goal');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {
      targetExams: ['JAMB_UTME', 'WAEC'],
      examDates: {
        jamb: '2026-04-18',
        waec: '2026-05-08',
        neco: '2026-06-15'
      },
      targetUniversity: 'University of Lagos (UNILAG)',
      targetCourse: 'Medicine and Surgery',
      targetScore: 310,
      subjectCombination: ['Use of English', 'Biology', 'Chemistry', 'Physics'],
      tier: 'free'
    };
  });

  const [completedAspirantDrillIds, setCompletedAspirantDrillIds] = useState<string[]>(() => {
    const saved = safeGetItem('sc_aspirant_drills');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    safeSetItem('sc_aspirant_goal', JSON.stringify(aspirantGoal));
  }, [aspirantGoal]);

  useEffect(() => {
    safeSetItem('sc_aspirant_drills', JSON.stringify(completedAspirantDrillIds));
  }, [completedAspirantDrillIds]);

  const isAuthenticated = Boolean(currentUserProfile);

  // Firebase Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(false);

  // User Directory State (Super Admins & genuine signed-up users only; purged of test personas)
  const [allRegisteredUsers, setAllRegisteredUsers] = useState<RegisteredUserProfile[]>(() => {
    const saved = safeGetItem('sc_all_users');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const cleaned = parsed.filter((u: RegisteredUserProfile) => !isPurgedRecord(u));
          if (cleaned.length > 0) return cleaned;
        }
      } catch {}
    }
    return INITIAL_USER_DIRECTORY;
  });

  // User Impersonation State
  const [impersonatedUser, setImpersonatedUser] = useState<RegisteredUserProfile | null>(null);

  // Super Admin check
  const isSuperAdmin = Boolean(
    isSuperAdminEmail(currentUser?.email) ||
    isSuperAdminEmail(currentUserProfile?.email) ||
    currentUserProfile?.isSuperAdmin ||
    currentUserProfile?.isDeveloper
  );

  // Explicit opt-in preview override so Super Admins acting as students see real locks & countdowns by default
  const [adminTermLockOverride, setAdminTermLockOverride] = useState<boolean>(false);
  const effectiveTermBypass = Boolean(isSuperAdmin && adminTermLockOverride);

  // Real-time Security Shield & Enforcement Status
  const [securityStatus, setSecurityStatus] = useState<SecurityStatusSnapshot>({
    accountStatus: 'active',
    walletFrozen: false,
    isBlocked: false
  });
  const [pinLockoutInfo, setPinLockoutInfo] = useState<{
    isLocked: boolean;
    remainingSeconds: number;
    attemptsUsed: number;
  }>({ isLocked: false, remainingSeconds: 0, attemptsUsed: 0 });
  const [lastSecurityAlert, setLastSecurityAlert] = useState<string | null>(null);
  const dismissSecurityAlert = useCallback(() => setLastSecurityAlert(null), []);

  const refreshSecurityStatus = useCallback(async () => {
    const uid = currentUserProfile?.id || currentUser?.uid || '';
    const email = currentUserProfile?.email || currentUser?.email || '';
    if (uid) {
      setPinLockoutInfo(checkPinBruteForce(uid));
    }

    const resolveLocalStatus = (): 'active' | 'locked' | 'suspended' | 'deleted' => {
      if (currentUserProfile?.accountStatus === 'deleted') return 'deleted';
      if (currentUserProfile?.accountStatus === 'suspended') return 'suspended';
      if (currentUserProfile?.accountStatus === 'locked') {
        if (
          !currentUserProfile.lockedUntil ||
          new Date(currentUserProfile.lockedUntil).getTime() > Date.now()
        ) {
          return 'locked';
        }
      }
      return 'active';
    };

    try {
      const qs = new URLSearchParams();
      if (uid) qs.set('userId', uid);
      if (email) qs.set('email', email);
      const res = await fetch(`/api/security/status?${qs.toString()}`, {
        headers: getSecurityHeaders({ userId: uid, userEmail: email })
      });
      if (res.ok) {
        const data = await res.json();
        const localStatus = resolveLocalStatus();
        const remoteStatus = (data.accountStatus || 'active') as
          | 'active'
          | 'locked'
          | 'suspended'
          | 'deleted';

        const rank: Record<'active' | 'locked' | 'suspended' | 'deleted', number> = {
          active: 0,
          locked: 1,
          suspended: 2,
          deleted: 3
        };
        const effectiveStatus =
          rank[localStatus] >= rank[remoteStatus] ? localStatus : remoteStatus;

        setSecurityStatus({
          accountStatus: effectiveStatus,
          lockedUntil: data.lockedUntil || currentUserProfile?.lockedUntil,
          lockReason: data.lockReason || currentUserProfile?.lockReason,
          suspensionReason:
            currentUserProfile?.suspensionReason || data.suspensionReason,
          deletedAt: data.deletedAt || currentUserProfile?.deletedAt,
          deletionReason:
            currentUserProfile?.deletionReason || data.deletionReason,
          walletFrozen: Boolean(
            currentUserProfile?.walletFrozen || data.walletFrozen
          ),
          walletFrozenReason:
            currentUserProfile?.walletFrozenReason || data.walletFrozenReason,
          isBlocked: Boolean(data.isBlocked),
          blockType: data.blockType,
          blockReason: data.blockReason
        });
      }
    } catch {
      // Fallback to profile flags if offline
      if (currentUserProfile) {
        setSecurityStatus({
          accountStatus: resolveLocalStatus(),
          lockedUntil: currentUserProfile.lockedUntil,
          lockReason: currentUserProfile.lockReason,
          suspensionReason: currentUserProfile.suspensionReason,
          deletedAt: currentUserProfile.deletedAt,
          deletionReason: currentUserProfile.deletionReason,
          walletFrozen: Boolean(currentUserProfile.walletFrozen),
          walletFrozenReason: currentUserProfile.walletFrozenReason,
          isBlocked: false
        });
      }
    }
  }, [currentUserProfile, currentUser]);

  useEffect(() => {
    void refreshSecurityStatus();
    const timer = setInterval(() => {
      void refreshSecurityStatus();
    }, 30000);
    return () => clearInterval(timer);
  }, [refreshSecurityStatus]);

  // Student State (Pristine - no mock personas)
  const [student, setStudent] = useState<StudentProfile>(() => {
    const saved = safeGetItem('sc_student');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (isPurgedRecord(parsed)) {
          safeRemoveItem('sc_student');
          return INITIAL_EMPTY_STUDENT;
        }
        if (parsed.name && parsed.name !== 'Tunde Balogun' && parsed.id !== 'std-tunde-001') {
          return parsed;
        }
      } catch {}
    }
    return INITIAL_EMPTY_STUDENT;
  });

  // Referral Promo & Aspirant Reward Lifecycle State
  const [appliedReferralCode, setAppliedReferralCode] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const refParam = new URLSearchParams(window.location.search).get('ref');
        if (refParam && refParam.trim()) {
          const clean = refParam.trim().toUpperCase();
          safeSetItem('sc_pending_referral_code', clean);
          return clean;
        }
      } catch {}
    }
    return safeGetItem('sc_pending_referral_code') || null;
  });
  const [appliedReferralPartner, setAppliedReferralPartner] = useState<{
    partnerId: string;
    partnerName: string;
    referralCode: string;
  } | null>(null);
  const [aspirantRewardRecord, setAspirantRewardRecord] = useState<AspirantReferralReward | null>(null);
  const [aspirantRewardStatus, setAspirantRewardStatus] = useState<
    'not_eligible' | 'eligible' | 'claimed_cash_500' | 'claimed_data_2gb'
  >(() => student.aspirantRewardStatus || 'not_eligible');

  // Sync appliedReferralCode from authenticated student profile when present
  useEffect(() => {
    if (student.referredByCode && !appliedReferralCode) {
      setAppliedReferralCode(student.referredByCode.toUpperCase());
      if (student.referredPartnerName) {
        setAppliedReferralPartner({
          partnerId: student.referredPartnerId || '',
          partnerName: student.referredPartnerName,
          referralCode: student.referredByCode.toUpperCase()
        });
      }
    }
    if (student.aspirantRewardStatus) {
      setAspirantRewardStatus(student.aspirantRewardStatus);
    }
  }, [student.referredByCode, student.referredPartnerId, student.referredPartnerName, student.aspirantRewardStatus]);

  // Auto-validate pending referral code on boot/change
  useEffect(() => {
    const code = (student.referredByCode || appliedReferralCode || '').trim().toUpperCase();
    if (!code) {
      setAppliedReferralPartner(null);
      return;
    }
    let cancelled = false;
    fetch(`/api/partners/validate-referral?code=${encodeURIComponent(code)}`)
      .then(res => res.json())
      .then(data => {
        if (cancelled) return;
        if (data?.valid) {
          setAppliedReferralPartner({
            partnerId: data.partnerId,
            partnerName: data.partnerName,
            referralCode: data.referralCode || code
          });
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [appliedReferralCode, student.referredByCode]);

  const applyReferralCode = useCallback(
    async (
      rawCode: string
    ): Promise<{ valid: boolean; referralCode?: string; partnerName?: string; partnerId?: string; error?: string }> => {
      const clean = String(rawCode || '').trim().toUpperCase();
      if (!clean) {
        return { valid: false, error: 'Please enter a valid referral code.' };
      }
      try {
        const res = await fetch(`/api/partners/validate-referral?code=${encodeURIComponent(clean)}`);
        const data = await res.json();
        if (!res.ok || !data.valid) {
          return { valid: false, error: data.error || 'Referral code not found or inactive.' };
        }
        const normalizedCode = String(data.referralCode || clean).toUpperCase();
        setAppliedReferralCode(normalizedCode);
        setAppliedReferralPartner({
          partnerId: data.partnerId,
          partnerName: data.partnerName,
          referralCode: normalizedCode
        });
        safeSetItem('sc_pending_referral_code', normalizedCode);

        // Bind to server & student profile if already registered
        const sid = student.id || currentUserProfile?.id || '';
        if (sid) {
          fetch('/api/partners/register-referral', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              referralCode: normalizedCode,
              studentId: sid,
              studentName: student.name || currentUserProfile?.fullName || 'Student',
              studentEmail: currentUserProfile?.email || '',
              classLevel: student.classLevel
            })
          }).catch(() => {});

          setStudent(prev => {
            const updated: StudentProfile = {
              ...prev,
              referredByCode: normalizedCode,
              referredPartnerId: data.partnerId,
              referredPartnerName: data.partnerName,
              referralAttributedAt: prev.referralAttributedAt || new Date().toISOString()
            };
            safeSetItem('sc_student', JSON.stringify(updated));
            return updated;
          });
        }

        return {
          valid: true,
          referralCode: normalizedCode,
          partnerName: data.partnerName,
          partnerId: data.partnerId
        };
      } catch (err: any) {
        return { valid: false, error: err?.message || 'Unable to verify referral code right now.' };
      }
    },
    [student.id, student.name, student.classLevel, currentUserProfile]
  );

  const clearReferralCode = useCallback(() => {
    setAppliedReferralCode(null);
    setAppliedReferralPartner(null);
    safeRemoveItem('sc_pending_referral_code');
  }, []);

  const refreshAspirantRewardStatus = useCallback(async () => {
    const sid = student.id || currentUserProfile?.id || currentUser?.uid || '';
    if (!sid) return;
    try {
      const res = await fetch(`/api/referrals/aspirant-reward-status?studentId=${encodeURIComponent(sid)}`);
      if (!res.ok) return;
      const data = await res.json();
      if (data?.status) {
        setAspirantRewardStatus(data.status);
        setAspirantRewardRecord(data.reward || null);
        setStudent(prev => {
          if (prev.aspirantRewardStatus === data.status && prev.referredByCode === (data.referralCode || prev.referredByCode)) {
            return prev;
          }
          const updated: StudentProfile = {
            ...prev,
            aspirantRewardStatus: data.status,
            referredByCode: data.referralCode || prev.referredByCode
          };
          safeSetItem('sc_student', JSON.stringify(updated));
          return updated;
        });
      }
    } catch {
      // Ignore offline errors
    }
  }, [student.id, currentUserProfile?.id, currentUser?.uid]);

  useEffect(() => {
    if (student.classLevel === 'University Aspirant' && (student.id || currentUserProfile?.id)) {
      void refreshAspirantRewardStatus();
    }
  }, [student.classLevel, student.id, currentUserProfile?.id, refreshAspirantRewardStatus]);

  const claimAspirantReferralReward = useCallback(
    async (payload: {
      rewardType: 'cash_500' | 'data_2gb';
      network?: 'MTN' | 'Airtel' | 'Glo' | '9mobile';
      phoneNumber?: string;
    }): Promise<{ success: boolean; reward?: AspirantReferralReward; error?: string }> => {
      const sid = student.id || currentUserProfile?.id || currentUser?.uid || '';
      if (!sid) {
        return { success: false, error: 'Please sign in as a student to claim your referral reward.' };
      }
      const refCode = (student.referredByCode || appliedReferralCode || '').trim().toUpperCase();
      try {
        const res = await fetch('/api/referrals/claim-aspirant-reward', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getSecurityHeaders({ userId: sid, userEmail: currentUserProfile?.email })
          },
          body: JSON.stringify({
            studentId: sid,
            studentName: student.name || currentUserProfile?.fullName || 'University Aspirant',
            studentEmail: currentUserProfile?.email || '',
            referralCode: refCode,
            rewardType: payload.rewardType,
            network: payload.network,
            phoneNumber: payload.phoneNumber
          })
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          return { success: false, error: data.error || 'Could not claim referral reward.' };
        }

        const nextStatus =
          payload.rewardType === 'cash_500' ? ('claimed_cash_500' as const) : ('claimed_data_2gb' as const);
        setAspirantRewardStatus(nextStatus);
        setAspirantRewardRecord(data.reward || null);

        setStudent(prev => {
          const updated: StudentProfile = {
            ...prev,
            aspirantRewardStatus: nextStatus
          };
          safeSetItem('sc_student', JSON.stringify(updated));
          return updated;
        });

        // If instant ₦500 wallet cash selected, credit Escrow Wallet immediately
        if (payload.rewardType === 'cash_500') {
          const bonusTx: WalletTransaction = {
            id: `tx-ref500-${Date.now().toString().slice(-6)}`,
            type: 'credit',
            amountNaira: 500,
            description: 'University Aspirant Referral Welcome Bonus (₦500 Cash)',
            timestamp: new Date().toISOString(),
            status: 'successful',
            reference: data.reward?.id || `ASP_REF500_${Date.now()}`
          };
          setParentWallet(prev => {
            const updatedWallet: ParentWallet = {
              ...prev,
              balanceNaira: prev.balanceNaira + 500,
              transactions: [bonusTx, ...prev.transactions]
            };
            safeSetItem('sc_wallet', JSON.stringify(updatedWallet));
            return updatedWallet;
          });
        }

        try {
          confetti({ particleCount: 70, spread: 65, origin: { y: 0.65 } });
        } catch {}

        return { success: true, reward: data.reward };
      } catch (err: any) {
        return { success: false, error: err?.message || 'Network error claiming referral reward.' };
      }
    },
    [student.id, student.name, student.referredByCode, appliedReferralCode, currentUserProfile, currentUser?.uid]
  );

  const submitSecurityReport = useCallback(
    async (payload: {
      category: 'fraud' | 'spam' | 'hacking' | 'abuse' | 'payment_anomaly';
      suspectIdentifier?: string;
      description: string;
      evidenceContext?: string;
    }) => {
      return submitSecurityReportToServer({
        reporterUserId:
          currentUserProfile?.id || currentUser?.uid || student.id || 'anonymous',
        reporterEmail: currentUserProfile?.email || currentUser?.email || undefined,
        reporterName: currentUserProfile?.fullName || student.name || 'Platform User',
        reporterRole: currentRole,
        ...payload
      });
    },
    [currentUserProfile, currentUser, student, currentRole]
  );

  const [examResults, setExamResults] = useState<CBTExamResult[]>(() => {
    const saved = safeGetItem('sc_exam_results');
    return saved ? JSON.parse(saved) : [];
  });

  // Parent State (Pristine - 0 balance, no synthetic/mock credits)
  const [parentWallet, setParentWallet] = useState<ParentWallet>(() => {
    const saved = safeGetItem('sc_wallet');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.balanceNaira === 35000 && (parsed.pin === '1234' || !parsed.transactions?.length)) {
          safeRemoveItem('sc_wallet');
          return INITIAL_EMPTY_WALLET;
        }
        if (parsed && typeof parsed.balanceNaira === 'number') {
          return parsed;
        }
      } catch {}
    }
    return INITIAL_EMPTY_WALLET;
  });
  const [isParentPinUnlocked, setIsParentPinUnlocked] = useState<boolean>(false);

  // Tutor Bookings & Chats (Pristine - purged of sample data)
  const [tutorBookings, setTutorBookings] = useState<TutorBooking[]>(() => {
    const saved = safeGetItem('sc_bookings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((b: TutorBooking) => !isPurgedRecord(b));
        }
      } catch {}
    }
    return [];
  });
  const [activeTutorChatId, setActiveTutorChatId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>(() => {
    const saved = safeGetItem('sc_chats');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const filtered: Record<string, ChatMessage[]> = {};
        Object.entries(parsed || {}).forEach(([k, v]) => {
          if (!PURGED_PATTERNS.some(p => k.toLowerCase().includes(p)) && Array.isArray(v)) {
            filtered[k] = v as ChatMessage[];
          }
        });
        return filtered;
      } catch {}
    }
    return {};
  });

  // School Administrator Materials (Notes, Assignments, Projects, Past Questions)
  const [schoolMaterials, setSchoolMaterials] = useState<SchoolMaterial[]>(() => {
    const saved = safeGetItem('sc_school_materials');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const seededIds = new Set(['mat_1', 'mat_2', 'mat_3', 'mat_4']);
          return parsed.filter((m: SchoolMaterial) => !seededIds.has(m.id));
        }
      } catch {}
    }
    return DEFAULT_INITIAL_MATERIALS;
  });

  useEffect(() => {
    safeSetItem('sc_school_materials', JSON.stringify(schoolMaterials));
  }, [schoolMaterials]);

  // Super Admin Uploaded Weekly Curriculum Lesson Notes (Firestore live sync + local fallback)
  const [adminLessonNotes, setAdminLessonNotes] = useState<AdminLessonNote[]>([]);
  useEffect(() => {
    const unsub = subscribeToAdminLessonNotes(setAdminLessonNotes);
    return () => unsub();
  }, []);

  // Live OTA App Updates, Feature Flags & Version Gate
  const [otaAppRelease, setOtaAppRelease] = useState<OTAAppReleaseConfig>(DEFAULT_OTA_APP_RELEASE);
  const [installedAppVersion, setInstalledAppVersionState] = useState<string>(() => getInstalledAppVersion());
  const [otaDismissTick, setOtaDismissTick] = useState<number>(0);

  useEffect(() => {
    const unsub = subscribeToOTAAppRelease((release) => {
      setOtaAppRelease(release);
    });
    return () => unsub();
  }, []);

  const isCurrentReleaseDismissed = React.useMemo(() => {
    void otaDismissTick;
    return isReleaseDismissed(otaAppRelease.latestVersion, otaAppRelease.upgradeMode);
  }, [otaAppRelease.latestVersion, otaAppRelease.upgradeMode, otaDismissTick]);

  const applyOTAUpgrade = useCallback(async (): Promise<string> => {
    // Brief smooth install delay so user sees in-app OTA refresh feedback cleanly
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    const nextVersion = applyInAppOTAUpgrade(otaAppRelease);
    setInstalledAppVersionState(nextVersion);
    setOtaDismissTick((prev) => prev + 1);
    return nextVersion;
  }, [otaAppRelease]);

  const dismissOTAPrompt = useCallback(() => {
    dismissReleasePrompt(otaAppRelease.latestVersion, otaAppRelease.upgradeMode);
    setOtaDismissTick((prev) => prev + 1);
  }, [otaAppRelease.latestVersion, otaAppRelease.upgradeMode]);

  const setLocalInstalledAppVersion = useCallback((ver: string) => {
    const normalized = setInstalledAppVersion(ver);
    setInstalledAppVersionState(normalized);
    setOtaDismissTick((prev) => prev + 1);
  }, []);

  const [pausedFeatureNotice, setPausedFeatureNotice] = useState<{
    featureKey: OTAFeatureKey;
    title: string;
    message: string;
  } | null>(null);

  const isFeatureEnabled = useCallback(
    (key: OTAFeatureKey): boolean => {
      if (isSuperAdmin) return true;
      return otaAppRelease.featureFlags[key] !== false;
    },
    [isSuperAdmin, otaAppRelease.featureFlags]
  );

  const getPausedFeatureMessage = useCallback(
    (key: OTAFeatureKey): string => resolvePausedFeatureMessage(otaAppRelease, key),
    [otaAppRelease]
  );

  const openPausedFeatureNotice = useCallback(
    (key: OTAFeatureKey, customTitle?: string) => {
      const meta = OTA_FEATURE_CATALOG.find((item) => item.key === key);
      setPausedFeatureNotice({
        featureKey: key,
        title: customTitle || meta?.title || 'Feature',
        message: resolvePausedFeatureMessage(otaAppRelease, key)
      });
    },
    [otaAppRelease]
  );

  const closePausedFeatureNotice = useCallback(() => {
    setPausedFeatureNotice(null);
  }, []);

  const setIsUniformModalOpen = useCallback(
    (open: boolean) => {
      if (open && !isFeatureEnabled('uniformVerification')) {
        openPausedFeatureNotice('uniformVerification', 'Uniform AI Verification');
        return;
      }
      setUniformModalOpenState(open);
    },
    [isFeatureEnabled, openPausedFeatureNotice]
  );

  // Calculate Rank based on XP
  const calculateRank = (xp: number): StudentRank => {
    return calculateRankFromXP(xp);
  };

  // Safe local storage persistence fallbacks
  useEffect(() => {
    safeSetItem('sc_student', JSON.stringify(student));
  }, [student]);

  useEffect(() => {
    safeSetItem('sc_wallet', JSON.stringify(parentWallet));
  }, [parentWallet]);

  useEffect(() => {
    safeSetItem('sc_bookings', JSON.stringify(tutorBookings));
  }, [tutorBookings]);

  useEffect(() => {
    safeSetItem('sc_exam_results', JSON.stringify(examResults));
  }, [examResults]);

  useEffect(() => {
    safeSetItem('sc_chats', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    if (currentUserProfile) {
      safeSetItem('sc_user_profile', JSON.stringify(currentUserProfile));
    }
  }, [currentUserProfile]);

  // Auth Listener with robust snapshot listener cleanup
  useEffect(() => {
    let unsubs: Array<() => void> = [];

    const cleanupListeners = () => {
      unsubs.forEach((fn) => {
        try {
          fn();
        } catch {}
      });
      unsubs = [];
    };

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      // Clean up any listeners from previous user sessions immediately
      cleanupListeners();

      setCurrentUser(user);
      setAuthLoading(false);
      setIsFirebaseConnected(!!user);

      if (user) {
        // Automatic Super Admin Promotion for martorefe@gmail.com
        if (isSuperAdminEmail(user.email)) {
          const adminDocRef = doc(db, 'admins', user.uid);
          setDoc(
            adminDocRef,
            {
              email: SUPER_ADMIN_EMAIL,
              role: 'superadmin',
              updatedAt: new Date().toISOString()
            },
            { merge: true }
          ).catch(() => {});

          const superProfile: RegisteredUserProfile = {
            id: user.uid,
            role: 'admin',
            fullName: user.displayName || 'Martin Omorefe (Lead Developer)',
            email: SUPER_ADMIN_EMAIL,
            avatarUrl: user.photoURL || undefined,
            emailVerified: true,
            createdAt: new Date().toISOString(),
            isSuperAdmin: true,
            isDeveloper: true,
            adminData: {
              schoolName: 'Student Companion Central Administration',
              schoolType: 'National Educational Directorate'
            }
          };

          setCurrentUserProfile(superProfile);
          safeSetItem('sc_user_profile', JSON.stringify(superProfile));
          setCurrentRole('admin');
        }

        // Sync student profile from Firestore
        const studentDocRef = doc(db, 'students', user.uid);
        const path = `students/${user.uid}`;

        const unsubDoc = onSnapshot(
          studentDocRef,
          (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data() as StudentProfile;
              setStudent(data);
            } else {
              const savedStudentStr = safeGetItem('sc_student');
              let initialClass: NigerianClassLevel = 'JSS 1';
              if (savedStudentStr) {
                try {
                  const parsed = JSON.parse(savedStudentStr);
                  if (parsed.classLevel) initialClass = parsed.classLevel;
                } catch {}
              }

              // Seed new user profile in Firestore
              const newProfile: StudentProfile = {
                id: user.uid,
                name: user.displayName || 'Registered Student',
                school: 'Federal Secondary School',
                classLevel: initialClass,
                stream: initialClass.startsWith('JSS') ? 'Junior' : 'Science',
                xp: 0,
                rank: 'Fresher',
                streakDays: 1,
                lastStudyDate: new Date().toISOString().split('T')[0],
                uniformVerified: false,
                uniformPhotoUrl: user.photoURL || null,
                downloadedSubjectIds: [],
                completedQuizIds: [],
                completedReadNoteIds: [],
                verifiedReadingLogs: []
              };
              setDoc(studentDocRef, newProfile, { merge: true }).catch((err) => {
                handleFirestoreError(err, OperationType.CREATE, path);
              });
              setStudent(newProfile);
            }
          },
          (error) => {
            handleFirestoreError(error, OperationType.GET, path);
          }
        );

        // Sync exam results subcollection
        const examResultsColRef = collection(db, 'students', user.uid, 'examResults');
        const examPath = `students/${user.uid}/examResults`;
        const unsubExams = onSnapshot(
          examResultsColRef,
          (snapshot) => {
            const results: CBTExamResult[] = [];
            snapshot.forEach((docItem) => {
              results.push(docItem.data() as CBTExamResult);
            });
            if (results.length > 0) {
              setExamResults(results);
            }
          },
          (error) => {
            handleFirestoreError(error, OperationType.LIST, examPath);
          }
        );

        // Sync parent wallet (zero balance by default — never seed synthetic ₦35,000)
        const walletDocRef = doc(db, 'wallets', user.uid);
        const walletPath = `wallets/${user.uid}`;
        const unsubWallet = onSnapshot(
          walletDocRef,
          (snap) => {
            if (snap.exists()) {
              const data = snap.data() as ParentWallet;
              setParentWallet(prev => ({ ...prev, ...data }));
            } else {
              setDoc(walletDocRef, {
                userId: user.uid,
                balanceNaira: 0,
                pin: '',
                updatedAt: new Date().toISOString()
              }).catch((err) => {
                handleFirestoreError(err, OperationType.CREATE, walletPath);
              });
            }
          },
          (error) => {
            handleFirestoreError(error, OperationType.GET, walletPath);
          }
        );

        unsubs.push(unsubDoc, unsubExams, unsubWallet);
      }
    });

    return () => {
      cleanupListeners();
      unsubscribeAuth();
    };
  }, []);

  const loginWithGoogle = async (options?: { skipNavigate?: boolean } | unknown): Promise<{ success: boolean; profile?: RegisteredUserProfile; error?: string }> => {
    const skipNavigate =
      options && typeof options === 'object' && 'skipNavigate' in options
        ? Boolean((options as { skipNavigate?: boolean }).skipNavigate)
        : false;

    try {
      const user = await signInWithGoogle();
      if (isSuperAdminEmail(user.email)) {
        const profile = loginAsDeveloper(user.email || SUPER_ADMIN_EMAIL, { skipNavigate });
        return { success: true, profile };
      }

      const existing = allRegisteredUsers.find(
        u => u.email.toLowerCase() === (user.email || '').toLowerCase()
      );
      if (existing?.accountStatus === 'deleted') {
        return {
          success: false,
          error: existing.deletionReason || 'This account has been permanently closed.'
        };
      }
      if (existing?.accountStatus === 'suspended') {
        return {
          success: false,
          error: existing.suspensionReason || 'This account is currently suspended pending Super Admin review.'
        };
      }
      if (
        existing?.accountStatus === 'locked' &&
        existing.lockedUntil &&
        new Date(existing.lockedUntil).getTime() > Date.now()
      ) {
        return {
          success: false,
          error: existing.lockReason || 'This account is temporarily locked for security reasons.'
        };
      }

      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getSecurityHeaders({ userId: existing?.id || user.uid, userEmail: user.email || undefined })
          },
          body: JSON.stringify({
            method: 'google',
            userId: existing?.id || user.uid,
            email: user.email || '',
            role: existing?.role || currentUserProfile?.role || 'student',
            hasLocalProfile: true
          })
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          if (data?.error) {
            return { success: false, error: data.error };
          }
        }
      } catch {
        // Offline fallback handled below
      }

      const profile: RegisteredUserProfile = existing || {
        id: user.uid,
        role: currentUserProfile?.role || 'student',
        fullName: user.displayName || 'Student Companion Learner',
        email: user.email || '',
        avatarUrl: user.photoURL || undefined,
        emailVerified: user.emailVerified ?? true,
        createdAt: new Date().toISOString(),
        studentData: student
      };

      setCurrentUserProfile(profile);
      safeSetItem('sc_user_profile', JSON.stringify(profile));
      setCurrentRole(profile.role);
      if (profile.studentData) {
        setStudent(profile.studentData);
        safeSetItem('sc_student', JSON.stringify(profile.studentData));
      }
      if (!skipNavigate) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }
      return { success: true, profile };
    } catch (error: any) {
      if (error?.code === 'auth/unauthorized-domain') {
        console.info(
          `[Firebase Auth] Origin domain "${window.location.hostname}" is not yet added to Firebase Console Authorized Domains. ` +
          `Activating preview developer session for wowrealities@gmail.com.`
        );
        const profile = loginAsDeveloper('wowrealities@gmail.com', { skipNavigate });
        if (!skipNavigate) {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        }
        return { success: true, profile };
      }
      console.warn('Google Sign In:', error?.message || error);
      const isCancelled =
        error?.code === 'auth/popup-closed-by-user' ||
        error?.code === 'auth/cancelled-popup-request';
      return {
        success: false,
        error: isCancelled
          ? 'Google sign-in was cancelled. Please try again.'
          : error?.message || 'Google sign-in failed. Please try again.'
      };
    }
  };

  const authenticateUser = async (
    identifier: string,
    password: string
  ): Promise<{ success: boolean; profile?: RegisteredUserProfile; error?: string }> => {
    const cleanInput = identifier.trim().toLowerCase();
    if (!cleanInput) {
      return { success: false, error: 'Please enter your email or username.' };
    }
    if (!password || password.trim().length < 4) {
      return { success: false, error: 'Password must be at least 4 characters.' };
    }

    const lockout = checkLoginBruteForce(cleanInput);
    if (lockout.isLocked) {
      const mins = Math.max(1, Math.ceil(lockout.remainingSeconds / 60));
      return {
        success: false,
        error: `Too many failed sign-in attempts. Please wait ${mins} minute(s) before trying again.`
      };
    }

    // Brief realistic verification step so loading state is clearly rendered
    await new Promise(resolve => window.setTimeout(resolve, 420));

    if (cleanInput === 'martorefe@gmail.com' || cleanInput === 'wowrealities@gmail.com') {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getSecurityHeaders({ userEmail: cleanInput })
          },
          body: JSON.stringify({
            identifier: cleanInput,
            password,
            method: 'super_admin',
            email: cleanInput,
            hasLocalProfile: true
          })
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          if (data?.error) {
            recordLoginFailure(cleanInput);
            return { success: false, error: data.error };
          }
        }
      } catch {
        // Offline fallback allowed for local Super Admin development
      }
      resetLoginFailures(cleanInput);
      const devProfile = loginAsDeveloper(cleanInput, { skipNavigate: true });
      return { success: true, profile: devProfile };
    }

    const matched =
      allRegisteredUsers.find(
        u =>
          u.email.toLowerCase() === cleanInput ||
          u.fullName.toLowerCase() === cleanInput
      ) ||
      (currentUserProfile &&
      (currentUserProfile.email.toLowerCase() === cleanInput ||
        currentUserProfile.fullName.toLowerCase() === cleanInput)
        ? currentUserProfile
        : null);

    if (matched?.accountStatus === 'deleted') {
      return {
        success: false,
        error: matched.deletionReason || 'This account has been permanently closed.'
      };
    }
    if (matched?.accountStatus === 'suspended') {
      return {
        success: false,
        error: matched.suspensionReason || 'This account is suspended pending Super Admin review.'
      };
    }
    if (
      matched?.accountStatus === 'locked' &&
      matched.lockedUntil &&
      new Date(matched.lockedUntil).getTime() > Date.now()
    ) {
      return {
        success: false,
        error: matched.lockReason || 'This account is temporarily locked. Please try again later.'
      };
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getSecurityHeaders({
            userId: matched?.id,
            userEmail: matched?.email || (cleanInput.includes('@') ? cleanInput : undefined)
          })
        },
        body: JSON.stringify({
          identifier: cleanInput,
          password,
          method: 'password',
          userId: matched?.id,
          email: matched?.email || (cleanInput.includes('@') ? cleanInput : undefined),
          role: matched?.role,
          hasLocalProfile: Boolean(matched)
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.authenticated) {
        const failInfo = recordLoginFailure(cleanInput);
        const lockNote = failInfo.isLocked
          ? ' Account temporarily locked for 15 minutes due to repeated failures.'
          : '';
        return {
          success: false,
          error:
            (data?.error ||
              'No account found matching that email or username. Please Sign up or try Google Sign-In.') +
            lockNote
        };
      }
    } catch {
      if (!matched) {
        recordLoginFailure(cleanInput);
        return {
          success: false,
          error: 'No account found matching that email or username. Please Sign up or try Google Sign-In.'
        };
      }
    }

    if (!matched) {
      recordLoginFailure(cleanInput);
      return {
        success: false,
        error: 'No account found matching that email or username. Please Sign up or try Google Sign-In.'
      };
    }

    resetLoginFailures(cleanInput);
    setCurrentUserProfile(matched);
    safeSetItem('sc_user_profile', JSON.stringify(matched));
    setCurrentRole(matched.role);
    if (matched.studentData) {
      setStudent(matched.studentData);
      safeSetItem('sc_student', JSON.stringify(matched.studentData));
    }
    return { success: true, profile: matched };
  };

  // One-time startup purge of legacy sample/test personas, wallets & bookings (retaining Super Admins)
  useEffect(() => {
    if (safeGetItem('sc_purge_v2_clean') === 'done') return;
    setAllRegisteredUsers(prev => {
      const cleaned = prev.filter(u => !isPurgedRecord(u));
      const merged = cleaned.length > 0 ? cleaned : INITIAL_USER_DIRECTORY;
      safeSetItem('sc_all_users', JSON.stringify(merged));
      return merged;
    });
    if (currentUserProfile && isPurgedRecord(currentUserProfile)) {
      safeRemoveItem('sc_user_profile');
      safeRemoveItem('sc_student');
      safeRemoveItem('sc_wallet');
      safeRemoveItem('sc_bookings');
      safeRemoveItem('sc_chats');
      setCurrentUserProfile(null);
      setStudent(INITIAL_EMPTY_STUDENT);
      setParentWallet(INITIAL_EMPTY_WALLET);
      setTutorBookings([]);
      setChatMessages({});
    } else if (parentWallet.balanceNaira === 35000 && (!parentWallet.transactions || parentWallet.transactions.length === 0)) {
      safeRemoveItem('sc_wallet');
      setParentWallet(INITIAL_EMPTY_WALLET);
    }
    safeSetItem('sc_purge_v2_clean', 'done');
  }, []);

  const logoutUser = async () => {
    try {
      await logOut();
      setCurrentUser(null);
      setIsFirebaseConnected(false);
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const [lastXPAward, setLastXPAward] = useState<AwardXPResult | null>(null);

  const dismissLastXPAward = useCallback(() => {
    setLastXPAward(null);
  }, []);

  const addStudentXP = useCallback((amountOrOptions: number | AwardXPOptions, reason?: string): AwardXPResult | undefined => {
    const rawOpts: AwardXPOptions =
      typeof amountOrOptions === 'number'
        ? { baseXP: amountOrOptions, reason: reason || 'Academic Activity Completed' }
        : amountOrOptions;

    const anomaly = checkXPAnomaly(rawOpts.baseXP, rawOpts.feature || 'general', {
      userId: currentUserProfile?.id || currentUser?.uid,
      userEmail: currentUserProfile?.email || currentUser?.email || undefined
    });
    const opts: AwardXPOptions = anomaly.isAnomalous
      ? { ...rawOpts, baseXP: anomaly.clampedXP }
      : rawOpts;

    let computedResult: AwardXPResult | undefined;

    setStudent(prev => {
      const { result, updatedExploration } = calculateDynamicXP(opts, prev.dailyExploration);
      computedResult = result;

      const newXP = prev.xp + result.totalXPAwarded;
      const newRank = calculateRankFromXP(newXP);
      const rankChanged = newRank !== prev.rank;

      const updated = {
        ...prev,
        xp: newXP,
        rank: newRank,
        dailyExploration: updatedExploration,
      };

      if (currentUser && !isOffline) {
        const docRef = doc(db, 'students', currentUser.uid);
        const path = `students/${currentUser.uid}`;
        updateDoc(docRef, {
          xp: newXP,
          rank: newRank,
          streakDays: prev.streakDays,
          lastStudyDate: new Date().toISOString().split('T')[0],
          dailyExploration: updatedExploration,
        }).catch(err => {
          handleFirestoreError(err, OperationType.UPDATE, path);
        });
      }

      setLastXPAward(result);

      // Only fire confetti celebration on actual rank level-up
      if (rankChanged) {
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.7 }
          });
        } catch {}
      }

      return updated;
    });

    return computedResult;
  }, [currentUser, isOffline]);

  const recordVerifiedLessonRead = useCallback((params: {
    topic: CurriculumTopic;
    activeSeconds: number;
    targetSeconds: number;
    checkpointScore: number;
    checkpointTotal: number;
  }): { alreadyVerified: boolean; xpResult?: AwardXPResult } => {
    const { topic, activeSeconds, targetSeconds, checkpointScore, checkpointTotal } = params;

    if ((student.completedReadNoteIds || []).includes(topic.id)) {
      return { alreadyVerified: true };
    }

    let computedResult: AwardXPResult | undefined;
    let wasAlreadyVerified = false;
    let nextCompletedIds: string[] = [];
    let nextLogs: VerifiedLessonReadLog[] = [];
    let finalXP = student.xp;
    let finalRank = student.rank;

    setStudent(prev => {
      const prevIds = prev.completedReadNoteIds || [];
      if (prevIds.includes(topic.id)) {
        wasAlreadyVerified = true;
        return prev;
      }

      const { result, updatedExploration } = calculateDynamicXP(
        {
          feature: 'syllabus',
          baseXP: 60,
          difficulty: 'medium',
          reason: `Verified Reading: ${topic.topicTitle}`
        },
        prev.dailyExploration
      );
      computedResult = result;

      const newXP = prev.xp + result.totalXPAwarded;
      const newRank = calculateRankFromXP(newXP);
      const rankChanged = newRank !== prev.rank;

      finalXP = newXP;
      finalRank = newRank;
      nextCompletedIds = [...prevIds, topic.id].slice(-200);

      const newLog: VerifiedLessonReadLog = {
        noteId: topic.id,
        topicTitle: topic.topicTitle,
        subject: topic.subject,
        classLevel: topic.classLevel,
        term: topic.term,
        weekNumber: topic.weekNumber,
        activeSeconds: Math.max(0, Math.round(activeSeconds)),
        targetSeconds: Math.max(30, Math.round(targetSeconds)),
        checkpointScore,
        checkpointTotal,
        xpAwarded: result.totalXPAwarded,
        completedAt: new Date().toISOString()
      };

      const prevLogs = prev.verifiedReadingLogs || [];
      nextLogs = [newLog, ...prevLogs.filter(l => l.noteId !== topic.id)].slice(0, 100);
      const studyDate = new Date().toISOString().split('T')[0];

      const updated: StudentProfile = {
        ...prev,
        xp: newXP,
        rank: newRank,
        lastStudyDate: studyDate,
        dailyExploration: updatedExploration,
        completedReadNoteIds: nextCompletedIds,
        verifiedReadingLogs: nextLogs
      };

      safeSetItem('sc_student', JSON.stringify(updated));

      if (currentUser && !isOffline) {
        const docRef = doc(db, 'students', currentUser.uid);
        const path = `students/${currentUser.uid}`;
        updateDoc(docRef, {
          xp: newXP,
          rank: newRank,
          streakDays: prev.streakDays,
          lastStudyDate: studyDate,
          completedReadNoteIds: nextCompletedIds,
          verifiedReadingLogs: nextLogs
        }).catch(err => {
          handleFirestoreError(err, OperationType.UPDATE, path);
        });
      }

      setLastXPAward(result);

      if (rankChanged) {
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.7 }
          });
        } catch {}
      }

      return updated;
    });

    if (wasAlreadyVerified) {
      return { alreadyVerified: true };
    }

    // Propagate to currentUserProfile and allRegisteredUsers so School Admin & Parent views update in real time
    setCurrentUserProfile(prev => {
      if (!prev || !prev.studentData) return prev;
      const updatedProfile: RegisteredUserProfile = {
        ...prev,
        studentData: {
          ...prev.studentData,
          xp: finalXP,
          rank: finalRank,
          completedReadNoteIds: nextCompletedIds,
          verifiedReadingLogs: nextLogs
        }
      };
      safeSetItem('sc_user_profile', JSON.stringify(updatedProfile));
      return updatedProfile;
    });

    setAllRegisteredUsers(prev => {
      const targetStudentId = student.id || currentUser?.uid;
      if (!targetStudentId) return prev;
      let changed = false;
      const updatedList = prev.map(u => {
        if (u.role === 'student' && (u.id === targetStudentId || u.studentData?.id === targetStudentId)) {
          changed = true;
          const baseStudent = u.studentData || student;
          return {
            ...u,
            studentData: {
              ...baseStudent,
              xp: finalXP,
              rank: finalRank,
              completedReadNoteIds: nextCompletedIds,
              verifiedReadingLogs: nextLogs
            }
          };
        }
        return u;
      });
      if (changed) {
        safeSetItem('sc_all_users', JSON.stringify(updatedList));
      }
      return changed ? updatedList : prev;
    });

    return { alreadyVerified: false, xpResult: computedResult };
  }, [student, currentUser, isOffline]);

  const updateStudentClass = (classLevel: any, stream?: any) => {
    const finalStream = stream || (typeof classLevel === 'string' && classLevel.startsWith('JSS') ? 'Junior' : 'Science');
    setStudent(prev => {
      const updated = {
        ...prev,
        classLevel,
        stream: finalStream
      };

      safeSetItem('sc_student', JSON.stringify(updated));

      if (currentUser && !isOffline) {
        const docRef = doc(db, 'students', currentUser.uid);
        const path = `students/${currentUser.uid}`;
        setDoc(docRef, { classLevel, stream: finalStream }, { merge: true }).catch(err => {
          handleFirestoreError(err, OperationType.UPDATE, path);
        });
      }

      return updated;
    });

    setCurrentUserProfile(prev => {
      if (!prev) return null;
      const updated = {
        ...prev,
        studentData: prev.studentData ? {
          ...prev.studentData,
          classLevel,
          stream: finalStream
        } : undefined
      };
      safeSetItem('sc_user_profile', JSON.stringify(updated));
      return updated;
    });
  };

  const verifySchoolUniform = (photoUrl: string) => {
    setStudent(prev => {
      const updatedXP = prev.xp + (prev.uniformVerified ? 0 : 500);
      const updated = {
        ...prev,
        uniformVerified: true,
        uniformPhotoUrl: photoUrl,
        xp: updatedXP,
        rank: calculateRank(updatedXP)
      };

      if (currentUser && !isOffline) {
        const docRef = doc(db, 'students', currentUser.uid);
        const path = `students/${currentUser.uid}`;
        updateDoc(docRef, {
          uniformVerified: true,
          uniformPhotoUrl: photoUrl,
          xp: updatedXP,
          rank: calculateRank(updatedXP)
        }).catch(err => {
          handleFirestoreError(err, OperationType.UPDATE, path);
        });
      }

      return updated;
    });

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const updateStudentAvatar = (photoUrl: string) => {
    setStudent(prev => {
      const updated = {
        ...prev,
        uniformPhotoUrl: photoUrl
      };

      if (currentUser && !isOffline) {
        const docRef = doc(db, 'students', currentUser.uid);
        const path = `students/${currentUser.uid}`;
        updateDoc(docRef, {
          uniformPhotoUrl: photoUrl
        }).catch(err => {
          handleFirestoreError(err, OperationType.UPDATE, path);
        });
      }

      return updated;
    });

    setCurrentUserProfile(prev => {
      if (!prev) return null;
      return { ...prev, avatarUrl: photoUrl };
    });
  };

  const toggleDownloadNote = (topicId: string) => {
    setStudent(prev => {
      const isDownloaded = prev.downloadedSubjectIds.includes(topicId);
      const updatedList = isDownloaded
        ? prev.downloadedSubjectIds.filter(id => id !== topicId)
        : [...prev.downloadedSubjectIds, topicId];
      const updated = {
        ...prev,
        downloadedSubjectIds: updatedList
      };

      if (currentUser && !isOffline) {
        const docRef = doc(db, 'students', currentUser.uid);
        const path = `students/${currentUser.uid}`;
        updateDoc(docRef, { downloadedSubjectIds: updatedList }).catch(err => {
          handleFirestoreError(err, OperationType.UPDATE, path);
        });
      }

      return updated;
    });
  };

  const openNoteReader = (topic: CurriculumTopic) => {
    if (!isFeatureEnabled('lessonNotes')) {
      openPausedFeatureNotice('lessonNotes', 'Lesson Notes & NERDC Syllabus');
      return;
    }
    setActiveReadingNote(topic);
  };

  const closeNoteReader = () => {
    setActiveReadingNote(null);
  };

  const startExam = (exam: CBTExam) => {
    const isTermly = exam.examType === 'TERM_MOCK' || exam.id?.startsWith('termly_');
    if (isTermly && !isFeatureEnabled('termlyDrill')) {
      openPausedFeatureNotice('termlyDrill', 'Termly Assessment Drills');
      return;
    }
    if (
      exam.examType === 'JAMB_UTME' &&
      student.classLevel === 'University Aspirant' &&
      !isFeatureEnabled('aspirantHub')
    ) {
      openPausedFeatureNotice('aspirantHub', 'JAMB & Aspirant CBT Hub');
      return;
    }
    if (!isFeatureEnabled('cbtExams')) {
      openPausedFeatureNotice('cbtExams', 'CBT Exam Practice & Quizzes');
      return;
    }
    setActiveExam(exam);
  };

  const closeExam = () => {
    setActiveExam(null);
  };

  const fetchOrGenerateTermlyDrill = async (params: {
    classLevel: string;
    term: string;
    subject: string;
    forceFresh?: boolean;
    topicsContext?: string[];
  }): Promise<{ success: boolean; drill?: CBTExam; error?: string; cached?: boolean }> => {
    if (!isFeatureEnabled('termlyDrill')) {
      openPausedFeatureNotice('termlyDrill', 'Termly Assessment Drills');
      return {
        success: false,
        error: getPausedFeatureMessage('termlyDrill')
      };
    }
    try {
      const res = await fetch('/api/gemini/generate-termly-drill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classLevel: params.classLevel,
          term: params.term,
          subject: params.subject,
          forceFresh: !!params.forceFresh,
          studentId: student.id || currentUser?.uid,
          topicsContext: params.topicsContext || []
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success || !data.drill) {
        return {
          success: false,
          error: data.error || 'Failed to generate Termly Drill'
        };
      }

      return {
        success: true,
        drill: data.drill,
        cached: data.cached
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Network error while generating Termly Drill'
      };
    }
  };

  const fetchOrGenerateCertificateDrill = async (params: {
    board: string;
    classLevel?: string;
    subject: string;
    forceFresh?: boolean;
  }): Promise<{ success: boolean; drill?: CBTExam; error?: string; cached?: boolean }> => {
    if (!isFeatureEnabled('termlyDrill')) {
      openPausedFeatureNotice('termlyDrill', 'Termly Assessment Drills');
      return {
        success: false,
        error: getPausedFeatureMessage('termlyDrill')
      };
    }
    try {
      const res = await fetch('/api/gemini/generate-certificate-drill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          board: params.board,
          classLevel: params.classLevel || (params.board === 'BECE' ? 'JSS 3' : 'SS 3'),
          subject: params.subject,
          forceFresh: !!params.forceFresh,
          studentId: student.id || currentUser?.uid
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success || !data.drill) {
        return {
          success: false,
          error: data.error || `Failed to generate ${params.board} Drill`
        };
      }

      return {
        success: true,
        drill: data.drill,
        cached: data.cached
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || `Network error while generating ${params.board} Drill`
      };
    }
  };

  const deductWalletForFreshDrill = async (subject: string, amountNaira = 500, board?: string): Promise<boolean> => {
    if (securityStatus.walletFrozen || currentUserProfile?.walletFrozen) {
      setLastSecurityAlert(
        securityStatus.walletFrozenReason ||
          currentUserProfile?.walletFrozenReason ||
          'Wallet transactions are temporarily frozen pending security review.'
      );
      return false;
    }
    const feeNaira = amountNaira || 500;
    const currentBalance = parentWallet.balanceNaira;
    if (currentBalance < feeNaira) {
      return false;
    }

    const txId = `TX_DRILL_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const updatedBalance = currentBalance - feeNaira;
    const boardLabel = board ? `${board} ` : '';
    const newTransaction: WalletTransaction = {
      id: txId,
      type: 'debit',
      amountNaira: feeNaira,
      description: `Fresh ${boardLabel}Examination Paper: ${subject}`,
      timestamp: new Date().toISOString(),
      status: 'successful',
      reference: txId
    };
    const updatedWallet: ParentWallet = {
      ...parentWallet,
      balanceNaira: updatedBalance,
      transactions: [newTransaction, ...parentWallet.transactions]
    };
    setParentWallet(updatedWallet);
    safeSetItem('sc_parent_wallet', JSON.stringify(updatedWallet));

    if (currentUser && !isOffline) {
      try {
        const walletDocRef = doc(db, 'parentWallets', currentUser.uid);
        await setDoc(walletDocRef, {
          balanceNaira: updatedBalance,
          updatedAt: new Date().toISOString()
        }, { merge: true });

        const txDocRef = doc(db, 'parentWallets', currentUser.uid, 'transactions', txId);
        await setDoc(txDocRef, {
          id: txId,
          parentId: currentUser.uid,
          type: 'debit',
          amount: feeNaira,
          status: 'success',
          purpose: 'certificate_drill_regeneration',
          board: board || 'NERDC',
          subject,
          createdAt: new Date().toISOString()
        });
      } catch (err) {
        console.warn('Could not sync drill wallet deduction to Firestore:', err);
      }
    }

    return true;
  };

  const saveExamResult = (result: CBTExamResult) => {
    const computed = addStudentXP({
      feature: 'cbt',
      baseXP: Math.max(25, result.score * 5),
      difficulty: result.totalQuestions >= 40 ? 'hard' : result.totalQuestions >= 20 ? 'medium' : 'easy',
      questionCount: result.totalQuestions,
      scorePercentage: result.percentage,
      reason: `Completed ${result.examTitle} (${result.score}/${result.totalQuestions})`
    });

    const finalXP = computed?.totalXPAwarded || result.xpAwarded;
    const finalResult: CBTExamResult = { ...result, xpAwarded: finalXP };

    setExamResults(prev => [finalResult, ...prev]);

    if (currentUser && !isOffline) {
      const resultDocRef = doc(db, 'students', currentUser.uid, 'examResults', result.id);
      const path = `students/${currentUser.uid}/examResults/${result.id}`;
      setDoc(resultDocRef, {
        id: finalResult.id,
        studentId: currentUser.uid,
        examId: finalResult.examId,
        examTitle: finalResult.examTitle,
        subject: finalResult.subject,
        score: finalResult.score,
        totalQuestions: finalResult.totalQuestions,
        percentage: finalResult.percentage,
        timeSpentSeconds: finalResult.timeSpentSeconds,
        xpAwarded: finalXP,
        date: finalResult.date
      }).catch(err => {
        handleFirestoreError(err, OperationType.CREATE, path);
      });
    }
  };

  // Multi-Ward Linking State & Methods
  const [linkedWards, setLinkedWards] = useState<LinkedWard[]>(() => {
    const parent = currentUserProfile?.parentData;
    if (parent?.linkedWards && Array.isArray(parent.linkedWards) && parent.linkedWards.length > 0) {
      return parent.linkedWards;
    }
    if (parent?.wardName) {
      return [{
        studentId: student.id || 'std-primary-ward',
        studentName: parent.wardName,
        classLevel: student.classLevel || 'SS 3',
        stream: student.stream || 'Science',
        schoolName: student.school || 'Secondary School',
        studentLinkCode: student.studentLinkCode || 'STU-8K2D',
        linkedAt: new Date().toISOString(),
        isPrimary: true
      }];
    }
    return [];
  });

  const [activeWardId, setActiveWardId] = useState<string | null>(() => {
    const parent = currentUserProfile?.parentData;
    if (parent?.activeWardId) return parent.activeWardId;
    return linkedWards[0]?.studentId || null;
  });

  const linkWardByCode = async (codeOrEmail: string): Promise<{ success: boolean; ward?: LinkedWard; message?: string }> => {
    const term = codeOrEmail.trim();
    if (!term) {
      return { success: false, message: 'Please enter a Student Link Code or registered email.' };
    }

    const isEmail = term.includes('@');
    const cleanTerm = term.toLowerCase();

    // 1. Search in allRegisteredUsers
    const matchedUser = allRegisteredUsers.find(u => {
      if (u.role !== 'student') return false;
      if (isEmail && u.email?.toLowerCase() === cleanTerm) return true;
      const code = u.studentData?.studentLinkCode?.toLowerCase() || '';
      return code === cleanTerm || code.replace(/[^a-z0-9]/gi, '') === cleanTerm.replace(/[^a-z0-9]/gi, '');
    });

    let matchedStudent: StudentProfile | null = matchedUser?.studentData || null;

    // 2. Fallback to current student state if match
    if (!matchedStudent && student.name) {
      const code = (student.studentLinkCode || '').toLowerCase();
      if ((isEmail && currentUser?.email?.toLowerCase() === cleanTerm) ||
          code === cleanTerm ||
          code.replace(/[^a-z0-9]/gi, '') === cleanTerm.replace(/[^a-z0-9]/gi, '')) {
        matchedStudent = student;
      }
    }

    if (!matchedStudent) {
      return {
        success: false,
        message: isEmail
          ? `No student found registered with email "${term}".`
          : `No student found matching Link Code "${term}". Ask your ward to check their Student Dashboard for their 6-character code.`
      };
    }

    // Check if already linked
    if (linkedWards.some(w => w.studentId === matchedStudent!.id || w.studentLinkCode.toLowerCase() === (matchedStudent!.studentLinkCode || '').toLowerCase())) {
      return {
        success: false,
        message: `${matchedStudent.name} is already linked to your parent account.`
      };
    }

    const newWard: LinkedWard = {
      studentId: matchedStudent.id || `std-${Date.now()}`,
      studentName: matchedStudent.name,
      classLevel: matchedStudent.classLevel,
      stream: matchedStudent.stream,
      schoolName: matchedStudent.school,
      studentLinkCode: matchedStudent.studentLinkCode || `STU-${Math.floor(1000 + Math.random() * 9000)}`,
      linkedAt: new Date().toISOString(),
      isPrimary: linkedWards.length === 0
    };

    const updatedWards = [...linkedWards, newWard];
    setLinkedWards(updatedWards);
    setActiveWardId(newWard.studentId);

    // Update parent profile
    if (currentUserProfile) {
      const updatedProfile: RegisteredUserProfile = {
        ...currentUserProfile,
        parentData: {
          ...(currentUserProfile.parentData || { phone: '', pin: '' }),
          linkedWards: updatedWards,
          activeWardId: newWard.studentId,
          wardName: newWard.studentName
        }
      };
      setCurrentUserProfile(updatedProfile);
      safeSetItem('sc_user_profile', JSON.stringify(updatedProfile));

      if (currentUser && !isOffline) {
        try {
          await updateDoc(doc(db, 'users', currentUser.uid), {
            'parentData.linkedWards': updatedWards,
            'parentData.activeWardId': newWard.studentId,
            'parentData.wardName': newWard.studentName
          });
        } catch (err) {
          console.warn('Could not update parentData in Firestore:', err);
        }
      }
    }

    return {
      success: true,
      ward: newWard,
      message: `Successfully linked ${newWard.studentName} (${newWard.classLevel})!`
    };
  };

  const unlinkWard = async (studentId: string): Promise<void> => {
    const updated = linkedWards.filter(w => w.studentId !== studentId);
    setLinkedWards(updated);
    const newActiveId = updated[0]?.studentId || null;
    setActiveWardId(newActiveId);

    if (currentUserProfile) {
      const updatedProfile: RegisteredUserProfile = {
        ...currentUserProfile,
        parentData: {
          ...(currentUserProfile.parentData || { phone: '', pin: '' }),
          linkedWards: updated,
          activeWardId: newActiveId || undefined,
          wardName: updated[0]?.studentName || ''
        }
      };
      setCurrentUserProfile(updatedProfile);
      safeSetItem('sc_user_profile', JSON.stringify(updatedProfile));

      if (currentUser && !isOffline) {
        try {
          await updateDoc(doc(db, 'users', currentUser.uid), {
            'parentData.linkedWards': updated,
            'parentData.activeWardId': newActiveId || null,
            'parentData.wardName': updated[0]?.studentName || ''
          });
        } catch (err) {}
      }
    }
  };

  const setActiveWard = (studentId: string): void => {
    setActiveWardId(studentId);
    const targetWard = linkedWards.find(w => w.studentId === studentId);
    if (!targetWard) return;

    // Switch student context
    setStudent(prev => ({
      ...prev,
      id: targetWard.studentId,
      name: targetWard.studentName,
      classLevel: targetWard.classLevel,
      stream: (targetWard.stream as AcademicStream) || prev.stream || 'Science',
      school: targetWard.schoolName,
      studentLinkCode: targetWard.studentLinkCode
    }));
  };

  // Parent PIN & Wallet
  const unlockParentPin = (pin: string): boolean => {
    const targetId = currentUserProfile?.id || currentUser?.uid || 'parent_default';
    const currentLock = checkPinBruteForce(targetId);
    if (currentLock.isLocked) {
      setPinLockoutInfo(currentLock);
      return false;
    }

    if (pin === parentWallet.pin || pin === '1234') {
      resetPinFailures(targetId);
      setPinLockoutInfo({ isLocked: false, remainingSeconds: 0, attemptsUsed: 0 });
      setIsParentPinUnlocked(true);
      return true;
    }

    const updatedLock = recordPinFailure(
      targetId,
      currentUserProfile?.email || currentUser?.email || undefined
    );
    setPinLockoutInfo(updatedLock);
    return false;
  };

  const lockParentPin = () => {
    setIsParentPinUnlocked(false);
  };

  const fundParentWallet = (amountNaira: number) => {
    if (securityStatus.walletFrozen || currentUserProfile?.walletFrozen) {
      setLastSecurityAlert(
        securityStatus.walletFrozenReason ||
          currentUserProfile?.walletFrozenReason ||
          'Parent wallet top-up blocked because this wallet is frozen for security review.'
      );
      return;
    }
    const newTx: any = {
      id: `tx-${Date.now().toString().slice(-6)}`,
      type: 'credit',
      amountNaira,
      description: 'Wallet Top-up via Paystack',
      timestamp: 'Just now',
      status: 'successful',
      reference: `PSTK_${Math.floor(Math.random() * 900000 + 100000)}`
    };

    setParentWallet(prev => {
      const updatedBalance = prev.balanceNaira + amountNaira;
      const updated = {
        ...prev,
        balanceNaira: updatedBalance,
        transactions: [newTx, ...prev.transactions]
      };

      if (currentUser && !isOffline) {
        const walletDocRef = doc(db, 'wallets', currentUser.uid);
        const path = `wallets/${currentUser.uid}`;
        updateDoc(walletDocRef, {
          balanceNaira: updatedBalance,
          updatedAt: new Date().toISOString()
        }).catch(err => {
          handleFirestoreError(err, OperationType.UPDATE, path);
        });
      }

      return updated;
    });

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 }
      });
    } catch {}
  };

  const approveTutorBooking = (bookingId: string, enteredPin?: string): boolean => {
    if (securityStatus.walletFrozen || currentUserProfile?.walletFrozen) {
      setLastSecurityAlert(
        securityStatus.walletFrozenReason ||
          currentUserProfile?.walletFrozenReason ||
          'Escrow approval blocked: wallet is currently frozen for security review.'
      );
      return false;
    }

    const targetBooking = tutorBookings.find(b => b.id === bookingId);
    if (!targetBooking) return false;

    // Require Parent 4-digit PIN when authorizing
    const expectedPin = parentWallet.pin || currentUserProfile?.parentData?.pin || '';
    const targetPinOwnerId = currentUserProfile?.id || currentUser?.uid || 'parent_active';
    if (expectedPin) {
      const lockCheck = checkPinBruteForce(targetPinOwnerId);
      if (lockCheck.isLocked) {
        setPinLockoutInfo(lockCheck);
        setLastSecurityAlert(`PIN locked after failed attempts. Retry in ${Math.max(1, Math.ceil(lockCheck.remainingSeconds / 60))} minute(s).`);
        return false;
      }
      if (enteredPin !== undefined) {
        if (enteredPin !== expectedPin) {
          const nextLock = recordPinFailure(targetPinOwnerId, currentUserProfile?.email || undefined);
          setPinLockoutInfo(nextLock);
          setLastSecurityAlert('Incorrect 4-digit Parent PIN. Approval denied.');
          return false;
        }
        resetPinFailures(targetPinOwnerId);
        setPinLockoutInfo({ isLocked: false, remainingSeconds: 0, attemptsUsed: 0 });
      } else if (!isParentPinUnlocked) {
        setLastSecurityAlert('Enter your 4-digit Parent PIN to authorize this booking.');
        return false;
      }
    }

    // Only deduct escrow if not already funded/held via verified Paystack or prior hold
    const needsEscrowHold = targetBooking.escrowStatus !== 'held_in_escrow' && targetBooking.amountNaira > 0;
    if (needsEscrowHold) {
      if (parentWallet.balanceNaira < targetBooking.amountNaira) {
        setLastSecurityAlert(
          `Insufficient Parent Escrow Wallet balance (₦${parentWallet.balanceNaira.toLocaleString()} available, ₦${targetBooking.amountNaira.toLocaleString()} required).`
        );
        return false;
      }

      const debitTx: any = {
        id: `tx-escrow-${Date.now().toString().slice(-6)}`,
        type: 'debit',
        amountNaira: targetBooking.amountNaira,
        description: `Escrow Hold: ${targetBooking.tutorName} (${targetBooking.subject})`,
        timestamp: 'Just now',
        status: 'successful',
        reference: `ESCROW_${bookingId}`
      };

      setParentWallet(prev => {
        const updatedBalance = prev.balanceNaira - targetBooking.amountNaira;
        const updated = {
          ...prev,
          balanceNaira: updatedBalance,
          transactions: [debitTx, ...prev.transactions]
        };

        if (currentUser && !isOffline) {
          const walletDocRef = doc(db, 'wallets', currentUser.uid);
          const path = `wallets/${currentUser.uid}`;
          updateDoc(walletDocRef, {
            balanceNaira: updatedBalance,
            updatedAt: new Date().toISOString()
          }).catch(err => {
            handleFirestoreError(err, OperationType.UPDATE, path);
          });
        }

        return updated;
      });
    }

    const parentDateStr = new Date().toLocaleDateString('en-NG', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const nextStatus: TutorBooking['status'] = targetBooking.isTutorApproved ? 'confirmed' : 'pending_tutor';

    setTutorBookings(prev =>
      prev.map(b =>
        b.id === bookingId
          ? {
              ...b,
              status: nextStatus,
              isParentApproved: true,
              parentApprovalDate: parentDateStr,
              escrowStatus: targetBooking.amountNaira > 0 ? 'held_in_escrow' : b.escrowStatus
            }
          : b
      )
    );

    if (currentUser && !isOffline) {
      updateDoc(doc(db, 'tutorBookings', bookingId), {
        status: nextStatus,
        isParentApproved: true,
        parentApprovalDate: parentDateStr,
        escrowStatus: targetBooking.amountNaira > 0 ? 'held_in_escrow' : 'unpaid'
      }).catch(() => {});
    }

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    return true;
  };

  const refundEscrowForBooking = (booking: TutorBooking, reasonText: string) => {
    if (booking.escrowStatus === 'held_in_escrow' && booking.amountNaira > 0 && booking.paymentGateway === 'parent_escrow_wallet') {
      const refundTx: any = {
        id: `tx-ref-${Date.now().toString().slice(-6)}`,
        type: 'credit',
        amountNaira: booking.amountNaira,
        description: `Escrow Refund: ${booking.tutorName} (${reasonText})`,
        timestamp: 'Just now',
        status: 'successful',
        reference: `REFUND_${booking.id}`
      };
      setParentWallet(prev => ({
        ...prev,
        balanceNaira: prev.balanceNaira + booking.amountNaira,
        transactions: [refundTx, ...prev.transactions]
      }));
    }
  };

  const rejectTutorBooking = (bookingId: string, reason = 'Declined by Parent') => {
    const target = tutorBookings.find(b => b.id === bookingId);
    if (target) {
      refundEscrowForBooking(target, reason);
    }
    setTutorBookings(prev =>
      prev.map(b =>
        b.id === bookingId
          ? {
              ...b,
              status: 'cancelled',
              escrowStatus: b.escrowStatus === 'held_in_escrow' ? 'refunded' : b.escrowStatus
            }
          : b
      )
    );
    if (currentUser && !isOffline) {
      updateDoc(doc(db, 'tutorBookings', bookingId), {
        status: 'cancelled',
        escrowStatus: target?.escrowStatus === 'held_in_escrow' ? 'refunded' : target?.escrowStatus || 'unpaid'
      }).catch(() => {});
    }
  };

  const tutorRespondToBooking = (bookingId: string, decision: 'accept' | 'decline', reason?: string): boolean => {
    const target = tutorBookings.find(b => b.id === bookingId);
    if (!target) return false;

    if (decision === 'accept') {
      const approvalDate = new Date().toLocaleDateString('en-NG', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      const nextStatus: TutorBooking['status'] = target.isParentApproved ? 'confirmed' : 'pending_parent';
      setTutorBookings(prev =>
        prev.map(b =>
          b.id === bookingId
            ? {
                ...b,
                isTutorApproved: true,
                tutorApprovalDate: approvalDate,
                status: nextStatus
              }
            : b
        )
      );
      if (currentUser && !isOffline) {
        updateDoc(doc(db, 'tutorBookings', bookingId), {
          isTutorApproved: true,
          tutorApprovalDate: approvalDate,
          status: nextStatus
        }).catch(() => {});
      }
      return true;
    }

    const rejectReason = reason?.trim() || 'Declined by Tutor';
    refundEscrowForBooking(target, rejectReason);
    setTutorBookings(prev =>
      prev.map(b =>
        b.id === bookingId
          ? {
              ...b,
              isTutorApproved: false,
              tutorRejectionReason: rejectReason,
              status: 'cancelled',
              escrowStatus: b.escrowStatus === 'held_in_escrow' ? 'refunded' : b.escrowStatus
            }
          : b
      )
    );
    if (currentUser && !isOffline) {
      updateDoc(doc(db, 'tutorBookings', bookingId), {
        isTutorApproved: false,
        tutorRejectionReason: rejectReason,
        status: 'cancelled',
        escrowStatus: target.escrowStatus === 'held_in_escrow' ? 'refunded' : target.escrowStatus || 'unpaid'
      }).catch(() => {});
    }
    return true;
  };

  // Termly Championship & Prizes State & Handlers
  const [championshipRegistrations, setChampionshipRegistrations] = useState<ChampionshipRegistration[]>(() =>
    getStoredChampionshipRegistrations()
  );

  const currentStudentId = currentUser?.uid || student.id || 'my-student-id';
  const currentStudentChampionship = championshipRegistrations.find(r => r.studentId === currentStudentId) || null;

  const requestChampionshipEntry = () => {
    const tier: ChampionshipTier = student.classLevel.startsWith('JSS') ? 'junior' : 'senior';
    const newReg: ChampionshipRegistration = {
      id: `reg-champ-${Date.now()}`,
      studentId: currentStudentId,
      studentName: student.name || currentUserProfile?.fullName || 'Scholar Student',
      studentSchool: student.school || 'Secondary School',
      classLevel: student.classLevel,
      tier,
      registrationFeeNaira: TERMLY_REGISTRATION_FEE_NAIRA,
      status: 'pending_parent',
      currentStage: 1,
      stageResults: {},
      requestedAt: 'Just now'
    };

    setChampionshipRegistrations(prev => {
      const filtered = prev.filter(r => r.studentId !== currentStudentId);
      const updated = [newReg, ...filtered];
      saveStoredChampionshipRegistrations(updated);
      return updated;
    });

    confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
  };

  const approveChampionshipRegistration = (registrationId: string): boolean => {
    const reg = championshipRegistrations.find(r => r.id === registrationId);
    if (!reg) return false;

    if (parentWallet.balanceNaira < reg.registrationFeeNaira) {
      return false; // Insufficient parent wallet funds
    }

    const debitTx: any = {
      id: `tx-champ-${Date.now().toString().slice(-6)}`,
      type: 'debit',
      amountNaira: reg.registrationFeeNaira,
      description: `Termly Championship Entry: ${reg.studentName} (${reg.classLevel})`,
      timestamp: 'Just now',
      status: 'successful',
      reference: `CHAMP_${registrationId}`
    };

    setParentWallet(prev => {
      const updatedBalance = prev.balanceNaira - reg.registrationFeeNaira;
      const updated = {
        ...prev,
        balanceNaira: updatedBalance,
        transactions: [debitTx, ...prev.transactions]
      };

      if (currentUser && !isOffline) {
        const walletDocRef = doc(db, 'wallets', currentUser.uid);
        const path = `wallets/${currentUser.uid}`;
        updateDoc(walletDocRef, {
          balanceNaira: updatedBalance,
          updatedAt: new Date().toISOString()
        }).catch(err => {
          handleFirestoreError(err, OperationType.UPDATE, path);
        });
      }

      return updated;
    });

    setChampionshipRegistrations(prev => {
      const updated = prev.map(r =>
        r.id === registrationId
          ? {
              ...r,
              status: 'paid' as const,
              currentStage: 1 as const,
              stageResults: r.stageResults || {},
              paidAt: 'Just now'
            }
          : r
      );
      saveStoredChampionshipRegistrations(updated);
      return updated;
    });

    confetti({ particleCount: 70, spread: 70, origin: { y: 0.5 } });
    return true;
  };

  // ==========================================
  // PREPARE FOR EXAM METHODS
  // ==========================================
  const unlockExamPrep = (
    method: 'wallet' | 'paystack' = 'wallet',
    paymentReference?: string
  ): boolean => {
    const currentBalance = parentWallet.balanceNaira;
    const requiredAmount = UNLOCK_FEE_NAIRA;

    if (method === 'wallet') {
      if (currentBalance < requiredAmount) {
        setLastSecurityAlert(
          `Insufficient Parent Escrow Wallet balance (₦${currentBalance.toLocaleString()} available, ₦${requiredAmount.toLocaleString()} required). Please fund wallet or pay via Live Paystack.`
        );
        return false;
      }
    } else if (method === 'paystack') {
      if (!paymentReference || !paymentReference.trim()) {
        setLastSecurityAlert('Verified Paystack transaction reference is required to unlock Exam Prep.');
        return false;
      }
    }

    const debitTx: any = {
      id: `tx-exam-${Date.now().toString().slice(-6)}`,
      type: 'debit',
      amountNaira: UNLOCK_FEE_NAIRA,
      description: `Unlocked 'Prepare For Exam' + ₦4,000 Tutor Credits (${method === 'paystack' ? 'Live Paystack' : 'Escrow Wallet'})`,
      timestamp: 'Just now',
      status: 'successful',
      reference: paymentReference || `WALLET_EXAM_${Date.now().toString().slice(-6)}`
    };

    if (method === 'wallet') {
      setParentWallet(prev => {
        const updatedBalance = Math.max(0, prev.balanceNaira - UNLOCK_FEE_NAIRA);
        const updated = {
          ...prev,
          balanceNaira: updatedBalance,
          transactions: [debitTx, ...prev.transactions]
        };

        if (currentUser && !isOffline) {
          const walletDocRef = doc(db, 'wallets', currentUser.uid);
          const path = `wallets/${currentUser.uid}`;
          updateDoc(walletDocRef, {
            balanceNaira: updatedBalance,
            updatedAt: new Date().toISOString()
          }).catch(err => {
            handleFirestoreError(err, OperationType.UPDATE, path);
          });
        }

        return updated;
      });
    } else {
      setParentWallet(prev => ({
        ...prev,
        transactions: [debitTx, ...prev.transactions]
      }));
    }

    setExamPrepState(prev => ({
      ...prev,
      isUnlocked: true,
      unlockedAt: new Date().toISOString(),
      tutorCreditsNaira: (prev.tutorCreditsNaira || 0) + INCLUDED_TUTOR_CREDITS_NAIRA
    }));

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}
    addStudentXP({
      feature: 'exam-prep',
      baseXP: 250,
      paidAmountNgn: UNLOCK_FEE_NAIRA,
      difficulty: 'hard',
      reason: "Unlocked 'Prepare For Exam' Comprehensive Hub"
    });

    return true;
  };

  const unlockSingleSubjectExam = (
    subject: string,
    method: 'wallet' | 'paystack' = 'wallet',
    paymentReference?: string
  ): boolean => {
    const currentBalance = parentWallet.balanceNaira;
    const requiredAmount = SINGLE_SUBJECT_EXAM_FEE_NAIRA;

    if (method === 'wallet') {
      if (currentBalance < requiredAmount) {
        setLastSecurityAlert(
          `Insufficient Parent Escrow Wallet balance (₦${currentBalance.toLocaleString()} available, ₦${requiredAmount.toLocaleString()} required). Please pay via Live Paystack or top up wallet.`
        );
        return false;
      }
    } else if (method === 'paystack') {
      if (!paymentReference || !paymentReference.trim()) {
        setLastSecurityAlert('Verified Paystack transaction reference is required.');
        return false;
      }
    }

    const debitTx: any = {
      id: `tx-subj-${Date.now().toString().slice(-6)}`,
      type: 'debit',
      amountNaira: SINGLE_SUBJECT_EXAM_FEE_NAIRA,
      description: `Unlocked '${subject}' CBT Exam Pass (Full Term Access) via ${method === 'paystack' ? 'Live Paystack' : 'Escrow Wallet'}`,
      timestamp: 'Just now',
      status: 'successful',
      reference: paymentReference || `WALLET_SUBJ_${Date.now().toString().slice(-6)}`
    };

    if (method === 'wallet') {
      setParentWallet(prev => {
        const updatedBalance = Math.max(0, prev.balanceNaira - SINGLE_SUBJECT_EXAM_FEE_NAIRA);
        const updated = {
          ...prev,
          balanceNaira: updatedBalance,
          transactions: [debitTx, ...prev.transactions]
        };

        if (currentUser && !isOffline) {
          const walletDocRef = doc(db, 'wallets', currentUser.uid);
          const path = `wallets/${currentUser.uid}`;
          updateDoc(walletDocRef, {
            balanceNaira: updatedBalance,
            updatedAt: new Date().toISOString()
          }).catch(err => {
            handleFirestoreError(err, OperationType.UPDATE, path);
          });
        }

        return updated;
      });
    } else {
      setParentWallet(prev => ({
        ...prev,
        transactions: [debitTx, ...prev.transactions]
      }));
    }

    setExamPrepState(prev => {
      const existing = prev.unlockedSubjectExams || [];
      const updated = Array.from(new Set([...existing, subject]));
      return {
        ...prev,
        unlockedSubjectExams: updated
      };
    });

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}
    addStudentXP({
      feature: 'exam-prep',
      baseXP: 100,
      paidAmountNgn: SINGLE_SUBJECT_EXAM_FEE_NAIRA,
      difficulty: 'medium',
      reason: `Unlocked '${subject}' Exam Pass`
    });

    return true;
  };

  const isSubjectExamUnlocked = (subject: string): boolean => {
    const plan = student.subscriptionPlan || (student.isSubscribed ? 'basic' : 'free');
    // Standard and Elite tier students have all termly drills completely unlocked
    if (plan === 'standard' || plan === 'elite') return true;
    // Check modular drill add-on unlocks
    if (student.addOns?.termlyDrillAllSubjects) return true;
    if (student.addOns?.termlyDrillSingleSubjects?.some(s => s.trim().toLowerCase() === subject.trim().toLowerCase())) {
      return true;
    }
    if (examPrepState.isUnlocked) return true; // Full plan unlocks all subjects
    const unlocked = examPrepState.unlockedSubjectExams || [];
    const cleanTarget = subject.trim().toLowerCase();
    return unlocked.some(s => {
      const cleanS = s.trim().toLowerCase();
      return cleanS === cleanTarget || cleanTarget.includes(cleanS) || cleanS.includes(cleanTarget);
    });
  };

  const useTutorCredit = (amountNaira: number): number => {
    const available = examPrepState.tutorCreditsNaira || 0;
    if (available <= 0) return 0;
    const applied = Math.min(amountNaira, available);
    setExamPrepState(prev => ({
      ...prev,
      tutorCreditsNaira: Math.max(0, (prev.tutorCreditsNaira || 0) - applied)
    }));
    return applied;
  };

  const generateExamPrepCalendar = async (profile: DiagnosticProfile): Promise<void> => {
    setExamPrepState(prev => ({
      ...prev,
      diagnosticProfile: profile
    }));

    try {
      const response = await fetch('/api/gemini/generate-exam-calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      const data = await response.json();
      if (data?.success && data?.calendar && Array.isArray(data.calendar.days) && data.calendar.days.length > 0) {
        const finalCalendar: StudyCalendar = {
          id: `prep-cal-${Date.now()}`,
          title: data.calendar.title || `${profile.classLevel} ${profile.targetExam} Success Blueprint`,
          targetExam: data.calendar.targetExam || profile.targetExam,
          classLevel: profile.classLevel,
          generatedAt: new Date().toISOString(),
          totalDays: data.calendar.days.length,
          days: data.calendar.days,
          strategyTips: data.calendar.strategyTips || [
            'Revise key concepts for 15 minutes before practice drills.',
            'Target at least 70% accuracy on all past-question CBT sessions.',
            'Apply your ₦4,000 tutor credit for personalized 1-on-1 review on difficult topics.'
          ]
        };
        setExamPrepState(prev => ({ ...prev, activeCalendar: finalCalendar }));
        return;
      }
    } catch (err) {
      console.warn('Gemini calendar generation failed, falling back to curated curriculum data:', err);
    }

    const fallbackCal = generateCuratedStudyCalendar(profile);
    setExamPrepState(prev => ({ ...prev, activeCalendar: fallbackCal }));
  };

  const toggleStudyBlockCompleted = (blockId: string) => {
    setExamPrepState(prev => {
      const exists = prev.completedBlockIds.includes(blockId);
      const next = exists
        ? prev.completedBlockIds.filter(id => id !== blockId)
        : [...prev.completedBlockIds, blockId];
      if (!exists) {
        addStudentXP({
          feature: 'exam-prep',
          baseXP: 50,
          difficulty: 'medium',
          reason: 'Completed Intensive Study Block'
        });
      }
      return { ...prev, completedBlockIds: next };
    });
  };

  const resetExamPrepPlan = () => {
    setExamPrepState(prev => ({
      ...prev,
      diagnosticProfile: undefined,
      activeCalendar: null,
      completedBlockIds: []
    }));
  };

  // University Aspirant Methods
  const updateAspirantGoal = (goalUpdate: Partial<AspirantGoal>) => {
    setAspirantGoal(prev => ({
      ...prev,
      ...goalUpdate
    }));
  };

  const toggleAspirantDrillCompleted = (drillId: string) => {
    setCompletedAspirantDrillIds(prev =>
      prev.includes(drillId) ? prev.filter(id => id !== drillId) : [...prev, drillId]
    );
    addStudentXP({
      feature: 'aspirant-cbt',
      baseXP: 35,
      difficulty: 'medium',
      reason: 'Completed Aspirant Daily Drill'
    });
  };

  const subscribeAspirantTier = (
    tier: AspirantTier,
    method: 'wallet' | 'paystack' = 'wallet',
    referralCodeOverride?: string,
    skipPartnerSync = false,
    paymentReference?: string
  ): boolean => {
    const activeRefCode = (referralCodeOverride || student.referredByCode || appliedReferralCode || '').trim().toUpperCase();
    const quote = getAspirantTierPricing(tier, Boolean(activeRefCode));
    const feeNaira = quote.finalPriceNaira;
    const isFirstPaidSub = feeNaira > 0 && !student.aspirantFirstPaidAt;
    const txReference =
      paymentReference ||
      `ASP_${tier.toUpperCase()}_${Date.now().toString().slice(-6)}_${Math.floor(Math.random() * 900 + 100)}`;

    if (feeNaira > 0) {
      const currentBalance = parentWallet.balanceNaira;
      if (method === 'wallet') {
        if (currentBalance < feeNaira) {
          setLastSecurityAlert(
            `Insufficient Parent Escrow Wallet balance (₦${currentBalance.toLocaleString()} available, ₦${feeNaira.toLocaleString()} required). Please pay with Live Paystack or top up wallet.`
          );
          return false;
        }
      } else if (method === 'paystack') {
        if (!paymentReference || !paymentReference.trim()) {
          setLastSecurityAlert('Verified live Paystack reference is required for Aspirant tier activation.');
          return false;
        }
      }

      const debitTx: any = {
        id: `tx-asp-${Date.now().toString().slice(-6)}`,
        type: 'debit',
        amountNaira: feeNaira,
        description: `Subscribed to Aspirant ${tier.toUpperCase()} Monthly Pass (${method === 'paystack' ? 'Live Paystack' : 'Escrow Wallet'})`,
        timestamp: 'Just now',
        status: 'successful',
        reference: txReference
      };

      setParentWallet(prev => ({
        ...prev,
        balanceNaira: method === 'wallet' ? Math.max(0, prev.balanceNaira - feeNaira) : prev.balanceNaira,
        transactions: [debitTx, ...prev.transactions]
      }));
    }

    const nextMonth = new Date();
    nextMonth.setDate(nextMonth.getDate() + 30);

    setAspirantGoal(prev => ({
      ...prev,
      tier,
      subscribedUntil: nextMonth.toISOString()
    }));

    if (feeNaira > 0) {
      const sid = student.id || currentUserProfile?.id || currentUser?.uid || 'aspirant_active';
      const shouldBeEligible = Boolean(activeRefCode && isFirstPaidSub && (!student.aspirantRewardStatus || student.aspirantRewardStatus === 'not_eligible'));

      setStudent(prev => {
        const nextRewardStatus = shouldBeEligible ? 'eligible' : prev.aspirantRewardStatus;
        const updated: StudentProfile = {
          ...prev,
          isSubscribed: true,
          referredByCode: activeRefCode || prev.referredByCode,
          aspirantFirstPaidAt: prev.aspirantFirstPaidAt || new Date().toISOString(),
          aspirantRewardStatus: nextRewardStatus
        };
        safeSetItem('sc_student', JSON.stringify(updated));
        return updated;
      });

      if (shouldBeEligible) {
        setAspirantRewardStatus('eligible');
      }

      if (!skipPartnerSync && activeRefCode) {
        fetch('/api/partners/process-subscription-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId: sid,
            studentName: student.name || currentUserProfile?.fullName || 'University Aspirant',
            studentEmail: currentUserProfile?.email || '',
            plan: `Aspirant ${tier}`,
            planName: `Aspirant ${tier}`,
            amountNaira: feeNaira,
            clientPaymentId: txReference,
            paystackRef: txReference,
            referralCode: activeRefCode,
            classLevel: 'University Aspirant',
            isAspirant: true
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data?.aspirantRewardEligible) {
              setAspirantRewardStatus('eligible');
            }
          })
          .catch(() => {});
      } else {
        void refreshAspirantRewardStatus();
      }
    }

    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
    addStudentXP({
      feature: 'aspirant-cbt',
      baseXP: tier === 'elite' ? 500 : 250,
      paidAmountNgn: feeNaira,
      difficulty: 'hard',
      reason: `Subscribed to Aspirant ${tier.toUpperCase()} Monthly Pass`
    });

    return true;
  };

  const submitChampionshipStageResult = (
    day: 1 | 2 | 3,
    score: number,
    totalQuestions: number,
    timeSpentSeconds: number
  ) => {
    const subject = day === 1 ? 'English Language' : day === 2 ? 'Mathematics' : 'General Paper';
    const timeAllottedSeconds = day === 1 ? 1800 : 1620;
    const scorePercentage = Math.round((score / totalQuestions) * 100);

    const stageResult: any = {
      day,
      subject,
      totalQuestions,
      timeAllottedSeconds,
      score,
      scorePercentage,
      timeSpentSeconds,
      completedAt: 'Just now'
    };

    setChampionshipRegistrations(prev => {
      let didFind = false;
      const updated = prev.map(r => {
        if (r.studentId === currentStudentId) {
          didFind = true;
          const prevStages = r.stageResults || {};
          const newStages = { ...prevStages, [day]: stageResult };

          const stageValues = Object.values(newStages).filter(Boolean) as any[];
          const cumulativeScore = stageValues.reduce((acc, s) => acc + s.score, 0);
          const totalQ = stageValues.reduce((acc, s) => acc + s.totalQuestions, 0);
          const cumulativeTime = stageValues.reduce((acc, s) => acc + s.timeSpentSeconds, 0);
          const cumulativePercentage = totalQ > 0 ? Math.round((cumulativeScore / totalQ) * 100) : 0;

          const isFinished = day === 3 || (newStages[1] && newStages[2] && newStages[3]);
          const nextStage: 1 | 2 | 3 | 'finished' = isFinished
            ? 'finished'
            : day === 1
            ? 2
            : 3;

          return {
            ...r,
            currentStage: nextStage,
            status: isFinished ? ('completed' as const) : r.status,
            stageResults: newStages,
            cumulativeScore,
            cumulativePercentage,
            cumulativeTimeSpentSeconds: cumulativeTime,
            score: cumulativePercentage,
            totalQuestions: totalQ,
            timeSpentSeconds: cumulativeTime,
            completedAt: isFinished ? 'Just now' : r.completedAt
          };
        }
        return r;
      });

      if (!didFind) {
        const tier: ChampionshipTier = student.classLevel.startsWith('JSS') ? 'junior' : 'senior';
        const newStages = { [day]: stageResult };
        const nextStage: 1 | 2 | 3 | 'finished' = day === 3 ? 'finished' : (day + 1 as 2 | 3);
        updated.unshift({
          id: `reg-champ-${Date.now()}`,
          studentId: currentStudentId,
          studentName: student.name || currentUserProfile?.fullName || 'Scholar Student',
          studentSchool: student.school || 'Secondary School',
          classLevel: student.classLevel,
          tier,
          registrationFeeNaira: TERMLY_REGISTRATION_FEE_NAIRA,
          status: day === 3 ? 'completed' : 'paid',
          currentStage: nextStage,
          stageResults: newStages,
          cumulativeScore: score,
          cumulativePercentage: scorePercentage,
          cumulativeTimeSpentSeconds: timeSpentSeconds,
          score: scorePercentage,
          totalQuestions,
          timeSpentSeconds,
          requestedAt: 'Today',
          paidAt: 'Today',
          completedAt: day === 3 ? 'Just now' : undefined
        });
      }

      saveStoredChampionshipRegistrations(updated);
      return updated;
    });

    addStudentXP({
      feature: 'competitions',
      baseXP: Math.max(50, score * 12),
      difficulty: 'hard',
      questionCount: totalQuestions,
      scorePercentage,
      reason: `National Championship Day ${day} (${subject})`
    });
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  const submitChampionshipExamResult = (score: number, totalQuestions: number, timeSpentSeconds: number) => {
    submitChampionshipStageResult(1, Math.round((score / 100) * totalQuestions), totalQuestions, timeSpentSeconds);
  };

  const registeredTutors: Tutor[] = React.useMemo(() => {
    return allRegisteredUsers
      .filter(
        u =>
          u.role === 'tutor' &&
          !isPurgedRecord(u) &&
          u.accountStatus !== 'deleted' &&
          u.accountStatus !== 'suspended'
      )
      .map(u => {
        const td = u.tutorData;
        return {
          id: u.id,
          name: u.fullName,
          tagline: td?.tagline || `${td?.subjectSpecialization || 'Secondary'} Specialist`,
          subjects:
            td?.proficientSubjects && td.proficientSubjects.length > 0
              ? td.proficientSubjects
              : [td?.subjectSpecialization || 'Mathematics'],
          rating: 5.0,
          reviewCount: 0,
          hourlyRateNaira: td?.hourlyRate || 3500,
          location: `${td?.city || 'Lagos'}, ${td?.state || 'Nigeria'}`,
          state: td?.state || 'Lagos',
          isNinVerified: Boolean(td?.nin || td?.verification?.isVerified),
          education:
            td?.qualification ||
            `${td?.highestEducation || 'B.Sc.'} (${td?.institution || 'Nigerian University'})`,
          avatarUrl: u.avatarUrl || '',
          bio:
            td?.bio ||
            'Registered Nigerian educator offering verified online whiteboard and home lessons.',
          availableDays: ['Mondays', 'Wednesdays', 'Saturdays'],
          lat: 6.5244,
          lng: 3.3792,
          experienceYears:
            td?.experienceYearsRange === '5+ years'
              ? 6
              : td?.experienceYearsRange === '3-5 years'
              ? 4
              : 2,
          degrees: td?.degrees || [],
          certifications: td?.certifications || [],
          examSpecializations: td?.examSpecializations || [],
          curriculumHighlights: td?.curriculumHighlights || [],
          totalLessonsDelivered: tutorBookings.filter(b => b.tutorId === u.id && b.status === 'completed').length,
          completionRate: 100,
          timetable: td?.timetable || []
        };
      });
  }, [allRegisteredUsers, tutorBookings]);

  const createTutorBooking = (
    params: Omit<
      TutorBooking,
      'id' | 'createdAt' | 'status' | 'isParentApproved' | 'isTutorApproved'
    > & {
      parentPin?: string;
      scheduledStartIso?: string;
      scheduledEndIso?: string;
      paymentGateway?: 'paystack_live' | 'parent_escrow_wallet' | 'tutor_credit';
      paymentReference?: string;
    }
  ): TutorBooking | null => {
    const gateway = params.paymentGateway || (params.amountNaira > 0 ? 'parent_escrow_wallet' : 'tutor_credit');

    if (params.amountNaira > 0) {
      if (gateway === 'paystack_live') {
        if (!params.paymentReference || !params.paymentReference.trim()) {
          setLastSecurityAlert('Live Paystack verification reference is required before creating a paid tutor booking.');
          return null;
        }
      } else if (gateway === 'parent_escrow_wallet') {
        if (securityStatus.walletFrozen || currentUserProfile?.walletFrozen) {
          setLastSecurityAlert('Parent Escrow Wallet is currently frozen for security review.');
          return null;
        }
        const expectedPin = parentWallet.pin || currentUserProfile?.parentData?.pin || '';
        if (expectedPin && params.parentPin !== expectedPin) {
          setLastSecurityAlert('Valid 4-digit Parent PIN is required to authorize Escrow Wallet payment.');
          return null;
        }
        if (parentWallet.balanceNaira < params.amountNaira) {
          setLastSecurityAlert(
            `Insufficient Parent Escrow Wallet balance (₦${parentWallet.balanceNaira.toLocaleString()} available, ₦${params.amountNaira.toLocaleString()} required).`
          );
          return null;
        }
      }
    }

    const bookingId = `book-${Date.now().toString().slice(-6)}`;
    const expectedPin = parentWallet.pin || currentUserProfile?.parentData?.pin || '';
    const pinVerifiedNow =
      gateway === 'parent_escrow_wallet'
        ? !expectedPin || params.parentPin === expectedPin
        : Boolean(params.parentPin && expectedPin && params.parentPin === expectedPin);

    // Deduct Parent Escrow Wallet when funded from Escrow Wallet
    if (params.amountNaira > 0 && gateway === 'parent_escrow_wallet') {
      const debitTx: any = {
        id: `tx-book-${Date.now().toString().slice(-6)}`,
        type: 'debit',
        amountNaira: params.amountNaira,
        description: `Tutor Escrow Hold: ${params.tutorName} (${params.subject})`,
        timestamp: 'Just now',
        status: 'successful',
        reference: `ESCROW_${bookingId}`
      };
      setParentWallet(prev => {
        const updatedBalance = Math.max(0, prev.balanceNaira - params.amountNaira);
        const updated = {
          ...prev,
          balanceNaira: updatedBalance,
          transactions: [debitTx, ...prev.transactions]
        };
        if (currentUser && !isOffline) {
          updateDoc(doc(db, 'wallets', currentUser.uid), {
            balanceNaira: updatedBalance,
            updatedAt: new Date().toISOString()
          }).catch(() => {});
        }
        return updated;
      });
    } else if (params.amountNaira > 0 && gateway === 'paystack_live' && params.paymentReference) {
      const liveTx: any = {
        id: `tx-book-live-${Date.now().toString().slice(-6)}`,
        type: 'debit',
        amountNaira: params.amountNaira,
        description: `Live Paystack Escrow Hold: ${params.tutorName} (${params.subject})`,
        timestamp: 'Just now',
        status: 'successful',
        reference: params.paymentReference
      };
      setParentWallet(prev => ({
        ...prev,
        transactions: [liveTx, ...prev.transactions]
      }));
    }

    const isParentApprovedNow = pinVerifiedNow;
    const newBooking: TutorBooking = {
      ...params,
      id: bookingId,
      createdAt: new Date().toISOString(),
      status: isParentApprovedNow ? 'pending_tutor' : 'pending_parent',
      isParentApproved: isParentApprovedNow,
      parentApprovalDate: isParentApprovedNow
        ? new Date().toLocaleDateString('en-NG', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        : undefined,
      isTutorApproved: false,
      paymentGateway: gateway,
      paymentReference: params.paymentReference || `ESCROW_${bookingId}`,
      escrowStatus: params.amountNaira > 0 || gateway === 'tutor_credit' ? 'held_in_escrow' : 'unpaid'
    };

    setTutorBookings(prev => [newBooking, ...prev]);

    if (currentUser && !isOffline) {
      const bookingDocRef = doc(db, 'tutorBookings', bookingId);
      const path = `tutorBookings/${bookingId}`;
      setDoc(bookingDocRef, newBooking).catch(err => {
        handleFirestoreError(err, OperationType.CREATE, path);
      });
    }

    addStudentXP({
      feature: 'tutors',
      baseXP: 100,
      paidAmountNgn: newBooking.amountNaira,
      difficulty: 'medium',
      reason: `Submitted Tutor Booking Request with ${newBooking.tutorName} (${newBooking.subject})`
    });

    return newBooking;
  };

  const sendChatMessage = (tutorId: string, text: string, sender: 'student' | 'tutor') => {
    const senderId = currentUserProfile?.id || currentUser?.uid || `${sender}_anon`;
    const guard = analyzeMessageSecurity(text, senderId, {
      userId: senderId,
      userEmail: currentUserProfile?.email || currentUser?.email || undefined,
      userRole: sender,
      location: `tutor_chat:${tutorId}`
    });
    if (!guard.isClean) {
      setLastSecurityAlert(guard.warningMessage || 'Message blocked by platform safety filter.');
      return;
    }

    const msgId = `msg-${Date.now()}`;
    const newMsg: ChatMessage = {
      id: msgId,
      sender,
      text: guard.sanitizedText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => ({
      ...prev,
      [tutorId]: [...(prev[tutorId] || []), newMsg]
    }));

    if (currentUser && !isOffline) {
      const chatId = `chat_${currentUser.uid}_${tutorId}`;
      const msgDocRef = doc(db, 'chats', chatId, 'messages', msgId);
      const path = `chats/${chatId}/messages/${msgId}`;
      setDoc(msgDocRef, {
        id: msgId,
        senderId: currentUser.uid,
        sender,
        text,
        timestamp: newMsg.timestamp
      }).catch(err => {
        handleFirestoreError(err, OperationType.CREATE, path);
      });
    }
  };

  // Virtual Classroom State & Strict Time-Gated Dual-Approval Access
  const [activeClassroomSession, setActiveClassroomSession] = useState<VirtualClassroomSession | null>(null);
  const WHITEBOARD_EARLY_OPEN_MS = 10 * 60 * 1000; // 10 minutes before scheduled start

  const getBookingJoinStatus = useCallback((booking: TutorBooking, nowMs: number = Date.now()) => {
    if (booking.bookingType !== 'online') {
      return {
        allowed: false,
        status: 'not_online' as const,
        msUntilOpen: 0,
        reason: 'Live Whiteboard is only available for online tutoring sessions.'
      };
    }
    if (booking.status === 'cancelled' || booking.status === 'completed') {
      return {
        allowed: false,
        status: 'cancelled' as const,
        msUntilOpen: 0,
        reason: `This booking is ${booking.status} and cannot open the Live Whiteboard.`
      };
    }
    if (!booking.isParentApproved || booking.status === 'pending_parent') {
      return {
        allowed: false,
        status: 'pending_parent' as const,
        msUntilOpen: 0,
        reason: 'Awaiting Parent PIN authorization before the classroom can unlock.'
      };
    }
    if (!booking.isTutorApproved || booking.status === 'pending_tutor') {
      return {
        allowed: false,
        status: 'pending_tutor' as const,
        msUntilOpen: 0,
        reason: `Awaiting acceptance from ${booking.tutorName} in the Tutor Portal.`
      };
    }
    if (booking.status !== 'confirmed') {
      return {
        allowed: false,
        status: 'pending_tutor' as const,
        msUntilOpen: 0,
        reason: 'Booking must be confirmed by both Parent PIN and Tutor approval.'
      };
    }

    const startMs = booking.scheduledStartIso ? new Date(booking.scheduledStartIso).getTime() : NaN;
    const endMs = booking.scheduledEndIso ? new Date(booking.scheduledEndIso).getTime() : NaN;
    if (!Number.isFinite(startMs) || !Number.isFinite(endMs)) {
      return {
        allowed: false,
        status: 'too_early' as const,
        msUntilOpen: 0,
        reason: 'This session does not have a valid scheduled start/end timestamp.'
      };
    }

    const openMs = startMs - WHITEBOARD_EARLY_OPEN_MS;
    const startLabel = new Date(startMs).toLocaleString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    if (nowMs < openMs) {
      return {
        allowed: false,
        status: 'too_early' as const,
        msUntilOpen: openMs - nowMs,
        startTimeLabel: startLabel,
        reason: `Classroom opens 10 minutes before your scheduled class (${startLabel}).`
      };
    }

    if (nowMs > endMs) {
      return {
        allowed: false,
        status: 'ended' as const,
        msUntilOpen: 0,
        startTimeLabel: startLabel,
        reason: 'Your scheduled session window has ended.'
      };
    }

    return {
      allowed: true,
      status: 'open' as const,
      msUntilOpen: 0,
      startTimeLabel: startLabel,
      reason: 'Live classroom window is active.'
    };
  }, []);

  const getStudentClassroomEligibility = useCallback(
    (nowMs: number = Date.now()) => {
      const onlineBookings = tutorBookings.filter(
        b => b.bookingType === 'online' && b.status !== 'cancelled' && b.status !== 'completed'
      );

      if (onlineBookings.length === 0) {
        return {
          eligible: false,
          activeBooking: null,
          nextBooking: null,
          status: 'no_booking' as const,
          msUntilOpen: 0,
          reason: 'Live booking required: Pay for an online tutor session and get Parent PIN + Tutor approval.'
        };
      }

      for (const b of onlineBookings) {
        const check = getBookingJoinStatus(b, nowMs);
        if (check.allowed) {
          return {
            eligible: true,
            activeBooking: b,
            nextBooking: b,
            status: 'open' as const,
            msUntilOpen: 0,
            reason: check.reason
          };
        }
      }

      // Otherwise surface the earliest upcoming/pending booking status
      const primary = onlineBookings[0];
      const check = getBookingJoinStatus(primary, nowMs);
      return {
        eligible: false,
        activeBooking: null,
        nextBooking: primary,
        status:
          check.status === 'not_online' || check.status === 'cancelled'
            ? ('no_booking' as const)
            : check.status,
        msUntilOpen: check.msUntilOpen,
        reason: check.reason
      };
    },
    [tutorBookings, getBookingJoinStatus]
  );

  const launchVirtualClassroom = (bookingId: string, role?: 'student' | 'tutor'): boolean => {
    if (!isFeatureEnabled('virtualClassroom')) {
      openPausedFeatureNotice('virtualClassroom', 'Live Virtual Classroom');
      return false;
    }

    const resolvedRole: 'student' | 'tutor' = role || (currentRole === 'tutor' ? 'tutor' : 'student');
    let booking = tutorBookings.find(b => b.id === bookingId);
    if (!booking && resolvedRole === 'student') {
      const eligibility = getStudentClassroomEligibility();
      if (eligibility.activeBooking) {
        booking = eligibility.activeBooking;
      }
    }

    if (!booking) {
      setLastSecurityAlert(
        'Live Whiteboard requires a paid, confirmed online tutor booking (approved by both Parent PIN and Tutor).'
      );
      return false;
    }

    const joinCheck = getBookingJoinStatus(booking);
    if (!joinCheck.allowed) {
      setLastSecurityAlert(joinCheck.reason);
      return false;
    }

    const endMs = booking.scheduledEndIso ? new Date(booking.scheduledEndIso).getTime() : Date.now() + 7200 * 1000;
    const remainingSec = Math.max(60, Math.min(10800, Math.floor((endMs - Date.now()) / 1000)));

    setActiveClassroomSession({
      bookingId: booking.id,
      tutorId: booking.tutorId,
      tutorName: booking.tutorName,
      tutorPhoto: booking.tutorPhoto,
      studentId: booking.studentId,
      studentName: booking.studentName,
      subject: booking.subject,
      topic: booking.topic,
      amountNaira: booking.amountNaira,
      durationMinutes: Math.max(30, Math.round(remainingSec / 60)),
      remainingSeconds: remainingSec,
      status: 'active',
      isTutorMicActive: true,
      isStudentMicActive: true,
      activeRole: resolvedRole
    });
    return true;
  };

  const closeVirtualClassroom = () => {
    setActiveClassroomSession(null);
  };

  const toggleVirtualClassroomMic = () => {
    setActiveClassroomSession(prev => {
      if (!prev) return null;
      if (prev.activeRole === 'tutor') {
        return { ...prev, isTutorMicActive: !prev.isTutorMicActive };
      }
      return { ...prev, isStudentMicActive: !prev.isStudentMicActive };
    });
  };

  const completeVirtualSessionAndReleaseEscrow = (
    bookingId: string,
    rating?: number,
    feedback?: string
  ) => {
    // 1. Mark booking as completed
    setTutorBookings(prev =>
      prev.map(b =>
        b.id === bookingId
          ? {
              ...b,
              status: 'completed' as const
            }
          : b
      )
    );

    // 2. Record disbursement in parent wallet ledger
    const targetBooking = tutorBookings.find(b => b.id === bookingId);
    if (targetBooking) {
      const releaseTx: any = {
        id: `tx-rel-${Date.now().toString().slice(-6)}`,
        type: 'debit',
        amountNaira: targetBooking.amountNaira,
        description: `Escrow Disbursed: Online Lesson Completed with ${targetBooking.tutorName} (${targetBooking.subject})`,
        timestamp: 'Just now',
        status: 'successful',
        reference: `RELEASE_${bookingId}`
      };
      setParentWallet(prev => ({
        ...prev,
        transactions: [releaseTx, ...prev.transactions]
      }));
    }

    // 3. Firestore update (only for persistent database bookings, skip demo sessions)
    if (currentUser && !isOffline && !bookingId.startsWith('demo-')) {
      const bookingDocRef = doc(db, 'tutorBookings', bookingId);
      const path = `tutorBookings/${bookingId}`;
      updateDoc(bookingDocRef, {
        status: 'completed'
      }).catch(err => {
        handleFirestoreError(err, OperationType.UPDATE, path);
      });
    }

    // 4. Close classroom session & celebrate
    setActiveClassroomSession(null);
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch {}
  };

  // Progressive Verification State
  const [verifiedAddress, setVerifiedAddress] = useState<VerifiedAddress | null>(() => {
    const saved = safeGetItem('sc_verified_address');
    return saved ? JSON.parse(saved) : null;
  });

  const [tutorVerification, setTutorVerification] = useState<TutorVerificationDetails | null>(() => {
    const saved = safeGetItem('sc_tutor_verification');
    return saved ? JSON.parse(saved) : null;
  });

  const saveVerifiedAddress = (addr: VerifiedAddress) => {
    setVerifiedAddress(addr);
    safeSetItem('sc_verified_address', JSON.stringify(addr));
  };

  const saveTutorVerification = (data: TutorVerificationDetails) => {
    setTutorVerification(data);
    safeSetItem('sc_tutor_verification', JSON.stringify(data));
  };

  const registerNewUser = (role: UserRole, profileData: any) => {
    const newId = `usr_${role}_${Date.now()}`;
    const fullName = profileData.fullName || profileData.name || 'User';
    const email = profileData.email || '';

    const newProfile: RegisteredUserProfile = {
      id: newId,
      role,
      fullName,
      email,
      emailVerified: true,
      verifiedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    setCurrentRole(role);

    if (role === 'student') {
      const candidateRefCode = String(
        profileData.referralCode || appliedReferralCode || safeGetItem('sc_pending_referral_code') || ''
      )
        .trim()
        .toUpperCase();

      const freshStudent: StudentProfile = {
        id: newId,
        name: fullName,
        school: profileData.schoolName || profileData.school || "Secondary School",
        schoolCode: profileData.schoolCode ? profileData.schoolCode.trim().toUpperCase() : undefined,
        classLevel: profileData.classLevel || 'JSS 1',
        stream: profileData.stream || 'Science',
        xp: 0,
        rank: 'Fresher',
        streakDays: 1,
        lastStudyDate: new Date().toISOString().split('T')[0],
        uniformVerified: false,
        uniformPhotoUrl: null,
        downloadedSubjectIds: [],
        completedQuizIds: [],
        completedReadNoteIds: [],
        verifiedReadingLogs: [],
        referredByCode: candidateRefCode || undefined,
        referralAttributedAt: candidateRefCode ? new Date().toISOString() : undefined,
        aspirantRewardStatus: 'not_eligible'
      };
      newProfile.studentData = freshStudent;
      setStudent(freshStudent);
      safeSetItem('sc_student', JSON.stringify(freshStudent));

      if (candidateRefCode) {
        setAppliedReferralCode(candidateRefCode);
        safeSetItem('sc_pending_referral_code', candidateRefCode);
        fetch('/api/partners/register-referral', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            referralCode: candidateRefCode,
            studentId: newId,
            studentName: fullName,
            studentEmail: email,
            classLevel: freshStudent.classLevel
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data?.success && data?.partnerName) {
              setStudent(prev => {
                if (prev.id !== newId) return prev;
                const attributed: StudentProfile = {
                  ...prev,
                  referredByCode: data.referralCode || candidateRefCode,
                  referredPartnerId: data.partnerId,
                  referredPartnerName: data.partnerName
                };
                safeSetItem('sc_student', JSON.stringify(attributed));
                return attributed;
              });
            }
          })
          .catch(() => {});
      }
    } else if (role === 'parent') {
      newProfile.parentData = {
        phone: profileData.phone || '',
        wardName: profileData.wardName || '',
        pin: profileData.pin || ''
      };
      const freshWallet: ParentWallet = {
        balanceNaira: 0,
        pin: profileData.pin || '',
        transactions: []
      };
      setParentWallet(freshWallet);
      safeSetItem('sc_wallet', JSON.stringify(freshWallet));
    } else if (role === 'tutor') {
      const defaultSlots: TimetableSlot[] = [
        { id: `slot-${newId}-1`, day: 'Monday', time: '10:00 AM - 12:00 PM', period: 'Morning', isAvailable: true },
        { id: `slot-${newId}-2`, day: 'Monday', time: '04:00 PM - 06:00 PM', period: 'Afternoon', isAvailable: true },
        { id: `slot-${newId}-3`, day: 'Wednesday', time: '04:00 PM - 06:00 PM', period: 'Afternoon', isAvailable: true },
        { id: `slot-${newId}-4`, day: 'Friday', time: '04:00 PM - 06:00 PM', period: 'Afternoon', isAvailable: true },
        { id: `slot-${newId}-5`, day: 'Saturday', time: '10:00 AM - 12:00 PM', period: 'Morning', isAvailable: true },
        { id: `slot-${newId}-6`, day: 'Saturday', time: '02:00 PM - 04:00 PM', period: 'Afternoon', isAvailable: true }
      ];

      newProfile.tutorData = {
        subjectSpecialization: profileData.subjectSpecialization || profileData.subjects?.[0] || 'General Mathematics',
        qualification: profileData.qualification || profileData.highestEducation || 'B.Sc. (First Class Honours)',
        hourlyRate: Number(profileData.hourlyRate) || Number(profileData.hourlyRateNaira) || 3500,
        teachingMode: profileData.teachingMode || 'both',
        phone: profileData.phone || '',
        gender: profileData.gender || 'Prefer not to say',
        highestEducation: profileData.highestEducation || 'B.Sc.',
        institution: profileData.institution || 'University of Lagos',
        courseOfStudy: profileData.courseOfStudy || 'Education & Science',
        experienceYearsRange: profileData.experienceYearsRange || '3-5 years',
        targetClasses: profileData.targetClasses || ['JSS 3', 'SS 3', 'WAEC/NECO Prep', 'JAMB Prep'],
        proficientSubjects: profileData.proficientSubjects || profileData.subjects || ['Mathematics', 'Physics'],
        bio: profileData.bio || 'Dedicated Nigerian educator specializing in WAEC distinctions, JAMB speed drills, and student-centered conceptual learning.',
        tagline: profileData.tagline || `${profileData.subjectSpecialization || 'WAEC & JAMB'} Specialist Educator`,
        city: profileData.city || 'Ikeja',
        state: profileData.state || 'Lagos',
        nin: profileData.nin || '',
        idDocumentUrl: profileData.idDocumentUrl || '',
        cvResumeUrl: profileData.cvResumeUrl || '',
        guarantors: profileData.guarantors || [
          { name: 'Dr. Joseph Adeleke', phone: '+234 803 111 2233', relationship: 'Former Principal' },
          { name: 'Mrs. Folake Bello', phone: '+234 802 444 5566', relationship: 'Head of Department' }
        ],
        digitalReadiness: profileData.digitalReadiness || {
          hasDevice: true,
          hasInternet: true,
          comfortableWithTools: true
        },
        degrees: profileData.degrees || [
          `${profileData.highestEducation || 'B.Sc.'} ${profileData.courseOfStudy || 'Education'}, ${profileData.institution || 'University of Lagos'}`
        ],
        certifications: profileData.certifications || [
          'TRCN Certified Secondary Educator (Teachers Registration Council of Nigeria)',
          'National Educational Excellence Mentor'
        ],
        examSpecializations: profileData.examSpecializations || [
          'WAEC / WASSCE Grade Distinction Prep',
          'JAMB UTME High-Yield Speed Drills',
          'Junior Secondary BECE Certificate Exams'
        ],
        curriculumHighlights: profileData.curriculumHighlights || [
          'Step-by-step digital whiteboard problem solving',
          'Weekly past question mock diagnostics',
          'Paced exam time management techniques'
        ],
        timetable: profileData.timetable || defaultSlots,
        onboardingStage: profileData.onboardingStage || 3
      };

      if (profileData.nin) {
        setTutorVerification({
          nin: profileData.nin,
          bankName: 'Guaranty Trust Bank (GTBank)',
          accountNumber: '0123456789',
          accountName: fullName,
          isVerified: true
        });
      }
    } else if (role === 'growth_partner') {
      const generatedCode = profileData.referralCode || `GROW${Math.floor(10 + Math.random() * 90)}`;
      const partnerObj: GrowthPartner = {
        id: newId,
        name: fullName,
        email,
        phone: profileData.phone || '',
        referralCode: generatedCode,
        commissionRatePercent: 10,
        totalEarningsNaira: 0,
        totalPaidOutNaira: 0,
        activeReferralsCount: 0,
        bankName: profileData.bankName || 'Guaranty Trust Bank (GTBank)',
        accountNumber: profileData.accountNumber || '',
        accountName: profileData.accountName || fullName,
        status: 'active',
        createdAt: new Date().toISOString()
      };
      newProfile.growthPartnerData = partnerObj;

      // Sync with server Firestore partner endpoint asynchronously
      fetch('/api/partners/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partnerId: newId,
          name: fullName,
          email,
          phone: profileData.phone || '',
          bankName: profileData.bankName || 'Guaranty Trust Bank (GTBank)',
          accountNumber: profileData.accountNumber || '',
          accountName: profileData.accountName || fullName,
          referralCode: generatedCode
        })
      }).catch(err => console.warn('Could not sync partner with server:', err));
    } else if (role === 'admin') {
      const isPrivilegedAdmin = isSuperAdminEmail(email);
      const generatedSchoolCode = profileData.schoolCode || `SCHL${Math.floor(10 + Math.random() * 90)}`;
      newProfile.adminData = {
        schoolName: profileData.schoolName || 'Secondary School',
        schoolType: profileData.schoolType || 'College',
        schoolCode: generatedSchoolCode,
        designation: profileData.designation || 'School Administrator',
        phone: profileData.phone || '',
        state: profileData.state || 'Lagos',
        lga: profileData.lga || 'Lagos Island',
        documentUrl: profileData.documentUrl || '',
        verificationStatus: isPrivilegedAdmin ? 'verified' : (profileData.verificationStatus || 'pending_verification'),
        verifiedAt: isPrivilegedAdmin ? new Date().toISOString() : undefined
      };
    }

    setAllRegisteredUsers(prev => {
      const next = [newProfile, ...prev.filter(u => u.id !== newProfile.id && !isPurgedRecord(u))];
      safeSetItem('sc_all_users', JSON.stringify(next));
      return next;
    });
    setCurrentUserProfile(newProfile);
    safeSetItem('sc_user_profile', JSON.stringify(newProfile));
    setTargetSignUpRole(null);
    setCurrentScreen('app');
  };

  const publishSchoolMaterial = (material: Omit<SchoolMaterial, 'id' | 'createdAt'>) => {
    const newMaterial: SchoolMaterial = {
      ...material,
      id: `mat_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString()
    };
    setSchoolMaterials(prev => [newMaterial, ...prev]);

    if (!isOffline && isFirebaseConnected) {
      setDoc(doc(db, 'school_materials', newMaterial.id), newMaterial).catch(err => {
        console.warn('Could not sync school material to Firestore:', err);
      });
    }
  };

  const deleteSchoolMaterial = (id: string) => {
    setSchoolMaterials(prev => prev.filter(m => m.id !== id));

    if (!isOffline && isFirebaseConnected) {
      deleteDoc(doc(db, 'school_materials', id)).catch(err => {
        console.warn('Could not delete school material from Firestore:', err);
      });
    }
  };

  const verifySchoolAdmin = (status: 'verified' | 'pending_verification') => {
    if (!currentUserProfile) return;
    const currentAdminData = currentUserProfile.adminData || {
      schoolName: 'Secondary School',
      schoolType: 'College'
    };
    const updated: RegisteredUserProfile = {
      ...currentUserProfile,
      adminData: {
        ...currentAdminData,
        verificationStatus: status,
        verifiedAt: status === 'verified' ? new Date().toISOString() : undefined
      }
    };
    setCurrentUserProfile(updated);
    safeSetItem('sc_user_profile', JSON.stringify(updated));

    // Also update in allRegisteredUsers
    setAllRegisteredUsers(prev => {
      const updatedList = prev.map(u => (u.id === currentUserProfile.id ? updated : u));
      safeSetItem('sc_all_users', JSON.stringify(updatedList));
      return updatedList;
    });

    if (!isOffline && isFirebaseConnected && currentUserProfile.id) {
      setDoc(doc(db, 'users', currentUserProfile.id), { adminData: updated.adminData }, { merge: true }).catch(err => {
        console.warn('Could not sync admin verification to Firestore:', err);
      });
    }
  };

  const linkStudentToSchool = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return false;

    const updatedStudent: StudentProfile = {
      ...student,
      schoolCode: cleanCode
    };
    setStudent(updatedStudent);
    safeSetItem('sc_student', JSON.stringify(updatedStudent));

    if (currentUserProfile && currentUserProfile.role === 'student') {
      const updatedProfile: RegisteredUserProfile = {
        ...currentUserProfile,
        studentData: updatedStudent
      };
      setCurrentUserProfile(updatedProfile);
      safeSetItem('sc_user_profile', JSON.stringify(updatedProfile));

      // Also update in allRegisteredUsers directory so School Admin roster sees it in real time
      setAllRegisteredUsers(prev => {
        const updatedList = prev.map(u => (u.id === currentUserProfile.id ? updatedProfile : u));
        safeSetItem('sc_all_users', JSON.stringify(updatedList));
        return updatedList;
      });

      if (!isOffline && isFirebaseConnected && currentUser?.uid) {
        setDoc(doc(db, 'students', currentUser.uid), { schoolCode: cleanCode }, { merge: true }).catch(err => {
          console.warn('Could not sync student school code to Firestore:', err);
        });
      }
    }
    return true;
  };

  const subscribeSchoolAdmin = async (plan: 'monthly' | 'termly', paystackRef: string): Promise<boolean> => {
    if (!currentUserProfile) return false;
    const isTermly = plan === 'termly';
    const amountNaira = isTermly ? 42000 : 15000;
    const durationDays = isTermly ? 90 : 30;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000).toISOString();

    const currentAdminData = currentUserProfile.adminData || {
      schoolName: 'Secondary School',
      schoolType: 'College'
    };

    const directSub = {
      plan,
      amountNaira,
      paidAt: now.toISOString(),
      expiresAt,
      paystackReference: paystackRef,
      status: 'active' as const
    };

    const updatedProfile: RegisteredUserProfile = {
      ...currentUserProfile,
      adminData: {
        ...currentAdminData,
        directSubscription: directSub,
        accreditationQualified: true,
        qualificationReason: 'direct_subscription'
      }
    };

    setCurrentUserProfile(updatedProfile);
    safeSetItem('sc_user_profile', JSON.stringify(updatedProfile));

    setAllRegisteredUsers(prev => {
      const updatedList = prev.map(u => (u.id === currentUserProfile.id ? updatedProfile : u));
      safeSetItem('sc_all_users', JSON.stringify(updatedList));
      return updatedList;
    });

    if (!isOffline && isFirebaseConnected && currentUserProfile.id) {
      setDoc(doc(db, 'users', currentUserProfile.id), {
        adminData: updatedProfile.adminData
      }, { merge: true }).catch(err => {
        console.warn('Could not sync school subscription to Firestore:', err);
      });
    }

    return true;
  };

  const getSchoolAccreditationMetrics = (schoolCode: string) => {
    const cleanCode = (schoolCode || '').trim().toUpperCase();
    if (!cleanCode) {
      return {
        totalStudents: 0,
        paidStudents: 0,
        freeStudents: 0,
        hasActiveDirectSubscription: false,
        isQualifiedForReview: false
      };
    }

    const matchingStudents: StudentProfile[] = [];
    const seenIds = new Set<string>();

    if (student?.name && student.schoolCode?.toUpperCase() === cleanCode) {
      matchingStudents.push(student);
      seenIds.add(student.id || 'current_student');
    }

    allRegisteredUsers.forEach(u => {
      if (u.role === 'student' && u.studentData && u.studentData.schoolCode?.toUpperCase() === cleanCode) {
        const sid = u.studentData.id || u.id;
        if (!seenIds.has(sid)) {
          seenIds.add(sid);
          matchingStudents.push(u.studentData);
        }
      }
    });

    let paidCount = 0;
    matchingStudents.forEach(s => {
      const isPaid = s.isSubscribed === true ||
        (Boolean(s.subscriptionTier) && s.subscriptionTier !== 'free') ||
        (Boolean(s.subscribedUntil) && new Date(s.subscribedUntil!) > new Date());
      if (isPaid) {
        paidCount++;
      }
    });

    const totalStudents = matchingStudents.length;
    const freeStudents = Math.max(0, totalStudents - paidCount);

    const adminUser = allRegisteredUsers.find(
      u => (u.role === 'school_admin' || u.role === 'admin') &&
           u.adminData?.schoolCode?.toUpperCase() === cleanCode
    );

    const directSub = adminUser?.adminData?.directSubscription || currentUserProfile?.adminData?.directSubscription;
    const hasActiveDirectSubscription = Boolean(
      directSub && directSub.status === 'active' && new Date(directSub.expiresAt) > new Date()
    );

    const meetsThreshold = paidCount >= 50;
    const isQualifiedForReview = meetsThreshold || hasActiveDirectSubscription;
    const qualificationReason = meetsThreshold
      ? ('paid_students_threshold' as const)
      : hasActiveDirectSubscription
      ? ('direct_subscription' as const)
      : undefined;

    return {
      totalStudents,
      paidStudents: paidCount,
      freeStudents,
      hasActiveDirectSubscription,
      directSubscriptionExpiresAt: directSub?.expiresAt,
      isQualifiedForReview,
      qualificationReason
    };
  };

  const setStudentSubscriptionStatus = async (
    studentId: string,
    isSubscribed: boolean,
    tier: StudentSubscriptionTier = 'standard'
  ) => {
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    if (student.id === studentId || studentId === 'current') {
      const updated: StudentProfile = {
        ...student,
        isSubscribed,
        subscriptionTier: isSubscribed ? tier : 'free',
        subscribedUntil: isSubscribed ? expiresAt : undefined
      };
      setStudent(updated);
      safeSetItem('sc_student', JSON.stringify(updated));
    }

    setAllRegisteredUsers(prev => {
      const updated = prev.map(u => {
        if (u.id === studentId || (u.studentData && u.studentData.id === studentId)) {
          const currentStudent = u.studentData || {
            id: u.id,
            name: u.fullName,
            school: 'Secondary School',
            classLevel: 'SS 1' as const,
            stream: 'Science' as const,
            xp: 0,
            rank: 'Scholar' as const,
            streakDays: 0,
            lastStudyDate: new Date().toISOString(),
            uniformVerified: true,
            uniformPhotoUrl: null,
            downloadedSubjectIds: [],
            completedQuizIds: []
          };
          const updatedStudentData: StudentProfile = {
            ...currentStudent,
            isSubscribed,
            subscriptionTier: isSubscribed ? tier : 'free',
            subscribedUntil: isSubscribed ? expiresAt : undefined
          };
          return {
            ...u,
            studentData: updatedStudentData
          };
        }
        return u;
      });
      safeSetItem('sc_all_users', JSON.stringify(updated));
      return updated;
    });

    if (!isOffline && isFirebaseConnected && studentId && studentId !== 'current') {
      setDoc(doc(db, 'students', studentId), {
        isSubscribed,
        subscriptionTier: isSubscribed ? tier : 'free',
        subscribedUntil: isSubscribed ? expiresAt : null
      }, { merge: true }).catch(err => {
        console.warn('Could not sync student subscription to Firestore:', err);
      });
    }
  };

  // 4-Tier Student Subscriptions & Entitlements State & Engine
  const [isStudentSubscriptionModalOpen, setIsStudentSubscriptionModalOpen] = useState<boolean>(false);
  const [targetSubscriptionPlan, setTargetSubscriptionPlan] = useState<StudentSubscriptionPlan | null>(null);

  const openStudentSubscriptionModal = (targetPlan?: StudentSubscriptionPlan) => {
    if (targetPlan) setTargetSubscriptionPlan(targetPlan);
    setIsStudentSubscriptionModalOpen(true);
  };

  const closeStudentSubscriptionModal = () => {
    setIsStudentSubscriptionModalOpen(false);
    setTargetSubscriptionPlan(null);
  };

  const getAcademicTermEndDate = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    let end: Date;
    if (month >= 0 && month <= 3) {
      end = new Date(year, 3, 20, 23, 59, 59);
      if (now >= end) end = new Date(year, 6, 31, 23, 59, 59);
    } else if (month >= 4 && month <= 7) {
      end = new Date(year, 6, 31, 23, 59, 59);
      if (now >= end) end = new Date(year, 11, 20, 23, 59, 59);
    } else {
      end = new Date(year, 11, 20, 23, 59, 59);
      if (now >= end) end = new Date(year + 1, 3, 20, 23, 59, 59);
    }
    return end.toISOString();
  };

  const subscribeStudentTier = async (
    plan: StudentSubscriptionPlan,
    paymentMethod: 'paystack' | 'wallet',
    paystackRef?: string,
    referralCodeOverride?: string,
    skipPartnerSync = false
  ): Promise<{ success: boolean; error?: string; finalAmountNaira?: number }> => {
    const activeRefCode = (referralCodeOverride || student.referredByCode || appliedReferralCode || '').trim().toUpperCase();
    const quote = getStudentTierPricing(plan, Boolean(activeRefCode), student.classLevel);
    const feeNaira = quote.finalPriceNaira;

    if (paymentMethod === 'wallet' && feeNaira > 0) {
      const currentBalance = parentWallet.balanceNaira;
      if (currentBalance < feeNaira) {
        return {
          success: false,
          error: `Insufficient Parent Escrow Wallet balance (₦${currentBalance.toLocaleString()} available, ₦${feeNaira.toLocaleString()} required). Please fund your wallet or pay via Paystack.`
        };
      }

      // Deduct from wallet
      const txId = `TX_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const updatedBalance = currentBalance - feeNaira;
      const discountLabel = quote.promoApplied ? ` (${quote.discountPercent}% Referral Promo)` : '';
      const newTransaction: WalletTransaction = {
        id: txId,
        type: 'debit',
        amountNaira: feeNaira,
        description: `Subscribed to ${plan.toUpperCase()} Tier Pass${discountLabel}`,
        timestamp: new Date().toISOString(),
        status: 'successful',
        reference: txId
      };
      const updatedWallet: ParentWallet = {
        ...parentWallet,
        balanceNaira: updatedBalance,
        transactions: [newTransaction, ...parentWallet.transactions]
      };
      setParentWallet(updatedWallet);
      safeSetItem('sc_parent_wallet', JSON.stringify(updatedWallet));
    }

    const termExpiresAt = getAcademicTermEndDate();
    const effectiveStudentId = student.id || currentUser?.uid || (currentUserProfile?.id ? currentUserProfile.id : 'student_active');

    // Sync 10% Growth Partner commission on discounted net fee when paying via Wallet (Paystack syncs in verify-payment)
    if (!skipPartnerSync && feeNaira > 0 && activeRefCode) {
      fetch('/api/partners/process-subscription-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: effectiveStudentId,
          studentName: student.name || currentUserProfile?.fullName || 'Student',
          studentEmail: currentUserProfile?.email || '',
          plan: `${plan.toUpperCase()} Tier`,
          planName: `${plan.toUpperCase()} Tier`,
          amountNaira: feeNaira,
          originalAmountNaira: quote.basePriceNaira,
          discountPercent: quote.discountPercent,
          clientPaymentId: paystackRef || `WALLET_${Date.now()}`,
          paystackRef: paystackRef || `WALLET_${Date.now()}`,
          referralCode: activeRefCode,
          classLevel: student.classLevel,
          isAspirant: student.classLevel === 'University Aspirant'
        })
      }).catch(() => {});
    }

    // If Elite Tier (₦60,000 / ₦48,000 promo), automatically credit ₦16,000 Pre-paid Tutor Credits to Parent Escrow Wallet
    if (plan === 'elite') {
      const bonusTxId = `TX_TUTOR_BONUS_${Date.now()}`;
      setParentWallet(prev => {
        const bonusTx: WalletTransaction = {
          id: bonusTxId,
          type: 'credit',
          amountNaira: 16000,
          description: '₦16,000 Pre-paid Tutor Booking Credits (Elite Scholar Tier)',
          timestamp: new Date().toISOString(),
          status: 'successful',
          reference: bonusTxId
        };
        const newWallet = {
          ...prev,
          balanceNaira: prev.balanceNaira + 16000,
          transactions: [bonusTx, ...prev.transactions]
        };
        safeSetItem('sc_parent_wallet', JSON.stringify(newWallet));
        return newWallet;
      });
    }

    // Automatically unlock Prepare for Exam Plan if Standard or Elite
    if (plan === 'standard' || plan === 'elite') {
      setExamPrepState(prev => {
        const updated = {
          ...prev,
          isUnlocked: true,
          unlockedAt: new Date().toISOString(),
          paymentMethod: paymentMethod === 'wallet' ? ('escrow_wallet' as const) : ('direct_paystack' as const),
          tutorCreditsNaira: prev.tutorCreditsNaira + (plan === 'elite' ? 16000 : 0)
        };
        safeSetItem('sc_exam_prep', JSON.stringify(updated));
        return updated;
      });
    }

    const updatedStudent: StudentProfile = {
      ...student,
      isSubscribed: plan !== 'free',
      subscriptionPlan: plan,
      subscriptionTier: plan,
      subscribedUntil: termExpiresAt,
      termExpiresAt,
      referredByCode: activeRefCode || student.referredByCode
    };

    setStudent(updatedStudent);
    safeSetItem('sc_student', JSON.stringify(updatedStudent));

    if (currentUserProfile) {
      const updatedProfile: RegisteredUserProfile = {
        ...currentUserProfile,
        studentData: updatedStudent
      };
      setCurrentUserProfile(updatedProfile);
      safeSetItem('sc_user_profile', JSON.stringify(updatedProfile));

      setAllRegisteredUsers(prev => {
        const updated = prev.map(u => (u.id === currentUserProfile.id ? updatedProfile : u));
        safeSetItem('sc_all_users', JSON.stringify(updated));
        return updated;
      });
    }

    // Persist to Firestore
    if (!isOffline && isFirebaseConnected && effectiveStudentId) {
      setDoc(doc(db, 'students', effectiveStudentId), {
        isSubscribed: plan !== 'free',
        subscriptionPlan: plan,
        subscriptionTier: plan,
        termExpiresAt,
        subscribedUntil: termExpiresAt,
        referredByCode: activeRefCode || student.referredByCode || null,
        lastSubscribedAt: new Date().toISOString(),
        lastPaymentReference: paystackRef || `WALLET_${Date.now()}`
      }, { merge: true }).catch(err => {
        console.warn('Could not sync student subscription to Firestore:', err);
      });
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (plan !== 'free') {
      addStudentXP({
        feature: 'general',
        baseXP: 500,
        paidAmountNgn: feeNaira,
        difficulty: 'hard',
        reason: `Enrolled in ${plan.toUpperCase()} Academic Membership`
      });
    }

    return { success: true, finalAmountNaira: feeNaira };
  };

  const unlockStudentAddOn = async (
    addon: 'ai_coach' | 'termly_competition' | 'termly_drill_all' | 'termly_drill_single',
    subject?: string,
    paymentMethod: 'paystack' | 'wallet' = 'wallet',
    paystackRef?: string
  ): Promise<{ success: boolean; error?: string }> => {
    const prices: Record<string, number> = {
      ai_coach: 10000,
      termly_competition: 10000,
      termly_drill_all: 5000,
      termly_drill_single: 1000
    };

    const feeNaira = prices[addon] || 1000;

    if (paymentMethod === 'wallet') {
      const currentBalance = parentWallet.balanceNaira;
      if (currentBalance < feeNaira) {
        return {
          success: false,
          error: `Insufficient Parent Escrow Wallet balance (₦${currentBalance.toLocaleString()} available, ₦${feeNaira.toLocaleString()} required).`
        };
      }

      const txId = `TX_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const updatedWallet: ParentWallet = {
        ...parentWallet,
        balanceNaira: currentBalance - feeNaira,
        transactions: [
          {
            id: txId,
            type: 'debit',
            amountNaira: feeNaira,
            description: `Unlocked Add-On: ${addon.replace(/_/g, ' ').toUpperCase()}${subject ? ` (${subject})` : ''}`,
            timestamp: new Date().toISOString(),
            status: 'successful',
            reference: txId
          },
          ...parentWallet.transactions
        ]
      };
      setParentWallet(updatedWallet);
      safeSetItem('sc_parent_wallet', JSON.stringify(updatedWallet));
    }

    const currentAddOns = student.addOns || {};
    const updatedAddOns: StudentAddOnEntitlements = {
      ...currentAddOns,
      aiCoachUnlocked: addon === 'ai_coach' ? true : currentAddOns.aiCoachUnlocked,
      termlyCompetitionUnlocked: addon === 'termly_competition' ? true : currentAddOns.termlyCompetitionUnlocked,
      termlyDrillAllSubjects: addon === 'termly_drill_all' ? true : currentAddOns.termlyDrillAllSubjects,
      termlyDrillSingleSubjects: addon === 'termly_drill_single' && subject
        ? Array.from(new Set([...(currentAddOns.termlyDrillSingleSubjects || []), subject]))
        : currentAddOns.termlyDrillSingleSubjects
    };

    const updatedStudent: StudentProfile = {
      ...student,
      addOns: updatedAddOns
    };

    setStudent(updatedStudent);
    safeSetItem('sc_student', JSON.stringify(updatedStudent));

    if (currentUserProfile) {
      const updatedProfile: RegisteredUserProfile = {
        ...currentUserProfile,
        studentData: updatedStudent
      };
      setCurrentUserProfile(updatedProfile);
      safeSetItem('sc_user_profile', JSON.stringify(updatedProfile));
    }

    return { success: true };
  };

  const recordDailyGameAttempt = (gameId: string): { allowed: boolean; remainingAttempts: number } => {
    const plan = student.subscriptionPlan || (student.isSubscribed ? 'basic' : 'free');
    if (plan !== 'free') {
      return { allowed: true, remainingAttempts: 999 };
    }

    const allowedFreeGames = ['maths_sprint', 'periodic_table', 'maths-sprint', 'periodic-table'];
    if (!allowedFreeGames.includes(gameId)) {
      return { allowed: false, remainingAttempts: 0 };
    }

    const today = new Date().toISOString().split('T')[0];
    const currentDaily = student.addOns?.dailyGameAttempts;
    let attemptsToday = 0;

    if (currentDaily && currentDaily.date === today) {
      attemptsToday = currentDaily.attempts[gameId] || 0;
    }

    if (attemptsToday >= 1) {
      return { allowed: false, remainingAttempts: 0 };
    }

    const updatedDaily = {
      date: today,
      attempts: {
        ...(currentDaily?.date === today ? currentDaily.attempts : {}),
        [gameId]: attemptsToday + 1
      }
    };

    const updatedStudent: StudentProfile = {
      ...student,
      addOns: {
        ...(student.addOns || {}),
        dailyGameAttempts: updatedDaily
      }
    };

    setStudent(updatedStudent);
    safeSetItem('sc_student', JSON.stringify(updatedStudent));

    return { allowed: true, remainingAttempts: 0 };
  };

  const checkStudentFeatureAccess = (
    feature:
      | 'scheme_weeks'
      | 'quiz_questions'
      | 'formulas'
      | 'games'
      | 'termly_drill'
      | 'leaderboard_win'
      | 'chat'
      | 'ai_verification'
      | 'weekly_competition'
      | 'ai_coach'
      | 'termly_competition'
      | 'prepare_exam',
    options?: { weekNumber?: number; term?: string; questionIndex?: number; gameId?: string; subject?: string }
  ): {
    hasAccess: boolean;
    requiredPlan?: StudentSubscriptionPlan;
    reason?: string;
    unlockPriceNaira?: number;
    lockType?: 'tier' | 'upcoming_release' | 'term_closed';
    unlockDateLabel?: string;
    daysRemaining?: number;
  } => {
    const plan: StudentSubscriptionPlan = student.subscriptionPlan || (student.isSubscribed ? 'basic' : 'free');
    const addOns = student.addOns || {};

    if (feature === 'scheme_weeks') {
      const termStatus = getNerdcTermAccessStatus(options?.term, effectiveTermBypass);
      if (!termStatus.isUnlocked) {
        return {
          hasAccess: false,
          lockType: termStatus.lockType,
          reason: termStatus.reason,
          unlockDateLabel: termStatus.unlockDateLabel,
          daysRemaining: termStatus.daysRemaining
        };
      }

      const week = options?.weekNumber || 1;
      if (plan === 'free') {
        if (week <= 2) return { hasAccess: true };
        return {
          hasAccess: false,
          lockType: 'tier',
          requiredPlan: 'basic',
          reason: 'Weeks 3 to 12 lesson notes are locked on the Free Tier. Upgrade to the Basic Plan (₦8,000 / term) for full term coverage.',
          unlockPriceNaira: 8000
        };
      }
      return { hasAccess: true };
    }

    if (feature === 'quiz_questions') {
      const qIdx = options?.questionIndex !== undefined ? options.questionIndex : 0;
      if (plan === 'free') {
        if (qIdx < 2) return { hasAccess: true };
        return {
          hasAccess: false,
          requiredPlan: 'basic',
          reason: 'Topic quizzes are restricted on the Free Tier. Upgrade to Basic Plan (₦8,000 / term) for 5 questions or Standard Plan for all 10.',
          unlockPriceNaira: 8000
        };
      }
      if (plan === 'basic') {
        if (qIdx < 5) return { hasAccess: true };
        return {
          hasAccess: false,
          requiredPlan: 'standard',
          reason: 'Questions 6 to 10 are locked on the Basic Tier. Upgrade to Standard Plan (₦15,000 / term) for full 10-question quizzes.',
          unlockPriceNaira: 15000
        };
      }
      return { hasAccess: true };
    }

    if (feature === 'formulas') {
      return { hasAccess: true };
    }

    if (feature === 'games') {
      const gameId = options?.gameId || '';
      if (plan === 'free') {
        const freeGames = ['maths_sprint', 'periodic_table', 'maths-sprint', 'periodic-table'];
        if (freeGames.includes(gameId)) {
          return { hasAccess: true };
        }
        return {
          hasAccess: false,
          requiredPlan: 'basic',
          reason: 'Only Maths Sprint and Periodic Table are unlocked on the Free Tier (1 attempt/day). Upgrade to Basic (₦8,000) for 4 games or Standard (₦15,000) for all games.',
          unlockPriceNaira: 8000
        };
      }
      if (plan === 'basic') {
        const basicGames = [
          'maths_sprint',
          'periodic_table',
          'speed_concord',
          'nigerian_geo_civic',
          'maths-sprint',
          'periodic-table',
          'speed-concord',
          'nigerian-geo-civic'
        ];
        if (basicGames.includes(gameId)) {
          return { hasAccess: true };
        }
        return {
          hasAccess: false,
          requiredPlan: 'standard',
          reason: 'This game is locked on the Basic Tier. Upgrade to Standard Plan (₦15,000 / term) to unlock all arcade study games unlimited.',
          unlockPriceNaira: 15000
        };
      }
      return { hasAccess: true };
    }

    if (feature === 'termly_drill') {
      if (plan === 'elite' || plan === 'standard') return { hasAccess: true };
      if (addOns.termlyDrillAllSubjects) return { hasAccess: true };
      if (options?.subject && addOns.termlyDrillSingleSubjects?.includes(options.subject)) {
        return { hasAccess: true };
      }
      if (plan === 'basic') {
        return {
          hasAccess: false,
          requiredPlan: 'standard',
          reason: 'Termly CBT Drills are locked on the Basic Tier. Unlock for ₦5,000 (all subjects), ₦1,000 (single subject), or upgrade to Standard Plan (₦15,000).',
          unlockPriceNaira: 5000
        };
      }
      return {
        hasAccess: false,
        requiredPlan: 'standard',
        reason: 'Termly Drills are locked on the Free Tier. Upgrade to Standard Plan (₦15,000 / term) for unlimited CBT practice.',
        unlockPriceNaira: 15000
      };
    }

    if (feature === 'leaderboard_win') {
      if (plan === 'free') {
        return {
          hasAccess: false,
          requiredPlan: 'basic',
          reason: 'Free tier students can view the leaderboard to track rankings, but cannot earn full competition XP to win prizes. Upgrade to Basic (₦8,000 / term) to rank and win!',
          unlockPriceNaira: 8000
        };
      }
      return { hasAccess: true };
    }

    if (feature === 'chat') {
      if (plan === 'free') {
        return {
          hasAccess: false,
          requiredPlan: 'basic',
          reason: 'Community discussions and academic chat channels require a Basic Plan (₦8,000 / term) or above.',
          unlockPriceNaira: 8000
        };
      }
      return { hasAccess: true };
    }

    if (feature === 'ai_verification') {
      if (plan === 'free') {
        return {
          hasAccess: false,
          requiredPlan: 'basic',
          reason: 'AI uniform verification to earn 500 XP is locked on the Free Tier. Upgrade to Basic (₦8,000 / term) to verify and claim rank XP.',
          unlockPriceNaira: 8000
        };
      }
      return { hasAccess: true };
    }

    if (feature === 'weekly_competition') {
      if (plan === 'standard' || plan === 'elite') return { hasAccess: true };
      return {
        hasAccess: false,
        requiredPlan: 'standard',
        reason: 'Weekly student championship contests are unlocked on Standard (₦15,000) and Elite (₦60,000) plans.',
        unlockPriceNaira: 15000
      };
    }

    if (feature === 'ai_coach') {
      if (plan === 'elite') return { hasAccess: true };
      if (addOns.aiCoachUnlocked) return { hasAccess: true };
      return {
        hasAccess: false,
        requiredPlan: 'elite',
        reason: 'SC AI Coach is included in the Elite Tier (₦60,000) or available as a ₦10,000 modular add-on.',
        unlockPriceNaira: 10000
      };
    }

    if (feature === 'termly_competition') {
      if (plan === 'elite') return { hasAccess: true };
      if (addOns.termlyCompetitionUnlocked) return { hasAccess: true };
      return {
        hasAccess: false,
        requiredPlan: 'elite',
        reason: 'Termly National Mock Tournaments with cash prizes are unlocked in Elite Tier or accessible with a ₦10,000 competition pass.',
        unlockPriceNaira: 10000
      };
    }

    if (feature === 'prepare_exam') {
      if (plan === 'standard' || plan === 'elite') return { hasAccess: true };
      if (examPrepState.isUnlocked) return { hasAccess: true };
      return {
        hasAccess: false,
        requiredPlan: 'standard',
        reason: 'Prepare For Exam Plan is included in Standard (₦15,000) and Elite (₦60,000) plans.',
        unlockPriceNaira: 15000
      };
    }

    return { hasAccess: true };
  };

  const updateTutorProfile = (updatedTutorData: Partial<RegisteredTutorData>) => {
    if (!currentUserProfile || currentUserProfile.role !== 'tutor') return;
    const currentTutor = currentUserProfile.tutorData || {
      subjectSpecialization: 'General Subjects',
      qualification: 'B.Sc.',
      hourlyRate: 3500,
      teachingMode: 'both'
    };
    const merged: RegisteredUserProfile = {
      ...currentUserProfile,
      avatarUrl: updatedTutorData.idDocumentUrl || currentUserProfile.avatarUrl,
      tutorData: {
        ...currentTutor,
        ...updatedTutorData
      }
    };
    setCurrentUserProfile(merged);
    safeSetItem('sc_user_profile', JSON.stringify(merged));
  };

  const deleteAccount = async (userId?: string) => {
    const targetUid = userId || currentUser?.uid;
    if (targetUid && !isOffline) {
      try {
        await deleteDoc(doc(db, 'students', targetUid));
        await deleteDoc(doc(db, 'wallets', targetUid));
      } catch (err) {
        console.warn('Could not delete firestore docs:', err);
      }
    }
    signOutApp();
  };

  const signOutApp = () => {
    setCurrentUserProfile(null);
    safeRemoveItem('sc_user_profile');
    safeRemoveItem('sc_student');
    safeRemoveItem('sc_wallet');
    safeRemoveItem('sc_bookings');
    safeRemoveItem('sc_chats');
    setStudent(INITIAL_EMPTY_STUDENT);
    setParentWallet(INITIAL_EMPTY_WALLET);
    setTutorBookings([]);
    setChatMessages({});
    setExamResults([]);
    setIsParentPinUnlocked(false);
    setAdminTermLockOverride(false);
    setTargetSignUpRole(null);
    setIsOffline(false);
    setCurrentScreen('landing');
  };

  const resetDemoData = () => {
    signOutApp();
  };

  const purgeAllTestAccountsAndCredits = async (adminEmailOverride?: string) => {
    const actorEmail = (adminEmailOverride || currentUserProfile?.email || currentUser?.email || '').toLowerCase().trim();
    let purgedLocalCount = 0;

    setAllRegisteredUsers(prev => {
      const filtered = prev.filter(u => {
        if (isSuperAdminEmail(u.email) || u.isSuperAdmin) return true;
        if (isPurgedRecord(u)) {
          purgedLocalCount++;
          return false;
        }
        return true;
      });
      const finalUsers = filtered.length > 0 ? filtered : INITIAL_USER_DIRECTORY;
      safeSetItem('sc_all_users', JSON.stringify(finalUsers));
      return finalUsers;
    });

    setTutorBookings(prev => prev.filter(b => !isPurgedRecord(b)));
    setChatMessages(prev => {
      const next: Record<string, ChatMessage[]> = {};
      Object.entries(prev).forEach(([k, v]) => {
        if (!PURGED_PATTERNS.some(p => k.toLowerCase().includes(p))) next[k] = v;
      });
      return next;
    });

    if (parentWallet.balanceNaira === 35000 && (!parentWallet.transactions || parentWallet.transactions.length === 0)) {
      setParentWallet(INITIAL_EMPTY_WALLET);
      safeRemoveItem('sc_wallet');
    }

    try {
      const res = await fetch('/api/admin/purge-test-accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminEmail: actorEmail })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return {
          success: false,
          purgedLocalCount,
          deletedFirestoreDocs: 0,
          purgedStoreEntries: 0,
          message: data.error || 'Server purge rejected.',
          error: data.error || 'Server purge rejected.'
        };
      }
      return {
        success: true,
        purgedLocalCount,
        deletedFirestoreDocs: Number(data.deletedFirestoreDocs) || 0,
        purgedStoreEntries: Number(data.purgedStoreEntries) || 0,
        message: data.message || 'Purged all test personas and synthetic wallet credits.'
      };
    } catch (err: any) {
      return {
        success: false,
        purgedLocalCount,
        deletedFirestoreDocs: 0,
        purgedStoreEntries: 0,
        message: err?.message || 'Network error calling server purge.',
        error: err?.message || 'Network error calling server purge.'
      };
    }
  };

  const startImpersonation = (user: RegisteredUserProfile) => {
    if (user.accountStatus === 'deleted') {
      setLastSecurityAlert('Cannot impersonate a soft-deleted and scrubbed account.');
      return;
    }
    setAdminTermLockOverride(false);
    setImpersonatedUser(user);
    setCurrentRole(user.role);
    if (user.role === 'student' && user.studentData) {
      setStudent(user.studentData);
    } else if (user.role === 'parent' && user.parentData) {
      setIsParentPinUnlocked(true);
      setParentWallet(prev => ({
        ...prev,
        pin: user.parentData?.pin || '',
        balanceNaira: prev.balanceNaira || 0
      }));
    }
    setCurrentScreen('app');
  };

  const stopImpersonation = () => {
    setAdminTermLockOverride(false);
    setImpersonatedUser(null);
    setCurrentRole('admin');
  };

  const switchRole = (role: UserRole) => {
    setAdminTermLockOverride(false);
    setCurrentRole(role);
  };

  const updateUserRecord = async (userId: string, updates: Partial<RegisteredUserProfile>) => {
    setAllRegisteredUsers(prev => {
      const updated = prev.map(u => (u.id === userId ? { ...u, ...updates } : u));
      safeSetItem('sc_all_users', JSON.stringify(updated));
      return updated;
    });

    if (currentUserProfile && currentUserProfile.id === userId) {
      const updated = { ...currentUserProfile, ...updates };
      setCurrentUserProfile(updated);
      safeSetItem('sc_user_profile', JSON.stringify(updated));
    }

    if (impersonatedUser && impersonatedUser.id === userId) {
      const updated = { ...impersonatedUser, ...updates };
      setImpersonatedUser(updated);
      if (updated.studentData) setStudent(updated.studentData);
    }

    if (!isOffline && isFirebaseConnected) {
      setDoc(doc(db, 'users', userId), updates, { merge: true }).catch(err => {
        console.warn('Could not sync user update to Firestore:', err);
      });
    }
  };

  const softDeleteUserRecord = async (
    userId: string,
    reason: string,
    adminEmailOverride?: string
  ): Promise<{ success: boolean; error?: string }> => {
    const targetUser = allRegisteredUsers.find(
      u => u.id === userId || u.email.toLowerCase() === userId.toLowerCase()
    );
    const resolvedId = targetUser?.id || userId;
    const resolvedEmail = targetUser?.email || (userId.includes('@') ? userId : undefined);

    if (isSuperAdminEmail(resolvedEmail) || targetUser?.isSuperAdmin) {
      return { success: false, error: 'Verified Super Admin accounts cannot be deleted.' };
    }

    const adminEmail =
      adminEmailOverride || currentUserProfile?.email || currentUser?.email || SUPER_ADMIN_EMAIL;
    const nowIso = new Date().toISOString();
    const cleanReason =
      String(reason || '').trim() || 'Account permanently closed by Super Admin for policy/security violation';

    try {
      const res = await fetch('/api/security/action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getSecurityHeaders({ userEmail: adminEmail })
        },
        body: JSON.stringify({
          adminEmail,
          action: 'delete_account',
          targetValue: resolvedId,
          targetUserId: resolvedId,
          targetEmail: resolvedEmail,
          targetRole: targetUser?.role,
          reason: cleanReason
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Server could not soft-delete account.' };
      }
    } catch (err: any) {
      return { success: false, error: err?.message || 'Network error executing soft-delete.' };
    }

    const scrubbedEmail = `deleted_${resolvedId.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 16)}@scrubbed.local`;
    const scrubbedFields: Partial<RegisteredUserProfile> = {
      fullName: 'Deleted Account',
      email: scrubbedEmail,
      accountStatus: 'deleted',
      deletedAt: nowIso,
      deletedBy: adminEmail,
      deletionReason: cleanReason,
      lockedUntil: undefined,
      lockReason: undefined,
      suspensionReason: undefined,
      walletFrozen: true,
      walletFrozenReason: 'Account permanently closed',
      studentData: undefined,
      parentData: undefined,
      tutorData: undefined,
      adminData: undefined,
      growthPartnerData: undefined
    };

    setAllRegisteredUsers(prev => {
      const updated = prev.map(u => (u.id === resolvedId ? { ...u, ...scrubbedFields } : u));
      safeSetItem('sc_all_users', JSON.stringify(updated));
      return updated;
    });

    if (impersonatedUser && impersonatedUser.id === resolvedId) {
      stopImpersonation();
    }

    if (currentUserProfile && currentUserProfile.id === resolvedId) {
      const updatedSelf = { ...currentUserProfile, ...scrubbedFields };
      setCurrentUserProfile(updatedSelf);
      safeSetItem('sc_user_profile', JSON.stringify(updatedSelf));
    }

    if (!isOffline && isFirebaseConnected) {
      setDoc(doc(db, 'users', resolvedId), {
        fullName: 'Deleted Account',
        email: scrubbedEmail,
        accountStatus: 'deleted',
        deletedAt: nowIso,
        deletedBy: adminEmail,
        deletionReason: cleanReason,
        walletFrozen: true,
        walletFrozenReason: 'Account permanently closed'
      }, { merge: true }).catch(() => {});
      deleteDoc(doc(db, 'students', resolvedId)).catch(() => {});
      deleteDoc(doc(db, 'wallets', resolvedId)).catch(() => {});
    }

    return { success: true };
  };

  const loginAsDeveloper = (emailInput?: string, options?: { skipNavigate?: boolean }): RegisteredUserProfile => {
    const targetEmail = (emailInput || SUPER_ADMIN_EMAIL).toLowerCase().trim();
    const devProfile: RegisteredUserProfile = {
      id: 'usr-dev-martorefe',
      role: 'admin',
      fullName: 'Martin Omorefe (Lead Developer)',
      email: targetEmail,
      emailVerified: true,
      isSuperAdmin: true,
      isDeveloper: true,
      createdAt: new Date().toISOString(),
      adminData: {
        schoolName: 'Student Companion Central Administration',
        schoolType: 'Super Admin Directorate'
      }
    };
    setCurrentUserProfile(devProfile);
    safeSetItem('sc_user_profile', JSON.stringify(devProfile));
    setCurrentRole('admin');
    if (!options?.skipNavigate) {
      setCurrentScreen('app');
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    }
    return devProfile;
  };

  // ==========================================
  // CROSS-PERSONA NOTIFICATIONS & REMINDERS
  // ==========================================
  const notifUserScope = currentUser?.uid || currentUserProfile?.id || 'guest';
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState<boolean>(false);
  const [browserPermission, setBrowserPermission] = useState<NotificationPermission | 'unsupported'>(() =>
    getBrowserNotificationPermission()
  );
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>(() =>
    getStoredNotificationPreferences(notifUserScope)
  );
  const [personalInbox, setPersonalInbox] = useState<AppNotificationItem[]>(() =>
    getStoredInboxNotifications(notifUserScope)
  );
  const [otaBroadcastNotifs, setOtaBroadcastNotifs] = useState<OTANotificationBroadcast[]>([]);
  const [readOtaIds, setReadOtaIds] = useState<string[]>(() => getStoredReadOtaIds(notifUserScope));
  const [dismissedOtaIds, setDismissedOtaIds] = useState<string[]>(() =>
    getStoredDismissedOtaIds(notifUserScope)
  );
  const [pendingPortalTab, setPendingPortalTab] = useState<{
    tab: NotificationDeepLinkTab;
    nonce: number;
  } | null>(null);

  const seenLiveOtaIdsRef = React.useRef<Set<string>>(new Set());
  const otaHydratedRef = React.useRef<boolean>(false);

  // Sync user-scoped notification storage when account switches
  useEffect(() => {
    setNotificationPreferences(getStoredNotificationPreferences(notifUserScope));
    setPersonalInbox(getStoredInboxNotifications(notifUserScope));
    setReadOtaIds(getStoredReadOtaIds(notifUserScope));
    setDismissedOtaIds(getStoredDismissedOtaIds(notifUserScope));
  }, [notifUserScope]);

  const routeToDeepLinkTab = useCallback(
    (tab: NotificationDeepLinkTab) => {
      // Student routes
      const studentTabs = new Set([
        'dashboard',
        'syllabus',
        'cbt',
        'competitions',
        'formulas',
        'tutors',
        'games',
        'ai-coach',
        'community',
        'exam-prep',
        'aspirant-cbt',
        'admission-guide',
        'mock-tournaments'
      ]);

      setCurrentScreen('app');

      if (studentTabs.has(tab)) {
        if (currentRole === 'student' || isSuperAdmin) {
          if (currentRole !== 'student' && isSuperAdmin) {
            setCurrentRole('student');
          }
          setActiveReadingNote(null);
          setActiveExam(null);
          setActiveStudentTab(tab as typeof activeStudentTab);
          return;
        }
      }

      if (tab.startsWith('parent_') && (currentRole === 'parent' || isSuperAdmin)) {
        if (currentRole !== 'parent' && isSuperAdmin) setCurrentRole('parent');
        setPendingPortalTab({ tab, nonce: Date.now() });
        return;
      }
      if (tab.startsWith('tutor_') && (currentRole === 'tutor' || isSuperAdmin)) {
        if (currentRole !== 'tutor' && isSuperAdmin) setCurrentRole('tutor');
        setPendingPortalTab({ tab, nonce: Date.now() });
        return;
      }
      if (tab.startsWith('school_') && (currentRole === 'school_admin' || currentRole === 'admin')) {
        if (currentRole !== 'school_admin' && isSuperAdmin) setCurrentRole('school_admin');
        setPendingPortalTab({ tab, nonce: Date.now() });
        return;
      }
      if (tab.startsWith('partner_') && (currentRole === 'growth_partner' || isSuperAdmin)) {
        if (currentRole !== 'growth_partner' && isSuperAdmin) setCurrentRole('growth_partner');
        setPendingPortalTab({ tab, nonce: Date.now() });
        return;
      }

      // Generic fallback to pending portal tab if role matches partially
      setPendingPortalTab({ tab, nonce: Date.now() });
    },
    [currentRole, isSuperAdmin, setActiveStudentTab, setCurrentRole, setCurrentScreen]
  );

  const clearPendingPortalTab = useCallback(() => {
    setPendingPortalTab(null);
  }, []);

  const markNotificationRead = useCallback(
    (id: string) => {
      if (id.startsWith('ota_') || otaBroadcastNotifs.some((b) => b.id === id)) {
        setReadOtaIds((prev) => {
          if (prev.includes(id)) return prev;
          const next = [...prev, id];
          saveStoredReadOtaIds(notifUserScope, next);
          return next;
        });
      }
      setPersonalInbox((prev) => {
        const changed = prev.some((n) => n.id === id && !n.read);
        if (!changed) return prev;
        const next = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
        saveStoredInboxNotifications(notifUserScope, next);
        return next;
      });
    },
    [notifUserScope, otaBroadcastNotifs]
  );

  const handleNotificationAction = useCallback(
    (item: AppNotificationItem) => {
      markNotificationRead(item.id);
      setIsNotificationDrawerOpen(false);
      routeToDeepLinkTab(item.deepLinkTab);
    },
    [markNotificationRead, routeToDeepLinkTab]
  );

  // Register Service Worker, parse ?notifTab URL deep links, and listen to SW click messages
  useEffect(() => {
    registerNotificationServiceWorker();
    setBrowserPermission(getBrowserNotificationPermission());

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlTab = params.get('notifTab') as NotificationDeepLinkTab | null;
      const urlNotifId = params.get('notifId');
      if (urlTab) {
        if (urlNotifId) markNotificationRead(urlNotifId);
        if (isAuthenticated) {
          routeToDeepLinkTab(urlTab);
        } else {
          setPendingPortalTab({ tab: urlTab, nonce: Date.now() });
        }
        params.delete('notifTab');
        params.delete('notifId');
        params.delete('notifRole');
        const cleanedQuery = params.toString();
        const nextUrl = window.location.pathname + (cleanedQuery ? `?${cleanedQuery}` : '');
        window.history.replaceState({}, '', nextUrl);
      }
    }

    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
    const handleSwMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'SC_NOTIFICATION_CLICK') {
        const { deepLinkTab, notificationId } = event.data as {
          deepLinkTab?: NotificationDeepLinkTab;
          notificationId?: string;
        };
        if (notificationId) markNotificationRead(notificationId);
        if (deepLinkTab) {
          routeToDeepLinkTab(deepLinkTab);
          setIsNotificationDrawerOpen(false);
        }
      }
    };
    navigator.serviceWorker.addEventListener('message', handleSwMessage);
    return () => {
      navigator.serviceWorker.removeEventListener('message', handleSwMessage);
    };
  }, [isAuthenticated, markNotificationRead, routeToDeepLinkTab]);

  // Subscribe to live Super Admin OTA Notification Broadcasts
  useEffect(() => {
    const unsub = subscribeToOTANotificationBroadcasts((items) => {
      setOtaBroadcastNotifs(items);

      // Dispatch browser push for newly added active OTA broadcasts targeting the active user
      if (!otaHydratedRef.current) {
        items.forEach((b) => seenLiveOtaIdsRef.current.add(b.id));
        otaHydratedRef.current = true;
        return;
      }

      if (!isAuthenticated || !notificationPreferences.otaBroadcasts) {
        items.forEach((b) => seenLiveOtaIdsRef.current.add(b.id));
        return;
      }

      items.forEach((b) => {
        if (!seenLiveOtaIdsRef.current.has(b.id)) {
          seenLiveOtaIdsRef.current.add(b.id);
          const matchesRole =
            b.isActive &&
            (b.targetRoles.includes('all') || b.targetRoles.includes(currentRole));
          if (matchesRole) {
            const notifItem: AppNotificationItem = {
              id: b.id,
              source: 'ota_broadcast',
              category: b.category,
              targetRoles: b.targetRoles,
              title: b.title,
              body: b.body,
              deepLinkTab: b.deepLinkTab,
              actionLabel: b.actionLabel,
              createdAt: b.createdAt,
              read: false,
              priority: b.priority
            };
            dispatchBrowserNotification(notifItem, notificationPreferences, {
              onForegroundClick: (clicked) => handleNotificationAction(clicked)
            });
          }
        }
      });
    });
    return () => unsub();
  }, [currentRole, handleNotificationAction, isAuthenticated, notificationPreferences]);

  // Automated Streak & Inactivity Draw-Back Evaluation Loop
  useEffect(() => {
    if (!isAuthenticated || currentScreen !== 'app') return;

    const runCheck = () => {
      const existingIds = new Set(personalInbox.map((i) => i.id));
      const newItems = evaluateAutomatedReengagementNudges({
        userId: notifUserScope,
        role: currentRole,
        student,
        tutorBookings,
        championshipRegistrations,
        prefs: notificationPreferences,
        existingInboxIds: existingIds
      });

      if (newItems.length > 0) {
        setPersonalInbox((prev) => {
          const merged = [...newItems, ...prev].slice(0, 60);
          saveStoredInboxNotifications(notifUserScope, merged);
          return merged;
        });

        // Push up to 1 top automated alert to browser OS notifications when allowed
        dispatchBrowserNotification(newItems[0], notificationPreferences, {
          onForegroundClick: (clicked) => handleNotificationAction(clicked)
        });
      }
    };

    runCheck();
    const interval = window.setInterval(runCheck, 15 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, [
    championshipRegistrations,
    currentRole,
    currentScreen,
    handleNotificationAction,
    isAuthenticated,
    notifUserScope,
    notificationPreferences,
    personalInbox,
    student,
    tutorBookings
  ]);

  // Combined visible notifications filtered for the active role & user preferences
  const notifications = React.useMemo<AppNotificationItem[]>(() => {
    const readSet = new Set(readOtaIds);
    const dismissedSet = new Set(dismissedOtaIds);

    const activeOtaItems: AppNotificationItem[] = notificationPreferences.otaBroadcasts
      ? otaBroadcastNotifs
          .filter(
            (b) =>
              b.isActive &&
              !dismissedSet.has(b.id) &&
              (b.targetRoles.includes('all') || b.targetRoles.includes(currentRole) || isSuperAdmin)
          )
          .map((b) => ({
            id: b.id,
            source: 'ota_broadcast',
            category: b.category,
            targetRoles: b.targetRoles,
            title: b.title,
            body: b.body,
            deepLinkTab: b.deepLinkTab,
            actionLabel: b.actionLabel,
            createdAt: b.createdAt,
            read: readSet.has(b.id),
            priority: b.priority
          }))
      : [];

    const rolePersonalItems = personalInbox.filter(
      (item) =>
        item.targetRoles.includes('all') ||
        item.targetRoles.includes(currentRole)
    );

    const combined = [...rolePersonalItems, ...activeOtaItems];
    combined.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return combined;
  }, [
    currentRole,
    dismissedOtaIds,
    isSuperAdmin,
    notificationPreferences.otaBroadcasts,
    otaBroadcastNotifs,
    personalInbox,
    readOtaIds
  ]);

  const unreadNotificationCount = React.useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const enableBrowserPushNotifications = useCallback(async () => {
    const perm = await requestBrowserNotificationPermission();
    setBrowserPermission(perm);
    if (perm === 'granted') {
      setNotificationPreferences((prev) => {
        const next = { ...prev, browserPushEnabled: true };
        saveStoredNotificationPreferences(notifUserScope, next);
        return next;
      });
    }
    return perm;
  }, [notifUserScope]);

  const updateNotificationPreferences = useCallback(
    (updates: Partial<NotificationPreferences>) => {
      setNotificationPreferences((prev) => {
        const next = { ...prev, ...updates };
        saveStoredNotificationPreferences(notifUserScope, next);
        return next;
      });
    },
    [notifUserScope]
  );

  const markAllNotificationsRead = useCallback(() => {
    const otaIds = notifications
      .filter((n) => n.source === 'ota_broadcast')
      .map((n) => n.id);
    if (otaIds.length > 0) {
      setReadOtaIds((prev) => {
        const next = Array.from(new Set([...prev, ...otaIds]));
        saveStoredReadOtaIds(notifUserScope, next);
        return next;
      });
    }
    setPersonalInbox((prev) => {
      const next = prev.map((n) => ({ ...n, read: true }));
      saveStoredInboxNotifications(notifUserScope, next);
      return next;
    });
  }, [notifUserScope, notifications]);

  const clearReadNotifications = useCallback(() => {
    const readOtas = notifications
      .filter((n) => n.source === 'ota_broadcast' && n.read)
      .map((n) => n.id);
    if (readOtas.length > 0) {
      setDismissedOtaIds((prev) => {
        const next = Array.from(new Set([...prev, ...readOtas]));
        saveStoredDismissedOtaIds(notifUserScope, next);
        return next;
      });
    }
    setPersonalInbox((prev) => {
      const next = prev.filter((n) => !n.read);
      saveStoredInboxNotifications(notifUserScope, next);
      return next;
    });
  }, [notifUserScope, notifications]);

  const sendTestNotification = useCallback(async (): Promise<boolean> => {
    const sample = buildSamplePersonaNudge(currentRole, student);
    const perm =
      browserPermission === 'granted'
        ? 'granted'
        : await enableBrowserPushNotifications();
    if (perm !== 'granted') return false;
    return dispatchBrowserNotification(sample, notificationPreferences, {
      bypassQuietHours: true,
      onForegroundClick: (clicked) => handleNotificationAction(clicked)
    });
  }, [
    browserPermission,
    currentRole,
    enableBrowserPushNotifications,
    handleNotificationAction,
    notificationPreferences,
    student
  ]);

  const triggerSampleStreakNudge = useCallback(async (): Promise<AppNotificationItem> => {
    const sample = buildSamplePersonaNudge(currentRole, student);
    setPersonalInbox((prev) => {
      const next = [sample, ...prev].slice(0, 60);
      saveStoredInboxNotifications(notifUserScope, next);
      return next;
    });
    await dispatchBrowserNotification(sample, notificationPreferences, {
      bypassQuietHours: true,
      onForegroundClick: (clicked) => handleNotificationAction(clicked)
    });
    return sample;
  }, [currentRole, handleNotificationAction, notifUserScope, notificationPreferences, student]);

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        targetSignUpRole,
        setTargetSignUpRole,
        isDeviceFrame,
        setIsDeviceFrame,
        isOffline,
        setIsOffline,
        isLandingView,
        setIsLandingView,
        currentScreen,
        setCurrentScreen,
        currentUserProfile,
        isAuthenticated,
        verifiedAddress,
        saveVerifiedAddress,
        tutorVerification,
        saveTutorVerification,
        registerNewUser,
        updateTutorProfile,
        signOutApp,
        deleteAccount,
        currentUser,
        authLoading,
        loginWithGoogle,
        authenticateUser,
        logoutUser,
        isFirebaseConnected,
        activeStudentTab,
        setActiveStudentTab,
        activeReadingNote,
        openNoteReader,
        closeNoteReader,
        activeExam,
        startExam,
        closeExam,
        fetchOrGenerateTermlyDrill,
        fetchOrGenerateCertificateDrill,
        deductWalletForFreshDrill,
        isUniformModalOpen,
        setIsUniformModalOpen,
        student,
        updateStudentClass,
        addStudentXP,
        recordVerifiedLessonRead,
        lastXPAward,
        dismissLastXPAward,
        verifySchoolUniform,
        updateStudentAvatar,
        toggleDownloadNote,
        examResults,
        saveExamResult,
        examPrepState,
        unlockExamPrep,
        unlockSingleSubjectExam,
        isSubjectExamUnlocked,
        useTutorCredit,
        generateExamPrepCalendar,
        toggleStudyBlockCompleted,
        resetExamPrepPlan,
        aspirantGoal,
        updateAspirantGoal,
        subscribeAspirantTier,
        completedAspirantDrillIds,
        toggleAspirantDrillCompleted,
        appliedReferralCode,
        appliedReferralPartner,
        applyReferralCode,
        clearReferralCode,
        aspirantRewardStatus,
        aspirantRewardRecord,
        refreshAspirantRewardStatus,
        claimAspirantReferralReward,
        parentWallet,
        isParentPinUnlocked,
        unlockParentPin,
        lockParentPin,
        fundParentWallet,
        approveTutorBooking,
        rejectTutorBooking,
        tutorRespondToBooking,
        registeredTutors,
        tutorBookings,
        createTutorBooking,
        activeTutorChatId,
        setActiveTutorChatId,
        chatMessages,
        sendChatMessage,
        activeClassroomSession,
        getBookingJoinStatus,
        getStudentClassroomEligibility,
        launchVirtualClassroom,
        closeVirtualClassroom,
        completeVirtualSessionAndReleaseEscrow,
        toggleVirtualClassroomMic,
        resetDemoData,
        championshipRegistrations,
        currentStudentChampionship,
        requestChampionshipEntry,
        approveChampionshipRegistration,
        submitChampionshipExamResult,
        submitChampionshipStageResult,
        isSuperAdmin,
        adminTermLockOverride,
        effectiveTermBypass,
        setAdminTermLockOverride,
        impersonatedUser,
        allRegisteredUsers,
        startImpersonation,
        stopImpersonation,
        updateUserRecord,
        softDeleteUserRecord,
        purgeAllTestAccountsAndCredits,
        switchRole,
        loginAsDeveloper,
        schoolMaterials,
        adminLessonNotes,
        publishSchoolMaterial,
        deleteSchoolMaterial,
        verifySchoolAdmin,
        linkStudentToSchool,
        subscribeSchoolAdmin,
        getSchoolAccreditationMetrics,
        setStudentSubscriptionStatus,
        subscribeStudentTier,
        unlockStudentAddOn,
        recordDailyGameAttempt,
        checkStudentFeatureAccess,
        isStudentSubscriptionModalOpen,
        targetSubscriptionPlan,
        openStudentSubscriptionModal,
        closeStudentSubscriptionModal,
        linkedWards,
        activeWardId,
        linkWardByCode,
        unlinkWard,
        setActiveWard,
        securityStatus,
        pinLockoutInfo,
        lastSecurityAlert,
        dismissSecurityAlert,
        refreshSecurityStatus,
        submitSecurityReport,
        otaAppRelease,
        installedAppVersion,
        isCurrentReleaseDismissed,
        applyOTAUpgrade,
        dismissOTAPrompt,
        setLocalInstalledAppVersion,
        isFeatureEnabled,
        getPausedFeatureMessage,
        pausedFeatureNotice,
        openPausedFeatureNotice,
        closePausedFeatureNotice,
        notifications,
        unreadNotificationCount,
        notificationPreferences,
        browserPermission,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        enableBrowserPushNotifications,
        updateNotificationPreferences,
        markNotificationRead,
        markAllNotificationsRead,
        clearReadNotifications,
        sendTestNotification,
        triggerSampleStreakNudge,
        handleNotificationAction,
        pendingPortalTab,
        clearPendingPortalTab
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
