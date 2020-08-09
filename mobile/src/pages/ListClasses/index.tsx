import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, Alert } from 'react-native'
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'

import Header from '../../components/Header'
import ClassItem, { TeacherInfoData } from '../../components/ClassItem'

import styles from './styles'
import api from '../../services/api'

const ClassesListPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [subject, setSubject] = useState('')
  const [week_day, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  const [classesList, setClassesList] = useState([])
  const [favorites, setFavorites] = useState<number[]>([])

  const handleLoadFavoriteClassesFromStorage = useCallback(() => {
    AsyncStorage.getItem('favorites').then(response => {
      if(response) {
        const allFavorites = JSON.parse(response)
        const favoritesIds = allFavorites.map((teacher: TeacherInfoData) => {
          return teacher.id;
        })

        setFavorites(favoritesIds)
      }
    })
  }, [])

  const handleOpenSearchForm = useCallback(() => {
    setIsVisible(!isVisible)
  }, [isVisible])

  const handleSearchClassesList = useCallback(async () => {
    handleLoadFavoriteClassesFromStorage()
    try {
      const response = await api.get('classes', {
        params: {
          subject,
          week_day,
          time
        }
      })

      setClassesList(response.data)
      setIsVisible(false)
    } catch(err) {
      return Alert.alert('Desculpe!!', 'Mas não encontramos nenhum proffy para você. Tente Novamente')
    }
  }, [subject, week_day, time, isVisible])

 return (
   <View style={styles.container} >
     <Header 
      title='Proffys disponíveis'
      headerRight={(
        <BorderlessButton onPress={handleOpenSearchForm}>
          <Feather name='filter' size={20} color='#fff'/>
        </BorderlessButton>
      )}
     >
      {isVisible && (
        <View style={styles.searchForm}> 
          <Text style={styles.label}>Matérias</Text>
            <TextInput 
              style={styles.input}
              placeholder='Qual a matéria?'
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholderTextColor= '#c1bccc'
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
              <Text style={styles.label}>Dia da semana</Text>
            <TextInput 
              style={styles.input}
              placeholder='Qual dia?'
              value={week_day}
              onChangeText={text => setWeekDay(text)}
              placeholderTextColor= '#c1bccc'
            />
              </View>

            <View style={styles.inputBlock}>
              <Text style={styles.label}>Horário</Text>
            <TextInput 
              style={styles.input}
              placeholder='Qual horário?'
              value={time}
              onChangeText={text => setTime(text)}
              placeholderTextColor= '#c1bccc'
            />
            </View>
          </View>
          <RectButton style={styles.button} onPress={handleSearchClassesList}>
            <Text style={styles.buttonText}>Encontrar proffy!</Text>
          </RectButton>
        </View>
      )}  
     </Header>

     <ScrollView 
      style={styles.itemlist}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 8
      }}
    >
      {classesList.map((teacher: TeacherInfoData) => (
        <ClassItem 
          key={teacher.id} 
          classTeacher={teacher}
          favorite={favorites.includes(teacher.id)}
        />
        ) 
      )}
     </ScrollView>
   </View>
 ) 
}

export default ClassesListPage;