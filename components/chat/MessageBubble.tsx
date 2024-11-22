"use client";

import { Message, User } from '@/types/chat';
import { Avatar } from '@/components/ui/avatar';
import { format } from 'date-fns';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  user: User;
}

export default function MessageBubble({ message, isCurrentUser, user }: MessageBubbleProps) {
  return (
    <div
      className={`flex items-start gap-3 ${
        isCurrentUser ? "flex-row-reverse" : ""
      }`}
    >
      <Avatar className="w-8 h-8">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full object-cover rounded-full"
        />
      </Avatar>
      <div
        className={`flex flex-col ${
          isCurrentUser ? "items-end" : "items-start"
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {user.name}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {format(message.timestamp, 'h:mm a')}
          </span>
        </div>
        <div
          className={`rounded-lg p-3 max-w-md ${
            isCurrentUser
              ? "bg-blue-500 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          }`}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
}