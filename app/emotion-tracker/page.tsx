import EmotionTracker from "@/components/Emotion-tracker";
import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";
import React from "react";

const Page = () => {
  const currentPath = "/emotion-tracker";
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex-grow p-6 min-h-screen bg-gray-100">
        {" "}
        {/* Main content area */}
        {/* <EmotionTracker /> */}
        <Profile userId="1" />
      </div>
    </div>
  );
};

export default Page;
