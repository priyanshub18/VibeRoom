import { Skeleton } from "@/components/ui/skeleton";

const AlbumSkeleton = () => {
  return (
    <div className='p-6'>
      {/* Header Skeleton */}
      <div className='flex items-center gap-4'>
        <Skeleton className='w-40 h-40 rounded-md bg-zinc-700' />
        <div className='flex flex-col gap-2'>
          <Skeleton className='w-24 h-4 bg-zinc-700' />
          <Skeleton className='w-64 h-8 bg-zinc-700' />
          <Skeleton className='w-40 h-4 bg-zinc-700' />
        </div>
      </div>

      {/* Controls Skeleton */}
      <div className='flex items-center gap-4 mt-4'>
        <Skeleton className='w-12 h-12 rounded-full bg-zinc-700' />
        <Skeleton className='w-8 h-8 rounded-md bg-zinc-700' />
        <Skeleton className='w-8 h-8 rounded-md bg-zinc-700' />
        <Skeleton className='w-8 h-8 rounded-md bg-zinc-700' />
      </div>

      {/* Songs List Skeleton */}
      <div className='mt-6'>
        {[...Array(8)].map((_, index) => (
          <div key={index} className='flex items-center gap-4 py-2'>
            <Skeleton className='w-6 h-4 bg-zinc-700' />
            <Skeleton className='w-10 h-10 rounded-md bg-zinc-700' />
            <div className='flex-1'>
              <Skeleton className='w-48 h-4 bg-zinc-700' />
              <Skeleton className='w-24 h-3 mt-1 bg-zinc-700' />
            </div>
            <Skeleton className='w-20 h-4 bg-zinc-700' />
            <Skeleton className='w-8 h-4 bg-zinc-700' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumSkeleton;
