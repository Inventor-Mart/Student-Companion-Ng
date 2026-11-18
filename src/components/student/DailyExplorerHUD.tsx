import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getExplorerStatus, ALL_APP_FEATURES } from '../../utils/xpEconomy';
import { Compass, Sparkles, TrendingUp, Info, ChevronRight, X, Award, Flame, Zap } from 'lucide-react';

export const DailyExplorerHUD: React.FC = () => {
  const { student, setActiveStudentTab } = useApp();
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const status = getExplorerStatus(student.dailyExploration);

  return (
    <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-sm space-y-3">
      {/* Header with Unboxed Typography */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <span>Daily Study Diversity</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="font-mono text-emerald-400 font-bold tabular-nums">
                {status.uniqueCount} of 4 Features
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-emerald-400 font-bold font-mono">
                {status.multiplier}x Multiplier
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {status.isMaxMultiplier
                ? 'Maximum 1.5x Multiplier active across all academic activities today!'
                : `Explore ${status.nextGoalCount - status.uniqueCount} more tool${status.nextGoalCount - status.uniqueCount > 1 ? 's' : ''} to unlock the ${status.nextMultiplier}x XP Multiplier.`}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsGuideOpen(true)}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors py-1 px-2 rounded-lg hover:bg-slate-800"
        >
          <Info className="w-3.5 h-3.5 text-emerald-400" />
          <span>XP Economics</span>
        </button>
      </div>

      {/* Progress Track */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] font-mono tabular-nums">
          <span className="text-slate-400">Daily XP Quota</span>
          <span className={status.isDailyCapReached ? 'text-amber-300 font-bold' : 'text-emerald-300 font-bold'}>
            {status.dailyXpEarned} / {status.dailyXpCap} XP
            {status.isDailyCapReached ? ' · Daily Cap Reached' : ''}
          </span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              status.isDailyCapReached
                ? 'bg-gradient-to-r from-amber-500 to-orange-400'
                : 'bg-gradient-to-r from-emerald-500 to-teal-400'
            }`}
            style={{ width: `${Math.min(100, (status.dailyXpEarned / status.dailyXpCap) * 100)}%` }}
          />
        </div>
      </div>

      {/* Interactive Tool Badges (Clicking an unexplored tool jumps right to it!) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar text-xs">
        {ALL_APP_FEATURES.slice(0, 7).map(feature => {
          const isExplored = status.featuresUsed.includes(feature.id);
          return (
            <button
              key={feature.id}
              type="button"
              onClick={() => setActiveStudentTab(feature.tabId as any)}
              className={`whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1.5 shrink-0 ${
                isExplored
                  ? 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-300'
                  : 'bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
              title={isExplored ? `Explored today (+XP awarded)` : `Explore ${feature.name} to boost multiplier`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isExplored ? 'bg-emerald-400' : 'bg-slate-600'}`} />
              <span>{feature.name}</span>
              {!isExplored && (
                <span className="text-[10px] text-emerald-400 font-mono">+Boost</span>
              )}
            </button>
          );
        })}
      </div>

      {/* XP Economics Modal */}
      {isGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-5 text-slate-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Earned Rank &amp; XP Economics</h3>
                  <p className="text-xs text-slate-400">Steep rank curve, daily cap &amp; mastery gates</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsGuideOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Rule 1: Rank Promotion Gates & Steep Ladder */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
                <Award className="w-4 h-4" />
                <span>1. Exponential Rank Ladder &amp; Mastery Gates</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Advancing ranks requires sustained consistency and verified mastery—not just raw XP:
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                  <div className="text-slate-400">Scholar · 3,000 XP</div>
                  <div className="text-emerald-300 font-bold">3d Streak · 3 Notes · 2 Exams (60%+)</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                  <div className="text-slate-400">Prefect · 12,000 XP</div>
                  <div className="text-emerald-300 font-bold">7d Streak · 8 Notes · 5 Exams (70%+)</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                  <div className="text-slate-400">Senior · 30,000 XP</div>
                  <div className="text-emerald-300 font-bold">14d Streak · 18 Notes · 12 Exams (75%+)</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                  <div className="text-slate-400">Senior Prefect · 65,000 XP</div>
                  <div className="text-amber-300 font-bold">30d Streak · 35 Notes · 25 Exams (80%+)</div>
                </div>
              </div>
            </div>

            {/* Rule 2: Rank-Scaled Difficulty & Exploration */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2 text-sm font-semibold text-sky-300">
                <TrendingUp className="w-4 h-4" />
                <span>2. Rank-Scaled Difficulty &amp; Daily 600 XP Cap</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside leading-relaxed">
                <li><strong className="text-white">Daily Cap:</strong> Students earn up to <strong className="text-emerald-300">600 XP / day</strong> so top ranks reward months of steady study.</li>
                <li><strong className="text-white">Higher-Rank Rigor:</strong> Easy drills &amp; games drop from <strong className="text-white">100% XP</strong> (Fresher) to <strong className="text-amber-300">45%</strong> (Prefect) and <strong className="text-amber-300">15%</strong> (Senior Prefect).</li>
                <li><strong className="text-white">Hard WAEC/JAMB Exams:</strong> 20–40Q exams with ≥75% accuracy preserve strong payouts across every rank.</li>
              </ul>
            </div>

            {/* Rule 3: Symbolic Paid Appreciation Cap */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-300">
                <Sparkles className="w-4 h-4" />
                <span>3. Symbolic Appreciation Bonus (Capped ≤ 100 XP)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ranks cannot be bought. Paid subscriptions &amp; tutor bookings grant a modest symbolic bonus capped at <strong className="text-amber-300">+100 XP</strong> (<code className="font-mono">₦500 → +25 XP</code> up to <code className="font-mono">₦10k+ → +100 XP</code>).
              </p>
            </div>

            {/* Rule 4: Anti-Repetition Diminishing Returns */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2 text-sm font-semibold text-rose-300">
                <Zap className="w-4 h-4" />
                <span>4. Anti-Repetition Decay</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Repeating the same mini-game or drill decays returns steeply (100% → 85% → 60% → 35% → 15%). Explore up to 4 study tools daily for a <strong className="text-emerald-300">1.25x</strong> diversity bonus.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsGuideOpen(false)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
