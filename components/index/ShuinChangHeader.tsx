import { Text, View, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { Link } from "expo-router"
import { useCallback, useEffect, useMemo } from "react"
import { useDate } from "@/src/context/DateContext"
import CalendarStrip, { IDayComponentProps } from 'react-native-calendar-strip'
import moment from 'moment'

function Header({index }: {index: number }) {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',paddingVertical: 15, width: '100%'}}>
            <Link style={{position: 'absolute', left: 25}} href={'/'}><Image source={require('@/assets/images/leftArrow.png')} /></Link>
            <Text style={{color: '#555555', fontSize: 22}}>{index === 0? '睡眠记录': '肠道记录'}</Text>
        </View>
    )
}

export default function ShuinChangHeader({index }: {index: number }) {
    const { setedMon, setedYear } = useDate()
    const calNow = useMemo(() => {
      let copyDate: string = ''
      if (setedMon < 10) copyDate = '0' + (setedMon)
      const now = setedMon >= 10 ?`${setedYear}-${setedMon}-01` : `${setedYear}-${copyDate}-01`
      return now
    }, [setedYear,setedMon])
    
    useEffect(() => {
        moment.updateLocale('en', {
        week: {
            dow: 0, 
        },
        })        
    },[])

    const customDay = useCallback((props: IDayComponentProps) => {
        const { date, selected, marking } = props;

        // 1. 将 Duration 转换为当前周的日期
        const today = moment(); // 获取当前日期
        const startOfWeek = today.clone().startOf('week'); // 本周的第一天（周日）
        // 2. 获取星期几（0=周日, 1=周一...6=周六）
        const displayDate = startOfWeek.clone().add(date.days(), 'days'); // 将当前周的起始日期加上duration的天数
        const dayOfWeek = displayDate.day();
        // 3. 星期几的中文映射
        const weekdays = ['日','一', '二', '三', '四', '五', '六'];
        // 4. 获取当前日期的天数（用于显示）
        const dayOfMonth = displayDate.date();

        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', gap: 5}}>
                <Text style={{
                    color: '#999999',
                    fontSize: 16,
                }}>{weekdays[dayOfWeek]}</Text>
                <View style={[{
                    width: 30,
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center'
                }]}>
                    <Text style={{ 
                        color: '#999999',
                        fontSize: 16,
                        fontWeight: '700',
                    }}>{dayOfMonth}</Text>
                </View>
            </View>
        );
    }, [])
// <View style={{
//     position: 'absolute',
//     left: 0,
//     backgroundColor: 'rgba(253, 161, 30, 0.8)',
//     borderRadius: 18,
//     height: 20,
//     width: 20,
// }}></View>
    return (
        <View style={{backgroundColor: '#FEE8C9', justifyContent: 'center', alignItems: 'center'}}>
            <Header index={index} />
            <CalendarStrip
            key={`weekCalendar`}
            
            style={{ 
                height: 80,
                width: '90%',
                backgroundColor: 'white', 
                marginBottom: 50, 
                borderRadius: 18,
            }}
            
            iconLeft={null}  // 隐藏左箭头
            iconRight={null} // 隐藏右箭头
            calendarHeaderStyle={{ display: 'none' }} // 隐藏标题
            scrollable={false}
            scrollerPaging={false}
            startingDate={moment().clone().startOf('week')}
            useIsoWeekday={false}
            selectedDate={moment()}
            dayComponent={customDay}
            />
        </View>
    )
}
