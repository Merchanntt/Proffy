import React, { useState, useCallback, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { FiCamera } from 'react-icons/fi';

import Header from '../../components/Header';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';

import WarningImage from '../../assets/images/icons/warning.svg';

import './styles.css';
import { NameInput, ContactInput } from './styled';

const UserPerfil: React.FC = () => {
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [scheduleItem, setScheduleItem] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  const history = useHistory();

  const handleNewScheduleItem = useCallback(() => {
    setScheduleItem([...scheduleItem, {
      week_day: 0, from: '', to: '',
    }]);
  }, [scheduleItem]);

  const setNewScheduleItem = useCallback((position: number, field: string, value: string) => {
    const updatedScheduleItems = scheduleItem.map((item, index) => {
      if (index === position) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setScheduleItem(updatedScheduleItems);
  }, [scheduleItem]);

  const handleCreateFormClass = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    try {
      await api.post('classes', {
        name,
        avatar,
        whatsapp,
        bio,
        schedule: scheduleItem,
      });

      history.push('/success-class');
    } catch (err) {
      throw new Error('Ocorreu um erro ao cadastrar a aula. Tente novamente');
    }
  }, [
    name,
    avatar,
    whatsapp,
    bio,
    scheduleItem,
    history,
  ]);

  return (
    <div id="page-teacher-form" className="container">
      <Header
        header="Meu perfil"
      >
        <div className="photo-container">
          <img src="https://avatars1.githubusercontent.com/u/62671334?s=460&u=91206c73c0af9f7d8e39295255531539351f5ff3&v=4" alt="mylove" />
          <div className="icon">
            <button type="button">
              <FiCamera size={16} />
            </button>
          </div>
        </div>
        <p>Adolfo Cornelius</p>
      </Header>
      <main>
        <form onSubmit={handleCreateFormClass}>

          <fieldset>
            <legend>Seus Dados</legend>
            <NameInput>
              <Input
                label="Nome"
                name="name"
                value={name}
                onChange={(e) => { setName(e.target.value); }}
              />
              <Input
                label="Sobrenome"
                name="lastname"
                value={lastname}
                onChange={(e) => { setLastName(e.target.value); }}
              />
            </NameInput>
            <ContactInput>
              <Input
                label="E-mail"
                name="e-mail"
                value={email}
                onChange={(e) => { setEmail(e.target.value); }}
              />
              <Input
                label="WhatsApp"
                name="whatsapp"
                value={whatsapp}
                onChange={(e) => { setWhatsapp(e.target.value); }}
              />
            </ContactInput>

            <TextArea
              label="Biografia"
              name="bio"
              value={bio}
              onChange={(e) => { setBio(e.target.value); }}
            />

          </fieldset>

          <fieldset>
            <legend>
              Meus Horários
              <button type="button" onClick={handleNewScheduleItem}>
                + Novo Horário
              </button>
            </legend>
            {scheduleItem.map((item, index) => (

              <div key={item.week_day} className="schedule-item">
                <Select
                  label="Dias da semana"
                  name="week_day"
                  value={item.week_day}
                  onChange={(e) => setNewScheduleItem(index, 'week_day', e.target.value)}
                  options={[
                    { value: '0', label: 'Domingo' },
                    { value: '1', label: 'Segunda-Feira' },
                    { value: '2', label: 'Terça-Feira' },
                    { value: '3', label: 'Quarta-Feira' },
                    { value: '4', label: 'Quinta-Feira' },
                    { value: '5', label: 'Sexta-Feira' },
                    { value: '6', label: 'Sábado' },
                  ]}
                />

                <Input
                  label="Dás"
                  name="from"
                  type="time"
                  value={item.from}
                  onChange={(e) => setNewScheduleItem(index, 'from', e.target.value)}
                />
                <Input
                  label="Até"
                  name="to"
                  type="time"
                  value={item.to}
                  onChange={(e) => setNewScheduleItem(index, 'to', e.target.value)}
                />

                <button type="button">
                  Excluir Horário
                </button>
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={WarningImage} alt="Warning" />
              Importante!
              {' '}
              <br />
              Preencha todos os dados
            </p>
            <button type="submit">
              Salvar perfil
            </button>
          </footer>
        </form>
      </main>
    </div>

  );
};

export default UserPerfil;
