import FeaturedSongs from "@/components/FeaturedSongs";
import SectionGrid from "@/components/SectionGrid";
import Navbar from "@/components/TopBar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useUser } from "@clerk/clerk-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect } from "react";

const HomePage = () => {
  const { fetchFeaturedSongs, fetchTrendingSongs, fetchMadeForYouSongs, isLoading, featuredSongs, trendingSongs, madeForYouSongs } = useMusicStore();
  const { user, isLoaded } = useUser();
  useEffect(() => {
    fetchFeaturedSongs();
    fetchTrendingSongs();
    fetchMadeForYouSongs();
  }, [fetchFeaturedSongs, fetchTrendingSongs, fetchMadeForYouSongs]);

  console.log({ featuredSongs, trendingSongs, madeForYouSongs });
  return (
    <div className='rounded-md overflow-hidden'>
      <Navbar />
      <ScrollArea className='h-[calc(100vh-80px)] overflow-y-auto scrollbar-thin scrollbar-thumb-white-500 scrollbar-track-white-900 bg-zinc-900 rounded-xl'>
        <div className='p-4 sm:p-6 grid gap-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-white '>Good Afternoon, {user?.fullName}</h1>
          <FeaturedSongs />
        </div>
        <div className='space-y-8'>
          <SectionGrid title='Made For You' songs={madeForYouSongs} />
          <SectionGrid title='Trending Now' songs={trendingSongs} />
        </div>
      </ScrollArea>
    </div>
  );
};

export default HomePage;
