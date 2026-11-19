import { LegalConsentRecord, RegisteredUserProfile, TutorBooking, UserRole } from '../types';

export const TUTOR_PLATFORM_COMMISSION_PERCENT = 20;
export const TUTOR_NET_PAYOUT_PERCENT = 100 - TUTOR_PLATFORM_COMMISSION_PERCENT;

export const USER_AGREEMENT_VERSION = 'v1.0';
export const USER_AGREEMENT_EFFECTIVE_DATE = 'November 2026';

export interface TutorBookingFinancialSplit {
  grossAmountNaira: number;
  commissionRatePercent: number;
  platformFeeNaira: number;
  tutorNetNaira: number;
}

/**
 * Computes exact integer Naira split for a tutor booking.
 * Guarantees platformFeeNaira + tutorNetNaira === grossAmountNaira.
 * Parents pay the tutor's quoted rate (grossAmountNaira) with no hidden surcharge;
 * the 20% system service fee is deducted from the booking into the platform ledger
 * and the remaining 80% net is credited to the tutor.
 */
export function calculateTutorBookingSplit(
  grossAmountNaira: number,
  commissionRatePercent: number = TUTOR_PLATFORM_COMMISSION_PERCENT
): TutorBookingFinancialSplit {
  const safeGross = Math.max(0, Math.round(Number(grossAmountNaira) || 0));
  const safeRate = Math.min(
    100,
    Math.max(0, Number.isFinite(Number(commissionRatePercent)) ? Number(commissionRatePercent) : TUTOR_PLATFORM_COMMISSION_PERCENT)
  );
  const platformFeeNaira = Math.round((safeGross * safeRate) / 100);
  const tutorNetNaira = Math.max(0, safeGross - platformFeeNaira);

  return {
    grossAmountNaira: safeGross,
    commissionRatePercent: safeRate,
    platformFeeNaira,
    tutorNetNaira
  };
}

/**
 * Returns the canonical financial split for any TutorBooking, using persisted
 * split values when present or computing the 80/20 split for legacy bookings.
 */
export function getBookingFinancialSplit(
  booking: Pick<TutorBooking, 'amountNaira' | 'commissionRatePercent' | 'platformFeeNaira' | 'tutorNetNaira'>
): TutorBookingFinancialSplit {
  const safeGross = Math.max(0, Math.round(Number(booking?.amountNaira) || 0));
  const hasPersistedFee =
    typeof booking?.platformFeeNaira === 'number' &&
    Number.isFinite(booking.platformFeeNaira) &&
    booking.platformFeeNaira >= 0;
  const hasPersistedNet =
    typeof booking?.tutorNetNaira === 'number' &&
    Number.isFinite(booking.tutorNetNaira) &&
    booking.tutorNetNaira >= 0;

  if (hasPersistedFee && hasPersistedNet && Math.round(booking.platformFeeNaira! + booking.tutorNetNaira!) === safeGross) {
    return {
      grossAmountNaira: safeGross,
      commissionRatePercent:
        typeof booking.commissionRatePercent === 'number' && Number.isFinite(booking.commissionRatePercent)
          ? booking.commissionRatePercent
          : TUTOR_PLATFORM_COMMISSION_PERCENT,
      platformFeeNaira: Math.round(booking.platformFeeNaira!),
      tutorNetNaira: Math.round(booking.tutorNetNaira!)
    };
  }

  return calculateTutorBookingSplit(
    safeGross,
    typeof booking?.commissionRatePercent === 'number'
      ? booking.commissionRatePercent
      : TUTOR_PLATFORM_COMMISSION_PERCENT
  );
}

export function hasAcceptedCurrentAgreement(profile?: RegisteredUserProfile | null): boolean {
  if (!profile) return false;
  if (profile.isSuperAdmin || profile.isDeveloper) return true;
  return Boolean(
    profile.legalConsent?.accepted &&
      profile.legalConsent?.version === USER_AGREEMENT_VERSION &&
      profile.legalConsent?.acceptedAt
  );
}

