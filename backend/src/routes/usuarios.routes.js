import { Router } from "express";

import { getUsuarios, postUsuarios, deleteUsuario } from "../controllers/usuarios.controllers.js";
const router = Router()


router.get('/api/usuarios',getUsuarios  );
router.post('/api/usuarios', postUsuarios);
router.delete('/api/usuarios/:username',deleteUsuario);


export default router