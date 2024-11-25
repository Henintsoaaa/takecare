"use client";
import { redirect } from "next/navigation";
import { Clipboard, Video, Hand } from "lucide-react"; // Import icons from lucide-react

const Page = () => {
  const handleClick = () => {
    redirect("/formulaire");
  };

  const handleVideo = () => {
    redirect("/video");
  };

  const handleLangue = () => {
    redirect("/langueSigne");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Complaint Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
          <h2 className="text-3xl font-bold text-indigo-600 mb-2">
            Déposer une Plainte
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Soumettez vos préoccupations et aidez-nous à améliorer nos services.
          </p>
          <button
            onClick={handleClick}
            className="flex items-center justify-center w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          >
            <Clipboard className="mr-2" />
            Compléter
          </button>
        </div>

        {/* Video Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
          <h2 className="text-3xl font-bold text-indigo-600 mb-2">
            Vidéos Explicatives
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Regardez nos vidéos pour mieux comprendre nos services.
          </p>
          <button
            onClick={handleVideo}
            className="flex items-center justify-center w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          >
            <Video className="mr-2" />
            Démarrer
          </button>
        </div>

        {/* Sign Language Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
          <h2 className="text-3xl font-bold text-indigo-600 mb-2">
            Langue des Signes
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Accédez à des ressources en langue des signes pour une meilleure
            communication.
          </p>
          <button
            onClick={handleLangue}
            className="flex items-center justify-center w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          >
            <Hand className="mr-2" />
            Démarrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
