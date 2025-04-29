import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TextInput, View, StyleSheet, Pressable, Image, ScrollView } from "react-native";

import CommunityTab from "@/components/community/CommunityTab"
import PublishnMy from "@/components/community/PublishnMy"
import HotTopic from "@/components/community/HotTopic"
import Article from "@/components/community/Article"
import Comment from "@/components/community/Comment"
import { CommentType, commentCommentType } from "@/src/types/commentType"

function Question() {
  //假数据
  let comment1: commentCommentType = {
    id: '00124',
    username: '早睡早起',
    profile: undefined,

    postContent: '健康生活从今天开始',
    postTime: '刚刚',
    postIp: '上海',

    like: 50,

    commentCommentComment: []
  }
  let comment2: commentCommentType = {
    id: '00125',
    username: '健康达人',
    profile: undefined,

    postContent: '坚持锻炼，保持健康！',
    postTime: '1小时前',
    postIp: '北京',

    like: 75,

    commentCommentComment: []
  }
  let comment3: commentCommentType = {
    id: '00126',
    username: '健康小助手',
    profile: undefined,

    postContent: '多喝水，少熬夜！',
    postTime: '2小时前',
    postIp: '深圳',

    like: 30,

    commentCommentComment: []
  }

  let comment4: commentCommentType = {
    id: '00127',
    username: '运动爱好者',
    profile: undefined,

    postContent: '每天跑步，身体倍棒！',
    postTime: '3小时前',
    postIp: '杭州',

    like: 45,

    commentCommentComment: []
  }

  let comment5: commentCommentType = {
    id: '00128',
    username: '健康守护者',
    profile: undefined,

    postContent: '记得按时体检哦！',
    postTime: '4小时前',
    postIp: '南京',

    like: 60,

    commentCommentComment: []
  }

  let comment6: commentCommentType = {
    id: '00129',
    username: '营养专家',
    profile: undefined,

    postContent: '均衡饮食，健康生活！',
    postTime: '5小时前',
    postIp: '广州',

    like: 80,

    commentCommentComment: []
  }

  let comment7: commentCommentType = {
    id: '00130',
    username: '睡眠达人',
    profile: undefined,

    postContent: '早睡早起，精神百倍！',
    postTime: '6小时前',
    postIp: '武汉',

    like: 95,

    commentCommentComment: []
  }

  let data: CommentType = {
    id: '00123',
    username: '今晚一定睡',
    profile: undefined,

    postContent: '还是明天再睡吧',
    postTime: '刚刚',
    postIp: '广东',

    like: 111,
    comment: 222,
    share: 333,
    tags: ['熬夜', '熬夜危害'],

    commentComment: [comment1, comment2, comment3, comment4, comment5]
  }
  //

  return (
    <View style={questionStyle.container} >
      <PublishnMy />
      <HotTopic />
      <View style={questionStyle.list} >
          <Comment {...data} />
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

