import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import MyHeader from "@/components/my/MyHeader"
import { router } from "expo-router"

function Upper() {
    const label=['账号与安全', '个人资料', '隐私设置', '通用设置', '通知设置']
    const arrow = require('@/assets/images/My/arrow.png')
    
    const events = (index: number) => {
        switch (index) {
            case 1: router.push('/my/setting/selfProfile'); break;
        }
    }
    
    return (
        <View style={style.container}>
            {label.map((value, index) => (
                <Pressable 
                style={[style.item, index !== 4 && style.border]} 
                key={`settingUpper${index}`}
                onPress={() => events(index)}
                >
                    <Text style={style.label}>{value}</Text>
                    <Pressable style={style.arrow}>
                        <Image source={arrow} />
                    </Pressable>
                </Pressable>
            ))}
        </View>
    )
}

function Medium() {
    const label = ['帮助与服务', '关于Healthier', '清除缓存']
    const arrow = require('@/assets/images/My/arrow.png')
    return (
        <View style={[style.container, {marginTop: 25}]}>
            {label.map((value, index) => (
                <Pressable style={[style.item, index !== 2 && style.border]} key={`settingUpper${index}`}>
                    <Text style={style.label}>{value}</Text>
                    <Pressable style={style.arrow}>
                        <Image source={arrow} />
                    </Pressable>
                </Pressable>
            ))}
        </View>
    )
}

function Below() {
    const label = ['切换账号', '退出登录']
    return(
        <View style={{
            width: '90%',
            backgroundColor: 'white',
            borderRadius: 18,
            marginTop: 25
        }}>
            {label.map((value, index) => (
                <Pressable key={`settingBelow${index}`} style={[{
                    paddingVertical: 20,
                    alignItems: 'center'
                }, index === 0 && style.border]}>
                    <Text style={[style.label, index === 1 && {color: '#ED5151'}]} >{value}</Text>
                </Pressable>
            ))}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 15,
        width: '90%',
        paddingVertical: 10
    },
    border: {
        borderBottomColor: '#999999',
        borderBottomWidth: 0.6
    },
    item: {
        flexDirection: 'row',
        padding: 15,
        paddingInline: 20
    },
    label: {
        color: '#666666',
        fontSize: 18
    },
    arrow: {
        position: "absolute",
        right: 25,
        top: 20
    }
})

export default function Setting() {
    return (
        <View style={{flex: 1, backgroundColor: '#FAFAFA', alignItems: "center"}}>
            <MyHeader index={7} noBorder={true} isMyLikePage={true} />
            <Upper />
            <Medium />
            <Below />
        </View>
    )
}