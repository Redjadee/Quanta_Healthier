import { Text, View, StyleSheet, Image, Pressable, ViewStyle, ScrollView } from "react-native"
import MyHeader from "@/components/my/MyHeader"

interface ContentType {
    index: number
    profile?: string
}

function Content({ index, profile }: ContentType) {
    switch (index) {
        case 0: {
            const postProfile = profile? { uri: profile } : require('@/assets/images/comment/defaultImg.png')
            return (
            <Pressable>
                <Image style={{
                width: 38,
                height: 38
            }} source={postProfile} />
            </Pressable>
        )
        }
        case 1: return (
            <Pressable>
                <Text style={contentStyle.big} >
                    这里是名字
                </Text>
            </Pressable>
        )
        case 2: return (
            <Pressable>
                <Text style={contentStyle.big}>
                    123123123
                </Text>
            </Pressable>
        )
        case 3: return (
            <Pressable>
                <Text style={contentStyle.big}>
                    
                </Text>
            </Pressable>
        )
        case 4: return (
            <Pressable>
                <Text style={contentStyle.small}>
                    选择性别
                </Text>
            </Pressable>
        )
        case 5: return (
            <Pressable>
                <Text  style={contentStyle.small}>
                    选择生日
                </Text>
            </Pressable>
        )
        case 6: return (
            <Pressable>
                <Text style={contentStyle.small}>
                    选择职业
                </Text>
            </Pressable>
        )
        case 7: return (
            <Pressable>
                <Text style={contentStyle.small}>
                    选择地区
                </Text>
            </Pressable>
        )
        case 8: return (
            <Pressable>
                <Image style={{
                    width: 50,
                    height: 35
                }} />
            </Pressable>
        )
    }
}

const contentStyle = StyleSheet.create({
    big: {
        color: '#666666',
        fontSize: 18,
    },
    intro: {

    },
    small: {
        color: '#888888',
        fontSize: 14
    }
})

export default function SelfProfile() {
    const label = ['头像', '名字', '账号', '简介', '性别', '生日', '职业', '地区', '背景图']
    const arrow = require('@/assets/images/My/arrow.png')
    
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
        }}>
            <MyHeader index={8} noBorder={true} />
            <View style={{
                width: '90%'
            }}>
                {label.map((value, index) => (
                    <Pressable 
                    key={`settingSelfProfile${index}`} 
                    style={[style.container, index !== 8 && style.border]}
                    >
                        <Text style={style.label} >{value}</Text>
                        <View style={style.content} >
                            <Content index={index} />    
                        </View>                       
                        <Image source={arrow} style={style.arrow} />
                    </Pressable>
                ))}
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        paddingBottom: 20,
        width: '100%'
    },
    border: {
        borderBottomColor: 'rgba(153, 153, 153, 0.8)',
        borderBottomWidth: 0.3
    },
    label: {
        color: '#666666',
        fontSize: 18
    },
    content: {
        position: 'absolute',
        right: 45
    },
    arrow: {
        position: 'absolute',
        right: 20
    }
})