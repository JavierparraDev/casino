// src/routes/bet.routes.js
import express from 'express';
import { getUserBets, createBet } from '../controllers/bet.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Ruta para crear una apuesta
router.post('/apuesta', protect, createBet);

// Ruta para obtener las apuestas del usuario autenticado
router.get('/user', protect, getUserBets);

export default router;