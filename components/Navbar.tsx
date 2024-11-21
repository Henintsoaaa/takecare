import Link from "next/link";
import React from "react";
import { MessageCircle, Bell, User, Heart } from "lucide-react"; // Importing icons from lucide-react

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-4 bg-gray-300 shadow-md md:px-9 px-1">
      <div className="flex gap-4 justify-center items-center">
        <Heart
          size={40}
          className="text-indigo-600 hover:text-indigo-700 md:w-[40px] md:h-[40px]"
        />
        <span className="text-xl font-bold hidden md:block text-indigo-700">
          Tech'her
        </span>
      </div>
      <div className="flex space-x-4">
        <Link
          href="#"
          className="text-indigo-600 hover:text-indigo-700  transition-colors duration-200 flex gap-2 justify-center items-center"
        >
          <MessageCircle size={24} className="md:w-[30px] md:h-[30px]" />
          <span className="hidden md:block">Message</span>
        </Link>
        <Link
          href="#"
          className="text-indigo-600 hover:text-indigo-700  transition-colors duration-200 flex gap-2 justify-center items-center"
        >
          <Bell size={24} className="md:w-[30px] md:h-[30px]" />
          <span className="hidden md:block">Notification</span>
        </Link>
        <Link
          href="#"
          className="text-indigo-600 hover:text-indigo-700 transition-colors duration-200 flex gap-2 justify-center items-center"
        >
          <User size={24} className="md:w-[30px] md:h-[30px]" />
          <span className="hidden md:block">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
