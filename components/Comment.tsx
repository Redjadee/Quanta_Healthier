import { View, Text, StyleSheet } from "react-native"

function Treble() {
    const treble = [
        {uri: 'uri', num: 123},
        {uri: 'uri', num: 123},
        {uri: 'uri', num: 123}
    ]
    return(
        <View>
            {treble.map( item => (
                <>
                    <Text>要换图像</Text>
                    <Text>{item.num}</Text>
                </>
            ))}
        </View>
    )
}



//问答的组块
export default function Comment() {
    return (
        <View>
            <View></View>
            <Text></Text>
            
        </View>
    )
}