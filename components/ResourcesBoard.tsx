"use client";

import React, { useState, useEffect } from "react";

// Interface for the filter props
interface FiltersProps {
  onFilterChange: (filters: { priority: string }) => void;
}

// Composant des filtres
const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [priority, setPriority] = useState<string>("");

  // Appliquer les filtres à chaque modification de la priorité
  useEffect(() => {
    onFilterChange({ priority });
  }, [priority, onFilterChange]);

  return (
    <section className="bg-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-semibold text-gray-900 flex items-center space-x-2">
        <span>🔍</span>
        <span>Filtres</span>
      </h2>
      <div className="mt-6 space-y-6">
        {/* Filtre Priorité */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Priorité
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-2 block w-full bg-gray-50 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light transition-all duration-300"
          >
            <option value="">Tous</option>
            <option value="Faible">Faible</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Haute">Haute</option>
          </select>
        </div>
      </div>
    </section>
  );
};

const priorityColors: Record<string, string> = {
  Haute: "bg-red-500",
  Moyenne: "bg-yellow-500",
  Faible: "bg-green-500",
};

// Interface for a harassment case
interface HarassmentCase {
  id: number;
  priority: string;
  description: string;
  steps: string[];
  responsible_service: string;
  estimated_delays: string[];
}

// Sample harassment cases
const cases: HarassmentCase[] = [
  {
    id: 1,
    priority: "Haute",
    description: "Cas de harcèlement verbal au travail.",
    steps: ["Réception de la plainte", "Enquête", "Résolution"],
    responsible_service: "Ministère de la Justice Madagascar",
    estimated_delays: ["1 jour", "7 jours", "30 jours"],
  },
  // ... other cases
];

const HarassmentCasesBoard: React.FC = () => {
  const [filteredCases, setFilteredCases] = useState<HarassmentCase[]>(cases);

  // Fonction de mise à jour des filtres
  const handleFilterChange = (filters: { priority: string }) => {
    const { priority } = filters;

    const filtered = cases.filter((harassmentCase) =>
      priority ? harassmentCase.priority === priority : true
    );
    setFilteredCases(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6">
        Cas de Harcèlement des Femmes
      </h1>
      <Filters onFilterChange={handleFilterChange} />
      <table className="min-w-full table-auto bg-white rounded-lg shadow-lg overflow-hidden mt-6">
        <thead>
          <tr className="bg-indigo-50 border-b border-gray-200">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Description
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Priorité
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Responsable
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Étapes
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Délais estimés
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredCases.map((harassmentCase) => (
            <tr key={harassmentCase.id} className="border-b border-gray-200">
              <td className="px-6 py-4 text-sm text-gray-700">
                {harassmentCase.description}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700 flex items-center space-x-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    priorityColors[harassmentCase.priority]
                  }`}
                ></span>
                <span>{harassmentCase.priority}</span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {harassmentCase.responsible_service}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                <ul className="list-disc list-inside">
                  {harassmentCase.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                <ul className="list-disc list-inside">
                  {harassmentCase.estimated_delays.map((delay, index) => (
                    <li key={index}>{delay}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HarassmentCasesBoard;
