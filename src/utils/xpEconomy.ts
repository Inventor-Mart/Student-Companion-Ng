import {
  AppFeatureId,
  AwardXPOptions,
  AwardXPResult,
  DailyExplorationState,
  StudentRank
} from '../types';

export const DAILY_XP_CAP = 600;
export const MAX_PAID_XP_BONUS = 100;

export interface RankMasterySnapshot {
  streakDays?: number;
  verifiedNotesCount?: number;
  examPercentages?: number[];
  qualifyingExams60?: number;
  qualifyingExams70?: number;
  qualifyingExams75?: number;
  qualifyingExams80?: number;
}

export interface RankTierDefinition {
  rank: 'Fresher' | 'Scholar' | 'Prefect' | 'Senior' | 'Senior Prefect';
  label: string;
  minXP: number;
  minStreakDays: number;
  minVerifiedNotes: number;
  minQualifyingExams: number;
  minExamScore: number;
  easyMultiplier: number;
  mediumMultiplier: number;
  hardMultiplier: number;
}

export const RANK_LADDER: RankTierDefinition[] = [
  {
    rank: 'Fresher',
    label: 'Fresher',
    minXP: 0,
    minStreakDays: 0,
    minVerifiedNotes: 0,
    minQualifyingExams: 0,
    minExamScore: 0,
    easyMultiplier: 1.0,
    mediumMultiplier: 1.35,
    hardMultiplier: 1.8
  },
  {
    rank: 'Scholar',
    label: 'Scholar',
    minXP: 3000,
    minStreakDays: 3,
    minVerifiedNotes: 3,
    minQualifyingExams: 2,
    minExamScore: 60,
    easyMultiplier: 0.7,
    mediumMultiplier: 1.2,
    hardMultiplier: 1.75
  },
  {
    rank: 'Prefect',
    label: 'Prefect',
    minXP: 12000,
    minStreakDays: 7,
    minVerifiedNotes: 8,
    minQualifyingExams: 5,
    minExamScore: 70,
    easyMultiplier: 0.45,
    mediumMultiplier: 1.0,
    hardMultiplier: 1.65
  },
  {
    rank: 'Senior',
    label: 'Senior Boy / Girl',
    minXP: 30000,
    minStreakDays: 14,
    minVerifiedNotes: 18,
    minQualifyingExams: 12,
    minExamScore: 75,
    easyMultiplier: 0.25,
    mediumMultiplier: 0.8,
    hardMultiplier: 1.5
  },
  {
    rank: 'Senior Prefect',
    label: 'Senior Prefect',
    minXP: 65000,
    minStreakDays: 30,
    minVerifiedNotes: 35,
    minQualifyingExams: 25,
    minExamScore: 80,
    easyMultiplier: 0.15,
    mediumMultiplier: 0.6,
    hardMultiplier: 1.35
  }
];

export const ALL_APP_FEATURES: Array<{ id: AppFeatureId; name: string; description: string; tabId: string }> = [
  { id: 'cbt', name: 'CBT Practice Engine', description: 'WAEC, JAMB & NECO tests', tabId: 'cbt' },
  { id: 'aspirant-cbt', name: 'Aspirant Simulator', description: 'Full 4-subject JAMB simulation', tabId: 'aspirant-cbt' },
  { id: 'syllabus', name: 'Scheme of Work', description: 'Curriculum & lesson note reader', tabId: 'syllabus' },
  { id: 'formulas', name: 'Science Formulas', description: 'Interactive formulas & calculators', tabId: 'formulas' },
  { id: 'ai-coach', name: 'SC AI Study Coach', description: 'AI study plans & topic diagnostics', tabId: 'ai-coach' },
  { id: 'tutors', name: '1-on-1 Tutors', description: 'Verified expert academic tutoring', tabId: 'tutors' },
  { id: 'games', name: 'Educational Games', description: '12 curriculum mini-games', tabId: 'games' },
  { id: 'competitions', name: 'Competitions Hub', description: 'National academic olympiads', tabId: 'competitions' },
  { id: 'exam-prep', name: 'Prepare For Exam', description: 'Intensive drills & past papers', tabId: 'exam-prep' },
  { id: 'community', name: 'Student Forum', description: 'Peer discussion & academic queries', tabId: 'community' },
  { id: 'uniform', name: 'AI Uniform Verification', description: 'School identity & crest inspection', tabId: 'dashboard' }
];

