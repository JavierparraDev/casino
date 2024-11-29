import React, { useState, useEffect } from 'react';
import api from '../api';

const UserInfo = ({ showName = true, showEmail = true, showBalance = true }) => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No estás autenticado.');
                    return;
                }

                const response = await api.get('/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUserData(response.data);
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error.response?.data?.error || error.message);
                setError(error.response?.data?.error || 'Error al obtener los datos del usuario.');
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!userData) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            {showName && (
                <p>
                    {userData.nombres} {userData.apellidos}
                </p>
            )}
            {showEmail && <p><strong>Correo:</strong> {userData.correo}</p>}
            {showBalance && <p><strong>Saldo:</strong> {userData.saldo} COP</p>}
        </div>
    );
};

export default UserInfo;