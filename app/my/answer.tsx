import { Text, View, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import MyHeader from "@/components/my/MyHeader"
import { useMemo, useState } from "react"
import { likeU, profileU } from "@/src/utils/commentUtils"

interface itemType {
    postContent?: string,
    postTime?: string,
    like?: number
    profile?: string | undefined 
}
function Item({ postContent, postTime, like, profile}: itemType) {
    const [ liked, setLiked ] = useState(false)
    like = 12 //
    const [ likenum, setLikenum ] = useState(like)
    const likeIcon = useMemo(() => likeU(liked), [liked])
    
    const Myusername = '今晚一定不熬夜'
    const Myprofile = useMemo(() => profileU(profile), [profile])

    postContent = '我真的好爱写APP'
    postTime = '刚刚'

    return (
        <Pressable style={ItemStyle.container}>
            <Image source={Myprofile} style={ItemStyle.profile} />
            <View>
                <Text style={ItemStyle.username} >{Myusername}</Text>
                <Text style={ItemStyle.postTime} >{postTime}</Text>
                <Text style={ItemStyle.postContent} >{postContent}</Text>

                <Pressable 
                style={{
                    flexDirection: 'row',
                    gap: 3,
                    alignItems: "center"
                }}
                onPress={() => {setLiked(liked => !liked); setLikenum(!liked ? likenum => likenum +1 : likenum => likenum -1)}}>
                    <Image source={likeIcon} style={{position: "absolute"}} />
                    <Text style={ItemStyle.likeNum} >{likenum}</Text>
                </Pressable>
            </View>
        </Pressable>
    )
}

const ItemStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
        paddingLeft: 30,
        paddingBottom: 20,
        borderBottomColor: '#999999',
        borderBottomWidth: 0.6,
        gap: 3
    },
    profile: {
        width: 38,
        height: 38,
        borderRadius: 38/2,
    },
    username: {
        color: '#666666',
        fontSize: 18
    },
    postTime: {
        color: '#666666',
        fontSize: 12
    },
    postContent: {
        color: '#666666',
        fontSize: 18,
        marginVertical: 8
    },
    likeNum: {
        fontSize: 14,
        marginLeft: 26
    }
})

export default function MyAnswer() {
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <MyHeader index={5} />
            <View style={{flex: 3}}>
                <ScrollView>
                    <Item />
                </ScrollView>
            </View>
        </View>
    )
}