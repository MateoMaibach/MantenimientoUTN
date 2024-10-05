import { Router } from "express";
import {ensureToken, login,protect} from '../controllers/auth.controller.js'
const router = Router()



router.post('/api/login', login );

router.get('/api/protected',ensureToken , protect );


export default router