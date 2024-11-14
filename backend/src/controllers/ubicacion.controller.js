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
        const { descripcion } = req.body; 

        
        if (!descripcion) {
            return res.status(400).json({ error: 'Falta el dato requerido: descripcion' });
        }

        
        const existe = true;

       
        const [lastUbicacion] = await pool.query('SELECT MAX(num_tag) AS max_num_tag FROM ubicacion');
        const num_tag = lastUbicacion[0].max_num_tag ? lastUbicacion[0].max_num_tag + 1 : 1;

        
        await pool.query(
            'INSERT INTO ubicacion (num_tag, descripcion, existe) VALUES (?, ?, ?)', 
            [num_tag, descripcion, existe]
        );

        res.status(201).json({
            message: "Ubicación creada con éxito",
            
        });
    } catch (error) {
        console.error('Error al crear ubicación:', error);
        res.status(500).json({ error: "Error al crear la ubicación" });
    }
};


export const deleteUbicacion = async (req, res) => {
    try {
        const { descripcion } = req.query;

        
        const [existingUbicacion] = await pool.query('SELECT * FROM ubicacion WHERE descripcion = ?', [descripcion]);

        if (existingUbicacion.length === 0) {
            return res.status(404).json({ error: "Ubicación no encontrada" });
        }

        
        await pool.query('DELETE FROM ubicacion WHERE descripcion = ?', [descripcion]);

        
        res.json({ message: "Ubicación eliminada con éxito" });
    } catch (error) {
        console.error('Error al eliminar ubicación:', error);
        res.status(500).json({ error: "Error al eliminar la ubicación" });
    }
};

