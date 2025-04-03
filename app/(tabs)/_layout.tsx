import { Tabs } from "expo-router"
import Ionicons from '@expo/vector-icons/Ionicons'

export default function TabLayout() {
    return(
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'white',// 底部选中 active 的颜色
                tabBarStyle: { //底部样式
                    backgroundColor: 'black'
                },

                headerStyle: { //头部样式
                    backgroundColor: 'black'
                },
                headerShadowVisible: false, //取消头部阴影
                headerTintColor: 'white' //当前头部标题颜色
            }}>
            <Tabs.Screen name="index" options={{
                title: '日历',//显示文本
                tabBarIcon: ({color, focused}) => ( //图标
                    <Ionicons name={focused? 'home-sharp' : 'home-outline'} color={color} size={24}></Ionicons>
                )
            }}></Tabs.Screen>
            <Tabs.Screen name="community" options={{
                title: '互动',
                tabBarIcon: ({color, focused}) => (
                    <Ionicons name={focused? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
                )
            }}></Tabs.Screen>
            <Tabs.Screen name="my" options={{
                title: '我的',
                tabBarIcon: ({color, focused}) => (
                    <Ionicons name={focused? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
                )
            }}></Tabs.Screen>
        </Tabs>
    )
}