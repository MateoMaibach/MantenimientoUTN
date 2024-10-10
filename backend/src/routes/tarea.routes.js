import { Router } from "express";
import { getTareas, getTarea } from "../controllers/tarea.controller.js";

const router = Router();

router.get('/api/tareas',getTareas)
router.get('/api/tareas/:id_tarea', getTarea);

export default router