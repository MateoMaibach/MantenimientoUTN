import {pool} from '../db.js'


export const GetEdificio = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM edificio', []);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener edificios:', error);
        res.status(500).json({ message: 'Error al obtener los edificios' });
    }
};

export const postEdificio = async (req, res) => {
    try {
        const { nombre, existe } = req.body; 

      
        if (!nombre || existe === undefined) {
            return res.status(400).json({ error: 'Faltan datos requeridos: nombre, existe' });
        }

        // Obtener el último num_tag registrado
        const [lastNumTag] = await pool.query('SELECT num_tag FROM edificio ORDER BY num_tag DESC LIMIT 1');
        
        // Lógica para generar el num_tag basado en el último
        let num_tag;
        if (lastNumTag.length > 0) {
            // Si ya hay registros, incrementamos el num_tag
            num_tag = lastNumTag[0].num_tag + 1;
        } else {
            // Si no hay registros previos, comenzamos con num_tag = 1
            num_tag = 1;
        }

        // Insertar el nuevo edificio con el num_tag generado
        await pool.query('INSERT INTO edificio (num_tag, nombre, existe) VALUES (?, ?, ?)', 
            [num_tag, nombre, existe]);

        // Responder con éxito
        res.json({ message: 'Edificio creado con éxito', num_tag, nombre, existe });
    } catch (error) {
        console.error('Error al crear edificio:', error);
        res.status(500).json({ error: 'Error al crear el edificio' });
    }
};

export const deleteEdificio = async (req, res) => {
    try {
        const { id_edificio } = req.params; // Obtenemos el id_edificio de los parámetros de la URL

        // Verificar si el edificio existe
        const [existingEdificio] = await pool.query('SELECT * FROM edificio WHERE id_edificio = ?', [id_edificio]);

        if (existingEdificio.length === 0) {
            // Si no existe el edificio, retornamos un error 404
            return res.status(404).json({ error: "Edificio no encontrado" });
        }

        // Eliminar el edificio con el id proporcionado
        await pool.query('DELETE FROM edificio WHERE id_edificio = ?', [id_edificio]);

        // Responder con éxito
        res.json({ message: "Edificio eliminado con éxito" });
    } catch (error) {
        console.error('Error al eliminar edificio:', error);
        res.status(500).json({ error: "Error al eliminar el edificio" });
    }
};