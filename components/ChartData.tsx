"use client";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define the type for the data structure you expect from the API
interface ReportData {
  full_name: string;
  count: number;
}

const ReportsByPersonChart: React.FC = () => {
  const [data, setData] = useState<ReportData[] | null>(null); // Define the state type

  useEffect(() => {
    // Use Axios to fetch the data
    /*
    axios.get<ReportData[]>("http://localhost:3003/api/reports-by-person")
      .then((response) => {
        setData(response.data); // Set the data received from the API
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
    */

    // Mock data to simulate API response
    const mockData: ReportData[] = [
      { full_name: "Alice Dupont", count: 10 },
      { full_name: "Bob Martin", count: 15 },
      { full_name: "Chloé Bernard", count: 7 },
      { full_name: "David Lefebvre", count: 5 },
    ];

    setData(mockData); // Set the mock data to state
  }, []);

  if (!data) return <p>Chargement...</p>;

  const chartData = {
    labels: data.map((item) => item.full_name),
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Nombre de signalements par personne</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default ReportsByPersonChart;
