import React, { useState, useCallback, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';

import WarningImage from '../../assets/images/icons/warning.svg';

import './styles.css';

const TeacherForm: React.FC = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

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
        subject,
        cost: Number(cost),
        schedule: scheduleItem,
      });
      alert('Cadastro feito com sucesso!');

      history.push('/');
    } catch (err) {
      throw new Error('Ocorreu um erro ao cadastrar a aula. Tente novamente');
    }
  }, [
    name,
    avatar,
    whatsapp,
    bio,
    subject,
    cost,
    scheduleItem,
    history,
  ]);

  return (
    <div id="page-teacher-form" className="container">
      <Header
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo, é preencher esse formulário de incrição."
      />
      <main>
        <form onSubmit={handleCreateFormClass}>

          <fieldset>
            <legend>Seus Dados</legend>

            <Input
              label="Nome completo"
              name="name"
              value={name}
              onChange={(e) => { setName(e.target.value); }}
            />
            <Input
              label="Foto de Perfil"
              name="avatar"
              value={avatar}
              onChange={(e) => { setAvatar(e.target.value); }}
            />
            <Input
              label="WhatsApp"
              name="whatsapp"
              value={whatsapp}
              onChange={(e) => { setWhatsapp(e.target.value); }}
            />
            <TextArea
              label="Biografia"
              name="bio"
              value={bio}
              onChange={(e) => { setBio(e.target.value); }}
            />

          </fieldset>

          <fieldset>
            <legend>Sobre as aulas</legend>

            <Select
              label="Matéria"
              name="subject"
              value={subject}
              onChange={(e) => { setSubject(e.target.value); }}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Bíologia', label: 'Bíologia' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'Educação Física', label: 'Educação Física' },
                { value: 'Química', label: 'Química' },
                { value: 'Física', label: 'Física' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Português', label: 'Português' },
                { value: 'História', label: 'História' },
                { value: 'Filosofia', label: 'Filosofia' },
                { value: 'Sociologia', label: 'Sociologia' },
                { value: 'Inglês', label: 'Inglês' },
              ]}
            />
            <Input
              label="Custo da sua hora por aula"
              name="cost"
              value={cost}
              onChange={(e) => { setCost(e.target.value); }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
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
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>

  );
};

export default TeacherForm;
