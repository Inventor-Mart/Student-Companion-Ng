import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audioSynthesis';
import {
  Bell,
  BellOff,
  BellRing,
  BookOpen,
  Check,
  CheckCheck,
  Clock,
  Flame,
  Mail,
  Megaphone,
  RefreshCw,
  Send,
  Settings,
  Sparkles,
  TrendingUp,
  Users,
  X,
  ArrowRight,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function formatRelativeTime(isoString: string): string {
  const ts = new Date(isoString).getTime();
  if (!Number.isFinite(ts)) return 'Recently';
  const diffMs = Date.now() - ts;
  if (diffMs < 60_000) return 'Just now';
  const diffMins = Math.floor(diffMs / 60_000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(ts).toLocaleDateString();
}

function formatCategoryLabel(category: string): string {
  switch (category) {
    case 'streak_alert':
      return 'Study Streak';
    case 'ota_update':
      return 'OTA Release';
    case 'parent_alert':
      return 'Ward Update';
    case 'tutor_activity':
      return 'Tutor Hub';
    case 'partner_earnings':
      return 'Partner Rewards';
    case 'school_notice':
      return 'School Notice';
    case 'study_reminder':
      return 'Study Reminder';
    case 'campaign':
      return 'Platform Broadcast';
    default:
      return category.replace(/_/g, ' ');
  }
}

export const NotificationInboxModal: React.FC = () => {
  const {
    isNotificationInboxOpen,
    setIsNotificationInboxOpen,
    personaNotifications,
    unreadNotificationCount,
    markNotificationRead,
    markAllNotificationsRead,
    reminderPreferences,
    updateReminderPreferences,
    browserPushPermission,
    enableBrowserPushNotifications,
    sendSelfReminderTest,
    currentRole,
    isSuperAdmin,
    setActiveStudentTab,
    triggerOTAUpgrade,
    currentUserProfile
  } = useApp();

  const [activeTab, setActiveTab] = useState<'inbox' | 'preferences'>('inbox');
  const [filterUnread, setFilterUnread] = useState<boolean>(false);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testFeedback, setTestFeedback] = useState<string | null>(null);

  if (!isNotificationInboxOpen) return null;

  const displayedItems = filterUnread
    ? personaNotifications.filter((n) => !n.isRead)
    : personaNotifications;

  const handleAction = async (itemId: string, actionTarget?: string) => {
    playSound.tileTap();
    markNotificationRead(itemId);
    if (actionTarget === 'ota_upgrade') {
      setIsNotificationInboxOpen(false);
      await triggerOTAUpgrade();
      return;
    }
    if (currentRole === 'student' && actionTarget && actionTarget !== 'dashboard') {
      setActiveStudentTab(actionTarget as any);
    }
    setIsNotificationInboxOpen(false);
  };

  const handleEnablePush = async () => {
    playSound.tileTap();
    const perm = await enableBrowserPushNotifications();
    if (perm === 'denied') {
      setTestFeedback('Browser notifications are blocked in your browser settings. Please allow notifications for this site.');
    } else if (perm === 'granted') {
      setTestFeedback('Browser push notifications enabled.');
    }
  };

  const handleSendTest = async () => {
    playSound.tileTap();
    setIsTesting(true);
    setTestFeedback(null);
    try {
      const result = await sendSelfReminderTest();
      setTestFeedback(result.message);
    } finally {
      setIsTesting(false);
    }
  };

  const getCategoryAccent = (category: string) => {
    switch (category) {
      case 'streak_alert':
        return 'text-[#FF5B00] bg-[#FF5B00]/15 border-[#FF5B00]/40';
      case 'ota_update':
        return 'text-[#84E000] bg-[#84E000]/15 border-[#84E000]/40';
      case 'parent_alert':
      case 'tutor_activity':
        return 'text-cyan-300 bg-cyan-500/15 border-cyan-500/40';
      case 'partner_earnings':
        return 'text-emerald-300 bg-emerald-500/15 border-emerald-500/40';
      default:
        return 'text-amber-300 bg-amber-500/15 border-amber-500/40';
    }
  };

  const isUrgentCard = (category: string, title: string, actionTarget?: string) => {
    if (category === 'streak_alert') return true;
    if (category === 'ota_update' && actionTarget === 'ota_upgrade') return true;
    if (category === 'parent_alert' && title.toLowerCase().includes('awaiting approval')) return true;
    return false;
  };

  const renderNeonCardIcon = (category: string, urgent: boolean) => {
    const iconClass = `w-5 h-5 ${urgent ? 'text-[#FF7A1A]' : 'text-[#96F716]'}`;
    switch (category) {
      case 'streak_alert':
        return <Flame className={iconClass} />;
      case 'ota_update':
        return <Download className={iconClass} />;
      case 'study_reminder':
        return <BookOpen className={iconClass} />;
      case 'parent_alert':
      case 'tutor_activity':
        return <Users className={iconClass} />;
      case 'partner_earnings':
        return <TrendingUp className={iconClass} />;
      case 'campaign':
      case 'school_notice':
        return <Megaphone className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  // =========================================================================
  // 1. SUPER ADMIN VIEW (Preserved standard administrative layout)
  // =========================================================================
  if (isSuperAdmin) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsNotificationInboxOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="relative w-full max-w-lg bg-[#0B1526] border border-[#1E3356] rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] z-10 text-slate-100"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between gap-3 bg-[#08101E]">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#14233C] border border-[#223B63] flex items-center justify-center text-[#84E000] shrink-0">
                  <BellRing className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm sm:text-base font-bold text-white truncate">
                    Notifications & Reminders
                  </h2>
                  <p className="text-xs text-slate-400 font-mono tabular-nums">
                    {unreadNotificationCount} unread · {currentRole.replace('_', ' ')} hub
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsNotificationInboxOpen(false)}
                className="min-w-[40px] min-h-[40px] rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
                aria-label="Close notifications"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Segmented Tabs */}
            <div className="px-5 pt-3 pb-2 bg-[#0B1526] border-b border-slate-800/80 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    playSound.tileTap();
                    setActiveTab('inbox');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'inbox'
                      ? 'bg-[#14233C] text-[#84E000] border border-[#223B63]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Inbox ({personaNotifications.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playSound.tileTap();
                    setActiveTab('preferences');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'preferences'
                      ? 'bg-[#14233C] text-[#84E000] border border-[#223B63]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Reminder Settings</span>
                </button>
              </div>

              {activeTab === 'inbox' && unreadNotificationCount > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    playSound.tileTap();
                    markAllNotificationsRead();
                  }}
                  className="text-xs font-semibold text-[#84E000] hover:underline flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Mark all read</span>
                </button>
              )}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
              {activeTab === 'inbox' ? (
                <>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">
                      Personalized reminders and live admin announcements
                    </span>
                    <button
                      type="button"
                      onClick={() => setFilterUnread((v) => !v)}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                        filterUnread
                          ? 'bg-[#FF5B00]/20 border-[#FF5B00] text-orange-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {filterUnread ? 'Showing Unread' : 'Unread Only'}
                    </button>
                  </div>

                  {displayedItems.length === 0 ? (
                    <div className="py-10 text-center space-y-2 border border-slate-800/80 rounded-2xl bg-slate-900/40">
                      <Sparkles className="w-7 h-7 text-[#84E000] mx-auto" />
                      <p className="text-sm font-semibold text-white">You are all caught up</p>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto">
                        Enable browser push and daily email digests in Reminder Settings so you never miss a streak or challenge.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {displayedItems.map((item) => (
                        <div
                          key={item.id}
                          className={`p-3.5 rounded-2xl border transition-colors ${
                            item.isRead
                              ? 'bg-slate-900/40 border-slate-800/70 opacity-85'
                              : 'bg-[#101E36] border-[#26416E] shadow-md'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2.5">
                            <div className="space-y-1 min-w-0">
                              <div className="flex items-center gap-2 text-[11px] text-slate-400 flex-wrap">
                                <span
                                  className={`px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wide ${getCategoryAccent(
                                    item.category
                                  )}`}
                                >
                                  {item.category.replace('_', ' ')}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span className="font-mono tabular-nums">
                                  {new Date(item.createdAt).toLocaleDateString()}
                                </span>
                                {!item.isRead && (
                                  <>
                                    <span aria-hidden="true">·</span>
                                    <span className="text-[#84E000] font-bold">New</span>
                                  </>
                                )}
                              </div>

                              <h3 className="text-sm font-bold text-white leading-snug">
                                {item.title}
                              </h3>
                              <p className="text-xs text-slate-300 leading-relaxed">
                                {item.message}
                              </p>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-800/70">
                            {item.actionLabel ? (
                              <button
                                type="button"
                                onClick={() => void handleAction(item.id, item.actionTarget)}
                                className="px-3 py-1.5 rounded-lg bg-[#FF5B00] hover:bg-[#E04F00] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap shrink-0"
                              >
                                {item.actionTarget === 'ota_upgrade' ? (
                                  <Download className="w-3.5 h-3.5" />
                                ) : (
                                  <ArrowRight className="w-3.5 h-3.5" />
                                )}
                                <span>{item.actionLabel}</span>
                              </button>
                            ) : (
                              <span />
                            )}

                            {!item.isRead && (
                              <button
                                type="button"
                                onClick={() => {
                                  playSound.tileTap();
                                  markNotificationRead(item.id);
                                }}
                                className="text-xs text-slate-400 hover:text-white font-medium cursor-pointer"
                              >
                                Mark read
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-4">
                  {testFeedback && (
                    <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-emerald-200 text-xs">
                      {testFeedback}
                    </div>
                  )}

                  {/* Browser Push Control */}
                  <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                          <BellRing className="w-4 h-4 text-[#84E000]" />
                          <span>Browser & Device Push Alerts</span>
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Receive instant reminders even when another browser tab is open.
                        </p>
                      </div>
                      <span className="text-[11px] font-mono text-slate-300 shrink-0">
                        Status: {browserPushPermission}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800">
                      <span className="text-xs text-slate-300">
                        {reminderPreferences.browserPushEnabled && browserPushPermission === 'granted'
                          ? 'Push reminders active'
                          : 'Click to allow browser notifications'}
                      </span>
                      <button
                        type="button"
                        onClick={() => void handleEnablePush()}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                          reminderPreferences.browserPushEnabled && browserPushPermission === 'granted'
                            ? 'bg-[#84E000]/20 text-[#84E000] border border-[#84E000]/50'
                            : 'bg-[#FF5B00] hover:bg-[#E04F00] text-white'
                        }`}
                      >
                        {browserPushPermission === 'granted'
                          ? reminderPreferences.browserPushEnabled
                            ? 'Enabled'
                            : 'Turn On'
                          : 'Allow Push Alerts'}
                      </button>
                    </div>
                  </div>

                  {/* Email Digest Control */}
                  <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                          <Mail className="w-4 h-4 text-[#FF5B00]" />
                          <span>Email Study & Activity Digests</span>
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Deliver streak nudges and progress summaries to{' '}
                          <span className="text-slate-200 font-mono">
                            {currentUserProfile?.email || reminderPreferences.email || 'your account email'}
                          </span>
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          void updateReminderPreferences({
                            emailDigestEnabled: !reminderPreferences.emailDigestEnabled
                          })
                        }
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                          reminderPreferences.emailDigestEnabled
                            ? 'bg-[#84E000] text-slate-950 border-[#A3E635]'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {reminderPreferences.emailDigestEnabled ? 'Subscribed' : 'Off'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                      <label className="space-y-1 block">
                        <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          Daily Study Reminder Time
                        </span>
                        <input
                          type="time"
                          value={reminderPreferences.dailyReminderTime}
                          onChange={(e) =>
                            void updateReminderPreferences({ dailyReminderTime: e.target.value })
                          }
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                        />
                      </label>

                      <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl px-3 py-2">
                        <div className="flex items-center gap-1.5 text-xs text-slate-200 font-medium">
                          <Flame className="w-4 h-4 text-[#FF5B00]" />
                          <span>Streak Alerts</span>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            void updateReminderPreferences({
                              streakAlerts: !reminderPreferences.streakAlerts
                            })
                          }
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                            reminderPreferences.streakAlerts
                              ? 'bg-[#FF5B00] text-white'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {reminderPreferences.streakAlerts ? 'On' : 'Off'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Test Reminder Button */}
                  <button
                    type="button"
                    onClick={() => void handleSendTest()}
                    disabled={isTesting}
                    className="w-full min-h-[44px] rounded-xl bg-[#14233C] hover:bg-[#1D3254] border border-[#223B63] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    {isTesting ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-[#84E000]" />
                    ) : (
                      <Send className="w-4 h-4 text-[#84E000]" />
                    )}
                    <span>{isTesting ? 'Sending Test Reminder...' : 'Send Me a Test Reminder Now'}</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  // =========================================================================
  // 2. HIGH-CONTRAST GLOWING NEON VIEW (All Non-Super-Admin Personas)
  // Deep Navy Blue (#0A1328) · Electric Orange (#FF6B00) · Lime Green (#96F716)
  // =========================================================================
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsNotificationInboxOpen(false)}
          className="absolute inset-0 bg-[#040914]/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 24, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.18 }}
          style={{
            backgroundImage:
              'radial-gradient(circle at 92% 38%, rgba(150, 247, 22, 0.16), transparent 42%), radial-gradient(circle at 10% 8%, rgba(255, 107, 0, 0.12), transparent 44%)'
          }}
          className="relative w-full max-w-lg bg-[#0A1328] border-2 border-[#96F716]/70 rounded-t-3xl sm:rounded-3xl shadow-[0_0_40px_-8px_rgba(150,247,22,0.4),0_0_24px_-6px_rgba(255,107,0,0.3)] overflow-hidden flex flex-col max-h-[90vh] z-10 text-slate-100"
        >
          {/* Header */}
          <div className="px-4 sm:px-5 pt-4 pb-3 flex items-center justify-between gap-3 border-b border-[#192B52]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-[#96F716] text-[#070D18] flex items-center justify-center shadow-[0_0_18px_rgba(150,247,22,0.5)] shrink-0">
                <Bell className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight truncate">
                  Notifications &amp; Reminders{' '}
                  <span className="text-[#96F716] font-mono tabular-nums">
                    ({unreadNotificationCount})
                  </span>
                </h2>
                <p className="text-xs font-medium text-[#FF8C3B] truncate">
                  Streak alerts · Inactivity nudges · Live OTA broadcasts
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                playSound.tileTap();
                setIsNotificationInboxOpen(false);
              }}
              className="min-w-[44px] min-h-[44px] rounded-2xl bg-[#FF6B00] hover:bg-[#FF7F24] text-[#070D18] shadow-[0_0_18px_rgba(255,107,0,0.45)] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Close notifications"
            >
              <X className="w-5 h-5 stroke-[2.6]" />
            </button>
          </div>

          {/* Segmented Tab Bar & Read All Button */}
          <div className="px-4 sm:px-5 py-3 flex items-center justify-between gap-2.5 flex-wrap border-b border-[#162547] bg-[#081022]/80">
            <div
              role="tablist"
              aria-label="Notification sections"
              className="flex items-center gap-1 p-1 rounded-2xl bg-[#070E1F] border border-[#FF6B00]/65 shadow-[0_0_16px_-6px_rgba(255,107,0,0.35)]"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'inbox'}
                onClick={() => {
                  playSound.tileTap();
                  setActiveTab('inbox');
                }}
                className={`min-h-[40px] px-3.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'inbox'
                    ? 'bg-[#96F716]/12 border border-[#96F716] text-[#96F716] shadow-[0_0_14px_rgba(150,247,22,0.28)]'
                    : 'border border-transparent text-[#FF7A1A] hover:text-[#FFA766]'
                }`}
              >
                <BellRing className="w-3.5 h-3.5" />
                <span>Inbox</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'preferences'}
                onClick={() => {
                  playSound.tileTap();
                  setActiveTab('preferences');
                }}
                className={`min-h-[40px] px-3.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'preferences'
                    ? 'bg-[#96F716]/12 border border-[#96F716] text-[#96F716] shadow-[0_0_14px_rgba(150,247,22,0.28)]'
                    : 'border border-transparent text-[#FF7A1A] hover:text-[#FFA766]'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Preferences</span>
              </button>
            </div>

            {activeTab === 'inbox' && unreadNotificationCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  playSound.tileTap();
                  markAllNotificationsRead();
                }}
                className="min-h-[40px] px-3.5 rounded-xl bg-[#96F716] hover:bg-[#AAFF3B] text-[#070D18] text-xs font-extrabold shadow-[0_0_18px_rgba(150,247,22,0.4)] flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                <span>Read all</span>
              </button>
            )}
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            {activeTab === 'inbox' ? (
              <>
                {/* Conditional Browser Alerts Denied Banner */}
                {browserPushPermission === 'denied' && (
                  <div className="rounded-2xl bg-gradient-to-r from-[#FF5900] to-[#FF780A] border-2 border-[#FFA759] p-3.5 shadow-[0_0_22px_rgba(255,107,0,0.4)] flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#070D18]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <BellOff className="w-4 h-4 text-[#070D18] stroke-[2.3]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-extrabold text-white leading-snug">
                        Browser Alerts Blocked in Site Settings
                      </h3>
                      <p className="text-xs text-[#FFF4EB] leading-relaxed mt-1">
                        Notifications were previously blocked for this site. Enable Notifications in your browser address bar permissions to receive OS reminders.
                      </p>
                    </div>
                  </div>
                )}

                {/* All / Unread Filter Strip */}
                <div className="flex items-center gap-2 pt-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      playSound.tileTap();
                      setFilterUnread(false);
                    }}
                    className={`min-h-[38px] px-3.5 rounded-xl text-xs font-extrabold font-mono tabular-nums transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      !filterUnread
                        ? 'bg-[#96F716] text-[#070D18] shadow-[0_0_14px_rgba(150,247,22,0.38)]'
                        : 'bg-transparent text-slate-300 hover:text-white hover:bg-[#132245]'
                    }`}
                  >
                    All {personaNotifications.length}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playSound.tileTap();
                      setFilterUnread(true);
                    }}
                    className={`min-h-[38px] px-3.5 rounded-xl text-xs font-extrabold font-mono tabular-nums transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      filterUnread
                        ? 'bg-[#96F716] text-[#070D18] shadow-[0_0_14px_rgba(150,247,22,0.38)]'
                        : 'bg-transparent text-slate-300 hover:text-white hover:bg-[#132245]'
                    }`}
                  >
                    Unread {unreadNotificationCount}
                  </button>
                </div>

                {/* Notification Cards */}
                {displayedItems.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-[#0D1936] border-2 border-[#96F716] shadow-[0_0_24px_-4px_rgba(150,247,22,0.35)] text-center space-y-3">
                    <div className="w-12 h-12 rounded-full border-2 border-[#96F716] bg-[#96F716]/12 flex items-center justify-center mx-auto">
                      <Sparkles className="w-5 h-5 text-[#96F716]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-base font-bold text-white">You are all caught up</p>
                      <p className="text-xs text-[#C7FA85] max-w-xs mx-auto leading-relaxed">
                        {filterUnread
                          ? 'No unread notifications right now. Switch back to All or adjust reminders in Preferences.'
                          : 'Turn on browser push alerts and daily email digests in Preferences so you never miss a streak.'}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 pt-1">
                      {filterUnread && (
                        <button
                          type="button"
                          onClick={() => setFilterUnread(false)}
                          className="min-h-[40px] px-4 rounded-xl bg-[#FF6B00] hover:bg-[#FF7F24] text-[#070D18] text-xs font-extrabold cursor-pointer whitespace-nowrap shrink-0"
                        >
                          Show All ({personaNotifications.length})
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setActiveTab('preferences')}
                        className="min-h-[40px] px-4 rounded-xl bg-[#96F716] hover:bg-[#AAFF3B] text-[#070D18] text-xs font-extrabold cursor-pointer whitespace-nowrap shrink-0"
                      >
                        Open Preferences
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {displayedItems.map((item) => {
                      const urgent = isUrgentCard(item.category, item.title, item.actionTarget);
                      const borderClass = urgent
                        ? item.isRead
                          ? 'border-2 border-[#FF6B00]/50 shadow-none opacity-85'
                          : 'border-2 border-[#FF6B00] shadow-[0_0_22px_-4px_rgba(255,107,0,0.45)]'
                        : item.isRead
                        ? 'border-2 border-[#96F716]/45 shadow-none opacity-85'
                        : 'border-2 border-[#96F716] shadow-[0_0_22px_-4px_rgba(150,247,22,0.36)]';

                      const circleRingClass = urgent
                        ? 'border-2 border-[#FF6B00] bg-[#FF6B00]/12'
                        : 'border-2 border-[#96F716] bg-[#96F716]/12';

                      const bodyCopyClass = urgent ? 'text-[#FFB074]' : 'text-[#C7FA85]';

                      const ctaClass = urgent
                        ? 'bg-[#FF6B00] hover:bg-[#FF7F24] text-[#070D18] shadow-[0_0_16px_rgba(255,107,0,0.42)]'
                        : 'bg-[#96F716] hover:bg-[#AAFF3B] text-[#070D18] shadow-[0_0_16px_rgba(150,247,22,0.4)]';

                      return (
                        <div
                          key={item.id}
                          className={`p-4 rounded-2xl bg-[#0D1936] transition-all ${borderClass}`}
                        >
                          <div className="flex items-start gap-3.5">
                            {/* Left Circular Icon */}
                            <div
                              className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${circleRingClass}`}
                            >
                              {renderNeonCardIcon(item.category, urgent)}
                            </div>

                            {/* Right Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h3 className="text-sm sm:text-[15px] font-bold text-white leading-snug">
                                  {item.title}
                                </h3>
                                {!item.isRead && (
                                  <span
                                    aria-label="Unread alert"
                                    className="w-2.5 h-2.5 rounded-full bg-[#96F716] shadow-[0_0_10px_#96F716] shrink-0 mt-1"
                                  />
                                )}
                              </div>

                              <p className={`text-xs sm:text-[13px] leading-relaxed mt-1 ${bodyCopyClass}`}>
                                {item.message}
                              </p>

                              {/* Clean unboxed metadata */}
                              <div className="mt-2.5 flex items-center gap-2 text-[11px] font-mono tabular-nums text-slate-300">
                                <span>{formatCategoryLabel(item.category)}</span>
                                <span aria-hidden="true">·</span>
                                <span>{formatRelativeTime(item.createdAt)}</span>
                              </div>

                              {/* Bottom Action Row */}
                              <div className="mt-3 flex items-center justify-end gap-3 flex-wrap">
                                {!item.isRead && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      playSound.tileTap();
                                      markNotificationRead(item.id);
                                    }}
                                    className="min-h-[40px] px-2.5 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer whitespace-nowrap shrink-0"
                                  >
                                    Mark read
                                  </button>
                                )}

                                {item.actionLabel && (
                                  <button
                                    type="button"
                                    onClick={() => void handleAction(item.id, item.actionTarget)}
                                    className={`min-h-[42px] px-4 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${ctaClass}`}
                                  >
                                    <span>{item.actionLabel}</span>
                                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              /* Preferences Tab (Matched Deep Navy, Electric Orange & Lime Green Neon Cards) */
              <div className="space-y-4">
                {testFeedback && (
                  <div className="p-3.5 rounded-2xl bg-[#0D1936] border-2 border-[#96F716] text-[#C7FA85] text-xs font-semibold shadow-[0_0_16px_rgba(150,247,22,0.28)]">
                    {testFeedback}
                  </div>
                )}

                {/* Browser Push Control (Electric Orange Neon Card) */}
                <div className="p-4 rounded-2xl bg-[#0D1936] border-2 border-[#FF6B00] shadow-[0_0_22px_-4px_rgba(255,107,0,0.4)] space-y-3">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-full border-2 border-[#FF6B00] bg-[#FF6B00]/12 flex items-center justify-center shrink-0">
                      <BellRing className="w-5 h-5 text-[#FF7A1A]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-white">
                          Browser &amp; Device Push Alerts
                        </h3>
                        <span className="text-[11px] font-mono tabular-nums text-[#FFB074]">
                          Status · {browserPushPermission}
                        </span>
                      </div>
                      <p className="text-xs text-[#FFB074] mt-1 leading-relaxed">
                        Receive instant reminders even when another browser tab is open.
                      </p>

                      <div className="mt-3 pt-3 border-t border-[#FF6B00]/25 flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-xs text-slate-300">
                          {reminderPreferences.browserPushEnabled && browserPushPermission === 'granted'
                            ? 'Push reminders active'
                            : 'Allow browser push notifications'}
                        </span>
                        <button
                          type="button"
                          onClick={() => void handleEnablePush()}
                          className={`min-h-[40px] px-4 rounded-xl text-xs font-extrabold cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                            reminderPreferences.browserPushEnabled && browserPushPermission === 'granted'
                              ? 'bg-[#96F716] hover:bg-[#AAFF3B] text-[#070D18] shadow-[0_0_16px_rgba(150,247,22,0.4)]'
                              : 'bg-[#FF6B00] hover:bg-[#FF7F24] text-[#070D18] shadow-[0_0_16px_rgba(255,107,0,0.4)]'
                          }`}
                        >
                          {browserPushPermission === 'granted'
                            ? reminderPreferences.browserPushEnabled
                              ? 'Enabled'
                              : 'Turn On'
                            : 'Allow Push Alerts'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Digest & Study Schedule (Lime Green Neon Card) */}
                <div className="p-4 rounded-2xl bg-[#0D1936] border-2 border-[#96F716] shadow-[0_0_22px_-4px_rgba(150,247,22,0.34)] space-y-3.5">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-full border-2 border-[#96F716] bg-[#96F716]/12 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-[#96F716]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-white">
                            Email Study &amp; Activity Digests
                          </h3>
                          <p className="text-xs text-[#C7FA85] mt-1 leading-relaxed break-words">
                            Deliver streak nudges and progress summaries to{' '}
                            <span className="text-white font-mono">
                              {currentUserProfile?.email || reminderPreferences.email || 'your account email'}
                            </span>
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            playSound.tileTap();
                            void updateReminderPreferences({
                              emailDigestEnabled: !reminderPreferences.emailDigestEnabled
                            });
                          }}
                          className={`min-h-[40px] px-3.5 rounded-xl text-xs font-extrabold cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                            reminderPreferences.emailDigestEnabled
                              ? 'bg-[#96F716] hover:bg-[#AAFF3B] text-[#070D18] shadow-[0_0_14px_rgba(150,247,22,0.4)]'
                              : 'bg-[#162547] hover:bg-[#1E3361] text-slate-200 border border-slate-600'
                          }`}
                        >
                          {reminderPreferences.emailDigestEnabled ? 'Subscribed' : 'Off'}
                        </button>
                      </div>

                      {/* Daily Time + Streak Alerts */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 mt-3 border-t border-[#96F716]/25">
                        <label className="space-y-1.5 block">
                          <span className="text-[11px] font-bold text-slate-200 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#96F716]" />
                            Daily Reminder Time
                          </span>
                          <input
                            type="time"
                            value={reminderPreferences.dailyReminderTime}
                            onChange={(e) =>
                              void updateReminderPreferences({ dailyReminderTime: e.target.value })
                            }
                            className="w-full min-h-[42px] bg-[#070E1F] border border-[#96F716]/55 focus:border-[#96F716] rounded-xl px-3 py-2 text-xs text-white font-mono tabular-nums outline-none"
                          />
                        </label>

                        <div className="flex flex-col justify-end">
                          <div className="min-h-[42px] flex items-center justify-between bg-[#070E1F] border border-[#FF6B00]/55 rounded-xl px-3 py-1.5 gap-2">
                            <div className="flex items-center gap-1.5 text-xs text-white font-semibold">
                              <Flame className="w-4 h-4 text-[#FF6B00] shrink-0" />
                              <span>Streak Alerts</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                playSound.tileTap();
                                void updateReminderPreferences({
                                  streakAlerts: !reminderPreferences.streakAlerts
                                });
                              }}
                              className={`min-h-[34px] px-3 rounded-lg text-xs font-extrabold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                                reminderPreferences.streakAlerts
                                  ? 'bg-[#FF6B00] hover:bg-[#FF7F24] text-[#070D18]'
                                  : 'bg-[#162547] text-slate-300'
                              }`}
                            >
                              {reminderPreferences.streakAlerts ? 'On' : 'Off'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Test Reminder Button */}
                <button
                  type="button"
                  onClick={() => void handleSendTest()}
                  disabled={isTesting}
                  className="w-full min-h-[48px] rounded-2xl bg-[#0D1936] hover:bg-[#96F716]/15 border-2 border-[#96F716] text-[#96F716] shadow-[0_0_20px_-4px_rgba(150,247,22,0.38)] text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-colors whitespace-nowrap"
                >
                  {isTesting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>{isTesting ? 'Sending Test Reminder...' : 'Send Me a Test Reminder Now'}</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
