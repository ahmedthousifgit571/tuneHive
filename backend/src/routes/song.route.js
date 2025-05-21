import {Router} from 'express'
import { deleteSong, featuredSongs, getAllSongs, getMadeForYou, getSongById, getTrendingSongs } from '../controller/song.controller'
import { protectedRoute, requiredAdmin } from '../middleware/auth.middleware.js'

const router = Router()

router.get("/",protectedRoute,requiredAdmin,getAllSongs)
router.get("/featured",featuredSongs)
router.get("/made-for-you",getMadeForYou)
router.get("/trending",getTrendingSongs)
router.get("/:songId",getSongById)

router.delete("/deletesong/:songId",deleteSong)

export default router