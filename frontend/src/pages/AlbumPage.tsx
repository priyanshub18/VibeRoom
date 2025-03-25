import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlbumSkeleton from "@/components/skeletons/AlbumSkeleton";
import { MusicStore, useMusicStore } from "@/stores/useMusicStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { AudioLines, Calendar, Clock, Hash, Play } from "lucide-react";

// Gradient Array
const gradients = [
  // Existing gradients
  "from-[#6a11cb]/80  via-zinc-900/80 to-zinc", // Purple-Black
  "from-[#ff3c00]/80  via-zinc-900/80 to-zinc", // Red-Black
  "from-[#2563eb]/80  via-zinc-900/80 to-zinc", // Blue-Black
  "from-[#d4af37]/80  via-zinc-900/80 to-zinc", // Gold-Black
  "from-[#ff0080]/80  via-zinc-900/80 to-zinc", // Pink-Black

  // New additions
  "from-[#16a34a]/80 via-zinc-900/80 to-zinc", // Green-Black
  "from-[#0891b2]/80  via-zinc-900/80 to-zinc", // Teal-Dark Blue
  "from-[#7c3aed]/80  via-zinc-900/80 to-zinc", // Deep Purple-Slate
  "from-[#ca8a04]/80  via-zinc-900/80 to-zinc", // Amber-Almost Black
  "from-[#db2777]/80  via-zinc-900/80 to-zinc", // Deep Pink-Dark Blue
  "from-[#14b8a6]/80  via-zinc-900/80 to-zinc", // Teal-Slate Blue
  "from-[#4338ca]/80  via-zinc-900/80 to-zinc", // Indigo-Cool Gray
  "from-[#dc2626]/80  via-zinc-900/80 to-zinc", // Bright Red-Dark Blue
  "from-[#9333ea]/80  via-zinc-900/80 to-zinc", // Vibrant Purple-Almost Black
];

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbum, currentAlbum, isLoading } = useMusicStore() as MusicStore;

  const [showSkeleton, setShowSkeleton] = useState(true);
  const [gradientIndex, setGradientIndex] = useState(() => Math.floor(Math.random() * gradients.length));
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
    <div className='h-full'>
      <ScrollArea className='h-full rounded-md'>
        {/* Main Content */}
        <div className='relative h-full'>
          <div
            className={`absolute inset-0 bg-gradient-to-b ${gradients[gradientIndex]}
					 to-zinc-900 pointer-events-none rounded-xl`}
            aria-hidden='true'
          />
          {/* bg gradient */}

          {/* Content */}
          <div className='relative z-10'>
            <div className='flex p-4 gap-6 pb-6'>
              <img src={currentAlbum?.imageUrl} alt={currentAlbum?.title} className='w-[240px] h-[240px] shadow-xl rounded transition-transform duration-300 hover:scale-105' />
              <div className='flex flex-col justify-end'>
                <p className='text-sm font-bold'>Album</p>
                <h1 className='text-7xl font-bold my-4'>{currentAlbum?.title}</h1>
                <div className='flex items-center gap-2 text-sm text-zinc-100'>
                  <span className='font-medium text-white'>{currentAlbum?.artist}</span>
                  <span className='font-medium text-white'>• {currentAlbum?.songs.length} songs</span>
                  <span className='font-medium text-white'>• {currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>
            {/* NOTE: Play Stuff */}

            <div className='px-4 pb-3 flex items-center gap-6'>
              {/* Play Button with Hover and Glow Effect */}
              <Button
                size='icon'
                className='w-16 h-16 rounded-full bg-green-500 hover:bg-green-400 
               hover:scale-105 transition-all ease-in duration-300'
              >
                <Play className='h-8 w-8 text-black' />
              </Button>

              {/* Animated Progress Bar with Glow Effect */}
              <div
                className='flex-1 h-[3px] bg-gradient-to-r from-white via-gray-300 to-gray-500 
                  shadow-md shadow-white/30 transition-all duration-500'
              ></div>
            </div>

            <div className='backdrop-blur-lg'>
              {/* Table Header */}
              <div
                className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-8 py-3 text-sm 
                text-white font-semibold bg-white/10
                backdrop-blur-xl shadow-lg border border-white/10 rounded-sm'
              >
                <div className='text-md text-white/90 flex items-center justify-center'>
                  <Hash className='h-5 w-5 text-green-400' />
                </div>

                <div className='text-md text-white/90 flex items-center px-4'>
                  <span className='w-3'></span>
                  <AudioLines className='h-5 w-5 text-blue-400' />
                  <span className='mx-1 tracking-tight '>Song</span>
                </div>

                <div className='text-md text-white/90 flex items-center'>
                  <span className='w-3'></span>
                  <Calendar className='h-5 w-5 text-yellow-400' />
                  <span className='mx-1 tracking-tight '>Date</span>
                </div>

                <div className='text-md text-white/90 flex items-center'>
                  <Clock className='h-5 w-5 text-red-400' />
                  <span className='mx-1 tracking-tight '>Duration</span>
                </div>
              </div>

              <div className='px-6'>
                <div className='space-y-2 pt-2 pb-4'>
                  {currentAlbum?.songs.map((song, index) => {
                    // const isCurrentSong = currentSong?._id === song._id;
                    return (
                      <div
                        key={song._id}
                        // onClick={() => handlePlaySong(index)}
                        className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-3 px-3 py-2 text-sm 
                      text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer
                      `}
                      >
                        <div className='flex items-center justify-center'>
                          <span className='group-hover:hidden text-white/80'>{index + 1}</span>
                          <Play className='h-4 w-4 hidden group-hover:block' />
                        </div>

                        <div className='flex items-center gap-3'>
                          <img src={song.imageUrl} alt={song.title} className='size-10' />

                          <div>
                            <div className={`font-medium text-white text-md`}>{song.title}</div>
                            <div>{song.artist}</div>
                          </div>
                        </div>
                        <div className='flex items-center'>{song.createdAt.split("T")[0]}</div>
                        <div className='ml-1 flex items-center'>{formatDuration(song.duration)} minutes</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
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
