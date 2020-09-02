import React, { useCallback, useState, useEffect } from 'react'
import { View, Image, Text, Linking } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { FontAwesome5, Feather } from '@expo/vector-icons'

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

interface ScheduleData {
  id: number;
  week_day: string;
  to: string;
  from: string;
}

const day = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

const ClassItem: React.FC<ClassTeacherProps> = ({classTeacher, favorite}) => {
  const [isFavorite, setIsFavorite] = useState(favorite)
  const [schedule, setSchedule] = useState<ScheduleData[]>([])

  useEffect(() => {
    api.get(`users/classes-schedule/classes/${classTeacher.id}`).then(response => {
      const formatedSchedule = response.data.map((item: ScheduleData) => ({
        id: item.id, 
        week_day: day[Number(item.week_day)],
        from: item.from.split(':')[0],
        to: item.to.split(':')[0]
      }))

      setSchedule(formatedSchedule)
    })
  }, [])

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

      <View style={{borderBottomWidth: 1, borderColor: '#E6E6F0'}}>
        <Text style={styles.description}>
          {classTeacher.bio}
        </Text>
      </View>

      <View style={styles.schedule}>

          <View style={styles.scheduleLabelContainer}>
            <Text style={styles.scheduleLabel}>Dia</Text>
            <Text style={styles.scheduleLabel}>Horário</Text>
          </View>

          {schedule.map(item => (
            <View style={styles.scheduleInfo} key={item.id}>
            <Text style={styles.scheduleDayText}>{item.week_day}</Text>
            <View style={styles.scheduleArrowContainer}>
              <View style={styles.scheduleArrow}/>
              <Feather 
                name='chevron-right' 
                color='#E6E6F0' size={20} 
                style={{marginLeft: -8, marginTop: 1}}/>
            </View>
            <Text style={styles.scheduleText}>{item.from}h - {item.to}h</Text>
          </View>
          ))}
      </View>

      <View style={styles.footer}>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>Preço da minha hora:</Text>
          <Text style={styles.priceValue}>R$ {classTeacher.cost} reais</Text>
        </View>

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