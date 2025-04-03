//当访问不存在的 route 时，启用的自定义页面，而不是直接崩溃or404
import { View, StyleSheet } from 'react-native'
import { Stack, Link } from 'expo-router'

export default function NotFoundScreen() {
    return(
        <>
            <Stack.Screen options={{title: '网页不见惹！'}}></Stack.Screen>
            <View>
                <Link href='/'>回家吧~回到最初的美好~</Link>
            </View>
        </>
    )
}