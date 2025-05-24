import { Href, useRouter } from "expo-router";
import { useRef } from "react";

export function useNavigationHistory() {
  const router = useRouter();
  const historyRef = useRef<string[]>([]); // 存储访问历史

  /** 记录访问路径 */
  const navigate = (path: string) => {
    historyRef.current.push(path);
    router.push(path as Href);
  };

  /** 返回上一个访问的页面 */
  const goBack = () => {
    if (historyRef.current.length > 1) {
      historyRef.current.pop(); // 移除当前页面
      const previousPage = historyRef.current[historyRef.current.length - 1];
      router.replace(previousPage as Href);
    } else {
      router.back(); // 如果没有历史记录，则执行默认返回
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