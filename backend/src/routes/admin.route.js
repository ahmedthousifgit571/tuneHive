import {Router} from 'express'
import { protectedRoute, requiredAdmin } from '../middleware/auth.middleware.js'
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from '../controller/admin.controller.js'

const router = Router()
router.use(protectedRoute,requiredAdmin)   //this will help to get this in every route

router.get("/check",checkAdmin)
router.post("/songs",createSong)
router.delete("/deletesongs/:id",deleteSong)

router.post("/albums",createAlbum)
router.delete("/deletealbum/:id",deleteAlbum)

export default router