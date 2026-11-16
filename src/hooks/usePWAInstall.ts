import { useCallback, useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

declare global {
  interface Window {
    __scDeferredInstallPrompt?: BeforeInstallPromptEvent | null;
  }
}

const FALLBACK_SHARED_APP_URL = 'https://student-companion-api-b373.onrender.com';

function resolveClientStandaloneUrl(): { url: string; isDevPreview: boolean } {
  if (typeof window === 'undefined') {
    return { url: FALLBACK_SHARED_APP_URL, isDevPreview: false };
  }
  const hostname = window.location.hostname || '';
  const origin = window.location.origin || '';
  const isDevPreview = hostname.startsWith('ais-dev-');
  if (isDevPreview) {
    return {
      url: origin.replace('://ais-dev-', '://ais-pre-'),
      isDevPreview: true
    };
  }
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return {
      url: origin || FALLBACK_SHARED_APP_URL,
      isDevPreview: false
    };
  }
  return {
    url: origin || FALLBACK_SHARED_APP_URL,
    isDevPreview: false
  };
}

export function usePWAInstall() {
  const initialStandalone = resolveClientStandaloneUrl();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(() =>
    typeof window !== 'undefined' ? window.__scDeferredInstallPrompt || null : null
  );
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isEmbedded, setIsEmbedded] = useState<boolean>(false);
  const [standaloneUrl, setStandaloneUrl] = useState<string>(initialStandalone.url);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkStandalone = () =>
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      document.referrer.includes('android-app://');

    setIsInstalled(checkStandalone());

    let embedded = false;
    try {
      embedded = window.self !== window.top;
    } catch {
      embedded = true;
    }
    setIsEmbedded(embedded);

    const resolved = resolveClientStandaloneUrl();
    setStandaloneUrl(resolved.url);

    if (embedded && resolved.isDevPreview) {
      fetch('/api/pwa/config')
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          const remoteUrl = typeof data?.standaloneUrl === 'string' ? data.standaloneUrl.trim() : '';
          if (remoteUrl && /^https?:\/\//i.test(remoteUrl) && !remoteUrl.includes('://ais-dev-')) {
            setStandaloneUrl(remoteUrl.replace(/\/+$/, ''));
          }
        })
        .catch(() => {});
    }

    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice =
      /iphone|ipad|ipod/.test(ua) ||
      (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);
    setIsIOS(isIOSDevice);

    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsInstalled(true);
        setDeferredPrompt(null);
        window.__scDeferredInstallPrompt = null;
      }
    };

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      window.__scDeferredInstallPrompt = promptEvent;
      setDeferredPrompt(promptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      window.__scDeferredInstallPrompt = null;
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

  const install = useCallback(async (): Promise<'accepted' | 'dismissed' | 'unavailable'> => {
    const promptObj = deferredPrompt || (typeof window !== 'undefined' ? window.__scDeferredInstallPrompt : null);
    if (!promptObj) {
      return 'unavailable';
    }
    try {
      await promptObj.prompt();
      const { outcome } = await promptObj.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
        if (typeof window !== 'undefined') {
          window.__scDeferredInstallPrompt = null;
        }
        return 'accepted';
      }
      return 'dismissed';
    } catch {
      return 'unavailable';
    }
  }, [deferredPrompt]);

  return {
    isInstallable: Boolean(deferredPrompt),
    isInstalled,
    isIOS,
    isEmbedded,
    standaloneUrl,
    install
  };
}
