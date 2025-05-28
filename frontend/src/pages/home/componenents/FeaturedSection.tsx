import { useMusicStore } from "@/stores/useMusicStore";
import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import PlayButton from "./PlayButton";

const FeaturedSection = () => {
	const { isLoading, featuredSongs, error } = useMusicStore();

	if (isLoading) return <FeaturedGridSkeleton />;

	if (error) return <p className='text-red-500 mb-4 text-lg'>{error}</p>;

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mb-8 px-2 sm:px-0'>
			{featuredSongs.map((song) => (
				<div
					key={song._id}
					className='flex items-center bg-zinc-800/50 rounded-md overflow-hidden
         hover:bg-zinc-700/50 transition-colors group cursor-pointer relative min-h-[64px] sm:min-h-[80px]'
				>
					<img
						src={song.imageUrl}
						alt={song.title}
						className='w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover flex-shrink-0'
					/>
					<div className='flex-1 p-2 sm:p-3 md:p-4 pr-12 sm:pr-16 min-w-0'>
						<p className='font-medium truncate text-sm sm:text-base'>{song.title}</p>
						<p className='text-xs sm:text-sm text-zinc-400 truncate'>{song.artist}</p>
					</div>
					<div className='absolute right-1 sm:right-2'>
						<PlayButton song={song} />
					</div>
				</div>
			))}
		</div>
	);
};

export default FeaturedSection;