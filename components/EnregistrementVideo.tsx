"use client";
import React, { useRef, useState } from "react";
import { redirect } from "next/navigation";

const EnregistrementVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [webcamActive, setWebcamActive] = useState<boolean>(false);
  const [recording, setRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [videoURL, setVideoURL] = useState<string | null>(null);

  const toggleWebcam = async () => {
    if (webcamActive) {
      stopWebcam();
    } else {
      await startWebcam();
    }
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current!.srcObject = stream;
      videoRef.current!.play();

      const recorder = new MediaRecorder(stream);
      let chunks: Blob[] = [];
      recorder.ondataavailable = (event: BlobEvent) => chunks.push(event.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/mp4" });
        setVideoURL(URL.createObjectURL(blob));
        chunks = [];
      };
      setMediaRecorder(recorder);
      setWebcamActive(true);
    } catch (error) {
      console.error("Erreur d'accès à la webcam :", error);
    }
  };

  const stopWebcam = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream.getTracks().forEach((track) => track.stop());
    videoRef.current!.srcObject = null;
    setWebcamActive(false);
  };

  const handleVideoRecording = () => {
    if (recording) {
      mediaRecorder?.stop();
      setRecording(false);
    } else {
      mediaRecorder?.start();
      setRecording(true);
    }
  };

  const handleCloseVideo = () => setVideoURL(null);

  const handleDownloadVideo = () => {
    if (videoURL) {
      const a = document.createElement("a");
      a.href = videoURL;
      a.download = "enregistrement-video.mp4";
      a.click();
    }
  };

  const handleEnvoyer = () => {
    // Logic to handle sending the video
    redirect("/procedure");
    console.log("Video envoyé:", videoURL);
    // You can implement the actual sending logic here
  };

  return (
    <div className="flex flex-col justify-center h-full">
      <h1 className="text-center text-2xl font-bold mb-4">
        Exprimez-vous en vidéo
      </h1>
      <div className="p-6 border-2 border-gray-400 rounded-lg shadow-lg bg-white flex flex-col items-center">
        <div className="relative mb-4">
          <video
            ref={videoRef}
            className="w-96 h-auto border-2 border-gray-300 rounded-lg"
            autoPlay
            muted
          />
        </div>
        {videoURL && (
          <div className="mt-4">
            <video
              src={videoURL}
              controls
              className="w-96 h-auto border-2 border-gray-300 rounded-lg"
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleDownloadVideo}
                className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              >
                Télécharger
              </button>
              <button
                onClick={handleEnvoyer}
                className="p-2 bg-success text-white rounded-lg hover:bg-success-dark"
              >
                Envoyer
              </button>
            </div>
          </div>
        )}
        <div className="flex gap-4 mt-4">
          <button
            onClick={toggleWebcam}
            className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            {webcamActive ? "Fermer la Webcam" : "Démarrer la Webcam"}
          </button>
          {webcamActive && !recording && (
            <button
              onClick={handleVideoRecording}
              className="p-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark"
            >
              Démarrer l'enregistrement
            </button>
          )}
          {recording && (
            <button
              onClick={handleVideoRecording}
              className="p-2 bg-danger text-white rounded-lg hover:bg-danger-dark"
            >
              Arrêter l'enregistrement
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnregistrementVideo;
