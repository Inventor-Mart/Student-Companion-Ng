import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Download,
  Smartphone,
  CheckCircle2,
  Package,
  Globe,
  Cpu,
  X,
  Info,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface PWAInstallButtonProps {
  compact?: boolean;
}

interface ApkStatusResponse {
  apkReady: boolean;
  apkUrl: string | null;
  apkSizeBytes: number;
  versionName: string;
  standalonePwaUrl: string;
  studioKitUrl: string;
  offlinePwaUrl: string;
  workflowOnRemote?: boolean;
  latestRun?: {
    status: string;
    conclusion: string | null;
    htmlUrl: string;
    createdAt: string;
  } | null;
  actionsPageUrl?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ compact = false }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isEmbedded, setIsEmbedded] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showManualSteps, setShowManualSteps] = useState(false);
  const [apkStatus, setApkStatus] = useState<ApkStatusResponse | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

  useEffect(() => {
    const checkStandalone = () =>
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      document.referrer.includes('android-app://');

    setIsInstalled(checkStandalone());

    try {
      setIsEmbedded(window.self !== window.top);
    } catch {
      setIsEmbedded(true);
    }

    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));

    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsInstalled(true);
        setShowMenu(false);
      }
    };

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowMenu(false);
    };

    mediaQuery.addEventListener?.('change', handleDisplayModeChange);
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      mediaQuery.removeEventListener?.('change', handleDisplayModeChange);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  useEffect(() => {
    if (!showMenu) return;

    fetch('/api/android/apk-status')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success) {
          setApkStatus(data);
        }
      })
      .catch(() => null);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowMenu(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showMenu]);

  // Once installed or running in standalone mode, hide the install button completely
  if (isInstalled) {
    return null;
  }

  const standaloneUrl =
    apkStatus?.standalonePwaUrl ||
    (typeof window !== 'undefined' ? window.location.origin : '');

  const handleOnlineInstall = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setIsInstalled(true);
          setDeferredPrompt(null);
          setShowMenu(false);
        }
      } catch {
        setShowManualSteps(true);
      }
    } else {
      setShowManualSteps((prev) => !prev);
    }
  };

  const handleCopyInstallUrl = () => {
    if (!standaloneUrl) return;
    try {
      void navigator.clipboard.writeText(standaloneUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch {}
  };

  const modalPortal =
    showMenu && typeof document !== 'undefined'
      ? createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sc-pwa-modal-title"
            onClick={() => setShowMenu(false)}
          >
            <div
              className="my-auto w-full max-w-md max-h-[90dvh] overflow-y-auto rounded-2xl bg-[#0B1526] border border-slate-700 p-5 shadow-2xl text-slate-100 space-y-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowMenu(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-slate-900 border border-slate-700 transition-colors cursor-pointer"
                aria-label="Close download menu"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 pr-10">
                <img
                  src="/pwa-192x192.png"
                  alt="Student Companion icon"
                  className="w-11 h-11 rounded-xl border border-slate-700 shrink-0 object-cover"
                />
                <div className="min-w-0">
                  <h3 id="sc-pwa-modal-title" className="text-sm font-bold text-white tracking-tight">
                    Install Student Companion
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Installable PWA (Android 6+ / iOS) &amp; Cloud-Built Android APK
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                {/* Option 1: Install Online PWA */}
                <button
                  type="button"
                  onClick={() => void handleOnlineInstall()}
                  className="w-full bg-slate-950 hover:bg-slate-900 border border-emerald-700/70 hover:border-[#84E000] rounded-xl p-3 flex items-center justify-between gap-3 text-left transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-800 flex items-center justify-center text-[#84E000] shrink-0 group-hover:scale-105 transition-transform">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white group-hover:text-[#84E000] transition-colors">
                        {deferredPrompt
                          ? 'Install App to Home Screen Now'
                          : 'Install Online PWA (Android 6+ & Desktop)'}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {deferredPrompt
                          ? 'Ready — tap to open native browser install prompt'
                          : isEmbedded
                          ? 'Open standalone tab to install directly on your device'
                          : 'Works offline after first load · Zero App Store needed'}
                      </div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-[#84E000] shrink-0" />
                </button>

                {(showManualSteps || (isEmbedded && !deferredPrompt)) && (
                  <div className="bg-[#111E35] border border-amber-500/40 rounded-xl p-3 text-xs text-slate-200 space-y-2">
                    <div className="flex items-center gap-1.5 font-semibold text-amber-300">
                      <Info className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        {isIOS
                          ? 'Install on iPhone / iPad (Safari)'
                          : isEmbedded
                          ? 'Open Standalone Link to Install'
                          : 'Install via Browser Menu'}
                      </span>
                    </div>
                    {isEmbedded ? (
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        Browser security blocks PWA installation inside embedded preview frames. Open the live app URL directly in Chrome/Edge on Android 6+ or Safari on iOS, then tap <strong>Install</strong>.
                      </p>
                    ) : isIOS ? (
                      <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-300">
                        <li>Tap the Share icon in Safari.</li>
                        <li>Select &quot;Add to Home Screen&quot; and confirm.</li>
                      </ol>
                    ) : (
                      <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-300">
                        <li>Tap your browser menu (three dots) or the address-bar install icon.</li>
                        <li>Select &quot;Install App&quot; or &quot;Add to Home screen&quot;.</li>
                      </ol>
                    )}

                    {standaloneUrl && (
                      <div className="flex items-center gap-2 pt-1">
                        <a
                          href={standaloneUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-3 rounded-lg bg-[#84E000] hover:bg-[#75c900] text-slate-950 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Open Standalone App</span>
                        </a>
                        <button
                          type="button"
                          onClick={handleCopyInstallUrl}
                          className="py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                          title="Copy standalone app URL"
                        >
                          {copiedUrl ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#84E000]" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy URL</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Option 2: Signed Android APK (from GitHub Releases) OR Cloud Build Status */}
                {apkStatus?.apkReady && apkStatus.apkUrl ? (
                  <a
                    href={apkStatus.apkUrl}
                    className="w-full bg-slate-950 hover:bg-slate-900 border border-amber-800/60 hover:border-amber-500 rounded-xl p-3 flex items-center justify-between gap-3 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-amber-950/80 border border-amber-800 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                          Download Signed Android APK ({apkStatus.versionName})
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Android 6.0+ (minSdk 23) · {(apkStatus.apkSizeBytes / (1024 * 1024)).toFixed(1)} MB
                        </div>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-amber-400 shrink-0" />
                  </a>
                ) : apkStatus?.latestRun &&
                  (apkStatus.latestRun.status === 'in_progress' || apkStatus.latestRun.status === 'queued') ? (
                  <a
                    href={apkStatus.latestRun.htmlUrl || apkStatus.actionsPageUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-slate-950 hover:bg-slate-900 border border-amber-600/70 rounded-xl p-3 flex items-center justify-between gap-3 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-amber-950/80 border border-amber-700 flex items-center justify-center text-amber-400 shrink-0 animate-pulse">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-amber-300">
                          Android 6+ APK Compiling on GitHub...
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Takes ~2–3 mins · Tap to view live GitHub Actions build progress
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-amber-400 shrink-0" />
                  </a>
                ) : (
                  <div className="w-full bg-slate-950 border border-amber-800/60 rounded-xl p-3 space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-amber-950/80 border border-amber-800 flex items-center justify-center text-amber-400 shrink-0">
                          <Smartphone className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white">
                            Android 6+ APK (GitHub Cloud Build)
                          </div>
                          <div className="text-[11px] text-slate-400">
                            No Android Studio needed · Super Admin compiles APK via GitHub Actions
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-0.5">
                      {apkStatus?.actionsPageUrl && (
                        <a
                          href={apkStatus.actionsPageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-1.5 px-2.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-600/50 text-amber-300 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Open GitHub Actions</span>
                        </a>
                      )}
                      <a
                        href="/api/download/android-studio-kit"
                        className="py-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                        title="Optional Gradle project source archive"
                      >
                        <Download className="w-3 h-3" />
                        <span>Source .zip</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Option 3: Offline PWA & Icon Assets Archive (.zip) */}
                <a
                  href="/api/download/offline-pwa-bundle"
                  className="w-full bg-slate-950 hover:bg-slate-900 border border-sky-800/60 hover:border-sky-500 rounded-xl p-3 flex items-center justify-between gap-3 text-left transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-sky-950/80 border border-sky-800 flex items-center justify-center text-sky-400 shrink-0 group-hover:scale-105 transition-transform">
                      <Package className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">
                        Download Offline PWA &amp; Icons (.zip)
                      </div>
                      <div className="text-[11px] text-slate-400">
                        512px Android &amp; 1024px iOS PNGs + manifest + Service Worker
                      </div>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-sky-400 shrink-0" />
                </a>
              </div>

              <div className="text-[11px] text-slate-400 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
                Compatible with Android 6.0 Marshmallow up to Android 15+, iOS Safari, and Desktop Chrome/Edge.
              </div>

              <button
                type="button"
                onClick={() => setShowMenu(false)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Close Menu
              </button>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setShowManualSteps(false);
          setShowMenu(true);
        }}
        className={`flex items-center gap-1.5 rounded-lg bg-[#84E000] hover:bg-[#75c900] active:scale-95 text-slate-950 font-black transition-all cursor-pointer shadow-sm whitespace-nowrap shrink-0 ${
          compact
            ? 'px-2 min-h-[36px] text-[11px]'
            : 'px-2.5 sm:px-3 py-1.5 min-h-[40px] text-xs'
        }`}
        title="Install Student Companion app"
        aria-label="Install Student Companion app"
      >
        <Download className="w-3.5 h-3.5 shrink-0" />
        <span className={compact ? 'hidden' : 'hidden sm:inline'}>Install App</span>
        <span className={compact ? 'inline' : 'inline sm:hidden'}>Install</span>
      </button>

      {modalPortal}
    </>
  );
};
