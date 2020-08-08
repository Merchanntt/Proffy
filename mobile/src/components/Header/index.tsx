import React, { useCallback } from 'react'
import { View, Image, Text } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import GoBackButton from '../../assets/images/icons/back.png'
import LogoImage from '../../assets/images/logo.png'

import styles from './styles'

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const {navigate} = useNavigation()

  const handleGoBackButton = useCallback(() => {
    navigate('Landing')
  }, [navigate])

 return (
   <View style={styles.container}>
     <View style={styles.content}>
       <BorderlessButton onPress={handleGoBackButton}>
         <Image source={GoBackButton} resizeMode='contain'/>
       </BorderlessButton>

       <Image source={LogoImage} resizeMode='contain'/>
     </View>
      <Text style={styles.title}>{title}</Text>
   </View>
 ) 
}

export default Header;