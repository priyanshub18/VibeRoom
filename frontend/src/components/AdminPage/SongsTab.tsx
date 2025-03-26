import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Plus, Search, Filter, ListMusic, Grid, ChevronDown, Play, Calendar, Delete, Trash2, ServerCrash, AlertTriangle, RefreshCcw, RotateCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useMusicStore } from "@/stores/useMusicStore";
import AddSongDialog from "./AddSongDialog";

const SongsTabContent = () => {
  const [viewMode, setViewMode] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  const { songs, error, deleteSong } = useMusicStore();
  const onRetry = () => {
    window.location.reload();
  };
  // Mock data - in a real app, this would come from state or API
  const errorConfigs = [
    {
      icon: ServerCrash,
      title: "Failed to Load Music Library",
      description: "We couldn't retrieve your music collection. This could be due to network issues or server problems.",
      iconColor: "text-red-500",
    },
    {
      icon: AlertTriangle,
      title: "No Songs Found",
      description: "Your music library appears to be empty. Try adding some songs or syncing your library.",
      iconColor: "text-yellow-500",
    },
    {
      icon: AlertTriangle,
      title: "Network Connection Lost",
      description: "Unable to connect to the music server. Please check your internet connection and try again.",
      iconColor: "text-orange-500",
    },
  ];
  const config = errorConfigs[0];
  const ErrorIcon = config.icon;
  if (error) {
    return (
      <Card className='w-full mx-auto bg-zinc-900 border-zinc-800 shadow-xl py-40'>
        <CardHeader className='items-center text-center'>
          <div className={`mb-4 ${config.iconColor}`}>
            <ErrorIcon className='size-16 mx-auto' strokeWidth={1.5} />
          </div>
          <CardTitle className='text-emerald-300 text-xl'>{config.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className='text-zinc-400 text-center'>{config.description}</p>

          {error && (
            <div className='bg-zinc-800 rounded-lg p-3 mt-4 max-h-32 overflow-y-auto'>
              <code className='text-xs text-red-400 break-words'>{error.message || JSON.stringify(error)}</code>
            </div>
          )}
        </CardContent>

        <CardFooter className='flex justify-center space-x-4'>
          <Button onClick={onRetry} className='bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2'>
            <RefreshCcw className='size-4' />
            Retry Loading
          </Button>

          <Button variant='outline' className='border-zinc-700 text-zinc-300 hover:bg-zinc-800'>
            Contact Support
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Mock data - in a real app, this would come from state or API
  return (
    <Card className='w-full  mx-auto bg-zinc-900 border-zinc-800 text-zinc-100 shadow-2xl'>
      <CardHeader className='border-b border-zinc-800'>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-3 mb-2'>
              <Music className='size-6 text-emerald-500' />
              <span className='text-2xl font-bold text-emerald-300'>Songs Library</span>
            </CardTitle>
            <CardDescription className='text-zinc-400'>Explore, manage, and organize your music collection</CardDescription>
          </div>

          <div className='flex items-center space-x-3'>
            <Button
              className='
font-bold
    flex items-center gap-2 
    bg-zinc-800 
    border-zinc-700 
    text-zinc-300 
    hover:bg-zinc-700 
    hover:text-emerald-300 
    transition-all 
    duration-300 
    group
  '
              onClick={() => {
                window.location.reload();
              }}
            >
              <RotateCw
                className='
      size-4 
      text-zinc-400 
      group-hover:text-emerald-400 
      group-hover:animate-spin
    '
              />
              <span>Reload</span>
            </Button>
            {/* Search Input */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500' size={18} />
              <Input placeholder='Search songs...(Coming Soon)' className='pl-10 w-64 bg-zinc-800 border-zinc-700 text-zinc-100 focus:ring-emerald-500 focus:border-emerald-500' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            {/* View Mode Toggle */}
            <div className='flex border rounded-md border-zinc-800'>
              <Button variant={viewMode === "list" ? "default" : "ghost"} size='icon' onClick={() => setViewMode("list")} className={`${viewMode === "list" ? "bg-emerald-600 text-zinc-100 hover:bg-emerald-700" : "bg-transparent text-zinc-400 hover:bg-zinc-800"}`}>
                <ListMusic className='size-4' />
              </Button>
              <Button variant={viewMode === "grid" ? "default" : "ghost"} size='icon' onClick={() => setViewMode("grid")} className={`${viewMode === "grid" ? "bg-emerald-600 text-zinc-100 hover:bg-emerald-700" : "bg-transparent text-zinc-400 hover:bg-zinc-800"}`}>
                <Grid className='size-4' />
              </Button>
            </div>

            {/* Add Song Button */}
            <AddSongDialog />
          </div>
        </div>
      </CardHeader>

      <CardContent className='p-4'>
        {/* Songs Table or Grid */}
        {viewMode === "list" ? (
          <table className='w-full text-left'>
            <thead className='border-b border-zinc-800'>
              <tr className='text-zinc-400'>
                <th className='p-3'>#</th>
                <th className='p-3'>Title</th>
                <th className='p-3'>Artist</th>
                <th className='p-3'>Date</th>
                <th className='p-3'>Duration</th>
                <th className='p-3 text-right'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song, index) => (
                <tr key={song._id} className='border-b border-zinc-800 hover:bg-zinc-800 transition-colors group g'>
                  <td> {index + 1}</td>
                  <td className='p-3 font-medium flex items-center gap-4  group-hover:text-emerald-300'>
                    <img
                      src={song.imageUrl}
                      alt={song.title}
                      className='w-12 h-12 rounded-lg object-cover 
                  group-hover:scale-110 transition-transform'
                    />
                    {song.title}
                  </td>
                  <td className='p-3 text-zinc-400'>{song.artist}</td>
                  <td className='p-3 text-zinc-400 flex gap-2'>
                    <Calendar />
                    {song.updatedAt.split("T")[0]}
                  </td>
                  <td className='p-3 text-zinc-300'>{formatDuration(song.duration)} min</td>
                  <td className='p-3 text-right'>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='text-red-400 hover:text-red-600'
                      onClick={() => {
                        deleteSong(song._id);
                        // window.location.reload();
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className='grid grid-cols-3 gap-4'>
            {songs.map((song) => (
              <div key={song._id} className='border-2 border-zinc-800 rounded-lg p-4 hover:shadow-lg hover:border-emerald-700 transition-all bg-zinc-800 group'>
                <div className='flex items-center space-x-4 mb-3'>
                  <img src={song.imageUrl} alt={song.title} className='w-16 h-16 rounded-lg object-cover shadow-md group-hover:scale-105 transition-transform duration-300' />
                  <div className='flex-grow'>
                    <h3 className='font-semibold group-hover:text-emerald-300 text-lg line-clamp-1'>{song.title}</h3>
                    <p className='text-zinc-400 text-sm line-clamp-1'>{song.artist}</p>
                  </div>
                  <div>
                    <span className='text-white/50 text-md'>{formatDuration(song.duration)} min</span>
                  </div>
                </div>

                <div className='flex justify-between items-center'>
                  <span className='text-zinc-500 text-sm'>{song.createdAt.split("T")[0]}</span>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='text-red-400 hover:text-red-600  hover:bg-zinc-800'
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
