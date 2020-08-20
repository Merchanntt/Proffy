import React, { useState, useCallback, FormEvent } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import * as Yup from 'yup';

import LogInput from '../../components/LogInput';
import Button from '../../components/Button';

import {
  Container,
  Content,
  ContainerAnimation,
  BackgroundContainer,
} from './styles';
import api from '../../services/api';

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [progress, setProgress] = useState(0);

  const location = useLocation();
  const history = useHistory();

  const handleForgetPassword = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    try {
      setProgress(progress + 70);
      const schema = Yup.object().shape({
        password: Yup.string().min(6, 'A senha precisa ter no mínimo 6 caracteres'),
        passwordConfirmation: Yup.string().oneOf([Yup.ref('password')], 'Confirmação incorreta'),
      });

      await schema.validate({ password, setPassword }, {
        abortEarly: false,
      });

      const tolken = location.search.replace('?token=', '');

      if (!tolken) {
        throw new Error();
      }

      await api.post('reset-password', {
        password,
        tolken,
      });

      setProgress(100);
      history.push('/success-recover');
    } catch (error) {
      alert('Erro ao resetar a senha');
    }
  }, [history, password, passwordConfirmation, location.search]);

  return (
    <Container>
      <LoadingBar progress={progress} color="#04D361" loaderSpeed={2000} />
      <BackgroundContainer>
        <Content>
          <ContainerAnimation>
            <form onSubmit={handleForgetPassword}>
              <h1>
                E agora,
              </h1>
              <p>
                só falta escolher uma nova senha.
              </p>
              <div>
                <LogInput
                  label="Senha"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); }}
                  color="#04D361"
                />
                <LogInput
                  label="Confirmar senha"
                  name="password-confirmation"
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => { setPasswordConfirmation(e.target.value); }}
                  color="#04D361"
                />
              </div>
              <Button
                label="Recuperar"
                type="submit"
              />
            </form>
          </ContainerAnimation>
        </Content>
      </BackgroundContainer>

    </Container>
  );
};

export default ResetPasswordPage;
