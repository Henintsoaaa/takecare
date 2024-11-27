"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Camera,
  Lock,
  Shield,
  Image as ImageIcon,
  Save,
} from "lucide-react";

interface UserProfileData {
  id: number;
  username: string;
  email: string;
  profilePicture: string;
  description: string;
}

const EditProfile: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  useEffect(() => {
    if (document.cookie) {
      setUserId(parseInt(document.cookie.split("=")[1]));
    }
  }, []);
  const router = useRouter();
  const [userData, setUserData] = useState<UserProfileData>({
    id: 0,
    username: "",
    email: "",
    profilePicture: "",
    description: "",
  });

  const [newPassword, setNewPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [privacySettings, setPrivacySettings] = useState({
    isProfilePublic: true,
    showEmotionHistory: true,
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId !== null) {
        try {
          const response = await axios.get<UserProfileData>(
            `${process.env.NEXT_PUBLIC_IP_KEY}/profile?user_id=${userId}`
          );
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
    };
    fetchUserData();
  }, [userId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePrivacyToggle = (setting: string) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof privacySettings],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (newPassword.newPassword !== newPassword.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const formData = new FormData();
      formData.append("userId", userData.id.toString());
      formData.append("username", userData.username);
      formData.append("email", userData.email);
      formData.append("description", userData.description);
      formData.append(
        "isProfilePublic",
        privacySettings.isProfilePublic.toString()
      );
      formData.append(
        "showEmotionHistory",
        privacySettings.showEmotionHistory.toString()
      );

      if (selectedImage) {
        formData.append("profilePicture", selectedImage);
      }

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_IP_KEY}/users/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Profile Updated", response.data);
      router.push(`/user/${userData.id}`);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 h-screen overflow-y-auto">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 overflow-y-auto flex-1">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items center mb-6">
            <div className="relative">
              <Image
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : userData.profilePicture || "/default-profile.jpg"
                }
                alt="Profile Picture"
                width={150}
                height={150}
                className="rounded-full border-4 border-purple-300 shadow-lg"
              />
              <label
                htmlFor="imageUpload"
                className="absolute bottom-0 right-0 bg-purple-500 text-white p-2 rounded-full cursor-pointer hover:bg-purple-600 transition duration-200"
              >
                <ImageIcon size={20} />
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-gray-700 mb-2">
                <User className="mr-2" /> Username
              </label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-gray-700 mb-2">
                <Mail className="mr-2" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center text-gray-700 mb-2">
              <Camera className="mr-2" /> Description
            </label>
            <textarea
              name="description"
              value={userData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4}
            />
          </div>

          {/* Password Change */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Lock className="mr-2" /> Change Password
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={newPassword.currentPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={newPassword.newPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={newPassword.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Shield className="mr-2" /> Privacy Settings
            </h2>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={privacySettings.isProfilePublic}
                onChange={() => handlePrivacyToggle("isProfilePublic")}
                className="mr-2"
              />
              <label>Make my profile public</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={privacySettings.showEmotionHistory}
                onChange={() => handlePrivacyToggle("showEmotionHistory")}
                className="mr-2"
              />
              <label>Show my emotion history </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-200"
            >
              <Save className="mr-2" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
