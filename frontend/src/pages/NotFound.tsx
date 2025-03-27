import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Home, RefreshCw, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center p-4'>
      <div className='max-w-md w-full bg-zinc-900/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden'>
        <div className='relative'>
          {/* Animated Background Gradient */}
          <div
            className='absolute -inset-2  
            rounded-2xl blur-xl opacity-50 animate-pulse'
            aria-hidden='true'
          />

          {/* Content Container */}
          <div className='relative z-10 p-8 text-center'>
            {/* Error Icon with Pulse and Shake Animation */}
            <div className='flex justify-center mb-6'>
              <div className='relative'>
                <AlertTriangle className='size-24 text-emerald-500/80 animate-shake' strokeWidth={1.5} />
                <div
                  className='absolute inset-0 bg-emerald-500/20 rounded-full 
                  animate-ping opacity-75'
                />
              </div>
            </div>

            {/* Error Title and Description */}
            <h1
              className='text-5xl font-black mb-4 bg-clip-text text-transparent 
            bg-gradient-to-r from-emerald-400 to-green-600 tracking-tight'
            >
              404
            </h1>
            <h2 className='text-2xl font-bold text-white/90 mb-4'>Oops! Page Not Found</h2>
            <p className='text-white/70 mb-8'>The page you're looking for seems to have wandered off into the digital wilderness. Don't worry, we'll help you find your way back.</p>

            {/* Action Buttons */}
            <div className='flex justify-center space-x-4'>
              <Link
                to='/'
                className='flex items-center gap-2 px-6 py-3 
                bg-emerald-500/10 hover:bg-emerald-500/20 text-white 
                rounded-full transition-all duration-300 
                hover:scale-105 active:scale-95 group'
              >
                <Home
                  className='size-5 text-emerald-400 group-hover:text-emerald-300 
                  transition-colors'
                />
                Home
              </Link>
              <button
                onClick={() => window.location.reload()}
                className='flex items-center gap-2 px-6 py-3 
                bg-green-500/20 hover:bg-green-500/30 text-white 
                rounded-full transition-all duration-300 
                hover:scale-105 active:scale-95 group'
              >
                <RefreshCw
                  className='size-5 text-green-300 group-hover:rotate-180 
                  transition-transform'
                />
                Retry
              </button>
            </div>

            {/* Back Navigation */}
            <button
              onClick={() => window.history.back()}
              className='mt-6 text-white/50 hover:text-emerald-400 
              flex items-center justify-center w-full gap-2 
              transition-colors group'
            >
              <ArrowLeft
                className='size-5 group-hover:-translate-x-1 
                transition-transform'
              />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
