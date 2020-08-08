import React from 'react'
import { View } from 'react-native'

import Header from '../../components/Header'

import styles from './styles'

const FavoriteClassesPage: React.FC = () => {
 return (
  <View style={styles.container} >
     <Header title='Meus proffys favoritos' />
  </View>
 ) 
}

export default FavoriteClassesPage;