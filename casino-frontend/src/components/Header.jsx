import React from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo">
          <h1>Mi App</h1>
        </div>
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
