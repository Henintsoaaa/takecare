"use client";
import axios from "axios";
import { useEffect, useState, Suspense } from "react";
import {
  Bell,
  MessageSquare,
  ThumbsUp,
  FilePlus,
  MessageCircle,
} from "lucide-react"; // Import Lucid Icons

interface Actor {
  id: number;
  name: string;
}

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
    actor_id: 3,
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
    actor_id: 4,
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

const fetchActors = async (actorIds: number[]): Promise<Actor[]> => {
  // Simulate fetching actor names from an API
  return new Promise<Actor[]>((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 2, name: "acteur2" },
        { id: 3, name: "acteur3" },
        { id: 4, name: "acteur4" },
      ]);
    }, 1000);
  });
};

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

const NotificationItem = ({
  notification,
  actorName,
}: {
  notification: Notification;
  actorName: string;
}) => {
  const description = {
    new_post: `${actorName} a créé un nouveau post.`,
    comment: `${actorName} a commenté votre post.`,
    reaction: `${actorName} a réagi à votre post.`,
    comment_reaction: `${actorName} a réagi à votre commentaire.`,
  };

  const title = {
    new_post: "Nouveau Post",
    comment: "Commentaire",
    reaction: "Réaction",
    comment_reaction: "Réaction au Commentaire",
  };

  return (
    <div
      className={`flex items-center p-4 border-b ${
        notification.is_read ? "bg-gray-200" : "bg-white"
      }`}
    >
      <NotificationIcon type={notification.type} />
      <div className="ml-3">
        <p className="font-semibold">{title[notification.type]}</p>
        <p className="text-sm text-gray-600">
          {description[notification.type]}
        </p>
        <p className="text-xs text-gray-400">
          {notification.created_at.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [actors, setActors] = useState<{ [key: number]: string }>({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadNotifications = async () => {
      setNotifications(_notifications);
      const actorIds = _notifications.map((n) => n.actor_id);
      const fetchedActors = await fetchActors(actorIds);
      const actorMap = Object.fromEntries(
        fetchedActors.map((actor) => [actor.id, actor.name])
      );
      setActors(actorMap);
      setLoading(false);
    };

    loadNotifications();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          className="text-indigo-600 hover:text-indigo-700  transition-colors duration-200 flex gap-2 justify-center items-center"
        >
          <Bell size={24} className="md:w-[30px] md:h-[30px]" />
          <span className="ml-2">Notifications</span>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 w-64 mt-2 bg-white shadow-lg rounded-md">
          <div className="max-h-60 overflow-y-auto">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                actorName={actors[notification.actor_id] || "Acteur Inconnu"}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Notification = () => {
  return (
    <div className="p-4">
      <Suspense fallback={<div>Loading notifications...</div>}>
        <NotificationsDropdown />
      </Suspense>
    </div>
  );
};

export default Notification;
