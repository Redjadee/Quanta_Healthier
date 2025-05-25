import { Text, View, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import ShuinChangHeader from "@/components/index/ShuinChangHeader"
import React, { useCallback, useState, useRef } from "react";
import moment from "moment";
import { Switch } from "react-native-ui-lib";

interface TimePickerType {
    getTime: (hour: number, minute: number) => void
}

function TimePicker({ getTime }: TimePickerType) {
  const [hour, setHour] = useState(23);
  const [minute, setMinute] = useState(0);
  const hourScrollRef = useRef<ScrollView>(null);
  const minuteScrollRef = useRef<ScrollView>(null);

  // 生成数据（包含前后缓冲项实现伪循环）
  const hours = [...Array(72)].map((_, i) => `${i % 24}`.padStart(2, '0'));
  const minutes = [...Array(180)].map((_, i) => `${i % 60}`.padStart(2, '0'));

  // 初始化滚动到中间位置
  React.useEffect(() => {
    hourScrollRef.current?.scrollTo({ 
        y: 40 * (24 + 23) - 40,  
        animated: false 
    });
    minuteScrollRef.current?.scrollTo({ y: 40 * 60 - 40, animated: false });
    setTimeout(() => {
        hourScrollRef.current?.scrollTo({ y: 40 * (24 + 23) - 40, animated: false });
        minuteScrollRef.current?.scrollTo({ y: 40 * 60 - 40, animated: false });
    }, 50); //强制重绘  
}, []);

  const handleHourScroll = (e: any) => {
    const y = e.nativeEvent.contentOffset.y;
    const newHour = ((Math.round(y / 40) + 1) % 24 + 24) % 24;
    setHour(newHour);
  };

  const handleMinuteScroll = (e: any) => {
    const y = e.nativeEvent.contentOffset.y;
    const newMinute = ((Math.round(y / 40) + 1) % 60 + 60) % 60;
    setMinute(newMinute);
  };

  return (
    <>
    <View style={styles.container}>
      {/* 小时选择器 */}
      <ScrollView
        ref={hourScrollRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={40}
        decelerationRate="fast"
        onMomentumScrollEnd={handleHourScroll}
        style={styles.scroll}
      >
        {hours.map((h, i) => (
          <View key={`h-${i}`} style={styles.item}>
            <Text style={[styles.itemLabel, hour === Number(h) && styles.selected]}>
            {h}
          </Text>
          </View>
        ))}
      </ScrollView>

        <View style={{
                position: 'absolute',
                top: '30%',
                left: 0,
                alignItems: 'center',
                backgroundColor: 'rgba(204, 204, 204, 0.3)',
                width: '100%',
                height: 40,
                zIndex: 3
            }}>
            <Text style={{
                color: '#333333',
                fontSize: 23,
                fontWeight: '700'
            }}>:</Text>
        </View>

      {/* 分钟选择器 */}
      <ScrollView
        ref={minuteScrollRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={40}
        decelerationRate="fast"
        onMomentumScrollEnd={handleMinuteScroll}
        style={styles.scroll}
      >
        {minutes.map((m, i) => (
          <View key={`m-${i}`} style={styles.item}>
            <Text style={[styles.itemLabel, minute === Number(m) && styles.selected]}>
                {m}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
    <Pressable 
         style={reminderStyle.setButton}
         onPress={() => getTime(hour, minute)}>
            <Text style={reminderStyle.buttonLabel} >设置</Text>
    </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    height: 140,
    gap: '22%'
  },
  scroll: {
    height: 140,
    width: 70,
  },
  item: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCD8FD',
    width: 100,
  },
  itemLabel: {
    fontSize: 18,
    color: '#666666'
  },
  selected: {
    fontSize: 22,
    color: '#333333'
  }
});



function Reminder() {
    const [ enabled, setEnabled ] = useState(true)
    const [ m, setM ] = useState('00')
    const [ h, setH ] = useState('23')
    const getTime = (hour: number, minute: number) => {
        setM(minute > 10 ? String(minute) : `0${minute}` )
        setH(hour > 10 ? String(hour) : `0${hour}`)
    }
    return (
    <View style={reminderStyle.container}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, position: 'absolute', left: 10, top: 10}}>
            <Image style={{height: 28, width: 28}} source={require('@/assets/images/shuiMian/reminder.png')} />
            <Text style={reminderStyle.title}>熬夜提醒</Text>
        </View>
        <TimePicker getTime={getTime} />
        
        <View style={reminderStyle.footer} >
            <Text style={reminderStyle.footerTime}>{h}:{m}</Text>
            <Switch
                value={enabled}
                onValueChange={() => setEnabled(!enabled)}
                onColor='#C6BFFF'
                offColor='rgba(153, 153, 153, 0.4)'
                thumbColor='white'
                style={{
                    position: 'absolute',
                    right: 25,
                    transform: [{scale: 1.1}]
                }}
            ></Switch>
        </View>
    </View>
    )
}

const reminderStyle = StyleSheet.create({
    container: {
        width: '90%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(226, 226, 226, 0.3)',
        height: '60%'
    },
    title: {
        fontSize: 20,
        color: '#555555'
    },
    setButton: {
        backgroundColor: '#C6BFFF',
        paddingInline: 25,
        paddingVertical: 7,
        borderRadius: 20,
        marginVertical: 20
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: 500,
        color: 'white'
    },
    footer: {
        flexDirection: "row",
        backgroundColor: '#F8F8F8',
        width: '90%',
        alignItems: 'center',
        paddingLeft: 15,
        borderRadius: 15,
        height: 80
    },
    footerTime: {
        fontSize: 36,
        fontWeight: '300',
        marginLeft: 5
    }
})

export default function ShuiMian() {
    const title = ['昨日入睡时间', '今日起床时间', '睡眠时长', '睡眠评分']
    
    const asleepTime = moment('22:00', "HH:mm") //api
    const wakeupTime = moment('06:00', "HH:mm") //api

    const sleepTimeCal = useCallback(() => {
        const duration = moment.duration(wakeupTime.add(1, 'day').diff(asleepTime))
        return [duration.hours(), duration.minutes()]
    }, [asleepTime, wakeupTime])
    
    const grade = 100
    const star = (<Image source={require('@/assets/images/shuiMian/star.png')}></Image>)
    let stars: React.JSX.Element[] = []
    //...

    const content = [
        (<Text style={ctStyle.number}>{asleepTime.format('HH:mm')}</Text>),
        (<Text style={ctStyle.number}>{wakeupTime.format('HH:mm')}</Text>),
        (<View style={{
            flexDirection: 'row',
            alignItems: "center",
            gap: 3
        }}>
            <Text style={ctStyle.number}>{sleepTimeCal()[0]}</Text>
            <Text style={ctStyle.numberHint}>小时</Text>
            <Text style={ctStyle.number}>{sleepTimeCal()[1]}</Text>
            <Text style={ctStyle.numberHint}>分钟</Text>
        </View>),
        (<View>
            <View style={{flexDirection: "row", alignItems: 'center', gap: 3}} >
                <Text style={ctStyle.number}>{grade}</Text>
                <Text style={ctStyle.numberHint}>分</Text>
            </View>
        </View>),
    ]


    const comment = [
        (<Text style={[cmstyle.default]}>比昨日入睡</Text>),
        (<Text style={[cmstyle.default]}>比昨日早</Text>),
        (<Text style={[cmstyle.default]}>较昨日</Text>),
        (<View style={{gap: 3, flexDirection: 'row'}}>{star}{star}{star}{star}{star}</View>),
    ]

    return (
        <View>
            <ShuinChangHeader index={0} />
            <View style={{
                width: '100%',
                height: '80%',
                backgroundColor: '#FAFAFA',
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35,
                zIndex: 2,
                top: -20,
                paddingTop: 20,
                alignItems: 'center',
                gap: 20
                }}>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                    }}>
                    {title.map((value, index) => {
                        const blockKey = `block${index}` as keyof typeof blockStyle;
                        return (
                            <View key={`Shuimian${index}`} 
                            style={[blockStyle.block, blockStyle[blockKey]]}>
                                <Text style={ctStyle.title} >{value}</Text>
                                {content[index]}
                                {comment[index]}
                            </View>
                        );
                    })}
                </View> 
                <Reminder />   
            </View>
        </View>
    )
}

