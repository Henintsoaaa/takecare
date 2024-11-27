"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // Check if the user is authenticated based on the user cookie if not redirect to login page
  useEffect(() => {
    if (document.cookie) {
      const user = document.cookie.split(",")[0].split("=")[1];
      if (!user) {
        window.location.href = "/login";
      }
    }
  }, []);

  return (
    <div className="flex text-black">
      <Sidebar />
      <div className="flex-grow h-screen bg-gray-100">{children}</div>
    </div>
  );
};

export default Layout;
