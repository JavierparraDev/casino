import express from 'express';
import {
    getTransactions,
    getUserTransactions,
    createNewTransaction,
    updateTransaction,
    deleteTransaction,
    claimRewardHandler 
} from '../controllers/transaction.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Rutas protegidas con `protect`
router.get('/', protect, getTransactions);
router.get('/user', protect, getUserTransactions);  // Ahora el userId se pasa desde el cuerpo
router.post('/', protect, createNewTransaction);
router.put('/', protect, updateTransaction);  // Usamos `PUT` sin id en la ruta
router.delete('/', protect, deleteTransaction);  // Usamos `DELETE` sin id en la ruta
router.post('/claim-reward', claimRewardHandler); // Ruta para reclamar la recompensa

export default router;