const blockStyle = StyleSheet.create({
    block: {
        width: '40%',
        height: 110,
        padding: 10,
        borderRadius: 15,
        gap: 5,
        borderWidth: 1,
        borderBottomWidth: 4
    },
    block0: {
        backgroundColor: 'rgba(220, 216, 253, 0.8)',
        borderColor: 'rgba(182, 176, 235, 0.5)'
    },
    block1: {
        backgroundColor: 'rgba(198, 247, 188, 0.6)',
        borderColor: 'rgba(157, 224, 144, 0.5)'
    },
    block2: {
        backgroundColor: 'rgba(211, 242, 245, 0.8)',
        borderColor: 'rgba(141, 209, 214, 0.5)'
    },
    block3: {
        backgroundColor: 'rgba(252, 233, 194, 0.8)',
        borderColor: 'rgba(242, 200, 116, 0.5)'
    },
})

const ctStyle = StyleSheet.create({
    title: {
        fontSize: 19,
        color: '#555666'
    },
    number: {
        color: '#555555',
        fontSize: 27,
        fontWeight: '500'
    },
    numberHint: {
        color: '#777777',
        fontSize: 16,
    }
})

const cmstyle = StyleSheet.create({
    default: {
        fontSize: 12
    },
    red: {
        color: '#FF2121'
    },
    green: {
        color: '#4AC900'
    }
})