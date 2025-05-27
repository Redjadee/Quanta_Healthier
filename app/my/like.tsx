import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import MyHeader from "@/components/my/MyHeader"
import Article from "@/components/community/Article"
import Comment from "@/components/community/Comment"

export default function Liked() {
    let data = {
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
    
        commentComment: []
        }
    
    return (
        <View style={{flex: 1, backgroundColor: '#FAFAFA'}}>
            <MyHeader index={3} noBorder={true} isMyLikePage={true} />
            <View style={{flex: 3, gap: 15}}>
                <Article />
                <Comment data={data} />
            </View>
        </View>
    )
}