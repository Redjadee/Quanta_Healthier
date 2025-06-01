import { Pressable, View, Text, Image, StyleSheet } from "react-native"
import { router } from "expo-router"

export default function PublishnMy() {
  const content = [
    {uri: require('@/assets/images/community/publish.png'), label: '发布问题'},
    {uri: require('@/assets/images/community/myQuestion.png'), label: '我的提问'}
  ]
  const mapedContent =  content.map((item, index) => (
    <Pressable key={`PublishnMy${index}`} onPress={() => { index === 0 ? router.push('/comment/publishMyQ'): router.push('/my/question')}}>
      <View style={style.box}>
        <Image source={item.uri} />
        <Text style={style.label} >{item.label}</Text>
      </View>
    </Pressable>
  ))
  return (
    <View style={style.container} >
      {mapedContent}
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center'
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E3',
    padding: 20,
    borderRadius: 15,
    gap: 8
  },
  label: {
    fontSize: 18,
    color: '#7A7976',
    fontWeight: '500',
  }
})