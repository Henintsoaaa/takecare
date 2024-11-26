"use client";
import { redirect } from "next/navigation"; // Import redirect for navigation
import UserEmotionList from "./UserEmotionList";
import Visualisation from "./Visualisation";
import EmotionMoyen from "./EmotionMoyen";
import WellBeingScoreMoyen from "./WellBeingScoreMoyen";
import { Card, CardContent } from "@/components/ui/card";
import { BellRing, LockKeyhole } from "lucide-react";

interface EmotionEvaluationProps {
  userId: number;
}

const EmotionEvaluation = () => {
  let userId: number = 0;
  if (document.cookie) {
    userId = parseInt(document.cookie.split(",")[0].split("=")[1]);
  }
  // Handler for redirecting to emotion-tracker
  const handleRedirect = () => {
    redirect("/emotion-tracker");
  };

  return (
    <div className="flex min-h-full bg-gray-100">
      {/* Sidebar */}

      {/* Main Content Area */}
      <div className="flex-1 p-8 ml-64">
        {" "}
        {/* Increased padding for better spacing */}
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-indigo-800 mb-2">
            Journal Émotionnel
          </h1>
          <p className="text-lg text-gray-600">
            Suivez votre bien-être jour après jour
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <UserEmotionList userId={userId.toString()} />
          </div>
          <div className="flex-1 space-y-8">
            <Visualisation userId={userId} />

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EmotionMoyen userId={userId} />
              <WellBeingScoreMoyen userId={userId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionEvaluation;
