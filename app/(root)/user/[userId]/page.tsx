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
}

interface AllFriendsResponse {
  status: string;
  data: { follower_id: number; followed_id: number }[];
}

const Page = () => {
  const userId = parseInt(usePathname().split("/")[2]);

  let user_id: number = 0; // Assuming the user is logged in
  if (document.cookie) {
    if (document.cookie) {
      user_id = parseInt(document.cookie.split(";")[0].split("=")[1]);
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
        // try {
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
        console.log(friendsResponse.data.data);

        const followerIds = friendsResponse.data.data
          ?.filter((friend) => friend.follower_id === userData.id)
          .map((friend) => friend.followed_id);

        const followersDetails = await Promise.all(
          followerIds?.map(async (followerId) => {
            const userDetailResponse = await axios.get<UserProfileResponse>(
              `${process.env.NEXT_PUBLIC_IP_KEY}/user?id=${followerId}`
            );

            const profilePhotoResponse = await axios.get(
              `${process.env.NEXT_PUBLIC_IP_KEY}/profilePhoto?user_id=${followerId}`
            );

            return {
              id: followerId,
              username: userDetailResponse.data.user.username,
              profilePhoto: profilePhotoResponse.data.path,
            };
          })
        );

        setContacts(followersDetails);
        // } catch (error) {
        //   console.error("Error fetching user data:", error);
        // }
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
      <div className="flex flex-col items-center mt-3 p-6 bg-gray-200 rounded-lg shadow-lg max-w-lg mx-auto">
        {/* Profile Header with Profile Picture */}
        <div className="flex flex-col items-center w-full bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="overflow-hidden rounded-full border-4 border-purple-400 mb-4 relative -top-11 bg-white">
            <Image
              src={profilePhoto || "default-avatar.svg"}
              alt="Profile picture"
              width={120}
              height={120}
              className="rounded-full"
              onError={() => {
                if (profilePhoto !== "default-avatar.svg") {
                  setProfilePhoto("/default-avatar.svg");
                }
              }}
            />
          </div>
          <h2 className="text-3xl font-bold">{username}</h2>
          <div className="relative">
            <p
              className={`text-sm text-gray-700 ${
                isAboutExpanded ? "" : "line-clamp-2"
              }`}
            >
              {about}
            </p>
            <button
              onClick={toggleAbout}
              className="absolute right-0 text-blue-500 hover:underline"
            >
              {isAboutExpanded ? "Show Less" : "Read More"}
            </button>
          </div>
          {parseInt(userId.toString()) === user_id && (
            <button
              className="flex mt-2 text-purple-600 hover:text-purple-800 transition duration-200"
              onClick={onClickChangeProfile}
            >
              <FilePenLine />
              <p className="hidden md:block ml-2">Edit Profile</p>
            </button>
          )}
        </div>
        {/* Tabs Section */}
        <div className="w-full">
          <Tabs defaultValue="posts">
            <TabsList className="grid w-full grid-cols-3 bg-purple-50 rounded-lg shadow-md mb-4">
              {[
                { value: "posts", icon: <Calendar className="h-5 w-5" /> },
                { value: "contacts", icon: <Heart className="h-5 w-5" /> },
                { value: "statistics", icon: <Book className="h-5 w-5" /> },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={`data-[state=active]:bg-purple-100 flex justify-center items-center p-4 rounded-lg transition-all duration-200 ${
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
                    <div
                      key={post.entry_id}
                      className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition duration-200"
                    >
                      <p className="text-lg">{post.notes}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(post.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No posts available.
                  </p>
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
                        alt={contact.username}
                        width={50}
                        height={50}
                        className="rounded-full mr-3"
                      />
                      <span className="text-lg">{contact.username}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No contacts available.
                  </p>
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
  }
};
export default Page;
