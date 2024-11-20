"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Emotion {
  emotion_id: number; // Matches the API response
  emotion_name: string; // Matches the API response
  emoji: string; // Added emoji property
}

// Mapping of emotion names to emojis
const emojiMapping: { [key: string]: string } = {
  Heureuse: "😊",
  Triste: "😢",
  Stressée: "😰",
  Frustrée: "😡",
  Fatiguée: "😴",
  Reconnaissante: "🥰",
};

const EmotionList: React.FC<{
  onSelectEmotion: (emotion: string) => void;
  selectedEmotion: string;
}> = ({ onSelectEmotion, selectedEmotion }) => {
  const [emotions, setEmotions] = useState<Emotion[]>([]);

  const fetchEmotions = async () => {
    try {
      const response = await axios.get<{ status: string; data: Emotion[] }>(
        "http://localhost:8080/emotion/read.php" // Ensure this URL is correct
      );
      if (response.data.status === "success") {
        // Map the fetched emotions to include emojis
        const emotionsWithEmojis = response.data.data.map((emotion) => ({
          ...emotion,
          emoji: emojiMapping[emotion.emotion_name] || "😊", // Default emoji if not found
        }));
        setEmotions(emotionsWithEmojis);
      }
    } catch (error) {
      console.error("Error fetching emotions:", error);
    }
  };

  useEffect(() => {
    fetchEmotions();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      {emotions.map((emotion) => (
        <span
          key={emotion.emotion_id} // Using emotion_id as the key
          className={`p-3 rounded-lg flex flex-col items-center transition-all duration-200 ${
            selectedEmotion === emotion.emotion_name
              ? "bg-indigo-200 border-2 border-indigo-600" // Highlight selected emotion
              : "bg-gray-50 hover:bg-gray-100" // Default theme
          }`}
          onClick={() => onSelectEmotion(emotion.emotion_name)} // Allow selection
        >
          <span className="text-2xl mb-1">{emotion.emoji}</span>{" "}
          {/* Displaying the emoji */}
          <span className="text-sm">{emotion.emotion_name}</span>
        </span>
      ))}
    </div>
  );
};

export default EmotionList;
