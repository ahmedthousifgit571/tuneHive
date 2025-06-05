import { axiosInstance } from '@/lib/axios'
import type { Message, User } from '@/types'
import {create} from 'zustand'
import {io} from 'socket.io-client'

interface ChatStore{
    users: any[]
    isLoading: boolean
    error : string | null

    socket: any
    isConnected:boolean
    onlineUsers:Set<string>
    userActivities:Map<string, string>
    messages:Message[]
    selectedUser:User |null

    fetchUsers : ()=>Promise<void>
    initSocket : (userId:string) => void
    disconnectSocket : ()=> void
    sendMessage : (recieverId:string,senderId:string,message:string) => void
    fetchMessages: (userId:string) =>Promise<void>
    setSelectedUser:(user:User | null)=>void
}

const baseUrl = "http://localhost:5000"
const socket = io(baseUrl,{
    autoConnect:false,
})

export const useChatStore = create<ChatStore>((set,get)=> ({
     users : [],
     isLoading : false,
     error : null,
     socket:null,
     isConnected:false,
     onlineUsers:new Set(),
     userActivities : new Map(),
     messages: [],
     selectedUser : null,
     


    fetchUsers : async()=>{
        try {
            const response = await axiosInstance.get("/users")
            set({users:response.data})
        } catch (error:any) {
            set({error:error.response.data.message})
        }finally{
            set({isLoading:false})
        }
    },
    
    initSocket : async(userId:string)=>{
      if(!get().socket.isConnected){
        socket.auth = {userId}
        socket.connect()
        socket.emit("user_connected",userId)   //send an event

        socket.on("user_online",(users:string[])=>{  //listend and set to onlineusers
            set({onlineUsers:new Set(users)})
        })
 
        // listening to activites
        socket.on("activities",(activities:[string,string][]) =>{   
            set({userActivities: new Map(activities)})
        })

        // listening for connected users
        socket.on("user_connected",(userId:string)=>{
            set((state)=> ({
                onlineUsers: new Set([...state.onlineUsers,userId])
            }))
        })

        // listening for disconnected users
        socket.on("user_disconnected",(userId:string)=>{
            set((state)=> {
                const newOnlineUsers = new Set(state.onlineUsers)
                newOnlineUsers.delete(userId)
                return {onlineUsers: newOnlineUsers}
            })
        })

        // listening on recieved message:
        socket.on("recieved_message",(message:Message)=>{
            set((state) => ({
                messages:[...state.messages,message]
            }))
        })

        // listening on sent message
        socket.on("message_sent",(message:Message)=>{
            set((state) => ({
                messages:[...state.messages,message]
            }))
        })

        // listening on updated activity
        socket.on("activity_updated",({userId,activity})=>{
            set((state)=> {
                    const newActivities = new Map(state.userActivities)
                    newActivities.set(userId,activity)
                    return {userActivities:newActivities}
            })
        })

        set({isConnected:true})
      }
    },
    
    disconnectSocket: async()=>{
        if(get().isConnected){
        socket.disconnect()
        set({isConnected:false})
        }
        
    },

    sendMessage : async(recieverId,senderId,content)=>{
      const socket = get().socket
      if(!socket) return 

     // sending message
     socket.emit("send_message",{recieverId,senderId,content})  
    },

    fetchMessages: async(userId) => {
        set({isLoading:true,error:null})
        try {
           const response =  await axiosInstance.get(`/users/messages/${userId}`)
           set({messages:response.data})
        } catch (error:any) {
            console.log("error in fetch messages:",error)
            set({error:error.response.data.message})
        }finally{
            set({isLoading:false})
        }
    },

    setSelectedUser : (user) =>{
       set({selectedUser: user})
    }


}))