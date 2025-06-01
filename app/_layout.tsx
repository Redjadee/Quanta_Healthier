import { DateProvider } from "@/src/context/DateContext"
import { ShareProvider } from "@/src/context/ShareContext"
import { Stack } from "expo-router"

export default function RootLayout() {
  return(
    <ShareProvider>
    <DateProvider>
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='+not-found'></Stack.Screen>
      <Stack.Screen name='home/choseYnM' options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="comment/publishMyQ" options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="comment/[id]" options={{ headerShown: false }}></Stack.Screen>
      {/* <Stack.Screen name="tags/[label]" options={{ headerShown: false }}></Stack.Screen> */}
      <Stack.Screen name="userProfile/[id]" options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="home/changDao" options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="home/shuiMian" options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="my/liked" options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="my/comment" options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="my/trail" options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="my/like" options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="my/question" options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="my/answer" options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="my/collection" options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="my/setting" options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="my/setting/selfProfile" options={{ headerShown: false }}></Stack.Screen>
    </Stack>
    </DateProvider>
    </ShareProvider>
  )
}
