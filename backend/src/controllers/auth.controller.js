import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { pool } from '../db.js'


export const login = async (req, res) => {
    try {
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

        
        const token = jwt.sign(
            { 
                id: user.id_usuarios, 
                username: user.username,  
                role: user.role 
            },
            'my_secret_key', 
            { expiresIn: '1h' }
        );

        res.json({ token });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};



export const protect = (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.sendStatus(403).json({ message: 'No token provided' });
        }

        jwt.verify(token, 'my_secret_key', (err, decoded) => {
            if (err) {
                return res.sendStatus(403).json({ message: 'Invalid token' });
            }

            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error('Error in protect middleware:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const authorize = (roles) => {
    return (req, res, next) => {
        try {
            if (!req.user || !roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'No tienes autorización para acceder a este recurso' });
            }
            next(); 
        } catch (error) {
            console.error('Error en authorize middleware:', error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    };
};


