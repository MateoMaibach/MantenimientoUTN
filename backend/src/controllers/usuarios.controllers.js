import { pool } from '../db.js'
import bcrypt from 'bcrypt'

export const getUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios', []);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};


export const postUsuarios = async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO usuarios (username, password, role) VALUES (?, ?, ?)',
            [username, hashedPassword, role]
        );

        res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.insertId });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'El nombre de usuario ya existe' });
        }

        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};


export const deleteUsuario = async (req, res) => {
    try {
        const [rows] = await pool.query('DELETE FROM usuarios WHERE username = ?', [req.params.username]);
        if (rows.affectedRows > 0) {
            res.send('Usuario eliminado');
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).send('Error al eliminar el usuario');
    }
};
