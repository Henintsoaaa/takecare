"use client";
import React, { useRef, useState, useEffect } from "react";

const VideoCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [prediction, setPrediction] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);
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
        setError(
          "Error accessing camera. Please make sure you have granted camera permissions."
        );
        console.error("Error accessing camera:", error);
      }
    };

    startCamera();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isCapturing) {
      interval = setInterval(() => {
        captureAndSend();
      }, 3000); // Capture every 3 seconds
    }

    return () => clearInterval(interval);
  }, [isCapturing]);

  const captureAndSend = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    setScreenshot(imageData);

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
        setError("Error sending image. Please check your network connection.");
        console.error("Error sending image:", error);
      }
    }, "image/png");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "16px",
        }}
      >
        <h1
          style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}
        >
          Automatic Video Frame Capture
        </h1>
        {error && (
          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#b91c1c",
              borderRadius: "8px",
              padding: "8px",
              marginBottom: "16px",
            }}
          >
            <strong>Error:</strong> {error}
          </div>
        )}
        <div
          style={{
            position: "relative",
            marginBottom: "16px",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "#000",
            aspectRatio: "16/9",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            aria-label="Video feed"
          ></video>
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            style={{ display: "none" }}
          ></canvas>
        </div>
        <button
          onClick={() => setIsCapturing((prev) => !prev)}
          style={{
            width: "100%",
            backgroundColor: isCapturing ? "#ef4444" : "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {isCapturing ? "Stop Capture" : "Start Capture"}
        </button>
        {screenshot && (
          <div style={{ marginTop: "16px" }}>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Latest Capture:
            </h3>
            <img
              src={screenshot}
              alt="Latest captured frame"
              style={{
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            />
          </div>
        )}
        {prediction && (
          <div style={{ marginTop: "16px" }}>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Traduction e l'image:
            </h3>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>{prediction}</p>
          </div>
        )}
        {isCapturing && (
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              alignItems: "center",
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            <div
              style={{
                marginRight: "8px",
                animation: "spin 1s linear infinite",
                border: "4px solid #6b7280",
                borderTop: "4px solid transparent",
                borderRadius: "50%",
                width: "16px",
                height: "16px",
              }}
            ></div>
            Capturing frames...
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCapture;
