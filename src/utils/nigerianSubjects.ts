import type { NigerianHighestEducation } from '../types';

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

export const NIGERIAN_HIGHER_EDUCATION_OPTIONS: readonly {
  value: NigerianHighestEducation;
  label: string;
}[] = [
  { value: 'NCE', label: 'NCE (Nigeria Certificate in Education)' },
  { value: 'OND', label: 'OND (Ordinary National Diploma)' },
  { value: 'HND', label: 'HND (Higher National Diploma)' },
  { value: 'B.A.', label: 'B.A. (Bachelor of Arts)' },
  { value: 'B.Sc.', label: 'B.Sc. (Bachelor of Science)' },
  { value: 'B.Ed.', label: 'B.Ed. (Bachelor of Education)' },
  { value: 'B.Eng.', label: 'B.Eng. (Bachelor of Engineering)' },
  { value: 'B.Tech.', label: 'B.Tech. (Bachelor of Technology)' },
  { value: 'PGDE', label: 'PGDE (Postgraduate Diploma in Education)' },
  { value: 'M.A.', label: 'M.A. (Master of Arts)' },
  { value: 'M.Ed.', label: 'M.Ed. (Master of Education)' },
  { value: 'M.Sc.', label: 'M.Sc. (Master of Science)' },
  { value: 'Ph.D.', label: 'Ph.D. / Doctorate' },
  { value: 'Other', label: 'Other Higher Degree / Qualification' }
] as const;

export const REPAIRED_TUTOR_EMAIL = 'okpebhogladness@gmail.com';
export const REPAIRED_TUTOR_SUBJECTS: string[] = ['English Language', 'French', 'CRS'];
export const REPAIRED_TUTOR_SPECIALIZATION = 'English Language, French and CRS';
export const SUBJECT_REPAIR_VERSION = 'okpebho_subjects_v1';
export const REPAIRED_TUTOR_PROFILE_VERSION = 'okpebho_profile_v2';
export const REPAIRED_TUTOR_HIGHEST_EDUCATION: NigerianHighestEducation = 'B.A.';
export const REPAIRED_TUTOR_QUALIFICATION = 'B.A.';
export const REPAIRED_TUTOR_INSTITUTION = 'University of Benin';
export const REPAIRED_TUTOR_COURSE = 'French Language';
export const REPAIRED_TUTOR_CITY = 'Benin City';
export const REPAIRED_TUTOR_STATE = 'Edo';
export const REPAIRED_TUTOR_DEGREES: string[] = ['B.A. French Language, University of Benin'];

const DEGREE_CANONICAL_MAP: Record<string, NigerianHighestEducation> = {
  nce: 'NCE',
  'n.c.e': 'NCE',
  'n.c.e.': 'NCE',
  ond: 'OND',
  'o.n.d': 'OND',
  'o.n.d.': 'OND',
  hnd: 'HND',
  'h.n.d': 'HND',
  'h.n.d.': 'HND',
  ba: 'B.A.',
  'b.a': 'B.A.',
  'b.a.': 'B.A.',
  'bachelor of arts': 'B.A.',
  bsc: 'B.Sc.',
  'b.sc': 'B.Sc.',
  'b.sc.': 'B.Sc.',
  'bachelor of science': 'B.Sc.',
  bed: 'B.Ed.',
  'b.ed': 'B.Ed.',
  'b.ed.': 'B.Ed.',
  'bachelor of education': 'B.Ed.',
  beng: 'B.Eng.',
  'b.eng': 'B.Eng.',
  'b.eng.': 'B.Eng.',
  'bachelor of engineering': 'B.Eng.',
  btech: 'B.Tech.',
  'b.tech': 'B.Tech.',
  'b.tech.': 'B.Tech.',
  'bachelor of technology': 'B.Tech.',
  pgde: 'PGDE',
  'p.g.d.e': 'PGDE',
  'p.g.d.e.': 'PGDE',
  ma: 'M.A.',
  'm.a': 'M.A.',
  'm.a.': 'M.A.',
  'master of arts': 'M.A.',
  med: 'M.Ed.',
  'm.ed': 'M.Ed.',
  'm.ed.': 'M.Ed.',
  'master of education': 'M.Ed.',
  msc: 'M.Sc.',
  'm.sc': 'M.Sc.',
  'm.sc.': 'M.Sc.',
  'master of science': 'M.Sc.',
  phd: 'Ph.D.',
  'ph.d': 'Ph.D.',
  'ph.d.': 'Ph.D.',
  doctorate: 'Ph.D.',
  other: 'Other',
  'other higher degree': 'Other'
};

