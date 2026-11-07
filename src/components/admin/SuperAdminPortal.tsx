import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RegisteredUserProfile, UserRole, NigerianClassLevel } from '../../types';
import {
  Users,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Search,
  Filter,
  Eye,
  Edit3,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Building2,
  Wallet,
  Award,
  BookOpen,
  School,
  ExternalLink,
  ChevronRight,
  Database,
  UserCheck,
  Camera,
  X
} from 'lucide-react';
import { SchoolAdminPortal } from './SchoolAdminPortal';
import { NairaText, NairaSign } from '../../utils/currency';

export const SuperAdminPortal: React.FC = () => {
  const {
    allRegisteredUsers,
    startImpersonation,
    updateUserRecord,
    isSuperAdmin,
    isFirebaseConnected,
    currentRole
  } = useApp();

  const [portalView, setPortalView] = useState<'directory' | 'school_admin'>('directory');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<RegisteredUserProfile | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Edit form state
  const [editFullName, setEditFullName] = useState<string>('');
  const [editEmail, setEditEmail] = useState<string>('');
  const [editClassLevel, setEditClassLevel] = useState<string>('JSS 3');
  const [editXP, setEditXP] = useState<number>(0);
  const [editUniformVerified, setEditUniformVerified] = useState<boolean>(false);
  const [editWalletBalance, setEditWalletBalance] = useState<number>(0);
  const [editParentPin, setEditParentPin] = useState<string>('1234');
  const [editHourlyRate, setEditHourlyRate] = useState<number>(3000);
  const [editTutorVerified, setEditTutorVerified] = useState<boolean>(true);

  // Filtered Users
  const filteredUsers = allRegisteredUsers.filter(u => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const studentSchool = u.studentData?.school?.toLowerCase() || '';
    const parentWard = u.parentData?.wardName?.toLowerCase() || '';
    const tutorSubject = u.tutorData?.subjectSpecialization?.toLowerCase() || '';

    return (
      u.fullName.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      u.id.toLowerCase().includes(query) ||
      studentSchool.includes(query) ||
      parentWard.includes(query) ||
      tutorSubject.includes(query)
    );
  });

  const studentCount = allRegisteredUsers.filter(u => u.role === 'student').length;
  const parentCount = allRegisteredUsers.filter(u => u.role === 'parent').length;
  const tutorCount = allRegisteredUsers.filter(u => u.role === 'tutor').length;
  const adminCount = allRegisteredUsers.filter(u => u.role === 'admin').length;

  const handleOpenEditModal = (u: RegisteredUserProfile) => {
    setSelectedUserForEdit(u);
    setEditFullName(u.fullName);
    setEditEmail(u.email);
    setEditClassLevel(u.studentData?.classLevel || 'JSS 3');
    setEditXP(u.studentData?.xp || 0);
    setEditUniformVerified(u.studentData?.uniformVerified || false);
    setEditWalletBalance(35000); // default
    setEditParentPin(u.parentData?.pin || '1234');
    setEditHourlyRate(u.tutorData?.hourlyRate || 3000);
    setEditTutorVerified(u.tutorData?.verification?.isVerified || false);
  };

  const handleSaveUserEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForEdit) return;

    const updates: Partial<RegisteredUserProfile> = {
      fullName: editFullName,
      email: editEmail
    };

    if (selectedUserForEdit.role === 'student' && selectedUserForEdit.studentData) {
      updates.studentData = {
        ...selectedUserForEdit.studentData,
        name: editFullName,
        classLevel: editClassLevel as NigerianClassLevel,
        xp: Number(editXP),
        uniformVerified: editUniformVerified
      };
    } else if (selectedUserForEdit.role === 'parent' && selectedUserForEdit.parentData) {
      updates.parentData = {
        ...selectedUserForEdit.parentData,
        pin: editParentPin
      };
    } else if (selectedUserForEdit.role === 'tutor' && selectedUserForEdit.tutorData) {
      updates.tutorData = {
        ...selectedUserForEdit.tutorData,
        hourlyRate: Number(editHourlyRate),
        verification: {
          ...selectedUserForEdit.tutorData.verification,
          nin: selectedUserForEdit.tutorData.verification?.nin || 'NIN-123456789',
          bankName: selectedUserForEdit.tutorData.verification?.bankName || 'Access Bank',
          accountNumber: selectedUserForEdit.tutorData.verification?.accountNumber || '0123456789',
          accountName: editFullName.toUpperCase(),
          isVerified: editTutorVerified
        }
      };
    }

    await updateUserRecord(selectedUserForEdit.id, updates);
    setSaveSuccessMsg(`Updated profile for ${editFullName} successfully.`);
    setTimeout(() => {
      setSaveSuccessMsg(null);
      setSelectedUserForEdit(null);
    }, 1200);
  };

  if (portalView === 'school_admin') {
    return (
      <div className="flex-1 w-full flex flex-col overflow-hidden">
        <div className="bg-[#0B1526] px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400">Viewing School Admin Portal</span>
          <button
            onClick={() => setPortalView('directory')}
            className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
          >
            &larr; Return to Super Admin User Directory
          </button>
        </div>
        <SchoolAdminPortal />
      </div>
    );
  }

  return (
    <div className="flex-1 w-full overflow-y-auto px-3 sm:px-6 py-4 space-y-4 touch-pan-y text-slate-100 pb-16">
      {/* Super Admin Master Header */}
      <div className="bg-gradient-to-br from-[#0F1E36] via-[#0A1324] to-[#0D1829] border border-indigo-500/30 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-[#84E000]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  Super Admin & Developer Console
                </h1>
                <span className="text-[10px] font-black text-[#84E000] bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40 uppercase tracking-wider">
                  Full Access
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Authorized: <span className="font-mono text-emerald-300 font-semibold">martorefe@gmail.com</span>
              </p>
              <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Firestore RBAC Active
                </span>
                <span>•</span>
                <span>All Nigerian Class Levels (JSS 1 - SS 3)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPortalView('school_admin')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-950/70 hover:bg-purple-900 border border-purple-700/60 text-purple-300 text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              <School className="w-3.5 h-3.5" />
              <span>School Admin View</span>
            </button>
          </div>
        </div>

        {/* Platform Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-4 pt-3 border-t border-slate-800/80">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>Students</span>
              <GraduationCap className="w-3.5 h-3.5 text-[#84E000]" />
            </div>
            <div className="text-lg font-black text-white mt-1">{studentCount}</div>
            <div className="text-[10px] text-slate-500">JSS 1 - SS 3 Active</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>Parents</span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF5B00]" />
            </div>
            <div className="text-lg font-black text-white mt-1">{parentCount}</div>
            <div className="text-[10px] text-slate-500">PIN Wallet Guards</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>Tutors</span>
              <Users className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div className="text-lg font-black text-white mt-1">{tutorCount}</div>
            <div className="text-[10px] text-slate-500">NIN Verified</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>Curriculum Notes</span>
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-lg font-black text-white mt-1">338 Topics</div>
            <div className="text-[10px] text-slate-500">JSS1, JSS2, JSS3 English</div>
          </div>
        </div>
      </div>

      {/* User Directory Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white tracking-tight">
              User Directory & Account Inspector
            </h2>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
              {filteredUsers.length} Accounts
            </span>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search user, email, school..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Role Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Users', count: allRegisteredUsers.length },
            { id: 'student', label: 'Students', count: studentCount },
            { id: 'parent', label: 'Parents', count: parentCount },
            { id: 'tutor', label: 'Tutors', count: tutorCount },
            { id: 'admin', label: 'Admins', count: adminCount }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setRoleFilter(f.id as any)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                roleFilter === f.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{f.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${roleFilter === f.id ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {filteredUsers.map(u => {
            const isStudent = u.role === 'student';
            const isParent = u.role === 'parent';
            const isTutor = u.role === 'tutor';
            const isAdmin = u.role === 'admin';

            return (
              <div
                key={u.id}
                className="bg-slate-950 border border-slate-800/90 hover:border-slate-700/80 rounded-2xl p-3.5 space-y-3 transition-all shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-2">
                  {/* Top user row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isStudent ? 'bg-emerald-950 border border-emerald-700 text-[#84E000]' :
                        isParent ? 'bg-orange-950 border border-orange-700 text-[#FF5B00]' :
                        isTutor ? 'bg-sky-950 border border-sky-700 text-sky-400' :
                        'bg-purple-950 border border-purple-700 text-purple-400'
                      }`}>
                        {u.fullName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="text-xs font-bold text-white">{u.fullName}</h3>
                          {u.isSuperAdmin && (
                            <span className="text-[9px] font-black bg-amber-950 text-amber-300 border border-amber-800 px-1.5 py-0.2 rounded">
                              Super Admin
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400">{u.email}</p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                      isStudent ? 'text-[#84E000] bg-emerald-950/60 border-emerald-800' :
                      isParent ? 'text-[#FF5B00] bg-orange-950/60 border-orange-800' :
                      isTutor ? 'text-sky-400 bg-sky-950/60 border-sky-800' :
                      'text-purple-400 bg-purple-950/60 border-purple-800'
                    }`}>
                      {u.role}
                    </span>
                  </div>

                  {/* Role-Specific Details */}
                  {isStudent && u.studentData && (
                    <div className="bg-slate-900/80 rounded-xl p-2.5 text-[11px] space-y-1.5 border border-slate-800/60">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Class & Stream:</span>
                        <span className="font-semibold text-white">
                          {u.studentData.classLevel} ({u.studentData.stream})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">School:</span>
                        <span className="font-semibold text-white truncate max-w-[180px]">
                          {u.studentData.school || 'Unspecified'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Academic XP / Rank:</span>
                        <span className="font-semibold text-[#84E000]">
                          {u.studentData.xp.toLocaleString()} XP · {u.studentData.rank}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Uniform Verification:</span>
                        {u.studentData.uniformVerified ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Verified
                          </span>
                        ) : (
                          <span className="text-slate-500 font-medium flex items-center gap-1">
                            <XCircle className="w-3 h-3" /> Unverified
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {isParent && u.parentData && (
                    <div className="bg-slate-900/80 rounded-xl p-2.5 text-[11px] space-y-1.5 border border-slate-800/60">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Ward / Child:</span>
                        <span className="font-semibold text-white">{u.parentData.wardName}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Phone:</span>
                        <span className="font-mono text-white">{u.parentData.phone}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">PIN Wallet:</span>
                        <span className="font-mono text-amber-300 font-bold">•••• (Configured)</span>
                      </div>
                    </div>
                  )}

                  {isTutor && u.tutorData && (
                    <div className="bg-slate-900/80 rounded-xl p-2.5 text-[11px] space-y-1.5 border border-slate-800/60">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Specialization:</span>
                        <span className="font-semibold text-white truncate max-w-[180px]">
                          {u.tutorData.subjectSpecialization}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Hourly Rate:</span>
                        <span className="font-bold text-[#84E000]">
                          <NairaText amount={u.tutorData.hourlyRate} /> / hr
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">NIN Status:</span>
                        {u.tutorData.verification?.isVerified ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> NIN Verified
                          </span>
                        ) : (
                          <span className="text-amber-400 font-medium">Pending Verification</span>
                        )}
                      </div>
                    </div>
                  )}

                  {isAdmin && u.adminData && (
                    <div className="bg-slate-900/80 rounded-xl p-2.5 text-[11px] space-y-1.5 border border-slate-800/60">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Institution:</span>
                        <span className="font-semibold text-white">{u.adminData.schoolName}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Type:</span>
                        <span className="font-semibold text-slate-300">{u.adminData.schoolType}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
                  <button
                    onClick={() => startImpersonation(u)}
                    className="flex-1 bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 hover:text-white border border-indigo-700/60 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    title={`Impersonate and view app as ${u.fullName}`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Act As User</span>
                  </button>

                  <button
                    onClick={() => handleOpenEditModal(u)}
                    className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    title="Edit user parameters"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit User Modal */}
      {selectedUserForEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-[#0B1526] border border-slate-700 w-full max-w-md rounded-2xl p-5 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">
                  Edit User Record ({selectedUserForEdit.role.toUpperCase()})
                </h3>
              </div>
              <button
                onClick={() => setSelectedUserForEdit(null)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {saveSuccessMsg && (
              <div className="bg-emerald-950/80 border border-emerald-600/80 text-emerald-300 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveUserEdit} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Full Name</label>
                <input
                  type="text"
                  value={editFullName}
                  onChange={e => setEditFullName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Email Address</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {selectedUserForEdit.role === 'student' && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-400 font-semibold block mb-1">Class Level</label>
                      <select
                        value={editClassLevel}
                        onChange={e => setEditClassLevel(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-white focus:outline-none focus:border-emerald-500"
                      >
                        {['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3'].map(lvl => (
                          <option key={lvl} value={lvl}>{lvl}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-400 font-semibold block mb-1">Academic XP</label>
                      <input
                        type="number"
                        value={editXP}
                        onChange={e => setEditXP(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-slate-950 border border-slate-800 rounded-xl">
                    <div>
                      <span className="font-semibold text-white block">School Uniform Verification</span>
                      <span className="text-[10px] text-slate-400">Award verified school badge and bonus rank</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditUniformVerified(!editUniformVerified)}
                      className={`px-3 py-1 rounded-lg font-bold text-xs cursor-pointer transition-colors ${
                        editUniformVerified
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {editUniformVerified ? 'Verified' : 'Unverified'}
                    </button>
                  </div>
                </>
              )}

              {selectedUserForEdit.role === 'parent' && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Wallet PIN</label>
                    <input
                      type="text"
                      maxLength={4}
                      value={editParentPin}
                      onChange={e => setEditParentPin(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}

              {selectedUserForEdit.role === 'tutor' && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">
                      Hourly Rate (<NairaSign />)
                    </label>
                    <input
                      type="number"
                      step={500}
                      value={editHourlyRate}
                      onChange={e => setEditHourlyRate(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex flex-col justify-end">
                    <button
                      type="button"
                      onClick={() => setEditTutorVerified(!editTutorVerified)}
                      className={`w-full py-2 rounded-xl font-bold text-xs cursor-pointer transition-colors ${
                        editTutorVerified
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {editTutorVerified ? 'NIN Verified' : 'Unverified'}
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedUserForEdit(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors cursor-pointer shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
