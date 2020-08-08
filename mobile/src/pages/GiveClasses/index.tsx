import React from 'react'
import { RectButton } from 'react-native-gesture-handler';
import { View, ImageBackground, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import GiveClassesBackground from '../../assets/images/give-classes-background.png'

import styles from './styles';

const GiveClasses: React.FC = () => {
  const {goBack} = useNavigation()

  return (
    <View style={styles.container}>
      <ImageBackground resizeMode='contain' source={GiveClassesBackground} style={styles.content}>
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor na nossa plataforma web.
        </Text>
      </ImageBackground>
      <RectButton onPress={() => goBack()} style={[styles.button]}>
          <Text style={styles.buttonText}>Tudo bem</Text>
        </RectButton>
    </View>
  )
} 

export default GiveClasses;