import { globalSubscribeMethod, globalUnsubscribeMethod, publicSendNotification } from "@/libs/uitls/serviceWorkerManager.ts";
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
    globalUnsubscribeMethod('http://localhost:3000/api/unsubscribe');
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