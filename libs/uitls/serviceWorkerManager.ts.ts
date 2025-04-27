import { base64ToUint8Array } from "./common";


/**
 * 订阅推送
 * @param API 服务端订阅接口地址
 */
export const globalSubscribeMethod = (API='http://localhost:3000/api/subscribe') => {
    if (('serviceWorker' in navigator)) {
          navigator.serviceWorker.ready.then(async (registration) => {
            // 将 VAPID 公钥转换为 base64url
            const vapidPublicKey = 'BI1DH5Pe73fMpZWhXOohot5UB85QlttiTW5CBgDflA_d3FM7iAX2LdPU7ZtaNMXIKFUuyBHkH2FEkHAuLqE4950'; // 用生成的 VAPID 公钥替换
            const applicationServerKey = base64ToUint8Array(vapidPublicKey);
          
            const subscription = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey,
            });
          
            console.log('Push Subscription:', JSON.stringify(subscription, null, 2));
            localStorage.setItem('subscription', JSON.stringify(subscription, null, 2));
            
          
            // 将订阅信息发送到服务端保存
            fetch(API, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                subscription,
                title: '测试通知',
                message: '测试订阅通知的内容',
                url: 'https://example.com',
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log('订阅成功:', data);
              })
              .catch((error) => console.error('订阅失败:', error));
          });
        };
}

/**
 * 手动推送消息
 * @param API 服务端推送接口地址
 * @returns 
 */
export const publicSendNotification = (API='http://localhost:3000/api/notify') => {
    const subscription = localStorage.getItem('subscription');
        console.log('subscription', subscription);
        if (!subscription) {
            console.error('未找到订阅信息');
            alert('未找到订阅信息,请先订阅或刷新页面');
            return;
        }

        const bodyData = {
            subscription: JSON.parse(subscription),
            title: '手动推送通知',
            message: '这是一条测试推送通知消息！',
            url: 'https://yourwebsite.com',
        };
        console.log('bodyData', JSON.stringify(bodyData, null, 2));  
       console.log('hello');
       fetch(API, {   
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
          })
        .then((response) => response.json())
        .then((data) => console.log('hello:', data))
        .catch((error) => console.error('hello error:', error.message));
}

/**
 * 取消订阅
 * @param API 服务端取消订阅接口地址
 * @returns 
 */
export const globalUnsubscribeMethod = (API='http://localhost:3000/api/unsubscribe') => {
    navigator.serviceWorker.ready.then(async (registration) => {
        await registration.pushManager.getSubscription().then((subscription) => {
          if (subscription) {
            console.log('取消订阅:', subscription);
            subscription.unsubscribe();

            // 将取消订阅信息发送到服务端
            fetch(API, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                subscription,
              }),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP 错误！状态码: ${response.status}`);
                }
                return response.json();
              })
              .then((data) => console.log('取消订阅成功:', data))
              .catch((error) => console.error('取消订阅失败:', error.message));
            
            console.log('取消订阅成功');
            localStorage.removeItem('subscription');

          }
        });
      });
}



