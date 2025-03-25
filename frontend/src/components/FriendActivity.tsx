import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { HeadphonesIcon, Music, UsersIcon } from "lucide-react";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types";
import { useIndexColorStore } from "@/stores/useIndexColorStore";
import PlaylistSkeleton from "./skeletons/PlayListSkeleton";

const FriendActivity = () => {
  const colors = ["text-blue-400", "text-red-400", "text-green-400", "text-yellow-400"];
  const bgColors = ["bg-blue-400", "bg-red-400", "bg-green-400", "bg-yellow-400", "bg-purple-400", "bg-pink-400", "bg-teal-400", "bg-orange-400", "bg-cyan-400", "bg-lime-400"];
  const colors2 = ["from-blue-500 to-indigo-500", "from-purple-500 to-pink-500", "from-green-500 to-teal-500", "from-yellow-500 to-orange-500"];
  const { users, isLoading, fetchUsers } = useChatStore();
  const { idx, setIndex } = useIndexColorStore();
  const isPlaying = false;
  const { user } = useUser();
  useEffect(() => {
    if (user) fetchUsers();
    setIndex();
  }, [fetchUsers, user]);
  // console.log("USERS : " ,users);

  // if (isLoading) {
  //   return <PlaylistSkeleton />;
  // }
  return (
    <div className='h-full bg-zinc-900 rounded-lg flex flex-col'>
      <div className='p-4 flex justify-between items-center border-b border-zinc-800'>
        <div className='flex items-center gap-2'>
          <UsersIcon className={`size-6 ${colors[idx]} shrink-0`} />
          <h2 className='font-bold text-lg'>V I B E - C H E C K</h2>
        </div>
      </div>
      {isLoading && <PlaylistSkeleton />}
      {!user && (
        <div className='h-full flex flex-col items-center justify-center p-6 text-center space-y-4'>
          <div className='relative'>
            <div
              className={`absolute -inset-1 bg-gradient-to-r ${colors2[idx]} rounded-full blur-lg
  opacity-75 animate-pulse`}
              aria-hidden='true'
            />
            <div className='relative bg-zinc-900 rounded-full p-4'>
              <HeadphonesIcon className={`size-8 ${colors[idx]}`} />
            </div>
          </div>

          <div className='space-y-2 max-w-[250px]'>
            <h3 className='text-lg font-semibold text-white'>Tune Into Your Friends </h3>
            <p className='text-sm text-zinc-400'>Login to explore the music your friends are vibing to right now! 🎶</p>
          </div>
        </div>
      )}

      <ScrollArea className='flex-1'>
        <div className='p-4 space-y-4'>
          {users.map((user: User, index) => (
            <div key={index} className='cursor-pointer hover:bg-zinc-800/50 p-3 rounded-md transition-colors group'>
              <div className='flex items-start gap-3 '>
                <div className='relative '>
                  <Avatar className='size-10 border border-zinc-800'>
                    <AvatarImage src={user.imageUrl} alt={user.fullName} />
                    <AvatarFallback className={`bg-${colors[idx]} text-white size-10 flex items-center justify-center rounded-full`}>
                      <div className={`${bgColors[index % 10]} w-full h-full text-center pt-[7px] font-bold`}>
                        {user.fullName.charAt(0)}
                        {user.fullName.split(" ")[1][0]}
                      </div>
                    </AvatarFallback>
                  </Avatar>
                  <div className='absolute bottom-0 right-0 w-3 h-3 bg-zinc-700 rounded-full' />
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2'>
                    <span className='font-bold text-md text-white'>{user.fullName}</span>
                    {isPlaying && <Music className='size-4 text-green-400' />}
                  </div>
                  {isPlaying ? (
                    <div className='flex flex-row'>
                      <div className='mt-1 text-sm text-white font-medium truncate'>Cardigan</div>
                      <span className='w-2'></span>
                      <div className='mt-1 text-sm text-zinc-400 truncate'> • Song</div>
                    </div>
                  ) : (
                    <div className='mt-1 text-xs text-zinc-400'>Idle</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FriendActivity;
