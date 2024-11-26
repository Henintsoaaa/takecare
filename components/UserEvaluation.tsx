"use client";

import { useEffect, useState } from "react";
import EvaluationForm from "@/components/Formulaire_status";

// Define the interface for the evaluation data structure
interface Evaluation {
  comment: string;
  clarity: number; // Ensure these are numbers
  effectiveness: number;
  response_time: number;
  empathy: number;
}

export default function Evaluations() {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  // Fetch evaluations from the server
  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const response = await fetch("http://localhost:3003/api/Evaluations");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const data = await response.json();

        // Check if the data is an object, and if so, wrap it in an array
        const evaluationsArray = Array.isArray(data) ? data : [data];

        console.log("Evaluations: ", evaluationsArray);
        setEvaluations(evaluationsArray); // Set the fetched data directly as an array
      } catch (error) {
        console.error("Erreur :", error);
      }
    };
    fetchEvaluations();
  }, []);

  // Helper function to render stars based on the rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`h-5 w-5 ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M12 17.75l-5.94 3.12 1.13-6.56L2.29 9.78l6.66-.58L12 2.5l2.04 6.72 6.66.58-4.9 4.63 1.13 6.56L12 17.75z"
          clipRule="evenodd"
        />
      </svg>
    ));
  };

  return (
    <div className="min-h-full bg-white p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Évaluations</h1>
      <div className="grid w-full sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {evaluations.length > 0 ? (
          evaluations.map((evaluation, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
            >
              <p className="text-gray-500 mb-4">
                <strong>Commentaire:</strong>{" "}
                {evaluation.comment || "Aucun commentaire"}
              </p>
              <div className="mb-4">
                <strong>Clarté:</strong>
                <div className="flex items-center space-x-1">
                  {renderStars(evaluation.clarity)}
                </div>
              </div>
              <div className="mb-4">
                <strong>Effectivité:</strong>
                <div className="flex items-center space-x-1">
                  {renderStars(evaluation.effectiveness)}
                </div>
              </div>
              <div className="mb-4">
                <strong>Temps de réponse:</strong>
                <div className="flex items-center space-x-1">
                  {renderStars(evaluation.response_time)}
                </div>
              </div>
              <div className="mb-4">
                <strong>Empathie:</strong>
                <div className="flex items-center space-x-1">
                  {renderStars(evaluation.empathy)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Aucune évaluation disponible.</p>
        )}
      </div>
      <button onClick={handleToggleForm}>Donner un feed-back</button>
      {showForm && <EvaluationForm />}
    </div>
  );
}
