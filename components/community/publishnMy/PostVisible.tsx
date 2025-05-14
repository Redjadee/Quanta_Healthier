import { useCallback } from "react"
import { View, Text, StyleSheet, Image, Pressable } from "react-native"
import Modal from 'react-native-modal'

interface postVisibleType {
    visible1: boolean
    setVisible1:(visible: boolean) => void
    selected: boolean
    setSelect: (visible: boolean) => void
}

export default function PostVisible({ visible1, setVisible1, selected, setSelect }: postVisibleType ) {
    
    
    const handleSelect = useCallback(() => {
        let re: boolean[]
        if (selected) {
            re = [true, false]
        } else {
            re = [false, true]
        }
        return re
    }, [selected])
    

    const icon = [require('@/assets/images/comment/private.png'), require('@/assets/images/comment/onlyMyself.png')]
    const label = ['公开可见', '仅自己可见']
    const re =  label.map((value, index) => (
        <Pressable key={`postVisible${index}`} 
            onPress={() => {index === 0 ? setSelect(true) : setSelect(false)}}
            style={[style.button, index === 0 && {borderBottomColor: 'rgba(153, 153, 153, 0.32)', borderBottomWidth: 1}]}
        >
            <Image source={icon[index]}></Image>
            <Text style={style.text} >{value}</Text>
            { handleSelect()[index] && 
            <Image style={{
                position: 'absolute',
                right: 30
            }} source={require('@/assets/images/comment/selected.png')} ></Image>  
            }
        </Pressable>
    ))

    return (
        <Modal
            isVisible={visible1}
            onBackdropPress={() => setVisible1(false)}
            onBackButtonPress={() => setVisible1(false)}
            style={{justifyContent: 'flex-end', margin: 0}}
            backdropOpacity={0.5}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}>

            <View style={style.container} >
                <View style={style.head}></View>
                {re}
            </View>

        </Modal>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        paddingBottom: 15,
        paddingTop: 8,
        alignItems: 'center'
    },
    text: {
        fontSize: 17,
        color: '#666666'
    },
    button: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 20,
        gap: 10,
    },
    head: {
        backgroundColor: '#FFA019',
        width: 60,
        height: 4,
        borderRadius: 10,
        marginBottom: 15,
    }
})