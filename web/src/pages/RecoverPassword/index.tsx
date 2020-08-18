import React, { useState, useCallback, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import LogInput from '../../components/LogInput';
import Button from '../../components/Button';

import {
  Container,
  Content,
  ContainerAnimation,
  BackgroundContainer,
} from './styles';

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const history = useHistory();

  const handleForgetPassword = useCallback((e: FormEvent) => {
    e.preventDefault();

    history.push('/success-recover');
  }, [history]);

  return (
    <Container>
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
