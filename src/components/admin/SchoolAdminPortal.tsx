import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SCHOOL_LEADERBOARD_DATA } from '../../data/leaderboardData';
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
  FileText
} from 'lucide-react';

export const SchoolAdminPortal: React.FC = () => {
  const { currentUserProfile, student } = useApp();
  const [activeTab, setActiveTab] = useState<'standings' | 'students' | 'upload'>('standings');
  const [customNoteTitle, setCustomNoteTitle] = useState<string>('');
  const [customSubject, setCustomSubject] = useState<string>('Mathematics');
  const [customNoteSuccess, setCustomNoteSuccess] = useState<boolean>(false);
  const [uploadedNotes, setUploadedNotes] = useState<Array<{ id: string; title: string; subject: string; date: string }>>([]);

  const adminName = currentUserProfile?.fullName || 'School Administrator';
  const schoolName = currentUserProfile?.adminData?.schoolName || 'Registered Secondary School';
  const schoolType = currentUserProfile?.adminData?.schoolType || 'Secondary Education Institution';

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

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-4 touch-pan-y text-slate-100">
      {/* School Header */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center text-indigo-400 shrink-0">
              <School className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-sm font-bold text-white">{schoolName}</h2>
                <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-950 px-1.5 py-0.2 rounded border border-indigo-800">
                  Verified Institution
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{schoolType} · Admin: {adminName}</p>
              <span className="text-[10px] text-slate-500 block">Official Curriculum & CBT Management Portal</span>
            </div>
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
            <span className="text-[10px] text-slate-500">NERDC Official Rankings</span>
          </div>

          <div className="space-y-2">
            {SCHOOL_LEADERBOARD_DATA.map(sch => {
              const isUserSchool = sch.schoolName.toLowerCase().includes(schoolName.toLowerCase());
              return (
                <div
                  key={sch.rank}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs transition-all ${
                    isUserSchool
                      ? 'bg-indigo-950/60 border-indigo-500/80 shadow-md ring-1 ring-indigo-500'
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
              {schoolName} Enrolled Students
            </h3>
            <span className="text-[10px] text-slate-500">Live Roster</span>
          </div>

          {student?.name && student.school.toLowerCase().includes(schoolName.toLowerCase()) ? (
            <div className="space-y-2">
              <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 font-bold">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-white block">{student.name}</span>
                    <span className="text-[10px] text-slate-400">
                      {student.classLevel} ({student.stream}) · Uniform: {student.uniformVerified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="font-bold text-emerald-400">{student.xp.toLocaleString()} XP</span>
                  <span className="text-[10px] text-amber-400 block">{student.streakDays}d streak 🔥</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/60 rounded-2xl p-8 text-center border border-slate-800 space-y-2">
              <Users className="w-9 h-9 text-slate-600 mx-auto" />
              <span className="text-xs text-slate-300 font-semibold block">No students enrolled yet</span>
              <p className="text-[11px] text-slate-500 max-w-xs mx-auto leading-relaxed">
                When students sign up and select "{schoolName}" as their school, their profiles, uniform compliance, and CBT scores will appear here.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Upload Custom Lesson Notes */}
      {activeTab === 'upload' && (
        <div className="space-y-4">
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Publish School Lesson Notes</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload custom supplementary notes, term projects, or revision handouts specifically for your school's students.
            </p>

            <form onSubmit={handleUploadCustomNote} className="space-y-3 pt-1">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Subject Track:
                </label>
                <select
                  value={customSubject}
                  onChange={e => setCustomSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="English Language">English Language</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Economics">Economics</option>
                  <option value="Civic Education">Civic Education</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Lesson Note Title:
                </label>
                <input
                  type="text"
                  value={customNoteTitle}
                  onChange={e => setCustomNoteTitle(e.target.value)}
                  placeholder="e.g. Week 4: Newton's Third Law & Nigerian Traffic Safety"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {customNoteSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Lesson note published successfully for {schoolName} students!</span>
                </div>
              )}

              <button
                type="submit"
                disabled={!customNoteTitle.trim()}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Publish to Student Portals</span>
              </button>
            </form>
          </div>

          {/* Uploaded Notes List */}
          {uploadedNotes.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Published School Handouts ({uploadedNotes.length})
              </h4>
              {uploadedNotes.map(note => (
                <div
                  key={note.id}
                  className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                    <div>
                      <span className="font-bold text-white block">{note.title}</span>
                      <span className="text-[10px] text-slate-400">{note.subject} · Published {note.date}</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-semibold">
                    Live
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
