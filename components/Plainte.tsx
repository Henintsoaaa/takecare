"use client";
import { useState } from "react";
import axios from "axios";
import AudioCapture from "./AudioCapture";
import VideoCapture from "./VideoCapture";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  MapPin,
  Upload,
  Mic,
  Video,
  Send,
} from "lucide-react";

interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

const Plainte = ({ userId }: { userId: string }) => {
  const [cause, setCause] = useState("");
  const [aboutCountry, setAboutCountry] = useState("");
  const [aboutCity, setAboutCity] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [activeMedia, setActiveMedia] = useState<"audio" | "video" | null>(
    null
  );

  const handleFileChange = (event: FileChangeEvent) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("cause", cause);
    formData.append("country", aboutCountry);
    formData.append("city", aboutCity);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axios.post("/api/submit-complaint", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        redirect("/procedure");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting your complaint.");
    }
  };
  const handleLangue = () => {
    redirect("/langueSigne");
  };
  const handleBack = () => {
    redirect("/emotion-tracker");
  };

  return (
    <div className=" h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 relative">
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 text-indigo-600 hover:text-indigo-800 transition-all duration-300 p-2 rounded-full hover:bg-indigo-50"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Submit Your Complaint
          </h1>
          <p className="text-gray-500">Share your experience confidentially</p>
        </div>
        <div>
          <button
            onClick={handleLangue}
            className="  p-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center"
          >
            Langue des signes
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="flex items-center text-gray-700 font-semibold">
              <FileText className="mr-2 text-indigo-500" size={20} />
              Describe Your Complaint
            </label>
            <textarea
              value={cause}
              onChange={(e) => setCause(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
              placeholder="Provide details about your complaint..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-semibold">
                <MapPin className="mr-2 text-green-500" size={20} />
                Country
              </label>
              <input
                type="text"
                value={aboutCountry}
                onChange={(e) => setAboutCountry(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300 transition-all duration-300"
                placeholder="Your country"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-semibold">
                <MapPin className="mr-2 text-blue-500" size={20} />
                City
              </label>
              <input
                type="text"
                value={aboutCity}
                onChange={(e) => setAboutCity(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                placeholder="Your city"
                required
              />
            </div>
          </div>

          <div className="flex justify-between items-center space-x-4">
            <label className="flex-1 cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="flex items-center justify-center p-3 border-2 border-dashed border-indigo-200 rounded-lg hover:bg-indigo-50 transition-all">
                <Upload className="mr-2 text-indigo-500" />
                <span className="text-gray-600">
                  {file ? file.name : "Upload Document"}
                </span>
              </div>
            </label>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() =>
                setActiveMedia(activeMedia === "audio" ? null : "audio")
              }
              className={`flex-1 flex items-center justify-center p-3 rounded-lg transition-all ${
                activeMedia === "audio"
                  ? "bg-green-500 text-white"
                  : "bg-green-50 text-green-600 hover:bg-green-100"
              }`}
            >
              <Mic className="mr-2" />
              Audio Testimony
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveMedia(activeMedia === "video" ? null : "video")
              }
              className={`flex-1 flex items-center justify-center p-3 rounded-lg transition-all ${
                activeMedia === "video"
                  ? "bg-blue-500 text-white"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"
              }`}
            >
              <Video className="mr-2" />
              Video Testimony
            </button>
          </div>

          {activeMedia === "audio" && <AudioCapture />}
          {activeMedia === "video" && <VideoCapture />}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center"
          >
            <Send className="mr-2" />
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default Plainte;
