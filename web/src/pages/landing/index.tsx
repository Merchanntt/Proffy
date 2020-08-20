import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import LoadingBar from 'react-top-loading-bar';

import LogoImg from '../../assets/images/logo.svg';
import LandingImage from '../../assets/images/landing.svg';
import DefaultProfile from '../../assets/images/DefaultProfile.jpg';

import Study from '../../assets/images/icons/study.svg';
import GiveClasses from '../../assets/images/icons/give-classes.svg';
import PurpleHeart from '../../assets/images/icons/purple-heart.svg';

import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';

import './styles.css';
import { Header, UserInfo, UnderPage } from './styled';

const LandingPage: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);
  const { user, SignOut } = useAuth();
  const [progress, setProgress] = useState(0);

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
        <LoadingBar progress={progress} color="#04D361" loaderSpeed={1000} />
        <Header>
          <UserInfo>
            <img src={user.avatar ? user.avatar : DefaultProfile} alt={user.name} />
            <Link to="/perfil">
              {user.name}
              {' '}
              {user.lastname}
            </Link>
          </UserInfo>
          <button type="button" onClick={handleLogOut}>
            <FiPower size={20} />
          </button>
        </Header>
        <div className="logo-container">
          <img src={LogoImg} alt="Proffy" />
          <h2>
            Sua Plataforma de
            {' '}
            <br />
            estudos online.
          </h2>
        </div>

        <img src={LandingImage} alt="Proffy " className="hero-image" />

        <UnderPage className="under-page">
          <div>
            <h2>Seja bem-vindo.</h2>
            <h1>O que deseja fazer?</h1>
          </div>
          <span className="total-connections">
            Total de
            {' '}
            {totalConnections}
            {' '}
            conexões
            {' '}
            <br />
            {' '}
            já realizadas
            {' '}
            <img src={PurpleHeart} alt="PurpleHeart" />
          </span>
          <div className="buttons-container">
            <Link to="/study" className="study" onClick={() => setProgress(progress + 90)}>
              <img src={Study} alt="Study" />
              Estudar
            </Link>
            <Link to="/give-classes" className="give-classes" onClick={() => setProgress(progress + 90)}>
              <img src={GiveClasses} alt="classes" />
              Dar aulas
            </Link>
          </div>

        </UnderPage>

      </div>
    </div>
  );
};

export default LandingPage;
