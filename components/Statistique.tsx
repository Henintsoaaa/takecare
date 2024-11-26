"use client";
import { useEffect, useState } from "react";

interface Region {
  location: string;
  count: number;
}

interface Type {
  description: string;
  count: number;
}

interface StatutPlainte {
  current_status: string;
  count: number;
}

export default function Statistiques() {
  const [total, setTotal] = useState<number>(0);
  const [regions, setRegions] = useState<Region[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [parJour, setParJour] = useState<{ jour: string; count: number }[]>([]);
  const [tempsMoyen, setTempsMoyen] = useState<number>(0);
  const [statusPlaintes, setStatusPlaintes] = useState<StatutPlainte[]>([]);

  const statuses = [
    { label: "Reçu", color: "bg-blue-500" },
    { label: "En vérification", color: "bg-yellow-500" },
    { label: "En attente de résolution", color: "bg-orange-500" },
    { label: "Résolu", color: "bg-green-500" },
    { label: "Rejeté", color: "bg-red-500" },
    { label: "Assigné", color: "bg-teal-500" },
    { label: "En cours de traitement", color: "bg-secondary-light" },
    { label: "Reporté", color: "bg-gray-500" },
    { label: "En attente de documents", color: "bg-primary-light" },
    { label: "En appel", color: "bg-pink-500" },
    { label: "Clôturé", color: "bg-green-700" },
    { label: "Escalade", color: "bg-red-700" },
  ];

  useEffect(() => {
    // Données factices
    setTotal(1200); // Nombre total de plaintes

    setRegions([
      { location: "Antananarivo", count: 320 },
      { location: "Toamasina", count: 200 },
      { location: "Fianarantsoa", count: 150 },
      { location: "Mahajanga", count: 100 },
      { location: "Toliara", count: 120 },
      { location: "Antsiranana", count: 90 },
    ]);

    setTypes([
      { description: "Harcèlement verbal", count: 500 },
      { description: "Harcèlement physique", count: 300 },
      { description: "Harcèlement en ligne", count: 250 },
      { description: "Discrimination au travail", count: 150 },
    ]);

    setParJour([
      { jour: "2024-11-20", count: 25 },
      { jour: "2024-11-21", count: 30 },
      { jour: "2024-11-22", count: 40 },
      { jour: "2024-11-23", count: 35 },
      { jour: "2024-11-24", count: 45 },
    ]);

    setTempsMoyen(72); // Temps moyen en heures

    setStatusPlaintes([
      { current_status: "Reçu", count: 200 },
      { current_status: "En vérification", count: 150 },
      { current_status: "En attente de résolution", count: 100 },
      { current_status: "Résolu", count: 250 },
      { current_status: "Rejeté", count: 50 },
      { current_status: "Assigné", count: 80 },
      { current_status: "En cours de traitement", count: 20 },
    ]);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Nombre total de plaintes */}
      <div className=" bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          📊 Nombre total de plaintes
        </h2>
        <p className="text-xl text-gray-600">{total} plaintes signalées</p>
      </div>

      {/* Temps moyen de traitement */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          ⏱ Temps moyen de traitement
        </h2>
        <p className="text-xl text-gray-600">{tempsMoyen} heures</p>
      </div>

      {/* Répartition par statut des plaintes */}
      <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          📊 Répartition des plaintes par statut
        </h2>
        <ul>
          {statusPlaintes.map((status, index) => {
            const statusInfo = statuses.find(
              (s) => s.label === status.current_status
            );
            return (
              <li key={index} className="flex items-center space-x-2">
                <span
                  className={`w-4 h-4 rounded-full ${
                    statusInfo ? statusInfo.color : "bg-gray-300"
                  }`}
                ></span>
                <span>
                  {status.current_status}: {status.count}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Répartition par région */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          📍 Répartition par région
        </h2>
        <ul className="space-y-3">
          {regions.map((region, idx) => (
            <li key={idx} className="text-lg text-gray-700">
              {region.location}:{" "}
              <span className="font-bold">{region.count} plaintes</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Types de violences */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          🔴 Types de violences signalées
        </h2>
        <ul className="space-y-3">
          {types.map((type, idx) => (
            <li key={idx} className="text-lg text-gray-700">
              {type.description}:{" "}
              <span className="font-bold">{type.count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Statistiques par jour */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          📅 Statistiques par jour
        </h2>
        <ul className="space-y-3">
          {parJour.map((jour, idx) => (
            <li key={idx} className="text-lg text-gray-700">
              {jour.jour}:{" "}
              <span className="font-bold">{jour.count} plaintes</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
