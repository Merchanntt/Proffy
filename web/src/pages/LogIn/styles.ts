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
  background-size: 60%;
  background-color: var(--color-primary);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const ContainerAnimation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${appearFromRight} 1s;
  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    h1 {
      display: flex;
      flex: 1;
      margin-bottom: 24px;
      margin-right: 0;
    }
  }
  a {
    color: var(--color-text-complement);
    display: block;
    margin-top: 24px;
    font-size: 14px;
    text-decoration: none;
    transition: opacity 0.3s;
    :hover {
      opacity: 0.8;
    }
  }
`;

export const RememberContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CheckContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 24px;
  align-items: center;

  p {
    font-size: 14px;
    color: var(--color-text-complement);
    margin-left: 8px;
  }
`;

export const Footer = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 110px;

  span {
    display: flex;
    font-size: 1.4rem;
  }
`;

export const LogOn = styled.div`
  display: flex;
  flex-direction: column;

  a {
    color: var(--color-primary);
    display: block;
    margin-top: 1px;
    transition: opacity 0.3s;
    font-weight: bold;
  }
`;

export const MessageContainer = styled.div`
  > span {
    font-size: 1.2rem;
    margin-top: 2px;
  }
  img {
    margin-left: 4px;
    margin-right: 0;
  }
`;
