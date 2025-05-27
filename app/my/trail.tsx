import { Text, View, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import MyHeader from "@/components/my/MyHeader"
import CommunityTab from "@/components/community/CommunityTab"
import Comment from "@/components/community/Comment"
import Article from "@/components/community/Article"
import { useState } from "react"
import { CommentType, commentCommentType } from "@/src/types/commentType";

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

    let data2: CommentType = {
    id: '00129',
    username: '健康生活家',
    profile: undefined,

    postContent: '保持微笑，健康常在！',
    postTime: '5小时前',
    postIp: '广州',

    like: 80,
    comment: 150,
    share: 200,
    tags: ['微笑', '健康心态'],

    commentComment: []
    };

    let data3: CommentType = {
    id: '00130',
    username: '健康饮食者',
    profile: undefined,

    postContent: '多吃蔬菜，少吃油炸食品！',
    postTime: '6小时前',
    postIp: '武汉',

    like: 95,
    comment: 120,
    share: 180,
    tags: ['饮食健康', '健康生活'],

    commentComment: []
    };

    let data4: CommentType = {
    id: '00131',
    username: '瑜伽爱好者',
    profile: undefined,

    postContent: '每天练瑜伽，身心更健康！',
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
        <View style={{ width: '100%', gap: 15 }} >
            <Comment data={data} fakeShadow={true} isTrailPage={true} />
            <Comment data={data2} fakeShadow={true} isTrailPage={true} />
            <Comment data={data3} fakeShadow={true} isTrailPage={true} />
            <Comment data={data4} fakeShadow={true} isTrailPage={true} />
        </View>
    )
}

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

export default function Trail() {
    const [showLeft, setShowLeft] = useState(true)
    const changeShow = (index: number) => {
        if(index === 0) setShowLeft(true) 
        else setShowLeft(false)
    }
    
    return (
        <View style={{flex: 1, backgroundColor: '#FDFDFD'}}>
            <MyHeader index={2} noBorder={true} />
            <CommunityTab changeShow={changeShow} isTrailPage={true} />
            <View style={{width: '100%', flex: 3}} >
                <ScrollView>
                    {showLeft ? <Question /> : <Articles />}
                </ScrollView>
            </View>
        </View>
    )
}