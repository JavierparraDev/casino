// src/components/PastMatches.jsx
import React, { useState } from 'react';
import axios from 'axios';

const PastMatches = () => {
    const [pastMatches, setPastMatches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visibleCount, setVisibleCount] = useState(10);

    const fetchPastMatches = async () => {
        setLoading(true);
        try {
            const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            const response = await axios.get(`http://localhost:5000/api/dashboard/past?date=${yesterday}`);
            setPastMatches(response.data);
        } catch (error) {
            console.error('Error al cargar partidos históricos:', error);
        } finally {
            setLoading(false);
        }
    };

    const getWinnerMessage = (homeScore, awayScore, homeTeam, awayTeam) => {
        if (homeScore > awayScore) {
            return `Victoria de ${homeTeam}`;
        } else if (awayScore > homeScore) {
            return `Victoria de ${awayTeam}`;
        } else {
            return 'Empate';
        }
    };

    const renderMatches = (matches) => (
        <ul>
            {matches.slice(0, visibleCount).map((match) => {
                const homeTeam = match.teams.home.name;
                const awayTeam = match.teams.away.name;
                const homeScore = match.goals.home;
                const awayScore = match.goals.away;
                const matchDate = new Date(match.fixture.date).toLocaleString();
                const leagueName = match.league.name;

                const winnerMessage = getWinnerMessage(homeScore, awayScore, homeTeam, awayTeam);

                return (
                    <li key={match.fixture.id} style={{ marginBottom: '20px' }}>
                        <div>
                            <h4>{leagueName}</h4>
                            <p>
                                <strong>Fecha:</strong> {matchDate}
                            </p>
                            <p>
                                <strong>Partido:</strong> {homeTeam} vs {awayTeam}
                            </p>
                            <p>
                                <strong>Marcador Final:</strong> {homeScore} - {awayScore}
                            </p>
                            <p>
                                <strong>Resultado:</strong> {winnerMessage}
                            </p>
                        </div>
                    </li>
                );
            })}
        </ul>
    );

    return (
        <div>
            <h3>Históricos de Partidos</h3>
            <button onClick={fetchPastMatches} disabled={loading}>
                {loading ? 'Cargando...' : 'Actualizar'}
            </button>
            {renderMatches(pastMatches)}
            {visibleCount < pastMatches.length && (
                <p
                    onClick={() => setVisibleCount((prev) => prev + 10)}
                    style={{
                        marginTop: '10px',
                        textAlign: 'center',
                        color: '#007bff',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                    }}
                >
                    Mostrar más
                </p>
            )}
        </div>
    );
};

export default PastMatches;