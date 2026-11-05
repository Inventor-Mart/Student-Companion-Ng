import { RegisteredUserProfile } from '../types';

export const INITIAL_USER_DIRECTORY: RegisteredUserProfile[] = [
  {
    id: 'usr-dev-martorefe',
    role: 'admin',
    fullName: 'Martin Omorefe',
    email: 'martorefe@gmail.com',
    emailVerified: true,
    isSuperAdmin: true,
    isDeveloper: true,
    createdAt: '2026-01-01T00:00:00.000Z',
    adminData: {
      schoolName: 'Student Companion Central Administration',
      schoolType: 'Super Admin & Development Directorate'
    }
  },
  {
    id: 'usr-student-chidinma',
    role: 'student',
    fullName: 'Chidinma Adeleke',
    email: 'chidinma.adeleke@students.ng',
    emailVerified: true,
    createdAt: '2026-01-15T08:30:00.000Z',
    studentData: {
      id: 'usr-student-chidinma',
      name: 'Chidinma Adeleke',
      school: "Queen's College, Yaba, Lagos",
      classLevel: 'JSS 3',
      stream: 'Junior',
      xp: 4250,
      rank: 'Prefect',
      streakDays: 14,
      lastStudyDate: new Date().toISOString().split('T')[0],
      uniformVerified: true,
      uniformPhotoUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=200',
      downloadedSubjectIds: ['math-jss3', 'eng-jss3'],
      completedQuizIds: ['bece-english-junior-2025']
    }
  },
  {
    id: 'usr-student-ibrahim',
    role: 'student',
    fullName: 'Ibrahim Danjuma',
    email: 'ibrahim.danjuma@barewa.edu.ng',
    emailVerified: true,
    createdAt: '2026-01-18T11:20:00.000Z',
    studentData: {
      id: 'usr-student-ibrahim',
      name: 'Ibrahim Danjuma',
      school: 'Barewa College, Zaria, Kaduna State',
      classLevel: 'SS 2',
      stream: 'Science',
      xp: 8900,
      rank: 'Senior Boy',
      streakDays: 28,
      lastStudyDate: new Date().toISOString().split('T')[0],
      uniformVerified: true,
      uniformPhotoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200',
      downloadedSubjectIds: ['phy-ss2', 'chem-ss2', 'math-ss2'],
      completedQuizIds: ['jamb-utme-physics-2025']
    }
  },
  {
    id: 'usr-student-ngozi',
    role: 'student',
    fullName: 'Ngozi Okoli',
    email: 'ngozi.okoli@fgc.edu.ng',
    emailVerified: false,
    createdAt: '2026-02-01T14:45:00.000Z',
    studentData: {
      id: 'usr-student-ngozi',
      name: 'Ngozi Okoli',
      school: 'Federal Government Girls College, Owerri',
      classLevel: 'JSS 2',
      stream: 'Junior',
      xp: 1200,
      rank: 'Fresher',
      streakDays: 3,
      lastStudyDate: new Date().toISOString().split('T')[0],
      uniformVerified: false,
      uniformPhotoUrl: null,
      downloadedSubjectIds: ['bus-jss2'],
      completedQuizIds: []
    }
  },
  {
    id: 'usr-parent-folashade',
    role: 'parent',
    fullName: 'Dr. (Mrs) Folashade Balogun',
    email: 'folashade.balogun@gmail.com',
    emailVerified: true,
    createdAt: '2026-01-20T10:15:00.000Z',
    parentData: {
      phone: '+234 803 456 7890',
      wardName: 'Chidinma Adeleke',
      pin: '1234',
      address: {
        street: '14 Admiralty Way, Lekki Phase 1',
        lga: 'Eti-Osa',
        state: 'Lagos',
        landmark: 'Near Prince Ebeano Supermarket',
        phone: '+234 803 456 7890'
      }
    }
  },
  {
    id: 'usr-parent-emeka',
    role: 'parent',
    fullName: 'Chief Emeka Nwosu',
    email: 'emeka.nwosu@transport.ng',
    emailVerified: true,
    createdAt: '2026-01-25T16:00:00.000Z',
    parentData: {
      phone: '+234 802 333 4455',
      wardName: 'Ngozi Okoli',
      pin: '4321',
      address: {
        street: '22 Douglas Road',
        lga: 'Owerri Municipal',
        state: 'Imo',
        landmark: 'Close to Main Market',
        phone: '+234 802 333 4455'
      }
    }
  },
  {
    id: 'usr-tutor-adewale',
    role: 'tutor',
    fullName: 'Engr. Adewale Adeyemi',
    email: 'adewale.adeyemi@tutoreng.com',
    emailVerified: true,
    createdAt: '2026-01-10T14:00:00.000Z',
    tutorData: {
      subjectSpecialization: 'Mathematics, Further Mathematics & Physics',
      qualification: 'B.Eng Mechanical Engineering (First Class), UNILAG',
      hourlyRate: 4500,
      teachingMode: 'both',
      verification: {
        nin: 'NIN-78492019342',
        bankName: 'Guaranty Trust Bank (GTBank)',
        accountNumber: '0123456789',
        accountName: 'ADEWALE BABATUNDE ADEYEMI',
        isVerified: true
      }
    }
  },
  {
    id: 'usr-tutor-zainab',
    role: 'tutor',
    fullName: 'Mrs. Zainab Al-Hassan',
    email: 'zainab.alhassan@educators.ng',
    emailVerified: true,
    createdAt: '2026-01-12T09:30:00.000Z',
    tutorData: {
      subjectSpecialization: 'English Language, Literature & CRS',
      qualification: 'B.A. English (ABU Zaria), M.Ed Curriculum Studies',
      hourlyRate: 4000,
      teachingMode: 'online',
      verification: {
        nin: 'NIN-99382109481',
        bankName: 'Zenith Bank PLC',
        accountNumber: '2081928471',
        accountName: 'ZAINAB FATIMA AL-HASSAN',
        isVerified: true
      }
    }
  },
  {
    id: 'usr-admin-victoria',
    role: 'admin',
    fullName: 'Mrs. Victoria Okonkwo',
    email: 'principal@fgcikotekpene.edu.ng',
    emailVerified: true,
    createdAt: '2026-01-05T09:00:00.000Z',
    adminData: {
      schoolName: 'Federal Government College, Ikot Ekpene',
      schoolType: 'Unity Secondary School'
    }
  }
];
