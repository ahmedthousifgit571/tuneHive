import mongoose from "mongoose";
import Song from "../models/song.model.js";
import Album from "../models/album.model.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		// Clear existing data
		await Album.deleteMany({});
		await Song.deleteMany({});

		// Create albums first (without songs)
		const createdAlbums = await Album.insertMany([
			{
				title: "Urban Nights",
				artist: "Various Artists",
				imageUrl: "/albums/1.jpg",
				releaseYear: 2024,
				songs: [], // Empty for now
			},
			{
				title: "Coastal Dreaming",
				artist: "Various Artists",
				imageUrl: "/albums/2.jpg",
				releaseYear: 2024,
				songs: [], // Empty for now
			},
			{
				title: "Midnight Sessions",
				artist: "Various Artists",
				imageUrl: "/albums/3.jpg",
				releaseYear: 2024,
				songs: [], // Empty for now
			},
			{
				title: "Eastern Dreams",
				artist: "Various Artists",
				imageUrl: "/albums/4.jpg",
				releaseYear: 2024,
				songs: [], // Empty for now
			},
		]);

		// Now create songs with proper albumId references
		const songsData = [
			// Urban Nights album songs (indices 0-3)
			{
				title: "City Rain",
				artist: "Urban Echo",
				imageUrl: "/cover-images/7.jpg",
				audioUrl: "/songs/7.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 39,
				albumId: createdAlbums[0]._id,
			},
			{
				title: "Neon Lights",
				artist: "Night Runners",
				imageUrl: "/cover-images/5.jpg",
				audioUrl: "/songs/5.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 36,
				albumId: createdAlbums[0]._id,
			},
			{
				title: "Urban Jungle",
				artist: "City Lights",
				imageUrl: "/cover-images/15.jpg",
				audioUrl: "/songs/15.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 36,
				albumId: createdAlbums[0]._id,
			},
			{
				title: "Neon Dreams",
				artist: "Cyber Pulse",
				imageUrl: "/cover-images/13.jpg",
				audioUrl: "/songs/13.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 39,
				albumId: createdAlbums[0]._id,
			},
			// Coastal Dreaming album songs (indices 4-7)
			{
				title: "Summer Daze",
				artist: "Coastal Kids",
				imageUrl: "/cover-images/4.jpg",
				audioUrl: "/songs/4.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 24,
				albumId: createdAlbums[1]._id,
			},
			{
				title: "Ocean Waves",
				artist: "Coastal Drift",
				imageUrl: "/cover-images/9.jpg",
				audioUrl: "/songs/9.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 28,
				albumId: createdAlbums[1]._id,
			},
			{
				title: "Crystal Rain",
				artist: "Echo Valley",
				imageUrl: "/cover-images/16.jpg",
				audioUrl: "/songs/16.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 39,
				albumId: createdAlbums[1]._id,
			},
			{
				title: "Starlight",
				artist: "Luna Bay",
				imageUrl: "/cover-images/10.jpg",
				audioUrl: "/songs/10.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 30,
				albumId: createdAlbums[1]._id,
			},
			// Midnight Sessions album songs (indices 8-10)
			{
				title: "Stay With Me",
				artist: "Sarah Mitchell",
				imageUrl: "/cover-images/1.jpg",
				audioUrl: "/songs/1.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 46,
				albumId: createdAlbums[2]._id,
			},
			{
				title: "Midnight Drive",
				artist: "The Wanderers",
				imageUrl: "/cover-images/2.jpg",
				audioUrl: "/songs/2.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 41,
				albumId: createdAlbums[2]._id,
			},
			{
				title: "Moonlight Dance",
				artist: "Silver Shadows",
				imageUrl: "/cover-images/14.jpg",
				audioUrl: "/songs/14.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 27,
				albumId: createdAlbums[2]._id,
			},
			// Eastern Dreams album songs (indices 11-13)
			{
				title: "Lost in Tokyo",
				artist: "Electric Dreams",
				imageUrl: "/cover-images/3.jpg",
				audioUrl: "/songs/3.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 24,
				albumId: createdAlbums[3]._id,
			},
			{
				title: "Neon Tokyo",
				artist: "Future Pulse",
				imageUrl: "/cover-images/17.jpg",
				audioUrl: "/songs/17.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 39,
				albumId: createdAlbums[3]._id,
			},
			{
				title: "Purple Sunset",
				artist: "Dream Valley",
				imageUrl: "/cover-images/12.jpg",
				audioUrl: "/songs/12.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 17,
				albumId: createdAlbums[3]._id,
			},
		];

		// Create all songs with proper albumId
		const createdSongs = await Song.insertMany(songsData);

		// Update albums with their song references
		const albumUpdates = [
			{
				albumId: createdAlbums[0]._id,
				songIds: createdSongs.slice(0, 4).map(song => song._id)
			},
			{
				albumId: createdAlbums[1]._id,
				songIds: createdSongs.slice(4, 8).map(song => song._id)
			},
			{
				albumId: createdAlbums[2]._id,
				songIds: createdSongs.slice(8, 11).map(song => song._id)
			},
			{
				albumId: createdAlbums[3]._id,
				songIds: createdSongs.slice(11, 14).map(song => song._id)
			}
		];

		// Update each album with its songs
		for (const update of albumUpdates) {
			await Album.findByIdAndUpdate(
				update.albumId,
				{ songs: update.songIds }
			);
		}

		console.log("Database seeded successfully!");
		console.log(`Created ${createdAlbums.length} albums and ${createdSongs.length} songs`);
		
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedDatabase();