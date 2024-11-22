"use client";
import { useState } from "react";
import { redirect } from "next/navigation";

const PublicationStyle = () => {
  const quotes = [
    {
      id: 1,
      text: "La joie est le meilleur des remèdes.",
      author: "Proverbe",
    },
    {
      id: 2,
      text: "Chaque jour peut ne pas être bon, mais il y a quelque chose de bon dans chaque jour.",
      author: "Alice Morse Earle",
    },
    {
      id: 3,
      text: "Le bonheur n'est pas quelque chose de prêt à l'emploi. Il vient de vos propres actions.",
      author: "Dalai Lama",
    },
    {
      id: 4,
      text: "Ne laissez pas le bruit des opinions des autres étouffer votre propre voix.",
      author: "Steve Jobs",
    },
    {
      id: 5,
      text: "La plus grande découverte de ma génération est que les êtres humains peuvent changer leur vie en changeant leur attitude.",
      author: "William James",
    },
  ];

  const [showAll, setShowAll] = useState(false);

  const handleClick = () => {
    redirect("/quizz");
  };

  const redirectToAssistance = () => {
    redirect("/assistance");
  };

  return (
    <div className="space-y-6 p-6 rounded-lg">
      <div className="text-center shadow-lg hidden md:block">
        <h2 className="text-3xl font-bold text-indigo-600 mb-2">Quizz</h2>
        <p className="text-lg text-gray-700">
          Participer à des quiz intéressants
        </p>
        <button
          onClick={handleClick}
          className="my-4 w-4/5 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
        >
          Commencer le Quizz
        </button>
      </div>
      <div className="text-center shadow-lg hidden md:block">
        <h2 className="text-3xl font-bold text-indigo-600 mb-2">Assistance</h2>
        <p className="text-lg text-gray-700">
          Bénéficier d'une assistance personnelle
        </p>
        <button
          onClick={redirectToAssistance}
          className="my-4 w-4/5 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
        >
          Demarer
        </button>
      </div>
      <div className="shadow-lg">
        <h2 className="text-2xl font-semibold text-indigo-600 text-center mb-4">
          Inspiration du Jour
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {quotes.slice(0, showAll ? quotes.length : 2).map((quote) => (
            <div
              key={quote.id}
              className="border border-indigo-300 rounded-lg p-6 bg-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <p className="text-lg italic text-gray-800">"{quote.text}"</p>
              <p className="text-right text-sm text-gray-500 mt-4">
                - {quote.author}
              </p>
            </div>
          ))}
        </div>
        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-4 w-full py-2 text-indigo-600 font-semibold rounded-lg shadow-md hover:underline transition duration-300"
          >
            Voir Plus
          </button>
        )}
        {showAll && (
          <button
            onClick={() => setShowAll(false)}
            className="mt-4 w-full py-2 text-indigo-600 font-semibold rounded-lg shadow-md hover:underline transition duration-300"
          >
            Voir moins
          </button>
        )}
      </div>
    </div>
  );
};

export default PublicationStyle;
