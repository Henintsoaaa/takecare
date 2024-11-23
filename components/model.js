import * as tf from "@tensorflow/tfjs";

// Préparer les données d'entrée en format numérique pour le modèle
const prepareData = (problemType, severityLevel, objective) => {
  const problemMap = {
    verbal: 1,
    physical: 2,
    cyber: 3,
    workplace: 4,
    sexual: 5,
  };

  const problemValue = problemMap[problemType] || 0; // Défaut : 0 si non trouvé
  const severityValue = Math.max(1, Math.min(severityLevel, 5)); // Limité à 1-5
  const objectiveValue = objective === "support" ? 1 : 0; // 1 pour support, 0 pour conseil

  return [problemValue, severityValue, objectiveValue];
};

// Recommandations spécifiques basées sur le type de problème
const getSpecificRecommendations = ({ problemType, severityLevel, objective }) => {
  if (problemType === "sexual" && objective === "advice") {
    return {
      advice: "Consultez immédiatement un avocat ou une association spécialisée pour des conseils.",
      support: "Contactez une hotline de soutien pour obtenir de l'aide immédiate.",
      notice: "Utilisez notre plateforme pour porter plainte et suivre le processus de plainte.",
    };
  }

  if (problemType === "sexual" && objective === "support") {
    return {
      advice: "Entourez-vous d'amis ou de famille pour un soutien émotionnel.",
      support: "Rendez-vous dans un centre d'aide local pour signaler l'incident.",
      notice: "Utilisez notre plateforme pour porter plainte et suivre le processus de plainte.",
    };
  }

  if (problemType === "workplace" && severityLevel >= 4 && objective === "support") {
    return {
      advice: "Signalez l'incident à votre service des ressources humaines.",
      support: "Consultez un conseiller juridique spécialisé en droit du travail.",
      notice: "Utilisez notre plateforme pour porter plainte et suivre le processus de plainte.",
    };
  }

  // Recommandations par défaut
  return {
    advice: "Consultez des ressources fiables pour obtenir de l'aide.",
    support: "Contactez un professionnel pour un soutien approprié.",
    notice: "Utilisez notre plateforme pour porter plainte et suivre le processus de plainte.",
  };
};

// Créer et compiler le modèle
const createModel = () => {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 8, inputShape: [3], activation: "relu" }));
  model.add(tf.layers.dense({ units: 6, activation: "relu" }));
  model.add(tf.layers.dense({ units: 3, activation: "softmax" })); // 3 sorties : advice, support, notice
  model.compile({
    optimizer: tf.train.adam(),
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"],
  });
  return model;
};

// Entraîner le modèle avec des données simulées
const trainModel = async (model) => {
  const trainData = tf.tensor2d([
    [1, 3, 0], // Verbal, gravité 3, objectif conseil
    [5, 4, 1], // Sexuel, gravité 4, objectif support
    [2, 2, 0], // Physique, gravité 2, objectif conseil
  ]);
  const outputData = tf.tensor2d([
    [1, 0, 0], // Conseil recommandé
    [0, 1, 1], // Support + Notice recommandé
    [1, 0, 0], // Conseil recommandé
  ]);

  await model.fit(trainData, outputData, {
    epochs: 100,
    batchSize: 3,
  });

  console.log("Modèle entraîné!");
};

// Prédire les recommandations basées sur les données utilisateur
const predictRecommendations = (model, userData) => {
  const inputTensor = tf.tensor2d([userData]);
  const prediction = model.predict(inputTensor);
  const [advice, support, notice] = prediction.dataSync(); // Résultat
  return {
    advice: advice > 0.5 ? "Conseil recommandé par le modèle." : "Conseil non prioritaire.",
    support: support > 0.5 ? "Support recommandé par le modèle." : "Support non prioritaire.",
    notice: notice > 0.5 ? "Utilisez notre plateforme pour porter plainte." : "Notice non prioritaire.",
  };
};

export {
  prepareData,
  getSpecificRecommendations,
  createModel,
  trainModel,
  predictRecommendations,
};
