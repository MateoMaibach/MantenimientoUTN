import {pool} from '../db.js'

export const getSector = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM sector',[])
    res.json(rows);
} 