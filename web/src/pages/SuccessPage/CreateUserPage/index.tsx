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

const CreateUserSuccessPage: React.FC = () => {
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
                Cadastro concluído
              </h1>
              <p>
                Agora você faz parte da plataforma da Proffy. Tenha uma ótima experiência.
              </p>
              <Button
                label="Fazer login"
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

export default CreateUserSuccessPage;
