import React, { useState, useCallback } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useFocusEffect } from '@react-navigation/native'

import Header from '../../components/Header'
import ClassItem, { TeacherInfoData } from '../../components/ClassItem'

import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage'

const FavoriteClassesPage: React.FC = () => {
  const [favorites, setFavorites] = useState([])

  const handleLoadFavoriteClasses = useCallback(() => {
    AsyncStorage.getItem('favorites').then(response => {
      if(response) {
        const allFavorites = JSON.parse(response)

        setFavorites(allFavorites)
      }
    })
  }, [])

  useFocusEffect(
    useCallback(() => {
    handleLoadFavoriteClasses()
    }, [])
  )

 return (
  <View style={styles.container} >
     <Header title='Meus proffys favoritos' />
     <ScrollView 
      style={styles.itemlist}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 8
      }}
    >
      {favorites.map((teacher: TeacherInfoData) => (
        <ClassItem 
          key={teacher.id}
          classTeacher={teacher}
          favorite
        />
      ))}
     </ScrollView>
  </View>
 ) 
}

export default FavoriteClassesPage;