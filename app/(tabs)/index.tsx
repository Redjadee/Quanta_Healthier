import { Text, View, StyleSheet, Image } from "react-native";
import { Link } from "expo-router"
import  MyCalendar  from "@/components/MyCalendar"

import { DateProvider, useDate } from "@/src/context/DateContext"
import { useMemo } from "react";

export default function Index() {
  const { setedMon, setedYear } = useDate()
  const calNow = useMemo(() => {
    let copyDate: string = ''
    if (setedMon < 10) copyDate = '0' + (setedMon)
    const now = setedMon >= 10 ?`${setedYear}-${setedMon}-01` : `${setedYear}-${copyDate}-01`
    return now
  }, [setedYear,setedMon])
//生成现在时间

  return (
      <View style={style.container} >
      <View style={style.header}>
        <Text style={style.headerText} >{setedYear}年{setedMon}月</Text>
        
        <Link href="/choseYnM" style={style.arrowContainer}>
        <Image source={require('@/assets/images/leftArrow.png')} />
        </Link>
        
        <View style={style.analysisContainer} >
          <Image source={require('@/assets/images/analysis.png')} style={{ width: 24, height: 24 }}></Image>
          <Text style={style.analysisLabel} >分析</Text>
        </View>
      
      </View>
      <MyCalendar now={calNow} />
      <View style={style.statusbar}><Text>占位！！</Text></View>
      </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FAE8CA'
  },
  header: {
    paddingTop: 30,
    flex: 1,
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 20,
    color: '#706F6D'
  },
  arrowContainer: {
    position: 'absolute',
    left: -150,
    top: 40
  },
  analysisContainer: {
    flexDirection: 'column',
    alignItems: 'center',

    position:'absolute',
    top: 30,
    right: -150
  },
  analysisLabel: {
    color: '#908C86',
    fontSize: 13
  },

  statusbar: {
    paddingTop: 20,
    flex: 6
  }
})
