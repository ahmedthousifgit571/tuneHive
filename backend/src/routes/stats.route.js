import {Router} from 'express'
import {  getStats } from '../controller/stat.controller.js'
import {protectedRoute,requiredAdmin} from '../middleware/auth.middleware.js'
const router = Router()

router.get("/",protectedRoute,requiredAdmin,getStats)


export default router