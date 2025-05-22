import Song from '../models/song.model.js'
import User from '../models/user.model.js'
import Album from '../models/album.model.js'

export const getStats = async(req,res,next)=>{
    try {
    
        const [totalSongs,totalUsers,totalAlbums,uniqueArtists] = await Promise.all([
            Song.countDocuments(),
            User.countDocuments(),
            Album.countDocuments(),

            Song.aggregate([
                {
                    $unionWith:{
                        coll:"album",
                        pipeline:[]
                    }
                },
                {
                    $group:{
                        _id:"$artist",
                    }
                },
                {
                    $count:"count"
                }
            ])

        ])
        return res.status(200).json({
          totalSongs,
          totalAlbums,
          totalUsers,
          totalArtists : uniqueArtists[0]?.count || 0
        })
        
    } catch (error) {
        console.log("error in getAllSongs controller",error);
        next(error)
        
    }
}