import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppNotificationItem, NotificationCategory } from '../../types';
import { formatRelativeNotificationTime } from '../../services/notificationService';
import {
  Bell,
  BellRing,
  CheckCheck,
  Clock,
  Flame,
  Megaphone,
  MoonStar,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  X,
  ArrowRight,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

const CATEGORY_LABEL: Record<NotificationCategory, string> = {
  streak_risk: 'Study Streak',
  inactivity_nudge: 'Activity Reminder',
  ota_engagement: 'Platform Broadcast'
};

function formatHourLabel(hour: number): string {
  const h = ((hour % 24) + 24) % 24;
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${String(h12).padStart(2, '0')}:00 ${suffix}`;
}

export const NotificationCenterDrawer: React.FC = () => {
  const {
    currentRole,
    notifications,
    unreadNotificationCount,
    notificationPreferences,
    browserPermission,
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
    enableBrowserPushNotifications,
    updateNotificationPreferences,
    markNotificationRead,
    markAllNotificationsRead,
    clearReadNotifications,
    sendTestNotification,
    triggerSampleStreakNudge,
    handleNotificationAction,
    setActiveStudentTab
  } = useApp();

  const [drawerTab, setDrawerTab] = useState<'inbox' | 'settings'>('inbox');
  const [filterMode, setFilterMode] = useState<'all' | 'unread'>('all');
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);
  const [isRequestingPush, setIsRequestingPush] = useState<boolean>(false);

  if (!isNotificationDrawerOpen) return null;

  const visibleList =
    filterMode === 'unread' ? notifications.filter((n) => !n.read) : notifications;
  const hasReadItems = notifications.some((n) => n.read);

  const showTempFeedback = (msg: string) => {
    setStatusFeedback(msg);
    window.setTimeout(() => setStatusFeedback(null), 3500);
  };

  const handleEnableBrowserAlerts = async () => {
    setIsRequestingPush(true);
    try {
      const perm = await enableBrowserPushNotifications();
      if (perm === 'granted') {
        showTempFeedback('Browser push alerts enabled for this device.');
      } else if (perm === 'denied') {
        showTempFeedback('Browser alerts are blocked in browser site settings. Allow notifications in your address bar to enable.');
      } else if (perm === 'unsupported') {
        showTempFeedback('This browser does not support native push alerts. In-app reminders remain active.');
      } else {
        showTempFeedback('Permission prompt dismissed. You can enable browser alerts anytime.');
      }
    } finally {
      setIsRequestingPush(false);
    }
  };

  const handleSendTest = async () => {
    const sent = await sendTestNotification();
    if (sent) {
      showTempFeedback('Test browser notification dispatched.');
    } else {
      showTempFeedback('Allow browser notification permission above to preview OS alerts.');
    }
  };

  const handleTriggerSampleNudge = async () => {
    await triggerSampleStreakNudge();
    setDrawerTab('inbox');
    setFilterMode('all');
    showTempFeedback('Added a tailored persona reminder to your inbox.');
  };

  const renderCategoryIcon = (category: NotificationCategory, isUnread: boolean) => {
    if (category === 'streak_risk') {
      return (
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border ${
            isUnread
              ? 'bg-[#FF5B00]/15 border-[#FF5B00]/40 text-[#FF5B00]'
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >
          <Flame className="w-4 h-4" />
        </div>
      );
    }
    if (category === 'inactivity_nudge') {
      return (
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border ${
            isUnread
              ? 'bg-sky-500/15 border-sky-500/40 text-sky-400'
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >
          <Clock className="w-4 h-4" />
        </div>
      );
    }
    return (
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border ${
          isUnread
            ? 'bg-[#84E000]/15 border-[#84E000]/40 text-[#84E000]'
            : 'bg-slate-900 border-slate-800 text-slate-400'
        }`}
      >
        <Megaphone className="w-4 h-4" />
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end sm:flex-row sm:justify-end overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Notifications and Reminders Center"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsNotificationDrawerOpen(false)}
        className="absolute inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
      />

      {/* Responsive Container: Mobile Bottom Sheet -> Desktop Side Panel */}
      <div className="relative z-10 w-full sm:max-w-md h-[86vh] sm:h-full bg-[#0A1324] border-t sm:border-t-0 sm:border-l border-slate-800 rounded-t-3xl sm:rounded-none flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Mobile Sheet Drag Handle */}
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center shrink-0">
          <div className="w-10 h-1.5 rounded-full bg-slate-700" />
        </div>

        {/* Sticky Top Header */}
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0 bg-[#0D182E]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#14233C] border border-[#223B63] flex items-center justify-center text-[#84E000] shrink-0">
              <Bell className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white truncate">
                  Notifications & Reminders
                </h2>
                {unreadNotificationCount > 0 && (
                  <span className="text-xs font-mono font-bold text-[#84E000] tabular-nums">
                    ({unreadNotificationCount})
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                Streak alerts · Inactivity nudges · Live OTA broadcasts
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsNotificationDrawerOpen(false)}
            className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer shrink-0"
            aria-label="Close notifications"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary View Mode Switcher: Inbox vs Reminder Settings */}
        <div className="px-4 pt-3 pb-2 border-b border-slate-800/80 flex items-center justify-between gap-2 shrink-0 bg-[#0A1324]">
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 w-full max-w-[230px]">
            <button
              type="button"
              onClick={() => setDrawerTab('inbox')}
              className={`min-h-[38px] px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                drawerTab === 'inbox'
                  ? 'bg-[#14233C] text-[#84E000] border border-[#223B63]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BellRing className="w-3.5 h-3.5 shrink-0" />
              <span>Inbox</span>
            </button>
            <button
              type="button"
              onClick={() => setDrawerTab('settings')}
              className={`min-h-[38px] px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                drawerTab === 'settings'
                  ? 'bg-[#14233C] text-[#84E000] border border-[#223B63]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5 shrink-0" />
              <span>Preferences</span>
            </button>
          </div>

          {drawerTab === 'inbox' && notifications.length > 0 && (
            <div className="flex items-center gap-1">
              {unreadNotificationCount > 0 && (
                <button
                  type="button"
                  onClick={markAllNotificationsRead}
                  className="min-h-[38px] px-2.5 rounded-lg text-[11px] font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 flex items-center gap-1 cursor-pointer whitespace-nowrap"
                  title="Mark all as read"
                >
                  <CheckCheck className="w-3.5 h-3.5 text-[#84E000]" />
                  <span>Read all</span>
                </button>
              )}
              {hasReadItems && (
                <button
                  type="button"
                  onClick={clearReadNotifications}
                  className="min-h-[38px] min-w-[38px] px-2 rounded-lg text-[11px] font-semibold text-slate-400 hover:text-rose-300 hover:bg-slate-800/80 flex items-center justify-center cursor-pointer"
                  title="Clear read items"
                  aria-label="Clear read notifications"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Inline Feedback Toast */}
        {statusFeedback && (
          <div className="mx-4 mt-3 px-3 py-2.5 rounded-xl bg-emerald-950/70 border border-emerald-600/50 text-emerald-200 text-xs flex items-center gap-2 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-[#84E000] shrink-0" />
            <span>{statusFeedback}</span>
          </div>
        )}

        {/* Body Content */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 flex flex-col gap-3">
          {drawerTab === 'inbox' ? (
            <>
              {/* Soft Browser Push Opt-In Strip (never intrusive on page arrival) */}
              {browserPermission !== 'granted' && (
                <div className="p-3.5 rounded-2xl bg-[#101D34] border border-[#223B63] flex flex-col gap-2.5 shrink-0">
                  <div className="flex items-start gap-2.5">
                    <BellRing className="w-4 h-4 text-[#84E000] shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white">
                        {browserPermission === 'denied'
                          ? 'Browser Alerts Blocked in Site Settings'
                          : 'Never Miss a Study Streak Alert'}
                      </p>
                      <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                        {browserPermission === 'denied'
                          ? 'Notifications were previously blocked for this site. Enable Notifications in your browser address bar permissions to receive OS reminders.'
                          : browserPermission === 'unsupported'
                          ? 'Your browser environment does not support native OS notifications, so reminders stay saved in your inbox here.'
                          : 'Turn on browser push alerts to get gentle study streak savers and live academic announcements.'}
                      </p>
                    </div>
                  </div>
                  {browserPermission === 'default' && (
                    <button
                      type="button"
                      onClick={handleEnableBrowserAlerts}
                      disabled={isRequestingPush}
                      className="min-h-[42px] w-full rounded-xl bg-[#84E000] hover:bg-[#74c700] text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60"
                    >
                      <BellRing className="w-3.5 h-3.5" />
                      <span>{isRequestingPush ? 'Requesting Permission...' : 'Enable Browser Alerts'}</span>
                    </button>
                  )}
                </div>
              )}

              {/* Segmented Filter: All vs Unread */}
              {notifications.length > 0 && (
                <div className="flex items-center justify-between gap-2 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setFilterMode('all')}
                      className={`min-h-[36px] px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                        filterMode === 'all'
                          ? 'bg-slate-800 text-white border border-slate-700'
                          : 'text-slate-400 hover:text-slate-200 border border-transparent'
                      }`}
                    >
                      All <span className="font-mono tabular-nums text-slate-400 ml-1">{notifications.length}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterMode('unread')}
                      className={`min-h-[36px] px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                        filterMode === 'unread'
                          ? 'bg-slate-800 text-white border border-slate-700'
                          : 'text-slate-400 hover:text-slate-200 border border-transparent'
                      }`}
                    >
                      Unread <span className="font-mono tabular-nums text-[#84E000] ml-1">{unreadNotificationCount}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Populated List or Clean Empty State */}
              {visibleList.length > 0 ? (
                <div className="flex flex-col divide-y divide-slate-800/80 border border-slate-800 rounded-2xl bg-[#0D182E]/80 overflow-hidden">
                  {visibleList.map((item: AppNotificationItem) => {
                    const isUnread = !item.read;
                    return (
                      <div
                        key={item.id}
                        className={`p-3.5 flex items-start gap-3 transition-colors ${
                          isUnread ? 'bg-[#12203A]/75' : 'bg-transparent hover:bg-slate-900/40'
                        }`}
                      >
                        {renderCategoryIcon(item.category, isUnread)}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p
                              className={`text-xs sm:text-sm leading-snug ${
                                isUnread ? 'font-bold text-white' : 'font-semibold text-slate-300'
                              }`}
                            >
                              {item.title}
                            </p>
                            {isUnread && (
                              <span
                                className="w-2 h-2 rounded-full bg-[#84E000] shrink-0 mt-1.5"
                                title="Unread"
                              />
                            )}
                          </div>

                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {item.body}
                          </p>

                          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
                            <span className="text-[11px] text-slate-400 font-mono tabular-nums">
                              {CATEGORY_LABEL[item.category]} · {formatRelativeNotificationTime(item.createdAt)}
                            </span>

                            <div className="flex items-center gap-2">
                              {isUnread && (
                                <button
                                  type="button"
                                  onClick={() => markNotificationRead(item.id)}
                                  className="min-h-[36px] px-2 text-[11px] font-semibold text-slate-400 hover:text-white cursor-pointer whitespace-nowrap"
                                >
                                  Mark read
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleNotificationAction(item)}
                                className="min-h-[38px] px-3 rounded-lg bg-[#14233C] hover:bg-[#1D3254] border border-[#223B63] text-[#84E000] text-xs font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95 transition-all"
                              >
                                <span>{item.actionLabel || 'Open'}</span>
                                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="my-auto py-8 px-4 rounded-2xl border border-slate-800 bg-[#0D182E]/70 flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#14233C] border border-[#223B63] flex items-center justify-center text-[#84E000]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {filterMode === 'unread' ? 'You are all caught up' : 'No active notifications yet'}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
                      {filterMode === 'unread'
                        ? 'All streak reminders, draw-back nudges, and OTA announcements have been read.'
                        : 'Daily study streak savers, inactivity check-ins, and live broadcasts from Student Companion will appear here.'}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
                    {filterMode === 'unread' && notifications.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => setFilterMode('all')}
                        className="min-h-[44px] px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
                      >
                        Show All History
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setIsNotificationDrawerOpen(false);
                          if (currentRole === 'student') setActiveStudentTab('syllabus');
                        }}
                        className="min-h-[44px] px-4 rounded-xl bg-[#84E000] hover:bg-[#74c700] text-slate-950 text-xs font-black cursor-pointer"
                      >
                        {currentRole === 'student' ? 'Continue Studying' : 'Return to Portal'}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleTriggerSampleNudge}
                      className="min-h-[44px] px-3.5 rounded-xl bg-[#14233C] hover:bg-[#1D3254] border border-[#223B63] text-slate-200 text-xs font-semibold cursor-pointer"
                    >
                      Check Streak Nudge
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* SETTINGS / PREFERENCES TAB */
            <div className="flex flex-col gap-3">
              {/* Browser Push Master Status */}
              <div className="p-4 rounded-2xl bg-[#0D182E] border border-slate-800 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                      <BellRing className="w-4 h-4 text-[#84E000]" />
                      <span>Browser Push Notifications</span>
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Permission: <span className="font-mono text-slate-200">{browserPermission}</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      updateNotificationPreferences({
                        browserPushEnabled: !notificationPreferences.browserPushEnabled
                      })
                    }
                    className={`min-h-[36px] px-3 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                      notificationPreferences.browserPushEnabled
                        ? 'bg-[#84E000]/15 border-[#84E000]/40 text-[#84E000]'
                        : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    {notificationPreferences.browserPushEnabled ? 'On' : 'Paused'}
                  </button>
                </div>

                {browserPermission !== 'granted' ? (
                  <button
                    type="button"
                    onClick={handleEnableBrowserAlerts}
                    disabled={isRequestingPush || browserPermission === 'unsupported'}
                    className="min-h-[44px] w-full rounded-xl bg-[#84E000] hover:bg-[#74c700] text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Bell className="w-4 h-4" />
                    <span>
                      {browserPermission === 'denied'
                        ? 'Blocked in Browser Settings'
                        : 'Request Browser Permission'}
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendTest}
                    className="min-h-[44px] w-full rounded-xl bg-[#14233C] hover:bg-[#1D3254] border border-[#223B63] text-[#84E000] font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BellRing className="w-4 h-4" />
                    <span>Send Test Browser Notification</span>
                  </button>
                )}

                {browserPermission === 'denied' && (
                  <div className="p-2.5 rounded-xl bg-amber-950/50 border border-amber-700/40 text-amber-200 text-[11px] flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      Click the lock or site-info icon beside the browser address bar and change Notifications to Allow.
                    </span>
                  </div>
                )}
              </div>

              {/* Category Toggles */}
              <div className="rounded-2xl bg-[#0D182E] border border-slate-800 divide-y divide-slate-800">
                <label className="p-3.5 flex items-center justify-between gap-3 cursor-pointer min-h-[56px]">
                  <div className="flex items-start gap-2.5">
                    <Flame className="w-4 h-4 text-[#FF5B00] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-white">Study Streak Reminders</p>
                      <p className="text-[11px] text-slate-400">
                        Same-day nudges when your streak or ward approvals need action
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationPreferences.streakReminders}
                    onChange={(e) =>
                      updateNotificationPreferences({ streakReminders: e.target.checked })
                    }
                    className="w-5 h-5 accent-[#84E000] cursor-pointer shrink-0"
                  />
                </label>

                <label className="p-3.5 flex items-center justify-between gap-3 cursor-pointer min-h-[56px]">
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-white">Inactivity Draw-Back Nudges</p>
                      <p className="text-[11px] text-slate-400">
                        Gentle return prompts after 18–24 hours away (max once daily)
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationPreferences.inactivityNudges}
                    onChange={(e) =>
                      updateNotificationPreferences({ inactivityNudges: e.target.checked })
                    }
                    className="w-5 h-5 accent-[#84E000] cursor-pointer shrink-0"
                  />
                </label>

                <label className="p-3.5 flex items-center justify-between gap-3 cursor-pointer min-h-[56px]">
                  <div className="flex items-start gap-2.5">
                    <Megaphone className="w-4 h-4 text-[#84E000] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-white">Live OTA Broadcasts</p>
                      <p className="text-[11px] text-slate-400">
                        Exam countdowns, tournament reminders & feature announcements
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationPreferences.otaBroadcasts}
                    onChange={(e) =>
                      updateNotificationPreferences({ otaBroadcasts: e.target.checked })
                    }
                    className="w-5 h-5 accent-[#84E000] cursor-pointer shrink-0"
                  />
                </label>
              </div>

              {/* Quiet Hours Configuration */}
              <div className="p-4 rounded-2xl bg-[#0D182E] border border-slate-800 flex flex-col gap-3">
                <label className="flex items-center justify-between gap-3 cursor-pointer">
                  <div className="flex items-start gap-2.5">
                    <MoonStar className="w-4 h-4 text-indigo-300 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-white">Quiet Hours for OS Popups</p>
                      <p className="text-[11px] text-slate-400">
                        Silence browser notifications overnight while saving alerts inside your inbox
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationPreferences.quietHoursEnabled}
                    onChange={(e) =>
                      updateNotificationPreferences({ quietHoursEnabled: e.target.checked })
                    }
                    className="w-5 h-5 accent-[#84E000] cursor-pointer shrink-0"
                  />
                </label>

                {notificationPreferences.quietHoursEnabled && (
                  <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-800/80">
                    <label className="flex flex-col gap-1 text-[11px] text-slate-400">
                      <span>Quiet From</span>
                      <select
                        value={notificationPreferences.quietStartHour}
                        onChange={(e) =>
                          updateNotificationPreferences({ quietStartHour: Number(e.target.value) })
                        }
                        className="min-h-[40px] px-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-white"
                      >
                        {[19, 20, 21, 22, 23].map((h) => (
                          <option key={h} value={h}>
                            {formatHourLabel(h)}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="flex flex-col gap-1 text-[11px] text-slate-400">
                      <span>Resume At</span>
                      <select
                        value={notificationPreferences.quietEndHour}
                        onChange={(e) =>
                          updateNotificationPreferences({ quietEndHour: Number(e.target.value) })
                        }
                        className="min-h-[40px] px-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-white"
                      >
                        {[5, 6, 7, 8, 9].map((h) => (
                          <option key={h} value={h}>
                            {formatHourLabel(h)}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                )}
              </div>

              {/* On-Demand Nudge Verification Helper */}
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#84E000]" />
                    <span>Preview Persona Reminder</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Generate a tailored reminder card for your current active role
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleTriggerSampleNudge}
                  className="min-h-[40px] px-3 rounded-xl bg-[#14233C] hover:bg-[#1D3254] border border-[#223B63] text-white text-xs font-bold whitespace-nowrap cursor-pointer shrink-0"
                >
                  Trigger Sample
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
