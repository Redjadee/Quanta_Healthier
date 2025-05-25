import { Text, View, StyleSheet, Image, ScrollView, Pressable, Animated } from "react-native";
import { Link } from "expo-router"
import { useCallback, useEffect, useMemo, useState, useRef } from "react"
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
    const [selectedDate, setSelectedDate] = useState(moment());
    const scaleAnim = useRef(new Animated.Value(1)).current;
    
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

    const handleDatePress = (date: moment.Moment) => {
        setSelectedDate(date);
        // 动画效果
        scaleAnim.setValue(0.8);
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    const customDay = useCallback((props: IDayComponentProps) => {
        const { date, selected, markedDates } = props
        const today = moment();
        const startOfWeek = today.clone().startOf('week');
        const displayDate = startOfWeek.clone().add(date.days(), 'days');
        const dayOfWeek = displayDate.day();
        const weekdays = ['日','一', '二', '三', '四', '五', '六'];
        const dayOfMonth = displayDate.date();
        
        // 判断是否是marked日期
        const isMarked = markedDates && Array.isArray(markedDates) && 
            markedDates.some((d) => moment(d).isSame(displayDate, 'day'))
        // 判断是否是连续marked日期的一部分
        const isStartOfMarkedRange = isMarked && 
            (!markedDates.some((d) => moment(d).isSame(displayDate.clone().subtract(1, 'day'), 'day')));
        const isEndOfMarkedRange = isMarked && 
            (!markedDates.some((d) => moment(d).isSame(displayDate.clone().add(1, 'day'), 'day')));
        return (
            <View key={`weekCalendarItem`} style={{ alignItems: 'center', justifyContent: 'center', gap: 5}}>
                <Text style={{
                    color: '#999999',
                    fontSize: 16,
                }}>{weekdays[dayOfWeek]}</Text>
                <Pressable 
                    onPress={() => handleDatePress(displayDate)}
                    style={[{
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2   
                    }, selected && style.selected]}
                >
                    <Text style={[{ 
                        color: '#999999',
                        fontSize: 16,
                        fontWeight: '700',

                    }, isMarked && style.markedText]}>{dayOfMonth}</Text>
                </Pressable>
                {isMarked && 
                    <View style={[
                        style.marked, 
                        {bottom: 0},
                        isStartOfMarkedRange && style.markedStart,
                        isEndOfMarkedRange && style.markedEnd 
                    ]}></View>  }
            </View>
        );
    }, [selectedDate, scaleAnim])

    const style = StyleSheet.create({
        selected: {
            borderColor: '#999999',
            borderRadius: 20,
            borderWidth: 1.5
        },
        marked: {
            position: 'absolute',
            backgroundColor: '#FEE8C9',
            height: 40,
            width: 50,
            zIndex: 1,
        },
        markedStart: {
            borderStartEndRadius: 20,
            borderStartStartRadius: 20,
        },
        markedEnd: {
            borderEndStartRadius: 20,
            borderEndEndRadius: 20,
        },
        markedText: {
            color: '#FFAB32'
        },
    })

    return (
        <View style={{backgroundColor: '#FEE8C9', justifyContent: 'center', alignItems: 'center', zIndex: 1}}>
            <Header index={index} />
            <CalendarStrip
            key={`weekCalendar`}
            style={{ 
                height: 90,
                width: '90%',
                backgroundColor: 'white', 
                marginBottom: 50, 
                borderRadius: 18,
            }}
            iconLeft={null}
            iconRight={null}
            calendarHeaderStyle={{ display: 'none' }}
            scrollable={false}
            scrollerPaging={false}
            startingDate={moment().clone().startOf('week')}
            useIsoWeekday={false}
            selectedDate={selectedDate}
            dayComponent={customDay}
            markedDates={[
                moment().startOf('week'), 
                moment().startOf('week').add(1, 'days'),
                moment().startOf('week').add(2, 'days'),
                moment().startOf('week').add(3, 'days'),
                moment().startOf('week').add(4, 'days'),
            ]}
            />
        </View>
    )
}
