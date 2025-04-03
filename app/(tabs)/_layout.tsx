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
            }}>

            <Tabs.Screen name="index" options={{
                headerShown: false,
                title: '日历',//显示文本
                tabBarIcon: ({color, focused}) => ( //图标
                    <Ionicons name={focused? 'home-sharp' : 'home-outline'} color={color} size={24}></Ionicons>
                )
            }}></Tabs.Screen>
            
            <Tabs.Screen name="community" options={{
                headerShown: false,
                title: '互动',
                tabBarIcon: ({color, focused}) => (
                    <Ionicons name={focused? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
                )
            }}></Tabs.Screen>
            
            <Tabs.Screen name="my" options={{
                headerShown: false,
                title: '我的',
                tabBarIcon: ({color, focused}) => (
                    <Ionicons name={focused? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
                )
            }}></Tabs.Screen>
        </Tabs>
    )
}