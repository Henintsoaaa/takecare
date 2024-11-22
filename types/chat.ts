export interface User {
  id: number;
  name: string;
  avatar: string;
  status?: 'online' | 'offline';
}

export interface Message {
  id: number;
  text: string;
  senderId: number;
  timestamp: Date;
}

export interface Chat {
  id: number;
  userId: number;
  messages: Message[];
  unreadCount: number;
}