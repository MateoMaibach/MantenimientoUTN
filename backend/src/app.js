import express from 'express'
import cors from 'cors'
import {PORT} from './config.js' 


import auth from './routes/auth.routes.js'
import operarios from './routes/operarios.routes.js'
import edificio from './routes/edificio.routes.js'
import piso from './routes/piso.routes.js'
import sector from './routes/sector.routes.js'
import ubicacion from './routes/ubicacion.routes.js'
import activo from './routes/activo.routes.js'
import usuarios from './routes/usuarios.routes.js'
import tareas from './routes/tarea.routes.js'
const app = express();

app.use(cors({
    origin: 'http://localhost:4200', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true 
}));


app.get('/', (req, res) => {
    res.json({
        text: 'api works!'
    })
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(auth, operarios, edificio, piso, sector, ubicacion, activo, usuarios, tareas)

export default app;

