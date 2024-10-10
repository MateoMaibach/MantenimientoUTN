import {pool} from '../db.js'

export const getSector = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM sector', []);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener los sectores:', error);
        res.status(500).json({ message: 'Error al obtener los sectores' });
    }
};

