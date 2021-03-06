import React, {
  useState, useCallback, FormEvent, useEffect,
} from 'react';
import LoadingBar from 'react-top-loading-bar';
import api from '../../services/api';
import Header from '../../components/Header';

import ListContent, { Teacher } from '../../components/ListContent';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';

const TeacherList: React.FC = () => {
  const [totalProffy, setTotalProffy] = useState(0);

  const [classes, setClasses] = useState([]);
  const [progress, setProgress] = useState(0);
  const [notFound, setNotFound] = useState(false);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    api.get('users/classes/total').then((response) => {
      const { total } = response.data;
      setTotalProffy(total);
    });
  }, []);

  const handleSearchClass = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    try {
      setProgress(progress + 10);
      const response = await api.get('/users/classes', {
        params: {
          week_day,
          subject,
          time,
        },
      });
      setProgress(100);
      setNotFound(false);
      setClasses(response.data);
    } catch (error) {
      setNotFound(true);
      setProgress(100);
    }
  }, [week_day, subject, time, progress]);

  return (
    <div id="page-teacher-list" className="container">
      <LoadingBar progress={progress} color="#04D361" loaderSpeed={1000} />
      <Header title="Estes são os proffys disponíveis." header="Estudar">
        <div className="proffy-assingns">
          {totalProffy}
          {' '}
          Proffys já cadastrados.
        </div>
        <form id="search-teachers" onSubmit={handleSearchClass}>
          <Select
            label="Matérias"
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

          <Select
            label="Dias da semana"
            name="week_day"
            value={week_day}
            onChange={(e) => { setWeekDay(e.target.value); }}
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
            label="Horário"
            name="time"
            value={time}
            onChange={(e) => { setTime(e.target.value); }}
            type="time"
          />
          <button type="submit">
            Buscar
          </button>
        </form>
      </Header>
      <main>
        {notFound && (
          <div className="not-found">
            <p>
              Nenhum professor encontrado
              {' '}
              <br />
              com sua pesquisa.
            </p>
          </div>
        )}
        {classes.map((item: Teacher) => (
          <ListContent key={item.id} classes={item} />
        ))}
      </main>
    </div>
  );
};

export default TeacherList;
