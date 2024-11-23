import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import axios from "axios"; // Import Axios

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Define the interface for the expected response from the API
interface CurrentStatusData {
  current_status: string;
  count: number;
}

interface PriorityData {
  priority: string;
  count: number;
}

// Define colors for each status
const statuses = [
  { label: "Reçu", color: "rgba(59, 130, 246, 0.7)" },
  { label: "En vérification", color: "rgba(234, 179, 8, 0.7)" },
  { label: "En attente de résolution", color: "rgba(249, 115, 22, 0.7)" },
  { label: "Résolu", color: "rgba(34, 197, 94, 0.7)" },
  { label: "Rejeté", color: "rgba(239, 68, 68, 0.7)" },
  { label: "Assigné", color: "rgba(20, 184, 166, 0.7)" },
  { label: "En cours de traitement", color: "rgba(168, 85, 247, 0.7)" },
  { label: "Reporté", color: "rgba(107, 114, 128, 0.7)" },
  { label: "En attente de documents", color: "rgba(99, 102, 241, 0.7)" },
  { label: "En appel", color: "rgba(236, 72, 153, 0.7)" },
  { label: "Clôturé", color: "rgba(16, 185, 129, 0.7)" },
  { label: "Escalade", color: "rgba(185, 28, 28, 0.7)" },
];

// Define a palette of colors for priorities
const priorityColors: { [key: string]: string } = {
  Haute: "rgba(239, 68, 68, 0.7)", // Red
  Moyenne: "rgba(234, 179, 8, 0.7)", // Yellow
  Faible: "rgba(34, 197, 94, 0.7)", // Green
};

// Function to get the color of a status
const getStatusColor = (status: string): string => {
  const matchedStatus = statuses.find((item) => item.label === status);
  return matchedStatus ? matchedStatus.color : "rgba(107, 114, 128, 0.7)"; // Default gray
};

// Function to get the color of a priority
const getPriorityColor = (priority: string): string => {
  const normalizedPriority =
    priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();
  return priorityColors[normalizedPriority] || "rgba(107, 114, 128, 0.7)"; // Default gray
};

const SignalementCharts: React.FC = () => {
  const [currentStatusData, setCurrentStatusData] = useState<
    CurrentStatusData[]
  >([]);
  const [priorityData, setPriorityData] = useState<PriorityData[]>([]);

  useEffect(() => {
    // Uncomment to fetch data for current_status using Axios
    /*
    axios.get<CurrentStatusData[]>("http://localhost:3003/api/current-status-distribution")
      .then((response) => {
        setCurrentStatusData(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données pour current_status", error);
      });

    // Uncomment to fetch data for priority using Axios
    axios.get<PriorityData[]>("http://localhost:3003/api/priority-distribution")
      .then((response) => {
        setPriorityData(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données pour priority", error);
      });
    */

    // Generic mock data for testing
    const mockCurrentStatusData: CurrentStatusData[] = [
      { current_status: "Reçu", count: 10 },
      { current_status: "En vérification", count: 5 },
      { current_status: "En attente de résolution", count: 8 },
      { current_status: "Résolu", count: 15 },
      { current_status: "Rejeté", count: 2 },
      { current_status: "Assigné", count: 7 },
      { current_status: "En cours de traitement", count: 3 },
      { current_status: "Reporté", count: 1 },
      { current_status: "En attente de documents", count: 4 },
      { current_status: "En appel", count: 6 },
      { current_status: "Clôturé", count: 12 },
      { current_status: "Escalade", count: 0 },
    ];

    const mockPriorityData: PriorityData[] = [
      { priority: "Haute", count: 5 },
      { priority: "Moyenne", count: 10 },
      { priority: "Faible", count: 15 },
    ];

    // Set mock data to state
    setCurrentStatusData(mockCurrentStatusData);
    setPriorityData(mockPriorityData);
  }, []);

  // Prepare data for the `current_status` chart
  const currentStatusChartData = {
    labels: currentStatusData.map((item) => item.current_status),
    datasets: [
      {
        label: "Répartition par État",
        data: currentStatusData.map((item) => item.count),
        backgroundColor: currentStatusData.map((item) =>
          getStatusColor(item.current_status)
        ),
      },
    ],
  };

  // Prepare data for the `priority` chart
  const priorityChartData = {
    labels: priorityData.map(
      (item) =>
        item.priority.charAt(0).toUpperCase() +
        item.priority.slice(1).toLowerCase()
    ),
    datasets: [
      {
        label: "Répartition par Priorité",
        data: priorityData.map((item) => item.count),
        backgroundColor: priorityData.map((item) =>
          getPriorityColor(item.priority)
        ),
      },
    ],
  };

  return (
    <div>
      <h2>Répartition des signalements</h2>

      {/* Bar chart for `current_status` */}
      <h3>État des signalements</h3>
      <Bar data={currentStatusChartData} />

      {/* Pie chart for `priority` */}
      <h3>Priorité des signalements</h3>
      <Pie data={priorityChartData} />
    </div>
  );
};

export default SignalementCharts;
