import React, { useEffect, useRef, useCallback } from 'react';
import Lottie from 'lottie-web';

import { useHistory } from 'react-router-dom';
import Button from '../../../components/Button';
import CheckAnimation from '../../../assets/images/CheckAnimation.json';

import {
  Container,
  Content,
  ContainerAnimation,
  Animation,
  BackgroundContainer,
} from '../styles';

const ResetPasswordSuccessPage: React.FC = () => {
  const element = useRef<HTMLDivElement>(null);

  const history = useHistory();

  useEffect(() => {
    if (element.current) {
      Lottie.loadAnimation({
        container: element.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: CheckAnimation,
      });
    }
  }, []);

  const handleNavigateClient = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <div id="page-create-account">
      <Container>
        <BackgroundContainer>
          <Content>
            <ContainerAnimation>
              <Animation ref={element} />
              <h1>
                Redefinição concluída!
              </h1>
              <p>
                Você ja pode voltar aos seus estudos.
              </p>
              <Button
                label="Voltar ao login"
                type="button"
                onClick={handleNavigateClient}
              />
            </ContainerAnimation>
          </Content>
        </BackgroundContainer>

      </Container>
    </div>
  );
};

export default ResetPasswordSuccessPage;
