"use client";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

// Define the type for the data structure you expect from the API
interface ReportData {
  full_name: string;
  count: number;
}

const ReportsByPersonChart: React.FC = () => {
  const [data, setData] = useState<ReportData[] | null>(null); // Define the state type

  useEffect(() => {
    fetch("http://localhost:3003/api/reports-by-person")
      .then((response) => response.json())
      .then((data: ReportData[]) => setData(data)); // Type the data received from the API
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
