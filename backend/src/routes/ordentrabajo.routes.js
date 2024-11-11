import { Router } from 'express';
import { postOrden, getOrdenes, deleteOrden,getOrdenOP, getOrdenID } from '../controllers/ordentrabajo.controller.js';

const router = Router();

router.post('/api/ordentrabajo', postOrden);

router.get('/api/ordentrabajo', getOrdenes);

router.get('/api/ordentrabajo/:operario_username', getOrdenOP)

router.delete('/api/ordentrabajo/:id', deleteOrden);

router.get ('/api/ordentrabajo/id/:id',getOrdenID)

export default router;
