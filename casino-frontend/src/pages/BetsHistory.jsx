import React from 'react';
import UserBets from '../components/UserBets';
import '../styles/BetsHistory.css';

const BetsPage = () => {
    const { bets, error, handleClaimReward } = UserBets();  // Llamamos al componente que maneja la lógica

    return (
        <div className="bets-container">
            <h1>Mis Apuestas</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {bets.map((bet) => (
                    <li key={bet._id} className="bet-card">
                        <h3>{bet.homeTeam} vs {bet.awayTeam}</h3>
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
                            >
                                Reclamar recompensa
                            </button>
                        )}
                        {bet.claimed && (
                            <p className="claimed-message">
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