// Student Companion PWA Auto-Update & One-Tap Cache Recovery Utility
// Preserves user authentication and offline study data in localStorage/IndexedDB
// while strictly purging stale Browser Cache Storage & outdated Service Workers.

const AUTO_RELOAD_GUARD_KEY = 'sc_pwa_auto_reloaded_ts';
const AUTO_RELOAD_COOLDOWN_MS = 45_000;
const LEGACY_CACHE_PREFIXES = ['sc-shell-v1', 'sc-shell-v2', 'sc-shell-v3', 'sc-runtime-v1', 'sc-runtime-v2', 'sc-runtime-v3', 'sc-api-v1', 'sc-api-v2', 'sc-api-v3'];

function canTriggerGuardedReload(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const lastTs = Number(window.sessionStorage.getItem(AUTO_RELOAD_GUARD_KEY) || '0');
    if (Number.isFinite(lastTs) && Date.now() - lastTs < AUTO_RELOAD_COOLDOWN_MS) {
      return false;
    }
    window.sessionStorage.setItem(AUTO_RELOAD_GUARD_KEY, String(Date.now()));
    return true;
  } catch {
    return true;
  }
}

function getCurrentDocumentEntryScript(): string | null {
  if (typeof document === 'undefined') return null;
  const scripts = Array.from(document.querySelectorAll('script[type="module"][src]'));
  for (const el of scripts) {
    const src = el.getAttribute('src') || '';
    if (src.includes('/assets/index-') && src.endsWith('.js')) {
      return src;
    }
  }
  return null;
}

function extractEntryScriptFromHtml(html: string): string | null {
  const match = html.match(/<script[^>]+type=["']module["'][^>]+src=["']([^"']*\/assets\/index-[^"']+\.js)["']/i)
    || html.match(/src=["']([^"']*\/assets\/index-[^"']+\.js)["']/i);
  return match?.[1] || null;
}

export async function purgeLegacyCachesOnly(): Promise<number> {
  if (typeof window === 'undefined' || !('caches' in window)) return 0;
  try {
    const names = await caches.keys();
    const toDelete = names.filter((name) => LEGACY_CACHE_PREFIXES.includes(name));
    await Promise.all(toDelete.map((name) => caches.delete(name)));
    return toDelete.length;
  } catch {
    return 0;
  }
}

export async function purgeAllAppCaches(): Promise<number> {
  if (typeof window === 'undefined' || !('caches' in window)) return 0;
  try {
    const names = await caches.keys();
    await Promise.all(names.map((name) => caches.delete(name)));
    return names.length;
  } catch {
    return 0;
  }
}

function postMessageToSwWithTimeout(
  worker: ServiceWorker,
  message: Record<string, unknown>,
  timeoutMs = 1500
): Promise<void> {
  return new Promise((resolve) => {
    try {
      const channel = new MessageChannel();
      const timer = window.setTimeout(() => resolve(), timeoutMs);
      channel.port1.onmessage = () => {
        window.clearTimeout(timer);
        resolve();
      };
      worker.postMessage(message, [channel.port2]);
    } catch {
      resolve();
    }
  });
}

function performCacheBustedReload(): void {
  if (typeof window === 'undefined') return;
  try {
    const url = new URL(window.location.href);
    url.searchParams.set('_refresh', String(Date.now()));
    window.location.replace(url.toString());
  } catch {
    window.location.reload();
  }
}

/**
 * One-tap manual recovery control used in Super Admin Console and Account Menu.
 * Purges all Service Worker & Browser Cache Storage entries and unregisters stale SWs,
 * WITHOUT deleting user authentication tokens or study progress in localStorage/IndexedDB.
 */
export async function forceClearAppCacheAndReload(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    if ('serviceWorker' in navigator) {
      const controller = navigator.serviceWorker.controller;
      if (controller) {
        await postMessageToSwWithTimeout(controller, { type: 'CLEAR_CACHES' }, 1200);
      }
      const regs = await navigator.serviceWorker.getRegistrations().catch(() => []);
      await Promise.all(regs.map((reg) => reg.unregister().catch(() => false)));
    }
  } catch {
    // Continue to cache purge even if SW API is restricted
  }

  await purgeAllAppCaches();

  // Reset cooldown guard so user-initiated reload always executes cleanly
  try {
    window.sessionStorage.setItem(AUTO_RELOAD_GUARD_KEY, String(Date.now()));
  } catch {
    // Ignore storage errors
  }

  performCacheBustedReload();
}

/**
 * Clean up `_refresh` query parameter after a cache-busted reload so the address bar stays tidy.
 */
function cleanRefreshQueryParam(): void {
  if (typeof window === 'undefined') return;
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.has('_refresh')) {
      url.searchParams.delete('_refresh');
      window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
    }
  } catch {
    // Ignore restricted history frames
  }
}

