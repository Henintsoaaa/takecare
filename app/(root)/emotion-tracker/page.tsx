"use client";
import { useState } from "react";
import { Menu } from "lucide-react";
import EmotionTracker from "@/components/Emotion-tracker";
import PublicationStyle from "@/components/PublicationStyle";

const Page = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // console.log(document.cookie);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex gap-2 relative ">
      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="p-2">
          {/* Import a menu bar from lucide-react */}
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

      <div className="p-4 w-1/5 hidden md:block">
        <PublicationStyle />
      </div>
      <EmotionTracker />
    </div>
  );
};

export default Page;
