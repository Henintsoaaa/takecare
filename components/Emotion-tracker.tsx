"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import EmotionForm from "./EmotionForm";
import EmotionShare from "./EmotionPub";

const userId = 2;

const EmotionTracker = () => {
  const router = useRouter(); // Initialize router for navigation
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [wellbeingLevel, setWellbeingLevel] = useState(3);
  const [positiveMoment, setPositiveMoment] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Function to handle redirection to UserEvaluation
  const handleRedirect = () => {
    router.push(`/userEvolution`); // Change this path to your actual UserEvaluation route
  };

  return (
    <div className=" md:max-w-6xl mx-auto p-4 space-y-6">
      {/* Redirect Button */}
      <div className="text-right">
        <button
          onClick={handleRedirect}
          className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Évaluer mon bien-être
        </button>
      </div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-800 mb-2">
          Partager vos idées, soyez à l'écoute !
        </h1>
        <p className="text-gray-600">Suivez votre bien-être jour après jour</p>
      </div>

      {/* Section principale */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scrollable container for EmotionShare */}
        <div className="overflow-y-auto max-h-screen">
          <EmotionShare />
        </div>
        {/* Scrollable container for EmotionForm */}
        <div className="overflow-y-auto max-h-screen">
          <EmotionForm
            selectedEmotion={selectedEmotion}
            setSelectedEmotion={setSelectedEmotion}
            wellbeingLevel={wellbeingLevel}
            setWellbeingLevel={setWellbeingLevel}
            positiveMoment={positiveMoment}
            setPositiveMoment={setPositiveMoment}
            notes={notes}
            setNotes={setNotes}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            userId={userId}
          />
        </div>
      </div>
    </div>
  );
};

export default EmotionTracker;
