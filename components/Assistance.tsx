"use client";
import React, { useState } from "react";
import {
  prepareData,
  getSpecificRecommendations,
  createModel,
  trainModel,
  predictRecommendations,
} from "./model";

const Recommandation = () => {
  const [problemType, setProblemType] = useState("");
  const [severityLevel, setSeverityLevel] = useState(1);
  const [recommendations, setRecommendations] = useState<{
    advice: string;
    support: string;
    notice: string;
  } | null>(null);

  const initializeModel = async () => {
    const model = createModel();
    await trainModel(model);
    return model;
  };

  const handleGetRecommendations = async () => {
    const inputData = prepareData(problemType, severityLevel, "support"); // Objectif fixé à "support"
    const model = await initializeModel();
    const prediction = predictRecommendations(model, inputData);

    const specificRecommendations = getSpecificRecommendations({
      problemType,
      severityLevel,
      objective: "support", // Objectif fixé à "support"
    });

    setRecommendations({
      ...prediction,
      ...specificRecommendations,
    });
  };

  return (
    <div
      style={{
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: "#f9f9f9",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        <h1
          style={{ color: "#333", textAlign: "center", marginBottom: "20px" }}
        >
          Système de Recommandations
        </h1>
        <p style={{ textAlign: "center", color: "#666", marginBottom: "20px" }}>
          Obtenez des conseils et du support personnalisés pour les femmes.
        </p>

        {/* Formulaire */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Type de problème :
          </label>
          <select
            value={problemType}
            onChange={(e) => setProblemType(e.target.value)}
            style={{
              padding: "10px",
              width: "100%",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          >
            <option value="">-- Sélectionnez un type --</option>
            <option value="verbal">Harcèlement verbal</option>
            <option value="physical">Harcèlement physique</option>
            <option value="cyber">Harcèlement cyber</option>
            <option value="workplace">Harcèlement au travail</option>
            <option value="sexual">Harcèlement sexuel</option>
          </select>

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Niveau de gravité (1-5) :
          </label>
          <input
            type="number"
            min="1"
            max="5"
            value={severityLevel}
            onChange={(e) => setSeverityLevel(parseInt(e.target.value))}
            style={{
              padding: "10px",
              width: "100%",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          />

          <button
            onClick={handleGetRecommendations}
            style={{
              backgroundColor: "#4CAF50",
              color: "#ffffff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
              fontSize: "16px",
            }}
          >
            Obtenir des recommandations
          </button>
        </div>

        {/* Résultats */}
        {recommendations && (
          <div
            style={{
              marginTop: "20px",
              backgroundColor: "#f1f1f1",
              borderRadius: "10px",
              padding: "15px",
            }}
          >
            <h3 style={{ color: "#333" }}>Recommandations :</h3>
            <p style={{ color: "#666" }}>Conseil : {recommendations.advice}</p>
            <p style={{ color: "#666" }}>Support : {recommendations.support}</p>
            <p style={{ color: "#666" }}>Notice : {recommendations.notice}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommandation;
