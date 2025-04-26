import { View, Text, StyleSheet } from 'react-native'
import { useState } from 'react'


interface CommunityTabProps {
  changeShow: (index: number) => void;
}

export default function CommunityTab({ changeShow }: CommunityTabProps) {
  const [now, setNow] = useState('question')


  const tabs = [
    {label:'问答', id: 'question'},
    {label:'文章', id: 'article'}
  ]
  const content = tabs.map((item,index) => (
    <View style={{justifyContent: 'center', alignItems: 'center'}}  key={item.id} >
    <Text onPress={() => {setNow(item.id);changeShow(index)}} style={[tabStyle.tab, now === item.id && tabStyle.active]}>{item.label}</Text>
    <View style={[now !== item.id && {display: 'none'}, tabStyle.activeUnderline]} key={`tabActiveUnderline${item.id}`} ></View>
    </View>
  ))

  return(
    <View style={tabStyle.container}>
      {content}
    </View>
  )
}

const tabStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: '20%',
    paddingBottom: 20,
    justifyContent: 'center'
  },
  tab: {
    color: '#9F9C97',
    fontSize: 20,
    fontWeight: '500'
  },
  active: {
    color: '#FEB246',
    fontWeight: '700',
    paddingBottom: 3
  },
  activeUnderline: {
    backgroundColor: '#FEB246',
    width: 55,
    height: 6,
    borderRadius: 15
  }
})