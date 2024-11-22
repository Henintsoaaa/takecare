import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

// Define an interface for the friend object
interface Friend {
  id: number;
  username: string;
}

const Contact = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [photoProfile, setPhotoProfile] = useState<string>("");

  // Function to fetch all friends and the profile photo
  const fetchAllFriends = async () => {
    try {
      // Fetch friends data
      const response = await axios.get<Friend[]>(
        `${process.env.NEXT_PUBLIC_IP_KEY}/user/allfriend`
      );
      setFriends(response.data);

      // Fetch profile photo
      const profileResponse = await axios.get<{ imageUrl: string }>(
        `${process.env.NEXT_PUBLIC_IP_KEY}/profile`
      );
      setPhotoProfile(profileResponse.data.imageUrl); // Assuming the response has an imageUrl property
    } catch (err) {
      console.error("Error fetching friends:", err);
      setError("Failed to fetch friends.");
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Use effect to fetch friends data on component mount
  useEffect(() => {
    fetchAllFriends();
  }, []);

  // Render loading, error, or friends list
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* Render profile photo */}
      {photoProfile && (
        <div className="flex items-center mb-4">
          <Image
            width={30}
            height={30}
            src={photoProfile}
            alt="Profile Photo"
            className="rounded-full mr-2"
          />
        </div>
      )}

      {/* Render friends list */}
      {friends.map((friend) => (
        <div key={friend.id} className="flex items-center mb-4">
          <h1 className="text-lg">{friend.username}</h1>
        </div>
      ))}
    </div>
  );
};

export default Contact;
