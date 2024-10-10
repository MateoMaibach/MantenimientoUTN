import {pool} from '../db.js'

export const getUbicacion = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ubicacion', []);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener las ubicaciones:', error);
        res.status(500).json({ message: 'Error al obtener las ubicaciones' });
    }
};
