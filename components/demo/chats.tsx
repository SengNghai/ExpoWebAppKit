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
} from "react-native";

const ChatsScreen = () => {
  const [messages, setMessages] = useState([
    { id: "1", text: "你好！" },
    { id: "2", text: "最近怎么样？" }
  ]);
  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: String(messages.length + 1), text: input }]);
    setInput("");
    inputRef.current?.focus(); // 发送后保持焦点，让键盘不消失
  };

  useEffect(() => {
    // 禁止页面整体滚动，但允许 `FlatList` 内部滚动
    // const preventGlobalScroll = (event: TouchEvent) => {
    //   if (event.target instanceof HTMLElement && !event.target.closest(".chat-messages")) {
    //     event.preventDefault();
    //   }
    // };

    document.body.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";
    // document.addEventListener("touchmove", preventGlobalScroll, { passive: false });

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overscrollBehavior = "auto";
      // document.removeEventListener("touchmove", preventGlobalScroll);
    };
  }, []);

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
          <View style={styles.header} 
           onStartShouldSetResponder={() => true} // 在 header 组件中添加 onStartShouldSetResponder={() => true} 这样可以阻止页面整体滚动：
          >
            <Text style={styles.headerText}>微信聊天</Text>
          </View>

          {/* 聊天信息列表 - 仅允许滚动此区域 */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            )}
            contentContainerStyle={styles.messagesList}
            scrollEnabled={true} // 确保聊天列表可滚动
            keyboardShouldPersistTaps="handled" // 允许点击滚动区域时键盘不关闭
            showsVerticalScrollIndicator={false} // 隐藏滚动条，增强体验
          />

          {/* 输入框 - 始终固定 */}
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="输入消息..."
              onFocus={() => flatListRef.current?.scrollToEnd({ animated: true })}
              keyboardType="default"
              returnKeyType="send"
              blurOnSubmit={false} // 防止提交时自动失去焦点
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
    height: 60,
    backgroundColor: "#007aff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 100,
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
