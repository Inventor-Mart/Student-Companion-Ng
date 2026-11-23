import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  RegisteredUserProfile,
  UserRole,
  NigerianClassLevel,
  AcademicStream,
  ParentRelationship,
  ParentNotificationChannel,
  GrowthPartner,
  RegisteredTutorData,
  NigerianHighestEducation,
  AspirantReferralReward,
  ForumReport
} from '../../types';
import { PersonaAvatar } from '../common/PersonaAvatar';
import { SubjectMultiSelector } from '../common/SubjectMultiSelector';
import { RegistrationGateCard } from './RegistrationGateCard';
import { WeeklyTournamentPrizeManager } from './WeeklyTournamentPrizeManager';
import {
  NIGERIAN_HIGHER_EDUCATION_OPTIONS,
  REPAIRED_TUTOR_PROFILE_VERSION,
  SUBJECT_REPAIR_VERSION,
  dedupeSubjects,
  formatPrimaryDegreeSummary,
  formatSubjectSpecialization,
  normalizeHighestEducation,
  parseSubjectString,
  rebuildTutorDegrees
} from '../../utils/nigerianSubjects';
import {
  TUTOR_NET_PAYOUT_PERCENT,
  TUTOR_PLATFORM_COMMISSION_PERCENT,
  USER_AGREEMENT_VERSION,
  formatConsentDate,
  getBookingFinancialSplit,
  hasAcceptedCurrentAgreement
} from '../../utils/platformLegalAndFees';
import { calculateRank as calculateRankFromXP } from '../../utils/xpEconomy';
import { forceClearAppCacheAndReload } from '../../utils/pwaCacheRefresh';
import { useBackHandler } from '../../lib/backNavigation';
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
  Wifi,
  Clock,
  Lock,
  Unlock,
  UserX,
  Snowflake,
  Layers,
  Download,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Scale,
  Server,
  Globe
} from 'lucide-react';
import { SchoolAdminPortal } from './SchoolAdminPortal';
import { OTACompetitionManager } from './OTACompetitionManager';
import { LessonNotesManager } from './LessonNotesManager';
import { EducatorQuestionImporter } from './EducatorQuestionImporter';
import { SecurityTrustCenter } from './SecurityTrustCenter';
import { SchemeOfWorkHub } from '../student/SchemeOfWorkHub';
import { NairaText, NairaSign } from '../../utils/currency';
import { getSecurityHeaders } from '../../utils/securityGuard';
import {
  getStoredForumReports,
  saveStoredForumReports,
  getStoredForumMessages,
  saveStoredForumMessages
} from '../../data/forumData';
import { clearGoogleAuthReturnTarget, peekGoogleAuthReturnTarget, getFirebaseAuthHeaders } from '../../lib/firebase';

