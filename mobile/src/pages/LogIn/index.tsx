import React, { useState, useCallback, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import * as Yup from 'yup'


import Header from '../../components/PagesHeader'
import Logo from '../../assets/images/Logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import CheckBox from '../../components/CheckBox'

import {
    Container, 
    HeaderText,
    Content, 
    Title, 
    TitleText, 
    ButtonText, 
    RememberContainer,
    Remember,
    RememberText,
    ButtonRememberText,
  } from './styles'
import { UseAuth } from '../../hooks/auth'

const LogIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [hasText, setHasText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const { signIn } = UseAuth();
  const { navigate } = useNavigation()

  useEffect(() => {
    if(password.length >= 6) {
      setHasText(true)
    } else {
      setHasText(false)
    }
  }, [password])

  const handleLogIn = useCallback(async () => {
    try {
      setLoading(true)
      const schema = Yup.object().shape({
        email: Yup.string().email('Digite um email válido').required('E-mail é obrigatório'),
        password: Yup.string().required('Senha é obrigatória')
      })

      const data = { email, password }

      await schema.validate(data, {
        abortEarly: false,
      })

      await signIn({
        email: data.email,
        password: data.password,
        remember: toggleCheckBox,
      })

      setLoading(false)
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        Alert.alert(error.message)

        setLoading(false)
        return
      }
      setLoading(false)
      Alert.alert('Ops! Algo deu errado.', 'Houve um problema com seu login. Tente novamente')
    }
  }, [email, password, navigate, toggleCheckBox])

  return (
    <Container>
      <KeyboardAvoidingView 
        style={{flex: 1}}
        behavior= {Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
      <Header image={Logo}>
          <HeaderText>Sua plataforma de estudos online</HeaderText>
      </Header>
      <Content>
        <Title>
          <TitleText>
            Fazer login
          </TitleText>
            <BorderlessButton onPress={() => navigate('CreateAccount-Name')}>
              <ButtonText>Criar uma conta</ ButtonText>
            </BorderlessButton>
        </Title>

        <>
          <Input 
            label='E-mail'
            keyboardType='email-address' 
            autoCapitalize='none'
            onChangeText={(e) => setEmail(e)}
            value={email}
            autoCorrect={false}
            DivStyle={{
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          />
          <Input 
            label='Senha' 
            autoCapitalize="none"
            onChangeText={(e) => setPassword(e)}
            value={password}
            icon="eye"
            DivStyle={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 8,
              borderBottomLeftRadius: 8,
              marginTop: -1
            }}
          />
        </>
        <RememberContainer>
          <Remember>
            <CheckBox 
              isChecked={toggleCheckBox}
              onClick={() => setToggleCheckBox(!toggleCheckBox)}
            />
            <RememberText>Lembrar-me</RememberText>
          </Remember>
          <BorderlessButton onPress={() => navigate('ForgotPassword')}>
            <ButtonRememberText>Esqueci minha senha</ButtonRememberText>
          </BorderlessButton>
        </RememberContainer>
        <Button text='Entrar' onPress={handleLogIn} haveText={hasText} loading={loading} />
      </Content>
      </KeyboardAvoidingView>
    </Container>
  )
} 

export default LogIn;