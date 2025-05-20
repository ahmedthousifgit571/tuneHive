import User from '../models/user.model.js'

export const authCallback = async(req,res)=>{
    try {
        const {id,firstName,lastName,imageUrl} = req.body
        const user = User.findOne({id:clerkId})
        if(!user){
            user.create({
                clerkId:id,
                fullName: `${firstName} ${lastName}`,
                imageUrl
            })
        }
        res.status(200).json({success:true})
    } catch (error) {
        console.log("error in callbacke controller",error);
        res.status(500).json({success:false})
    }
}

