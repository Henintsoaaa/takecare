"use client";
import { useState, useEffect } from "react";
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
  const [aboutDate, setAboutDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [activeMedia, setActiveMedia] = useState<"audio" | "video" | null>(
    null
  );
  const receiverId = 1; // Added receiverId state
  const [aboutHour, setAboutHour] = useState("");
  // const [receiverId, setReceiverId] = useState(0); // Added receiverId state
  const [searchQuery, setSearchQuery] = useState<string>(""); // Added search query state
  const [results, setResults] = useState<any[]>([]); // To store search results
  const [noResults, setNoResults] = useState<boolean>(false); // State to manage no results message
  const [securityUsers, setSecurityUsers] = useState<any[]>([]); // State to store users with "securite" role

  // useEffect(() => {
  //   // Fetch users with role "securite" when the component mounts
  //   const fetchSecurityUsers = async () => {
  //     try {
  //       const response = await axios.get(`/api/users?role=securite`);
  //       setSecurityUsers(response.data);
  //     } catch (error) {
  //       console.error("Error fetching security users:", error);
  //     }
  //   };

  //   fetchSecurityUsers();
  // }, []);

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
    formData.append("fullName", fullName);
    formData.append("date", aboutDate);
    formData.append("hour", aboutHour);
    formData.append("receiverId", receiverId.toString());
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_IP_KEY}/signalement/createSignalement`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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

  const handleSelect = (id: number) => {
    // setReceiverId(id); // Set the selected receiver ID
    console.log(`Selected receiver ID: ${id}`);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 relative">
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 text-indigo-600 hover:text-indigo-800 transition-all duration-300 p-2 rounded-full hover:bg-indigo-50"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb -2">
            Submit Your Complaint
          </h1>
          <p className="text-gray-500">Share your experience confidentially</p>
        </div>
        <div>
          <button
            onClick={handleLangue}
            className="p-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center"
          >
            Langue des signes
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Champ Nom Complet */}
          <div className="mb-4">
            <label className="font-normal text-3sm mb-2">Nom Complet :</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Entrez votre nom complet"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          {/* Champ Date */}
          <div className="mb-4">
            <label className="mb-2 font-normal text-3sm">Date :</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={aboutDate}
              onChange={(e) => setAboutDate(e.target.value)}
              required
            />
          </div>
          {/* Champ Heure */}
          <div className="mb-4">
            <label className="mb-2 font-normal text-3sm">Heure :</label>
            <input
              type="time"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={aboutHour}
              onChange={(e) => setAboutHour(e.target.value)}
              required
            />
          </div>
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

          <div className="mb-4">
            <label className="font-normal text-3sm mb-2">
              Sélectionner un récepteur :
            </label>
            <div className="mt-4">
              <ul className="flex flex-col space-y-2">
                {securityUsers.map((user) => (
                  <li
                    key={user.id}
                    className="flex items-center space-x-2 border-b pb-2"
                  >
                    <div>
                      <div className="flex items-center space-x-20 mb-2">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleSelect(user.id);
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="rounded-full overflow-hidden w-12 h-12">
                              <img
                                src={user.photo_path || "/default-avatar.png"}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex">
                              <span className="font-semibold">
                                {user.username}
                              </span>
                            </div>
                          </div>
                        </a>
                        <button
                          type="button"
                          className="bg-socialBlue text-white px-2 py-1 rounded-md"
                          onClick={() => handleSelect(user.id)}
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
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
