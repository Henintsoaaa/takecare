"use client";
import { redirect } from "next/navigation"; // Import redirect for navigation
import UserEmotionList from "./UserEmotionList";
import Visualisation from "./Visualisation";
import EmotionMoyen from "./EmotionMoyen";
import WellBeingScoreMoyen from "./WellBeingScoreMoyen";
import { Card, CardContent } from "@/components/ui/card";
import { BellRing, LockKeyhole } from "lucide-react";
import Sidebar from "./Sidebar"; // Import the Sidebar component

const EmotionEvaluation = () => {
  const userId = 2;

  // Handler for redirecting to emotion-tracker
  const handleRedirect = () => {
    redirect("/emotion-tracker");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activePath="/emotion-tracker" />

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
        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {/* Reminders */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BellRing className="h-6 w-6 text-indigo-600" />
                  <span className="font-medium">Rappels quotidiens</span>
                </div>
                <button className="text-sm text-indigo-600 hover:underline">
                  Configurer
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <LockKeyhole className="h-6 w-6 text-green-600" />
                <span className="font-medium">Données sécurisées</span>
              </div>
            </CardContent>
          </Card>

          {/* Export */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Exporter les données</span>
                <button className="text-sm text-indigo-600 hover:underline">
                  Télécharger
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Redirect Button to Emotion Tracker */}
        <div className="mt-10 text-center">
          <button
            onClick={handleRedirect}
            className="px-6 py-3 bg-indigo -600 text-white rounded-md shadow-md hover:bg-indigo-700 transition duration-200 transform hover:scale-105"
          >
            Suivre mes émotions
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmotionEvaluation;
