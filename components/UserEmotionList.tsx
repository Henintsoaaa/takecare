"use client";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure to import axios
import { Card, CardContent } from "./ui/card"; // Assuming you have a Card component

interface UserEmotionListProps {
  userId: string;
}

// Mapping of emotions to their corresponding emojis
const emotionEmojiMap: Record<string, string> = {
  Heureuse: "😊",
  Triste: "😢",
  Stressée: "😰",
  Frustrée: "😡",
  Fatiguée: "😴",
  Reconnaissante: "🥰",
};

const UserEmotionList: React.FC<UserEmotionListProps> = ({ userId }) => {
  const [userEmotion, setUserEmotion] = useState<
    {
      date: string;
      niveau: number;
      notes: string;
      positive_moment: string;
      emotion: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchUserEmotion = () => {
      axios
        .get<
          {
            date: string;
            niveau: number;
            notes: string;
            positive_moment: string;
            emotion: string;
          }[]
        >(`http://localhost:8080/entries/getData.php?user_id=${userId}`)
        .then((response) => {
          setUserEmotion(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user emotion data:", error);
        });
    };
    fetchUserEmotion();
  }, [userId]);

  return (
    <div className="p-5 flex flex-col gap-6 max-w-4xl mx-5 px-3">
      {userEmotion.length > 0 ? (
        userEmotion.map((emotionData, index) => (
          <Card
            key={index}
            className="bg-white border border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <CardContent className="p-6">
              <div className="flex flex-col">
                <div className="flex items-center mb-3">
                  <span className="font-bold text-2xl mr-2">
                    {emotionData.emotion}
                  </span>
                  <span className="text-3xl">
                    {emotionEmojiMap[emotionData.emotion]}
                  </span>
                </div>
                <p className="mt-1 text-gray-700">
                  <strong>Date:</strong>{" "}
                  {new Date(emotionData.date).toLocaleDateString()}
                </p>
                <p className="mt-1 text-gray-700">
                  <strong>Niveau:</strong> {emotionData.niveau}
                </p>
                <p className="mt-2 text-gray-800">{emotionData.notes}</p>
                <small className="text-gray-500">
                  <strong>Positive Moment:</strong>{" "}
                  {emotionData.positive_moment}
                </small>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-center text-lg text-gray-600">
          No emotions recorded for this user.
        </p>
      )}
    </div>
  );
};

export default UserEmotionList;
