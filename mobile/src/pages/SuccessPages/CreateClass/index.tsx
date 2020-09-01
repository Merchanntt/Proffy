import React from 'react'
import { View, ImageBackground, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native'
import { StatusBar } from 'expo-status-bar';

import GiveClassesBackground from '../../../assets/images/give-classes-background.png'
import CheckAnimation from '../../../assets/images/CheckAnimation.json'

import Button from '../../../components/Button'

import styles from './styles';

const CreateClassSuccess: React.FC = () => {
  const {navigate} = useNavigation()

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
        <Text style={styles.title}>Cadastro{'\n'}Salvo!</Text>
        <Text style={styles.description}>
          Tudo certo, seu cadastro está{'\n'}na nossa lista de professores. Agora é só ficar de olho no seu WhatsApp.
        </Text>
        <Button text="Ok" onPress={() => navigate('Landing')} style={styles.button}/>
      </ImageBackground>
      
    </View>
  )
} 

export default CreateClassSuccess;