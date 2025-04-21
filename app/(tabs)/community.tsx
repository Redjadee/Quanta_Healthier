import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TextInput, View, StyleSheet, Pressable, Image, ImageBackground } from "react-native";
import Comment from '@/components/Comment'
import { router } from 'expo-router'

///////////////////////////////////////
interface CommunityTabProps {
  changeShow: () => void;
}

function CommunityTab({ changeShow }: CommunityTabProps) {
  const [now, setNow] = useState('question')


  const tabs = [
    {label:'问答', id: 'question'},
    {label:'文章', id: 'article'}
  ]
  const content = tabs.map(item => (
    <View style={{justifyContent: 'center', alignItems: 'center'}}  key={item.id} >
    <Text onPress={() => {setNow(item.id);changeShow()}} style={[tabStyle.tab, now === item.id && tabStyle.active]}>{item.label}</Text>
    <View style={[now !== item.id && {display: 'none'}, tabStyle.activeUnderline]} key={`tabActiveUnderline${item.id}`} ></View>
    </View>
  ))

  return(
    <View style={tabStyle.container}>
      {content}
    </View>
  )
}

const tabStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: '20%',
    paddingBottom: 20
  },
  tab: {
    color: '#9F9C97',
    fontSize: 20,
    fontWeight: '500'
  },
  active: {
    color: '#FEB246',
    fontWeight: '700',
    paddingBottom: 3
  },
  activeUnderline: {
    backgroundColor: '#FEB246',
    width: 55,
    height: 6,
    borderRadius: 15
  }
})
///////////////////////////////////////

function PublishnMy() {
  const content = [
    {uri: require('@/assets/images/community/publish.png'), label: '发布问题'},
    {uri: require('@/assets/images/community/myQuestion.png'), label: '我的提问'}
  ]
  const mapedContent =  content.map((item, index) => (
    <Pressable key={`PublishnMy${index}`} onPress={() => { index === 0 ? router.push('/publishMyQ'): router.push('/')}}>
      <View style={publishnMyStyle.box}>
        <Image source={item.uri} />
        <Text style={publishnMyStyle.label} >{item.label}</Text>
      </View>
    </Pressable>
  ))
  return (
    <View style={publishnMyStyle.container} >
      {mapedContent}
    </View>
  )
}

const publishnMyStyle = StyleSheet.create({
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

///////////////////////////////////////
function HotTopic() {
  const hotTopics = [
    {title: '办公室便秘自救指南'},
    {title: '宵夜后肠道调理方案'}
  ]
  const mapedHotTopics = hotTopics.map((item, index) => (
    <View key={`HotTopic${index}`} style={hotTopicStyle.topicItem} >
      <ImageBackground  source={require('@/assets/images/community/hot.png')} style={hotTopicStyle.topicIcon}><Text style={{color: 'white', fontSize: 12, fontWeight: '500', position: 'absolute', top: 6,left: 7}} >{index+1}</Text></ImageBackground>
      <Text style={hotTopicStyle.topicTitle} >{item.title}</Text>
    </View>
  ))

  return(
    <View style={hotTopicStyle.container} >
      <View style={hotTopicStyle.header} >
        <Text style={hotTopicStyle.headerText}>热门话题</Text>

        <View style={hotTopicStyle.headerRight} >
          <Text style={[hotTopicStyle.headerText, {fontSize: 13}]} >全部话题</Text>
          <Image source={require('@/assets/images/rightArrow.png')} style={{marginLeft: 7,width: 12,height: 12}} />
        </View>
      </View>
      <View style={hotTopicStyle.body} >
      {mapedHotTopics}
      </View>
    </View>
  )
}

const hotTopicStyle = StyleSheet.create({
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
    paddingLeft: 30
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

///////////////////////////////////////
function Question() {
  return (
    <View style={questionStyle.container} >
      <PublishnMy />
      <HotTopic />
      <View style={questionStyle.list}>
        <Comment />
      </View>
    </View>
  )
}

const questionStyle = StyleSheet.create({
  container: {
    flex: 8,
    width: '100%'
  },
  list: {
    width: '100%'
  }
})
///////////////////////////////////////
function Article() {
  return(
    <View style={articleStyle.container} >

    </View>
  )
}

const articleStyle = StyleSheet.create({
    container: {
      flex: 8
    }
})

///////////////////////////////////////
export default function Community() {
  const [showLeft, setShowLeft] = useState(true)
  const changeshow = () => setShowLeft(!showLeft)
  return (
    <LinearGradient colors={['#FDE8CC', '#FFFFFF']} style={style.container}>
      
      <View style={style.header}>
        <View style={style.searchArea}>
        <Image source={require('@/assets/images/community/searchIcon.png')}  style={{marginInline: 10}} />
        <TextInput ></TextInput>
        </View>
        <Pressable>
          <Text style={style.searchLabel} >搜索</Text>
        </Pressable>
      </View>
      
      <CommunityTab changeShow={changeshow} />
      {showLeft ? <Question /> : <Article />}

    </LinearGradient>
  );
}


const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: 'row',
    alignItems: "center",
    flex: 1
  },
  searchArea: {
    backgroundColor: 'white',
    width: '75%',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchLabel: {
    paddingLeft: 15,
    fontSize: 17,
    color: '#83817F',
    fontWeight: '500'
  }
})

