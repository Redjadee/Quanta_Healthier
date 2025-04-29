import { View, Text, Image, Pressable, StyleSheet, TextInput } from "react-native"
import { Link } from "expo-router"

export default function PublishMyQ() {
    return(
        <View style={style.container}>
            <View style={style.header} >
                <Link href='/community'><Image source={require('@/assets/images/leftArrow.png')}/></Link>
                <Pressable><Text style={style.draftBox} >草稿箱</Text></Pressable>
            </View>
            <Image source={require('@/assets/images/comment/addPhoto.png')} ></Image>  
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        padding: 20,
        gap: '75%',
        alignItems: 'center'
    },
    draftBox: {
        color: '#7D7D7D',
        fontWeight: '500',
        backgroundColor: '#EAEAEA',
        paddingInline: 18,
        paddingVertical: 8,
        borderRadius: 18
    }
})