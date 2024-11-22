"use client";

import { User, Chat } from '@/types/chat';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

interface ChatListProps {
  users: User[];
  chats: Chat[];
  selectedChat: number | null;
  onChatSelect: (chatId: number) => void;
}

export default function ChatList({ users, chats, selectedChat, onChatSelect }: ChatListProps) {
  return (
    <div className="h-full border-r dark:border-gray-800">
      <div className="p-4 border-b dark:border-gray-800">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Messages</h2>
      </div>
      <ScrollArea className="h-[calc(80vh-4rem)]">
        <div className="space-y-2 p-2">
          {chats.map(chat => {
            const user = users.find(u => u.id === chat.userId)!;
            const lastMessage = chat.messages[chat.messages.length - 1];
            
            return (
              <button
                key={chat.id}
                onClick={() => onChatSelect(chat.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  selectedChat === chat.id
                    ? 'bg-gray-100 dark:bg-gray-800'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </Avatar>
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 ${
                      user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {user.name}
                    </span>
                    <span className="text-xs text-gray-500 ml-2 shrink-0">
                      {formatDistanceToNow(lastMessage.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 truncate">
                      {lastMessage.text}
                    </p>
                    {chat.unreadCount > 0 && (
                      <span className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}