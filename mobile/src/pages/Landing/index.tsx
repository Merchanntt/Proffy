import React, { useCallback, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Image, Text } from 'react-native'
import {RectButton, BorderlessButton} from 'react-native-gesture-handler'
import { UseAuth } from '../../hooks/auth'
import {Feather} from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'

import api from '../../services/api'

import LandingImageBase from '../../assets/images/landing.png'
import StudyIcon from '../../assets/images/icons/study.png'
import ClassesIcon from '../../assets/images/icons/give-classes.png'
import Heart from '../../assets/images/icons/heart.png'

const ButtonAnimated = Animatable.createAnimatableComponent(RectButton)

import styles from './styles'

const Landing: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0)

  const {signOut , user} = UseAuth()

  const {navigate} = useNavigation()

  useEffect(() => {
    api.get('connections').then(response => {
      const { total } = response.data

      setTotalConnections(total)
    })
  }, [])

  const handleNavigateToGiveClassPage = useCallback(() => {
    navigate('GiveClasses')
  }, [])

  const handleNavigateToListClassesPage = useCallback(() => {
    navigate('ClassesList')
  }, [])

  const handleLogOut = useCallback(() => {
    signOut()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <BorderlessButton>
              <Image 
                source={{uri: user.avatar }} 
                style={styles.avatar}
              />
            </BorderlessButton>
            <Text style={styles.userName}>{user.name}{' '}{user.lastname}</Text>
          </View>
          <RectButton onPress={handleLogOut} style={styles.buttonLogOff}>
            <Feather name='power' size={15} color='#D4C2FF'/>
          </RectButton>
        </View>
        <Image 
          source={LandingImageBase} 
          style={styles.banner} 
        />
      </View>
      <View style={styles.bottomContent}>
      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.description}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <ButtonAnimated
          onPress={handleNavigateToListClassesPage}
          style={[styles.button, styles.buttonPrimary]}
          animation='rubberBand' 
          duration={1500}
          useNativeDriver
        >
          <Image source={StudyIcon}/>
          <Text style={styles.buttonText}>Estudar</Text>
        </ButtonAnimated>

        <ButtonAnimated 
          onPress={handleNavigateToGiveClassPage} 
          style={[styles.button, styles.buttonSecondary]}
          animation='rubberBand' 
          duration={2000}
          useNativeDriver
        >
          <Image source={ClassesIcon}/>
          <Text style={styles.buttonText}>Dar aula</Text>
        </ButtonAnimated>
      </View>
        <Text style={styles.connections}>
          Total de {totalConnections} conexões{'\n'}já realizadas {' '}
          <Image source={Heart}/>
        </Text>
        </View>
    </View>
  )
}

export default Landing;