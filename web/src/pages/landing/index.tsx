import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import LogoImg from '../../assets/images/logo.svg';
import LandingImage from '../../assets/images/landing.svg';

import Study from '../../assets/images/icons/study.svg';
import GiveClasses from '../../assets/images/icons/give-classes.svg';
import PurpleHeart from '../../assets/images/icons/purple-heart.svg';
import api from '../../services/api';

import './styles.css';

const LandingPage: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then((response) => {
      const { total } = response.data;

      setTotalConnections(total);
    });
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={LogoImg} alt="Proffy" />
          <h2>Sua Plataforma de estudos online.</h2>
        </div>

        <img src={LandingImage} alt="Proffy " className="hero-image" />

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={Study} alt="Study" />
            Estudar
          </Link>
          <Link to="/give-classes" className="give-classes">
            <img src={GiveClasses} alt="classes" />
            Dar aulas
          </Link>
        </div>

        <span className="total-connections">
          Total de
          {' '}
          {totalConnections}
          {' '}
          conexões já realizadas
          {' '}
          <img src={PurpleHeart} alt="PurpleHeart" />
        </span>
      </div>
    </div>
  );
};

export default LandingPage;
