import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { NATIONAL_WEEKEND_MOCKS_DATABASE } from '../../../data/aspirantMockData';
import { AspirantSubscriptionModal } from './AspirantSubscriptionModal';
import {
  Trophy,
  Flame,
  Calendar,
  Clock,
  Award,
  Users,
  ShieldCheck,
  Lock,
  ArrowRight,
  Filter,
  Medal,
  Zap,
  Sparkles
} from 'lucide-react';

export const NationalMockTournaments: React.FC = () => {
  const { aspirantGoal, setActiveStudentTab } = useApp();
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('ALL');
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  const activeMock = NATIONAL_WEEKEND_MOCKS_DATABASE[0];
  const isElite = aspirantGoal.tier === 'elite';

  const states = ['ALL', 'Lagos', 'Enugu', 'Kaduna', 'Oyo', 'Anambra', 'Akwa Ibom', 'Kano', 'Osun', 'Abia', 'Rivers', 'Abuja FCT'];

  const filteredLeaderboard = activeMock.leaderboard.filter(item => {
    if (selectedStateFilter === 'ALL') return true;
    return item.state.toLowerCase() === selectedStateFilter.toLowerCase();
  });

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-5 touch-pan-y text-slate-100">
      {/* 1. High-Stakes Hero Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-amber-950/70 to-slate-950 border border-amber-500/40 shadow-2xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
          <Trophy className="w-4 h-4" />
          <span>National Aspirants League · Weekend Tournaments</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-slate-50 mt-1 leading-tight tracking-tight">
          {activeMock.title}
        </h1>

        <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-xl">
          Compete simultaneously against thousands of school leavers across Nigeria in a realistic 4-subject UTME simulation. Prove your exam readiness, climb the national leaderboard, and win airtime and data cash prizes.
        </p>

        {/* Prize Pool & Key Meta */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-4 pt-1">
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-amber-500/30">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Prize Pool</span>
            <span className="text-base font-black text-amber-400 font-mono">₦50,000</span>
            <span className="text-[9px] text-slate-400 block mt-0.5">Cash, Airtime & Data</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Schedule</span>
            <span className="text-xs font-extrabold text-white block mt-0.5">{activeMock.scheduledDate}</span>
            <span className="text-[9px] text-emerald-400 block mt-0.5">{activeMock.scheduledTime}</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Duration</span>
            <span className="text-xs font-extrabold text-white block mt-0.5">120 Minutes</span>
            <span className="text-[9px] text-slate-400 block mt-0.5">4 Core Subjects (180 Qs)</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Aspirants Registered</span>
            <span className="text-base font-black text-emerald-400 font-mono">{activeMock.participantsCount.toLocaleString()}</span>
            <span className="text-[9px] text-slate-400 block mt-0.5">Nationwide League</span>
          </div>
        </div>

        {/* Action Button */}
        {isElite ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveStudentTab('aspirant-cbt')}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 text-slate-950" />
              <span>Enter National Mock CBT Room</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Aspirant Elite Entry Active
            </span>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold">
                <Lock className="w-3.5 h-3.5" />
                <span>Tournament Participation Reserved for Aspirant Elite</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Upgrade to Aspirant Elite (₦10,000/mo) to unlock weekly tournament access and compete for cash & airtime prizes.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsSubscriptionModalOpen(true)}
              className="py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/25 shrink-0 cursor-pointer active:scale-95 transition-all"
            >
              <span>Unlock Elite Pass</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* 2. Prize Breakdown */}
      <div className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-2.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Tournament Prize Schedule
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          {activeMock.prizes.map((p, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-black shrink-0">
                #{idx + 1}
              </div>
              <div>
                <span className="font-bold text-slate-200 block">{p.rankRange}</span>
                <span className="text-[11px] text-amber-400 font-semibold">{p.reward}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. National Leaderboard */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-100">Official National Leaderboard</h2>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                Top Scorers
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Real aspirants competing nationwide across all 36 Nigerian states</p>
          </div>

          {/* State Filter */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] text-slate-400 shrink-0 font-medium">State:</span>
            {states.slice(0, 7).map(st => (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedStateFilter(st)}
                className={`py-1 px-2.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedStateFilter === st
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard Table / Cards */}
        <div className="space-y-2">
          {filteredLeaderboard.map((asp) => (
            <div
              key={asp.studentId}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 text-xs ${
                asp.rank === 1
                  ? 'bg-gradient-to-r from-amber-950/60 to-slate-900 border-amber-500/50 ring-1 ring-amber-500/30'
                  : asp.rank <= 3
                  ? 'bg-slate-950 border-amber-800/40'
                  : 'bg-slate-950/70 border-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-black text-sm shrink-0 ${
                  asp.rank === 1
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
                    : asp.rank === 2
                    ? 'bg-slate-300 text-slate-950'
                    : asp.rank === 3
                    ? 'bg-amber-700 text-white'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {asp.rank}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-bold text-white truncate">{asp.studentName}</span>
                    <span className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.2 rounded border border-slate-800 shrink-0">
                      {asp.state}
                    </span>
                    {asp.badge && (
                      <span className="text-[9px] font-bold text-amber-300 bg-amber-950 px-1.5 py-0.2 rounded border border-amber-800 shrink-0">
                        {asp.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">
                    Target: <strong className="text-slate-200">{asp.targetCourse}</strong> ({asp.targetUniversity})
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="font-mono font-black text-base text-amber-400">
                  {asp.score} <span className="text-[10px] text-slate-400 font-normal">/ 400</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {asp.timeSpentMinutes} mins
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AspirantSubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        defaultTier="elite"
      />
    </div>
  );
};
