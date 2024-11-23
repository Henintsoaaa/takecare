"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "./ui/tabs";
import { Calendar, Heart, Book, FilePenLine } from "lucide-react"; // Assuming you're using lucide-react for icons
import Contact from "./Contact";
import EmotionEvaluation from "./EmotionEvaluation"; // Import EmotionEvaluation
import { redirect } from "next/navigation";

interface UserData {
  id: number;
  username: string;
}

interface AboutData {
  user_id: number;
  description: string;
}

interface ContactData {
  contact: string;
}

interface ProfilePictureData {
  profilePicture: string;
}

interface ProfileProps {
  userId: string;
  currentUserId: number; // New prop for the current user's ID
}

const Profile = ({ userId, currentUserId }: ProfileProps) => {
  const [username, setUsername] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("evaluation"); // State to manage the active tab

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_IP_KEY}users?userId=${userId}`
        );
        const userData = response.data.data.find(
          (user: UserData) => user.id === parseInt(userId)
        );
        if (userData) {
          setUsername(userData.username);
        }

        // Fetch about data
        const response2 = await axios.get(
          `${process.env.NEXT_PUBLIC_IP_KEY}/about?userId=${userId}`
        );
        const aboutData = response2.data.data.find(
          (about: AboutData) => about.user_id === parseInt(userId)
        );
        if (aboutData) {
          setAbout(aboutData.description); // Set the description as the about info
        }

        // Fetch contact data
        const response3 = await axios.get(
          `${process.env.NEXT_PUBLIC_IP_KEY}/contact?userId=${userId}`
        );
        const contactData = response3.data.data as ContactData;
        setContact(contactData.contact);

        // Fetch profile picture data
        const response4 = await axios.get(
          `${process.env.NEXT_PUBLIC_IP_KEY}/profile-picture?userId=${userId}`
        );
        const profilePictureData = response4.data.data as ProfilePictureData;
        setProfilePicture(profilePictureData.profilePicture);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const onClickChangeProfile = () => {
    redirect("/editprofile");
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg max-w-lg mx-auto">
      <div className="flex items-center mb-4">
        <div className="overflow-hidden rounded-full border-2 border-purple-300">
          <Image
            src={profilePicture || "/profile.jpg"} // Use fetched profile picture or default image
            alt="Profile picture"
            width={100}
            height={100}
            className="rounded-full"
          />
          {/* Conditionally render the edit profile button */}
          {/* {parseInt(userId) === currentUserId && ( */}
          <button className="flex mt-2" onClick={onClickChangeProfile}>
            <FilePenLine />
            <p className="hidden md:block">Modifier mon profile</p>
          </button>
          {/*  )} */}
        </div>
        <div className="ml-4 text-black">
          <h2 className="text-2xl font-bold">{username}</h2>
          <p className="text-sm text-gray-600">{about}</p>
        </div>
      </div>
      <div className="w-full">
        <Tabs defaultValue="evaluation">
          <TabsList
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            className="grid w-full grid-cols-4 bg-purple-50 rounded-lg shadow-md mb-4" // Increased column count for new tab
          >
            {[
              {
                value: "evaluation",
                icon: <Calendar className="h-4 w-4" />,
              },
              {
                value: "contact",
                icon: <Heart className="h-4 w-4" />,
              },
              {
                value: "statistique",
                icon: <Book className="h-4 w-4" />,
              },
              {
                value: "emotion-evaluation", // New tab for EmotionEvaluation
                icon: <Book className="h-4 w-4" />, // You can use a different icon if needed
              },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`data-[state=active]:bg-purple-100 flex justify-center items-center p-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab.value
                    ? "bg-purple-200 text-black font-semibold"
                    : "hover:bg-purple-100 text-gray-700"
                }`}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                {tab.icon}
                <span className="ml-2 hidden md:inline">
                  {tab.value.charAt(0).toUpperCase() + tab.value.slice(1)}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="evaluation" activeTab={activeTab}>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <p>Here is the evaluation of the user</p>
            </div>
          </TabsContent>
          <TabsContent value="contact" activeTab={activeTab}>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <Contact />
            </div>
          </TabsContent>
          <TabsContent value="statistique" activeTab={activeTab}>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <p>Here is the statistique of the user</p>
            </div>
          </TabsContent>
          <TabsContent value="emotion-evaluation" activeTab={activeTab}>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <EmotionEvaluation userId={parseInt(userId)} />{" "}
              {/* Pass userId to EmotionEvaluation */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
