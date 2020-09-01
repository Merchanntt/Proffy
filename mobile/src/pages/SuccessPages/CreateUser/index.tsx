import React from 'react'
import { View, ImageBackground, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native'

import GiveClassesBackground from '../../../assets/images/give-classes-background.png'
import CheckAnimation from '../../../assets/images/CheckAnimation.json'

import Button from '../../../components/Button'

import styles from './styles';
import { StatusBar } from 'expo-status-bar';

const CreateUserSuccess: React.FC = () => {
  const {reset} = useNavigation()

  return (
    <View style={styles.container}>
      <StatusBar style='light'/>
      <ImageBackground resizeMode='contain' source={GiveClassesBackground} style={styles.content}>
        <Lottie 
          source={CheckAnimation}
          resizeMode='contain'
          loop= {false}
          autoPlay
          autoSize
          style={{
            marginTop: 'auto',
            width: 100
          }}
        />
        <Text style={styles.title}>Cadastro{'\n'}concluído!</Text>
        <Text style={styles.description}>
          Agora você faz parte da plataforma da Proffy
        </Text>
        <Button text="Fazer login" onPress={() => reset({
          routes: [{name: 'LogIn'}],
          index: 0,
        })} style={styles.button}/>
      </ImageBackground>
      
    </View>
  )
} 

export default CreateUserSuccess;