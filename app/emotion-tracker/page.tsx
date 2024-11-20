import EmotionTracker from "@/components/Emotion-tracker";
import Sidebar from "@/components/Sidebar";
import React from "react";

const Page = () => {
  const currentPath = "/emotion-tracker";
  return (
    <div className="flex">
      <Sidebar activePath={currentPath} />
      <div className="flex-grow p-6 min-h-screen bg-gray-100">
        {" "}
        {/* Main content area */}
        <EmotionTracker />
      </div>
    </div>
  );
};

export default Page;
