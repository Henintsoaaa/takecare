"use client";
import { useEffect, useState } from "react";

// Define interfaces for the data structures used in the component
interface Case {
  id: number;
  priority: string;
  description: string;
  steps: string[];
  responsible_service: string;
  estimated_delays: string[];
}

interface StatusHistory {
  change_date: string;
  new_step: string;
  comments: string;
}

interface InternalComment {
  change_date: string;
  comments: string;
}

interface Data {
  description: string;
  security_complaint: { signalement_id: number };
  status_history: StatusHistory[];
  internal_comments: InternalComment[];
}

const StatusForUser: React.FC = () => {
  const priorityColors: { [key: string]: string } = {
    Haute: "bg-red-500",
    Moyenne: "bg-yellow-500",
    Faible: "bg-green-500",
  };

  const cases: Case[] = [
    // ... (same case data as before)
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    // Simulate a data request
    setLoading(true);
    setTimeout(() => {
      setData({
        description: "Violence domestique physique.",
        security_complaint: { signalement_id: 1 },
        status_history: [
          {
            change_date: "2024-11-20",
            new_step: "Signalement à la police",
            comments: "Le signalement a été pris en charge rapidement.",
          },
        ],
        internal_comments: [
          {
            change_date: "2024-11-21",
            comments: "Une équipe est assignée pour suivre l'affaire.",
          },
        ],
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-semibold text-gray-800">Chargement...</h1>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-semibold text-gray-800">
          {error || "Aucune donnée disponible."}
        </h1>
      </div>
    );
  }

  const { description, security_complaint, status_history, internal_comments } =
    data;

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="max-w-5xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Détails du Signalement
        </h1>

        {/* Affichage des informations générales */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
            📋 Informations Générales
          </h2>
          <div className="space-y-4">
            <p className="text-lg text-gray-800">
              <span className="font-semibold text-blue-600">Description :</span>{" "}
              {description}
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-semibold text-blue-600">
                Service Responsable :
              </span>{" "}
              {cases[0].responsible_service}
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-semibold text-blue-600">
                Étape Suivante :
              </span>{" "}
              {cases[0].steps[1]}
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-semibold text-blue-600">
                Date Suivante :
              </span>{" "}
              2024-11-23
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-semibold text-blue-600">Priorité :</span>{" "}
              Haute ⚡
            </p>
          </div>
        </div>

        {/* Affichage des étapes et des délais */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            📌 Étapes à Suivre et Délais Estimés
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-lg mt-4">
            {cases[0].steps.map((step, index) => (
              <p key={index} className="text-gray-800">
                <span className="font-semibold text-blue-600">
                  Étape {index + 1} :
                </span>{" "}
                {step}{" "}
                <span className="italic text-gray-600">
                  (Délai estimé : {cases[0].estimated_delays[index]})
                </span>
              </p>
            ))}
          </div>
        </section>

        {/* Affichage des événements récents */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            📝 Actions Récentes
          </h2>
          {status_history && status_history.length > 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-lg mt-4 border-l-4 border-green-600">
              {status_history.map((comment, index) => (
                <p key={index} className="text-gray-700">
                  {comment.change_date} - {comment.new_step}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-4">
              Aucun événement récent disponible.
            </p>
          )}
        </section>

        {/* Affichage des commentaires internes */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            💬 Commentaires Internes
          </h2>
          {internal_comments && internal_comments.length > 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-lg mt-4 border-l-4 border-blue-600">
              {internal_comments.map((comment, index) => (
                <p key={index} className="text-gray-700">
                  {comment.change_date} - "{comment.comments}"
                </p>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-4">
              Aucun commentaire interne disponible.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default StatusForUser;
