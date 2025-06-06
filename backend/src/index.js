import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import adminRoutes from './routes/admin.route.js'
import authRoutes from  './routes/auth.route.js'
import songRoutes from './routes/song.route.js'
import albumRoutes from './routes/album.route.js'
import statsRoutes from './routes/stats.route.js'
import { connectDB } from './lib/db.js'
import { clerkMiddleware } from '@clerk/express'
import { createServer } from 'http'
import fileUpload from 'express-fileupload'
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { initializeSocket } from './lib/socket.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
const PORT = process.env.PORT

// configuration socket
const httpServer = createServer(app)
initializeSocket(httpServer)

app.use(cors(
    {
        origin:"http://localhost:3000",
        credentials:true
    }
))

app.use(express.json())    //to parse req.body
app.use(clerkMiddleware()) 

//middleware to upload file 
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits:{
        fileSize: 10* 1024 * 1024
    }
}))      


app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/songs",songRoutes)
app.use("/api/albums",albumRoutes)
app.use("/api/stats",statsRoutes)


// error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)  // Let Express handle it if headers are already sent
  }
  res.status(500).json({
    message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message
  })
})


httpServer.listen(PORT,()=>{
    console.log(`server running on port :${PORT}`);
    connectDB()
})


// TODO: socket.io impletmentation


