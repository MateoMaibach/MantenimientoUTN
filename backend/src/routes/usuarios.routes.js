import { Router } from "express";
import { getUsuarios, postUsuarios, deleteUsuario } from "../controllers/usuarios.controller.js";
import { login, protect, authorize } from '../controllers/auth.controller.js'

const router = Router()

router.post('/api/login', login)

router.get('/api/usuarios', /*protect, authorize(['admin']),*/ getUsuarios  );
router.post('/api/usuarios', /*protect, authorize(['admin']),*/  postUsuarios);
// Ruta para eliminar un usuario por id_usuarios
router.delete('/api/usuarios/:id_usuarios', deleteUsuario, /*protect, authorize(['admin']),*/);


export default router