export function normalizeHighestEducation(
  raw?: string | null,
  qualificationHint?: string | null
): NigerianHighestEducation {
  const cleanRaw = String(raw || '').replace(/\s+/g, ' ').trim();
  const rawLower = cleanRaw.toLowerCase();
  const mappedRaw = DEGREE_CANONICAL_MAP[rawLower];

  const cleanHint = String(qualificationHint || '').replace(/\s+/g, ' ').trim();
  const hintLower = cleanHint.toLowerCase();
  const mappedHint = DEGREE_CANONICAL_MAP[hintLower];

  if (mappedRaw && mappedRaw !== 'Other') {
    return mappedRaw;
  }
  if ((mappedRaw === 'Other' || !cleanRaw) && mappedHint && mappedHint !== 'Other') {
    return mappedHint;
  }
  if (mappedRaw === 'Other') return 'Other';
  if (cleanRaw) {
    for (const opt of NIGERIAN_HIGHER_EDUCATION_OPTIONS) {
      if (opt.value.toLowerCase() === rawLower) return opt.value;
    }
    return 'Other';
  }
  return 'B.Sc.';
}

export function formatTutorLocation(
  city?: string | null,
  state?: string | null,
  fallback = 'Lagos, Nigeria'
): string {
  const rawParts = [String(city || ''), String(state || '')]
    .flatMap((chunk) => chunk.split(','))
    .map((part) => part.replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  const seen = new Set<string>();
  const unique: string[] = [];
  for (const part of rawParts) {
    const key = part.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(part);
  }
  return unique.length > 0 ? unique.join(', ') : fallback;
}

export function formatDisplayLocationWithState(
  location?: string | null,
  state?: string | null
): string {
  return formatTutorLocation(location, state, 'Nigeria');
}

export function formatPrimaryDegreeSummary(params: {
  highestEducation?: string | null;
  qualification?: string | null;
  courseOfStudy?: string | null;
  institution?: string | null;
}): string {
  const normalizedEd = normalizeHighestEducation(params.highestEducation, params.qualification);
  const rawQual = String(params.qualification || '').replace(/\s+/g, ' ').trim();
  const rawCourse = String(params.courseOfStudy || '').replace(/\s+/g, ' ').trim();
  const rawInstitution = String(params.institution || '').replace(/\s+/g, ' ').trim();

  let degreePrefix = '';
  if (normalizedEd === 'Other') {
    degreePrefix = rawQual && !/^other$/i.test(rawQual) ? rawQual : 'Verified Degree';
  } else if (
    rawQual &&
    !/^other$/i.test(rawQual) &&
    rawQual.length > normalizedEd.length + 1 &&
    rawQual.toLowerCase().includes(normalizedEd.toLowerCase().replace(/\.$/, ''))
  ) {
    // e.g. "B.A. (Second Class Upper)"
    degreePrefix = rawQual;
  } else {
    degreePrefix = normalizedEd;
  }

  const coursePart =
    rawCourse && !/^education\s*&\s*(arts\s*\/\s*sciences|science)$/i.test(rawCourse)
      ? rawCourse
      : rawCourse;

  const headline = coursePart ? `${degreePrefix} ${coursePart}` : degreePrefix;
  if (rawInstitution) {
    return `${headline}, ${rawInstitution}`;
  }
  return headline;
}

export function isStalePlaceholderDegree(entry: string, currentInstitution?: string): boolean {
  const clean = String(entry || '').replace(/\s+/g, ' ').trim();
  if (!clean) return true;
  if (/^b\.sc\.\s+education\s*&\s*science,\s*university of lagos$/i.test(clean)) return true;
  if (/^b\.sc\.\s+education(\s*&\s*arts\s*\/\s*sciences)?,\s*university of lagos$/i.test(clean)) return true;
  if (/^b\.sc\.\s+education\s*\(university of lagos\)$/i.test(clean)) return true;
  if (/^b\.eng\s+mechanical engineering,\s*university of lagos/i.test(clean)) return true;
  if (/^national mathematics olympiad gold mentor/i.test(clean)) return true;

  const cleanInst = String(currentInstitution || '').trim().toLowerCase();
  if (cleanInst && !cleanInst.includes('lagos') && /university of lagos/i.test(clean)) {
    return true;
  }
  return false;
}

export function rebuildTutorDegrees(
  existingDegrees: string[] | undefined,
  params: {
    highestEducation?: string | null;
    qualification?: string | null;
    courseOfStudy?: string | null;
    institution?: string | null;
  },
  previousSnapshot?: {
    highestEducation?: string | null;
    qualification?: string | null;
    courseOfStudy?: string | null;
    institution?: string | null;
  }
): string[] {
  const primary = formatPrimaryDegreeSummary(params);
  const previousPrimary = previousSnapshot ? formatPrimaryDegreeSummary(previousSnapshot) : '';
  const currentInst = String(params.institution || '').trim();

  const preservedExtras = (Array.isArray(existingDegrees) ? existingDegrees : [])
    .map((item) => String(item || '').replace(/\s+/g, ' ').trim())
    .filter((item) => {
      if (!item) return false;
      if (isStalePlaceholderDegree(item, currentInst)) return false;
      if (primary && item.toLowerCase() === primary.toLowerCase()) return false;
      if (previousPrimary && item.toLowerCase() === previousPrimary.toLowerCase()) return false;
      return true;
    });

  return primary ? [primary, ...preservedExtras] : preservedExtras;
}

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

function getTutorOverrideTimestampMs(td: Record<string, any> | undefined): number {
  if (!td || typeof td !== 'object') return -1;
  const profileTs = Date.parse(String(td.manualProfileOverrideAt || ''));
  const subjectTs = Date.parse(String(td.manualSubjectOverrideAt || ''));
  const candidates = [profileTs, subjectTs].filter((val) => Number.isFinite(val));
  return candidates.length > 0 ? Math.max(...candidates) : -1;
}

export function mergeTutorDataSafely<T extends Record<string, any> | undefined>(
  existing: T,
  incoming: T
): T {
  if (!existing && !incoming) return undefined as T;
  const ex = existing || ({} as Record<string, any>);
  const inc = incoming || ({} as Record<string, any>);

  const exTs = getTutorOverrideTimestampMs(ex);
  const incTs = getTutorOverrideTimestampMs(inc);
  const exIsV2 = ex.profileRepairVersion === REPAIRED_TUTOR_PROFILE_VERSION;
  const incIsV2 = inc.profileRepairVersion === REPAIRED_TUTOR_PROFILE_VERSION;

  const exWins =
    (exTs > 0 && (incTs <= 0 || exTs > incTs)) ||
    (exIsV2 && !incIsV2 && incTs <= 0);

  if (exWins) {
    // Existing record has a strictly newer explicit Admin/Tutor edit: protect all edited tutor fields
    const merged: Record<string, any> = {
      ...inc,
      ...ex
    };
    const protectedArrayKeys = [
      'proficientSubjects',
      'degrees',
      'certifications',
      'examSpecializations',
      'curriculumHighlights',
      'targetClasses',
      'timetable',
      'guarantors'
    ];
    for (const key of protectedArrayKeys) {
      if (Array.isArray(ex[key])) {
        merged[key] = ex[key];
      }
    }
    return merged as T;
  }

  // Incoming wins (or equal/no timestamps)
  const merged: Record<string, any> = {
    ...ex,
    ...inc
  };
  if (inc.degrees === undefined && Array.isArray(ex.degrees)) {
    merged.degrees = ex.degrees;
  }
  if (inc.proficientSubjects === undefined && Array.isArray(ex.proficientSubjects)) {
    merged.proficientSubjects = ex.proficientSubjects;
  }
  if (!inc.manualProfileOverrideAt && ex.manualProfileOverrideAt && incTs < exTs) {
    merged.manualProfileOverrideAt = ex.manualProfileOverrideAt;
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

  // Once v2 repair has been applied AND a subsequent manual override exists with v2 marker, respect future edits
  if (td.profileRepairVersion === REPAIRED_TUTOR_PROFILE_VERSION && td.manualProfileOverrideAt) {
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

  const currentDegrees = Array.isArray(td.degrees) ? td.degrees.map((d: any) => String(d || '').trim()) : [];
  const currentInstitution = String(td.institution || '').trim();
  const currentCourse = String(td.courseOfStudy || '').trim();
  const currentCity = String(td.city || '').trim();
  const currentState = String(td.state || '').trim();
  const currentHighestEd = String(td.highestEducation || '').trim();
  const currentQual = String(td.qualification || '').trim();

  const needsProfileV2Repair =
    td.profileRepairVersion !== REPAIRED_TUTOR_PROFILE_VERSION ||
    currentHighestEd !== REPAIRED_TUTOR_HIGHEST_EDUCATION ||
    !currentQual ||
    /^other$/i.test(currentQual) ||
    /^b\.sc\.?$/i.test(currentQual) ||
    /^b\.a$/i.test(currentQual) ||
    !currentInstitution ||
    /university of lagos/i.test(currentInstitution) ||
    !currentCourse ||
    /education\s*&\s*(arts|science)/i.test(currentCourse) ||
    currentDegrees.length === 0 ||
    currentDegrees.some((d) => isStalePlaceholderDegree(d, REPAIRED_TUTOR_INSTITUTION) || /^b\.sc\./i.test(d)) ||
    !currentCity ||
    /benin city,\s*edo/i.test(currentCity) ||
    currentState !== REPAIRED_TUTOR_STATE;

  if (!hasMathDefault && !needsProfileV2Repair && td.profileRepairVersion === REPAIRED_TUTOR_PROFILE_VERSION) {
    return { user, changed: false };
  }

  const nextSubjects = hasMathDefault ? [...REPAIRED_TUTOR_SUBJECTS] : currentSubjects;
  const nextSpec = hasMathDefault ? REPAIRED_TUTOR_SPECIALIZATION : currentSpec || REPAIRED_TUTOR_SPECIALIZATION;

  const rawTagline = String(td.tagline || '').trim();
  const nextTagline =
    !rawTagline || /mathematics/i.test(rawTagline)
      ? `${nextSpec} Specialist${td.experienceYearsRange ? ` (${td.experienceYearsRange})` : ''}`
      : rawTagline;

  const rawBio = String(td.bio || '').trim();
  const nextBio =
    !rawBio || /mathematics\s+educator|general\s+mathematics/i.test(rawBio)
      ? `${nextSpec} educator${td.experienceYearsRange ? ` with ${td.experienceYearsRange} experience` : ''}.`
      : rawBio;

  const nextHighestEd = REPAIRED_TUTOR_HIGHEST_EDUCATION;
  const nextQual = REPAIRED_TUTOR_QUALIFICATION;
  const nextInst = REPAIRED_TUTOR_INSTITUTION;
  const nextCourse = REPAIRED_TUTOR_COURSE;
  const nextDegrees = rebuildTutorDegrees(currentDegrees, {
    highestEducation: nextHighestEd,
    qualification: nextQual,
    courseOfStudy: nextCourse,
    institution: nextInst
  });

  const repairedTutorData = {
    hourlyRate: Number(td.hourlyRate) || 5000,
    teachingMode: td.teachingMode || 'both',
    ...td,
    proficientSubjects: nextSubjects,
    subjectSpecialization: nextSpec,
    highestEducation: nextHighestEd,
    qualification: nextQual,
    institution: nextInst,
    courseOfStudy: nextCourse,
    degrees: nextDegrees.length > 0 ? nextDegrees : [...REPAIRED_TUTOR_DEGREES],
    city: REPAIRED_TUTOR_CITY,
    state: REPAIRED_TUTOR_STATE,
    tagline: nextTagline,
    bio: nextBio,
    subjectRepairVersion: SUBJECT_REPAIR_VERSION,
    profileRepairVersion: REPAIRED_TUTOR_PROFILE_VERSION,
    manualProfileOverrideAt:
      td.manualProfileOverrideAt || td.manualSubjectOverrideAt || '2026-11-18T00:00:00.000Z'
  };

  return {
    changed: true,
    user: {
      ...user,
      tutorData: repairedTutorData
    }
  };
}
