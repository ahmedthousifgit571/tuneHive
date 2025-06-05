import Topbar from "@/components/Topbar"
import { useChatStore } from "@/stores/useChatStore"
import { useUser } from "@clerk/clerk-react"
import { useEffect } from "react"
import UsersList from "./components/UsersList"

const ChatPage = () => {
  const {user} = useUser()
  const {messages,selectedUser,fetchMessages,fetchUsers}  = useChatStore()
  
  // to fetch all the users initially when page loads
  useEffect(()=>{ 
     if(user){
      fetchUsers()
     }
  },[fetchUsers,user])

  // to fetch the selected message
  useEffect(()=>{
    if(selectedUser){
      fetchMessages(selectedUser.clerkId)
    }
  })

  return (
    <main className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
      <Topbar />
       
       <div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
         <UsersList />
       </div>
    </main>
  )
}

export default ChatPage
