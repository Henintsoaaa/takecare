import React from "react";
import Link from "next/link";
import { Home, Smile, Settings } from "lucide-react"; // Example icons

const Sidebar = ({ activePath }) => {
  const menuItems = [
    {
      path: "/menstrual",
      label: "Menstruation",
      icon: <Home className="inline-block w-5 h-5" />,
    },
    {
      path: "/emotion-tracker",
      label: "Emotion Tracker",
      icon: <Smile className="inline-block w-5 h-5" />,
    },
    {
      path: "/userEvolution",
      label: "User  Evolution",
      icon: <Settings className="inline-block w-5 h-5" />,
    },
  ];

  return (
    <div className="md:w-64 bg-gray-800 text-white shadow-lg h-screen fixed top-0 left-0">
      <div className="p-4 text-center text-xl font-bold border-b border-gray-700">
        Tech'her
      </div>
      <nav className="mt-10">
        <ul className="flex flex-col gap-5 pt-10">
          {menuItems.map(({ path, label, icon }) => (
            <li
              key={path}
              className={`p-2 flex items-center rounded-lg transition-colors duration-200 ${
                activePath === path ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <Link
                href={path}
                className="flex items-center"
                aria-label={label}
              >
                {icon}
                <span className="ml-2 hidden md:block">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
        <p className="text-sm text-center">
          © 2024 Tech'her. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
