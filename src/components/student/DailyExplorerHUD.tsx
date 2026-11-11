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
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(100, (status.uniqueCount / 4) * 100)}%` }}
        />
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
                  <h3 className="font-bold text-base text-white">Academic XP Economics</h3>
                  <p className="text-xs text-slate-400">Value-scaled rewards, daily breadth & task rigor</p>
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

            {/* Rule 1: Paid Actions Scaling */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-300">
                <Sparkles className="w-4 h-4" />
                <span>1. Academic Investment (Paid Actions)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The more substantial the educational commitment, the higher the XP awarded. Paid actions never suffer diminishing returns:
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                  <div className="text-slate-400">Single Subject Unlock</div>
                  <div className="text-amber-400 font-bold">₦500 → +350 XP</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                  <div className="text-slate-400">1-on-1 Tutor Booking</div>
                  <div className="text-amber-400 font-bold">₦3,500 → +1,500 XP</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                  <div className="text-slate-400">Extended Masterclass</div>
                  <div className="text-amber-400 font-bold">₦5,000 → +2,500 XP</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                  <div className="text-slate-400">Termly / Full Access</div>
                  <div className="text-amber-400 font-bold">₦15,000 → +8,000 XP</div>
                </div>
              </div>
            </div>

            {/* Rule 2: Exploration Multiplier */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
                <Compass className="w-4 h-4" />
                <span>2. Multi-Tool Daily Exploration</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Students who explore diverse tools earn a daily multiplier on all academic tasks:
              </p>
              <div className="grid grid-cols-4 gap-1.5 text-center text-[11px] font-mono pt-1">
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                  <div className="text-slate-400">1 Tool</div>
                  <div className="text-slate-200 font-bold">1.0x Base</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                  <div className="text-slate-400">2 Tools</div>
                  <div className="text-emerald-400 font-bold">1.1x XP</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                  <div className="text-slate-400">3 Tools</div>
                  <div className="text-emerald-400 font-bold">1.25x XP</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                  <div className="text-slate-400">4+ Tools</div>
                  <div className="text-emerald-300 font-bold">1.5x Multiplier</div>
                </div>
              </div>
            </div>

            {/* Rule 3: Demand & Difficulty Multipliers */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2 text-sm font-semibold text-sky-300">
                <TrendingUp className="w-4 h-4" />
                <span>3. Task Demand & Difficulty Scaling</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Challenging examinations and larger question volumes yield substantially higher XP:
              </p>
              <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                <li><strong className="text-slate-200">Difficulty:</strong> Easy (1.0x) · Medium WAEC/BECE (1.5x) · Hard JAMB/Olympiad (2.5x)</li>
                <li><strong className="text-slate-200">Exam Volume:</strong> 5-10 Qs (1.0x) · 20-30 Qs (1.75x) · 40+ Qs (3.0x Multiplier)</li>
                <li><strong className="text-slate-200">Academic Mastery:</strong> Scores $\ge 80\%$ unlock +25% Distinction bonus; 100% unlocks +50% Flawless bonus</li>
              </ul>
            </div>

            {/* Rule 4: Anti-Repetition Diminishing Returns */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2 text-sm font-semibold text-rose-300">
                <Zap className="w-4 h-4" />
                <span>4. Anti-Repetition Diminishing Returns</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Repeatedly grinding the exact same mini-game or single drill within a day reduces XP returns (100% → 75% → 50% → 25%). Switch to other tools like Science Formulas, Lesson Notes, or AI Coach to keep earning full rewards!
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
