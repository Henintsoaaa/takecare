import Link from "next/link"; // Assuming you want to use Next.js Link for navigation
import { Home, MessageCircle, Clipboard } from "lucide-react"; // Importing icons from lucide-react

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white border-r border-gray-700 shadow-lg">
      <div className="flex items-center justify-center h-20  text-2xl font-bold shadow-md">
        Tech'her
      </div>
      <nav className="mt-10">
        <Link href="/plainte">
          <div className="flex items-center p-3 hover:bg-indigo-700 transition-colors duration-200 cursor-pointer rounded-md">
            <Clipboard className="mr-3 h-5 w-5" />
            <span className="text-gray-200 font-semibold">Plainte</span>
          </div>
        </Link>
        <Link href="/emotion-tracker">
          <div className="flex items-center p-3 hover:bg-indigo-700 transition-colors duration-200 cursor-pointer rounded-md">
            <MessageCircle className="mr-3 h-5 w-5" />
            <span className="text-gray-200 font-semibold">Communauté</span>
          </div>
        </Link>
        <Link href="/decouverte">
          <div className="flex items-center p-3 hover:bg-indigo-700 transition-colors duration-200 cursor-pointer rounded-md">
            <Home className="mr-3 h-5 w-5" />
            <span className="text-gray-200 font-semibold">Découverte</span>
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
