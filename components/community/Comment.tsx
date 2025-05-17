import { useEffect, useMemo, useState } from "react"
import { View, Text, StyleSheet, Image, Pressable } from "react-native"
import { router } from 'expo-router'
import { useCommentStore } from "@/src/store/commentStore"
import type { CommentType } from "@/src/types/commentType"
import { useShare } from "@/src/context/ShareContext"
import { userProfileStore } from "@/src/store/userProfileStore"

function Tags( { tags }: CommentType ) {
    if (!tags) return
    const re = tags.map((item, index) => (
        <Pressable key={`Tags${index}`} style={tagsStyle.tagBox} >
            <Text style={tagsStyle.tag} >{`#${item}`}</Text>
        </Pressable>
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
        gap: 15
    },
    tagBox: {
        backgroundColor: 'rgba(204, 204, 204, 0.4)',
        borderRadius: 15,
        paddingVertical: 5,
        paddingTop: 3,
        paddingInline: 10
    },
    tag: {
        color: '#888888',
        fontSize: 12,
    }
})

interface LCSEventType {
    HandleCommentRouter:() => void
    setShare: React.Dispatch<React.SetStateAction<boolean>>
    liked: boolean
}

function LikeCommentShare({ like, comment, share, HandleCommentRouter, setShare, liked }: CommentType & LCSEventType) {
    const [iLike, setILike] = useState(false);

    // ✅ 安全初始化
    useEffect(() => {
        if (liked) setILike(true);
    }, [liked]);

    // ✅ 缓存图标数组
    const LCSArrL = useMemo(() => [
        iLike ? require('@/assets/images/comment/liked.png') : require('@/assets/images/comment/like.png'),
        require('@/assets/images/comment/comment.png'),
        require('@/assets/images/comment/share.png')
    ], [iLike]);

    // ✅ 安全更新状态
    const LCSEvent = (index: number) => {
        switch (index) {
            case 0: setILike(prev => !prev); break;
            case 1: HandleCommentRouter(); break;
            case 2: setShare(true); break;
        }
    };

    return (
        <View style={LCSSTyle.container}>
            {LCSArrL.map((item, index) => (
                <Pressable 
                    onPress={() => LCSEvent(index)} 
                    key={`LCS${index}`} 
                    style={[
                        LCSSTyle.style, 
                        index === 1 && LCSSTyle.style2, 
                        index === 2 && LCSSTyle.style3
                    ]}
                >
                    <Image source={item} />
                    <Text style={LCSSTyle.number}>{[like, comment, share][index]}</Text>
                </Pressable>
            ))}
        </View>
    );
}


const LCSSTyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
    },
    style: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },
    style2: {
        marginLeft: 10
    },
    style3: {
        position: 'absolute',
        right: 40
    },
    number: {
        color: '#666666'
    }
})

function UploadedImg({ uploadImage }: CommentType) {
    //获取string数组，做成可左右滑动的样式

    return (
        <>
            {/* {uploadImage ?  : <></>} */}
            <Image source={require('@/assets/images/wife.png')}  style={uploadImgStyle.style} ></Image>
        </>
    )
}

const uploadImgStyle = StyleSheet.create({
    style: {
        width: 150,
        height: 100,
        marginBottom: 10
    }  
})

function Header( data: CommentType ) {
    const { setCurrentUser } = userProfileStore()
    const HandleUserRouter = () => {
        setCurrentUser(data)
        router.push({ pathname: '/userProfile/[id]', params: {id: String(data.id)} })
    }

    const postProfile = data?.profile? { uri: data.profile } : require('@/assets/images/comment/defaultImg.png')

    return (
        <Pressable style={style.header} onPress={HandleUserRouter}>
                <Image source={postProfile} style={{width: 38, height: 38}}/>
                <View style={style.headerBox} >
                    <Text style={style.username} >{data.username}</Text>
                    <Text style={style.postTime} >{data.postTime}</Text>
                </View>
        </Pressable>
    )
}

//问答的组块
export default function Comment( { data, headerhide = false, isUserProfile = false, liked = false }: { data: CommentType; headerhide?: boolean, isUserProfile?: boolean, liked?: boolean } ) {
    const { setCurrentComment } = useCommentStore()
    const { setShare } = useShare()

    const HandleCommentRouter = () => {
        setCurrentComment(data)
        router.push({ pathname: "/comment/[id]", params: { id: String(data.id) } })
    }

    const shadowStyle = {
        shadowColor: '#FC9E19',
        shadowOffset: {
            width: 0,                // 水平偏移
            height: -5,               // 垂直偏移
        },
        shadowOpacity: 0.1,       // 透明度 (0~1)
        shadowRadius: 10,        // 模糊半径
        elevation: 3,
        
        backgroundColor: 'rgba(251, 247, 241, 0.5)',
        paddingTop: 25,
    }
    const fakeShadowStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        paddingTop: 15,
        
        borderTopColor: 'rgba(230, 229, 227, 0.3)',
        borderTopWidth: 3,
        borderBottomColor: 'rgba(230, 229, 227, 0.3)',
        borderBottomWidth: 3
    }

    return (
        <Pressable style={[style.container,
            isUserProfile? fakeShadowStyle : shadowStyle
        ]} 
            onPress={HandleCommentRouter} >
            {headerhide || <Header {...data} />}
            <Text style={style.postContent} >{data.postContent}</Text>
            <UploadedImg {...data} />
            <Tags {...data} />
            <LikeCommentShare {...{ ...data, HandleCommentRouter, setShare, liked }} />
        </Pressable>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
        paddingLeft: 30,
        paddingBottom: 15,
    },
    header: {
        flexDirection: 'row',
        marginBottom: 5,
        width: '50%'
    },
    profile: {
        height: 38,
        width: 38,
        borderRadius: '50%'
    },
    headerBox: {
        marginLeft: 7,
        gap: 3
    },
    username: {
        color: '#555555',
        fontSize: 16,
        fontWeight: '400'
    },
    postTime: {
        color: '#888888',
        fontSize: 12,
    },
    postContent: {
        color: '#555555',
        fontSize: 18,
        marginBottom: 8,
    }
})