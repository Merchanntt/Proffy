import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, Alert, LayoutAnimation, Animated} from 'react-native'
import { ScrollView, BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'
import * as Animatable from 'react-native-animatable'

import Header from '../../components/Header'
import ClassItem, { TeacherInfoData, day } from '../../components/ClassItem'
import Picker from '../../components/Picker'
import {subjects, date} from '../../utils/PickerArrays'

import styles from './styles'
import api from '../../services/api'

const ClassesListPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)
  const scrollY = new Animated.Value(0)

  const [subject, setSubject] = useState('')
  const [week_day, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  const [total, setTotal] = useState(0)

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
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)

    setIsVisible(!isVisible)
  }, [isVisible])

  const handleSearchClassesList = useCallback(async () => {
    handleLoadFavoriteClassesFromStorage()
    try {
      const response = await api.get('users/classes', {
        params: {
          subject,
          week_day,
          time
        }
      })

      setClassesList(response.data)
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      setIsVisible(false)
    } catch(err) {
      return Alert.alert('Desculpe!!', 'Mas não encontramos nenhum proffy para você. Tente Novamente')
    }
  }, [subject, week_day, time])

  useEffect(() => {
    api.get('users/classes/total').then(response => {
      const { total } = response.data;
      setTotal(total)
    })
  }, [])

  const handleButtonOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  })

  const handleButtonHeight = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [56, 0],
    extrapolate: 'clamp',
  })

 return (
   <View style={styles.container} >
     <Header 
      title='Proffys disponíveis'
      pageStatus='Estudar'
      total={total}
      counterName= 'Proffys'
      headerRight={(
        <Animated.View 
          style={{
            position: 'relative', 
            opacity: handleButtonOpacity,
            height: handleButtonHeight
          }}>

        <BorderlessButton style={styles.filterButton} onPress={handleOpenSearchForm}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Feather name='filter' size={20} color='#04D361'/>
            <Text style={styles.filterText}>Filtrar por dia, hora e matéria</Text>
            <View style={styles.border}/>
          </View>
          <Feather name={isVisible ? 'chevron-up' : 'chevron-down'} size={16} color='#A380F6'/>
        </BorderlessButton>
      </Animated.View>
      )}
     >
      {isVisible && (
        <Animatable.View 
          style={styles.searchForm}
          animation='zoomIn'
          useNativeDriver
          duration={300}
        > 
          <Text style={styles.label}>Matérias</Text>
            <Picker 
              title='Qual a matéria?'
              value={subject}
              onValueChange={text => setSubject(text)}
              items={
                subjects.map(({value}) => {
                  return { label: `${value}`, value: `${value}`}
                })
              }
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                  <Picker 
                    title='Qual o dia?'
                    value={week_day}
                    onValueChange={text => setWeekDay(text)}
                    items={
                      day.map((days, index) => {
                        return { label: `${days}`, value: `${index}`}
                      })
                    }
                  />
              </View>
              

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <Picker 
                    title='Qual horário?'
                    value={time}
                    onValueChange={text => setTime(text)}
                    items={
                      date.map(({value}) => {
                        return { label: `${value}`, value: `${value}`}
                      })
                    }
                  />
              </View>
          </View>

          <RectButton style={styles.button} onPress={handleSearchClassesList}>
            <Text style={styles.buttonText}>Encontrar proffy!</Text>
          </RectButton>

        </Animatable.View>
      )}  
     </Header>

     <ScrollView 
      style={styles.itemlist}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [
          {nativeEvent: {contentOffset: {y: scrollY}}}
        ],
        {useNativeDriver: false}
      )}
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