import { Router } from "express";
import {getSector, postSector, deleteSector} from '../controllers/sector.controller.js'
const router = Router()


router.get('/api/sector', getSector );
router.post('/api/sector', postSector);
router.delete('/api/sector/:id_sector', deleteSector);


export default router