"use client";

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/carde";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Send, User } from "lucide-react";
import axios from "axios";

interface Message {
  id: number;
  sender_id: number;
  content: string;
  sent_at: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
  role: string;
}

interface UsersResponse {
  status: string;
  data: User[];
}

export function MessagingInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const socket = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentUser, setCurrentUser] = useState<string>("");

  let currentUserId: number;
  let receiverId: number = 0;
  currentUserId = parseInt(usePathname().split("/")[2]);

  if (document.cookie) {
    receiverId = parseInt(document.cookie.split(",")[1].split("=")[1]);
  }

  useEffect(() => {
    const initSocket = async () => {
      socket.current = io("http://localhost:3001");
      socket.current.emit("join-user", currentUserId);

      socket.current.on("new-message", (message: Message) => {
        setMessages((prev) => [...prev, message]);
      });
    };

    initSocket();

    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/messages?userId=${currentUserId}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const getUserName = async () => {
      try {
        const response = await axios.get<UsersResponse>(
          `${process.env.NEXT_PUBLIC_IP_KEY}/user`
        );
        if (response.data.status === "success") {
          // Fix: Correctly return the user object
          const user = response.data.data.find(
            (user) => user.id === currentUserId
          );
          console.log(user);

          if (user) {
            setCurrentUser(user.username);
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUserName();
  }, [currentUserId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    setLoading(true);

    const tempMessage: Message = {
      id: Date.now(),
      sender_id: currentUserId,
      content: newMessage,
      sent_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempMessage]);

    socket.current.emit("private-message", {
      senderId: currentUserId,
      receiverId,
      content: newMessage,
    });

    setNewMessage("");
    setLoading(false);
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg rounded-lg">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <Avatar>
            <User className="h-8 w-8 text-gray-600" />
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {currentUser || "Loading..."}
            </h2>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[500px] p-4 overflow-y-auto" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender_id === currentUserId
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-lg shadow ${
                  message.sender_id === currentUserId
                    ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p>{message.content}</p>
                <span className="text-xs text-gray-400">
                  {new Date(message.sent_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={sendMessage}
            disabled={loading}
            className="transition duration-200 ease-in-out transform hover:scale-105"
          >
            {loading ? "Sending..." : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default MessagingInterface;
