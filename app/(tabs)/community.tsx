import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TextInput, View, StyleSheet, Pressable, Image, ScrollView, Alert } from "react-native";
import CommunityTab from "@/components/community/CommunityTab"
import PublishnMy from "@/components/community/PublishnMy"
import HotTopic from "@/components/community/HotTopic"
import Article from "@/components/community/Article"
import Comment from "@/components/community/Comment"
import { CommentType, commentCommentType } from "@/src/types/commentType"
import Share from "@/components/community/Share"
import { getAllComments } from "@/src/services/comment/getComment"

function Question() {
  const [commentList, setCommentList] = useState<CommentType[]>([])
  const [loading, setloading] = useState(false)
  const [error, setError] = useState('')
  
  useEffect(() => {
    const fetchComments = async () => {
      setloading(true)
      const result = await getAllComments()
      if(result.success) {
        setCommentList(result.data)
      } else {
        setError(result.message ?? '')
        // Alert.alert('获取评论失败, 请稍后再试') //跳信息有点烦
      }
    }
    fetchComments()
  }, [])

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

  let data: CommentType = {
    id: '00123',
    username: '今晚一定睡',
    profile: undefined,

    postTitle: '还是明天再睡吧',
    postTime: '刚刚',
    postIp: '广东',

    like: 111,
    comment: 222,
    share: 333,
    tags: ['熬夜', '熬夜危害'],

    commentComment: [comment1, comment2, comment3, comment4, comment5]
  }

  let data2: CommentType = {
    id: '00129',
    username: '健康生活家',
    profile: undefined,

    postTitle: '保持微笑，健康常在！',
    postTime: '5小时前',
    postIp: '广州',

    like: 80,
    comment: 150,
    share: 200,
    tags: ['微笑', '健康心态'],

    commentComment: []
  };


  let data4: CommentType = {
    id: '00131',
    username: '瑜伽爱好者',
    profile: undefined,

    postTitle: '每天练瑜伽，身心更健康！',
    postTime: '7小时前',
    postIp: '成都',

    like: 70,
    comment: 100,
    share: 150,
    tags: ['瑜伽', '健康运动'],

    commentComment: []
  };
  //

  return (
    <View style={questionStyle.container} >
      <PublishnMy />
      <HotTopic />
      <View style={questionStyle.list} >
        <Comment data={data} />
        <Comment data={data2} />
        <Comment data={data4} />
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
  
  const blurBox = { backgroundColor: 'rgba(204, 204, 204, 0.6)' } //改
  return (
    <LinearGradient colors={['rgba(254, 232, 201, 1)', 'rgba(254, 232, 201, 0.27)','rgba(254, 232, 201, 0)']} style={[style.container]}>{/* , share && blurBox */}
      <View style={style.header}>
        <View style={style.searchArea}>
        <Image source={require('@/assets/images/community/searchIcon.png')}  style={{marginInline: 10}} />
        <TextInput style={{width: '80%'}}></TextInput>
        </View>
        <Pressable>
          <Text style={style.searchLabel}>搜索</Text>
        </Pressable>
      </View>
      
      <View style={{flex: 10, width: '100%'}} >
      <ScrollView>
        <CommunityTab changeShow={changeshow} />
        {showLeft ? <Question /> : <Articles />}
      </ScrollView>
      </View>
      <Share />
    </LinearGradient>
  )
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