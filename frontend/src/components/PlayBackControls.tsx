import React, { useEffect, useRef, useState } from "react";
import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Volume1, Volume2, ListMusic, Minimize2, Maximize2, RotateCcw, VolumeX } from "lucide-react";
import { usePlayerStore } from "@/stores/usePlayerStore";
import DraggablePlayer from "./DraggablePlayer";
import { Slider } from "./ui/slider";
import { useShowPlayerStore } from "@/stores/useShowPlayer";
import { Link, useNavigate } from "react-router-dom";

const PlayBackControls = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePlayerStore();
  const [volume, setVolume] = useState(75);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isHidden, setIsHidden] = useState(true);
  const { closePlayer, toggleClosePlayer } = useShowPlayerStore();
  const [isQueueActive, setQueueActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();
  const formatTime = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  const restartSong = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (!isPlaying) {
        togglePlay();
      }
    }
  };

  const toggleVolume = () => {
    if (audioRef.current) {
      if (volume === 0) {
        setVolume(50);
        audioRef.current.volume = 0.5;
      } else if (volume > 0) {
        setVolume(0);
        audioRef.current.volume = 0;
      }
    }
  };

  useEffect(() => {
    audioRef.current = document.querySelector("audio");
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener("timeupdate", updateTime);

    const updateDuration = () => setDuration(audio.duration);
    audio.addEventListener("loadedmetadata", updateDuration);

    const handleEnded = () => {
      usePlayerStore.setState({ isPlaying: false });
    };
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [currentSong]);

  useEffect(() => {
    const pathname = window.location.pathname;
    console.log(pathname);
    if (pathname == "/queue") {
      setQueueActive(true);
    } else {
      setQueueActive(false);
    }
  }, [currentSong]);

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
  };

  if (currentSong === null || closePlayer) return null;
  if (isHidden) return <DraggablePlayer isHidden={isHidden} setIsHidden={setIsHidden} />;

  return (
    <footer
      className='fixed bottom-4 left-1/2 transform -translate-x-1/2 
        w-[90%] md:w-[80%] lg:w-[60%] 
        bg-black rounded-xl border border-zinc-700 shadow-2xl z-50'
    >
      <div className='container px-4 py-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 items-center gap-4'>
          {/* Current Song */}
          <div className='ml-2 flex items-center space-x-4 mb-4 md:mb-0'>
            <img src={currentSong?.imageUrl} alt={currentSong?.title} className='w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover shadow-md' />
            <div className='flex-1 overflow-hidden'>
              <div className='text-white font-semibold truncate hover:text-emerald-400 transition-colors text-sm md:text-base'>{currentSong?.title}</div>
              <div className='text-zinc-400 text-xs truncate'>{currentSong?.artist}</div>
            </div>
          </div>

          {/* Player Controls */}
          <div className='flex flex-col items-center gap-1 order-2 md:order-1'>
            <div className='flex items-center space-x-4 md:space-x-6 mb-3'>
              <button className='text-zinc-400 hover:text-white transition-colors group' aria-label='Shuffle'>
                <Shuffle className='w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform' />
              </button>

              <button className='text-zinc-400 hover:text-white transition-colors' aria-label='Previous' onClick={playPrevious}>
                <SkipBack className='w-5 h-5 md:w-6 md:h-6' />
              </button>

              <button
                onClick={togglePlay}
                className='
                  bg-emerald-500 text-white
                  rounded-full p-2 md:p-3
                  hover:bg-emerald-600
                  shadow-xl 
                  transition-all duration-300
                  transform hover:scale-105
                '
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className='w-5 h-5 md:w-6 md:h-6' /> : <Play className='w-5 h-5 md:w-6 md:h-6' />}
              </button>

              <button className='text-zinc-400 hover:text-white transition-colors' aria-label='Next' onClick={playNext}>
                <SkipForward className='w-5 h-5 md:w-6 md:h-6' />
              </button>

              <button className='text-zinc-400 hover:text-white transition-colors group' aria-label='Repeat'>
                <Repeat className='w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform' />
              </button>
            </div>

            <div className='flex items-center space-x-3 w-full'>
              <span className='text-xs text-zinc-400'>{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                onValueChange={handleSeek}
                className='
                  group
                  relative 
                  flex 
                  w-full 
                  touch-none 
                  select-none 
                  items-center
                '
              />
              <span className='text-xs text-zinc-400'>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume and Additional Controls */}
          <div className='flex items-center justify-end space-x-2 md:space-x-4 order-1 md:order-2'>
            <div className='flex items-center space-x-2'>
              <button className='text-zinc-400 hover:text-white transition-colors group' aria-label='Restart' onClick={() => restartSong()}>
                <RotateCcw className='w-4 h-4 md:w-5 md:h-5 group-hover:rotate-8 transition-transform' />
              </button>

              <button
                className={`${isQueueActive ? "text-emerald-500" : "text-zinc-400"}  hover:text-green-500 transition-colors`}
                aria-label='Playlist'
                onClick={() => {
                  if (isQueueActive) {
                    setQueueActive(false);
                    navigate("/");
                  } else {
                    setQueueActive(true);
                    navigate("/queue");
                  }
                }}
              >
                <ListMusic className='w-5 h-5 md:w-6 md:h-6' />
              </button>

              <div className='flex items-center space-x-2'>
                <button className='text-zinc-400 hover:text-white transition-colors' aria-label='Volume' onClick={() => toggleVolume()}>
                  {volume === 0 ? <VolumeX className='w-4 h-4 md:w-5 md:h-5' /> : volume > 50 ? <Volume2 className='w-4 h-4 md:w-5 md:h-5' /> : <Volume1 className='w-4 h-4 md:w-5 md:h-5' />}
                </button>
                <Slider
                  value={[volume]}
                  max={100}
                  step={1}
                  onValueChange={(value) => {
                    setVolume(value[0]);
                    if (audioRef.current) {
                      audioRef.current.volume = value[0] / 100;
                    }
                  }}
                  className='w-16 md:w-24 hover:cursor-grab active:cursor-grabbing'
                />
              </div>

              {/* Mini/Max Player Toggle Button */}
              <button
                onClick={() => setIsHidden((prev) => !prev)}
                className='
                  ml-2
                  text-zinc-400 
                  hover:text-white 
                  transition-colors 
                  hover:scale-110 
                  active:scale-95
                  bg-zinc-800 
                  rounded-full 
                  p-1.5 md:p-2
                '
                aria-label='Toggle Mini Player'
              >
                {isHidden ? <Maximize2 className='w-3 h-3 md:w-4 md:h-4' /> : <Minimize2 className='w-3 h-3 md:w-4 md:h-4' />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PlayBackControls;
