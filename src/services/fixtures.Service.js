import axios from 'axios';
import { RAPIDAPI_CONFIG } from '../config/rapidapi.js';

// Obtener partidos en vivo
export const getLiveMatches = async () => {
    try {
        const response = await axios.get(`${RAPIDAPI_CONFIG.BASE_URL}/fixtures`, {
            headers: RAPIDAPI_CONFIG.HEADERS,
            params: { live: 'all' },
        });
        return response.data.response;
    } catch (error) {
        console.error('Error al obtener partidos en vivo:', error.response?.data || error.message);
        throw new Error('Error al obtener los partidos en vivo.');
    }
};

// Obtener partidos próximos
export const getUpcomingMatches = async (date) => {
    try {
        const response = await axios.get(`${RAPIDAPI_CONFIG.BASE_URL}/fixtures`, {
            headers: RAPIDAPI_CONFIG.HEADERS,
            params: { date, status: 'NS' },
        });
        return response.data.response;
    } catch (error) {
        console.error('Error al obtener partidos próximos:', error.response?.data || error.message);
        throw new Error('Error al obtener los partidos próximos.');
    }
};

// Obtener partidos históricos
export const getPastMatches = async (date) => {
    try {
        const response = await axios.get(`${RAPIDAPI_CONFIG.BASE_URL}/fixtures`, {
            headers: RAPIDAPI_CONFIG.HEADERS,
            params: { date, status: 'FT' },
        });
        return response.data.response;
    } catch (error) {
        console.error('Error al obtener partidos históricos:', error.response?.data || error.message);
        throw new Error('Error al obtener los partidos históricos.');
    }
};