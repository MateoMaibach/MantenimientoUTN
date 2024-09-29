import { Router } from "express";
import { getPiso } from "../controllers/piso.controller.js";
const router = Router()

router.get('/api/piso', getPiso);

export default router