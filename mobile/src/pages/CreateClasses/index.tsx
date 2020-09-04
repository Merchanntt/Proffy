import React, {useState, useCallback} from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Feather } from '@expo/vector-icons'

import Header from '../../components/Header';
import Input from '../../components/Input';
import Picker from '../../components/Picker';
import Button from '../../components/Button';

import { UseAuth } from '../../hooks/auth';
import { day } from '../../components/ClassItem'
import {date, subjects} from '../../utils/PickerArrays'


import { 
    Container, 
    SubTitle,
    InfoContainer, 
    Avatar,
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
    WarningContainer,
    WarningText,
    WarningTitle,
    WarningInfo,
  } from './styles';

const CreateClasses: React.FC = () => {
  const { user } = UseAuth()

  const [whatsapp, setWhatsapp] = useState(user.whatsapp)
  const [bio, setBio] = useState(user.bio)

  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')

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
        pageStatus='Dar aulas'
        title="Que incrível que você quer dar aulas."
      >
        <SubTitle>O primeiro passo, é preencher esse formulário de inscrição.</SubTitle>
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
              <InfoContainer>
                <Avatar source={{uri: user.avatar}}/>
                <UserName>{user.name}{' '}{user.lastname}</UserName>
              </InfoContainer>
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
                Sobre a aula
              </SessionTitle>
            </SessionTitleContainer>

            <PickerContainer>
                <Picker 
                  style={{
                    viewContainer: {backgroundColor: '#FAFAFC', width: '100%'}
                  }}
                  title='Matéria'
                  value={subject}
                  onValueChange={(text) => setSubject(text)}
                  items={
                    subjects.map(({value}) => {
                      return { label: `${value}`, value: `${value}` }
                    })
                  }
                />
              </PickerContainer>

              <Input 
                label='Custo da sua hora aula'
                value={cost}
                keyboardType='decimal-pad'
                returnKeyType='default'
                onChangeText={(e) => setCost(e)}
                DivStyle={{
                  marginTop: 20,
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
              text='Salvar cadastro'
              />
            <WarningContainer>
              <Feather name='alert-octagon' color='#8257e5' size={32}/>
              <WarningText>
                <WarningTitle>Importante!</WarningTitle>
                <WarningInfo>Preencha todos os dados</WarningInfo>
              </WarningText>
            </WarningContainer>
          </Footer>
          </Session>
        </MainForm>
      </KeyboardAvoidingView>
    </Container>  
  );
}

export default CreateClasses;