import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {Feather} from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler'

import Header from '../../../components/PagesHeader'
import GiveClasses from '../../../assets/images/icons/give-classes.png'

import {Container, Content, TextIndex, TextInfo, Bottom, CirclesContainer} from './styles'

const OnBoardingClass: React.FC = () => {
  const {navigate} = useNavigation()

  return (
    <Container>
      <Header color='#04d361' image={GiveClasses} />
      <Content>
        <TextIndex>
          02.
        </TextIndex>
        <TextInfo>
          Ou dê aulas sobre o que você mais conhece
        </TextInfo>
        <Bottom>
          <CirclesContainer>
          <Feather name='circle' size={10} style={{color:'#6A6180', opacity: 0.3}}/>
          <Feather name='circle' size={10} style={{marginLeft: 4, color: '#8257e5'}}/>
          </CirclesContainer>
          <BorderlessButton onPress={() => navigate('LogIn')}>
            <Feather name='arrow-right' size={24} color='#6A6180'/>
          </BorderlessButton>
        </Bottom>
      </Content>
    </Container>
  )
} 

export default OnBoardingClass;