import React from 'react';

import Header from '../../components/Header';
import Input from '../../components/Input';

import WarningImage from '../../assets/images/icons/warning.svg';
import './styles.css';

const TeacherForm: React.FC = () => (
  <div id="page-teacher-form" className="container">
    <Header
      title="Que incrível que você quer dar aulas."
      description="O primeiro passo, é preencher esse formulário de incrição."
    />
    <main>
      <fieldset>
        <legend>Seus Dados</legend>

        <Input label="Nome completo" name="name" />
        <Input label="Foto de Perfil" name="avatar" />
        <Input label="WhatsApp" name="whatsapp" />

      </fieldset>

      <fieldset>
        <legend>Sobre as aulas</legend>

        <Input label="Matéria" name="subject" />
        <Input label="Custo da sua hora por aula" name="cost" />

      </fieldset>

      <footer>
        <p>
          <img src={WarningImage} alt="Warning" />
          Importante!
          {' '}
          <br />
          Preencha todos os dados
        </p>
        <button type="button">
          Salvar cadastro
        </button>
      </footer>
    </main>
  </div>

);

export default TeacherForm;
