// Shared Referral Promotion & NERDC Lesson Note Release Schedule Policy
// Safe for both browser (React/Vite) and server (Express/tsx) runtimes.

export const REFERRAL_PROMO_START_ISO = '2026-11-13T00:00:00+01:00';
export const REFERRAL_PROMO_END_ISO = '2027-01-03T23:59:59+01:00';
export const SECOND_TERM_NERDC_UNLOCK_ISO = '2026-12-21T00:00:00+01:00';

export const STUDENT_TIER_BASE_PRICES: Record<'free' | 'basic' | 'standard' | 'elite', number> = {
  free: 0,
  basic: 8000,
  standard: 15000,
  elite: 60000
};

export const ASPIRANT_TIER_BASE_PRICES: Record<'free' | 'basic' | 'elite', number> = {
  free: 0,
  basic: 5000,
  elite: 10000
};

export const ASPIRANT_FIRST_REG_CASH_NAIRA = 500;
export const ASPIRANT_FIRST_REG_DATA_LABEL = '2GB Mobile Data Bundle';

export function isReferralPromoActive(now: Date = new Date()): boolean {
  const endMs = new Date(REFERRAL_PROMO_END_ISO).getTime();
  return now.getTime() <= endMs;
}

export interface StudentTierPricingQuote {
  plan: 'free' | 'basic' | 'standard' | 'elite';
  basePriceNaira: number;
  finalPriceNaira: number;
  discountPercent: number;
  discountAmountNaira: number;
  promoApplied: boolean;
  promoExpiresIso: string;
  ownerCommissionRatePercent: number;
  ownerCommissionNaira: number;
}

export function getStudentTierPricing(
  plan: 'free' | 'basic' | 'standard' | 'elite',
  hasReferralCode: boolean,
  classLevel?: string,
  now: Date = new Date()
): StudentTierPricingQuote {
  const basePrice = STUDENT_TIER_BASE_PRICES[plan] || 0;
  const isSecondaryGeneralStudent = classLevel !== 'University Aspirant';
  const promoWindowOpen = isReferralPromoActive(now);
  const promoApplied = Boolean(hasReferralCode && isSecondaryGeneralStudent && promoWindowOpen && basePrice > 0);

  const discountPercent = promoApplied ? 20 : 0;
  const finalPrice = promoApplied ? Math.round(basePrice * 0.8) : basePrice;
  const discountAmount = basePrice - finalPrice;

  // 10% commission calculated on discounted net amount actually paid
  const ownerCommissionRatePercent = hasReferralCode && finalPrice > 0 ? 10 : 0;
  const ownerCommissionNaira = ownerCommissionRatePercent > 0 ? Math.round((finalPrice * 10) / 100) : 0;

  return {
    plan,
    basePriceNaira: basePrice,
    finalPriceNaira: finalPrice,
    discountPercent,
    discountAmountNaira: discountAmount,
    promoApplied,
    promoExpiresIso: REFERRAL_PROMO_END_ISO,
    ownerCommissionRatePercent,
    ownerCommissionNaira
  };
}

export interface AspirantTierPricingQuote {
  tier: 'free' | 'basic' | 'elite';
  basePriceNaira: number;
  finalPriceNaira: number;
  ownerCommissionRatePercent: number;
  ownerCommissionNaira: number;
  firstRegistrationRewardEligible: boolean;
}

export function getAspirantTierPricing(
  tier: 'free' | 'basic' | 'elite',
  hasReferralCode: boolean
): AspirantTierPricingQuote {
  const basePrice = ASPIRANT_TIER_BASE_PRICES[tier] || 0;
  const paid = basePrice > 0;
  const ownerCommissionRatePercent = hasReferralCode && paid ? 10 : 0;
  const ownerCommissionNaira = ownerCommissionRatePercent > 0 ? Math.round((basePrice * 10) / 100) : 0;

  return {
    tier,
    basePriceNaira: basePrice,
    finalPriceNaira: basePrice,
    ownerCommissionRatePercent,
    ownerCommissionNaira,
    firstRegistrationRewardEligible: Boolean(hasReferralCode && paid)
  };
}

export interface NerdcTermAccessStatus {
  isUnlocked: boolean;
  lockType?: 'upcoming_release' | 'term_closed';
  title?: string;
  reason?: string;
  unlockDateLabel?: string;
  daysRemaining?: number;
  bypassedByAdmin?: boolean;
}

export function normalizeNerdcTerm(term?: string): '1st Term' | '2nd Term' | '3rd Term' {
  const raw = String(term || '').toLowerCase();
  if (raw.includes('1st') || raw.includes('first')) return '1st Term';
  if (raw.includes('3rd') || raw.includes('third')) return '3rd Term';
  return '2nd Term';
}

export function getNerdcTermAccessStatus(
  term?: string,
  isSuperAdmin = false,
  now: Date = new Date()
): NerdcTermAccessStatus {
  if (isSuperAdmin) {
    return { isUnlocked: true, bypassedByAdmin: true };
  }

  const normalized = normalizeNerdcTerm(term);
  const unlockMs = new Date(SECOND_TERM_NERDC_UNLOCK_ISO).getTime();
  const nowMs = now.getTime();

  if (normalized === '1st Term' || normalized === '3rd Term') {
    return {
      isUnlocked: false,
      lockType: 'term_closed',
      title: `${normalized} NERDC Lesson Notes Locked`,
      reason:
        nowMs < unlockMs
          ? `${normalized} NERDC lesson notes are locked. 2nd Term NERDC lesson notes open on December 21, 2026.`
          : `${normalized} NERDC lesson notes are currently locked. Study active 2nd Term NERDC lesson notes.`,
      unlockDateLabel: 'December 21, 2026'
    };
  }

  if (nowMs < unlockMs) {
    const daysRemaining = Math.max(1, Math.ceil((unlockMs - nowMs) / (1000 * 60 * 60 * 24)));
    return {
      isUnlocked: false,
      lockType: 'upcoming_release',
      title: '2nd Term NERDC Notes Open December 21, 2026',
      reason:
        'Access to 2nd Term NERDC lesson notes becomes effective on December 21st, 2026. All other terms remain locked.',
      unlockDateLabel: 'December 21, 2026',
      daysRemaining
    };
  }

  return { isUnlocked: true };
}

export function normalizeNigerianPhone(phone: string): string | null {
  const digits = String(phone || '').replace(/[\s\-()]+/g, '');
  if (/^0[789][01]\d{8}$/.test(digits)) {
    return digits;
  }
  if (/^\+?234[789][01]\d{8}$/.test(digits)) {
    return `0${digits.slice(-10)}`;
  }
  return null;
}
