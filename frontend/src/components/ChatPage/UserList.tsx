import * as ScrollArea from "@radix-ui/react-scroll-area";
import { UsersIcon, Waves, Orbit, RotateCw } from "lucide-react";
import { useChatStore } from "@/stores/useChatStore";
import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useIndexColorStore } from "@/stores/useIndexColorStore";

const UsersList = () => {
  const { users, selectedUser, isLoading, setSelectedUser, onlineUsers } = useChatStore();
  const navigate = useNavigate();
  const { colors, idx } = useIndexColorStore();

  // Emerald-themed gradient colors for fallback
  const gradientColors = ["from-emerald-500/70 to-emerald-700/70", "from-teal-500/70 to-emerald-600/70", "from-green-500/70 to-emerald-600/70"];

  return (
    <div className='h-[90%] bg-gradient-to-b from-zinc-900 to-black flex rounded-3xl flex-col overflow-hidden border border-emerald-500/10 shadow-2xl'>
      {/* Header */}
      <div className='p-4 flex justify-between items-center border-b border-emerald-500/10 bg-zinc-900/80 backdrop-blur-xl rounded-3xl'>
        <div className='flex items-center gap-4'>
          <UsersIcon className={`size-7 ${colors[idx]} animate-pulse`} />
          <h2 className='font-bold text-xl tracking-wider text-white uppercase'>F R I E N D S</h2>
        </div>
        <RotateCw className='text-emerald-500/70 size-6 animate-spin-slow hover:text-emerald-400 transition-colors cursor-pointer' onClick={() => navigate(0)} />
      </div>

      {/* Loading State */}
      {isLoading && <UserListSkeleton />}

      {/* User List */}
      <ScrollArea.Root className='flex-1 overflow-hidden'>
        <ScrollArea.Viewport className='w-full h-full'>
          <div className='p-4 space-y-4'>
            {users.map((user: User, index) => (
              <UserListItem key={user._id} user={user} index={index} gradientColors={gradientColors} isSelected={selectedUser?.clerkId === user.clerkId} onSelect={() => setSelectedUser(user)} />
            ))}

            {/* Empty State */}
            {!isLoading && users.length === 0 && (
              <div className='flex flex-col items-center justify-center p-6 text-center space-y-4'>
                <div className='text-white/50'>
                  <Waves className='size-12 mx-auto mb-4 text-emerald-500/30' />
                  <p className='text-emerald-500/70'>No connections yet</p>
                </div>
              </div>
            )} 
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          orientation='vertical'
          className='
            flex select-none touch-none p-0.5 
            bg-emerald-500/10 
            transition-colors duration-[160ms] ease-out 
            hover:bg-emerald-500/20 
            data-[orientation=vertical]:w-2.5
          '
        >
          <ScrollArea.Thumb
            className="
              flex-1 bg-emerald-500/50 rounded-[10px] relative 
              before:content-[''] before:absolute before:top-1/2 before:left-1/2 
              before:-translate-x-1/2 before:-translate-y-1/2 
              before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]
            "
          />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
};

// User List Item Component
const UserListItem = ({ user, index, gradientColors, isSelected, onSelect }: { user: User; index: number; gradientColors: string[]; isSelected: boolean; onSelect: () => void }) => {
  const { onlineUsers } = useChatStore();
  return (
    <div
      onClick={onSelect}
      className={`
        cursor-pointer 
        ${isSelected ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-zinc-900/40 hover:bg-emerald-500/10 hover:border-emerald-500/20"}
        p-4 rounded-xl transition-all duration-300 group
        border border-transparent
      `}
    >
      <div className='flex items-center gap-4'>
        {/* User Avatar */}
        <div className='relative'>
          <Avatar className='size-14 ring-2 ring-emerald-500/30 group-hover:ring-emerald-500/50'>
            <AvatarImage src={user.imageUrl} alt={user.fullName} className='group-hover:scale-105 transition-transform' />
            <AvatarFallback
              className={`
                bg-gradient-to-br ${gradientColors[index % gradientColors.length]} 
                text-white size-14 flex items-center justify-center
                font-semibold uppercase
              `}
            >
              {user.fullName
                .split(" ")
                .map((name) => name[0])
                .join("")
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          {/* Status Indicator */}
          <div
            className={`
              absolute bottom-0 right-0 w-4 h-4 rounded-full 
              ${onlineUsers.has(user.clerkId) ? "bg-emerald-500 ring-2 ring-emerald-500/50" : "bg-zinc-700 ring-2 ring-zinc-600"} 
              animate-pulse
            `}
          />
        </div>

        {/* User Info */}
        <div className='flex-1 min-w-0'>
          <span className='font-bold text-lg text-white group-hover:text-emerald-300 transition-colors'>{user.fullName}</span>

          <div className='mt-1 text-sm text-white/50 flex items-center gap-2'>
            <Waves
              className={`
              size-4 
              ${onlineUsers.has(user.clerkId) ? "text-emerald-500/70" : "text-white/30"}
            `}
            />
            <span>{onlineUsers.has(user.clerkId) ? "Active" : "Offline"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton Component
const UserListSkeleton = () => {
  return (
    <div className='p-4 space-y-4'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className='
            cursor-pointer bg-zinc-900/40 
            p-4 rounded-xl animate-pulse
          '
        >
          <div className='flex items-center gap-4'>
            <div className='h-14 w-14 rounded-full bg-zinc-800' />
            <div className='flex-1 space-y-2'>
              <div className='h-5 w-3/4 bg-zinc-800 rounded' />
              <div className='h-4 w-1/2 bg-zinc-800 rounded' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
