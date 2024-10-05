import {pool} from '../db.js'


export const GetEdificio = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM edificio', [])
    res.json(rows)
}

