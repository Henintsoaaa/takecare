"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
} from "chart.js";
import axios from "axios"; // Import Axios

// Register necessary components
ChartJS.register(
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LinearScale
);

// Define the interface for the expected response from the API
interface GeographicDistributionData {
  location: string;
  count: number;
}

const GeographicDistributionChart: React.FC = () => {
  const [data, setData] = useState<GeographicDistributionData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    // Fetch data using Axios
    /*
    axios
      .get<GeographicDistributionData[]>(
        "http://localhost:3003/api/geographic-distribution"
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Stop loading on error
      });
    */
    // Uncomment the following line to use mock data instead of fetching from the API
    setData(mockData);
    setLoading(false); // Stop loading after setting mock data
  }, []);

  if (loading)
    return <p className="text-center text-gray-600">Chargement...</p>;

  const chartData = {
    labels: data ? data.map((item) => item.location) : [],
    datasets: [
      {
        label: "Nombre de signalements",
        data: data ? data.map((item) => item.count) : [],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Répartition des signalements par région",
        font: {
          size: 20,
          weight: 700,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "white",
        bodyColor: "white",
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-4">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default GeographicDistributionChart;

// Generic mock data for testing
const mockData: GeographicDistributionData[] = [
  { location: "Région A", count: 10 },
  { location: "Région B", count: 20 },
  { location: "Région C", count: 15 },
  { location: "Région D", count: 25 },
  { location: "Région E", count: 30 },
];
