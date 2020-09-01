import React, { useState, useEffect, useCallback } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { KeyboardAvoidingView, Platform, View, Alert } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import {Feather} from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import * as Yup from 'yup'
import api from '../../../services/api'

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
  } from './styles';

  interface RouteParams {
    name: string;
    lastname: string;
  }

const CreateAccountCredentials: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [hasText, setHasText] = useState(false)
  const [loading, setLoading] = useState(false)

  const {navigate, goBack} = useNavigation()
  const route = useRoute()

  const routeParams = route.params as RouteParams;

  useEffect(() => {
    password.length >= 6 ? setHasText(true) : setHasText(false)
  }, [password, hasText])

  const handleCreateUser = useCallback(async () => {
    try {
      setLoading(true)
      const schema = Yup.object().shape({
        email: Yup.string().email('Digite um email válido').required('E-mail é obrigatório'),
        password: Yup.string().min(6 ,'Mínimo de 6 caractéres')
      })

      const data = {email, password}

      await schema.validate(data, {
        abortEarly: false,
      })

      const { name, lastname } = routeParams;

      await api.post('create-user', {
        name,
        lastname,
        email: data.email,
        password: data.password
      })

      setLoading(false)
      navigate('SuccessCreateUser')
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        Alert.alert(error.message)

        return
      }

      Alert.alert('Ops! Algo deu errado.', 'Ocorreu um problema com o seu cadastro. Tente novamente ')
    }
  }, [navigate, email, password, routeParams])

  return (
    <Container>
      <StatusBar style='dark'/>
      <KeyboardAvoidingView 
        style={{flex: 1}}
        behavior= {Platform.OS === 'ios' ? 'padding' : undefined}
      >
      <Content>
      <TopBar>
          <BorderlessButton onPress={() => goBack()}>
            <Feather name='arrow-left' size={24} color='#6A6180'/>
          </BorderlessButton>
          <CirclesContainer>
          <Feather name='circle' size={10} style={{marginRight: 4, color:'#6A6180', opacity: 0.3}}/>
          <Feather name='circle' size={10} color='#8257e5' />
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
        <View>
          <Label>
            02. Email e Senha
          </Label>
        </View>
          <Input 
            label='E-mail' 
            autoCapitalize='none'
            onChangeText={(e) => setEmail(e)}
            value={email}
            autoCorrect={false}
            keyboardType='email-address' 
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
            icon="eye"
            onChangeText={(e) => setPassword(e)}
            value={password}
            DivStyle={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 8,
              borderBottomLeftRadius: 8,
              marginTop: -1
            }}
          />
        
        <Button 
          text='Concluir cadastro' 
          onPress={handleCreateUser} 
          haveText={hasText}
          loading={loading}
        />
        </>
        

      </Content>
      </KeyboardAvoidingView>
    </Container>
  )
} 

export default CreateAccountCredentials;