"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const WellBeingScoreMoyen = ({ userId }: { userId: number }) => {
  const [wellBeingScore, setWellBeingScore] = useState<number | null>(null);

  const fetchWellBeingScores = async () => {
    try {
      const response = await axios.get(
        `http://localhost/entries/read.php?user_id=${userId}`
      );
      const moodData = response.data as { date: string; niveau: number }[];

      // Get today's date and the date 7 days ago
      const today = new Date();
      const last7Days = new Date(today);
      last7Days.setDate(today.getDate() - 7);

      // Filter the moodData for the last 7 days
      const filteredData = moodData.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= last7Days && itemDate <= today;
      });

      // Calculate the average niveau
      const totalScore = filteredData.reduce(
        (acc, item) => acc + item.niveau,
        0
      );
      const averageScore =
        filteredData.length > 0 ? totalScore / filteredData.length : 0;

      setWellBeingScore(averageScore);
    } catch (error) {
      console.error("Error fetching well-being scores:", error);
    }
  };

  useEffect(() => {
    fetchWellBeingScores(); // Fetch scores when the component mounts
  }, [userId]); // Dependency array includes userId

  return (
    <div>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-red-500" />
            <div>
              <p className="text-sm text-gray-500">Bien-être moyen</p>
              <p className="font-medium">
                {wellBeingScore !== null ? wellBeingScore.toFixed(1) : "N/A"}/5
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WellBeingScoreMoyen;
