import Album from "../models/album.model.js"


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
        const {albumId} = req.params
        const album = await Album.findById(albumId).populate("songs");
        if(!album){
            return res.status(400).json({message:"album not found"})
        }
        return res.status(200).json(album)
    } catch (error) {
        console.log("error in getAlbumById controller",error)
        next(error)
    }
}