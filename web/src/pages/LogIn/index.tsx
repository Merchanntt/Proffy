import React, { useState, useCallback, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/AuthContext';

import LogoImg from '../../assets/images/logo.svg';

import PurpleHeart from '../../assets/images/icons/purple-heart.svg';

import LogInput from '../../components/LogInput';
import Button from '../../components/Button';

import {
  Container,
  Content,
  ContainerAnimation,
  RememberContainer,
  CheckContainer,
  BackgroundContainer,
  Footer,
  LogOn,
  MessageContainer,
} from './styles';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const history = useHistory();
  const { SignIn } = useAuth();

  const handleLogin = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    try {
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatória'),
        password: Yup.string().required('Senha obrigatória'),
      });

      const data = {
        email,
        password,
      };

      await schema.validate(data, {
        abortEarly: false,
      });

      SignIn({ email, password, remember });

      history.push('/landing');
    } catch (error) {
      console.log(error);
    }
  }, [email, password, history, remember, SignIn]);

  return (
    <Container>
      <BackgroundContainer>
        <div className="logo-container">
          <img src={LogoImg} alt="Proffy" />
          <h2>Sua Plataforma de estudos online.</h2>
        </div>
      </BackgroundContainer>
      <Content>
        <ContainerAnimation>
          <form onSubmit={handleLogin}>
            <h1>Fazer login</h1>
            <div>
              <LogInput
                label="E-mail"
                name="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); }}
              />
              <LogInput
                label="Senha"
                name="password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); }}
              />
            </div>
            <RememberContainer>
              <CheckContainer>
                <input
                  type="checkbox"
                  onChange={() => setRemember(!remember)}
                />
                <p>Lembrar-me</p>
              </CheckContainer>
              <Link to="/forgot-password">
                Esqueci minha senha
              </Link>
            </RememberContainer>
            <Button
              label="Estudar"
              type="submit"
            />
          </form>
          <Footer>
            <LogOn>
              <span>Não tem conta?</span>
              <Link to="/create-account">
                Cadastre-se
              </Link>
            </LogOn>
            <MessageContainer>
              <span>
                É de graça
                <img src={PurpleHeart} alt="PurpleHeart" />
              </span>
            </MessageContainer>
          </Footer>
        </ContainerAnimation>
      </Content>
    </Container>
  );
};

export default LoginPage;
