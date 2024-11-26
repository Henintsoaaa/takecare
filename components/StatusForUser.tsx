"use client";
import React, { useEffect, useState } from "react";
// import axios from "axios"; // Import Axios
import StatusChart from "./StatusChart";

// Define the types for the data structure
interface SecurityComplaint {
  responsible_service?: string;
  current_status?: string;
  next_step?: string;
  next_date?: string;
  priority?: string;
  updated_at?: string;
  signalement_id: number; // Assuming this is required
}

interface StatusData {
  description: string;
  security_complaint: SecurityComplaint;
  status_history: Array<{
    change_date: string;
    new_step: string;
    comments?: string;
  }>;
  internal_comments?: string;
}

export default function StatusForUser() {
  const [data, setData] = useState<StatusData | null>(null); // Type for data
  const [loading, setLoading] = useState<boolean>(true); // Type for loading
  const [error, setError] = useState<string | null>(null); // Type for error

  useEffect(() => {
    const fetchData = async () => {
      // Commenting out the Axios logic
      /*
      try {
        const response = await axios.get(
          "http://localhost/Devoi_socila_media/src/backend/controllers/dasboard/getSecurityComplaints.php",
          {
            withCredentials: true, // Include credentials
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setData(response.data.data); // Assuming the data is in response.data.data
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
      */

      // Prototype data
      const prototypeData: StatusData = {
        description: "Exemple de description de signalement.",
        security_complaint: {
          responsible_service: "Service de Sécurité",
          current_status: "En cours",
          next_step: "Révision par le comité",
          next_date: "2023-10-15T00:00:00Z",
          priority: "Élevée",
          updated_at: "2023-10-01T12:00:00Z",
          signalement_id: 1,
        },
        status_history: [
          {
            change_date: "2023-10-01",
            new_step: "Signalement reçu",
            comments: "Le signalement a été enregistré avec succès.",
          },
          {
            change_date: "2023-10-05",
            new_step: "En cours d'examen",
            comments:
              "Le cas est actuellement examiné par le service compétent.",
          },
        ],
        internal_comments: "Commentaires internes sur le signalement.",
      };

      // Simulating a delay for loading
      setTimeout(() => {
        setData(prototypeData);
        setLoading(false);
      }, 1000); // Simulating a 1-second delay
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-full bg-gray-100">
        <h1 className="text-2xl font-semibold text-gray-800">Chargement...</h1>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-full bg-gray-100">
        <h1 className="text-2xl font-semibold text-gray-800">
          {error || "Aucune donnée disponible."}
        </h1>
      </div>
    );
  }

  const { description, security_complaint, status_history } = data;

  return (
    <div className="min-h-full bg-white text-gray-800">
      <div className="max-w-5xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Détails du Signalement
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
            <span role="img" aria-label="info">
              📋
            </span>{" "}
            Informations Générales
          </h2>
          <div className="space-y-4">
            <p className="text-lg text-gray-800">
              <span className="font-semibold text -blue-600">
                Description :
              </span>{" "}
              {description}
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-semibold text-blue-600">
                Service Responsable :
              </span>{" "}
              {security_complaint?.responsible_service || "Non spécifié"}
              <span role="img" aria-label="service">
                🔧
              </span>
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-semibold text-blue-600">
                Statut Actuel :
              </span>{" "}
              {security_complaint?.current_status || "Non spécifié"}
              <span role="img" aria-label="status">
                ✅
              </span>
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-semibold text-blue-600">
                Étape Suivante :
              </span>{" "}
              {security_complaint?.next_step || "Non spécifié"}
              <span role="img" aria-label="next-step">
                ➡️
              </span>
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-semibold text-blue-600">
                Date Suivante :
              </span>
              {security_complaint?.next_date
                ? new Date(security_complaint.next_date).toLocaleDateString()
                : "Non spécifiée"}
              <span role="img" aria-label="calendar">
                📅
              </span>
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-semibold text-blue-600">Priorité :</span>{" "}
              {security_complaint?.priority || "Non spécifiée"}
              <span role="img" aria-label="priority">
                ⚡
              </span>
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-semibold text-blue-600">
                Dernière Mise à Jour :
              </span>
              {security_complaint?.updated_at
                ? new Date(security_complaint.updated_at).toLocaleString()
                : "Non spécifiée"}
              <span role="img" aria-label="update">
                🔄
              </span>
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <StatusChart signalementId={security_complaint.signalement_id} />
          </div>
        </div>

        {/* Recents */}
        {status_history && status_history.length > 0 ? (
          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center space-x-2">
              <span className="bg-gray-200">
                <span>📝</span>Actions Récentes
              </span>
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-lg mt-4 border-l-4 border-green-600">
              {status_history.map((comment, index) => (
                <ul key={index} className="text-gray-700">
                  <li className="flex items-center space-x-2">
                    <span className="text-green-600">🟢</span>
                    <span className="text-gray-700">
                      {comment.change_date} - {comment.new_step}
                    </span>
                  </li>
                </ul>
              ))}
            </div>
          </section>
        ) : (
          <p className="text-gray-500 mt-10">
            Aucun événement récent disponible.
          </p>
        )}

        {/* Commentaires Internes */}
        {status_history && status_history.length > 0 ? (
          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center space-x-2">
              <span className="bg-gray-200">
                <span>💬</span>Commentaires Internes
              </span>
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-lg mt-4 border-l-4 border-blue-600">
              {status_history.map((comment, index) => (
                <p key={index} className="text-gray-700">
                  <span className="font-semibold">{comment.change_date} -</span>
                  <span className="italic">"{comment.comments}"</span>{" "}
                </p>
              ))}
            </div>
          </section>
        ) : (
          <p className="text-gray-500 mt-10">
            Aucun commentaire interne disponible.
          </p>
        )}
      </div>
    </div>
  );
}
