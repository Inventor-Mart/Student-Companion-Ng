import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserRole,
  StudentProfile,
  CurriculumTopic,
  CBTExam,
  CBTExamResult,
  TutorBooking,
  ParentWallet,
  StudentRank,
  ChatMessage
} from '../types';
import { NIGERIAN_CURRICULUM_TOPICS } from '../data/curriculumData';
import { CBT_EXAMS_DATABASE } from '../data/cbtExamData';
import { VETTED_NIGERIAN_TUTORS } from '../data/tutorsData';

interface AppContextType {
  // Navigation & Frame
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  isDeviceFrame: boolean;
  setIsDeviceFrame: (val: boolean | ((prev: boolean) => boolean)) => void;
  isOffline: boolean;
  setIsOffline: (val: boolean | ((prev: boolean) => boolean)) => void;

  // Student Navigation
  activeStudentTab: 'dashboard' | 'syllabus' | 'cbt' | 'competitions' | 'formulas' | 'tutors' | 'games';
  setActiveStudentTab: (tab: 'dashboard' | 'syllabus' | 'cbt' | 'competitions' | 'formulas' | 'tutors' | 'games') => void;
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

const DEFAULT_STUDENT: StudentProfile = {
  id: 'std-tunde-001',
  name: 'Tunde Balogun',
  school: "King's College, Lagos",
  classLevel: 'SS 2',
  stream: 'Science',
  xp: 4250,
  rank: 'Scholar',
  streakDays: 8,
  lastStudyDate: new Date().toISOString().split('T')[0],
  uniformVerified: false,
  uniformPhotoUrl: null,
  downloadedSubjectIds: ['bio-ss2-genetics', 'phy-ss2-projectiles'],
  completedQuizIds: ['quiz-ss2-phy-projectiles']
};

const DEFAULT_WALLET: ParentWallet = {
  balanceNaira: 35000,
  pin: '1234',
  transactions: [
    {
      id: 'tx-001',
      type: 'credit',
      amountNaira: 50000,
      description: 'Wallet Top-up via Paystack (Debit Card)',
      timestamp: 'Yesterday at 04:15 PM',
      status: 'successful',
      reference: 'PSTK_98124890'
    },
    {
      id: 'tx-002',
      type: 'debit',
      amountNaira: 15000,
      description: 'Term 2 Premium Scheme & WAEC Drills Access',
      timestamp: 'Yesterday at 04:20 PM',
      status: 'successful',
      reference: 'SUB_0091238'
    }
  ]
};

const DEFAULT_BOOKINGS: TutorBooking[] = [
  {
    id: 'book-001',
    tutorId: 'tutor-adewale-math',
    tutorName: 'Engr. Adewale Bakare',
    tutorPhoto: 'https://api.dicebear.com/7.x/micah/svg?seed=Adewale&backgroundColor=b6e3f4',
    studentId: 'std-tunde-001',
    studentName: 'Tunde Balogun',
    subject: 'Physics',
    topic: 'Projectile Motion & Trajectory Calculations',
    bookingType: 'physical',
    date: 'Saturday, Nov 1st',
    timeSlot: '11:00 AM - 01:00 PM (2 hrs)',
    status: 'pending_parent',
    amountNaira: 9000,
    isParentApproved: false,
    createdAt: new Date().toISOString()
  }
];

const DEFAULT_CHATS: Record<string, ChatMessage[]> = {
  'tutor-adewale-math': [
    {
      id: 'msg-1',
      sender: 'tutor',
      text: 'Good day Tunde! I noticed your request for the Projectile Motion home session. Looking forward to going through past WAEC calculations together.',
      timestamp: '10:14 AM'
    },
    {
      id: 'msg-2',
      sender: 'student',
      text: 'Thank you Sir! My father is reviewing the booking request on the Parent dashboard now.',
      timestamp: '10:18 AM'
    }
  ]
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Presentation
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [isDeviceFrame, setIsDeviceFrame] = useState<boolean>(true);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [activeStudentTab, setActiveStudentTab] = useState<'dashboard' | 'syllabus' | 'cbt' | 'competitions' | 'formulas' | 'tutors' | 'games'>('dashboard');
  const [activeReadingNote, setActiveReadingNote] = useState<CurriculumTopic | null>(null);
  const [activeExam, setActiveExam] = useState<CBTExam | null>(null);
  const [isUniformModalOpen, setIsUniformModalOpen] = useState<boolean>(false);

  // Student State
  const [student, setStudent] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('sc_student');
    return saved ? JSON.parse(saved) : DEFAULT_STUDENT;
  });

  const [examResults, setExamResults] = useState<CBTExamResult[]>(() => {
    const saved = localStorage.getItem('sc_exam_results');
    return saved ? JSON.parse(saved) : [];
  });

  // Parent State
  const [parentWallet, setParentWallet] = useState<ParentWallet>(() => {
    const saved = localStorage.getItem('sc_wallet');
    return saved ? JSON.parse(saved) : DEFAULT_WALLET;
  });
  const [isParentPinUnlocked, setIsParentPinUnlocked] = useState<boolean>(false);

  // Tutor Bookings & Chats
  const [tutorBookings, setTutorBookings] = useState<TutorBooking[]>(() => {
    const saved = localStorage.getItem('sc_bookings');
    return saved ? JSON.parse(saved) : DEFAULT_BOOKINGS;
  });
  const [activeTutorChatId, setActiveTutorChatId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>(() => {
    const saved = localStorage.getItem('sc_chats');
    return saved ? JSON.parse(saved) : DEFAULT_CHATS;
  });

  // Persistence effects
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

  // Calculate Rank based on XP
  const calculateRank = (xp: number): StudentRank => {
    if (xp >= 15000) return 'Senior Boy';
    if (xp >= 7500) return 'Prefect';
    if (xp >= 2500) return 'Scholar';
    return 'Fresher';
  };

  const addStudentXP = (amount: number, reason?: string) => {
    setStudent(prev => {
      const newXP = prev.xp + amount;
      const newRank = calculateRank(newXP);
      return {
        ...prev,
        xp: newXP,
        rank: newRank
      };
    });
    // Trigger celebratory particle burst
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // safe fallback
    }
  };

  const updateStudentClass = (classLevel: any, stream: any) => {
    setStudent(prev => ({
      ...prev,
      classLevel,
      stream
    }));
  };

  const verifySchoolUniform = (photoUrl: string) => {
    setStudent(prev => {
      const updatedXP = prev.xp + (prev.uniformVerified ? 0 : 500);
      return {
        ...prev,
        uniformVerified: true,
        uniformPhotoUrl: photoUrl,
        xp: updatedXP,
        rank: calculateRank(updatedXP)
      };
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
      const updated = isDownloaded
        ? prev.downloadedSubjectIds.filter(id => id !== topicId)
        : [...prev.downloadedSubjectIds, topicId];
      return {
        ...prev,
        downloadedSubjectIds: updated
      };
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

    setParentWallet(prev => ({
      ...prev,
      balanceNaira: prev.balanceNaira + amountNaira,
      transactions: [newTx, ...prev.transactions]
    }));

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

    // Debit wallet in escrow
    const debitTx: any = {
      id: `tx-escrow-${Date.now().toString().slice(-6)}`,
      type: 'debit',
      amountNaira: targetBooking.amountNaira,
      description: `Escrow Hold: ${targetBooking.tutorName} (${targetBooking.subject})`,
      timestamp: 'Just now',
      status: 'successful',
      reference: `ESCROW_${bookingId}`
    };

    setParentWallet(prev => ({
      ...prev,
      balanceNaira: prev.balanceNaira - targetBooking.amountNaira,
      transactions: [debitTx, ...prev.transactions]
    }));

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
    const newBooking: TutorBooking = {
      ...params,
      id: `book-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: params.bookingType === 'physical' ? 'pending_parent' : 'confirmed',
      isParentApproved: params.bookingType === 'online'
    };

    setTutorBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const sendChatMessage = (tutorId: string, text: string, sender: 'student' | 'tutor') => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => ({
      ...prev,
      [tutorId]: [...(prev[tutorId] || []), newMsg]
    }));
  };

  const resetDemoData = () => {
    setStudent(DEFAULT_STUDENT);
    setParentWallet(DEFAULT_WALLET);
    setTutorBookings(DEFAULT_BOOKINGS);
    setChatMessages(DEFAULT_CHATS);
    setExamResults([]);
    setIsParentPinUnlocked(false);
    setActiveStudentTab('dashboard');
    setActiveReadingNote(null);
    setActiveExam(null);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        isDeviceFrame,
        setIsDeviceFrame,
        isOffline,
        setIsOffline,
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
