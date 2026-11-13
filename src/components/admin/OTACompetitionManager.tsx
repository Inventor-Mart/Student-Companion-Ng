import React, { useState, useEffect } from 'react';
import {
  subscribeToOTABroadcasts,
  subscribeToOTAPopup,
  subscribeToOTACompetition,
  subscribeToOTAWeeklyCompetition,
  subscribeToOTASchoolLeague,
  saveOTABroadcastItem,
  deleteOTABroadcastItem,
  saveOTAPopupAnnouncement,
  saveOTACompetitionConfig,
  saveOTAWeeklyCompetition,
  saveOTASchoolLeague,
  DEFAULT_OTA_BROADCASTS,
  DEFAULT_OTA_POPUP,
  DEFAULT_OTA_COMPETITION_CONFIG,
  DEFAULT_OTA_WEEKLY_CONFIG,
  DEFAULT_OTA_SCHOOL_LEAGUE_CONFIG,
  DEFAULT_OTA_APP_RELEASE,
  DEFAULT_OTA_FEATURE_FLAGS,
  saveOTAAppRelease,
  saveOTAFeatureFlag,
  saveAllOTAFeatureFlags
} from '../../services/otaService';
import {
  publishPersonaNotification,
  deletePersonaNotification,
  dispatchEmailDigest,
  triggerBrowserNotification
} from '../../services/notificationService';
import {
  OTABroadcastItem,
  OTAPopupAnnouncement,
  OTACompetitionConfig,
  OTAWeeklyCompetitionConfig,
  OTASchoolLeagueConfig,
  OTASchoolLeagueSchool,
  OTABroadcastCategory,
  OTAAppRelease,
  OTAUpgradeMode,
  OTAFeatureFlag,
  OTAFeatureKey,
  PersonaNotificationCategory,
  UserRole
} from '../../types';
import { CBT_EXAMS_DATABASE } from '../../data/cbtExamData';
import { useApp } from '../../context/AppContext';
import { NairaText, NairaSign } from '../../utils/currency';
import { DeviceImageUploader } from './DeviceImageUploader';
import {
  Radio,
  Tv,
  Image as ImageIcon,
  Trophy,
  Plus,
  Trash2,
  CheckCircle2,
  Save,
  RotateCcw,
  Sparkles,
  Smartphone,
  Shirt,
  Backpack,
  Calendar,
  Clock,
  Layers,
  ArrowRight,
  School,
  Zap,
  Timer,
  Gift,
  ArrowUpCircle,
  PauseCircle,
  BellRing,
  Mail,
  Send,
  ShieldAlert,
  Play,
  Pause,
  Download,
  ExternalLink
} from 'lucide-react';

const PRESET_FLYER_IMAGES = [
  {
    label: 'Championship Trophy & Students',
    url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'STEM Science Lab & Robotics',
    url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Computer CBT Examination Hall',
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Graduation & Scholar Medals',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80'
  }
];

