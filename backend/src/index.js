import express from 'express'
import auth from './routes/auth.routes.js'
import operarios from './routes/operarios.routes.js'
import edificio from './routes/edificio.routes.js'
import piso from './routes/piso.routes.js'
import sector from './routes/sector.routes.js'
import ubicacion from './routes/ubicacion.routes.js'
import activo from './routes/activo.routes.js'

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        text: 'api works!'
    })
})

app.use(auth, operarios, edificio, piso, sector, ubicacion, activo)






app.listen(3000, () => {
    console.log('Server on port 3000')
});

