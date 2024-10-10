import { pool } from '../db.js'

export const getActivo = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM activo', [])
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener activos:', error)
        res.status(500).json({ message: 'Error al obtener activos' })
    }
} 