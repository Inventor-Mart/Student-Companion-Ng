// Student Companion Service Worker — Full Offline App Shell, Asset Runtime Caching, Sync & OTA Control
const APP_SHELL_CACHE = 'sc-shell-v2';
const RUNTIME_CACHE = 'sc-runtime-v2';
const API_CACHE = 'sc-api-v2';

const CORE_PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png',
  '/apple-touch-icon.png',
  '/icon.svg',
  '/sc-icon.svg'
];

const CACHEABLE_READ_API_PREFIXES = [
  '/api/ota/state',
  '/api/curriculum/',
  '/api/lesson-notes',
  '/api/android/apk-status'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(APP_SHELL_CACHE)
      .then((cache) =>
        Promise.allSettled(
          CORE_PRECACHE_URLS.map((url) =>
            cache.add(new Request(url, { cache: 'reload' })).catch(() => null)
          )
        )
      )
      .finally(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  const validCaches = new Set([APP_SHELL_CACHE, RUNTIME_CACHE, API_CACHE]);
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter((name) => name.startsWith('sc-') && !validCaches.has(name))
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

async function warmOfflineAssets(extraUrls = []) {
  const shellCache = await caches.open(APP_SHELL_CACHE);
  const runtimeCache = await caches.open(RUNTIME_CACHE);
  const allUrls = Array.from(new Set([...CORE_PRECACHE_URLS, ...extraUrls].filter(Boolean)));
  let cachedCount = 0;

  await Promise.allSettled(
    allUrls.map(async (url) => {
      try {
        const res = await fetch(url, { credentials: 'same-origin' });
        if (res && res.ok) {
          const targetCache = CORE_PRECACHE_URLS.includes(url) ? shellCache : runtimeCache;
          await targetCache.put(url, res.clone());
          cachedCount += 1;
        }
      } catch {
        // Ignore single unreachable asset while offline
      }
    })
  );

  return cachedCount;
}

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHES') {
    event.waitUntil(
      caches
        .keys()
        .then((names) => Promise.all(names.map((n) => caches.delete(n))))
        .finally(() => {
          if (event.ports && event.ports[0]) {
            event.ports[0].postMessage({ cleared: true });
          }
        })
    );
  }

  if (event.data && event.data.type === 'WARM_OFFLINE_CACHE') {
    const urls = Array.isArray(event.data.urls) ? event.data.urls : [];
    event.waitUntil(
      warmOfflineAssets(urls)
        .then((cachedCount) => {
          if (event.ports && event.ports[0]) {
            event.ports[0].postMessage({ warmed: true, cachedCount });
          }
        })
        .catch(() => {
          if (event.ports && event.ports[0]) {
            event.ports[0].postMessage({ warmed: false, cachedCount: 0 });
          }
        })
    );
  }

  if (event.data && event.data.type === 'GET_CACHE_STATUS') {
    event.waitUntil(
      (async () => {
        try {
          const names = await caches.keys();
          let totalEntries = 0;
          for (const name of names) {
            const c = await caches.open(name);
            const keys = await c.keys();
            totalEntries += keys.length;
          }
          if (event.ports && event.ports[0]) {
            event.ports[0].postMessage({ active: true, totalEntries, cacheNames: names });
          }
        } catch {
          if (event.ports && event.ports[0]) {
            event.ports[0].postMessage({ active: true, totalEntries: 0, cacheNames: [] });
          }
        }
      })()
    );
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isGoogleFonts =
    url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';

  if (!isSameOrigin && !isGoogleFonts) {
    return;
  }

  // Never intercept Firebase auth or sensitive payment/auth callbacks
  if (
    isSameOrigin &&
    (url.pathname.startsWith('/__/') ||
      url.pathname.startsWith('/api/auth/') ||
      url.pathname.startsWith('/api/paystack/'))
  ) {
    return;
  }

  // 1. Document navigation requests -> NetworkFirst with guaranteed offline shell fallback
  if (isSameOrigin && request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkRes) => {
          if (networkRes && networkRes.ok) {
            const copy = networkRes.clone();
            caches.open(APP_SHELL_CACHE).then((cache) => {
              cache.put('/index.html', copy).catch(() => {});
            });
          }
          return networkRes;
        })
        .catch(async () => {
          const shellCache = await caches.open(APP_SHELL_CACHE);
          const cachedIndex =
            (await shellCache.match(request)) ||
            (await shellCache.match('/')) ||
            (await shellCache.match('/index.html'));
          if (cachedIndex) return cachedIndex;
          return new Response(
            '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Student Companion Offline</title></head><body style="background:#0B1526;color:#f8fafc;font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px;text-align:center;"><div><h1 style="color:#84E000;margin-bottom:8px;">Student Companion</h1><p>You are offline. Reconnect once to load this page into your offline cache.</p></div></body></html>',
            { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          );
        })
    );
    return;
  }

  // 2. Cacheable read-only API requests -> NetworkFirst with cached JSON fallback offline
  if (isSameOrigin && url.pathname.startsWith('/api/')) {
    const isCacheableApi = CACHEABLE_READ_API_PREFIXES.some((prefix) =>
      url.pathname.startsWith(prefix)
    );
    if (!isCacheableApi) return;

    event.respondWith(
      fetch(request)
        .then((networkRes) => {
          if (networkRes && networkRes.ok) {
            const copy = networkRes.clone();
            caches.open(API_CACHE).then((cache) => cache.put(request, copy).catch(() => {}));
          }
          return networkRes;
        })
        .catch(async () => {
          const apiCache = await caches.open(API_CACHE);
          const cached = await apiCache.match(request);
          if (cached) return cached;
          return new Response(JSON.stringify({ success: false, offline: true }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
          });
        })
    );
    return;
  }

  // 3. Google Fonts -> CacheFirst
  if (isGoogleFonts) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const networkRes = await fetch(request);
          if (networkRes && (networkRes.ok || networkRes.type === 'opaque')) {
            cache.put(request, networkRes.clone()).catch(() => {});
          }
          return networkRes;
        } catch {
          return cached || new Response('', { status: 504 });
        }
      })
    );
    return;
  }

  // 4. Same-origin scripts, styles, icons, manifest & media -> StaleWhileRevalidate / Cache fallback
  event.respondWith(
    caches.open(RUNTIME_CACHE).then(async (cache) => {
      const shellCache = await caches.open(APP_SHELL_CACHE);
      const cached = (await cache.match(request)) || (await shellCache.match(request));
      const networkPromise = fetch(request)
        .then((networkRes) => {
          if (networkRes && networkRes.ok) {
            cache.put(request, networkRes.clone()).catch(() => {});
          }
          return networkRes;
        })
        .catch(() => null);

      if (cached) {
        event.waitUntil(networkPromise);
        return cached;
      }

      const fresh = await networkPromise;
      if (fresh) return fresh;
      return new Response('', { status: 504, statusText: 'Offline asset unavailable' });
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const data = event.notification.data || {};
  const deepLinkTab = data.deepLinkTab || 'dashboard';
  const notificationId = data.notificationId || '';
  const targetRole = data.role || '';

  const targetUrl =
    '/?notifTab=' +
    encodeURIComponent(deepLinkTab) +
    (notificationId ? '&notifId=' + encodeURIComponent(notificationId) : '') +
    (targetRole ? '&notifRole=' + encodeURIComponent(targetRole) : '');

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          client.focus();
          client.postMessage({
            type: 'SC_NOTIFICATION_CLICK',
            deepLinkTab,
            notificationId,
            role: targetRole
          });
          return;
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});

self.addEventListener('push', (event) => {
  if (!event.data) return;
  try {
    const payload = event.data.json();
    const title = payload.title || 'Student Companion';
    const options = {
      body: payload.body || 'Return to continue your daily study streak.',
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
      tag: payload.tag || 'sc-ota-push',
      data: {
        deepLinkTab: payload.deepLinkTab || 'dashboard',
        notificationId: payload.notificationId || '',
        role: payload.role || ''
      }
    };
    event.waitUntil(self.registration.showNotification(title, options));
  } catch {
    const text = event.data.text();
    event.waitUntil(
      self.registration.showNotification('Student Companion', {
        body: text,
        icon: '/pwa-192x192.png',
        badge: '/pwa-192x192.png'
      })
    );
  }
});
