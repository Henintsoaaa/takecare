import React, { useRef, useState } from "react";

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
      console.error("Error accessing webcam:", error);
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
      a.download = "recorded-video.mp4";
      a.click();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 border-2 border-gray-400 rounded-lg shadow-lg bg-white">
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
            <div className="flex gap-4 mt-2">
              <button
                onClick={handleCloseVideo}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Close Video
              </button>
              <button
                onClick={handleDownloadVideo}
                className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Download Video
              </button>
            </div>
          </div>
        )}
        <div className="flex gap-4 mt-4">
          <button
            onClick={toggleWebcam}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {webcamActive ? "Close Webcam" : "Start Webcam"}
          </button>
          {webcamActive && (
            <button
              onClick={handleVideoRecording}
              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              {recording ? "Stop Recording" : "Start Recording"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnregistrementVideo;
