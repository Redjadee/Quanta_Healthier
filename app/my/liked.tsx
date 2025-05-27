import { Text, View, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import MyHeader from "@/components/my/MyHeader"

function Item({ likeType }: { likeType: '评论' | '提问' | '文章' }  ) {
    const likedPerson = {
        username: '营销号1号', 
        profile: undefined
    }
    const postContent = {
        postContent: '我爱写APP',
        postTime: '30分钟前',
        uploadImage: require('@/assets/images/wife.png'),
    }
    const postProfile = likedPerson.profile? { uri: likedPerson.profile } : require('@/assets/images/comment/defaultImg.png')
    
    const choseLikeType = () => {
        switch (likeType) {
            case '评论': return (
                <View style={{
                    backgroundColor: 'rgba(255, 160, 25, 0.76)',
                    height: 22,
                    width: 4,
                    borderRadius: 10,
                    top: 2,
                    marginRight: 6
                }}></View>
            )
            case '提问': return (
                <Text style={{
                    fontSize: 22,
                    color: 'rgba(255, 160, 25, 1)',
                    fontWeight: '700',
                    marginRight: 6
                }}>:</Text>
            )
            case '文章': return (
                <></>
            )
        }
    }

    return (
        <View style={ItemStyle.container}>
            <Image source={postProfile} style={ItemStyle.profile} />
            <View>
                <Text style={ItemStyle.username}>{likedPerson.username}</Text>
                <View style={{
                    flexDirection: 'row',
                    gap: 5,
                    marginBottom: 5
                }}>
                    <Text style={ItemStyle.implication}>赞了你的{likeType}</Text>
                    <Text style={ItemStyle.implication}>{postContent.postTime}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    {choseLikeType()}
                    <Text style={ItemStyle.postContent}>{postContent.postContent}</Text>
                </View>
            </View>
            {postContent.uploadImage && <Image style={ItemStyle.uploadImg} source={postContent.uploadImage} />}
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
    uploadImg: {
        width: 60,
        height: 40,
        position: 'absolute',
        right: 30,
        top: 20
    }
})

export default function MyLiked() {
    return (
        <View style={{
            flex: 1,
            backgroundColor: "white",
        }}>
            <MyHeader index={0} />
            <View style={{flex: 3}}>
                <ScrollView>
                    <Item likeType="评论" />
                    <Item likeType="提问" />
                </ScrollView>
            </View>
        </View>
    )
}