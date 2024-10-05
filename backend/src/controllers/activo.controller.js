import {pool} from '../db.js'

export const getActivo = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM activo',[])
    res.json(rows);
} 