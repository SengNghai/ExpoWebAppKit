import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  LayoutAnimation,
  UIManager
} from "react-native";

import { useDisableScroll } from "@/hooks/useDisableScroll";
import { useNavigationManager } from "@/hooks/useNavigationManager";


const AnimatedMessage = ({ text }: { text: string }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current; // 从底部 30px 位置开始

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.messageContainer, { opacity: fadeAnim, transform: [{ translateY }] }]}>
      <Text style={styles.messageText}>{text}</Text>
    </Animated.View>
  );
};

const ChatsScreen = () => {
  const { navigateTo, goBack } = useNavigationManager();
  const [messages, setMessages] = useState([
    { id: "1", text: "你好！" },
    { id: "2", text: "最近怎么样？" }
  ]);
  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);


  if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);


  const sendMessage = () => {
    if (!input.trim()) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMessages([...messages, { id: String(messages.length + 1), text: input }]);
    setInput("");
    inputRef.current?.focus(); // 发送后保持焦点，让键盘不消失
  };

  /*
  useEffect(() => {

    document.body.style.overflow = "hidden"; // 禁止页面整体滚动
    document.documentElement.style.overscrollBehavior = "none"; // 禁止页面整体滚动
    return () => {
      document.body.style.overflow = ""; // 恢复页面整体滚动
      document.documentElement.style.overscrollBehavior = "auto"; // 恢复页面整体滚动
    };
  }, []);
  */
  // 禁用页面整体滚动
  useDisableScroll(true);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          if (!inputRef.current?.isFocused()) {
            Keyboard.dismiss(); // 只有输入框未聚焦时才关闭键盘
          }
        }}
        accessible={false}
      >
        <View style={styles.inner}>
          {/* 头部导航 - 始终固定 */}
          <View
            style={styles.header}
            onStartShouldSetResponder={() => true} // 在 header 组件中添加 onStartShouldSetResponder={() => true} 这样可以阻止页面整体滚动：
          >
            <TouchableOpacity onPress={goBack}>
              <Text style={styles.headerText}>返回</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>微信聊天</Text>
            <TouchableOpacity onPress={() => { }}>
              <Text style={styles.headerText}>...</Text>
            </TouchableOpacity>
          </View>

          {/* 聊天信息列表 - 仅允许滚动此区域 */}
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <AnimatedMessage text={item.text} />
              )}
              contentContainerStyle={styles.messagesList}
              scrollEnabled={true} // 确保聊天列表可滚动
              keyboardShouldPersistTaps="handled" // 允许点击滚动区域时键盘不关闭
              showsVerticalScrollIndicator={false} // 隐藏滚动条，增强体验
            />

          {/* 输入框 - 始终固定 */}
          <View style={styles.inputContainer} onStartShouldSetResponder={() => true}>
            <TextInput
              onStartShouldSetResponder={() => true}
              ref={inputRef}
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="输入消息..."
              onFocus={() => flatListRef.current?.scrollToEnd({ animated: true })}
              keyboardType="default" // 指定输入法类型
              returnKeyType="send" // 指定回车键类型为发送
              blurOnSubmit={false} // 防止提交时自动失去焦点
              onSubmitEditing={sendMessage} // **回车键触发发送**
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendButtonText}>发送</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  inner: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    backgroundColor: "#007aff",
    alignItems: "center",
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 100,
    paddingHorizontal: 20,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  messagesList: {
    paddingTop: 60, // 避免顶部导航遮挡
    paddingBottom: 50, // 避免底部输入框遮挡
  },
  messageContainer: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    ...(Platform.OS === "web" && {
      transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
      transform: "translateY(30px)",
    }),
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    width: "100%",
    zIndex: 100,
  },
  input: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#007aff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ChatsScreen;
