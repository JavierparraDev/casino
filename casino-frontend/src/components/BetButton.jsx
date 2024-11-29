// src/components/BetButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BetButton = ({ matchId, league, homeTeam, awayTeam, homeTeamId, awayTeamId }) => {
    const navigate = useNavigate();

    const handleBet = () => {
        const token = localStorage.getItem('token'); // Verificamos si existe un token

        if (!token) {
            // Si no hay token, redirigimos al login
            alert('Debes iniciar sesión para realizar una apuesta.');
            navigate('/login');
        } else {
            // Si hay token, redirigimos a la página de apuestas
            navigate('/bet', {
                state: {
                    matchId,
                    league,
                    homeTeam,
                    awayTeam,
                    homeTeamId, // Agregamos el ID del equipo local
                    awayTeamId, // Agregamos el ID del equipo visitante
                },
            });
        }
    };

    return (
        <button
            onClick={handleBet}
            style={{
                marginLeft: '10px',
                padding: '5px 10px',
                backgroundColor: '#ff6f61',
                color: '#FFF',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
            }}
        >
            Apostar
        </button>
    );
};

export default BetButton;