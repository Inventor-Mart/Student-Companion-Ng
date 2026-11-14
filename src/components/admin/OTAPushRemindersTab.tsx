import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  NOTIFICATION_DEEP_LINK_CATALOG,
  subscribeToOTANotificationBroadcasts,
  saveOTANotificationBroadcast,
  deleteOTANotificationBroadcast,
  dispatchBrowserNotification,
  getBrowserNotificationPermission,
  requestBrowserNotificationPermission,
  DEFAULT_NOTIFICATION_PREFERENCES
} from '../../services/notificationService';
import {
  AppNotificationItem,
  NotificationCategory,
  NotificationDeepLinkTab,
  OTANotificationBroadcast,
  UserRole
} from '../../types';
import {
  BellRing,
  CheckCircle2,
  Clock,
  Flame,
  Megaphone,
  PauseCircle,
  PlayCircle,
  Send,
  Sparkles,
  Trash2,
  Users,
  ArrowRight,
  Eye
} from 'lucide-react';

interface OTAPushRemindersTabProps {
  onFeedback: (msg: string) => void;
}

const PERSONA_OPTIONS: { role: UserRole | 'all'; label: string }[] = [
  { role: 'all', label: 'All Personas' },
  { role: 'student', label: 'Students' },
  { role: 'parent', label: 'Parents' },
  { role: 'tutor', label: 'Tutors' },
  { role: 'school_admin', label: 'School Admins' },
  { role: 'growth_partner', label: 'Growth Partners' }
];

const QUICK_CAMPAIGN_PRESETS: {
  name: string;
  title: string;
  body: string;
  category: NotificationCategory;
  targetRoles: (UserRole | 'all')[];
  deepLinkTab: NotificationDeepLinkTab;
  actionLabel: string;
  priority: 'standard' | 'high';
}[] = [
  {
    name: 'Student Streak Saver',
    title: 'Don’t break your evening study streak',
    body: 'Spend 5 minutes on a quick NERDC Quiz or Lesson Note tonight to lock your daily XP streak.',
    category: 'streak_risk',
    targetRoles: ['student'],
    deepLinkTab: 'cbt',
    actionLabel: 'Take 5-Min Quiz',
    priority: 'high'
  },
  {
    name: 'Parent Weekly Check-In',
    title: 'Check your ward’s weekly progress & approvals',
    body: 'Review this week’s verified reading minutes, CBT scores, and any pending tutor bookings.',
    category: 'inactivity_nudge',
    targetRoles: ['parent'],
    deepLinkTab: 'parent_overview',
    actionLabel: 'Check Ward Progress',
    priority: 'standard'
  },
  {
    name: 'Tutor Availability Nudge',
    title: 'WAEC & JAMB students are booking tutors now',
    body: 'Check pending session requests and keep your weekly teaching slots updated for extra income.',
    category: 'inactivity_nudge',
    targetRoles: ['tutor'],
    deepLinkTab: 'tutor_sessions',
    actionLabel: 'Review Requests',
    priority: 'standard'
  },
  {
    name: 'School League Sprint',
    title: 'Inter-School League Rankings Updated',
    body: 'Encourage your students to finish their weekly CBT drills and boost your school’s national rank.',
    category: 'ota_engagement',
    targetRoles: ['school_admin', 'student'],
    deepLinkTab: 'school_overview',
    actionLabel: 'View Standings',
    priority: 'high'
  }
];

