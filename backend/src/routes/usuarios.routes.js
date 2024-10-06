import { Router } from "express";
import { getUsuarios, postUsuarios, deleteUsuario } from "../controllers/usuarios.controllers.js";
import { login, protect, authorize } from '../controllers/auth.controller.js'

const router = Router()

router.post('/api/login', login)

router.get('/api/usuarios', protect, authorize(['admin']), getUsuarios  );
router.post('/api/usuarios', protect, authorize (['admin']),  postUsuarios);
router.delete('/api/usuarios/:username',protect, authorize(['admin']), deleteUsuario);


export default router