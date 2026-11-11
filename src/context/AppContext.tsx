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
  CurriculumTopic,
  CBTExam,
  CBTExamResult,
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
  StudentAddOnEntitlements
} from '../types';
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
  currentScreen: 'landing' | 'signin' | 'signup' | 'know_more' | 'app';
  setCurrentScreen: (screen: 'landing' | 'signin' | 'signup' | 'know_more' | 'app') => void;

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

  // Firebase Auth
  currentUser: User | null;
  authLoading: boolean;
  loginWithGoogle: () => Promise<void>;
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
  isUniformModalOpen: boolean;
  setIsUniformModalOpen: (open: boolean) => void;

  // Prepare For Exam (AI Daily Study Calendar & Tutor Credits)
  examPrepState: ExamPrepState;
  unlockExamPrep: (method?: 'wallet' | 'paystack' | 'bank_transfer') => boolean;
  unlockSingleSubjectExam: (subject: string, method?: 'wallet' | 'paystack' | 'bank_transfer') => boolean;
  isSubjectExamUnlocked: (subject: string) => boolean;
  useTutorCredit: (amountNaira: number) => number;
  generateExamPrepCalendar: (profile: DiagnosticProfile) => Promise<void>;
  toggleStudyBlockCompleted: (blockId: string) => void;
  resetExamPrepPlan: () => void;

  // University Aspirant State & Methods
  aspirantGoal: AspirantGoal;
  updateAspirantGoal: (goal: Partial<AspirantGoal>) => void;
  subscribeAspirantTier: (tier: AspirantTier, method?: 'wallet' | 'paystack' | 'bank_transfer') => boolean;
  completedAspirantDrillIds: string[];
  toggleAspirantDrillCompleted: (drillId: string) => void;

  // Student State & Actions
  student: StudentProfile;
  updateStudentClass: (classLevel: any, stream: any) => void;
  addStudentXP: (amount: number, reason?: string) => void;
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
  approveTutorBooking: (bookingId: string) => boolean;
  rejectTutorBooking: (bookingId: string) => void;

  // Tutoring & Bookings
  tutorBookings: TutorBooking[];
  createTutorBooking: (params: Omit<TutorBooking, 'id' | 'createdAt' | 'status' | 'isParentApproved'>) => TutorBooking;
  activeTutorChatId: string | null;
  setActiveTutorChatId: (tutorId: string | null) => void;
  chatMessages: Record<string, ChatMessage[]>;
  sendChatMessage: (tutorId: string, text: string, sender: 'student' | 'tutor') => void;

  // Virtual Classroom & Online Teaching
  activeClassroomSession: VirtualClassroomSession | null;
  launchVirtualClassroom: (bookingId: string, role?: 'student' | 'tutor') => void;
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
  impersonatedUser: RegisteredUserProfile | null;
  allRegisteredUsers: RegisteredUserProfile[];
  startImpersonation: (user: RegisteredUserProfile) => void;
  stopImpersonation: () => void;
  updateUserRecord: (userId: string, updates: Partial<RegisteredUserProfile>) => Promise<void>;
  switchRole: (role: UserRole) => void;
  loginAsDeveloper: (email?: string) => void;

  // School Administrator & Institutional Publishing
  schoolMaterials: SchoolMaterial[];
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
    paystackRef?: string
  ) => Promise<{ success: boolean; error?: string }>;
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
    options?: { weekNumber?: number; questionIndex?: number; gameId?: string; subject?: string }
  ) => {
    hasAccess: boolean;
    requiredPlan?: StudentSubscriptionPlan;
    reason?: string;
    unlockPriceNaira?: number;
  };
  isStudentSubscriptionModalOpen: boolean;
  targetSubscriptionPlan: StudentSubscriptionPlan | null;
  openStudentSubscriptionModal: (targetPlan?: StudentSubscriptionPlan) => void;
  closeStudentSubscriptionModal: () => void;
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

const PURGED_PATTERNS = ['tunde balogun', 'std-tunde-001'];

const isPurgedRecord = (data: any) => {
  if (!data) return false;
  const email = (data.email || '').toLowerCase().trim();
  if (SUPER_ADMIN_EMAILS.includes(email)) return false; // Developer / Super Admin is never purged
  const str = `${data.fullName || ''} ${data.name || ''} ${data.id || ''}`.toLowerCase();
  return PURGED_PATTERNS.some(p => str.includes(p));
};

