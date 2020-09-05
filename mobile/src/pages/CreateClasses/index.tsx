import React, {useState, useCallback} from 'react';
import { KeyboardAvoidingView, Platform, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'
import * as Yup from 'yup'

import Header from '../../components/Header';
import Input from '../../components/Input';
import Picker from '../../components/Picker';
import Button from '../../components/Button';

import { UseAuth } from '../../hooks/auth';
import { day } from '../../components/ClassItem'
import {date, subjects} from '../../utils/PickerArrays'
import api from '../../services/api';

import DefaultProfile from '../../assets/images/DefaultProfile.jpg'


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
  const { navigate } = useNavigation()

  const [whatsapp, setWhatsapp] = useState('')
  const [bio, setBio] = useState('')

  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')

  const [scheduleItem, setScheduleItem] = useState([
    {id: '', week_day: 1, from: '', to: ''},
  ])

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

  const handleCreateClasses = useCallback(async() => {
    try {
      const schema = Yup.object().shape({
        whatsapp: Yup.string()
          .required('WhatsApp é obrigatório')
          .min(10,'Digite um número válido')
          .max(11, 'Digite um número válido'),
        bio: Yup.string().required('Biografía é obrigatória').max(300, 'Limíte de caracteres excêdido'),
        subject: Yup.string().required('Escolha uma matéria'),
        cost: Yup.string().required('Escolha uma valor para a sua aula').max(5),
        schedule: Yup.array(Yup.object().shape({
            week_day: Yup.number().required('Escolha um dia da semana'),
            from: Yup.string().required('Escolha o horário de início da aula'),
            to: Yup.string().required('Escolha o horário de termino da aula'),
        }))
      })

      const data = {
        whatsapp,
        bio,
        subject,
        cost,
        schedule: scheduleItem,
      }

      await schema.validate(data)

      await api.post('users/classes', data)

      navigate('SuccessCreateClass')

    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        Alert.alert(error.message)
        return
      }
        Alert.alert('Ops! Algo deu errado.', 'Houve um problema com o seu cadastro. Tente novamente')
    }
  }, [
      whatsapp,
      bio,
      subject,
      cost,
      scheduleItem,
      navigate
  ])

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
                <Avatar source={user.avatar === null ? DefaultProfile : {uri: user.avatar}}/>
                <UserName>{user.name}{' '}{user.lastname}</UserName>
              </InfoContainer>
              <Input 
                label='WhatsApp'
                value={whatsapp}
                keyboardType='phone-pad'
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
                maxLength={6}
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
              onPress={handleCreateClasses}
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