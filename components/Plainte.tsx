"use client";
import { useState } from "react";
import axios from "axios";
import AudioCapture from "./AudioCapture";
import VideoCapture from "./VideoCapture";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// TypeScript interface for file change event
interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

const Plainte = ({ userId }: { userId: string }) => {
  const [cause, setCause] = useState("");
  const [aboutCountry, setAboutCountry] = useState("");
  const [aboutCity, setAboutCity] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: FileChangeEvent) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile && userId) {
      console.log("Fichier sélectionné :", selectedFile);
    } else {
      console.error("ID utilisateur ou fichier non sélectionné.");
      alert(
        "Veuillez sélectionner un fichier et vous assurer que l'ID utilisateur est chargé."
      );
    }
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
        alert("Complaint submitted successfully!");
        setCause("");
        setAboutCountry("");
        setAboutCity("");
        setFile(null);

        redirect("/procedure");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting your complaint.");
    }
  };

  const onClickLangue = () => {
    redirect("/langueSigne");
  };

  const handleBack = () => {
    redirect("/emotion-tracker"); // Redirect to the emotion-tracker page
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg relative">
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 text-indigo-600 hover:text-indigo-800 transition duration-300"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
      <h1 className="text-2xl font-bold text-center mb-6">
        Submit Your Complaint
      </h1>
      <div className="flex justify-between mb-4">
        <button
          onClick={onClickLangue}
          className="text-blue-500 hover:underline"
        >
          Commencer avec les langues des signes
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="cause"
            className="block mb-2 font-semibold text-gray-700"
          >
            Décrivez votre plainte
          </label>
          <input
            type="text"
            name="cause"
            value={cause}
            onChange={(e) => setCause(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your complaint here..."
            required
          />
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2 text-gray-700">I'm from</h2>
          <label
            htmlFor="country"
            className="block mb-2 font-normal text-gray-600"
          >
            Country:
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your country here..."
            value={aboutCountry}
            onChange={(e) => setAboutCountry(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="block mb-2 font-normal text-gray-600"
          >
            City:
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue -500"
            placeholder="Write your city here..."
            value={aboutCity}
            onChange={(e) => setAboutCity(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-between items-center mb-4">
          <label className="flex gap-1 items-center bg-white py-1 px-2 rounded-md shadow-md cursor-pointer">
            <input type="file" className="hidden" onChange={handleFileChange} />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 15V21h9V15M10.5 9V3h3v6m-7.5 4h3m5.25-9h4.5m-4.5 0l2.25-2.25m-2.25 2.25L15.75 3"
              />
            </svg>
            <span className="text-black">Upload</span>
          </label>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <AudioCapture />
          <VideoCapture />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Plainte;
