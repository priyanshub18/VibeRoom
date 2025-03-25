import { cn } from "@/lib/utils";
import { HomeIcon, Library, MessageCircleMore, Disc3, Orbit, Waves } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import { SignedIn } from "@clerk/clerk-react";
import PlaylistSkeleton from "./skeletons/PlayListSkeleton";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useState } from "react";
import { MusicStore, useMusicStore } from "@/stores/useMusicStore";
import { useIndexColorStore } from "@/stores/useIndexColorStore";
import Song from "@/types";

const LeftSideBar = () => {
  const { albums, fetchAlbums, isLoading } = useMusicStore() as MusicStore;
  const { idx, colors, setIndex } = useIndexColorStore();
  const [activeMenu, setActiveMenu] = useState("home");

  useEffect(() => {
    fetchAlbums();
    setIndex();
  }, [fetchAlbums]);

  const menuItems = [
    {
      id: "home",
      icon: HomeIcon,
      label: "Home",
      path: "/",
    },
    {
      id: "messages",
      icon: MessageCircleMore,
      label: "Messages",
      path: "/messages",
      requireSignedIn: true,
    },
  ];

  return (
    <div className='h-full flex flex-col gap-4 p-4 bg-gradient-to-b from-zinc-950 to-black'>
      {/* Navigation Menu */}
      <div className='bg-zinc-900/60 backdrop-blur-xl rounded-2xl p-4 shadow-2xl'>
        <div className='space-y-2'>
          {menuItems.map((item) => {
            // Skip items that require sign-in if not signed in
            if (item.requireSignedIn) {
              return (
                <SignedIn key={item.id}>
                  <NavItem {...item} isActive={activeMenu === item.id} onClick={() => setActiveMenu(item.id)} />
                </SignedIn>
              );
            }
            return <NavItem key={item.id} {...item} isActive={activeMenu === item.id} onClick={() => setActiveMenu(item.id)} />;
          })}
        </div>
      </div>

      {/* Library Section */}
      <div className='flex-1 bg-zinc-900/60 backdrop-blur-xl rounded-2xl p-4 shadow-2xl'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center text-white px-2'>
            <Library className={`size-7 mr-3 ${colors[idx]} animate-pulse`} />
            <h2 className='hidden md:block text-xl font-bold tracking-wider'>P L A Y L I S T S</h2>
          </div>
          <Orbit className='hidden md:block text-white/30 size-6 animate-spin-slow' />
        </div>

        <ScrollArea className='h-[calc(100vh-200px)] scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-white/5' scrollHideDelay={10}>
          <div className='space-y-2'>
            {isLoading ? (
              <PlaylistSkeleton />
            ) : (
              <div>
                {albums.map((album) => (
                  <AlbumItem key={album._id} album={album} />
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

// Extracted NavItem Component
const NavItem = ({ icon: Icon, label, path, isActive, onClick }: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; label: string; path: string; isActive: boolean; onClick: () => void }) => (
  <Link
    to={path}
    onClick={onClick}
    className={cn(
      buttonVariants({
        variant: "ghost",
        className: `w-full justify-start text-white/70 
        hover:bg-white/10 rounded-xl group 
        ${isActive ? "bg-white/10 text-white" : ""}`,
      })
    )}
  >
    <Icon
      className={`mr-3 size-6 
      ${isActive ? "text-blue-400" : "group-hover:text-white/80"}
      transition-colors duration-300`}
    />
    <span className='hidden md:inline font-medium tracking-wider'>{label}</span>
  </Link>
);

// Extracted Album Item Component
const AlbumItem = ({ album }: { album: any }) => (
  <Link
    to={`/albums/${album._id}`}
    className='p-2 hover:bg-white/10 rounded-xl 
    flex items-center gap-4 cursor-pointer 
    group transition-all duration-300'
  >
    <div className='relative'>
      <img
        src={album.imageUrl}
        alt='Album Cover'
        className='size-14 rounded-lg object-cover 
        shadow-lg group-hover:scale-110 
        group-hover:rotate-6 transition-transform'
      />
      <Disc3
        className='absolute -top-2 -right-2 size-4 
        text-white/50 opacity-0 group-hover:opacity-100 
        animate-spin-slow transition-opacity'
      />
    </div>
    <div className='flex-1 min-w-0 hidden md:block'>
      <p className='truncate font-semibold text-white group-hover:text-blue-300 transition-colors'>{album.title}</p>
      <p className='truncate text-white/50 font-medium text-sm'>Album • {album.artist}</p>
    </div>
    <Waves
      className='size-5 text-white/30 opacity-0 
      group-hover:opacity-100 transition-opacity'
    />
  </Link>
);

export default LeftSideBar;
