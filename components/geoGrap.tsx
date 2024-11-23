import { useEffect, useState } from "react";
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
import axios from "axios"; // Import Axios

// Register necessary components
ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Define the interface for the expected response from the API
interface GeographicDistributionData {
  location: string;
  count: number;
}

const GeographicDistributionChart: React.FC = () => {
  const [data, setData] = useState<GeographicDistributionData[] | null>(null);

  useEffect(() => {
    // Fetch data using Axios
    /*
    axios
      .get<GeographicDistributionData[]>(
        "http://localhost:3003/api/geographic-distribution"
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle error (optional)
      });
      */
    // Uncomment the following line to use mock data instead of fetching from the API
    setData(mockData);
  }, []);

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
    <div>
      <h2>Répartition des signalements par région</h2>
      <Bar data={chartData} />
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
