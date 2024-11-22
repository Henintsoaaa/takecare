"use client";
import { usePathname } from "next/navigation";

interface post {
  id: number;
  content: string;
  emotion_name: string;
  niveau: number;
}

interface contact {
  id: number;
  username: string;
  profilePicture: string;
}

interface userProfile {
  id: number;
  username: string;
  userType: string;
  about: string;
  email: string;
  created_at: Date;
  allPots: post[];
  contact: contact[];
  profilePicture: string;
  coverPicture: string;
}

const Page = () => {
  const userId = usePathname().split("/")[1];

  return <div></div>;
};

export default Page;