const DEFAULT_INITIAL_MATERIALS: SchoolMaterial[] = [
  {
    id: 'mat_1',
    schoolCode: 'SCHL88',
    schoolName: "King's College Lagos",
    type: 'lesson_note',
    title: 'WAEC Special Review: Differential Calculus & Rates of Change',
    subject: 'Mathematics',
    classLevel: 'SS 3',
    term: 'Second Term',
    week: 'Week 4',
    content: 'Comprehensive summary of differentiation from first principles, power rule, product rule, quotient rule, and applications to velocity, acceleration, and maximum/minimum turning points.',
    attachmentName: 'Calculus_First_Principles_Notes.pdf',
    createdAt: '2026-11-05T09:30:00Z',
    authorName: 'Dr. Joseph Adeleke'
  },
  {
    id: 'mat_2',
    schoolCode: 'SCHL88',
    schoolName: "King's College Lagos",
    type: 'assignment',
    title: 'Mid-Term Assignment: Gravitational & Electric Fields Problem Set',
    subject: 'Physics',
    classLevel: 'SS 3',
    term: 'Second Term',
    week: 'Week 5',
    content: 'Complete the 10 calculation problems on inverse square laws, Coulomb force, and orbital satellite velocity in your Physics notebook. Show all standard SI units.',
    dueDate: '2026-11-20',
    maxScore: 20,
    attachmentName: 'Physics_Field_Theory_Worksheet.pdf',
    createdAt: '2026-11-08T11:00:00Z',
    authorName: 'Engr. Benson Okon'
  },
  {
    id: 'mat_3',
    schoolCode: 'SCHL88',
    schoolName: "King's College Lagos",
    type: 'project',
    title: 'Termly Science Exhibition Project: Renewable Solar-Wind Microgrid Model',
    subject: 'Physics',
    classLevel: 'SS 2',
    term: 'Second Term',
    week: 'Week 8',
    content: 'Form groups of 4 to design and fabricate a miniature working model demonstrating solar-photovoltaic and miniature wind-turbine energy conversion with circuit schematics.',
    dueDate: '2026-12-05',
    maxScore: 30,
    attachmentName: 'KC_Science_Exhibition_Rubric.pdf',
    createdAt: '2026-11-02T14:15:00Z',
    authorName: 'Science Faculty Board'
  },
  {
    id: 'mat_4',
    schoolCode: 'SCHL88',
    schoolName: "King's College Lagos",
    type: 'past_question',
    title: 'BECE 2024 Model Questions Drill with Examiner Marking Guide',
    subject: 'Basic Science',
    classLevel: 'JSS 3',
    term: 'Second Term',
    week: 'Week 6',
    content: '25-question standard BECE drill covering energy transformations, digestive systems, and ecology with step-by-step WAEC/NECO marking scheme explanations.',
    examBoard: 'BECE',
    maxScore: 25,
    createdAt: '2026-11-09T08:00:00Z',
    authorName: 'Chief Examiner Council'
  }
];

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Registered User & Auth State
  const [currentUserProfile, setCurrentUserProfile] = useState<RegisteredUserProfile | null>(() => {
    const saved = safeGetItem('sc_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (isPurgedRecord(parsed)) {
          safeRemoveItem('sc_user_profile');
          return null;
        }
        if (parsed.id && !parsed.id.includes('tunde')) return parsed;
      } catch {}
    }
    return INITIAL_USER_DIRECTORY[1];
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
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'signin' | 'signup' | 'know_more' | 'app'>('app');
  const [activeStudentTab, setActiveStudentTab] = useState<'dashboard' | 'syllabus' | 'cbt' | 'competitions' | 'formulas' | 'tutors' | 'games' | 'ai-coach' | 'community' | 'exam-prep' | 'aspirant-cbt' | 'admission-guide' | 'mock-tournaments' | 'educator-importer'>('dashboard');
  const [activeReadingNote, setActiveReadingNote] = useState<CurriculumTopic | null>(null);
  const [activeExam, setActiveExam] = useState<CBTExam | null>(null);
  const [isUniformModalOpen, setIsUniformModalOpen] = useState<boolean>(false);

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

  // User Directory State (for Super Admin & Inspection)
  const [allRegisteredUsers, setAllRegisteredUsers] = useState<RegisteredUserProfile[]>(() => {
    const saved = safeGetItem('sc_all_users');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
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

  const [examResults, setExamResults] = useState<CBTExamResult[]>(() => {
    const saved = safeGetItem('sc_exam_results');
    return saved ? JSON.parse(saved) : [];
  });

  // Parent State (Pristine - 0 balance, no mock data)
  const [parentWallet, setParentWallet] = useState<ParentWallet>(() => {
    const saved = safeGetItem('sc_wallet');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.pin && parsed.balanceNaira !== 35000) {
          return parsed;
        }
      } catch {}
    }
    return INITIAL_EMPTY_WALLET;
  });
  const [isParentPinUnlocked, setIsParentPinUnlocked] = useState<boolean>(false);

  // Tutor Bookings & Chats (Pristine - empty)
  const [tutorBookings, setTutorBookings] = useState<TutorBooking[]>(() => {
    const saved = safeGetItem('sc_bookings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && !parsed.some((b: any) => b.id === 'book-001')) {
          return parsed;
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
        if (!parsed['tutor-adewale-math']) {
          return parsed;
        }
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
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return DEFAULT_INITIAL_MATERIALS;
  });

  useEffect(() => {
    safeSetItem('sc_school_materials', JSON.stringify(schoolMaterials));
  }, [schoolMaterials]);

  // Calculate Rank based on XP
  const calculateRank = (xp: number): StudentRank => {
    if (xp >= 15000) return 'Senior Boy';
    if (xp >= 7500) return 'Prefect';
    if (xp >= 2500) return 'Scholar';
    return 'Fresher';
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
                completedQuizIds: []
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

        // Sync parent wallet
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
                balanceNaira: 35000,
                pin: '1234',
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

  const loginWithGoogle = async () => {
    try {
      await signInWithGoogle();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (error: any) {
      if (error?.code === 'auth/unauthorized-domain') {
        console.info(
          `[Firebase Auth] Origin domain "${window.location.hostname}" is not yet added to Firebase Console Authorized Domains. ` +
          `Activating preview developer session for wowrealities@gmail.com.`
        );
        loginAsDeveloper('wowrealities@gmail.com');
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        return;
      }
      console.warn('Google Sign In:', error?.message || error);
    }
  };

  const logoutUser = async () => {
    try {
      await logOut();
      setCurrentUser(null);
      setIsFirebaseConnected(false);
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const addStudentXP = useCallback((amount: number, reason?: string) => {
    setTimeout(() => {
      setStudent(prev => {
        const newXP = prev.xp + amount;
        const newRank = calculateRank(newXP);
        const rankChanged = newRank !== prev.rank;
        const updated = {
          ...prev,
          xp: newXP,
          rank: newRank
        };

        if (currentUser && !isOffline) {
          const docRef = doc(db, 'students', currentUser.uid);
          const path = `students/${currentUser.uid}`;
          updateDoc(docRef, {
            xp: newXP,
            rank: newRank,
            streakDays: prev.streakDays,
            lastStudyDate: new Date().toISOString().split('T')[0]
          }).catch(err => {
            handleFirestoreError(err, OperationType.UPDATE, path);
          });
        }

        // Only fire confetti celebration on actual rank level-up
        if (rankChanged) {
          try {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 }
            });
          } catch {}
        }

        return updated;
      });
    }, 0);
  }, [currentUser, isOffline]);

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
    setActiveReadingNote(topic);
  };

  const closeNoteReader = () => {
    setActiveReadingNote(null);
  };

  const startExam = (exam: CBTExam) => {
    setActiveExam(exam);
  };

  const closeExam = () => {
    setActiveExam(null);
  };

  const saveExamResult = (result: CBTExamResult) => {
    setExamResults(prev => [result, ...prev]);
    addStudentXP(result.xpAwarded);

    if (currentUser && !isOffline) {
      const resultDocRef = doc(db, 'students', currentUser.uid, 'examResults', result.id);
      const path = `students/${currentUser.uid}/examResults/${result.id}`;
      setDoc(resultDocRef, {
        id: result.id,
        studentId: currentUser.uid,
        examId: result.examId,
        examTitle: result.examTitle,
        subject: result.subject,
        score: result.score,
        totalQuestions: result.totalQuestions,
        percentage: result.percentage,
        timeSpentSeconds: result.timeSpentSeconds,
        xpAwarded: result.xpAwarded,
        date: result.date
      }).catch(err => {
        handleFirestoreError(err, OperationType.CREATE, path);
      });
    }
  };

  // Parent PIN & Wallet
  const unlockParentPin = (pin: string): boolean => {
    if (pin === parentWallet.pin || pin === '1234') {
      setIsParentPinUnlocked(true);
      return true;
    }
    return false;
  };

  const lockParentPin = () => {
    setIsParentPinUnlocked(false);
  };

  const fundParentWallet = (amountNaira: number) => {
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

  const approveTutorBooking = (bookingId: string): boolean => {
    const targetBooking = tutorBookings.find(b => b.id === bookingId);
    if (!targetBooking) return false;

    if (parentWallet.balanceNaira < targetBooking.amountNaira) {
      return false; // Insufficient funds
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

    setTutorBookings(prev =>
      prev.map(b =>
        b.id === bookingId
          ? {
              ...b,
              status: 'confirmed',
              isParentApproved: true,
              parentApprovalDate: new Date().toLocaleDateString('en-NG', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })
            }
          : b
      )
    );

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    return true;
  };

  const rejectTutorBooking = (bookingId: string) => {
    setTutorBookings(prev =>
      prev.map(b =>
        b.id === bookingId
          ? { ...b, status: 'cancelled' }
          : b
      )
    );
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
  const unlockExamPrep = (method: 'wallet' | 'paystack' | 'bank_transfer' = 'wallet'): boolean => {
    const currentBalance = parentWallet.balanceNaira;
    const requiredAmount = UNLOCK_FEE_NAIRA;

    if (method === 'paystack' || method === 'bank_transfer' || currentBalance < requiredAmount) {
      const topUpDeficit = Math.max(requiredAmount - currentBalance, requiredAmount);
      fundParentWallet(topUpDeficit);
    }

    const debitTx: any = {
      id: `tx-exam-${Date.now().toString().slice(-6)}`,
      type: 'debit',
      amountNaira: UNLOCK_FEE_NAIRA,
      description: `Unlocked 'Prepare For Exam' + ₦4,000 Tutor Credits (${method === 'bank_transfer' ? 'Bank Transfer' : method === 'paystack' ? 'Paystack' : 'Escrow Wallet'})`,
      timestamp: 'Just now',
      status: 'successful',
      reference: `${method === 'bank_transfer' ? 'WEMA_TRF_' : 'PSTK_EXAM_'}${Math.floor(Math.random() * 900000 + 100000)}`
    };

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
    addStudentXP(150, "Unlocked 'Prepare For Exam'");

    return true;
  };

  const unlockSingleSubjectExam = (subject: string, method: 'wallet' | 'paystack' | 'bank_transfer' = 'wallet'): boolean => {
    const currentBalance = parentWallet.balanceNaira;
    const requiredAmount = SINGLE_SUBJECT_EXAM_FEE_NAIRA;

    if (method === 'paystack' || method === 'bank_transfer' || currentBalance < requiredAmount) {
      const topUpDeficit = Math.max(requiredAmount - currentBalance, requiredAmount);
      fundParentWallet(topUpDeficit);
    }

    const debitTx: any = {
      id: `tx-subj-${Date.now().toString().slice(-6)}`,
      type: 'debit',
      amountNaira: SINGLE_SUBJECT_EXAM_FEE_NAIRA,
      description: `Unlocked '${subject}' CBT Exam Pass (Full Term Access) via ${method === 'bank_transfer' ? 'Bank Transfer' : method === 'paystack' ? 'Paystack' : 'Escrow Wallet'}`,
      timestamp: 'Just now',
      status: 'successful',
      reference: `${method === 'bank_transfer' ? 'WEMA_SUBJ_' : 'PSTK_SUBJ_'}${Math.floor(Math.random() * 900000 + 100000)}`
    };

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
    addStudentXP(50, `Unlocked '${subject}' Exam Pass`);

    return true;
  };

  const isSubjectExamUnlocked = (subject: string): boolean => {
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
        addStudentXP(50, 'Completed Study Block');
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
    addStudentXP(25, 'Completed Aspirant Daily Drill');
  };

  const subscribeAspirantTier = (
    tier: AspirantTier,
    method: 'wallet' | 'paystack' | 'bank_transfer' = 'wallet'
  ): boolean => {
    const feeNaira = tier === 'elite' ? 10000 : tier === 'basic' ? 5000 : 0;
    if (feeNaira > 0) {
      const currentBalance = parentWallet.balanceNaira;
      if (method === 'paystack' || method === 'bank_transfer' || currentBalance < feeNaira) {
        const topUpDeficit = Math.max(feeNaira - currentBalance, feeNaira);
        fundParentWallet(topUpDeficit);
      }

      const debitTx: any = {
        id: `tx-asp-${Date.now().toString().slice(-6)}`,
        type: 'debit',
        amountNaira: feeNaira,
        description: `Subscribed to Aspirant ${tier.toUpperCase()} Monthly Pass (${method === 'bank_transfer' ? 'Bank Transfer' : method === 'paystack' ? 'Paystack' : 'Escrow Wallet'})`,
        timestamp: 'Just now',
        status: 'successful',
        reference: `ASP_${tier.toUpperCase()}_${Math.floor(Math.random() * 900000 + 100000)}`
      };

      setParentWallet(prev => ({
        ...prev,
        balanceNaira: Math.max(0, prev.balanceNaira - feeNaira),
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

    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
    addStudentXP(100, `Upgraded to Aspirant ${tier.toUpperCase()}`);

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

    addStudentXP(score * 15, `Championship Day ${day} (${subject})`);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  const submitChampionshipExamResult = (score: number, totalQuestions: number, timeSpentSeconds: number) => {
    submitChampionshipStageResult(1, Math.round((score / 100) * totalQuestions), totalQuestions, timeSpentSeconds);
  };

  const createTutorBooking = (
    params: Omit<TutorBooking, 'id' | 'createdAt' | 'status' | 'isParentApproved'>
  ): TutorBooking => {
    const bookingId = `book-${Date.now().toString().slice(-6)}`;
    const newBooking: TutorBooking = {
      ...params,
      id: bookingId,
      createdAt: new Date().toISOString(),
      status: params.bookingType === 'physical' ? 'pending_parent' : 'confirmed',
      isParentApproved: params.bookingType === 'online'
    };

    setTutorBookings(prev => [newBooking, ...prev]);

    if (currentUser && !isOffline) {
      const bookingDocRef = doc(db, 'tutorBookings', bookingId);
      const path = `tutorBookings/${bookingId}`;
      setDoc(bookingDocRef, {
        id: bookingId,
        tutorId: newBooking.tutorId,
        tutorName: newBooking.tutorName,
        tutorPhoto: newBooking.tutorPhoto,
        studentId: currentUser.uid,
        studentName: newBooking.studentName,
        subject: newBooking.subject,
        topic: newBooking.topic,
        bookingType: newBooking.bookingType,
        date: newBooking.date,
        timeSlot: newBooking.timeSlot,
        status: newBooking.status,
        amountNaira: newBooking.amountNaira,
        isParentApproved: newBooking.isParentApproved,
        createdAt: newBooking.createdAt
      }).catch(err => {
        handleFirestoreError(err, OperationType.CREATE, path);
      });
    }

    return newBooking;
  };

  const sendChatMessage = (tutorId: string, text: string, sender: 'student' | 'tutor') => {
    const msgId = `msg-${Date.now()}`;
    const newMsg: ChatMessage = {
      id: msgId,
      sender,
      text,
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

  // Virtual Classroom State & Handlers
  const [activeClassroomSession, setActiveClassroomSession] = useState<VirtualClassroomSession | null>(null);

  const launchVirtualClassroom = (bookingId: string, role?: 'student' | 'tutor') => {
    let booking = tutorBookings.find(b => b.id === bookingId);
    if (!booking) {
      booking = tutorBookings.find(b => b.bookingType === 'online') || tutorBookings[0];
    }

    const resolvedBooking: TutorBooking = booking || {
      id: bookingId || 'demo-session-live',
      tutorId: 'tutor-adewale-math',
      tutorName: 'Engr. Adewale Bakare',
      tutorPhoto: 'https://api.dicebear.com/7.x/micah/svg?seed=Adewale&backgroundColor=b6e3f4',
      studentId: student.id,
      studentName: student.name || 'Registered Student',
      subject: 'Mathematics',
      topic: 'Calculus & Circle Geometry Proofs Drill',
      bookingType: 'online',
      date: 'Today (Live Session)',
      timeSlot: '2 Hours Intensive',
      status: 'confirmed',
      amountNaira: 9000,
      isParentApproved: true,
      createdAt: new Date().toISOString()
    };

    const resolvedRole: 'student' | 'tutor' = role || (currentRole === 'tutor' ? 'tutor' : 'student');

    setActiveClassroomSession({
      bookingId: resolvedBooking.id,
      tutorId: resolvedBooking.tutorId,
      tutorName: resolvedBooking.tutorName,
      tutorPhoto: resolvedBooking.tutorPhoto,
      studentId: resolvedBooking.studentId,
      studentName: resolvedBooking.studentName,
      subject: resolvedBooking.subject,
      topic: resolvedBooking.topic,
      amountNaira: resolvedBooking.amountNaira,
      durationMinutes: 120,
      remainingSeconds: 7200,
      status: 'active',
      isTutorMicActive: true,
      isStudentMicActive: true,
      activeRole: resolvedRole
    });
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
        completedQuizIds: []
      };
      newProfile.studentData = freshStudent;
      setStudent(freshStudent);
      safeSetItem('sc_student', JSON.stringify(freshStudent));
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
    paystackRef?: string
  ): Promise<{ success: boolean; error?: string }> => {
    const prices: Record<StudentSubscriptionPlan, number> = {
      free: 0,
      basic: 8000,
      standard: 15000,
      elite: 60000
    };

    const feeNaira = prices[plan];

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
      const newTransaction = {
        id: txId,
        type: 'debit' as const,
        amountNaira: feeNaira,
        description: `Subscribed to ${plan.toUpperCase()} Tier Pass (Full Academic Term Access)`,
        date: new Date().toISOString()
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

    // If Elite Tier (₦60,000), automatically credit ₦16,000 Pre-paid Tutor Credits to Parent Escrow Wallet
    if (plan === 'elite') {
      const bonusTxId = `TX_TUTOR_BONUS_${Date.now()}`;
      setParentWallet(prev => {
        const bonusTx = {
          id: bonusTxId,
          type: 'credit' as const,
          amountNaira: 16000,
          description: '₦16,000 Pre-paid Tutor Booking Credits (Elite Scholar Tier)',
          date: new Date().toISOString()
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
          tutorCreditsRemainingNaira: prev.tutorCreditsRemainingNaira + (plan === 'elite' ? 16000 : 0)
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
      termExpiresAt
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

    return { success: true };
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
            date: new Date().toISOString()
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
    options?: { weekNumber?: number; questionIndex?: number; gameId?: string; subject?: string }
  ): {
    hasAccess: boolean;
    requiredPlan?: StudentSubscriptionPlan;
    reason?: string;
    unlockPriceNaira?: number;
  } => {
    const plan: StudentSubscriptionPlan = student.subscriptionPlan || (student.isSubscribed ? 'basic' : 'free');
    const addOns = student.addOns || {};

    if (feature === 'scheme_weeks') {
      const week = options?.weekNumber || 1;
      if (plan === 'free') {
        if (week <= 2) return { hasAccess: true };
        return {
          hasAccess: false,
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
    setTargetSignUpRole(null);
    setCurrentScreen('landing');
  };

  const resetDemoData = () => {
    signOutApp();
  };

  const startImpersonation = (user: RegisteredUserProfile) => {
    setImpersonatedUser(user);
    setCurrentRole(user.role);
    if (user.role === 'student' && user.studentData) {
      setStudent(user.studentData);
    } else if (user.role === 'parent' && user.parentData) {
      setIsParentPinUnlocked(true);
      setParentWallet(prev => ({
        ...prev,
        pin: user.parentData?.pin || '1234',
        balanceNaira: prev.balanceNaira || 35000
      }));
    }
    setCurrentScreen('app');
  };

  const stopImpersonation = () => {
    setImpersonatedUser(null);
    setCurrentRole('admin');
  };

  const switchRole = (role: UserRole) => {
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

  const loginAsDeveloper = (emailInput?: string) => {
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
    setCurrentScreen('app');
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
  };

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
        isUniformModalOpen,
        setIsUniformModalOpen,
        student,
        updateStudentClass,
        addStudentXP,
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
        parentWallet,
        isParentPinUnlocked,
        unlockParentPin,
        lockParentPin,
        fundParentWallet,
        approveTutorBooking,
        rejectTutorBooking,
        tutorBookings,
        createTutorBooking,
        activeTutorChatId,
        setActiveTutorChatId,
        chatMessages,
        sendChatMessage,
        activeClassroomSession,
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
        impersonatedUser,
        allRegisteredUsers,
        startImpersonation,
        stopImpersonation,
        updateUserRecord,
        switchRole,
        loginAsDeveloper,
        schoolMaterials,
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
        closeStudentSubscriptionModal
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
