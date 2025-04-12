import { useState } from "react";
import { Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import Comment from '@/components/Comment'

///////////////////////////////////////
interface CommunityTabProps {
  changeShow: () => void;
}

function CommunityTab({ changeShow }: CommunityTabProps) {
  const [now, setNow] = useState('question')

  const changeNow: (id: string) => void = id => setNow(id)

  const tabs = [
    {label:'问答', id: 'question'},
    {label:'文章', id: 'article'}
  ]
  const content = tabs.map(item => (
    <Text key={item.id} onPress={() => {changeNow(item.id);changeShow()}} style={[tabStyle.tab, now === item.id && tabStyle.active]}>{item.label}</Text>
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
    flex: 1
  },
  tab: {
     
  },
  active: {
    fontSize: 20
  }
})
///////////////////////////////////////
function Question() {
  return (
    <View style={questionStyle.container} >
      <PublishnMy />
      <View style={questionStyle.list}>
        <Comment />
      </View>
    </View>
  )
}


function PublishnMy() {
  return (
    <View>
      <Text>占位符捏</Text>
    </View>
  )
}

const questionStyle = StyleSheet.create({
  container: {
    flex: 8
  },
  list: {
    flex: 13,
    backgroundColor: 'white'
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
    <View style={style.container}>
      
      <View style={style.header}>
        <TextInput style={style.searchArea}>ssssss</TextInput>
        <Pressable>
          <Text>搜索</Text>
        </Pressable>
      </View>
      
      <CommunityTab changeShow={changeshow} />
      {showLeft ? <Question /> : <Article />}


    </View>
  );
}


const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FAE8CA'
  },
  header: {
    flexDirection: 'row',
    alignItems: "center",
    flex: 1
  },
  searchArea: {
    backgroundColor: 'white',
  }
})

