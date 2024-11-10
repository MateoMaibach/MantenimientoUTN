import { Router } from 'express';
import { postOrden, getOrdenes, deleteOrden } from '../controllers/ordentrabajo.controller.js';

const router = Router();

router.post('/api/ordentrabajo', postOrden);

router.get('/api/ordentrabajo', getOrdenes);

router.delete('/api/ordentrabajo/:id', deleteOrden);


export default router;
