import React, { useCallback, useState, useRef } from "react";
import { Text, View, StyleSheet, Image, Pressable, ScrollView } from "react-native";

interface TimePickerType {
    getTime: (hour: number, minute: number) => void
}

export default function TimePicker({ getTime }: TimePickerType) {
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
          <View key={`shuimianItem${i}`} style={styles.item}>
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
         style={styles.setButton}
         onPress={() => getTime(hour, minute)}>
            <Text style={styles.buttonLabel} >设置</Text>
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
});