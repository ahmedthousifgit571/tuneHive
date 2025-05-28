import { SignedOut, UserButton } from '@clerk/clerk-react'
import { LayoutDashboardIcon } from 'lucide-react'

import { Link } from 'react-router-dom'
import SignInOAuthButtons from './SignInOAuthButtons'
import { useAuthStore } from '@/stores/useAuthStore'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'

const Topbar = () => {
  const {isAdmin} = useAuthStore()
  return (
    <div className='p-4 flex items-center justify-between sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10'>
      <div className='flex gap-2 items-center'>
        <img src="./logo.png" alt="Tune Hive Logo" className='size-12 rounded-xl shadow-2xl ring-2 ring-white/10 hover:ring-green-400/50 transition-all duration-300 hover:shadow-green-500/30 hover:-translate-y-0.5'/>
        Tune hive
      </div>
      <div className='flex items-center gap-4'>
       {
        isAdmin && (
          <Link to={"/admin"} className={cn(buttonVariants({variant:"outline"}))}>
          <LayoutDashboardIcon className='size-4 mr-2' />
          Admin dashboard
          </Link>
        )
       }

     

       <SignedOut>
        <SignInOAuthButtons />
       </SignedOut>

         <UserButton />
      </div>
    </div>
  )
}

export default Topbar
