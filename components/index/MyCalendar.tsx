import { View, StyleSheet } from 'react-native'
import { Calendar, LocaleConfig } from 'react-native-calendars'

type calendar = {
  now: string
}


export default function MyCalendar( { now }:calendar  ) {
//本土化
LocaleConfig.locales['zh'] = {
  monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
  monthNamesShort: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
  dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
  dayNamesShort: ['日','一','二','三','四','五','六'],
  today: '今天'
};
LocaleConfig.defaultLocale = 'zh';

const colorArr = ['#FDB44B', '#FEE8C9', '#DADADA']
const textColorArr = ['white', '#FFA018']

const handleMarked = () => {
//写逻辑
//如果周六，无论如何都是结束日，如果周日，无论如何都是开始日
}

  return  (
    <View style={style.container} >
      <Calendar 
      style={style.calen}
    // 基础配置
    //
      current={now}
      firstDay={0}
      

      markingType={'period'}
      // 标记今天
      markedDates={{
        [new Date().toISOString().split('T')[0]]: {
        startingDay: true,
        endingDay: true,
        textColor: textColorArr[0],
        color: colorArr[2]
        },
        '2025-05-01': {
          startingDay: true,
          textColor: textColorArr[0],
          color: colorArr[0]
        },
        '2025-05-02': {
          endingDay: true,
          textColor: textColorArr[0],
          color: colorArr[0]
        },
        '2025-05-04': {
          startingDay: true,
          textColor: textColorArr[1],
          color: colorArr[1]
        },
        '2025-05-05': {
          textColor: textColorArr[1],
          color: colorArr[1]
        },
        '2025-05-06': {
          endingDay: true,
          textColor: textColorArr[1],
          color: colorArr[1]
        },
      }}


      // 样式配置
      theme={{
        //日历背景色
        calendarBackground: '#ffffff',
        //选择的day
        selectedDayBackgroundColor: colorArr[2],
        selectedDayTextColor: '#ffffff',
        //今天
        todayTextColor: '#ff6b6b',
        //全局日期
        textDayFontFamily: 'monospace',
        dayTextColor: '#9E9E9E',
        textDayFontSize: 15,
        textDayFontWeight: 'bold',
        //日期盒子
        'stylesheet.calendar.day': {
          base: {
            justifyContent: 'center',  
            alignItems: 'center',    
            height: 32,              
            width: 32,           
          }
        },
        //去除头部
        textDisabledColor: 'transparent',
        'stylesheet.calendar.header': {
            header: {display: 'none' },
            monthText: {display: 'none'},
            arrow: {display: 'none'},
            dayOutOfRangeContainer: {
              opacity: 0,
              height: 0
            }
          },
         
      }}
      
      //去除多余功能
      hideExtraDays={true} //非本月不显示
      disableAllTouchEventsForDisabledDays={true}
      enableSwipeMonths={false}
      disableMonthChange={true}
      hideArrows={true}          // 隐藏左右箭头
      hideDayNames={false}       // 显示星期几的名称
      pagingEnabled={false}      // 禁用分页滑动
        />
      </View>
    )
}

const style = StyleSheet.create({
    container: {
       alignItems: 'center' 
    },
    calen: {
        width: 350,
        borderRadius: 10,
    }
})

