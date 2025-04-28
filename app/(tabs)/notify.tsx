import InstallPrompt from "@/components/InstallPrompt";
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
    const vapidPublicKey = 'BI1DH5Pe73fMpZWhXOohot5UB85QlttiTW5CBgDflA_d3FM7iAX2LdPU7ZtaNMXIKFUuyBHkH2FEkHAuLqE4950';
    globalSubscribeMethod('http://localhost:3000/api/subscribe', vapidPublicKey);
  }
  // 取消订阅
  const handleUnsubscribe = () => {
    globalUnsubscribeMethod('http://localhost:3000/api/unsubscribe');
  }

  return (
    <>
      <View>
        <Text>Install Prompt</Text>
        <InstallPrompt />
      </View>
      <View>
        <Text>Subscribe</Text>
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