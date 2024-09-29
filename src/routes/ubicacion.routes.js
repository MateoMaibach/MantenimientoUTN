import { Router } from "express";
import {getUbicacion} from '../controllers/ubicacion.controller.js'
const router = Router()


router.get('/api/ubicacion', getUbicacion );


export default router