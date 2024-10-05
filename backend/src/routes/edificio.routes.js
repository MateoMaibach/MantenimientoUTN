import { Router } from "express";
import { GetEdificio } from "../controllers/edificio.controller.js";
const router = Router()

router.get('/api/edificio', GetEdificio);



export default router