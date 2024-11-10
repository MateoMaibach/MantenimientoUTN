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

export const postSector = async (req, res) => {
    try {
        const { nombre, existe } = req.body;

        // Obtener el último num_tag registrado
        const [lastSector] = await pool.query('SELECT MAX(num_tag) AS max_num_tag FROM sector');

        // Si no hay sectores, el primer num_tag será 1, sino, incrementamos el último
        const num_tag = lastSector[0].max_num_tag ? lastSector[0].max_num_tag + 1 : 1;

        // Insertar el nuevo sector con el num_tag generado
        const result = await pool.query('INSERT INTO sector (num_tag, nombre, existe) VALUES (?, ?, ?)', [num_tag, nombre, existe]);

        // Responder con el éxito y el sector creado
        res.status(201).json({
            message: "Sector creado con éxito"
        });
    } catch (error) {
        console.error('Error al crear sector:', error);
        res.status(500).json({ error: "Error al crear el sector" });
    }
};

export const deleteSector = async (req, res) => {
    try {
        const { id_sector } = req.params;

        // Verificar si el sector existe
        const [existingSector] = await pool.query('SELECT * FROM sector WHERE id_sector = ?', [id_sector]);

        if (existingSector.length === 0) {
            return res.status(404).json({ error: "Sector no encontrado" });
        }

        // Eliminar el sector
        await pool.query('DELETE FROM sector WHERE id_sector = ?', [id_sector]);

        // Responder con el mensaje de éxito
        res.json({ message: "Sector eliminado con éxito" });
    } catch (error) {
        console.error('Error al eliminar sector:', error);
        res.status(500).json({ error: "Error al eliminar el sector" });
    }
};
