import Song from '../models/song.model.js'

export const getAllSongs = async (req,res,next)=>{
    try {
        const song = await Song.find().sort({createdAt:-1})
        return res.status(200).json(song)
    } catch (error) {
        console.log("error in getSongs controller",error);
        next(error)
        
    }
}

export const featuredSongs = async(req,res,next)=>{
    try {
         const songs = await Song.aggregate([
            {
                $sample:{size:6}
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ])
        return res.status(200).json(songs)
    } catch (error) {
        console.log("error in featuredSongs contorller",error)
        next(error)
    }
}

export const getMadeForYou = async(req,res,next)=>{
    try {
         const songs = await Song.aggregate([
            {
                $sample:{size:4}
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ])
        return res.status(200).json(songs)
    } catch (error) {
        console.log("error in featuredSongs contorller",error)
        next(error)
    }
}

export const getTrendingSongs = async(req,res,next)=>{
    try {
        const songs = await Song.aggregate([
            {
                $sample:{size:6}
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ])
        return res.status(200).json(songs)
    } catch (error) {
        console.log("error in getTrendingSongs contorller",error)
        next(error)
    }
}

export const getSongById = async (req,res,next)=>{
    try {
        const {id} = req.params
        const song = await Song.findById(id)
        return res.status(200).json(song)
    } catch (error) {
        console.log("error in getSongById controller",error);
        next(error)
    }
}


export const deleteSong = async(req,res,next)=>{
    try {
        const {id} = req.params
        const deletedsong = await Song.findByIdAndDelete(id)

        return res.status(200).json({message:"song deleted successfully"})
    } catch (error) {
        console.log("error in getSongById controller",error);
        next(error)
    }
}