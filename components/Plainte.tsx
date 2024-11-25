"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileText, MapPin, Upload, Send } from "lucide-react";

const Plainte = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const redirect = (path: string) => {
    router.push(path);
  };

  const [cause, setCause] = useState("");
  const [aboutCountry, setAboutCountry] = useState("");
  const [aboutCity, setAboutCity] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [aboutDate, setAboutDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [aboutHour, setAboutHour] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("full_name", fullName);
    formData.append("city", aboutCity);
    formData.append("location", aboutCountry);
    formData.append("hour", aboutHour);
    formData.append("description", cause);
    formData.append("date", aboutDate);
    if (file) {
      formData.append("file_path", file);
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

      if (response.data.status === "success") {
        redirect("/procedure");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting your complaint.");
    }
  };

  const handleBack = () => {
    redirect("/emotion-tracker");
  };

  return (
    <div className=" bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-4 relative overflow-y-auto">
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-indigo-600 hover:text-indigo-800 transition-all duration-300 p-1 rounded-full hover:bg-indigo-50"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="text-center mb-4">
          <h1 className="text-xl font-semibold text-gray-800 mb-1">
            Submit Your Complaint
          </h1>
          <p className="text-gray-500 text-xs">
            Share your experience confidentially
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="font-medium text-sm">Nom Complet :</label>
            <input
              type="text"
              className="w-full p-1 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Entrez votre nom complet"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-medium text-sm">Date :</label>
            <input
              type="date"
              className="w-full p-1 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
              value={aboutDate}
              onChange={(e) => setAboutDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-medium text-sm">Heure :</label>
            <input
              type="time"
              className="w-full p-1 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
              value={aboutHour}
              onChange={(e) => setAboutHour(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="flex items-center text-gray-700 font-semibold">
              <FileText className="mr-2 text-indigo-500" size={18} />
              Describe Your Complaint
            </label>
            <textarea
              value={cause}
              onChange={(e) => setCause(e.target.value)}
              className="w-full p-1 border border-gray-200 rounded-md text-black focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
              placeholder="Provide details about your complaint..."
              rows={2}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-1">
            <div>
              <label className="flex items-center text-gray-700 font-semibold">
                <MapPin className="mr-2 text-green-500" size={18} />
                Country
              </label>
              <input
                type="text"
                value={aboutCountry}
                onChange={(e) => setAboutCountry(e.target.value)}
                className="w-full p-1 border border-gray-200 rounded-md text-black focus:ring-2 focus:ring-green-300 transition-all duration-300"
                placeholder="Your country"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-gray-700 font-semibold">
                <MapPin className="mr-2 text-blue-500" size={18} />
                City
              </label>
              <input
                type="text"
                value={aboutCity}
                onChange={(e) => setAboutCity(e.target.value)}
                className="w-full p-1 border border-gray-200 rounded-md text-black focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                placeholder="Your city"
                required
              />
            </div>
          </div>

          <div className="flex justify-between items-center space-x-1">
            <label className="flex-1 cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="flex items-center justify-center p-1 border-2 border-dashed border-indigo-200 rounded-lg hover:bg-indigo-50 transition-all">
                <Upload className="mr-2 text-indigo-500" size={18} />
                <span className="text-gray-600">
                  {file ? file.name : "Upload Document"}
                </span>
              </div>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center"
          >
            <Send className="mr-2" size={18} />
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default Plainte;
