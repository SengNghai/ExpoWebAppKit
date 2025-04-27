import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Platform } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useLayoutEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider } from '@ant-design/react-native';
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/libs/features/store";

import enUS from '@ant-design/react-native/lib/locale-provider/en_US'
import esES from '@ant-design/react-native/lib/locale-provider/es_ES'
import faIR from '@ant-design/react-native/lib/locale-provider/fa_IR'
import koKR from '@ant-design/react-native/lib/locale-provider/ko_KR'
import ptBR from '@ant-design/react-native/lib/locale-provider/pt_BR'
import ruRU from '@ant-design/react-native/lib/locale-provider/ru_RU'
import svSE from '@ant-design/react-native/lib/locale-provider/sv_SE'
import zhCN from '@ant-design/react-native/lib/locale-provider/zh_CN'
import { base64ToUint8Array } from '@/libs/uitls/common';
import { globalSubscribeMethod } from '@/libs/uitls/serviceWorkerManager.ts';

  
 
  

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [locale, setLocale] = useState('中国');


  const languages: Array<any> = [
    {
      value: '中国',
      label: '中国',
      language: zhCN,
    },
    {
      value: 'English',
      label: 'English',
      language: enUS,
    },
    {
      value: 'Русский',
      label: 'Русский',
      language: ruRU,
    },
    {
      value: 'Español',
      label: 'Español',
      language: esES,
    },
    {
      value: 'Português - BR',
      label: 'Português - BR',
      language: ptBR,
    },
    {
      value: 'Sverige',
      label: 'Sverige',
      language: svSE,
    },
    {
      value: 'Persian',
      label: 'Persian',
      language: faIR,
    },
    {
      value: '한국',
      label: '한국',
      language: koKR,
    },
  ]
  const currentLocale = languages.find(
    (item) => item.value === locale,
  ).language



  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      // ✅ 仅在客户端动态加载 `eruda`
      // @ts-ignore
      import("eruda").then((eruda) => eruda.default.init());
    }
  }, [loaded]);


  useEffect(() => {
    // 订阅推送
    globalSubscribeMethod('http://localhost:3000/api/subscribe');
  }, []);

  if (!loaded) {
    return null;
  }

  /*
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
  */
  return (
    <Provider locale={currentLocale}>
      <ReduxProvider store={store}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ReduxProvider>
    </Provider>
  );
}
