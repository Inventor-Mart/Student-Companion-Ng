import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audioSynthesis';
import {
  Bell,
  BellRing,
  CheckCheck,
  Clock,
  Flame,
  Mail,
  RefreshCw,
  Send,
  Settings,
  Sparkles,
  X,
  ArrowRight,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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

                  {/* Daily Reminder Time + Streak Alerts */}
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
};
