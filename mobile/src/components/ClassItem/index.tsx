import React, { useCallback, useState } from 'react'
import { View, Image, Text, Linking } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'

import HeartOutline from '../../assets/images/icons/heart-outline.png'
import DissmisFavorite from '../../assets/images/icons/unfavorite.png'

import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api'

export interface TeacherInfoData {
  id: number;
  name: string;
  avatar: string;
  subject: string;
  bio: string;
  cost: number;
  whatsapp:string;
}

interface ClassTeacherProps {
  classTeacher: TeacherInfoData;
  favorite: boolean;
}

const ClassItem: React.FC<ClassTeacherProps> = ({classTeacher, favorite}) => {
  const [isFavorite, setIsFavorite] = useState(favorite)

  const handleSendAnWhatsAppMessage = useCallback(() => {
    api.post('connections', {
      user_id: classTeacher.id
    })

    Linking.openURL(`whatsapp://send?phone=${classTeacher.whatsapp}`)
  }, [Linking, classTeacher.whatsapp])

  const handleSetFavoriteTeacher = useCallback(async () => {
    const favorites = await AsyncStorage.getItem('favorites')

    let favoritesArray = []

    if(favorites) {
      favoritesArray = JSON.parse(favorites)
    }

    if(isFavorite) {
      const favoriteIndex = favoritesArray.findIndex((item: TeacherInfoData  ) => {
        return classTeacher.id === item.id 
      })

      favoritesArray.splice(favoriteIndex, 1);

      setIsFavorite(false)
    } else {
      favoritesArray.push(classTeacher)

      setIsFavorite(true)
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
  }, [isFavorite])

  return (
    <View style={styles.container} >
      <View style={styles.profile}>
        <Image 
          style={styles.avatar} 
          source={{ uri: classTeacher.avatar}}
        />
          <View style={styles.PerfilInfo}>
            <Text style={styles.name}>{classTeacher.name}</Text>
            <Text style={styles.subject}>{classTeacher.subject}</Text>
          </View>
      </View>

      <Text style={styles.description}>
        {classTeacher.bio}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/Hora {'   '}
        <Text style={styles.priceValue}>R$ {classTeacher.cost}</Text>
        </Text>
        <View style={styles.buttonsContainer}>
          <RectButton 
            style={[
              styles.favoriteButton, 
              isFavorite ? styles.isFavorite : {}
            ]}
            onPress={handleSetFavoriteTeacher}
            >
            { isFavorite 
              ? <Image source={DissmisFavorite}/>
              : <Image source={HeartOutline}/>
            }
          </RectButton>

          <RectButton 
            style={styles.contactButton} 
            onPress={handleSendAnWhatsAppMessage}
          >
            <FontAwesome5 name='whatsapp' style={{ color: '#fff'}} size={23} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  ) 
}

export default ClassItem;