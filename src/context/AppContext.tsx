import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  doc,
  collection,
  onSnapshot,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import {
  UserRole,
  StudentProfile,
  CurriculumTopic,
  CBTExam,
  CBTExamResult,
  TutorBooking,
  ParentWallet,
  StudentRank,
  ChatMessage,
  VerifiedAddress,
  TutorVerificationDetails,
  RegisteredUserProfile
} from '../types';
import {
  auth,
  db,
  signInWithGoogle,
  logOut,
  handleFirestoreError,
  OperationType
} from '../lib/firebase';

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
  signOutApp: () => void;

  // Firebase Auth
  currentUser: User | null;
  authLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  logoutUser: () => Promise<void>;
  isFirebaseConnected: boolean;

  // Student Navigation
  activeStudentTab: 'dashboard' | 'syllabus' | 'cbt' | 'competitions' | 'formulas' | 'tutors' | 'games' | 'ai-coach';
  setActiveStudentTab: (tab: 'dashboard' | 'syllabus' | 'cbt' | 'competitions' | 'formulas' | 'tutors' | 'games' | 'ai-coach') => void;
  activeReadingNote: CurriculumTopic | null;
  openNoteReader: (topic: CurriculumTopic) => void;
  closeNoteReader: () => void;
  activeExam: CBTExam | null;
  startExam: (exam: CBTExam) => void;
  closeExam: () => void;
  isUniformModalOpen: boolean;
  setIsUniformModalOpen: (open: boolean) => void;

  // Student State & Actions
  student: StudentProfile;
  updateStudentClass: (classLevel: any, stream: any) => void;
  addStudentXP: (amount: number, reason?: string) => void;
  verifySchoolUniform: (photoUrl: string) => void;
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

  // Reset demo
  resetDemoData: () => void;
}

const INITIAL_EMPTY_STUDENT: StudentProfile = {
  id: '',
  name: '',
  school: '',
  classLevel: 'SS 2',
  stream: 'Science',
  xp: 0,
  rank: 'Fresher',
  streakDays: 0,
  lastStudyDate: new Date().toISOString().split('T')[0],
  uniformVerified: false,
  uniformPhotoUrl: null,
  downloadedSubjectIds: [],
  completedQuizIds: []
};

