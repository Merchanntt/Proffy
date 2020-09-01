import React, { useCallback, ReactNode } from 'react'
import { View, Image, Text } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import GoBackButton from '../../assets/images/icons/back.png'
import LogoImage from '../../assets/images/Logo.png'

import styles from './styles'

interface HeaderProps {
  title: string;
  headerRight?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, headerRight, children }) => {
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
      <View style={styles.topBar}>
        <Text style={styles.title}>{title}</Text>
        {headerRight}
      </View>
      {children}
   </View>
 ) 
}

export default Header;