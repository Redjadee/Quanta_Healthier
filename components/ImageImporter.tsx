//导入图片组件
import { StyleSheet } from 'react-native' 
import { Image, type ImageSource } from 'expo-image'

type Props = {
    imgSource: ImageSource
    selectedImg?: string
}

export default function ImageImporter({ imgSource, selectedImg }: Props) {
    const shownImg = selectedImg ? {uri: selectedImg} : imgSource
    return <Image source={shownImg} style={style.Image} />
}

/*
根据评论块、头像
不同的导入场景，写不一样的样式
*/
const style = StyleSheet.create({
    Image: {
        width: 300,
        height: 400,
        borderRadius: 18
    }
})