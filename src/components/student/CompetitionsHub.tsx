import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CBT_EXAMS_DATABASE } from '../../data/cbtExamData';
import { STUDENT_LEADERBOARD_DATA, SCHOOL_LEADERBOARD_DATA } from '../../data/leaderboardData';
import {
  Trophy,
  Flame,
  Award,
  Calendar,
  Timer,
  Gift,
  ShieldCheck,
  Medal,
  ChevronRight,
  Play,
  ArrowRight,
  School,
  Users,
  Sparkles,
  CheckCircle2,
  Crown
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CompetitionsHub: React.FC = () => {
  const { student, startExam, addStudentXP } = useApp();
  const [activeTab, setActiveTab] = useState<'weekly' | 'termly' | 'spotlight' | 'prizes'>('weekly');
  const [hasEnteredThisWeek, setHasEnteredThisWeek] = useState<boolean>(false);

  // Find a high stakes exam for the weekly challenge
  const weeklyChallengeExam = CBT_EXAMS_DATABASE[0];

  const handleEnterWeeklyChallenge = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
    startExam(weeklyChallengeExam);
  };

  const handleQuickClaimBonus = () => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.7 }
    });
    setHasEnteredThisWeek(true);
    addStudentXP(250);
  };

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-4 touch-pan-y text-slate-100">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                <span>Student Competitions Arena</span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Official Weekly Challenges & Termly Championships
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800 animate-pulse">
            ₦50,000 Weekly Pool 🎁
          </span>
        </div>
      </div>

      {/* 4 Crystal Clear Tabs */}
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 bg-slate-900 p-1 rounded-2xl border border-slate-800 text-xs">
        {[
          { id: 'weekly', label: 'Weekly Competition', icon: Timer },
          { id: 'termly', label: 'Termly Competitions', icon: School },
          { id: 'spotlight', label: 'Student of the Week', icon: Crown },
          { id: 'prizes', label: 'Prize Vault', icon: Gift }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-2 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* TAB 1: WEEKLY COMPETITIONS                                     */}
      {/* ============================================================== */}
      {activeTab === 'weekly' && (
        <div className="space-y-4">
          {/* Active Weekly Challenge Hero Card */}
          <div className="bg-gradient-to-br from-amber-950/80 via-slate-900 to-slate-900 border border-amber-600/60 rounded-3xl p-4 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                Week 8 National Challenge
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-300 font-mono">
                <Timer className="w-3.5 h-3.5" />
                <span>Closes in 2d 14h 20m</span>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                All-Nigeria Secondary School Speed Championship
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                10-question timed speed drill covering General Mathematics, English Concord & Natural Sciences. Top 3 students win airtime credited immediately to registered parent line!
              </p>
            </div>

            {/* Prize Purse Callout */}
            <div className="bg-slate-950/80 rounded-2xl p-3 border border-amber-800/40 space-y-1.5">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5" />
                <span>Weekly Prize Pool: ₦50,000 Airtime + Swag</span>
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                  <span className="text-amber-400 font-bold block text-xs">🥇 1st Place</span>
                  <span className="text-[11px] text-white font-mono">₦30,000 + Hoodie</span>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                  <span className="text-slate-300 font-bold block text-xs">🥈 2nd Place</span>
                  <span className="text-[11px] text-white font-mono">₦15,000 Airtime</span>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                  <span className="text-amber-600 font-bold block text-xs">🥉 3rd Place</span>
                  <span className="text-[11px] text-white font-mono">₦5,000 Airtime</span>
                </div>
              </div>
            </div>

            {/* Participation Status */}
            <div className="bg-slate-950/90 rounded-2xl p-3 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Your Weekly Drill Status:</span>
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>14th Place · 1,240 Participants</span>
                </span>
              </div>

              {!hasEnteredThisWeek ? (
                <button
                  onClick={handleQuickClaimBonus}
                  className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                >
                  Check In (+250 XP)
                </button>
              ) : (
                <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Checked In!</span>
                </span>
              )}
            </div>

            <button
              onClick={handleEnterWeeklyChallenge}
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white text-xs font-bold rounded-2xl transition-all shadow-lg shadow-amber-950/60 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Take Week 8 Competition Quiz Now (+700 XP)</span>
            </button>
          </div>

          {/* Quick Weekly Leaderboard Preview */}
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Medal className="w-4 h-4 text-amber-400" />
                <span>Live Week 8 Leaderboard</span>
              </div>
              <button
                onClick={() => setActiveTab('spotlight')}
                className="text-[11px] text-amber-400 hover:underline"
              >
                View Full Hall of Fame
              </button>
            </div>

            <div className="space-y-2">
              {STUDENT_LEADERBOARD_DATA.slice(0, 3).map(std => (
                <div
                  key={std.rank}
                  className="p-3 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                        std.rank === 1
                          ? 'bg-amber-500 text-slate-950'
                          : std.rank === 2
                          ? 'bg-slate-300 text-slate-950'
                          : 'bg-amber-700 text-white'
                      }`}
                    >
                      {std.rank}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white">{std.name}</span>
                        {std.rank === 1 && (
                          <span className="text-[9px] font-bold text-amber-400 bg-amber-950 px-1 rounded border border-amber-800">
                            Leader
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {std.school} · {std.classLevel}
                      </span>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <span className="font-bold text-emerald-400 block">{std.xp.toLocaleString()} XP</span>
                    <span className="text-[10px] text-amber-400">{std.streak}d streak 🔥</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: TERMLY COMPETITIONS & INTER-SCHOOL CHAMPIONSHIPS        */}
      {/* ============================================================== */}
      {activeTab === 'termly' && (
        <div className="space-y-4">
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <School className="w-4 h-4 text-indigo-400" />
                  <span>Term 2 National Inter-School Championship</span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Schools battle for the prestigious Termly Gold Cup based on aggregate student quiz accuracies.
                </p>
              </div>
              <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                Term 2 Wk 8
              </span>
            </div>

            <div className="bg-indigo-950/30 border border-indigo-700/40 rounded-xl p-3 text-xs text-indigo-200 flex items-center justify-between">
              <span>Your School: <strong>King's College Lagos</strong></span>
              <span className="text-amber-400 font-bold font-mono">Rank #1 (42,850 pts)</span>
            </div>

            {/* School League Standings */}
            <div className="space-y-2">
              {SCHOOL_LEADERBOARD_DATA.map(sch => {
                const isKings = sch.schoolName.includes("King's College");
                return (
                  <div
                    key={sch.rank}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs transition-all ${
                      isKings
                        ? 'bg-indigo-950/40 border-indigo-500/70 shadow-sm'
                        : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                          sch.rank === 1
                            ? 'bg-amber-500 text-slate-950'
                            : sch.rank === 2
                            ? 'bg-slate-300 text-slate-950'
                            : sch.rank === 3
                            ? 'bg-amber-700 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {sch.rank}
                      </span>
                      <div>
                        <span className="font-bold text-white block">{sch.schoolName}</span>
                        <span className="text-[10px] text-slate-400">
                          {sch.state} · {sch.studentCount} Students · {sch.averageAccuracy}% Accuracy
                        </span>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <span className="font-bold text-emerald-400 block">
                        {sch.totalPoints.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-500">Pts</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Intra-Class Tournament Standings */}
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Termly Intra-Class Competition ({student.classLevel})</span>
              </h3>
              <span className="text-[10px] text-emerald-400 font-semibold">{student.school}</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between items-center text-slate-300">
                <span>Class Average CBT Accuracy:</span>
                <span className="font-mono font-bold text-white">82.4%</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Class State Standing:</span>
                <span className="font-mono font-bold text-amber-400">#2 across Lagos State</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Championship Reward:</span>
                <span className="text-emerald-400 font-semibold">Inter-Class Gold Trophy & STEM Lab Grant</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: STUDENT OF THE WEEK SPOTLIGHT                           */}
      {/* ============================================================== */}
      {activeTab === 'spotlight' && (
        <div className="space-y-4">
          {/* Spotlight Hero Card */}
          <div className="bg-gradient-to-br from-amber-950/70 via-slate-900 to-slate-900 border border-amber-500/70 rounded-3xl p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800 flex items-center gap-1">
                <Crown className="w-3 h-3 text-amber-400" />
                <span>Current Student of the Week</span>
              </span>
              <span className="text-[10px] text-amber-300 font-mono">Week 8 Spotlight</span>
            </div>

            <div className="flex items-center gap-3.5">
              <img
                src="https://api.dicebear.com/7.x/micah/svg?seed=Praise&backgroundColor=ffd5dc"
                alt="Praise Adebayo"
                className="w-14 h-14 rounded-2xl object-cover bg-slate-800 ring-2 ring-amber-500"
              />
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Praise Adebayo</span>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800">
                    Senior Boy
                  </span>
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  King's College Lagos · SS 3 Science
                </p>
                <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mt-1">
                  <span>14,850 XP</span>
                  <span>·</span>
                  <span>28-Day Streak 🔥</span>
                  <span>·</span>
                  <span>96% Accuracy</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-slate-950/70 p-3 rounded-2xl border border-amber-900/40 leading-relaxed">
              "Praise completed 42 CBT timed drills with zero incorrect answers in Further Mathematics and Physics this week, leading King's College to the #1 spot nationwide."
            </p>
          </div>

          {/* Full National Leaderboard Table */}
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">All-Nigeria Top 5 Contenders</span>
              <span className="text-[10px] text-slate-400 font-mono">Refreshed Hourly</span>
            </div>

            <div className="space-y-2">
              {STUDENT_LEADERBOARD_DATA.map(std => {
                const isMe = std.name.includes(student.name.split(' ')[0]);
                return (
                  <div
                    key={std.rank}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                      std.rank === 1
                        ? 'bg-amber-950/30 border-amber-700/60 shadow-sm'
                        : isMe
                        ? 'bg-emerald-950/30 border-emerald-700/60'
                        : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                          std.rank === 1
                            ? 'bg-amber-500 text-slate-950'
                            : std.rank === 2
                            ? 'bg-slate-300 text-slate-950'
                            : std.rank === 3
                            ? 'bg-amber-700 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {std.rank}
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-white">{std.name}</span>
                          {std.rank === 1 && (
                            <span className="text-[9px] font-bold text-amber-400 bg-amber-950 px-1 rounded border border-amber-800">
                              Top Scholar 👑
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {std.school} · {std.classLevel}
                        </span>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <span className="font-bold text-emerald-400 block">{std.xp.toLocaleString()} XP</span>
                      <span className="text-[10px] text-amber-400">{std.streak}d streak 🔥</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: PRIZE VAULT                                             */}
      {/* ============================================================== */}
      {activeTab === 'prizes' && (
        <div className="space-y-3">
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Gift className="w-4 h-4 text-amber-400" />
              <span>Tangible Weekly & Termly Prizes</span>
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Student Companion partners with telecommunications networks (MTN, Airtel, Glo, 9mobile) to deliver weekly airtime rewards and annual academic scholarships.
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Fair Play & Uniform Verification</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  To claim weekly airtime or physical merchandise, winners must have an approved AI School Uniform selfie to eliminate impersonation.
                </p>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-400">
                  <Award className="w-4 h-4" />
                  <span>Direct Airtime Delivery</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Airtime recharge pins are automatically disbursed to the parent/guardian phone number linked to the student profile every Sunday at 11:59 PM.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
