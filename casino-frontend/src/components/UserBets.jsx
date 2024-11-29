import React, { useEffect, useState } from 'react';
import api from '../api';

const UserBets = () => {
    const [bets, setBets] = useState([]);
    const [error, setError] = useState('');

    // Cargar apuestas
    useEffect(() => {
        const fetchUserBets = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/bets/user', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Guardamos todas las apuestas activas y resueltas en un solo arreglo
                const { activeBets, resolvedBets } = response.data;
                setBets([...activeBets, ...resolvedBets]); // Concatenamos ambas listas
            } catch (err) {
                setError(err.response?.data?.error || 'Error al obtener las apuestas.');
            }
        };

        fetchUserBets();
    }, []); // Solo se ejecuta una vez al montar el componente

    // Función para reclamar recompensa
    const handleClaimReward = async (betId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No estás autenticado.');
                return;
            }

            // Obtener el usuario y su ID
            const userResponse = await api.get('/auth/me', {
                headers: { Authorization: `Bearer ${token}` },
            });

            const { id: userId } = userResponse.data;

            // Enviar la solicitud para reclamar la recompensa
            const response = await api.post(
                '/transactions/claim-reward',
                { betId, userId }, // Incluimos el `userId`
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Mostrar el mensaje de éxito
            alert(response.data.message);

            // Actualizamos el estado local para reflejar la recompensa reclamada
            setBets((prevBets) =>
                prevBets.map((bet) =>
                    bet._id === betId ? { ...bet, claimed: true } : bet
                )
            );
        } catch (err) {
            setError(err.response?.data?.error || 'Error al reclamar la recompensa.');
        }
    };

    return { bets, error, handleClaimReward };
};

export default UserBets;