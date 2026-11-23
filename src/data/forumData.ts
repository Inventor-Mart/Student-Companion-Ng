import { ForumChannel, ForumMessage, ForumReport } from '../types';
import { safeGetItem, safeSetItem } from '../lib/storage';

export const INITIAL_FORUM_CHANNELS: ForumChannel[] = [
  // ==========================================
  // STUDENT FORUM CHANNELS
  // ==========================================
  {
    id: 'student-academics',
    title: 'Academics & Subject Help',
    description: 'Homework questions, calculation steps, difficult topics, and exam revision.',
    audience: 'student',
    category: 'academics',
    iconName: 'GraduationCap',
    messageCount: 5,
    lastActivityAt: '10 mins ago'
  },
  {
    id: 'student-competitions',
    title: 'Competitions & Leaderboards',
    description: 'Tournament banter, Cowbellpedia prep, weekly XP races, and Olympiad tips.',
    audience: 'student',
    category: 'competitions',
    iconName: 'Trophy',
    messageCount: 4,
    lastActivityAt: '25 mins ago'
  },
  {
    id: 'student-general',
    title: 'General Scholar Hangout',
    description: 'School life, study timetable routines, motivation, and future university dreams.',
    audience: 'student',
    category: 'general',
    iconName: 'Users',
    messageCount: 4,
    lastActivityAt: '1 hour ago'
  },

  // ==========================================
  // UNIVERSITY ASPIRANT FORUM CHANNELS (ISOLATED FROM JSS/SS SECONDARY STUDENTS)
  // ==========================================
  {
    id: 'aspirant-jamb-utme',
    title: 'JAMB UTME Prep Hall',
    description: 'UTME 4-subject drills, CBT speed strategy, syllabus breakdown, and 300+ score targets.',
    audience: 'aspirant',
    category: 'aspirant_jamb',
    iconName: 'Target',
    messageCount: 3,
    lastActivityAt: '12 mins ago'
  },
  {
    id: 'aspirant-waec-neco',
    title: 'WAEC & NECO Study Room',
    description: 'WASSCE and NECO SSCE objective/theory tactics, practical tips, and past-paper solutions.',
    audience: 'aspirant',
    category: 'aspirant_waec_neco',
    iconName: 'BookOpen',
    messageCount: 2,
    lastActivityAt: '28 mins ago'
  },
  {
    id: 'aspirant-admissions',
    title: 'Post-UTME & Admissions Desk',
    description: 'UNILAG, UI, OAU, UNN, ABU, LASU cut-off marks, CAPS status updates, and screening alerts.',
    audience: 'aspirant',
    category: 'aspirant_admissions',
    iconName: 'GraduationCap',
    messageCount: 2,
    lastActivityAt: '45 mins ago'
  },
  {
    id: 'aspirant-lounge',
    title: 'Aspirant Motivation & Gist',
    description: 'Accountability check-ins, daily study targets, weekly National Mock banter, and encouragement.',
    audience: 'aspirant',
    category: 'aspirant_general',
    iconName: 'Flame',
    messageCount: 2,
    lastActivityAt: '1 hour ago'
  },

  // ==========================================
  // PARENT FORUM CHANNELS
  // ==========================================
  {
    id: 'parent-progress',
    title: 'Child Progress & Study Habits',
    description: 'Encouraging consistent study habits, overcoming exam fear, and tracking performance.',
    audience: 'parent',
    category: 'parenting',
    iconName: 'HeartHandshake',
    messageCount: 4,
    lastActivityAt: '15 mins ago'
  },
  {
    id: 'parent-exams-admissions',
    title: 'WAEC, JAMB & University Admissions',
    description: 'Registration timelines, subject combinations, cut-off marks, and scholarship opportunities.',
    audience: 'parent',
    category: 'exams',
    iconName: 'Award',
    messageCount: 3,
    lastActivityAt: '40 mins ago'
  },
  {
    id: 'parent-general',
    title: 'General Parenting Lounge',
    description: 'Peer support, school choices, balancing screen time with offline reading, and guidance.',
    audience: 'parent',
    category: 'general',
    iconName: 'Coffee',
    messageCount: 3,
    lastActivityAt: '2 hours ago'
  }
];

