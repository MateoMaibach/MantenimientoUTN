import { Router } from "express";
import { GetEdificio, postEdificio, deleteEdificio } from "../controllers/edificio.controller.js";
const router = Router()

router.get('/api/edificio', GetEdificio);
router.post('/api/edificio', postEdificio);
router.delete('/api/edificio', deleteEdificio);



export default router