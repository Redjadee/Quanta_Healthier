import { View, Text, StyleSheet, ImageBackground, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient";


export default function HotTopic() {
  const hotTopics = [
    {title: '办公室便秘自救指南'},
    {title: '宵夜后肠道调理方案'}
  ]
  const mapedHotTopics = hotTopics.map((item, index) => (
    <View key={`HotTopic${index}`} style={style.topicItem} >
      <ImageBackground  source={require('@/assets/images/community/hot.png')} style={style.topicIcon}><Text style={{color: 'white', fontSize: 12, fontWeight: '500', position: 'absolute', top: 6,left: 7}} >{index+1}</Text></ImageBackground>
      <Text style={style.topicTitle} >{item.title}</Text>
    </View>
  ))

  return(
    <View style={style.container} >
      <View style={style.header} >
        <Text style={style.headerText}>热门话题</Text>

        <View style={style.headerRight} >
          <Text style={[style.headerText, {fontSize: 13}]} >全部话题</Text>
          <Image source={require('@/assets/images/rightArrow.png')} style={{marginLeft: 7,width: 12,height: 12}} />
        </View>
      </View>
      <LinearGradient colors={['rgba(255, 177, 133,0.1)', 'rgba(255, 208, 143,0.2)']} start={{x: 0, y: 0}} end={{x:1, y: 0}}  style={style.body} >
      {mapedHotTopics}
      </LinearGradient>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 20,
    marginInline: 35
  },

  header: {
    flexDirection: 'row',
    marginBottom: 10
  },
  headerText: {
    fontSize: 18,
    color: '#706F6C',
    fontWeight: '500'
  },
  headerRight: {
    position:'absolute',
    right: 10,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },

  body: {
    backgroundColor: '#FAE1C6',
    borderRadius: 15,
    gap: 10,
    padding: 15,
    paddingLeft: 30,

    
    shadowColor: 'rgb(227, 182, 141)',
    shadowOffset: {
        width: 2,                // 水平偏移
        height: 2,               // 垂直偏移

    },
    shadowOpacity: 1,       // 透明度 (0~1)
    shadowRadius: 20,        // 模糊半径
    elevation: 5
  },

  topicItem: {
    flexDirection: 'row',
    gap: 10,
  },
  topicIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 24
  },
  topicTitle: {
    fontSize: 17,
    color: '#706F6C',
    fontWeight: '500'
  }
})
