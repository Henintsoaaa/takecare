"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import EmotionForm from "./EmotionForm";
import EmotionShare from "./EmotionPub";
import { Smile } from "lucide-react";
import PublicationStyle from "./PublicationStyle";

const userId = 2;

const EmotionTracker = () => {
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [wellbeingLevel, setWellbeingLevel] = useState(3);
  const [positiveMoment, setPositiveMoment] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isAppear, setIsAppear] = useState(false);

  // Reference for the EmotionForm
  const formRef = useRef<HTMLDivElement>(null);

  // Function to handle input click
  const handleClick = () => {
    setIsAppear(true);
  };

  // Effect to handle clicks outside the EmotionForm
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsAppear(false);
      }
    };

    // Attach event listener
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      // Clean up event listener on component unmount
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="md:max-w-6xl mx-auto p-4 space-y-6">
      <div className="text-center mb-8 sticky top-5 left-20">
        <h1 className="text-3xl font-bold text-indigo-800 mb-2">
          Partager vos idées, soyez à l'écoute !
        </h1>
        <p className="text-gray-600">Suivez votre bien-être jour après jour</p>
      </div>

      {/* Section principale */}
      <div className="flex md:flex-row">
        {isAppear && (
          <>
            {/* Overlay to allow clicks outside the EmotionForm */}
            <div
              className="fixed inset-0 bg-black opacity-50 z-20"
              onClick={() => setIsAppear(false)}
            />
            <div
              ref={formRef} // Attach ref to the EmotionForm container
              className="z-30 fixed bottom-4  top-48"
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
        <div className="md:hidden sm:block">
          <label htmlFor="entrie" className="text-gray-600 md:hidden">
            Comment vous sentez vous aujourd'hui?
          </label>
          <div className="flex gap-2 justify-center items-center">
            <Smile size={24} className="text-indigo-500" />
            <input
              type="text"
              name="entrie"
              placeholder="Comment vous sentez-vous aujourd'hui?"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={handleClick} // Show EmotionForm on input click
            />
          </div>
        </div>
        <div className="flex flex-col md:w-full md:flex-row">
          {/* Scrollable container for EmotionShare */}
          <div>
            <PublicationStyle />
          </div>
          <div className="overflow-y-auto max-h-screen w-full md:max-w-3xl mx-auto">
            {" "}
            {/* Adjusted width for web */}
            <EmotionShare />
          </div>
          <div className="fixed bottom-3 right-3">
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
