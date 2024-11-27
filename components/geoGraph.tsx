"use client";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface DataItem {
  location: string;
  count: number;
}

const GeographicDistributionChart: React.FC = () => {
  const [data] = useState<DataItem[]>([
    { location: "Antananarivo", count: 120 },
    { location: "Toamasina", count: 95 },
    { location: "Fianarantsoa", count: 75 },
    { location: "Mahajanga", count: 60 },
    { location: "Antsiranana", count: 45 },
    { location: "Toliara", count: 55 },
    { location: "Morondava", count: 35 },
    { location: "Ambositra", count: 40 },
    { location: "Fort Dauphin", count: 50 },
    { location: "Sambava", count: 30 },
  ]);

  if (!data) return <p>Chargement...</p>;

  const chartData = {
    labels: data.map((item) => item.location),
    datasets: [
      {
        label: "Nombre de signalements",
        data: data.map((item) => item.count),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <div className=" h-100">
      <h2>Répartition des signalements par région</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default GeographicDistributionChart;
