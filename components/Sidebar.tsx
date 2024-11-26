import Link from "next/link"; // Assuming you want to use Next.js Link for navigation
import { Home, MessageCircle, Clipboard, Heart } from "lucide-react"; // Importing icons from lucide-react

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white border-r border-gray-700 shadow-lg">
      <Link href="/home">
        <div className="flex md:items-center md:justify-center h-20  text-2xl font-bold shadow-md">
          {/* <Image src="/logo.png" alt="logo" width={50} height={50} /> */}
          <Heart className="mr-3 h-8 w-8 text-white" />
          <span className="hidden md:block">Tech'her</span>
        </div>
      </Link>
      <nav className="mt-10">
        <Link href="/plainte">
          <div className="flex items-center p-3 hover:bg-indigo-700 transition-colors duration-200 cursor-pointer rounded-md">
            <Clipboard className="mr-3 h-5 w-5" />
            <span className="text-gray-200 font-semibold hidden md:block">
              Plainte
            </span>
          </div>
        </Link>
        <Link href="/emotion-tracker">
          <div className="flex items-center p-3 hover:bg-indigo-700 transition-colors duration-200 cursor-pointer rounded-md">
            <MessageCircle className="mr-3 h-5 w-5" />
            <span className="text-gray-200 font-semibold hidden md:block">
              Communauté
            </span>
          </div>
        </Link>
        <Link href="/quizz">
          <div className="flex items-center p-3 hover:bg-indigo-700 transition-colors duration-200 cursor-pointer rounded-md">
            <Home className="mr-3 h-5 w-5" />
            <span className="text-gray-200 font-semibold hidden md:block">
              Découverte
            </span>
          </div>
        </Link>
        <Link href="/actualite">
          <div className="flex items-center p-3 hover:bg-indigo-700 transition-colors duration-200 cursor-pointer rounded-md">
            <Home className="mr-3 h-5 w-5" />
            <span className="text-gray-200 font-semibold hidden md:block">
              Actualité
            </span>
          </div>
        </Link>
        <Link href="/feedback">
          <div className="flex items-center p-3 hover:bg-indigo-700 transition-colors duration-200 cursor-pointer rounded-md">
            <Home className="mr-3 h-5 w-5" />
            <span className="text-gray-200 font-semibold hidden md:block">
              Feed-back
            </span>
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
