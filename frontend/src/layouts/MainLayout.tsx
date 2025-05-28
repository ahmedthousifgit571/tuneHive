import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"
import LeftsideBar from "./components/LeftsideBar"
import FriendsActivity from "./components/FriendsActivity"
import AudoPlayer from "./components/AudoPlayer"
import PlaybackControl from "./components/PlaybackControl"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const MainLayout = () => {
   
  // for mobile responsiveness
   const [isMobile, setIsMobile] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

  if (isMobile) {
    // Mobile layout without ResizablePanels
    return (
      <div className="h-screen bg-black text-white flex flex-col relative">
        <AudoPlayer />
        
        {/* Mobile Header with Hamburger Menu */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <h1 className="text-lg font-semibold">Tune Hive</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Sidebar */}
            <div className="fixed left-0 top-0 h-full w-64 bg-black z-50 transform transition-transform duration-300">
              <div className="p-4 border-b border-gray-800">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <LeftsideBar />
            </div>
          </>
        )}
        
        <div className="flex-1 overflow-hidden p-2">
          <Outlet />
        </div>

        <PlaybackControl />
      </div>
    )
  }

  // Desktop layout with ResizablePanels
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden p-2">
        <AudoPlayer />
        
        {/* left sidebar */}
        <ResizablePanel defaultSize={20} minSize={10} maxSize={30}>
           <LeftsideBar />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors"/>
        
        {/* main content */}
        <ResizablePanel defaultSize={60}> 
            <Outlet />
        </ResizablePanel>

        <ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />

        {/* right sidebar */}
        <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
          <FriendsActivity />
        </ResizablePanel>
      </ResizablePanelGroup>

      <PlaybackControl />
    </div>
  )
}

export default MainLayout