import { View, Text, StyleSheet, Image, Pressable, TextInput, Keyboard, ScrollView, TouchableWithoutFeedback } from "react-native"
import { useState, useMemo, useRef, useCallback } from "react"
import { useLocalSearchParams, router } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import type { CommentType, commentCommentType } from "@/src/types/commentType"
import { useCommentStore } from "@/src/store/commentStore"
import { useShare } from "@/src/context/ShareContext"
import { userProfileStore } from "@/src/store/userProfileStore"
import { likeU, profileU } from "@/src/utils/commentUtils"
////////////////////////////
function UploadedImg({ uploadImage }: CommentType) {  
    return (
        <>
            {/* { ? <Image source={{ uri: }} ></Image> : <></>} */}
            <Image source={require('@/assets/images/wife.png')}  style={uploadImgStyle.style} ></Image>
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
    if ( !tags ) return
    return (
        <View style={tagsStyle.container} >
        {tags && tags.map((item, index) => (
            <Pressable key={`Tags${index}`}>
                <Text style={tagsStyle.tag} >{`#${item}`}</Text>
            </Pressable>
        ))}
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
interface handleResponseType {
    handleResponse: (username: string) => void
}
function Comment( { username, profile, postContent, postTime, postIp, like, id, handleResponse }: commentCommentType & handleResponseType) {
    const [iLike, setILike] = useState(false)
    const [likenum, setLikenum] = useState(like)

    const postProfile = profile? { uri: profile } : require('@/assets/images/comment/defaultImg.png')

    let likeIcon = useMemo(() => likeU(iLike), [iLike])

    const userData = { id, username, profile}
    const { setCurrentUser } = userProfileStore()
    const HandleUserRouter = () => {
        setCurrentUser(userData)
        router.push({ pathname: '/userProfile/[id]', params: {id: String(userData.id)} })
    }

    return (
        <View style={{ flexDirection: 'row', marginBottom: 15}} >
            <Pressable style={{
                height: 30
            }}
            onPress={HandleUserRouter}
            >
            <Image source={postProfile} style={{height: 30, width: 30, marginRight: 8}} ></Image>
            </Pressable>
            <View style={{gap: 5}}>
                <Pressable style={{
                    width: 130
                }}
                onPress={HandleUserRouter}
                >
                    <Text style={{color: '#666666', fontSize: 16}} >{username}</Text>
                </Pressable>
                <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }} >
                    <Text style={{color: '#666666', fontSize: 16}}>{postContent}</Text>
                    <Pressable onPress={() => {handleResponse(username)}}><Text style={{color: '#777777', fontSize: 12}} >回复</Text></Pressable>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Text style={{color: '#888888', fontSize: 12}}>{postTime}</Text>
                    <Text style={{color: '#888888', fontSize: 12}}>{postIp}</Text>
                </View>
            </View>
            <View style={{position: 'absolute', right: 20, top: 25, alignItems: 'center'}}>
                <Pressable onPress={()=> {setILike(!iLike); setLikenum(!iLike ? likenum => likenum +1 : likenum => likenum -1)}}><Image source={likeIcon}></Image></Pressable>
                <Text>{likenum}</Text>
            </View>
        </View>
    )
}

////////////////////////////
interface postCommentType {
    postComment: () => void
}

function LikeCommentShare({ like, comment, share, postComment}: CommentType & postCommentType) {
    const [iLike, setILike] = useState(false)
    const { setShare } = useShare()
    const [likenum, setLikenum] = useState(like ?? 0)

    let LCSArrR: number[] = [likenum, comment ?? 0, share ?? 0]
    
    let likeIcon = useMemo(() => likeU(iLike),[iLike])

    let LCSArrL = [likeIcon, require('@/assets/images/comment/comment.png'), require('@/assets/images/comment/share.png')]
    
    const LCSEvent = (index: number) => {
        switch (index) {
            case 0: {
                setILike(!iLike)
                setLikenum(!iLike ? likenum => likenum +1 : likenum => likenum -1)
            };break;
            case 1:{
                postComment()
            };break;
            case 2:{
                setShare(true)
            }break;
        }
    }

    return (
        <View style={LCSSTyle.container}>
        {LCSArrL.map((item, index) => (
        <Pressable 
        onPress={() => {LCSEvent(index)}}  
        key={`LCS${index}`} 
        style={[LCSSTyle.item, 
            index === 1 && {left: 60,}, 
            index === 2 && {left: 120}]} 
        >    
            <Image source={item}></Image>
            <Text style={LCSSTyle.number} >{LCSArrR[index]}</Text>
        </Pressable>
        ))}
        </View>
    )
}

const LCSSTyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        position: 'absolute'
    },
    number: {
        color: '#666666'
    },
})



