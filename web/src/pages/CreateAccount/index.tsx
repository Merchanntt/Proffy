import React, {
  useState, useEffect, useCallback, FormEvent,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import LogoImg from '../../assets/images/logo.svg';
import LogInBackground from '../../assets/images/success-background.svg';
import BackIcons from '../../assets/images/icons/back.svg';

import PurpleHeart from '../../assets/images/icons/purple-heart.svg';
import api from '../../services/api';

import Input from '../../components/Input';
import LogInput from '../../components/LogInput';
import Button from '../../components/Button';

import {
  Container,
  Content,
  ContainerAnimation,
  ChevronContainer,
  BackgroundContainer,
} from './styles';

const CreateAccountPage: React.FC = () => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleForgetPassword = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    await api.post('users', {
      name,
      lastname,
      email,
      password,
    });

    history.push('/success-user');
  }, [name, lastname, email, password, history]);

  return (
    <div id="page-forgot-password">
      <Container>
        <Content>
          <ContainerAnimation>
            <ChevronContainer>
              <Link to="/">
                <FiArrowLeft size={20} color="#8257E5" />
              </Link>
            </ChevronContainer>
            <form onSubmit={handleForgetPassword}>
              <h1>Cadastro</h1>
              <p>
                Preencha os dados abaixo
                {' '}
                <br />
                {' '}
                para começar.
              </p>
              <div>
                <LogInput
                  label="Nome"
                  name="name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); }}
                />
                <LogInput
                  label="Sobrenome"
                  name="lastname"
                  value={lastname}
                  onChange={(e) => { setLastname(e.target.value); }}
                />
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
              <Button
                label="Cadastrar"
                type="submit"
              />
            </form>
          </ContainerAnimation>
        </Content>
        <BackgroundContainer>
          <div className="logo-container">
            <img src={LogoImg} alt="Proffy" />
            <h2>Sua Plataforma de estudos online.</h2>
          </div>
        </BackgroundContainer>
      </Container>
    </div>
  );
};

export default CreateAccountPage;