export function createLegalConsentRecord(role: UserRole): LegalConsentRecord {
  return {
    accepted: true,
    version: USER_AGREEMENT_VERSION,
    acceptedAt: new Date().toISOString(),
    roleAcceptedAs: role
  };
}

export function formatConsentDate(iso?: string): string {
  if (!iso) return 'Unknown date';
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso.slice(0, 10);
  return parsed.toLocaleDateString('en-NG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

export const ROLE_AGREEMENT_HIGHLIGHTS: Record<
  UserRole,
  {
    title: string;
    points: string[];
  }
> = {
  student: {
    title: 'Key Terms for Students & University Aspirants',
    points: [
      'Students under 18 require parent or guardian supervision and Parent PIN authorization for paid bookings and home tutoring.',
      'Academic integrity is mandatory across CBT practice, scholarship competitions, and community discussions.',
      'All tutor chats and virtual classroom sessions must remain inside Student Companion for your safety.'
    ]
  },
  parent: {
    title: 'Key Terms for Parents & Guardians',
    points: [
      'Your 4-digit Parent PIN authorizes escrow wallet spending, tutor session bookings, and in-person home tutoring safety approvals.',
      'Booking payments are held securely in Student Companion Escrow until sessions are confirmed and delivered.',
      'Off-platform payment bypass voids escrow refund protection and violates platform anti-circumvention rules.'
    ]
  },
  tutor: {
    title: 'Key Terms for Educators & Private Tutors',
    points: [
      'Student Companion deducts a 20% platform service fee from every booking amount you set; you receive 80% net payout upon session completion.',
      'You are an independent educator, must submit authentic NIN and academic credentials, and must keep all bookings and payments on-platform.',
      'Strict zero-tolerance child safeguarding rules apply to all online and in-person home tutoring sessions.'
    ]
  },
  admin: {
    title: 'Key Terms for School Administrators',
    points: [
      'You confirm authorized representation of your school when enrolling students, managing institutional codes, or uploading academic materials.',
      'Student records accessed through the School Portal must be handled strictly under the Nigeria Data Protection Act (NDPA) 2023.',
      'Institutional licenses and tournament entries remain subject to platform verification and fair-play rules.'
    ]
  },
  school_admin: {
    title: 'Key Terms for School Administrators',
    points: [
      'You confirm authorized representation of your school when enrolling students, managing institutional codes, or uploading academic materials.',
      'Student records accessed through the School Portal must be handled strictly under the Nigeria Data Protection Act (NDPA) 2023.',
      'Institutional licenses and tournament entries remain subject to platform verification and fair-play rules.'
    ]
  },
  growth_partner: {
    title: 'Key Terms for Growth Partners & Affiliates',
    points: [
      'Verified Growth Partners earn a 10% revenue share on qualifying paid student subscriptions attributed to their referral code.',
      'Self-referrals, fraudulent accounts, misleading claims, or spam promotion result in commission forfeiture and suspension.',
      'Payouts are remitted strictly to your verified Nigerian bank account after compliance validation.'
    ]
  }
};

export interface UserAgreementSection {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export const USER_AGREEMENT_SECTIONS: UserAgreementSection[] = [
  {
    id: 'acceptance-eligibility',
    number: '1',
    title: 'Acceptance of Terms, Eligibility & Minors Protection',
    paragraphs: [
      'This User Agreement ("Agreement") is a binding legal contract between you ("User") and Student Companion, operated by WoW Tech ("Platform", "we", "us"). By creating an account, tapping "I Agree", or continuing to use Student Companion, you agree to be bound by this Agreement and all policies referenced herein.',
      'Student Companion serves five account personas: Students/Aspirants, Parents/Guardians, Private Tutors/Educators, School Administrators, and Growth Partners. You warrant that all registration information you provide is truthful, accurate, and kept current.'
    ],
    bullets: [
      'Minors (Under 18 Years): Students under 18 may access curriculum notes, CBT practice, and study tools, but must have a Parent or Legal Guardian approve paid tutor bookings, escrow funding, and any in-person home tutoring via the secure Parent PIN.',
      'Account Security: You are solely responsible for safeguarding your login credentials, verification codes, and Parent PIN. Sharing accounts or impersonating another individual or institution is strictly prohibited.'
    ]
  },
  {
    id: 'marketplace-escrow-commission',
    number: '2',
    title: 'Tutor Marketplace, Escrow Settlement & 20% System Service Fee',
    paragraphs: [
      'Student Companion operates a managed educational marketplace connecting vetted Nigerian tutors with parents and students for live virtual classrooms and supervised home tutoring. Tutors independently set their hourly lesson rates in Nigerian Naira (₦).',
      'To maintain escrow protection, identity vetting, interactive virtual classrooms, payment processing, and customer support, Student Companion deducts a flat 20% Platform Service Fee from the gross amount of every booked tutor session (whatever hourly or session rate the tutor fixes). The remaining 80% net amount is credited to the tutor upon session completion.'
    ],
    bullets: [
      'Transparent 80/20 Split: Parents pay the tutor’s quoted session fee with no hidden markup added on top. From every completed booking, 20% is allocated to the Student Companion System Revenue Ledger and 80% net is made available for tutor bank withdrawal.',
      'Escrow Hold & Release: Booking funds are held in Student Companion Escrow upon booking confirmation. If a tutor declines or cancels before delivery, 100% of the booking amount is refunded to the Parent Escrow Wallet.',
      'Tutor Bank Payouts: Tutors must provide a valid National Identification Number (NIN) and Nigerian commercial bank (NUBAN) account matching their legal identity before requesting withdrawal of their 80% net earnings.',
      'Independent Contractor Relationship: Tutors are independent educators, not employees, partners, or agents of WoW Tech or Student Companion, and remain responsible for their own personal income tax obligations in Nigeria.'
    ]
  },
  {
    id: 'anti-circumvention',
    number: '3',
    title: 'Strict Anti-Circumvention & On-Platform Communication Policy',
    paragraphs: [
      'All introductions, scheduling, session payments, and dispute handling between tutors, parents, and students initiated through Student Companion must remain strictly within the Platform.'
    ],
    bullets: [
      'No Off-Platform Payment Bypass: Tutors and Parents must not solicit, accept, or arrange direct cash, private bank transfers, or external links (WhatsApp, Zoom, phone numbers) to bypass Student Companion Escrow or the 20% Platform Service Fee.',
      'Loss of Protection & Enforcement: Any session conducted outside Student Companion forfeits escrow refund rights, safety monitoring, and dispute support. Proven circumvention may lead to immediate permanent account suspension and forfeiture of pending balances.'
    ]
  },
  {
    id: 'tutor-credentials-conduct',
    number: '4',
    title: 'Tutor Verification, Academic Credentials & Educator Conduct',
    paragraphs: [
      'Tutors represent and warrant that all submitted academic qualifications (NCE, OND, HND, B.A., B.Sc., B.Ed., B.Eng., B.Tech., PGDE, M.A., M.Ed., M.Sc., Ph.D., or custom degrees), institutions attended, TRCN status, NIN records, and guarantor details are authentic and verifiable.'
    ],
    bullets: [
      'Credential Audits: Student Companion reserves the right to audit, suspend, or remove any tutor profile containing falsified documents, misleading subject claims, or unverified identity details.',
      'Professional Standards: Tutors must attend confirmed lessons punctually, prepare NERDC/WAEC/NECO/JAMB-aligned instruction, maintain respectful conduct, and respect student dignity at all times.'
    ]
  },
  {
    id: 'child-safeguarding',
    number: '5',
    title: 'Child Safeguarding & Home Tutoring Safety Standards',
    paragraphs: [
      'Student safety is paramount across every Student Companion interaction. We enforce a zero-tolerance policy against harassment, grooming, abuse, inappropriate language, exploitation, or unsafe conduct toward minors.'
    ],
    bullets: [
      'Online Virtual Classrooms: Online lessons must take place strictly inside Student Companion’s built-in interactive whiteboard and audio classroom. Recording or distributing minor learners’ personal images or audio outside official platform safeguards is forbidden.',
      'In-Person Home Tutoring: In-person sessions require explicit Parent PIN approval and a verified residential address. A parent or responsible adult must remain present in the home during all physical lessons.',
      'Immediate Reporting: Any suspected safeguarding violation must be reported immediately to Platform Administration and may be referred to relevant Nigerian law enforcement and child protection authorities.'
    ]
  },
  {
    id: 'subscriptions-scholarships-partners',
    number: '6',
    title: 'Subscriptions, Scholarship Tournaments & 10% Growth Partner Program',
    paragraphs: [
      'Student Companion offers free foundational access alongside paid Premium/Termly subscriptions, institutional school plans, national CBT competitions, and a Growth Partner affiliate program.'
    ],
    bullets: [
      'Subscriptions & Refunds: Paid digital subscriptions unlock instant access to premium curriculum packs, AI study coaching, and mock exams. Except where a duplicate charge or verified technical failure occurs, activated digital subscription periods are non-refundable.',
      'Competitions & Scholarships: Tournament prizes, data rewards, and scholarship awards require identity verification (including uniform or school verification where applicable) and strict adherence to anti-cheating telemetry. Automated bots, multi-accounting, or collusion result in immediate disqualification.',
      'Growth Partner 10% Revenue Share: Approved Growth Partners earn a 10% commission on confirmed paid subscriptions generated via their unique referral code. Commissions from fraudulent, refunded, or self-referred accounts will be reversed.'
    ]
  },
  {
    id: 'ip-privacy-ndpa',
    number: '7',
    title: 'Intellectual Property & Data Privacy (NDPA 2023 Compliance)',
    paragraphs: [
      'All NERDC-aligned lesson notes, CBT question banks, UI designs, trademarks, software code, and AI learning tools on Student Companion are the proprietary intellectual property of WoW Tech or its licensors. Users receive a personal, non-transferable, revocable license strictly for educational use and may not scrape, resell, or redistribute platform content.',
      'We collect and process personal data (including student academic progress, parent contact records, tutor NIN/bank verification data, and transaction logs) in accordance with the Nigeria Data Protection Act (NDPA) 2023.'
    ],
    bullets: [
      'Data Minimization & Security: Sensitive identifiers such as NIN, bank settlement details, and Parent PINs are used exclusively for identity vetting, child safety, escrow compliance, and statutory anti-fraud checks.',
      'User Rights: Users and Parents may request correction of inaccurate profile records or account deletion via Platform Support, subject to mandatory financial audit and child-safety record retention.'
    ]
  },
  {
    id: 'disputes-liability-law',
    number: '8',
    title: 'Dispute Resolution, Limitation of Liability, Termination & Governing Law',
    paragraphs: [
      'In the event of a lesson quality complaint, no-show, or escrow disagreement, either party must submit a formal dispute within 48 hours of the scheduled session end time. Student Companion Administration will review session logs, chat history, and attendance timestamps to issue a fair release or refund determination.',
      'To the maximum extent permitted by Nigerian law, WoW Tech and Student Companion provide the platform on an "as-is" and "as-available" basis. Our aggregate liability for any claim relating to a specific booking shall not exceed the Platform Service Fee received by Student Companion for that transaction, and we shall not be liable for indirect, incidental, or consequential damages.'
    ],
    bullets: [
      'Suspension & Termination: We reserve the right to lock, freeze wallets on, suspend, or terminate any account that breaches this Agreement, poses a safeguarding risk, or engages in payment fraud.',
      'Amendments: We may update this Agreement as Nigerian regulations or platform services evolve. Material updates require renewed user consent before continued access.',
      'Governing Law & Jurisdiction: This Agreement is governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any unresolved dispute shall first be submitted to good-faith mediation and, failing settlement within 30 days, to the courts of competent jurisdiction in the Federal Republic of Nigeria.'
    ]
  }
];
