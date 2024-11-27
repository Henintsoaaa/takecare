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
    <div className="flex bg-gradient-to-br from-indigo-50 via-purple-50  justify-center items-center pt-5 h-screen overflow-y-auto">
      <PagePlainte />
    </div>
  );
};

export default Page;
