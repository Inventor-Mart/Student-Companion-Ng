import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RegisteredUserProfile, UserRole, NigerianClassLevel, AspirantReferralReward } from '../../types';
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
  X,
  MessageSquare,
  AlertTriangle,
  Trash2,
  ShieldAlert,
  Radio,
  FileText,
  GitBranch,
  RefreshCw,
  UploadCloud,
  Gift,
  Wifi
} from 'lucide-react';
import { SchoolAdminPortal } from './SchoolAdminPortal';
import { OTACompetitionManager } from './OTACompetitionManager';
import { LessonNotesManager } from './LessonNotesManager';
import { EducatorQuestionImporter } from './EducatorQuestionImporter';
import { SecurityTrustCenter } from './SecurityTrustCenter';
import { NairaText, NairaSign } from '../../utils/currency';
import { ForumReport, ForumMessage } from '../../types';
import {
  getStoredForumReports,
  saveStoredForumReports,
  getStoredForumMessages,
  saveStoredForumMessages
} from '../../data/forumData';

export const SuperAdminPortal: React.FC = () => {
  const {
    allRegisteredUsers,
    startImpersonation,
    updateUserRecord,
    isSuperAdmin,
    isFirebaseConnected,
    currentRole,
    currentUserProfile,
    getSchoolAccreditationMetrics,
    adminLessonNotes
  } = useApp();

  const [portalView, setPortalView] = useState<'directory' | 'school_admin' | 'forum_moderation' | 'ota_competitions' | 'lesson_notes' | 'past_questions' | 'security_trust' | 'aspirant_rewards'>('directory');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<RegisteredUserProfile | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Aspirant Referral Rewards Queue State
  const [aspirantRewardsList, setAspirantRewardsList] = useState<AspirantReferralReward[]>([]);
  const [isLoadingAspirantRewards, setIsLoadingAspirantRewards] = useState<boolean>(false);
  const [fulfillingRewardId, setFulfillingRewardId] = useState<string | null>(null);
  const [rewardActionNotice, setRewardActionNotice] = useState<string | null>(null);

  // GitHub Repository Sync state
  const [gitStatus, setGitStatus] = useState<{
    configured: boolean;
    repo: string;
    branch: string;
    aheadCount: number;
    latestCommit: string;
    hasUncommitted: boolean;
  } | null>(null);
  const [isLoadingGitStatus, setIsLoadingGitStatus] = useState<boolean>(false);
  const [isPushingGit, setIsPushingGit] = useState<boolean>(false);
  const [gitSyncFeedback, setGitSyncFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const authorizedAdminEmail = currentUserProfile?.email || (isSuperAdmin ? 'martorefe@gmail.com' : '');

  const fetchAspirantRewards = React.useCallback(async () => {
    if (!authorizedAdminEmail) return;
    setIsLoadingAspirantRewards(true);
    try {
      const res = await fetch(`/api/admin/aspirant-rewards?adminEmail=${encodeURIComponent(authorizedAdminEmail)}`);
      const data = await res.json();
      if (res.ok && Array.isArray(data.rewards)) {
        setAspirantRewardsList(data.rewards);
      }
    } catch {
      // ignore transient network errors
    } finally {
      setIsLoadingAspirantRewards(false);
    }
  }, [authorizedAdminEmail]);

  React.useEffect(() => {
    void fetchAspirantRewards();
  }, [fetchAspirantRewards]);

  const handleFulfillAspirantReward = async (rewardId: string) => {
    if (!authorizedAdminEmail) return;
    setFulfillingRewardId(rewardId);
    setRewardActionNotice(null);
    try {
      const res = await fetch('/api/admin/aspirant-rewards/fulfill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminEmail: authorizedAdminEmail, rewardId })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRewardActionNotice(`Marked ${rewardId} as 2GB Data Fulfilled.`);
        await fetchAspirantRewards();
      } else {
        setRewardActionNotice(data.error || 'Could not mark reward fulfilled.');
      }
    } catch (err: any) {
      setRewardActionNotice(err?.message || 'Network error fulfilling reward.');
    } finally {
      setFulfillingRewardId(null);
    }
  };

  const fetchGitStatus = React.useCallback(async () => {
    if (!authorizedAdminEmail) return;
    setIsLoadingGitStatus(true);
    try {
      const res = await fetch(`/api/git/status?adminEmail=${encodeURIComponent(authorizedAdminEmail)}`);
      const data = await res.json();
      if (data.success) {
        setGitStatus({
          configured: data.configured,
          repo: data.repo,
          branch: data.branch,
          aheadCount: data.aheadCount,
          latestCommit: data.latestCommit,
          hasUncommitted: data.hasUncommitted
        });
      }
    } catch {
      // Ignore transient network errors on passive status check
    } finally {
      setIsLoadingGitStatus(false);
    }
  }, [authorizedAdminEmail]);

  React.useEffect(() => {
    fetchGitStatus();
  }, [fetchGitStatus]);

  const handleSyncToGithub = async () => {
    if (!authorizedAdminEmail) return;
    setIsPushingGit(true);
    setGitSyncFeedback(null);
    try {
      const res = await fetch('/api/git/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminEmail: authorizedAdminEmail })
      });
      const data = await res.json();
      if (data.success) {
        setGitSyncFeedback({
          type: 'success',
          message: data.message || `Synced commits to ${data.repo} (${data.branch}).`
        });
        await fetchGitStatus();
      } else {
        setGitSyncFeedback({
          type: 'error',
          message: data.error || 'Failed to push updates to GitHub.'
        });
      }
    } catch (err: any) {
      setGitSyncFeedback({
        type: 'error',
        message: err?.message || 'Network error syncing repository.'
      });
    } finally {
      setIsPushingGit(false);
    }
  };

  // Forum moderation state
  const [forumReports, setForumReports] = useState<ForumReport[]>(() => getStoredForumReports());
  const [moderationNotice, setModerationNotice] = useState<string | null>(null);

  const handleDismissReport = (reportId: string) => {
    const updated = forumReports.map(r => r.id === reportId ? { ...r, status: 'dismissed' as const } : r);
    setForumReports(updated);
    saveStoredForumReports(updated);
    setModerationNotice('Report dismissed as non-violating.');
    setTimeout(() => setModerationNotice(null), 3000);
  };

  const handleDeleteReportedMessage = (report: ForumReport) => {
    const currentMessages = getStoredForumMessages();
    const updatedMessages = currentMessages.filter(m => m.id !== report.messageId);
    saveStoredForumMessages(updatedMessages);

    const updatedReports = forumReports.map(r => r.id === report.id ? { ...r, status: 'resolved' as const } : r);
    setForumReports(updatedReports);
    saveStoredForumReports(updatedReports);
    setModerationNotice('Reported message removed from forum and recorded as resolved.');
    setTimeout(() => setModerationNotice(null), 3500);
  };

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
  const [editAdminSchoolName, setEditAdminSchoolName] = useState<string>('');
  const [editAdminSchoolCode, setEditAdminSchoolCode] = useState<string>('SCHL88');
  const [editAdminVerified, setEditAdminVerified] = useState<boolean>(true);
  const [selectedAccreditationDocUrl, setSelectedAccreditationDocUrl] = useState<string | null>(null);

  // Filtered Users
  const filteredUsers = allRegisteredUsers.filter(u => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const studentSchool = u.studentData?.school?.toLowerCase() || '';
    const parentWard = u.parentData?.wardName?.toLowerCase() || '';
    const tutorSubject = u.tutorData?.subjectSpecialization?.toLowerCase() || '';
    const adminSchool = u.adminData?.schoolName?.toLowerCase() || '';
    const adminCode = u.adminData?.schoolCode?.toLowerCase() || '';

    return (
      u.fullName.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      u.id.toLowerCase().includes(query) ||
      studentSchool.includes(query) ||
      parentWard.includes(query) ||
      tutorSubject.includes(query) ||
      adminSchool.includes(query) ||
      adminCode.includes(query)
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
    setEditAdminSchoolName(u.adminData?.schoolName || 'Secondary School');
    setEditAdminSchoolCode(u.adminData?.schoolCode || 'SCHL88');
    setEditAdminVerified(u.adminData?.verificationStatus === 'verified');
  };

  const handleToggleAdminAccreditation = async (user: RegisteredUserProfile, newStatus: 'verified' | 'pending_verification') => {
    if (!user.adminData) return;
    const updatedAdminData = {
      ...user.adminData,
      verificationStatus: newStatus,
      verifiedAt: newStatus === 'verified' ? new Date().toISOString() : undefined
    };
    await updateUserRecord(user.id, {
      adminData: updatedAdminData
    });
    setModerationNotice(`${user.adminData.schoolName} accreditation ${newStatus === 'verified' ? 'approved ✓' : 'set to pending'}.`);
    setTimeout(() => setModerationNotice(null), 3500);
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
    } else if (selectedUserForEdit.role === 'admin' && selectedUserForEdit.adminData) {
      updates.adminData = {
        ...selectedUserForEdit.adminData,
        schoolName: editAdminSchoolName,
        schoolCode: editAdminSchoolCode.toUpperCase(),
        verificationStatus: editAdminVerified ? 'verified' : 'pending_verification',
        verifiedAt: editAdminVerified ? new Date().toISOString() : undefined
      };
    }

    await updateUserRecord(selectedUserForEdit.id, updates);
    setSaveSuccessMsg(`Updated profile for ${editFullName} successfully.`);
    setTimeout(() => {
      setSaveSuccessMsg(null);
      setSelectedUserForEdit(null);
    }, 1200);
  };

  if (portalView === 'forum_moderation') {
    const pendingReports = forumReports.filter(r => r.status === 'pending');
    const resolvedReports = forumReports.filter(r => r.status !== 'pending');

    return (
      <div className="flex-1 w-full flex flex-col overflow-y-auto px-3 sm:px-6 py-4 space-y-4 touch-pan-y text-slate-100 pb-16">
        <div className="bg-[#0B1526] px-4 py-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-white text-sm">Community Forum Moderation Console</span>
            <span className="bg-amber-950 text-amber-400 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-800">
              Child Protection & Safe Chat
            </span>
          </div>
          <button
            onClick={() => setPortalView('directory')}
            className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700"
          >
            &larr; Return to Super Admin User Directory
          </button>
        </div>

        {moderationNotice && (
          <div className="bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs px-4 py-3 rounded-xl flex items-center gap-2 shadow-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{moderationNotice}</span>
          </div>
        )}

        {/* Moderation Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs text-slate-400 block">Pending Reports</span>
            <div className="text-2xl font-black text-rose-400 mt-1 flex items-center gap-2">
              <span>{pendingReports.length}</span>
              {pendingReports.length > 0 && (
                <span className="text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded-full border border-rose-800 font-semibold">
                  Action Required
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Reported by peers for bullying, phone harvesting, or profanity.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs text-slate-400 block">Processed & Resolved</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              {resolvedReports.length}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Deleted messages or dismissed false alarms.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs text-slate-400 block">Active Protection Filter</span>
            <div className="text-sm font-bold text-indigo-300 mt-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Regex Vulgarity + Contact Scraper</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Nigerian betting keywords & 11-digit phone numbers blocked client-side.</p>
          </div>
        </div>

        {/* Pending Reports Queue */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Reported Messages Requiring Review</span>
            </h2>
            <span className="text-[11px] text-slate-400 font-mono">
              Queue: {pendingReports.length} incident{pendingReports.length === 1 ? '' : 's'}
            </span>
          </div>

          {pendingReports.length === 0 ? (
            <div className="text-center py-8 text-slate-500 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="text-xs font-medium text-slate-300">Clean Queue — No Active Moderation Incidents!</p>
              <p className="text-[11px] text-slate-500">Student and parent chats comply with the Community Safety Standard.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingReports.map(rep => (
                <div
                  key={rep.id}
                  className="bg-slate-950 border border-rose-900/50 rounded-2xl p-4 space-y-3 shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{rep.reportedUserName}</span>
                        <span className="text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded-full border border-rose-800 font-bold uppercase tracking-wider">
                          {rep.reason.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] text-slate-500">{rep.createdAt}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Channel: <strong className="text-slate-300">{rep.channelId}</strong> · Reporter ID: <strong className="text-slate-400 font-mono">{rep.reporterUserId}</strong>
                      </p>
                    </div>

                    <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded font-mono border border-amber-800">
                      Status: {rep.status}
                    </span>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono">
                    "{rep.messageText}"
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => handleDismissReport(rep.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                    >
                      Dismiss Report
                    </button>
                    <button
                      onClick={() => handleDeleteReportedMessage(rep)}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Message & Resolve</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Resolved Incident History */}
        {resolvedReports.length > 0 && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-2.5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Moderation Audit Log (Past Decisions)
            </h3>
            <div className="space-y-2">
              {resolvedReports.map(rep => (
                <div
                  key={rep.id}
                  className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <div>
                      <span className="font-semibold text-white">{rep.reportedUserName}</span>
                      <span className="text-slate-500 text-[11px] ml-2">"{rep.messageText.length > 40 ? `${rep.messageText.slice(0, 40)}...` : rep.messageText}"</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    rep.status === 'resolved' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {rep.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (portalView === 'ota_competitions') {
    return (
      <div className="flex-1 w-full flex flex-col overflow-y-auto px-3 sm:px-6 py-4 space-y-4 touch-pan-y text-slate-100 pb-16">
        <div className="bg-[#0B1526] px-4 py-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#84E000]" />
            <span className="font-bold text-white text-sm">OTA Releases, Feature Toggles, Reminders &amp; Competitions</span>
          </div>
          <button
            onClick={() => setPortalView('directory')}
            className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700"
          >
            &larr; Return to Super Admin User Directory
          </button>
        </div>

        <OTACompetitionManager />
      </div>
    );
  }

  if (portalView === 'security_trust') {
    return (
      <SecurityTrustCenter
        adminEmail={authorizedAdminEmail}
        onBack={() => setPortalView('directory')}
      />
    );
  }

  if (portalView === 'aspirant_rewards') {
    const pendingDataCount = aspirantRewardsList.filter(
      r => r.rewardType === 'data_2gb' && r.status === 'pending_fulfillment'
    ).length;
    const fulfilledDataCount = aspirantRewardsList.filter(
      r => r.rewardType === 'data_2gb' && r.status === 'fulfilled'
    ).length;
    const cash500Count = aspirantRewardsList.filter(r => r.rewardType === 'cash_500').length;

    return (
      <div className="flex-1 w-full flex flex-col overflow-y-auto px-3 sm:px-6 py-4 space-y-4 touch-pan-y text-slate-100 pb-16">
        <div className="bg-[#0B1526] px-4 py-3 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white text-sm">Aspirant Referral Rewards Queue</span>
            <span className="text-[11px] text-slate-400">· 2GB Data &amp; ₦500 First-Registration Bonus</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void fetchAspirantRewards()}
              disabled={isLoadingAspirantRewards}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAspirantRewards ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              onClick={() => setPortalView('directory')}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700"
            >
              &larr; Return to Directory
            </button>
          </div>
        </div>

        {rewardActionNotice && (
          <div className="bg-emerald-950/70 border border-emerald-700 text-emerald-200 text-xs px-4 py-2.5 rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{rewardActionNotice}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs text-slate-400 block">Pending 2GB Data Dispatch</span>
            <div className="text-2xl font-black text-amber-400 font-mono tabular-nums mt-1">{pendingDataCount}</div>
            <p className="text-[11px] text-slate-500 mt-1">Mobile lines waiting for 2GB bundle recharge</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs text-slate-400 block">Fulfilled 2GB Bundles</span>
            <div className="text-2xl font-black text-emerald-400 font-mono tabular-nums mt-1">{fulfilledDataCount}</div>
            <p className="text-[11px] text-slate-500 mt-1">Completed mobile data deliveries</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs text-slate-400 block">Instant ₦500 Wallet Credits</span>
            <div className="text-2xl font-black text-sky-400 font-mono tabular-nums mt-1">{cash500Count}</div>
            <p className="text-[11px] text-slate-500 mt-1">Auto-settled to Aspirant wallets</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-2">
            All Claimed Aspirant Referral Rewards ({aspirantRewardsList.length})
          </h3>
          {aspirantRewardsList.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No Aspirant referral rewards have been claimed yet.
            </div>
          ) : (
            <div className="space-y-2.5">
              {aspirantRewardsList.map(reward => (
                <div
                  key={reward.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white">{reward.studentName}</span>
                      <span className="text-slate-500">·</span>
                      <span className="font-mono text-emerald-400 font-bold">{reward.referralCodeUsed}</span>
                      <span className="text-slate-500">·</span>
                      {reward.rewardType === 'data_2gb' ? (
                        <span className="text-sky-300 font-semibold flex items-center gap-1">
                          <Wifi className="w-3.5 h-3.5" />
                          2GB {reward.network} ({reward.phoneNumber})
                        </span>
                      ) : (
                        <span className="text-amber-300 font-semibold flex items-center gap-1">
                          <Wallet className="w-3.5 h-3.5" />
                          ₦500 Wallet Credit
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Claimed {new Date(reward.createdAt).toLocaleString()} · Status:{' '}
                      <strong
                        className={
                          reward.status === 'fulfilled' || reward.status === 'credited'
                            ? 'text-emerald-400'
                            : 'text-amber-300'
                        }
                      >
                        {reward.status.toUpperCase()}
                      </strong>
                    </div>
                  </div>

                  {reward.rewardType === 'data_2gb' && reward.status === 'pending_fulfillment' && (
                    <button
                      type="button"
                      onClick={() => handleFulfillAspirantReward(reward.id)}
                      disabled={fulfillingRewardId === reward.id}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs cursor-pointer shrink-0 transition-colors"
                    >
                      {fulfillingRewardId === reward.id ? 'Updating...' : 'Mark 2GB Fulfilled'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (portalView === 'lesson_notes') {
    return (
      <LessonNotesManager onBack={() => setPortalView('directory')} />
    );
  }

  if (portalView === 'past_questions') {
    return (
      <div className="flex-1 min-h-0 w-full flex flex-col overflow-hidden">
        <EducatorQuestionImporter
          skipPinGate
          onClose={() => setPortalView('directory')}
        />
      </div>
    );
  }

  if (portalView === 'school_admin') {
    return (
      <div className="flex-1 min-h-0 w-full flex flex-col overflow-hidden">
        <div className="bg-[#0B1526] px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs shrink-0">
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

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setPortalView('lesson_notes')}
              className="flex items-center gap-1.5 px-3 min-h-[40px] rounded-xl bg-[#84E000]/15 hover:bg-[#84E000]/25 border border-[#84E000]/50 text-[#84E000] text-xs font-bold transition-all cursor-pointer shadow-sm whitespace-nowrap"
              title="Upload or edit weekly curriculum lesson notes across JSS 1 - SS 3"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#84E000]" />
              <span>Lesson Notes</span>
              {adminLessonNotes.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-[#84E000] text-slate-950 text-[10px] font-black tabular-nums">
                  {adminLessonNotes.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setPortalView('past_questions')}
              className="flex items-center gap-1.5 px-3 min-h-[40px] rounded-xl bg-sky-950/75 hover:bg-sky-900 border border-sky-600/60 text-sky-300 text-xs font-bold transition-all cursor-pointer shadow-sm whitespace-nowrap"
              title="Teacher & Admin Portal: Upload and manage JAMB, WAEC & NECO past question papers"
            >
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              <span>Teacher &amp; Admin Portal</span>
            </button>

            <button
              onClick={() => setPortalView('ota_competitions')}
              className="flex items-center gap-1.5 px-3 min-h-[40px] rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/60 text-[#84E000] text-xs font-bold transition-all cursor-pointer shadow-sm whitespace-nowrap"
              title="Push App Updates, Pause Features, Send Reminders, Manage Tickers & Competitions"
            >
              <Radio className="w-3.5 h-3.5 text-[#84E000]" />
              <span>OTA Studio &amp; Toggles</span>
            </button>

            <button
              onClick={() => setPortalView('forum_moderation')}
              className="flex items-center gap-1.5 px-3 min-h-[40px] rounded-xl bg-amber-950/70 hover:bg-amber-900 border border-amber-700/60 text-amber-300 text-xs font-bold transition-all cursor-pointer shadow-sm relative whitespace-nowrap"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Forum Moderation</span>
              {forumReports.filter(r => r.status === 'pending').length > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center">
                  {forumReports.filter(r => r.status === 'pending').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setPortalView('security_trust')}
              className="flex items-center gap-1.5 px-3 min-h-[40px] rounded-xl bg-rose-950/75 hover:bg-rose-900 border border-rose-700/60 text-rose-200 text-xs font-bold transition-all cursor-pointer shadow-sm whitespace-nowrap"
              title="Security & Trust Command Center: Fraud, Spam, Paystack Replay & Hacking Defense"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>Security &amp; Trust</span>
            </button>

            <button
              onClick={() => {
                setPortalView('aspirant_rewards');
                void fetchAspirantRewards();
              }}
              className="flex items-center gap-1.5 px-3 min-h-[40px] rounded-xl bg-emerald-950/75 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-200 text-xs font-bold transition-all cursor-pointer shadow-sm whitespace-nowrap"
              title="Fulfill 2GB mobile data and review ₦500 Aspirant first-registration referral rewards"
            >
              <Gift className="w-3.5 h-3.5 text-emerald-400" />
              <span>Aspirant Rewards</span>
              {aspirantRewardsList.filter(r => r.status === 'pending_fulfillment').length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black tabular-nums">
                  {aspirantRewardsList.filter(r => r.status === 'pending_fulfillment').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setPortalView('school_admin')}
              className="flex items-center gap-1.5 px-3 min-h-[40px] rounded-xl bg-purple-950/70 hover:bg-purple-900 border border-purple-700/60 text-purple-300 text-xs font-bold transition-all cursor-pointer shadow-sm whitespace-nowrap"
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

      {/* GitHub Repository Sync Panel */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0D1527] border border-slate-700 flex items-center justify-center text-[#84E000] shrink-0">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm font-bold text-white tracking-tight">GitHub Repository Sync</h2>
                <span className="text-[11px] font-mono text-slate-300">
                  {gitStatus?.repo || 'Inventor-Mart/Student-Companion-Ng'} · {gitStatus?.branch || 'main'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5 font-mono tabular-nums">
                <span>HEAD: {gitStatus?.latestCommit || '...'}</span>
                <span aria-hidden="true">·</span>
                <span className={gitStatus && gitStatus.aheadCount > 0 ? 'text-[#FF5B00] font-bold' : 'text-emerald-400'}>
                  {gitStatus ? `${gitStatus.aheadCount} commit(s) ahead` : 'Checking status...'}
                </span>
                <span aria-hidden="true">·</span>
                <span className={gitStatus?.configured ? 'text-[#84E000]' : 'text-amber-400'}>
                  {gitStatus?.configured ? 'Secrets Token Active' : 'Token Pending'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={fetchGitStatus}
              disabled={isLoadingGitStatus}
              className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingGitStatus ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              onClick={handleSyncToGithub}
              disabled={isPushingGit}
              className="px-4 py-2 rounded-xl bg-[#84E000] hover:bg-[#75c900] text-slate-950 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-sm disabled:opacity-50"
            >
              {isPushingGit ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <UploadCloud className="w-3.5 h-3.5" />
              )}
              <span>{isPushingGit ? 'Pushing...' : 'Sync to GitHub (main)'}</span>
            </button>
          </div>
        </div>

        {gitSyncFeedback && (
          <div
            className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
              gitSyncFeedback.type === 'success'
                ? 'bg-emerald-950/70 border-emerald-700 text-emerald-200'
                : 'bg-rose-950/70 border-rose-700 text-rose-200'
            }`}
          >
            {gitSyncFeedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-[#84E000] shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{gitSyncFeedback.message}</span>
          </div>
        )}
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
                        <span className="font-semibold text-white truncate max-w-[180px]">{u.adminData.schoolName}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Designation / Type:</span>
                        <span className="font-semibold text-slate-300 truncate max-w-[180px]">
                          {u.adminData.designation || 'Administrator'} · {u.adminData.schoolType}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">School Code:</span>
                        <span className="font-mono font-bold text-purple-300">{u.adminData.schoolCode || 'SCHL88'}</span>
                      </div>
                      {u.adminData.phone && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Official Contact:</span>
                          <span className="font-mono text-slate-300">{u.adminData.phone}</span>
                        </div>
                      )}
                      {(() => {
                        const schoolMetrics = getSchoolAccreditationMetrics(u.adminData.schoolCode || '');
                        return (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400">Accreditation Status:</span>
                              {u.adminData.verificationStatus === 'verified' ? (
                                <span className="text-emerald-400 font-bold flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" /> Accredited ✓
                                </span>
                              ) : (
                                <span className="text-amber-400 font-bold flex items-center gap-1">
                                  <AlertTriangle className="w-3 h-3" /> Pending Review
                                </span>
                              )}
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-slate-400">Accreditation Quota:</span>
                              {schoolMetrics.isQualifiedForReview ? (
                                <span className="text-emerald-300 font-bold text-[10px] bg-emerald-950/80 border border-emerald-700 px-1.5 py-0.5 rounded flex items-center gap-1">
                                  <CheckCircle2 className="w-2.5 h-2.5" />
                                  <span>
                                    {schoolMetrics.qualificationReason === 'paid_students_threshold'
                                      ? `Qualified (${schoolMetrics.paidStudents} Paid Students)`
                                      : 'Qualified (Direct Sub)'}
                                  </span>
                                </span>
                              ) : (
                                <span className="text-amber-400 font-semibold text-[10px] bg-amber-950/80 border border-amber-800 px-1.5 py-0.5 rounded flex items-center gap-1">
                                  <AlertTriangle className="w-2.5 h-2.5" />
                                  <span>Not Qualified ({schoolMetrics.paidStudents}/50 Paid)</span>
                                </span>
                              )}
                            </div>

                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-slate-400">Student Enrollment:</span>
                              <span className="font-mono text-slate-300">
                                <strong className="text-emerald-400">{schoolMetrics.paidStudents} Paid</strong> · {schoolMetrics.freeStudents} Free ({schoolMetrics.totalStudents} Linked)
                              </span>
                            </div>

                            {u.adminData.directSubscription && (
                              <div className="flex items-center justify-between text-[10px] bg-purple-950/40 p-1.5 rounded border border-purple-800/40">
                                <span className="text-purple-300">Direct Subscription:</span>
                                <span className="font-mono font-bold text-white">
                                  ₦{u.adminData.directSubscription.amountNaira.toLocaleString()} ({u.adminData.directSubscription.plan})
                                </span>
                              </div>
                            )}

                            {u.adminData.documentUrl && (
                              <div className="pt-1 flex items-center justify-between border-t border-slate-800/50">
                                <span className="text-slate-400">Accreditation Document:</span>
                                <button
                                  type="button"
                                  onClick={() => setSelectedAccreditationDocUrl(u.adminData!.documentUrl!)}
                                  className="text-[10px] text-purple-400 hover:text-purple-300 underline font-semibold flex items-center gap-1 cursor-pointer"
                                >
                                  <FileText className="w-3 h-3" />
                                  <span>View Document</span>
                                </button>
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
                  {isAdmin && u.adminData && (
                    u.adminData.verificationStatus === 'verified' ? (
                      <button
                        type="button"
                        onClick={() => handleToggleAdminAccreditation(u, 'pending_verification')}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-950/70 text-slate-400 hover:text-rose-300 border border-slate-800 hover:border-rose-800/80 text-[11px] font-semibold transition-colors cursor-pointer"
                        title="Revoke accreditation"
                      >
                        Revoke
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleToggleAdminAccreditation(u, 'verified')}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1 shadow"
                        title="Approve institutional accreditation"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                    )
                  )}

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

              {selectedUserForEdit.role === 'admin' && (
                <div className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-400 font-semibold block mb-1">School Name</label>
                      <input
                        type="text"
                        value={editAdminSchoolName}
                        onChange={e => setEditAdminSchoolName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 font-semibold block mb-1">School Code (6-char)</label>
                      <input
                        type="text"
                        maxLength={8}
                        value={editAdminSchoolCode}
                        onChange={e => setEditAdminSchoolCode(e.target.value.toUpperCase())}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono font-bold uppercase focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  {(() => {
                    const metrics = getSchoolAccreditationMetrics(editAdminSchoolCode || '');
                    return (
                      <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Accreditation Quota:</span>
                          {metrics.isQualifiedForReview ? (
                            <span className="text-emerald-400 font-bold">
                              ✓ Qualified ({metrics.qualificationReason === 'paid_students_threshold' ? `${metrics.paidStudents} Paid Students` : 'Direct Sub Active'})
                            </span>
                          ) : (
                            <span className="text-amber-400 font-bold">
                              Not Met ({metrics.paidStudents}/50 Paid Students)
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Affiliated: {metrics.paidStudents} Paid · {metrics.freeStudents} Free Tier ({metrics.totalStudents} Total)
                        </div>
                      </div>
                    );
                  })()}

                  <div className="flex items-center justify-between p-2.5 bg-slate-950 border border-slate-800 rounded-xl">
                    <div>
                      <span className="font-semibold text-white block">Institutional Accreditation</span>
                      <span className="text-[10px] text-slate-400">Unlock curriculum notes and CBT publishing</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditAdminVerified(!editAdminVerified)}
                      className={`px-3 py-1 rounded-lg font-bold text-xs cursor-pointer transition-colors ${
                        editAdminVerified
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {editAdminVerified ? 'Accredited ✓' : 'Pending Review'}
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

      {/* Accreditation Document Preview Modal */}
      {selectedAccreditationDocUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#0B1526] border border-slate-700 w-full max-w-lg rounded-2xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white">Institutional Accreditation Document</h3>
              </div>
              <button
                onClick={() => setSelectedAccreditationDocUrl(null)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800 max-h-[60vh] overflow-auto flex items-center justify-center">
              {selectedAccreditationDocUrl.startsWith('data:image') || selectedAccreditationDocUrl.startsWith('http') ? (
                <img
                  src={selectedAccreditationDocUrl}
                  alt="Accreditation Certificate"
                  className="max-w-full max-h-[55vh] object-contain rounded-lg"
                />
              ) : (
                <div className="p-8 text-center text-slate-400 text-xs">
                  <FileText className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p>Accreditation File: {selectedAccreditationDocUrl}</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setSelectedAccreditationDocUrl(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs cursor-pointer"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
