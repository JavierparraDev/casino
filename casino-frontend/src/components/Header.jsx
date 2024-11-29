import React from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';
import logo from '../assets/favicon.webp';
import UserInfo from './UserInfo';
import { FaDice } from 'react-icons/fa';


const Header = () => {
  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="header__logo">
          <img src={logo} alt="Logo" className="header__logo-image" />
          <span className="header__menu-text">
            Bienvenido,&nbsp;<FaDice className="header__dice-icon" />&nbsp;<UserInfo showEmail={false} showBalance={false} />
          </span>
        </Link>
        <nav>
          <ul className="header__menu">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/bet">Apuestas</Link>
            </li>
            <li>
              <Link to="/account">Cuenta</Link>
            </li>
            <li>
              <Link to="/adminBalance">Balance</Link>
            </li>
            <li>
              <Link to="/login">Cerrar Sesión</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;