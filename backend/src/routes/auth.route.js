import {Router} from 'express'

const router = Router()

router.get("/",(req,res)=>{
    res.send("auth route initiated")
})

export default router