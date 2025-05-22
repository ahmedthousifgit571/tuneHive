import {Router} from 'express'
import { getAllUsers } from '../controller/user.controller.js'
import { protectedRoute } from '../middleware/auth.middleware.js'
const router = Router()

router.get("/",protectedRoute,getAllUsers)

export default router


