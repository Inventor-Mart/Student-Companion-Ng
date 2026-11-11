import { AppFeatureId, AwardXPOptions, AwardXPResult, DailyExplorationState, StudentRank } from '../types';

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
  { id: 'uniform', name: 'AI Uniform Verification', description: 'School identity & crest inspection', tabId: 'dashboard' },
];

/**
 * Calculates rank from XP
 */
export const calculateRank = (xp: number, gender?: 'male' | 'female'): StudentRank => {
  if (xp >= 25000) return 'Senior Prefect';
  if (xp >= 15000) return gender === 'female' ? 'Senior Girl' : 'Senior Boy';
  if (xp >= 7500) return 'Prefect';
  if (xp >= 2500) return 'Scholar';
  return 'Fresher';
};

/**
 * Calculates dynamic XP based on value, exploration diversity, difficulty, volume, and repetition.
 */
export const calculateDynamicXP = (
  options: AwardXPOptions,
  currentExploration?: DailyExplorationState
): { result: AwardXPResult; updatedExploration: DailyExplorationState } => {
  const todayStr = new Date().toISOString().split('T')[0];
  const exploration: DailyExplorationState =
    currentExploration && currentExploration.date === todayStr
      ? {
          date: todayStr,
          featuresUsed: [...currentExploration.featuresUsed],
          featureCounts: { ...currentExploration.featureCounts },
        }
      : {
          date: todayStr,
          featuresUsed: [],
          featureCounts: {},
        };

  const featureKey = options.feature || 'general';
  const previousCount = exploration.featureCounts[featureKey] || 0;
  const newCount = previousCount + 1;
  exploration.featureCounts[featureKey] = newCount;

  if (featureKey !== 'general' && !exploration.featuresUsed.includes(featureKey)) {
    exploration.featuresUsed.push(featureKey);
  }

  // 1. Daily Explorer Multiplier (Diversity across tools)
  // 1 tool: 1.0x, 2 tools: 1.1x, 3 tools: 1.25x, 4+ tools: 1.5x
  const uniqueCount = exploration.featuresUsed.length;
  let explorerMultiplier = 1.0;
  if (uniqueCount >= 4) {
    explorerMultiplier = 1.5;
  } else if (uniqueCount === 3) {
    explorerMultiplier = 1.25;
  } else if (uniqueCount === 2) {
    explorerMultiplier = 1.1;
  }

  // 2. Anti-Repetition Diminishing Returns Curve
  // Repetitive farming in a single feature suffers diminishing returns.
  // Paid educational actions NEVER experience diminishing returns.
  let repeatFactor = 1.0;
  const isPaidAction = Boolean(options.paidAmountNgn && options.paidAmountNgn > 0);
  if (!isPaidAction) {
    if (newCount >= 5) {
      repeatFactor = 0.25; // 75% reduction for 5+ attempts
    } else if (newCount === 4) {
      repeatFactor = 0.5;  // 50% reduction for 4th attempt
    } else if (newCount === 3) {
      repeatFactor = 0.75; // 25% reduction for 3rd attempt
    }
  }

  // 3. Difficulty Multiplier (Demand Level)
  let difficultyMultiplier = 1.0;
  if (options.difficulty === 'hard') {
    difficultyMultiplier = 2.5; // High cognitive demand (JAMB UTME / National Olympiad)
  } else if (options.difficulty === 'medium') {
    difficultyMultiplier = 1.5; // Standard WAEC / BECE
  } else if (options.difficulty === 'easy') {
    difficultyMultiplier = 1.0; // Foundation drills
  }

  // 4. Volume / Examination Demand Multiplier
  let volumeMultiplier = 1.0;
  if (options.questionCount) {
    if (options.questionCount >= 40) {
      volumeMultiplier = 3.0; // Comprehensive 40-60 question exam
    } else if (options.questionCount >= 20) {
      volumeMultiplier = 1.75; // Standard 20-30 question block
    } else if (options.questionCount >= 10) {
      volumeMultiplier = 1.25; // Moderate 10-15 drill
    } else {
      volumeMultiplier = 1.0; // Quick 5-question check
    }
  }

  // 5. Academic Mastery & Accuracy Bonus
  let masteryBonus = 0;
  if (options.scorePercentage !== undefined) {
    if (options.scorePercentage >= 100) {
      masteryBonus = Math.round(options.baseXP * 0.5); // +50% flawless mastery
    } else if (options.scorePercentage >= 80) {
      masteryBonus = Math.round(options.baseXP * 0.25); // +25% high distinction
    }
  }

  // 6. Paid Milestone Bonus & Investment Scaling
  // The more expensive the educational feature, the higher the XP!
  let paidMilestoneBonus = 0;
  if (isPaidAction && options.paidAmountNgn) {
    const amount = options.paidAmountNgn;
    if (amount >= 15000) {
      paidMilestoneBonus = 8000; // Annual / Mega subscription pass
    } else if (amount >= 7500) {
      paidMilestoneBonus = 4500; // Termly full preparation pass / Aspirant Premium
    } else if (amount >= 5000) {
      paidMilestoneBonus = 2500; // Premium Masterclass / Multi-Hour Tutor Session
    } else if (amount >= 3000) {
      paidMilestoneBonus = 1500; // Verified 1-on-1 Tutor Booking (₦3,500)
    } else if (amount >= 2000) {
      paidMilestoneBonus = 1000; // Standard Tutor Booking (₦2,500)
    } else if (amount >= 1000) {
      paidMilestoneBonus = 600;  // Multi-subject pass unlock
    } else {
      paidMilestoneBonus = 350;  // Single subject / topic unlock (₦500)
    }
  }

  // Subtotal from scaled activity
  const scaledActivityXP = Math.round(
    options.baseXP * difficultyMultiplier * volumeMultiplier * repeatFactor * explorerMultiplier
  );

  const totalXPAwarded = Math.max(5, scaledActivityXP + masteryBonus + paidMilestoneBonus);

  return {
    result: {
      totalXPAwarded,
      baseXP: options.baseXP,
      difficultyMultiplier,
      volumeMultiplier,
      repeatFactor,
      explorerMultiplier,
      masteryBonus,
      paidMilestoneBonus,
      newDailyCount: newCount,
      uniqueFeaturesCount: uniqueCount,
      reason: options.reason || 'Academic Activity Completed',
    },
    updatedExploration: exploration,
  };
};

/**
 * Returns current daily explorer stats and next goal
 */
export const getExplorerStatus = (exploration?: DailyExplorationState) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const isToday = exploration && exploration.date === todayStr;
  const featuresUsed = isToday ? exploration.featuresUsed : [];
  const uniqueCount = featuresUsed.length;

  let multiplier = 1.0;
  let nextGoalCount = 2;
  let nextMultiplier = 1.1;

  if (uniqueCount >= 4) {
    multiplier = 1.5;
    nextGoalCount = 4;
    nextMultiplier = 1.5;
  } else if (uniqueCount === 3) {
    multiplier = 1.25;
    nextGoalCount = 4;
    nextMultiplier = 1.5;
  } else if (uniqueCount === 2) {
    multiplier = 1.1;
    nextGoalCount = 3;
    nextMultiplier = 1.25;
  } else {
    multiplier = 1.0;
    nextGoalCount = 2;
    nextMultiplier = 1.1;
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
  };
};
