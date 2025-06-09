import { axiosInstance } from '@/lib/axios'
import {create} from 'zustand'

interface AuthStore {
    isAdmin:boolean
    isLoading:boolean
    error:string | null

    checkAdmin : ()=> Promise<void>
    reset : () =>void 
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAdmin : false,
    isLoading : false,
    error : null,


    checkAdmin : async () =>{
        set({ isLoading: true, error: null })
        try {
            const response = await axiosInstance.get("/admin/check")
             set({ isAdmin: response.data.admin, error: null })
        } catch (error:any) {
           if (error.response?.status === 403) {
            // User is not admin - this is expected behavior
            set({ isAdmin: false, error: null })
        } else {
            // Other errors (network, server, etc.)
            const errorMessage = error.response?.data?.message || "Failed to check admin status"
            set({ isAdmin: false, error: errorMessage })
        }
        }finally{
            set({isLoading:false})
        }
    },

    reset :()=> {
        set({isAdmin:false,isLoading:false,error:null})
    }
}))