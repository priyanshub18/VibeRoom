import React, { useState } from "react";
import { Play, Repeat, Shuffle, ListEnd } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlayerStore } from "@/stores/usePlayerStore";
import Song from "@/types";
import { setGlobalCursorStyle } from "node_modules/react-resizable-panels/dist/declarations/src/utils/cursor";
import { useIndexColorStore } from "@/stores/useIndexColorStore";
import { useShowPlayerStore } from "@/stores/useShowPlayer";

const Queue = () => {
  const { queue, currentSong, isPlaying, togglePlay, playNext, playPrevious, setCurrentSong, currentIndex } = usePlayerStore();
  const { colors, idx } = useIndexColorStore();
  const { setClosePlayer } = useShowPlayerStore();
  const [isRepeatActive, setIsRepeatActive] = useState(true);
  const [isShuffleActive, setIsShuffleActive] = useState(false);

  // Ensure current song is separated from queue
  const nowPlaying = currentSong ? [currentSong] : [];
  const nextUp = queue;

  const QueueTrackItem = ({ track, isCurrent = false, compact = false }: { track: Song; isCurrent?: boolean; compact?: boolean }) => {
    const isCurrentPlaying = currentSong?._id === track._id;
    return (
      <div
        key={track._id}
        className={`
        flex items-center p-3 
        hover:bg-neutral-800 
        rounded-lg 
        transition-colors 
        duration-200 
        group 
        cursor-pointer
        ${isCurrent ? "bg-emerald-900/30" : ""}
        ${compact ? "space-x-2 px-2" : ""}
      `}
        onClick={() => {
          setClosePlayer();
          if (isCurrentPlaying) {
            togglePlay();
          } else {
            setCurrentSong(track);
          }
        }}
      >
        <div className={`flex-shrink-0 relative ${compact ? "mr-2" : "mr-4"}`}>
          <div className='relative group'>
            <img
              src={track.imageUrl || "/placeholder-album.jpg"}
              alt={track.title}
              className={`
          rounded-md 
          object-cover 
          ${compact ? "w-8 h-8" : "w-12 h-12"}
          transition-all duration-300
          group-hover:opacity-50
        `}
            />
            <div
              className='
        absolute 
        inset-0 
        flex 
        items-center 
        justify-center 
        opacity-0 
        group-hover:opacity-100 
        transition-opacity 
        duration-300 
        bg-black/40 
        rounded-md
      '
            >
              <Play
                className='
            text-white 
            hover:scale-110 
            transition-transform
          '
                size={compact ? 16 : 24}
              />
            </div>
          </div>
        </div>

        {!compact && (
          <div className='flex-grow'>
            <div
              className={`
          text-white 
          font-semibold 
          truncate 
          max-w-[200px]
          ${isCurrent ? "text-emerald-400" : ""}
        `}
            >
              {track.title}
            </div>
            <div className='text-neutral-400 text-sm truncate max-w-[180px]'>{track.artist}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className='
        rounded-xl 
        bg-gradient-to-b 
        from-neutral-900 
        to-black 
        min-h-screen 
        text-white 
        p-6 
        flex 
        flex-col
        relative
        overflow-hidden
      '
    >
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <div className='flex items-center space-x-4'>
          <ListEnd size={36} className={`${colors[idx]}`} />
          <h1 className='text-4xl font-bold'>Queue</h1>
        </div>

        <div className='flex space-x-4'>
          <Shuffle
            size={24}
            className={`
              cursor-pointer 
              ${isShuffleActive ? "text-emerald-500" : "text-neutral-400"}
              hover:text-white
              transition-colors
            `}
            onClick={() => setIsShuffleActive(!isShuffleActive)}
          />
          <Repeat
            size={24}
            className={`
              cursor-pointer 
              ${isRepeatActive ? "text-emerald-500" : "text-neutral-400"}
              hover:text-white
              transition-colors
            `}
            onClick={() => {
              if (queue.length > 5) {
                setIsRepeatActive(true);
              }
              setIsRepeatActive(!isRepeatActive);
            }}
          />
        </div>
      </div>

      {/* Queue Content */}
      <div className='flex-grow'>
        <ScrollArea className='h-[calc(100vh-200px)] w-full pr-4'>
          {/* Now Playing Section */}
          {nowPlaying.length > 0 && (
            <div className='mb-6'>
              <h2 className='text-xl font-semibold mb-4 text-neutral-300'>Now Playing</h2>
              <QueueTrackItem track={nowPlaying[0]} isCurrent />
            </div>
          )}

          {/* Next Up Section */}
          <div>
            <h2 className='text-xl font-semibold mb-4 text-neutral-300'>Next Up ({Math.max(0, nextUp.length - currentIndex - 1)})</h2>
            {nextUp.map((track, index) => {
              if (index <= currentIndex) {
                return null;
              }
              return <QueueTrackItem key={track._id} track={track} />;
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Player Controls */}
    </div>
  );
};

export default Queue;
