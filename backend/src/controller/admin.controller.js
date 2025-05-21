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
        const imageUrl = await uploadToCloudinary(imageUrl)

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