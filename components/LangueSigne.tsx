"use client";

import React, { useRef, useState, useEffect } from "react";

// Configuration for button colors
const buttonColors = {
  start: {
    default: "bg-green-500",
    hover: "bg-green-600",
  },
  stop: {
    default: "bg-red-500",
    hover: "bg-red-600",
  },
};

const VideoCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fullshot, setFullshot] = useState<string | null>(null);
  const [prediction, setPrediction] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Erreur lors de l'accès à la caméra :", error);
        setError("Erreur lors de l'accès à la caméra.");
      }
    };

    startCamera();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isCapturing) {
      interval = setInterval(() => {
        captureAndSend();
      }, 3000); // Capture toutes les 3 secondes
    }

    return () => clearInterval(interval); // Nettoyage de l'intervalle lors du démontage ou de l'arrêt
  }, [isCapturing]);

  const captureAndSend = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video) return;

    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
    const imageData = canvas.toDataURL("image/png");
    setFullshot(imageData);

    setLoading(true); // Set loading state before sending the image
    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const formData = new FormData();
      formData.append("file", blob, `capture_${Date.now()}.png`);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_IP1_KEY}/upload/`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        setPrediction((prev) => prev + (data.prediction || ""));
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'image :", error);
        setError("Erreur lors de l'envoi de l'image.");
      } finally {
        setLoading(false); // Reset loading state after the request
      }
    }, "image/png");
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Capture automatique des frames vidéo
      </h1>
      <div className="relative mb-4">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full max-w-md h-auto border border-gray-300 rounded-lg shadow-lg"
        ></video>
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          className="hidden"
        ></canvas>
      </div>
      <div className="mt-4">
        <button
          onClick={() => setIsCapturing((prev) => !prev)}
          className={`px-6 py-3 font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out ${
            isCapturing
              ? `${buttonColors.stop.default} hover:${buttonColors.stop.hover}`
              : `${buttonColors.start.default} hover:${buttonColors.start.hover}`
          } text-white`}
        >
          {isCapturing ? "Arrêter la capture" : "Commencer la capture"}
        </button>
      </div>
      {loading && (
        <div className="mt-4 text-center">
          <p className="text-lg text-blue-600">Envoi en cours...</p>
        </div>
      )}
      {error && (
        <div className="mt-4 text-center">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      )}
      {fullshot && (
        <img
          src={fullshot}
          alt="fullshot"
          className="mt-4 border border-gray-300 rounded-lg shadow-lg"
        />
      )}
      {prediction && (
        <p className="mt-2 text-lg text-gray-800 font-medium">
          Prédiction : {prediction}
        </p>
      )}
    </div>
  );
};

export default VideoCapture;