export default function CommentDetail() {
    const { id } = useLocalSearchParams<{id: string}>()
    const { cache } = useCommentStore()
    const data = cache[id]
    const postProfile = useMemo(() => profileU(data.profile), [data.profile])
    
    const inputRef = useRef<TextInput>(null)
    //发布评论
    const [pCVisible, setpCVisible] = useState(false)
    const postComment = () => {
        setpCVisible(true)
        setTimeout(() => {
            inputRef.current?.focus()
        }, 10)
    }
    const submitComment = () => {
        setpCVisible(false)
        inputRef.current?.blur()
    }
    //placeholder
    const [placeHolder, setPlaceHolder] = useState('发布一条友善的评论吧~')

    //评论的评论
    const handleResponse = useCallback((username: string) => {
        postComment()
        setPlaceHolder(`回复@${username}: `)
    }, [])
    const handleBlur = useCallback(() => {
        setPlaceHolder('发布一条友善的评论吧~') //恢复默认
    }, [])

    //渲染评论
    const commentList = useMemo(() => {
        if(data.commentComment)
        return data.commentComment.map((item, index) => (
            <Comment {...{...item, handleResponse, handleBlur}} key={`C${id}C${index}`} />
        ))
    },[data.commentComment])

    //个人主页
    const userData = { id: data.id, username: data.username, profile: data.profile }
    const { setCurrentUser } = userProfileStore()
    const HandleUserRouter = () => {
        setCurrentUser(userData)
        router.push({ pathname: '/userProfile/[id]', params: {id: String(userData.id)} })
    }
    
    return (
    <TouchableWithoutFeedback 
        onPress={() => {
            Keyboard.dismiss()
            inputRef.current?.blur()
            setpCVisible(false)
        }}>
        <View style={style.container} >
            <View style={style.header} >
                <Pressable onPress={() => router.back()}>
                <Image source={require('@/assets/images/leftArrow.png')}></Image>
                </Pressable>
                <Pressable style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                }}
                onPress={HandleUserRouter}
                >
                    <Image source={postProfile} style={headerStyle.postProfile}></Image>
                    <Text style={headerStyle.username} >{data.username}</Text>
                </Pressable>
            </View>

            <ScrollView>
            <UploadedImg {...data} />
            <View style={style.body} >
                <Text style={bodyStyle.postTitle} >{data.postTitle}</Text>
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
                <Text style={{color: '#666666', fontSize: 16, marginBottom: 15}} >评论留言</Text>
                {commentList}
            </View>
            </ScrollView>
            
            <View style={style.tab}>
                <Pressable style={[tabStyle.inputContainer, pCVisible && {width: '80%'}]} onPress={(e) => { e.stopPropagation(), postComment()}} >
                    {!pCVisible && <Image style={{position: 'absolute', left: 15}}  source={require('@/assets/images/commentDetail/writeSth.png')} ></Image>}
                    {!pCVisible ? <View></View> : <TextInput style={{width: '100%'}} ref={inputRef}  placeholder={placeHolder} onEndEditing={() => {handleBlur()}}></TextInput> }
                </Pressable>
                {!pCVisible && <LikeCommentShare {...{ ...data, postComment}} />}
                {pCVisible && <Pressable onPress={(e) => {e.stopPropagation(), submitComment()}}><Text style={{fontSize: 17, color: '#888888', fontWeight: '500'}}>发送</Text></Pressable> }
            </View>
        </View>
    </TouchableWithoutFeedback>
    )
} 

const tabStyle = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(153, 153, 153, 0.18)',
        borderRadius: 18,
        paddingLeft: 10,
        width: 170,
        height: 40,
    }
})

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        overflow: 'hidden'
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
        marginInline: 20,
        marginBottom: 80
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
        gap: 15,
        alignItems: 'center',
        backgroundColor: 'white'
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
        borderRadius: 48/2,
    },
})

const bodyStyle = StyleSheet.create({
    postTitle: {
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