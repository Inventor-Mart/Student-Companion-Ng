import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'katex/dist/katex.min.css';

const DEFAULT_LIVE_BACKEND_ORIGIN = 'https://student-companion-api-b373.onrender.com';
const EXPLICIT_API_ORIGIN = String(import.meta.env.VITE_API_ORIGIN || '').trim().replace(/\/+$/, '');
const REMOTE_API_ORIGIN = (
  EXPLICIT_API_ORIGIN || DEFAULT_LIVE_BACKEND_ORIGIN
).replace(/\/+$/, '');
const isBundledAndroidApk =
  typeof window !== 'undefined' && window.location.hostname === 'appassets.androidplatform.net';
const isNetlifyHosted =
  typeof window !== 'undefined' && window.location.hostname.toLowerCase().endsWith('.netlify.app');
const shouldRouteApiToRemoteOrigin =
  Boolean(EXPLICIT_API_ORIGIN) || isBundledAndroidApk || isNetlifyHosted;

if (typeof window !== 'undefined') {
  (window as any).__SC_RUNTIME_META__ = {
    apiOrigin: REMOTE_API_ORIGIN,
    hasExplicitApiOrigin: Boolean(EXPLICIT_API_ORIGIN),
    isBundledAndroidApk,
    isNetlifyHosted,
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

  const waitWithSignal = (ms: number, signal?: AbortSignal | null): Promise<boolean> => {
    if (signal?.aborted) return Promise.resolve(false);
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return Promise.resolve(false);
    return new Promise((resolve) => {
      let settled = false;
      const onAbort = () => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timer);
        signal?.removeEventListener('abort', onAbort);
        resolve(false);
      };
      const timer = window.setTimeout(() => {
        if (settled) return;
        settled = true;
        signal?.removeEventListener('abort', onAbort);
        resolve(true);
      }, ms);
      signal?.addEventListener('abort', onAbort, { once: true });
    });
  };

  const probeHealthReady = async (healthUrl: string, timeoutMs = 4500): Promise<boolean> => {
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return false;
    const ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = ctrl ? window.setTimeout(() => ctrl.abort(), timeoutMs) : null;
    try {
      const res = await nativeFetch(healthUrl, {
        method: 'GET',
        cache: 'no-store',
        ...(ctrl ? { signal: ctrl.signal } : {}),
      });
      return res.ok;
    } catch {
      return false;
    } finally {
      if (timer !== null) window.clearTimeout(timer);
    }
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
    const isIdempotentAiCoachPost =
      method === 'POST' &&
      (rawUrl.startsWith('/api/gemini/study-tutor') || rawUrl.startsWith('/api/ai/study-coach'));
    const canRetryTransient =
      (typeof navigator === 'undefined' || navigator.onLine !== false) &&
      (isRelativeApi || isRemoteConfiguredApi) &&
      !rawUrl.includes('prewarm=1') &&
      (method === 'GET' || method === 'HEAD' || isIdempotentAiCoachPost);
    const retryDelaysMs =
      shouldRouteApiToRemoteOrigin || isIdempotentAiCoachPost
        ? [2500, 4500, 6500, 8500, 10000]
        : [2000, 3500, 5500, 7500];
    const healthUrl = shouldRouteApiToRemoteOrigin
      ? `${REMOTE_API_ORIGIN}/api/health?wake=1`
      : '/api/health?wake=1';

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
      const maxAttempts = canRetryTransient ? retryDelaysMs.length + 1 : 1;
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
          const response = await nativeFetch(targetInput, init);
          const isGatewayColdStart =
            response.status === 502 || response.status === 503 || response.status === 504;
          if (canRetryTransient && isGatewayColdStart && attempt < maxAttempts - 1) {
            markSlowNow();
            const okToContinue = await waitWithSignal(retryDelaysMs[attempt], init?.signal);
            if (!okToContinue) return response;
            await probeHealthReady(healthUrl, 4500);
            continue;
          }
          return response;
        } catch (err) {
          const isAbort = (err as any)?.name === 'AbortError' || init?.signal?.aborted;
          if (canRetryTransient && !isAbort && attempt < maxAttempts - 1) {
            markSlowNow();
            const okToContinue = await waitWithSignal(retryDelaysMs[attempt], init?.signal);
            if (!okToContinue) throw err;
            await probeHealthReady(healthUrl, 4500);
            continue;
          }
          throw err;
        }
      }
      return await nativeFetch(targetInput, init);
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
