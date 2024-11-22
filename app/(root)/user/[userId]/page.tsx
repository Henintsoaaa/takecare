"use client";
import { usePathname } from "next/navigation";

interface post {
  entry_id: number;
  user_id: number;
  emotion_id: string;
  well_being_score: number;
  notes: string;
  positive_moment: string;
  created_at: Date;
  isAnonyme: boolean;
}

interface contact {
  id: number;
  username: string;
  profilePicture: string;
}

interface userProfileResponse {
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
  allPots: post[];
  contact: contact[];
}

const Page = () => {
  const userId = usePathname().split("/")[1];

  return <div></div>;
};

export default Page;
