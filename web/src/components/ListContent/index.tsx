import React, {
  useCallback, useState, useEffect,
} from 'react';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import api from '../../services/api';

import './styles.css';
import { ScheduleContainer, ScheduleCard, ScheduleInfo } from './styled';

const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export interface Teacher {
  id: number;
  name: string;
  lastname: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  cost: number;
  subject: string;
}

interface ScheduleData {
  id: number;
  week_day: number | string;
  from: string;
  to: string;
}

interface ListContentProps {
  classes: Teacher
}

const ListContent: React.FC<ListContentProps> = ({ classes }) => {
  const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);

  useEffect(() => {
    const { id } = classes;

    api.get<ScheduleData[]>(`users/classes-schedule/classes/${id}`).then((response) => {
      const schedule = response.data.map((scheduleItem) => ({
        ...scheduleItem, week_day: days[Number(scheduleItem.week_day)],
      }));
      setScheduleData(schedule);
    });
  }, [classes, days]);

  const handleNewConnection = useCallback(() => {
    api.post('connections', {
      user_id: classes.id,
    });
  }, [classes.id]);

  return (
    <article className="teacher-item">
      <header>
        <img src={classes.avatar} alt="Avatar" />
        <div>
          <strong>
            {classes.name}
            {' '}
            {classes.lastname}
          </strong>
          <span>{classes.subject}</span>
        </div>
      </header>

      <p>
        {classes.bio}
      </p>
      <ScheduleContainer>

        {scheduleData.map((item) => (
          <ScheduleCard key={item.id}>
            <ScheduleInfo>
              <p>Dia</p>
              <h1>{item.week_day}</h1>
            </ScheduleInfo>
            <ScheduleInfo>
              <p>Horário</p>
              <h1>
                {item.from}
                {' '}
                -
                {' '}
                {item.to}
              </h1>
            </ScheduleInfo>
          </ScheduleCard>
        ))}
      </ScheduleContainer>

      <footer>
        <p>
          Preço/Hora
          <strong>
            R$
            {' '}
            {classes.cost}
          </strong>
        </p>
        <a target="_blank" onClick={handleNewConnection} href={`https://wa.me/${classes.whatsapp}`}>
          <AiOutlineWhatsApp size={20} />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default ListContent;
