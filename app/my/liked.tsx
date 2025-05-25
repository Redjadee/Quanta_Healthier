import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import MyHeader from "@/components/my/MyHeader"

function Item() {
    return (
        <View>
            <Image />
            <View>
                <Text></Text>
                <View>
                    <Text></Text>
                    <Text></Text>
                </View>
                <Text></Text>
            </View>
            <Image />
        </View>
    )
}

export default function MyLiked() {
    return (
        <View>
            <MyHeader index={0} />
        </View>
    )
}