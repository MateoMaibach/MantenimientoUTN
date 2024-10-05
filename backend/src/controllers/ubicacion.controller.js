import {pool} from '../db.js'

export const getUbicacion = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM ubicacion',[])
    res.json(rows);
} 