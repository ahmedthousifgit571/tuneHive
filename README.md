# 🎶 tuneHive

A modern Spotify-inspired music streaming platform built with React, TypeScript, and Node.js. Featuring real-time chat, album management, admin controls, and a seamless music playback experience — optimized for both desktop and mobile.

![TuneHive Screenshot](frontend/public/githubImage.png)

---

## ✨ Features

- 🔐 **Authentication with Clerk**
- 🔍 **Google Login Integration** via Clerk
- ↩️ **Callback Page & Redirection Logic**
- 📜 **Queue Data Structure** for Dynamic Song Playback
- 📱 **Mobile-Responsive Design**
- 🎵 **Music Playback, Album Creation & Management**
- 💬 **Real-time Chat** powered by Socket.IO
- 🛠️ **Admin Controls**: Song & Album Creation / Deletion

---

## ⚙️ Tech Stack

### 🖥️ Frontend  
- **React**  
- **TypeScript**  
- **Tailwind CSS**  
- **Shadcn UI**  
- **Clerk Authentication**  
- **Zustand** (Global State Management)

### 🌐 Backend  
- **Node.js**  
- **Express**  
- **MongoDB**  
- **Socket.IO**  
- **JWT Authentication**  
- **Cloudinary** (for image upload & storage)

---

## 📦 Environment Variables

### Backend (`/backend/.env`)

```env
PORT=5001
MONGODB_URI=your_mongo_uri
ADMIN_EMAIL=your_admin_email
NODE_ENV=development

CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key


### 📖 Getting Started

### 🔧 Run the Backend

cd backend
npm install
npm run dev


### 💻 Run the Frontend

cd frontend
npm install
npm run dev