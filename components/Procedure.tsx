"use client";
import { redirect } from "next/navigation"; // Import redirect from next/navigation
import { ArrowLeft } from "lucide-react"; // Import the ArrowLeft icon from lucide-react

const Procedure = () => {
  const handleBack = () => {
    redirect("/emotion-tracker"); // Redirect to the emotion-tracker page
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg relative">
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 text-primary-light hover:text-indigo-800 transition duration-300 pb-9"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
      <h1 className="text-3xl font-bold text-primary-light mb-4 pt-14">
        Votre plainte est déposée avec succès
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Voici les procédures à suivre pour la suite de votre plainte.
      </p>
      <ul className="list-disc list-inside space-y-4">
        <li className="p-4 border border-indigo-300 rounded-lg bg-gray-50">
          <strong className="text-primary-light">Signalement immédiat :</strong>{" "}
          Il est important de porter plainte rapidement après l'incident de
          harcèlement.
        </li>
        <li className="p-4 border border-indigo-300 rounded-lg bg-gray-50">
          <strong className="text-primary-light">
            Contact avec les autorités locales :
          </strong>{" "}
          Il faut contacter les services de police ou la gendarmerie la plus
          proche pour déposer une plainte.
        </li>
        <li className="p-4 border border-indigo-300 rounded-lg bg-gray-50">
          <strong className="text-primary-light">
            Précautions à prendre :
          </strong>{" "}
          Être vigilant(e) et prudent(e) dans ses relations avec la population
          locale. Éviter de se déplacer seul(e) dans des endroits isolés,
          surtout la nuit. Conserver une attitude de prudence générale pour ne
          pas se mettre en danger.
        </li>
      </ul>
    </div>
  );
};

export default Procedure;
