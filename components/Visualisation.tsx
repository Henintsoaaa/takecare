"use client";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
} from "recharts";

// Accept userId as a prop
interface VisualisationProps {
  userId: number;
}

const Visualisation: React.FC<VisualisationProps> = ({ userId }) => {
  const [moodData, setMoodData] = useState<{ date: string; niveau: number }[]>(
    []
  );

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_IP_KEY}/entries/read.php?user_id=${userId}` // Use userId from props
        );
        setMoodData(response.data as { date: string; niveau: number }[]); // Set moodData with the response data
      } catch (error) {
        console.error("Error fetching mood data:", error);
      }
    };

    fetchMoodData();
  }, [userId]); // Dependency array includes userId

  // Get today's date
  const today = new Date();
  const last7Days = new Date(today);
  last7Days.setDate(today.getDate() - 7);

  // Filter the moodData to get only the last 7 days
  const filteredMoodData = moodData.filter((item) => {
    const itemDate = new Date(item.date); // Assuming the date format is compatible
    return itemDate >= last7Days && itemDate <= today;
  });

  return (
    <div className="w-full">
      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <LineChart className="h-5 w-5 mr-2 text-indigo-600" />
            Évolution du bien-être
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredMoodData}>
                <XAxis dataKey="date" />
                <YAxis domain={[1, 5]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="niveau"
                  stroke="#4f46e5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Visualisation;
