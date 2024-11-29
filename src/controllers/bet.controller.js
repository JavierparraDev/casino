// src/controllers/bet.controller.js
import Bet from '../models/bet.models.js';
import User from '../models/user.models.js';
import { validateMatchFromAPI } from '../services/apiFootball.Service.js';
import { updateUserBets, createBetService, getResolvedBets } from '../services/bet.service.js';

// Crear una nueva apuesta
export const createBet = async (req, res) => {
    try {
        const { matchId, betType, amount, teamId } = req.body;
        const userId = req.user._id;

        if (!matchId || !betType || !amount) {
            return res.status(400).json({ error: 'Faltan datos para realizar la apuesta.' });
        }

        const bet = await createBetService({ userId, matchId, betType, amount, teamId });
        res.status(201).json(bet);
    } catch (error) {
        console.error('Error al crear apuesta:', error.message);
        res.status(500).json({ error: 'Error interno al crear la apuesta.' });
    }
};

// Obtener apuestas activas de un usuario y actualizar su estado y resultado
export const getUserBets = async (req, res) => {
    try {
        const userId = req.user._id; // ID del usuario autenticado
        console.log(`Obteniendo apuestas activas y resueltas para el usuario ID: ${userId}`);

        // Obtener apuestas activas y actualizarlas
        const activeBets = await updateUserBets(userId);  // Actualizamos el estado de las apuestas activas
        
        // Obtener apuestas resueltas
        const resolvedBets = await getResolvedBets(userId);  // Traemos las apuestas resueltas

        // Unificamos las apuestas activas y resueltas en un solo objeto
        const allBets = {
            activeBets,
            resolvedBets,
        };

        // Enviar la respuesta con todas las apuestas
        return res.status(200).json(allBets);

    } catch (error) {
        // Manejo de errores con más detalles
        console.error('Error al obtener apuestas:', error.message);
        
        // Si el error es por algún problema con la base de datos o lógica de negocio, mandamos un 500
        return res.status(500).json({ 
            error: 'Error al obtener las apuestas. Intenta nuevamente.' 
        });
    }
};