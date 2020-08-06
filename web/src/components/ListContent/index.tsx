import React from 'react';

import WhatsAppIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const ListContent: React.FC = () => (
  <article className="teacher-item">
    <header>
      <img src="https://avatars1.githubusercontent.com/u/62671334?s=460&u=91206c73c0af9f7d8e39295255531539351f5ff3&v=4" alt="Avatar" />
      <div>
        <strong>Adolfo Cornelius</strong>
        <span>Física</span>
      </div>
    </header>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      <br />
      {' '}
      <br />
      Soluta facere iure, illo, aliquam cum, nihil odio totam provident saepe quos inventore obcaecati error non. Ratione rem porro eveniet illum. Possimus!
    </p>

    <footer>
      <p>
        Preço/Hora
        <strong>R$ 80,00</strong>
      </p>
      <button type="button">
        <img src={WhatsAppIcon} alt="whatsapp" />
        Entrar em contato
      </button>
    </footer>
  </article>
);

export default ListContent;
