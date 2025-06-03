import * as ImagePicker from 'expo-image-picker'

export function pickImg(setImg: React.Dispatch<React.SetStateAction<string | undefined>> | ((newValue: string) => void), isSqure?: boolean, is169?: boolean) {
  const pickImageAsync = async () => { //异步，留给 按钮的事件监听方法 来调用
    
    let aspect: [number, number] = [0, 0]
    if(isSqure) aspect = [1 , 1]
    if(is169) aspect = [16, 9] 

    let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images', 'livePhotos'],
    allowsEditing: true,
    quality: 1,
    aspect: aspect
    })

    if(!result.canceled) {
      setImg(result.assets[0].uri)
      alert('修改成功~')
    } else {
      alert('请选一张图片哦')
    }
  }
  
  return pickImageAsync
}

