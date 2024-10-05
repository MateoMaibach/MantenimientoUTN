import { Router } from "express";
import {getActivo} from '../controllers/activo.controller.js'
const router = Router()


router.get('/api/activo', getActivo );


export default router