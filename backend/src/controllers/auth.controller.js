import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { pool } from '../db.js'


export const login = async (req, res) => {
    const { username, password } = req.body;

    
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE username = ?', [username]);
    const user = rows[0];

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(403).json({ message: 'Contraseña incorrecta' });
    }
     
    const token = jwt.sign({ id: user.id_usuarios, role: user.role }, 'my_secret_key', { expiresIn: '1h' });

     res.json({ token });
}


export const protect = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.sendStatus(403);
    }

    jwt.verify(token, 'my_secret_key', (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.user = decoded; 
        next();
    });
}


export const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.sendStatus(403); 
        }
        next();
    };
}


