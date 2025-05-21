import Album from "../models/album.model"


export const getAllAlbums = async(req,res,next)=>{
    try {
        const albums = await Album.find()
        return res.status(200).json(albums)
    } catch (error) {
        console.log("error in getAlbum controller",error)
        next(error)
    }
}


export const getAlbumById = async(req,res,next)=>{
    try {
        const {id} = req.params
        const album = await Album.findById(id)
        if(!album){
            return res.status(400).json({message:"album not found"})
        }
        return res.status(200).json(album).populate("songs")
    } catch (error) {
        console.log("error in getAlbumById controller",error)
        next(error)
    }
}