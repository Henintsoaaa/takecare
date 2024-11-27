import React from "react";
import Plainte from "./Plainte";
import VideoCapture from "./LangueSigne";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { useState } from "react";
import { FaCalendar, FaHeart, FaBook } from "react-icons/fa";
import { redirect } from "next/navigation";
import EnregistrementVideo from "./EnregistrementVideo";

const PagePlainte = () => {
  const [activeTab, setActiveTab] = useState("Plainte");
  let user_id: string | undefined;

  // Redirect to login page if user is not logged in
  if (typeof document !== "undefined" && !document.cookie) {
    redirect("/login");
  } else {
    user_id = document.cookie.split(",")[1].split("=")[1];
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full w-full mx-6">
      {/* Main Navigation */}
      <Tabs defaultValue="Plainte" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-blue-200 rounded-lg shadow-md mb-4">
          {[
            {
              value: "Plainte",
              icon: <FaCalendar className="h-4 w-4 text-primary-light" />,
            },
            {
              value: "Video",
              icon: <FaHeart className="h-4 w-4 text-primary-light" />,
            },
            {
              value: "Language des signes",
              icon: <FaBook className="h-4 w-4 text-primary-light" />,
            },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`data-[state=active]:bg-blue-100 flex justify-center items-center p-3 rounded-lg transition-all duration-200 ${
                activeTab === tab.value
                  ? "bg-blue-300 text-secondary-dark"
                  : "hover:bg-blue-100 text-primary-light"
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

        {/* Tab Contents */}
        <TabsContent value="Plainte">
          <div className="flex justify-center items-center">
            <Plainte />
          </div>
        </TabsContent>
        <TabsContent value="Video">
          <EnregistrementVideo />
        </TabsContent>
        <TabsContent value="Language des signes">
          <VideoCapture />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PagePlainte;
