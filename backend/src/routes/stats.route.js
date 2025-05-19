import {Router} from 'express'

const router = Router()

router.get("/",(req,res)=>{
   res.send("stats route initiated")
    
})
export default router