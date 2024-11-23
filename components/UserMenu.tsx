"use client";
import React, { useEffect, useRef, useState } from "react";
import { User, AlertTriangle, LogOut } from "lucide-react"; // Import Lucid Icons
import { redirect } from "next/navigation";

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Create a ref for the dropdown

  if (!document.cookie) {
    // Redirect to login page if user is not logged in
    redirect("/login");
  } else {
    const user_id = document.cookie.split(",")[1].split("=")[1];
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileClick = () => {
    // Navigate to user profile page
    redirect(`/user/${user_id || "null"}`);
  };

  const handleSOSClick = () => {
    // Trigger SOS action
    console.log("SOS button clicked");
    redirect("/plainte");
  };

  const handleLogoutClick = () => {
    // Handle logout logic
    // remove user cookie
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-indigo-600 hover:text-indigo-700 transition-colors duration-200 flex gap-2 justify-center items-center"
      >
        <User size={24} className="md:w-[30px] md:h-[30px]" />
        <span className="hidden md:block">User Menu</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 w-48 mt-2 bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="py-1">
            <button
              onClick={handleProfileClick}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <User className="mr-2" /> Profile
            </button>
            <button
              onClick={handleSOSClick}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <AlertTriangle className="mr-2" /> SOS
            </button>
            <button
              onClick={handleLogoutClick}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="mr-2" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
