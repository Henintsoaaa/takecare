"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Emotion {
  emotion_id: number;
  emotion_name: string;
  emoji: string;
}

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
        `${process.env.NEXT_PUBLIC_IP_KEY}/Hack4Her/emotion`
      );
      console.log(response);

      if (response.data.status === "success") {
        const emotionsWithEmojis = response.data.data.map((emotion) => ({
          ...emotion,
          emoji: emojiMapping[emotion.emotion_name] || "😊",
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
    <div className="grid grid-cols-3 gap-2 md:grid-cols-3">
      {" "}
      {/* Adjusted grid for web */}
      {emotions.map((emotion) => (
        <span
          key={emotion.emotion_id}
          className={`p-2 rounded-lg flex flex-col items-center transition-all duration-200 ${
            selectedEmotion === emotion.emotion_name
              ? "bg-indigo-200 border-2 border-indigo-600 text-gray-600"
              : "bg-gray-50 hover:bg-gray-100 text-gray-600"
          }`}
          onClick={() => onSelectEmotion(emotion.emotion_name)}
        >
          <span className="text-xl mb-1">{emotion.emoji}</span>
          <span className="text-xs md:text-sm">
            {emotion.emotion_name}
          </span>{" "}
          {/* Adjusted font size for web */}
        </span>
      ))}
    </div>
  );
};

export default EmotionList;
