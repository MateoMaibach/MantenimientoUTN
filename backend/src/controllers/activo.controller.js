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



export const postActivo = async (req, res) => {
    try {
        const { tipo_activo } = req.body;

        if (!tipo_activo) {
            return res.status(400).json({ error: 'Falta el dato requerido: tipo_activo' });
        }

        const [lastNumTag] = await pool.query('SELECT IFNULL(MAX(num_tag), 0) AS maxNumTag FROM activo');
        const newNumTag = lastNumTag[0].maxNumTag + 1;

        const label_tag = tipo_activo.substring(0, 4).toUpperCase(); 
        const existe = true;

        await pool.query(
            'INSERT INTO activo (num_tag, label_tag, tipo_activo, existe) VALUES (?, ?, ?, ?)',
            [newNumTag, label_tag, tipo_activo, existe]
        );

        res.status(201).json({ message: 'Activo creado con éxito', num_tag: newNumTag, tipo_activo, label_tag, existe });
    } catch (error) {
        console.error('Error al crear activo:', error);
        res.status(500).json({ error: 'Error al crear el activo' });
    }
};

export const deleteActivo = async (req, res) => {
    try {
        const { tipo_activo } = req.query;

        if (!tipo_activo) {
            return res.status(400).json({ error: 'Falta el dato requerido: tipo_activo' });
        }

        const [existingActivo] = await pool.query('SELECT * FROM activo WHERE tipo_activo = ?', [tipo_activo]);

        if (existingActivo.length === 0) {
            return res.status(404).json({ error: "Activo no encontrado" });
        }

        await pool.query('DELETE FROM activo WHERE tipo_activo = ?', [tipo_activo]);

        res.json({ message: "Activo eliminado con éxito" });
    } catch (error) {
        console.error('Error al eliminar activo:', error);
        res.status(500).json({ error: "Error al eliminar el activo" });
    }
};
