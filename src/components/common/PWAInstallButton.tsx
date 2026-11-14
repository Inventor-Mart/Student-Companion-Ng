import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Download,
  Share,
  PlusSquare,
  ExternalLink,
  Copy,
  Check,
  X,
  Smartphone,
  Info
} from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  compact?: boolean;
  variant?: 'header' | 'compact' | 'landing' | 'drawer';
  onInstalled?: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  compact = false,
  variant,
  onInstalled
}) => {
  const { isInstallable, isInstalled, isIOS, isEmbedded, isDevPreview, standaloneUrl, install } =
    usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'manual'>('idle');
  const urlInputRef = useRef<HTMLInputElement | null>(null);

  const resolvedVariant = variant || (compact ? 'compact' : 'header');

  useEffect(() => {
    if (!showGuideModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowGuideModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showGuideModal]);

  // Suppress install affordance once running inside standalone installed PWA
  if (isInstalled) {
    return null;
  }

  const handleInstallAction = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (outcome === 'accepted') {
        setShowGuideModal(false);
        onInstalled?.();
        return;
      }
      if (outcome === 'unavailable') {
        setShowGuideModal(true);
      }
      return;
    }
    setShowGuideModal(true);
  };

  const handleCopyUrl = async () => {
    if (!standaloneUrl) return;
    let copied = false;

    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(standaloneUrl);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (!copied && typeof document !== 'undefined') {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = standaloneUrl;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.style.pointerEvents = 'none';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        copied = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch {
        copied = false;
      }
    }

    if (copied) {
      setCopyStatus('copied');
      window.setTimeout(() => setCopyStatus('idle'), 2200);
      return;
    }

    setCopyStatus('manual');
    urlInputRef.current?.focus();
    urlInputRef.current?.select();
  };

  const showStandaloneLauncher = (isEmbedded || isDevPreview) && Boolean(standaloneUrl);

  const guideModal =
    showGuideModal && typeof document !== 'undefined'
      ? createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sc-pwa-install-title"
            onClick={() => setShowGuideModal(false)}
          >
            <div
              className="my-auto w-full max-w-md max-h-[90dvh] overflow-y-auto rounded-2xl bg-[#0B1526] border border-[#1E304F] p-5 shadow-2xl text-slate-100 space-y-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="absolute top-3.5 right-3.5 text-slate-400 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-slate-900 border border-[#1E304F] transition-colors cursor-pointer"
                aria-label="Close install guide"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 pr-12">
                <img
                  src="/pwa-192x192.png"
                  alt="Student Companion app icon"
                  className="w-12 h-12 rounded-2xl border border-[#1E304F] shrink-0 object-cover"
                />
                <div className="min-w-0">
                  <h3 id="sc-pwa-install-title" className="text-base font-bold text-white tracking-tight">
                    Install Student Companion
                  </h3>
                  <p className="text-xs text-slate-400">
                    Offline-ready study notes, CBT exams &amp; games
                  </p>
                </div>
              </div>

              {isInstallable && (
                <button
                  type="button"
                  onClick={() => void handleInstallAction()}
                  className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#84E000] hover:bg-[#75c900] text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>Install Now</span>
                </button>
              )}

              {showStandaloneLauncher && (
                <div className="rounded-xl bg-[#101C34] border border-amber-500/40 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>Open Shared App Tab to Install</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Preview frames block home-screen installation, and private dev preview links trigger a 403 error outside AI Studio. Open the shared app link below directly in {isIOS ? 'Safari' : 'Chrome, Edge, or Safari'}.
                  </p>

                  <input
                    ref={urlInputRef}
                    type="text"
                    readOnly
                    value={standaloneUrl}
                    onClick={(e) => e.currentTarget.select()}
                    aria-label="Shared Student Companion app URL"
                    className="w-full rounded-lg bg-[#081020] border border-[#1E304F] px-3 py-2 text-[11px] font-mono text-slate-200 select-all focus:outline-none focus:border-[#84E000]"
                  />

                  <div className="flex items-center gap-2">
                    <a
                      href={standaloneUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-h-[44px] py-2 px-4 rounded-xl bg-[#84E000] hover:bg-[#75c900] text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                    >
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      <span>Open Standalone App</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => void handleCopyUrl()}
                      className="min-h-[44px] py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-[#1E304F] text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                      title="Copy shared app URL"
                    >
                      {copyStatus === 'copied' ? (
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

                  {copyStatus === 'manual' && (
                    <p className="text-[11px] text-amber-300 leading-relaxed">
                      Browser preview blocked automatic copy — tap the URL field above to select and copy it manually.
                    </p>
                  )}

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    If your browser asks for permission on first launch, confirm <strong>Share</strong> access is enabled in AI Studio or sign into the same Google account in your browser.
                  </p>
                </div>
              )}

              {isIOS ? (
                <div className="rounded-xl bg-[#101C34] border border-[#1E304F] p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <Smartphone className="w-4 h-4 text-[#FF5B00] shrink-0" />
                    <span>Add to iPhone / iPad Home Screen</span>
                  </div>
                  <ol className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <span className="font-mono text-[11px] font-bold text-[#84E000] mt-0.5">01.</span>
                      <span>
                        Open the shared link in <strong>Safari</strong> and tap the{' '}
                        <Share className="inline w-3.5 h-3.5 text-[#84E000] mx-0.5 align-text-bottom" />{' '}
                        <strong>Share</strong> icon in the toolbar.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="font-mono text-[11px] font-bold text-[#84E000] mt-0.5">02.</span>
                      <span>
                        Scroll down and tap{' '}
                        <PlusSquare className="inline w-3.5 h-3.5 text-[#FF5B00] mx-0.5 align-text-bottom" />{' '}
                        <strong>Add to Home Screen</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="font-mono text-[11px] font-bold text-[#84E000] mt-0.5">03.</span>
                      <span>
                        Tap <strong>Add</strong> in the top corner to launch offline anytime.
                      </span>
                    </li>
                  </ol>
                </div>
              ) : !showStandaloneLauncher ? (
                <div className="rounded-xl bg-[#101C34] border border-[#1E304F] p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <Info className="w-4 h-4 text-[#84E000] shrink-0" />
                    <span>Install via Browser Menu</span>
                  </div>
                  <ol className="space-y-2 text-xs text-slate-300 leading-relaxed">
                    <li>1. Click the install icon in your browser address bar or open the browser menu.</li>
                    <li>2. Select <strong>Install Student Companion</strong> or <strong>Add to Home screen</strong>.</li>
                  </ol>
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>,
          document.body
        )
      : null;

  if (resolvedVariant === 'drawer') {
    return (
      <>
        <button
          type="button"
          onClick={() => void handleInstallAction()}
          className="w-full flex items-center justify-between p-3 min-h-[48px] rounded-xl border border-emerald-700/60 bg-[#101C31] hover:bg-[#162846] text-slate-100 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#84E000]/15 text-[#84E000] flex items-center justify-center shrink-0">
              <Download className="w-4 h-4" />
            </div>
            <div className="text-left min-w-0">
              <span className="font-semibold block text-white truncate">
                {isInstallable
                  ? 'Install App to Device'
                  : isIOS
                  ? 'Install on iPhone / iPad'
                  : 'Install Offline App'}
              </span>
              <span className="text-[11px] text-slate-400 block truncate">
                {isInstallable
                  ? 'One-tap home screen install · Works offline'
                  : 'Launch standalone without internet'}
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-[#84E000] text-slate-950 font-bold text-[11px] whitespace-nowrap shrink-0">
            Install
          </span>
        </button>
        {guideModal}
      </>
    );
  }

  if (resolvedVariant === 'landing') {
    return (
      <>
        <button
          type="button"
          onClick={() => void handleInstallAction()}
          className="min-h-[44px] px-3 sm:px-3.5 py-2 rounded-xl bg-[#162746] hover:bg-[#1E335A] active:scale-95 border border-[#84E000]/60 text-[#84E000] font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0"
          aria-label="Install Student Companion app"
        >
          <Download className="w-3.5 h-3.5 shrink-0" />
          <span className="sm:hidden">Install</span>
          <span className="hidden sm:inline">Install App</span>
        </button>
        {guideModal}
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => void handleInstallAction()}
        className={`flex items-center gap-1.5 rounded-lg bg-[#84E000] hover:bg-[#75c900] active:scale-95 text-slate-950 font-black transition-all cursor-pointer shadow-sm whitespace-nowrap shrink-0 ${
          resolvedVariant === 'compact'
            ? 'px-2.5 min-h-[38px] text-[11px]'
            : 'px-3 py-1.5 min-h-[44px] text-xs'
        }`}
        title={isInstallable ? 'Install Student Companion App' : 'Install or view Safari instructions'}
        aria-label="Install Student Companion App"
      >
        <Download className="w-3.5 h-3.5 shrink-0" />
        <span className={resolvedVariant === 'compact' ? 'hidden' : 'hidden sm:inline'}>Install App</span>
        <span className={resolvedVariant === 'compact' ? 'inline' : 'inline sm:hidden'}>Install</span>
      </button>
      {guideModal}
    </>
  );
};
