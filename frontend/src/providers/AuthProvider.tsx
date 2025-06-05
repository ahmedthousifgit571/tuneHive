import { axiosInstance } from "@/lib/axios"
import { useAuthStore } from "@/stores/useAuthStore"
import { useChatStore } from "@/stores/useChatStore"
import { useAuth } from "@clerk/clerk-react"
import { Loader } from "lucide-react"
import { useEffect, useState } from "react"

const updateApiToken = (token:string | null)=>{
    if(token){
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`

    }else{
        delete axiosInstance.defaults.headers.common['Authorization']
    }
}

const AuthProvider = ({children}:{children:React.ReactNode}) => {
    const {getToken,userId} = useAuth()
    const [loading,setLoading] = useState(true)
     const {checkAdmin} = useAuthStore()
     const {initSocket,disconnectSocket} = useChatStore()

    useEffect(()=>{
    const initAuth = async()=>{
        try{
          const token = await getToken()
          updateApiToken(token)
          if(token){
            await checkAdmin()
            // init socket
            if(userId){
              initSocket(userId)
            }
          }
        }catch(error){
            updateApiToken(null)
          console.log("error in auth provider",error)
        }finally{
            setLoading(false)
        }
    }
    initAuth()
    // cleanup function for disconnect socket
    return () =>  disconnectSocket()
    },[getToken,userId,initSocket,disconnectSocket,checkAdmin])

  if(loading) return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader className="size-6 text-emerald-500 animate-spin"/>
    </div>
  )
  return <>{children}</>
}

export default AuthProvider
