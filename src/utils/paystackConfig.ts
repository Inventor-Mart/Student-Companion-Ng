// Unified Live Paystack Configuration Loader with Render Cold-Start Wake-Retry
// Eliminates false "pk_live_ & sk_live_ keys not configured" errors caused by
// Render free-tier sleep, transient 502/503/504 responses, or HTML SPA fallbacks.

export type PaystackConfigStatus =
  | 'live'
  | 'server_waking'
  | 'unconfigured'
  | 'test_blocked';

export interface PaystackConfigResult {
  status: PaystackConfigStatus;
  publicKey: string;
  isLive: boolean;
  isTest: boolean;
  hasSecretKey: boolean;
  liveConfigured: boolean;
  mode: 'live' | 'test_blocked' | 'unconfigured';
  errorMessage?: string;
}

export interface FetchPaystackConfigOptions {
  forceRefresh?: boolean;
  onStatus?: (message: string) => void;
  signal?: AbortSignal;
  /** Optional custom fetch implementation (used in automated unit tests). */
  fetchImpl?: typeof fetch;
  /** Optional custom retry delays in ms (defaults to Render cold-start friendly backoff). */
  retryDelaysMs?: number[];
  /** Optional custom endpoints override for testing. */
  endpoints?: string[];
  /** Optional health wake URL override for testing. */
  healthUrl?: string;
}

const DEFAULT_RETRY_DELAYS_MS = [1800, 3200, 4800];
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes in-memory session cache for verified live config

let cachedLiveResult: { result: PaystackConfigResult; fetchedAt: number } | null = null;
let inFlightPromise: Promise<PaystackConfigResult> | null = null;

export function clearPaystackConfigCache(): void {
  cachedLiveResult = null;
}

function getDefaultEndpoints(): { endpoints: string[]; healthUrl: string } {
  if (typeof window === 'undefined') {
    return {
      endpoints: ['/api/paystack/config'],
      healthUrl: '/api/health?wake=1'
    };
  }

  const meta = (window as any).__SC_RUNTIME_META__ as
    | { apiOrigin?: string; isNetlifyHosted?: boolean; shouldRouteApiToRemoteOrigin?: boolean }
    | undefined;

  const isNetlify = Boolean(
    meta?.isNetlifyHosted || window.location.hostname.toLowerCase().endsWith('.netlify.app')
  );
  const remoteOrigin = (meta?.apiOrigin || '').replace(/\/+$/, '');

  // On Netlify, primary goes through our Render origin (via patched fetch) AND falls back
  // to same-origin Netlify /api/* edge proxy if cross-origin is ever blocked or transient.
  if (isNetlify && remoteOrigin) {
    return {
      endpoints: [`${remoteOrigin}/api/paystack/config`, '/api/paystack/config'],
      healthUrl: `${remoteOrigin}/api/health?wake=1`
    };
  }

  return {
    endpoints: ['/api/paystack/config'],
    healthUrl: '/api/health?wake=1'
  };
}

