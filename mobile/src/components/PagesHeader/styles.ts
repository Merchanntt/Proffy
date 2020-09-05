import styled from 'styled-components/native'

interface BackgroundProps {
  color?: string;
}

export const Container = styled.View<BackgroundProps>`
  flex: 1;
  background: ${props => props.color ? props.color : '#8257e5'};
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 300px;
`;

export const ImageContainer = styled.View`
  width: 400px;
  align-items: center;
  overflow: hidden;
`

export const ImageBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 30px;
`

export const Image = styled.Image`
  width: 100%;
  height: 80px;
`