import React, {useState, useCallback} from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Feather } from '@expo/vector-icons'

import Header from '../../components/Header';
import Input from '../../components/Input';
import Picker from '../../components/Picker';
import Button from '../../components/Button';

import { UseAuth } from '../../hooks/auth';
import { day } from '../../components/ClassItem'
import {date} from '../../utils/PickerArrays'

import BackgroundImage from '../../assets/images/HeaderBackground.png'

import { 
    Container, 
    InfoContainer, 
    ImageContainer, 
    Avatar,
    SendPhotoButton, 
    UserName,
    MainForm, 
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
  const { user } = UseAuth()

  const [name, setName] = useState(user.name)
  const [lastname, setLastName] = useState(user.lastname)
  const [email, setEmail] = useState(user.email)
  const [whatsapp, setWhatsapp] = useState(user.whatsapp)
  const [bio, setBio] = useState(user.bio)

  const [scheduleItem, setScheduleItem] = useState([
    {id: '', week_day: 1, from: '', to: ''},
  ])

  console.log(scheduleItem)

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
        <InfoContainer source={BackgroundImage} resizeMode='center'>
          <ImageContainer>
            <Avatar source={{uri: user.avatar}}/>
            <SendPhotoButton>
              <Feather name='camera' size={20} color='#fff'/>
            </SendPhotoButton>
          </ImageContainer>
            <UserName>{user.name}{' '}{user.lastname}</UserName>
        </InfoContainer>
      </Header>
        <MainForm 
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
                    value={item.to}
                    onValueChange={(text) => handleUpdateSchedule(index, 'to', text)}
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
                  value={item.from}
                  onValueChange={(text) => handleUpdateSchedule(index, 'from', text)}
                  items={
                    date.map(({value}) => {
                      return { label: `${value}`, value: `${value}` }
                    })
                  }
                />
              </PickerTimeContainer>
              </PickerGroupContainer>
              <Step />
              <DeleteButton>
                <DeleteButtonText>Excluir horário</DeleteButtonText>
              </DeleteButton>
              </View>
            ))}
            </View>
          <Footer>
            <Button 
              text='Salvar alterações'
              />
          </Footer>
          </Session>
        </MainForm>
      </KeyboardAvoidingView>
    </Container>  
  );
}

export default Profile;