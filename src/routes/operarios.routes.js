import { Router } from "express";
import { deleteOperario, getOperario,postOperario } from "../controllers/operarios.controller.js";
const router = Router()

router.get('/api/operarios', getOperario);

router.post('/api/operarios', postOperario)

router.delete('/api/operarios/:id',deleteOperario)

export default router