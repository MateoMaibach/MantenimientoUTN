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
        // Consulta para obtener el máximo num_tag actual
        const [result] = await pool.query('SELECT IFNULL(MAX(num_tag), 0) AS maxNumTag FROM activo');
        const maxNumTag = result[0].maxNumTag;

        // Calcula el siguiente num_tag
        const newNumTag = maxNumTag + 1;

        // Obtiene los datos del cuerpo de la solicitud
        const { label_tag, tipo_activo, existe } = req.body;

        // Inserta el nuevo registro con los valores proporcionados
        await pool.query(
            'INSERT INTO activo (num_tag, label_tag, tipo_activo, existe) VALUES (?, ?, ?, ?)',
            [newNumTag, label_tag, tipo_activo, existe ? 1 : 0] // `existe` como 1 o 0
        );

        res.status(201).json({ message: 'Activo creado con éxito', num_tag: newNumTag });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el activo' });
    }
};

export const deleteActivo = async (req, res) => {
    try {
        // Obtén el id_activo del parámetro de la URL
        const { id_activo } = req.params;

        // Verifica si el activo existe en la base de datos
        const [existingActivo] = await pool.query('SELECT * FROM activo WHERE id_activo = ?', [id_activo]);

        // Si el activo no existe, devuelve un error 404
        if (existingActivo.length === 0) {
            return res.status(404).json({ error: "Activo no encontrado" });
        }


        // Elimina el activo de la base de datos
        await pool.query('DELETE FROM activo WHERE id_activo = ?', [id_activo]);

        // Responde con un mensaje de éxito
        res.json({ message: "Activo eliminado con éxito" });
    } catch (error) {
        // Manejo de errores, en caso de que algo falle
        console.error("Error al eliminar activo:", error);
        res.status(500).json({ error: "Error al eliminar el activo" });
    }
};