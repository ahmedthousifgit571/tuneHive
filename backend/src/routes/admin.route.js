import {Router} from 'express'
import { protectedRoute, requiredAdmin } from '../middleware/auth.middleware.js'
import { createSong } from '../controller/admin.controller.js'

const router = Router()

router.post("/songs",protectedRoute,requiredAdmin,createSong)

export default router