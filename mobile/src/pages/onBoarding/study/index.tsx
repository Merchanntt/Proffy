import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {Feather} from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler'

import Header from '../../../components/PagesHeader'
import study from '../../../assets/images/icons/study.png'

import {Container, Content, TextIndex, TextInfo, Bottom, CirclesContainer} from './styles'

const OnBoardingStudy: React.FC = () => {
  const {navigate} = useNavigation()

  return (
    <Container>
      <Header image={study} />
      <Content>
        <TextIndex>
          01.
        </TextIndex>
        <TextInfo>
          Encontre vários professores para ensinar você
        </TextInfo>
        <Bottom>
          <CirclesContainer>
          <Feather name='circle' size={10} style={{marginRight: 4, color: '#8257e5'}}/>
          <Feather name='circle' size={10} style={{color:'#6A6180', opacity: 0.3}}/>
          </CirclesContainer>
        </Bottom>
      </Content>
    </Container>
  )
} 

export default OnBoardingStudy;