export const OTAPushRemindersTab: React.FC<OTAPushRemindersTabProps> = ({ onFeedback }) => {
  const { currentUserProfile } = useApp();

  const [broadcasts, setBroadcasts] = useState<OTANotificationBroadcast[]>([]);
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [category, setCategory] = useState<NotificationCategory>('streak_risk');
  const [priority, setPriority] = useState<'standard' | 'high'>('high');
  const [targetRoles, setTargetRoles] = useState<(UserRole | 'all')[]>(['student']);
  const [deepLinkTab, setDeepLinkTab] = useState<NotificationDeepLinkTab>('cbt');
  const [actionLabel, setActionLabel] = useState<string>('Resume Drill');
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [browserPerm, setBrowserPerm] = useState<NotificationPermission | 'unsupported'>(() =>
    getBrowserNotificationPermission()
  );

  useEffect(() => {
    const unsub = subscribeToOTANotificationBroadcasts(setBroadcasts);
    return () => unsub();
  }, []);

  const toggleRole = (role: UserRole | 'all') => {
    if (role === 'all') {
      setTargetRoles(['all']);
      return;
    }
    setTargetRoles((prev) => {
      const withoutAll = prev.filter((r) => r !== 'all');
      const exists = withoutAll.includes(role);
      const next = exists ? withoutAll.filter((r) => r !== role) : [...withoutAll, role];
      return next.length > 0 ? next : ['student'];
    });
  };

  const applyPreset = (preset: (typeof QUICK_CAMPAIGN_PRESETS)[number]) => {
    setTitle(preset.title);
    setBody(preset.body);
    setCategory(preset.category);
    setTargetRoles(preset.targetRoles);
    setDeepLinkTab(preset.deepLinkTab);
    setActionLabel(preset.actionLabel);
    setPriority(preset.priority);
    onFeedback(`Loaded "${preset.name}" template into composer.`);
  };

  const handleDeepLinkChange = (nextTab: NotificationDeepLinkTab) => {
    setDeepLinkTab(nextTab);
    const meta = NOTIFICATION_DEEP_LINK_CATALOG.find((item) => item.tab === nextTab);
    if (meta) setActionLabel(meta.defaultActionLabel);
  };

  const handlePreviewPush = async () => {
    const perm =
      browserPerm === 'granted' ? 'granted' : await requestBrowserNotificationPermission();
    setBrowserPerm(perm);
    if (perm !== 'granted') {
      onFeedback('Allow browser notification permission when prompted to preview OS alerts.');
      return;
    }

    const previewItem: AppNotificationItem = {
      id: `preview_${Date.now()}`,
      source: 'ota_broadcast',
      category,
      targetRoles,
      title: title.trim() || 'Student Companion Study Reminder',
      body:
        body.trim() ||
        'Complete a quick 5-minute drill today to protect your learning streak.',
      deepLinkTab,
      actionLabel: actionLabel.trim() || 'Open App',
      createdAt: new Date().toISOString(),
      read: false,
      priority
    };

    const sent = await dispatchBrowserNotification(previewItem, DEFAULT_NOTIFICATION_PREFERENCES, {
      bypassQuietHours: true
    });
    if (sent) {
      onFeedback('Preview browser notification dispatched to your device.');
    } else {
      onFeedback('Unable to display native browser notification in this viewport.');
    }
  };

  const handlePublishCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      onFeedback('Please provide both a notification headline and message body.');
      return;
    }

    setIsPublishing(true);
    try {
      const payload: OTANotificationBroadcast = {
        id: `ota_notif_${Date.now()}`,
        title: title.trim().slice(0, 90),
        body: body.trim().slice(0, 280),
        category,
        targetRoles,
        deepLinkTab,
        actionLabel: (actionLabel.trim() || 'Open App').slice(0, 40),
        priority,
        isActive: true,
        createdAt: new Date().toISOString(),
        createdBy: currentUserProfile?.email || 'martorefe@gmail.com'
      };
      await saveOTANotificationBroadcast(payload);
      setTitle('');
      setBody('');
      onFeedback(`Live OTA notification "${payload.title}" published to selected personas.`);
    } catch (err: any) {
      onFeedback(`Failed to publish OTA notification: ${err?.message || 'Check permissions'}`);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleToggleActive = async (item: OTANotificationBroadcast) => {
    try {
      await saveOTANotificationBroadcast({
        ...item,
        isActive: !item.isActive
      });
      onFeedback(
        item.isActive
          ? `Paused broadcast "${item.title}".`
          : `Resumed broadcast "${item.title}".`
      );
    } catch (err: any) {
      onFeedback(`Failed to update broadcast: ${err?.message || 'Error'}`);
    }
  };

  const handleDelete = async (item: OTANotificationBroadcast) => {
    try {
      await deleteOTANotificationBroadcast(item.id);
      onFeedback(`Deleted broadcast "${item.title}".`);
    } catch (err: any) {
      onFeedback(`Failed to delete broadcast: ${err?.message || 'Error'}`);
    }
  };

  const activeCount = broadcasts.filter((b) => b.isActive).length;

  return (
    <div className="flex flex-col gap-5">
      {/* Studio Summary Strip */}
      <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <BellRing className="w-4 h-4 text-[#84E000]" />
            <span>Push Notifications & Draw-Back Reminder Studio</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Send live OTA reminders to users’ in-app Bell Inbox and Browser Push alerts, complementing automated streak & inactivity nudges.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono tabular-nums text-slate-300 shrink-0">
          <span>
            Active: <strong className="text-[#84E000]">{activeCount}</strong>
          </span>
          <span className="text-slate-600">·</span>
          <span>
            Total: <strong className="text-white">{broadcasts.length}</strong>
          </span>
        </div>
      </div>

      {/* Quick Presets Bar */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">
          Quick Templates:
        </span>
        {QUICK_CAMPAIGN_PRESETS.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => applyPreset(preset)}
            className="min-h-[36px] px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Sparkles className="w-3 h-3 text-[#84E000]" />
            <span>{preset.name}</span>
          </button>
        ))}
      </div>

      {/* Main 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Composer Form */}
        <form
          onSubmit={handlePublishCampaign}
          className="lg:col-span-7 p-4 sm:p-5 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Compose OTA Push Campaign</h3>
            <span className="text-[11px] font-mono text-slate-400">
              Browser Permission: <strong className="text-slate-200">{browserPerm}</strong>
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-300">Notification Title</label>
              <span className="font-mono text-[11px] tabular-nums text-slate-500">
                {title.length}/90
              </span>
            </div>
            <input
              type="text"
              value={title}
              maxLength={90}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Protect your 7-day study streak tonight!"
              className="min-h-[42px] px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#84E000]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-300">Reminder Message</label>
              <span className="font-mono text-[11px] tabular-nums text-slate-500">
                {body.length}/280
              </span>
            </div>
            <textarea
              rows={3}
              value={body}
              maxLength={280}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write a clear motivational call-to-action drawing users back into the app..."
              className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#84E000] resize-y"
            />
          </div>

          {/* Target Personas */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#84E000]" />
              <span>Target Personas</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PERSONA_OPTIONS.map((opt) => {
                const selected = targetRoles.includes(opt.role);
                return (
                  <button
                    key={opt.role}
                    type="button"
                    onClick={() => toggleRole(opt.role)}
                    className={`min-h-[38px] px-3 rounded-lg border text-xs font-semibold text-left flex items-center justify-between cursor-pointer transition-colors ${
                      selected
                        ? 'bg-[#14233C] border-[#84E000]/60 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {selected && <CheckCircle2 className="w-3.5 h-3.5 text-[#84E000] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category, Priority, Deep-Link Route */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex flex-col gap-1.5 text-xs">
              <span className="font-semibold text-slate-300">Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as NotificationCategory)}
                className="min-h-[42px] px-3 bg-slate-950 border border-slate-700 rounded-lg text-white"
              >
                <option value="streak_risk">Study Streak Alert</option>
                <option value="inactivity_nudge">Inactivity Draw-Back Nudge</option>
                <option value="ota_engagement">OTA Platform Broadcast</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-xs">
              <span className="font-semibold text-slate-300">Urgency</span>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'standard' | 'high')}
                className="min-h-[42px] px-3 bg-slate-950 border border-slate-700 rounded-lg text-white"
              >
                <option value="high">High Priority (OS + Inbox)</option>
                <option value="standard">Standard Reminder</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-xs">
              <span className="font-semibold text-slate-300">Deep-Link Destination</span>
              <select
                value={deepLinkTab}
                onChange={(e) => handleDeepLinkChange(e.target.value as NotificationDeepLinkTab)}
                className="min-h-[42px] px-3 bg-slate-950 border border-slate-700 rounded-lg text-white"
              >
                {NOTIFICATION_DEEP_LINK_CATALOG.map((route) => (
                  <option key={route.tab} value={route.tab}>
                    {route.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-xs">
              <span className="font-semibold text-slate-300">Button Action Label</span>
              <input
                type="text"
                maxLength={40}
                value={actionLabel}
                onChange={(e) => setActionLabel(e.target.value)}
                placeholder="e.g. Resume Drill"
                className="min-h-[42px] px-3 bg-slate-950 border border-slate-700 rounded-lg text-white"
              />
            </label>
          </div>

          {/* Actions */}
          <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
            <button
              type="button"
              onClick={handlePreviewPush}
              className="min-h-[42px] px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#84E000]" />
              <span>Preview Browser Push</span>
            </button>

            <button
              type="submit"
              disabled={isPublishing}
              className="min-h-[42px] px-5 rounded-xl bg-[#84E000] hover:bg-[#74c700] text-slate-950 text-xs font-black flex items-center gap-1.5 cursor-pointer disabled:opacity-60 active:scale-[0.98] transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isPublishing ? 'Publishing...' : 'Publish Live OTA Push'}</span>
            </button>
          </div>
        </form>

        {/* Right: Live Inbox & OS Notification Preview + Automated Rules Summary */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-4 sm:p-5 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col gap-3">
            <h3 className="text-sm font-bold text-white">Live Notification Preview</h3>

            {/* Simulated Browser OS Push Toast */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#14233C] border border-[#223B63] flex items-center justify-center text-[#84E000] font-black text-xs shrink-0">
                SC
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-slate-400">
                    Student Companion · now
                  </span>
                </div>
                <p className="text-xs font-bold text-white mt-0.5 truncate">
                  {title.trim() || 'Keep Your Termly Study Streak Alive'}
                </p>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                  {body.trim() ||
                    'Complete a quick 5-minute drill or lesson note to keep your streak unbroken.'}
                </p>
              </div>
            </div>

            {/* Simulated Bell Inbox Row */}
            <div className="p-3.5 rounded-xl bg-[#12203A]/80 border border-[#223B63] flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#84E000]/15 border border-[#84E000]/40 flex items-center justify-center text-[#84E000] shrink-0">
                {category === 'streak_risk' ? (
                  <Flame className="w-4 h-4 text-[#FF5B00]" />
                ) : category === 'inactivity_nudge' ? (
                  <Clock className="w-4 h-4 text-sky-400" />
                ) : (
                  <Megaphone className="w-4 h-4 text-[#84E000]" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white">
                  {title.trim() || 'Keep Your Termly Study Streak Alive'}
                </p>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  {body.trim() ||
                    'Complete a quick 5-minute drill or lesson note to keep your streak unbroken.'}
                </p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-slate-400">
                    Target: {targetRoles.join(', ')}
                  </span>
                  <span className="text-[11px] font-bold text-[#84E000] flex items-center gap-1">
                    {actionLabel.trim() || 'Open App'}
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col gap-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Automated Persona Triggers (Always Active)
            </h4>
            <ul className="text-xs text-slate-400 flex flex-col gap-1.5">
              <li>• <strong className="text-slate-200">Students:</strong> Same-day streak-at-risk & 18h inactivity draw-back nudges</li>
              <li>• <strong className="text-slate-200">Parents:</strong> Pending ward approvals & weekly study progress check-ins</li>
              <li>• <strong className="text-slate-200">Tutors:</strong> Upcoming confirmed sessions & availability nudges</li>
              <li>• <strong className="text-slate-200">Schools & Partners:</strong> League standings & referral momentum check-ins</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Published Campaigns Ledger */}
      <div className="rounded-xl bg-slate-900/70 border border-slate-800 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Published OTA Notification Broadcasts</h3>
          <span className="text-xs font-mono tabular-nums text-slate-400">
            {broadcasts.length} campaign{broadcasts.length === 1 ? '' : 's'}
          </span>
        </div>

        {broadcasts.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            No live OTA notification campaigns yet. Compose your first push above or pick a quick template.
          </div>
        ) : (
          <div className="divide-y divide-slate-800/80">
            {broadcasts.map((item) => (
              <div
                key={item.id}
                className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-950/50 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        item.isActive ? 'bg-[#84E000]' : 'bg-slate-600'
                      }`}
                    />
                    <span className="text-xs sm:text-sm font-bold text-white truncate">
                      {item.title}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 tabular-nums">
                      · {item.targetRoles.join(', ')} · {item.deepLinkTab}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.body}</p>
                  <p className="text-[11px] font-mono tabular-nums text-slate-500 mt-1">
                    {new Date(item.createdAt).toLocaleString()} · CTA: {item.actionLabel}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggleActive(item)}
                    className={`min-h-[36px] px-3 rounded-lg border text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                      item.isActive
                        ? 'bg-slate-950 border-slate-700 text-amber-300 hover:bg-slate-800'
                        : 'bg-[#14233C] border-[#223B63] text-[#84E000] hover:bg-[#1D3254]'
                    }`}
                  >
                    {item.isActive ? (
                      <>
                        <PauseCircle className="w-3.5 h-3.5" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-3.5 h-3.5" />
                        <span>Activate</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item)}
                    className="min-h-[36px] min-w-[36px] px-2.5 rounded-lg bg-slate-950 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-700/50 text-slate-400 hover:text-rose-300 flex items-center justify-center cursor-pointer"
                    aria-label={`Delete ${item.title}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
