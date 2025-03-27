import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";
import { MoreVertical, Orbit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const ChatHeader = () => {
  const { selectedUser, onlineUsers } = useChatStore();

  // Predefined gradient colors for fallback
  const gradientColors = ["from-blue-500/70 to-indigo-500/70", "from-purple-500/70 to-pink-500/70", "from-green-500/70 to-teal-500/70", "from-yellow-500/70 to-orange-500/70", "from-red-500/70 to-pink-500/70"];

  if (!selectedUser) return null;

  return (
    <div
      className='
      bg-zinc-900/80 
      backdrop-blur-xl 
      border 
      rounded-xl sm:rounded-3xl 
      border-white/20 
      p-3 sm:p-4 
      group 
      shadow-lg
    '
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2 sm:gap-4'>
          {/* Avatar with Gradient Fallback and Status */}
          <div className='relative'>
            <Avatar
              className='
              size-12 sm:size-16 
              border-2 
              border-white/20 
              hover:border-white/40 
              transition-all
            '
            >
              <AvatarImage
                src={selectedUser.imageUrl}
                alt={`${selectedUser.fullName}'s avatar`}
                className='
                  group-hover:scale-105 
                  transition-transform 
                  duration-300 
                  ease-in-out
                '
              />
              <AvatarFallback
                className={`
                  bg-gradient-to-br 
                  ${gradientColors[Math.floor(Math.random() * gradientColors.length)]}
                  text-white 
                  size-12 sm:size-16 
                  flex items-center 
                  justify-center 
                  text-sm sm:text-xl 
                  font-semibold
                `}
              >
                {selectedUser.fullName
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            {/* Online/Offline Indicator */}
            <div
              className={`
                absolute 
                bottom-0 
                right-0 
                w-3 h-3 sm:w-5 sm:h-5 
                rounded-full
                ${onlineUsers.has(selectedUser.clerkId) ? "bg-green-500" : "bg-zinc-700"}
                border-2 border-zinc-900 
                animate-pulse
              `}
            />
          </div>

          {/* User Info */}
          <div>
            <h2
              className={`
                font-bold 
                text-base sm:text-xl 
                text-white
                group-hover:text-emerald-400
                transition-colors 
                duration-300
                truncate 
                max-w-[150px] sm:max-w-[250px]
              `}
            >
              {selectedUser.fullName}
            </h2>
            <p
              className={`
                text-xs sm:text-sm 
                font-medium 
                tracking-wide
                ${onlineUsers.has(selectedUser.clerkId) ? "text-green-400" : "text-white/60"}
              `}
            >
              {onlineUsers.has(selectedUser.clerkId) ? "Active" : "Offline"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex items-center gap-1 sm:gap-3'>
          {/* More Options Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='
                  text-white/50 
                  hover:text-white 
                  hover:bg-white/10 
                  rounded-full 
                  size-8 sm:size-10
                '
              >
                <MoreVertical className='size-4 sm:size-5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='
                bg-zinc-800 
                border-white/10 
                text-white 
                w-[200px] 
                sm:w-auto
              '
            >
              <DropdownMenuItem className='focus:bg-white/10 focus:text-white'>View Profile</DropdownMenuItem>
              <DropdownMenuItem className='focus:bg-white/10 focus:text-white'>Mute Notifications</DropdownMenuItem>
              <DropdownMenuItem className='focus:bg-white/10 focus:text-white'>Block User</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Decorative Orbit Icon */}
          <Orbit
            className='
            text-white/30 
            size-4 sm:size-6 
            animate-spin-slow 
            hidden sm:block
          '
          />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
