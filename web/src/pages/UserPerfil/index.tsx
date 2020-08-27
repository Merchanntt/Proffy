import React, {
  useState, useCallback, FormEvent, ChangeEvent, useEffect,
} from 'react';
import { FiCamera } from 'react-icons/fi';
import LoadingBar from 'react-top-loading-bar';

import Header from '../../components/Header';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';
import { useAuth } from '../../hooks/AuthContext';

import WarningImage from '../../assets/images/icons/warning.svg';
import DefaultUser from '../../assets/images/DefaultProfile.jpg';

import './styles.css';
import { NameInput, ContactInput } from './styled';

const UserPerfil: React.FC = () => {
  const { user, UpdateAvatar } = useAuth();

  const [name, setName] = useState(user.name);
  const [lastname, setLastName] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [whatsapp, setWhatsapp] = useState(user.whatsapp);
  const [bio, setBio] = useState(user.bio);

  const [progress, setProgress] = useState(0);

  const [scheduleItem, setScheduleItem] = useState([
    {
      id: '', week_day: 0, from: '', to: '',
    },
  ]);

  useEffect(() => {
    api.get('/users/classes-schedule').then((response) => {
      console.log(response.data);
      setScheduleItem(response.data);
    });
  }, []);

  const handleNewScheduleItem = useCallback(() => {
    setScheduleItem([...scheduleItem, {
      id: '', week_day: 0, from: '', to: '',
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

  const handleSendAvatar = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const data = new FormData();

      data.append('avatar', e.target.files[0]);

      api.patch('/users/avatar', data).then((response) => {
        setProgress(progress + 100);
        UpdateAvatar(response.data);
      });
    }
  }, [UpdateAvatar, progress]);

  const handleDeleteSchedule = useCallback((id: string) => {
    api.delete(`users/classes-schedule/${id}`);

    setScheduleItem(scheduleItem.filter((item) => item.id !== id));
  }, [scheduleItem]);

  const handleUpdateUser = useCallback((e: FormEvent) => {
    e.preventDefault();

    try {
      setProgress(progress + 70);
      api.put('users/profile', {
        name,
        lastname,
        email,
        whatsapp,
        bio,
      }).then((response) => {
        UpdateAvatar(response.data);
      });

      const schedule = scheduleItem.map((item) => ({
        id: item.id,
        week_day: item.week_day,
        to: item.to,
        from: item.from,
      })).pop();

      api.put('users/classes-schedule', schedule);

      window.scroll({ top: 0 });
      setProgress(100);
      alert('Seu perfil foi atualizado!');
    } catch (err) {
      throw new Error('Ocorreu um erro ao cadastrar a aula. Tente novamente');
    }
  }, [
    name,
    lastname,
    email,
    whatsapp,
    bio,
    scheduleItem,
    UpdateAvatar,
    progress,
  ]);

  return (
    <div id="page-teacher-form" className="container">
      <LoadingBar progress={progress} color="#04D361" loaderSpeed={1000} />

      <Header
        header="Meu perfil"
      >
        <div className="photo-container">
          <img src={user.avatar ? user.avatar : DefaultUser} alt={user.name} />
          <div className="icon">
            <label htmlFor="avatar">
              <FiCamera size={16} />
              <input type="file" id="avatar" onChange={handleSendAvatar} />
            </label>
          </div>
        </div>
        <p>
          {user.name}
          {' '}
          {user.lastname}
        </p>
      </Header>
      <main>
        <form onSubmit={handleUpdateUser}>

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
              description="(Máximo 300 caracteres)"
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

              <div key={item.id} className="schedule-item">
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
                <div className="step" />

                <button type="button" onClick={() => handleDeleteSchedule(item.id)}>
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
