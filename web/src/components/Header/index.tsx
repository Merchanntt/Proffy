import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import Logo from '../../assets/images/logo.svg';
import Back from '../../assets/images/icons/back.svg';

interface HeaderProps {
  title: string;
  description?: string;
}

const Header:React.FC<HeaderProps> = ({ title, description, children }) => (
  <header className="page-header">
    <div className="top-bar-container">
      <Link to="/">
        <img src={Back} alt="back" />
      </Link>
      <img src={Logo} alt="Proffy" />
    </div>

    <div className="header-content">
      <strong>{title}</strong>
      {description && <p>{description}</p>}

      {children}
    </div>
  </header>
);

export default Header;
