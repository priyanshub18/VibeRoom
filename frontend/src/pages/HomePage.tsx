import FeaturedSongs from "@/components/FeaturedSongs";
import SectionGrid from "@/components/SectionGrid";
import Navbar from "@/components/TopBar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useUser } from "@clerk/clerk-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from "react";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { toast } from "sonner";
import { Music, MusicIcon } from "lucide-react";
import { customToast } from "@/components/ToastThings/SelfMadeToast";
import { dirname } from "path";

const HomePage = () => {
  const { fetchFeaturedSongs, fetchTrendingSongs, fetchMadeForYouSongs, isLoading, featuredSongs, trendingSongs, madeForYouSongs } = useMusicStore();
  // const { initQueue, queue } = usePlayerStore();
  const { user, isLoaded } = useUser();

  // State to track whether the queue is initialized
  const [isQueueInitialized, setIsQueueInitialized] = useState(false);

  const currentHour = new Date().getHours();

  const getGreeting = () => {
    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good Afternoon";
    } else if (currentHour >= 17 && currentHour < 21) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };

  useEffect(() => {
    fetchFeaturedSongs();
    fetchTrendingSongs();
    fetchMadeForYouSongs();
  }, []);

  useEffect(() => {
    if (
      !isQueueInitialized && // Prevents re-initialization
      featuredSongs.length > 0 &&
      madeForYouSongs.length > 0 &&
      trendingSongs.length > 0
    ) {
      //
      customToast("Fetching songs...","info" , 1500);
      // initQueue([...featuredSongs, ...madeForYouSongs, ...trendingSongs]);
      setIsQueueInitialized(true); // Set flag to prevent multiple runs
    }
  }, [featuredSongs, madeForYouSongs, trendingSongs, isQueueInitialized]);

  return (
    <div className='rounded-md overflow-hidden'>
      <Navbar />
      <ScrollArea className='h-[calc(100vh-80px)] overflow-y-auto scrollbar-thin scrollbar-thumb-white-500 scrollbar-track-white-900 bg-zinc-900 rounded-xl'>
        <div className='p-4 sm:p-6 grid gap-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-white'>
            {getGreeting()}, {user?.fullName}
          </h1>
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
