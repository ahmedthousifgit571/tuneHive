export interface Song {
    _id:string
    title:string
    artist:string
    albumId:string | null 
    imageUrl:string
    audioUrl:string
    duration:number
    createtedAt:Date
    updatedAt:Date
}

export interface Album {
    _id:string
    title:string
    artist:string
    imageUrl:string
    releaseYear:string
    songs:Song[]
}