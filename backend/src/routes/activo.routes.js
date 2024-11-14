import { Router } from "express";
import {deleteActivo, getActivo, postActivo} from '../controllers/activo.controller.js'
const router = Router()


router.get('/api/activo', getActivo );
router.post('/api/activo', postActivo);
router.delete('/api/activo', deleteActivo);

export default router