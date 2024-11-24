"use client";

import { data } from "@tensorflow/tfjs";
import axios, { all } from "axios";
import Link from "next/link";
import { use, useEffect, useState } from "react";

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

interface UserData {
  id: number;
  username: string;
  email: string;
  created_at: Date;
  role: string;
}

export default function MessagesPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [profilePhotos, setProfilePhotos] = useState<{ [key: number]: string }>(
    {}
  );

  let user_id: number = 0; // Assuming the user is logged in

  // Retrieve user ID from cookies
  if (document.cookie) {
    user_id = parseInt(document.cookie.split(",")[1].split("=")[1]);
  }

  const getProfilePhoto = async (user_id: number) => {
    const endpoint = `${process.env.NEXT_PUBLIC_IP_KEY}/users/${user_id}`;
    try {
      const response = await axios.get(endpoint);
      if (response.data.status === "success") {
        return response.data.data.profilePhoto;
      }
    } catch (error) {
      console.error("Error fetching profile photo:", error);
    }
  };

  useEffect(() => {
    const endpoint = `${process.env.NEXT_PUBLIC_IP_KEY}/message?user_id=${user_id}`;

    const fetchMessages = async () => {
      try {
        const response = await axios.get<AxiosResponse>(endpoint);
        if (response.data.status === "success") {
          // Flatten the array of users
          // console.log(response.data);

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

  useEffect(() => {
    const fetchUsers = async () => {
      const endpoint = `${process.env.NEXT_PUBLIC_IP_KEY}/users`;
      try {
        const response = await axios.get(endpoint);
        if (response.data.status === "success") {
          const users: UserData[] = response.data.data;
          setAllUsers(users);

          // Fetch profile photos for all users
          const photos = await Promise.all(
            users.map(async (user) => {
              const photo = await getProfilePhoto(user.id);
              return { id: user.id, photo };
            })
          );

          const photoMap = photos.reduce((acc, { id, photo }) => {
            acc[id] = photo;
            return acc;
          }, {} as { [key: number]: string });

          setProfilePhotos(photoMap);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Messages</h1>
      {loading ? (
        <p>Loading messages...</p>
      ) : users.length <= 1 ? (
        <>
          <p className="m-6 text-gray-900 text-xl">You have no messages yet.</p>
          <h1 className="m-2 text-lg text-gray-600">
            You can start a conversation with any of the following users:
          </h1>
          <div className="space-y-4">
            {allUsers.map((user) => (
              <Link key={user.id} href={`/messages/${user.id}`}>
                <div className="flex items-center p-4 border rounded-lg shadow hover:bg-gray-100 transition duration-150 ease-in-out">
                  <img
                    src={profilePhotos[user.id] || "/default-avatar.svg"} // Fallback for profile photo
                    alt={user.username}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold">{user.username}</h2>
                    <p className="text-gray-600 ">{user.email}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
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
