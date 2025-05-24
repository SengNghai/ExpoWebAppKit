import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigationHistory } from "@/hooks/useNavigationHistory";
import { useDisableScroll } from "@/hooks/useDisableScroll";

export default function AboutScreen() {
    const { goBack } = useNavigationHistory();
    useDisableScroll(true);
    return (
        <View style={styles.container}>
            <View 
                style={styles.header}
                onStartShouldSetResponder={() => true} // 在 header 组件中添加 onStartShouldSetResponder={() => true} 这样可以阻止页面整体滚动：
            >
                <TouchableOpacity onPress={goBack}>
                    <Text style={styles.headerText}>返回</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>关于</Text>
                <TouchableOpacity onPress={() => { }}>
                    <Text style={styles.headerText}>...</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={Array.from({ length: 100 }, (_, i) => ({ id: String(i), text: "Item " + i }))}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>{item.text}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.messagesList}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
        paddingTop: 60,
        paddingBottom: 50,
    },
    itemContainer: {
        backgroundColor: "#ccc",
        marginVertical: 2,
    },
    itemText: {
        height: 50,
        lineHeight: 50,
        textAlign: "center",
        fontSize: 16,
    }
})