export interface NormalizedMasteryCounts {
  streakDays: number;
  verifiedNotesCount: number;
  qualifyingExams60: number;
  qualifyingExams70: number;
  qualifyingExams75: number;
  qualifyingExams80: number;
}

export const normalizeMasteryCounts = (mastery?: RankMasterySnapshot): NormalizedMasteryCounts => {
  const percentages = Array.isArray(mastery?.examPercentages) ? mastery!.examPercentages! : [];
  const countAtLeast = (threshold: number) =>
    percentages.filter(p => Number(p) >= threshold).length;

  return {
    streakDays: Math.max(0, Math.floor(Number(mastery?.streakDays) || 0)),
    verifiedNotesCount: Math.max(0, Math.floor(Number(mastery?.verifiedNotesCount) || 0)),
    qualifyingExams60: Math.max(countAtLeast(60), Math.floor(Number(mastery?.qualifyingExams60) || 0)),
    qualifyingExams70: Math.max(countAtLeast(70), Math.floor(Number(mastery?.qualifyingExams70) || 0)),
    qualifyingExams75: Math.max(countAtLeast(75), Math.floor(Number(mastery?.qualifyingExams75) || 0)),
    qualifyingExams80: Math.max(countAtLeast(80), Math.floor(Number(mastery?.qualifyingExams80) || 0))
  };
};

export const getQualifyingExamsForTier = (
  tier: RankTierDefinition,
  counts: NormalizedMasteryCounts
): number => {
  if (tier.minExamScore >= 80) return counts.qualifyingExams80;
  if (tier.minExamScore >= 75) return counts.qualifyingExams75;
  if (tier.minExamScore >= 70) return counts.qualifyingExams70;
  if (tier.minExamScore >= 60) return counts.qualifyingExams60;
  return 0;
};

export const doesMeetTierMasteryGates = (
  tier: RankTierDefinition,
  mastery?: RankMasterySnapshot
): boolean => {
  if (tier.minXP <= 0) return true;
  if (!mastery) return true;
  const counts = normalizeMasteryCounts(mastery);
  const examCount = getQualifyingExamsForTier(tier, counts);
  return (
    counts.streakDays >= tier.minStreakDays &&
    counts.verifiedNotesCount >= tier.minVerifiedNotes &&
    examCount >= tier.minQualifyingExams
  );
};

export const getRankTierDefinition = (rank?: StudentRank | string): RankTierDefinition => {
  const r = String(rank || 'Fresher');
  if (r === 'Senior Prefect') return RANK_LADDER[4];
  if (r === 'Senior Boy' || r === 'Senior Girl') return RANK_LADDER[3];
  if (r === 'Prefect') return RANK_LADDER[2];
  if (r === 'Scholar') return RANK_LADDER[1];
  return RANK_LADDER[0];
};

const formatTierRank = (tier: RankTierDefinition, gender?: 'male' | 'female'): StudentRank => {
  if (tier.rank === 'Senior') {
    return gender === 'female' ? 'Senior Girl' : 'Senior Boy';
  }
  return tier.rank;
};

/**
 * Calculates student rank from both XP threshold and verified academic mastery gates.
 */
export const calculateRank = (
  xp: number,
  gender?: 'male' | 'female',
  mastery?: RankMasterySnapshot
): StudentRank => {
  const safeXp = Math.max(0, Math.floor(Number(xp) || 0));
  for (let i = RANK_LADDER.length - 1; i >= 0; i -= 1) {
    const tier = RANK_LADDER[i];
    if (safeXp >= tier.minXP && doesMeetTierMasteryGates(tier, mastery)) {
      return formatTierRank(tier, gender);
    }
  }
  return 'Fresher';
};

