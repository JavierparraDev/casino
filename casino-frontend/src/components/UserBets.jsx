import React, { useEffect, useState } from 'react';
import api from '../api';

const UserBets = () => {
    const [bets, setBets] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserBets = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/bets/user', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBets(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'Error al obtener las apuestas.');
            }
        };

        fetchUserBets();
    }, []);

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h1>Mis Apuestas</h1>
            <ul>
                {bets.map((bet) => (
                    <li key={bet._id}>
                        <p>
                            <strong>Partido:</strong> {bet.homeTeam} vs {bet.awayTeam}
                        </p>
                        <p>
                            <strong>Apuesta:</strong>{' '}
                            {bet.betType === 'home'
                                ? bet.homeTeam
                                : bet.betType === 'away'
                                ? bet.awayTeam
                                : 'Empate'}
                        </p>
                        <p>
                            <strong>Resultado:</strong>{' '}
                            {bet.status === 'resuelta'
                                ? bet.result === 'ganada'
                                    ? 'Ganada'
                                    : 'Perdida'
                                : 'Pendiente'}
                        </p>
                        {bet.result === 'ganada' && bet.status === 'resuelta' && (
                            <button
                                onClick={() => alert('Reclama tu recompensa aquí!')}
                                style={{
                                    padding: '5px 10px',
                                    backgroundColor: '#28a745',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                            >
                                Reclamar recompensa
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserBets;