"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface AxiosResponse {
  status: string;
  data: Array<Array<User>>;
}

interface User {
  user_id: number;
  username: string;
  profilePhoto: string;
  last_message: string;
}

export default function MessagesPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  let user_id: number = 0; // Assuming the user is logged in

  // Retrieve user ID from cookies
  if (document.cookie) {
    user_id = parseInt(document.cookie.split(",")[1].split("=")[1]);
  }

  useEffect(() => {
    const endpoint = `${process.env.NEXT_PUBLIC_IP_KEY}/message?user_id=${user_id}`;

    const fetchMessages = async () => {
      try {
        const response = await axios.get<AxiosResponse>(endpoint);
        if (response.data.status === "success") {
          // Flatten the array of users
          console.log(response.data);

          setUsers(response.data.data.flat());
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [user_id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Messages</h1>
      {loading ? (
        <p>Loading messages...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">You have no messages yet.</p>
      ) : (
        <div className="space-y-4">
          {users.map(
            (user) =>
              user.user_id !== null && (
                <Link key={user.user_id} href={`/messages/${user.user_id}`}>
                  <div className="flex items-center p-4 border rounded-lg shadow hover:bg-gray-100 transition duration-150 ease-in-out">
                    <img
                      src={user.profilePhoto}
                      alt={user.username}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div className="flex-1">
                      <h2 className="font-semibold">{user.username}</h2>
                      <p className="text-gray-600">{user.last_message}</p>
                    </div>
                  </div>
                </Link>
              )
          )}
        </div>
      )}
    </div>
  );
}
