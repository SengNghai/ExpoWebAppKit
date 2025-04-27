/*global self window clients caches Notification setBadgeCount navigator fetch event request response */

const sw = () => {
    // self.addEventListener('fetch', (event) => {
    //     event.respondWith(
    //         fetch(event.request)
    //             .then((response) => {
    //                 // Cache the response
    //                 return caches.open('my-cache')
    //                     .then((cache) => {
    //                         cache.put(event.request, response.clone());
    //                         return response;
    //                     });
    //             })
    //             .catch(() => {
    //                 // Fallback to the cache
    //                 return caches.match(event.request);
    //             })
    //     );
    // });

    // self.addEventListener('activate', (event) => {
    //     event.waitUntil(
    //         caches.keys().then((cacheNames) => {
    //             return Promise.all(
    //                 cacheNames.map((cacheName) => {
    //                     if (cacheName !== 'my-cache') {
    //                         return caches.delete(cacheName);
    //                     }
    //                 })
    //             );
    //         })
    //     );
    // });


    self.addEventListener('push', (event) => {
        const data = event.data.json();
        const title = data.title || '通知';
        const options = {
          body: data.body,
          icon: '/icon.png',
        };
      
        event.waitUntil(self.registration.showNotification(title, options));
      });

    self.addEventListener('notificationclick', function (event) {
        event.notification.close();
        const url = event.notification.data?.url || '/';
        event.waitUntil(
            clients.openWindow(url)
        );
    });

    // self.addEventListener('message', (event) => {
    //     if (event.data.type === 'SKIP_WAITING') {
    //         self.skipWaiting();
    //     }
    // });

    self.addEventListener('install', (event) => {
        console.log('Service Worker installing...');
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


}
sw();

