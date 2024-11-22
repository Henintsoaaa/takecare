"use client";

import { useState } from 'react';
import ChatList from './chat/ChatList';
import ChatWindow from './chat/ChatWindow';
import { User, Chat, Message } from '@/types/chat';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';

const initialUsers: User[] = [
  {
    id: 1,
    name: "Alice Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    status: "online"
  },
  {
    id: 2,
    name: "Marcus Kim",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    status: "offline"
  },
  {
    id: 3,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    status: "online"
  }
];

const initialChats: Chat[] = [
  {
    id: 1,
    userId: 1,
    messages: [
      {
        id: 1,
        text: "Hey! How's the new project going?",
        senderId: 1,
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: 2,
        text: "It's going great! Making good progress.",
        senderId: 0,
        timestamp: new Date(Date.now() - 3500000)
      }
    ],
    unreadCount: 0
  },
  {
    id: 2,
    userId: 2,
    messages: [
      {
        id: 1,
        text: "Did you review the latest PR?",
        senderId: 2,
        timestamp: new Date(Date.now() - 1800000)
      }
    ],
    unreadCount: 1
  }
];

export default function MessageSystem() {
  const [users] = useState<User[]>(initialUsers);
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [showChatList, setShowChatList] = useState(true);
  const currentUser = { id: 0, name: "You", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" };

  const handleSendMessage = (text: string) => {
    if (!selectedChat) return;

    const newMessage: Message = {
      id: Date.now(),
      text,
      senderId: currentUser.id,
      timestamp: new Date()
    };

    setChats(chats.map(chat => 
      chat.id === selectedChat
        ? { ...chat, messages: [...chat.messages, newMessage] }
        : chat
    ));
  };

  const handleChatSelect = (chatId: number) => {
    setSelectedChat(chatId);
    setShowChatList(false);
    setChats(chats.map(chat => 
      chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
    ));
  };

  const toggleChatList = () => {
    setShowChatList(!showChatList);
  };

  return (
    <div className="relative flex h-[80vh] bg-white dark:bg-gray-900 shadow-xl rounded-xl overflow-hidden">
      <div className={`
        absolute top-0 left-0 h-full z-30 bg-white dark:bg-gray-900
        md:relative md:translate-x-0 transition-transform duration-300
        ${showChatList ? 'translate-x-0' : '-translate-x-full'}
        ${selectedChat ? 'w-full md:w-80' : 'w-full'}
      `}>
        <ChatList
          users={users}
          chats={chats}
          selectedChat={selectedChat}
          onChatSelect={handleChatSelect}
        />
      </div>

      {selectedChat && (
        <div className="flex-1 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-4 md:hidden z-20"
            onClick={toggleChatList}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <ChatWindow
            chat={chats.find(c => c.id === selectedChat)!}
            currentUser={currentUser}
            otherUser={users.find(u => u.id === chats.find(c => c.id === selectedChat)?.userId)!}
            onSendMessage={handleSendMessage}
            onBack={() => setShowChatList(true)}
          />
        </div>
      )}
    </div>
  );
}