/**
 * Checks if Netlify/production has published a newer index.html entry bundle hash.
 * If a mismatch is detected while online, clears stale caches and performs a single guarded reload.
 */
async function checkDeployedBundleMismatch(): Promise<void> {
  if (typeof window === 'undefined') return;
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return;

  const currentScript = getCurrentDocumentEntryScript();
  // Only run on production built bundles (Vite dev uses /src/main.tsx)
  if (!currentScript) return;

  try {
    const fetchFn = (window as any).__SC_NATIVE_FETCH__ || window.fetch.bind(window);
    const res = await fetchFn(`/?_vcheck=${Date.now()}`, {
      method: 'GET',
      cache: 'no-store',
      credentials: 'same-origin',
      headers: { Accept: 'text/html' }
    });
    if (!res.ok) return;
    const ct = (res.headers.get('content-type') || '').toLowerCase();
    if (!ct.includes('text/html')) return;
    const html = await res.text();
    const remoteScript = extractEntryScriptFromHtml(html);

    if (remoteScript && remoteScript !== currentScript) {
      await purgeAllAppCaches();
      if (canTriggerGuardedReload()) {
        performCacheBustedReload();
      }
    }
  } catch {
    // Offline or transient network blip — ignore quietly
  }
}

/**
 * Initializes automatic zero-stale PWA update lifecycle:
 * 1. Evicts legacy v1/v2/v3 caches on startup.
 * 2. Registers /sw.js with updateViaCache: 'none' and triggers update checks on load/focus/online.
 * 3. Auto-clears stale caches and performs a single guarded reload when a new SW activates or a newer Netlify bundle hash is published.
 */
export function initPwaAutoUpdateLifecycle(isBundledAndroidApk: boolean): void {
  if (typeof window === 'undefined' || isBundledAndroidApk) return;

  cleanRefreshQueryParam();
  void purgeLegacyCachesOnly();

  let reloadingForUpdate = false;
  const triggerGuardedAutoReload = async () => {
    if (reloadingForUpdate) return;
    if (!canTriggerGuardedReload()) return;
    reloadingForUpdate = true;
    await purgeLegacyCachesOnly();
    performCacheBustedReload();
  };

  if ('serviceWorker' in navigator) {
    const hadControllerAtBoot = Boolean(navigator.serviceWorker.controller);

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!hadControllerAtBoot) return;
      void triggerGuardedAutoReload();
    });

    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'SC_SW_UPDATED' && hadControllerAtBoot) {
        void triggerGuardedAutoReload();
      }
    });

    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/', updateViaCache: 'none' })
        .then((reg) => {
          reg.update().catch(() => {});

          if (reg.waiting && navigator.serviceWorker.controller) {
            reg.waiting.postMessage({ type: 'SKIP_WAITING' });
          }

          reg.addEventListener('updatefound', () => {
            const installing = reg.installing;
            if (!installing) return;
            installing.addEventListener('statechange', () => {
              if (installing.state === 'installed' && navigator.serviceWorker.controller) {
                installing.postMessage({ type: 'SKIP_WAITING' });
              }
            });
          });
        })
        .catch(() => {
          // Ignore transient SW registration failures inside restricted frames
        });

      // Check once shortly after initial boot in case an older SW served cached HTML before updating
      window.setTimeout(() => {
        void checkDeployedBundleMismatch();
      }, 2500);
    });
  } else {
    window.addEventListener('load', () => {
      window.setTimeout(() => {
        void checkDeployedBundleMismatch();
      }, 2500);
    });
  }

  // Re-check for newly deployed Netlify builds whenever user resumes tab or reconnects online
  let lastVisibilityCheck = Date.now();
  const handleResumeCheck = () => {
    if (document.visibilityState === 'hidden') return;
    const now = Date.now();
    if (now - lastVisibilityCheck < 60_000) return;
    lastVisibilityCheck = now;

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .getRegistration('/')
        .then((reg) => reg?.update().catch(() => {}))
        .catch(() => {});
    }
    void checkDeployedBundleMismatch();
  };

  document.addEventListener('visibilitychange', handleResumeCheck);
  window.addEventListener('online', () => {
    lastVisibilityCheck = 0;
    handleResumeCheck();
  });
}
