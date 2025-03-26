import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Search, Grid, ListMusic, Trash2, ServerCrash, RefreshCcw, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMusicStore } from "@/stores/useMusicStore";
import AddSongDialog from "./AddSongDialog";

const SongsTabContent = () => {
  const [viewMode, setViewMode] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const { songs, error, deleteSong } = useMusicStore();

  // Check for mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  const onRetry = () => {
    window.location.reload();
  };

  const errorConfigs = [
    {
      icon: ServerCrash,
      title: "Failed to Load Music Library",
      description: "We couldn't retrieve your music collection. This could be due to network issues or server problems.",
      iconColor: "text-red-500",
    },
  ];
  const config = errorConfigs[0];
  const ErrorIcon = config.icon;

  if (error) {
    return (
      <Card className='w-full mx-auto bg-zinc-900 border-zinc-800 shadow-xl py-20 md:py-40'>
        <CardHeader className='items-center text-center'>
          <div className={`mb-4 ${config.iconColor}`}>
            <ErrorIcon className='size-16 mx-auto' strokeWidth={1.5} />
          </div>
          <CardTitle className='text-emerald-300 text-xl'>{config.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className='text-zinc-400 text-center px-4'>{config.description}</p>

          {error && (
            <div className='bg-zinc-800 rounded-lg p-3 mt-4 max-h-32 overflow-y-auto mx-4'>
              <code className='text-xs text-red-400 break-words'>{error.message || JSON.stringify(error)}</code>
            </div>
          )}
        </CardContent>

        <CardFooter className='flex justify-center space-x-4'>
          <Button onClick={onRetry} className='bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2'>
            <RefreshCcw className='size-4' />
            Retry Loading
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className='w-full mx-auto bg-zinc-900 border-zinc-800 text-zinc-100 shadow-2xl'>
      <CardHeader className='border-b border-zinc-800 p-4'>
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0'>
          <div>
            <CardTitle className='flex items-center gap-3 mb-2'>
              <Music className='size-6 text-emerald-500' />
              <span className='text-2xl font-bold text-emerald-300'>Songs Library</span>
            </CardTitle>
            <CardDescription className='text-zinc-400 hidden md:block'>Explore, manage, and organize your music collection</CardDescription>
          </div>

          <div className='flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-3 w-full md:w-auto'>
            {/* Mobile Search and View Mode */}
            {isMobile ? (
              <div className='flex flex-col space-y-3 w-full'>
                <div className='relative w-full'>
                  <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500' size={18} />
                  <Input placeholder='Search songs...' className='pl-10 w-full bg-zinc-800 border-zinc-700 text-zinc-100 focus:ring-emerald-500 focus:border-emerald-500' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>

                <div className='flex justify-between items-center w-full'>
                  <div className='flex border rounded-md border-zinc-800'>
                    <Button variant={viewMode === "list" ? "default" : "ghost"} size='sm' onClick={() => setViewMode("list")} className={`${viewMode === "list" ? "bg-emerald-600 text-zinc-100 hover:bg-emerald-700" : "bg-transparent text-zinc-400 hover:bg-zinc-800"}`}>
                      <ListMusic className='size-4' />
                    </Button>
                    <Button variant={viewMode === "grid" ? "default" : "ghost"} size='sm' onClick={() => setViewMode("grid")} className={`${viewMode === "grid" ? "bg-emerald-600 text-zinc-100 hover:bg-emerald-700" : "bg-transparent text-zinc-400 hover:bg-zinc-800"}`}>
                      <Grid className='size-4' />
                    </Button>
                  </div>

                  <AddSongDialog />
                </div>
              </div>
            ) : (
              // Desktop view
              <>
                <Button className='font-bold flex items-center gap-2 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-emerald-300 transition-all duration-300 group' onClick={() => window.location.reload()}>
                  <RefreshCcw className='size-4 text-zinc-400 group-hover:text-emerald-400' />
                  <span>Reload</span>
                </Button>

                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500' size={18} />
                  <Input placeholder='Search songs...' className='pl-10 w-64 bg-zinc-800 border-zinc-700 text-zinc-100 focus:ring-emerald-500 focus:border-emerald-500' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>

                <div className='flex border rounded-md border-zinc-800'>
                  <Button variant={viewMode === "list" ? "default" : "ghost"} size='icon' onClick={() => setViewMode("list")} className={`${viewMode === "list" ? "bg-emerald-600 text-zinc-100 hover:bg-emerald-700" : "bg-transparent text-zinc-400 hover:bg-zinc-800"}`}>
                    <ListMusic className='size-4' />
                  </Button>
                  <Button variant={viewMode === "grid" ? "default" : "ghost"} size='icon' onClick={() => setViewMode("grid")} className={`${viewMode === "grid" ? "bg-emerald-600 text-zinc-100 hover:bg-emerald-700" : "bg-transparent text-zinc-400 hover:bg-zinc-800"}`}>
                    <Grid className='size-4' />
                  </Button>
                </div>

                <AddSongDialog />
              </>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className='p-4'>
        {/* Songs Table or Grid */}
        {viewMode === "list" ? (
          <div className='overflow-x-auto'>
            <table className='w-full text-left'>
              <thead className='border-b border-zinc-800'>
                <tr className='text-zinc-400'>
                  <th className='p-3 hidden md:table-cell'>#</th>
                  <th className='p-3'>Title</th>
                  <th className='p-3 hidden md:table-cell'>Artist</th>
                  <th className='p-3 hidden md:table-cell'>Date</th>
                  <th className='p-3 hidden md:table-cell'>Duration</th>
                  <th className='p-3 text-right'>Delete</th>
                </tr>
              </thead>
              <tbody>
                {songs.map((song, index) => (
                  <tr key={song._id} className='border-b border-zinc-800 hover:bg-zinc-800 transition-colors group'>
                    <td className='hidden md:table-cell p-3'>{index + 1}</td>
                    <td className='p-3 font-medium flex items-center gap-4 group-hover:text-emerald-300'>
                      <img
                        src={song.imageUrl}
                        alt={song.title}
                        className='w-12 h-12 rounded-lg object-cover 
                        group-hover:scale-110 transition-transform hidden md:block'
                      />
                      <div>
                        <div className='font-semibold'>{song.title}</div>
                        <div className='text-zinc-400 md:hidden'>{song.artist}</div>
                      </div>
                    </td>
                    <td className='p-3 text-zinc-400 hidden md:table-cell'>{song.artist}</td>
                    <td className='p-3 text-zinc-400 hidden md:flex gap-2 items-center'>
                      <Calendar className='hidden md:block size-4' />
                      {song.updatedAt.split("T")[0]}
                    </td>
                    <td className='p-3 text-zinc-300 hidden md:table-cell'>{formatDuration(song.duration)} min</td>
                    <td className='p-3 text-right'>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-red-400 hover:text-red-600'
                        onClick={() => {
                          deleteSong(song._id);
                        }}
                      >
                        <Trash2 />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {songs.map((song) => (
              <div key={song._id} className='border-2 border-zinc-800 rounded-lg p-4 hover:shadow-lg hover:border-emerald-700 transition-all bg-zinc-800 group'>
                <div className='flex items-center space-x-4 mb-3'>
                  <img src={song.imageUrl} alt={song.title} className='w-16 h-16 rounded-lg object-cover shadow-md group-hover:scale-105 transition-transform duration-300' />
                  <div className='flex-grow'>
                    <h3 className='font-semibold group-hover:text-emerald-300 text-lg line-clamp-1'>{song.title}</h3>
                    <p className='text-zinc-400 text-sm line-clamp-1'>{song.artist}</p>
                  </div>
                  <div className=' md:block'>
                    <span className='text-white/50 text-md'>{formatDuration(song.duration)} min</span>
                  </div>
                </div>

                <div className='flex justify-between items-center'>
                  <span className='text-zinc-500 text-sm  md:inline'>{song.createdAt.split("T")[0]}</span>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='text-red-400 hover:text-red-600 hover:bg-zinc-800'
                    onClick={() => {
                      deleteSong(song._id);
                    }}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SongsTabContent;
