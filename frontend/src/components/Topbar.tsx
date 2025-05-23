import { SignedOut, SignOutButton } from '@clerk/clerk-react'
import { LayoutDashboardIcon } from 'lucide-react'

import { Link } from 'react-router-dom'
import SignInOAuthButtons from './SignInOAuthButtons'
import { SignedIn } from '@clerk/clerk-react'

const Topbar = () => {
  const isAdmin = false
  return (
    <div className='p-4 flex items-center justify-between sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10'>
      <div className='flex gap-2 items-center'>
        Tune hive
      </div>
      <div className='flex items-center gap-4'>
       {
        isAdmin && (
          <Link to={"/admin"}>
          <LayoutDashboardIcon className='size-4 mr-2' />
          </Link>
        )
       }

       <SignedIn>
        <SignOutButton />
       </SignedIn>

       <SignedOut>
        <SignInOAuthButtons />
       </SignedOut>


      </div>
    </div>
  )
}

export default Topbar
