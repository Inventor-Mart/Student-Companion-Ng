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
  School,
  FileText,
  ChevronDown,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const SchoolAdminPortal: React.FC = () => {
  const { currentUserProfile, student, isSuperAdmin, switchRole } = useApp();
  const [activeTab, setActiveTab] = useState<'standings' | 'students' | 'upload'>('standings');
  const [customNoteTitle, setCustomNoteTitle] = useState<string>('');
  const [customSubject, setCustomSubject] = useState<string>('Mathematics');
  const [customNoteSuccess, setCustomNoteSuccess] = useState<boolean>(false);
  const [uploadedNotes, setUploadedNotes] = useState<Array<{ id: string; title: string; subject: string; date: string }>>([]);

  // Multi-school administration selector
  const availableSchools = SCHOOL_LEADERBOARD_DATA.map(s => s.schoolName);
  const defaultSchool =
    currentUserProfile?.adminData?.schoolName ||
    (student?.school && student.school !== 'Secondary School' ? student.school : SCHOOL_LEADERBOARD_DATA[0].schoolName);

  const [selectedSchool, setSelectedSchool] = useState<string>(defaultSchool);

  const adminName = currentUserProfile?.fullName || 'School Administrator';
  const schoolType = currentUserProfile?.adminData?.schoolType || 'Secondary Education Institution';

  // Find active school stats
  const activeSchoolStats = SCHOOL_LEADERBOARD_DATA.find(
    s => s.schoolName.toLowerCase() === selectedSchool.toLowerCase()
  ) || SCHOOL_LEADERBOARD_DATA[0];

  const handleUploadCustomNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customNoteTitle.trim()) return;

    const newNote = {
      id: `note-${Date.now()}`,
      title: customNoteTitle.trim(),
      subject: customSubject,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setUploadedNotes(prev => [newNote, ...prev]);
    setCustomNoteSuccess(true);
    setCustomNoteTitle('');

    setTimeout(() => {
      setCustomNoteSuccess(false);
    }, 3000);
  };

  // Filter students for the selected school
  const enrolledStudents = STUDENT_LEADERBOARD_DATA.filter(std =>
    std.school.toLowerCase().includes(selectedSchool.toLowerCase()) ||
    selectedSchool.toLowerCase().includes(std.school.toLowerCase())
  );

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-4 touch-pan-y text-slate-100">
      {/* Super Admin Switch Banner (if logged in with super admin email) */}
      {isSuperAdmin && (
        <div className="bg-indigo-950/60 border border-indigo-700/60 rounded-2xl p-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-slate-200">
              Viewing as <strong>School Administrator</strong>. You can switch back to Super Admin anytime.
            </span>
          </div>
          <button
            onClick={() => switchRole('admin')}
            className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[11px] transition-colors cursor-pointer shrink-0 ml-2"
          >
            Super Admin Console &rarr;
          </button>
        </div>
      )}

      {/* School Header Card with Interactive School Selector */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center text-indigo-400 shrink-0 shadow-inner">
              <School className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-bold text-white tracking-tight">
                  {selectedSchool}
                </h2>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                  Verified Institution
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{schoolType} · Admin: {adminName}</p>
              <span className="text-[10px] text-slate-500 block">
                Official Curriculum, Termly League & CBT Management Portal
              </span>
            </div>
          </div>

          {/* School Selector Dropdown */}
          <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 self-start w-full sm:w-auto">
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Administer School Context:
            </label>
            <div className="relative">
              <select
                value={selectedSchool}
                onChange={e => setSelectedSchool(e.target.value)}
                className="w-full sm:w-64 bg-slate-900 border border-slate-700 text-white text-xs font-semibold rounded-lg px-2.5 py-1.5 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 pr-8"
              >
                {availableSchools.map(sch => (
                  <option key={sch} value={sch}>
                    {sch}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* School KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80">
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block">National League Rank</span>
            <span className="text-sm font-black text-amber-400 font-mono">Rank #{activeSchoolStats.rank}</span>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block">Total School XP</span>
            <span className="text-sm font-black text-emerald-400 font-mono">
              {activeSchoolStats.totalPoints.toLocaleString()}
            </span>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block">Active Scholars</span>
            <span className="text-sm font-black text-white font-mono">{activeSchoolStats.studentCount}</span>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block">Average CBT Accuracy</span>
            <span className="text-sm font-black text-indigo-300 font-mono">{activeSchoolStats.averageAccuracy}%</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          {[
            { id: 'standings', label: 'League Table', icon: Trophy },
            { id: 'students', label: 'Student Roster', icon: Users },
            { id: 'upload', label: 'Upload Notes', icon: Upload }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
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
              National Secondary School Academic League
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Term 2 Standings</span>
          </div>

          <div className="space-y-2">
            {SCHOOL_LEADERBOARD_DATA.map(sch => {
              const isSelected = sch.schoolName.toLowerCase() === selectedSchool.toLowerCase();
              return (
                <div
                  key={sch.rank}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs transition-all ${
                    isSelected
                      ? 'bg-indigo-950/60 border-indigo-500/80 shadow-md ring-1 ring-indigo-500'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black font-mono shrink-0 ${
                        sch.rank === 1
                          ? 'bg-amber-500 text-slate-950 shadow-md'
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
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-white text-xs">{sch.schoolName}</span>
                        {isSelected && (
                          <span className="text-[9px] font-bold text-indigo-300 bg-indigo-950 px-1.5 rounded border border-indigo-700">
                            Current View
                          </span>
                        )}
                        {sch.rank === 1 && (
                          <span className="text-[9px] font-bold text-amber-400 bg-amber-950 px-1.5 rounded border border-amber-800">
                            🏆 Gold Cup Leader
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        {sch.state} State · {sch.studentCount} Scholars · {sch.averageAccuracy}% Avg Accuracy
                      </span>
                    </div>
                  </div>

                  <div className="text-right font-mono shrink-0 ml-2">
                    <span className="font-bold text-emerald-400 text-sm block">
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
              {selectedSchool} Enrolled Scholars
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">
              {enrolledStudents.length > 0 ? `${enrolledStudents.length} Top Scholars` : 'Active Roster'}
            </span>
          </div>

          <div className="space-y-2">
            {/* If logged-in student matches this school, display them on top */}
            {student?.name && student.school.toLowerCase().includes(selectedSchool.toLowerCase()) && (
              <div className="bg-emerald-950/40 p-3.5 rounded-2xl border border-emerald-600/70 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-900 border border-emerald-700 flex items-center justify-center text-emerald-300 font-bold">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white block">{student.name}</span>
                      <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950 px-1 rounded border border-emerald-800">
                        Current Account
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-300">
                      {student.classLevel} ({student.stream}) · Uniform: {student.uniformVerified ? 'Verified ✓' : 'Pending'}
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="font-bold text-emerald-400">{student.xp.toLocaleString()} XP</span>
                  <span className="text-[10px] text-amber-400 block">{student.streakDays}d streak 🔥</span>
                </div>
              </div>
            )}

            {/* List scholars for this institution */}
            {enrolledStudents.map(std => (
              <div
                key={std.name}
                className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold">
                    {std.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-white block">{std.name}</span>
                    <span className="text-[10px] text-slate-400">
                      {std.classLevel} · Uniform Verified ✓
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="font-bold text-emerald-400">{std.xp.toLocaleString()} XP</span>
                  <span className="text-[10px] text-amber-400 block">{std.streak}d streak 🔥</span>
                </div>
              </div>
            ))}

            {enrolledStudents.length === 0 && !student?.school?.toLowerCase().includes(selectedSchool.toLowerCase()) && (
              <div className="bg-slate-900/60 rounded-2xl p-8 text-center border border-slate-800 space-y-2">
                <Users className="w-9 h-9 text-slate-600 mx-auto" />
                <span className="text-xs text-slate-300 font-semibold block">Roster sync active</span>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Scholars registered under {selectedSchool} will have their uniform verifications and termly scores aggregated here.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Upload Custom Lesson Notes */}
      {activeTab === 'upload' && (
        <div className="space-y-4">
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-indigo-400" />
              <span>Publish Institutional Notes for {selectedSchool}</span>
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              Upload custom supplementary notes, mid-term assignments, or syllabus summaries for students attending {selectedSchool}.
            </p>

            <form onSubmit={handleUploadCustomNote} className="space-y-3 pt-1">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Note Title / Topic Name:
                </label>
                <input
                  type="text"
                  value={customNoteTitle}
                  onChange={e => setCustomNoteTitle(e.target.value)}
                  placeholder="e.g. WAEC Past Question Review: Circle Geometry"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Target Subject:
                </label>
                <select
                  value={customSubject}
                  onChange={e => setCustomSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="English Language">English Language</option>
                  <option value="Biology">Biology</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Physics">Physics</option>
                  <option value="Economics">Economics</option>
                  <option value="Civic Education">Civic Education</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Note to {selectedSchool} Students</span>
              </button>

              {customNoteSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Lesson note published successfully for {selectedSchool}!</span>
                </div>
              )}
            </form>
          </div>

          {uploadedNotes.length > 0 && (
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-white">Recently Published Notes:</h4>
              <div className="space-y-1.5">
                {uploadedNotes.map(note => (
                  <div
                    key={note.id}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-semibold text-white block">{note.title}</span>
                      <span className="text-[10px] text-slate-400">{note.subject} · {note.date}</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">Live</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
