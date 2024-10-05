import { pool } from "../db.js";

export const getPiso = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM piso',[])
    res.json(rows);
}