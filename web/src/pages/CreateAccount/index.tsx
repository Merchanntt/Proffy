import React, {
  useState, useCallback, FormEvent,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';

import LogoImg from '../../assets/images/logo.svg';

import api from '../../services/api';

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

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        lastname: Yup.string().required('Sobrenome é obrigatório'),
        email: Yup.string().required('E-mail é obrigatório').email(),
        password: Yup.string().min(6, 'Mínimo de 6 digitos'),
      });

      const data = {
        name,
        lastname,
        email,
        password,
      };

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('users', data);

      history.push('/success-user');
    } catch (error) {
      console.log(error);
    }
  }, [name, lastname, email, password, history]);

  return (
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
  );
};

export default CreateAccountPage;
