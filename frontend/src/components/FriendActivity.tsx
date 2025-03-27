import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { HeadphonesIcon, Music, UsersIcon, Waves, Orbit, CloudOff } from "lucide-react";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Song, { User } from "@/types";
import { useIndexColorStore } from "@/stores/useIndexColorStore";
import PlaylistSkeleton from "./skeletons/PlayListSkeleton";
import { useNavigate } from "react-router-dom";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";

const FriendActivity = () => {
  const gradientColors = ["from-blue-500/70 to-indigo-500/70", "from-purple-500/70 to-pink-500/70", "from-green-500/70 to-teal-500/70", "from-yellow-500/70 to-orange-500/70", "from-red-500/70 to-pink-500/70"];

  const { users, isLoading, fetchUsers, onlineUsers, userActivities } = useChatStore();
  const { songs, fetchSongs } = useMusicStore();
  const { setCurrentSong } = usePlayerStore();
  const { idx, setIndex, colors } = useIndexColorStore();
  const { user } = useUser();
  const navigate = useNavigate();
  const { selectedUser, setSelectedUser } = useChatStore();
  useEffect(() => {
    if (user) fetchUsers();
    setIndex();
    console.log("Songs", songs);
  }, [fetchUsers, user]);

  return (
    <div className='h-full bg-gradient-to-b from-zinc-950 to-black rounded-2xl flex flex-col overflow-hidden shadow-2xl'>
      {/* Header */}
      <div className='p-4 flex justify-between items-center border-b border-white/10 bg-zinc-900/60 backdrop-blur-xl'>
        <div className='flex items-center gap-4'>
          <UsersIcon
            className={`size-7 ${colors[idx]} 
            animate-pulse transition-all duration-300`}
          />
          <h2
            className='font-bold text-xl tracking-wider text-white 
            bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50'
          >
            V I B E - C H E C K
          </h2>
        </div>
        <Orbit className='text-white/30 size-6 animate-spin-slow hover:animate-spin' />
      </div>

      {/* Loading State */}
      {isLoading && <PlaylistSkeleton />}

      {/* Not Logged In State */}
      {!user && (
        <div className='flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6'>
          <div className='relative group'>
            <div
              className={`absolute -inset-2 bg-gradient-to-r ${gradientColors[idx]} 
              rounded-full blur-xl opacity-70 animate-pulse group-hover:opacity-100 
              transition-all duration-500`}
              aria-hidden='true'
            />
            <div
              className='relative bg-zinc-900/60 backdrop-blur-xl rounded-full p-6 
              shadow-2xl group-hover:scale-105 transition-transform duration-300'
            >
              <HeadphonesIcon
                className={`size-12 ${gradientColors[idx].split(" ")[0].replace("from-", "text-")} 
                group-hover:rotate-6 transition-transform`}
              />
            </div>
          </div>

          <div className='space-y-4 max-w-[300px]'>
            <h3
              className='text-2xl font-bold text-white 
              bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50'
            >
              Tune Into Your Friends
            </h3>
            <p
              className='text-white/70 
              animate-gradient-x bg-gradient-to-r from-white/70 via-white/50 to-white/30 
              bg-clip-text text-transparent'
            >
              Login to explore the music your friends are vibing to right now! 🎶
            </p>
          </div>
        </div>
      )}

      {/* User List */}
      <ScrollArea.Root className='flex-1 overflow-hidden'>
        <ScrollArea.Viewport className='w-full h-full'>
          <div className='p-4 space-y-4'>
            {users.map((user: User, index) => {
              const activity = userActivities.get(user.clerkId);
              const isPlaying = activity && activity !== "Idle";
              let song: Song | null | undefined = null;
              if (activity != "Idle") {
                song = songs.find((song) => song.title === activity?.replace("Playing", "").split(" by ")[0]);
              }
              return (
                <div
                  key={user.clerkId}
                  className='cursor-pointer bg-zinc-900/40 hover:bg-white/10 
                  p-4 rounded-xl transition-all duration-300 group 
                  hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                  onClick={() => {
                    if (!isPlaying) {
                      setSelectedUser(user);
                      navigate("/chat");
                    } else {
                      console.log("Songs: ", songs);
                      console.log("To change the Song", song);
                      setSelectedUser(null);
                      setCurrentSong(song as Song);
                    }
                  }}
                >
                  <div className='flex items-center gap-4'>
                    {/* User Avatar */}
                    <div className='relative'>
                      <Avatar
                        className='size-14 border-2 border-white/10 
                        group-hover:border-white/30 transition-all'
                      >
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
                        ${onlineUsers.has(user.clerkId) ? "bg-green-500 animate-pulse" : "bg-zinc-700"} 
                        border-2 border-zinc-900 transition-all`}
                      />
                    </div>

                    {/* User Info */}
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-3'>
                        <span
                          className='font-bold text-lg text-white 
                          group-hover:text-blue-300 transition-colors'
                        >
                          {user.fullName}
                        </span>
                        {isPlaying && (
                          <Music
                            className='size-5 text-green-400 
                            animate-[bounce_1s_infinite] hover:animate-spin'
                          />
                        )}
                      </div>

                      {onlineUsers.has(user.clerkId) ? (
                        isPlaying ? (
                          <div className='flex   flex-col'>
                            <span
                              className='text-sm font-semibold text-white/70 
                              bg-clip-text text-transparent bg-gradient-to-r 
                              from-white/80 to-white/50'
                            >
                              {activity.replace("Playing", "").split(" by ")[0]}
                            </span>
                            <span
                              className='text-sm text-white/50 
                              italic tracking-tight'
                            >
                              By {activity.replace("Playing", "").split(" by ")[1]}
                            </span>
                          </div>
                        ) : (
                          <div
                            className='mt-1 text-sm text-white/50 
                            flex items-center gap-2 animate-pulse'
                          >
                            <Waves className='size-4 text-white/30' />
                            <span>Idle</span>
                          </div>
                        )
                      ) : (
                        <div
                          className='mt-1 text-sm text-white/50 
                          flex items-center gap-2 opacity-60'
                        >
                          <CloudOff className='size-4 text-white/30' />
                          <span>Offline</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          orientation='vertical'
          className='flex select-none touch-none p-0.5 
          bg-black/10 transition-colors duration-[160ms] 
          ease-out hover:bg-black/20 data-[orientation=vertical]:w-2.5'
        >
          <ScrollArea.Thumb
            className="flex-1 bg-zinc-700/50 rounded-[10px] relative 
            before:content-[''] before:absolute before:top-1/2 before:left-1/2 
            before:-translate-x-1/2 before:-translate-y-1/2 
            before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
          />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
};

export default FriendActivity;
