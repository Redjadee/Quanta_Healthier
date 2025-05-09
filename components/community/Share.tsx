import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { View, Text, StyleSheet, Pressable, Image } from "react-native"
import { useShare } from "@/src/context/ShareContext"

function Upper() {
    const nameArr = ['微信好友', '朋友圈', 'QQ好友', 'QQ空间']
    const iconArr = [require('@/assets/images/community/shareU1.png'), require('@/assets/images/community/shareU2.png'), require('@/assets/images/community/shareU3.png'), require('@/assets/images/community/shareU4.png')]
    const re = nameArr.map((value, index) => (
        <Pressable key={`shareU${index}`} style={ULstyle.item} >
            <Image source={iconArr[index]}/>
            <Text style={ULstyle.text}>{value}</Text>
        </Pressable>
    )) 
    return (
        <View style={[ULstyle.container, {borderBottomColor: 'rgba(119, 119, 119, 0.19)', borderBottomWidth: 0.6,}]} >
            {re}
        </View>
    )
}


function Lower() {
    const nameArr = ['复制链接', '举报']
    const iconArr = [require('@/assets/images/community/shareL1.png'), require('@/assets/images/community/shareL2.png')]
    const re = nameArr.map((value, index) => (
        <Pressable key={`shareL${index}`} style={ULstyle.item} >
            <Image source={iconArr[index]}/>
            <Text style={ULstyle.text} >{value}</Text>
        </Pressable>
    )) 
    return (
        <View style={ULstyle.container} >
            {re}
        </View>
    )
}

const ULstyle = StyleSheet.create({
    container: {
        width: '100%',
        height: 120,
        flexDirection: 'row',
        gap: '10%',
        paddingLeft: '10%',
        alignItems: 'center'
    },
    item: {
        alignItems: 'center',
        gap: 5
    },
    text: {
        color: 'rgb(85, 85, 85)',
        fontSize: 12,
    }
})

export default function Share() {
    const { share, setShare } = useShare()

    return (
        <View style={[style.container, {bottom: 0-useBottomTabBarHeight()}]}>
            <View style={style.header} ><Text style={{fontSize: 22, color: '#444555', fontWeight: '500'}}>分享到</Text></View>
            <Upper />
            <Lower />
            <View style={{marginBottom: 15}} ><Pressable  onPress={() => setShare(false)} ><Text style={style.buttonLabel} >取消</Text></Pressable></View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        position: 'absolute',
        elevation: 20,
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center'
    },
    header: {
        paddingVertical: 10,
        borderBottomColor: 'rgba(119, 119, 119, 0.19)',
        borderBottomWidth: 0.6,
        width: '100%',
        alignItems: 'center'
    },
    buttonLabel: {
        backgroundColor: 'rgba(204, 204, 204, 0.3)',
        paddingInline: '40%',
        paddingVertical: 5,
        borderRadius: 18,
        fontWeight: '500',
        fontSize: 20,
        color: 'rgb(68, 69, 85)'
    }
})