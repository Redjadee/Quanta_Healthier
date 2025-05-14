import { View, Text, StyleSheet, Image, Pressable, ScrollView } from "react-native"
import Modal from 'react-native-modal'

interface SetPostTimeType {
    visible: boolean
    setVisible: (visible:boolean) => void
}

export default function SetPostTime( { visible, setVisible }:SetPostTimeType ) {
    return (
        <Modal
            isVisible={visible}
            onBackdropPress={() => setVisible(false)}
            onBackButtonPress={() => setVisible(false)}
            style={{justifyContent: 'flex-end', margin: 0}}
            backdropOpacity={0.5}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
        >
            <View style={style.container} >
                <Text style={style.title} >定时发布</Text>
                <ScrollView>

                </ScrollView>
                <View style={{
                    width: '100%', 
                    flexDirection: 'row',
                    paddingVertical: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                }} >
                    <Pressable style={{
                        alignItems: 'center'
                    }}>
                        <Image source={require('@/assets/images/comment/reSet.png')} />
                        <Text style={{
                            color: '#666666',
                            fontSize: 12,
                        }}>清除</Text>
                    </Pressable>
                    <Pressable style={style.button} 
                        onPress={() => {setVisible(false)}}
                    >
                        <Text style={style.buttonLabel} >确认</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        color: '#444555',
        fontSize: 22,
        fontWeight: '500',
        paddingTop: 10,
    },
    button: {
        width: '80%',
        height: 35,
        backgroundColor: 'rgba(255, 154, 13, 0.8)',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonLabel: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700'
    }
})