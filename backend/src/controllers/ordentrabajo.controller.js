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

// Backend (Node.js/Express)
export const getOrdenOP = async (req, res) => {
    const operario_username = req.params.operario_username;
    try {
        const [ordenesTrabajo] = await pool.query('SELECT * FROM ordentrabajo WHERE operario_username = ?', [operario_username]);
        
        if (ordenesTrabajo.length === 0) {
            return res.status(404).json({ message: 'No se encontraron órdenes de trabajo para este operario.' });
        }

        res.json(ordenesTrabajo);
    } catch (error) {
        console.error(error);  // Imprimir el error en la consola para depuración
        res.status(500).json({ error: 'Error al obtener órdenes de trabajo' });
    }
};

 // Archivo: controllers/ordentrabajoController.js o similar

// Función para obtener una orden de trabajo por su ID
export const getOrdenID = async (req, res) => {
    const { id } = req.params;

    try {
        const [orden] = await pool.query('SELECT * FROM ordentrabajo WHERE id_orden = ?', [id]);

        if (!orden.length) {
            return res.status(404).json({ message: 'Orden de trabajo no encontrada' });
        }

        res.json(orden[0]);
    } catch (error) {
        console.error('Error al obtener la orden de trabajo:', error);
        res.status(500).json({ message: 'Error al obtener la orden de trabajo' });
    }
};



  