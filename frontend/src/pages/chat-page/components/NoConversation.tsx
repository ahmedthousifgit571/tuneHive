const NoConversationPlaceholder = () => (
	<div className='flex flex-col items-center justify-center min-h-[400px] h-[calc(100vh-180px)] space-y-6 px-4'>
		{/* Logo with bounce animation */}
		<img src='/logo.png' alt='Spotify' className='size-16 animate-bounce' />

		{/* Text content with better contrast */}
		<div className='text-center space-y-3'>
			<h3 className='text-white text-lg font-medium mb-1'>
				No conversation selected
			</h3>
			<p className='text-zinc-300 text-sm'>
				Choose a friend to start chatting
			</p>
		</div>
	</div>
)

export default NoConversationPlaceholder