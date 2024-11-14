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
        const { nombre } = req.body; 

        
        if (!nombre) {
            return res.status(400).json({ error: 'Falta el dato requerido: nombre' });
        }

        
        const existe = true;

        
        const [lastNumTag] = await pool.query('SELECT num_tag FROM edificio ORDER BY num_tag DESC LIMIT 1');

        let num_tag;
        if (lastNumTag.length > 0) {
            num_tag = lastNumTag[0].num_tag + 1;
        } else {
            num_tag = 1;
        }

        
        await pool.query('INSERT INTO edificio (num_tag, nombre, existe) VALUES (?, ?, ?)', 
            [num_tag, nombre, existe]);

        res.status(201).json({ message: 'Edificio creado con éxito', num_tag, nombre, existe });
    } catch (error) {
        console.error('Error al crear edificio:', error);
        res.status(500).json({ error: 'Error al crear el edificio' });
    }
};


export const deleteEdificio = async (req, res) => {
    try {
        const { nombre } = req.query; 

        
        const [existingEdificio] = await pool.query('SELECT * FROM edificio WHERE nombre = ?', [nombre]);

        if (existingEdificio.length === 0) {
            
            return res.status(404).json({ error: "Edificio no encontrado" });
        }

       
        await pool.query('DELETE FROM edificio WHERE nombre = ?', [nombre]);

        
        res.json({ message: "Edificio eliminado con éxito" });
    } catch (error) {
        console.error('Error al eliminar edificio:', error);
        res.status(500).json({ error: "Error al eliminar el edificio" });
    }
};