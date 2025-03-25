import { useMusicStore } from "@/stores/useMusicStore";
import { AlertTriangle, Loader2, RefreshCw } from "lucide-react";
import React from "react";

const ErrorSkelaton = () => {
  const { fetchMadeForYouSongs, fetchTrendingSongs, isLoading } = useMusicStore();
  const handleRetry = () => {
    // TODO: Add logic to retry the fetching
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  };
  return (
    <div className='flex flex-col items-center justify-center h-full text-center bg-zinc-900 text-white p-6'>
      <AlertTriangle className='w-12 h-12 text-red-500 animate-pulse mb-2' />
      <h2 className='text-2xl font-bold'>Oops! Something went wrong.</h2>
      <p className='text-zinc-400 mb-4'>We encountered an unexpected issue. Please try again.</p>

      {isLoading ? (
        <div className='flex items-center space-x-2 text-blue-400'>
          <Loader2 className='w-6 h-6 animate-spin' />
          <span>Reloading...</span>
        </div>
      ) : (
        <button onClick={handleRetry} className='flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md shadow-md transition-all'>
          <RefreshCw className='w-5 h-5' />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
};

export default ErrorSkelaton;
