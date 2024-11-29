import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import LogoutButton from '../components/LogoutButton';
import api from '../api';
import '../styles/AccountPage.css';

const AccountPage = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No estás autenticado.');
                }

                // Verificar si el token es válido llamando al endpoint de autenticación
                await api.get('/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } catch (err) {
                setError('No estás autenticado. Por favor, inicia sesión.');
            }
        };

        checkAuth();
    }, []);

    if (error) {
        return (
            <div className="account-container">
                <div className="account-card">
                    <p className="error-message">{error}</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="button button-primary"
                    >
                        Ir a Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="account-container">
            <div className="account-card">
                <h1>Mi Cuenta</h1>
                <UserInfo />
                <div className="button-group">
                    <button
                        onClick={() => navigate('/betsHistory')}
                        className="button button-primary"
                    >
                        Mis Apuestas
                    </button>
                    <button
                        onClick={() => navigate('/adminBalance')}
                        className="button button-success"
                    >
                        Administrar Saldo
                    </button>
                </div>
                
                <LogoutButton navigate={navigate} />
            </div>
        </div>
    );
};

export default AccountPage;
