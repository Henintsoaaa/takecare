"use client";
import React, { useState } from "react";
import axios from "axios"; // Import axios
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import EmotionList from "./EmotionList"; // Adjust the import path as necessary

const EmotionForm: React.FC<{
  selectedEmotion: string;
  setSelectedEmotion: (emotion: string) => void;
  wellbeingLevel: number;
  setWellbeingLevel: (level: number) => void;
  positiveMoment: string;
  setPositiveMoment: (moment: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  userId: number;
}> = ({
  selectedEmotion,
  setSelectedEmotion,
  wellbeingLevel,
  setWellbeingLevel,
  positiveMoment,
  setPositiveMoment,
  notes,
  setNotes,
  selectedDate,
  setSelectedDate,
  userId,
}) => {
  const [isAnonymous, setIsAnonymous] = useState(false); // State for anonymity checkbox

  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const anonymousValue = isAnonymous ? 1 : 0;

    console.log("data:", {
      emotion: selectedEmotion,
      positive_moment: positiveMoment,
      note: notes,
      well_being_score: wellbeingLevel,
      user_id: userId,
      anonymous: anonymousValue,
    });

    axios
      .post(`${process.env.NEXT_PUBLIC_IP_KEY}/posts/create`, {
        emotion: selectedEmotion,
        positive_moment: positiveMoment,
        notes: notes,
        well_being_score: wellbeingLevel,
        user_id: userId,
        isAnonyme: anonymousValue,
      })
      .then((response) => {
        console.log("Response:", response);
        setSelectedEmotion("");
        setWellbeingLevel(3);
        setPositiveMoment("");
        setNotes("");
        setIsAnonymous(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Card className="rounded-lg overflow-hidden bg-white shadow-lg md:max-w-xl md:max-h-screen md:h-full ">
      {" "}
      {/* Adjusted max-width for web */}
      <CardHeader>
        <CardTitle className="text-sm md:text-lg font-semibold">
          {" "}
          {/* Adjusted font size for web */}
          Comment vous sentez-vous aujourd'hui ?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmission} className="space-y-4 flex flex-col">
          <EmotionList
            selectedEmotion={selectedEmotion}
            onSelectEmotion={setSelectedEmotion}
          />
          <div className="space-y-2">
            <label className="text-xs md:text-sm font-medium text-gray-700">
              Niveau de bien-être
            </label>
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  type="button"
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                    wellbeingLevel === level
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setWellbeingLevel(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <textarea
              className="w-full p-2 md:p-3 border rounded-lg h-16 md:h-24 outline-none bg-white focus:text-gray-700" // Adjusted height for web
              placeholder="Notez vos pensées..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="flex items-center text-xs md:text-sm">
            <input
              type="checkbox"
              id="anonymous"
              checked={isAnonymous}
              onChange={() => setIsAnonymous(!isAnonymous)}
              className="mr-1"
            />
            <label htmlFor="anonymous" className="text-gray-700">
              Soumettre anonymement
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-sm md:text-base"
          >
            Enregistrer
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmotionForm;
