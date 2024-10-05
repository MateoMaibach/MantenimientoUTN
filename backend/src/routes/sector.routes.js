import { Router } from "express";
import {getSector} from '../controllers/sector.controller.js'
const router = Router()


router.get('/api/sector', getSector );


export default router