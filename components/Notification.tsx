"use client";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import {
  Bell,
  MessageSquare,
  ThumbsUp,
  FilePlus,
  MessageCircle,
} from "lucide-react"; // Import Lucid Icons
import { redirect } from "next/navigation";

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

const Notification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [actors, setActors] = useState<{ [key: number]: string }>({});
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Create a ref for the dropdown

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        // Replace with your API endpoint to fetch notifications for the logged-in user
        let user_id: string | undefined;

        if (!document.cookie) {
          // Redirect to login page if user is not logged in
          redirect("/login");
        } else {
          user_id = document.cookie.split(",")[1].split("=")[1];
        }
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_IP_KEY}/notifications?user_id=${user_id}`
        );
        setNotifications(response.data); // Assuming response.data is an array of notifications

        // Fetch actor names
        const actorIds = response.data.map((n: Notification) => n.actor_id);
        const fetchedActors = await fetchActors(actorIds);
        const actorMap = Object.fromEntries(
          fetchedActors.map((actor) => [actor.id, actor.name])
        );
        setActors(actorMap);
      } catch (error) {
        console.error("Error loading notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  const fetchActors = async (actorIds: number[]): Promise<Actor[]> => {
    // Simulate fetching actor names from an API
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_IP_KEY}/actors`,
      {
        params: { ids: actorIds },
      }
    );
    return response.data; // Assuming the response contains an array of actors
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-indigo-600 hover:text-indigo-700 transition-colors duration-200 flex gap-2 justify-center items-center"
      >
        <Bell size={24} className="md:w-[30px] md:h-[30px]" />
        <span className="hidden md:block">Notifications</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 w-80 md:w-96 mt-2 bg-white shadow-lg rounded-xl">
          <div className="max-h-96 overflow-y-auto rounded-xl">
            {loading ? (
              <p className="text-center p-4">Loading notifications...</p>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  actorName={actors[notification.actor_id] || "Acteur Inconnu"}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
