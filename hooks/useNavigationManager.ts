import { Href, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/** 判断是否在 Web 端运行 */
const isWeb = typeof window !== "undefined";

/** 存储导航历史的方法：Web 用 localStorage，Native 用 AsyncStorage */
const getStorage = async (key: string) => {
  return isWeb ? localStorage.getItem(key) : await AsyncStorage.getItem(key);
};

const setStorage = async (key: string, value: string) => {
  return isWeb ? localStorage.setItem(key, value) : await AsyncStorage.setItem(key, value);
};

export function useNavigationManager() {
  const router = useRouter();
  const [history, setHistory] = useState<string[]>([]);

  /** 组件加载时恢复导航历史 */
  useEffect(() => {
    getStorage("navigationHistory").then((data) => {
      if (data) setHistory(JSON.parse(data));
    });
  }, []);

  /** 记录访问路径并存储 */
  const navigateTo = async (path: string) => {
    const updatedHistory = [...history, path];
    setHistory(updatedHistory);
    await setStorage("navigationHistory", JSON.stringify(updatedHistory));
    router.push(path as Href);
  };

  /** 可靠返回逻辑，确保即使刷新页面也能正确返回 */
  const goBack = async () => {
    if (history.length > 1) {
      const updatedHistory = history.slice(0, -1);
      setHistory(updatedHistory);
      await setStorage("navigationHistory", JSON.stringify(updatedHistory));
      router.replace(updatedHistory[updatedHistory.length - 1] as Href);
    } else {
      router.replace("/"); // 确保无历史记录时正确跳转
    }
  };

  return { navigateTo, goBack };
}
