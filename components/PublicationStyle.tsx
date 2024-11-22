// PublicationStyle.js
import React from "react";

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

  return (
    <div className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">
        Inspiration du Jour
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {quotes.map((quote) => (
          <div
            key={quote.id}
            className="border border-indigo-300 rounded-lg p-4 bg-white shadow-lg transition-transform transform hover:scale-105"
          >
            <p className="text-lg italic text-gray-800">"{quote.text}"</p>
            <p className="text-right text-sm text-gray-500 mt-2">
              - {quote.author}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicationStyle;