function sleepWithSignal(ms: number, signal?: AbortSignal): Promise<boolean> {
  if (signal?.aborted) return Promise.resolve(false);
  return new Promise((resolve) => {
    let done = false;
    const onAbort = () => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
      resolve(false);
    };
    const timer = setTimeout(() => {
      if (done) return;
      done = true;
      signal?.removeEventListener('abort', onAbort);
      resolve(true);
    }, ms);
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

async function tryReadJsonConfig(
  url: string,
  fetchFn: typeof fetch,
  signal?: AbortSignal
): Promise<
  | { kind: 'parsed'; result: PaystackConfigResult }
  | { kind: 'transient'; reason: string }
> {
  const ctrl = !signal && typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutId = ctrl ? setTimeout(() => ctrl.abort(), 12000) : null;
  const activeSignal = signal || ctrl?.signal;

  try {
    const res = await fetchFn(url, {
      method: 'GET',
      cache: 'no-store',
      headers: { Accept: 'application/json' },
      ...(activeSignal ? { signal: activeSignal } : {})
    });

    if (res.status === 502 || res.status === 503 || res.status === 504 || res.status === 429) {
      return { kind: 'transient', reason: `HTTP ${res.status}` };
    }

    const contentType = (res.headers.get('content-type') || '').toLowerCase();
    if (!contentType.includes('application/json')) {
      return { kind: 'transient', reason: `Non-JSON response (${contentType || 'unknown'})` };
    }

    let data: any;
    try {
      data = await res.json();
    } catch {
      return { kind: 'transient', reason: 'Malformed JSON body' };
    }

    if (!res.ok || !data || typeof data !== 'object') {
      return { kind: 'transient', reason: `HTTP ${res.status}` };
    }

    const publicKey = typeof data.publicKey === 'string' ? data.publicKey.trim() : '';
    const isLive = Boolean(data.isLive) && publicKey.startsWith('pk_live_');
    const isTest = Boolean(data.isTest) || publicKey.startsWith('pk_test_');
    const hasSecretKey = Boolean(data.hasSecretKey);
    const liveConfigured = Boolean(data.liveConfigured && isLive && hasSecretKey);

    if (liveConfigured) {
      return {
        kind: 'parsed',
        result: {
          status: 'live',
          publicKey,
          isLive: true,
          isTest: false,
          hasSecretKey: true,
          liveConfigured: true,
          mode: 'live'
        }
      };
    }

    if (isTest || data.mode === 'test_blocked') {
      return {
        kind: 'parsed',
        result: {
          status: 'test_blocked',
          publicKey: '',
          isLive: false,
          isTest: true,
          hasSecretKey,
          liveConfigured: false,
          mode: 'test_blocked',
          errorMessage:
            'Test Paystack keys are blocked. Admin must switch the server to Live Paystack keys (pk_live_ & sk_live_).'
        }
      };
    }

    return {
      kind: 'parsed',
      result: {
        status: 'unconfigured',
        publicKey,
        isLive,
        isTest: false,
        hasSecretKey,
        liveConfigured: false,
        mode: 'unconfigured',
        errorMessage:
          'Live Paystack checkout keys (pk_live_ & sk_live_) are not configured on the server yet.'
      }
    };
  } catch (err: any) {
    if (signal?.aborted) {
      return { kind: 'transient', reason: 'Aborted' };
    }
    return { kind: 'transient', reason: err?.message || 'Network failure' };
  } finally {
    if (timeoutId !== null) clearTimeout(timeoutId);
  }
}

async function pingWakeHealth(
  healthUrl: string,
  fetchFn: typeof fetch,
  signal?: AbortSignal
): Promise<void> {
  const ctrl = !signal && typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutId = ctrl ? setTimeout(() => ctrl.abort(), 6000) : null;
  try {
    await fetchFn(healthUrl, {
      method: 'GET',
      cache: 'no-store',
      ...(signal || ctrl?.signal ? { signal: signal || ctrl?.signal } : {})
    });
  } catch {
    // Best-effort cold-start wake ping
  } finally {
    if (timeoutId !== null) clearTimeout(timeoutId);
  }
}

/**
 * Fetches live Paystack configuration from the backend with Render cold-start wake-retry,
 * strict JSON verification, and same-origin Netlify proxy fallback.
 */
export async function fetchLivePaystackConfig(
  options: FetchPaystackConfigOptions = {}
): Promise<PaystackConfigResult> {
  const { forceRefresh = false, onStatus, signal } = options;

  if (
    !forceRefresh &&
    !options.fetchImpl &&
    cachedLiveResult &&
    Date.now() - cachedLiveResult.fetchedAt < CACHE_TTL_MS
  ) {
    return cachedLiveResult.result;
  }

  // Deduplicate concurrent cold-start requests unless caller passed custom test fetchImpl
  if (!forceRefresh && !options.fetchImpl && !onStatus && inFlightPromise) {
    return inFlightPromise;
  }

  const run = async (): Promise<PaystackConfigResult> => {
    const defaults = getDefaultEndpoints();
    const endpoints = options.endpoints && options.endpoints.length > 0 ? options.endpoints : defaults.endpoints;
    const healthUrl = options.healthUrl || defaults.healthUrl;
    const retryDelaysMs = options.retryDelaysMs || DEFAULT_RETRY_DELAYS_MS;

    // For Netlify fallback same-origin '/api/paystack/config', prefer unpatched native fetch if available
    // so the Netlify edge reverse proxy is genuinely tested as an independent path.
    const nativeFetch =
      typeof window !== 'undefined' && typeof (window as any).__SC_NATIVE_FETCH__ === 'function'
        ? ((window as any).__SC_NATIVE_FETCH__ as typeof fetch)
        : undefined;
    const primaryFetch = options.fetchImpl || (typeof fetch === 'function' ? fetch.bind(globalThis) : undefined);

    if (!primaryFetch) {
      return {
        status: 'server_waking',
        publicKey: '',
        isLive: false,
        isTest: false,
        hasSecretKey: false,
        liveConfigured: false,
        mode: 'unconfigured',
        errorMessage:
          'Payment service is temporarily unreachable in this browser environment. Please retry.'
      };
    }

    const totalAttempts = retryDelaysMs.length + 1;
    let lastTransientReason = '';

    for (let attempt = 0; attempt < totalAttempts; attempt++) {
      if (attempt > 0) {
        onStatus?.(`Waking live payment server... retrying (${attempt + 1}/${totalAttempts})`);
      }

      for (let epIdx = 0; epIdx < endpoints.length; epIdx++) {
        const endpoint = endpoints[epIdx];
        const useNativeForSameOriginProxy =
          !options.fetchImpl && epIdx > 0 && endpoint.startsWith('/api/') && Boolean(nativeFetch);
        const fetchForEndpoint = useNativeForSameOriginProxy ? nativeFetch! : primaryFetch;

        const outcome = await tryReadJsonConfig(endpoint, fetchForEndpoint, signal);
        if (outcome.kind === 'parsed') {
          if (outcome.result.status === 'live' && !options.fetchImpl) {
            cachedLiveResult = { result: outcome.result, fetchedAt: Date.now() };
          }
          return outcome.result;
        }
        lastTransientReason = outcome.reason;
      }

      if (attempt < totalAttempts - 1) {
        onStatus?.('Connecting to live payment server on Render...');
        await pingWakeHealth(healthUrl, primaryFetch, signal);
        const okToContinue = await sleepWithSignal(retryDelaysMs[attempt], signal);
        if (!okToContinue) break;
      }
    }

    const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
    return {
      status: 'server_waking',
      publicKey: '',
      isLive: false,
      isTest: false,
      hasSecretKey: false,
      liveConfigured: false,
      mode: 'unconfigured',
      errorMessage: offline
        ? 'You appear to be offline. Reconnect to the internet and tap Pay again.'
        : `Payment server is waking up or temporarily unreachable${
            lastTransientReason ? ` (${lastTransientReason})` : ''
          }. Please wait a few seconds and tap Retry.`
    };
  };

  const promise = run();
  if (!options.fetchImpl) {
    inFlightPromise = promise.finally(() => {
      if (inFlightPromise === promise) {
        inFlightPromise = null;
      }
    });
  }
  return promise;
}

/**
 * Silently pre-warms the live Paystack config when a checkout modal opens so tapping Pay is instant.
 */
export function prewarmLivePaystackConfig(): void {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return;
  void fetchLivePaystackConfig().catch(() => {});
}
