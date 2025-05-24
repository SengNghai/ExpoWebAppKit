import { Href, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/** 判断是否在 Web 端运行 */
const isWeb = typeof window !== "undefined";

export function useNavigationHistory() {
  const router = useRouter();
  const [history, setHistory] = useState<string[]>([]);

  /** 获取存储方法：Web 用 localStorage，Native 用 AsyncStorage */
  const getStorage = async (key: string) => {
    if (isWeb) {
      return localStorage.getItem(key);
    } else {
      return await AsyncStorage.getItem(key);
    }
  };

  const setStorage = async (key: string, value: string) => {
    if (isWeb) {
      localStorage.setItem(key, value);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  };

  /** 加载历史记录 */
  useEffect(() => {
    getStorage("navigationHistory").then((data) => {
      if (data) setHistory(JSON.parse(data));
    });
  }, []);

  /** 记录访问路径并存储 */
  const navigate = async (path: string) => {
    const updatedHistory = [...history, path];
    setHistory(updatedHistory);
    await setStorage("navigationHistory", JSON.stringify(updatedHistory));
    router.push(path as Href);
  };

  /** 返回上一个访问的页面 */
  const goBack = async () => {
    if (history.length > 1) {
      const updatedHistory = history.slice(0, -1);
      setHistory(updatedHistory);
      await setStorage("navigationHistory", JSON.stringify(updatedHistory));
      router.replace(updatedHistory[updatedHistory.length - 1] as Href);
    } else {
      router.back();
    }
  };

  return { navigate, goBack };
}

/*
// 使用示例
import { useNavigationHistory } from "@/libs/hooks/useNavigationHistory";

const MyPage = () => {
  const { navigate, goBack } = useNavigationHistory();

  return (
    <View>
      <TouchableOpacity onPress={() => navigate("/c")}>
        <Text>跳转到 C</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goBack}>
        <Text>返回上一个访问的页面</Text>
      </TouchableOpacity>
    </View>
  );
};
*/