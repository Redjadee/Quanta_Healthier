import { DateProvider } from "@/src/context/DateContext"
import { Stack } from "expo-router"

export default function RootLayout() {
  return(
    <DateProvider>
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false}}></Stack.Screen>
      <Stack.Screen name='+not-found'></Stack.Screen>
      <Stack.Screen name='choseYnM' options={{ headerShown: false}}></Stack.Screen>
    </Stack>
    </DateProvider>
  )
}
