import Song from "@/types";
import ErrorSkelaton from "./skeletons/ErrorSkelaton";
import { useMusicStore } from "@/stores/useMusicStore";
import { Button } from "./ui/button";
import { Pause, Play, Triangle } from "lucide-react";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useShowPlayerStore } from "@/stores/useShowPlayer";

const SectionGrid = ({ title, songs }: { title: string; songs: Song[] }) => {
  const { isLoading, error } = useMusicStore();
  const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore();
  const {setClosePlayer} = useShowPlayerStore();
  if (isLoading) {
    return <SectionGridSkeleton />;
  }

  if (error) {
    return <ErrorSkelaton />;
  }

  return (
    <div className='px-6 mb-8'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400'>{title}</h2>
        <Button variant='outline' className='text-sm text-zinc-500 hover:bg-zinc-800 hover:text-white border-zinc-800'>
          Explore More
        </Button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {songs.map((song) => {
          const handleFeaturedSongs = () => {
            const isCurrentSongPlaying = currentSong?._id === song._id;
            setClosePlayer()
            if (isCurrentSongPlaying) {
              togglePlay();
            } else {
              setCurrentSong(song);
            }
          };
          return (
            <div
              key={song._id}
              className='bg-zinc-900 border border-zinc-800 p-4 rounded-xl 
        hover:border-zinc-700 transition-all group cursor-pointer 
        transform hover:-translate-y-2 hover:shadow-2xl relative'
              onClick={() => handleFeaturedSongs()}
            >
              {/* Song Image Wrapper */}
              <div className='relative mb-4'>
                <div className='aspect-square rounded-lg overflow-hidden shadow-md'>
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className='w-full h-full object-cover 
              transition-transform duration-300 
              group-hover:scale-105 brightness-90 group-hover:brightness-100'
                  />
                </div>

                {/* 🎵 Play Button (Shows on Hover) */}
                <div
                  className='absolute bottom-2 right-2 transform 
            opacity-0 group-hover:opacity-100 
            transition-all duration-300 ease-in-out 
            bg-gradient-to-r from-green-500 to-emerald-600 
            hover:from-emerald-500 hover:to-green-600 
            rounded-full p-3 
            shadow-[0px_4px_10px_rgba(0,255,127,0.5)] hover:shadow-[0px_6px_14px_rgba(0,255,127,0.8)]
            scale-75 group-hover:scale-105 
            backdrop-blur-md ring-2 ring-white/20 hover:ring-white/30'
                  onClick={() => handleFeaturedSongs()}
                >
                  <div className='flex items-center justify-center'>{isPlaying && currentSong?._id === song._id ? <Pause className='text-white drop-shadow-lg' size={14} onClick={() => handleFeaturedSongs()} /> : <Play className='text-white drop-shadow-lg' size={14} onClick={() => handleFeaturedSongs()} />}</div>
                </div>
              </div>

              {/* Song Info */}
              <div className='px-1'>
                <h3 className='font-semibold mb-1 text-white truncate'>{song.title}</h3>
                <p className='text-xs text-zinc-400 truncate'>{song.artist}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionGrid;

const SectionGridSkeleton = () => {
  return (
    <div className='px-6 mb-8'>
      <div className='h-8 w-48 bg-zinc-800/50 rounded-md mb-4 animate-pulse' />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className='bg-zinc-900 border border-zinc-800 p-4 rounded-xl animate-pulse'>
            <div className='aspect-square rounded-lg bg-zinc-800/50 mb-4' />
            <div className='h-4 bg-zinc-800/50 rounded w-3/4 mb-2' />
            <div className='h-3 bg-zinc-800/50 rounded w-1/2' />
          </div>
        ))}
      </div>
    </div>
  );
};
