"use client";
import { useState } from "react";
import { Menu, Watch } from "lucide-react";
import EmotionTracker from "@/components/Emotion-tracker";
import PublicationStyle from "@/components/PublicationStyle";
import Sidebar from "@/components/Sidebar";

const Page = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-full overflow-hidden">
      {/* Mobile Menu Icon */}
      <div className="md:hidden h-full relative top-4">
        <button onClick={toggleMenu} className="p-2">
          <Menu />
        </button>
        {menuOpen && (
          <div className="absolute top-10 left-0 bg-white shadow-lg rounded-md">
            <ul className="flex flex-col p-2">
              <li className="py-1 hover:bg-gray-200 cursor-pointer">Quizz</li>
              <li className="py-1 hover:bg-gray-200 cursor-pointer">
                Assistance
              </li>
              <li className="py-1 hover:bg-gray-200 cursor-pointer">
                Inspiration du jour
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Emotion Tracker occupying the rest of the space */}
      <div className="flex-grow p-4 bg-gray-50 ">
        <EmotionTracker />
      </div>
    </div>
  );
};

export default Page;
