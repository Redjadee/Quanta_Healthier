import { Text, View, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import ShuinChangHeader from "@/components/index/ShuinChangHeader"
import React, { useCallback, useState, useRef } from "react";
import moment from "moment";
import { Switch } from "react-native-ui-lib";
import TimePicker from "@/components/index/TimePicker"

function Reminder() {
    const [ enabled, setEnabled ] = useState(false)
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

    const markedDates = [
        moment().startOf('week'), 
        moment().startOf('week').add(1, 'days'),
        moment().startOf('week').add(2, 'days'),
        moment().startOf('week').add(3, 'days'),
        moment().startOf('week').add(4, 'days'),
    ]

    return (
        <View>
            <ShuinChangHeader index={0} markedDates={markedDates}/>
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