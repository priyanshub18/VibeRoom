import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";
import { MoreVertical, PhoneCall, Video, UsersIcon, Orbit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIndexColorStore } from "@/stores/useIndexColorStore";

const ChatHeader = () => {
  const { selectedUser, onlineUsers } = useChatStore();

  //   const { colors, idx } = useIndexColorStore();
  // Predefined gradient colors for fallback
  const gradientColors = ["from-blue-500/70 to-indigo-500/70", "from-purple-500/70 to-pink-500/70", "from-green-500/70 to-teal-500/70", "from-yellow-500/70 to-orange-500/70", "from-red-500/70 to-pink-500/70"];

  if (!selectedUser) return null;

  return (
    <div className='bg-zinc-900/60 backdrop-blur-xl border rounded-3xl border-white/40 p-4 group'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          {/* Avatar with Gradient Fallback and Status */}
          <div className='relative'>
            <Avatar className='size-14 border-2 border-white/10 hover:border-white/30'>
              <AvatarImage src={selectedUser.imageUrl} alt={`${selectedUser.fullName}'s avatar`} className='group-hover:scale-110 transition-transform' />
              <AvatarFallback
                className={`
                  bg-gradient-to-br ${gradientColors[Math.floor(Math.random() * gradientColors.length)]}
                  text-white size-14 flex items-center justify-center
                `}
              >
                {selectedUser.fullName
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            {/* Online/Offline Indicator */}
            <div
              className={`
                absolute bottom-0 right-0 w-4 h-4 rounded-full 
                ${onlineUsers.has(selectedUser.clerkId) ? "bg-green-500" : "bg-zinc-700"} 
                border-2 border-zinc-900 animate-pulse
              `}
            />
          </div>

          {/* User Info */}
          <div>
            <h2 className={`font-bold text-lg text-white group-hover:text-emerald-500 transition-colors`}>{selectedUser.fullName}</h2>
            <p
              className={`
                text-sm 
                ${onlineUsers.has(selectedUser.clerkId) ? "text-green-400" : "text-white/50"}
              `}
            >
              {onlineUsers.has(selectedUser.clerkId) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex items-center gap-3'>
          {/* <Button variant='ghost' size='icon' className='text-white/50 hover:text-white hover:bg-white/10 rounded-full'>
            <PhoneCall className='size-5' />
          </Button>
          <Button variant='ghost' size='icon' className='text-white/50 hover:text-white hover:bg-white/10 rounded-full'>
            <Video className='size-5' />
          </Button> */}
          <Button variant='ghost' size='icon' className='text-white/50 hover:text-white hover:bg-white/10 rounded-full'>
            <MoreVertical className='size-5' />
          </Button>

          {/* Decorative Orbit Icon */}
          <Orbit className='text-white/30 size-6 animate-spin-slow' />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
