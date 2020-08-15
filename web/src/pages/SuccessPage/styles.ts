import styled from 'styled-components';

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
  background: url(${BackgroundImage}) no-repeat center ;
  background-size: 40%;
  background-color: var(--color-primary);
`;

export const Animation = styled.div`
  width: 200px;
  height: 200px;
  margin-bottom: 12px;
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

export const ContainerAnimation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
    width: 540px;
    text-align: center;

    h1 {
      display: flex;
      flex: 1;
      margin-bottom: 24px;
      color: #fff;
    }
    P {
      display: flex;
      text-align: center;
      color: #D4C2FF;
      margin-bottom: 40px;
  }

  button {
    width: 197px;
  }
`;
