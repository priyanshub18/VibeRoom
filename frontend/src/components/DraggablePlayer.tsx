import { useState, useRef, useEffect, useCallback } from "react";
import { GripHorizontal, Play, Pause, SkipBack, SkipForward, Maximize2, X } from "lucide-react";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useShowPlayerStore } from "@/stores/useShowPlayer";

const DraggablePlayer = ({ isHidden, setIsHidden }: { isHidden: boolean; setIsHidden: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { currentSong, isPlaying, playNext, togglePlay, playPrevious } = usePlayerStore();
  const { closePlayer, toggleClosePlayer } = useShowPlayerStore();
  const audioRef = useRef(null);

  const [position, setPosition] = useState(() => {
    const screenWidth = window.innerWidth;
    const playerWidth = 400;
    const x = (screenWidth - playerWidth) / 2 - 100;
    const y = window.innerHeight - 150;
    return { x, y };
  });
  const [isDragging, setIsDragging] = useState(false);

  // Memoized resize handler to prevent unnecessary re-renders
  const handleResize = useCallback(() => {
    const screenWidth = window.innerWidth;
    const playerWidth = 400;
    const x = (screenWidth - playerWidth) / 2;
    const y = window.innerHeight - 150;
    setPosition({ x, y });
  }, []);

  // Optimized event listener with cleanup
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const handleDragStart = (e: any) => {
    const element = audioRef.current;
    if (!element) return;

    setIsDragging(true);
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleDragMove = (event: MouseEvent) => {
      // Prevent default to stop text selection during drag
      event.preventDefault();
      setPosition({
        x: event.clientX - startX,
        y: event.clientY - startY,
      });
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
    };

    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
  };

  const togglePlaying = () => {
    togglePlay();
  };

  if (!isHidden) return null;
  return (
    <div
      ref={audioRef}
      className={`
        fixed 
        bg-black

        backdrop-blur-xl 
        text-white 
        rounded-3xl 
        shadow-2xl 
        border border-zinc-700
        p-4 
        flex 
        items-center 
        gap-4 
        cursor-grab 
        active:cursor-grabbing 
        transition-all 
        duration-300
        z-[9999]  // Extremely high z-index to ensure it's on top
        ${isDragging ? "scale-103 shadow-2xl" : "scale-100"}
      `}
      style={{
        left: `${position.x}px`,
        bottom: `${window.innerHeight - position.y - 100}px`,
        transform: isDragging ? "rotate-1" : "rotate-0",
        willChange: "transform, left, bottom", // Performance optimization
      }}
    >
      {/* Drag Handle */}
      <div
        className='
          p-2 
          rounded-lg 
          bg-zinc-800 
          hover:bg-zinc-700 
          cursor-grab 
          active:cursor-grabbing 
          transition-all 
          group
        '
        onMouseDown={handleDragStart}
      >
        <GripHorizontal
          className='
            text-zinc-400 
            group-hover:text-white 
            transition-colors
          '
          size={20}
        />
      </div>

      {/* Player Info */}
      <div className='flex items-center gap-3 w-[200px]'>
        {" "}
        {/* Fixed width added */}
        <div className='relative'>
          <img
            src={currentSong?.imageUrl}
            alt='Song Cover'
            className={`
              w-12 
              h-12 
              rounded-xl 
              object-cover 
              shadow-md
              transition-transform
              ${isPlaying ? "animate-pulse" : ""}
            `}
          />
          {isPlaying && (
            <div
              className='
              absolute 
              bottom-0 
              right-0 
              w-3 
              h-3 
              bg-emerald-500 
              rounded-full 
              
            '
            ></div>
          )}
        </div>
        <div className='overflow-hidden'>
          {" "}
          {/* Prevent text overflow */}
          <h3
            className='
            font-semibold 
            text-sm 
            hover:text-emerald-400 
            transition-colors
            truncate 
            max-w-[150px] 
            block
            overflow-hidden
            whitespace-nowrap
          '
          >
            {currentSong?.title}
          </h3>
          <p
            className='
            text-xs 
            text-zinc-400 
            hover:text-zinc-200 
            transition-colors
            truncate 
            max-w-[150px] 
            block
            overflow-hidden
            whitespace-nowrap
          '
          >
            {currentSong?.artist}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className='flex items-center gap-3'>
        <button
          className='
            text-zinc-400 
            hover:text-white 
            transition-colors 
            hover:scale-110
            active:scale-95
          '
          onClick={playPrevious}
          aria-label='Previous'
        >
          <SkipBack size={20} />
        </button>

        <button
          onClick={togglePlaying}
          className={`
            text-white 
            bg-emerald-500 
            rounded-full 
            p-2 
            hover:bg-emerald-600
            transition-all
            active:scale-90
            ${isPlaying ? "shadow-lg shadow-emerald-700/50 scale-105" : "shadow-md"}
          `}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <button
          className='
            text-zinc-400 
            hover:text-white 
            transition-colors 
            hover:scale-110
            active:scale-95
          '
          onClick={playNext}
          aria-label='Next'
        >
          <SkipForward size={20} />
        </button>
      </div>

      {/* Expand Button */}
      <button
        className='
          ml-2 
          text-zinc-400 
          hover:text-white 
          transition-colors 
          hover:scale-110 
          active:scale-95
          bg-zinc-800 
          rounded-full 
          p-2
        '
        onClick={() => setIsHidden((val) => !val)}
        aria-label='Expand Controls'
      >
        <Maximize2 size={16} />
      </button>

      <button
        className='

          text-zinc-400 
          hover:text-white 
          transition-colors 
          hover:scale-110 
          active:scale-95
          bg-zinc-800 
          rounded-full 
          p-2
        '
        onClick={() => {
          toggleClosePlayer();
          isPlaying && togglePlay();
        }}
        aria-label='Hide Player'
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default DraggablePlayer;
