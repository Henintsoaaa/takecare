"use client";

import { useState } from 'react';
import { Send, SmilePlus, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { User, Chat } from '@/types/chat';
import MessageBubble from './MessageBubble';

interface ChatWindowProps {
  chat: Chat;
  currentUser: User;
  otherUser: User;
  onSendMessage: (text: string) => void;
  onBack: () => void;
}

export default function ChatWindow({ chat, currentUser, otherUser, onSendMessage, onBack }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-4 border-b dark:border-gray-800 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          onClick={onBack}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Avatar className="w-10 h-10">
          <img
            src={otherUser.avatar}
            alt={otherUser.name}
            className="w-full h-full object-cover rounded-full"
          />
        </Avatar>
        <div>
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">{otherUser.name}</h2>
          <p className="text-sm text-gray-500">
            {otherUser.status === 'online' ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>

      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4 max-w-3xl mx-auto">
          {chat.messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isCurrentUser={message.senderId === currentUser.id}
              user={message.senderId === currentUser.id ? currentUser : otherUser}
            />
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t dark:border-gray-800">
        <div className="flex gap-2 max-w-3xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 hidden sm:flex"
          >
            <SmilePlus className="h-5 w-5" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button onClick={handleSend} className="bg-blue-500 hover:bg-blue-600">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}