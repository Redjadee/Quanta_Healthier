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
            <View>
                <Text>定时发布</Text>
                <ScrollView>

                </ScrollView>
                <View>
                    <Pressable>
                        <Image source={require('@/assets/images/comment/reSet.png')} />
                        <Text>清除</Text>
                    </Pressable>
                    <Pressable>
                        <Text>确认</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}