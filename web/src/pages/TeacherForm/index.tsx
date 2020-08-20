import React, { useState, useCallback, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import * as Yup from 'yup';

import Header from '../../components/Header';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';
import { useAuth } from '../../hooks/AuthContext';

import WarningImage from '../../assets/images/icons/warning.svg';
import DefaultUser from '../../assets/images/DefaultProfile.jpg';

import './styles.css';
import { User, InfoInput, SubjectInput } from './styled';

const TeacherForm: React.FC = () => {
  const [progress, setProgress] = useState(0);

  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItem, setScheduleItem] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  const { user } = useAuth();

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
      setProgress(progress + 70);
      const schema = Yup.object().shape({
        whatsapp: Yup.string().required('WhatsApp obrigatótio').min(10).max(11, 'Digíte um numero válido'),
        bio: Yup.string().required('Biografía obrigatória').max(300, 'Limite de caracteres excêdido'),
        subject: Yup.string().required('Matéria obrigatória'),
        cost: Yup.string().required('Valor obrigatório'),
      });

      const data = {
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItem,
      };

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('classes', data);

      setProgress(100);
      history.push('/success-class');
    } catch (err) {
      console.log(err);
    }
  }, [
    whatsapp,
    bio,
    subject,
    cost,
    scheduleItem,
    history,
    progress,
  ]);

  return (
    <div id="page-teacher-form" className="container">
      <LoadingBar progress={progress} color="#04D361" loaderSpeed={4000} />
      <Header
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo, é preencher esse formulário de incrição."
        header="Dar aulas"
      />
      <main>
        <form onSubmit={handleCreateFormClass}>

          <fieldset>
            <legend>Seus Dados</legend>
            <InfoInput>
              <User>
                <img src={user.avatar ? user.avatar : DefaultUser} alt={user.name} />
                <p>
                  {user.name}
                  {' '}
                  {user.lastname}
                </p>
              </User>
              <Input
                label="WhatsApp"
                name="whatsapp"
                defaultValue={user.whatsapp}
                onChange={(e) => { setWhatsapp(e.target.value); }}
              />
            </InfoInput>

            <TextArea
              label="Biografia"
              name="bio"
              description="(Máximo 300 caracteres)"
              defaultValue={user.bio}
              onChange={(e) => { setBio(e.target.value); }}
            />

          </fieldset>

          <fieldset>
            <legend>Sobre as aulas</legend>
            <SubjectInput>
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
            </SubjectInput>

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
