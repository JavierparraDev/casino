// src/models/bet.model.js
import mongoose from 'mongoose';

const betSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    matchId: { type: Number, required: true },
    league: { type: String, required: true },
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    teamId: { type: Number, required: false }, // ID del equipo al que se apostó
    betType: { type: String, enum: ['home', 'away', 'draw'], required: true }, // Tipos actualizados
    amount: { type: Number, required: true, min: 1 },
    odds: { type: Number, required: true, default: 2.0 },
    result: { type: String, enum: ['pendiente', 'ganada', 'perdida'], default: 'pendiente' },
    status: { type: String, enum: ['activa', 'cancelada', 'resuelta'], default: 'activa' },
    claimed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Bet = mongoose.model('Bet', betSchema);

export default Bet;