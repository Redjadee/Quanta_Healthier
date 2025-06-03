import { Text, View, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import ShuinChangHeader from "@/components/index/ShuinChangHeader"
import { router } from "expo-router"
import { Switch } from "react-native-ui-lib"
import { useState } from "react";

function Weather() {
    let weatherIndex = 0
    const weather = ['多云', '晴天', '小雨', '中雨', '大雨']
    const weatherIcon = [
        (<Image
            style={{width: 72, height: 63 }} 
            source={require('@/assets/images/changDao/cloudy.png')}/>),
        (<Image
            style={{width: 60, height: 60, top: 5 }} 
            source={require('@/assets/images/changDao/sunny.png')}/>),
        (<Image
            style={{width: 64, height: 64 }} 
            source={require('@/assets/images/changDao/srain.png')}/>),
        (<Image
            style={{width: 64, height: 64 }} 
            source={require('@/assets/images/changDao/mrain.png')}/>),
        (<Image
            style={{width: 64, height: 64 }} 
            source={require('@/assets/images/changDao/lrain.png')}/>), 
    ]
    return (
        <View style={[doubleStyle.container, {backgroundColor: 'rgba(117, 230, 255, 0.9)', borderColor: 'rgba(122, 208, 230, 0.7)'}]}>
            <View style={doubleStyle.header}>
                <Image style={{width: 44, height: 29}} source={require('@/assets/images/changDao/weatherIcon.png')} />
                <Text style={doubleStyle.headerLabel}>天气</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 8}}>
                {weatherIcon[weatherIndex]}
                <Text style={{
                    color: '#FFFFFF',
                    fontSize: 21,
                    fontWeight: '600'
                }}>{weather[weatherIndex]}</Text>
            </View>
        </View>
    )
}

function Intake() {
    const label = ['早餐', '午餐', '晚餐', '加餐']
    const icon = [
        require('@/assets/images/changDao/breakfast.png'),
        require('@/assets/images/changDao/lunch.png'),
        require('@/assets/images/changDao/dinner.png'),
        require('@/assets/images/changDao/add.png'),
    ]

    const defaultPlaceHolder = '___________' 
    return (
        <Pressable 
        style={[doubleStyle.container, 
                {backgroundColor: 'rgba(198, 247, 188, 1)', 
                borderColor: 'rgba(168, 217, 158, 0.7)'}]}
        onPress={() => {}}>
            <View style={doubleStyle.header}>
                <Image style={{width: 33, height: 27}} source={require('@/assets/images/changDao/foodIcon.png')} />
                <Text style={doubleStyle.headerLabel}>饮食</Text>
                <Image style={{width: 15, height: 15, position: 'absolute', top: 7, right: 5}} source={require('@/assets/images/rightArrow.png')} />
            </View>
            <View style={{
                gap: 2,
                marginTop: 3
            }}>
                {label.map((value, index) => (
                    <View 
                    key={`intake${index}`}
                    style={{flexDirection: 'row', alignItems: 'center', marginBottom: 3}}>
                    <Image source={icon[index]} />
                    <Text style={{
                        color: '#666666',
                        fontSize: 14,
                        position: 'absolute',
                        left: 22
                    }}>{value}</Text>
                    <Text style={{
                        position: 'absolute',
                        right: 2,
                        color: '#888888',
                        fontSize: 14
                    }}>{
                        defaultPlaceHolder}</Text>
                    </View>
                ))}
            </View>
        </Pressable>
    )
}

const doubleStyle = StyleSheet.create({
    container: {
        width: "40%",
        height: 130,
        borderRadius: 15,
        padding: 10,
        borderWidth: 1,
        borderBottomWidth: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: "center",
        gap: 8
    },
    headerLabel: {
        color: '#666666',
        fontSize: 19
    }
})

