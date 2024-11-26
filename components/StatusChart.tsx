"use client";
import React, { useState } from "react";
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
import { Card } from "./ui/card";
import { Tabs, TabsContent } from "./ui/tabs";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Define colors for different statuses
interface Status {
  label: string;
  color: string;
}

const statuses: Status[] = [
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

// Colors for priorities
const priorityColors: Record<string, string> = {
  Haute: "rgba(239, 68, 68, 0.7)",
  Moyenne: "rgba(234, 179, 8, 0.7)",
  Faible: "rgba(34, 197, 94, 0.7)",
};

// Function to get status color
const getStatusColor = (status: string): string => {
  const matchedStatus = statuses.find((item) => item.label === status);
  return matchedStatus ? matchedStatus.color : "rgba(107, 114, 128, 0.7)";
};

// Function to get priority color
const getPriorityColor = (priority: string): string => {
  const normalizedPriority =
    priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();
  return priorityColors[normalizedPriority] || "rgba(107, 114, 128, 0.7)";
};

// Main chart component
const StatusChart: React.FC = () => {
  const [currentStatusData] = useState<
    { current_status: string; count: number }[]
  >([
    { current_status: "Reçu", count: 120 },
    { current_status: "En vérification", count: 90 },
    { current_status: "En attente de résolution", count: 60 },
    { current_status: "Résolu", count: 150 },
    { current_status: "Rejeté", count: 30 },
    { current_status: "Assigné", count: 80 },
    { current_status: "En cours de traitement", count: 70 },
    { current_status: "Reporté", count: 20 },
    { current_status: "En attente de documents", count: 50 },
    { current_status: "En appel", count: 40 },
    { current_status: "Clôturé", count: 100 },
    { current_status: "Escalade", count: 10 },
  ]);

  const [priorityData] = useState<{ priority: string; count: number }[]>([
    { priority: "Haute", count: 200 },
    { priority: "Moyenne", count: 150 },
    { priority: "Faible", count: 100 },
  ]);

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
    <Tabs>
      <TabsContent value="overview" className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
            <h3 className="font-semibold mb-4">État des signalements</h3>
            <div className="h-[300px]">
              <Bar data={currentStatusChartData} />
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
            <h3 className="font-semibold mb-4">Priorité des signalements</h3>
            <div className="h-[300px]">
              <Pie data={priorityChartData} />
            </div>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default StatusChart;
