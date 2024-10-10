import { pool } from "../db.js";

export const getTareas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tarea', []);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
};

export const getTarea = async (req, res) => {
    const { id_tarea } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM tarea WHERE id_tarea = ?', [id_tarea]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener la tarea:', error);
        res.status(500).json({ message: 'Error al obtener la tarea' });
    }
};
