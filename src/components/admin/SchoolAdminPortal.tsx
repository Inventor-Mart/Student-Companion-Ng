import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SCHOOL_LEADERBOARD_DATA, STUDENT_LEADERBOARD_DATA } from '../../data/leaderboardData';
import {
  Building2,
  Trophy,
  Users,
  Award,
  Upload,
  CheckCircle2,
  Plus,
  BookOpen,
  TrendingUp,
  School
} from 'lucide-react';

export const SchoolAdminPortal: React.FC = () => {
  const { student } = useApp();
  const [activeTab, setActiveTab] = useState<'standings' | 'students' | 'upload'>('standings');
  const [customNoteTitle, setCustomNoteTitle] = useState<string>('');
  const [customSubject, setCustomSubject] = useState<string>('Physics');
  const [customNoteSuccess, setCustomNoteSuccess] = useState<boolean>(false);

  const handleUploadCustomNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customNoteTitle.trim()) return;

    setCustomNoteSuccess(true);
    setTimeout(() => {
      setCustomNoteSuccess(false);
      setCustomNoteTitle('');
    }, 2500);
  };

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-4 touch-pan-y text-slate-100">
      {/* School Header */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center text-indigo-400">
              <School className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-white">King's College, Lagos</h2>
                <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-950 px-1.5 py-0.2 rounded border border-indigo-800">
                  School Partner #042
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Lagos Island · Federal Unity College</p>
              <span className="text-[10px] text-slate-500 block">340 Active Students Enrolled</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-amber-400 font-bold block">#1 in Nigeria</span>
            <span className="text-xs font-mono font-bold text-white">184,500 XP</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          {[
            { id: 'standings', label: 'League Table', icon: Trophy },
            { id: 'students', label: 'Student Directory', icon: Users },
            { id: 'upload', label: 'School Notes', icon: Upload }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Inter-School League Table */}
      {activeTab === 'standings' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Nigerian Secondary School Standings
            </h3>
            <span className="text-[10px] text-slate-500">Term 2 Academic Rankings</span>
          </div>

          <div className="space-y-2">
            {SCHOOL_LEADERBOARD_DATA.map(sch => {
              const isKings = sch.schoolName.includes("King's College");
              return (
                <div
                  key={sch.rank}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs transition-all ${
                    isKings
                      ? 'bg-indigo-950/40 border-indigo-500/70 shadow-sm'
                      : 'bg-slate-900 border-slate-800'
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
                        {sch.state} · {sch.studentCount} Students · {sch.averageAccuracy}% Avg CBT Score
                      </span>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <span className="font-bold text-emerald-400 block">
                      {sch.totalPoints.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500">Total XP</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Student Directory */}
      {activeTab === 'students' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              King's College Honor Roll
            </h3>
            <span className="text-[10px] text-slate-500">Top Students</span>
          </div>

          <div className="space-y-2">
            {STUDENT_LEADERBOARD_DATA.map(std => (
              <div
                key={std.rank}
                className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-400 text-xs w-4">
                    #{std.rank}
                  </span>
                  <div>
                    <span className="font-bold text-white block">{std.name}</span>
                    <span className="text-[10px] text-slate-400">
                      {std.school} · {std.classLevel}
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="font-bold text-emerald-400">{std.xp.toLocaleString()} XP</span>
                  <span className="text-[10px] text-amber-400 block">{std.streak}d streak 🔥</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Upload Custom Notes */}
      {activeTab === 'upload' && (
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-xs font-bold text-white">Upload Custom School Supplementary Notes</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Distribute teacher lecture notes directly to all enrolled King's College students.
            </p>
          </div>

          {customNoteSuccess && (
            <div className="bg-emerald-950/80 border border-emerald-600/80 rounded-xl p-3 flex items-center gap-2 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Note published successfully to 340 students' Scheme of Work feed!</span>
            </div>
          )}

          <form onSubmit={handleUploadCustomNote} className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Subject:
              </label>
              <select
                value={customSubject}
                onChange={e => setCustomSubject(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option>Physics</option>
                <option>Chemistry</option>
                <option>Mathematics</option>
                <option>Biology</option>
                <option>English Language</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Topic Title:
              </label>
              <input
                type="text"
                value={customNoteTitle}
                onChange={e => setCustomNoteTitle(e.target.value)}
                placeholder="e.g. King's College WASSCE Practical Physics Guide"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Target Classes:
              </label>
              <div className="flex gap-2">
                {['SS 1', 'SS 2', 'SS 3'].map(c => (
                  <span
                    key={c}
                    className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Publish School Note</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
