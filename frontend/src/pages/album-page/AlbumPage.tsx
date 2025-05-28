import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMusicStore } from "@/stores/useMusicStore"
import { usePlayerStore } from "@/stores/usePlayerStore"
import { Clock, Pause, Play } from "lucide-react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

const AlbumPage = () => {
  const { albumId } = useParams()
  const { isLoading, fetchAlbumById, currentAlbum } = useMusicStore()
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore()

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId)
  }, [fetchAlbumById, albumId])

  if (isLoading) return null

  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return
    playAlbum(currentAlbum?.songs, index)
  }

  const handlePlayAlbum = () => {
    if (!currentAlbum) return

    const isCurrentAlbumPlaying = currentAlbum?.songs.some(song => song._id === currentSong?._id)
    if (isCurrentAlbumPlaying) togglePlay()
    else {
      playAlbum(currentAlbum?.songs, 0)
    }
  }

  return (
    <div className="h-full">
      <ScrollArea className="h-full rounded-md">
        {/* Main content */}
        <div className="relative min-h-full">
          {/* bg gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
               aria-hidden='true'>
          </div>

          {/* content */}
          <div className="relative z-10">
            {/* Album header - responsive layout */}
            <div className="flex flex-col sm:flex-row p-4 sm:p-6 gap-4 sm:gap-6 pb-6 sm:pb-8">
              <div className="flex justify-center sm:justify-start">
                <img 
                  src={currentAlbum?.imageUrl} 
                  alt={currentAlbum?.title}
                  className='w-48 h-48 sm:w-[200px] sm:h-[200px] lg:w-[240px] lg:h-[240px] shadow-xl rounded'
                />
              </div>

              <div className="flex flex-col justify-end text-center sm:text-left">
                <p className="text-sm font-medium">Album</p>
                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold my-2 sm:my-4 leading-tight">
                  {currentAlbum?.title}
                </h1>

                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-zinc-100 flex-wrap">
                  <span className="font-medium text-white">{currentAlbum?.artist}</span>
                  <span className="hidden sm:inline"> • </span>
                  <span>{currentAlbum?.songs.length} songs</span>
                  <span className="hidden sm:inline"> • </span>
                  <span>{currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>

            {/* play button */}
            <div className='px-4 sm:px-6 pb-4 flex items-center justify-center sm:justify-start gap-6'>
              <Button
                onClick={handlePlayAlbum}
                size='icon'
                className='w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-500 hover:bg-green-400 
                           hover:scale-105 transition-all'
              >
                {isPlaying && currentAlbum?.songs.some((song) => song._id === currentSong?._id) ? (
                  <Pause className="h-6 w-6 sm:h-7 sm:w-7 text-black" />
                ) : (
                  <Play className='h-6 w-6 sm:h-7 sm:w-7 text-black' />
                )}
              </Button>
            </div>

            {/* Table section */}
            <div className="bg-black/20 backdrop-blur-sm">
              {/* table header - hide on mobile */}
              <div className='hidden sm:grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-6 lg:px-10 py-2 text-sm 
                             text-zinc-400 border-b border-white/5'>
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className='h-4 w-4' />
                </div>
              </div>

              {/* songs list */}
              <div className="px-2 sm:px-6">
                <div className="space-y-1 sm:space-y-2 py-2 sm:py-4">
                  {currentAlbum?.songs.map((song, index) => {
                    const isCurrentSong = currentSong?._id === song._id
                    return (
                      <div
                        key={song._id}
                        onClick={() => handlePlaySong(index)}
                        className={`
                          /* Mobile layout - stacked */
                          flex flex-col sm:grid sm:grid-cols-[16px_4fr_2fr_1fr] 
                          gap-2 sm:gap-4 p-3 sm:px-4 sm:py-2 text-sm 
                          text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer
                        `}
                      >
                        {/* Mobile: Song info in a single row */}
                        <div className="flex items-center gap-3 sm:contents">
                          {/* Track number/play indicator */}
                          <div className="flex items-center justify-center w-6 sm:w-4">
                            {isCurrentSong && isPlaying ? 
                              <div className="size-4 text-green-500">♫</div> 
                              : 
                              <span className="group-hover:hidden text-xs sm:text-sm">{index + 1}</span>
                            }
                            {!isCurrentSong && <Play className="h-4 w-4 hidden group-hover:block"/>}
                          </div>

                          {/* Song image and details */}
                          <div className="flex items-center gap-3 flex-1 sm:contents">
                            <img 
                              src={song.imageUrl} 
                              alt={song.title}  
                              className="size-10 sm:size-10 rounded"
                            />

                            <div className="flex-1 min-w-0">
                              <div className={`font-medium text-white truncate`}>
                                {song.title}
                              </div>
                              <div className="text-zinc-400 text-xs sm:text-sm truncate">
                                {song?.artist}
                              </div>
                            </div>
                          </div>

                          {/* Duration - always visible on mobile */}
                          <div className="flex items-center text-xs sm:hidden ml-auto">
                            {formatDuration(song?.duration)}
                          </div>
                        </div>

                        {/* Desktop: Release date and duration in separate columns */}
                        <div className="hidden sm:flex items-center">
                          {song.createdAt ? song.createdAt.split("T")[0] : 'N/A'}
                        </div>
                        <div className="hidden sm:flex items-center">
                          {formatDuration(song?.duration)}
                        </div>

                        {/* Mobile: Additional info row */}
                        <div className="flex justify-between text-xs text-zinc-500 sm:hidden">
                          <span>
                            {song.createdAt ? song.createdAt.split("T")[0] : 'N/A'}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default AlbumPage