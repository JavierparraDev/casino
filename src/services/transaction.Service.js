import Transaction from '../models/transaction.model.js';
import User from '../models/user.models.js'; 
import Bet from '../models/bet.models.js';

// Obtener todas las transacciones
export const getAllTransactions = async (filters = {}, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return await Transaction.find(filters).skip(skip).limit(limit);
};

// Obtener transacciones por usuario
export const getTransactionsByUserId = async (userId, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return await Transaction.find({ userId }).skip(skip).limit(limit);
};

// Crear una nueva transacción
export const createTransaction = async (transactionData) => {
    const { userId, monto, tipo } = transactionData;

    // Validar que los datos necesarios están presentes
    if (!userId || !monto || !tipo) {
        throw new Error('El usuario, el monto y el tipo son obligatorios.');
    }

    // Buscar al usuario
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('Usuario no encontrado.');
    }

    // Actualizar el saldo según el tipo de transacción
    if (tipo === 'recarga') {
        user.saldo += Number(monto); // Asegurar que monto sea un número
    } else if (tipo === 'retiro') {
        if (user.saldo < Number(monto)) {
            throw new Error('Saldo insuficiente para realizar el retiro.');
        }
        user.saldo -= Number(monto); // Asegurar que monto sea un número
    }

    // Guardar los cambios en el saldo del usuario
    await user.save();

    // Crear y guardar la transacción
    const transaction = new Transaction(transactionData);
    return await transaction.save();
};

export const claimReward = async (betId, userId) => {
    if (!betId || !userId) {
        throw new Error('ID de apuesta o usuario faltante.');
    }

    const bet = await Bet.findById(betId);
    if (!bet) throw new Error('Apuesta no encontrada.');

    if (String(bet.user) !== String(userId)) {
        throw new Error('No puedes reclamar la recompensa de esta apuesta.');
    }

    // Verificar si ya fue reclamada
    if (bet.claimed) {
        throw new Error('Esta recompensa ya fue reclamada.');
    }

    if (bet.result !== 'ganada' && bet.result !== 'perdida') {
        throw new Error('Solo puedes reclamar recompensas de apuestas resueltas.');
    }

    let reward;
    if (bet.result === 'ganada') {
        reward = bet.amount * bet.odds;
    } else if (bet.result === 'perdida') {
        reward = bet.amount / 2;
    }

    const user = await User.findById(userId);
    if (!user) throw new Error('Usuario no encontrado.');

    user.saldo += reward;
    await user.save();

    // Marcar la apuesta como reclamada
    bet.claimed = true;
    await bet.save();

    const transactionData = {
        userId,
        monto: reward,
        tipo: bet.result === 'ganada' ? 'ganancia' : 'reembolso',
        metodoPago: bet.result === 'ganada' ? 'Apuesta ganada' : 'Apuesta perdida',
    };
    const transaction = new Transaction(transactionData);
    await transaction.save();

    return reward;
};

// Actualizar una transacción por ID
export const updateTransactionById = async (id, transactionData) => {
    return await Transaction.findByIdAndUpdate(id, transactionData, { new: true });
};

// Eliminar una transacción por ID
export const deleteTransactionById = async (id) => {
    return await Transaction.findByIdAndDelete(id);
};