import {pool} from '../db.js'


export const GetEdificio = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM edificio', []);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener edificios:', error);
        res.status(500).json({ message: 'Error al obtener los edificios' });
    }
};
