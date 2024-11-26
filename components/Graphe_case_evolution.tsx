"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import SecurityComplaintForm from "@/components/SecurityComplaintForm"; // Import the SecurityComplaintForm component

// Enregistrez les éléments requis pour les graphiques
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface StatusData {
  nextDate: string;
  status: string;
}

const statusMapping: Record<string, number> = {
  Reçu: 0,
  "En vérification": 1,
  "En attente de documents": 2,
  Assigné: 3,
  "En cours de traitement": 4,
  "En attente de résolution": 5,
  Reporté: 6,
  Résolu: 7,
  Rejeté: 8,
  "En appel": 9,
  Escalade: 10,
  Clôturé: 11,
};

const statusLabels = Object.keys(statusMapping);

const StatusChartEvolution: React.FC = () => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      fill: boolean;
      borderColor: string;
      tension: number;
    }[];
  }>({
    labels: [], // Dates
    datasets: [
      {
        label: "Historique des statuts",
        data: [], // Indices des statuts
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  });

  const [showForm, setShowForm] = useState<boolean>(false); // State to manage form visibility

  const options = {
    scales: {
      y: {
        ticks: {
          callback: function (tickValue: string | number) {
            return statusLabels[Number(tickValue)]; // Afficher les noms des statuts
          },
        },
        min: 0,
        max: statusLabels.length - 1,
        stepSize: 1,
      },
    },
  };

  useEffect(() => {
    // Charger les données depuis le serveur
    fetch("http://localhost:3003/api/Datastatus")
      .then((response) => response.json())
      .then((data: StatusData[]) => {
        const dates = data.map((item) => item.nextDate);
        const statuses = data.map((item) => statusMapping[item.status]);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: "Historique des statuts",
              data: statuses,
              fill: false,
              borderColor: "rgba(75,192,192,1)",
              tension: 0.1,
            },
          ],
        });
      })
      .catch((error) =>
        console.error("Erreur lors du chargement des données:", error)
      );
  }, []);

  const handleToggleForm = () => {
    setShowForm(!showForm); // Toggle the form visibility
  };

  return (
    <div className="relative p-4">
      {showForm ? (
        <>
          <SecurityComplaintForm signalementId={123} />{" "}
          {/* Replace "some-id" with the actual signalementId */}
          <button
            onClick={handleToggleForm}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Retour
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Historique des statuts pour le signalement
          </h2>
          <button
            onClick={handleToggleForm}
            className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Mon Suivi
          </button>
          <Line data={chartData} options={options} />
        </>
      )}
    </div>
  );
};

export default StatusChartEvolution;
