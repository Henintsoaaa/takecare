import Link from "next/link"; // Assuming you want to use Next.js Link for navigation
import {
  Home,
  MessageCircle,
  Clipboard,
  Heart,
  Newspaper,
  Cat,
  Compass,
} from "lucide-react"; // Importing icons from lucide-react
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="relative w-64 h-screen bg-primary text-white border-r flex flex-col items-center gap-6">
      {/* Black to white blur gradient overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-30 backdrop-blur-lg rounded-lg"></div> */}

      <Link href="/home">
        <div className="flex md:items-center md:justify-center h-20 text-2xl font-bold shadow-md relative text-secondary">
          {/* <Heart className="mr-3 h-8 w-8 text-white" /> */}
          <Image src="/logo2.svg" alt="Tech'Her Logo" width={56} height={56} />
          <span className="hidden md:block text-white">Tech'her</span>
        </div>
      </Link>
      <div className="pl-3 relative z-10">
        <nav className="mt-10">
          <Link href="/plainte">
            <div className="flex items-center p-3 hover:bg-primary-dark transition-colors duration-200 cursor-pointer rounded-md">
              <Clipboard className="mr-3 h-5 w-5 text-white" />
              <span className="text-white font-semibold hidden md:block">
                Plainte
              </span>
            </div>
          </Link>
          <Link href="/emotion-tracker">
            <div className="flex items-center p-3 hover:bg-primary-dark transition-colors duration-200 cursor-pointer rounded-md">
              <MessageCircle className="mr-3 h-5 w-5 text-white" />
              <span className="text-white font-semibold hidden md:block">
                Communauté
              </span>
            </div>
          </Link>
          <Link href="/quizz">
            <div className="flex items-center p-3 hover:bg-primary-dark transition-colors duration-200 cursor-pointer rounded-md">
              <Compass className="mr-3 h-5 w-5 text-white" />
              <span className="text-white font-semibold hidden md:block">
                Découverte
              </span>
            </div>
          </Link>
          <Link href="/actualite">
            <div className="flex items-center p-3 hover:bg-primary-dark transition-colors duration-200 cursor-pointer rounded-md">
              <Newspaper className="mr-3 h-5 w-5 text-white" />
              <span className="text-white font-semibold hidden md:block">
                Actualité
              </span>
            </div>
          </Link>
          <Link href="/feedback">
            <div className="flex items-center p-3 hover:bg-primary-dark transition-colors duration-200 cursor-pointer rounded-md">
              <Cat className="mr-3 h-5 w-5 text-white" />
              <span className="text-white font-semibold hidden md:block">
                Feed-back
              </span>
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
