"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Heart, Book } from "lucide-react"; // Assuming you're using lucide-react for icons
import { usePathname } from "next/navigation";

interface Post {
  entry_id: number;
  user_id: number;
  emotion_id: string;
  well_being_score: number;
  notes: string;
  positive_moment: string;
  created_at: Date;
  isAnonyme: boolean;
}

interface Contact {
  id: number;
  username: string;
  profilePicture: string;
}

interface UserProfileResponse {
  status: string;
  user: {
    id: number;
    username: string;
    userType: string;
    email: string;
    created_at: Date;
    profilePicture: string;
    coverPicture: string;
  };
  about: {
    user_id: number;
    description: string;
  };
  allPosts: Post[];
  contact: Contact[];
}

// generic data
const data: UserProfileResponse = {
  status: "success",
  user: {
    id: 1,
    username: "John Doe",
    userType: "admin",
    email: "john@gmail.com",
    created_at: new Date(),
    profilePicture: "/profile.jpg",
    coverPicture: "/cover.jpg",
  },
  about: {
    user_id: 1,
    description: "I am a software engineer",
  },
  allPosts: [
    {
      entry_id: 1,
      user_id: 1,
      emotion_id: "happy",
      well_being_score: 5,
      notes: "I am happy today",
      positive_moment: "I got a new job",
      created_at: new Date(),
      isAnonyme: false,
    },
    {
      entry_id: 2,
      user_id: 1,
      emotion_id: "sad",
      well_being_score: 2,
      notes: "I am sad today",
      positive_moment: "I lost my job",
      created_at: new Date(),
      isAnonyme: false,
    },
  ],
  contact: [
    {
      id: 1,
      username: "Jane Doe",
      profilePicture: "/jane.jpg",
    },
    {
      id: 2,
      username: "Alice",
      profilePicture: "/alice.jpg",
    },
    {
      id: 3,
      username: "Bob",
      profilePicture: "/bob.jpg",
    },
  ],
};

const _response = {
  data: data,
};

const Page = () => {
  const userId = usePathname().split("/")[1];
  const [username, setUsername] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<string>("posts"); // State to manage the active tab

  useEffect(() => {
    const fetchData = async () => {
      try {
        /*
        const response = await axios.get<UserProfileResponse>(
          `${process.env.NEXT_PUBLIC_IP_KEY}Hack4Her/user-profile?userId=${userId}`
        );
        */
        const response = _response;

        const userData = response.data.user;
        const aboutData = response.data.about;
        const postsData = response.data.allPosts;
        const contactsData = response.data.contact;

        setUsername(userData.username);
        setAbout(aboutData.description);
        setProfilePicture(userData.profilePicture);
        setAllPosts(postsData);
        setContacts(contactsData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userId]);

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
        </div>
        <div className="ml-4 text-black">
          <h2 className="text-2xl font-bold">{username}</h2>
          <p className="text-sm text-gray-600">{about}</p>
        </div>
      </div>
      <div className="w-full">
        <Tabs defaultValue="posts">
          <TabsList
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            className="grid w-full grid-cols-3 bg-purple-50 rounded-lg shadow-md mb-4"
          >
            {[
              {
                value: "posts",
                icon: <Calendar className="h-4 w-4" />,
              },
              {
                value: "contacts",
                icon: <Heart className="h-4 w-4" />,
              },
              {
                value: "statistics",
                icon: <Book className="h-4 w-4" />,
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
          <TabsContent value="posts" activeTab={activeTab}>
            <div className="p-4 bg-white rounded-lg shadow-md">
              {allPosts.length > 0 ? (
                allPosts.map((post) => (
                  <div key={post.entry_id} className="mb-2">
                    <p>{post.notes}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(post.created_at).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p>No posts available.</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="contacts" activeTab={activeTab}>
            <div className="p-4 bg-white rounded-lg shadow-md">
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <div key={contact.id} className="flex items-center mb-2">
                    <Image
                      src={contact.profilePicture || "/default-profile.jpg"}
                      alt={contact.username}
                      width={40}
                      height={40}
                      className="rounded-full mr-2"
                    />
                    <span>{contact.username}</span>
                  </div>
                ))
              ) : (
                <p>No contacts available.</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="statistics" activeTab={activeTab}>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <p>Statistics will be displayed here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
