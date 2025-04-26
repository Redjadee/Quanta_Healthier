import { Text, View, StyleSheet, Image, Pressable } from 'react-native'
import { useState, useMemo } from 'react'


function LikeCommentShare() {
    const [iLike, setILike] = useState(false)

    //获取
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
        marginTop: 10,
        alignItems: 'center',
        gap: 25
    },
    style: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center'
    },
    number: {
        color: '#999999'
    }
})

function UploadedImg() {
    //获取
    
    let postImg: (string | undefined )
    return (
        <>
            {postImg ? <Image source={{ uri:postImg }} ></Image> : <></>}
            {/* <Image source={require('@/assets/images/wife.png')}  style={uploadImgStyle.style} ></Image> */}
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
export default function Article() {
    //获取！
    const username: string = '用户名'
    const postContent: string = '孩子一直熬夜怎么办？'
    
    let profile: (string | undefined)
    const defaultProfile: string = '@/assets/images/comment/defaultImg.png'
    const postProfile = profile? { uri: profile } : require(defaultProfile)

    return (
        <View style={style.container} >
            <View style={style.header} >
                <Image source={postProfile} />
                <Text style={style.username} >{username}</Text>
            </View>

            <Text style={style.postContent} >{postContent}</Text>
            <UploadedImg />
            <LikeCommentShare />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        padding: 20,
        paddingLeft: 30,
        paddingBottom: 10,

        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'rgba(252, 158, 25, 0.05)',
    },
    header: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center'
    },
    profile: {
        height: 38,
        width: 38,
        borderRadius: '50%'
    },
    username: {
        marginLeft: 10,
        color: '#555555',
        fontSize: 19,
        fontWeight: '400'
    },
    postContent: {
        color: '#555555',
        fontSize: 18,
        marginBottom: 8,
    }
})

