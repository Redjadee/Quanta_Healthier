import { useMemo, useState } from "react"
import { View, Text, StyleSheet, Image, Pressable } from "react-native"


function Tags() {
    let tags: string[] = ['熬夜','熬夜危害']
    const re = tags.map((item, index) => (
        <View key={`Tags${index}`} style={tagsStyle.tagBox} >
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

function LikeCommentShare() {
    const [iLike, setILike] = useState(false)


    let like: number = 111
    let comment: number = 222
    let share: number = 333

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
                //跳转详情页面
            };break;
            case 2:break;
        }
    }
    
    let re = LCSArrL.map((item, index) => (
        <Pressable onPress={() => {LCSEvent(index)}}  key={`LCS${index}`} style={[LCSSTyle.style, index+1 === 2 && LCSSTyle.style2, index+1 === 3 && LCSSTyle.style3]} >
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

function UploadedImg() {
    let postImg: (string | undefined )
    return (
        <>
            {/* {postImg ? <Image source={{ uri:postImg }} ></Image> : <></>} */}
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

//问答的组块
export default function Comment() {
    const usename: string = '用户名'
    const postTime: string = '一天前'
    const postContent: string = '孩子一直熬夜怎么办？'
    
    let profile: (string | undefined)
    const defaultProfile: string = '@/assets/images/comment/defaultImg.png'
    const postProfile = profile? { uri: profile } : require(defaultProfile)

    return (
        <View style={style.container} >
            <View style={style.header} >
                <Image source={postProfile} />
                <View style={style.headerBox} >
                    <Text style={style.username} >{usename}</Text>
                    <Text style={style.postTime} >{postTime}</Text>
                </View>
            </View>

            <Text style={style.postContent} >{postContent}</Text>
            <UploadedImg />
            <Tags />
            <LikeCommentShare />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'rgba(251, 247, 241, 0.5)',
        padding: 20,
        paddingLeft: 30,
        paddingTop: 25,
        paddingBottom: 15,

        shadowColor: '#FC9E19',
        shadowOffset: {
            width: 0,                // 水平偏移
            height: 2,               // 垂直偏移

        },
        shadowOpacity: 0.1,       // 透明度 (0~1)
        shadowRadius: 10,        // 模糊半径
        elevation: 3
    },
    header: {
        flexDirection: 'row',
        marginBottom: 8
    },
    profile: {
        
    },
    headerBox: {
        marginLeft: 5
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