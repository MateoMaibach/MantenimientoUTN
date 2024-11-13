import { Router } from 'express';
import { postOrden, getOrdenes, deleteOrden,getOrdenOP, getOrdenID, getOrdenAC } from '../controllers/ordentrabajo.controller.js';

const router = Router();

router.post('/api/ordentrabajo', postOrden);

router.get('/api/ordentrabajo', getOrdenes);

router.get('/api/ordentrabajo/:operario_username', getOrdenOP)

router.delete('/api/ordentrabajo/:id', deleteOrden);

router.get ('/api/ordentrabajo/id/:id',getOrdenID)
router.get ('/api/ordentrabajo/ac/:tipo_activo',getOrdenAC)

export default router;
