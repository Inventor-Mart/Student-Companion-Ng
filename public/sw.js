// Student Companion Service Worker — Web Notifications, Deep-Link Routing & OTA Cache Control
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'CLEAR_CACHES') {
    event.waitUntil(
      caches.keys().then((names) => Promise.all(names.map((n) => caches.delete(n))))
    );
  }
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
      icon: '/sc-icon.svg',
      badge: '/sc-icon.svg',
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
        icon: '/sc-icon.svg',
        badge: '/sc-icon.svg'
      })
    );
  }
});
