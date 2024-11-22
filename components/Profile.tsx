"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "./ui/tabs";

interface UserData {
  username: string;
}

interface AboutData {
  about: string;
}

interface ContactData {
  contact: string;
}

interface ProfilePictureData {
  profilePicture: string;
}

interface ProfileProps {
  userId: string;
}

const Profile = ({ userId }: ProfileProps) => {
  const [username, setUsername] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [contact, setContact] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost/hacker-back/users?userId=${userId}`
      );
      const userData = response.data.data as UserData;
      setUsername(userData.username);

      const response2 = await axios.get(
        `http://localhost/hacker-back/about?userId=${userId}`
      );
      const aboutData = response2.data.data as AboutData;
      setAbout(aboutData.about);

      const response3 = await axios.get(
        `http://localhost/hacker-back/contact?userId=${userId}`
      );
      const contactData = response3.data.data as ContactData;
      setContact(contactData.contact);

      const response4 = await axios.get(
        `http://localhost/hacker-back/profile-picture?userId=${userId}`
      );
      const profilePictureData = response4.data.data as ProfilePictureData;
      setProfilePicture(profilePictureData.profilePicture);
    };

    fetchData();
  }, [userId]);

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div>
          <Image
            src="/profile.jpg"
            alt="Profile picture"
            width={200}
            height={200}
          />
        </div>
        <div>
          <p className="text-xl">{username}</p>
          <p className="text-sm">{about}</p>
        </div>
      </div>
      <div>
        {/* add a tabs who have evaluation, contact, statistique of the user */}
        <Tabs defaultValue="evaluation">
          <TabsList activeTab="evaluation" setActiveTab={() => {}}>
            <TabsTrigger
              value="evaluation"
              activeTab="evaluation"
              setActiveTab={() => {}}
            >
              Evaluation
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              activeTab="contact"
              setActiveTab={() => {}}
            >
              Contact
            </TabsTrigger>
            <TabsTrigger
              value="statistique"
              activeTab="statistique"
              setActiveTab={() => {}}
            >
              Statistique
            </TabsTrigger>
          </TabsList>
          <TabsContent value="evaluation" activeTab="evaluation">
            <div>
              <p>Here is the evaluation of the user</p>
            </div>
          </TabsContent>
          <TabsContent value="contact" activeTab="contact">
            <div>
              <p>{contact}</p>
            </div>
          </TabsContent>
          <TabsContent value="statistique" activeTab="statistique">
            <div>
              <p>Here is the statistique of the user</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
