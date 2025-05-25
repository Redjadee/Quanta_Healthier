import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient"
import { userProfileType } from "@/src/types/userProfile"
import { router } from "expo-router"

function MyNotification() {
  const label = ['获赞', '评论']
  const icon = [require('@/assets/images/My/liked.png'), require('@/assets/images/My/comment.png')]
  const arrow = require('@/assets/images/My/arrow.png')
  
  const events = (index: number) => {
    switch (index) {
      case 0: router.push('/my/liked'); break;
      case 1: router.push('/my/comment'); break;
    }
  }
  
  return (
    <View style={blockStyle.container}>
      <Text style={{
        marginLeft: 5,
        fontSize: 18,
        color: '#555555'
      }}>我的消息</Text>
      {label.map((value, index) => (
        <Pressable 
        key={`myNotifi${index}`} 
        style={[blockStyle.item, index === 0 && blockStyle.border]}
        onPress={() => events(index)}>
          <Image source={icon[index]} />
          <Text style={blockStyle.itemLabel}>{value}</Text>
          <Image source={arrow} style={blockStyle.arrow}/>
        </Pressable>
      ))}
    </View>
  )
}

function MyList() {
  const label = ['我的足迹', '我的喜欢', '我的提问', '我的回答', '称号收集', '设置']
  const icon = [
    require('@/assets/images/My/trail.png'),
    require('@/assets/images/My/like.png'),
    require('@/assets/images/My/question.png'),
    require('@/assets/images/My/answer.png'),
    require('@/assets/images/My/collection.png'),
    require('@/assets/images/My/setting.png'),
  ]
  const arrow = require('@/assets/images/My/arrow.png')
  
  const events = (index: number) => {
    index = index + 2
    switch (index) {
      case 2: router.push('/my/trail'); break;
      case 3: router.push('/my/like'); break;
      case 4: router.push('/my/question'); break;
      case 5: router.push('/my/answer'); break;
      case 6: router.push('/my/collection'); break;
      case 7: router.push('/my/setting'); break;
    }
  }

  return (
    <View style={blockStyle.container}>
      {label.map((value, index) => (
        <Pressable 
        style={[blockStyle.item, index !== 5 && blockStyle.border, {paddingVertical: 18 }]} 
        key={`MyList${index}`}
        onPress={() => events(index)}>
          <Image source={icon[index]} />
          <Text style={[blockStyle.itemLabel, {left: 45}]}>{value}</Text>
          <Image source={arrow} style={blockStyle.arrow}/>
        </Pressable>
      ))}
    </View>
  )
}

const blockStyle = StyleSheet.create({
  container: {
    marginTop: 15,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,

  },
  item: {
    flexDirection: 'row',
    alignItems: "center",
    width: '100%',
    padding: 15,
    paddingLeft: 15,
    overflow: 'hidden',
  },
  itemLabel: {
    position: 'absolute',
    left: 50,
    color: '#666666',
    fontSize: 17
  },
  arrow: {
    position: 'absolute',
    right: 20,
    bottom: 15
  },
  border: {
    borderBottomWidth: 0.6,
    borderBottomColor: "rgba(119, 119, 119, 0.32)"
  },
})

export default function My() {
  const myData: userProfileType = {
    username: '今晚一定不熬夜',
    id: '010123',
    profile: undefined
  }
  const postProfile = myData?.profile? { uri: myData.profile } : require('@/assets/images/comment/defaultImg.png')

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

          <Pressable style={[style.quickSet, {top: 20, right: 20}]}
            onPress={() => router.push('/')}
          >
            <Text style={style.quickSetLabel}>设置背景</Text>
          </Pressable>

          <View style={style.infor} >
              <Image style={style.profile} source={postProfile} ></Image>
              <View style={{gap: 3}}>
                  <Text style={{color: 'white', fontSize: 21, fontWeight: '500'}}>{myData.username}</Text>
                  <Text style={{color: 'white', fontSize: 16}}>ID:   {myData.id}</Text>
                  <Text style={{color: 'white', fontSize: 16}}>IP:   广东</Text>
              </View>
          </View>
          
          <Pressable style={[style.quickSet, {bottom: 15, right: 20}]}
            onPress={() => router.push('/')}
          >
            <Text style={style.quickSetLabel}>编辑资料</Text>
          </Pressable>
      </View>
      <LinearGradient colors={['#FEF6EA', '#FDE9CD']}  style={{flex: 8, width: '100%', alignItems: 'center'}} >
      <MyNotification />
      <MyList />
      </LinearGradient>
  </View>
  );
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
        bottom: 20,
        flexDirection: 'row',
        gap: 10,
        alignItems: "center"
    },
    profile: {
        width: 75,
        height: 75,
        borderRadius: 75/2,
    },
    quickSet: {
      position: 'absolute',
      backgroundColor: 'rgba(153, 153, 153, 0.6)',
      paddingVertical: 6,
      paddingInline: 12,
      borderRadius: 18,
    },
    quickSetLabel: {
      color: "white",
      fontSize: 16,
    }
})