import Link from "next/link";
import React from "react";
import { MessageCircle, Heart, Bot } from "lucide-react"; // Importing icons from lucide-react
import Notification from "./Notification";
import UserMenu from "./UserMenu"; // Import the UserMenu component
import ChatBot from "./ChatBot"; // Import the ChatBot component

const Navbar = () => {
  return (
    <div className="flex justify-end items-center py-4 bg-gray-300 shadow-md md:px-9 px-1">
      <div className="flex space-x-4 items-center">
        <ChatBot />
        <Link
          href="/messages"
          className="text-primary-light hover:text-primary-light transition-colors duration-200 flex gap-2 justify-center items-center"
        >
          <MessageCircle size={24} className="md:w-[30px] md:h-[30px]" />
          <span className="hidden md:block">Message</span>
        </Link>
        <Notification />
        <UserMenu />
      </div>
    </div>
  );
};

export default Navbar;
