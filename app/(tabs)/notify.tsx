import { publicSendNotification } from "@/libs/uitls/serviceWorkerManager.ts";
import { Button } from "@ant-design/react-native";
import { View, Text } from "react-native";


export default function NotifyScreen() {
  // 点击发送通方法
  const handleSendNotification = () => {
    // 发送通知
    publicSendNotification('http://localhost:3000/api/notify');
  }
  return (
    <>
      <View>
        <Text>SendNotification</Text>
        <Button type="warning" onPress={handleSendNotification}>SendNotification</Button>
      </View>
    </>
  );
}