"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
// import ListOfChat from "../../components/chatWithFriend/listOfChat";
import { Card } from "./ui/card"; // Import the Card component

// Define the type for the props
interface PrivateChatProps {
  receiverId: string; // Assuming receiverId is a string; adjust if necessary
}

const socket = io("http://localhost:3003");

const PrivateChat: React.FC<PrivateChatProps> = ({ receiverId }) => {
  const [messages, setMessages] = useState<
    { senderId: string; content: string }[]
  >([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null); // User ID can be string or null

  // Prototype user ID for testing
  const prototypeUserId = "12345"; // Example user ID

  // Function to fetch the user ID from 'userId.txt' using Axios
  // const fetchUser Id = async () => {
  //     try {
  //         const response = await axios.get('http://localhost:3003/Devoi_socila_media/src/backend/controllers/users/userId.txt');
  //         setUser Id(response.data.trim()); // Set the user ID from the response
  //     } catch (error) {
  //         console.error("Erreur lors de la récupération de l'ID utilisateur :", error);
  //     }
  // };

  // Load the user ID once on mount
  useEffect(() => {
    // Uncomment the line below to use the Axios logic when needed
    // fetchUser Id();

    // Set prototype user ID for testing
    setUserId(prototypeUserId);
  }, []);

  useEffect(() => {
    if (userId) {
      socket.emit("registerUser ", userId); // Use the actual user ID

      // Receiving private messages
      socket.on(
        "receivePrivateMessage",
        (message: { senderId: string; content: string }) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      );

      return () => {
        socket.off("receivePrivateMessage");
      };
    }
  }, [userId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("sendPrivateMessage", {
        senderId: userId, // Use the actual user ID
        receiverId,
        content: newMessage,
      });
      setNewMessage("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {" "}
      {/* Uniformiser la largeur */}
      {/* <ListOfChat messages={messages} /> */}
    </div>
  );
};

export default PrivateChat;
