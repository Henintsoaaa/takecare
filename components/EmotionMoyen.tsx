"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Sun } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

// Mapping of emotion names to emojis
const emojiMapping: { [key: string]: string } = {
  Heureuse: "😊",
  Triste: "😢",
  Stressée: "😰",
  Frustrée: "😡",
  Fatiguée: "😴",
  Reconnaissante: "🥰",
};

const EmotionMoyen = ({ userId }: { userId: number }) => {
  const [emotionMoyen, setEmotionMoyen] = useState<string | null>(null);

  const fetchEmotionMoyen = async () => {
    try {
      const response = await axios.get(
        `http://localhost/entries/getData.php?user_id=${userId}`
      );
      const moodData = response.data as { date: string; emotion: string }[];

      const today = new Date();
      const last7Days = new Date(today);
      last7Days.setDate(today.getDate() - 7);

      // Filter the data for the last 7 days
      const filteredData = moodData.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= last7Days && itemDate <= today;
      });

      // Count occurrences of each emotion
      const emotionCount: Record<string, number> = {};
      filteredData.forEach((item) => {
        const emotion = item.emotion;
        emotionCount[emotion] = (emotionCount[emotion] || 0) + 1;
      });

      // Find the most frequent emotion
      const mostFrequentEmotion = Object.entries(emotionCount).reduce(
        (a, b) => (b[1] > a[1] ? b : a),
        ["", 0]
      )[0];

      setEmotionMoyen(mostFrequentEmotion || null); // Set the most frequent emotion or null if none
    } catch (error) {
      console.error("Error fetching emotions:", error);
    }
  };

  useEffect(() => {
    fetchEmotionMoyen(); // Fetch emotions when the component mounts
  }, [userId]); // Dependency array includes userId

  // Get the corresponding emoji for the most frequent emotion
  const emoji = emotionMoyen ? emojiMapping[emotionMoyen] : null;

  return (
    <div>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Sun className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-500">Humeur dominante</p>
              <p className="font-medium">
                {emotionMoyen ? `${emotionMoyen} ${emoji}` : "Aucune émotion"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmotionMoyen;
