import EmotionTracker from "@/components/Emotion-tracker";
import Profile from "@/components/Profile";
import React from "react";

const Page = () => {
  const currentPath = "/emotion-tracker";
  // log the session cookie
  console.log(process.env.NEXT_PUBLIC_IP_KEY);

  // return <EmotionTracker />;
  return <Profile userId="1" />;
};

export default Page;
