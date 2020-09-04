import React, { useCallback, ReactNode } from 'react'
import { View, Image, Text } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import GoBackButton from '../../assets/images/icons/back.png'
import LogoImage from '../../assets/images/Logo.png'

import styles from './styles'

interface HeaderProps {
  title?: string;
  headerRight?: ReactNode;
  total?: number;
  counterName?: string; 
  pageStatus: string;
}

const Header: React.FC<HeaderProps> = ({ 
    title, 
    headerRight, 
    total = '', 
    counterName, 
    pageStatus,
    children 
  }) => {
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
        <Text style={styles.pageName}>{pageStatus}</Text>
        <Image source={LogoImage} resizeMode='contain' style={{width: 32}}/>
     </View>
      <View style={styles.rest}>
        <View style={styles.topBar}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.counter}>{total}{' '}{counterName}</Text>
          </View>
          {headerRight}
        </View>
          {children}
      </View>
   </View>
 ) 
}

export default Header;