// src/services/apiFootball.Service.js
import axios from 'axios';
import { RAPIDAPI_CONFIG } from '../config/rapidapi.js';

// Validar partido por ID desde la API
export const validateMatchFromAPI = async (matchId) => {
    try {
      const response = await axios.get(`${RAPIDAPI_CONFIG.BASE_URL}/fixtures`, {
        params: { id: matchId },
        headers: RAPIDAPI_CONFIG.HEADERS,
      });
  
      if (response.data.response.length === 0) return null;
      const match = response.data.response[0];
  
      // Validar estado del partido (no terminado, etc.)
      if (match.fixture.status.short === 'FT') return null;
  
      return match;
    } catch (error) {
      console.error(`Error al validar partido: ${error.message}`);
      throw new Error('Error al validar el partido.');
    }
  };
  
// Servicio para obtener partidos de una liga específica
export const getMatchesByLeague = async (leagueId) => {
  try {
    console.log('Solicitando partidos para la liga:', leagueId);
    const response = await axios.get(`${RAPIDAPI_CONFIG.BASE_URL}/fixtures`, {
      params: { league: leagueId, season: 2024 },
      headers: RAPIDAPI_CONFIG.HEADERS,
    });
    console.log('Respuesta de la API:', response.data);
    return response.data.response;
  } catch (error) {
    console.error('Error al obtener partidos:', error.response?.data || error.message);
    throw new Error('Error al obtener los partidos de la liga.');
  }
};

// Obtener partidos históricos
export const getPastMatches = async (date, matchId) => {
  try {
      const response = await axios.get(`${RAPIDAPI_CONFIG.BASE_URL}/fixtures`, {
          headers: RAPIDAPI_CONFIG.HEADERS,
          params: { date, status: 'FT' },  // Solo partidos finalizados
      });

      // Filtrar por matchId si se proporciona
      const match = response.data.response.find((match) => match.fixture.id === matchId);
      
      return match || null;  // Retorna el partido si existe, sino null

  } catch (error) {
      console.error('Error al obtener partidos históricos:', error.response?.data || error.message);
      throw new Error('Error al obtener los partidos históricos.');
  }
};
