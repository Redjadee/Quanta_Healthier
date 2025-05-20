import { Text, View, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { Link } from "expo-router"
import ShuinChangHeader from "@/components/index/ShuinChangHeader"


function Header() {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Link href={'/'}><Image source={require('@/assets/images/leftArrow.png')} /></Link>
            <Text style={{color: '#555555', fontSize: 22}}>肠道记录</Text>
        </View>
    )
}

export default function ChangDao() {
    return (
        <View>
            <ShuinChangHeader index={1} />
        </View>
    )
}