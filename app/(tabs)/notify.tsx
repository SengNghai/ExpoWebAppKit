import InstallPrompt from "@/components/InstallPrompt";
import { globalSubscribeMethod, globalUnsubscribeMethod, publicSendNotification } from "@/libs/uitls/serviceWorkerManager.ts";
import { Button } from "@ant-design/react-native";
import { View, Text } from "react-native";
import {  
  useLocalSearchParams,
  } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native';
import { useState } from "react";
import BasicModal from "@/components/BasicModal";
import React from "react";

/*
跨平台差异
Hook	                                  适用场景	                适合的平台	              主要用途
useFocusEffect（React Navigation）	    传统 React Native 导航	   iOS、Android、Web	      监听屏幕焦点变化
useFocusEffect（Expo Router）	Next.js   形式的 Expo Web 路由	     Web 优先	                监听页面焦点变化
*/


export default function NotifyScreen() {
  const param = useLocalSearchParams();
    const [visible, setVisible] = useState(false);

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

  // 强制更新
  useFocusEffect(
    React.useCallback(() => {
      setVisible(true); // 页面每次进入时都会触发
      return () => setVisible(false); // 页面离开时可以重置
    }, [])
  );


  return (  
    <>
      <View>
        <Text>Install Prompt----{JSON.stringify(visible)}</Text>
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

      <BasicModal visible={visible} onOpen={() => setVisible(true)} onClose={() => setVisible(false)}/>
    </>
  );
}