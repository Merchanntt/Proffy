import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Image, Text } from 'react-native'
import {RectButton} from 'react-native-gesture-handler'

import LandingImageBase from '../../assets/images/landing.png'
import StudyIcon from '../../assets/images/icons/study.png'
import ClassesIcon from '../../assets/images/icons/give-classes.png'
import Heart from '../../assets/images/icons/heart.png'

import styles from './styles'

const Landing: React.FC = () => {
  const {navigate} = useNavigation()

  const handleNavigateToGiveClassPage = useCallback(() => {
    navigate('GiveClasses')
  }, [])

  const handleNavigateToListClassesPage = useCallback(() => {
    navigate('ClassesList')
  }, [])

  return (
    <View style={styles.container}>
      <Image source={LandingImageBase} style={styles.banner}/>

      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.description}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          onPress={handleNavigateToListClassesPage}
          style={[styles.button, styles.buttonPrimary]}
        >
          <Image source={StudyIcon}/>
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton 
          onPress={handleNavigateToGiveClassPage} 
          style={[styles.button, styles.buttonSecondary]}
        >
          <Image source={ClassesIcon}/>
          <Text style={styles.buttonText}>Dar aula</Text>
        </RectButton>
      </View>
      <Text style={styles.connections}>
          Total de 200 conexões já realizadas {' '}
          <Image source={Heart}/>
        </Text>
    </View>
  )
}

export default Landing;