export const OTACompetitionManager: React.FC = () => {
  const {
    isSuperAdmin,
    isFirebaseConnected,
    appVersion,
    otaAppRelease,
    otaFeatureFlags,
    personaNotifications,
    allRegisteredUsers,
    currentUserProfile
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'app_updates' | 'feature_toggles' | 'reminders' | 'ticker' | 'popup' | 'competition'
  >('app_updates');
  const [compSubTab, setCompSubTab] = useState<'termly' | 'weekly' | 'schools'>('termly');
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  // 0A. App Release OTA state
  const [releaseDraft, setReleaseDraft] = useState<OTAAppRelease>(otaAppRelease || DEFAULT_OTA_APP_RELEASE);
  const [highlightsText, setHighlightsText] = useState<string>(
    (otaAppRelease?.featureHighlights || DEFAULT_OTA_APP_RELEASE.featureHighlights).join('\n')
  );
  const [isSavingRelease, setIsSavingRelease] = useState(false);

  useEffect(() => {
    setReleaseDraft(otaAppRelease);
    setHighlightsText((otaAppRelease.featureHighlights || []).join('\n'));
  }, [otaAppRelease]);

  // 0B. Feature Pause Toggles state
  const [featureCategoryFilter, setFeatureCategoryFilter] = useState<'All' | 'Student Hub' | 'Persona Portal' | 'Core Service'>('All');
  const [featureDrafts, setFeatureDrafts] = useState<Record<OTAFeatureKey, OTAFeatureFlag>>(
    otaFeatureFlags || DEFAULT_OTA_FEATURE_FLAGS
  );
  const [isSavingFeatures, setIsSavingFeatures] = useState(false);

  useEffect(() => {
    setFeatureDrafts(otaFeatureFlags);
  }, [otaFeatureFlags]);

  // 0C. Cross-Persona Reminders & Email Digest state
  const [reminderTargetRole, setReminderTargetRole] = useState<'all' | UserRole>('student');
  const [reminderCategory, setReminderCategory] = useState<PersonaNotificationCategory>('study_reminder');
  const [reminderTitle, setReminderTitle] = useState<string>('');
  const [reminderMessage, setReminderMessage] = useState<string>('');
  const [reminderActionLabel, setReminderActionLabel] = useState<string>('Open Study Hub');
  const [reminderActionTarget, setReminderActionTarget] = useState<string>('cbt');
  const [sendInAppInbox, setSendInAppInbox] = useState<boolean>(true);
  const [sendBrowserPush, setSendBrowserPush] = useState<boolean>(true);
  const [sendEmailDigest, setSendEmailDigest] = useState<boolean>(false);
  const [isSendingReminder, setIsSendingReminder] = useState<boolean>(false);

  // 1. Ticker state
  const [broadcastItems, setBroadcastItems] = useState<OTABroadcastItem[]>([]);
  const [newTickerText, setNewTickerText] = useState<string>('');
  const [newTickerCategory, setNewTickerCategory] = useState<OTABroadcastCategory>('championship');
  const [newTickerPriority, setNewTickerPriority] = useState<number>(10);
  const [newTickerActionTab, setNewTickerActionTab] = useState<string>('competitions');

  // 2. Pop-up announcement state
  const [popupConfig, setPopupConfig] = useState<OTAPopupAnnouncement>(DEFAULT_OTA_POPUP);

  // 3. Competition arena state
  const [compConfig, setCompConfig] = useState<OTACompetitionConfig>(DEFAULT_OTA_COMPETITION_CONFIG);
  const [weeklyConfig, setWeeklyConfig] = useState<OTAWeeklyCompetitionConfig>(DEFAULT_OTA_WEEKLY_CONFIG);
  const [leagueConfig, setLeagueConfig] = useState<OTASchoolLeagueConfig>(DEFAULT_OTA_SCHOOL_LEAGUE_CONFIG);

  // School addition state
  const [newSchoolName, setNewSchoolName] = useState<string>('');
  const [newSchoolState, setNewSchoolState] = useState<string>('Lagos');
  const [newSchoolPoints, setNewSchoolPoints] = useState<number>(120000);

  useEffect(() => {
    const unsubBroadcasts = subscribeToOTABroadcasts(setBroadcastItems);
    const unsubPopup = subscribeToOTAPopup((p) => {
      if (p) setPopupConfig(p);
    });
    const unsubComp = subscribeToOTACompetition(setCompConfig);
    const unsubWeekly = subscribeToOTAWeeklyCompetition(setWeeklyConfig);
    const unsubLeague = subscribeToOTASchoolLeague(setLeagueConfig);

    return () => {
      unsubBroadcasts();
      unsubPopup();
      unsubComp();
      unsubWeekly();
      unsubLeague();
    };
  }, []);

  const triggerNotice = (msg: string) => {
    setSaveFeedback(msg);
    setTimeout(() => setSaveFeedback(null), 4000);
  };

  // --- App Release OTA Handlers ---
  const handleSaveAppRelease = async (overrideActive?: boolean) => {
    setIsSavingRelease(true);
    try {
      const highlights = highlightsText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

      const payload: OTAAppRelease = {
        ...releaseDraft,
        featureHighlights: highlights,
        isActive: overrideActive !== undefined ? overrideActive : releaseDraft.isActive,
        publishedAt: new Date().toISOString(),
        publishedBy: currentUserProfile?.email || (isSuperAdmin ? 'martorefe@gmail.com' : 'admin')
      };
      await saveOTAAppRelease(payload);
      setReleaseDraft(payload);
      triggerNotice(
        payload.isActive
          ? `OTA v${payload.latestVersion} rollout published (${payload.upgradeMode === 'force_blocking' ? 'Mandatory Upgrade Gate' : 'Mild Notification'}).`
          : `OTA release settings saved (rollout banner inactive).`
      );
    } catch (err: any) {
      triggerNotice(`Failed to save OTA release: ${err?.message || 'Check connection'}`);
    } finally {
      setIsSavingRelease(false);
    }
  };

  // --- Feature Pause Flag Handlers ---
  const handleToggleFeaturePause = async (key: OTAFeatureKey) => {
    const current = featureDrafts[key];
    if (!current) return;
    const nextFlag: OTAFeatureFlag = {
      ...current,
      isPaused: !current.isPaused,
      updatedBy: currentUserProfile?.email || 'super_admin'
    };
    setFeatureDrafts((prev) => ({ ...prev, [key]: nextFlag }));
    await saveOTAFeatureFlag(nextFlag);
    const hasCustomNotice = Boolean(
      (nextFlag.customBadge || '').trim() ||
        (nextFlag.customTitle || '').trim() ||
        (nextFlag.pauseReason || '').trim()
    );
    triggerNotice(
      `${nextFlag.label} is now ${
        nextFlag.isPaused
          ? hasCustomNotice
            ? 'PAUSED (custom notice shown to users)'
            : 'PAUSED'
          : 'ACTIVE'
      }.`
    );
  };

  const handleSaveFeatureDraftDetails = async (key: OTAFeatureKey) => {
    const flag = featureDrafts[key];
    if (!flag) return;
    await saveOTAFeatureFlag({
      ...flag,
      updatedBy: currentUserProfile?.email || 'super_admin'
    });
    triggerNotice(`Saved custom pause notice for ${flag.label}.`);
  };

  const handleClearFeatureDraftDetails = async (key: OTAFeatureKey) => {
    const flag = featureDrafts[key];
    if (!flag) return;
    const cleared: OTAFeatureFlag = {
      ...flag,
      customBadge: '',
      customTitle: '',
      pauseReason: '',
      estimatedResume: '',
      updatedBy: currentUserProfile?.email || 'super_admin'
    };
    setFeatureDrafts((prev) => ({ ...prev, [key]: cleared }));
    await saveOTAFeatureFlag(cleared);
    triggerNotice(`Cleared custom pause notice fields for ${flag.label}.`);
  };

  const handleBulkFeatureState = async (mode: 'resume_all' | 'pause_student_hubs') => {
    setIsSavingFeatures(true);
    try {
      const nextMap = { ...featureDrafts };
      const now = new Date().toISOString();
      const actor = currentUserProfile?.email || 'super_admin';
      (Object.keys(nextMap) as OTAFeatureKey[]).forEach((k) => {
        const f = nextMap[k];
        if (mode === 'resume_all') {
          nextMap[k] = { ...f, isPaused: false, updatedAt: now, updatedBy: actor };
        } else if (f.category === 'Student Hub') {
          nextMap[k] = { ...f, isPaused: true, updatedAt: now, updatedBy: actor };
        }
      });
      setFeatureDrafts(nextMap);
      await saveAllOTAFeatureFlags(nextMap);
      triggerNotice(
        mode === 'resume_all'
          ? 'All platform features resumed and live.'
          : 'All Student Hub modules paused.'
      );
    } finally {
      setIsSavingFeatures(false);
    }
  };

  // --- Cross-Persona Reminder Handlers ---
  const matchingEmailRecipients = allRegisteredUsers
    .filter((u) => {
      if (!u.email || !u.email.includes('@')) return false;
      if (reminderTargetRole === 'all') return true;
      return u.role === reminderTargetRole;
    })
    .map((u) => ({
      email: u.email,
      name: u.fullName,
      role: u.role
    }));

  const handleSendPersonaReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reminderTitle.trim() || !reminderMessage.trim()) return;
    setIsSendingReminder(true);
    try {
      const notifId = `notif_ota_${Date.now()}`;
      if (sendInAppInbox) {
        await publishPersonaNotification({
          id: notifId,
          targetRole: reminderTargetRole,
          title: reminderTitle.trim(),
          message: reminderMessage.trim(),
          category: reminderCategory,
          actionLabel: reminderActionLabel.trim() || undefined,
          actionTarget: reminderActionTarget || undefined,
          createdAt: new Date().toISOString(),
          createdBy: currentUserProfile?.email || 'super_admin'
        });
      }

      if (sendBrowserPush) {
        await triggerBrowserNotification({
          title: reminderTitle.trim(),
          body: reminderMessage.trim(),
          tag: notifId,
          actionTarget: reminderActionTarget
        });
      }

      let emailNotice = '';
      if (sendEmailDigest) {
        if (matchingEmailRecipients.length === 0) {
          emailNotice = ' No matching accounts had a valid email for digest.';
        } else {
          const emailRes = await dispatchEmailDigest({
            recipients: matchingEmailRecipients,
            subject: reminderTitle.trim(),
            title: reminderTitle.trim(),
            message: reminderMessage.trim(),
            actionLabel: reminderActionLabel.trim() || 'Open Student Companion',
            adminEmail: currentUserProfile?.email || 'martorefe@gmail.com'
          });
          emailNotice = emailRes.success
            ? ` Email digest delivered to ${emailRes.sentCount ?? matchingEmailRecipients.length} account(s) via ${emailRes.provider}.`
            : ` Email digest notice: ${emailRes.error}`;
        }
      }

      setReminderTitle('');
      setReminderMessage('');
      triggerNotice(`Reminder dispatched to ${reminderTargetRole.replace('_', ' ')} audience.${emailNotice}`);
    } finally {
      setIsSendingReminder(false);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    await deletePersonaNotification(id);
    triggerNotice('Published reminder removed.');
  };

  // --- Ticker Handlers ---
  const handleAddTickerItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTickerText.trim()) return;

    const newItem: OTABroadcastItem = {
      id: `broadcast_${Date.now()}`,
      text: newTickerText.trim(),
      category: newTickerCategory,
      priority: Number(newTickerPriority) || 5,
      isActive: true,
      actionTab: newTickerActionTab || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      await saveOTABroadcastItem(newItem);
      setNewTickerText('');
      triggerNotice('New broadcast item published over-the-air!');
    } catch (err: any) {
      triggerNotice(`Error publishing: ${err.message || 'Check connection'}`);
    }
  };

  const handleToggleTickerActive = async (item: OTABroadcastItem) => {
    try {
      await saveOTABroadcastItem({
        ...item,
        isActive: !item.isActive
      });
      triggerNotice(`Ticker item ${!item.isActive ? 'activated' : 'paused'}.`);
    } catch {
      triggerNotice('Failed to update ticker status.');
    }
  };

  const handleDeleteTicker = async (id: string) => {
    try {
      await deleteOTABroadcastItem(id);
      triggerNotice('Ticker item deleted.');
    } catch {
      triggerNotice('Failed to delete item.');
    }
  };

  // --- Popup Handlers ---
  const handleSavePopup = async () => {
    try {
      await saveOTAPopupAnnouncement(popupConfig);
      triggerNotice('Pop-up image announcement saved & broadcasted over-the-air!');
    } catch (err: any) {
      triggerNotice(`Failed to save popup: ${err.message || 'Error'}`);
    }
  };

  // --- Termly Competition Handlers ---
  const handleSaveCompetition = async () => {
    try {
      await saveOTACompetitionConfig(compConfig);
      triggerNotice('Termly Championship Arena updated live over-the-air!');
    } catch (err: any) {
      triggerNotice(`Failed to save competition config: ${err.message || 'Error'}`);
    }
  };

  // --- Weekly Competition Handlers ---
  const handleSaveWeekly = async () => {
    try {
      await saveOTAWeeklyCompetition(weeklyConfig);
      triggerNotice('Weekly Competition Challenge updated live over-the-air!');
    } catch (err: any) {
      triggerNotice(`Failed to save weekly competition: ${err.message || 'Error'}`);
    }
  };

  // --- School League Handlers ---
  const handleSaveLeague = async () => {
    try {
      await saveOTASchoolLeague(leagueConfig);
      triggerNotice('Inter-School League standings updated live over-the-air!');
    } catch (err: any) {
      triggerNotice(`Failed to save school league: ${err.message || 'Error'}`);
    }
  };

  const handleAddSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchoolName.trim()) return;

    const newSchool: OTASchoolLeagueSchool = {
      id: `sch_${Date.now()}`,
      name: newSchoolName.trim(),
      state: newSchoolState.trim(),
      points: Number(newSchoolPoints) || 100000,
      rank: leagueConfig.schools.length + 1,
      studentCount: 250,
      badge: 'Challenger'
    };

    const updatedSchools = [...leagueConfig.schools, newSchool].sort((a, b) => b.points - a.points);
    // Recalculate ranks
    const rankedSchools = updatedSchools.map((s, idx) => ({ ...s, rank: idx + 1 }));

    setLeagueConfig({
      ...leagueConfig,
      schools: rankedSchools
    });

    setNewSchoolName('');
    setNewSchoolPoints(120000);
    triggerNotice('School added to league roster. Click Save to publish.');
  };

  const handleDeleteSchool = (schoolId: string) => {
    const updated = leagueConfig.schools
      .filter(s => s.id !== schoolId)
      .map((s, idx) => ({ ...s, rank: idx + 1 }));

    setLeagueConfig({
      ...leagueConfig,
      schools: updated
    });
    triggerNotice('School removed from roster. Click Save to publish.');
  };

  return (
    <div className="w-full flex flex-col gap-5 p-4 sm:p-6 bg-[#08101E] text-slate-100 rounded-2xl border border-slate-800 shadow-xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-[#84E000] animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              OTA & Competition Arena Studio
            </h1>
            <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 border border-amber-600/60 px-2 py-0.5 rounded-full uppercase">
              Super Admin
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time control for app version upgrades, per-feature pause &amp; custom notice switches, cross-persona reminders, TV news tickers, pop-up flyers &amp; championships.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 shadow-inner">
          <div className={`w-2 h-2 rounded-full ${isFirebaseConnected ? 'bg-emerald-400' : 'bg-amber-400'}`} />
          <span>{isFirebaseConnected ? 'Live Cloud Sync' : 'Local Offline Sync'}</span>
        </div>
      </div>

      {/* Save Notification Toast */}
      {saveFeedback && (
        <div className="p-3 bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-lg animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#84E000] shrink-0" />
          <span className="font-semibold">{saveFeedback}</span>
        </div>
      )}

      {/* Master Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 p-1.5 bg-slate-900/80 rounded-xl border border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab('app_updates')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'app_updates'
              ? 'bg-[#14233C] text-[#84E000] shadow-sm border border-[#223B63]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ArrowUpCircle className="w-3.5 h-3.5 shrink-0" />
          <span>App Updates</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('feature_toggles')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'feature_toggles'
              ? 'bg-[#14233C] text-[#84E000] shadow-sm border border-[#223B63]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <PauseCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Feature Toggles</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('reminders')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'reminders'
              ? 'bg-[#14233C] text-[#84E000] shadow-sm border border-[#223B63]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BellRing className="w-3.5 h-3.5 shrink-0" />
          <span>Reminders &amp; Push</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ticker')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'ticker'
              ? 'bg-[#14233C] text-[#84E000] shadow-sm border border-[#223B63]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Tv className="w-3.5 h-3.5 shrink-0" />
          <span>TV News Ticker</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('popup')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'popup'
              ? 'bg-[#14233C] text-[#84E000] shadow-sm border border-[#223B63]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5 shrink-0" />
          <span>Pop-Up Flyer</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('competition')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'competition'
              ? 'bg-[#14233C] text-[#84E000] shadow-sm border border-[#223B63]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Trophy className="w-3.5 h-3.5 shrink-0" />
          <span>Competitions</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 0A: OTA APP UPDATES, FEATURES & VERSION UPGRADE GATE */}
      {/* ========================================================================= */}
      {activeTab === 'app_updates' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 p-4 sm:p-5 bg-slate-900/70 border border-slate-800 rounded-xl flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <ArrowUpCircle className="w-4 h-4 text-[#84E000]" />
                  <span>App Version Upgrade &amp; OTA Rollout</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5 font-mono tabular-nums">
                  Current client build: v{appVersion} · Published target: v{otaAppRelease.latestVersion}
                </p>
              </div>

              <label className="flex items-center gap-2 text-xs font-bold text-slate-200 cursor-pointer bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                <input
                  type="checkbox"
                  checked={releaseDraft.isActive}
                  onChange={(e) => setReleaseDraft({ ...releaseDraft, isActive: e.target.checked })}
                  className="rounded text-[#84E000] bg-slate-900"
                />
                <span>Rollout Active</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-slate-300 font-semibold">Latest Version (Semver)</label>
                <input
                  type="text"
                  value={releaseDraft.latestVersion}
                  onChange={(e) => setReleaseDraft({ ...releaseDraft, latestVersion: e.target.value })}
                  placeholder="e.g. 2.5.0"
                  className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-slate-300 font-semibold">Minimum Supported Version</label>
                <input
                  type="text"
                  value={releaseDraft.minimumSupportedVersion}
                  onChange={(e) =>
                    setReleaseDraft({ ...releaseDraft, minimumSupportedVersion: e.target.value })
                  }
                  placeholder="e.g. 2.0.0"
                  className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono"
                />
              </div>
            </div>

            {/* Enforcement Mode Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                User Upgrade Prompt Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setReleaseDraft({ ...releaseDraft, upgradeMode: 'mild_notice' as OTAUpgradeMode })
                  }
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    releaseDraft.upgradeMode === 'mild_notice'
                      ? 'bg-[#14233C] border-[#84E000] shadow-md'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Mild In-App Notice</span>
                    <span className="text-[10px] font-mono text-[#84E000]">Dismissible</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Shows a clean top banner and inbox notification with an Upgrade button. Users can dismiss and keep using the app.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setReleaseDraft({ ...releaseDraft, upgradeMode: 'force_blocking' as OTAUpgradeMode })
                  }
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    releaseDraft.upgradeMode === 'force_blocking'
                      ? 'bg-[#2A140B] border-[#FF5B00] shadow-md'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Mandatory Blocking Gate</span>
                    <span className="text-[10px] font-mono text-[#FF5B00]">Required</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Blocks all standard user screens until they click Upgrade to update to the latest version. Super Admins retain bypass.
                  </p>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1 text-xs">
              <label className="text-slate-300 font-semibold">Update Headline</label>
              <input
                type="text"
                value={releaseDraft.releaseTitle}
                onChange={(e) => setReleaseDraft({ ...releaseDraft, releaseTitle: e.target.value })}
                className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                placeholder="e.g. Student Companion v2.5.0 — Live Mock & Voice Update"
              />
            </div>

            <div className="flex flex-col gap-1 text-xs">
              <label className="text-slate-300 font-semibold">Release Summary / Notes</label>
              <textarea
                value={releaseDraft.changelog}
                onChange={(e) => setReleaseDraft({ ...releaseDraft, changelog: e.target.value })}
                rows={2}
                className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white resize-y"
              />
            </div>

            <div className="flex flex-col gap-1 text-xs">
              <label className="text-slate-300 font-semibold">
                Feature Highlights (One bullet per line)
              </label>
              <textarea
                value={highlightsText}
                onChange={(e) => setHighlightsText(e.target.value)}
                rows={3}
                className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-sans resize-y"
                placeholder="New WAEC/JAMB Physics simulations&#10;Faster CBT engine offline caching"
              />
            </div>

            <div className="flex flex-col gap-1 text-xs">
              <label className="text-slate-300 font-semibold">
                Optional Store or APK Download URL
              </label>
              <input
                type="url"
                value={releaseDraft.upgradeUrl || ''}
                onChange={(e) => setReleaseDraft({ ...releaseDraft, upgradeUrl: e.target.value })}
                placeholder="https://play.google.com/store/apps/details?id=..."
                className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono"
              />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
              {releaseDraft.isActive && (
                <button
                  type="button"
                  disabled={isSavingRelease}
                  onClick={() => void handleSaveAppRelease(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold cursor-pointer"
                >
                  Deactivate Rollout
                </button>
              )}
              <button
                type="button"
                disabled={isSavingRelease}
                onClick={() => void handleSaveAppRelease(true)}
                className="px-5 py-2.5 rounded-xl bg-[#84E000] hover:bg-[#74c700] text-slate-950 text-xs font-black flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>{isSavingRelease ? 'Publishing...' : 'Publish App Update Live OTA'}</span>
              </button>
            </div>
          </div>

          {/* Right Live Preview Card */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Live Rollout Preview
            </h3>
            <div className="p-5 bg-[#060C18] border border-slate-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-mono text-slate-400">
                  Mode: <strong className="text-white">{releaseDraft.upgradeMode === 'force_blocking' ? 'Mandatory Gate' : 'Mild Banner'}</strong>
                </span>
                <span
                  className={`font-bold text-[11px] px-2 py-0.5 rounded border ${
                    releaseDraft.isActive
                      ? 'bg-emerald-950/80 border-emerald-600/60 text-[#84E000]'
                      : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  {releaseDraft.isActive ? 'Rollout Active' : 'Draft / Inactive'}
                </span>
              </div>

              <div className="bg-[#0B1526] border border-[#223B63] rounded-2xl p-4 space-y-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#FF5B00]">
                  {releaseDraft.upgradeMode === 'force_blocking' ? 'Required App Update' : 'Update Available'} · v{releaseDraft.latestVersion || appVersion}
                </div>
                <h4 className="text-sm font-black text-white leading-snug">
                  {releaseDraft.releaseTitle || 'New Version Ready'}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {releaseDraft.changelog}
                </p>

                <div className="pt-1 space-y-2">
                  <div className="w-full py-2 rounded-lg bg-[#FF5B00] text-white font-black text-xs text-center">
                    Upgrade &amp; Reload to v{releaseDraft.latestVersion || appVersion}
                  </div>
                  {releaseDraft.upgradeUrl?.trim() && (
                    <div className="w-full py-1.5 rounded-lg bg-[#14233C] border border-[#223B63] text-[#84E000] font-bold text-[11px] flex items-center justify-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      <span>External Store / APK Link Attached</span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                Tip: To test the prompt right away, set <strong>Latest Version</strong> higher than <span className="font-mono text-slate-200">{appVersion}</span> (e.g. <span className="font-mono text-[#84E000]">2.5.0</span>) and publish.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 0B: PER-FEATURE PAUSE & CUSTOM NOTICE CONTROL */}
      {/* ========================================================================= */}
      {activeTab === 'feature_toggles' && (
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <PauseCircle className="w-4 h-4 text-amber-400" />
                <span>Feature Pause &amp; Custom Notice Controls</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Pause any individual feature with your own custom badge, headline, and message. Leave fields blank to use a neutral Paused notice; Super Admins retain bypass.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={isSavingFeatures}
                onClick={() => void handleBulkFeatureState('resume_all')}
                className="px-3 py-1.5 rounded-lg bg-[#84E000] hover:bg-[#75C800] text-slate-950 text-xs font-black flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Resume All</span>
              </button>
              <button
                type="button"
                disabled={isSavingFeatures}
                onClick={() => void handleBulkFeatureState('pause_student_hubs')}
                className="px-3 py-1.5 rounded-lg bg-amber-950/90 hover:bg-amber-900 border border-amber-600/70 text-amber-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Student Hubs</span>
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {(['All', 'Student Hub', 'Persona Portal', 'Core Service'] as const).map((cat) => {
              const allFlags = Object.values(featureDrafts);
              const count = cat === 'All' ? allFlags.length : allFlags.filter((f) => f.category === cat).length;
              const pausedCount = (cat === 'All' ? allFlags : allFlags.filter((f) => f.category === cat)).filter(
                (f) => f.isPaused
              ).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFeatureCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    featureCategoryFilter === cat
                      ? 'bg-[#14233C] border-[#84E000] text-[#84E000]'
                      : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="font-mono tabular-nums text-[10px] text-slate-400">
                    ({count}{pausedCount > 0 ? ` · ${pausedCount} paused` : ''})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(Object.values(featureDrafts) as OTAFeatureFlag[])
              .filter((f) => featureCategoryFilter === 'All' || f.category === featureCategoryFilter)
              .map((flag) => (
                <div
                  key={flag.featureKey}
                  className={`p-4 rounded-xl border transition-colors flex flex-col gap-3 ${
                    flag.isPaused
                      ? 'bg-amber-950/20 border-amber-500/60'
                      : 'bg-slate-900/70 border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 flex-wrap">
                        <span className="font-semibold text-slate-300">{flag.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-slate-500">{flag.featureKey}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white mt-0.5">{flag.label}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{flag.description}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => void handleToggleFeaturePause(flag.featureKey)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black border flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors ${
                        flag.isPaused
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-300'
                          : 'bg-emerald-950/80 hover:bg-emerald-900 text-[#84E000] border-emerald-600/60'
                      }`}
                    >
                      {flag.isPaused ? (
                        <>
                          <PauseCircle className="w-3.5 h-3.5" />
                          <span>Paused</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Active</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Custom Notice Details */}
                  <div className="pt-2.5 border-t border-slate-800/80 flex flex-col gap-2 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        maxLength={40}
                        value={flag.customBadge || ''}
                        onChange={(e) =>
                          setFeatureDrafts((prev) => ({
                            ...prev,
                            [flag.featureKey]: { ...flag, customBadge: e.target.value }
                          }))
                        }
                        placeholder="Badge label (e.g. Term Break)"
                        className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs placeholder:text-slate-500"
                      />
                      <input
                        type="text"
                        maxLength={120}
                        value={flag.customTitle || ''}
                        onChange={(e) =>
                          setFeatureDrafts((prev) => ({
                            ...prev,
                            [flag.featureKey]: { ...flag, customTitle: e.target.value }
                          }))
                        }
                        placeholder={`Custom headline (default: ${flag.label})`}
                        className="sm:col-span-2 px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs placeholder:text-slate-500"
                      />
                    </div>

                    <textarea
                      rows={2}
                      maxLength={500}
                      value={flag.pauseReason || ''}
                      onChange={(e) =>
                        setFeatureDrafts((prev) => ({
                          ...prev,
                          [flag.featureKey]: { ...flag, pauseReason: e.target.value }
                        }))
                      }
                      placeholder="Custom message shown to users when paused (leave blank for neutral Paused fallback)..."
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs placeholder:text-slate-500 resize-y min-h-[54px]"
                    />

                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        maxLength={100}
                        value={flag.estimatedResume || ''}
                        onChange={(e) =>
                          setFeatureDrafts((prev) => ({
                            ...prev,
                            [flag.featureKey]: { ...flag, estimatedResume: e.target.value }
                          }))
                        }
                        placeholder="Optional ETA e.g. Friday 9:00 AM"
                        className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs placeholder:text-slate-500"
                      />
                      {(flag.customBadge || flag.customTitle || flag.pauseReason || flag.estimatedResume) && (
                        <button
                          type="button"
                          onClick={() => void handleClearFeatureDraftDetails(flag.featureKey)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white text-[11px] font-semibold cursor-pointer shrink-0"
                          title="Clear custom badge, headline, message, and ETA"
                        >
                          Clear
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => void handleSaveFeatureDraftDetails(flag.featureKey)}
                        className="px-3 py-1.5 rounded-lg bg-[#14233C] hover:bg-[#1D3254] border border-[#223B63] text-[#84E000] text-[11px] font-bold cursor-pointer shrink-0"
                        title="Save custom notice text"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 0C: CROSS-PERSONA REMINDERS, BROWSER PUSH & EMAIL DIGESTS */}
      {/* ========================================================================= */}
      {activeTab === 'reminders' && (
        <div className="flex flex-col gap-5">
          <form
            onSubmit={handleSendPersonaReminder}
            className="p-4 sm:p-5 bg-slate-900/70 border border-slate-800 rounded-xl flex flex-col gap-4"
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <BellRing className="w-4 h-4 text-[#FF5B00]" />
                <h2 className="text-sm font-bold text-white">
                  Send Engagement Reminder &amp; Re-Activation Campaign
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {matchingEmailRecipients.length} matching registered email(s)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-slate-300 font-semibold">Target Persona</label>
                <select
                  value={reminderTargetRole}
                  onChange={(e) => setReminderTargetRole(e.target.value as 'all' | UserRole)}
                  className="px-2.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                >
                  <option value="all">All Personas</option>
                  <option value="student">Students</option>
                  <option value="parent">Parents / Guardians</option>
                  <option value="tutor">Tutors</option>
                  <option value="growth_partner">Growth Partners</option>
                  <option value="school_admin">School Admins</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-slate-300 font-semibold">Category</label>
                <select
                  value={reminderCategory}
                  onChange={(e) => setReminderCategory(e.target.value as PersonaNotificationCategory)}
                  className="px-2.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                >
                  <option value="study_reminder">Study Reminder</option>
                  <option value="streak_alert">Streak Protection Alert</option>
                  <option value="ota_update">App Update Notice</option>
                  <option value="parent_alert">Parent / Ward Update</option>
                  <option value="tutor_activity">Tutor Marketplace Alert</option>
                  <option value="partner_earnings">Growth Partner Payout</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-slate-300 font-semibold">CTA Button Label</label>
                <input
                  type="text"
                  value={reminderActionLabel}
                  onChange={(e) => setReminderActionLabel(e.target.value)}
                  className="px-2.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  placeholder="e.g. Start Quick Drill"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-slate-300 font-semibold">Target Hub / Action</label>
                <select
                  value={reminderActionTarget}
                  onChange={(e) => setReminderActionTarget(e.target.value)}
                  className="px-2.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                >
                  <option value="cbt">CBT Quizzes</option>
                  <option value="syllabus">Lesson Notes &amp; Syllabus</option>
                  <option value="ai-coach">AI Study Coach</option>
                  <option value="competitions">Competitions Arena</option>
                  <option value="games">Games Hub</option>
                  <option value="tutors">Tutor Marketplace</option>
                  <option value="exam-prep">Prepare For Exam</option>
                  <option value="dashboard">Persona Home Dashboard</option>
                  <option value="ota_upgrade">Trigger App Upgrade</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1 text-xs">
              <label className="text-slate-300 font-semibold">Notification Title</label>
              <input
                type="text"
                value={reminderTitle}
                onChange={(e) => setReminderTitle(e.target.value)}
                required
                placeholder="e.g. Weekend WAEC & Mathematics Speed Challenge Opens Tonight!"
                className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
              />
            </div>

            <div className="flex flex-col gap-1 text-xs">
              <label className="text-slate-300 font-semibold">Reminder Message</label>
              <textarea
                value={reminderMessage}
                onChange={(e) => setReminderMessage(e.target.value)}
                required
                rows={3}
                placeholder="Jump back into Student Companion for 10 minutes today to keep your study streak alive and claim +100 XP."
                className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white resize-y"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendInAppInbox}
                    onChange={(e) => setSendInAppInbox(e.target.checked)}
                    className="rounded text-[#84E000] bg-slate-950"
                  />
                  <span>In-App Notification Inbox</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendBrowserPush}
                    onChange={(e) => setSendBrowserPush(e.target.checked)}
                    className="rounded text-[#84E000] bg-slate-950"
                  />
                  <span>Browser Push Alert</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendEmailDigest}
                    onChange={(e) => setSendEmailDigest(e.target.checked)}
                    className="rounded text-[#FF5B00] bg-slate-950"
                  />
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#FF5B00]" />
                    <span>Email Digest Campaign ({matchingEmailRecipients.length})</span>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSendingReminder}
                className="px-5 py-2.5 bg-[#FF5B00] hover:bg-[#E04F00] text-white font-black text-xs rounded-xl flex items-center gap-2 shadow-md cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSendingReminder ? 'Dispatching...' : 'Send Reminder Now'}</span>
              </button>
            </div>
          </form>

          {/* Published Reminders History */}
          <div className="flex flex-col gap-2.5">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Active Persona Reminders &amp; Alerts ({personaNotifications.length})</span>
              <span className="text-xs text-slate-400 font-normal">Synced to all matching user inboxes</span>
            </h3>

            <div className="space-y-2">
              {personaNotifications.slice(0, 15).map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-start justify-between gap-3 text-xs"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 flex-wrap">
                      <span className="font-bold text-[#84E000] uppercase">{item.targetRole.replace('_', ' ')}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.category.replace('_', ' ')}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{new Date(item.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="font-bold text-white">{item.title}</div>
                    <div className="text-slate-300">{item.message}</div>
                  </div>

                  {!item.id.startsWith('smart_') && (
                    <button
                      type="button"
                      onClick={() => void handleDeleteNotification(item.id)}
                      className="p-1.5 rounded text-rose-400 hover:text-white hover:bg-rose-950/60 cursor-pointer shrink-0"
                      title="Delete published reminder"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: TV BROADCAST NEWS TICKER */}
      {/* ========================================================================= */}
      {activeTab === 'ticker' && (
        <div className="flex flex-col gap-6">
          <form
            onSubmit={handleAddTickerItem}
            className="p-4 sm:p-5 bg-slate-900/70 border border-slate-800 rounded-xl flex flex-col gap-4"
          >
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#84E000]" />
              <h2 className="text-sm font-bold text-white">Broadcast New Ticker Message</h2>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Message Text (Displayed on continuous scrolling banner)
              </label>
              <input
                type="text"
                value={newTickerText}
                onChange={(e) => setNewTickerText(e.target.value)}
                placeholder="e.g. 🏆 Term 1 Championship registrations are open! Enter to win brand new smartphone..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#84E000]"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-slate-300 font-semibold">Category</label>
                <select
                  value={newTickerCategory}
                  onChange={(e) => setNewTickerCategory(e.target.value as OTABroadcastCategory)}
                  className="px-2.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                >
                  <option value="championship">Tourney / Championship</option>
                  <option value="academic">Academic / Syllabus</option>
                  <option value="urgent">Breaking / Alert</option>
                  <option value="spotlight">Leaderboard / School</option>
                  <option value="general">General Notice</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-slate-300 font-semibold">Priority (Higher = First)</label>
                <input
                  type="number"
                  value={newTickerPriority}
                  onChange={(e) => setNewTickerPriority(Number(e.target.value))}
                  min={1}
                  max={99}
                  className="px-2.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-slate-300 font-semibold">Action Tab Link</label>
                <select
                  value={newTickerActionTab}
                  onChange={(e) => setNewTickerActionTab(e.target.value)}
                  className="px-2.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                >
                  <option value="competitions">Competition Arena</option>
                  <option value="cbt">CBT Examination Hub</option>
                  <option value="aspirant-cbt">JAMB & Past Questions</option>
                  <option value="dashboard">Student Dashboard</option>
                  <option value="games">Relaxation & Games</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-4 py-2 bg-[#84E000] hover:bg-[#74c700] text-slate-950 font-black text-xs rounded-lg flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Publish to Live Broadcast Ticker</span>
              </button>
            </div>
          </form>

          {/* Active Ticker Items */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Active Broadcast Ticker Items ({broadcastItems.length})</span>
              <span className="text-xs text-slate-400 font-normal">Real-Time Sync</span>
            </h2>

            <div className="flex flex-col gap-2">
              {broadcastItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors ${
                    item.isActive
                      ? 'bg-slate-900/60 border-slate-800'
                      : 'bg-slate-950/40 border-slate-900 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-2.5 flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 shrink-0">
                      {item.category}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-100 font-medium truncate">
                        {item.text}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                        <span>Priority: {item.priority}</span>
                        {item.actionTab && <span>Links to: {item.actionTab}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleToggleTickerActive(item)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold border cursor-pointer transition-colors ${
                        item.isActive
                          ? 'bg-emerald-950/70 border-emerald-600/60 text-[#84E000]'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      {item.isActive ? 'Active' : 'Paused'}
                    </button>
                    <button
                      onClick={() => handleDeleteTicker(item.id)}
                      className="p-1.5 rounded text-rose-400 hover:text-white hover:bg-rose-950/60 transition-colors cursor-pointer"
                      title="Delete Ticker Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: POP-UP FLYER ANNOUNCEMENTS (WITH DEVICE IMAGE UPLOAD) */}
      {/* ========================================================================= */}
      {activeTab === 'popup' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-4 sm:p-5 bg-slate-900/70 border border-slate-800 rounded-xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#84E000]" />
                <h2 className="text-sm font-bold text-white">Pop-Up Image Announcement Setup</h2>
              </div>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={popupConfig.isActive}
                  onChange={(e) => setPopupConfig({ ...popupConfig, isActive: e.target.checked })}
                  className="rounded text-[#84E000] focus:ring-[#84E000] bg-slate-950"
                />
                <span>Active over-the-air</span>
              </label>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300">Announcement Headline</label>
              <input
                type="text"
                value={popupConfig.title}
                onChange={(e) => setPopupConfig({ ...popupConfig, title: e.target.value })}
                className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                placeholder="e.g. Term 1 National Championship Arena"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300">Subtitle</label>
              <input
                type="text"
                value={popupConfig.subtitle || ''}
                onChange={(e) => setPopupConfig({ ...popupConfig, subtitle: e.target.value })}
                className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                placeholder="e.g. Win an Android Smartphone & Custom Scholar Hoodie"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300">Badge Text</label>
              <input
                type="text"
                value={popupConfig.badge || ''}
                onChange={(e) => setPopupConfig({ ...popupConfig, badge: e.target.value })}
                className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                placeholder="e.g. National Tournament 🏆"
              />
            </div>

            {/* Direct Device Image Uploader Component */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Flyer Image Graphic (Device Local Upload, Presets or URL)</span>
                <span className="text-[10px] text-emerald-400 font-mono">Auto-compressed</span>
              </label>
              <DeviceImageUploader
                currentImageUrl={popupConfig.imageUrl}
                onImageChange={(url) => setPopupConfig({ ...popupConfig, imageUrl: url })}
                presets={PRESET_FLYER_IMAGES}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300">Announcement Body (Multi-line)</label>
              <textarea
                value={popupConfig.body}
                onChange={(e) => setPopupConfig({ ...popupConfig, body: e.target.value })}
                rows={3}
                className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white resize-y"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-slate-300 font-semibold">CTA Button Label</label>
                <input
                  type="text"
                  value={popupConfig.ctaText}
                  onChange={(e) => setPopupConfig({ ...popupConfig, ctaText: e.target.value })}
                  className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-slate-300 font-semibold">CTA Target Tab</label>
                <select
                  value={popupConfig.ctaTargetTab}
                  onChange={(e) => setPopupConfig({ ...popupConfig, ctaTargetTab: e.target.value })}
                  className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                >
                  <option value="competitions">Competition Arena</option>
                  <option value="cbt">CBT Examination Hub</option>
                  <option value="aspirant-cbt">JAMB & Past Questions</option>
                  <option value="dashboard">Student Dashboard</option>
                  <option value="games">Relaxation Games</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSavePopup}
              className="mt-2 py-2.5 px-4 bg-[#84E000] hover:bg-[#74c700] text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save & Broadcast Pop-Up Announcement</span>
            </button>
          </div>

          {/* Student Mockup Preview */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Student Screen Preview
            </h3>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center">
              <div className="w-full max-w-sm bg-[#0A1220] border border-[#1E2D4A] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                <div className="relative w-full h-36 bg-slate-900 shrink-0">
                  <img
                    src={popupConfig.imageUrl}
                    alt={popupConfig.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1220] via-transparent to-black/30" />
                  {popupConfig.badge && (
                    <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-[#0F1E36]/90 border border-[#84E000]/50 text-[#84E000] text-[10px] font-bold">
                      {popupConfig.badge}
                    </div>
                  )}
                </div>

                <div className="p-3.5 flex flex-col gap-2">
                  <h4 className="text-sm font-black text-white">{popupConfig.title}</h4>
                  {popupConfig.subtitle && (
                    <p className="text-[11px] font-semibold text-[#84E000]">{popupConfig.subtitle}</p>
                  )}
                  <p className="text-[11px] text-slate-300 line-clamp-3 leading-relaxed whitespace-pre-line">
                    {popupConfig.body}
                  </p>

                  <div className="pt-1">
                    <div className="w-full py-2 rounded-lg bg-gradient-to-r from-[#84E000] to-[#60A5FA] text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow">
                      <span>{popupConfig.ctaText}</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: STUDENT COMPETITION ARENA LIVE SUITE (TERMLY, WEEKLY, SCHOOLS) */}
      {/* ========================================================================= */}
      {activeTab === 'competition' && (
        <div className="flex flex-col gap-5">
          {/* Sub-tab Switcher */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <button
              onClick={() => setCompSubTab('termly')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                compSubTab === 'termly'
                  ? 'bg-amber-950/80 text-amber-300 border border-amber-600/60'
                  : 'text-slate-400 hover:text-white bg-slate-900/60'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>3-Day Termly Championship</span>
            </button>

            <button
              onClick={() => setCompSubTab('weekly')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                compSubTab === 'weekly'
                  ? 'bg-amber-950/80 text-amber-300 border border-amber-600/60'
                  : 'text-slate-400 hover:text-white bg-slate-900/60'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Weekly Speed Challenge</span>
            </button>

            <button
              onClick={() => setCompSubTab('schools')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                compSubTab === 'schools'
                  ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-600/60'
                  : 'text-slate-400 hover:text-white bg-slate-900/60'
              }`}
            >
              <School className="w-3.5 h-3.5" />
              <span>Inter-School League</span>
            </button>
          </div>

          {/* 3A: TERMLY CHAMPIONSHIP */}
          {compSubTab === 'termly' && (
            <div className="flex flex-col gap-6">
              <div className="p-4 sm:p-5 bg-slate-900/70 border border-slate-800 rounded-xl flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#84E000]" />
                    <h2 className="text-sm font-bold text-white">Championship Arena General Settings</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-semibold">Championship Title</label>
                    <input
                      type="text"
                      value={compConfig.termTitle}
                      onChange={(e) => setCompConfig({ ...compConfig, termTitle: e.target.value })}
                      className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-semibold">Academic Session</label>
                    <input
                      type="text"
                      value={compConfig.academicSession}
                      onChange={(e) => setCompConfig({ ...compConfig, academicSession: e.target.value })}
                      className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-semibold">Registration Fee (Naira ₦)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-bold">
                        <NairaSign />
                      </div>
                      <input
                        type="number"
                        value={compConfig.registrationFeeNaira}
                        onChange={(e) => setCompConfig({ ...compConfig, registrationFeeNaira: Number(e.target.value) })}
                        className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-semibold">Registration Deadline</label>
                    <input
                      type="text"
                      value={compConfig.registrationDeadline}
                      onChange={(e) => setCompConfig({ ...compConfig, registrationDeadline: e.target.value })}
                      className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-semibold">Tournament Start Date</label>
                    <input
                      type="text"
                      value={compConfig.tournamentStartDate}
                      onChange={(e) => setCompConfig({ ...compConfig, tournamentStartDate: e.target.value })}
                      className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-semibold">Tournament End Date</label>
                    <input
                      type="text"
                      value={compConfig.tournamentEndDate}
                      onChange={(e) => setCompConfig({ ...compConfig, tournamentEndDate: e.target.value })}
                      className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                </div>
              </div>

              {/* 3 Prizes */}
              <div className="p-4 sm:p-5 bg-slate-900/70 border border-slate-800 rounded-xl flex flex-col gap-4">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#84E000]" />
                  <span>National Championship Prizes Configuration</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {compConfig.prizes.map((prize, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-2.5 text-xs"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="font-extrabold text-[#84E000]">{prize.badge}</span>
                        <span className="text-slate-400 font-mono text-[11px]">Rank #{prize.rank}</span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-slate-400 font-medium">Prize Title</label>
                        <input
                          type="text"
                          value={prize.title}
                          onChange={(e) => {
                            const updated = [...compConfig.prizes];
                            updated[idx] = { ...prize, title: e.target.value };
                            setCompConfig({ ...compConfig, prizes: updated });
                          }}
                          className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-slate-400 font-medium">Subtitle / Highlights</label>
                        <input
                          type="text"
                          value={prize.subtitle}
                          onChange={(e) => {
                            const updated = [...compConfig.prizes];
                            updated[idx] = { ...prize, subtitle: e.target.value };
                            setCompConfig({ ...compConfig, prizes: updated });
                          }}
                          className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-slate-400 font-medium">Naira Cash Equivalent (₦)</label>
                        <input
                          type="number"
                          value={prize.valueNaira}
                          onChange={(e) => {
                            const updated = [...compConfig.prizes];
                            updated[idx] = { ...prize, valueNaira: Number(e.target.value) };
                            setCompConfig({ ...compConfig, prizes: updated });
                          }}
                          className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-slate-400 font-medium">Technical Specification</label>
                        <textarea
                          value={prize.specification}
                          onChange={(e) => {
                            const updated = [...compConfig.prizes];
                            updated[idx] = { ...prize, specification: e.target.value };
                            setCompConfig({ ...compConfig, prizes: updated });
                          }}
                          rows={3}
                          className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white text-[11px] resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-end">
                <button
                  onClick={handleSaveCompetition}
                  className="py-2.5 px-6 bg-[#84E000] hover:bg-[#74c700] text-slate-950 font-black text-xs rounded-xl flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save & Publish Termly Championship</span>
                </button>
              </div>
            </div>
          )}

          {/* 3B: WEEKLY CHALLENGE */}
          {compSubTab === 'weekly' && (
            <div className="flex flex-col gap-6">
              <div className="p-4 sm:p-5 bg-slate-900/70 border border-slate-800 rounded-xl flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <h2 className="text-sm font-bold text-white">Weekly Speed Challenge Configuration</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-semibold">Challenge Title</label>
                    <input
                      type="text"
                      value={weeklyConfig.title}
                      onChange={(e) => setWeeklyConfig({ ...weeklyConfig, title: e.target.value })}
                      className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-semibold">Week Label</label>
                    <input
                      type="text"
                      value={weeklyConfig.weekLabel}
                      onChange={(e) => setWeeklyConfig({ ...weeklyConfig, weekLabel: e.target.value })}
                      className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-semibold">Countdown / Close Status</label>
                    <input
                      type="text"
                      value={weeklyConfig.countdownLabel}
                      onChange={(e) => setWeeklyConfig({ ...weeklyConfig, countdownLabel: e.target.value })}
                      className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                      placeholder="e.g. Closes in 2d 14h 20m"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-semibold">Featured Speed CBT Exam</label>
                    <select
                      value={weeklyConfig.featuredExamId}
                      onChange={(e) => {
                        const selectedExam = CBT_EXAMS_DATABASE.find(ex => ex.id === e.target.value);
                        setWeeklyConfig({
                          ...weeklyConfig,
                          featuredExamId: e.target.value,
                          featuredExamTitle: selectedExam?.title || 'Selected Speed Exam'
                        });
                      }}
                      className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    >
                      {CBT_EXAMS_DATABASE.map(ex => (
                        <option key={ex.id} value={ex.id}>
                          {ex.title} ({ex.subject} · {ex.classLevel})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-xs">
                  <label className="text-slate-300 font-semibold">Description & Instructions</label>
                  <textarea
                    value={weeklyConfig.description}
                    onChange={(e) => setWeeklyConfig({ ...weeklyConfig, description: e.target.value })}
                    rows={3}
                    className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white resize-y text-xs"
                  />
                </div>
              </div>

              {/* Weekly Prize Breakdown */}
              <div className="p-4 sm:p-5 bg-slate-900/70 border border-slate-800 rounded-xl flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-[#84E000]" />
                    <h2 className="text-sm font-bold text-white">Weekly Cash & Airtime Prize Pool</h2>
                  </div>
                  <div className="text-xs font-mono font-bold text-[#84E000] bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-600/50">
                    Total Pool: <NairaText amount={weeklyConfig.totalPrizePoolNaira} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {/* 1st */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-2">
                    <span className="font-extrabold text-amber-400">🥇 1st Place</span>
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-400">Cash / Airtime (₦)</label>
                      <input
                        type="number"
                        value={weeklyConfig.firstPrize.valueNaira}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setWeeklyConfig({
                            ...weeklyConfig,
                            firstPrize: { ...weeklyConfig.firstPrize, valueNaira: val },
                            totalPrizePoolNaira: val + weeklyConfig.secondPrize.valueNaira + weeklyConfig.thirdPrize.valueNaira
                          });
                        }}
                        className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-400">Extra Item / Perk</label>
                      <input
                        type="text"
                        value={weeklyConfig.firstPrize.extra || ''}
                        onChange={(e) => setWeeklyConfig({
                          ...weeklyConfig,
                          firstPrize: { ...weeklyConfig.firstPrize, extra: e.target.value }
                        })}
                        placeholder="e.g. + Custom Scholar Hoodie"
                        className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                      />
                    </div>
                  </div>

                  {/* 2nd */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-2">
                    <span className="font-extrabold text-slate-300">🥈 2nd Place</span>
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-400">Cash / Airtime (₦)</label>
                      <input
                        type="number"
                        value={weeklyConfig.secondPrize.valueNaira}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setWeeklyConfig({
                            ...weeklyConfig,
                            secondPrize: { ...weeklyConfig.secondPrize, valueNaira: val },
                            totalPrizePoolNaira: weeklyConfig.firstPrize.valueNaira + val + weeklyConfig.thirdPrize.valueNaira
                          });
                        }}
                        className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-400">Extra Item / Perk</label>
                      <input
                        type="text"
                        value={weeklyConfig.secondPrize.extra || ''}
                        onChange={(e) => setWeeklyConfig({
                          ...weeklyConfig,
                          secondPrize: { ...weeklyConfig.secondPrize, extra: e.target.value }
                        })}
                        placeholder="e.g. Airtime"
                        className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                      />
                    </div>
                  </div>

                  {/* 3rd */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-2">
                    <span className="font-extrabold text-amber-600">🥉 3rd Place</span>
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-400">Cash / Airtime (₦)</label>
                      <input
                        type="number"
                        value={weeklyConfig.thirdPrize.valueNaira}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setWeeklyConfig({
                            ...weeklyConfig,
                            thirdPrize: { ...weeklyConfig.thirdPrize, valueNaira: val },
                            totalPrizePoolNaira: weeklyConfig.firstPrize.valueNaira + weeklyConfig.secondPrize.valueNaira + val
                          });
                        }}
                        className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-400">Extra Item / Perk</label>
                      <input
                        type="text"
                        value={weeklyConfig.thirdPrize.extra || ''}
                        onChange={(e) => setWeeklyConfig({
                          ...weeklyConfig,
                          thirdPrize: { ...weeklyConfig.thirdPrize, extra: e.target.value }
                        })}
                        placeholder="e.g. Airtime"
                        className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-end">
                <button
                  onClick={handleSaveWeekly}
                  className="py-2.5 px-6 bg-[#84E000] hover:bg-[#74c700] text-slate-950 font-black text-xs rounded-xl flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save & Publish Weekly Competition</span>
                </button>
              </div>
            </div>
          )}

          {/* 3C: INTER-SCHOOL LEAGUE */}
          {compSubTab === 'schools' && (
            <div className="flex flex-col gap-6">
              <div className="p-4 sm:p-5 bg-slate-900/70 border border-slate-800 rounded-xl flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <School className="w-4 h-4 text-indigo-400" />
                  <h2 className="text-sm font-bold text-white">Inter-School League Season Settings</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-semibold">Season Title</label>
                    <input
                      type="text"
                      value={leagueConfig.seasonTitle}
                      onChange={(e) => setLeagueConfig({ ...leagueConfig, seasonTitle: e.target.value })}
                      className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-slate-300 font-semibold">Round / Week Label</label>
                    <input
                      type="text"
                      value={leagueConfig.roundLabel}
                      onChange={(e) => setLeagueConfig({ ...leagueConfig, roundLabel: e.target.value })}
                      className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-xs">
                  <label className="text-slate-300 font-semibold">Grand Award & STEM Lab Grant Description</label>
                  <textarea
                    value={leagueConfig.grandAwardDescription}
                    onChange={(e) => setLeagueConfig({ ...leagueConfig, grandAwardDescription: e.target.value })}
                    rows={2}
                    className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                  />
                </div>
              </div>

              {/* Add School to League Form */}
              <form
                onSubmit={handleAddSchool}
                className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-end gap-3 text-xs"
              >
                <div className="flex-1 flex flex-col gap-1 w-full">
                  <label className="text-slate-300 font-semibold">School Name</label>
                  <input
                    type="text"
                    value={newSchoolName}
                    onChange={(e) => setNewSchoolName(e.target.value)}
                    placeholder="e.g. Dennis Memorial Grammar School, Onitsha"
                    className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    required
                  />
                </div>

                <div className="w-full sm:w-36 flex flex-col gap-1">
                  <label className="text-slate-300 font-semibold">State</label>
                  <input
                    type="text"
                    value={newSchoolState}
                    onChange={(e) => setNewSchoolState(e.target.value)}
                    className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    required
                  />
                </div>

                <div className="w-full sm:w-32 flex flex-col gap-1">
                  <label className="text-slate-300 font-semibold">Points</label>
                  <input
                    type="number"
                    value={newSchoolPoints}
                    onChange={(e) => setNewSchoolPoints(Number(e.target.value))}
                    className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 bg-[#84E000] hover:bg-[#74c700] text-slate-950 font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add School</span>
                </button>
              </form>

              {/* League Standings Table */}
              <div className="p-4 sm:p-5 bg-slate-900/70 border border-slate-800 rounded-xl flex flex-col gap-3">
                <h3 className="text-sm font-bold text-white flex items-center justify-between">
                  <span>National League Standings ({leagueConfig.schools.length} Schools)</span>
                  <span className="text-xs text-slate-400 font-normal">Ranked by aggregate points</span>
                </h3>

                <div className="space-y-2">
                  {leagueConfig.schools.map((school, idx) => (
                    <div
                      key={school.id}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                          idx === 0
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            : idx === 1
                            ? 'bg-slate-400/20 text-slate-200 border border-slate-400/40'
                            : idx === 2
                            ? 'bg-amber-800/20 text-amber-600 border border-amber-800/40'
                            : 'bg-slate-900 text-slate-400'
                        }`}>
                          #{school.rank}
                        </span>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-white">{school.name}</h4>
                            {school.badge && (
                              <span className="text-[10px] bg-slate-900 px-1.5 py-0.2 rounded border border-slate-700 text-[#84E000]">
                                {school.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400">State: {school.state}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <label className="text-[11px] text-slate-400">Points:</label>
                          <input
                            type="number"
                            value={school.points}
                            onChange={(e) => {
                              const updated = [...leagueConfig.schools];
                              updated[idx] = { ...school, points: Number(e.target.value) };
                              updated.sort((a, b) => b.points - a.points);
                              const ranked = updated.map((s, i) => ({ ...s, rank: i + 1 }));
                              setLeagueConfig({ ...leagueConfig, schools: ranked });
                            }}
                            className="w-24 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-emerald-400 font-mono font-bold text-right"
                          />
                        </div>

                        <button
                          onClick={() => handleDeleteSchool(school.id)}
                          className="p-1.5 rounded text-rose-400 hover:text-white hover:bg-rose-950/60 transition-colors cursor-pointer"
                          title="Remove School"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-end">
                <button
                  onClick={handleSaveLeague}
                  className="py-2.5 px-6 bg-[#84E000] hover:bg-[#74c700] text-slate-950 font-black text-xs rounded-xl flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save & Publish Inter-School League</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
