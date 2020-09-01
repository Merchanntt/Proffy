import React from 'react'
import CheckBox, {CheckBoxProps} from 'react-native-check-box'
import { Image, View } from 'react-native'

import CheckBoxImage from '../../assets/images/CheckBox.png'

const CheckBoxComponent: React.FC<CheckBoxProps> = ({...rest}) => {
  return (
    <View 
      style= {{
      borderRadius: 8,
      maxWidth: 24,
      maxHeight: 24,
      backgroundColor: '#fff',
      borderColor: '#E6E6F0',
      borderWidth: 1,
      marginRight: 12
    }}>

      <CheckBox {...rest}
        checkBoxColor= '#fff'
        checkedImage={<Image source={CheckBoxImage} style={{
          width: 22,
          height: 22,
          resizeMode: "center"
        }} />}
        checkedCheckBoxColor= '#04D361'
        
      />
    </View>
  )
}

export default CheckBoxComponent;