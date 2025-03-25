import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { HeadphonesIcon, Music, UsersIcon, Waves, Orbit, RadioReceiver, Library } from "lucide-react";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types";
import { useIndexColorStore } from "@/stores/useIndexColorStore";
import PlaylistSkeleton from "./skeletons/PlayListSkeleton";

const FriendActivity = () => {
  const gradientColors = ["from-blue-500/70 to-indigo-500/70", "from-purple-500/70 to-pink-500/70", "from-green-500/70 to-teal-500/70", "from-yellow-500/70 to-orange-500/70", "from-red-500/70 to-pink-500/70"];

  const { users, isLoading, fetchUsers } = useChatStore();
  const { idx, setIndex, colors } = useIndexColorStore();
  const { user } = useUser();

  useEffect(() => {
    if (user) fetchUsers();
    setIndex();
    console.log("Colors: ", colors);
    console.log("Colors index", colors[idx]);
  }, [fetchUsers, user]);

  return (
    <div className='h-full bg-gradient-to-b from-zinc-950 to-black rounded-2xl flex flex-col overflow-hidden'>
      {/* Header */}
      <div className='p-4 flex justify-between items-center border-b border-white/10 bg-zinc-900/60 backdrop-blur-xl'>
        <div className='flex items-center gap-4'>
          <UsersIcon
            className={`size-7 ${colors[idx]}
            animate-pulse`}
          />

          <h2 className='font-bold text-xl tracking-wider text-white'>V I B E - C H E C K</h2>
        </div>
        <Orbit className='text-white/30 size-6 animate-spin-slow' />
      </div>

      {/* Loading State */}
      {isLoading && <PlaylistSkeleton />}

      {/* Not Logged In State */}
      {!user && (
        <div className='flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6'>
          <div className='relative'>
            <div
              className={`absolute -inset-2 bg-gradient-to-r ${gradientColors[idx]} 
              rounded-full blur-xl opacity-70 animate-pulse`}
              aria-hidden='true'
            />
            <div className='relative bg-zinc-900/60 backdrop-blur-xl rounded-full p-6 shadow-2xl'>
              <HeadphonesIcon className={`size-12 ${gradientColors[idx].split(" ")[0].replace("from-", "text-")}`} />
            </div>
          </div>

          <div className='space-y-4 max-w-[300px]'>
            <h3 className='text-2xl font-bold text-white'>Tune Into Your Friends</h3>
            <p className='text-white/70'>Login to explore the music your friends are vibing to right now! 🎶</p>
          </div>
        </div>
      )}

      {/* User List */}
      <ScrollArea.Root className='flex-1 overflow-hidden'>
        <ScrollArea.Viewport className='w-full h-full'>
          <div className='p-4 space-y-4'>
            {users.map((user: User, index) => (
              <UserActivityItem key={user._id || index} user={user} index={index} gradientColors={gradientColors} />
            ))}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation='vertical' className='flex select-none touch-none p-0.5 bg-black/10 transition-colors duration-[160ms] ease-out hover:bg-black/20 data-[orientation=vertical]:w-2.5'>
          <ScrollArea.Thumb className="flex-1 bg-zinc-700/50 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
};

// Extracted User Activity Item Component
const UserActivityItem = ({ user, index, gradientColors }: { user: User; index: number; gradientColors: string[] }) => {
  const isPlaying = false; // You might want to derive this from user data

  return (
    <div
      className='cursor-pointer bg-zinc-900/40 hover:bg-white/10 
      p-4 rounded-xl transition-all duration-300 group'
    >
      <div className='flex items-center gap-4'>
        {/* User Avatar */}
        <div className='relative'>
          <Avatar className='size-14 border-2 border-white/10 group-hover:border-white/30'>
            <AvatarImage src={user.imageUrl} alt={user.fullName} className='group-hover:scale-110 transition-transform' />
            <AvatarFallback
              className={`bg-gradient-to-br ${gradientColors[index % gradientColors.length]} 
              text-white size-14 flex items-center justify-center`}
            >
              {user.fullName
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          {/* Status Indicator */}
          <div
            className={`absolute bottom-0 right-0 w-4 h-4 rounded-full 
            ${isPlaying ? "bg-green-500" : "bg-zinc-700"} 
            border-2 border-zinc-900 animate-pulse`}
          />
        </div>

        {/* User Info */}
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-3'>
            <span className='font-bold text-lg text-white group-hover:text-blue-300 transition-colors'>{user.fullName}</span>
            {isPlaying && <Music className='size-5 text-green-400 animate-[bounce_1s_infinite]' />}
          </div>

          {isPlaying ? (
            <div className='flex items-center gap-2 mt-1'>
              <RadioReceiver className='size-4 text-white/50 animate-pulse' />
              <span className='text-sm text-white/70'>Cardigan • Taylor Swift</span>
            </div>
          ) : (
            <div className='mt-1 text-sm text-white/50 flex items-center gap-2'>
              <Waves className='size-4 text-white/30' />
              <span>Idle</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendActivity;
