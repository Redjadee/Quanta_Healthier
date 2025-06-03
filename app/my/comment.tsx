import { Text, View, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import MyHeader from "@/components/my/MyHeader"
import { useMemo, useState } from "react"
import { likeU, profileU } from "@/src/utils/commentUtils"

function LikenComment() {
    const [ liked, setLiked ] = useState(false)
    const [ likenum, setLikenum ] = useState(0)
    
    const likeLabel = useMemo(() => {
        return likenum === 0 ? '点赞' : likenum
    }, [likenum])
    const label = [likeLabel, '回复']
    
    const likeIcon = useMemo(() => likeU(liked), [liked])
    const icon = [likeIcon, require('@/assets/images/My/comment/comment.png')]
    
    function LCEvent(index: number) {
        if (index === 0 ) {
            setLikenum(!liked ? likenum => likenum +1 : likenum => likenum -1)
            setLiked(liked => !liked)
        } else {
            
        }
    }
    
    return (
        <View style={LCSTyle.container}>
            {label.map((value, index) => (
                <Pressable 
                key={`CommenttoMy${index}`} 
                style={LCSTyle.itemBox}
                onPress={() => LCEvent(index)}>
                    <Image source={icon[index]} style={LCSTyle.icon} />
                    <Text style={LCSTyle.label} >{value}</Text>
                </Pressable>
            ))}
        </View>
    )
}

const LCSTyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 15,
        marginTop: 10
    },
    itemBox: {
        backgroundColor: 'rgba(204, 204, 204, 0.3)',
        borderRadius: 15,
        paddingVertical: 7,
        paddingInline: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    icon: {
        top: 1
    },
    label: {
        color: '#888888',
        fontSize: 12,
    }
})

function Item() {
    const commentedPerson = {
        username: '营销号1号', 
        profile: undefined,
        postContent: '能写完的兄弟',
        postTime: '一天前'
    }

    const postProfile = useMemo(() => profileU(commentedPerson.profile), [commentedPerson.profile])
    
    return (
    <View style={ItemStyle.container}>
        <Image source={postProfile} style={ItemStyle.profile} />
        <View>
            <Text style={ItemStyle.username}>{commentedPerson.username}</Text>
            <View style={{
                marginBottom: 8
            }}>
                <Text style={ItemStyle.implication}>{commentedPerson.postTime}</Text>
            </View>
            <View>
                <Text style={ItemStyle.postContent}>{commentedPerson.postContent}</Text>
            </View>
            <LikenComment />
        </View>
    </View>
    )
}

const ItemStyle = StyleSheet.create({
    container: {
        width: '100%',
        borderBottomColor: '#999999',
        borderBottomWidth: 0.6,
        flexDirection: 'row',
        padding: 15,
        paddingLeft: 30
    },
    profile: {
        width: 38,
        height: 38,
        borderColor: '#999999',
        borderWidth: 0.2,
        borderRadius: 38/2,
        marginRight: 5
    },
    username: {
        fontSize: 18,
        color: '#666666',
    },
    implication: {
        fontSize: 12,
        color: '#666666',
    },
    postContent: {
        fontSize: 18,
        color: '#666666'
    },
})

export default function MyComment() {
    return (
        <View style={{
            flex: 1,
            backgroundColor: "white",
        }}>
            <MyHeader index={1} />
            <View style={{flex: 3}} >
                <ScrollView>
                    <Item />
                    <Item />
                </ScrollView>
            </View>
        </View>
    )
}