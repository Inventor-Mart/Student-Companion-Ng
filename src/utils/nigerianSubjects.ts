export const NIGERIAN_CURRICULUM_SUBJECTS: readonly string[] = [
  'English Language',
  'Mathematics',
  'Further Mathematics',
  'French',
  'CRS',
  'IRS',
  'Literature-in-English',
  'Government',
  'History',
  'Civic Education',
  'Geography',
  'Economics',
  'Commerce',
  'Financial Accounting',
  'Basic Science',
  'Basic Technology',
  'Physics',
  'Chemistry',
  'Biology',
  'Agricultural Science',
  'Computer Studies / ICT',
  'Home Economics',
  'Technical Drawing',
  'Yoruba',
  'Igbo',
  'Hausa'
] as const;

export const REPAIRED_TUTOR_EMAIL = 'okpebhogladness@gmail.com';
export const REPAIRED_TUTOR_SUBJECTS: string[] = ['English Language', 'French', 'CRS'];
export const REPAIRED_TUTOR_SPECIALIZATION = 'English Language, French and CRS';
export const SUBJECT_REPAIR_VERSION = 'okpebho_subjects_v1';

export function normalizeSubjectLabel(raw: string): string {
  const trimmed = String(raw || '').replace(/\s+/g, ' ').trim();
  if (!trimmed) return '';
  const lower = trimmed.toLowerCase();
  const canonical = NIGERIAN_CURRICULUM_SUBJECTS.find((item) => item.toLowerCase() === lower);
  if (canonical) return canonical;
  if (lower === 'c.r.s' || lower === 'c.r.s.' || lower === 'christian religious studies' || lower === 'crk') {
    return 'CRS';
  }
  if (lower === 'i.r.s' || lower === 'i.r.s.' || lower === 'islamic religious studies' || lower === 'irk') {
    return 'IRS';
  }
  if (lower === 'english') return 'English Language';
  if (lower === 'maths' || lower === 'math' || lower === 'general mathematics') return 'Mathematics';
  return trimmed;
}

export function dedupeSubjects(list: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of list) {
    const clean = normalizeSubjectLabel(raw);
    if (!clean) continue;
    const key = clean.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(clean);
  }
  return out;
}

export function formatSubjectSpecialization(subjects: string[], fallback = ''): string {
  const clean = dedupeSubjects(subjects);
  if (clean.length === 0) return fallback;
  if (clean.length === 1) return clean[0];
  if (clean.length === 2) return `${clean[0]} and ${clean[1]}`;
  return `${clean.slice(0, -1).join(', ')} and ${clean[clean.length - 1]}`;
}

export function parseSubjectString(raw: string | string[] | undefined | null): string[] {
  if (Array.isArray(raw)) {
    return dedupeSubjects(raw.map((item) => String(item || '')));
  }
  const text = String(raw || '').trim();
  if (!text) return [];
  const parts = text
    .split(/\s*,\s*|\s+and\s+|\s*&\s*/i)
    .map((p) => p.trim())
    .filter(Boolean);
  return dedupeSubjects(parts);
}

export function mergeTutorDataSafely<T extends Record<string, any> | undefined>(
  existing: T,
  incoming: T
): T {
  if (!existing && !incoming) return undefined as T;
  const ex = existing || ({} as Record<string, any>);
  const inc = incoming || ({} as Record<string, any>);
  const merged: Record<string, any> = {
    ...ex,
    ...inc
  };

  const exOverrideTs = Date.parse(String(ex.manualSubjectOverrideAt || ''));
  const incOverrideTs = Date.parse(String(inc.manualSubjectOverrideAt || ''));
  if (
    Number.isFinite(exOverrideTs) &&
    (!Number.isFinite(incOverrideTs) || exOverrideTs > incOverrideTs)
  ) {
    merged.proficientSubjects = ex.proficientSubjects;
    merged.subjectSpecialization = ex.subjectSpecialization;
    merged.manualSubjectOverrideAt = ex.manualSubjectOverrideAt;
    merged.subjectRepairVersion = ex.subjectRepairVersion;
    if (ex.tagline) merged.tagline = ex.tagline;
    if (ex.bio) merged.bio = ex.bio;
  }

  return merged as T;
}

export function repairSpecificTutorRecord<
  T extends { email?: string; role?: string; tutorData?: Record<string, any> }
>(user: T): { user: T; changed: boolean } {
  if (!user || typeof user !== 'object') return { user, changed: false };
  const cleanEmail = String(user.email || '').trim().toLowerCase();
  if (cleanEmail !== REPAIRED_TUTOR_EMAIL || user.role !== 'tutor') {
    return { user, changed: false };
  }

  const td = (user.tutorData && typeof user.tutorData === 'object' ? user.tutorData : {}) as Record<string, any>;
  if (td.manualSubjectOverrideAt && td.subjectRepairVersion === SUBJECT_REPAIR_VERSION) {
    return { user, changed: false };
  }

  const currentSubjects = Array.isArray(td.proficientSubjects)
    ? td.proficientSubjects.map((s: any) => String(s || '').trim()).filter(Boolean)
    : [];
  const currentSpec = String(td.subjectSpecialization || '').trim();
  const hasMathDefault =
    currentSubjects.some((s) => /^general\s+mathematics$|^mathematics$/i.test(s)) ||
    /^general\s+mathematics$|^mathematics$/i.test(currentSpec) ||
    currentSubjects.length === 0;

  if (!hasMathDefault && td.subjectRepairVersion === SUBJECT_REPAIR_VERSION) {
    return { user, changed: false };
  }

  const nextSubjects = [...REPAIRED_TUTOR_SUBJECTS];
  const nextSpec = REPAIRED_TUTOR_SPECIALIZATION;
  const rawTagline = String(td.tagline || '');
  const nextTagline =
    !rawTagline || /mathematics/i.test(rawTagline)
      ? `${nextSpec} Specialist${td.experienceYearsRange ? ` (${td.experienceYearsRange})` : ''}`
      : rawTagline;
  const rawBio = String(td.bio || '');
  const nextBio =
    !rawBio || /mathematics\s+educator|general\s+mathematics/i.test(rawBio)
      ? `${nextSpec} educator${td.experienceYearsRange ? ` with ${td.experienceYearsRange} experience` : ''}.`
      : rawBio;

  const repairedTutorData = {
    qualification: td.qualification || td.highestEducation || 'B.Ed.',
    hourlyRate: Number(td.hourlyRate) || 3500,
    teachingMode: td.teachingMode || 'both',
    ...td,
    proficientSubjects: nextSubjects,
    subjectSpecialization: nextSpec,
    tagline: nextTagline,
    bio: nextBio,
    subjectRepairVersion: SUBJECT_REPAIR_VERSION
  };

  return {
    changed: true,
    user: {
      ...user,
      tutorData: repairedTutorData
    }
  };
}
