import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { Send, Smile, Sparkles } from "lucide-react";
import { useState } from "react";

const MessageInput = () => {
  const [newMessage, setNewMessage] = useState("");
  const { user } = useUser();
  const { selectedUser, sendMessage } = useChatStore();

  const handleSend = () => {
    if (!selectedUser || !user || !newMessage.trim()) return;

    sendMessage(selectedUser.clerkId, user.id, newMessage.trim());
    setNewMessage("");
  };

  return (
    <div
      className='
      p-2 sm:p-4 
      bg-black 
      border-t border-zinc-900
    '
    >
      <div
        className='
        flex items-center 
        space-x-1 sm:space-x-2 
        bg-zinc-900 
        rounded-xl sm:rounded-2xl 
        border border-zinc-800 
        p-2 sm:p-3 
        shadow-lg 
        hover:shadow-emerald-500/20 
        transition-all 
        duration-300
      '
      >
        {/* AI Assist Button */}
        <Button
          variant='ghost'
          size='icon'
          className='
            text-emerald-500 
            hover:bg-emerald-500/10 
            hover:text-emerald-400 
            rounded-full 
            transition-all 
            duration-200 
            size-8 sm:size-10
          '
        >
          <Sparkles className='size-4 sm:size-6' />
        </Button>

        {/* Emoji Button */}
        <Button
          variant='ghost'
          size='icon'
          className='
            text-zinc-400 
            hover:bg-emerald-500/10 
            hover:text-emerald-400 
            rounded-full 
            transition-all 
            duration-200 
            size-8 sm:size-10
          '
        >
          <Smile className='size-4 sm:size-6' />
        </Button>

        <Input
          placeholder='Type your message...'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className='
            bg-transparent
            border-none
            focus-visible:ring-0
            focus-visible:outline-none
            text-white
            text-sm sm:text-xl
            placeholder-zinc-500
            p-1 sm:p-2
            w-full
            flex-grow
            min-h-[40px] sm:min-h-[48px]
          '
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <Button
          size='icon'
          onClick={handleSend}
          disabled={!newMessage.trim()}
          className={`
            ${newMessage.trim() ? "bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700 shadow-lg shadow-emerald-500/30" : "bg-zinc-800 text-zinc-600 cursor-not-allowed"}
            rounded-full
            p-1 sm:p-2
            transition-all
            duration-200
            ease-in-out
            flex
            items-center
            justify-center
            size-8 sm:size-12
          `}
        >
          <Send className='size-4 sm:size-6' />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
