import {Router} from 'express'
import { protectedRoute, requiredAdmin } from '../middleware/auth.middleware'

const router = Router()

router.get("/",protectedRoute,requiredAdmin,createSong)

export default router