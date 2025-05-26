import mongoose from "mongoose";
import Song from "../models/song.model.js";
import Album from "../models/album.model.js";
import { config } from "dotenv";

config();

const seedSongs = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		// First, get existing albums or create a default one
		let albums = await Album.find({});
		
		if (albums.length === 0) {
			console.log("No albums found. Creating a default album first...");
			const defaultAlbum = await Album.create({
				title: "Mixed Collection",
				artist: "Various Artists",
				imageUrl: "/albums/default.jpg",
				releaseYear: 2024,
				songs: []
			});
			albums = [defaultAlbum];
		}

		const songs = [
			{
				title: "Stay With Me",
				artist: "Sarah Mitchell",
				imageUrl: "/cover-images/1.jpg",
				audioUrl: "/songs/1.mp3",
				duration: 46,
				albumId: albums[0]._id, // Reference first album
			},
			{
				title: "Midnight Drive",
				artist: "The Wanderers",
				imageUrl: "/cover-images/2.jpg",
				audioUrl: "/songs/2.mp3",
				duration: 41,
				albumId: albums[Math.min(1, albums.length - 1)]._id,
			},
			{
				title: "Lost in Tokyo",
				artist: "Electric Dreams",
				imageUrl: "/cover-images/3.jpg",
				audioUrl: "/songs/3.mp3",
				duration: 24,
				albumId: albums[Math.min(2, albums.length - 1)]._id,
			},
			{
				title: "Summer Daze",
				artist: "Coastal Kids",
				imageUrl: "/cover-images/4.jpg",
				audioUrl: "/songs/4.mp3",
				duration: 24,
				albumId: albums[Math.min(3, albums.length - 1)]._id,
			},
			{
				title: "Neon Lights",
				artist: "Night Runners",
				imageUrl: "/cover-images/5.jpg",
				audioUrl: "/songs/5.mp3",
				duration: 36,
				albumId: albums[0]._id,
			},
			{
				title: "Mountain High",
				artist: "The Wild Ones",
				imageUrl: "/cover-images/6.jpg",
				audioUrl: "/songs/6.mp3",
				duration: 40,
				albumId: albums[Math.min(1, albums.length - 1)]._id,
			},
			{
				title: "City Rain",
				artist: "Urban Echo",
				imageUrl: "/cover-images/7.jpg",
				audioUrl: "/songs/7.mp3",
				duration: 39,
				albumId: albums[Math.min(2, albums.length - 1)]._id,
			},
			{
				title: "Desert Wind",
				artist: "Sahara Sons",
				imageUrl: "/cover-images/8.jpg",
				audioUrl: "/songs/8.mp3",
				duration: 28,
				albumId: albums[Math.min(3, albums.length - 1)]._id,
			},
			{
				title: "Ocean Waves",
				artist: "Coastal Drift",
				imageUrl: "/cover-images/9.jpg",
				audioUrl: "/songs/9.mp3",
				duration: 28,
				albumId: albums[0]._id,
			},
			{
				title: "Starlight",
				artist: "Luna Bay",
				imageUrl: "/cover-images/10.jpg",
				audioUrl: "/songs/10.mp3",
				duration: 30,
				albumId: albums[Math.min(1, albums.length - 1)]._id,
			},
			{
				title: "Winter Dreams",
				artist: "Arctic Pulse",
				imageUrl: "/cover-images/11.jpg",
				audioUrl: "/songs/11.mp3",
				duration: 29,
				albumId: albums[Math.min(2, albums.length - 1)]._id,
			},
			{
				title: "Purple Sunset",
				artist: "Dream Valley",
				imageUrl: "/cover-images/12.jpg",
				audioUrl: "/songs/12.mp3",
				duration: 17,
				albumId: albums[Math.min(3, albums.length - 1)]._id,
			},
			{
				title: "Neon Dreams",
				artist: "Cyber Pulse",
				imageUrl: "/cover-images/13.jpg",
				audioUrl: "/songs/13.mp3",
				duration: 39,
				albumId: albums[0]._id,
			},
			{
				title: "Moonlight Dance",
				artist: "Silver Shadows",
				imageUrl: "/cover-images/14.jpg",
				audioUrl: "/songs/14.mp3",
				duration: 27,
				albumId: albums[Math.min(1, albums.length - 1)]._id,
			},
			{
				title: "Urban Jungle",
				artist: "City Lights",
				imageUrl: "/cover-images/15.jpg",
				audioUrl: "/songs/15.mp3",
				duration: 36,
				albumId: albums[Math.min(2, albums.length - 1)]._id,
			},
			{
				title: "Crystal Rain",
				artist: "Echo Valley",
				imageUrl: "/cover-images/16.jpg",
				audioUrl: "/songs/16.mp3",
				duration: 39,
				albumId: albums[Math.min(3, albums.length - 1)]._id,
			},
			{
				title: "Neon Tokyo",
				artist: "Future Pulse",
				imageUrl: "/cover-images/17.jpg",
				audioUrl: "/songs/17.mp3",
				duration: 39,
				albumId: albums[0]._id,
			},
			{
				title: "Midnight Blues",
				artist: "Jazz Cats",
				imageUrl: "/cover-images/18.jpg",
				audioUrl: "/songs/18.mp3",
				duration: 29,
				albumId: albums[Math.min(1, albums.length - 1)]._id,
			},
		];

		// Clear existing songs
		await Song.deleteMany({});

		// Insert new songs
		const createdSongs = await Song.insertMany(songs);

		// Update albums to include these new songs
		for (const album of albums) {
			const albumSongs = createdSongs.filter(song => 
				song.albumId.toString() === album._id.toString()
			);
			
			await Album.findByIdAndUpdate(album._id, {
				$addToSet: { songs: { $each: albumSongs.map(s => s._id) } }
			});
		}

		console.log("Songs seeded successfully!");
		console.log(`Created ${createdSongs.length} songs across ${albums.length} albums`);
	} catch (error) {
		console.error("Error seeding songs:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedSongs();