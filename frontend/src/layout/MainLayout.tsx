import AudioPlayer from "@/components/AudioPlayer";
import FriendActivity from "@/components/FriendActivity";
import LeftSideBar from "@/components/LeftSideBar";
import PlayBackControls from "@/components/PlayBackControls";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useIsVibeCheckHiddenStore } from "@/stores/isVibeCheckHidden";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [isVibeCheckHidden, setIsVibeCheckHidden] = useState<boolean>(false);
  const location = useLocation();
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", checkIsMobile);
    checkIsMobile();
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);
  useEffect(() => {
    console.log("Checking if the user is on the chat page");
    console.log("Checking if the user is doing something isVibeCheckHidden: ", isVibeCheckHidden);
    if (location.pathname === "/chat") setIsVibeCheckHidden(() => true);
    if (location.pathname === "/") setIsVibeCheckHidden(() => false);
  }, [location]);
  return (
    <div className='h-screen bg-black text-white flex flex-col'>
      <ResizablePanelGroup direction='horizontal' className='flex-1 h-full overflow-hidden'>
        <AudioPlayer />
        {/* //NOTE: left side */}
        <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={20}>
          <LeftSideBar isVibeCheckHidden={isVibeCheckHidden} setIsVibeCheckHidden={setIsVibeCheckHidden} />
        </ResizablePanel>
        <ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />
        {/* //NOTE: main part */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>
        {!isMobile && !isVibeCheckHidden && <ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />}
        {!isMobile && !isVibeCheckHidden && (
          <ResizablePanel defaultSize={isVibeCheckHidden ? 0 : 20} minSize={0} maxSize={25} collapsedSize={0}>
            <FriendActivity />
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
      <PlayBackControls />
    </div>
  );
};

export default MainLayout;
