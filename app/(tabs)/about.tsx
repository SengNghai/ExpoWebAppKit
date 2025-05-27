import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigationManager } from "@/hooks/useNavigationManager";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { Image } from 'expo-image';

export default function AboutScreen() {
    const { goBack } = useNavigationManager();
    useDisableScroll(true);

    const blurhash = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPFxqRYsT_F9tT7jc1mA4ZMYcd7Cs0GEMGAQ&s';

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
            <View style={styles.blurhashContainer}>
                <Image
                    source={{ uri: blurhash }}
                    style={styles.blurhash}
                />
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
    blurhashContainer: {
        height: 200,
        justifyContent: "center",
        alignItems: "center",
    },
    blurhash: {
        width: 100,
        height: 100,
        overflow: "hidden",
        borderRadius: 100,
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
