import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { router } from "expo-router"

export default function MyHeader({ index, noBorder=false, isMyLikePage=false }: { index: number, noBorder?: boolean, isMyLikePage?: boolean }) {
    const label = [ '收到的赞', '收到的评论', '我的足迹', '我的喜欢', '我的提问', '我的回答', '称号收集', '设置']
    return (
        <View style={[
            style.container, 
            !noBorder && style.border,
            isMyLikePage ? {backgroundColor: '#FAFAFA'} : {backgroundColor: 'white'}
        ]}>
            <Pressable style={style.arrowBox} onPress={() => router.back()}>
                <Image source={require("@/assets/images/leftArrow.png")}  />
            </Pressable>
            <Text style={style.label}>{label[index]}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    border: {
        borderBottomColor: "#999999",
        borderBottomWidth: 0.6
    },
    label: {
        color: '#555555',
        fontSize: 22
    },
    arrowBox: {
        position: 'absolute',
        left: 25,
        top: 27,
    }
})