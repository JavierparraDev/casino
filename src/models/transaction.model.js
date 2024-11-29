import mongoose from 'mongoose';

// Definimos el esquema de Transacciones
const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    metodoPago: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        enum: ['recarga', 'ganancia', 'reembolso', 'apuesta', 'retiro'],
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

// Creación del modelo
const Transaction = mongoose.model('Transaction', transactionSchema);

// Exportación con ESM
export default Transaction;