import Header from "@/components/AdminPage/AdminHeader";
import AlbumsTabContent from "@/components/AdminPage/AlbumTabContent";
import DashboardStats from "@/components/AdminPage/DashBoardStats";
import SongsTabContent from "@/components/AdminPage/SongsTab";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMusicStore } from "@/stores/useMusicStore";
import { Album, AlertTriangle, Music } from "lucide-react";
import React, { useEffect } from "react";

const AdminPage = () => {
  const { isAdmin } = useAuthStore();
  const { fetchAlbums, fetchSongs, fetchStats, isLoading, stats, songs, albums } = useMusicStore();
  useEffect(() => {
    fetchAlbums();
    fetchSongs();
    fetchStats();
  }, [fetchAlbums, fetchSongs, fetchStats]);
  const handleHomepageReturn = () => {
    window.location.href = "/";
  };
  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-black'>
        <div className='text-center'>
          <div className='flex justify-center items-center space-x-2 mb-4'>
            <div className='w-4 h-4 bg-green-500 rounded-full animate-bounce'></div>
            <div className='w-4 h-4 bg-green-500 rounded-full animate-bounce delay-100'></div>
            <div className='w-4 h-4 bg-green-500 rounded-full animate-bounce delay-200'></div>
          </div>
          <h2 className='text-xl text-gray-200 font-semibold'>Loading...</h2>
          <p className='text-gray-400 mt-2'>Fetching the Admin Page</p>
        </div>
      </div>
    );
  }
  if (!isLoading && !isAdmin) {
    return (
      <div className='flex items-center justify-center h-screen  bg-black'>
        <div className='text-center flex items-center justify-center flex-col p-8 bg-gray-800 shadow-md rounded-lg border border-emerald-600'>
          <AlertTriangle size={40} className='text-green-500 mb-4 animate-bounce' />
          <h1 className='text-2xl font-bold text-green-500 mb-4'>Access Restricted</h1>
          <p className='mb-6 text-gray-300'>You do not have permission to access this page.</p>
          <Button onClick={handleHomepageReturn} className='bg-emerald-600 hover:bg-emerald-700 text-white'>
            Go to Homepage
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div
      className='min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900
   to-black text-zinc-100 p-8'
    >
      <Header />

      <DashboardStats />

      <Tabs defaultValue='songs' className='space-y-4 w-full h-36'>
        <TabsList className='bg-zinc-900  rounded-xl border border-zinc-800 shadow-md'>
          <TabsTrigger
            value='songs'
            className='
    data-[state=active]:bg-emerald-500/20 
    data-[state=active]:text-emerald-400 
    rounded-lg 
    px-5 
    py-3 
    text-lg 
    transition-all 
    duration-300 
    flex 
    items-center 
    text-zinc-400 
    hover:text-zinc-200
    group
  '
          >
            <Music className='mr-2 size-5 text-zinc-500 group-data-[state=active]:text-emerald-400 transition-colors' />
            Songs
          </TabsTrigger>
          <TabsTrigger
            value='albums'
            className='
        data-[state=active]:bg-emerald-500/20 
        data-[state=active]:text-emerald-400 
        rounded-lg 
        px-5 
        py-3 
        text-lg 
        transition-all 
        duration-300 
        flex 
        items-center 
        text-zinc-400 
        hover:text-zinc-200
        group
      '
          >
            <Album className='mr-2 size-5 text-zinc-500 group-data-[state=active]:text-emerald-400 transition-colors' />
            Albums
          </TabsTrigger>
        </TabsList>
        <TabsContent value='songs'>
          <SongsTabContent />
        </TabsContent>
        <TabsContent value='albums'>
          <AlbumsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
