"use client";
import { redirect } from "next/navigation";

const Page = () => {
  const handleClick = () => {
    redirect("/jeu");
  };

  const redirectToAssistance = () => {
    redirect("/assistance");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
          <h2 className="text-3xl font-bold text-primary-light mb-2">Quizz</h2>
          <p className="text-lg text-gray-700 mb-4">
            Participez à des quiz intéressants pour tester vos connaissances.
          </p>
          <button
            onClick={handleClick}
            className="w-full py-3 bg-primary-light text-white font-semibold rounded-lg shadow-md hover:bg-primary-light transition duration-300"
          >
            Commencer le Quizz
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
          <h2 className="text-3xl font-bold text-primary-light mb-2">
            Assistance
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Bénéficiez d'une assistance personnelle pour vos besoins.
          </p>
          <button
            onClick={redirectToAssistance}
            className="w-full py-3 bg-primary-light text-white font-semibold rounded-lg shadow-md hover:bg-primary-light transition duration-300"
          >
            Démarrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
