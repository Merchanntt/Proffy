import React, { useState, useCallback, useEffect, createContext, useRef } from 'react'
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'


interface InputPros extends TextInputProps  {
  label: string;
  icon?: string;
  DivStyle?: object;
}

import {Container, Input, Focus, TextLabel} from './styles';

const InputComponent: React.FC<InputPros> = ({
  icon, 
  label,
  secureTextEntry, 
  DivStyle,
  value,
  ...rest}) => {
  const [passwordView, setPasswordView] = useState(true)
  const [isFocused, setIsFocused] = useState(false)
  const [hasText, setHasText] = useState(false)

  const handleFocused = useCallback(() => {
    setIsFocused(true)
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false)
  }, []);

  useEffect(() => {
      value && value.length >= 1 ? setHasText(true) : setHasText(false)
  }, [value]);

  const handleShowPassword = useCallback(() => {
    setPasswordView(!passwordView)
  }, [passwordView])

  return (
     <Container style={DivStyle} >
       <Focus isFocused={isFocused}/>

        <TextLabel isFocused={isFocused} hasText={hasText}>
          {label}
        </TextLabel>
        
      <Input 
        secureTextEntry={icon ? passwordView : false } 
        onFocus={handleFocused}
        onBlur={handleBlur}
        {...rest}/>

      {icon &&
        <BorderlessButton onPress={handleShowPassword}>
         <Feather 
          name={passwordView ? icon : 'eye-off'} 
          size={20} 
          style={{
            padding: 10,
            color: passwordView ? '#9C98A6' : '#8257E5'
            }}/>
        </BorderlessButton>
      }
    </Container>
  )
}

export default InputComponent;