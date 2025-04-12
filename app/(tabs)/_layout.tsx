import { Tabs } from "expo-router"
import { useState } from "react"
import { Image } from "react-native"

export default function TabLayout() {
    type tabType = {focused: Boolean}
    const [focus, setfocus] = useState('')

    return(
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#FEB54A',// 底部选中 active 的颜色
                tabBarLabelStyle: {//文字样式
                    fontSize: 12,
                },
                tabBarStyle: { //底部样式
                    backgroundColor: '#FEF9E4',
                    height: '8%',
                    paddingTop: '3'
                },
            }}>

            <Tabs.Screen name="index" options={{
                headerShown: false,
                title: '日历',//显示文本
                tabBarIcon: ({focused}: tabType) => ( //图标
                    focused ? <Image source={require('@/assets/images/calendarH.png')} /> : <Image source={require('@/assets/images/calendarG.png')} /> 
                )
            }}></Tabs.Screen>
            
            <Tabs.Screen name="community" options={{
                headerShown: false,
                title: '互动',
                tabBarIcon: ({focused}: tabType) => (
                    focused ? <Image source={require('@/assets/images/communityH.png')} /> : <Image source={require('@/assets/images/communityG.png')} />
                )
            }}></Tabs.Screen>
            
            <Tabs.Screen name="my" options={{
                headerShown: false,
                title: '我的',
                tabBarIcon: ({focused}: tabType) => (
                    focused ? <Image source={require('@/assets/images/myH.png')} /> : <Image source={require('@/assets/images/myG.png')} />
                )
            }}></Tabs.Screen>
        </Tabs>
    )
}