/**
 * Secondary School Community Forum Safety & Profanity Filter
 * Designed to protect underage Nigerian secondary school students from bullying,
 * profanity, hate speech, and unsolicited contact/phone number harvesting.
 */

// Common offensive keywords and cyberbullying patterns
const DISALLOWED_PATTERNS = [
  /\b(fuck|shit|bitch|bastard|asshole|idiot|fool|stupid|mumu|olodo|ode|craze|madman|retard|scam|fraud)\b/i,
  /\b(kill\s*yourself|go\s*die|hate\s*you|ugly|worthless)\b/i,
  /\b(sex|porn|nude|boobs|dick|vagina|pussy|penis)\b/i,
  /\b(bet9ja|sportybet|1xbet|betting|fixed\s*match|crypto\s*doubler)\b/i
];

// Phone number harvesting pattern (e.g., 08012345678, +23480..., 090..., 070...)
const PHONE_HARVEST_PATTERN = /(?:\+?234|0)[789][01]\d{8}/;

export interface FilterResult {
  isClean: boolean;
  sanitizedText: string;
  flagReason?: 'profanity' | 'phone_harvesting' | 'too_long' | 'empty';
  warningMessage?: string;
}

/**
 * Validates and sanitizes forum message input
 */
export function filterMessageText(rawText: string): FilterResult {
  const trimmed = rawText.trim();

  if (!trimmed || trimmed.length === 0) {
    return {
      isClean: false,
      sanitizedText: '',
      flagReason: 'empty',
      warningMessage: 'Message cannot be empty.'
    };
  }

  if (trimmed.length > 500) {
    return {
      isClean: false,
      sanitizedText: trimmed.slice(0, 500),
      flagReason: 'too_long',
      warningMessage: 'Messages are limited to 500 characters.'
    };
  }

  // Prevent unsolicited phone number drops in student forums for child safety
  if (PHONE_HARVEST_PATTERN.test(trimmed)) {
    return {
      isClean: false,
      sanitizedText: trimmed.replace(PHONE_HARVEST_PATTERN, '[Phone Removed for Safety]'),
      flagReason: 'phone_harvesting',
      warningMessage: 'Sharing personal phone numbers in public student forums is prohibited for child safety.'
    };
  }

  let sanitized = trimmed;
  let hasProfanity = false;

  for (const pattern of DISALLOWED_PATTERNS) {
    if (pattern.test(sanitized)) {
      hasProfanity = true;
      sanitized = sanitized.replace(pattern, (match) => '*'.repeat(match.length));
    }
  }

  if (hasProfanity) {
    return {
      isClean: false,
      sanitizedText: sanitized,
      flagReason: 'profanity',
      warningMessage: 'Please maintain a respectful, educational tone. Offensive language is disallowed.'
    };
  }

  return {
    isClean: true,
    sanitizedText: trimmed
  };
}
