import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import ChatHeader from "@/components/ChatPage/ChatHeader";
import MessageInput from "@/components/ChatPage/MessageInput";
import Navbar from "@/components/TopBar";
import UsersList from "@/components/ChatPage/UserList";

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

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.clerkId);
  }, [selectedUser, fetchMessages]);

  console.log({ messages });

  return (
    <main className='h-full rounded-lg  overflow-hidden pr-3'>
      <Navbar />

      <div className='grid lg:grid-cols-[350px_1fr] gap-2 grid-cols-[80px_1fr] h-[calc(100vh)]'>
        <UsersList />

        {/* chat message */}
        <div className='flex flex-col h-full'>
          {selectedUser ? (
            <>
              <ChatHeader />

              {/* Messages */}
              <ScrollArea className='h-[calc(100vh-340px)]'>
                <div className='p-4 space-y-4'>
                  {/* {messages.map((message) => (
                    <div key={message._id} className={`flex items-start gap-3 ${message.senderId === user?.id ? "flex-row-reverse" : ""}`}>
                      <Avatar className='size-8'>
                        <AvatarImage src={message.senderId === user?.id ? user.imageUrl : selectedUser.imageUrl} />
                      </Avatar>

                      <div
                        className={`rounded-lg p-3 max-w-[70%]
													${message.senderId === user?.id ? "bg-green-500" : "bg-zinc-800"}
												`}
                      >
                        <p className='text-sm'>{message.content}</p>
                        <span className='text-xs text-zinc-300 mt-1 block'>{formatTime(message.createdAt)}</span>
                      </div>
                    </div>
                  ))} */}
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
  <div className='flex flex-col items-center justify-center h-full space-y-6'>
    <img src='/logo.svg' alt='Spotify' className='size-16 animate-bounce' />
    <div className='text-center'>
      <h3 className='text-zinc-300 text-lg font-medium mb-1'>No conversation selected</h3>
      <p className='text-zinc-500 text-sm'>Choose a friend to start chatting</p>
    </div>
  </div>
);
