import { cn } from "@/lib/utils";
import { HomeIcon, Library, MessageCircleMore } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import { SignedIn } from "@clerk/clerk-react";
import PlaylistSkeleton from "./skeletons/PlayListSkeleton";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect } from "react";
import { MusicStore, useMusicStore } from "@/stores/useMusicStore";
import { useIndexColorStore } from "@/stores/useIndexColorStore";

const LeftSideBar = () => {
  const { albums, fetchAlbums, isLoading } = useMusicStore() as MusicStore;
  const { idx, colors, setIndex } = useIndexColorStore();
  useEffect(() => {
    // NOTE: Fetch data from the backend
    // NOTE: I'll use something like state management in this.
    fetchAlbums();
    setIndex();
  }, [fetchAlbums]);
  console.log({ albums });
  return (
    <div className='h-full flex flex-col gap-2'>
      {/* Navigation menu */}
      <div className='rounded-lg bg-zinc-900 p-4'>
        <div className='space-y-2 '>
          <Link
            to='/'
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800 rounded-xl",
              })
            )}
          >
            <HomeIcon className='mr-2 size-5' />
            <span className='hidden md:inline '>Home</span>
          </Link>

          <SignedIn>
            <Link
              to='/'
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full justify-start text-white hover:bg-zinc-800 rounded-xl",
                })
              )}
            >
              <MessageCircleMore className='mr-2 size-5' />
              <span className='hidden md:inline '>Messages</span>
            </Link>
          </SignedIn>
        </div>
      </div>
      {/* Library Section */}

      <div className='flex-1 rounded-lg bg-zinc-900 p-4'>
        <div className='flex items-center justify-between mb-4'>
          <div className='items-center flex text-white px-2 font-extrabold'>
            <Library className={`size-6 mr-2 ${colors[idx]}`} />
            <span className='hidden md:inline text-lg font-extrabold'>P L A Y L I S T S</span>
          </div>
        </div>
        <ScrollArea className='h-[calc(100vh-300px)] scrollbar-thin scrollbar-thumb-white-500 scrollbar-track-white-900' scrollHideDelay={10}>
          <div className='space-y-2'>
            {isLoading ? (
              <PlaylistSkeleton />
            ) : (
              <div>
                {albums.map((album) => (
                  <Link key={album._id} to={`/albums/${album._id}`} className='p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 cursor-pointer'>
                    <img src={album.imageUrl} alt='PlaylistImg' className='size-12 rounded-md flex-shrink-0 object-cover' />
                    <div className='flex-1 min-w-0 hidden md:block'>
                      <p className='truncate font-semibold'>{album.title}</p>
                      <p className='truncate text-zinc-500 font-medium text-sm'>Album • {album.artist}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSideBar;
