import React, { useCallback } from 'react';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import api from '../../services/api';

import './styles.css';

export interface Teacher {
  id: number;
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
    cost: number;
    subject: string;
}

interface ListContentProps {
  classes: Teacher
}

const ListContent: React.FC<ListContentProps> = ({ classes }) => {
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
          <strong>{classes.name}</strong>
          <span>{classes.subject}</span>
        </div>
      </header>

      <p>
        {classes.bio}
      </p>

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
