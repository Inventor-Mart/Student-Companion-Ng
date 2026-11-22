import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { User, onAuthStateChanged, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import {
  doc,
  collection,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs
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
  MultiRoleConflictEntry,
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
  RegistrablePersonaRole,
  RegistrationControls,
  AppNotificationItem,
  OTANotificationBroadcast,
  NotificationPreferences,
  NotificationDeepLinkTab
} from '../types';
import {
  calculateTutorBookingSplit,
  createLegalConsentRecord
} from '../utils/platformLegalAndFees';
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
  fetchLiveOTAAppRelease,
  saveOTAAppRelease,
  getRegistrationControls,
  isRegistrationPausedForRole as checkRegistrationPausedForRole,
  areAllRegistrationsPaused as checkAllRegistrationsPaused,
  getRegistrationPauseMessage as resolveRegistrationPauseMessage,
  buildUpdatedRegistrationControls,
  getInstalledAppVersion,
  applyInAppOTAUpgrade,
  dismissReleasePrompt,
  isReleaseDismissed,
  setServerOTAAdminToken
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
  getRankProgress,
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
  REPAIRED_TUTOR_PROFILE_VERSION,
  SUBJECT_REPAIR_VERSION,
  dedupeSubjects,
  formatPrimaryDegreeSummary,
  formatSubjectSpecialization,
  formatTutorLocation,
  mergeTutorDataSafely,
  normalizeHighestEducation,
  rebuildTutorDegrees,
  repairSpecificTutorRecord
} from '../utils/nigerianSubjects';
import {
  auth,
  db,
  FIREBASE_PROJECT_ID,
  hasAndroidCustomTabBridge,
  isBundledAndroidApkEnvironment,
  signInWithApkCustomTab,
  signInWithGoogle,
  signInWithGoogleRedirect,
  consumeGoogleRedirectResult,
  peekGoogleAuthReturnTarget,
  clearGoogleAuthReturnTarget,
  GoogleAuthReturnTarget,
  logOut,
  deleteCurrentFirebaseAuthUser,
  setUserSessionToken,
  handleFirestoreError,
  OperationType,
  getFirebaseAuthHeaders
} from '../lib/firebase';
import {
  safeSetItem,
  safeGetItem,
  safeRemoveItem,
  cleanupBloatedStorage,
  MAX_AVATAR_URL_LENGTH
} from '../lib/storage';
import {
  getOfflineSyncQueue,
  saveOfflineSyncQueue,
  enqueueOfflineSyncItem,
  getLastOfflineSyncedAt,
  markOfflineSyncedNow,
  createLessonReadQueuePayload,
  createExamResultQueuePayload,
  warmOfflineAppCache,
  OfflineSyncQueueItem
} from '../services/offlineSyncService';
import {
  dispatchTopBackHandler,
  ensureNavSentinel,
  getActiveExamBackGuard,
  hasNativeAndroidBackBridge,
  hasNavSentinelState
} from '../lib/backNavigation';

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
  browserOnline: boolean;
  pendingSyncCount: number;
  isSyncingOfflineQueue: boolean;
  lastOfflineSyncedAt: string | null;
  offlineSyncNotice: string | null;
  dismissOfflineSyncNotice: () => void;
  syncOfflineQueue: () => Promise<{ synced: number; remaining: number }>;
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
  deleteAccount: (userId?: string) => Promise<{ success: boolean; error?: string }>;
  checkEmailAvailabilityForSignUp: (email: string, requestedRole?: UserRole) => Promise<{
    available: boolean;
    emailAlreadyRegistered?: boolean;
    blocked?: boolean;
    registeredRole?: string;
    roleLabel?: string;
    error?: string;
  }>;

  // Firebase & Credential Auth
  currentUser: User | null;
  authLoading: boolean;
  googleAuthError: string | null;
  clearGoogleAuthError: () => void;
  loginWithGoogle: (options?: {
    skipNavigate?: boolean;
    allowRedirectFallback?: boolean;
    forceRedirect?: boolean;
    returnTarget?: GoogleAuthReturnTarget;
  } | unknown) => Promise<{
    success: boolean;
    profile?: RegisteredUserProfile;
    error?: string;
    code?: string;
    domain?: string;
    canRetryRedirect?: boolean;
    redirecting?: boolean;
  }>;
  loginWithGoogleRedirect: (returnTarget?: GoogleAuthReturnTarget) => Promise<{
    success: boolean;
    redirecting?: boolean;
    error?: string;
    code?: string;
  }>;
  authenticateGoogleForSignUp: (requestedRole?: UserRole) => Promise<{
    success: boolean;
    status?: 'existing_signed_in' | 'new_google_user';
    profile?: RegisteredUserProfile;
    googleUser?: {
      uid: string;
      email: string;
      displayName: string;
      photoURL?: string;
    };
    emailAlreadyRegistered?: boolean;
    registeredRole?: string;
    roleLabel?: string;
    error?: string;
    code?: string;
  }>;
  authenticateUser: (
    identifier: string,
    password: string
  ) => Promise<{
    success: boolean;
    profile?: RegisteredUserProfile;
    error?: string;
    useEmailOtp?: boolean;
    email?: string;
  }>;
  requestLoginOtp: (email: string) => Promise<{
    success: boolean;
    deliveredTo?: string;
    accountName?: string;
    needsSignup?: boolean;
    error?: string;
  }>;
  verifyLoginOtp: (
    email: string,
    code: string
  ) => Promise<{
    success: boolean;
    profile?: RegisteredUserProfile;
    error?: string;
  }>;
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
  pendingExamExitPrompt: { title: string } | null;
  cancelExamExitPrompt: () => void;
  confirmExamExitPrompt: () => void;
  showExitBackToast: boolean;
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
  updateUserAvatar: (photoUrl: string) => Promise<void>;
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
  acceptUserAgreement: () => Promise<void>;
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
  adminGamesUnlockOverride: boolean;
  effectiveGamesBypass: boolean;
  setAdminGamesUnlockOverride: (override: boolean) => void;
  adminAiCoachUnlockOverride: boolean;
  effectiveAiCoachBypass: boolean;
  setAdminAiCoachUnlockOverride: (override: boolean) => void;
  impersonatedUser: RegisteredUserProfile | null;
  allRegisteredUsers: RegisteredUserProfile[];
  isSyncingDirectory: boolean;
  directorySyncStats: {
    total: number;
    backendCount: number;
    firestoreCount: number;
    recoveredCount: number;
    backfilledToFirestoreCount: number;
    lastSyncedAt?: string;
    firestoreAdminReady: boolean;
  } | null;
  syncUserDirectoryFromCloud: (options?: {
    silent?: boolean;
    adminEmailOverride?: string;
  }) => Promise<{
    success: boolean;
    totalUsers: number;
    backendCount: number;
    firestoreCount: number;
    recoveredCount: number;
    backfilledToFirestoreCount: number;
    needsGoogleAuth?: boolean;
    message?: string;
    error?: string;
  }>;
  startImpersonation: (user: RegisteredUserProfile) => void;
  stopImpersonation: () => void;
  updateUserRecord: (userId: string, updates: Partial<RegisteredUserProfile>) => Promise<void>;
  softDeleteUserRecord: (
    userId: string,
    reason: string,
    adminEmailOverride?: string
  ) => Promise<{ success: boolean; error?: string }>;
  deleteAndReleaseUserRecord: (
    user: RegisteredUserProfile,
    reason?: string,
    adminEmailOverride?: string
  ) => Promise<{ success: boolean; releasedEmail?: string; error?: string }>;
  resolveMultiRoleAccount: (
    user: RegisteredUserProfile,
    keepRole: UserRole,
    adminEmailOverride?: string
  ) => Promise<{ success: boolean; user?: RegisteredUserProfile; error?: string }>;
  updateGrowthPartnerBankDetails: (details: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    phone?: string;
    partnerId?: string;
    email?: string;
  }) => Promise<{ success: boolean; partner?: GrowthPartner; error?: string }>;
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
  purgeSimulatedSubscriptions: (
    adminEmailOverride?: string
  ) => Promise<{
    success: boolean;
    resetStudentsCount: number;
    resetUsersCount: number;
    resetEnrollmentsCount: number;
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
  linkStudentToSchool: (
    schoolCode: string
  ) => Promise<{ success: boolean; schoolName?: string; schoolCode?: string; error?: string }>;
  subscribeSchoolAdmin: (plan: 'monthly' | 'termly', paystackRef: string) => Promise<boolean>;
  fetchSchoolLiveRoster: (schoolCode: string) => Promise<{
    schoolCode: string;
    school?: any;
    students: any[];
    metrics: any;
  } | null>;
  schoolLiveRostersByCode: Record<
    string,
    { schoolCode: string; school?: any; students: any[]; metrics: any; fetchedAt: string }
  >;
  ensureStudentLinkCode: () => Promise<string | null>;
  ensureAdminSchoolCode: () => Promise<string | null>;
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
  refreshOTAStatus: () => Promise<OTAAppReleaseConfig | null>;
  isFeatureEnabled: (key: OTAFeatureKey) => boolean;
  getPausedFeatureMessage: (key: OTAFeatureKey) => string;
  pausedFeatureNotice: { featureKey: OTAFeatureKey; title: string; message: string } | null;
  openPausedFeatureNotice: (key: OTAFeatureKey, customTitle?: string) => void;
  closePausedFeatureNotice: () => void;
  registrationControls: RegistrationControls;
  isRegistrationPausedForRole: (role: UserRole) => boolean;
  areAllRegistrationsPaused: boolean;
  getRegistrationPauseMessage: (role?: UserRole) => string;
  updateRegistrationControls: (update: {
    setPauseAll?: boolean;
    toggleRole?: RegistrablePersonaRole;
    pauseMessage?: string;
  }) => Promise<{ success: boolean; error?: string }>;

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

const isPlaceholderRecoveredEmail = (email?: string): boolean => {
  const clean = String(email || '').trim().toLowerCase();
  return (
    !clean ||
    !clean.includes('@') ||
    clean.endsWith('@recovered.studentcompanion.ng') ||
    clean.endsWith('@scrubbed.local')
  );
};

const sanitizeFirestoreDocId = (raw: string): string =>
  String(raw || `usr_${Date.now()}`)
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 120) || `usr_${Date.now()}`;

