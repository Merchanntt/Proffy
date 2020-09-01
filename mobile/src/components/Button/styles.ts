import styled, { css } from 'styled-components/native'
import {RectButton} from 'react-native-gesture-handler'

interface ButtonProps {
  color?: string;
  haveText?: boolean;
}

interface ButtonTextProps {
  haveText?: boolean;
}

export const Button = styled(RectButton)<ButtonProps>`
  align-items: center;
  border-radius: 8px;
  justify-content: center;
  height: 54px;
  background-color: ${props => props.color ? props.color :'#04D361'};
  margin-top: 32px;

  ${props => !props.haveText && css`
    background-color: #DCDCE5;
  `}
`;

export const ButtonText = styled.Text<ButtonTextProps>`
  font-family: 'Archivo_400Regular';
  color: #fff;
  font-size: 16px;

  ${props => !props.haveText && css`
    color: #9C98A6;
  `}
`;