import React, { useState, useCallback, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import LoadingBar from 'react-top-loading-bar';
import api from '../../services/api';

import LogoImg from '../../assets/images/logo.svg';

import LogInput from '../../components/LogInput';
import Button from '../../components/Button';

import {
  Container,
  Content,
  ContainerAnimation,
  ChevronContainer,
  BackgroundContainer,
} from './styles';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [progress, setProgress] = useState(0);

  const history = useHistory();

  const handleForgetPassword = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    setProgress(progress + 70);
    await api.post('/send-email', {
      email,
    });

    setProgress(100);
    history.push('/success-send');
  }, [history, email, progress]);

  return (
    <Container>
      <LoadingBar progress={progress} color="#04D361" loaderSpeed={4000} />
      <Content>
        <ContainerAnimation>
          <ChevronContainer>
            <Link to="/">
              <FiArrowLeft size={20} color="#8257E5" />
            </Link>
          </ChevronContainer>
          <form onSubmit={handleForgetPassword}>
            <h1>
              Eita, esqueceu
              {' '}
              <br />
              {' '}
              sua senha?
            </h1>
            <p>
              Não esquenta, vamos dar um jeito nisso.
            </p>
            <div>
              <LogInput
                label="E-mail"
                name="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); }}
              />
            </div>
            <Button
              label="Enviar"
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
  );
};

export default ForgotPasswordPage;
