"use client";
import React, { useEffect, useState } from "react";
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

    // Convert isAnonymous to 1 or 0
    const anonymousValue = isAnonymous ? 1 : 0;

    console.log("data:", {
      emotion: selectedEmotion,
      positive_moment: positiveMoment,
      note: notes,
      well_being_score: wellbeingLevel,
      user_id: userId,
      anonymous: anonymousValue, // Include the converted anonymity value in the submission data
    });

    // Send data to the specified endpoint
    axios
      .post("http://localhost:8080/entries/create.php", {
        emotion: selectedEmotion,
        positive_moment: positiveMoment,
        note: notes,
        well_being_score: wellbeingLevel,
        user_id: userId,
        isAnonyme: anonymousValue, // Include the converted anonymity value in the request
      })
      .then((response) => {
        console.log("Response:", response);
        // Optionally reset the form after submission
        setSelectedEmotion("");
        setWellbeingLevel(3);
        setPositiveMoment("");
        setNotes("");
        setIsAnonymous(false); // Reset anonymity checkbox
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          Comment vous sentez-vous aujourd'hui ?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmission} className="space-y-6">
          {/* Sélection d'émotion */}
          <EmotionList
            selectedEmotion={selectedEmotion}
            onSelectEmotion={setSelectedEmotion}
          />
          {/* Échelle de bien-être */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Niveau de bien-être
            </label>
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  type="button" // Ensure buttons don't submit the form
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    wellbeingLevel === level
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => setWellbeingLevel(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Positive Moment */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Moment positif
            </label>
            <input
              className="w-full p-3 border rounded-lg h-12 outline-none bg-white"
              value={positiveMoment}
              onChange={(e) => setPositiveMoment(e.target.value)}
            />
          </div>
          {/* Notes */}
          <div>
            <textarea
              className="w-full p-3 border rounded-lg h-24 outline-none bg-white"
              placeholder="Notez vos pensées..." // Corrected placeholder usage
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          {/* Anonymity Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="anonymous"
              checked={isAnonymous}
              onChange={() => setIsAnonymous(!isAnonymous)}
              className="mr-2"
            />
            <label htmlFor="anonymous" className="text-sm text-gray-700">
              Soumettre anonymement
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Enregistrer
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmotionForm;
