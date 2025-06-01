import { View, ScrollView } from "react-native";
import MyHeader from "@/components/my/MyHeader"
import Article from "@/components/community/Article"
import Comment from "@/components/community/Comment"
import CommunityTab from "@/components/community/CommunityTab";
import { useState } from "react"

function Question () {
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
        <View style={{ width: '100%', gap: 15 }} >
            <Comment data={data} liked={true} fakeShadow={true} />
        </View>
    )
}

function Articles () {
    return (
        <View style={{
            width: '100%',
            alignItems: 'center'
        }} >
                <View style={{gap: 15, width: '90%', marginTop: 10}} >
                <Article proShadow={true} liked={true} />
                </View>
            </View>
    )
}

export default function Liked() {
    const [showLeft, setShowLeft] = useState(true)
    const changeShow = (index: number) => {
        if(index === 0) setShowLeft(true) 
        else setShowLeft(false)
    }

    return (
        <View style={{flex: 1, backgroundColor: '#FAFAFA'}}>
            <MyHeader index={3} noBorder={true} />
            <CommunityTab changeShow={changeShow} isTrailPage={true} />
            <View style={{width: '100%', flex: 3}} >
                <ScrollView>
                    {showLeft ? <Question /> : <Articles />}
                </ScrollView>
            </View>
        </View>
    )
}