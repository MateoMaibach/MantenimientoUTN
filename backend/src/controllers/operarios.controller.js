import {pool} from '../db.js'


export const postOperario = async (req, res) => {
    const {nombre, apellido} = req.body
    const [rows] = await pool.query('INSERT INTO operarios (nombre, apellido) VALUES (?, ?)',
    [nombre, apellido])
    res.send({rows});
}

export const getOperario = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM operarios', [])
    res.json(rows)
}

export const deleteOperario = async (req, res) => {
    const [rows] = await pool.query('DELETE FROM operarios WHERE id_operario = ?',[req.params.id])
    res.send ('Operario eliminado')
}