import React from 'react'
import { ImageSourcePropType} from 'react-native'

import Background from '../../assets/images/HeaderBackground.png'

import {Container, ImageContainer, Image, ImageBackground} from './styles'

interface HeaderProps {
  image: ImageSourcePropType;
  color?: string;
}

const PagesHeader: React.FC<HeaderProps> = ({ color, image, children }) => {
  return (
    <Container color={color}>
      <ImageBackground source={Background} resizeMode='repeat'>
        <ImageContainer >
            <Image source={image} resizeMode='contain' />
          {children}
        </ImageContainer>
      </ImageBackground>
    </Container>
  )
} 

export default PagesHeader;