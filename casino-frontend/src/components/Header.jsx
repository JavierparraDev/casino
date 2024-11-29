import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Header.css';
import logo from '../assets/favicon.webp';
import UserInfo from './UserInfo';
import api from '../api';
import { FaDice } from 'react-icons/fa';

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    // Verificar si el usuario está autenticado al cargar el componente
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                // Llamar al backend para validar el token
                await api.get('/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    // Función para cerrar sesión
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                // Solicitud al backend para cerrar sesión
                await api.post('/auth/logout', null, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }

            // Eliminar el token y redirigir
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error.response?.data?.error || error.message);
            alert('Error al intentar cerrar sesión.');
        }
    };

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
                        {isAuthenticated ? (
                            <>
                            <li>
                                <Link to="/betsHistory">Apuestas</Link>
                            </li>
                                <li>
                                    <Link to="/account">Cuenta</Link>
                                </li>
                                <li>
                                    <span
                                        onClick={handleLogout}
                                        style={{
                                            cursor: 'pointer',
                                            color: '#FF4B4B',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Cerrar Sesión
                                    </span>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;