export const INITIAL_FORUM_MESSAGES: ForumMessage[] = [
  // Student Academics
  {
    id: 'msg-acad-1',
    channelId: 'student-academics',
    senderId: 'std-seed-1',
    senderName: 'Chiamaka N.',
    senderRole: 'student',
    senderClassLevel: 'SS 2',
    senderRank: 'Senior Prefect',
    senderSchool: 'Federal Government Girls College, Owerri',
    text: 'Can someone explain how to handle the sign change in Further Maths when finding the roots of a quadratic with a negative discriminant? Working on complex conjugates.',
    reactions: {
      thumbsUp: ['std-seed-2', 'std-seed-3'],
      lightbulb: ['std-seed-2'],
      fire: [],
      clap: []
    },
    createdAt: '15 mins ago'
  },
  {
    id: 'msg-acad-2',
    channelId: 'student-academics',
    senderId: 'std-seed-2',
    senderName: 'Tunde Adeleke',
    senderRole: 'student',
    senderClassLevel: 'SS 2',
    senderRank: 'Scholar',
    senderSchool: 'King’s College, Lagos',
    text: 'When b² - 4ac < 0, remember √(-k) = i√k. So for x² + 4x + 13 = 0, discriminant is 16 - 52 = -36. That gives ±6i! The lesson notes in the Formulas section have the step-by-step breakdown.',
    reactions: {
      thumbsUp: ['std-seed-1', 'std-seed-4'],
      lightbulb: ['std-seed-1', 'std-seed-3'],
      fire: ['std-seed-1'],
      clap: ['std-seed-4']
    },
    replyToId: 'msg-acad-1',
    replyToText: 'Can someone explain how to handle the sign change in Further Maths...',
    createdAt: '10 mins ago'
  },
  {
    id: 'msg-acad-3',
    channelId: 'student-academics',
    senderId: 'std-seed-3',
    senderName: 'Fatima Bello',
    senderRole: 'student',
    senderClassLevel: 'SS 1',
    senderRank: 'Prefect',
    senderSchool: 'Barewa College, Zaria',
    text: 'The 2nd Term Physics note on simple machines just saved my life for our upcoming continuous assessment test! The pulley block and tackle diagram is so clear.',
    reactions: {
      thumbsUp: ['std-seed-1'],
      lightbulb: [],
      fire: ['std-seed-1', 'std-seed-2'],
      clap: ['std-seed-2']
    },
    createdAt: '8 mins ago'
  },

  // Student Competitions
  {
    id: 'msg-comp-1',
    channelId: 'student-competitions',
    senderId: 'std-seed-4',
    senderName: 'Emeka Eze',
    senderRole: 'student',
    senderClassLevel: 'SS 3',
    senderRank: 'Senior Boy',
    senderSchool: 'Dennis Memorial Grammar School, Onitsha',
    text: 'Who is ready for the Friday National Math & Science Speed Challenge? I have been drilling 40-second JAMB UTME calculations all week. Target is 400 XP!',
    reactions: {
      thumbsUp: ['std-seed-1', 'std-seed-2'],
      lightbulb: [],
      fire: ['std-seed-1', 'std-seed-2', 'std-seed-3'],
      clap: []
    },
    createdAt: '25 mins ago'
  },
  {
    id: 'msg-comp-2',
    channelId: 'student-competitions',
    senderId: 'std-seed-1',
    senderName: 'Chiamaka N.',
    senderRole: 'student',
    senderClassLevel: 'SS 2',
    senderRank: 'Senior Prefect',
    senderSchool: 'Federal Government Girls College, Owerri',
    text: 'Bring it on Emeka! FGGC Owerri is coming for the top of the national leaderboard this week. Don’t forget the negative marking rule!',
    reactions: {
      thumbsUp: ['std-seed-4'],
      lightbulb: [],
      fire: ['std-seed-4'],
      clap: ['std-seed-3']
    },
    replyToId: 'msg-comp-1',
    replyToText: 'Who is ready for the Friday National Math & Science Speed Challenge?...',
    createdAt: '20 mins ago'
  },

  // Student General
  {
    id: 'msg-gen-1',
    channelId: 'student-general',
    senderId: 'std-seed-5',
    senderName: 'Zainab Danjuma',
    senderRole: 'student',
    senderClassLevel: 'SS 1',
    senderRank: 'Scholar',
    senderSchool: 'Queen’s College, Yaba',
    text: 'How do you guys organize your study timetable between school homework and offline revision? I do 1 hour right after school, then 2 hours after dinner.',
    reactions: {
      thumbsUp: ['std-seed-1', 'std-seed-2'],
      lightbulb: ['std-seed-1'],
      fire: [],
      clap: []
    },
    createdAt: '1 hour ago'
  },

  // Parent Progress
  {
    id: 'msg-par-1',
    channelId: 'parent-progress',
    senderId: 'par-seed-1',
    senderName: 'Mrs. Folake Adebayo',
    senderRole: 'parent',
    text: 'Good day fellow parents. My son in SS 2 was previously struggling with Chemistry stoichiometry, but doing 10 practice questions every day on the app has boosted his confidence tremendously.',
    reactions: {
      thumbsUp: ['par-seed-2', 'par-seed-3'],
      lightbulb: ['par-seed-2'],
      fire: [],
      clap: ['par-seed-2', 'par-seed-3']
    },
    createdAt: '25 mins ago'
  },
  {
    id: 'msg-par-2',
    channelId: 'parent-progress',
    senderId: 'par-seed-2',
    senderName: 'Engr. Chukwudi Okafor',
    senderRole: 'parent',
    text: 'That is encouraging Mrs. Adebayo. We set a family rule that screen time must start with 30 minutes of CBT practice before any games. It creates discipline without making it feel like a chore.',
    reactions: {
      thumbsUp: ['par-seed-1'],
      lightbulb: ['par-seed-1', 'par-seed-3'],
      fire: [],
      clap: ['par-seed-1']
    },
    replyToId: 'msg-par-1',
    replyToText: 'Good day fellow parents. My son in SS 2 was previously struggling...',
    createdAt: '15 mins ago'
  },

  // Parent Exams & Admissions
  {
    id: 'msg-par-3',
    channelId: 'parent-exams-admissions',
    senderId: 'par-seed-3',
    senderName: 'Dr. (Mrs.) Halima Usman',
    senderRole: 'parent',
    text: 'Reminder to parents with children in SS 3: please double-check your child’s WAEC subject combinations early, especially English and Math requirements for intended university courses.',
    reactions: {
      thumbsUp: ['par-seed-1', 'par-seed-2'],
      lightbulb: ['par-seed-1', 'par-seed-2'],
      fire: [],
      clap: ['par-seed-1']
    },
    createdAt: '40 mins ago'
  },

  // ==========================================
  // UNIVERSITY ASPIRANT ROOM MESSAGES (ISOLATED FROM SECONDARY STUDENTS)
  // ==========================================
  {
    id: 'msg-asp-jamb-1',
    channelId: 'aspirant-jamb-utme',
    senderId: 'asp-seed-1',
    senderName: 'Ibrahim Musa',
    senderRole: 'student',
    senderClassLevel: 'University Aspirant',
    senderRank: 'Scholar',
    senderSchool: 'Target: UNILAG · Medicine & Surgery',
    text: 'Tip for anyone gunning for 310+ in JAMB UTME: practice using keyboard shortcuts (A, B, C, D, N, P, R) on the Authentic CBT Mock Simulator. It saved me nearly 18 minutes on Use of English and Physics!',
    reactions: {
      thumbsUp: ['asp-seed-2', 'asp-seed-3'],
      lightbulb: ['asp-seed-2'],
      fire: ['asp-seed-3'],
      clap: []
    },
    createdAt: '18 mins ago'
  },
  {
    id: 'msg-asp-jamb-2',
    channelId: 'aspirant-jamb-utme',
    senderId: 'asp-seed-2',
    senderName: 'Chidinma Okafor',
    senderRole: 'student',
    senderClassLevel: 'University Aspirant',
    senderRank: 'Senior Prefect',
    senderSchool: 'Target: UI · Pharmacy',
    text: 'Just finished JAMB Complete Mock #1 with 304/400! Zero repeated questions made it feel like the real exam hall. Reviewing my Organic Chemistry misses before the weekend National Mock.',
    reactions: {
      thumbsUp: ['asp-seed-1'],
      lightbulb: [],
      fire: ['asp-seed-1', 'asp-seed-3'],
      clap: ['asp-seed-1']
    },
    createdAt: '12 mins ago'
  },
  {
    id: 'msg-asp-waec-1',
    channelId: 'aspirant-waec-neco',
    senderId: 'asp-seed-3',
    senderName: 'Oluwaseun Balogun',
    senderRole: 'student',
    senderClassLevel: 'University Aspirant',
    senderRank: 'Prefect',
    senderSchool: 'Target: OAU · Computer Science',
    text: 'For WAEC and NECO candidates combining with UTME, remember to balance your objective speed with theory diagrams—especially in Biology osmosis and Physics ray optics.',
    reactions: {
      thumbsUp: ['asp-seed-1'],
      lightbulb: ['asp-seed-1', 'asp-seed-2'],
      fire: [],
      clap: []
    },
    createdAt: '28 mins ago'
  },
  {
    id: 'msg-asp-adm-1',
    channelId: 'aspirant-admissions',
    senderId: 'asp-seed-2',
    senderName: 'Chidinma Okafor',
    senderRole: 'student',
    senderClassLevel: 'University Aspirant',
    senderRank: 'Senior Prefect',
    senderSchool: 'Target: UI · Pharmacy',
    text: 'Please double-check that your O-Level results are uploaded cleanly to JAMB CAPS before Post-UTME screening begins. Use the University Admission Guide here to verify your 4-subject combination too.',
    reactions: {
      thumbsUp: ['asp-seed-1', 'asp-seed-3'],
      lightbulb: ['asp-seed-3'],
      fire: [],
      clap: ['asp-seed-1']
    },
    createdAt: '45 mins ago'
  },
  {
    id: 'msg-asp-lounge-1',
    channelId: 'aspirant-lounge',
    senderId: 'asp-seed-4',
    senderName: 'Amina Abdullahi',
    senderRole: 'student',
    senderClassLevel: 'University Aspirant',
    senderRank: 'Scholar',
    senderSchool: 'Target: ABU Zaria · Law',
    text: 'Accountability check-in! Who else is registering for this weekend’s ₦500 National Mock Tournament? Let’s push each other to hit our target scores before exam day!',
    reactions: {
      thumbsUp: ['asp-seed-1', 'asp-seed-2'],
      lightbulb: [],
      fire: ['asp-seed-1', 'asp-seed-2', 'asp-seed-3'],
      clap: ['asp-seed-3']
    },
    createdAt: '1 hour ago'
  }
];

export const INITIAL_FORUM_REPORTS: ForumReport[] = [
  {
    id: 'rep-seed-1',
    messageId: 'msg-flagged-demo',
    channelId: 'student-general',
    reportedUserId: 'usr-spammer-9',
    reportedUserName: 'Lucky Bettor 99',
    reporterUserId: 'std-seed-1',
    messageText: 'Bet 9ja sure odds fixed match contact WhatsApp 08023456789 for VIP slips',
    reason: 'contact_sharing',
    status: 'pending',
    createdAt: '2 hours ago'
  }
];

export function getStoredForumMessages(): ForumMessage[] {
  const saved = safeGetItem('sc_forum_messages');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {}
  }
  return INITIAL_FORUM_MESSAGES;
}

export function saveStoredForumMessages(messages: ForumMessage[]): void {
  safeSetItem('sc_forum_messages', JSON.stringify(messages));
}

export function getStoredForumReports(): ForumReport[] {
  const saved = safeGetItem('sc_forum_reports');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {}
  }
  return INITIAL_FORUM_REPORTS;
}

export function saveStoredForumReports(reports: ForumReport[]): void {
  safeSetItem('sc_forum_reports', JSON.stringify(reports));
}
