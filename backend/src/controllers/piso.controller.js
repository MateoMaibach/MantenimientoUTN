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


export const postPiso = async (req, res) => {
    try {
        const { nombre, existe } = req.body;
    
        // Obtener el último num_tag registrado
        const [lastPiso] = await pool.query('SELECT MAX(num_tag) AS max_num_tag FROM piso');
    
        // Si no hay pisos, el primer num_tag será 1, sino, incrementamos el último
        const num_tag = lastPiso[0].max_num_tag ? lastPiso[0].max_num_tag + 1 : 1;
    
        // Insertar el nuevo piso con el num_tag generado
        await pool.query('INSERT INTO piso (num_tag, nombre, existe) VALUES (?, ?, ?)', [num_tag, nombre, existe]);
    
        // Responder con un mensaje de éxito
        res.status(201).json({ message: "Piso creado con éxito" });
    } catch (error) {
        console.error('Error al crear piso:', error);
        res.status(500).json({ error: "Error al crear el piso" });
    }
    
};

export const deletePiso = async (req, res) => {
    try {
        const { id_piso } = req.params;

        // Verificar si el piso existe
        const [existingPiso] = await pool.query('SELECT * FROM piso WHERE id_piso = ?', [id_piso]);

        if (existingPiso.length === 0) {
            return res.status(404).json({ error: "Piso no encontrado" });
        }

        // Eliminar el piso
        await pool.query('DELETE FROM piso WHERE id_piso = ?', [id_piso]);

        // Responder con el mensaje de éxito
        res.json({ message: "Piso eliminado con éxito" });
    } catch (error) {
        console.error('Error al eliminar piso:', error);
        res.status(500).json({ error: "Error al eliminar el piso" });
    }
};