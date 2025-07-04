import { Route, Routes } from "react-router-dom"
import HomePage from './pages/home/HomePage'
import AuthCallback from './pages/auth-callback/AuthCallback'
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"
import MainLayout from "./layouts/MainLayout"
import ChatPage from "./pages/chat-page/ChatPage"
import AlbumPage from "./pages/album-page/AlbumPage"
import AdminPage from "./pages/admin-page/AdminPage"
import {Toaster} from 'react-hot-toast'
import NotFoundPage from "./pages/404/NotFoundPage"

function App() {
  return (
   <>
   <header>
     <Routes>
       <Route path="/sso-callback" element={ <AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}/>

       <Route path="/auth-callback" element={<AuthCallback />} />
       <Route path="/admin" element={<AdminPage />}  />
       
       <Route element={<MainLayout />}>
        <Route path="/" element={ <HomePage />}/>
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/albums/:albumId" element={<AlbumPage/>}/>
        <Route path="*" element={<NotFoundPage />}/>
       </Route>

     </Routes>
     <Toaster />
    </header>
   </>
  )
}

export default App
