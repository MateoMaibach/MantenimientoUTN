import { Router } from "express";
import { getUsuarios, postUsuarios, deleteUsuario } from "../controllers/usuarios.controller.js";
import { login } from '../controllers/auth.controller.js'

const router = Router()

router.post('/api/login', login)

router.get('/api/usuarios', getUsuarios  );
router.post('/api/usuarios', postUsuarios);

router.delete('/api/usuarios/:id_usuarios', deleteUsuario);


export default router