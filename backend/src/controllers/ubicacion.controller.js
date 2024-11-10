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

export const postUbicacion = async (req, res) => {
    try {
        const { descripcion, existe } = req.body;

        // Obtener el último num_tag registrado
        const [lastUbicacion] = await pool.query('SELECT MAX(num_tag) AS max_num_tag FROM ubicacion');

        // Si no hay ubicaciones, el primer num_tag será 1, sino, incrementamos el último
        const num_tag = lastUbicacion[0].max_num_tag ? lastUbicacion[0].max_num_tag + 1 : 1;

        // Insertar la nueva ubicación con el num_tag generado
        const result = await pool.query('INSERT INTO ubicacion (num_tag, descripcion, existe) VALUES (?, ?, ?)', [num_tag, descripcion, existe]);

        // Responder con el éxito
        res.status(201).json({
            message: "Ubicación creada con éxito"
        });
    } catch (error) {
        console.error('Error al crear ubicación:', error);
        res.status(500).json({ error: "Error al crear la ubicación" });
    }
};

export const deleteUbicacion = async (req, res) => {
    try {
        const { id_ubicacion } = req.params;

        // Verificar si la ubicación existe
        const [existingUbicacion] = await pool.query('SELECT * FROM ubicacion WHERE id_ubicacion = ?', [id_ubicacion]);

        if (existingUbicacion.length === 0) {
            return res.status(404).json({ error: "Ubicación no encontrada" });
        }

        // Eliminar la ubicación
        await pool.query('DELETE FROM ubicacion WHERE id_ubicacion = ?', [id_ubicacion]);

        // Responder con el mensaje de éxito
        res.json({ message: "Ubicación eliminada con éxito" });
    } catch (error) {
        console.error('Error al eliminar ubicación:', error);
        res.status(500).json({ error: "Error al eliminar la ubicación" });
    }
};

