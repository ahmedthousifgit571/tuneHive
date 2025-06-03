import Message from '../models/message.model.js';
import User from '../models/user.model.js'

export const getAllUsers = async (req,res,next)=>{
    try {
      const currentUserId = req.auth.userId
      if (!currentUserId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
      const users = await User.find({clerkId: {$ne:currentUserId}})  //inorder to avoid the current user 
      return res.status(200).json(users)
    } catch (error) {
        console.log("error in getUser controller",error);
        next(error)
    }
}

export const getMessages = async(req,res,next)=>{
  try {
    const myId = req.auth.userId
    const {userId} = req.params

    const message = await Message.find({
      $or:[
        {senderId:userId,recieverId:myId},
        {senderId:myId,recieverId:userId}
      ]
    }).sort({createdAt :1})

    res.status(200).json(message)
  } catch (error) {
    console.log("error in getMessage controller",error);
    next(error)
  }
}