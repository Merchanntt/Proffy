import styled, {css} from 'styled-components/native'

interface FocusInputProps {
  isFocused: boolean
}

interface FocusLabelProps {
  isFocused: boolean
  hasText: boolean
  textArea?: boolean
}

export const Container = styled.View`
  background-color: #fafafc;
  border: 1px solid #e6e6f0;
  border-radius: 8px;
  height: 64px;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

export const Focus = styled.View<FocusInputProps>`
  ${props => props.isFocused && css`
    height: 40px;
    width: 2px;
    background-color: #8257E5 ;
    position: absolute;
    left: -1px;
`}
`;

export const TextLabel = styled.Text<FocusLabelProps>`
  position: absolute;
  flex: 1;
  padding: 10px;
  font-family: 'Poppins_400Regular';
  color: #9C98A6;

  ${({isFocused}) => isFocused && css`
    transform: scale(0.7) translateY(-16px) translateX(-7px);
  `}

  ${({hasText}) => hasText && css`
    transform: scale(0.7) translateY(-16px) translateX(-7px);
  `}

  ${({textArea}) => textArea && css`
    top: 5px;
    left: 4px;
  `}
`

export const Input = styled.TextInput`
  flex: 1;
  padding: 10px;
  font-family: 'Poppins_400Regular';
  color: #9C98A6;
  margin-top: 8px;
`;