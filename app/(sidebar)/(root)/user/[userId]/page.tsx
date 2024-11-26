"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Heart, Book, FilePenLine } from "lucide-react";
import { usePathname, redirect } from "next/navigation";
import StatusForUser from "@/components/StatusForUser";
import ProofSection from "@/components/ProofSection";
import ResourcesSection from "@/components/ResourcesSection";
import Agenda from "@/components/Agenda";

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
}

interface User {
  id: number;
  username: string;
  created_at: Date;
  email: string;
  role: string;
}

interface AllUsersResponse {
  status: string;
  data: User[];
}

interface AllFriendsResponse {
  status: string;
  data: { follower_id: number; followed_id: number }[];
}

const Page = () => {
  const userId = parseInt(usePathname().split("/")[2]);

  let user_id: number = 0; // Assuming the user is logged in
  if (document.cookie) {
    user_id = parseInt(document.cookie.split(",")[1].split("=")[1]);
  }

  const [username, setUsername] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<string>("posts");
  const [isAboutExpanded, setIsAboutExpanded] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await axios.get<UserProfileResponse>(
        `${process.env.NEXT_PUBLIC_IP_KEY}/profile?user_id=${userId}`
      );

      const userData = userResponse.data.user;
      const aboutData = userResponse.data.about;
      const postsData = userResponse.data.posts;

      setUsername(userData.username);
      setAbout(aboutData.description);
      setProfilePhoto(userData.profilePhoto);
      setPosts(postsData);

      const friendsResponse = await axios.get<AllFriendsResponse>(
        `${process.env.NEXT_PUBLIC_IP_KEY}/user/allfriend`
      );

      const followerIds = friendsResponse.data.data
        .filter((friend) => friend.follower_id === userData.id)
        .map((friend) => friend.followed_id);

      const followersDetails = await Promise.all(
        followerIds.map(async (followerId) => {
          const userDetailResponse = await axios.get<AllUsersResponse>(
            `${process.env.NEXT_PUBLIC_IP_KEY}/user`
          );
          console.log(userDetailResponse.data.data);

          const profilePhotoResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_IP_KEY}/profilePhoto?user_id=${followerId}`
          );

          const username =
            userDetailResponse.data.data.find((user) => user.id === followerId)
              ?.username || "Unknown User";

          return {
            id: followerId,
            username,
            profilePhoto: profilePhotoResponse.data.path,
          };
        })
      );

      setContacts(followersDetails);
    };

    fetchData();
  }, [userId]);

  const onClickChangeProfile = () => {
    redirect(`/user/${user_id}/edit`);
  };

  const toggleAbout = () => {
    setIsAboutExpanded(!isAboutExpanded);
  };

  return (
    <div className="flex flex-col items-center mt-6 p-8 bg-gradient-to-r from-indigo-100 to-blue-200 rounded-lg shadow-lg max-w-lg mx-auto">
      {/* Profile Header with Profile Picture */}
      <div className="flex flex-col items-center w-full bg-white rounded-lg shadow-md p-6 mb-6 relative">
        {/* Profile Image Section */}
        <div className="absolute -top-16 w-32 h-32 rounded-full overflow-hidden border-4 border-primary-light bg-white">
          <Image
            src={profilePhoto || "/default-avatar.svg"}
            alt="Profile picture"
            width={128}
            height={128}
            className="object-cover"
            onError={() => {
              if (profilePhoto !== "/default-avatar.svg")
                setProfilePhoto("/default-avatar.svg");
            }}
          />
        </div>

        {/* Username */}
        <h2 className="mt-16 text-4xl font-bold text-indigo-800">{username}</h2>

        {/* About Section */}
        <div className="mt-4 text-center">
          <p
            className={`text-md text-gray-700 ${
              isAboutExpanded ? "" : "line-clamp-2"
            }`}
          >
            {about}
          </p>
          <button
            onClick={toggleAbout}
            className="mt-2 text-primary-light hover:underline"
            aria-expanded={isAboutExpanded}
          >
            {isAboutExpanded ? "Show Less" : "Read More"}
          </button>
        </div>

        {/* Edit Profile Button */}
        {parseInt(userId.toString()) === user_id && (
          <button
            onClick={onClickChangeProfile}
            className="flex items-center mt-4 text-primary-light hover:text-indigo-800 transition duration-200"
          >
            <FilePenLine />
            <span className="hidden md:inline-block ml-2">Edit Profile</span>
          </button>
        )}
      </div>

      {/* Tabs Section */}
      <div className="w-full">
        <Tabs defaultValue="posts">
          <TabsList className="grid w-full grid-cols-3 bg-indigo-50 rounded-lg shadow-md mb-4">
            {[
              { value: "posts", icon: <Calendar className="h-5 w-5" /> },
              { value: "contacts", icon: <Heart className="h-5 w-5" /> },
              { value: "agenda", icon: <Book className="h-5 w-5" /> },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`data-[state=active]:bg-indigo-100 flex justify-center items-center p-4 rounded-lg transition-all duration-200 ${
                  activeTab === tab.value
                    ? "bg-indigo-200 text-black font-semibold"
                    : "hover:bg-indigo-100 text-gray-700"
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
                  <div
                    key={post.entry_id}
                    className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition duration-200"
                  >
                    <p className="text-lg font-semibold">{post.notes}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(post.created_at).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No posts available.</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="contacts">
            <div className="p-4 bg-white rounded-lg shadow-md">
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center mb-4 p-2 border-b border-gray-200"
                  >
                    <Image
                      src={contact.profilePhoto || "/default-profile.jpg"}
                      alt={contact.username || "Profile picture"}
                      width={50}
                      height={50}
                      className="rounded-full mr-3"
                    />
                    <span className="text-lg font-medium">
                      {contact.username}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No contacts available.
                </p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="agenda">
            <Agenda />
          </TabsContent>
          <TabsContent value="proofs">
            <ProofSection />
          </TabsContent>
          <TabsContent value="resources">
            <Agenda />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default Page;