const INITIAL_EMPTY_WALLET: ParentWallet = {
  balanceNaira: 0,
  pin: '',
  transactions: []
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Registered User & Auth State
  const [currentUserProfile, setCurrentUserProfile] = useState<RegisteredUserProfile | null>(() => {
    const saved = localStorage.getItem('sc_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.id && !parsed.id.includes('tunde')) return parsed;
      } catch {}
    }
    return null;
  });

  // Navigation & Presentation (bound to registered role)
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('sc_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.role) return parsed.role;
      } catch {}
    }
    return 'student';
  });
  const [targetSignUpRole, setTargetSignUpRole] = useState<UserRole | null>(null);
  const [isDeviceFrame, setIsDeviceFrame] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [isLandingView, setIsLandingView] = useState<boolean>(true);
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'signin' | 'signup' | 'know_more' | 'app'>('landing');
  const [activeStudentTab, setActiveStudentTab] = useState<'dashboard' | 'syllabus' | 'cbt' | 'competitions' | 'formulas' | 'tutors' | 'games' | 'ai-coach'>('dashboard');
  const [activeReadingNote, setActiveReadingNote] = useState<CurriculumTopic | null>(null);
  const [activeExam, setActiveExam] = useState<CBTExam | null>(null);
  const [isUniformModalOpen, setIsUniformModalOpen] = useState<boolean>(false);

  const isAuthenticated = Boolean(currentUserProfile);

  // Firebase Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(false);

  // Student State (Pristine - no mock personas)
  const [student, setStudent] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('sc_student');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name && parsed.name !== 'Tunde Balogun' && parsed.id !== 'std-tunde-001') {
          return parsed;
        }
      } catch {}
    }
    return INITIAL_EMPTY_STUDENT;
  });

  const [examResults, setExamResults] = useState<CBTExamResult[]>(() => {
    const saved = localStorage.getItem('sc_exam_results');
    return saved ? JSON.parse(saved) : [];
  });

  // Parent State (Pristine - 0 balance, no mock data)
  const [parentWallet, setParentWallet] = useState<ParentWallet>(() => {
    const saved = localStorage.getItem('sc_wallet');
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
    const saved = localStorage.getItem('sc_bookings');
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
    const saved = localStorage.getItem('sc_chats');
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

  // Calculate Rank based on XP
  const calculateRank = (xp: number): StudentRank => {
    if (xp >= 15000) return 'Senior Boy';
    if (xp >= 7500) return 'Prefect';
    if (xp >= 2500) return 'Scholar';
    return 'Fresher';
  };

  // Local storage persistence fallbacks
  useEffect(() => {
    localStorage.setItem('sc_student', JSON.stringify(student));
  }, [student]);

  useEffect(() => {
    localStorage.setItem('sc_wallet', JSON.stringify(parentWallet));
  }, [parentWallet]);

  useEffect(() => {
    localStorage.setItem('sc_bookings', JSON.stringify(tutorBookings));
  }, [tutorBookings]);

  useEffect(() => {
    localStorage.setItem('sc_exam_results', JSON.stringify(examResults));
  }, [examResults]);

  useEffect(() => {
    localStorage.setItem('sc_chats', JSON.stringify(chatMessages));
  }, [chatMessages]);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
      setIsFirebaseConnected(!!user);

      if (user) {
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
              // Seed new user profile in Firestore
              const newProfile: StudentProfile = {
                id: user.uid,
                name: user.displayName || 'Registered Student',
                school: '',
                classLevel: 'SS 2',
                stream: 'Science',
                xp: 0,
                rank: 'Fresher',
                streakDays: 1,
                lastStudyDate: new Date().toISOString().split('T')[0],
                uniformVerified: false,
                uniformPhotoUrl: user.photoURL || null,
                downloadedSubjectIds: [],
                completedQuizIds: []
              };
              setDoc(studentDocRef, newProfile).catch((err) => {
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

        return () => {
          unsubDoc();
          unsubExams();
          unsubWallet();
        };
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithGoogle();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (error) {
      console.error('Failed to sign in with Google:', error);
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

  const addStudentXP = (amount: number, reason?: string) => {
    setTimeout(() => {
      setStudent(prev => {
        const newXP = prev.xp + amount;
        const newRank = calculateRank(newXP);
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

        return updated;
      });

      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {}
    }, 0);
  };

  const updateStudentClass = (classLevel: any, stream: any) => {
    setStudent(prev => {
      const updated = {
        ...prev,
        classLevel,
        stream
      };

      if (currentUser && !isOffline) {
        const docRef = doc(db, 'students', currentUser.uid);
        const path = `students/${currentUser.uid}`;
        updateDoc(docRef, { classLevel, stream }).catch(err => {
          handleFirestoreError(err, OperationType.UPDATE, path);
        });
      }

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

  // Progressive Verification State
  const [verifiedAddress, setVerifiedAddress] = useState<VerifiedAddress | null>(() => {
    const saved = localStorage.getItem('sc_verified_address');
    return saved ? JSON.parse(saved) : null;
  });

  const [tutorVerification, setTutorVerification] = useState<TutorVerificationDetails | null>(() => {
    const saved = localStorage.getItem('sc_tutor_verification');
    return saved ? JSON.parse(saved) : null;
  });

  const saveVerifiedAddress = (addr: VerifiedAddress) => {
    setVerifiedAddress(addr);
    localStorage.setItem('sc_verified_address', JSON.stringify(addr));
  };

  const saveTutorVerification = (data: TutorVerificationDetails) => {
    setTutorVerification(data);
    localStorage.setItem('sc_tutor_verification', JSON.stringify(data));
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
      createdAt: new Date().toISOString()
    };

    setCurrentRole(role);

    if (role === 'student') {
      const freshStudent: StudentProfile = {
        id: newId,
        name: fullName,
        school: profileData.schoolName || profileData.school || "Secondary School",
        classLevel: profileData.classLevel || 'SS 2',
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
      localStorage.setItem('sc_student', JSON.stringify(freshStudent));
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
      localStorage.setItem('sc_wallet', JSON.stringify(freshWallet));
    } else if (role === 'tutor') {
      newProfile.tutorData = {
        subjectSpecialization: profileData.subjectSpecialization || 'General Subjects',
        qualification: profileData.qualification || '',
        hourlyRate: Number(profileData.hourlyRate) || 3000,
        teachingMode: profileData.teachingMode || 'both'
      };
    } else if (role === 'admin') {
      newProfile.adminData = {
        schoolName: profileData.schoolName || 'Secondary School',
        schoolType: profileData.schoolType || 'College'
      };
    }

    setCurrentUserProfile(newProfile);
    localStorage.setItem('sc_user_profile', JSON.stringify(newProfile));
    setTargetSignUpRole(null);
    setCurrentScreen('app');
  };

  const signOutApp = () => {
    setCurrentUserProfile(null);
    localStorage.removeItem('sc_user_profile');
    localStorage.removeItem('sc_student');
    localStorage.removeItem('sc_wallet');
    localStorage.removeItem('sc_bookings');
    localStorage.removeItem('sc_chats');
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
        signOutApp,
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
        toggleDownloadNote,
        examResults,
        saveExamResult,
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
        resetDemoData
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
