import {pool} from '../db.js'

export const getUsuarios= async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM usuarios',[])
    res.json(rows);
} 

export const postUsuarios = async (req, res) => {
    const {username, password, role} = req.body
    const [rows] = await pool.query('INSERT INTO usuarios (username, password, role) VALUES (?, ?, ?)',
    [username, password, role])
    res.send({rows});
}

export const deleteUsuario = async (req, res) => {
    const [rows] = await pool.query('DELETE FROM usuarios WHERE username = ?',[req.params.username])
    if (rows.affectedRows > 0) {
        res.send('Usuario eliminado');
    } else {
        res.status(404).send('Usuario no encontrado');
    }
}