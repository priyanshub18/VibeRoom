import AudioPlayer from "@/components/AudioPlayer";
import FriendActivity from "@/components/FriendActivity";
import LeftSideBar from "@/components/LeftSideBar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const isMobile = true;
  return (
    <div className='h-screen bg-black text-white flex flex-col'>
      <ResizablePanelGroup direction='horizontal' className='flex-1 h-full overflow-hidden'>
        <AudioPlayer />
        {/* //NOTE: left side */}
        <ResizablePanel defaultSize={25} minSize={isMobile ? 0 : 10} maxSize={30}>
          <LeftSideBar />
        </ResizablePanel>
        <ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />
        {/* //NOTE: main part */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>
        <ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />
        {/* //NOTE: right side */}
        <ResizablePanel defaultSize={25} minSize={0} maxSize={25} collapsedSize={0}>
          <FriendActivity />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;