export interface RankGateCheck {
  id: 'streak' | 'notes' | 'exams';
  label: string;
  current: number;
  required: number;
  met: boolean;
}

export const getRankProgress = (
  xp: number,
  gender?: 'male' | 'female',
  mastery?: RankMasterySnapshot
): {
  currentXP: number;
  currentRank: StudentRank;
  target: number;
  nextRank: string;
  percent: number;
  isMaxRank: boolean;
  xpReadyForNextRank: boolean;
  gatesPending: boolean;
  gateChecks: RankGateCheck[];
} => {
  const safeXp = Math.max(0, Math.floor(Number(xp) || 0));
  const currentRank = calculateRank(safeXp, gender, mastery);
  const currentTier = getRankTierDefinition(currentRank);
  const currentIdx = RANK_LADDER.findIndex(t => t.rank === currentTier.rank);
  const nextTier = currentIdx >= 0 && currentIdx < RANK_LADDER.length - 1
    ? RANK_LADDER[currentIdx + 1]
    : null;

  if (!nextTier) {
    return {
      currentXP: safeXp,
      currentRank,
      target: currentTier.minXP,
      nextRank: 'Senior Prefect',
      percent: 100,
      isMaxRank: true,
      xpReadyForNextRank: true,
      gatesPending: false,
      gateChecks: []
    };
  }

  const counts = normalizeMasteryCounts(mastery);
  const qualifyingCount = getQualifyingExamsForTier(nextTier, counts);
  const gateChecks: RankGateCheck[] = [
    {
      id: 'streak',
      label: `${nextTier.minStreakDays}-day study streak`,
      current: counts.streakDays,
      required: nextTier.minStreakDays,
      met: counts.streakDays >= nextTier.minStreakDays
    },
    {
      id: 'notes',
      label: `${nextTier.minVerifiedNotes} verified lesson notes`,
      current: counts.verifiedNotesCount,
      required: nextTier.minVerifiedNotes,
      met: counts.verifiedNotesCount >= nextTier.minVerifiedNotes
    },
    {
      id: 'exams',
      label: `${nextTier.minQualifyingExams} CBT exams (${nextTier.minExamScore}%+ score)`,
      current: qualifyingCount,
      required: nextTier.minQualifyingExams,
      met: qualifyingCount >= nextTier.minQualifyingExams
    }
  ];

  const xpReadyForNextRank = safeXp >= nextTier.minXP;
  const allGatesMet = gateChecks.every(g => g.met);
  const rawPercent = Math.round((safeXp / nextTier.minXP) * 100);

  return {
    currentXP: safeXp,
    currentRank,
    target: nextTier.minXP,
    nextRank: formatTierRank(nextTier, gender),
    percent: Math.min(100, Math.max(0, rawPercent)),
    isMaxRank: false,
    xpReadyForNextRank,
    gatesPending: xpReadyForNextRank && !allGatesMet,
    gateChecks
  };
};

/**
 * Calculates progressive XP scaled by current student rank, task difficulty,
 * exam rigor, anti-repetition diminishing returns, capped paid appreciation bonus (<= 100 XP),
 * and the strict 600 XP daily earnable cap.
 */
