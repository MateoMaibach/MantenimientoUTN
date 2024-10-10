import {pool} from '../db.js'


export const postOperario = async (req, res) => {
    try {
        const { nombre, apellido } = req.body;
        const [rows] = await pool.query('INSERT INTO operarios (nombre, apellido) VALUES (?, ?)', [nombre, apellido]);
        res.status(201).json({ message: 'Operario registrado exitosamente', id: rows.insertId });
    } catch (error) {
        console.error('Error al registrar operario:', error);
        res.status(500).json({ message: 'Error al registrar el operario' });
    }
};

export const getOperario = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM operarios', []);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener operarios:', error);
        res.status(500).json({ message: 'Error al obtener los operarios' });
    }
};

export const deleteOperario = async (req, res) => {
    try {
        const [rows] = await pool.query('DELETE FROM operarios WHERE id_operario = ?', [req.params.id]);
        if (rows.affectedRows > 0) {
            res.send('Operario eliminado');
        } else {
            res.status(404).send('Operario no encontrado');
        }
    } catch (error) {
        console.error('Error al eliminar operario:', error);
        res.status(500).json({ message: 'Error al eliminar el operario' });
    }
};
