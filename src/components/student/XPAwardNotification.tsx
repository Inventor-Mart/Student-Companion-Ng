import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Zap, Compass, Sparkles, X, ChevronRight } from 'lucide-react';

export const XPAwardNotification: React.FC = () => {
  const { lastXPAward, dismissLastXPAward, setActiveStudentTab } = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (lastXPAward) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(dismissLastXPAward, 300);
      }, 6000);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [lastXPAward, dismissLastXPAward]);

  if (!lastXPAward || !visible) return null;

  const isPaidMilestone = lastXPAward.paidMilestoneBonus > 0;
  const isHighMultiplier = lastXPAward.explorerMultiplier > 1.0 || lastXPAward.difficultyMultiplier > 1.0;
  const isDiminished = lastXPAward.repeatFactor < 1.0;

  return (
    <div className="fixed bottom-20 right-4 md:right-8 z-50 max-w-sm w-[calc(100vw-2rem)] animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className={`p-4 rounded-2xl shadow-xl border backdrop-blur-md transition-all ${
        isPaidMilestone
          ? 'bg-amber-950/95 border-amber-500/40 text-amber-50 shadow-amber-950/50'
          : 'bg-slate-900/95 border-emerald-500/40 text-slate-100 shadow-slate-950/60'
      }`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl flex items-center justify-center shrink-0 ${
              isPaidMilestone
                ? 'bg-amber-500/20 text-amber-400'
                : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              {isPaidMilestone ? <Sparkles className="w-5 h-5" /> : <Award className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-mono font-black text-lg tabular-nums tracking-tight text-white">
                  +{lastXPAward.totalXPAwarded.toLocaleString()} XP
                </span>
                {isPaidMilestone && (
                  <span className="text-[11px] font-semibold text-amber-300 tracking-wide uppercase">
                    · Investment Milestone
                  </span>
                )}
                {lastXPAward.explorerMultiplier > 1.0 && (
                  <span className="text-[11px] font-semibold text-emerald-300 flex items-center gap-0.5">
                    <Compass className="w-3 h-3 inline" /> {lastXPAward.explorerMultiplier}x Explorer
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                {lastXPAward.reason}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setVisible(false);
              setTimeout(dismissLastXPAward, 200);
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Dismiss XP notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Calculation Breakdown Line */}
        <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>{lastXPAward.baseXP} Base</span>
          {lastXPAward.difficultyMultiplier > 1.0 && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-sky-300">{lastXPAward.difficultyMultiplier}x Difficulty</span>
            </>
          )}
          {lastXPAward.volumeMultiplier > 1.0 && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-indigo-300">{lastXPAward.volumeMultiplier}x Exam Demand</span>
            </>
          )}
          {lastXPAward.masteryBonus > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-300">+{lastXPAward.masteryBonus} Mastery Bonus</span>
            </>
          )}
          {lastXPAward.paidMilestoneBonus > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-amber-300 font-medium">+{lastXPAward.paidMilestoneBonus.toLocaleString()} Appreciation Bonus</span>
            </>
          )}
          {lastXPAward.rankScalingFactor !== undefined && lastXPAward.rankScalingFactor < 1 && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-amber-300">Rank Rate {Math.round(lastXPAward.rankScalingFactor * 100)}%</span>
            </>
          )}
          {typeof lastXPAward.dailyXpEarned === 'number' && typeof lastXPAward.dailyXpCap === 'number' && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums text-slate-300">
                Today {lastXPAward.dailyXpEarned}/{lastXPAward.dailyXpCap} XP
              </span>
            </>
          )}
        </div>

        {/* Daily Cap or Mastery Gate Notice */}
        {(lastXPAward.cappedByDailyLimit || lastXPAward.rankPromotionBlockedByGates || isDiminished) && (
          <div className="mt-2 space-y-1.5">
            {lastXPAward.cappedByDailyLimit && (
              <div className="text-[11px] text-amber-300 bg-amber-500/10 rounded-lg p-2 border border-amber-500/20">
                Daily {lastXPAward.dailyXpCap || 600} XP cap reached for today. You can still study freely—return tomorrow for fresh XP!
              </div>
            )}
            {lastXPAward.rankPromotionBlockedByGates && (
              <div className="text-[11px] text-sky-300 bg-sky-500/10 rounded-lg p-2 border border-sky-500/20">
                XP goal met! Complete your remaining streak, verified lesson notes, or CBT score gates on Home to promote.
              </div>
            )}
            {isDiminished && (
              <div className="text-[11px] text-amber-300/90 bg-amber-500/10 rounded-lg p-2 border border-amber-500/20">
                <span>Repeat task factor: {Math.round(lastXPAward.repeatFactor * 100)}% XP. </span>
                <button
                  type="button"
                  onClick={() => setActiveStudentTab('ai-coach')}
                  className="underline font-medium hover:text-white inline-flex items-center gap-0.5"
                >
                  Explore another tool for 1.25x XP <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
