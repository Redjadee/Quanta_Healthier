import { Text, View, StyleSheet, Image } from "react-native"
import { Link, router } from "expo-router"
import ChoseYear from '@/components/ChoseYear'
import { Provider } from "react-native-paper"

let Mon: number
let Year: number
const getMonth: (month: number) => void = month => Mon = month
const getYear: (year: number) => void = year => Year = year

interface ChoseYnMType {
    YnM: (Y:number, M:number) => number[]
}


export default function ChoseYnM ({ YnM }:ChoseYnMType) {
    let arr = []//月份 
    for( let i = 1; i <= 12; i++) {
       arr.push(
            <Link key={`choseYnM${i}`} onPress={() => getMonth(i)} href='/'>
            <View style={[monthStyle.container, { backgroundColor: monBGColor(i) }]} >
                <Text style={monthStyle.son} onPress={() => router.push('/')}>{i}月</Text>
            </View>
            </Link>
       )
    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Provider>
                <ChoseYear getYear={getYear} />
                </Provider>
                <Link style={style.arrow} href="/">
                <Image source={require('@/assets/images/rightArrow.png')}></Image>
                </Link>
            </View>
            <View style={style.footer}>{arr}</View>       
        </View>
    )
}

function monBGColor(mon: number) {
    const now = new Date().getMonth() +1
    let bgColor: string
    if ( mon < now) {
        bgColor = '#FFF9E3'
    } else if (mon === now) {
        bgColor = '#FFB956'
    } else {
        bgColor = '#FFFFFF'
    }
    return bgColor 
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEE8C9'
    },
    header: {
        flex: 4
    },
    footer: {
        flex: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        justifyContent: 'center',
        alignContent: 'center',
    },
    arrow: {
        position: 'absolute',
        right: 25,
        top: '30%',
    }
})
const monthStyle = StyleSheet.create({
    container: {
        height: 110,
        width: 110,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    son: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#999999'
    }
})