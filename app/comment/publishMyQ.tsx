import { View, Text, Image, Pressable, StyleSheet, TextInput, Switch } from "react-native"
import { Link } from "expo-router"
import { useState } from "react"
import { LinearGradient } from "expo-linear-gradient"
import PostVisible from "@/components/community/publishnMy/PostVisible"
import SetPostTime from "@/components/community/publishnMy/SetPostTime"

function AddTag() {
    const [isFocused, setFocus] = useState(false)
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            paddingLeft: 30,
            gap: 5,
            borderBottomColor: 'rgba(153, 153, 153, 0.32)', 
            borderBottomWidth: 1
        }}>
            <Text style={{fontSize: 18, color: '#666666'}} >#</Text>
            <TextInput style={[style.text, {fontSize: 18, color: '#666666' }]}  multiline={true} cursorColor={'#FFA019'} placeholder={isFocused? '' : '添加标签'} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}></TextInput>
        </View>
    )
}

function Third() {
    const [visible1, setVisible1] = useState(false)
    const [visible2, setVisible2] = useState(false)

    const [ selected1, setSelect1 ] = useState(true)
    const icon2 = [require('@/assets/images/comment/private.png'), require('@/assets/images/comment/onlyMyself.png')]
    const label2 = ['公开可见', '仅自己可见']

    const label = ['标记地点', selected1 ? label2[0] : label2[1], '定时发布']
    const icon = [require('@/assets/images/comment/locate.png'), 
        selected1 ? icon2[0] : icon2[1], 
        require('@/assets/images/comment/setTime.png')]
    
    function event(index: number) {
        switch(index) {
            case 0: {

            };break;
            case 1: {
                setVisible1(true)
            };break;
            case 2:{
                setVisible2(true)
            };break;
        }
    }
    
    const re = label.map((value, index) => (
        <View key={`Publish${index}icon`} style={{ width: '100%', borderBottomColor: 'rgba(153, 153, 153, 0.32)',  borderBottomWidth: 1}} >
        <Pressable style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingInline: 25,
            paddingVertical: 15,
            gap: 5,
        }}
        onPress={() => {event(index)}}
        >
            <Image source={icon[index]}/>   
            <Text style={{fontSize: 18, color: '#666666'}} >{value}</Text>
            <Image style={{
                position: 'absolute',
                right: 30
            }} source={require('@/assets/images/comment/arrowPub.png')} ></Image>
        </Pressable>
        </View>
    ))
    return (
        <>
        {re}
        <PostVisible visible1={visible1} setVisible1={setVisible1} selected={selected1} setSelect={setSelect1} />
        <SetPostTime visible={visible2} setVisible={setVisible2} />
        </>
    )
}

function SwitchDouble() {
    const [enabled1, setEnabled1] = useState(false)
    const [enabled2, setEnabled2] = useState(false)
    const label = ['允许AI回复', '允许他人回复']
    const re = label.map((value, index) => (
        <View key={`publish${index}respond`} style={[index === 0 && {borderBottomColor: 'rgba(153, 153, 153, 0.32)',  borderBottomWidth: 1}, {
            paddingInline: 25,
            paddingVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
        }]}>
            <Text style={{fontSize: 18, color: '#666666'}} >{value}</Text>
           {index === 0?  
           <Switch
                value={enabled1}
                onValueChange={() => setEnabled1(!enabled1)}
                trackColor={{ false: 'rgba(153, 153, 153, 0.4)', true: 'rgba(255, 167, 84, 1)' }}
                thumbColor={'white'}
                style={{
                    position: 'absolute',
                    right: 20,
                    transform: [{scale: 1.2}]
                }}
            ></Switch> : 
            <Switch
                value={enabled2}
                onValueChange={() => setEnabled2(!enabled2)}
                trackColor={{ false: 'rgba(153, 153, 153, 0.4)', true: 'rgba(255, 167, 84, 1)' }}
                thumbColor={'white'}
                style={{
                    position: 'absolute',
                    right: 20,
                    transform: [{scale: 1.2}]
                }}
            ></Switch>}
        </View>
    ))
    return (
        <>
        {re}
        </>
    )
}

export default function PublishMyQ() {
    const [isFocused1, setFocus1] = useState(false)
    const [isFocused2, setFocus2] = useState(false)
    let detectedTag: string[] = []
    return(
        <View style={style.container}>
            <View style={style.header} >
                <Link href='/community'><Image source={require('@/assets/images/leftArrow.png')}/></Link>
                <Pressable><Text style={style.draftBox} >草稿箱</Text></Pressable>
            </View>

            <View style={style.body} >
                <Pressable style={{width: 10}}  onPress={() => {}} ><Image source={require('@/assets/images/comment/addPhoto.png')} ></Image></Pressable>
                <TextInput 
                    style={[style.text, {fontSize: 22, fontWeight: '500', color: '#777777'}]} 
                    multiline={true} 
                    cursorColor={'#FFA019'} 
                    placeholder={isFocused1? '' : '添加标题'} 
                    placeholderTextColor={'#FFA019'}
                    scrollEnabled={false} 
                    onFocus={() => setFocus1(true)} 
                    onBlur={() => setFocus1(false)}></TextInput>
                <TextInput 
                    style={[style.text, {fontSize: 18, color: '#777777' }]}  
                    multiline={true} 
                    cursorColor={'#FFA019'} 
                    placeholder={isFocused2? '' : '添加正文'}
                    scrollEnabled={false} 
                    onFocus={() => setFocus2(true)} 
                    onBlur={() => setFocus2(false)}></TextInput>
            </View>

            <View style={style.footer} >
                <AddTag />
                <Third />
                <SwitchDouble />
            </View>

            <LinearGradient colors={['#FAD96E', '#FFB375']}  start={[0,0]} end={[1,0]} style={style.button} >
                <Pressable style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={style.buttonLabel} >发布</Text>
                </Pressable>
            </LinearGradient>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        padding: 20,
        paddingLeft: 35,
        gap: '70%',
        alignItems: 'center',
    },
    draftBox: {
        color: '#7D7D7D',
        fontWeight: '500',
        backgroundColor: '#EAEAEA',
        paddingInline: 18,
        paddingVertical: 8,
        borderRadius: 18
    },

    body: {
        width: '80%',
        flex: 3
    },
    text: {
        textAlignVertical: 'top',
    },

    footer: {
        flex: 4,
        width: '100%'
    },

    button: {
        height: '7%',
        width: '80%',
        marginBottom: 30,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: '#FBD36F',
        shadowOffset: {
            width: 5,                // 水平偏移
            height: 0,               // 垂直偏移
    
        },
        shadowOpacity: 1,       // 透明度 (0~1)
        shadowRadius: 20,        // 模糊半径
        elevation: 5
    },
    buttonLabel: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 24
    }
})