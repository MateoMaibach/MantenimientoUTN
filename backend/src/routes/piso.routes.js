import { Router } from "express";
import { getPiso, postPiso, deletePiso } from "../controllers/piso.controller.js";
const router = Router()

router.get('/api/piso', getPiso);
router.post('/api/piso', postPiso);
router.delete('/api/piso/:id_piso', deletePiso);


export default router