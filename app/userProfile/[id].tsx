import { View, Text, StyleSheet, Image, Pressable, TextInput, Keyboard, ScrollView, TouchableWithoutFeedback, ImageBackground } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { userProfileStore } from "@/src/store/userProfileStore"
import Comment from "@/components/community/Comment"
import { useMemo, useState, useEffect } from "react"
import { CommentType } from "@/src/types/commentType"

interface NavigatorType {
    handleShow: (bool: boolean) => void;
}

function Navigator({ handleShow }: NavigatorType) {
    const [active, setActive] = useState(true);
    
    // 用useEffect处理副作用
    useEffect(() => {
        handleShow(active);
    }, [active, handleShow]);

    const label = ['问题', '喜欢'];
    
    return (
        <View style={Nstyle.container}>
            {label.map((value, index) => (
                <Pressable 
                    style={Nstyle.item} 
                    key={`userProfileNavigator${index}`}
                    onPress={() => setActive(index === 0)}
                >
                    <Text style={active === (index === 0) ? Nstyle.labelActive : Nstyle.label}>
                        {value}
                    </Text>
                    {active === (index === 0) && <View style={Nstyle.underline} />}
                </Pressable>
            ))}
        </View>
    );
}


const Nstyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingLeft: 30,
        paddingBottom: 15,
        gap: 30,
        borderBottomColor: 'rgba(153, 153, 153, 0.2)',
        borderBottomWidth: 0.6
    },
    item: {
        alignItems: 'center',
        gap: 3
    },
    label: {
        fontSize: 18,
        color: '#888888'
    },
    labelActive: {
        fontSize: 19,
        color: '#555555'
    },
    underline: {
        width: 50,
        height: 5,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 160, 25, 0.76)'
    }
})

function Problem() {
    let data: CommentType[] = [
        {
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
      },
      {
        id: '00123',
        username: '今晚一定睡',
        profile: undefined,
    
        postContent: 'APP怎么这么难写',
        postTime: '刚刚',
        postIp: '广东',
    
        like: 22,
        comment: 12,
        share: 33,
        tags: ['APP'],
    
        commentComment: []
      },
      {
        id: '00124',
        username: '今晚一定睡',
        profile: undefined,
    
        postContent: 'APP这么难写',
        postTime: '刚刚',
        postIp: '广东',
    
        like: 22,
        comment: 12,
        share: 33,
        tags: ['APP'],
    
        commentComment: []
      },
    ]
    
    const re = useMemo(() => {
        if ( data.length === 0 ) {
            return (
                <>
                </>
            )
        }else {
            const problem = data.map((value, index) => (
                <Comment data={value} headerhide={true} fakeShadow={true} key={`userProfileComment${index}`} />
            ))
            return (
                <>
                <Text style={{
                    color: '#888888',
                    fontSize: 14,
                    padding: 10,
                    marginLeft: 20
                }}>{data.length}个问题</Text>
                <View style={{
                    gap: 15
                }}>
                    {problem}
                </View>
                </>
            )
        }
    }, [data])
    
    return (
        <View>
            {re}
        </View>
    )
}

function Like() {
    let data: CommentType[] = [
        {
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
      },
      {
        id: '00123',
        username: '今晚一定睡',
        profile: undefined,
    
        postContent: 'APP怎么这么难写',
        postTime: '刚刚',
        postIp: '广东',
    
        like: 22,
        comment: 12,
        share: 33,
        tags: ['APP'],
    
        commentComment: []
      },
      {
        id: '00124',
        username: '今晚一定睡',
        profile: undefined,
    
        postContent: 'APP这么难写',
        postTime: '刚刚',
        postIp: '广东',
    
        like: 22,
        comment: 12,
        share: 33,
        tags: ['APP'],
    
        commentComment: []
      },
    ]
    const re = useMemo(() => {
        if ( data.length === 0 ) {
            return (
                <>
                </>
            )
        }else {
            const like = data.map((value, index) => (
                <Comment data={value} headerhide={true} fakeShadow={true} liked={true}  key={`userProfileLike${index}`} />
            ))
            return (
                <>
                <Text style={{
                    color: '#888888',
                    fontSize: 14,
                    padding: 10,
                    marginLeft: 20
                }}>{data.length}个喜欢</Text>
                <View style={{
                    gap: 15
                }}>
                    {like}
                </View>
                </>
            )
        }
    }, [data])
    return (
        <View>
            {re}
        </View>
    )
}

export default function UserProfile() {
    const [showLeft, setShow] = useState(true)
    const handleShow = (bool:boolean) => setShow(bool)

    const { id } = useLocalSearchParams<{id: string}>()
    const { cache } = userProfileStore()
    const data = cache[id]
    const postProfile = data?.profile? { uri: data.profile } : require('@/assets/images/comment/defaultImg.png')

    return (
        <View style={style.container} >
            <View style={{flex: 3, width: '100%', height: '100%'}}>
                <Image
                source={require('@/assets/images/userProfile/defaultBg.png')}
                style={{
                    position: 'absolute', 
                    height: '100%',
                    width: '100%'
                }}
                />
                <Pressable onPress={() => router.back()} >
                    <Image style={style.backArrow} source={require('@/assets/images/userProfile/arrow.png')} />
                </Pressable>
                <View style={style.infor} >
                    <Image style={style.profile} source={postProfile} ></Image>
                    <View>
                        <Text style={{color: 'white', fontSize: 21, fontWeight: '500'}}>{data.username}</Text>
                        <Text style={{color: 'white', fontSize: 16}}>ID:   {data.id}</Text>
                        <Text style={{color: 'white', fontSize: 16}}>IP:   广东</Text>
                    </View>
                </View>
            </View>
            <View  style={{flex: 8, backgroundColor: 'white', width: '100%'}} >
            <Navigator handleShow={handleShow} />
            <ScrollView>
            {showLeft? <Problem /> : <Like />}
            </ScrollView>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA'
    },
    backArrow: {
        position: 'absolute',
        left: 15,
        top: 20,
    },
    infor: {
        position: 'absolute',
        left: 15,
        bottom: 15,
        flexDirection: 'row',
        gap: 10,
    },
    profile: {
        width: 75,
        height: 75,
        borderRadius: 75/2,
    }
})