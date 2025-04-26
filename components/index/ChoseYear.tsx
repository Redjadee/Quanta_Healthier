import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, StyleSheet, Platform } from 'react-native';
import { Menu, TouchableRipple } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useDate } from '@/src/context/DateContext';

interface ChoseYearProps { //使用接口而不是类型定义
    getYear: (year: number) => void;
}

export default function ChoseYear({ getYear }:ChoseYearProps) {
  const [visible, setVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { setedYear } = useDate()
  
  // 生成年份范围（当前年前后5年）
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 21 }, (_, i) => currentYear - 5 + i);
  };

  return (
    <View style={styles.container}>
      {/* 触发按钮 - 现在作为实际anchor */}
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <TouchableRipple 
            onPress={() => setVisible(true)}
            style={styles.yearBox}
          >
            <View style={styles.yearContent}>
              <Text style={[styles.yearText, {color: 'white', fontSize: 20}]}>{setedYear}</Text>
              <MaterialIcons 
                name={visible ? 'arrow-drop-up' : 'arrow-drop-down'} 
                size={24} 
                color="#666" 
              />
            </View>
          </TouchableRipple>
        }
        contentStyle={styles.menuContent}
      >
        <ScrollView style={styles.scrollView}>
          {generateYears().map(year => (
            <TouchableRipple
              key={year}
              onPress={() => {
                setSelectedYear(year);
                getYear(year);
                setVisible(false);
              }}
              style={[
                styles.yearItem,
                year === selectedYear && styles.selectedYear
              ]}
            >
              <Text style={[styles.yearText, year === selectedYear && {color: 'white'}]}>{year}</Text>
            </TouchableRipple>
          ))}
        </ScrollView>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      position: 'relative',
      top: '30%',
      left: '35%',
      width: 100,
    },
    yearBox: {
      padding: 10,
      backgroundColor: '#FFB955',
      borderRadius: 15,
    },
    yearContent: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    yearText: {
      fontSize: 17,
      fontWeight: 'bold',
      textAlign: 'center',
      width: '100%',
      color: '#9C9C9C'
    },
    anchor: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 1,
      height: 1,
    },
    menuContent: {
      width: 100,
      maxHeight: 120,
      marginTop: 40,
      backgroundColor: 'white',
      alignItems: 'center',
    },
    scrollView: {
      maxHeight: 110,
      width: '100%',
    },
    yearItem: {
      margin: 0,
      paddingTop: 10,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
      alignItems: 'center'
    },
    selectedYear: {
      backgroundColor: '#FFB955',
    },
  });
  
