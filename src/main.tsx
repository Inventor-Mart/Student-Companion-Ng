import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'katex/dist/katex.min.css';

const EXPLICIT_API_ORIGIN = String(import.meta.env.VITE_API_ORIGIN || '').trim().replace(/\/+$/, '');
const REMOTE_API_ORIGIN = (
  EXPLICIT_API_ORIGIN ||
  'https://ais-pre-6kneqjoxpjhkhbumgktpro-896173298722.europe-west2.run.app'
).replace(/\/+$/, '');
const isBundledAndroidApk =
  typeof window !== 'undefined' && window.location.hostname === 'appassets.androidplatform.net';
const shouldRouteApiToRemoteOrigin = Boolean(EXPLICIT_API_ORIGIN) || isBundledAndroidApk;

if (typeof window !== 'undefined') {
  (window as any).__SC_RUNTIME_META__ = {
    apiOrigin: REMOTE_API_ORIGIN,
    hasExplicitApiOrigin: Boolean(EXPLICIT_API_ORIGIN),
    isBundledAndroidApk,
    shouldRouteApiToRemoteOrigin,
  };
  (window as any).__SC_CLOUD_WAKING__ = false;
}

if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
  const nativeFetch = window.fetch.bind(window);
  let activeSlowCloudRequests = 0;

  const notifyCloudWakeState = () => {
    const waking = activeSlowCloudRequests > 0;
    (window as any).__SC_CLOUD_WAKING__ = waking;
    window.dispatchEvent(
      new CustomEvent('sc:cloud-wake-change', {
        detail: { waking, count: activeSlowCloudRequests },
      })
    );
  };

  const wrappedFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const rawUrl =
      typeof input === 'string'
        ? input
        : input instanceof URL
        ? input.href
        : input.url;
    const isRelativeApi = rawUrl.startsWith('/api/');
    const isRemoteConfiguredApi =
      Boolean(REMOTE_API_ORIGIN) && rawUrl.startsWith(`${REMOTE_API_ORIGIN}/api/`);
    const isApiCall = isRelativeApi || isRemoteConfiguredApi;
    const targetInput =
      shouldRouteApiToRemoteOrigin && isRelativeApi
        ? `${REMOTE_API_ORIGIN}${rawUrl}`
        : input;
    const method = String(
      init?.method || (input instanceof Request ? input.method : 'GET')
    ).toUpperCase();
    const canRetryColdStart =
      shouldRouteApiToRemoteOrigin && isRelativeApi && (method === 'GET' || method === 'HEAD');

    let markedSlow = false;
    let slowTimer: number | null = null;
    const markSlowNow = () => {
      if (markedSlow) return;
      if (typeof navigator !== 'undefined' && navigator.onLine === false) return;
      markedSlow = true;
      activeSlowCloudRequests += 1;
      notifyCloudWakeState();
    };

    if (isApiCall && !rawUrl.includes('prewarm=1')) {
      slowTimer = window.setTimeout(markSlowNow, 2200);
    }

    try {
      const response = await nativeFetch(targetInput, init);
      if (canRetryColdStart && (response.status === 502 || response.status === 503 || response.status === 504)) {
        markSlowNow();
        await new Promise((r) => window.setTimeout(r, 2500));
        return nativeFetch(targetInput, init);
      }
      return response;
    } catch (err) {
      if (canRetryColdStart) {
        markSlowNow();
        await new Promise((r) => window.setTimeout(r, 2500));
        return nativeFetch(targetInput, init);
      }
      throw err;
    } finally {
      if (slowTimer !== null) {
        window.clearTimeout(slowTimer);
      }
      if (markedSlow) {
        activeSlowCloudRequests = Math.max(0, activeSlowCloudRequests - 1);
        notifyCloudWakeState();
      }
    }
  };

  try {
    const desc = Object.getOwnPropertyDescriptor(window, 'fetch');
    if (!desc || desc.configurable) {
      Object.defineProperty(window, 'fetch', {
        value: wrappedFetch,
        writable: true,
        configurable: true,
        enumerable: desc?.enumerable ?? true,
      });
    } else if (desc.writable) {
      window.fetch = wrappedFetch;
    }
  } catch {
    try {
      (window as any).fetch = wrappedFetch;
    } catch {
      // Ignore if environment locks window.fetch with non-configurable getter
    }
  }

  // Silently wake external Render backend in the background as soon as Netlify/APK shell mounts online
  if (
    shouldRouteApiToRemoteOrigin &&
    !REMOTE_API_ORIGIN.includes('ais-pre-') &&
    typeof navigator !== 'undefined' &&
    navigator.onLine !== false
  ) {
    nativeFetch(`${REMOTE_API_ORIGIN}/api/health?prewarm=1`, { cache: 'no-store' }).catch(() => {});
  }
}

if (typeof window !== 'undefined' && 'serviceWorker' in navigator && !isBundledAndroidApk) {
  if ('caches' in window) {
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter((name) => name === 'sc-shell-v2' || name === 'sc-runtime-v2' || name === 'sc-api-v2')
            .map((name) => caches.delete(name))
        )
      )
      .catch(() => {});
  }
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/', updateViaCache: 'none' })
      .then((reg) => {
        reg.update().catch(() => {});
      })
      .catch(() => {
        // Ignore transient SW registration failures inside restricted frames
      });
  });
}

createRoot(document.getElementById('root')!).render(<App />);
