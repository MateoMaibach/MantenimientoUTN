import { Router } from "express";
import {deleteUbicacion, getUbicacion, postUbicacion} from '../controllers/ubicacion.controller.js'
const router = Router()


router.get('/api/ubicacion', getUbicacion );
router.post('/api/ubicacion', postUbicacion);
router.delete('/api/ubicacion/:id_ubicacion', deleteUbicacion);

export default router