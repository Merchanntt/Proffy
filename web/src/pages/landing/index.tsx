import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import LogoImg from '../../assets/images/logo.svg';
import LandingImage from '../../assets/images/landing.svg';

import Study from '../../assets/images/icons/study.svg';
import GiveClasses from '../../assets/images/icons/give-classes.svg';
import PurpleHeart from '../../assets/images/icons/purple-heart.svg';
import api from '../../services/api';
import { useAuth } from '../../hooks/AuthContext';

import './styles.css';
import { Header, UserInfo } from './styled';

const LandingPage: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);
  const { user, SignOut } = useAuth();

  useEffect(() => {
    api.get('connections').then((response) => {
      const { total } = response.data;

      setTotalConnections(total);
    });
  }, []);

  const handleLogOut = useCallback(() => {
    SignOut();
  }, [SignOut]);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <Header>
          <UserInfo>
            <img src="https://avatars1.githubusercontent.com/u/62671334?s=460&u=91206c73c0af9f7d8e39295255531539351f5ff3&v=4" alt={user.name} />
            <Link to="/perfil">
              Adolfo Cornelius
            </Link>
          </UserInfo>
          <button type="button" onClick={handleLogOut}>
            <FiPower size={20} />
          </button>
        </Header>
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
