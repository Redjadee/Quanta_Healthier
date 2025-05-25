import { Text, View, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import ShuinChangHeader from "@/components/index/ShuinChangHeader"
import { Switch } from "react-native-ui-lib";

function Weather() {
    const weather = '多云'
    
    return (
        <View style={[doubleStyle.container, {backgroundColor: 'rgba(117, 230, 255, 0.9)', borderColor: 'rgba(122, 208, 230, 0.7)'}]}>
            <View style={doubleStyle.header}>
                <Image style={{width: 44, height: 29}} source={require('@/assets/images/changDao/weatherIcon.png')} />
                <Text style={doubleStyle.headerLabel}>天气</Text>
            </View>
            <View>
                <Image />
                <Text style={{
                    color: '#FFFFFF',
                    fontSize: 21,
                    fontWeight: '600'
                }}>{weather}</Text>
            </View>
        </View>
    )
}

function Intake() {
    return (
        <View style={[doubleStyle.container, {backgroundColor: 'rgba(198, 247, 188, 1)', borderColor: 'rgba(168, 217, 158, 0.7)'}]}>
            <View style={doubleStyle.header}>
                <Image style={{width: 33, height: 27}} source={require('@/assets/images/changDao/foodIcon.png')} />
                <Text style={doubleStyle.headerLabel}>饮食</Text>
                
            </View>
        </View>
    )
}

const doubleStyle = StyleSheet.create({
    container: {
        width: "40%",
        height: 120,
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
        color: '#444444',
        fontSize: 19
    }
})

function Defecation() {

}

function Mood() {

}

function Pressure() {

}

export default function ChangDao() {
    return (
        <View>
            <ShuinChangHeader index={1} />
            <View style={style.block}>
            <View style={style.header}>
                <Weather />
                <Intake />
            </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    block: {
        width: '100%',
        height: '80%',
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