import { pool } from "../db.js";

export const getPiso = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM piso', []);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener los pisos:', error);
        res.status(500).json({ message: 'Error al obtener los pisos' });
    }
};
