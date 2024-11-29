import { getLiveMatches, getUpcomingMatches, getPastMatches } from '../services/fixtures.Service.js';

// Endpoint para partidos en vivo
export const liveMatchesController = async (req, res) => {
    try {
        const matches = await getLiveMatches();
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Endpoint para partidos próximos
export const upcomingMatchesController = async (req, res) => {
    const { date } = req.query; // Fecha recibida como parámetro
    try {
        const matches = await getUpcomingMatches(date);
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Endpoint para partidos históricos
export const pastMatchesController = async (req, res) => {
    const { date } = req.query; // Fecha recibida como parámetro
    try {
        const matches = await getPastMatches(date); // Obtener partidos históricos

        // Verificar que la respuesta de la API contiene datos
        if (!matches || matches.length === 0) {
            return res.status(404).json({ error: 'No se encontraron partidos para la fecha proporcionada.' });
        }

        // Ordenar los partidos por fecha, de más reciente a más antiguo
        const sortedMatches = matches.sort((a, b) => {
            const dateA = new Date(a.fixture.date); // Convertir fecha de A a objeto Date
            const dateB = new Date(b.fixture.date); // Convertir fecha de B a objeto Date

            return dateB - dateA; // Si dateB es mayor (más reciente), será primero
        });

        // Devolver los partidos ordenados
        res.status(200).json(sortedMatches);
    } catch (error) {
        console.error('Error al obtener partidos históricos:', error.message);
        res.status(500).json({ error: error.message });
    }
};