export const SuperAdminPortal: React.FC = () => {
  const {
    allRegisteredUsers,
    startImpersonation,
    updateUserRecord,
    softDeleteUserRecord,
    deleteAndReleaseUserRecord,
    resolveMultiRoleAccount,
    purgeAllTestAccountsAndCredits,
    purgeSimulatedSubscriptions,
    isSuperAdmin,
    currentUserProfile,
    getSchoolAccreditationMetrics,
    fetchSchoolLiveRoster,
    adminLessonNotes,
    isSyncingDirectory,
    directorySyncStats,
    syncUserDirectoryFromCloud,
    loginWithGoogle,
    tutorBookings
  } = useApp();

  const [portalView, setPortalView] = useState<'directory' | 'school_admin' | 'forum_moderation' | 'ota_competitions' | 'lesson_notes' | 'class_directory' | 'past_questions' | 'security_trust' | 'aspirant_rewards'>(() => {
    const returnTarget = peekGoogleAuthReturnTarget();
    if (returnTarget === 'ota_app_updates') {
      clearGoogleAuthReturnTarget();
      return 'ota_competitions';
    }
    return 'directory';
  });
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'locked' | 'suspended' | 'deleted' | 'wallet_frozen' | 'conflicts'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<RegisteredUserProfile | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [directoryNotice, setDirectoryNotice] = useState<{
    type: 'success' | 'error';
    text: string;
    needsGoogleAuth?: boolean;
  } | null>(null);
  const [isUnlockingCloudAuth, setIsUnlockingCloudAuth] = useState<boolean>(false);
  const [actingUserId, setActingUserId] = useState<string | null>(null);
  const [isPurgingTestAccounts, setIsPurgingTestAccounts] = useState<boolean>(false);
  const [isPurgingSimSubs, setIsPurgingSimSubs] = useState<boolean>(false);
  const [deleteModalTarget, setDeleteModalTarget] = useState<{
    user: RegisteredUserProfile;
    reason: string;
    banEmail: boolean;
  } | null>(null);
  const [conflictModalUser, setConflictModalUser] = useState<RegisteredUserProfile | null>(null);
  const [resolvingRoleKey, setResolvingRoleKey] = useState<string | null>(null);

  useBackHandler(portalView !== 'directory', () => setPortalView('directory'), 'superadmin-portal-view');
  useBackHandler(Boolean(selectedUserForEdit), () => setSelectedUserForEdit(null), 'superadmin-edit-user');
  useBackHandler(Boolean(deleteModalTarget), () => setDeleteModalTarget(null), 'superadmin-delete-user');
  useBackHandler(Boolean(conflictModalUser), () => setConflictModalUser(null), 'superadmin-resolve-conflict');

  // Aspirant Referral Rewards Queue State
  const [aspirantRewardsList, setAspirantRewardsList] = useState<AspirantReferralReward[]>([]);
  const [isLoadingAspirantRewards, setIsLoadingAspirantRewards] = useState<boolean>(false);
  const [fulfillingRewardId, setFulfillingRewardId] = useState<string | null>(null);
  const [rewardActionNotice, setRewardActionNotice] = useState<string | null>(null);

  // GitHub Repository Sync state
  const [gitStatus, setGitStatus] = useState<{
    configured: boolean;
    canPush: boolean;
    tokenStatus: 'missing' | 'valid' | 'read_only' | 'invalid' | 'not_found' | 'network_error';
    tokenMessage: string;
    githubUser?: string;
    gitInitialized: boolean;
    repo: string;
    branch: string;
    aheadCount: number;
    behindCount: number;
    uncommittedCount: number;
    incomingCommits: Array<{ sha: string; subject: string; author: string; date: string }>;
    latestCommit: string;
    remoteLatestCommit?: string;
    hasUncommitted: boolean;
    lastError?: string;
  } | null>(null);
  const [gitCommitMessage, setGitCommitMessage] = useState<string>('');
  const [isLoadingGitStatus, setIsLoadingGitStatus] = useState<boolean>(false);
  const [isCheckingUpdates, setIsCheckingUpdates] = useState<boolean>(false);
  const [isPullingGit, setIsPullingGit] = useState<boolean>(false);
  const [isPushingGit, setIsPushingGit] = useState<boolean>(false);
  const [gitSyncFeedback, setGitSyncFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const authorizedAdminEmail = currentUserProfile?.email || (isSuperAdmin ? 'martorefe@gmail.com' : '');

  const buildAdminHeaders = React.useCallback(async (includeJsonContentType = false): Promise<Record<string, string>> => {
    const authHeaders = await getFirebaseAuthHeaders().catch(() => ({}));
    return {
      ...(includeJsonContentType ? { 'Content-Type': 'application/json' } : {}),
      ...getSecurityHeaders({
        userId: currentUserProfile?.id,
        userEmail: authorizedAdminEmail || undefined,
      }),
      ...authHeaders,
    };
  }, [currentUserProfile?.id, authorizedAdminEmail]);

  const safeParseApiJson = async (res: Response): Promise<{ data: any; nonJsonError?: string }> => {
    const rawText = await res.text().catch(() => '');
    if (!rawText) {
      return { data: {} };
    }
    try {
      return { data: JSON.parse(rawText) };
    } catch {
      const trimmed = rawText.trim().toLowerCase();
      const isHtml = trimmed.startsWith('<!doctype') || trimmed.startsWith('<html') || trimmed.startsWith('<');
      return {
        data: null,
        nonJsonError: isHtml
          ? `Student Companion services are still getting ready (HTTP ${res.status || 503}). Please tap Retry in a moment.`
          : `Unexpected response from server (HTTP ${res.status || 500}).`,
      };
    }
  };

  const fetchAspirantRewards = React.useCallback(async () => {
    if (!authorizedAdminEmail) return;
    setIsLoadingAspirantRewards(true);
    try {
      const headers = await buildAdminHeaders(false);
      const res = await fetch(`/api/admin/aspirant-rewards?adminEmail=${encodeURIComponent(authorizedAdminEmail)}`, { headers });
      const { data } = await safeParseApiJson(res);
      if (res.ok && data && Array.isArray(data.rewards)) {
        setAspirantRewardsList(data.rewards);
      }
    } catch {
      // ignore transient network errors
    } finally {
      setIsLoadingAspirantRewards(false);
    }
  }, [authorizedAdminEmail, buildAdminHeaders]);

  const hydratedSchoolCodesRef = React.useRef<Set<string>>(new Set());
  React.useEffect(() => {
    if (portalView !== 'directory') return;
    const codesToLoad = allRegisteredUsers
      .filter((u): u is RegisteredUserProfile & { adminData: NonNullable<RegisteredUserProfile['adminData']> } =>
        u.role === 'admin' && Boolean(u.adminData?.schoolCode)
      )
      .map(u => (u.adminData.schoolCode || '').trim().toUpperCase())
      .filter(code => code.length >= 4 && !hydratedSchoolCodesRef.current.has(code));

    codesToLoad.slice(0, 12).forEach(code => {
      hydratedSchoolCodesRef.current.add(code);
      void fetchSchoolLiveRoster(code);
    });
  }, [portalView, allRegisteredUsers, fetchSchoolLiveRoster]);

  const didAutoSyncDirectoryRef = React.useRef<boolean>(false);
  React.useEffect(() => {
    if (portalView !== 'directory' || !isSuperAdmin) return;
    if (didAutoSyncDirectoryRef.current) return;
    didAutoSyncDirectoryRef.current = true;
    void syncUserDirectoryFromCloud({ silent: true });
  }, [portalView, isSuperAdmin, syncUserDirectoryFromCloud]);

  const handleUnlockCloudSyncWithGoogle = async () => {
    setIsUnlockingCloudAuth(true);
    setDirectoryNotice(null);
    try {
      const authRes: any = await loginWithGoogle({
        skipNavigate: true,
        returnTarget: 'super_admin'
      });
      if (authRes?.redirecting) {
        return;
      }
      if (!authRes?.success) {
        setDirectoryNotice({
          type: 'error',
          text: authRes?.error || 'Google Sign-In was not completed. Please sign in with your Super Admin Google account.',
          needsGoogleAuth: true
        });
        return;
      }
      const syncRes = await syncUserDirectoryFromCloud({
        silent: false,
        adminEmailOverride: authRes?.profile?.email || authorizedAdminEmail
      });
      setDirectoryNotice({
        type: syncRes.success ? 'success' : 'error',
        text: syncRes.success
          ? syncRes.message || `Directory synced across backend, Firestore, and legacy registries (${syncRes.totalUsers} total account(s)).`
          : syncRes.error || 'Directory sync completed with partial restrictions.',
        needsGoogleAuth: Boolean(syncRes.needsGoogleAuth && !syncRes.success)
      });
    } catch (err: any) {
      setDirectoryNotice({
        type: 'error',
        text: err?.message || 'Unable to verify Google Admin session.',
        needsGoogleAuth: true
      });
    } finally {
      setIsUnlockingCloudAuth(false);
    }
  };

  React.useEffect(() => {
    void fetchAspirantRewards();
  }, [fetchAspirantRewards]);

  const handleFulfillAspirantReward = async (rewardId: string) => {
    if (!authorizedAdminEmail) return;
    setFulfillingRewardId(rewardId);
    setRewardActionNotice(null);
    try {
      const headers = await buildAdminHeaders(true);
      const res = await fetch('/api/admin/aspirant-rewards/fulfill', {
        method: 'POST',
        headers,
        body: JSON.stringify({ adminEmail: authorizedAdminEmail, rewardId })
      });
      const { data, nonJsonError } = await safeParseApiJson(res);
      if (res.ok && data?.success) {
        setRewardActionNotice(`Marked ${rewardId} as 2GB Data Fulfilled.`);
        await fetchAspirantRewards();
      } else {
        setRewardActionNotice(data?.error || nonJsonError || 'Could not mark reward fulfilled.');
      }
    } catch (err: any) {
      setRewardActionNotice(err?.message || 'Network error fulfilling reward.');
    } finally {
      setFulfillingRewardId(null);
    }
  };

  const fetchGitStatus = React.useCallback(async (fetchRemote = false) => {
    if (!authorizedAdminEmail) return;
    if (fetchRemote) {
      setIsCheckingUpdates(true);
    } else {
      setIsLoadingGitStatus(true);
    }
    try {
      const headers = await buildAdminHeaders(false);
      const res = await fetch(
        `/api/git/status?adminEmail=${encodeURIComponent(authorizedAdminEmail)}${fetchRemote ? '&fetch=1' : ''}`,
        { headers, cache: 'no-store' }
      );
      const { data, nonJsonError } = await safeParseApiJson(res);
      if (nonJsonError || !data) {
        setGitSyncFeedback({
          type: 'error',
          message: nonJsonError || 'Unable to inspect GitHub repository sync status.'
        });
        return;
      }
      if (res.ok && data.success) {
        setGitStatus({
          configured: Boolean(data.configured),
          canPush: Boolean(data.canPush),
          tokenStatus: data.tokenStatus || (data.configured ? 'valid' : 'missing'),
          tokenMessage: data.tokenMessage || '',
          githubUser: data.githubUser,
          gitInitialized: Boolean(data.gitInitialized),
          repo: data.repo,
          branch: data.branch,
          aheadCount: Number(data.aheadCount) || 0,
          behindCount: Number(data.behindCount) || 0,
          uncommittedCount: Number(data.uncommittedCount) || 0,
          incomingCommits: Array.isArray(data.incomingCommits) ? data.incomingCommits : [],
          latestCommit: data.latestCommit || 'unborn',
          remoteLatestCommit: data.remoteLatestCommit,
          hasUncommitted: Boolean(data.hasUncommitted),
          lastError: data.lastError || undefined,
        });
        if (fetchRemote) {
          if (data.lastError) {
            setGitSyncFeedback({ type: 'error', message: data.lastError });
          } else if (Number(data.behindCount) > 0) {
            setGitSyncFeedback({
              type: 'success',
              message: `${data.behindCount} incoming commit(s) detected on ${data.repo} (${data.branch}). Click "Pull from GitHub" to merge them cleanly.`
            });
          } else {
            setGitSyncFeedback({
              type: 'success',
              message: `Checked GitHub ${data.branch}: no new remote commits ahead of local workspace.`
            });
          }
        } else {
          setGitSyncFeedback((prev) => (prev?.type === 'error' ? null : prev));
        }
      } else {
        setGitSyncFeedback({
          type: 'error',
          message: data.error || 'Unable to inspect GitHub repository sync status.'
        });
      }
    } catch (err: any) {
      setGitSyncFeedback({
        type: 'error',
        message:
          typeof navigator !== 'undefined' && navigator.onLine === false
            ? 'You appear to be offline. Reconnect and tap Check Updates.'
            : err?.message === 'Failed to fetch'
            ? 'Could not reach Student Companion GitHub Sync right now. Wait a moment for the service to finish waking up and tap Check Updates.'
            : err?.message || 'Network error checking GitHub repository status.'
      });
    } finally {
      setIsLoadingGitStatus(false);
      setIsCheckingUpdates(false);
    }
  }, [authorizedAdminEmail, buildAdminHeaders]);

  React.useEffect(() => {
    void fetchGitStatus(false);
  }, [fetchGitStatus]);

  const handlePullFromGithub = async () => {
    if (!authorizedAdminEmail) return;
    setIsPullingGit(true);
    setGitSyncFeedback(null);
    try {
      const headers = await buildAdminHeaders(true);
      const res = await fetch('/api/git/pull', {
        method: 'POST',
        headers,
        body: JSON.stringify({ adminEmail: authorizedAdminEmail })
      });
      const { data, nonJsonError } = await safeParseApiJson(res);
      if (res.ok && data?.success) {
        setGitSyncFeedback({
          type: 'success',
          message: data.message || `Pulled ${data.pulledCommits ?? 0} commit(s) from GitHub.`
        });
        await fetchGitStatus(false);
      } else {
        setGitSyncFeedback({
          type: 'error',
          message: data?.error || nonJsonError || 'Failed to pull updates from GitHub.'
        });
      }
    } catch (err: any) {
      setGitSyncFeedback({
        type: 'error',
        message: err?.message || 'Network error pulling updates from GitHub.'
      });
    } finally {
      setIsPullingGit(false);
    }
  };

  const handleSyncToGithub = async () => {
    if (!authorizedAdminEmail) return;
    setIsPushingGit(true);
    setGitSyncFeedback(null);
    try {
      const headers = await buildAdminHeaders(true);
      const res = await fetch('/api/git/push', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          adminEmail: authorizedAdminEmail,
          commitMessage: gitCommitMessage.trim() || undefined
        })
      });
      const { data, nonJsonError } = await safeParseApiJson(res);
      if (res.ok && data?.success) {
        setGitSyncFeedback({
          type: 'success',
          message: data.message || `Synced commits to ${data.repo} (${data.branch}).`
        });
        setGitCommitMessage('');
        await fetchGitStatus(false);
      } else {
        setGitSyncFeedback({
          type: 'error',
          message: data?.error || nonJsonError || 'Failed to push updates to GitHub.'
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

  // GitHub Cloud Android APK Build state (no Android Studio needed)
  const [apkCloudStatus, setApkCloudStatus] = useState<{
    apkReady: boolean;
    apkUrl: string | null;
    apkFileName?: string | null;
    apkSizeBytes: number;
    versionName: string;
    semver?: string | null;
    buildNumber?: number | null;
    versionCode?: number | null;
    releaseTag?: string | null;
    commitSha?: string | null;
    signingMode?: 'persistent' | 'ephemeral' | 'unknown';
    releasePageUrl?: string | null;
    workflowOnRemote: boolean;
    latestRun: {
      status: string;
      conclusion: string | null;
      runNumber?: number | null;
      headSha?: string | null;
      htmlUrl: string;
      createdAt: string;
    } | null;
    actionsPageUrl?: string;
    releasesPageUrl?: string;
  } | null>(null);
  const [isCheckingApkStatus, setIsCheckingApkStatus] = useState(false);
  const [apkStatusError, setApkStatusError] = useState<string | null>(null);
  const [isTriggeringApkBuild, setIsTriggeringApkBuild] = useState(false);
  const [apkBuildFeedback, setApkBuildFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchApkCloudStatus = React.useCallback(async () => {
    setIsCheckingApkStatus(true);
    setApkStatusError(null);
    try {
      const headers = await buildAdminHeaders(false);
      const res = await fetch('/api/android/apk-status', { headers, cache: 'no-store' });
      const { data, nonJsonError } = await safeParseApiJson(res);
      if (res.ok && data?.success) {
        setApkCloudStatus(data);
      } else {
        setApkStatusError(data?.error || nonJsonError || `Unable to verify APK build status (HTTP ${res.status}).`);
      }
    } catch (err: any) {
      setApkStatusError(
        err?.message === 'Failed to fetch'
          ? 'Connection to APK build service was interrupted while waking up. Tap Check Build to retry.'
          : err?.message || 'Network error checking APK build status.'
      );
    } finally {
      setIsCheckingApkStatus(false);
    }
  }, [buildAdminHeaders]);

  const [integrationsStatus, setIntegrationsStatus] = useState<{
    geminiConfigured: boolean;
    paystackPublicConfigured: boolean;
    paystackSecretConfigured: boolean;
    paystackLiveReady: boolean;
    resendConfigured: boolean;
    gmailConfigured: boolean;
    gmailUserConfigured?: boolean;
    resendFromEmail?: string;
    directEmailDeliveryReady?: boolean;
    emailSandboxOnly?: boolean;
    emailReady: boolean;
    googleMapsConfigured: boolean;
    githubTokenConfigured: boolean;
    superAdminPasswordConfigured: boolean;
    renderHosted?: boolean;
    hostingPlatform?: 'render' | 'aistudio';
    backendUrl: string;
  } | null>(null);
  const [isCheckingIntegrations, setIsCheckingIntegrations] = useState(false);
  const [integrationsError, setIntegrationsError] = useState<string | null>(null);
  const [showRenderGuide, setShowRenderGuide] = useState(false);
  const [copiedSecretKey, setCopiedSecretKey] = useState<string | null>(null);
  const [testEmailRecipient, setTestEmailRecipient] = useState<string>(authorizedAdminEmail || '');
  const [isSendingTestEmail, setIsSendingTestEmail] = useState(false);
  const [isForceRefreshingCache, setIsForceRefreshingCache] = useState(false);
  const [testEmailResult, setTestEmailResult] = useState<{
    success: boolean;
    message: string;
    provider?: string;
    sandboxRestricted?: boolean;
    testedAt?: string;
  } | null>(null);

  const handleForceRefreshAppCache = async () => {
    if (isForceRefreshingCache) return;
    setIsForceRefreshingCache(true);
    await forceClearAppCacheAndReload();
  };

  const handleCopySecretKey = (keyName: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(keyName).catch(() => {});
    }
    setCopiedSecretKey(keyName);
    window.setTimeout(() => {
      setCopiedSecretKey((curr) => (curr === keyName ? null : curr));
    }, 1800);
  };

  const fetchIntegrationsStatus = React.useCallback(async () => {
    setIsCheckingIntegrations(true);
    setIntegrationsError(null);
    try {
      const headers = await buildAdminHeaders(false);
      const res = await fetch('/api/system/integrations-status', { headers, cache: 'no-store' });
      const { data, nonJsonError } = await safeParseApiJson(res);
      if (res.ok && data?.success) {
        setIntegrationsStatus(data);
      } else {
        setIntegrationsError(
          data?.error || nonJsonError || `Unable to check live services status (HTTP ${res.status}).`
        );
      }
    } catch (err: any) {
      setIntegrationsError(
        err?.message === 'Failed to fetch'
          ? 'Still connecting to Student Companion backend services. Tap Check Integrations to retry.'
          : err?.message || 'Network error checking live services.'
      );
    } finally {
      setIsCheckingIntegrations(false);
    }
  }, [buildAdminHeaders]);

  React.useEffect(() => {
    void fetchApkCloudStatus();
    void fetchIntegrationsStatus();
  }, [fetchApkCloudStatus, fetchIntegrationsStatus]);

  const handleSendAdminTestEmail = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const target = testEmailRecipient.trim().toLowerCase();
    if (!target || !target.includes('@')) {
      setTestEmailResult({
        success: false,
        message: 'Enter a valid email address to test live delivery.'
      });
      return;
    }
    setIsSendingTestEmail(true);
    setTestEmailResult(null);
    try {
      const headers = await buildAdminHeaders(true);
      const res = await fetch('/api/admin/email-test', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          recipientEmail: target,
          adminEmail: authorizedAdminEmail
        })
      });
      const { data, nonJsonError } = await safeParseApiJson(res);
      if (res.ok && data?.success) {
        setTestEmailResult({
          success: true,
          message: data.message || `Live test email delivered to ${target}.`,
          provider: data.provider,
          testedAt: data.testedAt
        });
      } else {
        setTestEmailResult({
          success: false,
          message: data?.error || nonJsonError || `Live email test failed (HTTP ${res.status}).`,
          sandboxRestricted: Boolean(data?.sandboxRestricted),
          testedAt: data?.testedAt
        });
      }
    } catch (err: any) {
      setTestEmailResult({
        success: false,
        message: err?.message || 'Network error while running live email test.'
      });
    } finally {
      setIsSendingTestEmail(false);
    }
  };

  const handleTriggerGithubApkBuild = async () => {
    if (!authorizedAdminEmail) return;
    setIsTriggeringApkBuild(true);
    setApkBuildFeedback(null);
    try {
      const headers = await buildAdminHeaders(true);
      const res = await fetch('/api/android/trigger-github-apk-build', {
        method: 'POST',
        headers,
        body: JSON.stringify({ adminEmail: authorizedAdminEmail }),
      });
      const { data, nonJsonError } = await safeParseApiJson(res);
      if (res.ok && data?.success) {
        setApkBuildFeedback({
          type: 'success',
          message: data.message || 'GitHub cloud APK build triggered!',
        });
        await fetchApkCloudStatus();
      } else {
        setApkBuildFeedback({
          type: 'error',
          message: data?.error || nonJsonError || 'Could not trigger GitHub Actions APK build.',
        });
      }
    } catch (err: any) {
      setApkBuildFeedback({
        type: 'error',
        message: err?.message || 'Network error triggering GitHub APK build.',
      });
    } finally {
      setIsTriggeringApkBuild(false);
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

  // Edit form state — Common + Full Persona Fields
  const [editFullName, setEditFullName] = useState<string>('');
  const [editEmail, setEditEmail] = useState<string>('');

  // Student Persona Edit State
  const [editClassLevel, setEditClassLevel] = useState<NigerianClassLevel>('JSS 3');
  const [editStudentStream, setEditStudentStream] = useState<AcademicStream>('Science');
  const [editStudentSchool, setEditStudentSchool] = useState<string>('');
  const [editStudentSchoolCode, setEditStudentSchoolCode] = useState<string>('');
  const [editStudentLinkCode, setEditStudentLinkCode] = useState<string>('');
  const [editXP, setEditXP] = useState<number>(0);
  const [editStudentStreakDays, setEditStudentStreakDays] = useState<number>(1);
  const [editUniformVerified, setEditUniformVerified] = useState<boolean>(false);

  // Parent Persona Edit State
  const [editParentPhone, setEditParentPhone] = useState<string>('');
  const [editParentRelationship, setEditParentRelationship] = useState<ParentRelationship>('Mother');
  const [editParentWardName, setEditParentWardName] = useState<string>('');
  const [editParentState, setEditParentState] = useState<string>('Lagos');
  const [editParentCity, setEditParentCity] = useState<string>('');
  const [editParentPin, setEditParentPin] = useState<string>('1234');
  const [editParentNotificationPref, setEditParentNotificationPref] =
    useState<ParentNotificationChannel>('WhatsApp');
  const [editParentAllowReports, setEditParentAllowReports] = useState<boolean>(true);

  // Tutor Persona Edit State
  const [editTutorSubjects, setEditTutorSubjects] = useState<string[]>([]);
  const [editTutorSpecialization, setEditTutorSpecialization] = useState<string>('');
  const [editHourlyRate, setEditHourlyRate] = useState<number>(3500);
  const [editTutorTeachingMode, setEditTutorTeachingMode] = useState<'both' | 'online' | 'physical'>('both');
  const [editTutorQualification, setEditTutorQualification] = useState<string>('');
  const [editTutorHighestEducation, setEditTutorHighestEducation] =
    useState<NigerianHighestEducation>('B.Sc.');
  const [editTutorInstitution, setEditTutorInstitution] = useState<string>('');
  const [editTutorCourseOfStudy, setEditTutorCourseOfStudy] = useState<string>('');
  const [editTutorDegreesText, setEditTutorDegreesText] = useState<string>('');
  const [editTutorExperienceRange, setEditTutorExperienceRange] =
    useState<NonNullable<RegisteredTutorData['experienceYearsRange']>>('1-3 years');
  const [editTutorPhone, setEditTutorPhone] = useState<string>('');
  const [editTutorCity, setEditTutorCity] = useState<string>('');
  const [editTutorState, setEditTutorState] = useState<string>('Lagos');
  const [editTutorTargetClasses, setEditTutorTargetClasses] = useState<string[]>([]);
  const [editTutorTagline, setEditTutorTagline] = useState<string>('');
  const [editTutorBio, setEditTutorBio] = useState<string>('');
  const [editTutorNin, setEditTutorNin] = useState<string>('');
  const [editTutorVerified, setEditTutorVerified] = useState<boolean>(false);

  // School Admin Persona Edit State
  const [editAdminSchoolName, setEditAdminSchoolName] = useState<string>('');
  const [editAdminSchoolType, setEditAdminSchoolType] = useState<string>('Private Secondary College');
  const [editAdminSchoolCode, setEditAdminSchoolCode] = useState<string>('');
  const [editAdminDesignation, setEditAdminDesignation] = useState<string>('');
  const [editAdminPhone, setEditAdminPhone] = useState<string>('');
  const [editAdminState, setEditAdminState] = useState<string>('Lagos');
  const [editAdminLga, setEditAdminLga] = useState<string>('');
  const [editAdminVerified, setEditAdminVerified] = useState<boolean>(true);

  // Growth Partner Persona Edit State
  const [editPartnerPhone, setEditPartnerPhone] = useState<string>('');
  const [editPartnerReferralCode, setEditPartnerReferralCode] = useState<string>('');
  const [editPartnerCommissionRate, setEditPartnerCommissionRate] = useState<number>(10);
  const [editPartnerBankName, setEditPartnerBankName] = useState<string>('');
  const [editPartnerAccountNumber, setEditPartnerAccountNumber] = useState<string>('');
  const [editPartnerAccountName, setEditPartnerAccountName] = useState<string>('');
  const [editPartnerStatus, setEditPartnerStatus] =
    useState<GrowthPartner['status']>('active');

  // Trust & Enforcement State
  const [editAccountStatus, setEditAccountStatus] = useState<'active' | 'locked' | 'suspended' | 'deleted'>('active');
  const [editLockDurationMinutes, setEditLockDurationMinutes] = useState<number>(60);
  const [editWalletFrozen, setEditWalletFrozen] = useState<boolean>(false);
  const [editEnforcementReason, setEditEnforcementReason] = useState<string>('');
  const [selectedAccreditationDocUrl, setSelectedAccreditationDocUrl] = useState<string | null>(null);

  const getEffectiveStatus = (u: RegisteredUserProfile): 'active' | 'locked' | 'suspended' | 'deleted' => {
    if (u.accountStatus === 'deleted') return 'deleted';
    if (u.accountStatus === 'suspended') return 'suspended';
    if (u.accountStatus === 'locked') {
      if (!u.lockedUntil || new Date(u.lockedUntil).getTime() > Date.now()) {
        return 'locked';
      }
    }
    return 'active';
  };

  // Filtered Users
  const filteredUsers = allRegisteredUsers.filter(u => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    const effStatus = getEffectiveStatus(u);
    if (statusFilter === 'conflicts' && !(u.conflictingRoles && u.conflictingRoles.length > 1)) return false;
    if (statusFilter === 'wallet_frozen' && !u.walletFrozen) return false;
    if (
      statusFilter !== 'all' &&
      statusFilter !== 'wallet_frozen' &&
      statusFilter !== 'conflicts' &&
      effStatus !== statusFilter
    ) {
      return false;
    }
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const studentSchool = u.studentData?.school?.toLowerCase() || '';
    const studentLinkCode = u.studentData?.studentLinkCode?.toLowerCase() || '';
    const parentWard = u.parentData?.wardName?.toLowerCase() || '';
    const tutorSubject = [
      u.tutorData?.subjectSpecialization || '',
      ...(u.tutorData?.proficientSubjects || [])
    ]
      .join(' ')
      .toLowerCase();
    const adminSchool = u.adminData?.schoolName?.toLowerCase() || '';
    const adminCode = u.adminData?.schoolCode?.toLowerCase() || '';
    const partnerCode = u.growthPartnerData?.referralCode?.toLowerCase() || '';

    return (
      u.fullName.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      u.id.toLowerCase().includes(query) ||
      studentSchool.includes(query) ||
      studentLinkCode.includes(query) ||
      parentWard.includes(query) ||
      tutorSubject.includes(query) ||
      adminSchool.includes(query) ||
      adminCode.includes(query) ||
      partnerCode.includes(query)
    );
  });

  const studentCount = allRegisteredUsers.filter(u => u.role === 'student').length;
  const parentCount = allRegisteredUsers.filter(u => u.role === 'parent').length;
  const tutorCount = allRegisteredUsers.filter(u => u.role === 'tutor').length;
  const growthPartnerCount = allRegisteredUsers.filter(u => u.role === 'growth_partner').length;
  const adminCount = allRegisteredUsers.filter(u => u.role === 'admin').length;
  const conflictUsersCount = allRegisteredUsers.filter(
    u => u.conflictingRoles && u.conflictingRoles.length > 1
  ).length;

  const formatConflictRoleLabel = (role: UserRole): string => {
    if (role === 'student') return 'Student';
    if (role === 'parent') return 'Parent';
    if (role === 'tutor') return 'Tutor';
    if (role === 'growth_partner') return 'Growth Partner';
    if (role === 'admin' || role === 'school_admin') return 'School Admin';
    return role;
  };

  const handleOpenEditModal = (u: RegisteredUserProfile) => {
    setSelectedUserForEdit(u);
    setEditFullName(u.fullName);
    setEditEmail(u.email);

    // Student
    setEditClassLevel(u.studentData?.classLevel || 'JSS 3');
    setEditStudentStream((u.studentData?.stream as AcademicStream) || 'Science');
    setEditStudentSchool(u.studentData?.school || '');
    setEditStudentSchoolCode(u.studentData?.schoolCode || '');
    setEditStudentLinkCode(u.studentData?.studentLinkCode || '');
    setEditXP(Number(u.studentData?.xp || 0));
    setEditStudentStreakDays(Number(u.studentData?.streakDays || 1));
    setEditUniformVerified(Boolean(u.studentData?.uniformVerified));

    // Parent
    setEditParentPhone(u.parentData?.phone || '');
    setEditParentRelationship(u.parentData?.relationship || 'Mother');
    setEditParentWardName(u.parentData?.wardName || '');
    setEditParentState(u.parentData?.stateOfResidence || 'Lagos');
    setEditParentCity(u.parentData?.cityOrLga || '');
    setEditParentPin(u.parentData?.pin || '1234');
    setEditParentNotificationPref(u.parentData?.notificationPreference || 'WhatsApp');
    setEditParentAllowReports(u.parentData?.allowAutomatedReports !== false);

    // Tutor
    const td = u.tutorData;
    const parsedTutorSubjects =
      td?.proficientSubjects && td.proficientSubjects.length > 0
        ? dedupeSubjects(td.proficientSubjects)
        : parseSubjectString(td?.subjectSpecialization);
    setEditTutorSubjects(parsedTutorSubjects);
    setEditTutorSpecialization(
      td?.subjectSpecialization || formatSubjectSpecialization(parsedTutorSubjects, '')
    );
    setEditHourlyRate(Number(td?.hourlyRate || 3500));
    setEditTutorTeachingMode(td?.teachingMode || 'both');
    const normalizedEd = normalizeHighestEducation(td?.highestEducation, td?.qualification);
    const resolvedQual =
      normalizedEd === 'Other'
        ? td?.qualification || ''
        : td?.qualification && !/^other$/i.test(td.qualification)
          ? td.qualification
          : normalizedEd;
    const cleanedDegrees = rebuildTutorDegrees(
      Array.isArray(td?.degrees) ? td.degrees : [],
      {
        highestEducation: normalizedEd,
        qualification: resolvedQual,
        courseOfStudy: td?.courseOfStudy || '',
        institution: td?.institution || ''
      },
      td
    );
    setEditTutorQualification(resolvedQual);
    setEditTutorHighestEducation(normalizedEd);
    setEditTutorInstitution(td?.institution || '');
    setEditTutorCourseOfStudy(td?.courseOfStudy || '');
    setEditTutorDegreesText(cleanedDegrees.join('\n'));
    setEditTutorExperienceRange(td?.experienceYearsRange || '1-3 years');
    setEditTutorPhone(td?.phone || '');
    setEditTutorCity(td?.city || '');
    setEditTutorState(td?.state || 'Lagos');
    setEditTutorTargetClasses(Array.isArray(td?.targetClasses) ? td.targetClasses : []);
    setEditTutorTagline(td?.tagline || '');
    setEditTutorBio(td?.bio || '');
    setEditTutorNin(td?.nin || td?.verification?.nin || '');
    setEditTutorVerified(Boolean(td?.verification?.isVerified));

    // School Admin
    setEditAdminSchoolName(u.adminData?.schoolName || 'Secondary School');
    setEditAdminSchoolType(u.adminData?.schoolType || 'Private Secondary College');
    setEditAdminSchoolCode(u.adminData?.schoolCode || '');
    setEditAdminDesignation(u.adminData?.designation || '');
    setEditAdminPhone(u.adminData?.phone || '');
    setEditAdminState(u.adminData?.state || 'Lagos');
    setEditAdminLga(u.adminData?.lga || '');
    setEditAdminVerified(u.adminData?.verificationStatus === 'verified');
    if (u.role === 'admin' && u.adminData?.schoolCode) {
      void fetchSchoolLiveRoster(u.adminData.schoolCode);
    }

    // Growth Partner
    const gp = u.growthPartnerData;
    setEditPartnerPhone(gp?.phone || '');
    setEditPartnerReferralCode(gp?.referralCode || '');
    setEditPartnerCommissionRate(Number(gp?.commissionRatePercent ?? 10));
    setEditPartnerBankName(gp?.bankName || '');
    setEditPartnerAccountNumber(gp?.accountNumber || '');
    setEditPartnerAccountName(gp?.accountName || u.fullName || '');
    setEditPartnerStatus(gp?.status || 'active');

    const eff = getEffectiveStatus(u);
    setEditAccountStatus(eff);
    setEditLockDurationMinutes(60);
    setEditWalletFrozen(Boolean(u.walletFrozen));
    setEditEnforcementReason(u.suspensionReason || u.lockReason || u.walletFrozenReason || u.deletionReason || '');
  };

  const dispatchServerAccountAction = async (payload: {
    action: string;
    user: RegisteredUserProfile;
    durationMinutes?: number;
    reason?: string;
  }) => {
    const authHeaders = await getFirebaseAuthHeaders();
    const res = await fetch('/api/security/action', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...getSecurityHeaders({ userEmail: authorizedAdminEmail })
      },
      body: JSON.stringify({
        adminEmail: authorizedAdminEmail,
        action: payload.action,
        targetValue: payload.user.id,
        targetUserId: payload.user.id,
        targetEmail: payload.user.email,
        targetRole: payload.user.role,
        durationMinutes: payload.durationMinutes,
        reason: payload.reason
      })
    });
    return res.json();
  };

  const handleQuickEnforcement = async (
    u: RegisteredUserProfile,
    action: 'lock_account' | 'unlock_account' | 'suspend_account' | 'unsuspend_account' | 'freeze_wallet' | 'unfreeze_wallet',
    durationMinutes = 1440
  ) => {
    if (u.isSuperAdmin) {
      setDirectoryNotice({ type: 'error', text: 'Verified Super Admin accounts cannot be restricted.' });
      return;
    }
    setActingUserId(u.id);
    setDirectoryNotice(null);
    try {
      const reason =
        action === 'lock_account'
          ? `24h timed lock issued from Directory by ${authorizedAdminEmail}`
          : action === 'suspend_account'
          ? `Account suspended indefinitely from Directory by ${authorizedAdminEmail}`
          : action === 'freeze_wallet'
          ? `Wallet frozen from Directory by ${authorizedAdminEmail}`
          : `Updated by ${authorizedAdminEmail}`;
      const data = await dispatchServerAccountAction({ action, user: u, durationMinutes, reason });
      if (!data.success) {
        setDirectoryNotice({ type: 'error', text: data.error || 'Security action failed.' });
        return;
      }

      if (action === 'lock_account') {
        await updateUserRecord(u.id, {
          accountStatus: 'locked',
          lockedUntil: data.lockedUntil || new Date(Date.now() + durationMinutes * 60 * 1000).toISOString(),
          lockReason: reason
        });
      } else if (action === 'unlock_account') {
        await updateUserRecord(u.id, {
          accountStatus: 'active',
          lockedUntil: undefined,
          lockReason: undefined
        });
      } else if (action === 'suspend_account') {
        await updateUserRecord(u.id, {
          accountStatus: 'suspended',
          suspensionReason: reason,
          suspendedAt: new Date().toISOString()
        });
      } else if (action === 'unsuspend_account') {
        await updateUserRecord(u.id, {
          accountStatus: 'active',
          suspensionReason: undefined
        });
      } else if (action === 'freeze_wallet') {
        await updateUserRecord(u.id, {
          walletFrozen: true,
          walletFrozenReason: reason
        });
      } else if (action === 'unfreeze_wallet') {
        await updateUserRecord(u.id, {
          walletFrozen: false,
          walletFrozenReason: undefined
        });
      }

      setDirectoryNotice({ type: 'success', text: data.message || `Updated ${u.fullName}.` });
      setTimeout(() => setDirectoryNotice(null), 3500);
    } catch (err: any) {
      setDirectoryNotice({ type: 'error', text: err?.message || 'Network error executing enforcement action.' });
    } finally {
      setActingUserId(null);
    }
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
    if (user.adminData.schoolCode) {
      try {
        await fetch('/api/schools/code/issue', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            adminId: user.id,
            schoolName: user.adminData.schoolName,
            schoolType: user.adminData.schoolType,
            state: user.adminData.state,
            lga: user.adminData.lga,
            preferredCode: user.adminData.schoolCode,
            verificationStatus: newStatus
          })
        });
      } catch {
        // non-blocking registry sync
      }
    }
    setModerationNotice(`${user.adminData.schoolName} accreditation ${newStatus === 'verified' ? 'approved ✓' : 'set to pending'}.`);
    setTimeout(() => setModerationNotice(null), 3500);
  };

  const handleSaveUserEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForEdit) return;
    if (selectedUserForEdit.accountStatus === 'deleted') {
      setSelectedUserForEdit(null);
      return;
    }

    const cleanName = editFullName.trim() || selectedUserForEdit.fullName;
    const cleanEmail = editEmail.trim().toLowerCase() || selectedUserForEdit.email;

    const updates: Partial<RegisteredUserProfile> = {
      fullName: cleanName,
      email: cleanEmail
    };

    if (selectedUserForEdit.role === 'student') {
      const nextXP = Math.max(0, Number(editXP) || 0);
      const nextStreak = Math.max(0, Number(editStudentStreakDays) || 0);
      updates.studentData = {
        ...(selectedUserForEdit.studentData || {
          id: selectedUserForEdit.id,
          name: cleanName,
          school: 'Secondary School',
          classLevel: editClassLevel,
          stream: editStudentStream,
          xp: nextXP,
          rank: calculateRankFromXP(nextXP),
          streakDays: nextStreak,
          lastStudyDate: new Date().toISOString().split('T')[0],
          uniformVerified: editUniformVerified,
          uniformPhotoUrl: null,
          downloadedSubjectIds: [],
          completedQuizIds: [],
          completedReadNoteIds: [],
          verifiedReadingLogs: []
        }),
        name: cleanName,
        classLevel: editClassLevel,
        stream: editStudentStream,
        school: editStudentSchool.trim() || 'Secondary School',
        schoolCode: editStudentSchoolCode.trim().toUpperCase() || undefined,
        studentLinkCode: editStudentLinkCode.trim().toUpperCase() || undefined,
        xp: nextXP,
        rank: calculateRankFromXP(nextXP),
        streakDays: nextStreak,
        uniformVerified: editUniformVerified
      };
    } else if (selectedUserForEdit.role === 'parent') {
      updates.parentData = {
        ...(selectedUserForEdit.parentData || { phone: '', pin: '1234' }),
        phone: editParentPhone.trim(),
        relationship: editParentRelationship,
        wardName: editParentWardName.trim(),
        stateOfResidence: editParentState.trim(),
        cityOrLga: editParentCity.trim(),
        pin: editParentPin.trim() || '1234',
        notificationPreference: editParentNotificationPref,
        allowAutomatedReports: editParentAllowReports
      };
    } else if (selectedUserForEdit.role === 'tutor') {
      const cleanSubjects = dedupeSubjects(
        editTutorSubjects.length > 0
          ? editTutorSubjects
          : parseSubjectString(editTutorSpecialization)
      );
      const resolvedSpec =
        editTutorSpecialization.trim() ||
        formatSubjectSpecialization(cleanSubjects, 'General Subjects');
      const existingTd = selectedUserForEdit.tutorData;
      const resolvedHighestEd = normalizeHighestEducation(
        editTutorHighestEducation,
        editTutorQualification
      );
      const resolvedQualification =
        resolvedHighestEd === 'Other'
          ? editTutorQualification.trim() || 'Other Higher Degree'
          : editTutorQualification.trim() && !/^other$/i.test(editTutorQualification.trim())
            ? editTutorQualification.trim()
            : resolvedHighestEd;
      const cleanInstitution = editTutorInstitution.trim();
      const cleanCourseOfStudy = editTutorCourseOfStudy.trim();
      const parsedDegreesFromInput = editTutorDegreesText
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean);
      const resolvedDegrees = rebuildTutorDegrees(
        parsedDegreesFromInput.length > 0 ? parsedDegreesFromInput : existingTd?.degrees,
        {
          highestEducation: resolvedHighestEd,
          qualification: resolvedQualification,
          courseOfStudy: cleanCourseOfStudy,
          institution: cleanInstitution
        },
        existingTd
      );
      const nowIso = new Date().toISOString();

      updates.tutorData = {
        ...(existingTd || {
          subjectSpecialization: resolvedSpec,
          qualification: resolvedQualification,
          hourlyRate: 3500,
          teachingMode: 'both'
        }),
        proficientSubjects: cleanSubjects,
        subjectSpecialization: resolvedSpec,
        hourlyRate: Math.max(0, Number(editHourlyRate) || 3500),
        teachingMode: editTutorTeachingMode,
        qualification: resolvedQualification,
        highestEducation: resolvedHighestEd,
        institution: cleanInstitution,
        courseOfStudy: cleanCourseOfStudy,
        degrees: resolvedDegrees,
        experienceYearsRange: editTutorExperienceRange,
        phone: editTutorPhone.trim(),
        city: editTutorCity.trim(),
        state: editTutorState.trim(),
        targetClasses: editTutorTargetClasses,
        tagline: editTutorTagline.trim() || `${resolvedSpec} Specialist`,
        bio: editTutorBio.trim(),
        nin: editTutorNin.trim(),
        verification: {
          ...(existingTd?.verification || {
            nin: editTutorNin.trim() || 'NIN-PENDING',
            bankName: 'Access Bank',
            accountNumber: '0123456789',
            accountName: cleanName.toUpperCase(),
            isVerified: editTutorVerified
          }),
          nin: editTutorNin.trim() || existingTd?.verification?.nin || 'NIN-PENDING',
          accountName: cleanName.toUpperCase(),
          isVerified: editTutorVerified
        },
        manualSubjectOverrideAt: nowIso,
        manualProfileOverrideAt: nowIso,
        subjectRepairVersion: SUBJECT_REPAIR_VERSION,
        profileRepairVersion: REPAIRED_TUTOR_PROFILE_VERSION
      };
    } else if (selectedUserForEdit.role === 'admin' || selectedUserForEdit.role === 'school_admin') {
      updates.adminData = {
        ...(selectedUserForEdit.adminData || { schoolName: '', schoolType: '' }),
        schoolName: editAdminSchoolName.trim() || 'Secondary School',
        schoolType: editAdminSchoolType.trim() || 'Private Secondary College',
        schoolCode: editAdminSchoolCode.trim().toUpperCase(),
        designation: editAdminDesignation.trim(),
        phone: editAdminPhone.trim(),
        state: editAdminState.trim(),
        lga: editAdminLga.trim(),
        verificationStatus: editAdminVerified ? 'verified' : 'pending_verification',
        verifiedAt: editAdminVerified ? new Date().toISOString() : undefined
      };
    } else if (selectedUserForEdit.role === 'growth_partner') {
      const existingGp = selectedUserForEdit.growthPartnerData;
      updates.growthPartnerData = {
        ...(existingGp || {
          id: selectedUserForEdit.id,
          name: cleanName,
          email: cleanEmail,
          referralCode: '',
          commissionRatePercent: 10,
          totalEarningsNaira: 0,
          totalPaidOutNaira: 0,
          activeReferralsCount: 0,
          status: 'active',
          createdAt: selectedUserForEdit.createdAt || new Date().toISOString()
        }),
        name: cleanName,
        email: cleanEmail,
        phone: editPartnerPhone.trim(),
        referralCode: editPartnerReferralCode.trim().toUpperCase(),
        commissionRatePercent: Math.max(0, Math.min(100, Number(editPartnerCommissionRate) || 10)),
        bankName: editPartnerBankName.trim(),
        accountNumber: editPartnerAccountNumber.trim(),
        accountName: editPartnerAccountName.trim() || cleanName,
        status: editPartnerStatus
      };
    }

    if (!selectedUserForEdit.isSuperAdmin) {
      const prevStatus = getEffectiveStatus(selectedUserForEdit);
      const reason = editEnforcementReason.trim() || `Updated in Super Admin Account Editor (${authorizedAdminEmail})`;

      if (editAccountStatus === 'locked' && (prevStatus !== 'locked' || editEnforcementReason.trim())) {
        const res = await dispatchServerAccountAction({
          action: 'lock_account',
          user: selectedUserForEdit,
          durationMinutes: editLockDurationMinutes,
          reason
        });
        updates.accountStatus = 'locked';
        updates.lockedUntil = res.lockedUntil || new Date(Date.now() + editLockDurationMinutes * 60 * 1000).toISOString();
        updates.lockReason = reason;
        updates.suspensionReason = undefined;
      } else if (editAccountStatus === 'suspended' && (prevStatus !== 'suspended' || editEnforcementReason.trim())) {
        await dispatchServerAccountAction({
          action: 'suspend_account',
          user: selectedUserForEdit,
          reason
        });
        updates.accountStatus = 'suspended';
        updates.suspensionReason = reason;
        updates.suspendedAt = new Date().toISOString();
        updates.lockedUntil = undefined;
        updates.lockReason = undefined;
      } else if (editAccountStatus === 'active' && prevStatus !== 'active') {
        if (prevStatus === 'locked') {
          await dispatchServerAccountAction({ action: 'unlock_account', user: selectedUserForEdit, reason });
        } else if (prevStatus === 'suspended') {
          await dispatchServerAccountAction({ action: 'unsuspend_account', user: selectedUserForEdit, reason });
        }
        updates.accountStatus = 'active';
        updates.lockedUntil = undefined;
        updates.lockReason = undefined;
        updates.suspensionReason = undefined;
      }

      if (editWalletFrozen !== Boolean(selectedUserForEdit.walletFrozen)) {
        await dispatchServerAccountAction({
          action: editWalletFrozen ? 'freeze_wallet' : 'unfreeze_wallet',
          user: selectedUserForEdit,
          reason
        });
        updates.walletFrozen = editWalletFrozen;
        updates.walletFrozenReason = editWalletFrozen ? reason : undefined;
      }
    }

    if (selectedUserForEdit.role === 'admin' && updates.adminData) {
      try {
        const prevCode = (selectedUserForEdit.adminData?.schoolCode || '').trim().toUpperCase();
        const nextCode = (updates.adminData.schoolCode || '').trim().toUpperCase();
        const res = await fetch('/api/schools/code/issue', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            adminId: selectedUserForEdit.id,
            schoolName: updates.adminData.schoolName,
            schoolType: updates.adminData.schoolType,
            state: updates.adminData.state,
            lga: updates.adminData.lga,
            preferredCode: nextCode || undefined,
            forceNew: Boolean(nextCode && prevCode && nextCode !== prevCode),
            verificationStatus: updates.adminData.verificationStatus
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.schoolCode) {
            updates.adminData = {
              ...updates.adminData,
              schoolCode: data.schoolCode
            };
          }
        }
      } catch {
        // non-blocking registry sync
      }
    }

    await updateUserRecord(selectedUserForEdit.id, updates);
    if (updates.adminData?.schoolCode) {
      void fetchSchoolLiveRoster(updates.adminData.schoolCode);
    }
    setSaveSuccessMsg(`Updated profile for ${editFullName} successfully.`);
    setTimeout(() => {
      setSaveSuccessMsg(null);
      setSelectedUserForEdit(null);
    }, 1000);
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

        <WeeklyTournamentPrizeManager />
        <OTACompetitionManager />
      </div>
    );
  }

  if (portalView === 'security_trust') {
    return (
      <SecurityTrustCenter
        adminEmail={authorizedAdminEmail}
        onBack={() => setPortalView('directory')}
        onModifyAccount={(identifier) => {
          const norm = identifier.toLowerCase().trim();
          const matched = allRegisteredUsers.find(
            u => u.id.toLowerCase() === norm || u.email.toLowerCase() === norm
          );
          setPortalView('directory');
          if (matched) {
            handleOpenEditModal(matched);
          } else {
            setSearchQuery(identifier);
          }
        }}
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

  if (portalView === 'class_directory') {
    return (
      <div className="flex-1 min-h-0 w-full flex flex-col overflow-hidden">
        <div className="bg-[#0B1526] px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs shrink-0">
          <span className="text-slate-300 font-semibold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Class Explorer &amp; All Classes Directory (JSS 1 - SS 3)</span>
          </span>
          <button
            onClick={() => setPortalView('directory')}
            className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
          >
            &larr; Return to Super Admin User Directory
          </button>
        </div>
        <SchemeOfWorkHub adminDirectoryMode />
      </div>
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
              onClick={() => setPortalView('class_directory')}
              className="flex items-center gap-1.5 px-3 min-h-[40px] rounded-xl bg-emerald-950/75 hover:bg-emerald-900 border border-emerald-600/60 text-emerald-300 text-xs font-bold transition-all cursor-pointer shadow-sm whitespace-nowrap"
              title="Browse Class Explorer and All Classes Directory (JSS 1 - SS 3)"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>Class Directory</span>
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

            <button
              type="button"
              onClick={() => void handleForceRefreshAppCache()}
              disabled={isForceRefreshingCache}
              className="flex items-center gap-1.5 px-3 min-h-[44px] rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-60 border border-slate-700 text-slate-100 text-xs font-bold transition-all cursor-pointer shadow-sm whitespace-nowrap"
              title="Clears stale Service Worker / PWA caches and loads the latest Netlify deploy without signing you out"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-sky-400 ${isForceRefreshingCache ? 'animate-spin' : ''}`} />
              <span>{isForceRefreshingCache ? 'Clearing cache & reloading...' : 'Force Refresh & Clear App Cache'}</span>
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

      {/* Registration Intake Gate (Master & Per-Persona Pause/Unpause) */}
      <RegistrationGateCard variant="console" />

      {/* Platform Tutor Commissions (20% System Revenue Ledger) */}
      {(() => {
        const activeOrCompletedBookings = tutorBookings.filter(b => b.status !== 'cancelled');
        const completedList = activeOrCompletedBookings.filter(b => b.status === 'completed');
        const escrowList = activeOrCompletedBookings.filter(b => b.status !== 'completed');

        const grossVolume = activeOrCompletedBookings.reduce(
          (sum, b) => sum + getBookingFinancialSplit(b).grossAmountNaira,
          0
        );
        const systemFeeEarned = completedList.reduce(
          (sum, b) => sum + getBookingFinancialSplit(b).platformFeeNaira,
          0
        );
        const systemFeeEscrow = escrowList.reduce(
          (sum, b) => sum + getBookingFinancialSplit(b).platformFeeNaira,
          0
        );
        const tutorNetTotal = activeOrCompletedBookings.reduce(
          (sum, b) => sum + getBookingFinancialSplit(b).tutorNetNaira,
          0
        );
        const consentedUsersCount = allRegisteredUsers.filter(
          u => !u.isSuperAdmin && !u.isDeveloper && hasAcceptedCurrentAgreement(u)
        ).length;
        const nonAdminUsersCount = allRegisteredUsers.filter(
          u => !u.isSuperAdmin && !u.isDeveloper
        ).length;

        return (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
              <div>
                <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-[#84E000]" />
                  <span>Platform Tutor Commissions ({TUTOR_PLATFORM_COMMISSION_PERCENT}% System Revenue Ledger)</span>
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Automatic {TUTOR_PLATFORM_COMMISSION_PERCENT}% system commission on every tutor booking · {TUTOR_NET_PAYOUT_PERCENT}% net payable to tutors
                </p>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-300 font-mono tabular-nums">
                <Scale className="w-3.5 h-3.5 text-[#84E000]" />
                <span>
                  User Agreement {USER_AGREEMENT_VERSION}: <strong className="text-white">{consentedUsersCount}/{nonAdminUsersCount}</strong> Signed
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                <span className="text-[11px] text-slate-400 block">Gross Bookings Volume</span>
                <div className="text-lg font-black font-mono tabular-nums text-white mt-0.5">
                  <NairaText amount={grossVolume} />
                </div>
                <span className="text-[10px] text-slate-500 tabular-nums">
                  {activeOrCompletedBookings.length} active/completed session(s)
                </span>
              </div>

              <div className="bg-slate-950/80 border border-emerald-500/35 rounded-xl p-3">
                <span className="text-[11px] text-emerald-300 block">
                  {TUTOR_PLATFORM_COMMISSION_PERCENT}% System Share (Earned)
                </span>
                <div className="text-lg font-black font-mono tabular-nums text-[#84E000] mt-0.5">
                  <NairaText amount={systemFeeEarned} />
                </div>
                <span className="text-[10px] text-slate-500 tabular-nums">
                  {completedList.length} released session(s)
                </span>
              </div>

              <div className="bg-slate-950/80 border border-amber-500/35 rounded-xl p-3">
                <span className="text-[11px] text-amber-300 block">
                  {TUTOR_PLATFORM_COMMISSION_PERCENT}% System Share (Escrow)
                </span>
                <div className="text-lg font-black font-mono tabular-nums text-amber-300 mt-0.5">
                  <NairaText amount={systemFeeEscrow} />
                </div>
                <span className="text-[10px] text-slate-500 tabular-nums">
                  {escrowList.length} pending/confirmed
                </span>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                <span className="text-[11px] text-slate-400 block">
                  {TUTOR_NET_PAYOUT_PERCENT}% Tutor Net Share
                </span>
                <div className="text-lg font-black font-mono tabular-nums text-sky-300 mt-0.5">
                  <NairaText amount={tutorNetTotal} />
                </div>
                <span className="text-[10px] text-slate-500">
                  Allocated to verified tutors
                </span>
              </div>
            </div>

            {activeOrCompletedBookings.length > 0 ? (
              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-950/90 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-2 px-3 font-semibold">Tutor &amp; Subject</th>
                      <th className="py-2 px-3 font-semibold">Student</th>
                      <th className="py-2 px-3 font-semibold text-right">Gross (100%)</th>
                      <th className="py-2 px-3 font-semibold text-right">System (20%)</th>
                      <th className="py-2 px-3 font-semibold text-right">Tutor Net (80%)</th>
                      <th className="py-2 px-3 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {activeOrCompletedBookings.slice(0, 8).map((b) => {
                      const split = getBookingFinancialSplit(b);
                      return (
                        <tr key={b.id} className="bg-slate-900/40">
                          <td className="py-2 px-3">
                            <span className="font-semibold text-white block">{b.tutorName}</span>
                            <span className="text-[10px] text-slate-400">{b.subject}</span>
                          </td>
                          <td className="py-2 px-3 text-slate-300">{b.studentName}</td>
                          <td className="py-2 px-3 text-right font-mono tabular-nums text-white">
                            <NairaText amount={split.grossAmountNaira} />
                          </td>
                          <td className="py-2 px-3 text-right font-mono tabular-nums font-bold text-[#84E000]">
                            <NairaText amount={split.platformFeeNaira} />
                          </td>
                          <td className="py-2 px-3 text-right font-mono tabular-nums text-sky-300">
                            <NairaText amount={split.tutorNetNaira} />
                          </td>
                          <td className="py-2 px-3 text-right capitalize text-slate-300">
                            {b.status.replace('_', ' ')}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                No tutor bookings recorded yet. Every new booking automatically logs its {TUTOR_PLATFORM_COMMISSION_PERCENT}% system commission and {TUTOR_NET_PAYOUT_PERCENT}% net tutor share here.
              </p>
            )}
          </div>
        );
      })()}

      {/* Live Integrations & Secrets Readiness Diagnostic */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
        {(() => {
          const readinessItems = integrationsStatus
            ? [
                {
                  label: 'SC AI Study Coach',
                  secretName: 'GEMINI_API_KEY',
                  where: 'Render Env Vars & AI Studio Secrets',
                  ready: integrationsStatus.geminiConfigured
                },
                {
                  label: 'Paystack Live Gateway',
                  secretName: 'VITE_PAYSTACK_PUBLIC_KEY + PAYSTACK_SECRET_KEY',
                  where: 'Render Env Vars / GitHub Secrets (Public Key)',
                  ready: integrationsStatus.paystackLiveReady
                },
                {
                  label: 'Email Delivery (Gmail / Resend)',
                  secretName: integrationsStatus.emailSandboxOnly
                    ? 'Resend Sandbox Only (Add GMAIL_APP_PASSWORD on Render)'
                    : 'GMAIL_APP_PASSWORD or verified RESEND_API_KEY',
                  where: 'Render Env Vars & AI Studio Secrets (Firebase link handles fallback)',
                  ready: Boolean(integrationsStatus.directEmailDeliveryReady ?? integrationsStatus.emailReady),
                  statusLabel: integrationsStatus.emailSandboxOnly ? 'Sandbox Only' : undefined
                },
                {
                  label: 'Google Maps Tutor Locator',
                  secretName: 'VITE_GOOGLE_MAPS_API_KEY',
                  where: 'Render Env Vars & GitHub Secrets',
                  ready: integrationsStatus.googleMapsConfigured
                },
                {
                  label: 'GitHub Repo Sync & APK Trigger',
                  secretName: 'GITHUB_TOKEN',
                  where: 'Render Env Vars & AI Studio Secrets',
                  ready: integrationsStatus.githubTokenConfigured
                },
                {
                  label: 'Admin Password Fallback',
                  secretName: 'SUPER_ADMIN_PASSWORD',
                  where: 'Render Env Vars & AI Studio (or Firebase Auth)',
                  ready: integrationsStatus.superAdminPasswordConfigured
                }
              ]
            : [];
          const readyCount = readinessItems.filter((item) => item.ready).length;
          const allReady = readinessItems.length > 0 && readyCount === readinessItems.length;
          const runtimeMeta =
            typeof window !== 'undefined' ? (window as any).__SC_RUNTIME_META__ : null;
          const activeOrigin = String(
            integrationsStatus?.backendUrl || runtimeMeta?.apiOrigin || ''
          );
          const isPreviewCookieOrigin = activeOrigin.includes('ais-pre-');

          return (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-800 pb-3">
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center flex-wrap gap-2">
                    <h2 className="text-sm font-bold text-white tracking-tight">
                      Live Services &amp; Secrets Readiness
                    </h2>
                    {integrationsStatus && (
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border text-[11px] font-bold tabular-nums ${
                          allReady
                            ? 'bg-emerald-500/15 border-emerald-500/40 text-[#84E000]'
                            : 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                        }`}
                      >
                        {allReady ? (
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        )}
                        <span>
                          {readyCount} / {readinessItems.length} Ready
                        </span>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Private keys stay strictly on your server host (AI Studio &amp; Render Env Vars). Public client keys &amp; your Render URL go into GitHub Repo Secrets for standalone APKs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void fetchIntegrationsStatus()}
                  disabled={isCheckingIntegrations}
                  className="px-3.5 py-2 min-h-[44px] rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap shrink-0 self-start sm:self-auto"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isCheckingIntegrations ? 'animate-spin' : ''}`} />
                  <span>{isCheckingIntegrations ? 'Checking...' : 'Check Integrations'}</span>
                </button>
              </div>

              {integrationsError && (
                <div className="p-2.5 rounded-xl border border-rose-700/70 bg-rose-950/50 text-rose-200 text-xs flex items-center justify-between gap-2">
                  <div className="flex items-start gap-2 min-w-0">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span className="break-words">{integrationsError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => void fetchIntegrationsStatus()}
                    disabled={isCheckingIntegrations}
                    className="px-2.5 py-1.5 min-h-[36px] rounded-lg bg-rose-900/60 hover:bg-rose-800/70 border border-rose-700 text-rose-100 text-[11px] font-semibold whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
                  >
                    Retry
                  </button>
                </div>
              )}

              {integrationsStatus && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
                    {readinessItems.map((item: any) => (
                      <div
                        key={item.label}
                        className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col justify-between gap-1.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-white truncate">{item.label}</span>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] font-bold shrink-0 ${
                              item.ready
                                ? 'bg-emerald-500/15 border-emerald-500/35 text-[#84E000]'
                                : 'bg-amber-500/15 border-amber-500/35 text-amber-300'
                            }`}
                          >
                            {item.ready ? (
                              <CheckCircle2 className="w-3 h-3 shrink-0" />
                            ) : (
                              <AlertTriangle className="w-3 h-3 shrink-0" />
                            )}
                            <span>{item.ready ? 'Ready' : (item.statusLabel || 'Needs Secret')}</span>
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-slate-300 truncate">
                          {item.secretName}
                        </div>
                        <div className="text-[10px] text-slate-500">{item.where}</div>
                      </div>
                    ))}
                  </div>

                  {/* Live Email Delivery Test Console */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white">Live Email Delivery Test</div>
                        <p className="text-[11px] text-slate-400">
                          {integrationsStatus.emailSandboxOnly
                            ? 'Resend is in sandbox mode (owner-only). External sign-ups automatically fall back to Firebase verification until GMAIL_APP_PASSWORD or a verified Resend domain is active on Render.'
                            : integrationsStatus.directEmailDeliveryReady
                            ? 'Direct email delivery is active. Test sending a diagnostic email to any external address.'
                            : 'No direct SMTP/Resend sender active. Sign-ups automatically fall back to Firebase email verification.'}
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleSendAdminTestEmail} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="email"
                        value={testEmailRecipient}
                        onChange={(e) => setTestEmailRecipient(e.target.value)}
                        placeholder="Enter test recipient email (e.g. tutor@gmail.com)"
                        className="flex-1 min-h-[44px] bg-slate-900 border border-slate-700 focus:border-[#84E000] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={isSendingTestEmail}
                        className="min-h-[44px] px-4 py-2 rounded-xl bg-[#84E000] hover:bg-[#75c900] disabled:opacity-60 text-[#0A1322] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isSendingTestEmail ? 'animate-spin' : ''}`} />
                        <span>{isSendingTestEmail ? 'Sending Test...' : 'Send Test Email'}</span>
                      </button>
                    </form>

                    {testEmailResult && (
                      <div
                        className={`p-2.5 rounded-xl border text-xs flex items-start gap-2 ${
                          testEmailResult.success
                            ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
                            : 'bg-amber-950/60 border-amber-500/40 text-amber-200'
                        }`}
                      >
                        {testEmailResult.success ? (
                          <CheckCircle2 className="w-4 h-4 text-[#84E000] shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        )}
                        <div className="min-w-0 space-y-0.5">
                          <div className="font-semibold text-white">
                            {testEmailResult.success ? 'Delivery Passed' : testEmailResult.sandboxRestricted ? 'Resend Sandbox Active' : 'Delivery Check Failed'}
                            {testEmailResult.testedAt && (
                              <span className="ml-2 text-[10px] font-mono font-normal text-slate-400 tabular-nums">
                                {new Date(testEmailResult.testedAt).toLocaleTimeString()}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] leading-relaxed break-words">{testEmailResult.message}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Active Backend Origin + Render Free Tier Setup Accordion */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
                      <Server className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>
                        {integrationsStatus?.renderHosted
                          ? 'Hosted Publicly on Render Free Tier'
                          : 'AI Studio Dev Preview Backend (Requires Public Render Host for APK)'}
                      </span>
                    </div>
                    {activeOrigin && (
                      <div className="text-[11px] font-mono text-slate-400 truncate">
                        Active Backend URL:{' '}
                        <span className={isPreviewCookieOrigin ? 'text-amber-300' : 'text-emerald-300'}>
                          {activeOrigin}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowRenderGuide((prev) => !prev)}
                    className="px-3 py-2 min-h-[44px] rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/35 text-sky-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-auto"
                  >
                    <Globe className="w-3.5 h-3.5 shrink-0" />
                    <span>{showRenderGuide ? 'Hide Cloud Host Setup' : 'Netlify + Render & APK Setup'}</span>
                    {showRenderGuide ? (
                      <ChevronUp className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                    )}
                  </button>
                </div>

                {isPreviewCookieOrigin && !integrationsStatus?.renderHosted && (
                  <p className="text-[11px] text-amber-300/90 leading-relaxed border-t border-slate-800/80 pt-2">
                    AI Studio preview URLs redirect external requests to a login check. Host the backend free on <strong className="text-amber-200">Render</strong> (and optionally host the static frontend on <strong className="text-amber-200">Netlify</strong> to save bandwidth), then set <code className="font-mono text-amber-200">VITE_API_ORIGIN</code> to your <code className="font-mono text-amber-200">https://...onrender.com</code> URL in Netlify &amp; GitHub Secrets.
                  </p>
                )}

                {showRenderGuide && (
                  <div className="border-t border-slate-800 pt-3 space-y-3 text-xs text-slate-300">
                    <ol className="space-y-2 text-[11px] text-slate-300 leading-relaxed list-decimal list-inside">
                      <li>
                        Click <strong className="text-white">Sync to GitHub (main)</strong> below so <code className="font-mono text-sky-300">netlify.toml</code>, <code className="font-mono text-sky-300">render.yaml</code>, and your live <code className="font-mono text-emerald-300">https://student-companion-api-b373.onrender.com</code> default backend origin are synced to GitHub—Netlify will build automatically on push.
                      </li>
                      <li>
                        <strong className="text-white">Netlify &amp; GitHub Variables:</strong> In your connected Netlify project (<code className="font-mono text-slate-200">Site configuration → Environment variables</code>) and GitHub (<code className="font-mono text-slate-200">Settings → Secrets and variables → Actions</code>), add <code className="font-mono text-slate-200">VITE_API_ORIGIN</code>, <code className="font-mono text-slate-200">VITE_GOOGLE_MAPS_API_KEY</code>, and <code className="font-mono text-slate-200">VITE_PAYSTACK_PUBLIC_KEY</code>.
                      </li>
                      <li>
                        <strong className="text-white">Firebase &amp; Build APK:</strong> Ensure <code className="font-mono text-emerald-300">student-companion-api-b373.onrender.com</code> and your <code className="font-mono text-emerald-300">*.netlify.app</code> domain are added in <strong className="text-white">Firebase Console → Authentication → Settings → Authorized domains</strong>, then click <strong className="text-white">Build APK on GitHub</strong>.
                      </li>
                      <li>
                        <strong className="text-white">Eliminate 50s Idle Sleep (Free 24/7 Uptime Ping):</strong> Add an HTTP monitor on <strong className="text-white">uptimerobot.com</strong> or <strong className="text-white">cron-job.org</strong> targeting the health URL below every <strong className="text-white">5–10 minutes</strong> (uses &lt;1 MB bandwidth and stays within Render&apos;s 750 free hours/month).
                      </li>
                    </ol>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        {
                          key: 'VITE_API_ORIGIN',
                          desc: 'https://student-companion-api-b373.onrender.com'
                        },
                        {
                          key: 'VITE_GOOGLE_MAPS_API_KEY',
                          desc: 'Public Google Maps browser key'
                        },
                        {
                          key: 'VITE_PAYSTACK_PUBLIC_KEY',
                          desc: 'Live pk_live_... Paystack public key'
                        },
                        {
                          key: 'https://student-companion-api-b373.onrender.com',
                          desc: 'Copy exact Render Backend URL'
                        }
                      ].map((secretItem) => (
                        <button
                          key={secretItem.key}
                          type="button"
                          onClick={() => handleCopySecretKey(secretItem.key)}
                          className="min-h-[44px] bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-left flex items-center justify-between gap-2 transition-colors cursor-pointer"
                        >
                          <div className="min-w-0">
                            <div className="font-mono text-[11px] font-bold text-white truncate">
                              {secretItem.key}
                            </div>
                            <div className="text-[10px] text-slate-400 truncate">
                              {secretItem.desc}
                            </div>
                          </div>
                          {copiedSecretKey === secretItem.key ? (
                            <Check className="w-4 h-4 text-[#84E000] shrink-0" />
                          ) : (
                            <Copy className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>

                    {(() => {
                      const healthPingTarget =
                        activeOrigin && !isPreviewCookieOrigin
                          ? `${activeOrigin.replace(/\/+$/, '')}/api/health`
                          : 'https://student-companion-api-b373.onrender.com/api/health';
                      return (
                        <div className="border-t border-slate-800 pt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="min-w-0">
                            <div className="text-[11px] font-semibold text-sky-200">
                              Health Check Ping Endpoint (GET every 5–10 min)
                            </div>
                            <div className="text-[11px] font-mono text-slate-400 truncate">
                              {healthPingTarget}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopySecretKey(healthPingTarget)}
                            className="min-h-[44px] px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-[11px] font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-auto"
                          >
                            {copiedSecretKey === healthPingTarget ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-[#84E000] shrink-0" />
                                <span className="text-[#84E000]">Copied Ping URL</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                                <span>Copy Health URL</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </>
          );
        })()}
      </div>

      {/* GitHub Repository Sync Panel */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#0D1527] border border-slate-700 flex items-center justify-center text-[#84E000] shrink-0">
              <GitBranch className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm font-bold text-white tracking-tight">GitHub Repository Sync</h2>
                <span className="text-[11px] font-mono text-slate-300">
                  {gitStatus?.repo || 'Inventor-Mart/Student-Companion-Ng'} · {gitStatus?.branch || 'main'}
                </span>
              </div>
              <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-[11px] text-slate-400 mt-1 font-mono tabular-nums">
                <span>
                  Local:{' '}
                  {gitStatus
                    ? gitStatus.gitInitialized
                      ? gitStatus.latestCommit
                      : 'Auto-init ready'
                    : 'Checking...'}
                </span>
                {gitStatus?.remoteLatestCommit && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Remote main: {gitStatus.remoteLatestCommit}</span>
                  </>
                )}
                {gitStatus && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className={gitStatus.aheadCount > 0 ? 'text-amber-300 font-semibold' : 'text-slate-400'}>
                      {gitStatus.aheadCount} ahead
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className={gitStatus.behindCount > 0 ? 'text-sky-300 font-semibold' : 'text-slate-400'}>
                      {gitStatus.behindCount} behind
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className={gitStatus.hasUncommitted ? 'text-amber-300 font-semibold' : 'text-emerald-400'}>
                      {gitStatus.hasUncommitted ? `${gitStatus.uncommittedCount} modified` : 'Working tree clean'}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2 shrink-0">
            <button
              type="button"
              onClick={() => void fetchGitStatus(true)}
              disabled={isLoadingGitStatus || isCheckingUpdates || isPullingGit || isPushingGit}
              className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCheckingUpdates || isLoadingGitStatus ? 'animate-spin' : ''}`} />
              <span>{isCheckingUpdates ? 'Checking...' : 'Check Updates'}</span>
            </button>
            <button
              type="button"
              onClick={() => void handlePullFromGithub()}
              disabled={isPullingGit || isPushingGit || isCheckingUpdates}
              className="px-3.5 py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/40 text-sky-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
            >
              {isPullingGit ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>
                {isPullingGit
                  ? 'Pulling...'
                  : gitStatus && gitStatus.behindCount > 0
                  ? `Pull from GitHub (${gitStatus.behindCount})`
                  : 'Pull from GitHub'}
              </span>
            </button>
            <button
              type="button"
              onClick={handleSyncToGithub}
              disabled={
                isPushingGit ||
                isPullingGit ||
                (gitStatus !== null && !gitStatus.canPush && gitStatus.tokenStatus !== 'network_error')
              }
              className="px-4 py-2 rounded-xl bg-[#84E000] hover:bg-[#75c900] text-slate-950 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
            >
              {isPushingGit ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <UploadCloud className="w-3.5 h-3.5" />
              )}
              <span>{isPushingGit ? 'Syncing...' : 'Sync to GitHub (main)'}</span>
            </button>
          </div>
        </div>

        {/* Live Token & Permission Diagnostic Strip */}
        {gitStatus && (
          <div
            className={`p-2.5 rounded-xl border text-xs flex items-start gap-2 ${
              gitStatus.tokenStatus === 'valid'
                ? 'bg-emerald-950/35 border-emerald-800/60 text-emerald-200'
                : gitStatus.tokenStatus === 'missing'
                ? 'bg-amber-950/40 border-amber-700/60 text-amber-200'
                : 'bg-rose-950/40 border-rose-800/60 text-rose-200'
            }`}
          >
            {gitStatus.tokenStatus === 'valid' ? (
              <CheckCircle2 className="w-4 h-4 text-[#84E000] shrink-0 mt-0.5" />
            ) : gitStatus.tokenStatus === 'missing' ? (
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-0.5 min-w-0">
              <div className="font-semibold">
                {gitStatus.tokenStatus === 'valid'
                  ? `Secrets Token Active${gitStatus.githubUser ? ` (@${gitStatus.githubUser})` : ''}`
                  : gitStatus.tokenStatus === 'missing'
                  ? 'GITHUB_TOKEN Not Found in Server Secrets'
                  : 'GitHub Token Verification Issue'}
              </div>
              <p className="text-[11px] opacity-90 leading-relaxed">{gitStatus.tokenMessage}</p>
            </div>
          </div>
        )}

        {/* Live GitHub Incoming Commits Preview */}
        {gitStatus && gitStatus.behindCount > 0 && gitStatus.incomingCommits.length > 0 && (
          <div className="p-3 rounded-xl bg-sky-950/35 border border-sky-800/60 space-y-2">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-bold text-sky-200">
                Incoming Commits on GitHub main ({gitStatus.behindCount})
              </span>
              <span className="text-[11px] text-sky-300/80">
                Pull before pushing or click Sync to auto-merge
              </span>
            </div>
            <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
              {gitStatus.incomingCommits.map((commit) => (
                <div
                  key={commit.sha}
                  className="flex items-center justify-between gap-2 text-[11px] font-mono bg-slate-950/60 px-2.5 py-1.5 rounded-lg border border-slate-800/80"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sky-400 shrink-0">{commit.sha}</span>
                    <span className="text-slate-200 font-sans truncate">{commit.subject}</span>
                  </div>
                  <span className="text-slate-400 shrink-0 text-[10px]">
                    {commit.author} · {commit.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live Git Operation Error Strip (from status fetch) */}
        {gitStatus?.lastError && !gitSyncFeedback && (
          <div className="p-2.5 rounded-xl border border-rose-700/70 bg-rose-950/50 text-rose-200 text-xs flex items-start gap-2">
            <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span className="break-words">{gitStatus.lastError}</span>
          </div>
        )}

        {/* Optional Commit Message Field */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label htmlFor="sc-git-commit-msg" className="text-[11px] font-semibold text-slate-400 whitespace-nowrap shrink-0">
            Commit Message
          </label>
          <input
            id="sc-git-commit-msg"
            type="text"
            value={gitCommitMessage}
            onChange={(e) => setGitCommitMessage(e.target.value)}
            maxLength={200}
            placeholder="Optional commit message (defaults to timestamped Student Companion sync note)"
            className="flex-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>

        {gitSyncFeedback && (
          <div
            className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
              gitSyncFeedback.type === 'success'
                ? 'bg-emerald-950/70 border-emerald-700 text-emerald-200'
                : 'bg-rose-950/70 border-rose-700 text-rose-200'
            }`}
          >
            {gitSyncFeedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-[#84E000] shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            )}
            <span className="break-words">{gitSyncFeedback.message}</span>
          </div>
        )}
      </div>

      {/* GitHub Cloud Android APK Builder & Store Assets Hub (No Android Studio Needed) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#0D1527] border border-slate-700 flex items-center justify-center text-amber-400 shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm font-bold text-white tracking-tight">GitHub Cloud Offline APK Builder</h2>
                <span className="text-[11px] font-mono text-emerald-400">
                  com.studentcompanion.app · minSdk 23 (Android 6.0+) · Offline Standalone
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Bundles the full app inside APK assets and compiles a signed offline <code className="text-slate-300">.apk</code> via GitHub Actions — works without internet.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={() => void fetchApkCloudStatus()}
              disabled={isCheckingApkStatus}
              className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCheckingApkStatus ? 'animate-spin' : ''}`} />
              <span>Check Build</span>
            </button>

            {apkCloudStatus?.apkReady && apkCloudStatus.apkUrl && (
              <a
                href={apkCloudStatus.apkUrl}
                className="px-4 py-2 rounded-xl bg-[#84E000] hover:bg-[#75c900] text-slate-950 text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm whitespace-nowrap shrink-0"
              >
                <span>
                  Download Signed APK ({(apkCloudStatus.apkSizeBytes / (1024 * 1024)).toFixed(1)} MB)
                </span>
              </a>
            )}

            <button
              type="button"
              onClick={() => void handleTriggerGithubApkBuild()}
              disabled={isTriggeringApkBuild}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm disabled:opacity-50 whitespace-nowrap shrink-0"
            >
              <UploadCloud className={`w-3.5 h-3.5 ${isTriggeringApkBuild ? 'animate-pulse' : ''}`} />
              <span>{isTriggeringApkBuild ? 'Starting Build...' : 'Build APK on GitHub'}</span>
            </button>

            <a
              href="/api/download/offline-pwa-bundle"
              className="px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm whitespace-nowrap shrink-0"
            >
              <span>Offline PWA (.zip)</span>
            </a>
            <a
              href="/pwa-512x512.png"
              download="student_companion_android_512x512.png"
              className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>512px PNG</span>
            </a>
            <a
              href="/ios-icon-1024x1024.png"
              download="student_companion_ios_1024x1024.png"
              className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>1024px PNG</span>
            </a>
          </div>
        </div>

        {apkStatusError && (
          <div className="p-2.5 rounded-xl border border-rose-700/70 bg-rose-950/50 text-rose-200 text-xs flex items-center justify-between gap-2">
            <div className="flex items-start gap-2 min-w-0">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span className="break-words">{apkStatusError}</span>
            </div>
            <button
              type="button"
              onClick={() => void fetchApkCloudStatus()}
              disabled={isCheckingApkStatus}
              className="px-2.5 py-1.5 min-h-[36px] rounded-lg bg-rose-900/60 hover:bg-rose-800/70 border border-rose-700 text-rose-100 text-[11px] font-semibold whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
            >
              Retry
            </button>
          </div>
        )}

        {/* Live GitHub APK Build & Release Status Strip */}
        {apkCloudStatus && (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col gap-2 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                {apkCloudStatus.apkReady ? (
                  <CheckCircle2 className="w-4 h-4 text-[#84E000] shrink-0" />
                ) : apkCloudStatus.latestRun?.status === 'in_progress' || apkCloudStatus.latestRun?.status === 'queued' ? (
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 animate-spin" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className="text-slate-200 truncate font-mono tabular-nums">
                  {apkCloudStatus.apkReady
                    ? [
                        `v${apkCloudStatus.versionName}`,
                        apkCloudStatus.versionCode ? `code ${apkCloudStatus.versionCode}` : null,
                        `${(apkCloudStatus.apkSizeBytes / (1024 * 1024)).toFixed(2)} MB`,
                        apkCloudStatus.releaseTag ? `tag ${apkCloudStatus.releaseTag}` : null,
                        apkCloudStatus.commitSha ? `sha ${apkCloudStatus.commitSha}` : null,
                        apkCloudStatus.signingMode === 'persistent'
                          ? 'Key: Persistent'
                          : apkCloudStatus.signingMode === 'ephemeral'
                          ? 'Key: Ephemeral'
                          : null,
                      ]
                        .filter(Boolean)
                        .join(' · ')
                    : apkCloudStatus.latestRun
                    ? `Latest GitHub Actions run${apkCloudStatus.latestRun.runNumber ? ` #${apkCloudStatus.latestRun.runNumber}` : ''}: ${apkCloudStatus.latestRun.status}${apkCloudStatus.latestRun.conclusion ? ` (${apkCloudStatus.latestRun.conclusion})` : ''}`
                    : apkCloudStatus.workflowOnRemote
                    ? 'Workflow active on GitHub — click "Build APK on GitHub" to compile your signed offline Android 6+ APK.'
                    : 'Click "Sync to GitHub (main)" above once to push the Android cloud build workflow, then click "Build APK on GitHub".'}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0 text-[11px]">
                {apkCloudStatus.actionsPageUrl && (
                  <a
                    href={apkCloudStatus.latestRun?.htmlUrl || apkCloudStatus.actionsPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 whitespace-nowrap"
                  >
                    <span>GitHub Actions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {(apkCloudStatus.releasePageUrl || apkCloudStatus.releasesPageUrl) && (
                  <a
                    href={apkCloudStatus.releasePageUrl || apkCloudStatus.releasesPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 whitespace-nowrap"
                  >
                    <span>{apkCloudStatus.releaseTag ? `Release (${apkCloudStatus.releaseTag})` : 'GitHub Releases'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {apkCloudStatus.apkReady && apkCloudStatus.signingMode === 'ephemeral' && (
              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-amber-300 flex items-start gap-2 leading-snug">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Built with an ephemeral test keystore. Add <code className="text-amber-200 font-mono">ANDROID_KEYSTORE_BASE64</code>,{' '}
                  <code className="text-amber-200 font-mono">ANDROID_KEYSTORE_PASSWORD</code>, <code className="text-amber-200 font-mono">ANDROID_KEY_ALIAS</code>, and{' '}
                  <code className="text-amber-200 font-mono">ANDROID_KEY_PASSWORD</code> to GitHub Repository Secrets so devices can upgrade in-place without uninstalling first.
                </span>
              </div>
            )}
          </div>
        )}

        {apkBuildFeedback && (
          <div
            className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
              apkBuildFeedback.type === 'success'
                ? 'bg-emerald-950/70 border-emerald-700 text-emerald-200'
                : 'bg-rose-950/70 border-rose-700 text-rose-200'
            }`}
          >
            {apkBuildFeedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-[#84E000] shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{apkBuildFeedback.message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center text-[10px] font-mono">1</span>
              <span>Push Workflow to GitHub</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Click <strong className="text-slate-200">Sync to GitHub (main)</strong> above to upload the latest web bundle &amp; Android offline wrapper to GitHub.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center text-[10px] font-mono">2</span>
              <span>GitHub Bundles &amp; Compiles APK</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              GitHub Actions builds the web bundle directly into APK assets and runs JDK 17 + Gradle to sign a complete offline <code className="text-emerald-400 font-mono">.apk</code> (<code className="text-emerald-400 font-mono">minSdk 23</code>).
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center text-[10px] font-mono">3</span>
              <span>Download Signed Offline APK</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Once finished (~2–3 min), tap <strong className="text-slate-200">Check Build</strong> and click <strong className="text-slate-200">Download Signed APK</strong> right here.
            </p>
          </div>
        </div>
      </div>

      {/* User Directory Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <Users className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white tracking-tight">
              User Directory &amp; Account Inspector
            </h2>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
              {filteredUsers.length} Accounts
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={isSyncingDirectory}
              onClick={async () => {
                setDirectoryNotice(null);
                const res = await syncUserDirectoryFromCloud({
                  silent: false,
                  adminEmailOverride: authorizedAdminEmail
                });
                setDirectoryNotice({
                  type: res.success ? 'success' : 'error',
                  text: res.success
                    ? res.message || `Directory synced across backend, Firestore, and legacy registries (${res.totalUsers} total account(s)).`
                    : res.error || 'Directory sync completed with partial restrictions.',
                  needsGoogleAuth: Boolean(res.needsGoogleAuth && !res.success)
                });
              }}
              className="px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/70 text-emerald-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
              title="Fetch all signups from shared backend, Firestore users, and recover legacy link-code, school, and partner records"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#84E000] ${isSyncingDirectory ? 'animate-spin' : ''}`} />
              <span>{isSyncingDirectory ? 'Syncing Cloud...' : 'Sync & Recover Directory'}</span>
            </button>

            <button
              type="button"
              disabled={isPurgingSimSubs}
              onClick={async () => {
                setIsPurgingSimSubs(true);
                setDirectoryNotice(null);
                const res = await purgeSimulatedSubscriptions(authorizedAdminEmail);
                setDirectoryNotice({
                  type: res.success ? 'success' : 'error',
                  text: res.message
                });
                setIsPurgingSimSubs(false);
              }}
              className="px-3 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-700/70 text-amber-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
              title="Reset any Prepare For Exam, SC AI Coach, or Tier unlocks created by test simulation without verified live payments"
            >
              {isPurgingSimSubs ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>{isPurgingSimSubs ? 'Clearing...' : 'Purge Simulated Subscriptions'}</span>
            </button>

            <button
              type="button"
              disabled={isPurgingTestAccounts}
              onClick={async () => {
                setIsPurgingTestAccounts(true);
                setDirectoryNotice(null);
                const res = await purgeAllTestAccountsAndCredits(authorizedAdminEmail);
                setDirectoryNotice({
                  type: res.success ? 'success' : 'error',
                  text: res.message
                });
                setIsPurgingTestAccounts(false);
              }}
              className="px-3 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-700/70 text-rose-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
              title="Purge all sample/test personas, wallets & escrow credits from local & server stores while preserving Super Admins"
            >
              {isPurgingTestAccounts ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              )}
              <span>{isPurgingTestAccounts ? 'Purging...' : 'Purge Test Personas & Credits'}</span>
            </button>

            {/* Search Input */}
            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search user, email, code..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Cloud Directory Sync Summary Bar */}
        {directorySyncStats && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-300">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono tabular-nums">
              <span className="text-emerald-400 font-semibold">Cloud Synced</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Total {directorySyncStats.total}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Backend {directorySyncStats.backendCount}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Firestore {directorySyncStats.firestoreCount}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Recovered {directorySyncStats.recoveredCount}</span>
              {directorySyncStats.backfilledToFirestoreCount > 0 && (
                <>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-sky-400">Backfilled +{directorySyncStats.backfilledToFirestoreCount}</span>
                </>
              )}
            </div>
            {!directorySyncStats.firestoreAdminReady && (
              <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 sm:pt-0">
                <span className="text-[11px] text-amber-300 leading-snug">
                  Sign in with Google as Super Admin to query and backfill Firestore users directly.
                </span>
                <button
                  type="button"
                  disabled={isUnlockingCloudAuth || isSyncingDirectory}
                  onClick={() => void handleUnlockCloudSyncWithGoogle()}
                  className="px-3 py-1.5 min-h-[36px] rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap shrink-0 shadow-sm"
                >
                  {isUnlockingCloudAuth ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-700" />
                  ) : (
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  )}
                  <span>{isUnlockingCloudAuth ? 'Unlocking...' : 'Continue with Google'}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Role Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Users', count: allRegisteredUsers.length },
              { id: 'student', label: 'Students', count: studentCount },
              { id: 'parent', label: 'Parents', count: parentCount },
              { id: 'tutor', label: 'Tutors', count: tutorCount },
              { id: 'growth_partner', label: 'Partners', count: growthPartnerCount },
              { id: 'admin', label: 'Admins', count: adminCount }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setRoleFilter(f.id as any)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  roleFilter === f.id
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{f.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono tabular-nums ${roleFilter === f.id ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                  {f.count}
                </span>
              </button>
            ))}
          </div>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Account Statuses</option>
            <option value="active">Active Accounts</option>
            {conflictUsersCount > 0 && (
              <option value="conflicts">Multi-Role Conflicts ({conflictUsersCount})</option>
            )}
            <option value="locked">Timed Locked</option>
            <option value="suspended">Suspended Accounts</option>
            <option value="deleted">Soft-Deleted / Banned</option>
            <option value="wallet_frozen">Wallet Frozen</option>
          </select>
        </div>

        {conflictUsersCount > 0 && (
          <div className="px-3.5 py-2.5 rounded-xl bg-amber-950/50 border border-amber-700/70 text-xs text-amber-200 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong className="text-white">{conflictUsersCount}</strong> legacy account{conflictUsersCount === 1 ? '' : 's'} registered under multiple roles on one email. Resolve each to a single role or delete &amp; release the email.
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setRoleFilter('all');
                setStatusFilter(statusFilter === 'conflicts' ? 'all' : 'conflicts');
              }}
              className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] cursor-pointer shrink-0 transition-colors"
            >
              {statusFilter === 'conflicts' ? 'Show All Users' : `Filter Conflicts (${conflictUsersCount})`}
            </button>
          </div>
        )}

        {directoryNotice && (
          <div
            className={`px-3.5 py-2.5 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
              directoryNotice.type === 'success'
                ? 'bg-emerald-950/70 border-emerald-700 text-emerald-200'
                : 'bg-rose-950/70 border-rose-700 text-rose-200'
            }`}
          >
            <div className="flex items-start sm:items-center gap-2 min-w-0">
              {directoryNotice.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-[#84E000] shrink-0 mt-0.5 sm:mt-0" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5 sm:mt-0" />
              )}
              <span className="break-words">{directoryNotice.text}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              {directoryNotice.type === 'error' &&
                (directoryNotice.needsGoogleAuth ||
                  directoryNotice.text.includes('403') ||
                  directoryNotice.text.toLowerCase().includes('google')) && (
                  <button
                    type="button"
                    disabled={isUnlockingCloudAuth || isSyncingDirectory}
                    onClick={() => void handleUnlockCloudSyncWithGoogle()}
                    className="px-3 py-1.5 min-h-[36px] rounded-lg bg-white hover:bg-slate-100 text-slate-950 text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap shrink-0"
                  >
                    {isUnlockingCloudAuth ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-700" />
                    ) : (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    )}
                    <span>{isUnlockingCloudAuth ? 'Unlocking...' : 'Continue with Google'}</span>
                  </button>
                )}
              <button
                type="button"
                onClick={() => setDirectoryNotice(null)}
                className="text-slate-400 hover:text-white text-[11px] cursor-pointer px-1.5 py-1"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {filteredUsers.map(u => {
            const isStudent = u.role === 'student';
            const isParent = u.role === 'parent';
            const isTutor = u.role === 'tutor';
            const isAdmin = u.role === 'admin';
            const effStatus = getEffectiveStatus(u);

            return (
              <div
                key={u.id}
                className={`bg-slate-950 border rounded-2xl p-3.5 space-y-3 transition-all shadow-sm flex flex-col justify-between ${
                  effStatus === 'deleted'
                    ? 'border-slate-800/70 opacity-75'
                    : effStatus === 'suspended'
                    ? 'border-rose-800/80'
                    : effStatus === 'locked'
                    ? 'border-amber-700/80'
                    : 'border-slate-800/90 hover:border-slate-700/80'
                }`}
              >
                <div className="space-y-2">
                  {/* Top user row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <PersonaAvatar
                        name={u.fullName}
                        src={u.avatarUrl || u.studentData?.uniformPhotoUrl}
                        alt={u.fullName}
                        className={`w-9 h-9 rounded-xl ${
                          isStudent ? 'ring-1 ring-emerald-500/50' :
                          isParent ? 'ring-1 ring-[#FF5B00]/50' :
                          isTutor ? 'ring-1 ring-sky-500/50' :
                          'ring-1 ring-purple-500/50'
                        }`}
                        textClassName="text-xs"
                      />
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="text-xs font-bold text-white">{u.fullName}</h3>
                          {u.isSuperAdmin && (
                            <span className="text-[9px] font-black bg-amber-950 text-amber-300 border border-amber-800 px-1.5 py-0.2 rounded">
                              Super Admin
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono">{u.email}</p>
                        {/* Dual-Coded Status Row */}
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px]">
                          {effStatus === 'deleted' ? (
                            <span className="inline-flex items-center gap-1 text-slate-400 font-bold">
                              <Trash2 className="w-3 h-3 shrink-0" />
                              <span>Deleted &amp; Scrubbed</span>
                            </span>
                          ) : effStatus === 'suspended' ? (
                            <span className="inline-flex items-center gap-1 text-rose-400 font-bold">
                              <UserX className="w-3 h-3 shrink-0" />
                              <span>Suspended</span>
                            </span>
                          ) : effStatus === 'locked' ? (
                            <span className="inline-flex items-center gap-1 text-amber-400 font-bold font-mono tabular-nums">
                              <Clock className="w-3 h-3 shrink-0" />
                              <span>Locked{u.lockedUntil ? ` until ${new Date(u.lockedUntil).toLocaleTimeString()}` : ''}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                              <CheckCircle2 className="w-3 h-3 shrink-0" />
                              <span>Active</span>
                            </span>
                          )}
                          {u.walletFrozen && (
                            <>
                              <span aria-hidden="true" className="text-slate-600">·</span>
                              <span className="inline-flex items-center gap-1 text-sky-400 font-bold">
                                <Snowflake className="w-3 h-3 shrink-0" />
                                <span>Wallet Frozen</span>
                              </span>
                            </>
                          )}
                          {(u.recoveredFrom || u.directorySource === 'recovered') && (
                            <>
                              <span aria-hidden="true" className="text-slate-600">·</span>
                              <span className="text-amber-300 font-medium">
                                Recovered from {u.recoveredFrom || 'Legacy Registry'}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-lg border shrink-0 ${
                      isStudent ? 'text-[#84E000] bg-emerald-950/60 border-emerald-800' :
                      isParent ? 'text-[#FF5B00] bg-orange-950/60 border-orange-800' :
                      isTutor ? 'text-sky-400 bg-sky-950/60 border-sky-800' :
                      u.role === 'growth_partner' ? 'text-amber-300 bg-amber-950/60 border-amber-800' :
                      'text-purple-400 bg-purple-950/60 border-purple-800'
                    }`}>
                      {u.role === 'growth_partner' ? 'partner' : u.role}
                    </span>
                  </div>

                  {/* Legacy Multi-Role Conflict Badge & One-Click Resolver */}
                  {u.conflictingRoles && u.conflictingRoles.length > 1 && effStatus !== 'deleted' && (
                    <div className="p-2.5 rounded-xl bg-amber-950/50 border border-amber-600/60 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-300">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>Multi-Role Conflict ({u.conflictingRoles.length} Roles)</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setConflictModalUser(u)}
                          className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] cursor-pointer transition-colors shrink-0"
                        >
                          Resolve Role
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {u.conflictingRoles.map((entry, idx) => (
                          <span
                            key={`${entry.role}_${idx}`}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950/90 border border-amber-700/50 text-amber-100 font-medium"
                          >
                            {formatConflictRoleLabel(entry.role)}
                            {entry.detail ? ` · ${entry.detail}` : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

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
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-slate-400 shrink-0">Subjects:</span>
                        <span className="font-semibold text-white text-right leading-snug">
                          {u.tutorData.subjectSpecialization ||
                            (u.tutorData.proficientSubjects && u.tutorData.proficientSubjects.join(', ')) ||
                            'Unspecified'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Hourly Rate:</span>
                        <span className="font-bold text-[#84E000] tabular-nums">
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
                        <span className="font-mono font-bold text-purple-300">{u.adminData.schoolCode || 'Pending'}</span>
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

                  {u.role === 'growth_partner' && u.growthPartnerData && (
                    <div className="bg-slate-900/80 rounded-xl p-2.5 text-[11px] space-y-1.5 border border-slate-800/60">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Referral Code:</span>
                        <span className="font-mono font-bold text-amber-300">
                          {u.growthPartnerData.referralCode || 'Pending'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Active Referrals:</span>
                        <span className="font-semibold text-white tabular-nums">
                          {Number(u.growthPartnerData.activeReferralsCount || 0)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Total Commission:</span>
                        <span className="font-bold text-[#84E000] tabular-nums">
                          <NairaText amount={Number(u.growthPartnerData.totalEarningsNaira || 0)} />
                        </span>
                      </div>
                    </div>
                  )}

                  {/* User Agreement Compliance Audit Row */}
                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/50">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Scale className="w-3 h-3 text-slate-400" />
                      <span>User Agreement:</span>
                    </span>
                    {hasAcceptedCurrentAgreement(u) ? (
                      <span className="font-semibold text-[#84E000] font-mono tabular-nums">
                        {u.legalConsent?.acceptedAt
                          ? `Agreed ${u.legalConsent.version} · ${formatConsentDate(u.legalConsent.acceptedAt)}`
                          : 'Admin Exempt'}
                      </span>
                    ) : (
                      <span className="font-semibold text-amber-400">
                        Pending {USER_AGREEMENT_VERSION}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="space-y-2 pt-2 border-t border-slate-800/60">
                  <div className="flex items-center gap-2">
                    {isAdmin && u.adminData && (
                      u.adminData.verificationStatus === 'verified' ? (
                        <button
                          type="button"
                          onClick={() => handleToggleAdminAccreditation(u, 'pending_verification')}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-950/70 text-slate-400 hover:text-rose-300 border border-slate-800 hover:border-rose-800/80 text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                          title="Revoke accreditation"
                        >
                          Revoke
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleToggleAdminAccreditation(u, 'verified')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1 shadow whitespace-nowrap shrink-0"
                          title="Approve institutional accreditation"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                      )
                    )}

                    <button
                      onClick={() => startImpersonation(u)}
                      disabled={effStatus === 'deleted'}
                      className="flex-1 bg-indigo-950/80 hover:bg-indigo-900 disabled:opacity-40 text-indigo-300 hover:text-white border border-indigo-700/60 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                      title={`Impersonate and view app as ${u.fullName}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Act As User</span>
                    </button>

                    <button
                      onClick={() => handleOpenEditModal(u)}
                      disabled={effStatus === 'deleted'}
                      className="bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 hover:text-white border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      title="Edit user parameters & enforcement"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Modify</span>
                    </button>
                  </div>

                  {!u.isSuperAdmin && effStatus !== 'deleted' && (
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                      {effStatus === 'locked' ? (
                        <button
                          type="button"
                          disabled={actingUserId === u.id}
                          onClick={() => void handleQuickEnforcement(u, 'unlock_account')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 font-semibold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                        >
                          <Unlock className="w-3 h-3" />
                          <span>Unlock</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={actingUserId === u.id}
                          onClick={() => void handleQuickEnforcement(u, 'lock_account', 1440)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-amber-950/60 border border-slate-800 hover:border-amber-700/60 text-amber-300 font-semibold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                        >
                          <Lock className="w-3 h-3" />
                          <span>Lock 24h</span>
                        </button>
                      )}

                      {effStatus === 'suspended' ? (
                        <button
                          type="button"
                          disabled={actingUserId === u.id}
                          onClick={() => void handleQuickEnforcement(u, 'unsuspend_account')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 font-semibold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Reactivate</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={actingUserId === u.id}
                          onClick={() => void handleQuickEnforcement(u, 'suspend_account')}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-700/60 text-rose-300 font-semibold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                        >
                          <UserX className="w-3 h-3" />
                          <span>Suspend</span>
                        </button>
                      )}

                      <button
                        type="button"
                        disabled={actingUserId === u.id}
                        onClick={() =>
                          setDeleteModalTarget({
                            user: u,
                            reason: 'Account removed by Super Admin so user can register fresh',
                            banEmail: false
                          })
                        }
                        className="px-2.5 py-1 rounded-lg bg-rose-950/40 hover:bg-rose-900 border border-rose-800/70 text-rose-300 font-bold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 ml-auto"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredUsers.length === 0 && (
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 text-center space-y-2.5">
            <p className="text-xs font-semibold text-slate-300">
              No accounts match your current filter or search query.
            </p>
            <button
              type="button"
              onClick={() => {
                setRoleFilter('all');
                setStatusFilter('all');
                setSearchQuery('');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-emerald-400 cursor-pointer"
            >
              Reset Directory Filters
            </button>
          </div>
        )}
      </div>

      {/* Full-Persona Account Editor Modal */}
      {selectedUserForEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#0B1526] border border-slate-700 w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl p-4 sm:p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-4 h-4 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Modify Persona Account ({selectedUserForEdit.role.replace('_', ' ').toUpperCase()})
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">ID: {selectedUserForEdit.id}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUserForEdit(null)}
                className="min-h-[44px] min-w-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
                aria-label="Close account editor"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {saveSuccessMsg && (
              <div className="bg-emerald-950/80 border border-emerald-600/80 text-emerald-300 px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveUserEdit} className="space-y-4 text-xs">
              {/* Section 1: Core Identity */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Core Identity
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={editFullName}
                      onChange={e => setEditFullName(e.target.value)}
                      className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={e => setEditEmail(e.target.value)}
                      className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2A: Student Persona */}
              {selectedUserForEdit.role === 'student' && (
                <div className="space-y-3 border-t border-slate-800/80 pt-3.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                    Student Academic Profile
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Class Level</label>
                      <select
                        value={editClassLevel}
                        onChange={e => setEditClassLevel(e.target.value as NigerianClassLevel)}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      >
                        {['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3', 'University Aspirant'].map(lvl => (
                          <option key={lvl} value={lvl}>{lvl}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Academic Stream</label>
                      <select
                        value={editStudentStream}
                        onChange={e => setEditStudentStream(e.target.value as AcademicStream)}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      >
                        {['Junior', 'Science', 'Non-Science'].map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">School Name</label>
                      <input
                        type="text"
                        value={editStudentSchool}
                        onChange={e => setEditStudentSchool(e.target.value)}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-slate-300 font-semibold block mb-1">School Code</label>
                        <input
                          type="text"
                          value={editStudentSchoolCode}
                          onChange={e => setEditStudentSchoolCode(e.target.value.toUpperCase())}
                          className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono uppercase focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="text-slate-300 font-semibold block mb-1">Link Code</label>
                        <input
                          type="text"
                          value={editStudentLinkCode}
                          onChange={e => setEditStudentLinkCode(e.target.value.toUpperCase())}
                          className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono uppercase focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Academic XP</label>
                      <input
                        type="number"
                        min={0}
                        value={editXP}
                        onChange={e => setEditXP(Number(e.target.value))}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono tabular-nums focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Study Streak (Days)</label>
                      <input
                        type="number"
                        min={0}
                        value={editStudentStreakDays}
                        onChange={e => setEditStudentStreakDays(Number(e.target.value))}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono tabular-nums focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl">
                    <div>
                      <span className="font-semibold text-white block">School Uniform Verification</span>
                      <span className="text-[11px] text-slate-400">Award verified school badge and bonus status</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditUniformVerified(!editUniformVerified)}
                      className={`min-h-[44px] px-4 py-1.5 rounded-xl font-bold text-xs cursor-pointer transition-colors ${
                        editUniformVerified
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {editUniformVerified ? 'Verified ✓' : 'Unverified'}
                    </button>
                  </div>
                </div>
              )}

              {/* Section 2B: Parent Persona */}
              {selectedUserForEdit.role === 'parent' && (
                <div className="space-y-3 border-t border-slate-800/80 pt-3.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400 block">
                    Parent / Guardian Profile
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={editParentPhone}
                        onChange={e => setEditParentPhone(e.target.value)}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Relationship to Ward</label>
                      <select
                        value={editParentRelationship}
                        onChange={e => setEditParentRelationship(e.target.value as ParentRelationship)}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      >
                        {['Father', 'Mother', 'Guardian', 'Sibling', 'Relative', 'Other'].map(rel => (
                          <option key={rel} value={rel}>{rel}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Primary Ward Name</label>
                      <input
                        type="text"
                        value={editParentWardName}
                        onChange={e => setEditParentWardName(e.target.value)}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Wallet PIN (4 digits)</label>
                      <input
                        type="text"
                        maxLength={4}
                        value={editParentPin}
                        onChange={e => setEditParentPin(e.target.value)}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono tabular-nums focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">State of Residence</label>
                      <input
                        type="text"
                        value={editParentState}
                        onChange={e => setEditParentState(e.target.value)}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">City / LGA</label>
                      <input
                        type="text"
                        value={editParentCity}
                        onChange={e => setEditParentCity(e.target.value)}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Notification Channel</label>
                      <select
                        value={editParentNotificationPref}
                        onChange={e => setEditParentNotificationPref(e.target.value as ParentNotificationChannel)}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      >
                        {['WhatsApp', 'SMS', 'Email', 'In-App Only'].map(ch => (
                          <option key={ch} value={ch}>{ch}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col justify-end">
                      <button
                        type="button"
                        onClick={() => setEditParentAllowReports(!editParentAllowReports)}
                        className={`min-h-[44px] w-full px-3 py-2 rounded-xl font-bold text-xs cursor-pointer transition-colors ${
                          editParentAllowReports
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        {editParentAllowReports ? 'Automated Reports: Enabled' : 'Automated Reports: Off'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Section 2C: Tutor Persona */}
              {selectedUserForEdit.role === 'tutor' && (
                <div className="space-y-3.5 border-t border-slate-800/80 pt-3.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 block">
                    Educator / Tutor Persona &amp; Subjects
                  </span>

                  <SubjectMultiSelector
                    selectedSubjects={editTutorSubjects}
                    onChange={(nextSubjects) => {
                      setEditTutorSubjects(nextSubjects);
                      setEditTutorSpecialization(formatSubjectSpecialization(nextSubjects));
                    }}
                    label="Proficient Subjects"
                    helperText="Select or add custom subjects taught by this tutor. Updating here syncs her public directory card immediately."
                    accentColor="emerald"
                    compact
                  />

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">
                      Subject Specialization Headline (Displays under tutor name)
                    </label>
                    <input
                      type="text"
                      value={editTutorSpecialization}
                      onChange={e => setEditTutorSpecialization(e.target.value)}
                      placeholder="e.g. English Language, French and CRS"
                      className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">
                        Hourly Rate (<NairaSign />)
                      </label>
                      <input
                        type="number"
                        step={500}
                        min={0}
                        value={editHourlyRate}
                        onChange={e => setEditHourlyRate(Number(e.target.value))}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono tabular-nums focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Teaching Mode</label>
                      <select
                        value={editTutorTeachingMode}
                        onChange={e => setEditTutorTeachingMode(e.target.value as any)}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="both">Online &amp; In-Person</option>
                        <option value="online">Online Only</option>
                        <option value="physical">In-Person Home Only</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Experience</label>
                      <select
                        value={editTutorExperienceRange}
                        onChange={e => setEditTutorExperienceRange(e.target.value as any)}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="0-1 years">0-1 years</option>
                        <option value="1-3 years">1-3 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5+ years">5+ years</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Highest Education</label>
                      <select
                        value={editTutorHighestEducation}
                        onChange={e => {
                          const nextEd = e.target.value as NigerianHighestEducation;
                          const prevSummary = formatPrimaryDegreeSummary({
                            highestEducation: editTutorHighestEducation,
                            qualification: editTutorQualification,
                            courseOfStudy: editTutorCourseOfStudy,
                            institution: editTutorInstitution
                          });
                          let nextQual = editTutorQualification;
                          if (nextEd === 'Other') {
                            if (
                              NIGERIAN_HIGHER_EDUCATION_OPTIONS.some(
                                opt => opt.value.toLowerCase() === editTutorQualification.trim().toLowerCase()
                              )
                            ) {
                              nextQual = '';
                            }
                          } else {
                            nextQual = nextEd;
                          }
                          setEditTutorHighestEducation(nextEd);
                          setEditTutorQualification(nextQual);
                          const currentLines = editTutorDegreesText
                            .split('\n')
                            .map(l => l.trim())
                            .filter(Boolean);
                          const rebuilt = rebuildTutorDegrees(
                            currentLines,
                            {
                              highestEducation: nextEd,
                              qualification: nextQual,
                              courseOfStudy: editTutorCourseOfStudy,
                              institution: editTutorInstitution
                            },
                            {
                              highestEducation: editTutorHighestEducation,
                              qualification: editTutorQualification,
                              courseOfStudy: editTutorCourseOfStudy,
                              institution: editTutorInstitution
                            }
                          );
                          if (
                            currentLines.length === 0 ||
                            currentLines[0].toLowerCase() === prevSummary.toLowerCase() ||
                            rebuilt.length > 0
                          ) {
                            setEditTutorDegreesText(rebuilt.join('\n'));
                          }
                        }}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      >
                        {NIGERIAN_HIGHER_EDUCATION_OPTIONS.map(ed => (
                          <option key={ed.value} value={ed.value}>
                            {ed.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">
                        {editTutorHighestEducation === 'Other'
                          ? 'Custom Qualification Title *'
                          : 'Qualification Title (Honors / Optional)'}
                      </label>
                      <input
                        type="text"
                        value={editTutorQualification}
                        onChange={e => {
                          const nextQual = e.target.value;
                          const prevSummary = formatPrimaryDegreeSummary({
                            highestEducation: editTutorHighestEducation,
                            qualification: editTutorQualification,
                            courseOfStudy: editTutorCourseOfStudy,
                            institution: editTutorInstitution
                          });
                          setEditTutorQualification(nextQual);
                          const currentLines = editTutorDegreesText
                            .split('\n')
                            .map(l => l.trim())
                            .filter(Boolean);
                          if (
                            currentLines.length === 0 ||
                            currentLines[0].toLowerCase() === prevSummary.toLowerCase()
                          ) {
                            const rebuilt = rebuildTutorDegrees(currentLines, {
                              highestEducation: editTutorHighestEducation,
                              qualification: nextQual,
                              courseOfStudy: editTutorCourseOfStudy,
                              institution: editTutorInstitution
                            }, {
                              highestEducation: editTutorHighestEducation,
                              qualification: editTutorQualification,
                              courseOfStudy: editTutorCourseOfStudy,
                              institution: editTutorInstitution
                            });
                            setEditTutorDegreesText(rebuilt.join('\n'));
                          }
                        }}
                        placeholder={
                          editTutorHighestEducation === 'Other'
                            ? 'Enter custom title (e.g. PGD, B.Agric., LL.B.)'
                            : 'e.g. B.A. (Second Class Upper)'
                        }
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Institution Attended</label>
                      <input
                        type="text"
                        value={editTutorInstitution}
                        onChange={e => {
                          const nextInst = e.target.value;
                          const prevSummary = formatPrimaryDegreeSummary({
                            highestEducation: editTutorHighestEducation,
                            qualification: editTutorQualification,
                            courseOfStudy: editTutorCourseOfStudy,
                            institution: editTutorInstitution
                          });
                          setEditTutorInstitution(nextInst);
                          const currentLines = editTutorDegreesText
                            .split('\n')
                            .map(l => l.trim())
                            .filter(Boolean);
                          if (
                            currentLines.length === 0 ||
                            currentLines[0].toLowerCase() === prevSummary.toLowerCase()
                          ) {
                            const rebuilt = rebuildTutorDegrees(currentLines, {
                              highestEducation: editTutorHighestEducation,
                              qualification: editTutorQualification,
                              courseOfStudy: editTutorCourseOfStudy,
                              institution: nextInst
                            }, {
                              highestEducation: editTutorHighestEducation,
                              qualification: editTutorQualification,
                              courseOfStudy: editTutorCourseOfStudy,
                              institution: editTutorInstitution
                            });
                            setEditTutorDegreesText(rebuilt.join('\n'));
                          }
                        }}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Course of Study</label>
                      <input
                        type="text"
                        value={editTutorCourseOfStudy}
                        onChange={e => {
                          const nextCourse = e.target.value;
                          const prevSummary = formatPrimaryDegreeSummary({
                            highestEducation: editTutorHighestEducation,
                            qualification: editTutorQualification,
                            courseOfStudy: editTutorCourseOfStudy,
                            institution: editTutorInstitution
                          });
                          setEditTutorCourseOfStudy(nextCourse);
                          const currentLines = editTutorDegreesText
                            .split('\n')
                            .map(l => l.trim())
                            .filter(Boolean);
                          if (
                            currentLines.length === 0 ||
                            currentLines[0].toLowerCase() === prevSummary.toLowerCase()
                          ) {
                            const rebuilt = rebuildTutorDegrees(currentLines, {
                              highestEducation: editTutorHighestEducation,
                              qualification: editTutorQualification,
                              courseOfStudy: nextCourse,
                              institution: editTutorInstitution
                            }, {
                              highestEducation: editTutorHighestEducation,
                              qualification: editTutorQualification,
                              courseOfStudy: editTutorCourseOfStudy,
                              institution: editTutorInstitution
                            });
                            setEditTutorDegreesText(rebuilt.join('\n'));
                          }
                        }}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-slate-300 font-semibold">
                          University Degrees &amp; Honors Card (One per line)
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const currentLines = editTutorDegreesText
                              .split('\n')
                              .map(l => l.trim())
                              .filter(Boolean);
                            const rebuilt = rebuildTutorDegrees(currentLines, {
                              highestEducation: editTutorHighestEducation,
                              qualification: editTutorQualification,
                              courseOfStudy: editTutorCourseOfStudy,
                              institution: editTutorInstitution
                            });
                            setEditTutorDegreesText(rebuilt.join('\n'));
                          }}
                          className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer"
                        >
                          Sync from Qualification &amp; Alma Mater
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={editTutorDegreesText}
                        onChange={e => setEditTutorDegreesText(e.target.value)}
                        placeholder="e.g. B.A. French Language, University of Benin"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={editTutorPhone}
                        onChange={e => setEditTutorPhone(e.target.value)}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-slate-300 font-semibold block mb-1">City</label>
                        <input
                          type="text"
                          value={editTutorCity}
                          onChange={e => setEditTutorCity(e.target.value)}
                          className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="text-slate-300 font-semibold block mb-1">State</label>
                        <input
                          type="text"
                          value={editTutorState}
                          onChange={e => setEditTutorState(e.target.value)}
                          className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1.5">Target Classes</label>
                    <div className="flex flex-wrap gap-1.5">
                      {['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3', 'WAEC/NECO Prep', 'JAMB Prep'].map(lvl => {
                        const active = editTutorTargetClasses.includes(lvl);
                        return (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() =>
                              setEditTutorTargetClasses(prev =>
                                active ? prev.filter(c => c !== lvl) : [...prev, lvl]
                              )
                            }
                            className={`min-h-[38px] px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                              active
                                ? 'bg-sky-500/20 text-sky-200 border-sky-400'
                                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                            }`}
                          >
                            {active ? '✓ ' : '+ '}
                            {lvl}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Profile Tagline</label>
                    <input
                      type="text"
                      value={editTutorTagline}
                      onChange={e => setEditTutorTagline(e.target.value)}
                      className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Biography &amp; Methodology</label>
                    <textarea
                      rows={3}
                      value={editTutorBio}
                      onChange={e => setEditTutorBio(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">NIN Number</label>
                      <input
                        type="text"
                        value={editTutorNin}
                        onChange={e => setEditTutorNin(e.target.value)}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="flex flex-col justify-end">
                      <button
                        type="button"
                        onClick={() => setEditTutorVerified(!editTutorVerified)}
                        className={`min-h-[44px] w-full py-2 rounded-xl font-bold text-xs cursor-pointer transition-colors ${
                          editTutorVerified
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        {editTutorVerified ? 'NIN Verified ✓' : 'NIN Unverified'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Section 2D: School Admin Persona */}
              {(selectedUserForEdit.role === 'admin' || selectedUserForEdit.role === 'school_admin') && (
                <div className="space-y-3 border-t border-slate-800/80 pt-3.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 block">
                    School Administrator &amp; Institution
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">School Name</label>
                      <input
                        type="text"
                        value={editAdminSchoolName}
                        onChange={e => setEditAdminSchoolName(e.target.value)}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">School Type</label>
                      <input
                        type="text"
                        value={editAdminSchoolType}
                        onChange={e => setEditAdminSchoolType(e.target.value)}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">School Code (6–8 char)</label>
                      <input
                        type="text"
                        maxLength={12}
                        value={editAdminSchoolCode}
                        onChange={e => setEditAdminSchoolCode(e.target.value.toUpperCase())}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono font-bold uppercase tabular-nums focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Designation / Role</label>
                      <input
                        type="text"
                        value={editAdminDesignation}
                        onChange={e => setEditAdminDesignation(e.target.value)}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Official Phone</label>
                      <input
                        type="text"
                        value={editAdminPhone}
                        onChange={e => setEditAdminPhone(e.target.value)}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-slate-300 font-semibold block mb-1">State</label>
                        <input
                          type="text"
                          value={editAdminState}
                          onChange={e => setEditAdminState(e.target.value)}
                          className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="text-slate-300 font-semibold block mb-1">LGA</label>
                        <input
                          type="text"
                          value={editAdminLga}
                          onChange={e => setEditAdminLga(e.target.value)}
                          className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
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
                        <div className="text-[10px] text-slate-500 tabular-nums">
                          Affiliated: {metrics.paidStudents} Paid · {metrics.freeStudents} Free Tier ({metrics.totalStudents} Total)
                        </div>
                      </div>
                    );
                  })()}

                  <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl">
                    <div>
                      <span className="font-semibold text-white block">Institutional Accreditation</span>
                      <span className="text-[11px] text-slate-400">Unlock curriculum notes and CBT publishing</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditAdminVerified(!editAdminVerified)}
                      className={`min-h-[44px] px-4 py-1.5 rounded-xl font-bold text-xs cursor-pointer transition-colors ${
                        editAdminVerified
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {editAdminVerified ? 'Accredited ✓' : 'Pending Review'}
                    </button>
                  </div>
                </div>
              )}

              {/* Section 2E: Growth Partner Persona */}
              {selectedUserForEdit.role === 'growth_partner' && (
                <div className="space-y-3 border-t border-slate-800/80 pt-3.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                    Growth Partner &amp; Settlement Profile
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={editPartnerPhone}
                        onChange={e => setEditPartnerPhone(e.target.value)}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Referral Code</label>
                      <input
                        type="text"
                        value={editPartnerReferralCode}
                        onChange={e => setEditPartnerReferralCode(e.target.value.toUpperCase())}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono uppercase focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Commission Rate (%)</label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        step={1}
                        value={editPartnerCommissionRate}
                        onChange={e => setEditPartnerCommissionRate(Number(e.target.value))}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono tabular-nums focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Partner Status</label>
                      <select
                        value={editPartnerStatus}
                        onChange={e => setEditPartnerStatus(e.target.value as GrowthPartner['status'])}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="active">Active</option>
                        <option value="pending_approval">Pending Approval</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Payout Bank Name</label>
                      <input
                        type="text"
                        value={editPartnerBankName}
                        onChange={e => setEditPartnerBankName(e.target.value)}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Account Number</label>
                      <input
                        type="text"
                        value={editPartnerAccountNumber}
                        onChange={e => setEditPartnerAccountNumber(e.target.value)}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono tabular-nums focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-slate-300 font-semibold block mb-1">Settlement Account Name</label>
                      <input
                        type="text"
                        value={editPartnerAccountName}
                        onChange={e => setEditPartnerAccountName(e.target.value)}
                        className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Trust & Enforcement Controls inside Edit Modal */}
              {!selectedUserForEdit.isSuperAdmin && (
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                      <span>Account Trust &amp; Enforcement</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Account Status</label>
                      <select
                        value={editAccountStatus}
                        onChange={e => setEditAccountStatus(e.target.value as any)}
                        className="w-full min-h-[44px] bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="active">Active</option>
                        <option value="locked">Timed Lock</option>
                        <option value="suspended">Suspended (Indefinite)</option>
                      </select>
                    </div>

                    {editAccountStatus === 'locked' ? (
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Lock Duration</label>
                        <select
                          value={editLockDurationMinutes}
                          onChange={e => setEditLockDurationMinutes(Number(e.target.value))}
                          className="w-full min-h-[44px] bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-white font-mono focus:outline-none focus:border-amber-500"
                        >
                          <option value={15}>15 mins</option>
                          <option value={60}>1 hour</option>
                          <option value={1440}>24 hours</option>
                          <option value={10080}>7 days</option>
                        </select>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-end">
                        <button
                          type="button"
                          onClick={() => setEditWalletFrozen(!editWalletFrozen)}
                          className={`min-h-[44px] w-full py-2 rounded-xl font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5 transition-colors ${
                            editWalletFrozen
                              ? 'bg-sky-600 text-white'
                              : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                          }`}
                        >
                          <Snowflake className="w-3.5 h-3.5" />
                          <span>{editWalletFrozen ? 'Wallet Frozen' : 'Freeze Wallet'}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {(editAccountStatus !== 'active' || editWalletFrozen) && (
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Enforcement Reason</label>
                      <input
                        type="text"
                        value={editEnforcementReason}
                        onChange={e => setEditEnforcementReason(e.target.value)}
                        placeholder="Reason for lock, suspension, or wallet freeze"
                        className="w-full min-h-[44px] bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-800">
                {!selectedUserForEdit.isSuperAdmin ? (
                  <button
                    type="button"
                    onClick={() => {
                      const target = selectedUserForEdit;
                      setSelectedUserForEdit(null);
                      setDeleteModalTarget({
                        user: target,
                        reason:
                          editEnforcementReason.trim() ||
                          'Account deleted by Super Admin',
                        banEmail: false
                      });
                    }}
                    className="min-h-[44px] px-3.5 py-2 rounded-xl bg-rose-950/70 hover:bg-rose-900 border border-rose-800 text-rose-300 font-bold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                ) : (
                  <div />
                )}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedUserForEdit(null)}
                    className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="min-h-[44px] px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors cursor-pointer shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* In-App Soft-Delete & PII Scrub Confirmation Modal */}
      {deleteModalTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#0B1526] border border-rose-800/80 w-full max-w-md rounded-2xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-950/80 border border-rose-700/70 flex items-center justify-center text-rose-400 shrink-0">
                  <Trash2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {deleteModalTarget.banEmail
                      ? 'Confirm Soft-Delete & Permanent Email Ban'
                      : 'Delete Account & Release Email'}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {deleteModalTarget.user.fullName} · {deleteModalTarget.user.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDeleteModalTarget(null)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {deleteModalTarget.banEmail ? (
              <p className="text-xs text-rose-200/90 leading-relaxed bg-rose-950/40 border border-rose-800/60 rounded-xl p-3">
                <strong>Ban Mode Enabled:</strong> This scrubs profile PII to <span className="font-mono text-rose-300">Deleted Account</span> and permanently blocks <span className="font-mono">{deleteModalTarget.user.email}</span> from signing in or registering again while preserving fraud &amp; security audit logs.
              </p>
            ) : (
              <p className="text-xs text-slate-300 leading-relaxed bg-emerald-950/30 border border-emerald-800/50 rounded-xl p-3">
                <strong className="text-emerald-300">Email Release Enabled (Default):</strong> Permanently deletes this user&apos;s records across the directory, cloud profiles, and any prior deletion locks so <span className="font-mono text-white">{deleteModalTarget.user.email}</span> can immediately register a fresh single-role account.
              </p>
            )}

            <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={deleteModalTarget.banEmail}
                onChange={e =>
                  setDeleteModalTarget(prev =>
                    prev
                      ? {
                          ...prev,
                          banEmail: e.target.checked,
                          reason: e.target.checked
                            ? 'Account permanently banned by Super Admin for policy/security violation'
                            : 'Account removed by Super Admin so user can register fresh'
                        }
                      : null
                  )
                }
                className="mt-0.5 w-4 h-4 accent-rose-600 rounded cursor-pointer"
              />
              <span className="text-xs text-slate-300 leading-snug">
                <strong className="text-white block">Also permanently ban this email from re-registering</strong>
                <span className="text-[11px] text-slate-400">
                  Leave unchecked to let the user create a fresh account immediately after deletion.
                </span>
              </span>
            </label>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Audit Reason
              </label>
              <textarea
                rows={2}
                value={deleteModalTarget.reason}
                onChange={e =>
                  setDeleteModalTarget(prev => (prev ? { ...prev, reason: e.target.value } : null))
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setDeleteModalTarget(null)}
                className="px-4 min-h-[38px] rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={actingUserId === deleteModalTarget.user.id || !deleteModalTarget.reason.trim()}
                onClick={async () => {
                  const target = deleteModalTarget;
                  setDeleteModalTarget(null);
                  setActingUserId(target.user.id);
                  if (target.banEmail) {
                    const res = await softDeleteUserRecord(target.user.id, target.reason, authorizedAdminEmail);
                    setActingUserId(null);
                    if (res.success) {
                      setDirectoryNotice({
                        type: 'success',
                        text: `Soft-deleted and permanently banned ${target.user.email} while preserving audit logs.`
                      });
                    } else {
                      setDirectoryNotice({
                        type: 'error',
                        text: res.error || 'Could not ban and soft-delete account.'
                      });
                    }
                  } else {
                    const res = await deleteAndReleaseUserRecord(
                      target.user,
                      target.reason,
                      authorizedAdminEmail
                    );
                    setActingUserId(null);
                    if (res.success) {
                      setDirectoryNotice({
                        type: 'success',
                        text: `Deleted ${target.user.email} and released the email for immediate fresh registration.`
                      });
                    } else {
                      setDirectoryNotice({
                        type: 'error',
                        text: res.error || 'Could not delete and release account.'
                      });
                    }
                  }
                }}
                className="px-4 min-h-[38px] rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{deleteModalTarget.banEmail ? 'Confirm Ban & Scrub' : 'Delete & Release Email'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Multi-Role Account Conflict Resolver Modal */}
      {conflictModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#0B1526] border border-amber-700/80 w-full max-w-lg rounded-2xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-950/70 border border-amber-700/70 flex items-center justify-center text-amber-400">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Resolve Multi-Role Conflict</h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {conflictModalUser.fullName} · {conflictModalUser.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setConflictModalUser(null)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              This email holds records under multiple roles from before single-role enforcement. Pick the <strong className="text-white">one role to keep</strong> — sign-in and User Directory will immediately align and the secondary role&apos;s records will be cleaned up — or delete the account completely to let the user re-register fresh.
            </p>

            <div className="space-y-2">
              {(conflictModalUser.conflictingRoles || []).map((entry, idx) => {
                const isWorking = resolvingRoleKey === `${conflictModalUser.id}_${entry.role}`;
                return (
                  <div
                    key={`${entry.role}_${entry.userId}_${idx}`}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{formatConflictRoleLabel(entry.role)}</span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">
                          {entry.source}
                        </span>
                      </div>
                      {entry.detail && (
                        <p className="text-[11px] text-slate-400 mt-0.5 truncate">{entry.detail}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      disabled={Boolean(resolvingRoleKey)}
                      onClick={async () => {
                        const targetUser = conflictModalUser;
                        const roleToKeep = entry.role;
                        setResolvingRoleKey(`${targetUser.id}_${roleToKeep}`);
                        const res = await resolveMultiRoleAccount(
                          targetUser,
                          roleToKeep,
                          authorizedAdminEmail
                        );
                        setResolvingRoleKey(null);
                        if (res.success) {
                          setConflictModalUser(null);
                          setDirectoryNotice({
                            type: 'success',
                            text: `Resolved ${targetUser.email} to ${formatConflictRoleLabel(roleToKeep)} only. Sign-in and User Directory are now synchronized.`
                          });
                        } else {
                          setDirectoryNotice({
                            type: 'error',
                            text: res.error || 'Could not resolve multi-role conflict.'
                          });
                        }
                      }}
                      className="px-3 min-h-[34px] rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer transition-colors"
                    >
                      {isWorking ? 'Saving...' : `Keep ${formatConflictRoleLabel(entry.role)}`}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                disabled={Boolean(resolvingRoleKey)}
                onClick={() => {
                  const targetUser = conflictModalUser;
                  setConflictModalUser(null);
                  setDeleteModalTarget({
                    user: targetUser,
                    reason: 'Legacy multi-role account reset so user can register fresh under a single role',
                    banEmail: false
                  });
                }}
                className="px-3.5 min-h-[36px] rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800/70 text-rose-200 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete &amp; Release Email</span>
              </button>
              <button
                type="button"
                onClick={() => setConflictModalUser(null)}
                className="px-4 min-h-[36px] rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
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
