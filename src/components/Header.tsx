import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../assets/images/header_logo.png';

interface HeaderProps {
  title: string,
  description: string,
}

const Header: React.FC<HeaderProps> = ({ title, description }) => (
  <header className="header header_with_title">
    <Link to="./">
      <img src={headerLogo} alt="" className="header__logo" />
    </Link>
    <div className="header__title-container">
      <h2 className="header__title">{title}</h2>
      <p className="header__subtitle">{description}</p>
    </div>
  </header>
);

export default Header;
