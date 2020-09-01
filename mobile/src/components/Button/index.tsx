import React from 'react'
import { ActivityIndicator } from 'react-native'
import { RectButtonProperties, } from 'react-native-gesture-handler'

interface ButtonProps extends RectButtonProperties{
  text: string;
  color?: string;
  haveText?: boolean;
  loading?: boolean;
}

import {Button, ButtonText} from './styles'

const ButtonComponent: React.FC<ButtonProps> = ({text, color, haveText = true, loading, ...rest}) => {
  return (
    <>
      <Button 
        color={color} 
        haveText={haveText} 
        enabled={!haveText ? false : true} 
        {...rest}
      >
      <ButtonText haveText={haveText}>
        {loading ? <ActivityIndicator size='small' color='#fff'/> : text}
      </ButtonText>
      </Button>
    </>
  )
}

export default ButtonComponent
