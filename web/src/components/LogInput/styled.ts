import styled, { css } from 'styled-components';

interface InputProps {
  hasText: Boolean;
}

interface DivProps {
  color?: string;
}

export const WrapperFormField = styled.div<DivProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 72px;
    margin-top: 0.8rem;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: var(--color-input-background);
    border: 1px solid var(--color-line-in-white);
    outline: 0;
    padding: 0 1.6rem;
    font-family: 1.6rem Archivo;

    :focus-within::after {
      height: calc(100% - 3.0rem);
      width: 2px;
      content: '';
      background-color: var(--color-primary-light);
      ${({ color }) => color && css`background-color: ${color};`} ;
      position: absolute;
      left: -0.1rem;
    }

    & + & {
      margin-top: 0;
      border-top-right-radius: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      border-top: 0;
    }

    & + & + & {
      border-radius: 0;
    }

    & + & + & + & {
      border-top-right-radius: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      border-top: 0;
    }

`;

export const LabelText = styled.span`
  color: #9C98A6;
  height: 70px;
  position: absolute;
  top: 0;
  left: 16px;
  display: flex;
  align-items: center;
  transform-origin: 0% 0%;
  font-family: 1.6rem Archivo;
  font-weight: 300;
  transition: transform 0.1s ease-in-out;
`;

export const Input = styled.input<InputProps>`
  background: var(--color-input-background);
  color: #9C98A6;
  display: block;
  width: 100%;
  height: 50px;
  font-family: 1.6rem Archivo;
  outline: 0;
  border: 0;
  resize: none;
  margin-top: 16px;

  :focus + span {
    transform: scale(0.7) translateY(-10px);
  }

    ${({ hasText }) => hasText
    && css`
      +span {
        transform: scale(0.7) translateY(-10px);
      }
    `}
`;
