import { useMusicStore } from "@/stores/useMusicStore";
import Song from "@/types";
import React from "react";
import { AlertTriangle, Loader2, RefreshCw } from "lucide-react";
import PlayButton from "./PlayButton";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useShowPlayerStore } from "@/stores/useShowPlayer";

const FeaturedSongs = () => {
  const { isLoading, featuredSongs, error } = useMusicStore();
  const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore();
  const {setClosePlayer}  = useShowPlayerStore();
  const handleRetry = () => {
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 animate-pulse'>
        {[...Array(6)].map((_, index) => (
          <div key={index} className='bg-gradient-to-br from-emerald-900/30 to-emerald-950/30 rounded-xl shadow-lg p-4 transform transition-all hover:scale-[1.02]'>
            <div className='h-16 w-16 bg-emerald-800/50 rounded-lg mb-2 animate-pulse'></div>
            <div className='space-y-2'>
              <div className='h-4 bg-emerald-800/50 rounded w-3/4'></div>
              <div className='h-3 bg-emerald-800/50 rounded w-1/2'></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center h-[400px] text-center bg-gradient-to-b  text-white p-6 rounded-2xl'>
        <AlertTriangle className='w-16 h-16 text-amber-500 mb-4 animate-bounce' />
        <h2 className='text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-emerald-500 mb-2'>Connection Interrupted</h2>
        <p className='text-emerald-200 mb-6 max-w-md'>We're experiencing technical difficulties. Would you like to try reconnecting?</p>

        {isLoading ? (
          <div className='flex items-center space-x-3 text-emerald-400'>
            <Loader2 className='w-8 h-8 animate-spin' />
            <span className='text-lg'>Reconnecting...</span>
          </div>
        ) : (
          <button onClick={handleRetry} className='flex items-center space-x-3 bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-700 hover:to-emerald-700 px-6 py-3 rounded-full shadow-xl transform transition-all hover:scale-105 active:scale-95'>
            <RefreshCw className='w-6 h-6' />
            <span className='font-bold'>Retry Connection</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
      {featuredSongs.map((song) => {
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
          <div key={song._id} className='relative hover:bg-gradient-to-br from-emerald-900/30 to-emerald-950/30 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-2xl group cursor-pointer border border-white/10 hover:border-emerald-500' onClick={() => handleFeaturedSongs()}>
            <div className='flex items-center p-4 space-x-4'>
              <img src={song.imageUrl} alt={song.title} className='w-20 h-20 rounded-lg object-cover shadow-md group-hover:rotate-1 transition-transform' />
              <div className='flex-1 overflow-hidden'>
                <h3 className='text-lg font-bold text-emerald-100 truncate group-hover:text-white transition-colors'>{song.title}</h3>
                <p className='text-sm text-white truncate group-hover:text-emerald-200'>{song.artist}</p>
              </div>
            </div>
            <PlayButton song={song} />
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedSongs;
