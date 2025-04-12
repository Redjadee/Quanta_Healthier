import { Text, View, StyleSheet, Image } from "react-native"
import { Link, router } from "expo-router"
import { createContext, useState } from "react"
import { Provider, Menu, Button, Divider } from 'react-native-paper';

let Mon: number
const getMonth: (month: number) => void = month => Mon = month
export const ShownDay = createContext('')//日历组件的显示年月数据



function PaperMenu() {
  const [visible, setVisible] = useState(false);

  return (
    <Provider>
        <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
            <Button onPress={() => setVisible(true)} mode="contained">
            显示菜单
            </Button>
        }>
        <Menu.Item 
            onPress={() => alert('点了选项1')} 
            title="选项1" 
            leadingIcon="star" 
        />
        <Menu.Item 
            onPress={() => alert('点了选项2')} 
            title="选项2" 
            leadingIcon="heart" 
        />
        <Divider /> {/* 分割线 */}
        <Menu.Item 
            onPress={() => setVisible(false)} 
            title="取消" 
            leadingIcon="close" 
        />
        </Menu>
    </Provider>
  );
}



export default function ChoseYnM () {
    let arr = []//月份
    for( let i = 1; i <= 12; i++) {
       arr.push(
            <Link key={`choseYnM${i}`} onPress={() => getMonth(i)} href='/'>
            <View style={monthStyle.container}>
                <Text style={monthStyle.son} onPress={() => router.push('/')}>{i}月</Text>
            </View>
            </Link>
       )
    }

    return (
        <View style={style.container}>
            <View style={style.header}>

                <PaperMenu />
                <Link style={style.arrow} href="/">
                <Image source={require('@/assets/images/rightArrow.png')}></Image>
                </Link>
            </View>
            <View style={style.footer}>{arr}</View>       
            {/* <ShownDay.Provider value={Mon >= 10 ?`${}-${Mon}-01` : `${}-0${Mon}-01`} /> */}
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
        flex: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        justifyContent: 'center'
    },
    arrow: {
        position: 'absolute',
        right: 20,
        top: 60,
    }
})
const monthStyle = StyleSheet.create({
    container: {
        height: 110,
        width: 110,
        backgroundColor: '#FFFFFF',
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