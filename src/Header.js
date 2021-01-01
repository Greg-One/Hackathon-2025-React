import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import headerLogo from './assets/images/header_logo.png';

const Header = ({ title, description }) => (
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

Header.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default memo(Header);
