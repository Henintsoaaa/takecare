"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Bell,
  MessageSquare,
  ThumbsUp,
  FilePlus,
  MessageCircle,
} from "lucide-react"; // Import Lucid Icons

interface Notification {
  id: number;
  user_id: number;
  actor_id: number;
  user_name: string;
  type: "new_post" | "comment" | "reaction" | "comment_reaction";
  is_read: boolean;
  created_at: Date;
  post_id: number;
  signalment_id: number;
  post_owner: number;
}

// Sample notifications data
const _notifications: Notification[] = [
  {
    id: 1,
    user_id: 1,
    actor_id: 2,
    user_name: "user1",
    type: "new_post",
    is_read: false,
    created_at: new Date(),
    post_id: 1,
    signalment_id: 1,
    post_owner: 1,
  },
  {
    id: 2,
    user_id: 1,
    actor_id: 2,
    user_name: "user1",
    type: "comment",
    is_read: false,
    created_at: new Date(),
    post_id: 1,
    signalment_id: 1,
    post_owner: 1,
  },
  {
    id: 3,
    user_id: 1,
    actor_id: 2,
    user_name: "user1",
    type: "reaction",
    is_read: false,
    created_at: new Date(),
    post_id: 1,
    signalment_id: 1,
    post_owner: 1,
  },
  {
    id: 4,
    user_id: 1,
    actor_id: 2,
    user_name: "user1",
    type: "comment_reaction",
    is_read: false,
    created_at: new Date(),
    post_id: 1,
    signalment_id: 1,
    post_owner: 1,
  },
];

const NotificationIcon = ({ type }: { type: Notification["type"] }) => {
  switch (type) {
    case "new_post":
      return <FilePlus className="text-blue-500" />;
    case "comment":
      return <MessageSquare className="text-green-500" />;
    case "reaction":
      return <ThumbsUp className="text-yellow-500" />;
    case "comment_reaction":
      return <MessageCircle className="text-purple-500" />;
    default:
      return null;
  }
};

const NotificationItem = ({ notification }: { notification: Notification }) => {
  return (
    <div
      className={`flex items-center p-4 border-b ${
        notification.is_read ? "bg-gray-200" : "bg-white"
      }`}
    >
      <NotificationIcon type={notification.type} />
      <div className="ml-3">
        <p className="font-semibold">{notification.user_name}</p>
        <p className="text-sm text-gray-600">
          {notification.type.replace("_", " ")}
        </p>
        <p className="text-xs text-gray-400">
          {notification.created_at.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

const NotificationsList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setNotifications(_notifications);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-4">
        <h2 className="font-bold text-xl">Notifications</h2>
      </div>
      <div>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div className="p-4">
      <NotificationsList />
    </div>
  );
};

export default Page;
