// Student Companion Service Worker Extension — Notification Clicks & Cache Clearing

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
      caches
        .open('sc-runtime-warm-v1')
        .then(async (cache) => {
          let cachedCount = 0;
          await Promise.allSettled(
            urls.map(async (url) => {
              if (!url) return;
              try {
                const res = await fetch(url, { credentials: 'same-origin' });
                if (res && res.ok) {
                  await cache.put(url, res.clone());
                  cachedCount += 1;
                }
              } catch {
                // Ignore unreachable URL while offline
              }
            })
          );
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

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          client.focus();
          client.postMessage({
            type: 'SC_NOTIFICATION_CLICKED',
            actionTarget: event.notification.data?.actionTarget || null
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
