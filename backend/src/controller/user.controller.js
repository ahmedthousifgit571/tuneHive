import User from '../models/user.model.js'

export const getAllUsers = async (req,res,next)=>{
    try {
      const currentUserId = req.auth.userId
      const users = await User.find({clerkId: {$ne:currentUserId}})  //inorder to avoid the current user 
      return res.status(200).json(users)
    } catch (error) {
        console.log("error in getUser controller",error);
        next(error)
    }
}