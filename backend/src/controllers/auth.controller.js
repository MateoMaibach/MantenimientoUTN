import jwt from 'jsonwebtoken'

export const login = (req, res) => {
    const user = { id: 3 };
    const token = jwt.sign({ user }, 'my_secret_key');
    res.json({
        token
    });
}

export const protect = (req, res) => {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({text: 'protected',data})
        }
    });

}

export function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next()
    } else {
        res.sendStatus(403);
    }

}