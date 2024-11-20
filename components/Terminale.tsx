"use client";

import {
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";

const Terminale = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/image/bgTerminale.png')] bg-cover bg-center bg-no-repeat">
      {/* Fenêtre du terminal */}
      <div className="bg-[#DDB1C7] w-full max-w-4xl mx-5 rounded-lg">
        {/* En-tête du terminal */}
        <div className="flex justify-between items-center px-4 py-3 bg-[#d9a6b6] rounded-t-lg">
          <div className="flex items-center space-x-3 text-white">
            <AiOutlinePlus className="text-black" />
          </div>
          <div className="text-white text-lg font-mono text-center flex-1">
            tech&rsquo;her@tech&rsquo;her
          </div>

          <div className="flex items-center space-x-3 text-white">
            <AiOutlineSearch className="text-black" />
            <AiOutlineMenu className="text-black" />
            <AiOutlineClose className="text-black" />
          </div>
        </div>

        {/* Corps du terminal avec animations */}
        <div className="bg-[#282a36] text-white text-sm font-mono px-5 py-5 rounded-b-lg leading-loose h-96">
          {/* Chaque ligne de texte avec animation */}
          <p className="overflow-hidden whitespace-nowrap w-0 animate-typewriter">
            girly@girly:~ WELCOME TO TECH’HER
          </p>
          <p
            className="overflow-hidden whitespace-nowrap w-0 animate-typewriter"
            style={{ animationDelay: "2s" }}
          >
            girly@girly:~ LOADING...
          </p>
          <p
            className="overflow-hidden whitespace-nowrap w-0 animate-typewriter"
            style={{ animationDelay: "4s" }}
          >
            girly@girly:~ apt-get install tech’her-project
          </p>
          <p
            className="overflow-hidden whitespace-nowrap w-0 animate-typewriter"
            style={{ animationDelay: "6s" }}
          >
            girly@girly:~ .......................
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terminale;
