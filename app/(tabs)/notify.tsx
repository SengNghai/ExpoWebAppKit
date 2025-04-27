import { globalSubscribeMethod, publicSendNotification } from "@/libs/uitls/serviceWorkerManager.ts";
import { Button } from "@ant-design/react-native";
import { View, Text } from "react-native";


export default function NotifyScreen() {
  // 点击发送通方法
  const handleSendNotification = () => {
    // 发送通知
    publicSendNotification('http://localhost:3000/api/notify');
  }

  // 订阅
  const handleSubscribe = () => {
    // 订阅
    globalSubscribeMethod('http://localhost:3000/api/subscribe');
  }
  // 取消订阅
  const handleUnsubscribe = () => {
    // 取消订阅
    navigator.serviceWorker.ready.then(async (registration) => {
      await registration.pushManager.getSubscription().then((subscription) => {
        if (subscription) {
          console.log('取消订阅:', subscription);
          subscription.unsubscribe();
          console.log('取消订阅成功');
          localStorage.removeItem('subscription');

          // fetch('http://localhost:3000/api/unsubscribe', {
          //   method: 'DELETE',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify({
          //     subscription
          //   }),
          // })
          //   .then((response) => {
          //     if (!response.ok) {
          //       throw new Error(`HTTP 错误！状态码: ${response.status}`);
          //     }
          //     return response.json();
          //   })
          //   .then((data) => console.log('取消订阅成功:', data))
          //   .catch((error) => console.error('取消订阅失败:', error.message));
          
        }
      });
    });


  
    
  }
  return (
    <>
    <View>
        <Text>subscribe</Text>
        <Button type="warning" onPress={handleSubscribe}>Subscribe</Button>
      </View>
      <View>
        <Text>SendNotification</Text>
        <Button type="warning" onPress={handleSendNotification}>SendNotification</Button>
      </View>
      <View>
        <Text>unsubscribe</Text>
        <Button type="warning" onPress={handleUnsubscribe}>Unsubscribe</Button>
      </View>
    </>
  );
}