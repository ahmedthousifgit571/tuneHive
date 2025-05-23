import { Route, Routes } from "react-router-dom"
import HomePage from './pages/home/HomePage'
import AuthCallback from './pages/auth-callback/AuthCallback'
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"

function App() {
  return (
   <>
   <header>
     <Routes>
       <Route path="/" element={ <HomePage />}/>
       <Route path="/sso-callback" element={ <AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}/>

       <Route path="/auth-callback" element={<AuthCallback />} />
     </Routes>
    </header>
   </>
  )
}

export default App
