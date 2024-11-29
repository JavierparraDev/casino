import {
    getAllTransactions,
    getTransactionsByUserId,
    createTransaction,
    updateTransactionById,
    deleteTransactionById,
    claimReward
} from '../services/transaction.Service.js';

// Obtener todas las transacciones
export const getTransactions = async (req, res) => {
    const { page = 1, limit = 10, ...filters } = req.query;
    try {
        const transactions = await getAllTransactions(filters, page, limit);
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener transacciones de un usuario específico
export const getUserTransactions = async (req, res) => {
    const { userId } = req.body; // Ahora se recibe desde el cuerpo de la solicitud
    const { page = 1, limit = 10 } = req.query;

    try {
        const transactions = await getTransactionsByUserId(userId, page, limit);
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear una nueva transacción
export const createNewTransaction = async (req, res) => {
    try {
        const { monto, metodo, userId, tipo } = req.body;

        // Validación básica de los datos
        if (!monto || !metodo || !userId || !tipo) {
            return res.status(400).json({ error: 'El monto, el método, el usuario y el tipo son obligatorios.' });
        }

        // Lógica para crear una nueva transacción y actualizar el saldo
        const transactionData = {
            userId,
            monto,
            metodoPago: metodo,
            tipo, // Ejemplo: 'recarga', 'retiro'
        };

        const transaction = await createTransaction(transactionData); // Crear la transacción y actualizar el saldo
        res.status(201).json(transaction);
    } catch (error) {
        console.error('Error al crear la transacción:', error);
        res.status(400).json({ error: error.message });
    }
};

// Endpoint para reclamar recompensa
export const claimRewardHandler = async (req, res) => {
    try {
        const { betId, userId } = req.body; // Recibimos el `userId` desde el cuerpo de la solicitud

        if (!userId) {
            return res.status(400).json({ error: 'Usuario no autenticado o falta el ID del usuario.' });
        }

        const reward = await claimReward(betId, userId);

        res.status(200).json({ message: `¡Recompensa de ${reward} reclamada con éxito!` });
    } catch (error) {
        console.error('Error al reclamar recompensa:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una transacción
export const updateTransaction = async (req, res) => {
    const { id } = req.body;  // Obtenemos el id del cuerpo de la solicitud
    try {
        const updatedTransaction = await updateTransactionById(id, req.body);
        if (!updatedTransaction) {
            return res.status(404).json({ error: 'Transacción no encontrada.' });
        }
        res.status(200).json(updatedTransaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una transacción
export const deleteTransaction = async (req, res) => {
    const { id } = req.body;  // Obtenemos el id del cuerpo de la solicitud
    try {
        const deletedTransaction = await deleteTransactionById(id);
        if (!deletedTransaction) {
            return res.status(404).json({ error: 'Transacción no encontrada.' });
        }
        res.status(200).json(deletedTransaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};