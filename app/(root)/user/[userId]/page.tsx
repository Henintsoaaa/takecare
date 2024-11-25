"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Heart, Book, FilePenLine } from "lucide-react"; // Assuming you're using lucide-react for icons
import { usePathname, redirect } from "next/navigation";
import StatusForUser from "@/components/StatusForUser";
import ProofSection from "@/components/ProofSection";
import ResourcesSection from "@/components/ResourcesSection";

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
  profilePhoto: string;
}

interface UserProfileResponse {
  status: string;
  user: {
    id: number;
    username: string;
    email: string;
    created_at: Date;
    profilePhoto: string;
    role: string;
    coverPhoto: string;
  };
  about: {
    user_id: number;
    description: string;
  };
  posts: Post[];
  contacts: Contact[];
}

interface ContactResponse {
  status: string;
  contacts: Contact[];
}

const Page = () => {
  const userId = parseInt(usePathname().split("/")[2]);

  let user_id: number = 0; // Assuming the user is logged in
  if (document.cookie) {
    user_id = parseInt(document.cookie.split(";")[0].split("=")[1]);
  }

  console.log(userId, user_id);

  const [username, setUsername] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [contacts, setContacts] = useState<Contact[]>([]); // Initialize as empty array
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<string>("posts"); // State to manage the active tab

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<UserProfileResponse>(
          `${process.env.NEXT_PUBLIC_IP_KEY}/profile?user_id=${userId}`
        );

        const userData = response.data.user;
        const aboutData = response.data.about;
        const postsData = response.data.posts;

        // Fetch contacts
        const responseContact = await axios.get<ContactResponse>(
          `${process.env.NEXT_PUBLIC_IP_KEY}/contact?user_id=${userId}`
        );
        const contactsData = responseContact.data.contacts || []; // Ensure it's an array

        setUsername(userData.username);
        setAbout(aboutData.description);
        setProfilePhoto(userData.profilePhoto);
        setPosts(postsData);
        setContacts(contactsData); // Set contacts data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const onClickChangeProfile = () => {
    redirect(`/user/${user_id}/edit`);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg max-w-lg mx-auto">
      <div className="flex items-center mb-4">
        <div className="overflow-hidden rounded-full border-2 border-purple-300">
          <Image
            src={profilePhoto || "/profile.jpg"} // Use fetched profile picture or default image
            alt="Profile picture"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        {/* Conditionally render the edit profile button */}
        {userId === user_id && ( // Compare both as numbers
          <button className="flex mt-2" onClick={onClickChangeProfile}>
            <FilePenLine />
            <p className="hidden md:block text-black">Modifier mon profil</p>
          </button>
        )}
        <div className="ml-4 text-black">
          <h2 className="text-2xl font-bold">{username}</h2>
          <p className="text-sm text-gray-600">{about}</p>
        </div>
      </div>
      <div className="w-full">
        <Tabs defaultValue="posts">
          <TabsList className="grid w-full grid-cols-3 bg-purple-50 rounded-lg shadow-md mb-4">
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
                value: "tableau de bord",
                icon: <Book className="h-4 w-4" />,
              },
              {
                value: "preuves",
                icon: <Book className="h-4 w-4" />,
              },
              {
                value: "ressources",
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
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.icon}
                <span className="ml-2 hidden md:inline">
                  {tab.value.charAt(0).toUpperCase() + tab.value.slice(1)}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="posts">
            <div className="p-4 bg-white rounded-lg shadow-md">
              {posts.length > 0 ? (
                posts.map((post) => (
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
          <TabsContent value="contacts">
            <div className="p-4 bg-white rounded-lg shadow-md">
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <div key={contact.id} className="flex items-center mb-2">
                    <Image
                      src={contact.profilePhoto || "/default-profile.jpg"}
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
          <TabsContent value="tableau de bord">
            <StatusForUser />
          </TabsContent>
          <TabsContent value="preuves">
            <ProofSection />
          </TabsContent>
          <TabsContent value="resources">
            <ResourcesSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
