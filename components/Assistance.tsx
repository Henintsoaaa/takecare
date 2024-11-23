"use client";
import { useState } from "react";
import { redirect } from "next/navigation"; // Import useRouter to handle navigation
import {
  prepareData,
  getSpecificRecommendations,
  createModel,
  trainModel,
  predictRecommendations,
} from "./model";
import { ArrowLeft } from "lucide-react"; // Import an arrow icon

const Recommandation = () => {
  const [problemType, setProblemType] = useState("");
  const [severityLevel, setSeverityLevel] = useState(1);
  const [recommendations, setRecommendations] = useState<{
    advice: string;
    support: string;
    notice: string;
  } | null>(null);

  const initializeModel = async () => {
    const model = createModel();
    await trainModel(model);
    return model;
  };

  const handleGetRecommendations = async () => {
    const inputData = prepareData(problemType, severityLevel, "support"); // Objectif fixé à "support"
    const model = await initializeModel();
    const prediction = predictRecommendations(model, inputData);

    const specificRecommendations = getSpecificRecommendations({
      problemType,
      severityLevel,
      objective: "support", // Objectif fixé à "support"
    });

    setRecommendations({
      ...prediction,
      ...specificRecommendations,
    });
  };
  const handleBack = () => {
    redirect("/emotion-tracker");
  };

  return (
    <div className="font-sans bg-gray-100 p-6">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="mr-2" />
          Retour à Emotion Tracker
        </button>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Système de Recommandations
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Obtenez des conseils et du support personnalisés pour les femmes.
        </p>

        {/* Formulaire */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Type de problème :
          </label>
          <select
            value={problemType}
            onChange={(e) => setProblemType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          >
            <option value="">-- Sélectionnez un type --</option>
            <option value="verbal">Harcèlement verbal</option>
            <option value="physical">Harcèlement physique</option>
            <option value="cyber">Harcèlement cyber</option>
            <option value="workplace">Harcèlement au travail</option>
            <option value="sexual">Harcèlement sexuel</option>
          </select>

          <label className="block text-gray-700 font-semibold mb-1">
            Niveau de gravité (1-5) :
          </label>
          <input
            type="number"
            min="1"
            max="5"
            value={severityLevel}
            onChange={(e) => setSeverityLevel(parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />

          <button
            onClick={handleGetRecommendations}
            className="bg-green-500 text-white rounded-md py-2 hover:bg-green-600 transition duration-200 w-full font-semibold"
          >
            Obtenir des recommandations
          </button>
        </div>

        {/* Résultats */}
        {recommendations && (
          <div className="mt-6 bg-gray-200 rounded-lg p-4">
            <h3 className="text-gray-800 font-semibold">Recommandations :</h3>
            <p className="text-gray-700">Conseil : {recommendations.advice}</p>
            <p className="text-gray-700">Support : {recommendations.support}</p>
            <p className="text-gray-700">Notice : {recommendations.notice}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommandation;
