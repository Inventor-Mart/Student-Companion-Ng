const HONORIFIC_PREFIXES = new Set([
  'mr',
  'mrs',
  'ms',
  'miss',
  'dr',
  'prof',
  'engr',
  'chief',
  'alhaji',
  'alhaja',
  'mallam',
  'malama',
  'pastor',
  'rev',
  'reverend',
  'sir',
  'lady',
  'hon',
  'arch',
  'barr'
]);

const AVATAR_GRADIENT_PALETTE = [
  'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600',
  'bg-gradient-to-br from-[#FF5B00] via-orange-500 to-amber-500',
  'bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600',
  'bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600',
  'bg-gradient-to-br from-rose-500 via-pink-500 to-orange-500',
  'bg-gradient-to-br from-[#84CC16] via-emerald-500 to-teal-600',
  'bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-600',
  'bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600',
  'bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600',
  'bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-600'
] as const;

const TEST_AVATAR_URL_PATTERNS: RegExp[] = [
  /api\.dicebear\.com/i,
  /avatars\.dicebear\.com/i,
  /pravatar\.cc/i,
  /ui-avatars\.com/i,
  /robohash\.org/i,
  /images\.unsplash\.com\/photo-1577896851231-70ef18881754/i,
  /images\.unsplash\.com\/photo-1544717305-2782549b5136/i
];

export function isTestAvatarUrl(url?: string | null): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  return TEST_AVATAR_URL_PATTERNS.some((pattern) => pattern.test(trimmed));
}

export function resolveValidAvatarSrc(url?: string | null): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed || isTestAvatarUrl(trimmed)) return null;
  return trimmed;
}

export function getPersonInitials(name?: string | null, fallback = 'SC'): string {
  if (!name || typeof name !== 'string') return fallback;

  // Strip credential suffixes after comma (e.g. "Nnamdi Obi, M.Sc" -> "Nnamdi Obi")
  const primaryName = name.split(',')[0].trim();
  if (!primaryName) return fallback;

  const rawTokens = primaryName.split(/\s+/).filter(Boolean);
  const meaningfulTokens = [...rawTokens];

  // Drop leading honorific prefixes while leaving at least one primary name token
  while (meaningfulTokens.length > 1) {
    const normalizedToken = meaningfulTokens[0].toLowerCase().replace(/[^a-z]/g, '');
    if (HONORIFIC_PREFIXES.has(normalizedToken)) {
      meaningfulTokens.shift();
    } else {
      break;
    }
  }

  const cleanedTokens = meaningfulTokens
    .map((token) => token.replace(/[^a-zA-Z0-9]/g, ''))
    .filter(Boolean);

  if (cleanedTokens.length === 0) return fallback;
  if (cleanedTokens.length === 1) {
    return cleanedTokens[0].slice(0, 2).toUpperCase();
  }

  const first = cleanedTokens[0][0] || '';
  const last = cleanedTokens[cleanedTokens.length - 1][0] || '';
  const combined = `${first}${last}`.toUpperCase();
  return combined || fallback;
}

export function getNameAvatarGradient(name?: string | null): string {
  const normalized = (name || 'Student Companion').trim().toLowerCase();
  let hash = 2166136261;
  for (let i = 0; i < normalized.length; i++) {
    hash ^= normalized.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const idx = (hash >>> 0) % AVATAR_GRADIENT_PALETTE.length;
  return AVATAR_GRADIENT_PALETTE[idx];
}
