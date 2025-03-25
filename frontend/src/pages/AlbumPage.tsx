import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlbumSkeleton from "@/components/skeletons/AlbumSkeleton";
import { MusicStore, useMusicStore } from "@/stores/useMusicStore";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Button } from "@/components/ui/button";
import { AudioWaveform, CalendarClock, Timer, PlayIcon, Divide, Music, Play, AudioLines } from "lucide-react";
import { usePlayerStore } from "@/stores/usePlayerStore";

// Expanded Gradient Array with More Complex Gradients
const gradients = [
  "from-[#8e2de2]/70 via-[#4a00e0]/70 to-black", // Deep Purple Blend
  "from-[#ff6a00]/70 via-[#ee0979]/70 to-black", // Vibrant Orange-Pink
  "from-[#00c6ff]/70 via-[#0072ff]/70 to-black", // Cool Blue Gradient
  "from-[#11998e]/70 via-[#38ef7d]/70 to-black", // Teal Green Transition
  "from-[#ff00cc]/70 via-[#333399]/70 to-black", // Magenta-Indigo Blend
  "from-[#ff4b1f]/70 via-[#ff9068]/70 to-black", // Warm Sunset Gradient
  "from-[#9d50bb]/70 via-[#6e48aa]/70 to-black", // Soft Purple Transition
];

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbum, currentAlbum, isLoading } = useMusicStore() as MusicStore;
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  const [showSkeleton, setShowSkeleton] = useState(true);
  const [gradientIndex, setGradientIndex] = useState(() => Math.floor(Math.random() * gradients.length));

  const handleAlbum = () => {
    if (!currentAlbum) return;
    const isCurrentAlbumPlaying = currentAlbum?.songs.some((song) => song._id === currentSong?._id);
    if (isCurrentAlbumPlaying) {
      togglePlay();
    } else {
      playAlbum(currentAlbum?.songs);
    }
  };

  const handlePlayAlbum = (index: number) => {
    if (!currentAlbum) return;

    const isCurrentSongPlaying = currentAlbum.songs[index]._id === currentSong?._id;
    if (isCurrentSongPlaying) {
      togglePlay();
    } else {
      playAlbum(currentAlbum.songs, index);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (albumId) {
      fetchAlbum(albumId);
    }
    setGradientIndex(Math.floor(Math.random() * gradients.length));
  }, [fetchAlbum, albumId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (isLoading || showSkeleton) return <AlbumSkeleton />;

  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='relative z-10 container mx-auto px-4 py-8'>
        <div
          className={`absolute h-[75%] inset-0 bg-gradient-to-b ${gradients[gradientIndex]} 
        opacity-70 pointer-events-none rounded-2xl`}
          aria-hidden='true'
        />
        {/* Album Header */}
        <div className='grid md:grid-cols-[300px_1fr] gap-8 mb-8 relative z-20'>
          {/* Album Cover */}
          <div className='relative group'>
            <img
              src={currentAlbum?.imageUrl}
              alt={currentAlbum?.title}
              className='w-full aspect-square object-cover rounded-2xl 
              shadow-[0_0_50px_rgba(255,255,255,0.2)]'
            />
          </div>

          {/* Album Details */}
          <div className='flex flex-col justify-end space-y-4'>
            <div className='text-sm uppercase tracking-widest text-white/70'>Album</div>
            <h1 className='text-5xl md:text-7xl font-bold text-white leading-tight'>{currentAlbum?.title}</h1>
            <div className='flex items-center space-x-4 text-white'>
              <span className='font-semibold'>{currentAlbum?.artist}</span>
              <span className='opacity-50'>•</span>
              <span>{currentAlbum?.songs.length} Songs</span>
              <span className='opacity-50'>•</span>
              <span>{currentAlbum?.releaseYear}</span>
            </div>

            {/* Play Button */}
            <div className='flex items-center space-x-4'>
              <Button
                onClick={() => handleAlbum()}
                size='lg'
                className='group relative overflow-hidden 
                bg-white text-black hover:bg-white/90 
                rounded-full px-8 py-4 flex items-center space-x-3
                transition-all duration-500 ease-in-out'
              >
                <PlayIcon className='w-6 h-6 group-hover:scale-110 transition-transform' />
                <span className='font-bold'>Play Album</span>
                <div
                  className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                opacity-0 group-hover:opacity-100 animate-[shimmer_2s_infinite]'
                ></div>
              </Button>
            </div>
          </div>
        </div>

        {/* Track Listing */}
        <div className='bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden'>
          {/* Table Header */}
          <div
            className='grid grid-cols-[auto_1fr_auto_auto] gap-4 px-6 py-4 
              bg-white/5 text-white/70 font-semibold uppercase tracking-wider sticky top-0 z-10'
          >
            <div className='text-center text-amber-500'>#</div>
            <div className='flex items-center space-x-0.5'>
              <AudioWaveform className='w-5 h-5 text-blue-400' />
              <span>Track</span>
            </div>
            <div className='flex items-center space-x-1 -mx-27'>
              <CalendarClock className='w-5 h-5 text-green-400' />
              <span>Date</span>
            </div>
            <div className='flex items-center space-x-0.5 -mx-4'>
              <Timer className='w-5 h-5 text-red-400' />
              <span>Runtime</span>
            </div>
          </div>

          <ScrollArea.Root className='h-full relative z-20 overflow-hidden rounded-xl'>
            <ScrollArea.Viewport className='w-full h-full'>
              <div className='divide-y divide-white/10'>
                {currentAlbum?.songs.map((song, index) => {
                  const isCurrentSong = currentSong?._id === song._id;
                  return (
                    <div
                      key={song._id}
                      onClick={() => handlePlayAlbum(index)}
                      className='grid grid-cols-[auto_1fr_auto_auto] gap-4 px-6 py-4 
              hover:bg-white/10 transition-colors group cursor-pointer'
                    >
                      {isPlaying && isCurrentSong ? (
                        <div className='flex items-center justify-center  text-emerald-200 animate-pulse -ml-2.5'>
                          <AudioLines size={20} strokeWidth={3} />
                        </div>
                      ) : (
                        <>
                          <div className='flex items-center justify-center text-white/70 group-hover:text-white block group-hover:hidden'>{index + 1}</div>
                          <div className='flex items-center justify-center py-4 text-emerald-200  -ml-3 hidden group-hover:block'>
                            <Play className="w-4 h-4" strokeWidth={3} />
                          </div>
                        </>
                      )}

                      <div className='flex items-center space-x-4'>
                        <img
                          src={song.imageUrl}
                          alt={song.title}
                          className='w-12 h-12 rounded-lg object-cover 
                  group-hover:scale-110 transition-transform'
                        />
                        <div>
                          <div className='font-semibold text-white group-hover:text-blue-300 transition-colors'>{song.title}</div>
                          <div className='text-white/60 text-sm'>{song.artist}</div>
                        </div>
                      </div>
                      <div className='text-white/70 group-hover:text-white mr-10'>{song.createdAt.split("T")[0]}</div>
                      <div className='text-white/70 group-hover:text-white'>{formatDuration(song.duration)} min</div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation='vertical' className='flex select-none touch-none p-0.5 bg-black/10 transition-colors duration-[160ms] ease-out hover:bg-black/20 data-[orientation=vertical]:w-2.5'>
              <ScrollArea.Thumb className="flex-1 bg-zinc-700/50 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;

// <div className='relative h-screen w-full bg-zinc-950 rounded-3xl'>
//   {/* Top gradient overlay (Randomized on Reload) */}
//   <div className={`absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b ${gradients[gradientIndex]} pointer-events-none z-0 transition-all duration-500 rounded-xl`} />
//
//   {/* Scrollable content area */}
//   <ScrollArea className='relative z-10 min-h-full w-full'>
//     <div className='container mx-auto px-4 py-8'>
//       {currentAlbum && (
//         <div className='space-y-6'>
//           {/* Album Header */}
//           {/* <div className='flex items-center space-x-6'>
//             {currentAlbum.coverImage && <img src={currentAlbum.coverImage} alt={currentAlbum.name} className='w-48 h-48 object-cover rounded-lg shadow-xl' />}
//             <div>
//               <h1 className='text-4xl font-bold text-white'>{currentAlbum.name}</h1>
//               <p className='text-zinc-300 text-lg mt-2'>
//                 {currentAlbum.artist} • {currentAlbum.year}
//               </p>
//             </div>
//           </div> */}

//           {/* Track List */}
//           {/* <div className='bg-white/10 backdrop-blur-md rounded-lg p-6'>
//             <h2 className='text-2xl font-semibold text-white mb-4'>Tracks</h2>
//             <div className='space-y-3'>
//               {currentAlbum.tracks?.map((track, index) => (
//                 <div key={track.id} className='flex justify-between items-center text-white/80 hover:bg-white/20 p-3 rounded-md transition-colors'>
//                   <div className='flex items-center space-x-4'>
//                     <span className='text-zinc-400'>{index + 1}</span>
//                     <span>{track.name}</span>
//                   </div>
//                   <span className='text-zinc-400'>{track.duration}</span>
//                 </div>
//               ))}
//             </div>
//           </div> */}
//         </div>
//       )}
//     </div>
//   </ScrollArea>
// </div>