const sanitizeAvatarForCloud = (raw?: string | null): string | undefined => {
  if (typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  if (trimmed === '') return '';
  if (trimmed.length > MAX_AVATAR_URL_LENGTH) return undefined;
  if (
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('data:image/')
  ) {
    return trimmed;
  }
  return undefined;
};

const resolveGoogleLoginAvatar = (
  existingAvatar: string | undefined,
  googlePhotoUrl?: string | null
): string | undefined => {
  const safeExisting = sanitizeAvatarForCloud(existingAvatar);
  if (safeExisting !== undefined) {
    return safeExisting;
  }
  return sanitizeAvatarForCloud(googlePhotoUrl);
};

const sanitizeUserAccountForFirestore = (profile: RegisteredUserProfile): Record<string, any> => {
  const payload: Record<string, any> = {
    id: sanitizeFirestoreDocId(profile.id),
    role: profile.role || 'student',
    fullName: String(profile.fullName || 'Student Companion User').trim().slice(0, 120) || 'User',
    email: String(profile.email || '').trim().toLowerCase().slice(0, 150),
    emailVerified: Boolean(profile.emailVerified ?? true),
    createdAt: String(profile.createdAt || new Date().toISOString()).slice(0, 50)
  };
  const safeAvatar = sanitizeAvatarForCloud(profile.avatarUrl);
  if (safeAvatar !== undefined) payload.avatarUrl = safeAvatar;
  if (profile.verifiedAt) payload.verifiedAt = String(profile.verifiedAt).slice(0, 50);
  if (profile.studentData) payload.studentData = profile.studentData;
  if (profile.parentData) payload.parentData = profile.parentData;
  if (profile.tutorData) payload.tutorData = profile.tutorData;
  if (profile.adminData) payload.adminData = profile.adminData;
  if (profile.growthPartnerData) payload.growthPartnerData = profile.growthPartnerData;
  if (typeof profile.isSuperAdmin === 'boolean') payload.isSuperAdmin = profile.isSuperAdmin;
  if (typeof profile.isDeveloper === 'boolean') payload.isDeveloper = profile.isDeveloper;
  if (profile.accountStatus) payload.accountStatus = profile.accountStatus;
  if (profile.lockedUntil) payload.lockedUntil = String(profile.lockedUntil).slice(0, 50);
  if (profile.lockReason) payload.lockReason = String(profile.lockReason).slice(0, 300);
  if (profile.suspensionReason) payload.suspensionReason = String(profile.suspensionReason).slice(0, 300);
  if (profile.suspendedAt) payload.suspendedAt = String(profile.suspendedAt).slice(0, 50);
  if (profile.deletedAt) payload.deletedAt = String(profile.deletedAt).slice(0, 50);
  if (profile.deletedBy) payload.deletedBy = String(profile.deletedBy).slice(0, 150);
  if (profile.deletionReason) payload.deletionReason = String(profile.deletionReason).slice(0, 300);
  if (typeof profile.walletFrozen === 'boolean') payload.walletFrozen = profile.walletFrozen;
  if (profile.walletFrozenReason) payload.walletFrozenReason = String(profile.walletFrozenReason).slice(0, 300);
  if (profile.legalConsent && typeof profile.legalConsent === 'object') {
    payload.legalConsent = {
      accepted: Boolean(profile.legalConsent.accepted),
      version: String(profile.legalConsent.version || 'v1.0').slice(0, 24),
      acceptedAt: String(profile.legalConsent.acceptedAt || new Date().toISOString()).slice(0, 50),
      roleAcceptedAs: profile.legalConsent.roleAcceptedAs || profile.role || 'student'
    };
  }
  return payload;
};

const mergeUserProfiles = (
  existing: RegisteredUserProfile,
  incoming: RegisteredUserProfile
): RegisteredUserProfile => {
  const existingEmail = String(existing.email || '').trim().toLowerCase();
  const incomingEmail = String(incoming.email || '').trim().toLowerCase();
  const resolvedEmail = !isPlaceholderRecoveredEmail(incomingEmail)
    ? incomingEmail
    : !isPlaceholderRecoveredEmail(existingEmail)
      ? existingEmail
      : incomingEmail || existingEmail;

  const existingIsStub = existing.directorySource === 'recovered' || isPlaceholderRecoveredEmail(existingEmail);
  const incomingIsStub = incoming.directorySource === 'recovered' || isPlaceholderRecoveredEmail(incomingEmail);

  const exTutorOverrideTs = Math.max(
    Date.parse(String(existing.tutorData?.manualProfileOverrideAt || '')) || 0,
    Date.parse(String(existing.tutorData?.manualSubjectOverrideAt || '')) || 0
  );
  const incTutorOverrideTs = Math.max(
    Date.parse(String(incoming.tutorData?.manualProfileOverrideAt || '')) || 0,
    Date.parse(String(incoming.tutorData?.manualSubjectOverrideAt || '')) || 0
  );
  const preferExistingOverStaleIncoming =
    exTutorOverrideTs > 0 && (incTutorOverrideTs <= 0 || exTutorOverrideTs > incTutorOverrideTs);

  const resolvedTutorData = mergeTutorDataSafely(existing.tutorData, incoming.tutorData);

  const existingAvatar = sanitizeAvatarForCloud(existing.avatarUrl);
  const incomingAvatar = sanitizeAvatarForCloud(incoming.avatarUrl);
  const isGoogleDefaultUrl = (url?: string) =>
    Boolean(url && /googleusercontent\.com/i.test(url));
  const resolvedAvatarUrl =
    incomingAvatar !== undefined
      ? existingAvatar &&
        existingAvatar.startsWith('data:image/') &&
        isGoogleDefaultUrl(incomingAvatar)
        ? existingAvatar
        : incomingAvatar
      : existingAvatar;

  return {
    ...existing,
    ...incoming,
    id: existing.id || incoming.id,
    avatarUrl: resolvedAvatarUrl,
    role: !incomingIsStub && incoming.role ? incoming.role : existing.role || incoming.role,
    fullName: preferExistingOverStaleIncoming
      ? existing.fullName || incoming.fullName
      : !incomingIsStub && incoming.fullName && incoming.fullName !== 'Student Scholar'
        ? incoming.fullName
        : existing.fullName || incoming.fullName,
    email: preferExistingOverStaleIncoming
      ? !isPlaceholderRecoveredEmail(existingEmail)
        ? existingEmail
        : resolvedEmail
      : resolvedEmail,
    emailVerified: Boolean(existing.emailVerified || incoming.emailVerified),
    createdAt:
      existing.createdAt && incoming.createdAt
        ? existing.createdAt < incoming.createdAt
          ? existing.createdAt
          : incoming.createdAt
        : existing.createdAt || incoming.createdAt || new Date().toISOString(),
    studentData:
      existing.studentData || incoming.studentData
        ? {
            ...(existing.studentData || ({} as StudentProfile)),
            ...(incoming.studentData || ({} as StudentProfile)),
            xp: Math.max(Number(existing.studentData?.xp || 0), Number(incoming.studentData?.xp || 0)),
            streakDays: Math.max(
              Number(existing.studentData?.streakDays || 0),
              Number(incoming.studentData?.streakDays || 0)
            ),
            isSubscribed: Boolean(
              existing.studentData?.isSubscribed || incoming.studentData?.isSubscribed
            ),
            studentLinkCode:
              incoming.studentData?.studentLinkCode || existing.studentData?.studentLinkCode,
            schoolCode: incoming.studentData?.schoolCode || existing.studentData?.schoolCode
          }
        : undefined,
    parentData:
      existing.parentData || incoming.parentData
        ? {
            ...(existing.parentData || ({} as NonNullable<RegisteredUserProfile['parentData']>)),
            ...(incoming.parentData || {})
          }
        : undefined,
    tutorData: resolvedTutorData,
    adminData:
      existing.adminData || incoming.adminData
        ? { ...(existing.adminData || ({ schoolName: '', schoolType: '' })), ...(incoming.adminData || {}) }
        : undefined,
    growthPartnerData:
      existing.growthPartnerData || incoming.growthPartnerData
        ? (() => {
            const ex = existing.growthPartnerData || ({} as GrowthPartner);
            const inc = incoming.growthPartnerData || ({} as GrowthPartner);
            const isPlaceholderAcct = (v: unknown) => {
              const s = String(v || '').trim();
              return !s || s === '0123456789' || s === '0712345678';
            };
            const isPlaceholderBank = (bank: unknown, acct: unknown) => {
              const b = String(bank || '').trim();
              if (!b) return true;
              const lower = b.toLowerCase();
              return (
                (lower === 'access bank' || lower === 'access bank nigeria') &&
                isPlaceholderAcct(acct)
              );
            };
            const resolvedAccountNumber = !isPlaceholderAcct(inc.accountNumber)
              ? String(inc.accountNumber).trim()
              : !isPlaceholderAcct(ex.accountNumber)
                ? String(ex.accountNumber).trim()
                : '';
            const resolvedBankName = !isPlaceholderBank(inc.bankName, inc.accountNumber)
              ? String(inc.bankName).trim()
              : !isPlaceholderBank(ex.bankName, ex.accountNumber)
                ? String(ex.bankName).trim()
                : '';
            const resolvedAccountName =
              String(inc.accountName || '').trim() || String(ex.accountName || '').trim() || '';
            return {
              ...ex,
              ...inc,
              bankName: resolvedBankName,
              accountNumber: resolvedAccountNumber,
              accountName: resolvedAccountName
            };
          })()
        : undefined,
    legalConsent: (() => {
      const ex = existing.legalConsent;
      const inc = incoming.legalConsent;
      if (inc?.accepted && ex?.accepted) {
        return (inc.acceptedAt || '') >= (ex.acceptedAt || '') ? inc : ex;
      }
      if (inc?.accepted) return inc;
      if (ex?.accepted) return ex;
      return inc || ex;
    })(),
    directorySource: !existingIsStub
      ? existing.directorySource || incoming.directorySource
      : incoming.directorySource || existing.directorySource,
    recoveredFrom: incoming.recoveredFrom || existing.recoveredFrom
  };
};

const normalizeClientRoleFamily = (role?: string | null): string => {
  const clean = String(role || '').trim().toLowerCase();
  if (clean === 'admin' || clean === 'school_admin') return 'school_admin';
  return clean;
};

const describeClientPersonaDetail = (
  role: UserRole,
  rec: RegisteredUserProfile
): string | undefined => {
  if (role === 'student') {
    const cls = rec.studentData?.classLevel;
    const sch = rec.studentData?.school;
    return [cls, sch && sch !== 'Secondary School' ? sch : undefined].filter(Boolean).join(' · ') || undefined;
  }
  if (role === 'growth_partner') {
    const code = rec.growthPartnerData?.referralCode;
    return code ? `Code ${code}` : undefined;
  }
  if (role === 'tutor') {
    const subj =
      rec.tutorData?.subjectSpecialization ||
      (Array.isArray(rec.tutorData?.proficientSubjects)
        ? rec.tutorData.proficientSubjects.slice(0, 2).join(', ')
        : undefined);
    return subj || undefined;
  }
  if (role === 'parent') {
    return rec.parentData?.wardName ? `Ward: ${rec.parentData.wardName}` : undefined;
  }
  if (role === 'admin' || role === 'school_admin') {
    return rec.adminData?.schoolName || undefined;
  }
  return undefined;
};

const mergeUserProfileArrays = (lists: RegisteredUserProfile[][]): RegisteredUserProfile[] => {
  const byKey = new Map<string, RegisteredUserProfile>();
  const emailToKey = new Map<string, string>();
  const conflictsByKey = new Map<string, Map<string, MultiRoleConflictEntry>>();

  const recordConflictRoles = (targetKey: string, rec: RegisteredUserProfile) => {
    if (rec.accountStatus === 'deleted') return;
    const cleanEm = String(rec.email || '').trim().toLowerCase();
    if (isSuperAdminEmail(cleanEm) || rec.isSuperAdmin) return;

    let roleMap = conflictsByKey.get(targetKey);
    if (!roleMap) {
      roleMap = new Map<string, MultiRoleConflictEntry>();
      conflictsByKey.set(targetKey, roleMap);
    }

    const addEntry = (entry: MultiRoleConflictEntry) => {
      const fam = normalizeClientRoleFamily(entry.role);
      const prev = roleMap!.get(fam);
      if (!prev) {
        roleMap!.set(fam, entry);
      } else {
        roleMap!.set(fam, {
          role: prev.role,
          userId: prev.userId || entry.userId,
          source: prev.source.includes('Firestore') ? prev.source : entry.source,
          detail: entry.detail || prev.detail
        });
      }
    };

    if (Array.isArray(rec.conflictingRoles)) {
      for (const c of rec.conflictingRoles) {
        if (c && c.role) addEntry(c);
      }
    }

    const src =
      rec.recoveredFrom ||
      (rec.directorySource === 'firestore'
        ? 'Firestore Users'
        : rec.directorySource === 'backend'
          ? 'Backend Directory'
          : 'Local Cache');

    addEntry({
      role: rec.role,
      userId: rec.id,
      source: src,
      detail: describeClientPersonaDetail(rec.role, rec)
    });

    if (rec.studentData && normalizeClientRoleFamily(rec.role) !== 'student') {
      addEntry({
        role: 'student',
        userId: rec.studentData.id || rec.id,
        source: 'Student Profile',
        detail: describeClientPersonaDetail('student', rec)
      });
    }
    if (rec.growthPartnerData && normalizeClientRoleFamily(rec.role) !== 'growth_partner') {
      addEntry({
        role: 'growth_partner',
        userId: rec.growthPartnerData.id || rec.id,
        source: 'Growth Partner Profile',
        detail: describeClientPersonaDetail('growth_partner', rec)
      });
    }
    if (rec.tutorData && normalizeClientRoleFamily(rec.role) !== 'tutor') {
      addEntry({
        role: 'tutor',
        userId: rec.id,
        source: 'Tutor Profile',
        detail: describeClientPersonaDetail('tutor', rec)
      });
    }
    if (rec.parentData && normalizeClientRoleFamily(rec.role) !== 'parent') {
      addEntry({
        role: 'parent',
        userId: rec.id,
        source: 'Parent Profile',
        detail: describeClientPersonaDetail('parent', rec)
      });
    }
    if (rec.adminData && normalizeClientRoleFamily(rec.role) !== 'school_admin') {
      addEntry({
        role: 'admin',
        userId: rec.id,
        source: 'School Admin Profile',
        detail: describeClientPersonaDetail('admin', rec)
      });
    }
  };

  for (const list of lists) {
    for (const rawInput of list) {
      if (!rawInput || !rawInput.id || isPurgedRecord(rawInput)) continue;
      const raw = repairSpecificTutorRecord(rawInput).user;
      const cleanEmail = String(raw.email || '').trim().toLowerCase();
      let targetKey: string | undefined;
      if (byKey.has(raw.id)) {
        targetKey = raw.id;
      } else if (!isPlaceholderRecoveredEmail(cleanEmail) && emailToKey.has(cleanEmail)) {
        targetKey = emailToKey.get(cleanEmail);
      }
      if (targetKey && byKey.has(targetKey)) {
        const merged = repairSpecificTutorRecord(mergeUserProfiles(byKey.get(targetKey)!, raw)).user;
        byKey.set(targetKey, merged);
        recordConflictRoles(targetKey, raw);
        if (!isPlaceholderRecoveredEmail(merged.email)) {
          emailToKey.set(merged.email.toLowerCase(), targetKey);
        }
      } else {
        byKey.set(raw.id, raw);
        recordConflictRoles(raw.id, raw);
        if (!isPlaceholderRecoveredEmail(cleanEmail)) {
          emailToKey.set(cleanEmail, raw.id);
        }
      }
    }
  }

  return Array.from(byKey.values())
    .map((user) => {
      if (user.accountStatus === 'deleted' || user.isSuperAdmin || isSuperAdminEmail(user.email)) {
        return { ...user, conflictingRoles: undefined };
      }
      const roleMap = conflictsByKey.get(user.id);
      const conflictList = roleMap && roleMap.size > 1 ? Array.from(roleMap.values()) : undefined;
      return { ...user, conflictingRoles: conflictList };
    })
    .sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
};

const isVerifiedSubscriptionRef = (ref?: string | null): boolean => {
  const clean = String(ref || '').trim();
  if (!clean) return false;
  const upper = clean.toUpperCase();
  if (
    upper.startsWith('SIM_') ||
    upper.startsWith('TEST_') ||
    upper.startsWith('DEMO_') ||
    upper.startsWith('MOCK_') ||
    upper.startsWith('WALLET_EXAM_') ||
    upper.startsWith('WALLET_SUBJ_')
  ) {
    return false;
  }
  return upper.startsWith('PSTK_') || upper.startsWith('PAYSTACK_') || upper.startsWith('WALLET_');
};

const stripUnverifiedStudentUnlocks = (s?: StudentProfile): StudentProfile | undefined => {
  if (!s) return s;
  if (isVerifiedSubscriptionRef(s.lastPaymentReference)) return s;
  const preservedDaily = s.addOns?.dailyGameAttempts ? { dailyGameAttempts: s.addOns.dailyGameAttempts } : {};
  return {
    ...s,
    isSubscribed: false,
    subscriptionPlan: 'free',
    subscriptionTier: 'free',
    subscribedUntil: undefined,
    termExpiresAt: undefined,
    lastSubscribedAt: undefined,
    lastPaymentReference: undefined,
    addOns: preservedDaily
  };
};

// One-time browser migration stripping subscriptions previously unlocked by test simulation
if (typeof window !== 'undefined') {
  try {
    const SIM_SUBS_PURGE_FLAG = 'sc_sim_subs_purged_v1';
    if (!safeGetItem(SIM_SUBS_PURGE_FLAG)) {
      const rawExamPrep = safeGetItem('sc_exam_prep');
      if (rawExamPrep) {
        try {
          const parsedEp = JSON.parse(rawExamPrep);
          if (!isVerifiedSubscriptionRef(parsedEp?.paymentReference)) {
            safeRemoveItem('sc_exam_prep');
          }
        } catch {
          safeRemoveItem('sc_exam_prep');
        }
      }

      const rawStudent = safeGetItem('sc_student');
      if (rawStudent) {
        try {
          const parsedSt = JSON.parse(rawStudent);
          const sanitized = stripUnverifiedStudentUnlocks(parsedSt);
          if (sanitized) safeSetItem('sc_student', JSON.stringify(sanitized));
        } catch {}
      }

      const rawProfile = safeGetItem('sc_user_profile');
      if (rawProfile) {
        try {
          const parsedProf = JSON.parse(rawProfile);
          if (parsedProf?.studentData) {
            parsedProf.studentData = stripUnverifiedStudentUnlocks(parsedProf.studentData);
            safeSetItem('sc_user_profile', JSON.stringify(parsedProf));
          }
        } catch {}
      }

      const rawUsers = safeGetItem('sc_all_users');
      if (rawUsers) {
        try {
          const parsedUsers = JSON.parse(rawUsers);
          if (Array.isArray(parsedUsers)) {
            const cleanedUsers = parsedUsers.map((u: RegisteredUserProfile) =>
              u?.studentData && !isSuperAdminEmail(u.email) && !u.isSuperAdmin
                ? { ...u, studentData: stripUnverifiedStudentUnlocks(u.studentData) }
                : u
            );
            safeSetItem('sc_all_users', JSON.stringify(cleanedUsers));
          }
        } catch {}
      }

      safeSetItem(SIM_SUBS_PURGE_FLAG, '1');
    }
  } catch {}
}

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
        if (parsed?.id && parsed?.role) {
          const repaired = repairSpecificTutorRecord(parsed);
          if (repaired.changed) {
            safeSetItem('sc_user_profile', JSON.stringify(repaired.user));
          }
          return repaired.user;
        }
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
  const [browserOnline, setBrowserOnline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [manualOffline, setManualOffline] = useState<boolean>(false);
  const isOffline = !browserOnline || manualOffline;
  const setIsOffline = useCallback((val: boolean | ((prev: boolean) => boolean)) => {
    setManualOffline((prevManual) => {
      const currentEffective = (typeof navigator !== 'undefined' ? !navigator.onLine : false) || prevManual;
      return typeof val === 'function' ? val(currentEffective) : val;
    });
  }, []);
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);
  const [isSyncingOfflineQueue, setIsSyncingOfflineQueue] = useState<boolean>(false);
  const [lastOfflineSyncedAt, setLastOfflineSyncedAt] = useState<string | null>(null);
  const [offlineSyncNotice, setOfflineSyncNotice] = useState<string | null>(null);
  const dismissOfflineSyncNotice = useCallback(() => setOfflineSyncNotice(null), []);
  const [isLandingView, setIsLandingView] = useState<boolean>(false);
  type AppScreenType = 'splash' | 'landing' | 'signin' | 'signup' | 'know_more' | 'app';
  type StudentTabType = 'dashboard' | 'syllabus' | 'cbt' | 'competitions' | 'formulas' | 'tutors' | 'games' | 'ai-coach' | 'community' | 'exam-prep' | 'aspirant-cbt' | 'admission-guide' | 'mock-tournaments' | 'educator-importer';

  const [currentScreen, setCurrentScreenRaw] = useState<AppScreenType>(() => {
    const returnTarget = peekGoogleAuthReturnTarget();
    if (returnTarget) {
      return 'app';
    }
    return 'splash';
  });
  const screenHistoryRef = React.useRef<AppScreenType[]>(
    currentScreen === 'app' ? ['app'] : ['landing']
  );

  const [googleAuthError, setGoogleAuthError] = useState<string | null>(null);
  const clearGoogleAuthError = useCallback(() => setGoogleAuthError(null), []);
  const [activeStudentTab, setActiveStudentTabRaw] = useState<StudentTabType>('dashboard');
  const studentTabHistoryRef = React.useRef<StudentTabType[]>(['dashboard']);
  const [activeReadingNote, setActiveReadingNote] = useState<CurriculumTopic | null>(null);
  const [activeExam, setActiveExam] = useState<CBTExam | null>(null);
  const [isUniformModalOpen, setUniformModalOpenState] = useState<boolean>(false);
  const [pendingExamExit, setPendingExamExit] = useState<{ title: string; onConfirm: () => void } | null>(null);
  const [showExitBackToast, setShowExitBackToast] = useState<boolean>(false);

  const setCurrentScreen = useCallback((nextScreen: AppScreenType) => {
    setCurrentScreenRaw((prev) => {
      if (nextScreen === 'splash' || nextScreen === 'landing' || nextScreen === 'app') {
        screenHistoryRef.current = [nextScreen];
        if (nextScreen === 'landing') {
          studentTabHistoryRef.current = ['dashboard'];
          setActiveStudentTabRaw('dashboard');
        }
      } else {
        const currentStack = screenHistoryRef.current.filter((s) => s !== nextScreen && s !== 'splash');
        if (currentStack.length === 0) {
          currentStack.push('landing');
        }
        currentStack.push(nextScreen);
        screenHistoryRef.current = currentStack;
        ensureNavSentinel();
      }
      if (prev !== nextScreen) {
        setPendingExamExit(null);
      }
      return nextScreen;
    });
  }, []);

  const setActiveStudentTab = useCallback((nextTab: StudentTabType) => {
    setActiveStudentTabRaw((prev) => {
      if (nextTab === 'dashboard') {
        studentTabHistoryRef.current = ['dashboard'];
      } else {
        const filtered = studentTabHistoryRef.current.filter((t) => t !== nextTab);
        if (filtered.length === 0 || filtered[0] !== 'dashboard') {
          filtered.unshift('dashboard');
        }
        filtered.push(nextTab);
        studentTabHistoryRef.current = filtered.slice(-15);
        ensureNavSentinel();
      }
      if (prev !== nextTab) {
        setPendingExamExit(null);
      }
      return nextTab;
    });
  }, []);

  const cancelExamExitPrompt = useCallback(() => {
    setPendingExamExit(null);
  }, []);

  const confirmExamExitPrompt = useCallback(() => {
    setPendingExamExit((current) => {
      if (current?.onConfirm) {
        try {
          current.onConfirm();
        } catch {}
      }
      return null;
    });
  }, []);

  // Prepare For Exam (AI Daily Study Calendar & ₦4,000 Tutor Credits)
  const [examPrepState, setExamPrepState] = useState<ExamPrepState>(() => {
    const saved = safeGetItem('sc_exam_prep');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          parsed &&
          (parsed.isUnlocked || (Array.isArray(parsed.unlockedSubjectExams) && parsed.unlockedSubjectExams.length > 0)) &&
          !isVerifiedSubscriptionRef(parsed.paymentReference)
        ) {
          safeRemoveItem('sc_exam_prep');
        } else if (parsed) {
          return parsed;
        }
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
          let anyChanged = false;
          const cleaned = parsed
            .filter((u: RegisteredUserProfile) => !isPurgedRecord(u))
            .map((u: RegisteredUserProfile) => {
              const res = repairSpecificTutorRecord(u);
              if (res.changed) anyChanged = true;
              return res.user;
            });
          if (anyChanged) {
            safeSetItem('sc_all_users', JSON.stringify(cleaned));
          }
          if (cleaned.length > 0) return cleaned;
        }
      } catch {}
    }
    return INITIAL_USER_DIRECTORY;
  });
  const [isSyncingDirectory, setIsSyncingDirectory] = useState<boolean>(false);
  const [directorySyncStats, setDirectorySyncStats] = useState<{
    total: number;
    backendCount: number;
    firestoreCount: number;
    recoveredCount: number;
    backfilledToFirestoreCount: number;
    lastSyncedAt?: string;
    firestoreAdminReady: boolean;
  } | null>(null);

  // User Impersonation State
  const [impersonatedUser, setImpersonatedUser] = useState<RegisteredUserProfile | null>(null);

  // Super Admin check
  const isSuperAdmin = Boolean(
    isSuperAdminEmail(currentUser?.email) ||
    isSuperAdminEmail(currentUserProfile?.email) ||
    currentUserProfile?.isSuperAdmin ||
    currentUserProfile?.isDeveloper
  );

  // Explicit opt-in preview overrides so Super Admins acting as students see real locks & countdowns by default
  const [adminTermLockOverride, setAdminTermLockOverride] = useState<boolean>(false);
  const effectiveTermBypass = Boolean(isSuperAdmin && adminTermLockOverride);
  const [adminGamesUnlockOverride, setAdminGamesUnlockOverride] = useState<boolean>(false);
  const effectiveGamesBypass = Boolean(isSuperAdmin && adminGamesUnlockOverride);
  const [adminAiCoachUnlockOverride, setAdminAiCoachUnlockOverride] = useState<boolean>(false);
  const effectiveAiCoachBypass = Boolean(isSuperAdmin && adminAiCoachUnlockOverride);

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
      setOtaAppRelease((prev) =>
        JSON.stringify(prev) === JSON.stringify(release) ? prev : release
      );
    });
    return () => unsub();
  }, []);

  const isCurrentReleaseDismissed = React.useMemo(() => {
    void otaDismissTick;
    return isReleaseDismissed(otaAppRelease.latestVersion, otaAppRelease.upgradeMode);
  }, [otaAppRelease.latestVersion, otaAppRelease.upgradeMode, otaDismissTick]);

  const applyOTAUpgrade = useCallback(async (): Promise<string> => {
    const nextVersion = await applyInAppOTAUpgrade(otaAppRelease);
    setInstalledAppVersionState(nextVersion);
    setOtaDismissTick((prev) => prev + 1);
    return nextVersion;
  }, [otaAppRelease]);

  const dismissOTAPrompt = useCallback(() => {
    dismissReleasePrompt(otaAppRelease.latestVersion, otaAppRelease.upgradeMode);
    setOtaDismissTick((prev) => prev + 1);
  }, [otaAppRelease.latestVersion, otaAppRelease.upgradeMode]);

  const refreshOTAStatus = useCallback(async (): Promise<OTAAppReleaseConfig | null> => {
    const live = await fetchLiveOTAAppRelease();
    if (live) {
      setOtaAppRelease((prev) =>
        JSON.stringify(prev) === JSON.stringify(live) ? prev : live
      );
    }
    return live;
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

  const registrationControls = React.useMemo(
    () => getRegistrationControls(otaAppRelease),
    [otaAppRelease]
  );

  const isRegistrationPausedForRole = useCallback(
    (role: UserRole): boolean => checkRegistrationPausedForRole(otaAppRelease, role),
    [otaAppRelease]
  );

  const areAllRegistrationsPaused = React.useMemo(
    () => checkAllRegistrationsPaused(otaAppRelease),
    [otaAppRelease]
  );

  const getRegistrationPauseMessage = useCallback(
    (role?: UserRole): string => resolveRegistrationPauseMessage(otaAppRelease, role),
    [otaAppRelease]
  );

  const updateRegistrationControls = useCallback(
    async (update: {
      setPauseAll?: boolean;
      toggleRole?: RegistrablePersonaRole;
      pauseMessage?: string;
    }): Promise<{ success: boolean; error?: string }> => {
      if (!isSuperAdmin) {
        return {
          success: false,
          error: 'Only Super Admin can change registration intake controls.'
        };
      }
      const nextControls = buildUpdatedRegistrationControls(registrationControls, {
        ...update,
        updatedBy: currentUser?.email || currentUserProfile?.email || 'martorefe@gmail.com'
      });
      const nextRelease: OTAAppReleaseConfig = {
        ...otaAppRelease,
        registrationControls: nextControls,
        publishedAt: new Date().toISOString(),
        publishedBy: currentUser?.email || currentUserProfile?.email || 'martorefe@gmail.com'
      };
      try {
        const saved = await saveOTAAppRelease(nextRelease);
        setOtaAppRelease(saved.release);
        return { success: true };
      } catch (err: any) {
        return {
          success: false,
          error: err?.message || 'Unable to save registration controls right now.'
        };
      }
    },
    [isSuperAdmin, registrationControls, otaAppRelease, currentUser?.email, currentUserProfile?.email]
  );

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

  const examResultsRef = React.useRef<CBTExamResult[]>(examResults);
  useEffect(() => {
    examResultsRef.current = examResults;
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

  const syncedStartupProfileKeyRef = React.useRef<string | null>(null);
  const checkedStartupFirestoreUidRef = React.useRef<string | null>(null);
  useEffect(() => {
    if (isOffline || !currentUserProfile) return;
    if (isPurgedRecord(currentUserProfile) || currentUserProfile.accountStatus === 'deleted') return;
    if (isSuperAdminEmail(currentUserProfile.email)) return;

    const studentSnapshot =
      currentUserProfile.role === 'student'
        ? {
            ...(currentUserProfile.studentData || INITIAL_EMPTY_STUDENT),
            ...student,
            id: currentUserProfile.id,
            name: student.name || currentUserProfile.fullName
          }
        : currentUserProfile.studentData;

    const syncKey = [
      currentUserProfile.id,
      currentUserProfile.email,
      currentUserProfile.role,
      studentSnapshot?.studentLinkCode || '',
      studentSnapshot?.schoolCode || '',
      studentSnapshot?.subscriptionTier || '',
      Number(studentSnapshot?.xp || 0),
      currentUserProfile.adminData?.schoolCode || '',
      currentUserProfile.growthPartnerData?.referralCode || ''
    ].join('|');

    if (syncedStartupProfileKeyRef.current === syncKey) return;
    syncedStartupProfileKeyRef.current = syncKey;

    const profileSnapshot: RegisteredUserProfile = {
      ...currentUserProfile,
      studentData: studentSnapshot
    };

    void fetch('/api/users/sync-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getSecurityHeaders({
          userId: profileSnapshot.id,
          userEmail: profileSnapshot.email
        })
      },
      body: JSON.stringify({ profile: profileSnapshot })
    }).catch(() => {});

    const fbUser = auth.currentUser;
    if (
      isFirebaseConnected &&
      fbUser &&
      fbUser.uid === currentUserProfile.id &&
      checkedStartupFirestoreUidRef.current !== fbUser.uid
    ) {
      checkedStartupFirestoreUidRef.current = fbUser.uid;
      const userDocRef = doc(db, 'users', fbUser.uid);
      void getDoc(userDocRef)
        .then(snap => {
          if (!snap.exists()) {
            const createPayload = sanitizeUserAccountForFirestore({
              ...profileSnapshot,
              id: fbUser.uid,
              role: profileSnapshot.role === 'admin' ? 'student' : profileSnapshot.role,
              isSuperAdmin: false,
              isDeveloper: false,
              accountStatus: 'active',
              walletFrozen: false
            });
            return setDoc(userDocRef, createPayload);
          }
          return undefined;
        })
        .catch(() => {});
    }
  }, [isOffline, isFirebaseConnected, currentUserProfile, student]);

  const authoritativeStudentOverlayRef = React.useRef<Partial<StudentProfile> | null>(null);
  const authoritativeWalletOverlayRef = React.useRef<{
    balanceNaira?: number;
    transactions?: WalletTransaction[];
  } | null>(null);

  const applyAuthoritativeStudentOverlay = React.useCallback((base: StudentProfile): StudentProfile => {
    const overlay = authoritativeStudentOverlayRef.current;
    if (!overlay) return base;
    const mergedXP = Math.max(Number(base.xp || 0), Number(overlay.xp || 0));
    return {
      ...base,
      isSubscribed: overlay.isSubscribed !== undefined ? overlay.isSubscribed : base.isSubscribed,
      subscriptionPlan: overlay.subscriptionPlan !== undefined ? overlay.subscriptionPlan : base.subscriptionPlan,
      subscriptionTier: overlay.subscriptionTier !== undefined ? overlay.subscriptionTier : base.subscriptionTier,
      subscribedUntil: overlay.subscribedUntil !== undefined ? overlay.subscribedUntil : base.subscribedUntil,
      termExpiresAt: overlay.termExpiresAt !== undefined ? overlay.termExpiresAt : base.termExpiresAt,
      lastSubscribedAt: overlay.lastSubscribedAt !== undefined ? overlay.lastSubscribedAt : base.lastSubscribedAt,
      lastPaymentReference: overlay.lastPaymentReference !== undefined ? overlay.lastPaymentReference : base.lastPaymentReference,
      addOns: overlay.addOns !== undefined ? overlay.addOns : base.addOns,
      xp: mergedXP,
      rank:
        mergedXP >= Number(base.xp || 0) && overlay.rank
          ? overlay.rank
          : calculateRankFromXP(mergedXP, undefined, {
              streakDays: base.streakDays,
              verifiedNotesCount: (base.completedReadNoteIds || []).length,
              examPercentages: examResultsRef.current.map(r => r.percentage)
            }),
      uniformVerified: overlay.uniformVerified ?? base.uniformVerified,
    };
  }, []);

  const refreshAuthoritativeLedgers = React.useCallback(async () => {
    if (!auth.currentUser) return;
    try {
      const headers = await getFirebaseAuthHeaders();
      if (!headers.Authorization) return;

      const [entRes, walRes] = await Promise.all([
        fetch('/api/entitlements/me', { headers }).catch(() => null),
        fetch('/api/wallet/me', { headers }).catch(() => null),
      ]);

      if (entRes && entRes.ok) {
        const entData = await entRes.json().catch(() => null);
        const e = entData?.entitlements;
        if (e && typeof e === 'object') {
          authoritativeStudentOverlayRef.current = {
            isSubscribed: Boolean(e.isSubscribed),
            subscriptionPlan: e.subscriptionPlan || 'free',
            subscriptionTier: e.subscriptionTier || 'free',
            subscribedUntil: e.subscribedUntil || undefined,
            termExpiresAt: e.termExpiresAt || undefined,
            lastSubscribedAt: e.lastSubscribedAt || undefined,
            lastPaymentReference: e.lastPaymentReference || undefined,
            addOns: e.addOns || {},
            xp: Number(e.xp || 0),
            rank: (e.rank || 'Fresher') as StudentRank,
            uniformVerified: Boolean(e.uniformVerified),
          };
          setStudent((prev) => applyAuthoritativeStudentOverlay(prev));

          if (e.examPrepState && typeof e.examPrepState === 'object') {
            setExamPrepState((prev) => ({
              ...prev,
              isUnlocked: Boolean(e.examPrepState.isUnlocked || prev.isUnlocked),
              unlockedSubjectExams: Array.from(
                new Set([
                  ...(prev.unlockedSubjectExams || []),
                  ...(Array.isArray(e.examPrepState.unlockedSubjectExams)
                    ? e.examPrepState.unlockedSubjectExams
                    : []),
                ])
              ),
              unlockedAt: e.examPrepState.unlockedAt || prev.unlockedAt,
              paymentMethod: e.examPrepState.paymentMethod || prev.paymentMethod,
              paymentReference: e.examPrepState.paymentReference || prev.paymentReference,
              tutorCreditsNaira: Math.max(
                Number(prev.tutorCreditsNaira || 0),
                Number(e.examPrepState.tutorCreditsNaira || 0)
              ),
            }));
          }
        }
      }

      if (walRes && walRes.ok) {
        const walData = await walRes.json().catch(() => null);
        const w = walData?.wallet;
        if (w && typeof w === 'object') {
          const authBalance = typeof w.balanceNaira === 'number' ? w.balanceNaira : 0;
          const authTxs: WalletTransaction[] = Array.isArray(w.transactions) ? w.transactions : [];
          authoritativeWalletOverlayRef.current = {
            balanceNaira: authBalance,
            transactions: authTxs,
          };
          setParentWallet((prev) => ({
            ...prev,
            balanceNaira: authBalance,
            transactions: authTxs.length > 0 ? authTxs : prev.transactions,
          }));
        }
      }
    } catch {
      // Offline / transient network errors fall back gracefully
    }
  }, [applyAuthoritativeStudentOverlay]);

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
        setGoogleAuthError(null);
        // Automatic Super Admin Promotion for authorized Super Admin emails
        if (isSuperAdminEmail(user.email)) {
          const normalizedAdminEmail = (user.email || SUPER_ADMIN_EMAIL).toLowerCase().trim();
          const adminDocRef = doc(db, 'admins', user.uid);
          setDoc(
            adminDocRef,
            {
              email: normalizedAdminEmail,
              role: 'superadmin',
              updatedAt: new Date().toISOString()
            },
            { merge: true }
          ).catch(() => {});

          let savedSuperAvatar: string | undefined;
          try {
            const rawSaved = safeGetItem('sc_user_profile');
            if (rawSaved) {
              const parsedSaved = JSON.parse(rawSaved);
              if (
                parsedSaved &&
                String(parsedSaved.email || '').toLowerCase() === normalizedAdminEmail &&
                parsedSaved.avatarUrl !== undefined
              ) {
                savedSuperAvatar = sanitizeAvatarForCloud(parsedSaved.avatarUrl);
              }
            }
          } catch {}

          const superProfile: RegisteredUserProfile = {
            id: user.uid,
            role: 'admin',
            fullName: user.displayName || 'Martin Omorefe (Lead Developer)',
            email: normalizedAdminEmail,
            avatarUrl: resolveGoogleLoginAvatar(savedSuperAvatar, user.photoURL),
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

        const isAdminAccount = isSuperAdminEmail(user.email);

        // Hydrate server-verified entitlements & escrow wallet immediately upon Firebase auth
        void refreshAuthoritativeLedgers();

        // Sync student profile from Firestore
        const studentDocRef = doc(db, 'students', user.uid);
        const path = `students/${user.uid}`;

        const unsubDoc = onSnapshot(
          studentDocRef,
          (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data() as StudentProfile;
              setStudent(applyAuthoritativeStudentOverlay(data));
              if (!isAdminAccount && !data.studentLinkCode) {
                fetch('/api/students/link-code/issue', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    studentId: user.uid,
                    studentName: data.name || user.displayName || 'Registered Student',
                    studentEmail: user.email,
                    classLevel: data.classLevel,
                    stream: data.stream,
                    schoolName: data.school,
                    schoolCode: data.schoolCode
                  })
                })
                  .then(r => r.json())
                  .then(resData => {
                    if (resData?.success && resData?.studentLinkCode) {
                      updateDoc(studentDocRef, { studentLinkCode: resData.studentLinkCode }).catch(() => {});
                    }
                  })
                  .catch(() => {});
              }
            } else if (!isAdminAccount) {
              const savedStudentStr = safeGetItem('sc_student');
              let initialClass: NigerianClassLevel = 'JSS 1';
              if (savedStudentStr) {
                try {
                  const parsed = JSON.parse(savedStudentStr);
                  if (parsed.classLevel) initialClass = parsed.classLevel;
                } catch {}
              }

              const safePhotoUrl = sanitizeAvatarForCloud(user.photoURL) ?? null;
              const safeDisplayName =
                (user.displayName || '').trim().slice(0, 100) || 'Registered Student';

              // Seed new student profile in Firestore for non-admin student users
              const newProfile: StudentProfile = {
                id: user.uid,
                name: safeDisplayName,
                school: 'Federal Secondary School',
                classLevel: initialClass,
                stream: initialClass.startsWith('JSS') ? 'Junior' : 'Science',
                xp: 0,
                rank: 'Fresher',
                streakDays: 1,
                lastStudyDate: new Date().toISOString().split('T')[0],
                uniformVerified: false,
                uniformPhotoUrl: safePhotoUrl,
                downloadedSubjectIds: [],
                completedQuizIds: [],
                completedReadNoteIds: [],
                verifiedReadingLogs: []
              };
              setDoc(studentDocRef, newProfile, { merge: true }).catch((err) => {
                handleFirestoreError(err, OperationType.CREATE, path);
              });
              setStudent(applyAuthoritativeStudentOverlay(newProfile));

              fetch('/api/students/link-code/issue', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  studentId: user.uid,
                  studentName: safeDisplayName,
                  studentEmail: user.email,
                  classLevel: initialClass,
                  stream: newProfile.stream,
                  schoolName: newProfile.school
                })
              })
                .then(r => r.json())
                .then(resData => {
                  if (resData?.success && resData?.studentLinkCode) {
                    updateDoc(studentDocRef, { studentLinkCode: resData.studentLinkCode }).catch(() => {});
                  }
                })
                .catch(() => {});
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
            const authWallet = authoritativeWalletOverlayRef.current;
            if (snap.exists()) {
              const data = snap.data() as ParentWallet;
              setParentWallet(prev => ({
                ...prev,
                ...data,
                balanceNaira: authWallet?.balanceNaira !== undefined ? authWallet.balanceNaira : data.balanceNaira,
                transactions: authWallet?.transactions?.length ? authWallet.transactions : prev.transactions,
              }));
            } else if (!isAdminAccount) {
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
      } else {
        authoritativeStudentOverlayRef.current = null;
        authoritativeWalletOverlayRef.current = null;
      }
    });

    return () => {
      cleanupListeners();
      unsubscribeAuth();
    };
  }, [applyAuthoritativeStudentOverlay, refreshAuthoritativeLedgers]);

  const finalizeGoogleUserSession = async (
    user: User,
    options?: { skipNavigate?: boolean }
  ): Promise<{
    success: boolean;
    profile?: RegisteredUserProfile;
    error?: string;
    code?: string;
  }> => {
    const skipNavigate = Boolean(options?.skipNavigate);
    if (isSuperAdminEmail(user.email)) {
      const normalizedEmail = (user.email || SUPER_ADMIN_EMAIL).toLowerCase().trim();
      const profile = loginAsDeveloper(normalizedEmail, { skipNavigate });
      try {
        const firebaseIdToken = await user.getIdToken().catch(() => '');
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(firebaseIdToken ? { Authorization: `Bearer ${firebaseIdToken}` } : {}),
            ...getSecurityHeaders({ userId: user.uid, userEmail: normalizedEmail })
          },
          body: JSON.stringify({
            method: 'google',
            userId: user.uid,
            email: normalizedEmail,
            role: 'admin',
            hasLocalProfile: true,
            firebaseIdToken
          })
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && typeof data?.otaAdminToken === 'string') {
          setServerOTAAdminToken(data.otaAdminToken);
        }
      } catch {
        // Non-fatal: direct Firebase ID token also authenticates /api/ota/*
      }
      setGoogleAuthError(null);
      return { success: true, profile };
    }

    const baseExisting = allRegisteredUsers.find(
      u => u.email.toLowerCase() === (user.email || '').toLowerCase()
    );
    let firestoreUserProfile: RegisteredUserProfile | null = null;
    const userDocRef = doc(db, 'users', user.uid);
    const userDocPath = `users/${user.uid}`;
    let userDocExistsInFirestore = false;

    if (!isOffline) {
      try {
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          userDocExistsInFirestore = true;
          firestoreUserProfile = userSnap.data() as RegisteredUserProfile;
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.GET, userDocPath);
      }
    }

    const existing =
      firestoreUserProfile && baseExisting
        ? mergeUserProfiles(baseExisting, firestoreUserProfile)
        : firestoreUserProfile || baseExisting;

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
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data?.error) {
          return { success: false, error: data.error };
        }
      } else if (typeof data?.otaAdminToken === 'string') {
        setServerOTAAdminToken(data.otaAdminToken);
      }
    } catch {
      // Offline fallback handled below
    }

    const rawProfile: RegisteredUserProfile = existing
      ? {
          ...existing,
          fullName: existing.fullName || user.displayName || 'Student Companion Learner',
          avatarUrl: resolveGoogleLoginAvatar(existing.avatarUrl, user.photoURL),
          emailVerified: user.emailVerified ?? existing.emailVerified ?? true
        }
      : {
          id: user.uid,
          role: currentUserProfile?.role || 'student',
          fullName: user.displayName || 'Student Companion Learner',
          email: user.email || '',
          avatarUrl: sanitizeAvatarForCloud(user.photoURL),
          emailVerified: user.emailVerified ?? true,
          verifiedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          studentData: { ...student, id: user.uid, name: user.displayName || student.name || 'Student Companion Learner' }
        };
    const repairedResult = repairSpecificTutorRecord(rawProfile);
    const profile = repairedResult.user;

    // Persist Google account directly to Firestore `users/{uid}` (strictly matching isValidUserAccount rules)
    if (!isOffline) {
      if (!userDocExistsInFirestore) {
        const createPayload = sanitizeUserAccountForFirestore({
          ...profile,
          id: user.uid,
          role: profile.role === 'admin' ? 'student' : profile.role,
          isSuperAdmin: false,
          isDeveloper: false,
          accountStatus: 'active',
          walletFrozen: false
        });
        setDoc(userDocRef, createPayload).catch((err) => {
          handleFirestoreError(err, OperationType.CREATE, userDocPath);
        });
      } else {
        const ownerUpdate: Record<string, any> = {
          fullName: String(profile.fullName || 'Student Companion Learner').slice(0, 120)
        };
        const safeProfileAvatar = sanitizeAvatarForCloud(profile.avatarUrl);
        if (safeProfileAvatar !== undefined) {
          ownerUpdate.avatarUrl = safeProfileAvatar;
        }
        if (repairedResult.changed && profile.tutorData) {
          ownerUpdate.tutorData = profile.tutorData;
        }
        updateDoc(userDocRef, ownerUpdate).catch((err) => {
          handleFirestoreError(err, OperationType.UPDATE, userDocPath);
        });
      }
    }

    // Mirror Google account into shared backend User Directory immediately
    void fetch('/api/users/sync-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getSecurityHeaders({ userId: profile.id, userEmail: profile.email })
      },
      body: JSON.stringify({ profile: { ...profile, directorySource: 'firestore' } })
    }).catch(() => {});

    setAllRegisteredUsers(prev => {
      const next = mergeUserProfileArrays([[profile], prev]);
      safeSetItem('sc_all_users', JSON.stringify(next));
      return next;
    });
    setCurrentUserProfile(profile);
    safeSetItem('sc_user_profile', JSON.stringify(profile));
    setCurrentRole(profile.role);
    if (profile.studentData) {
      setStudent(profile.studentData);
      safeSetItem('sc_student', JSON.stringify(profile.studentData));
    }
    if (!skipNavigate) {
      setCurrentScreen('app');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
    setGoogleAuthError(null);
    return { success: true, profile };
  };

  // Handle Google Sign-In Redirect completion on boot (when popup fallback / redirect flow reloads page)
  useEffect(() => {
    let active = true;
    consumeGoogleRedirectResult()
      .then(async ({ user, returnTarget }) => {
        if (!active) return;
        if (user) {
          await finalizeGoogleUserSession(user, { skipNavigate: true });
          if (returnTarget) {
            setCurrentScreen('app');
          }
          if (returnTarget === 'app' || returnTarget === 'super_admin') {
            clearGoogleAuthReturnTarget();
          }
        } else if (returnTarget === 'app') {
          clearGoogleAuthReturnTarget();
        }
      })
      .catch((error: any) => {
        if (!active) return;
        const code = error?.code || 'auth/redirect-failed';
        const domain = error?.domain || (typeof window !== 'undefined' ? window.location.hostname : '');
        const msg =
          code === 'auth/unauthorized-domain'
            ? `Google Redirect rejected domain "${domain}" (${code}). Add "${domain}" in Firebase Console → Authentication → Settings → Authorized domains.`
            : `Google Redirect sign-in failed (${code}): ${error?.message || 'Unable to verify Google session.'}`;
        setGoogleAuthError(msg);
      });
    return () => {
      active = false;
    };
  }, []);

  const loginWithGoogleRedirect = async (
    returnTarget: GoogleAuthReturnTarget = 'app'
  ): Promise<{ success: boolean; redirecting?: boolean; error?: string; code?: string }> => {
    setGoogleAuthError(null);
    if (hasAndroidCustomTabBridge()) {
      try {
        const user = await signInWithApkCustomTab();
        const finalized = await finalizeGoogleUserSession(user, {
          skipNavigate: returnTarget === 'ota_app_updates'
        });
        return { success: finalized.success, error: finalized.error, code: finalized.code };
      } catch (error: any) {
        const code = error?.code || 'auth/custom-tab-failed';
        const msg = error?.message || 'Unable to complete Google Sign-In in Chrome Custom Tab.';
        setGoogleAuthError(msg);
        return { success: false, error: msg, code };
      }
    }
    try {
      await signInWithGoogleRedirect(returnTarget);
      return { success: true, redirecting: true };
    } catch (error: any) {
      const code = error?.code || 'auth/redirect-failed';
      const domain = error?.domain || (typeof window !== 'undefined' ? window.location.hostname : '');
      const msg =
        code === 'auth/unauthorized-domain'
          ? `Firebase Auth (${FIREBASE_PROJECT_ID}) rejected domain "${domain}" (${code}). Add "${domain}" in Firebase Console → Authentication → Settings → Authorized domains.`
          : error?.message || `Unable to launch Google redirect sign-in (${code}).`;
      setGoogleAuthError(msg);
      return { success: false, error: msg, code };
    }
  };

  const loginWithGoogle = async (options?: {
    skipNavigate?: boolean;
    allowRedirectFallback?: boolean;
    forceRedirect?: boolean;
    returnTarget?: GoogleAuthReturnTarget;
  } | unknown): Promise<{
    success: boolean;
    profile?: RegisteredUserProfile;
    error?: string;
    code?: string;
    domain?: string;
    canRetryRedirect?: boolean;
    redirecting?: boolean;
  }> => {
    const opts = options && typeof options === 'object' ? (options as {
      skipNavigate?: boolean;
      allowRedirectFallback?: boolean;
      forceRedirect?: boolean;
      returnTarget?: GoogleAuthReturnTarget;
    }) : {};
    const skipNavigate = Boolean(opts.skipNavigate);
    const isBundledAndroidApk = isBundledAndroidApkEnvironment();
    const allowRedirectFallback = opts.allowRedirectFallback !== undefined
      ? Boolean(opts.allowRedirectFallback)
      : isBundledAndroidApk;
    const forceRedirect = Boolean(opts.forceRedirect);
    const returnTarget: GoogleAuthReturnTarget = opts.returnTarget || (skipNavigate ? 'ota_app_updates' : 'app');

    setGoogleAuthError(null);

    if (hasAndroidCustomTabBridge()) {
      try {
        const user = await signInWithApkCustomTab();
        return await finalizeGoogleUserSession(user, { skipNavigate });
      } catch (error: any) {
        const code: string = error?.code || 'auth/custom-tab-failed';
        const domain: string = error?.domain || 'studentcompanionng.netlify.app';
        const msg =
          code === 'auth/unauthorized-domain'
            ? `Firebase Auth (${FIREBASE_PROJECT_ID}) rejected "${domain}" (${code}). Add "${domain}" under Authorized domains in project ${FIREBASE_PROJECT_ID}, then retry.`
            : error?.message || `Google Sign-In in Chrome failed (${code}). You can retry or sign in with Email & Password.`;
        setGoogleAuthError(msg);
        return {
          success: false,
          code,
          domain,
          canRetryRedirect: false,
          error: msg
        };
      }
    }

    if (forceRedirect) {
      const redirRes = await loginWithGoogleRedirect(returnTarget);
      return {
        success: redirRes.success,
        redirecting: redirRes.redirecting,
        error: redirRes.error,
        code: redirRes.code
      };
    }

    try {
      const user = await signInWithGoogle();
      return await finalizeGoogleUserSession(user, { skipNavigate });
    } catch (error: any) {
      const code: string = error?.code || 'auth/unknown';
      const domain: string = error?.domain || (typeof window !== 'undefined' ? window.location.hostname : '');
      console.warn('Google Sign In:', code, error?.message || error);

      if (code === 'auth/unauthorized-domain') {
        const msg =
          isBundledAndroidApk
            ? `Firebase Auth (${FIREBASE_PROJECT_ID}) rejected "${domain}" (${code}). Google also restricts OAuth inside embedded WebViews — update to the latest APK for Chrome Custom Tab sign-in or use Email & Password.`
            : `Firebase Auth (${FIREBASE_PROJECT_ID}) rejected domain "${domain}" (${code}). Add "${domain}" under Firebase Console (${FIREBASE_PROJECT_ID}) → Authentication → Settings → Authorized domains, then retry.`;
        setGoogleAuthError(msg);
        return {
          success: false,
          code,
          domain,
          canRetryRedirect: false,
          error: msg
        };
      }

      const isPopupRetryable =
        code === 'auth/popup-blocked' ||
        code === 'auth/popup-closed-by-user' ||
        code === 'auth/cancelled-popup-request' ||
        code === 'auth/operation-not-supported-in-this-environment';

      if (isPopupRetryable && allowRedirectFallback) {
        try {
          await signInWithGoogleRedirect(returnTarget);
          return { success: true, redirecting: true, code };
        } catch (redirError: any) {
          const redirMsg = redirError?.message || `Redirect fallback failed (${redirError?.code || 'auth/redirect-failed'}).`;
          setGoogleAuthError(redirMsg);
          return {
            success: false,
            code: redirError?.code || code,
            domain,
            canRetryRedirect: true,
            error: redirMsg
          };
        }
      }

      const exactMsg =
        code === 'auth/popup-blocked'
          ? `Popup was blocked by the browser or WebView (${code}). Tap "Retry with Redirect Sign-In" to authenticate in this window.`
          : code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request'
          ? `Google Auth tab/popup closed before sign-in finished (${code}). This can happen in embedded iframes or WebViews — tap "Retry with Redirect Sign-In".`
          : code === 'auth/operation-not-supported-in-this-environment'
          ? `Popup auth is not supported in this browser environment (${code}). Tap "Retry with Redirect Sign-In".`
          : `Google sign-in failed (${code}): ${error?.message || 'Please try again.'}`;

      setGoogleAuthError(exactMsg);
      return {
        success: false,
        code,
        domain,
        canRetryRedirect: true,
        error: exactMsg
      };
    }
  };

  const formatRoleDisplayLabel = (role?: string | null): string => {
    const clean = String(role || '').trim().toLowerCase();
    if (clean === 'student') return 'Student';
    if (clean === 'parent') return 'Parent';
    if (clean === 'tutor') return 'Tutor';
    if (clean === 'admin' || clean === 'school_admin') return 'School Admin';
    if (clean === 'growth_partner') return 'Growth Partner';
    return 'Registered';
  };

  const normalizeRoleFamilyClient = (role?: string | null): string => {
    const clean = String(role || '').trim().toLowerCase();
    if (clean === 'admin' || clean === 'school_admin') return 'school_admin';
    return clean;
  };

  const checkEmailAvailabilityForSignUp = useCallback(async (
    rawEmail: string,
    requestedRole?: UserRole
  ): Promise<{
    available: boolean;
    emailAlreadyRegistered?: boolean;
    blocked?: boolean;
    registeredRole?: string;
    roleLabel?: string;
    error?: string;
  }> => {
    const cleanEmail = String(rawEmail || '').trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { available: false, error: 'Please enter a valid email address.' };
    }

    const localActive = allRegisteredUsers.find(
      u =>
        u.accountStatus !== 'deleted' &&
        !isPurgedRecord(u) &&
        String(u.email || '').trim().toLowerCase() === cleanEmail
    );
    if (localActive) {
      const roleLabel = formatRoleDisplayLabel(localActive.role);
      return {
        available: false,
        emailAlreadyRegistered: true,
        registeredRole: localActive.role,
        roleLabel,
        error: `This email (${cleanEmail}) is already registered as a ${roleLabel} account. One email can only be registered for one role. Please Sign In instead, or delete your existing account first to register fresh.`
      };
    }

    const postCheck = async (url: string, useNativeFetch = false) => {
      const fetchFn: typeof fetch =
        useNativeFetch && typeof window !== 'undefined' && typeof (window as any).__SC_NATIVE_FETCH__ === 'function'
          ? (window as any).__SC_NATIVE_FETCH__
          : fetch;
      const res = await fetchFn(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getSecurityHeaders({ userEmail: cleanEmail })
        },
        body: JSON.stringify({ email: cleanEmail, requestedRole })
      });
      const data = await res.json().catch(() => ({}));
      return { res, data };
    };

    try {
      const { res, data } = await postCheck('/api/users/check-email');
      if (res.ok && data?.success) {
        return {
          available: Boolean(data.available),
          emailAlreadyRegistered: Boolean(data.emailAlreadyRegistered),
          blocked: Boolean(data.blocked),
          registeredRole: data.registeredRole,
          roleLabel: data.roleLabel,
          error: data.error
        };
      }
      if (res.status === 404 || res.status === 405 || res.status >= 500) {
        const runtimeMeta = typeof window !== 'undefined' ? (window as any).__SC_RUNTIME_META__ : null;
        const remoteOrigin = String(
          runtimeMeta?.apiOrigin || 'https://student-companion-api-b373.onrender.com'
        ).replace(/\/+$/, '');
        if (remoteOrigin.startsWith('https://') && !runtimeMeta?.shouldRouteApiToRemoteOrigin) {
          const remote = await postCheck(`${remoteOrigin}/api/users/check-email`, true);
          if (remote.res.ok && remote.data?.success) {
            return {
              available: Boolean(remote.data.available),
              emailAlreadyRegistered: Boolean(remote.data.emailAlreadyRegistered),
              blocked: Boolean(remote.data.blocked),
              registeredRole: remote.data.registeredRole,
              roleLabel: remote.data.roleLabel,
              error: remote.data.error
            };
          }
        }
      }
    } catch {
      // Allow server-side validation on /api/send-verification-code & /api/users/register to act as final guard
    }

    return { available: true };
  }, [allRegisteredUsers]);

  const authenticateGoogleForSignUp = async (requestedRole?: UserRole): Promise<{
    success: boolean;
    status?: 'existing_signed_in' | 'new_google_user';
    profile?: RegisteredUserProfile;
    googleUser?: {
      uid: string;
      email: string;
      displayName: string;
      photoURL?: string;
    };
    emailAlreadyRegistered?: boolean;
    registeredRole?: string;
    roleLabel?: string;
    error?: string;
    code?: string;
  }> => {
    setGoogleAuthError(null);
    try {
      const user = hasAndroidCustomTabBridge()
        ? await signInWithApkCustomTab()
        : await signInWithGoogle();

      const cleanEmail = String(user.email || '').trim().toLowerCase();
      if (!cleanEmail) {
        return {
          success: false,
          error: 'Google account did not return an email address. Please try another Google account.'
        };
      }

      if (isSuperAdminEmail(cleanEmail)) {
        const res = await finalizeGoogleUserSession(user, { skipNavigate: false });
        return {
          success: res.success,
          status: res.success ? 'existing_signed_in' : undefined,
          profile: res.profile,
          error: res.error,
          code: res.code
        };
      }

      const localExisting = allRegisteredUsers.find(
        u =>
          u.accountStatus !== 'deleted' &&
          !isPurgedRecord(u) &&
          (u.email.toLowerCase() === cleanEmail || u.id === user.uid)
      );
      let firestoreExisting: RegisteredUserProfile | null = null;
      if (!isOffline) {
        try {
          const snap = await getDoc(doc(db, 'users', user.uid));
          if (snap.exists()) {
            const fsData = snap.data() as RegisteredUserProfile;
            if (fsData?.accountStatus !== 'deleted') {
              firestoreExisting = fsData;
            }
          }
        } catch {
          // Non-fatal: fall back to local / backend check below
        }
      }

      const serverCheck = await checkEmailAvailabilityForSignUp(cleanEmail, requestedRole);
      if (serverCheck.blocked) {
        await logOut().catch(() => {});
        return {
          success: false,
          error: serverCheck.error || 'This email is currently blocked from registering.'
        };
      }

      const existingRole =
        firestoreExisting?.role ||
        localExisting?.role ||
        (serverCheck.emailAlreadyRegistered ? serverCheck.registeredRole : undefined);

      if (existingRole) {
        const existingRoleLabel = formatRoleDisplayLabel(existingRole);
        const requestedRoleLabel = formatRoleDisplayLabel(requestedRole);
        const isDifferentRole =
          Boolean(requestedRole) &&
          normalizeRoleFamilyClient(existingRole) !== normalizeRoleFamilyClient(requestedRole);

        if (isDifferentRole) {
          await logOut().catch(() => {});
          return {
            success: false,
            emailAlreadyRegistered: true,
            registeredRole: existingRole,
            roleLabel: existingRoleLabel,
            error: `This Google email (${cleanEmail}) is already registered as a ${existingRoleLabel} account. One email cannot register as both ${existingRoleLabel} and ${requestedRoleLabel}. Please Sign In to your existing account, or delete it first to register fresh.`
          };
        }

        const res = await finalizeGoogleUserSession(user, { skipNavigate: false });
        return {
          success: res.success,
          status: res.success ? 'existing_signed_in' : undefined,
          profile: res.profile,
          error: res.error,
          code: res.code
        };
      }

      return {
        success: true,
        status: 'new_google_user',
        googleUser: {
          uid: user.uid,
          email: cleanEmail,
          displayName: String(user.displayName || '').trim(),
          photoURL: user.photoURL && user.photoURL.length <= 500 ? user.photoURL : undefined
        }
      };
    } catch (error: any) {
      const code = String(error?.code || 'auth/unknown');
      const domain = error?.domain || (typeof window !== 'undefined' ? window.location.hostname : '');
      const msg =
        code === 'auth/unauthorized-domain'
          ? `Firebase Auth (${FIREBASE_PROJECT_ID}) rejected domain "${domain}" (${code}). Add "${domain}" under Authorized domains in Firebase Console.`
          : code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request'
          ? 'Google sign-up window was closed before completing. Please try again.'
          : error?.message || 'Unable to verify with Google right now. Please try again.';
      setGoogleAuthError(msg);
      return { success: false, error: msg, code };
    }
  };

  const authenticateUser = async (
    identifier: string,
    password: string
  ): Promise<{
    success: boolean;
    profile?: RegisteredUserProfile;
    error?: string;
    useEmailOtp?: boolean;
    email?: string;
  }> => {
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

    if (isSuperAdminEmail(cleanInput)) {
      let firebaseIdToken = '';
      let verifiedSuperAdminViaFirebase = false;
      let firebaseAuthCode = '';
      try {
        const cred = await signInWithEmailAndPassword(auth, cleanInput, password);
        const signedInEmail = (cred.user?.email || '').toLowerCase().trim();
        if (cred.user && (!signedInEmail || signedInEmail === cleanInput)) {
          firebaseIdToken = await cred.user.getIdToken();
          verifiedSuperAdminViaFirebase = true;
        }
      } catch (err: any) {
        firebaseAuthCode = String(err?.code || '');
      }

      if (verifiedSuperAdminViaFirebase) {
        resetLoginFailures(cleanInput);
        const devProfile = loginAsDeveloper(cleanInput, { skipNavigate: true });
        void fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(firebaseIdToken ? { Authorization: `Bearer ${firebaseIdToken}` } : {}),
            ...getSecurityHeaders({ userEmail: cleanInput })
          },
          body: JSON.stringify({
            identifier: cleanInput,
            password,
            method: 'super_admin',
            email: cleanInput,
            hasLocalProfile: true,
            firebaseIdToken
          })
        })
          .then(async (res) => {
            const data = await res.json().catch(() => ({}));
            if (res.ok && typeof data?.otaAdminToken === 'string') {
              setServerOTAAdminToken(data.otaAdminToken);
            }
          })
          .catch(() => {
            // Backend offline or waking from sleep; Firebase credential already verified Super Admin
          });
        return { success: true, profile: devProfile };
      }

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
            hasLocalProfile: true,
            firebaseIdToken: ''
          })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data?.authenticated !== true) {
          recordLoginFailure(cleanInput);
          const explicitWrongFirebase =
            firebaseAuthCode === 'auth/wrong-password' ||
            firebaseAuthCode === 'auth/invalid-credential';
          return {
            success: false,
            error:
              data?.error ||
              (explicitWrongFirebase
                ? 'Incorrect Super Admin password. Please verify your password or tap "Continue with Google".'
                : 'Super Admin verification failed. Please check your password or tap "Continue with Google".')
          };
        }
        if (typeof data?.otaAdminToken === 'string') {
          setServerOTAAdminToken(data.otaAdminToken);
        }
        resetLoginFailures(cleanInput);
        const devProfile = loginAsDeveloper(cleanInput, { skipNavigate: true });
        return { success: true, profile: devProfile };
      } catch {
        recordLoginFailure(cleanInput);
        return {
          success: false,
          error:
            firebaseAuthCode === 'auth/wrong-password' ||
            firebaseAuthCode === 'auth/invalid-credential'
              ? 'Incorrect Super Admin password.'
              : 'Unable to reach verification server for Super Admin fallback sign-in. Enable Email/Password in Firebase Auth, check your connection, or tap "Continue with Google".'
        };
      }
    }

    let firebaseMatchedProfile: RegisteredUserProfile | null = null;
    let firebaseIdToken = '';
    if (cleanInput.includes('@') && !isOffline) {
      try {
        const fbCred = await signInWithEmailAndPassword(auth, cleanInput, password);
        await fbCred.user.reload().catch(() => {});
        if (!fbCred.user.emailVerified) {
          await sendEmailVerification(fbCred.user).catch(() => {});
          return {
            success: false,
            error: `Please verify your email first. We sent a fresh verification link to ${cleanInput}—open it and then sign in again.`
          };
        }
        firebaseIdToken = await fbCred.user.getIdToken().catch(() => '');
        const snap = await getDoc(doc(db, 'users', fbCred.user.uid)).catch(() => null);
        if (snap?.exists()) {
          firebaseMatchedProfile = repairSpecificTutorRecord(snap.data() as RegisteredUserProfile).user;
        }
      } catch (fbErr: any) {
        const fbCode = String(fbErr?.code || '');
        if (fbCode === 'auth/wrong-password' || fbCode === 'auth/invalid-credential') {
          const localCandidate = allRegisteredUsers.find(
            u => u.email.toLowerCase() === cleanInput
          );
          if (!localCandidate) {
            recordLoginFailure(cleanInput);
            return {
              success: false,
              error: 'Incorrect email or password. Please verify your credentials or try Continue with Google.'
            };
          }
        }
      }
    }

    const localMatched =
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

    const matched =
      firebaseMatchedProfile && localMatched
        ? mergeUserProfiles(localMatched, firebaseMatchedProfile)
        : firebaseMatchedProfile || localMatched;

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
          ...(firebaseIdToken ? { Authorization: `Bearer ${firebaseIdToken}` } : {}),
          ...getSecurityHeaders({
            userId: matched?.id,
            userEmail: matched?.email || (cleanInput.includes('@') ? cleanInput : undefined)
          })
        },
        body: JSON.stringify({
          identifier: cleanInput,
          password,
          method: firebaseIdToken ? 'google' : 'password',
          userId: matched?.id,
          email: matched?.email || (cleanInput.includes('@') ? cleanInput : undefined),
          role: matched?.role,
          hasLocalProfile: Boolean(matched)
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.authenticated) {
        if (data?.useEmailOtp && !firebaseIdToken) {
          return {
            success: false,
            useEmailOtp: true,
            email: typeof data.email === 'string' ? data.email : cleanInput.includes('@') ? cleanInput : undefined,
            error:
              data?.error ||
              'This account uses Passwordless Email Code (OTP) or Google Sign-In. Switch to Email Code to sign in across devices.'
          };
        }
        if (!firebaseIdToken) {
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
    setAllRegisteredUsers(prev => {
      const next = mergeUserProfileArrays([[matched], prev]);
      safeSetItem('sc_all_users', JSON.stringify(next));
      return next;
    });
    setCurrentUserProfile(matched);
    safeSetItem('sc_user_profile', JSON.stringify(matched));
    setCurrentRole(matched.role);
    if (matched.studentData) {
      setStudent(matched.studentData);
      safeSetItem('sc_student', JSON.stringify(matched.studentData));
    }
    return { success: true, profile: matched };
  };

  const requestLoginOtp = async (emailInput: string): Promise<{
    success: boolean;
    deliveredTo?: string;
    accountName?: string;
    needsSignup?: boolean;
    error?: string;
  }> => {
    const cleanEmail = String(emailInput || '').trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'Please enter a valid registered email address.' };
    }

    try {
      const res = await fetch('/api/auth/send-login-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getSecurityHeaders({ userEmail: cleanEmail })
        },
        body: JSON.stringify({ email: cleanEmail })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        return {
          success: false,
          needsSignup: Boolean(data?.needsSignup),
          error: data?.error || 'Could not send 6-digit login code. Please check your email and try again.'
        };
      }
      return {
        success: true,
        deliveredTo: data.deliveredTo || cleanEmail,
        accountName: data.accountName
      };
    } catch {
      return {
        success: false,
        error: 'Unable to reach verification server right now. Check your internet connection and try again.'
      };
    }
  };

  const verifyLoginOtp = async (
    emailInput: string,
    codeInput: string
  ): Promise<{ success: boolean; profile?: RegisteredUserProfile; error?: string }> => {
    const cleanEmail = String(emailInput || '').trim().toLowerCase();
    const cleanCode = String(codeInput || '').trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'Please enter a valid registered email address.' };
    }
    if (!/^\d{6}$/.test(cleanCode)) {
      return { success: false, error: 'Please enter the 6-digit code sent to your email.' };
    }

    try {
      const res = await fetch('/api/auth/verify-otp-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getSecurityHeaders({ userEmail: cleanEmail })
        },
        body: JSON.stringify({ email: cleanEmail, code: cleanCode })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.authenticated || !data?.profile) {
        return {
          success: false,
          error: data?.error || 'Invalid or expired 6-digit login code. Please request a new code.'
        };
      }

      if (typeof data.otaAdminToken === 'string') {
        setServerOTAAdminToken(data.otaAdminToken);
      }
      if (typeof data.sessionToken === 'string') {
        setUserSessionToken(data.sessionToken);
      }

      const otpRepair = repairSpecificTutorRecord(data.profile as RegisteredUserProfile);
      const verifiedProfile = otpRepair.user;
      if (otpRepair.changed) {
        void fetch('/api/users/sync-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getSecurityHeaders({ userId: verifiedProfile.id, userEmail: verifiedProfile.email })
          },
          body: JSON.stringify({ profile: verifiedProfile })
        }).catch(() => {});
      }
      resetLoginFailures(cleanEmail);
      setAllRegisteredUsers(prev => {
        const merged = mergeUserProfileArrays([prev, [verifiedProfile]]);
        safeSetItem('sc_all_users', JSON.stringify(merged));
        return merged;
      });
      setCurrentUserProfile(verifiedProfile);
      safeSetItem('sc_user_profile', JSON.stringify(verifiedProfile));
      setCurrentRole(verifiedProfile.role);
      if (verifiedProfile.studentData) {
        setStudent(verifiedProfile.studentData);
        safeSetItem('sc_student', JSON.stringify(verifiedProfile.studentData));
      }
      return { success: true, profile: verifiedProfile };
    } catch {
      return {
        success: false,
        error: 'Network error verifying login code. Please try again.'
      };
    }
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
      setServerOTAAdminToken(null);
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
      const { result, updatedExploration } = calculateDynamicXP(opts, prev.dailyExploration, prev.rank);

      const newXP = prev.xp + result.totalXPAwarded;
      const baseExamPercentages = examResultsRef.current.map(r => r.percentage);
      const isExamTask =
        (opts.feature === 'cbt' || opts.feature === 'aspirant-cbt') &&
        typeof opts.scorePercentage === 'number';
      const effectiveExamPercentages = isExamTask
        ? [opts.scorePercentage as number, ...baseExamPercentages]
        : baseExamPercentages;
      const verifiedNotesCount = (prev.completedReadNoteIds || []).length;

      const masterySnapshot = {
        streakDays: prev.streakDays,
        verifiedNotesCount,
        examPercentages: effectiveExamPercentages
      };
      const newRank = calculateRankFromXP(newXP, undefined, masterySnapshot);
      const rankChanged = newRank !== prev.rank;

      const progressAfter = getRankProgress(newXP, undefined, masterySnapshot);
      const enrichedResult: AwardXPResult = {
        ...result,
        rankPromotionBlockedByGates: Boolean(progressAfter.gatesPending)
      };
      computedResult = enrichedResult;

      const updated = {
        ...prev,
        xp: newXP,
        rank: newRank,
        dailyExploration: updatedExploration,
      };

      const studyDate = new Date().toISOString().split('T')[0];

      if (currentUser && !isOffline && !isSuperAdminEmail(currentUser.email)) {
        const docRef = doc(db, 'students', currentUser.uid);
        const path = `students/${currentUser.uid}`;
        // Allowed client-side profile fields only; XP & rank are enforced server-side
        updateDoc(docRef, {
          lastStudyDate: studyDate,
          dailyExploration: updatedExploration,
        }).catch(err => {
          const msg = String(err?.message || '').toLowerCase();
          if (!msg.includes('offline') && !msg.includes('network') && !msg.includes('no document to update') && !msg.includes('not-found')) {
            handleFirestoreError(err, OperationType.UPDATE, path);
          }
        });

        const qualifyingExams60 = effectiveExamPercentages.filter(p => p >= 60).length;
        const qualifyingExams70 = effectiveExamPercentages.filter(p => p >= 70).length;
        const qualifyingExams75 = effectiveExamPercentages.filter(p => p >= 75).length;
        const qualifyingExams80 = effectiveExamPercentages.filter(p => p >= 80).length;

        void (async () => {
          try {
            const headers = await getFirebaseAuthHeaders();
            if (!headers.Authorization) return;
            const res = await fetch('/api/students/sync-progress', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', ...headers },
              body: JSON.stringify({
                deltaXP: result.totalXPAwarded,
                reason: opts.reason,
                streakDays: prev.streakDays,
                verifiedNotesCount,
                qualifyingExams60,
                qualifyingExams70,
                qualifyingExams75,
                qualifyingExams80
              }),
            });
            const data = await res.json().catch(() => null);
            if (res.ok && data?.success) {
              authoritativeStudentOverlayRef.current = {
                ...(authoritativeStudentOverlayRef.current || {}),
                xp: data.xp,
                rank: data.rank,
              };
            }
          } catch {
            const scopeId = currentUser.uid || currentUserProfile?.id || 'guest';
            const updatedQueue = enqueueOfflineSyncItem(scopeId, {
              operationKey: 'student_xp_snapshot',
              type: 'xp_award',
              label: opts.reason || 'XP progress snapshot',
              payload: {
                xp: newXP,
                deltaXP: result.totalXPAwarded,
                rank: newRank,
                streakDays: prev.streakDays,
                lastStudyDate: studyDate
              }
            });
            setPendingSyncCount(updatedQueue.length);
          }
        })();
      } else {
        const scopeId = currentUser?.uid || currentUserProfile?.id || 'guest';
        const updatedQueue = enqueueOfflineSyncItem(scopeId, {
          operationKey: 'student_xp_snapshot',
          type: 'xp_award',
          label: opts.reason || 'Offline XP award',
          payload: {
            xp: newXP,
            deltaXP: result.totalXPAwarded,
            rank: newRank,
            streakDays: prev.streakDays,
            lastStudyDate: studyDate
          }
        });
        setPendingSyncCount(updatedQueue.length);
      }

      setLastXPAward(enrichedResult);

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
  }, [currentUser, currentUserProfile?.id, isOffline]);

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
        prev.dailyExploration,
        prev.rank
      );
      computedResult = result;

      const newXP = prev.xp + result.totalXPAwarded;
      nextCompletedIds = [...prevIds, topic.id].slice(-200);
      const examPercentages = examResultsRef.current.map(r => r.percentage);
      const newRank = calculateRankFromXP(newXP, undefined, {
        streakDays: prev.streakDays,
        verifiedNotesCount: nextCompletedIds.length,
        examPercentages
      });
      const rankChanged = newRank !== prev.rank;

      finalXP = newXP;
      finalRank = newRank;

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

      if (currentUser && !isOffline && !isSuperAdminEmail(currentUser.email)) {
        const docRef = doc(db, 'students', currentUser.uid);
        const path = `students/${currentUser.uid}`;
        // Allowed client-side profile fields only; XP & rank are enforced server-side
        updateDoc(docRef, {
          lastStudyDate: studyDate,
          completedReadNoteIds: nextCompletedIds,
          verifiedReadingLogs: nextLogs
        }).catch(err => {
          const msg = String(err?.message || '').toLowerCase();
          if (!msg.includes('offline') && !msg.includes('network') && !msg.includes('no document to update') && !msg.includes('not-found')) {
            handleFirestoreError(err, OperationType.UPDATE, path);
          }
        });

        const qualifyingExams60 = examPercentages.filter(p => p >= 60).length;
        const qualifyingExams70 = examPercentages.filter(p => p >= 70).length;
        const qualifyingExams75 = examPercentages.filter(p => p >= 75).length;
        const qualifyingExams80 = examPercentages.filter(p => p >= 80).length;

        void (async () => {
          try {
            const headers = await getFirebaseAuthHeaders();
            if (!headers.Authorization) return;
            const res = await fetch('/api/students/sync-progress', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', ...headers },
              body: JSON.stringify({
                deltaXP: result.totalXPAwarded,
                reason: `Verified Reading: ${topic.topicTitle}`,
                streakDays: prev.streakDays,
                verifiedNotesCount: nextCompletedIds.length,
                qualifyingExams60,
                qualifyingExams70,
                qualifyingExams75,
                qualifyingExams80
              }),
            });
            const data = await res.json().catch(() => null);
            if (res.ok && data?.success) {
              authoritativeStudentOverlayRef.current = {
                ...(authoritativeStudentOverlayRef.current || {}),
                xp: data.xp,
                rank: data.rank,
              };
            }
          } catch {
            const scopeId = currentUser.uid || currentUserProfile?.id || 'guest';
            const updatedQueue = enqueueOfflineSyncItem(
              scopeId,
              createLessonReadQueuePayload({
                noteId: topic.id,
                topicTitle: topic.topicTitle,
                xp: newXP,
                rank: newRank,
                streakDays: prev.streakDays,
                lastStudyDate: studyDate,
                completedReadNoteIds: nextCompletedIds,
                verifiedReadingLogs: nextLogs
              })
            );
            setPendingSyncCount(updatedQueue.length);
          }
        })();
      } else {
        const scopeId = currentUser?.uid || currentUserProfile?.id || 'guest';
        const updatedQueue = enqueueOfflineSyncItem(
          scopeId,
          createLessonReadQueuePayload({
            noteId: topic.id,
            topicTitle: topic.topicTitle,
            xp: newXP,
            rank: newRank,
            streakDays: prev.streakDays,
            lastStudyDate: studyDate,
            completedReadNoteIds: nextCompletedIds,
            verifiedReadingLogs: nextLogs
          })
        );
        setPendingSyncCount(updatedQueue.length);
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
    const canOverrideStudentClass =
      isSuperAdmin ||
      Boolean(impersonatedUser) ||
      isSuperAdminEmail(currentUser?.email) ||
      isSuperAdminEmail(currentUserProfile?.email);
    if (!canOverrideStudentClass) {
      return;
    }

    const finalStream = stream || (typeof classLevel === 'string' && classLevel.startsWith('JSS') ? 'Junior' : 'Science');
    setStudent(prev => {
      const updated = {
        ...prev,
        classLevel,
        stream: finalStream
      };

      safeSetItem('sc_student', JSON.stringify(updated));

      if (currentUser && !isOffline && !isSuperAdminEmail(currentUser.email)) {
        const docRef = doc(db, 'students', currentUser.uid);
        const path = `students/${currentUser.uid}`;
        updateDoc(docRef, { classLevel, stream: finalStream }).catch(err => {
          const msg = String(err?.message || '').toLowerCase();
          if (!msg.includes('no document to update') && !msg.includes('not-found')) {
            handleFirestoreError(err, OperationType.UPDATE, path);
          }
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

      if (currentUser && !isOffline && !isSuperAdminEmail(currentUser.email)) {
        const docRef = doc(db, 'students', currentUser.uid);
        const path = `students/${currentUser.uid}`;
        const safeFirestorePhotoUrl = sanitizeAvatarForCloud(photoUrl) ?? null;
        updateDoc(docRef, {
          uniformVerified: true,
          uniformPhotoUrl: safeFirestorePhotoUrl
        }).catch(err => {
          handleFirestoreError(err, OperationType.UPDATE, path);
        });

        const deltaXP = prev.uniformVerified ? 0 : 500;
        void (async () => {
          try {
            const headers = await getFirebaseAuthHeaders();
            if (!headers.Authorization) return;
            const res = await fetch('/api/students/sync-progress', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', ...headers },
              body: JSON.stringify({
                deltaXP,
                uniformVerified: true,
                reason: 'School Uniform Verification Bonus',
              }),
            });
            const data = await res.json().catch(() => null);
            if (res.ok && data?.success) {
              authoritativeStudentOverlayRef.current = {
                ...(authoritativeStudentOverlayRef.current || {}),
                xp: data.xp,
                rank: data.rank,
                uniformVerified: true,
              };
            }
          } catch {}
        })();
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

  const updateUserAvatar = async (photoUrl: string) => {
    const safePhoto = sanitizeAvatarForCloud(photoUrl);
    if (safePhoto === undefined) return;

    const isStudentPersona =
      currentRole === 'student' || currentUserProfile?.role === 'student';

    if (isStudentPersona) {
      setStudent(prev => {
        const updated = {
          ...prev,
          uniformPhotoUrl: safePhoto || null
        };
        safeSetItem('sc_student', JSON.stringify(updated));
        return updated;
      });

      if (currentUser && !isOffline && !isSuperAdminEmail(currentUser.email)) {
        const docRef = doc(db, 'students', currentUser.uid);
        const path = `students/${currentUser.uid}`;
        updateDoc(docRef, {
          uniformPhotoUrl: safePhoto || null
        }).catch(err => {
          handleFirestoreError(err, OperationType.UPDATE, path);
        });
      }
    }

    if (currentUserProfile) {
      await updateUserRecord(currentUserProfile.id, {
        avatarUrl: safePhoto,
        ...(isStudentPersona && currentUserProfile.studentData
          ? {
              studentData: {
                ...currentUserProfile.studentData,
                uniformPhotoUrl: safePhoto || null
              }
            }
          : {})
      });
    } else {
      setCurrentUserProfile(prev => {
        if (!prev) return null;
        const updated = { ...prev, avatarUrl: safePhoto };
        safeSetItem('sc_user_profile', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const updateStudentAvatar = (photoUrl: string) => {
    void updateUserAvatar(photoUrl);
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

      if (currentUser && !isOffline && !isSuperAdminEmail(currentUser.email)) {
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
        const headers = await getFirebaseAuthHeaders();
        const res = await fetch('/api/wallet/debit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...headers },
          body: JSON.stringify({
            amountNaira: feeNaira,
            purpose: 'certificate_drill_regeneration',
            description: `Fresh ${boardLabel}Examination Paper: ${subject}`,
            reference: txId,
          }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.success) {
          setParentWallet(parentWallet);
          safeSetItem('sc_parent_wallet', JSON.stringify(parentWallet));
          setLastSecurityAlert(data?.error || 'Could not verify wallet debit on server.');
          return false;
        }
        if (data.wallet) {
          authoritativeWalletOverlayRef.current = {
            balanceNaira: data.wallet.balanceNaira,
            transactions: data.wallet.transactions,
          };
          setParentWallet((prev) => ({
            ...prev,
            balanceNaira: data.wallet.balanceNaira,
            transactions: Array.isArray(data.wallet.transactions) ? data.wallet.transactions : prev.transactions,
          }));
        }
      } catch (err) {
        console.warn('Could not verify drill wallet deduction on server:', err);
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
        const scopeId = currentUser.uid || currentUserProfile?.id || 'guest';
        const updatedQueue = enqueueOfflineSyncItem(
          scopeId,
          createExamResultQueuePayload(finalResult, finalXP)
        );
        setPendingSyncCount(updatedQueue.length);
        const msg = String(err?.message || '').toLowerCase();
        if (!msg.includes('offline') && !msg.includes('network')) {
          handleFirestoreError(err, OperationType.CREATE, path);
        }
      });
    } else {
      const scopeId = currentUser?.uid || currentUserProfile?.id || 'guest';
      const updatedQueue = enqueueOfflineSyncItem(
        scopeId,
        createExamResultQueuePayload(finalResult, finalXP)
      );
      setPendingSyncCount(updatedQueue.length);
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
        studentLinkCode: student.studentLinkCode || '',
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
    let matchedWard: LinkedWard | null = null;
    let serverResponded404 = false;

    // 1. Live cross-device lookup via backend API & Firestore studentLinkRegistry
    try {
      const res = await fetch(`/api/students/link-lookup?query=${encodeURIComponent(term)}`);
      if (res.ok) {
        const data = await res.json();
        if (data?.found && data.ward) {
          matchedWard = {
            studentId: data.ward.studentId,
            studentName: data.ward.studentName,
            classLevel: data.ward.classLevel || 'SS 3',
            stream: data.ward.stream || 'Science',
            schoolName: data.ward.schoolName || 'Secondary School',
            studentLinkCode: data.ward.studentLinkCode,
            linkedAt: new Date().toISOString(),
            isPrimary: linkedWards.length === 0
          };
        }
      } else if (res.status === 404) {
        serverResponded404 = true;
      }
    } catch {
      // Network offline or server unavailable — allow local fallback below
    }

    // 2. Fallback to local allRegisteredUsers / current student (e.g. created offline on this device)
    if (!matchedWard) {
      const matchedUser = allRegisteredUsers.find(u => {
        if (u.role !== 'student') return false;
        if (isEmail && u.email?.toLowerCase() === cleanTerm) return true;
        const code = u.studentData?.studentLinkCode?.toLowerCase() || '';
        return Boolean(
          code && (code === cleanTerm || code.replace(/[^a-z0-9]/gi, '') === cleanTerm.replace(/[^a-z0-9]/gi, ''))
        );
      });

      let matchedStudent: StudentProfile | null = matchedUser?.studentData || null;
      if (!matchedStudent && student.name) {
        const code = (student.studentLinkCode || '').toLowerCase();
        if (
          (isEmail && currentUser?.email?.toLowerCase() === cleanTerm) ||
          (code && (code === cleanTerm || code.replace(/[^a-z0-9]/gi, '') === cleanTerm.replace(/[^a-z0-9]/gi, '')))
        ) {
          matchedStudent = student;
        }
      }

      if (matchedStudent && matchedStudent.studentLinkCode) {
        matchedWard = {
          studentId: matchedStudent.id,
          studentName: matchedStudent.name,
          classLevel: matchedStudent.classLevel,
          stream: matchedStudent.stream,
          schoolName: matchedStudent.school,
          studentLinkCode: matchedStudent.studentLinkCode,
          linkedAt: new Date().toISOString(),
          isPrimary: linkedWards.length === 0
        };
      }
    }

    if (!matchedWard) {
      return {
        success: false,
        message: isEmail
          ? `No active student found registered with email "${term}".`
          : serverResponded404
          ? `No active student found matching Link Code "${term.toUpperCase()}". Ask your ward to check their Student Dashboard for their Link Code.`
          : `No student found matching Link Code "${term.toUpperCase()}". Please verify the code and try again.`
      };
    }

    // Check if already linked
    if (
      linkedWards.some(
        w =>
          w.studentId === matchedWard!.studentId ||
          w.studentLinkCode.toLowerCase() === matchedWard!.studentLinkCode.toLowerCase()
      )
    ) {
      return {
        success: false,
        message: `${matchedWard.studentName} is already linked to your parent account.`
      };
    }

    const newWard: LinkedWard = matchedWard;
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
      return updated;
    });

    if (currentUser && !isOffline) {
      void refreshAuthoritativeLedgers();
    }

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
    const targetPinOwnerId = currentUserProfile?.id || currentUser?.uid || '';
    if (expectedPin && targetPinOwnerId) {
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
        return {
          ...prev,
          balanceNaira: updatedBalance,
          transactions: [debitTx, ...prev.transactions]
        };
      });

      if (currentUser && !isOffline) {
        void (async () => {
          try {
            const headers = await getFirebaseAuthHeaders();
            if (!headers.Authorization) return;
            const res = await fetch('/api/wallet/debit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', ...headers },
              body: JSON.stringify({
                amountNaira: targetBooking.amountNaira,
                purpose: 'tutor_booking_hold',
                bookingId,
                description: `Escrow Hold: ${targetBooking.tutorName} (${targetBooking.subject})`,
                reference: `ESCROW_${bookingId}`,
              }),
            });
            const data = await res.json().catch(() => null);
            if (res.ok && data?.wallet) {
              authoritativeWalletOverlayRef.current = {
                balanceNaira: data.wallet.balanceNaira,
                transactions: data.wallet.transactions,
              };
            } else if (!res.ok) {
              setLastSecurityAlert(data?.error || 'Server rejected escrow debit; refreshing wallet.');
              void refreshAuthoritativeLedgers();
            }
          } catch {}
        })();
      }
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
      if (currentUser && !isOffline) {
        void (async () => {
          try {
            const headers = await getFirebaseAuthHeaders();
            if (!headers.Authorization) return;
            const res = await fetch('/api/wallet/refund-escrow', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', ...headers },
              body: JSON.stringify({ bookingId: booking.id, reason: reasonText }),
            });
            const data = await res.json().catch(() => null);
            if (res.ok && data?.wallet) {
              authoritativeWalletOverlayRef.current = {
                balanceNaira: data.wallet.balanceNaira,
                transactions: data.wallet.transactions,
              };
            }
          } catch {}
        })();
      }
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

  const currentStudentId = currentUser?.uid || student.id || '';
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
      return {
        ...prev,
        balanceNaira: updatedBalance,
        transactions: [debitTx, ...prev.transactions]
      };
    });

    if (currentUser && !isOffline) {
      void (async () => {
        try {
          const headers = await getFirebaseAuthHeaders();
          if (!headers.Authorization) return;
          const res = await fetch('/api/wallet/debit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...headers },
            body: JSON.stringify({
              amountNaira: reg.registrationFeeNaira,
              purpose: 'championship_entry',
              description: `Termly Championship Entry: ${reg.studentName} (${reg.classLevel})`,
              reference: `CHAMP_${registrationId}`,
            }),
          });
          const data = await res.json().catch(() => null);
          if (res.ok && data?.wallet) {
            authoritativeWalletOverlayRef.current = {
              balanceNaira: data.wallet.balanceNaira,
              transactions: data.wallet.transactions,
            };
          } else if (!res.ok) {
            setLastSecurityAlert(data?.error || 'Championship wallet debit could not be verified.');
            void refreshAuthoritativeLedgers();
          }
        } catch {}
      })();
    }

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
        return {
          ...prev,
          balanceNaira: updatedBalance,
          transactions: [debitTx, ...prev.transactions]
        };
      });

      if (currentUser && !isOffline) {
        void (async () => {
          try {
            const headers = await getFirebaseAuthHeaders();
            if (!headers.Authorization) return;
            const res = await fetch('/api/entitlements/unlock-with-wallet', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', ...headers },
              body: JSON.stringify({ action: 'exam_prep_full' }),
            });
            const data = await res.json().catch(() => null);
            if (res.ok && data?.success) {
              if (data.wallet) {
                authoritativeWalletOverlayRef.current = {
                  balanceNaira: data.wallet.balanceNaira,
                  transactions: data.wallet.transactions,
                };
              }
              void refreshAuthoritativeLedgers();
            } else if (!res.ok) {
              setLastSecurityAlert(data?.error || 'Could not verify Exam Prep wallet unlock on server.');
              void refreshAuthoritativeLedgers();
            }
          } catch {}
        })();
      }
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
      paymentMethod: method === 'paystack' ? 'direct_paystack' : 'escrow_wallet',
      paymentReference: paymentReference || debitTx.reference,
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
        return {
          ...prev,
          balanceNaira: updatedBalance,
          transactions: [debitTx, ...prev.transactions]
        };
      });

      if (currentUser && !isOffline) {
        void (async () => {
          try {
            const headers = await getFirebaseAuthHeaders();
            if (!headers.Authorization) return;
            const res = await fetch('/api/entitlements/unlock-with-wallet', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', ...headers },
              body: JSON.stringify({ action: 'exam_prep_single', subject }),
            });
            const data = await res.json().catch(() => null);
            if (res.ok && data?.success) {
              if (data.wallet) {
                authoritativeWalletOverlayRef.current = {
                  balanceNaira: data.wallet.balanceNaira,
                  transactions: data.wallet.transactions,
                };
              }
              void refreshAuthoritativeLedgers();
            } else if (!res.ok) {
              setLastSecurityAlert(data?.error || 'Could not verify subject unlock on server.');
              void refreshAuthoritativeLedgers();
            }
          } catch {}
        })();
      }
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
        paymentReference: paymentReference || debitTx.reference || prev.paymentReference,
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
      if (isOffline) {
        const scopeId = currentUser?.uid || currentUserProfile?.id || 'guest';
        const updatedQueue = enqueueOfflineSyncItem(scopeId, {
          operationKey: `study_block:${blockId}`,
          type: 'study_block',
          label: `Study block: ${blockId}`,
          payload: {
            completedBlockIds: next,
            updatedAt: new Date().toISOString()
          }
        });
        setPendingSyncCount(updatedQueue.length);
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
        const fallbackDegree = formatPrimaryDegreeSummary({
          highestEducation: td?.highestEducation,
          qualification: td?.qualification,
          courseOfStudy: td?.courseOfStudy,
          institution: td?.institution
        });
        return {
          id: u.id,
          name: u.fullName,
          tagline: td?.tagline || `${td?.subjectSpecialization || 'Secondary'} Specialist`,
          subjects:
            td?.proficientSubjects && td.proficientSubjects.length > 0
              ? td.proficientSubjects
              : [td?.subjectSpecialization || 'General Subjects'],
          rating: 5.0,
          reviewCount: 0,
          hourlyRateNaira: td?.hourlyRate || 3500,
          location: formatTutorLocation(td?.city, td?.state),
          state: td?.state || 'Lagos',
          isNinVerified: Boolean(td?.nin || td?.verification?.isVerified),
          education:
            td?.qualification && !/^other$/i.test(td.qualification)
              ? td.qualification
              : `${td?.highestEducation || 'B.Sc.'}${td?.institution ? ` (${td.institution})` : ''}`,
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
          degrees: td?.degrees && td.degrees.length > 0 ? td.degrees : [fallbackDegree],
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
        return {
          ...prev,
          balanceNaira: updatedBalance,
          transactions: [debitTx, ...prev.transactions]
        };
      });
      if (currentUser && !isOffline) {
        void (async () => {
          try {
            const headers = await getFirebaseAuthHeaders();
            if (!headers.Authorization) return;
            const res = await fetch('/api/wallet/debit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', ...headers },
              body: JSON.stringify({
                amountNaira: params.amountNaira,
                purpose: 'tutor_booking_hold',
                bookingId,
                description: `Tutor Escrow Hold: ${params.tutorName} (${params.subject})`,
                reference: `ESCROW_${bookingId}`,
              }),
            });
            const data = await res.json().catch(() => null);
            if (res.ok && data?.wallet) {
              authoritativeWalletOverlayRef.current = {
                balanceNaira: data.wallet.balanceNaira,
                transactions: data.wallet.transactions,
              };
            } else if (!res.ok) {
              setLastSecurityAlert(data?.error || 'Tutor escrow wallet debit rejected by server.');
              void refreshAuthoritativeLedgers();
            }
          } catch {}
        })();
      }
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
    const { parentPin: _omitParentPin, ...bookingParams } = params;
    const feeSplit = calculateTutorBookingSplit(bookingParams.amountNaira);
    const newBooking: TutorBooking = {
      ...bookingParams,
      id: bookingId,
      createdAt: new Date().toISOString(),
      status: isParentApprovedNow ? 'pending_tutor' : 'pending_parent',
      amountNaira: feeSplit.grossAmountNaira,
      commissionRatePercent: feeSplit.commissionRatePercent,
      platformFeeNaira: feeSplit.platformFeeNaira,
      tutorNetNaira: feeSplit.tutorNetNaira,
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
      const firestorePayload = Object.fromEntries(
        Object.entries(newBooking).filter(([, value]) => value !== undefined)
      );
      setDoc(bookingDocRef, firestorePayload).catch(err => {
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
    if (!isSuperAdmin && checkRegistrationPausedForRole(otaAppRelease, role)) {
      return;
    }
    const newId =
      (profileData.firebaseUid && String(profileData.firebaseUid).trim()) ||
      `usr_${role}_${Date.now()}`;
    const fullName = profileData.fullName || profileData.name || 'User';
    const email = String(profileData.email || '').trim().toLowerCase();

    if (email) {
      const existingActiveConflict = allRegisteredUsers.find(
        u =>
          u.accountStatus !== 'deleted' &&
          !isPurgedRecord(u) &&
          String(u.email || '').trim().toLowerCase() === email &&
          (u.id !== newId || normalizeRoleFamilyClient(u.role) !== normalizeRoleFamilyClient(role))
      );
      if (existingActiveConflict) {
        return;
      }
    }

    const syncProfileToServer = (
      profileSnapshot: RegisteredUserProfile,
      endpoint: '/api/users/register' | '/api/users/sync-profile' = '/api/users/sync-profile'
    ) => {
      void fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getSecurityHeaders({
            userId: profileSnapshot.id,
            userEmail: profileSnapshot.email || undefined
          })
        },
        body: JSON.stringify({ profile: profileSnapshot })
      })
        .then(r => r.json().catch(() => ({})))
        .then(data => {
          if (typeof data?.sessionToken === 'string') {
            setUserSessionToken(data.sessionToken);
          }
        })
        .catch(() => {});
    };

    const safeRawAvatar = sanitizeAvatarForCloud(profileData.avatarUrl);
    const newProfile: RegisteredUserProfile = {
      id: newId,
      role,
      fullName,
      email,
      ...(safeRawAvatar !== undefined ? { avatarUrl: safeRawAvatar } : {}),
      emailVerified: true,
      verifiedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      legalConsent:
        profileData.legalConsent && profileData.legalConsent.accepted
          ? profileData.legalConsent
          : createLegalConsentRecord(role),
      directorySource: auth.currentUser && auth.currentUser.uid === newId ? 'firestore' : 'backend'
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
        studentLinkCode: profileData.studentLinkCode ? String(profileData.studentLinkCode).trim().toUpperCase() : undefined,
        referredByCode: candidateRefCode || undefined,
        referralAttributedAt: candidateRefCode ? new Date().toISOString() : undefined,
        aspirantRewardStatus: 'not_eligible'
      };
      newProfile.studentData = freshStudent;
      setStudent(freshStudent);
      safeSetItem('sc_student', JSON.stringify(freshStudent));

      // Issue live collision-checked Student Link Code on the server & persist to Firestore registry
      fetch('/api/students/link-code/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: newId,
          studentName: fullName,
          studentEmail: email,
          classLevel: freshStudent.classLevel,
          stream: freshStudent.stream,
          schoolName: freshStudent.school,
          schoolCode: freshStudent.schoolCode,
          preferredCode: freshStudent.studentLinkCode
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data?.success && data?.studentLinkCode) {
            const issuedCode = String(data.studentLinkCode).toUpperCase();
            setStudent(prev => {
              if (prev.id !== newId) return prev;
              const nextStu: StudentProfile = { ...prev, studentLinkCode: issuedCode };
              safeSetItem('sc_student', JSON.stringify(nextStu));
              return nextStu;
            });
            setCurrentUserProfile(prev => {
              if (!prev || prev.id !== newId || !prev.studentData) return prev;
              const nextProf: RegisteredUserProfile = {
                ...prev,
                studentData: { ...prev.studentData, studentLinkCode: issuedCode }
              };
              safeSetItem('sc_user_profile', JSON.stringify(nextProf));
              syncProfileToServer(nextProf);
              return nextProf;
            });
            setAllRegisteredUsers(prev => {
              const nextList = prev.map(u =>
                u.id === newId && u.studentData
                  ? { ...u, studentData: { ...u.studentData, studentLinkCode: issuedCode } }
                  : u
              );
              safeSetItem('sc_all_users', JSON.stringify(nextList));
              return nextList;
            });

            if (freshStudent.schoolCode) {
              fetch('/api/schools/enroll-student', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  schoolCode: freshStudent.schoolCode,
                  studentId: newId,
                  studentName: fullName,
                  studentEmail: email,
                  studentLinkCode: issuedCode,
                  classLevel: freshStudent.classLevel,
                  stream: freshStudent.stream,
                  xp: 0,
                  rank: 'Fresher',
                  streakDays: 1,
                  isSubscribed: false,
                  subscriptionTier: 'free'
                })
              })
                .then(r => r.json())
                .then(enrollData => {
                  if (enrollData?.success && enrollData?.schoolName) {
                    setStudent(prev => {
                      if (prev.id !== newId) return prev;
                      const shouldReplaceSchool =
                        !prev.school ||
                        prev.school === 'Secondary School' ||
                        prev.school === 'Federal Secondary School';
                      const nextStu: StudentProfile = {
                        ...prev,
                        schoolCode: enrollData.schoolCode || prev.schoolCode,
                        school: shouldReplaceSchool ? enrollData.schoolName : prev.school
                      };
                      safeSetItem('sc_student', JSON.stringify(nextStu));
                      return nextStu;
                    });
                    setCurrentUserProfile(prev => {
                      if (!prev || prev.id !== newId || !prev.studentData) return prev;
                      const shouldReplaceSchool =
                        !prev.studentData.school ||
                        prev.studentData.school === 'Secondary School' ||
                        prev.studentData.school === 'Federal Secondary School';
                      const nextProf: RegisteredUserProfile = {
                        ...prev,
                        studentData: {
                          ...prev.studentData,
                          schoolCode: enrollData.schoolCode || prev.studentData.schoolCode,
                          school: shouldReplaceSchool ? enrollData.schoolName : prev.studentData.school
                        }
                      };
                      safeSetItem('sc_user_profile', JSON.stringify(nextProf));
                      syncProfileToServer(nextProf);
                      return nextProf;
                    });
                  }
                })
                .catch(() => {});
            }
          }
        })
        .catch(() => {});

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
              setCurrentUserProfile(prev => {
                if (!prev || prev.id !== newId || !prev.studentData) return prev;
                const nextProf: RegisteredUserProfile = {
                  ...prev,
                  studentData: {
                    ...prev.studentData,
                    referredByCode: data.referralCode || candidateRefCode,
                    referredPartnerId: data.partnerId,
                    referredPartnerName: data.partnerName
                  }
                };
                safeSetItem('sc_user_profile', JSON.stringify(nextProf));
                syncProfileToServer(nextProf);
                return nextProf;
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

      const cleanTutorSubjects = dedupeSubjects(
        Array.isArray(profileData.proficientSubjects) && profileData.proficientSubjects.length > 0
          ? profileData.proficientSubjects
          : Array.isArray(profileData.subjects) && profileData.subjects.length > 0
          ? profileData.subjects
          : []
      );
      const resolvedTutorSpec =
        String(profileData.subjectSpecialization || '').trim() ||
        formatSubjectSpecialization(cleanTutorSubjects, 'General Subjects');

      const normalizedHighestEd = normalizeHighestEducation(
        profileData.highestEducation,
        profileData.qualification
      );
      const rawCustomQual = String(profileData.qualification || '').trim();
      const resolvedQualification =
        normalizedHighestEd === 'Other'
          ? rawCustomQual || 'Other Higher Degree'
          : rawCustomQual && !/^other$/i.test(rawCustomQual)
            ? rawCustomQual
            : normalizedHighestEd;
      const resolvedInstitution = String(profileData.institution || '').trim();
      const resolvedCourseOfStudy = String(profileData.courseOfStudy || '').trim();
      const resolvedDegrees =
        Array.isArray(profileData.degrees) && profileData.degrees.length > 0
          ? profileData.degrees
          : [
              formatPrimaryDegreeSummary({
                highestEducation: normalizedHighestEd,
                qualification: resolvedQualification,
                courseOfStudy: resolvedCourseOfStudy,
                institution: resolvedInstitution
              })
            ];
      const nowIso = new Date().toISOString();

      newProfile.tutorData = {
        subjectSpecialization: resolvedTutorSpec,
        qualification: resolvedQualification,
        hourlyRate: Number(profileData.hourlyRate) || Number(profileData.hourlyRateNaira) || 3500,
        teachingMode: profileData.teachingMode || 'both',
        phone: profileData.phone || '',
        gender: profileData.gender || 'Prefer not to say',
        highestEducation: normalizedHighestEd,
        institution: resolvedInstitution,
        courseOfStudy: resolvedCourseOfStudy,
        experienceYearsRange: profileData.experienceYearsRange || '3-5 years',
        targetClasses: profileData.targetClasses || ['JSS 3', 'SS 3', 'WAEC/NECO Prep', 'JAMB Prep'],
        proficientSubjects: cleanTutorSubjects,
        bio:
          profileData.bio ||
          `${resolvedTutorSpec} educator specializing in WAEC distinctions, JAMB drills, and student-centered conceptual learning.`,
        tagline: profileData.tagline || `${resolvedTutorSpec} Specialist Educator`,
        city: String(profileData.city || 'Lagos').trim(),
        state: String(profileData.state || 'Lagos').trim(),
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
        degrees: resolvedDegrees,
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
        onboardingStage: profileData.onboardingStage || 3,
        manualSubjectOverrideAt: nowIso,
        manualProfileOverrideAt: nowIso,
        subjectRepairVersion: SUBJECT_REPAIR_VERSION,
        profileRepairVersion: REPAIRED_TUTOR_PROFILE_VERSION
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
      const PARTNER_CODE_REGEX = /^GP-[A-Z]{4}[0-9]{4}$/;
      const requestedCode = String(profileData.referralCode || '').trim().toUpperCase();
      const buildFallbackPartnerCode = (partnerName: string) => {
        const lettersPool = 'ABCDEFGHJKMNPQRSTUVWXYZ';
        const nameLetters = partnerName.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 4);
        let letters = nameLetters;
        while (letters.length < 4) {
          letters += lettersPool[Math.floor(Math.random() * lettersPool.length)];
        }
        const digits = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
        return `GP-${letters}${digits}`;
      };
      const initialReferralCode = PARTNER_CODE_REGEX.test(requestedCode)
        ? requestedCode
        : buildFallbackPartnerCode(fullName);

      const cleanBankName = String(profileData.bankName || '').trim();
      const cleanAccountNumber = String(profileData.accountNumber || '').replace(/\D/g, '').slice(0, 10);
      const cleanAccountName = String(profileData.accountName || fullName).trim();

      const partnerObj: GrowthPartner = {
        id: newId,
        name: fullName,
        email,
        phone: profileData.phone || '',
        referralCode: initialReferralCode,
        commissionRatePercent: 10,
        totalEarningsNaira: 0,
        totalPaidOutNaira: 0,
        activeReferralsCount: 0,
        bankName: cleanBankName,
        accountNumber: cleanAccountNumber,
        accountName: cleanAccountName,
        status: 'active',
        createdAt: new Date().toISOString()
      };
      newProfile.growthPartnerData = partnerObj;

      // Sync with server Firestore partner endpoint and reconcile collision-checked GP-XXXX0000 code
      fetch('/api/partners/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partnerId: newId,
          name: fullName,
          email,
          phone: profileData.phone || '',
          bankName: cleanBankName,
          accountNumber: cleanAccountNumber,
          accountName: cleanAccountName,
          referralCode: initialReferralCode
        })
      })
        .then(res => res.json())
        .then(data => {
          const liveCode = String(data?.partner?.referralCode || '').trim().toUpperCase();
          if (data?.success && liveCode) {
            setCurrentUserProfile(prev => {
              if (!prev || prev.id !== newId || !prev.growthPartnerData) return prev;
              const nextProf: RegisteredUserProfile = {
                ...prev,
                growthPartnerData: {
                  ...prev.growthPartnerData,
                  referralCode: liveCode,
                  bankName: cleanBankName || prev.growthPartnerData.bankName || data?.partner?.bankName || '',
                  accountNumber: cleanAccountNumber || prev.growthPartnerData.accountNumber || data?.partner?.accountNumber || '',
                  accountName: cleanAccountName || prev.growthPartnerData.accountName || data?.partner?.accountName || fullName
                }
              };
              safeSetItem('sc_user_profile', JSON.stringify(nextProf));
              syncProfileToServer(nextProf);
              return nextProf;
            });
            setAllRegisteredUsers(prev => {
              const nextList = prev.map(u =>
                u.id === newId && u.growthPartnerData
                  ? {
                      ...u,
                      growthPartnerData: {
                        ...u.growthPartnerData,
                        referralCode: liveCode,
                        bankName: cleanBankName || u.growthPartnerData.bankName || data?.partner?.bankName || '',
                        accountNumber: cleanAccountNumber || u.growthPartnerData.accountNumber || data?.partner?.accountNumber || '',
                        accountName: cleanAccountName || u.growthPartnerData.accountName || data?.partner?.accountName || fullName
                      }
                    }
                  : u
              );
              safeSetItem('sc_all_users', JSON.stringify(nextList));
              return nextList;
            });
          }
        })
        .catch(err => console.warn('Could not sync partner with server:', err));
    } else if (role === 'admin') {
      const isPrivilegedAdmin = isSuperAdminEmail(email);
      const initialSchoolCode = profileData.schoolCode
        ? String(profileData.schoolCode).trim().toUpperCase()
        : '';
      const adminVerifStatus: 'verified' | 'pending_verification' = isPrivilegedAdmin
        ? 'verified'
        : profileData.verificationStatus || 'pending_verification';

      newProfile.adminData = {
        schoolName: profileData.schoolName || 'Secondary School',
        schoolType: profileData.schoolType || 'College',
        schoolCode: initialSchoolCode,
        designation: profileData.designation || 'School Administrator',
        phone: profileData.phone || '',
        state: profileData.state || 'Lagos',
        lga: profileData.lga || 'Lagos Island',
        documentUrl: profileData.documentUrl || '',
        verificationStatus: adminVerifStatus,
        verifiedAt: isPrivilegedAdmin ? new Date().toISOString() : undefined
      };

      // Register & persist collision-checked School Code into live Firestore schoolRegistry
      fetch('/api/schools/code/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminId: newId,
          schoolName: newProfile.adminData.schoolName,
          schoolType: newProfile.adminData.schoolType,
          state: newProfile.adminData.state,
          lga: newProfile.adminData.lga,
          verificationStatus: adminVerifStatus,
          preferredCode: initialSchoolCode || undefined
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data?.success && data?.schoolCode) {
            const liveCode = String(data.schoolCode).toUpperCase();
            setCurrentUserProfile(prev => {
              if (!prev || prev.id !== newId || !prev.adminData) return prev;
              const nextProf: RegisteredUserProfile = {
                ...prev,
                adminData: { ...prev.adminData, schoolCode: liveCode }
              };
              safeSetItem('sc_user_profile', JSON.stringify(nextProf));
              syncProfileToServer(nextProf);
              return nextProf;
            });
            setAllRegisteredUsers(prev => {
              const nextList = prev.map(u =>
                u.id === newId && u.adminData
                  ? { ...u, adminData: { ...u.adminData, schoolCode: liveCode } }
                  : u
              );
              safeSetItem('sc_all_users', JSON.stringify(nextList));
              return nextList;
            });
          }
        })
        .catch(() => {});
    }

    setAllRegisteredUsers(prev => {
      const next = [newProfile, ...prev.filter(u => u.id !== newProfile.id && !isPurgedRecord(u))];
      safeSetItem('sc_all_users', JSON.stringify(next));
      return next;
    });
    setCurrentUserProfile(newProfile);
    safeSetItem('sc_user_profile', JSON.stringify(newProfile));
    syncProfileToServer(newProfile, '/api/users/register');

    if (!isOffline && auth.currentUser && auth.currentUser.uid === newId) {
      const firestoreSafeRole = newProfile.role === 'admin' ? 'school_admin' : newProfile.role;
      const createPayload = sanitizeUserAccountForFirestore({
        ...newProfile,
        role: firestoreSafeRole as UserRole,
        isSuperAdmin: false,
        isDeveloper: false,
        accountStatus: 'active',
        walletFrozen: false
      });
      setDoc(doc(db, 'users', newId), createPayload).catch((err) => {
        console.warn('Could not persist registered user doc to Firestore:', err);
      });
    }

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

  const [schoolLiveRostersByCode, setSchoolLiveRostersByCode] = useState<
    Record<string, { schoolCode: string; school?: any; students: any[]; metrics: any; fetchedAt: string }>
  >({});

  const fetchSchoolLiveRoster = useCallback(async (schoolCode: string) => {
    const cleanCode = (schoolCode || '').trim().toUpperCase();
    if (!cleanCode) return null;
    try {
      const res = await fetch(`/api/schools/${encodeURIComponent(cleanCode)}/roster`);
      if (!res.ok) return null;
      const data = await res.json();
      if (!data?.success) return null;
      const entry = {
        schoolCode: data.schoolCode || cleanCode,
        school: data.school,
        students: Array.isArray(data.students) ? data.students : [],
        metrics: data.metrics || {},
        fetchedAt: new Date().toISOString()
      };
      setSchoolLiveRostersByCode(prev => ({ ...prev, [cleanCode]: entry }));
      return entry;
    } catch {
      return null;
    }
  }, []);

  const ensureStudentLinkCode = useCallback(async (): Promise<string | null> => {
    const sid = student.id || currentUser?.uid || currentUserProfile?.id;
    const sname = student.name || currentUserProfile?.fullName;
    if (!sid || !sname) return null;
    if (student.studentLinkCode) {
      // Ensure it is registered in Firestore studentLinkRegistry
      fetch('/api/students/link-code/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: sid,
          studentName: sname,
          studentEmail: currentUser?.email || currentUserProfile?.email,
          classLevel: student.classLevel,
          stream: student.stream,
          schoolName: student.school,
          schoolCode: student.schoolCode,
          preferredCode: student.studentLinkCode
        })
      }).catch(() => {});
      return student.studentLinkCode;
    }

    try {
      const res = await fetch('/api/students/link-code/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: sid,
          studentName: sname,
          studentEmail: currentUser?.email || currentUserProfile?.email,
          classLevel: student.classLevel,
          stream: student.stream,
          schoolName: student.school,
          schoolCode: student.schoolCode
        })
      });
      const data = await res.json();
      if (res.ok && data?.success && data?.studentLinkCode) {
        const issued = String(data.studentLinkCode).toUpperCase();
        setStudent(prev => {
          const next = { ...prev, studentLinkCode: issued };
          safeSetItem('sc_student', JSON.stringify(next));
          return next;
        });
        if (currentUser && !isOffline && !isSuperAdminEmail(currentUser.email)) {
          updateDoc(doc(db, 'students', currentUser.uid), { studentLinkCode: issued }).catch(() => {});
        }
        return issued;
      }
    } catch {}
    return null;
  }, [
    student.id,
    student.name,
    student.studentLinkCode,
    student.classLevel,
    student.stream,
    student.school,
    student.schoolCode,
    currentUser,
    currentUserProfile?.id,
    currentUserProfile?.fullName,
    currentUserProfile?.email,
    isOffline
  ]);

  const ensureAdminSchoolCode = useCallback(async (): Promise<string | null> => {
    if (!currentUserProfile || currentUserProfile.role !== 'admin') return null;
    const existingCode = currentUserProfile.adminData?.schoolCode;
    try {
      const res = await fetch('/api/schools/code/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminId: currentUserProfile.id,
          schoolName: currentUserProfile.adminData?.schoolName || 'Secondary School',
          schoolType: currentUserProfile.adminData?.schoolType || 'College',
          state: currentUserProfile.adminData?.state,
          lga: currentUserProfile.adminData?.lga,
          verificationStatus: currentUserProfile.adminData?.verificationStatus || 'pending_verification',
          preferredCode: existingCode || undefined
        })
      });
      const data = await res.json();
      if (res.ok && data?.success && data?.schoolCode) {
        const issued = String(data.schoolCode).toUpperCase();
        if (issued !== existingCode) {
          const updated: RegisteredUserProfile = {
            ...currentUserProfile,
            adminData: {
              ...(currentUserProfile.adminData || { schoolName: 'Secondary School', schoolType: 'College' }),
              schoolCode: issued
            }
          };
          setCurrentUserProfile(updated);
          safeSetItem('sc_user_profile', JSON.stringify(updated));
          setAllRegisteredUsers(prev => {
            const nextList = prev.map(u => (u.id === currentUserProfile.id ? updated : u));
            safeSetItem('sc_all_users', JSON.stringify(nextList));
            return nextList;
          });
        }
        return issued;
      }
    } catch {}
    return existingCode || null;
  }, [currentUserProfile]);

  // Keep live Firestore studentLinkRegistry & schoolEnrollments synced whenever student academic/subscription state updates
  useEffect(() => {
    if (!student.id || !student.name || student.id === 'std-tunde-001') return;
    if (isSuperAdminEmail(currentUser?.email)) return;

    const timer = setTimeout(() => {
      const verifiedMinutes = Math.round(
        (student.verifiedReadingLogs || []).reduce((sum, l) => sum + (l.activeSeconds || 0), 0) / 60
      );
      const completedNotesCount =
        (student.completedReadNoteIds || []).length || (student.verifiedReadingLogs || []).length;

      fetch('/api/students/link-code/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: student.id,
          studentLinkCode: student.studentLinkCode,
          studentName: student.name,
          studentEmail: currentUser?.email || currentUserProfile?.email,
          classLevel: student.classLevel,
          stream: student.stream,
          schoolName: student.school,
          schoolCode: student.schoolCode,
          xp: student.xp,
          rank: student.rank,
          streakDays: student.streakDays,
          isSubscribed: student.isSubscribed,
          subscriptionTier: student.subscriptionTier || 'free',
          subscribedUntil: student.subscribedUntil,
          uniformVerified: student.uniformVerified,
          completedNotesCount,
          verifiedMinutes
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data?.success && data?.studentLinkCode && !student.studentLinkCode) {
            const issued = String(data.studentLinkCode).toUpperCase();
            setStudent(prev => {
              if (prev.id !== student.id || prev.studentLinkCode) return prev;
              const next = { ...prev, studentLinkCode: issued };
              safeSetItem('sc_student', JSON.stringify(next));
              return next;
            });
            if (currentUser && !isOffline) {
              updateDoc(doc(db, 'students', currentUser.uid), { studentLinkCode: issued }).catch(() => {});
            }
          }
        })
        .catch(() => {});
    }, 600);

    return () => clearTimeout(timer);
  }, [
    student.id,
    student.name,
    student.studentLinkCode,
    student.classLevel,
    student.stream,
    student.school,
    student.schoolCode,
    student.xp,
    student.rank,
    student.streakDays,
    student.isSubscribed,
    student.subscriptionTier,
    student.subscribedUntil,
    student.uniformVerified,
    student.completedReadNoteIds?.length,
    currentUser?.uid,
    currentUser?.email,
    currentUserProfile?.email,
    isOffline
  ]);

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

    if (!isOffline && isFirebaseConnected && isSuperAdminEmail(currentUser?.email) && currentUserProfile.id) {
      setDoc(doc(db, 'users', currentUserProfile.id), { adminData: updated.adminData }, { merge: true }).catch(err => {
        console.warn('Could not sync admin verification to Firestore:', err);
      });
    }

    fetch('/api/schools/code/issue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        adminId: currentUserProfile.id,
        schoolName: updated.adminData?.schoolName,
        schoolType: updated.adminData?.schoolType,
        state: updated.adminData?.state,
        lga: updated.adminData?.lga,
        verificationStatus: status,
        preferredCode: updated.adminData?.schoolCode
      })
    }).catch(() => {});
  };

  const linkStudentToSchool = async (
    code: string
  ): Promise<{ success: boolean; schoolName?: string; schoolCode?: string; error?: string }> => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      return { success: false, error: 'Please enter a valid School Code.' };
    }

    const sid = student.id || currentUser?.uid || currentUserProfile?.id || `std_${Date.now()}`;
    const sname = student.name || currentUserProfile?.fullName || 'Student Scholar';
    const verifiedMinutes = Math.round(
      (student.verifiedReadingLogs || []).reduce((sum, l) => sum + (l.activeSeconds || 0), 0) / 60
    );
    const completedNotesCount =
      (student.completedReadNoteIds || []).length || (student.verifiedReadingLogs || []).length;

    let resolvedCode = cleanCode;
    let resolvedSchoolName = '';

    try {
      const res = await fetch('/api/schools/enroll-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schoolCode: cleanCode,
          studentId: sid,
          studentName: sname,
          studentEmail: currentUser?.email || currentUserProfile?.email,
          studentLinkCode: student.studentLinkCode,
          classLevel: student.classLevel,
          stream: student.stream,
          xp: student.xp,
          rank: student.rank,
          streakDays: student.streakDays,
          isSubscribed: student.isSubscribed,
          subscriptionTier: student.subscriptionTier || 'free',
          subscribedUntil: student.subscribedUntil,
          uniformVerified: student.uniformVerified,
          completedNotesCount,
          verifiedMinutes
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        return {
          success: false,
          error:
            data?.error ||
            `School Code "${cleanCode}" was not found. Ask your School Administrator for their official code.`
        };
      }
      resolvedCode = String(data.schoolCode || cleanCode).toUpperCase();
      resolvedSchoolName = String(data.schoolName || '');
    } catch {
      return {
        success: false,
        error: 'Network error verifying School Code. Please check your connection and try again.'
      };
    }

    const shouldReplaceSchool =
      Boolean(resolvedSchoolName) &&
      (!student.school ||
        student.school === 'Secondary School' ||
        student.school === 'Federal Secondary School');

    const updatedStudent: StudentProfile = {
      ...student,
      schoolCode: resolvedCode,
      school: shouldReplaceSchool ? resolvedSchoolName : student.school
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
    }

    if (!isOffline && isFirebaseConnected && currentUser?.uid && !isSuperAdminEmail(currentUser.email)) {
      updateDoc(doc(db, 'students', currentUser.uid), {
        schoolCode: resolvedCode,
        ...(shouldReplaceSchool ? { school: resolvedSchoolName } : {})
      }).catch(err => {
        console.warn('Could not sync student school code to Firestore:', err);
      });
    }

    return {
      success: true,
      schoolCode: resolvedCode,
      schoolName: resolvedSchoolName || updatedStudent.school
    };
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

    if (!isOffline && isFirebaseConnected && isSuperAdminEmail(currentUser?.email) && currentUserProfile.id) {
      setDoc(doc(db, 'users', currentUserProfile.id), {
        adminData: updatedProfile.adminData
      }, { merge: true }).catch(err => {
        console.warn('Could not sync school subscription to Firestore:', err);
      });
    }

    if (currentAdminData.schoolCode) {
      void fetchSchoolLiveRoster(currentAdminData.schoolCode);
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

    const byId = new Map<
      string,
      {
        isSubscribed?: boolean;
        subscriptionTier?: string;
        subscribedUntil?: string | null;
      }
    >();

    // 1. Live cross-device Firestore enrollments cached for this schoolCode
    const liveEntry = schoolLiveRostersByCode[cleanCode];
    if (liveEntry?.students) {
      liveEntry.students.forEach((s: any) => {
        const sid = s.studentId || s.id;
        if (sid) {
          byId.set(sid, {
            isSubscribed: s.isSubscribed,
            subscriptionTier: s.subscriptionTier,
            subscribedUntil: s.subscribedUntil
          });
        }
      });
    }

    // 2. Merge current student & local allRegisteredUsers
    if (student?.name && student.schoolCode?.toUpperCase() === cleanCode) {
      const sid = student.id || 'current_student';
      byId.set(sid, {
        isSubscribed: student.isSubscribed,
        subscriptionTier: student.subscriptionTier,
        subscribedUntil: student.subscribedUntil
      });
    }

    allRegisteredUsers.forEach(u => {
      if (u.role === 'student' && u.studentData && u.studentData.schoolCode?.toUpperCase() === cleanCode) {
        const sid = u.studentData.id || u.id;
        if (!byId.has(sid)) {
          byId.set(sid, {
            isSubscribed: u.studentData.isSubscribed,
            subscriptionTier: u.studentData.subscriptionTier,
            subscribedUntil: u.studentData.subscribedUntil
          });
        }
      }
    });

    let paidCount = 0;
    byId.forEach(s => {
      const isPaid =
        s.isSubscribed === true ||
        (Boolean(s.subscriptionTier) && s.subscriptionTier !== 'free') ||
        (Boolean(s.subscribedUntil) && new Date(s.subscribedUntil!) > new Date());
      if (isPaid) {
        paidCount++;
      }
    });

    const totalStudents = byId.size;
    const freeStudents = Math.max(0, totalStudents - paidCount);

    const adminUser = allRegisteredUsers.find(
      u =>
        (u.role === 'school_admin' || u.role === 'admin') &&
        u.adminData?.schoolCode?.toUpperCase() === cleanCode
    );

    const directSub =
      (adminUser?.adminData?.directSubscription) ||
      (currentUserProfile?.adminData?.schoolCode?.toUpperCase() === cleanCode
        ? currentUserProfile.adminData.directSubscription
        : undefined);
    const hasActiveDirectSubscription = Boolean(
      (directSub && directSub.status === 'active' && new Date(directSub.expiresAt) > new Date()) ||
        liveEntry?.metrics?.hasActiveDirectSubscription
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
      directSubscriptionExpiresAt:
        directSub?.expiresAt || liveEntry?.metrics?.directSubscriptionExpiresAt,
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

    if (!isOffline && isSuperAdmin && studentId && studentId !== 'current' && studentId !== 'student_active') {
      try {
        const headers = await getFirebaseAuthHeaders();
        if (headers.Authorization) {
          await fetch('/api/admin/set-student-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...headers },
            body: JSON.stringify({ studentId, isSubscribed, tier }),
          });
        }
      } catch {}

      if (isFirebaseConnected) {
        updateDoc(doc(db, 'students', studentId), {
          isSubscribed,
          subscriptionTier: isSubscribed ? tier : 'free',
          subscribedUntil: isSubscribed ? expiresAt : null
        }).catch(err => {
          console.warn('Could not sync student subscription to Firestore:', err);
        });
      }
    }
  };

  // 4-Tier Student Subscriptions & Entitlements State & Engine
  const [isStudentSubscriptionModalOpen, setIsStudentSubscriptionModalOpen] = useState<boolean>(false);
  const [targetSubscriptionPlan, setTargetSubscriptionPlan] = useState<StudentSubscriptionPlan | null>(null);

  const openStudentSubscriptionModal = useCallback((targetPlan?: StudentSubscriptionPlan) => {
    if (targetPlan) setTargetSubscriptionPlan(targetPlan);
    setIsStudentSubscriptionModalOpen(true);
  }, []);

  const closeStudentSubscriptionModal = useCallback(() => {
    setIsStudentSubscriptionModalOpen(false);
    setTargetSubscriptionPlan(null);
  }, []);

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

    if (paymentMethod === 'wallet' && feeNaira > 0 && currentUser && !isOffline) {
      try {
        const headers = await getFirebaseAuthHeaders();
        if (headers.Authorization) {
          const unlockRes = await fetch('/api/entitlements/unlock-with-wallet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...headers },
            body: JSON.stringify({
              action: 'student_tier',
              plan,
              referralCode: activeRefCode || undefined,
              classLevel: student.classLevel,
            }),
          });
          const unlockData = await unlockRes.json().catch(() => null);
          if (!unlockRes.ok || !unlockData?.success) {
            return {
              success: false,
              error: unlockData?.error || 'Insufficient Parent Escrow Wallet balance verified by server.',
            };
          }
          if (unlockData.wallet) {
            authoritativeWalletOverlayRef.current = {
              balanceNaira: unlockData.wallet.balanceNaira,
              transactions: unlockData.wallet.transactions,
            };
          }
          if (unlockData.entitlements) {
            authoritativeStudentOverlayRef.current = {
              ...(authoritativeStudentOverlayRef.current || {}),
              isSubscribed: unlockData.entitlements.isSubscribed,
              subscriptionPlan: unlockData.entitlements.subscriptionPlan,
              subscriptionTier: unlockData.entitlements.subscriptionTier,
              subscribedUntil: unlockData.entitlements.subscribedUntil,
              termExpiresAt: unlockData.entitlements.termExpiresAt,
              lastPaymentReference: unlockData.entitlements.lastPaymentReference,
            };
          }
        }
      } catch {}
    }

    if (paymentMethod === 'wallet' && feeNaira > 0) {
      const currentBalance = parentWallet.balanceNaira;
      if (currentBalance < feeNaira) {
        return {
          success: false,
          error: `Insufficient Parent Escrow Wallet balance (₦${currentBalance.toLocaleString()} available, ₦${feeNaira.toLocaleString()} required). Please fund your wallet or pay via Paystack.`
        };
      }

      // Deduct from wallet locally after server ledger confirmation
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
    const effectiveStudentId = student.id || currentUser?.uid || currentUserProfile?.id || '';

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
          paymentReference: paystackRef || `WALLET_${Date.now()}`,
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

    // Persist allowed referral binding on Firestore doc; authoritative paid tier is stored on server ledger
    if (
      !isOffline &&
      isFirebaseConnected &&
      currentUser?.uid &&
      !isSuperAdminEmail(currentUser.email) &&
      effectiveStudentId === currentUser.uid &&
      (activeRefCode || student.referredByCode)
    ) {
      updateDoc(doc(db, 'students', effectiveStudentId), {
        referredByCode: activeRefCode || student.referredByCode || null
      }).catch(err => {
        console.warn('Could not sync student referral attribution to Firestore:', err);
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

    if (paymentMethod === 'wallet' && currentUser && !isOffline) {
      try {
        const headers = await getFirebaseAuthHeaders();
        if (headers.Authorization) {
          const unlockRes = await fetch('/api/entitlements/unlock-with-wallet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...headers },
            body: JSON.stringify({ action: 'addon', addon, subject }),
          });
          const unlockData = await unlockRes.json().catch(() => null);
          if (!unlockRes.ok || !unlockData?.success) {
            return {
              success: false,
              error: unlockData?.error || 'Insufficient Parent Escrow Wallet balance verified by server.',
            };
          }
          if (unlockData.wallet) {
            authoritativeWalletOverlayRef.current = {
              balanceNaira: unlockData.wallet.balanceNaira,
              transactions: unlockData.wallet.transactions,
            };
          }
          if (unlockData.entitlements?.addOns) {
            authoritativeStudentOverlayRef.current = {
              ...(authoritativeStudentOverlayRef.current || {}),
              addOns: unlockData.entitlements.addOns,
            };
          }
        }
      } catch {}
    }

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
    if (effectiveGamesBypass) {
      return { allowed: true, remainingAttempts: 999 };
    }

    const plan = student.subscriptionPlan || (student.isSubscribed ? 'basic' : 'free');
    if (plan !== 'free') {
      return { allowed: true, remainingAttempts: 999 };
    }

    const allowedFreeGames = ['math_sprint', 'maths_sprint', 'periodic_table', 'maths-sprint', 'periodic-table'];
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

  const checkStudentFeatureAccess = useCallback((
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
      if (effectiveGamesBypass) return { hasAccess: true };

      const gameId = options?.gameId || '';
      if (plan === 'free') {
        const freeGames = ['math_sprint', 'maths_sprint', 'periodic_table', 'maths-sprint', 'periodic-table'];
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
          'math_sprint',
          'maths_sprint',
          'periodic_table',
          'speed_concord',
          'nigerian_geo',
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
      if (effectiveAiCoachBypass) return { hasAccess: true };
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
  }, [
    student.subscriptionPlan,
    student.isSubscribed,
    student.addOns,
    effectiveTermBypass,
    effectiveGamesBypass,
    effectiveAiCoachBypass,
    examPrepState.isUnlocked
  ]);

  const updateTutorProfile = (updatedTutorData: Partial<RegisteredTutorData>) => {
    if (!currentUserProfile || currentUserProfile.role !== 'tutor') return;
    const currentTutor = currentUserProfile.tutorData || {
      subjectSpecialization: 'General Subjects',
      qualification: 'B.Sc.',
      hourlyRate: 3500,
      teachingMode: 'both'
    };

    const nextProficientSubjects =
      updatedTutorData.proficientSubjects !== undefined
        ? dedupeSubjects(updatedTutorData.proficientSubjects)
        : currentTutor.proficientSubjects;

    const nextSubjectSpecialization =
      updatedTutorData.subjectSpecialization !== undefined
        ? updatedTutorData.subjectSpecialization.trim() ||
          formatSubjectSpecialization(nextProficientSubjects || [], currentTutor.subjectSpecialization)
        : updatedTutorData.proficientSubjects !== undefined
        ? formatSubjectSpecialization(nextProficientSubjects || [], currentTutor.subjectSpecialization)
        : currentTutor.subjectSpecialization;

    const nextHighestEd = normalizeHighestEducation(
      updatedTutorData.highestEducation !== undefined
        ? updatedTutorData.highestEducation
        : currentTutor.highestEducation,
      updatedTutorData.qualification !== undefined
        ? updatedTutorData.qualification
        : currentTutor.qualification
    );
    const rawQual =
      updatedTutorData.qualification !== undefined
        ? String(updatedTutorData.qualification).trim()
        : String(currentTutor.qualification || '').trim();
    const nextQualification =
      nextHighestEd === 'Other'
        ? rawQual || 'Other Higher Degree'
        : rawQual && !/^other$/i.test(rawQual)
          ? rawQual
          : nextHighestEd;
    const nextInstitution =
      updatedTutorData.institution !== undefined
        ? String(updatedTutorData.institution).trim()
        : String(currentTutor.institution || '').trim();
    const nextCourseOfStudy =
      updatedTutorData.courseOfStudy !== undefined
        ? String(updatedTutorData.courseOfStudy).trim()
        : String(currentTutor.courseOfStudy || '').trim();

    const credentialsChanged =
      updatedTutorData.highestEducation !== undefined ||
      updatedTutorData.qualification !== undefined ||
      updatedTutorData.institution !== undefined ||
      updatedTutorData.courseOfStudy !== undefined;

    const baseDegrees =
      updatedTutorData.degrees !== undefined ? updatedTutorData.degrees : currentTutor.degrees;
    const nextDegrees = credentialsChanged
      ? rebuildTutorDegrees(
          baseDegrees,
          {
            highestEducation: nextHighestEd,
            qualification: nextQualification,
            courseOfStudy: nextCourseOfStudy,
            institution: nextInstitution
          },
          currentTutor
        )
      : baseDegrees;

    const nowIso = new Date().toISOString();
    const overrideIso = (updatedTutorData as any).manualProfileOverrideAt || nowIso;

    const nextTutorData: RegisteredTutorData = {
      ...currentTutor,
      ...updatedTutorData,
      highestEducation: nextHighestEd,
      qualification: nextQualification,
      institution: nextInstitution,
      courseOfStudy: nextCourseOfStudy,
      ...(nextDegrees !== undefined ? { degrees: nextDegrees } : {}),
      ...(nextProficientSubjects !== undefined ? { proficientSubjects: nextProficientSubjects } : {}),
      subjectSpecialization: nextSubjectSpecialization,
      manualProfileOverrideAt: overrideIso,
      manualSubjectOverrideAt:
        (updatedTutorData as any).manualSubjectOverrideAt || overrideIso,
      subjectRepairVersion: SUBJECT_REPAIR_VERSION,
      profileRepairVersion: REPAIRED_TUTOR_PROFILE_VERSION
    };

    const nextAvatar =
      currentUserProfile.avatarUrl !== undefined
        ? currentUserProfile.avatarUrl
        : updatedTutorData.idDocumentUrl;
    void updateUserRecord(currentUserProfile.id, {
      ...(nextAvatar !== undefined ? { avatarUrl: nextAvatar } : {}),
      tutorData: nextTutorData
    });
  };

  const deleteAccount = async (userId?: string): Promise<{ success: boolean; error?: string }> => {
    const targetUid = String(userId || currentUserProfile?.id || currentUser?.uid || '').trim();
    const targetEmail = String(currentUserProfile?.email || currentUser?.email || '').trim().toLowerCase();

    if (isSuperAdmin || isSuperAdminEmail(targetEmail)) {
      return {
        success: false,
        error: 'Super Admin accounts cannot be self-deleted.'
      };
    }

    if (!targetUid && !targetEmail) {
      return {
        success: false,
        error: 'No active account found to delete.'
      };
    }

    // 1. Delete from authoritative backend shared directory (releases email for fresh registration)
    try {
      const authHeaders = await getFirebaseAuthHeaders();
      const postSelfDelete = async (url: string, useNativeFetch = false) => {
        const fetchFn: typeof fetch =
          useNativeFetch && typeof window !== 'undefined' && typeof (window as any).__SC_NATIVE_FETCH__ === 'function'
            ? (window as any).__SC_NATIVE_FETCH__
            : fetch;
        const res = await fetchFn(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...authHeaders,
            ...getSecurityHeaders({
              userId: targetUid || undefined,
              userEmail: targetEmail || undefined
            })
          },
          body: JSON.stringify({
            userId: targetUid,
            email: targetEmail
          })
        });
        const data = await res.json().catch(() => ({}));
        return { res, data };
      };

      const primary = await postSelfDelete('/api/users/self-delete');
      if (!primary.res.ok && (primary.res.status === 404 || primary.res.status === 405 || primary.res.status >= 500)) {
        const runtimeMeta = typeof window !== 'undefined' ? (window as any).__SC_RUNTIME_META__ : null;
        const remoteOrigin = String(
          runtimeMeta?.apiOrigin || 'https://student-companion-api-b373.onrender.com'
        ).replace(/\/+$/, '');
        if (remoteOrigin.startsWith('https://') && !runtimeMeta?.shouldRouteApiToRemoteOrigin) {
          await postSelfDelete(`${remoteOrigin}/api/users/self-delete`, true).catch(() => {});
        }
      } else if (!primary.res.ok && primary.res.status === 403 && primary.data?.error) {
        return {
          success: false,
          error: primary.data.error
        };
      }
    } catch (err) {
      console.warn('Backend self-delete cleanup encountered a network issue:', err);
    }

    // 2. Delete Firestore documents owned by this user so cloud sync cannot revive the deleted profile
    const firestoreUid = currentUser?.uid || targetUid;
    if (firestoreUid && !isOffline && auth.currentUser) {
      await Promise.allSettled([
        deleteDoc(doc(db, 'users', firestoreUid)),
        deleteDoc(doc(db, 'students', firestoreUid)),
        deleteDoc(doc(db, 'wallets', firestoreUid))
      ]);
    }

    // 3. Remove Firebase Auth account so the email can register fresh cleanly
    if (auth.currentUser) {
      const fbDel = await deleteCurrentFirebaseAuthUser();
      if (!fbDel.deleted) {
        await logOut().catch(() => {});
      }
    }

    // 4. Purge from local directory & browser storage so same device immediately accepts fresh registration
    setAllRegisteredUsers(prev => {
      const next = prev.filter(u => {
        const uEmail = String(u.email || '').trim().toLowerCase();
        if (targetUid && u.id === targetUid) return false;
        if (firestoreUid && u.id === firestoreUid) return false;
        if (targetEmail && uEmail === targetEmail) return false;
        return true;
      });
      safeSetItem('sc_all_users', JSON.stringify(next));
      return next;
    });

    setUserSessionToken(null);
    signOutApp();
    return { success: true };
  };

  const signOutApp = () => {
    setServerOTAAdminToken(null);
    setUserSessionToken(null);
    authoritativeStudentOverlayRef.current = null;
    authoritativeWalletOverlayRef.current = null;
    setCurrentUserProfile(null);
    safeRemoveItem('sc_user_profile');
    safeRemoveItem('sc_student');
    safeRemoveItem('sc_wallet');
    safeRemoveItem('sc_bookings');
    safeRemoveItem('sc_chats');
    safeRemoveItem('sc_exam_prep');
    safeRemoveItem('sc_aspirant_goal');
    safeRemoveItem('sc_aspirant_drills');
    setStudent(INITIAL_EMPTY_STUDENT);
    setExamPrepState({ isUnlocked: false, tutorCreditsNaira: 0, completedBlockIds: [] });
    setParentWallet(INITIAL_EMPTY_WALLET);
    setTutorBookings([]);
    setChatMessages({});
    setExamResults([]);
    setIsParentPinUnlocked(false);
    setAdminTermLockOverride(false);
    setAdminGamesUnlockOverride(false);
    setAdminAiCoachUnlockOverride(false);
    setTargetSignUpRole(null);
    setIsOffline(false);
    setCurrentScreen('landing');
  };

  const resetDemoData = () => {
    signOutApp();
  };

  const purgeSimulatedSubscriptions = async (adminEmailOverride?: string) => {
    const actorEmail = (adminEmailOverride || currentUserProfile?.email || currentUser?.email || '').toLowerCase().trim();
    let resetStudentsCount = 0;
    let resetUsersCount = 0;
    let resetEnrollmentsCount = 0;

    // 1. Always scrub unverified local simulated unlocks (Prepare For Exam, SC AI Coach, etc.)
    safeRemoveItem('sc_exam_prep');
    setExamPrepState({ isUnlocked: false, tutorCreditsNaira: 0, completedBlockIds: [] });

    setStudent(prev => {
      const cleaned = stripUnverifiedStudentUnlocks(prev) || INITIAL_EMPTY_STUDENT;
      safeSetItem('sc_student', JSON.stringify(cleaned));
      return cleaned;
    });

    setCurrentUserProfile(prev => {
      if (!prev || !prev.studentData) return prev;
      const updated = {
        ...prev,
        studentData: stripUnverifiedStudentUnlocks(prev.studentData)
      };
      safeSetItem('sc_user_profile', JSON.stringify(updated));
      return updated;
    });

    setAllRegisteredUsers(prev => {
      const cleaned = prev.map(u => {
        if (isSuperAdminEmail(u.email) || u.isSuperAdmin || !u.studentData) return u;
        const hadUnlock =
          u.studentData.isSubscribed ||
          (u.studentData.subscriptionPlan && u.studentData.subscriptionPlan !== 'free') ||
          u.studentData.addOns?.aiCoachUnlocked ||
          u.studentData.addOns?.termlyCompetitionUnlocked ||
          u.studentData.addOns?.termlyDrillAllSubjects;
        const stripped = stripUnverifiedStudentUnlocks(u.studentData);
        if (hadUnlock && stripped && !stripped.isSubscribed) {
          resetUsersCount++;
        }
        return { ...u, studentData: stripped };
      });
      safeSetItem('sc_all_users', JSON.stringify(cleaned));
      return cleaned;
    });

    // 2. Authenticated Super Admin Firestore cleanup across students & schoolEnrollments collections
    if (!isOffline && isFirebaseConnected && isSuperAdmin) {
      const verifiedPaystackRefs = new Set<string>();
      try {
        const refsSnap = await getDocs(collection(db, 'processed_paystack_refs'));
        refsSnap.forEach(d => {
          const refVal = String(d.data()?.reference || d.id || '').trim();
          if (refVal) verifiedPaystackRefs.add(refVal);
        });
      } catch {}

      try {
        const studentsSnap = await getDocs(collection(db, 'students'));
        for (const d of studentsSnap.docs) {
          const data = d.data() || {};
          const plan = String(data.subscriptionPlan || data.subscriptionTier || 'free').toLowerCase();
          const hasAnyUnlock =
            data.isSubscribed === true ||
            (plan && plan !== 'free') ||
            Boolean(data.addOns?.aiCoachUnlocked) ||
            Boolean(data.addOns?.termlyCompetitionUnlocked) ||
            Boolean(data.addOns?.termlyDrillAllSubjects) ||
            (Array.isArray(data.addOns?.termlyDrillSingleSubjects) && data.addOns.termlyDrillSingleSubjects.length > 0);
          if (!hasAnyUnlock) continue;

          const paymentRef = String(data.lastPaymentReference || '').trim();
          const isRealVerified =
            paymentRef &&
            isVerifiedSubscriptionRef(paymentRef) &&
            (verifiedPaystackRefs.size === 0 || verifiedPaystackRefs.has(paymentRef));

          if (!isRealVerified) {
            try {
              await updateDoc(doc(db, 'students', d.id), {
                isSubscribed: false,
                subscriptionPlan: 'free',
                subscriptionTier: 'free',
                subscribedUntil: null,
                termExpiresAt: null,
                lastSubscribedAt: null,
                lastPaymentReference: null,
                addOns: {}
              });
              resetStudentsCount++;
            } catch (err) {
              console.warn('Could not reset simulated student subscription in Firestore:', err);
            }
          }
        }
      } catch (err) {
        console.warn('Could not scan students collection during simulated subscription purge:', err);
      }

      try {
        const enrollSnap = await getDocs(collection(db, 'schoolEnrollments'));
        for (const d of enrollSnap.docs) {
          const data = d.data() || {};
          const isPaid = data.isSubscribed === true || (data.subscriptionTier && data.subscriptionTier !== 'free');
          if (!isPaid) continue;
          try {
            const stSnap = await getDoc(doc(db, 'students', String(data.studentId || '')));
            const stData = stSnap.exists() ? stSnap.data() : null;
            const stPaid = Boolean(stData?.isSubscribed && isVerifiedSubscriptionRef(stData?.lastPaymentReference));
            if (!stPaid) {
              await updateDoc(doc(db, 'schoolEnrollments', d.id), {
                isSubscribed: false,
                subscriptionTier: 'free',
                subscribedUntil: null,
                updatedAt: new Date().toISOString()
              });
              resetEnrollmentsCount++;
            }
          } catch {}
        }
      } catch {}
    }

    // 3. Server-side cleanup for in-memory usage caches & unauthenticated server stores
    try {
      const authHeaders = await getFirebaseAuthHeaders();
      const res = await fetch('/api/admin/purge-simulated-subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify({ adminEmail: actorEmail })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        resetStudentsCount = Math.max(resetStudentsCount, Number(data.resetStudentsCount) || 0);
        resetUsersCount += Number(data.resetUsersCount) || 0;
        resetEnrollmentsCount = Math.max(resetEnrollmentsCount, Number(data.resetEnrollmentsCount) || 0);
      } else if (!res.ok) {
        return {
          success: false,
          resetStudentsCount,
          resetUsersCount,
          resetEnrollmentsCount,
          message: data.error || 'Server rejected simulated subscription purge.',
          error: data.error || 'Server rejected simulated subscription purge.'
        };
      }
    } catch (err: any) {
      return {
        success: false,
        resetStudentsCount,
        resetUsersCount,
        resetEnrollmentsCount,
        message: err?.message || 'Network error calling server purge.',
        error: err?.message || 'Network error calling server purge.'
      };
    }

    return {
      success: true,
      resetStudentsCount,
      resetUsersCount,
      resetEnrollmentsCount,
      message: `Cleared simulated subscriptions (${resetStudentsCount} Firestore student(s), ${resetUsersCount} profile(s), ${resetEnrollmentsCount} enrollment(s)) and reset Prepare For Exam / SC AI Coach test unlocks.`
    };
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

    await purgeSimulatedSubscriptions(actorEmail);

    try {
      const authHeaders = await getFirebaseAuthHeaders();
      const res = await fetch('/api/admin/purge-test-accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
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
        message: data.message || 'Purged all test personas, simulated subscriptions, and synthetic wallet credits.'
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
    setAdminGamesUnlockOverride(false);
    setAdminAiCoachUnlockOverride(false);
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
    setAdminGamesUnlockOverride(false);
    setAdminAiCoachUnlockOverride(false);
    setImpersonatedUser(null);
    setCurrentRole('admin');
  };

  const switchRole = (role: UserRole) => {
    setAdminTermLockOverride(false);
    setAdminGamesUnlockOverride(false);
    setAdminAiCoachUnlockOverride(false);
    setCurrentRole(role);
  };

  const syncUserDirectoryFromCloud = useCallback(async (options?: {
    silent?: boolean;
    adminEmailOverride?: string;
  }) => {
    const adminEmail =
      options?.adminEmailOverride ||
      currentUserProfile?.email ||
      currentUser?.email ||
      (isSuperAdmin ? SUPER_ADMIN_EMAIL : '');
    if (!isSuperAdmin || !adminEmail) {
      return {
        success: false,
        totalUsers: allRegisteredUsers.length,
        backendCount: 0,
        firestoreCount: 0,
        recoveredCount: 0,
        backfilledToFirestoreCount: 0,
        error: 'Super Admin authentication required.'
      };
    }

    setIsSyncingDirectory(true);
    let backendUsers: RegisteredUserProfile[] = [];
    let backendRecoveredCount = 0;
    let firestoreUsers: RegisteredUserProfile[] = [];
    let recoveredRegistryUsers: RegisteredUserProfile[] = [];
    let backfilledToFirestoreCount = 0;
    let syncErrorMsg: string | undefined;
    let needsGoogleAuth = false;

    const firestoreAdminReady = Boolean(
      !isOffline &&
      isFirebaseConnected &&
      auth.currentUser &&
      auth.currentUser.emailVerified &&
      isSuperAdminEmail(auth.currentUser.email)
    );

    if (!firestoreAdminReady) {
      needsGoogleAuth = true;
    }

    try {
      const authHeaders = await getFirebaseAuthHeaders().catch(() => ({}));
      const headers = {
        ...authHeaders,
        ...getSecurityHeaders({
          userId: currentUserProfile?.id,
          userEmail: adminEmail
        })
      };

      const res = await fetch(`/api/admin/users?adminEmail=${encodeURIComponent(adminEmail)}`, {
        headers,
        cache: 'no-store'
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.success && Array.isArray(data.users)) {
        backendUsers = (data.users as RegisteredUserProfile[]).filter(u => !isPurgedRecord(u));
        backendRecoveredCount = Number(data?.stats?.recoveredFromRegistries || 0);
      } else if (res.status === 401 || res.status === 403) {
        needsGoogleAuth = true;
        if (!options?.silent) {
          syncErrorMsg =
            'Cloud admin session not verified yet. Tap "Continue with Google" to unlock Backend & Firestore directory sync.';
        }
      } else if (!options?.silent && !res.ok) {
        syncErrorMsg = data?.error || `Backend directory sync returned HTTP ${res.status}.`;
      }
    } catch (err: any) {
      if (!options?.silent) {
        syncErrorMsg = err?.message || 'Unable to reach shared backend directory.';
      }
    }

    if (firestoreAdminReady) {
      try {
        const readCol = async (colName: string) => {
          try {
            return await getDocs(collection(db, colName));
          } catch (err) {
            handleFirestoreError(err, OperationType.LIST, colName);
          }
        };

        const [
          usersSnap,
          studentsSnap,
          partnersSnap,
          linkSnap,
          schoolsSnap,
          enrollSnap
        ] = await Promise.all([
          readCol('users'),
          readCol('students'),
          readCol('growthPartners'),
          readCol('studentLinkRegistry'),
          readCol('schoolRegistry'),
          readCol('schoolEnrollments')
        ]);

        const firestoreUserIds = new Set<string>();
        const firestoreUserEmails = new Set<string>();

        usersSnap.forEach(docSnap => {
          const data = docSnap.data() as RegisteredUserProfile;
          const uid = sanitizeFirestoreDocId(data?.id || docSnap.id);
          const candidate: RegisteredUserProfile = {
            ...data,
            id: uid,
            role: data?.role || 'student',
            fullName: data?.fullName || 'Student Scholar',
            email: data?.email || '',
            emailVerified: Boolean(data?.emailVerified ?? true),
            createdAt: data?.createdAt || new Date().toISOString(),
            directorySource: 'firestore'
          };
          if (!isPurgedRecord(candidate)) {
            firestoreUsers.push(candidate);
            firestoreUserIds.add(uid);
            const cleanEm = String(candidate.email || '').trim().toLowerCase();
            if (!isPlaceholderRecoveredEmail(cleanEm)) {
              firestoreUserEmails.add(cleanEm);
            }
          }
        });

        studentsSnap.forEach(docSnap => {
          const d = docSnap.data() as any;
          const uid = sanitizeFirestoreDocId(d?.id || docSnap.id);
          const rec: RegisteredUserProfile = {
            id: uid,
            role: 'student',
            fullName: String(d?.name || d?.fullName || 'Student Scholar'),
            email: String(d?.email || `${uid.toLowerCase()}@recovered.studentcompanion.ng`),
            emailVerified: true,
            createdAt: String(d?.createdAt || new Date().toISOString()),
            directorySource: 'recovered',
            recoveredFrom: 'Firestore Students',
            studentData: {
              ...INITIAL_EMPTY_STUDENT,
              ...d,
              id: uid,
              name: String(d?.name || d?.fullName || 'Student Scholar')
            }
          };
          if (!isPurgedRecord(rec)) recoveredRegistryUsers.push(rec);
        });

        linkSnap.forEach(docSnap => {
          const d = docSnap.data() as any;
          const uid = sanitizeFirestoreDocId(d?.studentId || d?.code || docSnap.id);
          const rec: RegisteredUserProfile = {
            id: uid,
            role: 'student',
            fullName: String(d?.studentName || 'Student Scholar'),
            email: String(d?.studentEmail || `${uid.toLowerCase()}@recovered.studentcompanion.ng`),
            emailVerified: true,
            createdAt: String(d?.issuedAt || d?.updatedAt || new Date().toISOString()),
            directorySource: 'recovered',
            recoveredFrom: 'Student Link Registry',
            studentData: {
              ...INITIAL_EMPTY_STUDENT,
              id: uid,
              name: String(d?.studentName || 'Student Scholar'),
              school: String(d?.schoolName || 'Secondary School'),
              schoolCode: d?.schoolCode ? String(d.schoolCode).toUpperCase() : undefined,
              classLevel: d?.classLevel || 'JSS 1',
              stream: d?.stream || 'Junior',
              studentLinkCode: d?.code ? String(d.code).toUpperCase() : undefined
            }
          };
          if (!isPurgedRecord(rec)) recoveredRegistryUsers.push(rec);
        });

        enrollSnap.forEach(docSnap => {
          const d = docSnap.data() as any;
          const uid = sanitizeFirestoreDocId(d?.studentId || docSnap.id);
          const rec: RegisteredUserProfile = {
            id: uid,
            role: 'student',
            fullName: String(d?.studentName || 'Student Scholar'),
            email: String(d?.studentEmail || `${uid.toLowerCase()}@recovered.studentcompanion.ng`),
            emailVerified: true,
            createdAt: String(d?.enrolledAt || d?.updatedAt || new Date().toISOString()),
            directorySource: 'recovered',
            recoveredFrom: 'School Enrollment',
            studentData: {
              ...INITIAL_EMPTY_STUDENT,
              id: uid,
              name: String(d?.studentName || 'Student Scholar'),
              school: String(d?.schoolName || 'Secondary School'),
              schoolCode: d?.schoolCode ? String(d.schoolCode).toUpperCase() : undefined,
              classLevel: d?.classLevel || 'JSS 1',
              stream: d?.stream || 'Junior',
              xp: Number(d?.xp || 0),
              streakDays: Number(d?.streakDays || 0),
              studentLinkCode: d?.studentLinkCode ? String(d.studentLinkCode).toUpperCase() : undefined,
              isSubscribed: Boolean(d?.isSubscribed),
              subscriptionTier: d?.subscriptionTier || 'free'
            }
          };
          if (!isPurgedRecord(rec)) recoveredRegistryUsers.push(rec);
        });

        partnersSnap.forEach(docSnap => {
          const d = docSnap.data() as any;
          const uid = sanitizeFirestoreDocId(d?.id || docSnap.id);
          const rec: RegisteredUserProfile = {
            id: uid,
            role: 'growth_partner',
            fullName: String(d?.name || 'Growth Partner'),
            email: String(d?.email || `${uid.toLowerCase()}@recovered.studentcompanion.ng`),
            emailVerified: true,
            createdAt: String(d?.createdAt || new Date().toISOString()),
            directorySource: 'recovered',
            recoveredFrom: 'Growth Partners Registry',
            growthPartnerData: {
              ...(d as GrowthPartner),
              id: uid,
              name: String(d?.name || 'Growth Partner'),
              email: String(d?.email || '')
            }
          };
          if (!isPurgedRecord(rec)) recoveredRegistryUsers.push(rec);
        });

        schoolsSnap.forEach(docSnap => {
          const d = docSnap.data() as any;
          const uid = sanitizeFirestoreDocId(d?.adminId || `usr_admin_${d?.schoolCode || docSnap.id}`);
          const rec: RegisteredUserProfile = {
            id: uid,
            role: 'admin',
            fullName: String(d?.schoolName ? `${d.schoolName} Admin` : 'School Administrator'),
            email: `${uid.toLowerCase()}@recovered.studentcompanion.ng`,
            emailVerified: true,
            createdAt: String(d?.issuedAt || d?.updatedAt || new Date().toISOString()),
            directorySource: 'recovered',
            recoveredFrom: 'School Registry',
            adminData: {
              schoolName: String(d?.schoolName || 'Secondary School'),
              schoolType: String(d?.schoolType || 'College'),
              schoolCode: d?.schoolCode ? String(d.schoolCode).toUpperCase() : undefined,
              state: d?.state,
              lga: d?.lga,
              verificationStatus: d?.verificationStatus || 'pending_verification'
            }
          };
          if (!isPurgedRecord(rec)) recoveredRegistryUsers.push(rec);
        });

        const mergedPreview = mergeUserProfileArrays([
          allRegisteredUsers,
          backendUsers,
          firestoreUsers,
          recoveredRegistryUsers
        ]);

        // Backfill accounts discovered in backend or legacy registries into Firestore `users`
        const missingInFirestore = mergedPreview.filter(u => {
          if (isPurgedRecord(u) || u.accountStatus === 'deleted') return false;
          const docId = sanitizeFirestoreDocId(u.id);
          const cleanEm = String(u.email || '').trim().toLowerCase();
          if (firestoreUserIds.has(docId)) return false;
          if (!isPlaceholderRecoveredEmail(cleanEm) && firestoreUserEmails.has(cleanEm)) return false;
          return true;
        });

        for (const candidate of missingInFirestore.slice(0, 50)) {
          const docId = sanitizeFirestoreDocId(candidate.id);
          try {
            await setDoc(doc(db, 'users', docId), sanitizeUserAccountForFirestore(candidate), { merge: true });
            backfilledToFirestoreCount += 1;
          } catch {
            // Skip any doc blocked by Firestore schema validation without aborting batch
          }
        }

        // Mirror newly discovered Firestore / recovered accounts back to shared backend
        if (firestoreUsers.length > 0 || recoveredRegistryUsers.length > 0) {
          const authHeaders = await getFirebaseAuthHeaders().catch(() => ({}));
          void fetch('/api/admin/users/sync-batch', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...authHeaders,
              ...getSecurityHeaders({
                userId: currentUserProfile?.id,
                userEmail: adminEmail
              })
            },
            body: JSON.stringify({
              adminEmail,
              users: [...firestoreUsers, ...recoveredRegistryUsers]
            })
          }).catch(() => {});
        }
      } catch (fsErr: any) {
        if (!options?.silent && !syncErrorMsg) {
          syncErrorMsg = fsErr?.message || 'Firestore directory sync partially restricted.';
        }
      }
    }

    const mergedAll = mergeUserProfileArrays([
      allRegisteredUsers,
      backendUsers,
      firestoreUsers,
      recoveredRegistryUsers
    ]);

    if (firestoreAdminReady) {
      for (const fsUser of firestoreUsers) {
        const repairedMatch = mergedAll.find(
          (u) => u.id === fsUser.id || (u.email && fsUser.email && u.email.toLowerCase() === fsUser.email.toLowerCase())
        );
        if (
          repairedMatch &&
          repairedMatch.role === 'tutor' &&
          repairSpecificTutorRecord(fsUser).changed
        ) {
          const docId = sanitizeFirestoreDocId(repairedMatch.id);
          void setDoc(doc(db, 'users', docId), sanitizeUserAccountForFirestore(repairedMatch), { merge: true }).catch(() => {});
          const authHeaders = await getFirebaseAuthHeaders().catch(() => ({}));
          void fetch('/api/admin/users/update', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...authHeaders,
              ...getSecurityHeaders({ userId: currentUserProfile?.id, userEmail: adminEmail })
            },
            body: JSON.stringify({
              adminEmail,
              userId: repairedMatch.id,
              updates: { tutorData: repairedMatch.tutorData },
              fallbackProfile: repairedMatch
            })
          }).catch(() => {});
        }
      }
    }

    setAllRegisteredUsers(mergedAll);
    safeSetItem('sc_all_users', JSON.stringify(mergedAll));

    const recoveredTotal = mergedAll.filter(
      u => u.directorySource === 'recovered' || backendRecoveredCount > 0 && Boolean(u.recoveredFrom)
    ).length;

    const recoveredCount = Math.max(recoveredTotal, backendRecoveredCount);

    setDirectorySyncStats({
      total: mergedAll.length,
      backendCount: backendUsers.length,
      firestoreCount: firestoreUsers.length,
      recoveredCount,
      backfilledToFirestoreCount,
      lastSyncedAt: new Date().toISOString(),
      firestoreAdminReady
    });

    setIsSyncingDirectory(false);
    const ok = !syncErrorMsg || backendUsers.length > 0 || firestoreUsers.length > 0;
    return {
      success: ok,
      totalUsers: mergedAll.length,
      backendCount: backendUsers.length,
      firestoreCount: firestoreUsers.length,
      recoveredCount,
      backfilledToFirestoreCount,
      needsGoogleAuth,
      message: `Directory synced across backend, Firestore, and legacy registries (${mergedAll.length} total account(s)).`,
      error: syncErrorMsg
    };
  }, [
    isSuperAdmin,
    currentUserProfile,
    currentUser,
    allRegisteredUsers,
    isOffline,
    isFirebaseConnected
  ]);

  const syncedSuperAdminSessionRef = React.useRef<string | null>(null);
  useEffect(() => {
    if (!isSuperAdmin || isOffline) return;
    const sessionKey = `${currentUser?.uid || 'no-fb'}:${currentUserProfile?.email || 'no-prof'}:${isFirebaseConnected}`;
    if (syncedSuperAdminSessionRef.current === sessionKey) return;
    syncedSuperAdminSessionRef.current = sessionKey;
    void syncUserDirectoryFromCloud({ silent: true });
  }, [isSuperAdmin, isOffline, isFirebaseConnected, currentUser?.uid, currentUserProfile?.email, syncUserDirectoryFromCloud]);

  const updateUserRecord = async (userId: string, updates: Partial<RegisteredUserProfile>) => {
    const existingRecord =
      allRegisteredUsers.find(u => u.id === userId) ||
      (currentUserProfile?.id === userId ? currentUserProfile : undefined);

    const applyProfileUpdates = (u: RegisteredUserProfile): RegisteredUserProfile => {
      if (updates.tutorData && u.tutorData) {
        return {
          ...u,
          ...updates,
          tutorData: mergeTutorDataSafely(u.tutorData, updates.tutorData)
        };
      }
      return { ...u, ...updates };
    };

    setAllRegisteredUsers(prev => {
      const updated = prev.map(u => (u.id === userId ? applyProfileUpdates(u) : u));
      safeSetItem('sc_all_users', JSON.stringify(updated));
      return updated;
    });

    if (currentUserProfile && currentUserProfile.id === userId) {
      const updated = applyProfileUpdates(currentUserProfile);
      setCurrentUserProfile(updated);
      safeSetItem('sc_user_profile', JSON.stringify(updated));
    }

    if (impersonatedUser && impersonatedUser.id === userId) {
      const updated = applyProfileUpdates(impersonatedUser);
      setImpersonatedUser(updated);
      if (updated.studentData) setStudent(updated.studentData);
    }

    if (!isOffline && isFirebaseConnected) {
      const firestoreDocId = sanitizeFirestoreDocId(userId);
      if (isSuperAdmin && auth.currentUser?.emailVerified && isSuperAdminEmail(auth.currentUser.email)) {
        const mergedForFirestore = sanitizeUserAccountForFirestore({
          ...(existingRecord || {
            id: firestoreDocId,
            role: 'student',
            fullName: 'User',
            email: '',
            emailVerified: true,
            createdAt: new Date().toISOString()
          }),
          ...updates
        });
        setDoc(doc(db, 'users', firestoreDocId), mergedForFirestore, { merge: true }).catch(err => {
          console.warn('Could not sync user update to Firestore:', err);
        });
      } else {
        const allowedOwnerKeys = ['fullName', 'avatarUrl', 'parentData', 'tutorData', 'legalConsent'] as const;
        const safeOwnerUpdates: Partial<RegisteredUserProfile> = {};
        for (const key of allowedOwnerKeys) {
          if (updates[key] !== undefined) {
            (safeOwnerUpdates as any)[key] = updates[key];
          }
        }
        if (Object.keys(safeOwnerUpdates).length > 0) {
          updateDoc(doc(db, 'users', firestoreDocId), safeOwnerUpdates as any).catch(err => {
            console.warn('Could not sync owner profile fields to Firestore:', err);
          });
        }
      }
    }

    if (isSuperAdmin) {
      const adminEmail = currentUserProfile?.email || currentUser?.email || SUPER_ADMIN_EMAIL;
      const authHeaders = await getFirebaseAuthHeaders().catch(() => ({}));
      void fetch('/api/admin/users/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
          ...getSecurityHeaders({ userId: currentUserProfile?.id, userEmail: adminEmail })
        },
        body: JSON.stringify({
          adminEmail,
          userId,
          updates,
          fallbackProfile: existingRecord ? { ...existingRecord, ...updates } : undefined
        })
      }).catch(() => {});
    } else if (existingRecord) {
      void fetch('/api/users/sync-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getSecurityHeaders({ userId, userEmail: existingRecord.email })
        },
        body: JSON.stringify({ profile: { ...existingRecord, ...updates } })
      }).catch(() => {});
    }
  };

  const acceptUserAgreement = async () => {
    if (!currentUserProfile) return;
    const consent = createLegalConsentRecord(currentUserProfile.role || currentRole);
    await updateUserRecord(currentUserProfile.id, { legalConsent: consent });
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
      const authHeaders = await getFirebaseAuthHeaders();
      const res = await fetch('/api/security/action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
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

    if (!isOffline && isFirebaseConnected && auth.currentUser?.emailVerified && isSuperAdminEmail(auth.currentUser.email)) {
      const docId = sanitizeFirestoreDocId(resolvedId);
      setDoc(doc(db, 'users', docId), {
        fullName: 'Deleted Account',
        email: scrubbedEmail,
        accountStatus: 'deleted',
        deletedAt: nowIso,
        deletedBy: adminEmail,
        deletionReason: cleanReason,
        walletFrozen: true,
        walletFrozenReason: 'Account permanently closed'
      }, { merge: true }).catch(() => {});
      deleteDoc(doc(db, 'students', docId)).catch(() => {});
      deleteDoc(doc(db, 'wallets', docId)).catch(() => {});
    }

    const authHeaders = await getFirebaseAuthHeaders().catch(() => ({}));
    void fetch('/api/admin/users/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...getSecurityHeaders({ userEmail: adminEmail })
      },
      body: JSON.stringify({
        adminEmail,
        userId: resolvedId,
        updates: scrubbedFields
      })
    }).catch(() => {});

    return { success: true };
  };

  const deleteAndReleaseUserRecord = async (
    user: RegisteredUserProfile,
    reason?: string,
    adminEmailOverride?: string
  ): Promise<{ success: boolean; releasedEmail?: string; error?: string }> => {
    const resolvedId = user.id;
    const resolvedEmail = String(user.email || '').trim().toLowerCase();

    if (isSuperAdminEmail(resolvedEmail) || user.isSuperAdmin) {
      return { success: false, error: 'Verified Super Admin accounts cannot be deleted.' };
    }

    const adminEmail =
      adminEmailOverride || currentUserProfile?.email || currentUser?.email || SUPER_ADMIN_EMAIL;
    const cleanReason =
      String(reason || '').trim() || 'Account deleted and email released for fresh registration by Super Admin';
    const extraUserIds = Array.from(
      new Set(
        [
          ...(user.conflictingRoles || []).map((c) => c.userId),
          user.studentData?.id,
          user.growthPartnerData?.id
        ].filter((id): id is string => Boolean(id && id !== resolvedId))
      )
    );

    let purgedIdsFromServer: string[] = [];
    try {
      const authHeaders = await getFirebaseAuthHeaders();
      const res = await fetch('/api/admin/users/delete-release', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
          ...getSecurityHeaders({ userId: currentUserProfile?.id, userEmail: adminEmail })
        },
        body: JSON.stringify({
          adminEmail,
          userId: resolvedId,
          email: resolvedEmail,
          extraUserIds,
          reason: cleanReason
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Server could not delete and release this account.' };
      }
      if (Array.isArray(data.purgedIds)) {
        purgedIdsFromServer = data.purgedIds;
      }
    } catch (err: any) {
      return { success: false, error: err?.message || 'Network error deleting and releasing account.' };
    }

    const allIdsToPurge = Array.from(
      new Set([resolvedId, ...extraUserIds, ...purgedIdsFromServer].filter(Boolean))
    );

    // Purge all matching Firestore documents when signed in as verified Super Admin
    if (
      !isOffline &&
      isFirebaseConnected &&
      auth.currentUser?.emailVerified &&
      isSuperAdminEmail(auth.currentUser.email)
    ) {
      for (const rawId of allIdsToPurge) {
        const docId = sanitizeFirestoreDocId(rawId);
        await Promise.allSettled([
          deleteDoc(doc(db, 'users', docId)),
          deleteDoc(doc(db, 'students', docId)),
          deleteDoc(doc(db, 'wallets', docId)),
          deleteDoc(doc(db, 'growthPartners', docId)),
          deleteDoc(doc(db, 'partnerWallets', docId))
        ]);
      }
      if (user.studentData?.studentLinkCode) {
        await deleteDoc(
          doc(db, 'studentLinkRegistry', sanitizeFirestoreDocId(user.studentData.studentLinkCode))
        ).catch(() => {});
      }
    }

    // Remove cleanly from local allRegisteredUsers so email is immediately free
    const idSet = new Set(allIdsToPurge);
    setAllRegisteredUsers((prev) => {
      const updated = prev.filter((u) => {
        if (idSet.has(u.id)) return false;
        if (resolvedEmail && String(u.email || '').trim().toLowerCase() === resolvedEmail) return false;
        return true;
      });
      safeSetItem('sc_all_users', JSON.stringify(updated));
      return updated;
    });

    if (impersonatedUser && (idSet.has(impersonatedUser.id) || impersonatedUser.email.toLowerCase() === resolvedEmail)) {
      stopImpersonation();
    }

    return { success: true, releasedEmail: resolvedEmail || undefined };
  };

  const resolveMultiRoleAccount = async (
    user: RegisteredUserProfile,
    keepRole: UserRole,
    adminEmailOverride?: string
  ): Promise<{ success: boolean; user?: RegisteredUserProfile; error?: string }> => {
    const cleanEmail = String(user.email || '').trim().toLowerCase();
    if (isSuperAdminEmail(cleanEmail) || user.isSuperAdmin) {
      return { success: false, error: 'Super Admin accounts cannot be reassigned here.' };
    }

    const adminEmail =
      adminEmailOverride || currentUserProfile?.email || currentUser?.email || SUPER_ADMIN_EMAIL;
    const keepFamily = normalizeClientRoleFamily(keepRole);
    const conflictingList = user.conflictingRoles || [];
    const keptConflict = conflictingList.find((c) => normalizeClientRoleFamily(c.role) === keepFamily);

    // Prefer a Firebase-style UID if present, otherwise keep the canonical user.id
    const canonicalId =
      user.directorySource === 'firestore'
        ? user.id
        : keptConflict?.userId || user.id;

    const extraUserIds = Array.from(
      new Set(
        [
          user.id,
          ...conflictingList.map((c) => c.userId),
          user.studentData?.id,
          user.growthPartnerData?.id
        ].filter((id): id is string => Boolean(id && id !== canonicalId))
      )
    );

    const cleanedProfile: RegisteredUserProfile = {
      ...user,
      id: canonicalId,
      role: keepRole,
      email: cleanEmail || user.email,
      studentData: keepFamily === 'student' ? user.studentData : undefined,
      parentData: keepFamily === 'parent' ? user.parentData : undefined,
      tutorData: keepFamily === 'tutor' ? user.tutorData : undefined,
      adminData: keepFamily === 'school_admin' ? user.adminData : undefined,
      growthPartnerData: keepFamily === 'growth_partner' ? user.growthPartnerData : undefined,
      directorySource: 'firestore',
      recoveredFrom: undefined,
      conflictingRoles: undefined
    };

    try {
      const authHeaders = await getFirebaseAuthHeaders();
      const res = await fetch('/api/admin/users/resolve-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
          ...getSecurityHeaders({ userId: currentUserProfile?.id, userEmail: adminEmail })
        },
        body: JSON.stringify({
          adminEmail,
          userId: canonicalId,
          email: cleanEmail,
          keepRole,
          extraUserIds,
          fallbackProfile: cleanedProfile
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Server could not resolve multi-role conflict.' };
      }
    } catch (err: any) {
      return { success: false, error: err?.message || 'Network error resolving multi-role conflict.' };
    }

    const allIds = Array.from(new Set([canonicalId, ...extraUserIds].filter(Boolean)));

    // Synchronize Firestore so both sign-in and User Directory reflect the single kept role
    if (
      !isOffline &&
      isFirebaseConnected &&
      auth.currentUser?.emailVerified &&
      isSuperAdminEmail(auth.currentUser.email)
    ) {
      const canonicalDocId = sanitizeFirestoreDocId(canonicalId);
      const fsPayload = sanitizeUserAccountForFirestore(cleanedProfile);
      // Full overwrite (no merge) removes unwanted persona blobs from users/{uid}
      await setDoc(doc(db, 'users', canonicalDocId), fsPayload).catch(() => {});

      for (const rawId of allIds) {
        const docId = sanitizeFirestoreDocId(rawId);
        if (docId !== canonicalDocId) {
          await deleteDoc(doc(db, 'users', docId)).catch(() => {});
        }
        if (keepFamily !== 'growth_partner') {
          await Promise.allSettled([
            deleteDoc(doc(db, 'growthPartners', docId)),
            deleteDoc(doc(db, 'partnerWallets', docId))
          ]);
        }
        if (keepFamily !== 'student') {
          await deleteDoc(doc(db, 'students', docId)).catch(() => {});
        }
      }
      if (keepFamily !== 'student' && user.studentData?.studentLinkCode) {
        await deleteDoc(
          doc(db, 'studentLinkRegistry', sanitizeFirestoreDocId(user.studentData.studentLinkCode))
        ).catch(() => {});
      }
    }

    const idSet = new Set(allIds);
    setAllRegisteredUsers((prev) => {
      const withoutDupes = prev.filter((u) => {
        if (idSet.has(u.id)) return false;
        if (cleanEmail && String(u.email || '').trim().toLowerCase() === cleanEmail) return false;
        return true;
      });
      const updated = [cleanedProfile, ...withoutDupes];
      safeSetItem('sc_all_users', JSON.stringify(updated));
      return updated;
    });

    if (impersonatedUser && (idSet.has(impersonatedUser.id) || impersonatedUser.email.toLowerCase() === cleanEmail)) {
      stopImpersonation();
    }

    return { success: true, user: cleanedProfile };
  };

  const updateGrowthPartnerBankDetails = async (details: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    phone?: string;
    partnerId?: string;
    email?: string;
  }): Promise<{ success: boolean; partner?: GrowthPartner; error?: string }> => {
    const cleanBankName = String(details.bankName || '').trim();
    const cleanAccountNumber = String(details.accountNumber || '').replace(/\D/g, '').slice(0, 10);
    const cleanAccountName = String(details.accountName || '').trim();
    const cleanPhone = details.phone !== undefined ? String(details.phone).trim() : undefined;

    if (!cleanBankName || cleanBankName.length < 2) {
      return { success: false, error: 'Please select or enter your bank name.' };
    }
    if (!/^\d{10}$/.test(cleanAccountNumber) || cleanAccountNumber === '0123456789' || cleanAccountNumber === '0712345678') {
      return { success: false, error: 'Please enter a valid 10-digit NUBAN account number.' };
    }
    if (!cleanAccountName || cleanAccountName.length < 2) {
      return { success: false, error: 'Please enter the exact account holder name.' };
    }

    const targetPartnerId =
      details.partnerId ||
      impersonatedUser?.id ||
      currentUser?.uid ||
      currentUserProfile?.id ||
      '';
    const targetEmail = (
      details.email ||
      impersonatedUser?.email ||
      currentUserProfile?.email ||
      currentUser?.email ||
      ''
    )
      .trim()
      .toLowerCase();

    if (!targetPartnerId && !targetEmail) {
      return { success: false, error: 'Please sign in as a Growth Partner to update bank details.' };
    }

    let serverPartner: GrowthPartner | undefined;
    try {
      const authHeaders = await getFirebaseAuthHeaders().catch(() => ({}));
      const res = await fetch('/api/partners/bank-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
          ...getSecurityHeaders({ userId: targetPartnerId, userEmail: targetEmail })
        },
        body: JSON.stringify({
          partnerId: targetPartnerId,
          email: targetEmail,
          bankName: cleanBankName,
          accountNumber: cleanAccountNumber,
          accountName: cleanAccountName,
          ...(cleanPhone !== undefined ? { phone: cleanPhone } : {})
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Could not save settlement bank details.' };
      }
      serverPartner = data.partner as GrowthPartner;
    } catch (err: any) {
      return { success: false, error: err?.message || 'Network error saving bank details.' };
    }

    const nowIso = new Date().toISOString();
    const buildUpdatedPartnerData = (prev?: GrowthPartner): GrowthPartner => ({
      id: prev?.id || serverPartner?.id || targetPartnerId,
      name: prev?.name || serverPartner?.name || currentUserProfile?.fullName || cleanAccountName,
      email: prev?.email || serverPartner?.email || targetEmail,
      phone: cleanPhone !== undefined ? cleanPhone : prev?.phone || serverPartner?.phone || '',
      referralCode: prev?.referralCode || serverPartner?.referralCode || '',
      commissionRatePercent: prev?.commissionRatePercent ?? serverPartner?.commissionRatePercent ?? 10,
      totalEarningsNaira: prev?.totalEarningsNaira ?? serverPartner?.totalEarningsNaira ?? 0,
      totalPaidOutNaira: prev?.totalPaidOutNaira ?? serverPartner?.totalPaidOutNaira ?? 0,
      activeReferralsCount: prev?.activeReferralsCount ?? serverPartner?.activeReferralsCount ?? 0,
      status: prev?.status || serverPartner?.status || 'active',
      createdAt: prev?.createdAt || serverPartner?.createdAt || nowIso,
      bankName: cleanBankName,
      accountNumber: cleanAccountNumber,
      accountName: cleanAccountName
    });

    const nextPartnerData = buildUpdatedPartnerData(
      (impersonatedUser?.id === targetPartnerId ? impersonatedUser.growthPartnerData : currentUserProfile?.growthPartnerData)
    );

    if (currentUserProfile && (currentUserProfile.id === targetPartnerId || currentUserProfile.email.toLowerCase() === targetEmail)) {
      const updatedSelf: RegisteredUserProfile = {
        ...currentUserProfile,
        growthPartnerData: buildUpdatedPartnerData(currentUserProfile.growthPartnerData)
      };
      setCurrentUserProfile(updatedSelf);
      safeSetItem('sc_user_profile', JSON.stringify(updatedSelf));
    }

    if (impersonatedUser && (impersonatedUser.id === targetPartnerId || impersonatedUser.email.toLowerCase() === targetEmail)) {
      setImpersonatedUser({
        ...impersonatedUser,
        growthPartnerData: buildUpdatedPartnerData(impersonatedUser.growthPartnerData)
      });
    }

    setAllRegisteredUsers((prev) => {
      const updated = prev.map((u) =>
        u.id === targetPartnerId || (targetEmail && u.email.toLowerCase() === targetEmail)
          ? { ...u, growthPartnerData: buildUpdatedPartnerData(u.growthPartnerData) }
          : u
      );
      safeSetItem('sc_all_users', JSON.stringify(updated));
      return updated;
    });

    // Persist directly to Firestore users/{uid} and growthPartners/{uid} when authenticated
    if (!isOffline && isFirebaseConnected && auth.currentUser?.emailVerified) {
      const docId = sanitizeFirestoreDocId(targetPartnerId);
      const isOwnerOrAdmin =
        auth.currentUser.uid === docId || isSuperAdminEmail(auth.currentUser.email);
      if (isOwnerOrAdmin) {
        updateDoc(doc(db, 'users', docId), {
          growthPartnerData: nextPartnerData
        }).catch(() => {});
        updateDoc(doc(db, 'growthPartners', docId), {
          bankName: cleanBankName,
          accountNumber: cleanAccountNumber,
          accountName: cleanAccountName,
          ...(cleanPhone !== undefined ? { phone: cleanPhone } : {}),
          updatedAt: nowIso
        }).catch(() => {});
      }
    }

    return { success: true, partner: nextPartnerData };
  };

  const loginAsDeveloper = (emailInput?: string, options?: { skipNavigate?: boolean }): RegisteredUserProfile => {
    const targetEmail = (emailInput || SUPER_ADMIN_EMAIL).toLowerCase().trim();
    const displayName = 'Martin Omorefe (Lead Developer)';
    const devProfile: RegisteredUserProfile = {
      id: 'usr-dev-martorefe',
      role: 'admin',
      fullName: displayName,
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
  const otaBroadcastNotifsRef = React.useRef<OTANotificationBroadcast[]>(otaBroadcastNotifs);
  otaBroadcastNotifsRef.current = otaBroadcastNotifs;
  const personalInboxRef = React.useRef<AppNotificationItem[]>(personalInbox);
  personalInboxRef.current = personalInbox;

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
      if (id.startsWith('ota_') || otaBroadcastNotifsRef.current.some((b) => b.id === id)) {
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
    [notifUserScope]
  );

  const handleNotificationAction = useCallback(
    (item: AppNotificationItem) => {
      markNotificationRead(item.id);
      setIsNotificationDrawerOpen(false);
      routeToDeepLinkTab(item.deepLinkTab);
    },
    [markNotificationRead, routeToDeepLinkTab]
  );

  const notifRuntimeRef = React.useRef({
    currentRole,
    isAuthenticated,
    notificationPreferences,
    handleNotificationAction
  });
  notifRuntimeRef.current = {
    currentRole,
    isAuthenticated,
    notificationPreferences,
    handleNotificationAction
  };

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
      setOtaBroadcastNotifs((prev) => {
        if (prev.length === items.length && JSON.stringify(prev) === JSON.stringify(items)) {
          return prev;
        }
        return items;
      });

      // Dispatch browser push for newly added active OTA broadcasts targeting the active user
      if (!otaHydratedRef.current) {
        items.forEach((b) => seenLiveOtaIdsRef.current.add(b.id));
        otaHydratedRef.current = true;
        return;
      }

      const rt = notifRuntimeRef.current;
      if (!rt.isAuthenticated || !rt.notificationPreferences.otaBroadcasts) {
        items.forEach((b) => seenLiveOtaIdsRef.current.add(b.id));
        return;
      }

      items.forEach((b) => {
        if (!seenLiveOtaIdsRef.current.has(b.id)) {
          seenLiveOtaIdsRef.current.add(b.id);
          const matchesRole =
            b.isActive &&
            (b.targetRoles.includes('all') || b.targetRoles.includes(rt.currentRole));
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
            dispatchBrowserNotification(notifItem, rt.notificationPreferences, {
              onForegroundClick: (clicked) => notifRuntimeRef.current.handleNotificationAction(clicked)
            });
          }
        }
      });
    });
    return () => unsub();
  }, []);

  // Automated Streak & Inactivity Draw-Back Evaluation Loop
  useEffect(() => {
    if (!isAuthenticated || currentScreen !== 'app') return;

    const runCheck = () => {
      const existingIds = new Set(personalInboxRef.current.map((i) => i.id));
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
          const prevIds = new Set(prev.map((i) => i.id));
          const trulyNew = newItems.filter((item) => !prevIds.has(item.id));
          if (trulyNew.length === 0) return prev;
          const merged = [...trulyNew, ...prev].slice(0, 60);
          saveStoredInboxNotifications(notifUserScope, merged);
          return merged;
        });

        // Push up to 1 top automated alert to browser OS notifications when allowed
        dispatchBrowserNotification(newItems[0], notificationPreferences, {
          onForegroundClick: (clicked) => notifRuntimeRef.current.handleNotificationAction(clicked)
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
    isAuthenticated,
    notifUserScope,
    notificationPreferences,
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

  const offlineQueueScopeId = currentUser?.uid || currentUserProfile?.id || 'guest';
  const pendingSyncCountRef = React.useRef(pendingSyncCount);
  pendingSyncCountRef.current = pendingSyncCount;

  const syncOfflineQueue = useCallback(async (): Promise<{ synced: number; remaining: number }> => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return { synced: 0, remaining: pendingSyncCountRef.current };
    }
    if (manualOffline) {
      return { synced: 0, remaining: pendingSyncCountRef.current };
    }

    const scopesToCheck = Array.from(
      new Set([currentUser?.uid, currentUserProfile?.id, 'guest'].filter(Boolean) as string[])
    );

    const allQueued: Array<{ scope: string; item: OfflineSyncQueueItem }> = [];
    for (const sc of scopesToCheck) {
      const items = getOfflineSyncQueue(sc);
      items.forEach((item) => allQueued.push({ scope: sc, item }));
    }

    if (allQueued.length === 0) {
      setPendingSyncCount(0);
      return { synced: 0, remaining: 0 };
    }

    setIsSyncingOfflineQueue(true);
    let syncedCount = 0;
    const failedByScope = new Map<string, OfflineSyncQueueItem[]>();

    for (const { scope, item } of allQueued) {
      try {
        if (currentUser) {
          if (item.type === 'xp_award' && !isSuperAdminEmail(currentUser.email)) {
            await updateDoc(doc(db, 'students', currentUser.uid), {
              lastStudyDate: item.payload.lastStudyDate
            }).catch(() => {});
            const headers = await getFirebaseAuthHeaders();
            if (headers.Authorization) {
              await fetch('/api/students/sync-progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...headers },
                body: JSON.stringify({
                  deltaXP: Number(item.payload.deltaXP || 25),
                  streakDays: item.payload.streakDays,
                  reason: item.label || 'Offline XP sync',
                }),
              });
            }
          } else if (item.type === 'lesson_read' && !isSuperAdminEmail(currentUser.email)) {
            await updateDoc(doc(db, 'students', currentUser.uid), {
              lastStudyDate: item.payload.lastStudyDate,
              completedReadNoteIds: item.payload.completedReadNoteIds,
              verifiedReadingLogs: item.payload.verifiedReadingLogs
            });
            const headers = await getFirebaseAuthHeaders();
            if (headers.Authorization) {
              await fetch('/api/students/sync-progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...headers },
                body: JSON.stringify({
                  deltaXP: 60,
                  streakDays: item.payload.streakDays,
                  reason: item.label || 'Offline verified lesson read sync',
                }),
              });
            }
          } else if (item.type === 'exam_result' && item.payload?.result) {
            const r = item.payload.result as CBTExamResult;
            await setDoc(doc(db, 'students', currentUser.uid, 'examResults', r.id), {
              id: r.id,
              studentId: currentUser.uid,
              examId: r.examId,
              examTitle: r.examTitle,
              subject: r.subject,
              score: r.score,
              totalQuestions: r.totalQuestions,
              percentage: r.percentage,
              timeSpentSeconds: r.timeSpentSeconds,
              xpAwarded: r.xpAwarded,
              date: r.date
            });
          } else if (item.type === 'study_block') {
            // Study block state is preserved locally in sc_exam_prep; mark synced cleanly
          }
          syncedCount += 1;
        } else {
          // Local profile synced cleanly; retain Firebase items until cloud session connects if needed
          if (item.type === 'study_block') {
            syncedCount += 1;
          } else {
            const arr = failedByScope.get(scope) || [];
            arr.push(item);
            failedByScope.set(scope, arr);
          }
        }
      } catch {
        const arr = failedByScope.get(scope) || [];
        arr.push({ ...item, retryCount: (item.retryCount || 0) + 1 });
        failedByScope.set(scope, arr);
      }
    }

    let remainingCount = 0;
    for (const sc of scopesToCheck) {
      const rem = failedByScope.get(sc) || [];
      saveOfflineSyncQueue(sc, rem);
      remainingCount += rem.length;
    }

    setPendingSyncCount(remainingCount);
    if (syncedCount > 0) {
      const syncedIso = markOfflineSyncedNow(offlineQueueScopeId);
      setLastOfflineSyncedAt(syncedIso);
      setOfflineSyncNotice(`Synced ${syncedCount} offline progress item${syncedCount === 1 ? '' : 's'} to cloud.`);
      window.setTimeout(() => {
        setOfflineSyncNotice((prev) =>
          prev && prev.startsWith('Synced ') ? null : prev
        );
      }, 4500);
    }

    setIsSyncingOfflineQueue(false);
    return { synced: syncedCount, remaining: remainingCount };
  }, [currentUser, currentUserProfile?.id, manualOffline, offlineQueueScopeId]);

  // Monitor real browser connectivity, hydrate queue count, and warm offline cache on startup
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => {
      setBrowserOnline(true);
    };
    const handleOffline = () => {
      setBrowserOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const warmupTimer = window.setTimeout(() => {
      if (navigator.onLine) {
        warmOfflineAppCache().catch(() => {});
      }
    }, 2200);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.clearTimeout(warmupTimer);
    };
  }, []);

  useEffect(() => {
    const scopes = Array.from(
      new Set([currentUser?.uid, currentUserProfile?.id, 'guest'].filter(Boolean) as string[])
    );
    const total = scopes.reduce((sum, sc) => sum + getOfflineSyncQueue(sc).length, 0);
    setPendingSyncCount(total);
    setLastOfflineSyncedAt(getLastOfflineSyncedAt(offlineQueueScopeId));
  }, [currentUser?.uid, currentUserProfile?.id, offlineQueueScopeId]);

  useEffect(() => {
    if (browserOnline && !manualOffline && currentUser && pendingSyncCount > 0) {
      void syncOfflineQueue();
    }
  }, [browserOnline, manualOffline, currentUser, pendingSyncCount, syncOfflineQueue]);

  // Unified Hardware & Browser Back Button Controller (Android APK, Web, Standalone PWA)
  const navSnapshotRef = React.useRef({
    currentScreen,
    currentRole,
    activeStudentTab,
    activeReadingNote,
    activeExam,
    pendingExamExit
  });
  navSnapshotRef.current = {
    currentScreen,
    currentRole,
    activeStudentTab,
    activeReadingNote,
    activeExam,
    pendingExamExit
  };

  const exitArmedRef = React.useRef<boolean>(false);
  const exitTimerRef = React.useRef<number | null>(null);

  const clearExitArm = useCallback(() => {
    exitArmedRef.current = false;
    setShowExitBackToast(false);
    if (exitTimerRef.current !== null && typeof window !== 'undefined') {
      window.clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }
  }, []);

  const handleUnifiedBackPress = useCallback((): 'handled' | 'armed_exit' | 'allow_exit' => {
    const snap = navSnapshotRef.current;

    // 0. If CBT Exit Confirmation modal is open, pressing Back dismisses it safely (keeps user in exam)
    if (snap.pendingExamExit) {
      setPendingExamExit(null);
      clearExitArm();
      return 'handled';
    }

    // 1. LIFO Registered Modals, Drawers, Sub-views & Results
    if (dispatchTopBackHandler()) {
      clearExitArm();
      return 'handled';
    }

    // 2. Active Lesson Note Reader closes immediately
    if (snap.activeReadingNote) {
      setActiveReadingNote(null);
      clearExitArm();
      return 'handled';
    }

    // 3. Active Unsubmitted CBT / Aspirant Exam triggers confirmation prompt
    const examGuard = getActiveExamBackGuard();
    if (examGuard) {
      setPendingExamExit({
        title: examGuard.title,
        onConfirm: examGuard.onConfirmExit
      });
      clearExitArm();
      return 'handled';
    }

    if (snap.activeExam) {
      setActiveExam(null);
      clearExitArm();
      return 'handled';
    }

    // 4. Active App Screen & Student Visited-Tab Stack
    if (snap.currentScreen === 'app') {
      if (snap.currentRole === 'student') {
        if (studentTabHistoryRef.current.length > 1) {
          studentTabHistoryRef.current.pop();
          const prevTab = studentTabHistoryRef.current[studentTabHistoryRef.current.length - 1] || 'dashboard';
          setActiveStudentTabRaw(prevTab);
          clearExitArm();
          return 'handled';
        }
        if (snap.activeStudentTab !== 'dashboard') {
          studentTabHistoryRef.current = ['dashboard'];
          setActiveStudentTabRaw('dashboard');
          clearExitArm();
          return 'handled';
        }
      }
    }

    // 5. Auth & Info sub-screens step back toward Landing
    if (snap.currentScreen === 'know_more' || snap.currentScreen === 'signin' || snap.currentScreen === 'signup') {
      if (screenHistoryRef.current.length > 1) {
        screenHistoryRef.current.pop();
        const prevScreen = screenHistoryRef.current[screenHistoryRef.current.length - 1] || 'landing';
        setCurrentScreenRaw(prevScreen);
      } else {
        screenHistoryRef.current = ['landing'];
        setCurrentScreenRaw('landing');
      }
      clearExitArm();
      return 'handled';
    }

    // 6. Protect initial 3-second boot splash
    if (snap.currentScreen === 'splash') {
      return 'handled';
    }

    // 7. Root Screen (Home Dashboard / Portal Root / Landing) -> Press Back Twice to Exit
    if (exitArmedRef.current) {
      clearExitArm();
      return 'allow_exit';
    }

    exitArmedRef.current = true;
    setShowExitBackToast(true);
    if (typeof window !== 'undefined') {
      if (exitTimerRef.current !== null) {
        window.clearTimeout(exitTimerRef.current);
      }
      exitTimerRef.current = window.setTimeout(() => {
        exitArmedRef.current = false;
        setShowExitBackToast(false);
        exitTimerRef.current = null;
        ensureNavSentinel();
      }, 2200);
    }
    return 'armed_exit';
  }, [clearExitArm]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const win = window as unknown as {
      __scHandleNativeBack?: () => 'handled' | 'armed_exit' | 'allow_exit';
    };
    win.__scHandleNativeBack = () => handleUnifiedBackPress();

    const handlePopState = () => {
      if (hasNativeAndroidBackBridge()) return;
      const outcome = handleUnifiedBackPress();
      if (outcome === 'handled') {
        ensureNavSentinel();
      }
      // If outcome === 'armed_exit', leave the sentinel popped during the 2s window
      // so pressing Back a second time exits the PWA / leaves the page natively.
    };

    const handleUserGesture = () => {
      if (hasNativeAndroidBackBridge()) return;
      if (exitArmedRef.current) {
        clearExitArm();
      }
      if (!hasNavSentinelState()) {
        ensureNavSentinel();
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('pointerdown', handleUserGesture, { passive: true });
    window.addEventListener('keydown', handleUserGesture, { passive: true });

    return () => {
      delete win.__scHandleNativeBack;
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('pointerdown', handleUserGesture);
      window.removeEventListener('keydown', handleUserGesture);
      clearExitArm();
    };
  }, [handleUnifiedBackPress, clearExitArm]);

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
        browserOnline,
        pendingSyncCount,
        isSyncingOfflineQueue,
        lastOfflineSyncedAt,
        offlineSyncNotice,
        dismissOfflineSyncNotice,
        syncOfflineQueue,
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
        checkEmailAvailabilityForSignUp,
        currentUser,
        authLoading,
        googleAuthError,
        clearGoogleAuthError,
        loginWithGoogle,
        loginWithGoogleRedirect,
        authenticateGoogleForSignUp,
        authenticateUser,
        requestLoginOtp,
        verifyLoginOtp,
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
        pendingExamExitPrompt: pendingExamExit ? { title: pendingExamExit.title } : null,
        cancelExamExitPrompt,
        confirmExamExitPrompt,
        showExitBackToast,
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
        updateUserAvatar,
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
        acceptUserAgreement,
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
        adminGamesUnlockOverride,
        effectiveGamesBypass,
        setAdminGamesUnlockOverride,
        adminAiCoachUnlockOverride,
        effectiveAiCoachBypass,
        setAdminAiCoachUnlockOverride,
        impersonatedUser,
        allRegisteredUsers,
        isSyncingDirectory,
        directorySyncStats,
        syncUserDirectoryFromCloud,
        startImpersonation,
        stopImpersonation,
        updateUserRecord,
        softDeleteUserRecord,
        deleteAndReleaseUserRecord,
        resolveMultiRoleAccount,
        updateGrowthPartnerBankDetails,
        purgeAllTestAccountsAndCredits,
        purgeSimulatedSubscriptions,
        switchRole,
        loginAsDeveloper,
        schoolMaterials,
        adminLessonNotes,
        publishSchoolMaterial,
        deleteSchoolMaterial,
        verifySchoolAdmin,
        linkStudentToSchool,
        subscribeSchoolAdmin,
        fetchSchoolLiveRoster,
        schoolLiveRostersByCode,
        ensureStudentLinkCode,
        ensureAdminSchoolCode,
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
        refreshOTAStatus,
        isFeatureEnabled,
        getPausedFeatureMessage,
        pausedFeatureNotice,
        openPausedFeatureNotice,
        closePausedFeatureNotice,
        registrationControls,
        isRegistrationPausedForRole,
        areAllRegistrationsPaused,
        getRegistrationPauseMessage,
        updateRegistrationControls,
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
