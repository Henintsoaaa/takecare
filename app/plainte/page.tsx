"use client";
import { redirect } from "next/navigation";
import PagePlainte from "@/components/PagePlainte";
import Sidebar from "@/components/Sidebar";

const Page = () => {
  const handleClick = () => {
    redirect("/formulaire");
  };

  const handleVideo = () => {
    redirect("/video");
  };

  const handleLangue = () => {
    redirect("/langueSigne");
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <PagePlainte />
      </div>
    </div>
  );
};

export default Page;
