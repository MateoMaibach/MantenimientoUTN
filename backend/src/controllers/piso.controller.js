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
    
        
        const [lastPiso] = await pool.query('SELECT MAX(num_tag) AS max_num_tag FROM piso');
    
       
        const num_tag = lastPiso[0].max_num_tag ? lastPiso[0].max_num_tag + 1 : 1;
    
        
        await pool.query('INSERT INTO piso (num_tag, nombre, existe) VALUES (?, ?, ?)', [num_tag, nombre, existe]);
    
        
        res.status(201).json({ message: "Piso creado con éxito" });
    } catch (error) {
        console.error('Error al crear piso:', error);
        res.status(500).json({ error: "Error al crear el piso" });
    }
    
};

export const deletePiso = async (req, res) => {
    try {
        const { nombre } = req.query;

        
        const [existingPiso] = await pool.query('SELECT * FROM piso WHERE nombre = ?', [nombre]);

        if (existingPiso.length === 0) {
            return res.status(404).json({ error: "Piso no encontrado" });
        }

        
        await pool.query('DELETE FROM piso WHERE nombre = ?', [nombre]);


        
        res.json({ message: "Piso eliminado con éxito" });
    } catch (error) {
        console.error('Error al eliminar piso:', error);
        res.status(500).json({ error: "Error al eliminar el piso" });
    }
};