import React, { useState, useEffect, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAvoidingView, Platform, View, Alert } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import {Feather} from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import * as Yup from 'yup'

import Input from '../../../components/Input'
import Button from '../../../components/Button'

import {
    Container, 
    TopBar,
    CirclesContainer,
    Content, 
    Title, 
    TitleText,
    TitleDescription,
    Label, 
  } from './styles'

const CreateAccountName: React.FC = () => {
  const [name, setName] = useState('')
  const [lastname, setLastName] = useState('')
  const [hasText, setHasText] = useState(false)

  const {navigate, goBack} = useNavigation()

  useEffect(() => {
    lastname.length >= 1 ? setHasText(true) : setHasText(false)
  }, [lastname])

  const handleCreateUser = useCallback(async () => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        lastname: Yup.string().required('Sobrenome é obrigatório')
      })

      const data = {name, lastname}

      await schema.validate(data, {
        abortEarly: false,
      })

      navigate('CreateAccount-Credentials', data)
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert(error.message)

        return
      }
    }
  }, [name, lastname, navigate])

  return (
    <Container>
      <StatusBar style='dark'/>
      <KeyboardAvoidingView 
        style={{flex: 1}}
        behavior= {Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
      <Content>
      <TopBar>
          <BorderlessButton onPress={() => goBack()}>
            <Feather name='arrow-left' size={24} color='#6A6180'/>
          </BorderlessButton>
          <CirclesContainer>
          <Feather name='circle' size={10} style={{marginRight: 4, color: '#8257e5'}}/>
          <Feather name='circle' size={10} style={{color:'#6A6180', opacity: 0.3}}/>
          </CirclesContainer>
        </TopBar>
        <Title>
          <TitleText>
            Crie sua conta
          </TitleText>
          <TitleDescription>
          Basta preencher esses dados {'\n'} e você estará conosco.
          </TitleDescription>
        </Title>

        <>
        <View >
          <Label>
            01. Quem é você?
          </Label>
        </View>
        <Input 
          label='Nome'
          onChangeText={(e) => setName(e)}
          value={name}
          DivStyle={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
          }}
        />
        <Input 
          label='Sobrenome'
          onChangeText={(e) => setLastName(e)}
          value={lastname}
          DivStyle={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 8,
            borderBottomLeftRadius: 8,
            marginTop: -1
          }}
        />
        
        <Button 
          text='Próximo' 
          onPress={handleCreateUser} 
          color='#8257E5'
          haveText={hasText}
        />
        </>
        

      </Content>
      </KeyboardAvoidingView>
    </Container>
  )
} 

export default CreateAccountName;