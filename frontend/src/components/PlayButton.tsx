import { usePlayerStore } from "@/stores/usePlayerStore";
import Song from "@/types";
import { Pause, Play } from "lucide-react";
import React from "react";

const PlayButton = ({ song }: { song: Song }) => {
  const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore();

  const handleFeaturedSongs = () => {
    const isCurrentSongPlaying = currentSong?._id === song._id;
    if (isCurrentSongPlaying) {
      togglePlay();
    } else {
      setCurrentSong(song);
    }
  };
  return (
    <div
      className='absolute bottom-2 right-2 transform 
            opacity-0 group-hover:opacity-100 
            transition-all duration-300 ease-in-out 
            bg-gradient-to-r from-green-500 to-emerald-600 
            hover:from-emerald-500 hover:to-green-600 
            rounded-full p-3 
            shadow-md hover:shadow-lg
            scale-75 group-hover:scale-100 
            backdrop-blur-md ring-1 ring-white/15 hover:ring-white/20'
      onClick={() => handleFeaturedSongs()}
    >
      <div className='flex items-center justify-center'>{isPlaying && currentSong?._id === song._id ? <Pause className='text-white drop-shadow-md' onClick={() => handleFeaturedSongs()} size={14} /> : <Play className='text-white drop-shadow-md' size={14} onClick={() => handleFeaturedSongs()} />}</div>
    </div>
  );
};

export default PlayButton;
