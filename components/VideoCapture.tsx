import React, { useRef, useState } from "react";

const VideoCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [webcamActive, setWebcamActive] = useState(false);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [videoURL, setVideoURL] = useState<string | null>(null);

  const toggleWebcam = async () => {
    if (webcamActive) {
      // Arrêter la webcam
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = (stream as MediaStream).getTracks();
          tracks.forEach((track: MediaStreamTrack) => track.stop());
        }
        videoRef.current.srcObject = null;
      }
      setWebcamActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }

        const recorder = new MediaRecorder(stream);
        let chunks: Blob[] = [];
        recorder.ondataavailable = (event) => chunks.push(event.data);
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: "video/mp4" });
          setVideoURL(URL.createObjectURL(blob));
          chunks = [];
        };
        setMediaRecorder(recorder);
        setWebcamActive(true);
      } catch (error) {
        console.error("Erreur lors de l’accès à la webcam:", error);
      }
    }
  };

  const handleVideoRecording = () => {
    if (recording) {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
      setRecording(false);
    } else {
      if (mediaRecorder) {
        mediaRecorder.start();
      }
      setRecording(true);
    }
  };

  const handleCloseVideo = () => {
    setVideoURL(null);
  };

  const handleDownloadVideo = () => {
    if (videoURL) {
      const a = document.createElement("a");
      a.href = videoURL;
      a.download = "recorded-video.mp4";
      a.click();
    }
  };

  return (
    <div className="p-4 border-2 border-gray-400 rounded-lg shadow-lg bg-white">
      <div className="relative mb-4">
        <video
          ref={videoRef}
          className="w-full h-auto border-2 border-gray-300 rounded-lg"
        />
      </div>
      {videoURL && (
        <div className="mt-4">
          <video
            src={videoURL}
            controls
            className="w-full h-auto border-2 border-gray-300 rounded-lg"
          />
          <div className="flex gap-4 mt-2">
            <button
              onClick={handleCloseVideo}
              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Fermer la vidéo
            </button>
            <button
              onClick={handleDownloadVideo}
              className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Télécharger la vidéo
            </button>
          </div>
        </div>
      )}
      <div className="flex gap-4 mt-4">
        <button
          onClick={toggleWebcam}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {webcamActive ? "Fermer webcam" : "Démarrer webcam"}
        </button>
        {webcamActive && (
          <button
            onClick={handleVideoRecording}
            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            {recording ? "Arrêter enregistrement" : "Démarrer enregistrement"}
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoCapture;
