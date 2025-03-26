import AudioPlayer from "@/components/AudioPlayer";
import FriendActivity from "@/components/FriendActivity";
import LeftSideBar from "@/components/LeftSideBar";
import PlayBackControls from "@/components/PlayBackControls";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", checkIsMobile);
    checkIsMobile();
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <div className='h-screen bg-black text-white flex flex-col'>
      <ResizablePanelGroup direction='horizontal' className='flex-1 h-full overflow-hidden'>
        <AudioPlayer />
        {/* //NOTE: left side */}
        <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
          <LeftSideBar />
        </ResizablePanel>
        <ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />
        {/* //NOTE: main part */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>
        {!isMobile && <ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />}
        {!isMobile && (
          <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
            <FriendActivity />
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
      <PlayBackControls />
    </div>
  );
};

export default MainLayout;
