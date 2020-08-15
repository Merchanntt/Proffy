import styled, { keyframes } from 'styled-components';

import BackgroundImage from '../../assets/images/BackgroundLogIn.svg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  width: 100vw;
`;

export const BackgroundContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background: url(${BackgroundImage}) no-repeat center;
  background-size: 40%;
  background-color: var(--color-primary);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin-top: 32px;
  height: 90vh;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ContainerAnimation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${appearFromRight} 1s;
  form {
    width: 340px;
    text-align: center;
    color: #fff;

    h1 {
      display: flex;
      flex: 1;
      margin-bottom: 8px;
    }
    P {
      display: flex;
      text-align: start;
      margin-bottom: 32px;
    }
  }
`;
