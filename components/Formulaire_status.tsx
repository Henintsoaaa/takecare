"use client";
import { useState } from "react";

interface EvaluationFormProps {
  signalementId: number; // or number, depending on the type of signalementId
}

interface FormData {
  clarity: number;
  effectiveness: number;
  response_time: number;
  empathy: number;
  comment: string;
}

export default function EvaluationForm() {
  const [formData, setFormData] = useState<FormData>({
    clarity: 0,
    effectiveness: 0,
    response_time: 0,
    empathy: 0,
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "comment" ? value : Number(value), // Convert to number for numeric fields
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Inclure l'ID du signalement dans les données
    const dataToSave = { ...formData };

    try {
      const response = await fetch("http://localhost:3001/api/save-feedback", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement des données.");
      }

      alert("Évaluation soumise avec succès !");
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      alert("Une erreur est survenue lors de la soumission.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-800 text-center">
        Évaluation de l'aide reçue
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Clarté de la communication :
        </label>
        <input
          type="number"
          name="clarity"
          min="1"
          max="5"
          value={formData.clarity}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Efficacité de l’intervention :
        </label>
        <input
          type="number"
          name="effectiveness"
          min="1"
          max="5"
          value={formData.effectiveness}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Temps de réponse :
        </label>
        <input
          type="number"
          name="response_time"
          min="1"
          max="5"
          value={formData.response_time}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Soutien émotionnel :
        </label>
        <input
          type="number"
          name="empathy"
          min="1"
          max="5"
          value={formData.empathy}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Commentaire :
        </label>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={4}
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white text-lg font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Soumettre l’évaluation
      </button>
    </form>
  );
}
