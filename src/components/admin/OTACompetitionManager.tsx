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
  DEFAULT_PAUSED_FEATURE_MESSAGE,
  OTA_FEATURE_CATALOG,
  subscribeToOTAAppRelease,
  saveOTAAppRelease,
  bumpSemver,
  isValidSemver
} from '../../services/otaService';
import {
  OTABroadcastItem,
  OTAPopupAnnouncement,
  OTACompetitionConfig,
  OTAWeeklyCompetitionConfig,
  OTASchoolLeagueConfig,
  OTASchoolLeagueSchool,
  OTABroadcastCategory,
  OTAAppReleaseConfig,
  OTAUpgradeMode,
  OTAFeatureFlags,
  OTAFeatureKey
} from '../../types';
import { CBT_EXAMS_DATABASE } from '../../data/cbtExamData';
import { useApp } from '../../context/AppContext';
import { NairaText, NairaSign } from '../../utils/currency';
import { DeviceImageUploader } from './DeviceImageUploader';
import { OTAPushRemindersTab } from './OTAPushRemindersTab';
import { AppUpdateGate, AppUpdateGatePreviewOverride } from '../common/AppUpdateGate';
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
  Rocket,
  Lock,
  Bell,
  ArrowUpCircle,
  Eye,
  Sliders,
  Wrench,
  ShieldCheck,
  AlertTriangle,
  Search,
  PauseCircle,
  MessageSquare
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
    currentUserProfile,
    installedAppVersion,
    setLocalInstalledAppVersion
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'ticker' | 'popup' | 'competition' | 'app_updates' | 'push_reminders'
  >('app_updates');
  const [compSubTab, setCompSubTab] = useState<'termly' | 'weekly' | 'schools'>('termly');
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

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

  // 4. App Updates & Releases state
  const [releaseConfig, setReleaseConfig] = useState<OTAAppReleaseConfig>(DEFAULT_OTA_APP_RELEASE);
  const [newHighlightText, setNewHighlightText] = useState<string>('');
  const [isSavingRelease, setIsSavingRelease] = useState<boolean>(false);
  const [previewMode, setPreviewMode] = useState<OTAUpgradeMode | 'maintenance' | null>(null);
  const [flagSearch, setFlagSearch] = useState<string>('');
  const [flagCategory, setFlagCategory] = useState<'all' | 'study' | 'enrichment' | 'portals'>('all');
  const [expandedNoteKey, setExpandedNoteKey] = useState<OTAFeatureKey | null>(null);

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
    const unsubRelease = subscribeToOTAAppRelease(setReleaseConfig);

    return () => {
      unsubBroadcasts();
      unsubPopup();
      unsubComp();
      unsubWeekly();
      unsubLeague();
      unsubRelease();
    };
  }, []);

  const triggerNotice = (msg: string) => {
    setSaveFeedback(msg);
    setTimeout(() => setSaveFeedback(null), 4000);
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

  // --- App Updates & Releases Handlers ---
  const handleAddHighlight = () => {
    const text = newHighlightText.trim();
    if (!text) return;
    if (releaseConfig.featureHighlights.length >= 10) {
      triggerNotice('Maximum 10 highlights per release.');
      return;
    }
    setReleaseConfig((prev) => ({
      ...prev,
      featureHighlights: [...prev.featureHighlights, text]
    }));
    setNewHighlightText('');
  };

  const handleRemoveHighlight = (index: number) => {
    setReleaseConfig((prev) => ({
      ...prev,
      featureHighlights: prev.featureHighlights.filter((_, i) => i !== index)
    }));
  };

  const handleToggleFeatureFlag = (key: keyof OTAFeatureFlags) => {
    setReleaseConfig((prev) => ({
      ...prev,
      featureFlags: {
        ...prev.featureFlags,
        [key]: !prev.featureFlags[key]
      }
    }));
  };

  const handleEnableAllFlags = () => {
    setReleaseConfig((prev) => ({
      ...prev,
      featureFlags: { ...DEFAULT_OTA_FEATURE_FLAGS }
    }));
    triggerNotice('All 17 modules enabled in draft. Click Publish OTA Release to push live.');
  };

  const handleUpdateFeatureNote = (key: OTAFeatureKey, note: string) => {
    setReleaseConfig((prev) => ({
      ...prev,
      pausedFeatureNotes: {
        ...prev.pausedFeatureNotes,
        [key]: note
      }
    }));
  };

  const handlePublishRelease = async () => {
    if (!isValidSemver(releaseConfig.latestVersion)) {
      triggerNotice('Latest version must follow major.minor.patch (e.g. 2.4.0).');
      return;
    }
    if (!isValidSemver(releaseConfig.minimumSupportedVersion)) {
      triggerNotice('Minimum supported version must follow major.minor.patch (e.g. 2.2.0).');
      return;
    }
    if (!releaseConfig.releaseTitle.trim()) {
      triggerNotice('Please enter a release title.');
      return;
    }

    setIsSavingRelease(true);
    try {
      const saved = await saveOTAAppRelease({
        ...releaseConfig,
        publishedBy: currentUserProfile?.email || 'martorefe@gmail.com'
      });
      setReleaseConfig(saved);
      triggerNotice(
        `OTA release v${saved.latestVersion} (${saved.upgradeMode.toUpperCase()}) published live!`
      );
    } catch (err: any) {
      triggerNotice(`Failed to publish OTA release: ${err?.message || 'Check permissions'}`);
    } finally {
      setIsSavingRelease(false);
    }
  };

  const handleResetReleaseDefaults = () => {
    setReleaseConfig({
      ...DEFAULT_OTA_APP_RELEASE,
      publishedAt: new Date().toISOString()
    });
    triggerNotice('Draft reset to baseline v2.3.0. Click Publish OTA Update to apply live.');
  };

  const previewOverride: AppUpdateGatePreviewOverride | null = previewMode
    ? {
        mode: previewMode,
        release: releaseConfig,
        onClosePreview: () => setPreviewMode(null)
      }
    : null;

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
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800 max-w-4xl">
        <button
          type="button"
          onClick={() => setActiveTab('app_updates')}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'app_updates'
              ? 'bg-[#14233C] text-[#84E000] shadow-sm border border-[#223B63]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Rocket className="w-3.5 h-3.5 shrink-0" />
          <span>App Updates</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('push_reminders')}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'push_reminders'
              ? 'bg-[#14233C] text-[#84E000] shadow-sm border border-[#223B63]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Bell className="w-3.5 h-3.5 shrink-0" />
          <span>Push &amp; Reminders</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ticker')}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
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
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
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
          className={`col-span-2 sm:col-span-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'competition'
              ? 'bg-[#14233C] text-[#84E000] shadow-sm border border-[#223B63]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Trophy className="w-3.5 h-3.5 shrink-0" />
          <span>Competition Arena</span>
        </button>
      </div>

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
              Student Near-Fullscreen Preview
            </h3>
            <div className="p-3 sm:p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center">
              <div className="relative w-full h-[460px] sm:h-[520px] bg-[#070D18] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                <div className="relative flex-1 min-h-0 bg-[#050A14] p-2 flex items-center justify-center overflow-hidden">
                  {popupConfig.imageUrl ? (
                    <img
                      src={popupConfig.imageUrl}
                      alt={popupConfig.title || 'Flyer Preview'}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <div className="p-4 text-center space-y-1.5">
                      <h4 className="text-sm font-black text-white">{popupConfig.title}</h4>
                      {popupConfig.subtitle && (
                        <p className="text-[11px] font-semibold text-[#84E000]">{popupConfig.subtitle}</p>
                      )}
                      <p className="text-[11px] text-slate-300 line-clamp-4 whitespace-pre-line">{popupConfig.body}</p>
                    </div>
                  )}
                  <span
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-slate-950/85 border border-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold"
                    aria-hidden="true"
                  >
                    ✕
                  </span>
                </div>

                <div className="shrink-0 border-t border-slate-800 bg-[#0A1220] px-3 py-2.5 flex flex-col gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white truncate">
                      {popupConfig.badge && (
                        <span className="text-[#84E000] font-semibold shrink-0">{popupConfig.badge}</span>
                      )}
                      {popupConfig.badge && popupConfig.title && (
                        <span className="text-slate-600 shrink-0" aria-hidden="true">·</span>
                      )}
                      <span className="truncate">{popupConfig.title}</span>
                    </div>
                    {popupConfig.subtitle && (
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{popupConfig.subtitle}</p>
                    )}
                  </div>

                  <div className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-[#84E000] to-[#60A5FA] text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow">
                    <span>{popupConfig.ctaText || 'Learn More & Proceed'}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
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

      {/* ========================================================================= */}
      {/* TAB 4: OTA APP UPDATES, VERSION UPGRADES, FEATURE FLAGS & MAINTENANCE LOCK */}
      {/* ========================================================================= */}
      {activeTab === 'app_updates' && (
        <div className="flex flex-col gap-6">
          {/* Interactive Preview Overlay */}
          {previewOverride && <AppUpdateGate previewOverride={previewOverride} />}

          {/* Admin Exemption Notice + Client Version Check */}
          <div className="p-4 bg-[#0D1930] border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#84E000] shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-bold text-white">
                  Super Admin Bypass Protection Enabled
                </p>
                <p className="text-slate-400 mt-0.5">
                  Mandatory upgrade locks and maintenance mode block all Student, Parent, Tutor, Partner & School Admin sessions—while Super Admin stays unlocked to manage rollouts.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 text-xs font-mono tabular-nums bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
              <span className="text-slate-400">Local Client:</span>
              <span className="text-[#84E000] font-bold">v{installedAppVersion}</span>
              {installedAppVersion !== '2.1.0' ? (
                <button
                  type="button"
                  onClick={() => setLocalInstalledAppVersion('2.1.0')}
                  className="ml-2 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-sans font-semibold text-[11px] whitespace-nowrap cursor-pointer"
                >
                  Simulate v2.1.0
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setLocalInstalledAppVersion(releaseConfig.latestVersion)}
                  className="ml-2 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-sans font-semibold text-[11px] whitespace-nowrap cursor-pointer"
                >
                  Reset v{releaseConfig.latestVersion}
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT COLUMN: VERSIONING, UPGRADE TIER & RELEASE NOTES */}
            <div className="flex flex-col gap-5">
              <div className="p-4 sm:p-5 bg-slate-900/70 border border-slate-800 rounded-xl flex flex-col gap-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-[#84E000]" />
                    <h2 className="text-sm font-bold text-white">App Version & Upgrade Policy</h2>
                  </div>
                  <span className="text-[11px] font-mono tabular-nums text-slate-400">
                    Target v{releaseConfig.latestVersion}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-300 font-semibold">Latest Version (Semver)</label>
                    <input
                      type="text"
                      value={releaseConfig.latestVersion}
                      onChange={(e) =>
                        setReleaseConfig({ ...releaseConfig, latestVersion: e.target.value })
                      }
                      placeholder="2.4.0"
                      className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono tabular-nums focus:outline-none focus:border-[#84E000]"
                    />
                    <div className="flex items-center gap-1.5">
                      {(['patch', 'minor', 'major'] as const).map((part) => (
                        <button
                          key={part}
                          type="button"
                          onClick={() =>
                            setReleaseConfig({
                              ...releaseConfig,
                              latestVersion: bumpSemver(releaseConfig.latestVersion, part)
                            })
                          }
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold capitalize whitespace-nowrap cursor-pointer"
                        >
                          +{part}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-300 font-semibold">
                      Minimum Supported Version
                    </label>
                    <input
                      type="text"
                      value={releaseConfig.minimumSupportedVersion}
                      onChange={(e) =>
                        setReleaseConfig({
                          ...releaseConfig,
                          minimumSupportedVersion: e.target.value
                        })
                      }
                      placeholder="2.2.0"
                      className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono tabular-nums focus:outline-none focus:border-[#84E000]"
                    />
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Clients below this version are always locked until upgraded.
                    </p>
                  </div>
                </div>

                {/* Upgrade Prompt Enforcement Tier */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-300">
                    When Update Is Available, Show Users:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      {
                        id: 'mild' as const,
                        label: 'Mild Notification',
                        desc: 'Dismissible top in-app banner',
                        icon: Bell,
                        activeClass: 'bg-[#14233C] border-[#84E000] text-[#84E000]'
                      },
                      {
                        id: 'recommended' as const,
                        label: 'Recommended Modal',
                        desc: 'Skippable What\'s New popup',
                        icon: ArrowUpCircle,
                        activeClass: 'bg-amber-950/50 border-amber-400 text-amber-300'
                      },
                      {
                        id: 'mandatory' as const,
                        label: 'Mandatory Lock',
                        desc: 'Must upgrade to use app',
                        icon: Lock,
                        activeClass: 'bg-rose-950/60 border-[#FF5B00] text-[#FF5B00]'
                      }
                    ].map((tier) => {
                      const Icon = tier.icon;
                      const selected = releaseConfig.upgradeMode === tier.id;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() =>
                            setReleaseConfig({ ...releaseConfig, upgradeMode: tier.id })
                          }
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                            selected
                              ? tier.activeClass
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 font-bold text-xs whitespace-nowrap">
                            <Icon className="w-3.5 h-3.5 shrink-0" />
                            <span>{tier.label}</span>
                          </div>
                          <span className="text-[11px] text-slate-400 leading-snug">
                            {tier.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-xs">
                  <label className="text-slate-300 font-semibold">
                    Optional Play Store / APK Download Link
                  </label>
                  <input
                    type="url"
                    value={releaseConfig.downloadUrl || ''}
                    onChange={(e) =>
                      setReleaseConfig({ ...releaseConfig, downloadUrl: e.target.value })
                    }
                    placeholder="https://play.google.com/store/apps/details?id=..."
                    className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#84E000]"
                  />
                  <span className="text-[11px] text-slate-400">
                    Leave blank for pure instant in-app OTA upgrade, or add URL to show Store link alongside Upgrade Now.
                  </span>
                </div>
              </div>

              {/* Release Headline, Notes & Highlights */}
              <div className="p-4 sm:p-5 bg-slate-900/70 border border-slate-800 rounded-xl flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#84E000]" />
                  <h2 className="text-sm font-bold text-white">Release Notes & New Features</h2>
                </div>

                <div className="flex flex-col gap-1 text-xs">
                  <label className="text-slate-300 font-semibold">Release Title</label>
                  <input
                    type="text"
                    value={releaseConfig.releaseTitle}
                    onChange={(e) =>
                      setReleaseConfig({ ...releaseConfig, releaseTitle: e.target.value })
                    }
                    placeholder="e.g. Student Companion v2.4.0 · Exam Speed Booster"
                    className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>

                <div className="flex flex-col gap-1 text-xs">
                  <label className="text-slate-300 font-semibold">Summary Message</label>
                  <textarea
                    value={releaseConfig.releaseNotes}
                    onChange={(e) =>
                      setReleaseConfig({ ...releaseConfig, releaseNotes: e.target.value })
                    }
                    rows={2}
                    placeholder="Short explanation of why students and parents should install this update..."
                    className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white resize-y"
                  />
                </div>

                <div className="flex flex-col gap-2 text-xs">
                  <label className="text-slate-300 font-semibold flex items-center justify-between">
                    <span>What&apos;s New Highlights ({releaseConfig.featureHighlights.length}/10)</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newHighlightText}
                      onChange={(e) => setNewHighlightText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddHighlight();
                        }
                      }}
                      placeholder="e.g. Faster WAEC 2025 Past Question CBT explanations"
                      className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddHighlight}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg flex items-center gap-1 whitespace-nowrap cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {releaseConfig.featureHighlights.map((hl, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800"
                      >
                        <span className="text-xs text-slate-200 flex items-center gap-2 min-w-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#84E000] shrink-0" />
                          <span className="truncate">{hl}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveHighlight(idx)}
                          aria-label={`Remove highlight ${idx + 1}`}
                          className="p-1 text-rose-400 hover:text-white rounded cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: LIVE FEATURE FLAGS, MAINTENANCE LOCK & PREVIEW */}
            <div className="flex flex-col gap-5">
              {/* Feature Flags: Full 17-Module App Switchboard */}
              <div className="p-4 sm:p-5 bg-slate-900/70 border border-slate-800 rounded-xl flex flex-col gap-3.5">
                {(() => {
                  const enabledCount = OTA_FEATURE_CATALOG.filter(
                    (m) => releaseConfig.featureFlags[m.key] !== false
                  ).length;
                  const pausedCount = OTA_FEATURE_CATALOG.length - enabledCount;
                  const searchTerm = flagSearch.trim().toLowerCase();
                  const filteredModules = OTA_FEATURE_CATALOG.filter((m) => {
                    const matchesCategory = flagCategory === 'all' || m.category === flagCategory;
                    const matchesSearch =
                      !searchTerm ||
                      m.title.toLowerCase().includes(searchTerm) ||
                      m.description.toLowerCase().includes(searchTerm);
                    return matchesCategory && matchesSearch;
                  });

                  const categoryLabel = (cat: 'study' | 'enrichment' | 'portals') =>
                    cat === 'study'
                      ? 'Study & Exams'
                      : cat === 'enrichment'
                      ? 'Enrichment & AI'
                      : 'Role Portal';

                  return (
                    <>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Sliders className="w-4 h-4 text-[#84E000]" />
                          <h2 className="text-sm font-bold text-white">
                            Live Feature Pause Switchboard
                          </h2>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono tabular-nums px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 whitespace-nowrap">
                            {enabledCount} / {OTA_FEATURE_CATALOG.length} Enabled · {pausedCount} Paused
                          </span>
                          {pausedCount > 0 && (
                            <button
                              type="button"
                              onClick={handleEnableAllFlags}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[#84E000] text-[11px] font-bold whitespace-nowrap cursor-pointer"
                            >
                              Enable All
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Shared Default Paused Notice Message */}
                      <div className="flex flex-col gap-1 text-xs">
                        <label className="text-slate-300 font-semibold flex items-center justify-between">
                          <span>Shared Default Paused Message</span>
                          <span className="text-[10px] font-mono text-slate-400 tabular-nums">
                            {releaseConfig.defaultPausedMessage.length}/300
                          </span>
                        </label>
                        <input
                          type="text"
                          maxLength={300}
                          value={releaseConfig.defaultPausedMessage}
                          onChange={(e) =>
                            setReleaseConfig({
                              ...releaseConfig,
                              defaultPausedMessage: e.target.value
                            })
                          }
                          placeholder={DEFAULT_PAUSED_FEATURE_MESSAGE}
                          className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#84E000]"
                        />
                        <span className="text-[11px] text-slate-400">
                          Shown to users when any paused feature is tapped without a custom note.
                        </span>
                      </div>

                      {/* Filter Controls: Category Pills + Search */}
                      <div className="flex flex-col gap-2 pt-1">
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
                          {(
                            [
                              { id: 'all', label: `All (${OTA_FEATURE_CATALOG.length})` },
                              { id: 'study', label: 'Study & Exams' },
                              { id: 'enrichment', label: 'Enrichment & AI' },
                              { id: 'portals', label: 'Role Portals' }
                            ] as const
                          ).map((cat) => (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => setFlagCategory(cat.id)}
                              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap cursor-pointer border transition-colors ${
                                flagCategory === cat.id
                                  ? 'bg-[#14233C] border-[#84E000]/70 text-[#84E000]'
                                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              {cat.label}
                            </button>
                          ))}
                        </div>

                        <div className="relative">
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            value={flagSearch}
                            onChange={(e) => setFlagSearch(e.target.value)}
                            placeholder="Filter modules (e.g. Lesson Notes, Termly Drill, Parent Portal)..."
                            className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#84E000]"
                          />
                        </div>
                      </div>

                      {/* Module List */}
                      <div className="space-y-2 text-xs max-h-[440px] overflow-y-auto pr-1">
                        {filteredModules.length === 0 ? (
                          <div className="p-4 text-center text-slate-400 bg-slate-950 rounded-xl border border-slate-800">
                            No modules match your search filter.
                          </div>
                        ) : (
                          filteredModules.map((mod) => {
                            const enabled = releaseConfig.featureFlags[mod.key] !== false;
                            const customNote = releaseConfig.pausedFeatureNotes?.[mod.key] || '';
                            const hasCustomNote = customNote.trim().length > 0;
                            const isNoteExpanded = expandedNoteKey === mod.key;

                            return (
                              <div
                                key={mod.key}
                                className={`p-3 rounded-xl border transition-colors ${
                                  enabled
                                    ? 'bg-slate-950 border-slate-800'
                                    : 'bg-amber-950/20 border-amber-500/45'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2.5">
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <p className="font-bold text-white truncate">{mod.title}</p>
                                      {flagCategory === 'all' && (
                                        <span className="text-[10px] font-semibold text-slate-400 bg-slate-900 px-1.5 py-0.2 rounded border border-slate-800 whitespace-nowrap">
                                          {categoryLabel(mod.category)}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                                      {mod.description}
                                    </p>
                                  </div>

                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setExpandedNoteKey(isNoteExpanded ? null : mod.key)
                                      }
                                      title="Optional custom pause note"
                                      className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold border whitespace-nowrap cursor-pointer inline-flex items-center gap-1 transition-colors ${
                                        hasCustomNote || isNoteExpanded
                                          ? 'bg-amber-950/60 border-amber-500/50 text-amber-300'
                                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                                      }`}
                                    >
                                      <MessageSquare className="w-3 h-3 shrink-0" />
                                      <span>{hasCustomNote ? 'Note Added' : 'Note'}</span>
                                    </button>

                                    <button
                                      type="button"
                                      role="switch"
                                      aria-checked={enabled}
                                      onClick={() => handleToggleFeatureFlag(mod.key)}
                                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-black whitespace-nowrap shrink-0 border cursor-pointer inline-flex items-center gap-1 transition-colors ${
                                        enabled
                                          ? 'bg-emerald-950/80 border-emerald-500/60 text-[#84E000]'
                                          : 'bg-amber-500/15 border-amber-400/60 text-amber-300'
                                      }`}
                                    >
                                      {enabled ? (
                                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                      ) : (
                                        <PauseCircle className="w-3.5 h-3.5 shrink-0" />
                                      )}
                                      <span>{enabled ? 'Enabled' : 'Paused'}</span>
                                    </button>
                                  </div>
                                </div>

                                {(isNoteExpanded || (!enabled && hasCustomNote)) && (
                                  <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex items-center gap-2">
                                    <input
                                      type="text"
                                      maxLength={240}
                                      value={customNote}
                                      onChange={(e) =>
                                        handleUpdateFeatureNote(mod.key, e.target.value)
                                      }
                                      placeholder={`Optional custom note when ${mod.title} is paused (leave blank for shared message)`}
                                      className="flex-1 px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-[11px] text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                                    />
                                    {hasCustomNote && (
                                      <button
                                        type="button"
                                        onClick={() => handleUpdateFeatureNote(mod.key, '')}
                                        className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold whitespace-nowrap cursor-pointer"
                                      >
                                        Clear
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Emergency / Scheduled Maintenance Lock */}
              <div
                className={`p-4 sm:p-5 rounded-xl border flex flex-col gap-3.5 transition-colors ${
                  releaseConfig.maintenanceMode
                    ? 'bg-amber-950/30 border-amber-500/60'
                    : 'bg-slate-900/70 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-amber-400" />
                    <h2 className="text-sm font-bold text-white">Maintenance Mode Lock</h2>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={releaseConfig.maintenanceMode}
                    onClick={() =>
                      setReleaseConfig({
                        ...releaseConfig,
                        maintenanceMode: !releaseConfig.maintenanceMode
                      })
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-black whitespace-nowrap cursor-pointer border transition-colors ${
                      releaseConfig.maintenanceMode
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-950 text-slate-300 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    {releaseConfig.maintenanceMode ? 'Maintenance ON' : 'Maintenance OFF'}
                  </button>
                </div>

                {releaseConfig.maintenanceMode && (
                  <div className="flex items-start gap-2 text-xs text-amber-200 bg-amber-950/60 border border-amber-500/40 rounded-lg p-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      When published, all non-Super-Admin users will see the maintenance lock screen until turned off.
                    </span>
                  </div>
                )}

                <div className="flex flex-col gap-1 text-xs">
                  <label className="text-slate-300 font-semibold">Maintenance Notice Message</label>
                  <textarea
                    value={releaseConfig.maintenanceMessage}
                    onChange={(e) =>
                      setReleaseConfig({ ...releaseConfig, maintenanceMessage: e.target.value })
                    }
                    rows={2}
                    className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white resize-y"
                  />
                </div>
              </div>

              {/* Interactive Prompt Previews */}
              <div className="p-4 sm:p-5 bg-slate-900/70 border border-slate-800 rounded-xl flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#84E000]" />
                  <h2 className="text-sm font-bold text-white">Preview User Experience</h2>
                </div>
                <p className="text-xs text-slate-400">
                  Test how your current draft renders for students without affecting your Admin session.
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPreviewMode('mild')}
                    className="px-3 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold whitespace-nowrap cursor-pointer"
                  >
                    Preview Mild Banner
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode('recommended')}
                    className="px-3 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-amber-300 font-bold whitespace-nowrap cursor-pointer"
                  >
                    Preview Recommended Modal
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode('mandatory')}
                    className="px-3 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-[#FF5B00]/50 text-[#FF5B00] font-bold whitespace-nowrap cursor-pointer"
                  >
                    Preview Mandatory Lock
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode('maintenance')}
                    className="px-3 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-amber-500/40 text-amber-200 font-bold whitespace-nowrap cursor-pointer"
                  >
                    Preview Maintenance
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Publish Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={handleResetReleaseDefaults}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Draft to Baseline</span>
            </button>

            <button
              type="button"
              onClick={handlePublishRelease}
              disabled={isSavingRelease}
              className="py-2.5 px-6 bg-[#84E000] hover:bg-[#74c700] text-slate-950 font-black text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-lg transition-all active:scale-95 whitespace-nowrap cursor-pointer disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              <span>
                {isSavingRelease
                  ? 'Publishing OTA Update...'
                  : `Publish OTA Release v${releaseConfig.latestVersion}`}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: PUSH NOTIFICATIONS & DRAW-BACK REMINDER STUDIO */}
      {/* ========================================================================= */}
      {activeTab === 'push_reminders' && (
        <OTAPushRemindersTab onFeedback={triggerNotice} />
      )}
    </div>
  );
};
