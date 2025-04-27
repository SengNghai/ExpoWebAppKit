/*global self window clients caches Notification setBadgeCount navigator fetch event request response */
let unreadCount = 0; // 未读消息数量
const sw = () => {

    self.addEventListener('push', (event) => {
        const data = event.data.json();
        const title = data.title || '通知';
        const options = {
            body: data.body,
            icon: '/icon.png',
        };
        unreadCount += data.count || 1;
        navigator.setAppBadge?.(unreadCount).catch(console.error);

        event.waitUntil(self.registration.showNotification(title, options));
    });


    // 监听通知点击事件
    self.addEventListener("notificationclick", (event) => {
        event.notification.close(); // 关闭通知

        // 获取 URL
        const url = event.notification.data?.url || "/"; // 获取 URL

        // 更新未读消息数量
        unreadCount -= 1;
        navigator.setAppBadge?.(unreadCount).catch(console.error);

        // 打开 PWA 窗口
        event.waitUntil(
            self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
                for (const client of clients) {
                    if (client.url.includes(self.location.origin) && "focus" in client) {
                        return client.focus(); // 如果 PWA 已打开，则聚焦
                    }
                }
                return self.clients.openWindow(url); // 否则新开 PWA 内部窗口
            })
        );
    });


    // 监听安装事件
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

