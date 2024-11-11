import { pool } from '../db.js';

export const postOrden = async (req, res) => {
    try {
        const {
            OT_num,
            fecha,
            observacion,
            edificio_nombre,
            tarea_descripcion,
            sector_nombre,
            piso_nombre,
            ubicacion_descripcion,
            operario_username,
            tipo_activo,
            tareas // Recibimos las tareas como JSON
        } = req.body;

        const query = `INSERT INTO ordentrabajo 
                        (OT_num, fecha, observacion, codigo_unico,
                        edificio_nombre, tarea_descripcion, sector_nombre,
                        piso_nombre, ubicacion_descripcion, operario_username,
                        tipo_activo, tareas) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const [rows] = await pool.query(query, [
            OT_num,
            fecha,
            observacion,
            '', // código único
            edificio_nombre,
            tarea_descripcion,
            sector_nombre,
            piso_nombre,
            ubicacion_descripcion,
            operario_username,
            tipo_activo,
            tareas // Almacenamos JSON en la columna tareas
        ]);

        res.status(201).json({
            message: 'Orden de trabajo creada con éxito',
            id: rows.insertId,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOrdenes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ordentrabajo');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteOrden = async (req, res) => {
    try {
        const { id } = req.params;

        const [orderRows] = await pool.query('SELECT * FROM ordentrabajo WHERE id_orden = ?', [id]);
        if (orderRows.length === 0) {
            return res.status(404).json({ message: 'Orden de trabajo no encontrada' });
        }

        const [result] = await pool.query('DELETE FROM ordentrabajo WHERE id_orden = ?', [id]);
        res.status(200).json({ message: 'Orden de trabajo eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
