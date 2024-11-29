//src/app.js
//importar dependencias de funcionamiento.
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.js';
//importar *file routes
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import footballRoutes from './routes/football.routes.js';
import betRoutes from './routes/bet.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import transactionRoutes from './routes/transaction.routes.js';


const app = express()

// Middlewares globales
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // O 'http://localhost:5173' se modifica dependiento del port de front
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));


// Rutas
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/foot', footballRoutes);
app.use('/api/bets', betRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/transactions', transactionRoutes);


export default app;