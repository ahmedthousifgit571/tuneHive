import Song from '../models/song.model.js'
import Album from '../models/album.model.js'
import Cloudinary from '../lib/cloudinary.js'


// helper function for cloudinary uploads
const uploadToCloudinary = async(file)=>{
 try {
    const result  = await Cloudinary.uploader.upload(file.tempFilePath,{
        resource_type : "auto"
    })
    return result.secure_url

 } catch (error) {
    console.log("error in uploadtocloudinary",error)
    throw new Error("error uploading to cloudinary")
 }
}


export const checkAdmin = async(req,res,next)=>{
    res.status(200).json({admin:true})
}

export const createSong = async(req,res,next)=>{
    try {
        if(!req.files || !req.files.audioFile ||!req.files.imageFile){
            return res.status(400).json({message:"please upload all files"})
        }
        const {title,artist, albumId,duration} = req.body
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile
        
        // upload file in cloudinary
        const audioUrl = await uploadToCloudinary(audioFile)
        const imageUrl = await uploadToCloudinary(imageFile)

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId : albumId || null
        })
        await song.save()

        // if songs belongs to album update the songs to the album
        if(albumId){
            await Album.findByIdAndUpdate({
                $push: {songs : song._id}
            })
        }
        res.status(201).json(song)
    } catch (error) {
        console.log("error in createSong controller",error)
        next(error)
    }
}

export const deleteSong = async(req,res,next)=>{
    try {
        const {id} = req.params
        const song = await Song.findById(id)

        // if song is there in album remove it
        if(song.albumId){
          await Album.findByIdAndUpdate({
            $pull:{songs:song._id}
          })
        }

        await Song.findByIdAndDelete(id)

        return res.status(200).json({message:"song deleted successfully"})
    } catch (error) {
        console.log("error in deletSong controller",error)
        next(error)
    }
}

export const createAlbum = async(req,res,next)=>{
    try {
        const {title,artist,releaseYear} = req.body
        const {imageFile} = req.files
        const imageUrl = await uploadToCloudinary(imageFile)

        const album = new Album({
            title,
            artist,
            releaseYear,
            imageUrl
        })
        await album.save()
        return res.status(201).json(album)
    } catch (error) {
        console.log("error in createAlbum controller",error)
        next(error)
    }
}


export const deleteAlbum = async(req,res,next)=>{
    try {
        const {id} = req.params
        await Song.deleteMany({albumId:id})
        await Album.findByIdAndDelete(id)

    } catch (error) {
        console.log("error in deleteAlbum controller",error)
        next(error)
    }
}