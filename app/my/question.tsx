import { Text, View, StyleSheet, Image, Pressable, ViewStyle, ScrollView } from "react-native";
import MyHeader from "@/components/my/MyHeader"
import { useCallback } from "react";
import { StyleProp } from "react-native"

function Item() {
    const postContent = '谁能帮我把APP写了'

    return (
        <Pressable style={{
            gap: 10,
            padding: 15,
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 18,
            borderColor: 'rgba(153, 153, 153, 0.25)',
            borderWidth: 0.4,
            borderBottomWidth: 2,
            borderRightWidth: 2
        }}>
            <Text style={{
                color: '#666666',
                fontSize: 19
            }}>{postContent}</Text>
            <Icons />
        </Pressable>
    )
}

function Icons() {
    const seen = 122
    const like = 12
    const comment = 23
    const share = 20
    
    const label = [seen, like, comment, share]
    const icon = [
        require('@/assets/images/My/question/seen.png'),
        require('@/assets/images/My/question/like.png'),
        require('@/assets/images/My/question/comment.png'),
        require('@/assets/images/My/question/share.png'),
    ]

    const iconStyle = useCallback((index: number) => {
        let re: StyleProp<ViewStyle> = null
        switch (index) {
            case 1: re = {
                left: 70,
            }; break;
            case 2: re = {
                left: 120,
            }; break;
            case 3: re = {
                left: 180
            }
        }
        return re
    }, [])
    
    return (
        <View style={style.container} >
            {label.map((value, index) => (
                <View key={`MyQuestion${index}`} style={[style.box, iconStyle(index)]} >
                    <Image source={icon[index]} />
                    <Text style={style.numLabel} >{value}</Text>
                </View>   
            ))}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 20
    },
    box: {
        flexDirection: "row",
        gap: 5,
        position: 'absolute'
    },
    numLabel: {
        color: '#999999',
        fontSize: 14
    }
})

export default function MyQuestion() {
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#FAFAFA',
            width: '100%',
            alignItems: "center"
        }}>
            <MyHeader index={4} noBorder={true} isMyLikePage={true} />
            <View style={{flex: 3, alignItems: 'center', width: "90%"}} >
                <ScrollView style={{width: '100%'}}>
                    <Item />
                </ScrollView>
            </View>
        </View>
    )
}