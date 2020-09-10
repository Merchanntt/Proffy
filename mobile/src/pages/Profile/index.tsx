import React, {useState, useCallback, useEffect, useRef} from 'react';
import { KeyboardAvoidingView, Platform, View, Alert, Animated, ScrollViewProps, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons'
import * as Yup from 'yup'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

import Header from '../../components/Header';
import Input from '../../components/Input';
import Picker from '../../components/Picker';
import Button from '../../components/Button';

import { UseAuth } from '../../hooks/auth';
import { day } from '../../components/ClassItem'
import {date} from '../../utils/PickerArrays'
import api from '../../services/api';

import BackgroundImage from '../../assets/images/HeaderBackground.png'
import DefaultProfile from '../../assets/images/DefaultProfile.jpg'

import { 
    Container, 
    InfoContainer, 
    Avatar,
    SendPhotoButton, 
    UserName,
    Session,
    SessionTitleContainer,
    SessionTitle,
    AddHourButton,
    AddHourButtonText,
    PickerContainer,
    PickerGroupContainer,
    PickerTimeContainer,
    Step,
    DeleteButton,
    DeleteButtonText,
    Footer,
  } from './styles';

const Profile: React.FC = () => {
  const { user, updateUser } = UseAuth()
  const scrollY = new Animated.Value(0)
  const scrollView = useRef<ScrollView>(null)

  const [name, setName] = useState(user.name)
  const [lastname, setLastName] = useState(user.lastname)
  const [email, setEmail] = useState(user.email)
  const [whatsapp, setWhatsapp] = useState(user.whatsapp)
  const [bio, setBio] = useState(user.bio)

  const [scheduleItem, setScheduleItem] = useState([
    {id: '', week_day: 1, from: '', to: ''},
  ])

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get('/users/classes-schedule').then(response => {
      setScheduleItem(response.data)
    })
  }, [])

  const handleNewSchedule = useCallback(() => {
    setScheduleItem([
      ...scheduleItem, { id: '', week_day: 1, from: '', to: '' }
    ])
  }, [scheduleItem])

  const handleUpdateSchedule = useCallback((position: number, field: string, value: string) => {
    const updateSchedule = scheduleItem.map((item, index) => {
      if (position === index ) {
        return {...item, [field]: value}; 
      }
      return item
    })

    setScheduleItem(updateSchedule)
  }, [scheduleItem])

  const handleDeleteSchedule = useCallback((id: string | number) => {
    if(scheduleItem.length === 1) {
      return
    }

    api.delete(`users/classes-schedule/${id}`)

    setScheduleItem(scheduleItem.filter(item => item.id !== id))
  }, [scheduleItem])

  const handleUpdatePhoto = useCallback(async() => {
    if(Platform.OS !== 'web') {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        Alert.alert('Desculpe! Mas precisamos da sua permissão para fazer isso funcionar...')
        return
      }
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      })

      if (!result.cancelled) {
        const data = new FormData()

        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.name}/jpeg`,
          uri: result.uri
        })

        await api.patch('/users/avatar', data).then(response => {
          updateUser(response.data)
        })
      }

    } catch (error) {
      Alert.alert('Ops! Algo deu errado', 'Ocorreu um erro ao atualizar seu avatar. Tente novamente')
    }

  }, [updateUser, user.name])

  const handleUpdateUser = useCallback(async() => {
    try {
      setLoading(true)

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatória'),
        lastname: Yup.string().required('Sobrenome é obrigatória'),
        email: Yup.string().required('Email é obrigatória').email('Digite um e-mail válido'),
        whatsapp: Yup.string()
          .required('WhatsApp é obrigatório')
          .min(10,'Digite um número válido')
          .max(11, 'Digite um número válido'),
        bio: Yup.string().required('Biografía é obrigatória').max(300, 'Limíte de caracteres excêdido'),
      })

      const scheduleSchema = Yup.array(Yup.object().shape({
        week_day: Yup.number().required('Escolha um dia da semana'),
        from: Yup.string().required('Escolha o horário de início da aula'),
        to: Yup.string().required('Escolha o horário de termino da aula'),
    }))

      const data = {
        name,
        lastname,
        email,
        whatsapp,
        bio,
        schedule: scheduleItem,
      }

      await schema.validate(data)
      await scheduleSchema.validate(scheduleItem)

      const response = await api.put('users/profile', data)
      updateUser(response.data)

      const scheduleItems = scheduleItem.map(({id, week_day, from, to}) => ({
        id,
        week_day: Number(week_day),
        from,
        to
      })).pop()

      await api.put('users/classes-schedule', scheduleItems)
      
      setLoading(false)

      Alert.alert('Seu Perfil foi atualizado!')
      scrollView.current?.scrollTo({x: 0, y: 0, animated: true})
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        Alert.alert(error.message)
        setLoading(false)
        return
      }
        setLoading(false)
        Alert.alert('Ops! Algo deu errado.', 'Houve um problema com ao atualizar seu perfil. Tente novamente')
    }
  }, [
      name,
      lastname,
      email,
      whatsapp,
      bio,
      scheduleItem,
  ])

  const handleScroll = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [180, 5],
    extrapolate: 'clamp'
  })

  const handleOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })

  return (
    <Container>
       <KeyboardAvoidingView 
        style={{flex: 1}}
        behavior= {Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
      <Header 
        pageStatus='Meu perfil'
      >
        <Animated.View style={{height: handleScroll}}>
        <InfoContainer source={BackgroundImage} resizeMode='center'>
          <Animated.View 
            style={{
              position: 'relative',
              opacity: handleOpacity
            }}>
            <Avatar source={user.avatar === null ? DefaultProfile : {uri: user.avatar}}/>
            <SendPhotoButton onPress={handleUpdatePhoto}>
              <Feather name='camera' size={20} color='#fff'/>
            </SendPhotoButton>
          </Animated.View>
          <Animated.View 
            style={{
              position: 'absolute',
              top: -30,
              transform: [{translateY: handleScroll}]
            }}>
              <UserName>{user.name}{' '}{user.lastname}</UserName>
          </Animated.View>
        </InfoContainer>
        </Animated.View>
      </Header>

        <Animated.ScrollView
          style={{  
            flex: 1,
            marginTop: -40}}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {nativeEvent: {contentOffset: {y: scrollY}}}
            ],
            {useNativeDriver: false}
          )}
          ref={scrollView}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 8
          }}
        >
          <Session>
          <View style={{padding: 20}}>
            <SessionTitleContainer>
              <SessionTitle>
                Seus Dados
              </SessionTitle>
            </SessionTitleContainer>
              <Input 
              label='Nome'
              value={name}
              onChangeText={(e) => setName(e)}
              DivStyle={{
                marginTop: 20,
              }}
            />

              <Input 
                label='Sobrenome'
                value={lastname}
                onChangeText={(e) => setLastName(e)}
                DivStyle={{
                  marginTop: 20,
                }}
              />

              <Input 
                label='E-mail' 
                autoCapitalize='none'
                onChangeText={(e) => setEmail(e)}
                value={email}
                autoCorrect={false}
                keyboardType='email-address' 
                DivStyle={{
                  marginTop: 20,
                }}
              />

              <Input 
                label='WhatsApp'
                value={whatsapp}
                keyboardType='phone-pad'
                maxLength={11}
                onChangeText={(e) => setWhatsapp(e)}
                DivStyle={{
                  marginTop: 20,
                }}
              />

              <Input 
                label='Bio'
                value={bio}
                onChangeText={(e) => setBio(e)}
                DivStyle={{
                  marginTop: 20,
                  height: 100,
                }}
              />

            <SessionTitleContainer style={{marginTop: 20}}>
              <SessionTitle>
                Horários disponíveis
              </SessionTitle>
              <AddHourButton onPress={handleNewSchedule}>
                <AddHourButtonText>+ Novo</AddHourButtonText>
              </AddHourButton>
            </SessionTitleContainer>
            
            {scheduleItem.map((item, index) => (
              <View key={item.id} style={{position: "relative"}}>
               <PickerContainer>
                <Picker 
                  style={{
                    viewContainer: {backgroundColor: '#FAFAFC', width: '100%'}
                  }}
                  title='Dia da semana'
                  value={item.week_day}
                  onValueChange={(text) => handleUpdateSchedule(index, 'week_day', text)}
                  items={
                    day.map((item, index) => {
                      return { label: `${item}`, value: `${index}` }
                    })
                  }
                />
             </PickerContainer>

                          
              <PickerGroupContainer>
              <PickerTimeContainer>
                <Picker 
                    style={{
                      viewContainer: {backgroundColor: '#FAFAFC', width: '100%'}
                    }}
                    title='Das'
                    value={item.from}
                    onValueChange={(text) => handleUpdateSchedule(index, 'from', text)}
                    items={
                      date.map(({value}) => {
                        return { label: `${value}`, value: `${value}` }
                      })
                    }
                  />
              </PickerTimeContainer>
              <PickerTimeContainer>
                <Picker 
                  style={{
                    viewContainer: {backgroundColor: '#FAFAFC', width: '100%'}
                  }}
                  title='Até'
                  value={item.to}
                  onValueChange={(text) => handleUpdateSchedule(index, 'to', text)}
                  items={
                    date.map(({value}) => {
                      return { label: `${value}`, value: `${value}` }
                    })
                  }
                />
              </PickerTimeContainer>
              </PickerGroupContainer>
              <Step />
              <DeleteButton onPress={() => handleDeleteSchedule(item.id)}>
                <DeleteButtonText>Excluir horário</DeleteButtonText>
              </DeleteButton>
              </View>
            ))}
            </View>
          <Footer>
            <Button 
              text='Salvar alterações'
              loading={loading}
              onPress={handleUpdateUser}
              />
          </Footer>
          </Session>
        </Animated.ScrollView>
      </KeyboardAvoidingView>
    </Container>  
  );
}

export default Profile;