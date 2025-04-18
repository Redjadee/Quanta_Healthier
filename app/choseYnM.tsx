import { Text, View, StyleSheet, Image } from "react-native"
import { Link, router } from "expo-router"
import ChoseYear from '@/components/ChoseYear'
import { Provider } from "react-native-paper"
import { useMemo } from "react"

import { useDate } from "@/src/context/DateContext"

export default function ChoseYnM () {
    const { setedYear, setSetedYear, setSetedMon } = useDate()

    function getYear(year: number): void {
        setSetedYear(year)
    }

    const DynamicMonthStyle = useMemo(() => { 
        interface reType {
            backgroundColor: string
            color: string
        }
        const styles: reType[] = []
        const fun: (month: number) => reType = month => {
            const nowYear = new Date().getFullYear()
            const nowMonth = new Date().getMonth()+1
            let bgcolor: string
            let color: string
    
            if (nowYear === setedYear && month === nowMonth) {
                bgcolor = '#FFB956'
                color = 'white'
            } else if (nowYear === setedYear) {
                bgcolor = month > nowMonth ? '#FFFFFF' : '#FFF9E3'
                color = '#999999'
            } else {
                color = '#999999'
                bgcolor = nowYear > setedYear ? '#FFF9E3' : '#FFFFFF'
            }
    
            let re: reType = {
                backgroundColor: bgcolor,
                color: color
            }
    
            return re
        }
        for (let i = 1; i <= 12; i++) {
          styles.push(fun(i))
        }
        return styles
      }, [setedYear]) 


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
            <View style={style.footer}>
            {Array.from({ length: 12 }, (_, i) => (
            <Link key={`choseYnM${i+1}`} onPress={() => setSetedMon(i+1)} href='/'>
            <View style={[monthStyle.container, { backgroundColor: DynamicMonthStyle?.[i]?.backgroundColor ?? '#FFFFFF'}]}>
                <Text 
                style={[monthStyle.son, {color: DynamicMonthStyle?.[i]?.color ?? '#999999'}]} 
                onPress={() => { router.push('/'); setSetedMon(i+1)}}
                >
                {i+1}月
                </Text>
            </View>
            </Link>
            ))}
            </View>       
        </View>
    )
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
        flex: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        justifyContent: 'center',
        alignContent: 'center',
    },
    arrow: {
        position: 'absolute',
        right: 25,
        top: '35%',
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
    }
})