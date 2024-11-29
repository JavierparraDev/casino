// src/pages/BetsPage.jsx
import React from 'react';
import UserBets from '../components/UserBets';

const BetsPage = () => {
    const { bets, error, handleClaimReward } = UserBets();  // Llamamos al componente que maneja la lógica

    return (
        <div>
            <h1>Mis Apuestas</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {bets.map((bet) => (
                    <li
                        key={bet._id}
                        style={{
                            marginTop: '40px',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                        }}
                    >
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
                            <strong>Estado:</strong>{' '}
                            {bet.status === 'activa' ? 'Activa' : 'Resuelta'}
                        </p>
                        {bet.status === 'resuelta' && (
                            <p>
                                <strong>Resultado:</strong>{' '}
                                {bet.result === 'ganada' ? 'Ganada' : 'Perdida'}
                            </p>
                        )}
                        {bet.status === 'resuelta' && !bet.claimed && (
                            <button
                                onClick={() => handleClaimReward(bet._id)}
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
                        {bet.claimed && (
                            <p style={{ color: 'gray', fontStyle: 'italic' }}>
                                Recompensa ya reclamada
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BetsPage;