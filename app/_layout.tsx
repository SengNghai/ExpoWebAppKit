// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { Platform } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';



import { globalSubscribeMethod } from '@/libs/uitls/serviceWorkerManager.ts';

import Providered from '@/components/Providered';







// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  



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
    <Providered>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </Providered>
  );
}
