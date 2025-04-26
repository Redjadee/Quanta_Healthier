import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TextInput, View, StyleSheet, Pressable, Image, ScrollView } from "react-native";
import { router } from 'expo-router'

import CommunityTab from "@/components/community/CommunityTab"
import PublishnMy from "@/components/community/PublishnMy"
import HotTopic from "@/components/community/HotTopic"
import Article from "@/components/community/Article"
import Comment from "@/components/community/Comment"



function Question() {
  return (
    <View style={questionStyle.container} >
      <PublishnMy />
      <HotTopic />
      <View style={questionStyle.list} >
          <Comment />
      </View>
    </View>
  )
}

const questionStyle = StyleSheet.create({
  container: {
  },
  list: {
    width: '100%',
    gap: 15
  }
})
///////////////////////////////////////
function Articles() {
  return(
    <View style={articleStyle.container} >
        <View style={{gap: 15, width: '90%'}} >
        <Article />
        </View>
    </View>
  )
}

const articleStyle = StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center'
    },
})

///////////////////////////////////////
export default function Community() {
  const [showLeft, setShowLeft] = useState(true)
  const changeshow = (index: number) => {
    if(index === 0) setShowLeft(true) 
    else setShowLeft(false)
  }
  return (
    <LinearGradient colors={['rgba(254, 232, 201, 1)', 'rgba(254, 232, 201, 0.27)','rgba(254, 232, 201, 0)']} style={style.container}>
      
      <View style={style.header}>
        <View style={style.searchArea}>
        <Image source={require('@/assets/images/community/searchIcon.png')}  style={{marginInline: 10}} />
        <TextInput ></TextInput>
        </View>
        <Pressable>
          <Text style={style.searchLabel} >搜索</Text>
        </Pressable>
      </View>
      
      <View style={{flex: 10, width: '100%'}} >
      <ScrollView>
        <CommunityTab changeShow={changeshow} />
        {showLeft ? <Question /> : <Articles />}
      </ScrollView>
      </View>

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

