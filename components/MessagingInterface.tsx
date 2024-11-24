"use client";

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Card } from "@/components/ui/carde";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Send, User } from "lucide-react";

interface Message {
  id: number;
  sender_id: number;
  content: string;
  sent_at: string;
}

export function MessagingInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const socket = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  let currentUserId: number;
  let receiverId: number;
  receiverId = 1;
  currentUserId = 3;
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
  }, [currentUserId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    setLoading(true);

    // Créer un message temporaire avec un ID temporaire
    const tempMessage: Message = {
      id: Date.now(), // ID temporaire basé sur le timestamp
      sender_id: currentUserId,
      content: newMessage,
      sent_at: new Date().toISOString(),
    };

    // Ajouter immédiatement le message à l'interface
    setMessages((prev) => [...prev, tempMessage]);

    // Envoyer le message au serveur
    socket.current.emit("private-message", {
      senderId: currentUserId,
      receiverId,
      content: newMessage,
    });

    setNewMessage("");
    setLoading(false);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-4">
          <Avatar>
            <User className="h-6 w-6" />
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">
              Chat with User {receiverId}
            </h2>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[500px] p-4" ref={scrollRef}>
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
                className={`max-w-[70%] px-4 py-2 rounded-lg ${
                  message.sender_id === currentUserId
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-200"
                }`}
              >
                <p>{message.content}</p>
                <span className="text-xs opacity-70">
                  {new Date(message.sent_at).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1"
          />
          <Button onClick={sendMessage} disabled={loading}>
            {loading ? "Sending..." : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </Card>
  );
}