export const calculateDynamicXP = (
  options: AwardXPOptions,
  currentExploration?: DailyExplorationState,
  currentRank: StudentRank = 'Fresher'
): { result: AwardXPResult; updatedExploration: DailyExplorationState } => {
  const todayStr = new Date().toISOString().split('T')[0];
  const isToday = currentExploration && currentExploration.date === todayStr;
  const exploration: DailyExplorationState = isToday
    ? {
        date: todayStr,
        featuresUsed: [...currentExploration.featuresUsed],
        featureCounts: { ...currentExploration.featureCounts },
        dailyXpEarned: Math.max(0, Math.floor(Number(currentExploration.dailyXpEarned) || 0))
      }
    : {
        date: todayStr,
        featuresUsed: [],
        featureCounts: {},
        dailyXpEarned: 0
      };

  const featureKey = options.feature || 'general';
  const previousCount = exploration.featureCounts[featureKey] || 0;
  const newCount = previousCount + 1;
  exploration.featureCounts[featureKey] = newCount;

  if (featureKey !== 'general' && !exploration.featuresUsed.includes(featureKey)) {
    exploration.featuresUsed.push(featureKey);
  }

  // 1. Daily Explorer Multiplier (kept modest so single-day multipliers can't race ranks)
  // 1 tool: 1.0x, 2 tools: 1.05x, 3 tools: 1.15x, 4+ tools: 1.25x
  const uniqueCount = exploration.featuresUsed.length;
  let explorerMultiplier = 1.0;
  if (uniqueCount >= 4) {
    explorerMultiplier = 1.25;
  } else if (uniqueCount === 3) {
    explorerMultiplier = 1.15;
  } else if (uniqueCount === 2) {
    explorerMultiplier = 1.05;
  }

  // 2. Anti-Repetition Diminishing Returns Curve (steeper decay against farming)
  // 1st: 100%, 2nd: 85%, 3rd: 60%, 4th: 35%, 5+: 15%
  let repeatFactor = 1.0;
  const isPaidAction = Boolean(options.paidAmountNgn && options.paidAmountNgn > 0);
  if (!isPaidAction) {
    if (newCount >= 5) {
      repeatFactor = 0.15;
    } else if (newCount === 4) {
      repeatFactor = 0.35;
    } else if (newCount === 3) {
      repeatFactor = 0.6;
    } else if (newCount === 2) {
      repeatFactor = 0.85;
    }
  }

  // 3. Rank-Scaled Difficulty Multiplier (Higher ranks earn sharply less from easy tasks)
  const rankTier = getRankTierDefinition(currentRank);
  const effectiveDifficulty: 'easy' | 'medium' | 'hard' =
    options.difficulty || (featureKey === 'games' ? 'easy' : 'medium');

  let difficultyMultiplier = rankTier.mediumMultiplier;
  let rankScalingFactor = 1.0;
  if (effectiveDifficulty === 'hard') {
    difficultyMultiplier = rankTier.hardMultiplier;
    rankScalingFactor = Number((rankTier.hardMultiplier / RANK_LADDER[0].hardMultiplier).toFixed(2));
  } else if (effectiveDifficulty === 'easy') {
    difficultyMultiplier = rankTier.easyMultiplier;
    rankScalingFactor = rankTier.easyMultiplier;
  } else {
    difficultyMultiplier = rankTier.mediumMultiplier;
    rankScalingFactor = Number((rankTier.mediumMultiplier / RANK_LADDER[0].mediumMultiplier).toFixed(2));
  }

  // 4. Volume / Examination Demand Multiplier (tightened)
  let volumeMultiplier = 1.0;
  if (options.questionCount) {
    if (options.questionCount >= 40) {
      volumeMultiplier = 2.0;
    } else if (options.questionCount >= 20) {
      volumeMultiplier = 1.4;
    } else if (options.questionCount >= 10) {
      volumeMultiplier = 1.15;
    } else {
      volumeMultiplier = 1.0;
    }
  }

  // 5. Academic Accuracy Mastery Bonus & Low-Score Damper
  let masteryBonus = 0;
  let accuracyDamper = 1.0;
  if (options.scorePercentage !== undefined) {
    if (options.scorePercentage >= 90) {
      masteryBonus = Math.round(options.baseXP * 0.25);
    } else if (options.scorePercentage >= 75) {
      masteryBonus = Math.round(options.baseXP * 0.15);
    } else if (options.scorePercentage < 50) {
      accuracyDamper = 0.5;
    }
  }

  // 6. Symbolic Paid Action Appreciation Bonus (strictly capped at 100 XP)
  let paidMilestoneBonus = 0;
  if (isPaidAction && options.paidAmountNgn) {
    const amount = options.paidAmountNgn;
    if (amount >= 10000) {
      paidMilestoneBonus = 100;
    } else if (amount >= 5000) {
      paidMilestoneBonus = 75;
    } else if (amount >= 2000) {
      paidMilestoneBonus = 50;
    } else {
      paidMilestoneBonus = 25;
    }
    paidMilestoneBonus = Math.min(MAX_PAID_XP_BONUS, paidMilestoneBonus);
  }

  const baseInput = isPaidAction ? 0 : Math.max(0, options.baseXP);
  const scaledActivityXP = isPaidAction
    ? 0
    : Math.round(
        baseInput *
          difficultyMultiplier *
          volumeMultiplier *
          repeatFactor *
          explorerMultiplier *
          accuracyDamper
      );

  const rawAward = isPaidAction
    ? paidMilestoneBonus
    : Math.max(2, scaledActivityXP + masteryBonus);

  // 7. Daily Earnable XP Cap (600 XP/day across all tasks)
  const earnedTodayBefore = Math.max(0, Math.floor(Number(exploration.dailyXpEarned) || 0));
  const remainingDailyCap = Math.max(0, DAILY_XP_CAP - earnedTodayBefore);
  const totalXPAwarded = Math.min(rawAward, remainingDailyCap);
  const cappedByDailyLimit = rawAward > remainingDailyCap;
  const dailyXpEarnedAfter = earnedTodayBefore + totalXPAwarded;
  exploration.dailyXpEarned = dailyXpEarnedAfter;

  return {
    result: {
      totalXPAwarded,
      baseXP: isPaidAction ? 0 : options.baseXP,
      difficultyMultiplier,
      volumeMultiplier,
      repeatFactor,
      explorerMultiplier,
      masteryBonus,
      paidMilestoneBonus,
      rankScalingFactor,
      cappedByDailyLimit,
      dailyXpEarned: dailyXpEarnedAfter,
      dailyXpCap: DAILY_XP_CAP,
      newDailyCount: newCount,
      uniqueFeaturesCount: uniqueCount,
      reason: options.reason || 'Academic Activity Completed'
    },
    updatedExploration: exploration
  };
};