function Defecation() {
    const [ enabled, setEnabled ] = useState(false)
    return (
        <View style={shitStyle.container}>
            <Text style={{
                fontSize: 20,
                color: "#444444"
            }}>排便</Text>
            <View style={shitStyle.box}>
                <Image
                style={{width: 32, height: 27}} 
                source={require("@/assets/images/changDao/defecationDetail.png")}/>
                <Text style={shitStyle.label}>频率&状态</Text>
                <Image 
                source={require('@/assets/images/changDao/addShit.png')} 
                style={shitStyle.button}/>
            </View>
            <View style={shitStyle.box}>
                <Image
                style={{width: 32, height: 32}}  
                source={require('@/assets/images/changDao/shit.png')} />
                <Text style={shitStyle.label}>排便</Text>
                <Switch
                value={enabled}
                onValueChange={() => setEnabled(!enabled)}
                onColor='rgba(255, 167, 84, 1)'
                offColor='rgba(153, 153, 153, 0.4)'
                thumbColor='white'
                style={[{
                    transform: [{scale: 1.1}]
                },
                    shitStyle.button]}
                ></Switch>
            </View>
        </View>
    )
}

const shitStyle = StyleSheet.create({
    container: {
        width: '85%',
        backgroundColor: 'rgba(255, 239, 163, 0.6)',
        borderWidth: 1,
        borderBottomWidth: 3,
        borderColor: '#F7E8B2',
        borderRadius: 15,
        padding: 10,
        paddingInline: 20,
        gap: 12
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    label: {
        color: '#555555',
        fontSize: 16
    },
    button: {
        position: 'absolute',
        right: 10,
    }
})

function Mood() {
    const label = ['愉悦', '平静', '愤怒', '抑郁', '委屈', '焦虑']
    const icon = [
        require('@/assets/images/changDao/happy.png'),
        require('@/assets/images/changDao/peaceful.png'),
        require('@/assets/images/changDao/angry.png'),
        require('@/assets/images/changDao/depressed.png'),
        require('@/assets/images/changDao/weiqu.png'),
        require('@/assets/images/changDao/anxious.png')
    ]

    return (
        <View style={moodStyle.container}>
            <View style={{flexDirection: 'row', marginBottom: 10, alignItems: 'baseline'}}>
                <Text style={{
                    color: '#444444',
                    fontSize: 20
                }}>心情</Text>
                <Text style={{
                    color: '#555555',
                    fontSize: 14
                }}>(可选多种)</Text>
            </View>
            <View style={moodStyle.itemBox}>
                {label.map((value, index) => (
                <MoodItem resource={icon[index]} label={value} key={`moodItem${index}`} />
            ))}
            </View>
        </View>
    )
}

interface moodItemType{
    resource: any,
    label: string
}
function MoodItem({ resource, label }: moodItemType) {
    const [ chosen, setChosen ] =  useState(false)
    return (
        <Pressable
        style={moodStyle.item}
        onPress={() => setChosen(prev => !prev)}>
            <View style={[{padding: 5}, chosen && moodStyle.bgActive]}>
                <Image 
                source={resource} 
                style={{width: 45, height: 45}}/>
            </View>
            <Text style={[moodStyle.label, chosen && moodStyle.labelActive]}>{label}</Text>
        </Pressable>
    )
}

const moodStyle = StyleSheet.create({
    container: {
        width: '85%',
        backgroundColor: '#FFF0D1',
        borderWidth: 1,
        borderBottomWidth: 3,
        borderColor: '#FADCA0',
        borderRadius: 15,
        padding: 10,
    },
    itemBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 5,
        columnGap: '20%',
        justifyContent: 'center'
    },
    item: {
        alignItems: 'center'
    },
    label: {
        fontSize: 16,
        color: '#555555'
    },
    labelActive: {
        color: '#FF9A0D'
    },
    bgActive: {
        backgroundColor: 'rgba(255, 154, 13, 0.8)'
    }
})

function Pressure() {

}

export default function ChangDao() {
    return (
        <View style={style.container}>
            <ScrollView>
                <ShuinChangHeader index={1} />
                <View style={style.block}>
                    <View style={style.header}>
                        <Weather />
                        <Intake />
                    </View>
                    <Defecation />
                    <Mood />
                </View>
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    block: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        zIndex: 2,
        top: -20,
        paddingTop: 20,
        alignItems: 'center',
        gap: 20
    },
    header: {
        flexDirection: "row",
        gap: '5%'
    }
})