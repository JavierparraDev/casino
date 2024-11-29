import mongoose from 'mongoose'; 
import Bet from '../models/bet.models.js';
import User from '../models/user.models.js';
import { validateMatchFromAPI } from './apiFootball.Service.js';
import { getPastMatches } from './apiFootball.Service.js';

// Obtener las apuestas resueltas de un usuario
export const getResolvedBets = async (userId) => {
    try {
        // Verificamos que el userId sea válido
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error(`El ID del usuario (${userId}) no es válido.`);
        }

        const objectId = new mongoose.Types.ObjectId(userId);

        // Traemos las apuestas cuyo estado es 'resuelta'
        const resolvedBets = await Bet.find({ user: objectId, status: 'resuelta' });

        if (resolvedBets.length === 0) {
            console.log(`No se encontraron apuestas resueltas para el usuario ID: ${userId}`);
        }

        return resolvedBets;
    } catch (error) {
        console.error('Error al obtener apuestas resueltas:', error.message);
        throw new Error('Error al obtener las apuestas resueltas.');
    }
};

// Función para crear una nueva apuesta
export const createBetService = async ({ userId, matchId, betType, amount, teamId }) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error('Usuario no encontrado');
        if (user.saldo < amount) throw new Error('Saldo insuficiente');

        const match = await validateMatchFromAPI(matchId);
        if (!match) throw new Error('Partido no válido para apostar');

        const odds = {
            home: 1.8,
            away: 2.2,
            draw: 2.0,
        }[betType];

        const newBet = new Bet({
            user: userId,
            matchId,
            league: match.league.name,
            homeTeam: match.teams.home.name,
            awayTeam: match.teams.away.name,
            teamId,
            betType,
            amount,
            odds,
        });

        await newBet.save();

        user.saldo -= amount;
        await user.save();

        return newBet;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Función para obtener la fecha actual en formato YYYY-MM-DD
const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Retorna la fecha en formato YYYY-MM-DD
};

// Procesar las apuestas del usuario y actualizar su estado y resultado
export const updateUserBets = async (userId) => {
    const objectId = new mongoose.Types.ObjectId(userId);

    // Traemos las apuestas activas
    const userBets = await Bet.find({ user: objectId, status: 'activa' });

    if (!userBets.length) {
        console.log(`No se encontraron apuestas activas para el usuario ID: ${userId}`);
        return [];
    }

    // Obtenemos la fecha de hoy para usarla en la consulta
    const todayDate = getTodayDate();

    const updatedBets = await Promise.all(
        userBets.map(async (bet) => {
            console.log(`Procesando apuesta ID: ${bet._id}, Match ID: ${bet.matchId}`);

            // Usamos la función getPastMatches para verificar el estado del partido
            const match = await getPastMatches(todayDate, bet.matchId);  // Usamos la fecha dinámica

            if (match) {
                const homeGoals = match.goalsHomeTeam;
                const awayGoals = match.goalsAwayTeam;

                const winner = homeGoals > awayGoals
                    ? 'home'
                    : homeGoals < awayGoals
                    ? 'away'
                    : 'draw';

                bet.result = winner === bet.betType ? 'ganada' : 'perdida';
                bet.status = 'resuelta';  // Cambiamos el estado a 'resuelta' cuando se encuentra el partido y se calcula el resultado
                console.log(`Resultado de apuesta ID: ${bet._id}: ${bet.result}`);
            }

            await bet.save();  // Guardamos los cambios
            return bet;
        })
    );

    console.log(`Apuestas procesadas para el usuario ID: ${userId}`);
    return updatedBets;  // Retornamos las apuestas actualizadas
};