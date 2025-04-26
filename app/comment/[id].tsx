import { View, Text, StyleSheet, Image, Pressable, TextInput } from "react-native"
import { useState, useMemo } from "react"
import { Link, useLocalSearchParams } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import type { CommentType } from "@/src/types/commentType"
import { useCommentStore } from "@/src/store/commentStore"
////////////////////////////
function UploadedImg({ uploadImage }: CommentType) {
    //获取数组
    
    
    return (
        <>
            {/* { ? <Image source={{ uri: }} ></Image> : <></>} */}
            {/* <Image source={require('@/assets/images/wife.png')}  style={uploadImgStyle.style} ></Image> */}
        </>
    )
}
const uploadImgStyle = StyleSheet.create({
    style: {
        width: '100%',
        height: 250
        
    }
})

////////////////////////////
function Tags({ tags }: CommentType) {
    //获取
    
    tags = ['熬夜','熬夜危害']
    const re = tags.map((item, index) => (
        <View key={`Tags${index}`}>
            <Text style={tagsStyle.tag} >{`#${item}`}</Text>
        </View>
    ))
    return (
        <View style={tagsStyle.container} >
            {re}
        </View>
    )
}

const tagsStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 7
    },
    tag: {
        color: '#255EA8',
        fontSize: 16,
        fontWeight: '400'
    }
})
////////////////////////////
function Comment( data: CommentType ) {
    const [iLike, setILike] = useState(false)

    //准备删
    data.username= '用户名'
    data.postTime = '一天前'
    data.postIp = '广东'
    data.postContent = '好美的孩子 偷走'
    data.like = 111
    //

    const postProfile = data.profile? { uri: data.profile } : require('@/assets/images/comment/defaultImg.png')
    

    let likeIcon = useMemo(() => {
        return iLike? require('@/assets/images/comment/liked.png') : require('@/assets/images/comment/like.png')
    },[iLike])

    return (
        <View>
            <Image source={postProfile}></Image>
            <View>
                <Text>{data.username}</Text>
                <View>
                    <Text>{data.postContent}</Text>
                    <Pressable><Text>回复</Text></Pressable>
                </View>
                <View>
                    <Text>{data.postTime}</Text>
                    <Text>{data.postIp}</Text>
                </View>
            </View>
            <View>
                <Image source={likeIcon}></Image>
                <Text>{data.like}</Text>
            </View>
        </View>
    )
}

const commentStyle = StyleSheet.create({
    container: {

    },
    
    body: {

    }
})

////////////////////////////
function LikeCommentShare({ like, comment, share}: CommentType) {
    const [iLike, setILike] = useState(false)

    //准备删
    like = 111
    comment = 222
    share = 333
    //

    let LCSArrR: number[] = [like, comment, share]


    
    let likeIcon = useMemo(() => {
        return iLike? require('@/assets/images/comment/liked.png') : require('@/assets/images/comment/like.png')
    },[iLike])

    let LCSArrL = [likeIcon, require('@/assets/images/comment/comment.png'), require('@/assets/images/comment/share.png')]
    
    const LCSEvent = (index: number) => {
        switch (index) {
            case 0: {
                setILike(!iLike)
            };break;
            case 1:{
                //第三重回复
            };break;
            case 2:{
                //显示分享盒子
            }break;
        }
    }
    
    let re = LCSArrL.map((item, index) => (
        <Pressable onPress={() => {LCSEvent(index)}}  key={`LCS${index}`} style={[LCSSTyle.style]} >
            <Image source={item}></Image>
            <Text style={LCSSTyle.number} >{LCSArrR[index]}</Text>
        </Pressable>
    ))

    return (
        <View style={LCSSTyle.container}>
        {re}
        </View>
    )
}

const LCSSTyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    style: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center'
    },
    number: {
        color: '#666666'
    },
})



export default function CommentDetail() {
    const { id } = useLocalSearchParams<{id: string}>()
    const { cache } = useCommentStore()

    const data = cache[id]

    const postProfile = data.profile? { uri: data.profile } : require('@/assets/images/comment/defaultImg.png')
    
    const commentList = data.commentComment.map((item, index) => (
        <Comment {...item} key={`C${id}C${index}`} />
    ))
    
    return (
        <View style={style.container} >
            <View style={style.header} >
                <Link href={'/community'}>
                <Image source={require('@/assets/images/leftArrow.png')}></Image>
                </Link>
                <Image source={postProfile} style={headerStyle.postProfile}></Image>
                <Text style={headerStyle.username} >{data.username}</Text>
            </View>
            <UploadedImg {...data} />
            <View style={style.body} >
                <Text style={bodyStyle.postContent} >{data.postContent}</Text>
                <Tags {...data} />
                <View style={bodyStyle.bodyFooter} >
                    <Text style={{color: '#888888', fontSize: 12}} >{data.postTime}</Text>
                    <Text style={{color: '#888888', fontSize: 12}}>{data.postIp}</Text>
                </View>
            </View>
            
            <Pressable style={aiStyle.container} >
            <LinearGradient  style={{height: 90, borderRadius: 18}} colors={['rgba(22, 217, 227, 0.6)', 'rgba(48, 199, 236, 0.6)','rgba(70, 174, 247, 0.7)']} start={{x:0, y:0}} end={{x:1, y:0}} >
                <Text style={aiStyle.text} >AI回复</Text>
            </LinearGradient>
            </Pressable>
            
            <View style={style.commentContainer} >
                <Text style={{color: '#666666', fontSize: 16}} >评论留言</Text>
                {commentList}
            </View>
            
            <View style={style.tab}>
                <View style={tabStyle.inputContainer} >
                    <Image source={require('@/assets/images/commentDetail/writeSth.png')} ></Image>
                    <TextInput style={tabStyle.input} ></TextInput>
                </View>
                <LikeCommentShare {...data} />
            </View>
        </View>
    )
} 

const tabStyle = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(153, 153, 153, 0.18)',
        borderRadius: 18,
        paddingLeft: 15,
        gap: 5
    },
    input: {
        width: 140,
    }
})

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 13,
        paddingVertical: 10,
        paddingLeft: 15
    },
    body: {
        padding: 10,
        gap: 6,
        borderBottomWidth: 0.8,
        borderBottomColor: 'rgba(153, 153, 153, 0.68)'
    },
    commentContainer: {
        marginInline: 20
    },
    tab: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        borderTopColor: 'rgba(153, 153, 153, 0.53)',
        borderTopWidth: 0.8,
        padding: 10,
        paddingInline: 25,
        gap: 10,
        alignItems: 'center'
    }
})

const headerStyle = StyleSheet.create({
    username: {
        fontSize: 20,
        color: '#666666'
    },
    postProfile: {
        width: 48,
        height: 48,
    },
})

const bodyStyle = StyleSheet.create({
    postContent: {
        fontSize: 20,
        color: '#555555'
    },
    bodyFooter: {
        flexDirection: 'row',
        gap: 10
    },
})

const aiStyle = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginInline: 15,
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: '500',
        position: 'absolute',
        right: 35,
        top: 20,
        textShadowColor:'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {
            width: 2,                // 水平偏移
            height: 4,               // 垂直偏移

        },
        textShadowRadius: 10,        // 模糊半径
    },

})