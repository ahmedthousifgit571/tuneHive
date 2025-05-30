import { Button } from "@/components/ui/button"
import { DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useMusicStore } from "@/stores/useMusicStore"
import { Dialog, DialogContent } from "@radix-ui/react-dialog"
import { Plus } from "lucide-react"
import { useRef, useState } from "react"

const AddSongDialog = () => {
    const {albums} = useMusicStore()

    const [songDialogOpen,setSongDialogOpen] = useState(false)
    const [isLoading,setIsloading] = useState(false)
 
    const [newSong,setNewSong] = useState({
        title:"",
        artist:"",
        album:undefined,
        duration:0
    }) 
    const [files,setFiles]= useState<{audio: File | null , image: File | null }>({
        audio :null,
        image:null,
    })

    const audioInputRef = useRef<HTMLInputElement>(null)
    const imageInputRef = useRef<HTMLInputElement>(null)

    // handleSubmit = async () =>{} 
  return (
    <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
       <DialogTrigger asChild>
				<Button className='bg-emerald-500 hover:bg-emerald-600 text-black'>
					<Plus className='mr-2 h-4 w-4' />
					Add Song
				</Button>
			</DialogTrigger>

            <DialogContent className='bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto' >
                <DialogHeader>
					<DialogTitle>Add New Song</DialogTitle>
					<DialogDescription>Add a new song to your music library</DialogDescription>
				</DialogHeader>

                <div className="space-y-4 py-4 ">
                   
                   <input type="file" 
                    accept="audio/*"
                    ref={audioInputRef}
                    hidden
                    onChange={(e)=> setFiles((prev) => ({...prev,audio:e.target.files![0]}))}
                   />
                </div>
            </DialogContent>
    </Dialog>
  )
}

export default AddSongDialog
