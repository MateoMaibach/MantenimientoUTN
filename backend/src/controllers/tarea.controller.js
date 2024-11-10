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


export const getTareasPorActivoYGrupo = async (req, res) => {
    const { tipo_activo, grupo } = req.query;

    if (!tipo_activo || !grupo) {
        return res.status(400).json({ message: 'Faltan parámetros tipo_activo o grupo' });
    }

    try {
        const query = `
            SELECT t.idtarea, t.descripcion
            FROM activo a
            JOIN activo_tarea at ON a.id_activo = at.id_activo
            JOIN tarea t ON at.id_tarea = t.idtarea
            WHERE a.tipo_activo = ? AND at.grupo = ?;
        `;
        const [rows] = await pool.query(query, [tipo_activo, grupo]);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener las tareas por activo y grupo:', error);
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
};
