import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import  { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import ChatHeader from "@/components/ChatPage/ChatHeader";
import MessageInput from "@/components/ChatPage/MessageInput";
import Navbar from "@/components/TopBar";
import UsersList from "@/components/ChatPage/UserList";
import { ChevronLeft } from "lucide-react";

const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const ChatPage = () => {
  const { user } = useUser();
  const { messages, selectedUser, fetchUsers, fetchMessages } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMobileUserListOpen, setIsMobileUserListOpen] = useState(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, []);

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.clerkId);
  }, [selectedUser]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const toggleMobileUserList = () => {
    setIsMobileUserListOpen(!isMobileUserListOpen);
  };

  return (
    <main className='h-full rounded-lg overflow-hidden pr-3 relative'>
      <Navbar />

      <div className='grid lg:grid-cols-[350px_1fr] grid-cols-1 gap-2 h-[calc(100vh-64px)]'>
        {/* Mobile Toggle for User List */}
        <div
          className='
          lg:hidden 
          fixed 
          top-20 
          left-23 
          right-0 
          z-40 
          px-4 
          transition-all 
          duration-300
        '
        >
          <button
            onClick={toggleMobileUserList}
            className='
              flex items-center 
              justify-center 
              w-full 
              p-2 
              bg-zinc-800 
              text-white 
              rounded-lg 
              shadow-lg
            '
          >
            <ChevronLeft
              className={`
                mr-2 
                transition-transform 
                ${isMobileUserListOpen ? "rotate-180" : ""}
              `}
            />
            {isMobileUserListOpen ? "Hide Users" : "Show Users"}
          </button>
        </div>

        {/* User List - Responsive */}
        <div
          className={`
            lg:block 
            fixed lg:static 
            top-28 
            left-23
            right-0 
            z-30 
            px-4 
            transition-all 
            duration-300 
            ${isMobileUserListOpen ? "translate-y-0" : "hidden"}
          `}
        >
          <UsersList />
        </div>

        {/* Chat Area */}
        <div
          className='
          flex 
          flex-col 
          h-full 
          mt-16 
          lg:mt-0
        '
        >
          {selectedUser ? (
            <>
              <ChatHeader />

              {/* Messages */}
              <ScrollArea className='h-[calc(100vh-350px)] md:h-[calc(100vh-300px)]'>
                <div className='p-4 space-y-4'>
                  {Array.isArray(messages) && messages.length > 0 ? (
                    <>
                      {messages.map((message, index) => (
                        <motion.div
                          key={message._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.1, delay: 0.01 }}
                          className={`
                            flex items-end gap-3 
                            ${message.senderId === user?.id ? "flex-row-reverse" : ""}
                            max-w-full
                          `}
                        >
                          {/* Avatar with bounce effect */}
                          <motion.div whileHover={{ scale: 1.1 }} className='shrink-0'>
                            <Avatar className='size-8 md:size-10 shadow-md'>
                              <AvatarImage src={message.senderId === user?.id ? user.imageUrl : selectedUser.imageUrl} alt='User avatar' className='object-cover' />
                            </Avatar>
                          </motion.div>

                          {/* Message bubble */}
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 100, delay: 0.005 }}
                            className={`
                              relative rounded-2xl 
                              p-2 md:p-3 
                              max-w-[70%] sm:max-w-[80%]
                              text-white shadow-lg 
                              ${message.senderId === user?.id ? "bg-emerald-500" : "bg-zinc-800"}
                            `}
                          >
                            <p className='text-xs md:text-sm'>{message.content}</p>
                            <span className='text-[10px] md:text-xs text-zinc-300 mt-1 block'>{formatTime(message.createdAt)}</span>
                          </motion.div>
                        </motion.div>
                      ))}

                      {/* Invisible div to scroll to */}
                      <div ref={messagesEndRef} />
                    </>
                  ) : (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-zinc-400 text-sm text-center mt-5'>
                      No messages yet. Start a conversation!
                    </motion.p>
                  )}
                </div>
              </ScrollArea>

              <MessageInput />
            </>
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </main>
  );
};

export default ChatPage;

const NoConversationPlaceholder = () => (
  <div className='flex flex-col items-center justify-center h-full w-full bg-zinc-900/50 rounded-xl p-4 md:p-8'>
    <div className='bg-emerald-500/10 p-4 md:p-6 rounded-full mb-4 md:mb-6 animate-pulse'>
      <img src='/logo.svg' alt='Spotify' className='size-10 md:size-16 text-emerald-500 opacity-80 hover:opacity-100 transition-all duration-300 ease-in-out transform hover:scale-110' />
    </div>
    <div className='text-center space-y-2 md:space-y-3'>
      <h3 className='text-emerald-400 text-xl md:text-2xl font-bold tracking-tight mb-2 animate-fade-in'>No Conversation Selected</h3>
      <p className='text-zinc-400 max-w-xs mx-auto text-sm md:text-base leading-relaxed'>Select a friend from your chat list to begin a conversation and start connecting</p>
    </div>
    <div className='mt-4 md:mt-6 opacity-60 hover:opacity-100 transition-all'>
      <svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' className='text-emerald-500 animate-bounce'>
        <path d='M17 13.5L12 18.5L7 13.5' />
        <path d='M12 18.5V5.5' />
      </svg>
    </div>
  </div>
);
