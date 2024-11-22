"use client";
import React, { useEffect, useRef, useState } from "react";
import EmotionForm from "./EmotionForm";
import EmotionShare from "./EmotionPub";
import { Smile } from "lucide-react";

const userId = 2;

const EmotionTracker = () => {
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [wellbeingLevel, setWellbeingLevel] = useState(3);
  const [positiveMoment, setPositiveMoment] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isAppear, setIsAppear] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsAppear(true);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsAppear(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-800 mb-2">
          Partager vos idées, soyez à l'écoute !
        </h1>
        <p className="text-gray-600">Suivez votre bien-être jour après jour</p>
      </div>
      {/* when */}
      <div className="flex flex-col md:flex-row relative z-0">
        {isAppear && (
          <>
            <div
              className="fixed inset-0 bg-black opacity-50 z-20"
              onClick={() => setIsAppear(false)}
            />
            <div
              ref={formRef}
              className="z-30 fixed bottom-4 md:bottom-10 bg-white rounded-lg shadow-lg p-4 w-full md:max-w-md right-2 left-1"
            >
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
          </>
        )}
        <div className="md:hidden">
          <label htmlFor="entrie" className="text-gray-600">
            Comment vous sentez-vous aujourd'hui?
          </label>
          <div className="flex gap-2 justify-center items-center">
            <Smile size={24} className="text-indigo-500" />
            <input
              type="text"
              name="entrie"
              placeholder="Comment vous sentez-vous aujourd'hui?"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              onClick={handleClick}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row flex-grow">
          <div className="overflow-y-auto max-h-screen w-full md:max-w-3xl mx-auto">
            <EmotionShare />
          </div>
          <div className="fixed bottom-9 right-3 z-10 hidden md:block">
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
    </div>
  );
};

export default EmotionTracker;
