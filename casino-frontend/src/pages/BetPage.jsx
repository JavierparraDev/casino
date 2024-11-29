import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/BetPage.css';

const BetPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { matchId, league, homeTeam, awayTeam, homeTeamId, awayTeamId } = location.state || {};
    const [amount, setAmount] = useState('');
    const [betType, setBetType] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:5000/api/bets/apuesta',
                {
                    matchId,
                    league,
                    homeTeam,
                    awayTeam,
                    teamId: betType === 'home' ? homeTeamId : betType === 'away' ? awayTeamId : null,
                    betType,
                    amount: Number(amount),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSuccess('Apuesta realizada exitosamente.');
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Error al realizar la apuesta.');
        }
    };

    return (
        <div className="bet-page">
            <h1>Realizar Apuesta</h1>
            <p><strong>Liga:</strong> {league}</p>
            <p><strong>Partido:</strong> {homeTeam} vs {awayTeam}</p>
            <p><strong>Ganancias:</strong></p>
            <ul>
                <li>{homeTeam}: 1.8</li>
                <li>{awayTeam}: 2.2</li>
                <li>Empate: 2.0</li>
            </ul>

            <form onSubmit={handleSubmit}>
                <label>
                    Monto:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Tipo de Apuesta:
                    <select value={betType} onChange={(e) => setBetType(e.target.value)} required>
                        <option value="">Seleccione</option>
                        <option value="home">Gana {homeTeam}</option>
                        <option value="away">Gana {awayTeam}</option>
                        <option value="draw">Empate</option>
                    </select>
                </label>

                <button type="submit">Apostar</button>
            </form>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
};

export default BetPage;