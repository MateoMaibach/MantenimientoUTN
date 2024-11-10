import { Router } from "express";
import { getTareas, getTarea, getTareasPorActivoYGrupo } from '../controllers/tarea.controller.js';
const router = Router();

router.get('/api/tareas',getTareas)
router.get('/api/tareas/:id_tarea', getTarea);
router.get('/tareas-por-activo-grupo', getTareasPorActivoYGrupo);

export default router
