import React, { useState, useEffect, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import {Feather} from '@expo/vector-icons'
import * as Yup from 'yup'

import Header from '../../components/PagesHeader'
import Logo from '../../assets/images/Logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'

import {
    Container, 
    HeaderText,
    Content, 
    Title, 
    TitleText,
    TitleDescription, 
  } from './styles'
import api from '../../services/api'

const LogIn: React.FC = () => {
  const [email, setEmail] = useState('')

  const [hasText, setHasText] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(email.length >= 1) {
      setHasText(true)
    } else {
      setHasText(false)
    }
  }, [email])

  const handleSendMail = useCallback(async () => {
    try {
      setLoading(true)
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('Você precisa digitar um e-mail para continuar')
      })

      const data = { email }

      await schema.validate(data)

      await api.post('send-email', {
        email: data.email
      })

      setLoading(false)
      navigate('SuccessSendMail')
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setLoading(false)
        Alert.alert(error.message)

        return
      }
      setLoading(false)
      Alert.alert('Ops! Algo deu errado', 'Ocorreu um problema ao enviar seu email. Tente Novamente')
    }
  }, [email])

  const {navigate, goBack} = useNavigation();
  
  return (
    <Container>
      <KeyboardAvoidingView 
        style={{flex: 1}}
        behavior= {Platform.OS === 'ios' ? 'padding' : undefined}
      >
      <Header image={Logo} >
          <HeaderText>Sua plataforma de estudos online</HeaderText>
      </Header>
      <Content>
        <BorderlessButton onPress={() => goBack()}>
          <Feather name='arrow-left' size={20} color='#6A6180'/>
        </BorderlessButton>
        <Title>
          <TitleText>
            Esqueceu sua senha?
          </TitleText>
          <TitleDescription>
          Não esquenta, {'\n'} vamos dar um jeito nisso.
          </TitleDescription>
        </Title>

        <>
        <Input 
          autoCorrect={false}
          autoCapitalize='none'
          label='E-mail' 
          initialData={email}
          keyboardType='email-address' 
          onChangeText={(e) => setEmail(e) }
        />
        
        <Button 
          text='Enviar' 
          onPress={handleSendMail} 
          haveText={hasText}
          loading={loading}
        />
        </>
        

      </Content>
      </KeyboardAvoidingView>
    </Container>
  )
} 

export default LogIn;