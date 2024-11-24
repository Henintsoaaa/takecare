"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios"; // Import Axios
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Define the mapping for statuses
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

// Define the labels for the statuses
const statusLabels: string[] = [
  "Reçu",
  "En vérification",
  "En attente de documents",
  "Assigné",
  "En cours de traitement",
  "En attente de résolution",
  "Reporté",
  "Résolu",
  "Rejeté",
  "En appel",
  "Escalade",
  "Clôturé",
];

// Define the props for the StatusChart component
interface StatusChartProps {
  signalementId: number; // Assuming signalementId is a number
}

const StatusChart: React.FC<StatusChartProps> = ({ signalementId }) => {
  const [data, setData] = useState<any[]>([]); // Initialisez data comme un tableau vide
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
    labels: [], // Labels pour l'axe X
    datasets: [
      {
        label: "Historique des statuts",
        data: [], // Données pour l'axe Y
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Tentative de récupération des données...");
        // Commenting out the Axios logic
        /*
        const response = await axios.get(`http://localhost:3003/api/status-history/${signalementId}`);
        const result = response.data; // Directly use the data from the response
        console.log('Données récupérées:', result);
        */

        // Prototype data
        const prototypeData = [
          { change_date: "2023-10-01", new_status: "Reçu" },
          { change_date: "2023-10-05", new_status: "En vérification" },
          { change_date: "2023-10-10", new_status: "Assigné" },
          { change_date: "2023-10-15", new_status: "En cours de traitement" },
          { change_date: "2023-10-20", new_status: "Résolu" },
        ];

        const result = prototypeData; // Use prototype data instead of fetched data
        console.log("Données récupérées:", result);

        if (Array.isArray(result) && result.length > 0) {
          const dates = result.map(
            (item: { change_date: string }) => item.change_date
          );
          const statusCodes = result.map(
            (item: { new_status: string }) => statusMapping[item.new_status]
          );

          setData(result); // Met à jour les données

          setChartData({
            labels: dates,
            datasets: [
              {
                label: "Historique des statuts",
                data: statusCodes, // Utiliser les codes de statut
                fill: false,
                borderColor: "rgba(75,192,192,1)",
                tension: 0.1,
              },
            ],
          });
        } else {
          console.log("Aucune donnée trouvée.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, [signalementId]); // L'effet se déclenche lorsque signalementId change

  // Modifier la configuration pour afficher les légendes sur l'axe Y
  const options = {
    scales: {
      x: {
        type: "category" as const, // Specify the x-axis as a category scale
      },
      y: {
        ticks: {
          callback: function (tickValue: string | number) {
            return statusLabels[tickValue as number]; // Afficher le nom du statut en utilisant statusLabels
          },
        },
        // Option pour adapter l'échelle
        min: 0,
        max: 11,
        stepSize: 1,
      },
    },
  };

  return (
    <div>
      <h2>Historique des statuts pour le signalement {signalementId}</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default StatusChart;