/**
 * Returns current daily explorer stats, daily XP cap progress, and next multiplier goal.
 */
export const getExplorerStatus = (exploration?: DailyExplorationState) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const isToday = exploration && exploration.date === todayStr;
  const featuresUsed = isToday ? exploration.featuresUsed : [];
  const uniqueCount = featuresUsed.length;
  const dailyXpEarned = isToday ? Math.max(0, Math.floor(Number(exploration.dailyXpEarned) || 0)) : 0;

  let multiplier = 1.0;
  let nextGoalCount = 2;
  let nextMultiplier = 1.05;

  if (uniqueCount >= 4) {
    multiplier = 1.25;
    nextGoalCount = 4;
    nextMultiplier = 1.25;
  } else if (uniqueCount === 3) {
    multiplier = 1.15;
    nextGoalCount = 4;
    nextMultiplier = 1.25;
  } else if (uniqueCount === 2) {
    multiplier = 1.05;
    nextGoalCount = 3;
    nextMultiplier = 1.15;
  } else {
    multiplier = 1.0;
    nextGoalCount = 2;
    nextMultiplier = 1.05;
  }

  const unexploredFeatures = ALL_APP_FEATURES.filter(f => !featuresUsed.includes(f.id));

  return {
    uniqueCount,
    multiplier,
    nextGoalCount,
    nextMultiplier,
    featuresUsed,
    unexploredFeatures,
    isMaxMultiplier: uniqueCount >= 4,
    dailyXpEarned,
    dailyXpCap: DAILY_XP_CAP,
    dailyXpRemaining: Math.max(0, DAILY_XP_CAP - dailyXpEarned),
    isDailyCapReached: dailyXpEarned >= DAILY_XP_CAP
  };
};
