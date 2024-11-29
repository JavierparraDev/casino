// src/components/LiveMatches.jsx
import React, { useState } from 'react';
import axios from 'axios';
import BetButton from './BetButton'; // Importamos el componente del botón de apuesta

const LiveMatches = () => {
    const [liveMatches, setLiveMatches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visibleCount, setVisibleCount] = useState(10); // Estado para controlar la cantidad de elementos visibles

    const fetchLiveMatches = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/dashboard/live');
            setLiveMatches(response.data); // Cargamos todos los partidos en vivo
        } catch (error) {
            console.error('Error al cargar partidos en vivo:', error);
        } finally {
            setLoading(false);
        }
    };

    const getMatchPeriod = (status) => {
        switch (status) {
            case '1H':
                return 'Primer tiempo';
            case 'HT':
                return 'Medio tiempo';
            case '2H':
                return 'Segundo tiempo';
            case 'ET':
                return 'Tiempo extra';
            case 'P':
                return 'Penales';
            case 'FT':
                return 'Finalizado';
            default:
                return 'No iniciado';
        }
    };

    const renderMatchDetails = (matches) => (
        <ul>
            {matches.slice(0, visibleCount).map((match) => ( // Mostramos solo los partidos visibles
                <li key={match.fixture.id} style={{ marginBottom: '20px' }}>
                    <h4>{match.league.name}</h4>
                    <p>
                        <strong>Equipos:</strong> {match.teams.home.name} vs {match.teams.away.name}
                    </p>
                    <p>
                        <strong>Etapa:</strong> {getMatchPeriod(match.fixture.status.short)}
                    </p>
                    <p>
                        <strong>Tiempo de juego:</strong> ({match.fixture.status.elapsed || 0} min)
                    </p>
                    <p>
                        <strong>Marcador Parcial:</strong> {match.goals.home || 0} - {match.goals.away || 0}
                    </p>
                    <BetButton
                        matchId={match.fixture.id}
                        league={match.league.name}
                        homeTeam={match.teams.home.name}
                        awayTeam={match.teams.away.name}
                        homeTeamId={match.teams.home.id} // ID del equipo local
                        awayTeamId={match.teams.away.id} // ID del equipo visitante
                    />
                </li>
            ))}
        </ul>
    );

    return (
        <div>
            <h3>Partidos en Vivo</h3>
            <button onClick={fetchLiveMatches} disabled={loading}>
                {loading ? 'Cargando...' : 'Actualizar'}
            </button>
            {renderMatchDetails(liveMatches)}
            {visibleCount < liveMatches.length && (
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

export default LiveMatches;
