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

const CreateClassSuccessPage: React.FC = () => {
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
    history.push('/landing');
  }, [history]);

  return (
    <Container>
      <BackgroundContainer>
        <Content>
          <ContainerAnimation>
            <Animation ref={element} />
            <h1>
              Cadastro salvo!
            </h1>
            <p>
              Tudo certo, seu cadastro está na nossa lista de professores.
              Agora é só ficar de olho no seu WhatsApp.
            </p>
            <Button
              label="Voltar ao início"
              type="button"
              onClick={handleNavigateClient}
            />
          </ContainerAnimation>
        </Content>
      </BackgroundContainer>

    </Container>
  );
};

export default CreateClassSuccessPage;
