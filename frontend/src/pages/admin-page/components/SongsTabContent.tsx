import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Music } from 'lucide-react'
import SongsTable from './SongsTable'

const SongsTabContent = () => {
  return (
    <Card>
        <CardHeader>
            <div className='flex items-center justify-between'> 
              <div>
                 <CardTitle className='flex items-center gap-2'>
							<Music className='size-5 text-emerald-500' />
							Songs Library
				 </CardTitle>
				<CardDescription>Manage your music tracks</CardDescription>
              </div>
            <button className="size-10 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center border-2 border-green-400 hover:border-green-500">
                <span className="text-xl font-light">+</span>
            </button>
            </div>
        </CardHeader>

        <CardContent>
            <SongsTable />
        </CardContent>
    </Card>
  )
}

export default SongsTabContent
