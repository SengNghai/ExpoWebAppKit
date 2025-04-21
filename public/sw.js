self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Cache the response
                return caches.open('my-cache')
                    .then((cache) => {
                        cache.put(event.request, response.clone());
                        return response;
                    });
            })
            .catch(() => {
                // Fallback to the cache
                return caches.match(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== 'my-cache') {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', (event) => {
    const { title, body } = event.data;
    event.waitUntil(
        self.registration.showNotification(title, {
            body,
            icon: '/logo192.png',
        })
    );

    event.waitUntil(self.setBadgeCount(1));
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://example.com')
    );
});


self.addEventListener('message', (event) => {
    if (event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache')
            .then((cache) => {
                return cache.addAll([
                    '/',
                    '/manifest.json',
                    '/logo192.png',
                    '/logo512.png',
                ]);
            })
    );
});
